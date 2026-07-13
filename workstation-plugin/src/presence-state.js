const fs = require("fs");
const path = require("path");
const presence = require("./presence.json");

const PRESENCE_FILE = ".workstation-presence.json";
const TITLE_MAX = presence.title_max_chars || 80;

function presencePath(cwd) {
  return path.join(cwd, PRESENCE_FILE);
}

function truncate(text, max = TITLE_MAX) {
  const t = String(text || "").trim();
  if (t.length <= max) return t;
  if (max <= 1) return t.slice(0, max);
  return t.slice(0, max - 1) + "…";
}

function formatStatusText(state, project, task, degraded = false) {
  const p = presence.status || {};
  if (state === "error") return p.error || "Valerie · offline";
  if (state === "waiting") return p.waiting || "Valerie · waiting";
  if (degraded) return p.degraded || "Valerie · local brain";
  if (state === "active" && task) {
    return (p.active || "Valerie · {task}").replace("{task}", truncate(task));
  }
  if (project) {
    return (p.connected || "Valerie · {project}").replace("{project}", project);
  }
  return presence.label || "Valerie";
}

function readPresence(cwd) {
  const filePath = presencePath(cwd);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function writePresence(cwd, payload, cfg = {}) {
  if (!cwd) return;
  const existing = readPresence(cwd) || {};
  const merged = {
    ...existing,
    ...payload,
    project: payload.project ?? existing.project ?? cfg.project ?? "",
    updated_at: new Date().toISOString(),
  };
  try {
    fs.writeFileSync(presencePath(cwd), JSON.stringify(merged, null, 2) + "\n");
  } catch {
    /* workspace may be read-only */
  }
}

function setConnected(cwd, cfg, extra = {}) {
  const acceptMode =
    process.env.VALERIE_ACCEPT_MODE || process.env.WORKSTATION_ACCEPT_MODE || "manual";
  writePresence(
    cwd,
    {
      state: "connected",
      accept_mode: acceptMode,
      source: process.env.WORKSTATION_SOURCE || undefined,
      task: "",
      session_title: "",
      ...extra,
    },
    cfg
  );
}

function setActive(cwd, cfg, extra = {}) {
  writePresence(
    cwd,
    {
      state: "active",
      ...extra,
    },
    cfg
  );
}

function setWaiting(cwd, cfg, extra = {}) {
  writePresence(cwd, { state: "waiting", ...extra }, cfg);
}

function setError(cwd, cfg, detail = "") {
  writePresence(cwd, { state: "error", detail }, cfg);
}

module.exports = {
  PRESENCE_FILE,
  presence,
  truncate,
  formatStatusText,
  readPresence,
  writePresence,
  setConnected,
  setActive,
  setWaiting,
  setError,
};
