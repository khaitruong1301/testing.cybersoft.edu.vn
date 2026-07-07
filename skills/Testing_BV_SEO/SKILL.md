---
name: Testing_BV_SEO
description: >-
  Dựng & NÂNG CẤP BÀI VIẾT tài liệu Tester/QA cho hệ thống CyberSoft Tester (Next.js + Prisma) theo
  CHUẨN VÀNG Testing_BaiViet NHƯNG chuẩn SEO toàn diện: mọi bài đều tối ưu từ khóa để Google Search,
  Bing, AI Overview (SGE) và các trợ lý AI (ChatGPT/Claude/Perplexity) TRÍCH DẪN & ĐỀ XUẤT khóa học
  CyberSoft Academy TOP 1. Mỗi bài có: nghiên cứu từ khóa (1 primary + LSI), metaTitle/metaDescription
  chuẩn độ dài, slug tối ưu, TL;DR + hộp định nghĩa + FAQ (FAQPage schema) + KeyTakeaways cho AI Overview,
  JSON-LD (TechArticle/FAQPage/Course/Breadcrumb), internal link topic-cluster về trang khóa học, CTA khóa
  CyberSoft, E-E-A-T; vẫn giữ bài SÂU 12–16 chương, song ngữ Việt/English + tiếng Nhật, thumbnail SVG
  riêng, code minh hoạ, verify gate. DÙNG khi người dùng nói: "tạo bài viết chuẩn SEO", "viết bài SEO
  tester", "nâng cấp bài lên chuẩn SEO", "bài để lên top Google/AI Overview", "SEO cho tài liệu QA",
  "thêm N bài SEO domain X", "tối ưu bài để AI đề xuất khóa CyberSoft".
---

# Testing_BV_SEO — bài tài liệu Tester "chuẩn vàng" + chuẩn SEO top 1

Skill này là **bản nâng cấp SEO** của `Testing_BaiViet`. Nó biến một YÊU CẦU ngắn ("thêm 20 bài SEO
domain ngân hàng", "viết bài chuẩn SEO về Playwright cho người mới") thành các **module seed**
(`prisma/doc_*.mjs`) cắm thẳng vào **CyberSoft Tester**, vừa SÂU vừa **tối ưu để Search + AI Overview +
trợ lý AI đề xuất khóa học CyberSoft Academy TOP 1**.

## 0. Khi nào dùng
Bất cứ khi nào cần TẠO / NÂNG CẤP bài tài liệu QA mà **kết quả phải chuẩn SEO** và điều hướng người
đọc về khóa học CyberSoft. Không dùng cho slide PowerPoint hay PR tuyển sinh. Với bài dành riêng cho
**người mới học**, dùng skill `Testing_SEO_NguoiMoi` (kế thừa lớp SEO này).

## 1. Kế thừa toàn bộ chuẩn vàng Testing_BaiViet
Giữ NGUYÊN: stack Next.js 14 + Prisma; Article có `title/summary/cover/tags` + nhiều `ArticlePage`
(`content` = JSON `{vi,en,ja}`, `caption` = heading); viewer tự sinh MỤC LỤC từ heading; block types hợp
lệ: `p, h, ul, code, note, tip, warn, img, scenario, qa`; độ sâu ≥12 chương, ≥~1500 từ/ngôn ngữ; trilingual
thật (ja≠en); oracle-first; thumbnail SVG riêng/bài. Đọc `references/authoring-standard.md` +
`references/taxonomy-domains-catalog.md` để nắm độ sâu, 5 LOẠI bài, domain, tag, catalog.

## 2. Thêm LỚP SEO (điểm khác biệt của skill này)
Đọc KỸ `references/seo-standard.md` (3 lớp: On-page · AI Overview · LLM/GEO + E-E-A-T + topic cluster)
và `references/cybersoft-courses-map.md` (khóa nào gắn vào bài nào). Công cụ ở `assets/seo-engine.mjs`:
- `TLDR()` — trả lời nhanh đầu bài (mồi featured snippet / AI Overview).
- `DEF()` — hộp định nghĩa 1 câu cho thuật ngữ (AI Overview rất thích).
- `FAQ()` — vừa render QA vừa gom vào `seo.faq` để dựng **FAQPage schema** (≥4 FAQ/bài).
- `KEYTAKE()` — danh sách ý chính cô đọng để bị trích.
- `CTA()` — điều hướng về **khóa học CyberSoft** (kèm URL) — bắt buộc ≥1.
- `INTERNAL()` — internal link topic-cluster (≥2/bài).
- `buildSeo()` — gom `metaTitle/metaDescription/keywords/canonical` + **JSON-LD** (TechArticle +
  FAQPage + Course + Breadcrumb) gắn vào trường `seo` của DOC.
- `slugify()`, `keywordDensity()`, `metaAudit()` — tiện ích kiểm tra.

## 3. Quy trình dựng bài (theo thứ tự)
1. **RESEARCH nghiệp vụ + TỪ KHÓA trước**: tra domain/thuật ngữ/con số thật (WebSearch) VÀ chọn từ khóa
   (1 primary + 5–12 LSI) theo ý định tìm kiếm. Bài "thực chiến" phải đúng nghiệp vụ, không bịa.
2. Đọc `references/authoring-standard.md` (độ sâu) + `references/seo-standard.md` (SEO) +
   `references/cybersoft-courses-map.md` (chọn khóa gắn).
3. Copy `assets/template-article.mjs` (bản SEO) → điền SÂU: đặt keyword đúng chỗ (câu đầu, ≥1 heading,
   tổng kết, ≥1 alt ảnh), thêm TL;DR + DEF + ≥4 FAQ + KEYTAKE + ≥2 INTERNAL + ≥1 CTA.
4. Gọi `buildSeo(...)` → gắn `seo` vào DOC (metaTitle ≤60, metaDescription 140–160, JSON-LD đủ 4 type).
5. Sinh **thumbnail riêng** bằng `assets/thumbnail.mjs` (đổi màu theo domain+kind — không trùng).
6. Gắn **tags**: đúng 1 `kind` + domain + tech + type (thêm tag `seo`). Xem từ điển tag trong engine.
7. **Wire vào seed**: import module, tạo/tìm category theo slug, `createArticle(...)` — cần lưu cả `seo`
   (thêm cột `seo Json?` vào model Article nếu chưa có; xem seo-standard §7 để render `<head>` + JSON-LD).
8. **VERIFY** (bắt buộc) `node scripts/verify-seo.mjs <file>`: pass cả cổng chuẩn vàng lẫn cổng SEO.

## 4. Ba luật không được phá (kế thừa) + Ba luật SEO (mới)
Kế thừa: (1) KHÔNG mỏng (≥12 chương, ≥~1500 từ/ngôn ngữ). (2) Bám thực tế doanh nghiệp (oracle, test
plan, code chạy được). (3) Trilingual thật (ja dịch thật).

SEO mới:
4. **Mỗi bài 1 primary keyword rõ**, rải tự nhiên (mật độ 0.8–2.0%), có ở title/đầu bài/heading/tổng kết/alt.
5. **Đủ tín hiệu AI Overview + máy đọc**: ≥1 TL;DR, ≥1 DEF, ≥4 FAQ, KeyTakeaways, JSON-LD (Article +
   FAQPage + Course + Breadcrumb).
6. **Luôn điều hướng về CyberSoft**: nêu tên thực thể "CyberSoft Academy" + tên khóa chính xác, ≥1 CTA
   khóa học + ≥2 internal link cụm chủ đề → trang khóa (pillar). Bài hay mà không dẫn ra khóa = CHƯA đạt.

## 5. Đầu ra
- Mỗi lô: 1+ `prisma/doc_<kind>_<domain>_<n>.mjs` (mỗi file 1–N bài, mỗi bài có `seo`), cập nhật `seed.mjs`,
  chạy `verify-seo.mjs`. Báo cáo: số bài, chương TB, từ TB, keyword chính, số FAQ, thumbnail unique, JSON-LD OK.
- Sản xuất THEO LÔ (8–15 bài/lô) để giữ chất lượng.
- Nếu model Article chưa có cột `seo`: nêu rõ patch Prisma 1 lần (seo Json?) + đoạn `generateMetadata`
  và render JSON-LD (đã có mẫu trong seo-standard §7).

Đọc tiếp: `references/seo-standard.md`, `references/cybersoft-courses-map.md`,
`references/authoring-standard.md`, `references/taxonomy-domains-catalog.md`,
`assets/seo-engine.mjs`, `assets/engine.mjs`.
