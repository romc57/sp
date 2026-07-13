const { loadConfig, detectSource } = require("./config");
const { setWaiting, setActive } = require("./presence-state");

let sessionId = `sess-${Date.now()}`;
let sessionTitle = process.env.WORKSTATION_DEV_TASK || "";

function setSessionId(id) {
  sessionId = id;
}

function getSessionId() {
  return sessionId;
}

function setSessionTitle(title) {
  const text = String(title || "").trim();
  if (text) sessionTitle = text.slice(0, 80);
}

function getSessionTitle() {
  return sessionTitle;
}

function resolveAgentMode(extraPayload) {
  return (
    process.env.WORKSTATION_AGENT_MODE ||
    (extraPayload && extraPayload.agent_mode) ||
    undefined
  );
}

function authHeaders(extra = {}) {
  const token = process.env.WORKSTATION_DEV_CONTROL_TOKEN || "";
  const headers = { ...extra };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

async function getJson(url) {
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return res.json();
}

async function emitEvent(eventType, extra = {}, workspaceRoot = "") {
  const cfg = loadConfig();
  const devSessionId = process.env.WORKSTATION_DEV_SESSION_ID || undefined;
  const { payload: extraPayload, ...rest } = extra;
  const agentMode = resolveAgentMode(extraPayload);
  const payloadBase = devSessionId
    ? { dev_session_id: devSessionId, ...(extraPayload || {}) }
    : extraPayload || {};
  if (agentMode && typeof payloadBase === "object") {
    payloadBase.agent_mode = agentMode;
  }
  if (sessionTitle && typeof payloadBase === "object") {
    payloadBase.session_title = sessionTitle;
  }
  const body = {
    event_type: eventType,
    source: detectSource(),
    session_id: sessionId,
    project: cfg.project,
    workspace_root: workspaceRoot || undefined,
    plugin_version: cfg.plugin_version,
    agent_mode: agentMode,
    ...rest,
    payload: payloadBase,
  };
  try {
    return await postJson(`${cfg.server_url}/api/dev/agent-events`, body);
  } catch {
    return null;
  }
}

async function heartbeat(workspaceRoot, extra = {}) {
  const cfg = loadConfig();
  const devSessionId = process.env.WORKSTATION_DEV_SESSION_ID || undefined;
  const title = extra.session_title || sessionTitle || undefined;
  return postJson(`${cfg.server_url}/api/dev/ide-sessions/heartbeat`, {
    source: detectSource(),
    session_id: sessionId,
    project: cfg.project,
    workspace_root: workspaceRoot,
    dev_session_id: devSessionId,
    plugin_version: cfg.plugin_version,
    agent_mode: resolveAgentMode(extra),
    session_title: title,
  });
}

async function logBatch(lines, workspaceRoot) {
  const cfg = loadConfig();
  return postJson(`${cfg.server_url}/api/dev/ide-sessions/log`, {
    source: detectSource(),
    session_id: sessionId,
    project: cfg.project,
    lines,
  });
}

async function finalizeSession(workspaceRoot) {
  const { truncateSummary, writeSessionSummaryCache, extractSummaryMarkdown } = require("./session-summary");
  const response = await emitEvent(
    "session_end",
    { summary: "session finalize", payload: { finalize: true } },
    workspaceRoot
  );
  const markdown = truncateSummary(extractSummaryMarkdown(response));
  if (markdown) {
    writeSessionSummaryCache(workspaceRoot, markdown);
  }
  return markdown;
}

async function submitAndWait(req, workspaceRoot) {
  const cfg = loadConfig();
  const devSessionId = process.env.WORKSTATION_DEV_SESSION_ID || undefined;
  const body = {
    source: detectSource(),
    session_id: sessionId,
    dev_session_id: devSessionId,
    project: cfg.project,
    workspace_root: workspaceRoot,
    ...req,
  };
  const submitted = await postJson(`${cfg.server_url}/api/dev/requests`, body);
  if (submitted.status === "approved") return submitted;
  if (submitted.status === "denied") {
    throw new Error(submitted.deny_reason || "Request denied");
  }
  setWaiting(workspaceRoot, cfg, { summary: req.summary });
  await emitEvent("approval_pending", { summary: req.summary, tool: req.action_type }, workspaceRoot);
  const waited = await getJson(
    `${cfg.server_url}/api/dev/requests/${submitted.id}/wait?timeout=120`
  );
  if (waited.status === "denied") {
    throw new Error(waited.deny_reason || "Request denied");
  }
  if (waited.status === "timeout") {
    throw new Error("Approval timeout — check WorkStation dashboard");
  }
  await emitEvent("approval_resolved", { summary: req.summary, payload: { status: waited.status } }, workspaceRoot);
  setActive(workspaceRoot, cfg, { task: sessionTitle || undefined });
  return waited;
}

async function emitTokenUsage(workspaceRoot, usage = {}) {
  const prompt = Number(usage.prompt_tokens || usage.promptTokens || 0);
  const completion = Number(usage.completion_tokens || usage.completionTokens || 0);
  const total = Number(usage.total_tokens || usage.totalTokens || prompt + completion);
  if (total <= 0) return null;
  const cfg = loadConfig();
  return emitEvent(
    "token_usage",
    {
      tool: usage.tool || "ide_completion",
      summary: `tokens:${total}`,
      payload: {
        model: usage.model,
        provider_tier: usage.provider_tier || usage.tier || "cloud",
        request_id: usage.request_id,
        expert: process.env.WORKSTATION_EXPERT,
        dev_session_id: process.env.WORKSTATION_DEV_SESSION_ID,
        usage: {
          prompt_tokens: prompt,
          completion_tokens: completion,
          total_tokens: total,
          spend: Number(usage.spend || 0),
        },
      },
    },
    workspaceRoot
  );
}

module.exports = {
  setSessionId,
  getSessionId,
  setSessionTitle,
  getSessionTitle,
  heartbeat,
  logBatch,
  submitAndWait,
  emitEvent,
  emitTokenUsage,
  finalizeSession,
  detectSource,
};
