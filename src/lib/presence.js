// Theo dõi NGƯỜI ĐANG ONLINE (in-memory) — dùng cho badge "Đang online" ở admin.
// Đếm CẢ học viên đã đăng nhập LẪN khách vãng lai (chưa đăng nhập).
// Chạy trong 1 tiến trình Node duy nhất (service `testing` qua nssm) nên Map toàn cục là đủ.
// KHÔNG lưu DB (không cần bền vững): reset khi restart là hợp lý cho "đang online ngay bây giờ".

const seen = new Map(); // key -> { at: ms, kind: "student"|"guest", name }
const WINDOW_MS = 90 * 1000; // coi là online nếu có heartbeat trong 90 giây

// Ghi nhận 1 nhịp heartbeat.
//  - Học viên đăng nhập: key = "s:<studentId>"
//  - Khách vãng lai:     key = "g:<visitorId>"
export function touch(key, kind = "guest", name = "") {
  if (!key) return;
  seen.set(key, { at: Date.now(), kind, name });
}

function prune(cutoff) {
  for (const [k, v] of seen) if (v.at < cutoff) seen.delete(k);
}

// Thống kê online: tổng, học viên, khách.
export function onlineStats(windowMs = WINDOW_MS) {
  const cutoff = Date.now() - windowMs;
  prune(cutoff);
  let students = 0, guests = 0;
  for (const v of seen.values()) (v.kind === "student" ? students++ : guests++);
  return { total: students + guests, students, guests };
}

// Số online tổng (tương thích cũ).
export function onlineCount(windowMs = WINDOW_MS) {
  return onlineStats(windowMs).total;
}
