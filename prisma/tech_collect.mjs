// ============================================================================
// THU THẬP CÔNG NGHỆ MỚI NHẤT → viết bài tự động → insert Postgres.
// Chạy định kỳ (GitHub Actions cron) trên self-hosted runner.
//  - Dùng Claude API (web search) nghiên cứu công nghệ AI/Testing mới nhất,
//    áp vào 1 bài toán Testing cụ thể, xuất bài 3 ngôn ngữ (vi/en/ja).
//  - Danh mục DOCS "cong-nghe-moi-nhat" (1 cấp, level=advanced).
//  - Idempotent theo slug: đã có thì bỏ qua (không trùng).
// ENV: ANTHROPIC_API_KEY (bắt buộc), DATABASE_URL (Postgres), TECH_MODEL (tuỳ chọn).
// ============================================================================
import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";
import { P, UL, CODE, TIP, buildDoc, tags } from "./engine.mjs";

const prisma = new PrismaClient();
const J = (o) => JSON.stringify(o);
const CAT_SLUG = "cong-nghe-moi-nhat";
const MODEL = process.env.TECH_MODEL || "claude-opus-4-8";

// --- Bảo đảm danh mục tồn tại (1 cấp, tab DOCS) ---
async function ensureCategory() {
  const title = { vi: "Công nghệ mới nhất", en: "Latest Technology", ja: "最新テクノロジー" };
  const description = {
    vi: "Công nghệ & AI mới nhất phục vụ ngành Testing — tự động cập nhật định kỳ, áp dụng vào bài toán kiểm thử cụ thể.",
    en: "Latest tech & AI for the Testing field — auto-updated, applied to concrete testing problems.",
    ja: "テスト分野向けの最新技術・AI — 定期自動更新、具体的なテスト課題に応用。",
  };
  const cat = await prisma.category.upsert({
    where: { slug: CAT_SLUG },
    update: { title: J(title), description: J(description) },
    create: { tab: "DOCS", slug: CAT_SLUG, title: J(title), description: J(description), icon: "🚀", order: 50 },
  });
  return cat;
}

// --- Prompt: nghiên cứu + viết bài (trả JSON) ---
const SCHEMA_HINT = `Trả về DUY NHẤT một JSON hợp lệ (không kèm giải thích, không markdown) theo dạng:
{
  "slug": "kebab-case-tieng-anh-ngan-gon",
  "title": { "vi": "...", "en": "...", "ja": "..." },
  "summary": { "vi": "1-2 câu", "en": "...", "ja": "..." },
  "sections": [
    { "heading": { "vi": "...", "en": "...", "ja": "..." },
      "items": [
        { "type": "p",  "vi": "đoạn văn", "en": "...", "ja": "..." },
        { "type": "tip","vi": "mẹo/thực chiến", "en": "...", "ja": "..." },
        { "type": "ul", "vi": ["mục 1","mục 2"], "en": ["..."], "ja": ["..."] },
        { "type": "code","lang": "js", "code": "// không dịch" }
      ] }
  ]
}
Yêu cầu: 6-9 sections; mỗi ngôn ngữ dịch THẬT (ja khác en); văn phong thực chiến cho Tester/QA; tiếng Việt đủ dấu.`;

async function generateArticle() {
  const client = new Anthropic();
  const prompt = `Bạn là biên tập viên kỹ thuật cho nền tảng luyện nghề Software Tester (CyberSoft).
Dùng web search để tìm MỘT công nghệ / công cụ / kỹ thuật AI hoặc công nghệ MỚI NỔI trong vài tuần gần đây có liên quan tới Kiểm thử phần mềm (AI trong testing, test automation, LLM cho QA, self-healing tests, visual testing, v.v.).
Chọn 1 chủ đề cụ thể, rồi VIẾT MỘT BÀI HƯỚNG DẪN áp dụng nó vào MỘT BÀI TOÁN TESTING CỤ THỂ (nêu bối cảnh, cách làm từng bước, ví dụ, lưu ý thực chiến, hạn chế).
Bài dành cho người đi làm QA (một cấp, không phân người mới). Trích dẫn tên công nghệ/công cụ và phiên bản nếu có.

${SCHEMA_HINT}`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }],
    messages: [{ role: "user", content: prompt }],
  });
  // Gộp toàn bộ text block, tách JSON.
  const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("Không tìm thấy JSON trong phản hồi:\n" + text.slice(0, 500));
  return JSON.parse(m[0]);
}

// --- Map JSON -> pages (block engine) ---
function toPages(data) {
  return (data.sections || []).map((s) => {
    const blocks = [];
    for (const it of s.items || []) {
      if (it.type === "tip") blocks.push(TIP(it.vi, it.en, it.ja));
      else if (it.type === "ul") blocks.push(UL(it.vi || [], it.en || [], it.ja || []));
      else if (it.type === "code") blocks.push(CODE(it.lang || "text", it.code || ""));
      else blocks.push(P(it.vi, it.en, it.ja));
    }
    return { heading: s.heading, blocks };
  });
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("Thiếu ANTHROPIC_API_KEY.");
  const cat = await ensureCategory();

  const data = await generateArticle();
  const slug = String(data.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 80)
    || "tech-" + new Date().toISOString().slice(0, 10);

  const existed = await prisma.article.findUnique({ where: { slug } });
  if (existed) { console.log("Bài đã tồn tại, bỏ qua:", slug); return; }

  const pages = buildDoc(toPages(data));
  await prisma.article.create({
    data: {
      slug,
      categoryId: cat.id,
      title: J(data.title || {}),
      summary: J(data.summary || {}),
      body: J(data.summary || {}),
      cover: "🚀",
      tags: J(tags("congnghe", "ai", "advanced")),
      level: "advanced",     // 1 cấp — luôn advanced
      compliant: true,
      published: true,
      order: 0,
      pages: { create: pages.map((p, i) => ({ order: i + 1, kind: "text", content: J(p.blocks), caption: J(p.heading) })) },
    },
  });
  console.log(`✓ Đã tạo bài "${data.title?.vi || slug}" (slug=${slug}, ${pages.length} trang) trong danh mục ${CAT_SLUG}.`);
}

main()
  .catch((e) => { console.error("!!! tech_collect lỗi:", e?.message || e); process.exit(1); })
  .finally(() => prisma.$disconnect());
