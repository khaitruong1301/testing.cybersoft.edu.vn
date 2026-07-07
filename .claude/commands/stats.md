---
description: Thống kê nhanh học viên & kết quả luyện/mock từ DB (qua Prisma)
argument-hint: "(không cần tham số)"
allowed-tools: Bash, Read
---

Truy vấn DB qua Prisma và trình bày thống kê gọn gàng (CHỈ ĐỌC).

Cần `.env` với `DATABASE_URL`. Nếu chưa cấu hình, báo và dừng.

Chạy một script Node ngắn (`bcryptjs` không cần; chỉ Prisma). Hiển thị:
1. **Học viên**: tổng số, số `active`, phân theo `type` (OLD / UNREGISTERED), số đã `registered`,
   số đang còn hạn (`accessExpires` > hiện tại) và số đã hết hạn.
2. **Mã truy cập**: tổng đã sinh, số đã dùng (`usedBy` khác null), số chưa dùng.
3. **Kết quả (Attempt)**: tổng lượt, phân theo `mode` (PRACTICE / MOCK), điểm trung bình `score/maxScore`.
4. **10 lượt gần nhất**: thời gian, học viên, mode, `score/maxScore`, danh mục.

```bash
node <<'JS'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const now = new Date();
const [students, active, codes, usedCodes, attempts] = await Promise.all([
  prisma.student.count(),
  prisma.student.count({ where: { active: true } }),
  prisma.accessCode.count(),
  prisma.accessCode.count({ where: { usedBy: { isNot: null } } }),
  prisma.attempt.count(),
]);
const byType = await prisma.student.groupBy({ by: ["type"], _count: true });
const byMode = await prisma.attempt.groupBy({ by: ["mode"], _count: true });
const recent = await prisma.attempt.findMany({
  orderBy: { createdAt: "desc" }, take: 10,
  include: { student: { select: { name: true } }, category: { select: { slug: true } } },
});
console.log("Học viên:", students, "| active:", active, "| theo type:", byType.map(t=>`${t.type}:${t._count}`).join(" "));
console.log("Mã truy cập:", codes, "| đã dùng:", usedCodes, "| chưa dùng:", codes - usedCodes);
console.log("Lượt làm bài:", attempts, "| theo mode:", byMode.map(m=>`${m.mode}:${m._count}`).join(" "));
console.log("— 10 lượt gần nhất —");
for (const a of recent)
  console.log(a.createdAt.toISOString().slice(0,16), a.student?.name ?? "?", a.mode, `${a.score}/${a.maxScore}`, a.category?.slug ?? "");
await prisma.$disconnect();
JS
```

Trình bày kết quả thành bảng dễ đọc. Chỉ ĐỌC — không sửa DB.
