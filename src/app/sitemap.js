import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const now = new Date();
  const routes = ["", "/documents", "/cv", "/interview", "/istqb", "/mock", "/login"].map((p) => ({
    url: `${SITE_URL}${p || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));

  let articles = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true, compliant: true },
      select: { id: true, createdAt: true },
    });
  } catch {
    try { articles = await prisma.article.findMany({ where: { published: true }, select: { id: true, createdAt: true } }); } catch { articles = []; }
  }

  const articleEntries = articles.map((a) => ({
    url: `${SITE_URL}/documents/article/${a.id}`,
    lastModified: a.createdAt || now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...articleEntries];
}
