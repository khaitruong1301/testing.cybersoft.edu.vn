// Interview practice MCQ set 3A — 100 questions (50 iv-manual + 50 iv-automation)
// Tri-lingual: vi (đủ dấu) / en / ja (katakana cho thuật ngữ). Plain ESM objects.

export const DATA = [
  // ================= iv-manual (50) =================
  { cat: "iv-manual",
    q: { vi:"Mục đích chính của một test case là gì?", en:"What is the main purpose of a test case?", ja:"テストケースの主な目的は何ですか？" },
    options: [
      { vi:"Tập hợp bước, dữ liệu đầu vào và kết quả mong đợi để kiểm tra một chức năng", en:"A set of steps, input data and expected results to verify a function", ja:"機能を検証するための手順・入力データ・期待結果のまとまり" },
      { vi:"Danh sách tất cả lỗi đã tìm thấy", en:"A list of all bugs found", ja:"見つかった全バグのリスト" },
      { vi:"Một công cụ để chạy kiểm thử tự động", en:"A tool to run automation", ja:"自動テストを実行するツール" },
      { vi:"Bản báo cáo gửi cho khách hàng", en:"A report delivered to the customer", ja:"顧客に提出するレポート" }
    ],
    answer: 0,
    exp: { vi:"Test case mô tả điều kiện, bước thực hiện, dữ liệu và kết quả mong đợi để xác minh một hành vi cụ thể.", en:"A test case describes preconditions, steps, data and expected result to verify a specific behavior.", ja:"テストケースは特定の動作を検証するための前提条件・手順・データ・期待結果を記述します。" } },

  { cat: "iv-manual",
    q: { vi:"Sự khác nhau cốt lõi giữa Severity và Priority là gì?", en:"What is the core difference between Severity and Priority?", ja:"重大度（Severity）と優先度（Priority）の本質的な違いは何ですか？" },
    options: [
      { vi:"Chúng luôn bằng nhau", en:"They are always equal", ja:"常に等しい" },
      { vi:"Severity do khách hàng đặt, Priority do dev đặt", en:"Severity is set by the customer, Priority by the developer", ja:"重大度は顧客が、優先度は開発者が決める" },
      { vi:"Severity là mức nghiêm trọng kỹ thuật, Priority là mức cấp bách cần sửa", en:"Severity is technical seriousness; Priority is how urgently it must be fixed", ja:"重大度は技術的な深刻さ、優先度は修正の緊急度" },
      { vi:"Severity chỉ dùng cho automation", en:"Severity applies only to automation", ja:"重大度は自動テストにのみ適用される" }
    ],
    answer: 2,
    exp: { vi:"Severity phản ánh tác động kỹ thuật của lỗi; Priority phản ánh mức độ cấp bách sửa theo góc nhìn nghiệp vụ.", en:"Severity reflects the technical impact of a defect; priority reflects the business urgency of fixing it.", ja:"重大度はバグの技術的影響、優先度はビジネス上の修正緊急度を表します。" } },

  { cat: "iv-manual",
    q: { vi:"Sau khi dev đã sửa xong bug, trạng thái thường chuyển sang gì?", en:"After a developer fixes a bug, which status does it usually move to?", ja:"開発者がバグを修正した後、通常どのステータスに変わりますか？" },
    options: [
      { vi:"New", en:"New", ja:"New（新規）" },
      { vi:"Fixed / Ready for retest", en:"Fixed / Ready for retest", ja:"Fixed（修正済み）／再テスト待ち" },
      { vi:"Deferred", en:"Deferred", ja:"Deferred（先送り）" },
      { vi:"Rejected", en:"Rejected", ja:"Rejected（却下）" }
    ],
    answer: 1,
    exp: { vi:"Bug sau khi sửa chuyển sang Fixed và chờ tester retest để xác nhận rồi mới Closed.", en:"A fixed bug moves to Fixed awaiting retest by the tester before it can be closed.", ja:"修正されたバグはFixedになり、テスターの再テストで確認後にクローズされます。" } },

  { cat: "iv-manual",
    q: { vi:"Smoke testing là gì?", en:"What is smoke testing?", ja:"スモークテストとは何ですか？" },
    options: [
      { vi:"Kiểm thử toàn bộ chi tiết mọi chức năng", en:"Testing every function in full detail", ja:"全機能を詳細にテストすること" },
      { vi:"Kiểm thử hiệu năng tải cao", en:"High-load performance testing", ja:"高負荷の性能テスト" },
      { vi:"Kiểm thử bảo mật chuyên sâu", en:"Deep security testing", ja:"詳細なセキュリティテスト" },
      { vi:"Kiểm tra nhanh các chức năng cốt lõi để quyết định build có đáng test sâu không", en:"A quick check of core functions to decide if the build is worth deeper testing", ja:"ビルドが詳細テストに値するか判断するため中核機能を素早く確認すること" }
    ],
    answer: 3,
    exp: { vi:"Smoke test xác nhận build ổn định ở mức cơ bản trước khi bỏ công test chi tiết.", en:"Smoke testing confirms basic build stability before investing in detailed testing.", ja:"スモークテストは詳細テスト前にビルドの基本的な安定性を確認します。" } },

  { cat: "iv-manual",
    q: { vi:"Sanity testing thường được thực hiện khi nào?", en:"When is sanity testing typically performed?", ja:"サニティテストは通常いつ行われますか？" },
    options: [
      { vi:"Sau một thay đổi nhỏ, để xác minh chức năng cụ thể vẫn hoạt động đúng", en:"After a minor change, to verify that a specific function still works", ja:"小さな変更後に、特定機能が正しく動くか確認するため" },
      { vi:"Trước khi viết bất kỳ requirement nào", en:"Before writing any requirement", ja:"要件を書く前" },
      { vi:"Chỉ khi release lên production", en:"Only at production release", ja:"本番リリース時のみ" },
      { vi:"Chỉ trong giai đoạn thiết kế", en:"Only during design phase", ja:"設計フェーズのみ" }
    ],
    answer: 0,
    exp: { vi:"Sanity test là kiểm thử hẹp, sâu vào phần vừa thay đổi để xác nhận sửa lỗi không phá vỡ chức năng liên quan.", en:"Sanity testing is a narrow, focused check on a recently changed area to confirm the fix did not break related behavior.", ja:"サニティテストは変更箇所に絞った確認で、修正が関連機能を壊していないかを見ます。" } },

  { cat: "iv-manual",
    q: { vi:"Với ô nhập chấp nhận số 1 đến 100, boundary value analysis nên test các giá trị nào?", en:"For a field accepting 1 to 100, which values should boundary value analysis test?", ja:"1〜100を受け付ける項目で、境界値分析はどの値をテストすべきですか？" },
    options: [
      { vi:"Chỉ 50", en:"Only 50", ja:"50のみ" },
      { vi:"Chỉ 1 và 100", en:"Only 1 and 100", ja:"1と100のみ" },
      { vi:"0, 1, 100, 101", en:"0, 1, 100, 101", ja:"0, 1, 100, 101" },
      { vi:"Mọi số từ 1 tới 100", en:"Every number from 1 to 100", ja:"1から100までの全数値" }
    ],
    answer: 2,
    exp: { vi:"Boundary value tập trung vào ngay tại và sát ngoài biên: giá trị min-1, min, max, max+1.", en:"Boundary value analysis focuses on values at and just outside limits: min-1, min, max, max+1.", ja:"境界値分析は境界の内外に注目します：最小-1、最小、最大、最大+1。" } },

  { cat: "iv-manual",
    q: { vi:"Mục đích của equivalence partitioning là gì?", en:"What is the purpose of equivalence partitioning?", ja:"同値分割の目的は何ですか？" },
    options: [
      { vi:"Test mọi giá trị đầu vào có thể", en:"Test every possible input value", ja:"あり得る全入力値をテストする" },
      { vi:"Bỏ qua các trường hợp lỗi", en:"Skip error cases", ja:"エラーケースを省く" },
      { vi:"Chỉ dùng cho automation", en:"Use only for automation", ja:"自動テスト専用" },
      { vi:"Chia đầu vào thành nhóm cho kết quả tương đương để giảm số test case", en:"Group inputs that behave the same to reduce the number of test cases", ja:"同じ挙動をする入力をグループ化してテストケース数を減らす" }
    ],
    answer: 3,
    exp: { vi:"Chia miền dữ liệu thành các lớp tương đương và chỉ chọn đại diện mỗi lớp, giảm số test case mà vẫn phủ tốt.", en:"It divides input into equivalent classes and tests a representative of each, reducing cases while keeping coverage.", ja:"入力を同値クラスに分け各代表を選ぶことで、網羅性を保ちつつケース数を削減します。" } },

  { cat: "iv-manual",
    q: { vi:"Regression testing nhằm mục đích gì?", en:"What does regression testing aim to do?", ja:"リグレッションテストの目的は何ですか？" },
    options: [
      { vi:"Chỉ test chức năng mới", en:"Test only new features", ja:"新機能のみをテストする" },
      { vi:"Đảm bảo thay đổi mới không làm hỏng chức năng đang chạy tốt", en:"Ensure new changes did not break existing working features", ja:"新しい変更が既存の正常な機能を壊していないか確認する" },
      { vi:"Đo hiệu năng hệ thống", en:"Measure system performance", ja:"システム性能を測定する" },
      { vi:"Viết lại toàn bộ requirement", en:"Rewrite all requirements", ja:"全要件を書き直す" }
    ],
    answer: 1,
    exp: { vi:"Regression chạy lại các test hiện có để phát hiện tác dụng phụ do thay đổi code gây ra.", en:"Regression re-runs existing tests to catch side effects introduced by code changes.", ja:"リグレッションは既存テストを再実行し、コード変更による副作用を検出します。" } },

  { cat: "iv-manual",
    q: { vi:"Khác biệt giữa Retest và Regression là gì?", en:"What is the difference between retest and regression?", ja:"再テストとリグレッションの違いは何ですか？" },
    options: [
      { vi:"Retest xác nhận đúng một bug đã sửa; Regression kiểm tra các chức năng liên quan không bị ảnh hưởng", en:"Retest confirms a specific fixed bug; regression checks related features are unaffected", ja:"再テストは修正済み特定バグの確認、リグレッションは関連機能への影響確認" },
      { vi:"Hai cái là một", en:"They are identical", ja:"両者は同じ" },
      { vi:"Retest chỉ dùng automation", en:"Retest is automation-only", ja:"再テストは自動のみ" },
      { vi:"Regression chỉ chạy một lần duy nhất", en:"Regression runs only once ever", ja:"リグレッションは一度だけ実行する" }
    ],
    answer: 0,
    exp: { vi:"Retest kiểm tra chính bug đã fix; regression rộng hơn, đảm bảo không phát sinh lỗi mới ở nơi khác.", en:"Retest verifies the exact fixed defect; regression is broader, ensuring no new defects appear elsewhere.", ja:"再テストは修正したバグ自体を確認し、リグレッションはより広く他所での新規不具合を防ぎます。" } },

  { cat: "iv-manual",
    q: { vi:"Giai đoạn đầu tiên trong STLC thường là gì?", en:"What is usually the first phase in STLC?", ja:"STLCの最初のフェーズは通常何ですか？" },
    options: [
      { vi:"Test execution", en:"Test execution", ja:"テスト実行" },
      { vi:"Test closure", en:"Test closure", ja:"テスト終結" },
      { vi:"Requirement analysis", en:"Requirement analysis", ja:"要件分析" },
      { vi:"Defect reporting", en:"Defect reporting", ja:"バグ報告" }
    ],
    answer: 2,
    exp: { vi:"STLC bắt đầu bằng phân tích requirement để hiểu cái cần test trước khi lập kế hoạch và thiết kế.", en:"STLC starts with requirement analysis to understand what to test before planning and design.", ja:"STLCは計画・設計の前に、何をテストするか理解する要件分析から始まります。" } },

  { cat: "iv-manual",
    q: { vi:"Entry criteria trong test là gì?", en:"What are entry criteria in testing?", ja:"テストのエントリー基準（開始条件）とは何ですか？" },
    options: [
      { vi:"Điều kiện để kết thúc kiểm thử", en:"Conditions to stop testing", ja:"テストを終了する条件" },
      { vi:"Điều kiện cần thỏa để bắt đầu một hoạt động kiểm thử", en:"Conditions that must be met to begin a testing activity", ja:"テスト活動を開始するために満たすべき条件" },
      { vi:"Số bug tối đa cho phép", en:"Maximum number of bugs allowed", ja:"許容される最大バグ数" },
      { vi:"Danh sách tester tham gia", en:"List of participating testers", ja:"参加テスターのリスト" }
    ],
    answer: 1,
    exp: { vi:"Entry criteria là các điều kiện tiên quyết (ví dụ môi trường sẵn sàng, test case đã duyệt) để bắt đầu test.", en:"Entry criteria are prerequisites (e.g. environment ready, cases reviewed) required to begin testing.", ja:"エントリー基準はテスト開始に必要な前提条件（環境準備、ケース承認など）です。" } },

  { cat: "iv-manual",
    q: { vi:"Exit criteria giúp xác định điều gì?", en:"What do exit criteria help determine?", ja:"エグジット基準（終了条件）は何を判断するのに役立ちますか？" },
    options: [
      { vi:"Ai viết requirement", en:"Who writes requirements", ja:"誰が要件を書くか" },
      { vi:"Ngôn ngữ lập trình dùng", en:"The programming language used", ja:"使用するプログラミング言語" },
      { vi:"Màu sắc giao diện", en:"UI colors", ja:"UIの色" },
      { vi:"Khi nào có thể dừng kiểm thử một cách hợp lý", en:"When testing can reasonably be stopped", ja:"いつテストを合理的に終了できるか" }
    ],
    answer: 3,
    exp: { vi:"Exit criteria (ví dụ đã đạt độ phủ, không còn bug critical mở) cho biết khi nào đủ điều kiện dừng test.", en:"Exit criteria (e.g. coverage met, no open critical bugs) tell when it is acceptable to stop testing.", ja:"エグジット基準（網羅達成、重大バグ未解決なしなど）はテスト終了可能な時点を示します。" } },

  { cat: "iv-manual",
    q: { vi:"Đặc điểm chính của exploratory testing là gì?", en:"What is a key characteristic of exploratory testing?", ja:"探索的テストの主な特徴は何ですか？" },
    options: [
      { vi:"Phải viết đầy đủ mọi test case trước khi chạy", en:"All test cases must be written before running", ja:"実行前に全テストケースを書く必要がある" },
      { vi:"Chỉ máy thực hiện, không cần người", en:"Done only by machines, no human needed", ja:"人間不要で機械のみが行う" },
      { vi:"Học, thiết kế và thực thi test đồng thời, dựa vào kinh nghiệm tester", en:"Learning, designing and executing tests simultaneously, driven by tester experience", ja:"テスターの経験に基づき、学習・設計・実行を同時に行う" },
      { vi:"Không được phép ghi chép lại gì", en:"No notes may be recorded", ja:"一切記録してはいけない" }
    ],
    answer: 2,
    exp: { vi:"Exploratory testing kết hợp học hệ thống, thiết kế và thực thi trong cùng lúc, tận dụng trực giác và kinh nghiệm.", en:"Exploratory testing blends learning, design and execution at once, leveraging tester intuition and experience.", ja:"探索的テストは学習・設計・実行を同時に行い、テスターの直感と経験を活かします。" } },

  { cat: "iv-manual",
    q: { vi:"Ai thường là người chịu trách nhiệm chính cho Test Plan?", en:"Who is usually primarily responsible for the Test Plan?", ja:"テスト計画書の主な責任者は通常誰ですか？" },
    options: [
      { vi:"Test Lead / Test Manager", en:"Test Lead / Test Manager", ja:"テストリード／テストマネージャー" },
      { vi:"Khách hàng cuối", en:"The end customer", ja:"エンドユーザー" },
      { vi:"Nhân viên kinh doanh", en:"A sales representative", ja:"営業担当者" },
      { vi:"Đội vận hành server", en:"The server operations team", ja:"サーバー運用チーム" }
    ],
    answer: 0,
    exp: { vi:"Test Lead/Manager thường soạn và sở hữu test plan, xác định phạm vi, nguồn lực, lịch và rủi ro.", en:"The Test Lead/Manager typically authors and owns the test plan, defining scope, resources, schedule and risks.", ja:"通常テストリード／マネージャーが計画書を作成・管理し、範囲・資源・日程・リスクを定めます。" } },

  { cat: "iv-manual",
    q: { vi:"Yếu tố nào KHÔNG thể thiếu trong một defect report tốt?", en:"Which element is essential in a good defect report?", ja:"良いバグ報告に不可欠な要素はどれですか？" },
    options: [
      { vi:"Tên thú cưng của tester", en:"The tester's pet name", ja:"テスターのペットの名前" },
      { vi:"Bước tái hiện, kết quả thực tế và kết quả mong đợi", en:"Steps to reproduce, actual result and expected result", ja:"再現手順・実際の結果・期待結果" },
      { vi:"Giá cổ phiếu công ty", en:"The company's stock price", ja:"会社の株価" },
      { vi:"Số điện thoại của dev", en:"The developer's phone number", ja:"開発者の電話番号" }
    ],
    answer: 1,
    exp: { vi:"Report chất lượng cần steps to reproduce rõ, actual vs expected, môi trường và bằng chứng để dev tái hiện nhanh.", en:"A quality report needs clear steps to reproduce, actual vs expected, environment and evidence so devs can reproduce fast.", ja:"良い報告には明確な再現手順、実際と期待、環境、証跡が必要で、開発者が素早く再現できます。" } },

  { cat: "iv-manual",
    q: { vi:"Ví dụ nào là High Severity nhưng Low Priority?", en:"Which is an example of High Severity but Low Priority?", ja:"高重大度だが低優先度の例はどれですか？" },
    options: [
      { vi:"Nút Đăng nhập chính bị sai màu", en:"The main Login button has the wrong color", ja:"メインのログインボタンの色が間違っている" },
      { vi:"Lỗi chính tả ở tiêu đề trang chủ", en:"A typo in the homepage title", ja:"トップページ見出しの誤字" },
      { vi:"Thanh toán chậm 1 giây", en:"Payment is 1 second slow", ja:"決済が1秒遅い" },
      { vi:"Ứng dụng crash ở màn hình admin hiếm dùng, sắp bị gỡ bỏ", en:"App crashes on a rarely-used admin screen scheduled for removal", ja:"まもなく削除予定の稀に使う管理画面でクラッシュする" }
    ],
    answer: 3,
    exp: { vi:"Crash là severity cao, nhưng nếu ở màn hình sắp gỡ và ít dùng thì priority sửa lại thấp.", en:"A crash is high severity, but on a rarely-used screen slated for removal the fix priority is low.", ja:"クラッシュは高重大度ですが、削除予定で稀に使う画面なら修正優先度は低くなります。" } },

  { cat: "iv-manual",
    q: { vi:"Ví dụ nào là Low Severity nhưng High Priority?", en:"Which is an example of Low Severity but High Priority?", ja:"低重大度だが高優先度の例はどれですか？" },
    options: [
      { vi:"Toàn bộ hệ thống sập không ai truy cập được", en:"The whole system is down, no one can access", ja:"システム全体がダウンし誰もアクセスできない" },
      { vi:"Một trang ẩn nội bộ bị lỗi hiếm gặp", en:"A hidden internal page has a rare error", ja:"隠れた内部ページの稀なエラー" },
      { vi:"Sai chính tả tên công ty trên logo trang chủ trước ngày ra mắt", en:"Company name misspelled on the homepage logo right before launch", ja:"公開直前のトップページのロゴで社名が誤字" },
      { vi:"Lỗi tính toán sai số tiền lớn", en:"A calculation error producing wrong large amounts", ja:"大きな金額を誤る計算エラー" }
    ],
    answer: 2,
    exp: { vi:"Lỗi chính tả là severity thấp nhưng nếu ảnh hưởng thương hiệu ngay trước ra mắt thì priority rất cao.", en:"A typo is low severity, but if it hits branding right before launch its priority is very high.", ja:"誤字は低重大度ですが、公開直前でブランドに影響するなら優先度は非常に高くなります。" } },

  { cat: "iv-manual",
    q: { vi:"Verification khác Validation ở điểm nào?", en:"How does verification differ from validation?", ja:"検証（Verification）と妥当性確認（Validation）はどう違いますか？" },
    options: [
      { vi:"Verification: 'xây đúng cách không?'; Validation: 'xây đúng sản phẩm không?'", en:"Verification: 'are we building it right?'; Validation: 'are we building the right thing?'", ja:"検証は「正しく作っているか」、妥当性確認は「正しいものを作っているか」" },
      { vi:"Cả hai giống hệt nhau", en:"They are exactly the same", ja:"両者はまったく同じ" },
      { vi:"Verification chỉ làm ở production", en:"Verification is done only in production", ja:"検証は本番でのみ行う" },
      { vi:"Validation không cần khách hàng", en:"Validation never involves the customer", ja:"妥当性確認に顧客は関与しない" }
    ],
    answer: 0,
    exp: { vi:"Verification kiểm tra sản phẩm có đúng đặc tả/quy trình; validation kiểm tra sản phẩm có đáp ứng nhu cầu người dùng.", en:"Verification checks conformance to specs/process; validation checks the product meets user needs.", ja:"検証は仕様・プロセスへの適合、妥当性確認は利用者ニーズの充足を確認します。" } },

  { cat: "iv-manual",
    q: { vi:"Static testing khác dynamic testing ở chỗ nào?", en:"How does static testing differ from dynamic testing?", ja:"静的テストと動的テストの違いは何ですか？" },
    options: [
      { vi:"Static testing luôn cần chạy code", en:"Static testing always executes the code", ja:"静的テストは常にコードを実行する" },
      { vi:"Dynamic testing chỉ đọc tài liệu", en:"Dynamic testing only reviews documents", ja:"動的テストは文書レビューのみ" },
      { vi:"Cả hai đều không chạy code", en:"Neither executes code", ja:"どちらもコードを実行しない" },
      { vi:"Static không chạy code (review, phân tích); dynamic chạy code để quan sát hành vi", en:"Static does not run code (review, analysis); dynamic runs code to observe behavior", ja:"静的はコードを実行せず（レビュー・分析）、動的は実行して挙動を観察する" }
    ],
    answer: 3,
    exp: { vi:"Static testing gồm review, walkthrough, phân tích tĩnh; dynamic testing thực thi phần mềm để kiểm tra hành vi.", en:"Static testing includes reviews, walkthroughs and static analysis; dynamic testing executes the software to check behavior.", ja:"静的テストはレビューや静的解析、動的テストはソフトを実行して挙動を確認します。" } },

  { cat: "iv-manual",
    q: { vi:"Positive testing và negative testing khác nhau thế nào?", en:"How do positive and negative testing differ?", ja:"正常系テストと異常系テストはどう違いますか？" },
    options: [
      { vi:"Không khác gì nhau", en:"There is no difference", ja:"違いはない" },
      { vi:"Positive dùng dữ liệu hợp lệ để xác nhận hoạt động đúng; negative dùng dữ liệu không hợp lệ để kiểm tra xử lý lỗi", en:"Positive uses valid data to confirm it works; negative uses invalid data to check error handling", ja:"正常系は有効データで正しく動くか、異常系は無効データでエラー処理を確認する" },
      { vi:"Negative testing chỉ dùng cho báo cáo", en:"Negative testing is only for reporting", ja:"異常系テストは報告専用" },
      { vi:"Positive testing chỉ dành cho automation", en:"Positive testing is automation-only", ja:"正常系テストは自動専用" }
    ],
    answer: 1,
    exp: { vi:"Positive kiểm tra hệ thống chạy đúng với input hợp lệ; negative đảm bảo hệ thống xử lý an toàn với input sai/biên.", en:"Positive checks correct behavior with valid input; negative ensures safe handling of invalid or edge input.", ja:"正常系は有効入力での正しい動作、異常系は無効・境界入力の安全な処理を確認します。" } },

  { cat: "iv-manual",
    q: { vi:"Requirement Traceability Matrix (RTM) dùng để làm gì?", en:"What is a Requirement Traceability Matrix (RTM) used for?", ja:"要件トレーサビリティマトリクス（RTM）は何に使いますか？" },
    options: [
      { vi:"Ánh xạ requirement với test case để đảm bảo mọi yêu cầu đều được phủ", en:"Map requirements to test cases to ensure every requirement is covered", ja:"要件とテストケースを対応付け、全要件が網羅されるようにする" },
      { vi:"Lưu mật khẩu người dùng", en:"Store user passwords", ja:"ユーザーパスワードを保存する" },
      { vi:"Tự động sửa bug", en:"Automatically fix bugs", ja:"バグを自動修正する" },
      { vi:"Đo tốc độ mạng", en:"Measure network speed", ja:"ネットワーク速度を測る" }
    ],
    answer: 0,
    exp: { vi:"RTM liên kết requirement với test case (và bug) để chứng minh độ phủ và phát hiện yêu cầu bị bỏ sót.", en:"An RTM links requirements to test cases (and defects) to prove coverage and reveal missed requirements.", ja:"RTMは要件とテストケース（やバグ）を結び付け、網羅を証明し漏れを発見します。" } },

  { cat: "iv-manual",
    q: { vi:"Test scenario khác test case như thế nào?", en:"How does a test scenario differ from a test case?", ja:"テストシナリオとテストケースはどう違いますか？" },
    options: [
      { vi:"Test scenario chi tiết hơn test case", en:"A test scenario is more detailed than a test case", ja:"テストシナリオはテストケースより詳細" },
      { vi:"Chúng hoàn toàn giống nhau", en:"They are completely identical", ja:"完全に同じ" },
      { vi:"Test scenario mô tả 'cái gì cần test' ở mức cao; test case mô tả 'test như thế nào' chi tiết", en:"A scenario describes 'what to test' at a high level; a test case describes 'how to test' in detail", ja:"シナリオは高レベルで「何をテストするか」、ケースは詳細に「どうテストするか」を示す" },
      { vi:"Test case không cần kết quả mong đợi", en:"A test case needs no expected result", ja:"テストケースに期待結果は不要" }
    ],
    answer: 2,
    exp: { vi:"Scenario là mô tả cấp cao của một tình huống cần kiểm thử; test case triển khai scenario thành bước cụ thể có dữ liệu và expected result.", en:"A scenario is a high-level statement of what to test; a test case breaks it into concrete steps with data and expected results.", ja:"シナリオは高レベルの検証対象、ケースはそれを具体手順・データ・期待結果に落とし込みます。" } },

  { cat: "iv-manual",
    q: { vi:"Defect leakage nghĩa là gì?", en:"What does defect leakage mean?", ja:"バグ流出（defect leakage）とは何を意味しますか？" },
    options: [
      { vi:"Số bug được tự động sửa", en:"Number of auto-fixed bugs", ja:"自動修正されたバグ数" },
      { vi:"Bug lọt qua một giai đoạn test và bị phát hiện ở giai đoạn sau hoặc bởi người dùng", en:"Bugs that slip past a testing stage and are found later or by users", ja:"あるテスト段階をすり抜け、後工程やユーザーに発見されるバグ" },
      { vi:"Bug bị trùng lặp", en:"Duplicate bugs", ja:"重複したバグ" },
      { vi:"Số bug được đóng đúng hạn", en:"Bugs closed on time", ja:"期限内にクローズされたバグ" }
    ],
    answer: 1,
    exp: { vi:"Defect leakage đo lượng lỗi lọt xuống giai đoạn sau (đặc biệt production), phản ánh hiệu quả của khâu test trước.", en:"Defect leakage measures defects that escape to a later stage (especially production), reflecting earlier test effectiveness.", ja:"バグ流出は後工程（特に本番）へ漏れたバグ量で、前段テストの有効性を示します。" } },

  { cat: "iv-manual",
    q: { vi:"Defect density được tính như thế nào?", en:"How is defect density calculated?", ja:"バグ密度（defect density）はどう計算しますか？" },
    options: [
      { vi:"Tổng số tester chia số bug", en:"Number of testers divided by bugs", ja:"テスター数をバグ数で割る" },
      { vi:"Số bug nhân số ngày", en:"Bugs multiplied by days", ja:"バグ数×日数" },
      { vi:"Số test case chia số requirement", en:"Test cases divided by requirements", ja:"テストケース数÷要件数" },
      { vi:"Số defect chia cho kích thước module (ví dụ KLOC hoặc số chức năng)", en:"Number of defects divided by size of module (e.g. KLOC or function points)", ja:"バグ数をモジュール規模（KLOCや機能点など）で割る" }
    ],
    answer: 3,
    exp: { vi:"Defect density = số lỗi / đơn vị kích thước (KLOC, function point), giúp so sánh chất lượng giữa các module.", en:"Defect density = defects / size unit (KLOC, function points), useful to compare quality across modules.", ja:"バグ密度＝バグ数／規模単位（KLOCなど）で、モジュール間の品質比較に役立ちます。" } },

  { cat: "iv-manual",
    q: { vi:"Vì sao chuẩn bị test data tốt lại quan trọng?", en:"Why is good test data preparation important?", ja:"良いテストデータ準備がなぜ重要ですか？" },
    options: [
      { vi:"Để làm cho báo cáo dài hơn", en:"To make reports longer", ja:"レポートを長くするため" },
      { vi:"Để tránh phải viết test case", en:"To avoid writing test cases", ja:"テストケース作成を避けるため" },
      { vi:"Dữ liệu phù hợp giúp phủ các trường hợp hợp lệ, không hợp lệ và biên, cho kết quả tin cậy", en:"Proper data covers valid, invalid and boundary cases, giving reliable results", ja:"適切なデータで有効・無効・境界を網羅し、信頼できる結果を得るため" },
      { vi:"Chỉ để làm đẹp giao diện", en:"Only to beautify the UI", ja:"UIを美しくするためだけ" }
    ],
    answer: 2,
    exp: { vi:"Test data đúng và đa dạng giúp kiểm thử phủ nhiều tình huống thật, tránh bỏ sót lỗi và cho kết quả đáng tin.", en:"Correct, varied test data covers realistic situations, avoids missed defects and yields trustworthy results.", ja:"正確で多様なテストデータは現実的状況を網羅し、見逃しを防ぎ信頼できる結果を生みます。" } },

  { cat: "iv-manual",
    q: { vi:"Yếu tố nào hợp lý nhất để quyết định KHI NÀO dừng kiểm thử?", en:"Which is the most reasonable factor to decide WHEN to stop testing?", ja:"テストを「いつ止めるか」を決める最も妥当な要素はどれですか？" },
    options: [
      { vi:"Đạt exit criteria đã thống nhất (độ phủ, mật độ lỗi, rủi ro chấp nhận được)", en:"Meeting agreed exit criteria (coverage, defect rate, acceptable risk)", ja:"合意したエグジット基準（網羅・バグ率・許容リスク）を満たすこと" },
      { vi:"Khi tester thấy mệt", en:"When the tester feels tired", ja:"テスターが疲れたとき" },
      { vi:"Khi hết cà phê", en:"When the coffee runs out", ja:"コーヒーが切れたとき" },
      { vi:"Khi tìm được đúng 1 bug", en:"After finding exactly one bug", ja:"バグを1つ見つけたとき" }
    ],
    answer: 0,
    exp: { vi:"Dừng test dựa trên exit criteria khách quan như độ phủ, tỷ lệ lỗi còn lại, mức rủi ro chấp nhận được và deadline.", en:"Stopping should follow objective exit criteria like coverage, remaining defect rate, acceptable risk and deadlines.", ja:"停止は網羅・残存バグ率・許容リスク・締切などの客観的エグジット基準に従います。" } },

  { cat: "iv-manual",
    q: { vi:"Alpha testing khác beta testing ở điểm nào?", en:"How does alpha testing differ from beta testing?", ja:"アルファテストとベータテストはどう違いますか？" },
    options: [
      { vi:"Alpha do khách hàng ngoài làm, beta do nội bộ làm", en:"Alpha is done by external customers, beta internally", ja:"アルファは外部顧客、ベータは社内で行う" },
      { vi:"Cả hai đều diễn ra sau khi release chính thức", en:"Both happen after official release", ja:"両方とも正式リリース後に行う" },
      { vi:"Alpha không cần môi trường test", en:"Alpha needs no test environment", ja:"アルファにテスト環境は不要" },
      { vi:"Alpha do nội bộ tại nhà sản xuất; beta do người dùng thật ngoài môi trường thực trước khi phát hành rộng", en:"Alpha is internal at the developer site; beta is by real users in real environments before wide release", ja:"アルファは開発元社内、ベータは広範リリース前に実ユーザーが実環境で行う" }
    ],
    answer: 3,
    exp: { vi:"Alpha thực hiện nội bộ trước khi giao cho người dùng ngoài; beta để người dùng thật trải nghiệm và phản hồi trước GA.", en:"Alpha is internal before handing to outsiders; beta lets real users try and feedback before general availability.", ja:"アルファは社内、ベータは一般公開前に実ユーザーが試用・フィードバックします。" } },

  { cat: "iv-manual",
    q: { vi:"Mục tiêu chính của User Acceptance Testing (UAT) là gì?", en:"What is the main goal of User Acceptance Testing (UAT)?", ja:"ユーザー受け入れテスト（UAT）の主な目的は何ですか？" },
    options: [
      { vi:"Đo tốc độ CPU", en:"Measure CPU speed", ja:"CPU速度を測る" },
      { vi:"Xác nhận hệ thống đáp ứng nhu cầu nghiệp vụ và người dùng chấp nhận sử dụng", en:"Confirm the system meets business needs and users accept it", ja:"システムが業務ニーズを満たしユーザーが受け入れられるか確認する" },
      { vi:"Kiểm tra cú pháp code", en:"Check code syntax", ja:"コードの構文を確認する" },
      { vi:"Tối ưu cơ sở dữ liệu", en:"Optimize the database", ja:"データベースを最適化する" }
    ],
    answer: 1,
    exp: { vi:"UAT do người dùng/khách hàng thực hiện để xác nhận phần mềm giải quyết đúng nhu cầu nghiệp vụ thực tế.", en:"UAT is performed by users/customers to confirm the software genuinely meets real business needs.", ja:"UATはユーザー・顧客が行い、ソフトが実業務ニーズを満たすか確認します。" } },

  { cat: "iv-manual",
    q: { vi:"Black-box testing khác white-box testing chủ yếu ở đâu?", en:"What mainly differs between black-box and white-box testing?", ja:"ブラックボックステストとホワイトボックステストの主な違いは何ですか？" },
    options: [
      { vi:"Black-box chỉ dùng cho web", en:"Black-box is only for web", ja:"ブラックボックスはウェブ専用" },
      { vi:"White-box không cần lập trình viên", en:"White-box needs no programmer", ja:"ホワイトボックスにプログラマーは不要" },
      { vi:"Black-box test qua chức năng không cần biết code; white-box dựa trên cấu trúc code bên trong", en:"Black-box tests via functionality without knowing code; white-box tests based on internal code structure", ja:"ブラックボックスはコードを知らず機能で、ホワイトボックスは内部コード構造に基づく" },
      { vi:"Cả hai đều yêu cầu xem source code", en:"Both require viewing the source code", ja:"両方ともソースコードの参照が必要" }
    ],
    answer: 2,
    exp: { vi:"Black-box tập trung vào hành vi/chức năng bên ngoài; white-box dựa trên logic, nhánh, đường đi trong code.", en:"Black-box focuses on external behavior/functionality; white-box relies on internal logic, branches and paths.", ja:"ブラックボックスは外部の挙動・機能、ホワイトボックスは内部ロジック・分岐・経路に注目します。" } },

  { cat: "iv-manual",
    q: { vi:"Trong Scrum, vai trò của tester được thể hiện tốt nhất qua điều gì?", en:"In Scrum, the tester's role is best reflected by what?", ja:"スクラムにおいてテスターの役割は何に最もよく表れますか？" },
    options: [
      { vi:"Tham gia sớm, cộng tác cả sprint, test liên tục và đóng góp Definition of Done", en:"Engaging early, collaborating all sprint, testing continuously and shaping Definition of Done", ja:"早期参加し、スプリント全体で協働し、継続的にテストし、完了定義に貢献する" },
      { vi:"Chỉ test vào ngày cuối sprint", en:"Testing only on the last day of the sprint", ja:"スプリント最終日のみテストする" },
      { vi:"Không tham gia họp nào", en:"Not attending any meeting", ja:"どの会議にも参加しない" },
      { vi:"Chỉ viết tài liệu, không test", en:"Only writing docs, never testing", ja:"文書作成のみでテストしない" }
    ],
    answer: 0,
    exp: { vi:"Testing trong Agile là hoạt động liên tục; tester tham gia từ đầu, cộng tác với dev/PO và giúp định nghĩa DoD.", en:"Agile testing is continuous; testers engage from the start, collaborate with devs/PO and help define DoD.", ja:"アジャイルのテストは継続的で、テスターは初期から参画し開発・POと協働し完了定義を助けます。" } },

  { cat: "iv-manual",
    q: { vi:"Định nghĩa 'Definition of Done' thường bao gồm điều gì?", en:"What does a 'Definition of Done' typically include?", ja:"「完了定義（Definition of Done）」には通常何が含まれますか？" },
    options: [
      { vi:"Chỉ code đã viết xong", en:"Only that code is written", ja:"コードを書き終えたことだけ" },
      { vi:"Các tiêu chí phải đạt (code review, test pass, không bug critical) để coi công việc hoàn thành", en:"Criteria to be met (code reviewed, tests passing, no critical bugs) for work to count as done", ja:"完了と見なす基準（レビュー済み、テスト合格、重大バグなし）" },
      { vi:"Chỉ khi khách hàng thanh toán", en:"Only when the customer pays", ja:"顧客が支払ったときだけ" },
      { vi:"Chỉ khi tester đi nghỉ", en:"Only when the tester takes leave", ja:"テスターが休暇を取ったときだけ" }
    ],
    answer: 1,
    exp: { vi:"DoD là bộ tiêu chí thống nhất (đã review, test pass, tài liệu cập nhật, không lỗi nghiêm trọng) để coi một item là 'done'.", en:"DoD is an agreed checklist (reviewed, tests passing, docs updated, no critical defects) for an item to be 'done'.", ja:"完了定義はレビュー済み・テスト合格・文書更新・重大バグなしなど合意した基準です。" } },

  { cat: "iv-manual",
    q: { vi:"Risk-based testing tập trung vào điều gì?", en:"What does risk-based testing focus on?", ja:"リスクベーステストは何に焦点を当てますか？" },
    options: [
      { vi:"Test theo thứ tự bảng chữ cái", en:"Testing in alphabetical order", ja:"アルファベット順にテストする" },
      { vi:"Test mọi thứ với mức ưu tiên bằng nhau", en:"Testing everything with equal priority", ja:"すべてを同じ優先度でテストする" },
      { vi:"Chỉ test giao diện", en:"Testing only the UI", ja:"UIのみテストする" },
      { vi:"Ưu tiên kiểm thử các vùng có xác suất lỗi cao và tác động lớn nhất", en:"Prioritizing testing of areas with the highest likelihood and impact of failure", ja:"障害の発生確率と影響が最も大きい領域を優先してテストする" }
    ],
    answer: 3,
    exp: { vi:"Risk-based testing phân bổ công sức test theo mức rủi ro (khả năng xảy ra x mức tác động) để tối ưu nguồn lực.", en:"Risk-based testing allocates effort by risk level (likelihood x impact) to optimize limited resources.", ja:"リスクベーステストはリスク（発生確率×影響）に応じて労力を配分し、限られた資源を最適化します。" } },

  { cat: "iv-manual",
    q: { vi:"Checklist khác test case chi tiết ở điểm nào?", en:"How does a checklist differ from a detailed test case?", ja:"チェックリストと詳細テストケースはどう違いますか？" },
    options: [
      { vi:"Checklist là danh sách mục cần kiểm ngắn gọn; test case có bước, dữ liệu và kết quả mong đợi cụ thể", en:"A checklist is a concise list of items to check; a test case has explicit steps, data and expected results", ja:"チェックリストは確認項目の簡潔な一覧、テストケースは手順・データ・期待結果を明示する" },
      { vi:"Checklist chi tiết hơn test case", en:"A checklist is more detailed than a test case", ja:"チェックリストの方が詳細" },
      { vi:"Checklist chỉ dùng cho automation", en:"A checklist is automation-only", ja:"チェックリストは自動専用" },
      { vi:"Test case không cần bước thực hiện", en:"A test case has no execution steps", ja:"テストケースに実行手順は不要" }
    ],
    answer: 0,
    exp: { vi:"Checklist nhanh gọn, linh hoạt cho kiểm nhanh; test case chuẩn hóa với bước, input và expected để tái sử dụng và truy vết.", en:"Checklists are quick and flexible for fast checks; test cases are standardized with steps, input and expected for reuse and traceability.", ja:"チェックリストは素早く柔軟、テストケースは手順・入力・期待を持ち再利用と追跡に適します。" } },

  { cat: "iv-manual",
    q: { vi:"Khi bug KHÔNG tái hiện được, tester nên làm gì trước tiên?", en:"When a bug is not reproducible, what should the tester do first?", ja:"バグが再現できないとき、テスターはまず何をすべきですか？" },
    options: [
      { vi:"Đóng bug ngay lập tức", en:"Close the bug immediately", ja:"すぐにバグをクローズする" },
      { vi:"Đổ lỗi cho dev", en:"Blame the developer", ja:"開発者のせいにする" },
      { vi:"Thu thập thêm bằng chứng (log, screenshot, video, môi trường, dữ liệu) và thử tái hiện với biến thể điều kiện", en:"Gather more evidence (logs, screenshots, video, environment, data) and try to reproduce under varied conditions", ja:"証跡（ログ・画面・動画・環境・データ）を集め、条件を変えて再現を試みる" },
      { vi:"Bỏ qua và test cái khác", en:"Ignore it and test something else", ja:"無視して別のテストをする" }
    ],
    answer: 2,
    exp: { vi:"Thu thập log, ảnh chụp, dữ liệu và điều kiện chính xác, thử lặp lại nhiều lần/nhiều môi trường trước khi kết luận không tái hiện.", en:"Collect logs, screenshots, exact data and conditions, and retry across attempts/environments before concluding it is not reproducible.", ja:"ログ・画面・正確なデータと条件を集め、複数回・複数環境で試してから再現不可と判断します。" } },

  { cat: "iv-manual",
    q: { vi:"Đâu là một bug title tốt?", en:"Which is a good bug title?", ja:"良いバグタイトルはどれですか？" },
    options: [
      { vi:"'Lỗi'", en:"'Error'", ja:"「エラー」" },
      { vi:"'Không hoạt động'", en:"'Doesn't work'", ja:"「動かない」" },
      { vi:"'Có vấn đề ở đây'", en:"'Problem here'", ja:"「ここに問題」" },
      { vi:"'Nút Đăng nhập không phản hồi khi email chứa dấu cách ở cuối trên Chrome 120'", en:"'Login button unresponsive when email has a trailing space on Chrome 120'", ja:"「Chrome 120でメール末尾に空白があるとログインボタンが反応しない」" }
    ],
    answer: 3,
    exp: { vi:"Title tốt nêu rõ đối tượng, hành vi sai, điều kiện và môi trường, giúp nhận diện nhanh mà không cần mở chi tiết.", en:"A good title states the object, wrong behavior, condition and environment, so it is identifiable at a glance.", ja:"良いタイトルは対象・誤動作・条件・環境を示し、開かずに判別できます。" } },

  { cat: "iv-manual",
    q: { vi:"Test coverage đo lường điều gì?", en:"What does test coverage measure?", ja:"テストカバレッジは何を測りますか？" },
    options: [
      { vi:"Số tester trong đội", en:"Number of testers on the team", ja:"チームのテスター数" },
      { vi:"Mức độ phần mềm/requirement đã được kiểm thử phủ tới đâu", en:"How much of the software/requirements has been exercised by tests", ja:"ソフトや要件がテストでどれだけ網羅されたか" },
      { vi:"Tốc độ chạy test", en:"Test execution speed", ja:"テスト実行速度" },
      { vi:"Kích thước file log", en:"Log file size", ja:"ログファイルのサイズ" }
    ],
    answer: 1,
    exp: { vi:"Test coverage cho biết tỷ lệ requirement, chức năng hoặc code đã được test phủ tới, giúp phát hiện vùng chưa kiểm.", en:"Test coverage shows the proportion of requirements, features or code exercised, revealing untested areas.", ja:"テストカバレッジは要件・機能・コードのテスト網羅率を示し、未テスト領域を明らかにします。" } },

  { cat: "iv-manual",
    q: { vi:"Ad-hoc testing được mô tả đúng nhất là gì?", en:"How is ad-hoc testing best described?", ja:"アドホックテストの最も適切な説明はどれですか？" },
    options: [
      { vi:"Kiểm thử không có kế hoạch/tài liệu chính thức, dựa vào ngẫu hứng và kinh nghiệm để tìm lỗi nhanh", en:"Informal testing without a formal plan/docs, using improvisation and experience to find defects quickly", ja:"正式な計画・文書なしで、即興と経験で素早く不具合を探す非公式テスト" },
      { vi:"Kiểm thử bắt buộc có kịch bản chi tiết từng bước", en:"Testing that requires detailed step-by-step scripts", ja:"詳細な手順台本が必須のテスト" },
      { vi:"Chỉ chạy bằng automation", en:"Run only via automation", ja:"自動でのみ実行する" },
      { vi:"Chỉ thực hiện ở giai đoạn requirement", en:"Done only in the requirement phase", ja:"要件フェーズのみ行う" }
    ],
    answer: 0,
    exp: { vi:"Ad-hoc testing không theo kịch bản chính thức, tận dụng kinh nghiệm để tìm lỗi mà test có kế hoạch có thể bỏ sót.", en:"Ad-hoc testing follows no formal script, using experience to uncover defects that planned tests might miss.", ja:"アドホックテストは台本なしで、経験を活かし計画的テストが見逃す不具合を探します。" } },

  { cat: "iv-manual",
    q: { vi:"Trạng thái bug 'Deferred' có nghĩa là gì?", en:"What does the bug status 'Deferred' mean?", ja:"バグステータス「Deferred」は何を意味しますか？" },
    options: [
      { vi:"Bug đã được sửa xong", en:"The bug is already fixed", ja:"バグは既に修正済み" },
      { vi:"Bug là trùng lặp", en:"The bug is a duplicate", ja:"バグは重複" },
      { vi:"Bug hợp lệ nhưng được hoãn sửa sang bản phát hành sau", en:"A valid bug whose fix is postponed to a later release", ja:"有効だが修正を後のリリースに延期したバグ" },
      { vi:"Bug bị từ chối vì không hợp lệ", en:"The bug is rejected as invalid", ja:"無効として却下されたバグ" }
    ],
    answer: 2,
    exp: { vi:"Deferred nghĩa là lỗi được thừa nhận nhưng quyết định sửa ở phiên bản sau do ưu tiên/nguồn lực.", en:"Deferred means the defect is acknowledged but scheduled to be fixed in a later release due to priority/resources.", ja:"Deferredは不具合を認めつつ、優先度・資源の都合で後のリリースに修正を回す状態です。" } },

  { cat: "iv-manual",
    q: { vi:"Lý do hợp lệ nào để dev đánh dấu bug là 'Rejected'?", en:"Which is a valid reason for a developer to mark a bug 'Rejected'?", ja:"開発者がバグを「Rejected」とする妥当な理由はどれですか？" },
    options: [
      { vi:"Dev không thích tester", en:"The developer dislikes the tester", ja:"開発者がテスターを嫌っている" },
      { vi:"Hành vi đúng theo requirement/thiết kế, không phải lỗi", en:"The behavior matches the requirement/design and is not a defect", ja:"挙動が要件・設計通りで不具合ではない" },
      { vi:"Bug quá khó sửa", en:"The bug is too hard to fix", ja:"バグの修正が難しすぎる" },
      { vi:"Đã hết giờ làm", en:"It is past working hours", ja:"就業時間を過ぎたから" }
    ],
    answer: 1,
    exp: { vi:"Reject hợp lệ khi hành vi phù hợp đặc tả, do hiểu nhầm, không tái hiện, hoặc là as-designed chứ không phải bug.", en:"A valid reject is when behavior matches spec, is a misunderstanding, not reproducible, or is as-designed rather than a defect.", ja:"妥当な却下は仕様通り・誤解・再現不可・仕様通りの動作で、不具合でない場合です。" } },

  { cat: "iv-manual",
    q: { vi:"Kỹ thuật nào thường dùng để ước lượng test?", en:"Which technique is commonly used for test estimation?", ja:"テスト見積もりによく使われる手法はどれですか？" },
    options: [
      { vi:"Tung đồng xu", en:"Flipping a coin", ja:"コインを投げる" },
      { vi:"Hỏi khách hàng đoán", en:"Asking the customer to guess", ja:"顧客に推測してもらう" },
      { vi:"Đếm số dòng log", en:"Counting log lines", ja:"ログ行数を数える" },
      { vi:"Work Breakdown Structure, kinh nghiệm quá khứ hoặc ước lượng ba điểm", en:"Work Breakdown Structure, historical data or three-point estimation", ja:"WBS・過去実績・三点見積もり" }
    ],
    answer: 3,
    exp: { vi:"Ước lượng test thường dùng WBS, dữ liệu lịch sử, three-point estimate hoặc chuyên gia (Delphi) để tính công sức.", en:"Test estimation commonly uses WBS, historical data, three-point estimate or expert (Delphi) judgment for effort.", ja:"テスト見積もりはWBS・過去データ・三点見積もり・専門家判断（デルファイ）を用います。" } },

  { cat: "iv-manual",
    q: { vi:"Compatibility testing kiểm tra điều gì?", en:"What does compatibility testing verify?", ja:"互換性テストは何を検証しますか？" },
    options: [
      { vi:"Chỉ tốc độ tải trang", en:"Only page load speed", ja:"ページ読み込み速度のみ" },
      { vi:"Chỉ độ an toàn của mật khẩu", en:"Only password strength", ja:"パスワードの強度のみ" },
      { vi:"Phần mềm chạy đúng trên nhiều trình duyệt, thiết bị, hệ điều hành và cấu hình khác nhau", en:"That software works correctly across different browsers, devices, OSes and configurations", ja:"異なるブラウザ・端末・OS・構成でソフトが正しく動くこと" },
      { vi:"Chỉ chính tả trong giao diện", en:"Only UI spelling", ja:"UIの誤字のみ" }
    ],
    answer: 2,
    exp: { vi:"Compatibility testing xác minh phần mềm hoạt động nhất quán trên các môi trường (browser, OS, thiết bị, độ phân giải).", en:"Compatibility testing verifies consistent behavior across environments (browsers, OS, devices, resolutions).", ja:"互換性テストは各環境（ブラウザ・OS・端末・解像度）で一貫して動くか確認します。" } },

  { cat: "iv-manual",
    q: { vi:"Usability testing chủ yếu đánh giá điều gì?", en:"What does usability testing mainly assess?", ja:"ユーザビリティテストは主に何を評価しますか？" },
    options: [
      { vi:"Mức độ dễ dùng, trực quan và hài lòng của người dùng với sản phẩm", en:"How easy, intuitive and satisfying the product is for users", ja:"製品がユーザーにとってどれだけ使いやすく直感的で満足できるか" },
      { vi:"Số dòng code", en:"Number of code lines", ja:"コード行数" },
      { vi:"Dung lượng cơ sở dữ liệu", en:"Database size", ja:"データベース容量" },
      { vi:"Số lượng server", en:"Number of servers", ja:"サーバー数" }
    ],
    answer: 0,
    exp: { vi:"Usability testing đánh giá trải nghiệm: dễ học, dễ dùng, hiệu quả, ít lỗi thao tác và mức hài lòng của người dùng.", en:"Usability testing evaluates the experience: learnability, ease of use, efficiency, error rate and user satisfaction.", ja:"ユーザビリティテストは学習容易性・使いやすさ・効率・操作ミス・満足度を評価します。" } },

  { cat: "iv-manual",
    q: { vi:"Localization khác internationalization ở điểm nào?", en:"How does localization differ from internationalization?", ja:"ローカライゼーションとインターナショナライゼーションはどう違いますか？" },
    options: [
      { vi:"Chúng hoàn toàn giống nhau", en:"They are exactly the same", ja:"まったく同じ" },
      { vi:"Localization luôn làm trước internationalization", en:"Localization is always done before internationalization", ja:"ローカライゼーションは常に先に行う" },
      { vi:"Internationalization chỉ về màu sắc", en:"Internationalization is only about colors", ja:"インターナショナライゼーションは色だけ" },
      { vi:"Internationalization là thiết kế sản phẩm sẵn sàng đa ngôn ngữ/vùng; localization là tùy biến cho một ngôn ngữ/vùng cụ thể", en:"Internationalization designs the product to support many locales; localization adapts it to a specific locale", ja:"国際化は多言語・地域対応の設計、ローカライズは特定言語・地域への適応" }
    ],
    answer: 3,
    exp: { vi:"i18n chuẩn bị nền tảng hỗ trợ nhiều ngôn ngữ/định dạng; l10n là bản dịch và điều chỉnh cho từng thị trường cụ thể.", en:"i18n builds the foundation to support many languages/formats; l10n translates and adapts for each specific market.", ja:"i18nは多言語・書式対応の土台作り、l10nは各市場向けの翻訳・調整です。" } },

  { cat: "iv-manual",
    q: { vi:"Khi cần test trên nhiều trình duyệt nhưng thời gian hạn chế, cách tiếp cận hợp lý nhất là gì?", en:"With limited time for cross-browser testing, what is the most reasonable approach?", ja:"時間が限られたクロスブラウザテストで最も妥当な方法は何ですか？" },
    options: [
      { vi:"Bỏ qua hoàn toàn cross-browser", en:"Skip cross-browser entirely", ja:"クロスブラウザを完全に省く" },
      { vi:"Ưu tiên các trình duyệt/thiết bị mà người dùng thực tế dùng nhiều nhất theo dữ liệu analytics", en:"Prioritize browsers/devices most used by real users per analytics data", ja:"分析データで実ユーザー利用が最多のブラウザ・端末を優先する" },
      { vi:"Chỉ test trên trình duyệt tester thích", en:"Test only on the tester's favorite browser", ja:"テスターの好きなブラウザだけでテストする" },
      { vi:"Test trên mọi trình duyệt từng tồn tại", en:"Test on every browser that ever existed", ja:"存在した全ブラウザでテストする" }
    ],
    answer: 1,
    exp: { vi:"Dựa vào dữ liệu sử dụng thực để chọn tổ hợp trình duyệt/thiết bị phổ biến nhất, tối ưu độ phủ theo rủi ro thực tế.", en:"Use real usage data to pick the most common browser/device combos, optimizing coverage by actual risk.", ja:"実利用データで最も一般的なブラウザ・端末の組合せを選び、実リスクに応じ網羅を最適化します。" } },

  { cat: "iv-manual",
    q: { vi:"Dev nói 'chạy tốt trên máy tôi' nhưng bạn thấy lỗi. Bước đầu tiên hợp lý là gì?", en:"A dev says 'works on my machine' but you see the bug. What is a reasonable first step?", ja:"開発者が「自分の環境では動く」と言うがバグが出る。妥当な最初の一歩は何ですか？" },
    options: [
      { vi:"So sánh môi trường: OS, phiên bản browser, dữ liệu, cấu hình, biến môi trường để tìm điểm khác biệt", en:"Compare environments: OS, browser version, data, config, env variables to find the difference", ja:"環境を比較する：OS・ブラウザ版・データ・設定・環境変数の差を探す" },
      { vi:"Đóng bug vì dev đã kiểm tra", en:"Close the bug since the dev checked", ja:"開発者が確認したのでクローズする" },
      { vi:"Báo cáo lên sếp ngay không điều tra", en:"Escalate to the boss without investigating", ja:"調査せずに上司へ報告する" },
      { vi:"Tự sửa code luôn", en:"Fix the code yourself", ja:"自分でコードを直す" }
    ],
    answer: 0,
    exp: { vi:"Khác biệt môi trường là nguyên nhân phổ biến; đối chiếu cấu hình, dữ liệu và phiên bản để tái hiện và cung cấp bằng chứng rõ.", en:"Environment differences are a common cause; compare config, data and versions to reproduce and provide clear evidence.", ja:"環境差はよくある原因。設定・データ・バージョンを照合し再現して明確な証跡を示します。" } },

  { cat: "iv-manual",
    q: { vi:"Requirement mơ hồ/không rõ ràng, tester nên làm gì?", en:"When a requirement is ambiguous, what should a tester do?", ja:"要件が曖昧なとき、テスターは何をすべきですか？" },
    options: [
      { vi:"Tự đoán và test theo ý mình", en:"Guess and test by personal assumption", ja:"自分で推測してテストする" },
      { vi:"Bỏ qua phần đó", en:"Skip that part", ja:"その部分を飛ばす" },
      { vi:"Đặt câu hỏi làm rõ với BA/PO/khách hàng và ghi lại quyết định thống nhất", en:"Raise clarifying questions to BA/PO/customer and document the agreed decision", ja:"BA・PO・顧客に確認質問し、合意した決定を記録する" },
      { vi:"Chờ đến khi lên production rồi tính", en:"Wait until production to decide", ja:"本番まで待って決める" }
    ],
    answer: 2,
    exp: { vi:"Requirement mơ hồ dễ gây hiểu lầm và bug; tester nên làm rõ sớm với stakeholder và ghi nhận để tránh giả định sai.", en:"Ambiguous requirements cause misunderstandings and defects; clarify early with stakeholders and record decisions to avoid wrong assumptions.", ja:"曖昧な要件は誤解とバグの元。関係者に早期確認し決定を記録して誤った前提を防ぎます。" } },

  { cat: "iv-manual",
    q: { vi:"Không đủ thời gian chạy hết test case trước release. Cách xử lý tốt nhất là gì?", en:"There is not enough time to run all test cases before release. What is the best approach?", ja:"リリース前に全テストケースを実行する時間がない。最善の対応は何ですか？" },
    options: [
      { vi:"Chạy ngẫu nhiên bất kỳ", en:"Run any at random", ja:"ランダムに実行する" },
      { vi:"Ưu tiên test case theo rủi ro, mức độ nghiêm trọng và các chức năng quan trọng với nghiệp vụ", en:"Prioritize test cases by risk, severity and business-critical features", ja:"リスク・重大度・業務上重要な機能でテストケースを優先する" },
      { vi:"Chạy theo thứ tự bảng chữ cái", en:"Run in alphabetical order", ja:"アルファベット順に実行する" },
      { vi:"Không chạy gì và release luôn", en:"Run nothing and just release", ja:"何も実行せずリリースする" }
    ],
    answer: 1,
    exp: { vi:"Ưu tiên theo rủi ro giúp dùng thời gian ít nhất cho các vùng quan trọng và dễ hỏng nhất, giảm rủi ro release.", en:"Risk-based prioritization spends limited time on the most important and failure-prone areas, reducing release risk.", ja:"リスクベースの優先付けで、限られた時間を最重要で壊れやすい領域に充て、リリースリスクを減らします。" } },

  { cat: "iv-manual",
    q: { vi:"Điều gì làm cho các bước tái hiện (steps to reproduce) có chất lượng?", en:"What makes steps to reproduce high quality?", ja:"再現手順の質を高めるものは何ですか？" },
    options: [
      { vi:"Càng chung chung càng tốt", en:"The more generic the better", ja:"曖昧なほど良い" },
      { vi:"Chỉ cần một câu 'không chạy'", en:"Just one line 'does not work'", ja:"「動かない」の一言だけ" },
      { vi:"Viết bằng biệt ngữ không ai hiểu", en:"Written in jargon no one understands", ja:"誰も分からない専門用語で書く" },
      { vi:"Rõ ràng, tuần tự, đủ dữ liệu/điều kiện để bất kỳ ai cũng tái hiện được lỗi", en:"Clear, sequential, with enough data/conditions so anyone can reproduce the bug", ja:"明確・順序立て・十分なデータ／条件で誰でも再現できる" }
    ],
    answer: 3,
    exp: { vi:"Steps tốt là cụ thể, đúng thứ tự, kèm dữ liệu/điều kiện và môi trường, giúp dev tái hiện nhanh và sửa đúng.", en:"Good steps are specific, ordered, with data/conditions and environment so devs reproduce quickly and fix correctly.", ja:"良い手順は具体的・順序通りで、データ・条件・環境を含み、開発者が素早く再現し正しく修正できます。" } },

  { cat: "iv-manual",
    q: { vi:"Vì sao test environment nên giống production nhất có thể?", en:"Why should the test environment resemble production as closely as possible?", ja:"テスト環境をできるだけ本番に近づけるべき理由は何ですか？" },
    options: [
      { vi:"Để tiết kiệm điện", en:"To save electricity", ja:"電気を節約するため" },
      { vi:"Để test chạy nhanh hơn", en:"To make tests run faster", ja:"テストを速くするため" },
      { vi:"Để giảm rủi ro lỗi chỉ xuất hiện ở production do khác biệt cấu hình, dữ liệu, phiên bản", en:"To reduce the risk of defects that appear only in production due to config/data/version differences", ja:"設定・データ・バージョン差で本番だけに出る不具合のリスクを下げるため" },
      { vi:"Để không cần viết test case", en:"To avoid writing test cases", ja:"テストケース作成を避けるため" }
    ],
    answer: 2,
    exp: { vi:"Môi trường test gần production giúp bắt sớm lỗi phụ thuộc cấu hình/dữ liệu, tránh 'chỉ lỗi trên production'.", en:"A production-like test environment catches config/data-dependent defects early, avoiding 'production-only' bugs.", ja:"本番に近いテスト環境は設定・データ依存の不具合を早期に捉え「本番だけの不具合」を防ぎます。" } },

  { cat: "iv-manual",
    q: { vi:"Severity của một defect phản ánh điều gì?", en:"What does the severity of a defect reflect?", ja:"バグの重大度は何を反映しますか？" },
    options: [
      { vi:"Mức tác động kỹ thuật của lỗi lên chức năng/hệ thống", en:"The technical impact of the defect on functionality/system", ja:"不具合が機能・システムに与える技術的影響度" },
      { vi:"Ngày tháng phát hiện lỗi", en:"The date the defect was found", ja:"不具合を見つけた日付" },
      { vi:"Tên người tìm ra lỗi", en:"Name of who found the defect", ja:"不具合を見つけた人の名前" },
      { vi:"Số lần lỗi được mở lại", en:"Number of times the bug was reopened", ja:"バグが再オープンされた回数" }
    ],
    answer: 0,
    exp: { vi:"Severity biểu thị mức nghiêm trọng về mặt kỹ thuật/chức năng (ví dụ crash, mất dữ liệu) độc lập với mức cấp bách sửa.", en:"Severity denotes technical/functional seriousness (e.g. crash, data loss) independent of the urgency to fix.", ja:"重大度はクラッシュやデータ損失など技術的・機能的深刻さを示し、修正緊急度とは独立です。" } },

  // ================= iv-automation (50) =================
  { cat: "iv-automation",
    q: { vi:"Khi nào một test case là ứng viên tốt để tự động hóa?", en:"When is a test case a good candidate for automation?", ja:"テストケースが自動化の良い候補になるのはどんなときですか？" },
    options: [
      { vi:"Khi chỉ chạy đúng một lần", en:"When it runs exactly once", ja:"一度だけ実行するとき" },
      { vi:"Khi ổn định, lặp lại nhiều lần và chạy thường xuyên như regression", en:"When it is stable, repetitive and run frequently like regression", ja:"安定・反復的で、リグレッションのように頻繁に実行するとき" },
      { vi:"Khi requirement còn thay đổi liên tục mỗi ngày", en:"When requirements change constantly every day", ja:"要件が毎日変わり続けるとき" },
      { vi:"Khi cần đánh giá cảm nhận thẩm mỹ giao diện", en:"When judging subjective UI aesthetics", ja:"UIの主観的な美しさを判断するとき" }
    ],
    answer: 1,
    exp: { vi:"Automation phù hợp với test ổn định, lặp lại nhiều, tốn công tay và chạy thường xuyên; tránh phần thay đổi liên tục hoặc mang tính chủ quan.", en:"Automation fits stable, highly repetitive, labor-intensive tests run frequently; avoid volatile or subjective areas.", ja:"自動化は安定・高反復・手間がかかり頻繁に実行するテストに向き、頻繁に変わる・主観的な部分は避けます。" } },

  { cat: "iv-automation",
    q: { vi:"Page Object Model (POM) là gì?", en:"What is the Page Object Model (POM)?", ja:"ページオブジェクトモデル（POM）とは何ですか？" },
    options: [
      { vi:"Một trình duyệt headless", en:"A headless browser", ja:"ヘッドレスブラウザ" },
      { vi:"Một loại assertion", en:"A type of assertion", ja:"アサーションの一種" },
      { vi:"Một công cụ CI", en:"A CI tool", ja:"CIツール" },
      { vi:"Mẫu thiết kế đóng gói locator và hành động của mỗi trang vào một class riêng để dễ bảo trì", en:"A design pattern that wraps each page's locators and actions in a dedicated class for maintainability", ja:"各ページのロケーターと操作を専用クラスにまとめ保守性を高める設計パターン" }
    ],
    answer: 3,
    exp: { vi:"POM tách locator/hành động UI khỏi test logic; khi UI đổi chỉ sửa page object, giúp test dễ đọc và dễ bảo trì.", en:"POM separates UI locators/actions from test logic; when the UI changes you only edit the page object, improving readability and maintenance.", ja:"POMはUIのロケーター・操作をテストロジックから分離し、UI変更時はページオブジェクトのみ修正でき保守が容易です。" } },

  { cat: "iv-automation",
    q: { vi:"Implicit wait khác explicit wait như thế nào?", en:"How does implicit wait differ from explicit wait?", ja:"暗黙的な待機と明示的な待機はどう違いますか？" },
    options: [
      { vi:"Implicit áp dụng chung cho mọi lần tìm phần tử; explicit chờ một điều kiện cụ thể trên một phần tử cụ thể", en:"Implicit applies globally to all element lookups; explicit waits for a specific condition on a specific element", ja:"暗黙は全要素探索に一律適用、明示は特定要素の特定条件を待つ" },
      { vi:"Cả hai đều là Thread.sleep", en:"Both are just Thread.sleep", ja:"どちらもThread.sleepと同じ" },
      { vi:"Explicit chỉ dùng cho API", en:"Explicit is only for API", ja:"明示はAPI専用" },
      { vi:"Implicit chờ chính xác một điều kiện logic", en:"Implicit waits for one exact logical condition", ja:"暗黙は正確な論理条件を待つ" }
    ],
    answer: 0,
    exp: { vi:"Implicit wait đặt thời gian chờ mặc định cho mọi lần tìm element; explicit wait chờ đến khi một điều kiện (ví dụ clickable) đúng cho phần tử cụ thể.", en:"Implicit wait sets a default timeout for all element lookups; explicit wait waits until a specific condition (e.g. clickable) is met for a given element.", ja:"暗黙的待機は全要素探索の既定タイムアウト、明示的待機は特定要素の条件（クリック可能など）成立を待ちます。" } },

  { cat: "iv-automation",
    q: { vi:"Nguyên nhân phổ biến nhất khiến test bị flaky là gì?", en:"What is the most common cause of flaky tests?", ja:"フレーキーテストの最も一般的な原因は何ですか？" },
    options: [
      { vi:"Quá nhiều comment trong code", en:"Too many comments in code", ja:"コード内のコメントが多すぎる" },
      { vi:"Tên biến quá dài", en:"Variable names too long", ja:"変数名が長すぎる" },
      { vi:"Vấn đề đồng bộ/thời gian: không chờ đúng cách element/dữ liệu sẵn sàng", en:"Timing/synchronization issues: not waiting properly for elements/data to be ready", ja:"タイミング・同期の問題：要素やデータの準備を正しく待たない" },
      { vi:"Dùng nhiều màu trong report", en:"Using many colors in reports", ja:"レポートで多くの色を使う" }
    ],
    answer: 2,
    exp: { vi:"Flaky thường do đồng bộ kém (chờ cứng, thiếu explicit wait), phụ thuộc thứ tự, dữ liệu chia sẻ hoặc môi trường không ổn định.", en:"Flakiness usually stems from poor synchronization (hard sleeps, missing explicit waits), order dependency, shared data or unstable environments.", ja:"フレーキーは主に同期不良（固定sleep・明示待機欠如）、順序依存、共有データ、不安定な環境が原因です。" } },

  { cat: "iv-automation",
    q: { vi:"Trong test pyramid, tầng đáy (nhiều nhất) nên là loại test nào?", en:"In the test pyramid, the base (largest layer) should be which type of test?", ja:"テストピラミッドで最下層（最多）はどの種類のテストにすべきですか？" },
    options: [
      { vi:"UI/End-to-end test", en:"UI/End-to-end tests", ja:"UI・エンドツーエンドテスト" },
      { vi:"Unit test", en:"Unit tests", ja:"ユニットテスト" },
      { vi:"Manual test", en:"Manual tests", ja:"手動テスト" },
      { vi:"Performance test", en:"Performance tests", ja:"性能テスト" }
    ],
    answer: 1,
    exp: { vi:"Test pyramid khuyến nghị nhiều unit test (nhanh, rẻ, ổn định) ở đáy, ít UI/E2E (chậm, đắt, dễ flaky) ở đỉnh.", en:"The pyramid recommends many unit tests (fast, cheap, stable) at the base and few UI/E2E tests (slow, costly, flaky) at the top.", ja:"ピラミッドは高速・安価・安定なユニットを最下層に多く、遅く高コストでフレーキーなUI/E2Eを頂点に少なくします。" } },

  { cat: "iv-automation",
    q: { vi:"Chiến lược locator nào thường ổn định và được ưu tiên nhất trong Selenium?", en:"Which locator strategy is usually the most stable and preferred in Selenium?", ja:"Seleniumで最も安定して推奨されるロケーター戦略はどれですか？" },
    options: [
      { vi:"Absolute XPath dài từ thẻ html", en:"Long absolute XPath from the html tag", ja:"htmlタグから始まる長い絶対XPath" },
      { vi:"Vị trí index tuyệt đối", en:"Absolute positional index", ja:"絶対的なインデックス位置" },
      { vi:"Text hiển thị thay đổi theo ngôn ngữ", en:"Displayed text that changes by language", ja:"言語で変わる表示テキスト" },
      { vi:"Một id ổn định, hoặc thuộc tính test dành riêng như data-testid", en:"A stable id, or a dedicated test attribute like data-testid", ja:"安定したidや、data-testidのような専用テスト属性" }
    ],
    answer: 3,
    exp: { vi:"id duy nhất và ổn định hoặc data-testid ít bị ảnh hưởng khi UI đổi, giúp locator bền hơn absolute XPath.", en:"A unique stable id or data-testid is resilient to UI changes, making locators more robust than absolute XPath.", ja:"一意で安定したidやdata-testidはUI変更に強く、絶対XPathより堅牢なロケーターになります。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao dùng Thread.sleep để chờ element bị coi là anti-pattern?", en:"Why is using Thread.sleep to wait for elements considered an anti-pattern?", ja:"要素待機にThread.sleepを使うのがアンチパターンとされる理由は何ですか？" },
    options: [
      { vi:"Vì nó chạy quá nhanh", en:"Because it runs too fast", ja:"速すぎるから" },
      { vi:"Vì nó không thể biên dịch", en:"Because it cannot compile", ja:"コンパイルできないから" },
      { vi:"Nó chờ cứng một khoảng cố định: lãng phí thời gian nếu quá dài, và flaky nếu quá ngắn", en:"It waits a fixed hard-coded time: wasteful if too long, flaky if too short", ja:"固定時間を強制的に待つ：長すぎれば無駄、短すぎればフレーキー" },
      { vi:"Vì nó chỉ hoạt động trên Windows", en:"Because it only works on Windows", ja:"Windowsでしか動かないから" }
    ],
    answer: 2,
    exp: { vi:"Thread.sleep chờ mù không theo trạng thái thật; nên dùng explicit wait theo điều kiện để vừa nhanh vừa ổn định.", en:"Thread.sleep waits blindly regardless of actual state; prefer condition-based explicit waits for both speed and stability.", ja:"Thread.sleepは実状態に関係なく盲目的に待つため、条件ベースの明示的待機を使うべきです。" } },

  { cat: "iv-automation",
    q: { vi:"Data-driven testing nghĩa là gì?", en:"What does data-driven testing mean?", ja:"データ駆動テストとは何ですか？" },
    options: [
      { vi:"Chạy cùng một kịch bản test với nhiều bộ dữ liệu đầu vào khác nhau từ nguồn ngoài", en:"Running the same test logic with many different input data sets from an external source", ja:"同じテストロジックを外部の複数入力データで実行する" },
      { vi:"Chỉ test cơ sở dữ liệu", en:"Testing only the database", ja:"データベースだけをテストする" },
      { vi:"Viết test không cần dữ liệu", en:"Writing tests without any data", ja:"データなしでテストを書く" },
      { vi:"Xóa toàn bộ dữ liệu trước khi test", en:"Deleting all data before testing", ja:"テスト前に全データを削除する" }
    ],
    answer: 0,
    exp: { vi:"Data-driven tách dữ liệu khỏi script; một logic chạy lặp với nhiều bộ input (CSV, Excel, JSON) để phủ nhiều trường hợp.", en:"Data-driven separates data from scripts; one logic runs repeatedly over many input sets (CSV, Excel, JSON) to cover many cases.", ja:"データ駆動はデータをスクリプトから分離し、一つのロジックを多数の入力（CSV・Excel・JSON）で反復実行します。" } },

  { cat: "iv-automation",
    q: { vi:"Keyword-driven framework hoạt động dựa trên nguyên lý nào?", en:"On what principle does a keyword-driven framework work?", ja:"キーワード駆動フレームワークはどんな原理で動きますか？" },
    options: [
      { vi:"Không dùng bất kỳ hàm nào", en:"Uses no functions at all", ja:"関数を一切使わない" },
      { vi:"Các hành động test được biểu diễn bằng từ khóa (keyword) ánh xạ tới hàm, cho phép viết test ở mức trừu tượng cao", en:"Test actions are represented by keywords mapped to functions, letting tests be written at a high abstraction level", ja:"テスト操作をキーワードで表し関数に対応させ、高い抽象度でテストを書ける" },
      { vi:"Chỉ chạy được với API", en:"Runs only with APIs", ja:"APIでのみ動く" },
      { vi:"Chỉ chạy được ở chế độ headless", en:"Runs only in headless mode", ja:"ヘッドレスモードでのみ動く" }
    ],
    answer: 1,
    exp: { vi:"Keyword-driven định nghĩa các từ khóa (như Login, ClickButton) gắn với code; người viết test ghép keyword mà không cần lập trình chi tiết.", en:"Keyword-driven defines keywords (like Login, ClickButton) bound to code; testers compose keywords without detailed programming.", ja:"キーワード駆動はLoginやClickButtonなどのキーワードをコードに紐付け、詳細実装なしにテストを組み立てます。" } },

  { cat: "iv-automation",
    q: { vi:"Chạy trình duyệt ở chế độ headless nghĩa là gì?", en:"What does running a browser in headless mode mean?", ja:"ブラウザをヘッドレスモードで実行するとはどういう意味ですか？" },
    options: [
      { vi:"Trình duyệt không có bàn phím", en:"The browser has no keyboard", ja:"ブラウザにキーボードがない" },
      { vi:"Trình duyệt chỉ chạy được offline", en:"The browser only works offline", ja:"ブラウザはオフラインでのみ動く" },
      { vi:"Trình duyệt không hỗ trợ JavaScript", en:"The browser does not support JavaScript", ja:"ブラウザがJavaScriptをサポートしない" },
      { vi:"Trình duyệt chạy không hiển thị giao diện đồ họa, hữu ích cho CI và tốc độ", en:"The browser runs without a visible GUI, useful for CI and speed", ja:"GUIを表示せずに動作し、CIや速度に有用" }
    ],
    answer: 3,
    exp: { vi:"Headless chạy browser không render UI lên màn hình, nhẹ và nhanh hơn, rất phù hợp môi trường CI không có desktop.", en:"Headless runs the browser without rendering a visible UI, lighter and faster, ideal for CI servers without a desktop.", ja:"ヘッドレスは画面表示なしでブラウザを動かし、軽量で高速、デスクトップのないCIに最適です。" } },

  { cat: "iv-automation",
    q: { vi:"Lợi ích chính của việc tích hợp automation vào CI là gì?", en:"What is the main benefit of integrating automation into CI?", ja:"自動テストをCIに統合する主な利点は何ですか？" },
    options: [
      { vi:"Không cần viết assertion nữa", en:"No need to write assertions anymore", ja:"アサーションを書く必要がなくなる" },
      { vi:"Giao diện đẹp hơn", en:"A prettier UI", ja:"UIが美しくなる" },
      { vi:"Test tự chạy ở mỗi lần commit/merge, phát hiện hồi quy sớm và phản hồi nhanh", en:"Tests run automatically on each commit/merge, catching regressions early with fast feedback", ja:"コミット・マージ毎に自動実行し、回帰を早期発見し素早くフィードバックする" },
      { vi:"Loại bỏ hoàn toàn nhu cầu test thủ công cho mọi thứ", en:"Eliminates all need for any manual testing", ja:"あらゆる手動テストの必要を完全に無くす" }
    ],
    answer: 2,
    exp: { vi:"CI chạy test tự động khi có thay đổi code, giúp phát hiện hồi quy tức thì và cung cấp phản hồi liên tục cho đội.", en:"CI runs tests automatically on code changes, catching regressions immediately and giving the team continuous feedback.", ja:"CIはコード変更時に自動でテストを実行し、回帰を即座に検出しチームに継続的フィードバックを与えます。" } },

  { cat: "iv-automation",
    q: { vi:"Hard assertion khác soft assertion ở điểm nào?", en:"How does a hard assertion differ from a soft assertion?", ja:"ハードアサーションとソフトアサーションはどう違いますか？" },
    options: [
      { vi:"Hard assertion dừng test ngay khi thất bại; soft assertion ghi nhận lỗi nhưng tiếp tục chạy rồi báo tổng hợp cuối", en:"A hard assertion stops the test immediately on failure; a soft assertion records the failure but continues and reports at the end", ja:"ハードは失敗で即停止、ソフトは失敗を記録し続行して最後にまとめて報告する" },
      { vi:"Không có gì khác nhau", en:"There is no difference", ja:"違いはない" },
      { vi:"Soft assertion luôn làm test pass", en:"A soft assertion always makes the test pass", ja:"ソフトは常にテストを合格させる" },
      { vi:"Hard assertion chỉ dùng cho API", en:"Hard assertions are API-only", ja:"ハードはAPI専用" }
    ],
    answer: 0,
    exp: { vi:"Hard assert dừng ngay khi fail; soft assert cho phép kiểm tra nhiều điểm trong một lần chạy rồi tổng hợp tất cả thất bại.", en:"A hard assert halts on failure; a soft assert lets you check multiple points in one run and aggregate all failures.", ja:"ハードは失敗で停止、ソフトは一度の実行で複数点を検証し全失敗を集約します。" } },

  { cat: "iv-automation",
    q: { vi:"Selenium WebDriver giao tiếp với trình duyệt bằng cách nào?", en:"How does Selenium WebDriver communicate with the browser?", ja:"Selenium WebDriverはどのようにブラウザと通信しますか？" },
    options: [
      { vi:"Bằng cách chỉnh sửa mã nguồn trình duyệt", en:"By editing the browser's source code", ja:"ブラウザのソースコードを編集して" },
      { vi:"Qua browser driver (như chromedriver) dùng giao thức chuẩn để điều khiển trình duyệt thật", en:"Through a browser driver (like chromedriver) using a standard protocol to control a real browser", ja:"標準プロトコルで実ブラウザを操作するブラウザドライバ（chromedriverなど）を介して" },
      { vi:"Bằng cách gửi email cho trình duyệt", en:"By sending email to the browser", ja:"ブラウザにメールを送って" },
      { vi:"Chỉ qua ảnh chụp màn hình", en:"Only via screenshots", ja:"スクリーンショットのみで" }
    ],
    answer: 1,
    exp: { vi:"WebDriver gửi lệnh tới browser driver tương ứng (chromedriver, geckodriver) theo giao thức W3C để điều khiển trình duyệt thật.", en:"WebDriver sends commands to the matching browser driver (chromedriver, geckodriver) via the W3C protocol to control a real browser.", ja:"WebDriverはW3Cプロトコルで対応ドライバ（chromedriver等）に命令を送り実ブラウザを操作します。" } },

  { cat: "iv-automation",
    q: { vi:"So với XPath, CSS selector thường có ưu điểm gì?", en:"Compared to XPath, what advantage do CSS selectors often have?", ja:"XPathと比べてCSSセレクターの一般的な利点は何ですか？" },
    options: [
      { vi:"CSS selector có thể duyệt ngược lên phần tử cha dễ dàng hơn", en:"CSS selectors can traverse to parent elements more easily", ja:"CSSは親要素へ辿るのが容易" },
      { vi:"CSS selector luôn chậm hơn", en:"CSS selectors are always slower", ja:"CSSは常に遅い" },
      { vi:"CSS selector không thể chọn theo class", en:"CSS selectors cannot select by class", ja:"CSSはクラスで選べない" },
      { vi:"CSS selector thường nhanh hơn, ngắn gọn và được nhiều engine trình duyệt tối ưu tốt", en:"CSS selectors are often faster, more concise and well-optimized by browser engines", ja:"CSSはしばしば高速・簡潔でブラウザエンジンに最適化されている" }
    ],
    answer: 3,
    exp: { vi:"CSS selector gọn, nhanh và được engine hỗ trợ tốt; XPath mạnh hơn khi cần duyệt theo trục hoặc theo text, nhưng có thể chậm và dài.", en:"CSS selectors are concise, fast and well-supported; XPath is more powerful for axis/text traversal but can be slower and verbose.", ja:"CSSは簡潔・高速で対応が良く、XPathは軸やテキスト探索に強いが遅く冗長になりがちです。" } },

  { cat: "iv-automation",
    q: { vi:"ExpectedConditions (như elementToBeClickable) được dùng cùng với gì?", en:"ExpectedConditions (like elementToBeClickable) are used together with what?", ja:"ExpectedConditions（elementToBeClickableなど）は何と一緒に使いますか？" },
    options: [
      { vi:"Explicit wait (WebDriverWait) để chờ đến khi điều kiện thỏa mãn", en:"Explicit wait (WebDriverWait) to wait until the condition is met", ja:"条件が満たされるまで待つ明示的待機（WebDriverWait）" },
      { vi:"Chỉ với Thread.sleep", en:"Only with Thread.sleep", ja:"Thread.sleepとのみ" },
      { vi:"Chỉ với chế độ headless", en:"Only with headless mode", ja:"ヘッドレスモードとのみ" },
      { vi:"Chỉ với test API", en:"Only with API tests", ja:"APIテストとのみ" }
    ],
    answer: 0,
    exp: { vi:"ExpectedConditions kết hợp với WebDriverWait (explicit wait) để chờ đến khi element hiển thị/clickable... trước khi thao tác.", en:"ExpectedConditions pair with WebDriverWait (explicit wait) to pause until an element is visible/clickable before acting.", ja:"ExpectedConditionsはWebDriverWait（明示的待機）と組み合わせ、要素が表示・クリック可能になるまで待ちます。" } },

  { cat: "iv-automation",
    q: { vi:"Cách tốt để tự động hóa các phần tử có id thay đổi động (dynamic) là gì?", en:"What is a good way to automate elements with dynamically changing ids?", ja:"動的に変わるidを持つ要素を自動化する良い方法は何ですか？" },
    options: [
      { vi:"Hard-code id đầy đủ mỗi lần chạy", en:"Hard-code the full id every run", ja:"毎回完全なidをハードコードする" },
      { vi:"Bỏ qua phần tử đó", en:"Skip that element", ja:"その要素を飛ばす" },
      { vi:"Dùng locator ổn định theo thuộc tính bền, quan hệ hoặc so khớp một phần (contains, starts-with, data-testid)", en:"Use stable locators via durable attributes, relationships or partial matching (contains, starts-with, data-testid)", ja:"安定属性・関係・部分一致（contains・starts-with・data-testid）で堅牢なロケーターを使う" },
      { vi:"Chụp màn hình rồi so sánh pixel", en:"Screenshot and compare pixels", ja:"スクリーンショットのピクセル比較をする" }
    ],
    answer: 2,
    exp: { vi:"Với id động, dùng locator dựa trên thuộc tính ổn định, XPath contains/starts-with, hoặc data-testid thay vì id đầy đủ hay chỉ mục cứng.", en:"For dynamic ids, use locators based on stable attributes, XPath contains/starts-with, or data-testid instead of full ids or fixed indexes.", ja:"動的idには完全idや固定indexでなく、安定属性・contains/starts-with・data-testidを使います。" } },

  { cat: "iv-automation",
    q: { vi:"Lợi ích lớn nhất của Page Object Model đối với bảo trì là gì?", en:"What is POM's biggest benefit for maintenance?", ja:"保守におけるPOMの最大の利点は何ですか？" },
    options: [
      { vi:"Làm test chạy nhanh hơn nhiều lần", en:"Makes tests run many times faster", ja:"テストを何倍も速くする" },
      { vi:"Khi UI thay đổi, chỉ cần cập nhật ở một nơi (page object) thay vì sửa rải rác nhiều test", en:"When the UI changes, you update one place (the page object) instead of many scattered tests", ja:"UI変更時、多数のテストではなく一箇所（ページオブジェクト）だけ更新すればよい" },
      { vi:"Loại bỏ nhu cầu dùng locator", en:"Removes the need for locators", ja:"ロケーターを不要にする" },
      { vi:"Tự động sinh test case", en:"Auto-generates test cases", ja:"テストケースを自動生成する" }
    ],
    answer: 1,
    exp: { vi:"Vì locator/hành động tập trung ở page object, thay đổi UI chỉ cần sửa một chỗ, giảm mạnh chi phí bảo trì và trùng lặp.", en:"Because locators/actions live in the page object, a UI change requires editing one place, greatly cutting maintenance and duplication.", ja:"ロケーターや操作がページオブジェクトに集約されるため、UI変更は一箇所修正で済み保守コストと重複を大きく減らします。" } },

  { cat: "iv-automation",
    q: { vi:"Đâu là các loại kiến trúc automation framework phổ biến?", en:"Which are common types of automation framework architectures?", ja:"一般的な自動化フレームワーク構造の種類はどれですか？" },
    options: [
      { vi:"Chỉ có duy nhất một loại framework", en:"There is only one framework type", ja:"フレームワークは一種類だけ" },
      { vi:"Chỉ có framework dựa trên ảnh", en:"Only image-based frameworks", ja:"画像ベースのみ" },
      { vi:"Chỉ có framework chạy trên đám mây", en:"Only cloud-based frameworks", ja:"クラウドベースのみ" },
      { vi:"Data-driven, keyword-driven, modular và hybrid", en:"Data-driven, keyword-driven, modular and hybrid", ja:"データ駆動・キーワード駆動・モジュラー・ハイブリッド" }
    ],
    answer: 3,
    exp: { vi:"Các kiểu framework thường gặp gồm data-driven, keyword-driven, modular (theo module/POM) và hybrid kết hợp nhiều cách.", en:"Common framework styles include data-driven, keyword-driven, modular (module/POM) and hybrid combining approaches.", ja:"代表的な構造はデータ駆動・キーワード駆動・モジュラー（POM）・それらを組み合わせたハイブリッドです。" } },

  { cat: "iv-automation",
    q: { vi:"Trường hợp nào KHÔNG nên tự động hóa?", en:"Which case should NOT be automated?", ja:"自動化すべきでないのはどのケースですか？" },
    options: [
      { vi:"Kiểm thử usability/thẩm mỹ mang tính chủ quan và các test chỉ chạy một lần cho tính năng còn biến động", en:"Subjective usability/aesthetic testing and one-off tests for volatile features", ja:"主観的なユーザビリティ・美観テストや、頻繁に変わる機能の使い捨てテスト" },
      { vi:"Regression chạy hằng ngày", en:"Daily regression runs", ja:"毎日のリグレッション実行" },
      { vi:"Kiểm thử smoke lặp lại", en:"Repeated smoke checks", ja:"繰り返すスモークチェック" },
      { vi:"Test tính toán ổn định lặp nhiều lần", en:"Stable calculation tests run many times", ja:"何度も実行する安定した計算テスト" }
    ],
    answer: 0,
    exp: { vi:"Test chủ quan (thẩm mỹ, cảm nhận), chạy một lần, hoặc trên tính năng chưa ổn định thường không đáng để automation.", en:"Subjective tests (aesthetics, feel), one-off runs, or unstable features are usually not worth automating.", ja:"主観的テスト（美観・感覚）、一度きり、未成熟な機能は自動化に見合いません。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao API automation thường được ưu tiên hơn UI automation khi có thể?", en:"Why is API automation often preferred over UI automation when possible?", ja:"可能な場合にAPI自動化がUI自動化より好まれるのはなぜですか？" },
    options: [
      { vi:"Vì API không cần assertion", en:"Because APIs need no assertions", ja:"APIにアサーションが不要だから" },
      { vi:"Vì API test không bao giờ fail", en:"Because API tests never fail", ja:"APIテストは決して失敗しないから" },
      { vi:"API test nhanh hơn, ổn định hơn và ít flaky hơn vì bỏ qua tầng giao diện dễ thay đổi", en:"API tests are faster, more stable and less flaky because they bypass the volatile UI layer", ja:"変わりやすいUI層を回避するためAPIテストは高速・安定でフレーキーが少ない" },
      { vi:"Vì API không liên quan đến backend", en:"Because APIs are unrelated to the backend", ja:"APIはバックエンドと無関係だから" }
    ],
    answer: 2,
    exp: { vi:"API test chạy dưới lớp UI nên nhanh, ít phụ thuộc render/đồng bộ, ổn định hơn và dễ bảo trì hơn UI test.", en:"API tests run below the UI, so they are fast, less dependent on rendering/sync, more stable and easier to maintain than UI tests.", ja:"APIテストはUI下層で動くため高速・レンダリング依存が少なく安定し、UIより保守しやすいです。" } },

  { cat: "iv-automation",
    q: { vi:"Cách xử lý bền vững nhất cho một test bị flaky là gì?", en:"What is the most sustainable way to handle a flaky test?", ja:"フレーキーテストへの最も持続的な対処は何ですか？" },
    options: [
      { vi:"Xóa test đi cho khuất mắt", en:"Delete the test to hide it", ja:"目障りなのでテストを削除する" },
      { vi:"Luôn cho retry vô hạn đến khi pass", en:"Always retry infinitely until it passes", ja:"合格まで無限にリトライする" },
      { vi:"Đánh dấu bỏ qua vĩnh viễn và quên nó", en:"Mark it skipped forever and forget it", ja:"永久にスキップして忘れる" },
      { vi:"Điều tra nguyên nhân gốc (đồng bộ, dữ liệu, phụ thuộc) và sửa; retry chỉ là biện pháp tạm", en:"Investigate the root cause (sync, data, dependencies) and fix it; retries are only a temporary measure", ja:"根本原因（同期・データ・依存）を調査し修正する。リトライは一時策に過ぎない" }
    ],
    answer: 3,
    exp: { vi:"Retry che giấu vấn đề; cách bền là tìm nguyên nhân gốc (chờ, dữ liệu, cô lập, thứ tự) và khắc phục để test tin cậy trở lại.", en:"Retries mask the issue; the durable fix is finding the root cause (waits, data, isolation, ordering) and resolving it to restore trust.", ja:"リトライは問題を隠すだけ。根本原因（待機・データ・分離・順序）を突き止め修正して信頼を回復します。" } },

  { cat: "iv-automation",
    q: { vi:"Công cụ nào thường dùng để tạo report trực quan cho automation?", en:"Which tool is commonly used to create rich automation reports?", ja:"自動テストの見やすいレポート作成によく使われるツールはどれですか？" },
    options: [
      { vi:"Photoshop", en:"Photoshop", ja:"Photoshop" },
      { vi:"Allure Report", en:"Allure Report", ja:"Allure Report" },
      { vi:"Notepad", en:"Notepad", ja:"メモ帳" },
      { vi:"Calculator", en:"Calculator", ja:"電卓" }
    ],
    answer: 1,
    exp: { vi:"Allure (và ExtentReports) tạo báo cáo trực quan có bước, ảnh chụp, thời gian và xu hướng, giúp phân tích kết quả dễ dàng.", en:"Allure (and ExtentReports) produce rich reports with steps, screenshots, timing and trends, easing result analysis.", ja:"AllureやExtentReportsは手順・画面・時間・傾向を含む見やすいレポートを生成し結果分析を容易にします。" } },

  { cat: "iv-automation",
    q: { vi:"Lợi ích chính của parallel execution trong automation là gì?", en:"What is the main benefit of parallel execution in automation?", ja:"自動テストの並列実行の主な利点は何ですか？" },
    options: [
      { vi:"Làm test không bao giờ flaky", en:"Makes tests never flaky", ja:"テストが決してフレーキーにならない" },
      { vi:"Loại bỏ nhu cầu assertion", en:"Removes the need for assertions", ja:"アサーションを不要にする" },
      { vi:"Giảm tổng thời gian chạy bằng cách chạy nhiều test đồng thời trên nhiều luồng/máy", en:"Reduces total run time by running many tests at once across threads/machines", ja:"複数スレッド・マシンで同時実行し総実行時間を短縮する" },
      { vi:"Tự động sửa lỗi trong test", en:"Auto-fixes bugs in tests", ja:"テスト内のバグを自動修正する" }
    ],
    answer: 2,
    exp: { vi:"Parallel execution rút ngắn feedback loop bằng cách chạy đồng thời; yêu cầu test độc lập, không chia sẻ trạng thái để tránh xung đột.", en:"Parallel execution shortens the feedback loop by running concurrently; it requires independent tests with no shared state to avoid conflicts.", ja:"並列実行は同時実行でフィードバックを短縮しますが、競合回避のため状態を共有しない独立テストが必要です。" } },

  { cat: "iv-automation",
    q: { vi:"Selenium Grid dùng để làm gì?", en:"What is Selenium Grid used for?", ja:"Selenium Gridは何に使いますか？" },
    options: [
      { vi:"Phân phối và chạy test song song trên nhiều máy, trình duyệt và hệ điều hành khác nhau", en:"Distributing and running tests in parallel across multiple machines, browsers and OSes", ja:"複数マシン・ブラウザ・OSにテストを分散し並列実行する" },
      { vi:"Vẽ biểu đồ cho báo cáo", en:"Drawing charts for reports", ja:"レポートのグラフを描く" },
      { vi:"Quản lý mã nguồn", en:"Managing source code", ja:"ソースコードを管理する" },
      { vi:"Tạo dữ liệu test ngẫu nhiên", en:"Generating random test data", ja:"ランダムなテストデータを生成する" }
    ],
    answer: 0,
    exp: { vi:"Selenium Grid cho phép chạy test phân tán song song trên nhiều node (browser/OS khác nhau), tăng tốc và mở rộng độ phủ.", en:"Selenium Grid runs distributed tests in parallel across nodes (different browsers/OSes), speeding runs and widening coverage.", ja:"Selenium Gridは異なるブラウザ・OSのノードでテストを分散並列実行し、高速化と網羅拡大を実現します。" } },

  { cat: "iv-automation",
    q: { vi:"Điểm khác biệt kiến trúc quan trọng của Cypress so với Selenium là gì?", en:"What is a key architectural difference of Cypress versus Selenium?", ja:"CypressとSeleniumの重要なアーキテクチャ上の違いは何ですか？" },
    options: [
      { vi:"Cypress không thể assert", en:"Cypress cannot assert", ja:"Cypressはアサーションできない" },
      { vi:"Cypress chỉ chạy trên server", en:"Cypress runs only on servers", ja:"Cypressはサーバーでのみ動く" },
      { vi:"Cypress không hỗ trợ JavaScript", en:"Cypress does not support JavaScript", ja:"CypressはJavaScriptをサポートしない" },
      { vi:"Cypress chạy trực tiếp trong cùng vòng đời của trình duyệt (in-browser), còn Selenium điều khiển từ bên ngoài qua driver", en:"Cypress runs inside the browser's run loop, while Selenium controls it externally via a driver", ja:"Cypressはブラウザの実行ループ内で動作し、Seleniumはドライバ経由で外部から制御する" }
    ],
    answer: 3,
    exp: { vi:"Cypress thực thi trong cùng runtime của trình duyệt nên đồng bộ tốt và tự chờ; Selenium điều khiển qua driver bên ngoài với giao thức chuẩn.", en:"Cypress executes within the browser runtime giving tight sync and auto-waiting; Selenium controls externally through a driver via a standard protocol.", ja:"Cypressはブラウザ実行環境内で動き同期と自動待機に優れ、Seleniumは標準プロトコルのドライバで外部制御します。" } },

  { cat: "iv-automation",
    q: { vi:"Playwright có tính năng nào giúp giảm flaky liên quan đến thời gian chờ?", en:"Which Playwright feature helps reduce timing-related flakiness?", ja:"Playwrightのどの機能がタイミング関連のフレーキーを減らしますか？" },
    options: [
      { vi:"Bắt buộc dùng Thread.sleep ở mọi bước", en:"Requiring Thread.sleep at every step", ja:"全手順でThread.sleepを必須にする" },
      { vi:"Auto-waiting: tự chờ element sẵn sàng (hiển thị, ổn định, có thể tương tác) trước khi thao tác", en:"Auto-waiting: it waits for elements to be ready (visible, stable, actionable) before acting", ja:"自動待機：操作前に要素が準備完了（表示・安定・操作可能）になるのを待つ" },
      { vi:"Tắt hoàn toàn mọi assertion", en:"Disabling all assertions", ja:"全アサーションを無効化する" },
      { vi:"Chỉ chạy được ở chế độ có giao diện", en:"Running only in headed mode", ja:"ヘッド付きモードでのみ動く" }
    ],
    answer: 1,
    exp: { vi:"Playwright tự động chờ (auto-waiting) đến khi element actionable trước mỗi hành động, giảm mạnh flaky do đồng bộ mà không cần chờ cứng.", en:"Playwright auto-waits until an element is actionable before each action, greatly reducing sync flakiness without hard sleeps.", ja:"Playwrightは各操作前に要素が操作可能になるまで自動待機し、固定sleepなしで同期起因のフレーキーを大きく減らします。" } },

  { cat: "iv-automation",
    q: { vi:"Nguyên nhân điển hình của StaleElementReferenceException là gì?", en:"What typically causes a StaleElementReferenceException?", ja:"StaleElementReferenceExceptionの典型的な原因は何ですか？" },
    options: [
      { vi:"Element tham chiếu đã bị DOM làm mới/thay thế sau khi được tìm thấy nên tham chiếu cũ không còn hợp lệ", en:"The referenced element was refreshed/replaced in the DOM after being located, so the old reference is no longer valid", ja:"取得後にDOMが更新・置換され、古い参照が無効になった" },
      { vi:"Test chạy quá nhanh nên trình duyệt vui", en:"The test runs so fast the browser is happy", ja:"テストが速すぎてブラウザが喜んでいる" },
      { vi:"Do dùng CSS selector thay vì XPath", en:"Because CSS selectors were used instead of XPath", ja:"XPathでなくCSSを使ったから" },
      { vi:"Do thiếu comment trong code", en:"Because of missing code comments", ja:"コードコメントがないから" }
    ],
    answer: 0,
    exp: { vi:"Stale element xảy ra khi DOM re-render/thay thế node sau khi ta đã giữ tham chiếu; cần tìm lại element hoặc chờ trạng thái ổn định rồi thao tác.", en:"Stale element occurs when the DOM re-renders/replaces the node after we held a reference; re-locate the element or wait for a stable state before acting.", ja:"参照保持後にDOMが再描画・置換されると発生。要素を取得し直すか安定状態を待ってから操作します。" } },

  { cat: "iv-automation",
    q: { vi:"Trong BDD với Cucumber, cú pháp Gherkin dùng các từ khóa chính nào?", en:"In BDD with Cucumber, which key Gherkin keywords are used?", ja:"CucumberのBDDで、Gherkin構文の主なキーワードはどれですか？" },
    options: [
      { vi:"Select / Insert / Update / Delete", en:"Select / Insert / Update / Delete", ja:"Select / Insert / Update / Delete" },
      { vi:"Try / Catch / Finally", en:"Try / Catch / Finally", ja:"Try / Catch / Finally" },
      { vi:"Given / When / Then (và And, But)", en:"Given / When / Then (and And, But)", ja:"Given / When / Then（およびAnd, But）" },
      { vi:"Import / Export / Compile", en:"Import / Export / Compile", ja:"Import / Export / Compile" }
    ],
    answer: 2,
    exp: { vi:"Gherkin mô tả kịch bản theo Given (điều kiện), When (hành động), Then (kết quả mong đợi), giúp business và tech cùng đọc hiểu.", en:"Gherkin describes scenarios with Given (context), When (action) and Then (expected outcome), readable by business and tech alike.", ja:"GherkinはGiven（前提）・When（操作）・Then（期待結果）でシナリオを記述し、業務と技術双方が読めます。" } },

  { cat: "iv-automation",
    q: { vi:"Vai trò của một assertion library (như AssertJ, Chai, Hamcrest) là gì?", en:"What is the role of an assertion library (like AssertJ, Chai, Hamcrest)?", ja:"アサーションライブラリ（AssertJ・Chai・Hamcrestなど）の役割は何ですか？" },
    options: [
      { vi:"Chỉ để mở trình duyệt", en:"Only to open the browser", ja:"ブラウザを開くためだけ" },
      { vi:"Thay thế hoàn toàn CI", en:"To fully replace CI", ja:"CIを完全に置き換える" },
      { vi:"Chỉ để chụp màn hình", en:"Only to take screenshots", ja:"スクリーンショットを撮るためだけ" },
      { vi:"Cung cấp cú pháp diễn đạt để so sánh kết quả thực tế với mong đợi và báo lỗi rõ ràng khi khác biệt", en:"Provide expressive syntax to compare actual vs expected and report clear failures on mismatch", ja:"実際と期待を比較し、不一致時に明確な失敗を報告する表現力ある構文を提供する" }
    ],
    answer: 3,
    exp: { vi:"Assertion library giúp viết kiểm chứng dễ đọc, so sánh actual vs expected và tạo thông báo lỗi rõ ràng khi test thất bại.", en:"An assertion library enables readable checks comparing actual vs expected and produces clear failure messages when tests fail.", ja:"アサーションライブラリは読みやすい検証を書き、実際と期待を比較し失敗時に明確なメッセージを出します。" } },

  { cat: "iv-automation",
    q: { vi:"Cách nào giúp giảm chi phí bảo trì bộ automation lớn?", en:"Which practice reduces maintenance cost of a large automation suite?", ja:"大規模な自動テストの保守コストを下げる手法はどれですか？" },
    options: [
      { vi:"Sao chép mã locator vào từng test", en:"Copy locator code into every test", ja:"ロケーターコードを各テストに複製する" },
      { vi:"Áp dụng POM, tái sử dụng component, đặt tên rõ ràng và tránh trùng lặp (DRY)", en:"Apply POM, reuse components, use clear naming and avoid duplication (DRY)", ja:"POM適用・部品再利用・明確な命名・重複回避（DRY）" },
      { vi:"Dùng nhiều absolute XPath dài", en:"Use many long absolute XPaths", ja:"長い絶対XPathを多用する" },
      { vi:"Không dùng version control", en:"Avoid version control", ja:"バージョン管理を使わない" }
    ],
    answer: 1,
    exp: { vi:"POM, tái sử dụng, locator ổn định và nguyên tắc DRY giúp một thay đổi UI chỉ cần sửa ít nơi, giảm chi phí bảo trì đáng kể.", en:"POM, reuse, stable locators and the DRY principle mean a UI change touches few places, cutting maintenance cost significantly.", ja:"POM・再利用・安定ロケーター・DRY原則により、UI変更の修正箇所が減り保守コストを大幅に下げます。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao nên tránh absolute XPath (ví dụ /html/body/div[2]/...) cho locator?", en:"Why should absolute XPath (e.g. /html/body/div[2]/...) be avoided for locators?", ja:"ロケーターで絶対XPath（例：/html/body/div[2]/...）を避けるべき理由は何ですか？" },
    options: [
      { vi:"Vì nó không chạy trên Chrome", en:"Because it does not work on Chrome", ja:"Chromeで動かないから" },
      { vi:"Vì nó luôn trả về nhiều element", en:"Because it always returns many elements", ja:"常に複数要素を返すから" },
      { vi:"Nó phụ thuộc cấu trúc DOM đầy đủ nên rất dễ gãy khi bất kỳ thay đổi giao diện nào xảy ra", en:"It depends on the full DOM structure and breaks easily whenever the UI changes", ja:"完全なDOM構造に依存し、UIが少し変わるだけで壊れやすい" },
      { vi:"Vì nó không thể dùng trong Selenium", en:"Because it cannot be used in Selenium", ja:"Seleniumで使えないから" }
    ],
    answer: 2,
    exp: { vi:"Absolute XPath bám vào toàn bộ đường dẫn DOM nên rất mong manh; nên dùng locator tương đối theo thuộc tính ổn định hoặc data-testid.", en:"Absolute XPath ties to the whole DOM path and is very brittle; prefer relative locators using stable attributes or data-testid.", ja:"絶対XPathはDOM全体の経路に依存し脆弱です。安定属性やdata-testidを使う相対ロケーターが望ましいです。" } },

  { cat: "iv-automation",
    q: { vi:"Chiến lược wait được coi là best practice là gì?", en:"Which wait strategy is considered best practice?", ja:"ベストプラクティスとされる待機戦略はどれですか？" },
    options: [
      { vi:"Explicit wait theo điều kiện cụ thể của element (visible/clickable) thay cho sleep cố định", en:"Explicit waits based on specific element conditions (visible/clickable) instead of fixed sleeps", ja:"固定sleepの代わりに、要素の具体条件（表示・クリック可能）に基づく明示的待機" },
      { vi:"Luôn dùng Thread.sleep(10000) cho chắc", en:"Always use Thread.sleep(10000) to be safe", ja:"念のため常にThread.sleep(10000)を使う" },
      { vi:"Không dùng wait nào cả", en:"Use no waits at all", ja:"待機を一切使わない" },
      { vi:"Chờ ngẫu nhiên mỗi lần một khoảng khác nhau", en:"Wait a random different amount each time", ja:"毎回ランダムに異なる時間だけ待つ" }
    ],
    answer: 0,
    exp: { vi:"Explicit wait chờ đúng đến khi điều kiện thỏa mãn nên vừa nhanh vừa ổn định; sleep cứng lãng phí hoặc gây flaky.", en:"Explicit waits pause exactly until a condition is met, being both fast and stable; hard sleeps are wasteful or flaky.", ja:"明示的待機は条件成立まで正確に待つため高速かつ安定で、固定sleepは無駄かフレーキーの元です。" } },

  { cat: "iv-automation",
    q: { vi:"Trong pipeline CI, thời điểm hợp lý nhất để chạy bộ automation regression là khi nào?", en:"In a CI pipeline, when is it most reasonable to run the automated regression suite?", ja:"CIパイプラインで自動リグレッションを実行するのに最も妥当なのはいつですか？" },
    options: [
      { vi:"Chỉ mỗi năm một lần", en:"Only once a year", ja:"年に一度だけ" },
      { vi:"Tự động khi có commit/merge hoặc theo lịch định kỳ (nightly)", en:"Automatically on commit/merge or on a scheduled (nightly) basis", ja:"コミット・マージ時や定期スケジュール（ナイトリー）で自動的に" },
      { vi:"Chỉ khi khách hàng yêu cầu bằng văn bản", en:"Only when the customer requests in writing", ja:"顧客が書面で要求したときだけ" },
      { vi:"Không bao giờ, để tiết kiệm tài nguyên", en:"Never, to save resources", ja:"資源節約のため決して実行しない" }
    ],
    answer: 1,
    exp: { vi:"Regression tự động nên chạy khi có thay đổi code (commit/merge) và/hoặc theo lịch nightly để phát hiện hồi quy sớm và liên tục.", en:"Automated regression should run on code changes (commit/merge) and/or on a nightly schedule to catch regressions early and continuously.", ja:"自動リグレッションはコード変更時（コミット・マージ）やナイトリーで実行し、回帰を早期かつ継続的に検出します。" } },

  { cat: "iv-automation",
    q: { vi:"ROI của automation được đánh giá đúng nhất qua yếu tố nào?", en:"How is automation ROI best assessed?", ja:"自動化のROIはどう評価するのが最も適切ですか？" },
    options: [
      { vi:"Chỉ đếm số dòng code test", en:"Just counting lines of test code", ja:"テストコードの行数だけ数える" },
      { vi:"Chỉ nhìn số lượng test đã viết", en:"Only the number of tests written", ja:"書いたテスト数だけ見る" },
      { vi:"Số lượng công cụ đã cài đặt", en:"The number of tools installed", ja:"インストールしたツール数" },
      { vi:"Công sức tiết kiệm dài hạn so với chi phí xây dựng và bảo trì, cùng khả năng phát hiện lỗi sớm", en:"Long-term effort saved versus build and maintenance cost, plus earlier defect detection", ja:"構築・保守コストに対する長期的な労力削減と、より早い不具合検出" }
    ],
    answer: 3,
    exp: { vi:"ROI thật cân giữa chi phí phát triển + bảo trì và lợi ích như tiết kiệm công lặp lại, phản hồi nhanh, phát hiện hồi quy sớm.", en:"True ROI balances development plus maintenance cost against benefits like saved repetitive effort, fast feedback and early regression detection.", ja:"真のROIは開発・保守コストと、反復労力削減・迅速なフィードバック・早期回帰検出などの利益を比較します。" } },

  { cat: "iv-automation",
    q: { vi:"Cách quản lý test data tốt trong automation là gì?", en:"What is a good way to manage test data in automation?", ja:"自動テストでテストデータを管理する良い方法は何ですか？" },
    options: [
      { vi:"Nhúng cứng mọi dữ liệu vào giữa code test", en:"Hard-code all data in the middle of test code", ja:"全データをテストコードにハードコードする" },
      { vi:"Dùng chung một bản ghi cho tất cả test song song", en:"Share one record across all parallel tests", ja:"全並列テストで一つのレコードを共有する" },
      { vi:"Tách dữ liệu ra nguồn ngoài, tạo/dọn dữ liệu độc lập cho mỗi test để tránh phụ thuộc lẫn nhau", en:"Externalize data, and create/clean independent data per test to avoid interdependencies", ja:"データを外部化し、テスト毎に独立して作成・クリーンアップし相互依存を避ける" },
      { vi:"Không bao giờ dọn dữ liệu sau khi chạy", en:"Never clean up data after runs", ja:"実行後にデータを一切片付けない" }
    ],
    answer: 2,
    exp: { vi:"Nên tách dữ liệu khỏi code, mỗi test tự tạo và dọn dữ liệu độc lập (setup/teardown) để test lặp lại được và không ảnh hưởng nhau, nhất là khi chạy song song.", en:"Externalize data and have each test create and clean its own independent data (setup/teardown) so tests are repeatable and isolated, especially in parallel runs.", ja:"データを外部化し各テストが独立してデータを作成・片付け（setup/teardown）することで、特に並列時に反復可能で分離されます。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao nên chụp màn hình khi test thất bại?", en:"Why capture a screenshot when a test fails?", ja:"テスト失敗時にスクリーンショットを撮る理由は何ですか？" },
    options: [
      { vi:"Cung cấp bằng chứng trực quan về trạng thái UI lúc lỗi, giúp chẩn đoán nguyên nhân nhanh hơn", en:"To provide visual evidence of the UI state at failure, speeding root-cause diagnosis", ja:"失敗時のUI状態の視覚的証跡を残し、原因特定を早めるため" },
      { vi:"Để làm report nặng hơn", en:"To make the report heavier", ja:"レポートを重くするため" },
      { vi:"Để thay thế cho log", en:"To replace logs entirely", ja:"ログを完全に置き換えるため" },
      { vi:"Để test chạy nhanh hơn", en:"To make tests run faster", ja:"テストを速くするため" }
    ],
    answer: 0,
    exp: { vi:"Ảnh chụp lúc fail (kèm log) cho thấy UI thực tế tại thời điểm lỗi, giúp phân biệt lỗi thật với vấn đề đồng bộ/môi trường.", en:"A failure screenshot (with logs) shows the actual UI at the moment of error, helping distinguish real bugs from sync/environment issues.", ja:"失敗時の画面（ログ付き）は誤動作時の実UIを示し、実バグと同期・環境問題の区別を助けます。" } },

  { cat: "iv-automation",
    q: { vi:"Hooks setup/teardown (như @BeforeEach/@AfterEach) dùng để làm gì?", en:"What are setup/teardown hooks (like @BeforeEach/@AfterEach) for?", ja:"setup/teardownフック（@BeforeEach/@AfterEachなど）は何のためですか？" },
    options: [
      { vi:"Chỉ để in log màu mè", en:"Just to print colorful logs", ja:"派手なログを出すためだけ" },
      { vi:"Chuẩn bị điều kiện trước mỗi test và dọn dẹp sau đó để đảm bảo mỗi test độc lập, sạch sẽ", en:"Prepare preconditions before each test and clean up after, ensuring each test is isolated and clean", ja:"各テスト前に前提を準備し後で片付け、テストを独立で清潔に保つため" },
      { vi:"Thay thế cho assertion", en:"To replace assertions", ja:"アサーションの代わり" },
      { vi:"Chỉ chạy một lần trong toàn bộ đời dự án", en:"Run only once in the whole project life", ja:"プロジェクト全体で一度だけ実行する" }
    ],
    answer: 1,
    exp: { vi:"Hooks khởi tạo (mở browser, đăng nhập, seed data) trước test và dọn dẹp (đóng browser, xóa data) sau, giúp mỗi test bắt đầu từ trạng thái sạch.", en:"Hooks initialize (open browser, log in, seed data) before a test and clean up (close browser, remove data) after, so each test starts clean.", ja:"フックはテスト前に初期化（ブラウザ起動・ログイン・データ投入）し後に片付け（終了・削除）して各テストを清潔に始めます。" } },

  { cat: "iv-automation",
    q: { vi:"Cách tiếp cận hiệu quả cho cross-browser automation là gì?", en:"What is an effective approach to cross-browser automation?", ja:"クロスブラウザ自動化の効果的な方法は何ですか？" },
    options: [
      { vi:"Viết bộ test riêng biệt hoàn toàn cho từng trình duyệt", en:"Write a completely separate test suite for each browser", ja:"ブラウザ毎に完全に別のテストスイートを書く" },
      { vi:"Chỉ test trên một trình duyệt duy nhất mãi mãi", en:"Test on only one browser forever", ja:"永遠に一つのブラウザだけでテストする" },
      { vi:"Bỏ hết wait để chạy nhanh trên mọi trình duyệt", en:"Remove all waits to run fast on every browser", ja:"全ブラウザで速く動くよう待機を全て削除する" },
      { vi:"Dùng chung bộ test tham số hóa theo trình duyệt, chạy song song trên Grid/dịch vụ cloud", en:"Use one parameterized suite across browsers, running in parallel via Grid/cloud services", ja:"ブラウザでパラメータ化した一つのスイートをGrid・クラウドで並列実行する" }
    ],
    answer: 3,
    exp: { vi:"Tham số hóa cấu hình trình duyệt và chạy cùng một bộ test trên nhiều browser (Grid, cloud như BrowserStack) giúp phủ rộng mà không nhân bản code.", en:"Parameterize the browser config and run the same suite across browsers (Grid, cloud like BrowserStack) to gain coverage without duplicating code.", ja:"ブラウザ設定をパラメータ化し同一スイートを複数ブラウザ（Grid・BrowserStack等）で実行すれば重複なく網羅できます。" } },

  { cat: "iv-automation",
    q: { vi:"ElementNotInteractable / element not clickable thường do đâu?", en:"What commonly causes ElementNotInteractable / element not clickable?", ja:"ElementNotInteractable／要素がクリック不可の一般的な原因は何ですか？" },
    options: [
      { vi:"Do dùng CSS thay vì XPath", en:"Using CSS instead of XPath", ja:"XPathでなくCSSを使ったこと" },
      { vi:"Do quá nhiều assertion", en:"Too many assertions", ja:"アサーションが多すぎること" },
      { vi:"Element bị che khuất, chưa hiển thị đầy đủ, đang animate hoặc chưa cuộn tới trong viewport", en:"The element is covered, not fully visible, animating or not scrolled into view", ja:"要素が覆われている・未表示・アニメ中・ビューポート外である" },
      { vi:"Do report dùng nhiều màu", en:"The report uses many colors", ja:"レポートが多色だから" }
    ],
    answer: 2,
    exp: { vi:"Element có thể tồn tại trong DOM nhưng bị overlay che, đang animation, hoặc ngoài viewport; cần chờ nó actionable, cuộn tới, hoặc đóng overlay trước khi click.", en:"An element may exist in the DOM but be covered by an overlay, animating or off-screen; wait until it is actionable, scroll to it or dismiss the overlay before clicking.", ja:"要素はDOMにあってもオーバーレイに覆われ・アニメ中・画面外の場合があり、操作可能まで待つ・スクロール・オーバーレイを閉じてからクリックします。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao Selenium không phải công cụ phù hợp để test trực tiếp REST API?", en:"Why is Selenium not the right tool to test a REST API directly?", ja:"SeleniumがREST APIを直接テストするのに適さない理由は何ですか？" },
    options: [
      { vi:"Selenium được thiết kế để điều khiển trình duyệt/UI, không phải gửi và kiểm tra HTTP request/response thô", en:"Selenium is designed to drive browsers/UI, not to send and assert raw HTTP requests/responses", ja:"Seleniumはブラウザ・UI操作用で、生のHTTPリクエスト・レスポンスの送信・検証用ではない" },
      { vi:"Vì Selenium không hỗ trợ Java", en:"Because Selenium does not support Java", ja:"SeleniumがJavaをサポートしないから" },
      { vi:"Vì API luôn trả về HTML", en:"Because APIs always return HTML", ja:"APIは常にHTMLを返すから" },
      { vi:"Vì API không có status code", en:"Because APIs have no status codes", ja:"APIにステータスコードがないから" }
    ],
    answer: 0,
    exp: { vi:"Selenium chuyên điều khiển UI qua trình duyệt; để test API nên dùng RestAssured, Postman/Newman hoặc thư viện HTTP client kiểm tra status, body, header.", en:"Selenium specializes in driving the UI via a browser; for API testing use RestAssured, Postman/Newman or HTTP client libraries to assert status, body and headers.", ja:"SeleniumはUI操作専門で、APIテストにはRestAssuredやPostman/Newman、HTTPクライアントでステータス・ボディ・ヘッダを検証します。" } },

  { cat: "iv-automation",
    q: { vi:"Khi automation một REST API, kiểm chứng cơ bản nhất thường là gì?", en:"When automating a REST API, what is a most basic assertion?", ja:"REST APIを自動化する際、最も基本的な検証は何ですか？" },
    options: [
      { vi:"Màu nền của trang", en:"The page background color", ja:"ページの背景色" },
      { vi:"Kiểm tra HTTP status code (ví dụ 200, 201, 400, 404) đúng như mong đợi", en:"Checking the HTTP status code (e.g. 200, 201, 400, 404) matches expectations", ja:"HTTPステータスコード（200・201・400・404など）が期待通りか確認する" },
      { vi:"Vị trí con trỏ chuột", en:"The mouse cursor position", ja:"マウスカーソルの位置" },
      { vi:"Phông chữ trong response", en:"The font in the response", ja:"レスポンスのフォント" }
    ],
    answer: 1,
    exp: { vi:"Assert status code là bước cơ bản, sau đó kiểm tra body (schema, giá trị), header và thời gian phản hồi để đánh giá đầy đủ hơn.", en:"Asserting the status code is fundamental, then validate the body (schema, values), headers and response time for fuller coverage.", ja:"ステータスコードの検証は基本で、続いてボディ（スキーマ・値）・ヘッダ・応答時間も確認します。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao framework automation nên độc lập với môi trường (URL, tài khoản, cấu hình)?", en:"Why should an automation framework be independent of environment (URL, accounts, config)?", ja:"自動化フレームワークが環境（URL・アカウント・設定）から独立すべき理由は何ですか？" },
    options: [
      { vi:"Để không cần assertion", en:"So no assertions are needed", ja:"アサーションが不要になるから" },
      { vi:"Để test không bao giờ fail", en:"So tests never fail", ja:"テストが決して失敗しないから" },
      { vi:"Để chỉ chạy được trên máy tác giả", en:"So it runs only on the author's machine", ja:"作者のマシンでのみ動くように" },
      { vi:"Để cùng bộ test chạy được trên dev/staging/prod chỉ bằng đổi cấu hình, tăng tính tái sử dụng và bảo trì", en:"So the same suite runs on dev/staging/prod just by switching config, improving reuse and maintenance", ja:"設定切替だけで同一スイートをdev/staging/prodで実行でき、再利用性と保守性が上がる" }
    ],
    answer: 3,
    exp: { vi:"Tách cấu hình môi trường ra ngoài (file/biến môi trường) cho phép chạy cùng bộ test ở nhiều môi trường mà không sửa code, dễ tích hợp CI.", en:"Externalizing environment config (files/env vars) lets the same suite run in many environments without code changes, easing CI integration.", ja:"環境設定を外部化（ファイル・環境変数）すれば、コード変更なしで同一スイートを各環境で実行でき、CI統合も容易です。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao chờ cứng (hard-coded wait) là anti-pattern trong automation?", en:"Why are hard-coded waits an anti-pattern in automation?", ja:"固定待機（ハードコードwait）が自動化のアンチパターンなのはなぜですか？" },
    options: [
      { vi:"Chúng làm test vừa chậm (chờ thừa) vừa không đáng tin (chờ thiếu khi hệ thống chậm bất thường)", en:"They make tests both slow (waiting too long) and unreliable (too short when the system is unusually slow)", ja:"待ちすぎで遅く、遅延時には短すぎて信頼できない" },
      { vi:"Chúng không biên dịch được", en:"They do not compile", ja:"コンパイルできない" },
      { vi:"Chúng chỉ hoạt động với API", en:"They only work with APIs", ja:"APIでのみ動く" },
      { vi:"Chúng khiến báo cáo mất màu", en:"They remove color from reports", ja:"レポートの色を消す" }
    ],
    answer: 0,
    exp: { vi:"Sleep cố định không phản ánh trạng thái thật của ứng dụng nên vừa tốn thời gian vừa dễ flaky; explicit wait theo điều kiện là lựa chọn đúng.", en:"Fixed sleeps ignore the app's real state, wasting time and inviting flakiness; condition-based explicit waits are the correct choice.", ja:"固定sleepはアプリの実状態を無視し、時間を浪費しフレーキーを招くため、条件ベースの明示的待機が正解です。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao code review cho test automation cũng quan trọng như review code sản phẩm?", en:"Why is code review of automation tests as important as reviewing product code?", ja:"自動テストのコードレビューが製品コードのレビューと同じくらい重要なのはなぜですか？" },
    options: [
      { vi:"Vì test không bao giờ có bug", en:"Because tests never have bugs", ja:"テストにバグは決してないから" },
      { vi:"Vì review làm test chạy nhanh hơn", en:"Because review makes tests run faster", ja:"レビューでテストが速くなるから" },
      { vi:"Test code cũng là code: có thể sai, flaky, khó bảo trì; review đảm bảo chất lượng, tính đúng và khả năng bảo trì", en:"Test code is code too: it can be wrong, flaky and hard to maintain; review ensures quality, correctness and maintainability", ja:"テストコードもコードであり、誤り・フレーキー・保守困難になり得るため、レビューで品質・正確性・保守性を担保する" },
      { vi:"Vì review thay thế cho việc chạy test", en:"Because review replaces running tests", ja:"レビューがテスト実行の代わりになるから" }
    ],
    answer: 2,
    exp: { vi:"Test tự động sai có thể tạo niềm tin giả (pass nhưng không kiểm đúng); review giúp bắt logic sai, locator yếu, thiếu assertion và giữ code sạch, dễ bảo trì.", en:"Faulty automation can create false confidence (passing without truly checking); review catches wrong logic, weak locators, missing assertions and keeps code clean and maintainable.", ja:"欠陥ある自動テストは誤った安心（実際に検証せず合格）を生むため、レビューで誤ロジック・弱いロケーター・検証漏れを捉え保守性を保ちます。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao test scripts nên được đưa vào version control (Git)?", en:"Why should test scripts be kept in version control (Git)?", ja:"テストスクリプトをバージョン管理（Git）に置くべき理由は何ですか？" },
    options: [
      { vi:"Để làm script chạy nhanh hơn", en:"To make scripts run faster", ja:"スクリプトを速くするため" },
      { vi:"Theo dõi thay đổi, cộng tác nhóm, review, phục hồi phiên bản và đồng bộ với code sản phẩm", en:"Track changes, enable collaboration, reviews, rollback and keep in sync with product code", ja:"変更追跡・チーム協働・レビュー・巻き戻し・製品コードとの同期のため" },
      { vi:"Để tự động sinh test data", en:"To auto-generate test data", ja:"テストデータを自動生成するため" },
      { vi:"Để không cần CI", en:"To avoid needing CI", ja:"CIを不要にするため" }
    ],
    answer: 1,
    exp: { vi:"Version control giúp theo dõi lịch sử, làm việc nhóm qua branch/PR, review, rollback khi cần và giữ test đồng bộ với code, là nền tảng cho CI.", en:"Version control tracks history, enables teamwork via branches/PRs, review, rollback and keeps tests in sync with code, forming the basis for CI.", ja:"バージョン管理は履歴追跡・ブランチ/PRでの協働・レビュー・巻き戻し・コード同期を可能にし、CIの基盤となります。" } },

  { cat: "iv-automation",
    q: { vi:"Cơ chế retry trong CI đối với test đôi khi flaky nên được dùng như thế nào?", en:"How should a retry mechanism for occasionally flaky tests in CI be used?", ja:"CIでたまにフレーキーになるテストのリトライ機構はどう使うべきですか？" },
    options: [
      { vi:"Retry vô hạn để không bao giờ thấy fail", en:"Retry infinitely so failures never show", ja:"失敗が見えないよう無限にリトライする" },
      { vi:"Retry mọi test 50 lần bất kể lý do", en:"Retry every test 50 times regardless", ja:"理由を問わず全テストを50回リトライする" },
      { vi:"Không bao giờ dùng retry trong bất kỳ hoàn cảnh nào", en:"Never use retries under any circumstance", ja:"いかなる場合もリトライを使わない" },
      { vi:"Dùng số lần retry giới hạn như biện pháp giảm nhiễu tạm thời, đồng thời theo dõi và sửa nguyên nhân gốc của flaky", en:"Use a limited number of retries as a temporary noise-reduction measure while tracking and fixing the root flaky cause", ja:"限定回数のリトライを一時的なノイズ低減策とし、同時に根本原因を追跡・修正する" }
    ],
    answer: 3,
    exp: { vi:"Retry giới hạn giúp pipeline bớt nhiễu tạm thời, nhưng phải theo dõi tỷ lệ flaky và sửa gốc rễ; lạm dụng retry sẽ che giấu lỗi thật.", en:"Limited retries reduce temporary noise, but you must track flaky rates and fix root causes; overusing retries hides real defects.", ja:"限定リトライは一時的なノイズを減らしますが、フレーキー率を追跡し根本修正が必要で、乱用は実バグを隠します。" } },

  { cat: "iv-automation",
    q: { vi:"Explicit wait hoạt động theo cơ chế nào để hiệu quả hơn sleep cứng?", en:"By what mechanism does an explicit wait work more efficiently than a hard sleep?", ja:"明示的待機が固定sleepより効率的なのはどんな仕組みですか？" },
    options: [
      { vi:"Nó polling điều kiện định kỳ và tiếp tục ngay khi điều kiện đúng, không chờ hết thời gian tối đa nếu không cần", en:"It polls the condition periodically and proceeds as soon as it is met, not always waiting the full timeout", ja:"条件を定期的にポーリングし、成立次第すぐ進み、必要なければ最大時間まで待たない" },
      { vi:"Nó luôn chờ đủ thời gian tối đa mỗi lần", en:"It always waits the full maximum time each time", ja:"毎回必ず最大時間待つ" },
      { vi:"Nó bỏ qua mọi điều kiện", en:"It ignores all conditions", ja:"すべての条件を無視する" },
      { vi:"Nó tắt trình duyệt trong lúc chờ", en:"It shuts the browser while waiting", ja:"待機中にブラウザを閉じる" }
    ],
    answer: 0,
    exp: { vi:"Explicit wait kiểm tra điều kiện theo chu kỳ polling và thoát ngay khi thỏa mãn, nên nhanh khi hệ thống nhanh và vẫn kiên nhẫn đến timeout khi chậm.", en:"An explicit wait polls the condition at intervals and exits as soon as it is satisfied, so it is fast when the system is fast yet patient up to the timeout when slow.", ja:"明示的待機は一定間隔で条件を確認し成立次第終了するため、速いときは速く、遅いときはタイムアウトまで待ちます。" } },

  { cat: "iv-automation",
    q: { vi:"Vì sao KHÔNG nên tự động hóa 100% và bỏ hoàn toàn manual/exploratory?", en:"Why should you NOT automate 100% and drop all manual/exploratory testing?", ja:"100%自動化して手動・探索的テストを完全に捨てるべきでないのはなぜですか？" },
    options: [
      { vi:"Vì automation quá rẻ", en:"Because automation is too cheap", ja:"自動化が安すぎるから" },
      { vi:"Vì manual không tìm được bug nào", en:"Because manual finds no bugs", ja:"手動はバグを見つけられないから" },
      { vi:"Automation kiểm được cái đã biết/kịch bản hóa; con người vẫn cần cho exploratory, usability, cảm nhận và tình huống bất ngờ", en:"Automation checks known/scripted things; humans are still needed for exploratory, usability, judgment and unexpected cases", ja:"自動化は既知・台本化された確認向け。探索・ユーザビリティ・判断・想定外は人間が必要" },
      { vi:"Vì máy tính không hỗ trợ automation", en:"Because computers do not support automation", ja:"コンピュータが自動化に対応しないから" }
    ],
    answer: 2,
    exp: { vi:"Automation mạnh ở kiểm tra hồi quy lặp lại điều đã biết, nhưng exploratory testing của con người phát hiện lỗi mới, vấn đề usability và tình huống ngoài kịch bản.", en:"Automation excels at repeatable regression of known behavior, but human exploratory testing uncovers new defects, usability issues and off-script situations.", ja:"自動化は既知の回帰確認に強い一方、人間の探索的テストは新規不具合・ユーザビリティ・想定外を発見します。" } },

  { cat: "iv-automation",
    q: { vi:"Relative locators trong Selenium 4 cho phép làm gì?", en:"What do Selenium 4 relative locators enable?", ja:"Selenium 4の相対ロケーターは何を可能にしますか？" },
    options: [
      { vi:"Tự động sửa lỗi trong ứng dụng", en:"Auto-fix bugs in the app", ja:"アプリのバグを自動修正する" },
      { vi:"Tìm phần tử theo vị trí tương đối so với phần tử khác (above, below, toLeftOf, toRightOf, near)", en:"Locate elements by position relative to another element (above, below, toLeftOf, toRightOf, near)", ja:"他要素との相対位置（above・below・toLeftOf・toRightOf・near）で要素を特定する" },
      { vi:"Chạy test mà không cần trình duyệt", en:"Run tests without any browser", ja:"ブラウザなしでテストを実行する" },
      { vi:"Thay thế hoàn toàn cho assertion", en:"Fully replace assertions", ja:"アサーションを完全に置き換える" }
    ],
    answer: 1,
    exp: { vi:"Relative locators (còn gọi friendly locators) định vị element dựa trên quan hệ trực quan với element khác, hữu ích khi layout dễ mô tả theo vị trí.", en:"Relative (friendly) locators find elements based on their visual relationship to another element, handy when layout is easy to describe by position.", ja:"相対（フレンドリー）ロケーターは他要素との視覚的関係で要素を特定し、位置で説明しやすいレイアウトに便利です。" } },

  { cat: "iv-automation",
    q: { vi:"Áp dụng nguyên tắc DRY vào automation mang lại điều gì?", en:"What does applying the DRY principle to automation achieve?", ja:"DRY原則を自動化に適用すると何が得られますか？" },
    options: [
      { vi:"Làm mỗi test hoàn toàn tách biệt bằng cách sao chép code khắp nơi", en:"Makes each test fully separate by copying code everywhere", ja:"コードを至る所に複製し各テストを完全分離する" },
      { vi:"Tăng số dòng code để trông chuyên nghiệp", en:"Increases lines of code to look professional", ja:"プロっぽく見せるため行数を増やす" },
      { vi:"Xóa mọi comment", en:"Removes all comments", ja:"全コメントを削除する" },
      { vi:"Gộp logic lặp lại vào hàm/component tái sử dụng nên khi thay đổi chỉ sửa một nơi, giảm lỗi và chi phí bảo trì", en:"Consolidates repeated logic into reusable functions/components so a change is made in one place, reducing bugs and maintenance", ja:"重複ロジックを再利用可能な関数・部品にまとめ、変更を一箇所で行いバグと保守を減らす" }
    ],
    answer: 3,
    exp: { vi:"DRY (Don't Repeat Yourself) loại bỏ trùng lặp bằng cách trừu tượng hóa logic dùng chung; khi cần đổi chỉ sửa một chỗ, giảm rủi ro sai sót và công bảo trì.", en:"DRY (Don't Repeat Yourself) removes duplication by abstracting shared logic; a change is made once, lowering error risk and maintenance effort.", ja:"DRYは共通ロジックを抽象化して重複を排除し、変更は一度で済むため誤りと保守労力を減らします。" } }
];
