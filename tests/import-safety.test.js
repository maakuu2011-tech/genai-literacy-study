const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const oneMiB = 1024 * 1024;

function createElement(tagName = "div") {
  return {
    tagName: tagName.toUpperCase(),
    children: [],
    className: "",
    classList: { add() {}, toggle() {} },
    dataset: {},
    hidden: false,
    value: "",
    textContent: "",
    appendChild(child) { this.children.push(child); return child; },
    replaceChildren(...children) { this.children = children; },
    addEventListener() {},
    scrollIntoView() {}
  };
}

function loadApp() {
  const elements = new Map();
  const storage = new Map();
  const sandbox = {
    Blob: class {},
    URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    alert() {},
    clearInterval() {},
    confirm: () => true,
    console,
    document: {
      createElement,
      getElementById(id) {
        if (!elements.has(id)) elements.set(id, createElement());
        return elements.get(id);
      },
      querySelectorAll() { return []; }
    },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value)
    },
    module: { exports: {} },
    setInterval: () => 1,
    window: { innerWidth: 1024, scrollY: 0, scrollTo() {} }
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const filename of ["questions.js", "extra-questions.js", "lessons.js", "app.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, filename), "utf8"), sandbox, { filename });
  }
  sandbox.module.exports.testStorage = storage;
  return sandbox.module.exports;
}

function normalPayload(app) {
  const questionId = app.questions[0].id;
  const lessonCategory = app.questions[0].category;
  return {
    app: "生成AIリテラシー学習室",
    version: 3,
    exportedAt: "2026-07-12T01:02:03.000Z",
    progress: {
      [questionId]: {
        selected: 0,
        lastCorrect: false,
        needsReview: true,
        reviewAt: "2026-07-13T01:02:03.000Z",
        answeredAt: "2026-07-11T01:02:03.000Z",
        answeredIn: "exam",
        bookmarked: true,
        bookmarkedAt: "2026-07-11T01:03:03.000Z",
        confidenceRating: "uncertain",
        ratedAt: "2026-07-11T01:04:03.000Z"
      }
    },
    settings: { dailyGoal: 15, examSize: 60 },
    examHistory: [{
      id: "2026-07-11T02:03:03.000Z",
      date: "2026-07-11T02:03:04.000Z",
      score: 16,
      total: 20,
      percent: 80,
      durationSeconds: 1199,
      unanswered: 2,
      wrongIds: [questionId]
    }],
    activity: { "2026-07-11": 12 },
    lessonProgress: { [lessonCategory]: { completedAt: "2026-07-10T01:02:03.000Z" } }
  };
}

function fileFromText(text, size = Buffer.byteLength(text)) {
  return { size, async text() { return text; } };
}

function fileFromPayload(payload) {
  return fileFromText(JSON.stringify(payload));
}

function importedStateSnapshot(app) {
  return JSON.stringify({
    progress: app.state.progress,
    settings: app.state.settings,
    examHistory: app.state.examHistory,
    activity: app.state.activity,
    lessonProgress: app.state.lessonProgress,
    currentIndex: app.state.currentIndex
  });
}

function storageSnapshot(app) {
  return JSON.stringify([...app.testStorage.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

async function assertRejectedWithoutMutation(app, file, message) {
  const stateBefore = importedStateSnapshot(app);
  const storageBefore = storageSnapshot(app);
  await assert.rejects(app.importStudyData(file), message);
  assert.equal(importedStateSnapshot(app), stateBefore);
  assert.equal(storageSnapshot(app), storageBefore);
}

test("imports a valid file and preserves every supported progress and exam field", async () => {
  const app = loadApp();
  const payload = normalPayload(app);
  const questionId = app.questions[0].id;
  await app.importStudyData(fileFromPayload(payload));

  assert.deepEqual(JSON.parse(JSON.stringify(app.state.progress[questionId])), payload.progress[questionId]);
  assert.deepEqual(JSON.parse(JSON.stringify(app.state.examHistory[0])), payload.examHistory[0]);
  assert.deepEqual({ ...app.state.settings }, payload.settings);
  assert.equal(app.state.activity["2026-07-11"], 12);
  assert.equal(app.state.lessonProgress[app.questions[0].category].completedAt, "2026-07-10T01:02:03.000Z");
  assert.equal(app.testStorage.size, 5);
});

test("rejects broken JSON and files larger than 1 MiB without mutation", async () => {
  const app = loadApp();
  app.state.currentIndex = 7;
  app.testStorage.set("sentinel", "preserved");

  await assertRejectedWithoutMutation(app, fileFromText("{broken"), /JSON/);
  let read = false;
  await assertRejectedWithoutMutation(app, {
    size: oneMiB + 1,
    async text() { read = true; return JSON.stringify(normalPayload(app)); }
  }, /1MiB/);
  assert.equal(read, false);
});

test("rejects another app, missing or mistyped required fields, and versions 1 and 2", async () => {
  const app = loadApp();
  app.state.currentIndex = 9;
  app.testStorage.set("sentinel", "preserved");

  const anotherApp = normalPayload(app);
  anotherApp.app = "別のアプリ";
  await assertRejectedWithoutMutation(app, fileFromPayload(anotherApp), /形式/);

  const invalidDate = normalPayload(app);
  invalidDate.exportedAt = "2026-07-12T24:00:00.000Z";
  await assertRejectedWithoutMutation(app, fileFromPayload(invalidDate), /日時/);

  for (const version of [1, 2]) {
    const payload = normalPayload(app);
    payload.version = version;
    await assertRejectedWithoutMutation(app, fileFromPayload(payload), /形式/);
  }

  for (const field of ["progress", "settings", "examHistory", "activity", "lessonProgress"]) {
    const missing = normalPayload(app);
    delete missing[field];
    await assertRejectedWithoutMutation(app, fileFromPayload(missing), /形式/);
  }

  const invalidTypes = {
    progress: [],
    settings: [],
    examHistory: {},
    activity: [],
    lessonProgress: []
  };
  for (const [field, value] of Object.entries(invalidTypes)) {
    const payload = normalPayload(app);
    payload[field] = value;
    await assertRejectedWithoutMutation(app, fileFromPayload(payload), /形式/);
  }
});

test("rejects oversized collections before normalizing their entries", async () => {
  const app = loadApp();
  app.testStorage.set("sentinel", "preserved");
  const cases = [
    ["progress", Object.fromEntries(Array.from({ length: 501 }, (_, index) => [`id-${index}`, {}]))],
    ["examHistory", Array.from({ length: 101 }, () => normalPayload(app).examHistory[0])],
    ["activity", Object.fromEntries(Array.from({ length: 3661 }, (_, index) => [`day-${index}`, 1]))],
    ["lessonProgress", Object.fromEntries(Array.from({ length: 101 }, (_, index) => [`lesson-${index}`, {}]))]
  ];

  for (const [field, value] of cases) {
    const payload = normalPayload(app);
    payload[field] = value;
    await assertRejectedWithoutMutation(app, fileFromPayload(payload), /多すぎます/);
  }

  const tooManyWrongIds = normalPayload(app);
  tooManyWrongIds.examHistory[0].wrongIds = Array.from({ length: 61 }, (_, index) => `id-${index}`);
  await assertRejectedWithoutMutation(app, fileFromPayload(tooManyWrongIds), /問題ID/);
});

test("slices exam history before normalizing entries and caps imported activity", () => {
  const app = loadApp();
  const payload = normalPayload(app);
  payload.examHistory = Array.from({ length: 21 }, (_, index) => ({
    ...payload.examHistory[0],
    id: `2026-07-${String(index + 1).padStart(2, "0")}T02:03:03.000Z`,
    date: `2026-07-${String(index + 1).padStart(2, "0")}T02:03:04.000Z`,
    wrongIds: index === 20 ? Array.from({ length: 61 }, (_, id) => `id-${id}`) : payload.examHistory[0].wrongIds
  }));
  payload.activity["2026-07-12"] = 10001;

  const result = app.sanitizeImportedData(payload);
  assert.equal(result.examHistory.length, 20);
  assert.equal(result.activity["2026-07-12"], 10000);
});

test("drops XSS, unknown IDs, invalid dates, and out-of-range nested values", () => {
  const app = loadApp();
  const payload = normalPayload(app);
  const knownId = app.questions[0].id;
  payload.progress[knownId] = {
    selected: 999,
    bookmarked: true,
    bookmarkedAt: "<img src=x onerror=alert(1)>",
    answeredIn: "<script>alert(1)</script>",
    extra: "<svg onload=alert(1)>"
  };
  payload.progress["<img src=x onerror=alert(1)>"] = { selected: 0 };
  payload.examHistory = [{ ...payload.examHistory[0], id: "<script>alert(1)</script>" }];
  payload.activity = { "2026-02-30": 1, "2026-07-11": -1 };
  payload.lessonProgress = { "<script>alert(1)</script>": { completedAt: "2026-07-11T00:00:00.000Z" } };

  const result = app.sanitizeImportedData(payload);
  assert.deepEqual({ ...result.progress[knownId] }, { bookmarked: true });
  assert.equal(result.progress["<img src=x onerror=alert(1)>"], undefined);
  assert.equal(result.examHistory.length, 0);
  assert.deepEqual({ ...result.activity }, {});
  assert.deepEqual({ ...result.lessonProgress }, {});
  assert.doesNotMatch(JSON.stringify(result), /<script|<img|<svg/);
});

test("recordActivity uses the same cap as imported activity", () => {
  const app = loadApp();
  const today = (() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  })();
  app.state.activity[today] = 9999;
  app.recordActivity(10);
  assert.equal(app.state.activity[today], 10000);
});

test("renders imported exam history with text-only DOM nodes", () => {
  const app = loadApp();
  app.state.examHistory = app.sanitizeImportedData(normalPayload(app)).examHistory;
  Object.defineProperty(app.elements.examHistory, "innerHTML", {
    set() { throw new Error("innerHTML must not be used"); }
  });

  app.renderExamHistory();

  const [row] = app.elements.examHistory.children;
  assert.equal(row.className, "exam-history-row");
  assert.deepEqual(row.children.map((child) => child.tagName), ["SPAN", "SPAN", "STRONG", "SPAN"]);
  assert.equal(row.children[2].textContent, "16/20・80%");
});
