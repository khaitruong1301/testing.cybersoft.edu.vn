import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/session";
import { getSettings, setSetting, DEFAULTS } from "@/lib/settings";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ settings: await getSettings() });
}

export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  for (const key of Object.keys(DEFAULTS)) {
    if (body[key] !== undefined) await setSetting(key, body[key]);
  }
  return NextResponse.json({ ok: true, settings: await getSettings() });
}
