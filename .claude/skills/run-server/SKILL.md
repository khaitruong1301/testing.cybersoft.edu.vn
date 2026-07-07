---
name: run-server
description: Cách chạy, dừng và kiểm thử web CyberSoft Tester cục bộ (Next.js dev cổng 3210). Dùng khi cần khởi động app, seed dữ liệu, hoặc gọi API thật để xác minh một thay đổi hoạt động đúng (không có test suite — kiểm chứng bằng cách chạy thật).
---

# Chạy & kiểm thử CyberSoft Tester

Dự án **không có test suite**. Cách kiểm chứng đúng đắn là chạy app và gọi API/đi luồng thật.

## Chuẩn bị
```bash
npm install                 # lần đầu
cp .env.example .env         # rồi điền DATABASE_URL, AUTH_SECRET, ADMIN_*
npm run setup                # = prisma db push + seed (tạo DB + nạp nội dung + admin)
```
Dev nhanh không cần Postgres: đổi `provider = "sqlite"` trong `prisma/schema.prisma` và
`DATABASE_URL="file:./dev.db"`.

## Khởi động
```bash
npm run dev                  # http://localhost:3210
npm run dev -- -p 3400       # đổi cổng
```
Chạy nền để còn gọi curl trong cùng phiên. Trang học viên `/`, quản trị `/admin`
(đăng nhập bằng `ADMIN_EMAIL` / `ADMIN_PASSWORD` trong `.env`).

## Kiểm thử luồng học viên bằng curl (giữ cookie phiên)
```bash
BASE=http://localhost:3210
# 1) Đăng nhập học viên (email + phone + mã 6 ký tự do admin cấp)
curl -s -c /tmp/cj -X POST $BASE/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"hocvien@demo.vn","phone":"0900000001","code":"AB2K7M"}'

# 2) Bốc đề luyện (KHÔNG kèm đáp án) — lưu lại danh sách câu
curl -s -b /tmp/cj -X POST $BASE/api/practice/start \
  -H "Content-Type: application/json" -d '{"mode":"PRACTICE"}' -o /tmp/de.json
node -e "const d=require('/tmp/de.json');console.log('so cau=',(d.questions||[]).length)"

# 3) Nộp bài (đáp án tùy ý để kiểm luồng — server tự chấm ở /api/practice/grade)
node -e "const d=require('/tmp/de.json');const a={};(d.questions||[]).forEach(q=>a[q.id]='0');\
require('fs').writeFileSync('/tmp/sub.json',JSON.stringify({mode:'PRACTICE',answers:a}))"
curl -s -b /tmp/cj -X POST $BASE/api/practice/grade \
  -H "Content-Type: application/json" -d @/tmp/sub.json | python3 -m json.tool | head
```

## Kiểm thử luồng admin
```bash
curl -s -c /tmp/aj -X POST $BASE/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}"
curl -s -b /tmp/aj $BASE/api/admin/students | python3 -m json.tool | head
```

## Dừng server
Dừng tiến trình nền (hoặc Ctrl+C nếu chạy foreground). Kiểm cổng còn bận: `lsof -i :3210`.

## Lưu ý
- **Đáp án đúng KHÔNG bao giờ có trong response của `/api/practice/start`** — đừng tìm nó ở client.
- Route đọc cookie là **dynamic**; đổi code hiển thị nóng (HMR). Đổi schema Prisma cần `npx prisma generate` lại.
- Khi thử nghiệm dễ ghi đè dữ liệu, cân nhắc trỏ `DATABASE_URL` sang DB tạm để không đụng dữ liệu thật.
