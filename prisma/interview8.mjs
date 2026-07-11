// ============================================================================
// INTERVIEW8 — Bổ sung đợt: 5 câu / danh mục phỏng vấn = 20 câu.
// Danh mục: iv-manual, iv-automation, iv-playwright, iv-ai.
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// ============================================================================
export const DATA = [
  // ===================== iv-manual (5) — answers: 0,1,2,3,0 =====================
  { cat: "iv-manual",
    q: { vi: "Thành phần nào là cốt lõi KHÔNG thể thiếu của một kế hoạch kiểm thử (test plan)?",
        en: "Which component is a core, indispensable part of a test plan?",
        ja: "テスト計画に不可欠な中核要素はどれですか。" },
    options: [
      { vi: "Phạm vi (scope), cách tiếp cận, tài nguyên, lịch trình và tiêu chí vào/ra", en: "Scope, approach, resources, schedule and entry/exit criteria", ja: "範囲・アプローチ・リソース・スケジュール・開始/終了基準" },
      { vi: "Danh sách nhạc yêu thích của đội test", en: "The test team's favorite music playlist", ja: "テストチームのお気に入りの音楽リスト" },
      { vi: "Mã nguồn đầy đủ của sản phẩm", en: "The full source code of the product", ja: "製品の完全なソースコード" },
      { vi: "Ảnh chụp màn hình mọi bug tương lai", en: "Screenshots of every future bug", ja: "将来の全バグのスクリーンショット" }
    ],
    answer: 0,
    exp: { vi: "Test plan xác định phạm vi kiểm thử, cách tiếp cận, phân bổ nguồn lực, lịch trình, rủi ro và tiêu chí vào/ra. Đây là kim chỉ nam cho hoạt động kiểm thử, không phải nơi chứa mã nguồn hay ảnh bug.", en: "A test plan defines scope, approach, resource allocation, schedule, risks and entry/exit criteria. It guides the testing effort — it is not a place to store source code or bug screenshots.", ja: "テスト計画は範囲・アプローチ・リソース配分・スケジュール・リスク・開始/終了基準を定める。テスト活動の指針であり、ソースコードやバグ画像を置く場所ではない。" } },

  { cat: "iv-manual",
    q: { vi: "Phỏng vấn hỏi: 「Phân biệt smoke testing và sanity testing」. Đáp án đúng là gì?",
        en: "Interviewer: distinguish smoke testing from sanity testing. Which is correct?",
        ja: "面接: スモークテストとサニティテストを区別してください。正しいものはどれですか。" },
    options: [
      { vi: "Smoke và sanity là hoàn toàn giống nhau", en: "Smoke and sanity are exactly the same", ja: "スモークとサニティは完全に同じである" },
      { vi: "Smoke: kiểm tra nhanh, rộng rằng các chức năng CHÍNH của build có chạy không (build có 「thở」 không); sanity: kiểm tra hẹp, sâu một vài chức năng/sửa lỗi cụ thể sau thay đổi", en: "Smoke: quick, broad check that the build's MAIN functions work (is the build stable enough); sanity: narrow, focused check of specific functions/fixes after a change", ja: "スモーク: ビルドの主要機能が動くかを素早く広く確認(ビルドが十分安定か)、サニティ: 変更後に特定機能/修正を狭く重点的に確認" },
      { vi: "Smoke chỉ làm bằng tay, sanity chỉ tự động", en: "Smoke is only manual, sanity only automated", ja: "スモークは手動のみ、サニティは自動のみ" },
      { vi: "Sanity phải chạy trước khi có build", en: "Sanity must run before a build exists", ja: "サニティはビルドが存在する前に実行しなければならない" }
    ],
    answer: 1,
    exp: { vi: "Smoke test kiểm tra RỘNG và NÔNG rằng build ổn định đủ để test tiếp (các luồng chính chạy). Sanity test kiểm tra HẸP và SÂU một vùng cụ thể sau khi sửa/đổi để xác nhận nó hoạt động hợp lý trước khi test kỹ hơn.", en: "A smoke test is BROAD and SHALLOW, confirming the build is stable enough to test further (main flows work). A sanity test is NARROW and DEEP on a specific area after a fix/change to confirm it behaves reasonably before deeper testing.", ja: "スモークテストは広く浅く、ビルドが次のテストに耐える安定性(主要フローが動く)を確認する。サニティテストは修正/変更後の特定領域を狭く深く確認し、より深いテストの前に妥当に動くかを見る。" } },

  { cat: "iv-manual",
    q: { vi: "「Kiểm thử âm」 (negative testing) tập trung vào điều gì?",
        en: "What does negative testing focus on?",
        ja: "「ネガティブテスト(異常系テスト)」は何に重点を置きますか。" },
    options: [
      { vi: "Chỉ kiểm tra khi người dùng nhập đúng, hợp lệ", en: "Only checking valid, correct user input", ja: "正しく有効な入力のみを確認する" },
      { vi: "Chỉ đo hiệu năng dưới tải", en: "Only measuring performance under load", ja: "負荷下の性能測定のみ" },
      { vi: "Kiểm tra hệ thống xử lý ĐÚNG với đầu vào không hợp lệ/bất thường (báo lỗi rõ, không crash, không hỏng dữ liệu)", en: "Checking the system handles invalid/abnormal input correctly (clear errors, no crash, no data corruption)", ja: "無効/異常な入力をシステムが正しく処理するか(明確なエラー・クラッシュなし・データ破損なし)を確認する" },
      { vi: "Xóa toàn bộ dữ liệu để thử lại", en: "Deleting all data to retry", ja: "全データを削除してやり直す" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử âm cố tình đưa đầu vào sai/bất thường (rỗng, quá dài, ký tự đặc biệt, sai định dạng) để xác nhận hệ thống từ chối hợp lý, báo lỗi rõ ràng, không crash hay hỏng dữ liệu. Nó bổ sung cho kiểm thử dương (đầu vào hợp lệ).", en: "Negative testing deliberately supplies wrong/abnormal input (empty, too long, special chars, bad format) to confirm the system rejects it gracefully, shows clear errors, and does not crash or corrupt data. It complements positive testing (valid input).", ja: "ネガティブテストは誤った/異常な入力(空・長すぎ・特殊文字・不正形式)を意図的に与え、システムが適切に拒否し明確なエラーを出し、クラッシュやデータ破損を起こさないことを確認する。正常系テストを補完する。" } },

  { cat: "iv-manual",
    q: { vi: "Vòng đời của một bug (bug life cycle) điển hình bắt đầu và kết thúc ở trạng thái nào?",
        en: "A typical bug life cycle starts and ends at which states?",
        ja: "典型的なバグライフサイクルはどの状態で始まり、どの状態で終わりますか。" },
    options: [
      { vi: "Bắt đầu 「Closed」 và kết thúc 「New」", en: "Starts at 'Closed' and ends at 'New'", ja: "「Closed」で始まり「New」で終わる" },
      { vi: "Bắt đầu 「Fixed」 và kết thúc 「Open」", en: "Starts at 'Fixed' and ends at 'Open'", ja: "「Fixed」で始まり「Open」で終わる" },
      { vi: "Không có trạng thái nào, bug tồn tại mãi mãi", en: "No states; a bug exists forever", ja: "状態はなく、バグは永遠に存在する" },
      { vi: "Bắt đầu 「New/Open」 (phát hiện & ghi nhận) và kết thúc 「Closed」 (đã sửa, kiểm thử lại đạt) — hoặc 「Rejected/Deferred」", en: "Starts at 'New/Open' (found & logged) and ends at 'Closed' (fixed, retested OK) — or 'Rejected/Deferred'", ja: "「New/Open」(発見・記録)で始まり「Closed」(修正・再テスト合格)で終わる — または「Rejected/Deferred」" }
    ],
    answer: 3,
    exp: { vi: "Bug thường đi: New/Open → Assigned → Fixed → Retest → Closed. Có nhánh: Rejected (không phải lỗi), Deferred (hoãn), Reopened (sửa chưa xong). Hiểu vòng đời giúp phối hợp dev–QA và theo dõi trạng thái minh bạch.", en: "A bug typically flows: New/Open → Assigned → Fixed → Retest → Closed, with branches: Rejected (not a defect), Deferred, Reopened (fix incomplete). Understanding the lifecycle aids dev–QA coordination and transparent tracking.", ja: "バグは通常 New/Open → Assigned → Fixed → Retest → Closed と進み、分岐として Rejected(欠陥でない)・Deferred(先送り)・Reopened(修正未完)がある。ライフサイクルの理解は開発・QAの連携と透明な追跡に役立つ。" } },

  { cat: "iv-manual",
    q: { vi: "Ma trận truy vết yêu cầu (Requirements Traceability Matrix - RTM) dùng để làm gì?",
        en: "What is a Requirements Traceability Matrix (RTM) used for?",
        ja: "要件追跡マトリクス(RTM)は何のために使いますか。" },
    options: [
      { vi: "Ánh xạ từng yêu cầu tới ca kiểm thử tương ứng, bảo đảm mọi yêu cầu đều được kiểm thử và không sót", en: "Mapping each requirement to its corresponding test cases, ensuring every requirement is tested and none is missed", ja: "各要件を対応するテストケースに対応づけ、全要件がテストされ漏れがないことを保証する" },
      { vi: "Lưu mật khẩu người dùng", en: "Storing user passwords", ja: "ユーザーのパスワードを保存する" },
      { vi: "Thay thế cho công cụ quản lý mã nguồn", en: "Replacing the source control tool", ja: "ソース管理ツールを置き換える" },
      { vi: "Tự động sửa lỗi trong code", en: "Automatically fixing bugs in code", ja: "コードのバグを自動修正する" }
    ],
    answer: 0,
    exp: { vi: "RTM liên kết hai chiều giữa yêu cầu và ca kiểm thử (và có thể tới lỗi). Nó giúp thấy độ phủ (yêu cầu nào chưa có test), đánh giá tác động khi yêu cầu thay đổi, và chứng minh mọi yêu cầu đã được kiểm chứng.", en: "An RTM links requirements to test cases (and optionally to defects) both ways. It reveals coverage (which requirements lack tests), supports impact analysis when requirements change, and demonstrates that every requirement is verified.", ja: "RTMは要件とテストケース(および任意で欠陥)を双方向にリンクする。カバレッジ(テストのない要件)を可視化し、要件変更時の影響分析を支援し、全要件が検証されたことを示す。" } },

  // ===================== iv-automation (5) — answers: 1,2,3,0,1 =====================
  { cat: "iv-automation",
    q: { vi: "Thời điểm hợp lý để bắt đầu tự động hóa một bộ kiểm thử là khi nào?",
        en: "When is it reasonable to start automating a test suite?",
        ja: "テストスイートの自動化を始めるのに妥当なのはいつですか。" },
    options: [
      { vi: "Ngay khi UI còn thay đổi liên tục mỗi ngày, chưa ổn định", en: "While the UI still changes daily and is unstable", ja: "UIが毎日変わり不安定なうちに" },
      { vi: "Khi chức năng đã tương đối ổn định, ca kiểm thử lặp lại nhiều lần và có giá trị hồi quy rõ ràng", en: "When features are relatively stable, cases repeat often, and there is clear regression value", ja: "機能が比較的安定し、ケースが繰り返され、明確な回帰価値があるとき" },
      { vi: "Không bao giờ nên tự động hóa", en: "Automation should never be done", ja: "自動化は決して行うべきでない" },
      { vi: "Chỉ tự động hóa những ca chạy đúng một lần", en: "Only automate one-off cases", ja: "一度きりのケースだけを自動化する" }
    ],
    answer: 1,
    exp: { vi: "Tự động hóa đáng đầu tư khi chức năng đủ ổn định (tránh bảo trì liên tục do UI đổi), ca kiểm thử lặp lại (hồi quy, smoke, data-driven) và tốn công nếu làm tay. Tự động hóa quá sớm khi mọi thứ còn biến động sẽ tốn chi phí bảo trì lớn.", en: "Automation is worth investing in when features are stable enough (avoiding constant maintenance from UI churn), cases repeat (regression, smoke, data-driven), and are laborious manually. Automating too early amid churn incurs heavy maintenance cost.", ja: "自動化は、機能が十分安定し(UI変動による保守を避け)、ケースが繰り返され(回帰・スモーク・データ駆動)、手動では手間がかかるときに投資価値がある。変動の激しい早すぎる自動化は保守コストが大きい。" } },

  { cat: "iv-automation",
    q: { vi: "Trong tự động hóa, sự khác nhau giữa 「assertion」 (hard) và 「verification」 (soft) là gì?",
        en: "In automation, what is the difference between a (hard) assertion and a (soft) verification?",
        ja: "自動化における(ハード)アサーションと(ソフト)ベリフィケーションの違いは何ですか。" },
    options: [
      { vi: "Không có khác biệt nào", en: "There is no difference", ja: "違いはない" },
      { vi: "Assertion (hard) dừng test ngay khi thất bại; soft verification ghi nhận lỗi nhưng cho test chạy tiếp để thu thập nhiều điểm sai trong một lần chạy", en: "A hard assertion stops the test immediately on failure; a soft verification records the failure but lets the test continue to collect multiple issues in one run", ja: "ハードアサーションは失敗時に即テストを停止し、ソフトベリフィケーションは失敗を記録しつつテストを続行し、1回の実行で複数の問題を収集する" },
      { vi: "Assertion chỉ dùng cho API, verification chỉ cho UI", en: "Assertions are only for APIs, verifications only for UI", ja: "アサーションはAPI専用、ベリフィケーションはUI専用" },
      { vi: "Soft verification làm test chạy nhanh gấp đôi", en: "Soft verification makes tests run twice as fast", ja: "ソフトベリフィケーションはテストを2倍速くする" }
    ],
    answer: 1,
    exp: { vi: "Hard assertion: thất bại là dừng ngay (thích hợp cho điều kiện tiên quyết). Soft assertion/verification: ghi lại thất bại và tiếp tục, cuối cùng tổng hợp — hữu ích khi muốn kiểm nhiều thuộc tính trên một màn hình trong một lần chạy.", en: "A hard assertion stops on failure (good for preconditions). A soft assertion/verification records the failure and continues, aggregating at the end — useful to check many properties on one screen in a single run.", ja: "ハードアサーションは失敗で即停止する(前提条件向け)。ソフトアサーション/ベリフィケーションは失敗を記録して続行し最後に集約する。1回の実行で1画面の多数の属性を確認するのに有用である。" } },

  { cat: "iv-automation",
    q: { vi: "Khung 「keyword-driven」 khác 「data-driven」 chủ yếu ở điểm nào?",
        en: "How does a keyword-driven framework mainly differ from a data-driven one?",
        ja: "キーワード駆動フレームワークはデータ駆動と主にどう異なりますか。" },
    options: [
      { vi: "Data-driven không cần dữ liệu", en: "Data-driven needs no data", ja: "データ駆動はデータを必要としない" },
      { vi: "Keyword-driven không chạy được trên trình duyệt", en: "Keyword-driven cannot run in a browser", ja: "キーワード駆動はブラウザで動かない" },
      { vi: "Data-driven tách DỮ LIỆU đầu vào khỏi script (chạy cùng kịch bản với nhiều bộ dữ liệu); keyword-driven tách HÀNH ĐỘNG thành các từ khóa để người ít code cũng dựng ca kiểm thử", en: "Data-driven separates input DATA from the script (same script, many datasets); keyword-driven abstracts ACTIONS into keywords so low-code users can build cases", ja: "データ駆動は入力データをスクリプトから分離(同じスクリプトで多数のデータセット)、キーワード駆動はアクションをキーワードに抽象化し、コードが少ない人でもケースを組める" },
      { vi: "Hai loại này không thể kết hợp", en: "The two cannot be combined", ja: "両者は組み合わせられない" }
    ],
    answer: 2,
    exp: { vi: "Data-driven: một kịch bản chạy lặp với nhiều bộ dữ liệu (bảng/CSV) để phủ nhiều trường hợp. Keyword-driven: đóng gói hành động thành từ khóa (Login, ClickButton...) để tạo ca kiểm thử ở mức trừu tượng cao, dễ cho người không chuyên code. Có thể kết hợp cả hai (hybrid).", en: "Data-driven runs one script repeatedly with many datasets (table/CSV) to cover cases. Keyword-driven packages actions into keywords (Login, ClickButton...) to build cases at a high abstraction, friendly to non-coders. The two can be combined (hybrid).", ja: "データ駆動は1つのスクリプトを多数のデータセット(表/CSV)で繰り返し実行して網羅する。キーワード駆動はアクションをキーワード(Login・ClickButtonなど)に包み、高い抽象度でケースを作れ、非コーダーに優しい。両者は組み合わせ(ハイブリッド)可能である。" } },

  { cat: "iv-automation",
    q: { vi: "Vì sao nên tích hợp bộ kiểm thử tự động vào pipeline CI (chạy mỗi lần push/merge)?",
        en: "Why integrate the automated test suite into a CI pipeline (running on each push/merge)?",
        ja: "自動テストスイートをCIパイプライン(push/mergeごとに実行)へ統合するのはなぜですか。" },
    options: [
      { vi: "Để phát hiện hồi quy sớm, phản hồi nhanh cho lập trình viên ngay khi thay đổi vừa được đưa lên, giảm chi phí sửa lỗi muộn", en: "To catch regressions early, giving developers fast feedback right after a change lands, reducing the cost of late fixes", ja: "回帰を早期に検出し、変更直後に開発者へ素早いフィードバックを与え、遅い修正のコストを下げるため" },
      { vi: "Để tốn nhiều tài nguyên máy chủ hơn", en: "To consume more server resources", ja: "サーバー資源をより多く消費するため" },
      { vi: "Để không ai phải xem kết quả test", en: "So nobody has to look at test results", ja: "誰もテスト結果を見なくて済むように" },
      { vi: "Để thay thế hoàn toàn việc review code", en: "To fully replace code review", ja: "コードレビューを完全に置き換えるため" }
    ],
    answer: 0,
    exp: { vi: "Chạy test tự động trong CI cho phản hồi tức thì: lỗi hồi quy bị bắt ngay khi vừa xuất hiện, khi ngữ cảnh còn mới và chi phí sửa thấp. Nó tạo 「lưới an toàn」 cho mỗi thay đổi, hỗ trợ giao hàng thường xuyên và tự tin hơn.", en: "Running automated tests in CI gives immediate feedback: regressions are caught as soon as they appear, while context is fresh and fix cost is low. It provides a safety net for every change, enabling frequent, confident delivery.", ja: "CIで自動テストを走らせると即時フィードバックが得られ、回帰は出現直後に、文脈が新しく修正コストが低いうちに捕捉される。各変更のセーフティネットとなり、頻繁で自信あるデリバリーを支える。" } },

  { cat: "iv-automation",
    q: { vi: "Khi một test tự động thất bại trong CI, thực hành TỐT đầu tiên nên làm là gì?",
        en: "When an automated test fails in CI, what is the first GOOD practice?",
        ja: "自動テストがCIで失敗したとき、最初に取るべき良い実践は何ですか。" },
    options: [
      { vi: "Xóa hoặc tắt (skip) test ngay để pipeline xanh", en: "Immediately delete or skip the test to make the pipeline green", ja: "パイプラインを緑にするため即テストを削除/skipする" },
      { vi: "Xem log/artefact (ảnh, trace) để xác định thất bại là do lỗi sản phẩm thật hay do test/ môi trường (flaky), rồi xử lý đúng gốc", en: "Inspect logs/artifacts (screenshots, traces) to decide if it is a real product bug or a test/environment (flaky) issue, then fix the root cause", ja: "ログ/成果物(スクリーンショット・トレース)を確認し、実際の製品バグか、テスト/環境(flaky)の問題かを判断し、根本原因を正す" },
      { vi: "Chạy lại 20 lần cho tới khi may mắn xanh", en: "Rerun 20 times until it luckily passes", ja: "運良く緑になるまで20回再実行する" },
      { vi: "Bỏ qua vì test tự động luôn sai", en: "Ignore it because automated tests are always wrong", ja: "自動テストは常に誤りなので無視する" }
    ],
    answer: 1,
    exp: { vi: "Thất bại là tín hiệu cần điều tra, không phải phiền toái để giấu. Xem log, ảnh chụp, trace để phân biệt lỗi thật (báo dev) với flaky/hạ tầng (sửa test hoặc ổn định môi trường). Tắt/xóa test để làm xanh pipeline là che giấu rủi ro.", en: "A failure is a signal to investigate, not a nuisance to hide. Use logs, screenshots and traces to separate a real bug (report to dev) from flaky/infra issues (fix the test or stabilize the environment). Skipping/deleting tests to go green conceals risk.", ja: "失敗は隠すべき厄介事ではなく調査すべき信号である。ログ・スクショ・トレースで実バグ(開発へ報告)とflaky/インフラ問題(テスト修正や環境安定化)を切り分ける。緑化のためのskip/削除はリスクを隠す。" } },

  // ===================== iv-playwright (5) — answers: 2,3,0,1,2 =====================
  { cat: "iv-playwright",
    q: { vi: "Một lợi thế kỹ thuật nổi bật của Playwright so với Selenium WebDriver 「thuần」 là gì?",
        en: "What is a notable technical advantage of Playwright over 'plain' Selenium WebDriver?",
        ja: "「素の」Selenium WebDriverに対するPlaywrightの顕著な技術的利点は何ですか。" },
    options: [
      { vi: "Playwright chỉ chạy được trên một trình duyệt duy nhất", en: "Playwright runs on only one browser", ja: "Playwrightは1種類のブラウザでしか動かない" },
      { vi: "Playwright bắt buộc phải viết bằng Java", en: "Playwright must be written in Java", ja: "PlaywrightはJavaで書かねばならない" },
      { vi: "Auto-waiting tích hợp + web-first assertions + trace/video sẵn có, giảm mạnh flaky mà không cần tự thêm nhiều wait thủ công", en: "Built-in auto-waiting + web-first assertions + native trace/video, greatly reducing flakiness without many manual waits", ja: "組み込みの自動待機+web-firstアサーション+標準のトレース/動画により、手動待機を多用せずflakyを大幅に減らす" },
      { vi: "Playwright không cần trình duyệt để chạy", en: "Playwright needs no browser to run", ja: "Playwrightはブラウザなしで動く" }
    ],
    answer: 2,
    exp: { vi: "Playwright tích hợp sẵn auto-waiting, web-first assertions (tự thử lại), chạy đa trình duyệt (Chromium/Firefox/WebKit), và công cụ trace/video/codegen. Điều này giảm flaky và công bảo trì so với Selenium thuần vốn thường phải tự quản lý wait và hạ tầng.", en: "Playwright bundles auto-waiting, web-first (auto-retrying) assertions, cross-browser (Chromium/Firefox/WebKit) execution, and trace/video/codegen tooling. This cuts flakiness and maintenance versus plain Selenium, where you often manage waits and infra yourself.", ja: "Playwrightは自動待機・web-first(自動再試行)アサーション・複数ブラウザ(Chromium/Firefox/WebKit)実行・トレース/動画/codegenを内蔵する。待機やインフラを自前で管理しがちな素のSeleniumよりflakyと保守を減らす。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong Playwright, `playwright.config` và projects dùng để làm gì?",
        en: "In Playwright, what are `playwright.config` and projects used for?",
        ja: "Playwrightで`playwright.config`とprojectsは何に使いますか。" },
    options: [
      { vi: "Để lưu mật khẩu người dùng cuối", en: "To store end-user passwords", ja: "エンドユーザーのパスワードを保存する" },
      { vi: "Để viết tài liệu marketing", en: "To write marketing docs", ja: "マーケティング文書を書く" },
      { vi: "Không có tác dụng gì thực tế", en: "They serve no real purpose", ja: "実際の役割はない" },
      { vi: "Cấu hình tập trung (timeout, baseURL, retries, reporter) và định nghĩa 「projects」 để chạy cùng bộ test trên nhiều trình duyệt/thiết bị/môi trường", en: "Centralized config (timeout, baseURL, retries, reporter) and 'projects' to run the same tests across browsers/devices/environments", ja: "集中設定(timeout・baseURL・retries・reporter)と、同じテストを複数のブラウザ/デバイス/環境で実行する「projects」の定義" }
    ],
    answer: 3,
    exp: { vi: "`playwright.config` tập trung thiết lập: baseURL, timeout, số lần retry, reporter, trace/screenshot. 「projects」 cho phép chạy cùng bộ test trên nhiều cấu hình (Chromium/Firefox/WebKit, mobile emulation, môi trường khác nhau) mà không lặp code.", en: "`playwright.config` centralizes settings: baseURL, timeout, retries, reporter, trace/screenshot. 'projects' let you run the same suite across configurations (Chromium/Firefox/WebKit, mobile emulation, different environments) without duplicating code.", ja: "`playwright.config`は設定(baseURL・timeout・retries・reporter・トレース/スクショ)を集中管理する。「projects」は同じスイートを複数構成(Chromium/Firefox/WebKit・モバイルエミュレーション・異なる環境)でコード重複なく実行できる。" } },

  { cat: "iv-playwright",
    q: { vi: "`page.route()` trong Playwright cho phép làm gì?",
        en: "What does `page.route()` in Playwright let you do?",
        ja: "Playwrightの`page.route()`で何ができますか。" },
    options: [
      { vi: "Chặn/giả lập (mock) request mạng: trả dữ liệu giả, chặn tài nguyên, mô phỏng lỗi API để test độc lập với backend", en: "Intercept/mock network requests: return fake data, block resources, simulate API errors to test independently of the backend", ja: "ネットワーク要求を横取り/モック: 偽データを返す・リソースを遮断・APIエラーを模擬し、バックエンドに依存せずテストする" },
      { vi: "Tự động vẽ sơ đồ đường đi (routing) của xe", en: "Automatically draw car routing maps", ja: "車のルート地図を自動描画する" },
      { vi: "Đổi màu nền trang web", en: "Change the web page background color", ja: "ウェブページの背景色を変える" },
      { vi: "Tăng RAM cho trình duyệt", en: "Increase the browser's RAM", ja: "ブラウザのRAMを増やす" }
    ],
    answer: 0,
    exp: { vi: "`page.route()` cho phép chặn và can thiệp request mạng: fulfill (trả response giả), abort (chặn), hoặc continue (chỉnh sửa). Rất hữu ích để test frontend độc lập với backend, mô phỏng lỗi/độ trễ, và làm test nhanh, ổn định.", en: "`page.route()` intercepts network requests: fulfill (return a fake response), abort (block), or continue (modify). It is very useful to test the frontend independently of the backend, simulate errors/latency, and make tests fast and stable.", ja: "`page.route()`はネットワーク要求を横取りする: fulfill(偽レスポンス)・abort(遮断)・continue(改変)。バックエンドに依存せずフロントをテストし、エラー/遅延を模擬し、テストを高速・安定にするのに有用である。" } },

  { cat: "iv-playwright",
    q: { vi: "Cách nào giúp bộ test Playwright chạy NHANH hơn trên CI mà vẫn giữ độ ổn định?",
        en: "Which approach makes a Playwright suite run FASTER on CI while staying stable?",
        ja: "安定性を保ちつつPlaywrightスイートをCIでより速く走らせる方法はどれですか。" },
    options: [
      { vi: "Thêm thật nhiều `waitForTimeout` cố định vào mọi bước", en: "Add many fixed `waitForTimeout` calls to every step", ja: "全ステップに多数の固定`waitForTimeout`を追加する" },
      { vi: "Chạy song song (workers) + chia shard trên nhiều máy, tận dụng cách ly context để test độc lập", en: "Run in parallel (workers) + shard across machines, leveraging context isolation for independent tests", ja: "並列実行(workers)+複数マシンへのshard分割を行い、コンテキスト分離で独立したテストを活かす" },
      { vi: "Gộp tất cả test vào một file khổng lồ chạy tuần tự", en: "Merge all tests into one giant file run sequentially", ja: "全テストを1つの巨大ファイルに統合し逐次実行する" },
      { vi: "Tắt hết assertion để test kết thúc sớm", en: "Disable all assertions so tests finish early", ja: "全アサーションを無効にしてテストを早く終える" }
    ],
    answer: 1,
    exp: { vi: "Playwright chạy song song bằng workers và hỗ trợ sharding (chia bộ test cho nhiều máy CI). Vì mỗi test có context riêng (cách ly trạng thái), chúng chạy song song an toàn. Đây là cách tăng tốc đúng; thêm sleep cố định thì chậm và vẫn flaky.", en: "Playwright parallelizes with workers and supports sharding (splitting the suite across CI machines). Because each test has its own context (isolated state), they parallelize safely. That is the right speedup; adding fixed sleeps is slow and still flaky.", ja: "Playwrightはworkersで並列化し、sharding(スイートを複数CIマシンへ分割)に対応する。各テストは独自コンテキスト(状態分離)を持つため安全に並列化できる。これが正しい高速化で、固定sleepの追加は遅くflakyのままである。" } },

  { cat: "iv-playwright",
    q: { vi: "`npx playwright codegen` giúp gì cho người mới viết test?",
        en: "How does `npx playwright codegen` help newcomers writing tests?",
        ja: "`npx playwright codegen`はテストを書き始める人にどう役立ちますか。" },
    options: [
      { vi: "Nó tự deploy ứng dụng lên production", en: "It auto-deploys the app to production", ja: "アプリを本番へ自動デプロイする" },
      { vi: "Nó xóa các test cũ", en: "It deletes old tests", ja: "古いテストを削除する" },
      { vi: "Nó ghi lại thao tác của bạn trên trình duyệt và sinh mã test kèm locator đề xuất (getByRole...), giúp học cú pháp & dựng khung test nhanh", en: "It records your browser actions and generates test code with suggested locators (getByRole...), helping learn syntax and scaffold tests quickly", ja: "ブラウザ操作を記録し、推奨ロケーター(getByRoleなど)付きのテストコードを生成し、文法学習とテストの土台作りを速める" },
      { vi: "Nó chỉ dùng để nén video", en: "It is only for compressing videos", ja: "動画圧縮専用である" }
    ],
    answer: 2,
    exp: { vi: "codegen mở trình duyệt, ghi lại tương tác của bạn và sinh mã Playwright kèm locator hướng người dùng gợi ý. Nó giúp người mới học cú pháp, dựng nhanh khung test — nhưng nên rà lại, đặt tên rõ và thêm assertion thay vì dùng nguyên bản.", en: "codegen opens a browser, records your interactions and generates Playwright code with suggested user-facing locators. It helps newcomers learn syntax and scaffold tests quickly — but you should review, rename clearly and add assertions rather than use it verbatim.", ja: "codegenはブラウザを開いて操作を記録し、推奨の利用者志向ロケーター付きPlaywrightコードを生成する。初心者の文法学習と土台作りを速めるが、そのまま使わずレビュー・明確な命名・アサーション追加をすべきである。" } },

  // ===================== iv-ai (5) — answers: 3,0,1,2,3 =====================
  { cat: "iv-ai",
    q: { vi: "Khi AI đề xuất một bộ test case, vì sao tester vẫn phải rà soát thủ công?",
        en: "When AI proposes a set of test cases, why must a tester still review them manually?",
        ja: "AIがテストケース群を提案しても、テスターが手動でレビューすべきなのはなぜですか。" },
    options: [
      { vi: "Vì AI luôn viết test dài hơn cần thiết", en: "Because AI always writes longer tests than needed", ja: "AIは常に必要以上に長いテストを書くから" },
      { vi: "Vì AI không thể tạo văn bản tiếng Việt", en: "Because AI cannot produce Vietnamese text", ja: "AIは日本語/ベトナム語を生成できないから" },
      { vi: "Vì rà soát là bắt buộc về mặt pháp lý ở mọi quốc gia", en: "Because review is legally mandatory in every country", ja: "レビューは全ての国で法的に義務だから" },
      { vi: "Vì AI có thể 「bịa」 (hallucinate), hiểu sai yêu cầu, bỏ sót ca biên/nghiệp vụ đặc thù, hoặc tạo kỳ vọng sai — cần con người kiểm chứng theo đặc tả", en: "Because AI may hallucinate, misread requirements, miss boundary/domain-specific cases, or set wrong expectations — a human must verify against the spec", ja: "AIは幻覚・要件の誤読・境界/業務固有ケースの見落とし・誤った期待値を生み得るため、人が仕様と照合して検証する必要があるから" }
    ],
    answer: 3,
    exp: { vi: "AI là trợ lý phác thảo tốt nhưng có thể bịa, hiểu sai ngữ cảnh nghiệp vụ, bỏ sót ca biên hoặc đặt kết quả mong đợi sai. Tester phải đối chiếu đặc tả, loại ca sai, bổ sung ca thiếu — giữ vai trò kiểm chứng và chịu trách nhiệm cuối.", en: "AI is a good drafting aid but may hallucinate, misjudge business context, miss boundary cases, or set wrong expected results. The tester must cross-check the spec, drop wrong cases, add missing ones — remaining the verifier and accountable party.", ja: "AIは草案作成の良い補助だが、幻覚・業務文脈の誤解・境界ケースの見落とし・誤った期待結果を生み得る。テスターは仕様と照合し、誤ケースを除き、不足を補い、検証者かつ最終責任者であり続けねばならない。" } },

  { cat: "iv-ai",
    q: { vi: "Kiểm thử giao diện bằng AI (visual/AI-based visual testing) giúp phát hiện loại vấn đề nào tốt hơn so với assertion văn bản thuần?",
        en: "AI-based visual testing is better at detecting which kind of issue than plain text assertions?",
        ja: "AIによるビジュアルテストは、単純なテキストアサーションよりどの種類の問題の検出に優れますか。" },
    options: [
      { vi: "Sai lệch hiển thị: layout vỡ, phần tử chồng lắp, lệch màu/khoảng cách, khác biệt render giữa trình duyệt", en: "Rendering issues: broken layout, overlapping elements, color/spacing drift, cross-browser rendering differences", ja: "表示の不具合: レイアウト崩れ・要素の重なり・色/間隔のずれ・ブラウザ間のレンダリング差" },
      { vi: "Lỗi logic tính thuế trong cơ sở dữ liệu", en: "Tax-calculation logic errors in the database", ja: "データベース内の税計算ロジックの誤り" },
      { vi: "Rò rỉ bộ nhớ phía máy chủ", en: "Server-side memory leaks", ja: "サーバー側のメモリリーク" },
      { vi: "Lỗi cú pháp SQL", en: "SQL syntax errors", ja: "SQL構文エラー" }
    ],
    answer: 0,
    exp: { vi: "Visual testing (thường kèm AI để bỏ qua khác biệt nhỏ vô hại) so sánh ảnh giao diện để bắt lỗi hiển thị mà assertion văn bản khó thấy: layout vỡ, chồng lắp, lệch màu/khoảng cách, khác biệt render. Nó bổ sung chứ không thay assertion chức năng.", en: "Visual testing (often with AI to ignore harmless small diffs) compares UI snapshots to catch rendering issues text assertions miss: broken layout, overlaps, color/spacing drift, render differences. It complements, not replaces, functional assertions.", ja: "ビジュアルテスト(無害な微差を無視するためAIを併用しがち)はUIスナップショットを比較し、テキストアサーションが見逃す表示不具合(レイアウト崩れ・重なり・色/間隔のずれ・レンダリング差)を捉える。機能アサーションを補完し置き換えない。" } },

  { cat: "iv-ai",
    q: { vi: "AI có thể giúp xử lý 「flaky test」 bằng cách nào là hợp lý nhất?",
        en: "What is the most reasonable way AI can help deal with flaky tests?",
        ja: "flakyテストへの対処にAIを使う最も妥当な方法はどれですか。" },
    options: [
      { vi: "Tự động xóa mọi test flaky khỏi bộ test", en: "Automatically delete every flaky test from the suite", ja: "flakyテストをスイートから自動的に全削除する" },
      { vi: "Phân tích lịch sử chạy để phát hiện mẫu bất ổn, phân loại nguyên nhân (timing, dữ liệu, môi trường) và gợi ý điểm cần sửa — để con người quyết định", en: "Analyze run history to detect instability patterns, classify root causes (timing, data, environment) and suggest fixes — for humans to decide", ja: "実行履歴を分析して不安定パターンを検出し、根本原因(タイミング・データ・環境)を分類し、修正点を提案する — 判断は人が行う" },
      { vi: "Ẩn kết quả flaky để báo cáo luôn xanh", en: "Hide flaky results so the report is always green", ja: "flaky結果を隠して常に緑にする" },
      { vi: "Chạy lại vô hạn cho tới khi pass", en: "Rerun infinitely until it passes", ja: "合格するまで無限に再実行する" }
    ],
    answer: 1,
    exp: { vi: "AI hữu ích khi phân tích dữ liệu chạy lịch sử: nhận diện test hay dao động, gom nhóm nguyên nhân (đồng bộ thời gian, dữ liệu chia sẻ, môi trường) và đề xuất hướng sửa. Quyết định cuối vẫn là con người; xóa/ẩn test chỉ che giấu rủi ro.", en: "AI is useful for analyzing historical run data: identifying unstable tests, clustering root causes (timing sync, shared data, environment) and suggesting fixes. Humans decide finally; deleting/hiding tests only conceals risk.", ja: "AIは実行履歴の分析に有用で、不安定なテストを特定し、根本原因(タイミング同期・共有データ・環境)を分類し、修正方針を提案する。最終判断は人が行い、削除/隠蔽はリスクを隠すだけである。" } },

  { cat: "iv-ai",
    q: { vi: "Khi viết prompt cho AI để sinh ca kiểm thử chất lượng, cách làm nào hiệu quả nhất?",
        en: "When prompting AI to generate quality test cases, which approach works best?",
        ja: "質の高いテストケースをAIに生成させるプロンプトで、最も効果的なやり方はどれですか。" },
    options: [
      { vi: "Chỉ gõ 「viết test đi」 không kèm ngữ cảnh", en: "Just type 'write tests' with no context", ja: "文脈なしで「テストを書いて」とだけ入力する" },
      { vi: "Yêu cầu AI tự đoán mọi yêu cầu nghiệp vụ", en: "Ask AI to guess all business requirements", ja: "全ての業務要件をAIに推測させる" },
      { vi: "Cung cấp ngữ cảnh rõ (yêu cầu, tiêu chí chấp nhận, ràng buộc), nêu rõ cần ca biên/âm, định dạng đầu ra mong muốn, rồi tester rà soát & tinh chỉnh", en: "Provide clear context (requirements, acceptance criteria, constraints), explicitly ask for boundary/negative cases and desired output format, then the tester reviews & refines", ja: "明確な文脈(要件・受け入れ基準・制約)を与え、境界/異常系と希望する出力形式を明示し、その後テスターがレビュー・調整する" },
      { vi: "Không nên đưa bất kỳ thông tin gì cho AI vì lý do bảo mật tuyệt đối", en: "Never give AI any information at all for absolute security", ja: "絶対的なセキュリティのためAIに一切情報を与えない" }
    ],
    answer: 2,
    exp: { vi: "Prompt tốt cung cấp ngữ cảnh cụ thể (yêu cầu, tiêu chí chấp nhận, ràng buộc), yêu cầu rõ loại ca (biên, âm, ngoại lệ) và định dạng đầu ra. Vẫn phải tránh dán dữ liệu nhạy cảm/PII thật, và tester rà soát lại kết quả. Mơ hồ quá thì output kém.", en: "A good prompt gives concrete context (requirements, acceptance criteria, constraints), explicitly requests case types (boundary, negative, exception) and output format. Still avoid pasting sensitive/real PII, and the tester reviews the output. Too vague yields poor results.", ja: "良いプロンプトは具体的な文脈(要件・受け入れ基準・制約)を与え、ケース種別(境界・異常・例外)と出力形式を明示する。機微/実PIIの貼り付けは避け、テスターが出力をレビューする。曖昧すぎると質が下がる。" } },

  { cat: "iv-ai",
    q: { vi: "Giới hạn cốt lõi khiến AI CHƯA thể thay thế hoàn toàn tester con người là gì?",
        en: "What is a core limitation preventing AI from fully replacing human testers?",
        ja: "AIが人間のテスターを完全には置き換えられない本質的な限界は何ですか。" },
    options: [
      { vi: "AI không gõ phím được", en: "AI cannot type on a keyboard", ja: "AIはキーボード入力ができない" },
      { vi: "AI thiếu 「test oracle」 đáng tin về đúng/sai nghiệp vụ, hạn chế hiểu ngữ cảnh/ý định người dùng, và không chịu trách nhiệm — cần phán đoán, đạo đức và tư duy phản biện của con người", en: "AI lacks a reliable business-truth 'oracle', has limited grasp of context/user intent, and bears no accountability — human judgment, ethics and critical thinking are needed", ja: "AIは業務上の正誤を判断する信頼できる「オラクル」を欠き、文脈/利用者意図の理解が限定的で、責任を負わない — 人の判断・倫理・批判的思考が必要" },
      { vi: "AI chỉ chạy vào ban đêm", en: "AI only runs at night", ja: "AIは夜間しか動かない" },
      { vi: "AI không đọc được tiếng Anh", en: "AI cannot read English", ja: "AIは英語を読めない" }
    ],
    answer: 1,
    exp: { vi: "AI tăng tốc nhiều việc, nhưng thiếu nguồn xác định đúng/sai nghiệp vụ (oracle) đáng tin, hiểu hạn chế về ý định người dùng và bối cảnh rủi ro, và không chịu trách nhiệm pháp lý/đạo đức. Tester con người vẫn cần cho phán đoán, ưu tiên rủi ro và kiểm chứng cuối.", en: "AI accelerates much work but lacks a reliable business-truth oracle, has limited understanding of user intent and risk context, and bears no legal/ethical accountability. Human testers remain essential for judgment, risk prioritization and final verification.", ja: "AIは多くの作業を速めるが、信頼できる業務正誤のオラクルを欠き、利用者意図やリスク文脈の理解が限定的で、法的/倫理的責任を負わない。判断・リスク優先付け・最終検証には人間のテスターが依然不可欠である。" } },
];
