import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { enrollmentPromotion } from "@/lib/access";

const STATUSES = ["STUDYING", "COMPLETED"];

// POST: ghi danh học viên vào lớp.
// body: { studentId, classId, status? }
// => tạo/cập nhật Enrollment VÀ tự chuyển học viên sang OLD + full quyền (enrollmentPromotion()).
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const studentId = String(body.studentId || "");
  const classId = String(body.classId || "");
  const status = STATUSES.includes(body.status) ? body.status : "STUDYING";
  if (!studentId || !classId) {
    return NextResponse.json({ error: "Thiếu studentId hoặc classId." }, { status: 400 });
  }

  const [student, klass] = await Promise.all([
    prisma.student.findUnique({ where: { id: studentId } }),
    prisma.class.findUnique({ where: { id: classId } }),
  ]);
  if (!student) return NextResponse.json({ error: "Không tìm thấy học viên." }, { status: 404 });
  if (!klass) return NextResponse.json({ error: "Không tìm thấy lớp." }, { status: 404 });

  // Ghi danh + auto-promote trong 1 transaction (đảm bảo nhất quán).
  const [enrollment, updatedStudent] = await prisma.$transaction([
    prisma.enrollment.upsert({
      where: { classId_studentId: { classId, studentId } },
      update: { status },
      create: { classId, studentId, status },
    }),
    prisma.student.update({ where: { id: studentId }, data: enrollmentPromotion() }),
  ]);

  return NextResponse.json({ ok: true, enrollment, student: updatedStudent });
}

// PATCH: đổi trạng thái ghi danh (đang học <-> đã học).
// body: { enrollmentId, status } hoặc { studentId, classId, status }
export async function PATCH(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  if (!STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 400 });
  }

  const where = body.enrollmentId
    ? { id: String(body.enrollmentId) }
    : body.studentId && body.classId
    ? { classId_studentId: { classId: String(body.classId), studentId: String(body.studentId) } }
    : null;
  if (!where) return NextResponse.json({ error: "Thiếu định danh ghi danh." }, { status: 400 });

  try {
    const enrollment = await prisma.enrollment.update({ where, data: { status: body.status } });
    return NextResponse.json({ ok: true, enrollment });
  } catch (e) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Không tìm thấy ghi danh." }, { status: 404 });
    console.error(e);
    return NextResponse.json({ error: "Không cập nhật được ghi danh." }, { status: 500 });
  }
}

// DELETE: gỡ ghi danh khỏi lớp. Không hạ trạng thái học viên (đã là OLD thì giữ nguyên).
// body: { enrollmentId } hoặc { studentId, classId }
export async function DELETE(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const where = body.enrollmentId
    ? { id: String(body.enrollmentId) }
    : body.studentId && body.classId
    ? { classId_studentId: { classId: String(body.classId), studentId: String(body.studentId) } }
    : null;
  if (!where) return NextResponse.json({ error: "Thiếu định danh ghi danh." }, { status: 400 });

  try {
    await prisma.enrollment.delete({ where });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Không tìm thấy ghi danh." }, { status: 404 });
    console.error(e);
    return NextResponse.json({ error: "Không gỡ được ghi danh." }, { status: 500 });
  }
}
