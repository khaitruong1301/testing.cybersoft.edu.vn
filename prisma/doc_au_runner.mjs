// doc_au_runner.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Chạy test tự động & đọc báo cáo kết quả — chạy 1 test/1 bộ, headed/headless, đọc
// pass/fail/skipped, xem trace/screenshot/video khi fail, mở báo cáo HTML, chạy lại test
// fail, hiểu log lỗi. Playwright test runner trên web app TMĐT ShopEasy, có code lệnh chạy
// thật (npx playwright test) và cách đọc report. Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hoá, công cụ & dự án thực chiến.",
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
    categorySlug: "automation-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", "automation", "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: chạy --headed — trình duyệt ShopEasy thật mở ra khi test đang chạy ──
const m_headed = browser("shopeasy.vn/gio-hang", [
  panel("ShopEasy · Giỏ hàng (đang chạy --headed)", [
    field(24, 20, 660, "Số lượng", "2", "normal"),
    btn(24, 112, 220, "Thanh toán", "primary"),
    annotate(20, 10, 668, 72, "Test tu dong dang dien so luong"),
    annotate(20, 104, 228, 52, "Con tro tu dong click nut nay"),
  ].join(""), { h: 220, accent: "#0891b2" }),
].join(""), { h: 276, title: "Chế độ --headed: nhìn thấy trình duyệt thật", accent: "#0891b2" });

// ── Mockup 2: bảng ý nghĩa các trạng thái test PASSED/FAILED/SKIPPED... ──
const m_status_grid = grid("Ý nghĩa các trạng thái kết quả test", ["Trạng thái", "Ý nghĩa", "Khi nào xảy ra"], [
  ["PASSED", "Bước kiểm tra đúng như mong đợi", "Assertion khớp, không gặp lỗi nào"],
  ["FAILED", "Kết quả khác mong đợi, hoặc gặp lỗi khi chạy", "Assertion sai, không tìm thấy phần tử, hết thời gian chờ"],
  ["SKIPPED", "Test không được chạy trong lần này", "Bị đánh dấu test.skip(), hoặc điều kiện chạy không thoả"],
  ["FLAKY", "Fail ở lần chạy đầu, nhưng pass khi Playwright tự thử lại", "Thường do timing/mạng không ổn định, nên xem lại"],
  ["TIMED OUT", "Không hoàn thành trong thời gian cho phép", "Chờ phần tử hoặc phản hồi mạng quá lâu"],
], { accent: "#0891b2", note: "Chỉ FAILED và TIMED OUT là 'đỏ thật' cần sửa ngay; SKIPPED thường là chủ đích." });

// ── Mockup 3: màn báo cáo HTML Playwright sau khi chạy xong, chú thích nút xem trace ──
const reportRows = [
  { name: "Dang nhap thanh cong", status: "PASSED", time: "1.2s", color: "#16a34a" },
  { name: "Dang nhap sai mat khau", status: "PASSED", time: "0.9s", color: "#16a34a" },
  { name: "Them san pham vao gio hang", status: "FAILED", time: "2.4s", color: "#ef4444" },
  { name: "Ap dung ma giam gia", status: "SKIPPED", time: "-", color: "#94a3b8" },
  { name: "Thanh toan COD", status: "PASSED", time: "1.6s", color: "#16a34a" },
];
const reportRowSvg = (y, r) => `<rect x="16" y="${y}" width="700" height="30" rx="6" fill="${r.status === "FAILED" ? "#fef2f2" : "#ffffff"}" stroke="#e2e8f0"/>
<circle cx="34" cy="${y + 15}" r="6" fill="${r.color}"/>
<text x="52" y="${y + 19}" font-size="12" fill="#0f172a">${r.name}</text>
<text x="470" y="${y + 19}" font-size="11" font-weight="800" fill="${r.color}">${r.status}</text>
<text x="600" y="${y + 19}" font-size="11" fill="#94a3b8">${r.time}</text>
${r.status === "FAILED" ? `<text x="656" y="${y + 19}" font-size="11" font-weight="700" fill="#1a72f5">Xem trace ▸</text>` : ""}`;
const reportInner = [
  `<text x="16" y="18" font-size="12" font-weight="800" fill="#334155">3 passed &#183; 1 failed &#183; 1 skipped &#183; tong 6.0s</text>`,
  ...reportRows.map((r, i) => reportRowSvg(30 + i * 38, r)),
  annotate(650, 102, 100, 26, "Bam mo trace"),
].join("");
const m_report = browser("localhost:9323 (npx playwright show-report)", [
  panel("Playwright HTML report", reportInner, { h: 240, accent: "#0891b2" }),
].join(""), { h: 296, title: "Báo cáo kết quả", accent: "#0891b2" });

// ── Mockup 4: bảng các lệnh chạy hay dùng nhất ──
const m_commands_grid = grid("Các lệnh chạy test hay dùng nhất (Playwright)", ["Lệnh", "Việc nó làm"], [
  ["npx playwright test", "Chạy toàn bộ bộ test trong dự án"],
  ["npx playwright test tests/cart.spec.js", "Chỉ chạy đúng 1 file test giỏ hàng"],
  ["npx playwright test -g \"them san pham\"", "Chỉ chạy (các) test có tên khớp chuỗi truyền vào"],
  ["npx playwright test --headed", "Chạy có mở trình duyệt thật lên để xem thao tác"],
  ["npx playwright test --debug", "Chạy từng bước, dừng lại để soi kỹ từng thao tác"],
  ["npx playwright show-report", "Mở báo cáo HTML của lần chạy gần nhất"],
  ["npx playwright test --last-failed", "Chỉ chạy lại đúng những test vừa bị fail lần trước"],
], { accent: "#0891b2", note: "Thuộc lòng 3 lệnh đầu là đủ dùng hằng ngày; các lệnh sau dùng khi cần soi lỗi hoặc chạy lại." });

// ── Mockup 5: ticket Jira ghi lại lỗi phát hiện được từ việc xem trace ──
const m_jira = jira({
  key: "SE-14501", title: "Nút 'Thêm vào giỏ' bị banner khuyến mãi che, khiến test tự động click trượt",
  type: "Bug", status: "Open", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · CI pipeline đêm"],
    ["Nguồn phát hiện", "Xem trace.zip của test 'Thêm sản phẩm vào giỏ hàng' bị FAILED, thấy banner khuyến mãi che đúng vị trí nút tại bước click"],
    ["Ảnh hưởng", "Người dùng thật trên màn hình nhỏ cũng có nguy cơ bị banner che nút, không riêng gì test tự động"],
    ["Đề xuất", "Dev hạ z-index của banner khuyến mãi xuống dưới nút hành động chính trên trang sản phẩm"],
  ],
});

// ── Mockup 6: dashboard tỉ lệ pass của bộ test chạy đêm qua CI ──
const m_dashboard = dashboard("Tỉ lệ pass bộ test ShopEasy — chạy đêm qua CI", [
  { label: "Tổng số test", value: "48", sub: "chạy tự động mỗi đêm", color: "#0891b2" },
  { label: "Tỉ lệ pass", value: "93%", sub: "45/48 test pass", color: "#16a34a" },
  { label: "Test fail", value: "2", sub: "cần mở trace để sửa", color: "#ef4444" },
  { label: "Test skip", value: "1", sub: "đang chờ tính năng mới", color: "#94a3b8" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "PASSED, FAILED, SKIPPED trong kết quả test nghĩa là gì?",
  "What do PASSED, FAILED, and SKIPPED mean in a test result?",
  "PASSED nghĩa là mọi bước kiểm tra (assertion) trong test đó đều đúng như mong đợi. FAILED nghĩa là có ít nhất một điểm khác mong đợi, hoặc test gặp lỗi khi chạy (ví dụ không tìm thấy phần tử, hết thời gian chờ). SKIPPED nghĩa là test đó không được chạy trong lần này — thường do bị đánh dấu test.skip() có chủ đích, hoặc điều kiện chạy không thoả, chứ không phải lỗi.",
  "PASSED means every assertion in that test matched what was expected. FAILED means at least one thing didn't match expectations, or the test hit an error while running (e.g. element not found, timed out). SKIPPED means that test wasn't run this time — usually because it was deliberately marked test.skip(), or a run condition wasn't met, not because of an error.",
  "テスト結果のPASSED・FAILED・SKIPPEDとは何？",
  "PASSEDはそのテスト内のすべてのアサーションが期待通りだったことを意味します。FAILEDは少なくとも1つが期待と異なった、または実行中にエラーが発生した（要素が見つからない、タイムアウトなど）ことを意味します。SKIPPEDはそのテストが今回実行されなかったことを意味します——通常は意図的にtest.skip()が付けられたか、実行条件が満たされなかったためで、エラーではありません。");
const faq2 = FAQ(
  "Nên chạy --headed hay headless (mặc định)?",
  "Should I run with --headed or headless (the default)?",
  "Khi mới học và đang tìm hiểu vì sao một test hoạt động thế này, hãy chạy --headed để tận mắt nhìn trình duyệt thao tác — dễ hình dung và phát hiện điểm bất thường. Khi chạy hằng ngày trên máy cá nhân với số lượng lớn, hoặc chạy trong CI/CD, nên dùng headless (mặc định, không mở cửa sổ) vì nhanh hơn và tốn ít tài nguyên hơn nhiều.",
  "When you're new and trying to understand why a test behaves a certain way, run with --headed to actually watch the browser act — it's easier to visualize and spot anything unusual. For everyday runs on your machine with many tests, or when running in CI/CD, use headless (the default, no window opens) since it's much faster and uses far fewer resources.",
  "--headedとheadless（デフォルト）どちらを使うべき？",
  "初心者でテストがなぜそう動くのか理解しようとしているときは、--headedで実際にブラウザの動きを目で見よう——イメージしやすく、異常にも気づきやすい。自分のマシンで日常的に多くのテストを実行するときや、CI/CDで実行するときはheadless（デフォルト、ウィンドウが開かない）を使おう。ずっと速く、リソースもはるかに少なく済む。");
const faq3 = FAQ(
  "Trace, screenshot, video khác nhau thế nào khi test fail?",
  "How are trace, screenshot, and video different when a test fails?",
  "Screenshot chỉ chụp 1 khoảnh khắc — thường là ngay lúc fail — giúp thấy giao diện lúc đó ra sao. Video ghi lại toàn bộ quá trình chạy dưới dạng phim, xem được diễn biến theo thời gian nhưng khó tua tìm đúng dòng code gây lỗi. Trace là đầy đủ nhất: ghi lại từng bước thao tác, ảnh chụp trước/sau mỗi bước, log mạng và console — mở bằng Trace Viewer để tua qua từng bước và biết chính xác dòng nào gây fail, nên đây là công cụ debug mạnh nhất trong ba loại.",
  "A screenshot only captures one moment — usually right at the failure — showing what the UI looked like then. A video records the entire run as a movie, so you can see how things unfolded over time, but it's hard to jump to the exact line of code that caused the failure. A trace is the most complete: it records every action step by step, before/after screenshots for each step, network and console logs — open it with Trace Viewer to step through and know exactly which line caused the failure, making it the strongest debugging tool of the three.",
  "テストが失敗したとき、trace・screenshot・videoはどう違う？",
  "screenshotは1つの瞬間だけを捉えます——通常は失敗した瞬間で、その時点のUIがどう見えたかが分かります。videoは実行全体を動画として記録するので時間経過は分かりますが、原因となった正確なコード行を探すのは困難です。traceが最も充実しており、各操作をステップごとに、各ステップの前後のスクリーンショット、ネットワークやコンソールのログまで記録します——Trace Viewerで開けばステップを1つずつたどり、どの行が失敗の原因か正確に分かるため、3つの中で最も強力なデバッグツールです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kết quả test hiển thị PASSED nghĩa là gì?", en: "What does a PASSED test result mean?", ja: "テスト結果がPASSEDとはどういう意味？" },
    options: [
      { vi: "Mọi bước kiểm tra (assertion) trong test đó đều đúng như mong đợi", en: "Every assertion in that test matched what was expected", ja: "そのテスト内のすべてのアサーションが期待通りだった" },
      { vi: "Test đó chưa từng được chạy lần nào", en: "That test has never been run", ja: "そのテストは一度も実行されていない" },
      { vi: "Test đó bị đánh dấu bỏ qua có chủ đích", en: "That test was deliberately marked to be skipped", ja: "そのテストは意図的にスキップとマークされた" },
      { vi: "Test đó chạy chậm hơn bình thường", en: "That test ran slower than usual", ja: "そのテストが通常より遅く実行された" },
    ], correct: 0,
    explain: { vi: "PASSED chỉ có nghĩa duy nhất: mọi assertion khớp kết quả mong đợi, không liên quan tốc độ chạy.", en: "PASSED only means one thing: every assertion matched the expected result — it has nothing to do with speed.", ja: "PASSEDは唯一の意味しか持ちません：すべてのアサーションが期待結果と一致した、ということで速度とは関係ありません。" },
  }),
  mcq({
    q: { vi: "Muốn chạy đúng 1 file test là tests/cart.spec.js thay vì chạy cả bộ, dùng lệnh nào?", en: "To run exactly the tests/cart.spec.js file instead of the whole suite, which command do you use?", ja: "スイート全体ではなくtests/cart.spec.jsだけを実行したいとき、どのコマンドを使う？" },
    options: [
      { vi: "npx playwright test", en: "npx playwright test", ja: "npx playwright test" },
      { vi: "npx playwright test tests/cart.spec.js", en: "npx playwright test tests/cart.spec.js", ja: "npx playwright test tests/cart.spec.js" },
      { vi: "npx playwright show-report", en: "npx playwright show-report", ja: "npx playwright show-report" },
      { vi: "npx playwright test --last-failed", en: "npx playwright test --last-failed", ja: "npx playwright test --last-failed" },
    ], correct: 1,
    explain: { vi: "Truyền đúng đường dẫn file sau 'playwright test' để chỉ chạy file đó, thay vì chạy toàn bộ dự án.", en: "Passing the exact file path after 'playwright test' runs only that file, instead of the whole project.", ja: "'playwright test'の後に正確なファイルパスを渡すと、プロジェクト全体ではなくそのファイルだけが実行されます。" },
  }),
  mcq({
    q: { vi: "Khi nào nên chạy test với cờ --headed?", en: "When should you run tests with the --headed flag?", ja: "--headedフラグを付けてテストを実行すべきなのはどんなとき？" },
    options: [
      { vi: "Khi chạy hàng trăm test trong CI/CD ban đêm", en: "When running hundreds of tests in a nightly CI/CD pipeline", ja: "夜間のCI/CDで数百のテストを実行するとき" },
      { vi: "Khi muốn tận mắt xem trình duyệt thao tác để dễ hiểu và phát hiện điểm bất thường lúc mới học", en: "When you want to actually watch the browser act, to understand and spot anything unusual while learning", ja: "学習中に理解しやすく異常に気づきやすいよう、実際にブラウザの動きを目で見たいとき" },
      { vi: "Khi muốn test chạy nhanh nhất có thể", en: "When you want tests to run as fast as possible", ja: "テストをできるだけ速く実行したいとき" },
      { vi: "Khi máy không đủ tài nguyên", en: "When the machine doesn't have enough resources", ja: "マシンのリソースが不足しているとき" },
    ], correct: 1,
    explain: { vi: "--headed mở trình duyệt thật lên, hữu ích để quan sát trực tiếp — nhưng chậm hơn và tốn tài nguyên hơn headless.", en: "--headed opens a real browser, useful for direct observation — but it's slower and uses more resources than headless.", ja: "--headedは実際のブラウザを開き、直接観察するのに便利ですが、headlessより遅くリソースも多く使います。" },
  }),
  mcq({
    q: { vi: "Test 'Thêm sản phẩm vào giỏ hàng' báo FAILED nhưng bạn không rõ vì sao, cách nào giúp xem CHI TIẾT nhất từng bước đã xảy ra?", en: "The 'Add to cart' test reports FAILED but you're not sure why — what gives the MOST detailed step-by-step view of what happened?", ja: "『カートに追加』テストがFAILEDと報告されたが理由が分からない。何が起きたかを最も詳しくステップごとに見る方法は？" },
    options: [
      { vi: "Chỉ đọc dòng chữ FAILED trong terminal rồi đoán", en: "Just read the word FAILED in the terminal and guess", ja: "ターミナルのFAILEDという文字だけを読んで推測する" },
      { vi: "Mở trace bằng Trace Viewer để tua qua từng bước, xem ảnh trước/sau và log mạng", en: "Open the trace with Trace Viewer to step through, viewing before/after screenshots and network logs", ja: "Trace Viewerでtraceを開き、前後のスクリーンショットとネットワークログを見ながらステップを追う" },
      { vi: "Xoá test đó đi vì nó gây phiền", en: "Delete that test because it's annoying", ja: "邪魔なのでそのテストを削除する" },
      { vi: "Đổi tên test sang tên khác", en: "Rename the test to something else", ja: "テストの名前を変える" },
    ], correct: 1,
    explain: { vi: "Trace ghi lại đầy đủ từng bước kèm ảnh chụp và log — công cụ debug mạnh nhất khi không rõ nguyên nhân fail.", en: "The trace records every step in full detail with screenshots and logs — the strongest debugging tool when the cause of a failure is unclear.", ja: "traceはスクリーンショットとログ付きで各ステップを完全に記録します——失敗原因が不明なときの最強のデバッグツールです。" },
  }),
  mcq({
    q: { vi: "Sau khi sửa xong 2 test bị fail, muốn chạy lại ĐÚNG 2 test đó (không chạy lại cả bộ 48 test) thì dùng gì?", en: "After fixing 2 failed tests, you want to re-run EXACTLY those 2 tests (not the whole 48-test suite) — what do you use?", ja: "失敗した2つのテストを直した後、その2つだけを再実行したい（48個全部ではなく）。何を使う？" },
    options: [
      { vi: "npx playwright test --headed", en: "npx playwright test --headed", ja: "npx playwright test --headed" },
      { vi: "npx playwright test --last-failed", en: "npx playwright test --last-failed", ja: "npx playwright test --last-failed" },
      { vi: "npx playwright show-report", en: "npx playwright show-report", ja: "npx playwright show-report" },
      { vi: "npx playwright codegen", en: "npx playwright codegen", ja: "npx playwright codegen" },
    ], correct: 1,
    explain: { vi: "--last-failed chỉ chạy lại đúng những test bị fail ở lần chạy gần nhất, tiết kiệm thời gian so với chạy cả bộ.", en: "--last-failed re-runs exactly the tests that failed in the most recent run, saving time versus running the whole suite.", ja: "--last-failedは直前の実行で失敗したテストだけを再実行し、スイート全体を実行するより時間を節約できます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bộ test bạn sẽ chạy", en: "1. TL;DR & the test suite you'll run", ja: "1. 要点と実行するテストスイート" },
    blocks: [
      TLDR("Chạy test tự động đọc báo cáo cho người mới: học cách chạy 1 test hoặc cả bộ bằng Playwright, chọn headed (mở trình duyệt thật) hay headless (mặc định), đọc pass/fail/skipped trong terminal, mở báo cáo HTML để xem chi tiết, bật trace/screenshot/video khi test fail, và chạy lại đúng test vừa fail. Bài bám bộ test của app TMĐT ShopEasy (đăng nhập, giỏ hàng, thanh toán), có code lệnh chạy thật, nhiều mockup báo cáo và trắc nghiệm cuối bài.",
        "Running automated tests and reading reports for beginners: learn to run one test or the whole suite with Playwright, choose headed (a real browser window) versus headless (the default), read pass/fail/skipped in the terminal, open the HTML report for detail, enable trace/screenshot/video when a test fails, and re-run exactly the tests that just failed. This follows ShopEasy's e-commerce test suite (login, cart, checkout), with real runnable commands, many report mockups, and a quiz at the end.",
        "初心者のためのテスト実行とレポートの読み方：Playwrightで1つのテストまたはスイート全体を実行する方法、headed（実際のブラウザウィンドウ）とheadless（デフォルト）の選び方、ターミナルでpass/fail/skippedを読む方法、詳細を見るためのHTMLレポートの開き方、テストが失敗したときにtrace/screenshot/videoを有効にする方法、そして直前に失敗したテストだけを再実行する方法を学びます。ECアプリShopEasyのテストスイート（ログイン、カート、決済）に沿い、実際に動くコマンド、レポートのモックアップ、最後にクイズ付き。"),
      P("Chào bạn mới! Viết được test tự động mới chỉ là nửa chặng đường — nửa còn lại quan trọng không kém là biết CHẠY nó đúng cách và ĐỌC được kết quả nó trả về. Rất nhiều người mới viết xong test, chạy 1 lần thấy chữ 'passed' màu xanh là yên tâm, nhưng khi test fail lại lúng túng không biết bắt đầu từ đâu để tìm nguyên nhân. Bài này sẽ đi cùng bạn qua bộ test của ShopEasy: đăng nhập, thêm sản phẩm vào giỏ, thanh toán — học cách chạy đúng phạm vi cần chạy, đọc report như một tester thực thụ, và tự tin xử lý khi có test đỏ.",
        "Hi, newcomer! Writing an automated test is only half the journey — the other half, just as important, is knowing how to RUN it correctly and READ the result it returns. Many beginners write a test, run it once, see a green 'passed', and feel reassured — but when a test fails, they don't know where to start looking for the cause. This article walks you through ShopEasy's test suite: login, add to cart, checkout — learning to run exactly the right scope, read the report like a real tester, and confidently handle a red test.",
        "こんにちは、初心者さん！自動テストを書けたのはまだ半分です——同じくらい大切なもう半分は、正しく実行し、返ってきた結果を読み取れることです。多くの初心者はテストを書いて1回実行し、緑の『passed』を見て安心しますが、テストが失敗すると原因をどこから探せばいいか分からなくなります。この記事はShopEasyのテストスイート——ログイン、カートに追加、決済——に沿って、正しい範囲だけを実行する方法、本物のテスターのようにレポートを読む方法、赤いテストに自信を持って対処する方法を学びます。"),
      IMG(m_headed, "Chạy test với --headed: cửa sổ trình duyệt ShopEasy thật mở ra, chú thích thao tác tự động", "Running tests with --headed: a real ShopEasy browser window opens, annotated with the automated actions", "--headedでテスト実行：本物のShopEasyブラウザウィンドウが開き、自動操作を注記"),
      DEF("Test runner", "công cụ (như Playwright Test) đọc các file test, thực thi từng test theo đúng thứ tự/phạm vi được yêu cầu, rồi tổng hợp kết quả pass/fail/skipped thành báo cáo.",
        "a tool (like Playwright Test) that reads test files, executes each test in the requested order/scope, then aggregates the pass/fail/skipped results into a report.",
        "テストファイルを読み込み、要求された順序・範囲で各テストを実行し、pass/fail/skippedの結果をレポートにまとめるツール（Playwright Testなど）。"),
    ] },
  { heading: { vi: "2. Lệnh chạy cơ bản: chạy cả bộ, chạy 1 file, chạy theo tên", en: "2. Basic run commands: whole suite, one file, by name", ja: "2. 基本の実行コマンド：スイート全体・1ファイル・名前指定" },
    blocks: [
      P("Lệnh chạy test cơ bản nhất trong Playwright là npx playwright test — nó chạy TOÀN BỘ test tìm thấy trong dự án. Điều này hợp lý khi bạn muốn kiểm tra tổng thể (ví dụ trước khi merge code), nhưng khi đang tập trung sửa 1 tính năng, chạy cả bộ vừa chậm vừa làm loãng sự chú ý. Playwright cho phép thu hẹp phạm vi chạy theo nhiều cách.",
        "The most basic run command in Playwright is npx playwright test — it runs the ENTIRE set of tests found in the project. This makes sense when you want an overall check (e.g. before merging code), but when you're focused on fixing one feature, running the whole suite is both slow and distracting. Playwright lets you narrow the run scope in several ways.",
        "Playwrightで最も基本的な実行コマンドはnpx playwright testです——プロジェクト内で見つかったテスト全体を実行します。全体チェックをしたいとき（コードをマージする前など）は理にかなっていますが、1つの機能の修正に集中しているときは、スイート全体の実行は遅く、注意も散漫になります。Playwrightには実行範囲を絞り込む方法がいくつもあります。"),
      STEP(1, "Chạy toàn bộ bộ test: gõ npx playwright test tại thư mục gốc dự án.", "Run the whole test suite: type npx playwright test at the project root.", "スイート全体を実行：プロジェクトのルートでnpx playwright testと入力する。"),
      STEP(2, "Chạy đúng 1 file: thêm đường dẫn file ngay sau lệnh, ví dụ npx playwright test tests/cart.spec.js.", "Run exactly one file: append the file path right after the command, e.g. npx playwright test tests/cart.spec.js.", "1ファイルだけ実行：コマンドの直後にファイルパスを付ける。例：npx playwright test tests/cart.spec.js。"),
      STEP(3, "Chạy theo tên test: dùng cờ -g kèm chuỗi cần khớp trong tên test, ví dụ npx playwright test -g \"them san pham\".", "Run by test name: use the -g flag with a string to match in the test name, e.g. npx playwright test -g \"them san pham\".", "テスト名で実行：-gフラグとテスト名にマッチさせたい文字列を使う。例：npx playwright test -g \"them san pham\"。"),
      CODE("bash", "# Chay toan bo bo test trong du an\nnpx playwright test\n\n# Chi chay dung 1 file test gio hang\nnpx playwright test tests/cart.spec.js\n\n# Chi chay (cac) test co ten khop chuoi \"them san pham\"\nnpx playwright test -g \"them san pham\"\n\n# Ket hop: chi 1 file, chi test co ten khop\nnpx playwright test tests/cart.spec.js -g \"cap nhat so luong\""),
      IMG(m_commands_grid, "Bảng tổng hợp các lệnh chạy test hay dùng nhất trong Playwright", "A summary table of the most commonly used Playwright test-run commands", "Playwrightでよく使うテスト実行コマンドの一覧表"),
      TRY("Mở terminal trong dự án automation của bạn (hoặc dự án mẫu), chạy npx playwright test -g \"dang nhap\" và quan sát chỉ những test có chữ 'dang nhap' trong tên được thực thi.", "Open a terminal in your automation project (or a sample project), run npx playwright test -g \"dang nhap\", and observe that only tests whose name contains 'dang nhap' get executed.", "自動化プロジェクト（またはサンプルプロジェクト）でターミナルを開き、npx playwright test -g \"dang nhap\"を実行し、名前に'dang nhap'を含むテストだけが実行されるのを確認してみよう。"),
    ] },
  { heading: { vi: "3. Chạy headed hay headless — chọn thế nào?", en: "3. Headed or headless — how do you choose?", ja: "3. headedかheadlessか——どう選ぶ？" },
    blocks: [
      P("Mặc định, Playwright chạy test ở chế độ headless — nghĩa là trình duyệt vẫn hoạt động ngầm nhưng KHÔNG mở cửa sổ nào lên màn hình. Chạy headless nhanh hơn, tốn ít tài nguyên hơn, và là chế độ phù hợp khi chạy trong CI/CD hay chạy số lượng lớn test hằng ngày. Ngược lại, cờ --headed sẽ mở một cửa sổ trình duyệt thật, để bạn tận mắt xem con trỏ di chuyển, ô nhập được điền, nút được bấm.",
        "By default, Playwright runs tests headless — meaning the browser still runs in the background but does NOT open any window on screen. Headless runs faster, uses fewer resources, and is the right mode for CI/CD or running a large number of tests daily. In contrast, the --headed flag opens an actual browser window, letting you watch the cursor move, fields get filled, and buttons get clicked with your own eyes.",
        "デフォルトでは、Playwrightはheadlessモードでテストを実行します——ブラウザはバックグラウンドで動いていますが、画面にウィンドウは開きません。headlessは実行が速く、リソースも少なく済むため、CI/CDや日々大量のテストを実行する場合に適したモードです。一方、--headedフラグは実際のブラウザウィンドウを開き、カーソルが動き、欄が入力され、ボタンがクリックされる様子を自分の目で見られるようにします。"),
      CODE("bash", "# Mac dinh: chay headless, khong mo cua so nao\nnpx playwright test\n\n# Mo trinh duyet that len de xem thao tac\nnpx playwright test --headed\n\n# Chay tung buoc, dung lai de soi ky (rat huu ich khi moi hoc)\nnpx playwright test --debug"),
      P("Một mẹo hữu ích khác cho người mới là --debug: nó cũng mở trình duyệt thật, nhưng dừng lại ở TỪNG bước, cho bạn thời gian đọc panel Playwright Inspector, xem chính xác câu lệnh nào sắp chạy trước khi bấm 'tiếp tục'. Khi mới làm quen với một test lạ, --debug giúp hiểu luồng chạy chậm rãi hơn nhiều so với --headed thông thường.",
        "Another handy tip for beginners is --debug: it also opens a real browser, but pauses at EACH step, giving you time to read the Playwright Inspector panel and see exactly which command is about to run before clicking 'continue'. When getting familiar with an unfamiliar test, --debug helps you understand the flow much more slowly and clearly than regular --headed.",
        "初心者にもう1つ便利なコツは--debugです：これも実際のブラウザを開きますが、各ステップで一時停止し、Playwright Inspectorパネルを読んで『続行』をクリックする前に次に実行されるコマンドを正確に確認する時間を与えてくれます。見慣れないテストに慣れようとするとき、--debugは通常の--headedよりもずっとゆっくりと流れを理解する助けになります。"),
      TIP("Khi mới học, ưu tiên --headed hoặc --debug để hiểu luồng; khi đã quen và chạy hằng ngày (đặc biệt trong CI), quay về headless (mặc định) để tiết kiệm thời gian.", "When you're new, prefer --headed or --debug to understand the flow; once you're comfortable and running daily (especially in CI), go back to headless (the default) to save time.", "初心者のうちは--headedか--debugを優先して流れを理解し、慣れて毎日実行するようになったら（特にCIでは）時間節約のためheadless（デフォルト）に戻ろう。"),
    ] },
  { heading: { vi: "4. Đọc kết quả pass/fail/skipped trong terminal", en: "4. Reading pass/fail/skipped in the terminal", ja: "4. ターミナルでpass/fail/skippedを読む" },
    blocks: [
      P("Sau khi lệnh npx playwright test chạy xong, terminal in ra danh sách từng test kèm biểu tượng và thời gian chạy, cùng dòng tổng kết ở cuối kiểu '3 passed, 1 failed, 1 skipped'. Hiểu đúng từng trạng thái giúp bạn biết ngay việc cần làm tiếp theo: có cần sửa gấp hay không.",
        "After npx playwright test finishes, the terminal prints a list of each test with an icon and run time, plus a summary line at the end like '3 passed, 1 failed, 1 skipped'. Understanding each status correctly tells you immediately what to do next: whether an urgent fix is needed.",
        "npx playwright testの実行が終わると、ターミナルは各テストをアイコンと実行時間付きで一覧表示し、最後に『3 passed, 1 failed, 1 skipped』のような要約行を出力します。各ステータスを正しく理解すれば、次に何をすべきか——急いで直す必要があるか——すぐに分かります。"),
      IMG(m_status_grid, "Bảng giải thích ý nghĩa các trạng thái PASSED/FAILED/SKIPPED/FLAKY/TIMED OUT", "A table explaining the PASSED/FAILED/SKIPPED/FLAKY/TIMED OUT statuses", "PASSED・FAILED・SKIPPED・FLAKY・TIMED OUTの意味を説明する表"),
      DEF("Assertion", "câu lệnh kiểm tra một điều kiện mong đợi có đúng hay không (ví dụ expect(tongTien).toHaveText('398.000d')); assertion sai là nguyên nhân phổ biến nhất khiến test FAILED.",
        "a statement that checks whether an expected condition holds true (e.g. expect(total).toHaveText('398.000d')); a failed assertion is the most common cause of a FAILED test.",
        "期待する条件が正しいかどうかを検証する文（例：expect(total).toHaveText('398.000d')）。アサーション失敗はテストがFAILEDになる最も一般的な原因。"),
      P("Chú ý: SKIPPED KHÔNG phải là lỗi — đó thường là chủ đích (ví dụ test chỉ chạy trên trình duyệt Firefox nhưng bạn đang chạy Chromium). Còn FLAKY nghĩa là test fail ở lần chạy đầu, nhưng Playwright tự thử lại (retry) và nó pass — cần ghi chú lại để xem xét, vì flaky thường ẩn chứa vấn đề timing chưa xử lý triệt để, kể cả khi báo cáo cuối cùng vẫn 'xanh'.",
        "Note: SKIPPED is NOT an error — it's usually intentional (e.g. a test that only runs on Firefox while you're running Chromium). FLAKY means a test failed on the first attempt, but Playwright auto-retried it and it passed — worth noting for review, since flakiness often hides an unresolved timing issue even when the final report still shows 'green'.",
        "注意：SKIPPEDはエラーではありません——通常は意図的なもの（例：Firefoxでのみ実行されるテストをChromiumで実行している場合）です。FLAKYは、テストが最初の試行では失敗したが、Playwrightが自動的に再試行（retry）してpassしたことを意味します——最終レポートが『緑』であっても、flakyは未解決のタイミング問題を隠していることが多いため、確認のためメモしておく価値があります。"),
    ] },
  { heading: { vi: "5. Báo cáo HTML Playwright: mở & đọc từng phần", en: "5. Playwright HTML report: opening & reading each part", ja: "5. Playwright HTMLレポート：開いて各部分を読む" },
    blocks: [
      P("Terminal chỉ cho cái nhìn tóm tắt. Muốn đào sâu, mở báo cáo HTML — giao diện trực quan liệt kê từng test, trạng thái, thời gian chạy, và với test fail còn có nút xem trace ngay tại chỗ. Mặc định Playwright tự sinh báo cáo sau mỗi lần chạy; lệnh dưới đây mở nó lên trên trình duyệt.",
        "The terminal only gives a summary view. To dig deeper, open the HTML report — a visual interface listing every test, its status, run time, and for a failed test, a button to view its trace right there. By default Playwright auto-generates a report after every run; the command below opens it in a browser.",
        "ターミナルは概要しか示しません。深く掘り下げたいときはHTMLレポートを開きましょう——各テスト、ステータス、実行時間を一覧表示する視覚的なインターフェースで、失敗したテストにはその場でtraceを見るボタンもあります。デフォルトでは、Playwrightは実行のたびにレポートを自動生成します。下記のコマンドでブラウザに開けます。"),
      CODE("bash", "# Mo bao cao HTML cua lan chay gan nhat\nnpx playwright show-report\n\n# Bao cao cung tu dong mo (mac dinh) khi co test FAILED sau khi chay xong\nnpx playwright test"),
      IMG(m_report, "Màn báo cáo HTML Playwright: danh sách test kèm trạng thái, chú thích nút 'Xem trace' ở test FAILED", "The Playwright HTML report screen: a test list with statuses, annotated with the 'View trace' button on the FAILED test", "Playwright HTMLレポート画面：ステータス付きテスト一覧、FAILEDテストの『トレースを見る』ボタンを注記"),
      P("Đọc báo cáo HTML theo thứ tự: (1) nhìn dòng tổng kết trên cùng để biết tổng quan số passed/failed/skipped; (2) tìm các dòng màu đỏ (FAILED) trước tiên vì đó là việc cần xử lý; (3) bấm vào từng test FAILED để mở chi tiết — thông báo lỗi, dòng code gây lỗi, và nút mở trace nếu đã bật.",
        "Read the HTML report in order: (1) look at the top summary line for the overall passed/failed/skipped count; (2) find the red (FAILED) rows first, since those need attention; (3) click into each FAILED test to open its detail — the error message, the line of code that caused it, and a button to open the trace if it was enabled.",
        "HTMLレポートは順番に読みましょう：（1）上部の要約行でpassed/failed/skippedの全体数を確認する、（2）まず赤い（FAILED）行を探す——対処が必要だからです、（3）各FAILEDテストをクリックして詳細を開く——エラーメッセージ、原因となったコード行、有効にしていればtraceを開くボタンがあります。"),
      TIP("Trong CI/CD, thay vì mở trình duyệt, báo cáo HTML thường được lưu thành file tĩnh (artifact) để tải về xem sau khi build kết thúc.", "In CI/CD, instead of opening a browser directly, the HTML report is usually saved as a static file (artifact) to download and view after the build finishes.", "CI/CDでは、直接ブラウザを開く代わりに、HTMLレポートは通常静的ファイル（アーティファクト）として保存され、ビルド終了後にダウンロードして見ることができます。"),
    ] },
  { heading: { vi: "6. Bật trace, screenshot, video khi test fail", en: "6. Enabling trace, screenshot, video on failure", ja: "6. テスト失敗時にtrace・screenshot・videoを有効化する" },
    blocks: [
      P("Ba công cụ debug chính khi test fail: screenshot (ảnh chụp 1 khoảnh khắc), video (ghi lại toàn bộ quá trình), và trace (ghi lại từng bước kèm ảnh trước/sau, log mạng, log console — chi tiết nhất). Bạn cấu hình chúng trong playwright.config.js hoặc bật nhanh ngay từ dòng lệnh khi cần điều tra một lần.",
        "Three main debugging tools on failure: screenshot (one captured moment), video (records the entire run), and trace (records every step with before/after screenshots, network logs, console logs — the most detailed). You configure these in playwright.config.js, or enable them quickly right from the command line for a one-off investigation.",
        "失敗時の主な3つのデバッグツール：screenshot（1つの瞬間を撮影）、video（実行全体を記録）、trace（前後のスクリーンショット、ネットワークログ、コンソールログ付きで各ステップを記録——最も詳細）です。これらはplaywright.config.jsで設定するか、1回限りの調査のためコマンドラインからすぐに有効化できます。"),
      CODE("bash", "# Bat trace CHI KHI test that bai (thuong dung nhat, khong ton dia lien tuc)\nnpx playwright test --trace on-first-retry\n\n# Bat trace cho MOI test (nang, chi nen dung tam thoi khi dieu tra)\nnpx playwright test --trace on\n\n# Bat chup anh man hinh khi fail, va quay video khi fail\nnpx playwright test --screenshot only-on-failure --video retain-on-failure"),
      STEP(1, "Chạy lại test đang lỗi kèm cờ --trace on để chắc chắn có trace ngay cả khi không phải retry.", "Re-run the failing test with --trace on to guarantee a trace even without a retry.", "リトライがなくてもtraceが確実に得られるよう、--trace onを付けて失敗中のテストを再実行する。"),
      STEP(2, "Sau khi chạy xong, mở file trace.zip bằng lệnh npx playwright show-trace trace.zip, hoặc bấm 'Xem trace' ngay trong báo cáo HTML.", "After the run, open the trace.zip file with npx playwright show-trace trace.zip, or click 'View trace' right inside the HTML report.", "実行後、npx playwright show-trace trace.zipでtrace.zipファイルを開くか、HTMLレポート内の『トレースを見る』をクリックする。"),
      STEP(3, "Trong Trace Viewer, tua qua từng bước (timeline phía trên), xem ảnh trước/sau bước, và mở tab Network/Console nếu nghi ngờ lỗi liên quan gọi API.", "In Trace Viewer, scrub through each step using the timeline at the top, view the before/after screenshots, and open the Network/Console tab if an API call is suspected.", "Trace Viewerでは、上部のタイムラインで各ステップを移動し、前後のスクリーンショットを見て、API呼び出しが疑われる場合はNetwork/Consoleタブを開く。"),
      CODE("bash", "# Mo lai file trace da luu de xem chi tiet\nnpx playwright show-trace test-results/cart-them-san-pham/trace.zip"),
    ] },
  { heading: { vi: "7. Tình huống 1: test fail không biết vì sao", en: "7. Situation 1: a test fails and you don't know why", ja: "7. シーン1：テストが失敗するが理由が分からない" },
    blocks: [
      SITUATION("Test 'Thêm sản phẩm vào giỏ hàng' của ShopEasy báo FAILED trong lần chạy đêm qua CI. Terminal chỉ in ra dòng lỗi ngắn gọn: 'TimeoutError: locator.click: Timeout 30000ms exceeded'.", "ShopEasy's 'Add to cart' test reports FAILED in last night's CI run. The terminal only prints a short error line: 'TimeoutError: locator.click: Timeout 30000ms exceeded'.", "ShopEasyの『カートに追加』テストが昨夜のCI実行でFAILEDと報告される。ターミナルには短いエラー行しか出ない：『TimeoutError: locator.click: Timeout 30000ms exceeded』。",
        "Bạn không có mặt lúc test chạy, không biết lúc đó giao diện trông ra sao, tại sao nút không thể bấm được. Chỉ nhìn dòng lỗi ngắn ngủi này, rất khó đoán đúng nguyên nhân — có thể là phần tử bị che, chưa tải xong, hoặc locator đã sai từ trước.", "You weren't present when the test ran, you don't know what the UI looked like at that moment, or why the button couldn't be clicked. Looking only at this short error line, it's hard to guess the real cause — it could be an obscured element, a page still loading, or a locator that was already wrong.", "テスト実行時にその場にいなかったため、その時UIがどう見えていたか、なぜボタンがクリックできなかったのか分かりません。この短いエラー行だけを見ても、本当の原因——要素が隠れていた、ページがまだ読み込み中だった、あるいはロケーターが既に間違っていた——を推測するのは困難です。"),
      SOLVE("Cấu hình chạy với --trace on-first-retry (hoặc on khi đang điều tra riêng), rồi mở trace.zip bằng Trace Viewer. Tua tới đúng bước click, xem ảnh chụp NGAY TRƯỚC lúc lỗi — phát hiện một banner khuyến mãi đang che đúng vị trí nút 'Thêm vào giỏ', khiến Playwright chờ mãi mà không click được.", "Configure the run with --trace on-first-retry (or on for a dedicated investigation), then open trace.zip with Trace Viewer. Scrub to the exact click step and view the screenshot RIGHT BEFORE the failure — discovering a promo banner covering exactly where the 'Add to cart' button sits, causing Playwright to keep waiting and never be able to click.", "--trace on-first-retry（または個別に調査するときはon）で実行を設定し、trace.zipをTrace Viewerで開く。正確なクリックのステップまで移動し、失敗の直前のスクリーンショットを見ると——プロモバナーが『カートに追加』ボタンの位置をちょうど覆っていて、Playwrightが待ち続けてもクリックできなかったことが分かる。"),
      P("Đây chính là giá trị cốt lõi của trace so với chỉ đọc dòng lỗi terminal: dòng lỗi chỉ nói 'timeout', nhưng ảnh chụp ngay trước lúc lỗi kể lại toàn bộ câu chuyện — element bị che bởi phần tử khác, chứ không phải Playwright hay locator sai. Sau khi có bằng chứng rõ ràng, bạn có thể tạo ticket đúng nguyên nhân thay vì đoán mò.",
        "This is the core value of a trace over just reading the terminal error line: the error only says 'timeout', but the screenshot right before the failure tells the whole story — the element was covered by something else, not a Playwright or locator mistake. With clear evidence in hand, you can file a ticket with the right root cause instead of guessing.",
        "これがターミナルのエラー行を読むだけの場合に対するtraceの核心的な価値です：エラーは『timeout』としか言いませんが、失敗直前のスクリーンショットが全体の物語を語ります——要素が別のものに覆われていたのであって、Playwrightやロケーターのミスではありません。明確な証拠があれば、当て推量ではなく正しい根本原因でチケットを作成できます。"),
      IMG(m_jira, "Ticket lỗi được tạo sau khi xem trace, ghi rõ nguyên nhân banner khuyến mãi che nút", "A bug ticket filed after reviewing the trace, clearly stating the promo banner obscuring the button as the cause", "traceを確認した後に作成されたバグチケット。プロモバナーがボタンを覆っていたことを原因として明記"),
      RECAP(["Dòng lỗi terminal chỉ là phần nổi — trace mới cho thấy nguyên nhân thật", "Bật trace on-first-retry cho chạy hằng ngày, on cho lúc đang điều tra riêng"],
        ["The terminal error line is just the tip — the trace reveals the real cause", "Enable on-first-retry for everyday runs, on for a dedicated investigation"],
        ["ターミナルのエラー行は氷山の一角にすぎない——traceが本当の原因を明らかにする", "日常実行にはon-first-retryを、個別調査時にはonを有効にする"]),
    ] },
  { heading: { vi: "8. Chạy lại đúng test vừa fail, không chạy lại cả bộ", en: "8. Re-running exactly the tests that just failed", ja: "8. 全体ではなく失敗したテストだけを再実行する" },
    blocks: [
      P("Sau khi sửa xong nguyên nhân (ví dụ dev đã hạ z-index banner ở tình huống trên), bạn cần xác nhận lại. Chạy lại nguyên cả bộ 48 test chỉ để kiểm 1-2 test vừa sửa là lãng phí thời gian. Playwright có sẵn cờ --last-failed để chỉ chạy lại đúng những test bị fail ở lần chạy gần nhất.",
        "After fixing the cause (e.g. the dev lowered the banner's z-index in the situation above), you need to confirm the fix. Re-running the entire 48-test suite just to check the 1-2 tests you fixed wastes time. Playwright has a built-in --last-failed flag to re-run exactly the tests that failed in the most recent run.",
        "原因を修正した後（上のシーンでは開発者がバナーのz-indexを下げた）、修正を確認する必要があります。修正した1〜2個のテストを確認するためだけに48個全体を再実行するのは時間の無駄です。Playwrightには、直前の実行で失敗したテストだけを再実行する--last-failedフラグが標準で用意されています。"),
      STEP(1, "Sau khi test fail, đừng đóng terminal — Playwright đã tự ghi nhớ danh sách test vừa fail.", "After a test fails, don't close the terminal — Playwright already remembers the list of tests that just failed.", "テストが失敗した後、ターミナルを閉じないこと——Playwrightは直前に失敗したテストのリストを既に記憶している。"),
      STEP(2, "Sau khi sửa code, chạy npx playwright test --last-failed để chỉ chạy lại đúng những test đó.", "After fixing the code, run npx playwright test --last-failed to re-run exactly those tests.", "コードを修正した後、npx playwright test --last-failedを実行してそのテストだけを再実行する。"),
      STEP(3, "Chỉ khi những test đó pass ổn định, mới chạy lại toàn bộ 1 lần cuối để chắc chắn không ảnh hưởng phần khác.", "Only once those tests pass reliably, run the whole suite once more as a final check to make sure nothing else was affected.", "それらのテストが安定してpassするようになって初めて、他に影響がないことを確認する最終チェックとしてスイート全体をもう一度実行する。"),
      CODE("bash", "# Chi chay lai dung nhung test vua bi FAILED o lan chay gan nhat\nnpx playwright test --last-failed\n\n# Sau khi cac test do da on dinh pass, chay lai toan bo 1 lan cuoi de chac chan\nnpx playwright test"),
      TIP("Kết hợp --last-failed với --headed khi đang xác nhận sửa lỗi để vừa chạy nhanh (chỉ test liên quan) vừa quan sát trực tiếp bằng mắt.", "Combine --last-failed with --headed while confirming a fix, to run fast (only the relevant tests) while also watching it directly.", "修正確認中は--last-failedと--headedを組み合わせ、速く（関連テストだけ）実行しながら直接目で確認しよう。"),
    ] },
  { heading: { vi: "9. Tình huống 2: chạy cả bộ quá lâu khi đang sửa 1 test", en: "9. Situation 2: running the whole suite is too slow while fixing one test", ja: "9. シーン2：1つのテストを直している間、スイート全体の実行が遅すぎる" },
    blocks: [
      SITUATION("Bạn đang sửa test 'Áp dụng mã giảm giá' bị fail. Mỗi lần sửa 1 dòng code, bạn theo phản xạ gõ npx playwright test — chạy nguyên cả bộ 48 test, mất gần 4 phút mỗi lần, dù chỉ 1 test liên quan tới thay đổi của bạn.", "You're fixing the failing 'Apply discount code' test. Every time you tweak one line of code, out of habit you type npx playwright test — running the entire 48-test suite, taking nearly 4 minutes each time, even though only one test relates to your change.", "失敗している『割引コードを適用』テストを直している。1行コードを変更するたびに、習慣でnpx playwright testと入力してしまい——変更に関係するのは1つのテストだけなのに、48個全体のスイートが実行され、毎回4分近くかかる。",
        "Sau vài chục lần thử-sửa-chạy như vậy, bạn nhận ra phần lớn thời gian làm việc trong buổi chiều bị 'ngốn' vào việc chờ 47 test không liên quan chạy xong, thay vì tập trung vào đúng vấn đề cần giải quyết.", "After dozens of try-fix-run cycles like this, you realize most of your afternoon working time was 'eaten' waiting for 47 unrelated tests to finish, instead of focusing on the actual problem to solve.", "このような試行錯誤を何十回も繰り返した後、午後の作業時間の大半が、関係のない47個のテストが終わるのを待つことに『消費』され、本当に解決すべき問題に集中できていなかったことに気づく。"),
      SOLVE("Chuyển sang chạy đúng phạm vi đang sửa: npx playwright test tests/discount.spec.js -g \"ap dung ma giam gia\" --headed. Vòng lặp thử-sửa-chạy giờ chỉ mất vài giây thay vì vài phút, và --headed giúp quan sát trực tiếp hiệu ứng của mỗi lần sửa.", "Switch to running exactly the scope you're fixing: npx playwright test tests/discount.spec.js -g \"ap dung ma giam gia\" --headed. The try-fix-run loop now takes just seconds instead of minutes, and --headed lets you directly watch the effect of each change.", "修正している範囲だけを正確に実行するように切り替える：npx playwright test tests/discount.spec.js -g \"ap dung ma giam gia\" --headed。試行錯誤ループは数分ではなく数秒で済むようになり、--headedで各変更の効果を直接観察できる。"),
      P("Bài học: chạy cả bộ test là việc dành cho lúc xác nhận tổng thể (trước khi merge, trong CI đêm), còn khi đang trong vòng lặp sửa-thử của MỘT tính năng, luôn thu hẹp phạm vi bằng đường dẫn file và/hoặc cờ -g. Việc này không chỉ tiết kiệm thời gian, mà còn giúp bạn tập trung đúng vào tín hiệu (kết quả của đúng test đang sửa) thay vì bị nhiễu bởi kết quả của 47 test khác không liên quan.",
        "Lesson: running the whole suite is for overall confirmation (before a merge, in nightly CI), while during the fix-try loop for ONE feature, always narrow the scope with a file path and/or the -g flag. This not only saves time, but also keeps you focused on the right signal (the result of the exact test you're fixing) instead of being distracted by 47 other unrelated results.",
        "教訓：スイート全体の実行は全体確認（マージ前、夜間CI）のためのものであり、1つの機能の修正・試行ループの最中は、常にファイルパスや-gフラグで範囲を絞りましょう。これは時間の節約だけでなく、関係のない他の47個の結果に気を取られるのではなく、正しいシグナル（修正しているテストの結果）に集中し続けることにも役立ちます。"),
      RECAP(["Vòng lặp sửa-thử: luôn thu hẹp phạm vi (file + -g), đừng chạy cả bộ", "Chạy cả bộ dành cho lúc xác nhận tổng thể trước merge hoặc CI đêm"],
        ["Fix-try loop: always narrow scope (file + -g), don't run the whole suite", "Running the whole suite is for overall confirmation before a merge or nightly CI"],
        ["修正・試行ループでは常に範囲を絞る（ファイル＋-g）、全体を実行しない", "スイート全体の実行は、マージ前や夜間CIでの全体確認のためのもの"]),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Chỉ đọc dòng lỗi ngắn trong terminal rồi đoán nguyên nhân, không mở trace/screenshot dù đã bật sẵn. Terminal chỉ là phần nổi của tảng băng — trace mới cho bằng chứng đầy đủ.", "Only reading the short terminal error line and guessing the cause, without opening the trace/screenshot even when it was enabled. The terminal is only the tip of the iceberg — the trace gives full evidence.", "ターミナルの短いエラー行だけを読んで原因を推測し、有効にしていてもtrace/screenshotを開かないこと。ターミナルは氷山の一角にすぎず、traceこそが完全な証拠を与えてくれます。"),
      PITFALL("Bật --trace on cho MỌI lần chạy hằng ngày (kể cả khi mọi thứ đều pass), khiến ổ đĩa đầy dần và các lần chạy chậm hẳn đi vì trace luôn được ghi. Chỉ nên bật on-first-retry cho việc chạy thường xuyên.", "Enabling --trace on for EVERY daily run (even when everything passes), causing disk space to fill up and runs to slow down noticeably since a trace is always recorded. Only enable on-first-retry for regular runs.", "毎日のすべての実行（すべてpassしているときも）で--trace onを有効にすること。常にtraceが記録されるためディスク容量が徐々に埋まり、実行が明らかに遅くなります。通常の実行にはon-first-retryだけを有効にしましょう。"),
      TIP("Tạo alias/script ngắn cho các lệnh hay dùng (ví dụ npm script \"test:cart\": \"playwright test tests/cart.spec.js --headed\") để không phải gõ lại cờ dài mỗi lần.", "Create short aliases/scripts for commonly used commands (e.g. an npm script \"test:cart\": \"playwright test tests/cart.spec.js --headed\") so you don't retype long flags every time.", "よく使うコマンド用に短いエイリアス・スクリプトを作ろう（例：npmスクリプト \"test:cart\": \"playwright test tests/cart.spec.js --headed\"）。毎回長いフラグを打ち直さずに済みます。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Assertion — kiểm chứng kết quả cho người mới", "Assertions for beginners: verifying results", "assertion-kiem-chung-ket-qua-cho-nguoi-moi", "初心者のためのアサーション—結果の検証"),
      INTERNAL("Waits — xử lý bất đồng bộ cho người mới", "Handling asynchronous waits for beginners", "waits-xu-ly-bat-dong-bo-cho-nguoi-moi", "初心者のための非同期処理（waits）"),
      INTERNAL("Cách viết báo cáo kết quả kiểm thử cho người mới", "How to write a testing results report for beginners", "cach-viet-bao-cao-ket-qua-kiem-thu-cho-nguoi-moi", "初心者のためのテスト結果報告書の書き方"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách chạy test tự động và đọc báo cáo qua bộ test ShopEasy: chạy cả bộ so với chạy đúng 1 test/1 file, chọn headed hay headless, đọc pass/fail/skipped trong terminal, mở và đọc báo cáo HTML, bật trace/screenshot/video để tìm nguyên nhân khi fail, và chạy lại đúng test vừa fail bằng --last-failed. Hai tình huống thật cho thấy giá trị của trace khi không rõ nguyên nhân, và giá trị của việc thu hẹp phạm vi chạy khi đang trong vòng lặp sửa-thử. Đây là kỹ năng bạn dùng gần như mỗi ngày khi làm automation, quan trọng không kém việc viết được test.",
        "You just learned how to run automated tests and read reports through ShopEasy's test suite: running the whole suite versus exactly one test/file, choosing headed or headless, reading pass/fail/skipped in the terminal, opening and reading the HTML report, enabling trace/screenshot/video to find the cause on failure, and re-running exactly the tests that just failed with --last-failed. Two real situations showed the value of a trace when the cause is unclear, and the value of narrowing the run scope during a fix-try loop. This is a skill you'll use almost every day in automation, just as important as being able to write a test.",
        "ShopEasyのテストスイートを通じて、自動テストの実行方法とレポートの読み方を学びました：スイート全体と1つのテスト/ファイルだけの実行、headedかheadlessかの選択、ターミナルでのpass/fail/skippedの読み方、HTMLレポートの開き方と読み方、失敗時に原因を見つけるためのtrace/screenshot/videoの有効化、そして--last-failedで直前に失敗したテストだけを再実行する方法。2つの実例は、原因が不明なときのtraceの価値と、修正・試行ループ中に実行範囲を絞ることの価値を示しました。これはテストを書けることと同じくらい重要な、自動化でほぼ毎日使うスキルです。"),
      IMG(m_dashboard, "Dashboard tỉ lệ pass của bộ test ShopEasy chạy đêm qua CI, số liệu test fail/skip cần theo dõi", "A dashboard showing ShopEasy's pass rate from the nightly CI run, with fail/skip counts to watch", "夜間CIで実行されたShopEasyのpass率を示すダッシュボード、注視すべきfail/skip数"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về cách tổ chức báo cáo cho cả nhóm (gộp nhiều lần chạy, gửi thông báo khi có test fail trong CI) và cách viết assertion rõ ràng để thông báo lỗi tự giải thích được nguyên nhân. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into organizing reports for a whole team (combining multiple runs, sending notifications when a test fails in CI) and writing clear assertions so error messages explain their own cause. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、チーム全体のためのレポート整理（複数回の実行をまとめる、CIでテストが失敗したときに通知を送る）や、エラーメッセージ自体が原因を説明できるような明確なアサーションの書き方を学ぶとよいでしょう。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const RUNNER_01 = makeDoc({
  slug: "chay-test-va-doc-bao-cao-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "chạy test đọc báo cáo",
  keywords: ["chạy test đọc báo cáo", "playwright test report", "npx playwright test", "trace viewer playwright", "báo cáo kết quả kiểm thử cho người mới"],
  coverLabel: "NGƯỜI MỚI · CHẠY TEST & REPORT · TMĐT",
  crumb: "Chạy test & đọc báo cáo cho người mới",
  metaTitle: { vi: "Chạy test đọc báo cáo cho người mới (Playwright)", en: "Running Tests & Reading Reports for Beginners (Playwright)", ja: "初心者のためのテスト実行とレポートの読み方（Playwright）" },
  metaDescription: {
    vi: "Chạy test đọc báo cáo cho người mới: chạy 1 test hoặc cả bộ Playwright, headed/headless, đọc pass/fail/skipped, xem trace khi fail, chạy lại test fail.",
    en: "Running tests and reading reports for beginners: run one test or the whole suite with Playwright, headed vs headless, reading pass/fail/skipped, viewing trace on failure, opening the HTML report, re-running failed tests, with real runnable commands.",
    ja: "初心者のためのテスト実行とレポートの読み方：Playwrightで1つまたは全体を実行、headed/headless、pass/fail/skippedの読み方、失敗時のtrace確認、HTMLレポートの表示、失敗テストの再実行、実際に動くコマンド付きで解説。",
  },
  title: {
    vi: "Chạy test tự động & đọc báo cáo kết quả cho người mới (có lệnh chạy thật)",
    en: "Running automated tests & reading the report for beginners (with real commands)",
    ja: "初心者のための自動テストの実行とレポートの読み方（実際のコマンド付き）",
  },
  summary: {
    vi: "Bài cho người mới: học chạy test tự động và đọc báo cáo qua app TMĐT ShopEasy bằng Playwright. Chạy 1 test/1 bộ, headed/headless, đọc pass/fail/skipped, xem trace/screenshot/video khi fail, mở báo cáo HTML, chạy lại đúng test fail. Hai tình huống thật (test fail không rõ nguyên nhân, chạy cả bộ quá lâu khi đang sửa), nhiều mockup báo cáo, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to run automated tests and read reports through the ShopEasy e-commerce app with Playwright. Running one test/the whole suite, headed/headless, reading pass/fail/skipped, viewing trace/screenshot/video on failure, opening the HTML report, re-running exactly failed tests. Two real situations (an unclear test failure, the whole suite being too slow while fixing), many report mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでPlaywrightを使い、自動テストの実行方法とレポートの読み方を学ぶ。1つ/全体の実行、headed/headless、pass/fail/skippedの読み方、失敗時のtrace/screenshot/videoの確認、HTMLレポートの表示、失敗テストだけの再実行。2つの実例（原因不明のテスト失敗、修正中にスイート全体が遅すぎる）、多数のレポートモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chạy test tự động và đọc báo cáo kết quả", steps: [
    { name: "Chọn đúng phạm vi chạy", text: "Chạy cả bộ để xác nhận tổng thể, hoặc thu hẹp bằng file/-g khi đang sửa 1 tính năng." },
    { name: "Đọc kết quả pass/fail/skipped", text: "Xem dòng tổng kết terminal, mở báo cáo HTML để xem chi tiết từng test." },
    { name: "Điều tra test fail bằng trace", text: "Bật trace/screenshot/video, mở Trace Viewer để xem chính xác bước gây lỗi." },
  ] },
  pages,
});

export const AU_RUNNER_01 = [RUNNER_01];
