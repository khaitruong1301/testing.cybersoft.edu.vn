---
name: SKILL_CONG_NGHE_MOI_TESTER
description: >-
  Mỗi ngày tự tạo & đẩy 5 BÀI viết "CÔNG NGHỆ MỚI cho Tester" (AI trong kiểm thử, AI agent/LLM testing,
  Playwright & công cụ automation mới, performance/API hiện đại, tư duy automation) vào production
  CyberSoft Tester (Next.js + Prisma + PostgreSQL, testing.cybersoft.edu.vn). Chuyên biệt hoá của
  CAITIEN_bai_viet_testing_deployed: chọn chủ đề công nghệ mới XOAY VÒNG (không lặp), viết bài chuẩn
  (12 chương, song ngữ Việt/English/日本語, ≥5 mockup ui_mock, ≥2 tình huống doanh nghiệp, 1 quiz, SEO
  đầy đủ, thumbnail riêng), route vào danh mục công nghệ mới, rồi ĐẨY TĂNG DẦN qua sync_docs → nhánh
  ops-docs → workflow add-docs.yml (upsert theo slug, giữ id/view/bookmark/vote, KHÔNG seed lại, KHÔNG
  downtime). DÙNG khi người dùng nói: "bài công nghệ mới hôm nay", "tạo bài công nghệ mới cho tester",
  "đẩy bài công nghệ mới lên production", "chạy bài mỗi ngày", "SKILL_CONG_NGHE_MOI_TESTER".
---

# SKILL_CONG_NGHE_MOI_TESTER — 5 bài "công nghệ mới cho Tester" mỗi ngày

Skill này = **chuyên biệt hoá theo chủ đề** của [[CAITIEN_bai_viet_testing_deployed]]. Chuẩn nội dung và
cơ chế đẩy **giữ nguyên**; skill này chỉ thêm 3 thứ: (1) **chọn 5 chủ đề công nghệ mới xoay vòng, không lặp**,
(2) **route vào đúng danh mục công nghệ mới**, (3) **chạy được hằng ngày** (thủ công hoặc lịch tự động).

> **Số lượng: 5 bài/ngày.** Lấy 5 chủ đề đầu tiên chưa đăng trong `references/published-log.md`. Có thể
> gộp cả 5 bài vào MỘT lần push `ops-docs` (wire cả 5 vào `SOURCES` rồi push một lần).

> Nền tảng: production đã cutover **PostgreSQL 16.9**. Đẩy nội dung **CHỈ** qua nhánh `ops-docs` →
> `add-docs.yml` → `node prisma/sync_docs.mjs` (tăng dần, giữ dữ liệu). **TUYỆT ĐỐI KHÔNG push `main`**
> để thêm bài (main chạy seed hủy diệt + build + downtime).

## 0. Khi nào dùng
Khi cần **1 bài công nghệ mới cho Tester** đẩy lên production nhanh, an toàn — thủ công hôm nay hoặc theo
lịch mỗi ngày. Không dùng cho slide/PR marketing, không dùng để thêm câu hỏi (đó là
[[CAITIEN_tester_istqb_deployed_ok]]).

## 1. Danh mục đích (route chủ đề vào đây — đều đã tồn tại, KHÔNG tạo mới)
Chọn danh mục hợp chủ đề nhất trong `prisma/topics.mjs` → `DOC_CATEGORIES`:

| categorySlug | Dành cho chủ đề |
|---|---|
| `ai-in-testing` | AI hỗ trợ kiểm thử: sinh testcase/dữ liệu bằng AI, self-healing, visual AI |
| `ai-agent-testing` | Kiểm thử AI agent / hệ thống LLM, đánh giá agent, guardrails |
| `claude-testing` | Dùng Claude/Claude Code trong quy trình QA, MCP, tự động hoá bằng LLM |
| `automation-thinking` | Tư duy & chiến lược automation hiện đại (shift-left, contract, CI/CD) |
| `playwright-tools` | Playwright & hệ sinh thái công cụ automation mới |
| `performance-api` | Hiệu năng/API hiện đại: k6, Grafana, observability, testing in prod |

`startOrder` khi wire phải **KHỚP `seed.mjs`** cho danh mục đó (xem
`references/deploy-to-production.md` §3 của skill gốc). Nếu danh mục chưa có bài nào trong `sync_docs.mjs`
`SOURCES`, thêm một mục mới `{ categorySlug, startOrder, docs: [...] }`.

## 2. Quy trình MỘT lần chạy (5 bài / ngày)

> Lặp bước 1–6 cho **5 chủ đề** (mỗi bài 1 file `doc_cnm_*.mjs`), wire cả 5 vào `SOURCES`, rồi **đẩy 1 lần**
> (bước 7–8). Có thể sinh 5 bài song song bằng subagent `content-editor` (mỗi agent 1 chủ đề + template),
> mình gộp lại wire + verify + push.

1. **Chọn 5 chủ đề chưa dùng.** Mở `references/topic-backlog.md`, lấy **5 chủ đề đầu tiên chưa có** trong
   `references/published-log.md`. (Muốn chủ đề cụ thể thì người dùng nêu — vẫn kiểm trùng.)
2. **Kiểm không trùng trên prod.** Slug dự kiến (không dấu) không được trùng bài đang có: đọc
   `https://testing.cybersoft.edu.vn/documents?v=chkNGAY` bằng WebFetch, soát title/slug. Trùng → chọn
   chủ đề kế tiếp. (Xem cạm bẫy nhân đôi: `references/deploy-to-production.md` §4b.)
3. **Đọc chuẩn nội dung** của skill gốc (BẮT BUỘC, đừng bịa cấu trúc):
   - `MY_SKILLS/CAITIEN_bai-viet-testing-deployed/references/article-standard.md` (12 chương + compliance)
   - `.../references/enterprise-applied.md` (mockup ui_mock + tình huống doanh nghiệp)
   - `.../references/seo-standard.md` (metaTitle ≤60, metaDescription 140–160, FAQ + JSON-LD)
   - `.../references/deploy-to-production.md` (**cơ chế đẩy — QUAN TRỌNG**)
4. **Bắt chước 1:1 một bài THẬT** đã pass làm khuôn (vd `prisma/doc_manual_beginner_defect_lifecycle.mjs`).
   Import engine từ `prisma/`: `engine.mjs`, `thumbnail.mjs`, `seo-engine.mjs`, `newbie-engine.mjs`,
   `ui_mock.mjs`. Tạo file mới **`prisma/doc_cnm_<chu-de>.mjs`** (tiền tố `cnm_` = công-nghệ-mới để dễ nhận),
   hàm `makeDoc({...})`, export MẢNG (vd `export const CNM_<TEN>_01 = [DOC]`). Gắn `buildSeo(...)` + `makeThumb(...)`.
   - **12 chương**, **trilingual thật** (ja có ký tự Nhật, khác en), **≥5 hình `ui_mock`**, **≥2 `SITUATION()`**,
     **đúng 1 `QUIZ()`** 4–5 câu, SEO đủ (TLDR/≥3 FAQ/≥1 CTA/≥2 INTERNAL/JSON-LD). Tag: 1 `kind` + domain +
     level + `seo`. **slug không dấu, DUY NHẤT**.
5. **Wire vào `prisma/sync_docs.mjs`**: thêm `import` + spread export vào `docs` của đúng `categorySlug`
   trong `SOURCES` (KHÔNG đụng `seed.mjs`).
6. **VERIFY offline** (không cần DB):
   - `node --check prisma/doc_cnm_<chu-de>.mjs` và `node --check prisma/sync_docs.mjs`
   - Nếu có `scripts/verify-article.mjs`: `node scripts/verify-article.mjs prisma/doc_cnm_<chu-de>.mjs` → ✅
   - Vòng kiểm mọi import của sync_docs đều tồn tại (deploy-to-production.md §4 bước 0).
7. **ĐẨY qua `ops-docs`** đúng như `references/deploy-to-production.md` §4 (KHÔNG push `main`):
   ```bash
   git fetch origin
   git switch -C ops-docs origin/main
   git checkout main -- prisma/sync_docs.mjs prisma/ui_mock.mjs   # + mọi doc/engine sync_docs cần mà origin CHƯA có
   git checkout main -- .github/workflows/add-docs.yml
   git add prisma/doc_cnm_<chu-de>.mjs prisma/sync_docs.mjs
   git diff --cached --name-only | grep -E "\.env|schema\.prisma|web\.config|next\.config|package.*json|dev\.db" \
     && echo "FORBIDDEN — go ra" || echo "GUARD_OK"
   git commit -m "docs: cong nghe moi <chu-de> (incremental, sync_docs)"
   git push origin ops-docs
   ```
   Push cần GitHub auth. Nếu người dùng dán token: dùng token **trong bộ nhớ cho lần push đó**, reset remote
   về không-token ngay sau, và **khuyên thu hồi token**. KHÔNG lưu token vào file/skill.
8. **XÁC NHẬN**: theo dõi Actions → *OPS - Them tai lieu* xanh + health check 200. Đọc lại
   `/documents?v=...` — số bài của danh mục đích tăng đúng 1. Ghi chủ đề vừa đăng vào
   `references/published-log.md` (slug + ngày + categorySlug) để lần sau không lặp.

## 3. Chạy TỰ ĐỘNG mỗi ngày
Skill này là **thủ tục 1 bài/lần**. Để chạy hằng ngày, dùng một trong hai:
- **Lịch cloud (khuyến nghị nếu muốn tự chạy khi không mở máy):** skill `schedule` — tạo routine cron gọi
  `/SKILL_CONG_NGHE_MOI_TESTER` mỗi ngày (vd 08:00). Routine cần quyền git push (token) đã cấu hình sẵn.
- **`/loop` khi máy đang mở:** `/loop 24h /SKILL_CONG_NGHE_MOI_TESTER`.
> ⚠️ Tự động hoá vẫn phải **kiểm trùng (bước 2)** và **chỉ push `ops-docs`**. Nếu backlog hết chủ đề mới,
> DỪNG và báo, đừng đăng trùng.

## 4. Bất biến (không được phá)
1. **Chỉ push `ops-docs`**, không bao giờ `main` (main = seed hủy diệt + downtime).
2. **Không đụng** `.env`, `schema.prisma`, `web.config`, `next.config`, `package*.json`, `dev.db`,
   `node_modules`, `.next`.
3. **Mọi file `prisma/*.mjs` mà `sync_docs.mjs` import PHẢI có trên nhánh `ops-docs`** (thiếu → sync chết).
4. **Slug là khoá** — không dấu, duy nhất; trùng slug = đè bài khác; đổi slug bài cũ = bài mồ côi.
5. **Không `SYNC_PRUNE=1`** (xoá bài cascade mất bookmark/vote/comment học viên).
6. **5 bài/ngày**, mỗi bài đủ 12 chương + 3 ngôn ngữ thật + ≥5 mockup + 1 quiz + SEO; bài nào chưa đạt thì
   **không đẩy bài đó** (đẩy các bài đạt, giữ lại bài chưa đạt cho lần sau).
