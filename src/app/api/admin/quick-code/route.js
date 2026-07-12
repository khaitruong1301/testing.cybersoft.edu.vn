import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { generateUniqueCodes, normalizePhoneVN } from "@/lib/codes";
import { emailConfigured, sendLoginCodeEmail } from "@/lib/email";

export const runtime = "nodejs";

// TÌM học viên/mã theo email hoặc SĐT (cho màn Sinh mã — phát mã lẻ).
// GET ?q=<email hoặc sđt>
export async function GET(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const q = (new URL(req.url).searchParams.get("q") || "").trim().toLowerCase();
  if (!q) return NextResponse.json({ matches: [] });

  const codes = await prisma.accessCode.findMany({
    where: { OR: [{ email: { contains: q } }, { phone: { contains: q } }] },
    include: { usedBy: { select: { registered: true, type: true, active: true, accessExpires: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const matches = codes.map((c) => ({
    code: c.code, name: c.name, email: c.email, phone: c.phone, type: c.type,
    registered: c.usedBy?.registered ?? (c.type === "OLD"),
    activated: !!c.usedBy,
  }));
  return NextResponse.json({ matches });
}

// PHÁT MÃ TRIAL cho học viên chưa đăng ký (dùng thử 3 ngày).
// body: { name?, email, phone, sendEmail? }
// - Nếu email+phone đã có mã UNREGISTERED -> trả lại mã cũ (không tạo trùng).
// - Ngược lại tạo mã mới. Tuỳ chọn gửi email cho học viên.
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim() || "(chưa có tên)";
  const email = String(body.email || "").trim().toLowerCase();
  const phone = normalizePhoneVN(body.phone);
  const sendMail = !!body.sendEmail;
  if (!email && !phone) {
    return NextResponse.json({ error: "Cần email hoặc số điện thoại." }, { status: 400 });
  }

  // Đã có mã dùng thử cho email+phone này chưa?
  let ac = await prisma.accessCode.findFirst({
    where: { email, phone, type: "UNREGISTERED" },
    orderBy: { createdAt: "desc" },
  });
  let created = false;
  if (!ac) {
    const existing = new Set((await prisma.accessCode.findMany({ select: { code: true } })).map((c) => c.code));
    const [code] = generateUniqueCodes(1, existing);
    ac = await prisma.accessCode.create({
      data: { code, name, email, phone, type: "UNREGISTERED", batch: "quick-" + new Date().toISOString().slice(0, 10) },
    });
    created = true;
  }

  let emailed = false, emailError = null;
  if (sendMail && email) {
    if (!emailConfigured()) emailError = "Chưa cấu hình email (SENDGRID_API_KEY).";
    else {
      try { await sendLoginCodeEmail(email, ac.code); emailed = true; }
      catch (e) { emailError = e?.message || "Gửi email thất bại."; }
    }
  }

  return NextResponse.json({
    ok: true, created, emailed, emailError,
    code: ac.code, name: ac.name, email: ac.email, phone: ac.phone,
    note: "Học viên chưa đăng ký dùng thử tối đa 3 ngày kể từ lần đăng nhập đầu.",
  });
}
