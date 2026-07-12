import { B } from "./content.mjs";
import { DATA as FOUNDATION } from "./bank_foundation.mjs";
import { DATA as ADVANCED } from "./bank_advanced.mjs";
import { DATA as EXPERT } from "./bank_expert.mjs";
import { DATA as FOUNDATION_EXT } from "./bank_foundation_ext.mjs";
import { DATA as ADVANCED_EXT } from "./bank_advanced_ext.mjs";
import { DATA as EXPERT_EXT } from "./bank_expert_ext.mjs";
// Bổ sung đợt 2, 3 & 4: đã gắn sẵn nhãn `lvl` trong từng phần tử.
import { DATA as ISTQB_EXT2 } from "./bank_istqb_ext2.mjs";
import { DATA as ISTQB_EXT3 } from "./bank_istqb_ext3.mjs";
import { DATA as ISTQB_EXT4 } from "./bank_istqb_ext4.mjs";
import { DATA as ISTQB_EXT5 } from "./bank_istqb_ext5.mjs";
import { DATA as ISTQB_EXT6 } from "./bank_istqb_ext6.mjs";
import { DATA as ISTQB_EXT7 } from "./bank_istqb_ext7.mjs";
import { DATA as ISTQB_EXT8 } from "./bank_istqb_ext8.mjs";
import { DATA as ISTQB_EXT9 } from "./bank_istqb_ext9.mjs";
import { DATA as ISTQB_EXT10 } from "./bank_istqb_ext10.mjs";

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
  ...tag("istqb-foundation", FOUNDATION_EXT),
  ...tag("istqb-advanced", ADVANCED),
  ...tag("istqb-advanced", ADVANCED_EXT),
  ...tag("istqb-expert", EXPERT),
  ...tag("istqb-expert", EXPERT_EXT),
  // Đợt 2, 3 & 4: mỗi phần tử đã có sẵn `lvl` -> dùng thẳng.
  ...ISTQB_EXT2.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT3.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT4.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT5.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT6.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT7.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT8.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT9.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
  ...ISTQB_EXT10.map((d) => ({ lvl: d.lvl, q: d.q, options: d.options, answer: d.answer, exp: d.exp })),
];
