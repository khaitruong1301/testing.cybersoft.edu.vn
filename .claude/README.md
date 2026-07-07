# Cấu hình Claude Code cho dự án

Thư mục này chứa toàn bộ tùy biến Claude Code cho **CyberSoft Tester** (Next.js 14 + Prisma + Postgres).
Bối cảnh dự án tổng quát nằm ở [`../CLAUDE.md`](../CLAUDE.md).

## Cấu trúc

```
.claude/
├── settings.json          # Quyền (permissions) + hook validate-content
├── settings.local.json    # (tùy chọn, KHÔNG commit) cài đặt cá nhân của bạn
├── .gitignore             # Bỏ qua settings.local.json
├── agents/                # Subagent chuyên biệt (gọi qua Task/@)
│   ├── backend-dev.md         # src/app/api/**: route handler, Prisma, phiên/chấm điểm
│   ├── frontend-dev.md        # src/app/(main), admin, components: React/Tailwind, đa ngôn ngữ
│   ├── content-editor.md      # prisma/*.mjs: bài tài liệu, câu hỏi, ISTQB, đa ngôn ngữ, slug
│   └── security-reviewer.md   # Rà soát bảo mật (chỉ đọc)
├── commands/              # Lệnh gạch chéo (gõ /tên)
│   ├── run.md                 # /run          — chạy dev & health-check
│   ├── seed.md                # /seed         — nạp/cập nhật nội dung (upsert, an toàn)
│   ├── stats.md               # /stats        — thống kê học viên & kết quả
│   ├── backup-db.md           # /backup-db    — sao lưu Postgres/SQLite
│   ├── reset-admin.md         # /reset-admin  — đặt lại mật khẩu admin (bcrypt)
│   └── deploy-status.md       # /deploy-status— tình trạng site + CI/CD
├── skills/                # Kỹ năng (Claude tự kích hoạt khi phù hợp)
│   ├── run-server/SKILL.md    # Chạy & kiểm thử app bằng curl
│   ├── content-bank/SKILL.md  # Schema & quy tắc biên tập prisma/*.mjs
│   ├── db-inspect/SKILL.md    # Truy vấn DB (Prisma/Postgres/SQLite)
│   └── deploy-ops/SKILL.md    # Vận hành production (Windows/IIS + Node + CI/CD)
└── hooks/
    └── validate-content.mjs   # Tự kiểm sau mỗi Edit/Write: schema.prisma & cú pháp prisma/*.mjs
```

## Ba loại tùy biến — khi nào dùng gì

- **Agents** — ủy thác một mảng việc lớn cho "chuyên gia" có system prompt & bộ tool riêng.
  Ví dụ: "nhờ `content-editor` thêm 10 câu ISTQB Foundation", "nhờ `security-reviewer` rà trước khi deploy".
- **Commands** — hành động nhanh, một phát, do bạn chủ động gõ `/tên [tham số]`.
- **Skills** — kiến thức quy trình Claude **tự** nạp khi ngữ cảnh liên quan (không cần gõ lệnh).

## Hook `validate-content`

Cấu hình trong `settings.json` (`PostToolUse` khớp `Write|Edit|MultiEdit`). Sau mỗi lần chỉnh sửa file:
- `prisma/schema.prisma` → chạy `npx prisma validate` (schema hợp lệ chưa).
- `prisma/*.mjs` (module nội dung seed) → chạy `node --check` (bắt lỗi cú pháp JS).
- File khác → bỏ qua.

Có lỗi → thoát mã 2 để Claude thấy và sửa. Chạy thủ công:
`node .claude/hooks/validate-content.mjs --file prisma/schema.prisma`

## Quyền (permissions)

`settings.json` cho phép sẵn các lệnh an toàn hay dùng (npm, npx prisma, node, curl localhost, git đọc…)
để giảm hỏi xác nhận; **hỏi lại** với `git push`/`pg_dump`/`prisma migrate reset`; **chặn** đọc `.env`,
`SECRETS.local.md`, `prisma/dev.db` và các lệnh xóa/reset nguy hiểm. Muốn nới/siết riêng máy bạn,
tạo `settings.local.json` (đã được .gitignore).
