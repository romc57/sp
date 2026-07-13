#!/usr/bin/env node
import { createRequire } from "module";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const clientPath = resolve(__dirname, "../../src/client.js");
const { submitAndWait } = require(clientPath);

const input = JSON.parse(readFileSync(0, "utf8"));
const command = input.command || input.shellCommand || "";
const cwd = input.cwd || process.cwd();

try {
  await submitAndWait(
    {
      action_type: "run_command",
      summary: `shell: ${command.slice(0, 120)}`,
      payload: { command, cwd },
    },
    cwd
  );
  console.log(JSON.stringify({ permission: "allow" }));
} catch (e) {
  console.log(JSON.stringify({ permission: "deny", message: String(e.message || e) }));
  process.exit(1);
}
