import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

// GET — public: anyone can read comments (even signed-out).
export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const rows = await prisma.comment.findMany({
      where: { articleId: id },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { id: true, authorName: true, body: true, createdAt: true },
    });
    return NextResponse.json({ comments: rows });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

// POST — login required. Body { body }
export async function POST(req, { params }) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });
  const { id } = params;
  let body = "";
  try { body = String((await req.json())?.body || "").trim().slice(0, 4000); } catch {}
  if (!body) return NextResponse.json({ error: "empty" }, { status: 400 });

  try {
    const c = await prisma.comment.create({
      data: { articleId: id, studentId: student.id, authorName: student.name || "Học viên", body },
      select: { id: true, authorName: true, body: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, comment: c });
  } catch (e) {
    return NextResponse.json({ error: "not_migrated", detail: String(e?.message || e) }, { status: 500 });
  }
}
