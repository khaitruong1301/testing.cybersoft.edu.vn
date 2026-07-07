import "server-only";
import { cookies } from "next/headers";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./prisma";

const STUDENT_COOKIE = "cst_session";
const ADMIN_COOKIE = "cst_admin";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-me-please-32-characters-minimum-000"
);

// ---------------- Student session (DB-backed, revocable) ----------------

export async function createStudentSession(studentId) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 120); // 120d cap
  await prisma.session.create({ data: { token, studentId, expiresAt } });
  cookies().set(STUDENT_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
  return token;
}

export async function getCurrentStudent() {
  const token = cookies().get(STUDENT_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { student: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  const s = session.student;
  if (!s || !s.active) return null;
  // Enforce access window (counted from first login).
  if (s.accessExpires && s.accessExpires < new Date()) return null;
  return s;
}

export async function destroyStudentSession() {
  const token = cookies().get(STUDENT_COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { token } });
  cookies().delete(STUDENT_COOKIE);
}

// ---------------- Admin session (signed JWT) ----------------

export async function createAdminSession(adminId) {
  const jwt = await new SignJWT({ sub: adminId, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
  cookies().set(ADMIN_COOKIE, jwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function getCurrentAdmin() {
  const jwt = cookies().get(ADMIN_COOKIE)?.value;
  if (!jwt) return null;
  try {
    const { payload } = await jwtVerify(jwt, secret);
    if (payload.role !== "admin") return null;
    const admin = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
    return admin || null;
  } catch {
    return null;
  }
}

export function destroyAdminSession() {
  cookies().delete(ADMIN_COOKIE);
}
