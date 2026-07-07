---
name: Testing_SEO_NguoiMoi
description: >-
  Dựng BÀI VIẾT tài liệu Tester/QA dành cho LEVEL NGƯỜI MỚI học, cho hệ thống CyberSoft Tester (Next.js +
  Prisma), chuẩn SEO (kế thừa Testing_BV_SEO). Bài trình bày kiến thức NỀN TẢNG nhưng theo nguyên tắc
  THỰC HÀNH TỐI ĐA, HÌNH ẢNH TỐI ĐA: có phân tích, kỹ thuật, kiến thức, các BƯỚC thực hiện, nền tảng lý
  thuyết, đưa TÌNH HUỐNG cụ thể và giải quyết NGAY trong từng bài; mỗi bài kết bằng TRẮC NGHIỆM 4–5 câu
  (4–5 lựa chọn + giải thích) để kiểm tra lại kiến thức. Song ngữ Việt/English + tiếng Nhật, ≥5 hình SVG,
  hands-on nhiều bước + code ngắn chạy được, TL;DR + định nghĩa + FAQ (FAQPage schema) + JSON-LD + CTA khóa
  học CyberSoft, thumbnail riêng, verify gate. DÙNG khi người dùng nói: "viết bài cho người mới", "bài
  foundation/nền tảng chuẩn SEO", "bài nhập môn tester", "bài người mới có trắc nghiệm", "làm bài dễ hiểu
  nhiều hình cho beginner", "thêm N bài người mới domain X".
---

# Testing_SEO_NguoiMoi — bài "nhập môn" chuẩn SEO, thực hành tối đa, có trắc nghiệm

Skill này viết bài cho **người mới học**: kiến thức nền tảng, nhưng **học bằng LÀM** — mỗi khái niệm 1
hình, tình huống cụ thể giải ngay, nhiều bước thực hành, và mỗi bài có **trắc nghiệm 4–5 câu**. Nó **kế
thừa toàn bộ lớp SEO** của `Testing_BV_SEO` để bài lên top Search/AI Overview và điều hướng người mới vào
khóa học CyberSoft Academy.

## 0. Khi nào dùng
Khi cần bài **foundation cho người mới** (nhập môn, "X là gì", "cách học X từ con số 0"). Với bài chuyên
sâu doanh nghiệp/phỏng vấn, dùng `Testing_BV_SEO` (hoặc `Testing_BaiViet`). Không dùng cho slide/PR.

## 1. Kế thừa
- **Hệ thống**: Next.js 14 + Prisma; Article + ArticlePage; viewer tự sinh mục lục từ heading; block hợp
  lệ `p, h, ul, code, note, tip, warn, img, scenario, qa`; trilingual thật (ja≠en); thumbnail SVG riêng.
- **Lớp SEO**: đọc `references/seo-standard.md` + `references/cybersoft-courses-map.md`; dùng `TLDR/DEF/
  FAQ/CTA/INTERNAL/buildSeo` trong `assets/seo-engine.mjs`; gắn `seo` (metaTitle/metaDescription/JSON-LD).

## 2. Triết lý bài NGƯỜI MỚI (điểm khác biệt) — đọc `references/beginner-standard.md`
1. **Thực hành tối đa** — `STEP()` các bước, `TRY()` kêu người học tự làm, code ngắn chạy được (~60% làm).
2. **Hình ảnh tối đa** — MỖI khái niệm ≥1 hình SVG; mục tiêu **≥5 hình/bài**; hình có `cap` (kiêm alt SEO).
3. **Tình huống → giải NGAY** — ≥2 `SITUATION()` + `SOLVE()` + STEP/CODE ngay dưới.
4. **Nền tảng lý thuyết vừa đủ** — `DEF()` định nghĩa 1 câu mỗi thuật ngữ; giọng đơn giản, khích lệ.
5. **Trắc nghiệm 4–5 câu** — mỗi bài đúng 1 chương `QUIZ([mcq...])`; mỗi `mcq()` có 4–5 lựa chọn, 1 đáp án
   đúng + **giải thích**. Bám sát nội dung trong bài.

Công cụ ở `assets/newbie-engine.mjs`: `STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP`.

## 3. Quy trình dựng bài (theo thứ tự)
1. **RESEARCH + TỪ KHÓA trước**: chọn chủ đề nền tảng + primary keyword người mới ("X là gì", "X cho
   người mới"…) + LSI. Kiểm thông tin đúng (WebSearch nếu cần), không bịa.
2. Đọc `references/beginner-standard.md` (cấu trúc 8–12 chương, luật trắc nghiệm) + `seo-standard.md` +
   `cybersoft-courses-map.md` (chọn khóa gắn — mặc định khóa **tester**).
3. Copy `assets/template-article.mjs` (bản người mới) → điền: TL;DR, DEF, ≥5 hình, hands-on nhiều STEP +
   code, ≥2 SITUATION giải ngay, ≥3 FAQ, ≥2 INTERNAL, 1 chương QUIZ 4–5 câu, CTA.
4. Gọi `buildSeo(...)` (thêm `howTo` nếu bài dạng các-bước) → gắn `seo` vào DOC.
5. Thumbnail riêng `makeThumb({ kind:"beginner", ... })` (motif hạt mầm/sách).
6. Tags: 1 `kind` + domain + tech + type, **thêm `beginner` + `seo`**.
7. Wire vào seed (category `foundation-beginner` hoặc phù hợp); lưu cả `seo` (patch cột `seo Json?` nếu
   chưa có — xem seo-standard §7).
8. **VERIFY**: `node scripts/verify-newbie.mjs <file>` — pass cả cổng người-mới lẫn cổng SEO.

## 4. Luật không được phá
1. **Practice-first**: đủ STEP/code + ≥2 TRY; không sa đà lý thuyết.
2. **Hình tối đa**: ≥5 hình, mỗi khái niệm có hình + chú thích.
3. **Tình huống → giải ngay**: ≥2 SITUATION có lời giải liền dưới.
4. **Trắc nghiệm**: đúng 1 chương, 4–5 câu, mỗi câu 4–5 lựa chọn + giải thích, bám nội dung bài.
5. **SEO + điều hướng CyberSoft**: TL;DR, ≥3 FAQ, JSON-LD (Article+FAQPage+Course), ≥1 CTA, ≥2 internal.
6. **Trilingual thật** (ja≠en), giọng đơn giản khích lệ cho người mới.

## 5. Đầu ra
- Mỗi lô: 1+ `prisma/doc_beginner_<chủ-đề>.mjs` (mỗi bài có `seo` + 1 quiz), cập nhật `seed.mjs`, chạy
  `verify-newbie.mjs`. Báo cáo: số bài, chương TB, số hình TB, số câu quiz, FAQ, thumbnail unique.
- Sản xuất theo lô để giữ chất lượng.

Đọc tiếp: `references/beginner-standard.md`, `references/seo-standard.md`,
`references/cybersoft-courses-map.md`, `assets/newbie-engine.mjs`, `assets/seo-engine.mjs`,
`assets/engine.mjs`.
