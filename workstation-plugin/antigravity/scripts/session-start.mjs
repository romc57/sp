#!/usr/bin/env node
process.env.WORKSTATION_SOURCE = process.env.WORKSTATION_SOURCE || "antigravity";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { runSessionStart } = require(resolve(__dirname, "../../src/hooks/session-start-run.js"));

const input = JSON.parse(readFileSync(0, "utf8"));
const cwd = input.cwd || process.cwd();
const out = await runSessionStart(input, cwd);
console.log(JSON.stringify(out));
