import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

function parseTags(raw) {
  try { const a = JSON.parse(raw || "[]"); return Array.isArray(a) ? a.filter((x) => x && x.k) : []; }
  catch { return []; }
}

// Content-based recommender: from the articles a student bookmarked, recommend
// other published articles that share tags / category, ranked by overlap.
export async function GET() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ items: [] });

  let bookmarks = [];
  try {
    bookmarks = await prisma.bookmark.findMany({
      where: { studentId: student.id },
      include: { article: { select: { id: true, tags: true, categoryId: true } } },
    });
  } catch { bookmarks = []; }

  const views = await prisma.articleView.findMany({ where: { studentId: student.id }, select: { articleId: true } });
  const exclude = new Set([...bookmarks.map((b) => b.articleId), ...views.map((v) => v.articleId)]);

  // Profile of interest: tag weights + categories.
  const tagWeight = new Map();
  const catSet = new Set();
  const tagLabel = new Map(); // k -> {vi,en,ja}
  for (const b of bookmarks) {
    if (!b.article) continue;
    if (b.article.categoryId) catSet.add(b.article.categoryId);
    for (const tg of parseTags(b.article.tags)) {
      tagWeight.set(tg.k, (tagWeight.get(tg.k) || 0) + 1);
      if (!tagLabel.has(tg.k)) tagLabel.set(tg.k, { vi: tg.vi, en: tg.en, ja: tg.ja });
    }
  }

  const recSel = { id: true, title: true, cover: true, tags: true, categoryId: true, viewCount: true, category: { select: { title: true } } };
  let candidates = [];
  try {
    candidates = await prisma.article.findMany({ where: { published: true, compliant: true }, select: recSel, take: 400 });
  } catch {
    try { candidates = await prisma.article.findMany({ where: { published: true }, select: recSel, take: 400 }); } catch { candidates = []; }
  }

  const hasProfile = tagWeight.size > 0 || catSet.size > 0;
  const scored = [];
  for (const a of candidates) {
    if (exclude.has(a.id)) continue;
    let score = 0;
    let bestTag = null, bestW = 0;
    for (const tg of parseTags(a.tags)) {
      const w = tagWeight.get(tg.k) || 0;
      if (w > 0) { score += w * 2; if (w > bestW) { bestW = w; bestTag = tg; } }
    }
    if (catSet.has(a.categoryId)) score += 1;
    if (!hasProfile) score = (a.viewCount || 0) / 1000; // no bookmarks yet → popularity
    if (score <= 0) continue;
    scored.push({
      id: a.id,
      title: a.title,
      cover: a.cover,
      viewCount: a.viewCount,
      reasonTag: bestTag ? { vi: bestTag.vi, en: bestTag.en, ja: bestTag.ja } : null,
      reasonCat: bestTag ? null : (a.category ? a.category.title : null),
      score,
    });
  }
  scored.sort((x, y) => y.score - x.score);

  return NextResponse.json({
    items: scored.slice(0, 8).map(({ score, ...r }) => r),
    hasProfile,
  });
}
