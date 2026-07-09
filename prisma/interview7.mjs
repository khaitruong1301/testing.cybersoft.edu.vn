// ============================================================================
// INTERVIEW7 — Bổ sung: 1 câu / danh mục phỏng vấn = 4 câu.
// Danh mục: iv-manual, iv-automation, iv-playwright, iv-ai.
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// ============================================================================
export const DATA = [
  // ===================== iv-manual (1) — answer: 0 =====================
  { cat: "iv-manual",
    q: { vi: "Phỏng vấn hỏi: 「Phân biệt retesting (kiểm thử lại) và regression testing (kiểm thử hồi quy)」. Đâu là phân biệt đúng?",
        en: "The interviewer asks: distinguish retesting from regression testing. Which distinction is correct?",
        ja: "面接で「リテスト(再テスト)と回帰テストを区別してください」と聞かれました。正しい区別はどれですか。" },
    options: [
      { vi: "Retesting là chạy lại đúng ca đã fail để xác nhận bug đã được sửa; regression là kiểm tra thay đổi có làm hỏng phần đang chạy tốt hay không", en: "Retesting re-runs the exact failed case to confirm the bug is fixed; regression checks whether a change broke previously working areas", ja: "リテストは失敗したケースを再実行して修正を確認すること、回帰は変更が既存の正常部分を壊していないか確認することである" },
      { vi: "Cả hai giống hệt nhau, chỉ khác tên gọi", en: "Both are identical, just different names", ja: "両者は同一で、名前が違うだけである" },
      { vi: "Retesting chỉ làm bằng tay, regression chỉ làm tự động", en: "Retesting is only manual, regression is only automated", ja: "リテストは手動のみ、回帰は自動のみである" },
      { vi: "Regression làm trước khi sửa bug, retesting làm khi chưa có bug nào", en: "Regression runs before fixing a bug, retesting when there is no bug", ja: "回帰はバグ修正前、リテストはバグがないときに行う" }
    ],
    answer: 0,
    exp: { vi: "Retesting (confirmation testing) chạy lại chính ca kiểm thử đã fail sau khi dev sửa để xác nhận lỗi đã hết. Regression testing kiểm tra rộng hơn nhằm phát hiện lỗi phát sinh do thay đổi ở những phần trước đó vẫn hoạt động đúng. Cả hai đều có thể chạy tay hoặc tự động.", en: "Retesting (confirmation testing) re-runs the previously failed case after the fix to confirm the defect is gone. Regression testing checks more broadly for defects introduced by the change in areas that used to work. Both can be manual or automated.", ja: "リテスト(確認テスト)は修正後に失敗したケースを再実行し欠陥が解消したか確認する。回帰テストは変更により既存の正常部分に生じた欠陥をより広く検出する。どちらも手動でも自動でも実施できる。" } },

  // ===================== iv-automation (1) — answer: 2 =====================
  { cat: "iv-automation",
    q: { vi: "Tiêu chí nào KÉM phù hợp nhất để chọn một ca kiểm thử đưa vào tự động hóa?",
        en: "Which criterion is the LEAST suitable for selecting a test case to automate?",
        ja: "テストケースを自動化対象に選ぶ基準として、最も不適切なものはどれですか。" },
    options: [
      { vi: "Ca ổn định, lặp lại thường xuyên (ví dụ smoke/regression chạy mỗi build)", en: "Stable, frequently repeated cases (e.g. smoke/regression run every build)", ja: "安定し頻繁に繰り返すケース(例: 毎ビルド実行するsmoke/regression)" },
      { vi: "Ca tốn nhiều công nếu làm tay và dễ sai sót khi lặp", en: "Cases that are laborious to do manually and error-prone when repeated", ja: "手動では手間がかかり、繰り返すと誤りやすいケース" },
      { vi: "Ca chạy đúng một lần, giao diện đang thay đổi liên tục và cần đánh giá cảm quan (exploratory/UX)", en: "One-off cases with a rapidly changing UI needing subjective judgment (exploratory/UX)", ja: "一度きりで、UIが頻繁に変わり主観的判断が必要なケース(探索的/UX)" },
      { vi: "Ca kiểm thử dữ liệu theo nhiều bộ đầu vào (data-driven)", en: "Data-driven cases across many input sets", ja: "多数の入力セットを扱うデータ駆動ケース" }
    ],
    answer: 2,
    exp: { vi: "Tự động hóa đáng giá với ca ổn định, lặp nhiều, tốn công tay hoặc data-driven. Ngược lại, ca chạy một lần, UI đổi liên tục hoặc cần đánh giá cảm quan (exploratory, thẩm mỹ) thì tự động hóa tốn chi phí bảo trì mà lợi ích thấp — nên để kiểm thử thủ công.", en: "Automation pays off for stable, frequently repeated, laborious or data-driven cases. Conversely, one-off cases, rapidly changing UIs or those needing subjective judgment (exploratory, aesthetics) cost too much maintenance for little benefit — better left to manual testing.", ja: "自動化は安定・高頻度・手間・データ駆動のケースで有効である。逆に一度きり、UIが頻繁に変わる、主観的判断が必要(探索的・美観)なケースは保守コストが高く効果が薄いため、手動テストに残すのがよい。" } },

  // ===================== iv-playwright (1) — answer: 1 =====================
  { cat: "iv-playwright",
    q: { vi: "Trong Playwright Test, cơ chế 「fixtures」 và mỗi test chạy trong một browser context riêng mang lại lợi ích chính nào?",
        en: "In Playwright Test, what is the main benefit of fixtures plus each test running in its own browser context?",
        ja: "Playwright Testにおいて、フィクスチャと各テストが独自のブラウザコンテキストで動く仕組みの主な利点は何ですか。" },
    options: [
      { vi: "Làm cho mọi test buộc phải chạy tuần tự, không thể song song", en: "It forces all tests to run sequentially, never in parallel", ja: "すべてのテストを逐次実行させ、並列を不可能にする" },
      { vi: "Cách ly trạng thái giữa các test (cookie/session/storage riêng), giúp test độc lập, song song an toàn và ít ảnh hưởng lẫn nhau", en: "It isolates state between tests (separate cookies/session/storage), keeping tests independent, safely parallel and free of cross-contamination", ja: "テスト間の状態(独立したcookie/セッション/ストレージ)を分離し、テストを独立・安全に並列化し、相互汚染を防ぐ" },
      { vi: "Tự động viết assertion thay cho người dùng", en: "It writes assertions automatically for the user", ja: "利用者の代わりにアサーションを自動生成する" },
      { vi: "Mã hóa toàn bộ lưu lượng mạng của test", en: "It encrypts all network traffic of the test", ja: "テストの全ネットワーク通信を暗号化する" }
    ],
    answer: 1,
    exp: { vi: "Mỗi test Playwright mặc định có browser context riêng (như một phiên trình duyệt sạch), nên cookie/storage/session không rò rỉ giữa các test. Fixtures cấp tài nguyên (page, dữ liệu, đăng nhập) theo phạm vi và tự dọn dẹp, giúp test độc lập và chạy song song an toàn.", en: "Each Playwright test gets its own browser context by default (like a clean browser session), so cookies/storage/session don't leak between tests. Fixtures provide scoped resources (page, data, login) and tear them down automatically, keeping tests independent and safely parallel.", ja: "Playwrightの各テストは既定で独自のブラウザコンテキスト(クリーンなブラウザセッションのようなもの)を持ち、cookie/ストレージ/セッションがテスト間で漏れない。フィクスチャはスコープ付きのリソース(page・データ・ログイン)を提供し自動的に後始末するため、テストは独立し安全に並列化できる。" } },

  // ===================== iv-ai (1) — answer: 3 =====================
  { cat: "iv-ai",
    q: { vi: "Khi nhờ AI sinh 「dữ liệu kiểm thử」 (test data), rủi ro về tuân thủ/bảo mật cần đề phòng nhất là gì?",
        en: "When asking AI to generate test data, which compliance/security risk must be guarded against most?",
        ja: "AIに「テストデータ」を生成させるとき、最も警戒すべきコンプライアンス/セキュリティのリスクは何ですか。" },
    options: [
      { vi: "AI làm dữ liệu test đẹp hơn nên không có rủi ro gì", en: "AI makes prettier test data, so there is no risk", ja: "AIはより見栄えの良いデータを作るのでリスクはない" },
      { vi: "Dữ liệu sinh ra luôn thiếu số lượng, không đủ để chạy test", en: "Generated data is always too little to run tests", ja: "生成データは常に少なすぎてテストを実行できない" },
      { vi: "AI chỉ sinh được số, không sinh được chuỗi", en: "AI can only generate numbers, not strings", ja: "AIは数値しか生成できず文字列は作れない" },
      { vi: "Vô tình nhập dữ liệu thật chứa PII vào công cụ AI, hoặc AI 「bịa」 dữ liệu trông thật (SĐT, email, thẻ) trùng với thông tin người thật", en: "Accidentally feeding real PII into the AI tool, or the AI fabricating realistic data (phone, email, card) that collides with real people's information", ja: "実在のPIIを誤ってAIツールに投入する、あるいはAIが実在の人物の情報と一致する本物らしいデータ(電話・メール・カード)を捏造する" }
    ],
    answer: 3,
    exp: { vi: "Rủi ro lớn nhất là lộ dữ liệu nhạy cảm: dán PII/dữ liệu production thật vào công cụ AI bên thứ ba, hoặc AI sinh dữ liệu 「thật một cách ngẫu nhiên」 (email/SĐT/số thẻ hợp lệ) trùng người thật. Nên dùng dữ liệu tổng hợp/ẩn danh, tuân thủ chính sách bảo mật và kiểm tra đầu ra trước khi dùng.", en: "The biggest risk is exposing sensitive data: pasting real PII/production data into a third-party AI tool, or the AI generating 'accidentally real' data (valid email/phone/card numbers) matching real people. Use synthetic/anonymized data, follow data-protection policy, and review outputs before use.", ja: "最大のリスクは機微データの露出である: 実在のPIIや本番データを外部AIツールに貼り付ける、またはAIが実在者と一致する「偶然本物」のデータ(有効なメール・電話・カード番号)を生成すること。合成/匿名化データを使い、データ保護方針に従い、出力を利用前に確認すべきである。" } },
];
