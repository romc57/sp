#!/usr/bin/env node
/** POST Claude Code hook events to dev-control agent-events; inject accept context on prompt submit. */
import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { emitEvent, finalizeSession, emitTokenUsage } = require(resolve(__dirname, "../../src/client.js"));
const { loadConfig } = require(resolve(__dirname, "../../src/config.js"));
const { resolveAcceptContext } = require(resolve(__dirname, "../../src/accept-context.js"));

const input = JSON.parse(readFileSync(0, "utf8"));
const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
const hook = process.env.CLAUDE_HOOK_EVENT || "thinking";
process.env.WORKSTATION_SOURCE = process.env.WORKSTATION_SOURCE || "claude";

const cfg = loadConfig();
const acceptMode =
  process.env.VALERIE_ACCEPT_MODE || process.env.WORKSTATION_ACCEPT_MODE || "manual";

let acceptCtx = null;
if (hook === "UserPromptSubmit") {
  acceptCtx = await resolveAcceptContext({
    cwd,
    cfg,
    input,
    acceptMode,
    base: cfg.server_url,
  });
}

const out = { continue: true };

if (hook === "Stop") {
  // Claude Code sends modelUsage (per-model breakdown) and totalCostUSD, not usage/token_usage
  const modelUsage = input.modelUsage;
  if (modelUsage && typeof modelUsage === "object" && Object.keys(modelUsage).length > 0) {
    let totalInput = 0, totalOutput = 0, totalCacheRead = 0, totalCacheCreation = 0;
    const models = Object.keys(modelUsage);
    for (const m of models) {
      const u = modelUsage[m];
      totalInput += u.inputTokens || 0;
      totalOutput += u.outputTokens || 0;
      totalCacheRead += u.cacheReadInputTokens || 0;
      totalCacheCreation += u.cacheCreationInputTokens || 0;
    }
    await emitTokenUsage(cwd, {
      promptTokens: totalInput,
      completionTokens: totalOutput,
      cacheReadTokens: totalCacheRead,
      cacheCreationTokens: totalCacheCreation,
      model: models[0],
      spend: input.totalCostUSD || 0,
    });
  } else {
    const usage = input.usage || input.token_usage || input.tokenUsage;
    if (usage && typeof usage === "object") {
      await emitTokenUsage(cwd, usage);
    }
  }
  const summary = await finalizeSession(cwd);
  if (summary) {
    out.additionalContext = summary;
  }
} else {
  await emitEvent(
    hook === "SessionStart" ? "session_start" : "thinking",
    {
      summary: String(input.summary || hook).slice(0, 200),
      payload: {
        ...(input || {}),
        agent_mode: process.env.WORKSTATION_AGENT_MODE,
        ...(acceptCtx
          ? {
              accept_mode: acceptMode,
              context_len: (acceptCtx.block || "").length,
              accept_block_len: (acceptCtx.block || "").length,
              brain_brief_len: acceptCtx.brainBriefLen || (acceptCtx.block || "").length,
              inject_mode: acceptCtx.injectMode || "lite",
              productivity_score: acceptCtx.productivityScore,
              degrade_reason: acceptCtx.degradeReason,
            }
          : {}),
      },
      tool: input.tool_name || input.tool || undefined,
    },
    cwd
  );
}

if (acceptCtx?.block) {
  out.additionalContext = acceptCtx.block;
  try {
    writeFileSync(resolve(cwd, ".workstation-last-accept-context"), acceptCtx.block, "utf8");
  } catch {
    /* optional cache */
  }
}

console.log(JSON.stringify(out));
