// Pure helpers cho cửa sổ truy cập & vòng đời học viên.
// KHÔNG import prisma/next -> unit-test được bằng node thuần (xem test/access.test.mjs).
// Đây là NGUỒN DUY NHẤT cho các quy tắc: dùng ở login, ghi danh, kiểm phiên.

const DAY_MS = 86400000;

export function toInt(v, fallback = 0) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

// TRUY CẬP VĨNH VIỄN CHO MỌI HỌC VIÊN (kể cả chưa đăng ký) — đã BỎ hạn học thử 3 ngày.
// Luôn trả 0 ngày = vĩnh viễn, bất kể loại/cấu hình. Ghi danh vẫn dùng enrollmentPromotion().
export function accessDaysForType(_type, _settings = {}) {
  return 0; // 0 = VĨNH VIỄN cho tất cả
}

// Không đặt mốc hết hạn nữa -> luôn null (vĩnh viễn).
export function computeAccessExpires(_type, _settings = {}, _now = new Date()) {
  return null;
}

// Học viên còn quyền truy cập không?
//  - Chỉ chặn khi bị admin KHOÁ (active=false). KHÔNG còn chặn theo thời hạn.
export function hasAccess(student, _now = new Date()) {
  if (!student || !student.active) return false;
  return true;
}

// Dữ liệu cập nhật khi GHI DANH vào lớp:
// tự chuyển thành học viên cũ (OLD) + đã đăng ký + mở FULL quyền (vĩnh viễn) + mở khoá.
export function enrollmentPromotion() {
  return { type: "OLD", registered: true, accessExpires: null, active: true };
}
