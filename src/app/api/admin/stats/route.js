import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { onlineStats } from "@/lib/presence";

export const dynamic = "force-dynamic";

// Số liệu tổng quan cho màn Tổng quan (poll realtime, gồm "đang online").
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const [students, codes, activeStudents, branches, classes, articles, questions, attempts, expired] =
    await Promise.all([
      prisma.student.count(),
      prisma.accessCode.count(),
      prisma.student.count({ where: { active: true } }),
      prisma.branch.count(),
      prisma.class.count(),
      prisma.article.count(),
      prisma.interviewQuestion.count(),
      prisma.attempt.count(),
      prisma.student.count({ where: { accessExpires: { lt: now } } }),
    ]);

  const on = onlineStats();
  return NextResponse.json({
    online: on.total, onlineStudents: on.students, onlineGuests: on.guests,
    students, codes, activeStudents, branches, classes, articles, questions, attempts, expired,
  });
}
