// Server-only helper: truncate an article's pages to a fraction of its content.
// Used to serve a ~1/4 preview to signed-out visitors. The omitted blocks are
// NEVER serialized to the client, so they cannot be revealed via DevTools.

const LANGS = ["vi", "en", "ja"];

function parse(jsonString) {
  if (!jsonString) return {};
  try {
    return typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
  } catch {
    return {};
  }
}

// Returns { pages, shownBlocks, totalBlocks }.
// `fraction` in (0,1]; blocks kept are index-aligned across all languages.
export function buildPreviewPages(pages, fraction = 0.25) {
  const parsed = pages.map((p) => parse(p.content));
  const pageCounts = parsed.map((obj) =>
    Math.max(0, ...LANGS.map((l) => (Array.isArray(obj[l]) ? obj[l].length : 0)))
  );
  const totalBlocks = pageCounts.reduce((a, b) => a + b, 0);
  const cutoff = Math.max(1, Math.floor(totalBlocks * fraction));

  const out = [];
  let acc = 0;
  for (let i = 0; i < pages.length; i++) {
    if (acc >= cutoff) break;
    const remaining = cutoff - acc;
    const cnt = pageCounts[i];
    if (cnt <= remaining) {
      out.push({ content: pages[i].content, caption: pages[i].caption });
      acc += cnt;
    } else {
      const obj = parsed[i];
      const trunc = {};
      LANGS.forEach((l) => {
        trunc[l] = Array.isArray(obj[l]) ? obj[l].slice(0, remaining) : [];
      });
      out.push({ content: JSON.stringify(trunc), caption: pages[i].caption });
      acc += remaining;
    }
  }
  return { pages: out, shownBlocks: acc, totalBlocks };
}
