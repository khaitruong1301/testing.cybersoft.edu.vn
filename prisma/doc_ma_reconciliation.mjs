// doc_ma_reconciliation.mjs — BÀI MANUAL "NÂNG CAO":
// Kiểm thử báo cáo & đối soát dữ liệu (Reporting & Reconciliation Testing) — hệ NGÂN HÀNG.
// Đối soát sổ cái ↔ giao dịch ↔ báo cáo, sai lệch làm tròn/tỷ giá, lọc/nhóm/tổng cộng,
// dữ liệu cuối ngày/cuối kỳ (EOD/EOM), báo cáo theo múi giờ. Dự án: hệ báo cáo tài chính &
// đối soát cổng thanh toán ngân hàng TrustBank PayGate. Nhiều MOCKUP giao diện (ui_mock),
// 2 tình huống thật (jira). Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến ngân hàng.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "nangcao", label: cfg.coverLabel });
  const seo = buildSeo({
    title: cfg.metaTitle, description: cfg.metaDescription, slug: cfg.slug,
    primaryKeyword: cfg.primaryKeyword, keywords: cfg.keywords,
    image: `https://cybersoft.edu.vn/og/${cfg.slug}.png`,
    faqs: cfg.faqs.map((f) => f.faq), courses: [course],
    breadcrumbs: [
      { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
      { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
      { name: cfg.crumb, url: `https://cybersoft.edu.vn/tai-lieu/${cfg.slug}` },
    ],
    howTo: cfg.howTo,
  });
  return {
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "banking", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: đối soát 3 nguồn số liệu cuối ngày (grid) ──
const m_recon3 = grid("Đối soát 3 nguồn số liệu cuối ngày — TrustBank PayGate · 10/07", ["Chỉ tiêu", "Sổ cái (GL)", "Nhật ký giao dịch (TXN)", "Báo cáo tổng hợp (RPT)"], [
  ["Tổng số giao dịch", "48.206", "48.212", "48.206"],
  ["Tổng giá trị (VND)", "182.430.556.000", "182.438.910.500", "182.430.556.000"],
  ["Giao dịch PENDING", "0 (chưa hạch toán)", "6", "0 — BỊ BỎ SÓT"],
  ["Giao dịch REVERSAL", "318", "318", "316 — LỆCH 2"],
], { accent: "#155ce1", highlight: 3, note: "Lệch chỉ xuất hiện đúng ở các giao dịch CHƯA hạch toán hoặc ĐẢO — nơi 3 nguồn không đồng bộ trạng thái tại cùng một mốc thời gian." });

// ── Mockup 2: luồng dữ liệu đối soát Core Banking → Cổng thanh toán → Kho dữ liệu → Report Engine ──
const m_flow = moduleFlow("Luồng dữ liệu đối soát — TrustBank PayGate", [
  { id: "core", label: "Core Banking", sub: "ghi Sổ cái (GL)", x: 100, y: 70 },
  { id: "gw", label: "Cổng thanh toán", sub: "log Giao dịch (TXN)", x: 350, y: 70 },
  { id: "dwh", label: "Kho dữ liệu", sub: "ETL theo lô 15 phút", x: 600, y: 70 },
  { id: "rpt", label: "Report Engine", sub: "tổng hợp & đối soát EOD", x: 600, y: 220 },
], [
  { from: "core", to: "gw", label: "đồng bộ ~5 giây" },
  { from: "gw", to: "dwh", label: "ETL theo lô 15 phút" },
  { from: "dwh", to: "rpt", label: "tổng hợp lúc 23:59" },
  { from: "core", to: "rpt", label: "trễ đồng bộ 2–5 phút", bad: true },
], { accent: "#155ce1", h: 300 });

// ── Mockup 3: màn báo cáo tài chính + annotate ô lệch ──
const m_report = browser("paygate.trustbank.vn/bao-cao/tong-hop-ngay?d=2026-07-10", [
  panel("TrustBank PayGate · Báo cáo tổng hợp giao dịch — 10/07/2026", [
    field(24, 20, 330, "Tổng số giao dịch", "48.206", "normal"),
    field(372, 20, 330, "Tổng giá trị (VND)", "182.430.556.000", "normal"),
    field(24, 92, 330, "Giao dịch PENDING (chưa chốt)", "0", "error"),
    field(372, 92, 330, "Giao dịch REVERSAL", "316", "error"),
    field(24, 164, 330, "Chênh lệch với Sổ cái (GL)", "-2 GD / -1.245.500đ", "error"),
    btn(24, 236, 220, "Xuất báo cáo PDF", "primary"),
    annotate(20, 82, 330, 44, "LỆCH: RPT bỏ 6 GD Pending có trong TXN"),
    annotate(368, 82, 330, 44, "LỆCH: RPT thiếu 2 GD Reversal so với GL"),
    annotate(20, 154, 330, 44, "Số chênh lệch tự tính — cần điều tra gốc"),
  ].join(""), { h: 300, accent: "#155ce1" }),
].join(""), { h: 356, title: "TrustBank · Báo cáo tài chính", accent: "#155ce1" });

// ── Mockup 4: bảng ca kiểm thử tổng/nhóm/làm tròn số liệu ──
const m_testcases = grid("Bảng ca kiểm thử tổng cộng / nhóm / làm tròn số liệu", ["Ca kiểm thử", "Input / điều kiện", "Kỳ vọng", "Kỹ thuật áp dụng"], [
  ["Làm tròn phí giao dịch nửa xu", "Phí tính ra 2.499,995đ", "Làm tròn ngân hàng (banker's rounding) → 2.500đ, NHẤT QUÁN ở GL/TXN/RPT", "Kiểm thử biên làm tròn (rounding boundary)"],
  ["Tỷ giá quy đổi ngoại tệ lúc chốt sổ", "1 USD = 25.482,368421 VND (6 số thập phân nội bộ)", "RPT hiển thị làm tròn 0 đồng nhưng GL giữ đủ số thập phân — tổng cộng vẫn khớp tuyệt đối", "Kiểm thử tỷ giá & độ chính xác thập phân"],
  ["Tổng theo nhóm chi nhánh", "GROUP BY branch_code, 214 chi nhánh", "SUM từng nhóm cộng lại = tổng toàn hệ thống, không có giao dịch rơi vào nhóm null/orphan", "Kiểm thử nhóm & tổng (group-by/aggregate)"],
  ["Lọc theo khoảng ngày chồng lấn EOD", "Lọc 01/07–02/07 khi batch EOD đang chạy 23:58", "Giao dịch 23:58:00–23:59:59 không bị đếm 2 lần và không bị bỏ sót giữa 2 kỳ", "Kiểm thử biên cắt ngày (cutoff boundary)"],
  ["Giao dịch REVERSAL/VOID trong kỳ", "Giao dịch gốc và giao dịch đảo khác ngày báo cáo", "Tổng RÒNG (net) đúng ở mọi báo cáo, không bị cấn trừ 2 lần hoặc bỏ sót", "Kiểm thử tổng ròng vs tổng gộp (net vs gross)"],
], { accent: "#155ce1", note: "Mỗi dòng cần ca DƯƠNG (khớp) và ít nhất 1 ca kiểm chứng khi dữ liệu nằm đúng biên (Pending, cutoff, .5)." });

// ── Mockup 5: ticket Jira lệch đối soát ──
const m_jira = jira({
  key: "RECON-4417", title: "Báo cáo tổng hợp 10/07 lệch Sổ cái 2 giao dịch Reversal (~1.245.500đ)",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "production · TrustBank PayGate · batch EOD 23:59"],
    ["Nguồn đối chiếu", "GL (Core Banking) vs RPT (Report Engine)"],
    ["Thực tế", "RPT đếm 316 GD Reversal, GL ghi nhận 318 GD Reversal"],
    ["Nguyên nhân nghi vấn", "2 GD Reversal phát sinh sau 23:58 bị batch ETL bỏ sót do cắt lô theo giờ SERVER thay vì giờ NGHIỆP VỤ (GMT+7)"],
    ["Ảnh hưởng", "Báo cáo gửi Ban điều hành sai số dư ròng cuối ngày, ảnh hưởng quyết toán"],
  ],
});

// ── Mockup 6: bảng kanban theo dõi lệch đối soát ──
const m_kanban = kanban("Bảng theo dõi lệch đối soát (TrustBank PayGate · Sprint Recon-14)", [
  { name: "New", cards: [
    { key: "RECON-4417", title: "Lệch 2 GD Reversal do cắt batch theo giờ server", sev: "High" },
    { key: "RECON-4420", title: "Làm tròn tỷ giá USD lệch 1đ hàng loạt", sev: "Medium" },
  ] },
  { name: "Investigating", cards: [
    { key: "RECON-4402", title: "RPT bỏ sót giao dịch Pending cuối ngày", sev: "Critical" },
  ] },
  { name: "Fixed", cards: [
    { key: "RECON-4390", title: "SUM group theo chi nhánh thiếu chi nhánh null", sev: "High" },
  ] },
  { name: "Closed", cards: [
    { key: "RECON-4375", title: "Trùng lặp giao dịch khi ETL retry batch EOD", sev: "Medium" },
  ] },
]);

// ── Mockup 7: dashboard chỉ số đối soát 30 ngày ──
const m_dash = dashboard("Chỉ số đối soát — TrustBank PayGate · 30 kỳ gần nhất", [
  { label: "Kỳ đối soát đã chạy", value: "30/30", sub: "đúng lịch batch EOD", color: "#2563eb" },
  { label: "Tỷ lệ khớp tự động", value: "99,4%", sub: "GL = TXN = RPT", color: "#16a34a" },
  { label: "Lệch cần điều tra", value: "7", sub: "~0,6% số kỳ đối soát", color: "#e11d48" },
  { label: "Do cutoff/múi giờ", value: "4/7", sub: "nhóm nguyên nhân lớn nhất", color: "#7c3aed" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử đối soát dữ liệu (reconciliation testing) là gì?",
  "What is reconciliation testing?",
  "Kiểm thử đối soát là việc xác nhận số liệu giữa nhiều nguồn độc lập — sổ cái (GL), nhật ký giao dịch (TXN), báo cáo tổng hợp (RPT) — khớp nhau về số lượng, giá trị và trạng thái tại cùng một mốc thời gian. Mọi khoản chênh lệch phải có nguyên nhân giải trình được (ví dụ giao dịch đang xử lý), chứ không phải lỗi hệ thống âm thầm làm mất hoặc nhân đôi dữ liệu.",
  "Reconciliation testing confirms that figures across multiple independent sources — the general ledger (GL), transaction log (TXN), and summary report (RPT) — match in count, value, and status at the same point in time. Every discrepancy must have an explainable cause (e.g. a transaction still processing), not a silent system bug that drops or duplicates data.",
  "kiểm thử đối soát dữ liệu（reconciliation testing）とは何？",
  "対照テスト（リコンサイル・テスト）とは、総勘定元帳（GL）、取引ログ（TXN）、集計レポート（RPT）という複数の独立した情報源の間で、同じ時点における件数・金額・状態が一致しているかを確認するテストです。すべての差異には説明可能な理由（処理中の取引など）が必要であり、データを黙って欠落・重複させるシステムバグであってはなりません。");
const faq2 = FAQ(
  "Vì sao báo cáo tài chính vẫn lệch dù không có bug hiển thị rõ trên giao diện?",
  "Why do financial reports still mismatch even with no obvious UI bug?",
  "Vì phần lớn lỗi đối soát nằm ở tầng dữ liệu, không phải giao diện: batch cắt lô theo giờ server thay vì giờ nghiệp vụ, làm tròn không nhất quán giữa các service, hay GROUP BY thiếu điều kiện null. Những lỗi này không gây crash hay hiển thị sai — chúng chỉ lộ ra khi tester chủ động so khớp số liệu giữa nhiều nguồn tại cùng mốc thời gian.",
  "Because most reconciliation bugs live in the data layer, not the UI: batch jobs cutting off by server time instead of business time, inconsistent rounding across services, or a GROUP BY missing a null condition. These bugs don't crash or misrender anything — they only surface when a tester actively cross-checks figures across multiple sources at the same point in time.",
  "画面に明らかなバグがなくても財務レポートがずれる理由は？",
  "対照テストのバグの大半は画面ではなくデータ層にあるからです。業務時間ではなくサーバー時刻でバッチを区切る、サービス間で端数処理が一致しない、GROUP BYにNULL条件が抜けているなど。これらはクラッシュや表示崩れを起こさず、テスターが複数の情報源の数値を同じ時点で突き合わせて初めて表面化します。");
const faq3 = FAQ(
  "Nên kiểm thử làm tròn số & tỷ giá cho hệ ngân hàng ra sao?",
  "How should rounding and exchange-rate logic be tested for a banking system?",
  "Trước tiên xác định rõ quy tắc làm tròn nghiệp vụ đang áp dụng (banker's rounding, round-half-up...), rồi thiết kế ca kiểm thử đúng tại biên .5. Kiểm tra tính nhất quán giữa tầng lưu trữ (giữ đủ số thập phân) và tầng hiển thị (làm tròn để show), đồng thời luôn đối chiếu tổng các dòng đã làm tròn với tổng toàn cục tính từ số gốc chưa làm tròn.",
  "First, pin down which business rounding rule applies (banker's rounding, round-half-up...), then design test cases exactly at the .5 boundary. Check consistency between the storage layer (keeps full decimal precision) and the display layer (rounds for showing), and always cross-check the sum of rounded rows against the global total computed from unrounded raw values.",
  "銀行システムの端数処理・為替レートはどうテストすべき？",
  "まず採用されている業務上の端数処理ルール（銀行家の丸め、四捨五入など）を明確にし、.5の境界値で正確にテストケースを設計します。保存層（小数点以下を完全に保持）と表示層（表示用に丸める）の整合性を確認し、丸め後の各行の合計と、丸める前の元の値から計算したグローバル合計を必ず突き合わせます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử đối soát dữ liệu (reconciliation testing) tập trung xác nhận điều gì?", en: "What does reconciliation testing focus on confirming?", ja: "対照テスト（reconciliation testing）は何を確認することに重点を置く？" },
    options: [
      { vi: "Giao diện báo cáo hiển thị đẹp, đúng font chữ", en: "That the report UI looks nice with the right font", ja: "レポート画面が見た目よくフォントが正しいこと" },
      { vi: "Số liệu giữa nhiều nguồn (sổ cái, giao dịch, báo cáo) khớp nhau và mọi lệch đều có lý do giải trình được", en: "Figures across multiple sources (ledger, transactions, report) match and every discrepancy has an explainable cause", ja: "複数の情報源（元帳、取引、レポート）の数値が一致し、すべての差異に説明可能な理由があること" },
      { vi: "Tốc độ tải trang báo cáo", en: "The load speed of the report page", ja: "レポートページの読み込み速度" },
      { vi: "Chỉ kiểm tra chính tả trên báo cáo", en: "Only checking spelling on the report", ja: "レポートのスペルチェックのみ" },
    ], correct: 1,
    explain: { vi: "Trọng tâm của đối soát là xác nhận số lượng/giá trị/trạng thái khớp giữa các nguồn độc lập tại cùng mốc thời gian, mọi lệch phải giải trình được.", en: "Reconciliation's core focus is confirming count/value/status match across independent sources at the same time, with every gap explainable.", ja: "対照テストの核心は、独立した情報源間で同じ時点における件数・金額・状態が一致し、すべての差異が説明できることを確認することです。" },
  }),
  mcq({
    q: { vi: "Một nguyên nhân phổ biến gây lệch báo cáo tổng hợp so với sổ cái là gì?", en: "What is a common cause of a summary report mismatching the ledger?", ja: "集計レポートが元帳とずれる一般的な原因は？" },
    options: [
      { vi: "Batch ETL cắt lô theo giờ SERVER thay vì giờ NGHIỆP VỤ, làm rơi giao dịch cuối ngày sai kỳ", en: "An ETL batch cuts off by SERVER time instead of BUSINESS time, dropping end-of-day transactions into the wrong period", ja: "ETLバッチが業務時刻ではなくサーバー時刻で区切り、日末の取引が誤った期間に落ちる" },
      { vi: "Người dùng đổi màu giao diện báo cáo", en: "A user changes the report's UI color theme", ja: "ユーザーがレポート画面の配色を変える" },
      { vi: "Font chữ trên báo cáo không đúng chuẩn thương hiệu", en: "The report's font doesn't match brand guidelines", ja: "レポートのフォントがブランド規定に合っていない" },
      { vi: "Số lượng cột trong bảng báo cáo quá nhiều", en: "The report table has too many columns", ja: "レポート表の列数が多すぎる" },
    ], correct: 0,
    explain: { vi: "Cắt lô (cutoff) theo giờ server thay vì giờ nghiệp vụ là nguyên nhân kinh điển khiến giao dịch sát mốc nửa đêm bị xếp nhầm kỳ, gây lệch giữa RPT và GL.", en: "Cutting off by server time instead of business time is a classic cause of near-midnight transactions landing in the wrong period, mismatching RPT vs GL.", ja: "業務時刻ではなくサーバー時刻でカットオフすることは、深夜付近の取引が誤った期間に入りRPTとGLがずれる典型的な原因です。" },
  }),
  mcq({
    q: { vi: "Khi kiểm thử làm tròn phí giao dịch ở mức .5, tester nên làm gì trước tiên?", en: "When testing fee rounding at the .5 boundary, what should a tester do first?", ja: "手数料の端数処理を.5の境界でテストする際、テスターがまず行うべきことは？" },
    options: [
      { vi: "Random chọn vài số bất kỳ rồi so kết quả", en: "Randomly pick a few numbers and compare results", ja: "適当な数値をいくつか選んで結果を比較する" },
      { vi: "Chỉ test số nguyên, bỏ qua toàn bộ số thập phân", en: "Only test integers, skip all decimal values entirely", ja: "整数だけをテストし、小数はすべて省略する" },
      { vi: "Xác định đúng quy tắc làm tròn nghiệp vụ (vd banker's rounding) rồi thiết kế ca kiểm thử đúng tại biên .5", en: "Pin down the correct business rounding rule (e.g. banker's rounding) then design test cases exactly at the .5 boundary", ja: "業務上の正しい端数処理ルール（例：銀行家の丸め）を明確にし、.5の境界で正確にテストケースを設計する" },
      { vi: "Không cần test vì hệ thống luôn tự làm tròn đúng", en: "No need to test since the system always rounds correctly by default", ja: "システムは常に正しく丸めるためテストは不要である" },
    ], correct: 2,
    explain: { vi: "Phải biết rõ quy tắc làm tròn nghiệp vụ trước, vì các quy tắc (round-half-up, banker's rounding...) cho kết quả KHÁC nhau đúng tại biên .5.", en: "The business rounding rule must be known first, because different rules (round-half-up, banker's rounding...) give DIFFERENT results exactly at the .5 boundary.", ja: "端数処理ルール（四捨五入、銀行家の丸めなど）は.5の境界で異なる結果を出すため、事前にルールを正確に把握する必要があります。" },
  }),
  mcq({
    q: { vi: "Vì sao dữ liệu cuối ngày/cuối kỳ (EOD/EOM) và múi giờ lại là điểm rủi ro cao trong đối soát?", en: "Why are end-of-day/end-of-month (EOD/EOM) data and timezones high-risk points in reconciliation?", ja: "日末・月末（EOD/EOM）データとタイムゾーンが対照テストにおいて高リスクな理由は？" },
    options: [
      { vi: "Vì đó là lúc hệ thống chạy chậm nhất trong ngày", en: "Because that's when the system runs slowest during the day", ja: "その時間帯はシステムの動作が最も遅いから" },
      { vi: "Vì một giao dịch xảy ra sát mốc cắt ngày có thể bị tính vào kỳ báo cáo sai nếu múi giờ/điểm cutoff không thống nhất giữa các hệ", en: "Because a transaction near the day-cutoff can be counted into the wrong reporting period if timezone/cutoff points aren't consistent across systems", ja: "日付の区切り付近で発生した取引は、システム間でタイムゾーンやカットオフ地点が統一されていないと誤った報告期間に計上され得るから" },
      { vi: "Vì batch EOD chỉ chạy vào cuối tuần", en: "Because the EOD batch only runs on weekends", ja: "EODバッチは週末にしか実行されないから" },
      { vi: "Vì múi giờ không liên quan gì tới số liệu tài chính", en: "Because timezones have nothing to do with financial figures", ja: "タイムゾーンは財務データと無関係だから" },
    ], correct: 1,
    explain: { vi: "Mốc cắt ngày (business day cutoff) phải nhất quán giữa mọi hệ; nếu không, giao dịch sát nửa đêm dễ 'rơi' sang kỳ báo cáo sai, gây lệch tổng.", en: "The business-day cutoff must be consistent across every system; otherwise near-midnight transactions easily fall into the wrong reporting period, causing total mismatches.", ja: "業務日のカットオフはすべてのシステムで一貫している必要があります。そうでなければ深夜付近の取引が誤った報告期間に『落ち』、合計がずれます。" },
  }),
  mcq({
    q: { vi: "Khi kiểm thử tổng theo nhóm (group-by) chi nhánh trong báo cáo, điều quan trọng cần xác nhận là gì?", en: "When testing a report's group-by (by branch) totals, what's important to confirm?", ja: "レポートの支店別グループ集計（group-by）をテストする際、確認すべき重要な点は？" },
    options: [
      { vi: "Giao diện hiển thị đúng số lượng cột", en: "That the UI shows the correct number of columns", ja: "画面の列数が正しいこと" },
      { vi: "Tổng từng nhóm cộng lại đúng bằng tổng toàn hệ thống, không có bản ghi bị rơi vào nhóm null/orphan", en: "That the sum of each group adds up exactly to the system-wide total, with no records falling into a null/orphan group", ja: "各グループの合計を足し合わせるとシステム全体の合計と一致し、null・孤立グループに落ちる記録がないこと" },
      { vi: "Tên chi nhánh được sắp xếp theo alphabet", en: "That branch names are sorted alphabetically", ja: "支店名がアルファベット順に並んでいること" },
      { vi: "Chỉ cần tổng toàn hệ thống đúng, từng nhóm không quan trọng", en: "Only the system-wide total needs to be correct; individual groups don't matter", ja: "システム全体の合計さえ正しければ、各グループは重要ではない" },
    ], correct: 1,
    explain: { vi: "Lỗi kinh điển của GROUP BY là bỏ sót bản ghi có khóa nhóm NULL/không xác định — tổng từng nhóm cộng lại phải khớp tuyệt đối với tổng toàn cục.", en: "A classic GROUP BY bug is dropping records with a NULL/unmapped group key — the sum of all groups must exactly match the global total.", ja: "GROUP BYの典型的なバグは、グループキーがNULL/未定義のレコードを取りこぼすことです。全グループの合計はグローバル合計と厳密に一致しなければなりません。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bức tranh hệ thống đối soát", en: "1. TL;DR & the reconciliation system at a glance", ja: "1. 要点と対照システムの全体像" },
    blocks: [
      TLDR("Kiểm thử đối soát (reconciliation testing) là việc xác nhận số liệu giữa 3 nguồn — sổ cái (GL), nhật ký giao dịch (TXN), báo cáo tổng hợp (RPT) — khớp nhau tại cùng mốc thời gian trên hệ báo cáo tài chính & đối soát cổng thanh toán TrustBank PayGate. Bài tập trung vào các điểm rủi ro nâng cao: sai lệch làm tròn/tỷ giá, lọc/nhóm/tổng cộng, dữ liệu cuối ngày/cuối kỳ (EOD/EOM) và múi giờ báo cáo. Có 2 tình huống thật, nhiều mockup và trắc nghiệm cuối bài.",
        "Reconciliation testing confirms figures match across three sources — the ledger (GL), transaction log (TXN), and summary report (RPT) — at the same point in time, on TrustBank PayGate's financial reporting & payment-gateway reconciliation system. This article dives into advanced risk points: rounding/exchange-rate discrepancies, filter/group/sum logic, end-of-day/end-of-month (EOD/EOM) data, and reporting timezones. Two real situations, many mockups, and a quiz at the end.",
        "対照テスト（reconciliation testing）とは、TrustBank PayGateの財務レポート・決済ゲートウェイ対照システムにおいて、総勘定元帳（GL）、取引ログ（TXN）、集計レポート（RPT）という3つの情報源の数値が同じ時点で一致するかを確認する手法です。本記事は端数処理・為替レートのずれ、フィルタ・グループ化・合計処理、日末・月末（EOD/EOM）データ、レポートのタイムゾーンといった上級リスクに焦点を当てます。実際のシーン2件、多数のモック、最後にクイズ付き。"),
      P("Bạn đang ở cấp độ nâng cao — bài này giả định bạn đã vững kiểm thử chức năng cơ bản và muốn đi sâu vào một mảng dễ bị đánh giá thấp nhưng lại gây thiệt hại lớn nhất khi sai: kiểm thử số liệu tài chính tổng hợp. Dự án xuyên suốt là TrustBank PayGate — hệ thống báo cáo tài chính và đối soát giao dịch của một cổng thanh toán ngân hàng, nơi mỗi ngày có hàng chục nghìn giao dịch chảy qua ba tầng dữ liệu khác nhau trước khi lên báo cáo cuối cùng gửi Ban điều hành.",
        "You're at an advanced level — this article assumes you're solid on basic functional testing and want to go deep into an area that's easy to underrate but causes the most damage when wrong: testing aggregated financial figures. The running project is TrustBank PayGate — a banking payment gateway's financial reporting and transaction reconciliation system, where tens of thousands of transactions flow through three different data layers every day before reaching the final report sent to executives.",
        "本記事は上級レベル向けです。基本的な機能テストは習得済みで、軽視されがちながら誤りが起きた際の被害が最も大きい領域——集計された財務データのテスト——を深く学びたい方を想定しています。題材はTrustBank PayGate：銀行の決済ゲートウェイにおける財務レポートと取引対照のシステムで、毎日数万件の取引が3つの異なるデータ層を通過し、最終的に経営陣に送られるレポートへと集約されます。"),
      IMG(m_recon3, "Đối soát 3 nguồn số liệu cuối ngày: sổ cái, nhật ký giao dịch và báo cáo tổng hợp TrustBank PayGate", "End-of-day 3-source reconciliation: ledger, transaction log, and TrustBank PayGate's summary report", "日末の3情報源対照：元帳、取引ログ、TrustBank PayGateの集計レポート"),
      DEF("Reconciliation Testing", "kiểm thử xác nhận số liệu (số lượng, giá trị, trạng thái) khớp nhau giữa nhiều nguồn dữ liệu độc lập tại cùng mốc thời gian, mọi lệch phải có nguyên nhân giải trình được.",
        "testing that confirms figures (count, value, status) match across multiple independent data sources at the same point in time, with every discrepancy explainable.",
        "複数の独立したデータソース間で、同じ時点における件数・金額・状態が一致するかを確認し、すべての差異に説明可能な理由があることを検証するテスト手法。"),
    ] },
  { heading: { vi: "2. Đối soát là gì & vì sao khó ở hệ ngân hàng", en: "2. What reconciliation is & why it's hard for banking systems", ja: "2. 対照テストとは、なぜ銀行システムで難しいのか" },
    blocks: [
      P("Ở một hệ e-commerce đơn giản, 'đúng' thường nghĩa là giao diện hiển thị số liệu như mong đợi. Ở hệ ngân hàng, 'đúng' phức tạp hơn nhiều: cùng một tập giao dịch phải cho ra CÙNG một kết quả dù bạn nhìn từ Core Banking (sổ cái), từ cổng thanh toán (nhật ký giao dịch), hay từ báo cáo tổng hợp gửi lên Ban điều hành. Ba hệ này thường do ba đội khác nhau xây, cập nhật ở tần suất khác nhau, và có thể lệch nhau vài giây tới vài phút — đó chính là gốc rễ của phần lớn lỗi đối soát.",
        "In a simple e-commerce system, 'correct' usually means the UI shows the expected numbers. In banking, 'correct' is far more demanding: the same set of transactions must yield the SAME result whether you look from Core Banking (the ledger), from the payment gateway (transaction log), or from the summary report sent to executives. These three systems are typically built by three different teams, update at different frequencies, and can drift by seconds to minutes — the root of most reconciliation bugs.",
        "単純なECシステムでは『正しい』とは通常、画面が期待どおりの数値を表示することを意味します。銀行システムでは『正しい』の意味ははるかに厳格です：同じ取引集合が、コアバンキング（元帳）から見ても、決済ゲートウェイ（取引ログ）から見ても、経営陣に送られる集計レポートから見ても同じ結果を出さなければなりません。この3つのシステムは通常異なるチームが構築し、更新頻度も異なり、数秒〜数分のズレが生じ得ます——これが対照テストのバグの大半の根本原因です。"),
      P("Ba nguồn dữ liệu kinh điển bạn phải nắm rõ vai trò: (1) Sổ cái (General Ledger — GL) là nguồn 'sự thật cuối cùng' về tài chính, do Core Banking ghi nhận sau khi hạch toán; (2) Nhật ký giao dịch (Transaction Log — TXN) ghi mọi sự kiện xảy ra ở cổng thanh toán, kể cả giao dịch đang xử lý (Pending) chưa hạch toán; (3) Báo cáo tổng hợp (Report — RPT) là kết quả tổng hợp cuối cùng, thường qua một tầng ETL/kho dữ liệu trung gian. Đối soát chính là công việc chứng minh ba nguồn này 'kể cùng một câu chuyện' tại một mốc thời gian xác định.",
        "There are three classic data sources you must understand the role of: (1) the General Ledger (GL) is the ultimate financial 'source of truth', recorded by Core Banking after posting; (2) the Transaction Log (TXN) records every event at the payment gateway, including still-processing (Pending) transactions not yet posted; (3) the Report (RPT) is the final aggregated result, usually passing through an intermediate ETL/data-warehouse layer. Reconciliation is the work of proving these three sources 'tell the same story' at a defined point in time.",
        "理解すべき3つの典型的な情報源があります：（1）総勘定元帳（GL）は計上後にコアバンキングが記録する財務の『最終的な真実』、（2）取引ログ（TXN）は決済ゲートウェイで発生するあらゆるイベントを記録し、未計上の処理中（Pending）取引も含む、（3）レポート（RPT）は中間のETL/データウェアハウス層を経る最終集計結果です。対照テストとは、この3つの情報源が特定の時点で『同じ物語を語る』ことを証明する作業です。"),
      P("Vì sao khó? Vì lệch có thể tới từ RẤT nhiều tầng: độ trễ đồng bộ giữa các hệ, quy tắc làm tròn khác nhau ở mỗi service, cách xử lý giao dịch đang treo (Pending/Reversal) không thống nhất, và mốc cắt ngày (cutoff) không đồng nhất về múi giờ. Một tester giỏi đối soát không chỉ so hai con số cuối — họ hiểu được TỪNG TẦNG dữ liệu đi qua để khoanh vùng đúng nơi gây lệch, thay vì báo chung chung 'số liệu sai'.",
        "Why is it hard? Because a mismatch can come from MANY layers: sync delay between systems, different rounding rules per service, inconsistent handling of pending/reversed transactions, and inconsistent day-cutoff timezones. A skilled reconciliation tester doesn't just compare two final numbers — they understand EACH data layer transactions pass through, so they can pinpoint exactly where a mismatch originates instead of vaguely reporting 'wrong figures'.",
        "なぜ難しいのか。ズレは非常に多くの層から生じ得るからです：システム間の同期遅延、サービスごとに異なる端数処理ルール、保留中・取消取引の一貫しない扱い、タイムゾーンが統一されていない日付カットオフ。優れた対照テスターは最終的な2つの数値を比較するだけでなく、取引が通過する各データ層を理解し、『数値が違う』と漠然と報告するのではなく、ズレの発生源を正確に特定します。"),
    ] },
  { heading: { vi: "3. Kiến trúc luồng dữ liệu đối soát", en: "3. Reconciliation data-flow architecture", ja: "3. 対照データフローのアーキテクチャ" },
    blocks: [
      P("Trước khi viết ca kiểm thử, hãy vẽ ra luồng dữ liệu thật của hệ thống — đây là bước nhiều tester nâng cao bỏ qua vì tưởng 'ai cũng biết'. Ở TrustBank PayGate, giao dịch đi qua bốn tầng: Core Banking ghi sổ cái gần như tức thời, Cổng thanh toán ghi nhật ký giao dịch, một tiến trình ETL đẩy dữ liệu vào Kho dữ liệu theo lô mỗi 15 phút, và cuối cùng Report Engine tổng hợp báo cáo lúc 23:59 mỗi ngày (giờ nghiệp vụ GMT+7).",
        "Before writing test cases, map out the system's real data flow — a step many advanced testers skip, assuming 'everyone already knows it'. At TrustBank PayGate, a transaction passes through four layers: Core Banking posts the ledger almost instantly, the Payment Gateway logs the transaction, an ETL process pushes data into the Data Warehouse in 15-minute batches, and finally the Report Engine aggregates the report at 23:59 daily (business time, GMT+7).",
        "テストケースを書く前に、システムの実際のデータフローを図示しましょう——多くの上級テスターが『誰でも知っている』と思い込んで省略するステップです。TrustBank PayGateでは、取引は4つの層を通過します：コアバンキングがほぼ即座に元帳へ計上し、決済ゲートウェイが取引をログに記録し、ETLプロセスが15分ごとのバッチでデータウェアハウスへ送り、最後にレポートエンジンが毎日23:59（業務時刻GMT+7）にレポートを集計します。"),
      IMG(m_flow, "Luồng dữ liệu đối soát TrustBank PayGate: Core Banking → Cổng thanh toán → Kho dữ liệu → Report Engine, cạnh nét đứt đỏ là điểm trễ đồng bộ gây lệch tạm thời", "TrustBank PayGate reconciliation data flow: Core Banking → Payment Gateway → Data Warehouse → Report Engine; the red dashed edge is the sync-delay point causing temporary mismatches", "TrustBank PayGateの対照データフロー：コアバンキング→決済ゲートウェイ→データウェアハウス→レポートエンジン。赤い破線は一時的なずれを生む同期遅延ポイント"),
      P("Điểm mấu chốt: mỗi tầng có ĐỘ TRỄ khác nhau. Nếu bạn đối soát ngay tại thời điểm chưa hết chu kỳ ETL 15 phút, RPT sẽ luôn 'chậm' hơn TXN một chút — đó là lệch TẠM THỜI, bình thường, không phải bug. Ngược lại, nếu sau khi tất cả các batch đã chạy xong (ví dụ sau 00:30 hôm sau) mà vẫn còn lệch, đó mới là lệch THỰC SỰ cần điều tra. Phân biệt được hai loại lệch này là kỹ năng nền tảng của kiểm thử đối soát nâng cao.",
        "The key point: each layer has a different LAG. If you reconcile before the 15-minute ETL cycle completes, RPT will always look slightly 'behind' TXN — that's a TEMPORARY, normal mismatch, not a bug. Conversely, if a mismatch remains after all batches have finished (e.g. after 00:30 the next day), that's a REAL mismatch worth investigating. Telling these two apart is a foundational skill of advanced reconciliation testing.",
        "重要な点は、各層で遅延の度合いが異なることです。15分のETLサイクルが完了する前に対照を行うと、RPTは常にTXNより少し『遅れて』見えます——これは一時的で正常なズレであり、バグではありません。逆に、すべてのバッチが完了した後（例えば翌日00:30以降）もズレが残っている場合は、調査すべき本当のズレです。この2種類のズレを区別できることが、上級対照テストの基礎的なスキルです。"),
      CODE("sql", "-- Truy vấn đối soát mẫu: so khớp GL vs TXN theo ngày nghiệp vụ (GMT+7)\nSELECT\n  DATE(gl.posted_at AT TIME ZONE 'Asia/Ho_Chi_Minh') AS business_day,\n  COUNT(gl.txn_id)  AS gl_count,\n  COUNT(t.txn_id)   AS txn_count,\n  SUM(gl.amount)    AS gl_total,\n  SUM(t.amount)     AS txn_total\nFROM ledger gl\nFULL OUTER JOIN transaction_log t ON gl.txn_id = t.txn_id\nWHERE gl.status <> 'PENDING'\nGROUP BY 1\nHAVING COUNT(gl.txn_id) <> COUNT(t.txn_id)\n    OR SUM(gl.amount) <> SUM(t.amount);\n-- Dòng trả về = ngày có lệch cần điều tra tiếp."),
    ] },
  { heading: { vi: "4. Sai lệch làm tròn & tỷ giá — kỹ thuật kiểm thử", en: "4. Rounding & exchange-rate discrepancies — testing technique", ja: "4. 端数処理と為替レートのずれ — テスト技法" },
    blocks: [
      P("Làm tròn là nguồn lỗi âm thầm nguy hiểm nhất trong hệ ngân hàng: từng khoản lệch có thể chỉ 1 đồng, nhưng nhân với hàng chục nghìn giao dịch/ngày sẽ tích lũy thành số tiền đáng kể lộ ra ở báo cáo tổng. Bước đầu tiên KHÔNG phải là viết ca kiểm thử — mà là hỏi rõ đội phát triển/nghiệp vụ: hệ thống đang dùng quy tắc làm tròn nào? Round-half-up (làm tròn .5 lên), round-half-even/banker's rounding (làm tròn .5 về số chẵn gần nhất), hay truncate (cắt bỏ, không làm tròn)?",
        "Rounding is the most dangerously silent source of error in banking systems: each individual discrepancy might be just 1 đồng, but multiplied across tens of thousands of transactions per day it accumulates into a noticeable amount that surfaces in the aggregate report. The first step is NOT writing test cases — it's asking the dev/business team clearly: which rounding rule is in use? Round-half-up, round-half-even/banker's rounding, or truncate (no rounding, just cut off)?",
        "端数処理は銀行システムにおいて最も危険な、目立たないエラー源です。個々のズレはわずか1ドンかもしれませんが、1日数万件の取引に乗じると、集計レポートに顕在化する無視できない金額になります。最初のステップはテストケースを書くことではなく、開発・業務チームに明確に確認することです：どの端数処理ルールを採用しているか？四捨五入（round-half-up）、銀行家の丸め（round-half-even）、それとも切り捨て（truncate）か？"),
      STEP(1, "Xác nhận quy tắc làm tròn nghiệp vụ chính thức (round-half-up / banker's rounding / truncate) và đơn vị làm tròn (đồng, xu, %) — hỏi BA (Business Analyst), đừng đoán.", "Confirm the official business rounding rule (round-half-up / banker's rounding / truncate) and the rounding unit (đồng, cent, %) — ask the BA, don't guess.", "業務上の正式な端数処理ルール（四捨五入／銀行家の丸め／切り捨て）と丸め単位（ドン、セント、％）をBA（ビジネスアナリスト）に確認する。推測しない。"),
      STEP(2, "Thiết kế input đúng tại biên .5 của đơn vị làm tròn nhỏ nhất, ví dụ phí = 2.499,5đ và 2.500,5đ, để phân biệt các quy tắc cho kết quả khác nhau.", "Design inputs exactly at the .5 boundary of the smallest rounding unit, e.g. fee = 2,499.5đ and 2,500.5đ, to distinguish rules that produce different results.", "最小丸め単位の.5境界（例：手数料＝2,499.5ドン、2,500.5ドン）で入力値を設計し、ルールごとに異なる結果を区別する。"),
      STEP(3, "So khớp giá trị làm tròn ở CẢ BA tầng (GL/TXN/RPT) — nếu chỉ một tầng làm tròn còn hai tầng kia giữ số thập phân đầy đủ, tổng cộng dồn sẽ lệch dần theo thời gian.", "Cross-check the rounded value across ALL THREE layers (GL/TXN/RPT) — if only one layer rounds while the other two keep full decimals, the running total will drift over time.", "3つの層（GL/TXN/RPT）すべてで丸め後の値を突き合わせる。1つの層だけが丸め、他の2層が小数を完全に保持していると、累積合計が時間とともにずれていく。"),
      STEP(4, "Kiểm thử tỷ giá quy đổi ngoại tệ: nhập tỷ giá có nhiều số thập phân (vd 25.482,368421 VND/USD), xác nhận số tiền quy đổi và tổng cộng vẫn khớp dù hiển thị đã làm tròn.", "Test the currency exchange rate: enter a rate with many decimals (e.g. 25,482.368421 VND/USD), confirm the converted amount and total still match even though the display is rounded.", "為替レート変換をテストする：小数点以下の桁数が多いレート（例：25,482.368421 VND/USD）を入力し、表示が丸められていても換算額と合計が一致することを確認する。"),
      IMG(m_testcases, "Bảng ca kiểm thử tổng cộng / nhóm / làm tròn số liệu — TrustBank PayGate", "Sum/group/rounding test-case table — TrustBank PayGate", "合計・グループ化・端数処理のテストケース表 — TrustBank PayGate"),
      TIP("Luôn có 1 nguồn 'sự thật gốc' giữ đủ số thập phân (thường là GL) để đối chiếu — đừng bao giờ so hai con số ĐÃ làm tròn với nhau, vì sai số làm tròn có thể tự triệt tiêu và che giấu bug thật.", "Always keep one 'raw source of truth' with full decimal precision (usually the GL) for comparison — never compare two ALREADY-rounded numbers, since rounding errors can cancel each other out and hide a real bug.", "常に完全な小数精度を持つ『生の正解データ』（通常はGL）を比較対象として保持する。すでに丸められた2つの数値同士を比較してはいけない。丸め誤差が互いに打ち消し合い、本当のバグを隠してしまう可能性があるからです。"),
    ] },
  { heading: { vi: "5. Lọc / nhóm / tổng cộng — ca kiểm thử báo cáo tài chính", en: "5. Filter / group / sum — financial report test cases", ja: "5. フィルタ・グループ化・合計 — 財務レポートのテストケース" },
    blocks: [
      P("Báo cáo tổng hợp gần như luôn có ba thao tác lồng nhau: LỌC (theo ngày, chi nhánh, loại giao dịch), NHÓM (group-by chi nhánh, loại tiền tệ, kênh) rồi TỔNG CỘNG (sum/count trên từng nhóm và tổng toàn cục). Lỗi thường ẩn ở đúng điểm giao giữa ba thao tác này: một điều kiện lọc vô tình loại luôn một nhóm giao dịch hợp lệ, hoặc phép nhóm bỏ sót bản ghi có khóa null khiến tổng từng nhóm cộng lại KHÔNG bằng tổng toàn cục hiển thị riêng.",
        "A summary report almost always has three nested operations: FILTER (by date, branch, transaction type), GROUP (by branch, currency, channel), then SUM (aggregate per group and globally). Bugs usually hide right at the intersection of these three: a filter condition accidentally excludes an entire valid group of transactions, or a grouping operation drops null-key records so the sum of all groups doesn't equal the separately displayed global total.",
        "集計レポートにはほぼ常に3つの入れ子になった操作があります：フィルタ（日付・支店・取引種別）、グループ化（支店・通貨・チャネル別）、そして合計（グループごとおよびグローバルな集計）。バグは通常この3つが交差する場所に隠れています：フィルタ条件が誤って有効な取引グループ全体を除外してしまう、またはグループ化処理がNULLキーのレコードを取りこぼし、各グループの合計を足し合わせても別途表示されるグローバル合計と一致しなくなる、などです。"),
      IMG(m_report, "Màn báo cáo tài chính TrustBank PayGate, khoanh vùng các ô lệch so với sổ cái (giao dịch Pending bị bỏ, Reversal thiếu 2)", "TrustBank PayGate financial report screen, annotated with cells mismatching the ledger (dropped Pending transactions, 2 missing Reversals)", "TrustBank PayGate財務レポート画面。元帳とずれているセルに注釈（Pending取引の欠落、Reversal2件の不足）"),
      P("Một kỹ thuật rất hiệu quả ở cấp độ nâng cao là 'kiểm thử tổng chéo' (cross-total check): tính tổng toàn cục theo hai đường độc lập — (a) SUM trực tiếp trên toàn bộ tập dữ liệu chưa lọc/nhóm, và (b) cộng dồn tổng của từng nhóm sau khi đã lọc/nhóm — rồi so hai kết quả này với nhau. Nếu (a) ≠ (b), chắc chắn có bản ghi bị 'lạc' đâu đó trong bước lọc hoặc nhóm, dù từng nhóm riêng lẻ trông vẫn hợp lý.",
        "A very effective advanced technique is the 'cross-total check': compute the global total two independent ways — (a) a direct SUM over the entire unfiltered/ungrouped dataset, and (b) summing up each group's total after filtering/grouping — then compare the two results. If (a) ≠ (b), some record has definitely gotten 'lost' somewhere in the filter or group step, even if each individual group still looks reasonable.",
        "上級レベルで非常に効果的な技法が『クロス合計チェック』です。グローバル合計を2つの独立した方法で計算します——（a）フィルタ・グループ化前の全データセットに対する直接SUM、（b）フィルタ・グループ化後の各グループの合計を積み上げたもの——そしてこの2つの結果を比較します。（a）≠（b）であれば、各グループ単体は妥当に見えても、フィルタまたはグループ化のどこかでレコードが『迷子』になっていることが確実です。"),
      P("Cũng cần kiểm thử riêng các bộ lọc TỔ HỢP — ví dụ lọc theo (chi nhánh = HN01) VÀ (loại tiền = USD) VÀ (khoảng ngày) cùng lúc — vì mỗi điều kiện có thể đúng riêng lẻ nhưng sai khi kết hợp (ví dụ điều kiện ngày dùng kiểu so sánh chuỗi thay vì kiểu ngày, khiến '2026-07-02' bị coi là nhỏ hơn '2026-07-10' về mặt string nhưng vẫn đúng về mặt số — trường hợp này ít lộ bug, nhưng ngược lại khi có định dạng ngày khác nhau giữa các tầng thì rất dễ sai).",
        "Combined filters also need dedicated testing — e.g. filtering by (branch = HN01) AND (currency = USD) AND (date range) simultaneously — because each condition may be correct alone but wrong when combined (e.g. a date condition using string comparison instead of date type, which can accidentally still work for well-formed strings but breaks badly the moment date formats differ across layers).",
        "組み合わせフィルタも個別にテストする必要があります——例えば（支店＝HN01）かつ（通貨＝USD）かつ（期間）を同時に適用する場合。各条件は単独では正しくても、組み合わせると誤ることがあるためです（例：日付条件が日付型ではなく文字列比較を使っている場合、整形された文字列では偶然動作することもありますが、層ごとに日付フォーマットが異なると簡単に破綻します）。"),
    ] },
  { heading: { vi: "6. Dữ liệu cuối ngày/cuối kỳ (EOD/EOM) & múi giờ báo cáo", en: "6. End-of-day/end-of-month data (EOD/EOM) & reporting timezones", ja: "6. 日末・月末（EOD/EOM）データとレポートのタイムゾーン" },
    blocks: [
      P("Mốc cắt ngày nghiệp vụ (business day cutoff) là một trong những khái niệm quan trọng nhất mà tester đối soát phải hiểu tường tận. Nó KHÔNG nhất thiết trùng với nửa đêm theo giờ hệ thống lưu trữ (thường là UTC). TrustBank PayGate quy định ngày nghiệp vụ kết thúc lúc 23:59:59 giờ Việt Nam (GMT+7) — nghĩa là một giao dịch diễn ra lúc 23:59:30 GMT+7 (tức 16:59:30 UTC) phải được tính vào ngày hôm đó, dù server lưu timestamp dạng UTC.",
        "The business-day cutoff is one of the most important concepts a reconciliation tester must fully grasp. It does NOT necessarily coincide with midnight in the storage system's timezone (usually UTC). TrustBank PayGate defines the business day as ending at 23:59:59 Vietnam time (GMT+7) — meaning a transaction at 23:59:30 GMT+7 (i.e. 16:59:30 UTC) must be counted into that day, even though the server stores timestamps in UTC.",
        "業務日のカットオフは、対照テスターが完全に理解しておくべき最も重要な概念の一つです。これは必ずしも保存システムのタイムゾーン（通常UTC）における深夜と一致するわけではありません。TrustBank PayGateでは業務日をベトナム時間（GMT+7）の23:59:59に終わると定義しています——つまりGMT+7の23:59:30（UTCでは16:59:30）に発生した取引は、サーバーがUTCでタイムスタンプを保存していても、その日に計上されなければなりません。"),
      P("Rủi ro tăng gấp đôi ở cuối THÁNG (EOM): không chỉ có mốc cắt ngày, mà còn có các nghiệp vụ đặc thù chỉ chạy vào cuối kỳ — tính lãi tích lũy, khấu trừ phí định kỳ, đối chiếu số dư đầu kỳ tiếp theo. Những tác vụ này thường chạy bằng batch job riêng, tách biệt với luồng giao dịch hàng ngày, và dễ bị bỏ sót khỏi bộ ca kiểm thử đối soát thông thường vì tần suất xảy ra thấp (1 lần/tháng) khiến đội QA ít ưu tiên.",
        "The risk doubles at end-of-MONTH (EOM): beyond the daily cutoff, there are period-end-only operations — accrued interest calculation, periodic fee deduction, opening-balance reconciliation for the next period. These typically run as separate batch jobs, decoupled from the daily transaction flow, and are easy to leave out of the regular reconciliation test suite because their low frequency (once a month) makes QA teams deprioritize them.",
        "月末（EOM）ではリスクが倍増します。日次カットオフに加え、期末のみ実行される特有の業務があります——利息の累積計算、定期手数料の控除、翌期首残高の照合など。これらは通常、日次取引フローとは切り離された独立のバッチジョブとして実行され、発生頻度が低い（月1回）ためQAチームの優先度が下がりがちで、通常の対照テストケース集から漏れやすいです。"),
      STEP(5, "Viết ca kiểm thử biên đúng tại 23:59:59 và 00:00:00 giờ nghiệp vụ (GMT+7) cho cả giao dịch thường lẫn batch EOD/EOM, xác nhận không đếm trùng hoặc bỏ sót giữa hai kỳ liền kề.", "Write boundary test cases exactly at 23:59:59 and 00:00:00 business time (GMT+7) for both regular transactions and EOD/EOM batches, confirming no double-counting or dropping between two adjacent periods.", "通常取引とEOD/EOMバッチの両方について、業務時刻（GMT+7）の23:59:59と00:00:00で境界テストケースを作成し、隣接する2つの期間で二重計上や取りこぼしがないことを確認する。"),
      STEP(6, "Kiểm tra timestamp được chuẩn hóa VỀ UTC ở tầng lưu trữ và chỉ chuyển đổi sang giờ nghiệp vụ TẠI MỘT ĐIỂM DUY NHẤT (thường ở Report Engine) — tránh mỗi service tự convert theo cách riêng.", "Verify timestamps are normalized TO UTC at the storage layer and only converted to business time AT A SINGLE POINT (usually the Report Engine) — avoid each service converting independently in its own way.", "タイムスタンプが保存層でUTCに正規化され、業務時刻への変換は単一の箇所（通常はレポートエンジン）でのみ行われることを確認する。各サービスが独自に変換するのは避ける。"),
      TIP("Khi báo lỗi lệch do múi giờ, luôn nêu RÕ cả timestamp UTC gốc lẫn timestamp giờ nghiệp vụ đã quy đổi trong bug report — người đọc sau này (dev, BA) sẽ mất rất nhiều thời gian nếu bạn chỉ ghi 'giao dịch lúc 23:59'.", "When reporting a timezone-related mismatch, always state BOTH the raw UTC timestamp and the converted business-time timestamp in the bug report — later readers (dev, BA) will waste a lot of time if you only write 'transaction at 23:59'.", "タイムゾーンに起因するずれを報告する際は、必ずバグレポートに元のUTCタイムスタンプと変換後の業務時刻タイムスタンプの両方を明記しましょう。『23:59の取引』とだけ書くと、後で読む開発者やBAが多くの時間を無駄にします。"),
    ] },
  { heading: { vi: "7. Tình huống 1: tổng báo cáo lệch sổ cái do bỏ giao dịch pending", en: "7. Situation 1: the summary total mismatches the ledger due to dropped pending transactions", ja: "7. シーン1：保留中取引の欠落によりレポート合計が元帳とずれる" },
    blocks: [
      SITUATION("Đội chỉ đối soát các giao dịch đã hạch toán (status = SETTLED), vì cho rằng giao dịch PENDING 'chưa chốt thì chưa cần tính' — mọi ca kiểm thử regression đều pass với dữ liệu mẫu không có giao dịch treo.",
        "The team only reconciles posted transactions (status = SETTLED), reasoning that PENDING transactions 'aren't finalized yet so don't need counting' — every regression test passes because sample data never includes any pending transaction.",
        "Cuối ngày thực tế, 6 giao dịch thẻ quốc tế bị ngân hàng đối tác trả về chậm (status PENDING kéo dài hơn 24 giờ) vẫn nằm trong nhật ký giao dịch (TXN) nhưng Report Engine loại chúng hoàn toàn khỏi báo cáo, khiến tổng RPT thấp hơn TXN 6 giao dịch — Ban điều hành nhận báo cáo doanh số bị thiếu, phải họp khẩn để xác minh.",
        "On a real day, 6 international card transactions get delayed by the partner bank (status PENDING for over 24 hours) and remain in the transaction log (TXN), but the Report Engine excludes them entirely from the report, making the RPT total 6 transactions lower than TXN — executives receive an under-reported revenue figure and have to call an urgent meeting to verify it.",
        "チームは計上済み取引（status = SETTLED）のみを対照し、『保留中（PENDING）はまだ確定していないので数える必要はない』と考えていた——保留取引を含まないサンプルデータのため、すべての回帰テストは合格していた。",
        "実際のある日、提携銀行からの返答が遅れた海外カード取引6件が24時間以上PENDING状態のまま取引ログ（TXN）に残っていたが、レポートエンジンはこれらを完全にレポートから除外し、RPT合計がTXNより6件少なくなった。経営陣は過少報告された売上数値を受け取り、確認のため緊急会議を招集することになった。"),
      SOLVE("Bổ sung một 'bucket riêng' cho giao dịch chưa chốt trong mọi báo cáo tổng hợp — hiển thị rõ 'Đã chốt: X' và 'Đang xử lý: Y' thay vì chỉ một con số gộp, đồng thời thiết lập quy trình đối soát lại (T+1) cho các giao dịch Pending vừa chuyển trạng thái, đảm bảo không giao dịch nào biến mất hoàn toàn khỏi báo cáo dù đang ở trạng thái nào.",
        "Add a dedicated 'bucket' for unsettled transactions in every summary report — clearly showing 'Settled: X' and 'Processing: Y' instead of a single merged number, and set up a T+1 re-reconciliation process for transactions that just changed status from Pending, ensuring no transaction ever fully disappears from the report regardless of its state.",
        "すべての集計レポートに未確定取引専用の『バケット』を追加し、単一の合算数値ではなく『確定済み：X』『処理中：Y』を明確に表示する。さらに、Pendingから状態が変わったばかりの取引に対してT+1の再対照プロセスを設け、どの状態であっても取引がレポートから完全に消えないようにする。"),
      P("Bài học nâng cao ở đây: 'loại bỏ dữ liệu chưa hoàn tất' là một quyết định thiết kế NGUY HIỂM nếu không được hiển thị minh bạch. Về mặt kế toán, giao dịch Pending vẫn là tài sản/nghĩa vụ tồn tại — chỉ chưa được XÁC NHẬN cuối cùng, không có nghĩa là 'không tồn tại'. Một báo cáo tốt phải luôn thể hiện đủ TẤT CẢ trạng thái, với tổng của các bucket cộng lại đúng bằng tổng toàn cục — không được âm thầm lọc bỏ bất kỳ trạng thái nào khỏi con số hiển thị.",
        "The advanced lesson here: silently 'excluding incomplete data' is a DANGEROUS design decision if not made transparent. From an accounting standpoint, a pending transaction is still an existing asset/liability — merely not yet finally CONFIRMED, not 'nonexistent'. A good report must always show ALL states, with the sum of buckets exactly equal to the global total — never silently filtering out any state from the displayed figure.",
        "ここでの上級レベルの教訓は、『未完了データの除外』が透明性なく行われると危険な設計判断になるということです。会計上、保留中の取引は依然として存在する資産・負債であり、最終的な確定がまだされていないだけで『存在しない』わけではありません。優れたレポートは常にすべての状態を示し、各バケットの合計がグローバル合計と厳密に一致しなければならず、いかなる状態も表示値からひそかにフィルタしてはいけません。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử đối soát: báo cáo lệch sổ cái do bỏ giao dịch Reversal/Pending", "Bug ticket found via a reconciliation test case: report mismatches ledger due to dropped Reversal/Pending transactions", "対照テストケースで発見されたバグチケット：Reversal/Pending取引の欠落によりレポートが元帳とずれる"),
      RECAP(["Không có 'lệch bình thường' âm thầm — mọi lệch phải HIỂN THỊ rõ nguyên nhân (Pending, Reversal...)", "Báo cáo tổng hợp cần tách bucket theo trạng thái, không gộp một con số duy nhất"],
        ["There's no 'silently normal' mismatch — every gap must clearly SHOW its cause (Pending, Reversal...)", "Summary reports need separate status buckets, not one merged figure"],
        ["『黙って正常』なズレは存在しない — すべての差異は原因（Pending、Reversalなど）を明確に表示すべき", "集計レポートは状態ごとにバケットを分けるべきで、単一の合算数値にしてはいけない"]),
    ] },
  { heading: { vi: "8. Tình huống 2: đổi múi giờ khiến giao dịch rơi sai ngày", en: "8. Situation 2: a timezone change makes a transaction land on the wrong day", ja: "8. シーン2：タイムゾーンの違いにより取引が誤った日に計上される" },
    blocks: [
      SITUATION("Core Banking lưu mọi timestamp theo UTC (chuẩn nội bộ), Report Engine convert sang GMT+7 khi tổng hợp — nhưng Cổng thanh toán (một dịch vụ mới tích hợp gần đây) lại lưu timestamp theo giờ SERVER LOCAL (đặt UTC+0 nhưng KHÔNG gắn cờ timezone rõ ràng trong dữ liệu).",
        "Core Banking stores every timestamp in UTC (the internal standard), and the Report Engine converts to GMT+7 when aggregating — but the Payment Gateway (a recently-integrated new service) stores timestamps in SERVER LOCAL time (set to UTC+0 but WITHOUT an explicit timezone flag in the data).",
        "Một giao dịch thẻ diễn ra lúc 23:50 giờ Việt Nam (16:50 UTC) ngày 10/07 được cổng thanh toán ghi nhận đúng giờ đó nhưng không kèm cờ múi giờ; khi ETL đưa vào kho dữ liệu, hệ thống mặc định coi mọi timestamp không gắn cờ là UTC — khiến giao dịch bị hiểu thành 23:50 UTC = 06:50 sáng 11/07 giờ Việt Nam, và bị xếp nhầm sang báo cáo ngày 11/07 thay vì 10/07.",
        "コアバンキングはすべてのタイムスタンプをUTC（内部標準）で保存し、レポートエンジンは集計時にGMT+7に変換します——しかし最近統合された決済ゲートウェイはタイムスタンプをサーバーローカル時刻（UTC+0に設定されているがデータに明示的なタイムゾーンフラグがない）で保存していました。",
        "7月10日のベトナム時間23:50（UTC 16:50）に発生したカード取引は、決済ゲートウェイにその時刻のまま記録されましたがタイムゾーンフラグが付いていませんでした。ETLがデータウェアハウスに取り込む際、タイムゾーンフラグのないタイムスタンプはすべてUTCとみなすというデフォルト仕様のため、この取引は『UTC 23:50＝ベトナム時間7月11日06:50』と解釈され、誤って7月11日のレポートに計上されてしまいました。"),
      SOLVE("Chuẩn hóa BẮT BUỘC mọi timestamp phải lưu kèm timezone hoặc quy ước rõ ràng về UTC ngay tại tầng ghi dữ liệu (không để tầng ETL tự đoán); đồng thời viết bộ ca kiểm thử biên đúng lúc 23:59:59 và 00:00:00 giờ nghiệp vụ cho MỌI nguồn dữ liệu đầu vào, không chỉ nguồn 'tin cậy' như Core Banking.",
        "Mandate that every timestamp MUST be stored with an explicit timezone or a clear UTC convention right at the write layer (don't let the ETL layer guess); also write boundary test cases exactly at 23:59:59 and 00:00:00 business time for EVERY input data source, not just 'trusted' ones like Core Banking.",
        "すべてのタイムスタンプに明示的なタイムゾーン、または明確なUTC規約を書き込み層で必ず付与するよう義務化する（ETL層に推測させない）。さらに、コアバンキングのような『信頼できる』情報源だけでなく、すべての入力データソースについて業務時刻の23:59:59と00:00:00での境界テストケースを作成する。"),
      P("Điểm nguy hiểm nhất trong tình huống này là lỗi chỉ xảy ra với giao dịch RẤT SÁT mốc nửa đêm — nếu bộ dữ liệu kiểm thử của bạn chỉ có giao dịch vào buổi sáng hay buổi chiều, ca kiểm thử sẽ luôn pass và lỗi chỉ lộ ra khi vận hành thật, đúng những ngày có giao dịch cuối ngày (thường là ngày cao điểm, càng gây thiệt hại lớn). Đây là lý do vì sao 'kiểm thử biên thời gian' phải là hạng mục bắt buộc, không phải tùy chọn, trong mọi bộ hồi quy của hệ đối soát.",
        "The most dangerous aspect of this situation is that the bug only occurs with transactions VERY close to midnight — if your test dataset only has morning or afternoon transactions, the test case will always pass, and the bug only surfaces in real operation, on exactly the days with late-night transactions (often peak days, causing even bigger damage). This is why 'time-boundary testing' must be a mandatory, not optional, item in every reconciliation regression suite.",
        "このシーンで最も危険な点は、バグが深夜近くの取引でしか発生しないことです。テストデータセットに午前や午後の取引しかなければ、テストケースは常に合格し、バグは実運用で、しかも深夜の取引がある日（しばしばピーク日で、被害がより大きくなる）にしか顕在化しません。これが『時間境界テスト』を対照システムのすべての回帰スイートにおいて任意ではなく必須項目にすべき理由です。"),
      TRY("Nếu đang giữ dự án đối soát thật, thử liệt kê TẤT CẢ nguồn dữ liệu đầu vào và ghi rõ: mỗi nguồn lưu timestamp theo UTC hay giờ local, có gắn cờ timezone rõ ràng không.", "If you're on a real reconciliation project, try listing ALL input data sources and noting: does each one store UTC or local time, and does it carry an explicit timezone flag?", "実際の対照プロジェクトを担当しているなら、すべての入力データソースを列挙し、各ソースがUTCとローカル時刻のどちらを保存しているか、明示的なタイムゾーンフラグがあるかを書き出してみよう。"),
    ] },
  { heading: { vi: "9. Thiết kế bộ ca kiểm thử đối soát nâng cao", en: "9. Designing an advanced reconciliation test suite", ja: "9. 上級対照テストスイートの設計" },
    blocks: [
      P("Sau khi hiểu kiến trúc luồng dữ liệu và các điểm rủi ro (làm tròn, nhóm/tổng, cutoff/múi giờ), bạn cần một khung thiết kế ca kiểm thử có hệ thống thay vì nghĩ ngẫu hứng. Cách tiếp cận hiệu quả là chia bộ ca theo BA TRỤC: (1) trục dữ liệu — giao dịch thường, Pending, Reversal, ngoại tệ; (2) trục thời gian — giữa ngày, sát cutoff, cuối tháng; (3) trục thao tác báo cáo — lọc đơn, lọc tổ hợp, nhóm, tổng.",
        "Once you understand the data-flow architecture and risk points (rounding, group/sum, cutoff/timezone), you need a systematic test-design framework rather than ad-hoc thinking. An effective approach splits the suite along THREE AXES: (1) data axis — normal, Pending, Reversal, foreign-currency transactions; (2) time axis — mid-day, near-cutoff, end-of-month; (3) report-operation axis — single filter, combined filter, group, sum.",
        "データフローのアーキテクチャとリスクポイント（端数処理、グループ化・合計、カットオフ/タイムゾーン）を理解したら、思いつきではなく体系的なテスト設計フレームワークが必要です。効果的なアプローチは、テストスイートを3つの軸に分けることです：（1）データ軸——通常取引、Pending、Reversal、外貨取引、（2）時間軸——日中、カットオフ付近、月末、（3）レポート操作軸——単一フィルタ、組み合わせフィルタ、グループ化、合計。"),
      STEP(7, "Với mỗi ô giao giữa 3 trục (dữ liệu × thời gian × thao tác), viết ít nhất 1 ca kiểm thử — ưu tiên các ô có RỦI RO CAO trước (vd Reversal × sát cutoff × tổng nhóm).", "For each cell where the 3 axes intersect (data × time × operation), write at least 1 test case — prioritize HIGH-RISK cells first (e.g. Reversal × near-cutoff × group sum).", "3つの軸（データ×時間×操作）が交差する各セルについて、少なくとも1つのテストケースを作成する。リスクの高いセル（例：Reversal×カットオフ付近×グループ合計）を優先する。"),
      STEP(8, "Với mỗi ca, luôn định nghĩa RÕ ba giá trị: Expected theo GL (nguồn sự thật), Actual ở TXN, Actual ở RPT — để khoanh vùng ngay lệch nằm ở tầng nào khi có bug.", "For every case, always clearly define three values: Expected from GL (source of truth), Actual at TXN, Actual at RPT — to instantly pinpoint which layer a mismatch lives in when a bug appears.", "各ケースについて、常に3つの値を明確に定義する：GL（正解データ）から見たExpected、TXNでのActual、RPTでのActual——バグが発生した際にどの層でズレが生じているかを即座に特定できるようにする。"),
      CODE("text", "MA TRAN THIET KE CA KIEM THU DOI SOAT (trich)\nDu lieu \\ Thoi gian   | Giua ngay        | Sat cutoff 23:59  | Cuoi thang\n----------------------|------------------|--------------------|------------------\nGiao dich thuong      | Ca co ban (pass) | Ca bien ngay       | Ca bien + phi ky\nPending                | Bucket rieng     | Bucket + bien ngay | Bucket + doi han\nReversal               | Net dung         | Net + bien ngay    | Net + doi soat ky\nNgoai te               | Ty gia dung      | Ty gia + bien ngay | Ty gia + chot ky\n-> Uu tien: Reversal x sat cutoff, Ngoai te x cuoi thang (rui ro cao nhat)."),
      P("Một mẹo nâng cao khác: đừng chỉ kiểm thử với dữ liệu 'đẹp' do bạn tự tạo — hãy trích một tập dữ liệu THẬT (đã ẩn danh) từ một ngày có khối lượng giao dịch cao và có sự cố lịch sử, rồi chạy lại toàn bộ bộ ca đối soát trên tập đó. Dữ liệu thật luôn chứa những tổ hợp bất thường (giao dịch hủy giữa chừng, retry trùng mã) mà dữ liệu tự tạo khó nghĩ ra hết.",
        "Another advanced tip: don't only test with 'clean' data you fabricate yourself — pull a REAL (anonymized) dataset from a high-volume day that had a historical incident, then re-run the entire reconciliation suite against it. Real data always contains unusual combinations (mid-flight cancellations, duplicate-code retries) that fabricated data rarely captures fully.",
        "もう一つの上級テクニックは、自分で作った『きれいな』データだけでテストしないことです。過去にインシデントがあった取引量の多い日の実データ（匿名化済み）を抽出し、対照テストスイート全体をそのデータに対して再実行しましょう。実データには、作成データではなかなか思いつかない異常な組み合わせ（処理途中でのキャンセル、重複コードでのリトライなど）が必ず含まれています。"),
    ] },
  { heading: { vi: "10. Quy trình & công cụ theo dõi lệch đối soát", en: "10. Process & tools for tracking reconciliation discrepancies", ja: "10. 対照ズレを追跡するプロセスとツール" },
    blocks: [
      P("Phát hiện lệch mới chỉ là bước đầu — một quy trình đối soát trưởng thành cần theo dõi từng lệch tới khi có kết luận rõ ràng: 'lệch tạm thời do độ trễ' hay 'lệch thực sự cần fix'. TrustBank PayGate dùng bảng kanban riêng cho các ticket đối soát, tách biệt với backlog tính năng, vì mức độ ưu tiên và người xử lý (thường là cả Dev lẫn kế toán/vận hành) khác hẳn bug thông thường.",
        "Detecting a mismatch is just the first step — a mature reconciliation process must track every discrepancy through to a clear conclusion: 'temporary lag' or 'a real bug needing a fix'. TrustBank PayGate uses a dedicated kanban board for reconciliation tickets, separate from the feature backlog, since the priority and the people involved (often both Dev and accounting/ops) differ from ordinary bugs.",
        "ズレを発見することはまだ最初の一歩に過ぎません。成熟した対照プロセスは、各ズレを『一時的な遅延』か『修正が必要な本当のバグ』かという明確な結論に至るまで追跡する必要があります。TrustBank PayGateでは、機能バックログとは別に対照専用のカンバンボードを使用しています。優先度も対応者（開発者だけでなく経理・運用担当も含む）も通常のバグとは大きく異なるためです。"),
      IMG(m_kanban, "Bảng kanban theo dõi lệch đối soát TrustBank PayGate, tách cột 'Investigating' riêng cho lệch chưa rõ nguyên nhân", "TrustBank PayGate's reconciliation discrepancy kanban board, with a separate 'Investigating' column for gaps of unclear cause", "TrustBank PayGateの対照ズレ追跡カンバンボード。原因不明のズレ用に独立した『調査中』列を設けている"),
      P("Chỉ số (dashboard) cũng quan trọng không kém: tỷ lệ khớp tự động, số lệch cần điều tra, và đặc biệt là PHÂN LOẠI NGUYÊN NHÂN theo nhóm (cutoff/múi giờ, làm tròn, đồng bộ trễ, lỗi thật). Theo dõi xu hướng nguyên nhân giúp đội ưu tiên đúng chỗ — nếu 4/7 lệch trong tháng đến từ cutoff/múi giờ, đó là tín hiệu rõ ràng cần đầu tư chuẩn hóa timestamp thay vì vá từng ticket riêng lẻ.",
        "A dashboard is equally important: automatic match rate, number of gaps needing investigation, and crucially, CATEGORIZING CAUSES by group (cutoff/timezone, rounding, sync lag, real bug). Tracking cause trends helps the team prioritize correctly — if 4 out of 7 monthly gaps come from cutoff/timezone, that's a clear signal to invest in timestamp standardization rather than patching each ticket individually.",
        "ダッシュボードも同様に重要です：自動一致率、調査が必要なズレの件数、そして特に原因のグループ分類（カットオフ/タイムゾーン、端数処理、同期遅延、本当のバグ）。原因の傾向を追跡することで、チームは正しい優先順位を付けられます。月間7件のズレのうち4件がカットオフ/タイムゾーンに起因するなら、それは個別のチケットを場当たり的に修正するのではなく、タイムスタンプの標準化に投資すべき明確なシグナルです。"),
      IMG(m_dash, "Dashboard chỉ số đối soát 30 kỳ gần nhất — TrustBank PayGate: tỷ lệ khớp, số lệch, phân loại nguyên nhân", "30-period reconciliation dashboard — TrustBank PayGate: match rate, discrepancy count, cause breakdown", "直近30回の対照テストダッシュボード — TrustBank PayGate：一致率、ズレ件数、原因内訳"),
      PITFALL("Đóng ticket lệch với lý do 'chạy lại thì hết lệch' mà không ghi rõ NGUYÊN NHÂN GỐC — lệch tạm thời do độ trễ ETL trông giống hệt lệch thật do bug timezone nếu bạn không kiểm tra kỹ mốc thời gian trước khi kết luận.", "Closing a discrepancy ticket with 'it went away on re-run' without documenting the ROOT CAUSE — a temporary ETL-lag mismatch looks identical to a real timezone bug if you don't carefully check the timestamps before concluding.", "『再実行したらズレが消えた』という理由だけで根本原因を記録せずにチケットをクローズすること——タイムスタンプを慎重に確認せずに結論を出すと、ETL遅延による一時的なズレは本当のタイムゾーンバグと見分けがつきません。"),
    ] },
  { heading: { vi: "11. Trắc nghiệm củng cố kiến thức", en: "11. Knowledge check quiz", ja: "11. 理解度チェッククイズ" },
    blocks: [] },
  { heading: { vi: "12. Lỗi hay gặp, FAQ & học tiếp tại CyberSoft", en: "12. Common mistakes, FAQ & learn more at CyberSoft", ja: "12. よくある失敗、FAQ、CyberSoftで学ぶ" },
    blocks: [
      PITFALL("Chỉ đối soát dữ liệu 'sạch' vào ngày thường, bỏ qua các ngày cao điểm/cuối kỳ — trong khi phần lớn lệch thực sự chỉ lộ ra đúng những ngày đó vì khối lượng lớn và nhiều nghiệp vụ đặc thù chạy song song.", "Only reconciling 'clean' data on regular days, skipping peak/period-end days — while most real mismatches only surface exactly on those days due to high volume and many special operations running in parallel.", "通常日の『きれいな』データだけを対照し、ピーク日や期末日をスキップすること——実際のズレの大半は、取引量が多く特殊な業務が並行して実行されるまさにそうした日にしか現れません。"),
      PITFALL("So sánh hai con số ĐÃ làm tròn/tổng hợp ở tầng hiển thị mà không truy ngược về dữ liệu gốc — dễ kết luận nhầm 'khớp' trong khi sai số làm tròn ở nhiều dòng đã tự triệt tiêu lẫn nhau một cách trùng hợp.", "Comparing two ALREADY-rounded/aggregated numbers at the display layer without tracing back to raw data — easy to wrongly conclude 'matched' when rounding errors across many rows happen to cancel each other out.", "表示層ですでに丸め・集計された2つの数値を、元データまで遡って確認せずに比較すること——多くの行の丸め誤差が偶然打ち消し合い、誤って『一致』と結論づけやすくなります。"),
      P("Chương cuối này gom lại những lỗi kinh nghiệm phổ biến nhất, trả lời các câu hỏi thường gặp, và gợi ý bước học tiếp theo cho bạn.",
        "This final chapter gathers the most common experience-based mistakes, answers frequently asked questions, and suggests your next learning step.",
        "この最終章では、最もよくある経験則的な失敗をまとめ、よくある質問に答え、次の学習ステップを提案します。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test result report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
      INTERNAL("Kỹ thuật đoán lỗi (Error Guessing) cho Tester", "Error guessing technique for testers", "ky-thuat-doan-loi-error-guessing-cho-tester", "テスターのためのエラー推測技法"),
      INTERNAL("Kiểm thử tích hợp (Integration) cho Tester", "Integration testing for testers", "kiem-thu-tich-hop-integration-cho-tester", "テスターのための統合テスト"),
      P("Tổng kết: bạn vừa đi qua kiến trúc luồng dữ liệu đối soát ngân hàng (GL ↔ TXN ↔ RPT), các điểm rủi ro nâng cao — làm tròn/tỷ giá, lọc/nhóm/tổng cộng, dữ liệu EOD/EOM và múi giờ báo cáo — cùng hai tình huống thật cho thấy vì sao 'không thấy lỗi trên giao diện' không có nghĩa là số liệu đúng. Bạn cũng có một khung thiết kế ca kiểm thử theo ba trục (dữ liệu × thời gian × thao tác báo cáo) để không bỏ sót góc rủi ro nào.",
        "Summary: you've just walked through a banking reconciliation data-flow architecture (GL ↔ TXN ↔ RPT), advanced risk points — rounding/exchange-rate, filter/group/sum, EOD/EOM data, and reporting timezones — plus two real situations showing why 'no visible UI bug' doesn't mean the figures are correct. You now also have a three-axis test-design framework (data × time × report-operation) to avoid missing any risk angle.",
        "まとめ：銀行の対照データフローアーキテクチャ（GL↔TXN↔RPT）、上級リスクポイント——端数処理/為替レート、フィルタ/グループ化/合計、EOD/EOMデータ、レポートのタイムゾーン——そして『画面上にバグが見えない』ことが数値の正しさを意味しない理由を示す2つの実例を学びました。リスクの死角を見逃さないための3軸（データ×時間×レポート操作）のテスト設計フレームワークも手に入れました。"),
      P("Bước tiếp theo, bạn nên luyện thêm kỹ thuật đoán lỗi (error guessing) và kiểm thử tích hợp để mở rộng góc nhìn sang các hệ liên kết khác ngoài đối soát báo cáo. Nếu muốn học bài bản từ nền tảng tới các kỹ thuật nâng cao cùng dự án ngân hàng thực chiến và người hướng dẫn, một khoá học Tester chuyên sâu sẽ giúp bạn rút ngắn thời gian tự mày mò rất nhiều.",
        "Next, you should practice error-guessing techniques and integration testing further to broaden your view beyond report reconciliation to other connected systems. If you want to learn systematically from fundamentals to advanced techniques with real banking projects and a mentor, an in-depth Tester course will save you a lot of time compared to figuring it all out alone.",
        "次のステップとして、レポート対照以外の連携システムにも視野を広げるため、エラー推測技法や統合テストをさらに練習することをおすすめします。基礎から上級技法まで、実際の銀行プロジェクトと指導者とともに体系的に学びたいなら、専門的なテスターコースが独学に比べて多くの時間を節約してくれるでしょう。"),
      CTA(course),
    ] },
];

pages[10].blocks = QUIZ(quiz, { no: 11 }).blocks;

const RECON_01 = makeDoc({
  slug: "kiem-thu-bao-cao-va-doi-soat-du-lieu-cho-tester",
  domain: "banking",
  primaryKeyword: "kiểm thử đối soát",
  keywords: ["kiểm thử đối soát", "reconciliation testing", "đối soát dữ liệu ngân hàng", "kiểm thử báo cáo tài chính", "sổ cái giao dịch báo cáo"],
  coverLabel: "NÂNG CAO · ĐỐI SOÁT · NGÂN HÀNG",
  crumb: "Kiểm thử báo cáo & đối soát dữ liệu (Reporting & Reconciliation Testing)",
  metaTitle: {
    vi: "Kiểm thử đối soát báo cáo tài chính ngân hàng cho Tester",
    en: "Reconciliation testing for banking financial reports",
    ja: "銀行財務レポートの対照テスト（Tester向け）",
  },
  metaDescription: {
    vi: "Kiểm thử đối soát dữ liệu ngân hàng: đối chiếu sổ cái, giao dịch, báo cáo; xử lý lệch làm tròn, tỷ giá, cắt ngày EOD/EOM và múi giờ, kèm mockup và trắc nghiệm.",
    en: "Banking reconciliation testing: cross-check the ledger, transactions, and report; handle rounding/exchange-rate gaps, filter/group/sum, EOD/EOM cutoff and timezones, with mockups, 2 real situations, and a quiz.",
    ja: "銀行の対照テスト：元帳・取引・レポートを突き合わせ、端数処理/為替レートのずれ、フィルタ/グループ化/合計、EOD/EOMカットオフとタイムゾーンを扱う。モック、実例2件、クイズ付き。",
  },
  title: {
    vi: "Kiểm thử báo cáo & đối soát dữ liệu ngân hàng: sổ cái ↔ giao dịch ↔ báo cáo (nâng cao)",
    en: "Banking report & data reconciliation testing: ledger ↔ transactions ↔ report (advanced)",
    ja: "銀行のレポート＆データ対照テスト：元帳↔取引↔レポート（上級編）",
  },
  summary: {
    vi: "Bài nâng cao: kiểm thử đối soát dữ liệu hệ báo cáo tài chính & cổng thanh toán ngân hàng TrustBank PayGate. Kiến trúc luồng dữ liệu GL↔TXN↔RPT, sai lệch làm tròn/tỷ giá, lọc/nhóm/tổng cộng, dữ liệu cuối ngày/cuối kỳ và múi giờ báo cáo. 7 mockup giao diện, 2 tình huống thật, trắc nghiệm 5 câu, chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: reconciliation testing for TrustBank PayGate's financial reporting & payment-gateway reconciliation system. GL↔TXN↔RPT data-flow architecture, rounding/exchange-rate discrepancies, filter/group/sum, end-of-day/end-of-month data and reporting timezones. 7 UI mockups, 2 real situations, a 5-question quiz, SEO-ready, links to CyberSoft's Tester course.",
    ja: "上級記事：TrustBank PayGateの財務レポート・決済ゲートウェイ対照システムにおける対照テスト。GL↔TXN↔RPTのデータフローアーキテクチャ、端数処理/為替レートのずれ、フィルタ/グループ化/合計、日末・月末データとレポートのタイムゾーン。UIモック7点、実例2件、5問クイズ、SEO対応、CyberSoftテスターコースへのリンク。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách kiểm thử đối soát báo cáo tài chính ngân hàng", steps: [
    { name: "Vẽ luồng dữ liệu qua 3 nguồn GL/TXN/RPT", text: "Xác định độ trễ, tầng nào lưu 'sự thật gốc'." },
    { name: "Áp 3 trục thiết kế ca: dữ liệu × thời gian × thao tác báo cáo", text: "Ưu tiên tổ hợp rủi ro cao (Reversal/ngoại tệ × sát cutoff)." },
    { name: "Đối chiếu tổng chéo & theo dõi nguyên nhân lệch", text: "So (a) SUM trực tiếp và (b) tổng dồn theo nhóm; phân loại nguyên nhân trên dashboard." },
  ] },
  pages,
});

export const MA_RECON_01 = [RECON_01];
