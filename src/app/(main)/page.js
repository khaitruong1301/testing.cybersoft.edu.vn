import { prisma } from "@/lib/prisma";
import Landing from "@/components/Landing";

export const dynamic = "force-dynamic";

async function loadFeatured() {
  const rich = {
    where: { published: true, compliant: true }, orderBy: { viewCount: "desc" }, take: 12,
    select: {
      id: true, title: true, summary: true, cover: true, tags: true,
      viewCount: true, readCount: true, createdAt: true,
      upvotes: true, _count: { select: { pages: true, comments: true } },
    },
  };
  const safe = {
    where: { published: true }, orderBy: { viewCount: "desc" }, take: 12,
    select: {
      id: true, title: true, summary: true, cover: true, tags: true,
      viewCount: true, readCount: true, createdAt: true,
      _count: { select: { pages: true } },
    },
  };
  try { return await prisma.article.findMany(rich); }
  catch { return await prisma.article.findMany(safe); }
}

export default async function HomePage() {
  const [featured, categories, articleCount, questionCount, categoryCount] = await Promise.all([
    loadFeatured(),
    prisma.category.findMany({ where: { tab: "DOCS" }, orderBy: { order: "asc" } }),
    prisma.article.count(),
    prisma.interviewQuestion.count(),
    prisma.category.count(),
  ]);

  const plain = featured.map((a) => ({
    id: a.id,
    title: a.title,
    summary: a.summary,
    cover: a.cover,
    tags: a.tags,
    viewCount: a.viewCount,
    readCount: a.readCount,
    createdAt: a.createdAt,
    pageCount: a._count?.pages || 0,
    upvotes: a.upvotes || 0,
    commentCount: a._count?.comments || 0,
  }));

  return (
    <Landing
      featured={plain}
      categories={categories.map((c) => ({ id: c.id, title: c.title, icon: c.icon }))}
      stats={{ articles: articleCount, questions: questionCount, categories: categoryCount }}
    />
  );
}
