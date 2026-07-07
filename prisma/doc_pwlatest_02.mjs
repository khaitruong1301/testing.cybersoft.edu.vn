// ============================================================================
// doc_pwlatest_02.mjs — Playwright & công cụ mới nhất (bộ 02).
// A: Component Testing (React·Vue·Svelte·Solid)
// B: Trace Viewer & UI Mode 2026
// Trilingual VI/EN/JA. Plugs into CyberSoft Tester viewer.
// ============================================================================
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ---------------------------------------------------------------------------
// Shared SVG illustrations
// ---------------------------------------------------------------------------
const svgCtVsE2e = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#f8fafc"/>
<text x="30" y="34" font-size="16" font-weight="800" fill="#0f172a">Component Testing vs E2E — cùng trình duyệt thật</text>
<rect x="30" y="56" width="310" height="210" rx="12" fill="#e0f2fe" stroke="#0369a1"/>
<text x="185" y="82" text-anchor="middle" font-size="14" font-weight="800" fill="#075985">COMPONENT TEST</text>
<rect x="55" y="100" width="260" height="40" rx="8" fill="#fff" stroke="#7dd3fc"/><text x="70" y="125" font-size="12" fill="#0c4a6e">mount(&lt;Cart items={fx}/&gt;)</text>
<rect x="55" y="150" width="260" height="40" rx="8" fill="#fff" stroke="#7dd3fc"/><text x="70" y="175" font-size="12" fill="#0c4a6e">network mock qua router fixture</text>
<rect x="55" y="200" width="260" height="46" rx="8" fill="#bae6fd"/><text x="185" y="228" text-anchor="middle" font-size="12" font-weight="700" fill="#075985">1 component · ms · cô lập</text>
<rect x="380" y="56" width="310" height="210" rx="12" fill="#fef9c3" stroke="#a16207"/>
<text x="535" y="82" text-anchor="middle" font-size="14" font-weight="800" fill="#854d0e">E2E TEST</text>
<rect x="405" y="100" width="260" height="40" rx="8" fill="#fff" stroke="#fde047"/><text x="420" y="125" font-size="12" fill="#713f12">page.goto('/checkout')</text>
<rect x="405" y="150" width="260" height="40" rx="8" fill="#fff" stroke="#fde047"/><text x="420" y="175" font-size="12" fill="#713f12">DB + API + routing + auth thật</text>
<rect x="405" y="200" width="260" height="46" rx="8" fill="#fde68a"/><text x="535" y="228" text-anchor="middle" font-size="12" font-weight="700" fill="#854d0e">cả hệ thống · giây · toàn cục</text>
<path d="M340 160 H380" stroke="#94a3b8" stroke-width="2"/>
</svg>`;

const svgMountFlow = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#0f172a"/>
<text x="30" y="34" font-size="15" font-weight="800" fill="#f1f5f9">Vòng đời mount() — component chạy trong browser thật</text>
<rect x="30" y="60" width="150" height="56" rx="10" fill="#0369a1"/><text x="105" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Test process</text><text x="105" y="104" text-anchor="middle" font-size="11" fill="#bae6fd">Node</text>
<rect x="220" y="60" width="160" height="56" rx="10" fill="#155e63"/><text x="300" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Vite dev bundle</text><text x="300" y="104" text-anchor="middle" font-size="11" fill="#99f6e4">component + fixtures</text>
<rect x="420" y="60" width="150" height="56" rx="10" fill="#7c2d12"/><text x="495" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Chromium</text><text x="495" y="104" text-anchor="middle" font-size="11" fill="#fed7aa">DOM · CSS · event</text>
<rect x="610" y="60" width="80" height="56" rx="10" fill="#155e75"/><text x="650" y="92" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">assert</text>
<path d="M180 88 H220 M380 88 H420 M570 88 H610" stroke="#7dd3fc" stroke-width="2" marker-end="url(#m)"/>
<defs><marker id="m" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#7dd3fc"/></marker></defs>
<rect x="30" y="150" width="660" height="76" rx="10" fill="#1e293b"/>
<text x="46" y="176" font-size="12" fill="#e2e8f0">1) mount() bundle component + props/fixtures → 2) Vite build ⚡ →</text>
<text x="46" y="198" font-size="12" fill="#e2e8f0">3) render trong Chromium thật (layout, CSS, animation, focus) →</text>
<text x="46" y="220" font-size="12" fill="#e2e8f0">4) locator + expect chạy y như E2E, nhưng phạm vi 1 component.</text>
</svg>`;

const svgTraceAnat = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#0b1220"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#f1f5f9">Giải phẫu Trace Viewer</text>
<rect x="24" y="46" width="672" height="40" rx="8" fill="#1e293b"/>
<text x="40" y="71" font-size="12" fill="#7dd3fc">▷ Timeline: từng action + ảnh snapshot (before / action / after)</text>
<rect x="24" y="96" width="200" height="200" rx="8" fill="#111827" stroke="#334155"/>
<text x="40" y="120" font-size="12" font-weight="700" fill="#93c5fd">Actions</text>
<rect x="36" y="132" width="176" height="22" rx="4" fill="#1f2937"/><text x="46" y="148" font-size="10" fill="#cbd5e1">goto /checkout</text>
<rect x="36" y="160" width="176" height="22" rx="4" fill="#1f2937"/><text x="46" y="176" font-size="10" fill="#cbd5e1">getByRole button Pay</text>
<rect x="36" y="188" width="176" height="22" rx="4" fill="#7f1d1d"/><text x="46" y="204" font-size="10" fill="#fecaca">expect toBeVisible ✗</text>
<rect x="36" y="216" width="176" height="22" rx="4" fill="#1f2937"/><text x="46" y="232" font-size="10" fill="#cbd5e1">route POST /pay 500</text>
<rect x="236" y="96" width="252" height="200" rx="8" fill="#0f172a" stroke="#334155"/>
<text x="252" y="120" font-size="12" font-weight="700" fill="#93c5fd">DOM Snapshot (time-travel)</text>
<rect x="252" y="132" width="220" height="150" rx="6" fill="#f8fafc"/><text x="362" y="200" text-anchor="middle" font-size="12" fill="#334155">ảnh trang tại khoảnh khắc lỗi</text>
<rect x="500" y="96" width="196" height="200" rx="8" fill="#111827" stroke="#334155"/>
<text x="516" y="120" font-size="12" font-weight="700" fill="#93c5fd">Tabs</text>
<rect x="512" y="132" width="172" height="22" rx="4" fill="#1f2937"/><text x="522" y="148" font-size="10" fill="#cbd5e1">Network  method · status</text>
<rect x="512" y="160" width="172" height="22" rx="4" fill="#1f2937"/><text x="522" y="176" font-size="10" fill="#cbd5e1">Console</text>
<rect x="512" y="188" width="172" height="22" rx="4" fill="#1f2937"/><text x="522" y="204" font-size="10" fill="#cbd5e1">Source · Cmd/Ctrl+F</text>
<rect x="512" y="216" width="172" height="22" rx="4" fill="#1f2937"/><text x="522" y="232" font-size="10" fill="#cbd5e1">Attachments (JSON đẹp)</text>
<text x="24" y="322" font-size="12" fill="#94a3b8">Trace = hộp đen của test: mở ra là thấy đúng nguyên nhân, không cần chạy lại.</text>
</svg>`;

const svgUiMode = `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="320" rx="14" fill="#f8fafc"/>
<text x="24" y="32" font-size="15" font-weight="800" fill="#0f172a">UI Mode — watch loop khi phát triển test</text>
<rect x="24" y="50" width="210" height="240" rx="10" fill="#eef2ff" stroke="#6366f1"/>
<text x="129" y="76" text-anchor="middle" font-size="13" font-weight="800" fill="#3730a3">Test tree</text>
<rect x="40" y="92" width="178" height="26" rx="5" fill="#fff" stroke="#c7d2fe"/><text x="52" y="110" font-size="11" fill="#3730a3">▸ cart.spec.ts</text>
<rect x="40" y="124" width="178" height="26" rx="5" fill="#dcfce7"/><text x="52" y="142" font-size="11" fill="#166534">✓ add item</text>
<rect x="40" y="156" width="178" height="26" rx="5" fill="#fee2e2"/><text x="52" y="174" font-size="11" fill="#991b1b">✗ apply coupon (flaky)</text>
<rect x="40" y="188" width="178" height="26" rx="5" fill="#fff" stroke="#c7d2fe"/><text x="52" y="206" font-size="11" fill="#3730a3">◉ watch: on</text>
<rect x="254" y="50" width="442" height="240" rx="10" fill="#fff" stroke="#cbd5e1"/>
<text x="274" y="78" font-size="13" font-weight="800" fill="#0f172a">Live preview + Timeline + Locator picker</text>
<rect x="274" y="94" width="402" height="120" rx="8" fill="#0f172a"/>
<rect x="290" y="110" width="120" height="88" rx="6" fill="#1e293b"/><text x="350" y="158" text-anchor="middle" font-size="10" fill="#7dd3fc">snapshot</text>
<rect x="424" y="110" width="238" height="42" rx="6" fill="#14532d"/><text x="440" y="136" font-size="11" fill="#bbf7d0">getByRole('button',{name:'Apply'})  ✓</text>
<rect x="424" y="160" width="238" height="38" rx="6" fill="#1e293b"/><text x="440" y="184" font-size="10" fill="#cbd5e1">pick locator · edit · rerun ↺</text>
<text x="274" y="238" font-size="12" fill="#334155">Lưu file → test tự chạy lại. Click action → time-travel. Không rời trình duyệt.</text>
<text x="274" y="262" font-size="12" fill="#334155">Save → auto rerun. Click an action → time travel. Never leave the browser.</text>
</svg>`;

// ===========================================================================
// ARTICLE A — Component Testing
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Component Testing là gì và vì sao 2026 nên dùng",
      en: "1. What component testing is and why it matters in 2026",
      ja: "1. コンポーネントテストとは何か、そして2026年になぜ重要か",
    },
    blocks: [
      P(
        "Component Testing (CT) của Playwright cho phép bạn gắn (mount) một component React, Vue, Svelte hoặc Solid trực tiếp vào một trình duyệt thật rồi kiểm thử nó như thể đó là một trang web thu nhỏ. Khác với unit test chạy trên jsdom giả lập, CT dựng component trong Chromium thực, nên layout, CSS, animation, focus và sự kiện chuột đều đúng như production. Đây là điểm giao thoa quý giá giữa tốc độ của unit test và độ trung thực của E2E.",
        "Playwright Component Testing (CT) lets you mount a single React, Vue, Svelte or Solid component into a real browser and test it as if it were a tiny web page. Unlike unit tests running on the simulated jsdom, CT renders the component in real Chromium, so layout, CSS, animation, focus and mouse events behave exactly as in production. It is the valuable middle ground between the speed of unit tests and the fidelity of E2E.",
        "PlaywrightのコンポーネントテストCTは、React・Vue・Svelte・Solidの単一コンポーネントを実際のブラウザにマウントし、小さなウェブページのようにテストできます。jsdomの模擬環境で動くユニットテストと異なり、CTは本物のChromiumで描画するため、レイアウト・CSS・アニメーション・フォーカス・マウスイベントが本番と同じように動きます。ユニットテストの速さとE2Eの忠実度の中間に位置する貴重な手法です。",
      ),
      P(
        "Trong hệ thống SaaS thực tế, một component như bảng giá, giỏ hàng hay biểu đồ dashboard chứa rất nhiều nhánh logic: trạng thái loading, empty, error, quyền theo gói dịch vụ. Viết E2E cho mọi tổ hợp đó vừa chậm vừa giòn, còn unit test lại không bắt được lỗi CSS đè lên nút bấm. CT lấp đúng khoảng trống ấy: bạn kiểm được hành vi tương tác thật trên một đơn vị nhỏ, chạy nhanh trong mili-giây và cô lập khỏi backend.",
        "In a real SaaS system, a component such as a pricing table, a cart or a dashboard chart carries many logic branches: loading, empty, error, and permission per plan. Writing E2E for every combination is slow and brittle, while unit tests miss CSS overlapping a button. CT fills exactly that gap: you verify real interactive behaviour on a small unit, running in milliseconds and isolated from the backend.",
        "実際のSaaSシステムでは、料金表・カート・ダッシュボードのグラフといったコンポーネントに、ローディング・空・エラー・プランごとの権限など多くの分岐があります。すべての組み合わせをE2Eで書くのは遅く壊れやすい一方、ユニットテストはボタンに重なるCSSの不具合を捉えられません。CTはまさにその隙間を埋めます。小さな単位で本物の操作挙動をミリ秒で検証し、バックエンドから隔離できます。",
      ),
      IMG(
        svgCtVsE2e,
        "CT cô lập một component với network mock; E2E chạy cả hệ thống.",
        "CT isolates one component with a network mock; E2E runs the whole system.",
        "CTはネットワークをモックして単一コンポーネントを隔離し、E2Eはシステム全体を実行します。",
      ),
      P(
        "Một lý do khiến CT trở nên thiết yếu năm 2026 là các đội front-end ngày càng chia nhỏ giao diện thành hàng trăm component tái sử dụng, và mỗi component lại là điểm hồi quy tiềm tàng. Khi một thư viện thiết kế dùng chung được nâng cấp, chỉ CT mới cho bạn kiểm nhanh từng component trong trình duyệt thật để phát hiện thay đổi vô tình về khoảng cách, màu sắc hay hành vi focus. Nếu không có lớp này, đội thường phát hiện lỗi quá muộn ở E2E, nơi việc truy nguyên component nào gây ra khác biệt tốn rất nhiều công. CT đưa phản hồi về đúng đơn vị nhỏ nhất, nơi chi phí sửa thấp nhất.",
        "One reason CT became essential in 2026 is that front-end teams increasingly split the UI into hundreds of reusable components, each a potential regression point. When a shared design library is upgraded, only CT lets you quickly check each component in a real browser to catch unintended changes in spacing, colour or focus behaviour. Without this layer, teams often discover bugs too late in E2E, where tracing which component caused a difference costs a lot of effort. CT brings feedback to the smallest unit, where the cost of fixing is lowest.",
        "CTが2026年に不可欠になった理由の一つは、フロントエンドチームがUIを再利用可能な数百のコンポーネントに分割し、それぞれが回帰の潜在点になっていることです。共有デザインライブラリが更新されると、CTだけが各コンポーネントを実ブラウザで素早く確認し、間隔・色・フォーカス挙動の意図しない変化を捉えられます。この層がないと、チームはE2Eで手遅れにバグを発見しがちで、どのコンポーネントが差を生んだか追跡するのに多大な労力がかかります。CTは修正コストが最も低い最小単位にフィードバックを届けます。",
      ),
      NOTE(
        "Gói CT vẫn mang tiền tố experimental (@playwright/experimental-ct-*) nhưng đã ổn định để dùng thật; API mount() gần như không đổi qua nhiều bản.",
        "The CT package still carries the experimental prefix (@playwright/experimental-ct-*) but is stable enough for real use; the mount() API has barely changed across releases.",
        "CTパッケージは今も実験的な接頭辞（@playwright/experimental-ct-*）を持ちますが、実用に十分安定しており、mount() APIは複数のリリースを通じてほぼ変わっていません。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Cài đặt và khởi tạo CT cho từng framework",
      en: "2. Installing and scaffolding CT per framework",
      ja: "2. フレームワークごとのCTのインストールと初期化",
    },
    blocks: [
      P(
        "Playwright cung cấp một trình khởi tạo riêng cho CT. Lệnh init sẽ tạo playwright-ct.config.ts, thư mục playwright/ chứa index.html và index.ts (nơi bạn nạp CSS toàn cục, provider, theme), rồi cài đúng gói experimental theo framework bạn chọn. Với React bạn dùng ct-react, Vue dùng ct-vue, Svelte dùng ct-svelte, Solid dùng ct-solid — mỗi gói bọc một adapter mount riêng nhưng chia sẻ chung runner Playwright.",
        "Playwright ships a dedicated initializer for CT. The init command creates playwright-ct.config.ts, a playwright/ folder holding index.html and index.ts (where you load global CSS, providers, themes), then installs the right experimental package for your framework. React uses ct-react, Vue uses ct-vue, Svelte uses ct-svelte, Solid uses ct-solid — each wraps its own mount adapter but shares the same Playwright runner.",
        "PlaywrightはCT専用の初期化コマンドを提供します。initはplaywright-ct.config.tsと、index.htmlとindex.ts（グローバルCSS・プロバイダ・テーマを読み込む場所）を含むplaywright/フォルダを作成し、選んだフレームワークに応じた実験的パッケージをインストールします。Reactはct-react、Vueはct-vue、Svelteはct-svelte、Solidはct-solidを使い、それぞれ固有のマウントアダプタを包みつつ、同じPlaywrightランナーを共有します。",
      ),
      CODE(
        "bash",
        `# Khởi tạo Component Testing (chọn framework khi được hỏi)
npm init playwright@latest -- --ct

# hoặc cài trực tiếp gói theo framework
npm i -D @playwright/experimental-ct-react   # React
npm i -D @playwright/experimental-ct-vue     # Vue
npm i -D @playwright/experimental-ct-svelte  # Svelte
npm i -D @playwright/experimental-ct-solid   # Solid

# chạy CT (khác lệnh 'test' của E2E)
npx playwright test -c playwright-ct.config.ts`,
      ),
      CODE(
        "ts",
        `// playwright-ct.config.ts
import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './src',
  testMatch: /.*\\.ct\\.(ts|tsx)$/,   // tách file CT khỏi file E2E
  snapshotDir: './__snapshots__',
  use: {
    trace: 'on-first-retry',
    ctPort: 3100,                     // cổng Vite của CT
    ctViteConfig: { resolve: { alias: { '@': '/src' } } },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});`,
      ),
      CODE(
        "ts",
        `// playwright/index.ts — chạy MỘT LẦN trước mọi mount
import '../src/styles/global.css';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { ThemeProvider } from '../src/theme';

// bọc mọi component bằng provider chung (theme, i18n, query client...)
beforeMount(async ({ App }) => {
  return (
    <ThemeProvider theme="light">
      <App />
    </ThemeProvider>
  );
});`,
      ),
      TIP(
        "Đặt tên file CT theo mẫu *.ct.tsx và E2E theo *.spec.ts để hai bộ dùng hai config khác nhau mà không giẫm chân nhau trong CI.",
        "Name CT files as *.ct.tsx and E2E files as *.spec.ts so the two suites use two configs without colliding in CI.",
        "CTファイルは*.ct.tsx、E2Eファイルは*.spec.tsと命名し、2つのスイートが別々の設定を使ってCIで衝突しないようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. mount(): trái tim của Component Testing",
      en: "3. mount(): the heart of component testing",
      ja: "3. mount()：コンポーネントテストの心臓部",
    },
    blocks: [
      P(
        "Hàm mount() nhận vào một component cùng props, sự kiện và children, đóng gói chúng bằng Vite, rồi render trong trình duyệt thật và trả về một locator gốc để bạn thao tác. Điều tinh tế cần nhớ: mọi giá trị bạn truyền vào props phải serialize được qua ranh giới Node ↔ browser, còn callback thì được Playwright bọc lại để bạn spy trong tiến trình test. Sau mount, bạn dùng đúng bộ locator getByRole, getByText và assertion expect quen thuộc.",
        "The mount() function takes a component with its props, events and children, bundles them with Vite, renders in a real browser and returns a root locator to interact with. A subtle point: any value passed as a prop must be serializable across the Node ↔ browser boundary, while callbacks are wrapped by Playwright so you can spy on them in the test process. After mounting, you use the familiar getByRole, getByText locators and expect assertions.",
        "mount()関数はコンポーネントとそのprops・イベント・childrenを受け取り、Viteでバンドルして実際のブラウザで描画し、操作用のルートロケーターを返します。微妙な点として、propsに渡す値はNode↔ブラウザ境界をまたいでシリアライズ可能でなければならず、コールバックはPlaywrightがラップするためテストプロセス内でスパイできます。マウント後は使い慣れたgetByRole・getByTextロケーターとexpectアサーションを使います。",
      ),
      IMG(
        svgMountFlow,
        "mount() bundle component qua Vite rồi render trong Chromium thật.",
        "mount() bundles the component via Vite then renders it in real Chromium.",
        "mount()はViteでコンポーネントをバンドルし、実際のChromiumで描画します。",
      ),
      CODE(
        "tsx",
        `// PriceTag.ct.tsx — React
import { test, expect } from '@playwright/experimental-ct-react';
import { PriceTag } from './PriceTag';

test('hiển thị giá đã định dạng theo locale', async ({ mount }) => {
  const cmp = await mount(<PriceTag amount={1990000} currency="VND" locale="vi-VN" />);
  await expect(cmp).toContainText('1.990.000');
  await expect(cmp.getByRole('note')).toHaveText('₫');
});

test('bắn event khi bấm "Chọn gói"', async ({ mount }) => {
  let picked = null;
  const cmp = await mount(<PriceTag amount={99} onSelect={(id) => (picked = id)} planId="pro" />);
  await cmp.getByRole('button', { name: 'Chọn gói' }).click();
  expect(picked).toBe('pro');   // callback được bắc cầu về test process
});`,
      ),
      CODE(
        "ts",
        `// Cart.ct.ts — Vue (SFC), cú pháp mount object
import { test, expect } from '@playwright/experimental-ct-vue';
import Cart from './Cart.vue';

test('tổng tiền cập nhật khi tăng số lượng', async ({ mount }) => {
  const cmp = await mount(Cart, {
    props: { items: [{ id: 'sku1', price: 50, qty: 1 }] },
  });
  await cmp.getByRole('button', { name: 'Tăng' }).click();
  await expect(cmp.getByTestId('total')).toHaveText('100');
});`,
      ),
      P(
        "Điều làm mount() khác hẳn render của thư viện testing quen thuộc là ranh giới tiến trình: test chạy trong Node còn component render trong browser, hai bên trao đổi qua một cầu nối. Do đó bạn nên nghĩ về props như một hợp đồng dữ liệu thuần: id, chuỗi, số, mảng, object phẳng đều đi qua tốt, còn hàm được Playwright chuyển thành proxy để spy lời gọi. Hiểu đúng mô hình này giúp bạn tránh nhóm lỗi khó chịu nhất của người mới, đồng thời tận dụng được điểm mạnh là kiểm chứng chính xác component đã gọi callback với đối số nào.",
        "What makes mount() differ from the render of familiar testing libraries is the process boundary: the test runs in Node while the component renders in the browser, the two communicating over a bridge. So you should think of props as a pure data contract: ids, strings, numbers, arrays, flat objects all pass fine, while functions become proxies Playwright uses to spy on calls. Grasping this model helps you avoid newcomers' most annoying class of bugs, and leverages the strength of precisely asserting which arguments a callback was called with.",
        "mount()が使い慣れたテストライブラリのrenderと異なるのは、プロセス境界です。テストはNodeで動き、コンポーネントはブラウザで描画され、両者はブリッジ経由で通信します。そのためpropsは純粋なデータ契約と考えるべきです。id・文字列・数値・配列・フラットなオブジェクトはうまく渡り、関数はPlaywrightが呼び出しをスパイするプロキシになります。このモデルを理解すれば初心者の最も厄介なバグを避けられ、コールバックがどの引数で呼ばれたかを正確に表明する強みを活かせます。",
      ),
      WARN(
        "Đừng truyền hàm phức tạp hay object có method vào props và mong nó chạy nguyên vẹn trong browser — chỉ dữ liệu serialize được mới an toàn; callback được bọc riêng để spy, không phải để thực thi logic nặng.",
        "Do not pass complex functions or objects with methods as props expecting them to run intact in the browser — only serializable data is safe; callbacks are specially wrapped for spying, not for running heavy logic.",
        "複雑な関数やメソッドを持つオブジェクトをpropsに渡してブラウザ内でそのまま動くと期待してはいけません。安全なのはシリアライズ可能なデータだけで、コールバックはスパイ用に特別にラップされ、重いロジックの実行用ではありません。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Render đa framework: Svelte và Solid",
      en: "4. Rendering across frameworks: Svelte and Solid",
      ja: "4. マルチフレームワーク描画：SvelteとSolid",
    },
    blocks: [
      P(
        "Cùng một runner Playwright, nhưng cú pháp mount thay đổi nhẹ theo mô hình component của từng framework. Svelte dùng object với props và events (Playwright bọc listener của Svelte thành spy), còn Solid dùng JSX giống React nhưng chú ý tính reactivity dựa trên signal. Việc thống nhất một bộ locator và assertion cho cả bốn framework là lợi thế lớn: đội của bạn học một API test duy nhất dù stack front-end đa dạng.",
        "The same Playwright runner, yet the mount syntax shifts slightly with each framework's component model. Svelte uses an object with props and events (Playwright wraps Svelte listeners into spies), while Solid uses JSX like React but with signal-based reactivity to keep in mind. Sharing one locator and assertion set across all four frameworks is a big win: your team learns a single test API even with a diverse front-end stack.",
        "同じPlaywrightランナーでも、マウント構文は各フレームワークのコンポーネントモデルに応じて少し変わります。Svelteはpropsとeventsを持つオブジェクトを使い（PlaywrightがSvelteのリスナーをスパイにラップ）、SolidはReactのようなJSXを使いますが、シグナルベースのリアクティビティに注意が必要です。4つすべてで単一のロケーターとアサーションを共有できるのは大きな利点で、多様なフロントエンドでもチームは1つのテストAPIだけ学べば済みます。",
      ),
      CODE(
        "ts",
        `// Toggle.ct.ts — Svelte
import { test, expect } from '@playwright/experimental-ct-svelte';
import Toggle from './Toggle.svelte';

test('phát event change khi bật', async ({ mount }) => {
  const events = [];
  const cmp = await mount(Toggle, {
    props: { checked: false, label: 'Bật thông báo' },
    on: { change: (e) => events.push(e) },   // listener của Svelte -> spy
  });
  await cmp.getByRole('switch').click();
  expect(events.length).toBe(1);
});`,
      ),
      CODE(
        "tsx",
        `// Counter.ct.tsx — Solid (signal reactivity)
import { test, expect } from '@playwright/experimental-ct-solid';
import { Counter } from './Counter';

test('signal cập nhật DOM khi tăng', async ({ mount }) => {
  const cmp = await mount(<Counter start={0} step={5} />);
  await expect(cmp.getByTestId('value')).toHaveText('0');
  await cmp.getByRole('button', { name: '+' }).click();
  await expect(cmp.getByTestId('value')).toHaveText('5');   // đợi reactivity flush
});`,
      ),
      P(
        "Sự khác biệt về mô hình reactivity giữa các framework chính là nơi bug tinh vi hay ẩn nấp. React batch cập nhật state, Vue có chu kỳ nextTick, Svelte biên dịch cập nhật vào runtime nhỏ gọn, còn Solid dùng signal chạy đồng bộ nhưng vẫn cần một nhịp để DOM phản chiếu. Nếu bạn đọc DOM ngay sau một hành động, kết quả có thể chưa kịp cập nhật và test đỏ ngẫu nhiên. Vì CT tái dùng assertion web-first của Playwright, bạn không cần biết chi tiết chu kỳ của từng framework: assertion tự chờ đến khi điều kiện đúng, san phẳng mọi khác biệt reactivity thành một API kiểm thử nhất quán.",
        "The difference in reactivity models across frameworks is exactly where subtle bugs hide. React batches state updates, Vue has a nextTick cycle, Svelte compiles updates into a tiny runtime, while Solid uses synchronous signals but still needs a beat for the DOM to reflect. If you read the DOM right after an action, the result may not have updated yet and the test flakes. Because CT reuses Playwright's web-first assertions, you don't need to know each framework's cycle in detail: the assertion auto-waits until the condition holds, flattening every reactivity difference into one consistent test API.",
        "フレームワーク間のリアクティビティモデルの違いは、まさに微妙なバグが潜む場所です。Reactは状態更新をバッチ処理し、VueはnextTickサイクルを持ち、Svelteは更新を小さなランタイムにコンパイルし、Solidは同期的なシグナルを使いますがDOMが反映されるには一拍必要です。アクション直後にDOMを読むと結果がまだ更新されず、テストがフレーキーになります。CTはPlaywrightのweb-firstアサーションを再利用するため、各フレームワークのサイクルの詳細を知る必要はありません。アサーションが条件成立まで自動待機し、あらゆるリアクティビティの違いを一貫したテストAPIに平準化します。",
      ),
      TIP(
        "Luôn dùng assertion 'web-first' (toHaveText, toBeVisible) thay vì đọc DOM thủ công — chúng tự chờ (auto-wait) đến khi reactivity của framework flush xong, tránh flaky.",
        "Always use web-first assertions (toHaveText, toBeVisible) instead of reading the DOM manually — they auto-wait until the framework's reactivity flushes, avoiding flakiness.",
        "手動でDOMを読むのではなく、常にweb-firstアサーション（toHaveText・toBeVisible）を使いましょう。フレームワークのリアクティビティが反映されるまで自動待機し、フレーキーを防ぎます。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Router fixture: mock network ngay trong component",
      en: "5. The router fixture: mocking network inside the component",
      ja: "5. router フィクスチャ：コンポーネント内でネットワークをモック",
    },
    blocks: [
      P(
        "Điểm mạnh khiến CT vượt xa unit test là fixture router: bạn chặn và giả lập request mạng mà component gọi ra, y hệt page.route() trong E2E. Nhờ đó một component gọi fetch tới /api/pricing có thể được kiểm thử với đủ mọi phản hồi — 200 dữ liệu bình thường, 500 lỗi, hay 200 nhưng dữ liệu rỗng — mà không cần backend thật. Đây là cách bạn oracle-hoá hành vi: khẳng định component render đúng theo hợp đồng dữ liệu, không phụ thuộc may rủi của server.",
        "The strength that lifts CT above unit tests is the router fixture: you intercept and mock the network requests the component fires, exactly like page.route() in E2E. So a component calling fetch to /api/pricing can be tested against every response — a normal 200, a 500 error, or a 200 with empty data — with no real backend. This is how you oracle the behaviour: assert the component renders per the data contract, not by luck of the server.",
        "CTをユニットテストより上位に引き上げる強みがrouterフィクスチャです。E2Eのpage.route()と全く同じように、コンポーネントが発するネットワークリクエストを傍受してモックできます。/api/pricingへfetchするコンポーネントは、通常の200・500エラー・空データの200など、あらゆる応答に対して本物のバックエンドなしでテストできます。これがオラクル化の方法です。サーバー任せではなく、データ契約どおりに描画されることを表明します。",
      ),
      CODE(
        "tsx",
        `// PricingPanel.ct.tsx — mock 3 kịch bản qua router fixture
import { test, expect } from '@playwright/experimental-ct-react';
import { PricingPanel } from './PricingPanel';

test('render bảng giá khi API 200', async ({ mount, router }) => {
  await router.route('**/api/pricing', (r) =>
    r.fulfill({ json: { plans: [{ id: 'pro', price: 990000 }] } }));
  const cmp = await mount(<PricingPanel tenant="acme" />);
  await expect(cmp.getByRole('row')).toContainText('990.000');
});

test('hiện trạng thái lỗi khi API 500', async ({ mount, router }) => {
  await router.route('**/api/pricing', (r) => r.fulfill({ status: 500 }));
  const cmp = await mount(<PricingPanel tenant="acme" />);
  await expect(cmp.getByRole('alert')).toContainText('Không tải được bảng giá');
});

test('trạng thái rỗng khi không có gói', async ({ mount, router }) => {
  await router.route('**/api/pricing', (r) => r.fulfill({ json: { plans: [] } }));
  const cmp = await mount(<PricingPanel tenant="acme" />);
  await expect(cmp.getByText('Chưa có gói dịch vụ')).toBeVisible();
});`,
      ),
      P(
        "Điểm tinh tế của router fixture là nó cho phép bạn phủ các nhánh mà backend thật khó tạo ra theo yêu cầu: lỗi 500 ngẫu nhiên, phản hồi chậm, dữ liệu rỗng, hay payload dị dạng. Trong thực tế, phần lớn bug UI nghiêm trọng lại nằm ở những nhánh hiếm này chứ không phải happy path. Bằng cách biến network thành đầu vào hoàn toàn kiểm soát được, bạn có thể viết một ma trận test phủ đủ mọi trạng thái mà component phải xử lý, và mỗi test là một khẳng định xác định thay vì phụ thuộc vào tâm trạng của server staging.",
        "The subtlety of the router fixture is that it lets you cover branches a real backend struggles to produce on demand: random 500s, slow responses, empty data, or malformed payloads. In practice, most serious UI bugs live in these rare branches rather than the happy path. By turning the network into a fully controllable input, you can write a test matrix covering every state the component must handle, and each test is a deterministic assertion instead of depending on the mood of a staging server.",
        "routerフィクスチャの妙は、本物のバックエンドが要求どおりに作りにくい分岐を網羅できることです。ランダムな500・遅い応答・空データ・不正なペイロード。実際、深刻なUIバグの多くはハッピーパスではなくこれらの稀な分岐に潜みます。ネットワークを完全に制御可能な入力に変えることで、コンポーネントが扱うべきあらゆる状態を網羅するテストマトリクスを書け、各テストはステージングサーバーの機嫌に依存せず決定的な表明になります。",
      ),
      NOTE(
        "router fixture bọc page.route() nhưng gắn với scope của mount(), nên mock tự dọn sau mỗi test — không rò rỉ trạng thái giữa các case (đảm bảo tính cô lập).",
        "The router fixture wraps page.route() but is scoped to mount(), so mocks are cleaned up after each test — no state leaks between cases (ensuring isolation).",
        "routerフィクスチャはpage.route()をラップしますがmount()のスコープに紐づくため、モックは各テスト後に自動で片付けられ、ケース間で状態が漏れません（隔離を保証）。",
      ),
      SCEN(
        "Kịch bản: dashboard hiển thị số âm",
        "Scenario: a dashboard showing a negative number",
        "QA phát hiện widget doanh thu đôi khi hiển thị số âm. Bạn tái hiện bằng CT: mock /api/revenue trả về giá trị âm và null, rồi khẳng định component phải hiển thị '—' thay vì số âm. Bug được cô lập trong 5 phút, không cần dựng cả môi trường staging.",
        "QA finds the revenue widget occasionally showing a negative number. You reproduce it with CT: mock /api/revenue to return a negative value and null, then assert the component must render '—' instead of a negative. The bug is isolated in 5 minutes, no full staging environment needed.",
        "シナリオ：ダッシュボードに負の数が表示される",
        "QAが売上ウィジェットに時々負の数が出るのを発見。CTで再現します。/api/revenueが負値とnullを返すようモックし、コンポーネントは負値ではなく「—」を表示すべきだと表明します。ステージング全体を立てずに5分でバグを隔離できます。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Cô lập component: fixture, provider và context",
      en: "6. Isolating a component: fixtures, providers and context",
      ja: "6. コンポーネントの隔離：フィクスチャ・プロバイダ・コンテキスト",
    },
    blocks: [
      P(
        "Một component thực tế hiếm khi đứng một mình: nó cần theme, i18n, một QueryClient, hay context xác thực. Bí quyết cô lập là dựng đúng các provider tối thiểu trong playwright/index.ts và truyền dữ liệu qua fixtures thay vì gọi API thật. Bạn kiểm soát toàn bộ đầu vào, nên mỗi test là một mệnh đề xác định: với dữ liệu X và quyền Y, component phải render Z. Đây chính là tinh thần oracle-first: khẳng định bất biến nghiệp vụ, không phải 'trông có vẻ đúng'.",
        "A real component rarely stands alone: it needs a theme, i18n, a QueryClient, or an auth context. The isolation trick is to build the minimal providers in playwright/index.ts and feed data through fixtures instead of hitting a real API. You control every input, so each test is a deterministic statement: given data X and permission Y, the component must render Z. This is the oracle-first spirit: assert business invariants, not 'looks about right'.",
        "実際のコンポーネントが単独で存在することは稀で、テーマ・i18n・QueryClient・認証コンテキストが必要です。隔離のコツは、playwright/index.tsに最小限のプロバイダを構築し、本物のAPIを叩く代わりにフィクスチャでデータを供給することです。すべての入力を制御するので、各テストは決定的な命題になります。データXと権限Yのとき、コンポーネントはZを描画しなければならない。これがオラクルファーストの精神で、「だいたい正しそう」ではなく業務不変条件を表明します。",
      ),
      CODE(
        "tsx",
        `// fixtures.ts — mở rộng test để cấp dữ liệu cô lập
import { test as base, expect } from '@playwright/experimental-ct-react';

type Fx = { proUser: { id: string; plan: 'pro' | 'free'; perms: string[] } };

export const test = base.extend<Fx>({
  proUser: async ({}, use) => {
    await use({ id: 'u1', plan: 'pro', perms: ['export', 'invite'] });
  },
});
export { expect };`,
      ),
      CODE(
        "tsx",
        `// ExportButton.ct.tsx — quyền theo gói là bất biến nghiệp vụ
import { test, expect } from './fixtures';
import { ExportButton } from './ExportButton';

test('user pro thấy nút Export', async ({ mount, proUser }) => {
  const cmp = await mount(<ExportButton user={proUser} />);
  await expect(cmp.getByRole('button', { name: 'Xuất CSV' })).toBeEnabled();
});

test('user free bị chặn Export (RBAC)', async ({ mount, proUser }) => {
  const free = { ...proUser, plan: 'free', perms: [] };
  const cmp = await mount(<ExportButton user={free} />);
  await expect(cmp.getByRole('button', { name: 'Xuất CSV' })).toBeDisabled();
  await expect(cmp.getByText('Nâng cấp để mở khoá')).toBeVisible();
});`,
      ),
      TIP(
        "Giữ provider trong index.ts ở mức tối thiểu. Nếu một component cần cả kho Redux khổng lồ mới render nổi, đó là tín hiệu cần tách nhỏ component — CT ép bạn thiết kế tốt hơn.",
        "Keep the providers in index.ts minimal. If a component needs a huge Redux store just to render, that is a signal to split it — CT nudges you toward better design.",
        "index.tsのプロバイダは最小限に保ちましょう。描画するだけで巨大なReduxストアが必要なら、それはコンポーネントを分割すべき兆候です。CTはより良い設計へ促します。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Khi nào dùng CT, khi nào dùng E2E",
      en: "7. When to use CT versus E2E",
      ja: "7. CTとE2Eの使い分け",
    },
    blocks: [
      P(
        "CT và E2E không loại trừ nhau mà bổ sung theo tầng của kim tự tháp test. Dùng CT khi bạn muốn kiểm nhanh mọi biến thể hiển thị và tương tác của một đơn vị UI: trạng thái, quyền, định dạng, edge case dữ liệu. Dùng E2E khi bạn cần chứng minh một luồng nghiệp vụ xuyên nhiều trang, có routing, đăng nhập, DB và tích hợp bên thứ ba hoạt động cùng nhau. Nguyên tắc thực dụng: nhiều CT rẻ cho bề rộng, ít E2E đắt cho các happy path và luồng tiền quan trọng.",
        "CT and E2E are not mutually exclusive; they complement each other along the test pyramid. Use CT to quickly check every display and interaction variant of a UI unit: states, permissions, formatting, data edge cases. Use E2E to prove a business flow across pages, with routing, login, DB and third-party integrations working together. The pragmatic rule: many cheap CTs for breadth, a few expensive E2Es for happy paths and money-critical flows.",
        "CTとE2Eは相互排他ではなく、テストピラミッドに沿って補い合います。CTはUIユニットの表示と操作のあらゆる変種（状態・権限・書式・データの境界）を素早く確認するのに使います。E2Eはページをまたぐ業務フローを、ルーティング・ログイン・DB・サードパーティ連携が一緒に動くことで証明するのに使います。実用的な原則は、幅のために安価なCTを多く、ハッピーパスと金銭に関わる重要フローのために高価なE2Eを少数、です。",
      ),
      UL(
        [
          "CT: biến thể trạng thái (loading/empty/error), định dạng số/tiền/ngày theo locale.",
          "CT: quyền theo gói, ẩn/hiện nút, accessibility role của một component.",
          "CT: hồi quy giao diện ở mức đơn vị + snapshot ảnh khi cần.",
          "E2E: luồng đăng nhập → thao tác → thanh toán qua nhiều trang.",
          "E2E: kiểm chứng bất biến hệ thống (tồn kho không âm, tiền cân đối) end-to-end.",
        ],
        [
          "CT: state variants (loading/empty/error), number/money/date formatting per locale.",
          "CT: per-plan permissions, showing/hiding buttons, a component's accessibility role.",
          "CT: unit-level visual regression + image snapshots when needed.",
          "E2E: login → action → checkout flow across many pages.",
          "E2E: verify system invariants (inventory never negative, money balanced) end-to-end.",
        ],
        [
          "CT：状態の変種（ローディング/空/エラー）、ロケール別の数値・金額・日付の書式。",
          "CT：プラン別権限、ボタンの表示・非表示、コンポーネントのアクセシビリティロール。",
          "CT：ユニットレベルのビジュアル回帰＋必要に応じた画像スナップショット。",
          "E2E：ログイン→操作→決済のページをまたぐフロー。",
          "E2E：システム不変条件（在庫が負にならない、金額の均衡）をエンドツーエンドで検証。",
        ],
      ),
      QA(
        "Nếu đã có E2E cho checkout, tại sao còn viết CT cho component giỏ hàng?",
        "If we already have E2E for checkout, why still write CT for the cart component?",
        "Vì E2E chỉ chạy được vài happy path do chi phí cao; nó khó phủ hết 12 biến thể hiển thị của giỏ hàng (mã giảm giá không hợp lệ, tồn kho 0, số lượng vượt giới hạn). CT phủ bề rộng đó trong mili-giây và cô lập, còn E2E giữ vai trò chứng minh cả luồng liên thông thật. Hai lớp bù nhau, không trùng lặp.",
        "Because E2E can only afford a few happy paths; it hardly covers the cart's 12 display variants (invalid coupon, zero stock, quantity over the limit). CT covers that breadth in milliseconds and in isolation, while E2E proves the whole integrated flow. The two layers complement rather than duplicate.",
        "コスト高のためE2Eは少数のハッピーパスしか走らせられず、カートの12の表示変種（無効クーポン・在庫0・数量上限超え）を網羅しにくいからです。CTはその幅をミリ秒かつ隔離して網羅し、E2Eは統合フロー全体を証明します。2つの層は重複ではなく補完です。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Visual regression cho component",
      en: "8. Visual regression for components",
      ja: "8. コンポーネントのビジュアル回帰",
    },
    blocks: [
      P(
        "Vì CT render trong trình duyệt thật, bạn có thể chụp ảnh snapshot của component và so pixel để bắt hồi quy giao diện — điều unit test trên jsdom không làm được. toHaveScreenshot() so ảnh hiện tại với baseline, cho phép ngưỡng sai lệch nhỏ để tránh nhiễu font. Chiến lược tốt là snapshot ở mức component nhỏ (nút, thẻ, biểu đồ) thay vì cả trang, vì ảnh nhỏ ổn định hơn và khi khác biệt, bạn biết ngay component nào đổi.",
        "Because CT renders in a real browser, you can capture screenshots of a component and diff pixels to catch visual regressions — something jsdom unit tests cannot do. toHaveScreenshot() compares the current image against a baseline, allowing a small tolerance to avoid font noise. A good strategy is to snapshot small components (buttons, cards, charts) rather than whole pages, since small images are more stable and, on a diff, you know exactly which component changed.",
        "CTは実際のブラウザで描画するため、コンポーネントのスクリーンショットを撮ってピクセル差分を取り、ビジュアル回帰を検出できます。これはjsdomのユニットテストにはできません。toHaveScreenshot()は現在の画像をベースラインと比較し、フォントのノイズを避けるため小さな許容差を設定できます。良い戦略はページ全体ではなく小さなコンポーネント（ボタン・カード・グラフ）をスナップショットすることです。小さな画像は安定し、差分が出たときどのコンポーネントが変わったか即座に分かります。",
      ),
      CODE(
        "tsx",
        `// Badge.ct.tsx — visual snapshot ổn định
import { test, expect } from '@playwright/experimental-ct-react';
import { Badge } from './Badge';

test('badge critical khớp baseline', async ({ mount }) => {
  const cmp = await mount(<Badge tone="critical">Quá hạn</Badge>);
  await expect(cmp).toHaveScreenshot('badge-critical.png', {
    maxDiffPixelRatio: 0.01,   // dung sai 1% tránh nhiễu antialias
    animations: 'disabled',    // tắt animation cho ảnh tĩnh
  });
});`,
      ),
      WARN(
        "Baseline ảnh phải sinh trong CI (cùng OS/font) chứ không phải máy dev, nếu không font khác nhau sẽ làm test đỏ giả. Commit ảnh baseline từ runner Linux của CI.",
        "Image baselines must be generated in CI (same OS/fonts), not on a dev machine, otherwise font differences cause false reds. Commit baselines from the CI Linux runner.",
        "画像ベースラインは開発機ではなくCI（同じOS/フォント）で生成する必要があります。そうしないとフォント差で偽の失敗が出ます。CIのLinuxランナーからベースラインをコミットしましょう。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Debug component với Trace và UI Mode",
      en: "9. Debugging components with Trace and UI Mode",
      ja: "9. TraceとUIモードでコンポーネントをデバッグ",
    },
    blocks: [
      P(
        "CT dùng chung công cụ gỡ lỗi với E2E. Bật trace để mỗi lần retry thất bại đều ghi lại snapshot DOM, network và console; mở bằng show-trace để time-travel qua từng action. UI Mode còn tiện hơn khi phát triển: cây test, live preview và locator picker cho component. Nhờ vậy, kể cả khi component render sai trong một tổ hợp props hiếm, bạn vẫn tái hiện và soi được nguyên nhân mà không cần console.log rải khắp code.",
        "CT shares its debugging tools with E2E. Turn on trace so every failing retry records DOM snapshots, network and console; open it with show-trace to time-travel through each action. UI Mode is even handier during development: the test tree, live preview and locator picker work for components too. So even when a component renders wrong under a rare props combination, you can reproduce and pinpoint the cause without scattering console.log across the code.",
        "CTはデバッグツールをE2Eと共有します。traceを有効にすると、失敗するリトライごとにDOMスナップショット・ネットワーク・コンソールが記録され、show-traceで開いて各アクションをタイムトラベルできます。開発中はUIモードがさらに便利で、テストツリー・ライブプレビュー・ロケーターピッカーがコンポーネントでも使えます。稀なprops組み合わせでコンポーネントが誤描画しても、コード中にconsole.logを撒かずに再現し原因を特定できます。",
      ),
      CODE(
        "bash",
        `# chạy CT ở chế độ UI để phát triển với watch loop
npx playwright test -c playwright-ct.config.ts --ui

# mở trace của một lần fail
npx playwright show-trace test-results/**/trace.zip`,
      ),
      TIP(
        "Đặt trace: 'on-first-retry' trong config CT: bản chạy đầu nhanh, chỉ khi retry mới ghi trace — tiết kiệm thời gian mà vẫn có bằng chứng khi flaky.",
        "Set trace: 'on-first-retry' in the CT config: the first run stays fast, trace is recorded only on retry — saving time while keeping evidence when flaky.",
        "CT設定でtrace: 'on-first-retry'を設定しましょう。初回は高速のまま、リトライ時だけtraceを記録するので、時間を節約しつつフレーキー時の証拠を残せます。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Chạy CT trong CI/CD",
      en: "10. Running CT in CI/CD",
      ja: "10. CI/CDでCTを実行する",
    },
    blocks: [
      P(
        "Trong CI, CT cần trình duyệt được cài (playwright install --with-deps) và một job riêng, tách khỏi E2E để song song hoá và báo cáo rõ ràng. Vì CT không cần dựng backend, job này nhanh và ổn định, hợp làm cổng chặn trên mỗi pull request. Kết hợp sharding để chia đều test qua nhiều máy, cùng blob report gộp lại, bạn có phản hồi trong vài phút. Đây là lớp test lý tưởng để chặn hồi quy UI trước khi merge.",
        "In CI, CT needs browsers installed (playwright install --with-deps) and its own job, separate from E2E to parallelize and report cleanly. Since CT needs no backend, this job is fast and stable, ideal as a gate on every pull request. Combine sharding to split tests across machines with a merged blob report, and you get feedback in minutes. This is the ideal layer to block UI regressions before merge.",
        "CIではCTにブラウザのインストール（playwright install --with-deps）と、並列化と明確なレポートのためE2Eと分けた専用ジョブが必要です。CTはバックエンド不要なので高速で安定し、プルリクエストごとのゲートに最適です。テストを複数マシンに分けるシャーディングとblobレポートの統合を組み合わせれば、数分でフィードバックが得られます。マージ前にUI回帰を止める理想的な層です。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/ct.yml
name: component-tests
on: [pull_request]
jobs:
  ct:
    runs-on: ubuntu-latest
    strategy:
      matrix: { shard: [1, 2, 3] }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test -c playwright-ct.config.ts
             --shard=\${{ matrix.shard }}/3
      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: ct-report-\${{ matrix.shard }}, path: playwright-report }`,
      ),
      NOTE(
        "Ghim phiên bản trình duyệt qua @playwright/test đã pin trong package-lock để baseline visual không lệch giữa local và CI.",
        "Pin the browser version via @playwright/test locked in package-lock so visual baselines don't drift between local and CI.",
        "package-lockで固定した@playwright/test経由でブラウザ版を固定し、ローカルとCIでビジュアルベースラインがずれないようにします。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Cạm bẫy thường gặp và cách né",
      en: "11. Common pitfalls and how to avoid them",
      ja: "11. よくある落とし穴と回避法",
    },
    blocks: [
      P(
        "CT mạnh nhưng có vài cái bẫy khiến người mới nản. Bẫy phổ biến nhất là truyền prop không serialize được rồi ngạc nhiên vì component không nhận đúng dữ liệu. Bẫy thứ hai là quên nạp CSS toàn cục trong index.ts, khiến snapshot lệch so với production. Bẫy thứ ba là nhầm CT với unit test, cố mock quá sâu vào nội tại framework thay vì mock ở ranh giới network. Hiểu rõ ranh giới Node ↔ browser giúp bạn tránh gần hết rắc rối.",
        "CT is powerful but has traps that frustrate newcomers. The most common is passing a non-serializable prop then being surprised the component gets the wrong data. The second is forgetting to load global CSS in index.ts, making snapshots differ from production. The third is confusing CT with unit tests, trying to mock deep into framework internals instead of mocking at the network boundary. Understanding the Node ↔ browser boundary avoids most of the trouble.",
        "CTは強力ですが、初心者を悩ませる落とし穴があります。最も多いのはシリアライズできないpropを渡し、コンポーネントが誤ったデータを受け取ることに驚くケースです。2つ目はindex.tsでグローバルCSSの読み込みを忘れ、スナップショットが本番と異なることです。3つ目はCTをユニットテストと混同し、ネットワーク境界でモックする代わりにフレームワーク内部まで深くモックしようとすることです。Node↔ブラウザ境界を理解すれば、ほとんどの問題を避けられます。",
      ),
      UL(
        [
          "Prop phải serialize được: truyền id/dữ liệu, không truyền instance có method.",
          "Nạp đủ CSS/theme trong index.ts để ảnh khớp production.",
          "Mock ở ranh giới network (router), đừng vá sâu nội tại framework.",
          "Tách config CT và E2E để không lẫn file, lẫn cổng.",
          "Sinh baseline visual trên CI, không trên máy dev.",
        ],
        [
          "Props must be serializable: pass ids/data, not instances with methods.",
          "Load full CSS/theme in index.ts so images match production.",
          "Mock at the network boundary (router), don't patch framework internals.",
          "Separate CT and E2E configs to avoid mixing files and ports.",
          "Generate visual baselines on CI, not on a dev machine.",
        ],
        [
          "propはシリアライズ可能に：メソッド付きインスタンスではなくid/データを渡す。",
          "index.tsでCSS/テーマを完全に読み込み、画像を本番と一致させる。",
          "ネットワーク境界（router）でモックし、フレームワーク内部にパッチを当てない。",
          "CTとE2Eの設定を分け、ファイルやポートの混在を避ける。",
          "ビジュアルベースラインは開発機ではなくCIで生成する。",
        ],
      ),
      QA(
        "Component gọi useEffect fetch dữ liệu, test đôi khi đỏ đôi khi xanh — vì sao?",
        "The component fetches in useEffect; the test is sometimes red, sometimes green — why?",
        "Đó là flaky do đọc DOM trước khi effect và mock kịp resolve. Sửa bằng router.route để cố định phản hồi và dùng assertion tự chờ (expect(...).toBeVisible()) thay vì đọc innerText ngay. Assertion web-first sẽ poll đến khi dữ liệu về, biến case bất định thành xác định.",
        "That is flakiness from reading the DOM before the effect and mock resolve. Fix it by pinning the response with router.route and using auto-waiting assertions (expect(...).toBeVisible()) instead of reading innerText immediately. Web-first assertions poll until data arrives, turning a non-deterministic case into a deterministic one.",
        "それはエフェクトとモックが解決する前にDOMを読むことによるフレーキーです。router.routeで応答を固定し、innerTextを即座に読む代わりに自動待機アサーション（expect(...).toBeVisible()）を使って修正します。web-firstアサーションはデータが届くまでポーリングし、非決定的なケースを決定的にします。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Chiến lược phủ test cho một feature SaaS",
      en: "12. A coverage strategy for a SaaS feature",
      ja: "12. SaaS機能のためのカバレッジ戦略",
    },
    blocks: [
      P(
        "Hãy áp dụng vào một tính năng thực: bảng quản lý thành viên (Members) của một SaaS đa tenant. Chiến lược phủ test hiệu quả sẽ trải theo tầng: CT phủ bề rộng biến thể của từng component (hàng thành viên, badge vai trò, menu hành động, hộp mời), còn một số ít E2E chứng minh luồng mời-và-nhận-mời thật. Ma trận case của CT nên bám vào bảng quyết định quyền hạn, để mỗi ô trong bảng RBAC đều có một test tương ứng.",
        "Let's apply this to a real feature: the Members management table of a multi-tenant SaaS. An effective coverage strategy spreads across layers: CT covers the breadth of each component's variants (member row, role badge, action menu, invite box), while a few E2E prove the real invite-and-accept flow. The CT case matrix should follow the permissions decision table, so every cell in the RBAC table has a matching test.",
        "これを実機能に適用しましょう。マルチテナントSaaSのメンバー管理テーブルです。効果的なカバレッジ戦略は層をまたいで広がります。CTは各コンポーネントの変種（メンバー行・ロールバッジ・操作メニュー・招待ボックス）の幅を網羅し、少数のE2Eが実際の招待と承諾フローを証明します。CTのケースマトリクスは権限の決定表に従い、RBACテーブルの各セルに対応するテストを持たせるべきです。",
      ),
      CODE(
        "ts",
        `// members.matrix.ts — bảng quyết định làm ma trận CT
export const roleMatrix = [
  // role,   canInvite, canRemove, canChangeRole
  ['owner',  true,      true,      true ],
  ['admin',  true,      true,      false],
  ['member', false,     false,     false],
] as const;`,
      ),
      CODE(
        "tsx",
        `// MemberRow.ct.tsx — data-driven theo ma trận quyền
import { test, expect } from '@playwright/experimental-ct-react';
import { MemberRow } from './MemberRow';
import { roleMatrix } from './members.matrix';

for (const [role, canInvite, canRemove, canChangeRole] of roleMatrix) {
  test(\`vai trò \${role}: quyền hiển thị đúng bảng RBAC\`, async ({ mount }) => {
    const cmp = await mount(<MemberRow viewerRole={role} member={{ name: 'An', role: 'member' }} />);
    const remove = cmp.getByRole('button', { name: 'Gỡ' });
    await (canRemove ? expect(remove).toBeEnabled() : expect(remove).toBeDisabled());
    const change = cmp.getByRole('button', { name: 'Đổi vai trò' });
    await (canChangeRole ? expect(change).toBeVisible() : expect(change).toBeHidden());
  });
}`,
      ),
      SCEN(
        "Kịch bản phỏng vấn: thiết kế test cho bảng Members",
        "Interview scenario: design tests for the Members table",
        "Người phỏng vấn yêu cầu bạn phủ test cho bảng Members đa tenant. Câu trả lời mạnh: bắt đầu bằng bảng quyết định RBAC làm oracle, dùng CT data-driven để mỗi ô quyền có một test, mock network để phủ empty/error, rồi thêm 1-2 E2E cho luồng mời thật và kiểm tenant isolation. Bạn thể hiện tư duy tầng test và oracle-first, không chỉ 'click cho chạy'.",
        "The interviewer asks you to cover tests for a multi-tenant Members table. A strong answer: start from the RBAC decision table as the oracle, use data-driven CT so each permission cell has a test, mock network to cover empty/error, then add 1-2 E2E for the real invite flow and tenant isolation. You show layered test thinking and oracle-first, not just 'click to make it pass'.",
        "面接シナリオ：メンバーテーブルのテスト設計",
        "面接官がマルチテナントのメンバーテーブルのテスト網羅を求めます。強い回答は、RBAC決定表をオラクルとして始め、データ駆動CTで各権限セルにテストを持たせ、ネットワークをモックして空/エラーを網羅し、実際の招待フローとテナント隔離のためにE2Eを1〜2本追加することです。「動くまでクリック」ではなく、層状のテスト思考とオラクルファーストを示せます。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn và tổng kết",
      en: "13. Interview angle and summary",
      ja: "13. 面接の観点とまとめ",
    },
    blocks: [
      P(
        "Ở phỏng vấn QA/SDET 2026, hiểu Component Testing giúp bạn nổi bật vì nó chạm vào cả kỹ thuật lẫn tư duy kiến trúc test. Nhà tuyển dụng muốn nghe bạn phân biệt rạch ròi ba tầng — unit, component, E2E — và biết đặt mỗi loại kiểm thử đúng chỗ để tối ưu chi phí/độ tin cậy. Điểm cộng lớn là bạn nói được vì sao CT trong browser thật bắt được lỗi mà jsdom bỏ sót, và cách router fixture biến network thành đầu vào kiểm soát được.",
        "In 2026 QA/SDET interviews, understanding Component Testing sets you apart because it touches both technique and test-architecture thinking. Employers want to hear you clearly distinguish the three layers — unit, component, E2E — and place each test type where it optimizes cost/reliability. A big plus is explaining why CT in a real browser catches bugs jsdom misses, and how the router fixture turns the network into a controllable input.",
        "2026年のQA/SDET面接では、コンポーネントテストの理解が技術とテストアーキテクチャ思考の両方に触れるため、他者と差がつきます。採用側はユニット・コンポーネント・E2Eの3層を明確に区別し、コストと信頼性を最適化する場所に各テストを配置できることを聞きたがります。実ブラウザのCTがjsdomの見逃すバグを捉える理由と、routerフィクスチャがネットワークを制御可能な入力に変える方法を説明できるのが大きな加点です。",
      ),
      P(
        "Tổng kết lại: Component Testing của Playwright cho bạn render component trong trình duyệt thật, mock network ngay tại chỗ và tái dùng toàn bộ locator, assertion, trace của E2E. Nó là lớp test bề rộng, nhanh, cô lập và rẻ — hoàn hảo để chặn hồi quy UI trên mỗi pull request. Kết hợp CT cho biến thể và E2E cho luồng liên thông, đội của bạn có một kim tự tháp test cân bằng, phản hồi nhanh và ít flaky.",
        "To sum up: Playwright Component Testing lets you render a component in a real browser, mock the network in place and reuse all of E2E's locators, assertions and traces. It is the broad, fast, isolated, cheap test layer — perfect to block UI regressions on every pull request. Combine CT for variants and E2E for integrated flows, and your team gets a balanced test pyramid with fast feedback and low flakiness.",
        "まとめると、Playwrightのコンポーネントテストは、コンポーネントを実ブラウザで描画し、その場でネットワークをモックし、E2Eのロケーター・アサーション・traceをすべて再利用できます。幅広く・高速・隔離・安価なテスト層であり、プルリクエストごとにUI回帰を止めるのに最適です。変種にCT、統合フローにE2Eを組み合わせれば、チームは速いフィードバックと低いフレーキーの均衡あるテストピラミッドを得られます。",
      ),
      QA(
        "Nêu một câu tóm gọn để trả lời 'CT khác unit test ở đâu?'",
        "Give one crisp line answering 'how does CT differ from a unit test?'",
        "CT render component trong trình duyệt thật nên bắt được CSS, layout, focus và tương tác thật, đồng thời mock network ở ranh giới thay vì stub sâu nội tại — unit test trên jsdom không có những khả năng đó.",
        "CT renders the component in a real browser so it catches real CSS, layout, focus and interaction, and mocks the network at the boundary rather than stubbing deep internals — jsdom unit tests lack those abilities.",
        "CTはコンポーネントを実ブラウザで描画するため、本物のCSS・レイアウト・フォーカス・操作を捉え、内部を深くスタブする代わりに境界でネットワークをモックします。jsdomのユニットテストにはこれらの能力がありません。",
      ),
      QA(
        "Nhược điểm của CT là gì và bạn cân bằng thế nào?",
        "What are CT's drawbacks and how do you balance them?",
        "CT vẫn mang tiền tố experimental và cần cài trình duyệt nên nặng hơn unit test thuần; nó cũng không chứng minh được tích hợp hệ thống thật. Tôi cân bằng bằng cách giữ CT cho bề rộng biến thể UI, dùng unit test cho logic thuần không cần DOM, và dành E2E cho vài luồng nghiệp vụ quan trọng — mỗi loại đúng vai để tổng chi phí thấp nhất.",
        "CT still carries the experimental prefix and needs a browser install, so it is heavier than pure unit tests; it also cannot prove real system integration. I balance it by keeping CT for UI variant breadth, using unit tests for pure DOM-free logic, and reserving E2E for a few critical business flows — each in its proper role for the lowest total cost.",
        "CTは今も実験的接頭辞を持ちブラウザのインストールが必要なため、純粋なユニットテストより重く、実システム統合も証明できません。私はCTをUI変種の幅に、DOM不要の純ロジックにユニットテストを、重要な業務フローにE2Eを充てて均衡させます。各々が適切な役割を担い、総コストを最小化します。",
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — Trace Viewer & UI Mode 2026
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Trace Viewer & UI Mode: bức tranh tổng quan",
      en: "1. Trace Viewer & UI Mode: the big picture",
      ja: "1. Trace ViewerとUIモード：全体像",
    },
    blocks: [
      P(
        "Trace Viewer là hộp đen của một test Playwright: nó ghi lại toàn bộ hành trình chạy — từng action, ảnh snapshot DOM trước và sau, network, console, source — để bạn mở ra và tua ngược thời gian mà không cần chạy lại. UI Mode là môi trường phát triển test tương tác, cho bạn xem cây test, live preview và chọn locator ngay trong trình duyệt. Kết hợp hai công cụ này, việc gỡ lỗi test chuyển từ 'đoán mò và console.log' sang 'nhìn thẳng vào bằng chứng'.",
        "Trace Viewer is the black box of a Playwright test: it records the whole run — each action, DOM snapshots before and after, network, console, source — so you can open it and rewind time without rerunning. UI Mode is the interactive test development environment, showing the test tree, live preview and locator picking right in the browser. Together, debugging shifts from 'guess and console.log' to 'look straight at the evidence'.",
        "Trace ViewerはPlaywrightテストのブラックボックスです。実行の全行程（各アクション、前後のDOMスナップショット、ネットワーク、コンソール、ソース）を記録するので、再実行せずに開いて時間を巻き戻せます。UIモードは対話的なテスト開発環境で、テストツリー・ライブプレビュー・ロケーター選択をブラウザ内で提供します。両者を合わせると、デバッグは「当て推量とconsole.log」から「証拠を直接見る」へ変わります。",
      ),
      IMG(
        svgTraceAnat,
        "Cấu trúc Trace Viewer: timeline action, snapshot time-travel, các tab.",
        "Trace Viewer structure: action timeline, time-travel snapshots, tabs.",
        "Trace Viewerの構造：アクションのタイムライン、タイムトラベルのスナップショット、タブ。",
      ),
      P(
        "Điều khiến hai công cụ này thay đổi cách làm việc là chúng loại bỏ khâu tái hiện thủ công — thứ vốn tốn nhiều thời gian nhất khi gỡ lỗi. Trước đây, một test đỏ trên CI buộc bạn phải dựng lại môi trường, chạy đi chạy lại và hy vọng lỗi tái xuất; nay trace đã đóng gói sẵn hiện trường để bạn mở ra bất cứ lúc nào. Kết quả là chu trình chẩn đoán rút ngắn từ hàng giờ xuống còn vài phút, và quan trọng hơn, kết luận của bạn dựa trên dữ liệu thật thay vì suy đoán. Đó là bước nhảy về năng suất và cả về độ tin cậy của kết luận.",
        "What makes these two tools change how you work is that they remove manual reproduction — the most time-consuming part of debugging. Before, a test red on CI forced you to rebuild the environment, run it repeatedly and hope the bug reappeared; now the trace already packages the crime scene to open anytime. The result is a diagnosis cycle shrinking from hours to minutes, and more importantly your conclusions rest on real data instead of speculation. That is a leap in both productivity and the reliability of the conclusion.",
        "この2つのツールが働き方を変えるのは、デバッグで最も時間のかかる手動再現をなくすからです。以前はCIで赤いテストのため環境を再構築し、繰り返し実行してバグの再出現を願う必要がありました。今はtraceが現場をすでにパッケージ化し、いつでも開けます。結果として診断サイクルは数時間から数分に縮み、さらに重要なことに、結論は推測ではなく実データに基づきます。これは生産性と結論の信頼性の両方における飛躍です。",
      ),
      NOTE(
        "Trace là artefact độc lập (file zip): bạn có thể tải nó từ CI về máy và mở bằng show-trace hay trace.playwright.dev mà không cần cả repo hay môi trường.",
        "A trace is a standalone artefact (a zip file): you can download it from CI and open it with show-trace or trace.playwright.dev without the whole repo or environment.",
        "traceは独立した成果物（zipファイル）です。CIからダウンロードし、リポジトリや環境なしにshow-traceやtrace.playwright.devで開けます。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Chế độ retain-on-failure-and-retries",
      en: "2. The retain-on-failure-and-retries mode",
      ja: "2. retain-on-failure-and-retries モード",
    },
    blocks: [
      P(
        "Ghi trace luôn tốn chi phí, nên chiến lược retention quyết định bạn có bằng chứng khi cần mà không làm chậm toàn bộ suite. Chế độ 'retain-on-failure-and-retries' là lựa chọn cân bằng nhất cho 2026: bản chạy đầu qua thì không giữ trace, nhưng nếu test fail hoặc phải retry, Playwright giữ lại trace của cả lần fail đầu tiên lẫn các lần retry. Nhờ vậy bạn có thể so sánh trực tiếp lần chạy hỏng với lần chạy đậu để tìm ra khác biệt gây flaky.",
        "Recording a trace always costs, so the retention strategy decides whether you have evidence when needed without slowing the whole suite. The 'retain-on-failure-and-retries' mode is the most balanced choice for 2026: a passing first run keeps no trace, but if a test fails or must retry, Playwright keeps traces of both the first failure and the retries. This lets you directly compare a failing run against a passing one to find the difference causing flakiness.",
        "trace記録には常にコストがかかるため、保持戦略は、スイート全体を遅くせずに必要なときに証拠を持てるかを決めます。'retain-on-failure-and-retries'モードは2026年に最もバランスの取れた選択です。初回成功ではtraceを残さず、失敗またはリトライが必要なときは、最初の失敗とリトライの両方のtraceを保持します。これにより、失敗した実行と成功した実行を直接比較し、フレーキーの原因となる差を見つけられます。",
      ),
      CODE(
        "ts",
        `// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
  use: {
    // giữ trace khi FAIL và ở mọi lần RETRY -> so sánh pass vs fail
    trace: 'retain-on-failure-and-retries',
    // tương tự cho video/screenshot khi cần
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});`,
      ),
      UL(
        [
          "'off': không ghi — nhanh nhất, không có bằng chứng.",
          "'on': ghi mọi lần — nặng, chỉ dùng khi điều tra sâu.",
          "'on-first-retry': chỉ ghi ở retry đầu — nhẹ, hợp CI thường ngày.",
          "'retain-on-failure-and-retries': giữ khi fail + mọi retry — tốt để so pass/fail.",
        ],
        [
          "'off': no recording — fastest, no evidence.",
          "'on': record every run — heavy, only for deep investigation.",
          "'on-first-retry': record only on first retry — light, good for daily CI.",
          "'retain-on-failure-and-retries': keep on failure + all retries — great to compare pass/fail.",
        ],
        [
          "'off'：記録なし。最速だが証拠なし。",
          "'on'：毎回記録。重く、深い調査時のみ。",
          "'on-first-retry'：初回リトライのみ記録。軽く、日常CI向け。",
          "'retain-on-failure-and-retries'：失敗時と全リトライで保持。成功/失敗の比較に最適。",
        ],
      ),
      P(
        "Chọn đúng chế độ retention là bài toán cân bằng giữa chi phí và khả năng chẩn đoán. Ghi trace cho mọi lần chạy làm suite chậm và phình dung lượng artefact, nhất là với hàng nghìn test; ngược lại tắt hẳn thì khi lỗi xảy ra bạn trắng tay. retain-on-failure-and-retries đạt điểm cân bằng tối ưu vì nó chỉ tốn chi phí đúng lúc có vấn đề, và luôn giữ cả bản hỏng lẫn bản retry để đối chiếu. Đây là lý do nó trở thành khuyến nghị thực chiến cho các đội vận hành suite lớn trên CI năm 2026.",
        "Choosing the right retention mode is a balance between cost and diagnosability. Recording a trace for every run slows the suite and bloats artefact size, especially with thousands of tests; turning it off leaves you empty-handed when a failure strikes. retain-on-failure-and-retries hits the optimal balance because it only pays the cost exactly when there is a problem, and always keeps both the failing and the retry runs to compare. This is why it became the practical recommendation for teams running large CI suites in 2026.",
        "適切な保持モードの選択は、コストと診断可能性のバランスです。毎回traceを記録するとスイートが遅くなり成果物のサイズが膨らみます。特に数千のテストではそうです。逆に完全に切ると、失敗が起きたとき手ぶらになります。retain-on-failure-and-retriesは、問題があるときだけコストを払い、比較のため失敗とリトライの両方を常に保持するので最適なバランスに達します。これが2026年に大規模CIスイートを運用するチームへの実践的な推奨となった理由です。",
      ),
      TIP(
        "Với suite lớn, 'retain-on-failure-and-retries' là mặc định vàng: bạn không trả giá tốc độ cho các test đậu, nhưng luôn có đủ trace để mổ xẻ flaky.",
        "For a large suite, 'retain-on-failure-and-retries' is the golden default: you pay no speed cost for passing tests but always have enough traces to dissect flakiness.",
        "大規模スイートでは'retain-on-failure-and-retries'が黄金のデフォルトです。成功テストで速度を犠牲にせず、フレーキーを解剖するのに十分なtraceを常に持てます。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. So sánh trace đậu và trace hỏng",
      en: "3. Comparing a passing trace with a failing one",
      ja: "3. 成功traceと失敗traceの比較",
    },
    blocks: [
      P(
        "Khi một test flaky, so sánh trace của lần đậu và lần hỏng là kỹ thuật gỡ lỗi mạnh nhất. Vì retain-on-failure-and-retries giữ cả hai, bạn mở song song hai trace và dò theo timeline: hành động nào chạy khác thứ tự, request nào trả status khác, thời điểm nào DOM chưa kịp cập nhật. Rất thường xuyên, khác biệt nằm ở một race condition — lần hỏng click nút trước khi API kịp resolve, còn lần đậu thì mạng nhanh hơn một nhịp.",
        "When a test is flaky, comparing the passing and failing traces is the most powerful debugging technique. Because retain-on-failure-and-retries keeps both, you open the two traces side by side and follow the timeline: which action ran in a different order, which request returned a different status, when the DOM hadn't updated yet. Very often the difference is a race condition — the failing run clicked a button before the API resolved, while the passing run had a beat-faster network.",
        "テストがフレーキーなとき、成功と失敗のtraceを比較するのが最も強力なデバッグ手法です。retain-on-failure-and-retriesは両方を保持するので、2つのtraceを並べて開き、タイムラインを追います。どのアクションが違う順序で走ったか、どのリクエストが違うステータスを返したか、いつDOMがまだ更新されていなかったか。差はしばしば競合状態です。失敗した実行はAPIが解決する前にボタンをクリックし、成功した実行はネットワークが一拍速かったのです。",
      ),
      CODE(
        "bash",
        `# mở lần lượt hai trace để đối chiếu
npx playwright show-trace test-results/checkout-retry1/trace.zip   # hỏng
npx playwright show-trace test-results/checkout-retry2/trace.zip   # đậu

# hoặc kéo-thả file zip vào https://trace.playwright.dev`,
      ),
      SCEN(
        "Kịch bản: coupon lúc áp được lúc không",
        "Scenario: a coupon that sometimes applies, sometimes not",
        "Test 'áp mã giảm giá' đỏ khoảng 1/10 lần. Mở trace hỏng, bạn thấy request POST /coupon trả 200 nhưng UI đọc tổng tiền trước khi state cập nhật; trace đậu cho thấy có thêm một nhịp re-render. Nguyên nhân là assertion đọc text quá sớm. Sửa bằng expect(total).toHaveText(...) để auto-wait, test hết flaky. Trace biến giả thuyết mơ hồ thành bằng chứng cụ thể.",
        "The 'apply coupon' test goes red about 1 in 10 runs. Opening the failing trace, you see POST /coupon returned 200 but the UI read the total before state updated; the passing trace shows an extra re-render beat. The cause is an assertion reading text too early. Fix with expect(total).toHaveText(...) to auto-wait, and flakiness disappears. The trace turns a vague hypothesis into concrete evidence.",
        "シナリオ：適用できたりできなかったりするクーポン",
        "「クーポン適用」テストが約10回に1回失敗します。失敗traceを開くと、POST /couponは200を返したがUIは状態更新前に合計を読んでいました。成功traceには追加の再描画の一拍が見えます。原因はテキストを早く読みすぎるアサーションです。expect(total).toHaveText(...)で自動待機に修正すると、フレーキーが消えます。traceは曖昧な仮説を具体的な証拠に変えます。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Inline text attachments: đính bằng chứng vào trace",
      en: "4. Inline text attachments: pinning evidence into the trace",
      ja: "4. インラインテキスト添付：traceに証拠を貼る",
    },
    blocks: [
      P(
        "Trace Viewer 2026 hiển thị các attachment văn bản ngay trong tab đính kèm, không cần mở file rời. Bạn có thể đính JSON payload, response body, hay một bản tóm tắt trạng thái nghiệp vụ vào đúng bước mà nó có ý nghĩa. Nhờ vậy, khi mở trace lỗi, người đọc thấy ngay dữ liệu thật đi kèm hành động — ví dụ body của request thanh toán ngay cạnh action click Pay. Đây là cách biến trace thành một bản tường thuật tự giải thích.",
        "Trace Viewer 2026 shows text attachments right in the attachments tab, no separate file to open. You can attach a JSON payload, a response body, or a business-state summary to exactly the step where it matters. So when opening a failing trace, the reader immediately sees the real data alongside the action — for example the payment request body right next to the Pay click action. This turns a trace into a self-explaining narrative.",
        "Trace Viewer 2026はテキスト添付を添付タブ内に直接表示し、別ファイルを開く必要がありません。JSONペイロード・レスポンスボディ・業務状態の要約を、意味のあるステップに正確に添付できます。失敗traceを開くと、読者はアクションと並んだ実データをすぐ見られます。例えばPayクリックのすぐ隣に決済リクエストのボディが見えます。これはtraceを自己説明的な物語に変えます。",
      ),
      CODE(
        "ts",
        `import { test, expect } from '@playwright/test';

test('thanh toán ghi lại payload để trace tự giải thích', async ({ page }, testInfo) => {
  const payload = { orderId: 'o-812', amount: 199000, currency: 'VND' };

  // đính JSON vào trace — hiện đẹp, auto-format trong Trace Viewer
  await testInfo.attach('payment-request', {
    body: JSON.stringify(payload, null, 2),
    contentType: 'application/json',
  });

  await page.goto('/checkout');
  await page.getByRole('button', { name: 'Pay' }).click();
  await expect(page.getByRole('status')).toHaveText('Thanh toán thành công');
});`,
      ),
      TIP(
        "Đính response body của API quan trọng (thanh toán, tồn kho) vào trace: khi test hỏng trên CI, bạn đọc được dữ liệu thực tế mà không cần tái hiện tại chỗ.",
        "Attach the response body of critical APIs (payment, inventory) to the trace: when a test fails on CI, you can read the real data without reproducing locally.",
        "重要なAPI（決済・在庫）のレスポンスボディをtraceに添付しましょう。CIでテストが失敗しても、ローカルで再現せずに実データを読めます。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Show/hide routing actions",
      en: "5. Showing and hiding routing actions",
      ja: "5. ルーティングアクションの表示・非表示",
    },
    blocks: [
      P(
        "Khi test dùng nhiều page.route() để mock, timeline có thể ngập các action route làm rối mắt. Trace Viewer cho phép bật/tắt hiển thị các action routing để bạn tập trung vào hành vi người dùng thật. Ngược lại, khi nghi ngờ một mock chặn nhầm request, bạn bật chúng lên để thấy đúng route nào khớp, fulfill status gì. Khả năng lọc này giúp trace vừa gọn khi cần nhìn tổng thể, vừa chi tiết khi cần soi mock.",
        "When a test uses many page.route() mocks, the timeline can be flooded with route actions that clutter the view. Trace Viewer lets you toggle routing actions on/off so you can focus on real user behaviour. Conversely, when you suspect a mock intercepts the wrong request, you turn them on to see which route matched and what status it fulfilled. This filtering keeps a trace concise for the big picture yet detailed when inspecting mocks.",
        "テストが多くのpage.route()モックを使うと、タイムラインがルートアクションで溢れて見づらくなります。Trace Viewerはルーティングアクションの表示・非表示を切り替えられるので、実際のユーザー挙動に集中できます。逆に、モックが誤ったリクエストを傍受していると疑うときは、表示してどのルートが一致し、どのステータスをfulfillしたかを確認します。このフィルタリングは、全体像を見るときはtraceを簡潔に、モックを調べるときは詳細に保ちます。",
      ),
      CODE(
        "ts",
        `test('nhiều mock nhưng vẫn dễ đọc trace', async ({ page }) => {
  await page.route('**/api/user',    r => r.fulfill({ json: { id: 'u1', plan: 'pro' } }));
  await page.route('**/api/flags',   r => r.fulfill({ json: { newCart: true } }));
  await page.route('**/api/pricing', r => r.fulfill({ json: { plans: [] } }));
  // Trong Trace Viewer: ẩn các action 'route' để chỉ thấy click/goto của user,
  // hoặc hiện lên khi cần kiểm mock nào khớp request nào.
  await page.goto('/app');
  await page.getByRole('button', { name: 'Mở giỏ' }).click();
});`,
      ),
      NOTE(
        "Nút lọc routing nằm trong thanh công cụ của timeline; trạng thái ẩn/hiện chỉ ảnh hưởng cách xem, không thay đổi dữ liệu trace đã ghi.",
        "The routing filter sits in the timeline toolbar; the hide/show state only affects the view, not the recorded trace data.",
        "ルーティングのフィルタはタイムラインのツールバーにあります。表示・非表示の状態は表示方法にのみ影響し、記録済みのtraceデータは変わりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Bảng Network: method, status và thời gian",
      en: "6. The Network panel: method, status and timing",
      ja: "6. ネットワークパネル：メソッド・ステータス・時間",
    },
    blocks: [
      P(
        "Tab Network trong Trace Viewer liệt kê mọi request kèm HTTP method, status code, kích thước và thời gian, gắn đúng vào timeline. Đây là nơi bạn phát hiện API trả 500 âm thầm, một request bị chặn bởi CORS, hay một call chậm 3 giây kéo test timeout. Vì mỗi request neo vào action đã kích hoạt nó, bạn lần ngược được từ triệu chứng UI về nguyên nhân mạng. Với test nghiệp vụ, đây là bằng chứng để khẳng định request thanh toán đã gửi đúng payload và nhận đúng status.",
        "The Network tab in Trace Viewer lists every request with HTTP method, status code, size and timing, anchored on the timeline. This is where you spot an API silently returning 500, a request blocked by CORS, or a 3-second slow call that timed out the test. Because each request is anchored to the action that triggered it, you can trace back from a UI symptom to the network cause. For business tests, this is the evidence to assert the payment request sent the right payload and got the right status.",
        "Trace ViewerのNetworkタブは、すべてのリクエストをHTTPメソッド・ステータスコード・サイズ・時間とともに一覧し、タイムラインに固定します。ここでAPIが静かに500を返す、CORSでブロックされたリクエスト、テストをタイムアウトさせた3秒の遅いコールを発見します。各リクエストはそれを起動したアクションに固定されるため、UIの症状からネットワークの原因まで遡れます。業務テストでは、決済リクエストが正しいペイロードを送り正しいステータスを受けた証拠になります。",
      ),
      CODE(
        "ts",
        `// khẳng định status ở tầng test, đối chiếu với panel Network của trace
test('checkout gọi API đúng và nhận 200', async ({ page }) => {
  const [resp] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/pay') && r.request().method() === 'POST'),
    page.getByRole('button', { name: 'Pay' }).click(),
  ]);
  expect(resp.status()).toBe(200);
  expect((await resp.json()).captured).toBe(true);   // oracle: tiền đã bị bắt giữ
});`,
      ),
      QA(
        "Test UI xanh nhưng nghi ngờ backend lỗi — dùng Trace Viewer thế nào?",
        "The UI test is green but you suspect a backend error — how do you use Trace Viewer?",
        "Mở tab Network của trace và lọc theo status: nếu thấy một call trả 4xx/5xx mà UI vẫn hiển thị thành công, đó là lỗi ẩn (UI nuốt lỗi). Đối chiếu method + payload + status với hợp đồng API để xác nhận. Trace phơi bày sự thật mạng mà mắt thường trên UI không thấy.",
        "Open the trace's Network tab and filter by status: if a call returns 4xx/5xx while the UI still shows success, that is a hidden bug (the UI swallows the error). Cross-check method + payload + status against the API contract to confirm. The trace exposes the network truth the naked eye on the UI misses.",
        "traceのNetworkタブを開きステータスで絞り込みます。UIが成功表示のままなのにコールが4xx/5xxを返すなら、それは隠れたバグ（UIがエラーを飲み込む）です。メソッド・ペイロード・ステータスをAPI契約と照合して確認します。traceはUI上の肉眼が見逃すネットワークの真実を暴きます。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Cmd/Ctrl+F: tìm kiếm trong code editor của trace",
      en: "7. Cmd/Ctrl+F: search inside the trace code editors",
      ja: "7. Cmd/Ctrl+F：traceのコードエディタ内検索",
    },
    blocks: [
      P(
        "Các trình xem mã trong Trace Viewer — tab Source, snapshot HTML, và call log — nay hỗ trợ tìm kiếm bằng Cmd/Ctrl+F giống một editor thật. Với một trace dài hàng trăm action, việc gõ tên một selector, một endpoint, hay một chuỗi lỗi rồi nhảy tới đúng dòng tiết kiệm rất nhiều thời gian. Bạn không còn cuộn tay mỏi mắt; thay vào đó truy vấn trực tiếp vào bằng chứng. Đây là nâng cấp nhỏ nhưng thay đổi hẳn tốc độ điều tra sự cố.",
        "The code viewers in Trace Viewer — the Source tab, HTML snapshot, and call log — now support Cmd/Ctrl+F search like a real editor. In a trace with hundreds of actions, typing a selector name, an endpoint, or an error string then jumping to the right line saves a lot of time. No more eye-straining manual scrolling; instead you query the evidence directly. It is a small upgrade that markedly changes investigation speed.",
        "Trace Viewerのコードビューア（Sourceタブ・HTMLスナップショット・コールログ）は、本物のエディタのようにCmd/Ctrl+F検索に対応しました。数百のアクションを持つtraceで、セレクタ名・エンドポイント・エラー文字列を入力して正しい行へ飛べば大幅に時間を節約できます。目を凝らして手でスクロールする必要はなく、証拠を直接クエリできます。小さな改善ですが、調査速度を著しく変えます。",
      ),
      P(
        "Với các trace của luồng nghiệp vụ phức tạp, khả năng tìm kiếm còn giúp bạn kiểm chứng nhanh những bất biến quan trọng. Ví dụ, bạn gõ tìm mã đơn hàng để đối chiếu nó xuất hiện nhất quán qua các bước, hay tìm một endpoint để xác nhận nó chỉ được gọi đúng một lần (tính idempotency). Thay vì đọc tuần tự cả trăm action, bạn nhảy thẳng tới các điểm mấu chốt và tập trung năng lượng vào phân tích thay vì cuộn tìm. Đây là kiểu nâng cấp tưởng nhỏ nhưng cộng dồn lại tiết kiệm hàng giờ mỗi tuần cho một đội QA đông việc.",
        "For traces of complex business flows, search also lets you quickly verify important invariants. For example, you search for an order id to check it appears consistently across steps, or an endpoint to confirm it was called exactly once (idempotency). Instead of reading a hundred actions sequentially, you jump straight to key points and focus energy on analysis rather than scrolling. It is the kind of seemingly small upgrade that, compounded, saves hours each week for a busy QA team.",
        "複雑な業務フローのtraceでは、検索は重要な不変条件の素早い検証にも役立ちます。例えば注文idを検索してステップ全体で一貫して現れるか照合したり、エンドポイントを検索して正確に一度だけ呼ばれたか（冪等性）を確認したりします。数百のアクションを順に読む代わりに、要点へ直接飛び、スクロールではなく分析に力を注げます。一見小さな改善ですが、積み重なると多忙なQAチームの毎週数時間を節約します。",
      ),
      TIP(
        "Trong snapshot DOM của trace, dùng Cmd/Ctrl+F để tìm chính xác text hay attribute (ví dụ data-testid) mà locator của bạn nhắm tới — cách nhanh nhất để hiểu vì sao locator không khớp.",
        "In the trace's DOM snapshot, use Cmd/Ctrl+F to find the exact text or attribute (e.g. data-testid) your locator targets — the fastest way to understand why a locator didn't match.",
        "traceのDOMスナップショットで、ロケーターが狙うテキストや属性（例：data-testid）をCmd/Ctrl+Fで正確に検索しましょう。ロケーターが一致しなかった理由を理解する最速の方法です。",
      ),
      CODE(
        "ts",
        `// khi locator không khớp, mở snapshot trong trace và Ctrl+F 'Đặt hàng'
// để thấy DOM thật đang render nhãn gì -> sửa locator cho đúng
await page.getByRole('button', { name: 'Đặt hàng' }).click();
// nếu DOM thật là 'Đặt mua', trace phơi bày ngay khác biệt`,
      ),
    ],
  },
  {
    heading: {
      vi: "8. JSON tự động định dạng đẹp",
      en: "8. Auto-formatted JSON",
      ja: "8. 自動整形されるJSON",
    },
    blocks: [
      P(
        "Trace Viewer tự nhận diện và định dạng lại các payload JSON — trong network response, request body và attachment — thành dạng thụt lề dễ đọc, kèm cây có thể gập/mở. Trước đây một chuỗi JSON dài một dòng gần như không thể đọc; nay bạn xem được cấu trúc, tìm đúng khoá và so sánh nhanh giữa các request. Với test API và nghiệp vụ nhiều dữ liệu, tính năng này giúp xác minh hợp đồng dữ liệu ngay trong trace mà không cần copy ra công cụ ngoài.",
        "Trace Viewer auto-detects and reformats JSON payloads — in network responses, request bodies and attachments — into readable indented form with a collapsible/expandable tree. Before, a long single-line JSON string was nearly unreadable; now you see the structure, find the right key and compare quickly across requests. For data-heavy API and business tests, this verifies the data contract right inside the trace without copying to an external tool.",
        "Trace ViewerはJSONペイロード（ネットワークレスポンス・リクエストボディ・添付）を自動検出し、折りたたみ可能なツリー付きの読みやすいインデント形式に整形します。以前は長い1行のJSON文字列はほぼ読めませんでしたが、今は構造を見て正しいキーを見つけ、リクエスト間で素早く比較できます。データの多いAPI・業務テストでは、外部ツールにコピーせずtrace内でデータ契約を検証できます。",
      ),
      CODE(
        "ts",
        `// response JSON dài sẽ được Trace Viewer format cây, dễ soi khoá 'balance'
test('sao kê trả về double-entry cân bằng', async ({ request }) => {
  const res = await request.get('/api/ledger/acc-01');
  const body = await res.json();
  const debit = body.entries.filter(e => e.type === 'debit').reduce((s, e) => s + e.amount, 0);
  const credit = body.entries.filter(e => e.type === 'credit').reduce((s, e) => s + e.amount, 0);
  expect(debit).toBe(credit);   // oracle: tiền không tự sinh, không tự mất
});`,
      ),
      NOTE(
        "JSON được format chỉ để hiển thị; dữ liệu gốc trong trace vẫn nguyên vẹn, nên bạn có thể copy đúng nguyên bản khi cần tái hiện.",
        "The JSON is formatted for display only; the original data in the trace stays intact, so you can copy the exact original when reproducing.",
        "JSONは表示用に整形されるだけで、trace内の元データはそのまま保たれます。再現時には元のまま正確にコピーできます。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. UI Mode và watch mode",
      en: "9. UI Mode and watch mode",
      ja: "9. UIモードとウォッチモード",
    },
    blocks: [
      P(
        "UI Mode (mở bằng --ui) là môi trường phát triển test tương tác: bên trái là cây test, bên phải là timeline, snapshot và locator picker. Bật watch mode thì mỗi lần bạn lưu file test hoặc source, Playwright chạy lại đúng những test liên quan gần như tức thì. Vòng lặp 'sửa — lưu — thấy kết quả' rút xuống vài giây, nên viết test cảm giác như lập trình có phản hồi trực tiếp. Đây là cách nhanh nhất để tinh chỉnh locator và assertion mà không rời khỏi trình duyệt.",
        "UI Mode (opened with --ui) is an interactive test development environment: the test tree on the left, timeline, snapshots and a locator picker on the right. Enable watch mode and every time you save a test or source file, Playwright reruns just the relevant tests almost instantly. The 'edit — save — see result' loop shrinks to a few seconds, so writing tests feels like programming with direct feedback. It is the fastest way to tune locators and assertions without leaving the browser.",
        "UIモード（--uiで起動）は対話的なテスト開発環境です。左にテストツリー、右にタイムライン・スナップショット・ロケーターピッカーがあります。ウォッチモードを有効にすると、テストやソースファイルを保存するたびに、関連テストだけをほぼ即座に再実行します。「編集→保存→結果を見る」ループが数秒に縮み、テスト作成が直接フィードバックのあるプログラミングのように感じられます。ブラウザを離れずロケーターとアサーションを調整する最速の方法です。",
      ),
      IMG(
        svgUiMode,
        "UI Mode: cây test, live preview, locator picker và watch loop.",
        "UI Mode: test tree, live preview, locator picker and watch loop.",
        "UIモード：テストツリー、ライブプレビュー、ロケーターピッカー、ウォッチループ。",
      ),
      CODE(
        "bash",
        `# mở UI Mode với watch: sửa test là chạy lại ngay
npx playwright test --ui

# chỉ theo dõi một file khi tập trung sửa
npx playwright test cart.spec.ts --ui`,
      ),
      P(
        "Watch mode thay đổi trải nghiệm viết test nhiều hơn người ta tưởng. Khi phản hồi gần như tức thì, bạn dám thử nghiệm nhiều locator, tinh chỉnh assertion và refactor mạnh tay hơn vì mỗi thay đổi được xác nhận ngay. Điều này khuyến khích viết test tốt hơn thay vì viết cho xong rồi bỏ mặc. Với người mới, UI Mode còn là công cụ học tập tuyệt vời: bạn thấy trực quan cách auto-wait hoạt động, vì sao một assertion poll cho đến khi điều kiện đúng, và locator nào ổn định qua các lần render. Trực giác về hành vi bất đồng bộ của web được hình thành nhanh hơn nhiều so với đọc tài liệu suông.",
        "Watch mode changes the test-writing experience more than people expect. With nearly instant feedback, you dare to try more locators, tune assertions and refactor more boldly because each change is confirmed at once. This encourages writing better tests rather than writing them once and abandoning them. For newcomers, UI Mode is also a great learning tool: you visually see how auto-wait works, why an assertion polls until the condition holds, and which locator stays stable across renders. Intuition for the web's asynchronous behaviour forms far faster than by reading docs alone.",
        "ウォッチモードは人が思う以上にテスト作成体験を変えます。ほぼ即座のフィードバックがあると、各変更がすぐ確認されるため、より多くのロケーターを試し、アサーションを調整し、大胆にリファクタする勇気が出ます。これは一度書いて放置するのではなく、より良いテストを書くことを促します。初心者にとってUIモードは優れた学習ツールでもあります。自動待機の仕組み、アサーションが条件成立までポーリングする理由、描画をまたいで安定するロケーターを視覚的に見られます。ウェブの非同期挙動への直感が、ドキュメントを読むだけよりはるかに速く形成されます。",
      ),
      TIP(
        "Dùng nút 'Pick locator' trong UI Mode để rê chuột lên phần tử và nhận đề xuất locator theo role — luôn ưu tiên getByRole để test bền, ít phụ thuộc cấu trúc HTML.",
        "Use the 'Pick locator' button in UI Mode to hover an element and get a role-based locator suggestion — always prefer getByRole for robust tests less coupled to HTML structure.",
        "UIモードの「Pick locator」ボタンで要素にホバーし、ロールベースのロケーター候補を得ましょう。HTML構造への依存が少ない堅牢なテストのため、常にgetByRoleを優先します。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Gỡ lỗi test flaky bằng bằng chứng, không phải cảm tính",
      en: "10. Debugging flaky tests with evidence, not intuition",
      ja: "10. 直感ではなく証拠でフレーキーテストをデバッグ",
    },
    blocks: [
      P(
        "Flaky là kẻ thù số một của độ tin cậy suite test. Cách xử lý sai là thêm sleep hay tăng timeout cho 'đỡ đỏ' — che triệu chứng chứ không chữa gốc. Cách đúng là dùng trace của lần hỏng làm bằng chứng: xác định action nào chạy trước khi điều kiện sẵn sàng, request nào chưa resolve, DOM nào chưa cập nhật. Gần như mọi flaky đều quy về race condition có thể sửa bằng assertion tự chờ đúng chỗ, thay vì chờ mù bằng thời gian cứng.",
        "Flakiness is the number-one enemy of test-suite reliability. The wrong fix is adding sleeps or bumping timeouts to 'stop the red' — masking the symptom, not curing the root. The right way is to use the failing run's trace as evidence: identify which action ran before its condition was ready, which request hadn't resolved, which DOM hadn't updated. Nearly every flake reduces to a race condition fixable by an auto-waiting assertion in the right place, rather than a blind hard-coded wait.",
        "フレーキーはテストスイートの信頼性の最大の敵です。誤った修正はsleepの追加やタイムアウトの引き上げで「赤を止める」ことで、症状を隠すだけで根本を治しません。正しい方法は、失敗した実行のtraceを証拠として使うことです。どのアクションが条件の準備前に走ったか、どのリクエストが未解決だったか、どのDOMが未更新だったかを特定します。ほぼすべてのフレーキーは、固定待機で盲目的に待つのではなく、適切な場所の自動待機アサーションで直せる競合状態に帰着します。",
      ),
      CODE(
        "ts",
        `// ❌ chống flaky sai: chờ mù bằng thời gian cứng
await page.waitForTimeout(1500);
expect(await page.locator('#total').innerText()).toBe('100');

// ✅ đúng: assertion tự chờ đến khi điều kiện đúng, đọc trace để hiểu vì sao
await expect(page.getByTestId('total')).toHaveText('100');   // auto-wait, không sleep`,
      ),
      WARN(
        "waitForTimeout là mùi hôi (smell) của flaky: nó làm suite chậm và vẫn có thể đỏ khi mạng chậm hơn con số bạn đoán. Hãy để trace chỉ ra điều kiện thật cần chờ.",
        "waitForTimeout is a flakiness smell: it slows the suite and can still go red when the network is slower than your guessed number. Let the trace reveal the real condition to wait for.",
        "waitForTimeoutはフレーキーの臭いです。スイートを遅くし、ネットワークが推測値より遅ければ赤になり得ます。待つべき本当の条件はtraceに示させましょう。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Trace trong CI: tải về và điều tra từ xa",
      en: "11. Traces in CI: download and investigate remotely",
      ja: "11. CIのtrace：ダウンロードして遠隔調査",
    },
    blocks: [
      P(
        "Sức mạnh lớn nhất của trace lộ ra khi test đỏ trên CI mà bạn không tái hiện được ở máy. Cấu hình upload trace như artefact, rồi tải về và mở bằng show-trace hay trace.playwright.dev — bạn có nguyên hiện trường lỗi từ runner Linux ngay trên máy mình. Không còn cảnh 'trên máy tôi thì chạy được'; trace là sự thật khách quan của môi trường CI. Đây là quy trình chuẩn để đội xử lý sự cố CI một cách chuyên nghiệp.",
        "The trace's greatest power shows when a test goes red on CI but you cannot reproduce it locally. Configure uploading the trace as an artefact, then download and open it with show-trace or trace.playwright.dev — you get the full crime scene from the Linux runner on your own machine. No more 'works on my machine'; the trace is the objective truth of the CI environment. This is the standard workflow for a team to handle CI incidents professionally.",
        "traceの最大の力は、CIでテストが赤になるがローカルで再現できないときに現れます。traceを成果物としてアップロードするよう設定し、ダウンロードしてshow-traceやtrace.playwright.devで開けば、Linuxランナーの完全な現場を自分のマシンで得られます。「私の環境では動く」はもうありません。traceはCI環境の客観的な真実です。これはチームがCIインシデントを専門的に扱う標準的なワークフローです。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/e2e.yml — upload trace khi fail
      - name: Run tests
        run: npx playwright test
      - name: Upload traces
        if: \${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: playwright-traces
          path: test-results/**/trace.zip
          retention-days: 7`,
      ),
      SCEN(
        "Kịch bản: đỏ trên CI, xanh ở local",
        "Scenario: red on CI, green locally",
        "Một test thanh toán chỉ đỏ trên CI. Bạn tải trace từ artefact, mở ra và thấy tab Network báo /api/pay trả 429 (rate limit) do runner CI dùng chung IP. Nguyên nhân không nằm ở code test mà ở hạ tầng. Bạn thêm mock cho endpoint hoặc nới rate limit môi trường test. Trace đã biến một bí ẩn 'CI-only' thành một sự thật rõ ràng trong vài phút.",
        "A payment test only fails on CI. You download the trace from the artefact, open it and see the Network tab reporting /api/pay returned 429 (rate limit) because the CI runner shares an IP. The cause is not test code but infrastructure. You add a mock for the endpoint or relax the rate limit in the test environment. The trace turned a 'CI-only' mystery into a clear fact in minutes.",
        "シナリオ：CIで赤、ローカルで緑",
        "ある決済テストがCIでだけ失敗します。成果物からtraceをダウンロードして開くと、CIランナーがIPを共有するため/api/payが429（レート制限）を返したとNetworkタブが報告しています。原因はテストコードではなくインフラです。エンドポイントのモックを追加するか、テスト環境のレート制限を緩めます。traceは「CIだけ」の謎を数分で明確な事実に変えました。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Quy trình gỡ lỗi chuyên nghiệp end-to-end",
      en: "12. A professional end-to-end debugging workflow",
      ja: "12. プロのエンドツーエンドなデバッグワークフロー",
    },
    blocks: [
      P(
        "Ghép mọi mảnh lại thành một quy trình lặp được. Khi một test đỏ, đừng đoán: mở trace, đi theo timeline tới action fail, xem snapshot DOM tại đúng khoảnh khắc đó, đối chiếu tab Network và Console, đọc attachment JSON nếu có, rồi hình thành giả thuyết. Kiểm chứng giả thuyết trong UI Mode với watch mode để sửa và thấy kết quả ngay. Cuối cùng, biến bản sửa thành assertion tự chờ hoặc mock ổn định để lỗi không tái diễn. Đó là vòng lặp gỡ lỗi dựa trên bằng chứng.",
        "Assemble every piece into a repeatable workflow. When a test goes red, don't guess: open the trace, follow the timeline to the failing action, view the DOM snapshot at that exact moment, cross-check the Network and Console tabs, read the JSON attachment if any, then form a hypothesis. Verify the hypothesis in UI Mode with watch mode to fix and see the result immediately. Finally, turn the fix into an auto-waiting assertion or a stable mock so the bug cannot recur. That is the evidence-based debugging loop.",
        "すべての部品を再現可能なワークフローにまとめます。テストが赤になったら推測せず、traceを開き、失敗したアクションまでタイムラインを追い、その正確な瞬間のDOMスナップショットを見て、NetworkとConsoleタブを照合し、あればJSON添付を読み、仮説を立てます。ウォッチモード付きのUIモードで仮説を検証し、修正して結果を即座に見ます。最後に、修正を自動待機アサーションや安定したモックに変え、バグが再発しないようにします。これが証拠に基づくデバッグループです。",
      ),
      UL(
        [
          "Mở trace của lần hỏng, đi tới action fail trên timeline.",
          "Xem snapshot DOM + Network + Console tại thời điểm lỗi.",
          "So trace đậu vs hỏng để tìm khác biệt gây flaky.",
          "Kiểm chứng giả thuyết trong UI Mode với watch mode.",
          "Chốt bằng assertion tự chờ / mock ổn định, không dùng sleep.",
        ],
        [
          "Open the failing trace, go to the failing action on the timeline.",
          "Inspect the DOM snapshot + Network + Console at the failure moment.",
          "Compare passing vs failing traces to find the flaky difference.",
          "Verify the hypothesis in UI Mode with watch mode.",
          "Lock it in with an auto-waiting assertion / stable mock, no sleep.",
        ],
        [
          "失敗traceを開き、タイムラインの失敗アクションへ移動する。",
          "失敗の瞬間のDOMスナップショット＋Network＋Consoleを調べる。",
          "成功と失敗のtraceを比較し、フレーキーの差を見つける。",
          "ウォッチモード付きUIモードで仮説を検証する。",
          "自動待機アサーション／安定したモックで固定し、sleepを使わない。",
        ],
      ),
      QA(
        "Bạn nhận một test đỏ liên tục trên CI mà không có mô tả — bước đầu tiên là gì?",
        "You inherit a test that's constantly red on CI with no description — what's your first step?",
        "Tải trace từ artefact và mở lên, đi tới action fail trên timeline. Trace cho tôi hiện trường đầy đủ: DOM lúc lỗi, Network status, Console. Từ đó tôi có giả thuyết trước khi đọc một dòng code test, tránh đoán mò. Bằng chứng trước, phỏng đoán sau.",
        "Download the trace from the artefact and open it, go to the failing action on the timeline. The trace gives me the full scene: DOM at failure, Network status, Console. From there I form a hypothesis before reading a line of test code, avoiding guesswork. Evidence first, conjecture second.",
        "成果物からtraceをダウンロードして開き、タイムラインの失敗アクションへ移動します。traceは完全な現場を与えます。失敗時のDOM、Networkステータス、Console。そこからテストコードを1行読む前に仮説を立て、当て推量を避けます。証拠が先、推測は後です。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn và tổng kết",
      en: "13. Interview angle and summary",
      ja: "13. 面接の観点とまとめ",
    },
    blocks: [
      P(
        "Ở phỏng vấn, khả năng gỡ lỗi test là thứ phân biệt người viết test và người làm chủ chất lượng. Khi được hỏi 'bạn xử lý flaky thế nào', câu trả lời hạng A không phải 'tăng timeout' mà là 'dùng trace làm bằng chứng, so lần đậu với lần hỏng, tìm race condition, sửa bằng assertion tự chờ'. Nói được về retain-on-failure-and-retries, tab Network, attachment JSON và UI Mode cho thấy bạn làm việc có kỷ luật và dựa trên dữ liệu, không cảm tính.",
        "In interviews, the ability to debug tests separates someone who writes tests from someone who owns quality. Asked 'how do you handle flakiness', the A-grade answer is not 'raise the timeout' but 'use the trace as evidence, compare passing versus failing, find the race condition, fix with auto-waiting assertions'. Speaking to retain-on-failure-and-retries, the Network tab, JSON attachments and UI Mode shows you work with discipline and data, not intuition.",
        "面接では、テストをデバッグする能力が、テストを書く人と品質を所有する人を分けます。「フレーキーをどう扱うか」と聞かれたとき、A評価の答えは「タイムアウトを上げる」ではなく「traceを証拠に使い、成功と失敗を比較し、競合状態を見つけ、自動待機アサーションで直す」です。retain-on-failure-and-retries・Networkタブ・JSON添付・UIモードを語れれば、直感ではなく規律とデータで働くことを示せます。",
      ),
      P(
        "Tổng kết: Trace Viewer và UI Mode 2026 biến gỡ lỗi test thành một quy trình khoa học. retain-on-failure-and-retries cho bạn giữ đúng bằng chứng khi cần, so trace đậu/hỏng vạch ra race condition, attachment và JSON tự format kể câu chuyện dữ liệu, tab Network phơi bày sự thật mạng, còn UI Mode với watch mode rút ngắn vòng lặp phát triển. Làm chủ bộ công cụ này, bạn gỡ lỗi như chuyên gia: nhanh, chắc và dựa trên bằng chứng.",
        "In summary: Trace Viewer and UI Mode 2026 turn test debugging into a scientific process. retain-on-failure-and-retries keeps the right evidence when needed, comparing passing/failing traces reveals the race condition, attachments and auto-formatted JSON tell the data story, the Network tab exposes network truth, and UI Mode with watch mode shortens the development loop. Master this toolkit and you debug like an expert: fast, sure and evidence-based.",
        "まとめると、Trace ViewerとUIモード2026はテストデバッグを科学的なプロセスに変えます。retain-on-failure-and-retriesは必要なときに正しい証拠を保持し、成功/失敗traceの比較が競合状態を明らかにし、添付と自動整形JSONがデータの物語を語り、Networkタブがネットワークの真実を暴き、ウォッチモード付きUIモードが開発ループを短縮します。このツールキットを習得すれば、専門家のようにデバッグできます。速く、確実に、証拠に基づいて。",
      ),
      QA(
        "Một câu chốt: vì sao trace quan trọng hơn screenshot đơn thuần?",
        "One line: why is a trace more valuable than a plain screenshot?",
        "Screenshot chỉ cho một khoảnh khắc tĩnh, còn trace cho cả dòng thời gian: mỗi action, snapshot DOM trước/sau, network, console và attachment, cho phép tua ngược để tìm nguyên nhân thay vì chỉ thấy triệu chứng cuối.",
        "A screenshot gives one static moment, while a trace gives the whole timeline: each action, before/after DOM snapshots, network, console and attachments, letting you rewind to find the cause rather than seeing only the final symptom.",
        "スクリーンショットは静的な一瞬だけですが、traceはタイムライン全体を与えます。各アクション、前後のDOMスナップショット、ネットワーク、コンソール、添付。最後の症状だけを見るのではなく、巻き戻して原因を見つけられます。",
      ),
      QA(
        "Khi nào bạn tắt trace hoàn toàn?",
        "When would you turn traces off entirely?",
        "Gần như không bao giờ trên CI, vì mất bằng chứng khi cần nhất. Chỉ cân nhắc 'off' cho các suite smoke siêu nhẹ chạy rất thường xuyên nơi tốc độ là tối thượng và đã có lớp khác giữ trace. Mặc định an toàn vẫn là retain-on-failure-and-retries.",
        "Almost never on CI, since you'd lose evidence exactly when it's needed most. Only consider 'off' for ultra-light smoke suites that run very frequently where speed is paramount and another layer already keeps traces. The safe default remains retain-on-failure-and-retries.",
        "CIではほぼ決してありません。最も必要なときに証拠を失うからです。'off'を検討するのは、速度が最優先で別の層が既にtraceを保持している、非常に頻繁に走る超軽量スモークスイートだけです。安全なデフォルトはretain-on-failure-and-retriesのままです。",
      ),
    ],
  },
];

// ---------------------------------------------------------------------------
// Article objects
// ---------------------------------------------------------------------------
const artA = {
  categorySlug: "playwright-tools",
  slug: "pw-component-testing",
  cover: makeThumb({ id: "pwl02a", domain: "saas", kind: "congnghe", label: "COMPONENT · CT" }),
  tags: tags("congnghe", "saas", "playwright", "visual", "foundation", "realworld"),
  title: {
    vi: "Component Testing với Playwright (React · Vue · Svelte · Solid)",
    en: "Component Testing with Playwright (React · Vue · Svelte · Solid)",
    ja: "Playwrightによるコンポーネントテスト（React・Vue・Svelte・Solid）",
  },
  summary: {
    vi: "Mount component vào trình duyệt thật, mock network qua router fixture, cô lập và kiểm thử biến thể UI nhanh — khi nào dùng CT thay E2E, cách chạy CI và né cạm bẫy.",
    en: "Mount components into a real browser, mock the network via the router fixture, isolate and test UI variants fast — when to use CT over E2E, CI setup and how to dodge pitfalls.",
    ja: "コンポーネントを実ブラウザにマウントし、routerフィクスチャでネットワークをモックし、UIの変種を速く隔離テストします。CTとE2Eの使い分け、CI設定、落とし穴の回避まで。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "playwright-tools",
  slug: "pw-trace-viewer-ui-mode",
  cover: makeThumb({ id: "pwl02b", domain: "saas", kind: "congnghe", label: "TRACE · UI MODE" }),
  tags: tags("congnghe", "saas", "playwright", "trace", "tip", "experience"),
  title: {
    vi: "Trace Viewer & UI Mode 2026: gỡ lỗi test như chuyên gia",
    en: "Trace Viewer & UI Mode 2026: debug tests like a pro",
    ja: "Trace ViewerとUIモード2026：プロのようにテストをデバッグ",
  },
  summary: {
    vi: "retain-on-failure-and-retries, so trace đậu/hỏng, attachment JSON tự format, tab Network method+status, Cmd/Ctrl+F trong editor, watch mode — quy trình gỡ lỗi dựa trên bằng chứng.",
    en: "retain-on-failure-and-retries, comparing passing/failing traces, auto-formatted JSON attachments, the Network method+status tab, Cmd/Ctrl+F in editors, watch mode — an evidence-based debugging workflow.",
    ja: "retain-on-failure-and-retries、成功/失敗traceの比較、自動整形されるJSON添付、Networkのメソッド＋ステータスタブ、エディタ内のCmd/Ctrl+F、ウォッチモード。証拠に基づくデバッグワークフロー。",
  },
  pages: buildDoc(pagesB),
};

export const PWLATEST_02 = [artA, artB];
