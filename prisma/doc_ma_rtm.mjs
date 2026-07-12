// doc_ma_rtm.mjs — BÀI MANUAL NÂNG CAO (advanced):
// Ma trận truy vết yêu cầu (Requirements Traceability Matrix - RTM) nâng cao —
// dự án CRM chăm sóc khách hàng doanh nghiệp "BizConnect CRM". Xây RTM 2 chiều
// (yêu cầu ↔ test case ↔ defect), đo độ phủ yêu cầu, phát hiện yêu cầu chưa test /
// test case mồ côi, cập nhật RTM khi yêu cầu đổi, dùng RTM đánh giá tác động thay đổi.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, grid, jira, kanban, dashboard, annotate } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, test design nâng cao, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "congnghe", label: cfg.coverLabel });
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
    tags: tags("congnghe", "crm", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: RTM 2 chiều — Yêu cầu ↔ Test Case ↔ Defect (BizConnect CRM) ──
const m_rtm = grid("RTM 2 chiều — Yêu cầu ↔ Test Case ↔ Defect (BizConnect CRM · Release 4.2)",
  ["Yêu cầu (Req ID)", "Test Case (TC ID)", "Defect liên quan", "Trạng thái phủ"],
  [
    ["REQ-101 Gộp liên hệ trùng lặp", "TC-2201, TC-2202, TC-2203", "CRM-3391 (Open)", "Đã phủ · có lỗi mở"],
    ["REQ-114 Tự động chuyển cấp ticket quá SLA", "— (không có TC nào)", "—", "CHƯA PHỦ"],
    ["REQ-128 Đồng bộ cơ hội bán hàng với hợp đồng", "TC-2240", "CRM-3402 (Closed)", "Đã phủ · đã fix"],
    ["REQ-133 Phân quyền dữ liệu theo chi nhánh", "TC-2255, TC-2256", "—", "Đã phủ · sạch"],
    ["— (không có yêu cầu gốc)", "TC-2270 Kiểm tra xuất PDF song ngữ", "—", "TEST MỒ CÔI"],
    ["REQ-140 Xuất báo cáo doanh thu theo KH doanh nghiệp", "TC-2280, TC-2281, TC-2282", "CRM-3410 (Open)", "Đã phủ · có lỗi mở"],
  ], { accent: "#0f766e", highlight: 1, note: "RTM 2 chiều: forward (yêu cầu → test case, đo độ phủ) và backward (test case → yêu cầu gốc, tránh test thừa/mồ côi)." });

// ── Mockup 2: dashboard độ phủ yêu cầu toàn dự án ──
const m_dash = dashboard("Độ phủ yêu cầu (Requirement Coverage) — BizConnect CRM · Release 4.2", [
  { label: "Tổng số yêu cầu", value: "86", sub: "toàn bộ backlog release", color: "#0f766e" },
  { label: "Có ≥1 test case", value: "79", sub: "~91.9% độ phủ", color: "#16a34a" },
  { label: "Chưa có test case", value: "7", sub: "cần bổ sung gấp", color: "#e11d48" },
  { label: "Test case mồ côi", value: "5", sub: "không trỏ về yêu cầu nào", color: "#d97706" },
]);

// ── Mockup 3: bảng phát hiện yêu cầu chưa test / test mồ côi ──
const m_gap = grid("Phát hiện qua RTM: yêu cầu chưa test & test case mồ côi",
  ["Loại vấn đề", "ID", "Mô tả", "Mức rủi ro"],
  [
    ["Yêu cầu CHƯA có test", "REQ-114", "Chuyển cấp ticket quá SLA — nghiệp vụ cam kết hợp đồng dịch vụ (SLA) với khách doanh nghiệp", "Cao — ảnh hưởng cam kết hợp đồng"],
    ["Yêu cầu CHƯA có test", "REQ-151", "Cảnh báo khi nhân viên sale rời khỏi cơ hội đang mở > 30 ngày", "Trung bình"],
    ["Test mồ côi", "TC-2270", "Kiểm tra xuất PDF song ngữ — không rõ thuộc yêu cầu nào, có thể của tính năng đã bỏ", "Thấp — lãng phí công sức bảo trì"],
    ["Test mồ côi", "TC-2291", "Kiểm tra đăng nhập bằng SSO cũ — hệ thống đã đổi sang SSO mới ở REQ-160", "Trung bình — test lỗi thời, dễ báo sai kết quả"],
  ], { accent: "#e11d48", highlight: 0, note: "Yêu cầu chưa test = lỗ hổng độ phủ (coverage gap). Test mồ côi = ca kiểm thử không truy ngược được về yêu cầu, cần rà soát để giữ hoặc loại bỏ." });

// ── Mockup 4: Jira — lỗi nghiêm trọng phát hiện qua audit RTM ──
const m_jira = jira({
  key: "CRM-3428", title: "RTM audit: REQ-114 (chuyển cấp ticket quá SLA) KHÔNG có test case nào — nghiệp vụ cam kết SLA hợp đồng chưa từng được kiểm thử",
  type: "Risk", status: "Open", priority: "Highest", severity: "Critical",
  fields: [
    ["Nguồn phát hiện", "Rà soát RTM định kỳ trước UAT · Release 4.2"],
    ["Tác động", "REQ-114 gắn với điều khoản SLA trong hợp đồng doanh nghiệp — nếu lỗi lọt production, khách hàng có thể khiếu nại vi phạm hợp đồng"],
    ["Nguyên nhân gốc", "Yêu cầu được thêm muộn ở giữa sprint, RTM không được cập nhật đồng bộ với backlog"],
    ["Đề xuất", "Viết bổ sung tối thiểu 3 test case (luồng đúng, luồng biên thời gian SLA, luồng lỗi hệ thống chuyển cấp) trước khi release"],
    ["Người theo dõi", "Test Lead + Business Analyst phụ trách module Ticket"],
  ],
});

// ── Mockup 5: kanban theo dõi khắc phục các lỗ hổng phát hiện qua RTM ──
const m_kanban = kanban("Kanban khắc phục lỗ hổng RTM (BizConnect CRM · Release 4.2)", [
  { name: "Phát hiện", cards: [
    { key: "REQ-114", title: "Chưa có test case — chuyển cấp SLA", sev: "Critical" },
    { key: "REQ-151", title: "Chưa có test case — cảnh báo cơ hội treo", sev: "Medium" },
  ] },
  { name: "Đang viết test", cards: [
    { key: "TC-2301..03", title: "Bổ sung 3 TC cho REQ-114", sev: "High" },
  ] },
  { name: "Rà soát mồ côi", cards: [
    { key: "TC-2270", title: "Xác nhận còn cần hay bỏ", sev: "Low" },
    { key: "TC-2291", title: "SSO cũ — cập nhật hoặc xoá", sev: "Medium" },
  ] },
  { name: "Đã đóng RTM", cards: [
    { key: "REQ-128", title: "Đồng bộ deal-hợp đồng — đủ phủ, đã fix lỗi", sev: "Low" },
  ] },
]);

// ── Mockup 6: màn hình BizConnect CRM — annotate yêu cầu KHÔNG có test case ──
const m_screen = browser("bizconnect-crm.vn/admin/yeu-cau/REQ-114", [
  `<rect x="24" y="16" width="712" height="70" rx="10" fill="#f0fdfa" stroke="#0f766e"/>
   <text x="40" y="38" font-size="13" font-weight="800" fill="#0f172a">REQ-114 · Tự động chuyển cấp ticket quá hạn SLA</text>
   <text x="40" y="58" font-size="11.5" fill="#475569">Module: Ticket &amp; SLA · Ưu tiên: Cao · Gắn hợp đồng dịch vụ khách hàng doanh nghiệp</text>
   <text x="40" y="76" font-size="11.5" fill="#b91c1c" font-weight="700">Test case liên kết: 0 — chưa có ca kiểm thử nào trỏ tới yêu cầu này</text>`,
  annotate(24, 16, 712, 70, "RTM: yêu cầu quan trọng — 0 test case ánh xạ"),
  `<text x="40" y="130" font-size="12" font-weight="700" fill="#0f172a">Lịch sử thay đổi yêu cầu</text>
   <text x="40" y="152" font-size="11.5" fill="#334155">v1 (12/05): SLA cố định 24h cho mọi ticket</text>
   <text x="40" y="172" font-size="11.5" fill="#334155">v2 (03/06): SLA phân theo gói dịch vụ (Basic/Pro/Enterprise) — RTM chưa cập nhật</text>`,
].join(""), { h: 240, title: "BizConnect CRM · Admin", accent: "#0f766e" });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Ma trận truy vết yêu cầu (RTM) là gì và khác gì so với bảng test case thông thường?",
  "What is a Requirements Traceability Matrix (RTM), and how does it differ from a plain test case list?",
  "RTM là bảng liên kết CÓ HỆ THỐNG giữa yêu cầu (requirement), test case kiểm thử yêu cầu đó, và defect phát sinh khi test case đó fail — cho phép truy vết CẢ HAI CHIỀU: từ yêu cầu tìm ra test case (đo độ phủ) và từ test case tìm ngược về yêu cầu gốc (tránh test thừa). Một bảng test case thông thường chỉ liệt kê các bước kiểm thử, không cho biết yêu cầu nào đã/chưa được phủ, cũng không liên kết trực tiếp tới defect để đánh giá chất lượng theo từng yêu cầu.",
  "An RTM is a systematically linked table connecting requirements, the test cases that verify each requirement, and the defects raised when those test cases fail — enabling traceability in BOTH directions: from requirement to test case (to measure coverage) and from test case back to its source requirement (to avoid redundant tests). A plain test case list only enumerates test steps; it doesn't reveal which requirements are or aren't covered, nor does it link directly to defects to assess quality per requirement.",
  "要求追跡マトリクス（RTM）とは何？普通のテストケース一覧と何が違う？",
  "RTMとは、要求（requirement）・その要求を検証するテストケース・そのテストケースが失敗した際に起票される欠陥（defect）を体系的に紐づけた表で、双方向のトレーサビリティを可能にします：要求からテストケースを辿って網羅率を測る方向と、テストケースから元の要求へ逆に辿って無駄な重複テストを防ぐ方向です。普通のテストケース一覧は手順を列挙するだけで、どの要求が網羅されているかも、欠陥との直接的な紐づけも示しません。");
const faq2 = FAQ(
  "Vì sao truy vết 2 chiều (forward + backward) lại quan trọng hơn chỉ truy vết 1 chiều?",
  "Why does bidirectional traceability (forward + backward) matter more than tracing in just one direction?",
  "Truy vết XUÔI (forward — từ yêu cầu tới test case) giúp trả lời câu hỏi 'yêu cầu này đã được test chưa, test bằng ca nào', dùng để đo độ phủ và tìm 'yêu cầu chưa test'. Truy vết NGƯỢC (backward — từ test case về yêu cầu) giúp trả lời câu hỏi 'ca kiểm thử này còn cần thiết không, nó bảo vệ yêu cầu nào', dùng để tìm 'test case mồ côi' — những ca đã lỗi thời hoặc dư thừa vẫn được chạy tốn tài nguyên mà không còn giá trị. Chỉ làm một chiều sẽ bỏ sót một nửa rủi ro: chỉ forward thì bỏ sót lãng phí do test mồ côi, chỉ backward thì bỏ sót các yêu cầu bị bỏ quên hoàn toàn.",
  "FORWARD traceability (requirement → test case) answers 'has this requirement been tested, and by which cases', used to measure coverage and find 'untested requirements'. BACKWARD traceability (test case → requirement) answers 'is this test case still necessary, which requirement does it protect', used to find 'orphan test cases' — outdated or redundant cases still consuming CI time and maintenance effort without real value. Doing only one direction misses half the risk: forward-only misses orphan waste, backward-only misses requirements that were completely forgotten.",
  "順方向・逆方向の双方向トレーサビリティが片方向より重要な理由は？",
  "順方向トレーサビリティ（要求→テストケース）は『この要求はテスト済みか、どのケースで検証されているか』に答え、網羅率の測定や『未テスト要求』の発見に使います。逆方向トレーサビリティ（テストケース→要求）は『このテストケースはまだ必要か、どの要求を守っているか』に答え、『孤立テストケース』——価値を失っているのに実行され続けCIリソースと保守コストを浪費するケース——の発見に使います。片方向だけではリスクの半分を見逃します：順方向のみでは孤立テストの無駄を見逃し、逆方向のみでは完全に忘れられた要求を見逃します。");
const faq3 = FAQ(
  "RTM giúp đánh giá tác động thay đổi (change impact analysis) như thế nào?",
  "How does an RTM help with change impact analysis?",
  "Khi một yêu cầu bị sửa (ví dụ SLA đổi từ 24h cố định sang phân theo gói dịch vụ), tra RTM ngay lập tức cho biết TẤT CẢ test case đang gắn với yêu cầu đó cần rà soát lại, và những defect cũ liên quan có còn hợp lệ không. Nếu yêu cầu đó còn liên kết tới yêu cầu khác (ví dụ REQ-114 ảnh hưởng module báo cáo doanh thu REQ-140 vì SLA vi phạm làm giảm điểm hài lòng khách hàng dùng trong báo cáo), RTM mở rộng dạng đồ thị giúp lần theo chuỗi ảnh hưởng thay vì chỉ nhìn yêu cầu đơn lẻ. Không có RTM, đội test phải dựa vào trí nhớ hoặc hỏi lại từng người, dễ bỏ sót ca hồi quy quan trọng.",
  "When a requirement changes (e.g. SLA moves from a fixed 24h to tiers by service package), looking it up in the RTM immediately shows ALL test cases tied to that requirement that need review, and whether related old defects are still valid. If that requirement also links to others (e.g. REQ-114 affects the revenue-report module REQ-140 because SLA breaches lower the customer-satisfaction score used in reports), a graph-extended RTM lets you trace the chain of impact instead of looking at one requirement in isolation. Without an RTM, the test team relies on memory or asking around, easily missing important regression cases.",
  "RTMは変更影響分析（change impact analysis）にどう役立つ？",
  "ある要求が変更されたとき（例：SLAが固定24時間からサービスプラン別に変わった場合）、RTMを参照すればその要求に紐づく全テストケースを即座に洗い出し、レビューが必要かどうか、関連する既存の欠陥がまだ有効かどうかを確認できます。その要求が別の要求と関連する場合（例：REQ-114がSLA違反により顧客満足度スコアを下げ、それがレポートに使われるREQ-140の収益レポートモジュールに影響する場合）、グラフ拡張されたRTMを使えば単一の要求だけでなく影響の連鎖を追跡できます。RTMがなければ、テストチームは記憶や聞き取りに頼ることになり、重要な回帰テストケースを見落としがちです。");
const faq4 = FAQ(
  "Khi nào cần cập nhật RTM để tránh RTM bị 'lệch' với thực tế dự án?",
  "When should the RTM be updated to avoid drifting out of sync with the actual project?",
  "RTM cần cập nhật ngay tại 4 thời điểm: (1) khi thêm/sửa/xoá một yêu cầu — kể cả thay đổi nhỏ như ngưỡng SLA; (2) khi thêm/sửa/xoá một test case; (3) khi một defect được mở, đóng hoặc đổi mức độ nghiêm trọng; (4) trước mỗi cột mốc quan trọng (trước UAT, trước release) như một bước audit bắt buộc, không phải việc làm 'khi rảnh'. Thực tế nhiều đội chỉ cập nhật RTM lúc mới lập dự án rồi bỏ quên — đó chính là nguyên nhân RTM trở thành tài liệu 'chết', không còn phản ánh đúng độ phủ thật.",
  "The RTM should be updated immediately at 4 points: (1) whenever a requirement is added, changed, or removed — even a small change like an SLA threshold; (2) whenever a test case is added, changed, or removed; (3) whenever a defect is opened, closed, or has its severity changed; (4) before every major milestone (before UAT, before release) as a mandatory audit step, not something done 'when there's spare time'. In practice many teams only update the RTM at project kickoff and then neglect it — that's exactly why RTMs become 'dead' documents that no longer reflect real coverage.",
  "RTMが実際のプロジェクトとずれないよう、いつ更新すべき？",
  "RTMは次の4つのタイミングで即座に更新すべきです：（1）要求が追加・変更・削除されたとき——SLA閾値のような小さな変更も含む、（2）テストケースが追加・変更・削除されたとき、（3）欠陥がオープン・クローズ、または重大度が変更されたとき、（4）重要なマイルストーン（UAT前、リリース前）ごとに必須の監査ステップとして——『暇なときにやる』作業ではありません。実際には多くのチームがプロジェクト開始時にしかRTMを更新せず放置しており、これこそRTMが実際の網羅率を反映しない『死んだ』文書になる原因です。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Truy vết XUÔI (forward traceability) trong RTM dùng để trả lời câu hỏi nào?", en: "What question does FORWARD traceability in an RTM answer?", ja: "RTMの順方向トレーサビリティはどの質問に答える？" },
    options: [
      { vi: "Ca kiểm thử này còn cần thiết không, nó bảo vệ yêu cầu nào?", en: "Is this test case still necessary, which requirement does it protect?", ja: "このテストケースはまだ必要か、どの要求を守っているか？" },
      { vi: "Yêu cầu này đã được test chưa, bằng những ca kiểm thử nào?", en: "Has this requirement been tested, and by which test cases?", ja: "この要求はテスト済みか、どのテストケースで検証されているか？" },
      { vi: "Server phản hồi trong bao lâu?", en: "How fast does the server respond?", ja: "サーバーの応答時間はどれくらいか？" },
      { vi: "Có bao nhiêu người dùng đang online?", en: "How many users are currently online?", ja: "現在何人のユーザーがオンラインか？" },
    ], correct: 1,
    explain: { vi: "Forward traceability đi từ yêu cầu tới test case, dùng để đo độ phủ và tìm yêu cầu chưa test.", en: "Forward traceability goes from requirement to test case, used to measure coverage and find untested requirements.", ja: "順方向トレーサビリティは要求からテストケースへ辿り、網羅率の測定や未テスト要求の発見に使います。" },
  }),
  mcq({
    q: { vi: "Trong RTM, 'test case mồ côi' (orphan test case) là gì?", en: "In an RTM, what is an 'orphan test case'?", ja: "RTMにおける『孤立テストケース（orphan test case）』とは何？" },
    options: [
      { vi: "Test case chạy nhanh nhất trong bộ hồi quy", en: "The fastest-running test case in the regression suite", ja: "回帰スイートの中で最も速く実行されるテストケース" },
      { vi: "Test case luôn pass, không bao giờ fail", en: "A test case that always passes, never fails", ja: "常に合格し失敗しないテストケース" },
      { vi: "Test case không truy ngược được về yêu cầu nào — có thể lỗi thời hoặc dư thừa", en: "A test case that can't be traced back to any requirement — possibly outdated or redundant", ja: "どの要求にも遡れないテストケース——古くなった、または冗長である可能性がある" },
      { vi: "Test case do một tester mới viết", en: "A test case written by a new tester", ja: "新人テスターが書いたテストケース" },
    ], correct: 2,
    explain: { vi: "Test mồ côi là ca không gắn được với yêu cầu nào trong backward traceability, cần rà soát để giữ hoặc loại bỏ.", en: "An orphan test case can't be linked to any requirement via backward traceability and needs review to keep or remove.", ja: "孤立テストケースは逆方向トレーサビリティでどの要求にも紐づけられず、保持するか削除するか見直しが必要です。" },
  }),
  mcq({
    q: { vi: "Yêu cầu REQ-114 (chuyển cấp ticket quá SLA) bị sửa giữa sprint mà RTM không cập nhật. Rủi ro lớn nhất là gì?", en: "REQ-114 (SLA ticket escalation) changes mid-sprint but the RTM isn't updated. What's the biggest risk?", ja: "スプリント途中でREQ-114（SLAチケットエスカレーション）が変更されたがRTMが更新されない場合、最大のリスクは？" },
    options: [
      { vi: "Giao diện CRM sẽ đổi màu sắc", en: "The CRM's UI colors will change", ja: "CRMのUI配色が変わる" },
      { vi: "Test case cũ có thể không còn phản ánh đúng yêu cầu mới, dẫn tới sót ca hồi quy hoặc báo cáo độ phủ sai", en: "Old test cases may no longer reflect the new requirement, causing missed regression cases or a wrong coverage report", ja: "既存のテストケースが新しい要求を反映しなくなり、回帰ケースの見落としや誤った網羅率報告につながる" },
      { vi: "Không có rủi ro gì vì RTM chỉ là tài liệu tham khảo", en: "No risk at all, since the RTM is just a reference document", ja: "RTMは参考資料にすぎないためリスクはない" },
      { vi: "Chỉ ảnh hưởng tốc độ build CI", en: "It only affects CI build speed", ja: "CIビルド速度にのみ影響する" },
      { vi: "Chỉ team Marketing bị ảnh hưởng", en: "Only the Marketing team is affected", ja: "マーケティングチームのみが影響を受ける" },
    ], correct: 1,
    explain: { vi: "RTM lệch thực tế khiến đội test tưởng yêu cầu đã phủ đủ trong khi test case đang kiểm thử phiên bản yêu cầu cũ.", en: "A stale RTM makes the team believe a requirement is fully covered while the test cases still verify the old version of the requirement.", ja: "RTMが実態とずれると、テストケースは古いバージョンの要求を検証しているのに、チームは十分に網羅されていると誤認します。" },
  }),
  mcq({
    q: { vi: "Cách RTM hỗ trợ đánh giá tác động thay đổi (change impact analysis) là gì?", en: "How does an RTM support change impact analysis?", ja: "RTMが変更影響分析をどのように支援する？" },
    options: [
      { vi: "Tự động sửa code khi yêu cầu đổi", en: "It automatically fixes code when a requirement changes", ja: "要求が変わると自動的にコードを修正する" },
      { vi: "Cho biết ngay các test case, defect nào liên quan tới yêu cầu vừa thay đổi, cần rà soát lại", en: "It immediately shows which test cases and defects relate to the changed requirement and need re-review", ja: "変更された要求に関連するテストケースと欠陥をすぐに示し、再レビューが必要だとわかる" },
      { vi: "Tính điểm hiệu năng của server", en: "It calculates server performance scores", ja: "サーバーの性能スコアを計算する" },
      { vi: "Xoá toàn bộ lịch sử defect cũ", en: "It deletes all old defect history", ja: "過去の欠陥履歴をすべて削除する" },
    ], correct: 1,
    explain: { vi: "RTM là bản đồ liên kết, giúp lần ra ngay phạm vi ảnh hưởng của một thay đổi thay vì dò thủ công.", en: "An RTM is a linkage map that immediately reveals a change's blast radius instead of manual tracing.", ja: "RTMは紐づけのマップであり、手作業で追う代わりに変更の影響範囲を即座に明らかにします。" },
  }),
  mcq({
    q: { vi: "Rà soát RTM phát hiện REQ-114 — yêu cầu gắn với cam kết SLA hợp đồng doanh nghiệp — CHƯA có test case nào. Hành động ưu tiên đúng nhất?", en: "An RTM review finds REQ-114 — a requirement tied to an enterprise SLA contract commitment — has NO test case at all. What's the most correct priority action?", ja: "RTM監査で、企業向けSLA契約義務に関わるREQ-114に一つもテストケースがないと判明。最も適切な優先アクションは？" },
    options: [
      { vi: "Bỏ qua vì đã gần release, để lần sau", en: "Ignore it since release is near, deal with it next time", ja: "リリース間近なので無視し、次回対応する" },
      { vi: "Ghi nhận là rủi ro/lỗ hổng độ phủ mức ưu tiên cao, phối hợp BA/Dev bổ sung test case trước khi release", en: "Log it as a high-priority coverage gap/risk, coordinate with BA/Dev to add test cases before release", ja: "高優先度の網羅ギャップ／リスクとして記録し、リリース前にBA/開発と協力してテストケースを追加する" },
      { vi: "Tự ý xoá yêu cầu REQ-114 khỏi backlog", en: "Unilaterally delete REQ-114 from the backlog", ja: "独断でREQ-114をバックログから削除する" },
      { vi: "Chỉ ghi chú miệng với đồng nghiệp, không cần văn bản", en: "Just mention it verbally to a colleague, no need to document it", ja: "同僚に口頭で伝えるだけで文書化はしない" },
    ], correct: 1,
    explain: { vi: "Yêu cầu gắn nghĩa vụ hợp đồng mà chưa test là rủi ro nghiêm trọng, cần ghi nhận chính thức và xử lý trước release, không được bỏ qua hay xử lý ngầm.", en: "A requirement tied to contractual obligations that has never been tested is a serious risk; it must be formally logged and addressed before release, not skipped or handled informally.", ja: "契約義務に関わる要求が一度もテストされていないのは深刻なリスクであり、無視したり口頭だけで済ませたりせず、正式に記録しリリース前に対応する必要があります。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bức tranh toàn cảnh RTM", en: "1. TL;DR & the big picture of an RTM", ja: "1. 要点とRTMの全体像" },
    blocks: [
      TLDR("Ma trận truy vết yêu cầu (RTM) là bảng liên kết 2 chiều giữa yêu cầu, test case và defect trong dự án CRM chăm sóc khách hàng doanh nghiệp BizConnect CRM: forward traceability (yêu cầu → test case) đo độ phủ, backward traceability (test case → yêu cầu) phát hiện test mồ côi. Bài này đi sâu vào cách xây RTM thực chiến, đo độ phủ yêu cầu, phát hiện yêu cầu chưa test/test mồ côi, cập nhật RTM đúng thời điểm, và dùng RTM để đánh giá tác động khi yêu cầu thay đổi — kèm 2 tình huống thật, nhiều mockup và trắc nghiệm cuối bài.",
        "A Requirements Traceability Matrix (RTM) is a bidirectional linkage table across requirements, test cases, and defects for BizConnect CRM, an enterprise customer-care CRM project: forward traceability (requirement → test case) measures coverage, backward traceability (test case → requirement) finds orphan tests. This article dives into building a real-world RTM, measuring requirement coverage, detecting untested requirements/orphan tests, updating the RTM at the right moments, and using it for change impact analysis — with two real situations, many mockups, and a quiz at the end.",
        "要求追跡マトリクス（RTM）とは、企業向けカスタマーケアCRM「BizConnect CRM」プロジェクトにおける要求・テストケース・欠陥を双方向に紐づける表です：順方向トレーサビリティ（要求→テストケース）で網羅率を測り、逆方向トレーサビリティ（テストケース→要求）で孤立テストを発見します。本記事は実戦的なRTM構築、要求網羅率の測定、未テスト要求／孤立テストの検出、適切なタイミングでのRTM更新、変更影響分析への活用を掘り下げます。2つの実例、多数のモック、最後にクイズ付き。"),
      P("Với tester đã quen thiết kế ca kiểm thử đơn lẻ, RTM là bước nâng lên tầm quản lý CHẤT LƯỢNG THEO PHẠM VI: thay vì hỏi 'ca này test cái gì', RTM giúp bạn trả lời câu hỏi lớn hơn — 'toàn bộ yêu cầu của release này đã được kiểm thử đầy đủ chưa, ở đâu còn lỗ hổng, cái gì đang lãng phí công sức'. Đây là công cụ bắt buộc trong các dự án doanh nghiệp có audit, có hợp đồng SLA, hoặc chuẩn CMMI/ISO nơi 'chứng minh được đã test cái gì' quan trọng ngang 'đã test đúng chưa'.",
        "For testers already comfortable designing individual test cases, an RTM is a step up to SCOPE-LEVEL QUALITY MANAGEMENT: instead of asking 'what does this case test', the RTM helps answer a bigger question — 'has the entire release's requirement set been fully tested, where are the gaps, what's wasting effort'. It's a mandatory tool in enterprise projects with audits, SLA contracts, or CMMI/ISO standards where 'proving what was tested' matters as much as 'testing it correctly'.",
        "個々のテストケース設計に慣れたテスターにとって、RTMはスコープレベルの品質管理へのステップアップです：『このケースは何をテストするか』ではなく、『このリリースの要求全体が十分にテストされているか、どこにギャップがあり、何が労力の無駄になっているか』というより大きな問いに答える手助けをします。監査、SLA契約、あるいは『何をテストしたかを証明できること』が『正しくテストしたこと』と同じくらい重要なCMMI/ISO基準を持つエンタープライズプロジェクトでは必須のツールです。"),
      IMG(m_rtm, "RTM 2 chiều: yêu cầu ↔ test case ↔ defect trên BizConnect CRM", "Bidirectional RTM: requirement ↔ test case ↔ defect on BizConnect CRM", "BizConnect CRMにおける双方向RTM：要求↔テストケース↔欠陥"),
      DEF("Requirements Traceability Matrix (RTM)", "bảng liên kết có hệ thống giữa yêu cầu, test case kiểm thử yêu cầu đó và defect phát sinh, cho phép truy vết 2 chiều để đo độ phủ và phát hiện lỗ hổng/dư thừa.",
        "a systematically linked table across requirements, the test cases that verify them, and the defects raised, enabling bidirectional traceability to measure coverage and detect gaps or redundancy.",
        "要求・それを検証するテストケース・発生した欠陥を体系的に紐づけた表で、双方向トレーサビリティにより網羅率の測定とギャップ／冗長性の検出を可能にする。"),
    ] },
  { heading: { vi: "2. RTM 2 chiều: forward vs backward traceability", en: "2. Bidirectional RTM: forward vs backward traceability", ja: "2. 双方向RTM：順方向 vs 逆方向トレーサビリティ" },
    blocks: [
      P("RTM cơ bản chỉ có 1 chiều: liệt kê mỗi yêu cầu kèm test case tương ứng. RTM nâng cao BẮT BUỘC có 2 chiều hoạt động song song. Forward traceability trả lời 'yêu cầu X được kiểm thử bởi những ca nào' — chiều này dùng để tính % độ phủ yêu cầu và tìm ra 'yêu cầu chưa test'. Backward traceability trả lời 'test case Y đang bảo vệ yêu cầu nào' — chiều này dùng để tìm 'test case mồ côi': ca kiểm thử vẫn chạy trong bộ hồi quy nhưng không còn gắn với yêu cầu hợp lệ nào, thường do yêu cầu đã bị xoá/gộp/thay thế mà không dọn dẹp test tương ứng.",
        "A basic RTM only has one direction: listing each requirement alongside its test cases. An advanced RTM MUST run both directions in parallel. Forward traceability answers 'which cases test requirement X' — used to compute requirement coverage % and find 'untested requirements'. Backward traceability answers 'which requirement does test case Y protect' — used to find 'orphan test cases': cases still running in the regression suite but no longer tied to any valid requirement, usually because the requirement was deleted/merged/replaced without cleaning up its tests.",
        "基本的なRTMは片方向のみです：各要求に対応するテストケースを列挙するだけです。高度なRTMは両方向を並行して稼働させる必要があります。順方向トレーサビリティは『要求Xはどのケースでテストされているか』に答え——要求網羅率（%）の算出や『未テスト要求』の発見に使います。逆方向トレーサビリティは『テストケースYはどの要求を守っているか』に答え——回帰スイートで実行され続けているのに、要求が削除・統合・置換されたため有効な要求に紐づかなくなった『孤立テストケース』の発見に使います。"),
      IMG(m_gap, "Bảng phát hiện qua RTM: yêu cầu chưa test (forward) và test case mồ côi (backward)", "RTM-driven detection: untested requirements (forward) and orphan test cases (backward)", "RTMによる検出：未テスト要求（順方向）と孤立テストケース（逆方向）"),
      P("Trong ví dụ BizConnect CRM ở chương 1: REQ-114 (chuyển cấp ticket quá SLA) là lỗ hổng phát hiện bằng chiều forward — yêu cầu tồn tại nhưng không có test case nào trỏ tới. TC-2270 (kiểm tra xuất PDF song ngữ) là lỗ hổng phát hiện bằng chiều backward — test case tồn tại, chạy đều đặn, nhưng không truy ngược được về yêu cầu nào còn hiệu lực. Hai loại lỗ hổng này có bản chất khác nhau: loại 1 là RỦI RO CHƯA BIẾT (unknown risk vì chưa test), loại 2 là LÃNG PHÍ (waste vì tốn công bảo trì cho thứ không còn giá trị) — cả hai đều cần được RTM phơi bày định kỳ.",
        "In the BizConnect CRM example from chapter 1: REQ-114 (SLA ticket escalation) is a gap found via the forward direction — the requirement exists but no test case points to it. TC-2270 (bilingual PDF export check) is a gap found via the backward direction — the test case exists and runs regularly, but can't be traced back to any still-valid requirement. These two gap types differ in nature: the first is an UNKNOWN RISK (untested), the second is WASTE (maintenance effort spent on something with no remaining value) — both need to be surfaced periodically by the RTM.",
        "第1章のBizConnect CRMの例では：REQ-114（SLAチケットエスカレーション）は順方向で発見されたギャップです——要求は存在するが、それを指すテストケースがありません。TC-2270（バイリンガルPDF出力確認）は逆方向で発見されたギャップです——テストケースは存在し定期的に実行されているが、有効な要求に遡ることができません。この2種類のギャップは性質が異なります：前者は未知のリスク（未テストのため）、後者は無駄（もはや価値のないものに保守労力を費やしている）——どちらもRTMによって定期的に可視化される必要があります。"),
      DEF("Backward Traceability", "chiều truy vết từ test case ngược về yêu cầu gốc, dùng để phát hiện test case mồ côi và loại bỏ công việc bảo trì thừa.",
        "the tracing direction from a test case back to its source requirement, used to detect orphan test cases and eliminate redundant maintenance work.",
        "テストケースから元の要求へ遡るトレーサビリティの方向で、孤立テストケースの検出と余分な保守作業の排除に使う。"),
    ] },
  { heading: { vi: "3. Vì sao tester nâng cao cần thạo RTM trên hệ thống lớn", en: "3. Why advanced testers need RTM mastery on large systems", ja: "3. 上級テスターが大規模システムでRTMを習得すべき理由" },
    blocks: [
      P("Ở quy mô một tính năng nhỏ, tester có thể nhớ trong đầu 'tính năng này đã test những gì'. Nhưng BizConnect CRM có hàng chục module (liên hệ, cơ hội bán hàng, ticket hỗ trợ, hợp đồng, báo cáo, phân quyền theo chi nhánh) với hàng trăm yêu cầu qua nhiều release — trí nhớ cá nhân không còn đủ tin cậy. RTM biến 'niềm tin đã test đủ' thành BẰNG CHỨNG có thể kiểm chứng: bất kỳ ai, kể cả người mới vào dự án, tra RTM là biết ngay yêu cầu nào an toàn, yêu cầu nào còn rủi ro.",
        "At the scale of one small feature, a tester can hold 'what this feature has been tested for' in their head. But BizConnect CRM has dozens of modules (contacts, sales opportunities, support tickets, contracts, reports, branch-based access) with hundreds of requirements across many releases — personal memory is no longer reliable. An RTM turns 'belief that coverage is enough' into VERIFIABLE EVIDENCE: anyone, even someone new to the project, can check the RTM and immediately know which requirements are safe and which still carry risk.",
        "小さな1機能の規模であれば、テスターは『この機能で何をテストしたか』を頭の中で覚えていられます。しかしBizConnect CRMには数十のモジュール（連絡先、営業機会、サポートチケット、契約、レポート、支店別アクセス権限）があり、複数のリリースにまたがる何百もの要求があります——個人の記憶ではもはや信頼できません。RTMは『十分にテストしたという思い込み』を検証可能な証拠に変えます：プロジェクトに新しく参加した人でも、RTMを参照すればどの要求が安全でどの要求にまだリスクがあるかすぐにわかります。"),
      P("RTM còn là công cụ giao tiếp giữa Test, BA (Business Analyst) và khách hàng doanh nghiệp: khi khách hỏi 'các bạn đã kiểm thử tính năng chuyển cấp SLA chưa, kiểm thử những trường hợp nào', đội dự án có thể trích trực tiếp từ RTM thay vì phải tổng hợp thủ công — điều này đặc biệt quan trọng với CRM doanh nghiệp nơi khách hàng thường yêu cầu bằng chứng kiểm thử (test evidence) như một phần nghiệm thu hợp đồng.",
        "The RTM is also a communication tool between Test, the Business Analyst (BA), and the enterprise client: when the client asks 'have you tested the SLA escalation feature, and which cases', the project team can cite the RTM directly instead of manually compiling an answer — especially important for enterprise CRM, where clients often require test evidence as part of contract acceptance.",
        "RTMはテスト・BA（ビジネスアナリスト）・企業顧客間のコミュニケーションツールでもあります：顧客が『SLAエスカレーション機能はテスト済みか、どのケースをテストしたか』と尋ねたとき、プロジェクトチームは手作業で集計する代わりにRTMを直接引用できます——これは、顧客が契約検収の一部としてテストエビデンスを求めることが多いエンタープライズCRMにおいて特に重要です。"),
      P("Cuối cùng, RTM là nền tảng cho đánh giá tác động thay đổi (change impact analysis) — kỹ năng phân biệt tester nâng cao với tester mới: khi một yêu cầu bị sửa, tester nâng cao không chạy lại TOÀN BỘ bộ test (tốn thời gian, không hiệu quả) cũng không chỉ chạy lại đúng ca liên quan trực tiếp (bỏ sót ảnh hưởng gián tiếp), mà dùng RTM để xác định CHÍNH XÁC phạm vi các test case và yêu cầu liên đới cần rà soát lại.",
        "Finally, the RTM is the foundation for change impact analysis — a skill that separates advanced testers from junior ones: when a requirement changes, an advanced tester neither reruns the ENTIRE test suite (wasteful, inefficient) nor reruns only the directly related case (missing indirect impact), but uses the RTM to determine PRECISELY the scope of test cases and related requirements that need review.",
        "最後に、RTMは変更影響分析の基盤です——これは上級テスターと新人テスターを分けるスキルです：要求が変更されたとき、上級テスターはテストスイート全体を再実行する（無駄で非効率）でも、直接関連するケースだけを再実行する（間接的な影響を見逃す）でもなく、RTMを使ってレビューが必要なテストケースと関連要求の範囲を正確に特定します。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: cấu trúc RTM & quy tắc đặt ID", en: "4. Prepare: RTM structure & ID conventions", ja: "4. 準備：RTMの構造とID命名規則" },
    blocks: [
      P("Trước khi xây RTM cho BizConnect CRM, cần thống nhất cấu trúc cột và quy tắc đặt ID để mọi thành viên (Test, BA, Dev) tra cứu nhất quán, tránh tình trạng mỗi người một kiểu đặt tên khiến RTM không thể tự động hoá về sau.",
        "Before building the RTM for BizConnect CRM, the column structure and ID conventions must be agreed on so every member (Test, BA, Dev) references it consistently, avoiding a mix of naming styles that would prevent later automation.",
        "BizConnect CRM向けRTMを構築する前に、列構成とID命名規則を統一し、全メンバー（テスト・BA・開発）が一貫して参照できるようにする必要があります。命名スタイルがばらばらだと、後で自動化できなくなります。"),
      STEP(1, "Thống nhất quy tắc ID: REQ-xxx cho yêu cầu, TC-xxxx cho test case, và mã defect theo hệ thống theo dõi lỗi hiện có (ví dụ CRM-xxxx trên Jira).", "Agree on ID rules: REQ-xxx for requirements, TC-xxxx for test cases, and defect codes from the existing bug tracker (e.g. CRM-xxxx in Jira).", "ID規則を統一する：要求はREQ-xxx、テストケースはTC-xxxx、欠陥は既存の課題管理システムのコード（例：Jira上のCRM-xxxx）とする。"),
      STEP(2, "Định nghĩa các cột bắt buộc của RTM: Req ID, Mô tả yêu cầu, Mức ưu tiên, TC ID liên kết, Trạng thái TC (Pass/Fail/Chưa chạy), Defect liên kết, Trạng thái phủ.", "Define the RTM's required columns: Req ID, requirement description, priority, linked TC ID, TC status (Pass/Fail/Not run), linked defect, coverage status.", "RTMの必須列を定義する：要求ID、要求の説明、優先度、紐づくTC ID、TCステータス（合格／不合格／未実行）、紐づく欠陥、網羅ステータス。"),
      STEP(3, "Chọn công cụ lưu RTM phù hợp quy mô: bảng tính (Google Sheet/Excel) cho dự án vừa, hoặc test management tool (TestRail, Xray, Zephyr gắn Jira) cho dự án lớn có nhiều release — công cụ này tự động tính độ phủ thay vì đếm tay.", "Choose an RTM storage tool matching project scale: a spreadsheet (Google Sheet/Excel) for mid-sized projects, or a test management tool (TestRail, Xray, Zephyr on Jira) for large multi-release projects — such tools auto-compute coverage instead of manual counting.", "プロジェクト規模に合ったRTM保存ツールを選ぶ：中規模プロジェクトにはスプレッドシート（Google Sheet/Excel）、複数リリースにわたる大規模プロジェクトにはテスト管理ツール（Jira連携のTestRail、Xray、Zephyrなど）——これらは手作業ではなく自動で網羅率を計算する。"),
      TRY("Mở một dự án bạn đang tham gia (hoặc BizConnect CRM giả định) và thử liệt kê quy tắc đặt ID cho yêu cầu/test case/defect nếu dự án đó chưa có.", "Open a project you're on (or the hypothetical BizConnect CRM) and try writing down ID conventions for requirements/test cases/defects if the project doesn't have one yet.", "自分が関わっているプロジェクト（または仮想のBizConnect CRM）を開き、まだない場合は要求／テストケース／欠陥のID命名規則を書き出してみよう。"),
      PITFALL("Đặt ID kiểu tự do, không nhất quán (lúc thì 'YC-01', lúc thì 'Req 1', lúc thì chỉ ghi tên tính năng) khiến RTM không thể lọc/đối chiếu tự động, và rất khó bảo trì khi dự án lớn dần.", "Using free-form, inconsistent IDs (sometimes 'YC-01', sometimes 'Req 1', sometimes just a feature name) makes the RTM impossible to filter/cross-reference automatically, and very hard to maintain as the project grows.", "IDを自由な形式で一貫性なく付ける（『YC-01』だったり『Req 1』だったり機能名だけだったり）と、RTMを自動でフィルタ・照合できなくなり、プロジェクトが大きくなるにつれ保守が非常に困難になる。"),
    ] },
  { heading: { vi: "5. Xây RTM từng bước cho BizConnect CRM (thực hành)", en: "5. Building the RTM step by step for BizConnect CRM (hands-on)", ja: "5. BizConnect CRM向けRTMを一歩ずつ構築する（実習）" },
    blocks: [
      P("Giờ ta áp dụng cấu trúc ở chương 4 vào một tập yêu cầu thật của BizConnect CRM để dựng RTM hoàn chỉnh, có cả forward và backward.",
        "Now let's apply the structure from chapter 4 to a real set of BizConnect CRM requirements to build a complete RTM, with both forward and backward directions.",
        "第4章の構造を、BizConnect CRMの実際の要求セットに適用し、順方向と逆方向を備えた完全なRTMを構築しましょう。"),
      STEP(1, "Liệt kê toàn bộ yêu cầu của phạm vi đang test (ví dụ 5 yêu cầu: REQ-101, REQ-114, REQ-128, REQ-133, REQ-140) kèm mức ưu tiên nghiệp vụ.", "List every requirement in the scope under test (e.g. 5 requirements: REQ-101, REQ-114, REQ-128, REQ-133, REQ-140) with business priority.", "テスト対象範囲の全要求を列挙する（例：REQ-101、REQ-114、REQ-128、REQ-133、REQ-140の5件）とビジネス優先度を付す。"),
      STEP(2, "Với mỗi yêu cầu, gắn TC ID của mọi test case đang kiểm thử nó — một yêu cầu có thể cần NHIỀU test case (ví dụ REQ-101 cần 3 ca: gộp đúng, gộp trùng nhiều lần, huỷ gộp).", "For each requirement, attach the TC IDs of every test case that verifies it — one requirement may need MULTIPLE test cases (e.g. REQ-101 needs 3: correct merge, repeated merge, undo merge).", "各要求に、それを検証する全テストケースのTC IDを紐づける——1つの要求に複数のテストケースが必要な場合がある（例：REQ-101には正しいマージ、複数回のマージ、マージ取り消しの3ケースが必要）。"),
      STEP(3, "Chạy chiều NGƯỢC: liệt kê toàn bộ test case đang tồn tại trong bộ hồi quy, đối chiếu ngược xem còn TC nào KHÔNG xuất hiện ở cột 'TC ID liên kết' của bất kỳ yêu cầu nào — đó là ứng viên test mồ côi.", "Run the REVERSE pass: list every test case existing in the regression suite, cross-check for any TC that does NOT appear in the 'linked TC ID' column of any requirement — those are orphan-test candidates.", "逆方向のパスを実行する：回帰スイートに存在する全テストケースを列挙し、どの要求の『紐づくTC ID』列にも現れないケースがないか照合する——それらが孤立テストの候補となる。"),
      STEP(4, "Gắn defect ID vào ô của yêu cầu tương ứng ngay khi một test case fail và được báo lỗi — để RTM luôn phản ánh 'yêu cầu nào đang có lỗi mở, yêu cầu nào sạch'.", "Attach the defect ID to the corresponding requirement's cell as soon as a test case fails and a bug is logged — so the RTM always reflects 'which requirements have open defects, which are clean'.", "テストケースが失敗しバグが起票されたら、直ちに対応する要求のセルに欠陥IDを紐づける——これによりRTMは常に『どの要求にオープンな欠陥があるか、どれがクリーンか』を反映する。"),
      CODE("text", "RTM RUT GON - BizConnect CRM (trich)\nREQ-101 Gop lien he trung lap        | TC-2201,TC-2202,TC-2203 | CRM-3391 (Open)   | Da phu - co loi mo\nREQ-114 Chuyen cap ticket qua SLA     | (khong co)              | -                 | CHUA PHU\nREQ-128 Dong bo co hoi voi hop dong   | TC-2240                 | CRM-3402 (Closed) | Da phu - da fix\nREQ-133 Phan quyen theo chi nhanh     | TC-2255,TC-2256         | -                 | Da phu - sach\nREQ-140 Bao cao doanh thu theo KH     | TC-2280,TC-2281,TC-2282 | CRM-3410 (Open)   | Da phu - co loi mo\n(doi chieu nguoc) TC-2270 khong xuat hien o cot TC ID lien ket cua yeu cau nao -> TEST MO COI"),
      TRY("Với danh sách 5 yêu cầu ở trên, hãy tự tính % độ phủ (số yêu cầu có ≥1 test case / tổng số yêu cầu) và chỉ ra yêu cầu nào đang là lỗ hổng ưu tiên cao nhất.", "Using the 5 requirements above, calculate the coverage % yourself (requirements with ≥1 test case / total requirements) and point out which requirement is the highest-priority gap.", "上記の5つの要求を使い、網羅率（1つ以上のテストケースを持つ要求数／全要求数）を自分で計算し、最優先で対応すべきギャップがどの要求かを指摘してみよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: yêu cầu quan trọng không có test case nào", en: "6. Situation 1: a critical requirement has no test case at all", ja: "6. シーン1：重要な要求にテストケースが一つもない" },
    blocks: [
      SITUATION("Trước khi vào UAT release 4.2, Test Lead chạy audit RTM định kỳ để rà lại toàn bộ độ phủ yêu cầu của BizConnect CRM.", "Before entering UAT for release 4.2, the Test Lead runs the periodic RTM audit to review BizConnect CRM's overall requirement coverage.",
        "Audit phát hiện REQ-114 (tự động chuyển cấp ticket khi quá hạn SLA) — yêu cầu gắn trực tiếp với điều khoản SLA trong hợp đồng dịch vụ khách hàng doanh nghiệp — có 0 test case liên kết trong RTM. Truy lại lịch sử, yêu cầu này được BA bổ sung giữa sprint để đáp ứng yêu cầu gấp của một khách hàng lớn, nhưng vì thêm ngoài kế hoạch ban đầu nên không ai gán việc viết test case, và không ai phát hiện ra vì mọi báo cáo trạng thái sprint trước đó chỉ nhìn vào 'số ticket Done', không nhìn vào RTM.",
        "The audit finds REQ-114 (auto-escalate a ticket when it breaches SLA) — a requirement directly tied to the SLA clause in an enterprise customer's service contract — has 0 linked test cases in the RTM. Tracing back, this requirement was added mid-sprint by the BA to satisfy an urgent request from a major client, but because it was added outside the original plan, no one was assigned to write test cases for it, and no one noticed because prior sprint status reports only looked at 'tickets marked Done', not the RTM.",
        "リリース4.2のUATに入る前、テストリードが定期的なRTM監査を実施し、BizConnect CRM全体の要求網羅率を見直す。",
        "監査により、REQ-114（SLA期限超過時のチケット自動エスカレーション）——企業顧客のサービス契約のSLA条項に直接関わる要求——がRTM上で紐づくテストケース0件であることが判明。履歴を遡ると、この要求は大口顧客の緊急要望に応えるためスプリント途中でBAが追加したものだが、当初計画外の追加だったためテストケース作成の担当者が割り当てられておらず、以前のスプリント状況報告は『完了チケット数』だけを見てRTMを見ていなかったため誰も気づかなかった。"),
      SOLVE("Ghi nhận đây là RỦI RO ưu tiên cao (không phải bug — vì chưa test thì chưa biết có lỗi hay không), tạo ticket theo dõi riêng, phối hợp BA làm rõ các trường hợp cần kiểm thử (đúng luồng chuyển cấp, đúng biên thời gian SLA theo từng gói dịch vụ, luồng hệ thống lỗi khi đang chuyển cấp), viết bổ sung tối thiểu 3 test case và YÊU CẦU trì hoãn UAT của riêng module này nếu không kịp, thay vì release với lỗ hổng chưa biết trên điều khoản hợp đồng.", "Log this as a HIGH-PRIORITY RISK (not a bug — since it's untested, whether it actually fails is unknown), open a dedicated tracking ticket, work with the BA to clarify the cases to cover (correct escalation flow, SLA time boundary per service tier, system-failure flow during escalation), write at least 3 test cases, and REQUEST delaying this module's UAT if there's not enough time, rather than releasing with an unknown gap on a contract clause.", "これを高優先度リスクとして記録し（未テストのため実際に不具合があるかは不明なのでバグではない）、専用の追跡チケットを起票し、BAと協力してカバーすべきケース（正しいエスカレーションフロー、サービスプラン別のSLA時間境界、エスカレーション中のシステム障害フロー）を明確にし、最低3つのテストケースを追加作成し、時間が足りなければ契約条項に未知のギャップを抱えたままリリースするのではなく、このモジュールのUATを延期するよう要求する。"),
      P("Điểm mấu chốt của tình huống này: lỗ hổng KHÔNG nằm ở việc test viên lười hay thiếu kỹ năng, mà nằm ở QUY TRÌNH — yêu cầu thêm giữa chừng không được đưa vào RTM ngay từ đầu, và báo cáo tiến độ dựa trên trạng thái ticket thay vì độ phủ yêu cầu thực tế nên không ai phát hiện sớm hơn. Đây chính là lý do RTM cần được rà soát ĐỊNH KỲ (không chỉ một lần đầu dự án) và mọi yêu cầu mới — dù nhỏ hay gấp — đều phải được thêm vào RTM ngay khi được chấp nhận vào backlog.",
        "The key point of this situation: the gap is NOT due to a lazy or unskilled tester, but a PROCESS gap — a mid-sprint requirement wasn't added to the RTM from the start, and progress reporting was based on ticket status rather than actual requirement coverage, so no one caught it earlier. This is exactly why an RTM needs PERIODIC review (not just once at project start), and every new requirement — however small or urgent — must be added to the RTM the moment it's accepted into the backlog.",
        "このシーンの要点：ギャップはテスターの怠慢やスキル不足ではなく、プロセスの問題です——スプリント途中の要求が最初からRTMに追加されておらず、進捗報告が実際の要求網羅率ではなくチケットステータスに基づいていたため、誰も早期に気づけませんでした。これこそRTMがプロジェクト開始時の一度だけでなく定期的にレビューされるべき理由であり、どんなに小さくても緊急でも、新しい要求はバックログに受け入れられた瞬間にRTMへ追加されなければならない理由です。"),
      IMG(m_jira, "Ticket rủi ro phát hiện qua audit RTM: REQ-114 chưa từng có test case", "A risk ticket found via RTM audit: REQ-114 has never had a test case", "RTM監査で発見されたリスクチケット：REQ-114には一度もテストケースがなかった"),
      RECAP(["Yêu cầu gắn cam kết hợp đồng/SLA mà 0 test case là rủi ro cao, không phải chuyện nhỏ", "Rà soát RTM phải ĐỊNH KỲ, không chỉ một lần đầu dự án"],
        ["A contract/SLA-bound requirement with 0 test cases is a high risk, not a minor issue", "RTM review must be PERIODIC, not a one-time project-start activity"],
        ["契約／SLAに関わる要求にテストケースが0件なのは重大なリスクであり、些細な問題ではない", "RTMレビューはプロジェクト開始時の一度きりではなく定期的に行う必要がある"]),
    ] },
  { heading: { vi: "7. Tình huống 2: đổi yêu cầu không cập nhật RTM gây sót ca hồi quy", en: "7. Situation 2: a requirement change without RTM update misses a regression case", ja: "7. シーン2：要求変更後にRTMを更新せず回帰ケースを見逃す" },
    blocks: [
      SITUATION("REQ-114 sau đó được viết lại chi tiết hơn: từ 'SLA cố định 24h cho mọi ticket' đổi thành 'SLA phân theo gói dịch vụ — Basic 48h, Pro 24h, Enterprise 8h'. Đội Dev cập nhật code đúng theo yêu cầu mới, nhưng RTM và các test case liên quan vẫn giữ nguyên như đặc tả cũ.", "REQ-114 is later rewritten in more detail: from 'a fixed 24h SLA for every ticket' to 'SLA tiered by service package — Basic 48h, Pro 24h, Enterprise 8h'. The Dev team updates the code to match the new requirement, but the RTM and its related test cases still reflect the old spec.",
        "3 test case cũ (TC-2301, TC-2302, TC-2303) chỉ kiểm thử ngưỡng 24h cố định vẫn PASS bình thường vì vô tình khớp đúng gói Pro — khiến RTM báo 'REQ-114 đã phủ, xanh 100%'. Nhưng thực tế các ngưỡng 48h (Basic) và 8h (Enterprise) chưa từng được kiểm thử; production sau đó phát sinh lỗi: khách hàng gói Enterprise (SLA 8h) bị hệ thống tính theo ngưỡng 24h mặc định, gây chuyển cấp ticket trễ và khách hàng khiếu nại vi phạm hợp đồng.",
        "The 3 old test cases (TC-2301, TC-2302, TC-2303) only test the fixed 24h threshold and still PASS normally because they coincidentally match the Pro tier — making the RTM report 'REQ-114 fully covered, all green'. But in reality the 48h (Basic) and 8h (Enterprise) thresholds were never tested; production later has a bug: an Enterprise customer (8h SLA) gets escalated using the default 24h threshold, causing late escalation and a contract-breach complaint.",
        "REQ-114はその後、より詳細に書き換えられる：『全チケットに固定24時間のSLA』から『サービスプラン別のSLA——Basic 48時間、Pro 24時間、Enterprise 8時間』へ。開発チームは新しい要求に合わせてコードを更新するが、RTMと関連テストケースは旧仕様のまま据え置かれる。",
        "既存の3つのテストケース（TC-2301、TC-2302、TC-2303）は固定24時間の閾値しかテストしておらず、たまたまProプランと一致するため通常どおり合格する——その結果RTMは『REQ-114は完全に網羅済み、全て緑』と報告する。しかし実際には48時間（Basic）と8時間（Enterprise）の閾値は一度もテストされていない。その後本番環境でバグが発生：Enterprise顧客（SLA 8時間）がデフォルトの24時間閾値でエスカレーションされ、エスカレーション遅延と契約違反のクレームにつながる。"),
      SOLVE("Ngay khi một yêu cầu được sửa (dù chỉ là 'chi tiết hoá' chứ không phải yêu cầu hoàn toàn mới), quy trình bắt buộc: (1) đánh dấu yêu cầu đó 'cần rà soát lại' trong RTM, (2) đối chiếu từng test case cũ xem còn phủ đúng đặc tả mới không, (3) viết bổ sung ca cho các trường hợp mới sinh ra (ở đây là 3 ngưỡng SLA theo gói thay vì 1 ngưỡng cố định), (4) chỉ đóng trạng thái 'đã rà soát' sau khi RTM phản ánh đúng đặc tả hiện tại — không được để RTM 'xanh giả' chỉ vì test case cũ tình cờ vẫn pass.", "As soon as a requirement is changed (even just 'refined' rather than entirely new), the mandatory process is: (1) flag that requirement 'needs review' in the RTM, (2) check each old test case against whether it still covers the new spec, (3) write additional cases for newly introduced scenarios (here, 3 tiered SLA thresholds instead of one fixed threshold), (4) only close the 'reviewed' status once the RTM truly reflects the current spec — never leave the RTM 'falsely green' just because old test cases happen to still pass.", "要求が変更されたら（『全く新しい』のではなく『詳細化』であっても）、必須のプロセスは：（1）RTM上でその要求を『要レビュー』とマークする、（2）既存の各テストケースが新仕様をまだ網羅しているか照合する、（3）新たに生じたシナリオ（ここではプラン別の3段階SLA閾値）に対するケースを追加作成する、（4）RTMが現行仕様を正しく反映して初めて『レビュー済み』ステータスをクローズする——既存テストケースがたまたま合格し続けているだけで『偽の緑』のままにしてはならない。"),
      P("Bài học nâng cao ở đây: 'test case PASS' không đồng nghĩa 'yêu cầu được phủ đúng'. Khi yêu cầu thay đổi theo hướng CHIA NHỎ thành nhiều trường hợp (1 ngưỡng → 3 ngưỡng theo gói dịch vụ), test case cũ có thể vô tình vẫn pass vì trùng khớp ngẫu nhiên với MỘT trong các trường hợp mới, tạo cảm giác an toàn giả. RTM chỉ có giá trị khi được cập nhật NGAY tại thời điểm yêu cầu đổi, không phải chờ tới đợt audit định kỳ tiếp theo — đây là khác biệt giữa RTM 'sống' và RTM 'chết'.",
        "The advanced lesson here: 'test case PASSES' does not mean 'requirement is correctly covered'. When a requirement changes by SPLITTING into multiple cases (1 threshold → 3 tiered thresholds), an old test case may coincidentally still pass because it happens to match ONE of the new cases, creating false confidence. An RTM only has value when updated IMMEDIATELY at the moment a requirement changes, not deferred to the next periodic audit — this is the difference between a 'living' RTM and a 'dead' one.",
        "ここでの上級者向けの教訓：『テストケースが合格』は『要求が正しく網羅されている』ことを意味しません。要求が複数のケースに分割される形で変わったとき（1つの閾値→プラン別3段階の閾値）、既存のテストケースは新しいケースのうちの1つとたまたま一致して合格し続け、誤った安心感を生むことがあります。RTMは要求が変わった瞬間に即座に更新されて初めて価値を持ち、次の定期監査まで先延ばしにしてはいけません——これが『生きた』RTMと『死んだ』RTMの違いです。"),
      TRY("Nghĩ về một yêu cầu trong dự án bạn từng làm mà bị 'chia nhỏ' thành nhiều trường hợp theo thời gian (ví dụ 1 mức phí → nhiều mức theo hạng thành viên). Test case cũ có còn phủ đủ các trường hợp mới không?", "Think of a requirement in a project you've worked on that got 'split' into multiple cases over time (e.g. one fee level → multiple levels by membership tier). Do the old test cases still fully cover the new cases?", "以前関わったプロジェクトで、時間とともに複数のケースに『分割』された要求を思い浮かべてみよう（例：1つの料金レベル→会員ランク別の複数レベル）。既存のテストケースは新しいケースを十分に網羅しているだろうか？"),
    ] },
  { heading: { vi: "8. Đo độ phủ & phát hiện lỗ hổng bằng dashboard RTM", en: "8. Measuring coverage & detecting gaps with an RTM dashboard", ja: "8. RTMダッシュボードによる網羅率測定とギャップ検出" },
    blocks: [
      P("Độ phủ yêu cầu (requirement coverage) là chỉ số cốt lõi rút ra từ RTM: % yêu cầu có ít nhất 1 test case đã chạy, trên tổng số yêu cầu trong phạm vi. Tuy nhiên chỉ nhìn con số phần trăm tổng là chưa đủ ở mức nâng cao — cần phân tách theo mức ưu tiên nghiệp vụ: một release có độ phủ 95% nghe có vẻ tốt, nhưng nếu 5% còn lại đúng là các yêu cầu Critical/High như REQ-114 (SLA hợp đồng), con số 95% đó vẫn tiềm ẩn rủi ro release nghiêm trọng.",
        "Requirement coverage is the core metric derived from an RTM: the % of requirements with at least one executed test case, over the total requirements in scope. However, looking only at the overall percentage isn't enough at an advanced level — it needs to be broken down by business priority: a release at 95% coverage sounds good, but if the remaining 5% is exactly the Critical/High requirements like REQ-114 (a contractual SLA), that 95% still hides a serious release risk.",
        "要求網羅率は、RTMから導かれる中心的な指標です：対象範囲の全要求のうち、少なくとも1つのテストケースが実行された要求の割合（%）。しかし上級レベルでは全体のパーセンテージだけを見るのでは不十分です——ビジネス優先度別に分解する必要があります：あるリリースの網羅率が95%というのは良さそうに聞こえますが、残り5%がREQ-114（契約上のSLA）のようなクリティカル／高優先度の要求そのものであれば、その95%は依然として深刻なリリースリスクを隠しています。"),
      IMG(m_dash, "Dashboard độ phủ yêu cầu toàn dự án BizConnect CRM", "Project-wide requirement coverage dashboard for BizConnect CRM", "BizConnect CRMプロジェクト全体の要求網羅率ダッシュボード"),
      P("Dashboard RTM nâng cao nên tách rõ 4 nhóm số liệu như mockup trên: tổng yêu cầu, yêu cầu có test (để biết độ phủ thô), yêu cầu CHƯA có test (lỗ hổng forward — cần xử lý ưu tiên theo mức nghiệp vụ), và test case mồ côi (lỗ hổng backward — cần rà soát định kỳ để không lãng phí tài nguyên CI/CD chạy những ca không còn ý nghĩa). Khi trình bày cho khách hàng doanh nghiệp hoặc quản lý dự án, nên dẫn kèm cả bảng chi tiết (như mockup ở chương 2) chứ không chỉ con số tổng, vì con số tổng dễ che giấu các lỗ hổng ở yêu cầu quan trọng nhất.",
        "An advanced RTM dashboard should clearly split 4 metric groups as in the mockup above: total requirements, requirements with tests (for raw coverage), requirements WITHOUT tests (forward gap — to prioritize by business level), and orphan test cases (backward gap — for periodic review so CI/CD resources aren't wasted running cases with no remaining meaning). When presenting to an enterprise client or project manager, always attach the detailed table (as in chapter 2's mockup) rather than just the summary number, since a summary number can easily hide gaps in the most important requirements.",
        "上級RTMダッシュボードは、上のモックのように4つの指標グループを明確に分けるべきです：総要求数、テスト済み要求（粗い網羅率のため）、未テストの要求（順方向のギャップ——ビジネスレベルで優先度付けする）、孤立テストケース（逆方向のギャップ——もはや意味のないケースを実行してCI/CDリソースを無駄にしないよう定期的にレビューする）。企業顧客やプロジェクトマネージャーに提示する際は、合計数値だけでなく詳細な表（第2章のモックのような）を必ず添付すべきです。合計数値は最も重要な要求のギャップを容易に隠してしまうためです。"),
      TIP("Khi báo cáo độ phủ, luôn kèm thêm 'độ phủ theo mức ưu tiên' (ví dụ 100% Critical, 91.9% tổng thể) — con số tổng một mình rất dễ đánh lừa vì trọng số các yêu cầu không bằng nhau.", "When reporting coverage, always include 'coverage by priority level' (e.g. 100% Critical, 91.9% overall) — an overall number alone is easy to mislead since requirements don't carry equal weight.", "網羅率を報告する際は、必ず『優先度別の網羅率』（例：クリティカル100%、全体91.9%）も併記しよう——要求の重みは均等ではないため、合計数値だけでは誤解を招きやすい。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo khi vận hành RTM nâng cao", en: "9. Common mistakes & tips for running an advanced RTM", ja: "9. 高度なRTM運用でよくある失敗とコツ" },
    blocks: [
      P("Vận hành RTM trên dự án thật dễ vấp phải vài lỗi lặp lại, đặc biệt khi dự án nhiều người và nhiều release song song như BizConnect CRM.",
        "Running an RTM on a real project easily runs into a few recurring mistakes, especially on projects with many people and parallel releases like BizConnect CRM.",
        "実際のプロジェクトでRTMを運用すると、特にBizConnect CRMのように多人数かつ複数リリースが並行するプロジェクトでは、いくつかの繰り返し起こる失敗に陥りやすいです。"),
      PITFALL("Coi RTM là tài liệu 'làm một lần rồi thôi' ở đầu dự án, không gắn vào quy trình Definition of Done của mỗi yêu cầu/sprint — hậu quả là RTM luôn lệch sau với thực tế backlog.", "Treating the RTM as a 'do once at project start' document, not tying it into each requirement's/sprint's Definition of Done — the result is the RTM is always out of sync with the actual backlog.", "RTMを『プロジェクト開始時に一度作ったら終わり』の文書として扱い、各要求／スプリントの完了の定義（Definition of Done）に組み込まないこと——結果としてRTMは常に実際のバックログより遅れてしまう。"),
      PITFALL("Chỉ đếm số lượng test case gắn với yêu cầu để coi là 'đã phủ tốt' mà không xét test case đó còn hợp lệ với đặc tả MỚI NHẤT hay không (như tình huống REQ-114 ở chương 7) — dẫn tới 'phủ giả'.", "Only counting the number of test cases attached to a requirement to call it 'well covered', without checking whether those cases still match the LATEST spec (as in REQ-114's situation in chapter 7) — leading to 'false coverage'.", "要求に紐づくテストケースの数だけを数えて『十分に網羅されている』とみなし、そのケースが最新の仕様にまだ合致しているか確認しないこと（第7章のREQ-114のシーンのように）——『偽の網羅』につながる。"),
      TIP("Gắn việc cập nhật RTM vào checklist 'Definition of Done' của mỗi yêu cầu và mỗi lần đóng defect — biến RTM thành thói quen tự nhiên của quy trình, không phải việc làm thêm cuối kỳ.", "Attach RTM updates to the 'Definition of Done' checklist for every requirement and every defect closure — turn RTM maintenance into a natural process habit, not an extra end-of-cycle chore.", "RTMの更新を、各要求と各欠陥クローズの『完了の定義（Definition of Done）』チェックリストに組み込もう——RTMの保守を、期末の追加作業ではなくプロセスの自然な習慣に変える。"),
      IMG(m_kanban, "Kanban theo dõi khắc phục các lỗ hổng RTM phát hiện được (BizConnect CRM)", "A Kanban board tracking remediation of discovered RTM gaps (BizConnect CRM)", "発見されたRTMギャップの是正を追跡するカンバンボード（BizConnect CRM）"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block, faq4.block,
      INTERNAL("Phân tích yêu cầu để viết test case cho người mới", "Analyzing requirements to write test cases for beginners", "doc-phan-tich-yeu-cau-de-viet-test-case-cho-nguoi-moi", "初心者のためのテストケース作成に向けた要求分析"),
      INTERNAL("Chiến lược và kế hoạch kiểm thử (Test Plan) cho tester", "Test strategy and test plan for testers", "chien-luoc-va-ke-hoach-kiem-thu-test-plan-cho-tester", "テスターのためのテスト戦略とテスト計画"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a test result report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua RTM nâng cao trên dự án CRM chăm sóc khách hàng doanh nghiệp BizConnect CRM: cách xây RTM 2 chiều (forward đo độ phủ, backward tìm test mồ côi), đo độ phủ theo mức ưu tiên thay vì chỉ nhìn con số tổng, và hai tình huống thật cho thấy yêu cầu quan trọng thiếu test hoàn toàn và yêu cầu đổi mà RTM không cập nhật kịp đều có thể gây hậu quả nghiêm trọng tới cam kết hợp đồng SLA. Bạn cũng biết cách dùng RTM để đánh giá tác động thay đổi thay vì chạy lại toàn bộ hoặc bỏ sót ca hồi quy.",
        "You just walked through advanced RTM practice on BizConnect CRM, an enterprise customer-care CRM project: building a bidirectional RTM (forward for coverage, backward for orphan tests), measuring coverage by priority instead of just the overall number, and two real situations showing that a critical requirement with zero tests and a changed requirement whose RTM wasn't updated in time can both seriously breach SLA contract commitments. You also learned to use the RTM for change impact analysis instead of rerunning everything or missing regression cases.",
        "企業向けカスタマーケアCRMプロジェクトBizConnect CRMでの高度なRTM実践を見てきました：双方向RTMの構築（順方向で網羅率、逆方向で孤立テスト）、合計数値だけでなく優先度別の網羅率測定、そしてテストが一切ない重要な要求と、RTMが間に合わずに更新されなかった変更要求の両方がSLA契約義務に重大な違反を引き起こしうる2つの実例。また、全て再実行したり回帰ケースを見逃したりする代わりに、変更影響分析にRTMを活用する方法も学びました。"),
      P("Chặng tiếp theo, bạn nên kết hợp RTM với chiến lược và kế hoạch kiểm thử (Test Plan) để đưa độ phủ yêu cầu vào tiêu chí thoát (exit criteria) chính thức trước mỗi release, cùng cách viết báo cáo kết quả kiểm thử trích dẫn trực tiếp từ RTM để tăng độ tin cậy với khách hàng doanh nghiệp. Nếu muốn thực hành RTM và các kỹ thuật test design nâng cao trên dự án thực chiến cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn áp dụng đúng ngay trong công việc.",
        "Next, you should combine the RTM with a test strategy and test plan to make requirement coverage a formal exit criterion before every release, along with writing test result reports that cite the RTM directly to build trust with enterprise clients. If you want to practice RTM and advanced test design techniques on real projects with a mentor, a proper Tester course will help you apply this correctly on the job right away.",
        "次は、リリースごとの正式な終了基準（exit criteria）に要求網羅率を組み込むため、RTMをテスト戦略・テスト計画と組み合わせるべきです。また、企業顧客からの信頼を高めるため、RTMを直接引用したテスト結果報告書の書き方も身につけましょう。指導者とともに実際のプロジェクトでRTMと高度なテスト設計技法を実践したいなら、体系的なテスターコースが実務ですぐに正しく応用する助けとなります。"),
      CTA(course),
    ] },
];

const RTM_DOC = makeDoc({
  slug: "ma-tran-truy-vet-yeu-cau-rtm-nang-cao-cho-tester",
  domain: "crm",
  primaryKeyword: "ma trận truy vết yêu cầu",
  keywords: ["ma trận truy vết yêu cầu", "RTM", "requirements traceability matrix", "độ phủ yêu cầu", "test case mồ côi", "đánh giá tác động thay đổi"],
  coverLabel: "NÂNG CAO · RTM · CRM",
  crumb: "Ma trận truy vết yêu cầu (RTM) nâng cao cho Tester",
  metaTitle: { vi: "Ma trận truy vết yêu cầu (RTM) nâng cao cho Tester", en: "Advanced requirements traceability matrix (RTM) for testers", ja: "テスターのための高度な要求追跡マトリクス（RTM）" },
  metaDescription: {
    vi: "Ma trận truy vết yêu cầu (RTM) nâng cao trên CRM doanh nghiệp: xây RTM 2 chiều yêu cầu-test case-defect, đo độ phủ, tìm test mồ côi, đánh giá tác động thay đổi.",
    en: "Advanced requirements traceability matrix (RTM) on an enterprise CRM project: build a bidirectional requirement-test case-defect RTM, measure coverage, find orphan tests, assess change impact.",
    ja: "企業向けCRMプロジェクトにおける高度な要求追跡マトリクス（RTM）：要求↔テストケース↔欠陥の双方向RTM構築、網羅率測定、孤立テスト発見、変更影響分析までを解説。",
  },
  title: {
    vi: "Ma trận truy vết yêu cầu (RTM) nâng cao cho Tester: xây RTM 2 chiều trên CRM doanh nghiệp (có trắc nghiệm)",
    en: "Advanced Requirements Traceability Matrix (RTM) for testers: building a bidirectional RTM on an enterprise CRM (with quiz)",
    ja: "テスターのための高度な要求追跡マトリクス（RTM）：企業向けCRMで双方向RTMを構築する（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: xây RTM 2 chiều (yêu cầu ↔ test case ↔ defect) trên dự án CRM chăm sóc khách hàng doanh nghiệp BizConnect CRM. Đo độ phủ yêu cầu theo mức ưu tiên, phát hiện yêu cầu chưa test và test case mồ côi, cập nhật RTM đúng thời điểm, dùng RTM đánh giá tác động thay đổi. Hai tình huống thật (yêu cầu SLA không có test, đổi yêu cầu không cập nhật RTM), nhiều mockup RTM/dashboard/Jira/Kanban, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: build a bidirectional RTM (requirement ↔ test case ↔ defect) on BizConnect CRM, an enterprise customer-care CRM project. Measure requirement coverage by priority, detect untested requirements and orphan test cases, update the RTM at the right time, and use it for change impact analysis. Two real situations (an untested SLA requirement, a requirement change without an RTM update), many RTM/dashboard/Jira/Kanban mockups, FAQ, and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "上級者向け記事：企業向けカスタマーケアCRM「BizConnect CRM」で双方向RTM（要求↔テストケース↔欠陥）を構築する。優先度別の要求網羅率測定、未テスト要求と孤立テストケースの検出、適切なタイミングでのRTM更新、変更影響分析への活用。実例2件（未テストのSLA要求、更新されなかった要求変更）、RTM・ダッシュボード・Jira・カンバンの多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3, faq4],
  howTo: { name: "Cách xây và vận hành RTM 2 chiều", steps: [
    { name: "Chuẩn hoá quy tắc ID và cấu trúc cột RTM", text: "REQ/TC/defect ID nhất quán, cột trạng thái phủ rõ ràng." },
    { name: "Liên kết forward (yêu cầu→test) và backward (test→yêu cầu)", text: "Forward đo độ phủ, backward tìm test mồ côi." },
    { name: "Cập nhật RTM ngay khi yêu cầu/test/defect thay đổi", text: "Không chờ audit định kỳ mới cập nhật, tránh RTM 'phủ giả'." },
  ] },
  pages,
});

export const MA_RTM_01 = [RTM_DOC];
