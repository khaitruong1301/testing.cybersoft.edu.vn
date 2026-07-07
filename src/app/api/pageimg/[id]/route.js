import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";
import { renderPageSVG } from "@/lib/pageImage";
import { loc } from "@/lib/i18n";

export const dynamic = "force-dynamic";

// Serve a view-only page image. Requires an active student session.
export async function GET(req, { params }) {
  const student = await getCurrentStudent();
  if (!student) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const lang = ["vi", "en", "ja"].includes(searchParams.get("lang")) ? searchParams.get("lang") : "vi";

  const page = await prisma.articlePage.findUnique({
    where: { id: params.id },
    include: { article: true },
  });
  if (!page) return new Response("Not found", { status: 404 });

  const total = await prisma.articlePage.count({ where: { articleId: page.articleId } });

  let blocks = [];
  try {
    const parsed = JSON.parse(page.content || "{}");
    blocks = parsed[lang] || parsed.vi || parsed.en || [];
  } catch {}

  const heading = loc(page.caption, lang);
  let svg = renderPageSVG(blocks, { heading, index: page.order, total, title: "CyberSoft Tester" });

  // Faint per-student watermark to discourage screenshots/sharing.
  const mark = `${student.email}`;
  const wm = `<text x="450" y="620" font-family="Inter,Arial" font-size="26" fill="#0f172a" fill-opacity="0.05" text-anchor="middle" transform="rotate(-30 450 620)">${mark}</text>`;
  svg = svg.replace("</svg>", wm + "</svg>");

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
