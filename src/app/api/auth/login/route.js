import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createStudentSession } from "@/lib/session";
import { getSettings, num } from "@/lib/settings";

// Student login for BOTH types.
// Body: { email, phone, code, type: "OLD" | "UNREGISTERED" }
export async function POST(req) {
  try {
    const { email, phone, code, type } = await req.json();
    if (!email || !phone || !code) {
      return NextResponse.json({ error: "Vui lòng nhập đủ email, số điện thoại và mã." }, { status: 400 });
    }
    const normEmail = String(email).trim().toLowerCase();
    const normCode = String(code).trim().toUpperCase();

    const access = await prisma.accessCode.findUnique({
      where: { code: normCode },
      include: { usedBy: true },
    });
    if (!access) {
      return NextResponse.json({ error: "Mã không hợp lệ." }, { status: 401 });
    }
    // Email + phone must match the roster row this code was issued for.
    if (access.email.toLowerCase() !== normEmail || access.phone.replace(/\s/g, "") !== String(phone).replace(/\s/g, "")) {
      return NextResponse.json({ error: "Email hoặc số điện thoại không khớp với mã." }, { status: 401 });
    }

    const settings = await getSettings();

    // Find or create the student bound to this code.
    let student = access.usedBy;
    if (!student) {
      student = await prisma.student.create({
        data: {
          name: access.name,
          email: access.email,
          phone: access.phone,
          type: access.type,
          registered: access.type === "OLD",
          codeId: access.id,
        },
      });
    }

    if (!student.active) {
      return NextResponse.json({ error: "Tài khoản đã bị khoá." }, { status: 403 });
    }

    // Set the access window from the FIRST login.
    // OLD students: PERMANENT access (accessExpires = null → never expires).
    // Unregistered: default 7 days. A day-count of 0 means permanent.
    if (!student.firstLoginAt) {
      const now = new Date();
      const days =
        student.type === "OLD"
          ? num(settings.access_days_old, 0)
          : num(settings.access_days_unregistered, 7);
      const expires = days > 0 ? new Date(now.getTime() + days * 86400000) : null;
      student = await prisma.student.update({
        where: { id: student.id },
        data: { firstLoginAt: now, accessExpires: expires },
      });
    }

    // Enforce expiry.
    if (student.accessExpires && student.accessExpires < new Date()) {
      return NextResponse.json(
        { error: "Thời hạn truy cập đã hết. Vui lòng liên hệ CyberSoft để gia hạn." },
        { status: 403 }
      );
    }

    await createStudentSession(student.id);
    return NextResponse.json({
      ok: true,
      student: {
        name: student.name,
        type: student.type,
        registered: student.registered,
        accessExpires: student.accessExpires,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Có lỗi xảy ra." }, { status: 500 });
  }
}
