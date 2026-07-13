const {
  readDevSessionFile,
  resolveDevSessionId,
  resolveDevSessionTask,
} = require("./dev-session-file.js");
const { detectSource } = require("./config.js");

function extractPromptText(input) {
  if (!input || typeof input !== "object") return "";
  return String(
    input.prompt ||
      input.text ||
      input.user_message ||
      input.message ||
      ""
  ).trim();
}

function extractIdeContext(input) {
  if (!input || typeof input !== "object") return {};
  const rules = input.rules || input.rules_snapshot;
  const skills = input.skills || input.skills_snapshot;
  const ctx = {
    rules_len: Number(input.rules_len || input.rules_size || 0) || undefined,
    skills_len: Number(input.skills_len || input.skills_size || 0) || undefined,
    mcp_len: Number(input.mcp_len || input.mcp_size || 0) || undefined,
    source: process.env.WORKSTATION_SOURCE || detectSource(),
  };
  if (Array.isArray(rules) && rules.length) {
    ctx.rules_snapshot = rules.map((r) =>
      typeof r === "string" ? r : r.name || r.path || String(r)
    );
  }
  if (Array.isArray(skills) && skills.length) {
    ctx.skills_snapshot = skills.map((s) =>
      typeof s === "string" ? s : s.name || s.id || String(s)
    );
  }
  return ctx;
}

function resolveAcceptParams({ cwd, cfg = {}, input = {}, acceptMode = "manual" }) {
  const mode =
    process.env.VALERIE_ACCEPT_MODE ||
    process.env.WORKSTATION_ACCEPT_MODE ||
    readDevSessionFile(cwd)?.accept_mode ||
    acceptMode ||
    "manual";
  const devSessionId = resolveDevSessionId(cwd, cfg);
  const task = resolveDevSessionTask(cwd, cfg, extractPromptText(input));
  const injectMode =
    process.env.WORKSTATION_INJECT_MODE ||
    cfg.inject_mode ||
    "lite";
  return {
    project: cfg.project || readDevSessionFile(cwd)?.project || "",
    mode,
    devSessionId,
    task,
    injectMode,
    userPrompt: extractPromptText(input),
    ideContext: extractIdeContext(input),
  };
}

async function fetchAcceptContext({
  base,
  project,
  mode,
  devSessionId,
  task,
  injectMode,
  userPrompt,
  ideContext = {},
  assess = true,
}) {
  const params = new URLSearchParams({
    mode: mode || "manual",
    inject_mode: injectMode || "lite",
    assess: assess ? "true" : "false",
  });
  if (project) params.set("project", project);
  if (devSessionId) params.set("dev_session_id", devSessionId);
  else if (task) params.set("task", task);
  if (userPrompt) params.set("user_prompt", userPrompt.slice(0, 500));
  if (ideContext.rules_len) params.set("rules_len", String(ideContext.rules_len));
  if (ideContext.skills_len) params.set("skills_len", String(ideContext.skills_len));
  if (ideContext.mcp_len) params.set("mcp_len", String(ideContext.mcp_len));
  if (ideContext.source) params.set("source", ideContext.source);
  if (ideContext.rules_snapshot?.length) {
    params.set("rules_snapshot", JSON.stringify(ideContext.rules_snapshot));
  }
  if (ideContext.skills_snapshot?.length) {
    params.set("skills_snapshot", JSON.stringify(ideContext.skills_snapshot));
  }
  const res = await fetch(`${base.replace(/\/$/, "")}/api/dev/accept-context?${params}`);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return res.json();
}

async function resolveAcceptContext(opts) {
  const { cwd, cfg = {}, input = {}, acceptMode = "manual", base } = opts;
  const resolved = resolveAcceptParams({ cwd, cfg, input, acceptMode });
  const server = base || cfg.server_url || "http://127.0.0.1:8001";
  try {
    const data = await fetchAcceptContext({
      base: server,
      project: resolved.project,
      mode: resolved.mode,
      devSessionId: resolved.devSessionId,
      task: resolved.task,
      injectMode: resolved.injectMode,
      userPrompt: resolved.userPrompt,
      ideContext: resolved.ideContext,
      assess: true,
    });
    const assessment = data.assessment || {};
    return {
      block: data.block || "",
      injectMode: data.inject_mode || resolved.injectMode,
      productivityScore: data.productivity_score,
      brainBriefLen: data.brain_brief_len,
      degradeReason: data.degrade_reason,
      brainMode: data.brain_mode,
      assessment,
      tokenEstimate: data.token_estimate ?? assessment.token_estimate,
      optimizationOffers: data.optimization_offers ?? assessment.optimization_offers,
      rulesSkillsAudit: data.rules_skills_audit ?? assessment.rules_skills_audit,
      brainJobPlan: data.brain_job_plan ?? assessment.brain_job_plan,
      brainRoutingReference: data.brain_routing_reference ?? assessment.brain_routing_reference,
      autoTiered: data.auto_tiered ?? assessment.auto_tiered,
      wasteFlags: data.waste_flags,
      ...resolved,
    };
  } catch {
    return {
      block: `accept_mode: ${resolved.mode}`,
      injectMode: "lite",
      degradeReason: "api_error",
      assessment: {},
      ...resolved,
    };
  }
}

module.exports = {
  extractPromptText,
  extractIdeContext,
  resolveAcceptParams,
  fetchAcceptContext,
  resolveAcceptContext,
};
