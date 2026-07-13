const fs = require("fs");
const path = require("path");

const DEV_SESSION_FILE = ".workstation-dev-session";

function devSessionPath(cwd) {
  return path.join(cwd || process.cwd(), DEV_SESSION_FILE);
}

function readDevSessionFile(cwd) {
  const file = devSessionPath(cwd);
  if (!fs.existsSync(file)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

function writeDevSessionFile(cwd, payload) {
  const file = devSessionPath(cwd);
  const body = {
    id: payload.id || payload.dev_session_id || "",
    task: payload.task || "",
    accept_mode: payload.accept_mode || "manual",
    project: payload.project || "",
    updated_at: new Date().toISOString(),
  };
  fs.writeFileSync(file, JSON.stringify(body, null, 2) + "\n");
  return body;
}

function resolveDevSessionId(cwd, cfg = {}) {
  return (
    process.env.WORKSTATION_DEV_SESSION_ID ||
    cfg.dev_session_id ||
    readDevSessionFile(cwd)?.id ||
    null
  );
}

function resolveDevSessionTask(cwd, cfg = {}, fallback = "") {
  return (
    process.env.WORKSTATION_DEV_TASK ||
    readDevSessionFile(cwd)?.task ||
    fallback ||
    ""
  );
}

module.exports = {
  DEV_SESSION_FILE,
  readDevSessionFile,
  writeDevSessionFile,
  resolveDevSessionId,
  resolveDevSessionTask,
};
