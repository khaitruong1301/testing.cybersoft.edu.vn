// doc_au_visual.mjs — BÀI AUTOMATION "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử hình ảnh (visual/screenshot testing) — so sánh ảnh chụp giao diện thực tế (actual)
// với ảnh đã duyệt (baseline) để phát hiện lỗi hiển thị mà test chức năng bỏ sót; cách hoạt động
// của expect(page).toHaveScreenshot() trong Playwright, ngưỡng khác biệt (threshold), khi nào
// nên dùng, và cách xử lý khi ảnh baseline cần cập nhật vì UI đổi hợp lệ.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), có code Playwright chạy được.
// Gắn app TMĐT ShopEasy (trang sản phẩm). Song ngữ vi/en/ja (ja≠en), 12 chương,
// trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, btn, annotate, grid, jira, dashboard, moduleFlow } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, tự động hoá, công cụ & dự án thực chiến.",
};
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

// ── Mockup 1: sơ đồ so sánh ảnh Baseline vs Actual -> Diff ──
const m_diffflow = moduleFlow("Sơ đồ so sánh ảnh: Baseline vs Actual tạo ra ảnh Diff", [
  { id: "base", label: "Ảnh Baseline", sub: "chụp trước, đã được duyệt", x: 96, y: 150 },
  { id: "actual", label: "Ảnh Actual", sub: "chụp ngay lúc chạy test", x: 380, y: 150 },
  { id: "diff", label: "Ảnh Diff", sub: "vùng khác biệt tô đỏ/hồng", x: 664, y: 150 },
], [
  { from: "base", to: "diff", label: "so khớp từng pixel" },
  { from: "actual", to: "diff", label: "so khớp từng pixel" },
], { accent: "#0891b2", h: 260 });

// ── Mockup 2: màn hình ShopEasy có lỗi hiển thị thật (banner sai màu, nút lệch vị trí) ──
const m_visualbug = browser("shopeasy.vn/san-pham/tai-nghe-abc", [
  panel("ShopEasy · Trang sản phẩm", [
    `<rect x="24" y="20" width="660" height="80" rx="8" fill="#fda4af"/>`,
    `<text x="36" y="50" font-size="12" font-weight="700" fill="#7f1d1d">FLASH SALE HOM NAY</text>`,
    `<text x="36" y="72" font-size="13" font-weight="800" fill="#7f1d1d">Tai nghe Bluetooth ABC - giam 30%</text>`,
    `<text x="24" y="140" font-size="14" font-weight="800" fill="#0f172a">Tai nghe Bluetooth ABC</text>`,
    `<text x="24" y="164" font-size="13" fill="#334155">699.000d</text>`,
    btn(204, 180, 160, "Mua ngay", "primary"),
    annotate(20, 12, 668, 96, "Banner sai màu: hồng thay vì xanh thương hiệu #0891b2"),
    annotate(200, 172, 168, 50, "Nút bị đẩy lệch phải ~180px so với thiết kế gốc"),
  ].join(""), { h: 260, accent: "#0891b2" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#0891b2" });

// ── Mockup 3: bảng ngưỡng khác biệt (threshold options) khi so ảnh trong Playwright ──
const m_thresholdgrid = grid("Ngưỡng khác biệt (threshold) khi so ảnh trong Playwright", ["Tuỳ chọn", "Ý nghĩa", "Khi nào chỉnh"], [
  ["maxDiffPixelRatio", "Tỉ lệ % pixel khác nhau tối đa vẫn coi là khớp", "Tăng nhẹ nếu font/anti-alias gây lệch vài pixel nhỏ"],
  ["maxDiffPixels", "Số lượng pixel khác nhau tối đa (số tuyệt đối)", "Dùng khi ảnh nhỏ, muốn giới hạn chính xác theo pixel"],
  ["threshold", "Độ nhạy so khớp màu của từng pixel, từ 0 đến 1", "Tăng nếu máy CI render màu hơi khác máy dev cục bộ"],
  ["mask", "Danh sách vùng bị che, không đưa vào so sánh", "Che đồng hồ đếm ngược, banner khuyến mãi đổi liên tục"],
], { accent: "#0891b2", note: "Không có ngưỡng nào là 'đúng tuyệt đối' — chỉnh dựa trên thực tế UI của từng trang." });

// ── Mockup 4: bảng khi nào nên/không nên dùng Visual Testing ──
const m_whenuse = grid("Khi nào nên dùng Visual Testing?", ["Tình huống", "Nên dùng?", "Lý do"], [
  ["Trang landing/khuyến mãi ít đổi layout", "Có", "Bố cục ổn định, ít báo sai, phát hiện lỗi CSS nhanh"],
  ["Trang có dữ liệu động (giá, đếm ngược)", "Cân nhắc, cần mask vùng động", "Ảnh actual đổi liên tục, dễ báo diff giả nếu không che"],
  ["Logic tính tổng tiền, luồng thanh toán", "Không, dùng assertion số liệu", "Visual chỉ so pixel, không hiểu đúng/sai giá trị nghiệp vụ"],
  ["Component dùng lại nhiều nơi (design system)", "Có", "Phát hiện sớm khi 1 lần đổi CSS ảnh hưởng hàng loạt màn hình"],
  ["Màn hình còn đang thử nghiệm layout liên tục", "Không, chưa phù hợp", "Baseline sẽ phải cập nhật liên tục, mất tác dụng cảnh báo"],
], { accent: "#0891b2", note: "Chọn đúng nơi để chụp ảnh — chụp tràn lan khiến bộ visual test vỡ liên tục và mất niềm tin." });

// ── Mockup 5: ticket Jira ghi nhận lỗi hiển thị chỉ visual test bắt được, test chức năng vẫn pass ──
const m_jira = jira({
  key: "SE-20144", title: "Nút Mua ngay lệch vị trí & banner sai màu thương hiệu trên trang sản phẩm",
  type: "Bug", status: "Open", priority: "High", severity: "Medium",
  fields: [
    ["Môi trường", "production · web ShopEasy · Chrome 126 · sau bản deploy CSS mới"],
    ["Phát hiện bởi", "Visual test tự động (toHaveScreenshot) — test chức năng mua hàng vẫn PASS"],
    ["Nguyên nhân", "Deploy CSS mới đổi biến --brand-color thiếu fallback đúng, margin-left bị chỉnh nhầm"],
    ["Đề xuất", "Rollback biến CSS sai, chạy lại visual test để xác nhận ảnh actual khớp baseline"],
  ],
});

// ── Mockup 6: dashboard kết quả chạy Visual Testing sau khi xử lý flaky ──
const m_dashboard = dashboard("Kết quả chạy Visual Testing tuần này (ShopEasy)", [
  { label: "Snapshot đạt", value: "148", sub: "khớp baseline, không đổi" },
  { label: "Snapshot lệch (diff)", value: "5", sub: "cần người xem lại ảnh diff" },
  { label: "Baseline cập nhật", value: "3", sub: "do UI đổi hợp lệ, đã duyệt" },
], { accent: "#0891b2" });

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Visual testing (kiểm thử hình ảnh) là gì?",
  "What is visual testing (screenshot testing)?",
  "Visual testing là kỹ thuật kiểm thử so sánh ảnh chụp giao diện thực tế (actual) của ứng dụng với ảnh chuẩn đã được duyệt trước đó (baseline), để phát hiện những khác biệt về mặt hiển thị — như lệch vị trí, sai màu, sai font, phần tử bị che khuất — mà test chức năng thông thường (chỉ kiểm tra hành vi và dữ liệu) không phát hiện ra.",
  "Visual testing is a technique that compares a screenshot of the app's actual current UI with a previously approved reference image (the baseline), to catch display differences — like shifted positions, wrong colors, wrong fonts, hidden elements — that ordinary functional tests (which only check behavior and data) don't detect.",
  "ビジュアルテスト（キャプチャテスト）とは何？",
  "ビジュアルテストとは、アプリの現在の実際の画面（actual）を、事前に承認された基準画像（baseline）と比較する検証手法です。位置のズレ、色の誤り、フォントの誤り、要素が隠れているなど、挙動とデータだけを確認する通常の機能テストでは検出できない表示上の違いを見つけます。");
const faq2 = FAQ(
  "Visual testing khác gì so với test chức năng (functional testing) thông thường?",
  "How is visual testing different from ordinary functional testing?",
  "Test chức năng kiểm tra hành vi và dữ liệu đúng/sai — ví dụ bấm nút có chuyển trang không, tổng tiền có tính đúng không — nhưng không quan tâm giao diện trông ra sao. Visual testing lại so sánh từng pixel trên ảnh chụp màn hình để phát hiện lỗi hiển thị: vị trí lệch, màu sai, chữ bị tràn khung, dù mọi hành vi và dữ liệu vẫn đúng hoàn toàn. Hai loại test này bổ sung cho nhau, không thay thế nhau.",
  "Functional tests check whether behavior and data are correct — e.g. does clicking a button navigate correctly, is the total price calculated right — but they don't care what the UI actually looks like. Visual testing instead compares screenshots pixel by pixel to catch display bugs: shifted positions, wrong colors, overflowing text, even when behavior and data are completely correct. The two types complement, not replace, each other.",
  "ビジュアルテストは通常の機能テストと何が違う？",
  "機能テストは、ボタンを押すと正しく遷移するか、合計金額が正しく計算されるかなど、挙動とデータの正誤を確認しますが、UIの見た目は気にしません。一方ビジュアルテストは、挙動とデータが完全に正しくても、位置のズレ、色の誤り、テキストのはみ出しなどの表示バグをスクリーンショットのピクセル単位の比較で見つけます。この2種類は互いを補完するもので、代替するものではありません。");
const faq3 = FAQ(
  "Nên bắt đầu dùng visual testing từ khi nào?",
  "When should you start using visual testing?",
  "Nên bắt đầu khi giao diện ứng dụng đã tương đối ổn định (không còn đổi layout mỗi ngày), đặc biệt với các trang landing/khuyến mãi ít đổi, component dùng lại nhiều nơi (design system), hoặc sau khi từng gặp sự cố lỗi CSS lọt qua test chức năng như trong bài này. Chưa cần áp dụng ngay cho những màn hình còn đang thử nghiệm layout liên tục, vì ảnh baseline sẽ phải cập nhật quá thường xuyên, làm mất tác dụng cảnh báo.",
  "You should start once the app's UI is reasonably stable (layout no longer changes daily), especially for rarely-changing landing/promo pages, components reused across many screens (a design system), or after experiencing a CSS bug slipping through functional tests, as in this article. It's not yet worth applying to screens whose layout is still being iterated on constantly, since the baseline would need updating too often, defeating its purpose as a warning signal.",
  "いつからビジュアルテストを始めるべき？",
  "アプリのUIが比較的安定した時点（毎日レイアウトが変わらなくなった時）、特にあまり変わらないランディング/プロモページや、多くの画面で再利用されるコンポーネント（デザインシステム）、あるいは本記事のようにCSSバグが機能テストをすり抜けた経験があった後に始めるのが良いでしょう。まだレイアウトを頻繁に試行錯誤している画面には、まだ適用しなくてよいです。baseline画像を更新しすぎて警告としての意味を失ってしまうためです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Mục đích cốt lõi của visual testing là gì?", en: "What is the core purpose of visual testing?", ja: "ビジュアルテストの核心的な目的は何？" },
    options: [
      { vi: "So sánh ảnh chụp giao diện thực tế với ảnh baseline để phát hiện khác biệt hiển thị", en: "Compare a screenshot of the actual UI with a baseline image to detect display differences", ja: "実際のUIのスクリーンショットをbaseline画像と比較し、表示の違いを検出すること" },
      { vi: "Kiểm tra tốc độ tải trang của ứng dụng", en: "Check the app's page load speed", ja: "アプリのページ読み込み速度を確認すること" },
      { vi: "Tự động sinh dữ liệu kiểm thử ngẫu nhiên", en: "Automatically generate random test data", ja: "ランダムなテストデータを自動生成すること" },
      { vi: "Thay thế hoàn toàn việc viết test chức năng", en: "Completely replace writing functional tests", ja: "機能テストを書く必要を完全になくすこと" },
    ], correct: 0,
    explain: { vi: "Visual testing so ảnh actual với baseline để bắt lỗi hiển thị — không thay thế test chức năng, chỉ bổ sung góc nhìn về giao diện.", en: "Visual testing compares actual screenshots to a baseline to catch display bugs — it doesn't replace functional tests, only adds a UI-focused perspective.", ja: "ビジュアルテストはactualとbaselineを比較して表示バグを検出します——機能テストを代替するのではなく、UIの視点を補うものです。" },
  }),
  mcq({
    q: { vi: "Trong Playwright, hàm nào dùng để so sánh ảnh chụp màn hình với ảnh baseline?", en: "In Playwright, which function compares a screenshot with the baseline image?", ja: "Playwrightで、スクリーンショットをbaseline画像と比較する関数はどれ？" },
    options: [
      { vi: "expect(page).toHaveText()", en: "expect(page).toHaveText()", ja: "expect(page).toHaveText()" },
      { vi: "expect(page).toHaveScreenshot()", en: "expect(page).toHaveScreenshot()", ja: "expect(page).toHaveScreenshot()" },
      { vi: "expect(page).toHaveURL()", en: "expect(page).toHaveURL()", ja: "expect(page).toHaveURL()" },
      { vi: "expect(page).toBeVisible()", en: "expect(page).toBeVisible()", ja: "expect(page).toBeVisible()" },
    ], correct: 1,
    explain: { vi: "toHaveScreenshot() là hàm chuyên dụng của Playwright để chụp ảnh và so sánh với ảnh baseline đã lưu.", en: "toHaveScreenshot() is Playwright's dedicated function for capturing and comparing a screenshot against the saved baseline.", ja: "toHaveScreenshot()は、スクリーンショットを撮影し、保存済みのbaselineと比較するPlaywright専用の関数です。" },
  }),
  mcq({
    q: { vi: "Khi nào nên chạy lệnh --update-snapshots để cập nhật ảnh baseline?", en: "When should you run --update-snapshots to update the baseline images?", ja: "--update-snapshotsを実行してbaseline画像を更新すべきなのはいつ？" },
    options: [
      { vi: "Mỗi lần chạy test, bất kể có đổi gì hay không", en: "Every time you run tests, regardless of any changes", ja: "何か変わったかどうかに関わらず、テストを実行するたび" },
      { vi: "Chỉ khi UI thay đổi HỢP LỆ (đã được xác nhận), không phải khi phát hiện bug thật", en: "Only when the UI changes are VALID (confirmed), not when a real bug is found", ja: "UIの変更が正当（確認済み）な場合のみで、本当のバグが見つかった時ではない" },
      { vi: "Không bao giờ, baseline phải cố định vĩnh viễn", en: "Never — the baseline must stay fixed forever", ja: "決してしない——baselineは永久に固定されるべき" },
      { vi: "Chỉ khi test bị lỗi cú pháp", en: "Only when there's a syntax error in the test", ja: "テストに構文エラーがあるときだけ" },
    ], correct: 1,
    explain: { vi: "Chỉ cập nhật baseline khi đã xác nhận khác biệt là do UI đổi CHỦ ĐÍCH; nếu là bug thật, phải sửa UI trước, không được ghi đè baseline để 'hợp thức hoá' lỗi.", en: "Only update the baseline once the difference is confirmed to be an intentional UI change; if it's a real bug, fix the UI first — never overwrite the baseline to 'legitimize' a bug.", ja: "差分が意図的なUI変更だと確認できた場合のみbaselineを更新します。本当のバグなら先にUIを直すべきで、バグを『正当化』するためにbaselineを上書きしてはいけません。" },
  }),
  mcq({
    q: { vi: "Tuỳ chọn nào trong toHaveScreenshot() giúp che vùng dữ liệu động (như đồng hồ đếm ngược) khỏi so sánh?", en: "Which toHaveScreenshot() option excludes a dynamic area (like a countdown timer) from comparison?", ja: "toHaveScreenshot()のどのオプションが、動的な領域（カウントダウンタイマーなど）を比較から除外する？" },
    options: [
      { vi: "threshold", en: "threshold", ja: "threshold" },
      { vi: "maxDiffPixels", en: "maxDiffPixels", ja: "maxDiffPixels" },
      { vi: "mask", en: "mask", ja: "mask" },
      { vi: "fullPage", en: "fullPage", ja: "fullPage" },
    ], correct: 2,
    explain: { vi: "mask nhận danh sách locator cần che, vùng đó bị bỏ qua khi so sánh pixel — rất hợp với giá, đồng hồ đếm ngược, banner đổi liên tục.", en: "mask takes a list of locators to hide; that area is skipped during pixel comparison — great for prices, countdown timers, rotating banners.", ja: "maskは非表示にするロケーターのリストを受け取り、その領域はピクセル比較でスキップされます——価格、カウントダウン、頻繁に変わるバナーに最適です。" },
  }),
  mcq({
    q: { vi: "Vì sao test chức năng đã pass nhưng vẫn cần thêm visual testing?", en: "Why do you still need visual testing even when functional tests already pass?", ja: "機能テストが既にパスしていても、なぜビジュアルテストが必要？" },
    options: [
      { vi: "Vì test chức năng chỉ kiểm tra hành vi/dữ liệu, không phát hiện lỗi hiển thị như lệch vị trí hay sai màu", en: "Because functional tests only check behavior/data, not display bugs like misalignment or wrong colors", ja: "機能テストは挙動とデータしか確認せず、位置ズレや色の誤りのような表示バグは検出しないから" },
      { vi: "Vì test chức năng luôn chạy chậm hơn visual testing", en: "Because functional tests always run slower than visual tests", ja: "機能テストの方がビジュアルテストより常に遅いから" },
      { vi: "Vì test chức năng không thể chạy được trên CI", en: "Because functional tests cannot run on CI", ja: "機能テストはCI上で実行できないから" },
      { vi: "Vì visual testing thay thế hoàn toàn mọi câu assert dữ liệu", en: "Because visual testing completely replaces all data assertions", ja: "ビジュアルテストがすべてのデータアサーションを完全に置き換えるから" },
    ], correct: 0,
    explain: { vi: "Đúng như tình huống trong bài: nút lệch vị trí, banner sai màu vẫn để test chức năng pass bình thường vì assert không kiểm tra hiển thị — chỉ visual testing mới bắt được.", en: "Just like in this article's situation: a misaligned button or wrong-colored banner still lets functional tests pass normally since assertions don't check display — only visual testing catches it.", ja: "本記事のシーンの通り：ボタンの位置ズレやバナーの色の誤りがあっても、アサーションは表示を確認しないため機能テストは通常通りパスします——ビジュアルテストだけがそれを検出できます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử hình ảnh (visual testing / screenshot testing) là so sánh ảnh chụp giao diện thực tế (actual) với ảnh đã duyệt trước đó (baseline) để bắt lỗi hiển thị — lệch vị trí, sai màu, sai font — mà test chức năng thông thường bỏ sót. Bài này bám web TMĐT ShopEasy, dùng expect(page).toHaveScreenshot() của Playwright, học cách đặt ngưỡng khác biệt và xử lý khi ảnh baseline cần cập nhật. Trong thời đại nhiều đội dùng AI để sinh test case nhanh hơn, visual testing vẫn cần con người xác nhận giao diện đúng ý đồ thiết kế — kỹ năng này được dạy bài bản tại khóa Software Testing chuyên nghiệp của CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ . Có mockup, code chạy được và trắc nghiệm cuối bài.",
        "Visual testing (screenshot testing) compares a screenshot of the app's actual current UI with a previously approved reference image (the baseline) to catch display bugs — misalignment, wrong colors, wrong fonts — that ordinary functional tests miss. This follows ShopEasy's e-commerce product page, using Playwright's expect(page).toHaveScreenshot(), learning how to set diff thresholds and handle baseline updates. In an era where many teams use AI to generate test cases faster, visual testing still needs a human to confirm the UI matches the intended design — a skill taught properly in CyberSoft's Professional Software Testing course: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ . Includes visuals, runnable code, and a quiz.",
        "ビジュアルテスト（スクリーンショットテスト）とは、アプリの現在の実際のUI（actual）を、事前に承認された基準画像（baseline）と比較し、位置のズレ、色の誤り、フォントの誤りなど、通常の機能テストでは見逃す表示バグを検出することです。本記事はECアプリShopEasyの商品ページに沿い、PlaywrightのexpectPage).toHaveScreenshot()を使い、差分の許容範囲の設定方法とbaseline更新の対処法を学びます。多くのチームがAIでテストケースを高速生成する時代でも、ビジュアルテストにはUIが意図した設計通りか人が確認する必要があります——このスキルはCyberSoftのソフトウェアテスト専門コースで体系的に学べます：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/ 。図、動くコード、最後にクイズ付き。"),
      P("Chào bạn mới! Nếu bạn từng viết test tự động chỉ kiểm tra 'bấm nút có hoạt động không', 'dữ liệu có đúng không', bạn sẽ ngạc nhiên khi biết rằng một trang có THỂ pass toàn bộ test chức năng nhưng giao diện vẫn... vỡ: nút bị lệch vị trí, banner sai màu thương hiệu, chữ bị tràn ra ngoài khung. Đó là vì test chức năng không 'nhìn' vào giao diện — nó chỉ kiểm tra hành vi và dữ liệu. Visual testing sinh ra để lấp đúng khoảng trống này: chụp ảnh màn hình thật, so sánh với ảnh chuẩn đã được duyệt, và báo lỗi nếu có khác biệt đáng kể. Chúng ta sẽ học qua trang sản phẩm thật của ShopEasy, có hình minh hoạ và code Playwright chạy được.",
        "Hi, newcomer! If you've only ever written automation that checks 'does the button work', 'is the data correct', you'll be surprised to learn that a page CAN pass every functional test while the UI is still... broken: a misaligned button, a wrong-colored banner, text overflowing its box. That's because functional tests don't 'look at' the UI — they only check behavior and data. Visual testing exists to fill exactly that gap: it captures a real screenshot, compares it against an approved reference image, and flags an error when the difference is significant. We'll learn through ShopEasy's real product page, with visuals and runnable Playwright code.",
        "こんにちは、初心者さん！『ボタンが動くか』『データが正しいか』だけを確認する自動化しか書いたことがなければ、あるページがすべての機能テストにパスしても、UIが実は壊れている——ボタンの位置がズレている、バナーの色がブランドと違う、テキストが枠からはみ出ている——ことがあると知って驚くでしょう。それは機能テストがUIを『見て』おらず、挙動とデータしか確認しないからです。ビジュアルテストはまさにこのギャップを埋めるために生まれました：実際のスクリーンショットを撮影し、承認済みの基準画像と比較し、大きな違いがあればエラーを報告します。実際のShopEasyの商品ページを通じて、図と動くPlaywrightコード付きで学びましょう。"),
      IMG(m_diffflow, "Sơ đồ so sánh ảnh: ảnh Baseline (đã duyệt) và ảnh Actual (chụp lúc chạy test) tạo ra ảnh Diff", "Diagram: the Baseline image (approved) and the Actual image (captured at test time) produce a Diff image", "図：Baseline画像（承認済み）とActual画像（テスト実行時に撮影）がDiff画像を生成する"),
      DEF("Visual testing", "kỹ thuật kiểm thử so sánh ảnh chụp giao diện thực tế với ảnh chuẩn (baseline) đã được duyệt, để phát hiện khác biệt về mặt hiển thị.",
        "a testing technique that compares a screenshot of the actual UI with an approved reference image (baseline) to detect display differences.",
        "実際のUIのスクリーンショットを、承認済みの基準画像（baseline）と比較し、表示上の違いを検出するテスト手法。"),
    ] },
  { heading: { vi: "2. Vấn đề: test chức năng pass nhưng giao diện vỡ", en: "2. The problem: functional tests pass while the UI breaks", ja: "2. 問題：機能テストはパスするのにUIが壊れる" },
    blocks: [
      P("Đội automation của ShopEasy có bộ test chức năng khá đầy đủ cho trang sản phẩm: bấm 'Mua ngay' có chuyển tới giỏ hàng không, giá hiển thị có đúng với dữ liệu backend không, nút có disable đúng lúc hết hàng không. Toàn bộ các test này chạy xanh mỗi ngày trên CI. Nhưng một buổi sáng, bộ phận chăm sóc khách hàng nhận được phản ánh: nút 'Mua ngay' trên trang sản phẩm bỗng đổi màu tím kỳ lạ, khó nhìn thấy trên nền sáng, và bị đẩy lệch sang phải so với thiết kế gốc.",
        "ShopEasy's automation team has a fairly complete set of functional tests for the product page: does clicking 'Buy now' navigate to the cart, does the displayed price match the backend data, does the button correctly disable when out of stock. All these tests run green every day on CI. But one morning, customer support receives complaints: the 'Buy now' button on the product page has suddenly turned a strange purple, hard to see against the light background, and has shifted to the right of its original design position.",
        "ShopEasyの自動化チームは、商品ページ用にかなり充実した機能テストを持っています：『今すぐ購入』をクリックするとカートに遷移するか、表示価格がバックエンドのデータと一致するか、在庫切れ時にボタンが正しく無効化されるか。これらのテストはCI上で毎日すべてグリーンで通っています。しかしある朝、カスタマーサポートにクレームが届きます：商品ページの『今すぐ購入』ボタンが突然奇妙な紫色になり、明るい背景で見えにくく、元のデザイン位置から右にズレてしまっている、と。"),
      P("Vấn đề là: KHÔNG một test chức năng nào trong bộ trên phát hiện ra chuyện này, vì câu assert của chúng chỉ kiểm tra thuộc tính DOM, URL sau khi click, hay text hiển thị — hoàn toàn không kiểm tra màu sắc CSS thực tế hay toạ độ pixel trên màn hình. Nút vẫn có đúng id, vẫn dẫn đúng tới trang giỏ hàng, dữ liệu vẫn khớp — nên mọi assert vẫn pass. Đây gọi là 'false negative' của test chức năng: test báo ổn trong khi thực tế người dùng đang gặp trải nghiệm tệ.",
        "The problem is: NONE of those functional tests catch this, because their assertions only check DOM attributes, the URL after clicking, or displayed text — they never check the actual CSS color or pixel coordinates on screen. The button still has the correct id, still leads to the correct cart page, the data still matches — so every assertion still passes. This is a functional test's 'false negative': the test reports everything is fine while users are actually having a bad experience.",
        "問題は、上記の機能テストのどれもこれを検出しないことです。アサーションはDOM属性、クリック後のURL、表示テキストしか確認せず、実際のCSSの色や画面上のピクセル座標は一切確認しないからです。ボタンは正しいidを持ち、正しくカートページへ遷移し、データも一致しているため、すべてのアサーションはパスし続けます。これが機能テストの『偽陰性』です：テストは問題なしと報告するのに、実際にはユーザーが悪い体験をしています。"),
      IMG(m_visualbug, "Trang sản phẩm ShopEasy thực tế: banner sai màu thương hiệu và nút Mua ngay bị lệch vị trí, chú thích lỗi", "ShopEasy's real product page: wrong brand color banner and a misaligned Buy now button, annotated", "ShopEasyの実際の商品ページ：ブランドカラーと異なるバナー色とズレた『今すぐ購入』ボタン、注記付き"),
      DEF("False negative của test chức năng", "trường hợp test chức năng báo PASS dù giao diện thực tế đã có lỗi hiển thị mà câu assert không kiểm tra tới.",
        "a case where a functional test reports PASS even though the actual UI has a display bug that the assertions never check.",
        "アサーションが確認しない表示バグが実際のUIにあるにもかかわらず、機能テストがPASSと報告するケース。"),
    ] },
  { heading: { vi: "3. Visual testing là gì & cách hoạt động: Baseline, Actual, Diff", en: "3. What visual testing is & how it works: Baseline, Actual, Diff", ja: "3. ビジュアルテストとは何か・仕組み：Baseline、Actual、Diff" },
    blocks: [
      P("Visual testing hoạt động dựa trên 3 ảnh. Ảnh 'baseline' là ảnh chuẩn, đã được con người xem qua và xác nhận là đúng thiết kế, thường được lưu ngay trong repo dưới một thư mục -snapshots đi kèm mã nguồn. Ảnh 'actual' là ảnh được chụp mới mỗi lần chạy test, phản ánh đúng giao diện thật tại thời điểm đó. Khi so sánh hai ảnh này theo từng pixel, công cụ sẽ tự sinh ra ảnh 'diff' — highlight rõ những vùng khác biệt bằng màu nổi bật (thường là đỏ hoặc hồng) để người xem nhận ra ngay chỗ nào đã đổi.",
        "Visual testing works around 3 images. The 'baseline' image is the reference, already reviewed by a human and confirmed to match the design, usually stored right in the repo under a -snapshots folder alongside the source code. The 'actual' image is freshly captured on every test run, reflecting the real UI at that moment. Comparing the two pixel by pixel, the tool automatically generates a 'diff' image — clearly highlighting the differing areas in a bright color (usually red or pink) so a viewer can immediately spot what changed.",
        "ビジュアルテストは3つの画像を中心に動作します。『baseline』画像は基準画像で、すでに人がレビューしデザイン通りだと確認済みのもので、通常はソースコードと一緒にリポジトリ内の-snapshotsフォルダに保存されます。『actual』画像はテスト実行のたびに新しく撮影され、その時点の実際のUIを反映します。この2つをピクセル単位で比較すると、ツールが自動的に『diff』画像を生成します——目立つ色（通常は赤やピンク）で違いのある領域を明確にハイライトし、見る人がどこが変わったかすぐわかるようにします。"),
      P("Với Playwright, lần đầu tiên bạn chạy expect(page).toHaveScreenshot() cho một trang chưa từng có ảnh baseline, Playwright sẽ tự động CHỤP và LƯU ảnh đó làm baseline, đồng thời báo cho bạn biết là đã tạo mới (không phải test fail thật). Từ lần chạy thứ hai trở đi, ảnh actual mới chụp sẽ được so với baseline đã lưu trước đó; nếu tỉ lệ pixel khác nhau vượt quá ngưỡng cho phép, test sẽ fail và Playwright đính kèm cả 3 ảnh — baseline, actual, diff — trong báo cáo HTML để bạn đối chiếu trực quan.",
        "In Playwright, the first time you run expect(page).toHaveScreenshot() for a page with no baseline yet, Playwright automatically CAPTURES and SAVES that image as the baseline, and tells you it just created a new one (not a real test failure). From the second run onward, the newly captured actual image is compared against the previously saved baseline; if the ratio of differing pixels exceeds the allowed threshold, the test fails and Playwright attaches all 3 images — baseline, actual, diff — in the HTML report for you to inspect visually.",
        "Playwrightでは、baseline画像がまだ存在しないページに対して初めてexpect(page).toHaveScreenshot()を実行すると、Playwrightは自動的にその画像を撮影・保存してbaselineとし、新規作成した旨を伝えます（本当のテスト失敗ではありません）。2回目以降の実行では、新しく撮影されたactual画像が以前保存されたbaselineと比較されます。異なるピクセルの割合が許容範囲を超えると、テストは失敗し、Playwrightは baseline、actual、diffの3つの画像すべてをHTMLレポートに添付し、視覚的に確認できるようにします。"),
      TIP("Đừng commit ảnh baseline ngay khi vừa auto-tạo mà chưa xem qua — hãy mở ảnh lên, đối chiếu với thiết kế thật của ShopEasy trước, để chắc chắn bạn không lỡ lưu luôn cả một bug đang có sẵn làm 'chuẩn'.", "Don't commit a freshly auto-generated baseline without reviewing it first — open the image and compare it against ShopEasy's real design, to make sure you don't accidentally lock in an existing bug as the 'standard'.", "自動生成されたばかりのbaselineを確認せずコミットしないでください——画像を開き、ShopEasyの実際のデザインと照らし合わせ、既存のバグをうっかり『基準』として固定しないようにしましょう。"),
    ] },
  { heading: { vi: "4. Viết test toHaveScreenshot đầu tiên (thực hành)", en: "4. Writing your first toHaveScreenshot test (hands-on)", ja: "4. 最初のtoHaveScreenshotテストを書く（実習）" },
    blocks: [
      P("Giờ ta viết test visual đầu tiên cho trang sản phẩm ShopEasy. Làm theo thứ tự dưới đây để có một test toHaveScreenshot chạy được ngay.",
        "Now let's write the first visual test for ShopEasy's product page. Follow the order below to get a runnable toHaveScreenshot test right away.",
        "では、ShopEasyの商品ページ用に最初のビジュアルテストを書きましょう。以下の順に沿って、すぐ動くtoHaveScreenshotテストを作りましょう。"),
      STEP(1, "Tạo thư mục tests/visual/ và file product-page.spec.js bên trong.", "Create a tests/visual/ folder and a product-page.spec.js file inside it.", "tests/visual/フォルダとその中にproduct-page.spec.jsファイルを作成する。"),
      STEP(2, "Import test, expect từ @playwright/test ở đầu file.", "Import test and expect from @playwright/test at the top of the file.", "ファイルの先頭で@playwright/testからtestとexpectをインポートする。"),
      STEP(3, "Trong test, goto trang sản phẩm ShopEasy rồi gọi expect(page).toHaveScreenshot('ten-anh.png').", "In the test, goto ShopEasy's product page then call expect(page).toHaveScreenshot('name.png').", "テスト内でShopEasyの商品ページにgotoし、expect(page).toHaveScreenshot('name.png')を呼ぶ。"),
      STEP(4, "Chạy npx playwright test lần đầu để Playwright tự tạo ảnh baseline, mở ảnh lên kiểm tra kỹ trước khi commit vào repo.", "Run npx playwright test once so Playwright auto-creates the baseline, then open and carefully review the image before committing it to the repo.", "npx playwright testを一度実行しPlaywrightにbaselineを自動生成させ、コミット前に画像を開いてよく確認する。"),
      CODE("javascript", "// tests/visual/product-page.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('trang san pham ShopEasy khong doi giao dien bat thuong', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/san-pham/tai-nghe-abc');\n  await expect(page).toHaveScreenshot('trang-san-pham.png');\n});"),
      TRY("Mở lại code trên và viết thêm 1 test chụp ảnh cho trang giỏ hàng ShopEasy (shopeasy.vn/gio-hang), đặt tên ảnh baseline khác với trang sản phẩm.", "Open the code above and write one more test capturing a screenshot of ShopEasy's cart page (shopeasy.vn/gio-hang), using a different baseline image name than the product page.", "上のコードを開き、ShopEasyのカートページ（shopeasy.vn/gio-hang）のスクリーンショットを撮る新しいテストを追加し、商品ページとは違うbaseline画像名を使ってみよう。"),
      TIP("Muốn thực hành trên dự án automation thật với mentor kèm sát, tham khảo khóa Software Testing chuyên nghiệp (Manual + Automation) tại CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/", "Want to practice on a real automation project with close mentorship? Check out CyberSoft's Professional Software Testing (Manual + Automation) course: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/", "メンターに密着指導してもらいながら実際の自動化プロジェクトで実践したいなら、CyberSoftのソフトウェアテスト専門コース（手動＋自動）をチェック：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/"),
    ] },
  { heading: { vi: "5. Ngưỡng khác biệt: threshold, maxDiffPixelRatio, mask", en: "5. Diff thresholds: threshold, maxDiffPixelRatio, mask", ja: "5. 差分の許容範囲：threshold、maxDiffPixelRatio、mask" },
    blocks: [
      P("Trên thực tế, hai ảnh chụp cùng một giao diện gần như không bao giờ giống hệt nhau 100% ở cấp độ pixel — dù giao diện logic hoàn toàn giống nhau. Nguyên nhân đến từ răng cưa khi render chữ (anti-aliasing), cách nén ảnh PNG, hay khác biệt cực nhỏ về thời điểm render của trình duyệt. Vì vậy Playwright cho phép bạn đặt một 'ngưỡng khác biệt' thay vì yêu cầu khớp tuyệt đối 100%, để test không báo fail oan vì những sai lệch cực nhỏ không ai nhìn thấy bằng mắt thường.",
        "In practice, two screenshots of the exact same UI almost never match 100% at the pixel level — even when the logical layout is identical. This comes from text anti-aliasing, PNG compression, or tiny differences in the browser's render timing. That's why Playwright lets you set a 'diff threshold' instead of requiring a perfect 100% match, so tests don't falsely fail over tiny differences no human eye would notice.",
        "実際には、まったく同じUIの2枚のスクリーンショットでも、論理的なレイアウトが完全に同一であっても、ピクセルレベルでほぼ100%一致することはありません。これはテキストのアンチエイリアシング、PNG圧縮、ブラウザのレンダリングタイミングのわずかな違いによるものです。そのためPlaywrightは、100%完全一致を要求する代わりに『差分の許容範囲』を設定できるようにしており、肉眼では誰も気づかないような微小な違いでテストが誤って失敗しないようにします。"),
      P("Có 4 tuỳ chọn thường dùng: 'threshold' chỉnh độ nhạy so khớp màu của từng pixel (giá trị từ 0 tới 1, càng thấp càng khắt khe); 'maxDiffPixelRatio' giới hạn tỉ lệ phần trăm pixel khác nhau tối đa vẫn coi là khớp; 'maxDiffPixels' giới hạn số lượng pixel khác nhau tối đa theo số tuyệt đối, phù hợp khi ảnh có kích thước cố định; và 'mask' cho phép chỉ định hẳn một vùng (qua locator) để LOẠI HOÀN TOÀN khỏi phép so sánh — rất hữu ích với vùng hiển thị giá flash sale hay đồng hồ đếm ngược liên tục đổi.",
        "There are 4 commonly used options: 'threshold' adjusts each pixel's color-matching sensitivity (0 to 1, lower is stricter); 'maxDiffPixelRatio' caps the maximum percentage of differing pixels still considered a match; 'maxDiffPixels' caps the maximum number of differing pixels as an absolute count, useful when the image has a fixed size; and 'mask' lets you specify a whole region (via a locator) to be COMPLETELY EXCLUDED from the comparison — very handy for a constantly changing flash-sale price or countdown timer.",
        "よく使われるオプションは4つあります：『threshold』は各ピクセルの色の一致感度を調整します（0から1、低いほど厳格）。『maxDiffPixelRatio』は一致とみなす異なるピクセルの最大割合を制限します。『maxDiffPixels』は画像サイズが固定の場合に便利な、異なるピクセルの絶対数の上限です。そして『mask』はロケーターである領域全体を比較から完全に除外できます——常に変わるフラッシュセール価格やカウントダウンタイマーにとても便利です。"),
      IMG(m_thresholdgrid, "Bảng các tuỳ chọn ngưỡng khác biệt trong toHaveScreenshot của Playwright và khi nào nên chỉnh", "Table of Playwright toHaveScreenshot's diff-threshold options and when to adjust each", "Playwright toHaveScreenshotの差分許容範囲オプション一覧と、それぞれをいつ調整すべきかの表"),
      CODE("javascript", "// tests/visual/product-page.spec.js\nconst { test, expect } = require('@playwright/test');\n\ntest('trang san pham - co mask vung dong va nguong sai lech', async ({ page }) => {\n  await page.goto('https://shopeasy.vn/san-pham/tai-nghe-abc');\n  await expect(page).toHaveScreenshot('trang-san-pham.png', {\n    mask: [page.locator('.dong-ho-dem-nguoc'), page.locator('.gia-flash-sale')],\n    maxDiffPixelRatio: 0.02,\n    threshold: 0.2,\n  });\n});"),
      TIP("Đừng đặt ngưỡng quá cao chỉ để test luôn pass cho 'yên chuyện' — làm vậy khiến visual testing mất hoàn toàn tác dụng cảnh báo, vì lỗi hiển thị thật cũng sẽ lọt qua như lỗi giả.", "Don't set the threshold too high just to make tests 'always pass' for convenience — doing so completely defeats visual testing's purpose, since real display bugs will slip through just like false positives.", "『とりあえずテストを通す』ために許容範囲を高く設定しすぎないでください——そうすると、本物の表示バグも誤検知と同じようにすり抜けてしまい、ビジュアルテストの警告機能が完全に無意味になります。"),
    ] },
  { heading: { vi: "6. Khi nào nên & không nên dùng visual testing", en: "6. When to use — and not use — visual testing", ja: "6. ビジュアルテストを使うべき時・使うべきでない時" },
    blocks: [
      P("Visual testing rất mạnh, nhưng KHÔNG nên chụp ảnh tràn lan cho mọi trang. Những trang có dữ liệu thay đổi liên tục (giá flash sale, số lượng tồn kho, đồng hồ đếm ngược) sẽ khiến ảnh actual gần như không bao giờ khớp baseline nếu không được mask kỹ, dẫn tới test fail giả liên tục — và khi test 'fail giả' quá nhiều lần, đội ngũ sẽ dần mất niềm tin, bắt đầu bỏ qua cảnh báo, kể cả khi có lỗi thật xảy ra.",
        "Visual testing is powerful, but you should NOT capture screenshots indiscriminately for every page. Pages with constantly changing data (flash-sale prices, stock counts, countdown timers) will almost never match the baseline unless carefully masked, causing repeated false failures — and once tests 'false-fail' too often, the team gradually loses trust and starts ignoring warnings, even real ones.",
        "ビジュアルテストは強力ですが、すべてのページで無差別にスクリーンショットを撮るべきではありません。常に変化するデータ（フラッシュセール価格、在庫数、カウントダウンタイマー）を持つページは、丁寧にmaskしない限りほぼ確実にbaselineと一致せず、繰り返し偽の失敗を引き起こします。テストが『偽の失敗』を何度も起こすと、チームは徐々に信頼を失い、本物のバグが発生していても警告を無視し始めてしまいます。"),
      IMG(m_whenuse, "Bảng gợi ý khi nào nên và không nên dùng visual testing, với ví dụ cụ thể trên ShopEasy", "A guide table for when to use — and not use — visual testing, with concrete ShopEasy examples", "ビジュアルテストを使うべき時・使うべきでない時のガイド表、ShopEasyの具体例付き"),
      P("Ưu tiên chọn những nơi giao diện tương đối ổn định và có giá trị lâu dài khi phát hiện lỗi: trang landing khuyến mãi ít đổi cấu trúc, các component dùng đi dùng lại ở nhiều màn hình (như thẻ sản phẩm, header, footer). Ngược lại, logic tính toán như tổng tiền giỏ hàng nên tiếp tục dùng assertion kiểm tra số liệu như trước — visual testing chỉ so khớp pixel, không hiểu được '398.000đ' là đúng hay sai về mặt nghiệp vụ.",
        "Prioritize areas with a relatively stable UI and lasting value once a bug is caught: rarely-restructured promo landing pages, components reused across many screens (like product cards, header, footer). Conversely, calculation logic like a cart's total price should keep using data assertions as before — visual testing only matches pixels, it has no idea whether '398,000₫' is correct or wrong from a business standpoint.",
        "UIが比較的安定しており、バグを検出したときの価値が長く続く箇所を優先しましょう：構造があまり変わらないプロモランディングページ、多くの画面で再利用されるコンポーネント（商品カード、ヘッダー、フッターなど）。逆に、カートの合計金額のような計算ロジックは、これまで通りデータのアサーションを使い続けるべきです——ビジュアルテストはピクセルの一致しか見ておらず、『398,000ドン』が業務的に正しいか誤りかは理解できません。"),
    ] },
  { heading: { vi: "7. Cập nhật baseline khi UI đổi hợp lệ", en: "7. Updating the baseline when the UI changes legitimately", ja: "7. UIが正当に変更されたときのbaseline更新" },
    blocks: [
      P("Ảnh baseline không phải 'chân lý vĩnh viễn'. Khi đội thiết kế chủ động thay đổi giao diện — đổi màu thương hiệu, bố cục lại trang sản phẩm, thêm huy hiệu khuyến mãi mới — ảnh baseline cũ ngay lập tức trở nên lỗi thời, và visual test sẽ báo fail dù đây là thay đổi ĐÚNG Ý, hoàn toàn không phải bug. Nếu không xử lý đúng cách, đội automation dễ hoảng loạn tưởng có lỗi thật, hoặc tệ hơn là chạy lệnh cập nhật bừa bãi mà không kiểm tra kỹ.",
        "A baseline image isn't 'eternal truth'. When the design team intentionally changes the UI — a new brand color, a restructured product page, a new promo badge — the old baseline immediately becomes outdated, and the visual test will fail even though this is an INTENTIONAL change, not a bug at all. Handled poorly, the automation team may panic thinking there's a real bug, or worse, run the update command carelessly without reviewing closely.",
        "baseline画像は『永遠の真実』ではありません。デザインチームが意図的にUIを変更したとき——新しいブランドカラー、商品ページのレイアウト変更、新しいプロモバッジの追加——古いbaselineはすぐに古くなり、ビジュアルテストは失敗を報告します。これはバグではなく意図的な変更であるにもかかわらずです。適切に対処しないと、自動化チームは本物のバグだとパニックになったり、さらに悪いことに、よく確認せず無造作に更新コマンドを実行してしまったりします。"),
      STEP(1, "Xác nhận với PM/designer đây có phải thay đổi CỐ Ý hay không, không tự ý quyết định một mình.", "Confirm with the PM/designer whether this is an INTENTIONAL change, don't decide alone.", "PM/デザイナーにこれが意図的な変更かどうか確認する。自分だけで判断しない。"),
      STEP(2, "Mở kỹ ảnh diff trong báo cáo HTML, đảm bảo KHÔNG có gì ngoài ý muốn trộn lẫn vào thay đổi thiết kế.", "Carefully open the diff image in the HTML report, making sure NOTHING unintended is mixed into the design change.", "HTMLレポート内のdiff画像をよく確認し、デザイン変更に意図しないものが混ざっていないことを確かめる。"),
      STEP(3, "Chạy npx playwright test --update-snapshots để ghi đè ảnh baseline cũ bằng ảnh mới đã xác nhận.", "Run npx playwright test --update-snapshots to overwrite the old baseline with the newly confirmed image.", "npx playwright test --update-snapshotsを実行し、確認済みの新しい画像で古いbaselineを上書きする。"),
      STEP(4, "Commit ảnh baseline mới kèm mô tả rõ lý do cập nhật trong Pull Request, để người review hiểu vì sao ảnh đổi.", "Commit the new baseline with a clear description of why it was updated in the Pull Request, so reviewers understand the change.", "更新理由を明記したうえで新しいbaselineをPull Requestにコミットし、レビュアーが変更理由を理解できるようにする。"),
      CODE("bash", "# Chay lai va cap nhat anh baseline sau khi UI thay doi HOP LE (da xac nhan)\nnpx playwright test tests/visual/product-page.spec.js --update-snapshots\n\n# Xem bao cao HTML de doi chieu anh baseline / actual / diff truoc khi commit\nnpx playwright show-report"),
      PITFALL("Chạy --update-snapshots bừa bãi mỗi khi thấy test visual báo đỏ, mà không mở ảnh diff ra xem trước. Làm vậy có thể vô tình 'hợp thức hoá' một bug hiển thị thật thành baseline mới, khiến bug đó biến mất khỏi mọi cảnh báo về sau.", "Running --update-snapshots carelessly every time a visual test turns red, without opening the diff image first. This can accidentally 'legitimize' a real display bug as the new baseline, making it disappear from every future warning.", "diff画像を確認せずに、ビジュアルテストが赤くなるたびに無造作に--update-snapshotsを実行すること。これは本物の表示バグを誤って新しいbaselineとして『正当化』してしまい、以降そのバグが二度と警告されなくなる恐れがあります。"),
    ] },
  { heading: { vi: "8. Tình huống 1: chức năng pass nhưng lỗi hiển thị lọt qua", en: "8. Situation 1: functional tests pass while a display bug slips through", ja: "8. シーン1：機能テストはパスするのに表示バグが見逃される" },
    blocks: [
      SITUATION("Bộ test chức năng của ShopEasy cho trang sản phẩm chạy xanh mỗi ngày: bấm 'Mua ngay' vẫn chuyển sang giỏ hàng, giá vẫn đúng dữ liệu backend. Đội automation hoàn toàn yên tâm vì mọi assert đều pass.", "ShopEasy's functional test suite for the product page runs green every day: clicking 'Buy now' still navigates to the cart, the price still matches backend data. The automation team feels fully confident since every assertion passes.",
        "Sau một bản deploy CSS mới, nút 'Mua ngay' bị đổi màu sai thương hiệu và lệch vị trí ~180px so với thiết kế, khiến nhiều khách hàng không nhận ra đó là nút bấm, tỉ lệ chuyển đổi giảm rõ rệt. Đội automation chỉ phát hiện ra sau khi bộ phận kinh doanh phàn nàn về doanh số, mất gần 3 ngày mới xác định đúng nguyên nhân là do CSS, không phải logic.", "After a new CSS deploy, the 'Buy now' button turns the wrong brand color and shifts about 180px from its design position, causing many customers to not recognize it as a button, and conversion rate drops noticeably. The automation team only discovers this after the business team complains about sales, taking nearly 3 days to correctly pin the cause on CSS, not logic.",
        "ShopEasyの商品ページ用の機能テストスイートは毎日グリーンで通っています：『今すぐ購入』をクリックすると変わらずカートに遷移し、価格もバックエンドのデータと一致し続けています。自動化チームは全アサーションがパスしているため完全に安心しきっています。",
        "新しいCSSデプロイの後、『今すぐ購入』ボタンはブランドと違う色に変わり、デザイン位置から約180pxズレてしまい、多くの顧客がそれをボタンだと認識できなくなり、コンバージョン率が明らかに低下します。自動化チームはビジネス側から売上の苦情が来て初めてこれに気づき、原因がロジックではなくCSSであると正しく特定するまでほぼ3日かかります。"),
      SOLVE("Thêm 1 test visual dùng expect(page).toHaveScreenshot() cho trang sản phẩm, chạy song song với bộ test chức năng hiện có trên CI. Ngay lần deploy tiếp theo có CSS lỗi, visual test báo fail ngay lập tức kèm ảnh diff khoanh vùng chính xác chỗ nút bị đổi màu và lệch vị trí, giúp phát hiện trong vài phút thay vì vài ngày.", "Add a visual test using expect(page).toHaveScreenshot() for the product page, running alongside the existing functional test suite on CI. On the very next deploy with a CSS bug, the visual test fails immediately with a diff image precisely circling where the button changed color and shifted, catching it in minutes instead of days.", "商品ページ用にexpect(page).toHaveScreenshot()を使ったビジュアルテストを追加し、既存の機能テストスイートと一緒にCI上で実行する。次のCSSバグを含むデプロイで、ビジュアルテストは即座に失敗し、ボタンの色と位置がズレた箇所を正確に示すdiff画像とともに報告されるため、数日ではなく数分で検出できるようになる。"),
      P("Bài học ở đây rất rõ: test chức năng và visual testing kiểm tra hai khía cạnh hoàn toàn khác nhau của cùng một tính năng — một bên là 'có hoạt động đúng không', bên kia là 'có trông đúng không'. Chỉ có cả hai cùng chạy song song mới đủ tự tin rằng một tính năng thực sự ổn với người dùng thật, chứ không chỉ ổn trên giấy tờ assert.",
        "The lesson here is clear: functional testing and visual testing check two completely different aspects of the same feature — one asks 'does it work correctly', the other asks 'does it look correct'. Only running both together gives you real confidence that a feature is genuinely fine for real users, not just fine on paper according to assertions.",
        "ここでの教訓は明確です：機能テストとビジュアルテストは、同じ機能の全く異なる2つの側面を確認します——一方は『正しく動くか』、もう一方は『正しく見えるか』です。両方を一緒に実行して初めて、ある機能がアサーション上だけでなく実際のユーザーにとって本当に問題ないと自信を持てます。"),
      IMG(m_jira, "Ticket lỗi ghi lại sự cố nút Mua ngay lệch vị trí & sai màu, chỉ visual test phát hiện được", "A bug ticket recording the misaligned, wrong-colored Buy now button — caught only by the visual test", "ズレて色も誤った『今すぐ購入』ボタンのインシデントを記録したバグチケット——ビジュアルテストだけが検出できた"),
      RECAP(["Test chức năng pass ≠ giao diện đúng — assert không 'nhìn' màu sắc/vị trí", "Visual test rút ngắn thời gian phát hiện lỗi hiển thị từ vài ngày xuống vài phút"],
        ["Passing functional tests ≠ correct UI — assertions don't 'see' color/position", "Visual tests shrink the detection time for display bugs from days to minutes"],
        ["機能テストのパス≠正しいUI——アサーションは色や位置を『見て』いない", "ビジュアルテストは表示バグの検出時間を数日から数分に短縮する"]),
    ] },
  { heading: { vi: "9. Tình huống 2: baseline flaky do font & anti-aliasing", en: "9. Situation 2: a flaky baseline caused by fonts & anti-aliasing", ja: "9. シーン2：フォントとアンチエイリアシングによるbaselineのflaky" },
    blocks: [
      SITUATION("Sau khi thêm visual test cho trang sản phẩm ShopEasy, đội automation thấy test này thỉnh thoảng fail ngẫu nhiên trên CI dù không ai đụng vào giao diện — chạy lại lần 2 thì lại pass bình thường.", "After adding a visual test for ShopEasy's product page, the automation team notices this test occasionally fails randomly on CI even though nobody touched the UI — rerunning it a second time passes normally.",
        "Xem kỹ ảnh diff mới thấy: khác biệt chỉ nằm ở vài pixel viền chữ mờ nhẹ, do máy CI (Linux, không có font hệ thống giống máy Mac của designer khi tạo baseline) render chữ hơi khác — hiện tượng gọi là anti-aliasing khác nhau giữa các môi trường. Vì threshold đang đặt quá thấp (gần như yêu cầu khớp tuyệt đối), chỉ cần lệch vài pixel viền chữ là đủ khiến test fail.",
        "Looking closely at the diff image reveals: the difference is just a few faintly blurred text-edge pixels, because the CI machine (Linux, without the same system fonts as the designer's Mac used to create the baseline) renders text slightly differently — a phenomenon called anti-aliasing differing across environments. Because the threshold is set too low (almost requiring a perfect match), even a few pixels of text-edge difference is enough to fail the test.",
        "ShopEasyの商品ページにビジュアルテストを追加した後、自動化チームは、誰もUIに触れていないのにこのテストがCI上でたまにランダムに失敗することに気づきます——2回目に再実行すると普通にパスします。",
        "diff画像をよく見ると、違いはテキストの輪郭のわずかにぼやけた数ピクセルだけであることがわかります。CIマシン（Linux、baseline作成時のデザイナーのMacと同じシステムフォントがない）がテキストをわずかに異なるようにレンダリングするためです——これは環境間でアンチエイリアシングが異なる現象と呼ばれます。thresholdが低すぎる（ほぼ完全一致を要求する）ため、テキストの輪郭がわずか数ピクセル違うだけでテストが失敗してしまいます。"),
      SOLVE("Tăng nhẹ maxDiffPixelRatio và threshold cho riêng test này (ví dụ threshold: 0.3, maxDiffPixelRatio: 0.03) để chấp nhận sai lệch nhỏ do anti-aliasing, đồng thời cấu hình chạy Playwright trong cùng 1 Docker image thống nhất cho cả máy tạo baseline lẫn máy CI, tránh khác biệt font giữa các hệ điều hành.", "Slightly increase maxDiffPixelRatio and threshold for this specific test (e.g. threshold: 0.3, maxDiffPixelRatio: 0.03) to tolerate small anti-aliasing differences, while also configuring Playwright to run inside the same unified Docker image for both the machine that generates the baseline and CI, avoiding font differences across operating systems.", "このテストに限ってmaxDiffPixelRatioとthresholdを少し上げ（例：threshold: 0.3、maxDiffPixelRatio: 0.03）、アンチエイリアシングによる小さな差異を許容するようにする。同時に、baseline生成マシンとCIの両方でPlaywrightを同じ統一Dockerイメージ内で実行するよう設定し、OS間のフォントの違いを避ける。"),
      P("Đây là bài học kinh điển về 'flaky test' trong visual testing: nguyên nhân hiếm khi là do logic sai, mà thường tới từ môi trường render không đồng nhất. Giải pháp bền vững nhất không phải là tắt hẳn visual test vì 'hay báo sai', mà là đưa môi trường tạo baseline và môi trường chạy CI về CÙNG một cấu hình (cùng hệ điều hành, cùng phiên bản trình duyệt) kết hợp với ngưỡng khác biệt hợp lý.",
        "This is a classic lesson about 'flaky tests' in visual testing: the cause is rarely wrong logic, but usually an inconsistent rendering environment. The most sustainable fix isn't disabling visual tests because they 'false-fail too often', but aligning the baseline-generating environment and the CI environment to the SAME configuration (same OS, same browser version) combined with a reasonable diff threshold.",
        "これはビジュアルテストにおける『flakyテスト』の典型的な教訓です：原因がロジックの誤りであることは稀で、多くはレンダリング環境の不統一から来ます。最も持続可能な解決策は、『よく誤検知する』からとビジュアルテストを無効化することではなく、baseline生成環境とCI環境を同じ構成（同じOS、同じブラウザバージョン）に揃え、適切な差分許容範囲と組み合わせることです。"),
      IMG(m_dashboard, "Dashboard kết quả chạy visual testing hàng tuần trên ShopEasy sau khi xử lý flaky do font", "Weekly visual testing results dashboard for ShopEasy after fixing the font-related flakiness", "フォント起因のflakyを修正した後のShopEasy週次ビジュアルテスト結果ダッシュボード"),
      TIP("Nếu muốn được kèm 1-1 để rà lại toàn bộ cấu hình CI/baseline của dự án automation thật, tham khảo lớp 1 kèm 1 tại CyberSoft: https://cybersoft.edu.vn/trainning-course-1vs1/", "If you'd like 1-on-1 mentoring to review your real automation project's entire CI/baseline setup, check CyberSoft's 1-on-1 class: https://cybersoft.edu.vn/trainning-course-1vs1/", "実際の自動化プロジェクトのCI/baseline設定全体を見直すための1対1指導を希望するなら、CyberSoftの1対1クラスをチェック：https://cybersoft.edu.vn/trainning-course-1vs1/"),
    ] },
  { heading: { vi: "10. Lỗi hay gặp, mẹo & câu hỏi thường gặp", en: "10. Common mistakes, tips & FAQ", ja: "10. よくある失敗・コツ・よくある質問" },
    blocks: [
      PITFALL("Chụp ảnh toàn trang (fullPage) cho những trang có quá nhiều nội dung động (banner xoay, số lượt xem realtime), khiến gần như lần chạy nào cũng fail. Chỉ nên chụp đúng vùng ổn định cần kiểm tra, hoặc mask kỹ các vùng động.", "Capturing a fullPage screenshot for pages with too much dynamic content (rotating banners, real-time view counts), causing almost every run to fail. Only capture the stable area that actually needs checking, or carefully mask the dynamic regions.", "回転バナーやリアルタイム閲覧数など動的なコンテンツが多すぎるページでfullPageスクリーンショットを撮影し、ほぼ毎回失敗させてしまうこと。確認が必要な安定した領域だけを撮影するか、動的な領域を丁寧にmaskすべきです。"),
      PITFALL("Đặt tất cả ảnh baseline của mọi trình duyệt/hệ điều hành chung 1 tên file, khiến ảnh baseline chụp trên Chrome bị dùng nhầm để so với ảnh actual chụp trên Firefox — hai trình duyệt luôn render hơi khác nhau dù cùng 1 giao diện.", "Using the same filename for baseline images across every browser/OS, causing a baseline captured on Chrome to be mistakenly compared against an actual image captured on Firefox — two browsers always render slightly differently even for the identical UI.", "すべてのブラウザ/OSのbaseline画像に同じファイル名を使い、Chromeで撮影したbaselineがFirefoxで撮影したactualと誤って比較されてしまうこと——同じUIでも2つのブラウザは常にわずかにレンダリングが異なります。"),
      TIP("Khi thêm 1 trang mới cần visual test, luôn tự hỏi: 'trang này có dữ liệu động không, cần mask vùng nào không?' trước khi viết test — thói quen này giúp bộ visual test ổn định lâu dài, ít flaky.", "When adding a new page for visual testing, always ask: 'does this page have dynamic data, does anything need masking?' before writing the test — this habit keeps your visual test suite stable and less flaky over time.", "ビジュアルテスト対象に新しいページを追加するとき、テストを書く前に必ず『このページに動的なデータはあるか、maskすべき箇所はあるか？』と自問しよう——この習慣が長期的にビジュアルテストスイートを安定させ、flakyを減らします。"),
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
      INTERNAL("Kiểm thử đa trình duyệt (Cross-browser) cho người mới", "Cross-browser testing for beginners", "kiem-thu-da-trinh-duyet-cross-browser-cho-nguoi-moi", "初心者のためのクロスブラウザテスト"),
      INTERNAL("Assertion — kiểm chứng kết quả cho người mới", "Assertions for beginners", "assertion-kiem-chung-ket-qua-cho-nguoi-moi", "初心者のためのアサーション"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học kiểm thử hình ảnh (visual testing) qua trang sản phẩm thật của ShopEasy: vì sao test chức năng pass mà giao diện vẫn có thể vỡ, cách hoạt động của Baseline/Actual/Diff, cách viết test toHaveScreenshot của Playwright, cách đặt ngưỡng khác biệt (threshold, maxDiffPixelRatio, mask), khi nào nên và không nên dùng visual testing, và cách cập nhật baseline đúng cách khi UI đổi hợp lệ. Hai tình huống thật cho thấy cả giá trị (bắt lỗi hiển thị mà test chức năng bỏ sót) lẫn cái bẫy (baseline flaky do font/anti-alias) của kỹ thuật này. Trong bối cảnh AI ngày càng hỗ trợ sinh test case nhanh hơn, khả năng xác nhận giao diện đúng ý đồ thiết kế bằng visual testing vẫn là kỹ năng con người cần làm chủ — được huấn luyện bài bản tại khóa Software Testing chuyên nghiệp của CyberSoft: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
        "You just learned visual testing through ShopEasy's real product page: why functional tests can pass while the UI still breaks, how Baseline/Actual/Diff work, how to write a Playwright toHaveScreenshot test, how to set diff thresholds (threshold, maxDiffPixelRatio, mask), when to use — and not use — visual testing, and how to properly update the baseline when the UI changes legitimately. Two real situations showed both the value (catching display bugs functional tests miss) and the trap (a flaky baseline from font/anti-aliasing) of this technique. As AI increasingly helps generate test cases faster, the ability to confirm the UI matches the intended design through visual testing remains a human skill worth mastering — taught properly in CyberSoft's Professional Software Testing course: https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
        "ShopEasyの実際の商品ページを通じてビジュアルテストを学びました：機能テストがパスしてもUIが壊れうる理由、Baseline/Actual/Diffの仕組み、PlaywrightのtoHaveScreenshotテストの書き方、差分許容範囲の設定方法（threshold、maxDiffPixelRatio、mask）、ビジュアルテストを使うべき時・使うべきでない時、そしてUIが正当に変更されたときの正しいbaseline更新方法。2つの実例は、この手法の価値（機能テストが見逃す表示バグの検出）と落とし穴（フォント/アンチエイリアシングによるbaselineのflaky）の両方を示しました。AIがテストケースをますます高速に生成する中でも、ビジュアルテストでUIが意図した設計通りかを確認する能力は人が習得すべきスキルであり続けます——CyberSoftのソフトウェアテスト専門コースで体系的に学べます：https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/"),
      P("Chặng tiếp theo, bạn nên tìm hiểu thêm về tích hợp visual testing vào pipeline CI/CD (chỉ chạy trên nhánh chính, hoặc tự động comment ảnh diff vào Pull Request), cùng cách tổ chức thư mục baseline theo từng trình duyệt/thiết bị để bộ test vừa đáng tin cậy vừa dễ bảo trì. Nếu muốn học bài bản từ con số 0 tới đi làm, có mentor hướng dẫn và dự án automation thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Automation Tester.",
        "Next, you should look into integrating visual testing into your CI/CD pipeline (only running it on the main branch, or auto-commenting diff images on Pull Requests), along with organizing baseline folders per browser/device so your test suite is both reliable and maintainable. If you want to learn properly from zero to hired with a mentor and real automation projects, a Tester course helps you progress fast and apply confidently for an Automation Tester role.",
        "次は、ビジュアルテストをCI/CDパイプラインに統合する方法（メインブランチのみで実行する、Pull Requestにdiff画像を自動コメントするなど）や、baselineフォルダをブラウザ/デバイスごとに整理する方法を学ぶとよいでしょう——テストスイートを信頼性が高く保守しやすいものにするためです。指導者と実際の自動化プロジェクトでゼロから就職まで体系的に学びたいなら、テスターコースが速い成長とAutomation Testerポジションへの自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const VISUAL_01 = makeDoc({
  slug: "kiem-thu-hinh-anh-visual-testing-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử hình ảnh visual",
  keywords: ["kiểm thử hình ảnh visual", "visual testing", "screenshot testing", "playwright tohavescreenshot", "so sánh ảnh giao diện cho người mới"],
  coverLabel: "NGƯỜI MỚI · VISUAL TESTING · TMĐT",
  crumb: "Kiểm thử hình ảnh (visual testing) cho người mới",
  metaTitle: { vi: "Kiểm thử hình ảnh visual cho người mới", en: "Visual testing for beginners", ja: "初心者向けビジュアルテスト" },
  metaDescription: {
    vi: "Kiểm thử hình ảnh visual cho người mới: so ảnh baseline/actual bằng toHaveScreenshot của Playwright trên ShopEasy, đặt ngưỡng khác biệt, có code chạy và trắc nghiệm.",
    en: "Visual testing for beginners: comparing baseline and actual screenshots with Playwright's toHaveScreenshot on ShopEasy, setting diff thresholds, with runnable code and a quiz at the end.",
    ja: "初心者向けビジュアルテスト：PlaywrightのtoHaveScreenshotでShopEasyのbaselineとactual画像を比較し、差分許容範囲を設定、動くコードと最後にクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử hình ảnh (visual testing) cho người mới: bắt lỗi hiển thị bằng Playwright (có code chạy được)",
    en: "Visual testing for beginners: catching display bugs with Playwright (with runnable code)",
    ja: "初心者のためのビジュアルテスト：Playwrightで表示バグを検出する（動くコード付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử hình ảnh (visual/screenshot testing) qua app TMĐT ShopEasy. Vì sao test chức năng pass mà giao diện vẫn vỡ, cách hoạt động Baseline/Actual/Diff, viết test toHaveScreenshot của Playwright, đặt ngưỡng khác biệt (threshold/mask), khi nào nên dùng, cách cập nhật baseline hợp lệ, hai tình huống thật, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn visual/screenshot testing through the ShopEasy e-commerce app. Why functional tests can pass while the UI still breaks, how Baseline/Actual/Diff work, writing a Playwright toHaveScreenshot test, setting diff thresholds (threshold/mask), when to use it, how to update the baseline correctly, two real situations, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft's Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでビジュアル/スクリーンショットテストを学ぶ。機能テストがパスしてもUIが壊れうる理由、Baseline/Actual/Diffの仕組み、PlaywrightのtoHaveScreenshotテストの書き方、差分許容範囲（threshold/mask）の設定、使うべき時、正しいbaseline更新方法、2つの実例、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách thêm visual testing bằng Playwright", steps: [
    { name: "Viết test toHaveScreenshot đầu tiên", text: "Goto trang cần kiểm tra rồi gọi expect(page).toHaveScreenshot() để tạo baseline." },
    { name: "Đặt ngưỡng khác biệt hợp lý", text: "Dùng threshold, maxDiffPixelRatio, mask để tránh báo sai do dữ liệu động hay anti-aliasing." },
    { name: "Cập nhật baseline khi UI đổi hợp lệ", text: "Xác nhận thay đổi cố ý, xem ảnh diff, rồi chạy --update-snapshots." },
  ] },
  pages,
});

export const AU_VISUAL_01 = [VISUAL_01];
