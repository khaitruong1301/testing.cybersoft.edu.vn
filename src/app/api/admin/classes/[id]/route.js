import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

// GET: chi tiết lớp + danh sách học viên đã ghi danh (kèm trạng thái đang/đã học).
export async function GET(_req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const klass = await prisma.class.findUnique({
    where: { id },
    include: {
      branch: true,
      enrollments: {
        orderBy: { createdAt: "desc" },
        include: { student: { include: { code: true } } },
      },
    },
  });
  if (!klass) return NextResponse.json({ error: "Không tìm thấy lớp." }, { status: 404 });
  return NextResponse.json({ class: klass });
}

// PATCH: sửa lớp. body: { name?, code?, schedule?, startDate?, note?, branchId?, active? }
export async function PATCH(req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const body = await req.json().catch(() => ({}));
  const data = {};
  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) return NextResponse.json({ error: "Tên lớp không được trống." }, { status: 400 });
    data.name = name;
  }
  if (body.code !== undefined) data.code = String(body.code).trim() || null;
  if (body.schedule !== undefined) data.schedule = String(body.schedule).trim();
  if (body.note !== undefined) data.note = String(body.note).trim();
  if (body.active !== undefined) data.active = !!body.active;
  if (body.branchId !== undefined) data.branchId = body.branchId ? String(body.branchId) : null;
  if (body.startDate !== undefined) {
    if (!body.startDate) data.startDate = null;
    else {
      const d = new Date(body.startDate);
      data.startDate = isNaN(d.getTime()) ? null : d;
    }
  }

  try {
    const klass = await prisma.class.update({
      where: { id },
      data,
      include: { branch: true, _count: { select: { enrollments: true } } },
    });
    return NextResponse.json({ ok: true, class: klass });
  } catch (e) {
    if (e?.code === "P2002") return NextResponse.json({ error: "Mã lớp đã tồn tại." }, { status: 409 });
    if (e?.code === "P2025") return NextResponse.json({ error: "Không tìm thấy lớp." }, { status: 404 });
    console.error(e);
    return NextResponse.json({ error: "Không cập nhật được lớp." }, { status: 500 });
  }
}

// DELETE: xoá lớp (các ghi danh trong lớp bị xoá theo; học viên vẫn giữ trạng thái OLD).
export async function DELETE(_req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  try {
    await prisma.class.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Không tìm thấy lớp." }, { status: 404 });
    console.error(e);
    return NextResponse.json({ error: "Không xoá được lớp." }, { status: 500 });
  }
}
