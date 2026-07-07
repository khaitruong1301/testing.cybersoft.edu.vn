---
name: deploy-ops
description: Vận hành production của CyberSoft Tester trên Windows Server (IIS reverse proxy + Node service qua nssm + CI/CD GitHub Actions). Dùng khi cần deploy thay đổi, restart app, xem log, kiểm tra tình trạng server/CI, hoặc dựng lại hạ tầng. Kèm vị trí file, service và quy trình chuẩn.
---

# Vận hành production — testing.cybersoft.edu.vn

Hạ tầng mirror theo hệ thống `entrance` (cùng server): **IIS reverse proxy → Node service**.
Chi tiết deploy: [deploy/README.md](../../../deploy/README.md). Token git CI/CD: **`SECRETS.local.md`** ở gốc repo
(KHÔNG có trong git — hỏi người bàn giao nếu thiếu).

## Kiến trúc (tóm tắt)
IIS (443/80, site "testing", ARR + URL Rewrite) → reverse proxy → `127.0.0.1:3210`
(**Windows Service "testing"** chạy `npm start` = `next start -p 3210`, quản lý bởi **nssm**)
→ Postgres (qua `DATABASE_URL`). Windows Server dùng chung nhiều site khác → **chỉ thao tác tài nguyên tên `testing`**.

## Nguyên tắc an toàn (server production dùng chung)
- CHỈ thao tác service/app pool/site tên `testing`. KHÔNG `iisreset`, KHÔNG tắt ARR proxy.
- `DATABASE_URL` trỏ Postgres **ngoài thư mục deploy** → deploy không mất dữ liệu. Backup trước khi động vào DB (`/backup-db`).
- `.env` production nằm trên server (KHÔNG trong git). Deploy KHÔNG ghi đè `.env`.
- Sửa `.ps1` chạy bởi runner: giữ **thuần ASCII** (Windows PowerShell 5.1 đọc file không-BOM theo cp1252).

## Deploy thay đổi (cách chuẩn)
`git push` vào `main` → GitHub Actions tự CI + deploy. Không deploy thủ công trừ khi khẩn cấp.
```bash
git add -A && git commit -m "..."
TOKEN=$(grep -oE 'ghp_[A-Za-z0-9]+' SECRETS.local.md | head -1)
B64=$(printf "x-access-token:%s" "$TOKEN" | base64)
git -c http.extraheader="Authorization: Basic $B64" push origin main
```
Workflow: [.github/workflows/deploy.yml](../../../.github/workflows/deploy.yml) — job **ci** (ubuntu: prisma validate + build)
→ job **deploy** (self-hosted windows: `deploy/deploy.ps1`).

## deploy.ps1 làm gì (trên runner)
1. `npm ci` → `npx prisma generate` → `npx prisma db push` (đồng bộ schema, không phá dữ liệu).
2. `npm run build` (build Next.js production).
3. `nssm restart testing` → chờ → **health check** `http://127.0.0.1:3210/` phải trả 200.

## Việc thường gặp
- **Restart app**: `nssm restart testing`.
- **Xem log**: thư mục logs của service (vd `C:\apps\testing\logs\err.log` / `out.log`).
- **Nạp/cập nhật nội dung**: `npm run db:seed` trên server (hoặc để deploy chạy nếu đã thêm bước seed).
- **Đổi mật khẩu admin**: command `/reset-admin` (bcrypt), chạy với `.env` production.
- **Xem học viên/kết quả**: skill `db-inspect` (trỏ `DATABASE_URL` production).
- **Kiểm tra CI/CD + site**: command `/deploy-status`.
- **HTTPS**: chứng chỉ theo cơ chế chung của server (vd win-acme tự gia hạn).

## Kiểm chứng sau khi deploy
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://testing.cybersoft.edu.vn/
curl -s -o /dev/null -w "%{http_code}\n" https://testing.cybersoft.edu.vn/login
```
