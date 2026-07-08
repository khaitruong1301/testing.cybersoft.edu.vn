import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

// GET: danh sách chi nhánh (kèm số lớp).
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const branches = await prisma.branch.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { classes: true } } },
  });
  return NextResponse.json({ branches });
}

// POST: tạo chi nhánh. body: { name, code?, address?, phone? }
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  if (!name) return NextResponse.json({ error: "Tên chi nhánh không được trống." }, { status: 400 });

  try {
    const branch = await prisma.branch.create({
      data: {
        name,
        code: String(body.code || "").trim() || null,
        address: String(body.address || "").trim(),
        phone: String(body.phone || "").trim(),
      },
    });
    return NextResponse.json({ ok: true, branch });
  } catch (e) {
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "Tên chi nhánh đã tồn tại." }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "Không tạo được chi nhánh." }, { status: 500 });
  }
}
