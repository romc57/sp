const fs = require("fs");
const path = require("path");

const DEFAULT_MAX = 2000;

function truncateSummary(text, maxChars) {
  const limit = Number(process.env.WORKSTATION_SUMMARY_MAX_CHARS || DEFAULT_MAX);
  const cap = maxChars || limit;
  if (!text || text.length <= cap) return text || "";
  return `${text.slice(0, cap - 20)}\n\n… (truncated)`;
}

function writeSessionSummaryCache(cwd, markdown) {
  if (!cwd || !markdown) return "";
  const file = path.join(cwd, ".workstation-last-session-summary");
  try {
    fs.writeFileSync(file, markdown, "utf8");
    return file;
  } catch {
    return "";
  }
}

function extractSummaryMarkdown(response) {
  if (!response) return "";
  const block = response.session_summary || response;
  if (typeof block === "string") return block;
  return String(block.summary_markdown || "");
}

module.exports = {
  truncateSummary,
  writeSessionSummaryCache,
  extractSummaryMarkdown,
};
