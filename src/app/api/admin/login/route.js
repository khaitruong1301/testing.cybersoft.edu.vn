import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminSession } from "@/lib/session";

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Thiếu thông tin đăng nhập." }, { status: 400 });
  }
  const admin = await prisma.adminUser.findUnique({ where: { email: String(email).toLowerCase() } });
  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  }
  await createAdminSession(admin.id);
  return NextResponse.json({ ok: true });
}
