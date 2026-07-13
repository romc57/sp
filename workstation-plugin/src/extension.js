const vscode = require("vscode");
const { loadConfig } = require("./config");
const { heartbeat, emitEvent } = require("./client");
const { readPresence, formatStatusText, presence } = require("./presence-state");

/** @type {vscode.StatusBarItem} */
let statusBar;
let lastState = "idle";
let lastDetail = "";

function applyPresenceBar(fileState, cfg) {
  const state = fileState?.state || lastState;
  const project = fileState?.project || cfg.project || "";
  const task = fileState?.task || fileState?.session_title || "";
  const degraded = Boolean(fileState?.degraded);
  const text = formatStatusText(
    state === "connected" ? "connected" : state,
    project,
    task,
    degraded
  );
  const icons = {
    connected: "$(sparkle)",
    idle: "$(sparkle)",
    active: "$(sync~spin)",
    running: "$(sync~spin)",
    waiting: "$(clock)",
    error: "$(error)",
  };
  const iconKey = state === "connected" ? "connected" : state;
  const icon = icons[iconKey] || icons.idle;
  statusBar.text = `${icon} ${text}`;
  const tooltipParts = [
    presence.tagline || "Valerie is on it",
    project ? `project: ${project}` : "",
    task ? `task: ${task}` : "",
    fileState?.accept_mode ? `accept: ${fileState.accept_mode}` : "",
    cfg.server_url ? `dev-control: ${cfg.server_url}` : "",
    lastDetail,
  ].filter(Boolean);
  statusBar.tooltip = tooltipParts.join("\n");
}

function setState(state, detail = "") {
  lastState = state;
  lastDetail = detail || "";
  const cfg = loadConfig();
  applyPresenceBar({ state: state === "idle" ? "connected" : state, project: cfg.project }, cfg);
}

function activate(context) {
  const cfg = loadConfig();
  const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";

  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 5);
  setState("idle", presence.tagline || "Valerie is on it");
  statusBar.command = "workstation.openDashboard";
  statusBar.show();

  const openDash = vscode.commands.registerCommand("workstation.openDashboard", () => {
    const url = cfg.project
      ? `${cfg.dashboard_url}/projects/${encodeURIComponent(cfg.project)}`
      : cfg.dashboard_url;
    vscode.env.openExternal(vscode.Uri.parse(url));
  });

  const pollPresence = () => {
    if (!root) return;
    const fileState = readPresence(root);
    if (fileState) {
      applyPresenceBar(fileState, cfg);
      return;
    }
    if (lastState !== "error") {
      applyPresenceBar({ state: "connected", project: cfg.project }, cfg);
    }
  };

  const tick = async () => {
    try {
      await heartbeat(root);
      await emitEvent("log_line", { summary: "heartbeat", state: lastState }, root);
      if (lastState === "error") setState("idle");
    } catch {
      setState("error", "dev-control unreachable");
    }
  };

  pollPresence();
  tick();
  const presenceInterval = setInterval(pollPresence, 3000);
  const heartbeatInterval = setInterval(tick, 30000);
  context.subscriptions.push(openDash, statusBar, {
    dispose: () => {
      clearInterval(presenceInterval);
      clearInterval(heartbeatInterval);
    },
  });
}

function deactivate() {
  if (statusBar) statusBar.dispose();
}

module.exports = { activate, deactivate, setState };
