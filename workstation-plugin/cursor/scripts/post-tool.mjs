#!/usr/bin/env node
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { enrichToolPayload } from "./hook-metrics.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { postEvent } = require(resolve(__dirname, "../../src/events.js"));
const { loadConfig } = require(resolve(__dirname, "../../src/config.js"));
const { setActive } = require(resolve(__dirname, "../../src/presence-state.js"));

const input = JSON.parse(readFileSync(0, "utf8"));
const cwd = input.cwd || process.cwd();
const cfg = loadConfig();
const enriched = enrichToolPayload(input);
setActive(cwd, cfg, { summary: "tool complete" });
await postEvent("tool_end", enriched, cwd);
console.log(JSON.stringify({ continue: true }));
