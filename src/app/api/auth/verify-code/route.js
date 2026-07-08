import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createStudentSession } from "@/lib/session";
import { getSettings } from "@/lib/settings";
import { computeAccessExpires, hasAccess } from "@/lib/access";
import { hashOtp } from "@/lib/otp";

export const runtime = "nodejs";

const norm = (p) => String(p || "").replace(/\s/g, "");

// POST /api/auth/verify-code  { email, phone, code }
// Xác thực mã OTP -> tạo phiên đăng nhập (duy trì bằng cookie phiên).
export async function POST(req) {
  try {
    const { email, phone, code } = await req.json().catch(() => ({}));
    if (!email || !phone || !code) {
      return NextResponse.json({ error: "Vui lòng nhập email, số điện thoại và mã." }, { status: 400 });
    }
    const normEmail = String(email).trim().toLowerCase();
    const normPhone = norm(phone);

    const candidates = await prisma.student.findMany({ where: { email: normEmail } });
    let student = candidates.find((s) => norm(s.phone) === normPhone) || null;
    if (!student || !student.active) {
      return NextResponse.json({ error: "Tài khoản không hợp lệ hoặc đã bị khoá." }, { status: 401 });
    }

    const now = new Date();
    // Khớp mã còn hạn, chưa dùng (khớp trực tiếp theo hash).
    const rec = await prisma.loginCode.findFirst({
      where: {
        studentId: student.id,
        usedAt: null,
        expiresAt: { gt: now },
        codeHash: hashOtp(code),
      },
      orderBy: { createdAt: "desc" },
    });
    if (!rec) {
      return NextResponse.json({ error: "Mã không đúng hoặc đã hết hạn. Vui lòng nhập lại hoặc nhận mã mới." }, { status: 401 });
    }

    // Đánh dấu mã đã dùng (một lần).
    await prisma.loginCode.update({ where: { id: rec.id }, data: { usedAt: now } });

    // Đặt cửa sổ truy cập từ lần đăng nhập đầu (nguồn quy tắc: lib/access.js).
    if (!student.firstLoginAt) {
      const settings = await getSettings();
      const expires = computeAccessExpires(student.type, settings, now);
      student = await prisma.student.update({
        where: { id: student.id },
        data: { firstLoginAt: now, accessExpires: expires },
      });
    }

    if (!hasAccess(student, now)) {
      return NextResponse.json(
        { error: "Thời hạn truy cập đã hết. Vui lòng liên hệ CyberSoft để được hỗ trợ." },
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
