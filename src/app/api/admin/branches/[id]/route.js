import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

// PATCH: sửa chi nhánh. body: { name?, code?, address?, phone?, active? }
export async function PATCH(req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const body = await req.json().catch(() => ({}));
  const data = {};
  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) return NextResponse.json({ error: "Tên chi nhánh không được trống." }, { status: 400 });
    data.name = name;
  }
  if (body.code !== undefined) data.code = String(body.code).trim() || null;
  if (body.address !== undefined) data.address = String(body.address).trim();
  if (body.phone !== undefined) data.phone = String(body.phone).trim();
  if (body.active !== undefined) data.active = !!body.active;

  try {
    const branch = await prisma.branch.update({ where: { id }, data });
    return NextResponse.json({ ok: true, branch });
  } catch (e) {
    if (e?.code === "P2002") return NextResponse.json({ error: "Tên chi nhánh đã tồn tại." }, { status: 409 });
    if (e?.code === "P2025") return NextResponse.json({ error: "Không tìm thấy chi nhánh." }, { status: 404 });
    console.error(e);
    return NextResponse.json({ error: "Không cập nhật được chi nhánh." }, { status: 500 });
  }
}

// DELETE: xoá chi nhánh. Lớp thuộc chi nhánh sẽ bị gỡ liên kết (branchId = null).
export async function DELETE(_req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  try {
    // Gỡ liên kết lớp trước cho tường minh (tránh phụ thuộc referential action mặc định).
    await prisma.class.updateMany({ where: { branchId: id }, data: { branchId: null } });
    await prisma.branch.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Không tìm thấy chi nhánh." }, { status: 404 });
    console.error(e);
    return NextResponse.json({ error: "Không xoá được chi nhánh." }, { status: 500 });
  }
}
