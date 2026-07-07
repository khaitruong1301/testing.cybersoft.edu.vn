---
name: db-inspect
description: Truy vấn DB (Prisma/Postgres, hoặc SQLite khi dev) để xem học viên, mã truy cập, kết quả luyện/mock, cấu hình, tài khoản admin. Dùng khi cần thống kê, kiểm tra dữ liệu, xem/đổi Setting, hoặc gỡ lỗi liên quan tới lưu trữ.
---

# Kiểm tra CSDL (Prisma)

Cách truy vấn khuyến nghị là **Prisma Client** (chạy qua `node`), vì DB có thể là Postgres (prod) hoặc
SQLite (dev) — Prisma trừu tượng hoá cả hai. Xem trực quan: `npx prisma studio`.

## Sơ đồ (các model chính)
- `Student(id, name, email, phone, type, registered, firstLoginAt, accessExpires, active, codeId)`
- `AccessCode(id, code, name, email, phone, type, batch, usedBy?)` — mã 6 ký tự sinh từ Excel.
- `Session(token, studentId, expiresAt)` — phiên học viên revocable.
- `AdminUser(email, passwordHash, name)` — **KHÔNG in/để lộ `passwordHash`** (bcrypt).
- `Setting(key, value)` — cấu hình: thời hạn truy cập, số câu quiz/mock/istqb…
- `Category(tab, slug, title, …)` · `Article(slug, …)` · `InterviewQuestion(kind, answer, …)`.
- `Attempt(studentId, mode, categoryId, durationSec, score, maxScore, payload, createdAt)`.

## Truy vấn hữu ích (chỉ đọc) — chạy `node <<'JS' … JS`
```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Tổng quan học viên
console.log("Học viên:", await prisma.student.count(),
            "| active:", await prisma.student.count({ where: { active: true } }));

// Phân bố theo type & mã truy cập đã dùng
console.log(await prisma.student.groupBy({ by: ["type"], _count: true }));
console.log("Mã đã dùng:", await prisma.accessCode.count({ where: { usedBy: { isNot: null } } }));

// Kết quả theo mode
console.log(await prisma.attempt.groupBy({ by: ["mode"], _count: true, _avg: { score: true } }));

// 10 lượt gần nhất
console.log(await prisma.attempt.findMany({
  orderBy: { createdAt: "desc" }, take: 10,
  include: { student: { select: { name: true } } },
}));

// Cấu hình hiện tại
console.log(await prisma.setting.findMany());
await prisma.$disconnect();
```

## SQLite thuần (chỉ khi dev với dev.db)
```bash
sqlite3 -header -column prisma/dev.db "SELECT mode, COUNT(*) n, ROUND(AVG(score),2) tb FROM Attempt GROUP BY mode;"
```

## Nguyên tắc an toàn
- Mặc định **chỉ đọc**. Sửa dữ liệu (Setting, mật khẩu admin) phải được người dùng đồng ý rõ ràng và **sao lưu trước**
  (xem `/backup-db`).
- Đổi mật khẩu admin phải theo đúng cơ chế **bcrypt** của ứng dụng (xem `/reset-admin`), KHÔNG hard-code hash.
- KHÔNG in `passwordHash`, token phiên, hay chuỗi kết nối chứa mật khẩu ra log.
