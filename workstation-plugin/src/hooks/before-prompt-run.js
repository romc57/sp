const { postEvent } = require("../events.js");
const { loadConfig } = require("../config.js");
const { heartbeat, setSessionTitle } = require("../client.js");
const { resolveAcceptContext, extractPromptText } = require("../accept-context.js");
const { resolveDevSessionTask } = require("../dev-session-file.js");
const { setActive } = require("../presence-state.js");

function detectAgentMode(input) {
  const raw =
    process.env.WORKSTATION_AGENT_MODE ||
    input?.conversationMode ||
    input?.conversation_mode ||
    input?.composerMode ||
    input?.composer_mode ||
    input?.mode ||
    input?.agent_mode;
  if (!raw) return undefined;
  const mode = String(raw).toLowerCase();
  if (mode.includes("plan")) return "plan";
  if (mode.includes("debug")) return "debug";
  if (mode.includes("agent")) return "agent";
  return mode.slice(0, 32);
}

async function runBeforePrompt(input, cwd) {
  const cfg = loadConfig();
  const acceptMode =
    process.env.VALERIE_ACCEPT_MODE || process.env.WORKSTATION_ACCEPT_MODE || "manual";
  const agentMode = detectAgentMode(input);
  if (agentMode) {
    process.env.WORKSTATION_AGENT_MODE = agentMode;
  }
  const base = cfg.server_url || "http://127.0.0.1:8001";
  const sessionTitle = resolveDevSessionTask(cwd, cfg, extractPromptText(input));
  if (sessionTitle) setSessionTitle(sessionTitle);

  try {
    await heartbeat(cwd, { session_title: sessionTitle || undefined });
  } catch {
    /* dev-control optional */
  }

  const ctx = await resolveAcceptContext({
    cwd,
    cfg,
    input,
    acceptMode,
    base,
  });
  const acceptBlock = ctx.block || "";
  const assessment = ctx.assessment || {};

  setActive(cwd, cfg, {
    task: sessionTitle || undefined,
    session_title: sessionTitle || undefined,
    agent_mode: agentMode,
    accept_mode: acceptMode,
    brain_mode: ctx.brainMode,
    degraded: Boolean(ctx.degradeReason),
  });

  await postEvent(
    "thinking",
    {
      summary: "prompt submitted with accept context",
      payload: {
        accept_mode: acceptMode,
        context_len: acceptBlock.length,
        accept_block_len: acceptBlock.length,
        brain_brief_len: ctx.brainBriefLen || acceptBlock.length,
        inject_mode: ctx.injectMode || "lite",
        productivity_score: ctx.productivityScore,
        degrade_reason: ctx.degradeReason,
        rules_len: Number(input.rules_len || input.rules_size || 0),
        skills_len: Number(input.skills_len || input.skills_size || 0),
        mcp_len: Number(input.mcp_len || input.mcp_size || 0),
        token_estimate: ctx.tokenEstimate ?? assessment.token_estimate,
        optimization_offers: ctx.optimizationOffers ?? assessment.optimization_offers,
        rules_skills_audit: ctx.rulesSkillsAudit ?? assessment.rules_skills_audit,
        brain_job_plan: ctx.brainJobPlan ?? assessment.brain_job_plan,
        brain_routing_reference: ctx.brainRoutingReference ?? assessment.brain_routing_reference,
        auto_tiered: ctx.autoTiered ?? assessment.auto_tiered,
        agent_mode: agentMode,
        session_title: sessionTitle || undefined,
        assessment,
      },
    },
    cwd
  );

  return {
    continue: true,
    additional_context: acceptBlock || undefined,
  };
}

module.exports = { runBeforePrompt };
