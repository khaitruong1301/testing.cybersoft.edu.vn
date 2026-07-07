import { B } from "./content.mjs";

// Real Tester topics. Each becomes a multi-page article via buildPages().
// Categories mirror the 8 DOCS categories requested.

export const DOC_CATEGORIES = [
  // ============================ 1. MANUAL TESTING ============================
  {
    slug: "manual-testing",
    title: B("Tài nguyên Manual Testing", "Manual Testing Resources"),
    icon: "📝",
    topics: [
      {
        title: B("Thiết kế Test Case chuẩn công ty", "Company-grade test case design"),
        summary: B("Viết test case rõ ràng, có thể tái sử dụng và truy vết được tới requirement.",
          "Write clear, reusable, requirement-traceable test cases."),
        objective: B("Sau bài này bạn viết được test case đạt chuẩn review của team QA, gắn với requirement và dễ tự động hoá về sau.",
          "You will write test cases that pass QA team review, trace to requirements and are automation-ready."),
        objectivePoints: [
          B("Hiểu cấu trúc chuẩn: ID, tiêu đề, tiền điều kiện, bước, dữ liệu, kết quả mong đợi.",
            "Standard structure: ID, title, preconditions, steps, data, expected result."),
          B("Gắn traceability tới requirement/user story.", "Traceability to requirement/user story."),
        ],
        concept: B("Test case là mô tả một điều kiện kiểm thử cụ thể để xác minh một chức năng hoạt động đúng kỳ vọng. Test case tốt phải độc lập, có kết quả mong đợi rõ ràng và tái lập được bởi bất kỳ ai trong team.",
          "A test case describes a specific condition to verify a function behaves as expected. A good one is independent, has an unambiguous expected result and is reproducible by anyone."),
        conceptPoints: [
          B("Atomic: mỗi test case kiểm 1 mục tiêu.", "Atomic: one objective per case."),
          B("Deterministic: cùng input → cùng kết quả.", "Deterministic: same input → same result."),
          B("Có priority & severity để phân bổ thời gian test.", "Has priority & severity to allocate effort."),
        ],
        steps: [
          B("Đọc requirement/user story, xác định acceptance criteria.", "Read the requirement/user story, extract acceptance criteria."),
          B("Liệt kê các điều kiện kiểm thử (positive, negative, boundary).", "List test conditions (positive, negative, boundary)."),
          B("Áp dụng kỹ thuật thiết kế: Equivalence Partitioning, Boundary Value, Decision Table.", "Apply design techniques: Equivalence Partitioning, Boundary Value, Decision Table."),
          B("Viết bước rõ ràng + dữ liệu test + kết quả mong đợi cụ thể.", "Write clear steps + test data + concrete expected result."),
          B("Gắn ID và liên kết requirement để truy vết.", "Assign an ID and link the requirement for traceability."),
          B("Review chéo với đồng nghiệp trước khi đưa vào test suite.", "Peer-review before adding to the suite."),
        ],
        example: {
          vi: "Chức năng đăng nhập: TC_LOGIN_003 — Đăng nhập với mật khẩu sai 5 lần. Tiền điều kiện: tài khoản tồn tại. Bước: nhập đúng email, sai mật khẩu 5 lần liên tiếp. Kết quả mong đợi: tài khoản bị khoá 15 phút, hiển thị thông báo và ghi log bảo mật.",
          en: "Login feature: TC_LOGIN_003 — Sign in with wrong password 5 times. Precondition: account exists. Steps: enter correct email, wrong password 5 consecutive times. Expected: account locked 15 min, warning shown, security log written.",
        },
        pitfalls: [
          B("Bước mơ hồ kiểu 'kiểm tra hệ thống hoạt động' — không đo được.", "Vague steps like 'check the system works' — not measurable."),
          B("Thiếu kết quả mong đợi hoặc để chung chung.", "Missing or generic expected result."),
          B("Gộp nhiều mục tiêu vào một test case.", "Bundling multiple objectives into one case."),
          B("Không cập nhật khi requirement thay đổi.", "Not updating when requirements change."),
        ],
        onJob: B("Trong công ty, test case nằm trong công cụ như TestRail, Xray (Jira) hoặc Azure Test Plans. QA lead review, gắn vào test cycle, và kết quả pass/fail được báo cáo cho PM mỗi sprint.",
          "In companies, test cases live in TestRail, Xray (Jira) or Azure Test Plans. The QA lead reviews them, attaches them to a test cycle, and pass/fail is reported to the PM each sprint."),
        onJobPoints: [
          B("Đặt tên theo convention của team để dễ tìm.", "Name by team convention for searchability."),
          B("Tag theo module & mức độ rủi ro.", "Tag by module & risk level."),
        ],
        aiTip: B("Dùng AI (Claude/ChatGPT) để sinh nhanh bộ test case từ acceptance criteria, rồi bạn review và bổ sung ca biên. AI giỏi liệt kê ca negative mà con người hay quên.",
          "Use AI (Claude/ChatGPT) to draft test cases from acceptance criteria, then review and add edge cases. AI is great at listing negative cases humans forget."),
        aiPoints: [
          B("Prompt: 'Sinh test case cho form đăng ký gồm ca positive/negative/boundary theo bảng.'",
            "Prompt: 'Generate register-form test cases with positive/negative/boundary in a table.'"),
          B("Luôn kiểm chứng lại output của AI với requirement thật.", "Always validate AI output against the real requirement."),
        ],
        checklist: [
          B("Mỗi test case có ID, priority, kết quả mong đợi rõ.", "Each case has ID, priority, clear expected result."),
          B("Có ca positive, negative và boundary.", "Includes positive, negative and boundary cases."),
          B("Truy vết được tới requirement.", "Traceable to a requirement."),
        ],
      },
      {
        title: B("Kỹ thuật thiết kế: Boundary & Equivalence", "Design techniques: Boundary & Equivalence"),
        summary: B("Giảm số ca test nhưng tăng khả năng bắt lỗi bằng phân vùng tương đương và giá trị biên.",
          "Fewer cases, more defects caught via equivalence partitioning and boundary values."),
        objective: B("Nắm 2 kỹ thuật hộp đen quan trọng nhất để chọn dữ liệu test thông minh thay vì test mò.",
          "Master the two most important black-box techniques to pick smart test data instead of guessing."),
        concept: B("Equivalence Partitioning chia miền dữ liệu thành các nhóm cho kết quả tương tự — chỉ cần test một đại diện mỗi nhóm. Boundary Value Analysis tập trung vào ranh giới của các nhóm vì lỗi hay xảy ra ở biên.",
          "Equivalence Partitioning splits input domain into groups yielding similar behavior — test one representative per group. Boundary Value Analysis targets the edges of those groups because bugs cluster at boundaries."),
        steps: [
          B("Xác định miền dữ liệu hợp lệ và không hợp lệ.", "Identify valid and invalid input domains."),
          B("Chia thành các phân vùng tương đương.", "Split into equivalence partitions."),
          B("Với mỗi phân vùng, chọn 1 giá trị đại diện.", "Pick one representative per partition."),
          B("Xác định các biên: min, min-1, min+1, max, max-1, max+1.", "Identify boundaries: min, min-1, min+1, max, max-1, max+1."),
          B("Thiết kế test cho cả giá trị biên và đại diện phân vùng.", "Design tests for boundaries and partition representatives."),
        ],
        example: {
          vi: "Ô nhập tuổi cho phép 18–60. Phân vùng: <18 (không hợp lệ), 18–60 (hợp lệ), >60 (không hợp lệ). Biên cần test: 17, 18, 19, 59, 60, 61. Chỉ 6 giá trị này bắt được phần lớn lỗi off-by-one.",
          en: "An age field accepts 18–60. Partitions: <18 (invalid), 18–60 (valid), >60 (invalid). Boundaries to test: 17, 18, 19, 59, 60, 61. These 6 values catch most off-by-one bugs.",
        },
        pitfalls: [
          B("Chỉ test giá trị giữa vùng, bỏ qua biên.", "Testing only mid-range values, skipping boundaries."),
          B("Quên vùng không hợp lệ.", "Forgetting invalid partitions."),
        ],
        onJob: B("Kỹ thuật này giúp bạn giải thích với lead 'vì sao chọn đúng các giá trị này để test' — thể hiện tư duy QA, không test bừa. Rất hay được hỏi khi phỏng vấn.",
          "This lets you justify to your lead 'why these exact values' — showing QA thinking, not random testing. Frequently asked in interviews."),
        aiTip: B("Nhờ AI liệt kê phân vùng và biên cho một trường dữ liệu phức tạp (ví dụ định dạng ngày, số tiền có phân tách nghìn).",
          "Ask AI to enumerate partitions and boundaries for a complex field (e.g. date format, thousand-separated amounts)."),
        checklist: [
          B("Đã liệt kê đủ phân vùng hợp lệ + không hợp lệ.", "Listed all valid + invalid partitions."),
          B("Đã test min-1, min, max, max+1.", "Tested min-1, min, max, max+1."),
        ],
      },
      {
        title: B("Viết Bug Report khiến dev fix ngay", "Bug reports devs fix immediately"),
        summary: B("Bug report tốt = tái hiện được + đủ context + mức độ rõ ràng.",
          "A great bug report = reproducible + enough context + clear severity."),
        objective: B("Viết báo cáo lỗi mà dev đọc là hiểu và fix được, giảm ping-pong 'không tái hiện được'.",
          "Write bug reports devs understand and fix, cutting 'cannot reproduce' ping-pong."),
        concept: B("Bug report là kênh giao tiếp giữa QA và dev. Giá trị của nó nằm ở khả năng tái hiện: các bước rõ ràng, môi trường cụ thể, kết quả thực tế vs mong đợi, kèm bằng chứng (ảnh/video/log).",
          "A bug report is the QA–dev communication channel. Its value is reproducibility: clear steps, exact environment, actual vs expected, plus evidence (screenshot/video/log)."),
        steps: [
          B("Tiêu đề ngắn nêu đúng vấn đề + màn hình.", "Short title naming the problem + screen."),
          B("Môi trường: OS, trình duyệt/thiết bị, phiên bản build.", "Environment: OS, browser/device, build version."),
          B("Các bước tái hiện đánh số, tối giản.", "Numbered, minimal reproduction steps."),
          B("Kết quả thực tế vs kết quả mong đợi.", "Actual result vs expected result."),
          B("Đính kèm ảnh/video/console log/network.", "Attach screenshot/video/console log/network."),
          B("Gán severity & priority, gắn module.", "Set severity & priority, tag the module."),
        ],
        example: {
          vi: "Tiêu đề: [Checkout] Nút 'Thanh toán' không phản hồi trên Safari iOS 17. Môi trường: iPhone 13, Safari, build 2.14.0. Bước: 1) Thêm sản phẩm 2) Vào giỏ 3) Bấm Thanh toán. Thực tế: không có gì xảy ra, console báo 'undefined is not a function'. Mong đợi: chuyển sang trang thanh toán.",
          en: "Title: [Checkout] 'Pay' button unresponsive on Safari iOS 17. Env: iPhone 13, Safari, build 2.14.0. Steps: 1) Add item 2) Open cart 3) Tap Pay. Actual: nothing happens, console 'undefined is not a function'. Expected: navigate to payment page.",
        },
        pitfalls: [
          B("Tiêu đề chung chung 'lỗi thanh toán'.", "Generic title 'payment broken'."),
          B("Thiếu bước tái hiện hoặc thiếu môi trường.", "Missing repro steps or environment."),
          B("Đổ lỗi cho dev thay vì mô tả sự việc.", "Blaming the dev instead of describing facts."),
        ],
        onJob: B("Bug được quản lý trong Jira/Azure DevOps theo vòng đời: New → Open → Fixed → Retest → Closed/Reopen. QA chịu trách nhiệm verify lại sau khi dev fix.",
          "Bugs are tracked in Jira/Azure DevOps through a lifecycle: New → Open → Fixed → Retest → Closed/Reopen. QA verifies the fix."),
        aiTip: B("Dán console log lộn xộn cho AI để nó tóm tắt nguyên nhân khả dĩ và gợi ý bước tái hiện tối giản.",
          "Paste messy console logs into AI to summarize likely cause and suggest a minimal repro."),
        checklist: [
          B("Có thể tái hiện theo đúng các bước.", "Reproducible by following the steps."),
          B("Có bằng chứng đính kèm.", "Evidence attached."),
          B("Severity/priority hợp lý.", "Reasonable severity/priority."),
        ],
      },
      {
        title: B("Kiểm thử API cơ bản với Postman", "API testing basics with Postman"),
        summary: B("Xác minh backend độc lập với UI: status code, schema, dữ liệu, hiệu năng.",
          "Verify the backend independently of the UI: status code, schema, data, performance."),
        objective: B("Biết cách test một REST API: gửi request, kiểm response, viết assertion tự động trong Postman.",
          "Learn to test a REST API: send requests, check responses, write automated assertions in Postman."),
        concept: B("API testing kiểm tra tầng logic/nghiệp vụ trực tiếp, nhanh và ổn định hơn UI. Bạn xác minh HTTP status, cấu trúc JSON (schema), giá trị dữ liệu, xử lý lỗi và thời gian phản hồi.",
          "API testing checks the business/logic layer directly — faster and more stable than UI. You verify HTTP status, JSON structure (schema), data values, error handling and response time."),
        steps: [
          B("Tạo request với method, URL, headers, body đúng.", "Create the request with correct method, URL, headers, body."),
          B("Kiểm status code (200/201/400/401/404...).", "Check status code (200/201/400/401/404...)."),
          B("Assert cấu trúc và giá trị trong response JSON.", "Assert structure and values in the JSON response."),
          B("Test ca lỗi: thiếu field, token sai, dữ liệu không hợp lệ.", "Test error cases: missing field, bad token, invalid data."),
          B("Dùng biến môi trường và collection runner để chạy hàng loạt.", "Use environment variables and collection runner to batch-run."),
        ],
        example: {
          vi: "Test API đăng nhập bằng script Postman kiểm status và token.",
          en: "Test a login API with a Postman script checking status and token.",
          code: "pm.test('status 200', () => pm.response.to.have.status(200));\npm.test('has token', () => {\n  const body = pm.response.json();\n  pm.expect(body).to.have.property('accessToken');\n  pm.expect(body.accessToken).to.be.a('string').and.not.empty;\n});",
        },
        pitfalls: [
          B("Chỉ test happy path, bỏ ca 4xx/5xx.", "Only happy path, skipping 4xx/5xx cases."),
          B("Không kiểm schema → API đổi field mà không phát hiện.", "No schema check → silent field changes slip through."),
        ],
        onJob: B("API test thường được đưa vào CI để chạy mỗi lần deploy. Bộ collection Postman có thể export và chạy bằng Newman trong pipeline.",
          "API tests are usually put into CI to run on each deploy. A Postman collection can be exported and run with Newman in the pipeline."),
        aiTip: B("Nhờ AI sinh JSON schema từ một response mẫu để bạn dùng assert, và sinh nhanh các ca lỗi.",
          "Ask AI to generate a JSON schema from a sample response for assertions, and to draft error cases."),
        checklist: [
          B("Đã kiểm status + schema + giá trị.", "Checked status + schema + values."),
          B("Có ca lỗi và ca không quyền.", "Has error and unauthorized cases."),
        ],
      },
    ],
  },

  // ============================ 2. AUTOMATION TESTING ============================
  {
    slug: "automation-testing",
    title: B("Tài nguyên Automation Testing", "Automation Testing Resources"),
    icon: "⚙️",
    topics: [
      {
        title: B("Khi nào nên & không nên tự động hoá", "When to automate (and when not to)"),
        summary: B("Tự động hoá đúng chỗ mới tiết kiệm; sai chỗ thì tốn kém và giòn.",
          "Automate the right things to save time; the wrong ones are costly and flaky."),
        objective: B("Ra quyết định tự động hoá dựa trên ROI, tần suất chạy và độ ổn định của tính năng.",
          "Decide automation based on ROI, run frequency and feature stability."),
        concept: B("Tự động hoá là một khoản đầu tư: chi phí viết + bảo trì phải nhỏ hơn lợi ích. Ưu tiên ca lặp lại nhiều, ổn định, rủi ro cao (regression, smoke, API). Tránh tự động hoá UI đang thay đổi liên tục hoặc ca chạy một lần.",
          "Automation is an investment: build + maintenance cost must be lower than the benefit. Prioritize repetitive, stable, high-risk cases (regression, smoke, API). Avoid automating rapidly-changing UI or one-off cases."),
        steps: [
          B("Đánh giá tần suất chạy của ca test.", "Assess how often the case runs."),
          B("Đánh giá độ ổn định của tính năng.", "Assess feature stability."),
          B("Ước lượng chi phí viết + bảo trì.", "Estimate build + maintenance cost."),
          B("Ưu tiên smoke/regression/API trước UI phức tạp.", "Prioritize smoke/regression/API before complex UI."),
        ],
        pitfalls: [
          B("Tự động hoá 100% — bảo trì nuốt hết thời gian.", "Automating 100% — maintenance eats all your time."),
          B("Tự động hoá màn hình chưa ổn định.", "Automating unstable screens."),
        ],
        onJob: B("Chiến lược phổ biến là 'kim tự tháp test': nhiều unit/API test, ít UI test. QA automation thường sở hữu tầng API và E2E quan trọng.",
          "A common strategy is the 'test pyramid': many unit/API tests, few UI tests. Automation QA usually owns the API and critical E2E layer."),
        aiTip: B("Dùng AI để phân loại backlog test case nào nên tự động hoá trước dựa trên mô tả.",
          "Use AI to triage which backlog cases to automate first based on their descriptions."),
        checklist: [
          B("Ca được chọn có tần suất cao & ổn định.", "Chosen cases are frequent & stable."),
          B("ROI dương sau vài sprint.", "Positive ROI after a few sprints."),
        ],
      },
      {
        title: B("Page Object Model chống test giòn", "Page Object Model against flaky tests"),
        summary: B("Tách locator và hành động ra khỏi test để dễ bảo trì khi UI đổi.",
          "Separate locators and actions from tests for easy maintenance when UI changes."),
        objective: B("Áp dụng POM để test tự động dễ đọc, tái sử dụng và ít vỡ khi giao diện thay đổi.",
          "Apply POM so automated tests are readable, reusable and resilient to UI change."),
        concept: B("Page Object Model đóng gói mỗi trang/màn hình thành một class chứa locator và phương thức hành động. Test chỉ gọi phương thức, không đụng locator trực tiếp — khi UI đổi bạn chỉ sửa 1 nơi.",
          "The Page Object Model wraps each page/screen in a class holding locators and action methods. Tests call methods, never touch locators directly — when UI changes you fix one place."),
        steps: [
          B("Tạo class cho mỗi trang với locator private.", "Create a class per page with private locators."),
          B("Viết phương thức hành động (login, addToCart...).", "Write action methods (login, addToCart...)."),
          B("Test gọi phương thức, giữ assertion ở tầng test.", "Tests call methods, keep assertions at test level."),
          B("Tránh locator giòn: ưu tiên data-testid, role.", "Avoid brittle locators: prefer data-testid, role."),
        ],
        example: {
          vi: "Ví dụ POM cho trang đăng nhập bằng Playwright.",
          en: "A login Page Object with Playwright.",
          code: "class LoginPage {\n  constructor(page) { this.page = page; }\n  email = () => this.page.getByTestId('email');\n  submit = () => this.page.getByRole('button', { name: 'Sign in' });\n  async login(email, pass) {\n    await this.email().fill(email);\n    await this.page.getByTestId('password').fill(pass);\n    await this.submit().click();\n  }\n}",
        },
        pitfalls: [
          B("Nhét assertion vào page object.", "Putting assertions inside page objects."),
          B("Dùng XPath dài, dễ vỡ.", "Using long, fragile XPath."),
        ],
        onJob: B("POM là chuẩn công nghiệp cho E2E. Khi phỏng vấn automation, gần như chắc chắn được hỏi về POM và cách chống flaky test.",
          "POM is the industry standard for E2E. In automation interviews you'll almost certainly be asked about POM and reducing flaky tests."),
        aiTip: B("Nhờ AI sinh khung page object từ HTML của trang, rồi bạn tinh chỉnh locator ổn định.",
          "Ask AI to scaffold a page object from the page HTML, then refine to stable locators."),
        checklist: [
          B("Locator tập trung trong page object.", "Locators centralized in page objects."),
          B("Ưu tiên selector ổn định (role/testid).", "Prefer stable selectors (role/testid)."),
        ],
      },
      {
        title: B("Chống flaky test & chờ đợi thông minh", "Beat flaky tests with smart waiting"),
        summary: B("Loại bỏ sleep cứng, dùng auto-wait và điều kiện rõ ràng.",
          "Remove hard sleeps, use auto-wait and explicit conditions."),
        objective: B("Hiểu nguyên nhân flaky và áp dụng kỹ thuật chờ để test ổn định trong CI.",
          "Understand flakiness causes and apply waiting techniques for CI-stable tests."),
        concept: B("Flaky test là test lúc pass lúc fail dù code không đổi — thường do timing, dữ liệu chia sẻ, hoặc phụ thuộc thứ tự. Giải pháp: chờ theo điều kiện (element visible, network idle), cô lập dữ liệu, và làm test độc lập.",
          "A flaky test passes/fails without code changes — usually timing, shared data, or order dependency. Fixes: condition-based waits (element visible, network idle), isolate data, keep tests independent."),
        steps: [
          B("Thay sleep cố định bằng chờ điều kiện.", "Replace fixed sleeps with condition waits."),
          B("Cô lập dữ liệu test cho mỗi lần chạy.", "Isolate test data per run."),
          B("Không phụ thuộc thứ tự giữa các test.", "No inter-test order dependency."),
          B("Retry có kiểm soát cho ca mạng chập chờn.", "Controlled retry for flaky network cases."),
        ],
        pitfalls: [
          B("Rải sleep(3000) khắp nơi.", "Sprinkling sleep(3000) everywhere."),
          B("Dùng chung tài khoản khiến test giẫm chân nhau.", "Sharing an account so tests collide."),
        ],
        onJob: B("Đội ngũ đo 'tỉ lệ flaky' như một chỉ số chất lượng của bộ test. Test giòn làm mất niềm tin vào CI và bị bỏ qua.",
          "Teams track a 'flaky rate' as a suite health metric. Flaky tests erode trust in CI and get ignored."),
        aiTip: B("Đưa log CI fail ngắt quãng cho AI phân tích xem là do timing, dữ liệu hay môi trường.",
          "Give intermittent CI failure logs to AI to classify timing vs data vs environment causes."),
        checklist: [
          B("Không còn sleep cứng.", "No hard sleeps remain."),
          B("Mỗi test tự tạo & dọn dữ liệu.", "Each test creates & cleans its own data."),
        ],
      },
    ],
  },

  // ============================ 3. PLAYWRIGHT & MODERN TOOLS ============================
  {
    slug: "playwright-tools",
    title: B("Playwright & công cụ mới nhất", "Playwright & Latest Tools"),
    icon: "🎭",
    topics: [
      {
        title: B("Khởi động Playwright cho E2E hiện đại", "Getting started with Playwright E2E"),
        summary: B("Auto-wait, đa trình duyệt, trace viewer — vì sao Playwright đang thống trị E2E.",
          "Auto-wait, cross-browser, trace viewer — why Playwright dominates modern E2E."),
        objective: B("Cài đặt và viết test E2E đầu tiên với Playwright, hiểu điểm mạnh so với Selenium.",
          "Install and write your first Playwright E2E test, and understand its edge over Selenium."),
        concept: B("Playwright là framework E2E của Microsoft, chạy Chromium/Firefox/WebKit với auto-wait tích hợp (tự chờ element sẵn sàng), selector theo role/text, và trace viewer để debug từng bước như xem lại video có DOM.",
          "Playwright is Microsoft's E2E framework running Chromium/Firefox/WebKit with built-in auto-wait, role/text selectors, and a trace viewer that replays each step with the DOM."),
        steps: [
          B("npm init playwright@latest để khởi tạo dự án.", "npm init playwright@latest to scaffold the project."),
          B("Dùng locator theo role/label/testid thay vì CSS mong manh.", "Use role/label/testid locators over fragile CSS."),
          B("Viết assertion web-first (expect(locator).toBeVisible()).", "Write web-first assertions (expect(locator).toBeVisible())."),
          B("Bật trace để debug: --trace on.", "Enable trace to debug: --trace on."),
          B("Chạy song song và chia shard trong CI.", "Run in parallel and shard in CI."),
        ],
        example: {
          vi: "Test E2E đăng nhập với auto-wait, không cần sleep.",
          en: "A login E2E test with auto-wait, no sleeps.",
          code: "import { test, expect } from '@playwright/test';\ntest('user can log in', async ({ page }) => {\n  await page.goto('/login');\n  await page.getByLabel('Email').fill('demo@site.com');\n  await page.getByLabel('Password').fill('secret');\n  await page.getByRole('button', { name: 'Sign in' }).click();\n  await expect(page.getByText('Dashboard')).toBeVisible();\n});",
        },
        pitfalls: [
          B("Vẫn dùng sleep dù Playwright đã auto-wait.", "Still using sleeps though Playwright auto-waits."),
          B("Selector theo class CSS sinh tự động.", "Selectors based on auto-generated CSS classes."),
        ],
        onJob: B("Playwright ngày càng thay Selenium trong dự án mới nhờ tốc độ và trace viewer. Nhà tuyển dụng 2025 hỏi nhiều về Playwright, fixtures và chạy CI.",
          "Playwright increasingly replaces Selenium in new projects thanks to speed and the trace viewer. 2025 employers ask a lot about Playwright, fixtures and CI runs."),
        aiTip: B("Playwright có codegen; kết hợp AI để refactor code ghi lại thành page object sạch.",
          "Playwright has codegen; pair it with AI to refactor recorded code into clean page objects."),
        checklist: [
          B("Dùng locator ổn định + web-first assertion.", "Stable locators + web-first assertions."),
          B("Bật trace khi CI fail.", "Trace enabled on CI failure."),
        ],
      },
      {
        title: B("Playwright trong CI/CD với GitHub Actions", "Playwright in CI/CD with GitHub Actions"),
        summary: B("Chạy test tự động mỗi PR, chia shard, lưu trace & report.",
          "Run tests on every PR, shard them, store traces & reports."),
        objective: B("Thiết lập pipeline chạy Playwright tự động, song song và có báo cáo khi có PR.",
          "Set up a pipeline running Playwright automatically, in parallel, with reports on each PR."),
        concept: B("CI chạy test tự động để chặn lỗi trước khi merge. Playwright hỗ trợ sharding (chia test cho nhiều máy), retry, và HTML report + trace để điều tra khi fail.",
          "CI runs tests automatically to block bugs before merge. Playwright supports sharding (splitting tests across machines), retries, and an HTML report + trace to investigate failures."),
        steps: [
          B("Tạo workflow .github/workflows/e2e.yml.", "Create .github/workflows/e2e.yml."),
          B("Cài browser: npx playwright install --with-deps.", "Install browsers: npx playwright install --with-deps."),
          B("Chạy với --shard để song song.", "Run with --shard for parallelism."),
          B("Upload HTML report & trace làm artifact.", "Upload HTML report & trace as artifacts."),
        ],
        example: {
          vi: "Trích đoạn workflow chạy Playwright trên mỗi push/PR.",
          en: "A workflow snippet running Playwright on each push/PR.",
          code: "- uses: actions/checkout@v4\n- uses: actions/setup-node@v4\n  with: { node-version: 20 }\n- run: npm ci\n- run: npx playwright install --with-deps\n- run: npx playwright test --shard=${{ matrix.shard }}/4\n- uses: actions/upload-artifact@v4\n  if: always()\n  with: { name: report, path: playwright-report }",
        },
        onJob: B("Biết đưa test vào CI là kỹ năng phân biệt QA automation 'thực chiến' với người chỉ viết test trên máy cá nhân.",
          "Knowing how to wire tests into CI separates a real-world automation QA from someone who only runs tests locally."),
        aiTip: B("Nhờ AI viết file YAML workflow và giải thích từng dòng để bạn tùy biến.",
          "Ask AI to write the workflow YAML and explain each line so you can customize it."),
        checklist: [
          B("Test chạy tự động trên mỗi PR.", "Tests run automatically on each PR."),
          B("Có report & trace khi fail.", "Reports & traces available on failure."),
        ],
      },
    ],
  },

  // ============================ 4. AI IN TESTING ============================
  {
    slug: "ai-in-testing",
    title: B("AI trong Testing mới nhất", "Latest AI in Testing"),
    icon: "🤖",
    topics: [
      {
        title: B("Dùng AI sinh test case & dữ liệu test", "Use AI to generate test cases & data"),
        summary: B("Tăng tốc thiết kế test và tạo dữ liệu biên đa dạng bằng LLM.",
          "Speed up test design and create diverse edge data with LLMs."),
        objective: B("Biết prompt hiệu quả để AI hỗ trợ thiết kế test, đồng thời kiểm soát chất lượng đầu ra.",
          "Learn effective prompts for AI-assisted test design while controlling output quality."),
        concept: B("LLM giỏi liệt kê ca test (đặc biệt ca negative/biên) và sinh dữ liệu giả thực tế. Nhưng AI có thể 'ảo giác' — bạn phải kiểm chứng với requirement thật và không đưa dữ liệu nhạy cảm thật vào prompt.",
          "LLMs excel at enumerating cases (especially negative/edge) and generating realistic fake data. But AI can hallucinate — validate against real requirements and never paste real sensitive data into prompts."),
        steps: [
          B("Cung cấp acceptance criteria rõ ràng cho AI.", "Give the AI clear acceptance criteria."),
          B("Yêu cầu output dạng bảng (positive/negative/boundary).", "Ask for a table (positive/negative/boundary)."),
          B("Nhờ AI sinh dữ liệu test đa dạng, ẩn danh.", "Ask for diverse, anonymized test data."),
          B("Review & bổ sung ca domain-specific mà AI thiếu.", "Review & add domain-specific cases AI missed."),
        ],
        pitfalls: [
          B("Tin tuyệt đối output AI mà không kiểm chứng.", "Blindly trusting AI output without validation."),
          B("Đưa PII/khóa bí mật vào prompt.", "Pasting PII/secrets into prompts."),
        ],
        onJob: B("Các đội QA 2025 xem 'AI-assisted testing' là kỹ năng mặc định. Người tận dụng AI làm nhanh gấp 2–3 lần phần thiết kế và tài liệu.",
          "2025 QA teams treat 'AI-assisted testing' as a default skill. Those who leverage AI are 2–3x faster on design and documentation."),
        aiTip: B("Tạo prompt mẫu tái sử dụng cho team: input requirement → output bảng test case chuẩn của công ty.",
          "Create a reusable team prompt: requirement in → company-standard test-case table out."),
        checklist: [
          B("Đã kiểm chứng output với requirement.", "Validated output against requirements."),
          B("Không lộ dữ liệu nhạy cảm.", "No sensitive data leaked."),
        ],
      },
      {
        title: B("Self-healing & visual testing bằng AI", "AI self-healing & visual testing"),
        summary: B("AI tự sửa locator hỏng và phát hiện lỗi giao diện bằng so sánh hình ảnh.",
          "AI auto-repairs broken locators and catches UI defects via visual diffing."),
        objective: B("Hiểu công cụ AI hiện đại giúp giảm bảo trì và bắt lỗi giao diện mà assertion thường bỏ sót.",
          "Understand modern AI tools that cut maintenance and catch UI defects functional assertions miss."),
        concept: B("Self-healing dùng AI để đoán locator thay thế khi UI đổi, giảm test vỡ. Visual testing (Applitools, Percy, Playwright screenshots) so sánh ảnh chụp để phát hiện lệch layout, màu, chữ — thứ mà test chức năng không thấy.",
          "Self-healing uses AI to guess replacement locators when the UI changes, reducing breakage. Visual testing (Applitools, Percy, Playwright screenshots) diffs snapshots to catch layout/color/text shifts functional tests can't see."),
        steps: [
          B("Chọn baseline ảnh cho các màn hình quan trọng.", "Pick image baselines for key screens."),
          B("Chạy so sánh visual trong CI, đánh dấu khác biệt.", "Run visual diffs in CI, flag differences."),
          B("Duyệt thủ công khác biệt hợp lệ (cập nhật baseline).", "Manually approve valid changes (update baseline)."),
        ],
        pitfalls: [
          B("Baseline nhiễu do dữ liệu động (giờ, quảng cáo).", "Noisy baselines from dynamic data (time, ads)."),
          B("Tin self-healing tuyệt đối, bỏ review.", "Trusting self-healing blindly, skipping review."),
        ],
        onJob: B("Nhiều công ty dùng Applitools/Percy cho sản phẩm chú trọng thương hiệu. Biết visual testing là điểm cộng khi phỏng vấn.",
          "Many brand-sensitive products use Applitools/Percy. Knowing visual testing is a plus in interviews."),
        aiTip: B("Dùng AI để lọc 'diff nhiễu' và tóm tắt vùng thay đổi đáng chú ý trên ảnh.",
          "Use AI to filter 'noisy diffs' and summarize the notable changed regions."),
        checklist: [
          B("Đã ổn định dữ liệu động trước khi chụp.", "Stabilized dynamic data before snapshots."),
          B("Quy trình duyệt baseline rõ ràng.", "Clear baseline approval process."),
        ],
      },
    ],
  },

  // ============================ 5. AI AGENTS IN TESTING ============================
  {
    slug: "ai-agent-testing",
    title: B("AI Agent trong Testing", "AI Agents in Testing"),
    icon: "🕹️",
    topics: [
      {
        title: B("AI Agent tự khám phá & test ứng dụng", "AI agents that explore & test apps"),
        summary: B("Agent tự điều hướng app, sinh và chạy test, báo cáo lỗi — có giám sát của con người.",
          "Agents navigate the app, generate and run tests, report bugs — with human oversight."),
        objective: B("Hiểu agent testing là gì, khác chatbot ra sao, và vai trò con người trong vòng lặp.",
          "Understand what agentic testing is, how it differs from a chatbot, and the human-in-the-loop role."),
        concept: B("AI agent là hệ thống có thể lập kế hoạch và hành động nhiều bước với công cụ (trình duyệt, API, shell). Trong testing, agent tự khám phá luồng, đề xuất ca test, thực thi và tự đánh giá kết quả — QA chuyển sang vai trò giám sát và xác nhận.",
          "An AI agent plans and takes multi-step actions with tools (browser, API, shell). In testing, an agent explores flows, proposes cases, executes and self-evaluates — QA shifts to supervising and validating."),
        steps: [
          B("Xác định phạm vi & ranh giới an toàn cho agent.", "Define scope & safety boundaries for the agent."),
          B("Cấp công cụ (browser/API) và quyền hạn tối thiểu.", "Grant tools (browser/API) with least privilege."),
          B("Cho agent khám phá và đề xuất ca test.", "Let the agent explore and propose cases."),
          B("Con người review, giữ ca giá trị, loại nhiễu.", "Humans review, keep valuable cases, drop noise."),
        ],
        pitfalls: [
          B("Để agent chạy trên môi trường production.", "Letting an agent run against production."),
          B("Không giới hạn hành động phá huỷ (xoá dữ liệu).", "Not limiting destructive actions (data deletion)."),
        ],
        onJob: B("Đây là xu hướng nóng nhất 2025. Nhà tuyển dụng đánh giá cao QA hiểu cách 'điều phối' agent an toàn thay vì sợ bị thay thế.",
          "This is the hottest 2025 trend. Employers value QAs who can orchestrate agents safely rather than fear replacement."),
        aiTip: B("Bắt đầu với agent trong môi trường staging cô lập, luôn có 'human-in-the-loop' phê duyệt hành động rủi ro.",
          "Start with agents in an isolated staging env, always keep a human-in-the-loop approving risky actions."),
        checklist: [
          B("Agent chạy trong môi trường cô lập.", "Agent runs in an isolated environment."),
          B("Có người xác nhận kết quả & hành động rủi ro.", "A human validates results & risky actions."),
        ],
      },
    ],
  },

  // ============================ 6. CLAUDE FOR TESTING ============================
  {
    slug: "claude-testing",
    title: B("Cấu hình Claude với Testing", "Configuring Claude for Testing"),
    icon: "🧠",
    topics: [
      {
        title: B("Thiết lập Claude làm trợ lý QA", "Set up Claude as your QA assistant"),
        summary: B("Dùng project instructions & context để Claude sinh test theo chuẩn team.",
          "Use project instructions & context so Claude produces team-standard tests."),
        objective: B("Cấu hình Claude để tạo test case, review bug và sinh script automation nhất quán với quy chuẩn công ty.",
          "Configure Claude to create test cases, review bugs and generate automation scripts consistent with company standards."),
        concept: B("Chất lượng đầu ra của Claude phụ thuộc vào context bạn cung cấp. Bằng cách nạp chuẩn viết test case, coding convention và ví dụ mẫu, Claude sẽ sinh output đúng 'gu' của team thay vì generic.",
          "Claude's output quality depends on the context you provide. By loading your test-case standard, coding conventions and sample examples, Claude produces team-flavored output instead of generic text."),
        steps: [
          B("Chuẩn bị tài liệu chuẩn: template test case, convention.", "Prepare standards: test-case template, conventions."),
          B("Nạp làm project knowledge/context cho Claude.", "Load them as project knowledge/context for Claude."),
          B("Đưa 2–3 ví dụ mẫu 'đạt chuẩn' (few-shot).", "Give 2–3 'gold standard' examples (few-shot)."),
          B("Yêu cầu output theo đúng định dạng bảng/khung.", "Request output in the exact table/format."),
        ],
        example: {
          vi: "Prompt mẫu: 'Bạn là QA của team X. Dùng template đính kèm, sinh test case cho tính năng Y gồm positive/negative/boundary, cột: ID, tiêu đề, tiền điều kiện, bước, dữ liệu, kết quả mong đợi, priority.'",
          en: "Sample prompt: 'You are QA for team X. Using the attached template, generate test cases for feature Y with positive/negative/boundary, columns: ID, title, precondition, steps, data, expected, priority.'",
        },
        onJob: B("Biết 'ngữ cảnh hoá' AI theo chuẩn công ty giúp bạn nổi bật — đây chính là kỹ năng AI-native mà nhà tuyển dụng săn tìm.",
          "Being able to 'contextualize' AI to company standards makes you stand out — the AI-native skill employers seek."),
        aiTip: B("Lưu prompt chuẩn thành thư viện dùng lại cho cả team để đảm bảo nhất quán.",
          "Save standard prompts as a reusable team library to ensure consistency."),
        checklist: [
          B("Đã nạp chuẩn & ví dụ mẫu.", "Loaded standards & sample examples."),
          B("Output khớp định dạng của team.", "Output matches the team format."),
        ],
      },
    ],
  },

  // ============================ 7. AUTOMATION THINKING ============================
  {
    slug: "automation-thinking",
    title: B("Bài luyện tư duy Automation", "Automation Thinking Drills"),
    icon: "💡",
    topics: [
      {
        title: B("Tư duy phân rã: từ luồng nghiệp vụ đến test", "Decomposition: from business flow to tests"),
        summary: B("Chia một tính năng lớn thành các đơn vị kiểm thử độc lập, tự động hoá được.",
          "Break a big feature into independent, automatable test units."),
        objective: B("Rèn tư duy chia nhỏ bài toán test — nền tảng để tự động hoá sạch và bảo trì thấp.",
          "Train decomposition thinking — the foundation for clean, low-maintenance automation."),
        concept: B("Automation tốt bắt đầu từ tư duy tốt: xác định các đơn vị hành vi độc lập, tách setup/teardown, và thiết kế test không phụ thuộc lẫn nhau. Tư duy này quan trọng hơn cú pháp của bất kỳ framework nào.",
          "Good automation starts with good thinking: identify independent behavior units, separate setup/teardown, and design tests that don't depend on each other. This matters more than any framework's syntax."),
        steps: [
          B("Vẽ luồng nghiệp vụ end-to-end.", "Diagram the end-to-end business flow."),
          B("Tách thành các bước có thể kiểm độc lập.", "Split into independently verifiable steps."),
          B("Xác định dữ liệu & trạng thái cần cho mỗi bước.", "Identify data & state each step needs."),
          B("Thiết kế test cô lập, có setup riêng.", "Design isolated tests with own setup."),
        ],
        onJob: B("Khi phỏng vấn, bài toán 'hãy test tính năng này' thực chất kiểm tra tư duy phân rã của bạn, không phải cú pháp.",
          "In interviews, 'test this feature' really probes your decomposition thinking, not syntax."),
        aiTip: B("Dùng AI như bạn ghép cặp (pair): trình bày cách bạn phân rã, nhờ nó phản biện các ca bạn bỏ sót.",
          "Use AI as a pair: explain your decomposition and ask it to challenge missed cases."),
        checklist: [
          B("Mỗi test kiểm 1 hành vi độc lập.", "Each test verifies one independent behavior."),
          B("Setup/teardown tách bạch.", "Setup/teardown are separated."),
        ],
      },
    ],
  },

  // ============================ 8. PERFORMANCE & API ============================
  {
    slug: "performance-api",
    title: B("Performance & API Testing", "Performance & API Testing"),
    icon: "🚀",
    topics: [
      {
        title: B("Nhập môn kiểm thử hiệu năng với k6", "Performance testing intro with k6"),
        summary: B("Đo throughput, latency và điểm gãy của hệ thống dưới tải.",
          "Measure throughput, latency and the breaking point under load."),
        objective: B("Hiểu các loại test hiệu năng và viết kịch bản load test cơ bản bằng k6.",
          "Understand performance test types and write a basic k6 load test."),
        concept: B("Performance testing xác minh hệ thống chịu tải tốt: Load test (tải kỳ vọng), Stress test (tìm điểm gãy), Spike test (tăng đột ngột), Soak test (tải kéo dài). Chỉ số quan trọng: response time (p95/p99), throughput (RPS), tỉ lệ lỗi.",
          "Performance testing verifies the system handles load: Load (expected), Stress (find the breaking point), Spike (sudden surge), Soak (sustained). Key metrics: response time (p95/p99), throughput (RPS), error rate."),
        steps: [
          B("Xác định mục tiêu: RPS, p95 latency, tỉ lệ lỗi tối đa.", "Set goals: RPS, p95 latency, max error rate."),
          B("Viết kịch bản mô phỏng hành vi người dùng thật.", "Script realistic user behavior."),
          B("Tăng dần tải (ramp-up) và quan sát chỉ số.", "Ramp up load and observe metrics."),
          B("Phân tích nút thắt: DB, CPU, kết nối.", "Analyze bottlenecks: DB, CPU, connections."),
        ],
        example: {
          vi: "Kịch bản k6 tăng dần lên 100 VUs và đặt ngưỡng p95 < 500ms.",
          en: "A k6 script ramping to 100 VUs with a p95 < 500ms threshold.",
          code: "import http from 'k6/http';\nimport { check, sleep } from 'k6';\nexport const options = {\n  stages: [{ duration: '30s', target: 100 }, { duration: '1m', target: 100 }],\n  thresholds: { http_req_duration: ['p(95)<500'] },\n};\nexport default function () {\n  const res = http.get('https://api.example.com/products');\n  check(res, { 'status 200': (r) => r.status === 200 });\n  sleep(1);\n}",
        },
        pitfalls: [
          B("Test hiệu năng trên môi trường khác production.", "Perf-testing on an env unlike production."),
          B("Chỉ nhìn trung bình, bỏ qua p95/p99.", "Only looking at averages, ignoring p95/p99."),
        ],
        onJob: B("Perf testing thường do QA có kinh nghiệm hoặc SDET đảm nhận; biết k6/JMeter là lợi thế lương cao.",
          "Perf testing is usually owned by senior QA or SDETs; knowing k6/JMeter is a high-salary advantage."),
        aiTip: B("Nhờ AI đọc kết quả k6 và chỉ ra nghi vấn nút thắt để bạn điều tra sâu.",
          "Ask AI to read k6 results and point to suspected bottlenecks for deeper investigation."),
        checklist: [
          B("Có ngưỡng p95/p99 rõ ràng.", "Clear p95/p99 thresholds."),
          B("Môi trường test gần giống production.", "Test env close to production."),
        ],
      },
    ],
  },
];
