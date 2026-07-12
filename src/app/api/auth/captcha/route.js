import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-me-please-32-characters-minimum-000"
);

// Sinh câu đố chống robot: phép cộng đơn giản, đáp án ký trong token (hết hạn 10 phút).
// Client hiển thị `q`, gửi lại `captchaToken` + `captchaAnswer` khi xin mã học thử.
export async function GET() {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const token = await new SignJWT({ s: a + b })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret);
  return NextResponse.json({ token, q: `${a} + ${b}` });
}
