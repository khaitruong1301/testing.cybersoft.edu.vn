import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

async function counts(articleId) {
  const up = await prisma.vote.count({ where: { articleId, value: 1 } });
  const down = await prisma.vote.count({ where: { articleId, value: -1 } });
  // keep denormalised columns in sync (best-effort)
  try { await prisma.article.update({ where: { id: articleId }, data: { upvotes: up, downvotes: down } }); } catch {}
  return { up, down };
}

// POST { value: 1 | -1 | 0 }  (0 or same value again = remove vote → toggle)
export async function POST(req, { params }) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });
  const { id } = params;
  let value = 0;
  try { value = Number((await req.json())?.value) || 0; } catch {}

  try {
    const existing = await prisma.vote.findUnique({
      where: { articleId_studentId: { articleId: id, studentId: student.id } },
    });
    let myVote = 0;
    if (value === 0 || (existing && existing.value === value)) {
      // toggle off
      if (existing) await prisma.vote.delete({ where: { id: existing.id } });
      myVote = 0;
    } else {
      await prisma.vote.upsert({
        where: { articleId_studentId: { articleId: id, studentId: student.id } },
        update: { value },
        create: { articleId: id, studentId: student.id, value },
      });
      myVote = value;
    }
    const c = await counts(id);
    return NextResponse.json({ ok: true, ...c, myVote });
  } catch (e) {
    return NextResponse.json({ error: "not_migrated", detail: String(e?.message || e) }, { status: 500 });
  }
}
