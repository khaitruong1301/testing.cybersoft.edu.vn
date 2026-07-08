import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

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
