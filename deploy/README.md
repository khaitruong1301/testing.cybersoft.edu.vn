# Deploy — testing.cybersoft.edu.vn (Windows Server + IIS + CI/CD)

Hạ tầng **mirror theo hệ thống `entrance`** (cùng server Windows dùng chung nhiều site):

```
Internet ─HTTPS→ IIS (site "testing", 443/80)
                   │  ARR + URL Rewrite (reverse proxy, xem web.config)
                   ▼
              127.0.0.1:3210  ── Windows Service "testing" (nssm) chạy `next start -p 3210`
                   │
                   ▼
              Postgres (DATABASE_URL trong C:\apps\testing\.env)
```

**Deploy = `git push` vào `main`** → GitHub Actions: job `ci` (ubuntu, prisma validate + build) →
job `deploy` (self-hosted windows runner chạy `deploy/deploy.ps1`).

---

## 1) Cài đặt server lần đầu (một lần)

Yêu cầu trên server: **Node 20+**, **nssm**, IIS + **ARR** + **URL Rewrite**, Postgres (local hoặc từ xa).

```powershell
# a) Thư mục app + nơi để nssm
New-Item -ItemType Directory -Force -Path C:\apps\testing\_bin, C:\apps\testing\logs
# (chép nssm.exe vào C:\apps\testing\_bin\)

# b) Lấy source lần đầu (hoặc để runner tự đồng bộ ở lần deploy đầu)
#    Sau đó tạo .env production:
#    C:\apps\testing\.env  (theo .env.example: DATABASE_URL, AUTH_SECRET, ADMIN_*, NEXT_PUBLIC_SITE_URL)

# c) Cài & build lần đầu
cd C:\apps\testing
npm ci; npx prisma generate; npx prisma db push; npm run build
npm run db:seed    # nạp nội dung + tạo admin

# d) Tạo Windows Service "testing" bằng nssm (chạy Next production, cổng 3210)
$npm = (Get-Command npm.cmd).Source
C:\apps\testing\_bin\nssm.exe install testing $npm "run" "start"
C:\apps\testing\_bin\nssm.exe set testing AppDirectory C:\apps\testing
C:\apps\testing\_bin\nssm.exe set testing AppStdout C:\apps\testing\logs\out.log
C:\apps\testing\_bin\nssm.exe set testing AppStderr C:\apps\testing\logs\err.log
C:\apps\testing\_bin\nssm.exe start testing
```

IIS: tạo site **"testing"** trỏ document root chứa [web.config](web.config); bind hostname
`testing.cybersoft.edu.vn`; bật ARR proxy:
`appcmd set config -section:system.webServer/proxy /enabled:true`. HTTPS theo cơ chế chung của server
(vd win-acme tự cấp/gia hạn chứng chỉ).

## 2) Self-hosted runner (một lần)

Cài GitHub Actions runner trên server, gắn nhãn **`self-hosted, windows, testing`** (khớp `runs-on`
trong [../.github/workflows/deploy.yml](../.github/workflows/deploy.yml)). Chạy runner as a service để
tự khởi động lại.

## 3) Mỗi lần deploy

`git push origin main`. `deploy.ps1` sẽ: đồng bộ source vào `C:\apps\testing` (giữ nguyên `.env`),
`npm ci` → `prisma generate` → `prisma db push` → `npm run build` → `nssm restart testing` →
health check `http://127.0.0.1:3210/`.

## Nguyên tắc an toàn (server dùng chung)
- CHỈ thao tác tài nguyên tên **`testing`** (service, site). KHÔNG `iisreset`, KHÔNG tắt ARR toàn cục.
- `deploy.ps1` **không ghi đè `.env`** và không đụng Postgres data → deploy không mất dữ liệu.
- Postgres đặt **ngoài** thư mục deploy; sao lưu định kỳ (xem `/backup-db`).
- Giữ `deploy.ps1` **thuần ASCII** (PowerShell 5.1).

## Nền tảng khác
Xem [../DEPLOY.md](../DEPLOY.md) cho hướng dẫn deploy lên Vercel / VPS Linux (systemd + nginx).
