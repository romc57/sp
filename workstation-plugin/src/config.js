const fs = require("fs");
const path = require("path");

function pluginRoot() {
  return path.resolve(__dirname, "..");
}

function repoRoot() {
  return path.resolve(pluginRoot(), "..");
}

/** Parse KEY=VAL env file; ignores blank lines and # comments. */
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

/**
 * Resolve server_url for LAN/VPN/local.
 * Order (first non-empty wins): env → .workstation-agent.env → config.local.json → config.json → defaults.
 * SSOT: shared/remote_dev.yaml → connect
 */
function resolveServerUrl(defaults, configJson, localJson, agentEnv) {
  const candidates = [
    process.env.WORKSTATION_DEV_CONTROL_URL,
    agentEnv.WORKSTATION_DEV_CONTROL_URL,
    localJson.server_url,
    configJson.server_url,
    defaults.server_url,
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim().replace(/\/$/, "");
  }
  return "http://127.0.0.1:8001";
}

function resolveDashboardUrl(defaults, configJson, localJson, agentEnv) {
  const candidates = [
    process.env.WORKSTATION_DASHBOARD_URL,
    agentEnv.WORKSTATION_DASHBOARD_URL,
    localJson.dashboard_url,
    configJson.dashboard_url,
    defaults.dashboard_url,
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim().replace(/\/$/, "");
  }
  return "http://127.0.0.1:5173";
}

function loadConfig() {
  const root = pluginRoot();
  const defaults = readJsonIfExists(path.join(root, "config.defaults.json"));
  const configJson = readJsonIfExists(path.join(root, "config.json"));
  const localJson = readJsonIfExists(path.join(root, "config.local.json"));
  const agentEnv = parseEnvFile(path.join(repoRoot(), ".workstation-agent.env"));

  const merged = { ...defaults, ...configJson, ...localJson };
  if (agentEnv.WORKSTATION_PROJECT) {
    merged.project = agentEnv.WORKSTATION_PROJECT;
  }
  if (process.env.WORKSTATION_PROJECT) {
    merged.project = process.env.WORKSTATION_PROJECT;
  }

  return {
    server_url: resolveServerUrl(defaults, configJson, localJson, agentEnv),
    dashboard_url: resolveDashboardUrl(defaults, configJson, localJson, agentEnv),
    project: merged.project || "",
    dev_session_id: merged.dev_session_id || "",
    plugin_version: merged.plugin_version || "0.1.0",
  };
}

function detectSource() {
  if (process.env.WORKSTATION_SOURCE) return process.env.WORKSTATION_SOURCE;
  const app = (process.env.VSCODE_APPNAME || "").toLowerCase();
  if (app.includes("cursor")) return "cursor";
  if (app.includes("antigravity")) return "antigravity";
  if (process.env.CLAUDE_CODE) return "claude";
  if (process.env.GEMINI_CLI) return "gemini";
  return "vscode";
}

module.exports = {
  loadConfig,
  detectSource,
  pluginRoot,
  repoRoot,
  parseEnvFile,
  resolveServerUrl,
  resolveDashboardUrl,
};
