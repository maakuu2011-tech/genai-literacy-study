import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
global.window = {};
const queue = require(path.join(root, "daily-content-queue.js"));
const currentModule = require(path.join(root, "daily-questions.js"));
const current = Array.isArray(currentModule) ? currentModule : (global.window.GENAI_PASSPORT_QUESTIONS || []);
const publishedIds = new Set(current.map((question) => question.id));
const next = queue.find((question) => !publishedIds.has(question.id));

if (!next) {
  console.log("Daily content queue is empty; no change made.");
  process.exit(0);
}

const updated = [...current, { ...next, reviewStatus: "approved", reviewedAt: new Date().toISOString().slice(0, 10) }];
const output = `(() => {\n  const questions = ${JSON.stringify(updated, null, 2)};\n  window.GENAI_PASSPORT_QUESTIONS = [...(window.GENAI_PASSPORT_QUESTIONS || []), ...questions];\n  if (typeof module !== "undefined") module.exports = questions;\n})();\n`;
fs.writeFileSync(path.join(root, "daily-questions.js"), output, "utf8");
console.log(`Published ${next.id}; queue remaining: ${queue.length - updated.length}`);
