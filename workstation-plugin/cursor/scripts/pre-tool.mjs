#!/usr/bin/env node
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { postEvent } = require(resolve(__dirname, "../../src/events.js"));
const { loadConfig } = require(resolve(__dirname, "../../src/config.js"));
const { setActive } = require(resolve(__dirname, "../../src/presence-state.js"));

const input = JSON.parse(readFileSync(0, "utf8"));
const cwd = input.cwd || process.cwd();
const cfg = loadConfig();
setActive(cwd, cfg, { summary: "tool running" });
await postEvent("tool_start", input, cwd);
console.log(JSON.stringify({ continue: true }));
