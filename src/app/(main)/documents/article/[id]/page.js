import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";
import ArticleViewer from "@/components/ArticleViewer";
import { buildPreviewPages } from "@/lib/preview";
import { loc } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { articleJsonLd, articleFaqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// Parse an article's stored tags (JSON string) into localized keyword labels.
function tagKeywords(tagsJson) {
  try {
    const arr = JSON.parse(tagsJson || "[]");
    return arr.map((t) => t?.vi || t?.en).filter(Boolean);
  } catch {
    return [];
  }
}

// Pull FAQ pairs + first paragraph from an article's full pages (for structured data).
function extractSeoContent(pages) {
  const qa = [];
  let firstPara = "";
  for (const p of pages || []) {
    let blocks;
    try {
      blocks = JSON.parse(p.content);
    } catch {
      continue;
    }
    const list = blocks?.vi || blocks?.en || [];
    for (const b of list) {
      if (b?.t === "qa" && b.q && b.a) qa.push({ q: b.q, a: b.a });
      if (!firstPara && b?.t === "p" && b.text) firstPara = b.text;
    }
  }
  return { qa, firstPara };
}

// Render an array of JSON-LD objects as <script> tags (server component friendly).
function JsonLd({ blocks }) {
  return (
    <>
      {blocks.filter(Boolean).map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}

const PREVIEW_FRACTION = 0.25; // signed-out visitors see 1/4 of the content

export const dynamic = "force-dynamic";

// Explicit select (omits newer columns like upvotes/downvotes) so the page keeps
// working even before `prisma db push` adds the Vote/Comment schema.
async function loadArticle(id) {
  return prisma.article.findUnique({
    where: { id },
    select: {
      id: true, title: true, summary: true, tags: true, body: true,
      viewCount: true, readCount: true, createdAt: true,
      category: {
        select: {
          id: true, title: true,
          articles: { where: { published: true }, orderBy: { order: "asc" }, select: { id: true, title: true } },
        },
      },
      pages: { orderBy: { order: "asc" }, select: { content: true, caption: true } },
    },
  });
}

async function loadVotes(articleId, studentId) {
  let up = 0, down = 0, myVote = 0;
  try {
    up = await prisma.vote.count({ where: { articleId, value: 1 } });
    down = await prisma.vote.count({ where: { articleId, value: -1 } });
    if (studentId) {
      const v = await prisma.vote.findUnique({ where: { articleId_studentId: { articleId, studentId } } });
      myVote = v?.value || 0;
    }
  } catch { /* not migrated yet */ }
  return { up, down, myVote };
}

export async function generateMetadata({ params }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, summary: true, tags: true, createdAt: true, category: { select: { title: true } } },
  });
  if (!article) return { title: "CyberSoft Tester" };
  const title = loc(article.title, "vi");
  const summary = loc(article.summary, "vi") || "Tài liệu học Tester / QA thực chiến tại CyberSoft.";
  const cat = article.category ? loc(article.category.title, "vi") : "Tester";
  const keywords = [
    ...tagKeywords(article.tags),
    title, cat,
    "tester", "kiểm thử phần mềm", "QA", "học tester", "khóa học tester", "CyberSoft Tester",
  ];
  const canonical = `/documents/article/${article.id}`;
  return {
    title: `${title} — CyberSoft Tester`,
    description: summary,
    keywords,
    authors: [{ name: "CyberSoft Academy" }],
    alternates: {
      canonical,
      languages: { "vi-VN": canonical, "en-US": canonical, "ja-JP": canonical },
    },
    openGraph: {
      title: `${title} — CyberSoft Tester`,
      description: summary,
      type: "article",
      url: canonical,
      siteName: "CyberSoft Tester",
      publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : undefined,
      section: cat,
      tags: tagKeywords(article.tags),
    },
    twitter: { card: "summary_large_image", title: `${title} — CyberSoft Tester`, description: summary },
  };
}

export default async function ArticleDetail({ params }) {
  const student = await getCurrentStudent();

  const article = await loadArticle(params.id);
  if (!article) return notFound();

  const siblings = article.category?.articles || [];
  const idx = siblings.findIndex((s) => s.id === article.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  const category = article.category ? { id: article.category.id, title: article.category.title } : null;

  // ----- Per-article structured data (SEO + AI Overview) — built from the FULL article -----
  const titleVi = loc(article.title, "vi");
  const summaryVi = loc(article.summary, "vi");
  const catTitleVi = category ? loc(category.title, "vi") : "";
  const { qa, firstPara } = extractSeoContent(article.pages);
  const seoDescription =
    summaryVi || (firstPara ? firstPara.slice(0, 300) : "Tài liệu học Tester / QA thực chiến tại CyberSoft Tester.");
  const jsonLd = [
    articleJsonLd({
      id: article.id, title: titleVi, description: seoDescription,
      category: catTitleVi, datePublished: article.createdAt,
      keywords: tagKeywords(article.tags), inLanguage: "vi",
    }),
    articleFaqJsonLd(qa),
    breadcrumbJsonLd({ id: article.id, title: titleVi, category: catTitleVi ? { title: catTitleVi } : null }),
  ];

  const social = await loadVotes(article.id, student?.id);
  const related = siblings.filter((s) => s.id !== article.id).slice(0, 8).map((s) => ({ id: s.id, title: s.title }));
  const meta = {
    createdAt: article.createdAt,
    pageCount: article.pages.length,
    social,
    related,
  };

  if (!student) {
    // ----- SIGNED-OUT: serve only a ~1/4 preview (locked blocks never serialized). -----
    const { pages, shownBlocks, totalBlocks } = buildPreviewPages(
      article.pages.map((p) => ({ content: p.content, caption: p.caption })),
      PREVIEW_FRACTION
    );
    return (
      <>
        <JsonLd blocks={jsonLd} />
        <ArticleViewer
          article={{
            id: article.id, title: article.title, summary: article.summary, tags: article.tags,
            viewCount: article.viewCount, readCount: article.readCount, category,
            position: idx >= 0 ? { index: idx + 1, total: siblings.length } : null,
            locked: true, previewInfo: { shown: shownBlocks, total: totalBlocks },
            pages, ...meta,
          }}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd blocks={jsonLd} />
      <ArticleViewer
        article={{
          id: article.id, title: article.title, summary: article.summary, tags: article.tags,
          body: article.body, viewCount: article.viewCount, readCount: article.readCount, category,
          position: idx >= 0 ? { index: idx + 1, total: siblings.length } : null,
          prev: prev ? { id: prev.id, title: prev.title } : null,
          next: next ? { id: next.id, title: next.title } : null,
          pages: article.pages.map((p) => ({ content: p.content, caption: p.caption })),
          ...meta,
        }}
      />
    </>
  );
}
