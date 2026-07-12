import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/session";
import { touch } from "@/lib/presence";

export const dynamic = "force-dynamic";

// Nhịp "còn online" từ web (AppShell ping mỗi ~30s) — tính CẢ khách vãng lai.
// body: { vid } — id khách vãng lai (sinh phía client, lưu localStorage).
export async function POST(req) {
  const student = await getCurrentStudent();
  if (student) {
    touch("s:" + student.id, "student", student.name);
    return NextResponse.json({ ok: true, kind: "student" });
  }
  const { vid } = await req.json().catch(() => ({}));
  if (vid) touch("g:" + String(vid).slice(0, 64), "guest");
  return NextResponse.json({ ok: true, kind: "guest" });
}
