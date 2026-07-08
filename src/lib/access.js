// Pure helpers cho cửa sổ truy cập & vòng đời học viên.
// KHÔNG import prisma/next -> unit-test được bằng node thuần (xem test/access.test.mjs).
// Đây là NGUỒN DUY NHẤT cho các quy tắc: dùng ở login, ghi danh, kiểm phiên.

const DAY_MS = 86400000;

export function toInt(v, fallback = 0) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

// Số ngày truy cập theo loại học viên (0 = VĨNH VIỄN).
//  - OLD (học viên cũ): access_days_old (mặc định 0 = vĩnh viễn)
//  - UNREGISTERED (chưa đăng ký): access_days_unregistered (mặc định 7 ngày)
export function accessDaysForType(type, settings = {}) {
  return type === "OLD"
    ? toInt(settings.access_days_old, 0)
    : toInt(settings.access_days_unregistered, 7);
}

// Tính mốc hết hạn tính TỪ lần đăng nhập đầu. days <= 0 => null (vĩnh viễn).
export function computeAccessExpires(type, settings = {}, now = new Date()) {
  const days = accessDaysForType(type, settings);
  return days > 0 ? new Date(now.getTime() + days * DAY_MS) : null;
}

// Học viên còn quyền truy cập không?
//  - Bị khoá (active=false) -> không.
//  - accessExpires null -> vĩnh viễn -> có.
//  - accessExpires đã qua -> hết hạn -> không.
export function hasAccess(student, now = new Date()) {
  if (!student || !student.active) return false;
  if (student.accessExpires && new Date(student.accessExpires) < now) return false;
  return true;
}

// Dữ liệu cập nhật khi GHI DANH vào lớp:
// tự chuyển thành học viên cũ (OLD) + đã đăng ký + mở FULL quyền (vĩnh viễn) + mở khoá.
export function enrollmentPromotion() {
  return { type: "OLD", registered: true, accessExpires: null, active: true };
}
