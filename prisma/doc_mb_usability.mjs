// doc_mb_usability.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử khả năng dùng (Usability Testing) — đánh giá app có DỄ DÙNG hay không: rõ ràng,
// nhất quán, ít bước, phản hồi tức thì, phòng lỗi & khôi phục, nhãn/nút dễ hiểu, luồng hoàn
// thành tác vụ, heuristic Nielsen cơ bản, cách quan sát người dùng thật.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy.
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, dashboard } from "./ui_mock.mjs";

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
    categorySlug: "manual-testing", slug: cfg.slug, cover, level: "beginner",
    tags: tags("congnghe", cfg.domain, "foundation", "beginner", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: màn hình thanh toán ShopEasy TRƯỚC cải thiện (khó dùng) ──
const m_hard = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán (trước cải thiện)", [
    field(24, 20, 330, "Địa chỉ", "23 Nguyễn Huệ, Q1", "normal"),
    field(372, 20, 330, "SĐT", "0903118226", "normal"),
    btn(24, 92, 80, "OK", "ghost"),
    btn(112, 92, 80, "Huỷ", "ghost"),
    btn(600, 210, 108, "»", "ghost"),
    annotate(596, 190, 116, 54, "CHÌM: nút đặt hàng bé & mờ"),
    annotate(20, 80, 180, 32, "MƠ HỒ: nhãn 'OK' khó hiểu"),
  ].join(""), { h: 260, accent: "#dc2626" }),
].join(""), { h: 316, title: "ShopEasy · Trước cải thiện", accent: "#dc2626" });

// ── Mockup 2: màn hình thanh toán ShopEasy SAU cải thiện (dễ dùng) ──
const m_easy = browser("shopeasy.vn/thanh-toan", [
  panel("ShopEasy · Thanh toán (sau cải thiện)", [
    field(24, 20, 330, "Địa chỉ nhận hàng", "23 Nguyễn Huệ, Q1, TP.HCM", "normal"),
    field(372, 20, 330, "Số điện thoại liên hệ", "0903 118 226", "normal"),
    btn(24, 92, 210, "◀ Quay lại giỏ hàng", "ghost"),
    btn(392, 168, 310, "Đặt hàng ngay · 398.000đ", "success"),
    annotate(388, 148, 318, 54, "RÕ RÀNG: nút to, nêu rõ số tiền"),
  ].join(""), { h: 260, accent: "#16a34a" }),
].join(""), { h: 316, title: "ShopEasy · Sau cải thiện", accent: "#16a34a" });

// ── Mockup 3: bảng heuristic Nielsen cơ bản, minh hoạ trên ShopEasy ──
const m_heuristic = grid("10 nguyên tắc Usability cơ bản (Nielsen) — áp trên ShopEasy",
  ["Nguyên tắc", "Ý nghĩa", "Ví dụ trên ShopEasy"], [
  ["Hiển thị trạng thái", "Luôn cho người dùng biết hệ thống đang làm gì", "Icon xoay + chữ 'Đang xử lý thanh toán...'"],
  ["Khớp thế giới thực", "Dùng ngôn ngữ, biểu tượng quen thuộc", "Nút 'Thêm vào giỏ' thay vì 'Submit Cart Item'"],
  ["Kiểm soát & tự do", "Luôn có lối thoát/hoàn tác rõ ràng", "Nút 'Quay lại giỏ hàng' ở mọi bước thanh toán"],
  ["Nhất quán & chuẩn", "Cùng 1 hành động luôn trông giống nhau", "Nút chính luôn màu xanh, cùng vị trí"],
  ["Phòng lỗi", "Chặn lỗi trước khi nó xảy ra", "Nút 'Đặt hàng' mờ đi tới khi điền đủ địa chỉ"],
  ["Nhận diện hơn ghi nhớ", "Hiện lựa chọn thay vì bắt nhớ", "Hiện lại địa chỉ đã lưu, không bắt gõ lại"],
  ["Giúp phục hồi lỗi", "Thông báo lỗi nêu rõ cách sửa", "'SĐT cần đủ 10 số' thay vì 'Có lỗi xảy ra'"],
], { accent: "#0891b2" });

// ── Mockup 4: checklist đánh giá khả năng dùng nhanh ──
const m_checklist = grid("Checklist đánh giá khả năng dùng nhanh (ShopEasy)",
  ["Tiêu chí", "Câu hỏi kiểm tra nhanh", "Trước / Sau cải thiện"], [
  ["Rõ ràng", "Người dùng hiểu ngay nút này làm gì không?", "✗ 'OK' / ✓ 'Đặt hàng ngay'"],
  ["Nhất quán", "Các nút có cùng màu, cùng vị trí mọi màn hình?", "✗ lộn xộn / ✓ đồng bộ"],
  ["Ít bước", "Hoàn thành mua hàng trong bao nhiêu bước?", "✗ 6 bước / ✓ 3 bước"],
  ["Phản hồi tức thì", "Bấm nút có phản hồi ngay (loading, đổi màu)?", "✗ im lặng / ✓ có spinner"],
  ["Phòng & khôi phục lỗi", "Có ngăn lỗi và giúp sửa dễ dàng không?", "✗ không / ✓ có gợi ý sửa"],
  ["Nhãn dễ hiểu", "Nhãn dùng từ quen thuộc, không thuật ngữ kỹ thuật?", "✗ 'Submit' / ✓ 'Đặt hàng'"],
], { accent: "#0891b2", note: "Càng nhiều dòng đạt 'Sau cải thiện', trải nghiệm càng tốt." });

// ── Mockup 5: ticket Jira của một vấn đề usability tìm được ──
const m_jira = jira({
  key: "SE-11320", title: "Nút 'Đặt hàng' bị chìm dưới màn hình, tỉ lệ bỏ giỏ hàng tăng 18%",
  type: "Usability Bug", status: "New", priority: "High", severity: "High",
  fields: [
    ["Môi trường", "production · mobile web ShopEasy · iOS Safari & Android Chrome"],
    ["Các bước", "1) Thêm SP vào giỏ 2) Vào trang Thanh toán 3) Điền địa chỉ, SĐT 4) Tìm nút đặt hàng để hoàn tất"],
    ["Kết quả mong đợi", "Nút 'Đặt hàng' nổi bật, người dùng thấy ngay không cần cuộn thêm"],
    ["Kết quả thực tế", "Nút chỉ là icon '»' nhỏ, nằm cuối trang; 5/6 người dùng thử nghiệm phải dò tìm >10 giây"],
    ["Bằng chứng", "video-usertest-se11320.mp4, heatmap-thanhtoan.png"],
  ],
});

// ── Mockup 6: dashboard số liệu usability trước/sau cải thiện ──
const m_dash = dashboard("Số liệu khả năng dùng: luồng mua hàng ShopEasy — trước vs sau", [
  { label: "Tỉ lệ hoàn thành mua hàng", value: "58% → 89%", sub: "trước / sau cải thiện", color: "#2563eb" },
  { label: "Thời gian hoàn tất", value: "3'40\" → 1'50\"", sub: "trung bình mỗi phiên", color: "#16a34a" },
  { label: "Số lần bấm nhầm", value: "4.2 → 0.6", sub: "lượt/phiên", color: "#e11d48" },
  { label: "Điểm hài lòng (SUS)", value: "58 → 84", sub: "thang điểm 100", color: "#7c3aed" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử khả năng dùng (usability testing) là gì, khác gì kiểm thử giao diện (UI testing)?",
  "What is usability testing, and how is it different from UI testing?",
  "Kiểm thử khả năng dùng là đánh giá xem người dùng thật có thể HOÀN THÀNH tác vụ một cách dễ dàng, nhanh chóng và tự tin hay không — như tìm nút đặt hàng, hiểu thông báo lỗi, ít thao tác sai. Còn kiểm thử giao diện (UI testing) chỉ kiểm tra giao diện có hiển thị ĐÚNG hay không (đúng vị trí, đúng màu, đúng font) chứ chưa chắc nói lên nó có DỄ DÙNG hay không. Một nút có thể hiển thị đúng pixel nhưng vẫn rất khó dùng nếu đặt sai chỗ hoặc nhãn mơ hồ.",
  "Usability testing evaluates whether real users can COMPLETE a task easily, quickly, and confidently — like finding the order button, understanding an error message, or making few mistakes. UI testing only checks whether the interface DISPLAYS correctly (right position, color, font), which doesn't necessarily mean it's easy to use. A button can render pixel-perfect yet still be hard to use if it's placed wrong or labeled vaguely.",
  "ユーザビリティテスト（使いやすさのテスト）とUIテストは何が違う？",
  "ユーザビリティテストは、実際のユーザーが注文ボタンを見つける、エラーメッセージを理解する、操作ミスが少ないなど、タスクを簡単・迅速・自信を持って完了できるかを評価します。一方UIテストは、画面が正しく表示されるか（位置・色・フォントが正しいか）だけを確認するもので、必ずしも使いやすさを意味しません。ピクセル単位で正しく表示されても、配置が悪かったりラベルが曖昧だと使いにくいままです。");
const faq2 = FAQ(
  "Vì sao người mới nên quan tâm đến kiểm thử khả năng dùng?",
  "Why should beginners care about usability testing?",
  "Vì một tính năng CHẠY ĐÚNG chức năng nhưng KHÓ DÙNG vẫn khiến khách hàng bỏ đi — họ không đợi bạn sửa, họ chỉ đơn giản chuyển sang app khác. Biết đánh giá usability giúp bạn báo cáo được những vấn đề mà kiểm thử chức năng thuần tuý bỏ sót (nút chìm, nhãn mơ hồ, quá nhiều bước), và đây cũng là kỹ năng phân biệt một tester giỏi với một tester chỉ 'chạy đúng kịch bản test case'.",
  "Because a feature that WORKS CORRECTLY but is HARD TO USE still drives customers away — they won't wait for a fix, they simply switch to another app. Knowing how to evaluate usability lets you report issues that pure functional testing misses (a hidden button, a vague label, too many steps), and it's also what separates a great tester from one who only 'runs through test case scripts'.",
  "初心者がユーザビリティテストを重視すべき理由は？",
  "機能的には正しく動作していても『使いにくい』機能は、顧客を離脱させてしまうからです。ユーザーは修正を待たず、単に別のアプリに乗り換えます。ユーザビリティを評価するスキルがあれば、純粋な機能テストでは見逃す問題（隠れたボタン、曖昧なラベル、多すぎる手順）を報告できます。これは『テストケースをただ実行するだけ』のテスターと優れたテスターを分ける力でもあります。");
const faq3 = FAQ(
  "Chưa có ngân sách/công cụ, làm sao quan sát người dùng thật để đánh giá usability?",
  "Without budget or tools, how can I observe real users to evaluate usability?",
  "Bạn không cần phòng lab đắt tiền. Cách đơn giản: mời 3-5 đồng nghiệp hoặc người thân chưa từng dùng app, đưa họ một nhiệm vụ cụ thể ('hãy mua 1 sản phẩm bất kỳ'), rồi im lặng quan sát và ghi lại: họ ngập ngừng ở đâu, bấm nhầm chỗ nào, nói gì khi bối rối. Không gợi ý, không giải thích trước — chính sự lúng túng thật của họ mới là dữ liệu quý giá nhất. Ghi hình màn hình (screen record) miễn phí là đủ để xem lại và phân tích.",
  "You don't need an expensive lab. A simple way: invite 3-5 colleagues or friends who've never used the app, give them a specific task ('buy any one product'), then silently observe and note: where they hesitate, where they misclick, what they say when confused. Don't hint or explain beforehand — their genuine confusion is the most valuable data. A free screen recording is enough to review and analyze later.",
  "予算やツールがなくても、実際のユーザーを観察してユーザビリティを評価するには？",
  "高価なラボは不要です。簡単な方法：アプリを一度も使ったことのない同僚や友人を3〜5人招き、具体的なタスク（『任意の商品を1つ購入してください』）を与え、黙って観察し記録します：どこでためらうか、どこで誤タップするか、混乱した時に何と言うか。事前にヒントや説明を与えないこと——その本物の戸惑いこそが最も貴重なデータです。無料の画面録画で十分に後で分析できます。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Kiểm thử khả năng dùng (usability testing) chủ yếu đánh giá điều gì?", en: "What does usability testing primarily evaluate?", ja: "ユーザビリティテストは主に何を評価する？" },
    options: [
      { vi: "Người dùng thật có thể hoàn thành tác vụ dễ dàng, nhanh chóng, ít lỗi hay không", en: "Whether real users can complete tasks easily, quickly, with few errors", ja: "実際のユーザーがタスクを簡単・迅速・少ないミスで完了できるか" },
      { vi: "Giao diện có đúng pixel, đúng màu như thiết kế hay không", en: "Whether the interface matches the design pixel-perfectly", ja: "画面がデザイン通りピクセル単位で正しいか" },
      { vi: "Server có chịu tải được 1000 người dùng cùng lúc không", en: "Whether the server can handle 1000 concurrent users", ja: "サーバーが1000人の同時ユーザーに耐えられるか" },
      { vi: "Mã nguồn có tuân theo chuẩn coding convention không", en: "Whether the source code follows coding conventions", ja: "ソースコードがコーディング規約に従っているか" },
    ], correct: 0,
    explain: { vi: "Usability testing tập trung vào trải nghiệm hoàn thành tác vụ của người dùng thật, không phải hiệu năng hay coding convention.", en: "Usability testing focuses on real users' task-completion experience, not performance or coding conventions.", ja: "ユーザビリティテストは実際のユーザーのタスク完了体験に焦点を当て、性能やコーディング規約ではありません。" },
  }),
  mcq({
    q: { vi: "Nguyên tắc 'Hiển thị trạng thái hệ thống' (Visibility of system status) nghĩa là gì?", en: "What does the 'Visibility of system status' heuristic mean?", ja: "『システム状態の視認性』の原則とはどういう意味？" },
    options: [
      { vi: "Ẩn hết trạng thái để giao diện gọn gàng hơn", en: "Hide all status to keep the UI cleaner", ja: "UIをすっきりさせるため状態を全て隠す" },
      { vi: "Luôn cho người dùng biết hệ thống đang làm gì, qua phản hồi kịp thời (loading, thông báo)", en: "Always let users know what the system is doing, via timely feedback (loading, messages)", ja: "ローディングやメッセージなど、システムが何をしているかを常にユーザーに知らせる" },
      { vi: "Chỉ hiển thị trạng thái khi có lỗi xảy ra", en: "Only show status when an error occurs", ja: "エラーが起きた時だけ状態を表示する" },
      { vi: "Không liên quan tới usability, chỉ là yêu cầu kỹ thuật", en: "Unrelated to usability, just a technical requirement", ja: "ユーザビリティとは無関係で技術的要件にすぎない" },
    ], correct: 1,
    explain: { vi: "Người dùng cần biết ngay hệ thống có đang xử lý hay không, để không bấm lại nhiều lần hoặc nghĩ app bị treo.", en: "Users need to know immediately whether the system is processing, so they don't click repeatedly or think the app froze.", ja: "ユーザーはシステムが処理中かどうかをすぐに知る必要があり、そうしないと何度もクリックしたりアプリがフリーズしたと思ったりします。" },
  }),
  mcq({
    q: { vi: "Đâu là ví dụ ĐÚNG cho nguyên tắc 'Phòng lỗi' (Error prevention) trên ShopEasy?", en: "Which is a CORRECT example of the 'Error prevention' heuristic on ShopEasy?", ja: "ShopEasyにおける『エラー防止』の正しい例はどれ？" },
    options: [
      { vi: "Để nút 'Đặt hàng' luôn sáng, bấm được kể cả khi chưa điền địa chỉ", en: "Keep the 'Order' button always active, clickable even without an address filled in", ja: "住所未入力でも『注文』ボタンを常にアクティブでクリック可能にする" },
      { vi: "Làm mờ (disabled) nút 'Đặt hàng' cho tới khi điền đủ thông tin bắt buộc", en: "Disable the 'Order' button until all required info is filled in", ja: "必須情報が全て入力されるまで『注文』ボタンを無効化する" },
      { vi: "Không hiển thị nhãn cho các ô nhập để giao diện gọn hơn", en: "Don't show labels for input fields to keep the UI cleaner", ja: "UIをすっきりさせるため入力欄にラベルを表示しない" },
      { vi: "Xoá luôn dữ liệu người dùng đã nhập nếu họ bấm nhầm nút", en: "Delete the user's entered data entirely if they misclick a button", ja: "ユーザーが誤クリックしたら入力済みデータを完全に削除する" },
    ], correct: 1,
    explain: { vi: "Làm mờ nút khi thiếu dữ liệu là cách chặn lỗi TRƯỚC khi nó xảy ra, đúng tinh thần 'Error prevention'.", en: "Disabling the button when data is missing blocks the error BEFORE it happens, matching 'error prevention'.", ja: "データ不足時にボタンを無効化することは、エラーが起きる前に防ぐ『エラー防止』の考え方に合致します。" },
  }),
  mcq({
    q: { vi: "Khi báo cáo một thông báo lỗi kém usability, cách góp ý tốt nhất là gì?", en: "When reporting a poor-usability error message, what's the best kind of feedback?", ja: "使いにくいエラーメッセージを報告する際、最も良い改善提案は？" },
    options: [
      { vi: "Chỉ ra thông báo hiện tại mơ hồ và đề xuất nội dung cụ thể hơn, nêu rõ cách sửa", en: "Point out the current message is vague and propose more specific wording that tells the user how to fix it", ja: "現在のメッセージが曖昧であることを指摘し、修正方法を明示するより具体的な文言を提案する" },
      { vi: "Chỉ báo 'thông báo lỗi này tệ' mà không giải thích thêm", en: "Just report 'this error message is bad' without further explanation", ja: "『このエラーメッセージはひどい』とだけ報告し、それ以上説明しない" },
      { vi: "Đề nghị xoá bỏ hoàn toàn thông báo lỗi", en: "Suggest removing the error message entirely", ja: "エラーメッセージを完全に削除するよう提案する" },
      { vi: "Không cần báo cáo vì thông báo lỗi không ảnh hưởng usability", en: "No need to report it since error messages don't affect usability", ja: "エラーメッセージはユーザビリティに影響しないので報告不要" },
    ], correct: 0,
    explain: { vi: "Một thông báo lỗi tốt phải giúp người dùng hiểu và tự sửa được; góp ý cần cụ thể, có đề xuất nội dung thay thế.", en: "A good error message must help users understand and fix the issue themselves; feedback should be specific, with a proposed alternative.", ja: "良いエラーメッセージはユーザーが理解し自分で修正できるようにするもの。フィードバックは具体的で、代替案を提示すべきです。" },
  }),
  mcq({
    q: { vi: "Cách quan sát người dùng thật hiệu quả nhất khi làm usability testing là gì?", en: "What's the most effective way to observe real users during usability testing?", ja: "ユーザビリティテストで実際のユーザーを観察する最も効果的な方法は？" },
    options: [
      { vi: "Giải thích trước cách dùng app thật kỹ để họ không bị bối rối", en: "Explain in detail how to use the app beforehand so they don't get confused", ja: "混乱しないよう事前にアプリの使い方を詳しく説明する" },
      { vi: "Đưa nhiệm vụ cụ thể, im lặng quan sát, ghi lại chỗ họ ngập ngừng/bấm nhầm mà không gợi ý trước", en: "Give a specific task, silently observe, and note where they hesitate/misclick without hinting beforehand", ja: "具体的なタスクを与え、黙って観察し、事前にヒントを与えずためらいや誤操作を記録する" },
      { vi: "Chỉ hỏi ý kiến người dùng qua khảo sát, không cần quan sát thao tác thật", en: "Only ask users via a survey, no need to observe actual actions", ja: "アンケートで意見を聞くだけで、実際の操作は観察しない" },
      { vi: "Chỉ chọn người dùng đã quen thuộc với app để kết quả 'đẹp' hơn", en: "Only pick users already familiar with the app so results look 'nicer'", ja: "結果を『良く』見せるため、アプリに慣れたユーザーだけを選ぶ" },
    ], correct: 1,
    explain: { vi: "Sự lúng túng THẬT của người dùng chưa quen app là dữ liệu quý nhất; gợi ý trước hay chọn người đã quen sẽ làm sai lệch kết quả.", en: "The genuine confusion of unfamiliar users is the most valuable data; hinting beforehand or picking familiar users skews the results.", ja: "アプリに不慣れなユーザーの本物の戸惑いこそ最も貴重なデータ。事前ヒントや慣れたユーザーの選定は結果を歪めます。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử khả năng dùng (usability testing) là đánh giá xem một tính năng có DỄ DÙNG với người dùng thật hay không: có rõ ràng, nhất quán, ít bước, phản hồi tức thì, phòng lỗi và dễ khôi phục hay không — chứ không chỉ 'chạy đúng chức năng'. Bài này bám luồng mua hàng của app TMĐT ShopEasy: bạn sẽ học các nguyên tắc heuristic Nielsen cơ bản, cách quan sát người dùng thật, và so sánh một màn hình khó dùng với phiên bản đã cải thiện. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Usability testing evaluates whether a feature is EASY TO USE for real users: is it clear, consistent, low-step, gives instant feedback, prevents and recovers from errors well — not just whether it 'runs correctly'. This article follows ShopEasy's purchase flow: you'll learn basic Nielsen heuristics, how to observe real users, and compare a hard-to-use screen with an improved version. Lots of visuals and a quiz at the end.",
        "ユーザビリティテスト（使いやすさのテスト）とは、機能が単に『正しく動く』かではなく、実際のユーザーにとって使いやすいか——明確さ、一貫性、少ない手順、即座のフィードバック、エラー防止と回復のしやすさ——を評価することです。本記事はECアプリShopEasyの購入フローに沿い、基本的なニールセンのヒューリスティック、実際のユーザーの観察方法、使いにくい画面と改善版の比較を学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Bạn đã bao giờ thử một app rồi bấm nhầm, tìm mãi không ra nút 'Đặt hàng', hay đọc thông báo lỗi mà chẳng hiểu phải sửa gì chưa? Đó chính là lúc kiểm thử khả năng dùng (usability testing) phát huy tác dụng: nó không hỏi 'chức năng có chạy đúng không' mà hỏi 'người dùng thật có DÙNG ĐƯỢC nó một cách dễ dàng, tự tin không'. Trong bài này, chúng ta sẽ cùng đánh giá luồng mua hàng của app TMĐT ShopEasy qua các nguyên tắc cơ bản, có hình minh hoạ và bài tập tự làm.",
        "Hi, newcomer! Have you ever tried an app, misclicked, searched forever for the 'Order' button, or read an error message without understanding what to fix? That's exactly when usability testing matters: it doesn't ask 'does the function run correctly' but 'can real users actually USE it easily and confidently'. In this article, we'll evaluate ShopEasy's purchase flow through basic principles, with visuals and hands-on exercises.",
        "こんにちは、初心者さん！アプリを試して誤タップしたり、『注文』ボタンをずっと探したり、エラーメッセージを読んでも何を直せばいいか分からなかったことはありませんか？まさにそんな時にユーザビリティテストが役立ちます：『機能が正しく動くか』ではなく『実際のユーザーが簡単・自信を持って使えるか』を問うのです。本記事ではECアプリShopEasyの購入フローを基本原則で評価し、図と実習で学びます。"),
      IMG(m_hard, "Màn hình test: trang thanh toán ShopEasy TRƯỚC cải thiện — nút đặt hàng bị chìm, nhãn mơ hồ", "Screen under test: ShopEasy checkout BEFORE improvement — hidden order button, vague labels", "テスト対象画面：改善前のShopEasy決済画面——隠れた注文ボタン、曖昧なラベル"),
      DEF("Usability Testing", "kiểm thử đánh giá mức độ dễ dùng của một tính năng với người dùng thật: rõ ràng, nhất quán, ít bước, phản hồi tức thì, phòng lỗi và dễ khôi phục.",
        "testing that evaluates how easy a feature is for real users to use: clear, consistent, few steps, instant feedback, error prevention and easy recovery.",
        "実際のユーザーにとって機能がどれだけ使いやすいかを評価するテスト：明確さ、一貫性、少ない手順、即座のフィードバック、エラー防止と回復のしやすさ。"),
    ] },
  { heading: { vi: "2. Usability là gì & các nguyên tắc heuristic Nielsen cơ bản", en: "2. What is usability & basic Nielsen heuristics", ja: "2. ユーザビリティとは・基本的なニールセンのヒューリスティック" },
    blocks: [
      P("Nói đơn giản: một tính năng có usability tốt là khi người dùng KHÔNG PHẢI SUY NGHĨ NHIỀU để dùng nó. Họ nhìn vào là hiểu nút này làm gì, thao tác vài bước là xong việc, và nếu lỡ làm sai thì hệ thống giúp họ nhận ra và sửa ngay chứ không bỏ mặc họ bối rối. Nielsen — một chuyên gia usability nổi tiếng — đã đúc kết thành 10 nguyên tắc heuristic để đánh giá nhanh, không cần công cụ phức tạp.",
        "Simply put: a feature with good usability is one where users DON'T HAVE TO THINK HARD to use it. They look at it and understand what a button does, finish a task in a few steps, and if they make a mistake, the system helps them notice and fix it rather than leaving them confused. Nielsen — a well-known usability expert — distilled this into 10 heuristics for quick evaluation without complex tools.",
        "簡単に言うと、ユーザビリティが良い機能とは、ユーザーが『あまり考えなくても』使える機能です。見ればボタンが何をするか分かり、数手順でタスクを終え、もし間違えてもシステムが気づかせて修正を助けてくれる——放置して混乱させません。有名なユーザビリティ専門家ニールセンは、複雑なツールなしで素早く評価できる10の原則にまとめました。"),
      IMG(m_heuristic, "Bảng tóm tắt các nguyên tắc heuristic Nielsen cơ bản, áp dụng trên ShopEasy", "Summary table of basic Nielsen heuristics, applied to ShopEasy", "基本的なニールセンのヒューリスティックまとめ表、ShopEasyに適用"),
      P("Bạn không cần thuộc lòng cả 10 nguyên tắc ngay từ đầu. Với người mới, hãy tập trung vào những nguyên tắc dễ quan sát nhất trước: RÕ RÀNG (nhãn/nút dễ hiểu), NHẤT QUÁN (cùng hành động trông giống nhau ở mọi nơi), ÍT BƯỚC (không bắt người dùng đi vòng), PHẢN HỒI TỨC THÌ (bấm cái gì cũng có phản ứng ngay), và PHÒNG LỖI & KHÔI PHỤC (ngăn lỗi trước, giúp sửa dễ nếu lỡ sai). Đây chính là 5 tiêu chí cốt lõi bạn sẽ dùng xuyên suốt bài này.",
        "You don't need to memorize all 10 principles right away. As a beginner, focus first on the easiest ones to observe: CLARITY (understandable labels/buttons), CONSISTENCY (the same action looks the same everywhere), FEW STEPS (no forcing users to go the long way), INSTANT FEEDBACK (every action gets an immediate reaction), and ERROR PREVENTION & RECOVERY (block mistakes upfront, help fix them easily if they happen). These are the 5 core criteria you'll use throughout this article.",
        "最初から10原則すべてを暗記する必要はありません。初心者はまず観察しやすいものに集中しましょう：明確さ（分かりやすいラベル/ボタン）、一貫性（同じ操作はどこでも同じに見える）、少ない手順（遠回りさせない）、即座のフィードバック（何を押しても即座に反応がある）、エラー防止と回復（事前に防ぎ、間違えても直しやすい）。これが本記事全体で使う5つの中核基準です。"),
      DEF("Nielsen Heuristics", "10 nguyên tắc kinh nghiệm (rule-of-thumb) để đánh giá nhanh usability của giao diện, do Jakob Nielsen đề xuất.",
        "10 rule-of-thumb principles for quickly evaluating an interface's usability, proposed by Jakob Nielsen.",
        "ヤコブ・ニールセンが提唱した、インターフェースのユーザビリティを素早く評価するための10の経験則。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử khả năng dùng", en: "3. Why beginners need to master usability testing", ja: "3. 初心者がユーザビリティテストを習得すべき理由" },
    blocks: [
      P("Nhiều bạn mới học test chỉ tập trung vào 'chức năng có chạy đúng không': bấm nút A thì có ra kết quả B không. Nhưng thực tế, một app có thể chạy đúng 100% chức năng mà vẫn khiến khách hàng bỏ đi ngay lập tức nếu nó khó dùng — tìm mãi không ra nút, đọc lỗi mà không hiểu, phải làm quá nhiều bước cho một việc đơn giản. Khách hàng không đọc tài liệu kỹ thuật để hiểu 'tính năng đã chạy đúng'; họ chỉ cảm nhận app này 'dễ chịu' hay 'khó chịu'.",
        "Many beginners focus only on 'does the function run correctly': click button A, does result B appear. But in reality, an app can run 100% of its functions correctly and still make customers leave immediately if it's hard to use — endlessly searching for a button, reading an error they don't understand, needing too many steps for a simple task. Customers don't read technical docs to know 'the feature ran correctly'; they simply feel whether the app is 'pleasant' or 'frustrating'.",
        "初心者の多くは『機能が正しく動くか』——ボタンAを押すと結果Bが出るか——だけに注目しがちです。しかし実際には、機能が100%正しく動いていても、使いにくければ顧客はすぐに離れていきます——ボタンを探し続ける、理解できないエラーを読む、簡単な作業に多すぎる手順を要する。顧客は技術文書を読んで『機能が正しく動いた』と理解するのではなく、単に『快適』か『不快』かを感じるだけです。"),
      P("Với riêng bạn — người mới — kỹ năng đánh giá usability cho thấy bạn tư duy như một người bảo vệ trải nghiệm người dùng, không chỉ 'kiểm tra kịch bản có pass hay không'. Đây cũng là điều nhà tuyển dụng đánh giá cao: một tester chỉ chạy test case sẽ báo 'PASS' cho một màn hình chức năng đúng nhưng khó dùng, còn một tester giỏi sẽ chủ động chỉ ra 'chức năng đúng nhưng người dùng khó tìm ra nút này, nên cải thiện'.",
        "For you specifically — a beginner — the skill of evaluating usability shows you think like someone protecting the user experience, not just 'checking whether a script passes'. This is also something employers value highly: a tester who only runs test cases will mark 'PASS' for a functionally correct but hard-to-use screen, while a great tester proactively points out 'functionally correct, but users struggle to find this button — it should be improved'.",
        "特に初心者のあなたにとって、ユーザビリティを評価するスキルは、『スクリプトが合格するかだけ』ではなく、ユーザー体験を守る人として考えていることを示します。これは雇用者が高く評価する点でもあります：テストケースを実行するだけのテスターは、機能的に正しいが使いにくい画面に『合格』を付けますが、優れたテスターは『機能は正しいがユーザーがこのボタンを見つけにくい、改善すべき』と自ら指摘します。"),
      P("Và quan trọng nhất: usability kém trực tiếp ảnh hưởng doanh thu. Một nút đặt hàng bị chìm có thể khiến khách hàng bỏ giỏ hàng giữa chừng — công ty mất đơn hàng dù mọi chức năng phía sau đều hoạt động hoàn hảo. Đầu tư đúng mức vào kiểm thử khả năng dùng là bạn đang bảo vệ trực tiếp trải nghiệm và doanh thu của sản phẩm.",
        "And most importantly: poor usability directly hurts revenue. A hidden order button can make a customer abandon their cart midway — the company loses the order even though every function behind it works perfectly. Properly investing in usability testing directly protects the product's experience and revenue.",
        "そして最も重要なのは、悪いユーザビリティは直接収益に影響するということです。隠れた注文ボタンは、その裏側の機能がすべて完璧に動いていても、顧客が途中でカートを放棄する原因になり得ます。ユーザビリティテストに適切に投資することは、製品の体験と収益を直接守ることです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: tiêu chí đánh giá & checklist", en: "4. Prepare: evaluation criteria & checklist", ja: "4. 準備：評価基準とチェックリスト" },
    blocks: [
      P("Bạn không cần phần mềm đặc biệt để bắt đầu — chỉ cần một checklist gọn để không bỏ sót góc nào khi đánh giá một màn hình hay một luồng thao tác bất kỳ.",
        "You don't need special software to start — just a compact checklist so you don't miss any angle when evaluating any screen or flow.",
        "始めるのに特別なソフトウェアは不要です——どんな画面やフローを評価しても見落としがないよう、コンパクトなチェックリストがあれば十分です。"),
      STEP(1, "Chọn một luồng thao tác cụ thể để đánh giá (ví dụ: luồng thanh toán của ShopEasy).", "Pick a specific flow to evaluate (e.g. ShopEasy's checkout flow).", "評価する具体的なフローを1つ選ぶ（例：ShopEasyの決済フロー）。"),
      STEP(2, "Với mỗi màn hình trong luồng, áp lần lượt 5 tiêu chí: rõ ràng, nhất quán, ít bước, phản hồi tức thì, phòng lỗi & khôi phục.", "For each screen in the flow, apply the 5 criteria in turn: clarity, consistency, few steps, instant feedback, error prevention & recovery.", "フロー内の各画面に対し、明確さ・一貫性・少ない手順・即座のフィードバック・エラー防止と回復の5基準を順に適用する。"),
      STEP(3, "Ghi lại mọi điểm mù cụ thể (không chỉ 'khó dùng' chung chung) kèm ảnh chụp màn hình làm bằng chứng.", "Write down every specific blind spot (not just a vague 'hard to use') along with a screenshot as evidence.", "具体的な問題点を（『使いにくい』という漠然とした指摘ではなく）スクリーンショットの証拠と共に記録する。"),
      TRY("Mở một app bạn hay dùng, thử làm 1 tác vụ đơn giản và đếm xem mất bao nhiêu bước/lần bấm nhầm.", "Open an app you use often, try one simple task, and count how many steps/misclicks it takes.", "よく使うアプリを開き、簡単なタスクを1つ試して、何ステップ/何回誤タップしたか数えてみよう。"),
      PITFALL("Đánh giá usability theo CẢM TÍNH cá nhân ('tôi thấy màu này xấu') thay vì theo tiêu chí cụ thể (rõ ràng, nhất quán, ít bước...). Ý kiến thẩm mỹ và vấn đề usability là hai chuyện khác nhau.", "Evaluating usability by PERSONAL TASTE ('I think this color looks ugly') instead of specific criteria (clarity, consistency, few steps...). Aesthetic opinion and a usability issue are two different things.", "個人的な好み（『この色は嫌い』）で評価し、明確さ・一貫性・少ない手順といった具体的基準を使わないこと。美的な意見とユーザビリティの問題は別物です。"),
      IMG(m_checklist, "Checklist đánh giá khả năng dùng nhanh, dùng khi thời gian có hạn", "Quick usability-evaluation checklist, for when time is limited", "時間が限られる時に使う、素早いユーザビリティ評価チェックリスト"),
    ] },
  { heading: { vi: "5. Đánh giá từng bước (thực hành)", en: "5. Evaluating step by step (hands-on)", ja: "5. 一歩ずつ評価する（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào trang thanh toán ShopEasy — nơi trực tiếp ảnh hưởng doanh thu vì đây là bước cuối trước khi khách hàng trả tiền. Làm theo thứ tự dưới đây để có một đánh giá đầy đủ.",
        "Now let's apply it for real to ShopEasy's checkout page — which directly affects revenue since it's the last step before a customer pays. Follow the order below for a complete evaluation.",
        "では、収益に直接影響するShopEasyの決済ページ——顧客が支払う前の最後のステップ——に実際に適用しましょう。以下の順に沿って完全な評価をしましょう。"),
      STEP(1, "Đếm số bước từ 'xem giỏ hàng' tới 'đặt hàng thành công'; càng nhiều bước, càng dễ khiến khách hàng bỏ cuộc.", "Count the steps from 'view cart' to 'order successful'; more steps means customers are more likely to give up.", "『カートを見る』から『注文成功』までの手順数を数える；手順が多いほど顧客が離脱しやすい。"),
      STEP(2, "Kiểm tra nút quan trọng nhất (Đặt hàng) có nổi bật, dễ thấy không cần cuộn thêm không.", "Check whether the most important button (Order) is prominent and visible without extra scrolling.", "最も重要なボタン（注文）が目立ち、追加スクロールなしで見えるか確認する。"),
      STEP(3, "Thử cố tình để trống một trường bắt buộc: quan sát xem hệ thống có phản hồi tức thì, thông báo rõ cách sửa không.", "Deliberately leave a required field blank: observe whether the system gives instant feedback and clearly explains how to fix it.", "わざと必須項目を空欄のままにする：システムが即座にフィードバックし、修正方法を明確に説明するか観察する。"),
      STEP(4, "So sánh với phiên bản đã cải thiện (nếu có) hoặc phác hoạ đề xuất cải thiện của riêng bạn.", "Compare with an improved version (if available), or sketch your own improvement proposal.", "改善版（あれば）と比較するか、自分自身の改善提案をスケッチする。"),
      CODE("text", "SO SANH TRUOC/SAU - trang thanh toan ShopEasy\nTieu chi           | Truoc cai thien          | Sau cai thien\nSo buoc            | 6 buoc, phai cuon 2 lan  | 3 buoc, khong can cuon\nNhan nut            | 'OK' / '»' (mo ho)        | 'Dat hang ngay - 398.000d' (ro rang)\nPhan hoi khi loi    | im lang, khong bao gi     | vien do + 'SDT can du 10 so'\nKet qua user test   | 5/6 nguoi mat >10s tim nut| 6/6 nguoi tim thay ngay"),
      TRY("Chọn 1 màn hình khác trong app bạn dùng, đếm số bước để hoàn thành 1 tác vụ và ghi lại 1 điểm bạn thấy có thể cải thiện.", "Pick another screen in an app you use, count the steps to complete a task, and note one thing you'd improve.", "使っているアプリの別の画面を選び、タスク完了までの手順数を数え、改善できると思う点を1つ記録しよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: nút quan trọng bị chìm khiến bỏ giỏ hàng", en: "6. Situation 1: a hidden key button causes cart abandonment", ja: "6. シーン1：重要なボタンが埋もれてカート放棄を招く" },
    blocks: [
      SITUATION("Đội thiết kế đặt nút 'Đặt hàng' dưới dạng icon nhỏ '»' ở góc cuối trang thanh toán, cho rằng giao diện như vậy 'gọn và hiện đại'.", "The design team places the 'Order' button as a tiny '»' icon at the bottom corner of the checkout page, believing it makes the UI 'clean and modern'.",
        "Kết quả kiểm thử người dùng: 5/6 người tham gia mất hơn 10 giây để tìm ra nút, 2 người bỏ cuộc giữa chừng vì nghĩ trang bị lỗi. Số liệu production sau đó cho thấy tỉ lệ bỏ giỏ hàng tăng 18% so với tháng trước.",
        "User test results: 5/6 participants took over 10 seconds to find the button, and 2 gave up midway thinking the page was broken. Production data afterward showed cart abandonment rose 18% versus the previous month.",
        "デザインチームは決済ページ下部の隅に『注文』ボタンを小さな『»』アイコンとして配置し、それが『すっきりモダン』だと考えていた。",
        "ユーザーテスト結果：参加者6人中5人がボタンを見つけるのに10秒以上かかり、2人はページが壊れていると思い途中で諦めた。その後の本番データでは前月比でカート放棄率が18%上昇した。"),
      SOLVE("Đổi nút thành dạng chữ rõ ràng 'Đặt hàng ngay · [số tiền]', màu nổi bật, đặt ở vị trí không cần cuộn thêm — áp đúng nguyên tắc 'Rõ ràng' và 'Khớp thế giới thực' (người dùng quen chữ hơn icon lạ).", "Change the button to clear text 'Order now · [amount]', a prominent color, placed where no extra scroll is needed — applying the 'Clarity' and 'Match with real world' heuristics (users understand text better than an unfamiliar icon).", "ボタンを『今すぐ注文・[金額]』という明確な文言、目立つ色にし、追加スクロール不要な位置に配置する——『明確さ』と『現実世界との一致』の原則を適用（ユーザーは見慣れないアイコンより文字を理解しやすい）。"),
      P("Đây là bài học lớn nhất trong chương này: 'gọn và hiện đại' theo mắt người thiết kế không đồng nghĩa với 'dễ dùng' theo trải nghiệm người dùng thật. Một icon lạ, dù đẹp, vẫn có thể khiến người dùng không biết đó là nút bấm — hoặc tệ hơn là không thấy nó tồn tại. Luôn ưu tiên RÕ RÀNG hơn 'gọn gàng' cho các hành động quan trọng nhất trong luồng.",
        "This is the biggest lesson in this chapter: 'clean and modern' in the designer's eyes doesn't equal 'easy to use' in real users' experience. An unfamiliar icon, however pretty, can leave users unsure it's even a button — or worse, they never notice it exists. Always prioritize CLARITY over 'cleanliness' for the most important actions in a flow.",
        "この章での最大の教訓です：デザイナーの目には『すっきりモダン』でも、実際のユーザー体験では『使いやすい』とは限りません。見慣れないアイコンは、どれほど美しくてもそれがボタンだと分からせられなかったり、最悪の場合その存在にすら気づかせないことがあります。フロー内の最も重要な操作には、常に『すっきりさ』より『明確さ』を優先しましょう。"),
      IMG(m_jira, "Ticket usability tìm được qua kiểm thử người dùng: nút đặt hàng bị chìm", "A usability ticket found via user testing: the hidden order button", "ユーザーテストで見つかったユーザビリティチケット：隠れた注文ボタン"),
      RECAP(["'Gọn gàng' theo mắt designer KHÔNG đồng nghĩa 'dễ dùng' với người dùng thật", "Hành động quan trọng nhất trong luồng cần RÕ RÀNG hơn mọi thứ khác"],
        ["'Clean' in a designer's eyes does NOT mean 'easy to use' for real users", "The most important action in a flow needs to be CLEARER than everything else"],
        ["デザイナーの目に『すっきり』でも実際のユーザーには『使いやすい』とは限らない", "フロー内で最も重要な操作は他の何よりも明確であるべき"]),
    ] },
  { heading: { vi: "7. Tình huống 2: báo lỗi không chỉ cách sửa", en: "7. Situation 2: an error message that doesn't say how to fix it", ja: "7. シーン2：修正方法を示さないエラーメッセージ" },
    blocks: [
      SITUATION("Bạn thử để trống ô 'Số điện thoại' rồi bấm 'Đặt hàng ngay' trên trang thanh toán ShopEasy.", "You leave the 'Phone number' field blank and click 'Order now' on ShopEasy's checkout page.",
        "Hệ thống chỉ hiện dòng chữ đỏ 'Có lỗi xảy ra' phía trên form, không nói rõ lỗi ở ô nào hay cần sửa gì. Bạn phải tự dò từng ô một để đoán, mất gần 1 phút cho một lỗi lẽ ra chỉ cần 3 giây để nhận ra.",
        "The system only shows a red line saying 'An error occurred' above the form, without specifying which field is wrong or what to fix. You have to guess by checking each field one by one, taking nearly a minute for an error that should take 3 seconds to spot.",
        "ShopEasyの決済ページで『電話番号』欄を空欄のまま『今すぐ注文』をクリックしてみる。",
        "システムはフォーム上部に赤字で『エラーが発生しました』とだけ表示し、どの項目が間違っているか、何を修正すべきか示さない。1つずつ項目を確認して推測せねばならず、本来3秒で気づけるはずのエラーに1分近くかかる。"),
      SOLVE("Đổi thông báo chung chung thành thông báo cụ thể tại đúng ô lỗi: viền đỏ quanh ô 'Số điện thoại' + dòng chữ 'Số điện thoại không được để trống' ngay dưới ô đó — người dùng biết ngay lỗi ở đâu và cách sửa.", "Replace the generic message with a specific one right at the faulty field: a red border around the 'Phone number' field plus the text 'Phone number cannot be blank' right below it — users instantly know where the error is and how to fix it.", "汎用メッセージをエラー箇所の項目に具体的に表示するよう変更：『電話番号』欄の周りを赤枠にし、その下に『電話番号を空欄にできません』と表示——ユーザーはエラーの場所と修正方法をすぐに把握できる。"),
      P("Ví dụ này cho thấy vì sao nguyên tắc 'Giúp nhận diện, chẩn đoán và phục hồi lỗi' quan trọng không kém việc 'phòng lỗi'. Ngăn lỗi trước là tốt, nhưng khi lỗi đã xảy ra (dù do người dùng hay do hệ thống), thông báo phải NÊU RÕ vị trí lỗi và CÁCH SỬA cụ thể — chứ không chỉ báo 'có lỗi' rồi để người dùng tự bơi.",
        "This example shows why the 'Help recognize, diagnose, and recover from errors' heuristic matters as much as 'error prevention'. Preventing errors upfront is good, but once an error occurs (whether from the user or the system), the message must STATE the exact location and the specific FIX — not just say 'an error occurred' and leave users to figure it out alone.",
        "この例は『エラーの認識・診断・回復を助ける』原則が『エラー防止』と同じくらい重要である理由を示しています。事前にエラーを防ぐのは良いことですが、（ユーザー起因でもシステム起因でも）エラーが発生したら、メッセージは正確な場所と具体的な修正方法を示すべきで、単に『エラーが発生しました』とだけ言ってユーザーを放置してはいけません。"),
      TRY("Thử một app bất kỳ, cố tình nhập sai một ô, và đánh giá xem thông báo lỗi có nêu rõ vị trí + cách sửa hay chỉ nói chung chung 'có lỗi xảy ra'.", "Try any app, deliberately enter something wrong in a field, and evaluate whether the error message states the location + fix, or just vaguely says 'an error occurred'.", "任意のアプリを試し、わざと項目に誤入力し、エラーメッセージが場所と修正方法を示すか、それとも漠然と『エラーが発生しました』とだけ言うか評価しよう。"),
    ] },
  { heading: { vi: "8. Quan sát người dùng thật & đo lường kết quả", en: "8. Observing real users & measuring results", ja: "8. 実際のユーザーを観察し結果を測定する" },
    blocks: [
      P("Đánh giá bằng mắt bạn (heuristic) là bước khởi đầu tốt, nhưng cách chắc chắn nhất để biết một màn hình có thật sự dễ dùng hay không là quan sát NGƯỜI DÙNG THẬT thao tác. Mời vài người chưa quen app, đưa họ một nhiệm vụ cụ thể ('hãy mua 1 sản phẩm bất kỳ'), rồi im lặng quan sát: họ ngập ngừng ở đâu, bấm nhầm chỗ nào, nói gì khi bối rối. Đừng gợi ý trước — sự lúng túng thật mới là dữ liệu quý.",
        "Evaluating with your own eyes (heuristics) is a good start, but the surest way to know if a screen is truly easy to use is to observe REAL USERS acting on it. Invite a few people unfamiliar with the app, give them a specific task ('buy any one product'), then silently observe: where they hesitate, where they misclick, what they say when confused. Don't hint beforehand — genuine confusion is the valuable data.",
        "自分の目（ヒューリスティック）で評価するのは良い出発点ですが、画面が本当に使いやすいかを知る最も確実な方法は実際のユーザーの操作を観察することです。アプリに不慣れな人を数人招き、具体的なタスク（『任意の商品を1つ購入してください』）を与え、黙って観察します：どこでためらうか、どこで誤タップするか、混乱した時に何と言うか。事前にヒントを与えないこと——本物の戸惑いこそが貴重なデータです。"),
      IMG(m_easy, "Màn hình thanh toán ShopEasy SAU cải thiện — nút rõ ràng, ít bước, phản hồi tức thì", "ShopEasy checkout screen AFTER improvement — clear button, few steps, instant feedback", "改善後のShopEasy決済画面——明確なボタン、少ない手順、即座のフィードバック"),
      IMG(m_dash, "Số liệu usability trước/sau cải thiện: tỉ lệ hoàn thành, thời gian, số lần bấm nhầm, điểm hài lòng", "Usability metrics before/after improvement: completion rate, time, misclicks, satisfaction score", "改善前後のユーザビリティ指標：完了率、時間、誤タップ数、満足度スコア"),
      TIP("Ba con số dễ đo nhất để chứng minh cải thiện usability: TỈ LỆ HOÀN THÀNH tác vụ, THỜI GIAN trung bình để hoàn thành, và SỐ LẦN BẤM NHẦM/thao tác thừa. So sánh trước/sau là bằng chứng thuyết phục nhất khi báo cáo với đội sản phẩm.", "The three easiest numbers to measure and prove usability improvement: task COMPLETION RATE, average TIME to complete, and the number of MISCLICKS/extra actions. Before/after comparison is the most convincing evidence when reporting to the product team.", "ユーザビリティ改善を証明する最も測りやすい3つの数値：タスクの完了率、完了までの平均時間、誤タップ/余分な操作の回数。プロダクトチームへの報告では、改善前後の比較が最も説得力のある証拠です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi làm kiểm thử khả năng dùng. Biết trước giúp bạn đánh giá hiệu quả và thuyết phục hơn.",
        "Beginners often stumble on a few common mistakes when doing usability testing. Knowing them helps you evaluate more effectively and persuasively.",
        "初心者はユーザビリティテストで共通の失敗をしがちです。事前に知れば、より効果的で説得力のある評価ができます。"),
      PITFALL("Nhầm lẫn usability với thẩm mỹ: chê 'giao diện xấu' thay vì chỉ ra cụ thể người dùng bị cản trở ở đâu (nút khó thấy, nhãn mơ hồ, quá nhiều bước).", "Confusing usability with aesthetics: criticizing 'the UI looks ugly' instead of pointing out specifically where users get blocked (a hard-to-see button, a vague label, too many steps).", "ユーザビリティと美的感覚を混同する：『UIが醜い』と批判するだけで、ユーザーがどこで妨げられるか（見えにくいボタン、曖昧なラベル、多すぎる手順）を具体的に指摘しない。"),
      PITFALL("Chỉ tự mình thử rồi kết luận 'dễ dùng', quên rằng bạn đã quá quen với sản phẩm nên không còn nhận ra những điểm gây bối rối cho người dùng mới.", "Only trying it yourself and concluding 'it's easy to use', forgetting you're too familiar with the product to notice what confuses new users.", "自分だけで試して『使いやすい』と結論づけ、製品に慣れすぎていて新規ユーザーを混乱させる点に気づけないことを忘れる。"),
      TIP("Trước khi báo một vấn đề là 'lỗi usability', tự hỏi: 'Đây có thực sự cản trở người dùng hoàn thành tác vụ không, hay chỉ là ý kiến cá nhân của mình?' — kèm bằng chứng cụ thể (ảnh chụp, số liệu, video quan sát) luôn thuyết phục hơn lời nhận xét chung chung.", "Before reporting something as a 'usability issue', ask: 'Does this genuinely block users from completing the task, or is it just my personal opinion?' — evidence (screenshots, numbers, observation video) is always more convincing than a vague remark.", "『ユーザビリティの問題』として報告する前に自問しよう：『これは本当にユーザーのタスク完了を妨げるのか、それとも自分の個人的な意見か？』——具体的な証拠（スクリーンショット、数値、観察動画）は漠然としたコメントより常に説得力があります。"),
      IMG(m_checklist, "Nhắc lại checklist đánh giá usability — dùng khi thời gian có hạn", "Reminder of the usability-evaluation checklist — use when time is limited", "ユーザビリティ評価チェックリストの再確認——時間が限られる時に使用"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Test giao diện (UI Testing) cho người mới", "UI testing for beginners", "test-giao-dien-ui-testing-cho-nguoi-moi", "初心者のためのUIテスト"),
      INTERNAL("Kiểm thử thông báo & validation cho người mới", "Testing notifications & validation for beginners", "kiem-thu-thong-bao-validation-cho-nguoi-moi", "初心者のための通知・バリデーションテスト"),
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách đánh giá kiểm thử khả năng dùng qua trang thanh toán ShopEasy: các nguyên tắc heuristic Nielsen cơ bản (rõ ràng, nhất quán, ít bước, phản hồi tức thì, phòng lỗi & khôi phục), cách quan sát người dùng thật để tìm điểm mù, và hai tình huống thật cho thấy một nút chìm hay một thông báo lỗi mơ hồ có thể khiến khách hàng bỏ cuộc dù chức năng vẫn chạy đúng. Đây là kỹ năng giúp bạn bảo vệ trải nghiệm và doanh thu sản phẩm, không chỉ dừng ở 'test case pass hay fail'.",
        "You just learned how to evaluate usability through ShopEasy's checkout page: basic Nielsen heuristics (clarity, consistency, few steps, instant feedback, error prevention & recovery), how to observe real users to find blind spots, and two real situations showing that a hidden button or a vague error message can make customers give up even when the function works correctly. This skill helps you protect the product's experience and revenue, not just whether a test case passes or fails.",
        "ShopEasyの決済ページを通じてユーザビリティテストの評価方法を学びました：基本的なニールセンのヒューリスティック（明確さ、一貫性、少ない手順、即座のフィードバック、エラー防止と回復）、盲点を見つけるための実際のユーザーの観察方法、そして機能が正しく動いていても隠れたボタンや曖昧なエラーメッセージが顧客を離脱させ得ることを示す2つの実例。このスキルは、テストケースの合否だけでなく、製品の体験と収益を守る力になります。"),
      P("Chặng tiếp theo, bạn nên học sâu hơn về test giao diện (UI testing) và kiểm thử thông báo/validation để hiểu rõ ranh giới giữa 'hiển thị đúng', 'dữ liệu hợp lệ' và 'dễ dùng'. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should dig deeper into UI testing and notification/validation testing to clearly understand the boundary between 'displays correctly', 'valid data', and 'easy to use'. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、『正しく表示される』『データが有効』『使いやすい』の境界を明確に理解するため、UIテストと通知・バリデーションテストをより深く学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const USABILITY_TESTING_01 = makeDoc({
  slug: "kiem-thu-kha-nang-dung-usability-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử khả năng dùng",
  keywords: ["kiểm thử khả năng dùng", "usability testing", "heuristic Nielsen", "trải nghiệm người dùng", "usability cho người mới"],
  coverLabel: "NGƯỜI MỚI · USABILITY · TMĐT",
  crumb: "Kiểm thử khả năng dùng (Usability Testing)",
  metaTitle: { vi: "Kiểm thử khả năng dùng (Usability) cho người mới", en: "Usability testing for beginners", ja: "初心者向けユーザビリティテスト" },
  metaDescription: {
    vi: "Kiểm thử khả năng dùng (usability testing) cho người mới: đánh giá ShopEasy rõ ràng, nhất quán, ít bước, phản hồi tức thì, có hình minh hoạ và trắc nghiệm.",
    en: "Usability testing for beginners: evaluating ShopEasy for clarity, consistency, few steps, and instant feedback through real examples, with visuals and a quiz.",
    ja: "初心者向けユーザビリティテスト：ShopEasyの明確さ・一貫性・少ない手順・即座のフィードバックを実例で評価、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử khả năng dùng (Usability Testing) cho người mới: app dễ dùng hay khó dùng? (có trắc nghiệm)",
    en: "Usability testing for beginners: is the app easy or hard to use? (with quiz)",
    ja: "初心者のためのユーザビリティテスト：アプリは使いやすいか？（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: học kiểm thử khả năng dùng (usability testing) qua app TMĐT ShopEasy. Các nguyên tắc heuristic Nielsen cơ bản, cách quan sát người dùng thật, ví dụ thật nút bị chìm và thông báo lỗi mơ hồ, so sánh màn hình trước/sau cải thiện, nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: learn usability testing through the ShopEasy e-commerce app. Basic Nielsen heuristics, how to observe real users, real examples of a hidden button and a vague error message, before/after screen comparisons, many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでユーザビリティテストを学ぶ。基本的なニールセンのヒューリスティック、実際のユーザーの観察方法、隠れたボタンと曖昧なエラーメッセージの実例、改善前後の画面比較、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách đánh giá kiểm thử khả năng dùng", steps: [
    { name: "Chọn 1 luồng thao tác cụ thể để đánh giá", text: "Xác định luồng quan trọng nhất, ví dụ luồng mua hàng." },
    { name: "Áp 5 tiêu chí cho từng màn hình", text: "Rõ ràng, nhất quán, ít bước, phản hồi tức thì, phòng lỗi & khôi phục." },
    { name: "Quan sát người dùng thật và đo số liệu", text: "Tỉ lệ hoàn thành, thời gian, số lần bấm nhầm để có bằng chứng thuyết phục." },
  ] },
  pages,
});

export const MB_USABILITY_01 = [USABILITY_TESTING_01];
