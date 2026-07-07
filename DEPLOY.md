# Hướng dẫn DEPLOY

> **Production chính:** https://testing.cybersoft.edu.vn chạy trên **Windows Server + IIS reverse proxy →
> Node service** với **CI/CD tự động** (GitHub Actions + self-hosted runner). Chi tiết:
> **[deploy/README.md](deploy/README.md)**. Mỗi lần `git push` vào `main` là tự động CI + deploy.
> Phần dưới là hướng dẫn chung cho các nền tảng khác.

Ứng dụng là **Next.js 14 (App Router) + Prisma**. Cần **Node 20+** và một DB **Postgres** (production).
Biến môi trường bắt buộc (chép từ `.env.example`): `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`.

- Web học viên: `/` · Trang quản trị: `/admin` (đăng nhập bằng `ADMIN_EMAIL`/`ADMIN_PASSWORD`).
- Lệnh khởi tạo dữ liệu: `npm run db:push && npm run db:seed` (hoặc `npm run setup`).

---

## 1) Windows Server + IIS + CI/CD (đang dùng)
Xem [deploy/README.md](deploy/README.md): IIS (ARR + URL Rewrite, [deploy/web.config](deploy/web.config))
reverse proxy sang `127.0.0.1:3210` (Windows Service "testing" qua nssm). Deploy tự động bằng
[.github/workflows/deploy.yml](.github/workflows/deploy.yml) → [deploy/deploy.ps1](deploy/deploy.ps1).

## 2) Vercel (đơn giản nhất cho Next.js)
1. Đẩy repo lên GitHub.
2. Vercel → **New Project** → chọn repo (Vercel tự nhận Next.js).
3. Thêm **Environment Variables**: `DATABASE_URL` (Postgres có pooling — Neon/Supabase pooler),
   `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`.
4. Build Command mặc định `next build`. Sau lần deploy đầu, chạy `npx prisma db push` + seed một lần
   (từ máy bạn trỏ `DATABASE_URL` production, hoặc thêm bước vào build).
> Lưu ý: dùng Postgres có **connection pooling** cho môi trường serverless.

## 3) VPS (Ubuntu) — Node + systemd + nginx
```bash
cd /var/www/testing
npm ci && npx prisma generate && npx prisma db push && npm run build && npm run db:seed
```
Service systemd `/etc/systemd/system/testing.service`:
```ini
[Unit]
Description=CyberSoft Tester
After=network.target
[Service]
WorkingDirectory=/var/www/testing
Environment=NODE_ENV=production
EnvironmentFile=/var/www/testing/.env
ExecStart=/usr/bin/npm run start
Restart=always
[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl enable --now testing
```
Đặt sau **nginx** reverse proxy (`proxy_pass http://127.0.0.1:3210;`) + **HTTPS** (Let's Encrypt).

---

## Lưu ý quan trọng
- **Bí mật:** `.env` và `SECRETS.local.md` KHÔNG commit. Đặt `AUTH_SECRET` ngẫu nhiên ≥ 32 ký tự ở production.
- **Giữ dữ liệu:** Postgres nằm ngoài thư mục deploy → deploy lại không mất dữ liệu. Sao lưu định kỳ (`/backup-db`).
- **Ảnh tài liệu** nên đưa lên object storage (S3/R2) + CDN khi scale lớn (xem README).
- **Đổi cấu hình** (thời hạn truy cập, số câu quiz/mock): trong trang quản trị.
