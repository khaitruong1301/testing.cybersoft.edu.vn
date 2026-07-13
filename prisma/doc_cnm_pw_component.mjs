// doc_cnm_pw_component.mjs — BÀI CHUYÊN CÔNG NGHỆ: Playwright Component Testing (CT).
// Test 1 component UI cô lập (không cần server/DB thật), nhanh hơn E2E rất nhiều, khi nào
// nên dùng, cách viết test thật. Bám app TMĐT ShopEasy. Song ngữ vi/en/ja (ja≠en), 12 chương,
// nhiều mockup giao diện, trắc nghiệm, chuẩn SEO.
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
    categorySlug: "playwright-tools", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", cfg.domain, "playwright", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình chạy Playwright CT — mount ProductCard cô lập ──
const m_ctScreen = browser("localhost:3100/__ct/ProductCard.spec.tsx", [
  panel("ShopEasy · Component Test: ProductCard (mount cô lập, không cần server thật)", [
    field(24, 20, 330, "Props truyền vào: name", "Tai nghe Bluetooth X200", "normal"),
    field(372, 20, 330, "Props truyền vào: price", "590.000 ₫", "normal"),
    field(24, 92, 330, "Props truyền vào: inStock", "false", "normal"),
    field(372, 92, 330, "Kết quả assert", "2/2 assertions passed", "normal"),
    btn(24, 164, 240, "▶ Chạy lại (mount)", "primary"),
    annotate(280, 150, 380, 52, "render component < 60ms, không gọi API thật"),
  ].join(""), { h: 320, accent: "#2563eb" }),
].join(""), { h: 376, title: "Playwright CT · Isolated", accent: "#2563eb" });

// ── Mockup 2: kim tự tháp Unit → Component → E2E ──
const m_pyramid = moduleFlow("Unit → Component → E2E: mỗi tầng test một phạm vi khác nhau", [
  { id: "unit", label: "Unit Test", x: 110, y: 90, sub: "~5 ms/test · logic thuần" },
  { id: "ct", label: "Component Test (CT)", x: 380, y: 200, sub: "~40–150 ms/test · UI cô lập" },
  { id: "e2e", label: "E2E Test", x: 650, y: 90, sub: "~2–8 s/test · cả hệ thống thật" },
], [
  { from: "unit", to: "ct", label: "thêm UI thật (render + sự kiện)" },
  { from: "ct", to: "e2e", label: "thêm mạng, DB, trình duyệt thật" },
], { accent: "#2563eb", h: 280 });

// ── Mockup 3: bảng so sánh Component Testing và E2E Testing ──
const m_compare = grid("So sánh Component Testing (CT) và E2E Testing", ["Tiêu chí", "Component Testing", "E2E Testing"], [
  ["Phạm vi kiểm tra", "1 component UI cô lập", "Toàn bộ luồng qua trình duyệt thật"],
  ["Tốc độ mỗi test", "~40–150 ms", "~2–8 giây"],
  ["Cần server/API thật?", "Không — mock props/callback", "Có, hoặc mock network"],
  ["Bắt lỗi tốt nhất ở", "Logic hiển thị, props, state, sự kiện", "Luồng nghiệp vụ & tích hợp thật"],
  ["Độ ổn định (ít flaky)", "Rất cao", "Dễ flaky hơn (mạng, thời gian tải)"],
  ["Chạy khi nào", "Mỗi lần sửa component, ngay trong PR", "Trước khi release, luồng quan trọng"],
], { accent: "#2563eb", highlight: 1 });

// ── Mockup 4: component MiniCartWidget — test riêng từng state ──
const m_cartWidget = panel("ShopEasy · Component: MiniCartWidget — mount riêng từng trạng thái", [
  field(24, 20, 330, "State: empty (0 sản phẩm)", "Hiện dòng chữ 'Giỏ hàng trống'", "normal"),
  field(372, 20, 330, "State: has items (3 sản phẩm)", "Tổng tiền 1.770.000 ₫", "normal"),
  field(24, 92, 330, "State: nhập số lượng vượt tồn kho", "Nhập 99 khi tồn kho 12", "error"),
  field(372, 92, 330, "State: loading khi vừa mount", "Hiện skeleton trong 200ms", "normal"),
  annotate(20, 78, 340, 52, "BUG chỉ CT bắt được: nút Cập nhật vẫn bấm được"),
].join(""), { h: 210, accent: "#7c3aed" });

// ── Mockup 5: dashboard tốc độ CI trước & sau khi thêm Playwright CT ──
const m_dashSpeed = dashboard("Tốc độ CI — trước & sau khi thêm Component Testing (ShopEasy)", [
  { label: "Test CT mới thêm", value: "86", sub: "component UI cô lập", color: "#2563eb" },
  { label: "Thời gian chạy CT", value: "38s", sub: "toàn bộ 86 test", color: "#16a34a" },
  { label: "Nếu viết bằng E2E", value: "9m 40s", sub: "ước tính cùng 86 ca", color: "#e11d48" },
  { label: "Lỗi bắt sớm hơn", value: "+64%", sub: "phát hiện ngay trong PR", color: "#f59e0b" },
]);

// ── Mockup 6: ticket lỗi phát hiện nhờ Component Testing ──
const m_ticket = jira({
  key: "SE-11020", title: "MiniCartWidget: vẫn cho bấm 'Cập nhật' khi số lượng nhập vượt tồn kho",
  type: "Bug", status: "Open", priority: "High", severity: "High",
  fields: [
    ["Phát hiện bởi", "Playwright Component Test — MiniCartWidget.spec.tsx"],
    ["Props/State test", "quantity=99, stock=12 (mount cô lập, không qua E2E)"],
    ["Kết quả thực tế", "Nút 'Cập nhật' vẫn enabled, không có cảnh báo"],
    ["Kết quả mong đợi", "Nút disable + hiện 'Vượt tồn kho (12)'"],
    ["Ghi chú", "E2E không bắt được vì luôn test với số lượng hợp lệ"],
  ],
});

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Component Testing khác gì Unit Test?",
  "How is Component Testing different from a Unit Test?",
  "Unit Test kiểm tra một hàm/logic thuần, không liên quan giao diện. Component Testing (CT) của Playwright thật sự MOUNT (dựng lên) một component UI trong trình duyệt thật, rồi tương tác như người dùng: click, nhập liệu, đọc DOM. Nói cách khác, CT là 'E2E thu nhỏ' cho đúng một component, còn Unit Test không đụng tới DOM/trình duyệt.",
  "A Unit Test checks a pure function/logic, unrelated to the UI. Playwright's Component Testing (CT) actually MOUNTS a UI component in a real browser, then interacts like a user: click, type, read the DOM. In other words, CT is a 'mini E2E' for exactly one component, while a Unit Test never touches the DOM/browser.",
  "コンポーネントテストとユニットテストの違いは？",
  "ユニットテストは純粋な関数・ロジックのみを検証し、UIには関わりません。PlaywrightのComponent Testing（CT）は実際のブラウザでUIコンポーネントを本当にマウント（描画）し、クリック・入力・DOM読み取りなどユーザーのように操作します。つまりCTは1つのコンポーネントに限定した『小さなE2E』であり、ユニットテストはDOM/ブラウザに一切触れません。");
const faq2 = FAQ(
  "Playwright Component Testing có thay thế được E2E không?",
  "Can Playwright Component Testing replace E2E?",
  "Không nên thay thế hoàn toàn. CT cô lập từng component nên không phát hiện được lỗi tích hợp giữa các module, lỗi API thật, hay lỗi luồng nghiệp vụ dài (ví dụ toàn bộ quy trình thanh toán). Chiến lược đúng là dùng CT cho phần lớn logic hiển thị/UI (nhanh, ổn định), và giữ một số E2E cho các luồng nghiệp vụ quan trọng nhất, như một kim tự tháp kiểm thử.",
  "It shouldn't fully replace E2E. Since CT isolates each component, it can't catch integration bugs between modules, real API issues, or long business flows (e.g. the whole checkout process). The right strategy is to use CT for most display/UI logic (fast, stable) and keep a smaller set of E2E tests for the most critical business flows, forming a test pyramid.",
  "Playwright Component TestingはE2Eを完全に置き換えられる？",
  "完全な置き換えは推奨されません。CTは各コンポーネントを孤立させるため、モジュール間の結合バグ、実際のAPI問題、長い業務フロー（例：決済プロセス全体）は検知できません。正しい戦略は、表示/UIロジックの大部分にCT（高速・安定）を使い、最も重要な業務フローには少数のE2Eを残す、テストピラミッドの形です。");
const faq3 = FAQ(
  "Playwright Component Testing hỗ trợ những framework nào?",
  "Which frameworks does Playwright Component Testing support?",
  "Playwright CT hỗ trợ chính thức React, Vue và Svelte thông qua các gói riêng như @playwright/experimental-ct-react, @playwright/experimental-ct-vue, @playwright/experimental-ct-svelte. Mỗi gói cung cấp hàm `mount` phù hợp cú pháp component của framework đó, còn cách viết assertion (expect, locator) vẫn giống hệt Playwright thông thường mà bạn đã quen.",
  "Playwright CT officially supports React, Vue, and Svelte through dedicated packages such as @playwright/experimental-ct-react, @playwright/experimental-ct-vue, and @playwright/experimental-ct-svelte. Each package provides a `mount` function matching that framework's component syntax, while assertions (expect, locator) stay identical to regular Playwright you already know.",
  "Playwright Component Testingはどのフレームワークに対応？",
  "Playwright CTはReact、Vue、Svelteに正式対応しており、@playwright/experimental-ct-react、@playwright/experimental-ct-vue、@playwright/experimental-ct-svelteといった専用パッケージを通じて提供されます。各パッケージはそのフレームワークの構文に合った`mount`関数を提供し、アサーション（expect、locator）はおなじみの通常のPlaywrightと全く同じです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Playwright Component Testing (CT) làm gì khác với E2E Testing?", en: "What does Playwright Component Testing (CT) do differently from E2E testing?", ja: "Playwright Component Testing（CT）はE2Eテストと何が違う？" },
    options: [
      { vi: "Chỉ kiểm tra HTML tĩnh, không tương tác", en: "Only checks static HTML, no interaction", ja: "静的HTMLのみを確認し操作しない" },
      { vi: "Mount (dựng) một component UI cô lập trong trình duyệt thật rồi tương tác trực tiếp, không cần chạy cả app/server", en: "Mounts one UI component in isolation in a real browser and interacts directly, without running the whole app/server", ja: "実ブラウザで1つのUIコンポーネントを孤立してマウントし直接操作、アプリ/サーバー全体は不要" },
      { vi: "Chạy test trên máy chủ, không có trình duyệt", en: "Runs tests on a server, no browser", ja: "サーバー上で実行しブラウザを使わない" },
      { vi: "Giống hệt Unit Test, không đụng DOM", en: "Identical to a Unit Test, never touches the DOM", ja: "ユニットテストと全く同じでDOMに触れない" },
    ], correct: 1,
    explain: { vi: "CT dùng hàm mount() để dựng đúng một component trong trình duyệt thật, tương tác như người dùng, nhưng không cần server/DB/API thật như E2E.", en: "CT uses mount() to render exactly one component in a real browser and interact like a user, without needing a real server/DB/API like E2E does.", ja: "CTはmount()で実ブラウザに1つのコンポーネントだけを描画しユーザーのように操作するが、E2Eのような実サーバー/DB/APIは不要。" },
  }),
  mcq({
    q: { vi: "Vì sao Playwright CT thường chạy nhanh hơn E2E rất nhiều?", en: "Why does Playwright CT usually run much faster than E2E?", ja: "なぜPlaywright CTは通常E2Eよりずっと高速？" },
    options: [
      { vi: "Vì CT bỏ qua assertion", en: "Because CT skips assertions", ja: "CTがアサーションを省くから" },
      { vi: "Vì CT không mở trình duyệt", en: "Because CT doesn't open a browser", ja: "CTがブラウザを開かないから" },
      { vi: "Vì CT không cần điều hướng trang, gọi API thật hay chờ toàn bộ app tải xong — chỉ mount đúng 1 component", en: "Because CT doesn't need page navigation, real API calls, or waiting for the whole app to load — it only mounts one component", ja: "CTはページ遷移・実API呼び出し・アプリ全体の読み込み待ちが不要で、1コンポーネントのみマウントするから" },
      { vi: "Vì CT chạy song song vô hạn", en: "Because CT runs with infinite parallelism", ja: "CTが無限に並列実行されるから" },
    ], correct: 2,
    explain: { vi: "CT tránh được chi phí điều hướng, mạng thật và tải toàn bộ app — đúng lý do E2E chậm và hay flaky hơn.", en: "CT avoids the overhead of navigation, real network calls, and loading the whole app — exactly why E2E is slower and more flaky.", ja: "CTはページ遷移・実ネットワーク・アプリ全体読み込みのコストを避ける — これがE2Eが遅くflakyになる理由そのもの。" },
  }),
  mcq({
    q: { vi: "Bạn nên ưu tiên dùng Playwright CT khi nào?", en: "When should you prioritize using Playwright CT?", ja: "Playwright CTを優先すべきなのはいつ？" },
    options: [
      { vi: "Khi cần kiểm tra toàn bộ luồng thanh toán qua nhiều trang", en: "When checking the entire checkout flow across many pages", ja: "複数ページにまたがる決済フロー全体を確認するとき" },
      { vi: "Khi cần kiểm tra logic hiển thị/props/state của một component UI riêng lẻ, muốn phản hồi nhanh trong PR", en: "When you need to check display logic/props/state of a single UI component and want fast feedback in a PR", ja: "単一UIコンポーネントの表示ロジック/props/stateを確認し、PRで素早いフィードバックが欲しいとき" },
      { vi: "Khi cần kiểm tra tích hợp với hệ thống thanh toán bên thứ ba", en: "When checking integration with a third-party payment system", ja: "サードパーティ決済システムとの統合を確認するとき" },
      { vi: "Khi không có component nào cần test", en: "When there is no component to test", ja: "テストすべきコンポーネントが無いとき" },
    ], correct: 1,
    explain: { vi: "CT hợp nhất cho phạm vi hẹp, tốc độ cao: đúng một component với các props/state khác nhau — lý tưởng để chạy ngay trong mỗi Pull Request.", en: "CT fits a narrow, fast scope: exactly one component with varying props/state — ideal to run right inside every Pull Request.", ja: "CTは狭く高速な範囲に適する：異なるprops/stateを持つ1つのコンポーネント — 各プルリクエストで即実行するのに理想的。" },
  }),
  mcq({
    q: { vi: "Để bắt đầu viết Playwright CT cho React, bạn cần thiết lập gì?", en: "To start writing Playwright CT for React, what do you need to set up?", ja: "ReactでPlaywright CTを始めるには何を設定する必要がある？" },
    options: [
      { vi: "Chỉ cần playwright.config.ts như E2E bình thường", en: "Just a regular playwright.config.ts like E2E", ja: "通常のE2E用playwright.config.tsだけでよい" },
      { vi: "Cài @playwright/experimental-ct-react và dùng file cấu hình riêng (vd playwright-ct.config.ts) cùng hàm mount()", en: "Install @playwright/experimental-ct-react and use a dedicated config file (e.g. playwright-ct.config.ts) plus the mount() function", ja: "@playwright/experimental-ct-reactを導入し専用の設定ファイル（例：playwright-ct.config.ts）とmount()関数を使う" },
      { vi: "Không cần cài thêm gì, dùng luôn @playwright/test", en: "No extra install needed, just use @playwright/test directly", ja: "追加インストール不要で@playwright/testをそのまま使う" },
      { vi: "Cần một trình duyệt headless riêng biệt cho CT", en: "You need a completely separate headless browser for CT", ja: "CT専用の別のヘッドレスブラウザが必要" },
    ], correct: 1,
    explain: { vi: "Gói @playwright/experimental-ct-react cung cấp fixture mount() và cần file cấu hình CT riêng, khác với playwright.config.ts thường dùng cho E2E.", en: "The @playwright/experimental-ct-react package provides the mount() fixture and needs a dedicated CT config file, separate from the usual E2E playwright.config.ts.", ja: "@playwright/experimental-ct-reactパッケージはmount()フィクスチャを提供し、通常のE2E用playwright.config.tsとは別のCT専用設定ファイルが必要。" },
  }),
  mcq({
    q: { vi: "Trong ví dụ MiniCartWidget ở bài, vì sao Component Testing bắt được bug mà E2E đã bỏ sót?", en: "In the article's MiniCartWidget example, why did Component Testing catch a bug that E2E missed?", ja: "本記事のMiniCartWidget例で、なぜCTはE2Eが見逃したバグを検知できた？" },
    options: [
      { vi: "Vì CT chạy nhiều lần hơn E2E", en: "Because CT runs more times than E2E", ja: "CTがE2Eより多く実行されるから" },
      { vi: "Vì CT có thể mount trực tiếp state 'số lượng vượt tồn kho' mà kịch bản E2E thường không đi qua", en: "Because CT can directly mount the 'quantity exceeds stock' state that typical E2E scripts rarely pass through", ja: "CTはE2Eのシナリオが通常通らない『在庫超過数量』状態を直接マウントできるから" },
      { vi: "Vì E2E không có assertion", en: "Because E2E has no assertions", ja: "E2Eにはアサーションが無いから" },
      { vi: "Vì CT dùng dữ liệu thật từ production", en: "Because CT uses real production data", ja: "CTが本番データを使うから" },
    ], correct: 1,
    explain: { vi: "CT cho phép truyền thẳng props/state hiếm gặp (như số lượng=99, tồn kho=12) mà không cần dựng lại toàn bộ luồng để tạo ra tình huống đó như E2E.", en: "CT lets you pass rare props/state directly (like quantity=99, stock=12) without rebuilding the whole flow to reach that situation, unlike E2E.", ja: "CTは（数量=99、在庫=12のような）稀なprops/stateを直接渡せ、E2Eのようにその状況に至るまでフロー全体を再現する必要がない。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & Playwright Component Testing là gì", en: "1. TL;DR & what Playwright Component Testing is", ja: "1. 要点とPlaywright Component Testingとは" },
    blocks: [
      TLDR("Playwright Component Testing (CT) cho phép bạn mount (dựng lên) một component UI cô lập trong trình duyệt thật rồi test riêng nó — không cần chạy cả app, server hay database. Kết quả: test nhanh hơn E2E hàng chục lần, ổn định hơn, và giúp bạn bắt lỗi hiển thị/props/state ngay khi component vừa được viết. Bài này bám app TMĐT ShopEasy: bạn sẽ test component ProductCard và MiniCartWidget, có mockup, tình huống thực tế và trắc nghiệm cuối bài.",
        "Playwright Component Testing (CT) lets you mount a UI component in isolation inside a real browser and test just that component — no need to run the whole app, server, or database. The result: tests run dozens of times faster than E2E, are more stable, and let you catch display/props/state bugs right when a component is written. This article follows the ShopEasy e-commerce app: you'll test the ProductCard and MiniCartWidget components, with mockups, real situations, and a quiz at the end.",
        "Playwright Component Testing（CT）は、実ブラウザ内でUIコンポーネントを孤立してマウント（描画）し、そのコンポーネントだけをテストできます — アプリ全体・サーバー・データベースの起動は不要です。結果として、テストはE2Eより何十倍も高速で安定し、コンポーネントを書いた瞬間に表示/props/stateのバグを検知できます。本記事はECアプリShopEasyに沿い、ProductCardとMiniCartWidgetコンポーネントをテストし、モック・実際のシーン・最後にクイズがあります。"),
      P("Chào bạn! Khi mới làm quen với automation, bạn thường học Playwright qua các test E2E: mở trình duyệt, vào trang, điền form, bấm nút. Cách đó rất trực quan nhưng có một vấn đề: mỗi test phải tải cả một trang web, đôi khi cả một luồng nhiều bước, nên chạy chậm và dễ 'flaky' (lúc pass lúc fail) vì phụ thuộc mạng, tốc độ server. Component Testing giải quyết đúng vấn đề đó cho một nhóm test rất lớn: các test chỉ liên quan tới MỘT component UI, không cần cả hệ thống.",
        "Hi! When learning automation, you usually start Playwright with E2E tests: open the browser, go to a page, fill a form, click a button. That's intuitive, but has a problem: each test must load a whole page, sometimes a multi-step flow, so it runs slowly and can be 'flaky' (pass then fail) because it depends on the network and server speed. Component Testing solves exactly that problem for a huge class of tests: ones that only concern ONE UI component, not the whole system.",
        "こんにちは！自動化を学び始めると、通常PlaywrightはE2Eテストから：ブラウザを開き、ページへ移動し、フォームを入力し、ボタンを押す。直感的ですが問題があります：各テストがページ全体、時に複数ステップのフローを読み込む必要があり、実行が遅くネットワークやサーバー速度に依存して『flaky』（成功したり失敗したり）になりがちです。Component Testingは、1つのUIコンポーネントだけに関わり、システム全体を必要としない大量のテストに対してまさにこの問題を解決します。"),
      IMG(m_ctScreen, "Màn hình test: mount component ProductCard cô lập, không cần server thật", "Screen under test: mounting the ProductCard component in isolation, no real server needed", "テスト対象画面：実サーバー不要でProductCardコンポーネントを孤立マウント"),
      DEF("Component Testing (CT)", "kỹ thuật test mount (dựng lên) một component UI đơn lẻ trong trình duyệt thật, truyền props/callback giả lập, rồi kiểm tra kết quả hiển thị và hành vi — không chạy toàn bộ ứng dụng.",
        "component testing (CT) — a technique that mounts a single UI component in a real browser, feeds it mock props/callbacks, and checks the resulting display and behavior — without running the entire application.",
        "コンポーネントテスト（CT） — 実ブラウザで単一のUIコンポーネントをマウントし、模擬のprops/コールバックを渡して表示と挙動を検証する手法。アプリケーション全体は実行しない。"),
    ] },
  { heading: { vi: "2. Component Testing khác gì E2E Testing", en: "2. How Component Testing differs from E2E Testing", ja: "2. Component TestingとE2E Testingの違い" },
    blocks: [
      P("Hãy nghĩ về kim tự tháp kiểm thử: dưới cùng là Unit Test (test một hàm thuần, không có UI), ở giữa là Component Test (test một component UI cô lập), trên cùng là E2E Test (test cả một luồng qua trình duyệt thật, có server/API thật). Càng lên cao, test càng 'thật' hơn nhưng cũng càng chậm và tốn công bảo trì hơn.",
        "Think of the test pyramid: at the bottom is Unit Test (testing a pure function, no UI), in the middle is Component Test (testing one isolated UI component), at the top is E2E Test (testing a whole flow through a real browser, with a real server/API). The higher up, the more 'real' the test but also the slower and more costly to maintain.",
        "テストピラミッドを考えてみましょう：最下層はユニットテスト（UIなしの純粋な関数テスト）、中間はコンポーネントテスト（孤立した1つのUIコンポーネントのテスト）、最上層はE2Eテスト（実ブラウザ・実サーバー/APIを使う一連のフロー全体のテスト）です。上に行くほど『本物』に近づきますが、遅くメンテナンスコストも高くなります。"),
      IMG(m_pyramid, "Kim tự tháp: Unit Test → Component Test → E2E Test, mỗi tầng một phạm vi và tốc độ khác nhau", "The pyramid: Unit Test → Component Test → E2E Test, each layer a different scope and speed", "ピラミッド：ユニットテスト→コンポーネントテスト→E2Eテスト、各層で範囲と速度が異なる"),
      IMG(m_compare, "Bảng so sánh nhanh: Component Testing và E2E Testing khác nhau ở đâu", "Quick comparison table: where Component Testing and E2E Testing differ", "簡易比較表：Component TestingとE2E Testingの違い"),
      P("Điểm mấu chốt: CT KHÔNG thay thế E2E, mà lấp đúng khoảng trống mà Unit Test không với tới (vì Unit Test không đụng DOM) và E2E làm quá chậm để chạy thường xuyên (vì phải tải cả trang). Một dự án khỏe mạnh thường có rất nhiều Unit Test, khá nhiều Component Test, và một số ít E2E Test cho các luồng quan trọng nhất.",
        "The key point: CT does NOT replace E2E, it fills exactly the gap that Unit Tests can't reach (since they never touch the DOM) and that E2E is too slow to run frequently (since it must load the whole page). A healthy project usually has lots of Unit Tests, quite a few Component Tests, and a small number of E2E Tests for the most critical flows.",
        "重要な点：CTはE2Eを置き換えるものではなく、ユニットテストが届かない領域（DOMに触れないため）と、E2Eが頻繁に実行するには遅すぎる領域（ページ全体を読み込む必要があるため）をちょうど埋めます。健全なプロジェクトは通常、多数のユニットテスト、かなりの数のコンポーネントテスト、そして最も重要なフローのための少数のE2Eテストを持ちます。"),
    ] },
  { heading: { vi: "3. Vì sao Tester nên biết Playwright CT", en: "3. Why testers should know Playwright CT", ja: "3. テスターがPlaywright CTを知るべき理由" },
    blocks: [
      P("Ngày càng nhiều đội frontend tách UI thành các component nhỏ, tái sử dụng (nút, thẻ sản phẩm, giỏ hàng mini…). Nếu chỉ test qua E2E, bạn phải đi qua nhiều màn hình chỉ để chạm được một component sâu bên trong — vừa chậm vừa khó tạo ra những trạng thái hiếm (như 'hết hàng', 'lỗi mạng', 'vượt tồn kho'). CT cho bạn quyền truy cập trực tiếp: truyền thẳng props để tạo ra bất kỳ trạng thái nào bạn muốn, ngay lập tức.",
        "More and more frontend teams split the UI into small, reusable components (buttons, product cards, mini carts...). If you only test via E2E, you must click through many screens just to reach one component deep inside — slow, and hard to reproduce rare states (like 'out of stock', 'network error', 'exceeds stock'). CT gives you direct access: pass props straight in to create any state you want, instantly.",
        "フロントエンドチームはますますUIを小さく再利用可能なコンポーネント（ボタン、商品カード、ミニカートなど）に分割しています。E2Eだけでテストすると、内部にある1つのコンポーネントに到達するために多くの画面を通過する必要があり、遅く、稀な状態（『在庫切れ』『ネットワークエラー』『在庫超過』など）の再現も困難です。CTなら直接アクセスでき、propsを直接渡すことで望む状態を即座に作れます。"),
      P("Với Tester automation, biết CT nghĩa là bạn có thêm một công cụ đúng việc: khi cần kiểm tra kỹ một component (nhiều biến thể props, nhiều trạng thái), CT nhanh gấp chục lần và cho phản hồi ngay trong Pull Request — trước khi code được merge. Đây cũng là kỹ năng ngày càng được các công ty làm sản phẩm (SaaS, TMĐT) hỏi trong phỏng vấn vị trí SDET/Automation Tester.",
        "For an automation tester, knowing CT means having the right tool for the job: when you need to thoroughly check a component (many prop variants, many states), CT is dozens of times faster and gives feedback right inside the Pull Request — before code is merged. It's also a skill increasingly asked about by product companies (SaaS, e-commerce) in SDET/Automation Tester interviews.",
        "自動化テスターにとってCTを知ることは、適切な道具を手に入れることを意味します：コンポーネントを徹底的に確認したいとき（多数のprop変種、多数の状態）、CTは何十倍も速く、コードがマージされる前のプルリクエスト内で即座にフィードバックを得られます。これはSaaS・EC等のプロダクト企業がSDET/自動化テスター面接でますます尋ねるスキルでもあります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: cài đặt & cấu hình Playwright CT", en: "4. Prepare: installing & configuring Playwright CT", ja: "4. 準備：Playwright CTのインストールと設定" },
    blocks: [
      P("Playwright CT là gói riêng, không dùng chung file cấu hình với E2E. Với dự án React, bạn cần cài @playwright/experimental-ct-react và tạo một file cấu hình CT riêng.",
        "Playwright CT is a separate package and doesn't share a config file with E2E. For a React project, you need to install @playwright/experimental-ct-react and create a dedicated CT config file.",
        "Playwright CTは別パッケージで、E2Eと設定ファイルを共有しません。Reactプロジェクトでは@playwright/experimental-ct-reactをインストールし、専用のCT設定ファイルを作成する必要があります。"),
      STEP(1, "Cài gói CT cho React: npm install -D @playwright/experimental-ct-react.", "Install the React CT package: npm install -D @playwright/experimental-ct-react.", "React用CTパッケージをインストール：npm install -D @playwright/experimental-ct-react。"),
      STEP(2, "Tạo file playwright-ct.config.ts, chỉ định testDir trỏ tới thư mục chứa các file *.spec.tsx của component.", "Create playwright-ct.config.ts, pointing testDir to the folder holding your component *.spec.tsx files.", "playwright-ct.config.tsを作成し、testDirをコンポーネントの*.spec.tsxファイルがあるフォルダに指定。"),
      STEP(3, "Chạy thử: npx playwright test -c playwright-ct.config.ts để xác nhận môi trường mount hoạt động.", "Run it: npx playwright test -c playwright-ct.config.ts to confirm the mount environment works.", "実行して確認：npx playwright test -c playwright-ct.config.tsでマウント環境が動くか確認。"),
      CODE("ts", "// playwright-ct.config.ts\nimport { defineConfig, devices } from '@playwright/experimental-ct-react';\n\nexport default defineConfig({\n  testDir: './tests/component',\n  snapshotDir: './__snapshots__',\n  timeout: 10_000,\n  fullyParallel: true,\n  use: {\n    trace: 'on-first-retry',\n    ctPort: 3100,\n  },\n  projects: [\n    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n  ],\n});"),
      TRY("Nếu đội bạn đã có sẵn component React nào (kể cả một nút bấm đơn giản), thử tưởng tượng bạn sẽ mount nó với props nào để kiểm tra trạng thái 'disabled'.", "If your team already has any React component (even a simple button), imagine which props you'd mount it with to check the 'disabled' state.", "チームに既存のReactコンポーネント（単純なボタンでも）があれば、『disabled』状態を確認するためにどのpropsでマウントするか想像してみよう。"),
      PITFALL("Dùng chung playwright.config.ts của E2E cho CT — CT cần môi trường mount riêng (ctPort, ctTemplate…), dùng nhầm file dễ gây lỗi cấu hình khó hiểu.", "Reusing E2E's playwright.config.ts for CT — CT needs its own mount environment (ctPort, ctTemplate…); using the wrong file causes confusing config errors.", "E2E用のplaywright.config.tsをCTに流用 — CTは独自のマウント環境（ctPort、ctTemplateなど）が必要で、誤ったファイルを使うと分かりにくい設定エラーが起きる。"),
    ] },
  { heading: { vi: "5. Viết test Component đầu tiên (thực hành)", en: "5. Writing your first Component test (hands-on)", ja: "5. 最初のComponentテストを書く（実習）" },
    blocks: [
      P("Giờ ta viết test cho component ProductCard của ShopEasy: hiển thị tên, giá, và nút 'Thêm vào giỏ' — nút này phải bị vô hiệu hoá khi hết hàng.",
        "Now let's write a test for ShopEasy's ProductCard component: it shows a name, price, and an 'Add to cart' button — that button must be disabled when out of stock.",
        "では、ShopEasyのProductCardコンポーネントのテストを書きましょう：名前、価格、『カートに追加』ボタンを表示 — 在庫切れ時はこのボタンが無効化されなければなりません。"),
      STEP(1, "Import hàm mount từ @playwright/experimental-ct-react, và import chính component ProductCard cần test.", "Import the mount function from @playwright/experimental-ct-react, and import the ProductCard component itself.", "@playwright/experimental-ct-reactからmount関数をインポートし、テスト対象のProductCardコンポーネント自体もインポート。"),
      STEP(2, "Gọi mount(<ProductCard .../>) với props giả lập đúng ca cần test (ví dụ inStock=true).", "Call mount(<ProductCard .../>) with mock props matching the case you're testing (e.g. inStock=true).", "テストしたいケースに合う模擬propsでmount(<ProductCard .../>)を呼ぶ（例：inStock=true）。"),
      STEP(3, "Dùng getByText/getByRole để tìm phần tử rồi assert bằng expect(...).toBeVisible()/toBeEnabled()/toBeDisabled().", "Use getByText/getByRole to locate elements, then assert with expect(...).toBeVisible()/toBeEnabled()/toBeDisabled().", "getByText/getByRoleで要素を探し、expect(...).toBeVisible()/toBeEnabled()/toBeDisabled()でアサート。"),
      CODE("tsx", "// tests/component/ProductCard.spec.tsx\nimport { test, expect } from '@playwright/experimental-ct-react';\nimport ProductCard from '../../src/components/ProductCard';\n\ntest('hien thi ten, gia va cho phep them vao gio khi con hang', async ({ mount }) => {\n  const component = await mount(\n    <ProductCard name=\"Tai nghe Bluetooth X200\" price={590000} inStock={true} />\n  );\n  await expect(component.getByText('590.000')).toBeVisible();\n  await expect(component.getByRole('button', { name: 'Them vao gio' })).toBeEnabled();\n});\n\ntest('vo hieu hoa nut khi het hang', async ({ mount }) => {\n  const component = await mount(\n    <ProductCard name=\"Tai nghe Bluetooth X200\" price={590000} inStock={false} />\n  );\n  const addBtn = component.getByRole('button', { name: 'Het hang' });\n  await expect(addBtn).toBeDisabled();\n});"),
      P("Chú ý: hai test trên KHÔNG gọi API, không cần server ShopEasy chạy thật — mọi dữ liệu đến từ props bạn tự truyền vào. Đây chính là lý do CT nhanh và ổn định: kết quả chỉ phụ thuộc vào chính component, không phụ thuộc mạng hay dữ liệu thật.",
        "Note: the two tests above call NO API and need no real ShopEasy server running — all data comes from the props you pass in yourself. This is exactly why CT is fast and stable: the result depends only on the component itself, not on the network or real data.",
        "注意：上記2つのテストはAPIを一切呼ばず、実際のShopEasyサーバーの起動も不要です — すべてのデータは自分で渡したpropsに由来します。これがCTが高速で安定している理由そのものです：結果はコンポーネント自体にのみ依存し、ネットワークや実データには依存しません。"),
      TRY("Viết thêm một test thứ ba cho ProductCard: khi price=0 (sản phẩm miễn phí), nút phải hiện chữ 'Nhận miễn phí' thay vì 'Thêm vào giỏ'.", "Write a third test for ProductCard: when price=0 (a free item), the button must show 'Get it free' instead of 'Add to cart'.", "ProductCardの3つ目のテストを書いてみよう：price=0（無料商品）のとき、ボタンは『カートに追加』ではなく『無料で受け取る』と表示すべき。"),
    ] },
  { heading: { vi: "6. Tình huống 1: E2E chậm & flaky vì phụ thuộc mạng thật", en: "6. Situation 1: E2E is slow & flaky because it depends on the real network", ja: "6. シーン1：実ネットワーク依存でE2Eが遅くflaky" },
    blocks: [
      SITUATION("Đội bạn có 40 test E2E chỉ để kiểm tra các trạng thái hiển thị khác nhau của ProductCard (hết hàng, giảm giá, mới về, hết giờ flash sale…). Bộ test này chạy 12 phút và thỉnh thoảng fail ngẫu nhiên.",
        "Your team has 40 E2E tests just to check different display states of ProductCard (out of stock, on sale, new arrival, flash sale ended...). This suite takes 12 minutes to run and occasionally fails randomly.",
        "Mỗi test phải mở trang danh sách sản phẩm thật, chờ API trả dữ liệu đúng trạng thái cần test, đôi khi server chậm khiến assertion timeout dù giao diện không hề có lỗi thật.",
        "Every test must open the real product listing page and wait for the API to return data matching the state under test; sometimes the server is slow, causing assertion timeouts even though the UI has no real bug.",
        "ProductCardの様々な表示状態（在庫切れ、セール中、新着、フラッシュセール終了など）を確認するためだけにE2Eテストが40件あります。このスイートは12分かかり、時々ランダムに失敗します。",
        "各テストは実際の商品一覧ページを開き、テスト対象の状態に合うデータをAPIが返すのを待つ必要があり、サーバーが遅いと実際のUIバグが無くてもアサーションがタイムアウトすることがあります。"),
      SOLVE("Chuyển 40 test này sang Playwright CT: mount trực tiếp ProductCard với props tương ứng từng trạng thái (inStock, discount, isNew, saleEndsAt…), không cần trang danh sách hay API thật.", "Move these 40 tests to Playwright CT: mount ProductCard directly with props matching each state (inStock, discount, isNew, saleEndsAt...), no listing page or real API needed.", "この40件をPlaywright CTへ移行：inStock、discount、isNew、saleEndsAtなど各状態に対応するpropsで直接ProductCardをマウント、一覧ページや実APIは不要。"),
      P("Kết quả sau khi chuyển: 40 test CT chạy trong khoảng 6 giây thay vì 12 phút, và không còn phụ thuộc vào tốc độ server hay dữ liệu thật trong database staging — nên hết flaky. Chỉ giữ lại 2–3 test E2E để xác nhận trang danh sách THẬT SỰ gọi đúng API và hiển thị đúng ProductCard trong bối cảnh cả trang — đó là phần CT không thể thay thế.",
        "After the switch: the 40 CT tests run in about 6 seconds instead of 12 minutes, and no longer depend on server speed or real staging database data — so flakiness disappears. Only 2–3 E2E tests remain, to confirm the listing page truly calls the right API and renders ProductCard correctly within the whole-page context — the part CT can't replace.",
        "移行後：40件のCTテストは12分ではなく約6秒で実行され、サーバー速度やステージングDBの実データにも依存しなくなり、flakyさが消えます。一覧ページが本当に正しいAPIを呼び正しいコンテキストでProductCardを描画するかを確認するE2Eテストのみ2〜3件残します — これはCTでは代替できない部分です。"),
      IMG(m_dashSpeed, "Tốc độ CI trước & sau khi chuyển 40 test hiển thị ProductCard sang Component Testing", "CI speed before & after moving 40 ProductCard display tests to Component Testing", "ProductCard表示テスト40件をComponent Testingへ移行した前後のCI速度"),
      RECAP(["Test chỉ liên quan hiển thị/props của 1 component → ưu tiên chuyển sang CT", "Giữ lại E2E cho phần CT không thể thay thế: tích hợp thật, luồng nhiều trang"],
        ["Tests that only concern one component's display/props → prioritize moving to CT", "Keep E2E for what CT can't replace: real integration, multi-page flows"],
        ["1コンポーネントの表示/propsのみに関わるテスト→CTへの移行を優先", "CTで代替できない部分（実統合、複数ページフロー）はE2Eを維持"]),
    ] },
  { heading: { vi: "7. Tình huống 2: bug ẩn trong một state hiếm của component", en: "7. Situation 2: a bug hidden in a rare component state", ja: "7. シーン2：コンポーネントの稀な状態に潜むバグ" },
    blocks: [
      SITUATION("Khách hàng báo: trên MiniCartWidget, nếu họ cố tình nhập số lượng lớn hơn tồn kho (ví dụ 99 khi chỉ còn 12), nút 'Cập nhật' vẫn bấm được và không có cảnh báo gì.",
        "A customer reports: on MiniCartWidget, if they intentionally type a quantity larger than stock (e.g. 99 when only 12 remain), the 'Update' button is still clickable with no warning at all.",
        "Bộ E2E hiện tại của đội chỉ test với số lượng hợp lệ (1–5), chưa từng thử số lượng vượt tồn kho nên chưa từng phát hiện lỗi này suốt nhiều sprint.",
        "The team's current E2E suite only tests with valid quantities (1–5) and has never tried an out-of-stock quantity, so this bug went unnoticed for many sprints.",
        "顧客報告：MiniCartWidgetで、在庫より多い数量（在庫12に対し99など）をわざと入力すると、『更新』ボタンはまだクリックでき、警告も一切ない。",
        "チームの現行E2Eスイートは有効な数量（1〜5）のみをテストしており、在庫超過の数量を一度も試したことがないため、このバグは何スプリントも見逃されていた。"),
      SOLVE("Viết một Component Test mount thẳng MiniCartWidget với props quantity=99, stock=12 — không cần dựng lại cả giỏ hàng thật để tạo ra tình huống hiếm này.", "Write a Component Test that mounts MiniCartWidget directly with props quantity=99, stock=12 — no need to rebuild a whole real cart to reach this rare situation.", "quantity=99、stock=12のpropsで直接MiniCartWidgetをマウントするComponent Testを書く — この稀な状況を再現するために実際のカート全体を作り直す必要はない。"),
      P("Đây chính là điểm mạnh lớn nhất của CT với vai trò Tester: bạn có thể tạo ra BẤT KỲ tổ hợp props/state nào — kể cả những trường hợp cực hiếm hoặc khó dựng qua giao diện thật (như tồn kho về đúng 0 giữa lúc đang thao tác) — chỉ bằng một dòng props. Nhờ đó CT giúp bạn kiểm thử biên (boundary testing) cho từng component hiệu quả hơn nhiều so với việc cố dựng tình huống đó qua E2E.",
        "This is exactly CT's biggest strength for a tester: you can create ANY combination of props/state — even extremely rare or hard-to-reproduce-via-UI cases (like stock hitting exactly 0 mid-action) — with just one line of props. That makes CT far more effective for boundary testing each component than trying to reproduce that case through E2E.",
        "これこそテスターとしてのCTの最大の強みです：どんなprops/stateの組み合わせも — 操作中に在庫がちょうど0になるような極めて稀で実UIでは再現しにくいケースでさえ — たった1行のpropsで作成できます。そのためCTは、E2Eでそのケースを再現しようとするよりもはるかに効果的に、各コンポーネントの境界値テストを可能にします。"),
      IMG(m_cartWidget, "MiniCartWidget: mount riêng từng trạng thái, kể cả trạng thái hiếm 'vượt tồn kho'", "MiniCartWidget: mounting each state separately, including the rare 'exceeds stock' state", "MiniCartWidget：稀な『在庫超過』状態を含む各状態を個別にマウント"),
      IMG(m_ticket, "Ticket lỗi được tạo trực tiếp từ kết quả Component Test — không cần chờ tái hiện qua E2E", "A bug ticket created directly from the Component Test result — no need to wait to reproduce via E2E", "Component Testの結果から直接作成されたバグチケット — E2Eでの再現を待つ必要がない"),
      TRY("Nghĩ thêm một state hiếm khác của MiniCartWidget đáng viết CT: ví dụ số lượng = 0 (phải tự xoá khỏi giỏ) hoặc giá thay đổi giữa lúc xem giỏ hàng.", "Think of one more rare MiniCartWidget state worth a CT: e.g. quantity = 0 (should auto-remove from cart) or the price changing while viewing the cart.", "MiniCartWidgetのCTに値する他の稀な状態を考えてみよう：例えば数量=0（自動でカートから削除すべき）や、カート閲覧中に価格が変わる場合。"),
    ] },
  { heading: { vi: "8. Chiến lược: khi nào dùng CT, khi nào dùng E2E", en: "8. Strategy: when to use CT, when to use E2E", ja: "8. 戦略：CTとE2Eをいつ使い分けるか" },
    blocks: [
      P("Một câu hỏi thực tế: viết CT hay E2E cho từng trường hợp? Hãy tự hỏi: 'Điều tôi cần xác nhận có nằm gọn trong MỘT component không, hay nó phụ thuộc vào việc nhiều phần hệ thống nói chuyện đúng với nhau?'.",
        "A practical question: should you write CT or E2E for each case? Ask yourself: 'Does what I need to confirm fit entirely within ONE component, or does it depend on multiple parts of the system talking to each other correctly?'",
        "実践的な問い：各ケースでCTとE2Eどちらを書くべきか？自問しましょう：『確認したいことは1つのコンポーネント内で完結するか、それとも複数のシステム部分が正しく連携するかに依存するか？』"),
      STEP(1, "Nếu chỉ liên quan hiển thị/props/state/sự kiện của một component → viết Component Test.", "If it only concerns one component's display/props/state/events → write a Component Test.", "1コンポーネントの表示/props/state/イベントのみに関わる場合→Component Testを書く。"),
      STEP(2, "Nếu cần xác nhận nhiều component/module phối hợp đúng qua API/router/state toàn cục → viết E2E Test.", "If you need to confirm multiple components/modules coordinate correctly via API/router/global state → write an E2E Test.", "複数のコンポーネント/モジュールがAPI/ルーター/グローバルstateを通じて正しく連携するか確認する場合→E2Eテストを書く。"),
      STEP(3, "Ưu tiên: nhiều CT bao phủ các biến thể/props/state của từng component, kèm một số ít E2E cho các luồng nghiệp vụ giá trị cao nhất (thanh toán, đăng nhập).", "Prioritize: many CTs covering each component's variants/props/states, plus a small number of E2E tests for the highest-value business flows (checkout, login).", "優先順位：各コンポーネントの変種/props/stateを網羅する多数のCTと、最も価値の高い業務フロー（決済、ログイン）のための少数のE2Eテスト。"),
      P("Với ShopEasy, đội quyết định: mọi component hiển thị (thẻ sản phẩm, giỏ mini, badge khuyến mãi, bộ lọc) đều có CT bao phủ các state chính; chỉ giữ khoảng 15 E2E cho các luồng: đăng nhập, tìm kiếm → thêm giỏ → thanh toán, và áp mã giảm giá. Tỉ lệ hợp lý này giúp bộ test chạy nhanh mà vẫn tin cậy.",
        "For ShopEasy, the team decided: every display component (product card, mini cart, promo badge, filter) gets CT coverage for its main states; only about 15 E2E tests remain for flows like login, search → add to cart → checkout, and applying a discount code. This healthy ratio keeps the suite fast yet trustworthy.",
        "ShopEasyでは、チームは次のように決定：すべての表示コンポーネント（商品カード、ミニカート、プロモバッジ、フィルター）が主要な状態をCTでカバーし、E2Eはログイン、検索→カート追加→決済、割引コード適用などのフローのために約15件のみ残す。この健全な比率がスイートを高速かつ信頼できるものに保つ。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo khi viết Playwright CT", en: "9. Common mistakes & tips when writing Playwright CT", ja: "9. Playwright CT作成でよくある失敗とコツ" },
    blocks: [
      PITFALL("Mount component nhưng không truyền đủ props bắt buộc (ví dụ thiếu onAddToCart), khiến component crash trong lúc mount thay vì báo lỗi rõ ràng — hãy kiểm tra props required trước.", "Mounting a component without all required props (e.g. missing onAddToCart), causing it to crash during mount instead of a clear error — check required props first.", "必須props（例：onAddToCart）を渡さずにマウントし、明確なエラーではなくマウント中にクラッシュする — 先に必須propsを確認しよう。"),
      PITFALL("Cố dùng CT để test cả luồng gọi API thật (fetch tới backend) — CT không thay thế được việc xác nhận tích hợp thật; hãy mock callback/props thay vì gọi network thật.", "Trying to use CT to test a whole real API-calling flow (fetch to the backend) — CT can't replace confirming real integration; mock the callback/props instead of calling the real network.", "CTで実際にAPIを呼ぶフロー全体（バックエンドへのfetch）をテストしようとする — CTは実統合の確認を代替できない；実ネットワークを呼ぶ代わりにコールバック/propsをモックしよう。"),
      TIP("Đặt tên test theo mẫu 'state cần kiểm tra' + 'kết quả mong đợi' (vd 'disable nut khi het hang') để khi CI báo fail, bạn biết ngay component sai ở state nào.", "Name tests as 'state under test' + 'expected result' (e.g. 'disables button when out of stock') so when CI reports a failure, you immediately know which state is broken.", "テスト名は『テスト対象の状態』＋『期待結果』（例：『在庫切れ時にボタンを無効化』）とし、CI失敗時にどの状態が壊れているか即座に分かるようにしよう。"),
      TIP("Viết một CT riêng cho mỗi 'state' quan trọng của component (loading, empty, error, có dữ liệu) thay vì nhồi tất cả vào một test dài — dễ đọc và dễ debug hơn khi fail.", "Write a separate CT for each important component 'state' (loading, empty, error, has data) instead of cramming everything into one long test — easier to read and debug on failure.", "コンポーネントの重要な『状態』（loading、empty、error、データありなど）ごとに別々のCTを書き、1つの長いテストに詰め込まない — 失敗時に読みやすくデバッグしやすい。"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Network mocking với Playwright", "Network mocking with Playwright", "pw-network-mocking"),
      INTERNAL("Chống test flaky ở quy mô lớn với Playwright", "Fighting flaky tests at scale with Playwright", "pw-flaky-at-scale"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa tìm hiểu Playwright Component Testing qua app ShopEasy: mount cô lập ProductCard và MiniCartWidget, so sánh CT với E2E, viết test đầu tiên, xử lý tình huống E2E chậm/flaky và bug ẩn trong state hiếm, rồi biết cách chọn CT hay E2E cho từng trường hợp. Đây là kỹ năng ngày càng quan trọng khi frontend hiện đại xây dựng bằng component, giúp bạn kiểm thử nhanh, ổn định và bắt lỗi sớm ngay trong Pull Request.",
        "You just explored Playwright Component Testing through the ShopEasy app: mounting ProductCard and MiniCartWidget in isolation, comparing CT with E2E, writing your first test, handling a slow/flaky E2E situation and a bug hidden in a rare state, and learning to choose CT or E2E for each case. This is an increasingly important skill as modern frontends are built from components, helping you test fast, stably, and catch bugs early right in Pull Requests.",
        "ShopEasyアプリを通じてPlaywright Component Testingを学びました：ProductCardとMiniCartWidgetを孤立してマウントし、CTとE2Eを比較し、最初のテストを書き、遅い/flakyなE2Eのシーンと稀な状態に潜むバグに対処し、各ケースでCTかE2Eかを選ぶ方法を学びました。モダンなフロントエンドがコンポーネントで構築される中、これはますます重要なスキルであり、プルリクエスト内で高速・安定してバグを早期に検知するのに役立ちます。"),
      P("Chặng tiếp theo, bạn nên thực hành viết CT cho các component thật trong dự án của mình, kết hợp với network mocking và trace viewer để debug nhanh khi test fail. Nếu muốn học bài bản automation testing với Playwright từ nền tảng tới nâng cao cùng dự án thực chiến TMĐT/fintech, một khoá học Tester chuyên sâu sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí SDET/Automation Tester.",
        "Next, practice writing CT for real components in your own project, combined with network mocking and the trace viewer to debug quickly when tests fail. If you want to learn Playwright automation testing thoroughly from fundamentals to advanced, with real e-commerce/fintech projects, an in-depth Tester course will help you progress fast and confidently apply for SDET/Automation Tester roles.",
        "次は、自分のプロジェクトの実際のコンポーネントに対してCTを書く練習をし、ネットワークモッキングとトレースビューアーを組み合わせてテスト失敗時に素早くデバッグしましょう。基礎から上級まで、実際のEC/フィンテックプロジェクトを通じてPlaywright自動化テストを体系的に学びたいなら、専門的なテスターコースが速い成長とSDET/自動化テスター職への自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const PW_COMPONENT_01 = makeDoc({
  slug: "playwright-component-testing",
  domain: "ecommerce",
  primaryKeyword: "Playwright component testing",
  keywords: ["Playwright component testing", "component testing", "test UI cô lập", "mount component", "Playwright CT react"],
  coverLabel: "PLAYWRIGHT · COMPONENT TEST · TMĐT",
  crumb: "Playwright Component Testing",
  metaTitle: { vi: "Playwright component testing cho Tester: test UI cô lập", en: "Playwright component testing for testers: isolated UI testing", ja: "テスター向けPlaywright component testing：UIの孤立テスト" },
  metaDescription: {
    vi: "Playwright component testing cho Tester: mount UI cô lập nhanh hơn E2E, khi nào dùng, cách viết test thật với app TMĐT, có mockup và trắc nghiệm.",
    en: "Playwright component testing for testers: mount UI in isolation, faster than E2E, when to use it, how to write real tests with an e-commerce app, with mockups and a quiz.",
    ja: "テスター向けPlaywright component testing：UIを孤立してマウントしE2Eより高速、使うべき場面、ECアプリでの実テストの書き方、モックとクイズ付き。",
  },
  title: {
    vi: "Playwright Component Testing cho Tester: test UI cô lập nhanh hơn E2E (có trắc nghiệm)",
    en: "Playwright Component Testing for testers: isolated UI tests, faster than E2E (with quiz)",
    ja: "テスター向けPlaywright Component Testing：E2Eより高速な孤立UIテスト（クイズ付き）",
  },
  summary: {
    vi: "Bài chuyên công nghệ: Playwright Component Testing (CT) qua app TMĐT ShopEasy. Khác biệt với E2E, cách cài đặt & cấu hình, viết test đầu tiên cho ProductCard, 2 tình huống thực tế (E2E chậm/flaky, bug ẩn trong state hiếm), chiến lược chọn CT/E2E, lỗi hay gặp, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Tech-focused article: Playwright Component Testing (CT) through the ShopEasy e-commerce app. How it differs from E2E, install & config, writing the first ProductCard test, 2 real situations (slow/flaky E2E, bug hidden in a rare state), CT/E2E strategy, common mistakes, many UI mockups, FAQ, and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "技術特化記事：ECアプリShopEasyを通じたPlaywright Component Testing（CT）。E2Eとの違い、インストールと設定、最初のProductCardテストの作成、実際の2つのシーン（遅い/flakyなE2E、稀な状態に潜むバグ）、CT/E2E戦略、よくある失敗、多数のUIモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết một Playwright Component Test", steps: [
    { name: "Cài đặt & cấu hình CT", text: "Cài @playwright/experimental-ct-react, tạo playwright-ct.config.ts riêng." },
    { name: "Mount component với props giả lập", text: "Gọi mount(<Component .../>) với props tương ứng state cần test." },
    { name: "Assert kết quả hiển thị/hành vi", text: "Dùng getByText/getByRole và expect(...).toBeVisible()/toBeEnabled()/toBeDisabled()." },
  ] },
  pages,
});

export const CNM_PW_COMPONENT_01 = [PW_COMPONENT_01];
