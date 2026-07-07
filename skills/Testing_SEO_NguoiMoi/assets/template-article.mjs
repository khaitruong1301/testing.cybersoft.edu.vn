// template-article.mjs (BẢN NGƯỜI MỚI + SEO) — ĐÂY LÀ BÀI MẪU HOÀN CHỈNH (đạt verify-newbie).
// Dùng làm khuôn: copy sang prisma/doc_<...>.mjs rồi thay chủ đề/nội dung, GIỮ đủ thành phần.
// Đặt engine.mjs + seo-engine.mjs + newbie-engine.mjs + thumbnail.mjs cạnh nhau.
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo, slugify } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";

const primaryKeyword = "test case";
const keywords = ["test case là gì", "cách viết test case", "kiểm thử cho người mới", "học tester"];
const slug = slugify("test-case-la-gi-cach-viet-cho-nguoi-moi");

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy.",
};

const cover = makeThumb({ id: slug.slice(0, 6), domain: "edtech", kind: "beginner", label: "NGƯỜI MỚI · TEST CASE" });

// ── Hình minh hoạ (≥5): vẽ SVG đơn giản, rõ ràng, mỗi hình một nội dung ──
const svgTC = `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="220" rx="14" fill="#0f172a"/>
<text x="24" y="34" font-size="15" font-weight="800" fill="#e2e8f0">Cấu trúc 1 Test Case</text>
<g font-size="12" fill="#93c5fd">
<rect x="24" y="52" width="200" height="40" rx="8" fill="#1e293b"/><text x="36" y="76">ID + Tên ca</text>
<rect x="24" y="100" width="200" height="40" rx="8" fill="#1e293b"/><text x="36" y="124">Điều kiện đầu vào</text>
<rect x="24" y="148" width="200" height="40" rx="8" fill="#1e293b"/><text x="36" y="172">Các bước thực hiện</text>
<rect x="260" y="100" width="240" height="40" rx="8" fill="#064e3b"/><text x="272" y="124" fill="#6ee7b7">Kết quả mong đợi</text>
</g></svg>`;
const svgSteps = `<svg viewBox="0 0 720 160" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="160" rx="14" fill="#0f172a"/>
<text x="24" y="32" font-size="15" font-weight="800" fill="#e2e8f0">Quy trình viết: Chính → Biên → Lỗi</text>
<g font-size="12" fill="#e2e8f0">
<circle cx="120" cy="96" r="34" fill="#1d4ed8"/><text x="120" y="100" text-anchor="middle">Happy</text>
<circle cx="330" cy="96" r="34" fill="#7c3aed"/><text x="330" y="100" text-anchor="middle">Boundary</text>
<circle cx="540" cy="96" r="34" fill="#b91c1c"/><text x="540" y="100" text-anchor="middle">Error</text>
<path d="M158 96 h114 M368 96 h114" stroke="#64748b" stroke-width="3" marker-end="url(#a)"/></g>
<defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6z" fill="#64748b"/></marker></defs></svg>`;
const svgTable = `<svg viewBox="0 0 720 180" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="180" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Bảng test case ô đăng nhập</text>
<g font-size="11" fill="#cbd5e1">
<rect x="24" y="44" width="672" height="28" fill="#1e293b"/><text x="34" y="63">ID | Đầu vào | Kỳ vọng</text>
<text x="34" y="92">TC01 | email+mk đúng | vào trang chủ</text>
<text x="34" y="116">TC02 | mk sai | báo 'Sai thông tin'</text>
<text x="34" y="140">TC03 | email trống | nút Đăng nhập mờ</text></g></svg>`;
const svgBoundary = `<svg viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="150" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="14" font-weight="800" fill="#e2e8f0">Giá trị biên: hạn mức 1–50 triệu</text>
<line x1="80" y1="90" x2="640" y2="90" stroke="#475569" stroke-width="3"/>
<g font-size="11" fill="#e2e8f0"><circle cx="120" cy="90" r="6" fill="#b91c1c"/><text x="104" y="118">0 ✗</text>
<circle cx="200" cy="90" r="6" fill="#16a34a"/><text x="192" y="118">1 ✓</text>
<circle cx="520" cy="90" r="6" fill="#16a34a"/><text x="486" y="118">50tr ✓</text>
<circle cx="600" cy="90" r="6" fill="#b91c1c"/><text x="560" y="118">50tr+1 ✗</text></g></svg>`;
const svgNaming = `<svg viewBox="0 0 720 130" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="130" rx="14" fill="#0f172a"/>
<text x="24" y="32" font-size="14" font-weight="800" fill="#e2e8f0">Đặt tên ca: ngắn, gợi mục tiêu</text>
<text x="24" y="66" font-size="12" fill="#6ee7b7">✓ TC_Login_SaiMatKhau</text>
<text x="24" y="92" font-size="12" fill="#fca5a5">✗ test1 / kiemtra / abc</text></svg>`;

// ── FAQ (≥3) ──
const faq1 = FAQ("Test case là gì?", "What is a test case?",
  "Test case là một kịch bản kiểm thử gồm điều kiện đầu vào, các bước thực hiện và kết quả mong đợi, dùng để kiểm tra một chức năng có hoạt động đúng như yêu cầu hay không.",
  "A test case is a scenario with input conditions, steps and an expected result used to verify a function works as required.",
  "テストケースとは？", "テストケースは入力条件・手順・期待結果からなる検証シナリオです。");
const faq2 = FAQ("Người mới nên bắt đầu viết test case từ đâu?", "Where should beginners start?",
  "Bắt đầu từ luồng chính (happy path), sau đó bổ sung ca biên và ca lỗi. Mỗi test case chỉ nên kiểm đúng một mục tiêu rõ ràng để dễ tái hiện và bảo trì.",
  "Start from the happy path, then add boundary and error cases. Each test case should verify exactly one clear goal.",
  "初心者はどこから始める？", "まずハッピーパスから始め、その後境界・異常を追加します。");
const faq3 = FAQ("Học viết test case bài bản ở đâu?", "Where to learn it properly?",
  "Bạn có thể theo khóa Software Testing của CyberSoft Academy để học viết test case, thiết kế ca kiểm thử theo kỹ thuật và tiến tới automation với Selenium/Playwright.",
  "Take CyberSoft Academy's Software Testing course to learn test case writing, case-design techniques and move toward automation.",
  "体系的に学ぶには？", "CyberSoft Academyのコースで体系的に学べます。");

// ── Trắc nghiệm 4 câu ──
const quizItems = [
  mcq({ q: { vi: "Test case bắt buộc phải có thành phần nào?", en: "A test case must include?", ja: "テストケースに必須の要素は？" },
    options: [
      { vi: "Chỉ tên chức năng", en: "Only the feature name", ja: "機能名のみ" },
      { vi: "Kết quả mong đợi", en: "Expected result", ja: "期待結果" },
      { vi: "Ảnh chụp màn hình", en: "A screenshot", ja: "スクリーンショット" },
      { vi: "Số điện thoại tester", en: "Tester phone number", ja: "テスターの電話番号" },
    ], correct: 1,
    explain: { vi: "Không có kết quả mong đợi thì không thể kết luận đúng/sai — đây là phần cốt lõi của mọi test case.",
      en: "Without an expected result you cannot judge pass/fail — it is the core of every test case.",
      ja: "期待結果がないと合否を判断できません。" } }),
  mcq({ q: { vi: "Nên viết loại ca nào TRƯỚC tiên?", en: "Which case should you write first?", ja: "最初に書くべきケースは？" },
    options: [
      { vi: "Ca lỗi hiếm gặp", en: "Rare error case", ja: "まれな異常系" },
      { vi: "Happy path (luồng chính)", en: "Happy path", ja: "ハッピーパス" },
      { vi: "Ca hiệu năng", en: "Performance case", ja: "性能ケース" },
      { vi: "Ca bảo mật", en: "Security case", ja: "セキュリティケース" },
    ], correct: 1,
    explain: { vi: "Xác nhận luồng chính chạy đúng trước, sau đó mới mở rộng sang ca biên và ca lỗi.",
      en: "Confirm the main flow first, then expand to boundary and error cases.",
      ja: "まず主要フローを確認します。" } }),
  mcq({ q: { vi: "Mỗi test case nên kiểm bao nhiêu mục tiêu?", en: "How many goals per test case?", ja: "1テストケースの目的数は？" },
    options: [
      { vi: "Càng nhiều càng tốt", en: "As many as possible", ja: "多いほど良い" },
      { vi: "Đúng 1 mục tiêu rõ ràng", en: "Exactly one clear goal", ja: "明確に1つ" },
      { vi: "Không cần mục tiêu", en: "No goal needed", ja: "目的不要" },
      { vi: "Tùy tâm trạng", en: "Depends on mood", ja: "気分次第" },
    ], correct: 1,
    explain: { vi: "Một mục tiêu cho mỗi ca giúp lỗi dễ tái hiện và bộ ca dễ bảo trì về sau.",
      en: "One goal per case makes bugs reproducible and the suite maintainable.",
      ja: "1目的にすると再現・保守が容易です。" } }),
  mcq({ q: { vi: "Với ô số tiền hạn mức 1–50 triệu, giá trị nào là ca biên hợp lệ?", en: "For a 1–50M amount field, which is a valid boundary?", ja: "1〜50百万の欄で有効な境界値は？" },
    options: [
      { vi: "0", en: "0", ja: "0" },
      { vi: "50.000.001", en: "50,000,001", ja: "50,000,001" },
      { vi: "50.000.000", en: "50,000,000", ja: "50,000,000" },
      { vi: "-1", en: "-1", ja: "-1" },
    ], correct: 2,
    explain: { vi: "50 triệu là biên trên hợp lệ; 0, -1 và 50 triệu +1 đều nằm ngoài khoảng cho phép.",
      en: "50M is the valid upper boundary; 0, -1 and 50M+1 are outside the allowed range.",
      ja: "50百万が有効な上限です。" } }),
];

// ── NỘI DUNG (8 chương) ──
const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì", en: "1. TL;DR & what you'll be able to do", ja: "1. 要点とできるようになること" },
    blocks: [
      TLDR("Test case là bản mô tả cách kiểm tra một chức năng. Sau bài này bạn viết được test case rõ ràng, đủ ca chính, ca biên và ca lỗi.",
           "A test case describes how to verify a function. After this you can write clear cases covering happy, boundary and error paths.",
           "テストケースは機能の検証方法の記述です。この後、明確なケースを書けるようになります。"),
      P("Nếu bạn mới bắt đầu với nghề Tester, viết test case chính là kỹ năng đầu tiên và quan trọng nhất. Đây là thứ bạn sẽ làm mỗi ngày khi đi làm. Tin vui là nó không khó: chỉ cần một cách nghĩ có hệ thống và luyện tập đều đặn. Bài viết này đi từ con số 0, có ví dụ thật và bài trắc nghiệm ở cuối để bạn tự kiểm tra.",
        "If you are new to testing, writing test cases is the first and most important skill — something you will do every day on the job. The good news is it is not hard: you only need a systematic way of thinking and regular practice. This guide starts from zero, with real examples and a quiz at the end so you can self-check.",
        "テスター初心者にとって、テストケース作成は最初で最も重要なスキルです。難しくはなく、体系的な考え方と練習が必要です。本記事はゼロから解説し、最後にクイズがあります。"),
      IMG(svgTC, "Cấu trúc một test case: ID, đầu vào, các bước, kết quả mong đợi", "Structure of a test case: ID, input, steps, expected result", "テストケースの構造：ID・入力・手順・期待結果"),
      DEF("Test case", "một kịch bản kiểm thử gồm đầu vào, các bước và kết quả mong đợi để kiểm tra một chức năng.",
          "a scenario with inputs, steps and an expected result to verify a function.", "入力・手順・期待結果からなる検証シナリオ。"),
      P("Trong thực tế đi làm, test case là ngôn ngữ chung giữa tester, lập trình viên và quản lý dự án. Khi một lỗi được phát hiện, người ta nhìn vào test case để tái hiện lại chính xác vấn đề. Khi một chức năng được thay đổi, test case cũ giúp bảo đảm những phần khác vẫn chạy đúng như trước. Vì vậy một bộ test case tốt không chỉ giúp bắt lỗi mà còn là tài sản lâu dài của cả đội.",
        "On a real job, test cases are the shared language between testers, developers and project managers. When a bug is found, people look at the test case to reproduce the exact problem. When a feature changes, old test cases help ensure other parts still work as before. So a good suite of test cases not only catches bugs but is a long-term asset for the whole team.",
        "実務では、テストケースはテスター・開発者・PMの共通言語です。バグ発見時は再現に使われ、変更時は回帰確認に役立ちます。"),
    ] },
  { heading: { vi: "2. Khái niệm nền tảng: một test case gồm những gì", en: "2. Foundation: what makes up a test case", ja: "2. 基礎：テストケースの構成要素" },
    blocks: [
      P("Hãy hình dung test case như một công thức nấu ăn: có nguyên liệu (đầu vào), có các bước làm, và có món ăn cuối cùng phải trông đúng như mong đợi. Nếu thiếu bất kỳ phần nào, người khác sẽ không thể làm theo và cũng không biết kết quả thế nào là đúng.",
        "Think of a test case like a recipe: it has ingredients (input), steps to follow, and a final dish that must look as expected. If any part is missing, others cannot follow it and cannot tell what 'correct' means.",
        "テストケースは料理のレシピのようなものです。材料（入力）・手順・完成した料理（期待結果）が必要です。"),
      P("Phần quan trọng nhất và hay bị người mới bỏ quên là kết quả mong đợi. Nó phải cụ thể và đo được, ví dụ 'hiển thị thông báo Sai thông tin đăng nhập', chứ không phải 'chạy được'. Có như vậy bạn mới khẳng định chắc chắn một lần chạy là đạt (pass) hay không đạt (fail).",
        "The most important part — often forgotten by beginners — is the expected result. It must be specific and measurable, e.g. 'shows the message Wrong login information', not 'it works'. Only then can you confidently say a run passed or failed.",
        "最も重要で初心者が忘れがちなのは期待結果です。具体的で測定可能でなければなりません。"),
      IMG(svgSteps, "Thứ tự viết ca: Happy path → Boundary → Error", "Order to write cases: Happy → Boundary → Error", "作成順：ハッピー→境界→異常"),
      DEF("Kết quả mong đợi", "trạng thái/đầu ra cụ thể mà hệ thống phải tạo ra để ca được coi là đạt.",
          "the specific state/output the system must produce for the case to pass.", "ケースが合格するために必要な具体的な出力。"),
      P("Một điều nhiều bạn mới hiểu nhầm là nghĩ mỗi chức năng chỉ cần một test case. Thực ra một ô nhập liệu đơn giản cũng có thể sinh ra hàng chục ca khác nhau, tùy vào các giá trị hợp lệ, không hợp lệ và các trường hợp đặc biệt. Kỹ năng của tester nằm ở chỗ biết chọn những ca có giá trị cao nhất thay vì viết thật nhiều ca trùng ý. Bạn sẽ học dần cách cân bằng giữa độ phủ và số lượng ca qua từng dự án.",
        "A common misunderstanding for beginners is thinking each feature needs only one test case. In fact even a simple input field can generate dozens of cases depending on valid, invalid and special values. A tester's skill lies in picking the highest-value cases rather than writing many redundant ones. You will gradually learn to balance coverage and case count across projects.",
        "初心者は1機能に1ケースと誤解しがちですが、単純な入力欄でも多数のケースが生じます。価値の高いケースを選ぶのが腕の見せどころです。"),
    ] },
  { heading: { vi: "3. Chuẩn bị: cần gì để bắt đầu", en: "3. Prepare: what you need to start", ja: "3. 準備：始めるのに必要なもの" },
    blocks: [
      P("Bạn không cần công cụ đắt tiền để bắt đầu. Một bảng tính đơn giản là đủ cho những ngày đầu, sau này khi vào dự án bạn sẽ dùng thêm công cụ quản lý test chuyên nghiệp.",
        "You don't need expensive tools to start. A simple spreadsheet is enough at first; later on a project you'll use a dedicated test management tool.",
        "高価なツールは不要です。最初は表計算ソフトで十分です。"),
      STEP(1, "Mở một bảng tính (Excel/Google Sheets) và tạo các cột: ID, Đầu vào, Các bước, Kết quả mong đợi.", "Open a spreadsheet and create columns: ID, Input, Steps, Expected result.", "表計算を開き、ID・入力・手順・期待結果の列を作る。"),
      STEP(2, "Chọn một chức năng nhỏ để tập viết, ví dụ ô đăng nhập của một ứng dụng quen thuộc.", "Pick a small feature to practice, e.g. the login field of a familiar app.", "小さな機能（例：ログイン）を選ぶ。"),
      TRY("Mở một ứng dụng bất kỳ trên máy, chọn một nút và thử viết 1 test case cho nó ngay bây giờ.", "Open any app on your device, pick a button and try writing one test case for it right now.", "任意のアプリでボタンを1つ選び、今すぐ1件書いてみよう。"),
      PITFALL("Người mới hay viết bước quá chung chung như 'kiểm tra đăng nhập' — người khác không thể làm theo được.", "Beginners often write steps too vaguely like 'check login' — others can't follow them.", "手順が「ログインを確認」のように曖昧になりがちです。"),
      IMG(svgTable, "Mẫu bảng test case cho ô đăng nhập", "A test case table template for a login field", "ログイン欄のテストケース表の例"),
      P("Trước khi viết ca đầu tiên, hãy dành vài phút quan sát chức năng như một người dùng thật: bạn có thể nhập gì, hệ thống phản hồi ra sao, và điều gì sẽ khiến nó báo lỗi. Thói quen quan sát này quan trọng hơn nhiều so với việc thuộc lòng các mẫu bảng. Càng hiểu rõ hành vi mong đợi của chức năng, bạn càng viết được những ca đúng trọng tâm và ít bỏ sót.",
        "Before writing your first case, spend a few minutes observing the feature like a real user: what can you enter, how does the system respond, and what would make it show an error. This habit of observation matters far more than memorizing table templates. The better you understand the feature's expected behavior, the more focused and complete your cases will be.",
        "最初のケースを書く前に、実際のユーザーのように機能を観察しましょう。期待される動作を理解するほど、的確なケースを書けます。"),
    ] },
  { heading: { vi: "4. Tình huống 1: kiểm ô đăng nhập", en: "4. Situation 1: testing a login field", ja: "4. シーン1：ログイン欄の検証" },
    blocks: [
      SITUATION("Bạn được giao kiểm ô đăng nhập.", "You are asked to test a login field.",
        "Ứng dụng có ô email, ô mật khẩu và nút Đăng nhập. Hãy viết bộ test case cho màn hình này.",
        "The app has an email field, a password field and a Login button. Write a set of test cases for this screen.",
        "ログイン機能を検証する。", "メール・パスワード・ログインボタンがあります。"),
      SOLVE("Chia thành ca chính, ca biên và ca lỗi — mỗi ca một mục tiêu.", "Split into happy, boundary and error cases — one goal each.", "主要・境界・異常に分ける。"),
      P("Bắt đầu với luồng chính: nhập đúng thì phải vào được. Sau đó nghĩ tới những gì có thể sai: mật khẩu sai, để trống ô, nhập sai định dạng email. Mỗi khả năng là một test case riêng với kết quả mong đợi cụ thể.",
        "Start with the main flow: correct input should log in. Then think about what can go wrong: wrong password, empty fields, invalid email format. Each possibility is its own test case with a specific expected result.",
        "まず主要フロー、次に誤入力などの異常を考えます。"),
      CODE("text", "TC01 Happy   : email đúng + mật khẩu đúng      -> vào trang chủ\nTC02 Error   : mật khẩu sai                     -> báo 'Sai thông tin'\nTC03 Boundary: email để trống                   -> nút Đăng nhập mờ (disabled)\nTC04 Error   : email sai định dạng (thieu @)    -> báo 'Email không hợp lệ'"),
      RECAP(["Một chức năng có nhiều test case", "Luôn kèm kết quả mong đợi cụ thể"], ["One feature has many cases", "Always include a concrete expected result"], ["1機能に複数ケース", "期待結果は具体的に"]),
    ] },
  { heading: { vi: "5. Tình huống 2: ô số tiền chuyển khoản", en: "5. Situation 2: a transfer amount field", ja: "5. シーン2：送金額欄" },
    blocks: [
      SITUATION("Kiểm ô nhập số tiền chuyển, hạn mức 1–50 triệu.", "Test an amount field with a 1–50M limit.",
        "Hệ thống phải chặn số âm, số 0 và số vượt hạn mức, đồng thời cho phép các giá trị trong khoảng.",
        "The system must block negatives, zero and over-limit values while allowing values within range.",
        "送金額欄（1〜50百万）の検証。", "負数・0・上限超過を防ぎ、範囲内は許可する。"),
      SOLVE("Dùng kỹ thuật phân tích giá trị biên (boundary value analysis).", "Use boundary value analysis.", "境界値分析を使う。"),
      P("Kỹ thuật giá trị biên giúp bạn không phải thử vô số con số. Thay vào đó, bạn chỉ kiểm những giá trị ngay tại và cạnh ranh giới, vì lỗi thường ẩn ở đó. Với hạn mức 1–50 triệu, các mốc cần kiểm là 0, 1, 50 triệu và 50 triệu cộng 1.",
        "Boundary value analysis saves you from trying countless numbers. Instead you test values right at and next to the limits, because bugs usually hide there. For a 1–50M range, the points to test are 0, 1, 50M and 50M+1.",
        "境界値分析により、無数の値を試さずに済みます。境界付近だけを検証します。"),
      CODE("text", "TC01: 1            -> hợp lệ\nTC02: 50000000     -> hợp lệ\nTC03: 0            -> báo lỗi 'Số tiền tối thiểu là 1'\nTC04: 50000001     -> báo lỗi 'Vượt hạn mức'"),
      IMG(svgBoundary, "Các giá trị biên cần kiểm cho hạn mức 1–50 triệu", "Boundary values to test for a 1–50M limit", "1〜50百万の境界値"),
      TRY("Tự thêm 2 ca biên nữa cho ô này (gợi ý: số thập phân, ký tự chữ).", "Add two more boundary cases yourself (hint: decimals, letters).", "境界ケースを2つ追加してみよう。"),
    ] },
  { heading: { vi: "6. Lỗi hay gặp & mẹo đặt tên", en: "6. Common mistakes & naming tips", ja: "6. よくある失敗と命名のコツ" },
    blocks: [
      P("Khi mới viết, ai cũng mắc vài lỗi giống nhau. Biết trước sẽ giúp bạn tránh được và trông chuyên nghiệp hơn trong mắt đội ngũ.",
        "Everyone makes a few of the same mistakes at first. Knowing them in advance helps you avoid them and look more professional to your team.",
        "誰でも最初は同じ失敗をします。事前に知れば避けられます。"),
      PITFALL("Viết kết quả mong đợi kiểu 'chạy được' hoặc 'OK' — không đo được, không ai kiểm chứng được.", "Writing 'it works' or 'OK' as the expected result — not measurable, not verifiable.", "期待結果を「動く」「OK」と書くのは測定不可能です。"),
      TIP("Đặt tên test case ngắn và gợi mục tiêu, ví dụ TC_Login_SaiMatKhau — nhìn tên là biết ca kiểm gì.", "Name cases short and goal-hinting, e.g. TC_Login_WrongPassword — the name tells the goal.", "ケース名は短く目的を示す。"),
      IMG(svgNaming, "Ví dụ đặt tên test case tốt và chưa tốt", "Good vs. poor test case naming", "良い命名と悪い命名の例"),
      P("Ngoài đặt tên, hãy tập thói quen viết bước sao cho một người chưa từng thấy màn hình vẫn làm theo được. Mỗi bước chỉ nên chứa một hành động rõ ràng, ví dụ 'Nhập abc@test.com vào ô Email' thay vì 'điền thông tin'. Khi các bước đủ chi tiết, bất kỳ ai trong đội cũng có thể chạy lại ca của bạn và cho ra cùng một kết quả — đó chính là dấu hiệu của một test case chuyên nghiệp.",
        "Beyond naming, build the habit of writing steps so that someone who has never seen the screen can still follow them. Each step should contain one clear action, e.g. 'Enter abc@test.com into the Email field' instead of 'fill in the info'. When steps are detailed enough, anyone on the team can rerun your case and get the same result — the hallmark of a professional test case.",
        "命名だけでなく、画面を見たことがない人でも従える手順を書く習慣をつけましょう。各手順は明確な1動作にします。"),
    ] },
  { heading: { vi: "7. Câu hỏi thường gặp (FAQ)", en: "7. FAQ", ja: "7. よくある質問" },
    blocks: [ faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử API cho người mới", "API testing for beginners", "kiem-thu-api-cho-nguoi-moi"),
      INTERNAL("Selenium cho người mới", "Selenium for beginners", "selenium-cho-nguoi-moi") ] },
  QUIZ(quizItems, { no: 8 }),
  { heading: { vi: "9. Học tiếp tại CyberSoft & tổng kết", en: "9. Learn more & summary", ja: "9. まとめ" },
    blocks: [
      P("Bạn vừa viết được những test case đầu tiên và làm quen với kỹ thuật giá trị biên. Hãy luyện thêm trên nhiều chức năng khác nhau — mỗi ngày một ít — để phản xạ chia ca trở nên tự nhiên.",
        "You just wrote your first test cases and met boundary value analysis. Keep practicing on different features — a little each day — until splitting cases becomes second nature.",
        "最初のテストケースを書き、境界値分析を学びました。毎日少しずつ練習しましょう。"),
      P("Chặng đường tiếp theo của bạn là học thêm các kỹ thuật thiết kế ca như bảng quyết định, phân vùng tương đương, rồi bước sang kiểm thử tự động để chạy hàng trăm ca chỉ trong vài phút. Nếu muốn đi nhanh và có lộ trình rõ ràng cùng người hướng dẫn, một khóa học bài bản sẽ giúp bạn rút ngắn thời gian và tự tin ứng tuyển vị trí Tester. Điều quan trọng nhất lúc này là bắt tay vào làm — hãy mở một ứng dụng và viết ngay bộ test case của riêng bạn.",
        "Your next steps are learning more case-design techniques like decision tables and equivalence partitioning, then moving to automation to run hundreds of cases in minutes. If you want a clear roadmap with a mentor, a structured course will save time and give you the confidence to apply for a Tester role. The most important thing right now is to start doing — open an app and write your own set of test cases today.",
        "次は決定表や同値分割などの技法、そして自動化へ進みます。体系的なコースは時間短縮に役立ちます。まずは始めましょう。"),
      CTA(course),
    ] },
];

const seo = buildSeo({
  title: { vi: "Test case là gì? Cách viết cho người mới | CyberSoft",
    en: "What is a test case? How to write one (beginners) | CyberSoft",
    ja: "テストケースとは？初心者向けの書き方 | CyberSoft" },
  description: { vi: "Test case là gì và cách viết test case cho người mới: cấu trúc, ví dụ đăng nhập và chuyển tiền, kỹ thuật giá trị biên, trắc nghiệm và lộ trình khóa Tester CyberSoft.",
    en: "What a test case is and how beginners write one: structure, login/transfer examples, boundary analysis, a quiz and CyberSoft's Tester roadmap.",
    ja: "テストケースとは何か、初心者向けの書き方を例題とともに解説します。" },
  slug, primaryKeyword, keywords,
  image: "https://cybersoft.edu.vn/og/test-case-nguoi-moi.png",
  faqs: [faq1.faq, faq2.faq, faq3.faq],
  courses: [course],
  breadcrumbs: [
    { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
    { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
    { name: "Test case cho người mới", url: `https://cybersoft.edu.vn/tai-lieu/${slug}` },
  ],
  howTo: { name: "Cách viết test case cho người mới", steps: [
    { name: "Chuẩn bị công cụ", text: "Dùng bảng tính hoặc công cụ quản lý test với các cột ID, Đầu vào, Các bước, Kết quả mong đợi." },
    { name: "Chọn chức năng nhỏ", text: "Ví dụ ô đăng nhập của một ứng dụng quen thuộc." },
    { name: "Viết ca chính, biên, lỗi", text: "Mỗi ca một mục tiêu và một kết quả mong đợi cụ thể." },
  ] },
});

export const DOCS = [
  {
    categorySlug: "foundation-beginner",
    slug,
    cover,
    tags: tags("congnghe", "edtech", "api", "foundation", "beginner", "seo"),
    title: {
      vi: "Test case là gì? Cách viết test case cho người mới (có ví dụ & trắc nghiệm)",
      en: "What is a test case? How to write one for beginners (with examples & quiz)",
      ja: "テストケースとは？初心者向けの書き方（例題・クイズ付き）",
    },
    summary: {
      vi: "Bài nền tảng cho người mới: định nghĩa test case, cấu trúc, ví dụ đăng nhập và chuyển tiền, kỹ thuật giá trị biên, mẹo đặt tên, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
      en: "Beginner foundation: test case definition, structure, login & transfer examples, boundary analysis, naming tips, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
      ja: "初心者向け基礎：定義・構造・例題・境界値分析・FAQ・クイズ。",
    },
    seo,
    pages: buildDoc(pages),
  },
];
