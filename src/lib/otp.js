// Pure helpers cho mã đăng nhập OTP qua email. KHÔNG import prisma/next -> test được bằng node.
import crypto from "crypto";

export const OTP_TTL_MS = 5 * 60 * 1000; // 5 phút
export const MAX_CODES_PER_DAY = 3; // tối đa 3 mã/ngày/học viên
export const MAX_ATTEMPTS = 5; // số lần nhập sai tối đa cho 1 mã (chặn dò)

// Bộ ký tự không nhập nhằng (bỏ 0/O, 1/I/L) — giống lib/codes.js.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

// Sinh mã 6 ký tự ngẫu nhiên (an toàn) — bỏ ký tự dễ nhầm.
export function generateOtp() {
  const bytes = crypto.randomBytes(6);
  let out = "";
  for (let i = 0; i < 6; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

// Băm mã để không lưu mã thô trong DB.
export function hashOtp(code) {
  return crypto.createHash("sha256").update(String(code).trim().toUpperCase()).digest("hex");
}

export function otpExpiry(now = new Date()) {
  return new Date(now.getTime() + OTP_TTL_MS);
}

// Mốc ĐẦU NGÀY theo giờ Việt Nam (UTC+7) để đếm "3 mã/ngày" theo lịch VN,
// bất kể múi giờ của server.
export function startOfVnDay(now = new Date()) {
  const VN = 7 * 3600000;
  const vn = new Date(now.getTime() + VN);
  const midnightVnAsUtcMs = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth(), vn.getUTCDate()) - VN;
  return new Date(midnightVnAsUtcMs);
}

// Mã hợp lệ? (chưa dùng, còn hạn, khớp hash, chưa vượt số lần thử)
export function isOtpValid(record, code, now = new Date()) {
  if (!record || record.usedAt) return false;
  if ((record.attempts || 0) >= MAX_ATTEMPTS) return false;
  if (new Date(record.expiresAt) < now) return false;
  return record.codeHash === hashOtp(code);
}
