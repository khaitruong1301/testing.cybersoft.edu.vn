import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/session";
import { onlineStats } from "@/lib/presence";

export const dynamic = "force-dynamic";

// Số người đang online (tổng · học viên · khách) cho badge realtime ở admin.
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(onlineStats());
}
