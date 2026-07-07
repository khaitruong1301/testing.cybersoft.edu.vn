import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { getSettings, num } from "@/lib/settings";

// PATCH: actions on a student.
// body: { action: "extend" | "register" | "toggleActive" }
export async function PATCH(req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const { action } = await req.json();
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return NextResponse.json({ error: "Không tìm thấy học viên." }, { status: 404 });

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
