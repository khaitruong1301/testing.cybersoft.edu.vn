// newbie-engine.mjs — LỚP "NGƯỜI MỚI" cắm lên engine.mjs + seo-engine.mjs.
// Triết lý: học bằng LÀM (practice-first), MỖI khái niệm 1 HÌNH, tình huống → giải NGAY,
// các BƯỚC rõ ràng, và mỗi bài có 1 chương TRẮC NGHIỆM 4–5 câu để kiểm tra lại kiến thức.
//
// Tất cả helper dưới đây chỉ tạo block hợp lệ cho viewer (p,h,ul,code,note,tip,warn,img,scenario,qa).

import { P, H, NOTE, TIP, WARN, IMG, SCEN, QA, UL, CODE } from "./engine.mjs";

// ───────────────────────── 1. HỌC BẰNG LÀM (practice-first) ─────────────────────────
// BƯỚC thực hiện — hiện dạng đoạn có tiền tố "▶ Bước n". Gom lại có thể dựng HowTo schema.
export const STEP = (n, vi, en, ja) =>
  P(`▶ Bước ${n}: ${vi}`, `▶ Step ${n}: ${en}`, `▶ ステップ${n}: ${ja ?? en}`);

// HÃY THỬ — ô kêu gọi người học tự tay làm ngay (practice callout).
export const TRY = (vi, en, ja) =>
  TIP("🖐️ Tự làm thử: " + vi, "🖐️ Try it yourself: " + en, "🖐️ 自分でやってみよう: " + (ja ?? en));

// LỖI HAY GẶP — cảnh báo bẫy cho người mới.
export const PITFALL = (vi, en, ja) =>
  WARN("⚠️ Lỗi người mới hay gặp: " + vi, "⚠️ Common beginner mistake: " + en, "⚠️ 初心者がよくやる失敗: " + (ja ?? en));

// ───────────────────────── 2. TÌNH HUỐNG → GIẢI NGAY ─────────────────────────
// Nêu 1 tình huống cụ thể (SCEN). Ngay sau đó tác giả đặt các block giải (P/CODE/STEP).
export const SITUATION = (tVi, tEn, bVi, bEn, tJa, bJa) =>
  SCEN("🎯 Tình huống: " + tVi, "🎯 Situation: " + tEn, bVi, bEn,
       "🎯 シーン: " + (tJa ?? tEn), bJa);

// Nhãn "Cách giải" để mở đầu phần lời giải ngay dưới tình huống.
export const SOLVE = (vi, en, ja) =>
  NOTE("✅ Cách giải: " + vi, "✅ Solution: " + en, "✅ 解き方: " + (ja ?? en));

// ───────────────────────── 3. TRẮC NGHIỆM (4–5 câu/bài) ─────────────────────────
// mcq() -> 1 block qa: câu hỏi kèm các lựa chọn A/B/C/D(/E); đáp án hiện đáp án đúng + GIẢI THÍCH.
// Dùng: const q = mcq({ q:{vi,en,ja}, options:[{vi,en,ja},...], correct:1, explain:{vi,en,ja} });
// rồi đặt q vào blocks của chương "Trắc nghiệm".
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const optLines = (options, l) =>
  options.map((o, i) => `${LETTERS[i]}. ${o[l] || o.en || o.vi}`).join("\n");

export function mcq({ q, options, correct, explain }) {
  if (!options || options.length < 4 || options.length > 5)
    throw new Error("mcq: cần 4–5 lựa chọn");
  if (correct == null || correct < 0 || correct >= options.length)
    throw new Error("mcq: 'correct' ngoài khoảng");
  const L = LETTERS[correct];
  const build = (l, ans) => `${(q[l] || q.en || q.vi)}\n${optLines(options, l)}`;
  const ansBuild = (l) => `✅ Đáp án: ${L}. ${(explain && (explain[l] || explain.en || explain.vi)) || ""}`;
  const ansBuildEn = () => `✅ Answer: ${L}. ${(explain && (explain.en || explain.vi)) || ""}`;
  const ansBuildJa = () => `✅ 正解: ${L}. ${(explain && (explain.ja || explain.en || explain.vi)) || ""}`;
  return {
    t: "qa",
    q: { vi: build("vi"), en: build("en"), ja: build("ja") },
    a: { vi: ansBuild("vi"), en: ansBuildEn(), ja: ansBuildJa() },
    _mcq: true, // đánh dấu để verify đếm số câu trắc nghiệm
  };
}

// QUIZ() — dựng nguyên 1 chương trắc nghiệm: trả về { heading, blocks:[intro, ...mcqBlocks] }.
export const QUIZ = (items, opts = {}) => ({
  heading: {
    vi: (opts.no ? opts.no + ". " : "") + "Trắc nghiệm củng cố kiến thức",
    en: (opts.no ? opts.no + ". " : "") + "Knowledge check quiz",
    ja: (opts.no ? opts.no + ". " : "") + "理解度チェッククイズ",
  },
  blocks: [
    P("Trả lời 4–5 câu sau để tự kiểm tra. Chọn đáp án rồi mở phần trả lời để xem lời giải thích.",
      "Answer the following questions to self-check. Pick an answer, then reveal the explanation.",
      "以下の問題に答えて理解度を確認しましょう。"),
    ...items,
  ],
});

// ───────────────────────── 4. TIỆN ÍCH KHÁC ─────────────────────────
// Ý CHÍNH cần nhớ cuối chương (recap ngắn).
export const RECAP = (viArr, enArr, jaArr) => UL(
  viArr.map((s) => "📌 " + s), enArr.map((s) => "📌 " + s), (jaArr ?? enArr).map((s) => "📌 " + s));
