import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { PRODUCT, normEmail } from "@/lib/ebookAiTester";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET: danh sách email đã kích hoạt ebook AI Tester, kèm tài khoản học viên trùng email (nếu có). ?q= lọc.
export async function GET(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = (new URL(req.url).searchParams.get("q") || "").toLowerCase().trim();
  const grants = await prisma.accessGrant.findMany({
    where: { product: PRODUCT, ...(q ? { email: { contains: q } } : {}) },
    orderBy: { createdAt: "desc" },
    take: 1000,
  });
  const students = grants.length
    ? await prisma.student.findMany({
        where: { email: { in: grants.map((g) => g.email), mode: "insensitive" } },
        select: { email: true, name: true, phone: true, firstLoginAt: true, active: true },
      })
    : [];
  const byEmail = new Map(students.map((s) => [normEmail(s.email), s]));
  return NextResponse.json({ grants: grants.map((g) => ({ ...g, student: byEmail.get(g.email) || null })) });
}

// POST: kích hoạt cho một hoặc nhiều email. body: { emails: "a@x.com, b@y.com" hoặc mảng, note }
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const raw = Array.isArray(body.emails) ? body.emails.join("\n") : String(body.emails || "");
  const list = [...new Set(raw.split(/[\s,;]+/).map(normEmail).filter(Boolean))];
  const bad = list.filter((e) => !EMAIL.test(e));
  const ok = list.filter((e) => EMAIL.test(e));
  if (!ok.length) return NextResponse.json({ error: "Chưa có email hợp lệ.", bad }, { status: 400 });
  const note = String(body.note || "").trim().slice(0, 200);
  const had = new Set(
    (await prisma.accessGrant.findMany({ where: { product: PRODUCT, email: { in: ok } }, select: { email: true } })).map((g) => g.email)
  );
  for (const email of ok) {
    await prisma.accessGrant.upsert({
      where: { email_product: { email, product: PRODUCT } },
      update: note ? { note } : {},
      create: { email, product: PRODUCT, note, grantedBy: admin.email || admin.id },
    });
  }
  const created = ok.filter((e) => !had.has(e)).length;
  return NextResponse.json({ ok: true, activated: ok.length, created, bad });
}

// DELETE ?id=: gỡ kích hoạt.
export async function DELETE(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!id) return NextResponse.json({ error: "Thiếu id" }, { status: 400 });
  await prisma.accessGrant.deleteMany({ where: { id, product: PRODUCT } });
  return NextResponse.json({ ok: true });
}
