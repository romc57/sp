#!/usr/bin/env node
process.env.WORKSTATION_SOURCE = process.env.WORKSTATION_SOURCE || "antigravity";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { runBeforePrompt } = require(resolve(__dirname, "../../src/hooks/before-prompt-run.js"));

const input = JSON.parse(readFileSync(0, "utf8"));
const cwd = input.cwd || process.cwd();
const out = await runBeforePrompt(input, cwd);
console.log(JSON.stringify(out));
