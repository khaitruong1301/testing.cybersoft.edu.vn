// Lightweight i18n: UI strings for VI / EN / JA.
// Content (articles, questions) stores its own {vi,en,ja} JSON in the DB.

export const LANGS = ["vi", "en", "ja"];
export const LANG_LABEL = { vi: "Tiếng Việt", en: "English", ja: "日本語" };
export const DEFAULT_LANG = "vi";

export const dict = {
  appName: { vi: "CyberSoft Tester", en: "CyberSoft Tester", ja: "CyberSoft Tester" },
  tagline: {
    vi: "Nền tảng luyện nghề Tester: tài liệu, luyện phỏng vấn & mock interview.",
    en: "The Tester career platform: materials, interview drills & mock interviews.",
    ja: "テスターのための学習プラットフォーム：資料・面接練習・模擬面接。",
  },
  nav_home: { vi: "Trang chủ", en: "Home", ja: "ホーム" },
  nav_docs: { vi: "Tài liệu", en: "Materials", ja: "資料" },
  nav_interview: { vi: "Luyện PV", en: "Practice", ja: "練習" },
  nav_mock: { vi: "Mock Interview", en: "Mock Interview", ja: "模擬面接" },
  nav_cv: { vi: "Làm CV", en: "CV", ja: "履歴書" },
  nav_istqb: { vi: "ISTQB", en: "ISTQB", ja: "ISTQB" },
  istqb_title: { vi: "Luyện thi ISTQB", en: "ISTQB exam practice", ja: "ISTQB試験対策" },
  istqb_desc: {
    vi: "Ngân hàng câu hỏi theo 3 cấp độ chứng chỉ, hệ thống tự chấm.",
    en: "Question bank across the 3 certification levels, auto-graded.",
    ja: "3レベルの認定問題集、自動採点。",
  },
  cv_title: { vi: "Tip làm CV vượt ATS", en: "ATS-beating CV tips", ja: "ATS突破の履歴書術" },
  cv_desc: {
    vi: "Bài hướng dẫn + CV mẫu giúp bạn qua bộ lọc ATS và gây ấn tượng với nhà tuyển dụng.",
    en: "Guides + sample CVs to pass ATS filters and impress recruiters.",
    ja: "ATSを突破し採用担当に響く履歴書ガイドとサンプル。",
  },
  view_sample: { vi: "Xem CV mẫu", en: "View sample CV", ja: "サンプルを見る" },
  nav_profile: { vi: "Hồ sơ", en: "Profile", ja: "プロフィール" },
  nav_login: { vi: "Đăng nhập", en: "Log in", ja: "ログイン" },
  nav_logout: { vi: "Đăng xuất", en: "Log out", ja: "ログアウト" },

  read_done: { vi: "Đã đọc", en: "Read", ja: "既読" },
  read_todo: { vi: "Chưa đọc", en: "Unread", ja: "未読" },
  bookmark: { vi: "Lưu bài", en: "Bookmark", ja: "保存" },
  bookmarked: { vi: "Đã lưu", en: "Saved", ja: "保存済み" },
  add_note: { vi: "Ghi chú", en: "Note", ja: "メモ" },
  save_note: { vi: "Lưu ghi chú", en: "Save note", ja: "メモを保存" },
  note_saved: { vi: "Đã lưu ghi chú", en: "Note saved", ja: "メモを保存しました" },
  note_placeholder: {
    vi: "Ghi chú của bạn về bài này (để mở lại xem sau)…",
    en: "Your note about this article (to revisit later)…",
    ja: "この記事についてのメモ…",
  },
  prev_article: { vi: "Bài trước", en: "Previous", ja: "前の記事" },
  next_article: { vi: "Bài tiếp", en: "Next", ja: "次の記事" },
  in_category: { vi: "Thuộc danh mục", en: "In category", ja: "カテゴリ" },
  profile_title: { vi: "Hồ sơ học tập", en: "My learning profile", ja: "学習プロフィール" },
  my_bookmarks: { vi: "Bài đã lưu", en: "Saved articles", ja: "保存した記事" },
  my_reading: { vi: "Đã đọc gần đây", en: "Recently read", ja: "最近読んだ" },
  no_bookmarks: {
    vi: "Chưa có bài nào được lưu. Mở một bài và bấm ‘Lưu bài’ để xem lại sau.",
    en: "No saved articles yet. Open an article and tap ‘Bookmark’ to revisit later.",
    ja: "保存した記事はまだありません。",
  },
  no_reading: {
    vi: "Bạn chưa đọc bài nào. Bắt đầu từ mục Tài liệu nhé.",
    en: "You haven't read anything yet. Start from Materials.",
    ja: "まだ何も読んでいません。",
  },
  progress_label: { vi: "Tiến độ đọc", en: "Reading progress", ja: "読書の進捗" },
  open: { vi: "Mở bài", en: "Open", ja: "開く" },
  edit_note: { vi: "Sửa ghi chú", en: "Edit note", ja: "メモを編集" },
  remove: { vi: "Bỏ lưu", en: "Remove", ja: "削除" },
  completed_count: { vi: "bài đã đọc", en: "articles read", ja: "読了" },
  saved_count: { vi: "bài đã lưu", en: "saved", ja: "保存" },

  hero_cta: { vi: "Bắt đầu học", en: "Start learning", ja: "学習を始める" },
  hero_secondary: { vi: "Xem tài liệu mẫu", en: "See sample docs", ja: "サンプルを見る" },
  featured: { vi: "Nổi bật", en: "Featured", ja: "おすすめ" },
  demo_docs: { vi: "Tài liệu tiêu biểu", en: "Featured materials", ja: "注目の資料" },
  categories: { vi: "Danh mục", en: "Categories", ja: "カテゴリ" },

  views: { vi: "lượt xem", en: "views", ja: "閲覧" },
  readers: { vi: "người đọc", en: "readers", ja: "読者" },
  questions: { vi: "câu hỏi", en: "questions", ja: "問題" },

  login_title: { vi: "Đăng nhập học viên", en: "Student login", ja: "受講生ログイン" },
  login_old: { vi: "Học viên cũ", en: "Existing student", ja: "既存の受講生" },
  login_new: { vi: "Chưa đăng ký", en: "Not registered yet", ja: "未登録" },
  f_email: { vi: "Email", en: "Email", ja: "メール" },
  f_phone: { vi: "Số điện thoại", en: "Phone", ja: "電話番号" },
  f_code: { vi: "Mã truy cập (6 ký tự)", en: "Access code (6 chars)", ja: "アクセスコード（6桁）" },
  get_code: { vi: "Chưa có mã? Lấy mã qua:", en: "No code? Get one via:", ja: "コードがない場合：" },
  fanpage: { vi: "Inbox Fanpage", en: "Fanpage inbox", ja: "Fanpage" },
  zalo: { vi: "Zalo CyberSoft", en: "Zalo CyberSoft", ja: "Zalo CyberSoft" },
  submit: { vi: "Vào học", en: "Enter", ja: "入る" },

  need_login: {
    vi: "Bạn cần đăng nhập để xem nội dung này.",
    en: "You need to log in to view this content.",
    ja: "このコンテンツを見るにはログインが必要です。",
  },
  read_now: { vi: "Đọc ngay", en: "Read now", ja: "今すぐ読む" },
  page: { vi: "Trang", en: "Page", ja: "ページ" },
  prev: { vi: "Trước", en: "Prev", ja: "前へ" },
  next: { vi: "Sau", en: "Next", ja: "次へ" },
  summary: { vi: "Tóm tắt", en: "Summary", ja: "まとめ" },
  no_download: { vi: "Chỉ xem — không tải xuống", en: "View only — no download", ja: "閲覧のみ・ダウンロード不可" },

  start_quiz: { vi: "Bắt đầu luyện", en: "Start practice", ja: "練習開始" },
  start_mock: { vi: "Bắt đầu Mock Interview", en: "Start Mock Interview", ja: "模擬面接を始める" },
  submit_answers: { vi: "Nộp bài", en: "Submit", ja: "提出" },
  your_score: { vi: "Điểm của bạn", en: "Your score", ja: "あなたの点数" },
  correct: { vi: "Đúng", en: "Correct", ja: "正解" },
  incorrect: { vi: "Sai", en: "Incorrect", ja: "不正解" },
  time_left: { vi: "Thời gian còn lại", en: "Time left", ja: "残り時間" },
  retry: { vi: "Làm lại", en: "Retry", ja: "再挑戦" },

  // ---- Practice / ISTQB / Mock landing ----
  istqb_subtitle: {
    vi: "Luyện thi ISTQB theo 3 cấp độ: Foundation (CTFL) · Advanced (CTAL) · Expert (CTEL). Hệ thống tự chấm.",
    en: "ISTQB practice across 3 levels: Foundation (CTFL) · Advanced (CTAL) · Expert (CTEL). Auto-graded.",
    ja: "3レベルのISTQB対策：Foundation（CTFL）・Advanced（CTAL）・Expert（CTEL）。自動採点。",
  },
  interview_subtitle: {
    vi: "Ngân hàng câu hỏi phỏng vấn thực tế (VN & quốc tế): trắc nghiệm, tự luận, tình huống — tự chấm.",
    en: "Real interview question bank (VN & global): multiple-choice, essay and scenario — auto-graded.",
    ja: "実践的な面接問題集（国内・海外）：選択式・記述式・シナリオ、自動採点。",
  },
  badge_istqb: { vi: "Chứng chỉ quốc tế ISTQB", en: "ISTQB international certification", ja: "ISTQB国際認定" },
  badge_interview: { vi: "Luyện phỏng vấn thực chiến", en: "Real interview drills", ja: "実践面接ドリル" },
  b_autograde: { vi: "Tự chấm tức thì", en: "Instant grading", ja: "即時採点" },
  b_explain: { vi: "Giải thích từng câu", en: "Per-question review", ja: "問題ごとの解説" },
  b_unlimited: { vi: "Luyện không giới hạn", en: "Unlimited practice", ja: "無制限練習" },
  chip_selfgrade: { vi: "Tự chấm", en: "Auto-graded", ja: "自動採点" },
  chip_hasexplain: { vi: "Có giải thích", en: "With review", ja: "解説付き" },
  tier_bundle: { vi: "Bộ câu hỏi", en: "Question set", ja: "問題セット" },
  tier_desc_generic: {
    vi: "Ngân hàng câu hỏi luyện tập kèm đáp án và giải thích chi tiết cho từng câu.",
    en: "A practice question bank with answers and detailed per-question explanations.",
    ja: "解答と詳しい解説付きの練習問題バンク。",
  },
  tier_l1: { vi: "Cấp 1 · Nền tảng", en: "Level 1 · Foundation", ja: "レベル1・基礎" },
  tier_l2: { vi: "Cấp 2 · Nâng cao", en: "Level 2 · Advanced", ja: "レベル2・上級" },
  tier_l3: { vi: "Cấp 3 · Chuyên gia", en: "Level 3 · Expert", ja: "レベル3・エキスパート" },
  tier_desc_l1: {
    vi: "Thuật ngữ, quy trình kiểm thử, kỹ thuật thiết kế test case và quản lý testing cơ bản.",
    en: "Terminology, testing process, test-case design techniques and basic test management.",
    ja: "用語・テストプロセス・テストケース設計技法・基本的なテスト管理。",
  },
  tier_desc_l2: {
    vi: "Test Analyst, Technical Test Analyst & Test Manager — kỹ thuật nâng cao và quản lý đội.",
    en: "Test Analyst, Technical Test Analyst & Test Manager — advanced techniques and team management.",
    ja: "テストアナリスト・テクニカルテストアナリスト・テストマネージャー — 上級技法とチーム管理。",
  },
  empty_qset: { vi: "Chưa có bộ câu hỏi nào.", en: "No question sets yet.", ja: "まだ問題セットがありません。" },
  tier_desc_l3: {
    vi: "Quản lý kiểm thử và cải tiến quy trình testing ở quy mô tổ chức.",
    en: "Test management and testing-process improvement at organization scale.",
    ja: "組織規模でのテスト管理とテストプロセス改善。",
  },

  admin: { vi: "Quản trị", en: "Admin", ja: "管理" },

  // ---- Site footer ----
  footer_col_learn: { vi: "Học Tester", en: "Learn Testing", ja: "テスターを学ぶ" },
  footer_col_ai: { vi: "AI & Nâng cao", en: "AI & Advanced", ja: "AI・上級" },
  footer_col_career: { vi: "Nghề nghiệp", en: "Career", ja: "キャリア" },
  footer_manual: { vi: "Tài liệu Manual Testing", en: "Manual Testing", ja: "手動テスト" },
  footer_automation: { vi: "Automation Testing", en: "Automation Testing", ja: "自動化テスト" },
  footer_api: { vi: "Kiểm thử API (Postman)", en: "API Testing (Postman)", ja: "APIテスト（Postman）" },
  footer_performance: { vi: "Performance Testing", en: "Performance Testing", ja: "パフォーマンステスト" },
  footer_ai_testing: { vi: "AI trong Testing", en: "AI in Testing", ja: "テストにおけるAI" },
  footer_ai_agent: { vi: "AI Agent trong Testing", en: "AI Agents in Testing", ja: "テストにおけるAIエージェント" },
  footer_claude: { vi: "Cấu hình Claude cho Testing", en: "Claude for Testing", ja: "テスト向けClaude設定" },
  footer_playwright: { vi: "Playwright & công cụ mới", en: "Playwright & new tools", ja: "Playwrightと新ツール" },
  footer_istqb: { vi: "Luyện thi ISTQB", en: "ISTQB practice", ja: "ISTQB試験対策" },
  footer_interview: { vi: "Luyện phỏng vấn QA", en: "QA interview drills", ja: "QA面接練習" },
  footer_cv: { vi: "CV Tester vượt ATS", en: "ATS-friendly Tester CV", ja: "ATS対応テスター履歴書" },
  footer_blurb: {
    vi: "CyberSoft Tester — nền tảng học kiểm thử phần mềm (Software Testing) thực chiến cho nghề Tester / QA / QC: từ manual testing, thiết kế test case, viết bug report, kiểm thử API, đến automation testing với Playwright & Selenium, performance testing và AI testing. Kèm lộ trình luyện thi ISTQB, luyện phỏng vấn QA và mẫu CV vượt ATS.",
    en: "CyberSoft Tester — a practical software testing platform for Tester / QA / QC careers: manual testing, test case design, bug reports, API testing, automation with Playwright & Selenium, performance testing and AI testing, plus ISTQB practice, QA interview drills and ATS-friendly CVs.",
    ja: "CyberSoft Tester — テスター／QA／QC のための実践的なソフトウェアテスト学習プラットフォーム。手動テスト、テストケース設計、バグ報告、APIテストから、Playwright・Selenium による自動化テスト、パフォーマンステスト、AIテストまで。ISTQB試験対策、QA面接練習、ATS対応の履歴書サンプルも用意。",
  },
  footer_tagline: {
    vi: "Học Tester / QA / Automation / AI Testing thực chiến",
    en: "Practical Tester / QA / Automation / AI Testing",
    ja: "実践的なテスター／QA／自動化／AIテスト",
  },
};

export function t(key, lang = DEFAULT_LANG) {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry[DEFAULT_LANG] || key;
}

// Read a trilingual JSON string field from DB content.
export function loc(jsonString, lang = DEFAULT_LANG) {
  if (!jsonString) return "";
  try {
    const obj = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
    return obj[lang] || obj[DEFAULT_LANG] || obj.en || "";
  } catch {
    return typeof jsonString === "string" ? jsonString : "";
  }
}
