// doc_manual_beginner_defect_lifecycle.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Vòng đời của một lỗi (Defect / Bug Life Cycle). Practice-first, nhiều MOCKUP giao diện (ui_mock),
// giọng khích lệ. Gắn app TMĐT ShopEasy. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, stateDiagram, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, quy trình lỗi, công cụ & dự án thực chiến.",
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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình thanh toán TMĐT có lỗi (nút Đặt hàng không phản hồi) ──
const m_checkout = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán đơn #SE-10482", [
    field(24, 20, 330, "Họ tên người nhận", "Trần Thị Mai", "normal"),
    field(372, 20, 330, "Số điện thoại", "0903 118 226", "normal"),
    field(24, 92, 678, "Địa chỉ giao hàng", "12 Nguyễn Huệ, Q1, TP.HCM", "normal"),
    field(24, 164, 330, "Mã giảm giá", "SALE50", "error"),
    field(372, 164, 330, "Tổng thanh toán", "1.250.000 ₫", "normal"),
    btn(24, 244, 200, "Đặt hàng", "primary"),
    annotate(20, 150, 340, 52, "BUG: mã giảm giá hợp lệ báo lỗi"),
  ].join(""), { h: 320, accent: "#e11d48" }),
].join(""), { h: 376, title: "ShopEasy · TMĐT", accent: "#e11d48" });

// ── Mockup 2: sơ đồ vòng đời một lỗi ──
const m_lifecycle = stateDiagram("Vòng đời của một lỗi (Bug Life Cycle)", [
  { id: "new", label: "NEW", x: 90, y: 70, kind: "start" },
  { id: "assigned", label: "ASSIGNED", x: 300, y: 70, kind: "mid" },
  { id: "open", label: "OPEN", x: 300, y: 190, kind: "mid" },
  { id: "fixed", label: "FIXED", x: 500, y: 190, kind: "mid" },
  { id: "retest", label: "RETEST", x: 500, y: 70, kind: "mid" },
  { id: "closed", label: "CLOSED", x: 680, y: 70, kind: "ok" },
], [
  { from: "new", to: "assigned", label: "duyệt" },
  { from: "assigned", to: "open", label: "nhận sửa" },
  { from: "open", to: "fixed", label: "đã sửa" },
  { from: "fixed", to: "retest", label: "kiểm lại" },
  { from: "retest", to: "closed", label: "đạt" },
  { from: "retest", to: "open", label: "chưa đạt (reopen)", bad: true },
], { accent: "#2563eb", h: 300 });

// ── Mockup 3: ticket Jira của lỗi ──
const m_jira = jira({
  key: "SE-10482", title: "Mã giảm giá SALE50 hợp lệ nhưng báo 'Mã không đúng' ở trang thanh toán",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Thêm SP vào giỏ 2) Sang thanh toán 3) Nhập SALE50 4) Bấm Áp dụng"],
    ["Kết quả thực tế", "Hiện 'Mã không đúng', không giảm giá"],
    ["Kết quả mong đợi", "Giảm 50.000đ, tổng còn 1.200.000đ"],
    ["Bằng chứng", "video-se10482.mp4, screenshot-1.png"],
  ],
});

// ── Mockup 4: bảng các trạng thái chuẩn ──
const m_statusTable = grid("Các trạng thái chuẩn của một lỗi", ["Trạng thái", "Ai xử lý", "Ý nghĩa"], [
  ["New / Mới", "Tester", "Vừa được ghi nhận, chờ xác nhận"],
  ["Assigned", "Leader/Dev", "Đã giao cho lập trình viên"],
  ["Open", "Dev", "Lập trình viên đang sửa"],
  ["Fixed", "Dev", "Đã sửa xong, chờ kiểm lại"],
  ["Retest", "Tester", "Tester kiểm lại bản đã sửa"],
  ["Closed", "Tester", "Kiểm lại đạt → đóng lỗi"],
  ["Reopened", "Tester", "Kiểm lại chưa đạt → mở lại"],
  ["Rejected", "Dev/Leader", "Không phải lỗi / trùng / không tái hiện"],
], { accent: "#2563eb", highlight: 6 });

// ── Mockup 5: bảng kanban theo dõi lỗi ──
const m_kanban = kanban("Bảng theo dõi lỗi (ShopEasy · Sprint 12)", [
  { name: "New", cards: [
    { key: "SE-10482", title: "Mã giảm giá báo sai", sev: "High" },
    { key: "SE-10488", title: "Ảnh SP vỡ trên mobile", sev: "Low" },
  ] },
  { name: "Open", cards: [
    { key: "SE-10475", title: "Giỏ hàng mất khi F5", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-10470", title: "Sai phí ship HN", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-10461", title: "Nút Mua mờ", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu lỗi ──
const m_dash = dashboard("Tình hình lỗi — Sprint 12", [
  { label: "Tổng lỗi", value: "23", sub: "tuần này", color: "#2563eb" },
  { label: "Đang mở", value: "7", sub: "Open + New", color: "#e11d48" },
  { label: "Đã đóng", value: "14", sub: "Closed", color: "#16a34a" },
  { label: "Mở lại", value: "2", sub: "Reopened", color: "#f59e0b" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Vòng đời của một lỗi (bug life cycle) là gì?",
  "What is the bug (defect) life cycle?",
  "Vòng đời của một lỗi là chuỗi các trạng thái mà một lỗi đi qua kể từ khi tester phát hiện cho tới khi được đóng: New → Assigned → Open → Fixed → Retest → Closed. Nếu bản sửa chưa đạt, lỗi được 'Reopened' và quay lại Open. Hiểu vòng đời này giúp bạn biết một lỗi đang ở đâu, ai đang xử lý, và việc tiếp theo của bạn là gì.",
  "The bug life cycle is the sequence of states a defect moves through from when a tester finds it until it is closed: New → Assigned → Open → Fixed → Retest → Closed. If the fix isn't good enough, the bug is 'Reopened' and returns to Open. Understanding it tells you where a bug is, who is handling it, and what your next action is.",
  "バグ（欠陥）ライフサイクルとは？",
  "バグライフサイクルは、テスターが発見してからクローズされるまでに欠陥が通る状態の連なりです：New→Assigned→Open→Fixed→Retest→Closed。修正が不十分なら『Reopened』となりOpenへ戻ります。これを理解すると、バグが今どこにあり、誰が対応中で、次に何をすべきかが分かります。");
const faq2 = FAQ(
  "Khi nào tester được đóng (Closed) một lỗi?",
  "When can a tester close a bug?",
  "Chỉ khi tester đã kiểm lại (retest) trên đúng môi trường và bản build có bản sửa, và kết quả khớp với kết quả mong đợi ghi trong ticket. Nếu vẫn còn sai, tester không đóng mà chuyển 'Reopened' kèm bằng chứng mới. Tester là người mở lỗi thì cũng nên là người đóng lỗi — tránh đóng nhầm khi chưa thực sự kiểm lại.",
  "Only after the tester retests on the correct environment and a build containing the fix, and the result matches the expected result written in the ticket. If it's still wrong, the tester doesn't close it but sets 'Reopened' with new evidence. The tester who opened the bug should also close it — avoid closing before actually retesting.",
  "テスターはいつバグをクローズできる？",
  "修正を含むビルドと正しい環境で再テスト（retest）し、結果がチケット記載の期待結果と一致した時だけです。まだ誤りなら、クローズせず新しい証拠を添えて『Reopened』にします。バグを起票したテスターがクローズも担当するのが望ましく、再テスト前のクローズは避けます。");
const faq3 = FAQ(
  "Trạng thái 'Rejected' nghĩa là mình làm sai à?",
  "Does a 'Rejected' status mean I did something wrong?",
  "Không hẳn. 'Rejected' thường nghĩa là: không phải lỗi (đúng thiết kế), trùng với lỗi đã có, hoặc lập trình viên không tái hiện được. Với người mới, nguyên nhân hay gặp nhất là ticket thiếu thông tin để tái hiện (thiếu bước, môi trường, dữ liệu). Hãy xem đây là cơ hội cải thiện cách viết bug report, không phải thất bại cá nhân.",
  "Not necessarily. 'Rejected' usually means: not a bug (works as designed), a duplicate of an existing one, or the developer couldn't reproduce it. For beginners the most common cause is a ticket missing information to reproduce (missing steps, environment, data). Treat it as a chance to improve your bug reports, not a personal failure.",
  "『Rejected』は自分のミスという意味？",
  "必ずしもそうではありません。『Rejected』は通常、バグではない（仕様どおり）、既存の重複、または開発者が再現できない、を意味します。初心者に最も多い原因は、再現情報の不足（手順・環境・データの欠落）です。個人の失敗ではなく、バグ報告を改善する機会と捉えましょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Thứ tự đúng của một vòng đời lỗi cơ bản là gì?", en: "What is the correct order of a basic bug life cycle?", ja: "基本的なバグライフサイクルの正しい順序は？" },
    options: [
      { vi: "Closed → Open → New → Fixed", en: "Closed → Open → New → Fixed", ja: "Closed→Open→New→Fixed" },
      { vi: "New → Assigned → Open → Fixed → Retest → Closed", en: "New → Assigned → Open → Fixed → Retest → Closed", ja: "New→Assigned→Open→Fixed→Retest→Closed" },
      { vi: "Fixed → New → Closed → Open", en: "Fixed → New → Closed → Open", ja: "Fixed→New→Closed→Open" },
      { vi: "Open → Closed → New → Retest", en: "Open → Closed → New → Retest", ja: "Open→Closed→New→Retest" },
    ], correct: 1,
    explain: { vi: "Lỗi đi từ khi phát hiện (New) → giao (Assigned) → sửa (Open→Fixed) → kiểm lại (Retest) → đóng (Closed).", en: "A bug goes from found (New) → assigned → fixing (Open→Fixed) → retest → closed.", ja: "バグは発見(New)→割当(Assigned)→修正(Open→Fixed)→再テスト(Retest)→クローズ(Closed)と進みます。" },
  }),
  mcq({
    q: { vi: "Bạn kiểm lại bản sửa nhưng lỗi VẪN còn. Bạn nên đặt trạng thái nào?", en: "You retest a fix but the bug is STILL there. Which status should you set?", ja: "修正を再テストしたがバグがまだ残る。どの状態にすべき？" },
    options: [
      { vi: "Closed", en: "Closed", ja: "Closed" },
      { vi: "Reopened", en: "Reopened", ja: "Reopened" },
      { vi: "Rejected", en: "Rejected", ja: "Rejected" },
      { vi: "New (tạo lỗi mới)", en: "New (create a new bug)", ja: "New（新規作成）" },
    ], correct: 1,
    explain: { vi: "Kiểm lại chưa đạt → 'Reopened' (mở lại chính lỗi cũ) kèm bằng chứng mới, không tạo lỗi trùng.", en: "Retest fails → 'Reopened' (reopen the same bug) with new evidence, don't create a duplicate.", ja: "再テスト不合格→同じバグを新証拠付きで『Reopened』。重複を作らない。" },
  }),
  mcq({
    q: { vi: "Vì sao lỗi của bạn hay bị 'Rejected — không tái hiện được'?", en: "Why do your bugs often get 'Rejected — cannot reproduce'?", ja: "なぜバグが『Rejected — 再現不可』になりやすい？" },
    options: [
      { vi: "Do lập trình viên lười", en: "Because developers are lazy", ja: "開発者が怠けているから" },
      { vi: "Ticket thiếu bước tái hiện / môi trường / dữ liệu", en: "The ticket lacks repro steps / environment / data", ja: "チケットに再現手順・環境・データが不足" },
      { vi: "Do trình duyệt", en: "Because of the browser", ja: "ブラウザのせい" },
      { vi: "Không lý do nào", en: "No reason at all", ja: "理由なし" },
    ], correct: 1,
    explain: { vi: "Người mới hay thiếu thông tin tái hiện. Ghi đủ bước + môi trường + dữ liệu + bằng chứng thì lỗi khó bị bác.", en: "Beginners often omit repro info. Full steps + environment + data + evidence make a bug hard to reject.", ja: "初心者は再現情報を省きがち。手順＋環境＋データ＋証拠を揃えると却下されにくい。" },
  }),
  mcq({
    q: { vi: "Ai thường là người ĐÓNG (Closed) một lỗi?", en: "Who usually CLOSES a bug?", ja: "通常、誰がバグをクローズする？" },
    options: [
      { vi: "Lập trình viên tự đóng sau khi sửa", en: "The developer, right after fixing", ja: "修正直後の開発者" },
      { vi: "Tester, sau khi kiểm lại đạt", en: "The tester, after a passing retest", ja: "再テスト合格後のテスター" },
      { vi: "Khách hàng", en: "The customer", ja: "顧客" },
      { vi: "Bất kỳ ai rảnh", en: "Anyone who is free", ja: "手が空いている人" },
    ], correct: 1,
    explain: { vi: "Tester (người mở lỗi) kiểm lại đạt mới đóng — đảm bảo bản sửa thực sự đúng.", en: "The tester (who opened it) closes only after a passing retest — ensuring the fix truly works.", ja: "テスター（起票者）が再テスト合格後にクローズ — 修正が本当に正しいと保証。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Vòng đời của một lỗi cho bạn biết một lỗi đang ở trạng thái nào và ai đang xử lý. Bài này bám màn hình thanh toán của app TMĐT ShopEasy: bạn tìm lỗi, ghi ticket, theo dõi nó đi qua các trạng thái New → Open → Fixed → Retest → Closed, và biết khi nào được đóng hay phải mở lại. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "The bug life cycle tells you what state a bug is in and who is handling it. This follows ShopEasy's checkout screen: you find a bug, log a ticket, follow it through New → Open → Fixed → Retest → Closed, and learn when to close it or reopen it. Lots of visuals and a quiz at the end.",
        "バグライフサイクルは、バグが今どの状態で誰が対応中かを教えます。本記事はECアプリShopEasyの決済画面に沿い、バグを見つけ、チケットを起票し、New→Open→Fixed→Retest→Closedの状態を追い、いつクローズし、いつ再オープンするかを学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Khi bắt đầu làm tester, việc bạn làm nhiều nhất không chỉ là 'tìm lỗi' mà còn là theo dõi số phận của lỗi đó cho tới khi nó được sửa xong. Mỗi lỗi giống như một lá đơn đi qua nhiều cửa: bạn ghi nhận, lập trình viên sửa, rồi bạn kiểm lại. Chuỗi 'cửa' đó gọi là vòng đời của lỗi. Hiểu nó, bạn sẽ tự tin biết mình cần làm gì ở mỗi bước. Chúng ta sẽ học qua một app mua sắm thật, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! When you start as a tester, your most frequent job isn't only 'finding bugs' but also tracking each bug's fate until it's fixed. Every bug is like a form passing through several gates: you log it, a developer fixes it, then you retest. That chain of gates is the bug life cycle. Understanding it, you'll confidently know what to do at each step. We'll learn through a real shopping app, with visuals and hands-on practice.",
        "こんにちは、初心者さん！テスターを始めると、最も多い仕事は『バグを見つける』だけでなく、修正完了までバグの行方を追うことです。各バグは複数の門を通る書類のよう：あなたが起票し、開発者が修正し、あなたが再テストします。その門の連なりがバグライフサイクルです。理解すれば各段階で何をすべきか自信を持てます。実際の買い物アプリで、図と実習を通じて学びます。"),
      IMG(m_checkout, "Màn hình test: trang thanh toán ShopEasy — mã giảm giá hợp lệ lại báo lỗi", "Screen under test: ShopEasy checkout — a valid coupon shows an error", "テスト対象画面：ShopEasyの決済 — 有効なクーポンがエラー表示"),
      DEF("Vòng đời của một lỗi", "chuỗi các trạng thái mà một lỗi đi qua từ lúc phát hiện đến lúc đóng (New → … → Closed).",
        "the bug life cycle — the sequence of states a defect moves through from discovery to closure (New → … → Closed).",
        "バグライフサイクル — 欠陥が発見からクローズまで通る状態の連なり（New→…→Closed）。"),
    ] },
  { heading: { vi: "2. Vòng đời của một lỗi trông như thế nào", en: "2. What the bug life cycle looks like", ja: "2. バグライフサイクルの見た目" },
    blocks: [
      P("Hãy hình dung một lỗi như một tấm thẻ di chuyển trên bảng. Khi bạn vừa phát hiện, thẻ ở ô 'New'. Sau khi được duyệt và giao cho lập trình viên, nó sang 'Assigned' rồi 'Open' (đang sửa). Sửa xong, thẻ chuyển 'Fixed' và quay lại tay bạn để 'Retest'. Nếu đạt, bạn kéo nó tới 'Closed'. Nếu chưa đạt, bạn mở lại — 'Reopened' — và nó về 'Open'.",
        "Picture a bug as a card moving on a board. When you just found it, the card is in 'New'. After it's approved and assigned to a developer, it goes to 'Assigned' then 'Open' (being fixed). Once fixed, the card becomes 'Fixed' and returns to you for 'Retest'. If it passes, you move it to 'Closed'. If not, you reopen it — 'Reopened' — and it goes back to 'Open'.",
        "バグをボード上を動くカードと想像しましょう。発見直後はカードは『New』。承認され開発者に割り当てられると『Assigned』→『Open』（修正中）へ。修正されるとカードは『Fixed』となりあなたの元へ戻り『Retest』。合格なら『Closed』へ。不合格なら再オープン『Reopened』でOpenへ戻ります。"),
      IMG(m_lifecycle, "Sơ đồ vòng đời lỗi: New → Assigned → Open → Fixed → Retest → Closed (và nhánh Reopen)", "Bug life cycle: New → Assigned → Open → Fixed → Retest → Closed (with a Reopen branch)", "バグライフサイクル図：New→Assigned→Open→Fixed→Retest→Closed（Reopen分岐あり）"),
      DEF("Retest (kiểm lại)", "việc tester chạy lại đúng ca lỗi trên bản build đã sửa để xác nhận lỗi thật sự hết.",
        "retest — the tester re-running the exact failing case on a fixed build to confirm the bug is truly gone.",
        "再テスト — テスターが修正済みビルドで同じ不合格ケースを再実行し、バグが本当に消えたか確認すること。"),
      P("Bạn không cần thuộc lòng mọi tên trạng thái ngay. Điều quan trọng là nắm ý tưởng: một lỗi luôn có một trạng thái rõ ràng, và mỗi trạng thái cho biết 'bóng đang ở chân ai'. Nhờ đó cả đội không ai hỏi 'lỗi này ai lo?' — nhìn bảng là biết. Đây là nền tảng để bạn phối hợp mượt mà với lập trình viên và quản lý.",
        "You don't need to memorize every status name right away. What matters is the idea: a bug always has a clear status, and each status shows 'whose court the ball is in'. So nobody on the team asks 'who owns this bug?' — the board tells them. This is the foundation for smooth collaboration with developers and managers.",
        "全ステータス名をすぐ暗記する必要はありません。大切なのは考え方：バグは常に明確な状態を持ち、各状態が『今ボールが誰の側にあるか』を示します。だからチームの誰も『このバグは誰の担当？』と聞かず、ボードを見れば分かります。開発者や管理者との円滑な連携の土台です。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần hiểu điều này", en: "3. Why beginners need to understand this", ja: "3. 初心者がこれを理解すべき理由" },
    blocks: [
      P("Ở một dự án thật, mỗi ngày có hàng chục lỗi được tạo, sửa, đóng. Nếu không có trạng thái rõ ràng, mọi thứ sẽ rối: lỗi bị quên, lỗi được sửa hai lần, hoặc lỗi 'đóng' nhưng thật ra chưa hết. Vòng đời lỗi là ngôn ngữ chung để cả đội biết chính xác từng lỗi đang ở đâu.",
        "On a real project, dozens of bugs are created, fixed and closed every day. Without clear statuses, it gets messy: bugs are forgotten, fixed twice, or 'closed' while not actually gone. The bug life cycle is the shared language that lets the whole team know exactly where each bug stands.",
        "実際の案件では毎日数十のバグが作成・修正・クローズされます。明確な状態がないと混乱します：バグが忘れられる、二度修正される、実際は消えていないのに『クローズ』される。バグライフサイクルは、各バグが今どこにあるかをチーム全員が正確に知るための共通言語です。"),
      P("Với riêng bạn — người mới — hiểu vòng đời giúp bạn ghi điểm sớm: bạn biết khi nào cần kiểm lại, khi nào được đóng, khi nào phải mở lại thay vì tạo lỗi trùng. Đây cũng là câu hỏi phỏng vấn kinh điển: 'Hãy mô tả vòng đời của một lỗi'. Trả lời gãy gọn cho thấy bạn hiểu quy trình làm việc thật, không chỉ lý thuyết.",
        "For you specifically — a beginner — understanding the cycle earns quick credibility: you know when to retest, when to close, when to reopen instead of creating a duplicate. It's also a classic interview question: 'Describe the bug life cycle.' A crisp answer shows you understand a real workflow, not just theory.",
        "特に初心者のあなたにとって、サイクルの理解は早く信頼を得ます：いつ再テストし、いつクローズし、重複を作らずいつ再オープンするかが分かります。定番の面接質問でもあります：『バグライフサイクルを説明して』。明快な回答は、理論だけでなく実際の流れを理解している証拠です。"),
      P("Và quan trọng nhất: nó giúp bạn tránh một sai lầm tốn kém — đóng nhầm một lỗi chưa thật sự được sửa. Một lỗi 'Closed' sai có thể lọt ra khách hàng. Hiểu đúng bước 'Retest → Closed' chính là bạn đang bảo vệ chất lượng sản phẩm.",
        "And most importantly: it helps you avoid a costly mistake — wrongly closing a bug that isn't actually fixed. A wrongly 'Closed' bug can escape to customers. Understanding the 'Retest → Closed' step correctly is you protecting product quality.",
        "そして最も重要なのは、高くつくミス — 実際は直っていないバグを誤ってクローズする — を避けられることです。誤って『Closed』にしたバグは顧客に漏れ得ます。『Retest→Closed』を正しく理解することは、製品品質を守ることそのものです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & các trạng thái chuẩn", en: "4. Prepare: tools & the standard statuses", ja: "4. 準備：ツールと標準ステータス" },
    blocks: [
      P("Hầu hết đội dùng một công cụ quản lý lỗi như Jira để mỗi lỗi là một 'ticket' có trạng thái. Bạn không cần cài gì phức tạp — chỉ cần biết các trạng thái phổ biến và ý nghĩa của chúng.",
        "Most teams use a bug-tracking tool like Jira so each bug is a 'ticket' with a status. You don't need a complex setup — just know the common statuses and what they mean.",
        "多くのチームはJiraのようなバグ管理ツールを使い、各バグを状態付きの『チケット』にします。複雑な設定は不要 — よくあるステータスとその意味を知るだけで十分です。"),
      STEP(1, "Mở công cụ quản lý lỗi (Jira/Trello/Excel) mà đội bạn dùng; tìm cột/field 'Status'.", "Open your team's bug tracker (Jira/Trello/Excel); find the 'Status' column/field.", "チームのバグ管理ツール（Jira/Trello/Excel）を開き、『Status』列/項目を探す。"),
      STEP(2, "Học thuộc 6 trạng thái lõi: New, Open, Fixed, Retest, Closed, Reopened (và Rejected).", "Learn the 6 core statuses: New, Open, Fixed, Retest, Closed, Reopened (and Rejected).", "6つの中核ステータスを覚える：New, Open, Fixed, Retest, Closed, Reopened（とRejected）。"),
      STEP(3, "Với mỗi trạng thái, ghi rõ 'ai là người xử lý tiếp theo' — đây là điều hay bị nhầm.", "For each status, note 'who acts next' — this is what's most often confused.", "各状態で『次に誰が動くか』を明記 — ここが最も混同されます。"),
      TRY("Mở một ticket bất kỳ trong công cụ của đội (hoặc tự tạo 1 ticket mẫu) và đọc xem nó đang ở trạng thái nào.", "Open any ticket in your team's tool (or create a sample one) and read what status it's in.", "チームのツールで任意のチケットを開き（またはサンプルを作り）、今どの状態か読んでみよう。"),
      PITFALL("Nghĩ rằng mọi công ty dùng y hệt tên trạng thái. Tên có thể khác (In Progress = Open), nhưng Ý NGHĨA thì giống nhau — hãy bám ý nghĩa.", "Assuming every company uses identical status names. Names may differ (In Progress = Open), but the MEANING is the same — follow the meaning.", "全社が同じ状態名だと思うこと。名前は異なり得ます（In Progress＝Open）が、意味は同じ — 意味に従いましょう。"),
      IMG(m_statusTable, "Bảng các trạng thái chuẩn của một lỗi và ai xử lý ở mỗi bước", "A table of standard bug statuses and who handles each step", "標準的なバグ状態と各段階の担当者の表"),
    ] },
  { heading: { vi: "5. Các bước một lỗi đi qua (thực hành)", en: "5. The steps a bug goes through (hands-on)", ja: "5. バグが通る手順（実習）" },
    blocks: [
      P("Giờ ta đi theo đúng lỗi mã giảm giá ở ShopEasy, từ lúc bạn phát hiện tới lúc đóng. Mỗi bước là một hành động cụ thể bạn hoặc lập trình viên thực hiện.",
        "Now let's follow the ShopEasy coupon bug, from when you find it to when it's closed. Each step is a concrete action you or a developer takes.",
        "では、ShopEasyのクーポンバグを、発見からクローズまで追いましょう。各ステップはあなたか開発者が行う具体的な行動です。"),
      STEP(1, "Bạn phát hiện lỗi và tạo ticket → trạng thái 'New'. Ghi đủ bước, môi trường, kết quả thực tế/mong đợi, bằng chứng.", "You find the bug and create a ticket → status 'New'. Include steps, environment, actual/expected results, evidence.", "バグを発見しチケット作成→状態『New』。手順・環境・実際/期待結果・証拠を記載。"),
      STEP(2, "Leader duyệt và giao cho lập trình viên → 'Assigned'. Lập trình viên bắt đầu sửa → 'Open'.", "The leader approves and assigns to a developer → 'Assigned'. The developer starts fixing → 'Open'.", "リーダーが承認し開発者へ割当→『Assigned』。開発者が修正開始→『Open』。"),
      STEP(3, "Lập trình viên sửa xong, cập nhật → 'Fixed', kèm bản build/commit chứa bản sửa.", "The developer finishes and updates → 'Fixed', with the build/commit containing the fix.", "開発者が修正完了し更新→『Fixed』、修正を含むビルド/コミット付き。"),
      STEP(4, "Bạn kiểm lại (Retest) trên bản build đã sửa. Đạt → 'Closed'. Chưa đạt → 'Reopened'.", "You retest on the fixed build. Passes → 'Closed'. Fails → 'Reopened'.", "修正済みビルドで再テスト。合格→『Closed』。不合格→『Reopened』。"),
      CODE("text", "NHẬT KÝ LỖI SE-10482 (mã giảm giá)\n08/07 09:10  New       (tester tạo ticket, đủ bước + bằng chứng)\n08/07 10:02  Assigned  (leader giao cho dev Nam)\n08/07 11:20  Open      (dev Nam đang sửa validate mã)\n08/07 15:44  Fixed     (dev Nam: build #341 đã sửa)\n09/07 09:30  Retest    (tester kiểm lại trên build #341)\n09/07 09:40  Closed    (SALE50 giảm 50.000đ đúng -> đóng)"),
      TRY("Viết một dòng nhật ký trạng thái cho một lỗi bạn từng gặp (dù là lỗi trong game/app bạn dùng): nó đang ở trạng thái nào?", "Write one status-log line for a bug you've seen (even in a game/app you use): what status is it in?", "あなたが見たバグ（使うゲーム/アプリでも）のステータス行を1行書こう：今どの状態？"),
    ] },
  { heading: { vi: "6. Tình huống 1: lỗi bị trả về vì thiếu thông tin", en: "6. Situation 1: a bug bounced back for missing info", ja: "6. シーン1：情報不足で差し戻されたバグ" },
    blocks: [
      SITUATION("Bạn tạo lỗi nhưng sáng hôm sau thấy nó bị chuyển 'Rejected — không tái hiện được'.", "You logged a bug but the next morning it's set to 'Rejected — cannot reproduce'.",
        "Ticket của bạn chỉ ghi 'Mã giảm giá bị lỗi', không có bước cụ thể, không nói mã nào, môi trường nào. Lập trình viên thử vài mã thấy vẫn chạy nên đánh Rejected.",
        "Your ticket only says 'the coupon is broken', with no concrete steps, which code, or which environment. The developer tried a few codes, saw them work, and marked it Rejected.",
        "バグ起票の翌朝、『Rejected — 再現不可』に。", "チケットは『クーポンが壊れている』とだけで、具体的手順・どのコード・どの環境が無し。開発者は数個のコードを試し動いたのでRejectedに。"),
      SOLVE("Bổ sung thông tin tái hiện đầy đủ rồi 'Reopened' (không tạo ticket mới): mã SALE50, trang thanh toán, trình duyệt, video.", "Add complete repro info then 'Reopened' (don't create a new ticket): code SALE50, checkout page, browser, a video.", "完全な再現情報を追加し『Reopened』（新規作成しない）：コードSALE50・決済画面・ブラウザ・動画。"),
      P("Đây là bài học lớn nhất cho người mới: một lỗi bị bác thường KHÔNG phải vì bạn 'sai', mà vì ticket chưa đủ để người khác làm theo. Hãy nhớ công thức: bước tái hiện + môi trường (thiết bị/trình duyệt/phiên bản) + dữ liệu cụ thể + kết quả thực tế/mong đợi + bằng chứng. Có đủ những thứ này, lỗi của bạn rất khó bị từ chối.",
        "This is the biggest lesson for beginners: a rejected bug usually isn't because you're 'wrong', but because the ticket wasn't enough for someone else to follow. Remember the formula: repro steps + environment (device/browser/version) + concrete data + actual/expected results + evidence. With these, your bug is very hard to reject.",
        "初心者への最大の教訓：却下されたバグは通常あなたが『間違い』だからでなく、チケットが他人が辿るのに不十分だからです。公式を覚えましょう：再現手順＋環境（端末/ブラウザ/バージョン）＋具体データ＋実際/期待結果＋証拠。これらが揃えば、バグは却下されにくくなります。"),
      IMG(m_jira, "Ticket sau khi bổ sung: đủ bước, môi trường, kết quả mong đợi và bằng chứng", "The ticket after adding: full steps, environment, expected result and evidence", "追記後のチケット：完全な手順・環境・期待結果・証拠"),
      RECAP(["Lỗi bị bác thường do ticket thiếu thông tin, không phải do bạn kém", "Bổ sung info rồi Reopened, đừng tạo lỗi trùng"],
        ["Rejected bugs usually mean a thin ticket, not a weak tester", "Add info then Reopen, don't create duplicates"],
        ["却下は多くがチケット不足、テスターの力不足ではない", "情報を足して再オープン、重複を作らない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: kiểm lại chưa đạt → mở lại", en: "7. Situation 2: retest fails → reopen", ja: "7. シーン2：再テスト不合格→再オープン" },
    blocks: [
      SITUATION("Lập trình viên báo 'Fixed', bạn kiểm lại nhưng mã giảm giá vẫn báo sai với đơn hàng lớn.", "The developer marks 'Fixed', you retest but the coupon still errors on large orders.",
        "Bản sửa chỉ đúng với đơn nhỏ; với đơn ≥ 1 triệu, mã SALE50 vẫn báo 'Mã không đúng'. Bạn không được đóng lỗi.",
        "The fix only works for small orders; for orders ≥ 1 million, code SALE50 still says 'invalid code'. You must not close the bug.",
        "開発者が『Fixed』、再テストすると高額注文でクーポンがまだエラー。", "修正は少額注文のみ有効；100万以上の注文ではSALE50がまだ『無効なコード』。バグをクローズしてはいけません。"),
      SOLVE("Đặt 'Reopened' kèm điều kiện tái hiện MỚI (đơn ≥ 1 triệu) và ảnh chụp — mô tả rõ phần nào còn sai.", "Set 'Reopened' with the NEW repro condition (orders ≥ 1 million) and a screenshot — describe exactly what's still wrong.", "新しい再現条件（100万以上の注文）とスクショ付きで『Reopened』— まだ誤る部分を明記。"),
      P("Nhiều người mới ngại mở lại lỗi vì sợ 'làm phiền' lập trình viên. Nhưng mở lại đúng cách chính là việc của bạn: bạn là hàng rào cuối trước khi lỗi tới khách. Điều cần làm là mở lại một cách chuyên nghiệp — nêu đúng điều kiện còn sai, không nói chung chung 'vẫn lỗi'. Nhờ vậy lập trình viên biết ngay phải sửa tiếp phần nào, và vòng lặp Retest → Reopen chỉ diễn ra tối thiểu.",
        "Many beginners hesitate to reopen bugs, afraid of 'bothering' developers. But reopening properly is exactly your job: you're the last fence before a bug reaches customers. What matters is reopening professionally — state the exact condition still failing, not a vague 'still broken'. That way the developer immediately knows what to fix next, and the Retest → Reopen loop stays minimal.",
        "多くの初心者は開発者を『煩わせる』ことを恐れ再オープンをためらいます。しかし正しく再オープンするのはまさにあなたの仕事です：顧客に届く前の最後の砦です。大切なのはプロらしく再オープンすること — 漠然と『まだ壊れている』でなく、まだ失敗する正確な条件を示す。そうすれば開発者は次に何を直すか即座に分かり、Retest→Reopenのループは最小限になります。"),
      IMG(m_lifecycle, "Nhánh Reopen: từ Retest chưa đạt quay lại Open để sửa tiếp", "The Reopen branch: from a failing Retest back to Open for another fix", "Reopen分岐：不合格のRetestからOpenへ戻り再修正"),
      TRY("Viết một câu ghi chú 'Reopened' cho lỗi trên: nêu rõ điều kiện còn sai (gợi ý: 'đơn ≥ 1 triệu').", "Write a 'Reopened' note for the bug above: state the still-failing condition (hint: 'orders ≥ 1 million').", "上記バグの『Reopened』メモを書こう：まだ失敗する条件を明記（ヒント：『100万以上の注文』）。"),
    ] },
  { heading: { vi: "8. Ghi nhận & theo dõi trên bảng", en: "8. Tracking on the board", ja: "8. ボードでの追跡" },
    blocks: [
      P("Cả đội thường nhìn một bảng (board) để biết tình hình lỗi. Mỗi cột là một trạng thái, mỗi thẻ là một lỗi. Là tester, bạn giữ cho các thẻ của mình luôn ở đúng cột và có đủ thông tin.",
        "The whole team usually looks at a board to see the bug situation. Each column is a status, each card is a bug. As a tester, you keep your cards in the right column with enough information.",
        "チームは通常ボードでバグ状況を把握します。各列が状態、各カードがバグ。テスターとして、自分のカードを正しい列に十分な情報付きで保ちます。"),
      STEP(1, "Sau mỗi hành động (tạo/kiểm lại/mở lại), cập nhật trạng thái thẻ ngay để bảng luôn đúng thực tế.", "After each action (create/retest/reopen), update the card's status right away so the board reflects reality.", "各行動（作成/再テスト/再オープン）後すぐカードの状態を更新し、ボードを実態に合わせる。"),
      STEP(2, "Cuối ngày/sprint, đếm nhanh: bao nhiêu New, Open, Closed, Reopened để báo cáo tiến độ.", "At day/sprint end, quickly count: how many New, Open, Closed, Reopened for a progress report.", "日/スプリント終わりに素早く集計：New/Open/Closed/Reopenedの数を進捗報告に。"),
      CODE("text", "BÁO CÁO LỖI NHANH — ShopEasy — Sprint 12 (ngày 09/07)\nTổng: 23 | New: 3 | Open: 4 | Fixed(chờ retest): 2 | Closed: 12 | Reopened: 2\nĐáng chú ý: SE-10482 (mã giảm giá) đã Closed; SE-10475 (giỏ hàng mất khi F5) còn Open, ưu tiên cao."),
      IMG(m_kanban, "Bảng kanban theo dõi lỗi: mỗi cột một trạng thái, mỗi thẻ một lỗi", "A kanban board tracking bugs: one column per status, one card per bug", "バグ追跡のかんばんボード：1列1状態、1カード1バグ"),
      IMG(m_dash, "Bảng số liệu nhanh: tổng lỗi, đang mở, đã đóng, mở lại", "A quick metrics panel: total, open, closed, reopened", "簡易メトリクス：合計・オープン・クローズ・再オープン"),
      TIP("Đừng để một lỗi 'kẹt' im lặng ở Fixed nhiều ngày — nếu bạn chưa kịp Retest, hãy ghi chú lý do để cả đội biết.", "Don't let a bug sit silently in Fixed for days — if you can't Retest yet, add a note so the team knows why.", "バグをFixedで何日も黙って放置しない — 再テストできないなら理由をメモしてチームに知らせる。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi làm việc với vòng đời lỗi. Biết trước giúp bạn phối hợp mượt hơn và được tin tưởng sớm hơn.",
        "Beginners often stumble on a few common mistakes with the bug life cycle. Knowing them in advance helps you collaborate smoothly and earn trust sooner.",
        "初心者はバグライフサイクルで共通の失敗をしがちです。事前に知れば連携が円滑になり、早く信頼を得られます。"),
      PITFALL("Đóng lỗi (Closed) mà chưa Retest trên bản build đã sửa — lỗi có thể vẫn còn và lọt ra khách.", "Closing a bug without retesting on the fixed build — it may still exist and escape to customers.", "修正済みビルドで再テストせずクローズ — バグが残り顧客に漏れ得ます。"),
      PITFALL("Gặp lỗi cũ tái xuất thì tạo ticket MỚI thay vì Reopen ticket cũ — gây trùng lặp, khó theo dõi lịch sử.", "Creating a NEW ticket when an old bug returns instead of reopening the old one — causes duplicates and loses history.", "古いバグ再発時に旧チケットを再オープンせず新規作成 — 重複を生み履歴を失う。"),
      TIP("Một lỗi luôn có đúng một trạng thái rõ ràng; sau mỗi hành động, hãy hỏi 'giờ bóng ở chân ai?' rồi cập nhật trạng thái đúng người.", "A bug always has exactly one clear status; after each action, ask 'whose court is the ball in now?' and update to the right owner.", "バグは常に明確な状態を1つ持つ；各行動後『今ボールは誰の側？』と問い、正しい担当へ更新。"),
      IMG(m_statusTable, "Nhắc lại: mỗi trạng thái ứng với một người xử lý tiếp theo", "Reminder: each status maps to who acts next", "再確認：各状態は次に動く人に対応"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
      INTERNAL("Test scenario & checklist cho người mới", "Test scenarios & checklists for beginners", "test-scenario-checklist-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi hết vòng đời của một lỗi qua app ShopEasy: phát hiện và tạo ticket (New), theo dõi khi được giao và sửa (Assigned/Open/Fixed), kiểm lại (Retest), rồi đóng (Closed) hoặc mở lại (Reopened). Bạn cũng học vì sao lỗi bị 'Rejected' và cách viết ticket để không bị bác. Đây là kỹ năng nền tảng mà mọi tester đi làm đều dùng mỗi ngày.",
        "You just walked the full bug life cycle through the ShopEasy app: finding and logging (New), tracking assignment and fixing (Assigned/Open/Fixed), retesting, then closing (Closed) or reopening (Reopened). You also learned why bugs get 'Rejected' and how to write tickets that aren't bounced. This is a foundational skill every working tester uses daily.",
        "ShopEasyアプリでバグライフサイクル全体を歩きました：発見と起票（New）、割当と修正の追跡（Assigned/Open/Fixed）、再テスト、そしてクローズ（Closed）または再オープン（Reopened）。バグが『Rejected』される理由と、差し戻されないチケットの書き方も学びました。実務のテスター全員が毎日使う土台スキルです。"),
      P("Chặng tiếp theo, bạn nên luyện viết bug report thật chắc và học thêm các kỹ thuật thiết kế ca kiểm thử (bảng quyết định, chuyển trạng thái) để tìm được nhiều lỗi giá trị hơn. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, practice writing solid bug reports and learn case-design techniques (decision table, state transition) to find more valuable bugs. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、しっかりしたバグ報告の練習と、より価値あるバグを見つけるためのケース設計技法（デシジョンテーブル・状態遷移）の学習を。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const DEFECT_LC_01 = makeDoc({
  slug: "vong-doi-cua-mot-loi-defect-life-cycle-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "vòng đời của một lỗi",
  keywords: ["vòng đời của một lỗi", "defect life cycle", "bug life cycle", "trạng thái lỗi", "quy trình quản lý lỗi cho người mới"],
  coverLabel: "NGƯỜI MỚI · VÒNG ĐỜI LỖI · TMĐT",
  crumb: "Vòng đời của một lỗi (Defect Life Cycle)",
  metaTitle: { vi: "Vòng đời của một lỗi (Defect Life Cycle) cho người mới", en: "The bug (defect) life cycle for beginners", ja: "バグライフサイクル入門（初心者向け）" },
  metaDescription: {
    vi: "Vòng đời của một lỗi cho người mới: các trạng thái New, Open, Fixed, Retest, Closed, Reopened qua app TMĐT, cách ghi ticket và theo dõi, có hình và trắc nghiệm.",
    en: "The bug life cycle for beginners: New, Open, Fixed, Retest, Closed, Reopened states via an e-commerce app, how to log and track tickets, with visuals and a quiz.",
    ja: "初心者向けバグライフサイクル：ECアプリでNew・Open・Fixed・Retest・Closed・Reopenedの状態、チケットの起票と追跡、図とクイズ付き。",
  },
  title: {
    vi: "Vòng đời của một lỗi (Defect Life Cycle) cho người mới: từ New tới Closed (có trắc nghiệm)",
    en: "The bug (defect) life cycle for beginners: from New to Closed (with quiz)",
    ja: "初心者のためのバグ（欠陥）ライフサイクル：NewからClosedまで（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: hiểu vòng đời của một lỗi qua app TMĐT ShopEasy. Các trạng thái New → Open → Fixed → Retest → Closed và nhánh Reopened/Rejected, ai xử lý ở mỗi bước, cách ghi ticket đủ thông tin, xử lý lỗi bị bác và mở lại đúng cách, nhiều mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: understand the bug life cycle through the ShopEasy e-commerce app. States New → Open → Fixed → Retest → Closed plus Reopened/Rejected branches, who acts at each step, how to log complete tickets, handling rejected bugs and reopening properly, many UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでバグライフサイクルを理解。状態New→Open→Fixed→Retest→ClosedとReopened/Rejected分岐、各段階の担当、完全なチケットの起票、却下対応と正しい再オープン、多数のモック、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách theo dõi một lỗi qua vòng đời của nó", steps: [
    { name: "Tạo ticket đầy đủ (New)", text: "Ghi bước tái hiện, môi trường, kết quả thực tế/mong đợi, bằng chứng." },
    { name: "Theo dõi khi được giao và sửa", text: "Assigned → Open → Fixed; cập nhật trạng thái sau mỗi hành động." },
    { name: "Kiểm lại rồi đóng hoặc mở lại", text: "Retest đạt → Closed; chưa đạt → Reopened kèm điều kiện còn sai." },
  ] },
  pages,
});

export const MANUAL_BEGINNER_DEFECT_01 = [DEFECT_LC_01];
