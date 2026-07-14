// doc_au_cicd.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Chạy test tự động trên CI/CD (GitHub Actions) — vì sao cần chạy test trên CI, cấu trúc
// workflow YAML cơ bản, chạy Playwright headless trên CI, lưu report/trace làm artifact,
// badge pass/fail, chạy khi push/PR, và chạy song song (sharding) để rút ngắn thời gian.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), có code YAML/CLI chạy được thật.
// Gắn app TMĐT ShopEasy. Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { grid, jira, kanban, moduleFlow, dashboard } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hoá, CI/CD & dự án thực chiến.",
};
const COURSE_URL = course.url;
const COURSE_1V1_URL = "https://cybersoft.edu.vn/trainning-course-1vs1/";

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

// ── Mockup 1: sơ đồ pipeline push → CI → chạy test → report ──
const m_pipeline = moduleFlow("Pipeline CI: từ push code tới report tự động (ShopEasy)", [
  { id: "push", label: "Push code", sub: "git push / mở PR", x: 96, y: 150 },
  { id: "ci", label: "GitHub Actions", sub: "nhận sự kiện, khởi tạo máy ảo", x: 340, y: 150 },
  { id: "test", label: "Chạy Playwright", sub: "headless, toàn bộ test suite", x: 584, y: 150 },
  { id: "report", label: "Report/Artifact", sub: "HTML report + trace lưu lại", x: 700, y: 260 },
], [
  { from: "push", to: "ci", label: "trigger on: push/PR" },
  { from: "ci", to: "test", label: "npx playwright test" },
  { from: "test", to: "report", label: "upload-artifact" },
], { accent: "#7c3aed", h: 320 });

// ── Mockup 2: màn hình GitHub Actions run, chú thích từng bước ──
const runSteps = [
  ["Checkout code", "#16a34a"],
  ["Setup Node.js 20", "#16a34a"],
  ["Cài đặt dependencies (npm ci)", "#16a34a"],
  ["Cài trình duyệt (playwright install --with-deps)", "#16a34a"],
  ["Chạy Playwright tests", "#16a34a"],
  ["Upload artifact: playwright-report", "#16a34a"],
];
const runInner = `<rect x="0" y="0" width="760" height="${60 + runSteps.length * 34 + 20}" fill="#0f172a"/>
<text x="24" y="32" font-size="13" font-weight="800" fill="#e2e8f0">Run #482 · shopeasy/tests.yml · main ✔ Passing</text>
${runSteps.map((s, i) => `<circle cx="40" cy="${64 + i * 34}" r="8" fill="${s[1]}"/><text x="40" y="${69 + i * 34}" text-anchor="middle" font-size="10" font-weight="900" fill="#0f172a">✓</text><text x="60" y="${69 + i * 34}" font-size="12.5" fill="#e2e8f0">${s[0]}</text>`).join("")}
<rect x="20" y="52" width="360" height="26" rx="8" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3"/>
<rect x="20" y="30" width="150" height="18" rx="9" fill="#ef4444"/><text x="28" y="43" font-size="11" font-weight="700" fill="#ffffff">Badge: passing</text>`;
const m_ghrun = `<svg viewBox="0 0 760 ${60 + runSteps.length * 34 + 20}" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Inter,Segoe UI,Arial">
<rect width="760" height="${60 + runSteps.length * 34 + 20}" rx="16" fill="#ffffff" stroke="#e2e8f0"/>
<rect x="1" y="1" width="758" height="46" rx="15" fill="#1f2937"/><rect x="1" y="30" width="758" height="18" fill="#1f2937"/>
<circle cx="26" cy="24" r="6" fill="#ff5f57"/><circle cx="46" cy="24" r="6" fill="#febc2e"/><circle cx="66" cy="24" r="6" fill="#28c840"/>
<text x="96" y="28" font-size="12" fill="#cbd5e1">🔒 github.com/shopeasy/actions/runs/482</text>
<g transform="translate(0,48)">${runInner}</g></svg>`;

// ── Mockup 3: bảng lợi ích chạy test trên CI so với chỉ chạy tay/local ──
const m_benefits = grid("Chỉ chạy tay trên máy cá nhân, so với chạy tự động trên CI", ["Tiêu chí", "Chỉ chạy tay/local", "Chạy tự động trên CI"], [
  ["Khi nào test được chạy", "Chỉ khi ai đó nhớ và tự chạy", "Tự động mỗi lần push hoặc mở Pull Request"],
  ["Môi trường chạy", "Máy mỗi người một khác (OS, phiên bản Node...)", "Cùng 1 máy ảo sạch, cấu hình giống hệt nhau mỗi lần"],
  ["Phát hiện lỗi", "Có thể merge nhầm code lỗi vì quên chạy test", "Chặn merge nếu test đỏ, phát hiện lỗi trước khi vào main"],
  ["Bằng chứng cho team", "Chỉ người chạy biết kết quả", "Mọi người trong team đều thấy badge + report công khai"],
  ["Report/trace khi fail", "Thường bị mất khi tắt máy hoặc đổi việc khác", "Lưu lại làm artifact, xem lại bất cứ lúc nào"],
], { accent: "#7c3aed", note: "Chạy test trên CI không thay thế chạy local — nó là lớp bảo vệ cuối trước khi code vào nhánh chính." });

// ── Mockup 4: ticket Jira khi quên chạy test trước merge làm bug lọt production ──
const m_jira = jira({
  key: "SE-14210", title: "Bug tính sai tổng tiền giỏ hàng lọt lên production do merge code chưa chạy test",
  type: "Bug", status: "Open", priority: "Highest", severity: "Critical",
  fields: [
    ["Môi trường", "production · web ShopEasy · phát hiện bởi khách hàng, không phải QA"],
    ["Nguyên nhân", "Dev merge nhánh 'fix-giam-gia' thẳng vào main, không đợi CI chạy xong test giỏ hàng"],
    ["Ảnh hưởng", "Giỏ hàng tính sai giá khi áp mã giảm giá, ảnh hưởng đơn hàng thật trong 3 giờ trước khi phát hiện"],
    ["Đề xuất", "Bật branch protection: bắt buộc job CI 'test' phải pass mới cho phép merge vào main"],
  ],
});

// ── Mockup 5: bảng kanban pipeline Pull Request trên CI ──
const m_kanban = kanban("Vòng đời một Pull Request qua CI (ShopEasy · Automation)", [
  { name: "Mở PR", cards: [
    { key: "SE-14225", title: "Thêm bộ lọc sản phẩm theo giá", sev: "Medium" },
  ] },
  { name: "CI đang chạy", cards: [
    { key: "SE-14221", title: "Sửa luồng thanh toán VNPay", sev: "High" },
  ] },
  { name: "CI fail - cần sửa", cards: [
    { key: "SE-14210", title: "Tính sai tổng tiền khi áp mã giảm giá", sev: "Critical" },
  ] },
  { name: "CI pass - sẵn sàng merge", cards: [
    { key: "SE-14198", title: "Cập nhật giao diện trang giỏ hàng", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard số liệu CI 7 ngày qua ──
const m_dashboard = dashboard("Số liệu CI của ShopEasy · 7 ngày qua", [
  { label: "Tỉ lệ CI pass", value: "92%", sub: "trên tổng số lần chạy", color: "#16a34a" },
  { label: "Thời gian chạy TB", value: "6m 40s", sub: "trước khi chia shard", color: "#7c3aed" },
  { label: "Lần chặn merge", value: "11", sub: "do job test fail", color: "#ef4444" },
], { accent: "#7c3aed" });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "CI/CD là gì, và chạy test trên CI khác gì với tự động hoá kiểm thử (test automation)?",
  "What is CI/CD, and how is running tests on CI different from test automation?",
  "CI/CD (Continuous Integration/Continuous Delivery) là quy trình tự động hoá việc tích hợp, kiểm tra và triển khai code mỗi khi có thay đổi. Test automation (viết script Playwright, Selenium...) là công cụ để KIỂM TRA, còn CI là nơi 'kích hoạt' công cụ đó chạy tự động mỗi khi có push hoặc Pull Request, thay vì phải tự tay bấm chạy. Nói cách khác: automation trả lời câu hỏi 'test cái gì', còn CI trả lời câu hỏi 'chạy test khi nào và ở đâu'.",
  "CI/CD (Continuous Integration/Continuous Delivery) is the process of automating code integration, verification, and deployment whenever changes happen. Test automation (writing Playwright, Selenium scripts...) is the tool that DOES the checking, while CI is where that tool gets 'triggered' automatically on every push or Pull Request, instead of someone manually clicking run. In other words: automation answers 'what to test', while CI answers 'when and where to run it'.",
  "CI/CDとは何？CI上でテストを実行することとテスト自動化はどう違う？",
  "CI/CD（継続的インテグレーション/継続的デリバリー）とは、変更があるたびにコードの統合・検証・デプロイを自動化するプロセスです。テスト自動化（Playwright、Seleniumなどでスクリプトを書くこと）は『検証する』ためのツールであり、CIはそのツールを誰かが手動で実行する代わりに、pushやPull Requestのたびに自動的に『起動する』場所です。つまり自動化は『何をテストするか』に、CIは『いつどこで実行するか』に答えます。");
const faq2 = FAQ(
  "Vì sao test pass trên máy cá nhân nhưng lại fail khi chạy trên CI?",
  "Why do tests pass on my personal machine but fail when run on CI?",
  "Nguyên nhân phổ biến nhất là môi trường khác nhau: máy cá nhân đã cài sẵn trình duyệt, dữ liệu mẫu, hoặc biến môi trường mà máy ảo CI không có. Ví dụ máy CI là một môi trường 'sạch', chưa từng cài trình duyệt Playwright — nếu workflow quên bước 'npx playwright install --with-deps', test sẽ báo lỗi không tìm thấy trình duyệt dù code hoàn toàn đúng. Cách khắc phục là luôn khai báo đầy đủ các bước cài đặt trong workflow, thay vì dựa vào những gì 'tình cờ' đã có sẵn trên máy cá nhân.",
  "The most common cause is environment differences: your personal machine already has browsers, sample data, or environment variables installed that the CI virtual machine doesn't. For example, the CI machine is a 'clean' environment that has never installed Playwright's browsers — if the workflow forgets the 'npx playwright install --with-deps' step, tests will fail with 'browser not found' even though the code is completely correct. The fix is to always declare every setup step explicitly in the workflow, instead of relying on whatever 'happens' to already exist on your personal machine.",
  "なぜ個人のマシンではテストが通るのに、CIで実行すると失敗するの？",
  "最も一般的な原因は環境の違いです：個人のマシンにはすでにブラウザ、サンプルデータ、環境変数がインストールされていますが、CIの仮想マシンにはありません。例えばCIマシンは一度もPlaywrightのブラウザをインストールしたことのない『クリーンな』環境です——ワークフローが'npx playwright install --with-deps'ステップを忘れると、コードが完全に正しくても『ブラウザが見つからない』というエラーでテストが失敗します。解決策は、個人マシンに『たまたま』あるものに頼らず、必要なセットアップステップをワークフローに明示的にすべて宣言することです。");
const faq3 = FAQ(
  "Có cần chạy toàn bộ test mỗi lần push, hay chỉ nên chạy khi mở Pull Request?",
  "Do I need to run all tests on every push, or only when a Pull Request is opened?",
  "Tuỳ quy mô dự án. Với dự án nhỏ, chạy toàn bộ test trên cả push và Pull Request (khai báo 'on: push, pull_request') là hợp lý và đơn giản nhất. Khi bộ test lớn dần, nhiều đội chỉ chạy bộ test đầy đủ trên Pull Request (trước khi merge vào main) và chạy smoke test ngắn hơn trên mỗi push nhánh phụ, để tiết kiệm thời gian máy ảo mà vẫn đảm bảo main luôn được bảo vệ bởi CI trước khi có code mới vào.",
  "It depends on project scale. For small projects, running the full test suite on both push and Pull Request (declaring 'on: push, pull_request') is simplest and reasonable. As the test suite grows, many teams only run the full suite on Pull Requests (before merging into main) and run a shorter smoke test on every feature-branch push, to save CI machine time while still ensuring main stays protected by CI before new code lands.",
  "毎回のpushで全テストを実行する必要がある？それともPull Requestを開いたときだけでよい？",
  "プロジェクトの規模によります。小規模プロジェクトでは、pushとPull Requestの両方で全テストを実行する（'on: push, pull_request'を宣言する）のが最もシンプルで妥当です。テストスイートが大きくなるにつれ、多くのチームはPull Request時（mainへのマージ前）にのみ全テストを実行し、機能ブランチへの各pushでは短いスモークテストを実行して、CIマシンの時間を節約しつつ、新しいコードが入る前にmainが常にCIで保護されるようにします。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao nên chạy test tự động trên CI thay vì chỉ chạy tay trên máy cá nhân?", en: "Why should you run automated tests on CI instead of only running them manually on a personal machine?", ja: "なぜ個人のマシンで手動実行するだけでなく、CIで自動テストを実行すべき？" },
    options: [
      { vi: "Vì CI chạy nhanh hơn Playwright trên máy cá nhân về mặt thuật toán", en: "Because CI algorithmically runs Playwright faster than a personal machine", ja: "CIがアルゴリズム的に個人マシンよりPlaywrightを速く実行するから" },
      { vi: "Vì CI đảm bảo mọi push/Pull Request đều được kiểm tra tự động, nhất quán, không phụ thuộc việc ai đó có nhớ chạy tay hay không", en: "Because CI ensures every push/Pull Request is checked automatically and consistently, without depending on whether someone remembers to run tests manually", ja: "CIはpush/Pull Requestのたびに、誰かが手動実行を覚えているかに関係なく、自動的かつ一貫して検証することを保証するから" },
      { vi: "Vì chạy trên CI không cần viết code test nữa", en: "Because running on CI means you no longer need to write test code", ja: "CIで実行すればテストコードを書く必要がなくなるから" },
      { vi: "Vì CI tự sửa lỗi code giúp lập trình viên", en: "Because CI automatically fixes bugs in the code for developers", ja: "CIが開発者の代わりにコードのバグを自動的に直してくれるから" },
    ], correct: 1,
    explain: { vi: "CI biến việc chạy test từ 'thói quen cá nhân, dễ quên' thành 'quy trình tự động, luôn xảy ra' mỗi khi có thay đổi code.", en: "CI turns running tests from a 'personal habit that's easy to forget' into an 'automatic process that always happens' whenever code changes.", ja: "CIはテスト実行を『忘れやすい個人の習慣』から、コードが変わるたびに『必ず起こる自動プロセス』に変えます。" },
  }),
  mcq({
    q: { vi: "Trong workflow GitHub Actions, khai báo 'on: push, pull_request' dùng để làm gì?", en: "In a GitHub Actions workflow, what does declaring 'on: push, pull_request' do?", ja: "GitHub Actionsのワークフローで、'on: push, pull_request'の宣言は何をする？" },
    options: [
      { vi: "Xác định sự kiện nào sẽ kích hoạt workflow chạy (khi có push hoặc mở Pull Request)", en: "Defines which events trigger the workflow to run (a push, or opening a Pull Request)", ja: "ワークフローを実行させるイベント（pushまたはPull Requestを開くこと）を定義する" },
      { vi: "Chọn hệ điều hành cho máy ảo chạy test", en: "Selects the operating system for the test-running virtual machine", ja: "テストを実行する仮想マシンのOSを選択する" },
      { vi: "Cài đặt trình duyệt Playwright lên máy ảo", en: "Installs the Playwright browsers onto the virtual machine", ja: "仮想マシンにPlaywrightのブラウザをインストールする" },
      { vi: "Xoá toàn bộ artifact cũ trước khi chạy", en: "Deletes all old artifacts before running", ja: "実行前に古いアーティファクトをすべて削除する" },
    ], correct: 0,
    explain: { vi: "'on:' là phần khai báo trigger — nói cho GitHub Actions biết workflow này chỉ chạy khi có sự kiện push hoặc pull_request xảy ra.", en: "'on:' is the trigger declaration — it tells GitHub Actions this workflow only runs when a push or pull_request event happens.", ja: "'on:'はトリガーの宣言です——このワークフローはpushまたはpull_requestイベントが起きたときだけ実行されると、GitHub Actionsに伝えます。" },
  }),
  mcq({
    q: { vi: "Lệnh 'npx playwright install --with-deps' trong workflow CI dùng để làm gì?", en: "What does the 'npx playwright install --with-deps' command do in a CI workflow?", ja: "CIワークフローの'npx playwright install --with-deps'コマンドは何をする？" },
    options: [
      { vi: "Cài trình duyệt cùng các thư viện hệ thống cần thiết để chạy Playwright headless trên máy ảo CI 'sạch'", en: "Installs the browsers plus the system libraries needed to run Playwright headless on the 'clean' CI virtual machine", ja: "『クリーンな』CI仮想マシンでPlaywrightをヘッドレス実行するために必要な、ブラウザとシステムライブラリをインストールする" },
      { vi: "Cài đặt Node.js phiên bản mới nhất", en: "Installs the latest version of Node.js", ja: "最新バージョンのNode.jsをインストールする" },
      { vi: "Xoá cache npm để tăng tốc build", en: "Clears the npm cache to speed up the build", ja: "ビルドを高速化するためnpmキャッシュを削除する" },
      { vi: "Tạo file report HTML sau khi test chạy xong", en: "Generates the HTML report after tests finish running", ja: "テスト終了後にHTMLレポートを生成する" },
    ], correct: 0,
    explain: { vi: "Máy ảo CI không có sẵn trình duyệt như máy cá nhân; thiếu bước cài này, test sẽ báo lỗi 'không tìm thấy trình duyệt' dù code đúng.", en: "The CI virtual machine doesn't come with browsers preinstalled like a personal machine; skip this step and tests fail with 'browser not found' even if the code is correct.", ja: "CI仮想マシンには個人マシンのようにブラウザが最初から入っていません。このステップを省くと、コードが正しくても『ブラウザが見つからない』エラーになります。" },
  }),
  mcq({
    q: { vi: "Vì sao nên lưu playwright-report và trace làm artifact trên CI?", en: "Why should you save the playwright-report and trace as CI artifacts?", ja: "なぜplaywright-reportとトレースをCIのアーティファクトとして保存すべき？" },
    options: [
      { vi: "Để giảm thời gian chạy test trên CI", en: "To reduce the time it takes to run tests on CI", ja: "CIでのテスト実行時間を短縮するため" },
      { vi: "Để bất kỳ ai trong team đều xem lại được report/trace của lần chạy đó, kể cả khi đã tắt máy ảo CI, đặc biệt hữu ích khi test fail cần debug", en: "So anyone on the team can review that run's report/trace later, even after the CI virtual machine is gone — especially useful for debugging failed tests", ja: "CIの仮想マシンが既になくなっていても、チームの誰もが後からそのランのレポート/トレースを確認できるようにするため——特に失敗したテストのデバッグに役立つ" },
      { vi: "Vì GitHub Actions bắt buộc phải có bước này thì workflow mới chạy được", en: "Because GitHub Actions requires this step for the workflow to run at all", ja: "GitHub Actionsがこのステップなしではワークフローを実行できないため" },
      { vi: "Để tự động sửa các test đang fail", en: "To automatically fix the failing tests", ja: "失敗しているテストを自動的に修正するため" },
    ], correct: 1,
    explain: { vi: "Máy ảo CI bị huỷ ngay sau khi job kết thúc; artifact là cách duy nhất giữ lại report/trace để xem lại và debug sau đó.", en: "The CI virtual machine is destroyed right after the job finishes; artifacts are the only way to keep the report/trace around to review and debug afterward.", ja: "CI仮想マシンはジョブ終了直後に破棄されます。アーティファクトは、後で確認・デバッグするためにレポート/トレースを残す唯一の方法です。" },
  }),
  mcq({
    q: { vi: "'matrix.shard' trong workflow GitHub Actions dùng để làm gì?", en: "What is 'matrix.shard' used for in a GitHub Actions workflow?", ja: "GitHub Actionsのワークフローで'matrix.shard'は何のために使う？" },
    options: [
      { vi: "Chia bộ test thành nhiều phần, chạy song song trên nhiều job để rút ngắn tổng thời gian CI", en: "Splits the test suite into multiple parts, run in parallel across multiple jobs to shorten total CI time", ja: "テストスイートを複数の部分に分割し、複数のジョブで並列実行してCIの合計時間を短縮する" },
      { vi: "Tự động sửa các test bị flaky", en: "Automatically fixes flaky tests", ja: "不安定（flaky）なテストを自動的に修正する" },
      { vi: "Chọn ngôn ngữ hiển thị report", en: "Selects the display language for the report", ja: "レポートの表示言語を選択する" },
      { vi: "Giới hạn số lần retry khi test fail", en: "Limits the number of retries when a test fails", ja: "テスト失敗時のリトライ回数を制限する" },
    ], correct: 0,
    explain: { vi: "Với strategy.matrix.shard, mỗi job chỉ chạy 1 phần của bộ test (ví dụ 1/4, 2/4...), các job chạy song song nên tổng thời gian chờ CI ngắn lại đáng kể.", en: "With strategy.matrix.shard, each job only runs one slice of the test suite (e.g. 1/4, 2/4...), and since jobs run in parallel, total CI wait time shrinks significantly.", ja: "strategy.matrix.shardを使うと、各ジョブはテストスイートの一部（例：1/4、2/4など）だけを実行し、ジョブが並列で動くためCIの合計待ち時間が大幅に短縮されます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & pipeline bạn sẽ dựng", en: "1. TL;DR & the pipeline you'll build", ja: "1. 要点と構築するパイプライン" },
    blocks: [
      TLDR("Chạy test trên CI/CD nghĩa là để GitHub Actions tự động cài đặt và chạy bộ test Playwright mỗi khi có push hoặc mở Pull Request, thay vì phải tự tay bấm chạy trên máy cá nhân. Bài này bám app TMĐT ShopEasy: bạn học vì sao cần CI, cấu trúc workflow YAML cơ bản, cách chạy Playwright headless trên CI, lưu report/trace làm artifact, badge pass/fail, và chạy song song (sharding) để rút ngắn thời gian. CyberSoft Academy dạy automation & CI/CD testing bài bản từ zero tới đi làm — https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Running tests on CI/CD means letting GitHub Actions automatically install and run your Playwright test suite on every push or Pull Request, instead of clicking run yourself on a personal machine. This article follows the ShopEasy e-commerce app: you'll learn why CI matters, the basic YAML workflow structure, how to run Playwright headless on CI, saving reports/traces as artifacts, pass/fail badges, and running in parallel (sharding) to shorten CI time. CyberSoft Academy teaches automation & CI/CD testing properly from zero to hired — see the course link above. Lots of visuals and a quiz at the end.",
        "CI/CD上でテストを実行するとは、個人のマシンで自分で実行ボタンを押す代わりに、pushやPull Requestのたびに GitHub Actionsが自動的にPlaywrightのテストスイートをインストール・実行することです。本記事はECアプリShopEasyに沿い、CIがなぜ必要か、基本的なYAMLワークフロー構成、CI上でPlaywrightをヘッドレス実行する方法、レポート/トレースをアーティファクトとして保存する方法、成功/失敗バッジ、そして時間短縮のための並列実行（シャーディング）を学びます。CyberSoft Academyはゼロから就職までの自動化とCI/CDテストを体系的に教えています。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Ở bài Page Object Model, bạn đã học cách viết script Playwright chạy được trên máy cá nhân. Nhưng script chạy tốt trên máy bạn không có nghĩa là dự án đã an toàn — nếu chỉ có bạn biết chạy nó, và chỉ chạy khi bạn nhớ, thì code lỗi vẫn có thể lọt vào nhánh chính bất cứ lúc nào đồng đội khác quên chạy test. Đây chính là lý do cần chạy test trên CI/CD (Continuous Integration/Continuous Delivery): biến việc chạy test từ 'thói quen cá nhân' thành 'quy trình tự động, luôn xảy ra' mỗi khi có push hoặc Pull Request. Chúng ta sẽ học qua pipeline thật của ShopEasy, dùng GitHub Actions — công cụ CI miễn phí, tích hợp sẵn trong GitHub.",
        "Hi, newcomer! In the Page Object Model article, you learned to write Playwright scripts that run on your personal machine. But a script running fine on your machine doesn't mean the project is safe — if only you know how to run it, and it only runs when you remember to, broken code can still slip into the main branch anytime a teammate forgets to run tests. This is exactly why you need to run tests on CI/CD (Continuous Integration/Continuous Delivery): turning test runs from a 'personal habit' into an 'automatic process that always happens' on every push or Pull Request. We'll learn through ShopEasy's real pipeline, using GitHub Actions — a free CI tool built right into GitHub.",
        "こんにちは、初心者さん！Page Object Modelの記事では、個人のマシンで動くPlaywrightスクリプトの書き方を学びました。しかし自分のマシンでスクリプトがうまく動くからといって、プロジェクトが安全というわけではありません——実行方法を知っているのが自分だけで、自分が思い出したときにしか実行されないなら、他のメンバーがテストを忘れるたびに壊れたコードがメインブランチに入り込む可能性があります。これこそがCI/CD（継続的インテグレーション/継続的デリバリー）上でテストを実行する理由です：テスト実行を『個人の習慣』から、pushやPull Requestのたびに『必ず起こる自動プロセス』に変えます。GitHubに組み込まれた無料のCIツールであるGitHub Actionsを使い、ShopEasyの実際のパイプラインを通じて学びます。"),
      IMG(m_pipeline, "Sơ đồ pipeline: push code kích hoạt CI, CI chạy Playwright, kết quả lưu thành report/artifact", "Pipeline diagram: pushing code triggers CI, CI runs Playwright, results are saved as a report/artifact", "パイプライン図：コードのpushがCIを起動し、CIがPlaywrightを実行し、結果がレポート/アーティファクトとして保存される"),
      DEF("CI/CD", "quy trình tự động hoá việc tích hợp (build, chạy test) và triển khai code mỗi khi có thay đổi, thay vì làm thủ công.",
        "the process of automating code integration (building, testing) and deployment whenever changes happen, instead of doing it manually.",
        "変更があるたびに、手動で行う代わりに、コードの統合（ビルド、テスト実行）とデプロイを自動化するプロセス。"),
    ] },
  { heading: { vi: "2. Vấn đề & vì sao chạy test trên CI quan trọng", en: "2. The problem & why running tests on CI matters", ja: "2. 問題とCIでのテスト実行がなぜ重要か" },
    blocks: [
      P("Hãy hình dung nhóm ShopEasy có 5 lập trình viên, mỗi người viết code trên nhánh riêng rồi mở Pull Request để merge vào main. Nếu quy trình chỉ dựa vào việc 'mỗi người tự chạy test trước khi push', điều gì xảy ra khi một người đang gấp deadline, quên chạy, hoặc chỉ chạy đúng phần code mình sửa mà bỏ sót ảnh hưởng tới phần khác? Test có thể vẫn tồn tại trong repo, đầy đủ và chạy được — nhưng nếu không ai bắt buộc chạy nó, nó chẳng khác gì không tồn tại.",
        "Imagine ShopEasy's team has 5 developers, each writing code on their own branch and opening a Pull Request to merge into main. If the process only relies on 'each person running tests themselves before pushing', what happens when someone is rushing a deadline, forgets to run them, or only runs the part of the code they changed while missing effects on other parts? The tests may still exist in the repo, complete and runnable — but if nobody is forced to run them, they might as well not exist.",
        "ShopEasyのチームに5人の開発者がいて、それぞれが自分のブランチでコードを書き、mainにマージするためにPull Requestを開くと想像してください。プロセスが『各自がpush前に自分でテストを実行する』ことだけに頼っている場合、締め切りに追われて忘れたり、自分が変更した部分のテストだけ実行して他の部分への影響を見落としたりしたらどうなるでしょう？テストはリポジトリに完全な形で存在し実行可能かもしれませんが、誰も実行を強制されなければ、存在しないのも同然です。"),
      IMG(m_benefits, "Bảng so sánh: chỉ chạy test tay/local, so với chạy tự động trên CI mỗi lần push/PR", "Comparison: running tests manually/locally only, versus running automatically on CI on every push/PR", "比較表：手動/ローカルでのみテストを実行する場合と、push/PRのたびにCIで自動実行する場合"),
      P("Vấn đề còn sâu hơn: ngay cả khi ai đó có chạy test, máy của họ có thể khác máy của người khác — phiên bản Node.js khác, đã cài sẵn trình duyệt từ trước, hoặc có biến môi trường 'may mắn' đúng. Test 'pass trên máy tôi' không đảm bảo pass trên máy đồng đội, và càng không đảm bảo pass trên môi trường sẽ deploy thật. Đây là lý do cần một nơi chạy test THỐNG NHẤT, TỰ ĐỘNG, và KHÔNG PHỤ THUỘC vào việc ai đó có nhớ hay không — đó chính là CI.",
        "The problem runs deeper: even when someone does run tests, their machine might differ from someone else's — a different Node.js version, browsers already pre-installed, or environment variables that happen to be 'luckily' correct. A test that 'passes on my machine' doesn't guarantee it passes on a teammate's machine, and even less guarantees it passes in the real deployment environment. This is why you need a UNIFIED, AUTOMATIC place to run tests that DOESN'T DEPEND on whether someone remembers — that's exactly CI.",
        "問題はさらに根深いものです：誰かがテストを実行したとしても、そのマシンは他の人のマシンと異なるかもしれません——異なるNode.jsのバージョン、すでにインストール済みのブラウザ、たまたま『運良く』正しい環境変数など。『自分のマシンでは通る』テストは、チームメイトのマシンで通ることを保証せず、実際のデプロイ環境で通ることはさらに保証しません。だからこそ、誰かが覚えているかに依存しない、統一された自動実行の場所が必要です——それがまさにCIです。"),
      DEF("Continuous Integration (CI)", "phần 'tích hợp liên tục' của CI/CD: mỗi khi có code mới, hệ thống tự động build và chạy test để phát hiện lỗi sớm, trước khi code vào nhánh chính.",
        "the 'continuous integration' part of CI/CD: whenever new code arrives, the system automatically builds and runs tests to catch bugs early, before the code enters the main branch.",
        "CI/CDの『継続的インテグレーション』部分：新しいコードが来るたびに、システムが自動的にビルドしテストを実行して、コードがメインブランチに入る前に早期にバグを発見する。"),
      P("CI/CD gồm 2 phần: Continuous Integration (CI) — tự động build và chạy test mỗi khi có thay đổi code; và Continuous Delivery/Deployment (CD) — tự động đưa code đã qua kiểm tra tới môi trường staging/production. Bài này tập trung vào phần CI, cụ thể là cách kích hoạt Playwright chạy tự động. Về bản chất, một máy chủ CI như GitHub Actions sẽ: nhận sự kiện (push/Pull Request), khởi tạo một máy ảo 'sạch', cài đặt dự án từ đầu, chạy test, rồi báo kết quả — tất cả không cần con người can thiệp.",
        "CI/CD has two parts: Continuous Integration (CI) — automatically building and running tests whenever code changes; and Continuous Delivery/Deployment (CD) — automatically shipping tested code to staging/production. This article focuses on the CI part, specifically triggering Playwright to run automatically. Essentially, a CI server like GitHub Actions will: receive an event (push/Pull Request), spin up a 'clean' virtual machine, install the project from scratch, run tests, then report results — all without human intervention.",
        "CI/CDは2つの部分から成ります：Continuous Integration（CI）——コードが変わるたびに自動的にビルドしテストを実行すること、そしてContinuous Delivery/Deployment（CD）——検証済みのコードを自動的にステージング/本番環境に届けることです。本記事はCI部分、具体的にはPlaywrightを自動実行させる方法に焦点を当てます。本質的に、GitHub ActionsのようなCIサーバーは、イベント（push/Pull Request）を受け取り、『クリーンな』仮想マシンを立ち上げ、プロジェクトを最初からインストールし、テストを実行し、結果を報告します——すべて人の介入なしに。"),
      P("Nếu bạn muốn đi làm vị trí Automation Tester hoặc SDET, kỹ năng đọc hiểu và chỉnh sửa workflow CI/CD gần như là bắt buộc — vì hầu hết công ty hiện nay đều chạy test tự động trên pipeline, không còn chạy tay đơn thuần. Nội dung automation & CI/CD testing được dạy bài bản, có dự án thực chiến, trong khoá Software Testing chuyên nghiệp (Manual + Automation) của CyberSoft Academy: " + COURSE_URL,
        "If you want to work as an Automation Tester or SDET, the skill of reading and editing CI/CD workflows is almost mandatory — because most companies today run automated tests on a pipeline rather than manually. Automation & CI/CD testing content is taught properly with real-world projects in CyberSoft Academy's Professional Software Testing (Manual + Automation) course: " + COURSE_URL,
        "Automation TesterやSDETとして働きたいなら、CI/CDワークフローを読み解き編集するスキルはほぼ必須です——現在ほとんどの企業が手動ではなくパイプライン上で自動テストを実行しているからです。自動化とCI/CDテストの内容は、CyberSoft AcademyのProfessional Software Testing（手動＋自動）コースで、実際のプロジェクトとともに体系的に教えられています：" + COURSE_URL),
      TIP("Nếu công ty bạn chưa dùng CI, đừng đợi 'ai đó khác' setup — một workflow CI/CD cơ bản chỉ mất khoảng 30 phút để dựng, và giá trị nó mang lại (chặn bug trước khi vào main) là ngay lập tức.", "If your company doesn't use CI yet, don't wait for 'someone else' to set it up — a basic CI/CD workflow only takes about 30 minutes to build, and the value it brings (catching bugs before they hit main) is immediate.", "会社がまだCIを使っていないなら、『誰か他の人』が設定するのを待たないでください——基本的なCI/CDワークフローの構築はわずか30分ほどで済み、もたらす価値（mainに入る前にバグを止める）は即座に現れます。"),
    ] },
  { heading: { vi: "3. Cấu trúc workflow YAML cơ bản của GitHub Actions", en: "3. Basic YAML workflow structure in GitHub Actions", ja: "3. GitHub Actionsの基本的なYAMLワークフロー構成" },
    blocks: [
      P("Một workflow GitHub Actions là 1 file YAML nằm trong thư mục .github/workflows/ của repo. File này có 3 phần chính: 'name' (tên workflow, hiển thị trên GitHub), 'on' (khai báo sự kiện nào kích hoạt, ví dụ push hoặc pull_request), và 'jobs' (danh sách công việc cần làm, mỗi job chạy trên 1 máy ảo riêng, gồm nhiều 'steps' chạy tuần tự).",
        "A GitHub Actions workflow is a single YAML file inside the repo's .github/workflows/ folder. This file has 3 main parts: 'name' (the workflow's name, shown on GitHub), 'on' (declaring which events trigger it, e.g. push or pull_request), and 'jobs' (the list of work to do, each job running on its own virtual machine, made of several 'steps' run in sequence).",
        "GitHub Actionsのワークフローは、リポジトリの.github/workflows/フォルダ内にある1つのYAMLファイルです。このファイルには主に3つの部分があります：'name'（GitHub上に表示されるワークフロー名）、'on'（pushやpull_requestなど、どのイベントで起動するかの宣言）、そして'jobs'（実行すべき作業のリスト。各ジョブは独自の仮想マシンで動き、順番に実行される複数の'steps'から成る）。"),
      STEP(1, "Trong repo ShopEasy, tạo thư mục .github/workflows/ nếu chưa có, rồi tạo file tests.yml bên trong.", "In the ShopEasy repo, create the .github/workflows/ folder if it doesn't exist, then create a tests.yml file inside it.", "ShopEasyリポジトリに.github/workflows/フォルダがなければ作成し、その中にtests.ymlファイルを作る。"),
      STEP(2, "Khai báo 'name' cho workflow và 'on: push, pull_request' để chạy tự động trên cả hai sự kiện, giới hạn nhánh main.", "Declare a 'name' for the workflow and 'on: push, pull_request' to run automatically on both events, scoped to the main branch.", "ワークフローの'name'を宣言し、'on: push, pull_request'でmainブランチを対象に両イベントで自動実行されるようにする。"),
      STEP(3, "Khai báo job 'test' chạy trên 'ubuntu-latest', đây là máy ảo Linux sạch do GitHub cấp phát mỗi lần chạy.", "Declare a 'test' job running on 'ubuntu-latest', a clean Linux virtual machine GitHub provisions on every run.", "'ubuntu-latest'で動く'test'ジョブを宣言する。これはGitHubが実行のたびに用意するクリーンなLinux仮想マシンである。"),
      CODE("yaml", "# .github/workflows/tests.yml\nname: Run Playwright Tests\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 20\n\n      - name: Cai dat dependencies\n        run: npm ci\n\n      - name: Cai dat trinh duyet Playwright\n        run: npx playwright install --with-deps\n\n      - name: Chay Playwright tests\n        run: npx playwright test"),
      TIP("Nếu vừa mới bắt đầu học GitHub Actions và muốn có người hướng dẫn kèm 1-1 theo tốc độ của riêng bạn, CyberSoft Academy có hình thức đào tạo 1 kèm 1: " + COURSE_1V1_URL, "If you're just starting with GitHub Actions and want 1-on-1 guidance at your own pace, CyberSoft Academy offers 1-on-1 training: " + COURSE_1V1_URL, "GitHub Actionsを学び始めたばかりで、自分のペースで1対1の指導を受けたいなら、CyberSoft Academyは1対1トレーニングを提供しています：" + COURSE_1V1_URL),
    ] },
  { heading: { vi: "4. Thực hành: chạy Playwright headless trên CI", en: "4. Hands-on: running Playwright headless on CI", ja: "4. 実習：CIでPlaywrightをヘッドレス実行する" },
    blocks: [
      P("Workflow ở chương trước đã đủ để chạy Playwright trên CI, nhưng có một điểm quan trọng cần hiểu: trên CI, Playwright luôn chạy 'headless' — nghĩa là trình duyệt chạy ngầm, không hiện cửa sổ, vì máy ảo CI không có màn hình. Đây là mặc định của Playwright khi chạy bằng lệnh 'npx playwright test', nên bạn KHÔNG cần cấu hình gì thêm để tắt giao diện trình duyệt.",
        "The workflow from the previous chapter is already enough to run Playwright on CI, but there's one important point to understand: on CI, Playwright always runs 'headless' — meaning the browser runs in the background with no visible window, since the CI virtual machine has no display. This is Playwright's default when run via 'npx playwright test', so you DON'T need any extra configuration to disable the browser UI.",
        "前章のワークフローはすでにCIでPlaywrightを実行するのに十分ですが、理解すべき重要な点が1つあります：CI上では、Playwrightは常に『ヘッドレス』で実行されます——つまりブラウザはウィンドウを表示せずバックグラウンドで動きます。CI仮想マシンにディスプレイがないためです。これは'npx playwright test'で実行する際のPlaywrightのデフォルトなので、ブラウザUIを無効にするための追加設定は不要です。"),
      STEP(1, "Đảm bảo playwright.config.js của ShopEasy có baseURL trỏ đúng môi trường sẽ test trên CI (staging hoặc bản build tạm).", "Make sure ShopEasy's playwright.config.js has a baseURL pointing to the correct environment to test on CI (staging or a temporary build).", "ShopEasyのplaywright.config.jsのbaseURLが、CIでテストする正しい環境（ステージングまたは一時ビルド）を指しているか確認する。"),
      STEP(2, "Đẩy nhánh có workflow tests.yml lên GitHub, mở tab 'Actions' của repo để xem workflow tự chạy.", "Push the branch containing tests.yml to GitHub, then open the repo's 'Actions' tab to watch the workflow run automatically.", "tests.ymlを含むブランチをGitHubにpushし、リポジトリの'Actions'タブを開いてワークフローが自動実行されるのを確認する。"),
      STEP(3, "Nếu job fail ở bước 'Chay Playwright tests', bấm mở log của đúng bước đó để xem lỗi chi tiết, giống hệt cách đọc log khi chạy local.", "If the job fails at the 'Chay Playwright tests' step, click to expand that step's log to see the detailed error, just like reading logs when running locally.", "ジョブが'Chay Playwright tests'ステップで失敗したら、そのステップのログを開いて詳細なエラーを確認する。ローカル実行時のログの読み方と同じである。"),
      CODE("bash", "# Cac lenh Playwright thuong dung khi lam viec voi CI\n\n# Chay toan bo test suite (giong het lenh CI se goi)\nnpx playwright test\n\n# Chay 1 file test cu the de kiem tra nhanh truoc khi push\nnpx playwright test tests/login.spec.js\n\n# Mo report HTML sau khi chay xong (tren may local)\nnpx playwright show-report\n\n# Kiem tra trinh duyet da cai du chua (huu ich khi debug loi tren CI)\nnpx playwright install --dry-run"),
      TRY("Thử cố tình xoá bước 'Cai dat trinh duyet Playwright' khỏi workflow rồi push lên nhánh thử nghiệm, quan sát lỗi CI báo ra để hiểu rõ vì sao bước này bắt buộc.", "Try intentionally removing the 'Cai dat trinh duyet Playwright' step from the workflow and pushing to a test branch, then observe the error CI reports to understand why this step is mandatory.", "試しにワークフローから'Cai dat trinh duyet Playwright'ステップをわざと削除してテストブランチにpushし、CIが報告するエラーを観察して、このステップがなぜ必須なのか理解しよう。"),
    ] },
  { heading: { vi: "5. Thực hành: lưu report & trace làm artifact", en: "5. Hands-on: saving the report & trace as artifacts", ja: "5. 実習：レポートとトレースをアーティファクトとして保存する" },
    blocks: [
      P("Khi test fail trên CI, bạn không thể mở trình duyệt debug trực tiếp như trên máy local — máy ảo CI đã bị huỷ ngay khi job kết thúc. Giải pháp là 'artifact': GitHub Actions cho phép lưu lại các tệp (report HTML, trace, ảnh chụp màn hình lúc fail) làm bản đính kèm của lần chạy, tải về xem lại bất cứ lúc nào, kể cả nhiều ngày sau.",
        "When a test fails on CI, you can't open a browser to debug directly like on your local machine — the CI virtual machine is destroyed right after the job ends. The solution is 'artifacts': GitHub Actions lets you save files (HTML report, trace, screenshots at failure) as attachments to that run, downloadable and viewable anytime, even days later.",
        "CIでテストが失敗したとき、ローカルマシンのように直接ブラウザを開いてデバッグすることはできません——CI仮想マシンはジョブ終了直後に破棄されるからです。解決策は『アーティファクト』です：GitHub Actionsでは、ファイル（HTMLレポート、トレース、失敗時のスクリーンショット）をそのランの添付ファイルとして保存でき、何日後でもいつでもダウンロードして確認できます。"),
      STEP(1, "Thêm bước 'Luu bao cao HTML' dùng action 'actions/upload-artifact@v4', đặt 'if: always()' để luôn lưu dù test pass hay fail.", "Add a 'Luu bao cao HTML' step using the 'actions/upload-artifact@v4' action, set 'if: always()' so it always saves whether tests pass or fail.", "'actions/upload-artifact@v4'アクションを使う'Luu bao cao HTML'ステップを追加し、テストの成否にかかわらず常に保存されるよう'if: always()'を設定する。"),
      STEP(2, "Thêm bước riêng lưu thư mục 'test-results/' (chứa trace, screenshot) với điều kiện 'if: failure()' — chỉ lưu khi có test fail, tránh tốn dung lượng vô ích.", "Add a separate step saving the 'test-results/' folder (containing trace, screenshots) with 'if: failure()' — only saved when a test fails, avoiding wasted storage.", "'test-results/'フォルダ（トレース、スクリーンショットを含む）を保存する別ステップを、'if: failure()'条件で追加する——テストが失敗したときだけ保存し、無駄な容量を避ける。"),
      CODE("yaml", "      # Them tiep vao cuoi file .github/workflows/tests.yml\n      - name: Luu bao cao HTML (artifact)\n        if: always()\n        uses: actions/upload-artifact@v4\n        with:\n          name: playwright-report\n          path: playwright-report/\n          retention-days: 14\n\n      - name: Luu trace khi test fail\n        if: failure()\n        uses: actions/upload-artifact@v4\n        with:\n          name: test-results-trace\n          path: test-results/\n          retention-days: 14"),
      P("Sau khi có artifact, mọi thành viên team đều có thể vào tab 'Actions' của run đó, tải 'playwright-report' về, mở lên xem như report chạy local — bao gồm cả trace viewer để tua lại từng bước test đã thực hiện trên trình duyệt CI, y hệt như đang xem lại video.",
        "Once artifacts exist, any team member can go to that run's 'Actions' tab, download 'playwright-report', and open it just like a locally-run report — including the trace viewer to replay every step the test performed in the CI browser, just like watching a recording.",
        "アーティファクトができれば、チームの誰もがそのランの'Actions'タブに行き、'playwright-report'をダウンロードして、ローカル実行のレポートと同じように開けます——CIブラウザ上でテストが実行した各ステップを、まるで録画を見るように再生できるトレースビューアも含みます。"),
    ] },
  { heading: { vi: "6. Badge pass/fail & tự động chạy khi push/PR", en: "6. Pass/fail badge & running automatically on push/PR", ja: "6. 成功/失敗バッジとpush/PRでの自動実行" },
    blocks: [
      P("Badge pass/fail là một hình ảnh nhỏ (thường đặt ở đầu file README.md) hiển thị trạng thái của lần chạy CI gần nhất trên một nhánh — xanh 'passing' nếu tất cả job thành công, đỏ 'failing' nếu có job lỗi. GitHub Actions tự sinh badge này cho mỗi workflow, bạn chỉ cần copy đoạn Markdown từ tab 'Actions' > chọn workflow > nút '...' > 'Create status badge'.",
        "A pass/fail badge is a small image (usually placed at the top of README.md) showing the status of the latest CI run on a branch — green 'passing' if all jobs succeed, red 'failing' if any job errors. GitHub Actions auto-generates this badge for every workflow; you just copy the Markdown snippet from the 'Actions' tab > select the workflow > '...' button > 'Create status badge'.",
        "成功/失敗バッジとは、ブランチ上の最新のCI実行のステータスを示す小さな画像（通常README.mdの先頭に配置）です——すべてのジョブが成功すれば緑の『passing』、いずれかのジョブがエラーなら赤の『failing』です。GitHub Actionsはすべてのワークフローに対してこのバッジを自動生成します。'Actions'タブ > ワークフローを選択 > '...'ボタン > 'Create status badge'からMarkdownスニペットをコピーするだけです。"),
      IMG(m_ghrun, "Màn hình chạy GitHub Actions của ShopEasy: từng bước có dấu tick xanh, badge 'passing' ở góc", "ShopEasy's GitHub Actions run screen: each step has a green checkmark, a 'passing' badge in the corner", "ShopEasyのGitHub Actions実行画面：各ステップに緑のチェックマーク、隅に'passing'バッジ"),
      P("Badge có giá trị thực tế: đội trưởng hoặc reviewer chỉ cần nhìn badge trên Pull Request là biết ngay code có 'an toàn để xem xét' hay chưa, không cần tự chạy test để kiểm tra. Nhiều team còn đi xa hơn: bật 'branch protection rule' trên GitHub, bắt buộc job CI phải pass thì nút 'Merge' mới được kích hoạt — biến CI từ 'gợi ý nên xem' thành 'điều kiện bắt buộc' trước khi code vào main.",
        "The badge has real practical value: a team lead or reviewer only needs to glance at the badge on a Pull Request to know instantly whether the code is 'safe to review', without running tests themselves. Many teams go further: enabling a 'branch protection rule' on GitHub that requires the CI job to pass before the 'Merge' button activates at all — turning CI from 'a suggestion to check' into 'a mandatory gate' before code enters main.",
        "バッジには実用的な価値があります：チームリーダーやレビュアーはPull Requestのバッジを一目見るだけで、自分でテストを実行しなくてもコードが『レビューしても安全』かどうかすぐに分かります。多くのチームはさらに進んで、GitHubの『branch protection rule』を有効にし、CIジョブがパスしなければ『Merge』ボタンが有効化されないようにします——CIを『確認すべき提案』から、コードがmainに入る前の『必須の関門』に変えます。"),
      TIP("Đặt tên job và step rõ ràng (như 'Chay Playwright tests' thay vì 'step1') — khi CI fail, tên rõ ràng giúp cả team hiểu ngay bước nào lỗi mà không cần mở log.", "Give jobs and steps clear names (like 'Chay Playwright tests' instead of 'step1') — when CI fails, clear names let the whole team instantly understand which step broke without opening the logs.", "ジョブとステップには分かりやすい名前を付けよう（'step1'ではなく'Chay Playwright tests'のように）——CIが失敗したとき、分かりやすい名前があればログを開かなくてもチーム全員がどのステップで壊れたかすぐ理解できます。"),
    ] },
  { heading: { vi: "8. Chạy song song (sharding) để rút ngắn thời gian CI", en: "8. Running in parallel (sharding) to shorten CI time", ja: "8. CI時間を短縮するための並列実行（シャーディング）" },
    blocks: [
      P("Khi bộ test ShopEasy tăng lên vài trăm test, chạy tuần tự trên 1 job CI có thể mất 20-30 phút — quá lâu để chờ mỗi lần Pull Request. Giải pháp là 'sharding': chia bộ test thành nhiều phần bằng nhau (ví dụ 4 phần), mỗi phần chạy trên 1 job riêng, tất cả job chạy CÙNG LÚC nhờ 'strategy.matrix' của GitHub Actions. Tổng thời gian chờ giảm gần 4 lần so với chạy tuần tự.",
        "As ShopEasy's test suite grows to a few hundred tests, running sequentially on a single CI job could take 20-30 minutes — too long to wait for on every Pull Request. The solution is 'sharding': splitting the test suite into equal parts (e.g. 4 parts), each running on its own job, with all jobs running AT THE SAME TIME thanks to GitHub Actions' 'strategy.matrix'. Total wait time drops nearly 4x compared to running sequentially.",
        "ShopEasyのテストスイートが数百個に増えると、1つのCIジョブで順番に実行すると20〜30分かかることがあります——Pull Requestのたびに待つには長すぎます。解決策は『シャーディング』です：テストスイートを均等な部分（例えば4つ）に分割し、それぞれが独自のジョブで実行され、GitHub Actionsの'strategy.matrix'のおかげで全ジョブが同時に実行されます。合計待ち時間は順次実行と比べてほぼ4分の1に減ります。"),
      CODE("yaml", "# Vi du strategy.matrix chia bo test thanh 4 phan chay song song\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix:\n        shard: [1, 2, 3, 4]\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - name: Chay test theo shard ${{ matrix.shard }}/4\n        run: npx playwright test --shard=${{ matrix.shard }}/4"),
      P("Chú ý 'fail-fast: false' — nếu để mặc định (true), GitHub Actions sẽ huỷ mọi shard còn lại ngay khi 1 shard fail, khiến bạn chỉ thấy 1 phần lỗi và phải chạy lại nhiều lần mới thấy hết. Tắt fail-fast giúp cả 4 shard chạy tới cùng, để bạn thấy TOÀN BỘ lỗi trong một lần CI, tiết kiệm thời gian debug.",
        "Note 'fail-fast: false' — if left at default (true), GitHub Actions would cancel all remaining shards as soon as one fails, so you'd only see part of the failures and have to rerun multiple times to see everything. Turning off fail-fast lets all 4 shards run to completion, so you see ALL failures in one CI run, saving debugging time.",
        "'fail-fast: false'に注目してください——デフォルト（true）のままだと、GitHub Actionsは1つのシャードが失敗した時点で残りのシャードをすべてキャンセルしてしまい、失敗の一部しか見えず、すべてを見るには何度も再実行が必要になります。fail-fastをオフにすると4つのシャード全てが最後まで実行され、1回のCIですべての失敗を確認でき、デバッグ時間を節約できます。"),
      DEF("Sharding", "kỹ thuật chia một bộ test lớn thành nhiều phần nhỏ chạy song song trên nhiều máy ảo, để rút ngắn tổng thời gian chờ kết quả CI.",
        "the technique of splitting a large test suite into smaller parts run in parallel across multiple virtual machines, to shorten the total time waiting for CI results.",
        "大きなテストスイートを複数の小さな部分に分割し、複数の仮想マシンで並列実行することで、CI結果を待つ合計時間を短縮する技術。"),
    ] },
  { heading: { vi: "9. Tình huống 1: quên chạy test trước merge, bug lọt production", en: "9. Situation 1: forgetting to run tests before merge, a bug reaches production", ja: "9. シーン1：マージ前のテスト実行忘れ、本番にバグが漏れる" },
    blocks: [
      SITUATION("Repo ShopEasy chưa bật branch protection và chưa có workflow CI. Một dev sửa lỗi giảm giá trên nhánh 'fix-giam-gia', tự tin merge thẳng vào main vì 'chỉ sửa vài dòng', không chạy lại bộ test giỏ hàng.", "ShopEasy's repo hasn't enabled branch protection and has no CI workflow yet. A dev fixes a discount bug on the 'fix-giam-gia' branch, confidently merges straight into main because 'it's only a few lines', without rerunning the cart test suite.",
        "Vài giờ sau khi lên production, khách hàng phản ánh giỏ hàng tính sai tổng tiền khi áp mã giảm giá — hoá ra thay đổi vô tình phá vỡ logic tính tổng đã có sẵn. Đội phải rollback gấp, đồng thời viết báo cáo sự cố, mất gần nửa ngày xử lý cho một lỗi mà một bộ test có sẵn lẽ ra đã bắt được trong vài phút.",
        "Several hours after going to production, customers report the cart calculating the wrong total when applying a discount code — turns out the change accidentally broke the existing total-calculation logic. The team must rush a rollback and write an incident report, spending nearly half a day handling a bug that an existing test suite should have caught in minutes.",
        "ShopEasyのリポジトリはbranch protectionを有効にしておらず、CIワークフローもまだない。ある開発者が'fix-giam-gia'ブランチで割引のバグを修正し、『数行だけの修正だから』と自信を持ってmainに直接マージし、カートのテストスイートを再実行しなかった。",
        "本番稼働から数時間後、顧客から割引コードを適用するとカートの合計金額が間違って計算されるという報告が入る——実は変更が既存の合計計算ロジックを誤って壊していた。チームは急遽ロールバックし、インシデントレポートを書く必要に迫られ、既存のテストスイートなら数分で捕まえられたはずのバグの対応にほぼ半日を費やす。"),
      SOLVE("Tạo workflow tests.yml chạy trên mọi push/Pull Request, sau đó bật 'branch protection rule' trên GitHub yêu cầu job 'test' phải pass mới cho phép merge vào main. Từ nay, nút 'Merge' bị khoá cho tới khi CI chạy xong và báo xanh — không còn phụ thuộc vào việc dev có nhớ tự chạy test hay không.", "Create a tests.yml workflow that runs on every push/Pull Request, then enable a GitHub 'branch protection rule' requiring the 'test' job to pass before allowing a merge into main. From now on, the 'Merge' button stays locked until CI finishes and reports green — no longer depending on whether a dev remembers to run tests themselves.", "すべてのpush/Pull Requestで実行されるtests.ymlワークフローを作成し、GitHubの'branch protection rule'を有効にして、mainへのマージ前に'test'ジョブのパスを必須にする。これ以降、'Merge'ボタンはCIが完了して緑になるまでロックされたままになり、開発者が自分でテストを実行したことを覚えているかどうかに依存しなくなる。"),
      P("Bài học: một bộ test tốt nhưng không được BẮT BUỘC chạy thì gần như vô nghĩa trong việc ngăn bug lọt production. CI kết hợp với branch protection biến việc 'kiểm tra trước khi merge' từ một lựa chọn cá nhân thành một quy tắc hệ thống — không ai, kể cả người vội nhất, có thể bỏ qua.",
        "Lesson: a great test suite that isn't ENFORCED to run is nearly meaningless for preventing bugs from reaching production. CI combined with branch protection turns 'checking before merge' from a personal choice into a system rule — nobody, not even the person in the biggest rush, can skip it.",
        "教訓：優れたテストスイートも、実行が強制されていなければ、本番へのバグ流出を防ぐ上でほぼ無意味です。CIとbranch protectionを組み合わせることで、『マージ前の検証』は個人の選択からシステムのルールに変わります——どんなに急いでいる人でも省略できません。"),
      IMG(m_jira, "Ticket sự cố production ghi lại lỗi bug lọt vì merge chưa qua CI kiểm tra", "A production incident ticket recording the bug that slipped through because merging happened without CI verification", "CIによる検証を経ずにマージされたためバグが漏れたことを記録した本番インシデントチケット"),
      RECAP(["Không bắt buộc chạy test = test tồn tại nhưng không bảo vệ được ai", "CI + branch protection biến kiểm tra trước merge thành quy tắc hệ thống, không phụ thuộc cá nhân"],
        ["Not enforcing test runs = tests exist but protect no one", "CI + branch protection turns pre-merge checks into a system rule, independent of any individual"],
        ["テスト実行を強制しない＝テストは存在しても誰も守れない", "CI + branch protectionはマージ前検証を個人に依存しないシステムルールに変える"]),
    ] },
  { heading: { vi: "10. Tình huống 2: test pass local nhưng CI fail vì thiếu trình duyệt", en: "10. Situation 2: tests pass locally but CI fails from a missing browser", ja: "10. シーン2：ローカルでは通るがブラウザ不足でCIが失敗する" },
    blocks: [
      SITUATION("Một dev mới viết xong workflow tests.yml đầu tiên cho ShopEasy, chỉ chép nhanh phần cài dependencies ('npm ci') từ dự án khác, quên thêm bước cài trình duyệt Playwright, rồi push lên và tự tin vì 'trên máy tôi chạy pass mà'.", "A dev finishes writing ShopEasy's first tests.yml workflow, quickly copying the dependency install part ('npm ci') from another project, forgetting to add the Playwright browser install step, then pushes it up confidently because 'it passes on my machine'.",
        "CI báo lỗi ngay ở bước chạy test: 'browserType.launch: Executable doesn't exist'. Dev bối rối vì test hoàn toàn pass khi chạy local, không hiểu vì sao trên CI lại lỗi, mất gần 1 giờ tìm kiếm mới nhận ra máy cá nhân đã cài trình duyệt Playwright từ trước (qua lần chạy 'npx playwright install' cũ), còn máy ảo CI là môi trường hoàn toàn mới, chưa từng cài gì.",
        "CI immediately fails at the test-running step: 'browserType.launch: Executable doesn't exist'. The dev is confused because tests pass completely when run locally, unsure why it fails on CI, spending nearly an hour searching before realizing their personal machine already had Playwright's browsers installed (from an earlier 'npx playwright install' run), while the CI virtual machine is a brand-new environment that's never installed anything.",
        "ある開発者がShopEasy初のtests.ymlワークフローを書き終え、依存関係インストール部分（'npm ci'）を他のプロジェクトから急いでコピーし、Playwrightのブラウザインストールステップを追加し忘れたまま、『自分のマシンでは通るから』と自信を持ってpushする。",
        "CIはテスト実行ステップで即座に失敗する：『browserType.launch: Executable doesn't exist』。開発者はローカルで完全にテストが通るため混乱し、なぜCIで失敗するのか理解できず、ほぼ1時間探した末に、個人マシンには（以前の'npx playwright install'実行で）すでにPlaywrightのブラウザがインストールされていた一方、CI仮想マシンは何もインストールされたことのない完全に新しい環境だと気づく。"),
      SOLVE("Thêm bước 'npx playwright install --with-deps' vào workflow, ngay sau bước 'npm ci' và trước bước chạy test. Bước này cài cả trình duyệt lẫn thư viện hệ thống Linux mà Playwright cần, đảm bảo môi trường CI 'sạch' vẫn chạy được headless bình thường.", "Add the 'npx playwright install --with-deps' step to the workflow, right after 'npm ci' and before the test-running step. This step installs both the browsers and the Linux system libraries Playwright needs, ensuring the 'clean' CI environment can still run headless normally.", "'npm ci'の直後、テスト実行ステップの前に'npx playwright install --with-deps'ステップをワークフローに追加する。このステップはPlaywrightが必要とするブラウザとLinuxシステムライブラリの両方をインストールし、『クリーンな』CI環境でも通常通りヘッドレス実行できるようにする。"),
      P("Bài học: máy cá nhân của bạn thường 'giàu' hơn máy CI vì đã tích luỹ sẵn nhiều thứ qua thời gian sử dụng — trình duyệt, cache, biến môi trường. Khi viết workflow CI, đừng giả định môi trường CI có bất cứ thứ gì bạn không TỰ TAY khai báo trong file YAML; hãy coi mỗi lần chạy CI như mở một máy tính hoàn toàn mới, chưa cài gì cả.",
        "Lesson: your personal machine is usually 'richer' than a CI machine because it's accumulated things over time — browsers, cache, environment variables. When writing a CI workflow, don't assume the CI environment has anything you haven't explicitly declared in the YAML file; treat every CI run as opening a brand-new computer with nothing installed at all.",
        "教訓：個人のマシンは通常、使用期間中にブラウザ、キャッシュ、環境変数など多くのものが蓄積されているため、CIマシンより『豊か』です。CIワークフローを書くときは、YAMLファイルで自分が明示的に宣言していないものがCI環境にあると仮定しないでください——CIの実行のたびに、何もインストールされていない真新しいコンピュータを開くと考えましょう。"),
      TRY("Mở lại workflow tests.yml đã viết ở chương 4, xem thử nếu xoá dòng '--with-deps' (chỉ để 'npx playwright install') thì trên Ubuntu CI có thể thiếu thư viện hệ thống nào — tra cứu tài liệu Playwright để đối chiếu.", "Reopen the tests.yml workflow written in chapter 4, and check what would happen if you removed '--with-deps' (leaving just 'npx playwright install') — which system libraries might be missing on Ubuntu CI; check Playwright's docs to compare.", "第4章で書いたtests.ymlワークフローを開き直し、'--with-deps'を削除した場合（'npx playwright install'だけにした場合）にUbuntu CIでどのシステムライブラリが不足しうるか確認してみよう——Playwrightのドキュメントで照合する。"),
    ] },
  { heading: { vi: "11. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "11. Common mistakes, tips & FAQ", ja: "11. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Hardcode secret (mật khẩu, token API) trực tiếp trong file workflow YAML thay vì dùng GitHub Secrets. Điều này lộ thông tin nhạy cảm cho bất kỳ ai xem được repo, kể cả repo private nếu sau này chuyển public.", "Hardcoding secrets (passwords, API tokens) directly in the workflow YAML file instead of using GitHub Secrets. This exposes sensitive information to anyone who can view the repo, even a private repo if it's later made public.", "GitHub Secretsを使わず、パスワードやAPIトークンなどのシークレットをワークフローYAMLファイルに直接ハードコードすること。これは、後で公開に変更された場合を含め、リポジトリを見られる誰にでも機密情報を露出させます。"),
      PITFALL("Chạy toàn bộ bộ test trên CI mỗi lần chỉ sửa 1 dòng CSS, khiến team phải chờ 20-30 phút cho những thay đổi không ảnh hưởng logic. Nên cân nhắc smoke test ngắn cho các thay đổi nhỏ, để dành bộ test đầy đủ cho Pull Request quan trọng.", "Running the entire test suite on CI every time even for a single CSS line change, forcing the team to wait 20-30 minutes for changes that don't affect logic. Consider a short smoke test for small changes, reserving the full suite for significant Pull Requests.", "1行のCSS変更だけでも毎回CIで全テストスイートを実行し、ロジックに影響しない変更のためにチームが20〜30分待たされること。小さな変更には短いスモークテストを検討し、重要なPull Requestのために完全なスイートを取っておくとよい。"),
      TIP("Đặt tên workflow, job và step nhất quán và dễ hiểu ngay từ đầu — khi dự án có nhiều workflow (test, deploy, lint...), tên rõ ràng giúp bạn tìm đúng chỗ cần sửa trong vài giây thay vì dò từng file.", "Name workflows, jobs, and steps consistently and clearly from the start — once a project has multiple workflows (test, deploy, lint...), clear names help you find the right place to fix in seconds instead of hunting through every file.", "最初からワークフロー、ジョブ、ステップに一貫した分かりやすい名前を付けよう——プロジェクトに複数のワークフロー（test、deploy、lintなど）ができると、分かりやすい名前があれば全ファイルを探し回らず数秒で直すべき場所を見つけられます。"),
      faq1.block, faq2.block, faq3.block,
      IMG(m_kanban, "Bảng theo dõi vòng đời Pull Request qua các trạng thái CI: mở PR, đang chạy, fail, sẵn sàng merge", "A board tracking a Pull Request's lifecycle through CI states: opened, running, failed, ready to merge", "Pull Requestのライフサイクルを、開いた・実行中・失敗・マージ準備完了というCIの状態で追跡するボード"),
      IMG(m_dashboard, "Dashboard số liệu CI của ShopEasy trong 7 ngày: tỉ lệ pass, thời gian chạy trung bình, số lần chặn merge", "ShopEasy's 7-day CI metrics dashboard: pass rate, average run time, number of blocked merges", "ShopEasyの7日間のCI指標ダッシュボード：パス率、平均実行時間、マージがブロックされた回数"),
      INTERNAL("Chạy test và đọc báo cáo cho người mới", "Running tests and reading reports for beginners", "chay-test-va-doc-bao-cao-cho-nguoi-moi", "初心者のためのテスト実行とレポートの読み方"),
      INTERNAL("Gỡ lỗi (debug) test tự động cho người mới", "Debugging automated tests for beginners", "go-loi-debug-test-tu-dong-cho-nguoi-moi", "初心者のための自動テストのデバッグ"),
      INTERNAL("Kiểm thử hồi quy & smoke test cho người mới", "Regression testing & smoke testing for beginners", "kiem-thu-hoi-quy-smoke-test-cho-nguoi-moi", "初心者のための回帰テストとスモークテスト"),
    ] },
  QUIZ(quiz, { no: 12 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách chạy test tự động trên CI/CD qua pipeline thật của ShopEasy: vì sao chỉ chạy tay/local không đủ an toàn, cấu trúc workflow YAML cơ bản, cách chạy Playwright headless trên CI, lưu report/trace làm artifact, badge pass/fail kết hợp branch protection, và chạy song song (sharding) để rút ngắn thời gian chờ. Hai tình huống thật cho thấy cái giá của việc quên chạy test trước merge (bug lọt production) và của việc quên cài trình duyệt trên CI (test pass local nhưng CI fail). CyberSoft Academy dạy automation & CI/CD testing bài bản từ zero tới đi làm, giúp bạn thành thạo kỹ năng nền tảng mà hầu hết vị trí Automation Tester/SDET hiện nay đều yêu cầu.",
        "You just learned how to run automated tests on CI/CD through ShopEasy's real pipeline: why running manually/locally alone isn't safe enough, the basic YAML workflow structure, how to run Playwright headless on CI, saving reports/traces as artifacts, pass/fail badges combined with branch protection, and running in parallel (sharding) to shorten wait time. Two real situations showed the cost of forgetting to run tests before merging (a bug reaching production) and of forgetting to install browsers on CI (tests passing locally but failing on CI). CyberSoft Academy teaches automation & CI/CD testing properly from zero to hired, helping you master a foundational skill that most Automation Tester/SDET roles require today.",
        "ShopEasyの実際のパイプラインを通じて、CI/CD上で自動テストを実行する方法を学びました：手動/ローカル実行だけでは十分に安全でない理由、基本的なYAMLワークフロー構成、CIでPlaywrightをヘッドレス実行する方法、レポート/トレースをアーティファクトとして保存する方法、branch protectionと組み合わせた成功/失敗バッジ、待ち時間短縮のための並列実行（シャーディング）。2つの実例は、マージ前のテスト実行忘れ（本番にバグが漏れる）とCIでのブラウザインストール忘れ（ローカルでは通るがCIで失敗する）のコストを示しました。CyberSoft Academyはゼロから就職までの自動化とCI/CDテストを体系的に教え、今日ほとんどのAutomation Tester/SDETポジションが求める土台スキルの習得を助けます。"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về cách đọc và debug report/trace khi CI fail, cùng cách tổ chức smoke test riêng cho những thay đổi nhỏ, để pipeline vừa an toàn vừa không làm chậm tốc độ ra release. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation + CI/CD thực chiến, khoá Software Testing chuyên nghiệp tại CyberSoft Academy sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester: " + COURSE_URL,
        "Next, you should look into reading and debugging reports/traces when CI fails, along with organizing separate smoke tests for small changes, so the pipeline stays safe without slowing down release speed. If you want to learn properly from zero to hired with a mentor and real automation + CI/CD projects, CyberSoft Academy's Professional Software Testing course helps you progress fast and apply confidently for an Automation Tester role: " + COURSE_URL,
        "次は、CIが失敗したときのレポート/トレースの読み方とデバッグ方法、そして小さな変更用の個別スモークテストの整理方法を学ぶとよいでしょう——パイプラインを安全に保ちながらリリース速度を落とさないためです。指導者と実際の自動化+CI/CDプロジェクトでゼロから就職まで体系的に学びたいなら、CyberSoft AcademyのProfessional Software Testingコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます：" + COURSE_URL),
      CTA(course),
    ] },
];

const CICD_01 = makeDoc({
  slug: "chay-test-tu-dong-tren-ci-cd-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "chạy test trên CI/CD",
  keywords: ["chạy test trên ci/cd", "github actions testing", "automation testing", "playwright ci", "kiểm thử tự động cho người mới"],
  coverLabel: "NGƯỜI MỚI · CI/CD TEST · TMĐT",
  crumb: "Chạy test tự động trên CI/CD cho người mới",
  metaTitle: { vi: "Chạy test trên CI/CD (GitHub Actions) cho người mới", en: "Running tests on CI/CD (GitHub Actions) for beginners", ja: "初心者向けCI/CD（GitHub Actions）でのテスト実行" },
  metaDescription: {
    vi: "Chạy test trên CI/CD cho người mới: viết workflow YAML GitHub Actions, chạy Playwright headless, lưu report/trace, badge pass/fail, chạy song song.",
    en: "Running tests on CI/CD for beginners: writing GitHub Actions YAML workflows, running Playwright headless, saving reports/traces, pass/fail badges, and parallel runs.",
    ja: "初心者向けCI/CDでのテスト実行：GitHub ActionsのYAMLワークフロー作成、Playwrightのヘッドレス実行、レポート/トレースの保存、成功/失敗バッジ、並列実行を解説。",
  },
  title: {
    vi: "Chạy test tự động trên CI/CD (GitHub Actions) cho người mới: từ workflow YAML tới report tự động",
    en: "Running automated tests on CI/CD (GitHub Actions) for beginners: from YAML workflow to automatic reports",
    ja: "初心者のためのCI/CD（GitHub Actions）での自動テスト実行：YAMLワークフローから自動レポートまで",
  },
  summary: {
    vi: "Bài cho người mới: học chạy test tự động trên CI/CD qua app TMĐT ShopEasy bằng GitHub Actions. Vì sao cần chạy test trên CI, cấu trúc workflow YAML cơ bản, chạy Playwright headless, lưu report/trace làm artifact, badge pass/fail, chạy song song (sharding), hai tình huống thật (quên chạy test trước merge gây bug lọt production, thiếu trình duyệt trên CI), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn to run automated tests on CI/CD through the ShopEasy e-commerce app using GitHub Actions. Why running tests on CI matters, basic YAML workflow structure, running Playwright headless, saving reports/traces as artifacts, pass/fail badges, parallel runs (sharding), two real situations (forgetting to run tests before merge causing a production bug, missing browsers on CI), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでGitHub Actionsを使いCI/CD上での自動テスト実行を学ぶ。CIでのテスト実行がなぜ重要か、基本的なYAMLワークフロー構成、Playwrightのヘッドレス実行、レポート/トレースのアーティファクト保存、成功/失敗バッジ、並列実行（シャーディング）、2つの実例（マージ前のテスト実行忘れによる本番バグ、CIでのブラウザ不足）、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách chạy test tự động trên CI/CD bằng GitHub Actions", steps: [
    { name: "Viết workflow YAML cơ bản", text: "Tạo .github/workflows/tests.yml khai báo trigger on push/pull_request và job chạy trên ubuntu-latest." },
    { name: "Cài trình duyệt & chạy Playwright headless", text: "Thêm bước npx playwright install --with-deps trước khi chạy npx playwright test." },
    { name: "Lưu report/trace & bảo vệ nhánh chính", text: "Upload report/trace làm artifact, bật branch protection yêu cầu CI pass trước khi merge." },
  ] },
  pages,
});

export const AU_CICD_01 = [CICD_01];
