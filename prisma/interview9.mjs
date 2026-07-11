// ============================================================================
// INTERVIEW9 — Bổ sung đợt: 6 câu / danh mục phỏng vấn = 24 câu.
// Danh mục: iv-manual, iv-automation, iv-playwright, iv-ai.
// Định dạng: { cat, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật, katakana cho thuật ngữ).
// ============================================================================
export const DATA = [
  // ===================== iv-manual (6) — answers: 0,1,2,3,0,1 =====================
  { cat: "iv-manual",
    q: { vi: "Kỹ thuật thiết kế ca kiểm thử nào chia đầu vào thành các nhóm mà mọi giá trị trong nhóm được xem là xử lý giống nhau?",
        en: "Which test design technique splits inputs into groups where all values in a group are expected to be handled the same way?",
        ja: "入力を、同じグループ内の全ての値が同じように処理されると想定するグループに分割するテスト設計技法はどれですか。" },
    options: [
      { vi: "Phân vùng tương đương (equivalence partitioning)", en: "Equivalence partitioning", ja: "同値分割(equivalence partitioning)" },
      { vi: "Kiểm thử bảng quyết định (decision table)", en: "Decision table testing", ja: "デシジョンテーブルテスト" },
      { vi: "Kiểm thử chuyển trạng thái (state transition)", en: "State transition testing", ja: "状態遷移テスト" },
      { vi: "Đoán lỗi (error guessing)", en: "Error guessing", ja: "エラー推測" }
    ],
    answer: 0,
    exp: { vi: "Phân vùng tương đương gom các đầu vào cho ra hành vi giống nhau vào một lớp, rồi chỉ chọn một đại diện mỗi lớp để giảm số ca test mà vẫn giữ độ phủ. Thường đi kèm phân tích giá trị biên.", en: "Equivalence partitioning groups inputs that produce the same behaviour into one class and tests one representative per class, cutting the number of cases while keeping coverage. It usually pairs with boundary value analysis.", ja: "同値分割は同じ振る舞いになる入力を1つのクラスにまとめ、各クラスの代表値だけをテストして、網羅性を保ちながらケース数を減らす。通常は境界値分析と併用する。" } },

  { cat: "iv-manual",
    q: { vi: "Phỏng vấn hỏi: 「Sự khác nhau giữa verification và validation」. Đáp án đúng nhất?",
        en: "Interviewer: what is the difference between verification and validation?",
        ja: "面接: ベリフィケーションとバリデーションの違いは何ですか。" },
    options: [
      { vi: "Cả hai đều chỉ là chạy test trên môi trường production", en: "Both just mean running tests in production", ja: "どちらも本番環境でテストを実行することを指す" },
      { vi: "Verification: 「Ta có xây đúng cách không?」 (đối chiếu tài liệu/tiêu chuẩn, review); Validation: 「Ta có xây đúng sản phẩm không?」 (đáp ứng nhu cầu người dùng, thường qua chạy thực)", en: "Verification: 'Are we building it right?' (against docs/standards, reviews); Validation: 'Are we building the right thing?' (meets user needs, often by execution)", ja: "ベリフィケーション:「正しく作っているか」(仕様/標準との照合・レビュー)、バリデーション:「正しいものを作っているか」(利用者のニーズを満たすか、多くは実行で確認)" },
      { vi: "Verification chỉ do khách hàng làm, validation do dev làm", en: "Verification is done only by the customer, validation only by devs", ja: "ベリフィケーションは顧客のみ、バリデーションは開発者のみが行う" },
      { vi: "Hai từ hoàn toàn đồng nghĩa", en: "The two terms are exact synonyms", ja: "2つの用語は完全な同義語である" }
    ],
    answer: 1,
    exp: { vi: "Verification kiểm tra sản phẩm có được xây theo đúng đặc tả/tiêu chuẩn không (review, kiểm tra tĩnh) — 「build it right」. Validation kiểm tra sản phẩm có đáp ứng nhu cầu thực của người dùng không (thường qua chạy động) — 「build the right thing」.", en: "Verification checks the product is built to spec/standards (reviews, static checks) — 'build it right'. Validation checks it meets real user needs (usually via dynamic execution) — 'build the right thing'.", ja: "ベリフィケーションは製品が仕様/標準どおりに作られているか(レビュー・静的検査)を確認する=「正しく作る」。バリデーションは実利用者のニーズを満たすか(通常は動的実行)を確認する=「正しいものを作る」。" } },

  { cat: "iv-manual",
    q: { vi: "Khi nào NÊN dừng kiểm thử (exit criteria) một cách hợp lý?",
        en: "When is it reasonable to stop testing (exit criteria)?",
        ja: "テストを合理的に終了(終了基準)してよいのはいつですか。" },
    options: [
      { vi: "Ngay khi tìm thấy bug đầu tiên", en: "As soon as the first bug is found", ja: "最初のバグを見つけた瞬間" },
      { vi: "Khi tester cảm thấy mệt", en: "When the tester feels tired", ja: "テスターが疲れたと感じたとき" },
      { vi: "Khi đạt tiêu chí đã thỏa thuận: độ phủ yêu cầu/mã, tỉ lệ pass, mức rủi ro còn lại chấp nhận được, hết thời gian/ngân sách theo kế hoạch", en: "When agreed criteria are met: requirement/code coverage, pass rate, acceptable residual risk, planned time/budget reached", ja: "合意した基準を満たしたとき: 要件/コードの網羅率・合格率・許容できる残存リスク・計画した時間/予算に到達" },
      { vi: "Khi không còn bug nào trong sản phẩm (đảm bảo 100%)", en: "When there are zero bugs left (100% guaranteed)", ja: "製品にバグが1つも残っていないとき(100%保証)" }
    ],
    answer: 2,
    exp: { vi: "Không thể chứng minh 「không còn bug」 (nghịch lý thuốc trừ sâu & bất khả kiểm thử toàn diện). Ta dừng khi đạt exit criteria đã định: độ phủ, tỉ lệ pass, rủi ro còn lại chấp nhận được, và ràng buộc thời gian/ngân sách.", en: "You cannot prove 'zero bugs' (exhaustive testing is impossible). You stop when defined exit criteria are met: coverage, pass rate, acceptable residual risk, and time/budget constraints.", ja: "「バグゼロ」は証明できない(全数テストは不可能)。定めた終了基準—網羅率・合格率・許容できる残存リスク・時間/予算の制約—を満たしたときに終了する。" } },

  { cat: "iv-manual",
    q: { vi: "Độ ưu tiên (priority) và mức nghiêm trọng (severity) của một defect khác nhau thế nào?",
        en: "How do a defect's priority and severity differ?",
        ja: "欠陥の優先度(priority)と重大度(severity)はどう違いますか。" },
    options: [
      { vi: "Chúng luôn bằng nhau", en: "They are always equal", ja: "常に等しい" },
      { vi: "Severity do khách hàng đặt, priority do máy tính đặt", en: "Severity is set by the customer, priority by the computer", ja: "重大度は顧客が、優先度はコンピュータが設定する" },
      { vi: "Priority là mức ảnh hưởng kỹ thuật, severity là thứ tự sửa", en: "Priority is technical impact; severity is the fix order", ja: "優先度は技術的影響、重大度は修正順序である" },
      { vi: "Severity = mức tác động kỹ thuật của lỗi lên hệ thống; priority = mức khẩn cần sửa theo góc nhìn nghiệp vụ/khách hàng", en: "Severity = technical impact on the system; priority = business/customer urgency to fix", ja: "重大度=不具合がシステムに与える技術的影響、優先度=業務/顧客視点での修正の緊急度" }
    ],
    answer: 3,
    exp: { vi: "Severity phản ánh tác động kỹ thuật (crash, mất dữ liệu…). Priority phản ánh mức khẩn theo nghiệp vụ. Có lỗi severity cao nhưng priority thấp (crash ở màn ít dùng) và ngược lại (lỗi chính tả trên logo: severity thấp, priority cao).", en: "Severity reflects technical impact (crash, data loss…). Priority reflects business urgency. A bug can be high severity but low priority (crash on a rarely used screen) and vice versa (typo on the logo: low severity, high priority).", ja: "重大度は技術的影響(クラッシュ・データ損失など)を、優先度は業務上の緊急度を表す。重大度が高くても優先度が低い場合(ほとんど使わない画面のクラッシュ)や、その逆(ロゴの誤字: 重大度は低いが優先度は高い)もある。" } },

  { cat: "iv-manual",
    q: { vi: "Nguyên tắc kiểm thử 「dồn cụm khiếm khuyết」 (defect clustering) nói điều gì?",
        en: "What does the 'defect clustering' testing principle state?",
        ja: "テスト原則「欠陥の偏在(defect clustering)」は何を述べていますか。" },
    options: [
      { vi: "Một số ít mô-đun thường chứa phần lớn khiếm khuyết — nên tập trung test vào các vùng rủi ro/phức tạp", en: "A small number of modules usually contain most defects — focus testing on risky/complex areas", ja: "少数のモジュールに大半の欠陥が集中する—リスクの高い/複雑な領域にテストを集中すべき" },
      { vi: "Khiếm khuyết phân bố đều tuyệt đối trên mọi mô-đun", en: "Defects are perfectly evenly spread across all modules", ja: "欠陥は全モジュールに完全に均等に分布する" },
      { vi: "Mỗi khiếm khuyết luôn kéo theo đúng 5 khiếm khuyết khác", en: "Each defect always triggers exactly five others", ja: "各欠陥は必ず他に5つの欠陥を引き起こす" },
      { vi: "Không thể dự đoán nơi nào nhiều lỗi", en: "You can never predict where more bugs are", ja: "どこにバグが多いかは決して予測できない" }
    ],
    answer: 0,
    exp: { vi: "Theo nguyên tắc Pareto trong kiểm thử, phần lớn khiếm khuyết dồn ở số ít mô-đun (do phức tạp, hay đổi, tích hợp nhiều). Nhận diện các cụm này giúp phân bổ nỗ lực test hiệu quả hơn.", en: "By a Pareto-like principle, most defects cluster in a few modules (complex, frequently changed, heavily integrated). Spotting these clusters lets you allocate test effort more effectively.", ja: "パレート的な原則により、大半の欠陥は少数のモジュール(複雑・頻繁に変更・統合が多い)に偏る。この偏りを見つけることでテスト工数をより効果的に配分できる。" } },

  { cat: "iv-manual",
    q: { vi: "Kiểm thử thăm dò (exploratory testing) phù hợp nhất trong tình huống nào?",
        en: "When is exploratory testing most appropriate?",
        ja: "探索的テスト(exploratory testing)が最も適しているのはどんな場面ですか。" },
    options: [
      { vi: "Khi cần chạy lại hàng nghìn ca giống hệt mỗi đêm", en: "When rerunning thousands of identical cases every night", ja: "毎晩、同一のケースを数千件再実行する必要があるとき" },
      { vi: "Khi tài liệu thiếu/thay đổi nhanh, cần học nhanh về sản phẩm và phát hiện lỗi mà kịch bản cứng bỏ sót — thiết kế và thực thi test đồng thời", en: "When docs are thin/fast-changing and you must learn the product quickly and find issues that scripted cases miss — designing and executing tests at the same time", ja: "仕様が乏しい/変化が速く、製品を素早く理解し、定型ケースが見逃す不具合を見つける必要があるとき—テスト設計と実行を同時に行う" },
      { vi: "Chỉ khi hoàn toàn không được nhìn giao diện", en: "Only when you cannot see the UI at all", ja: "UIをまったく見られないときだけ" },
      { vi: "Chỉ dùng để đo hiệu năng dưới tải lớn", en: "Only to measure performance under heavy load", ja: "高負荷下の性能測定だけに使う" }
    ],
    answer: 1,
    exp: { vi: "Exploratory testing để tester đồng thời học, thiết kế và chạy test dựa trên quan sát tức thời. Rất hữu ích khi tài liệu thiếu, thời gian gấp, hoặc cần tìm lỗi bất ngờ mà kịch bản định sẵn khó bắt. Thường kèm 「session-based」 và ghi chú để truy vết.", en: "Exploratory testing lets the tester learn, design and execute simultaneously from real-time observations. It shines when docs are scarce, time is short, or you need to surface surprising bugs that scripted cases miss. Often run session-based with notes for traceability.", ja: "探索的テストはテスターがリアルタイムの観察から学習・設計・実行を同時に行う。仕様が乏しい・時間が限られる・定型ケースが見逃す想定外のバグを見つけたいときに有効。追跡のためセッションベースで記録しながら行うことが多い。" } },

  // ===================== iv-automation (6) — answers: 2,3,0,1,2,3 =====================
  { cat: "iv-automation",
    q: { vi: "Mô hình 「kim tự tháp kiểm thử」 (test pyramid) khuyên tỉ lệ như thế nào?",
        en: "What ratio does the 'test pyramid' model recommend?",
        ja: "「テストピラミッド」モデルはどのような比率を推奨しますか。" },
    options: [
      { vi: "Nhiều test UI end-to-end nhất, ít unit test nhất", en: "Most end-to-end UI tests, fewest unit tests", ja: "エンドツーエンドのUIテストが最多、ユニットテストが最少" },
      { vi: "Chỉ cần test thủ công, không cần tự động", en: "Only manual tests, no automation", ja: "手動テストだけで自動化は不要" },
      { vi: "Nhiều unit test (nền, nhanh & rẻ) nhất, ít hơn là integration, ít nhất là E2E/UI (chậm, giòn)", en: "Most unit tests (fast & cheap base), fewer integration, fewest E2E/UI (slow, brittle)", ja: "ユニットテストが最多(高速で安価な土台)、その上に統合テスト、最上部のE2E/UIが最少(低速で壊れやすい)" },
      { vi: "Chia đều tuyệt đối 3 tầng bằng nhau", en: "Split all three layers perfectly equally", ja: "3層を完全に均等に分ける" }
    ],
    answer: 2,
    exp: { vi: "Kim tự tháp: nền là nhiều unit test (nhanh, rẻ, ổn định), giữa là integration vừa phải, đỉnh là ít E2E/UI (chậm, dễ giòn, tốn bảo trì). Tỉ lệ này giữ phản hồi nhanh và chi phí bảo trì thấp.", en: "The pyramid: a wide base of many unit tests (fast, cheap, stable), a smaller integration layer, and a narrow top of few E2E/UI tests (slow, brittle, costly to maintain). This keeps feedback fast and maintenance low.", ja: "ピラミッドは、土台に多数のユニットテスト(高速・安価・安定)、中間に適度な統合テスト、頂点に少数のE2E/UIテスト(低速・壊れやすい・保守コスト大)を置く。これによりフィードバックが速く保守コストが低く保たれる。" } },

  { cat: "iv-automation",
    q: { vi: "「Flaky test」 (test chập chờn) là gì và tại sao nguy hiểm?",
        en: "What is a 'flaky test' and why is it dangerous?",
        ja: "「フレーキーテスト(不安定なテスト)」とは何で、なぜ危険ですか。" },
    options: [
      { vi: "Test luôn luôn fail nên dễ nhận biết", en: "A test that always fails, so it's easy to spot", ja: "常に失敗するので見つけやすいテスト" },
      { vi: "Test chỉ chạy trên máy sếp", en: "A test that only runs on the boss's machine", ja: "上司のPCでしか動かないテスト" },
      { vi: "Test đo tốc độ mạng", en: "A test that measures network speed", ja: "ネットワーク速度を測るテスト" },
      { vi: "Test cho kết quả pass/fail không ổn định dù mã và môi trường không đổi — làm mất niềm tin, che lỗi thật và tốn công điều tra", en: "A test whose pass/fail result is unstable even though code and environment are unchanged — it erodes trust, hides real bugs and wastes triage time", ja: "コードも環境も変わらないのに合否が不安定になるテスト—信頼を損ない、本物のバグを隠し、調査工数を浪費する" }
    ],
    answer: 3,
    exp: { vi: "Flaky test pass rồi fail ngẫu nhiên (do timing, chờ cứng, phụ thuộc thứ tự, dữ liệu chia sẻ, tài nguyên bên ngoài). Nó khiến đội mất niềm tin vào bộ test, dễ 「bỏ qua」 fail thật. Cách chữa: chờ theo điều kiện, cô lập dữ liệu, loại phụ thuộc ngoài, cô lập & sửa hoặc cách ly.", en: "A flaky test passes then fails randomly (timing, hard waits, order dependence, shared data, external resources). It destroys trust in the suite and makes teams ignore real failures. Fixes: condition-based waits, isolated data, remove external dependencies, quarantine and fix.", ja: "フレーキーテストはタイミング・固定待機・実行順序依存・共有データ・外部リソースなどでランダムに合否が変わる。スイートへの信頼を壊し、本物の失敗を無視させる。対策は条件待機・データの分離・外部依存の排除・隔離して修正。" } },

  { cat: "iv-automation",
    q: { vi: "Mẫu thiết kế 「Page Object Model」 (POM) giúp gì cho tự động hóa UI?",
        en: "How does the Page Object Model (POM) help UI automation?",
        ja: "「ページオブジェクトモデル(POM)」はUI自動化に何をもたらしますか。" },
    options: [
      { vi: "Tách locator & hành vi trang vào lớp riêng để test dễ đọc, dùng lại và khi UI đổi chỉ sửa một nơi", en: "Encapsulates locators & page behaviour in classes so tests are readable, reusable, and UI changes touch one place", ja: "ロケータとページ操作をクラスにカプセル化し、テストを読みやすく再利用可能にし、UI変更時の修正箇所を1か所に集約する" },
      { vi: "Làm test chạy nhanh gấp 10 lần bất kể máy", en: "Makes tests run 10× faster on any machine", ja: "どのマシンでもテストを10倍速くする" },
      { vi: "Tự động sinh dữ liệu test ngẫu nhiên", en: "Auto-generates random test data", ja: "ランダムなテストデータを自動生成する" },
      { vi: "Thay thế hoàn toàn nhu cầu viết assertion", en: "Removes the need for assertions entirely", ja: "アサーションを書く必要を完全になくす" }
    ],
    answer: 0,
    exp: { vi: "POM gói selector và thao tác của từng trang vào một lớp/đối tượng. Test gọi phương thức nghiệp vụ (login(user,pass)) thay vì thao tác selector trực tiếp. Khi UI đổi, chỉ sửa page object — giảm trùng lặp và chi phí bảo trì.", en: "POM wraps a page's selectors and actions in a class/object. Tests call business methods (login(user,pass)) instead of raw selectors. When the UI changes, only the page object changes — cutting duplication and maintenance.", ja: "POMはページのセレクタと操作をクラス/オブジェクトにまとめる。テストは生のセレクタではなく業務メソッド(login(user,pass))を呼ぶ。UIが変わってもページオブジェクトだけ直せばよく、重複と保守コストを減らせる。" } },

  { cat: "iv-automation",
    q: { vi: "Trong CI/CD, khi nào nên chạy bộ test tự động?",
        en: "In CI/CD, when should the automated test suite run?",
        ja: "CI/CDにおいて、自動テストスイートはいつ実行すべきですか。" },
    options: [
      { vi: "Chỉ chạy một lần trước khi phát hành lớn, mỗi năm", en: "Only once before a big yearly release", ja: "年1回の大型リリース前に一度だけ" },
      { vi: "Tự động ở mỗi commit/pull request (và trước khi merge/deploy) để phát hiện hồi quy sớm, phản hồi nhanh cho dev", en: "Automatically on every commit/pull request (and before merge/deploy) to catch regressions early with fast feedback", ja: "各コミット/プルリクエスト時(およびマージ/デプロイ前)に自動実行し、リグレッションを早期に検出して開発者へ素早くフィードバックする" },
      { vi: "Chỉ khi khách hàng phàn nàn", en: "Only when a customer complains", ja: "顧客が苦情を言ったときだけ" },
      { vi: "Không bao giờ, vì tốn tài nguyên máy chủ", en: "Never, because it uses server resources", ja: "サーバーリソースを消費するので決して実行しない" }
    ],
    answer: 1,
    exp: { vi: "Giá trị của CI là phản hồi nhanh: chạy test tự động ở mỗi commit/PR (unit/integration nhanh), và bộ E2E/hồi quy trước merge/deploy. Phát hiện lỗi càng sớm càng rẻ; pipeline fail sẽ chặn code hỏng vào nhánh chính.", en: "CI's value is fast feedback: run automated tests on every commit/PR (fast unit/integration) and the E2E/regression suite before merge/deploy. The earlier a bug is caught the cheaper it is; a failing pipeline blocks broken code from the main branch.", ja: "CIの価値は素早いフィードバック: 各コミット/PRで自動テスト(高速なユニット/統合)を、マージ/デプロイ前にE2E/リグレッションスイートを実行する。バグは早く見つけるほど安く、失敗したパイプラインは壊れたコードのメインブランチ流入を防ぐ。" } },

  { cat: "iv-automation",
    q: { vi: "Vì sao KHÔNG nên dùng 「sleep」 cố định (hard-coded wait) để chờ phần tử trong test tự động?",
        en: "Why should you avoid fixed sleeps (hard-coded waits) when waiting for elements in automation?",
        ja: "自動テストで要素を待つとき、固定のsleep(ハードコードされた待機)を避けるべきなのはなぜですか。" },
    options: [
      { vi: "Vì sleep cố định làm test vừa chậm (chờ dư) vừa giòn (chờ thiếu khi mạng chậm) — nên dùng chờ theo điều kiện (explicit/auto wait)", en: "Because fixed sleeps make tests both slow (over-wait) and brittle (under-wait on slow networks) — use condition-based (explicit/auto) waits instead", ja: "固定sleepはテストを遅く(待ちすぎ)し、かつ壊れやすく(低速回線で待ち不足)するため—条件ベース(明示的/自動)待機を使うべき" },
      { vi: "Vì sleep chỉ hoạt động trên Windows", en: "Because sleep only works on Windows", ja: "sleepはWindowsでしか動かないから" },
      { vi: "Vì sleep xóa cookie của trình duyệt", en: "Because sleep deletes browser cookies", ja: "sleepがブラウザのCookieを削除するから" },
      { vi: "Vì sleep làm assertion luôn pass", en: "Because sleep makes assertions always pass", ja: "sleepはアサーションを常に成功させるから" }
    ],
    answer: 0,
    exp: { vi: "Hard-coded sleep đoán mù thời gian: đặt lớn thì test chậm lê thê, đặt nhỏ thì fail chập chờn khi hệ thống chậm. Chờ theo điều kiện (đợi phần tử hiển thị/clickable, đợi request xong) vừa nhanh vừa ổn định.", en: "A hard-coded sleep blindly guesses timing: too long and tests crawl, too short and they flake when the system is slow. Condition-based waits (element visible/clickable, request settled) are both fast and stable.", ja: "ハードコードのsleepはタイミングを当て推量する。長すぎればテストが遅くなり、短すぎればシステムが遅いときにフレーキーになる。条件ベースの待機(要素の表示/クリック可能、リクエスト完了を待つ)は高速かつ安定する。" } },

  { cat: "iv-automation",
    q: { vi: "Nên dùng loại locator nào để chọn phần tử cho bền vững nhất khi UI thay đổi?",
        en: "Which kind of locator is most robust against UI changes?",
        ja: "UI変更に対して最も壊れにくいロケータはどれですか。" },
    options: [
      { vi: "XPath tuyệt đối dài dựa trên vị trí (/html/body/div[3]/div[2]/...)", en: "A long absolute position-based XPath (/html/body/div[3]/div[2]/...)", ja: "位置に基づく長い絶対XPath(/html/body/div[3]/div[2]/…)" },
      { vi: "Chọn theo màu sắc CSS hiện tại", en: "Selecting by the current CSS colour", ja: "現在のCSSの色で選択する" },
      { vi: "Chỉ số phần tử theo thứ tự xuất hiện trên trang", en: "The element index by order of appearance on the page", ja: "ページ上の出現順による要素インデックス" },
      { vi: "Thuộc tính ổn định do dev chủ động thêm cho test, ví dụ data-testid / role/label có ý nghĩa", en: "A stable attribute intentionally added for tests, e.g. data-testid / a meaningful role/label", ja: "テスト用に意図的に付与した安定属性(例: data-testid や意味のあるrole/label)" }
    ],
    answer: 3,
    exp: { vi: "Locator theo vị trí (absolute XPath, index, kiểu dáng) vỡ ngay khi layout đổi. Thuộc tính chủ đích như data-testid, hoặc vai trò/nhãn có ngữ nghĩa (accessibility) ổn định theo ý định chức năng chứ không theo cấu trúc DOM — bền hơn nhiều.", en: "Position-based locators (absolute XPath, index, styling) break the moment layout changes. Intentional attributes like data-testid, or semantic role/label (accessibility) locators, track the functional intent rather than DOM structure — far more robust.", ja: "位置ベースのロケータ(絶対XPath・インデックス・スタイル)はレイアウトが変わった瞬間に壊れる。data-testidのような意図的な属性や、意味的なrole/label(アクセシビリティ)ロケータはDOM構造ではなく機能的な意図を追うため、はるかに壊れにくい。" } },

  // ===================== iv-playwright (6) — answers: 0,1,2,3,0,1 =====================
  { cat: "iv-playwright",
    q: { vi: "Điều gì làm cho các assertion 「web-first」 của Playwright (expect(locator).toBeVisible()...) ổn định hơn?",
        en: "What makes Playwright's web-first assertions (expect(locator).toBeVisible()...) more stable?",
        ja: "Playwrightの「web-first」アサーション(expect(locator).toBeVisible()…)が安定しているのはなぜですか。" },
    options: [
      { vi: "Chúng tự động chờ và thử lại cho tới khi điều kiện đúng hoặc hết timeout — giảm flaky do timing", en: "They auto-wait and retry until the condition is met or a timeout — reducing timing flakiness", ja: "条件が満たされるかタイムアウトまで自動的に待機・再試行し、タイミング起因のフレーキーを減らす" },
      { vi: "Chúng tắt hoàn toàn JavaScript của trang", en: "They fully disable the page's JavaScript", ja: "ページのJavaScriptを完全に無効化する" },
      { vi: "Chúng chỉ chạy trên Chromium", en: "They only run on Chromium", ja: "Chromiumでのみ動作する" },
      { vi: "Chúng bỏ qua mọi lỗi và luôn báo pass", en: "They ignore all errors and always pass", ja: "全てのエラーを無視して常に成功する" }
    ],
    answer: 0,
    exp: { vi: "Assertion web-first của Playwright lặp lại phép kiểm cho tới khi thỏa hoặc quá timeout, thay vì chụp một lần rồi so. Nhờ vậy tránh phải sleep thủ công và giảm mạnh flaky do UI cập nhật bất đồng bộ.", en: "Playwright's web-first assertions retry the check until it passes or times out, instead of sampling once. This removes manual sleeps and greatly reduces flakiness from async UI updates.", ja: "Playwrightのweb-firstアサーションは一度だけ判定するのではなく、成功するかタイムアウトするまで判定を再試行する。これにより手動sleepが不要になり、非同期なUI更新によるフレーキーを大幅に減らせる。" } },

  { cat: "iv-playwright",
    q: { vi: "Cơ chế 「auto-waiting」 của Playwright hoạt động thế nào khi click một nút?",
        en: "How does Playwright's auto-waiting behave when clicking a button?",
        ja: "ボタンをクリックする際、Playwrightの「auto-waiting(自動待機)」はどう動作しますか。" },
    options: [
      { vi: "Click ngay lập tức dù phần tử chưa tồn tại", en: "Clicks immediately even if the element does not exist yet", ja: "要素がまだ存在しなくても即座にクリックする" },
      { vi: "Trước khi click, tự chờ phần tử gắn vào DOM, hiển thị, ổn định (hết animation), enabled và nhận được sự kiện — nếu không đạt trong timeout thì fail", en: "Before clicking, it waits for the element to be attached, visible, stable (no animation), enabled and able to receive events — failing if not met within the timeout", ja: "クリック前に、要素がDOMに接続され・表示され・安定(アニメーション終了)し・有効で・イベントを受け取れる状態になるのを待ち、タイムアウト内に満たさなければ失敗する" },
      { vi: "Luôn chờ đúng 5 giây rồi click bất kể trạng thái", en: "Always waits exactly 5 seconds then clicks regardless of state", ja: "状態に関係なく必ず5秒待ってからクリックする" },
      { vi: "Chỉ click nếu chuột người dùng thật di chuyển", en: "Only clicks if a real user's mouse moves", ja: "実際のユーザーのマウスが動いた場合のみクリックする" }
    ],
    answer: 1,
    exp: { vi: "Trước mỗi hành động, Playwright kiểm một loạt điều kiện 「actionability」: phần tử attached, visible, stable, enabled, không bị che. Nó chờ tự động tới khi đạt hoặc hết timeout. Nhờ vậy phần lớn thao tác không cần wait thủ công.", en: "Before each action Playwright checks a set of actionability conditions: attached, visible, stable, enabled, not obscured. It auto-waits until they hold or the timeout expires, so most interactions need no manual waits.", ja: "各アクションの前にPlaywrightは一連のアクショナビリティ条件(接続済み・表示・安定・有効・隠れていない)を確認し、満たされるかタイムアウトまで自動的に待つ。そのため大半の操作で手動待機は不要になる。" } },

  { cat: "iv-playwright",
    q: { vi: "Vì sao Playwright khuyến nghị dùng locator theo vai trò như page.getByRole('button', { name: 'Đăng nhập' })?",
        en: "Why does Playwright recommend role-based locators like page.getByRole('button', { name: 'Login' })?",
        ja: "Playwrightが page.getByRole('button', { name: 'Login' }) のようなロールベースロケータを推奨するのはなぜですか。" },
    options: [
      { vi: "Vì nó nhanh hơn CSS 100 lần", en: "Because it is 100× faster than CSS", ja: "CSSより100倍速いから" },
      { vi: "Vì nó chọn phần tử theo cách người dùng & công nghệ trợ năng cảm nhận (role + accessible name) — bền với đổi cấu trúc và khuyến khích UI accessible", en: "Because it selects elements the way users & assistive tech perceive them (role + accessible name) — resilient to structural changes and encourages accessible UI", ja: "ユーザーや支援技術が認識する方法(ロール+アクセシブル名)で要素を選ぶため—構造変更に強く、アクセシブルなUIを促す" },
      { vi: "Vì nó bỏ qua phần tử ẩn tự động", en: "Because it automatically ignores hidden elements only", ja: "非表示要素だけを自動的に無視するから" },
      { vi: "Vì nó chỉ hoạt động với tiếng Anh", en: "Because it only works with English", ja: "英語でしか機能しないから" }
    ],
    answer: 1,
    exp: { vi: "getByRole gắn với ngữ nghĩa accessibility (role + tên) — thứ ít đổi hơn class/DOM và phản ánh cách người dùng thật tương tác. Test do đó dễ đọc, bền hơn, đồng thời thúc đẩy đội xây UI có accessibility tốt.", en: "getByRole targets accessibility semantics (role + name), which change less than classes/DOM and reflect how real users interact. Tests become more readable and robust, and it nudges the team toward accessible UI.", ja: "getByRoleはアクセシビリティの意味(ロール+名前)を対象にする。これはクラスやDOMより変わりにくく、実際のユーザーの操作を反映する。テストは読みやすく壊れにくくなり、アクセシブルなUI作りも促す。" } },

  { cat: "iv-playwright",
    q: { vi: "Công cụ 「trace viewer」 của Playwright dùng để làm gì?",
        en: "What is Playwright's trace viewer used for?",
        ja: "Playwrightの「トレースビューア」は何のために使いますか。" },
    options: [
      { vi: "Chỉnh sửa mã nguồn ứng dụng trực tiếp", en: "Editing the application source code directly", ja: "アプリのソースコードを直接編集する" },
      { vi: "Đo băng thông internet", en: "Measuring internet bandwidth", ja: "インターネット帯域を測定する" },
      { vi: "Xem lại từng bước một lần chạy test: ảnh chụp DOM theo thời gian, hành động, log console/network — để gỡ lỗi (đặc biệt trên CI) mà không cần chạy lại", en: "Replaying a test run step by step: timeline DOM snapshots, actions, console/network logs — to debug (especially on CI) without rerunning", ja: "テスト実行を段階的に再生する: タイムライン上のDOMスナップショット・操作・コンソール/ネットワークログを見て、再実行せずに(特にCIで)デバッグする" },
      { vi: "Tự động sửa test bị fail", en: "Automatically fixing failed tests", ja: "失敗したテストを自動修正する" }
    ],
    answer: 2,
    exp: { vi: "Trace viewer ghi lại toàn bộ lần chạy: ảnh DOM tại mỗi bước, hành động, network, console, source. Khi test fail (nhất là trên CI khó tái hiện), mở trace để 「tua lại」 và tìm nguyên nhân mà không phải chạy lại nhiều lần.", en: "The trace viewer records the whole run: DOM snapshots per step, actions, network, console, source. When a test fails (especially on hard-to-reproduce CI), open the trace to replay and find the cause without repeated reruns.", ja: "トレースビューアは実行全体(各ステップのDOMスナップショット・操作・ネットワーク・コンソール・ソース)を記録する。テストが失敗したとき(特に再現しにくいCI上で)、トレースを開いて再生し、何度も再実行せずに原因を特定できる。" } },

  { cat: "iv-playwright",
    q: { vi: "Cách nào phù hợp để cô lập một test khỏi backend thật khi cần kết quả API xác định trong Playwright?",
        en: "What's a suitable way to isolate a Playwright test from the real backend when you need deterministic API results?",
        ja: "Playwrightで決定的なAPI結果が必要なとき、実バックエンドからテストを分離する適切な方法はどれですか。" },
    options: [
      { vi: "Sửa mã production để trả dữ liệu giả", en: "Editing production code to return fake data", ja: "本番コードを改変して偽データを返す" },
      { vi: "Dùng page.route()/request interception để chặn và trả phản hồi giả (mock) cho endpoint cần thiết", en: "Using page.route()/request interception to stub and return mocked responses for the needed endpoints", ja: "page.route()/リクエストインターセプトで必要なエンドポイントをスタブ化し、モック応答を返す" },
      { vi: "Tắt Wi-Fi trong lúc test chạy", en: "Turning off Wi-Fi during the test run", ja: "テスト実行中にWi-Fiを切る" },
      { vi: "Chờ ngẫu nhiên rồi hy vọng dữ liệu đúng", en: "Waiting randomly and hoping data is right", ja: "ランダムに待って正しいデータを期待する" }
    ],
    answer: 1,
    exp: { vi: "page.route() cho phép chặn request mạng và trả về phản hồi mock ổn định, giúp test độc lập với trạng thái backend, chạy nhanh và xác định. Hữu ích để mô phỏng lỗi (500, timeout) và các trường hợp biên khó tạo bằng dữ liệu thật.", en: "page.route() lets you intercept network requests and return stable mocked responses, making tests independent of backend state, fast and deterministic. It's great for simulating errors (500, timeouts) and edge cases hard to reproduce with real data.", ja: "page.route()はネットワークリクエストを傍受して安定したモック応答を返せるため、テストをバックエンド状態から独立させ、高速かつ決定的にできる。エラー(500・タイムアウト)や実データでは再現しにくい境界ケースの模擬にも有用。" } },

  { cat: "iv-playwright",
    q: { vi: "Trong Playwright, cách hiệu quả để nhiều test dùng chung trạng thái đã đăng nhập mà không phải login lại mỗi test?",
        en: "In Playwright, an efficient way for many tests to reuse a logged-in state without logging in each time?",
        ja: "Playwrightで、多数のテストが毎回ログインせずにログイン状態を再利用する効率的な方法は?" },
    options: [
      { vi: "Lưu và tái dùng storageState (cookie + localStorage) sau khi đăng nhập một lần, ví dụ trong global setup", en: "Save and reuse storageState (cookies + localStorage) after logging in once, e.g. in a global setup", ja: "一度ログインした後に storageState(Cookie + localStorage)を保存し、例えばグローバルセットアップで再利用する" },
      { vi: "Ghi mật khẩu vào từng test dưới dạng plaintext và login lại 100 lần", en: "Hard-code the password in every test as plaintext and log in 100 times", ja: "各テストにパスワードを平文で書き込み100回ログインし直す" },
      { vi: "Dùng chung một trình duyệt thật đang mở của người dùng", en: "Share the user's already-open real browser", ja: "ユーザーが開いている実ブラウザを共有する" },
      { vi: "Không thể tái dùng phiên trong Playwright", en: "Sessions cannot be reused in Playwright", ja: "Playwrightではセッションを再利用できない" }
    ],
    answer: 0,
    exp: { vi: "Playwright cho phép đăng nhập một lần rồi lưu storageState (cookie + localStorage) ra file; các test/project sau nạp lại state đó để bắt đầu ở trạng thái đã đăng nhập. Cách này nhanh, ổn định và tách phần xác thực khỏi các kịch bản nghiệp vụ.", en: "Playwright lets you log in once, save storageState (cookies + localStorage) to a file, and have later tests/projects load it to start already authenticated. It's fast, stable and separates auth from business scenarios.", ja: "Playwrightでは一度ログインして storageState(Cookie + localStorage)をファイルに保存し、後続のテスト/プロジェクトがそれを読み込んでログイン済み状態から始められる。高速・安定で、認証を業務シナリオから分離できる。" } },

  // ===================== iv-ai (6) — answers: 2,3,0,1,2,3 =====================
  { cat: "iv-ai",
    q: { vi: "Trong kiểm thử phần mềm, 「AI hallucination」 (ảo giác) nghĩa là gì?",
        en: "In software testing, what does an 'AI hallucination' mean?",
        ja: "ソフトウェアテストにおいて「AIのハルシネーション(幻覚)」とは何を意味しますか。" },
    options: [
      { vi: "Mô hình chạy quá nhanh gây nóng máy", en: "The model running too fast and overheating", ja: "モデルが速く動きすぎて過熱すること" },
      { vi: "Một loại virus trong tập dữ liệu", en: "A kind of virus in the dataset", ja: "データセット内のウイルスの一種" },
      { vi: "Mô hình AI đưa ra thông tin nghe hợp lý nhưng SAI hoặc bịa đặt (ví dụ ca test tham chiếu hàm không tồn tại) — cần kiểm chứng trước khi dùng", en: "The AI producing plausible-sounding but WRONG or fabricated information (e.g. a test case referencing a non-existent function) — must be verified before use", ja: "AIがもっともらしいが誤った、または捏造した情報(例: 存在しない関数を参照するテストケース)を生成すること—使用前に検証が必要" },
      { vi: "AI từ chối trả lời mọi câu hỏi", en: "The AI refusing to answer any question", ja: "AIが全ての質問への回答を拒否すること" }
    ],
    answer: 2,
    exp: { vi: "Hallucination là khi mô hình sinh ra nội dung trông thuyết phục nhưng không đúng thực tế/bịa. Trong QA, AI có thể tạo ca test dựa trên API không tồn tại hay khẳng định sai về hệ thống. Vì vậy đầu ra của AI phải được con người kiểm chứng, không tin tưởng mù quáng.", en: "A hallucination is when the model generates convincing but factually wrong/fabricated content. In QA, AI may invent test cases against non-existent APIs or assert false things about the system. So AI output must be human-verified, not trusted blindly.", ja: "ハルシネーションとは、モデルが説得力はあるが事実と異なる/捏造した内容を生成すること。QAではAIが存在しないAPIに対するテストを作ったり、システムについて誤った断定をしたりする。そのためAIの出力は人が検証すべきで、盲目的に信用してはならない。" } },

  { cat: "iv-ai",
    q: { vi: "Cách dùng AI (LLM) an toàn & hiệu quả để hỗ trợ viết ca kiểm thử là gì?",
        en: "What's a safe, effective way to use an AI (LLM) to help write test cases?",
        ja: "テストケース作成の支援にAI(LLM)を安全かつ効果的に使う方法は?" },
    options: [
      { vi: "Dán toàn bộ dữ liệu khách hàng thật và mật khẩu vào prompt để AI có 「ngữ cảnh đầy đủ」", en: "Paste all real customer data and passwords into the prompt so the AI has 'full context'", ja: "「完全な文脈」のため実顧客データやパスワードを全てプロンプトに貼り付ける" },
      { vi: "Chấp nhận mọi ca test AI sinh ra mà không đọc lại", en: "Accept every AI-generated test without reviewing", ja: "AIが生成した全テストを見直さずに採用する" },
      { vi: "Chỉ dùng AI để đặt tên biến cho đẹp", en: "Use AI only to make variable names prettier", ja: "変数名をきれいにするためだけにAIを使う" },
      { vi: "Dùng AI để phác thảo ca test/dữ liệu biên, cấp ngữ cảnh (đã ẩn danh dữ liệu nhạy cảm), rồi con người rà soát, chỉnh và kiểm chứng trước khi đưa vào bộ test", en: "Use AI to draft cases/edge data, give it context (with sensitive data anonymised), then have a human review, refine and verify before adding to the suite", ja: "AIにケース/境界データの草案を作らせ、機微データを匿名化した文脈を与え、人がレビュー・修正・検証してからスイートに加える" }
    ],
    answer: 3,
    exp: { vi: "AI hữu ích để brainstorm ca test, sinh dữ liệu biên, gợi ý trường hợp bị bỏ sót — nhưng đầu ra có thể sai/ảo giác. Nguyên tắc: không đưa dữ liệu nhạy cảm vào prompt, luôn để con người rà soát & kiểm chứng trước khi tin. AI là trợ lý, không thay thế phán đoán của tester.", en: "AI is useful to brainstorm cases, generate edge data and suggest missed scenarios — but output can be wrong/hallucinated. Rule: never feed sensitive data into prompts, and always have a human review and verify before trusting. AI assists; it doesn't replace tester judgement.", ja: "AIはケースの発想・境界データ生成・見落としシナリオの提案に有用だが、出力は誤り/幻覚の可能性がある。原則は、機微データをプロンプトに入れない、信頼する前に必ず人がレビュー・検証すること。AIは補助であり、テスターの判断を置き換えない。" } },

  { cat: "iv-ai",
    q: { vi: "「Prompt injection」 là rủi ro gì cần lưu ý khi kiểm thử ứng dụng tích hợp LLM?",
        en: "What risk is 'prompt injection' when testing an LLM-integrated application?",
        ja: "LLMを組み込んだアプリをテストする際、「プロンプトインジェクション」とはどんなリスクですか。" },
    options: [
      { vi: "Kẻ tấn công nhúng chỉ dẫn độc hại vào dữ liệu đầu vào để lái mô hình bỏ qua quy tắc, lộ dữ liệu hoặc thực hiện hành động ngoài ý muốn — cần test như một lỗ hổng bảo mật", en: "An attacker embeds malicious instructions in input data to make the model ignore rules, leak data or take unintended actions — must be tested as a security flaw", ja: "攻撃者が入力データに悪意ある指示を埋め込み、モデルにルールを無視させ、データを漏らし、意図しない動作をさせること—セキュリティ欠陥としてテストが必要" },
      { vi: "Việc gõ prompt quá nhanh làm hỏng bàn phím", en: "Typing prompts too fast damaging the keyboard", ja: "プロンプトを速く打ちすぎてキーボードが壊れること" },
      { vi: "Mô hình tự đổi ngôn ngữ giao diện", en: "The model changing the UI language by itself", ja: "モデルがUIの言語を勝手に変えること" },
      { vi: "Một tính năng giúp tăng tốc phản hồi", en: "A feature that speeds up responses", ja: "応答を高速化する機能" }
    ],
    answer: 0,
    exp: { vi: "Prompt injection là khi nội dung do người dùng/bên thứ ba kiểm soát chứa chỉ dẫn khiến LLM chệch khỏi mục đích (bỏ qua chính sách, tiết lộ prompt hệ thống/dữ liệu, gọi công cụ nguy hiểm). Tester cần thiết kế ca kiểm thử bảo mật cho đầu vào đối kháng, kiểm tra ranh giới quyền và lọc đầu ra.", en: "Prompt injection is when user/third-party-controlled content carries instructions that steer the LLM off-purpose (bypass policy, reveal system prompt/data, call dangerous tools). Testers must design security cases for adversarial input, check privilege boundaries and output filtering.", ja: "プロンプトインジェクションとは、ユーザーや第三者が制御するコンテンツにLLMを目的から逸脱させる指示(ポリシー回避・システムプロンプト/データ開示・危険なツール呼び出し)が含まれること。テスターは敵対的入力のセキュリティケースを設計し、権限境界と出力フィルタリングを検証すべき。" } },

  { cat: "iv-ai",
    q: { vi: "Vì sao kiểm thử hệ thống dựa trên AI/ML khó hơn phần mềm 「quy tắc cứng」 truyền thống?",
        en: "Why is testing AI/ML-based systems harder than traditional rule-based software?",
        ja: "AI/MLベースのシステムのテストが、従来のルールベースソフトより難しいのはなぜですか。" },
    options: [
      { vi: "Vì AI không cần điện", en: "Because AI needs no electricity", ja: "AIは電気を必要としないから" },
      { vi: "Vì đầu ra có tính xác suất/không tất định, phụ thuộc dữ liệu huấn luyện, khó có 「một đáp án đúng duy nhất」 — cần đánh giá theo tiêu chí/ngưỡng, tập dữ liệu và giám sát drift", en: "Because outputs are probabilistic/non-deterministic, data-dependent, with no single 'correct answer' — needing metric/threshold-based evaluation, datasets and drift monitoring", ja: "出力が確率的/非決定的で学習データに依存し、唯一の「正解」がないため—指標/しきい値ベースの評価・データセット・ドリフト監視が必要" },
      { vi: "Vì AI luôn cho cùng một kết quả mọi lúc", en: "Because AI always gives the exact same result every time", ja: "AIは常に毎回まったく同じ結果を返すから" },
      { vi: "Vì AI không thể bị lỗi bao giờ", en: "Because AI can never have defects", ja: "AIは決して欠陥を持たないから" }
    ],
    answer: 1,
    exp: { vi: "Hệ thống ML không tất định và phụ thuộc dữ liệu: cùng lớp đầu vào có thể ra kết quả khác nhau, và 「đúng」 thường là phân phối/ngưỡng chứ không phải một giá trị. Vì thế cần đánh giá bằng tập dữ liệu và độ đo (accuracy, precision/recall...), kiểm bias/công bằng, và giám sát 「data/model drift」 theo thời gian.", en: "ML systems are non-deterministic and data-dependent: the same input class can yield different results, and 'correct' is often a distribution/threshold, not one value. So you evaluate with datasets and metrics (accuracy, precision/recall...), check bias/fairness, and monitor data/model drift over time.", ja: "MLシステムは非決定的でデータ依存: 同じ入力クラスでも結果が変わり得て、「正しさ」は単一値ではなく分布/しきい値であることが多い。そのためデータセットと指標(正解率・適合率/再現率など)で評価し、バイアス/公平性を確認し、時間経過に伴うデータ/モデルのドリフトを監視する必要がある。" } },

  { cat: "iv-ai",
    q: { vi: "Khi dùng AI để sinh dữ liệu kiểm thử, thực hành nào giúp giữ chất lượng và tuân thủ?",
        en: "When using AI to generate test data, which practice preserves quality and compliance?",
        ja: "AIでテストデータを生成する際、品質とコンプライアンスを保つ実践はどれですか。" },
    options: [
      { vi: "Dùng thẳng dữ liệu khách hàng thật để 「chân thực」 nhất", en: "Use real customer data directly to be most 'realistic'", ja: "最も「リアル」にするため実顧客データをそのまま使う" },
      { vi: "Sinh dữ liệu tổng hợp/ẩn danh phản ánh phân phối & ràng buộc thực, kiểm tính hợp lệ và tránh dữ liệu cá nhân (PII) — bảo vệ quyền riêng tư", en: "Generate synthetic/anonymised data that reflects real distributions & constraints, validate it, and avoid personal data (PII) — protecting privacy", ja: "実際の分布や制約を反映した合成/匿名化データを生成し、妥当性を検証し、個人情報(PII)を避ける—プライバシーを保護する" },
      { vi: "Bỏ mọi ràng buộc định dạng cho nhanh", en: "Drop all format constraints to be faster", ja: "速さのため全ての形式制約を捨てる" },
      { vi: "Chỉ tạo đúng một bản ghi cho mọi kịch bản", en: "Create exactly one record for every scenario", ja: "全シナリオに対してレコードを1件だけ作る" }
    ],
    answer: 1,
    exp: { vi: "AI có thể sinh dữ liệu tổng hợp đa dạng (bao gồm ca biên) nhanh chóng. Để dùng tốt: giữ đúng phân phối và ràng buộc nghiệp vụ, kiểm tính hợp lệ, và tuyệt đối tránh/ẩn danh PII để tuân thủ quyền riêng tư (GDPR...). Không dùng dữ liệu khách hàng thật trong môi trường test.", en: "AI can quickly generate diverse synthetic data (including edge cases). To do it well: keep realistic distributions and business constraints, validate it, and strictly avoid/anonymise PII for privacy compliance (GDPR...). Don't use real customer data in test environments.", ja: "AIは多様な合成データ(境界ケースを含む)を素早く生成できる。うまく使うには、現実的な分布と業務制約を保ち、妥当性を検証し、プライバシー遵守(GDPRなど)のためPIIを厳格に避ける/匿名化する。テスト環境で実顧客データを使ってはならない。" } },

  { cat: "iv-ai",
    q: { vi: "Khái niệm 「human-in-the-loop」 trong quy trình QA có hỗ trợ AI nghĩa là gì?",
        en: "What does 'human-in-the-loop' mean in an AI-assisted QA process?",
        ja: "AI支援のQAプロセスにおける「human-in-the-loop(人間関与)」とは何を意味しますか。" },
    options: [
      { vi: "Con người bị loại hoàn toàn khỏi quy trình", en: "Humans are entirely removed from the process", ja: "人間がプロセスから完全に排除される" },
      { vi: "AI chỉ được bật vào cuối tuần", en: "AI is only enabled on weekends", ja: "AIは週末だけ有効になる" },
      { vi: "Mọi quyết định do một con người bấm ngẫu nhiên", en: "Every decision is a human pressing buttons randomly", ja: "全ての決定は人がランダムにボタンを押すこと" },
      { vi: "AI hỗ trợ (gợi ý, phân loại, tạo nháp) nhưng con người vẫn rà soát, phê duyệt và chịu trách nhiệm ở các điểm quyết định quan trọng", en: "AI assists (suggests, triages, drafts) but humans still review, approve and stay accountable at key decision points", ja: "AIが支援(提案・トリアージ・草案作成)する一方、重要な意思決定点では人間がレビュー・承認し、責任を持ち続ける" }
    ],
    answer: 3,
    exp: { vi: "Human-in-the-loop nghĩa là AI tăng tốc công việc (đề xuất ca test, phân loại bug, tạo nháp) nhưng con người vẫn kiểm soát: rà soát đầu ra, phê duyệt và chịu trách nhiệm cuối cùng, đặc biệt ở các quyết định rủi ro cao. Điều này cân bằng tốc độ của AI với phán đoán và trách nhiệm của con người.", en: "Human-in-the-loop means AI accelerates the work (suggesting cases, triaging bugs, drafting) while humans retain control: reviewing output, approving, and holding final accountability, especially at high-risk decisions. It balances AI speed with human judgement and responsibility.", ja: "human-in-the-loopとは、AIが作業を加速(ケース提案・バグのトリアージ・草案作成)する一方、人間が制御を保つこと。特にリスクの高い判断で出力をレビューし承認し、最終責任を負う。AIの速さと人間の判断・責任を両立させる。" } }
];
