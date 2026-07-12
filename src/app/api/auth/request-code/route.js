import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, hashOtp, otpExpiry, startOfVnDay, MAX_CODES_PER_DAY } from "@/lib/otp";
import { sendLoginCodeEmail, emailConfigured } from "@/lib/email";
import { createStudentSession } from "@/lib/session";
import { hasAccess } from "@/lib/access";

export const runtime = "nodejs";

const norm = (p) => String(p || "").replace(/\s/g, "");

function maskEmail(e) {
  const [u, d] = String(e).split("@");
  if (!d) return e;
  const head = u.slice(0, 1);
  return `${head}${"*".repeat(Math.max(1, u.length - 1))}@${d}`;
}

// POST /api/auth/request-code  { email, phone }
// Học viên cũ tự nhận mã đăng nhập 6 ký tự qua email (hết hạn 5 phút, tối đa 3 mã/ngày).
export async function POST(req) {
  try {
    const { email, phone } = await req.json().catch(() => ({}));
    if (!email || !phone) {
      return NextResponse.json({ error: "Vui lòng nhập email và số điện thoại." }, { status: 400 });
    }
    const normEmail = String(email).trim().toLowerCase();
    const normPhone = norm(phone);

    // Tìm học viên theo email + số điện thoại.
    const candidates = await prisma.student.findMany({ where: { email: normEmail } });
    let student = candidates.find((s) => norm(s.phone) === normPhone) || null;

    // Fallback: học viên cũ có trong danh sách mã (AccessCode) nhưng chưa từng đăng nhập.
    if (!student) {
      const acs = await prisma.accessCode.findMany({ where: { email: normEmail }, include: { usedBy: true } });
      const ac = acs.find((a) => norm(a.phone) === normPhone);
      if (ac) {
        student =
          ac.usedBy ||
          (await prisma.student.create({
            data: {
              name: ac.name,
              email: ac.email,
              phone: ac.phone,
              type: ac.type,
              registered: ac.type === "OLD",
              codeId: ac.id,
            },
          }));
      }
    }

    if (!student || !student.active) {
      return NextResponse.json(
        { error: "Không tìm thấy học viên với email và số điện thoại này. Vui lòng kiểm tra lại hoặc liên hệ giáo vụ." },
        { status: 404 }
      );
    }

    // TIẾT KIỆM EMAIL: chỉ gửi mã xác nhận ở LẦN ĐĂNG NHẬP ĐẦU TIÊN.
    // Học viên đã từng đăng nhập (firstLoginAt) -> đăng nhập THẲNG bằng email + SĐT, không gửi mã.
    if (student.firstLoginAt) {
      if (!hasAccess(student)) {
        return NextResponse.json(
          { error: "Thời hạn truy cập đã hết. Vui lòng liên hệ CyberSoft để được hỗ trợ." },
          { status: 403 }
        );
      }
      await createStudentSession(student.id);
      return NextResponse.json({
        ok: true,
        loggedIn: true,
        student: { name: student.name, type: student.type, registered: student.registered, accessExpires: student.accessExpires },
      });
    }

    // Giới hạn 3 mã/ngày (theo lịch Việt Nam).
    const sentToday = await prisma.loginCode.count({
      where: { studentId: student.id, createdAt: { gte: startOfVnDay() } },
    });
    if (sentToday >= MAX_CODES_PER_DAY) {
      return NextResponse.json(
        { error: `Bạn đã nhận tối đa ${MAX_CODES_PER_DAY} mã trong hôm nay. Vui lòng thử lại vào ngày mai.` },
        { status: 429 }
      );
    }

    if (!emailConfigured()) {
      return NextResponse.json(
        { error: "Hệ thống gửi email chưa được cấu hình. Vui lòng liên hệ admin." },
        { status: 503 }
      );
    }

    // Sinh + GỬI mã trước; gửi thành công mới lưu (để không tính nhầm vào giới hạn ngày).
    const code = generateOtp();
    try {
      await sendLoginCodeEmail(student.email, code);
    } catch (e) {
      console.error("SendGrid error:", e?.message || e);
      return NextResponse.json({ error: "Không gửi được email. Vui lòng thử lại sau." }, { status: 502 });
    }

    await prisma.loginCode.create({
      data: { studentId: student.id, codeHash: hashOtp(code), expiresAt: otpExpiry() },
    });

    return NextResponse.json({
      ok: true,
      sentTo: maskEmail(student.email),
      remaining: MAX_CODES_PER_DAY - (sentToday + 1),
      message: `Đã gửi mã đăng nhập tới ${maskEmail(student.email)}. Mã có hiệu lực 5 phút.`,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Có lỗi xảy ra." }, { status: 500 });
  }
}
