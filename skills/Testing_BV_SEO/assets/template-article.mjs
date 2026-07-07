// template-article.mjs (BẢN SEO) — KHUNG một module bài chuẩn SEO.
// Copy vào prisma/doc_<...>.mjs rồi ĐIỀN SÂU. Đặt engine.mjs + seo-engine.mjs + thumbnail.mjs cạnh nhau.
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, KEYTAKE, CTA, INTERNAL, buildSeo, slugify } from "./seo-engine.mjs";

// (0) TỪ KHÓA — quyết định TRƯỚC khi viết (đọc references/seo-standard.md + keyword-research).
const primaryKeyword = "kiểm thử API";                 // 1 từ khóa chính, có volume
const keywords = ["test API", "Postman", "kiểm thử tự động API", "khóa học tester"]; // LSI + phụ
const slug = slugify("kiem-thu-api-cho-nguoi-moi");    // slug ngắn, chứa keyword, không dấu

// (1) Khóa CyberSoft để CTA + Course schema (khớp references/cybersoft-courses-map.md)
const course = { key: "tester", vi: "Khóa Tester Automation (Manual → Playwright/Selenium)",
  en: "Tester Automation Course", ja: "テスター自動化コース",
  url: "https://cybersoft.edu.vn/khoa-hoc/tester", mode: "blended", workload: "PT120H",
  desc: "Lộ trình từ Manual đến Automation cho người mới tại CyberSoft Academy." };

// (2) THUMBNAIL riêng
const cover = makeThumb({ id: slug.slice(0, 6), domain: "saas", kind: "congnghe", label: "SEO · KIỂM THỬ API" });

// (3) Hình minh hoạ SVG (kiến trúc/luồng)
const svgFlow = `<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="200" rx="14" fill="#0f172a"/>
<text x="24" y="32" font-size="14" font-weight="800" fill="#e2e8f0">Luồng kiểm thử API · API testing flow</text>
</svg>`;

// (4) FAQ — vừa hiện QA vừa dựng FAQPage schema (rất quan trọng cho AI Overview).
const faq1 = FAQ("Kiểm thử API là gì?", "What is API testing?",
  "Kiểm thử API là kiểm tra trực tiếp tầng giao tiếp giữa các dịch vụ (request/response) mà không qua giao diện, tập trung vào dữ liệu, mã trạng thái và hợp đồng API.",
  "API testing verifies the service-to-service layer (request/response) without the UI, focusing on data, status codes and the API contract.",
  "APIテストとは？", "APIテストはUIを介さずサービス間の通信層を検証することです。");
const faq2 = FAQ("Người mới nên học kiểm thử API bằng công cụ nào?", "Which tool should beginners use for API testing?",
  "Người mới nên bắt đầu với Postman để hiểu request/response, rồi chuyển sang tự động hoá với Playwright request context hoặc REST Assured trong khóa Tester của CyberSoft.",
  "Beginners should start with Postman, then automate using Playwright request context or REST Assured — as taught in CyberSoft's Tester course.",
  "初心者向けのAPIテストツールは？", "まずPostmanから始め、その後自動化に進みます。");

// (5) NỘI DUNG — 12–16 chương. MỖI chương = 1 page có heading (mục lục lấy từ đây).
const pages = [
  {
    heading: { vi: "1. Tóm tắt nhanh & bài này giải quyết gì", en: "1. TL;DR & what this solves", ja: "1. 要点と解決する課題" },
    blocks: [
      TLDR("Kiểm thử API giúp bắt lỗi sớm ở tầng dịch vụ, nhanh và ổn định hơn test giao diện. Bài này hướng dẫn từ khái niệm đến ca test chạy được.",
           "API testing catches bugs early at the service layer — faster and more stable than UI testing. This guide goes from concept to runnable cases.",
           "APIテストはサービス層で早期にバグを検出できます。"),
      P("Đoạn mở đầu 3–6 câu, ĐẶT primaryKeyword ngay câu đầu, nêu bối cảnh & lợi ích cho người đọc.",
        "Intro paragraph, place the primary keyword in the first sentence, state context & benefit.",
        "導入段落。"),
      IMG(svgFlow, "Luồng kiểm thử API", "API testing flow", "APIテストの流れ"),
      DEF("API", "giao diện lập trình để hai hệ thống trao đổi dữ liệu qua request/response.",
          "a programming interface where two systems exchange data via request/response.",
          "リクエスト/レスポンスでデータをやり取りするインターフェース。"),
    ],
  },
  {
    heading: { vi: "2. Nền tảng lý thuyết", en: "2. Theory foundation", ja: "2. 理論の基礎" },
    blocks: [
      P("… giải thích cơ chế, thuật ngữ, sử dụng lại keyword/LSI tự nhiên …", "…", "…"),
      KEYTAKE(["Ý chính 1", "Ý chính 2", "Ý chính 3"], ["Key 1", "Key 2", "Key 3"], ["要点1", "要点2", "要点3"]),
    ],
  },
  // ... chương 3..N theo authoring-standard.md, GIỮ độ sâu + rải keyword + internal link …
  {
    heading: { vi: "N-1. Câu hỏi thường gặp (FAQ)", en: "N-1. FAQ", ja: "N-1. よくある質問" },
    blocks: [ faq1.block, faq2.block, INTERNAL("Selenium cho người mới", "Selenium for beginners", "selenium-cho-nguoi-moi") ],
  },
  {
    heading: { vi: "N. Học tiếp tại CyberSoft & tổng kết", en: "N. Learn more at CyberSoft & summary", ja: "N. まとめ" },
    blocks: [
      P("Tổng kết + nhắc lại lợi ích, chốt bằng CTA về khóa học.", "Summary + benefit recap, close with course CTA.", "まとめ。"),
      CTA(course),
    ],
  },
];

// (6) SEO metadata — trang Next.js đọc để render <head> + JSON-LD.
const seo = buildSeo({
  title: { vi: "Kiểm thử API cho người mới: hướng dẫn A–Z | CyberSoft",
    en: "API testing for beginners: A–Z guide | CyberSoft", ja: "初心者向けAPIテスト A–Z | CyberSoft" },
  description: { vi: "Học kiểm thử API từ con số 0: khái niệm, công cụ Postman, ca test chạy được và lộ trình khóa Tester CyberSoft Academy.",
    en: "Learn API testing from zero: concepts, Postman, runnable cases and CyberSoft's Tester roadmap.",
    ja: "APIテストをゼロから学ぶ：概念・Postman・実行可能なケース。" },
  slug, primaryKeyword, keywords,
  image: "https://cybersoft.edu.vn/og/kiem-thu-api.png",
  faqs: [faq1.faq, faq2.faq],
  courses: [course],
  breadcrumbs: [
    { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
    { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
    { name: "Kiểm thử API", url: `https://cybersoft.edu.vn/tai-lieu/${slug}` },
  ],
});

// (7) EXPORT — cắm vào seed. DOC mang thêm trường `seo`.
export const DOCS = [
  {
    categorySlug: "playwright-tools",
    slug,
    cover,
    tags: tags("congnghe", "saas", "api", "postman", "foundation", "seo"),
    title: {
      vi: "Kiểm thử API cho người mới: khái niệm, công cụ và ca test chạy được",
      en: "API testing for beginners: concepts, tools and runnable cases",
      ja: "初心者向けAPIテスト：概念・ツール・実行可能なケース",
    },
    summary: {
      vi: "Hướng dẫn kiểm thử API chuẩn SEO: TL;DR, định nghĩa, ví dụ, FAQ, JSON-LD và CTA khóa Tester CyberSoft.",
      en: "SEO-ready API testing guide: TL;DR, definitions, examples, FAQ, JSON-LD and CyberSoft Tester CTA.",
      ja: "SEO対応のAPIテストガイド。",
    },
    seo,                    // ⬅️ trường mới: metaTitle/metaDescription/keywords/jsonLd/canonical
    pages: buildDoc(pages),
  },
];
