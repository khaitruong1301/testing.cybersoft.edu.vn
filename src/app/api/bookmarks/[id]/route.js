import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

// Create or update a bookmark (with optional note) for the current student.
export async function POST(req, { params }) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });

  const { id } = params;
  let note = "";
  try {
    const body = await req.json();
    note = typeof body?.note === "string" ? body.note.slice(0, 4000) : "";
  } catch {
    note = "";
  }

  try {
    const bm = await prisma.bookmark.upsert({
      where: { articleId_studentId: { articleId: id, studentId: student.id } },
      update: { note },
      create: { articleId: id, studentId: student.id, note },
    });
    return NextResponse.json({ ok: true, bookmark: { articleId: bm.articleId, note: bm.note } });
  } catch (e) {
    return NextResponse.json({ error: "not_migrated", detail: String(e?.message || e) }, { status: 500 });
  }
}

// Remove a bookmark.
export async function DELETE(_req, { params }) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });
  const { id } = params;
  try {
    await prisma.bookmark.deleteMany({ where: { articleId: id, studentId: student.id } });
  } catch {
    /* ignore */
  }
  return NextResponse.json({ ok: true });
}
