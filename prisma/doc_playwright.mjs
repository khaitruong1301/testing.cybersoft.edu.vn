// ============================================================================
// DEEP sample document: Playwright — nền tảng đến chuyên sâu.
// Rendered as ONE scrollable page. Bilingual VI/EN (JA falls back to EN).
// Blocks: p, h, ul, code, note, tip, warn, img(inline SVG), scenario, qa.
// ============================================================================

const pick = (o, l) => (o ? o[l] || o.en || o.vi : "");

// authored-block constructors
const P = (vi, en) => ({ t: "p", vi, en });
const H = (vi, en) => ({ t: "h", vi, en });
const UL = (vi, en) => ({ t: "ul", vi, en });
const CODE = (lang, code) => ({ t: "code", lang, code });
const NOTE = (vi, en) => ({ t: "note", vi, en });
const TIP = (vi, en) => ({ t: "tip", vi, en });
const WARN = (vi, en) => ({ t: "warn", vi, en });
const IMG = (svg, capVi, capEn) => ({ t: "img", svg, cap: { vi: capVi, en: capEn } });
const SCEN = (tVi, tEn, bVi, bEn) => ({ t: "scenario", title: { vi: tVi, en: tEn }, body: { vi: bVi, en: bEn } });
const QA = (qVi, qEn, aVi, aEn) => ({ t: "qa", q: { vi: qVi, en: qEn }, a: { vi: aVi, en: aEn } });

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

// ---------- illustrations (inline SVG) ----------
const svgArch = `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="260" rx="14" fill="#f8fafc"/>
<rect x="40" y="30" width="220" height="60" rx="10" fill="#1a72f5"/>
<text x="150" y="58" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">Test của bạn</text>
<text x="150" y="78" fill="#dbeafe" font-size="12" text-anchor="middle">JS / TS · Python · Java · .NET</text>
<rect x="300" y="30" width="150" height="60" rx="10" fill="#0f172a"/>
<text x="375" y="66" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">Playwright</text>
<path d="M260 60 H300" stroke="#94a3b8" stroke-width="2" marker-end="url(#a)"/>
<defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#94a3b8"/></marker></defs>
<g>
<rect x="500" y="20" width="180" height="45" rx="8" fill="#e2e8f0"/><text x="590" y="47" text-anchor="middle" font-size="13" font-weight="600" fill="#0f172a">Chromium</text>
<rect x="500" y="75" width="180" height="45" rx="8" fill="#e2e8f0"/><text x="590" y="102" text-anchor="middle" font-size="13" font-weight="600" fill="#0f172a">Firefox</text>
<rect x="500" y="130" width="180" height="45" rx="8" fill="#e2e8f0"/><text x="590" y="157" text-anchor="middle" font-size="13" font-weight="600" fill="#0f172a">WebKit (Safari)</text>
</g>
<path d="M450 60 H500" stroke="#94a3b8" stroke-width="2"/><path d="M450 60 C480 60 480 97 500 97" fill="none" stroke="#94a3b8" stroke-width="2"/><path d="M450 60 C485 60 485 152 500 152" fill="none" stroke="#94a3b8" stroke-width="2"/>
<text x="40" y="150" font-size="13" fill="#334155">Một API — chạy được trên cả 3 engine trình duyệt, đa nền tảng, đa ngôn ngữ.</text>
<text x="40" y="172" font-size="13" fill="#334155">One API — runs on all 3 browser engines, cross-platform, multi-language.</text>
</svg>`;

const svgBrowser = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#e2e8f0"/>
<rect x="30" y="24" width="660" height="290" rx="12" fill="#fff" stroke="#cbd5e1"/>
<rect x="30" y="24" width="660" height="40" rx="12" fill="#f1f5f9"/>
<circle cx="52" cy="44" r="6" fill="#f87171"/><circle cx="72" cy="44" r="6" fill="#fbbf24"/><circle cx="92" cy="44" r="6" fill="#34d399"/>
<rect x="120" y="34" width="540" height="20" rx="10" fill="#fff" stroke="#e2e8f0"/><text x="132" y="48" font-size="12" fill="#64748b">https://shop.example.com/login</text>
<text x="60" y="110" font-size="20" font-weight="800" fill="#0f172a">Đăng nhập</text>
<rect x="60" y="130" width="360" height="38" rx="8" fill="#fff" stroke="#94a3b8"/><text x="74" y="154" font-size="13" fill="#334155">demo@site.com</text>
<rect x="60" y="180" width="360" height="38" rx="8" fill="#fff" stroke="#2f90ff" stroke-width="2"/><text x="74" y="204" font-size="13" fill="#334155">•••••••• ⌨ đang gõ…</text>
<rect x="60" y="234" width="150" height="42" rx="8" fill="#1a72f5"/><text x="135" y="261" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">Sign in</text>
<g><circle cx="470" cy="150" r="26" fill="#dcfce7"/><path d="M458 150 l8 9 l16 -20" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<text x="510" y="146" font-size="13" fill="#16a34a" font-weight="700">auto-wait: chờ nút</text>
<text x="510" y="164" font-size="13" fill="#16a34a" font-weight="700">sẵn sàng rồi mới click</text>
</svg>`;

const svgLocator = `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="250" rx="14" fill="#f8fafc"/>
<text x="30" y="36" font-size="15" font-weight="800" fill="#0f172a">Ưu tiên locator (bền → giòn) / Locator priority (robust → brittle)</text>
<rect x="30" y="52" width="660" height="34" rx="8" fill="#dcfce7"/><text x="44" y="74" font-size="13" fill="#166534" font-weight="700">getByRole('button', { name: 'Sign in' })   ✔ bền nhất</text>
<rect x="30" y="92" width="660" height="34" rx="8" fill="#dcfce7"/><text x="44" y="114" font-size="13" fill="#166534" font-weight="700">getByTestId('login-submit')   ✔ ổn định</text>
<rect x="30" y="132" width="660" height="34" rx="8" fill="#fef9c3"/><text x="44" y="154" font-size="13" fill="#854d0e" font-weight="700">getByText('Sign in')   ~ phụ thuộc nội dung</text>
<rect x="30" y="172" width="660" height="34" rx="8" fill="#fee2e2"/><text x="44" y="194" font-size="13" fill="#991b1b" font-weight="700">.locator('div.btn-3xk9 > span:nth-child(2)')   ✗ dễ vỡ</text>
</svg>`;

const svgPipeline = `<svg viewBox="0 0 720 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="180" rx="14" fill="#0f172a"/>
<text x="30" y="34" font-size="14" font-weight="800" fill="#e2e8f0">CI Pipeline (GitHub Actions)</text>
<g font-size="12" font-weight="700" text-anchor="middle">
<rect x="24" y="60" width="120" height="46" rx="8" fill="#1e293b"/><text x="84" y="88" fill="#93c5fd">Checkout</text>
<rect x="164" y="60" width="120" height="46" rx="8" fill="#1e293b"/><text x="224" y="82" fill="#93c5fd">Install</text><text x="224" y="98" fill="#64748b" font-size="10">npm ci + browsers</text>
<rect x="304" y="36" width="120" height="34" rx="8" fill="#1e293b"/><text x="364" y="58" fill="#86efac">Shard 1</text>
<rect x="304" y="76" width="120" height="34" rx="8" fill="#1e293b"/><text x="364" y="98" fill="#86efac">Shard 2</text>
<rect x="304" y="116" width="120" height="34" rx="8" fill="#1e293b"/><text x="364" y="138" fill="#86efac">Shard 3/4</text>
<rect x="470" y="60" width="120" height="46" rx="8" fill="#1e293b"/><text x="530" y="82" fill="#fda4af">Report</text><text x="530" y="98" fill="#64748b" font-size="10">HTML + trace</text>
<rect x="610" y="60" width="86" height="46" rx="8" fill="#166534"/><text x="653" y="88" fill="#dcfce7">✓ Merge</text>
</g>
<g stroke="#475569" stroke-width="2"><path d="M144 83 H164"/><path d="M284 83 C294 83 294 53 304 53"/><path d="M284 83 H304"/><path d="M284 83 C294 83 294 133 304 133"/><path d="M424 83 H470"/><path d="M590 83 H610"/></g>
</svg>`;

// ---------- sections ----------
const sections = [
  {
    h: ["Playwright là gì và vì sao nó đang thống trị E2E", "What is Playwright and why it dominates E2E"],
    blocks: [
      P("Playwright là framework kiểm thử end-to-end mã nguồn mở của Microsoft, ra đời để giải quyết những điểm đau kinh điển của Selenium: test giòn (flaky), phải tự viết wait, và khó debug. Nó điều khiển 3 engine trình duyệt (Chromium, Firefox, WebKit) qua một API duy nhất, hỗ trợ JavaScript/TypeScript, Python, Java và .NET.",
        "Playwright is Microsoft's open-source end-to-end testing framework, built to fix Selenium's classic pain points: flaky tests, manual waits, and hard debugging. It drives 3 browser engines (Chromium, Firefox, WebKit) through one API, supporting JavaScript/TypeScript, Python, Java and .NET."),
      IMG(svgArch, "Kiến trúc: test của bạn → Playwright → 3 engine trình duyệt.", "Architecture: your test → Playwright → 3 browser engines."),
      H("Ba siêu năng lực khiến Playwright khác biệt", "Three superpowers that set Playwright apart"),
      UL(
        ["Auto-wait: tự chờ element hiển thị, bật được, ổn định rồi mới thao tác — gần như xoá bỏ flaky do timing.",
         "Trace viewer: ghi lại từng bước kèm ảnh + DOM + network để xem lại như video khi test fail.",
         "Web-first assertions: expect(locator) tự retry đến khi điều kiện đúng hoặc hết timeout."],
        ["Auto-wait: waits for an element to be visible, enabled and stable before acting — nearly eliminating timing flakiness.",
         "Trace viewer: records each step with screenshots + DOM + network to replay failures like a video.",
         "Web-first assertions: expect(locator) auto-retries until the condition holds or times out."]),
      NOTE("Trong bài này bạn sẽ đi từ cài đặt → viết test → locator → tình huống thực tế của một sàn thương mại điện tử → CI → chống flaky → câu hỏi phỏng vấn. Có code JS, Python và Java ở các phần cốt lõi.",
        "In this guide you'll go from install → first test → locators → a real e-commerce scenario → CI → anti-flaky → interview questions. Core parts include JS, Python and Java code."),
    ],
  },
  {
    h: ["Cài đặt & viết test đầu tiên", "Install & write your first test"],
    blocks: [
      P("Chỉ một lệnh để khởi tạo dự án kèm cấu hình, ví dụ và GitHub Actions:", "One command scaffolds the project with config, examples and GitHub Actions:"),
      CODE("bash", "# JavaScript / TypeScript\nnpm init playwright@latest\n\n# Python\npip install pytest-playwright && playwright install\n\n# Java (Maven): thêm dependency com.microsoft.playwright"),
      P("Test đầu tiên — đăng nhập và kiểm tra vào được Dashboard. Nhờ auto-wait, KHÔNG cần sleep:", "First test — log in and verify the Dashboard. Thanks to auto-wait, NO sleeps needed:"),
      CODE("javascript", "import { test, expect } from '@playwright/test';\n\ntest('user can log in', async ({ page }) => {\n  await page.goto('https://shop.example.com/login');\n  await page.getByLabel('Email').fill('demo@site.com');\n  await page.getByLabel('Password').fill('secret');\n  await page.getByRole('button', { name: 'Sign in' }).click();\n  // web-first assertion: tự chờ & retry\n  await expect(page.getByText('Dashboard')).toBeVisible();\n});"),
      CODE("python", "from playwright.sync_api import Page, expect\n\ndef test_user_can_log_in(page: Page):\n    page.goto('https://shop.example.com/login')\n    page.get_by_label('Email').fill('demo@site.com')\n    page.get_by_label('Password').fill('secret')\n    page.get_by_role('button', name='Sign in').click()\n    expect(page.get_by_text('Dashboard')).to_be_visible()"),
      IMG(svgBrowser, "Playwright tự chờ nút 'Sign in' sẵn sàng rồi mới click — không cần sleep.", "Playwright auto-waits until 'Sign in' is ready before clicking — no sleeps."),
      TIP("Chạy `npx playwright test --ui` để mở chế độ UI Mode: xem test chạy, tua lại từng bước, sửa nhanh.", "Run `npx playwright test --ui` to open UI Mode: watch tests run, step back and forth, iterate fast."),
    ],
  },
  {
    h: ["Locators — chọn phần tử sao cho bền", "Locators — selecting elements that don't break"],
    blocks: [
      P("90% test giòn đến từ locator kém. Nguyên tắc vàng: chọn phần tử theo cách người dùng nhìn thấy (vai trò, nhãn, text) thay vì theo cấu trúc CSS/HTML dễ đổi.",
        "90% of flaky tests come from poor locators. Golden rule: select elements the way a user perceives them (role, label, text) rather than by fragile CSS/HTML structure."),
      IMG(svgLocator, "Thứ tự ưu tiên locator từ bền nhất đến dễ vỡ nhất.", "Locator priority from most robust to most brittle."),
      CODE("javascript", "// ✔ Bền: theo vai trò/nhãn/testid\npage.getByRole('button', { name: 'Add to cart' });\npage.getByLabel('Search');\npage.getByTestId('product-42');\n\n// ✗ Tránh: CSS sinh tự động, XPath dài\npage.locator('div.sc-1x9k > button.btn-3xk9');"),
      WARN("Đừng dùng class CSS do framework sinh (kiểu 'sc-1x9k') — chúng đổi mỗi lần build. Hãy xin dev thêm thuộc tính data-testid ổn định.",
        "Never rely on framework-generated CSS classes (like 'sc-1x9k') — they change every build. Ask devs to add stable data-testid attributes."),
    ],
  },
  {
    h: ["Tình huống thực tế: kiểm thử luồng thanh toán sàn TMĐT", "Real scenario: testing an e-commerce checkout flow"],
    blocks: [
      SCEN("Bối cảnh doanh nghiệp", "Business context",
        "Bạn là QA của một sàn thương mại điện tử (kiểu Shopee/Tiki). Đội dev vừa đổi luồng thanh toán. Yêu cầu: tự động hoá kịch bản 'khách mua 1 sản phẩm, áp mã giảm giá, thanh toán COD' và chạy mỗi lần deploy để chặn lỗi rớt doanh thu.",
        "You are QA at an e-commerce marketplace (Shopee/Tiki-style). The dev team just changed checkout. Task: automate 'customer buys 1 item, applies a coupon, pays by COD' and run it on every deploy to prevent revenue-losing bugs."),
      H("Bước 1 — Phân rã luồng thành các bước kiểm chứng", "Step 1 — Decompose the flow into verifiable steps"),
      UL(["Tìm sản phẩm → mở trang chi tiết", "Thêm vào giỏ → mở giỏ", "Áp mã giảm giá → kiểm tổng tiền giảm đúng", "Chọn COD → đặt hàng", "Kiểm màn hình 'Đặt hàng thành công' + mã đơn"],
         ["Search product → open detail", "Add to cart → open cart", "Apply coupon → verify total drops correctly", "Choose COD → place order", "Verify 'Order placed' screen + order ID"]),
      H("Bước 2 — Chuẩn bị dữ liệu qua API (nhanh & ổn định hơn UI)", "Step 2 — Set up data via API (faster & more stable than UI)"),
      P("Thay vì click qua UI để tạo sản phẩm/giỏ hàng, hãy dựng trạng thái ban đầu bằng API rồi chỉ test đúng phần thanh toán. Đây là mẹo quan trọng để test nhanh và ít vỡ.",
        "Instead of clicking through the UI to create products/cart, seed the initial state via API and test only the checkout part. This is a key trick for fast, resilient tests."),
      CODE("javascript", "test('checkout: mua 1 sản phẩm + mã giảm + COD', async ({ page, request }) => {\n  // 1) Seed giỏ hàng qua API\n  const res = await request.post('/api/cart', {\n    data: { productId: 'SKU-1001', qty: 1 },\n    headers: { Authorization: `Bearer ${process.env.TEST_TOKEN}` },\n  });\n  expect(res.ok()).toBeTruthy();\n\n  // 2) Vào trang giỏ và áp mã\n  await page.goto('/cart');\n  await page.getByTestId('coupon-input').fill('SALE10');\n  await page.getByRole('button', { name: 'Áp dụng' }).click();\n  await expect(page.getByTestId('discount')).toHaveText('-10%');\n\n  // 3) Chọn COD và đặt hàng\n  await page.getByLabel('Thanh toán khi nhận hàng (COD)').check();\n  await page.getByRole('button', { name: 'Đặt hàng' }).click();\n\n  // 4) Xác nhận thành công\n  await expect(page.getByRole('heading', { name: 'Đặt hàng thành công' })).toBeVisible();\n  await expect(page.getByTestId('order-id')).toContainText(/^DH\\d{6}/);\n});"),
      TIP("Kiểm tra tổng tiền sau giảm bằng assertion cụ thể (ví dụ -10% hoặc số tiền chính xác) — đây là nơi lỗi nghiệp vụ hay ẩn nấp.",
        "Assert the discounted total precisely (e.g. -10% or an exact amount) — this is where business bugs love to hide."),
      H("Bước 3 — Xử lý ca lỗi (mã hết hạn, hết hàng)", "Step 3 — Handle error cases (expired coupon, out of stock)"),
      P("Một QA giỏi không chỉ test happy path. Hãy giả lập phản hồi lỗi từ API để kiểm giao diện báo lỗi đúng, không cần chờ backend tạo trạng thái đó.",
        "A good QA doesn't only test the happy path. Stub error responses from the API to verify the UI shows the right error, without waiting for the backend to reach that state."),
      CODE("javascript", "test('mã giảm hết hạn hiển thị lỗi', async ({ page }) => {\n  await page.route('**/api/coupon/apply', route =>\n    route.fulfill({ status: 400, body: JSON.stringify({ error: 'COUPON_EXPIRED' }) })\n  );\n  await page.goto('/cart');\n  await page.getByTestId('coupon-input').fill('OLD2023');\n  await page.getByRole('button', { name: 'Áp dụng' }).click();\n  await expect(page.getByRole('alert')).toHaveText('Mã giảm giá đã hết hạn');\n});"),
    ],
  },
  {
    h: ["Đăng nhập một lần, tái dùng cho mọi test (storageState)", "Log in once, reuse everywhere (storageState)"],
    blocks: [
      P("Nếu mỗi test đều đăng nhập lại qua UI, bộ test sẽ chậm và dễ vỡ. Playwright cho phép đăng nhập một lần, lưu cookie/localStorage vào file, rồi tái dùng cho tất cả test.",
        "If every test logs in through the UI, the suite gets slow and brittle. Playwright lets you log in once, save cookies/localStorage to a file, then reuse it across all tests."),
      CODE("javascript", "// auth.setup.js — chạy một lần trước các test\nimport { test as setup } from '@playwright/test';\nsetup('authenticate', async ({ page }) => {\n  await page.goto('/login');\n  await page.getByLabel('Email').fill(process.env.USER);\n  await page.getByLabel('Password').fill(process.env.PASS);\n  await page.getByRole('button', { name: 'Sign in' }).click();\n  await page.context().storageState({ path: 'auth.json' });\n});\n\n// playwright.config.js\n// use: { storageState: 'auth.json' }  -> mọi test đã đăng nhập sẵn"),
      TIP("Với vai trò khác nhau (admin, khách, seller) hãy tạo nhiều file storageState và gán theo project/test.",
        "For different roles (admin, buyer, seller) create multiple storageState files and assign per project/test."),
    ],
  },
  {
    h: ["Page Object Model — chống test giòn khi UI đổi (JS · Python · Java)", "Page Object Model — resilient to UI change (JS · Python · Java)"],
    blocks: [
      P("POM đóng gói mỗi trang thành một class chứa locator + hành động. Test gọi phương thức, không đụng locator trực tiếp — khi UI đổi bạn chỉ sửa một nơi.",
        "POM wraps each page in a class holding locators + actions. Tests call methods, never touch locators directly — when UI changes you fix one place."),
      CODE("javascript", "// JavaScript\nexport class LoginPage {\n  constructor(page) { this.page = page; }\n  get email() { return this.page.getByLabel('Email'); }\n  get submit() { return this.page.getByRole('button', { name: 'Sign in' }); }\n  async login(email, pass) {\n    await this.email.fill(email);\n    await this.page.getByLabel('Password').fill(pass);\n    await this.submit.click();\n  }\n}"),
      CODE("python", "# Python\nclass LoginPage:\n    def __init__(self, page):\n        self.page = page\n        self.email = page.get_by_label('Email')\n        self.submit = page.get_by_role('button', name='Sign in')\n    def login(self, email, password):\n        self.email.fill(email)\n        self.page.get_by_label('Password').fill(password)\n        self.submit.click()"),
      CODE("java", "// Java\npublic class LoginPage {\n  private final Page page;\n  public LoginPage(Page page) { this.page = page; }\n  public void login(String email, String pass) {\n    page.getByLabel(\"Email\").fill(email);\n    page.getByLabel(\"Password\").fill(pass);\n    page.getByRole(AriaRole.BUTTON,\n      new Page.GetByRoleOptions().setName(\"Sign in\")).click();\n  }\n}"),
      WARN("Đừng nhét assertion vào page object. Page object chỉ chứa locator + hành động; assertion nằm ở tầng test để dễ đọc ý định.",
        "Don't put assertions inside page objects. Keep locators + actions there; assertions belong in the test to express intent."),
    ],
  },
  {
    h: ["Debug với Trace Viewer", "Debugging with the Trace Viewer"],
    blocks: [
      P("Khi test fail trong CI, bạn không cần tái hiện tay. Bật trace, Playwright ghi lại từng bước kèm ảnh, DOM, network và console — mở ra xem như tua video.",
        "When a test fails in CI you don't need to reproduce manually. Enable traces and Playwright records each step with screenshots, DOM, network and console — open it and replay like a video."),
      CODE("bash", "npx playwright test --trace on\n# hoặc trong config: use: { trace: 'on-first-retry' }\nnpx playwright show-trace trace.zip"),
      NOTE("Chiến lược phổ biến: `trace: 'on-first-retry'` — chỉ ghi trace khi test fail lần đầu và được retry, tiết kiệm dung lượng mà vẫn đủ để điều tra.",
        "Common strategy: `trace: 'on-first-retry'` — record a trace only when a test first fails and retries, saving space while keeping enough to investigate."),
    ],
  },
  {
    h: ["Đưa vào CI/CD & chạy song song", "Into CI/CD & parallel runs"],
    blocks: [
      P("Test chỉ tạo giá trị khi chạy tự động mỗi PR. Dưới đây là workflow GitHub Actions chạy Playwright song song bằng 4 shard và lưu report + trace làm artifact.",
        "Tests only add value when they run automatically on every PR. Below is a GitHub Actions workflow running Playwright in parallel across 4 shards, uploading report + trace as artifacts."),
      IMG(svgPipeline, "Pipeline: checkout → cài đặt → 4 shard chạy song song → report → merge.", "Pipeline: checkout → install → 4 parallel shards → report → merge."),
      CODE("yaml", "jobs:\n  e2e:\n    strategy:\n      matrix: { shard: [1, 2, 3, 4] }\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - run: npx playwright test --shard=${{ matrix.shard }}/4\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with: { name: report-${{ matrix.shard }}, path: playwright-report }"),
    ],
  },
  {
    h: ["Chống flaky — checklist thực chiến", "Anti-flaky — a battle-tested checklist"],
    blocks: [
      UL(["Không dùng sleep cứng — Playwright đã auto-wait; nếu cần, chờ theo điều kiện (toBeVisible, waitForResponse).",
          "Cô lập dữ liệu: mỗi test tự tạo & dọn dữ liệu, không dùng chung tài khoản.",
          "Không phụ thuộc thứ tự chạy giữa các test.",
          "Ổn định dữ liệu động (thời gian, quảng cáo) trước khi so sánh visual.",
          "Dùng `trace: on-first-retry` + retry có kiểm soát cho ca mạng chập chờn."],
         ["No hard sleeps — Playwright auto-waits; if needed, wait on a condition (toBeVisible, waitForResponse).",
          "Isolate data: each test creates & cleans its own data, no shared accounts.",
          "No inter-test order dependency.",
          "Stabilize dynamic data (time, ads) before visual comparison.",
          "Use `trace: on-first-retry` + controlled retries for flaky networks."]),
    ],
  },
  {
    h: ["Câu hỏi phỏng vấn thường gặp (kèm cách trả lời)", "Common interview questions (with model answers)"],
    blocks: [
      QA("Playwright khác Selenium ở điểm nào? Khi nào chọn cái nào?",
         "How does Playwright differ from Selenium? When to choose which?",
         "Playwright có auto-wait tích hợp, trace viewer, chạy nhanh & song song, và test được cả API. Selenium có hệ sinh thái/grid lâu đời và độ phủ ngôn ngữ rộng. Chọn Playwright cho dự án web mới; Selenium khi cần grid lớn/stack legacy hoặc chuẩn công ty đã dùng Selenium.",
         "Playwright has built-in auto-wait, a trace viewer, fast parallel runs, and can test APIs too. Selenium has a mature grid ecosystem and broad language coverage. Choose Playwright for greenfield web apps; Selenium for large grids/legacy stacks or when the company standard is already Selenium."),
      QA("Làm sao bạn xử lý một test hay flaky?",
         "How do you handle a frequently flaky test?",
         "Xem trace để tìm nguyên nhân (timing/dữ liệu/thứ tự), thay sleep bằng chờ điều kiện, cô lập dữ liệu, làm test độc lập, và nếu do mạng thì retry có kiểm soát. Theo dõi 'flaky rate' như một chỉ số chất lượng.",
         "Inspect the trace to find the cause (timing/data/order), replace sleeps with condition waits, isolate data, make tests independent, and use controlled retries for network issues. Track a 'flaky rate' as a quality metric."),
      QA("Bạn test luồng thanh toán phức tạp thế nào cho nhanh và ổn định?",
         "How do you test a complex checkout flow quickly and reliably?",
         "Dựng trạng thái ban đầu qua API (giỏ hàng, đăng nhập), chỉ test đúng phần thanh toán qua UI, mock các phản hồi lỗi để phủ ca ngoại lệ, và assert số tiền/mã đơn cụ thể. Đưa vào CI chạy mỗi deploy.",
         "Seed initial state via API (cart, auth), test only the checkout via UI, mock error responses to cover edge cases, and assert exact amounts/order IDs. Wire it into CI to run on each deploy."),
    ],
  },
  {
    h: ["Tóm tắt & bước tiếp theo", "Summary & next steps"],
    blocks: [
      UL(["Ưu tiên locator theo role/label/testid; tránh CSS sinh tự động.",
          "Tận dụng auto-wait & web-first assertion — bỏ sleep.",
          "Seed dữ liệu qua API, mock ca lỗi, tái dùng đăng nhập bằng storageState.",
          "Tổ chức bằng POM, đưa vào CI chạy song song, bật trace để debug.",
          "Theo dõi flaky rate và giữ test độc lập."],
         ["Prefer role/label/testid locators; avoid auto-generated CSS.",
          "Leverage auto-wait & web-first assertions — drop sleeps.",
          "Seed data via API, mock error cases, reuse login via storageState.",
          "Organize with POM, run in parallel CI, enable traces to debug.",
          "Track flaky rate and keep tests independent."]),
      NOTE("Đây là tài liệu mẫu theo định dạng mới: một trang cuộn dài, có hình minh hoạ, code đa ngôn ngữ, tình huống doanh nghiệp và câu hỏi phỏng vấn. Các tài liệu khác sẽ được nâng cấp theo cùng chuẩn này.",
        "This is the sample in the new format: one long scrollable page with illustrations, multi-language code, business scenarios and interview questions. Other docs will be upgraded to this same standard."),
    ],
  },
];

// ============================================================================
// One document = ONE focused problem (not everything crammed together).
// Each doc below is a self-contained, single-scroll article that goes from
// foundation to advanced FOR THAT ONE PROBLEM. This is the pattern we scale
// toward ~1000 docs. Each references section content by index.
// ============================================================================
function levelBadge(lvl) {
  return lvl === 1 ? "Cơ bản" : lvl === 2 ? "Trung cấp" : "Nâng cao";
}

const docDefs = [
  { slug: "pw-intro-install", level: 1, secIdx: [0, 1], cover: "🎭",
    title: { vi: "Playwright: khái niệm, cài đặt & test đầu tiên", en: "Playwright: concepts, install & first test", ja: "Playwright: concepts, install & first test" },
    summary: { vi: "Nền tảng: Playwright là gì, kiến trúc, cài đặt và viết test đăng nhập đầu tiên (JS & Python).", en: "Foundation: what Playwright is, architecture, install and your first login test (JS & Python).", ja: "Foundation: what Playwright is, install and first test." } },
  { slug: "pw-locators", level: 1, secIdx: [2], cover: "🎯",
    title: { vi: "Playwright Locators: chọn phần tử sao cho bền", en: "Playwright Locators: selecting elements that don't break", ja: "Playwright Locators" },
    summary: { vi: "Vấn đề #1 gây flaky: locator kém. Thứ tự ưu tiên role/label/testid và ví dụ nên/tránh.", en: "The #1 flaky cause: poor locators. Priority of role/label/testid with do/don't examples.", ja: "Locator best practices." } },
  { slug: "pw-checkout-scenario", level: 2, secIdx: [3], cover: "🛒",
    title: { vi: "Tình huống: kiểm thử luồng thanh toán sàn TMĐT", en: "Scenario: testing an e-commerce checkout flow", ja: "E-commerce checkout scenario" },
    summary: { vi: "Bài toán doanh nghiệp: mua hàng + mã giảm + COD. Phân rã, seed dữ liệu qua API, mock ca lỗi, assert số tiền/mã đơn.", en: "Business problem: buy + coupon + COD. Decompose, seed via API, mock error cases, assert amounts/order ID.", ja: "Checkout flow testing." } },
  { slug: "pw-auth-storagestate", level: 2, secIdx: [4], cover: "🔑",
    title: { vi: "Đăng nhập một lần, tái dùng mọi test (storageState)", en: "Log in once, reuse everywhere (storageState)", ja: "storageState auth reuse" },
    summary: { vi: "Tăng tốc & ổn định: lưu phiên đăng nhập vào file và tái dùng; xử lý đa vai trò.", en: "Faster & stable: save the session to a file and reuse it; handle multiple roles.", ja: "Reuse login state." } },
  { slug: "pw-pom", level: 2, secIdx: [5], cover: "🧱",
    title: { vi: "Page Object Model chống test giòn (JS · Python · Java)", en: "Page Object Model, resilient to UI change (JS · Python · Java)", ja: "Page Object Model" },
    summary: { vi: "Tổ chức test bền vững: tách locator/hành động thành class, sửa một nơi khi UI đổi. Code 3 ngôn ngữ.", en: "Sustainable structure: locators/actions in classes, fix one place on UI change. Code in 3 languages.", ja: "POM in 3 languages." } },
  { slug: "pw-trace-viewer", level: 2, secIdx: [6], cover: "🔍",
    title: { vi: "Debug test fail với Trace Viewer", en: "Debugging failures with the Trace Viewer", ja: "Trace Viewer debugging" },
    summary: { vi: "Điều tra fail trong CI mà không cần tái hiện tay: xem lại từng bước + DOM + network.", en: "Investigate CI failures without manual repro: replay each step + DOM + network.", ja: "Trace-based debugging." } },
  { slug: "pw-ci-parallel", level: 3, secIdx: [7], cover: "⚙️",
    title: { vi: "Đưa Playwright vào CI/CD & chạy song song", en: "Playwright in CI/CD & parallel runs", ja: "Playwright in CI/CD" },
    summary: { vi: "Chạy test mỗi PR, chia shard song song, lưu report + trace (GitHub Actions).", en: "Run on every PR, parallel shards, store report + trace (GitHub Actions).", ja: "CI sharding." } },
  { slug: "pw-anti-flaky", level: 3, secIdx: [8], cover: "🧯",
    title: { vi: "Chống flaky test — checklist thực chiến", en: "Anti-flaky tests — a battle-tested checklist", ja: "Anti-flaky checklist" },
    summary: { vi: "Nguyên nhân & cách xử lý test lúc pass lúc fail để CI đáng tin.", en: "Causes & fixes for tests that pass/fail intermittently so CI stays trustworthy.", ja: "Reduce flakiness." } },
  { slug: "pw-interview", level: 2, secIdx: [9], cover: "🎤",
    title: { vi: "Câu hỏi phỏng vấn Playwright (kèm cách trả lời)", en: "Playwright interview questions (with model answers)", ja: "Playwright interview Q&A" },
    summary: { vi: "Bộ câu hỏi hay gặp về Playwright và cách trả lời ghi điểm.", en: "Common Playwright interview questions and strong answers.", ja: "Interview Q&A." } },
];

function localizeBlocks(authored, l) {
  return authored.map((b) => localize(b, l));
}

export const PLAYWRIGHT_DOCS = docDefs.map((d) => {
  // flatten selected sections into one scrollable doc; add subheadings for multi-section docs
  const authored = [];
  d.secIdx.forEach((i, idx) => {
    const s = sections[i];
    if (d.secIdx.length > 1) authored.push(H(s.h[0], s.h[1]));
    authored.push(...s.blocks);
  });
  return {
    slug: d.slug,
    cover: d.cover,
    level: d.level,
    levelLabel: levelBadge(d.level),
    title: d.title,
    summary: d.summary,
    pages: [
      {
        heading: { vi: "", en: "", ja: "" },
        blocks: {
          vi: localizeBlocks(authored, "vi"),
          en: localizeBlocks(authored, "en"),
          ja: localizeBlocks(authored, "ja"),
        },
      },
    ],
  };
});
