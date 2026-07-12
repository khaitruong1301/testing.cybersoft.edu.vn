// doc_mb_upload_file.mjs — BÀI MANUAL "DÀNH CHO NGƯỜI MỚI":
// Kiểm thử upload & download file — định dạng cho phép/cấm, dung lượng tối đa, file rỗng/hỏng,
// tên file dài/ký tự lạ, upload nhiều file, tiến trình upload, tải file đúng nội dung, quyền tải.
// Practice-first, nhiều MOCKUP giao diện (ui_mock), giọng khích lệ. Gắn app TMĐT ShopEasy
// (upload ảnh đánh giá sản phẩm / minh chứng đổi trả).
// Song ngữ vi/en/ja (ja≠en), 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { browser, panel, field, btn, annotate, grid, jira, kanban, dashboard } from "./ui_mock.mjs";

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

// ── Mockup 1: màn tải ảnh minh chứng đổi trả ShopEasy, có annotate lỗi ──
const m_upload = browser("shopeasy.vn/doi-tra/don-hang-OD9931", [
  panel("ShopEasy · Tải ảnh minh chứng đổi trả", [
    field(24, 20, 330, "Ảnh minh chứng 1", "anh_danh_gia_01.jpg · 2.1MB", "normal"),
    field(372, 20, 330, "Ảnh minh chứng 2", "virus_doi_ten.jpg (thực chất .exe)", "error"),
    field(24, 92, 330, "Ảnh minh chứng 3", "(trống · 0KB)", "error"),
    field(372, 92, 330, "Ảnh minh chứng 4", "anh_qua_lon.png · 8.4MB", "error"),
    btn(24, 168, 240, "Gửi minh chứng đổi trả", "primary"),
    annotate(20, 12, 330, 62, "ĐÚNG: đúng định dạng, đúng dung lượng"),
    annotate(368, 12, 330, 62, "SAI: giả mạo đuôi file .exe → .jpg"),
  ].join(""), { h: 260, accent: "#7c3aed" }),
].join(""), { h: 316, title: "ShopEasy · TMĐT", accent: "#7c3aed" });

// ── Mockup 2: ma trận kiểm thử ĐÚNG vs PHÁ trên cùng các khía cạnh của file ──
const m_matrix = grid("Kiểm thử file ĐÚNG (hợp lệ) vs PHÁ (bất thường) — cùng 1 khía cạnh", ["Khía cạnh", "Ca ĐÚNG (hợp lệ)", "Ca PHÁ (bất thường)"], [
  ["Định dạng", "'anh.jpg' đúng định dạng cho phép", "'video.exe' đổi tên thành 'anh.jpg'"],
  ["Dung lượng", "'anh.jpg' 2MB (dưới giới hạn 5MB)", "'anh.jpg' 8.4MB (vượt giới hạn)"],
  ["Nội dung file", "Ảnh thật, mở được bình thường", "File rỗng 0KB hoặc file hỏng (corrupt)"],
  ["Tên file", "'anh_danh_gia_01.jpg' (tên ngắn gọn)", "Tên dài 300 ký tự hoặc chứa ký tự lạ @#%"],
  ["Tải xuống (download)", "Tải về đúng nội dung, đúng chủ đơn hàng", "Tải được file của người khác qua sửa URL"],
], { accent: "#7c3aed", note: "Cả hai chiều đều cần thiết: ca ĐÚNG xác nhận hệ thống chấp nhận, ca PHÁ xác nhận hệ thống từ chối/bảo vệ đúng." });

// ── Mockup 3: các kỹ thuật nghĩ ca kiểm thử upload/download file ──
const m_technique = grid("Các kỹ thuật nghĩ ca kiểm thử upload/download file", ["Kỹ thuật", "Mô tả", "Ví dụ trên ShopEasy"], [
  ["Định dạng cấm", "Tải lên file không thuộc danh sách cho phép", "Tải file .exe, .svg vào ô ảnh đánh giá"],
  ["Giả mạo đuôi file", "Đổi đuôi file để né kiểm tra định dạng", "Đổi tên virus.exe thành anh.jpg"],
  ["Vượt dung lượng", "Tải file lớn hơn giới hạn cho phép", "Ảnh 8.4MB khi giới hạn là 5MB"],
  ["File rỗng / hỏng", "Tải file 0KB hoặc file bị corrupt", "anh_trong.jpg 0KB, ảnh mở ra toàn nhiễu"],
  ["Tên file dài/ký tự lạ", "Tên vượt giới hạn ký tự hoặc chứa ký tự đặc biệt", "Tên file 300 ký tự, chứa # % & khoảng trắng"],
  ["Nhiều file cùng lúc", "Tải nhiều file vượt số lượng cho phép", "Chọn 6 ảnh khi giới hạn chỉ 5 ảnh"],
  ["Gián đoạn khi tải", "Ngắt mạng giữa lúc upload/download", "Tắt wifi khi thanh tiến trình đang ở 40%"],
], { accent: "#7c3aed" });

// ── Mockup 4: ticket Jira của lỗi giả mạo đuôi file tìm được ──
const m_jira = jira({
  key: "SE-13320", title: "Đổi đuôi 'virus.exe' thành 'anh.jpg' vẫn tải lên thành công vào ảnh đánh giá",
  type: "Bug", status: "New", priority: "High", severity: "Critical",
  fields: [
    ["Môi trường", "staging · web ShopEasy · Chrome 126 · Windows 11"],
    ["Các bước", "1) Đổi tên file thuc-thi.exe thành anh_danh_gia.jpg 2) Vào trang đánh giá đơn OD-9931 3) Chọn file vừa đổi tên và tải lên 4) Xem kết quả"],
    ["Kết quả mong đợi", "Hệ thống kiểm tra nội dung thực (magic bytes), từ chối vì không phải ảnh thật"],
    ["Kết quả thực tế", "Hệ thống chỉ kiểm tra đuôi .jpg, chấp nhận tải lên, lưu file thực thi trên server"],
    ["Bằng chứng", "screenshot-upload-ok.png, file-thuc-thi-doi-ten.jpg"],
  ],
});

// ── Mockup 5: bảng kanban theo dõi lỗi upload/download tìm được ──
const m_kanban = kanban("Bảng theo dõi lỗi Upload/Download file (ShopEasy · Sprint 16)", [
  { name: "New", cards: [
    { key: "SE-13320", title: "Doi duoi exe -> jpg van tai len duoc", sev: "Critical" },
    { key: "SE-13325", title: "Ten file 300 ky tu lam vo giao dien", sev: "High" },
  ] },
  { name: "Open", cards: [
    { key: "SE-13301", title: "Vuot 5MB van tai len duoc", sev: "High" },
  ] },
  { name: "Fixed", cards: [
    { key: "SE-13288", title: "File rong 0KB van duoc chap nhan", sev: "Medium" },
  ] },
  { name: "Closed", cards: [
    { key: "SE-13270", title: "Tai xuong dut giua chung khong bao loi", sev: "Low" },
  ] },
]);

// ── Mockup 6: dashboard tỉ lệ lỗi upload/download theo nhóm ──
const m_dash = dashboard("Lỗi Upload/Download file — Sprint 16", [
  { label: "Tổng lỗi", value: "22", sub: "sprint này", color: "#2563eb" },
  { label: "Định dạng/dung lượng", value: "13", sub: "~59%", color: "#7c3aed" },
  { label: "Quyền tải & bảo mật", value: "5", sub: "~23%", color: "#e11d48" },
  { label: "Mức Critical/High", value: "8", sub: "đa số IDOR & giả mạo file", color: "#f97316" },
]);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Kiểm thử upload file cần chú ý những gì trước tiên?",
  "What should I check first when testing file upload?",
  "Trước tiên hãy kiểm tra định dạng file cho phép/cấm (jpg, png hợp lệ; exe, svg lạ bị cấm) và dung lượng tối đa cho mỗi file. Sau đó mở rộng sang file rỗng (0KB), file hỏng (corrupt), tên file quá dài hoặc chứa ký tự đặc biệt, và việc tải nhiều file cùng lúc. Đừng chỉ dựa vào đuôi mở rộng — hãy nghĩ tới khả năng người dùng giả mạo đuôi file để né kiểm tra.",
  "First check the allowed/forbidden file formats (valid jpg, png; forbidden exe, unusual svg) and the maximum size per file. Then extend to empty files (0KB), corrupt files, filenames that are too long or contain special characters, and uploading multiple files at once. Don't rely only on the file extension — consider that a user might spoof the extension to bypass validation.",
  "アップロードテストで最初に何を確認すべき？",
  "まず許可/禁止されているファイル形式（有効なjpg、png；禁止のexe、不審なsvg）と1ファイルあたりの最大サイズを確認します。その後、空のファイル（0KB）、壊れたファイル、長すぎるまたは特殊文字を含むファイル名、複数ファイルの同時アップロードへと広げます。拡張子だけに頼らず、ユーザーが検証を回避するため拡張子を偽装する可能性も考慮しましょう。");
const faq2 = FAQ(
  "Vì sao cần test cả file rỗng lẫn file hỏng (corrupt), không chỉ file 'sai định dạng'?",
  "Why test both empty and corrupt files, not just 'wrong format' files?",
  "File sai định dạng thường bị chặn dễ dàng vì đuôi mở rộng khác biệt rõ ràng. Nhưng file rỗng (0KB) hoặc file hỏng (đúng đuôi .jpg nhưng nội dung bên trong bị lỗi hoặc không phải ảnh) lại rất dễ lọt qua các kiểm tra chỉ dựa vào tên/đuôi file. Nếu hệ thống không kiểm tra nội dung thực, người dùng sẽ thấy ảnh vỡ, hoặc worse — dữ liệu rác được lưu vào hệ thống mà không ai phát hiện.",
  "Wrong-format files are usually blocked easily because the extension clearly differs. But empty files (0KB) or corrupt files (correct .jpg extension but broken or non-image content inside) can easily slip past checks that only look at the filename/extension. If the system doesn't validate actual content, users see a broken image, or worse — garbage data gets stored in the system unnoticed.",
  "空のファイルと壊れたファイルの両方をテストすべき理由は？『形式違い』のファイルだけでは足りないの？",
  "形式が間違ったファイルは拡張子が明らかに異なるため、簡単にブロックされがちです。しかし空のファイル（0KB）や壊れたファイル（拡張子は正しい.jpgでも中身が壊れている、または画像でない）は、ファイル名や拡張子だけを見るチェックをすり抜けやすいのです。実際の内容を検証しなければ、ユーザーは壊れた画像を目にするか、さらに悪いことに、誰にも気づかれずにゴミデータがシステムに保存されてしまいます。");
const faq3 = FAQ(
  "Tại sao kiểm thử quyền tải file (download permission) lại quan trọng, không chỉ định dạng/dung lượng?",
  "Why does testing download permission matter, not just format/size?",
  "Vì lỗ hổng quyền tải (như sửa ID trong URL để tải file của người khác — kiểu lỗi IDOR) thường nghiêm trọng hơn nhiều so với lỗi định dạng/dung lượng, vì nó làm lộ dữ liệu riêng tư của khách hàng (ảnh minh chứng đổi trả, hóa đơn, chứng từ). Bên cạnh việc file tải lên đúng chuẩn, bạn luôn cần kiểm tra: ai được phép tải file này xuống, file tải về có đúng nội dung gốc không, và hệ thống có từ chối truy cập trái phép hay không.",
  "Because download-permission holes (like changing an ID in the URL to download someone else's file — an IDOR-style bug) are usually far more serious than format/size bugs, since they expose customers' private data (return-proof photos, invoices, receipts). Besides checking that an uploaded file meets the standard, you should always verify: who is allowed to download this file, whether the downloaded file matches the original content, and whether the system rejects unauthorized access.",
  "ダウンロード権限のテストが重要な理由は？形式やサイズだけでは不十分なの？",
  "ダウンロード権限の穴（URL内のIDを変更して他人のファイルをダウンロードするIDOR型のバグなど）は、形式やサイズのバグよりずっと深刻な場合が多いからです。顧客のプライベートなデータ（返品証明写真、請求書、領収書）が漏れてしまいます。アップロードされたファイルが基準を満たしているかに加え、常に確認すべきこと：誰がこのファイルをダウンロードできるか、ダウンロードしたファイルが元の内容と一致するか、システムが不正アクセスを正しく拒否するかです。");

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Vì sao chỉ kiểm tra đuôi mở rộng (.jpg, .png) là chưa đủ khi test upload?", en: "Why is checking only the file extension (.jpg, .png) not enough when testing upload?", ja: "アップロードテストで拡張子（.jpg、.png）だけを確認するのが不十分な理由は？" },
    options: [
      { vi: "Vì đuôi mở rộng có thể bị giả mạo (đổi tên file .exe thành .jpg) trong khi nội dung thực không phải ảnh", en: "Because the extension can be spoofed (renaming a .exe file to .jpg) while the real content isn't an image", ja: "拡張子は偽装され得る（.exeファイルを.jpgに改名）が、実際の中身は画像ではないから" },
      { vi: "Vì đuôi mở rộng không tồn tại trên máy tính", en: "Because file extensions don't exist on computers", ja: "コンピュータには拡張子が存在しないから" },
      { vi: "Vì kiểm tra đuôi mở rộng tốn quá nhiều thời gian", en: "Because checking extensions takes too much time", ja: "拡張子の確認に時間がかかりすぎるから" },
      { vi: "Vì người dùng không bao giờ đổi tên file", en: "Because users never rename files", ja: "ユーザーは決してファイル名を変更しないから" },
    ], correct: 0,
    explain: { vi: "Cần kiểm tra nội dung thực (magic bytes/MIME type), không chỉ tin vào đuôi mở rộng hiển thị.", en: "You need to validate the actual content (magic bytes/MIME type), not just trust the displayed extension.", ja: "表示された拡張子を信頼するだけでなく、実際の内容（マジックバイト/MIMEタイプ）を検証する必要があります。" },
  }),
  mcq({
    q: { vi: "Đâu là một ca kiểm thử hợp lý cho ô 'dung lượng file' khi giới hạn cho phép là 5MB?", en: "Which is a reasonable test case for the 'file size' field when the allowed limit is 5MB?", ja: "許容上限が5MBの場合、『ファイルサイズ』項目に適切なテストケースはどれ？" },
    options: [
      { vi: "Chỉ thử đúng 1 file 2MB rồi dừng lại", en: "Only try one 2MB file and stop", ja: "2MBのファイルを1つだけ試して終わる" },
      { vi: "Thử file 2MB (hợp lệ) và file 8.4MB (vượt giới hạn) để so sánh", en: "Try a 2MB file (valid) and an 8.4MB file (over the limit) to compare", ja: "2MB（有効）と8.4MB（上限超過）の両方を試して比較する" },
      { vi: "Không cần test dung lượng vì trình duyệt tự lo", en: "No need to test size because the browser handles it automatically", ja: "ブラウザが自動処理するのでサイズテストは不要" },
      { vi: "Chỉ test dung lượng trên điện thoại, không cần trên máy tính", en: "Only test size on mobile, not on desktop", ja: "モバイルだけでサイズテストし、PCでは不要" },
    ], correct: 1,
    explain: { vi: "Luôn cần cả ca đúng giới hạn và ca vượt giới hạn để xác nhận hệ thống chặn đúng chỗ.", en: "You always need both a within-limit case and an over-limit case to confirm the system blocks correctly.", ja: "システムが正しくブロックするか確認するため、上限内と上限超過の両方のケースが常に必要です。" },
  }),
  mcq({
    q: { vi: "File 0KB (file rỗng) khi tải lên nên được hệ thống xử lý thế nào?", en: "How should the system handle a 0KB (empty) file on upload?", ja: "0KB（空）のファイルをアップロードした場合、システムはどう処理すべき？" },
    options: [
      { vi: "Chấp nhận và lưu bình thường như file có nội dung", en: "Accept and store it normally like a file with content", ja: "内容のあるファイルと同様に通常どおり受け入れて保存する" },
      { vi: "Từ chối và báo lỗi rõ ràng cho người dùng biết file rỗng", en: "Reject it and show a clear error telling the user the file is empty", ja: "拒否し、ファイルが空であることをユーザーに明確に伝えるエラーを表示する" },
      { vi: "Tự động xoá tài khoản người dùng", en: "Automatically delete the user's account", ja: "ユーザーのアカウントを自動的に削除する" },
      { vi: "Không cần xử lý gì, cứ để mặc định", en: "No handling needed, just leave it as default", ja: "何も処理せず、デフォルトのままにする" },
    ], correct: 1,
    explain: { vi: "File rỗng là dữ liệu bất thường, hệ thống cần từ chối kèm thông báo rõ ràng thay vì lưu 'rác'.", en: "An empty file is abnormal data; the system should reject it with a clear message instead of storing garbage.", ja: "空のファイルは異常なデータであり、システムはゴミを保存する代わりに明確なメッセージ付きで拒否すべきです。" },
  }),
  mcq({
    q: { vi: "Khi test upload nhiều file cùng lúc với giới hạn tối đa 5 ảnh, ca kiểm thử nào quan trọng?", en: "When testing multi-file upload with a max limit of 5 photos, which test case matters?", ja: "最大5枚という制限で複数ファイルアップロードをテストする際、重要なケースはどれ？" },
    options: [
      { vi: "Chỉ thử chọn đúng 1 ảnh duy nhất", en: "Only try selecting exactly one photo", ja: "1枚だけ選ぶケースのみ試す" },
      { vi: "Thử chọn đúng 5 ảnh (giới hạn) và chọn 6 ảnh (vượt giới hạn) để xem hệ thống phản ứng ra sao", en: "Try selecting exactly 5 photos (the limit) and 6 photos (over the limit) to see how the system reacts", ja: "ちょうど5枚（上限）と6枚（上限超過）を選んでシステムの反応を確認する" },
      { vi: "Không cần test vì người dùng luôn chọn đúng số lượng", en: "No need to test since users always pick the right amount", ja: "ユーザーは常に正しい枚数を選ぶのでテスト不要" },
      { vi: "Chỉ test trên trình duyệt Safari", en: "Only test on the Safari browser", ja: "Safariブラウザだけでテストする" },
      { vi: "Chỉ cần hỏi lập trình viên thay vì test", en: "Just ask the developer instead of testing", ja: "テストせず開発者に聞くだけでよい" },
    ], correct: 1,
    explain: { vi: "Ca ở đúng giới hạn và ca vượt giới hạn (giá trị biên) giúp xác nhận hệ thống chặn đúng số lượng cho phép.", en: "The at-limit and over-limit cases (boundary values) confirm the system enforces the allowed count correctly.", ja: "上限ちょうどと上限超過のケース（境界値）は、システムが許容数を正しく制御しているか確認します。" },
  }),
  mcq({
    q: { vi: "Vì sao cần kiểm tra 'tải file đúng nội dung' sau khi download, không chỉ kiểm tra upload thành công?", en: "Why check that a downloaded file has correct content, not just that upload succeeded?", ja: "アップロード成功だけでなく『正しい内容でダウンロードされるか』を確認すべき理由は？" },
    options: [
      { vi: "Vì file có thể bị hỏng/đứt trong lúc tải xuống hoặc bị lưu sai, khiến nội dung tải về không khớp file gốc", en: "Because the file can get corrupted/interrupted while downloading or stored incorrectly, so the downloaded content doesn't match the original", ja: "ダウンロード中にファイルが壊れる/中断される、または誤って保存され、ダウンロードした内容が元のファイルと一致しないことがあるから" },
      { vi: "Vì file luôn tự động đúng nội dung, không cần kiểm tra", en: "Because files are always automatically correct, no check needed", ja: "ファイルは常に自動的に正しいので確認不要" },
      { vi: "Vì tải xuống không liên quan gì đến kiểm thử phần mềm", en: "Because downloading is unrelated to software testing", ja: "ダウンロードはソフトウェアテストと無関係だから" },
      { vi: "Vì chỉ cần kiểm tra tốc độ tải xuống là đủ", en: "Because checking only download speed is enough", ja: "ダウンロード速度の確認だけで十分だから" },
    ], correct: 0,
    explain: { vi: "Upload thành công không đảm bảo download đúng — cần xác minh file tải về khớp file gốc (đúng kích thước/nội dung).", en: "A successful upload doesn't guarantee a correct download — you must verify the downloaded file matches the original (size/content).", ja: "アップロード成功はダウンロードの正しさを保証しません——ダウンロードしたファイルが元のファイル（サイズ/内容）と一致するか検証が必要です。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & màn hình bạn sẽ test", en: "1. TL;DR & the screen you'll test", ja: "1. 要点とテストする画面" },
    blocks: [
      TLDR("Kiểm thử upload file là việc xác nhận hệ thống chấp nhận đúng file hợp lệ (định dạng, dung lượng) và từ chối đúng file bất thường (sai định dạng, quá lớn, rỗng, hỏng, tên lạ) — còn kiểm thử download là xác nhận file tải về đúng nội dung và chỉ người có quyền mới tải được. Bài này bám màn tải ảnh minh chứng đổi trả của app TMĐT ShopEasy: bạn học cách nghĩ ca kiểm thử, tìm lỗi thật (giả mạo đuôi file, vượt dung lượng), và kiểm tra cả chiều tải xuống. Nhiều hình minh hoạ và trắc nghiệm cuối bài.",
        "Testing file upload confirms a system correctly accepts valid files (right format, right size) and correctly rejects abnormal ones (wrong format, too large, empty, corrupt, weird names) — testing download confirms the downloaded file has correct content and only authorized users can download it. This follows ShopEasy's return-proof upload screen: you learn to think up test cases, find real bugs (spoofed file extensions, oversized files), and check the download direction too. Lots of visuals and a quiz at the end.",
        "アップロードのテストとは、システムが有効なファイル（正しい形式・サイズ）を正しく受け入れ、異常なファイル（誤形式、サイズ過大、空、壊れている、奇妙な名前）を正しく拒否するか確認することです。ダウンロードのテストとは、ダウンロードしたファイルの内容が正しく、権限を持つユーザーだけがダウンロードできるかを確認することです。本記事はECアプリShopEasyの返品証明アップロード画面に沿い、テストケースの考え方、実際のバグ（拡張子の偽装、サイズ超過）の発見、そしてダウンロード方向のチェックも学びます。図が豊富で最後にクイズ付き。"),
      P("Chào bạn mới! Upload và download file nghe có vẻ là tính năng đơn giản, nhưng thực tế nó ẩn chứa rất nhiều góc dễ bị bỏ sót: định dạng nào được phép, dung lượng tối đa bao nhiêu, chuyện gì xảy ra nếu file rỗng hoặc hỏng, tên file quá dài hay chứa ký tự lạ có làm hệ thống 'vỡ' không, và quan trọng không kém — khi tải file xuống, người dùng có nhận đúng nội dung và đúng người có quyền hay không. Chúng ta sẽ học qua màn tải ảnh đánh giá sản phẩm và ảnh minh chứng đổi trả thật của ShopEasy, có hình minh hoạ và phần tự làm thử.",
        "Hi, newcomer! Upload and download may sound like a simple feature, but in practice it hides many easily-missed angles: which formats are allowed, what the max size is, what happens with an empty or corrupt file, whether a too-long or weirdly-named file breaks the system, and just as important — whether the downloaded content is correct and only goes to the right person. We'll learn through ShopEasy's real product-review photo and return-proof upload screens, with visuals and hands-on practice.",
        "こんにちは、初心者さん！アップロードとダウンロードは単純な機能に聞こえますが、実際には見落としやすい点が多くあります：どの形式が許可されるか、最大サイズはいくつか、空や壊れたファイルはどうなるか、長すぎる/奇妙な名前のファイルがシステムを壊さないか、そして同じくらい重要なのが——ダウンロードしたコンテンツが正しく、正当な権限を持つ人にだけ届くかどうかです。実際のShopEasyの商品レビュー写真・返品証明アップロード画面を通じて、図と実習付きで学びます。"),
      IMG(m_upload, "Màn hình test: tải ảnh minh chứng đổi trả ShopEasy với các file hợp lệ/bất thường", "Screen under test: ShopEasy return-proof upload with valid/abnormal files", "テスト対象画面：有効/異常なファイルを含むShopEasy返品証明アップロード"),
      DEF("Kiểm thử Upload File", "kiểm thử xác nhận hệ thống chấp nhận đúng file hợp lệ và từ chối đúng file bất thường (sai định dạng, quá lớn, rỗng, hỏng, tên lạ) khi tải lên.",
        "testing that confirms a system correctly accepts valid files and correctly rejects abnormal ones (wrong format, too large, empty, corrupt, weird names) on upload.",
        "アップロード時にシステムが有効なファイルを正しく受け入れ、異常なファイル（誤形式、サイズ過大、空、壊れている、奇妙な名前）を正しく拒否するか確認するテスト。"),
    ] },
  { heading: { vi: "2. Hai chiều của kiểm thử file: đầu vào (upload) & đầu ra (download)", en: "2. Two directions of file testing: input (upload) & output (download)", ja: "2. ファイルテストの2方向：入力（アップロード）と出力（ダウンロード）" },
    blocks: [
      P("Nhiều bạn mới chỉ nghĩ tới 'test upload' mà quên rằng file còn có chiều ngược lại: download. Kiểm thử đầu vào trả lời câu hỏi 'hệ thống có nhận đúng và từ chối đúng file khi tải lên không', còn kiểm thử đầu ra trả lời 'hệ thống có trả về đúng nội dung, đúng người có quyền khi tải xuống không'. Bỏ sót chiều nào cũng khiến bạn kiểm thử không trọn vẹn.",
        "Many beginners only think about 'testing upload' and forget that a file also has a reverse direction: download. Input testing answers 'does the system correctly accept and reject files on upload', while output testing answers 'does the system return the correct content to the right authorized person on download'. Missing either direction leaves your testing incomplete.",
        "多くの初心者は『アップロードのテスト』だけを考え、ファイルには逆方向——ダウンロード——もあることを忘れがちです。入力テストは『アップロード時にシステムが正しくファイルを受け入れ/拒否するか』に答え、出力テストは『ダウンロード時に正しい内容を正当な権限者に返すか』に答えます。どちらかの方向を見逃すと、テストが不完全になります。"),
      IMG(m_matrix, "Ma trận ca kiểm thử ĐÚNG vs PHÁ trên các khía cạnh của file ShopEasy", "Matrix of correct vs abnormal test cases across ShopEasy file aspects", "ShopEasyファイルの各観点における正常 vs 異常テストケースのマトリクス"),
      P("Với mỗi khía cạnh (định dạng, dung lượng, nội dung, tên file, quyền tải), bạn luôn cần cả một ca ĐÚNG để xác nhận hệ thống hoạt động, và một ca PHÁ để xác nhận hệ thống bảo vệ đúng chỗ. Ví dụ trong bảng trên, một ca hợp lệ 'anh.jpg 2MB' cần đi kèm ca bất thường 'anh.jpg 8.4MB vượt giới hạn' để việc kiểm thử thật sự đầy đủ hai chiều.",
        "For each aspect (format, size, content, filename, download permission), you always need both a CORRECT case to confirm the system works, and an ABNORMAL case to confirm the system protects properly. In the table above, for example, a valid 'anh.jpg 2MB' case should be paired with an abnormal 'anh.jpg 8.4MB over the limit' case so testing is truly two-directional.",
        "各観点（形式、サイズ、内容、ファイル名、ダウンロード権限）について、システムが動作することを確認する『正常』ケースと、システムが適切に保護することを確認する『異常』ケースの両方が常に必要です。例えば上の表では、有効な『anh.jpg 2MB』ケースには異常な『anh.jpg 8.4MB 上限超過』ケースを対にすることで、テストが本当に両方向を網羅します。"),
      DEF("Kiểm thử Download File", "kiểm thử xác nhận file tải xuống có đúng nội dung với file gốc, và chỉ người dùng có quyền mới tải được.",
        "testing that confirms a downloaded file matches the original content, and only authorized users can download it.",
        "ダウンロードしたファイルが元の内容と一致し、権限を持つユーザーだけがダウンロードできるかを確認するテスト。"),
    ] },
  { heading: { vi: "3. Vì sao người mới cần thạo kiểm thử upload/download", en: "3. Why beginners need to master upload/download testing", ja: "3. 初心者がアップロード/ダウンロードテストを習得すべき理由" },
    blocks: [
      P("Hầu như mọi app hiện đại đều có tính năng upload file ở đâu đó: ảnh đại diện, ảnh đánh giá sản phẩm, hồ sơ CV, hoá đơn, minh chứng đổi trả. Vì tính năng này xuất hiện lặp lại nhiều nơi, một lỗ hổng nhỏ trong xử lý file (như không kiểm tra nội dung thực) có thể lặp lại ở nhiều màn hình khác nhau, nhân rộng thiệt hại.",
        "Almost every modern app has a file upload feature somewhere: avatars, product review photos, CV/resume, invoices, return-proof documents. Because this feature repeats across many places, a small hole in file handling (like not validating actual content) can repeat across many screens, multiplying the damage.",
        "現代のほとんどのアプリには、どこかにファイルアップロード機能があります：アバター、商品レビュー写真、履歴書、請求書、返品証明書類。この機能は多くの箇所で繰り返されるため、ファイル処理の小さな穴（実際の内容を検証しないなど）は多くの画面で繰り返され、被害が拡大します。"),
      P("Với riêng bạn — người mới — kỹ năng nghĩ ra ca kiểm thử upload/download đầy đủ cho thấy bạn hiểu rủi ro thực tế đằng sau một tính năng trông có vẻ đơn giản. Đây cũng là câu hỏi phỏng vấn phổ biến: 'Cho một chức năng tải file lên, hãy liệt kê các ca kiểm thử'. Trả lời được nhiều khía cạnh khác nhau (định dạng, dung lượng, nội dung, tên file, quyền tải) cho thấy tư duy kiểm thử vững, không chỉ học thuộc lý thuyết.",
        "For you specifically — a beginner — the skill of thinking up full upload/download test cases shows you understand the real risk behind a feature that looks simple. It's also a common interview question: 'Given a file upload feature, list your test cases.' Naming several aspects (format, size, content, filename, download permission) shows solid testing thinking, not rote theory.",
        "特に初心者のあなたにとって、アップロード/ダウンロードの完全なテストケースを考えるスキルは、シンプルに見える機能の背後にある実際のリスクを理解していることを示します。また、よくある面接質問でもあります：『ファイルアップロード機能について、テストケースを挙げてください』。複数の観点（形式、サイズ、内容、ファイル名、ダウンロード権限）を挙げられれば、丸暗記でなく確かなテスト思考力を示せます。"),
      P("Và quan trọng nhất: file do người dùng tải lên là một trong những cửa ngõ dễ bị lợi dụng nhất để tấn công hệ thống (giả mạo file thực thi, chiếm dung lượng lưu trữ, đọc trộm file của người khác). Đầu tư đúng mức vào kiểm thử upload/download là bạn đang bảo vệ trực tiếp dữ liệu và sự an toàn của người dùng thật.",
        "And most importantly: user-uploaded files are one of the easiest gateways to exploit a system (spoofed executables, storage abuse, reading other users' files). Investing properly in upload/download testing directly protects real users' data and safety.",
        "そして最も重要なのは、ユーザーがアップロードするファイルはシステムを攻撃する最も悪用されやすい入口の一つだということです（実行ファイルの偽装、ストレージの悪用、他人のファイルの盗み見）。アップロード/ダウンロードテストに適切に投資することは、実際のユーザーのデータと安全を直接守ることです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & các kỹ thuật nghĩ ca kiểm thử file", en: "4. Prepare: tools & techniques for file test cases", ja: "4. 準備：ツールとファイルテストケースの技法" },
    blocks: [
      P("Bạn không cần công cụ đặc biệt — chỉ cần vài file mẫu (đúng định dạng, sai định dạng, quá lớn, rỗng, tên dài) đã chuẩn bị sẵn và một danh sách 'kỹ thuật phá' để không bỏ sót góc nào khi test màn upload/download bất kỳ.",
        "You don't need special tools — just a few prepared sample files (right format, wrong format, too large, empty, long name) and a checklist of 'breaking techniques' so you don't miss any angle when testing any upload/download screen.",
        "特別なツールは不要です——正しい形式、誤った形式、大きすぎる、空、長い名前など準備済みのサンプルファイルと、どんなアップロード/ダウンロード画面でも見落とさないための『壊し方』チェックリストがあれば十分です。"),
      STEP(1, "Mở màn hình cần test (ví dụ tải ảnh minh chứng đổi trả ShopEasy); xác định định dạng và dung lượng cho phép theo tài liệu yêu cầu.", "Open the screen to test (e.g. ShopEasy's return-proof upload); confirm the allowed format and size from the requirements.", "テストする画面（例：ShopEasy返品証明アップロード）を開き、要件から許可される形式とサイズを確認する。"),
      STEP(2, "Chuẩn bị sẵn bộ file mẫu: đúng định dạng, sai định dạng, đổi đuôi giả mạo, quá dung lượng, rỗng (0KB), hỏng (corrupt), tên dài/ký tự lạ.", "Prepare a set of sample files: correct format, wrong format, spoofed extension, oversized, empty (0KB), corrupt, long/unusual-character names.", "サンプルファイル一式を用意する：正しい形式、誤った形式、偽装拡張子、サイズ超過、空（0KB）、破損、長い/特殊文字のファイル名。"),
      STEP(3, "Ghi lại kết quả mong đợi (hệ thống nên CHẤP NHẬN hoặc TỪ CHỐI + thông báo rõ) cho từng file trước khi thực hiện, để dễ so sánh.", "Write down the expected result (the system SHOULD ACCEPT or REJECT + show a clear message) for each file before executing, for easy comparison.", "実行前に各ファイルの期待結果（システムは受け入れる/拒否すべき + 明確なメッセージを表示）を書いておき、比較しやすくする。"),
      TRY("Tự tạo 1 file 0KB (file rỗng) trên máy bạn và thử tải lên một form upload bất kỳ để xem hệ thống phản ứng thế nào.", "Create a 0KB (empty) file on your machine and try uploading it to any upload form to see how the system reacts.", "自分のPCで0KB（空）のファイルを作成し、任意のアップロードフォームに試しに送信してシステムの反応を確認しよう。"),
      PITFALL("Chỉ chuẩn bị file 'sai định dạng' rõ ràng (như file .txt) mà quên chuẩn bị file GIẢ MẠO đuôi (đổi tên .exe thành .jpg) — đây mới là ca nguy hiểm thật sự.", "Only preparing an obviously 'wrong format' file (like .txt) while forgetting to prepare a SPOOFED-extension file (renaming .exe to .jpg) — this is the truly dangerous case.", "明らかに『誤った形式』のファイル（.txtなど）だけを用意し、拡張子を偽装したファイル（.exeを.jpgに改名）を用意し忘れる——これこそが本当に危険なケースです。"),
      IMG(m_technique, "Các kỹ thuật nghĩ ca kiểm thử upload/download, minh hoạ trên ShopEasy", "Techniques for thinking up upload/download test cases, illustrated on ShopEasy", "アップロード/ダウンロードテストケースを考える技法、ShopEasyで例示"),
    ] },
  { heading: { vi: "5. Viết ca kiểm thử file từng bước (thực hành)", en: "5. Writing file test cases step by step (hands-on)", ja: "5. ファイルテストケースを一歩ずつ書く（実習）" },
    blocks: [
      P("Giờ ta áp dụng thật vào ô 'Ảnh minh chứng đổi trả' của ShopEasy — nơi rất dễ bị bỏ sót vì trông có vẻ chỉ là 'chọn file rồi bấm gửi'. Làm theo thứ tự dưới đây để có một bộ ca kiểm thử đầy đủ.",
        "Now let's apply it for real to ShopEasy's 'Return-proof photo' field — easy to overlook because it looks like just 'pick a file and click send'. Follow the order below to get a full set of test cases.",
        "では、ShopEasyの『返品証明写真』項目に実際に適用しましょう——『ファイルを選んで送信ボタンを押すだけ』に見えるため見落としやすい項目です。以下の順に沿って、完全なテストケース一式を作りましょう。"),
      STEP(1, "Xác định ca hợp lệ chuẩn trước: anh.jpg 2MB (đúng định dạng, dưới giới hạn) để có mốc so sánh.", "First define the standard valid case: anh.jpg at 2MB (correct format, under the limit) as a comparison baseline.", "まず標準的な有効ケースを定義：anh.jpg 2MB（正しい形式、上限以下）を比較基準とする。"),
      STEP(2, "Áp kỹ thuật 'giả mạo đuôi file' và 'vượt dung lượng': thử đổi đuôi virus.exe thành anh.jpg, thử file 8.4MB, thử file 0KB.", "Apply the 'spoofed extension' and 'over the size limit' techniques: try renaming virus.exe to anh.jpg, try an 8.4MB file, try a 0KB file.", "『拡張子偽装』と『サイズ超過』の技法を適用：virus.exeをanh.jpgに改名、8.4MBファイル、0KBファイルを試す。"),
      STEP(3, "Với mỗi ca, ghi Expected (hệ thống chấp nhận hoặc từ chối + thông báo) và Actual (điều thực sự xảy ra) riêng biệt.", "For each case, write Expected (system accepts/rejects + shows a message) and Actual (what actually happens) separately.", "各ケースでExpected（システムが受け入れる/拒否しメッセージを表示）とActual（実際に起きたこと）を別々に記録する。"),
      STEP(4, "Nếu có ca nào hệ thống KHÔNG xử lý đúng, chuyển ngay thành một bug report theo công thức 6 phần.", "If any case is NOT handled correctly, immediately turn it into a bug report using the 6-part formula.", "システムが正しく処理しないケースがあれば、すぐに6項目公式でバグレポートにする。"),
      CODE("text", "BO CA KIEM THU - o 'Anh minh chung doi tra' (ShopEasy)\nCa 1: virus.exe doi ten thanh anh.jpg | Expected: tu choi (kiem tra noi dung) | Actual: chap nhan, luu file thuc thi (BUG)\nCa 2: anh.jpg 8.4MB (gioi han 5MB) | Expected: tu choi, bao vuot dung luong | Actual: van tai len duoc (BUG)\nCa 3: file rong 0KB | Expected: tu choi, bao 'file rong' | Actual: tu choi dung\nCa 4: anh.jpg 2MB (hop le) | Expected: chap nhan, hien thi anh | Actual: chap nhan dung"),
      TRY("Viết thêm 1 ca kiểm thử nữa cho ô 'Ảnh minh chứng' mà bảng trên chưa có (gợi ý: tên file dài 300 ký tự, hoặc chọn cùng lúc 6 ảnh khi giới hạn chỉ 5 ảnh).", "Write one more test case for 'Proof photo' not in the table above (hint: a 300-character filename, or selecting 6 photos at once when the limit is only 5).", "上の表にない『証明写真』のテストケースをもう1つ書こう（ヒント：300文字のファイル名、または上限5枚のところ6枚同時選択）。"),
    ] },
  { heading: { vi: "6. Tình huống 1: chỉ kiểm tra đuôi file, quên nội dung thực", en: "6. Situation 1: only checking the extension, forgetting the real content", ja: "6. シーン1：拡張子だけを確認し、実際の内容を忘れる" },
    blocks: [
      SITUATION("Đội chỉ test bằng cách đổi tên file .txt thành .jpg và thấy hệ thống từ chối đúng — mọi ca đều pass, ai cũng yên tâm release.", "The team only tests by renaming a .txt file to .jpg and sees the system correctly reject it — every case passes, everyone feels safe to release.",
        "Lên production, một người dùng tò mò đổi tên virus.exe thành anh_danh_gia.jpg rồi tải lên ô ảnh đánh giá — hệ thống chỉ kiểm tra đuôi .jpg nên chấp nhận, lưu thẳng file thực thi vào server.",
        "In production, a curious user renames virus.exe to anh_danh_gia.jpg and uploads it to the review-photo field — the system only checks the .jpg extension, so it accepts it and stores the executable directly on the server.",
        "チームは.txtファイルを.jpgに改名してテストし、システムが正しく拒否することを確認——全ケース合格、安心してリリース。",
        "本番環境で、好奇心のあるユーザーがvirus.exeをanh_danh_gia.jpgに改名しレビュー写真欄にアップロード——システムは.jpg拡張子しか確認しないため受け入れ、実行ファイルをそのままサーバーに保存してしまう。"),
      SOLVE("Bổ sung kiểm tra nội dung thực của file (magic bytes/MIME type thực tế) ở phía server, không chỉ dựa vào đuôi mở rộng hiển thị — và giới hạn rõ các kiểu MIME được phép ở cả client lẫn server.", "Add validation of the file's actual content (real magic bytes/MIME type) on the server side, not just the displayed extension — and clearly restrict allowed MIME types on both client and server.", "表示された拡張子だけでなく、サーバー側でファイルの実際の内容（実際のマジックバイト/MIMEタイプ）を検証する処理を追加し、クライアントとサーバー両方で許可するMIMEタイプを明確に制限する。"),
      P("Đây là bài học lớn nhất trong chương này: 'đổi tên .txt thành .jpg bị chặn' không có nghĩa là mọi kiểu giả mạo đều bị chặn. Nó chỉ nói lên rằng bạn chưa thử đủ cách kẻ xấu có thể giả mạo file. Danh sách kỹ thuật ở chương 4 (giả mạo đuôi file, vượt dung lượng, file rỗng/hỏng, tên lạ) chính là công cụ giúp bạn không bỏ sót những góc như thế này.",
        "This is the biggest lesson in this chapter: 'renaming .txt to .jpg gets blocked' doesn't mean every kind of spoofing is blocked. It only means you haven't tried enough ways an attacker could spoof a file. The technique list from chapter 4 (spoofed extension, oversized, empty/corrupt, unusual names) is exactly the tool that keeps you from missing angles like this.",
        "この章での最大の教訓です：『.txtを.jpgに改名するとブロックされる』は、あらゆる種類の偽装がブロックされることを意味しません。攻撃者がファイルを偽装する方法を十分試していないだけかもしれません。第4章の技法リスト（拡張子偽装、サイズ超過、空/破損、奇妙な名前）は、まさにこうした見落としを防ぐツールです。"),
      IMG(m_jira, "Ticket lỗi tìm được nhờ ca kiểm thử 'giả mạo đuôi file .exe thành .jpg'", "A bug ticket found via the 'spoofed .exe-to-.jpg extension' test case", "『.exeを.jpgに偽装』テストケースで見つかったバグチケット"),
      RECAP(["Chỉ chặn được sai định dạng RÕ RÀNG KHÔNG đồng nghĩa hệ thống an toàn trước giả mạo", "Luôn kiểm tra nội dung thực (magic bytes), đừng chỉ tin đuôi mở rộng"],
        ["Blocking OBVIOUS wrong formats does NOT mean the system is safe against spoofing", "Always validate real content (magic bytes), don't just trust the extension"],
        ["明らかな形式違いをブロックできても、偽装に対して安全とは限らない", "常に実際の内容（マジックバイト）を検証し、拡張子だけを信用しない"]),
    ] },
  { heading: { vi: "7. Tình huống 2: tải xuống bị đứt giữa chừng, file hỏng nhưng không báo lỗi", en: "7. Situation 2: download interrupted mid-way, a broken file with no error", ja: "7. シーン2：ダウンロードが途中で切れ、壊れたファイルなのにエラーが出ない" },
    blocks: [
      SITUATION("Bạn thử tắt wifi ngay khi đang tải ảnh minh chứng đổi trả xuống, chỉ để xem điều gì xảy ra.", "You try turning off wifi right while downloading a return-proof photo, just to see what happens.",
        "File tải về chỉ còn vài KB (thiếu dữ liệu), không mở được, nhưng hệ thống vẫn đánh dấu 'Tải xuống thành công' và không cho phép thử tải lại ngay — khách hàng mất bằng chứng khi cần khiếu nại.",
        "The downloaded file is only a few KB (incomplete), won't open, but the system still marks it 'Download successful' and doesn't offer an immediate retry — the customer loses their proof when they need to file a complaint.",
        "返品証明写真のダウンロード中にWi-Fiを切ってみて何が起きるか確認。",
        "ダウンロードされたファイルはわずか数KB（データ不足）で開けないが、システムは『ダウンロード成功』のままにし、すぐの再試行も提供しない——苦情を申し立てる際に顧客は証拠を失ってしまう。"),
      SOLVE("Bổ sung kiểm tra kích thước/checksum của file tải về so với file gốc trước khi báo 'thành công', hiển thị rõ trạng thái lỗi khi tải đứt, và cho phép người dùng tải lại ngay.", "Add a check comparing the downloaded file's size/checksum against the original before reporting 'success', clearly show an error state when the download is interrupted, and let the user retry immediately.", "『成功』と報告する前にダウンロードしたファイルのサイズ/チェックサムを元のファイルと比較する処理を追加し、ダウンロードが中断された場合は明確にエラー状態を表示し、ユーザーがすぐに再試行できるようにする。"),
      P("Ví dụ này cho thấy kiểm thử download không chỉ dừng ở 'bấm tải xuống có chạy không', mà còn phải xác nhận NỘI DUNG tải về đúng với file gốc, đặc biệt khi mạng chập chờn — tình huống rất thường gặp với người dùng di động. Khi ưu tiên thời gian có hạn, hãy dành thêm ca kiểm thử cho các file quan trọng (chứng từ, hoá đơn, minh chứng đổi trả) vì mất đúng nội dung ở đây gây thiệt hại thực sự cho khách hàng.",
        "This example shows download testing doesn't stop at 'does clicking download work', but must also confirm the downloaded CONTENT matches the original, especially on a flaky network — a very common situation for mobile users. When time is limited, spend extra test cases on important files (receipts, invoices, return-proof) because losing correct content here causes real harm to customers.",
        "この例は、ダウンロードのテストが『ダウンロードボタンを押して動くか』だけで終わらず、特にネットワークが不安定な場合（モバイルユーザーによくある状況）に、ダウンロードした内容が元のファイルと一致するかも確認しなければならないことを示しています。時間が限られる場合は、重要なファイル（証明書類、請求書、返品証明）に追加のテストケースを割きましょう。ここで正しい内容を失うと、顧客に実際の被害が生じるからです。"),
      TRY("Nghĩ thêm một trường hợp 'gián đoạn' khác khi tải file trong app bạn dùng (đóng app giữa chừng, chuyển từ wifi sang 4G) và đề xuất 1 ca kiểm thử cho nó.", "Think of another 'interruption' case when downloading a file in an app you use (closing the app mid-way, switching from wifi to 4G) and propose one test case for it.", "使っているアプリでファイルダウンロード中の別の『中断』ケース（アプリを途中で閉じる、WiFiから4Gに切り替える）を考え、テストケースを1つ提案しよう。"),
    ] },
  { heading: { vi: "8. Cân bằng ưu tiên & theo dõi kết quả", en: "8. Balancing priorities & tracking results", ja: "8. 優先度のバランスと結果の追跡" },
    blocks: [
      P("Không phải khía cạnh nào cũng cần test kỹ như nhau. Cách thực dụng là: mọi màn upload đều có ít nhất 1 ca hợp lệ + 1 ca sai định dạng + 1 ca vượt dung lượng cơ bản; riêng các file quan trọng (chứng từ, hoá đơn, minh chứng đổi trả) thì đầu tư thêm cho giả mạo đuôi file, file rỗng/hỏng, và quyền tải xuống.",
        "Not every aspect needs equally thorough testing. A practical rule: every upload screen gets at least 1 valid case + 1 wrong-format case + 1 basic over-size case; important files (receipts, invoices, return-proof) get extra investment in spoofed extensions, empty/corrupt files, and download permission.",
        "全ての観点に同じだけ徹底したテストが必要なわけではありません。実用的なルール：全アップロード画面に最低1つの有効ケース、1つの誤形式ケース、1つの基本的なサイズ超過ケースを用意し、重要なファイル（証明書類、請求書、返品証明）には拡張子偽装、空/破損ファイル、ダウンロード権限への投資を追加します。"),
      IMG(m_kanban, "Bảng theo dõi lỗi upload/download tìm được (ShopEasy · Sprint 16)", "A board tracking upload/download bugs found (ShopEasy · Sprint 16)", "アップロード/ダウンロードで見つかったバグの追跡ボード（ShopEasy・スプリント16）"),
      IMG(m_dash, "Số liệu: phần lớn lỗi sprint đến từ định dạng/dung lượng, còn lỗi quyền tải nghiêm trọng nhất", "Metrics: most sprint bugs come from format/size, while download-permission bugs are the most severe", "指標：スプリントのバグの大半は形式/サイズから、最も深刻なのはダウンロード権限のバグ"),
      TIP("Ưu tiên viết ca kiểm thử cho các file liên quan tới BẢO MẬT (giả mạo đuôi) hoặc DỮ LIỆU RIÊNG TƯ (quyền tải) trước — đó là nơi một lỗ hổng gây thiệt hại lớn nhất.", "Prioritize writing test cases for files related to SECURITY (spoofed extensions) or PRIVATE DATA (download permission) first — that's where a hole causes the most damage.", "セキュリティ（拡張子偽装）またはプライベートデータ（ダウンロード権限）に関わるファイルのテストケースを最優先で書こう——穴が最も大きな被害を生む場所です。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo", en: "9. Common mistakes & tips", ja: "9. よくある失敗とコツ" },
    blocks: [
      P("Người mới thường vấp vài lỗi giống nhau khi test upload/download. Biết trước giúp bạn tìm lỗi hiệu quả hơn mà không tốn quá nhiều thời gian.",
        "Beginners often stumble on a few common mistakes when testing upload/download. Knowing them helps you find bugs more efficiently without wasting too much time.",
        "初心者はアップロード/ダウンロードのテストで共通の失敗をしがちです。事前に知れば、時間を無駄にせず効率的にバグを見つけられます。"),
      PITFALL("Chỉ kiểm tra đuôi file hiển thị, quên rằng đuôi có thể bị giả mạo — không thử đổi tên file thực thi thành ảnh.", "Only checking the displayed file extension, forgetting it can be spoofed — never trying to rename an executable to look like an image.", "表示されるファイル拡張子だけを確認し、偽装され得ることを忘れる——実行ファイルを画像に見えるよう改名して試さない。"),
      PITFALL("Chỉ test chiều UPLOAD mà quên chiều DOWNLOAD — không kiểm tra file tải về có đúng nội dung, và ai cũng có thể tải file của người khác hay không.", "Only testing the UPLOAD direction and forgetting DOWNLOAD — not checking whether the downloaded file has correct content, and whether anyone can download another user's file.", "アップロード方向だけをテストし、ダウンロードを忘れる——ダウンロードしたファイルの内容が正しいか、誰でも他人のファイルをダウンロードできてしまわないかを確認しない。"),
      TIP("Trước khi báo một ca là bug, tự hỏi: 'Đây có thực sự là hành vi không mong muốn (chấp nhận file nguy hiểm, lộ file người khác) hay chỉ là giới hạn hợp lý của hệ thống?' — tránh báo nhầm ca hợp lệ thành lỗi.", "Before reporting a case as a bug, ask: 'Is this truly unwanted behavior (accepting a dangerous file, exposing another user's file), or just a reasonable system limit?' — avoid mistakenly reporting a valid case as a bug.", "ケースをバグとして報告する前に自問しよう：『これは本当に望ましくない挙動（危険なファイルの受け入れ、他人のファイルの露出）か、それとも妥当なシステムの制限か？』——有効なケースを誤ってバグ報告しないように。"),
      IMG(m_technique, "Nhắc lại các kỹ thuật nghĩ ca kiểm thử file — dùng làm checklist khi thời gian có hạn", "Reminder of file-testing techniques — use as a checklist when time is limited", "ファイルテスト技法の再確認 — 時間が限られる時のチェックリストに"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("Kiểm thử form dữ liệu cho người mới", "Testing data forms for beginners", "kiem-thu-form-du-lieu-cho-nguoi-moi", "初心者のためのフォームテスト"),
      INTERNAL("Kiểm thử âm (Negative Testing) cho người mới", "Negative testing for beginners", "kiem-thu-am-negative-testing-cho-nguoi-moi", "初心者のためのネガティブテスト"),
      INTERNAL("Test chức năng (Functional Testing) cho người mới", "Functional testing for beginners", "test-chuc-nang-functional-testing-cho-nguoi-moi", "初心者のための機能テスト"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa học cách nghĩ ra và viết ca kiểm thử upload & download qua màn tải ảnh đánh giá và ảnh minh chứng đổi trả của ShopEasy: phân biệt kiểm thử đầu vào/đầu ra, các kỹ thuật nghĩ ca (định dạng cấm, giả mạo đuôi file, vượt dung lượng, file rỗng/hỏng, tên file dài/ký tự lạ, nhiều file cùng lúc), và hai tình huống thật cho thấy chỉ kiểm tra bề ngoài dễ bỏ sót lỗi nghiêm trọng. Bạn cũng biết cách ưu tiên thời gian theo mức độ rủi ro của từng loại file. Đây là kỹ năng nền tảng giúp bạn tìm được nhiều lỗi giá trị hơn hẳn so với chỉ test 'chọn file rồi bấm gửi'.",
        "You just learned how to think up and write upload & download test cases through ShopEasy's review-photo and return-proof upload screens: telling input and output testing apart, techniques for test cases (forbidden formats, spoofed extensions, oversized files, empty/corrupt files, long/unusual filenames, multi-file uploads), and two real situations showing that surface-level checks easily miss serious bugs. You also learned to prioritize time by each file type's risk level. This foundational skill helps you find far more valuable bugs than only testing 'pick a file and click send'.",
        "ShopEasyのレビュー写真・返品証明アップロード画面を通じて、アップロード＆ダウンロードのテストケースの考え方と書き方を学びました：入力テストと出力テストの区別、テストケースの技法（禁止形式、拡張子偽装、サイズ超過、空/破損ファイル、長い/特殊文字のファイル名、複数ファイルアップロード）、そして表面的なチェックだけでは重大なバグを見逃しやすいことを示す2つの実例。各ファイル種別のリスクレベルに応じて時間の優先順位を付ける方法も学びました。『ファイルを選んで送信ボタンを押す』だけのテストより遥かに価値あるバグを見つけられる土台スキルです。"),
      P("Chặng tiếp theo, bạn nên học kỹ thuật phân vùng tương đương và giá trị biên để nghĩ ca kiểm thử có hệ thống hơn, cùng cách viết bug report chuẩn để báo cáo những gì bạn tìm được. Nếu muốn học bài bản từ con số 0 tới đi làm cùng người hướng dẫn và dự án thật, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển.",
        "Next, you should learn equivalence partitioning and boundary value techniques to design test cases more systematically, along with how to write a proper bug report for what you find. If you want to learn properly from zero to hired with a mentor and real projects, a Tester course helps you progress fast and apply with confidence.",
        "次は、より体系的にテストケースを設計するための同値分割・境界値分析の技法と、見つけたバグを報告するための適切なバグレポートの書き方を学びましょう。指導者と実際の案件でゼロから就職まで体系的に学びたいなら、テスターコースが速い成長と自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const UPLOAD_FILE_01 = makeDoc({
  slug: "kiem-thu-upload-download-file-cho-nguoi-moi",
  domain: "ecommerce",
  primaryKeyword: "kiểm thử upload file",
  keywords: ["kiểm thử upload file", "kiểm thử download file", "test upload file", "định dạng file cho phép", "dung lượng file tối đa cho người mới"],
  coverLabel: "NGƯỜI MỚI · UPLOAD FILE · TMĐT",
  crumb: "Kiểm thử upload & download file cho người mới",
  metaTitle: { vi: "Kiểm thử upload file cho người mới (có tải xuống)", en: "File upload testing for beginners", ja: "初心者向けファイルアップロードテスト" },
  metaDescription: {
    vi: "Kiểm thử upload file cho người mới: định dạng cho phép/cấm, dung lượng tối đa, file rỗng/hỏng, tên file lạ, nhiều file qua ShopEasy, có hình và trắc nghiệm.",
    en: "File upload testing for beginners: allowed/forbidden formats, max size, empty/corrupt files, unusual filenames, multi-file uploads, correct-content downloads through ShopEasy, with visuals and a quiz.",
    ja: "初心者向けファイルアップロードテスト：許可/禁止形式、最大サイズ、空/破損ファイル、変わったファイル名、複数ファイル、ShopEasyでの正しい内容のダウンロード、図とクイズ付きで解説。",
  },
  title: {
    vi: "Kiểm thử upload & download file cho người mới: định dạng, dung lượng, tên file, quyền tải (có trắc nghiệm)",
    en: "Upload & download file testing for beginners: format, size, filename, download permission (with quiz)",
    ja: "初心者のためのアップロード＆ダウンロードファイルテスト：形式、サイズ、ファイル名、ダウンロード権限（クイズ付き）",
  },
  summary: {
    vi: "Bài cho người mới: kiểm thử upload file và download file qua app TMĐT ShopEasy. Định dạng cho phép/cấm, dung lượng tối đa, file rỗng/hỏng, tên file dài/ký tự lạ, upload nhiều file, tiến trình upload, tải file đúng nội dung, quyền tải — kèm ví dụ lỗi thật (giả mạo đuôi file), nhiều mockup giao diện, FAQ và trắc nghiệm 5 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Beginner article: test file upload and download through the ShopEasy e-commerce app. Allowed/forbidden formats, max size, empty/corrupt files, long/unusual filenames, multi-file upload, upload progress, correct-content download, download permission — with a real bug example (spoofed file extension), many UI mockups, FAQ and a 5-question quiz. SEO-ready, links to the CyberSoft Tester course.",
    ja: "初心者向け記事：ECアプリShopEasyでファイルのアップロードとダウンロードをテストする。許可/禁止形式、最大サイズ、空/破損ファイル、長い/特殊文字のファイル名、複数ファイルアップロード、アップロード進捗、正しい内容のダウンロード、ダウンロード権限——実際のバグ例（拡張子偽装）付き、多数のモック、FAQ、5問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách viết ca kiểm thử upload & download file", steps: [
    { name: "Xác định định dạng và dung lượng cho phép", text: "Đọc tài liệu yêu cầu để biết giới hạn chính xác." },
    { name: "Chuẩn bị bộ file mẫu và áp kỹ thuật kiểm thử", text: "Giả mạo đuôi file, vượt dung lượng, rỗng/hỏng, tên lạ, nhiều file." },
    { name: "Kiểm tra cả chiều download", text: "Nội dung tải về đúng file gốc và chỉ người có quyền mới tải được." },
  ] },
  pages,
});

export const MB_UPLOAD_01 = [UPLOAD_FILE_01];
