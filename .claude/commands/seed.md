---
description: Nạp/cập nhật ngân hàng nội dung vào DB bằng Prisma seed (an toàn, không phá dữ liệu học viên)
argument-hint: "(không cần tham số)"
allowed-tools: Bash, Read
---

Đồng bộ schema và nạp nội dung.

1. Xác nhận có `.env` với `DATABASE_URL`. Nếu chưa, nhắc tạo từ `.env.example` rồi dừng.
2. `npx prisma generate` — sinh Prisma Client.
3. `npm run db:push` — đồng bộ schema vào DB (không phá dữ liệu).
4. `npm run db:seed` — nạp/cập nhật nội dung. Seed dùng **upsert theo `slug`** nên **KHÔNG mất**
   bookmark/lượt đọc/kết quả thi đã có.
5. Báo cáo tóm tắt: số danh mục / bài tài liệu / câu phỏng vấn / đề ISTQB đã nạp (đọc từ log seed),
   và tài khoản admin khởi tạo (`ADMIN_EMAIL`).

Có thể chạy gộp bằng `npm run setup` (= `db:push` + `db:seed`). Nếu seed lỗi import một module `prisma/*.mjs`,
chỉ ra file gây lỗi để dùng agent `content-editor` sửa.
