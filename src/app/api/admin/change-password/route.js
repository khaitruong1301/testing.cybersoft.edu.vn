import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

// POST: admin đổi mật khẩu của chính mình.
// body: { currentPassword, newPassword }
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json().catch(() => ({}));
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Nhập mật khẩu hiện tại và mật khẩu mới." }, { status: 400 });
  }
  if (!bcrypt.compareSync(String(currentPassword), admin.passwordHash)) {
    return NextResponse.json({ error: "Mật khẩu hiện tại không đúng." }, { status: 401 });
  }
  if (String(newPassword).length < 8) {
    return NextResponse.json({ error: "Mật khẩu mới cần ít nhất 8 ký tự." }, { status: 400 });
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: bcrypt.hashSync(String(newPassword), 10) },
  });
  return NextResponse.json({ ok: true });
}
