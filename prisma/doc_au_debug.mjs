// doc_au_debug.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Gỡ lỗi (debug) test tự động khi fail — đọc thông báo lỗi, dùng trace viewer (screenshot/video/network),
// chạy --debug / --headed, thêm page.pause()/log để thu hẹp phạm vi, cô lập bước fail bằng test.only/--grep,
// và phân biệt lỗi thật (bug) và test viết sai và flaky test. Practice-first, nhiều MOCKUP giao diện (ui_mock),
// code Playwright/CLI chạy được. Gắn app TMĐT ShopEasy (trang thanh toán). Song ngữ vi/en/ja (ja≠en),
// 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hoá, công cụ & dự án thực chiến.",
};
const course1v1Url = "https://cybersoft.edu.vn/trainning-course-1vs1/";

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
    categorySlug: "automation-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", "automation", "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình thanh toán ShopEasy đang fail — chú thích locator + lỗi ──
const m_checkout = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán", [
    field(24, 20, 660, "Số thẻ", "4111 1111 1111 1111", "normal"),
    field(24, 112, 660, "Tên trên thẻ", "NGUYEN VAN A", "normal"),
    btn(24, 204, 220, "Đặt hàng", "primary"),
    annotate(20, 196, 228, 50, "Locator: #btn-checkout"),
    `<text x="24" y="292" font-size="12.5" font-weight="700" fill="#b91c1c">✗ Sau khi bấm "Đặt hàng", không tìm thấy #order-success — test đang fail đúng ở đây</text>`,
  ].join(""), { h: 320, accent: "#0891b2" }),
].join(""), { h: 376, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 2: giải phẫu thông báo lỗi (error message) trong terminal ──
const m_error = (() => {
  const lines = [
    { y: 34, t: "1) checkout.spec.js:24:5 › thanh toan thanh cong voi the hop le", c: "#f87171", b: true },
    { y: 58, t: "Error: expect(locator).toBeVisible() failed", c: "#fca5a5" },
    { y: 82, t: "Locator:  locator('#order-success')", c: "#e2e8f0" },
    { y: 106, t: "Expected: visible", c: "#86efac" },
    { y: 130, t: "Received: <element(s) not found>", c: "#fca5a5" },
    { y: 154, t: "Timeout:  5000ms exceeded", c: "#fcd34d" },
    { y: 178, t: "Call log:", c: "#94a3b8" },
    { y: 200, t: "  - waiting for locator('#order-success')", c: "#64748b" },
    { y: 222, t: "  - element is not attached to the DOM", c: "#64748b" },
  ];
  const els = lines.map((l) => `<text x="30" y="${l.y}" font-size="12" font-family="Menlo,Consolas,monospace" font-weight="${l.b ? 800 : 500}" fill="${l.c}">${l.t}</text>`).join("");
  const inner = `<rect x="16" y="10" width="728" height="290" rx="10" fill="#0f172a"/>${els}
${annotate(24, 70, 460, 26, "Locator bị fail")}
${annotate(24, 94, 430, 50, "Mong đợi vs. Thực tế")}
${annotate(24, 142, 350, 26, "Thời gian chờ hết hạn")}`;
  return browser("terminal — npx playwright test checkout.spec.js", inner, { h: 360, title: "Kết quả chạy test", accent: "#0891b2" });
})();

// ── Mockup 3: màn hình Trace Viewer — danh sách bước + ảnh chụp lúc fail, có annotate ──
const m_trace = (() => {
  const steps = [
    { n: "1", label: "goto('/thanh-toan')", ok: true },
    { n: "2", label: "fill #card-number", ok: true },
    { n: "3", label: "fill #card-name", ok: true },
    { n: "4", label: "click #btn-checkout", ok: true },
    { n: "5", label: "expect(#order-success).toBeVisible()", ok: false },
  ];
  const stepRows = steps.map((s, i) => {
    const y = 44 + i * 54;
    const bg = s.ok ? "#ecfdf5" : "#fef2f2";
    const bd = s.ok ? "#16a34a" : "#ef4444";
    const icon = s.ok ? "✓" : "✗";
    return `<rect x="26" y="${y}" width="210" height="44" rx="8" fill="${bg}" stroke="${bd}"/>
<text x="38" y="${y + 17}" font-size="11" font-weight="800" fill="${bd}">${icon} Bước ${s.n}</text>
<text x="38" y="${y + 33}" font-size="9.5" font-family="Menlo,Consolas,monospace" fill="#334155">${s.label}</text>`;
  }).join("");
  const right = `<rect x="262" y="10" width="478" height="300" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="278" y="30" font-size="11" font-weight="800" fill="#334155">ẢNH CHỤP TẠI BƯỚC FAIL</text>
<rect x="272" y="44" width="458" height="210" rx="8" fill="#0f172a"/>
<text x="284" y="64" font-size="11" fill="#94a3b8">🔒 shopeasy.vn/thanh-toan</text>
<rect x="282" y="80" width="438" height="50" rx="6" fill="#7f1d1d"/>
<text x="294" y="100" font-size="11.5" font-weight="700" fill="#fecaca">⚠ Không tìm thấy phần tử #order-success</text>
<text x="294" y="118" font-size="10.5" fill="#fca5a5">Trang vẫn hiển thị nút "Đặt hàng" — có thể API chậm phản hồi</text>
<text x="284" y="160" font-size="10" font-family="Menlo,Consolas,monospace" fill="#64748b">Console: POST /api/orders → (pending) 6200ms</text>
<text x="278" y="272" font-size="10.5" fill="#64748b">Trace ghi lại: hành động ✓ · ảnh chụp ✓ · video ✓ · mạng ✓ · console ✓</text>
${annotate(282, 80, 438, 50, "Element không xuất hiện")}`;
  const inner = `<text x="30" y="30" font-size="11" font-weight="800" fill="#334155">CÁC BƯỚC (ACTIONS)</text>${stepRows}${right}`;
  return browser("localhost:9323/trace/index.html?trace=checkout.zip", inner, { h: 380, title: "Trace Viewer", accent: "#0891b2" });
})();

// ── Mockup 4: bảng phân biệt lỗi thật, test viết sai và flaky test ──
const m_grid = grid("Phân biệt lỗi thật, test viết sai và flaky test", ["Dấu hiệu khi chạy lại", "Nguyên nhân thường gặp", "Cách gỡ"], [
  ["Fail 100% mọi lần chạy, tái hiện được trên trình duyệt thật", "Chức năng thực sự bị hỏng (backend/giao diện trả sai kết quả)", "Báo bug kèm trace + ảnh chụp + log; KHÔNG sửa test"],
  ["Fail ngay từ lần đầu, soát lại thấy locator/assert không khớp giao diện thật", "Locator trỏ sai phần tử, hoặc assert kỳ vọng sai giá trị", "Sửa locator/assert trong test cho khớp đúng hành vi thực tế"],
  ["Cùng một đoạn code, lúc pass lúc fail dù không đổi gì", "Race condition, chờ (wait) chưa đủ, dữ liệu test không cô lập", "Thêm điều kiện chờ đúng, cô lập dữ liệu, chạy lại nhiều lần để xác nhận"],
], { accent: "#0891b2", note: "Đọc đúng dấu hiệu trước khi sửa — sửa nhầm loại lỗi khiến bạn mất thời gian mà test vẫn đỏ." });

// ── Mockup 5: sơ đồ quy trình cô lập lỗi khi test ShopEasy fail ──
const m_flow = moduleFlow("Quy trình cô lập lỗi khi test thanh toán ShopEasy fail", [
  { id: "fail", label: "Test fail", sub: "checkout.spec.js đỏ trên CI", x: 96, y: 150 },
  { id: "isolate", label: "Cô lập bước", sub: "test.only + --grep", x: 380, y: 150 },
  { id: "debug", label: "Debug trực tiếp", sub: "--debug / page.pause() / log", x: 664, y: 150 },
], [
  { from: "fail", to: "isolate", label: "chạy đúng 1 test" },
  { from: "isolate", to: "debug", label: "xem từng bước" },
], { accent: "#0891b2", h: 260 });

// ── Mockup 6: ticket Jira ghi lại sự cố fail trên CI nhưng pass ở máy local ──
const m_jira = jira({
  key: "SE-14022", title: "Test thanh toán (checkout.spec.js) fail trên CI nhưng pass ở máy local",
  type: "Bug", status: "In Progress", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "CI pipeline (GitHub Actions) · Chrome headless · staging"],
    ["Bước tái hiện", "npx playwright test checkout.spec.js trên CI fail; chạy y hệt trên máy local pass 100%"],
    ["Đã thử", "Bật --trace on trên CI, tải trace.zip về máy, mở bằng npx playwright show-trace"],
    ["Nguyên nhân nghi ngờ", "Máy CI chậm hơn + chạy headless, bước chờ tải trang chưa đủ thời gian cho API trả kết quả"],
  ],
});

// ── Mockup 7: dashboard tỷ lệ pass/fail thật/flaky của bộ test ShopEasy trên CI ──
const m_dashboard = dashboard("Kết quả chạy test tự động ShopEasy trên CI (7 ngày gần nhất)", [
  { label: "Tổng số lần chạy", value: "340", sub: "toàn bộ pipeline CI" },
  { label: "Pass ổn định", value: "298", sub: "87.6%", color: "#16a34a" },
  { label: "Fail thật (bug)", value: "12", sub: "3.5% — đã báo Jira", color: "#ef4444" },
  { label: "Flaky (không ổn định)", value: "30", sub: "8.9% — đang truy tìm nguyên nhân", color: "#f59e0b" },
], { accent: "#0891b2" });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Trace Viewer của Playwright là gì?",
  "What is Playwright's Trace Viewer?",
  "Trace Viewer là công cụ xem lại toàn bộ diễn biến của một lần chạy test: từng hành động (click, fill, goto...), ảnh chụp màn hình tại mỗi bước, video, các yêu cầu mạng và log console. Bạn bật ghi trace bằng cờ --trace on khi chạy test, rồi mở file trace.zip bằng lệnh npx playwright show-trace để xem lại y hệt những gì đã xảy ra, kể cả khi test chạy trên CI chứ không phải máy của bạn.",
  "Trace Viewer is a tool for replaying everything that happened during a test run: every action (click, fill, goto...), a screenshot at each step, video, network requests, and console logs. You enable trace recording with the --trace on flag when running tests, then open the trace.zip file with npx playwright show-trace to see exactly what happened, even when the test ran on CI instead of your own machine.",
  "Trace Viewerとは何？",
  "Trace Viewerは、テスト実行中に起こったすべて——各アクション（クリック、入力、goto...）、各ステップのスクリーンショット、動画、ネットワークリクエスト、コンソールログ——を再生するツールです。テスト実行時に--trace onフラグでトレース記録を有効にし、npx playwright show-traceでtrace.zipファイルを開けば、CI上で実行された場合でも、実際に何が起きたかを正確に見られます。");
const faq2 = FAQ(
  "Vì sao test pass ở máy local nhưng lại fail trên CI?",
  "Why does a test pass on my local machine but fail on CI?",
  "Nguyên nhân phổ biến nhất là tốc độ và môi trường khác nhau: máy CI thường chậm hơn, chạy ở chế độ headless, và có thể xử lý nhiều việc song song nên API phản hồi chậm hơn bình thường. Nếu test không chờ đúng điều kiện (chỉ chờ theo thời gian cố định thay vì chờ phần tử/kết quả thực sự xuất hiện), nó sẽ pass khi máy nhanh (local) và fail khi máy chậm (CI). Bật --trace on trên CI rồi tải trace về xem là cách nhanh nhất để xác nhận đúng nguyên nhân này.",
  "The most common cause is different speed and environment: CI machines are often slower, run headless, and may handle more parallel work, so APIs respond slower than usual. If a test doesn't wait for the right condition (waiting a fixed amount of time instead of waiting for the actual element/result), it will pass on a fast machine (local) and fail on a slow one (CI). Enabling --trace on on CI and downloading the trace to review is the fastest way to confirm this exact cause.",
  "なぜローカルマシンではテストがパスするのに、CIでは失敗する？",
  "最も一般的な原因は速度と環境の違いです：CIマシンは通常より遅く、ヘッドレスモードで動作し、並行処理が多いためAPIの応答が通常より遅くなることがあります。テストが正しい条件を待たず（実際の要素・結果の出現を待つのではなく固定時間だけ待つ場合）、速いマシン（ローカル）ではパスし、遅いマシン（CI）では失敗します。CIで--trace onを有効にしてトレースをダウンロードして確認するのが、この原因を特定する最速の方法です。");
const faq3 = FAQ(
  "Làm sao phân biệt flaky test với một lỗi thật (bug)?",
  "How do you tell a flaky test apart from a real bug?",
  "Chạy đi chạy lại cùng một test, cùng một đoạn code, không đổi gì cả. Nếu kết quả luôn giống nhau (luôn fail, hoặc luôn pass) — nhiều khả năng đó là lỗi thật hoặc test đã ổn định. Nếu kết quả thay đổi thất thường giữa các lần chạy — đó là dấu hiệu điển hình của flaky test, thường do race condition, chờ chưa đủ, hoặc dữ liệu test không được cô lập giữa các lần chạy. Đừng vội sửa code sản phẩm khi chưa xác nhận được điều này.",
  "Run the same test with the exact same code, unchanged, several times in a row. If the result is always the same (always fails, or always passes) — it's likely a real bug or a stable test. If the result flips unpredictably between runs — that's the classic sign of a flaky test, usually caused by a race condition, insufficient waiting, or test data not being isolated between runs. Don't rush to change product code before confirming which case you're in.",
  "flaky testと本当のバグ（bug）はどう見分ける？",
  "全く同じコードで同じテストを何度も実行してみましょう。結果が常に同じ（常に失敗、または常に成功）なら、本当のバグか安定したテストである可能性が高いです。実行のたびに結果が不規則に変わるなら、それはflaky testの典型的な兆候で、通常はrace condition、待機不足、実行間でテストデータが分離されていないことが原因です。どちらのケースか確認する前に急いでプロダクトコードを変更しないようにしましょう。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao nên bật cờ --trace on khi chạy test tự động?", en: "Why should you enable the --trace on flag when running automated tests?", ja: "自動化テストの実行時になぜ--trace onフラグを有効にすべき？" },
    options: [
      { vi: "Để ghi lại hành động, ảnh chụp, video, mạng và console — xem lại đầy đủ sau khi test fail", en: "To record actions, screenshots, video, network and console — so you can fully replay what happened after a test fails", ja: "アクション、スクリーンショット、動画、ネットワーク、コンソールを記録し、テスト失敗後に完全に再生できるようにするため" },
      { vi: "Để test chạy nhanh hơn nhiều lần", en: "To make tests run many times faster", ja: "テストを何倍も速く実行するため" },
      { vi: "Để tự động sửa lỗi trong code test", en: "To automatically fix bugs in the test code", ja: "テストコードのバグを自動的に修正するため" },
      { vi: "Để bỏ qua các bước chờ không cần thiết", en: "To skip unnecessary wait steps", ja: "不要な待機ステップを省略するため" },
    ], correct: 0,
    explain: { vi: "Trace ghi lại toàn bộ diễn biến của lần chạy, giúp bạn xem lại y hệt những gì đã xảy ra kể cả khi fail trên CI, không phải máy của bạn.", en: "The trace records the entire run, letting you replay exactly what happened even when the failure occurred on CI, not your own machine.", ja: "トレースは実行全体を記録し、CI上で失敗した場合でも実際に何が起きたかを正確に再生できるようにします。" },
  }),
  mcq({
    q: { vi: "Cách nào giúp bạn tạm dừng test ngay tại một bước để xem trực tiếp trình duyệt và Inspector?", en: "What lets you pause a test right at a specific step to inspect the browser live?", ja: "テストを特定のステップで一時停止し、ブラウザとInspectorをその場で確認する方法は？" },
    options: [
      { vi: "Thêm page.pause() vào code, hoặc chạy npx playwright test --debug", en: "Add page.pause() in the code, or run npx playwright test --debug", ja: "コードにpage.pause()を追加するか、npx playwright test --debugを実行する" },
      { vi: "Chỉ cần chạy --headed mà không thêm gì khác", en: "Just run --headed without adding anything else", ja: "他に何も追加せず--headedを実行するだけ" },
      { vi: "Thêm nhiều console.log() vào code sản phẩm", en: "Add many console.log() calls into the product code", ja: "プロダクトコードに多数のconsole.log()を追加する" },
      { vi: "Tăng số lần retry trong playwright.config.js", en: "Increase the retry count in playwright.config.js", ja: "playwright.config.jsのretry回数を増やす" },
      { vi: "Xoá bớt các assert trong test", en: "Remove some of the assertions from the test", ja: "テストからいくつかのアサーションを削除する" },
    ], correct: 0,
    explain: { vi: "page.pause() dừng ngay tại dòng đó và mở Playwright Inspector; cờ --debug làm điều tương tự cho cả file test, cho phép bạn bước qua từng hành động.", en: "page.pause() halts execution right there and opens the Playwright Inspector; the --debug flag does the same for the whole test file, letting you step through each action.", ja: "page.pause()はその行で実行を停止しPlaywright Inspectorを開きます。--debugフラグはテストファイル全体に対して同様に動作し、各アクションを1つずつ確認できます。" },
  }),
  mcq({
    q: { vi: "Dấu hiệu điển hình của một flaky test là gì?", en: "What's the typical sign of a flaky test?", ja: "flaky testの典型的な兆候は何？" },
    options: [
      { vi: "Luôn fail 100% ở mọi lần chạy, không có ngoại lệ", en: "It always fails 100% of the time, no exceptions", ja: "例外なく毎回100%失敗する" },
      { vi: "Cùng một đoạn code, không đổi gì, nhưng có lúc pass có lúc fail", en: "The exact same code, unchanged, sometimes passes and sometimes fails", ja: "全く同じコードで、何も変えていないのに、時々パスし時々失敗する" },
      { vi: "Luôn pass 100% dù dữ liệu đầu vào thay đổi", en: "It always passes 100% regardless of changing input data", ja: "入力データが変わっても常に100%パスする" },
      { vi: "Chỉ fail khi cố tình sửa sai locator trong code", en: "It only fails when you deliberately break a locator in the code", ja: "コード内のロケーターをわざと壊したときだけ失敗する" },
    ], correct: 1,
    explain: { vi: "Flaky test cho kết quả không nhất quán dù code không đổi, thường do race condition, chờ chưa đủ, hoặc dữ liệu test chưa được cô lập giữa các lần chạy.", en: "A flaky test gives inconsistent results even though the code doesn't change, usually due to race conditions, insufficient waiting, or test data not isolated between runs.", ja: "flaky testはコードが変わらなくても結果が一貫しません。通常はrace condition、待機不足、実行間でテストデータが分離されていないことが原因です。" },
  }),
  mcq({
    q: { vi: "Khi nhận thông báo test fail, bước ĐẦU TIÊN nên làm là gì?", en: "When you get a test failure notification, what's the FIRST thing you should do?", ja: "テスト失敗の通知を受けたとき、最初にすべきことは？" },
    options: [
      { vi: "Đọc kỹ toàn bộ thông báo lỗi (locator, expected, received, timeout) trước khi đoán nguyên nhân", en: "Carefully read the entire error message (locator, expected, received, timeout) before guessing the cause", ja: "原因を推測する前に、エラーメッセージ全体（ロケーター、期待値、実際の値、タイムアウト）をよく読む" },
      { vi: "Xoá test đó luôn vì có vẻ nó gây phiền phức", en: "Delete that test right away since it seems to be causing trouble", ja: "面倒に見えるのでそのテストをすぐ削除する" },
      { vi: "Chạy lại nhiều lần liên tục, hy vọng lần nào đó nó tự pass", en: "Re-run it repeatedly, hoping it eventually passes on its own", ja: "いつか自然にパスすることを期待して何度も再実行する" },
      { vi: "Báo bug cho đội phát triển ngay lập tức mà chưa xem thông báo lỗi", en: "Report a bug to the dev team immediately, without reading the error message", ja: "エラーメッセージを見ずにすぐ開発チームにバグを報告する" },
    ], correct: 0,
    explain: { vi: "Thông báo lỗi thường chứa đủ manh mối (locator nào, mong đợi gì, nhận được gì, chờ bao lâu) — đọc kỹ trước giúp bạn tránh đoán sai và mất thời gian sửa nhầm hướng.", en: "The error message usually contains enough clues (which locator, what was expected, what was received, how long it waited) — reading it carefully first helps avoid wrong guesses and wasted time fixing the wrong thing.", ja: "エラーメッセージには通常十分な手がかり（どのロケーター、何を期待し、何を受け取り、どれだけ待ったか）が含まれます。先によく読むことで誤った推測や見当違いの修正で時間を無駄にするのを防げます。" },
  }),
  mcq({
    q: { vi: "Cách nào giúp bạn cô lập đúng 1 test cụ thể để debug, thay vì chạy toàn bộ bộ test?", en: "What lets you isolate exactly one specific test to debug, instead of running the entire suite?", ja: "全体のテストスイートを実行する代わりに、デバッグしたい特定の1つのテストだけを分離する方法は？" },
    options: [
      { vi: "Dùng test.only trong code, hoặc chạy kèm cờ --grep với tên test", en: "Use test.only in the code, or run with the --grep flag and the test's name", ja: "コードでtest.onlyを使うか、テスト名を指定して--grepフラグ付きで実行する" },
      { vi: "Xoá hết mọi test khác ra khỏi repository", en: "Delete every other test from the repository", ja: "リポジトリから他のテストをすべて削除する" },
      { vi: "Comment (chú thích) toàn bộ file test lại", en: "Comment out the entire test file", ja: "テストファイル全体をコメントアウトする" },
      { vi: "Không có cách nào, luôn phải chạy toàn bộ bộ test", en: "There's no way to do this, you must always run the whole suite", ja: "方法はなく、常にスイート全体を実行しなければならない" },
    ], correct: 0,
    explain: { vi: "test.only đánh dấu ngay trong code chỉ chạy 1 test đó; --grep lọc theo tên test khi chạy lệnh — cả hai đều giúp cô lập nhanh mà không phải sửa cấu trúc dự án.", en: "test.only marks in code that only that one test should run; --grep filters by test name at run time — both quickly isolate a test without restructuring the project.", ja: "test.onlyはコード内でその1つのテストだけを実行するよう指定し、--grepは実行時にテスト名でフィルタします。どちらもプロジェクト構造を変えずに素早くテストを分離できます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ debug", en: "1. TL;DR & the screen you'll debug", ja: "1. 要点とデバッグする画面" },
    blocks: [
      TLDR("Gỡ lỗi (debug) test tự động là kỹ năng đọc đúng thông báo lỗi, dùng Trace Viewer để xem lại hành động/ảnh chụp/video/mạng, chạy --debug hoặc --headed để xem trực tiếp, thêm page.pause()/log để thu hẹp phạm vi, cô lập đúng bước fail, rồi phân biệt lỗi thật (bug), test viết sai và flaky test. Bài này bám theo màn thanh toán của app TMĐT ShopEasy, dùng Playwright, có lệnh chạy được thật và nhiều hình minh hoạ. CyberSoft Academy dạy automation testing bài bản từ zero tới đi làm.",
        "Debugging automated tests means reading error messages correctly, using the Trace Viewer to replay actions/screenshots/video/network, running --debug or --headed to watch live, adding page.pause()/logs to narrow down the scope, isolating the exact failing step, then telling apart a real bug, a wrong test, and a flaky test. This article follows ShopEasy's checkout screen with Playwright, real runnable commands and lots of visuals. CyberSoft Academy teaches automation testing properly from zero to hired.",
        "自動化テストのデバッグとは、エラーメッセージを正しく読み、Trace Viewerでアクション・スクリーンショット・動画・ネットワークを再生し、--debugや--headedでライブ確認し、page.pause()やログで範囲を絞り込み、失敗したステップを正確に分離し、本当のバグ・テストの誤り・flaky testを見分けるスキルです。本記事はShopEasyの決済画面に沿い、Playwrightと実行可能なコマンド、豊富な図解を使います。CyberSoft Academyはゼロから就職までautomation testingを体系的に教えています。"),
      P("Chào bạn mới! Test tự động màu đỏ trên màn hình luôn khiến người mới bối rối: nhìn vào một đống chữ tiếng Anh dài, không biết nên đọc từ đâu, nên bấm nút gì. Cảm giác đó hoàn toàn bình thường — kể cả tester lâu năm cũng cần một quy trình rõ ràng để không đoán mò. Bài này sẽ đưa bạn qua đúng quy trình đó: đọc lỗi, xem trace, chạy debug trực tiếp, thêm log, cô lập bước fail, và cuối cùng là phân loại đúng nguyên nhân. Chúng ta thực hành trên màn thanh toán ShopEasy — một luồng quen thuộc, dễ hình dung, có code Playwright chạy được thật.",
        "Hi, newcomer! A red automated test on screen always confuses beginners: staring at a wall of English text, not knowing where to start reading or what button to click. That feeling is completely normal — even seasoned testers need a clear process so they don't just guess. This article walks you through exactly that process: read the error, view the trace, run live debugging, add logs, isolate the failing step, and finally correctly classify the cause. We'll practice on ShopEasy's checkout flow — a familiar, easy-to-picture flow, with real runnable Playwright code.",
        "こんにちは、初心者さん！画面上の赤い自動化テストは初心者をいつも困惑させます——長い英語の文字の壁を見つめ、どこから読めばいいのか、どのボタンを押せばいいのか分かりません。その感覚は全く普通です——ベテランのテスターでさえ、当てずっぽうにならないよう明確なプロセスが必要です。本記事はまさにそのプロセスを案内します：エラーを読む、トレースを見る、ライブデバッグを実行する、ログを追加する、失敗したステップを分離する、そして最後に原因を正しく分類する。ShopEasyの決済フロー——馴染みやすく想像しやすいフローで、実際に動くPlaywrightコードを使って実習します。"),
      IMG(m_checkout, "Màn hình thanh toán ShopEasy: sau khi bấm 'Đặt hàng', test không tìm thấy #order-success", "ShopEasy checkout screen: after clicking 'Order', the test can't find #order-success", "ShopEasy決済画面：『注文する』をクリック後、テストが#order-successを見つけられない"),
      DEF("Debug test tự động", "quá trình tìm ra vì sao một test tự động báo fail, bằng cách đọc thông báo lỗi, xem lại diễn biến (trace/screenshot/video), và thu hẹp dần phạm vi nghi ngờ cho tới khi thấy đúng nguyên nhân.",
        "the process of finding out why an automated test fails, by reading the error message, replaying what happened (trace/screenshot/video), and progressively narrowing the suspected scope until the real cause is found.",
        "自動化テストがなぜ失敗したのかを、エラーメッセージを読み、起きたこと（トレース・スクリーンショット・動画）を再生し、疑わしい範囲を段々絞り込んで本当の原因を見つけるまでのプロセス。"),
    ] },
  { heading: { vi: "2. Vấn đề: test đỏ, và không biết bắt đầu từ đâu", en: "2. The problem: a red test, and no idea where to start", ja: "2. 問題：テストが赤くなり、どこから始めればいいか分からない" },
    blocks: [
      P("Hãy hình dung: bạn vừa chạy npx playwright test, terminal in ra một khối chữ đỏ dài, kèm dòng '1 failed'. Phản xạ của nhiều người mới là hoảng, đọc lướt qua rồi đoán bừa — có thể là do mạng chậm, có thể do 'trình duyệt bị lỗi gì đó'. Đoán mò như vậy khiến bạn sửa sai chỗ, mất thời gian, và tệ hơn là báo nhầm bug cho đội phát triển trong khi lỗi thực ra nằm ở chính test.",
        "Imagine this: you just ran npx playwright test, and the terminal prints a long block of red text along with '1 failed'. Many beginners' reflex is to panic, skim it, then guess randomly — maybe the network was slow, maybe 'something's wrong with the browser'. Guessing like that leads you to fix the wrong spot, waste time, and worse, report a false bug to the dev team when the issue actually lies in the test itself.",
        "想像してみてください：npx playwright testを実行したところ、ターミナルに長い赤い文字のブロックと『1 failed』という行が表示される。多くの初心者の反射的な反応はパニックになり、ざっと目を通してから当てずっぽうに推測すること——ネットワークが遅いのかも、『ブラウザに何か問題があった』のかもしれない、と。そのような当てずっぽうは間違った場所を修正し、時間を無駄にし、さらに悪いことに、実際にはテスト自体に問題があるのに開発チームに誤ったバグを報告することにつながります。"),
      P("Gỡ lỗi hiệu quả không phải là 'may mắn đoán trúng' — mà là một quy trình lặp lại được: (1) đọc kỹ thông báo lỗi để biết chính xác nó fail ở đâu và vì sao, (2) xem lại diễn biến bằng Trace Viewer hoặc chạy trực tiếp bằng --debug, (3) thu hẹp phạm vi bằng cách cô lập đúng bước/test đang fail, (4) phân loại nguyên nhân: lỗi thật, test viết sai, hay flaky. Nếu bạn muốn học bài bản cả automation lẫn cách làm việc chuyên nghiệp như một tester đi làm thật sự, một khoá học có mentor hướng dẫn từng bước — như https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ — sẽ giúp bạn rút ngắn thời gian tự mò mẫm.",
        "Effective debugging isn't about 'luckily guessing right' — it's a repeatable process: (1) carefully read the error message to know exactly where and why it failed, (2) replay what happened using the Trace Viewer or run live with --debug, (3) narrow the scope by isolating the exact failing step/test, (4) classify the cause: real bug, wrong test, or flaky. If you want to learn both automation and how to work like a real professional tester properly, a course with mentors guiding you step by step — like https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ — helps you cut down the time spent figuring things out alone.",
        "効果的なデバッグとは『運よく当てずっぽうが当たる』ことではなく、繰り返し使えるプロセスです：（1）どこでなぜ失敗したかを正確に知るためエラーメッセージをよく読む、（2）Trace Viewerで起きたことを再生するか--debugでライブ実行する、（3）失敗した正確なステップ/テストを分離して範囲を絞り込む、（4）原因を分類する：本当のバグ、テストの誤り、またはflaky。自動化と本物のプロフェッショナルテスターとしての働き方の両方を体系的に学びたいなら、メンターが一歩ずつ指導するコース——https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ のような——が、独学で試行錯誤する時間を大きく短縮してくれます。"),
      DEF("Flaky test", "một test cho kết quả không nhất quán giữa các lần chạy dù code không hề thay đổi — lúc pass, lúc fail — thường do timing hoặc dữ liệu chưa được cô lập.",
        "a test that gives inconsistent results across runs even though the code never changes — sometimes passing, sometimes failing — usually caused by timing or non-isolated data.",
        "コードが全く変わっていないのに実行のたびに結果が一貫しないテスト——時々パスし、時々失敗する——通常はタイミングやデータの分離不足が原因。"),
    ] },
  { heading: { vi: "3. Đọc thông báo lỗi (error message) đúng cách", en: "3. Reading the error message correctly", ja: "3. エラーメッセージの正しい読み方" },
    blocks: [
      P("Thông báo lỗi của Playwright không phải là 'mớ chữ hù dọa' — nó có cấu trúc rõ ràng, và mỗi phần trả lời đúng 1 câu hỏi. Locator cho biết Playwright đang tìm phần tử nào. Expected cho biết bạn mong đợi điều gì (ví dụ: 'visible' — phần tử phải hiển thị). Received cho biết Playwright thực sự thấy gì (ví dụ: không tìm thấy phần tử nào cả). Timeout cho biết nó đã chờ bao lâu trước khi bỏ cuộc. Đọc đủ 4 phần này trước khi đoán nguyên nhân sẽ tiết kiệm rất nhiều thời gian.",
        "Playwright's error message isn't 'a scary wall of text' — it has a clear structure, and each part answers exactly one question. Locator tells you which element Playwright was looking for. Expected tells you what you expected (e.g. 'visible' — the element should be shown). Received tells you what Playwright actually saw (e.g. no element found at all). Timeout tells you how long it waited before giving up. Reading all four parts before guessing the cause saves a lot of time.",
        "Playwrightのエラーメッセージは『怖い文字の壁』ではありません——明確な構造を持ち、各部分が正確に1つの疑問に答えます。Locatorはどの要素を探していたかを示します。Expectedは何を期待していたか（例：『visible』——要素が表示されているはず）を示します。Receivedは実際に何が見えたか（例：要素が全く見つからなかった）を示します。Timeoutはあきらめる前にどれだけ待ったかを示します。原因を推測する前にこの4つ全てを読むことで、多くの時間を節約できます。"),
      IMG(m_error, "Giải phẫu thông báo lỗi trong terminal: Locator, Expected/Received, Timeout được chú thích rõ", "Anatomy of a terminal error message: Locator, Expected/Received, and Timeout annotated", "ターミナルのエラーメッセージの構造：ロケーター、期待値/実際の値、タイムアウトを注記"),
      P("Với ví dụ ở màn thanh toán ShopEasy: thông báo cho biết Playwright chờ locator('#order-success') trở nên 'visible' nhưng nhận về 'element(s) not found' sau 5000ms. Chỉ riêng thông tin này đã thu hẹp phạm vi rất nhiều: vấn đề nằm ở việc phần tử báo thành công không xuất hiện đúng lúc — có thể do API xử lý đơn hàng chậm, hoặc id đã đổi, hoặc luồng thanh toán thực sự bị lỗi. Bước tiếp theo là xem lại trace để biết chính xác cái nào trong ba khả năng đó.",
        "Take the ShopEasy checkout example: the message says Playwright waited for locator('#order-success') to become 'visible' but got 'element(s) not found' after 5000ms. That alone narrows things down a lot: the problem is that the success element didn't appear in time — maybe the order-processing API was slow, maybe the id changed, or maybe the checkout flow genuinely broke. The next step is reviewing the trace to know exactly which of those three it is.",
        "ShopEasyの決済例で言えば、メッセージはPlaywrightがlocator('#order-success')が『visible』になるのを待ったが、5000ms後に『element(s) not found』を受け取ったことを示しています。この情報だけでもかなり絞り込めます：問題は成功要素が時間内に表示されなかったことです——注文処理APIが遅かったのか、idが変わったのか、あるいは決済フローが本当に壊れたのかもしれません。次のステップは、この3つのうちどれかを正確に知るためトレースを確認することです。"),
      TIP("Đọc thông báo lỗi từ dưới lên đôi khi dễ hơn: dòng 'Call log' cuối cùng thường cho biết chính xác Playwright đang đứng chờ ở đâu ngay trước khi timeout.", "Sometimes it's easier to read the error message bottom-up: the last 'Call log' line often tells you exactly where Playwright was waiting right before the timeout.", "エラーメッセージを下から上に読む方が簡単な場合もあります：最後の『Call log』の行は、タイムアウトの直前にPlaywrightがどこで待っていたかを正確に示すことが多いです。"),
    ] },
  { heading: { vi: "4. Trace Viewer: bật --trace on & đọc dấu vết", en: "4. Trace Viewer: enabling --trace on & reading the trace", ja: "4. Trace Viewer：--trace onを有効にしてトレースを読む" },
    blocks: [
      P("Thông báo lỗi cho bạn biết CÁI GÌ đã sai, nhưng Trace Viewer cho bạn thấy TOÀN BỘ diễn biến — từng hành động, ảnh chụp màn hình tại mỗi bước, video ghi lại, các yêu cầu mạng, và log console. Đây là công cụ mạnh nhất khi test fail trên CI, nơi bạn không thể ngồi nhìn trực tiếp trình duyệt như ở máy mình.",
        "The error message tells you WHAT went wrong, but the Trace Viewer shows you the ENTIRE sequence of events — every action, a screenshot at each step, a recorded video, network requests, and console logs. It's the most powerful tool when a test fails on CI, where you can't watch the browser live like on your own machine.",
        "エラーメッセージは何が間違っていたかを教えてくれますが、Trace Viewerは出来事の全体像——各アクション、各ステップのスクリーンショット、録画された動画、ネットワークリクエスト、コンソールログ——を見せてくれます。自分のマシンのようにブラウザをライブで見られないCI上でテストが失敗したとき、最も強力なツールです。"),
      STEP(1, "Bật ghi trace khi chạy test bằng cờ --trace on (hoặc bật sẵn trong playwright.config.js).", "Enable trace recording when running the test with the --trace on flag (or turn it on in playwright.config.js).", "テスト実行時に--trace onフラグでトレース記録を有効にする（またはplaywright.config.jsで有効にしておく）。"),
      STEP(2, "Sau khi chạy xong, mở file trace bằng lệnh npx playwright show-trace trỏ tới đường dẫn trace.zip.", "After the run finishes, open the trace file with npx playwright show-trace pointing to the trace.zip path.", "実行後、npx playwright show-traceコマンドでtrace.zipのパスを指定して開く。"),
      STEP(3, "Bấm qua từng bước trong danh sách bên trái, quan sát ảnh chụp/video bên phải để thấy chính xác giao diện tại thời điểm đó.", "Click through each step in the list on the left, and watch the screenshot/video on the right to see exactly what the UI looked like at that moment.", "左のリストで各ステップをクリックし、右のスクリーンショット/動画でその瞬間のUIを正確に確認する。"),
      CODE("bash", "# Chay 1 test va ghi lai trace day du (hanh dong, anh chup, video, mang)\nnpx playwright test checkout.spec.js --trace on\n\n# Mo lai trace de xem: danh sach buoc + anh chup + video + network + console\nnpx playwright show-trace trace.zip\n\n# Tren CI: chi ghi trace khi test fail, do gon nhe (khuyen nghi)\nnpx playwright test --trace retain-on-failure"),
      IMG(m_trace, "Trace Viewer: bên trái là các bước đã chạy, bên phải là ảnh chụp tại bước fail (#order-success không xuất hiện)", "Trace Viewer: the steps run on the left, and a screenshot at the failing step on the right (#order-success didn't appear)", "Trace Viewer：左側は実行されたステップ、右側は失敗したステップのスクリーンショット（#order-successが表示されない）"),
    ] },
  { heading: { vi: "5. Chạy --debug / --headed để xem trực tiếp (thực hành)", en: "5. Running --debug / --headed to watch live (hands-on)", ja: "5. --debug／--headedでライブ確認する（実習）" },
    blocks: [
      P("Đôi khi trace vẫn chưa đủ — bạn muốn tự mắt xem trình duyệt hoạt động, tương tác trực tiếp để thử các giả thuyết. --headed mở trình duyệt thật thay vì chạy ẩn (headless); --debug đi xa hơn: mở luôn Playwright Inspector, cho bạn bước qua từng hành động và tạm dừng bất cứ lúc nào.",
        "Sometimes the trace still isn't enough — you want to watch the browser with your own eyes, interacting live to test hypotheses. --headed opens a real, visible browser instead of running headless; --debug goes further: it opens the Playwright Inspector, letting you step through each action and pause at any time.",
        "トレースだけでは不十分な場合もあります——自分の目でブラウザの動きを見て、仮説を試すためにライブで操作したいことがあります。--headedはヘッドレスではなく実際に見えるブラウザを開きます。--debugはさらに進んで、Playwright Inspectorを開き、各アクションを1つずつ確認し、いつでも一時停止できるようにします。"),
      STEP(1, "Chạy npx playwright test checkout.spec.js --debug để mở Playwright Inspector cho đúng file test.", "Run npx playwright test checkout.spec.js --debug to open the Playwright Inspector for that test file.", "npx playwright test checkout.spec.js --debugを実行し、そのテストファイル用にPlaywright Inspectorを開く。"),
      STEP(2, "Bấm nút 'Step over' trong Inspector để chạy từng hành động một, quan sát trình duyệt sau mỗi bước.", "Click the 'Step over' button in the Inspector to run one action at a time, watching the browser after each step.", "Inspectorの『Step over』ボタンをクリックして1つずつアクションを実行し、各ステップ後にブラウザを確認する。"),
      STEP(3, "Khi tới đúng bước bấm 'Đặt hàng', quan sát xem #order-success có xuất hiện hay không, và mất bao lâu để xuất hiện.", "When you reach the 'Order' click step, watch whether #order-success appears or not, and how long it takes to appear.", "『注文する』をクリックするステップに達したら、#order-successが表示されるかどうか、表示されるまでどれくらいかかるか確認する。"),
      CODE("bash", "# Mo Playwright Inspector cho dung file test, buoc qua tung hanh dong\nnpx playwright test checkout.spec.js --debug\n\n# Chi mo trinh duyet that (khong headless), khong dung Inspector\nnpx playwright test checkout.spec.js --headed\n\n# Debug 1 dong trinh duyet cu the (huu ich khi co nhieu du an)\nPWDEBUG=1 npx playwright test checkout.spec.js"),
      TIP("Muốn thành thạo cả debug lẫn quy trình automation chuẩn dự án thực tế của một tester đi làm, khóa học tại CyberSoft dạy đầy đủ từ nền tảng tới dự án: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/", "If you want to master both debugging and the real automation workflow of a working tester, CyberSoft's course teaches it fully from fundamentals to real projects: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/", "デバッグと実際に働くテスターの本物の自動化ワークフローの両方をマスターしたいなら、CyberSoftのコースが基礎から実プロジェクトまで体系的に教えます：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/"),
    ] },
  { heading: { vi: "6. page.pause() & thêm log để thu hẹp phạm vi (thực hành)", en: "6. page.pause() & adding logs to narrow the scope (hands-on)", ja: "6. page.pause()とログ追加で範囲を絞り込む（実習）" },
    blocks: [
      P("Nếu bạn chỉ nghi ngờ 1 đoạn code cụ thể, không cần --debug cho cả file — chỉ cần thêm dòng await page.pause() ngay tại chỗ nghi ngờ. Test sẽ dừng đúng tại đó, mở Inspector, và bạn có thể gõ lệnh trực tiếp vào console để kiểm tra trạng thái phần tử. Kết hợp với vài dòng console.log() in ra giá trị biến, bạn nhanh chóng thấy được dữ liệu thực tế khác gì so với mong đợi.",
        "If you only suspect one specific piece of code, you don't need --debug for the whole file — just add an await page.pause() line right at the suspicious spot. The test halts exactly there, opens the Inspector, and you can type commands directly into the console to check the element's state. Combined with a few console.log() lines printing variable values, you quickly see how the actual data differs from what you expected.",
        "特定のコードだけを疑っている場合、ファイル全体に--debugは不要です——疑わしい箇所にawait page.pause()の行を追加するだけです。テストはそこで正確に停止し、Inspectorを開き、コンソールに直接コマンドを入力して要素の状態を確認できます。変数の値を出力するいくつかのconsole.log()行と組み合わせれば、実際のデータが期待とどう違うかをすばやく確認できます。"),
      STEP(1, "Thêm await page.pause() ngay sau dòng click nút 'Đặt hàng' trong test.", "Add await page.pause() right after the line that clicks the 'Order' button in the test.", "テストで『注文する』ボタンをクリックする行の直後にawait page.pause()を追加する。"),
      STEP(2, "Chạy lại test (không cần --debug, page.pause() tự mở Inspector), kiểm tra phần tử #order-success có tồn tại trong DOM không.", "Re-run the test (no need for --debug, page.pause() opens the Inspector on its own), and check whether #order-success exists in the DOM.", "テストを再実行する（page.pause()が自動的にInspectorを開くため--debugは不要）。#order-successがDOMに存在するか確認する。"),
      STEP(3, "Thêm console.log(await page.locator('#order-success').count()) ngay trước assert để in ra số lượng phần tử tìm thấy.", "Add console.log(await page.locator('#order-success').count()) right before the assertion to print how many matching elements were found.", "アサーションの直前にconsole.log(await page.locator('#order-success').count())を追加し、見つかった要素数を出力する。"),
      CODE("javascript", "// tests/checkout.spec.js\ntest('thanh toan thanh cong voi the hop le', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/thanh-toan');\n  await page.locator('#card-number').fill('4111111111111111');\n  await page.locator('#card-name').fill('NGUYEN VAN A');\n  await page.locator('#btn-checkout').click();\n\n  // Tam dung ngay day de kiem tra truc tiep trong Inspector\n  await page.pause();\n\n  const count = await page.locator('#order-success').count();\n  console.log('So phan tu #order-success tim thay:', count);\n\n  await expect(page.locator('#order-success')).toBeVisible();\n});"),
      TRY("Thử đổi thời gian chờ mặc định (ví dụ dùng { timeout: 15000 } trong toBeVisible) rồi chạy lại — nếu test bắt đầu pass, đó là dấu hiệu mạnh cho thấy vấn đề nằm ở tốc độ phản hồi, không phải logic sai.", "Try changing the default wait (e.g. using { timeout: 15000 } in toBeVisible) and re-run — if the test starts passing, that's a strong sign the issue is response speed, not broken logic.", "デフォルトの待機時間を変えて（例：toBeVisibleで{ timeout: 15000 }を使う）再実行してみよう——テストがパスし始めたら、それは問題がロジックの誤りではなく応答速度にあるという強い兆候です。"),
    ] },
  { heading: { vi: "7. Cô lập bước fail: test.only & --grep (thực hành)", en: "7. Isolating the failing step: test.only & --grep (hands-on)", ja: "7. 失敗ステップの分離：test.onlyと--grep（実習）" },
    blocks: [
      P("Khi bộ test có hàng chục, hàng trăm test, chạy lại toàn bộ chỉ để debug 1 test rất mất thời gian. Playwright cho hai cách cô lập nhanh: test.only đánh dấu ngay trong code để chỉ chạy đúng test đó; --grep lọc theo tên test khi gõ lệnh, không cần sửa code. Cả hai giúp bạn lặp lại vòng sửa-chạy-xem kết quả nhanh hơn rất nhiều.",
        "When a test suite has dozens or hundreds of tests, re-running everything just to debug one test wastes a lot of time. Playwright offers two quick ways to isolate: test.only marks in code to run only that test; --grep filters by test name at the command line, no code changes needed. Both help you repeat the fix-run-check cycle much faster.",
        "テストスイートに数十、数百のテストがある場合、1つのテストをデバッグするためだけに全体を再実行するのは非常に時間がかかります。Playwrightには2つの素早い分離方法があります：test.onlyはコード内でそのテストだけを実行するよう指定し、--grepはコマンド実行時にテスト名でフィルタし、コード変更は不要です。どちらも修正・実行・確認のサイクルをずっと速く繰り返せるようにします。"),
      STEP(1, "Mở tests/checkout.spec.js, đổi test('...', ...) thành test.only('...', ...) cho đúng test đang fail.", "Open tests/checkout.spec.js, and change test('...', ...) to test.only('...', ...) for the exact failing test.", "tests/checkout.spec.jsを開き、失敗している正確なテストのtest('...', ...)をtest.only('...', ...)に変える。"),
      STEP(2, "Chạy lại npx playwright test — chỉ đúng test đó chạy, các test khác bị bỏ qua.", "Re-run npx playwright test — only that test runs, the others are skipped.", "npx playwright testを再実行する——そのテストだけが実行され、他はスキップされる。"),
      STEP(3, "Nhớ xoá .only trước khi commit, hoặc dùng --grep khi chạy lệnh để không phải sửa code.", "Remember to remove .only before committing, or use --grep at the command line so you don't have to touch the code.", "コミット前に.onlyを削除するのを忘れないこと。またはコードを触らずに済むよう、コマンドで--grepを使う。"),
      CODE("bash", "# Loc theo ten test (khong can sua code, an toan hon test.only)\nnpx playwright test --grep \"thanh toan thanh cong voi the hop le\"\n\n# Chi chay 1 file test cu the\nnpx playwright test tests/checkout.spec.js\n\n# Ket hop: 1 file + --debug de vua co lap vua xem truc tiep\nnpx playwright test tests/checkout.spec.js --grep \"thanh toan\" --debug"),
      IMG(m_flow, "Quy trình cô lập lỗi: từ test fail trên CI, cô lập bằng test.only/--grep, rồi debug trực tiếp bằng --debug/page.pause()/log", "Isolation flow: from a CI test failure, isolate with test.only/--grep, then debug live with --debug/page.pause()/logs", "分離フロー：CIでのテスト失敗から、test.only/--grepで分離し、--debug/page.pause()/ログでライブデバッグする"),
    ] },
  { heading: { vi: "8. Phân biệt lỗi thật, test viết sai và flaky test", en: "8. Telling apart a real bug, a wrong test, and a flaky test", ja: "8. 本当のバグ・テストの誤り・flaky testの見分け方" },
    blocks: [
      P("Sau khi đã xem trace và debug trực tiếp, bước quan trọng nhất là phân loại đúng nguyên nhân — vì mỗi loại cần một cách xử lý hoàn toàn khác nhau. Sửa nhầm loại (ví dụ sửa code sản phẩm trong khi lỗi thực ra nằm ở test viết sai locator) khiến bạn tốn công mà vấn đề vẫn còn nguyên.",
        "After reviewing the trace and debugging live, the most important step is correctly classifying the cause — because each type needs a completely different fix. Fixing the wrong category (e.g. changing product code when the real issue is a wrong locator in the test) wastes effort while the problem remains.",
        "トレースを確認しライブデバッグした後、最も重要なステップは原因を正しく分類することです——それぞれのタイプが全く異なる対処を必要とするからです。間違ったカテゴリーを直す（例：実際にはテストのロケーターが間違っているのにプロダクトコードを変更する）と、労力を無駄にし問題は解決しません。"),
      IMG(m_grid, "Bảng phân biệt: dấu hiệu, nguyên nhân và cách gỡ tương ứng với lỗi thật, test viết sai và flaky test", "Comparison table: signs, causes and the matching fix for a real bug, a wrong test, and a flaky test", "比較表：本当のバグ・テストの誤り・flaky testそれぞれの兆候、原因、対処法"),
      P("Cách kiểm tra nhanh: chạy lại đúng test đó (không đổi gì) 3-5 lần liên tiếp. Nếu luôn fail giống hệt nhau và bạn tái hiện được bằng tay trên trình duyệt thật — đó là lỗi thật, hãy báo bug kèm trace. Nếu soát code test thấy locator/assert không khớp với giao diện thật — đó là test viết sai, sửa lại test. Nếu kết quả thay đổi thất thường giữa các lần chạy — đó là flaky, cần tìm đúng chỗ chờ chưa đủ hoặc dữ liệu chưa cô lập, chứ không phải chạy lại cho tới khi nó pass rồi bỏ qua.",
        "A quick check: re-run the exact same test (nothing changed) 3-5 times in a row. If it always fails identically and you can reproduce it manually on a real browser — it's a real bug, report it with the trace. If reviewing the test code shows the locator/assert doesn't match the real UI — it's a wrong test, fix the test. If results flip unpredictably between runs — it's flaky, and you need to find where the wait is insufficient or data isn't isolated, not just re-run until it passes and move on.",
        "簡単な確認方法：全く同じテスト（何も変えていない）を3〜5回連続で再実行する。常に同じように失敗し、実際のブラウザで手動で再現できるなら——それは本当のバグなので、トレース付きで報告する。テストコードを見直してロケーター/アサーションが実際のUIと一致していないなら——それはテストの誤りなので、テストを修正する。実行のたびに結果が不規則に変わるなら——それはflakyであり、パスするまで再実行して見過ごすのではなく、待機不足やデータ未分離の箇所を見つける必要がある。"),
    ] },
  { heading: { vi: "9. Tình huống 1: fail trên CI nhưng pass ở máy local", en: "9. Situation 1: failing on CI but passing on the local machine", ja: "9. シーン1：CIでは失敗するがローカルではパスする" },
    blocks: [
      SITUATION("Test checkout.spec.js luôn pass khi bạn chạy trên máy mình, nhưng cứ vào pipeline CI là báo fail — đúng ở bước chờ #order-success xuất hiện sau khi bấm 'Đặt hàng'.", "The checkout.spec.js test always passes when you run it on your machine, but consistently fails in the CI pipeline — right at the step waiting for #order-success to appear after clicking 'Order'.",
        "Bạn kiểm tra kỹ code test, không thấy gì sai; locator đúng, assert đúng. Bạn chạy lại thủ công trên máy mình chục lần, test vẫn pass đều đặn, khiến bạn nghi ngờ CI 'bị lỗi gì đó' và định bỏ qua bằng cách tăng số lần retry cho xong.",
        "You carefully review the test code and find nothing wrong; the locator is correct, the assertion is correct. You manually re-run it a dozen times on your machine, and it keeps passing consistently, making you suspect CI is 'somehow broken' and consider just increasing the retry count to make it go away.",
        "checkout.spec.jsテストは自分のマシンで実行すると常にパスするが、CIパイプラインに入ると一貫して失敗する——『注文する』をクリック後、#order-successが表示されるのを待つステップで正確に失敗する。",
        "テストコードを注意深く確認しても何も間違いは見つからない。ロケーターは正しく、アサーションも正しい。自分のマシンで手動で十数回再実行しても、テストは安定してパスし続け、CIが『何かおかしい』のではと疑い、retry回数を増やしてごまかそうかと考え始める。"),
      SOLVE("Bật --trace on trên CI (hoặc dùng --trace retain-on-failure), tải trace.zip từ artifact của pipeline về máy, mở bằng npx playwright show-trace. Trace cho thấy: bước click 'Đặt hàng' xong, API xử lý đơn hàng mất tới 6.2 giây trên CI (do máy chậm hơn, chạy song song nhiều job), trong khi test chỉ chờ mặc định 5 giây rồi bỏ cuộc. Sửa đúng chỗ: tăng timeout riêng cho bước chờ #order-success, hoặc chờ theo tín hiệu thực sự (ví dụ chờ response của API) thay vì thời gian cố định — không phải tăng số lần retry để 'né' vấn đề.", "Enable --trace on on CI (or use --trace retain-on-failure), download trace.zip from the pipeline's artifact, and open it with npx playwright show-trace. The trace shows: after clicking 'Order', the order-processing API took 6.2 seconds on CI (because the machine is slower and runs many jobs in parallel), while the test only waited the default 5 seconds before giving up. The right fix: increase the timeout specifically for the #order-success wait, or wait on a real signal (e.g. the API response) instead of a fixed duration — not just increasing the retry count to 'dodge' the problem.", "CIで--trace onを有効にする（または--trace retain-on-failureを使う）、パイプラインのartifactからtrace.zipをダウンロードし、npx playwright show-traceで開く。トレースは以下を示す：『注文する』クリック後、注文処理APIはCI上で6.2秒かかった（マシンが遅く、多くのジョブを並行実行しているため）が、テストはデフォルトの5秒しか待たずにあきらめていた。正しい修正：#order-successの待機のタイムアウトを個別に増やすか、固定時間ではなく実際のシグナル（例：APIレスポンス）を待つようにする——問題を『回避』するためにretry回数を増やすのではない。"),
      IMG(m_jira, "Ticket ghi lại sự cố: test thanh toán fail trên CI nhưng pass ở máy local, kèm nguyên nhân nghi ngờ từ trace", "A ticket recording the incident: the checkout test fails on CI but passes locally, with the suspected cause from the trace", "インシデントを記録したチケット：決済テストがCIでは失敗しローカルではパスする、トレースからの推定原因付き"),
      RECAP(["Fail trên CI, pass local thường là do khác biệt tốc độ/môi trường, không phải 'CI bị lỗi'", "Bật --trace on trên CI để xem lại y hệt những gì đã xảy ra, dù không ngồi cạnh máy đó"],
        ["Failing on CI but passing locally is usually an environment/speed difference, not 'CI being broken'", "Enable --trace on on CI to replay exactly what happened, even without sitting at that machine"],
        ["CIで失敗しローカルでパスするのは通常、環境/速度の違いであり『CIが壊れている』のではない", "そのマシンの前に座っていなくても実際に何が起きたかを再生できるよう、CIで--trace onを有効にする"]),
    ] },
  { heading: { vi: "10. Tình huống 2: lỗi flaky ngẫu nhiên & lỗi hay gặp", en: "10. Situation 2: a random flaky failure & common mistakes", ja: "10. シーン2：ランダムなflaky失敗とよくある失敗" },
    blocks: [
      SITUATION("Test giỏ hàng của ShopEasy fail khoảng 1 trong 10 lần chạy, không theo quy luật rõ ràng — cùng một đoạn code, không đổi gì, nhưng thỉnh thoảng lại đỏ.", "ShopEasy's cart test fails roughly 1 in 10 runs, with no clear pattern — the exact same code, unchanged, but occasionally turns red.",
        "Bạn xem trace của những lần fail và nhận ra: test luôn fail ở bước kiểm tra tổng tiền ngay sau khi cập nhật số lượng sản phẩm — có vẻ như đôi khi phép tính lại tổng tiền trên giao diện chưa kịp chạy xong khi assert đã kiểm tra.",
        "You review the trace of the failing runs and notice: the test always fails at the step checking the total price right after updating the product quantity — it seems that sometimes the UI's total recalculation hasn't finished by the time the assertion checks it.",
        "ShopEasyのカートテストは約10回に1回失敗し、明確なパターンがない——全く同じコードで何も変えていないのに、時々赤くなる。",
        "失敗した実行のトレースを確認すると気づく：テストは常に商品数量を更新した直後の合計金額チェックのステップで失敗する——アサーションがチェックする時点で、UIの合計金額の再計算がまだ終わっていないことがあるようだ。"),
      SOLVE("Đây là race condition điển hình: assert chạy nhanh hơn UI cập nhật xong. Cách gỡ đúng là chờ theo TÍN HIỆU thực sự thay vì thời gian cố định — ví dụ dùng expect().toHaveText() của Playwright (tự động chờ tới khi văn bản đúng xuất hiện, thay vì kiểm tra 1 lần rồi báo fail ngay). Tuyệt đối không 'chữa cháy' bằng cách thêm await page.waitForTimeout(3000) — cách này chỉ che giấu vấn đề, làm test chạy chậm hơn mà vẫn có thể flaky khi máy chậm hơn nữa.", "This is a classic race condition: the assertion runs faster than the UI finishes updating. The right fix is to wait on a real SIGNAL instead of a fixed duration — e.g. use Playwright's expect().toHaveText() (which automatically waits until the correct text appears, instead of checking once and failing immediately). Never patch it with await page.waitForTimeout(3000) — that only hides the problem, slows the test down, and can still be flaky on an even slower machine.", "これは典型的なrace conditionです：アサーションがUIの更新完了より速く実行される。正しい修正は固定時間ではなく実際のシグナルを待つことです——例えばPlaywrightのexpect().toHaveText()を使う（1回だけチェックしてすぐ失敗するのではなく、正しいテキストが表示されるまで自動的に待つ）。await page.waitForTimeout(3000)で『応急処置』することは絶対にしないこと——それは問題を隠すだけで、テストを遅くし、さらに遅いマシンでもflakyになりうる。"),
      PITFALL("Thêm await page.waitForTimeout(một-số-mili-giây) mỗi khi gặp lỗi khó hiểu, xem đó như 'thuốc chữa bách bệnh'. Cách này thường làm test chậm đi và vẫn flaky khi môi trường chạy chậm hơn số mili-giây đã đoán.", "Adding await page.waitForTimeout(some-milliseconds) every time you hit a confusing error, treating it as a 'cure-all'. This usually makes tests slower and still flaky whenever the environment runs slower than the guessed number of milliseconds.", "分かりにくいエラーに遭遇するたびにawait page.waitForTimeout(何ミリ秒か)を追加し、『万能薬』のように扱うこと。これは通常テストを遅くし、環境が推測したミリ秒数より遅く動作するときに依然としてflakyなままになります。"),
      PITFALL("Chạy lại test nhiều lần cho tới khi nó pass rồi coi như xong, không ghi chú lại là nó từng fail. Flaky test bị bỏ qua kiểu này sẽ tiếp tục gây mất niềm tin vào cả bộ test về sau.", "Re-running a test repeatedly until it passes and calling it done, without noting that it once failed. A flaky test ignored this way keeps eroding trust in the entire test suite over time.", "パスするまでテストを何度も再実行し、それが一度失敗したことを記録せずに完了とすること。この方法で無視されたflaky testは、時間とともにテストスイート全体への信頼を蝕み続けます。"),
      IMG(m_dashboard, "Dashboard theo dõi tỷ lệ pass ổn định, fail thật và flaky của bộ test ShopEasy trên CI trong 7 ngày", "A dashboard tracking stable-pass, real-fail and flaky rates for ShopEasy's CI test suite over 7 days", "7日間のShopEasy CIテストスイートの安定パス率・本当の失敗率・flaky率を追跡するダッシュボード"),
      faq1.block, faq2.block, faq3.block,
      TIP("Muốn đi làm nhanh hơn với nền tảng debug + automation vững, có thể học kèm 1-1 với mentor tại CyberSoft để được sửa trực tiếp lỗi từ dự án của chính bạn: " + course1v1Url, "If you want a faster path to a job with a solid debug + automation foundation, consider 1-on-1 mentoring at CyberSoft to get direct help fixing errors from your own project: " + course1v1Url, "デバッグと自動化の確かな基礎で早く就職したいなら、CyberSoftでの1対1メンタリングを検討し、自分自身のプロジェクトのエラーを直接修正してもらいましょう：" + course1v1Url),
      INTERNAL("Chạy test và đọc báo cáo cho người mới", "Running tests and reading reports for beginners", "chay-test-va-doc-bao-cao-cho-nguoi-moi", "初心者のためのテスト実行とレポートの読み方"),
      INTERNAL("Waits: xử lý bất đồng bộ cho người mới", "Waits: handling asynchrony for beginners", "waits-xu-ly-bat-dong-bo-cho-nguoi-moi", "初心者のための待機（Waits）と非同期処理"),
      INTERNAL("Phân tích nguyên nhân gốc (RCA) cho Tester", "Root cause analysis (RCA) for testers", "phan-tich-nguyen-nhan-goc-rca-cho-tester", "テスターのための根本原因分析（RCA）"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học quy trình gỡ lỗi test tự động qua màn thanh toán ShopEasy: đọc đúng thông báo lỗi (locator, expected, received, timeout), dùng Trace Viewer để xem lại toàn bộ diễn biến, chạy --debug/--headed để quan sát trực tiếp, thêm page.pause()/log để thu hẹp phạm vi, cô lập đúng bước fail bằng test.only/--grep, và phân biệt lỗi thật, test viết sai và flaky test. Hai tình huống thật cho thấy cách xử lý khi fail trên CI nhưng pass local, và cách xử lý flaky do race condition — cả hai đều được giải quyết bằng cách đọc trace thay vì đoán mò.",
        "You just learned the process of debugging automated tests through ShopEasy's checkout screen: reading the error message correctly (locator, expected, received, timeout), using the Trace Viewer to replay the whole sequence, running --debug/--headed to watch live, adding page.pause()/logs to narrow the scope, isolating the exact failing step with test.only/--grep, and telling apart a real bug, a wrong test, and a flaky test. Two real situations showed how to handle a CI-only failure and a race-condition-driven flaky test — both solved by reading the trace instead of guessing.",
        "ShopEasyの決済画面を通じて自動化テストのデバッグプロセスを学びました：エラーメッセージを正しく読む（ロケーター、期待値、実際の値、タイムアウト）、Trace Viewerで全体の流れを再生する、--debug/--headedでライブ確認する、page.pause()/ログで範囲を絞り込む、test.only/--grepで失敗した正確なステップを分離する、本当のバグ・テストの誤り・flaky testを見分ける。2つの実例は、CIでのみ発生する失敗とrace conditionによるflakyテストへの対処法を示しました——どちらも当てずっぽうではなくトレースを読むことで解決されました。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu sâu hơn về waits (chờ bất đồng bộ đúng cách) và cách phân tích nguyên nhân gốc (RCA) để không chỉ sửa triệu chứng mà giải quyết tận gốc. CyberSoft Academy dạy automation testing bài bản từ zero tới đi làm, có mentor kèm sát và dự án automation thực chiến — xem thêm tại https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ để tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should dive deeper into waits (handling asynchrony properly) and root cause analysis (RCA) so you fix root causes, not just symptoms. CyberSoft Academy teaches automation testing properly from zero to hired, with close mentoring and real automation projects — learn more at https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ to confidently apply for an Automation Tester role.",
        "次は、waits（非同期処理の正しい扱い方）と根本原因分析（RCA）についてさらに深く学び、症状だけでなく根本原因を解決できるようになりましょう。CyberSoft Academyはゼロから就職までautomation testingを体系的に教え、密接なメンタリングと実際の自動化プロジェクトを提供します——Automation Testerのポジションに自信を持って応募するため、https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ で詳しく見てみましょう。"),
      CTA(course),
    ] },
];

const DEBUG_01 = makeDoc({
  slug: "go-loi-debug-test-tu-dong-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "debug test tự động",
  keywords: ["debug test tự động", "trace viewer playwright", "flaky test", "gỡ lỗi test tự động", "playwright debug"],
  coverLabel: "NGƯỜI MỚI · DEBUG TEST · TMĐT",
  crumb: "Gỡ lỗi (debug) test tự động cho người mới",
  metaTitle: { vi: "Debug test tự động khi fail cho người mới", en: "Debugging automated tests for beginners", ja: "初心者向け自動化テストのデバッグ" },
  metaDescription: {
    vi: "Debug test tự động cho người mới: đọc thông báo lỗi, dùng trace viewer, chạy --debug/--headed, phân biệt lỗi thật và flaky test qua ví dụ ShopEasy, Playwright.",
    en: "Debugging automated tests for beginners: reading error messages, using the trace viewer, running --debug/--headed, and telling apart real bugs from flaky tests through ShopEasy Playwright examples.",
    ja: "初心者向け自動化テストのデバッグ：エラーメッセージの読み方、trace viewerの使い方、--debug/--headedの実行、ShopEasyのPlaywright例で本当のバグとflaky testを見分ける方法を解説。",
  },
  title: {
    vi: "Gỡ lỗi (debug) test tự động khi fail cho người mới: đọc lỗi, dùng trace viewer (có code chạy được)",
    en: "Debugging failed automated tests for beginners: reading errors, using the trace viewer (with runnable code)",
    ja: "初心者のための失敗した自動化テストのデバッグ：エラーの読み方とトレースビューアーの使い方（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học cách gỡ lỗi (debug) test tự động khi fail qua app TMĐT ShopEasy. Đọc thông báo lỗi đúng cách, dùng Trace Viewer, chạy --debug/--headed, thêm page.pause()/log, cô lập bước fail bằng test.only/--grep, hai tình huống thật (fail trên CI vs local, flaky do timing), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn how to debug failed automated tests through the ShopEasy e-commerce app. Reading error messages correctly, using the Trace Viewer, running --debug/--headed, adding page.pause()/logs, isolating failing steps with test.only/--grep, two real situations (CI-vs-local failure, timing-driven flakiness), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyで失敗した自動化テストのデバッグ方法を学ぶ。エラーメッセージの正しい読み方、Trace Viewerの使い方、--debug/--headedの実行、page.pause()/ログの追加、test.only/--grepでの失敗ステップの分離、2つの実例（CI対ローカルの失敗、タイミングによるflaky）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách gỡ lỗi test tự động khi fail", steps: [
    { name: "Đọc kỹ thông báo lỗi", text: "Xác định locator, giá trị mong đợi, giá trị thực tế và thời gian chờ trước khi đoán nguyên nhân." },
    { name: "Xem trace hoặc chạy --debug/--headed", text: "Dùng Trace Viewer hoặc chạy trực tiếp để xem chính xác diễn biến tại thời điểm fail." },
    { name: "Cô lập & phân loại nguyên nhân", text: "Dùng test.only/--grep để cô lập, rồi xác định là lỗi thật, test sai hay flaky test." },
  ] },
  pages,
});

export const AU_DEBUG_01 = [DEBUG_01];
