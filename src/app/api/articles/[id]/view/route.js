import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

// Register a detailed view (unique per student -> readCount; every open -> viewCount).
export async function POST(_req, { params }) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });

  const { id } = params;
  await prisma.article.update({ where: { id }, data: { viewCount: { increment: 1 } } });

  try {
    await prisma.articleView.create({ data: { articleId: id, studentId: student.id } });
    await prisma.article.update({ where: { id }, data: { readCount: { increment: 1 } } });
  } catch {
    // unique constraint -> already counted this reader
  }
  return NextResponse.json({ ok: true });
}
