# CyberSoft Tester

Nền tảng luyện nghề Tester (mobile-first, giao diện kiểu app) gồm: Landing page + 3 tab (Tài liệu học tập, Luyện phỏng vấn, Mock Interview), hệ thống đăng nhập 2 loại học viên, và trang **quản trị** riêng. Đa ngôn ngữ **Việt / English / 日本語**.

Stack: **Next.js 14 (App Router) + Prisma + Postgres** (mặc định SQLite cho chạy thử ngay).

---

## 1. Chạy thử trong 3 lệnh

```bash
npm install
npm run setup      # tạo/ cập nhật DB + nạp NGÂN HÀNG nội dung thật
npm run dev        # http://localhost:3210
```

> Nếu bạn đã cài bản trước đó: chạy lại `npm run setup` để cập nhật cấu trúc DB mới (viewer dạng text nhiều trang) và nạp lại nội dung.

- Web học viên: **http://localhost:3210**
- Trang quản trị: **http://localhost:3210/admin**
- Đổi cổng nếu trùng: `npm run dev -- -p 3400`

**Giao diện**: tự động khác nhau giữa **desktop** (bố cục web rộng, thanh điều hướng trên, lưới nhiều cột) và **mobile** (kiểu app, thanh tab dưới).

**Các tab**: Trang chủ · Tài liệu (10 danh mục gồm cả *Công cụ Automation* và *Tích hợp AI vào Testing*, *AI Agent: cấu hình–triển khai–demo*) · Làm CV · Luyện phỏng vấn · **ISTQB (3 cấp: Foundation/Advanced/Expert)** · Mock Interview.

**Nội dung đã nạp**: ~51 bài tài liệu (286 trang ảnh PDF), 4 bài CV (gồm 2 CV mẫu), 58 câu phỏng vấn (trắc nghiệm/tự luận/tình huống), 23 câu ISTQB — tổng >130 bộ dữ liệu. Trang tài liệu là **ảnh từng trang**, chỉ xem, có đóng dấu mờ theo học viên.

### Tài khoản mẫu (do seed tạo)

| Vai trò | Thông tin |
|---|---|
| **Admin** | `admin@cybersoft.edu.vn` / `Admin@12345` |
| **Học viên cũ** | email `hocvien@demo.vn` · phone `0900000001` · mã `AB2K7M` |
| **Chưa đăng ký** | email `moi@demo.vn` · phone `0900000002` · mã `QP9XR4` |

---

## 2. Chuyển sang Postgres (khi lên production / scale 100k+ user)

1. Sửa `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"   // đổi từ "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
2. Sửa `DATABASE_URL` trong `.env` trỏ tới Postgres/Supabase (nên bật connection pooling — PgBouncer/Supabase pooler cho serverless).
3. Chạy lại:
   ```bash
   npm run db:push && npm run db:seed
   ```

Schema đã viết sẵn index cho các cột tra cứu (email, phone, code, category…) để chịu tải lớn. Deploy khuyến nghị: **Vercel** (frontend/serverless) + **Supabase/Neon** (Postgres có pooling). Ảnh tài liệu nên đưa lên object storage (S3/R2) + CDN thay vì lưu trong DB.

---

## 3. Tính năng đã có

**Đăng nhập học viên (`/login`)** — 2 loại:
- *Học viên cũ*: email + phone + mã (6 ký tự).
- *Chưa đăng ký*: giống trên, kèm link **Inbox Fanpage** (facebook.com/lophocviet) và **Zalo CyberSoft** (096.105.1014) để lấy mã.
- Thời hạn truy cập tính từ **lần đăng nhập đầu tiên**; mặc định 3 tháng (cũ) / 3 ngày (chưa ĐK). Hết hạn thì chặn.
- Giữ trạng thái đăng nhập trong thời gian còn hạn.

**Quản trị (`/admin`)**
- *Sinh mã từ Excel*: tải lên file có cột `name, email, phone` → hệ thống sinh mã 6 ký tự (số+chữ, không trùng) → **tải file .xlsx** danh sách mã về gửi học viên.
- *Học viên*: xem thời hạn, **gia hạn** (cũ +1 tháng / chưa ĐK +3 tháng), **đổi trạng thái** chưa ĐK → đã ĐK (tự gia hạn), khoá/mở tài khoản.
- *Cấu hình*: đổi mốc thời gian truy cập, số câu luyện & mock.

**3 tab**
- *Tài liệu học tập*: 8 danh mục Tester, mỗi bài có ảnh đại diện + tóm tắt + lượt view + số người đọc; trang chi tiết yêu cầu đăng nhập, có **viewer nhiều trang kiểu PDF (chỉ xem, không tải)** với nút Trước/Sau, tóm tắt mở khoá sau khi đọc hết.
- *Luyện phỏng vấn*: ngân hàng câu trắc nghiệm / tự luận / tình huống, random đề (cấu hình admin), **hệ thống tự chấm**.
- *Mock Interview*: bài thi có số câu + đồng hồ đếm ngược, nộp là chấm ngay.

---

## 4. Cấu trúc

```
src/
  app/
    (main)/            # web học viên (khung app + bottom nav)
      page.js          # landing
      login/           # đăng nhập 2 loại
      documents/       # tab tài liệu + viewer
      interview/       # luyện phỏng vấn
      mock/            # mock interview
    admin/             # trang quản trị riêng
    api/               # auth, admin, practice, articles
  components/          # UI (AppShell, viewer, quiz, admin…)
  lib/                 # prisma, session, i18n, settings, codes
prisma/                # schema + seed
```

## 5. Lưu ý bảo mật viewer
Tài liệu hiển thị dạng ảnh, chặn kéo-thả / chuột phải / tải trực tiếp ở phía client. Để chống tải triệt để hơn ở production nên: phục vụ ảnh qua endpoint có kiểm tra session + URL ký ngắn hạn (signed URL), đóng dấu watermark theo học viên, và tách ảnh theo từng trang.

## 6. File mẫu
`sample-roster.xlsx` — danh sách mẫu để thử chức năng *Sinh mã từ Excel*.
