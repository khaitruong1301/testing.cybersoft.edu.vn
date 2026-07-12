import crypto from "crypto";

// Chuẩn hóa số điện thoại VN về dạng nội địa bắt đầu bằng 0.
//  - Bỏ mọi ký tự không phải số (khoảng trắng, dấu chấm, gạch, ngoặc…).
//  - +84xxxxxxxxx / 84xxxxxxxxx  -> 0xxxxxxxxx
//  - Excel lưu SĐT dạng SỐ làm mất số 0 đầu (9 chữ số) -> thêm lại "0".
export function normalizePhoneVN(raw) {
  let p = String(raw ?? "").trim();
  if (!p) return "";
  const plus = p.replace(/[^\d+]/g, "");
  let d = plus.replace(/\D/g, "");
  if (plus.startsWith("+84")) d = "0" + d.slice(2);
  else if (d.startsWith("84") && d.length >= 11) d = "0" + d.slice(2);
  if (d.length === 9 && d[0] !== "0") d = "0" + d; // Excel mất số 0 đầu
  return d;
}

// Unambiguous alphabet: no 0/O, 1/I/L to avoid confusion when typing.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const LEN = 6;

export function randomCode() {
  let out = "";
  const bytes = crypto.randomBytes(LEN);
  for (let i = 0; i < LEN; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

/**
 * Generate `count` unique codes, avoiding any in `existing` (a Set).
 * Returns an array of new unique codes.
 */
export function generateUniqueCodes(count, existing = new Set()) {
  const result = [];
  const seen = new Set(existing);
  let guard = 0;
  while (result.length < count && guard < count * 50) {
    const c = randomCode();
    guard++;
    if (seen.has(c)) continue;
    seen.add(c);
    result.push(c);
  }
  if (result.length < count) {
    throw new Error("Could not generate enough unique codes; try again.");
  }
  return result;
}
