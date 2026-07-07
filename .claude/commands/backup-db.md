---
description: Sao lưu CSDL ra file có gắn dấu thời gian (Postgres pg_dump, hoặc SQLite khi dev)
allowed-tools: Bash, Read
---

Sao lưu an toàn CSDL của CyberSoft Tester. Đọc `DATABASE_URL` từ `.env`.

1. Lấy timestamp: `date +%Y%m%d-%H%M%S`.
2. **Nếu `DATABASE_URL` là Postgres** (`postgresql://...`):
   - Dùng `pg_dump "<DATABASE_URL>" -Fc -f backup-<timestamp>.dump` (định dạng custom, nén).
   - Xác nhận file tạo ra > 0 byte và liệt kê kích thước.
   - (Khôi phục sau này: `pg_restore -d "<DATABASE_URL>" backup-<...>.dump`.)
3. **Nếu là SQLite** (`file:./dev.db`):
   - Dùng `sqlite3 prisma/dev.db ".backup prisma/dev.db.bak-<timestamp>"` (nhất quán, an toàn khi app đang chạy) — KHÔNG chỉ `cp`.
   - Xác nhận mở được: `sqlite3 <bản sao> "SELECT COUNT(*) FROM Attempt;"`.
4. Báo cáo: đường dẫn bản sao lưu, dung lượng, và (nếu đọc được) số học viên + số lượt làm bài.

Không xóa/ghi đè bản sao lưu cũ. Không in chuỗi kết nối chứa mật khẩu ra log.
