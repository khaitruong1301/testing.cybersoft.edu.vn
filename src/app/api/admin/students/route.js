import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { generateUniqueCodes, normalizePhoneVN } from "@/lib/codes";

// GET danh sách học viên (kèm mã + trạng thái truy cập + các lớp đã ghi danh).
// Lọc: ?q= (tên/email/phone/mã)  &classId=  &branchId=  &type=OLD|UNREGISTERED
export async function GET(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const classId = searchParams.get("classId") || "";
  const branchId = searchParams.get("branchId") || "";
  const type = searchParams.get("type") || "";

  // Điều kiện lọc phía DB (lớp/chi nhánh/loại).
  const AND = [];
  if (classId) AND.push({ enrollments: { some: { classId } } });
  if (branchId) AND.push({ enrollments: { some: { class: { branchId } } } });
  if (type === "OLD" || type === "UNREGISTERED") AND.push({ type });

  const students = await prisma.student.findMany({
    where: AND.length ? { AND } : undefined,
    include: {
      code: true,
      enrollments: {
        orderBy: { createdAt: "desc" },
        include: { class: { include: { branch: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  // Lọc từ khoá (tên/email/phone/mã) phía ứng dụng.
  const filtered = q
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.includes(q) ||
          (s.code?.code || "").toLowerCase().includes(q)
      )
    : students;

  return NextResponse.json({ students: filtered });
}

// POST: THÊM HỌC VIÊN MỚI (giáo vụ).
// body: { name, email, phone, type: "OLD" | "UNREGISTERED" }
// Tạo AccessCode (sinh mã 6 ký tự) + Student gắn với mã đó -> học viên đăng nhập bằng email+phone+mã.
// UNREGISTERED = dùng thử 3 ngày; OLD = truy cập vĩnh viễn.
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = normalizePhoneVN(body.phone);
  const type = body.type === "OLD" ? "OLD" : "UNREGISTERED";
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Cần đủ họ tên, email và số điện thoại." }, { status: 400 });
  }

  const existing = new Set((await prisma.accessCode.findMany({ select: { code: true } })).map((c) => c.code));
  const [code] = generateUniqueCodes(1, existing);

  try {
    const student = await prisma.$transaction(async (tx) => {
      const ac = await tx.accessCode.create({
        data: { code, name, email, phone, type, batch: "add-" + new Date().toISOString().slice(0, 10) },
      });
      return tx.student.create({
        data: { name, email, phone, type, registered: type === "OLD", codeId: ac.id },
        include: { code: true, enrollments: { include: { class: { include: { branch: true } } } } },
      });
    });
    return NextResponse.json({ ok: true, student, code });
  } catch (e) {
    if (e?.code === "P2002") return NextResponse.json({ error: "Trùng mã/khoá dữ liệu, thử lại." }, { status: 409 });
    console.error(e);
    return NextResponse.json({ error: "Không tạo được học viên." }, { status: 500 });
  }
}
