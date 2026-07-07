// ============================================================================
// PLAYWRIGHT PRO — 10 bài FOCUSED theo chuẩn biên soạn mới.
// Mỗi bài = MỘT chủ đề hay-được-hỏi-nhất ở công ty/tập đoàn lớn: quy trình bài
// bản, làm-trong-công-cụ-nào, code minh hoạ, tình huống thật (ngân hàng · fintech
// · bảo hiểm · TMĐT), và câu hỏi phỏng vấn. Song ngữ VI/EN (JA fallback EN).
// Mỗi bài có THUMBNAIL SVG riêng. Block types khớp ArticleViewer:
//   p, h, ul, code, note, tip, warn, img, scenario, qa.
// ============================================================================

const pick = (o, l) => (o ? o[l] || o.en || o.vi : "");
const P = (vi, en, ja) => ({ t: "p", vi, en, ja: ja ?? en });
const H = (vi, en, ja) => ({ t: "h", vi, en, ja: ja ?? en });
const UL = (vi, en, ja) => ({ t: "ul", vi, en, ja: ja ?? en });
const CODE = (lang, code) => ({ t: "code", lang, code });
const NOTE = (vi, en, ja) => ({ t: "note", vi, en, ja: ja ?? en });
const TIP = (vi, en, ja) => ({ t: "tip", vi, en, ja: ja ?? en });
const WARN = (vi, en, ja) => ({ t: "warn", vi, en, ja: ja ?? en });
const IMG = (svg, capVi, capEn, capJa) => ({ t: "img", svg, cap: { vi: capVi, en: capEn, ja: capJa ?? capEn } });
const SCEN = (tVi, tEn, bVi, bEn, tJa, bJa) => ({ t: "scenario", title: { vi: tVi, en: tEn, ja: tJa ?? tEn }, body: { vi: bVi, en: bEn, ja: bJa ?? bEn } });
const QA = (qVi, qEn, aVi, aEn, qJa, aJa) => ({ t: "qa", q: { vi: qVi, en: qEn, ja: qJa ?? qEn }, a: { vi: aVi, en: aEn, ja: aJa ?? aEn } });

function localize(b, l) {
  switch (b.t) {
    case "ul": return { t: "ul", items: b[l] || b.en || b.vi };
    case "code": return { t: "code", lang: b.lang, text: b.code };
    case "img": return { t: "img", svg: b.svg, cap: pick(b.cap, l) };
    case "scenario": return { t: "scenario", title: pick(b.title, l), text: pick(b.body, l) };
    case "qa": return { t: "qa", q: pick(b.q, l), a: pick(b.a, l) };
    default: return { t: b.t, text: pick(b, l) };
  }
}
const L = (blocks, l) => blocks.map((b) => localize(b, l));
function buildDoc(pages) {
  return pages.map((p) => ({
    heading: { vi: p.heading.vi, en: p.heading.en, ja: p.heading.ja ?? p.heading.en },
    blocks: { vi: L(p.blocks, "vi"), en: L(p.blocks, "en"), ja: L(p.blocks, "ja") },
  }));
}

// ============================================================================
// THUMBNAILS — mỗi bài một hình 16/10 (viewBox 160x100) đặc trưng.
// ============================================================================
function thumb(id, c0, c1, label, inner) {
  return `<svg viewBox="0 0 160 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>
<rect width="160" height="100" fill="url(#${id})"/>
<circle cx="24" cy="20" r="30" fill="#ffffff" opacity="0.08"/><circle cx="140" cy="88" r="34" fill="#ffffff" opacity="0.08"/>
${inner}
<text x="14" y="93" font-size="9.5" font-weight="800" fill="#f8fafc" opacity="0.95">${label}</text>
</svg>`;
}
const th01 = thumb("t1", "#0f172a", "#1e3a8a", "SETUP · CONFIG", `
<rect x="34" y="20" width="44" height="54" rx="5" fill="#0b1220" stroke="#3b82f6"/><rect x="40" y="26" width="32" height="4" rx="2" fill="#60a5fa"/><rect x="40" y="34" width="24" height="4" rx="2" fill="#334966"/><rect x="40" y="42" width="28" height="4" rx="2" fill="#334966"/><rect x="40" y="50" width="20" height="4" rx="2" fill="#334966"/>
<g stroke="#38bdf8" stroke-width="2" fill="none"><path d="M92 30 h30 M92 42 h22 M92 54 h30"/></g>
<circle cx="126" cy="66" r="12" fill="none" stroke="#93c5fd" stroke-width="2.5"/><rect x="123.5" y="47" width="5" height="10" rx="2" fill="#93c5fd" transform="rotate(0 126 66)"/>`);
const th02 = thumb("t2", "#064e3b", "#059669", "LOCATORS · AUTO-WAIT", `
<circle cx="66" cy="46" r="24" fill="none" stroke="#a7f3d0" stroke-width="3"/><circle cx="66" cy="46" r="13" fill="none" stroke="#a7f3d0" stroke-width="3"/><circle cx="66" cy="46" r="4" fill="#34d399"/>
<line x1="66" y1="16" x2="66" y2="26" stroke="#a7f3d0" stroke-width="2.5"/><line x1="66" y1="66" x2="66" y2="76" stroke="#a7f3d0" stroke-width="2.5"/><line x1="36" y1="46" x2="46" y2="46" stroke="#a7f3d0" stroke-width="2.5"/><line x1="86" y1="46" x2="96" y2="46" stroke="#a7f3d0" stroke-width="2.5"/>
<circle cx="120" cy="40" r="14" fill="#022c22"/><path d="M113 40 l5 5 9 -11" stroke="#34d399" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
const th03 = thumb("t3", "#083344", "#0891b2", "ASSERTIONS · ASYNC", `
<circle cx="60" cy="46" r="26" fill="none" stroke="#67e8f9" stroke-width="3" stroke-dasharray="120 40"/><path d="M60 20 a26 26 0 0 1 20 10" fill="none" stroke="#22d3ee" stroke-width="4" stroke-linecap="round"/>
<path d="M50 46 l6 7 14 -16" stroke="#a5f3fc" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g fill="#a5f3fc"><rect x="98" y="34" width="34" height="5" rx="2.5"/><rect x="98" y="46" width="26" height="5" rx="2.5"/><rect x="98" y="58" width="30" height="5" rx="2.5"/></g>`);
const th04 = thumb("t4", "#312e81", "#6366f1", "POM · FIXTURES", `
<rect x="40" y="24" width="26" height="20" rx="3" fill="#a5b4fc"/><rect x="70" y="24" width="26" height="20" rx="3" fill="#818cf8"/><rect x="100" y="24" width="22" height="20" rx="3" fill="#c7d2fe"/>
<rect x="52" y="52" width="26" height="20" rx="3" fill="#818cf8"/><rect x="84" y="52" width="26" height="20" rx="3" fill="#a5b4fc"/>
<g stroke="#e0e7ff" stroke-width="1.5" fill="none"><path d="M53 44 v4 h12 v4 M83 44 v4 h14 v4"/></g>`);
const th05 = thumb("t5", "#78350f", "#d97706", "AUTH · STORAGESTATE", `
<circle cx="56" cy="40" r="12" fill="#fcd34d"/><rect x="52" y="50" width="8" height="16" rx="4" fill="#fcd34d"/><rect x="49" y="40" width="14" height="4" rx="2" fill="#78350f"/>
<path d="M108 26 l16 6 v12 c0 12 -8 20 -16 24 c-8 -4 -16 -12 -16 -24 v-12z" fill="#fde68a"/><path d="M100 44 l5 5 10 -11" stroke="#b45309" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="80" cy="70" r="6" fill="#fbbf24"/><circle cx="96" cy="70" r="6" fill="#f59e0b"/>`);
const th06 = thumb("t6", "#7f1d1d", "#ea580c", "NETWORK · MOCKING", `
<circle cx="40" cy="46" r="8" fill="#fdba74"/><circle cx="120" cy="30" r="8" fill="#fca5a5"/><circle cx="120" cy="64" r="8" fill="#fca5a5"/>
<g stroke="#fed7aa" stroke-width="2.5" fill="none"><path d="M48 44 h28"/><path d="M92 40 l20 -8"/><path d="M92 52 l20 10"/></g>
<rect x="76" y="34" width="16" height="24" rx="4" fill="#0b0b0b" opacity="0.65"/><path d="M80 40 l8 12 M88 40 l-8 12" stroke="#fdba74" stroke-width="2.5" stroke-linecap="round"/>
<text x="72" y="30" font-size="9" font-weight="800" fill="#fed7aa">MOCK</text>`);
const th07 = thumb("t7", "#134e4a", "#0d9488", "API + UI", `
<text x="36" y="58" font-size="34" font-weight="800" fill="#5eead4" font-family="monospace">{</text><text x="118" y="58" font-size="34" font-weight="800" fill="#5eead4" font-family="monospace">}</text>
<rect x="58" y="26" width="44" height="34" rx="4" fill="#0f2e2b" stroke="#2dd4bf"/><rect x="58" y="26" width="44" height="8" rx="4" fill="#134e4a"/><circle cx="63" cy="30" r="1.4" fill="#5eead4"/>
<rect x="63" y="40" width="26" height="4" rx="2" fill="#5eead4"/><rect x="63" y="48" width="20" height="4" rx="2" fill="#2dd4bf"/>
<rect x="60" y="68" width="40" height="10" rx="5" fill="#0f2e2b"/><text x="80" y="76" text-anchor="middle" font-size="7" font-weight="800" fill="#5eead4" font-family="monospace">200 OK</text>`);
const th08 = thumb("t8", "#4c1d95", "#7c3aed", "DATA-DRIVEN", `
<rect x="40" y="24" width="80" height="52" rx="5" fill="#2e1065"/><rect x="40" y="24" width="80" height="12" rx="5" fill="#7c3aed"/>
<g stroke="#c4b5fd" stroke-width="1" opacity="0.6"><path d="M40 48 h80 M40 60 h80 M67 36 v40 M93 36 v40"/></g>
<g fill="#ddd6fe"><rect x="46" y="40" width="14" height="4" rx="2"/><rect x="72" y="40" width="14" height="4" rx="2"/><rect x="98" y="40" width="14" height="4" rx="2"/></g>
<rect x="44" y="50" width="72" height="8" rx="2" fill="#8b5cf6" opacity="0.55"/>`);
const th09 = thumb("t9", "#0b1220", "#166534", "CI/CD · SHARDING", `
<g font-size="7.5" font-weight="700" text-anchor="middle">
<rect x="24" y="42" width="30" height="16" rx="4" fill="#1e293b"/><text x="39" y="53" fill="#93c5fd">PR</text>
<rect x="66" y="24" width="30" height="14" rx="4" fill="#1e293b"/><text x="81" y="34" fill="#86efac">shard1</text>
<rect x="66" y="43" width="30" height="14" rx="4" fill="#1e293b"/><text x="81" y="53" fill="#86efac">shard2</text>
<rect x="66" y="62" width="30" height="14" rx="4" fill="#1e293b"/><text x="81" y="72" fill="#86efac">shard3</text>
<rect x="110" y="42" width="34" height="16" rx="4" fill="#14532d"/><text x="127" y="53" fill="#bbf7d0">merge ✓</text></g>
<g stroke="#475569" stroke-width="1.5" fill="none"><path d="M54 50 h12 M96 31 c8 0 6 19 14 19 M96 50 h14 M96 69 c8 0 6 -19 14 -19"/></g>`);
const th10 = thumb("t10", "#831843", "#db2777", "FLAKY · TRACE DEBUG", `
<g stroke="#fbcfe8" stroke-width="2.5" fill="none"><path d="M32 60 h96"/></g>
<g fill="#f9a8d4"><rect x="38" y="52" width="10" height="8" rx="2"/><rect x="58" y="44" width="10" height="16" rx="2"/><rect x="78" y="36" width="10" height="24" rx="2"/><rect x="98" y="48" width="10" height="12" rx="2"/></g>
<circle cx="112" cy="30" r="12" fill="#500724"/><path d="M112 24 v7 M112 34 v0.5" stroke="#fbcfe8" stroke-width="2.5" stroke-linecap="round"/>
<rect x="34" y="24" width="20" height="20" rx="4" fill="#fce7f3"/><circle cx="40" cy="30" r="1.6" fill="#831843"/><circle cx="48" cy="30" r="1.6" fill="#831843"/><circle cx="44" cy="38" r="1.6" fill="#831843"/>`);

// ============================================================================
// HÌNH MINH HOẠ TRONG BÀI
// ============================================================================
const svgLocatorPriority = `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="250" rx="14" fill="#f8fafc"/>
<text x="30" y="34" font-size="15" font-weight="800" fill="#0f172a">Ưu tiên locator (bền → giòn) · Locator priority (robust → brittle)</text>
<rect x="30" y="50" width="660" height="32" rx="8" fill="#dcfce7"/><text x="44" y="71" font-size="13" fill="#166534" font-weight="700">getByRole('button', { name: 'Sign in' }) — theo cách người dùng thấy · most robust</text>
<rect x="30" y="90" width="660" height="32" rx="8" fill="#dcfce7"/><text x="44" y="111" font-size="13" fill="#166534" font-weight="700">getByLabel / getByPlaceholder / getByText — semantic</text>
<rect x="30" y="130" width="660" height="32" rx="8" fill="#fef9c3"/><text x="44" y="151" font-size="13" fill="#854d0e" font-weight="700">getByTestId('login-submit') — ổn định nếu dev thêm data-testid</text>
<rect x="30" y="170" width="660" height="32" rx="8" fill="#fee2e2"/><text x="44" y="191" font-size="13" fill="#991b1b" font-weight="700">.locator('div.sc-1x9k > span:nth-child(2)') — CSS sinh tự động · dễ vỡ</text>
<text x="30" y="228" font-size="12.5" fill="#475569">Quy tắc vàng: chọn theo vai trò/nhãn/text như người dùng, tránh cấu trúc CSS/HTML dễ đổi.</text>
</svg>`;

const svgHybrid = `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="250" rx="14" fill="#0f172a"/>
<text x="28" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Hybrid: seed nhanh bằng API — kiểm chứng đúng phần UI</text>
<g font-size="12" font-weight="700" text-anchor="middle">
<rect x="26" y="60" width="150" height="50" rx="9" fill="#134e4a"/><text x="101" y="82" fill="#5eead4">POST /api (seed)</text><text x="101" y="99" fill="#94a3b8" font-size="10">tạo giỏ / tài khoản</text>
<rect x="212" y="60" width="150" height="50" rx="9" fill="#1e293b"/><text x="287" y="82" fill="#93c5fd">Thao tác UI</text><text x="287" y="99" fill="#94a3b8" font-size="10">chỉ luồng cần test</text>
<rect x="398" y="60" width="150" height="50" rx="9" fill="#1e293b"/><text x="473" y="82" fill="#fca5a5">Assert UI</text><text x="473" y="99" fill="#94a3b8" font-size="10">thấy đúng kết quả</text>
<rect x="584" y="60" width="112" height="50" rx="9" fill="#14532d"/><text x="640" y="82" fill="#86efac">GET /api</text><text x="640" y="99" fill="#94a3b8" font-size="10">assert dữ liệu</text>
</g>
<g stroke="#475569" stroke-width="2" fill="none"><path d="M176 85 H212" marker-end="url(#ha)"/><path d="M362 85 H398" marker-end="url(#ha)"/><path d="M548 85 H584" marker-end="url(#ha)"/></g>
<defs><marker id="ha" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#475569"/></marker></defs>
<text x="28" y="160" font-size="13" fill="#5eead4" font-weight="700">Nhanh & ổn định hơn: không click qua chục màn hình chỉ để tạo trạng thái ban đầu.</text>
<text x="28" y="184" font-size="13" fill="#93c5fd">Faster & more stable: don't click through ten screens just to set up initial state.</text>
<text x="28" y="214" font-size="12.5" fill="#94a3b8">Quy tắc: seed & teardown bằng API, chỉ dùng UI cho đúng hành vi người dùng cần kiểm.</text>
</svg>`;

const svgDecisionPw = `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="240" rx="14" fill="#faf5ff"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#3b0764">Bảng quyết định → mỗi hàng là 1 test data-driven</text>
<g font-size="12">
<rect x="24" y="44" width="672" height="28" fill="#7c3aed"/>
<text x="40" y="63" fill="#fff" font-weight="800">Tuổi</text><text x="160" y="63" fill="#fff" font-weight="800">Hút thuốc</text><text x="320" y="63" fill="#fff" font-weight="800">Bệnh nền</text><text x="470" y="63" fill="#fff" font-weight="800">Hệ số</text><text x="590" y="63" fill="#fff" font-weight="800">Kết quả</text>
<g fill="#4c1d95" font-weight="600">
<rect x="24" y="72" width="672" height="26" fill="#ede9fe"/><text x="40" y="90">&lt; 30</text><text x="160" y="90">Không</text><text x="320" y="90">Không</text><text x="470" y="90">1.0x</text><text x="590" y="90" fill="#16a34a">Chuẩn</text>
<text x="40" y="116">30–50</text><text x="160" y="116">Không</text><text x="320" y="116">Có</text><text x="470" y="116">1.8x</text><text x="590" y="116" fill="#d97706">Duyệt tay</text>
<rect x="24" y="124" width="672" height="26" fill="#ede9fe"/><text x="40" y="142">30–50</text><text x="160" y="142">Có</text><text x="320" y="142">Không</text><text x="470" y="142">1.5x</text><text x="590" y="142" fill="#16a34a">Chuẩn</text>
<text x="40" y="168">&gt; 50</text><text x="160" y="168">Có</text><text x="320" y="168">Có</text><text x="470" y="168">3.2x</text><text x="590" y="168" fill="#dc2626">Từ chối</text>
</g></g>
<text x="24" y="204" font-size="12.5" fill="#6d28d9" font-weight="700">Phủ hết tổ hợp điều kiện thay vì test rời rạc — AI hỗ trợ liệt kê tổ hợp thiếu.</text>
</svg>`;

// ============================================================================
// ĐỊNH NGHĨA 10 BÀI
// ============================================================================
const DOCS = [
  // -------------------------------------------------------------- 1. SETUP
  {
    slug: "pw-project-setup", cover: th01, level: 2,
    title: { vi: "Thiết lập & kiến trúc dự án Playwright chuẩn production",
      en: "Playwright project setup & production-grade architecture",
      ja: "Playwright プロジェクトのセットアップとプロダクション品質のアーキテクチャ" },
    summary: { vi: "Khởi tạo, cấu hình, cấu trúc thư mục, reporter, biến môi trường và tooling như ở công ty — nền móng cho mọi bộ test bền vững.",
      en: "Scaffold, config, folder structure, reporters, env vars and tooling like real companies — the foundation of every durable suite.",
      ja: "実務と同じように、初期化・設定・フォルダ構成・レポーター・環境変数・ツールを整備します。あらゆる堅牢なテストスイートの土台です。" },
    pages: [
      {
        heading: { vi: "Khởi tạo & cấu hình", en: "Scaffold & configure", ja: "初期化と設定" },
        blocks: [
          UL(["Khởi tạo dự án bằng CLI chính thức và hiểu từng lệnh.",
              "Cấu hình config chuẩn production (retries, trace, reporter, projects).",
              "Cấu trúc thư mục & biến môi trường như công ty."],
             ["Scaffold with the official CLI and understand each command.",
              "Write a production-grade config (retries, trace, reporter, projects).",
              "Company-style folder structure & environment variables."],
             ["公式 CLI でプロジェクトを初期化し、各コマンドの意味を理解する。",
              "プロダクション品質の設定を書く（retries・trace・reporter・projects）。",
              "実務と同じフォルダ構成と環境変数を用意する。"]),
          P("Ở công ty, một dự án automation bắt đầu bằng việc dựng khung chuẩn để cả team dùng chung. Playwright có CLI khởi tạo sẵn config, ví dụ, và workflow CI.",
            "In companies, an automation project starts with a shared, standardized skeleton. Playwright's CLI scaffolds config, examples and a CI workflow.",
            "実務では、自動化プロジェクトはチーム全体で共有する標準的な骨組みを作ることから始まります。Playwright の CLI は設定・サンプル・CI ワークフローを自動生成してくれます。"),
          H("Thực hiện trong công cụ nào", "Which tool / commands", "どのツール／コマンドを使うか"),
          CODE("bash", "# Terminal — khởi tạo (JS/TS)\nnpm init playwright@latest       # chọn TypeScript, thư mục tests, thêm GitHub Actions\nnpx playwright install --with-deps  # tải 3 engine trình duyệt + phụ thuộc hệ điều hành\n\n# Python\npip install pytest-playwright && playwright install"),
          H("Config chuẩn production", "A production-grade config", "プロダクション品質の設定"),
          CODE("typescript", "// playwright.config.ts\nimport { defineConfig, devices } from '@playwright/test';\nexport default defineConfig({\n  testDir: './tests',\n  fullyParallel: true,\n  forbidOnly: !!process.env.CI,       // chặn test.only lọt vào CI\n  retries: process.env.CI ? 2 : 0,\n  workers: process.env.CI ? 4 : undefined,\n  reporter: [['html'], ['junit', { outputFile: 'results.xml' }]],\n  use: {\n    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',\n    trace: 'on-first-retry',\n    screenshot: 'only-on-failure',\n    video: 'retain-on-failure',\n  },\n  projects: [\n    { name: 'setup', testMatch: /global\\.setup\\.ts/ },\n    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, dependencies: ['setup'] },\n    { name: 'mobile-safari', use: { ...devices['iPhone 13'] }, dependencies: ['setup'] },\n  ],\n});"),
          TIP("Đặt `forbidOnly: !!process.env.CI` — một `test.only` bị quên sẽ khiến CI chỉ chạy 1 test mà vẫn 'xanh'. Đây là bẫy kinh điển ở công ty.",
            "Set `forbidOnly: !!process.env.CI` — a forgotten `test.only` makes CI run just one test yet stay 'green'. A classic company trap.",
            "`forbidOnly: !!process.env.CI` を設定しましょう。消し忘れた `test.only` があると、CI は 1 件だけテストを実行して「グリーン」のまま通ってしまいます。実務でよくある典型的な落とし穴です。"),
        ],
      },
      {
        heading: { vi: "Cấu trúc thư mục & phỏng vấn", en: "Folder structure & interview", ja: "フォルダ構成と面接" },
        blocks: [
          CODE("text", "e2e/\n├─ tests/            # các spec theo tính năng: checkout.spec.ts, login.spec.ts\n├─ pages/            # Page Objects (LoginPage, CartPage...)\n├─ fixtures/         # custom fixtures + dữ liệu test\n├─ helpers/          # tiện ích: seed API, format tiền...\n├─ state/            # storageState (phiên đăng nhập đã lưu)\n├─ global.setup.ts   # đăng nhập/khởi tạo một lần\n└─ playwright.config.ts"),
          P("Tách rõ 'test viết gì' (tests) khỏi 'cách chạm UI' (pages) và 'chuẩn bị dữ liệu' (helpers/fixtures). Khi UI đổi, bạn chỉ sửa ở pages — không đụng vào hàng trăm test.",
            "Separate 'what to test' (tests) from 'how to touch the UI' (pages) and 'data setup' (helpers/fixtures). When UI changes, you only edit pages — not hundreds of tests.",
            "「何をテストするか」（tests）を「どう UI を操作するか」（pages）や「データ準備」（helpers/fixtures）から明確に分離します。UI が変わったら pages だけを直せばよく、何百ものテストに触れる必要はありません。"),
          QA("Bạn tổ chức một dự án Playwright ở công ty thế nào?",
             "How do you structure a Playwright project at a company?",
             "Tách tests/pages/fixtures/helpers; config bật retries + trace on-first-retry + reporter HTML/JUnit; dùng projects cho đa trình duyệt & thiết bị; global setup đăng nhập một lần; baseURL & secret qua biến môi trường; forbidOnly trong CI. Mục tiêu: cả team viết test theo cùng khuôn, dễ bảo trì và chạy được trên CI.",
             "Separate tests/pages/fixtures/helpers; config with retries + trace on-first-retry + HTML/JUnit reporters; projects for cross-browser & devices; a global setup to log in once; baseURL & secrets via env vars; forbidOnly in CI. Goal: the whole team writes tests to one template that's maintainable and CI-ready.",
             "会社で Playwright プロジェクトをどう構成しますか？",
             "tests/pages/fixtures/helpers を分離します。設定では retries と trace: on-first-retry、HTML/JUnit レポーターを有効にし、クロスブラウザ・デバイス用に projects を使い、global setup で一度だけログインし、baseURL やシークレットは環境変数で渡し、CI では forbidOnly を有効にします。目的は、チーム全体が同じテンプレートに沿ってテストを書き、保守しやすく CI で実行可能にすることです。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 2. LOCATORS
  {
    slug: "pw-locators-autowait", cover: th02, level: 2,
    title: { vi: "Locators & Auto-wait — bí quyết test không giòn (câu hỏi phỏng vấn #1)",
      en: "Locators & Auto-wait — the anti-flaky foundation (interview #1)",
      ja: "ロケーターと自動待機 — フレークを防ぐ土台（面接頻出 No.1）" },
    summary: { vi: "90% test giòn đến từ locator kém. Thứ tự ưu tiên role/label/testid, cơ chế auto-wait, và cách trả lời khi phỏng vấn.",
      en: "90% of flaky tests come from poor locators. The role/label/testid priority, how auto-wait works, and how to answer in interviews.",
      ja: "フレークなテストの 90% は不適切なロケーターが原因です。role/label/testid の優先順位、自動待機の仕組み、そして面接での答え方を学びます。" },
    pages: [
      {
        heading: { vi: "Chọn phần tử sao cho bền", en: "Selecting elements that don't break", ja: "壊れにくい要素の選び方" },
        blocks: [
          P("Locator là 'địa chỉ' để tìm phần tử. Nguyên tắc vàng: chọn theo cách NGƯỜI DÙNG nhìn thấy (vai trò, nhãn, text) thay vì theo cấu trúc CSS/HTML dễ đổi mỗi lần build.",
            "A locator is the 'address' to find an element. Golden rule: select the way a USER perceives it (role, label, text) rather than fragile CSS/HTML structure that changes every build.",
            "ロケーターは要素を見つけるための「住所」です。黄金律は、ビルドごとに変わりやすい脆い CSS/HTML 構造ではなく、ユーザーが認識するとおり（役割・ラベル・テキスト）に要素を選ぶことです。"),
          IMG(svgLocatorPriority, "Thứ tự ưu tiên locator từ bền nhất đến dễ vỡ nhất.", "Locator priority from most robust to most brittle.", "最も堅牢なものから最も壊れやすいものへのロケーター優先順位。"),
          CODE("typescript", "// ✔ Bền: theo vai trò/nhãn/testid\npage.getByRole('button', { name: 'Thêm vào giỏ' });\npage.getByLabel('Email');\npage.getByTestId('product-42');\n// ✗ Tránh: CSS sinh tự động, XPath dài\npage.locator('div.sc-1x9k > button.btn-3xk9');"),
          WARN("Đừng bám class CSS do framework sinh (kiểu 'sc-1x9k') — chúng đổi mỗi lần build. Hãy đề nghị dev thêm thuộc tính data-testid ổn định ngay từ đầu.",
            "Never rely on framework-generated CSS classes (like 'sc-1x9k') — they change every build. Ask devs to add stable data-testid attributes up front.",
            "フレームワークが生成する CSS クラス（例：'sc-1x9k'）に依存してはいけません。ビルドのたびに変わってしまいます。最初から開発者に安定した data-testid 属性を追加してもらいましょう。"),
        ],
      },
      {
        heading: { vi: "Auto-wait & phỏng vấn", en: "Auto-wait & interview", ja: "自動待機と面接" },
        blocks: [
          P("Trước mỗi hành động, Playwright tự chờ phần tử: gắn vào DOM, hiển thị, ổn định (hết animation), bật được và nhận sự kiện. Nhờ vậy gần như xoá bỏ flaky do timing — bạn KHÔNG cần sleep.",
            "Before each action, Playwright auto-waits for the element: attached, visible, stable (no animation), enabled and receiving events. This nearly eliminates timing flakiness — you don't need sleeps.",
            "各アクションの前に、Playwright は要素を自動で待機します。DOM への追加、表示、安定（アニメーション完了）、操作可能、イベント受信を確認します。これによりタイミング起因のフレークがほぼなくなり、sleep は不要になります。"),
          CODE("typescript", "// KHÔNG cần sleep: click tự chờ nút sẵn sàng, assertion tự retry\nawait page.getByRole('button', { name: 'Đăng nhập' }).click();\nawait expect(page.getByText('Bảng điều khiển')).toBeVisible();"),
          QA("Vì sao test của bạn hay 'flaky' và bạn xử lý locator thế nào?",
             "Why do tests get flaky and how do you handle locators?",
             "Phần lớn flaky đến từ locator giòn (CSS tự sinh) và chờ sai cách (sleep cứng). Tôi ưu tiên getByRole/getByLabel/getByTestId, dựa vào auto-wait và web-first assertion thay cho sleep, và đề nghị dev thêm data-testid cho phần tử quan trọng. Nếu vẫn flaky, tôi mở trace để tìm đúng nguyên nhân.",
             "Most flakiness comes from brittle locators (auto-generated CSS) and wrong waiting (hard sleeps). I prefer getByRole/getByLabel/getByTestId, rely on auto-wait and web-first assertions instead of sleeps, and ask devs to add data-testid on key elements. If it persists, I open the trace to find the real cause.",
             "なぜテストがフレークになりやすく、ロケーターをどう扱いますか？",
             "フレークの多くは、脆いロケーター（自動生成 CSS）と誤った待機（ハードな sleep）が原因です。私は getByRole/getByLabel/getByTestId を優先し、sleep の代わりに自動待機と web-first アサーションに頼り、重要な要素には data-testid を追加してもらうよう開発者に依頼します。それでも解消しなければ、trace を開いて真の原因を突き止めます。"),
          TIP("Dùng `npx playwright codegen <url>` để Playwright tự sinh locator theo chuẩn ưu tiên khi bạn thao tác — rồi tinh chỉnh lại cho gọn.",
            "Use `npx playwright codegen <url>` — Playwright generates priority-ordered locators as you interact, then you refine them.",
            "`npx playwright codegen <url>` を使うと、操作するだけで Playwright が優先順位どおりのロケーターを生成してくれます。あとはそれを簡潔に調整するだけです。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 3. ASSERTIONS
  {
    slug: "pw-web-first-assertions", cover: th03, level: 2,
    title: { vi: "Web-first assertions & xử lý bất đồng bộ đúng cách",
      en: "Web-first assertions & handling async correctly",
      ja: "web-first アサーションと非同期の正しい扱い方" },
    summary: { vi: "expect() tự retry đến khi điều kiện đúng hoặc hết timeout. Cách chờ theo điều kiện, chờ response, và vì sao bỏ hẳn sleep.",
      en: "expect() auto-retries until the condition holds or times out. Condition waits, response waits, and why to drop sleeps entirely.",
      ja: "expect() は条件が満たされるかタイムアウトするまで自動でリトライします。条件待機、レスポンス待機、そして sleep を完全にやめるべき理由を解説します。" },
    pages: [
      {
        heading: { vi: "Assertion tự retry", en: "Auto-retrying assertions", ja: "自動リトライするアサーション" },
        blocks: [
          P("Assertion 'web-first' của Playwright (expect(locator)...) tự chờ và retry cho đến khi điều kiện đúng hoặc hết timeout. Khác hẳn assertion tức thời (expect(value)) vốn kiểm một lần rồi thôi.",
            "Playwright's web-first assertions (expect(locator)...) auto-wait and retry until the condition holds or times out. This differs from immediate assertions (expect(value)) that check once and stop.",
            "Playwright の web-first アサーション（expect(locator)…）は、条件が満たされるかタイムアウトするまで自動で待機・リトライします。一度だけチェックして終わる即時アサーション（expect(value)）とは大きく異なります。"),
          CODE("typescript", "// Tự retry đến khi đúng — hợp với UI cập nhật bất đồng bộ\nawait expect(page.getByTestId('total')).toHaveText('1.100.000đ');\nawait expect(page.getByRole('alert')).toBeVisible();\nawait expect(page).toHaveURL(/\\/order\\/DH\\d+/);\n// Tức thời (không retry) — chỉ cho giá trị đã có sẵn\nexpect(await api.balance()).toBe(5_000_000);"),
          H("Chờ theo điều kiện thay vì chờ thời gian", "Wait on conditions, not on time", "時間ではなく条件で待つ"),
          CODE("typescript", "// Chờ đúng response mạng rồi mới assert\nconst resp = page.waitForResponse(r => r.url().includes('/api/checkout') && r.ok());\nawait page.getByRole('button', { name: 'Đặt hàng' }).click();\nawait resp;\nawait expect(page.getByText('Đặt hàng thành công')).toBeVisible();"),
          WARN("Đừng dùng `page.waitForTimeout(3000)` để 'chữa' flaky. Sleep cứng vừa làm test chậm vừa che giấu nguyên nhân thật; hãy chờ theo điều kiện hoặc response.",
            "Never use `page.waitForTimeout(3000)` to 'cure' flakiness. Hard sleeps slow tests and mask the real cause; wait on a condition or a response instead.",
            "フレークを「治す」ために `page.waitForTimeout(3000)` を使ってはいけません。ハードな sleep はテストを遅くし、真の原因を覆い隠します。代わりに条件やレスポンスで待ちましょう。"),
        ],
      },
      {
        heading: { vi: "Phỏng vấn", en: "Interview", ja: "面接" },
        blocks: [
          QA("Khác nhau giữa web-first assertion và assertion thường? Khi nào dùng cái nào?",
             "Difference between web-first and normal assertions? When to use which?",
             "Web-first (expect(locator)) tự chờ & retry — dùng cho mọi thứ phụ thuộc trạng thái UI/mạng bất đồng bộ. Assertion thường (expect(value)) kiểm một lần — dùng cho giá trị đã có (kết quả API, phép tính). Sai lầm hay gặp là dùng assertion thường cho UI rồi phải chèn sleep để 'đợi', gây flaky.",
             "Web-first (expect(locator)) auto-waits & retries — use it for anything depending on async UI/network state. Normal assertions (expect(value)) check once — use them for already-available values (API results, computations). A common mistake is using normal assertions on the UI then adding sleeps to 'wait', causing flakiness.",
             "web-first アサーションと通常のアサーションの違いは？どちらをいつ使いますか？",
             "web-first（expect(locator)）は自動で待機・リトライするので、非同期な UI/ネットワークの状態に依存するものすべてに使います。通常のアサーション（expect(value)）は一度だけチェックするので、すでに得られている値（API の結果や計算値）に使います。よくある間違いは、UI に通常のアサーションを使い、「待つ」ために sleep を挿入してフレークを招くことです。"),
          TIP("Điều chỉnh timeout riêng cho từng assertion khi cần: `expect(locator).toBeVisible({ timeout: 15000 })` cho màn tải dữ liệu lớn.",
            "Tune per-assertion timeouts when needed: `expect(locator).toBeVisible({ timeout: 15000 })` for heavy data screens.",
            "必要に応じてアサーションごとにタイムアウトを調整しましょう。大量データを読み込む画面には `expect(locator).toBeVisible({ timeout: 15000 })` のように指定します。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 4. POM + FIXTURES
  {
    slug: "pw-pom-fixtures", cover: th04, level: 3,
    title: { vi: "Page Object Model & Custom Fixtures — kiến trúc test bền vững",
      en: "Page Object Model & Custom Fixtures — a durable test architecture",
      ja: "Page Object Model とカスタム Fixtures — 堅牢なテストアーキテクチャ" },
    summary: { vi: "Đóng gói locator + hành động vào class, tiêm sẵn context/dữ liệu bằng fixtures. Sửa một nơi khi UI đổi. Code JS/TS · Python · Java.",
      en: "Wrap locators + actions in classes, inject context/data via fixtures. Fix one place on UI change. Code in JS/TS · Python · Java.",
      ja: "ロケーターと操作をクラスにまとめ、fixtures でコンテキストやデータを注入します。UI が変わっても一箇所を直すだけ。コードは JS/TS・Python・Java で示します。" },
    pages: [
      {
        heading: { vi: "Page Object Model", en: "Page Object Model", ja: "Page Object Model" },
        blocks: [
          P("POM đóng gói mỗi trang thành một class chứa locator + hành động. Test gọi phương thức, không đụng locator trực tiếp — khi UI đổi bạn chỉ sửa một nơi.",
            "POM wraps each page into a class holding locators + actions. Tests call methods, never touch locators directly — when UI changes you fix one place.",
            "POM は各ページを、ロケーターと操作を持つクラスにまとめます。テストはメソッドを呼ぶだけでロケーターに直接触れないため、UI が変わっても一箇所を直すだけで済みます。"),
          CODE("typescript", "// pages/LoginPage.ts (TypeScript)\nimport { Page } from '@playwright/test';\nexport class LoginPage {\n  constructor(private page: Page) {}\n  goto() { return this.page.goto('/login'); }\n  async login(email: string, pass: string) {\n    await this.page.getByLabel('Email').fill(email);\n    await this.page.getByLabel('Mật khẩu').fill(pass);\n    await this.page.getByRole('button', { name: 'Đăng nhập' }).click();\n  }\n}"),
          CODE("python", "# pages/login_page.py (Python)\nclass LoginPage:\n    def __init__(self, page):\n        self.page = page\n    def login(self, email, password):\n        self.page.get_by_label('Email').fill(email)\n        self.page.get_by_label('Mật khẩu').fill(password)\n        self.page.get_by_role('button', name='Đăng nhập').click()"),
          WARN("Đừng nhét assertion vào Page Object. Page Object chỉ chứa locator + hành động; assertion nằm ở tầng test để diễn đạt rõ ý định kiểm thử.",
            "Don't put assertions inside Page Objects. Keep locators + actions there; assertions belong in the test to express intent.",
            "Page Object の中にアサーションを入れてはいけません。そこにはロケーターと操作だけを置き、アサーションはテスト側に置いて検証の意図を明確に表現します。"),
        ],
      },
      {
        heading: { vi: "Custom Fixtures", en: "Custom Fixtures", ja: "カスタム Fixtures" },
        blocks: [
          P("Fixtures 'tiêm' sẵn thứ mỗi test cần (page đã đăng nhập, Page Object, dữ liệu seed) và tự dọn sau khi chạy. Giảm lặp code và làm test đọc như mô tả nghiệp vụ.",
            "Fixtures inject what each test needs (an authenticated page, Page Objects, seeded data) and clean up afterward. Less boilerplate, and tests read like business descriptions.",
            "Fixtures は各テストが必要とするもの（ログイン済みの page、Page Object、シードしたデータ）を注入し、実行後に自動でクリーンアップします。定型コードが減り、テストが業務仕様の説明のように読めるようになります。"),
          CODE("typescript", "// fixtures.ts — tiêm sẵn LoginPage & một user đã seed\nimport { test as base } from '@playwright/test';\nimport { LoginPage } from './pages/LoginPage';\ntype Fx = { loginPage: LoginPage };\nexport const test = base.extend<Fx>({\n  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },\n});\n// dùng: test('đăng nhập', async ({ loginPage }) => { await loginPage.login(u, p); })"),
          QA("Vì sao dùng POM và Fixtures? Nhược điểm là gì?",
             "Why use POM and Fixtures? What are the downsides?",
             "POM tách locator/hành động khỏi test → UI đổi chỉ sửa một nơi, test dễ đọc. Fixtures tiêm context/dữ liệu và tự teardown → giảm lặp. Nhược điểm: lạm dụng POM có thể tạo lớp trừu tượng quá dày; nên giữ Page Object mỏng (chỉ locator + hành động), không nhồi logic nghiệp vụ hay assertion.",
             "POM separates locators/actions from tests → UI changes touch one place, tests read clearly. Fixtures inject context/data and auto-teardown → less duplication. Downside: over-using POM creates thick abstraction layers; keep Page Objects thin (locators + actions only), no business logic or assertions inside.",
             "なぜ POM と Fixtures を使うのですか？欠点は何ですか？",
             "POM はロケーター/操作をテストから分離するので、UI 変更は一箇所で済み、テストが読みやすくなります。Fixtures はコンテキストやデータを注入し自動でティアダウンするので、重複が減ります。欠点は、POM を使いすぎると抽象化の層が厚くなりすぎることです。Page Object は薄く保ち（ロケーターと操作だけ）、業務ロジックやアサーションを詰め込まないようにしましょう。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 5. AUTH
  {
    slug: "pw-auth-storagestate", cover: th05, level: 3,
    title: { vi: "Authentication một lần & đa vai trò (storageState + global setup)",
      en: "Authenticate once & multi-role (storageState + global setup)",
      ja: "一度だけ認証と複数ロール対応（storageState + global setup）" },
    summary: { vi: "Đăng nhập một lần, lưu phiên vào file, tái dùng cho mọi test. Quản lý nhiều vai trò (khách · admin · người duyệt) — chuẩn ở công ty.",
      en: "Log in once, save the session to a file, reuse everywhere. Manage multiple roles (customer · admin · approver) — the company standard.",
      ja: "一度だけログインしてセッションをファイルに保存し、すべてのテストで再利用します。複数のロール（顧客・管理者・承認者）を管理する、実務標準の手法です。" },
    pages: [
      {
        heading: { vi: "Đăng nhập một lần", en: "Log in once", ja: "一度だけログインする" },
        blocks: [
          P("Nếu mỗi test đăng nhập lại qua UI, bộ test sẽ chậm và dễ vỡ. Playwright cho phép đăng nhập một lần trong 'global setup', lưu cookie/localStorage vào file, rồi tái dùng cho tất cả test.",
            "If every test logs in via the UI, the suite gets slow and brittle. Playwright lets you log in once in a 'global setup', save cookies/localStorage to a file, then reuse it across all tests.",
            "テストごとに UI からログインし直すと、スイートは遅く壊れやすくなります。Playwright では「global setup」で一度だけログインし、cookie や localStorage をファイルに保存して、すべてのテストで再利用できます。"),
          CODE("typescript", "// global.setup.ts — chạy một lần trước các test\nimport { test as setup } from '@playwright/test';\nsetup('authenticate', async ({ page }) => {\n  await page.goto('/login');\n  await page.getByLabel('Email').fill(process.env.USER!);\n  await page.getByLabel('Mật khẩu').fill(process.env.PASS!);\n  await page.getByRole('button', { name: 'Đăng nhập' }).click();\n  await page.waitForURL('/dashboard');\n  await page.context().storageState({ path: 'state/user.json' });\n});"),
          CODE("typescript", "// playwright.config.ts — gán storageState cho project\nprojects: [\n  { name: 'setup', testMatch: /global\\.setup\\.ts/ },\n  { name: 'chromium', use: { storageState: 'state/user.json' }, dependencies: ['setup'] },\n]  // → mọi test đã đăng nhập sẵn"),
        ],
      },
      {
        heading: { vi: "Đa vai trò & phỏng vấn", en: "Multi-role & interview", ja: "複数ロールと面接" },
        blocks: [
          P("Ứng dụng thật có nhiều vai trò: khách hàng, nhân viên, admin, người duyệt. Tạo nhiều file storageState và gán theo project/test để mỗi vai trò có phiên riêng.",
            "Real apps have multiple roles: customer, staff, admin, approver. Create multiple storageState files and assign per project/test so each role has its own session.",
            "実際のアプリには複数のロールがあります。顧客、スタッフ、管理者、承認者などです。複数の storageState ファイルを作成し、project やテストごとに割り当てて、各ロールが専用のセッションを持てるようにします。"),
          CODE("typescript", "// Tạo nhiều phiên trong global setup\nfor (const r of ['customer', 'admin', 'approver']) {\n  // ... đăng nhập theo r ...\n  await page.context().storageState({ path: `state/${r}.json` });\n}\n// test dùng vai trò cụ thể:\ntest.use({ storageState: 'state/approver.json' });\ntest('người duyệt phê duyệt khoản vay', async ({ page }) => { /* ... */ });"),
          QA("Bạn xử lý đăng nhập trong bộ test lớn thế nào? Đa vai trò thì sao?",
             "How do you handle auth in a large suite? What about multiple roles?",
             "Đăng nhập một lần trong global setup, lưu storageState vào file, tái dùng cho mọi test qua config — nhanh và ổn định. Với đa vai trò, tạo một file state cho mỗi vai và gán theo project hoặc test.use(). Secret (user/pass) để trong biến môi trường/secret của CI, không hardcode.",
             "Log in once in a global setup, save storageState to a file, reuse across tests via config — fast and stable. For multiple roles, create one state file per role and assign via project or test.use(). Keep secrets (user/pass) in env vars/CI secrets, never hardcode.",
             "大規模なスイートで認証をどう扱いますか？複数ロールの場合は？",
             "global setup で一度だけログインし、storageState をファイルに保存して、config を通じてすべてのテストで再利用します。速くて安定します。複数ロールの場合は、ロールごとに 1 つの state ファイルを作成し、project または test.use() で割り当てます。シークレット（ユーザー/パスワード）は環境変数や CI のシークレットに置き、決してハードコードしません。"),
          WARN("Không commit file storageState hay secret vào git. Thêm `state/` vào .gitignore và nạp thông tin đăng nhập từ biến môi trường.",
            "Never commit storageState files or secrets to git. Add `state/` to .gitignore and load credentials from environment variables.",
            "storageState ファイルやシークレットを git にコミットしてはいけません。`state/` を .gitignore に追加し、認証情報は環境変数から読み込みましょう。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 6. NETWORK MOCKING
  {
    slug: "pw-network-mocking", cover: th06, level: 3,
    title: { vi: "Network interception & API mocking — kiểm ca lỗi/edge không cần backend",
      en: "Network interception & API mocking — test error/edge cases without a backend",
      ja: "ネットワークインターセプトと API モック — バックエンドなしでエラー/エッジケースをテスト" },
    summary: { vi: "Chặn và giả lập phản hồi mạng bằng route/fulfill để phủ ca lỗi (timeout, 500, hết hàng) tất định. Tình huống ví điện tử/eKYC.",
      en: "Intercept and stub network responses via route/fulfill to cover error cases (timeout, 500, out-of-stock) deterministically. E-wallet/eKYC scenario.",
      ja: "route/fulfill でネットワークレスポンスをインターセプトしてスタブ化し、エラーケース（タイムアウト・500・在庫切れ）を決定的にカバーします。電子ウォレット/eKYC のシナリオを扱います。" },
    pages: [
      {
        heading: { vi: "Chặn & giả lập phản hồi", en: "Intercept & stub responses", ja: "レスポンスのインターセプトとスタブ化" },
        blocks: [
          P("page.route() cho phép bắt request và tự trả phản hồi (fulfill) hoặc chặn (abort). Nhờ đó bạn kiểm giao diện ở các trạng thái khó tạo thật: lỗi 500, timeout, dữ liệu rỗng — mà không cần backend rơi vào trạng thái đó.",
            "page.route() lets you intercept requests and stub responses (fulfill) or block them (abort). This lets you test the UI in states hard to reproduce for real: 500 errors, timeouts, empty data — without the backend actually being in that state.",
            "page.route() を使うと、リクエストをインターセプトしてレスポンスをスタブ化（fulfill）したり、ブロック（abort）したりできます。これにより、実際に再現しにくい状態（500 エラー、タイムアウト、空データ）で UI をテストできます。バックエンドを実際にその状態にする必要はありません。"),
          CODE("typescript", "// Giả lập lỗi máy chủ để kiểm UI báo lỗi\nawait page.route('**/api/products*', route =>\n  route.fulfill({ status: 500, body: 'Internal Error' }));\nawait page.goto('/shop');\nawait expect(page.getByRole('alert')).toHaveText('Không tải được sản phẩm, thử lại sau');"),
          SCEN("Tình huống: ví điện tử — eKYC nhiều nhánh", "Scenario: e-wallet — multi-branch eKYC",
            "eKYC gọi dịch vụ OCR + so khớp khuôn mặt của bên thứ ba. Bạn cần phủ mọi nhánh: khớp, không khớp, ảnh mờ — mà không phụ thuộc dịch vụ ngoài. Mock chính là cách làm điều đó ổn định.",
            "eKYC calls a third-party OCR + face-match service. You must cover every branch: match, no match, blurry image — without depending on the external service. Mocking is how you do this reliably.",
            "シナリオ：電子ウォレット — 複数分岐の eKYC",
            "eKYC はサードパーティの OCR と顔照合サービスを呼び出します。一致・不一致・画像がぼやけている、といったすべての分岐を、外部サービスに依存せずにカバーする必要があります。モックこそが、これを安定して行う方法です。"),
          CODE("typescript", "for (const c of [\n  { face: 'MATCH', ocr: 'OK', expect: 'Nâng cấp KYC cấp 2 thành công' },\n  { face: 'NO_MATCH', ocr: 'OK', expect: 'Khuôn mặt không khớp giấy tờ' },\n  { face: 'MATCH', ocr: 'BLUR', expect: 'Ảnh giấy tờ chưa rõ, chụp lại' },\n]) {\n  test(`eKYC face=${c.face} ocr=${c.ocr}`, async ({ page }) => {\n    await page.route('**/ekyc/verify', r =>\n      r.fulfill({ status: 200, body: JSON.stringify({ face: c.face, ocr: c.ocr }) }));\n    await page.goto('/kyc/upgrade');\n    await page.getByRole('button', { name: 'Xác thực' }).click();\n    await expect(page.getByRole('status')).toContainText(c.expect);\n  });\n}"),
        ],
      },
      {
        heading: { vi: "Mẹo & phỏng vấn", en: "Tips & interview", ja: "コツと面接" },
        blocks: [
          TIP("Mock để tất định, nhưng đừng mock quá tay đến mức không còn kiểm được tích hợp thật. Chiến lược tốt: mock bên thứ ba (thanh toán, OCR), còn API nội bộ thì test thật ở tầng integration.",
            "Mock for determinism, but don't over-mock until you no longer test real integration. Good strategy: mock third parties (payments, OCR), but test internal APIs for real at the integration layer.",
            "決定性のためにモックしますが、実際の統合をテストできなくなるほどモックしすぎてはいけません。良い戦略は、サードパーティ（決済、OCR）はモックし、内部 API は integration レイヤーで実際にテストすることです。"),
          QA("Khi nào bạn mock mạng, khi nào test thật?",
             "When do you mock the network vs. test for real?",
             "Mock khi cần tất định và khó tạo trạng thái thật: lỗi 500/timeout, dịch vụ bên thứ ba (thanh toán, OCR, NAPAS), hoặc ca biên hiếm. Test thật với API nội bộ ở tầng integration để bắt lỗi hợp đồng dữ liệu. E2E quan trọng nhất nên có ít nhất một luồng chạy thật đầu-cuối để không 'mock đến mức mọi thứ đều xanh giả'.",
             "Mock when you need determinism and states hard to reproduce: 500/timeout errors, third parties (payments, OCR, NAPAS), or rare edge cases. Test for real against internal APIs at the integration layer to catch contract bugs. The most critical E2E flow should have at least one truly end-to-end run so you don't 'mock everything green'.",
             "ネットワークをモックするのはいつで、実際にテストするのはいつですか？",
             "決定性が必要で、実際の状態を再現しにくい場合にモックします。500/タイムアウトのエラー、サードパーティ（決済、OCR、NAPAS）、まれなエッジケースなどです。データ契約のバグを捕まえるため、内部 API は integration レイヤーで実際にテストします。最も重要な E2E フローには、少なくとも 1 本は本当にエンドツーエンドで実行するものを用意し、「すべてモックして偽のグリーン」にならないようにします。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 7. API + UI HYBRID
  {
    slug: "pw-api-ui-hybrid", cover: th07, level: 3,
    title: { vi: "Kết hợp API + UI — seed dữ liệu nhanh & kiểm chứng chuẩn (request context)",
      en: "API + UI hybrid — fast data seeding & solid verification (request context)",
      ja: "API + UI のハイブリッド — 高速なデータシードと確実な検証（request context）" },
    summary: { vi: "Dùng chung request context để seed/kiểm chứng qua API và thao tác UI trong một test. Tình huống chuyển khoản ngân hàng: nhanh, ổn định, assert số tiền chính xác.",
      en: "Share the request context to seed/verify via API and drive the UI in one test. Banking transfer scenario: fast, stable, exact-amount assertions.",
      ja: "request context を共有して、API でシード/検証しつつ、同じテスト内で UI を操作します。銀行振込のシナリオで、高速・安定・正確な金額アサーションを実現します。" },
    pages: [
      {
        heading: { vi: "Vì sao lai API + UI", en: "Why hybrid API + UI", ja: "なぜ API + UI のハイブリッドか" },
        blocks: [
          P("Thay vì click qua chục màn hình để tạo trạng thái ban đầu (tài khoản, giỏ hàng), hãy seed bằng API rồi chỉ test đúng phần cần trên UI. Playwright chia sẻ request context nên làm được cả hai trong một test.",
            "Instead of clicking through ten screens to set up initial state (accounts, carts), seed via API and test only the needed part on the UI. Playwright shares a request context so you do both in one test.",
            "初期状態（口座やカート）を作るために何画面もクリックする代わりに、API でシードし、UI では必要な部分だけをテストします。Playwright は request context を共有するので、これを 1 つのテスト内で両方行えます。"),
          IMG(svgHybrid, "Seed & assert bằng API, chỉ thao tác UI cho đúng luồng cần kiểm.", "Seed & assert via API, drive the UI only for the flow under test.", "API でシードとアサートを行い、UI はテスト対象のフローだけを操作する。"),
          H("Tình huống: chuyển khoản ngân hàng", "Scenario: bank transfer", "シナリオ：銀行振込"),
          SCEN("Bối cảnh", "Context",
            "Ngân hàng số vừa đổi luồng chuyển khoản. Bạn cần test 'chuyển 5.000.000đ' và đảm bảo bất biến bảo toàn tiền: A giảm đúng (tiền + phí), B tăng đúng, tổng hệ thống không đổi.",
            "A digital bank changed the transfer flow. You must test 'transfer 5,000,000 VND' and ensure the money-conservation invariant: A decreases exactly (amount + fee), B increases exactly, system total unchanged.",
            "背景",
            "あるデジタル銀行が振込フローを変更しました。「5,000,000 VND を振り込む」をテストし、資金保存の不変条件を保証する必要があります。A は正確に減り（金額 + 手数料）、B は正確に増え、システム全体の合計は変わらないことを確認します。"),
          CODE("typescript", "test('chuyển khoản: happy path + bảo toàn tiền', async ({ page, request }) => {\n  // Seed nhanh qua API\n  const A = await (await request.post('/api/test/account', { data: { balance: 10_000_000 } })).json();\n  const B = await (await request.post('/api/test/account', { data: { bank: 'VCB', balance: 0 } })).json();\n\n  await page.goto('/transfer');\n  await page.getByLabel('Số tài khoản nhận').fill(B.number);\n  await page.getByLabel('Số tiền').fill('5000000');\n  await page.getByRole('button', { name: 'Tiếp tục' }).click();\n  await page.getByLabel('Mã OTP').fill('123456');\n  await page.getByRole('button', { name: 'Xác nhận' }).click();\n  await expect(page.getByText('Chuyển khoản thành công')).toBeVisible();\n\n  // Assert số tiền CHÍNH XÁC qua API (gồm phí 11k)\n  const a = await (await request.get(`/api/test/account/${A.id}`)).json();\n  const b = await (await request.get(`/api/test/account/${B.id}`)).json();\n  expect(a.balance).toBe(10_000_000 - 5_000_000 - 11_000);\n  expect(b.balance).toBe(5_000_000);\n});"),
        ],
      },
      {
        heading: { vi: "Phỏng vấn", en: "Interview", ja: "面接" },
        blocks: [
          WARN("Với hệ thống tài chính, đừng assert kiểu 'thành công' rồi dừng. Phải assert SỐ TIỀN cụ thể ở cả hai đầu và bất biến bảo toàn tiền — nơi bug nghiêm trọng nhất ẩn nấp.",
            "For financial systems, don't assert only 'succeeded' and stop. Assert the exact AMOUNTS on both sides plus the conservation invariant — where the most severe bugs hide.",
            "金融システムでは「成功した」とだけアサートして終わりにしてはいけません。両側の正確な金額と資金保存の不変条件をアサートしましょう。最も深刻なバグはそこに潜んでいます。"),
          QA("Bạn test một luồng phức tạp cho nhanh và ổn định thế nào?",
             "How do you test a complex flow quickly and reliably?",
             "Seed trạng thái ban đầu qua API (tài khoản, số dư, giỏ hàng), chỉ dùng UI cho đúng hành vi cần kiểm, mock bên thứ ba để tất định, và assert bằng cả UI lẫn API (số tiền/mã đơn cụ thể). Cách này nhanh hơn nhiều so với dựng mọi thứ qua UI và ít giòn hơn.",
             "Seed initial state via API (accounts, balances, carts), use the UI only for the exact behavior under test, mock third parties for determinism, and assert via both UI and API (exact amounts/order IDs). This is far faster than building everything through the UI and much less brittle.",
             "複雑なフローを速く安定してテストするにはどうしますか？",
             "初期状態は API でシードし（口座、残高、カート）、UI はテスト対象の挙動だけに使い、サードパーティは決定性のためにモックし、UI と API の両方でアサートします（正確な金額や注文番号）。この方法はすべてを UI で組み立てるよりはるかに速く、壊れにくくなります。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 8. DATA-DRIVEN
  {
    slug: "pw-data-driven", cover: th08, level: 3,
    title: { vi: "Data-driven testing cho nghiệp vụ nhiều nhánh (bảng quyết định)",
      en: "Data-driven testing for multi-branch business rules (decision tables)",
      ja: "多分岐の業務ルールのためのデータ駆動テスト（デシジョンテーブル）" },
    summary: { vi: "Biến bảng quyết định thành bộ test tham số hoá phủ đủ tổ hợp. Tình huống tính phí bảo hiểm & claim. Code TS + Python.",
      en: "Turn a decision table into a parametrized suite covering all combinations. Insurance premium & claims scenario. TS + Python code.",
      ja: "デシジョンテーブルを、すべての組み合わせをカバーするパラメータ化テストスイートに変換します。保険料と保険金請求のシナリオを扱い、TS + Python のコードを示します。" },
    pages: [
      {
        heading: { vi: "Từ bảng quyết định → bộ test", en: "From decision table → test suite", ja: "デシジョンテーブルからテストスイートへ" },
        blocks: [
          P("Nghiệp vụ nhiều điều kiện (phí bảo hiểm, hạn mức, quy tắc loại trừ) rất dễ sót tổ hợp. Kỹ thuật data-driven: một khối test sinh nhiều ca từ một bảng dữ liệu — phủ đủ tổ hợp thay vì test rời rạc.",
            "Highly conditional logic (insurance premiums, limits, exclusion rules) easily misses combinations. Data-driven technique: one test block generates many cases from a data table — covering the full combination matrix instead of ad-hoc cases.",
            "条件の多い業務ロジック（保険料、限度額、免責ルール）は組み合わせを見落としやすいものです。データ駆動の手法では、1 つのテストブロックがデータテーブルから多数のケースを生成し、場当たり的なケースではなく組み合わせ全体をカバーします。"),
          IMG(svgDecisionPw, "Mỗi hàng của bảng quyết định trở thành một test case.", "Each decision-table row becomes a test case.", "デシジョンテーブルの各行が 1 つのテストケースになる。"),
          CODE("typescript", "// TypeScript — tham số hoá từ bảng quyết định\nconst CASES = [\n  { age: 25, smoke: false, chronic: false, factor: '1.0x', outcome: 'Chuẩn' },\n  { age: 40, smoke: false, chronic: true,  factor: '1.8x', outcome: 'Duyệt tay' },\n  { age: 40, smoke: true,  chronic: false, factor: '1.5x', outcome: 'Chuẩn' },\n  { age: 60, smoke: true,  chronic: true,  factor: '3.2x', outcome: 'Từ chối' },\n];\nfor (const c of CASES) {\n  test(`phí: tuổi ${c.age} smoke=${c.smoke} chronic=${c.chronic}`, async ({ page }) => {\n    await page.goto('/quote');\n    await page.getByLabel('Tuổi').fill(String(c.age));\n    await page.getByLabel('Hút thuốc').setChecked(c.smoke);\n    await page.getByLabel('Bệnh nền').setChecked(c.chronic);\n    await page.getByRole('button', { name: 'Tính phí' }).click();\n    await expect(page.getByTestId('factor')).toHaveText(c.factor);\n    await expect(page.getByTestId('decision')).toHaveText(c.outcome);\n  });\n}"),
          CODE("python", "# Python — @pytest.mark.parametrize\nimport pytest\nCASES = [(25,False,False,'1.0x','Chuẩn'), (60,True,True,'3.2x','Từ chối')]\n@pytest.mark.parametrize('age,smoke,chronic,factor,outcome', CASES)\ndef test_premium(page, age, smoke, chronic, factor, outcome):\n    page.goto('/quote')\n    page.get_by_label('Tuổi').fill(str(age))\n    page.get_by_role('button', name='Tính phí').click()\n    from playwright.sync_api import expect\n    expect(page.get_by_test_id('factor')).to_have_text(factor)"),
        ],
      },
      {
        heading: { vi: "Mẹo & phỏng vấn", en: "Tips & interview", ja: "コツと面接" },
        blocks: [
          TIP("Đặt tên test có tham số (như 'phí: tuổi 60 smoke=true') để report chỉ đúng ca fail — dễ điều tra hơn nhiều so với một test lặp vòng bên trong.",
            "Name parametrized tests with their inputs (e.g., 'premium: age 60 smoke=true') so the report points at the exact failing case — far easier to investigate than one test looping internally.",
            "パラメータ化テストには入力値を含む名前を付けましょう（例：「保険料: 年齢60 smoke=true」）。そうすればレポートが失敗した具体的なケースを指し示すので、内部でループする 1 つのテストよりはるかに調査しやすくなります。"),
          QA("Data-driven testing là gì và khi nào dùng?",
             "What is data-driven testing and when to use it?",
             "Là tách dữ liệu ra khỏi logic test: một kịch bản chạy với nhiều bộ dữ liệu. Dùng khi nghiệp vụ có nhiều tổ hợp điều kiện (bảng quyết định, hạn mức, quy tắc). Kết hợp với kỹ thuật Boundary Value + Decision Table để phủ đủ mà không viết trùng lặp. Mỗi hàng dữ liệu nên hiện thành một test riêng trong report.",
             "It separates data from test logic: one scenario runs with many data sets. Use it when business rules have many condition combinations (decision tables, limits, rules). Combine with Boundary Value + Decision Table techniques to cover thoroughly without duplication. Each data row should appear as its own test in the report.",
             "データ駆動テストとは何で、いつ使いますか？",
             "データをテストロジックから分離することです。1 つのシナリオを複数のデータセットで実行します。業務ルールに多数の条件の組み合わせがある場合（デシジョンテーブル、限度額、ルール）に使います。境界値分析とデシジョンテーブルの技法と組み合わせると、重複を書かずに網羅的にカバーできます。各データ行はレポート上で独立したテストとして表示されるべきです。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 9. CI/CD
  {
    slug: "pw-cicd-github-actions", cover: th09, level: 3,
    title: { vi: "CI/CD với GitHub Actions — song song, sharding, retries & báo cáo",
      en: "CI/CD with GitHub Actions — parallelism, sharding, retries & reports",
      ja: "GitHub Actions での CI/CD — 並列実行・シャーディング・リトライ・レポート" },
    summary: { vi: "Chạy Playwright tự động mỗi PR, chia shard nhiều máy, retry có kiểm soát, lưu HTML report + trace làm artifact. Kỹ năng phân biệt QA 'thực chiến'.",
      en: "Run Playwright on every PR, shard across machines, controlled retries, store HTML report + trace as artifacts. The skill that marks a battle-tested QA.",
      ja: "PR ごとに Playwright を自動実行し、複数マシンにシャーディングし、リトライを制御し、HTML レポートと trace をアーティファクトとして保存します。実戦経験のある QA を見分けるスキルです。" },
    pages: [
      {
        heading: { vi: "Workflow chạy song song", en: "A parallel workflow", ja: "並列実行のワークフロー" },
        blocks: [
          P("Test chỉ tạo giá trị khi chạy tự động mỗi PR để chặn lỗi trước khi merge. Playwright hỗ trợ sharding (chia test cho nhiều máy chạy song song), retry, và HTML report + trace để điều tra khi fail.",
            "Tests only add value when they run automatically on every PR to block bugs before merge. Playwright supports sharding (splitting tests across parallel machines), retries, and HTML report + trace to investigate failures.",
            "テストは、マージ前にバグを止めるために PR ごとに自動実行されて初めて価値を生みます。Playwright はシャーディング（テストを複数の並列マシンに分割）、リトライ、そして失敗を調査するための HTML レポートと trace をサポートしています。"),
          CODE("yaml", "# .github/workflows/e2e.yml\nname: E2E\non: [pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      fail-fast: false\n      matrix: { shard: [1, 2, 3, 4] }   # 4 máy chạy song song\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - run: npx playwright test --shard=${{ matrix.shard }}/4\n        env: { BASE_URL: ${{ secrets.STAGING_URL }} }\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: report-${{ matrix.shard }}\n          path: playwright-report"),
          TIP("`fail-fast: false` để một shard đỏ không huỷ các shard khác — bạn thấy toàn cảnh lỗi trong một lần chạy thay vì sửa lắt nhắt.",
            "`fail-fast: false` so one red shard doesn't cancel the others — you see the full failure picture in one run instead of fixing piecemeal.",
            "`fail-fast: false` にすると、1 つのシャードが赤くなっても他のシャードがキャンセルされません。細切れに直すのではなく、1 回の実行で失敗の全体像を把握できます。"),
        ],
      },
      {
        heading: { vi: "Report, secret & phỏng vấn", en: "Reports, secrets & interview", ja: "レポート・シークレットと面接" },
        blocks: [
          UL(["Lưu HTML report + trace bằng upload-artifact với `if: always()` để có cả khi fail.",
              "Để secret (BASE_URL, tài khoản test) trong GitHub Secrets, không hardcode.",
              "Retry có kiểm soát (retries: 2 trong CI) cho ca mạng chập chờn — không lạm dụng để giấu bug.",
              "Gộp report nhiều shard bằng blob reporter nếu cần một báo cáo tổng."],
             ["Store HTML report + trace via upload-artifact with `if: always()` so you get them even on failure.",
              "Keep secrets (BASE_URL, test accounts) in GitHub Secrets, never hardcoded.",
              "Controlled retries (retries: 2 in CI) for flaky networks — don't abuse them to hide bugs.",
              "Merge multi-shard reports with the blob reporter if you need one combined report."],
             ["HTML レポートと trace は `if: always()` を付けた upload-artifact で保存し、失敗時にも取得できるようにする。",
              "シークレット（BASE_URL、テストアカウント）は GitHub Secrets に置き、ハードコードしない。",
              "不安定なネットワーク向けにリトライを制御する（CI では retries: 2）。バグを隠すために乱用しない。",
              "統合レポートが必要な場合は blob reporter で複数シャードのレポートをマージする。"]),
          QA("Bạn đưa Playwright vào CI/CD thế nào? Sharding là gì?",
             "How do you put Playwright into CI/CD? What is sharding?",
             "Tạo workflow chạy trên mỗi PR: checkout → cài Node → npm ci → playwright install → chạy test. Sharding là chia bộ test cho N máy chạy song song (--shard=i/N) để rút ngắn thời gian. Bật retries có kiểm soát trong CI, lưu HTML report + trace làm artifact với if:always(), và để secret trong GitHub Secrets. Biết đưa test vào CI là điểm phân biệt QA automation thực chiến với người chỉ chạy test trên máy cá nhân.",
             "Create a workflow on every PR: checkout → setup Node → npm ci → playwright install → run tests. Sharding splits the suite across N parallel machines (--shard=i/N) to cut runtime. Enable controlled retries in CI, store HTML report + trace as artifacts with if:always(), and keep secrets in GitHub Secrets. Knowing how to wire tests into CI is what separates a battle-tested automation QA from someone who only runs tests locally.",
             "Playwright を CI/CD にどう組み込みますか？シャーディングとは何ですか？",
             "PR ごとに実行するワークフローを作成します：checkout → Node のセットアップ → npm ci → playwright install → テスト実行。シャーディングは、実行時間を短縮するためにスイートを N 台の並列マシンに分割することです（--shard=i/N）。CI では制御されたリトライを有効にし、HTML レポートと trace を if:always() でアーティファクトとして保存し、シークレットは GitHub Secrets に置きます。テストを CI に組み込めることが、実戦経験のある自動化 QA と、ローカルでしかテストを実行しない人とを分ける点です。"),
        ],
      },
    ],
  },

  // -------------------------------------------------------------- 10. FLAKY + DEBUG
  {
    slug: "pw-flaky-trace-debug", cover: th10, level: 3,
    title: { vi: "Chống flaky & bộ công cụ debug (Trace Viewer · UI Mode · Codegen)",
      en: "Anti-flaky & the debug toolkit (Trace Viewer · UI Mode · Codegen)",
      ja: "フレーク対策とデバッグツール群（Trace Viewer・UI Mode・Codegen）" },
    summary: { vi: "Nguyên nhân test lúc pass lúc fail và cách chữa tận gốc; điều tra fail trong CI bằng Trace Viewer; tăng tốc viết/sửa bằng UI Mode & Codegen.",
      en: "Why tests pass/fail intermittently and how to fix the root cause; investigate CI failures with the Trace Viewer; iterate faster with UI Mode & Codegen.",
      ja: "テストが不定期に成功/失敗する原因と根本的な直し方、Trace Viewer による CI 失敗の調査、UI Mode と Codegen による作成/修正の高速化を解説します。" },
    pages: [
      {
        heading: { vi: "Chống flaky", en: "Anti-flaky", ja: "フレーク対策" },
        blocks: [
          P("Test flaky (lúc xanh lúc đỏ mà không đổi code) làm mất niềm tin vào cả bộ test. Trị tận gốc quan trọng hơn 'chạy lại cho xanh'.",
            "Flaky tests (green/red with no code change) erode trust in the whole suite. Fixing the root cause matters far more than 'rerun until green'.",
            "フレークなテスト（コードを変えていないのに緑/赤が変わる）は、スイート全体への信頼を損ないます。「緑になるまで再実行」よりも、根本原因を直すことがはるかに重要です。"),
          UL(["Không dùng sleep cứng — dựa vào auto-wait & web-first assertion; nếu cần, chờ theo điều kiện/response.",
              "Cô lập dữ liệu: mỗi test tự tạo & dọn, không dùng chung tài khoản/bản ghi.",
              "Không phụ thuộc thứ tự chạy giữa các test.",
              "Ổn định dữ liệu động (thời gian, số dư, quảng cáo) trước khi so sánh/visual.",
              "Mock bên thứ ba (thanh toán, OCR, NAPAS) để tất định.",
              "Theo dõi flaky rate như chỉ số chất lượng; test vượt ngưỡng thì quarantine & sửa."],
             ["No hard sleeps — rely on auto-wait & web-first assertions; wait on condition/response when needed.",
              "Isolate data: each test creates & cleans its own, no shared accounts/records.",
              "No inter-test order dependency.",
              "Stabilize dynamic data (time, balances, ads) before comparison/visual.",
              "Mock third parties (payments, OCR, NAPAS) for determinism.",
              "Track flaky rate as a quality metric; quarantine & fix tests above threshold."],
             ["ハードな sleep を使わない。自動待機と web-first アサーションに頼り、必要なら条件/レスポンスで待つ。",
              "データを分離する。各テストが自分でデータを作成・クリーンアップし、アカウントやレコードを共有しない。",
              "テスト間で実行順序に依存しない。",
              "比較やビジュアル検証の前に、動的データ（時刻、残高、広告）を安定させる。",
              "決定性のためにサードパーティ（決済、OCR、NAPAS）をモックする。",
              "フレーク率を品質指標として追跡し、しきい値を超えたテストは隔離（quarantine）して修正する。"]),
        ],
      },
      {
        heading: { vi: "Bộ công cụ debug", en: "The debug toolkit", ja: "デバッグツール群" },
        blocks: [
          P("Khi test fail trong CI, bạn không cần tái hiện tay. Trace Viewer ghi lại từng bước kèm ảnh, DOM, network và console — mở ra xem như tua video.",
            "When a test fails in CI, you don't need manual repro. The Trace Viewer records each step with screenshots, DOM, network and console — open it and replay like a video.",
            "CI でテストが失敗しても、手動で再現する必要はありません。Trace Viewer は各ステップをスクリーンショット、DOM、ネットワーク、コンソールとともに記録するので、開いて動画のように再生できます。"),
          CODE("bash", "# Ghi & xem trace\nnpx playwright test --trace on\nnpx playwright show-trace trace.zip\n\n# UI Mode: xem test chạy, tua từng bước, sửa nhanh\nnpx playwright test --ui\n\n# Codegen: thao tác trình duyệt, Playwright tự sinh code + locator\nnpx playwright codegen https://shop.example.com"),
          NOTE("Chiến lược phổ biến ở công ty: `trace: 'on-first-retry'` — chỉ ghi trace khi test fail lần đầu rồi retry, đủ để điều tra mà không phình dung lượng CI.",
            "A common company strategy: `trace: 'on-first-retry'` — record a trace only when a test first fails then retries, enough to investigate without bloating CI storage.",
            "実務でよくある戦略：`trace: 'on-first-retry'` — テストが最初に失敗してリトライするときだけ trace を記録します。CI のストレージを圧迫せずに調査するのに十分です。"),
          QA("Test của bạn đỏ trong CI nhưng xanh khi chạy tay. Bạn làm gì?",
             "Your test is red in CI but green locally. What do you do?",
             "Không phán đoán mò hay 'chạy lại cho xanh'. Mở trace của lần fail để có bằng chứng: xem bước fail, network, thời điểm. Phân loại lỗi thật hay flaky. Nếu flaky do timing/mạng → chờ theo điều kiện/response, ổn định dữ liệu, mock bên thứ ba. Nếu là bug thật → báo dev kèm trace + test tái hiện. Cuối cùng thêm biện pháp phòng ngừa và theo dõi flaky rate. Quyết định dựa trên trace, không dựa vào cảm tính.",
             "Don't guess or 'rerun until green'. Open the failing run's trace for evidence: inspect the failing step, network, timing. Triage real bug vs. flaky. If flaky due to timing/network → wait on condition/response, stabilize data, mock third parties. If it's a real bug → report to devs with the trace + a reproducing test. Finally add prevention and track flaky rate. Decide on the trace, not on gut feeling.",
             "CI では赤なのにローカルでは緑です。どうしますか？",
             "当てずっぽうで判断したり「緑になるまで再実行」したりしません。失敗した実行の trace を開いて証拠を得ます：失敗したステップ、ネットワーク、タイミングを確認します。本物のバグかフレークかを切り分けます。タイミング/ネットワーク起因のフレークなら → 条件/レスポンスで待ち、データを安定させ、サードパーティをモックします。本物のバグなら → trace と再現テストを添えて開発者に報告します。最後に再発防止策を追加し、フレーク率を追跡します。勘ではなく trace に基づいて判断します。"),
        ],
      },
    ],
  },
];

const levelLabel = (lvl) => (lvl === 1 ? "Cơ bản" : lvl === 2 ? "Trung cấp" : "Nâng cao");

// ---- Clickable tags (trilingual labels, grouped by domain/type/tech) ----
export const TAG = {
  // type
  interview: { k: "interview", vi: "Phỏng vấn", en: "Interview", ja: "面接", g: "type" },
  tip: { k: "tip", vi: "Tip", en: "Tip", ja: "コツ", g: "type" },
  experience: { k: "experience", vi: "Kinh nghiệm", en: "Experience", ja: "経験", g: "type" },
  realworld: { k: "realworld", vi: "Thực tế", en: "Real-world", ja: "実務", g: "type" },
  foundation: { k: "foundation", vi: "Nền tảng", en: "Foundation", ja: "基礎", g: "type" },
  // domain
  banking: { k: "banking", vi: "Ngân hàng", en: "Banking", ja: "銀行", g: "domain" },
  fintech: { k: "fintech", vi: "Fintech", en: "Fintech", ja: "フィンテック", g: "domain" },
  insurance: { k: "insurance", vi: "Bảo hiểm", en: "Insurance", ja: "保険", g: "domain" },
  healthcare: { k: "healthcare", vi: "Y tế", en: "Healthcare", ja: "医療", g: "domain" },
  ecommerce: { k: "ecommerce", vi: "TMĐT", en: "E-commerce", ja: "EC", g: "domain" },
  // tech
  playwright: { k: "playwright", vi: "Playwright", en: "Playwright", ja: "Playwright", g: "tech" },
  cicd: { k: "cicd", vi: "CI/CD", en: "CI/CD", ja: "CI/CD", g: "tech" },
  pom: { k: "pom", vi: "POM", en: "POM", ja: "POM", g: "tech" },
  api: { k: "api", vi: "API", en: "API", ja: "API", g: "tech" },
  mocking: { k: "mocking", vi: "Mocking", en: "Mocking", ja: "モック", g: "tech" },
  datadriven: { k: "datadriven", vi: "Data-driven", en: "Data-driven", ja: "データ駆動", g: "tech" },
  debug: { k: "debug", vi: "Debug", en: "Debug", ja: "デバッグ", g: "tech" },
  auth: { k: "auth", vi: "Auth", en: "Auth", ja: "認証", g: "tech" },
  locators: { k: "locators", vi: "Locators", en: "Locators", ja: "ロケーター", g: "tech" },
  aitesting: { k: "aitesting", vi: "AI Testing", en: "AI Testing", ja: "AIテスト", g: "tech" },
};

const TAGS_BY_SLUG = {
  "pw-project-setup": ["playwright", "foundation", "tip", "interview"],
  "pw-locators-autowait": ["playwright", "locators", "interview", "tip", "foundation"],
  "pw-web-first-assertions": ["playwright", "interview", "foundation"],
  "pw-pom-fixtures": ["playwright", "pom", "interview", "experience"],
  "pw-auth-storagestate": ["playwright", "auth", "experience", "tip"],
  "pw-network-mocking": ["playwright", "mocking", "fintech", "realworld"],
  "pw-api-ui-hybrid": ["playwright", "api", "banking", "realworld", "interview"],
  "pw-data-driven": ["playwright", "datadriven", "insurance", "healthcare", "realworld"],
  "pw-cicd-github-actions": ["playwright", "cicd", "interview", "experience"],
  "pw-flaky-trace-debug": ["playwright", "debug", "interview", "tip"],
};

export const PLAYWRIGHT_PRO_DOCS = DOCS.map((d) => ({
  categorySlug: "playwright-tools",
  slug: d.slug,
  cover: d.cover,
  level: d.level,
  levelLabel: levelLabel(d.level),
  tags: (TAGS_BY_SLUG[d.slug] || []).map((k) => TAG[k]).filter(Boolean),
  title: { vi: d.title.vi, en: d.title.en, ja: d.title.ja ?? d.title.en },
  summary: { vi: d.summary.vi, en: d.summary.en, ja: d.summary.ja ?? d.summary.en },
  pages: buildDoc(d.pages),
}));
