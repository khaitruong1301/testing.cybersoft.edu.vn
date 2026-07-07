import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

// GET list of students (with their code + access status).
export async function GET(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  const students = await prisma.student.findMany({
    include: { code: true },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
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
