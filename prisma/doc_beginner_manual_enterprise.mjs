// doc_beginner_manual_enterprise.mjs — 5 bài NGƯỜI MỚI (Manual Testing) hướng THỰC HÀNH DOANH NGHIỆP.
// Mỗi bài gắn với một màn hình test THẬT ở dự án lớn (ngân hàng, TMĐT, bảo hiểm, bán lẻ, ERP):
// màn hình test là gì · chiến lược · các bước test · kịch bản doanh nghiệp · công cụ/phần mềm ·
// cách GHI NHẬN & FILE REPORT. Chuẩn Testing_SEO_NguoiMoi: ≥5 hình · ≥2 tình huống · 1 quiz · SEO.
// Song ngữ Việt/English/日本語 (ja≠en), 12 chương/bài.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual testing, test design, công cụ và dự án thực chiến.",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function svg(title, rows, accent = "#38bdf8") {
  const h = 66 + rows.length * 28;
  const body = rows.map((r, i) => `<text x="26" y="${72 + i * 28}" font-size="13" fill="#cbd5e1">${esc(r)}</text>`).join("");
  return `<svg viewBox="0 0 720 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="${h}" rx="14" fill="#0f172a"/>
<rect width="720" height="8" rx="4" fill="${accent}"/>
<text x="26" y="42" font-size="15" font-weight="800" fill="#e2e8f0">${esc(title)}</text>
${body}</svg>`;
}
// Vẽ "màn hình test" mô phỏng giao diện phần mềm (ảnh chụp mô phỏng) để người mới hình dung đối tượng test.
function screen(title, fields, accent = "#60a5fa") {
  const h = 78 + fields.length * 34;
  const rows = fields.map((f, i) => `<rect x="30" y="${64 + i * 34}" width="640" height="26" rx="6" fill="#1e293b"/>
<text x="42" y="${82 + i * 34}" font-size="12" fill="#94a3b8">${esc(f)}</text>`).join("");
  return `<svg viewBox="0 0 720 ${h}" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="${h}" rx="14" fill="#0b1220"/>
<rect x="0" y="0" width="720" height="34" rx="14" fill="${accent}"/>
<circle cx="24" cy="17" r="5" fill="#0b1220"/><circle cx="42" cy="17" r="5" fill="#0b1220"/><circle cx="60" cy="17" r="5" fill="#0b1220"/>
<text x="90" y="22" font-size="13" font-weight="800" fill="#0b1220">${esc(title)}</text>
${rows}</svg>`;
}

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "beginner", label: cfg.coverLabel });
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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 1 — Test giao diện (UI testing) cho người mới · Dự án Ngân hàng số
// ══════════════════════════════════════════════════════════════════════════════════════
const e1_faq1 = FAQ(
  "Test giao diện (UI testing) là gì?", "What is UI testing?",
  "Test giao diện là kiểm tra phần nhìn và tương tác của phần mềm: bố cục, màu sắc, chữ, nút bấm, canh lề, trạng thái khi bấm, hiển thị lỗi. Mục tiêu là bảo đảm người dùng thấy đúng, đọc được và thao tác được như thiết kế.",
  "UI testing checks the look and interaction of software: layout, colors, text, buttons, alignment, states on click, error display. The goal is that users see correctly, can read and can operate it as designed.",
  "UIテスト（画面テスト）とは？",
  "UIテストはソフトの見た目と操作を検証します：レイアウト・色・文字・ボタン・整列・押下時の状態・エラー表示。利用者が設計どおり見て・読めて・操作できることを保証します。");
const e1_faq2 = FAQ(
  "Ở dự án ngân hàng, test giao diện dùng công cụ gì để ghi nhận?", "What tools record UI testing on a banking project?",
  "Thường dùng: bảng test case (TestRail/Excel) để chạy theo checklist, Chrome DevTools để đo canh lề và trạng thái, chụp màn hình hoặc quay Loom làm bằng chứng, và Jira để mở lỗi kèm ảnh. Mỗi lỗi UI đều đính kèm ảnh chụp so sánh với thiết kế (Figma).",
  "Usually: a test case sheet (TestRail/Excel) to run the checklist, Chrome DevTools to inspect alignment and states, screenshots or a Loom recording as evidence, and Jira to file bugs with images. Each UI bug attaches a screenshot compared to the design (Figma).",
  "銀行案件のUIテストで記録に使うツールは？",
  "通常：テストケース表（TestRail/Excel）、Chrome DevTools、証拠のスクショやLoom録画、画像付きでバグを起票するJiraです。各UIバグは設計（Figma）と比較したスクショを添付します。");
const e1_faq3 = FAQ(
  "Người mới nên bắt đầu test giao diện từ đâu?", "Where should beginners start with UI testing?",
  "Bắt đầu bằng một checklist UI cho một màn hình: bố cục, chữ có sai chính tả không, nút có canh đều không, trạng thái hover/disabled, thông báo lỗi hiển thị đúng chỗ. Chạy checklist trên trình duyệt thật và ghi nhận ngay khi thấy lệch so với thiết kế.",
  "Start with a UI checklist for one screen: layout, any typos, button alignment, hover/disabled states, error messages in the right place. Run it on a real browser and record any deviation from the design immediately.",
  "初心者はUIテストをどこから始める？",
  "1画面のUIチェックリストから始めます：レイアウト・誤字・ボタン整列・hover/disabled状態・エラー表示位置。実ブラウザで実行し、設計とのずれを即記録します。");

const e1_quiz = [
  mcq({
    q: { vi: "Test giao diện tập trung kiểm điều gì?", en: "What does UI testing focus on?", ja: "UIテストは何に注目する？" },
    options: [
      { vi: "Tốc độ máy chủ", en: "Server speed", ja: "サーバー速度" },
      { vi: "Phần nhìn & tương tác: bố cục, chữ, nút, trạng thái", en: "Look & interaction: layout, text, buttons, states", ja: "見た目と操作：レイアウト・文字・ボタン・状態" },
      { vi: "Cấu trúc cơ sở dữ liệu", en: "Database structure", ja: "DB構造" },
      { vi: "Số lượng lập trình viên", en: "Number of developers", ja: "開発者の人数" },
    ], correct: 1,
    explain: { vi: "UI testing kiểm phần người dùng nhìn thấy và thao tác, không phải hạ tầng bên trong.", en: "UI testing checks what users see and operate, not the internal infrastructure.", ja: "UIテストは利用者が見て操作する部分を検証します。" },
  }),
  mcq({
    q: { vi: "Bằng chứng nào nên đính kèm khi báo một lỗi giao diện?", en: "What evidence should you attach for a UI bug?", ja: "UIバグ報告に添付すべき証拠は？" },
    options: [
      { vi: "Ảnh chụp màn hình so sánh với thiết kế", en: "A screenshot compared to the design", ja: "設計と比較したスクショ" },
      { vi: "Mật khẩu quản trị", en: "The admin password", ja: "管理者パスワード" },
      { vi: "Mã nguồn toàn bộ trang", en: "The whole page source code", ja: "ページ全体のソース" },
      { vi: "Không cần gì", en: "Nothing", ja: "不要" },
    ], correct: 0,
    explain: { vi: "Ảnh chụp đối chiếu thiết kế giúp lập trình viên thấy ngay chỗ lệch.", en: "A screenshot vs the design lets developers instantly see the mismatch.", ja: "設計と比較したスクショで、ずれが即座に伝わります。" },
  }),
  mcq({
    q: { vi: "Trong dự án ngân hàng, vì sao lỗi UI ở màn hình chuyển tiền lại nhạy cảm?", en: "In banking, why is a UI bug on the transfer screen sensitive?", ja: "銀行で送金画面のUIバグが慎重を要する理由は？" },
    options: [
      { vi: "Vì màu nền xấu", en: "The background is ugly", ja: "背景が醜いから" },
      { vi: "Vì hiển thị sai số tiền/nút có thể khiến khách chuyển nhầm, mất tiền và mất niềm tin", en: "A wrong amount/button display can cause wrong transfers, losing money and trust", ja: "金額/ボタンの誤表示は誤送金・損失・信頼喪失を招くから" },
      { vi: "Vì tester thích", en: "Because testers like it", ja: "テスターが好むから" },
      { vi: "Vì không ai dùng", en: "Because nobody uses it", ja: "誰も使わないから" },
    ], correct: 1,
    explain: { vi: "Ở ngân hàng, sai sót nhỏ trên giao diện tiền bạc có thể gây hậu quả tài chính và pháp lý.", en: "In banking, small money-screen UI errors can cause financial and legal consequences.", ja: "銀行では金銭画面の小さなUIエラーが財務・法的影響を生みます。" },
  }),
  mcq({
    q: { vi: "Công cụ nào giúp kiểm tra canh lề và trạng thái nút ngay trên trình duyệt?", en: "Which tool inspects alignment and button states in the browser?", ja: "ブラウザで整列やボタン状態を確認するツールは？" },
    options: [
      { vi: "Máy tính bỏ túi", en: "A pocket calculator", ja: "電卓" },
      { vi: "Chrome DevTools", en: "Chrome DevTools", ja: "Chrome DevTools" },
      { vi: "Trình phát nhạc", en: "A music player", ja: "音楽プレーヤー" },
      { vi: "Phần mềm vẽ tranh", en: "A painting app", ja: "お絵かきソフト" },
    ], correct: 1,
    explain: { vi: "DevTools cho xem cấu trúc, khoảng cách, trạng thái hover/disabled ngay trên trang.", en: "DevTools shows structure, spacing and hover/disabled states on the page.", ja: "DevToolsは構造・余白・hover/disabled状態をページ上で確認できます。" },
  }),
];

const e1_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì trên dự án thật", en: "1. TL;DR & what you'll do on a real project", ja: "1. 要点と実案件でできること" },
    blocks: [
      TLDR("Test giao diện là kiểm phần nhìn và tương tác của phần mềm. Bài này gắn với màn hình đăng nhập & chuyển tiền của một app ngân hàng số: bạn sẽ có checklist UI, chạy test bằng trình duyệt + DevTools, ghi nhận lỗi bằng ảnh và mở ticket Jira. Cuối bài có trắc nghiệm.",
        "UI testing checks the look and interaction of software. This is tied to the login & transfer screens of a digital-banking app: you'll get a UI checklist, run tests with a browser + DevTools, record bugs with screenshots and open Jira tickets. A quiz at the end.",
        "UIテストはソフトの見た目と操作を検証します。本記事はネット銀行アプリのログイン・送金画面に沿い、UIチェックリスト・ブラウザ＋DevToolsでの実行・スクショ記録・Jira起票を学びます。最後にクイズ付き。"),
      P("Test giao diện là việc đầu tiên bạn thường được giao khi vào một dự án thật, vì nó không đòi hỏi lập trình mà vẫn bắt được nhiều lỗi khách hàng nhìn thấy ngay. Ở bài này ta không nói lý thuyết suông: ta bước vào một dự án ngân hàng số, mở đúng màn hình cần test, và làm từng bước như một tester đi làm. Bài đi từ con số 0, có hình mô phỏng màn hình, ví dụ thật và trắc nghiệm cuối bài.",
        "UI testing is often the first task you get on a real project, because it needs no coding yet catches many bugs customers see instantly. Here we skip dry theory: we step into a digital-banking project, open the exact screen to test, and work step by step like a tester on the job. It starts from zero with mock screens, real examples and a final quiz.",
        "UIテストは実案件で最初に任される作業です。コード不要でも顧客がすぐ気づくバグを多く捉えます。本記事は空理でなく、ネット銀行案件に入り、対象画面を開いて実務のように進めます。ゼロから、画面モック・実例・クイズ付きで解説します。"),
      IMG(screen("MobileBank — Đăng nhập", ["Số điện thoại / Tên đăng nhập", "Mật khẩu  •••••••", "[ Đăng nhập ]   Quên mật khẩu?", "Thông báo lỗi hiển thị tại đây"], "#38bdf8"),
        "Màn hình test: giao diện đăng nhập app ngân hàng số MobileBank", "Screen under test: the MobileBank digital-banking login UI", "テスト対象画面：ネット銀行MobileBankのログインUI"),
      DEF("Màn hình test (screen under test)", "màn hình/giao diện cụ thể mà bạn đang kiểm — ví dụ màn hình đăng nhập, màn hình chuyển tiền.",
        "the specific screen/UI you are testing — e.g. the login screen or the transfer screen.",
        "検証対象の具体的な画面 — 例：ログイン画面や送金画面。"),
    ] },
  { heading: { vi: "2. Màn hình test là gì & UI testing kiểm những gì", en: "2. What the screen under test is & what UI testing checks", ja: "2. テスト対象画面とUIテストの検証内容" },
    blocks: [
      P("Trước khi test, bạn phải trả lời: mình đang test màn hình nào và nó đáng lẽ trông ra sao? Trong dự án, câu trả lời nằm ở bản thiết kế (thường trên Figma) và tài liệu yêu cầu. Test giao diện chính là so sánh màn hình thật với bản thiết kế và yêu cầu đó.",
        "Before testing, answer: which screen am I testing and how should it look? On a project, the answer lives in the design (usually Figma) and the requirement doc. UI testing is comparing the real screen against that design and requirement.",
        "テスト前に問います：どの画面を、どうあるべきか。案件では答えは設計（通常Figma）と要件資料にあります。UIテストは実画面を設計・要件と比較することです。"),
      DEF("UI testing", "kiểm thử giao diện — kiểm phần nhìn và tương tác so với thiết kế: bố cục, chữ, màu, nút, canh lề, trạng thái.",
        "UI testing — checking the look and interaction against the design: layout, text, color, buttons, alignment, states.",
        "UIテスト — 設計と照らし見た目と操作（レイアウト・文字・色・ボタン・整列・状態）を検証すること。"),
      P("UI testing thường kiểm bốn nhóm: hiển thị (bố cục, canh lề, chữ, ảnh), nội dung (chính tả, đúng ngôn ngữ, đúng định dạng số/tiền tệ), trạng thái (bình thường, hover, được chọn, bị vô hiệu hoá), và phản hồi (bấm nút thì hiện gì, lỗi hiển thị ở đâu). Ở ngân hàng, nhóm nội dung đặc biệt quan trọng vì hiển thị sai định dạng số tiền có thể gây hiểu nhầm nghiêm trọng.",
        "UI testing usually checks four groups: display (layout, alignment, text, images), content (spelling, correct language, number/currency format), state (normal, hover, selected, disabled), and feedback (what a click shows, where errors appear). In banking, content matters especially because a wrong money format can badly mislead.",
        "UIテストは通常4群を検証：表示（レイアウト・整列・文字・画像）、内容（誤字・言語・数値/通貨形式）、状態（通常・hover・選択・無効）、反応（押下時の表示・エラー位置）。銀行では金額形式の誤りが深刻な誤解を招くため内容が特に重要です。"),
      IMG(svg("4 nhóm kiểm của test giao diện", ["Hiển thị: bố cục · canh lề · chữ · ảnh", "Nội dung: chính tả · định dạng số/tiền", "Trạng thái: normal · hover · disabled", "Phản hồi: bấm -> hiện gì · lỗi ở đâu"], "#22d3ee"),
        "Bốn nhóm nội dung cần kiểm trong test giao diện", "The four groups UI testing checks", "UIテストが検証する4つの群"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án doanh nghiệp", en: "3. Why it matters on an enterprise project", ja: "3. 企業案件で重要な理由" },
    blocks: [
      P("Ở một ngân hàng, giao diện là bộ mặt tiếp xúc hàng triệu khách hàng mỗi ngày. Một nút chuyển tiền bị lệch, một số dư hiển thị sai định dạng, một thông báo lỗi khó hiểu — tất cả đều có thể khiến khách thao tác sai, gọi tổng đài, thậm chí khiếu nại. Lỗi UI vì thế ảnh hưởng trực tiếp tới niềm tin và chi phí vận hành.",
        "At a bank, the UI is the face that meets millions of customers daily. A misaligned transfer button, a wrongly formatted balance, a confusing error — each can make customers act wrong, call support, even complain. UI bugs thus directly affect trust and operating cost.",
        "銀行ではUIは毎日数百万の顧客に接する顔です。ずれた送金ボタン・誤形式の残高・分かりにくいエラーは、誤操作・問い合わせ・苦情を招きます。UIバグは信頼と運用コストに直結します。"),
      P("Ngoài ra, các hệ thống tài chính còn phải tuân thủ quy định: cỡ chữ tối thiểu, độ tương phản cho người khiếm thị, hiển thị rõ phí và điều khoản. Người mới làm test giao diện ở ngân hàng vì thế không chỉ soi cái đẹp, mà còn góp phần giúp sản phẩm đúng luật và an toàn cho người dùng.",
        "Also, financial systems must comply with rules: minimum font size, contrast for the visually impaired, clear display of fees and terms. So a beginner doing UI testing at a bank isn't just judging looks, but helping the product be lawful and safe for users.",
        "さらに金融系は規制順守が必要です：最小文字サイズ・弱視者向けコントラスト・手数料や規約の明示。銀行でのUIテストは美しさだけでなく、製品を合法で安全にする一助です。"),
      P("Chính vì rủi ro cao, đội ngũ luôn muốn có bằng chứng rõ ràng cho mỗi lỗi UI. Đây là lúc kỹ năng ghi nhận — chụp ảnh, đối chiếu thiết kế, mô tả gọn — trở thành thứ giúp bạn được tin tưởng ngay từ những tuần đầu, dù chưa biết lập trình.",
        "Because the stakes are high, teams always want clear evidence for each UI bug. This is where recording skills — screenshots, design comparison, concise descriptions — earn you trust from the first weeks, even without coding.",
        "リスクが高いため、チームは各UIバグに明確な証拠を求めます。ここで記録力（スクショ・設計比較・簡潔な記述）が、コードなしでも最初の数週から信頼を得る力になります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: phần mềm & môi trường test", en: "4. Prepare: software & test environment", ja: "4. 準備：ソフトとテスト環境" },
    blocks: [
      P("Một tester giao diện ở dự án thật thường dùng vài phần mềm quen thuộc. Bạn không cần cài đặt phức tạp — hầu hết đều miễn phí hoặc có sẵn trong trình duyệt.",
        "A UI tester on a real project uses a few familiar tools. You don't need complex setup — most are free or built into the browser.",
        "実案件のUIテスターは身近なツールを数個使います。複雑な設定は不要で、多くは無料かブラウザ内蔵です。"),
      STEP(1, "Mở bản thiết kế (Figma) và tài liệu yêu cầu để biết màn hình 'đáng lẽ' trông ra sao.", "Open the design (Figma) and requirement doc to know how the screen 'should' look.", "設計（Figma）と要件資料を開き、画面のあるべき姿を把握。"),
      STEP(2, "Mở Chrome DevTools (F12) để kiểm canh lề, khoảng cách, cỡ chữ và trạng thái nút.", "Open Chrome DevTools (F12) to inspect alignment, spacing, font size and button states.", "Chrome DevTools（F12）で整列・余白・文字サイズ・ボタン状態を確認。"),
      STEP(3, "Chuẩn bị nơi ghi nhận: bảng test case (TestRail/Excel) và Jira để mở lỗi kèm ảnh.", "Prepare where to record: a test case sheet (TestRail/Excel) and Jira to file bugs with images.", "記録先を準備：テストケース表（TestRail/Excel）と画像付き起票のJira。"),
      TRY("Mở một trang web bạn hay dùng, bấm F12, di chuột vào một nút và xem trạng thái hover thay đổi thế nào.", "Open a site you use, press F12, hover a button and watch its hover state change.", "よく使うサイトでF12を押し、ボタンにマウスを乗せhover状態の変化を見よう。"),
      PITFALL("Test giao diện mà không mở bản thiết kế — bạn sẽ không biết thế nào là 'đúng', dễ báo nhầm hoặc bỏ sót lệch nhỏ.", "Testing UI without opening the design — you won't know what's 'correct', easily misreporting or missing small deviations.", "設計を開かずUIテストすると『正しい』が分からず、誤報告や小さなずれの見落としが起きます。"),
      IMG(screen("Bộ công cụ test giao diện", ["Figma — bản thiết kế chuẩn (so sánh)", "Chrome DevTools — đo canh lề & trạng thái", "TestRail / Excel — chạy checklist test case", "Jira — mở lỗi kèm ảnh chụp"], "#34d399"),
        "Bộ phần mềm thường dùng khi test giao diện ở dự án", "The typical software stack for UI testing on a project", "案件でUIテストに使う典型的なソフト群"),
    ] },
  { heading: { vi: "5. Chiến lược & các bước test giao diện", en: "5. Strategy & steps for UI testing", ja: "5. UIテストの戦略と手順" },
    blocks: [
      P("Chiến lược cho người mới rất đơn giản: đi từ tổng thể tới chi tiết, và luôn so với thiết kế. Trước tiên nhìn toàn màn hình xem có đúng bố cục không, rồi mới soi từng thành phần. Cách này giúp bạn không sa vào một nút mà bỏ quên cả khối bên cạnh.",
        "The strategy for beginners is simple: go from whole to detail, and always compare to the design. First look at the whole screen for correct layout, then inspect each element. This keeps you from fixating on one button while missing a whole block.",
        "初心者の戦略は単純です：全体から詳細へ、常に設計と比較。まず画面全体でレイアウトを確認し、次に各要素を精査します。1ボタンに固執し隣の塊を見落とすのを防ぎます。"),
      STEP(1, "Kiểm tổng thể: bố cục, thứ tự các khối, ảnh/logo hiển thị đúng, không vỡ khung.", "Check the whole: layout, block order, correct images/logo, no broken frame.", "全体確認：レイアウト・ブロック順・画像/ロゴ・崩れなし。"),
      STEP(2, "Kiểm nội dung: chính tả, đúng ngôn ngữ, định dạng số tiền (ví dụ 1.000.000 ₫).", "Check content: spelling, correct language, currency format (e.g. 1,000,000 ₫).", "内容確認：誤字・言語・通貨形式（例 1,000,000 ₫）。"),
      STEP(3, "Kiểm trạng thái & phản hồi: hover, disabled, bấm nút hiện gì, lỗi hiển thị đúng chỗ.", "Check states & feedback: hover, disabled, what a click shows, error in the right place.", "状態と反応確認：hover・disabled・押下時の表示・エラー位置。"),
      CODE("text", "UI Checklist — Màn hình Đăng nhập MobileBank\n[ ] Logo & tên ngân hàng đúng, không vỡ ảnh\n[ ] Ô 'Mật khẩu' che ký tự bằng dấu chấm\n[ ] Nút 'Đăng nhập' canh giữa, đủ vùng bấm, có trạng thái disabled khi bỏ trống\n[ ] Sai mật khẩu -> thông báo đỏ hiển thị NGAY DƯỚI ô, đúng chính tả\n[ ] Link 'Quên mật khẩu?' đúng màu thương hiệu, bấm được\n[ ] Cỡ chữ & tương phản đạt mức tối thiểu (đọc được trên nắng)"),
      TRY("Tự viết thêm 3 mục checklist UI cho màn hình chuyển tiền (gợi ý: hiển thị số dư, định dạng số tiền, nút Xác nhận).", "Add 3 more UI checklist items for a transfer screen (hint: balance display, amount format, Confirm button).", "送金画面のUIチェックリストを3項目追加（ヒント：残高表示・金額形式・確認ボタン）。"),
    ] },
  { heading: { vi: "6. Tình huống doanh nghiệp 1: nút bị che trên điện thoại", en: "6. Enterprise situation 1: a button hidden on mobile", ja: "6. 企業シーン1：スマホでボタンが隠れる" },
    blocks: [
      SITUATION("Sprint phát hành app MobileBank, bạn test màn hình chuyển tiền trên điện thoại.", "In the MobileBank release sprint, you test the transfer screen on mobile.",
        "Trên máy tính nút 'Xác nhận chuyển' hiển thị đủ, nhưng trên iPhone màn nhỏ thì nút bị bàn phím che, khách không bấm được để hoàn tất giao dịch.",
        "On desktop the 'Confirm transfer' button shows fully, but on a small iPhone the keyboard hides it, so customers can't tap to finish the transaction.",
        "MobileBankリリーススプリントで送金画面をスマホ検証する。", "PCでは『送金確認』ボタンが全表示ですが、小さいiPhoneではキーボードに隠れ、顧客が取引を完了できません。"),
      SOLVE("Xác định rõ môi trường (thiết bị), chụp ảnh bằng chứng, mở ticket Jira với severity cao.", "Pin down the environment (device), capture screenshot evidence, open a high-severity Jira ticket.", "環境（端末）を特定し、証拠スクショを取り、重大度高でJira起票。"),
      P("Đây là lỗi phụ thuộc thiết bị nên phần môi trường là mấu chốt: ghi rõ loại điện thoại, kích thước màn hình, phiên bản trình duyệt. Vì lỗi chặn khách hoàn tất chuyển tiền — ảnh hưởng trực tiếp doanh thu và trải nghiệm — bạn đặt severity Cao và đính kèm ảnh chụp có bàn phím che nút.",
        "This is a device-dependent bug, so the environment is key: note the phone model, screen size, browser version. Because it blocks customers from completing a transfer — directly hurting revenue and experience — you set severity High and attach a screenshot showing the keyboard hiding the button.",
        "端末依存のバグのため環境が鍵です：機種・画面サイズ・ブラウザ版を明記。送金完了を妨げ売上と体験に直結するため、重大度を高にし、キーボードがボタンを隠すスクショを添付します。"),
      CODE("text", "JIRA BUG — MB-1287\nTiêu đề: [Chuyển tiền][Mobile] Nút 'Xác nhận chuyển' bị bàn phím che, không bấm được\nMôi trường: iPhone 13, Safari, iOS 17, màn 390x844\nBước tái hiện: 1) Mở Chuyển tiền 2) Nhập số tài khoản & số tiền 3) Bàn phím bật lên\nThực tế: nút 'Xác nhận chuyển' bị bàn phím che, không thao tác được\nMong đợi: nút luôn hiển thị/đẩy lên trên bàn phím, bấm được\nSeverity: High  |  Priority: High\nBằng chứng: mb1287_transfer_button_hidden.png"),
      RECAP(["Lỗi phụ thuộc thiết bị -> ghi rõ môi trường", "Chặn giao dịch -> severity cao, kèm ảnh"],
        ["Device-dependent bug -> note the environment", "Blocks a transaction -> high severity, attach image"],
        ["端末依存 -> 環境を明記", "取引を妨げる -> 重大度高・画像添付"]),
    ] },
  { heading: { vi: "7. Tình huống doanh nghiệp 2: sai định dạng số tiền", en: "7. Enterprise situation 2: wrong currency format", ja: "7. 企業シーン2：通貨形式の誤り" },
    blocks: [
      SITUATION("Khách phản ánh số dư hiển thị khó đọc trên màn hình tài khoản.", "Customers report the balance is hard to read on the account screen.",
        "Số dư 12.500.000 ₫ lại hiển thị thành 12500000₫ (không có dấu phân cách), khiến khách dễ đọc nhầm thành mười hai triệu hay một trăm hai lăm triệu.",
        "A balance of 12,500,000 ₫ shows as 12500000₫ (no separators), making customers easily misread it as twelve million or a hundred twenty-five million.",
        "口座画面で残高が読みにくいと顧客が報告。", "残高12,500,000 ₫が区切りなしで12500000₫と表示され、金額を読み違えやすいです。"),
      SOLVE("Đối chiếu yêu cầu định dạng tiền tệ, ghi nhận là lỗi nội dung UI với ví dụ cụ thể.", "Compare to the currency-format requirement, record it as a UI content bug with a concrete example.", "通貨形式の要件と照合し、具体例付きでUI内容バグとして記録。"),
      P("Đây là lỗi nhóm 'nội dung' — không làm sập hệ thống nhưng đập vào mắt mọi khách và có thể gây hiểu nhầm về tiền, nên priority cao dù severity trung bình. Khi ghi nhận, bạn nêu rõ giá trị thấy được và giá trị đáng lẽ theo yêu cầu, kèm ảnh chụp để không ai phải đoán.",
        "This is a 'content' bug — no crash but seen by every customer and can cause money misreading, so priority high though severity medium. When recording, state the observed value and the required value, with a screenshot so nobody has to guess.",
        "これは『内容』バグです。停止しないが全顧客が見て金額誤読を招くため、重大度中でも優先度高。記録時は観測値と要件値を明記し、スクショを添えます。"),
      CODE("text", "JIRA BUG — MB-1301\nTiêu đề: [Tài khoản] Số dư không có dấu phân cách hàng nghìn, dễ đọc nhầm\nMôi trường: Chrome 126 / Windows 11 / web MobileBank\nThực tế: hiển thị '12500000₫'\nMong đợi (theo yêu cầu R-UI-07): hiển thị '12.500.000 ₫' (dấu chấm phân cách, cách ký hiệu ₫)\nSeverity: Medium  |  Priority: High\nBằng chứng: mb1301_balance_format.png"),
      IMG(svg("So sánh Thực tế vs Yêu cầu", ["Thực tế:  12500000₫   (khó đọc, dễ nhầm)", "Yêu cầu: 12.500.000 ₫  (đúng định dạng)", "=> Lỗi nội dung UI, priority cao"], "#f472b6"),
        "Đối chiếu số tiền hiển thị thực tế với yêu cầu định dạng", "Comparing the shown amount with the required format", "表示金額と要件形式の比較"),
      TRY("Tìm trên một app/ngân hàng bạn dùng một chỗ hiển thị số tiền, kiểm xem có dấu phân cách và ký hiệu tiền tệ đúng không.", "On a banking app you use, find where an amount is shown and check separators and currency symbol.", "使う銀行アプリで金額表示箇所を探し、区切りと通貨記号が正しいか確認しよう。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report: bằng chứng thuyết phục", en: "8. Recording & the report file: convincing evidence", ja: "8. 記録とレポートファイル：説得力ある証拠" },
    blocks: [
      P("Ở dự án, kết quả test giao diện không chỉ nằm trong đầu bạn — nó phải thành tài liệu để đội đọc và hành động. Có hai thứ bạn tạo ra: kết quả chạy test case (pass/fail trên TestRail/Excel) và các ticket lỗi (trên Jira). Cuối chu kỳ, những con số này được gom thành một báo cáo ngắn.",
        "On a project, UI testing results don't just live in your head — they must become documents the team reads and acts on. You produce two things: test execution results (pass/fail on TestRail/Excel) and bug tickets (on Jira). At cycle end, these numbers roll up into a short report.",
        "案件ではUIテスト結果は頭の中だけでなく、チームが読み行動する文書になります。生成物は2つ：テスト実行結果（TestRail/Excelの合否）とバグチケット（Jira）。周期末にこれらが短い報告にまとまります。"),
      STEP(1, "Ghi kết quả từng ca vào bảng: Pass/Fail, và với Fail thì đính kèm mã ticket Jira.", "Record each case result: Pass/Fail, and for Fail attach the Jira ticket ID.", "各ケース結果を記録：合否、Failはjira番号を添付。"),
      STEP(2, "Mở ticket lỗi có đủ: tiêu đề, môi trường, bước, thực tế, mong đợi, severity, ảnh.", "File a bug ticket with: title, environment, steps, actual, expected, severity, image.", "バグ起票：タイトル・環境・手順・実際・期待・重大度・画像。"),
      CODE("text", "BÁO CÁO TEST GIAO DIỆN — Sprint 24 — Màn hình Đăng nhập & Chuyển tiền\nNgười test: (bạn)   |   Ngày: 07/07   |   Trình duyệt/Thiết bị: Chrome 126, iPhone 13\nTổng ca chạy: 18   |   Pass: 15   |   Fail: 3   |   Tỉ lệ đạt: 83%\nLỗi đã mở:\n  MB-1287  High    Nút 'Xác nhận chuyển' bị bàn phím che (mobile)\n  MB-1301  Medium  Số dư sai định dạng, thiếu dấu phân cách\n  MB-1309  Low     Link 'Quên mật khẩu' sai màu thương hiệu\nĐánh giá: màn hình chưa nên phát hành cho tới khi MB-1287 được sửa."),
      IMG(screen("Bảng thực thi test case (TestRail)", ["TC-Login-01  Đăng nhập đúng ......... PASS", "TC-Login-05  Sai mật khẩu ............ PASS", "TC-Trans-03  Nút xác nhận (mobile) ... FAIL -> MB-1287", "TC-Acct-02   Định dạng số dư ......... FAIL -> MB-1301"], "#60a5fa"),
        "Bảng ghi nhận thực thi test case, gắn mã lỗi cho ca Fail", "A test execution sheet linking failed cases to bug IDs", "テスト実行表：Failケースにバグ番号を紐付け"),
      TIP("Mỗi ca Fail luôn gắn một mã ticket — người quản lý nhìn báo cáo là lần ngay ra lỗi tương ứng để theo dõi.", "Every failed case links a ticket ID — managers can jump straight to the matching bug from the report.", "各Failにチケット番号を紐付け — 管理者は報告から対応バグへ即移動できます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp của người mới & mẹo", en: "9. Common beginner mistakes & tips", ja: "9. 初心者のよくある失敗とコツ" },
    blocks: [
      P("Khi mới test giao diện ở dự án thật, người mới hay mắc vài lỗi giống nhau. Biết trước giúp báo cáo của bạn đáng tin và tiết kiệm thời gian cho cả đội.",
        "When new to UI testing on a real project, beginners make a few common mistakes. Knowing them keeps your reports trustworthy and saves the team time.",
        "実案件のUIテストに不慣れな新人は共通の失敗をします。事前に知れば報告が信頼され、チームの時間を節約します。"),
      PITFALL("Báo 'giao diện xấu' theo cảm tính — không đối chiếu thiết kế nên lập trình viên không biết sửa theo đâu.", "Reporting 'ugly UI' by feel — no design comparison, so developers don't know what to fix toward.", "感覚で『UIが醜い』と報告 — 設計比較がなく、開発者は何に合わせるか分かりません。"),
      PITFALL("Quên ghi thiết bị/trình duyệt cho lỗi chỉ xảy ra ở một nơi — lập trình viên mở chỗ khác thấy bình thường và trả lại.", "Forgetting device/browser for a location-specific bug — developers see it fine elsewhere and return it.", "特定環境のみのバグで端末/ブラウザを書き忘れ — 別環境で正常に見え差し戻されます。"),
      TIP("Mỗi lỗi UI = một ảnh chụp có khoanh vùng + một câu 'thấy gì' + một câu 'thiết kế yêu cầu gì'. Rõ ràng như vậy là đủ chuyên nghiệp.", "Each UI bug = one annotated screenshot + one 'what I saw' + one 'what the design requires'. That clarity is professional enough.", "各UIバグ＝注釈付きスクショ1枚＋『見えたもの』1文＋『設計要件』1文。その明確さで十分プロです。"),
      IMG(svg("Bug UI: nên & không nên", ["✗ 'Giao diện xấu, nút kỳ kỳ'", "✓ '[Login][iPhone] nút bị che, ảnh kèm,", "  thiết kế yêu cầu nút luôn hiển thị'"], "#fb7185"),
        "So sánh cách báo lỗi giao diện mơ hồ và rõ ràng", "Vague vs clear ways to report a UI bug", "曖昧なUIバグ報告と明確な報告の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      e1_faq1.block, e1_faq2.block, e1_faq3.block,
      INTERNAL("Test chức năng cho người mới (dự án TMĐT)", "Functional testing for beginners (e-commerce project)", "test-chuc-nang-functional-testing-cho-nguoi-moi"),
      INTERNAL("Cách viết bug report cho người mới", "How to write a bug report for beginners", "cach-viet-bug-report-cho-nguoi-moi"),
    ] },
  QUIZ(e1_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa test giao diện của một app ngân hàng thật: xác định màn hình test, so với thiết kế, chạy checklist bằng trình duyệt và DevTools, xử lý hai tình huống doanh nghiệp và ghi nhận thành ticket Jira cùng báo cáo cuối sprint. Đây chính là những gì bạn làm trong tuần đầu đi làm.",
        "You just UI-tested a real banking app: identifying the screen, comparing to the design, running a checklist with the browser and DevTools, handling two enterprise situations and recording them as Jira tickets and an end-of-sprint report. This is exactly your first week on the job.",
        "実際の銀行アプリをUIテストしました：対象画面の特定・設計比較・ブラウザとDevToolsでのチェックリスト・2つの企業シーン対応・Jira起票とスプリント末報告。これが入社初週の実務です。"),
      P("Chặng tiếp theo là test chức năng (kiểm luồng nghiệp vụ chạy đúng), rồi các loại kiểm thử khác trên dự án lớn. Nếu muốn được hướng dẫn trực tiếp trên dự án mô phỏng doanh nghiệp và dùng thành thạo Jira, TestRail, DevTools, một khoá học bài bản sẽ giúp bạn tự tin ứng tuyển Tester.",
        "Next is functional testing (verifying business flows work), then other test types on large projects. If you want hands-on guidance on enterprise-like projects and fluency with Jira, TestRail and DevTools, a structured course helps you confidently apply for a Tester role.",
        "次は機能テスト（業務フローの正しさ）、そして大規模案件の他のテスト種別です。企業を模した案件で直接指導を受けJira・TestRail・DevToolsに習熟したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ENT_DOC1 = makeDoc({
  slug: "test-giao-dien-ui-testing-cho-nguoi-moi",
  domain: "banking",
  primaryKeyword: "test giao diện",
  keywords: ["test giao diện", "ui testing là gì", "kiểm thử giao diện", "test giao diện cho người mới"],
  coverLabel: "NGƯỜI MỚI · UI TESTING · NGÂN HÀNG",
  crumb: "Test giao diện UI (người mới)",
  metaTitle: { vi: "Test giao diện (UI testing) cho người mới", en: "UI testing for beginners (real project)", ja: "初心者向けUIテスト（画面テスト）" },
  metaDescription: {
    vi: "Test giao diện (UI testing) cho người mới trên dự án ngân hàng số: màn hình test, checklist, công cụ Figma/DevTools/Jira, cách ghi nhận & file report, có trắc nghiệm.",
    en: "UI testing for beginners on a digital-banking project: the screen under test, checklist, Figma/DevTools/Jira, recording & report file, real situations and a quiz.",
    ja: "初心者向けUIテストをネット銀行案件で：対象画面・チェックリスト・Figma/DevTools/Jira・記録とレポート・実例・クイズ。",
  },
  title: {
    vi: "Test giao diện (UI testing) cho người mới: dự án ngân hàng số, công cụ & file report (có trắc nghiệm)",
    en: "UI testing for beginners: a digital-banking project, tools & report file (with quiz)",
    ja: "初心者向けUIテスト：ネット銀行案件・ツール・レポート（クイズ付き）",
  },
  summary: {
    vi: "Bài thực hành cho người mới: test giao diện trên dự án ngân hàng số. Màn hình test là gì, 4 nhóm cần kiểm, chiến lược & các bước, công cụ Figma/DevTools/TestRail/Jira, hai tình huống doanh nghiệp (nút bị che, sai định dạng tiền), cách ghi nhận & file report, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Hands-on beginner article: UI testing on a digital-banking project. What the screen under test is, four check groups, strategy & steps, Figma/DevTools/TestRail/Jira, two enterprise situations (hidden button, wrong money format), recording & report file, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け実践：ネット銀行案件のUIテスト。対象画面・4群・戦略と手順・Figma/DevTools/TestRail/Jira・2つの企業シーン・記録とレポート・FAQ・クイズ。",
  },
  faqs: [e1_faq1, e1_faq2, e1_faq3],
  howTo: { name: "Cách test giao diện cho người mới trên dự án thật", steps: [
    { name: "Mở thiết kế & yêu cầu", text: "Biết màn hình đáng lẽ trông ra sao (Figma + tài liệu)." },
    { name: "Chạy checklist UI", text: "Kiểm tổng thể -> nội dung -> trạng thái & phản hồi, dùng trình duyệt và DevTools." },
    { name: "Ghi nhận & báo cáo", text: "Ca Fail mở ticket Jira kèm ảnh, tổng hợp báo cáo cuối sprint." },
  ] },
  pages: e1_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 2 — Test chức năng (functional testing) cho người mới · Dự án TMĐT
// ══════════════════════════════════════════════════════════════════════════════════════
const e2_faq1 = FAQ(
  "Test chức năng (functional testing) là gì?", "What is functional testing?",
  "Test chức năng là kiểm phần mềm có LÀM ĐÚNG việc nó phải làm hay không: đầu vào cho ra đầu ra đúng, luồng nghiệp vụ chạy trọn vẹn. Khác test giao diện (kiểm phần nhìn), test chức năng kiểm phần chạy — ví dụ đặt hàng có tạo đơn, trừ kho, gửi email xác nhận đúng không.",
  "Functional testing checks whether the software DOES what it should: inputs produce correct outputs and business flows complete. Unlike UI testing (the look), functional testing checks behavior — e.g. does placing an order create the order, reduce stock and send the right confirmation email.",
  "機能テスト（ファンクショナルテスト）とは？",
  "機能テストはソフトが正しく動作するかを検証します：入力に対し正しい出力、業務フローの完遂。UIテスト（見た目）と異なり挙動を検証します — 例：注文で発注作成・在庫減・確認メール送信が正しいか。");
const e2_faq2 = FAQ(
  "Ở dự án TMĐT, test chức năng đi qua những bước nào?", "What steps does functional testing follow on an e-commerce project?",
  "Thường theo luồng nghiệp vụ đầu-cuối: chuẩn bị dữ liệu (tài khoản, sản phẩm), thao tác từng bước như người dùng thật (tìm, thêm giỏ, thanh toán), rồi kiểm cả kết quả nhìn thấy (thông báo, đơn hàng) lẫn hệ quả phía sau (trạng thái đơn, email, tồn kho). Kết quả ghi vào test case và lỗi mở trên Jira.",
  "Usually an end-to-end business flow: prepare data (account, products), act step by step like a real user (search, add to cart, checkout), then verify both the visible result (message, order) and the back-end effects (order status, email, stock). Results go into test cases and bugs into Jira.",
  "ECプロジェクトで機能テストはどの手順を踏む？",
  "通常はエンドツーエンドの業務フロー：データ準備（アカウント・商品）、実ユーザーのように操作（検索・カート・決済）、そして見える結果（通知・注文）と裏の影響（注文状態・メール・在庫）を検証。結果はテストケース、バグはJiraへ。");
const e2_faq3 = FAQ(
  "Người mới cần công cụ gì để test chức năng?", "What tools do beginners need for functional testing?",
  "Ở mức nhập môn: một trình duyệt để thao tác, tài khoản test và dữ liệu mẫu, bảng test case (TestRail/Excel) để chạy theo kịch bản, và Jira để mở lỗi. Khi cần kiểm hệ quả phía sau, bạn có thể xem email test, kiểm trạng thái đơn trong trang quản trị, hoặc dùng Postman gọi thử API xác nhận.",
  "At entry level: a browser to operate, a test account and sample data, a test case sheet (TestRail/Excel) to run scenarios, and Jira to file bugs. To check back-end effects you can view a test inbox, check order status in an admin page, or use Postman to confirm an API.",
  "初心者は機能テストに何のツールが必要？",
  "入門レベル：操作用ブラウザ、テストアカウントとサンプルデータ、シナリオ実行用テストケース表（TestRail/Excel）、起票用Jira。裏の影響確認にはテスト用メール閲覧、管理画面での注文状態確認、PostmanでのAPI確認も使えます。");

const e2_quiz = [
  mcq({
    q: { vi: "Test chức năng khác test giao diện ở điểm nào?", en: "How does functional differ from UI testing?", ja: "機能テストとUIテストの違いは？" },
    options: [
      { vi: "Test chức năng chỉ kiểm màu sắc", en: "Functional only checks colors", ja: "機能テストは色だけ" },
      { vi: "Test chức năng kiểm phần mềm CHẠY ĐÚNG, không chỉ phần nhìn", en: "Functional checks that software BEHAVES correctly, not just looks", ja: "機能テストは見た目でなく正しい挙動を検証" },
      { vi: "Chúng giống hệt nhau", en: "They are identical", ja: "全く同じ" },
      { vi: "Test chức năng không cần dữ liệu", en: "Functional needs no data", ja: "機能テストはデータ不要" },
    ], correct: 1,
    explain: { vi: "Giao diện kiểm phần nhìn; chức năng kiểm hành vi và kết quả nghiệp vụ.", en: "UI checks the look; functional checks behavior and business outcomes.", ja: "UIは見た目、機能は挙動と業務結果を検証します。" },
  }),
  mcq({
    q: { vi: "Sau khi 'Đặt hàng' thành công trên TMĐT, nên kiểm thêm hệ quả nào phía sau?", en: "After a successful 'Place order', which back-end effect should you also verify?", ja: "EC で『注文』成功後、裏で確認すべき影響は？" },
    options: [
      { vi: "Màu nút Đặt hàng", en: "The button color", ja: "ボタンの色" },
      { vi: "Đơn được tạo, tồn kho giảm, email xác nhận được gửi", en: "Order created, stock reduced, confirmation email sent", ja: "注文作成・在庫減・確認メール送信" },
      { vi: "Kích thước logo", en: "The logo size", ja: "ロゴのサイズ" },
      { vi: "Không cần kiểm gì", en: "Nothing", ja: "確認不要" },
    ], correct: 1,
    explain: { vi: "Chức năng đúng nghĩa là mọi hệ quả nghiệp vụ xảy ra đúng, không chỉ thông báo trên màn hình.", en: "Correct function means all business effects happen right, not just an on-screen message.", ja: "正しい機能とは画面表示だけでなく全業務影響が正しく起きることです。" },
  }),
  mcq({
    q: { vi: "Bước đầu tiên trước khi chạy một ca test chức năng là gì?", en: "What's the first step before running a functional test case?", ja: "機能テストケース実行前の最初のステップは？" },
    options: [
      { vi: "Chuẩn bị dữ liệu & điều kiện tiền đề (tài khoản, sản phẩm còn hàng)", en: "Prepare data & preconditions (account, in-stock product)", ja: "データと前提の準備（アカウント・在庫あり商品）" },
      { vi: "Đóng trình duyệt", en: "Close the browser", ja: "ブラウザを閉じる" },
      { vi: "Xoá test case", en: "Delete the test case", ja: "テストケース削除" },
      { vi: "Báo lỗi trước", en: "Report a bug first", ja: "先にバグ報告" },
    ], correct: 0,
    explain: { vi: "Không có dữ liệu/tiền đề đúng thì luồng không chạy được và kết quả vô nghĩa.", en: "Without correct data/preconditions the flow can't run and results are meaningless.", ja: "正しいデータ/前提がないとフローが動かず結果が無意味です。" },
  }),
  mcq({
    q: { vi: "Đọc ca: 'Áp mã giảm giá đã hết hạn -> hệ thống báo Mã không hợp lệ'. Đây là loại ca gì?", en: "Read: 'Apply an expired coupon -> system shows Invalid code'. What case type is this?", ja: "『期限切れクーポン適用 -> 無効表示』これは何のケース？" },
    options: [
      { vi: "Ca giao diện thuần tuý", en: "A pure UI case", ja: "純粋なUIケース" },
      { vi: "Ca chức năng cho luồng lỗi (negative)", en: "A functional negative-flow case", ja: "機能の異常系ケース" },
      { vi: "Ca hiệu năng", en: "A performance case", ja: "性能ケース" },
      { vi: "Không phải test", en: "Not a test", ja: "テストではない" },
    ], correct: 1,
    explain: { vi: "Kiểm hệ thống xử lý ĐÚNG một tình huống lỗi là ca chức năng luồng âm (negative).", en: "Verifying the system handles an error situation correctly is a functional negative case.", ja: "エラー状況を正しく処理するか検証するのは機能の異常系ケースです。" },
  }),
];

const e2_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì trên dự án TMĐT", en: "1. TL;DR & what you'll do on an e-commerce project", ja: "1. 要点とECプロジェクトでできること" },
    blocks: [
      TLDR("Test chức năng là kiểm phần mềm chạy ĐÚNG nghiệp vụ. Bài này gắn với luồng mua hàng của một sàn TMĐT: bạn chuẩn bị dữ liệu, chạy luồng tìm–giỏ–thanh toán, kiểm cả kết quả nhìn thấy lẫn hệ quả phía sau, ghi test case và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "Functional testing checks the software performs the business correctly. This ties to the buying flow of an e-commerce site: you prepare data, run search–cart–checkout, verify visible results and back-end effects, record test cases and file Jira bugs. A quiz at the end.",
        "機能テストは業務が正しく動くかを検証します。本記事はECサイトの購入フローに沿い、データ準備・検索/カート/決済の実行・見える結果と裏の影響の検証・テストケース記録・Jira起票を学びます。最後にクイズ付き。"),
      P("Test chức năng cho người mới nghe có vẻ khó nhưng thực ra rất gần với thói quen mua sắm hằng ngày của bạn. Điểm khác biệt là bạn thao tác có chủ đích, có kết quả mong đợi và ghi lại đầy đủ. Ở bài này ta bước vào một dự án sàn TMĐT thật, mở đúng luồng mua hàng và test như một tester đi làm. Bài đi từ con số 0, có hình mô phỏng, ví dụ thật và trắc nghiệm cuối bài.",
        "Functional testing for beginners sounds hard but is close to your daily shopping habits. The difference is you act with intent, have expected results and record everything. Here we step into a real e-commerce project, open the buying flow and test like a working tester. It starts from zero with mocks, real examples and a final quiz.",
        "初心者の機能テストは難しく聞こえますが、日常の買い物習慣に近いです。違いは意図的に操作し、期待結果を持ち、全て記録する点です。本記事は実際のECプロジェクトに入り、購入フローを実務のように検証します。ゼロから、モック・実例・クイズ付きで解説します。"),
      IMG(screen("ShopVN — Thanh toán", ["Giỏ hàng: Áo thun x2 — 300.000 ₫", "Mã giảm giá: [__________] [Áp dụng]", "Địa chỉ giao — Phương thức thanh toán", "[ Đặt hàng ]   Tổng: 300.000 ₫"], "#a78bfa"),
        "Màn hình test: trang thanh toán của sàn TMĐT ShopVN", "Screen under test: the ShopVN e-commerce checkout page", "テスト対象画面：ECサイトShopVNの決済ページ"),
      DEF("Test chức năng (functional testing)", "kiểm phần mềm có làm đúng nghiệp vụ không: đầu vào cho ra đầu ra đúng và luồng chạy trọn vẹn.",
        "functional testing — checking the software performs the business correctly: inputs give correct outputs and flows complete.",
        "機能テスト — ソフトが業務を正しく行うか（入力に正しい出力、フロー完遂）を検証すること。"),
    ] },
  { heading: { vi: "2. Luồng nghiệp vụ là gì & test chức năng kiểm gì", en: "2. What a business flow is & what functional testing checks", ja: "2. 業務フローとは・機能テストの検証内容" },
    blocks: [
      P("Trên sàn TMĐT, một 'luồng nghiệp vụ' là chuỗi bước để hoàn thành một mục tiêu của người dùng, ví dụ 'mua một sản phẩm'. Test chức năng đi theo luồng đó và kiểm ở mỗi mắt xích: bước này cho kết quả đúng chưa, và toàn luồng có dẫn tới kết cục đúng không.",
        "On an e-commerce site, a 'business flow' is the chain of steps to achieve a user goal, e.g. 'buy a product'. Functional testing follows that flow and checks each link: does this step give the right result, and does the whole flow lead to the right outcome.",
        "ECサイトの『業務フロー』は利用者の目的達成までの一連の手順（例『商品を買う』）です。機能テストはそのフローを追い、各節点を検証します：この手順の結果は正しいか、フロー全体が正しい結末に至るか。"),
      DEF("Luồng nghiệp vụ (business flow)", "chuỗi các bước người dùng thực hiện để đạt một mục tiêu, như tìm–thêm giỏ–thanh toán.",
        "a business flow — the chain of user steps to reach a goal, like search–cart–checkout.",
        "業務フロー — 目的達成までの利用者手順の連鎖（例：検索・カート・決済）。"),
      P("Test chức năng thường kiểm hai loại luồng: luồng chính (happy path) khi mọi thứ hợp lệ, và luồng lỗi (negative) khi có gì đó sai — mã giảm giá hết hạn, hết hàng, thẻ bị từ chối. Ở TMĐT, luồng lỗi rất quan trọng vì liên quan tới tiền và tồn kho; xử lý sai một tình huống lỗi có thể khiến khách bị trừ tiền mà không có hàng.",
        "Functional testing checks two flow types: the happy path when everything is valid, and negative flows when something is wrong — expired coupon, out of stock, declined card. In e-commerce, negative flows are crucial because money and stock are involved; mishandling one can charge a customer with no product delivered.",
        "機能テストは2種のフローを検証：全て有効な主要フロー（ハッピーパス）と、何か不正な異常フロー（クーポン期限切れ・在庫切れ・カード拒否）。ECでは金銭と在庫が絡むため異常フローが重要で、処理ミスは商品なしの課金を招きます。"),
      IMG(svg("Luồng mua hàng & điểm kiểm", ["Tìm SP -> Thêm giỏ -> Áp mã -> Thanh toán -> Đơn tạo", "Kiểm nhìn thấy: thông báo, tổng tiền, mã đơn", "Kiểm phía sau: trạng thái đơn, email, tồn kho"], "#22d3ee"),
        "Luồng mua hàng và các điểm cần kiểm ở mỗi bước", "The buying flow and check points at each step", "購入フローと各手順の確認点"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án doanh nghiệp", en: "3. Why it matters on an enterprise project", ja: "3. 企業案件で重要な理由" },
    blocks: [
      P("Với một sàn TMĐT lớn, luồng thanh toán là nơi ra tiền của cả doanh nghiệp. Nếu đặt hàng bị lỗi, mỗi phút hỏng là doanh thu mất đi và khách bỏ giỏ sang đối thủ. Vì thế test chức năng cho luồng mua hàng là ưu tiên hàng đầu trước mỗi lần phát hành.",
        "For a large e-commerce site, the checkout flow is where the whole business earns. If ordering breaks, every broken minute is lost revenue and customers abandoning carts to rivals. So functional testing of the buying flow is a top priority before every release.",
        "大規模ECでは決済フローが事業全体の収益源です。注文が壊れれば、その分だけ売上が失われ顧客は競合へ流れます。したがって購入フローの機能テストは各リリース前の最優先事項です。"),
      P("Ngoài doanh thu, test chức năng còn bảo vệ tính đúng đắn của dữ liệu: tồn kho phải khớp, giá và khuyến mãi phải tính đúng, đơn hàng phải gắn đúng khách. Một lỗi tính giảm giá sai có thể nhân lên hàng nghìn đơn trước khi bị phát hiện, gây thiệt hại lớn. Người mới test chức năng vì thế đang canh giữ những con số quan trọng nhất của công ty.",
        "Beyond revenue, functional testing protects data correctness: stock must match, prices and promotions must compute right, orders must attach to the right customer. A single wrong-discount bug can multiply across thousands of orders before being caught, causing big losses. So a beginner doing functional testing guards the company's most important numbers.",
        "収益以外に、機能テストはデータの正しさも守ります：在庫の整合・価格や販促の正確な計算・注文と顧客の正しい紐付け。割引計算の1バグが発覚前に数千注文へ波及し大損を生むこともあります。機能テストは会社の最重要な数字を守る仕事です。"),
      P("Chính vì hệ quả lớn, đội ngũ đánh giá cao tester biết kiểm cả phần phía sau chứ không chỉ dừng ở thông báo 'Đặt hàng thành công'. Đây là điểm giúp bạn nổi bật: luôn hỏi thêm 'sau khi thành công thì dữ liệu có đúng không?'.",
        "Because effects are large, teams value testers who verify the back end, not just stop at a 'Order placed' message. This helps you stand out: always ask 'after success, is the data correct?'.",
        "影響が大きいため、チームは『注文成功』表示で止まらず裏側まで検証するテスターを高く評価します。『成功後、データは正しいか』と常に問うことが際立つ鍵です。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: dữ liệu, tài khoản & công cụ", en: "4. Prepare: data, accounts & tools", ja: "4. 準備：データ・アカウント・ツール" },
    blocks: [
      P("Test chức năng cần chuẩn bị kỹ hơn test giao diện một chút, vì bạn phải có dữ liệu để luồng chạy được. May mắn là dự án thường có sẵn môi trường test với dữ liệu mẫu.",
        "Functional testing needs a bit more prep than UI testing, because you need data for the flow to run. Luckily projects usually have a test environment with sample data.",
        "機能テストはフロー実行にデータが必要なため、UIテストより少し準備が要ります。幸い案件には通常サンプルデータ付きのテスト環境があります。"),
      STEP(1, "Chuẩn bị tài khoản test và sản phẩm mẫu còn hàng; ghi lại thông tin thẻ test (nếu có).", "Prepare a test account and an in-stock sample product; note test card details (if any).", "テストアカウントと在庫あり商品を準備；テストカード情報（あれば）を控える。"),
      STEP(2, "Mở bảng test case (TestRail/Excel) chứa các kịch bản luồng mua hàng.", "Open the test case sheet (TestRail/Excel) with the buying-flow scenarios.", "購入フローのシナリオを含むテストケース表（TestRail/Excel）を開く。"),
      STEP(3, "Xác định nơi kiểm hệ quả: trang quản trị đơn hàng, hộp thư test, hoặc Postman để xem API.", "Identify where to check effects: the order admin page, a test inbox, or Postman for the API.", "影響確認先を特定：注文管理画面・テスト用受信箱・API確認用Postman。"),
      TRY("Trên một sàn TMĐT bạn hay dùng, thêm 1 sản phẩm vào giỏ rồi kiểm tổng tiền có cộng đúng không.", "On an e-commerce site you use, add a product to the cart and check the total sums correctly.", "使うECサイトで商品を1つカートに入れ、合計金額が正しく足されるか確認しよう。"),
      PITFALL("Test chức năng mà quên kiểm hệ quả phía sau — thấy 'Đặt hàng thành công' đã kết luận Pass, trong khi đơn không hề được tạo.", "Functional testing that forgets back-end effects — seeing 'Order placed' and calling it Pass while no order was actually created.", "裏の影響を確認し忘れる — 『注文成功』表示でPassとするが実際は注文未作成のことがあります。"),
      IMG(screen("Bộ công cụ test chức năng", ["Tài khoản test + dữ liệu sản phẩm mẫu", "TestRail / Excel — kịch bản & test case", "Trang quản trị đơn — kiểm trạng thái đơn", "Jira — mở lỗi · (Postman — xem API)"], "#34d399"),
        "Bộ phần mềm & dữ liệu thường dùng khi test chức năng", "The typical tools & data for functional testing", "機能テストに使う典型的なツールとデータ"),
    ] },
  { heading: { vi: "5. Chiến lược & các bước test chức năng", en: "5. Strategy & steps for functional testing", ja: "5. 機能テストの戦略と手順" },
    blocks: [
      P("Chiến lược cho người mới: chạy trọn luồng chính trước để chắc chắn 'con đường hạnh phúc' hoạt động, rồi mới rẽ vào các luồng lỗi. Với mỗi ca, luôn kiểm hai lớp: kết quả nhìn thấy và hệ quả phía sau.",
        "Beginner strategy: run the whole happy path first to ensure the 'happy road' works, then branch into negative flows. For each case, always check two layers: the visible result and the back-end effect.",
        "初心者の戦略：まず主要フロー全体を通し『幸せな道』の動作を確認し、次に異常フローへ分岐。各ケースで常に2層（見える結果と裏の影響）を確認します。"),
      STEP(1, "Chạy luồng chính: tìm sản phẩm -> thêm giỏ -> thanh toán -> nhận thông báo & mã đơn.", "Run the happy path: search -> add to cart -> checkout -> get message & order ID.", "主要フロー：検索 -> カート -> 決済 -> 通知と注文番号。"),
      STEP(2, "Kiểm hệ quả phía sau: đơn xuất hiện trong quản trị, email xác nhận, tồn kho giảm đúng.", "Check back-end effects: order in admin, confirmation email, stock reduced correctly.", "裏の影響確認：管理画面の注文・確認メール・在庫の正しい減少。"),
      STEP(3, "Chạy luồng lỗi: mã giảm giá hết hạn, hết hàng, thẻ bị từ chối — mỗi ca có kết quả mong đợi.", "Run negative flows: expired coupon, out of stock, declined card — each with an expected result.", "異常フロー：期限切れクーポン・在庫切れ・カード拒否 — 各々に期待結果。"),
      CODE("text", "KỊCH BẢN: Mua hàng có áp mã giảm giá (ShopVN)\nTiền đề: tài khoản test, sản phẩm 'Áo thun' còn hàng, mã 'SALE10' còn hạn\nTC-EC-01 Happy   : mua 2 áo + mã SALE10  -> tổng giảm 10%, đơn tạo, email gửi, tồn kho -2\nTC-EC-02 Negative: mã 'SALE10' đã hết hạn -> báo 'Mã không hợp lệ', tổng KHÔNG đổi\nTC-EC-03 Negative: sản phẩm hết hàng       -> chặn đặt, báo 'Sản phẩm đã hết hàng'\nTC-EC-04 Negative: thẻ bị từ chối          -> báo lỗi thanh toán, KHÔNG tạo đơn, KHÔNG trừ kho"),
      TRY("Tự viết thêm 1 ca luồng lỗi cho bước nhập địa chỉ giao hàng (gợi ý: bỏ trống số điện thoại).", "Add one more negative case for the shipping-address step (hint: empty phone number).", "配送先入力の異常系ケースを1つ追加（ヒント：電話番号空欄）。"),
    ] },
  { heading: { vi: "6. Tình huống doanh nghiệp 1: mã giảm giá tính sai", en: "6. Enterprise situation 1: a miscalculated coupon", ja: "6. 企業シーン1：クーポン計算の誤り" },
    blocks: [
      SITUATION("Trong đợt khuyến mãi, bạn test mã giảm giá 10% trên sàn ShopVN.", "During a promotion, you test a 10% coupon on ShopVN.",
        "Mã 'SALE10' đáng lẽ giảm 10% tổng đơn, nhưng khi mua 2 áo (300.000 ₫) hệ thống lại giảm 10% trên MỖI sản phẩm rồi cộng, ra con số khác với mong đợi.",
        "The 'SALE10' code should take 10% off the order total, but buying 2 shirts (300,000 ₫) the system takes 10% off EACH item then sums, giving a number different from expected.",
        "販促中、ShopVNで10%クーポンを検証する。", "『SALE10』は注文合計の10%引きのはずが、シャツ2枚（300,000 ₫）購入時に各商品に10%引きして合算し、期待と異なる金額になります。"),
      SOLVE("So sánh số tiền hệ thống tính với công thức trong yêu cầu, ghi rõ cả hai con số.", "Compare the system's amount with the requirement's formula, record both numbers.", "システムの金額と要件の計算式を比較し、両方の数値を記録。"),
      P("Đây là lỗi chức năng nghiêm trọng vì nó liên quan trực tiếp tới tiền và có thể nhân lên hàng nghìn đơn. Khi ghi nhận, bạn nêu rõ cách tính đúng theo yêu cầu, cách hệ thống đang tính, và chênh lệch bằng con số cụ thể để không ai phải suy luận. Đính kèm ảnh màn hình tổng tiền.",
        "This is a serious functional bug because it directly involves money and can multiply across thousands of orders. When recording, state the correct formula per the requirement, how the system computes it, and the difference in concrete numbers so nobody has to infer. Attach a screenshot of the total.",
        "これは金銭に直結し数千注文へ波及しうる重大な機能バグです。記録時は要件の正しい計算式・システムの計算方法・差額を具体的数値で示し、推測不要にします。合計金額のスクショを添付します。"),
      CODE("text", "JIRA BUG — EC-2043\nTiêu đề: [Thanh toán] Mã SALE10 tính giảm giá sai (giảm theo từng SP thay vì tổng đơn)\nMôi trường: Chrome 126 / web ShopVN / tài khoản test01\nBước: 1) Thêm 2 'Áo thun' (2 x 150.000) 2) Áp mã SALE10 3) Xem tổng\nThực tế: hệ thống giảm 10%/sản phẩm; tổng = 270.000 ₫ (đúng ngẫu nhiên) NHƯNG sai logic\nMong đợi (R-PROMO-03): giảm 10% trên TỔNG đơn 300.000 -> 270.000 ₫ (cùng số nhưng phải đúng cách tính, sai khi có giá lẻ)\nSeverity: High  |  Priority: High\nBằng chứng: ec2043_coupon_calc.png"),
      RECAP(["Lỗi liên quan tiền -> ghi rõ công thức đúng vs cách tính hiện tại", "Nhân lên nhiều đơn -> severity/priority cao"],
        ["Money bug -> record correct formula vs current calc", "Multiplies across orders -> high severity/priority"],
        ["金銭バグ -> 正しい式と現状計算を記録", "多注文へ波及 -> 重大度/優先度高"]),
    ] },
  { heading: { vi: "7. Tình huống doanh nghiệp 2: đặt hàng khi vừa hết hàng", en: "7. Enterprise situation 2: ordering just as stock runs out", ja: "7. 企業シーン2：在庫切れ寸前の注文" },
    blocks: [
      SITUATION("Hai khách cùng mua sản phẩm cuối cùng gần như đồng thời.", "Two customers buy the last item almost simultaneously.",
        "Kho chỉ còn 1 áo. Bạn kiểm tình huống: hai người cùng thêm vào giỏ và bấm đặt hàng gần như cùng lúc — hệ thống phải bảo đảm không bán vượt tồn kho.",
        "Stock has only 1 shirt. You test: two people add it and place orders almost at once — the system must ensure it doesn't oversell beyond stock.",
        "在庫は1枚のみ。検証：2人がほぼ同時に追加・注文 — 在庫超過販売を防ぐ必要があります。",
        "在庫はシャツ1枚。2人がほぼ同時に追加・注文する状況を検証し、在庫超過販売が起きないことを確認します。"),
      SOLVE("Thử đặt song song trên hai phiên/hai trình duyệt, kiểm tồn kho sau cùng có âm không.", "Try ordering in parallel on two sessions/browsers, check if final stock goes negative.", "2セッション/ブラウザで並行注文し、最終在庫が負にならないか確認。"),
      P("Đây là tình huống tranh chấp dữ liệu (race condition) — khó nhưng rất thật ở sàn đông khách. Người mới không cần hiểu sâu kỹ thuật, chỉ cần tái hiện: mở hai trình duyệt, cùng đặt sản phẩm cuối, rồi kiểm kết quả. Đúng là chỉ một người mua được, người kia nhận thông báo hết hàng; sai là cả hai đều thành công và tồn kho âm.",
        "This is a data-race situation — hard but very real on busy sites. Beginners needn't understand it deeply, just reproduce it: open two browsers, both order the last item, then check the result. Correct is only one succeeds and the other is told out of stock; wrong is both succeed and stock goes negative.",
        "これはデータ競合（レースコンディション）で、難しいが繁盛サイトでは非常に現実的です。初心者は深い理解不要で再現すればよいです：2ブラウザで最後の1点を注文し結果を確認。正しくは1人だけ成功し他方は在庫切れ表示、誤りは両方成功し在庫が負になります。"),
      CODE("text", "JIRA BUG — EC-2071\nTiêu đề: [Thanh toán] Bán vượt tồn kho khi 2 khách đặt sản phẩm cuối cùng đồng thời\nMôi trường: 2 phiên Chrome, tài khoản test01 & test02, SP 'Áo thun' tồn = 1\nBước: 1) Cả 2 thêm SP vào giỏ 2) Bấm Đặt hàng gần như cùng lúc\nThực tế: cả 2 đơn thành công; tồn kho hiển thị -1\nMong đợi: chỉ 1 đơn thành công; đơn còn lại báo 'Sản phẩm đã hết hàng'; tồn kho >= 0\nSeverity: Critical  |  Priority: High\nBằng chứng: ec2071_oversell.png"),
      IMG(svg("Race condition khi hết hàng", ["Tồn kho = 1", "Khách A đặt ✔   Khách B đặt ✔  (SAI!)", "=> tồn kho = -1  |  Mong đợi: chỉ 1 đơn thành công"], "#f472b6"),
        "Minh hoạ lỗi bán vượt tồn kho khi hai khách đặt cùng lúc", "Illustration of overselling when two customers order at once", "同時注文時の在庫超過販売の図"),
      TRY("Nghĩ ra một tình huống tranh chấp tương tự cho việc đặt vé xem phim (gợi ý: cùng chọn một ghế).", "Think of a similar race for booking cinema seats (hint: both pick the same seat).", "映画座席予約で似た競合状況を考えよう（ヒント：同じ席を選ぶ）。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report: kết quả luồng nghiệp vụ", en: "8. Recording & the report file: business-flow results", ja: "8. 記録とレポート：業務フロー結果" },
    blocks: [
      P("Với test chức năng, báo cáo cần cho thấy các luồng nghiệp vụ nào đã chạy, đạt hay không, và lỗi nào đang chặn phát hành. Người quản lý dựa vào đây để quyết định có 'go-live' hay không.",
        "For functional testing, the report should show which business flows ran, pass or fail, and which bugs block release. Managers use it to decide whether to 'go-live'.",
        "機能テストでは、どの業務フローを実行し合否か、どのバグがリリースを妨げるかを報告します。管理者はこれで『本番投入』の可否を判断します。"),
      STEP(1, "Ghi kết quả từng ca theo luồng, đánh dấu Pass/Fail và gắn mã ticket cho ca Fail.", "Record each case result by flow, mark Pass/Fail and attach ticket IDs for fails.", "フロー別に各ケース結果を記録、合否を付け、Failにチケット番号を紐付け。"),
      STEP(2, "Nêu rõ lỗi chặn phát hành (blocker) để đội ưu tiên sửa trước.", "Highlight release blockers so the team fixes them first.", "リリースを妨げるブロッカーを明示し、優先修正を促す。"),
      CODE("text", "BÁO CÁO TEST CHỨC NĂNG — Luồng Mua hàng — Sprint 24 (ShopVN)\nNgười test: (bạn)   |   Ngày: 07/07   |   Môi trường: web test.shopvn\nLuồng chính (Happy path): PASS (tạo đơn, email, tồn kho đúng)\nCa đã chạy: 22   |   Pass: 19   |   Fail: 3   |   Tỉ lệ đạt: 86%\nLỗi đang mở:\n  EC-2071  Critical  Bán vượt tồn kho khi đặt đồng thời   [BLOCKER]\n  EC-2043  High      Mã SALE10 tính giảm giá sai logic\n  EC-2088  Low       Thiếu thông báo khi giỏ hàng trống\nKhuyến nghị: KHÔNG go-live cho tới khi EC-2071 (blocker) được sửa & test lại."),
      IMG(screen("Bảng thực thi theo luồng (TestRail)", ["TC-EC-01 Mua + mã hợp lệ ......... PASS", "TC-EC-02 Mã hết hạn .............. PASS", "TC-EC-03 Hết hàng ................ PASS", "TC-EC-71 Đặt đồng thời (tồn=1) ... FAIL -> EC-2071"], "#a78bfa"),
        "Bảng ghi nhận thực thi test chức năng theo luồng nghiệp vụ", "A functional test execution sheet by business flow", "業務フロー別の機能テスト実行表"),
      TIP("Đánh dấu rõ lỗi 'blocker' trong báo cáo — đây là tín hiệu để quản lý hoãn phát hành nếu cần.", "Clearly mark 'blocker' bugs in the report — this signals managers to delay release if needed.", "報告で『ブロッカー』を明示 — 必要ならリリース延期を促す合図になります。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp của người mới & mẹo", en: "9. Common beginner mistakes & tips", ja: "9. 初心者のよくある失敗とコツ" },
    blocks: [
      P("Khi mới test chức năng ở dự án, người mới hay mắc vài lỗi giống nhau. Biết trước giúp kết quả của bạn đáng tin và phản ánh đúng chất lượng sản phẩm.",
        "When new to functional testing on a project, beginners make a few common mistakes. Knowing them keeps your results trustworthy and reflecting real product quality.",
        "実案件の機能テストに不慣れな新人は共通の失敗をします。事前に知れば結果が信頼され、製品品質を正しく反映します。"),
      PITFALL("Dừng ở thông báo 'thành công' mà không kiểm hệ quả — đơn có thể chưa được tạo hay email chưa gửi.", "Stopping at a 'success' message without checking effects — the order may not be created or the email not sent.", "『成功』表示で止まり影響を確認しない — 注文未作成やメール未送信のことがあります。"),
      PITFALL("Không chuẩn bị dữ liệu tiền đề — luồng không chạy được rồi lại kết luận nhầm là lỗi phần mềm.", "Not preparing precondition data — the flow can't run and you wrongly conclude it's a software bug.", "前提データを準備せずフローが動かず、誤ってソフトのバグと結論する。"),
      TIP("Với mỗi ca chức năng, hỏi đủ 3 câu: kết quả nhìn thấy đúng chưa? hệ quả phía sau đúng chưa? luồng lỗi được xử lý an toàn chưa?", "For each functional case ask 3 questions: is the visible result right? is the back-end effect right? is the error flow handled safely?", "各機能ケースで3問：見える結果は正しいか？裏の影響は正しいか？異常フローは安全に処理されるか？"),
      IMG(svg("Bug chức năng: nên & không nên", ["✗ 'Đặt hàng bị lỗi'", "✓ '[Thanh toán] tồn kho âm khi đặt đồng thời,", "  mong đợi chỉ 1 đơn thành công + ảnh'"], "#fb7185"),
        "So sánh cách báo lỗi chức năng mơ hồ và rõ ràng", "Vague vs clear ways to report a functional bug", "曖昧な機能バグ報告と明確な報告の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      e2_faq1.block, e2_faq2.block, e2_faq3.block,
      INTERNAL("Test giao diện (UI testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi"),
      INTERNAL("Cách viết test case cho người mới", "How to write test cases for beginners", "cach-viet-test-case-cho-nguoi-moi"),
    ] },
  QUIZ(e2_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa test chức năng luồng mua hàng của một sàn TMĐT thật: chuẩn bị dữ liệu, chạy luồng chính và luồng lỗi, kiểm cả kết quả nhìn thấy lẫn hệ quả phía sau, xử lý hai tình huống doanh nghiệp về tiền và tồn kho, rồi ghi nhận thành báo cáo có đánh dấu blocker. Đây là công việc lõi của một tester.",
        "You just functional-tested the buying flow of a real e-commerce site: prepared data, ran happy and negative flows, verified visible results and back-end effects, handled two enterprise situations about money and stock, then recorded a report marking blockers. This is a tester's core work.",
        "実際のECサイトの購入フローを機能テストしました：データ準備・主要と異常フロー・見える結果と裏の影響の検証・金銭と在庫の2つの企業シーン対応・ブロッカー明示の報告。これはテスターの中核業務です。"),
      P("Chặng tiếp theo là kiểm thử biểu mẫu & dữ liệu (đầu vào hợp lệ/không hợp lệ), rồi test tương thích và hồi quy trên dự án lớn. Nếu muốn thực hành trên dự án mô phỏng doanh nghiệp và thành thạo TestRail, Jira, Postman, một khoá học bài bản với người hướng dẫn sẽ giúp bạn tự tin ứng tuyển Tester.",
        "Next is form & data validation testing (valid/invalid inputs), then compatibility and regression on large projects. If you want to practice on enterprise-like projects and master TestRail, Jira and Postman, a structured course with a mentor helps you confidently apply for a Tester role.",
        "次はフォームとデータ検証（有効/無効入力）、そして大規模案件の互換性と回帰テストです。企業を模した案件で実践しTestRail・Jira・Postmanに習熟したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ENT_DOC2 = makeDoc({
  slug: "test-chuc-nang-functional-testing-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "test chức năng",
  keywords: ["test chức năng", "functional testing là gì", "kiểm thử chức năng", "test chức năng cho người mới"],
  coverLabel: "NGƯỜI MỚI · FUNCTIONAL · TMĐT",
  crumb: "Test chức năng (người mới)",
  metaTitle: { vi: "Test chức năng cho người mới (dự án TMĐT)", en: "Functional testing for beginners (e-commerce)", ja: "初心者向け機能テスト（EC案件）" },
  metaDescription: {
    vi: "Test chức năng cho người mới trên dự án TMĐT: luồng mua hàng, kiểm hệ quả phía sau, kịch bản mã giảm giá & tồn kho, công cụ TestRail/Jira, file report và trắc nghiệm.",
    en: "Functional testing for beginners on an e-commerce project: the buying flow, back-end effects, coupon & stock scenarios, TestRail/Jira/Postman, report file and a quiz.",
    ja: "初心者向け機能テストをEC案件で：購入フロー・裏の影響・クーポンと在庫シナリオ・TestRail/Jira/Postman・レポート・クイズ。",
  },
  title: {
    vi: "Test chức năng (functional testing) cho người mới: dự án TMĐT, kịch bản & file report (có trắc nghiệm)",
    en: "Functional testing for beginners: an e-commerce project, scenarios & report file (with quiz)",
    ja: "初心者向け機能テスト：EC案件・シナリオ・レポート（クイズ付き）",
  },
  summary: {
    vi: "Bài thực hành cho người mới: test chức năng trên dự án TMĐT. Luồng nghiệp vụ là gì, chiến lược happy/negative, các bước, kiểm hệ quả phía sau, hai tình huống doanh nghiệp (mã giảm giá tính sai, bán vượt tồn kho), công cụ TestRail/Jira/Postman, cách ghi nhận & file report, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Hands-on beginner article: functional testing on an e-commerce project. What a business flow is, happy/negative strategy, steps, back-end effects, two enterprise situations (miscalculated coupon, overselling), TestRail/Jira/Postman, recording & report file, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け実践：EC案件の機能テスト。業務フロー・主要/異常戦略・手順・裏の影響・2つの企業シーン・TestRail/Jira/Postman・記録とレポート・FAQ・クイズ。",
  },
  faqs: [e2_faq1, e2_faq2, e2_faq3],
  howTo: { name: "Cách test chức năng cho người mới trên dự án TMĐT", steps: [
    { name: "Chuẩn bị dữ liệu & tiền đề", text: "Tài khoản test, sản phẩm còn hàng, mã giảm giá hợp lệ." },
    { name: "Chạy luồng chính rồi luồng lỗi", text: "Kiểm cả kết quả nhìn thấy và hệ quả phía sau (đơn, email, tồn kho)." },
    { name: "Ghi nhận & báo cáo", text: "Ca Fail mở ticket Jira, đánh dấu blocker trong báo cáo cuối sprint." },
  ] },
  pages: e2_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 3 — Kiểm thử form & dữ liệu (form validation) cho người mới · Dự án Bảo hiểm
// ══════════════════════════════════════════════════════════════════════════════════════
const e3_faq1 = FAQ(
  "Kiểm thử form (form validation) là gì?", "What is form validation testing?",
  "Kiểm thử form là kiểm các biểu mẫu nhập liệu có nhận đúng dữ liệu hợp lệ, chặn đúng dữ liệu sai và báo lỗi rõ ràng hay không. Nó bao gồm kiểm ràng buộc bắt buộc, định dạng (email, số điện thoại, ngày), độ dài, và quan hệ giữa các trường.",
  "Form validation testing checks whether input forms accept valid data, reject invalid data and show clear errors. It covers required constraints, formats (email, phone, date), length, and relationships between fields.",
  "フォーム検証（バリデーション）テストとは？",
  "フォーム検証テストは、入力フォームが有効データを受理し、無効データを拒否し、明確なエラーを表示するかを検証します。必須制約・形式（メール・電話・日付）・長さ・項目間関係を含みます。");
const e3_faq2 = FAQ(
  "Ở dự án bảo hiểm, vì sao kiểm thử form lại đặc biệt quan trọng?", "Why is form validation testing especially important on an insurance project?",
  "Vì hồ sơ bảo hiểm dựa hoàn toàn vào dữ liệu khách nhập: sai ngày sinh, sai số CMND/CCCD, sai số tiền bảo hiểm đều dẫn tới hợp đồng sai, tính phí sai và rắc rối pháp lý khi bồi thường. Form chặn dữ liệu sai ngay từ đầu chính là tuyến phòng thủ đầu tiên bảo vệ tính đúng đắn của hợp đồng.",
  "Because insurance records rely entirely on customer-entered data: a wrong birth date, ID number or sum insured leads to wrong contracts, wrong premiums and legal trouble at claim time. A form that blocks bad data upfront is the first line of defense protecting contract correctness.",
  "保険案件でフォーム検証が特に重要な理由は？",
  "保険記録は顧客入力データに全面依存するためです：誤った生年月日・身分証番号・保険金額は誤った契約・保険料・請求時の法的問題を招きます。不正データを入口で防ぐフォームは契約の正しさを守る第一防衛線です。");
const e3_faq3 = FAQ(
  "Người mới kiểm thử form nên chú ý dữ liệu gì?", "What data should beginners focus on in form testing?",
  "Chú ý ba nhóm: dữ liệu hợp lệ (phải nhận), dữ liệu không hợp lệ (phải chặn: sai định dạng, để trống ô bắt buộc, vượt độ dài), và dữ liệu biên/đặc biệt (ngày 29/02, ký tự tiếng Việt có dấu, khoảng trắng thừa, dán dữ liệu). Chuẩn bị sẵn một bộ dữ liệu test cho từng nhóm sẽ giúp bạn chạy nhanh và không bỏ sót.",
  "Focus on three groups: valid data (must be accepted), invalid data (must be blocked: wrong format, empty required fields, over length), and boundary/special data (Feb 29, accented Vietnamese, extra spaces, pasted data). Preparing a test data set per group helps you run fast and miss nothing.",
  "初心者はフォームテストでどのデータに注目すべき？",
  "3群に注目：有効データ（受理必須）、無効データ（拒否必須：形式誤り・必須空欄・長さ超過）、境界/特殊データ（2/29・ベトナム語のアクセント・余分な空白・貼り付け）。群ごとにテストデータを準備すると速く漏れなく実行できます。");

const e3_quiz = [
  mcq({
    q: { vi: "Kiểm thử form chủ yếu kiểm điều gì?", en: "What does form validation testing mainly check?", ja: "フォーム検証テストは主に何を検証する？" },
    options: [
      { vi: "Tốc độ tải trang", en: "Page load speed", ja: "ページ読込速度" },
      { vi: "Form nhận đúng dữ liệu hợp lệ, chặn dữ liệu sai và báo lỗi rõ", en: "Form accepts valid, blocks invalid and shows clear errors", ja: "有効受理・無効拒否・明確なエラー表示" },
      { vi: "Màu sắc thương hiệu", en: "Brand colors", ja: "ブランド色" },
      { vi: "Số lượng máy chủ", en: "Number of servers", ja: "サーバー数" },
    ], correct: 1,
    explain: { vi: "Trọng tâm là ràng buộc dữ liệu: hợp lệ được nhận, sai bị chặn với thông báo rõ.", en: "The focus is data constraints: valid accepted, invalid blocked with clear messages.", ja: "焦点はデータ制約：有効は受理、無効は明確な通知で拒否。" },
  }),
  mcq({
    q: { vi: "Ô 'Ngày sinh' của hồ sơ bảo hiểm nên kiểm giá trị đặc biệt nào?", en: "Which special value should you test for an insurance 'Date of birth' field?", ja: "保険の『生年月日』欄で検証すべき特殊値は？" },
    options: [
      { vi: "Ngày 29/02 của năm không nhuận", en: "Feb 29 of a non-leap year", ja: "非閏年の2/29" },
      { vi: "Chỉ ngày hôm nay", en: "Only today", ja: "今日だけ" },
      { vi: "Không cần kiểm gì đặc biệt", en: "No special value", ja: "特殊値不要" },
      { vi: "Màu của ô nhập", en: "The field color", ja: "欄の色" },
    ], correct: 0,
    explain: { vi: "29/02 năm không nhuận là ngày không tồn tại — form phải chặn và báo lỗi.", en: "Feb 29 in a non-leap year doesn't exist — the form must block and error.", ja: "非閏年の2/29は存在しない日 — フォームは拒否しエラー表示すべきです。" },
  }),
  mcq({
    q: { vi: "Dữ liệu 'không hợp lệ' cần kiểm gồm những gì?", en: "What counts as 'invalid' data to test?", ja: "検証すべき『無効』データとは？" },
    options: [
      { vi: "Sai định dạng, để trống ô bắt buộc, vượt độ dài cho phép", en: "Wrong format, empty required fields, over max length", ja: "形式誤り・必須空欄・最大長超過" },
      { vi: "Chỉ dữ liệu đúng", en: "Only correct data", ja: "正しいデータのみ" },
      { vi: "Không có loại nào", en: "None", ja: "なし" },
      { vi: "Chỉ dữ liệu rỗng", en: "Only empty data", ja: "空データのみ" },
    ], correct: 0,
    explain: { vi: "Dữ liệu không hợp lệ gồm sai định dạng, thiếu ô bắt buộc và vượt ràng buộc độ dài.", en: "Invalid data includes wrong formats, missing required fields and length-limit breaches.", ja: "無効データは形式誤り・必須欠落・長さ制約違反を含みます。" },
  }),
  mcq({
    q: { vi: "Vì sao nên kiểm quan hệ giữa các trường (ví dụ ngày kết thúc >= ngày bắt đầu)?", en: "Why test relationships between fields (e.g. end date >= start date)?", ja: "なぜ項目間関係（例：終了日>=開始日）を検証する？" },
    options: [
      { vi: "Vì đẹp mắt", en: "For looks", ja: "見栄えのため" },
      { vi: "Vì dữ liệu từng ô đúng nhưng kết hợp có thể vô lý, gây hợp đồng sai", en: "Each field can be valid but the combination illogical, causing wrong contracts", ja: "各欄は有効でも組合せが不合理で契約が誤るから" },
      { vi: "Vì không cần thiết", en: "It's unnecessary", ja: "不要だから" },
      { vi: "Vì máy yêu cầu", en: "The machine demands it", ja: "機械が要求するから" },
    ], correct: 1,
    explain: { vi: "Kiểm quan hệ giúp bắt lỗi logic mà kiểm từng ô riêng lẻ không thấy.", en: "Relationship checks catch logic bugs single-field checks miss.", ja: "関係検証は単独欄では見えないロジックバグを捉えます。" },
  }),
];

const e3_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì trên dự án bảo hiểm", en: "1. TL;DR & what you'll do on an insurance project", ja: "1. 要点と保険案件でできること" },
    blocks: [
      TLDR("Kiểm thử form là kiểm biểu mẫu nhận đúng dữ liệu hợp lệ và chặn dữ liệu sai. Bài này gắn với form mở hồ sơ bảo hiểm: bạn chuẩn bị bộ dữ liệu test, chạy ca hợp lệ/không hợp lệ/biên, kiểm quan hệ giữa các trường, ghi test case và mở lỗi Jira. Cuối bài có trắc nghiệm.",
        "Form validation testing checks forms accept valid data and block invalid data. This ties to an insurance application form: you prepare a test data set, run valid/invalid/boundary cases, check field relationships, record test cases and file Jira bugs. A quiz at the end.",
        "フォーム検証テストはフォームが有効データを受理し無効を拒否するか検証します。本記事は保険申込フォームに沿い、テストデータ準備・有効/無効/境界ケース・項目間関係・テストケース記録・Jira起票を学びます。最後にクイズ付き。"),
      P("Kiểm thử form cho người mới là điểm bắt đầu tuyệt vời vì nó áp dụng trực tiếp các kỹ thuật thiết kế ca như phân vùng và giá trị biên vào một màn hình thật. Ở bài này ta bước vào dự án bảo hiểm — nơi dữ liệu sai một ly có thể đi một dặm — mở form khai hồ sơ và test như một tester đi làm. Bài đi từ con số 0, có hình mô phỏng, ví dụ thật và trắc nghiệm cuối bài.",
        "Form validation testing is a great starting point for beginners because it directly applies case-design techniques like partitioning and boundaries to a real screen. Here we step into an insurance project — where a tiny data error can go a long way — open the application form and test like a working tester. It starts from zero with mocks, real examples and a final quiz.",
        "フォーム検証テストは、区分や境界値などの設計技法を実画面に直接適用でき初心者に最適です。本記事は保険案件（データの僅かな誤りが大きな影響を生む）に入り、申込フォームを実務のように検証します。ゼロから、モック・実例・クイズ付きで解説します。"),
      IMG(screen("BaoAn — Hồ sơ tham gia bảo hiểm", ["Họ tên *  |  Ngày sinh * (dd/mm/yyyy)", "Số CCCD *  |  Số điện thoại *", "Số tiền bảo hiểm *  |  Ngày hiệu lực *", "[ Gửi hồ sơ ]   * = bắt buộc"], "#8b5cf6"),
        "Màn hình test: form mở hồ sơ bảo hiểm BaoAn", "Screen under test: the BaoAn insurance application form", "テスト対象画面：BaoAn保険申込フォーム"),
      DEF("Kiểm thử form (form validation)", "kiểm biểu mẫu nhận đúng dữ liệu hợp lệ, chặn dữ liệu sai và báo lỗi rõ theo ràng buộc.",
        "form validation testing — checking a form accepts valid data, blocks invalid data and shows clear errors per constraints.",
        "フォーム検証テスト — フォームが有効データを受理し無効を拒否し制約どおり明確なエラーを表示するか検証すること。"),
    ] },
  { heading: { vi: "2. Ràng buộc dữ liệu là gì & kiểm những nhóm nào", en: "2. What data constraints are & which groups to test", ja: "2. データ制約とは・検証する群" },
    blocks: [
      P("Mỗi ô trong form đều có 'luật' của nó, gọi là ràng buộc: ô này bắt buộc hay không, nhận định dạng gì, dài tối đa bao nhiêu, giá trị nằm trong khoảng nào. Kiểm thử form chính là kiểm form có thực thi đúng các luật đó không.",
        "Each form field has its 'rules', called constraints: is it required, what format it accepts, its max length, its value range. Form testing is checking the form enforces those rules correctly.",
        "各フォーム欄には制約という『規則』があります：必須か・受理形式・最大長・値域。フォームテストはその規則を正しく強制するか検証することです。"),
      DEF("Ràng buộc (constraint)", "luật áp lên một ô nhập: bắt buộc, định dạng, độ dài, khoảng giá trị.",
        "a constraint — a rule on an input field: required, format, length, value range.",
        "制約 — 入力欄への規則：必須・形式・長さ・値域。"),
      P("Người mới nên kiểm ba nhóm dữ liệu. Nhóm hợp lệ: dữ liệu đúng luật, form phải nhận. Nhóm không hợp lệ: sai định dạng, để trống ô bắt buộc, vượt độ dài — form phải chặn và báo lỗi rõ. Nhóm biên/đặc biệt: các giá trị ở ranh giới hoặc dễ gây lỗi như ngày 29/02, tên có dấu tiếng Việt, khoảng trắng thừa, dán dữ liệu từ clipboard. Ngoài ra còn một loại đặc biệt: quan hệ giữa các trường, ví dụ ngày hiệu lực không được trước ngày hôm nay.",
        "Beginners should test three data groups. Valid: correct data the form must accept. Invalid: wrong format, empty required fields, over length — the form must block with clear errors. Boundary/special: edge or tricky values like Feb 29, accented Vietnamese names, extra spaces, pasted data. Plus a special kind: relationships between fields, e.g. the effective date can't be before today.",
        "初心者は3群を検証。有効：受理必須の正しいデータ。無効：形式誤り・必須空欄・長さ超過 — 明確なエラーで拒否必須。境界/特殊：2/29・ベトナム語アクセント名・余分な空白・貼り付けなど。加えて特殊種：項目間関係、例：効力発生日は今日より前不可。"),
      IMG(svg("3 nhóm dữ liệu cần kiểm cho form", ["Hợp lệ: đúng luật -> phải NHẬN", "Không hợp lệ: sai định dạng/trống/quá dài -> phải CHẶN", "Biên & đặc biệt: 29/02, dấu tiếng Việt, khoảng trắng", "+ Quan hệ trường: ngày hiệu lực >= hôm nay"], "#22d3ee"),
        "Ba nhóm dữ liệu và kiểm quan hệ giữa các trường", "Three data groups plus field-relationship checks", "3つのデータ群と項目間関係の検証"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án doanh nghiệp", en: "3. Why it matters on an enterprise project", ja: "3. 企業案件で重要な理由" },
    blocks: [
      P("Ở một công ty bảo hiểm, toàn bộ hợp đồng và quyền lợi khách hàng được xây trên dữ liệu nhập vào form. Nếu form cho qua một ngày sinh sai hay số CCCD thiếu số, dữ liệu lỗi đó sẽ chảy vào hệ thống, sinh ra hợp đồng sai, tính phí sai, và bùng phát thành tranh chấp đúng lúc khách cần bồi thường nhất.",
        "At an insurance company, all contracts and customer benefits are built on form-entered data. If the form lets a wrong birth date or a short ID number pass, that bad data flows into the system, creates wrong contracts, wrong premiums, and erupts into disputes exactly when the customer most needs a claim.",
        "保険会社では全契約と顧客利益がフォーム入力データ上に築かれます。誤った生年月日や桁不足の身分証番号を通せば、不正データがシステムに流入し、誤った契約・保険料を生み、請求が最も必要な時に紛争化します。"),
      P("Vì thế form chính là 'cổng kiểm soát chất lượng dữ liệu' đầu tiên. Chặn được dữ liệu sai ngay tại đây rẻ hơn rất nhiều so với sửa hậu quả về sau. Người mới kiểm thử form ở bảo hiểm vì vậy đang đứng gác ở vị trí có tác động lớn nhất tới độ tin cậy của cả hệ thống.",
        "So the form is the first 'data quality gate'. Blocking bad data right here is far cheaper than fixing consequences later. A beginner testing forms in insurance thus stands guard at the point with the biggest impact on the whole system's reliability.",
        "したがってフォームは最初の『データ品質ゲート』です。不正データをここで防ぐ方が後の是正よりはるかに安価です。保険でフォームを検証する初心者は、システム全体の信頼性に最大の影響を持つ位置に立ちます。"),
      P("Ngoài ra, dữ liệu cá nhân trong bảo hiểm còn chịu quy định bảo vệ dữ liệu. Form phải xử lý đúng các trường nhạy cảm và không để lộ thông báo lỗi tiết lộ thông tin. Người mới nắm được điều này sẽ test có chiều sâu hơn là chỉ 'nhập bừa xem có báo lỗi không'.",
        "Also, personal data in insurance is subject to data-protection rules. The form must handle sensitive fields correctly and not leak information through error messages. Beginners who grasp this test with more depth than just 'type randomly to see errors'.",
        "さらに保険の個人データはデータ保護規制の対象です。フォームは機微項目を正しく扱い、エラー表示で情報を漏らしてはいけません。これを理解する初心者は『適当に入力してエラーを見る』より深く検証できます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: bộ dữ liệu test & công cụ", en: "4. Prepare: a test data set & tools", ja: "4. 準備：テストデータとツール" },
    blocks: [
      P("Bí quyết test form nhanh và đủ là chuẩn bị sẵn một 'bộ dữ liệu test' cho mỗi ô. Có sẵn dữ liệu, bạn chỉ việc dán vào và quan sát phản ứng của form.",
        "The trick to fast, thorough form testing is preparing a 'test data set' for each field in advance. With data ready, you just paste it in and watch the form react.",
        "速く網羅的なフォームテストの秘訣は、各欄用の『テストデータ』を事前準備することです。データがあれば貼り付けて反応を見るだけです。"),
      STEP(1, "Với mỗi ô, liệt kê sẵn dữ liệu 3 nhóm: hợp lệ, không hợp lệ, biên/đặc biệt.", "For each field, pre-list data for 3 groups: valid, invalid, boundary/special.", "各欄に3群のデータを事前列挙：有効・無効・境界/特殊。"),
      STEP(2, "Mở bảng test case (TestRail/Excel) và Jira; dùng DevTools để xem thông báo lỗi hiển thị đúng chỗ.", "Open TestRail/Excel and Jira; use DevTools to check error messages appear correctly.", "TestRail/ExcelとJiraを開き、DevToolsでエラー表示位置を確認。"),
      TRY("Chọn ô 'Số điện thoại' trên một form bạn biết, viết sẵn 5 mẫu dữ liệu: đúng, thiếu số, thừa số, có chữ, có khoảng trắng.", "Pick a 'Phone' field on a form you know, pre-write 5 data samples: valid, too few, too many, with letters, with spaces.", "知っているフォームの『電話』欄に5サンプルを事前記述：有効・桁不足・桁過多・文字入り・空白入り。"),
      PITFALL("Chỉ nhập dữ liệu đẹp để thấy 'thành công' — bỏ hết dữ liệu xấu thì không bao giờ phát hiện form thiếu ràng buộc.", "Only entering clean data to see 'success' — skipping bad data means never finding missing constraints.", "きれいなデータだけ入れて『成功』を見る — 不正データを飛ばすと制約漏れを発見できません。"),
      IMG(screen("Bộ dữ liệu test cho ô CCCD", ["Hợp lệ: 079201001234 (12 số)", "Sai: 07920100 (thiếu số) -> phải chặn", "Sai: 079201001234A (có chữ) -> phải chặn", "Biên: 11 số / 13 số -> phải chặn"], "#34d399"),
        "Ví dụ bộ dữ liệu test đã chuẩn bị cho ô số CCCD", "An example prepared test data set for the ID-number field", "身分証番号欄用の準備済みテストデータ例"),
    ] },
  { heading: { vi: "5. Chiến lược & các bước kiểm thử form", en: "5. Strategy & steps for form testing", ja: "5. フォームテストの戦略と手順" },
    blocks: [
      P("Chiến lược: đi từng ô một cách có hệ thống (hợp lệ trước, rồi các loại không hợp lệ), sau đó kiểm quan hệ giữa các ô, và cuối cùng thử gửi cả form với tổ hợp lỗi. Cách này bảo đảm phủ đủ mà không rối.",
        "Strategy: go field by field systematically (valid first, then invalid types), then check relationships between fields, and finally try submitting the whole form with error combinations. This ensures coverage without chaos.",
        "戦略：各欄を体系的に（有効→各無効型）、次に欄間関係、最後にエラー組合せでフォーム全体を送信。混乱なく網羅します。"),
      STEP(1, "Kiểm từng ô: nhập dữ liệu hợp lệ (phải nhận), rồi lần lượt các dữ liệu sai (phải chặn + báo rõ).", "Test each field: valid data (accept), then each invalid data (block + clear error).", "各欄検証：有効（受理）、次に各無効（拒否＋明確なエラー）。"),
      STEP(2, "Kiểm giá trị biên & đặc biệt: 29/02, tên có dấu, khoảng trắng đầu/cuối, dán dữ liệu.", "Test boundary & special: Feb 29, accented names, leading/trailing spaces, pasted data.", "境界・特殊検証：2/29・アクセント名・前後空白・貼り付け。"),
      STEP(3, "Kiểm quan hệ trường & gửi form: bỏ trống ô bắt buộc, ngày hiệu lực trước hôm nay.", "Test field relationships & submit: empty required, effective date before today.", "項目間関係と送信検証：必須空欄・効力日が今日より前。"),
      CODE("text", "KỊCH BẢN: Kiểm form Hồ sơ bảo hiểm BaoAn — ô 'Ngày sinh' & 'Ngày hiệu lực'\nTC-FORM-01 Hợp lệ    : 15/03/1990        -> nhận, không lỗi\nTC-FORM-02 Sai định dạng: 1990-03-15      -> báo 'Ngày sinh phải theo dd/mm/yyyy'\nTC-FORM-03 Đặc biệt   : 29/02/2001 (không nhuận) -> báo 'Ngày không hợp lệ'\nTC-FORM-04 Trống      : để trống ô bắt buộc -> báo 'Vui lòng nhập ngày sinh'\nTC-FORM-05 Quan hệ    : ngày hiệu lực = hôm qua -> báo 'Ngày hiệu lực phải từ hôm nay'"),
      TRY("Tự thiết kế 4 ca cho ô 'Số tiền bảo hiểm' (gợi ý: dưới mức tối thiểu, đúng, vượt mức tối đa, nhập chữ).", "Design 4 cases for the 'Sum insured' field (hint: below min, valid, above max, letters).", "『保険金額』欄に4ケース設計（ヒント：最小未満・有効・最大超・文字）。"),
    ] },
  { heading: { vi: "6. Tình huống doanh nghiệp 1: ngày sinh không tồn tại", en: "6. Enterprise situation 1: a non-existent birth date", ja: "6. 企業シーン1：存在しない生年月日" },
    blocks: [
      SITUATION("Bạn test ô 'Ngày sinh' của form hồ sơ bảo hiểm BaoAn.", "You test the 'Date of birth' field on the BaoAn insurance form.",
        "Khi nhập 31/04/1995 (tháng 4 không có ngày 31) hoặc 29/02/2001 (năm không nhuận), form vẫn nhận và cho gửi hồ sơ, tạo ra một khách hàng có ngày sinh không tồn tại.",
        "Entering 31/04/1995 (April has no 31st) or 29/02/2001 (non-leap year), the form still accepts it and allows submission, creating a customer with a non-existent birth date.",
        "BaoAn保険フォームの『生年月日』欄を検証する。", "31/04/1995（4月に31日なし）や29/02/2001（非閏年）を入力しても受理・送信でき、存在しない生年月日の顧客が作られます。"),
      SOLVE("Ghi nhận là lỗi thiếu ràng buộc ngày hợp lệ, nêu nhiều ví dụ để lập trình viên bao quát.", "Record it as a missing valid-date constraint, give multiple examples for developers to cover.", "有効日制約の欠落バグとして記録し、開発者が網羅できるよう複数例を示す。"),
      P("Đây là lỗi ràng buộc dữ liệu điển hình. Khi ghi nhận, bạn không chỉ nêu một trường hợp mà đưa vài ví dụ đại diện (31/04, 29/02 năm không nhuận, 00/00/0000) để lập trình viên hiểu cần chặn cả một lớp giá trị, không phải chỉ một con số. Kèm ảnh chụp form đã nhận dữ liệu sai.",
        "This is a classic data-constraint bug. When recording, don't state just one case but give several representative examples (31/04, Feb 29 non-leap, 00/00/0000) so developers understand they must block a whole class of values, not one number. Attach a screenshot of the form accepting bad data.",
        "これは典型的なデータ制約バグです。記録時は1例でなく代表例（31/04・非閏年2/29・00/00/0000）を示し、単一値でなく値の一群を拒否すべきと開発者に伝えます。不正データ受理のスクショを添付します。"),
      CODE("text", "JIRA BUG — INS-3120\nTiêu đề: [Hồ sơ] Ô 'Ngày sinh' nhận ngày không tồn tại (31/04, 29/02 năm không nhuận)\nMôi trường: Chrome 126 / web BaoAn / form Hồ sơ tham gia\nBước: 1) Mở form 2) Nhập Ngày sinh = 31/04/1995 3) Gửi hồ sơ\nThực tế: form nhận và gửi thành công với ngày không tồn tại\nMong đợi: báo 'Ngày sinh không hợp lệ' và chặn gửi\nVí dụ cần chặn: 31/04, 29/02/2001, 00/00/0000, 32/01/1990\nSeverity: High  |  Priority: High\nBằng chứng: ins3120_invalid_dob.png"),
      RECAP(["Lỗi ràng buộc -> nêu nhiều ví dụ đại diện", "Chặn cả LỚP giá trị sai, không chỉ 1 số"],
        ["Constraint bug -> give several representative examples", "Block the whole CLASS of bad values, not one number"],
        ["制約バグ -> 複数の代表例を提示", "1値でなく不正値の群全体を拒否"]),
    ] },
  { heading: { vi: "7. Tình huống doanh nghiệp 2: khoảng trắng & dán dữ liệu", en: "7. Enterprise situation 2: spaces & pasted data", ja: "7. 企業シーン2：空白と貼り付けデータ" },
    blocks: [
      SITUATION("Khách dán số CCCD từ file Word vào form, kèm khoảng trắng thừa.", "A customer pastes their ID number from a Word file, with extra spaces.",
        "Khi dán ' 079201001234 ' (có dấu cách đầu/cuối) hoặc '0792 0100 1234' (có khoảng trắng giữa), form báo lỗi 'CCCD không hợp lệ' dù về bản chất số là đúng.",
        "Pasting ' 079201001234 ' (leading/trailing spaces) or '0792 0100 1234' (spaces inside), the form errors 'Invalid ID' though the number is essentially correct.",
        "顧客がWordから身分証番号を貼り付け、余分な空白付き。", "' 079201001234 '（前後空白）や'0792 0100 1234'（間の空白）を貼ると、番号は実質正しいのに『無効』と表示されます。"),
      SOLVE("Xác định form nên tự loại khoảng trắng thừa (trim) trước khi kiểm; ghi nhận trải nghiệm gây khó cho khách.", "Determine the form should trim extra spaces before validating; record the poor customer experience.", "検証前に余分な空白を除去（trim）すべきと判断し、顧客体験の悪さを記録。"),
      P("Đây là lỗi rất thật vì người dùng hay sao chép dữ liệu từ nơi khác. Về mặt trải nghiệm, bắt khách tự xoá khoảng trắng là thiếu thân thiện — form nên tự cắt (trim) khoảng trắng đầu/cuối trước khi kiểm. Bạn ghi nhận rõ dữ liệu dán vào, kết quả hiện tại và hành vi mong đợi, kèm ảnh.",
        "This is very real because users often copy data from elsewhere. Experience-wise, forcing customers to remove spaces is unfriendly — the form should trim leading/trailing spaces before validating. You record the pasted data, current result and expected behavior, with a screenshot.",
        "利用者は他所からデータをコピーしがちで非常に現実的です。体験面で顧客に空白除去を強いるのは不親切 — フォームは検証前に前後空白をtrimすべきです。貼り付けデータ・現状結果・期待挙動をスクショ付きで記録します。"),
      CODE("text", "JIRA BUG — INS-3155\nTiêu đề: [Hồ sơ] Ô CCCD không tự loại khoảng trắng khi dán, báo lỗi nhầm số hợp lệ\nMôi trường: Chrome 126 / web BaoAn\nBước: 1) Copy ' 079201001234 ' từ Word 2) Dán vào ô CCCD 3) Gửi\nThực tế: báo 'CCCD không hợp lệ' vì có khoảng trắng đầu/cuối\nMong đợi: form tự cắt khoảng trắng đầu/cuối rồi chấp nhận số 12 chữ số hợp lệ\nSeverity: Medium  |  Priority: Medium\nBằng chứng: ins3155_trim_space.png"),
      IMG(svg("Khoảng trắng khi dán dữ liệu", ["Dán: ' 079201001234 '  (có dấu cách)", "Thực tế: báo lỗi 'CCCD không hợp lệ'", "Mong đợi: tự trim -> chấp nhận số hợp lệ"], "#f472b6"),
        "Minh hoạ lỗi form không tự loại khoảng trắng khi dán", "Illustration of a form not trimming spaces on paste", "貼り付け時に空白を除去しないフォームの図"),
      TRY("Thử dán một số điện thoại có khoảng trắng vào một form bất kỳ, xem form có tự xử lý không.", "Try pasting a phone number with spaces into any form and see if it self-handles.", "任意のフォームに空白付き電話番号を貼り、自動処理されるか確認しよう。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report: chất lượng dữ liệu form", en: "8. Recording & the report file: form data quality", ja: "8. 記録とレポート：フォームのデータ品質" },
    blocks: [
      P("Báo cáo kiểm thử form nên cho thấy từng ô đã kiểm những nhóm dữ liệu nào, ràng buộc nào còn thiếu, và mức rủi ro. Vì bảo hiểm nhạy cảm về dữ liệu, mỗi lỗi thiếu ràng buộc đều đáng lưu ý.",
        "A form testing report should show which data groups each field was tested against, which constraints are missing, and the risk level. Because insurance is data-sensitive, each missing-constraint bug is noteworthy.",
        "フォームテスト報告は、各欄をどのデータ群で検証したか、どの制約が欠けるか、リスク度を示すべきです。保険はデータに敏感なため、各制約欠落バグは重要です。"),
      STEP(1, "Lập bảng: mỗi ô × các nhóm dữ liệu (hợp lệ/không hợp lệ/biên/quan hệ), đánh Pass/Fail.", "Build a matrix: each field × data groups (valid/invalid/boundary/relationship), mark Pass/Fail.", "表を作成：各欄×データ群（有効/無効/境界/関係）、合否を付ける。"),
      STEP(2, "Gắn mã ticket cho ô Fail và nêu ràng buộc còn thiếu.", "Attach ticket IDs to failed cells and note the missing constraints.", "Failセルにチケット番号を付け、欠落制約を明記。"),
      CODE("text", "BÁO CÁO KIỂM THỬ FORM — Hồ sơ bảo hiểm BaoAn — Sprint 12\nNgười test: (bạn)  |  Ngày: 07/07  |  Môi trường: web test.baoan\nÔ           | Hợp lệ | Sai định dạng | Trống | Biên/Đặc biệt | Quan hệ\nHọ tên      |  PASS  |     PASS      | PASS  |     PASS       |   -\nNgày sinh   |  PASS  |     PASS      | PASS  |  FAIL INS-3120 |  PASS\nSố CCCD     |  PASS  |     PASS      | PASS  |  FAIL INS-3155 |   -\nNgày hiệu lực|  PASS  |     PASS      | PASS  |     PASS       |  PASS\nTổng: 18 ca | Pass 16 | Fail 2 | Rủi ro: dữ liệu ngày sinh sai có thể vào hợp đồng."),
      IMG(screen("Ma trận kiểm thử form (TestRail)", ["Ngày sinh — Biên/Đặc biệt ...... FAIL -> INS-3120", "Số CCCD — Dán/khoảng trắng ..... FAIL -> INS-3155", "Họ tên — Tất cả nhóm ........... PASS", "Số tiền bảo hiểm — Biên ........ PASS"], "#8b5cf6"),
        "Ma trận ghi nhận kiểm thử form theo ô và nhóm dữ liệu", "A form test matrix by field and data group", "欄とデータ群別のフォームテスト行列"),
      TIP("Trình bày kết quả dạng ma trận ô × nhóm dữ liệu — người quản lý thấy ngay ô nào còn 'lỗ hổng' ràng buộc.", "Present results as a field × data-group matrix — managers instantly see which field has a constraint 'gap'.", "結果を欄×データ群の行列で提示 — 管理者はどの欄に制約の『穴』があるか即座に把握できます。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp của người mới & mẹo", en: "9. Common beginner mistakes & tips", ja: "9. 初心者のよくある失敗とコツ" },
    blocks: [
      P("Khi mới kiểm thử form, người mới hay mắc vài lỗi giống nhau. Biết trước giúp bạn kiểm sâu và bắt được những lỗ hổng ràng buộc mà người khác bỏ qua.",
        "When new to form testing, beginners make a few common mistakes. Knowing them helps you test deeply and catch constraint gaps others miss.",
        "フォームテストに不慣れな新人は共通の失敗をします。事前に知れば深く検証し、他者が見逃す制約の穴を捉えられます。"),
      PITFALL("Chỉ kiểm dữ liệu hợp lệ — form thiếu ràng buộc sẽ 'lọt lưới' vì bạn không bao giờ thử dữ liệu sai.", "Only testing valid data — missing constraints slip through because you never try bad data.", "有効データだけ検証 — 不正データを試さず制約欠落が漏れます。"),
      PITFALL("Quên các giá trị đặc biệt: khoảng trắng, dấu tiếng Việt, dán dữ liệu, ngày không tồn tại.", "Forgetting special values: spaces, Vietnamese accents, pasted data, non-existent dates.", "特殊値を忘れる：空白・ベトナム語アクセント・貼り付け・存在しない日付。"),
      TIP("Với mỗi ô, luôn thử đủ 3 nhóm dữ liệu + kiểm thông báo lỗi có rõ ràng, đúng chỗ và không tiết lộ thông tin nhạy cảm.", "For each field, always try all 3 data groups + check the error is clear, in the right place and leaks no sensitive info.", "各欄で常に3群を試し、エラーが明確・適所・機微情報を漏らさないか確認。"),
      IMG(svg("Bug form: nên & không nên", ["✗ 'Form bị lỗi ngày sinh'", "✓ '[Hồ sơ] nhận 31/04, 29/02 năm không nhuận,", "  mong đợi chặn cả lớp ngày không tồn tại + ảnh'"], "#fb7185"),
        "So sánh cách báo lỗi form mơ hồ và rõ ràng", "Vague vs clear ways to report a form bug", "曖昧なフォームバグ報告と明確な報告の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      e3_faq1.block, e3_faq2.block, e3_faq3.block,
      INTERNAL("Test chức năng cho người mới (dự án TMĐT)", "Functional testing for beginners (e-commerce project)", "test-chuc-nang-functional-testing-cho-nguoi-moi"),
      INTERNAL("Phân vùng tương đương & giá trị biên cho người mới", "Equivalence partitioning & boundary values for beginners", "phan-vung-tuong-duong-gia-tri-bien-cho-nguoi-moi"),
    ] },
  QUIZ(e3_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa kiểm thử form của một dự án bảo hiểm thật: chuẩn bị bộ dữ liệu test, chạy ba nhóm dữ liệu và kiểm quan hệ giữa các trường, xử lý hai tình huống doanh nghiệp về ngày không tồn tại và khoảng trắng khi dán, rồi ghi nhận thành ma trận báo cáo. Đây là kỹ năng canh giữ chất lượng dữ liệu đầu vào.",
        "You just form-tested a real insurance project: prepared a test data set, ran three data groups and field-relationship checks, handled two enterprise situations about non-existent dates and pasted spaces, then recorded a report matrix. This is the skill of guarding input data quality.",
        "実際の保険案件のフォームを検証しました：テストデータ準備・3群と項目間関係の検証・存在しない日付と貼り付け空白の2つの企業シーン対応・報告行列の記録。これは入力データ品質を守るスキルです。"),
      P("Chặng tiếp theo là test tương thích trên nhiều thiết bị/trình duyệt, rồi kiểm thử hồi quy sau mỗi lần cập nhật. Nếu muốn thực hành trên dự án mô phỏng doanh nghiệp và áp dụng thành thạo các kỹ thuật thiết kế dữ liệu test, một khoá học bài bản với người hướng dẫn sẽ giúp bạn tiến nhanh và tự tin ứng tuyển Tester.",
        "Next is compatibility testing across devices/browsers, then regression testing after each update. If you want to practice on enterprise-like projects and master test-data design techniques, a structured course with a mentor helps you progress fast and confidently apply for a Tester role.",
        "次は複数端末/ブラウザの互換性テスト、そして更新ごとの回帰テストです。企業を模した案件で実践しテストデータ設計技法に習熟したいなら、体系的コースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const ENT_DOC3 = makeDoc({
  slug: "kiem-thu-form-du-lieu-cho-nguoi-moi",
  domain: "insurance",
  primaryKeyword: "kiểm thử form",
  keywords: ["kiểm thử form", "form validation testing", "kiểm thử dữ liệu đầu vào", "test biểu mẫu cho người mới"],
  coverLabel: "NGƯỜI MỚI · FORM VALIDATION · BẢO HIỂM",
  crumb: "Kiểm thử form & dữ liệu (người mới)",
  metaTitle: { vi: "Kiểm thử form & dữ liệu cho người mới (bảo hiểm)", en: "Form validation testing for beginners (insurance)", ja: "初心者向けフォーム検証テスト（保険）" },
  metaDescription: {
    vi: "Kiểm thử form & dữ liệu cho người mới trên dự án bảo hiểm: ràng buộc, 3 nhóm dữ liệu test, kịch bản ngày không hợp lệ & khoảng trắng, file report và trắc nghiệm.",
    en: "Form validation testing for beginners on an insurance project: constraints, 3 test data groups, invalid-date & space scenarios, tools, report file and a quiz.",
    ja: "初心者向けフォーム検証テストを保険案件で：制約・3データ群・無効日と空白シナリオ・ツール・レポート・クイズ。",
  },
  title: {
    vi: "Kiểm thử form & dữ liệu (form validation) cho người mới: dự án bảo hiểm & file report (có trắc nghiệm)",
    en: "Form validation testing for beginners: an insurance project & report file (with quiz)",
    ja: "初心者向けフォーム検証テスト：保険案件・レポート（クイズ付き）",
  },
  summary: {
    vi: "Bài thực hành cho người mới: kiểm thử form & dữ liệu trên dự án bảo hiểm. Ràng buộc dữ liệu là gì, 3 nhóm dữ liệu test, chiến lược & các bước, hai tình huống doanh nghiệp (ngày sinh không tồn tại, khoảng trắng khi dán), công cụ TestRail/Jira/DevTools, ma trận báo cáo, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Hands-on beginner article: form validation testing on an insurance project. What constraints are, 3 test data groups, strategy & steps, two enterprise situations (non-existent birth date, pasted spaces), TestRail/Jira/DevTools, a report matrix, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け実践：保険案件のフォーム検証テスト。制約・3データ群・戦略と手順・2つの企業シーン・TestRail/Jira/DevTools・報告行列・FAQ・クイズ。",
  },
  faqs: [e3_faq1, e3_faq2, e3_faq3],
  howTo: { name: "Cách kiểm thử form & dữ liệu cho người mới", steps: [
    { name: "Chuẩn bị bộ dữ liệu test", text: "Mỗi ô có sẵn dữ liệu 3 nhóm: hợp lệ, không hợp lệ, biên/đặc biệt." },
    { name: "Kiểm từng ô & quan hệ trường", text: "Nhận dữ liệu hợp lệ, chặn dữ liệu sai, kiểm ràng buộc giữa các ô." },
    { name: "Ghi nhận & báo cáo", text: "Ca Fail mở ticket Jira, tổng hợp ma trận ô × nhóm dữ liệu." },
  ] },
  pages: e3_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 4 — Test tương thích & responsive cho người mới · Dự án Bán lẻ
// ══════════════════════════════════════════════════════════════════════════════════════
const e4_faq1 = FAQ(
  "Test tương thích (compatibility testing) là gì?", "What is compatibility testing?",
  "Test tương thích là kiểm phần mềm hiển thị và chạy đúng trên nhiều môi trường khác nhau: các trình duyệt (Chrome, Safari, Firefox, Edge), các thiết bị và kích thước màn hình (điện thoại, máy tính bảng, laptop), và các hệ điều hành. Responsive là một phần của nó: giao diện tự co giãn hợp lý theo kích thước màn hình.",
  "Compatibility testing checks the software displays and works correctly across different environments: browsers (Chrome, Safari, Firefox, Edge), devices and screen sizes (phone, tablet, laptop), and operating systems. Responsive is part of it: the UI adapts sensibly to screen size.",
  "互換性テストとは？",
  "互換性テストは、ソフトが様々な環境で正しく表示・動作するか検証します：ブラウザ（Chrome/Safari/Firefox/Edge）・端末と画面サイズ（スマホ・タブレット・PC）・OS。レスポンシブはその一部で、UIが画面サイズに適切に適応することです。");
const e4_faq2 = FAQ(
  "Người mới test tương thích dùng công cụ gì?", "What tools do beginners use for compatibility testing?",
  "Bắt đầu bằng thứ có sẵn: chế độ thiết bị (Device Toolbar) trong Chrome DevTools để giả lập nhiều kích thước màn hình, và thử trên vài trình duyệt thật đã cài. Khi cần nhiều thiết bị/hệ điều hành hơn, dự án thường dùng dịch vụ như BrowserStack để chạy trên thiết bị thật từ xa. Kết quả và lỗi vẫn ghi vào test case và Jira như thường.",
  "Start with what's available: the Device Toolbar in Chrome DevTools to simulate many screen sizes, and try a few real installed browsers. For more devices/OSes, projects often use a service like BrowserStack to run on real remote devices. Results and bugs still go to test cases and Jira as usual.",
  "初心者は互換性テストに何のツールを使う？",
  "手元にあるものから：Chrome DevToolsのDevice Toolbarで多様な画面サイズを模擬し、インストール済みの実ブラウザ数種で試します。より多くの端末/OSが必要なら、案件ではBrowserStackなどで実機をリモート実行します。結果とバグは通常どおりテストケースとJiraへ。");
const e4_faq3 = FAQ(
  "Vì sao không thể test trên MỌI thiết bị và trình duyệt?", "Why can't you test on EVERY device and browser?",
  "Vì tổ hợp thiết bị × trình duyệt × hệ điều hành là khổng lồ. Thay vào đó, đội chọn một 'ma trận tương thích' gồm những môi trường phổ biến nhất với khách hàng của sản phẩm (dựa trên số liệu truy cập). Người mới học cách ưu tiên theo ma trận này để phủ tốt phần lớn người dùng thật mà vẫn khả thi về thời gian.",
  "Because the device × browser × OS combinations are enormous. Instead, teams choose a 'compatibility matrix' of the most common environments among the product's customers (based on traffic data). Beginners learn to prioritize by this matrix to cover most real users while staying time-feasible.",
  "なぜ全端末・全ブラウザで検証できない？",
  "端末×ブラウザ×OSの組合せが膨大だからです。代わりにチームは製品顧客に最も多い環境の『互換性マトリクス』（アクセスデータに基づく）を選びます。初心者はこのマトリクスで優先順位を付け、時間内で大半の実利用者を網羅する方法を学びます。");

const e4_quiz = [
  mcq({
    q: { vi: "Test tương thích kiểm điều gì?", en: "What does compatibility testing check?", ja: "互換性テストは何を検証する？" },
    options: [
      { vi: "Phần mềm chạy/hiển thị đúng trên nhiều trình duyệt, thiết bị, kích thước màn hình", en: "Software works/displays right across browsers, devices, screen sizes", ja: "多様なブラウザ・端末・画面サイズで正しく動作/表示" },
      { vi: "Chỉ tốc độ máy chủ", en: "Only server speed", ja: "サーバー速度だけ" },
      { vi: "Chỉ màu chữ", en: "Only text color", ja: "文字色だけ" },
      { vi: "Số lượng nhân viên", en: "Number of staff", ja: "従業員数" },
    ], correct: 0,
    explain: { vi: "Trọng tâm là hoạt động đúng trên nhiều môi trường khác nhau, gồm cả responsive.", en: "The focus is correct behavior across environments, including responsive.", ja: "焦点は多様な環境での正しい動作で、レスポンシブも含みます。" },
  }),
  mcq({
    q: { vi: "Công cụ nào giúp giả lập nhiều kích thước màn hình ngay trong Chrome?", en: "Which tool simulates many screen sizes inside Chrome?", ja: "Chrome内で多様な画面サイズを模擬するツールは？" },
    options: [
      { vi: "Máy tính bỏ túi", en: "A calculator", ja: "電卓" },
      { vi: "Device Toolbar trong Chrome DevTools", en: "The Device Toolbar in Chrome DevTools", ja: "Chrome DevToolsのDevice Toolbar" },
      { vi: "Trình phát video", en: "A video player", ja: "動画プレーヤー" },
      { vi: "Ứng dụng thời tiết", en: "A weather app", ja: "天気アプリ" },
    ], correct: 1,
    explain: { vi: "Device Toolbar (biểu tượng điện thoại/máy tính bảng) mô phỏng nhiều màn hình.", en: "The Device Toolbar (phone/tablet icon) simulates many screens.", ja: "Device Toolbar（スマホ/タブレット図標）が多様な画面を模擬します。" },
  }),
  mcq({
    q: { vi: "Vì sao đội dùng 'ma trận tương thích' thay vì test mọi thiết bị?", en: "Why use a 'compatibility matrix' instead of testing every device?", ja: "なぜ全端末でなく『互換性マトリクス』を使う？" },
    options: [
      { vi: "Vì tổ hợp quá lớn; ma trận chọn môi trường phổ biến nhất của khách", en: "Combinations are huge; the matrix picks customers' most common environments", ja: "組合せが膨大で、マトリクスは顧客に最多の環境を選ぶから" },
      { vi: "Vì thiết bị không quan trọng", en: "Devices don't matter", ja: "端末は重要でないから" },
      { vi: "Vì chỉ có một trình duyệt", en: "There's only one browser", ja: "ブラウザが1つだから" },
      { vi: "Vì máy quyết định", en: "The machine decides", ja: "機械が決めるから" },
    ], correct: 0,
    explain: { vi: "Ma trận giúp ưu tiên phủ phần lớn người dùng thật trong thời gian khả thi.", en: "The matrix prioritizes covering most real users within feasible time.", ja: "マトリクスは実現可能な時間で大半の実利用者を網羅する優先付けです。" },
  }),
  mcq({
    q: { vi: "Trên trang bán lẻ, lỗi responsive điển hình ở điện thoại là gì?", en: "On a retail site, what's a typical mobile responsive bug?", ja: "小売サイトでスマホの典型的レスポンシブバグは？" },
    options: [
      { vi: "Menu/nút bị chồng lên nhau hoặc tràn ra ngoài màn hình", en: "Menu/buttons overlapping or overflowing the screen", ja: "メニュー/ボタンの重なりや画面はみ出し" },
      { vi: "Máy chủ nhanh hơn", en: "Faster server", ja: "サーバーが速い" },
      { vi: "Chữ tự dịch sang tiếng Anh", en: "Text auto-translates to English", ja: "文字が英訳される" },
      { vi: "Không có lỗi nào", en: "No bugs", ja: "バグなし" },
    ], correct: 0,
    explain: { vi: "Khi màn hình hẹp, bố cục không co giãn đúng thường gây chồng lấn hoặc tràn ngang.", en: "On narrow screens, poor adaptation often causes overlap or horizontal overflow.", ja: "狭い画面では適応不良が重なりや横スクロールを招きます。" },
  }),
];

const e4_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì trên dự án bán lẻ", en: "1. TL;DR & what you'll do on a retail project", ja: "1. 要点と小売案件でできること" },
    blocks: [
      TLDR("Test tương thích là kiểm phần mềm chạy đúng trên nhiều trình duyệt, thiết bị và kích thước màn hình. Bài này gắn với trang sản phẩm của một chuỗi bán lẻ: bạn dựng ma trận tương thích, dùng Device Toolbar & BrowserStack, phát hiện lỗi responsive và ghi nhận Jira. Cuối bài có trắc nghiệm.",
        "Compatibility testing checks software works across browsers, devices and screen sizes. This ties to a retail chain's product page: you build a compatibility matrix, use the Device Toolbar & BrowserStack, find responsive bugs and record them in Jira. A quiz at the end.",
        "互換性テストはソフトが多様なブラウザ・端末・画面サイズで正しく動くか検証します。本記事は小売チェーンの商品ページに沿い、互換性マトリクス作成・Device Toolbarとの併用・BrowserStack・レスポンシブバグ発見・Jira記録を学びます。最後にクイズ付き。"),
      P("Test tương thích cho người mới rất trực quan và thú vị: bạn xem cùng một trang trên nhiều 'màn hình' khác nhau và tìm chỗ vỡ bố cục. Ở bài này ta bước vào dự án của một chuỗi bán lẻ có hàng triệu lượt truy cập từ đủ loại thiết bị, mở trang sản phẩm và test như một tester đi làm. Bài đi từ con số 0, có hình mô phỏng, ví dụ thật và trắc nghiệm cuối bài.",
        "Compatibility testing for beginners is visual and fun: you view the same page on many 'screens' and find where the layout breaks. Here we step into a retail chain's project with millions of visits from all kinds of devices, open the product page and test like a working tester. It starts from zero with mocks, real examples and a final quiz.",
        "初心者の互換性テストは視覚的で楽しいです：同じページを多様な『画面』で見てレイアウト崩れを探します。本記事はあらゆる端末から数百万アクセスがある小売チェーン案件に入り、商品ページを実務のように検証します。ゼロから、モック・実例・クイズ付きで解説します。"),
      IMG(screen("MartVN — Trang sản phẩm (desktop)", ["[Ảnh SP]  Tên sản phẩm — 250.000 ₫", "Chọn size · số lượng · [Thêm vào giỏ]", "Mô tả · Đánh giá · Sản phẩm liên quan", "Menu: Trang chủ | Danh mục | Giỏ | Tài khoản"], "#38bdf8"),
        "Màn hình test: trang sản phẩm chuỗi bán lẻ MartVN trên desktop", "Screen under test: the MartVN retail product page on desktop", "テスト対象画面：小売MartVNの商品ページ（デスクトップ）"),
      DEF("Test tương thích (compatibility)", "kiểm phần mềm hiển thị & chạy đúng trên nhiều trình duyệt, thiết bị, kích thước màn hình và hệ điều hành.",
        "compatibility testing — checking software displays & works across browsers, devices, screen sizes and OSes.",
        "互換性テスト — ソフトが多様なブラウザ・端末・画面サイズ・OSで正しく表示/動作するか検証すること。"),
    ] },
  { heading: { vi: "2. Ma trận tương thích là gì & test những gì", en: "2. What a compatibility matrix is & what to test", ja: "2. 互換性マトリクスとは・検証内容" },
    blocks: [
      P("Không thể test trên mọi thiết bị vì tổ hợp là vô tận. Thay vào đó, đội lập một 'ma trận tương thích': danh sách các cặp trình duyệt × thiết bị quan trọng nhất, chọn dựa trên số liệu khách hàng thật đang dùng gì để truy cập.",
        "You can't test on every device because combinations are infinite. Instead, the team builds a 'compatibility matrix': a list of the most important browser × device pairs, chosen from data on what real customers actually use.",
        "組合せが無限のため全端末では検証できません。代わりにチームは『互換性マトリクス』を作ります：最重要なブラウザ×端末の対の一覧で、実顧客の利用データから選びます。"),
      DEF("Ma trận tương thích (compatibility matrix)", "bảng các môi trường (trình duyệt × thiết bị × OS) cần kiểm, ưu tiên theo lượng người dùng thật.",
        "a compatibility matrix — a table of environments (browser × device × OS) to test, prioritized by real user share.",
        "互換性マトリクス — 検証すべき環境（ブラウザ×端末×OS）の表で、実利用者比率で優先付け。"),
      P("Với mỗi ô trong ma trận, bạn kiểm hai thứ: hiển thị (bố cục có vỡ không, chữ/ảnh có tràn, nút có bị chồng lấn) và chức năng (bấm nút, cuộn, mở menu có hoạt động). Ở trang bán lẻ, người mới đặc biệt để ý bản điện thoại vì phần lớn khách mua sắm qua di động — một menu bị che hay nút 'Thêm vào giỏ' bị lệch có thể chặn cả hành trình mua.",
        "For each cell in the matrix you check two things: display (does layout break, do text/images overflow, do buttons overlap) and function (do click, scroll, menu work). On a retail page, beginners especially watch the mobile version because most customers shop via mobile — a hidden menu or a shifted 'Add to cart' can block the whole buying journey.",
        "マトリクスの各セルで2点を検証：表示（レイアウト崩れ・文字/画像のはみ出し・ボタン重なり）と機能（クリック・スクロール・メニュー動作）。小売ページでは大半がモバイル購入のため初心者は特にモバイル版に注目します — 隠れたメニューやずれた『カート追加』が購入導線を塞ぎます。"),
      IMG(svg("Ma trận tương thích MartVN (rút gọn)", ["Chrome · Android (điện thoại)   -> ưu tiên cao", "Safari · iPhone (điện thoại)    -> ưu tiên cao", "Chrome · Windows (laptop)       -> ưu tiên TB", "Safari · iPad (máy tính bảng)   -> ưu tiên TB"], "#22d3ee"),
        "Ví dụ ma trận tương thích rút gọn cho trang bán lẻ", "An example compact compatibility matrix for the retail page", "小売ページの簡易互換性マトリクス例"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án doanh nghiệp", en: "3. Why it matters on an enterprise project", ja: "3. 企業案件で重要な理由" },
    blocks: [
      P("Với chuỗi bán lẻ, khách đến từ đủ loại thiết bị: iPhone đời cũ, Android màn nhỏ, máy tính bảng, laptop cũ dùng trình duyệt lỗi thời. Nếu trang vỡ trên một dòng máy phổ biến, hàng chục nghìn khách có thể không mua được — và họ rời đi lặng lẽ, không ai báo lỗi. Đó là doanh thu mất mà công ty khó nhìn thấy ngay.",
        "For a retail chain, customers come from all kinds of devices: old iPhones, small Androids, tablets, old laptops with outdated browsers. If the page breaks on one popular model, tens of thousands may fail to buy — and they leave silently, no one reporting a bug. That's lost revenue the company can't easily see.",
        "小売チェーンの顧客はあらゆる端末から来ます：旧iPhone・小型Android・タブレット・旧ブラウザの古いPC。人気機種でページが崩れれば数万人が購入できず、静かに去り誰もバグ報告しません。会社が気づきにくい売上損失です。"),
      P("Test tương thích vì thế bảo vệ doanh thu ở những góc khuất. Nó cũng liên quan tới hình ảnh thương hiệu: một trang hiển thị lệch lạc trên điện thoại khiến khách nghi ngờ độ tin cậy của cả cửa hàng. Người mới làm tốt việc này giúp sản phẩm phục vụ được đa số người dùng thật, không chỉ những người dùng thiết bị giống tester.",
        "So compatibility testing protects revenue in blind spots. It also affects brand image: a page that looks broken on mobile makes customers doubt the whole store's reliability. Beginners who do this well help the product serve most real users, not just those with the tester's device.",
        "したがって互換性テストは死角の売上を守ります。ブランド印象にも関わり、モバイルで崩れて見えるページは店全体の信頼を疑わせます。これを上手く行う初心者は、テスターと同じ端末の人だけでなく大半の実利用者に製品が届くよう助けます。"),
      P("Chính vì lỗi tương thích thường 'ẩn' với người chỉ dùng một máy, kỹ năng chủ động thử trên nhiều môi trường là thứ khiến bạn có giá trị. Đội luôn cần người chịu khó mở Device Toolbar và thử vài trình duyệt trước khi nói 'trang này ổn'.",
        "Because compatibility bugs often 'hide' from single-device users, the skill of proactively trying many environments makes you valuable. Teams always need someone diligent enough to open the Device Toolbar and try a few browsers before saying 'this page is fine'.",
        "互換性バグは単一端末の人から『隠れる』ため、多環境を能動的に試すスキルが価値になります。『このページは大丈夫』と言う前にDevice Toolbarを開き数種のブラウザを試す勤勉さをチームは常に求めます。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ giả lập & thiết bị thật", en: "4. Prepare: simulators & real devices", ja: "4. 準備：シミュレータと実機" },
    blocks: [
      P("Bạn có thể bắt đầu ngay với công cụ miễn phí trong trình duyệt, rồi mở rộng khi cần thêm thiết bị thật.",
        "You can start right away with free in-browser tools, then expand to real devices when needed.",
        "無料のブラウザ内ツールですぐ始め、必要に応じ実機へ広げられます。"),
      STEP(1, "Mở Chrome DevTools (F12), bật Device Toolbar (biểu tượng điện thoại) để chọn kích thước iPhone/Android/iPad.", "Open Chrome DevTools (F12), enable the Device Toolbar (phone icon) to pick iPhone/Android/iPad sizes.", "Chrome DevTools（F12）を開きDevice Toolbar（スマホ図標）でiPhone/Android/iPadサイズを選ぶ。"),
      STEP(2, "Thử trên các trình duyệt thật đã cài (Chrome, Firefox, Edge); dùng BrowserStack khi cần thiết bị/OS bạn không có.", "Try real installed browsers (Chrome, Firefox, Edge); use BrowserStack for devices/OSes you lack.", "インストール済み実ブラウザ（Chrome/Firefox/Edge）で試し、無い端末/OSはBrowserStackを使う。"),
      TRY("Mở một trang web bạn hay dùng, bật Device Toolbar, chọn 'iPhone SE' và tìm xem có gì bị tràn ngang không.", "Open a site you use, enable the Device Toolbar, pick 'iPhone SE' and look for horizontal overflow.", "使うサイトでDevice Toolbarを開き『iPhone SE』を選び、横はみ出しを探そう。"),
      PITFALL("Chỉ test trên đúng máy của mình — trang có thể vỡ trên thiết bị khác mà bạn không hề hay biết.", "Only testing on your own device — the page may break on other devices without you knowing.", "自分の端末だけで検証 — 他端末で崩れても気づけません。"),
      IMG(screen("Bộ công cụ test tương thích", ["Chrome DevTools — Device Toolbar (giả lập màn hình)", "Firefox / Edge / Safari — trình duyệt thật", "BrowserStack — thiết bị & OS thật từ xa", "TestRail + Jira — ghi kết quả & lỗi kèm ảnh"], "#34d399"),
        "Bộ phần mềm thường dùng khi test tương thích", "The typical software stack for compatibility testing", "互換性テストに使う典型的なソフト群"),
    ] },
  { heading: { vi: "5. Chiến lược & các bước test tương thích", en: "5. Strategy & steps for compatibility testing", ja: "5. 互換性テストの戦略と手順" },
    blocks: [
      P("Chiến lược: chạy theo ma trận từ ưu tiên cao xuống thấp, và với mỗi môi trường kiểm cả hiển thị lẫn chức năng của luồng quan trọng nhất (xem sản phẩm -> thêm giỏ). Ưu tiên bản điện thoại vì đó là nơi đông khách nhất của bán lẻ.",
        "Strategy: run the matrix from high to low priority, and for each environment check both display and function of the most important flow (view product -> add to cart). Prioritize mobile since that's where retail has the most customers.",
        "戦略：マトリクスを高優先度から実行し、各環境で最重要フロー（商品閲覧→カート追加）の表示と機能を検証。小売の最多顧客層のモバイルを優先します。"),
      STEP(1, "Chọn môi trường ưu tiên cao đầu tiên (ví dụ Safari trên iPhone).", "Pick the top-priority environment first (e.g. Safari on iPhone).", "最優先環境を先に選ぶ（例：iPhoneのSafari）。"),
      STEP(2, "Kiểm hiển thị: bố cục có vỡ, chữ/ảnh có tràn, nút/menu có chồng lấn ở màn hẹp.", "Check display: layout breaks, text/image overflow, button/menu overlap on narrow screens.", "表示確認：狭い画面でのレイアウト崩れ・文字/画像はみ出し・ボタン/メニュー重なり。"),
      STEP(3, "Kiểm chức năng: mở menu, chọn size, bấm 'Thêm vào giỏ', cuộn trang — mọi thứ vẫn chạy.", "Check function: open menu, pick size, tap 'Add to cart', scroll — everything still works.", "機能確認：メニュー・サイズ選択・『カート追加』・スクロール — 全て動作。"),
      CODE("text", "MA TRẬN & KẾT QUẢ — Trang sản phẩm MartVN\nMôi trường                     | Hiển thị | Chức năng | Ghi chú\nSafari · iPhone 13 (390px)     |  FAIL    |  PASS     | menu che nút 'Thêm vào giỏ'\nChrome · Android (360px)       |  PASS    |  PASS     | ok\nChrome · Windows laptop        |  PASS    |  PASS     | ok\nSafari · iPad (768px)          |  PASS    |  FAIL     | nút chọn size không bấm được\nEdge · Windows                 |  PASS    |  PASS     | ok"),
      TRY("Tự thêm một môi trường vào ma trận (gợi ý: điện thoại Android màn rất nhỏ 320px) và đoán rủi ro.", "Add one environment to the matrix (hint: a very small 320px Android) and guess the risk.", "マトリクスに環境を1つ追加（ヒント：320pxの極小Android）しリスクを予想しよう。"),
    ] },
  { heading: { vi: "6. Tình huống doanh nghiệp 1: menu che nút mua trên iPhone", en: "6. Enterprise situation 1: menu hides the buy button on iPhone", ja: "6. 企業シーン1：iPhoneでメニューが購入ボタンを隠す" },
    blocks: [
      SITUATION("Bạn test trang sản phẩm MartVN trên iPhone theo ma trận tương thích.", "You test the MartVN product page on iPhone per the compatibility matrix.",
        "Trên desktop mọi thứ ổn, nhưng trên iPhone màn 390px, thanh menu dính (sticky) phía trên đè lên nút 'Thêm vào giỏ', khiến khách trên di động không mua được.",
        "On desktop all is fine, but on a 390px iPhone the sticky top menu overlaps the 'Add to cart' button, so mobile customers can't buy.",
        "互換性マトリクスに沿いMartVN商品ページをiPhoneで検証する。", "デスクトップは正常ですが390pxのiPhoneで上部固定メニューが『カート追加』に重なり、モバイル顧客が購入できません。"),
      SOLVE("Ghi rõ môi trường & kích thước, chụp ảnh chỗ chồng lấn, đặt severity cao vì chặn mua trên di động.", "State the environment & size, screenshot the overlap, set high severity as it blocks mobile buying.", "環境とサイズを明記し重なりをスクショ、モバイル購入を妨げるため重大度を高に。"),
      P("Đây là lỗi responsive điển hình và nghiêm trọng vì di động là kênh mua chính. Khi ghi nhận, phần môi trường phải cực rõ: thiết bị, trình duyệt, chiều rộng màn hình (px). Kèm ảnh chụp có khoanh vùng chỗ menu đè nút. Vì lỗi chặn doanh thu trên kênh lớn nhất, bạn đặt severity High/Priority High.",
        "This is a classic, serious responsive bug because mobile is the main buying channel. When recording, the environment must be very clear: device, browser, screen width (px). Attach an annotated screenshot of the menu over the button. Because it blocks revenue on the biggest channel, set severity High/Priority High.",
        "モバイルが主要購入経路のため、これは典型的で重大なレスポンシブバグです。記録時は環境を明確に：端末・ブラウザ・画面幅(px)。メニューがボタンに重なる箇所を注釈付きスクショで添付。最大経路の売上を妨げるため重大度高/優先度高にします。"),
      CODE("text", "JIRA BUG — RT-4210\nTiêu đề: [Trang SP][iPhone] Menu dính che nút 'Thêm vào giỏ', không mua được trên di động\nMôi trường: iPhone 13, Safari, iOS 17, chiều rộng 390px\nBước: 1) Mở trang sản phẩm bất kỳ 2) Cuộn tới vùng nút 'Thêm vào giỏ'\nThực tế: thanh menu sticky đè lên nút, không bấm được\nMong đợi: nút 'Thêm vào giỏ' luôn hiển thị & bấm được trên mọi kích thước màn hình\nSeverity: High  |  Priority: High\nBằng chứng: rt4210_iphone_menu_overlap.png"),
      RECAP(["Lỗi responsive -> ghi rõ thiết bị + chiều rộng px", "Chặn mua trên di động -> severity cao"],
        ["Responsive bug -> note device + width px", "Blocks mobile buying -> high severity"],
        ["レスポンシブバグ -> 端末＋幅pxを明記", "モバイル購入を妨げる -> 重大度高"]),
    ] },
  { heading: { vi: "7. Tình huống doanh nghiệp 2: nút không bấm được trên iPad", en: "7. Enterprise situation 2: an unclickable button on iPad", ja: "7. 企業シーン2：iPadでボタンが押せない" },
    blocks: [
      SITUATION("Khách dùng iPad phản ánh không chọn được size sản phẩm.", "iPad customers report they can't select the product size.",
        "Trên iPad (Safari), nút chọn size hiển thị đẹp nhưng khi chạm vào không có phản hồi, khiến khách không thêm được sản phẩm vào giỏ.",
        "On iPad (Safari), the size buttons look fine but tapping them does nothing, so customers can't add the product to cart.",
        "iPad利用者がサイズを選べないと報告。", "iPad（Safari）でサイズ選択ボタンは綺麗に表示されますが、タップしても反応せず、カートに追加できません。"),
      SOLVE("Phân biệt lỗi chức năng (không phải hiển thị): nút hiện đúng nhưng không phản hồi chạm trên môi trường cụ thể.", "Distinguish a functional bug (not display): button shows fine but doesn't respond to tap on a specific environment.", "機能バグ（表示でない）を区別：ボタンは正常表示だが特定環境でタップに無反応。"),
      P("Điểm tinh tế ở đây: trông thì đẹp (hiển thị đạt) nhưng không chạy (chức năng fail). Người mới dễ nhầm là 'ổn' nếu chỉ nhìn. Bài học: test tương thích phải kiểm CẢ chức năng chứ không chỉ soi hình. Khi ghi nhận, nêu rõ đây là lỗi thao tác chạm chỉ xảy ra trên iPad Safari, kèm video ngắn cho thuyết phục.",
        "The subtlety: it looks fine (display passes) but doesn't work (function fails). Beginners may wrongly call it 'ok' if only looking. Lesson: compatibility testing must check function too, not just visuals. When recording, state this is a tap-interaction bug only on iPad Safari, with a short video to convince.",
        "微妙な点：見た目は正常（表示合格）だが動かない（機能不合格）。見るだけの初心者は誤って『OK』としがちです。教訓：互換性テストは見た目だけでなく機能も検証。記録時はiPad Safari限定のタップ操作バグと明記し、短い動画で説得します。"),
      CODE("text", "JIRA BUG — RT-4256\nTiêu đề: [Trang SP][iPad] Nút chọn size không phản hồi khi chạm (Safari)\nMôi trường: iPad (gen 9), Safari, iPadOS 17, 768px\nBước: 1) Mở trang sản phẩm 2) Chạm vào nút chọn size (S/M/L)\nThực tế: nút hiển thị đúng nhưng chạm không có phản hồi, không chọn được size\nMong đợi: chạm chọn được size, nút đổi trạng thái 'đang chọn'\nSeverity: High  |  Priority: Medium\nBằng chứng: rt4256_ipad_size_tap.mp4"),
      IMG(svg("Hiển thị đạt nhưng chức năng fail", ["iPad Safari: nút size hiện đẹp (display PASS)", "Chạm -> không phản hồi (function FAIL)", "=> Test tương thích phải kiểm CẢ chức năng"], "#f472b6"),
        "Minh hoạ lỗi chức năng dù hiển thị vẫn đúng trên iPad", "Illustration of a functional bug despite correct display on iPad", "iPadで表示は正常でも機能バグの図"),
      TRY("Trên Device Toolbar, chọn một iPad và thử bấm các nút của một trang — quan sát có phản hồi không.", "In the Device Toolbar, pick an iPad and try clicking a page's buttons — observe if they respond.", "Device ToolbarでiPadを選びページのボタンを押し、反応するか観察しよう。"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report: kết quả theo ma trận", en: "8. Recording & the report file: results by matrix", ja: "8. 記録とレポート：マトリクス別結果" },
    blocks: [
      P("Báo cáo test tương thích trình bày đẹp nhất dưới dạng bảng ma trận: mỗi hàng là một môi trường, cột là hiển thị và chức năng, ô Fail gắn mã lỗi. Nhìn vào là biết ngay môi trường nào đang gặp vấn đề.",
        "A compatibility report reads best as a matrix table: each row an environment, columns for display and function, failed cells linked to bug IDs. At a glance you see which environment has problems.",
        "互換性報告はマトリクス表が最適です：各行が環境、列が表示と機能、Failセルにバグ番号。一目で問題環境が分かります。"),
      STEP(1, "Lập bảng môi trường × (hiển thị, chức năng), đánh Pass/Fail và gắn mã ticket cho ô Fail.", "Build an environment × (display, function) table, mark Pass/Fail, link ticket IDs to fails.", "環境×（表示・機能）の表を作り合否を付け、Failにチケット番号を紐付け。"),
      STEP(2, "Nêu môi trường ưu tiên cao nào còn lỗi để đội quyết định phát hành.", "Highlight which high-priority environments still fail for the release decision.", "どの高優先度環境がまだFailかを明示しリリース判断に。"),
      CODE("text", "BÁO CÁO TEST TƯƠNG THÍCH — Trang sản phẩm MartVN — Sprint 8\nNgười test: (bạn)  |  Ngày: 07/07\nMôi trường                  | Hiển thị | Chức năng | Lỗi\nSafari · iPhone 13 (390px)  |  FAIL    |  PASS     | RT-4210 (menu che nút)\nSafari · iPad (768px)       |  PASS    |  FAIL     | RT-4256 (nút size không bấm)\nChrome · Android (360px)    |  PASS    |  PASS     | -\nChrome · Windows            |  PASS    |  PASS     | -\nEdge · Windows              |  PASS    |  PASS     | -\nTổng môi trường: 5 | Đạt hoàn toàn: 3 | Có lỗi: 2 (đều ưu tiên cao)\nKhuyến nghị: sửa RT-4210 & RT-4256 trước khi phát hành cho di động."),
      IMG(screen("Bảng ma trận tương thích (TestRail)", ["iPhone 13 — Hiển thị .......... FAIL -> RT-4210", "iPad — Chức năng .............. FAIL -> RT-4256", "Android — Hiển thị & Chức năng  PASS", "Windows Chrome/Edge .......... PASS"], "#38bdf8"),
        "Bảng ghi nhận kết quả test tương thích theo ma trận môi trường", "A compatibility results table by environment matrix", "環境マトリクス別の互換性結果表"),
      TIP("Với mỗi lỗi tương thích, luôn ghi chiều rộng màn hình (px) và phiên bản trình duyệt — hai thông tin lập trình viên cần nhất để tái hiện.", "For each compatibility bug, always note screen width (px) and browser version — the two things developers most need to reproduce.", "各互換性バグで画面幅(px)とブラウザ版を必ず記録 — 開発者が再現に最も必要な2情報です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp của người mới & mẹo", en: "9. Common beginner mistakes & tips", ja: "9. 初心者のよくある失敗とコツ" },
    blocks: [
      P("Khi mới test tương thích, người mới hay mắc vài lỗi giống nhau. Biết trước giúp bạn phủ đúng chỗ và báo lỗi lập trình viên tái hiện được.",
        "When new to compatibility testing, beginners make a few common mistakes. Knowing them helps you cover the right things and file reproducible bugs.",
        "互換性テストに不慣れな新人は共通の失敗をします。事前に知れば正しく網羅し再現可能なバグを報告できます。"),
      PITFALL("Chỉ nhìn hiển thị mà quên kiểm chức năng — nút trông đẹp nhưng không bấm được vẫn là lỗi.", "Only checking display and forgetting function — a button that looks fine but doesn't click is still a bug.", "表示だけ見て機能を忘れる — 綺麗でも押せないボタンはバグです。"),
      PITFALL("Quên ghi chiều rộng màn hình & phiên bản trình duyệt — lập trình viên không tái hiện được lỗi responsive.", "Forgetting screen width & browser version — developers can't reproduce the responsive bug.", "画面幅とブラウザ版の記録漏れ — 開発者がレスポンシブバグを再現できません。"),
      TIP("Chạy theo ma trận ưu tiên; với mỗi môi trường kiểm cả hiển thị lẫn chức năng của luồng mua hàng cốt lõi.", "Run by the priority matrix; for each environment check both display and function of the core buying flow.", "優先マトリクスで実行；各環境で中核購入フローの表示と機能を両方確認。"),
      IMG(svg("Bug tương thích: nên & không nên", ["✗ 'Trang lỗi trên điện thoại'", "✓ '[iPhone 390px, Safari] menu che nút mua,", "  ảnh kèm, mong đợi nút luôn bấm được'"], "#fb7185"),
        "So sánh cách báo lỗi tương thích mơ hồ và rõ ràng", "Vague vs clear ways to report a compatibility bug", "曖昧な互換性バグ報告と明確な報告の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      e4_faq1.block, e4_faq2.block, e4_faq3.block,
      INTERNAL("Test giao diện (UI testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi"),
      INTERNAL("Test chức năng cho người mới (dự án TMĐT)", "Functional testing for beginners (e-commerce project)", "test-chuc-nang-functional-testing-cho-nguoi-moi"),
    ] },
  QUIZ(e4_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa test tương thích cho trang sản phẩm của một chuỗi bán lẻ thật: dựng ma trận môi trường, dùng Device Toolbar và BrowserStack, phát hiện lỗi responsive che nút mua và lỗi chức năng chạm trên iPad, rồi ghi nhận thành bảng ma trận báo cáo. Đây là kỹ năng bảo vệ doanh thu ở những góc khuất.",
        "You just compatibility-tested a real retail chain's product page: built an environment matrix, used the Device Toolbar and BrowserStack, found a responsive bug hiding the buy button and an iPad tap bug, then recorded a report matrix. This is the skill of protecting revenue in blind spots.",
        "実際の小売チェーンの商品ページを互換性テストしました：環境マトリクス作成・Device ToolbarとBrowserStack・購入ボタンを隠すレスポンシブバグとiPadタップバグの発見・報告行列の記録。これは死角の売上を守るスキルです。"),
      P("Chặng tiếp theo là kiểm thử hồi quy & smoke test — bảo đảm những gì đang chạy không bị hỏng sau mỗi lần cập nhật ở dự án lớn. Nếu muốn thực hành trên dự án mô phỏng doanh nghiệp và thành thạo DevTools, BrowserStack, TestRail, một khoá học bài bản với người hướng dẫn sẽ giúp bạn tự tin ứng tuyển Tester.",
        "Next is regression & smoke testing — ensuring what already works isn't broken after each update on large projects. If you want to practice on enterprise-like projects and master DevTools, BrowserStack and TestRail, a structured course with a mentor helps you confidently apply for a Tester role.",
        "次は回帰テストとスモークテスト — 大規模案件で更新のたびに既存機能が壊れないことを保証します。企業を模した案件で実践しDevTools・BrowserStack・TestRailに習熟したいなら、体系的コースが役立ちます。"),
      CTA(course),
    ] },
];

const ENT_DOC4 = makeDoc({
  slug: "test-tuong-thich-responsive-cho-nguoi-moi",
  domain: "retail",
  primaryKeyword: "test tương thích",
  keywords: ["test tương thích", "compatibility testing", "test responsive", "test đa trình duyệt cho người mới"],
  coverLabel: "NGƯỜI MỚI · COMPATIBILITY · BÁN LẺ",
  crumb: "Test tương thích & responsive (người mới)",
  metaTitle: { vi: "Test tương thích & responsive cho người mới", en: "Compatibility & responsive testing for beginners", ja: "初心者向け互換性・レスポンシブテスト" },
  metaDescription: {
    vi: "Test tương thích & responsive cho người mới trên dự án bán lẻ: ma trận tương thích, Device Toolbar & BrowserStack, kịch bản lỗi iPhone/iPad và trắc nghiệm.",
    en: "Compatibility & responsive testing for beginners on a retail project: the matrix, Device Toolbar & BrowserStack, iPhone/iPad bug scenarios, report file and a quiz.",
    ja: "初心者向け互換性・レスポンシブテストを小売案件で：マトリクス・Device ToolbarとBrowserStack・iPhone/iPadバグ・レポート・クイズ。",
  },
  title: {
    vi: "Test tương thích & responsive cho người mới: dự án bán lẻ, ma trận & file report (có trắc nghiệm)",
    en: "Compatibility & responsive testing for beginners: a retail project, matrix & report file (with quiz)",
    ja: "初心者向け互換性・レスポンシブテスト：小売案件・マトリクス・レポート（クイズ付き）",
  },
  summary: {
    vi: "Bài thực hành cho người mới: test tương thích & responsive trên dự án bán lẻ. Ma trận tương thích là gì, chiến lược & các bước, hai tình huống doanh nghiệp (menu che nút mua trên iPhone, nút không bấm được trên iPad), công cụ Device Toolbar/BrowserStack/TestRail/Jira, bảng ma trận báo cáo, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Hands-on beginner article: compatibility & responsive testing on a retail project. What a compatibility matrix is, strategy & steps, two enterprise situations (menu hiding buy button on iPhone, unclickable button on iPad), Device Toolbar/BrowserStack/TestRail/Jira, a report matrix, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け実践：小売案件の互換性・レスポンシブテスト。互換性マトリクス・戦略と手順・2つの企業シーン・Device Toolbar/BrowserStack/TestRail/Jira・報告行列・FAQ・クイズ。",
  },
  faqs: [e4_faq1, e4_faq2, e4_faq3],
  howTo: { name: "Cách test tương thích & responsive cho người mới", steps: [
    { name: "Dựng ma trận tương thích", text: "Chọn các môi trường phổ biến nhất của khách (trình duyệt × thiết bị)." },
    { name: "Kiểm hiển thị & chức năng", text: "Dùng Device Toolbar/BrowserStack, kiểm cả bố cục lẫn thao tác của luồng mua hàng." },
    { name: "Ghi nhận & báo cáo", text: "Ghi kết quả dạng ma trận, ô Fail mở ticket Jira kèm chiều rộng màn hình & phiên bản." },
  ] },
  pages: e4_pages,
});

// ══════════════════════════════════════════════════════════════════════════════════════
// BÀI 5 — Kiểm thử hồi quy & smoke test cho người mới · Dự án ERP
// ══════════════════════════════════════════════════════════════════════════════════════
const e5_faq1 = FAQ(
  "Kiểm thử hồi quy (regression testing) là gì?", "What is regression testing?",
  "Kiểm thử hồi quy là chạy lại các ca kiểm thử cho những chức năng ĐÃ chạy đúng, sau khi phần mềm được thay đổi (sửa lỗi, thêm tính năng), để bảo đảm thay đổi mới không làm hỏng cái cũ. Nói ngắn gọn: kiểm xem 'cái đang chạy có còn chạy không'.",
  "Regression testing is re-running tests for features that ALREADY worked, after the software is changed (bug fix, new feature), to ensure the new change didn't break the old. In short: checking that 'what already works still works'.",
  "回帰テストとは？",
  "回帰テストは、ソフト変更（バグ修正・機能追加）後に、既に正しく動いていた機能のテストを再実行し、新変更が既存を壊していないか確認することです。要は『動いていたものがまだ動くか』の確認です。");
const e5_faq2 = FAQ(
  "Smoke test khác regression test thế nào?", "How does a smoke test differ from regression?",
  "Smoke test là một lượt kiểm nhanh và nông vào các chức năng cốt lõi nhất, chạy ngay sau khi có bản dựng mới để xem 'có đáng để test kỹ không'. Regression thì rộng và sâu hơn, phủ nhiều chức năng để chắc chắn không có gì bị hỏng. Thường: smoke test trước (nhanh), nếu đạt mới chạy regression (kỹ).",
  "A smoke test is a quick, shallow pass over the most core features, run right after a new build to see 'is it worth deep testing'. Regression is broader and deeper, covering many features to ensure nothing broke. Usually: smoke first (fast), and only if it passes do you run regression (thorough).",
  "スモークテストと回帰テストの違いは？",
  "スモークテストは最中核機能への素早く浅い確認で、新ビルド直後に『詳細検証の価値があるか』を見ます。回帰はより広く深く多機能を網羅し破壊がないか確認します。通常はスモーク先行（速い）、合格後に回帰（詳細）を実行します。");
const e5_faq3 = FAQ(
  "Ở dự án ERP lớn, người mới tham gia hồi quy thế nào?", "How does a beginner take part in regression on a large ERP project?",
  "Người mới thường được giao chạy một phần của bộ hồi quy: một danh sách test case đã có sẵn cho các module quen thuộc (ví dụ bán hàng, kho, kế toán). Bạn chạy theo checklist, đánh Pass/Fail, và mở lỗi cho bất kỳ chức năng cũ nào bỗng nhiên hỏng sau bản cập nhật. Đây là cách an toàn để đóng góp ngay từ sớm.",
  "Beginners are usually assigned part of the regression suite: an existing list of test cases for familiar modules (e.g. sales, inventory, accounting). You run the checklist, mark Pass/Fail, and file bugs for any old feature that suddenly breaks after the update. It's a safe way to contribute early.",
  "大規模ERP案件で初心者はどう回帰に参加する？",
  "初心者は通常、回帰スイートの一部を担当します：慣れたモジュール（例：販売・在庫・会計）の既存テストケース一覧です。チェックリストを実行し合否を付け、更新後に突然壊れた既存機能のバグを起票します。早期に安全に貢献する方法です。");

const e5_quiz = [
  mcq({
    q: { vi: "Kiểm thử hồi quy nhằm bảo đảm điều gì?", en: "What does regression testing ensure?", ja: "回帰テストは何を保証する？" },
    options: [
      { vi: "Tính năng mới trông đẹp", en: "The new feature looks nice", ja: "新機能が綺麗に見える" },
      { vi: "Thay đổi mới không làm hỏng những chức năng đang chạy đúng", en: "The new change didn't break already-working features", ja: "新変更が既存の正常機能を壊さないこと" },
      { vi: "Máy chủ nhanh hơn", en: "The server is faster", ja: "サーバーが速い" },
      { vi: "Giảm số lập trình viên", en: "Fewer developers", ja: "開発者削減" },
    ], correct: 1,
    explain: { vi: "Hồi quy kiểm 'cái đang chạy có còn chạy không' sau khi phần mềm thay đổi.", en: "Regression checks 'does what works still work' after a change.", ja: "回帰は変更後『動くものがまだ動くか』を確認します。" },
  }),
  mcq({
    q: { vi: "Thứ tự hợp lý sau khi có bản dựng mới là gì?", en: "What's the sensible order after a new build?", ja: "新ビルド後の合理的な順序は？" },
    options: [
      { vi: "Regression sâu trước, smoke sau", en: "Deep regression first, smoke later", ja: "先に詳細回帰、後にスモーク" },
      { vi: "Smoke test nhanh trước; nếu đạt mới chạy regression sâu", en: "Quick smoke first; only if it passes run deep regression", ja: "先に素早いスモーク、合格後に詳細回帰" },
      { vi: "Không cần test gì", en: "No testing needed", ja: "テスト不要" },
      { vi: "Chỉ test tính năng mới", en: "Only test the new feature", ja: "新機能だけ検証" },
    ], correct: 1,
    explain: { vi: "Smoke nhanh xác nhận bản dựng đủ tốt để bỏ công test kỹ (regression).", en: "A fast smoke confirms the build is good enough to invest in deep regression.", ja: "素早いスモークでビルドが詳細回帰に値するか確認します。" },
  }),
  mcq({
    q: { vi: "Khi nào ĐẶC BIỆT cần chạy hồi quy?", en: "When is regression ESPECIALLY needed?", ja: "回帰が特に必要なのは？" },
    options: [
      { vi: "Sau khi sửa lỗi hoặc thêm tính năng mới", en: "After a bug fix or adding a new feature", ja: "バグ修正や新機能追加後" },
      { vi: "Khi không có thay đổi nào", en: "When nothing changed", ja: "変更がない時" },
      { vi: "Khi đổi màu logo công ty", en: "When the logo color changes", ja: "ロゴ色変更時" },
      { vi: "Không bao giờ", en: "Never", ja: "決してない" },
    ], correct: 0,
    explain: { vi: "Mỗi thay đổi mã đều có thể vô tình phá vỡ chức năng khác — đó là lúc cần hồi quy.", en: "Every code change may accidentally break something else — that's when regression is needed.", ja: "各コード変更が他機能を偶発的に壊しうるため回帰が必要です。" },
  }),
  mcq({
    q: { vi: "Ở ERP, vì sao một thay đổi ở module Kho có thể cần test lại module Kế toán?", en: "In ERP, why might a change in Inventory require retesting Accounting?", ja: "ERPで在庫モジュール変更がなぜ会計の再検証を要する？" },
    options: [
      { vi: "Vì các module liên kết dữ liệu với nhau (nhập kho ảnh hưởng giá vốn, sổ sách)", en: "Because modules share data (stock affects cost, ledgers)", ja: "モジュールがデータ連携するから（入庫が原価・帳簿に影響）" },
      { vi: "Vì hai module không liên quan", en: "Because they're unrelated", ja: "無関係だから" },
      { vi: "Vì kế toán thích test", en: "Because accounting likes testing", ja: "会計がテスト好きだから" },
      { vi: "Vì máy yêu cầu", en: "Because the machine demands it", ja: "機械が要求するから" },
    ], correct: 0,
    explain: { vi: "ERP tích hợp chặt: đổi ở một module dễ gây tác động dây chuyền sang module khác.", en: "ERP is tightly integrated: a change in one module can ripple into another.", ja: "ERPは密結合で、一つの変更が他モジュールへ波及します。" },
  }),
];

const e5_pages = [
  { heading: { vi: "1. Tóm tắt nhanh & bạn sẽ làm được gì trên dự án ERP", en: "1. TL;DR & what you'll do on an ERP project", ja: "1. 要点とERP案件でできること" },
    blocks: [
      TLDR("Kiểm thử hồi quy là chạy lại test cho chức năng đã chạy đúng, sau khi phần mềm thay đổi, để chắc chắn không có gì bị hỏng. Bài này gắn với hệ ERP nhiều module: bạn chạy smoke test nhanh rồi bộ hồi quy, phát hiện tác động dây chuyền và ghi nhận Jira. Cuối bài có trắc nghiệm.",
        "Regression testing re-runs tests for already-working features after a change, to ensure nothing broke. This ties to a multi-module ERP: you run a fast smoke test then the regression suite, catch ripple effects and record them in Jira. A quiz at the end.",
        "回帰テストは変更後に既存機能のテストを再実行し破壊がないか確認します。本記事は多モジュールERPに沿い、素早いスモークテスト後に回帰スイートを実行し、波及影響の発見・Jira記録を学びます。最後にクイズ付き。"),
      P("Kiểm thử hồi quy là công việc bạn sẽ làm rất nhiều ở dự án lớn, vì phần mềm doanh nghiệp cập nhật liên tục. Mỗi lần sửa một chỗ, luôn có rủi ro làm hỏng chỗ khác — và nhiệm vụ của bạn là canh cho điều đó không lọt ra khách hàng. Ở bài này ta bước vào một hệ ERP nhiều module, chạy hồi quy như một tester đi làm. Bài đi từ con số 0, có hình mô phỏng, ví dụ thật và trắc nghiệm cuối bài.",
        "Regression testing is work you'll do a lot on large projects, because enterprise software updates constantly. Every fix risks breaking something else — and your job is to keep that from reaching customers. Here we step into a multi-module ERP and run regression like a working tester. It starts from zero with mocks, real examples and a final quiz.",
        "回帰テストは大規模案件で頻繁に行う作業です。企業ソフトは常に更新されるからです。各修正が他を壊すリスクがあり、それを顧客に届かせないのがあなたの仕事です。本記事は多モジュールERPに入り、実務のように回帰を実行します。ゼロから、モック・実例・クイズ付きで解説します。"),
      IMG(screen("ERP-Pro — Bảng điều khiển", ["Module: Bán hàng | Kho | Kế toán | Nhân sự", "Đơn hàng mới -> ghi nhận doanh thu", "Xuất kho -> cập nhật tồn & giá vốn", "Sổ cái tự động cập nhật từ các module"], "#0ea5e9"),
        "Màn hình test: bảng điều khiển hệ ERP-Pro nhiều module liên kết", "Screen under test: the ERP-Pro dashboard with linked modules", "テスト対象画面：連携モジュールのERP-Proダッシュボード"),
      DEF("Kiểm thử hồi quy (regression)", "chạy lại test cho chức năng đã chạy đúng sau khi có thay đổi, để bảo đảm không phát sinh lỗi mới ở phần cũ.",
        "regression testing — re-running tests for already-working features after a change to ensure no new bugs in the old parts.",
        "回帰テスト — 変更後に既存の正常機能を再検証し、旧部分に新たなバグが出ないことを保証すること。"),
    ] },
  { heading: { vi: "2. Hồi quy & smoke test là gì", en: "2. What regression & smoke testing are", ja: "2. 回帰とスモークテストとは" },
    blocks: [
      P("Hãy hình dung phần mềm như một cỗ máy nhiều bánh răng ăn khớp. Khi thợ chỉnh một bánh răng (sửa lỗi hay thêm tính năng), các bánh răng khác có thể bị xê dịch. Hồi quy là việc quay thử cả cỗ máy để chắc chắn mọi bánh răng cũ vẫn chạy êm sau khi chỉnh.",
        "Imagine software as a machine of meshing gears. When a mechanic adjusts one gear (a fix or new feature), other gears may shift. Regression is turning the whole machine to ensure every old gear still runs smoothly after the tweak.",
        "ソフトを噛み合う歯車の機械と想像してください。技術者が1つの歯車を調整（修正や機能追加）すると、他の歯車がずれることがあります。回帰は機械全体を回し、調整後も全ての旧歯車が滑らかに動くか確認することです。"),
      DEF("Smoke test", "một lượt kiểm nhanh, nông vào các chức năng cốt lõi nhất ngay sau khi có bản dựng mới.",
        "a smoke test — a quick, shallow pass over the most core features right after a new build.",
        "スモークテスト — 新ビルド直後に最中核機能へ行う素早く浅い確認。"),
      P("Trên thực tế, hai loại này phối hợp: sau khi có bản dựng mới, bạn chạy smoke test trong vài phút để xem các chức năng sống còn (đăng nhập, tạo đơn, xuất kho) có chạy không. Nếu smoke fail, không cần test tiếp — trả lại bản dựng ngay. Nếu smoke đạt, bạn mới bỏ công chạy bộ hồi quy rộng để soi kỹ mọi ngóc ngách.",
        "In practice the two combine: after a new build, you run a smoke test in minutes to see if vital features (login, create order, issue stock) work. If smoke fails, don't test further — return the build immediately. If smoke passes, then you invest in running the broad regression suite to inspect every corner.",
        "実際は両者が連携します：新ビルド後、数分のスモークで重要機能（ログイン・受注・出庫）が動くか確認。スモーク不合格なら以降不要で即差し戻し。合格なら広い回帰スイートを実行し隅々を精査します。"),
      IMG(svg("Smoke -> Regression sau mỗi bản dựng", ["Bản dựng mới -> Smoke test (vài phút, cốt lõi)", "Smoke FAIL -> trả lại bản dựng ngay", "Smoke PASS -> chạy Regression (rộng & sâu)"], "#22d3ee"),
        "Quy trình smoke test rồi kiểm thử hồi quy sau mỗi bản dựng", "The smoke-then-regression flow after each build", "各ビルド後のスモーク→回帰の流れ"),
    ] },
  { heading: { vi: "3. Vì sao quan trọng ở dự án doanh nghiệp", en: "3. Why it matters on an enterprise project", ja: "3. 企業案件で重要な理由" },
    blocks: [
      P("Hệ ERP là xương sống vận hành của doanh nghiệp: bán hàng, kho, kế toán, nhân sự đều nối vào nhau. Đặc điểm nguy hiểm là các module liên kết dữ liệu chặt chẽ — sửa một công thức ở module Kho có thể vô tình làm sai giá vốn bên Kế toán. Nếu không hồi quy, một thay đổi nhỏ có thể gây sai lệch số liệu tài chính của cả công ty.",
        "An ERP is the operational backbone of a business: sales, inventory, accounting, HR all connect. The dangerous trait is tight data linkage between modules — changing a formula in Inventory can accidentally corrupt cost in Accounting. Without regression, a small change can distort the whole company's financial figures.",
        "ERPは企業運営の背骨です：販売・在庫・会計・人事が連結。危険な特性はモジュール間の密なデータ連携です — 在庫の式変更が会計の原価を誤らせることがあります。回帰なしでは小変更が全社の財務数値を歪めます。"),
      P("Vì hậu quả có thể lan rộng và tốn kém, hồi quy là tấm lưới an toàn bắt buộc trước mỗi lần phát hành. Nó cho phép đội tự tin cập nhật nhanh mà không sợ 'sửa một, hỏng mười'. Người mới góp phần chạy hồi quy chính là đang giữ cho tấm lưới đó luôn chắc.",
        "Because consequences can spread and be costly, regression is a mandatory safety net before every release. It lets teams update quickly and confidently without fearing 'fix one, break ten'. A beginner helping run regression keeps that net strong.",
        "影響が広がり高コストになりうるため、回帰は各リリース前の必須の安全網です。『一つ直して十壊す』を恐れず素早く自信を持って更新できます。回帰を担う初心者はその網を強く保ちます。"),
      P("Ở dự án lớn, bộ hồi quy có thể gồm hàng trăm ca. Đây cũng là lý do sau này người ta tự động hoá phần lớn hồi quy. Nhưng hiểu và chạy hồi quy bằng tay trước sẽ cho bạn nền tảng vững để về sau viết được automation đúng trọng tâm.",
        "On large projects a regression suite can have hundreds of cases. That's also why teams later automate most regression. But understanding and running regression manually first gives you a solid base to later write focused automation.",
        "大規模案件では回帰スイートが数百ケースに及びます。だから後に大半を自動化します。しかしまず手動で理解・実行することが、後に的を射た自動化を書く堅固な基礎になります。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: bộ hồi quy & công cụ", en: "4. Prepare: the regression suite & tools", ja: "4. 準備：回帰スイートとツール" },
    blocks: [
      P("Ở dự án, bạn thường không phải tự nghĩ ra bộ hồi quy từ đầu — đội đã có sẵn danh sách test case cho từng module. Việc của bạn là hiểu và chạy đúng phần được giao.",
        "On a project you usually don't invent the regression suite from scratch — the team already has test case lists per module. Your job is to understand and run your assigned part correctly.",
        "案件では回帰スイートをゼロから考える必要は通常ありません — チームにモジュール別テストケース一覧が既にあります。担当分を正しく理解し実行するのが役目です。"),
      STEP(1, "Nhận phần bộ hồi quy được giao (ví dụ module Kho) và đọc để hiểu từng ca kiểm gì.", "Take your assigned regression part (e.g. Inventory module) and read to understand each case.", "担当の回帰部分（例：在庫モジュール）を受け取り各ケースを理解。"),
      STEP(2, "Xác định 'smoke set' — vài ca cốt lõi nhất để chạy nhanh đầu tiên.", "Identify the 'smoke set' — the few most core cases to run first quickly.", "『スモークセット』を特定 — 最初に素早く回す最中核ケース。"),
      STEP(3, "Chuẩn bị TestRail/Excel để đánh dấu Pass/Fail và Jira để mở lỗi hồi quy.", "Prepare TestRail/Excel to mark Pass/Fail and Jira to file regression bugs.", "TestRail/Excelで合否記録、Jiraで回帰バグ起票の準備。"),
      TRY("Với một app bạn hay dùng, tự liệt kê 3 chức năng 'sống còn' mà bạn sẽ đưa vào smoke test.", "For an app you use, list 3 'vital' features you'd put in a smoke test.", "使うアプリで、スモークテストに入れる『重要』機能を3つ挙げよう。"),
      PITFALL("Bỏ qua smoke test, lao thẳng vào test kỹ trên một bản dựng hỏng — mất hàng giờ vô ích rồi mới phát hiện bản dựng lỗi từ đầu.", "Skipping smoke and diving into deep testing on a broken build — wasting hours before realizing the build was bad from the start.", "スモークを飛ばし壊れたビルドで詳細検証に突入 — 何時間も無駄にした後で最初からビルド不良と気づきます。"),
      IMG(screen("Bộ hồi quy theo module (ERP-Pro)", ["Smoke set: đăng nhập · tạo đơn · xuất kho · lên sổ", "Regression Kho: 40 ca (nhập, xuất, kiểm kê...)", "Regression Kế toán: 55 ca (sổ cái, giá vốn...)", "TestRail — chạy & đánh dấu · Jira — mở lỗi"], "#34d399"),
        "Bộ hồi quy tổ chức theo module với một smoke set cốt lõi", "A regression suite organized by module with a core smoke set", "中核スモークセット付きのモジュール別回帰スイート"),
    ] },
  { heading: { vi: "5. Chiến lược & các bước chạy hồi quy", en: "5. Strategy & steps to run regression", ja: "5. 回帰実行の戦略と手順" },
    blocks: [
      P("Chiến lược: smoke trước – hồi quy sau, và ưu tiên hồi quy những vùng gần thay đổi nhất (nơi rủi ro cao nhất). Nếu module Kho vừa sửa, bạn hồi quy kỹ Kho và cả các module ăn dữ liệu từ Kho như Kế toán.",
        "Strategy: smoke first – regression after, and prioritize regressing areas closest to the change (highest risk). If Inventory was just changed, deeply regress Inventory and modules consuming its data like Accounting.",
        "戦略：スモーク先行・回帰後行、そして変更に最も近い領域（最高リスク）を優先。在庫を変更したなら在庫と、そのデータを使う会計などを重点回帰します。"),
      STEP(1, "Chạy smoke set: đăng nhập, tạo đơn, xuất kho, lên sổ — mọi chức năng sống còn phải Pass.", "Run the smoke set: login, create order, issue stock, post ledger — all vital features must pass.", "スモークセット実行：ログイン・受注・出庫・記帳 — 全重要機能が合格必須。"),
      STEP(2, "Chạy hồi quy vùng thay đổi trước (module vừa sửa), rồi tới các module liên kết.", "Run regression on the changed area first (the fixed module), then linked modules.", "変更領域（修正モジュール）を先に回帰、次に連携モジュール。"),
      STEP(3, "Đánh dấu Pass/Fail; mọi ca cũ bỗng Fail sau cập nhật là lỗi hồi quy cần mở ticket ngay.", "Mark Pass/Fail; any old case now failing after the update is a regression bug to file immediately.", "合否を記録；更新後に旧ケースがFailなら回帰バグとして即起票。"),
      CODE("text", "KỊCH BẢN: Sau khi module Kho đổi công thức tính giá vốn (bản dựng v3.4)\nSmoke set:\n  [PASS] Đăng nhập  [PASS] Tạo đơn bán  [PASS] Xuất kho  [PASS] Lên sổ cái\nRegression vùng thay đổi (Kho):\n  [PASS] Nhập kho  [PASS] Kiểm kê  [PASS] Báo cáo tồn\nRegression module liên kết (Kế toán):\n  [FAIL] Giá vốn hàng bán trên sổ cái sai lệch sau khi xuất kho -> lỗi hồi quy\nKết luận: thay đổi ở Kho đã gây tác động dây chuyền sang Kế toán."),
      TRY("Nếu module Bán hàng vừa được sửa, hãy đoán những module nào bạn nên hồi quy kèm và vì sao.", "If the Sales module was just changed, guess which modules you should regress alongside and why.", "販売モジュールを変更したなら、併せて回帰すべきモジュールとその理由を予想しよう。"),
    ] },
  { heading: { vi: "6. Tình huống doanh nghiệp 1: sửa Kho làm sai Kế toán", en: "6. Enterprise situation 1: an Inventory fix breaks Accounting", ja: "6. 企業シーン1：在庫修正が会計を壊す" },
    blocks: [
      SITUATION("Đội vừa sửa công thức tính giá vốn trong module Kho của ERP-Pro.", "The team just fixed the cost formula in ERP-Pro's Inventory module.",
        "Bản dựng mới v3.4 chỉ đụng vào Kho, nhưng bạn được yêu cầu hồi quy cả module Kế toán vì hai module dùng chung dữ liệu giá vốn.",
        "The new v3.4 build only touched Inventory, but you're asked to regress Accounting too because both share cost data.",
        "ERP-Proの在庫モジュールで原価式を修正した。", "新ビルドv3.4は在庫のみ変更ですが、両モジュールが原価データを共有するため会計も回帰するよう求められます。"),
      SOLVE("Chạy lại các ca Kế toán liên quan giá vốn, đối chiếu số sổ cái trước và sau cập nhật.", "Re-run Accounting cases involving cost, compare ledger figures before and after the update.", "原価に関わる会計ケースを再実行し、更新前後の帳簿数値を比較。"),
      P("Đây chính là giá trị của hồi quy: bắt được 'tác động dây chuyền' mà thay đổi ban đầu không hề nhắm tới. Khi ghi nhận, bạn nêu rõ thay đổi gốc (ở Kho), triệu chứng phát sinh (sai giá vốn ở Kế toán), và con số cụ thể trước/sau để lập trình viên thấy mối liên hệ. Đây là lỗi nghiêm trọng vì ảnh hưởng số liệu tài chính.",
        "This is the value of regression: catching a 'ripple effect' the original change never targeted. When recording, state the root change (in Inventory), the emergent symptom (wrong cost in Accounting), and concrete before/after numbers so developers see the link. It's serious because it affects financial figures.",
        "これが回帰の価値です：元の変更が狙わない『波及影響』を捉えます。記録時は根本変更（在庫）・派生症状（会計の原価誤り）・前後の具体数値を示し関連を伝えます。財務数値に影響するため重大です。"),
      CODE("text", "JIRA BUG — ERP-5140\nTiêu đề: [Kế toán][Hồi quy] Giá vốn hàng bán trên sổ cái sai sau khi sửa công thức Kho (v3.4)\nMôi trường: ERP-Pro v3.4 / môi trường staging / dữ liệu mẫu tháng 6\nBước: 1) Xuất kho 100 SP 2) Xem giá vốn hàng bán trên sổ cái Kế toán\nThực tế (v3.4): giá vốn = 1.050.000 ₫ (sai)\nMong đợi (như v3.3): giá vốn = 1.000.000 ₫\nChênh lệch: +50.000 ₫ mỗi lần xuất -> sai lệch báo cáo lãi/lỗ\nSeverity: Critical  |  Priority: High  |  Loại: Regression\nBằng chứng: erp5140_cogs_diff.png"),
      RECAP(["Hồi quy bắt tác động dây chuyền giữa các module", "Ghi rõ thay đổi gốc + số liệu trước/sau"],
        ["Regression catches cross-module ripple effects", "State the root change + before/after figures"],
        ["回帰はモジュール間の波及を捉える", "根本変更＋前後数値を明記"]),
    ] },
  { heading: { vi: "7. Tình huống doanh nghiệp 2: smoke test chặn bản dựng hỏng", en: "7. Enterprise situation 2: a smoke test stops a bad build", ja: "7. 企業シーン2：スモークが不良ビルドを止める" },
    blocks: [
      SITUATION("Sáng sớm có bản dựng mới v3.5 cần kiểm gấp trước khi cả đội test.", "Early morning, a new v3.5 build needs a quick check before the whole team tests.",
        "Cả đội chuẩn bị chạy hồi quy đầy đủ cho v3.5. Bạn được giao chạy smoke test trước để xác nhận bản dựng đủ tốt.",
        "The whole team is about to run full regression for v3.5. You're assigned the smoke test first to confirm the build is good enough.",
        "早朝、全員が検証する前に新ビルドv3.5の素早い確認が必要。", "全員がv3.5の完全回帰を実行予定。まずスモークテストでビルドが十分か確認する担当になります。"),
      SOLVE("Chạy nhanh smoke set; nếu một chức năng cốt lõi fail thì trả lại bản dựng ngay, không để cả đội mất thời gian.", "Run the smoke set fast; if a core feature fails, return the build immediately so the team isn't wasted.", "スモークセットを素早く実行；中核機能がFailなら即差し戻し、全員の時間浪費を防ぐ。"),
      P("Smoke test đóng vai 'người gác cổng'. Chỉ mất vài phút nhưng có thể tiết kiệm hàng giờ cho cả đội. Ở đây bạn chạy 4 ca cốt lõi và phát hiện 'tạo đơn bán' bị lỗi ngay — nghĩa là bản dựng hỏng nặng, không đáng để test kỹ. Bạn báo ngay để đội hoãn, và lập trình viên sửa trước khi phát hành lại.",
        "The smoke test plays 'gatekeeper'. It takes minutes but can save the team hours. Here you run 4 core cases and immediately find 'create sales order' is broken — meaning the build is badly broken, not worth deep testing. You report at once so the team pauses, and developers fix before rebuilding.",
        "スモークは『門番』役です。数分でも全員の数時間を節約できます。ここでは4中核ケースを実行し『受注作成』が即壊れていると判明 — ビルドが重度に壊れ詳細検証に値しません。即報告し全員が中断、開発者が再ビルド前に修正します。"),
      CODE("text", "SMOKE TEST — Bản dựng ERP-Pro v3.5 — 08:15\n[PASS] Đăng nhập hệ thống\n[FAIL] Tạo đơn bán -> báo lỗi 500, không tạo được đơn   <== CHẶN\n[--]   Xuất kho (không chạy tiếp vì đã fail cốt lõi)\n[--]   Lên sổ cái (không chạy tiếp)\nKẾT LUẬN: Smoke FAIL. Trả lại bản dựng v3.5, hoãn hồi quy toàn đội.\nĐã mở: ERP-5188 (Critical) — Tạo đơn bán lỗi 500 trên v3.5"),
      IMG(svg("Smoke test làm người gác cổng", ["v3.5 -> Smoke: 'Tạo đơn bán' FAIL (lỗi 500)", "=> Trả lại bản dựng NGAY", "Tiết kiệm hàng giờ hồi quy cho cả đội"], "#f472b6"),
        "Smoke test chặn một bản dựng hỏng trước khi cả đội mất công", "A smoke test stopping a bad build before the team wastes effort", "全員が労力を無駄にする前に不良ビルドを止めるスモーク"),
      TRY("Nghĩ xem: nếu smoke test có 5 ca mà ca thứ 2 fail, bạn có nên chạy tiếp 3 ca còn lại không? Vì sao?", "Consider: if a 5-case smoke fails at case 2, should you run the other 3? Why?", "考えよう：5ケースのスモークが2番目でFailしたら残り3つを実行すべきか？理由は？"),
    ] },
  { heading: { vi: "8. Ghi nhận & file report: sức khỏe bản dựng", en: "8. Recording & the report file: build health", ja: "8. 記録とレポート：ビルドの健全性" },
    blocks: [
      P("Báo cáo hồi quy trả lời câu hỏi lớn của đội: 'bản dựng này có an toàn để phát hành không?'. Nó tổng hợp kết quả smoke, kết quả hồi quy theo module, và đặc biệt liệt kê các lỗi hồi quy (chức năng cũ bị hỏng) vì đây là loại lỗi khiến việc phát hành phải cân nhắc.",
        "A regression report answers the team's big question: 'is this build safe to release?'. It summarizes smoke results, regression results by module, and especially lists regression bugs (old features broken) because this type makes release a careful decision.",
        "回帰報告はチームの大きな問い『このビルドはリリースして安全か』に答えます。スモーク結果・モジュール別回帰結果・特に回帰バグ（旧機能の破壊）を列挙します。この種はリリース判断を慎重にさせるからです。"),
      STEP(1, "Ghi kết quả smoke (đạt/không) và tổng Pass/Fail của hồi quy theo module.", "Record smoke result (pass/fail) and regression Pass/Fail totals by module.", "スモーク結果（合否）とモジュール別回帰の合否合計を記録。"),
      STEP(2, "Liệt kê riêng các lỗi hồi quy và đánh dấu blocker để đội quyết định phát hành.", "List regression bugs separately and mark blockers for the release decision.", "回帰バグを別途列挙しブロッカーを明示、リリース判断に。"),
      CODE("text", "BÁO CÁO HỒI QUY — Bản dựng ERP-Pro v3.4 — Sprint 15\nNgười test: (bạn)  |  Ngày: 07/07  |  Môi trường: staging\nSmoke test: PASS (đăng nhập, tạo đơn, xuất kho, lên sổ đều đạt)\nHồi quy theo module:\n  Kho       : 40 ca | Pass 40 | Fail 0\n  Kế toán   : 55 ca | Pass 54 | Fail 1\n  Bán hàng  : 30 ca | Pass 30 | Fail 0\nLỗi hồi quy:\n  ERP-5140  Critical  Giá vốn sai ở Kế toán sau khi sửa Kho   [BLOCKER]\nKhuyến nghị: KHÔNG phát hành v3.4 cho tới khi ERP-5140 được sửa & hồi quy lại Kế toán."),
      IMG(screen("Bảng hồi quy theo module (TestRail)", ["Smoke set ................. PASS", "Kho — 40/40 .............. PASS", "Kế toán — 54/55 .......... FAIL -> ERP-5140 [BLOCKER]", "Bán hàng — 30/30 ......... PASS"], "#0ea5e9"),
        "Bảng ghi nhận kết quả hồi quy theo module và smoke set", "A regression results table by module and smoke set", "モジュールとスモークセット別の回帰結果表"),
      TIP("Luôn ghi rõ số phiên bản bản dựng trong báo cáo hồi quy — mỗi kết quả chỉ đúng cho một bản dựng cụ thể.", "Always note the build version in a regression report — each result is valid only for a specific build.", "回帰報告にビルド版を必ず記録 — 各結果は特定ビルドにのみ有効です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp của người mới & mẹo", en: "9. Common beginner mistakes & tips", ja: "9. 初心者のよくある失敗とコツ" },
    blocks: [
      P("Khi mới tham gia hồi quy ở dự án lớn, người mới hay mắc vài lỗi giống nhau. Biết trước giúp bạn chạy hiệu quả và báo cáo đáng tin.",
        "When new to regression on a large project, beginners make a few common mistakes. Knowing them helps you run efficiently and report reliably.",
        "大規模案件の回帰に不慣れな新人は共通の失敗をします。事前に知れば効率的に実行し信頼できる報告ができます。"),
      PITFALL("Chỉ test tính năng mới mà quên hồi quy phần cũ — đúng lúc bản phát hành làm hỏng thứ khách đang dùng.", "Only testing the new feature and skipping regression — exactly when a release breaks what customers rely on.", "新機能だけ検証し回帰を飛ばす — リリースが顧客の依存機能を壊す瞬間です。"),
      PITFALL("Quên ghi số phiên bản bản dựng — kết quả trở nên vô nghĩa vì không biết áp cho bản nào.", "Forgetting the build version — results become meaningless because you don't know which build they apply to.", "ビルド版の記録漏れ — どのビルドの結果か不明で無意味になります。"),
      TIP("Sau mỗi thay đổi, hỏi: 'thay đổi này đụng dữ liệu/luồng nào?' rồi hồi quy cả những module liên kết, không chỉ chỗ vừa sửa.", "After each change ask: 'what data/flow does this touch?' then regress linked modules, not just the fixed spot.", "各変更後に問う：『これは何のデータ/フローに触れるか』そして連携モジュールも回帰、修正箇所だけでなく。"),
      IMG(svg("Bug hồi quy: nên & không nên", ["✗ 'Sau cập nhật thấy lỗi đâu đó'", "✓ '[Kế toán][Regression v3.4] giá vốn sai sau sửa Kho,", "  trước 1.000.000 / sau 1.050.000 + ảnh'"], "#fb7185"),
        "So sánh cách báo lỗi hồi quy mơ hồ và rõ ràng", "Vague vs clear ways to report a regression bug", "曖昧な回帰バグ報告と明確な報告の比較"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      e5_faq1.block, e5_faq2.block, e5_faq3.block,
      INTERNAL("Test scenario & checklist cho người mới", "Test scenario & checklist for beginners", "test-scenario-checklist-cho-nguoi-moi"),
      INTERNAL("Test chức năng cho người mới (dự án TMĐT)", "Functional testing for beginners (e-commerce project)", "test-chuc-nang-functional-testing-cho-nguoi-moi"),
    ] },
  QUIZ(e5_quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa chạy hồi quy trên một hệ ERP thật: hiểu quan hệ giữa smoke và regression, chạy smoke test để gác cổng bản dựng, phát hiện tác động dây chuyền giữa Kho và Kế toán, và ghi nhận thành báo cáo sức khỏe bản dựng có đánh dấu blocker. Đây là tấm lưới an toàn của mọi lần phát hành.",
        "You just ran regression on a real ERP: understood the smoke–regression relationship, ran a smoke test to gatekeep the build, caught a ripple effect between Inventory and Accounting, and recorded a build-health report marking blockers. This is the safety net of every release.",
        "実際のERPで回帰を実行しました：スモークと回帰の関係理解・ビルドを門番するスモーク・在庫と会計の波及発見・ブロッカー明示のビルド健全性報告。これは各リリースの安全網です。"),
      P("Bạn đã đi qua trọn một chuỗi kỹ năng nền tảng ứng dụng vào dự án doanh nghiệp: từ test giao diện, test chức năng, kiểm thử form, test tương thích, tới hồi quy. Bước tiếp theo tự nhiên là tự động hoá phần hồi quy lặp lại nhiều. Nếu muốn thực hành trên dự án mô phỏng doanh nghiệp và tiến tới automation, một khoá học bài bản với người hướng dẫn sẽ giúp bạn tự tin ứng tuyển Tester.",
        "You've completed a full chain of foundation skills applied to enterprise projects: from UI, functional, form, compatibility, to regression testing. The natural next step is automating the repetitive regression. If you want to practice on enterprise-like projects and move toward automation, a structured course with a mentor helps you confidently apply for a Tester role.",
        "UI・機能・フォーム・互換性・回帰まで、企業案件に応用する基礎スキルの連鎖を完了しました。次の自然な段階は反復回帰の自動化です。企業を模した案件で実践し自動化へ進みたいなら、体系的コースが自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const ENT_DOC5 = makeDoc({
  slug: "kiem-thu-hoi-quy-smoke-test-cho-nguoi-moi",
  domain: "erp",
  primaryKeyword: "kiểm thử hồi quy",
  keywords: ["kiểm thử hồi quy", "regression testing là gì", "smoke test", "hồi quy cho người mới"],
  coverLabel: "NGƯỜI MỚI · REGRESSION · ERP",
  crumb: "Kiểm thử hồi quy & smoke test (người mới)",
  metaTitle: { vi: "Kiểm thử hồi quy & smoke test cho người mới", en: "Regression & smoke testing for beginners", ja: "初心者向け回帰・スモークテスト" },
  metaDescription: {
    vi: "Kiểm thử hồi quy & smoke test cho người mới trên dự án ERP: hồi quy là gì, smoke test gác cổng, kịch bản tác động dây chuyền giữa các module, file report và trắc nghiệm.",
    en: "Regression & smoke testing for beginners on an ERP project: what regression is, smoke gatekeeping, cross-module ripple scenarios, report file and a quiz.",
    ja: "初心者向け回帰・スモークテストをERP案件で：回帰とは・スモーク門番・モジュール間波及シナリオ・レポート・クイズ。",
  },
  title: {
    vi: "Kiểm thử hồi quy & smoke test cho người mới: dự án ERP, kịch bản & file report (có trắc nghiệm)",
    en: "Regression & smoke testing for beginners: an ERP project, scenarios & report file (with quiz)",
    ja: "初心者向け回帰・スモークテスト：ERP案件・シナリオ・レポート（クイズ付き）",
  },
  summary: {
    vi: "Bài thực hành cho người mới: kiểm thử hồi quy & smoke test trên dự án ERP nhiều module. Hồi quy và smoke test là gì, chiến lược & các bước, hai tình huống doanh nghiệp (sửa Kho làm sai Kế toán, smoke test chặn bản dựng hỏng), công cụ TestRail/Jira, báo cáo sức khỏe bản dựng, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Hands-on beginner article: regression & smoke testing on a multi-module ERP. What regression and smoke testing are, strategy & steps, two enterprise situations (Inventory fix breaking Accounting, smoke stopping a bad build), TestRail/Jira, a build-health report, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け実践：多モジュールERPの回帰・スモークテスト。回帰とスモークとは・戦略と手順・2つの企業シーン・TestRail/Jira・ビルド健全性報告・FAQ・クイズ。",
  },
  faqs: [e5_faq1, e5_faq2, e5_faq3],
  howTo: { name: "Cách chạy hồi quy & smoke test cho người mới", steps: [
    { name: "Chạy smoke test trước", text: "Kiểm nhanh vài chức năng cốt lõi; smoke fail thì trả lại bản dựng ngay." },
    { name: "Hồi quy vùng thay đổi & module liên kết", text: "Chạy lại test cho phần vừa sửa và các module dùng chung dữ liệu." },
    { name: "Ghi nhận & báo cáo sức khỏe bản dựng", text: "Liệt kê lỗi hồi quy, đánh dấu blocker, ghi rõ số phiên bản bản dựng." },
  ] },
  pages: e5_pages,
});

export const BEGINNER_MANUAL_ENT_DOCS = [ENT_DOC1, ENT_DOC2, ENT_DOC3, ENT_DOC4, ENT_DOC5];
