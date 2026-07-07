---
description: Chạy web CyberSoft Tester cục bộ (Next.js dev) và kiểm tra sức khỏe các trang chính
argument-hint: "[port] (mặc định 3210)"
allowed-tools: Bash, Read
---

Khởi động app và xác nhận nó chạy được.

1. Chọn cổng: dùng `$1` nếu người dùng cung cấp, ngược lại `3210`.
2. Đảm bảo đã cài phụ thuộc & sinh Prisma Client: nếu chưa có `node_modules`, chạy `npm install`;
   luôn `npx prisma generate` trước khi chạy nếu vừa clone/đổi schema.
3. Chạy nền: `npm run dev -- -p <cổng>` (dùng run_in_background). Chờ ~3–5s cho Next biên dịch.
4. Kiểm tra (HTTP 200):
   - `GET /` — landing page
   - `GET /login` — đăng nhập học viên
   - `GET /admin/login` — đăng nhập quản trị
5. Báo cáo: URL học viên (`http://localhost:<cổng>/`), URL quản trị (`http://localhost:<cổng>/admin`,
   đăng nhập bằng `ADMIN_EMAIL`/`ADMIN_PASSWORD` trong `.env`), và trạng thái từng trang.
6. Nhắc cách dừng (dừng tiến trình nền).

Nếu cổng bận, thử cổng +1 và báo lại. Nếu Next báo thiếu `DATABASE_URL`/`AUTH_SECRET`, nhắc người dùng
tạo `.env` từ `.env.example`.
