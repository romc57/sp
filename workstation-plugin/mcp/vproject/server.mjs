#!/usr/bin/env node
/**
 * VProject MCP server — stdio adapter to dev-control Shared Context Store.
 */
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { loadConfig } = require(resolve(__dirname, "../../src/config.js"));

const cfg = loadConfig();
const BASE = cfg.server_url;

async function dcGet(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

async function dcPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

const TOOLS = [
  {
    name: "vproject_context",
    description: "Full VProject context (rules, skills, skeleton, iteration, knowledge)",
    inputSchema: {
      type: "object",
      properties: {
        task: { type: "string" },
        source: { type: "string" },
        session_id: { type: "string" },
        role: { type: "string" },
        expert: { type: "string" },
        component_id: { type: "string" },
        dev_session_id: { type: "string" },
      },
    },
  },
  {
    name: "knowledge_search",
    description: "Search project knowledge index",
    inputSchema: {
      type: "object",
      properties: {
        q: { type: "string" },
        tag: { type: "string" },
        k: { type: "number" },
      },
      required: ["q"],
    },
  },
  {
    name: "iteration_start",
    description: "Mark iteration window start for the project",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "project_validate",
    description: "Validate VProject wrapper and scaffold",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "dev_session_start",
    description: "Start multi-agent dev session",
    inputSchema: {
      type: "object",
      properties: {
        task: { type: "string" },
        accept_mode: { type: "string" },
        source: { type: "string" },
      },
      required: ["task"],
    },
  },
  {
    name: "dev_session_status",
    description: "Dev session status and components",
    inputSchema: {
      type: "object",
      properties: { session_id: { type: "string" } },
      required: ["session_id"],
    },
  },
  {
    name: "dev_session_component_context",
    description: "Scoped expert context for a session component",
    inputSchema: {
      type: "object",
      properties: {
        session_id: { type: "string" },
        component_id: { type: "string" },
      },
      required: ["session_id", "component_id"],
    },
  },
];

function projectName() {
  if (!cfg.project) throw new Error("config.json missing project");
  return cfg.project;
}

async function handleTool(name, args) {
  const project = projectName();
  if (name === "vproject_context") {
    const params = new URLSearchParams({ project });
    for (const key of ["task", "source", "session_id", "role", "expert", "component_id", "dev_session_id"]) {
      if (args[key]) params.set(key, args[key]);
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(await dcGet(`/api/runtime/projects/${project}/agent-context?${params}`), null, 2),
        },
      ],
    };
  }
  if (name === "knowledge_search") {
    const params = new URLSearchParams({ project, q: args.q });
    if (args.tag) params.set("tag", args.tag);
    if (args.k) params.set("k", String(args.k));
    return { content: [{ type: "text", text: JSON.stringify(await dcGet(`/api/knowledge/search?${params}`), null, 2) }] };
  }
  if (name === "iteration_start") {
    return { content: [{ type: "text", text: JSON.stringify(await dcPost("/api/dev/action", { action: "iteration_start", project }), null, 2) }] };
  }
  if (name === "project_validate") {
    return { content: [{ type: "text", text: JSON.stringify(await dcGet(`/api/runtime/projects/${project}/validate`), null, 2) }] };
  }
  if (name === "dev_session_start") {
    const body = {
      project,
      task: args.task,
      source: args.source || "cursor",
      accept_mode: args.accept_mode || "manual",
    };
    return { content: [{ type: "text", text: JSON.stringify(await dcPost("/api/dev/sessions", body), null, 2) }] };
  }
  if (name === "dev_session_status") {
    return { content: [{ type: "text", text: JSON.stringify(await dcGet(`/api/dev/sessions/${args.session_id}`), null, 2) }] };
  }
  if (name === "dev_session_component_context") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            await dcGet(`/api/dev/sessions/${args.session_id}/components/${args.component_id}/context`),
            null,
            2
          ),
        },
      ],
    };
  }
  throw new Error(`Unknown tool: ${name}`);
}

function send(msg) {
  process.stdout.write(`${JSON.stringify(msg)}\n`);
}

async function onMessage(msg) {
  const { id, method, params } = msg;
  if (method === "initialize") {
    send({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "vproject", version: "0.2.0" },
      },
    });
    return;
  }
  if (method === "notifications/initialized") return;
  if (method === "tools/list") {
    send({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
    return;
  }
  if (method === "tools/call") {
    try {
      const result = await handleTool(params.name, params.arguments || {});
      send({ jsonrpc: "2.0", id, result });
    } catch (e) {
      send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: String(e.message || e) }], isError: true } });
    }
    return;
  }
  if (id !== undefined) {
    send({ jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } });
  }
}

const readline = await import("readline");
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on("line", (line) => {
  if (!line.trim()) return;
  onMessage(JSON.parse(line)).catch((e) => {
    process.stderr.write(`${e}\n`);
  });
});
