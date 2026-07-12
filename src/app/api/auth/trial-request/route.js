import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { generateOtp, hashOtp, otpExpiry, startOfVnDay, MAX_CODES_PER_DAY } from "@/lib/otp";
import { sendLoginCodeEmail, emailConfigured } from "@/lib/email";
import { generateUniqueCodes, normalizePhoneVN } from "@/lib/codes";
import { hasAccess } from "@/lib/access";

export const runtime = "nodejs";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-me-please-32-characters-minimum-000"
);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const norm = (p) => String(p || "").replace(/\s/g, "");
function maskEmail(e) {
  const [u, d] = String(e).split("@");
  if (!d) return e;
  return `${u.slice(0, 1)}${"*".repeat(Math.max(1, u.length - 1))}@${d}`;
}

// HỌC THỬ TỰ PHỤC VỤ: học viên chưa đăng ký nhập email/phone hợp lệ + qua kiểm tra
// chống robot -> hệ thống GỬI MÃ qua email để vào học thử (3 ngày). Chống spam:
//  - Bẫy honeypot (bot điền -> bỏ qua), kiểm thời gian điền (bot quá nhanh).
//  - Câu đố cộng ký trong token (chống bot tự động).
//  - Rate limit: tối đa 3 mã/ngày/định danh.
//  - MỘT lần học thử/định danh: hết hạn rồi thì KHÔNG cấp mã mới, KHÔNG gửi email.
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  const name = String(b.name || "").trim();
  const email = String(b.email || "").trim().toLowerCase();
  const phone = normalizePhoneVN(b.phone);

  // 1) Bẫy honeypot: trường ẩn có giá trị = bot -> giả vờ OK, KHÔNG gửi.
  if (b.hp) return NextResponse.json({ ok: true, sentTo: maskEmail(email || "***@***") });
  // 2) Điền quá nhanh (< 2.5s) = bot.
  if (typeof b.elapsedMs === "number" && b.elapsedMs >= 0 && b.elapsedMs < 2500) {
    return NextResponse.json({ error: "Vui lòng nhập chậm lại và thử lại." }, { status: 400 });
  }
  // 3) Định dạng email/phone.
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
  if (!/^0\d{9}$/.test(phone)) return NextResponse.json({ error: "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)." }, { status: 400 });
  // 4) Câu đố chống robot.
  try {
    const { payload } = await jwtVerify(String(b.captchaToken || ""), secret);
    if (Number(payload.s) !== Number(b.captchaAnswer)) throw new Error("wrong");
  } catch {
    return NextResponse.json({ error: "Xác minh chống robot chưa đúng. Vui lòng thử lại." }, { status: 400 });
  }

  if (!emailConfigured()) {
    return NextResponse.json({ error: "Hệ thống gửi email chưa được cấu hình. Vui lòng liên hệ giáo vụ." }, { status: 503 });
  }

  // Tìm học viên theo email + phone.
  const cands = await prisma.student.findMany({ where: { email } });
  let student = cands.find((s) => norm(s.phone) === norm(phone)) || null;

  if (student) {
    if (student.registered || student.type === "OLD") {
      return NextResponse.json(
        { error: "Bạn là học viên đã đăng ký. Vui lòng dùng tab “Học viên” để đăng nhập." },
        { status: 400 }
      );
    }
    // Đã học thử và HẾT HẠN -> đóng, không cấp mã mới.
    if (student.firstLoginAt && !hasAccess(student)) {
      return NextResponse.json(
        { error: "Bạn đã dùng hết thời gian học thử. Vui lòng đăng ký học và ghi danh vào lớp để truy cập đầy đủ." },
        { status: 403 }
      );
    }
  } else {
    // Tạo định danh học thử mới (AccessCode + Student UNREGISTERED, chưa kích hoạt).
    const existing = new Set((await prisma.accessCode.findMany({ select: { code: true } })).map((c) => c.code));
    const [code] = generateUniqueCodes(1, existing);
    const ac = await prisma.accessCode.create({
      data: { code, name: name || "(học thử)", email, phone, type: "UNREGISTERED", batch: "trial-" + new Date().toISOString().slice(0, 10) },
    });
    student = await prisma.student.create({
      data: { name: name || "(học thử)", email, phone, type: "UNREGISTERED", registered: false, codeId: ac.id },
    });
  }

  // Rate limit server: tối đa 3 mã/ngày/định danh.
  const sentToday = await prisma.loginCode.count({
    where: { studentId: student.id, createdAt: { gte: startOfVnDay() } },
  });
  if (sentToday >= MAX_CODES_PER_DAY) {
    return NextResponse.json(
      { error: `Bạn đã nhận tối đa ${MAX_CODES_PER_DAY} mã trong hôm nay. Vui lòng thử lại vào ngày mai.` },
      { status: 429 }
    );
  }

  // Gửi mã trước; gửi OK mới lưu (không tính nhầm vào giới hạn ngày).
  const code = generateOtp();
  try {
    await sendLoginCodeEmail(student.email, code);
  } catch (e) {
    console.error("SendGrid error:", e?.message || e);
    return NextResponse.json({ error: "Không gửi được email. Vui lòng thử lại sau." }, { status: 502 });
  }
  await prisma.loginCode.create({ data: { studentId: student.id, codeHash: hashOtp(code), expiresAt: otpExpiry() } });

  return NextResponse.json({
    ok: true,
    sentTo: maskEmail(student.email),
    remaining: MAX_CODES_PER_DAY - (sentToday + 1),
    message: `Đã gửi mã học thử tới ${maskEmail(student.email)} (hiệu lực 5 phút). Học thử tối đa 3 ngày.`,
  });
}
