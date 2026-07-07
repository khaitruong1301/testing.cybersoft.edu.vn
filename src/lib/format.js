// Small client-safe formatting helpers (read time + relative date).

export function readTimeLabel(minutes, lang = "vi") {
  const m = Math.max(1, Math.round(minutes || 0));
  if (lang === "en") return `${m} min read`;
  if (lang === "ja") return `${m}分で読める`;
  return `${m} phút đọc`;
}

// Estimate read minutes from page count (deep articles ≈ 1.6 min/page, min 2).
export function readMinutesFromPages(pageCount = 0) {
  return Math.max(2, Math.round((pageCount || 0) * 1.6));
}

export function timeAgo(date, lang = "vi") {
  if (!date) return "";
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  const T = {
    vi: { now: "vừa xong", min: "phút trước", hour: "giờ trước", yest: "Hôm qua", day: "ngày trước", week: "tuần trước", month: "tháng trước", year: "năm trước" },
    en: { now: "just now", min: "m ago", hour: "h ago", yest: "Yesterday", day: "d ago", week: "w ago", month: "mo ago", year: "y ago" },
    ja: { now: "たった今", min: "分前", hour: "時間前", yest: "昨日", day: "日前", week: "週間前", month: "ヶ月前", year: "年前" },
  }[lang] || null;
  const t = T || { now: "vừa xong", min: "phút trước", hour: "giờ trước", yest: "Hôm qua", day: "ngày trước", week: "tuần trước", month: "tháng trước", year: "năm trước" };
  const sep = lang === "en" ? "" : " ";
  if (s < 45) return t.now;
  if (s < 3600) return `${Math.floor(s / 60)}${sep}${t.min}`;
  if (s < 86400) return `${Math.floor(s / 3600)}${sep}${t.hour}`;
  const days = Math.floor(s / 86400);
  if (days === 1) return t.yest;
  if (days < 7) return `${days}${sep}${t.day}`;
  if (days < 30) return `${Math.floor(days / 7)}${sep}${t.week}`;
  if (days < 365) return `${Math.floor(days / 30)}${sep}${t.month}`;
  return `${Math.floor(days / 365)}${sep}${t.year}`;
}
