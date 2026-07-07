import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

// Returns the current student's read article ids + their bookmarks (with notes).
export async function GET() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ read: [], bookmarks: [] });

  const views = await prisma.articleView.findMany({
    where: { studentId: student.id },
    select: { articleId: true },
  });

  let bookmarks = [];
  try {
    bookmarks = await prisma.bookmark.findMany({
      where: { studentId: student.id },
      select: { articleId: true, note: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    // Bookmark model not migrated yet — run `npx prisma db push`.
    bookmarks = [];
  }

  return NextResponse.json({
    read: views.map((v) => v.articleId),
    bookmarks: bookmarks.map((b) => ({ articleId: b.articleId, note: b.note, updatedAt: b.updatedAt })),
  });
}
