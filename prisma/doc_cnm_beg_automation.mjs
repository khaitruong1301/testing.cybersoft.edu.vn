// doc_cnm_beg_automation.mjs — BÀI "DÀNH CHO NGƯỜI MỚI" (nhập môn):
// Automation testing cho người mới: là gì, khi nào cần, bắt đầu ra sao.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ.
// Gắn app SaaS "TaskFlow" (quản lý công việc). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO. Bắt chước 1:1 khuôn mẫu doc_manual_beginner_defect_lifecycle.mjs.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, stateDiagram, dashboard } from "./ui_mock.mjs";

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
    categorySlug: "automation-tools", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", "saas", "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình đăng nhập SaaS TaskFlow có lỗi (nút Đăng nhập không phản hồi) ──
const m_taskflow = browser("app.taskflow.vn/dang-nhap", [
  panel("TaskFlow · Đăng nhập", [
    field(24, 20, 330, "Email công việc", "mai.tran@congty.vn", "normal"),
    field(372, 20, 330, "Mật khẩu", "••••••••", "normal"),
    field(24, 92, 330, "Ghi nhớ đăng nhập 30 ngày", "Đã bật", "normal"),
    field(372, 92, 330, "Mã xác thực 2 lớp", "482 913", "error"),
    btn(24, 172, 200, "Đăng nhập", "primary"),
    btn(240, 172, 160, "Quên mật khẩu?", "ghost"),
    annotate(368, 78, 340, 52, "BUG: mã 2FA đúng vẫn báo sai"),
  ].join(""), { h: 260, accent: "#0369a1" }),
].join(""), { h: 316, title: "TaskFlow · SaaS", accent: "#0369a1" });

// ── Mockup 2: bảng so sánh Manual vs Automation ──
const m_compare = grid("Manual testing và Automation testing khác nhau ở đâu", ["Tiêu chí", "Manual (thủ công)", "Automation (tự động)"], [
  ["Ai/cái gì thực hiện", "Tester tự tay thao tác", "Script/công cụ thực hiện lại"],
  ["Phù hợp nhất với", "Case mới, khám phá, UX", "Case lặp lại nhiều lần (regression)"],
  ["Tốc độ khi chạy lại", "Chậm, tốn công mỗi lần", "Nhanh, chạy được hàng trăm case"],
  ["Chi phí ban đầu", "Thấp — chạy được ngay", "Cao hơn — cần viết & bảo trì script"],
  ["Phát hiện lỗi UX/giao diện tinh tế", "Tốt — con người quan sát trực tiếp", "Kém hơn — script chỉ kiểm điều đã định"],
], { accent: "#0369a1" });

// ── Mockup 3: sơ đồ quyết định "có nên tự động hoá case này không" ──
const m_decision = stateDiagram("Nên tự động hoá case này không?", [
  { id: "case", label: "CASE MỚI", x: 80, y: 70, kind: "start" },
  { id: "repeat", label: "LẶP LẠI NHIỀU?", x: 290, y: 70, kind: "mid" },
  { id: "stable", label: "GIAO DIỆN ỔN ĐỊNH?", x: 520, y: 70, kind: "mid" },
  { id: "manual", label: "GIỮ MANUAL", x: 290, y: 190, kind: "mid" },
  { id: "automate", label: "TỰ ĐỘNG HOÁ", x: 680, y: 70, kind: "ok" },
], [
  { from: "case", to: "repeat", label: "xét case" },
  { from: "repeat", to: "stable", label: "có, thường xuyên" },
  { from: "repeat", to: "manual", label: "chưa, hiếm khi", bad: true },
  { from: "stable", to: "automate", label: "có, ổn định" },
  { from: "stable", to: "manual", label: "chưa, hay đổi UI", bad: true },
], { accent: "#0369a1", h: 300 });

// ── Mockup 4: bảng công cụ automation phổ biến cho người mới ──
const m_tools = grid("Công cụ automation phổ biến cho người mới", ["Công cụ", "Dùng cho", "Độ khó cho người mới"], [
  ["Playwright", "Web hiện đại (nhanh, ổn định)", "Trung bình — dễ bắt đầu"],
  ["Cypress", "Web (SPA/React/Vue)", "Dễ — tài liệu thân thiện"],
  ["Selenium", "Web (đa trình duyệt, lâu đời nhất)", "Trung bình"],
  ["Appium", "Mobile (Android/iOS)", "Khó hơn — cần cấu hình thiết bị"],
  ["Postman/Newman", "Kiểm thử API", "Dễ — không cần biết code sâu"],
], { accent: "#0369a1", highlight: 0, note: "Người mới thường bắt đầu với Playwright hoặc Cypress cho web." });

// ── Mockup 5: bảng trước/sau khắc phục test tự động bị "flaky" (không ổn định) ──
const m_flakyfix = grid("Vì sao script tự động chạy lúc pass lúc fail (flaky)?", ["Nguyên nhân", "Cách khắc phục"], [
  ["Dùng lệnh 'chờ cứng' 3 giây cho mọi bước", "Chờ tường minh: đợi đúng phần tử xuất hiện/đổi trạng thái"],
  ["Test phụ thuộc dữ liệu của lần chạy trước", "Tạo dữ liệu test riêng và dọn dẹp sau mỗi lần chạy"],
  ["Chạy trên môi trường khác nhau cho kết quả khác", "Cố định phiên bản trình duyệt/thiết bị trong CI"],
  ["Nhiều test chạy song song ghi đè cùng 1 tài khoản", "Mỗi test dùng tài khoản/dữ liệu độc lập"],
], { accent: "#e11d48", highlight: 0 });

// ── Mockup 6: dashboard kết quả một lần chạy bộ automation ──
const m_dash = dashboard("Kết quả chạy bộ automation — TaskFlow · đêm qua", [
  { label: "Tổng case", value: "146", sub: "chạy tự động", color: "#0369a1" },
  { label: "Pass", value: "132", sub: "đạt", color: "#16a34a" },
  { label: "Fail", value: "9", sub: "cần dev xem lại", color: "#e11d48" },
  { label: "Flaky", value: "5", sub: "không ổn định", color: "#f59e0b" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Automation testing là gì?",
  "What is automation testing?",
  "Automation testing là việc dùng script và công cụ (như Playwright, Selenium, Cypress) để tự động thực hiện lại các bước kiểm thử mà lẽ ra tester phải làm bằng tay, rồi tự động so sánh kết quả thực tế với kết quả mong đợi. Nó không thay thế hoàn toàn manual testing mà thường được dùng cho các case lặp lại nhiều lần (regression), để tester rảnh tay tập trung vào case mới và khám phá.",
  "Automation testing is using scripts and tools (like Playwright, Selenium, Cypress) to automatically re-run test steps a tester would otherwise do by hand, then automatically compare actual vs expected results. It doesn't fully replace manual testing — it's usually used for cases that repeat often (regression), freeing testers to focus on new and exploratory cases.",
  "オートメーションテストとは？",
  "オートメーションテストとは、Playwright・Selenium・Cypressのようなツールとスクリプトを使い、テスターが手作業で行うテスト手順を自動で繰り返し実行し、実際の結果と期待結果を自動で比較することです。手動テストを完全に置き換えるものではなく、繰り返し頻度の高いケース（リグレッション）に使い、テスターは新規ケースや探索的テストに集中できます。");
const faq2 = FAQ(
  "Người mới có cần biết lập trình để học automation testing không?",
  "Do beginners need to know programming to learn automation testing?",
  "Cần biết một chút, nhưng không cần giỏi lập trình ngay từ đầu. Automation testing dùng code để viết script (ví dụ JavaScript với Playwright/Cypress, Java với Selenium), nên bạn cần nắm các khái niệm cơ bản: biến, hàm, điều kiện, vòng lặp. Nhiều người mới học song song: vững manual testing trước, rồi học lập trình cơ bản, rồi mới học công cụ automation — lộ trình này giúp không bị ngợp.",
  "You need a bit, but not to be an expert programmer from day one. Automation testing uses code to write scripts (e.g. JavaScript with Playwright/Cypress, Java with Selenium), so you should grasp basics: variables, functions, conditions, loops. Many beginners learn in order: solid manual testing first, then basic programming, then automation tools — this path avoids feeling overwhelmed.",
  "自動化テストを学ぶには初心者もプログラミングを知る必要がある？",
  "少し必要ですが、最初から得意である必要はありません。自動化テストはコードでスクリプトを書きます（例：Playwright/CypressならJavaScript、SeleniumならJava）ので、変数・関数・条件分岐・ループなどの基本を押さえましょう。多くの初心者はまず手動テストを固め、次に基礎的なプログラミング、その後に自動化ツールという順で学び、圧倒されずに進めます。");
const faq3 = FAQ(
  "Khi nào nên bắt đầu học automation testing?",
  "When should you start learning automation testing?",
  "Tốt nhất là sau khi bạn đã vững các kỹ năng manual testing cơ bản: viết test case, thiết kế test scenario, viết bug report rõ ràng. Automation chỉ 'khuếch đại' cách bạn kiểm thử — nếu chưa biết kiểm thử cái gì và tại sao, script tự động cũng sẽ tự động sai theo. Khi đã tự tin với manual, học automation sớm là một lợi thế lớn khi ứng tuyển.",
  "It's best after you're solid on basic manual testing skills: writing test cases, designing test scenarios, writing clear bug reports. Automation only 'amplifies' how you test — if you don't yet know what to test and why, automated scripts will automatically be wrong too. Once confident with manual, learning automation early is a big advantage when applying for jobs.",
  "自動化テストはいつ学び始めるべき？",
  "テストケース作成、テストシナリオ設計、明確なバグ報告といった基本的な手動テストのスキルを固めた後が最適です。自動化はテストの仕方を『増幅』するだけ — 何を、なぜテストすべきか分かっていなければ、自動化スクリプトも自動的に間違えます。手動に自信がついたら早めに自動化を学ぶことは、就職活動で大きな強みになります。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Automation testing khác manual testing chủ yếu ở điểm nào?", en: "How does automation testing mainly differ from manual testing?", ja: "オートメーションテストは手動テストと主にどこが違う？" },
    options: [
      { vi: "Automation dùng script/công cụ để tự động thực hiện lại các bước kiểm thử", en: "Automation uses scripts/tools to automatically re-run test steps", ja: "自動化はスクリプト/ツールでテスト手順を自動で繰り返す" },
      { vi: "Automation không cần biết yêu cầu của phần mềm", en: "Automation doesn't need to know software requirements", ja: "自動化はソフトウェア要件を知る必要がない" },
      { vi: "Automation chỉ dùng được cho app di động", en: "Automation only works for mobile apps", ja: "自動化はモバイルアプリにしか使えない" },
      { vi: "Automation thay thế hoàn toàn tester", en: "Automation completely replaces testers", ja: "自動化はテスターを完全に置き換える" },
    ], correct: 0,
    explain: { vi: "Automation dùng script để lặp lại thao tác và tự so sánh kết quả; nó bổ trợ chứ không thay thế hoàn toàn tester.", en: "Automation uses scripts to repeat actions and auto-compare results; it supports, not fully replaces, testers.", ja: "自動化はスクリプトで操作を繰り返し結果を自動比較する；テスターを補完するもので完全な置換ではない。" },
  }),
  mcq({
    q: { vi: "Trường hợp nào NÊN ưu tiên tự động hoá?", en: "Which case SHOULD be prioritized for automation?", ja: "どのケースを優先して自動化すべき？" },
    options: [
      { vi: "Case kiểm thử khám phá, chỉ chạy một lần duy nhất", en: "An exploratory case run only once", ja: "一度だけ実行する探索的ケース" },
      { vi: "Case regression lặp lại nhiều lần, giao diện đã ổn định", en: "A regression case that repeats often on a stable UI", ja: "安定したUIで何度も繰り返すリグレッションケース" },
      { vi: "Case giao diện đang thay đổi liên tục mỗi ngày", en: "A case whose UI changes constantly every day", ja: "UIが毎日頻繁に変わるケース" },
      { vi: "Case chỉ cần đánh giá cảm nhận thẩm mỹ", en: "A case that only needs subjective aesthetic judgment", ja: "美的な主観評価だけが必要なケース" },
    ], correct: 1,
    explain: { vi: "Automation phát huy giá trị nhất ở case lặp lại nhiều lần và giao diện đã ổn định — chi phí viết script được 'trả lại' qua nhiều lần chạy.", en: "Automation pays off most on frequently repeated cases with a stable UI — the scripting cost is repaid across many runs.", ja: "自動化は繰り返し頻度が高く安定したUIで最も価値を発揮 — スクリプト作成コストが多くの実行で回収される。" },
  }),
  mcq({
    q: { vi: "Công cụ nào phù hợp để người mới bắt đầu học automation cho web app hiện đại?", en: "Which tool suits a beginner starting automation for a modern web app?", ja: "現代的なWebアプリの自動化を始める初心者に適したツールは？" },
    options: [
      { vi: "Playwright", en: "Playwright", ja: "Playwright" },
      { vi: "Phần mềm vẽ tay (Photoshop)", en: "Drawing software (Photoshop)", ja: "描画ソフト（Photoshop）" },
      { vi: "Excel thuần", en: "Plain Excel", ja: "純粋なExcel" },
      { vi: "Trình phát nhạc", en: "A music player", ja: "音楽プレーヤー" },
    ], correct: 0,
    explain: { vi: "Playwright (cùng Cypress) là lựa chọn phổ biến, tài liệu thân thiện, phù hợp cho web hiện đại và người mới.", en: "Playwright (along with Cypress) is a popular, beginner-friendly choice with good docs for modern web apps.", ja: "Playwright（Cypressと共に）は文書が充実し、現代的なWebアプリと初心者に人気の選択肢。" },
  }),
  mcq({
    q: { vi: "Nguyên nhân phổ biến khiến một test tự động bị 'flaky' (lúc pass lúc fail)?", en: "A common cause of a 'flaky' automated test (sometimes pass, sometimes fail)?", ja: "自動テストが『flaky』（合格したり不合格になったり）になる一般的な原因は？" },
    options: [
      { vi: "Dùng lệnh chờ cứng cố định thay vì chờ tường minh theo trạng thái phần tử", en: "Using a fixed hard-coded wait instead of an explicit wait on element state", ja: "要素の状態に基づく明示的待機の代わりに固定の待機時間を使う" },
      { vi: "Viết test case bằng tiếng Việt có dấu", en: "Writing test cases in accented Vietnamese", ja: "アクセント付きベトナム語でテストケースを書く" },
      { vi: "Đặt tên file script quá ngắn", en: "Naming script files too short", ja: "スクリプトファイル名が短すぎる" },
      { vi: "Dùng quá nhiều màu trên báo cáo", en: "Using too many colors in the report", ja: "レポートの色数が多すぎる" },
    ], correct: 0,
    explain: { vi: "Chờ cứng (sleep cố định) không thích ứng với tốc độ tải trang thực tế, dễ gây flaky; chờ tường minh (đợi đúng trạng thái) ổn định hơn.", en: "A hard-coded sleep doesn't adapt to real page-load timing and often causes flakiness; explicit waits on actual state are more stable.", ja: "固定のsleepは実際の読み込み速度に対応できずflakyの原因になりやすい；実際の状態を待つ明示的待機の方が安定する。" },
  }),
  mcq({
    q: { vi: "Automation testing có thể thay thế HOÀN TOÀN manual testing không?", en: "Can automation testing FULLY replace manual testing?", ja: "自動化テストは手動テストを完全に置き換えられる？" },
    options: [
      { vi: "Có, nên tự động hoá 100% mọi case ngay từ đầu", en: "Yes, automate 100% of every case from day one", ja: "はい、最初から全ケースを100%自動化すべき" },
      { vi: "Không, automation bổ trợ manual — case khám phá/UX vẫn cần con người", en: "No, automation supports manual — exploratory/UX cases still need a human", ja: "いいえ、自動化は手動を補完 — 探索的/UXケースは依然として人間が必要" },
      { vi: "Không, automation chỉ dùng để trang trí báo cáo", en: "No, automation is only for decorating reports", ja: "いいえ、自動化はレポートの装飾用にすぎない" },
      { vi: "Có, vì máy tính luôn hiểu đúng ý người dùng", en: "Yes, because computers always understand user intent", ja: "はい、コンピューターは常にユーザーの意図を理解するから" },
    ], correct: 1,
    explain: { vi: "Automation mạnh ở việc lặp lại chính xác, nhưng không thay thế được quan sát, trực giác và tư duy khám phá của con người.", en: "Automation excels at exact repetition, but can't replace human observation, intuition and exploratory thinking.", ja: "自動化は正確な繰り返しに強いが、人間の観察力・直感・探索的思考は代替できない。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ gặp", en: "1. TL;DR & the screen you'll see", ja: "1. 要点と出会う画面" },
    blocks: [
      TLDR("Automation testing là dùng script/công cụ để tự động lặp lại các bước kiểm thử và tự so sánh kết quả — thường dùng cho case lặp lại nhiều lần (regression). Bài này bám app SaaS TaskFlow: bạn thấy vì sao một lỗi 2FA lặp lại mỗi lần đăng nhập rất đáng được tự động hoá, học công cụ phổ biến, và có lộ trình bắt đầu rõ ràng cho người mới. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Automation testing means using scripts/tools to automatically repeat test steps and compare results — usually for cases that repeat often (regression). This follows the TaskFlow SaaS app: you'll see why a 2FA bug that repeats on every login is worth automating, learn common tools, and get a clear beginner roadmap. Lots of visuals and a quiz at the end.",
        "オートメーションテストとは、スクリプト/ツールでテスト手順を自動で繰り返し結果を比較することです — 通常は繰り返し頻度の高いケース（リグレッション）に使います。本記事はSaaSアプリTaskFlowに沿い、毎回のログインで繰り返す2FAバグがなぜ自動化に値するかを見て、よく使われるツールを学び、初心者向けの明確なロードマップを得ます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Nếu bạn vừa quen với manual testing, chắc bạn đã từng lặp đi lặp lại việc đăng nhập, kiểm tra form, hay chạy lại một chuỗi thao tác giống hệt nhau mỗi khi có bản build mới. Đó chính là lúc automation testing xuất hiện: thay vì bạn tự tay làm lại 50 lần, một script sẽ làm hộ bạn trong vài phút. Bạn không cần trở thành lập trình viên ngay — chỉ cần hiểu đúng khái niệm, biết khi nào nên dùng, và bắt đầu từ những bước nhỏ. Chúng ta sẽ học qua một app SaaS quản lý công việc thật, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! If you're new to manual testing, you've probably repeated logging in, checking forms, or re-running the exact same sequence every time there's a new build. That's exactly where automation testing comes in: instead of doing it by hand 50 times, a script does it for you in minutes. You don't need to become a programmer right away — just understand the concept correctly, know when to use it, and start with small steps. We'll learn through a real SaaS task-management app, with visuals and hands-on practice.",
        "こんにちは、初心者さん！手動テストに慣れてきたなら、新しいビルドのたびにログイン確認やフォームチェックなど同じ操作を繰り返した経験があるはずです。まさにそこでオートメーションテストの出番です：50回手作業で行う代わりに、スクリプトが数分で代行します。すぐにプログラマーになる必要はありません — 概念を正しく理解し、いつ使うべきかを知り、小さな一歩から始めればよいのです。実際のSaaSタスク管理アプリで、図と実習を通じて学びます。"),
      IMG(m_taskflow, "Màn hình test: TaskFlow đăng nhập — mã 2FA đúng vẫn báo sai, lỗi này lặp lại mỗi ngày", "Screen under test: TaskFlow login — a correct 2FA code shows an error, repeating every day", "テスト対象画面：TaskFlowログイン — 正しい2FAコードがエラー表示、毎日繰り返す"),
      DEF("Automation testing", "việc dùng script và công cụ để tự động thực hiện lại các bước kiểm thử và so sánh kết quả thực tế với kết quả mong đợi, thay vì tester làm bằng tay mỗi lần.",
        "automation testing — using scripts and tools to automatically re-run test steps and compare actual vs expected results, instead of a tester doing it by hand each time.",
        "オートメーションテスト — テスターが毎回手作業で行う代わりに、スクリプトとツールでテスト手順を自動的に繰り返し、実際の結果と期待結果を比較すること。"),
    ] },
  { heading: { vi: "2. Automation testing trông như thế nào so với manual", en: "2. What automation looks like next to manual", ja: "2. 手動と比べたオートメーションテストの姿" },
    blocks: [
      P("Hãy hình dung manual testing như bạn tự tay lái xe qua một cung đường mỗi ngày để kiểm tra đường có ổ gà không. Automation testing giống như gắn một camera hành trình chạy tự động qua đúng cung đường đó, rồi báo cho bạn biết chỗ nào có ổ gà — nhanh hơn nhiều, nhưng camera chỉ 'thấy' đúng những gì nó được lập trình để tìm, còn bạn tự lái mới cảm nhận được ổ gà bất ngờ chưa từng biết.",
        "Picture manual testing as you driving the same route every day to check for potholes. Automation testing is like mounting a dashcam that drives that exact route automatically and reports where the potholes are — much faster, but the camera only 'sees' what it's programmed to look for, while driving yourself lets you notice unexpected potholes you never knew about.",
        "手動テストを、毎日同じ道を自分で運転して穴がないか確認することだと想像しましょう。オートメーションテストは、その道を自動走行するドライブレコーダーを取り付け、穴の場所を報告してもらうようなもの — ずっと速いですが、カメラはプログラムされたものしか『見え』ません。自分で運転すれば、予期しない未知の穴にも気づけます。"),
      IMG(m_compare, "Manual testing và Automation testing khác nhau ở đâu — bảng so sánh nhanh", "Where manual and automation testing differ — a quick comparison table", "手動テストとオートメーションテストの違い — 簡易比較表"),
      P("Điểm mấu chốt: automation KHÔNG phải là 'tốt hơn' manual, mà là một CÔNG CỤ dùng đúng chỗ. Một đội test giỏi thường kết hợp cả hai — manual cho case mới/khám phá/UX, automation cho case lặp lại nhiều lần để tiết kiệm thời gian và bắt lỗi hồi quy (regression) sớm.",
        "The key point: automation is NOT 'better' than manual — it's a TOOL used in the right place. A good testing team usually combines both — manual for new/exploratory/UX cases, automation for frequently repeated cases to save time and catch regressions early.",
        "重要な点：自動化は手動より『優れている』のではなく、適切な場所で使う『道具』です。優れたテストチームは通常両方を組み合わせます — 新規/探索的/UXケースには手動、時間節約と早期のリグレッション検出には頻繁に繰り返すケースへの自動化を。"),
    ] },
  { heading: { vi: "3. Vì sao người mới nên hiểu automation sớm", en: "3. Why beginners should understand automation early", ja: "3. 初心者が早くオートメーションを理解すべき理由" },
    blocks: [
      P("Ở nhiều dự án thật, một bản build mới có thể ra mỗi ngày. Nếu mọi thứ đều kiểm bằng tay, đội test sẽ luôn chạy theo không kịp, và những lỗi cũ (đã sửa) có thể âm thầm quay lại mà không ai phát hiện kịp thời. Automation giúp chạy lại hàng trăm case chỉ trong vài phút, giải phóng thời gian cho tester tập trung vào việc con người làm tốt hơn: khám phá, tư duy tình huống, đánh giá trải nghiệm người dùng.",
        "On many real projects, a new build can ship every day. If everything is checked by hand, the test team will always be racing to keep up, and old (fixed) bugs can quietly return unnoticed. Automation lets you re-run hundreds of cases in minutes, freeing testers to focus on what humans do better: exploration, scenario thinking, evaluating user experience.",
        "多くの実案件では毎日新しいビルドが出ることがあります。すべて手作業で確認していると、テストチームは常に追いつけず、修正済みの古いバグが気づかれずひっそり再発することもあります。自動化は数百のケースを数分で再実行でき、テスターは人間が得意なこと — 探索、シナリオ思考、UX評価 — に集中する時間を得られます。"),
      P("Với riêng bạn — người mới — hiểu automation sớm (dù chưa giỏi viết script) giúp bạn nói chuyện đúng ngôn ngữ với đội automation, biết case nào nên đề xuất tự động hoá, và không bị bỡ ngỡ khi nhà tuyển dụng hỏi 'bạn hiểu gì về automation testing?'. Đây cũng là hướng phát triển sự nghiệp phổ biến: nhiều Manual Tester sau 1-2 năm chuyển dần sang Automation Tester với mức lương cao hơn.",
        "For you specifically — a beginner — understanding automation early (even before you can write scripts well) helps you speak the same language as the automation team, know which cases are worth proposing for automation, and not be caught off guard when an interviewer asks 'what do you know about automation testing?'. It's also a common career path: many Manual Testers move toward Automation Testing after 1–2 years, often for a higher salary.",
        "特に初心者のあなたにとって、（まだスクリプトをうまく書けなくても）早期にオートメーションを理解することは、自動化チームと同じ言葉で話せるようになり、どのケースを自動化提案すべきか分かり、面接官に『オートメーションテストについて何を知っていますか』と聞かれても慌てません。これはよくあるキャリアパスでもあります：多くのマニュアルテスターは1〜2年後、より高い給与のオートメーションテスターへ移行していきます。"),
      P("Và quan trọng nhất: hiểu đúng automation giúp bạn tránh một ngộ nhận tốn kém — nghĩ rằng học được một công cụ automation là xong việc kiểm thử. Automation chỉ tốt bằng tư duy kiểm thử đứng sau nó; nền tảng manual vững chắc chính là thứ giúp automation của bạn thật sự có giá trị.",
        "And most importantly: understanding automation correctly helps you avoid a costly misconception — thinking that learning one automation tool means testing is 'done'. Automation is only as good as the testing thinking behind it; a solid manual foundation is what makes your automation actually valuable.",
        "そして最も重要なのは、正しい理解が高くつく誤解 — 1つのオートメーションツールを学べばテストは『完了』だと考えること — を避けさせてくれることです。自動化はその背後にあるテスト思考の質次第です。しっかりした手動テストの土台こそが、あなたの自動化を本当に価値あるものにします。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: khi nào nên tự động hoá & công cụ phổ biến", en: "4. Prepare: when to automate & common tools", ja: "4. 準備：いつ自動化すべきか・よく使われるツール" },
    blocks: [
      P("Không phải case nào cũng nên tự động hoá. Trước khi học công cụ, bạn cần biết cách RA QUYẾT ĐỊNH: case này có xứng đáng để đầu tư viết script không?",
        "Not every case should be automated. Before learning tools, you need to know how to DECIDE: is this case worth investing in a script?",
        "すべてのケースを自動化すべきではありません。ツールを学ぶ前に、判断の仕方を知る必要があります：このケースはスクリプトに投資する価値があるか？"),
      STEP(1, "Hỏi: case này có chạy lặp lại nhiều lần (mỗi bản build/mỗi sprint) không? Nếu chỉ chạy một lần, giữ manual.", "Ask: does this case run repeatedly (every build/sprint)? If it only runs once, keep it manual.", "問う：このケースは繰り返し実行されるか（毎ビルド/毎スプリント）？一度だけなら手動のままに。"),
      STEP(2, "Hỏi: giao diện/luồng của case đã ổn định chưa? Nếu UI còn đổi liên tục, script sẽ hỏng liên tục — chưa nên tự động.", "Ask: is the case's UI/flow stable? If the UI keeps changing, the script will keep breaking — not ready to automate yet.", "問う：ケースのUI/フローは安定しているか？UIが変わり続けるとスクリプトも壊れ続ける — まだ自動化すべきではない。"),
      STEP(3, "Nếu cả hai đều 'có' → đề xuất tự động hoá; nếu 'chưa' → tiếp tục kiểm bằng tay và theo dõi thêm.", "If both are 'yes' → propose automating it; if 'not yet' → keep testing manually and monitor further.", "両方『はい』なら→自動化を提案；『まだ』なら→引き続き手動テストし様子を見る。"),
      TRY("Chọn một case bạn hay kiểm thử lặp lại (ví dụ: đăng nhập) và tự trả lời 2 câu hỏi trên cho case đó.", "Pick a case you often retest (e.g. login) and answer the two questions above for it.", "よく再テストするケース（例：ログイン）を選び、上記2つの質問に答えてみよう。"),
      PITFALL("Nghĩ rằng phải tự động hoá 100% mọi thứ ngay từ đầu. Tự động hoá case sai chỗ (mới, hay đổi UI) sẽ khiến bạn tốn nhiều thời gian sửa script hơn là kiểm thử thật.", "Assuming you must automate 100% of everything right away. Automating the wrong case (new, frequently-changing UI) costs more time fixing scripts than doing real testing.", "すべてをすぐ100%自動化しなければと思うこと。誤ったケース（新規、UIがよく変わる）を自動化すると、実際のテストより script修正に時間を取られます。"),
      IMG(m_decision, "Sơ đồ quyết định: có nên tự động hoá case này không (lặp lại nhiều? giao diện ổn định?)", "Decision flow: should this case be automated (repeats often? stable UI?)", "決定フロー：このケースを自動化すべきか（頻繁に繰り返す？UIは安定？）"),
      P("Khi đã biết case nào nên tự động hoá, bước tiếp theo là chọn công cụ phù hợp. Bạn không cần biết hết mọi công cụ — chỉ cần biết công cụ nào ứng với loại ứng dụng bạn đang test.",
        "Once you know which cases to automate, the next step is choosing the right tool. You don't need to know every tool — just which one matches the type of app you're testing.",
        "自動化すべきケースが分かったら、次は適切なツールを選ぶ段階です。すべてのツールを知る必要はなく、テスト対象のアプリの種類に合うものを知れば十分です。"),
      IMG(m_tools, "Bảng công cụ automation phổ biến và độ khó cho người mới", "A table of common automation tools and their difficulty for beginners", "よく使われる自動化ツールと初心者向け難易度の表"),
    ] },
  { heading: { vi: "5. Các bước bắt đầu học automation (thực hành)", en: "5. Steps to start learning automation (hands-on)", ja: "5. オートメーション学習を始める手順（実習）" },
    blocks: [
      P("Bạn không cần học hết mọi thứ cùng lúc. Dưới đây là lộ trình gợi ý cho người mới, đi từ dễ tới khó, áp dụng đúng vào lỗi đăng nhập TaskFlow ở đầu bài.",
        "You don't need to learn everything at once. Here's a suggested beginner roadmap, from easy to harder, applied to the TaskFlow login bug from the start of this article.",
        "すべてを一度に学ぶ必要はありません。以下は初心者向けの、易しいものから難しいものへの推奨ロードマップで、冒頭のTaskFlowログインバグに当てはめます。"),
      STEP(1, "Viết trước test case bằng lời (không code): 'Nhập email + mật khẩu đúng + mã 2FA đúng → vào được Dashboard'.", "Write the test case in plain words first (no code): 'Enter correct email + password + 2FA code → reach the Dashboard'.", "まず言葉でテストケースを書く（コード無し）：『正しいメール＋パスワード＋2FAコードを入力→ダッシュボードに到達』。"),
      STEP(2, "Học một công cụ (gợi ý Playwright hoặc Cypress) qua tài liệu chính thức + vài bài hướng dẫn ngắn.", "Learn one tool (Playwright or Cypress suggested) via official docs + a few short tutorials.", "1つのツール（Playwright または Cypressを推奨）を公式ドキュメントと短いチュートリアルで学ぶ。"),
      STEP(3, "Biến test case ở bước 1 thành script: mở trang đăng nhập, điền form, bấm nút, kiểm tra kết quả đúng như mong đợi.", "Turn the step-1 test case into a script: open the login page, fill the form, click the button, assert the expected result.", "手順1のテストケースをスクリプトに変換：ログインページを開き、フォームに入力し、ボタンを押し、期待結果を検証する。"),
      STEP(4, "Chạy lại script này mỗi khi có bản build mới — đây chính là giá trị cốt lõi của automation.", "Re-run this script every time there's a new build — this is the core value of automation.", "新しいビルドが出るたびにこのスクリプトを再実行 — これが自動化の核心的価値。"),
      CODE("text", "Ý TƯỞNG SCRIPT (giả lập, không phải code thật)\n1. Mở trang: app.taskflow.vn/dang-nhap\n2. Điền email: mai.tran@congty.vn\n3. Điền mật khẩu: đúng\n4. Điền mã 2FA: đúng (482913)\n5. Bấm nút 'Đăng nhập'\n6. Kiểm tra: có chuyển tới Dashboard? -> Pass/Fail"),
      TRY("Viết bằng lời (không cần code) 3 bước và 1 điều cần kiểm tra cho một case bạn hay kiểm thử lặp lại.", "In plain words (no code needed), write 3 steps and 1 thing to check for a case you often retest.", "言葉で（コード不要）、よく再テストするケースの3ステップと1つの確認事項を書こう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: viết script tự động cho đúng case, nhưng vẫn báo sai", en: "6. Situation 1: the script targets the right case but still fails wrongly", ja: "6. シーン1：正しいケース向けのスクリプトなのに誤って失敗する" },
    blocks: [
      SITUATION("Bạn viết script tự động cho case đăng nhập TaskFlow. Script chạy và luôn báo 'Fail', dù bạn tự tay đăng nhập bằng tay lại thấy đúng.", "You write an automated script for the TaskFlow login case. It always reports 'Fail', even though logging in manually works fine.",
        "Script chờ 1 giây rồi bấm nút 'Đăng nhập' ngay, nhưng trang cần 2-3 giây để tải xong mã 2FA gửi về. Script bấm khi ô mã 2FA còn trống.",
        "The script waits 1 second then immediately clicks 'Log in', but the page takes 2-3 seconds to finish loading the returned 2FA code. The script clicks while the 2FA field is still empty.",
        "TaskFlowログインケース用の自動スクリプトを書いた。手動でログインすると問題ないのに、スクリプトは常に『Fail』と報告する。",
        "スクリプトは1秒待ってすぐ『ログイン』ボタンを押すが、ページは返された2FAコードの読み込みに2〜3秒かかる。スクリプトは2FA欄がまだ空の状態でクリックしている。"),
      SOLVE("Thay chờ cứng 1 giây bằng chờ tường minh: đợi ô mã 2FA thực sự có giá trị (hoặc nút bấm được) rồi mới bấm 'Đăng nhập'.", "Replace the fixed 1-second wait with an explicit wait: wait until the 2FA field actually has a value (or the button is enabled) before clicking 'Log in'.", "固定の1秒待機を明示的待機に置き換える：2FA欄に実際に値が入る（またはボタンが有効になる）まで待ってから『ログイン』をクリック。"),
      P("Đây là bài học lớn cho người mới học automation: script không 'thông minh' như con người — nó làm đúng những gì được viết, kể cả khi thời điểm chưa hợp lý. Chờ cứng (sleep cố định) là cách dễ viết nhất nhưng cũng dễ gây lỗi giả (false fail) nhất, vì tốc độ tải trang không phải lúc nào cũng giống nhau. Chờ tường minh — đợi đúng điều kiện xảy ra — luôn là lựa chọn an toàn hơn.",
        "This is a big lesson for beginners learning automation: a script isn't 'smart' like a human — it does exactly what's written, even at the wrong moment. A fixed sleep is the easiest to write but also the easiest way to cause false fails, since page-load speed isn't always the same. An explicit wait — waiting for the actual condition — is always the safer choice.",
        "これは自動化を学ぶ初心者への大きな教訓です：スクリプトは人間のように『賢く』ありません — 書かれた通りに正確に実行します、タイミングが不適切でも。固定のsleepは最も書きやすいですが、誤検知（false fail）を最も起こしやすい方法でもあります。ページ読み込み速度は常に同じではないからです。明示的待機 — 実際の条件を待つこと — が常により安全な選択です。"),
      RECAP(["Fail giả (false fail) thường do chờ cứng chưa đủ thời gian tải thật", "Chờ tường minh theo trạng thái phần tử ổn định hơn chờ cứng"],
        ["A false fail is often caused by a fixed wait shorter than real load time", "Explicit waits on element state are more stable than fixed waits"],
        ["誤ったFailは多くの場合、固定待機が実際の読み込み時間より短いために起こる", "要素の状態に基づく明示的待機は固定待機より安定している"]),
    ] },
  { heading: { vi: "7. Tình huống 2: script chạy lúc pass lúc fail (flaky)", en: "7. Situation 2: the script sometimes passes, sometimes fails (flaky)", ja: "7. シーン2：スクリプトが合格したり不合格になったりする（flaky）" },
    blocks: [
      SITUATION("Bạn chạy đúng script đăng nhập TaskFlow 10 lần liên tiếp: 7 lần pass, 3 lần fail — không sửa gì cả.", "You run the exact same TaskFlow login script 10 times in a row: 7 pass, 3 fail — with no changes.",
        "Cả 3 lần fail đều dùng chung một tài khoản test với dữ liệu 2FA được sinh sẵn; khi 2 script chạy song song, chúng ghi đè mã 2FA của nhau.",
        "All 3 failures shared one test account with pre-generated 2FA data; when two scripts ran in parallel, they overwrote each other's 2FA code.",
        "同じTaskFlowログインスクリプトを10回連続実行：7回合格、3回不合格 — 何も変更していないのに。",
        "3回の不合格はすべて、事前生成された2FAデータを持つ同じテストアカウントを共有していた；2つのスクリプトが並行実行されると互いの2FAコードを上書きしていた。"),
      SOLVE("Cho mỗi lần chạy script dùng một tài khoản/dữ liệu 2FA độc lập (không chia sẻ giữa các script chạy song song).", "Give each script run an independent account/2FA data (not shared across parallel script runs).", "各スクリプト実行に独立したアカウント/2FAデータを与える（並行実行するスクリプト間で共有しない）。"),
      P("Test tự động 'flaky' (lúc pass lúc fail dù không đổi gì) là nỗi đau phổ biến nhất khi mới làm automation — và cũng là thứ dễ khiến cả đội mất niềm tin vào bộ automation nếu không xử lý sớm. Nguyên nhân thường không nằm ở bug thật của phần mềm, mà ở cách script được thiết kế: phụ thuộc dữ liệu dùng chung, phụ thuộc thứ tự chạy, hoặc chờ thời gian chưa hợp lý.",
        "A 'flaky' automated test (sometimes pass, sometimes fail with no changes) is the most common pain when starting automation — and it's also what most quickly erodes team trust in the automation suite if not fixed early. The cause is usually not a real software bug, but how the script is designed: shared data dependency, run-order dependency, or an unreasonable wait.",
        "何も変えていないのに合格したり不合格になったりする『flaky』な自動テストは、自動化を始めたばかりの頃に最もよくある悩みです — 早期に対処しないと、チームの自動化スイートへの信頼を最も早く損なうものでもあります。原因は通常ソフトウェアの本物のバグではなく、スクリプトの設計方法にあります：共有データへの依存、実行順序への依存、または不適切な待機時間。"),
      IMG(m_flakyfix, "Nguyên nhân phổ biến khiến script bị flaky và cách khắc phục tương ứng", "Common causes of flaky scripts and their corresponding fixes", "スクリプトがflakyになる一般的な原因とそれに対応する修正方法"),
      TRY("Với case đăng nhập của bạn, viết 1 câu mô tả cách bạn sẽ tạo dữ liệu test độc lập (gợi ý: sinh tài khoản/mã ngẫu nhiên cho mỗi lần chạy).", "For your login case, write one sentence describing how you'd create independent test data (hint: generate a random account/code per run).", "あなたのログインケースについて、独立したテストデータの作り方を1文で書こう（ヒント：実行ごとにランダムなアカウント/コードを生成）。"),
    ] },
  { heading: { vi: "8. Theo dõi kết quả sau khi chạy tự động", en: "8. Tracking results after an automated run", ja: "8. 自動実行後の結果追跡" },
    blocks: [
      P("Sau khi có vài script tự động, đội thường gộp chúng thành một 'bộ automation' (test suite) chạy tự động mỗi đêm hoặc mỗi khi có bản build mới, rồi xem báo cáo kết quả vào sáng hôm sau.",
        "Once you have several automated scripts, teams usually group them into an 'automation suite' that runs automatically every night or on every new build, then review the result report the next morning.",
        "いくつかの自動スクリプトができたら、チームは通常それらを『オートメーションスイート』としてまとめ、毎晩または新しいビルドごとに自動実行し、翌朝結果レポートを確認します。"),
      STEP(1, "Xem báo cáo: bao nhiêu case Pass, Fail, và Flaky (không ổn định) sau lần chạy.", "Read the report: how many cases Passed, Failed, and were Flaky (unstable) after the run.", "レポートを確認：実行後に何件がPass、Fail、Flaky（不安定）だったか。"),
      STEP(2, "Với case Fail, kiểm tra xem đó là lỗi thật của phần mềm hay lỗi của chính script (flaky, chờ sai, dữ liệu cũ).", "For each Fail, check whether it's a real software bug or a script issue (flaky, wrong wait, stale data).", "各Failについて、ソフトウェアの本物のバグかスクリプト自体の問題（flaky、待機ミス、古いデータ）かを確認。"),
      CODE("text", "BÁO CÁO AUTOMATION — TaskFlow — chạy đêm 13/07\nTổng: 146 | Pass: 132 | Fail: 9 | Flaky: 5\nĐáng chú ý: case 'Đăng nhập 2FA' Fail 2/3 lần -> nghi flaky do chờ chưa đủ, đã ghi issue cho đội automation."),
      IMG(m_dash, "Dashboard kết quả một lần chạy bộ automation: tổng case, pass, fail, flaky", "A dashboard for one automation run: total, pass, fail, flaky", "オートメーション1回実行のダッシュボード：合計・pass・fail・flaky"),
      TIP("Đừng phớt lờ case 'Flaky' — nó là dấu hiệu script cần sửa, không phải dấu hiệu bạn nên tắt/bỏ qua case đó.", "Don't ignore 'Flaky' cases — they're a sign the script needs fixing, not a sign you should disable/skip that case.", "『Flaky』ケースを無視しない — それはスクリプトの修正が必要なサインであり、そのケースを無効化/スキップすべきサインではない。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi mới bắt đầu với automation testing. Biết trước giúp bạn tiết kiệm rất nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when starting with automation testing. Knowing them in advance saves a lot of time.",
        "初心者はオートメーションテストを始めたばかりの頃、共通の失敗をしがちです。事前に知れば多くの時間を節約できます。"),
      PITFALL("Cố tự động hoá case đang thay đổi UI liên tục — script hỏng nhanh hơn tốc độ bạn sửa được, gây nản lòng ngay từ đầu.", "Trying to automate a case whose UI keeps changing — scripts break faster than you can fix them, causing early discouragement.", "UIが変わり続けるケースを自動化しようとする — スクリプトが直せる速度より速く壊れ、初期からくじけやすい。"),
      PITFALL("Không đọc kỹ thông báo lỗi (error message) của script khi Fail, mà đoán bừa nguyên nhân — mất nhiều thời gian hơn cần thiết.", "Not carefully reading the script's error message on Fail and guessing the cause instead — wastes more time than needed.", "スクリプトがFailした際のエラーメッセージをよく読まず原因を当て推量する — 必要以上に時間を浪費する。"),
      TIP("Bắt đầu tự động hoá từ những case ĐƠN GIẢN, ỔN ĐỊNH nhất trước (ví dụ đăng nhập đúng), rồi mới tới case phức tạp hơn.", "Start automating the SIMPLEST, most STABLE cases first (e.g. a valid login), then move to more complex ones.", "まず最もシンプルで安定したケース（正しいログインなど）から自動化を始め、その後より複雑なケースへ進む。"),
      IMG(m_tools, "Nhắc lại: chọn công cụ đúng loại ứng dụng, bắt đầu từ Playwright/Cypress cho web", "Reminder: pick a tool matching your app type, start with Playwright/Cypress for web", "再確認：アプリの種類に合うツールを選び、Webなら Playwright/Cypress から始める"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Manual testing là gì — cho người mới", "What is manual testing — for beginners", "manual-testing-la-gi-cho-nguoi-moi"),
      INTERNAL("Cách viết test case cho người mới", "How to write a test case for beginners", "cach-viet-test-case-cho-nguoi-moi"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua bức tranh tổng quan về automation testing qua app SaaS TaskFlow: khái niệm automation so với manual, cách quyết định case nào nên tự động hoá, các công cụ phổ biến (Playwright, Cypress, Selenium, Appium, Postman), lộ trình bắt đầu, và hai lỗi rất hay gặp — chờ sai thời điểm và dữ liệu test dùng chung gây flaky. Đây là nền tảng khái niệm mà mọi tester cần trước khi đi sâu vào viết script thật.",
        "You just went through an overview of automation testing via the TaskFlow SaaS app: the concept of automation vs manual, how to decide which cases to automate, common tools (Playwright, Cypress, Selenium, Appium, Postman), a starting roadmap, and two very common mistakes — bad timing waits and shared test data causing flakiness. This is the conceptual foundation every tester needs before diving into writing real scripts.",
        "SaaSアプリTaskFlowを通じて、オートメーションテストの全体像を見てきました：自動化と手動の概念、どのケースを自動化すべきかの判断方法、よく使われるツール（Playwright、Cypress、Selenium、Appium、Postman）、始め方のロードマップ、そして2つの非常によくある失敗 — 不適切なタイミングの待機と、flakyの原因となる共有テストデータ。これは、実際のスクリプトを書く前にすべてのテスターが必要とする概念的な土台です。"),
      P("Chặng tiếp theo, bạn nên luyện vững manual testing (viết test case, thiết kế scenario) rồi học một công cụ automation cụ thể bằng thực hành trên dự án thật. Nếu muốn học bài bản từ con số 0 tới đi làm — cả manual lẫn automation — cùng người hướng dẫn và dự án thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, solidify manual testing (writing test cases, designing scenarios), then learn a specific automation tool through hands-on practice on a real project. If you want to learn properly from zero to hired — both manual and automation — with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、手動テスト（テストケース作成、シナリオ設計）を固め、その後実際のプロジェクトでの実践を通じて特定の自動化ツールを学びましょう。指導者と実際のプロジェクトでゼロから就職まで — 手動も自動化も — 体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const AUTO_BEG_01 = makeDoc({
  slug: "automation-testing-cho-nguoi-moi-bat-dau",
  domain: "saas",
  primaryKeyword: "automation testing cho người mới",
  keywords: ["automation testing cho người mới", "automation testing là gì", "manual vs automation", "công cụ automation testing", "lộ trình học automation testing"],
  coverLabel: "NGƯỜI MỚI · AUTOMATION · SAAS",
  crumb: "Automation testing cho người mới bắt đầu",
  metaTitle: { vi: "Automation testing cho người mới bắt đầu", en: "Automation testing for beginners: getting started", ja: "初心者向けオートメーションテスト入門" },
  metaDescription: {
    vi: "Automation testing cho người mới: manual vs automation, khi nào nên tự động hoá, công cụ phổ biến, lộ trình bắt đầu qua app SaaS, có hình minh hoạ, trắc nghiệm.",
    en: "Automation testing for beginners: manual vs automation concepts, when to automate, common tools and a starting roadmap through a SaaS app, with visuals and a quiz.",
    ja: "初心者向けオートメーションテスト：手動と自動化の概念、いつ自動化すべきか、よく使われるツール、SaaSアプリでの開始ロードマップ、図とクイズ付き。",
  },
  title: {
    vi: "Automation testing cho người mới bắt đầu: là gì, khi nào cần, bắt đầu ra sao (có trắc nghiệm)",
    en: "Automation testing for beginners: what it is, when you need it, how to start (with quiz)",
    ja: "初心者向けオートメーションテスト：概要・必要な場面・始め方（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: hiểu automation testing qua app SaaS TaskFlow. Khái niệm manual vs automation, cách quyết định case nào nên tự động hoá, công cụ phổ biến (Playwright, Cypress, Selenium, Appium, Postman), lộ trình bắt đầu, xử lý test bị flaky, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: understand automation testing through the TaskFlow SaaS app. Manual vs automation concepts, how to decide which cases to automate, common tools (Playwright, Cypress, Selenium, Appium, Postman), a starting roadmap, handling flaky tests, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "初心者向け記事：SaaSアプリTaskFlowでオートメーションテストを理解。手動と自動化の概念、どのケースを自動化すべきかの判断、よく使われるツール（Playwright、Cypress、Selenium、Appium、Postman）、開始ロードマップ、flakyテストへの対処、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách bắt đầu học automation testing", steps: [
    { name: "Xác định case nên tự động hoá", text: "Case lặp lại nhiều lần và giao diện đã ổn định thì mới nên tự động hoá." },
    { name: "Chọn công cụ phù hợp", text: "Playwright/Cypress cho web, Appium cho mobile, Postman cho API." },
    { name: "Viết script nhỏ rồi mở rộng dần", text: "Bắt đầu từ case đơn giản (đăng nhập), chú ý chờ tường minh và dữ liệu test độc lập." },
  ] },
  pages,
});

export const CNM_BEG_AUTO_01 = [AUTO_BEG_01];
