// doc_ma_domain_analysis.mjs — BÀI MANUAL NÂNG CAO (advanced):
// Phân tích miền & biên nâng cao (Domain Analysis) cho NHIỀU BIẾN PHỤ THUỘC —
// dự án fintech hệ duyệt khoản vay tiêu dùng. Bảng domain matrix (ON/OFF/IN/OUT),
// kỹ thuật n+1 để giảm số ca tổ hợp mà vẫn phủ đủ biên, kể cả biên của các cặp biến
// ràng buộc lẫn nhau (thu nhập, điểm tín dụng, hạn mức, kỳ hạn).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

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
    tags: tags("congnghe", "fintech", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình duyệt vay VayNhanh, annotate các ngưỡng biên ──
const m_screen = browser("vaynhanh.vn/tham-dinh/ho-so/HS-55021", [
  field(30, 20, 330, "Điểm tín dụng (CIC)", "600", "normal"),
  field(388, 20, 330, "Thu nhập/tháng", "8.000.000 ₫", "normal"),
  field(30, 92, 330, "Hạn mức đề nghị", "80.000.000 ₫", "normal"),
  field(388, 92, 330, "Kỳ hạn vay", "60 tháng", "normal"),
  annotate(26, 12, 330, 62, "ON: điểm tín dụng ĐÚNG ngưỡng tối thiểu 600"),
  annotate(384, 12, 330, 62, "ON: thu nhập ĐÚNG ngưỡng tối thiểu 8tr"),
  annotate(384, 84, 330, 62, "ON: kỳ hạn ĐÚNG trần tối đa 60 tháng"),
  btn(30, 168, 200, "Thẩm định", "primary"),
  `<text x="250" y="190" font-size="12" font-weight="800" fill="#e11d48">Kết quả hệ thống: TỪ CHỐI (nghi ngờ sai)</text>`,
].join(""), { h: 240, title: "VayNhanh · Thẩm định khoản vay", accent: "#0f766e" });

// ── Mockup 2: domain matrix cho MỘT biến (điểm tín dụng ≥ 600) ──
const m_matrixSingle = grid("Domain matrix — biến 'Điểm tín dụng' (biên tối thiểu 600)", ["Điểm test", "Giá trị mẫu", "Ký hiệu", "Kỳ vọng"], [
  ["OFF (ngay dưới biên)", "599", "OFF−", "Từ chối — chưa đạt ngưỡng"],
  ["ON (đúng biên)", "600", "ON", "Duyệt — vừa đạt ngưỡng tối thiểu"],
  ["IN (trong miền hợp lệ)", "750", "IN", "Duyệt — an toàn, xa biên"],
  ["OUT (ngoài miền, xa biên)", "300", "OUT", "Từ chối — rủi ro rõ ràng"],
], { accent: "#0f766e", note: "Mỗi biến có 4 điểm test biên chuẩn: ON/OFF xác nhận đúng ranh giới, IN/OUT xác nhận vùng hợp lệ/không hợp lệ." });

// ── Mockup 3: domain matrix nhiều biến phụ thuộc, kỹ thuật n+1 ──
const m_matrixMulti = grid("Domain matrix nhiều biến (kỹ thuật n+1) — Điểm tín dụng × Thu nhập × Kỳ hạn", ["Ca", "Điểm tín dụng", "Thu nhập/tháng", "Kỳ hạn", "Biến đang test tại biên", "Kỳ vọng"], [
  ["DM-01", "750 (IN)", "15.000.000 (IN)", "24 tháng (IN)", "— (ca gốc, mọi biến IN)", "Duyệt"],
  ["DM-02", "600 (ON)", "15.000.000 (IN)", "24 tháng (IN)", "Điểm tín dụng · ON", "Duyệt"],
  ["DM-03", "599 (OFF)", "15.000.000 (IN)", "24 tháng (IN)", "Điểm tín dụng · OFF", "Từ chối"],
  ["DM-04", "750 (IN)", "8.000.000 (ON)", "24 tháng (IN)", "Thu nhập · ON", "Duyệt"],
  ["DM-05", "750 (IN)", "7.999.999 (OFF)", "24 tháng (IN)", "Thu nhập · OFF", "Từ chối"],
  ["DM-06", "750 (IN)", "15.000.000 (IN)", "60 tháng (ON)", "Kỳ hạn · ON", "Duyệt"],
  ["DM-07", "750 (IN)", "8.000.000 (ON)", "60 tháng (ON)", "Thu nhập ON + Kỳ hạn ON (biên KÉP)", "Xét thêm — 2 biến cùng ở biên, rủi ro cộng dồn"],
], { accent: "#0f766e", highlight: 6, note: "n+1: mỗi lần chỉ đẩy 1 biến ra biên, các biến còn lại giữ IN — số ca ~3n+1 thay vì 4ⁿ. Dòng cuối kiểm thêm 1 cặp biên PHỤ THUỘC vì rủi ro không cộng tuyến tính." });

// ── Mockup 4: jira ticket lỗi tại đúng ngưỡng ON ──
const m_jira = jira({
  key: "LOAN-4417", title: "Điểm tín dụng = 600 (đúng ngưỡng tối thiểu) bị hệ thống TỪ CHỐI thay vì DUYỆT",
  type: "Bug", status: "Open", priority: "Critical", severity: "Critical",
  fields: [
    ["Môi trường", "staging · VayNhanh API v3 · hồ sơ HS-55021"],
    ["Điểm test vi phạm", "DM-02 — Điểm tín dụng ON (600), Thu nhập & Kỳ hạn giữ IN"],
    ["Đặc tả", "Quy tắc: điểm tín dụng ≥ 600 → đủ điều kiện xét duyệt"],
    ["Thực tế", "Code kiểm tra 'score > 600' (dùng lớn hơn thay vì lớn hơn hoặc bằng) → 600 bị từ chối"],
    ["Ảnh hưởng", "Từ chối oan mọi hồ sơ đúng ngưỡng tối thiểu — ước tính ~4% hồ sơ/tháng bị chặn sai"],
  ],
});

// ── Mockup 5: kanban theo dõi lỗi tìm được qua domain analysis ──
const m_kanban = kanban("Bảng theo dõi lỗi tại biên (VayNhanh · Sprint 22)", [
  { name: "New", cards: [
    { key: "LOAN-4417", title: "Điểm tín dụng=600 (ON) bị từ chối sai", sev: "Critical" },
    { key: "LOAN-4420", title: "Thu nhập=8.000.000 (ON) + kỳ hạn=60 (ON) duyệt nhầm", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "LOAN-4402", title: "Hạn mức = 10× thu nhập tại biên làm tròn sai", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "LOAN-4390", title: "Kỳ hạn=6 tháng (OFF dưới) vẫn được duyệt", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "LOAN-4355", title: "Thu nhập=7.999.999 (OFF) vẫn qua vòng sơ tuyển", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard hiệu quả domain analysis so với test tổ hợp đầy đủ ──
const m_dash = dashboard("Hiệu quả Domain Analysis — VayNhanh Sprint 22", [
  { label: "Tổ hợp đầy đủ (4⁴)", value: "256", sub: "ca nếu test mọi tổ hợp 4 biến", color: "#64748b" },
  { label: "Ca theo n+1", value: "13", sub: "~95% ca được cắt giảm", color: "#0f766e" },
  { label: "Lỗi tìm tại biên", value: "6", sub: "5/6 là lỗi ON/OFF off-by-one", color: "#e11d48" },
  { label: "Lỗi tại biên KÉP", value: "2", sub: "chỉ lộ khi 2 biến cùng ở biên", color: "#a16207" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Phân tích miền (domain analysis) khác gì với phân vùng tương đương/giá trị biên cơ bản?",
  "How is domain analysis different from basic equivalence partitioning/boundary value analysis?",
  "Phân vùng tương đương và giá trị biên cơ bản thường xử lý TỪNG biến độc lập. Phân tích miền (domain analysis) mở rộng kỹ thuật đó cho hệ thống có NHIỀU biến ràng buộc lẫn nhau: bạn lập một 'domain matrix' liệt kê điểm ON/OFF/IN/OUT cho từng biến, rồi kết hợp chúng có hệ thống (thường bằng kỹ thuật n+1) để phủ cả biên riêng lẻ lẫn biên của các cặp biến phụ thuộc — điều mà kiểm thử biên đơn lẻ dễ bỏ sót.",
  "Basic equivalence partitioning and boundary value analysis usually handle each variable independently. Domain analysis extends that technique to systems with several interdependent variables: you build a 'domain matrix' listing ON/OFF/IN/OUT points for each variable, then combine them systematically (usually with the n+1 technique) to cover both individual boundaries and the boundaries of dependent variable pairs — something single-variable boundary testing easily misses.",
  "ドメイン分析は基本的な同値分割・境界値分析と何が違う？",
  "基本的な同値分割・境界値分析は通常、各変数を独立に扱います。ドメイン分析はこの技法を複数の相互依存変数を持つシステムに拡張したものです：各変数のON/OFF/IN/OUT点を列挙した『domain matrix』を作成し、それらを体系的に（通常n+1技法で）組み合わせて、単一変数の境界だけでなく、依存する変数のペアの境界も網羅します——単一変数の境界テストでは見逃しやすい部分です。");
const faq2 = FAQ(
  "Kỹ thuật n+1 trong domain analysis hoạt động thế nào?",
  "How does the n+1 technique in domain analysis work?",
  "Với n biến, thay vì test mọi tổ hợp 4ⁿ điểm ON/OFF/IN/OUT, kỹ thuật n+1 chọn một ca gốc với TẤT CẢ biến ở giá trị IN, sau đó với mỗi biến lần lượt, giữ nguyên các biến khác ở IN và chỉ đẩy MỘT biến đó qua các điểm ON/OFF/OUT. Số ca cần thiết giảm còn khoảng 3n+1 (n biến × 3 điểm biên, cộng 1 ca gốc), thay vì tăng theo cấp số nhân — vẫn phủ đủ mọi biên đơn lẻ.",
  "With n variables, instead of testing all 4ⁿ combinations of ON/OFF/IN/OUT points, the n+1 technique picks one baseline case with ALL variables at IN, then for each variable in turn, keeps the others at IN and pushes only that ONE variable through its ON/OFF/OUT points. The number of cases needed drops to about 3n+1 (n variables × 3 boundary points, plus 1 baseline case), instead of growing exponentially — while still covering every individual boundary.",
  "ドメイン分析のn+1技法はどう機能する？",
  "n個の変数に対し、ON/OFF/IN/OUTの全4ⁿ組合せをテストする代わりに、n+1技法はまず全変数をIN値にしたベースラインケースを1つ選びます。その後、変数ごとに他の変数はIN値のまま、その変数だけをON/OFF/OUTの各点に動かします。必要なケース数は指数的に増える代わりに約3n+1（n変数×3境界点＋ベースライン1）に減りますが、個々の境界は全て網羅されます。");
const faq3 = FAQ(
  "Vì sao vẫn cần test riêng các cặp biến CÙNG ở biên (biên kép), n+1 chưa đủ sao?",
  "Why still test pairs of variables at the boundary together (double boundary), isn't n+1 enough?",
  "Kỹ thuật n+1 giả định các biến độc lập với nhau — nhưng trong hệ thống thực (như duyệt vay), nhiều biến RÀNG BUỘC lẫn nhau: rủi ro của 'thu nhập vừa đủ ngưỡng' cộng với 'kỳ hạn dài tối đa' có thể không đơn thuần là tổng hai rủi ro riêng lẻ mà tạo ra một quy tắc nghiệp vụ hoàn toàn khác (ví dụ cần xét thêm thủ công). Vì vậy sau khi phủ biên đơn lẻ bằng n+1, bạn nên bổ sung thêm một số ca 'biên kép' có chủ đích cho các cặp biến mà nghiệp vụ biết là có tương tác, thay vì tin rằng n+1 luôn đủ.",
  "The n+1 technique assumes variables are independent of each other — but in a real system (like loan approval), several variables are DEPENDENT on one another: the risk of 'income just at the minimum threshold' combined with 'the longest allowed tenor' may not simply be the sum of two separate risks but trigger an entirely different business rule (e.g. manual review required). So after covering single boundaries with n+1, you should add a few deliberate 'double boundary' cases for variable pairs known by the business to interact, rather than assuming n+1 is always enough.",
  "境界にある変数のペア（二重境界）を個別にテストする必要があるのはなぜ？n+1では不十分？",
  "n+1技法は変数が互いに独立していると仮定します——しかし実際のシステム（融資審査など）では多くの変数が互いに依存しています：『収入がちょうど最低閾値』と『許容される最長期間』の組合せのリスクは、単純に2つの個別リスクの合計ではなく、全く別の業務ルール（例：手動審査が必要）を発動させることがあります。そのため単一境界をn+1で網羅した後、業務上相互作用が知られている変数ペアに対して意図的な『二重境界』ケースを追加すべきで、n+1が常に十分だと想定すべきではありません。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Phân tích miền (domain analysis) chủ yếu mở rộng điều gì so với giá trị biên cơ bản?", en: "What does domain analysis mainly extend compared to basic boundary value analysis?", ja: "ドメイン分析は基本的な境界値分析に比べ主に何を拡張する？" },
    options: [
      { vi: "Kiểm thử hiệu năng của hệ thống", en: "Performance testing of the system", ja: "システムの性能テスト" },
      { vi: "Kiểm thử biên có hệ thống cho NHIỀU biến ràng buộc lẫn nhau, kể cả biên phụ thuộc", en: "Systematic boundary testing for MULTIPLE interdependent variables, including dependent boundaries", ja: "相互に依存する複数変数への体系的な境界テスト、依存する境界を含む" },
      { vi: "Kiểm thử giao diện người dùng", en: "User interface testing", ja: "ユーザーインターフェースのテスト" },
      { vi: "Kiểm thử bảo mật đăng nhập", en: "Login security testing", ja: "ログインのセキュリティテスト" },
    ], correct: 1,
    explain: { vi: "Domain analysis xử lý hệ thống nhiều biến ràng buộc lẫn nhau bằng domain matrix, thay vì chỉ xét từng biến riêng lẻ.", en: "Domain analysis handles systems with several interdependent variables via a domain matrix, instead of only examining each variable separately.", ja: "ドメイン分析はdomain matrixを使い、各変数を個別に見るのではなく相互依存する複数変数のシステムを扱います。" },
  }),
  mcq({
    q: { vi: "Trong domain matrix, điểm 'ON' nghĩa là gì?", en: "In a domain matrix, what does the 'ON' point mean?", ja: "domain matrixで『ON』点とは何を意味する？" },
    options: [
      { vi: "Giá trị nằm sâu trong miền hợp lệ, xa ranh giới", en: "A value deep inside the valid domain, far from the boundary", ja: "有効ドメインの奥深く、境界から遠い値" },
      { vi: "Giá trị đúng ngay tại ranh giới (biên) đang test", en: "A value exactly at the boundary being tested", ja: "テスト対象の境界にちょうどある値" },
      { vi: "Giá trị ngẫu nhiên bất kỳ, không liên quan biên", en: "Any random value unrelated to the boundary", ja: "境界に関係のない任意のランダムな値" },
      { vi: "Giá trị luôn gây lỗi hệ thống", en: "A value that always crashes the system", ja: "必ずシステムをクラッシュさせる値" },
    ], correct: 1,
    explain: { vi: "ON là giá trị đúng tại ranh giới (ví dụ điểm tín dụng = 600 khi ngưỡng là ≥600), dùng để xác nhận biên được xử lý đúng.", en: "ON is the value exactly at the boundary (e.g. credit score = 600 when the threshold is ≥600), used to confirm the boundary is handled correctly.", ja: "ONは境界にちょうどある値（例：閾値が≥600の時、信用スコア＝600）で、境界が正しく処理されるか確認するために使います。" },
  }),
  mcq({
    q: { vi: "Kỹ thuật n+1 giúp giảm số ca kiểm thử bằng cách nào?", en: "How does the n+1 technique reduce the number of test cases?", ja: "n+1技法はどのようにテストケース数を減らす？" },
    options: [
      { vi: "Bỏ hẳn việc test biên, chỉ test giá trị IN", en: "Skipping boundary testing entirely, only testing IN values", ja: "境界テストを完全に省き、IN値だけをテストする" },
      { vi: "Test ngẫu nhiên một vài tổ hợp bất kỳ trong 4ⁿ tổ hợp", en: "Randomly testing a few of the 4ⁿ combinations", ja: "4ⁿ組合せの中からランダムにいくつか選んでテストする" },
      { vi: "Giữ các biến khác ở giá trị IN, mỗi lần chỉ đẩy MỘT biến qua các điểm biên", en: "Keeping the other variables at IN and pushing only ONE variable through its boundary points at a time", ja: "他の変数をIN値に保ち、一度に1つの変数だけを境界点に動かす" },
      { vi: "Tăng số biến lên n+1 để kiểm tra kỹ hơn", en: "Increasing the number of variables to n+1 for more thorough checking", ja: "変数の数をn+1に増やしてより詳細に検証する" },
    ], correct: 2,
    explain: { vi: "n+1 giữ các biến còn lại ở IN và lần lượt đẩy từng biến qua ON/OFF/OUT, giảm số ca từ 4ⁿ xuống còn khoảng 3n+1 mà vẫn phủ biên đơn lẻ.", en: "n+1 keeps the other variables at IN and pushes each variable through ON/OFF/OUT in turn, cutting cases from 4ⁿ to about 3n+1 while still covering single boundaries.", ja: "n+1は他の変数をINに保ち、各変数を順にON/OFF/OUTへ動かすことで、単一境界を網羅しつつケース数を4ⁿから約3n+1に削減します。" },
  }),
  mcq({
    q: { vi: "Vì sao hồ sơ có điểm tín dụng = 600 (đúng ngưỡng ≥600) bị hệ thống VayNhanh từ chối sai trong ví dụ ở bài?", en: "Why did a profile with credit score = 600 (exactly at the ≥600 threshold) get wrongly rejected by VayNhanh in the article's example?", ja: "記事の例で、信用スコア＝600（閾値≥600ちょうど）のプロフィールがVayNhanhで誤って却下されたのはなぜ？" },
    options: [
      { vi: "Vì mất kết nối mạng khi thẩm định", en: "Because the network dropped during review", ja: "審査中にネットワークが切断されたから" },
      { vi: "Vì code kiểm tra dùng 'score > 600' thay vì 'score >= 600' (lỗi off-by-one tại điểm ON)", en: "Because the code used 'score > 600' instead of 'score >= 600' (an off-by-one bug at the ON point)", ja: "コードが『score >= 600』ではなく『score > 600』を使っていたため（ON点でのoff-by-oneバグ）" },
      { vi: "Vì thu nhập của khách hàng quá thấp", en: "Because the customer's income was too low", ja: "顧客の収入が低すぎたから" },
      { vi: "Vì kỳ hạn vay vượt quá giới hạn cho phép", en: "Because the loan tenor exceeded the allowed limit", ja: "融資期間が許容限度を超えていたから" },
    ], correct: 1,
    explain: { vi: "Đây là lỗi off-by-one kinh điển tại điểm ON: dùng toán tử '>' thay vì '>=' khiến giá trị đúng biên bị từ chối oan.", en: "This is a classic off-by-one bug at the ON point: using '>' instead of '>=' wrongly rejects the exact boundary value.", ja: "これはON点での典型的なoff-by-oneバグです：『>=』ではなく『>』を使ったため、境界ちょうどの値が誤って却下されました。" },
  }),
  mcq({
    q: { vi: "Vì sao cần thêm ca 'biên kép' (thu nhập ON + kỳ hạn ON cùng lúc) ngoài các ca n+1 riêng lẻ?", en: "Why add a 'double boundary' case (income ON + tenor ON at the same time) besides the individual n+1 cases?", ja: "個別のn+1ケースに加え『二重境界』ケース（収入ONと期間ONを同時に）を追加する理由は？" },
    options: [
      { vi: "Vì n+1 không bao giờ đúng", en: "Because n+1 is never correct", ja: "n+1は決して正しくないから" },
      { vi: "Vì hai biến phụ thuộc cùng ở biên có thể kích hoạt một quy tắc nghiệp vụ khác mà test riêng lẻ từng biến không lộ ra", en: "Because two dependent variables at the boundary together can trigger a different business rule that testing each variable separately won't reveal", ja: "依存する2変数が同時に境界にあると、各変数を個別にテストしても現れない別の業務ルールが発動することがあるから" },
      { vi: "Vì chỉ để tăng số lượng ca cho đẹp báo cáo", en: "Just to inflate the case count for a nicer report", ja: "報告書の見栄えのためにケース数を増やすだけ" },
      { vi: "Vì hệ thống fintech không có quy tắc phụ thuộc nào", en: "Because fintech systems have no dependent rules at all", ja: "フィンテックシステムには依存ルールが一切ないから" },
    ], correct: 1,
    explain: { vi: "Rủi ro của các biến ràng buộc lẫn nhau không luôn cộng tuyến tính; ca biên kép giúp lộ ra quy tắc nghiệp vụ đặc biệt (như 'xét thêm thủ công') chỉ xuất hiện khi cả hai biến cùng ở biên.", en: "Risk from interdependent variables doesn't always add linearly; a double-boundary case exposes special business rules (like 'manual review') that only appear when both variables are at the boundary together.", ja: "相互依存する変数のリスクは常に線形に加算されるわけではありません。二重境界ケースは、両変数が同時に境界にある時だけ現れる特別な業務ルール（『手動審査』など）を露出させます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Phân tích miền (domain analysis) là kỹ thuật kiểm thử biên NÂNG CAO cho hệ thống có nhiều biến ràng buộc lẫn nhau — không chỉ xét biên của một biến riêng lẻ. Bài này bám hệ duyệt khoản vay tiêu dùng của fintech VayNhanh: điểm tín dụng, thu nhập, hạn mức, kỳ hạn cùng ảnh hưởng tới quyết định duyệt/từ chối. Bạn học cách lập domain matrix (điểm ON/OFF/IN/OUT), dùng kỹ thuật n+1 để giảm số ca mà vẫn phủ đủ biên, và bổ sung ca 'biên kép' cho các cặp biến phụ thuộc. Nhiều mockup, 2 tình huống lỗi thật và trắc nghiệm cuối bài.",
        "Domain analysis is an ADVANCED boundary-testing technique for systems with several interdependent variables — not just the boundary of one variable alone. This article follows the consumer loan approval system of fintech VayNhanh: credit score, income, loan limit and tenor all jointly affect the approve/reject decision. You'll learn to build a domain matrix (ON/OFF/IN/OUT points), use the n+1 technique to cut cases while still covering every boundary, and add 'double boundary' cases for dependent variable pairs. Many mockups, two real bug situations and a quiz at the end.",
        "ドメイン分析は、単一変数の境界だけでなく複数の相互依存変数を持つシステム向けの上級境界テスト技法です。本記事はフィンテックVayNhanhの消費者ローン審査システムに沿います：信用スコア・収入・融資限度額・期間が共に承認/却下の判断に影響します。domain matrix（ON/OFF/IN/OUT点）の作り方、境界を網羅しつつケースを削減するn+1技法、依存する変数ペア向けの『二重境界』ケースの追加方法を学びます。多数のモック、2つの実例バグ、最後にクイズ付き。"),
      P("Nếu bạn đã quen với phân vùng tương đương và giá trị biên cơ bản (test min-1, min, max, max+1 cho một trường), chương này đưa bạn lên một tầm cao hơn: điều gì xảy ra khi HAI hay NHIỀU trường cùng ảnh hưởng tới một quyết định, và biên của trường này lại phụ thuộc vào giá trị của trường khác? Đó chính là bài toán thường gặp ở các hệ thống fintech, bảo hiểm, chấm điểm rủi ro — nơi một quy tắc duyệt/từ chối không bao giờ chỉ dựa trên một con số đơn lẻ.",
        "If you're already comfortable with basic equivalence partitioning and boundary values (testing min-1, min, max, max+1 for one field), this chapter takes you a level higher: what happens when TWO or MORE fields jointly affect a decision, and the boundary of one field depends on the value of another? This is a common problem in fintech, insurance, and risk-scoring systems — where an approve/reject rule is never based on a single lone number.",
        "同値分割と基本的な境界値（1項目でmin-1, min, max, max+1をテスト）に慣れているなら、本章はさらに一段上のレベルへ導きます：2つ以上の項目が共に1つの判断に影響し、ある項目の境界が別の項目の値に依存する場合はどうなるか？これはフィンテック・保険・リスクスコアリングシステムでよくある課題です——承認/却下ルールが単一の数値だけに基づくことは決してありません。"),
      IMG(m_screen, "Màn hình test: hồ sơ vay VayNhanh với 3 biến cùng ở đúng ngưỡng ON (điểm tín dụng, thu nhập, kỳ hạn)", "Screen under test: a VayNhanh loan profile with 3 variables simultaneously at the ON threshold (credit score, income, tenor)", "テスト対象画面：信用スコア・収入・期間の3変数が同時にON閾値にあるVayNhanhのローン案件"),
      DEF("Domain Analysis", "kỹ thuật thiết kế ca kiểm thử biên có hệ thống cho nhiều biến ràng buộc lẫn nhau, dùng domain matrix (ON/OFF/IN/OUT) và kỹ thuật n+1 để giảm số ca mà vẫn phủ đủ biên, kể cả biên phụ thuộc giữa các biến.",
        "a systematic boundary-test-design technique for several interdependent variables, using a domain matrix (ON/OFF/IN/OUT) and the n+1 technique to reduce cases while still covering every boundary, including dependent boundaries between variables.",
        "相互に依存する複数の変数に対する体系的な境界テスト設計技法。domain matrix（ON/OFF/IN/OUT）とn+1技法を用い、変数間の依存境界を含めて全境界を網羅しつつケース数を削減する。"),
    ] },
  { heading: { vi: "2. Bốn điểm test của domain matrix: ON, OFF, IN, OUT", en: "2. The four test points of a domain matrix: ON, OFF, IN, OUT", ja: "2. domain matrixの4つのテスト点：ON、OFF、IN、OUT" },
    blocks: [
      P("Với mỗi biến có ràng buộc biên, domain analysis định nghĩa 4 điểm test chuẩn thay vì chỉ 2 (min/max) như giá trị biên cơ bản. ON là giá trị đúng ngay tại ranh giới. OFF là giá trị sát biên nhưng ở phía ĐỐI DIỆN với ON — thường lệch đúng một đơn vị nhỏ nhất có ý nghĩa (ví dụ 1 đồng, 1 điểm, 1 tháng). IN là một giá trị đại diện nằm sâu trong miền hợp lệ, còn OUT là một giá trị đại diện nằm rõ ràng ngoài miền hợp lệ.",
        "For each variable with a boundary constraint, domain analysis defines 4 standard test points instead of just 2 (min/max) as in basic boundary values. ON is the value exactly at the boundary. OFF is a value right next to the boundary but on the OPPOSITE side from ON — usually offset by exactly one meaningful smallest unit (e.g. 1 currency unit, 1 point, 1 month). IN is a representative value deep inside the valid domain, while OUT is a representative value clearly outside the valid domain.",
        "境界制約を持つ各変数に対し、ドメイン分析は基本的な境界値の2点（min/max）ではなく4つの標準テスト点を定義します。ONは境界ちょうどの値。OFFはONの反対側にある境界に隣接する値です——通常、意味のある最小単位（1通貨単位、1点、1ヶ月など）ちょうど分ずれています。INは有効ドメインの奥深くにある代表値、OUTは明確に有効ドメイン外にある代表値です。"),
      IMG(m_matrixSingle, "Domain matrix cho một biến: điểm tín dụng với ngưỡng tối thiểu 600", "Domain matrix for one variable: credit score with a minimum threshold of 600", "1変数のdomain matrix：最低閾値600の信用スコア"),
      P("Sự khác biệt so với giá trị biên cơ bản không phải ở tên gọi, mà ở CÁCH BẠN DÙNG 4 điểm này khi hệ thống có nhiều biến: bạn không dừng ở việc lập một bảng riêng cho từng biến, mà tổ chức chúng thành một 'domain matrix' — một bảng tổng thể cho phép bạn nhìn thấy TẤT CẢ các biến và điểm test của chúng cùng lúc, chuẩn bị cho bước kết hợp ở chương sau.",
        "The difference from basic boundary values isn't the naming, but HOW YOU USE these 4 points when a system has multiple variables: you don't stop at building a separate table per variable, but organize them into a 'domain matrix' — one overall table letting you see ALL the variables and their test points at once, preparing for the combination step in the next chapter.",
        "基本的な境界値との違いは名称ではなく、システムに複数の変数がある時にこの4点をどう使うかにあります：変数ごとに別々の表を作って終わるのではなく、それらを『domain matrix』——全変数とそのテスト点を一度に見渡せる総合表——にまとめ、次章の組合せステップに備えます。"),
      DEF("ON / OFF", "ON là giá trị đúng tại ranh giới; OFF là giá trị sát biên ở phía đối diện với ON, lệch một đơn vị nhỏ nhất có ý nghĩa.",
        "ON is the value exactly at the boundary; OFF is the value right next to the boundary on the opposite side from ON, offset by the smallest meaningful unit.",
        "ONは境界ちょうどの値。OFFはONの反対側で境界に隣接する値で、意味のある最小単位分ずれている。"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở hệ duyệt vay fintech", en: "3. Why it matters for a fintech loan-approval system", ja: "3. フィンテックのローン審査システムで重要な理由" },
    blocks: [
      P("Ở VayNhanh, quyết định duyệt hay từ chối một khoản vay không dựa vào một biến đơn lẻ mà dựa trên TỔ HỢP của điểm tín dụng, thu nhập, hạn mức đề nghị và kỳ hạn — mà hạn mức tối đa lại được TÍNH TỪ thu nhập (ví dụ hạn mức ≤ 10 lần thu nhập tháng), tức là biên của biến này phụ thuộc vào giá trị của biến kia. Đây chính là kiểu hệ thống mà domain analysis được sinh ra để phục vụ.",
        "At VayNhanh, deciding to approve or reject a loan doesn't rely on a single variable but on the COMBINATION of credit score, income, requested limit and tenor — and the maximum limit is itself CALCULATED FROM income (e.g. limit ≤ 10× monthly income), meaning one variable's boundary depends on another variable's value. This is exactly the kind of system domain analysis was designed to serve.",
        "VayNhanhでは、融資の承認/却下の判断は単一変数ではなく、信用スコア・収入・希望限度額・期間の組合せに基づきます——そして最大限度額自体が収入から計算されます（例：限度額≤月収の10倍）。つまり、ある変数の境界が別の変数の値に依存しているのです。これはまさにドメイン分析が対応するために作られたシステムの典型です。"),
      P("Nếu chỉ test biên từng biến độc lập, bạn dễ bỏ sót đúng những trường hợp nguy hiểm nhất: khi hai biến CÙNG nằm ở biên, hệ thống có thể áp dụng một nhánh xử lý hoàn toàn khác (ví dụ chuyển sang duyệt thủ công) mà chưa từng được kiểm chứng. Với một tổ chức tín dụng, một lỗ hổng như vậy có thể dẫn tới duyệt nhầm khoản vay rủi ro cao trên diện rộng, hoặc từ chối oan hàng loạt khách hàng đủ điều kiện — cả hai đều tốn kém và ảnh hưởng tuân thủ quy định cho vay tiêu dùng.",
        "If you only test each variable's boundary independently, you easily miss exactly the most dangerous cases: when two variables land on the boundary TOGETHER, the system may apply a completely different processing branch (e.g. switching to manual review) that has never been verified. For a lender, such a gap can lead to widespread wrongful approval of high-risk loans, or mass wrongful rejection of eligible customers — both costly and a compliance risk for consumer lending.",
        "各変数の境界を独立にしかテストしなければ、最も危険なケースをまさに見逃します：2つの変数が同時に境界に達すると、システムは検証されたことのない全く別の処理分岐（例：手動審査への切替）を適用することがあります。貸し手にとって、そのような穴は高リスク融資の広範な誤承認、または適格顧客の大量の誤却下につながりかねません——どちらもコストがかかり、消費者金融のコンプライアンスリスクとなります。"),
      P("Vì vậy, một tester biết lập domain matrix cho nhiều biến phụ thuộc — thay vì chỉ kiểm biên từng ô riêng lẻ — chính là người bảo vệ được cả độ chính xác nghiệp vụ lẫn tuân thủ quy định của hệ thống fintech, đồng thời vẫn giữ số lượng ca kiểm thử ở mức khả thi nhờ kỹ thuật n+1.",
        "So a tester who can build a domain matrix for multiple dependent variables — rather than only checking each field's boundary in isolation — is the one protecting both business accuracy and regulatory compliance of a fintech system, while still keeping the test-case count feasible thanks to the n+1 technique.",
        "したがって、各項目の境界を個別にチェックするだけでなく、複数の依存変数のdomain matrixを構築できるテスターこそが、フィンテックシステムの業務精度と規制順守の両方を守る存在であり、n+1技法のおかげでテストケース数も実行可能な範囲に保てます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: xác định biến, ràng buộc & điểm biên", en: "4. Prepare: identify variables, constraints & boundary points", ja: "4. 準備：変数・制約・境界点の特定" },
    blocks: [
      P("Trước khi vẽ được domain matrix, bạn cần đọc kỹ đặc tả nghiệp vụ để tách bạch được biến nào ĐỘC LẬP và biến nào PHỤ THUỘC vào biến khác — đây là bước dễ bị bỏ qua nhất nhưng quyết định độ chính xác của toàn bộ bảng.",
        "Before you can draw a domain matrix, you need to read the business spec carefully to separate which variables are INDEPENDENT and which are DEPENDENT on another variable — this is the most easily skipped step, yet it determines the accuracy of the entire table.",
        "domain matrixを描く前に、業務仕様を丁寧に読み、どの変数が独立でどの変数が別の変数に依存するかを切り分ける必要があります——これは最も見落とされやすいステップですが、表全体の精度を決めます。"),
      STEP(1, "Liệt kê mọi biến ảnh hưởng tới quyết định duyệt/từ chối: điểm tín dụng, thu nhập, hạn mức, kỳ hạn.", "List every variable affecting the approve/reject decision: credit score, income, limit, tenor.", "承認/却下の判断に影響する全変数を列挙：信用スコア、収入、限度額、期間。"),
      STEP(2, "Với mỗi biến, xác định ranh giới (min/max) và công thức nếu biên đó PHỤ THUỘC biến khác (ví dụ hạn mức ≤ 10× thu nhập).", "For each variable, identify the boundary (min/max) and the formula if that boundary DEPENDS on another variable (e.g. limit ≤ 10× income).", "各変数について境界（min/max）を特定し、その境界が別の変数に依存する場合は式も特定する（例：限度額≤収入の10倍）。"),
      STEP(3, "Với biến độc lập, xác định 4 điểm ON/OFF/IN/OUT như chương 2.", "For independent variables, define the 4 ON/OFF/IN/OUT points as in chapter 2.", "独立変数について、第2章の通り4点ON/OFF/IN/OUTを定義する。"),
      TRY("Đọc đặc tả 'kỳ hạn tối đa = 60 tháng nếu thu nhập ≥ 8 triệu, ngược lại tối đa 24 tháng' — biến nào phụ thuộc biến nào ở đây?", "Read the spec 'max tenor = 60 months if income ≥ 8 million, otherwise max 24 months' — which variable depends on which here?", "『収入≥800万なら最長期間=60ヶ月、そうでなければ最長24ヶ月』という仕様を読み、どの変数がどの変数に依存するか考えよう。"),
      PITFALL("Coi mọi biến là độc lập rồi lập 4 bảng ON/OFF/IN/OUT riêng biệt không liên hệ gì nhau — bỏ lỡ đúng phần giá trị nhất của domain analysis: biên PHỤ THUỘC.", "Treating every variable as independent and building 4 separate, unrelated ON/OFF/IN/OUT tables — missing exactly the most valuable part of domain analysis: DEPENDENT boundaries.", "全変数を独立とみなし、互いに無関係な4つの別々のON/OFF/IN/OUT表を作ること——ドメイン分析の最も価値ある部分、すなわち依存境界を見逃す。"),
      IMG(m_matrixSingle, "Điểm khởi đầu: domain matrix của MỘT biến độc lập trước khi kết hợp", "Starting point: the domain matrix of ONE independent variable before combining", "出発点：組合せ前の1つの独立変数のdomain matrix"),
    ] },
  { heading: { vi: "5. Lập domain matrix nhiều biến & sinh ca theo n+1", en: "5. Building a multi-variable domain matrix & deriving cases with n+1", ja: "5. 多変数domain matrixの作成とn+1によるケース導出" },
    blocks: [
      P("Đây là bước lõi của bài: gộp các bảng ON/OFF/IN/OUT riêng lẻ thành MỘT domain matrix, rồi dùng kỹ thuật n+1 để sinh ca mà không rơi vào bùng nổ tổ hợp 4ⁿ.",
        "This is the core step: merge the separate ON/OFF/IN/OUT tables into ONE domain matrix, then use the n+1 technique to derive cases without falling into 4ⁿ combinatorial explosion.",
        "これが本記事の核心ステップです：別々のON/OFF/IN/OUT表を1つのdomain matrixに統合し、4ⁿの組合せ爆発に陥らずn+1技法でケースを導出します。"),
      STEP(1, "Chọn 1 ca gốc với TẤT CẢ biến ở giá trị IN — đây là ca 'bình thường, an toàn' làm mốc so sánh.", "Pick 1 baseline case with ALL variables at IN — a 'normal, safe' case as your comparison anchor.", "全変数をIN値にした1つのベースラインケースを選ぶ——比較基準となる『通常・安全』なケース。"),
      STEP(2, "Với từng biến, giữ các biến khác ở IN, lần lượt đẩy biến đó qua ON rồi OFF (và OUT nếu cần) — mỗi lần chỉ đổi 1 biến.", "For each variable, keep the others at IN, push that one variable through ON then OFF (and OUT if needed) in turn — changing only 1 variable at a time.", "各変数について、他の変数はINのまま、その変数だけをON、次にOFF（必要ならOUTも）へ順に動かす——一度に1変数だけ変更する。"),
      STEP(3, "Sau khi phủ hết biên đơn lẻ, chọn thêm 1–2 cặp biến mà nghiệp vụ biết là RÀNG BUỘC nhau (ví dụ thu nhập–kỳ hạn), đẩy CẢ HAI cùng ra biên trong cùng một ca.", "After covering all single boundaries, pick 1–2 pairs of variables the business knows are DEPENDENT (e.g. income–tenor), and push BOTH to the boundary together in the same case.", "全ての単一境界を網羅した後、業務上依存関係にあると分かっている変数ペア（例：収入と期間）を1〜2組選び、同じケースで両方を同時に境界へ動かす。"),
      CODE("text", "SINH CA THEO n+1 (n=3 bien: Diem tin dung, Thu nhap, Ky han)\nCa goc (IN,IN,IN): DM-01 -> Duyet\n\nBien 1 - Diem tin dung (giu Thu nhap=IN, Ky han=IN):\n  ON (600)  -> DM-02 -> Duyet\n  OFF (599) -> DM-03 -> Tu choi\n\nBien 2 - Thu nhap (giu Diem tin dung=IN, Ky han=IN):\n  ON (8.000.000)   -> DM-04 -> Duyet\n  OFF (7.999.999)  -> DM-05 -> Tu choi\n\nBien 3 - Ky han (giu Diem tin dung=IN, Thu nhap=IN):\n  ON (60 thang) -> DM-06 -> Duyet\n\n=> 6 ca don le (thay vi toi da 4^3=64 to hop)\nBIEN KEP co chu dich - Thu nhap ON + Ky han ON cung luc:\n  DM-07 -> Xet them (rui ro cong don, khac voi tung ca rieng le)"),
      IMG(m_matrixMulti, "Domain matrix nhiều biến theo kỹ thuật n+1, gồm 1 ca biên kép cho cặp biến phụ thuộc", "A multi-variable domain matrix using the n+1 technique, with 1 double-boundary case for a dependent variable pair", "n+1技法による多変数domain matrix、依存変数ペア向けの二重境界ケース1つを含む"),
      TIP("Chỉ thêm ca 'biên kép' cho các cặp biến mà đặc tả hoặc chuyên gia nghiệp vụ xác nhận có tương tác — đừng thêm tràn lan mọi cặp có thể, sẽ mất hết lợi ích giảm ca của n+1.", "Only add 'double boundary' cases for pairs the spec or a business expert confirms interact — don't add every possible pair indiscriminately, or you lose all of n+1's case-reduction benefit.", "仕様や業務専門家が相互作用を確認したペアにのみ『二重境界』ケースを追加すること——あらゆる可能なペアを無差別に追加すると、n+1のケース削減の利点を失います。"),
    ] },
  { heading: { vi: "6. Tình huống 1: từ chối sai đúng tại ngưỡng điểm tín dụng", en: "6. Situation 1: wrongly rejected exactly at the credit-score threshold", ja: "6. シーン1：信用スコア閾値ちょうどで誤って却下" },
    blocks: [
      SITUATION("Đội chỉ test điểm tín dụng bằng 2 ca 'rõ ràng đạt' (750) và 'rõ ràng không đạt' (300), không có ca đúng tại ngưỡng 600.", "The team only tests credit score with 2 'clearly passing' (750) and 'clearly failing' (300) cases, no case exactly at the 600 threshold.",
        "Chạy ca DM-02 (điểm tín dụng = 600, đúng ON, các biến khác giữ IN) theo domain matrix, hệ thống trả về TỪ CHỐI thay vì DUYỆT như đặc tả yêu cầu (≥600 là đủ điều kiện).",
        "Running case DM-02 (credit score = 600, exactly ON, other variables held at IN) from the domain matrix, the system returns REJECT instead of APPROVE as the spec requires (≥600 is eligible).",
        "チームは信用スコアを『明らかに合格』（750）と『明らかに不合格』（300）の2ケースのみでテストし、閾値600ちょうどのケースがない。",
        "domain matrixのDM-02ケース（信用スコア＝600、ちょうどON、他の変数はIN）を実行すると、仕様（≥600で適格）に反しシステムはDUYỆT（承認）ではなくTỪ CHỐI（却下）を返す。"),
      SOLVE("Báo lỗi Critical với đúng ca ON kèm giá trị chính xác (600, không phải khoảng 'gần 600'), đối chiếu code kiểm tra dùng '>' thay vì '>=' — sửa toán tử và bổ sung ca ON vào bộ hồi quy vĩnh viễn.", "File a Critical bug with the exact ON case and value (600, not a range 'near 600'), tracing the code comparison that used '>' instead of '>='; fix the operator and permanently add the ON case to the regression suite.", "正確なON値（『600付近』ではなく600）を持つケースでCriticalバグを起票し、『>=』ではなく『>』を使ったコード比較を突き止める。演算子を修正し、ONケースを回帰テストスイートに恒久的に追加する。"),
      P("Bài học ở đây rất rõ: 'rõ ràng đạt' và 'rõ ràng không đạt' KHÔNG thay thế được ca ON. Off-by-one (nhầm '>' với '>=') là loại lỗi kinh điển chỉ lộ ra đúng tại ranh giới — càng nguy hiểm hơn trong hệ thống fintech vì nó âm thầm từ chối oan một nhóm khách hàng cụ thể (đúng điểm 600) trên diện rộng mà không ai để ý cho tới khi có khiếu nại hàng loạt.",
        "The lesson here is clear: 'clearly passing' and 'clearly failing' do NOT substitute for the ON case. Off-by-one (mixing up '>' with '>=') is a classic bug that only surfaces exactly at the boundary — even more dangerous in a fintech system because it silently and wrongly rejects one specific customer group (exactly score 600) at scale, unnoticed until mass complaints arrive.",
        "教訓は明確です：『明らかに合格』と『明らかに不合格』はONケースの代わりにはなりません。off-by-one（『>』と『>=』の取り違え）は境界ちょうどでしか現れない典型的なバグです——フィンテックシステムではさらに危険です。特定の顧客グループ（ちょうどスコア600）を大規模に静かに誤却下し、大量のクレームが来るまで誰も気づかないからです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca ON trong domain matrix — off-by-one tại đúng ngưỡng điểm tín dụng", "A bug ticket found via the domain matrix's ON case — off-by-one exactly at the credit-score threshold", "domain matrixのONケースで見つかったバグチケット — 信用スコア閾値ちょうどでのoff-by-one"),
      RECAP(["Ca ON không thể thay thế bằng ca 'rõ ràng đạt/không đạt'", "Off-by-one tại biên là lỗi kinh điển, đặc biệt nguy hiểm ở fintech vì ảnh hưởng diện rộng"],
        ["An ON case cannot be replaced by a 'clearly pass/fail' case", "Off-by-one at the boundary is a classic bug, especially dangerous in fintech due to its wide-scale impact"],
        ["ONケースは『明らかに合格/不合格』ケースで代替できない", "境界でのoff-by-oneは典型的なバグで、広範囲への影響からフィンテックでは特に危険"]),
    ] },
  { heading: { vi: "7. Tình huống 2: kết hợp thu nhập-kỳ hạn ở biên bị lọt", en: "7. Situation 2: an income-tenor boundary combination slips through", ja: "7. シーン2：収入と期間の境界の組合せが漏れる" },
    blocks: [
      SITUATION("Đội đã test đủ ca ON/OFF riêng lẻ cho thu nhập và riêng lẻ cho kỳ hạn theo n+1, đều pass, nên tự tin release.", "The team already tested individual ON/OFF cases for income and separately for tenor per n+1, all passing, so they confidently release.",
        "Trên production, một khách hàng có thu nhập ĐÚNG ngưỡng tối thiểu 8.000.000đ (ON) VÀ chọn kỳ hạn ĐÚNG trần tối đa 60 tháng (ON) CÙNG LÚC — lẽ ra hồ sơ này rủi ro cao hơn hẳn và cần 'xét thêm thủ công', nhưng hệ thống lại tự động DUYỆT như một hồ sơ bình thường vì quy tắc phụ thuộc giữa hai biến chưa từng được kiểm thử.",
        "In production, a customer has income exactly AT the minimum threshold of 8,000,000đ (ON) AND chooses a tenor exactly AT the maximum cap of 60 months (ON) AT THE SAME TIME — this profile should be flagged much higher risk and need 'manual review', but the system auto-APPROVES it like a normal profile because the dependency rule between the two variables was never tested.",
        "チームは収入と期間についてn+1に沿って個別のON/OFFケースを既にテスト済みで全て合格し、自信を持ってリリース。",
        "本番環境で、ある顧客の収入がちょうど最低閾値800万ドン（ON）で、かつ選択した期間がちょうど最長上限60ヶ月（ON）——同時に。この案件は本来はるかに高リスクとされ『手動審査』が必要なはずだが、2変数間の依存ルールが一度もテストされていなかったため、システムは通常案件と同様に自動DUYỆT（承認）してしまう。"),
      SOLVE("Bổ sung ngay ca biên kép DM-07 (thu nhập ON + kỳ hạn ON) vào bộ hồi quy, báo lỗi nghiệp vụ (không phải lỗi kỹ thuật thông thường) vì thiếu quy tắc 'xét thêm khi cả hai biên rủi ro trùng nhau', và đề xuất BA rà soát thêm các cặp biến phụ thuộc khác chưa được đặc tả rõ.", "Immediately add the double-boundary case DM-07 (income ON + tenor ON) to the regression suite, report it as a business-logic issue (not an ordinary technical bug) since it's missing the rule 'require manual review when both risk boundaries coincide', and ask the BA to review other dependent variable pairs not yet clearly specified.", "二重境界ケースDM-07（収入ONかつ期間ON）を直ちに回帰テストスイートに追加し、通常の技術的バグではなく業務ロジックの問題として報告する（『両方のリスク境界が重なる時は手動審査が必要』というルールが欠落しているため）。他の明確に仕様化されていない依存変数ペアをBAに見直すよう提案する。"),
      P("Đây chính là điều n+1 KHÔNG tự động phát hiện được: mỗi ca đơn lẻ (thu nhập ON riêng, kỳ hạn ON riêng) đều đúng theo quy tắc của chính nó, nhưng khi HAI rủi ro biên cộng dồn lại, mức độ rủi ro thực tế của hồ sơ đã vượt ngưỡng chấp nhận tự động — một quy tắc nghiệp vụ hoàn toàn khác mà chỉ ca 'biên kép' có chủ đích mới lộ ra. Đây là lý do domain analysis luôn cần kết hợp n+1 với một vài ca biên kép có mục tiêu rõ ràng, thay vì dừng lại ở n+1 thuần tuý.",
        "This is exactly what n+1 does NOT automatically catch: each individual case (income ON alone, tenor ON alone) is correct per its own rule, but when TWO boundary risks stack together, the profile's real risk level exceeds the auto-approval threshold — a completely different business rule that only a deliberate 'double boundary' case reveals. This is why domain analysis always needs n+1 combined with a few deliberately targeted double-boundary cases, rather than stopping at pure n+1.",
        "これこそn+1が自動的には捉えないことです：個々のケース（収入ON単独、期間ON単独）はそれぞれのルールでは正しいのですが、2つの境界リスクが重なると、案件の実際のリスクレベルは自動承認の閾値を超えます——意図的な『二重境界』ケースだけが明らかにする、全く別の業務ルールです。これが、ドメイン分析が純粋なn+1だけで止まらず、常にいくつかの意図的な二重境界ケースと組み合わせる必要がある理由です。"),
      TRY("Nghĩ thêm một cặp biến phụ thuộc khác có thể có trong hệ duyệt vay (ví dụ: hạn mức đề nghị gần trần × nhóm nợ CIC xấu) và đề xuất 1 ca biên kép cho cặp đó.", "Think of another possible dependent variable pair in the loan-approval system (e.g. requested limit near the cap × a bad CIC debt group) and propose 1 double-boundary case for it.", "ローン審査システムに存在しうる別の依存変数ペア（例：上限に近い希望限度額×悪いCIC債務グループ）を考え、そのペア向けに二重境界ケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Giảm ca mà vẫn phủ biên: cân bằng chi phí — độ phủ", en: "8. Reducing cases while still covering boundaries: cost vs coverage", ja: "8. 境界網羅を保ちつつケースを削減：コストと網羅性のバランス" },
    blocks: [
      P("Mục tiêu của domain analysis không phải là 'test mọi tổ hợp có thể' mà là chọn ĐÚNG tổ hợp có giá trị cao nhất trên mỗi đồng thời gian bỏ ra. n+1 đã cắt số ca từ luỹ thừa xuống tuyến tính; bước cuối là quyết định thêm bao nhiêu ca biên kép mà không làm phình bộ hồi quy.",
        "The goal of domain analysis isn't to 'test every possible combination' but to pick EXACTLY the highest-value combinations per unit of time spent. n+1 already cuts cases from exponential to linear; the final step is deciding how many double-boundary cases to add without bloating the regression suite.",
        "ドメイン分析の目標は『あらゆる可能な組合せをテストする』ことではなく、投入時間当たり最も価値の高い組合せを的確に選ぶことです。n+1はすでにケース数を指数から線形に削減しました。最後のステップは、回帰テストスイートを肥大化させずに二重境界ケースをいくつ追加するか決めることです。"),
      IMG(m_dash, "So sánh số ca: tổ hợp đầy đủ 4⁴ vs kỹ thuật n+1, cùng tỉ lệ lỗi tìm được tại biên", "Comparing case counts: full 4⁴ combinations vs the n+1 technique, along with the bug rate found at boundaries", "ケース数の比較：4⁴の完全な組合せ vs n+1技法、境界で見つかったバグ率とともに"),
      STEP(1, "Ưu tiên n+1 cho MỌI biến có biên rõ (tối thiểu/tối đa) trong đặc tả — đây là chi phí thấp, giá trị cao, luôn nên làm.", "Prioritize n+1 for EVERY variable with a clear boundary (min/max) in the spec — low cost, high value, always worth doing.", "仕様に明確な境界（最小/最大）がある全変数にn+1を優先適用——低コスト高価値で常に行う価値がある。"),
      STEP(2, "Chỉ thêm ca biên kép cho các cặp biến được đặc tả HOẶC chuyên gia nghiệp vụ xác nhận có quy tắc tương tác riêng (như 'xét thêm khi 2 rủi ro trùng').", "Only add double-boundary cases for pairs the spec OR a business expert confirms have their own interaction rule (like 'review when 2 risks coincide').", "仕様または業務専門家が独自の相互作用ルール（『2つのリスクが重なったら審査』など）を確認したペアにのみ二重境界ケースを追加する。"),
      STEP(3, "Đưa các ca ON/OFF và ca biên kép quan trọng vào bộ hồi quy tự động — biên hiếm khi thay đổi nên chi phí duy trì thấp, giá trị phát hiện lại cao.", "Put the important ON/OFF and double-boundary cases into the automated regression suite — boundaries rarely change, so maintenance cost is low but detection value stays high.", "重要なON/OFFケースと二重境界ケースを自動回帰テストスイートに組み込む——境界はめったに変わらないため保守コストは低く検出価値は高い。"),
      TIP("Nếu thời gian rất hạn hẹp, ưu tiên theo thứ tự: ca ON của biến ẢNH HƯỞNG TIỀN trực tiếp trước → ca OFF cùng biến → biên kép của cặp biến được xác nhận tương tác → cuối cùng mới tới IN/OUT của biến ít rủi ro.", "If time is very tight, prioritize in this order: the ON case of the variable directly affecting MONEY first → the OFF case of the same variable → the double-boundary case for a confirmed-interacting pair → and only last, the IN/OUT of lower-risk variables.", "時間が非常に限られる場合、次の順で優先する：金額に直接影響する変数のONケースを最優先→同じ変数のOFFケース→相互作用が確認されたペアの二重境界ケース→最後にリスクの低い変数のIN/OUT。"),
    ] },
  { heading: { vi: "9. Ghi nhận, báo cáo & mẹo tránh sai lầm", en: "9. Recording, reporting & tips to avoid mistakes", ja: "9. 記録・報告と失敗回避のコツ" },
    blocks: [
      P("Vì mỗi ca trong domain matrix gắn với một điểm test cụ thể (ON/OFF/IN/OUT) và một biến/cặp biến cụ thể, báo cáo của bạn nên trình bày theo đúng cấu trúc đó — giúp người đọc lần ra ngay nhánh logic hoặc quy tắc nào đang sai.",
        "Because each case in the domain matrix ties to a specific test point (ON/OFF/IN/OUT) and a specific variable/pair, your report should follow that exact structure — helping readers trace straight to the failing logic branch or rule.",
        "domain matrixの各ケースは特定のテスト点（ON/OFF/IN/OUT）と特定の変数/ペアに紐づくため、報告もその構造どおりに提示すべきです——読者が失敗しているロジック分岐やルールへ直接たどり着けます。"),
      IMG(m_kanban, "Bảng theo dõi lỗi tìm được qua domain analysis, gắn theo điểm test và biến vi phạm", "A board tracking bugs found via domain analysis, tagged by test point and violated variable", "domain分析で見つかったバグを追跡するボード、テスト点と違反変数でタグ付け"),
      PITFALL("Chỉ ghi 'test biên điểm tín dụng — Fail' mà không nêu rõ đó là ca ON hay OFF, các biến khác đang ở giá trị nào — người nhận báo cáo không thể tái hiện chính xác.", "Only writing 'tested credit-score boundary — Fail' without stating whether it's the ON or OFF case, or what value the other variables held — the report recipient can't reproduce it accurately.", "『信用スコア境界をテスト — Fail』とだけ書き、ONケースかOFFケースか、他の変数がどの値かを明記しない——報告を受け取った人が正確に再現できない。"),
      PITFALL("Gộp chung ca biên đơn lẻ và ca biên kép vào cùng một dòng báo cáo mơ hồ, khiến đội phát triển tưởng chỉ có 1 lỗi trong khi thực chất là 2 nguyên nhân khác nhau (1 lỗi code, 1 lỗ hổng quy tắc nghiệp vụ).", "Lumping single-boundary and double-boundary cases into one vague report line, making the dev team think there's only 1 bug when there are actually 2 different root causes (1 code bug, 1 business-rule gap).", "単一境界ケースと二重境界ケースを1つの曖昧な報告行にまとめ、開発チームにバグが1つだけだと思わせるが、実際は2つの異なる根本原因（1つはコードバグ、1つは業務ルールの穴）がある。"),
      TIP("Đặt tên ca theo mẫu 'DM-xx: [biến] tại [điểm test], các biến khác giữ IN' — nhìn tên là biết ngay phạm vi và mục tiêu của ca.", "Name cases as 'DM-xx: [variable] at [test point], other variables held at IN' — the name alone tells you the case's scope and purpose.", "ケース名を『DM-xx：[変数]が[テスト点]、他の変数はINのまま』の形式にする——名前だけでケースの範囲と目的が分かる。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi", "初心者のための同値分割と境界値分析"),
      INTERNAL("Kỹ thuật bảng quyết định (Decision Table) cho tester", "The decision table technique for testers", "bang-quyet-dinh-decision-table-cho-tester", "テスター向けデシジョンテーブル技法"),
      INTERNAL("Kiểm thử pairwise kết hợp cho tester", "Combinatorial pairwise testing for testers", "kiem-thu-pairwise-ket-hop-cho-tester", "テスター向けペアワイズ組合せテスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa nâng kỹ năng kiểm thử biên lên một tầm mới qua hệ duyệt vay VayNhanh: định nghĩa 4 điểm ON/OFF/IN/OUT cho từng biến, gộp chúng thành domain matrix, dùng kỹ thuật n+1 để sinh ca mà không bùng nổ tổ hợp, và quan trọng nhất — biết khi nào cần thêm ca 'biên kép' có chủ đích cho các cặp biến ràng buộc lẫn nhau. Hai tình huống thật cho thấy off-by-one tại điểm ON và lỗ hổng quy tắc tại biên kép đều là những lỗi rất dễ lọt nếu chỉ test biên đơn lẻ theo kiểu cũ.",
        "You just leveled up your boundary-testing skill through VayNhanh's loan-approval system: defining the 4 ON/OFF/IN/OUT points for each variable, merging them into a domain matrix, using the n+1 technique to derive cases without a combinatorial explosion, and most importantly — knowing when to add deliberate 'double boundary' cases for interdependent variable pairs. Two real situations showed that off-by-one at the ON point and rule gaps at a double boundary are both bugs that easily slip through old-style single-variable boundary testing.",
        "VayNhanhのローン審査システムを通じて境界テストのスキルを一段引き上げました：各変数の4点ON/OFF/IN/OUTの定義、それらをdomain matrixに統合、組合せ爆発を起こさずケースを導出するn+1技法、そして最も重要な、相互依存する変数ペア向けに意図的な『二重境界』ケースをいつ追加すべきか。2つの実例が、ON点でのoff-by-oneと二重境界でのルールの穴の両方が、旧来の単一変数境界テストでは容易に見逃されるバグであることを示しました。"),
      P("Chặng tiếp theo, bạn có thể kết hợp domain analysis với kỹ thuật pairwise để xử lý những hệ thống có RẤT nhiều biến cấu hình, hoặc học bảng quyết định để hình thức hoá các quy tắc nghiệp vụ phức tạp hơn. Nếu muốn luyện các kỹ thuật thiết kế ca nâng cao này trên dự án mô phỏng doanh nghiệp thật cùng người hướng dẫn, một khoá học Tester bài bản sẽ giúp bạn tiến nhanh và tự tin đảm nhận các hệ thống fintech, ngân hàng.",
        "Next, you can combine domain analysis with pairwise testing to handle systems with VERY many configuration variables, or learn decision tables to formalize even more complex business rules. If you want to practice these advanced case-design techniques on real enterprise-like projects with a mentor, a structured Tester course helps you progress fast and confidently take on fintech and banking systems.",
        "次は、非常に多くの構成変数を持つシステムを扱うためにドメイン分析とペアワイズテストを組み合わせたり、より複雑な業務ルールを形式化するためにデシジョンテーブルを学んだりできます。指導者付きで実際の企業案件に近いプロジェクトでこれらの上級ケース設計技法を練習したいなら、体系的なテスターコースが、フィンテックや銀行システムを自信を持って担当できるよう速い成長を助けます。"),
      CTA(course),
    ] },
];

const MA_DOMAIN_01 = [makeDoc({
  slug: "phan-tich-mien-bien-nang-cao-domain-analysis-cho-tester",
  domain: "fintech",
  primaryKeyword: "phân tích miền",
  keywords: ["phân tích miền", "domain analysis", "domain matrix", "ON OFF IN OUT", "kỹ thuật n+1", "giá trị biên nhiều biến"],
  coverLabel: "NÂNG CAO · DOMAIN ANALYSIS · FINTECH",
  crumb: "Phân tích miền & biên nâng cao (Domain Analysis)",
  metaTitle: { vi: "Phân tích miền (Domain Analysis) nâng cao cho tester", en: "Advanced domain analysis for testers", ja: "テスター向け上級ドメイン分析" },
  metaDescription: {
    vi: "Phân tích miền (domain analysis) nâng cao cho tester: domain matrix ON/OFF/IN/OUT nhiều biến phụ thuộc, kỹ thuật n+1 giảm ca, dự án fintech duyệt vay.",
    en: "Advanced domain analysis for testers: multi-variable ON/OFF/IN/OUT domain matrix, the n+1 technique, a fintech loan-approval project, double boundaries, with a final quiz.",
    ja: "テスター向け上級ドメイン分析：複数依存変数のON/OFF/IN/OUT domain matrix、n+1技法、フィンテックのローン審査案件、二重境界、最後にクイズ付き。",
  },
  title: {
    vi: "Phân tích miền & biên nâng cao (Domain Analysis) cho nhiều biến phụ thuộc: dự án fintech duyệt vay (có trắc nghiệm)",
    en: "Advanced domain & boundary analysis for interdependent variables: a fintech loan-approval project (with quiz)",
    ja: "相互依存変数のための上級ドメイン・境界分析：フィンテックのローン審査案件（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: dùng phân tích miền (domain analysis) để thiết kế ca kiểm thử biên cho hệ duyệt vay tiêu dùng fintech VayNhanh, nơi điểm tín dụng, thu nhập, hạn mức và kỳ hạn ràng buộc lẫn nhau. Domain matrix ON/OFF/IN/OUT, kỹ thuật n+1 giảm số ca, ca biên kép cho cặp biến phụ thuộc, 2 tình huống lỗi thật (off-by-one tại ON, lỗ hổng quy tắc tại biên kép), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: using domain analysis to design boundary test cases for VayNhanh's consumer loan-approval fintech system, where credit score, income, limit and tenor are interdependent. ON/OFF/IN/OUT domain matrix, the n+1 technique to cut case counts, double-boundary cases for dependent variable pairs, 2 real bug situations (off-by-one at ON, a rule gap at a double boundary), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：フィンテックVayNhanhの消費者ローン審査システム（信用スコア・収入・限度額・期間が相互依存）の境界テストケース設計にドメイン分析を使用。ON/OFF/IN/OUT domain matrix、ケース数を削減するn+1技法、依存変数ペア向けの二重境界ケース、2つの実例バグ（ONでのoff-by-one、二重境界でのルールの穴）、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách lập domain matrix cho nhiều biến phụ thuộc", steps: [
    { name: "Xác định biến & ràng buộc", text: "Tách biến độc lập và biến phụ thuộc, xác định công thức biên phụ thuộc." },
    { name: "Định nghĩa 4 điểm ON/OFF/IN/OUT cho từng biến", text: "Gộp thành một domain matrix tổng thể." },
    { name: "Sinh ca theo kỹ thuật n+1 và bổ sung ca biên kép", text: "Giữ các biến khác ở IN, đẩy từng biến qua biên; thêm ca biên kép cho cặp biến tương tác." },
  ] },
  pages,
})];

export { MA_DOMAIN_01 };
