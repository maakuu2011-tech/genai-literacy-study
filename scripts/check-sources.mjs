import fs from "node:fs/promises";

const sources = JSON.parse(await fs.readFile(new URL("../sources.json", import.meta.url), "utf8"));
const failures = [];

for (const source of sources) {
  try {
    const response = await fetch(source.url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      headers: { "user-agent": "genai-passport-study-source-check/1.0" }
    });
    const acceptedStatuses = Array.isArray(source.acceptedStatuses) ? source.acceptedStatuses : [];
    if (!response.ok && !acceptedStatuses.includes(response.status)) {
      failures.push(`${source.id}: HTTP ${response.status}`);
    } else if (!response.ok) {
      console.log(`MANUAL ${response.status} ${source.id} (${source.note})`);
    } else {
      const currentEtag = response.headers.get("etag");
      if (source.expectedEtag && currentEtag !== source.expectedEtag) {
        failures.push(`${source.id}: CONTENT_CHANGED expected=${source.expectedEtag} actual=${currentEtag || "none"}`);
      } else {
        const requiredText = Array.isArray(source.requiredText) ? source.requiredText : [];
        const body = requiredText.length ? await response.text() : "";
        const missingText = requiredText.filter((text) => !body.includes(text));
        if (missingText.length) failures.push(`${source.id}: REQUIRED_TEXT_MISSING ${missingText.join(" / ")}`);
        else console.log(`OK ${response.status} ${source.id}${source.expectedEtag ? ` etag=${currentEtag}` : ""}`);
      }
    }
  } catch (error) {
    failures.push(`${source.id}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
