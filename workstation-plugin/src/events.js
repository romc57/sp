const { emitEvent } = require("./client");

async function postEvent(eventType, input, workspaceRoot) {
  const tool = input.tool_name || input.tool || input.command || "";
  const summary = String(input.summary || tool || eventType).slice(0, 200);
  await emitEvent(
    eventType,
    {
      tool: tool ? String(tool).slice(0, 120) : undefined,
      summary,
      payload: input,
      state: eventType,
    },
    workspaceRoot || input.cwd || process.cwd()
  );
}

module.exports = { postEvent };
