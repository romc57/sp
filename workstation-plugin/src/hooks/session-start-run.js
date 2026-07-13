const { postEvent } = require("../events.js");
const { loadConfig, detectSource } = require("../config.js");
const { heartbeat } = require("../client.js");
const { writeDevSessionFile, resolveDevSessionId } = require("../dev-session-file.js");
const { setConnected } = require("../presence-state.js");
const { spawnSync } = require("child_process");

async function runSessionStart(input, cwd) {
  const cfg = loadConfig();
  const base = cfg.server_url || "http://127.0.0.1:8001";
  const acceptMode =
    process.env.VALERIE_ACCEPT_MODE || process.env.WORKSTATION_ACCEPT_MODE || "manual";
  const source = detectSource();

  await postEvent("session_start", input, cwd);
  try {
    await heartbeat(cwd);
  } catch {
    /* dev-control optional */
  }

  if (cfg.project) {
    const root = process.env.WORKSTATION_ROOT || "";
    const gen = root ? `${root}/scripts/generate_agent_files.py` : null;
    if (gen) {
      spawnSync("python3", [gen, "--project", cfg.project, "--repo", cwd], {
        stdio: "ignore",
        cwd,
      });
    }
  }

  let devSessionId = resolveDevSessionId(cwd, cfg);
  let devTask = process.env.WORKSTATION_DEV_TASK || "";

  if (!devSessionId && process.env.WORKSTATION_DEV_SESSION === "1" && cfg.project) {
    devTask = devTask || "IDE dev session";
    try {
      const res = await fetch(`${base}/api/dev/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: cfg.project,
          task: devTask,
          source,
          accept_mode: acceptMode,
        }),
      });
      if (res.ok) {
        const session = await res.json();
        devSessionId = session.id;
        devTask = session.task || devTask;
      }
    } catch {
      /* dev-control optional at hook time */
    }
  }

  if (devSessionId) {
    writeDevSessionFile(cwd, {
      id: devSessionId,
      task: devTask,
      accept_mode: acceptMode,
      project: cfg.project,
    });
  }

  setConnected(cwd, cfg, {
    accept_mode: acceptMode,
    source,
    task: devTask || undefined,
    session_title: devTask || undefined,
  });

  return { continue: true };
}

module.exports = { runSessionStart };
