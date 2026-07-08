import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { getSettings, num } from "@/lib/settings";

// PATCH: actions on a student.
// body: { action: "extend" | "register" | "toggleActive" | "edit", ... }
export async function PATCH(req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const body = await req.json().catch(() => ({}));
  const { action } = body;
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return NextResponse.json({ error: "Không tìm thấy học viên." }, { status: 404 });

  if (action === "edit") {
    // Giáo vụ sửa thông tin học viên (tên/email/số điện thoại).
    const data = {};
    if (body.name !== undefined) {
      const name = String(body.name).trim();
      if (!name) return NextResponse.json({ error: "Tên không được trống." }, { status: 400 });
      data.name = name;
    }
    if (body.email !== undefined) {
      const email = String(body.email).trim().toLowerCase();
      if (!email) return NextResponse.json({ error: "Email không được trống." }, { status: 400 });
      data.email = email;
    }
    if (body.phone !== undefined) {
      const phone = String(body.phone).trim();
      if (!phone) return NextResponse.json({ error: "Số điện thoại không được trống." }, { status: 400 });
      data.phone = phone;
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Không có thông tin để cập nhật." }, { status: 400 });
    }
    // Đồng bộ email/phone/tên sang AccessCode (login đối chiếu email+phone theo MÃ;
    // nếu không cập nhật, học viên sẽ không đăng nhập lại được bằng mã cũ).
    const ops = [prisma.student.update({ where: { id }, data })];
    if (student.codeId) {
      const codeData = {};
      if (data.name !== undefined) codeData.name = data.name;
      if (data.email !== undefined) codeData.email = data.email;
      if (data.phone !== undefined) codeData.phone = data.phone;
      if (Object.keys(codeData).length) {
        ops.push(prisma.accessCode.update({ where: { id: student.codeId }, data: codeData }));
      }
    }
    const [updated] = await prisma.$transaction(ops);
    return NextResponse.json({ ok: true, student: updated });
  }

  const settings = await getSettings();
  const base = student.accessExpires && student.accessExpires > new Date() ? student.accessExpires : new Date();

  if (action === "extend") {
    // 1 tháng cho học viên cũ / 3 tháng cho chưa đăng ký
    const days =
      student.type === "OLD" ? num(settings.extend_days_old, 30) : num(settings.extend_days_unregistered, 90);
    const accessExpires = new Date(base.getTime() + days * 86400000);
    const updated = await prisma.student.update({ where: { id }, data: { accessExpires } });
    return NextResponse.json({ ok: true, student: updated });
  }

  if (action === "register") {
    // Đổi trạng thái chưa đăng ký -> đã đăng ký, tự gia hạn (3 tháng mặc định).
    const addDays = num(settings.extend_days_unregistered, 90);
    const accessExpires = new Date(base.getTime() + addDays * 86400000);
    const updated = await prisma.student.update({
      where: { id },
      data: { registered: true, type: "OLD", accessExpires },
    });
    return NextResponse.json({ ok: true, student: updated });
  }

  if (action === "toggleActive") {
    const updated = await prisma.student.update({ where: { id }, data: { active: !student.active } });
    return NextResponse.json({ ok: true, student: updated });
  }

  return NextResponse.json({ error: "Hành động không hợp lệ." }, { status: 400 });
}
