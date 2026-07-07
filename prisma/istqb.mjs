import { B } from "./content.mjs";
import { DATA as FOUNDATION } from "./bank_foundation.mjs";
import { DATA as ADVANCED } from "./bank_advanced.mjs";
import { DATA as EXPERT } from "./bank_expert.mjs";

// ============================================================================
// ISTQB practice bank — 3 levels, 100 câu / level (300 câu), đủ 3 ngôn ngữ vi/en/ja.
// Dữ liệu câu hỏi nằm ở bank_foundation.mjs / bank_advanced.mjs / bank_expert.mjs
// (mỗi phần tử: { q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }).
// File này gắn nhãn level (lvl) và gộp lại thành ISTQB_MCQ cho seed/loader.
// ============================================================================

export const ISTQB_LEVELS = [
  { slug: "istqb-foundation", title: B("ISTQB Foundation (CTFL)", "ISTQB Foundation (CTFL)", "ISTQB Foundation (CTFL)"), icon: "🥉" },
  { slug: "istqb-advanced", title: B("ISTQB Advanced (CTAL)", "ISTQB Advanced (CTAL)", "ISTQB Advanced (CTAL)"), icon: "🥈" },
  { slug: "istqb-expert", title: B("ISTQB Expert (CTEL)", "ISTQB Expert (CTEL)", "ISTQB Expert (CTEL)"), icon: "🥇" },
];

const tag = (lvl, arr) => arr.map((d) => ({ lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp }));

export const ISTQB_MCQ = [
  ...tag("istqb-foundation", FOUNDATION),
  ...tag("istqb-advanced", ADVANCED),
  ...tag("istqb-expert", EXPERT),
];
