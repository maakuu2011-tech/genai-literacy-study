const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
global.window = {};
require(path.join(root, "questions.js"));
require(path.join(root, "extra-questions.js"));
require(path.join(root, "content-overrides.js"));
require(path.join(root, "practice-expansion.js"));
require(path.join(root, "practice-expansion-2.js"));
require(path.join(root, "daily-questions.js"));
require(path.join(root, "daily-content-overrides.js"));
require(path.join(root, "lessons.js"));

const questions = window.GENAI_PASSPORT_QUESTIONS;
const lessons = window.GENAI_PASSPORT_LESSONS;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const sources = JSON.parse(fs.readFileSync(path.join(root, "sources.json"), "utf8"));
const errors = [];
const fail = (message) => errors.push(message);
const sourceById = new Map(sources.map((source) => [source.id, source]));
const publicMode = process.argv.includes("--public");
const evidenceRequiredIds = new Set([
  "law-001",
  "law-002",
  "law-003",
  "law-004",
  "law-005",
  "law-006",
  "law-007",
  "law-008",
  "law-009",
  "law-010",
  "law-011",
  "law-012",
  "law-013",
  "law-014",
  "law-015",
  "law-016",
  "law-ai-002"
]);

if (!Array.isArray(questions) || questions.length < 100) fail("問題数は100問以上必要です。");

const ids = new Set();
const prompts = new Set();
const answerCounts = [0, 0, 0, 0];
const allowedDifficulty = new Set(["easy", "normal", "hard"]);
const allowedConfidence = new Set(["high", "medium"]);

questions.forEach((question, index) => {
  const label = question.id || `index:${index}`;
  if (!question.id || ids.has(question.id)) fail(`${label}: IDが空か重複しています。`);
  if (!question.question || prompts.has(question.question)) fail(`${label}: 問題文が空か重複しています。`);
  ids.add(question.id);
  prompts.add(question.question);
  if (!Array.isArray(question.choices) || question.choices.length !== 4) fail(`${label}: 選択肢は4件必要です。`);
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) fail(`${label}: 正解番号が不正です。`);
  else answerCounts[question.answer] += 1;
  if (!allowedDifficulty.has(question.difficulty)) fail(`${label}: 難易度が不正です。`);
  if (!allowedConfidence.has(question.confidence)) fail(`${label}: 信頼度が不正です。`);
  if (!question.category || !question.keyword || !question.source) fail(`${label}: 分類または出典がありません。`);
  if (!question.explanation || question.explanation.length < 35) fail(`${label}: 解説が短すぎます。`);
  if (new Set(question.choices).size !== 4) fail(`${label}: 同じ選択肢があります。`);
  if (evidenceRequiredIds.has(question.id)) {
    if (!Array.isArray(question.choiceExplanations) || question.choiceExplanations.length !== 4 || question.choiceExplanations.some((text) => typeof text !== "string" || text.length < 12)) {
      fail(`${label}: 選択肢ごとの解説が不足しています。`);
    }
    if (!Array.isArray(question.sourceRefs) || question.sourceRefs.length < 1) {
      fail(`${label}: sourceRefs が不足しています。`);
    } else {
      question.sourceRefs.forEach((sourceRef, refIndex) => {
        const source = sourceById.get(sourceRef.sourceId);
        if (!source) fail(`${label}: sourceRefs[${refIndex}] の sourceId が sources.json にありません。`);
        if (source && source.url !== sourceRef.url) fail(`${label}: sourceRefs[${refIndex}] の URL が sources.json と一致しません。`);
        if (!sourceRef.locator || !sourceRef.claim) fail(`${label}: sourceRefs[${refIndex}] の locator/claim が不足しています。`);
      });
    }
    if (!["pending", "approved", "rejected"].includes(question.reviewStatus)) fail(`${label}: reviewStatus が不正です。`);
    if (question.reviewStatus === "approved" && !/^\d{4}-\d{2}-\d{2}$/.test(question.reviewedAt || "")) fail(`${label}: reviewedAt が不正です。`);
    if (publicMode && (question.confidence !== "high" || question.reviewStatus !== "approved")) {
      fail(`${label}: 公開用検証では high かつ approved が必要です。`);
    }
  }
});

const questionCategories = new Set(questions.map((question) => question.category));
const lessonCategories = new Set();
lessons.forEach((lesson) => {
  const label = lesson.category || "カテゴリなし";
  if (!questionCategories.has(lesson.category)) fail(`${label}: 問題カテゴリに対応しない教材です。`);
  if (lessonCategories.has(lesson.category)) fail(`${label}: 教材カテゴリが重複しています。`);
  lessonCategories.add(lesson.category);
  const contentLength = lesson.lead.length
    + lesson.sections.reduce((total, section) => total + section.heading.length + section.body.length, 0)
    + lesson.keyPoints.join("").length
    + lesson.traps.join("").length;
  if (lesson.sections.length < 4) fail(`${label}: 教材本文は4節以上必要です。`);
  if (contentLength < 650) fail(`${label}: 教材本文が短すぎます（${contentLength}文字）。`);
  if (lesson.keyPoints.length < 3 || lesson.traps.length < 3) fail(`${label}: 要点または引っかけが不足しています。`);
  if (!lesson.sources.length) fail(`${label}: 教材の出典がありません。`);
});

questionCategories.forEach((category) => {
  if (!lessonCategories.has(category)) fail(`${category}: 対応する章別教材がありません。`);
});

if (Math.max(...answerCounts) - Math.min(...answerCounts) > 2) {
  fail(`正解位置が偏っています: ${answerCounts.join("/")}`);
}

const requiredTopics = ["AI法", "RAG", "AIエージェント", "Gemini", "Claude", "Copilot", "Codex"];
requiredTopics.forEach((topic) => {
  if (!questions.some((question) => `${question.keyword} ${question.question} ${question.explanation}`.includes(topic))) {
    fail(`2026年シラバスの必須トピックがありません: ${topic}`);
  }
});

const htmlIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const referencedIds = [...app.matchAll(/getElementById\("([^"]+)"\)/g)].map((match) => match[1]);
referencedIds.forEach((id) => {
  if (!htmlIds.has(id)) fail(`app.jsが存在しないHTML要素を参照しています: #${id}`);
});

sources.forEach((source) => {
  if (!source.id || !source.title || !/^https:\/\//.test(source.url) || !/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt)) {
    fail(`出典台帳の形式が不正です: ${source.id || "IDなし"}`);
  }
});

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

const categories = new Set(questions.map((question) => question.category));
console.log(`OK: ${questions.length}問 / ${lessons.length}教材 / ${categories.size}カテゴリ / 正解位置 ${answerCounts.join("・")} / 出典 ${sources.length}件`);
