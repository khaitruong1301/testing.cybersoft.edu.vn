// Bộ 8 ebook "Chuẩn bị trước khoá AI Tester": danh mục, kiểm quyền theo email, đọc tệp đã xuất.
// Tệp sách nằm ở content/ebook-ai-tester/<slug>/ (NGOÀI public/), chỉ phục vụ qua route có kiểm quyền.
import "server-only";
import fs from "fs";
import path from "path";
import { prisma } from "./prisma";
import { getCurrentAdmin } from "./session";

export const PRODUCT = "AI_TESTER_PREP";
export const ROOT = path.join(process.cwd(), "content", "ebook-ai-tester");

export function normEmail(e) {
  return String(e || "").trim().toLowerCase();
}

export function listBooks() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "index.json"), "utf8"));
  } catch {
    return [];
  }
}

// Admin đang đăng nhập luôn được đọc (để kiểm tra nội dung); học viên cần email đã được kích hoạt.
export async function hasGrant(student) {
  if (await getCurrentAdmin()) return true;
  if (!student?.email) return false;
  const g = await prisma.accessGrant.findUnique({
    where: { email_product: { email: normEmail(student.email), product: PRODUCT } },
  });
  return !!g;
}

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".dat": "text/plain; charset=utf-8", ".webp": "image/webp",
  ".png": "image/png", ".jpg": "image/jpeg",
};

// Trả {buf, type} của tệp trong cuốn <slug>, hoặc null nếu slug/đường dẫn không hợp lệ (chặn ../).
export function readBookFile(slug, parts) {
  if (!/^[a-z0-9-]+$/.test(slug || "")) return null;
  const rel = (parts && parts.length ? parts : ["index.html"]).join("/");
  if (!/^[A-Za-z0-9._\/-]+$/.test(rel) || rel.split("/").some((p) => p === ".." || p.startsWith("."))) return null;
  const base = path.join(ROOT, slug);
  const file = path.join(base, rel);
  if (!file.startsWith(base + path.sep)) return null;
  const type = TYPES[path.extname(file)];
  if (!type || !fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
  return { buf: fs.readFileSync(file), type, rel };
}
