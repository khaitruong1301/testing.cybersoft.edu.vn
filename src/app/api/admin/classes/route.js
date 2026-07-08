import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

// GET: danh sách lớp (kèm chi nhánh + số học viên). Lọc tuỳ chọn ?branchId=
export async function GET(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const branchId = searchParams.get("branchId") || undefined;

  const classes = await prisma.class.findMany({
    where: branchId ? { branchId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      branch: true,
      _count: { select: { enrollments: true } },
    },
  });
  return NextResponse.json({ classes });
}

// POST: tạo lớp. body: { name, code?, schedule?, startDate?, note?, branchId? }
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  if (!name) return NextResponse.json({ error: "Tên lớp không được trống." }, { status: 400 });

  let startDate = null;
  if (body.startDate) {
    const d = new Date(body.startDate);
    if (!isNaN(d.getTime())) startDate = d;
  }

  try {
    const klass = await prisma.class.create({
      data: {
        name,
        code: String(body.code || "").trim() || null,
        schedule: String(body.schedule || "").trim(),
        note: String(body.note || "").trim(),
        startDate,
        branchId: body.branchId ? String(body.branchId) : null,
      },
      include: { branch: true, _count: { select: { enrollments: true } } },
    });
    return NextResponse.json({ ok: true, class: klass });
  } catch (e) {
    if (e?.code === "P2002") return NextResponse.json({ error: "Mã lớp đã tồn tại." }, { status: 409 });
    if (e?.code === "P2003") return NextResponse.json({ error: "Chi nhánh không hợp lệ." }, { status: 400 });
    console.error(e);
    return NextResponse.json({ error: "Không tạo được lớp." }, { status: 500 });
  }
}
