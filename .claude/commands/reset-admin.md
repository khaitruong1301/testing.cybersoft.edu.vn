---
description: Đặt lại mật khẩu quản trị viên trong DB (khi quên mật khẩu)
argument-hint: "<email> <mật-khẩu-mới>"
allowed-tools: Bash, Read
---

Đặt lại mật khẩu cho một tài khoản admin trong bảng `AdminUser`, dùng ĐÚNG cơ chế băm của ứng dụng
(**bcrypt**, giống `prisma/seed.mjs`) — KHÔNG hard-code hash.

Tham số: `$1` = email admin (mặc định lấy `ADMIN_EMAIL` trong `.env`), `$2` = mật khẩu mới.
Nếu thiếu mật khẩu mới, hỏi lại người dùng trước khi tiếp tục.

Thực hiện bằng một script Node ngắn dùng `bcryptjs` + Prisma (`upsert` theo `email`):

```bash
node - "$1" "$2" <<'JS'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const [ , , emailArg, pw ] = process.argv;
const email = emailArg || process.env.ADMIN_EMAIL;
if (!email || !pw) { console.error("Thiếu email hoặc mật khẩu mới."); process.exit(1); }
const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash(pw, 10);
await prisma.adminUser.upsert({
  where: { email },
  update: { passwordHash },
  create: { email, passwordHash, name: "Administrator" },
});
console.log(`Đã đặt lại mật khẩu cho admin '${email}'.`);
await prisma.$disconnect();
JS
```

> Lưu ý: cần chạy trong môi trường có `.env` (`DATABASE_URL`). Nếu Node báo lỗi ESM khi dùng heredoc,
> ghi tạm ra file `.mjs` rồi `node file.mjs` và xóa sau.

Sau khi chạy, nhắc người dùng đăng nhập lại tại `/admin/login` và giữ mật khẩu an toàn.
KHÔNG in mật khẩu ra log về sau.
