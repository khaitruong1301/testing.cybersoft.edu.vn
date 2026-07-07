# CyberSoft Tester — Nền tảng luyện nghề Tester

Ứng dụng web (mobile-first, giao diện kiểu app) luyện nghề **Tester**: tài liệu học tập, luyện phỏng vấn,
mock interview, ISTQB, làm CV. Đăng nhập 2 loại học viên + trang **quản trị** riêng. Đa ngôn ngữ **Việt / English / 日本語**.

Stack: **Next.js 14 (App Router) + Prisma + Postgres** (dev nhanh có thể dùng SQLite).

## 🚀 Production & Bàn giao (đọc trước khi thao tác hạ tầng)

- **Sẽ chạy tại:** https://testing.cybersoft.edu.vn (Windows Server + IIS reverse proxy → Node service + CI/CD tự động).
- **Deploy = `git push` vào `main`** → GitHub Actions tự CI (build) + deploy (self-hosted runner). Xem
  [deploy/README.md](deploy/README.md) và [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
- **Token git CI/CD:** `SECRETS.local.md` (gốc repo) — **KHÔNG có trong git** (loại qua `.git/info/exclude`).
- Vận hành: skill `deploy-ops`, command `/deploy-status`.

## Chạy thử cục bộ (3 lệnh)

```bash
npm install
npm run setup      # = prisma db push + seed: tạo/cập nhật DB + nạp nội dung + tạo admin
npm run dev        # http://localhost:3210
```
- Web học viên: `http://localhost:3210` · Trang quản trị: `http://localhost:3210/admin`
- Cần `.env` (chép từ `.env.example`): `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`.
- Dev nhanh không cần Postgres: đổi `provider = "sqlite"` trong `prisma/schema.prisma` + `DATABASE_URL="file:./dev.db"`.

## Kiến trúc

```
src/
  app/
    (main)/            # web học viên (khung AppShell + bottom nav)
      page.js          # landing
      login/           # đăng nhập học viên (email + phone + mã 6 ký tự)
      documents/       # tài liệu + viewer ảnh nhiều trang (chỉ xem, watermark)
      interview/       # luyện phỏng vấn (MCQ/tự luận/tình huống)
      mock/            # mock interview (có đồng hồ)
      istqb/  cv/  profile/
    admin/             # quản trị: login + (protected) — sinh mã Excel, quản lý HV, cấu hình
    api/               # route handlers: auth, admin, practice, articles, bookmarks, me, search, pageimg
  components/          # UI dùng chung
  lib/                 # prisma, session (jose + DB), settings, i18n, codes, format, các Context
prisma/
  schema.prisma        # data model (Postgres, tương thích SQLite)
  seed.mjs             # gom nội dung từ nhiều prisma/*.mjs rồi upsert vào DB
  *.mjs                # ngân hàng nội dung: docs, interview, istqb, cv, topics...
```

- **Route handler**: đọc cookie/`getCurrentStudent()` → dynamic. Prisma dùng client chung `@/lib/prisma`.
- **Phiên học viên**: token `crypto.randomBytes(32)` lưu bảng `Session` (revocable), cookie `cst_session` HttpOnly.
- **Phiên admin**: JWT `jose` ký bằng `AUTH_SECRET`, cookie `cst_admin`; mọi `/api/admin/*` xác thực trước.
- **Chấm điểm**: server-side ở `src/app/api/practice/grade/route.js` (MCQ so khớp chỉ số; tự luận theo keyword).

## Bất biến quan trọng — ĐỪNG phá vỡ

1. **KHÔNG rò rỉ đáp án khi đang làm bài.** `/api/practice/start` chỉ trả câu hỏi + `options`, không kèm
   `answer`/`explanation`. Đáp án chỉ lộ ở `/api/practice/grade` **sau khi nộp**. Client không tự chấm.
2. **Xác thực trước xử lý.** Route học viên → `getCurrentStudent()`; route admin → kiểm JWT admin. Thiếu phiên → 401.
3. **Đa ngôn ngữ đồng bộ.** Tiêu đề/mô tả nội dung lưu JSON `{vi,en,ja}`; text UI qua `i18n`/`LangContext`.
   Thêm chuỗi mới phải có đủ 3 ngôn ngữ (thiếu → fallback VI). Chuỗi tiếng Việt đủ dấu.
4. **MCQ `answer` là CHỈ SỐ** (chuỗi) trỏ vào `options`; tự luận/tình huống `answer` là **mảng keyword** (JSON).
   Server tự xáo trộn khi thi — đừng xáo trong nguồn.
5. **Cửa sổ truy cập** tính từ `firstLoginAt` (`accessExpires`) — đừng reset khi đăng nhập lại.
6. **Bí mật không commit.** `.env`, `SECRETS.local.md`, `prisma/dev.db` KHÔNG nằm trong repo. Đọc bí mật từ `process.env`.
7. **Seed upsert theo `slug`.** Cập nhật nội dung giữ nguyên `slug` để không mất bookmark/lượt đọc/kết quả.

## Lệnh thường dùng

```bash
npm run dev                 # chạy dev (cổng 3210)
npm run build && npm start  # bản production
npm run db:push             # đồng bộ schema Prisma vào DB
npm run db:seed             # nạp/cập nhật nội dung (an toàn, upsert)
npm run setup               # db:push + db:seed
npx prisma studio           # xem DB trực quan
```
Không có test suite — kiểm chứng bằng cách chạy app & gọi API thật (xem skill `run-server`).

## Phong cách code

- Backend: route handler ngắn gọn, Prisma client chung, comment tiếng Việt như file hiện có.
- Frontend: React 18 App Router + Tailwind; `"use client"` cho component tương tác; giữ trải nghiệm app-like.
- Nội dung: chỉnh trong `prisma/*.mjs` (xem skill `content-bank`); hook tự `node --check` sau mỗi lần sửa.
- Mọi chuỗi hiển thị cho người dùng: đủ 3 ngôn ngữ, tiếng Việt có dấu đầy đủ.

## Tùy biến Claude Code

Xem [.claude/README.md](.claude/README.md): agents (`backend-dev`, `frontend-dev`, `content-editor`,
`security-reviewer`), commands (`/run`, `/seed`, `/stats`, `/backup-db`, `/reset-admin`, `/deploy-status`),
skills (`run-server`, `content-bank`, `db-inspect`, `deploy-ops`), hook `validate-content`.
