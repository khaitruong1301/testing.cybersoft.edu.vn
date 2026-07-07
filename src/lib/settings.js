import { prisma } from "./prisma";

// Default configurable settings.
export const DEFAULTS = {
  access_days_old: "0", // học viên cũ: 0 = xem VĨNH VIỄN (không hết hạn)
  access_days_unregistered: "7", // học viên chưa đăng ký: 7 ngày
  extend_days_old: "0", // gia hạn học viên cũ: 0 = vĩnh viễn
  extend_days_unregistered: "90", // đổi sang đã đăng ký: 3 tháng
  quiz_mcq_count: "30", // số câu trắc nghiệm mỗi lượt luyện
  quiz_essay_count: "5", // số câu tự luận mỗi lượt luyện
  mock_question_count: "40", // số câu mock interview
  mock_duration_min: "45", // thời gian làm bài mock (phút)
};

export async function getSetting(key) {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row ? row.value : DEFAULTS[key];
}

export async function getSettings() {
  const rows = await prisma.setting.findMany();
  const map = { ...DEFAULTS };
  for (const r of rows) map[r.key] = r.value;
  return map;
}

export async function setSetting(key, value) {
  return prisma.setting.upsert({
    where: { key },
    update: { value: String(value) },
    create: { key, value: String(value) },
  });
}

export function num(v, fallback = 0) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}
