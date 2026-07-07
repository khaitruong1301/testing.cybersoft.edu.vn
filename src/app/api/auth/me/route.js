import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/session";

export async function GET() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ student: null });
  return NextResponse.json({
    student: {
      name: student.name,
      type: student.type,
      registered: student.registered,
      accessExpires: student.accessExpires,
    },
  });
}
