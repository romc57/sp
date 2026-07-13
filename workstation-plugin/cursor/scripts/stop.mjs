#!/usr/bin/env node
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { postEvent } = require(resolve(__dirname, "../../src/events.js"));
const { finalizeSession, emitTokenUsage } = require(resolve(__dirname, "../../src/client.js"));
const { loadConfig } = require(resolve(__dirname, "../../src/config.js"));
const { setConnected } = require(resolve(__dirname, "../../src/presence-state.js"));

const input = JSON.parse(readFileSync(0, "utf8"));
const cwd = input.cwd || process.cwd();
const cfg = loadConfig();
const usage = input.usage || input.token_usage || input.tokenUsage;
if (usage && typeof usage === "object") {
  await emitTokenUsage(cwd, usage);
}
await postEvent("agent_stop", input, cwd);
const summary = await finalizeSession(cwd);
setConnected(cwd, cfg);
const out = { continue: true };
if (summary) {
  out.additionalContext = summary;
}
console.log(JSON.stringify(out));
