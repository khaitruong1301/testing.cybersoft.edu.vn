import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function norm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d");
}

// Site-wide article search (title + summary + tags + category), accent-insensitive.
export async function GET(req) {
  const q = new URL(req.url).searchParams.get("q") || "";
  const nq = norm(q).trim();
  if (nq.length < 2) return NextResponse.json({ results: [] });

  const tokens = nq.split(/\s+/).filter(Boolean);

  const sel = {
    id: true, title: true, summary: true, cover: true, tags: true, viewCount: true,
    category: { select: { id: true, title: true, tab: true } },
  };
  let articles = [];
  try {
    articles = await prisma.article.findMany({ where: { published: true, compliant: true }, select: sel });
  } catch {
    // pre-migration (no `compliant` column yet)
    try { articles = await prisma.article.findMany({ where: { published: true }, select: sel }); } catch { articles = []; }
  }

  const scored = [];
  for (const a of articles) {
    const hay = norm([a.title, a.summary, a.tags, a.category?.title].filter(Boolean).join(" "));
    if (!tokens.every((tk) => hay.includes(tk))) continue;
    // simple score: title matches weigh more
    const titleHay = norm(a.title || "");
    const score = tokens.reduce((s, tk) => s + (titleHay.includes(tk) ? 3 : 1), 0) + Math.min(a.viewCount || 0, 5) / 100;
    scored.push({
      id: a.id,
      title: a.title,
      cover: a.cover,
      category: a.category ? { id: a.category.id, title: a.category.title, tab: a.category.tab } : null,
      score,
    });
  }
  scored.sort((x, y) => y.score - x.score);

  return NextResponse.json({
    results: scored.slice(0, 12).map(({ score, ...r }) => r),
    total: scored.length,
  });
}
