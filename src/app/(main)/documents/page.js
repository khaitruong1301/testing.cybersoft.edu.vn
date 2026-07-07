import { prisma } from "@/lib/prisma";
import DocumentsBrowser from "@/components/DocumentsBrowser";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tài liệu học Tester / QA thực chiến",
  description:
    "Bộ tài liệu Kiểm thử phần mềm thực chiến: Manual Testing, thiết kế test case, bug report, kiểm thử API (Postman), Automation Testing (Playwright, Selenium), Performance và AI Testing.",
  keywords: ["tài liệu tester", "học kiểm thử phần mềm", "manual testing", "automation testing", "AI testing", "CyberSoft"],
  alternates: { canonical: "/documents" },
  openGraph: { title: "Tài liệu học Tester / QA thực chiến — CyberSoft", url: "/documents", type: "website" },
};

async function loadDocCategories() {
  const richArticle = {
    where: { published: true, compliant: true }, orderBy: { order: "asc" },
    select: {
      id: true, title: true, summary: true, cover: true, tags: true, level: true,
      viewCount: true, readCount: true, createdAt: true,
      upvotes: true, downvotes: true,
      _count: { select: { pages: true, comments: true } },
    },
  };
  const safeArticle = {
    where: { published: true }, orderBy: { order: "asc" },
    select: {
      id: true, title: true, summary: true, cover: true, tags: true,
      viewCount: true, readCount: true, createdAt: true,
      _count: { select: { pages: true } },
    },
  };
  try {
    return await prisma.category.findMany({ where: { tab: "DOCS" }, orderBy: { order: "asc" }, include: { articles: richArticle } });
  } catch {
    // Pre-migration (no Vote/Comment yet) — fall back without those counts.
    return await prisma.category.findMany({ where: { tab: "DOCS" }, orderBy: { order: "asc" }, include: { articles: safeArticle } });
  }
}

export default async function DocumentsPage() {
  const categories = await loadDocCategories();

  const plain = categories.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    icon: c.icon,
    articles: c.articles.map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      cover: a.cover,
      tags: a.tags,
      level: a.level || "advanced",
      viewCount: a.viewCount,
      readCount: a.readCount,
      createdAt: a.createdAt,
      pageCount: a._count?.pages || 0,
      upvotes: a.upvotes || 0,
      commentCount: a._count?.comments || 0,
    })),
  }));

  return <DocumentsBrowser categories={plain} />;
}
