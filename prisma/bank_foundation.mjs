export const DATA = [
  {
    q: { vi: "Mục tiêu điển hình của kiểm thử là gì?", en: "What is a typical objective of testing?", ja: "テストの典型的な目的は何か？" },
    options: [
      { vi: "Phát hiện lỗi và ngăn ngừa lỗi, đánh giá chất lượng, tăng sự tự tin về mức chất lượng", en: "To find defects, prevent defects, evaluate quality and build confidence in the level of quality", ja: "欠陥を発見・予防し、品質を評価し、品質レベルに対する自信を高めること" },
      { vi: "Chứng minh phần mềm hoàn toàn không có lỗi", en: "To prove the software is completely free of defects", ja: "ソフトウェアに欠陥が全くないことを証明すること" },
      { vi: "Thay thế hoàn toàn hoạt động gỡ lỗi (debugging)", en: "To completely replace debugging activities", ja: "デバッグ作業を完全に置き換えること" },
      { vi: "Chỉ để tuân thủ hợp đồng và quy định pháp lý", en: "Only to comply with contracts and legal regulations", ja: "契約や法規制を遵守することだけ" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử có nhiều mục tiêu: tìm lỗi, phòng ngừa, đánh giá chất lượng và tạo sự tự tin, chứ không phải chứng minh không còn lỗi.", en: "Testing has several objectives: finding defects, preventing them, evaluating quality and building confidence, not proving absence of defects.", ja: "テストには欠陥発見、予防、品質評価、自信構築など複数の目的があり、欠陥ゼロの証明ではない。" }
  },
  {
    q: { vi: "Nguyên lý 「Kiểm thử cho thấy sự hiện diện của lỗi」 có nghĩa là gì?", en: "What does the principle 'Testing shows the presence of defects' mean?", ja: "「テストは欠陥の存在を示す」という原則は何を意味するか？" },
    options: [
      { vi: "Kiểm thử có thể chứng minh rằng không còn lỗi nào", en: "Testing can prove that there are no defects", ja: "テストは欠陥がないことを証明できる" },
      { vi: "Kiểm thử có thể cho thấy có lỗi nhưng không thể chứng minh không có lỗi", en: "Testing can show defects are present but cannot prove there are no defects", ja: "テストは欠陥の存在を示せるが、欠陥がないことは証明できない" },
      { vi: "Kiểm thử loại bỏ mọi rủi ro của sản phẩm", en: "Testing removes all product risk", ja: "テストは製品のすべてのリスクを取り除く" },
      { vi: "Kiểm thử luôn tìm được toàn bộ lỗi", en: "Testing always finds all defects", ja: "テストは常にすべての欠陥を見つける" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử giảm xác suất lỗi còn sót nhưng không phải bằng chứng cho việc không còn lỗi.", en: "Testing reduces the probability of remaining defects but is not proof of correctness.", ja: "テストは残存欠陥の確率を減らすが、正しさの証明にはならない。" }
  },
  {
    q: { vi: "Nguyên lý 「Kiểm thử toàn diện là bất khả thi」 hàm ý điều gì?", en: "What does the principle 'Exhaustive testing is impossible' imply?", ja: "「網羅的テストは不可能」という原則は何を含意するか？" },
    options: [
      { vi: "Không cần kiểm thử vì kiểm thử không có giá trị", en: "No need to test because testing has no value", ja: "テストには価値がないので不要である" },
      { vi: "Chỉ kiểm thử giao diện người dùng là đủ", en: "Testing only the user interface is enough", ja: "ユーザーインターフェースだけのテストで十分" },
      { vi: "Nên tập trung nỗ lực kiểm thử bằng phân tích rủi ro và mức ưu tiên thay vì kiểm thử mọi thứ", en: "Test effort should be focused using risk analysis and priorities rather than testing everything", ja: "すべてをテストするのではなく、リスク分析と優先順位でテスト作業を集中させるべき" },
      { vi: "Kiểm thử toàn diện luôn khả thi nếu có đủ thời gian", en: "Exhaustive testing is always possible with enough time", ja: "十分な時間があれば網羅的テストは常に可能" }
    ],
    answer: 2,
    exp: { vi: "Trừ trường hợp rất đơn giản, không thể kiểm thử mọi tổ hợp; cần ưu tiên theo rủi ro.", en: "Except in trivial cases, all combinations cannot be tested; prioritization by risk is needed.", ja: "些細な場合を除きすべての組み合わせはテストできず、リスクに基づく優先順位付けが必要。" }
  },
  {
    q: { vi: "Nguyên lý 「Kiểm thử sớm giúp tiết kiệm thời gian và chi phí」 khuyến nghị điều gì?", en: "What does the principle 'Early testing saves time and money' recommend?", ja: "「早期テストは時間とコストを節約する」という原則は何を推奨するか？" },
    options: [
      { vi: "Chỉ kiểm thử sau khi phát hành sản phẩm", en: "Only test after the product is released", ja: "製品リリース後にのみテストする" },
      { vi: "Chỉ kiểm thử ở giai đoạn kiểm thử hệ thống", en: "Test only at the system test stage", ja: "システムテスト段階でのみテストする" },
      { vi: "Trì hoãn kiểm thử đến khi mã nguồn hoàn tất", en: "Delay testing until coding is complete", ja: "コーディング完了までテストを遅らせる" },
      { vi: "Bắt đầu hoạt động kiểm thử (kể cả kiểm thử tĩnh) càng sớm càng tốt trong vòng đời", en: "Start testing activities (including static testing) as early as possible in the lifecycle", ja: "ライフサイクルの早い段階で（静的テストを含め）テスト活動を開始する" }
    ],
    answer: 3,
    exp: { vi: "Lỗi phát hiện càng sớm càng rẻ; kiểm thử tĩnh trên tài liệu giúp phát hiện lỗi trước khi viết mã.", en: "Defects found earlier are cheaper; static testing on documents finds defects before coding.", ja: "早く見つかった欠陥ほど安く済み、文書に対する静的テストはコーディング前に欠陥を発見する。" }
  },
  {
    q: { vi: "Nghịch lý thuốc trừ sâu (pesticide paradox) trong kiểm thử là gì?", en: "What is the 'pesticide paradox' in testing?", ja: "テストにおける「殺虫剤のパラドックス」とは何か？" },
    options: [
      { vi: "Lặp lại cùng một bộ kiểm thử sẽ dần không còn tìm thấy lỗi mới; cần rà soát và cập nhật ca kiểm thử", en: "Repeating the same tests will eventually stop finding new defects; tests need to be reviewed and updated", ja: "同じテストを繰り返すと新しい欠陥を見つけられなくなるため、テストの見直しと更新が必要" },
      { vi: "Lỗi luôn tập trung ở một mô-đun duy nhất", en: "Defects always cluster in a single module", ja: "欠陥は常に単一モジュールに集中する" },
      { vi: "Nhiều lỗi hơn sẽ xuất hiện khi thêm ca kiểm thử", en: "More defects appear when more test cases are added", ja: "テストケースを追加すると欠陥が増える" },
      { vi: "Công cụ tự động luôn tìm nhiều lỗi hơn con người", en: "Automation tools always find more defects than humans", ja: "自動化ツールは常に人間より多くの欠陥を見つける" }
    ],
    answer: 0,
    exp: { vi: "Cần đa dạng hóa và cập nhật ca kiểm thử để phát hiện các lỗi khác nhau.", en: "Test cases must be varied and updated to detect different defects.", ja: "異なる欠陥を検出するにはテストケースを多様化・更新する必要がある。" }
  },
  {
    q: { vi: "Nguyên lý 「Kiểm thử phụ thuộc vào ngữ cảnh」 nghĩa là gì?", en: "What does 'Testing is context dependent' mean?", ja: "「テストは状況に依存する」とはどういう意味か？" },
    options: [
      { vi: "Mọi hệ thống đều được kiểm thử theo cùng một cách", en: "Every system is tested in exactly the same way", ja: "すべてのシステムはまったく同じ方法でテストされる" },
      { vi: "Cách kiểm thử khác nhau tùy loại phần mềm, rủi ro và bối cảnh (ví dụ web thương mại và phần mềm y tế)", en: "Testing is done differently depending on software type, risk and context (e.g. e-commerce web vs. medical software)", ja: "ソフトウェアの種類、リスク、状況（例：ECサイトと医療ソフトウェア）に応じてテストの方法が異なる" },
      { vi: "Kiểm thử chỉ phụ thuộc vào ngôn ngữ lập trình", en: "Testing depends only on the programming language", ja: "テストはプログラミング言語のみに依存する" },
      { vi: "Ngữ cảnh không ảnh hưởng đến kiểm thử", en: "Context does not affect testing", ja: "状況はテストに影響しない" }
    ],
    answer: 1,
    exp: { vi: "Mức độ và cách kiểm thử phụ thuộc vào rủi ro, quy định, lĩnh vực và các yếu tố ngữ cảnh.", en: "The level and approach of testing depend on risk, regulations, domain and context factors.", ja: "テストのレベルや手法はリスク、規制、ドメイン、状況要因に依存する。" }
  },
  {
    q: { vi: "Ngộ nhận 「không có lỗi」 (absence-of-errors fallacy) là gì?", en: "What is the 'absence-of-errors fallacy'?", ja: "「欠陥ゼロの落とし穴」とは何か？" },
    options: [
      { vi: "Một hệ thống không lỗi luôn thành công trên thị trường", en: "A defect-free system is always successful in the market", ja: "欠陥のないシステムは市場で必ず成功する" },
      { vi: "Lỗi không bao giờ ảnh hưởng đến người dùng", en: "Defects never affect users", ja: "欠陥は利用者に影響を与えない" },
      { vi: "Việc tìm và sửa nhiều lỗi vẫn có thể tạo ra hệ thống không đáp ứng nhu cầu và kỳ vọng người dùng", en: "Finding and fixing many defects may still result in a system that does not meet users' needs and expectations", ja: "多くの欠陥を発見・修正しても、利用者のニーズや期待を満たさないシステムになることがある" },
      { vi: "Càng ít lỗi thì càng ít cần kiểm thử", en: "Fewer defects means less testing is needed", ja: "欠陥が少なければテストも少なくて済む" }
    ],
    answer: 2,
    exp: { vi: "Phần mềm có thể ít lỗi nhưng vẫn không dùng được nếu không đáp ứng nhu cầu thực tế.", en: "Software can have few defects yet be unusable if it does not meet actual needs.", ja: "欠陥が少なくても実際のニーズを満たさなければ使えない場合がある。" }
  },
  {
    q: { vi: "Trong bối cảnh kiểm thử, 「error」, 「defect」 và 「failure」 khác nhau thế nào?", en: "How do 'error', 'defect' and 'failure' differ in testing?", ja: "テストにおいて「エラー」「欠陥」「故障」はどう異なるか？" },
    options: [
      { vi: "Chúng là các từ đồng nghĩa hoàn toàn", en: "They are complete synonyms", ja: "これらは完全な同義語である" },
      { vi: "Failure luôn xảy ra trước defect", en: "A failure always happens before a defect", ja: "故障は常に欠陥の前に発生する" },
      { vi: "Defect chỉ tồn tại trong tài liệu, không có trong mã", en: "A defect exists only in documents, not in code", ja: "欠陥は文書にのみ存在し、コードには存在しない" },
      { vi: "Con người gây ra error (sai lầm) dẫn tới defect (khiếm khuyết) trong sản phẩm, và defect có thể gây failure (sự cố khi vận hành)", en: "A human makes an error (mistake) leading to a defect in the product, and a defect can cause a failure when executed", ja: "人がエラー（間違い）を犯し欠陥が生じ、欠陥が実行時に故障を引き起こす" }
    ],
    answer: 3,
    exp: { vi: "Error là hành động của con người; defect là kết quả trong sản phẩm; failure là biểu hiện khi thực thi.", en: "An error is a human action; a defect is its result in the product; a failure is the manifestation at execution.", ja: "エラーは人の行為、欠陥はその結果、故障は実行時の現れである。" }
  },
  {
    q: { vi: "Yếu tố nào KHÔNG phải là nguyên nhân gốc rễ điển hình của lỗi?", en: "Which is NOT a typical root cause of a defect?", ja: "欠陥の典型的な根本原因でないものはどれか？" },
    options: [
      { vi: "Một failure quan sát được trong quá trình vận hành", en: "A failure observed during operation", ja: "運用中に観測された故障" },
      { vi: "Áp lực thời gian", en: "Time pressure", ja: "時間的プレッシャー" },
      { vi: "Sự phức tạp của mã nguồn hoặc cơ sở hạ tầng", en: "Code or infrastructure complexity", ja: "コードやインフラの複雑さ" },
      { vi: "Hiểu lầm hoặc thiếu giao tiếp", en: "Misunderstanding or lack of communication", ja: "誤解やコミュニケーション不足" }
    ],
    answer: 0,
    exp: { vi: "Failure là hệ quả, không phải nguyên nhân gốc; các yếu tố còn lại đều là nguyên nhân gốc điển hình.", en: "A failure is a consequence, not a root cause; the others are typical root causes.", ja: "故障は結果であり根本原因ではない。他は典型的な根本原因である。" }
  },
  {
    q: { vi: "Truy xuất (traceability) giữa cơ sở kiểm thử và sản phẩm công việc kiểm thử mang lại lợi ích gì?", en: "What benefit does traceability between the test basis and test work products provide?", ja: "テストベースとテスト成果物間のトレーサビリティにはどんな利点があるか？" },
    options: [
      { vi: "Loại bỏ hoàn toàn nhu cầu quản lý kiểm thử", en: "Eliminates the need for test management entirely", ja: "テストマネジメントの必要性を完全になくす" },
      { vi: "Giúp đánh giá độ bao phủ, phân tích tác động và hỗ trợ kiểm toán", en: "Helps assess coverage, perform impact analysis and support auditing", ja: "カバレッジ評価、影響分析、監査支援に役立つ" },
      { vi: "Chỉ hữu ích cho kiểm thử tự động", en: "Is only useful for automated testing", ja: "自動テストにのみ有用である" },
      { vi: "Không liên quan tới yêu cầu", en: "Is unrelated to requirements", ja: "要件とは無関係である" }
    ],
    answer: 1,
    exp: { vi: "Truy xuất giúp kiểm tra độ bao phủ yêu cầu, phân tích ảnh hưởng khi thay đổi và phục vụ kiểm toán.", en: "Traceability enables checking requirement coverage, impact analysis on changes and audits.", ja: "トレーサビリティは要件カバレッジ確認、変更影響分析、監査を可能にする。" }
  },
  {
    q: { vi: "Hoạt động nào thuộc quá trình kiểm thử theo trình tự đúng?", en: "Which is the correct order of test process activities?", ja: "テストプロセス活動の正しい順序はどれか？" },
    options: [
      { vi: "Thiết kế kiểm thử → Lập kế hoạch → Phân tích → Thực thi", en: "Test design → Planning → Analysis → Execution", ja: "テスト設計 → 計画 → 分析 → 実行" },
      { vi: "Thực thi → Phân tích → Lập kế hoạch", en: "Execution → Analysis → Planning", ja: "実行 → 分析 → 計画" },
      { vi: "Lập kế hoạch → Giám sát và kiểm soát → Phân tích → Thiết kế → Hiện thực → Thực thi → Hoàn thành", en: "Planning → Monitoring and control → Analysis → Design → Implementation → Execution → Completion", ja: "計画 → 監視とコントロール → 分析 → 設計 → 実装 → 実行 → 完了" },
      { vi: "Hoàn thành → Thực thi → Thiết kế", en: "Completion → Execution → Design", ja: "完了 → 実行 → 設計" }
    ],
    answer: 2,
    exp: { vi: "CTFL v4.0 nêu các hoạt động: lập kế hoạch, giám sát/kiểm soát, phân tích, thiết kế, hiện thực, thực thi, hoàn thành.", en: "CTFL v4.0 lists: planning, monitoring and control, analysis, design, implementation, execution, completion.", ja: "CTFL v4.0では計画、監視とコントロール、分析、設計、実装、実行、完了の活動が挙げられる。" }
  },
  {
    q: { vi: "Sản phẩm công việc nào là kết quả của hoạt động phân tích kiểm thử?", en: "Which work product results from the test analysis activity?", ja: "テスト分析活動の成果物はどれか？" },
    options: [
      { vi: "Nhật ký kiểm thử (test logs)", en: "Test logs", ja: "テストログ" },
      { vi: "Báo cáo tổng kết kiểm thử (test summary report)", en: "Test summary report", ja: "テストサマリレポート" },
      { vi: "Dữ liệu kiểm thử đã tạo (test data)", en: "Created test data", ja: "作成されたテストデータ" },
      { vi: "Điều kiện kiểm thử (test conditions) đã xác định và ưu tiên", en: "Defined and prioritized test conditions", ja: "定義され優先順位付けされたテスト条件" }
    ],
    answer: 3,
    exp: { vi: "Phân tích kiểm thử xác định 「kiểm thử cái gì」, tạo ra các điều kiện kiểm thử.", en: "Test analysis determines 'what to test', producing test conditions.", ja: "テスト分析は「何をテストするか」を決め、テスト条件を生み出す。" }
  },
  {
    q: { vi: "Hoạt động 「thiết kế kiểm thử」 trả lời cho câu hỏi nào?", en: "The 'test design' activity answers which question?", ja: "「テスト設計」活動はどの問いに答えるか？" },
    options: [
      { vi: "Kiểm thử như thế nào?", en: "How to test?", ja: "どのようにテストするか？" },
      { vi: "Kiểm thử cái gì?", en: "What to test?", ja: "何をテストするか？" },
      { vi: "Khi nào dừng kiểm thử?", en: "When to stop testing?", ja: "いつテストを止めるか？" },
      { vi: "Ai sẽ kiểm thử?", en: "Who will test?", ja: "誰がテストするか？" }
    ],
    answer: 0,
    exp: { vi: "Thiết kế kiểm thử biến điều kiện kiểm thử thành ca kiểm thử, trả lời 「kiểm thử như thế nào」.", en: "Test design turns test conditions into test cases, answering 'how to test'.", ja: "テスト設計はテスト条件をテストケースに変換し「どうテストするか」に答える。" }
  },
  {
    q: { vi: "Tư duy phản biện và sự hoài nghi lành mạnh quan trọng với tester vì lý do gì?", en: "Why are critical thinking and healthy skepticism important for testers?", ja: "批判的思考と健全な懐疑心がテスターに重要なのはなぜか？" },
    options: [
      { vi: "Để nghi ngờ mọi đồng nghiệp", en: "To distrust every colleague", ja: "すべての同僚を疑うため" },
      { vi: "Để phát hiện các giả định sai và lỗi mà người khác có thể bỏ sót", en: "To uncover wrong assumptions and defects others may overlook", ja: "他者が見落とす誤った前提や欠陥を発見するため" },
      { vi: "Để tránh phải giao tiếp với lập trình viên", en: "To avoid communicating with developers", ja: "開発者とのコミュニケーションを避けるため" },
      { vi: "Để làm chậm dự án", en: "To slow down the project", ja: "プロジェクトを遅らせるため" }
    ],
    answer: 1,
    exp: { vi: "Tư duy phản biện giúp tester đặt câu hỏi và tìm ra vấn đề tiềm ẩn.", en: "Critical thinking helps testers question and find hidden problems.", ja: "批判的思考はテスターが問いを立て潜在的な問題を見つけるのを助ける。" }
  },
  {
    q: { vi: "Vì sao độc lập trong kiểm thử (test independence) có thể hữu ích?", en: "Why can independence in testing be beneficial?", ja: "テストの独立性はなぜ有益になり得るか？" },
    options: [
      { vi: "Người độc lập hiểu mã tốt hơn tác giả", en: "Independent people understand the code better than the author", ja: "独立した人は作成者よりコードをよく理解する" },
      { vi: "Độc lập luôn tốt hơn tự kiểm thử trong mọi trường hợp", en: "Independence is always better than self-testing in all cases", ja: "独立性はあらゆる場合で自己テストより常に優れる" },
      { vi: "Người kiểm thử độc lập thường ít bị thiên kiến của tác giả và nhận ra loại lỗi khác", en: "Independent testers are often less subject to author bias and recognize different kinds of defects", ja: "独立したテスターは作成者のバイアスを受けにくく、異なる種類の欠陥に気づく" },
      { vi: "Độc lập loại bỏ nhu cầu giao tiếp", en: "Independence removes the need to communicate", ja: "独立性はコミュニケーションの必要をなくす" }
    ],
    answer: 2,
    exp: { vi: "Độc lập giảm thiên kiến nhưng cần cân bằng vì có thể thiếu hiểu biết về hệ thống.", en: "Independence reduces bias but must be balanced as it may lack system knowledge.", ja: "独立性はバイアスを減らすが、システム知識の不足とのバランスが必要。" }
  },
  {
    q: { vi: "Kỹ năng nào KHÔNG phải là kỹ năng chung điển hình cần có của một tester?", en: "Which is NOT a typical generic skill needed by a tester?", ja: "テスターに必要な典型的な一般スキルでないものはどれか？" },
    options: [
      { vi: "Kỹ năng giao tiếp và làm việc nhóm", en: "Communication and teamwork skills", ja: "コミュニケーションとチームワークのスキル" },
      { vi: "Kiến thức lĩnh vực và kỹ thuật", en: "Domain and technical knowledge", ja: "ドメインと技術の知識" },
      { vi: "Tư duy phân tích và chú ý đến chi tiết", en: "Analytical thinking and attention to detail", ja: "分析的思考と細部への注意" },
      { vi: "Khả năng viết mã sản xuất phức tạp thay cho lập trình viên", en: "Ability to write complex production code instead of developers", ja: "開発者の代わりに複雑な製品コードを書く能力" }
    ],
    answer: 3,
    exp: { vi: "Tester không bắt buộc phải viết mã sản xuất; các kỹ năng còn lại là điển hình.", en: "Testers are not required to write production code; the other skills are typical.", ja: "テスターは製品コードを書く必要はなく、他は典型的なスキルである。" }
  },
  {
    q: { vi: "Trong DevOps, kiểm thử liên tục (continuous testing) đóng góp điều gì?", en: "In DevOps, what does continuous testing contribute?", ja: "DevOpsにおいて継続的テストは何に貢献するか？" },
    options: [
      { vi: "Cung cấp phản hồi nhanh về chất lượng thông qua kiểm thử tự động trong pipeline CI/CD", en: "Provides fast feedback on quality via automated tests in the CI/CD pipeline", ja: "CI/CDパイプライン内の自動テストで品質に関する迅速なフィードバックを提供する" },
      { vi: "Loại bỏ hoàn toàn nhu cầu kiểm thử thủ công", en: "Completely removes the need for manual testing", ja: "手動テストの必要性を完全になくす" },
      { vi: "Trì hoãn phản hồi cho đến khi phát hành", en: "Delays feedback until release", ja: "リリースまでフィードバックを遅らせる" },
      { vi: "Chỉ áp dụng cho kiểm thử hiệu năng", en: "Applies only to performance testing", ja: "性能テストにのみ適用される" }
    ],
    answer: 0,
    exp: { vi: "Continuous testing tự động chạy kiểm thử trong pipeline để phản hồi nhanh về rủi ro thay đổi.", en: "Continuous testing runs automated tests in the pipeline for fast feedback on change risk.", ja: "継続的テストはパイプラインで自動テストを実行し変更リスクへの迅速なフィードバックを与える。" }
  },
  {
    q: { vi: "Đâu là mối quan hệ đúng giữa kiểm thử và đảm bảo chất lượng (QA)?", en: "What is the correct relationship between testing and quality assurance (QA)?", ja: "テストと品質保証（QA）の正しい関係はどれか？" },
    options: [
      { vi: "Kiểm thử và QA là hoàn toàn giống nhau", en: "Testing and QA are exactly the same", ja: "テストとQAはまったく同じである" },
      { vi: "QA hướng vào quá trình, kiểm thử là một hình thức kiểm soát chất lượng (QC) hướng vào sản phẩm", en: "QA is process oriented, while testing is a form of quality control (QC) focused on the product", ja: "QAはプロセス指向であり、テストは製品に焦点を当てた品質管理（QC）の一形態である" },
      { vi: "QA là một phần con của kiểm thử", en: "QA is a subset of testing", ja: "QAはテストの一部である" },
      { vi: "Kiểm thử không liên quan tới chất lượng", en: "Testing has nothing to do with quality", ja: "テストは品質と無関係である" }
    ],
    answer: 1,
    exp: { vi: "QA tập trung vào quá trình để phòng ngừa; kiểm thử là QC tập trung vào phát hiện lỗi ở sản phẩm.", en: "QA focuses on process to prevent issues; testing is QC focused on detecting product defects.", ja: "QAは問題予防のためプロセスに注目し、テストは製品の欠陥検出に注目するQCである。" }
  },
  {
    q: { vi: "Trong mô hình chữ V (V-model), mỗi mức phát triển tương ứng với điều gì?", en: "In the V-model, what does each development level correspond to?", ja: "V字モデルでは各開発レベルは何に対応するか？" },
    options: [
      { vi: "Một loại lỗi cụ thể", en: "A specific defect type", ja: "特定の欠陥タイプ" },
      { vi: "Một công cụ kiểm thử", en: "A testing tool", ja: "テストツール" },
      { vi: "Một mức kiểm thử tương ứng", en: "A corresponding test level", ja: "対応するテストレベル" },
      { vi: "Một lần phát hành sản phẩm", en: "A product release", ja: "製品リリース" }
    ],
    answer: 2,
    exp: { vi: "V-model gắn mỗi giai đoạn phát triển với một mức kiểm thử tương ứng.", en: "The V-model associates each development phase with a corresponding test level.", ja: "V字モデルは各開発段階を対応するテストレベルに関連付ける。" }
  },
  {
    q: { vi: "Đặc điểm nào đúng với phát triển phần mềm Agile liên quan tới kiểm thử?", en: "Which characteristic of Agile software development relates to testing?", ja: "アジャイル開発のテストに関する特徴はどれか？" },
    options: [
      { vi: "Kiểm thử chỉ diễn ra một lần ở cuối dự án", en: "Testing happens only once at the end of the project", ja: "テストはプロジェクトの最後に一度だけ行われる" },
      { vi: "Không cần kiểm thử hồi quy", en: "No regression testing is needed", ja: "回帰テストは不要である" },
      { vi: "Tài liệu yêu cầu luôn hoàn chỉnh trước khi kiểm thử", en: "Requirements are always complete before testing", ja: "テスト前に要件は常に完成している" },
      { vi: "Kiểm thử được tích hợp và lặp lại trong từng lần lặp (iteration), với phản hồi liên tục", en: "Testing is integrated and iterative within each iteration, with continuous feedback", ja: "テストは各イテレーション内で統合的・反復的に行われ、継続的なフィードバックがある" }
    ],
    answer: 3,
    exp: { vi: "Agile phát triển và kiểm thử theo vòng lặp ngắn, phản hồi liên tục và kiểm thử hồi quy thường xuyên.", en: "Agile develops and tests in short iterations with continuous feedback and frequent regression testing.", ja: "アジャイルは短い反復で開発・テストし、継続的なフィードバックと頻繁な回帰テストを行う。" }
  },
  {
    q: { vi: "「Shift left」 trong kiểm thử nghĩa là gì?", en: "What does 'shift left' mean in testing?", ja: "テストにおける「シフトレフト」とは何か？" },
    options: [
      { vi: "Thực hiện các hoạt động kiểm thử sớm hơn trong vòng đời phát triển", en: "Perform testing activities earlier in the development lifecycle", ja: "開発ライフサイクルの早い段階でテスト活動を行う" },
      { vi: "Chuyển toàn bộ kiểm thử sang cho khách hàng", en: "Move all testing to the customer", ja: "すべてのテストを顧客に移す" },
      { vi: "Chỉ kiểm thử ở giai đoạn cuối", en: "Test only in the final stage", ja: "最終段階でのみテストする" },
      { vi: "Bỏ qua kiểm thử tĩnh", en: "Skip static testing", ja: "静的テストを省略する" }
    ],
    answer: 0,
    exp: { vi: "Shift left nghĩa là đưa kiểm thử về sớm để phát hiện lỗi kịp thời và tiết kiệm chi phí.", en: "Shift left means starting testing earlier to catch defects sooner and save cost.", ja: "シフトレフトは欠陥を早期に発見しコストを削減するためテストを前倒しすることである。" }
  },
  {
    q: { vi: "Retrospective (họp nhìn lại) đóng góp gì cho kiểm thử?", en: "How do retrospectives contribute to testing?", ja: "レトロスペクティブはテストにどう貢献するか？" },
    options: [
      { vi: "Xác định lại phạm vi hợp đồng", en: "Redefine the contract scope", ja: "契約範囲を再定義する" },
      { vi: "Giúp cải tiến liên tục quy trình kiểm thử qua bài học kinh nghiệm", en: "Help continuously improve the test process through lessons learned", ja: "教訓を通じてテストプロセスを継続的に改善する" },
      { vi: "Thay thế cho việc lập kế hoạch kiểm thử", en: "Replace test planning", ja: "テスト計画を置き換える" },
      { vi: "Chỉ dùng để đánh giá hiệu suất cá nhân", en: "Only used to evaluate individual performance", ja: "個人の業績評価のみに使う" }
    ],
    answer: 1,
    exp: { vi: "Retrospective rút ra bài học để cải tiến quy trình, chất lượng và hiệu quả kiểm thử.", en: "Retrospectives capture lessons to improve process, quality and test effectiveness.", ja: "レトロスペクティブは教訓を得てプロセス・品質・テスト効果を改善する。" }
  },
  {
    q: { vi: "Mục tiêu chính của kiểm thử đơn vị (component/unit testing) là gì?", en: "What is the main objective of component (unit) testing?", ja: "コンポーネント（ユニット）テストの主な目的は何か？" },
    options: [
      { vi: "Kiểm thử tương tác giữa các hệ thống khác nhau", en: "To test interactions between different systems", ja: "異なるシステム間の相互作用をテストする" },
      { vi: "Kiểm thử toàn bộ hệ thống end-to-end", en: "To test the whole system end-to-end", ja: "システム全体をエンドツーエンドでテストする" },
      { vi: "Kiểm thử từng thành phần/mô-đun riêng lẻ một cách độc lập", en: "To test individual components/modules in isolation", ja: "個々のコンポーネント/モジュールを分離してテストする" },
      { vi: "Để người dùng cuối chấp nhận sản phẩm", en: "To have end users accept the product", ja: "エンドユーザーに製品を受け入れてもらう" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử đơn vị tập trung vào từng thành phần riêng lẻ, thường do lập trình viên thực hiện.", en: "Component testing focuses on individual components in isolation, often done by developers.", ja: "コンポーネントテストは個々のコンポーネントを分離して検証し、通常開発者が行う。" }
  },
  {
    q: { vi: "Kiểm thử tích hợp (integration testing) tập trung vào điều gì?", en: "What does integration testing focus on?", ja: "統合テストは何に焦点を当てるか？" },
    options: [
      { vi: "Chấp nhận của người dùng cuối", en: "End-user acceptance", ja: "エンドユーザーの受け入れ" },
      { vi: "Từng dòng mã trong một hàm", en: "Each line of code within a single function", ja: "単一関数内の各行のコード" },
      { vi: "Chỉ hiệu năng của cơ sở dữ liệu", en: "Only database performance", ja: "データベースの性能のみ" },
      { vi: "Giao diện và tương tác giữa các thành phần hoặc hệ thống", en: "Interfaces and interactions between components or systems", ja: "コンポーネントやシステム間のインターフェースと相互作用" }
    ],
    answer: 3,
    exp: { vi: "Kiểm thử tích hợp kiểm tra giao diện và tương tác giữa các thành phần (component integration) hoặc giữa các hệ thống (system integration).", en: "Integration testing checks interfaces and interactions between components (component integration) or systems (system integration).", ja: "統合テストはコンポーネント間またはシステム間のインターフェースと相互作用を検証する。" }
  },
  {
    q: { vi: "Kiểm thử hệ thống (system testing) đánh giá điều gì?", en: "What does system testing evaluate?", ja: "システムテストは何を評価するか？" },
    options: [
      { vi: "Hành vi và khả năng của toàn bộ hệ thống hoặc sản phẩm", en: "The behavior and capabilities of the whole system or product", ja: "システムまたは製品全体の振る舞いと能力" },
      { vi: "Chỉ một hàm đơn lẻ", en: "Only a single function", ja: "単一の関数のみ" },
      { vi: "Chỉ giao diện giữa hai mô-đun", en: "Only the interface between two modules", ja: "2つのモジュール間のインターフェースのみ" },
      { vi: "Chỉ mã nguồn chưa biên dịch", en: "Only uncompiled source code", ja: "コンパイルされていないソースコードのみ" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử hệ thống xác minh toàn bộ hệ thống đáp ứng yêu cầu chức năng và phi chức năng.", en: "System testing verifies the whole system meets functional and non-functional requirements.", ja: "システムテストはシステム全体が機能・非機能要件を満たすか検証する。" }
  },
  {
    q: { vi: "Kiểm thử chấp nhận (acceptance testing) thường nhằm mục đích gì?", en: "What is the typical purpose of acceptance testing?", ja: "受け入れテストの典型的な目的は何か？" },
    options: [
      { vi: "Tìm càng nhiều lỗi kỹ thuật càng tốt", en: "To find as many technical defects as possible", ja: "できるだけ多くの技術的欠陥を見つける" },
      { vi: "Tạo sự tự tin về việc hệ thống sẵn sàng dùng và đáp ứng nhu cầu người dùng/nghiệp vụ", en: "To establish confidence that the system is ready for use and meets user/business needs", ja: "システムが利用可能でユーザー/業務ニーズを満たす確信を得る" },
      { vi: "Kiểm thử từng thành phần riêng lẻ", en: "To test individual components", ja: "個々のコンポーネントをテストする" },
      { vi: "Chỉ kiểm thử hiệu năng", en: "To test only performance", ja: "性能のみをテストする" }
    ],
    answer: 1,
    exp: { vi: "Acceptance testing (UAT, OAT, kiểm thử hợp đồng/quy định) nhằm tạo sự tự tin về mức sẵn sàng triển khai.", en: "Acceptance testing (UAT, OAT, contractual/regulatory) builds confidence in readiness to deploy.", ja: "受け入れテスト（UAT、OAT、契約・規制）は展開準備の確信を得ることを目的とする。" }
  },
  {
    q: { vi: "Ví dụ nào là loại kiểm thử chức năng (functional testing)?", en: "Which is an example of functional testing?", ja: "機能テストの例はどれか？" },
    options: [
      { vi: "Kiểm thử thời gian phản hồi dưới tải cao", en: "Testing response time under heavy load", ja: "高負荷時の応答時間のテスト" },
      { vi: "Đánh giá mức độ dễ bảo trì của mã", en: "Assessing how maintainable the code is", ja: "コードの保守性を評価する" },
      { vi: "Kiểm tra rằng chức năng tính thuế cho ra kết quả đúng theo yêu cầu", en: "Checking that the tax-calculation feature produces correct results per requirements", ja: "税額計算機能が要件どおり正しい結果を出すか確認する" },
      { vi: "Kiểm thử khả năng tương thích trên nhiều trình duyệt", en: "Testing compatibility across browsers", ja: "複数ブラウザ間の互換性のテスト" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử chức năng đánh giá 「hệ thống làm gì」 so với yêu cầu chức năng.", en: "Functional testing evaluates 'what the system does' against functional requirements.", ja: "機能テストは機能要件に対し「システムが何をするか」を評価する。" }
  },
  {
    q: { vi: "Kiểm thử phi chức năng (non-functional testing) đánh giá điều gì?", en: "What does non-functional testing evaluate?", ja: "非機能テストは何を評価するか？" },
    options: [
      { vi: "Hệ thống làm gì (chức năng)", en: "What the system does (functions)", ja: "システムが何をするか（機能）" },
      { vi: "Chỉ cấu trúc mã nguồn bên trong", en: "Only the internal code structure", ja: "内部コード構造のみ" },
      { vi: "Chỉ số lượng ca kiểm thử", en: "Only the number of test cases", ja: "テストケースの数のみ" },
      { vi: "Hệ thống hoạt động tốt như thế nào (ví dụ hiệu năng, bảo mật, khả dụng)", en: "How well the system behaves (e.g. performance, security, usability)", ja: "システムがどれだけよく動作するか（例：性能、セキュリティ、使用性）" }
    ],
    answer: 3,
    exp: { vi: "Kiểm thử phi chức năng đánh giá các thuộc tính chất lượng như hiệu năng, bảo mật, khả dụng, độ tin cậy.", en: "Non-functional testing evaluates quality attributes such as performance, security, usability and reliability.", ja: "非機能テストは性能、セキュリティ、使用性、信頼性などの品質特性を評価する。" }
  },
  {
    q: { vi: "Kiểm thử hộp trắng (white-box testing) dựa trên cơ sở nào?", en: "On what basis is white-box testing performed?", ja: "ホワイトボックステストは何に基づくか？" },
    options: [
      { vi: "Cấu trúc bên trong như mã nguồn, luồng điều khiển, kiến trúc", en: "Internal structure such as code, control flow and architecture", ja: "コード、制御フロー、アーキテクチャなどの内部構造" },
      { vi: "Chỉ đặc tả yêu cầu bên ngoài", en: "Only external requirement specifications", ja: "外部の要件仕様のみ" },
      { vi: "Ý kiến của người dùng cuối", en: "End-user opinions", ja: "エンドユーザーの意見" },
      { vi: "Kinh nghiệm ngẫu nhiên của tester", en: "The tester's random experience", ja: "テスターのランダムな経験" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử hộp trắng (dựa trên cấu trúc) dùng thông tin nội tại của thành phần/hệ thống.", en: "White-box (structure-based) testing uses internal information of the component/system.", ja: "ホワイトボックス（構造ベース）テストはコンポーネント/システムの内部情報を用いる。" }
  },
  {
    q: { vi: "Kiểm thử hộp đen (black-box testing) dựa trên cơ sở nào?", en: "On what basis is black-box testing performed?", ja: "ブラックボックステストは何に基づくか？" },
    options: [
      { vi: "Mã nguồn chi tiết", en: "Detailed source code", ja: "詳細なソースコード" },
      { vi: "Đặc tả và hành vi bên ngoài (yêu cầu, use case) không cần biết cấu trúc bên trong", en: "External specifications and behavior (requirements, use cases) without knowing internal structure", ja: "内部構造を知らずに外部仕様と振る舞い（要件、ユースケース）に基づく" },
      { vi: "Độ phủ nhánh của mã", en: "Branch coverage of the code", ja: "コードの分岐カバレッジ" },
      { vi: "Sơ đồ luồng điều khiển", en: "The control flow graph", ja: "制御フローグラフ" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử hộp đen (dựa trên đặc tả) dựa trên hành vi bên ngoài, không xét cấu trúc nội tại.", en: "Black-box (specification-based) testing is based on external behavior, not internal structure.", ja: "ブラックボックス（仕様ベース）テストは内部構造ではなく外部の振る舞いに基づく。" }
  },
  {
    q: { vi: "Mục đích của kiểm thử hồi quy (regression testing) là gì?", en: "What is the purpose of regression testing?", ja: "回帰テストの目的は何か？" },
    options: [
      { vi: "Xác nhận rằng một lỗi cụ thể đã được sửa đúng", en: "To confirm that a specific defect has been fixed", ja: "特定の欠陥が修正されたことを確認する" },
      { vi: "Đánh giá hiệu năng của hệ thống", en: "To evaluate system performance", ja: "システムの性能を評価する" },
      { vi: "Kiểm tra rằng thay đổi không gây ra hỏng hóc mới ở phần chưa thay đổi", en: "To check that changes have not introduced new defects in unchanged parts", ja: "変更が未変更部分に新たな欠陥を持ち込んでいないか確認する" },
      { vi: "Tạo dữ liệu kiểm thử mới", en: "To create new test data", ja: "新しいテストデータを作成する" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử hồi quy đảm bảo thay đổi (sửa lỗi, tính năng mới) không phá vỡ chức năng hiện có.", en: "Regression testing ensures changes (fixes, new features) do not break existing functionality.", ja: "回帰テストは変更（修正・新機能）が既存機能を壊さないことを保証する。" }
  },
  {
    q: { vi: "Kiểm thử xác nhận (confirmation testing / re-testing) là gì?", en: "What is confirmation testing (re-testing)?", ja: "確認テスト（再テスト）とは何か？" },
    options: [
      { vi: "Kiểm thử toàn bộ hệ thống sau mỗi lần build", en: "Testing the whole system after every build", ja: "毎ビルド後にシステム全体をテストすること" },
      { vi: "Kiểm thử ngẫu nhiên không có kịch bản", en: "Random testing without scripts", ja: "スクリプトなしのランダムテスト" },
      { vi: "Kiểm thử phi chức năng", en: "Non-functional testing", ja: "非機能テスト" },
      { vi: "Chạy lại ca kiểm thử đã thất bại sau khi lỗi được sửa để xác nhận đã khắc phục", en: "Re-running failed tests after a defect fix to confirm it has been resolved", ja: "欠陥修正後に失敗したテストを再実行し解決を確認すること" }
    ],
    answer: 3,
    exp: { vi: "Confirmation testing kiểm tra rằng lỗi đã được sửa thành công.", en: "Confirmation testing verifies a defect has been successfully fixed.", ja: "確認テストは欠陥が正しく修正されたことを検証する。" }
  },
  {
    q: { vi: "Kiểm thử bảo trì (maintenance testing) thường được kích hoạt bởi điều gì?", en: "What typically triggers maintenance testing?", ja: "保守テストは通常何によって引き起こされるか？" },
    options: [
      { vi: "Thay đổi, di trú (migration) hoặc ngừng sử dụng (retirement) của hệ thống đang vận hành", en: "Modifications, migration or retirement of an operational system", ja: "稼働中システムの変更、移行、廃止" },
      { vi: "Việc viết ca kiểm thử đầu tiên", en: "Writing the first test case", ja: "最初のテストケースの作成" },
      { vi: "Chỉ khi phát triển sản phẩm mới hoàn toàn", en: "Only when developing a brand-new product", ja: "まったく新しい製品の開発時のみ" },
      { vi: "Khi không có thay đổi nào", en: "When there are no changes", ja: "変更がないとき" }
    ],
    answer: 0,
    exp: { vi: "Bảo trì kiểm thử áp dụng khi sửa đổi, nâng cấp, di trú hoặc loại bỏ hệ thống đang chạy.", en: "Maintenance testing applies when modifying, upgrading, migrating or retiring a running system.", ja: "保守テストは稼働システムの修正・アップグレード・移行・廃止時に適用される。" }
  },
  {
    q: { vi: "Phân tích tác động (impact analysis) trong bảo trì kiểm thử dùng để làm gì?", en: "What is impact analysis used for in maintenance testing?", ja: "保守テストにおける影響分析は何のために使うか？" },
    options: [
      { vi: "Ước lượng chi phí phần cứng", en: "To estimate hardware cost", ja: "ハードウェアコストを見積もる" },
      { vi: "Xác định các vùng của hệ thống có thể bị ảnh hưởng bởi một thay đổi", en: "To identify areas of the system that may be affected by a change", ja: "変更によって影響を受ける可能性のあるシステム領域を特定する" },
      { vi: "Tính độ phủ câu lệnh", en: "To calculate statement coverage", ja: "命令カバレッジを計算する" },
      { vi: "Thiết kế giao diện người dùng", en: "To design the user interface", ja: "ユーザーインターフェースを設計する" }
    ],
    answer: 1,
    exp: { vi: "Impact analysis giúp xác định phạm vi kiểm thử hồi quy cần thiết sau thay đổi.", en: "Impact analysis helps determine the extent of regression testing needed after a change.", ja: "影響分析は変更後に必要な回帰テストの範囲を決めるのに役立つ。" }
  },
  {
    q: { vi: "Kiểm thử xác minh (verification) khác với kiểm thử thẩm định (validation) như thế nào?", en: "How does verification differ from validation?", ja: "検証（verification）と妥当性確認（validation）はどう異なるか？" },
    options: [
      { vi: "Hai khái niệm hoàn toàn giống nhau", en: "The two concepts are identical", ja: "2つの概念はまったく同じ" },
      { vi: "Verification chỉ do người dùng thực hiện", en: "Verification is only done by users", ja: "検証はユーザーのみが行う" },
      { vi: "Verification: 「xây dựng đúng sản phẩm chưa」; Validation: 「xây dựng sản phẩm đúng chưa」", en: "Verification: 'are we building the product right'; Validation: 'are we building the right product'", ja: "検証は「正しく作っているか」、妥当性確認は「正しいものを作っているか」" },
      { vi: "Validation chỉ liên quan đến mã nguồn", en: "Validation only concerns source code", ja: "妥当性確認はソースコードのみに関わる" }
    ],
    answer: 2,
    exp: { vi: "Verification kiểm tra tuân thủ đặc tả; validation kiểm tra đáp ứng nhu cầu người dùng thực tế.", en: "Verification checks conformance to specifications; validation checks meeting actual user needs.", ja: "検証は仕様への適合を、妥当性確認は実際のユーザーニーズの充足を確認する。" }
  },
  {
    q: { vi: "Điểm khác biệt cơ bản giữa kiểm thử tĩnh và kiểm thử động là gì?", en: "What is the fundamental difference between static testing and dynamic testing?", ja: "静的テストと動的テストの基本的な違いは何か？" },
    options: [
      { vi: "Kiểm thử tĩnh luôn dùng công cụ tự động, kiểm thử động thì không", en: "Static testing always uses automation, dynamic testing does not", ja: "静的テストは常に自動化を使い、動的テストは使わない" },
      { vi: "Kiểm thử tĩnh chỉ dành cho mã nguồn", en: "Static testing applies only to source code", ja: "静的テストはソースコードのみに適用される" },
      { vi: "Kiểm thử động không cần ca kiểm thử", en: "Dynamic testing does not need test cases", ja: "動的テストはテストケースを必要としない" },
      { vi: "Kiểm thử tĩnh không thực thi phần mềm, còn kiểm thử động thì có", en: "Static testing does not execute the software, whereas dynamic testing does", ja: "静的テストはソフトウェアを実行しないが、動的テストは実行する" }
    ],
    answer: 3,
    exp: { vi: "Kiểm thử tĩnh xem xét sản phẩm công việc mà không chạy mã; kiểm thử động chạy phần mềm.", en: "Static testing examines work products without running code; dynamic testing runs the software.", ja: "静的テストはコードを実行せず成果物を調べ、動的テストはソフトウェアを実行する。" }
  },
  {
    q: { vi: "Sản phẩm công việc nào có thể được kiểm thử tĩnh?", en: "Which work products can be examined by static testing?", ja: "静的テストで検査できる成果物はどれか？" },
    options: [
      { vi: "Yêu cầu, thiết kế, mã nguồn, ca kiểm thử, hướng dẫn sử dụng và nhiều tài liệu khác", en: "Requirements, design, code, test cases, user guides and many other documents", ja: "要件、設計、コード、テストケース、ユーザーガイドなど多くの文書" },
      { vi: "Chỉ mã nguồn có thể biên dịch", en: "Only compilable source code", ja: "コンパイル可能なソースコードのみ" },
      { vi: "Chỉ tài liệu yêu cầu", en: "Only requirement documents", ja: "要件文書のみ" },
      { vi: "Chỉ dữ liệu kiểm thử", en: "Only test data", ja: "テストデータのみ" }
    ],
    answer: 0,
    exp: { vi: "Hầu hết mọi sản phẩm công việc đọc và hiểu được đều có thể kiểm thử tĩnh.", en: "Almost any readable and understandable work product can be statically tested.", ja: "読んで理解できるほぼすべての成果物は静的テストの対象になる。" }
  },
  {
    q: { vi: "Lợi ích chính của kiểm thử tĩnh là gì?", en: "What is a key benefit of static testing?", ja: "静的テストの主な利点は何か？" },
    options: [
      { vi: "Đo được thời gian phản hồi thực tế", en: "Measuring actual response time", ja: "実際の応答時間を測定する" },
      { vi: "Phát hiện lỗi sớm, trước khi thực thi, giúp giảm chi phí sửa lỗi", en: "Detecting defects early, before execution, reducing the cost of fixing them", ja: "実行前に欠陥を早期発見し、修正コストを削減する" },
      { vi: "Thay thế hoàn toàn kiểm thử động", en: "Completely replacing dynamic testing", ja: "動的テストを完全に置き換える" },
      { vi: "Phát hiện lỗi chỉ xuất hiện lúc chạy", en: "Finding defects that only appear at runtime", ja: "実行時のみ現れる欠陥を発見する" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử tĩnh tìm lỗi sớm khi chưa chạy, giúp phòng ngừa lỗi và tiết kiệm chi phí.", en: "Static testing finds defects early before execution, preventing defects and saving cost.", ja: "静的テストは実行前に欠陥を早期発見し、欠陥予防とコスト削減に役立つ。" }
  },
  {
    q: { vi: "Loại lỗi nào dễ được kiểm thử tĩnh phát hiện hơn kiểm thử động?", en: "Which kind of defect is easier to find with static testing than dynamic testing?", ja: "動的テストより静的テストで見つけやすい欠陥はどれか？" },
    options: [
      { vi: "Rò rỉ bộ nhớ khi chạy", en: "Memory leaks at runtime", ja: "実行時のメモリリーク" },
      { vi: "Thời gian phản hồi dưới tải", en: "Response time under load", ja: "負荷時の応答時間" },
      { vi: "Yêu cầu mâu thuẫn, mơ hồ hoặc thiếu; mã chết; sai lệch chuẩn viết mã", en: "Contradictory, ambiguous or missing requirements; dead code; coding standard deviations", ja: "矛盾・曖昧・欠落した要件、デッドコード、コーディング標準からの逸脱" },
      { vi: "Sự cố tương thích trình duyệt lúc chạy", en: "Runtime browser compatibility issues", ja: "実行時のブラウザ互換性問題" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử tĩnh dễ phát hiện lỗi trong tài liệu và cấu trúc mã mà kiểm thử động khó thấy.", en: "Static testing more easily finds defects in documents and code structure that dynamic testing may miss.", ja: "静的テストは動的テストでは見逃しやすい文書やコード構造の欠陥を見つけやすい。" }
  },
  {
    q: { vi: "Trong quy trình rà soát (review), vai trò 「moderator」 (điều phối) làm gì?", en: "In the review process, what does the 'moderator' role do?", ja: "レビュープロセスで「モデレーター」の役割は何をするか？" },
    options: [
      { vi: "Viết sản phẩm công việc được rà soát", en: "Writes the work product being reviewed", ja: "レビュー対象の成果物を書く" },
      { vi: "Chỉ ghi lại các lỗi được nêu", en: "Only records the defects raised", ja: "指摘された欠陥を記録するだけ" },
      { vi: "Ra quyết định cuối cùng về việc sửa lỗi", en: "Makes the final decision on fixing defects", ja: "欠陥修正の最終決定を下す" },
      { vi: "Dẫn dắt buổi rà soát, đảm bảo tiến hành hiệu quả và trung lập", en: "Leads the review, ensuring it runs effectively and neutrally", ja: "レビューを主導し、効果的かつ中立に進める" }
    ],
    answer: 3,
    exp: { vi: "Moderator (facilitator) điều phối cuộc rà soát để nó diễn ra hiệu quả và khách quan.", en: "The moderator (facilitator) runs the review so it is effective and objective.", ja: "モデレーター（ファシリテーター）はレビューが効果的で客観的に進むよう運営する。" }
  },
  {
    q: { vi: "Vai trò 「scribe」 (thư ký) trong rà soát chịu trách nhiệm gì?", en: "What is the 'scribe' role responsible for in a review?", ja: "レビューで「書記（scribe）」の役割は何を担当するか？" },
    options: [
      { vi: "Ghi lại các phát hiện, quyết định và vấn đề trong buổi rà soát", en: "Recording findings, decisions and issues during the review", ja: "レビュー中の指摘、決定、課題を記録する" },
      { vi: "Quyết định ai tham gia rà soát", en: "Deciding who attends the review", ja: "レビューに誰が参加するか決める" },
      { vi: "Viết mã sửa lỗi", en: "Writing code to fix defects", ja: "欠陥を修正するコードを書く" },
      { vi: "Phê duyệt ngân sách dự án", en: "Approving the project budget", ja: "プロジェクト予算を承認する" }
    ],
    answer: 0,
    exp: { vi: "Scribe (recorder) ghi chép các phát hiện và quyết định để theo dõi sau rà soát.", en: "The scribe (recorder) documents findings and decisions for follow-up after the review.", ja: "書記はレビュー後のフォローアップのため指摘と決定を記録する。" }
  },
  {
    q: { vi: "Loại rà soát nào chính thức nhất và tuân theo quy trình có kỷ luật với thu thập số liệu?", en: "Which review type is the most formal and follows a disciplined process with metrics?", ja: "最も形式的で、メトリクスを伴う規律あるプロセスに従うレビュータイプはどれか？" },
    options: [
      { vi: "Informal review (rà soát không chính thức)", en: "Informal review", ja: "非形式レビュー" },
      { vi: "Inspection (thanh tra)", en: "Inspection", ja: "インスペクション" },
      { vi: "Walkthrough (dẫn giải)", en: "Walkthrough", ja: "ウォークスルー" },
      { vi: "Technical review (rà soát kỹ thuật)", en: "Technical review", ja: "技術レビュー" }
    ],
    answer: 1,
    exp: { vi: "Inspection là loại rà soát chính thức nhất, có vai trò rõ ràng, quy trình và số liệu.", en: "Inspection is the most formal review type with defined roles, process and metrics.", ja: "インスペクションは役割・プロセス・メトリクスが定義された最も形式的なレビューである。" }
  },
  {
    q: { vi: "Đặc điểm của một walkthrough là gì?", en: "What characterizes a walkthrough?", ja: "ウォークスルーの特徴は何か？" },
    options: [
      { vi: "Luôn có số liệu chính thức và tiêu chí vào/ra nghiêm ngặt", en: "Always has formal metrics and strict entry/exit criteria", ja: "常に形式的なメトリクスと厳格な入場・退場基準がある" },
      { vi: "Không cho phép tác giả tham gia", en: "Does not allow the author to participate", ja: "作成者の参加を許さない" },
      { vi: "Do tác giả dẫn dắt, thường nhằm truyền đạt kiến thức và thu thập ý kiến", en: "Led by the author, often to share knowledge and gather feedback", ja: "作成者が主導し、知識共有や意見収集を目的とすることが多い" },
      { vi: "Chỉ dùng cho mã nguồn", en: "Is used only for source code", ja: "ソースコードのみに使われる" }
    ],
    answer: 2,
    exp: { vi: "Walkthrough do tác giả trình bày, mục tiêu học hỏi, tìm khiếm khuyết và tạo đồng thuận.", en: "A walkthrough is led by the author to learn, find defects and reach consensus.", ja: "ウォークスルーは作成者が主導し、学習・欠陥発見・合意形成を目的とする。" }
  },
  {
    q: { vi: "Yếu tố nào giúp rà soát thành công?", en: "Which factor contributes to a successful review?", ja: "レビューを成功させる要因はどれか？" },
    options: [
      { vi: "Tập trung chỉ trích cá nhân tác giả", en: "Focusing criticism on the author personally", ja: "作成者個人への批判に集中する" },
      { vi: "Rà soát càng nhiều nội dung trong một buổi càng tốt", en: "Reviewing as much content as possible in one session", ja: "1回でできるだけ多くの内容をレビューする" },
      { vi: "Không cần chuẩn bị trước", en: "No preparation is needed", ja: "事前準備は不要" },
      { vi: "Mục tiêu rõ ràng, người tham gia phù hợp, không khí tin tưởng, tập trung vào sản phẩm không phải con người", en: "Clear objectives, right participants, an atmosphere of trust, focus on the product not the person", ja: "明確な目的、適切な参加者、信頼の雰囲気、人ではなく成果物への焦点" }
    ],
    answer: 3,
    exp: { vi: "Rà soát hiệu quả cần mục tiêu rõ, người phù hợp, sự tin tưởng và tập trung vào sản phẩm.", en: "Effective reviews need clear goals, the right people, trust and focus on the product.", ja: "効果的なレビューには明確な目標、適切な人、信頼、成果物への焦点が必要。" }
  },
  {
    q: { vi: "Phân tích tĩnh (static analysis) bằng công cụ thường phát hiện điều gì?", en: "What do tool-based static analysis typically detect?", ja: "ツールによる静的解析は通常何を検出するか？" },
    options: [
      { vi: "Lỗi lập trình, vi phạm chuẩn viết mã, mã chết, lỗ hổng bảo mật tiềm ẩn", en: "Programming errors, coding standard violations, dead code and potential security vulnerabilities", ja: "プログラミング誤り、コーディング標準違反、デッドコード、潜在的セキュリティ脆弱性" },
      { vi: "Thời gian phản hồi lúc chạy", en: "Runtime response times", ja: "実行時の応答時間" },
      { vi: "Sự hài lòng của người dùng", en: "User satisfaction", ja: "ユーザー満足度" },
      { vi: "Chi phí bảo trì tài chính", en: "Financial maintenance cost", ja: "財務上の保守コスト" }
    ],
    answer: 0,
    exp: { vi: "Công cụ phân tích tĩnh quét mã để tìm lỗi cấu trúc và vi phạm quy tắc mà không chạy chương trình.", en: "Static analysis tools scan code for structural defects and rule violations without running it.", ja: "静的解析ツールは実行せずにコードを走査し構造的欠陥や規則違反を見つける。" }
  },
  {
    q: { vi: "Việc tham gia rà soát mang lại lợi ích gián tiếp nào cho tác giả?", en: "What indirect benefit does participating in reviews bring authors?", ja: "レビューへの参加は作成者にどんな間接的利益をもたらすか？" },
    options: [
      { vi: "Loại bỏ hoàn toàn nhu cầu kiểm thử động", en: "Eliminates the need for dynamic testing entirely", ja: "動的テストの必要性を完全になくす" },
      { vi: "Giúp cải thiện năng lực và chất lượng công việc trong tương lai qua phản hồi", en: "Helps improve skills and future work quality through feedback", ja: "フィードバックを通じてスキルと将来の成果物の品質を向上させる" },
      { vi: "Giúp che giấu lỗi khỏi quản lý", en: "Helps hide defects from management", ja: "欠陥を管理者から隠す" },
      { vi: "Không mang lại lợi ích nào cho tác giả", en: "Brings no benefit to the author", ja: "作成者に利益をもたらさない" }
    ],
    answer: 1,
    exp: { vi: "Phản hồi trong rà soát giúp tác giả học hỏi và nâng cao chất lượng sản phẩm sau này.", en: "Review feedback helps authors learn and improve the quality of later work.", ja: "レビューのフィードバックは作成者の学習と後の成果物の品質向上を助ける。" }
  },
  {
    q: { vi: "Kỹ thuật nào sau đây là kỹ thuật kiểm thử dựa trên đặc tả (hộp đen)?", en: "Which of the following is a black-box (specification-based) test technique?", ja: "次のうちブラックボックス（仕様ベース）のテスト技法はどれか？" },
    options: [
      { vi: "Độ phủ câu lệnh (statement coverage)", en: "Statement coverage", ja: "命令カバレッジ" },
      { vi: "Độ phủ nhánh (branch coverage)", en: "Branch coverage", ja: "分岐カバレッジ" },
      { vi: "Phân vùng tương đương (equivalence partitioning)", en: "Equivalence partitioning", ja: "同値分割" },
      { vi: "Kiểm thử khám phá (exploratory testing)", en: "Exploratory testing", ja: "探索的テスト" }
    ],
    answer: 2,
    exp: { vi: "Phân vùng tương đương là kỹ thuật hộp đen; độ phủ câu lệnh/nhánh là hộp trắng; khám phá là dựa trên kinh nghiệm.", en: "Equivalence partitioning is black-box; statement/branch coverage are white-box; exploratory is experience-based.", ja: "同値分割はブラックボックス、命令/分岐カバレッジはホワイトボックス、探索的テストは経験ベースである。" }
  },
  {
    q: { vi: "Phân vùng tương đương (equivalence partitioning) dựa trên nguyên tắc nào?", en: "On what principle is equivalence partitioning based?", ja: "同値分割はどの原則に基づくか？" },
    options: [
      { vi: "Chỉ giá trị biên mới cần kiểm thử", en: "Only boundary values need testing", ja: "境界値のみテストが必要" },
      { vi: "Mỗi giá trị đầu vào phải được kiểm thử riêng", en: "Every input value must be tested separately", ja: "各入力値を個別にテストしなければならない" },
      { vi: "Chỉ giá trị không hợp lệ mới cần kiểm thử", en: "Only invalid values need testing", ja: "無効な値のみテストが必要" },
      { vi: "Các giá trị trong cùng một phân vùng được kỳ vọng hệ thống xử lý theo cùng một cách", en: "Values in the same partition are expected to be processed by the system in the same way", ja: "同じ区分内の値はシステムに同じように処理されると期待される" }
    ],
    answer: 3,
    exp: { vi: "Chia miền dữ liệu thành các phân vùng mà mọi giá trị trong đó được xử lý tương đương; chọn một đại diện mỗi phân vùng.", en: "The data domain is divided into partitions where all values are handled equivalently; one representative per partition is chosen.", ja: "データ領域を同じ扱いを受ける区分に分け、各区分から代表値を1つ選ぶ。" }
  },
  {
    q: { vi: "Với một trường tuổi hợp lệ từ 18 đến 65, kiểm thử giá trị biên (BVA) hai điểm nên chọn giá trị nào?", en: "For a valid age field 18 to 65, which values should 2-value boundary value analysis (BVA) use?", ja: "有効な年齢18〜65のフィールドで、2値境界値分析（BVA）はどの値を使うべきか？" },
    options: [
      { vi: "17, 18, 65, 66 (các biên và giá trị liền kề)", en: "17, 18, 65, 66 (boundaries and adjacent values)", ja: "17、18、65、66（境界と隣接値）" },
      { vi: "Chỉ 18 và 65", en: "Only 18 and 65", ja: "18と65のみ" },
      { vi: "Chỉ 30 và 40", en: "Only 30 and 40", ja: "30と40のみ" },
      { vi: "Chỉ 0 và 100", en: "Only 0 and 100", ja: "0と100のみ" }
    ],
    answer: 0,
    exp: { vi: "BVA hai giá trị kiểm thử tại biên (18, 65) và giá trị liền kề ngay ngoài biên (17, 66).", en: "2-value BVA tests at the boundaries (18, 65) and the adjacent values just outside (17, 66).", ja: "2値BVAは境界（18、65）とすぐ外側の隣接値（17、66）をテストする。" }
  },
  {
    q: { vi: "Tại sao phân tích giá trị biên (BVA) hữu ích?", en: "Why is boundary value analysis (BVA) useful?", ja: "境界値分析（BVA）はなぜ有用か？" },
    options: [
      { vi: "Vì nó thay thế mọi kỹ thuật khác", en: "Because it replaces all other techniques", ja: "他のすべての技法を置き換えるため" },
      { vi: "Vì lỗi thường tập trung ở các biên của phân vùng", en: "Because defects tend to cluster at the boundaries of partitions", ja: "欠陥は区分の境界に集まりやすいため" },
      { vi: "Vì nó không cần biết miền giá trị", en: "Because it does not need to know the value domain", ja: "値の領域を知る必要がないため" },
      { vi: "Vì nó chỉ dùng cho kiểm thử phi chức năng", en: "Because it is only for non-functional testing", ja: "非機能テストのみに使うため" }
    ],
    answer: 1,
    exp: { vi: "Nhiều lỗi lập trình xuất hiện ở ranh giới giữa các phân vùng, nên BVA phát hiện chúng hiệu quả.", en: "Many programming errors occur at the edges between partitions, so BVA detects them effectively.", ja: "多くのプログラミング誤りは区分の境目で発生するため、BVAは効果的に検出する。" }
  },
  {
    q: { vi: "Bảng quyết định (decision table) đặc biệt hữu ích cho tình huống nào?", en: "For what situation is a decision table particularly useful?", ja: "デシジョンテーブルは特にどんな状況で有用か？" },
    options: [
      { vi: "Khi chỉ có một điều kiện duy nhất", en: "When there is only a single condition", ja: "条件が1つだけのとき" },
      { vi: "Khi kiểm thử hiệu năng", en: "When testing performance", ja: "性能をテストするとき" },
      { vi: "Khi kết quả phụ thuộc vào tổ hợp của nhiều điều kiện đầu vào", en: "When the outcome depends on combinations of several input conditions", ja: "結果が複数の入力条件の組み合わせに依存するとき" },
      { vi: "Khi không có quy tắc nghiệp vụ nào", en: "When there are no business rules", ja: "業務ルールがないとき" }
    ],
    answer: 2,
    exp: { vi: "Bảng quyết định mô hình hóa tổ hợp điều kiện và hành động tương ứng, phù hợp logic nghiệp vụ phức tạp.", en: "A decision table models combinations of conditions and their actions, suited to complex business logic.", ja: "デシジョンテーブルは条件の組み合わせと対応するアクションを表現し、複雑な業務ロジックに適する。" }
  },
  {
    q: { vi: "Trong bảng quyết định, 「rule」 (quy tắc) tương ứng với điều gì?", en: "In a decision table, what does a 'rule' correspond to?", ja: "デシジョンテーブルで「ルール」は何に対応するか？" },
    options: [
      { vi: "Một dòng chứa toàn bộ dữ liệu kiểm thử", en: "A row containing all the test data", ja: "すべてのテストデータを含む行" },
      { vi: "Một ca kiểm thử tự động", en: "An automated test case", ja: "自動テストケース" },
      { vi: "Một lỗi được ghi nhận", en: "A recorded defect", ja: "記録された欠陥" },
      { vi: "Một cột thể hiện một tổ hợp cụ thể của các điều kiện và các hành động kết quả", en: "A column representing a specific combination of conditions and the resulting actions", ja: "条件の特定の組み合わせと結果のアクションを表す列" }
    ],
    answer: 3,
    exp: { vi: "Mỗi cột (rule) là một tổ hợp giá trị điều kiện và tập hành động tương ứng, dùng để dẫn xuất ca kiểm thử.", en: "Each column (rule) is a combination of condition values with corresponding actions, used to derive test cases.", ja: "各列（ルール）は条件値の組み合わせと対応アクションで、テストケース導出に使う。" }
  },
  {
    q: { vi: "Kiểm thử chuyển trạng thái (state transition testing) phù hợp nhất khi nào?", en: "When is state transition testing most appropriate?", ja: "状態遷移テストが最も適するのはいつか？" },
    options: [
      { vi: "Khi hành vi hệ thống phụ thuộc vào trạng thái hiện tại và các sự kiện gây chuyển trạng thái", en: "When system behavior depends on the current state and events that cause transitions", ja: "システムの振る舞いが現在の状態と遷移を引き起こすイベントに依存するとき" },
      { vi: "Khi hệ thống không có trạng thái", en: "When the system is stateless", ja: "システムが状態を持たないとき" },
      { vi: "Khi kiểm thử hiệu năng thuần túy", en: "When testing pure performance", ja: "純粋な性能テストのとき" },
      { vi: "Khi chỉ kiểm thử một trường đầu vào đơn giản", en: "When testing only one simple input field", ja: "単純な入力フィールド1つだけをテストするとき" }
    ],
    answer: 0,
    exp: { vi: "State transition testing mô hình hóa các trạng thái, sự kiện, chuyển tiếp và hành động; hợp với hệ thống có trạng thái.", en: "State transition testing models states, events, transitions and actions; suited to stateful systems.", ja: "状態遷移テストは状態・イベント・遷移・アクションをモデル化し、状態を持つシステムに適する。" }
  },
  {
    q: { vi: "Trong sơ đồ chuyển trạng thái, một 「transition」 được kích hoạt bởi gì?", en: "In a state transition diagram, what triggers a transition?", ja: "状態遷移図で「遷移」は何によって引き起こされるか？" },
    options: [
      { vi: "Một lỗi trong mã", en: "A defect in the code", ja: "コードの欠陥" },
      { vi: "Một sự kiện (event), có thể kèm điều kiện bảo vệ (guard condition)", en: "An event, possibly with a guard condition", ja: "イベント（ガード条件を伴うこともある）" },
      { vi: "Một ca kiểm thử tự động", en: "An automated test case", ja: "自動テストケース" },
      { vi: "Một báo cáo tổng kết", en: "A summary report", ja: "サマリレポート" }
    ],
    answer: 1,
    exp: { vi: "Một sự kiện làm hệ thống chuyển từ trạng thái này sang trạng thái khác, có thể có hành động và điều kiện bảo vệ.", en: "An event moves the system from one state to another, possibly with an action and a guard condition.", ja: "イベントによりシステムはある状態から別の状態へ遷移し、アクションやガード条件を伴うことがある。" }
  },
  {
    q: { vi: "Kiểm thử dựa trên use case (use case testing) chủ yếu phát hiện loại lỗi nào?", en: "What kind of defects does use case testing mainly detect?", ja: "ユースケーステストは主にどんな欠陥を検出するか？" },
    options: [
      { vi: "Chỉ lỗi cú pháp trong mã", en: "Only syntax errors in code", ja: "コードの構文エラーのみ" },
      { vi: "Chỉ rò rỉ bộ nhớ", en: "Only memory leaks", ja: "メモリリークのみ" },
      { vi: "Lỗi trong luồng xử lý tương tác giữa người dùng và hệ thống, gồm luồng chính và luồng thay thế", en: "Defects in the interaction flows between user and system, including main and alternative flows", ja: "利用者とシステムの相互作用フロー（基本フローと代替フロー）の欠陥" },
      { vi: "Chỉ lỗi độ phủ nhánh", en: "Only branch coverage gaps", ja: "分岐カバレッジの不足のみ" }
    ],
    answer: 2,
    exp: { vi: "Use case testing kiểm thử các luồng tương tác điển hình, thay thế và ngoại lệ giữa tác nhân và hệ thống.", en: "Use case testing exercises basic, alternative and exception interaction flows between actor and system.", ja: "ユースケーステストはアクターとシステム間の基本・代替・例外フローを検証する。" }
  },
  {
    q: { vi: "Độ phủ câu lệnh 100% (statement coverage) đảm bảo điều gì?", en: "What does 100% statement coverage guarantee?", ja: "命令カバレッジ100%は何を保証するか？" },
    options: [
      { vi: "Mọi nhánh quyết định đều được kiểm thử", en: "Every decision branch has been tested", ja: "すべての判定分岐がテストされた" },
      { vi: "Không còn lỗi nào trong mã", en: "No defects remain in the code", ja: "コードに欠陥が残っていない" },
      { vi: "Mọi đường đi đều được kiểm thử", en: "Every path has been tested", ja: "すべてのパスがテストされた" },
      { vi: "Mọi câu lệnh thực thi được đã được thực hiện ít nhất một lần", en: "Every executable statement has been executed at least once", ja: "実行可能な各命令が少なくとも一度実行された" }
    ],
    answer: 3,
    exp: { vi: "Độ phủ câu lệnh 100% chỉ đảm bảo mọi câu lệnh chạy ít nhất một lần, không đảm bảo phủ mọi nhánh.", en: "100% statement coverage only ensures each statement runs once, not that all branches are covered.", ja: "命令カバレッジ100%は各命令が一度実行されることのみを保証し、全分岐の網羅は保証しない。" }
  },
  {
    q: { vi: "Mối quan hệ giữa độ phủ nhánh và độ phủ câu lệnh là gì?", en: "What is the relationship between branch coverage and statement coverage?", ja: "分岐カバレッジと命令カバレッジの関係は何か？" },
    options: [
      { vi: "Độ phủ nhánh 100% bao hàm độ phủ câu lệnh 100%, nhưng không ngược lại", en: "100% branch coverage implies 100% statement coverage, but not vice versa", ja: "分岐カバレッジ100%は命令カバレッジ100%を含むが、その逆は成り立たない" },
      { vi: "Độ phủ câu lệnh 100% bao hàm độ phủ nhánh 100%", en: "100% statement coverage implies 100% branch coverage", ja: "命令カバレッジ100%は分岐カバレッジ100%を含む" },
      { vi: "Hai loại độ phủ không liên quan gì", en: "The two coverages are unrelated", ja: "2つのカバレッジは無関係" },
      { vi: "Chúng luôn bằng nhau về giá trị", en: "They always have equal values", ja: "両者は常に等しい値になる" }
    ],
    answer: 0,
    exp: { vi: "Đạt độ phủ nhánh 100% thì mọi câu lệnh cũng được chạy, nhưng độ phủ câu lệnh 100% chưa chắc phủ hết nhánh.", en: "Reaching 100% branch coverage runs every statement, but 100% statement coverage may miss branches.", ja: "分岐カバレッジ100%達成なら全命令も実行されるが、命令カバレッジ100%は分岐を見逃すことがある。" }
  },
  {
    q: { vi: "Độ phủ mã (code coverage) được dùng để làm gì?", en: "What is code coverage used for?", ja: "コードカバレッジは何に使われるか？" },
    options: [
      { vi: "Đo sự hài lòng của khách hàng", en: "To measure customer satisfaction", ja: "顧客満足度を測定する" },
      { vi: "Đo mức độ mã nguồn đã được thực thi bởi bộ kiểm thử", en: "To measure how much of the source code has been exercised by the tests", ja: "テストによってソースコードがどれだけ実行されたかを測定する" },
      { vi: "Đo số lượng yêu cầu", en: "To count the number of requirements", ja: "要件の数を数える" },
      { vi: "Đo thời gian phản hồi", en: "To measure response time", ja: "応答時間を測定する" }
    ],
    answer: 1,
    exp: { vi: "Độ phủ mã là một thước đo mức độ kỹ lưỡng của kiểm thử dựa trên cấu trúc mã.", en: "Code coverage is a measure of the thoroughness of testing based on code structure.", ja: "コードカバレッジはコード構造に基づくテストの網羅性の指標である。" }
  },
  {
    q: { vi: "Đoán lỗi (error guessing) là kỹ thuật thuộc nhóm nào?", en: "Error guessing belongs to which category of technique?", ja: "エラー推測はどの技法カテゴリに属するか？" },
    options: [
      { vi: "Kỹ thuật dựa trên cấu trúc (white-box)", en: "Structure-based (white-box) technique", ja: "構造ベース（ホワイトボックス）技法" },
      { vi: "Kỹ thuật dựa trên đặc tả (black-box)", en: "Specification-based (black-box) technique", ja: "仕様ベース（ブラックボックス）技法" },
      { vi: "Kỹ thuật dựa trên kinh nghiệm (experience-based)", en: "Experience-based technique", ja: "経験ベースの技法" },
      { vi: "Kỹ thuật quản lý cấu hình", en: "Configuration management technique", ja: "構成管理の技法" }
    ],
    answer: 2,
    exp: { vi: "Đoán lỗi dựa vào kinh nghiệm, trực giác của tester về nơi có thể có lỗi.", en: "Error guessing relies on the tester's experience and intuition about where defects may be.", ja: "エラー推測はテスターの経験と直感でどこに欠陥があるか推測する。" }
  },
  {
    q: { vi: "Kiểm thử khám phá (exploratory testing) đặc trưng bởi điều gì?", en: "What characterizes exploratory testing?", ja: "探索的テストの特徴は何か？" },
    options: [
      { vi: "Mọi ca kiểm thử được viết chi tiết trước khi thực thi", en: "All test cases are scripted in detail before execution", ja: "すべてのテストケースを実行前に詳細に記述する" },
      { vi: "Chỉ dùng công cụ tự động", en: "Only uses automation tools", ja: "自動化ツールのみを使う" },
      { vi: "Không cần bất kỳ hiểu biết nào về hệ thống", en: "Requires no knowledge of the system", ja: "システムの知識を一切必要としない" },
      { vi: "Thiết kế, thực thi và học hỏi diễn ra đồng thời, thường theo test charter", en: "Test design, execution and learning happen simultaneously, often guided by a test charter", ja: "テスト設計・実行・学習が同時に行われ、しばしばテストチャーターに沿う" }
    ],
    answer: 3,
    exp: { vi: "Kiểm thử khám phá là kỹ thuật kinh nghiệm, kết hợp thiết kế và thực thi song song, thường có charter dẫn hướng.", en: "Exploratory testing is experience-based, combining design and execution in parallel, often steered by a charter.", ja: "探索的テストは経験ベースで、設計と実行を並行し、しばしばチャーターで方向づけられる。" }
  },
  {
    q: { vi: "Kiểm thử dựa trên danh mục kiểm (checklist-based testing) hoạt động thế nào?", en: "How does checklist-based testing work?", ja: "チェックリストベースのテストはどう機能するか？" },
    options: [
      { vi: "Tester dùng một danh sách các mục cần kiểm tra dựa trên kinh nghiệm để hướng dẫn kiểm thử", en: "The tester uses an experience-based list of items to check to guide testing", ja: "テスターは経験に基づく確認項目リストを使ってテストを導く" },
      { vi: "Tester chỉ chạy các script tự động", en: "The tester only runs automated scripts", ja: "テスターは自動スクリプトのみを実行する" },
      { vi: "Tester đo độ phủ câu lệnh", en: "The tester measures statement coverage", ja: "テスターは命令カバレッジを測定する" },
      { vi: "Tester viết bảng quyết định đầy đủ", en: "The tester writes a full decision table", ja: "テスターは完全なデシジョンテーブルを書く" }
    ],
    answer: 0,
    exp: { vi: "Checklist-based testing dùng danh mục dựa trên kinh nghiệm để đảm bảo bao phủ các khía cạnh quan trọng.", en: "Checklist-based testing uses an experience-derived list to ensure important aspects are covered.", ja: "チェックリストベースのテストは経験由来のリストで重要な観点の網羅を確保する。" }
  },
  {
    q: { vi: "ATDD (Acceptance Test-Driven Development) là gì?", en: "What is ATDD (Acceptance Test-Driven Development)?", ja: "ATDD（受け入れテスト駆動開発）とは何か？" },
    options: [
      { vi: "Một công cụ đo độ phủ mã", en: "A code coverage tool", ja: "コードカバレッジツール" },
      { vi: "Cách tiếp cận cộng tác, trong đó các ca kiểm thử chấp nhận được tạo ra từ các tiêu chí chấp nhận trước khi lập trình", en: "A collaborative approach where acceptance tests are created from acceptance criteria before coding", ja: "コーディング前に受け入れ基準から受け入れテストを作成する協働的アプローチ" },
      { vi: "Một loại kiểm thử hiệu năng", en: "A type of performance testing", ja: "性能テストの一種" },
      { vi: "Kỹ thuật chỉ dùng sau khi phát hành", en: "A technique used only after release", ja: "リリース後のみ使う技法" }
    ],
    answer: 1,
    exp: { vi: "ATDD là kỹ thuật cộng tác dựa trên tiêu chí chấp nhận, các bên cùng định nghĩa ca kiểm thử trước khi viết mã.", en: "ATDD is a collaboration-based technique where stakeholders define acceptance tests from criteria before coding.", ja: "ATDDは受け入れ基準からステークホルダーが協働で受け入れテストを定義する協働ベースの技法である。" }
  },
  {
    q: { vi: "Trong ATDD, các ca kiểm thử được dẫn xuất từ đâu?", en: "In ATDD, from what are the test cases derived?", ja: "ATDDでテストケースは何から導出されるか？" },
    options: [
      { vi: "Từ độ phủ nhánh của mã", en: "From the branch coverage of the code", ja: "コードの分岐カバレッジから" },
      { vi: "Từ báo cáo lỗi cũ", en: "From old defect reports", ja: "過去の欠陥レポートから" },
      { vi: "Từ tiêu chí chấp nhận (acceptance criteria) của user story", en: "From the acceptance criteria of the user story", ja: "ユーザーストーリーの受け入れ基準から" },
      { vi: "Từ nhật ký kiểm thử", en: "From test logs", ja: "テストログから" }
    ],
    answer: 2,
    exp: { vi: "Trong ATDD, ca kiểm thử được xây dựng dựa trên tiêu chí chấp nhận đã thống nhất giữa các bên.", en: "In ATDD, test cases are built from acceptance criteria agreed among stakeholders.", ja: "ATDDではステークホルダーが合意した受け入れ基準からテストケースを構築する。" }
  },
  {
    q: { vi: "Định dạng 「Given/When/Then」 thường được dùng trong kỹ thuật nào?", en: "The 'Given/When/Then' format is commonly used in which technique?", ja: "「Given/When/Then」形式はどの技法でよく使われるか？" },
    options: [
      { vi: "Phân tích giá trị biên", en: "Boundary value analysis", ja: "境界値分析" },
      { vi: "Độ phủ câu lệnh", en: "Statement coverage", ja: "命令カバレッジ" },
      { vi: "Kiểm thử chuyển trạng thái", en: "State transition testing", ja: "状態遷移テスト" },
      { vi: "Các cách tiếp cận cộng tác dựa trên hành vi (BDD/ATDD) để mô tả ca kiểm thử", en: "Behavior-based collaborative approaches (BDD/ATDD) to describe test cases", ja: "テストケースを記述する振る舞いベースの協働アプローチ（BDD/ATDD）" }
    ],
    answer: 3,
    exp: { vi: "「Given/When/Then」 mô tả tiền điều kiện, hành động và kết quả kỳ vọng, phổ biến trong ATDD/BDD.", en: "'Given/When/Then' describes preconditions, actions and expected results, common in ATDD/BDD.", ja: "「Given/When/Then」は前提・アクション・期待結果を記述し、ATDD/BDDで一般的である。" }
  },
  {
    q: { vi: "Khi nào nên kết hợp kỹ thuật hộp đen, hộp trắng và dựa trên kinh nghiệm?", en: "When should black-box, white-box and experience-based techniques be combined?", ja: "ブラックボックス・ホワイトボックス・経験ベースの技法はいつ組み合わせるべきか？" },
    options: [
      { vi: "Trong hầu hết dự án, vì mỗi loại phát hiện những khiếm khuyết khác nhau", en: "In most projects, because each type finds different kinds of defects", ja: "ほとんどのプロジェクトで。各技法は異なる欠陥を見つけるため" },
      { vi: "Không bao giờ kết hợp, chỉ chọn một loại", en: "Never combine them, pick only one type", ja: "決して組み合わせず、1種類だけ選ぶ" },
      { vi: "Chỉ khi kiểm thử tự động", en: "Only when automating", ja: "自動化するときのみ" },
      { vi: "Chỉ khi không có yêu cầu", en: "Only when there are no requirements", ja: "要件がないときのみ" }
    ],
    answer: 0,
    exp: { vi: "Kết hợp các loại kỹ thuật cho độ bao phủ tốt hơn vì mỗi loại có điểm mạnh và loại lỗi phát hiện khác nhau.", en: "Combining technique types gives better coverage as each has different strengths and finds different defects.", ja: "各技法は強みと検出する欠陥が異なるため、組み合わせるとより良い網羅が得られる。" }
  },
  {
    q: { vi: "Với đầu vào 「số lượng đặt hàng」 chấp nhận 1 đến 100, phân vùng KHÔNG hợp lệ nào là đúng?", en: "For an 'order quantity' input accepting 1 to 100, which is a valid invalid partition?", ja: "1〜100を受け付ける「注文数量」入力で、正しい無効区分はどれか？" },
    options: [
      { vi: "Chỉ giá trị từ 1 đến 100", en: "Only values from 1 to 100", ja: "1〜100の値のみ" },
      { vi: "0 và nhỏ hơn, cũng như 101 và lớn hơn", en: "0 and below, as well as 101 and above", ja: "0以下、および101以上" },
      { vi: "Chỉ giá trị 50", en: "Only the value 50", ja: "値50のみ" },
      { vi: "Không có phân vùng không hợp lệ", en: "There is no invalid partition", ja: "無効区分は存在しない" }
    ],
    answer: 1,
    exp: { vi: "Phân vùng hợp lệ là 1–100; các phân vùng không hợp lệ là ≤0 và ≥101.", en: "The valid partition is 1–100; invalid partitions are ≤0 and ≥101.", ja: "有効区分は1〜100で、無効区分は0以下と101以上である。" }
  },
  {
    q: { vi: "Mục tiêu của việc dẫn xuất ca kiểm thử từ điều kiện kiểm thử là gì?", en: "What is the goal of deriving test cases from test conditions?", ja: "テスト条件からテストケースを導出する目的は何か？" },
    options: [
      { vi: "Để tính chi phí phần cứng", en: "To calculate hardware cost", ja: "ハードウェアコストを計算する" },
      { vi: "Để ước lượng thời gian phát hành", en: "To estimate the release date", ja: "リリース日を見積もる" },
      { vi: "Chuyển 「cái gì cần kiểm thử」 thành các bước cụ thể có dữ liệu và kết quả kỳ vọng", en: "To turn 'what to test' into concrete steps with data and expected results", ja: "「何をテストするか」をデータと期待結果を伴う具体的な手順に変換する" },
      { vi: "Để đo sự hài lòng khách hàng", en: "To measure customer satisfaction", ja: "顧客満足度を測定する" }
    ],
    answer: 2,
    exp: { vi: "Ca kiểm thử cụ thể hóa điều kiện kiểm thử thành đầu vào, tiền điều kiện và kết quả mong đợi.", en: "Test cases concretize test conditions into inputs, preconditions and expected results.", ja: "テストケースはテスト条件を入力・前提条件・期待結果に具体化する。" }
  },
  {
    q: { vi: "Lợi ích của cách tiếp cận kiểm thử dựa trên cộng tác (collaboration-based) là gì?", en: "What is a benefit of collaboration-based test approaches?", ja: "協働ベースのテストアプローチの利点は何か？" },
    options: [
      { vi: "Loại bỏ nhu cầu kiểm thử hoàn toàn", en: "Eliminates the need for testing entirely", ja: "テストの必要性を完全になくす" },
      { vi: "Chỉ dành cho kiểm thử phi chức năng", en: "Is only for non-functional testing", ja: "非機能テストのみのためのもの" },
      { vi: "Chỉ hữu ích sau khi phát hành", en: "Is only useful after release", ja: "リリース後のみ有用" },
      { vi: "Giúp phát hiện và ngăn ngừa lỗi sớm qua sự tham gia của nhiều bên (dev, tester, nghiệp vụ)", en: "Helps find and prevent defects early through involvement of multiple parties (dev, tester, business)", ja: "複数の関係者（開発・テスト・業務）の関与で欠陥を早期に発見・予防できる" }
    ],
    answer: 3,
    exp: { vi: "Cộng tác giữa các bên (ví dụ Three Amigos) giúp làm rõ yêu cầu và phòng ngừa lỗi ngay từ đầu.", en: "Collaboration (e.g. the Three Amigos) clarifies requirements and prevents defects from the outset.", ja: "関係者の協働（例：Three Amigos）は要件を明確化し最初から欠陥を予防する。" }
  },
  {
    q: { vi: "Kế hoạch kiểm thử (test plan) thường bao gồm nội dung nào?", en: "What does a test plan typically include?", ja: "テスト計画には通常何が含まれるか？" },
    options: [
      { vi: "Phạm vi, mục tiêu, cách tiếp cận, nguồn lực, lịch trình, tiêu chí vào/ra và rủi ro của kiểm thử", en: "Scope, objectives, approach, resources, schedule, entry/exit criteria and test risks", ja: "テストの範囲、目的、アプローチ、リソース、スケジュール、入場・退場基準、リスク" },
      { vi: "Chỉ mã nguồn của sản phẩm", en: "Only the product source code", ja: "製品のソースコードのみ" },
      { vi: "Chỉ danh sách lỗi đã tìm được", en: "Only the list of defects found", ja: "見つかった欠陥のリストのみ" },
      { vi: "Chỉ báo cáo tài chính", en: "Only financial reports", ja: "財務報告のみ" }
    ],
    answer: 0,
    exp: { vi: "Kế hoạch kiểm thử tài liệu hóa mục tiêu, phạm vi, cách tiếp cận, lịch, nguồn lực và tiêu chí.", en: "A test plan documents objectives, scope, approach, schedule, resources and criteria.", ja: "テスト計画は目的・範囲・アプローチ・スケジュール・リソース・基準を文書化する。" }
  },
  {
    q: { vi: "Tiêu chí vào (entry criteria) xác định điều gì?", en: "What do entry criteria define?", ja: "入場基準（entry criteria）は何を定義するか？" },
    options: [
      { vi: "Điều kiện để kết thúc kiểm thử", en: "The conditions to stop testing", ja: "テストを終了する条件" },
      { vi: "Điều kiện cần thỏa mãn trước khi bắt đầu một hoạt động kiểm thử", en: "The conditions that must be met before a test activity can start", ja: "テスト活動を開始する前に満たすべき条件" },
      { vi: "Số lượng lỗi tối đa cho phép", en: "The maximum number of defects allowed", ja: "許容される欠陥の最大数" },
      { vi: "Ngân sách của dự án", en: "The project budget", ja: "プロジェクト予算" }
    ],
    answer: 1,
    exp: { vi: "Entry criteria là các điều kiện tiên quyết (ví dụ môi trường sẵn sàng, mã đã build) để bắt đầu kiểm thử.", en: "Entry criteria are prerequisites (e.g. environment ready, code built) to begin testing.", ja: "入場基準はテスト開始のための前提条件（例：環境準備完了、ビルド済み）である。" }
  },
  {
    q: { vi: "Tiêu chí ra (exit criteria / definition of done) xác định điều gì?", en: "What do exit criteria (definition of done) define?", ja: "退場基準（完了の定義）は何を定義するか？" },
    options: [
      { vi: "Khi nào bắt đầu viết ca kiểm thử", en: "When to start writing test cases", ja: "テストケースを書き始めるとき" },
      { vi: "Ai sẽ điều phối rà soát", en: "Who moderates the review", ja: "誰がレビューを進行するか" },
      { vi: "Khi nào một hoạt động kiểm thử có thể được coi là hoàn tất", en: "When a test activity can be considered complete", ja: "テスト活動をいつ完了とみなせるか" },
      { vi: "Cấu trúc của mã nguồn", en: "The structure of the source code", ja: "ソースコードの構造" }
    ],
    answer: 2,
    exp: { vi: "Exit criteria (ví dụ mức độ phủ đạt, không còn lỗi nghiêm trọng) xác định khi nào dừng kiểm thử.", en: "Exit criteria (e.g. coverage achieved, no critical defects) define when to stop testing.", ja: "退場基準（例：カバレッジ達成、重大欠陥なし）はテストをいつ止めるか決める。" }
  },
  {
    q: { vi: "Trong kiểm thử dựa trên rủi ro (risk-based testing), mức rủi ro được tính từ đâu?", en: "In risk-based testing, how is the risk level determined?", ja: "リスクベーステストで、リスクレベルはどう決まるか？" },
    options: [
      { vi: "Chỉ từ số dòng mã", en: "Only from the number of lines of code", ja: "コード行数のみから" },
      { vi: "Chỉ từ số lượng tester", en: "Only from the number of testers", ja: "テスターの数のみから" },
      { vi: "Chỉ từ ngân sách", en: "Only from the budget", ja: "予算のみから" },
      { vi: "Từ khả năng xảy ra (likelihood) và mức độ tác động (impact) của rủi ro", en: "From the likelihood of occurrence and the impact of the risk", ja: "リスクの発生可能性（likelihood）と影響度（impact）から" }
    ],
    answer: 3,
    exp: { vi: "Mức rủi ro = khả năng xảy ra × mức tác động; dùng để ưu tiên nỗ lực kiểm thử.", en: "Risk level = likelihood × impact; used to prioritize test effort.", ja: "リスクレベル＝発生可能性×影響度で、テスト作業の優先順位付けに使う。" }
  },
  {
    q: { vi: "Rủi ro sản phẩm (product risk) khác rủi ro dự án (project risk) như thế nào?", en: "How does a product risk differ from a project risk?", ja: "製品リスクとプロジェクトリスクはどう異なるか？" },
    options: [
      { vi: "Rủi ro sản phẩm liên quan chất lượng sản phẩm; rủi ro dự án liên quan quản lý và kiểm soát dự án", en: "Product risk concerns product quality; project risk concerns management and control of the project", ja: "製品リスクは製品品質に、プロジェクトリスクはプロジェクトの管理・統制に関わる" },
      { vi: "Chúng giống hệt nhau", en: "They are identical", ja: "両者はまったく同じ" },
      { vi: "Rủi ro dự án chỉ về mã nguồn", en: "Project risk is only about source code", ja: "プロジェクトリスクはソースコードのみに関わる" },
      { vi: "Rủi ro sản phẩm chỉ về lịch trình", en: "Product risk is only about schedule", ja: "製品リスクはスケジュールのみに関わる" }
    ],
    answer: 0,
    exp: { vi: "Rủi ro sản phẩm là khả năng sản phẩm không đạt chất lượng; rủi ro dự án ảnh hưởng khả năng đạt mục tiêu dự án.", en: "Product risk is the possibility the product falls short on quality; project risk affects meeting project objectives.", ja: "製品リスクは製品が品質に達しない可能性、プロジェクトリスクは目標達成に影響する。" }
  },
  {
    q: { vi: "Rủi ro sản phẩm cao ảnh hưởng đến kiểm thử như thế nào?", en: "How does a high product risk affect testing?", ja: "高い製品リスクはテストにどう影響するか？" },
    options: [
      { vi: "Không cần kiểm thử gì thêm", en: "No additional testing is needed", ja: "追加のテストは不要" },
      { vi: "Cần kiểm thử kỹ hơn, sớm hơn và dùng kỹ thuật nghiêm ngặt hơn cho vùng rủi ro cao", en: "It warrants deeper, earlier testing and more rigorous techniques for high-risk areas", ja: "高リスク領域にはより深く早期のテストと厳格な技法が必要になる" },
      { vi: "Chỉ cần kiểm thử sau khi phát hành", en: "Test only after release", ja: "リリース後のみテストする" },
      { vi: "Giảm nỗ lực kiểm thử ở vùng rủi ro cao", en: "Reduce test effort in high-risk areas", ja: "高リスク領域のテスト作業を減らす" }
    ],
    answer: 1,
    exp: { vi: "Vùng rủi ro cao được ưu tiên với kiểm thử sâu, sớm và kỹ thuật phù hợp để giảm rủi ro.", en: "High-risk areas are prioritized with deeper, earlier testing and suitable techniques to mitigate risk.", ja: "高リスク領域はリスク軽減のため深く早いテストと適切な技法で優先される。" }
  },
  {
    q: { vi: "Yếu tố nào KHÔNG phải là thông tin bắt buộc điển hình trong một báo cáo lỗi (defect report)?", en: "Which is NOT typically required information in a defect report?", ja: "欠陥レポートに通常必要な情報でないものはどれか？" },
    options: [
      { vi: "Các bước tái hiện lỗi", en: "Steps to reproduce", ja: "再現手順" },
      { vi: "Kết quả thực tế và kết quả kỳ vọng", en: "Actual and expected results", ja: "実際の結果と期待される結果" },
      { vi: "Lương của lập trình viên gây ra lỗi", en: "The salary of the developer who caused the defect", ja: "欠陥を作った開発者の給与" },
      { vi: "Mức độ nghiêm trọng và ưu tiên", en: "Severity and priority", ja: "重要度と優先度" }
    ],
    answer: 2,
    exp: { vi: "Báo cáo lỗi cần thông tin để tái hiện và phân loại, không cần thông tin cá nhân như lương.", en: "A defect report needs information to reproduce and classify, not personal data like salary.", ja: "欠陥レポートには再現・分類のための情報が必要で、給与など個人情報は不要である。" }
  },
  {
    q: { vi: "Sự khác biệt giữa 「severity」 và 「priority」 của một lỗi là gì?", en: "What is the difference between a defect's 'severity' and 'priority'?", ja: "欠陥の「重要度（severity）」と「優先度（priority）」の違いは何か？" },
    options: [
      { vi: "Chúng luôn có cùng giá trị", en: "They always have the same value", ja: "両者は常に同じ値" },
      { vi: "Priority chỉ do lập trình viên quyết định", en: "Priority is decided only by developers", ja: "優先度は開発者のみが決める" },
      { vi: "Severity liên quan tới ngân sách", en: "Severity relates to budget", ja: "重要度は予算に関わる" },
      { vi: "Severity là mức tác động kỹ thuật; priority là mức khẩn cấp cần sửa", en: "Severity is the technical impact; priority is how urgently it should be fixed", ja: "重要度は技術的な影響度、優先度はどれだけ急いで修正すべきか" }
    ],
    answer: 3,
    exp: { vi: "Một lỗi có thể nghiêm trọng nhưng ưu tiên thấp (hiếm gặp), hoặc ít nghiêm trọng nhưng ưu tiên cao.", en: "A defect can be severe but low priority (rare case), or minor but high priority.", ja: "欠陥は重大だが優先度が低い（稀）場合も、軽微だが優先度が高い場合もある。" }
  },
  {
    q: { vi: "Quản lý cấu hình (configuration management) hỗ trợ kiểm thử như thế nào?", en: "How does configuration management support testing?", ja: "構成管理はテストをどう支援するか？" },
    options: [
      { vi: "Đảm bảo mọi sản phẩm công việc kiểm thử được nhận dạng, kiểm soát phiên bản và truy xuất được", en: "It ensures all test work products are identified, version-controlled and traceable", ja: "すべてのテスト成果物が識別・版管理・追跡可能であることを保証する" },
      { vi: "Nó chỉ dùng để đo hiệu năng", en: "It is only used to measure performance", ja: "性能測定にのみ使う" },
      { vi: "Nó thay thế báo cáo lỗi", en: "It replaces defect reports", ja: "欠陥レポートを置き換える" },
      { vi: "Nó chỉ áp dụng cho phần cứng", en: "It applies only to hardware", ja: "ハードウェアのみに適用される" }
    ],
    answer: 0,
    exp: { vi: "Configuration management giúp kiểm soát phiên bản của testware, môi trường và đối tượng kiểm thử, đảm bảo tính nhất quán.", en: "Configuration management controls versions of testware, environment and test items, ensuring consistency.", ja: "構成管理はテストウェア・環境・テスト対象の版を管理し、一貫性を保証する。" }
  },
  {
    q: { vi: "Báo cáo tiến độ kiểm thử (test progress report) chủ yếu dùng để làm gì?", en: "What is a test progress report mainly used for?", ja: "テスト進捗レポートは主に何に使われるか？" },
    options: [
      { vi: "Chỉ để lưu trữ mã nguồn", en: "To store source code", ja: "ソースコードを保存する" },
      { vi: "Cung cấp thông tin đang diễn ra về trạng thái kiểm thử để hỗ trợ ra quyết định và kiểm soát", en: "To provide ongoing information about test status supporting decisions and control", ja: "意思決定と統制を支援するテスト状況の継続的な情報を提供する" },
      { vi: "Chỉ để tính lương nhóm", en: "To calculate team salaries", ja: "チームの給与を計算する" },
      { vi: "Để thay thế kế hoạch kiểm thử", en: "To replace the test plan", ja: "テスト計画を置き換える" }
    ],
    answer: 1,
    exp: { vi: "Báo cáo tiến độ (thường định kỳ) giúp giám sát và kiểm soát hoạt động kiểm thử đang diễn ra.", en: "Progress reports (usually periodic) help monitor and control ongoing test activities.", ja: "進捗レポート（通常定期的）は進行中のテスト活動の監視と統制を助ける。" }
  },
  {
    q: { vi: "Báo cáo tổng kết kiểm thử (test summary/completion report) được tạo khi nào?", en: "When is a test summary (completion) report produced?", ja: "テストサマリ（完了）レポートはいつ作成されるか？" },
    options: [
      { vi: "Trước khi bắt đầu bất kỳ hoạt động kiểm thử nào", en: "Before any test activity begins", ja: "テスト活動を始める前に" },
      { vi: "Chỉ khi có lỗi nghiêm trọng", en: "Only when there is a critical defect", ja: "重大欠陥があるときのみ" },
      { vi: "Khi một mốc kiểm thử hoàn tất, tóm tắt kết quả và đánh giá so với mục tiêu", en: "When a test milestone is complete, summarizing results and assessing against objectives", ja: "テストのマイルストーン完了時に、結果を要約し目的と照らして評価する" },
      { vi: "Mỗi khi chạy một ca kiểm thử", en: "Every time a single test case runs", ja: "テストケースを1つ実行するたびに" }
    ],
    answer: 2,
    exp: { vi: "Báo cáo tổng kết được lập cuối một giai đoạn/dự án, tổng hợp kết quả và bài học cho các bên.", en: "A summary report is written at the end of a phase/project, consolidating results and lessons for stakeholders.", ja: "サマリレポートはフェーズ/プロジェクト終了時に作成され、結果と教訓を関係者向けにまとめる。" }
  },
  {
    q: { vi: "Yếu tố nào ảnh hưởng đến việc ước lượng nỗ lực kiểm thử (test estimation)?", en: "Which factor influences test effort estimation?", ja: "テスト工数の見積もりに影響する要因はどれか？" },
    options: [
      { vi: "Chỉ màu sắc giao diện", en: "Only the UI colors", ja: "UIの色のみ" },
      { vi: "Chỉ tên của dự án", en: "Only the project name", ja: "プロジェクト名のみ" },
      { vi: "Chỉ số lượng cuộc họp", en: "Only the number of meetings", ja: "会議の数のみ" },
      { vi: "Đặc điểm sản phẩm, quy trình, con người và kết quả kiểm thử", en: "Product characteristics, process, people and test results", ja: "製品特性、プロセス、人、テスト結果" }
    ],
    answer: 3,
    exp: { vi: "Ước lượng phụ thuộc vào độ phức tạp sản phẩm, quy trình, kỹ năng con người và dữ liệu lịch sử.", en: "Estimation depends on product complexity, process, people's skills and historical data.", ja: "見積もりは製品の複雑さ、プロセス、人のスキル、履歴データに依存する。" }
  },
  {
    q: { vi: "Kỹ thuật ước lượng dựa trên số liệu (metrics-based) hoạt động thế nào?", en: "How does the metrics-based estimation technique work?", ja: "メトリクスベースの見積もり技法はどう機能するか？" },
    options: [
      { vi: "Dùng dữ liệu từ các dự án tương tự trước đó để ước lượng nỗ lực kiểm thử", en: "It uses data from similar previous projects to estimate test effort", ja: "類似の過去プロジェクトのデータでテスト工数を見積もる" },
      { vi: "Chỉ dựa trên phỏng đoán ngẫu nhiên", en: "It relies only on random guessing", ja: "ランダムな推測のみに頼る" },
      { vi: "Chỉ hỏi khách hàng", en: "It only asks the customer", ja: "顧客に尋ねるだけ" },
      { vi: "Không dùng dữ liệu lịch sử", en: "It does not use historical data", ja: "履歴データを使わない" }
    ],
    answer: 0,
    exp: { vi: "Ước lượng dựa trên số liệu dùng dữ liệu lịch sử; ước lượng dựa trên chuyên gia dùng kinh nghiệm của các thành viên.", en: "Metrics-based estimation uses historical data; expert-based estimation uses team members' experience.", ja: "メトリクスベースは履歴データを、専門家ベースはメンバーの経験を使う。" }
  },
  {
    q: { vi: "Kỹ thuật ước lượng 「planning poker」 thường được dùng trong bối cảnh nào?", en: "In what context is the 'planning poker' estimation technique commonly used?", ja: "「プランニングポーカー」の見積もり技法はどんな文脈でよく使われるか？" },
    options: [
      { vi: "Chỉ khi kiểm thử hiệu năng", en: "Only for performance testing", ja: "性能テストのときのみ" },
      { vi: "Trong nhóm Agile, dựa trên chuyên gia và sự đồng thuận của cả nhóm", en: "In Agile teams, an expert-based, whole-team consensus approach", ja: "アジャイルチームで、専門家ベースかつチーム全体の合意による" },
      { vi: "Chỉ do một người quản lý quyết định", en: "Decided only by a single manager", ja: "管理者一人だけで決定する" },
      { vi: "Chỉ dùng cho phần cứng", en: "Only used for hardware", ja: "ハードウェアのみに使う" }
    ],
    answer: 1,
    exp: { vi: "Planning poker là kỹ thuật dựa trên chuyên gia, cả nhóm cùng ước lượng để đạt đồng thuận.", en: "Planning poker is an expert-based technique where the whole team estimates to reach consensus.", ja: "プランニングポーカーは専門家ベースの技法で、チーム全体で見積もり合意する。" }
  },
  {
    q: { vi: "Giám sát và kiểm soát kiểm thử (test monitoring and control) nhằm mục đích gì?", en: "What is the purpose of test monitoring and control?", ja: "テストの監視とコントロールの目的は何か？" },
    options: [
      { vi: "Chỉ để viết mã nguồn", en: "Only to write source code", ja: "ソースコードを書くだけ" },
      { vi: "Chỉ để thiết kế giao diện", en: "Only to design the UI", ja: "UIを設計するだけ" },
      { vi: "Thu thập thông tin về tiến độ và đưa ra hành động điều chỉnh khi cần", en: "To gather information on progress and take corrective actions when needed", ja: "進捗情報を収集し、必要に応じて是正措置を取る" },
      { vi: "Chỉ để đóng dự án", en: "Only to close the project", ja: "プロジェクトを閉じるだけ" }
    ],
    answer: 2,
    exp: { vi: "Giám sát so sánh tiến độ thực tế với kế hoạch; kiểm soát thực hiện hành động điều chỉnh.", en: "Monitoring compares actual progress with the plan; control takes corrective action.", ja: "監視は実績と計画を比較し、コントロールは是正措置を取る。" }
  },
  {
    q: { vi: "Thước đo nào là ví dụ của số liệu độ phủ (coverage metric)?", en: "Which is an example of a coverage metric?", ja: "カバレッジメトリクスの例はどれか？" },
    options: [
      { vi: "Số lượng nhân viên trong công ty", en: "The number of employees in the company", ja: "会社の従業員数" },
      { vi: "Chi phí điện hàng tháng", en: "The monthly electricity cost", ja: "毎月の電気代" },
      { vi: "Màu nền của báo cáo", en: "The background color of the report", ja: "レポートの背景色" },
      { vi: "Phần trăm yêu cầu hoặc mã đã được kiểm thử bao phủ", en: "The percentage of requirements or code covered by tests", ja: "テストで網羅された要件またはコードの割合" }
    ],
    answer: 3,
    exp: { vi: "Số liệu độ phủ đo tỷ lệ phần được kiểm thử so với tổng thể (yêu cầu, mã, rủi ro...).", en: "Coverage metrics measure the proportion of items tested relative to the total (requirements, code, risks).", ja: "カバレッジメトリクスはテストされた項目の割合（要件・コード・リスク等）を測る。" }
  },
  {
    q: { vi: "Trong quy trình quản lý lỗi, trạng thái vòng đời của một lỗi (defect lifecycle) thể hiện điều gì?", en: "In defect management, what does a defect's lifecycle status represent?", ja: "欠陥管理で、欠陥のライフサイクル状態は何を表すか？" },
    options: [
      { vi: "Vị trí hiện tại của lỗi trong quá trình xử lý (ví dụ mới, đã gán, đã sửa, đã đóng)", en: "The current position of the defect in its handling process (e.g. new, assigned, fixed, closed)", ja: "処理過程における欠陥の現在位置（例：新規、割当済、修正済、クローズ）" },
      { vi: "Mức lương của người sửa lỗi", en: "The salary of the person fixing it", ja: "修正者の給与" },
      { vi: "Số dòng mã của sản phẩm", en: "The number of lines of code", ja: "製品のコード行数" },
      { vi: "Màu sắc của giao diện", en: "The color of the interface", ja: "インターフェースの色" }
    ],
    answer: 0,
    exp: { vi: "Vòng đời lỗi theo dõi trạng thái từ khi phát hiện đến khi đóng, giúp quản lý và báo cáo.", en: "The defect lifecycle tracks status from detection to closure, aiding management and reporting.", ja: "欠陥ライフサイクルは発見からクローズまでの状態を追い、管理と報告を助ける。" }
  },
  {
    q: { vi: "Vì sao giao tiếp tốt trong báo cáo lỗi lại quan trọng?", en: "Why is good communication in defect reporting important?", ja: "欠陥報告で良好なコミュニケーションが重要なのはなぜか？" },
    options: [
      { vi: "Để chỉ trích lập trình viên", en: "To criticize the developer", ja: "開発者を批判するため" },
      { vi: "Giúp lỗi được hiểu, tái hiện và xử lý nhanh chóng, tránh hiểu lầm giữa các bên", en: "It helps defects be understood, reproduced and resolved quickly, avoiding misunderstandings", ja: "欠陥の理解・再現・解決を迅速にし、関係者間の誤解を避ける" },
      { vi: "Để tăng số lượng cuộc họp", en: "To increase the number of meetings", ja: "会議の数を増やすため" },
      { vi: "Vì báo cáo lỗi không cần chính xác", en: "Because defect reports need not be accurate", ja: "欠陥レポートは正確でなくてよいため" }
    ],
    answer: 1,
    exp: { vi: "Báo cáo lỗi rõ ràng, khách quan giúp xử lý hiệu quả và duy trì quan hệ tốt trong nhóm.", en: "Clear, objective defect reports enable efficient resolution and good team relationships.", ja: "明確で客観的な欠陥レポートは効率的な解決と良好なチーム関係を可能にする。" }
  },
  {
    q: { vi: "Loại công cụ nào giúp quản lý ca kiểm thử, truy xuất và báo cáo tiến độ?", en: "Which tool type helps manage test cases, traceability and progress reporting?", ja: "テストケース管理・トレーサビリティ・進捗報告を助けるツールはどれか？" },
    options: [
      { vi: "Công cụ đo hiệu năng mạng", en: "Network performance tools", ja: "ネットワーク性能ツール" },
      { vi: "Trình biên dịch mã nguồn", en: "A source code compiler", ja: "ソースコードコンパイラ" },
      { vi: "Công cụ quản lý kiểm thử và quản lý yêu cầu", en: "Test management and requirements management tools", ja: "テスト管理・要件管理ツール" },
      { vi: "Phần mềm chỉnh sửa ảnh", en: "Image editing software", ja: "画像編集ソフト" }
    ],
    answer: 2,
    exp: { vi: "Công cụ quản lý kiểm thử tổ chức ca kiểm thử, liên kết truy xuất và tổng hợp báo cáo tiến độ.", en: "Test management tools organize test cases, maintain traceability and consolidate progress reports.", ja: "テスト管理ツールはテストケースを整理し、トレーサビリティを保ち、進捗報告をまとめる。" }
  },
  {
    q: { vi: "Lợi ích tiềm năng của việc hỗ trợ kiểm thử bằng công cụ là gì?", en: "What is a potential benefit of tool support for testing?", ja: "テストのツール支援の潜在的な利点は何か？" },
    options: [
      { vi: "Đảm bảo không còn lỗi nào", en: "Guaranteeing no defects remain", ja: "欠陥がゼロであることを保証する" },
      { vi: "Loại bỏ hoàn toàn nhu cầu con người", en: "Completely removing the need for people", ja: "人の必要性を完全になくす" },
      { vi: "Luôn rẻ hơn kiểm thử thủ công", en: "Always being cheaper than manual testing", ja: "常に手動テストより安い" },
      { vi: "Giảm công việc lặp lại, tăng nhất quán và cung cấp phép đo khách quan", en: "Reducing repetitive work, increasing consistency and providing objective measurement", ja: "反復作業の削減、一貫性の向上、客観的な測定の提供" }
    ],
    answer: 3,
    exp: { vi: "Công cụ giúp tự động hóa việc lặp lại, giảm sai sót thủ công và cung cấp số liệu, nhưng không thay thế tư duy con người.", en: "Tools automate repetition, reduce manual error and provide metrics, but do not replace human insight.", ja: "ツールは反復を自動化し手動ミスを減らしメトリクスを提供するが、人の洞察を置き換えない。" }
  },
  {
    q: { vi: "Rủi ro tiềm ẩn khi dùng công cụ kiểm thử là gì?", en: "What is a potential risk of using test tools?", ja: "テストツール使用の潜在的なリスクは何か？" },
    options: [
      { vi: "Kỳ vọng phi thực tế, đánh giá thấp công sức triển khai và bảo trì công cụ", en: "Unrealistic expectations and underestimating the effort to introduce and maintain the tool", ja: "非現実的な期待、ツール導入・保守の工数の過小評価" },
      { vi: "Công cụ luôn tự động sửa mọi lỗi", en: "Tools always fix all defects automatically", ja: "ツールがすべての欠陥を自動修正する" },
      { vi: "Công cụ không bao giờ cần cập nhật", en: "Tools never need updating", ja: "ツールは更新を一切必要としない" },
      { vi: "Công cụ luôn miễn phí", en: "Tools are always free", ja: "ツールは常に無料" }
    ],
    answer: 0,
    exp: { vi: "Rủi ro gồm kỳ vọng quá cao, chi phí triển khai/bảo trì bị xem nhẹ và phụ thuộc quá mức vào công cụ.", en: "Risks include over-high expectations, underestimated deployment/maintenance costs and over-reliance on tools.", ja: "リスクには過大な期待、導入・保守コストの過小評価、ツールへの過度な依存が含まれる。" }
  },
  {
    q: { vi: "Trước khi triển khai rộng một công cụ kiểm thử mới trong tổ chức, nên làm gì?", en: "Before rolling out a new test tool broadly in an organization, what should be done?", ja: "新しいテストツールを組織で広く展開する前に何をすべきか？" },
    options: [
      { vi: "Mua giấy phép cho toàn bộ công ty ngay lập tức", en: "Immediately buy licenses for the whole company", ja: "直ちに全社分のライセンスを購入する" },
      { vi: "Thực hiện dự án thử nghiệm (pilot) để đánh giá sự phù hợp và học cách dùng", en: "Run a pilot project to evaluate suitability and learn how to use it", ja: "適合性を評価し使い方を学ぶためパイロットプロジェクトを実施する" },
      { vi: "Loại bỏ mọi kiểm thử thủ công", en: "Eliminate all manual testing", ja: "すべての手動テストをなくす" },
      { vi: "Bỏ qua đào tạo người dùng", en: "Skip user training", ja: "ユーザートレーニングを省く" }
    ],
    answer: 1,
    exp: { vi: "Một pilot giúp đánh giá tính phù hợp, xác định quy trình và giảm rủi ro trước khi nhân rộng.", en: "A pilot helps assess fit, define processes and reduce risk before scaling up.", ja: "パイロットは適合性評価・プロセス定義・リスク低減に役立ち、拡大前に行う。" }
  },
  {
    q: { vi: "Công cụ nào phù hợp để thực thi kiểm thử hồi quy lặp lại nhiều lần?", en: "Which tool is suitable for executing repetitive regression tests?", ja: "反復的な回帰テストの実行に適したツールはどれか？" },
    options: [
      { vi: "Công cụ vẽ sơ đồ tổ chức", en: "An org chart drawing tool", ja: "組織図作成ツール" },
      { vi: "Phần mềm kế toán", en: "Accounting software", ja: "会計ソフト" },
      { vi: "Công cụ tự động hóa thực thi kiểm thử (test execution automation)", en: "Test execution automation tools", ja: "テスト実行自動化ツール" },
      { vi: "Trình phát nhạc", en: "A music player", ja: "音楽プレーヤー" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử hồi quy lặp lại và ổn định là ứng viên tốt cho tự động hóa thực thi kiểm thử.", en: "Stable, repetitive regression tests are good candidates for test execution automation.", ja: "安定して反復する回帰テストはテスト実行自動化の良い候補である。" }
  },
  {
    q: { vi: "Vì sao không nên tự động hóa toàn bộ kiểm thử?", en: "Why should not all testing be automated?", ja: "すべてのテストを自動化すべきでないのはなぜか？" },
    options: [
      { vi: "Vì tự động hóa luôn cho kết quả sai", en: "Because automation always gives wrong results", ja: "自動化は常に誤った結果を出すため" },
      { vi: "Vì công cụ không thể chạy kiểm thử", en: "Because tools cannot run tests", ja: "ツールはテストを実行できないため" },
      { vi: "Vì kiểm thử thủ công luôn nhanh hơn", en: "Because manual testing is always faster", ja: "手動テストが常に速いため" },
      { vi: "Một số kiểm thử (như khám phá, khả dụng) cần đánh giá của con người và tự động hóa có chi phí bảo trì", en: "Some testing (e.g. exploratory, usability) needs human judgment and automation has maintenance costs", ja: "一部のテスト（探索的・使用性など）は人の判断が必要で、自動化には保守コストがある" }
    ],
    answer: 3,
    exp: { vi: "Tự động hóa phù hợp với kiểm thử lặp lại, ổn định; kiểm thử cần sáng tạo và đánh giá con người vẫn nên làm thủ công.", en: "Automation suits stable, repetitive tests; tests needing creativity and human judgment are better done manually.", ja: "自動化は安定した反復テストに適し、創造性や人の判断が必要なテストは手動が良い。" }
  },
  {
    q: { vi: "Vì sao kiểm thử là cần thiết trong phát triển phần mềm?", en: "Why is testing necessary in software development?", ja: "ソフトウェア開発でテストが必要なのはなぜか？" },
    options: [
      { vi: "Giúp giảm rủi ro thất bại khi vận hành và góp phần đạt chất lượng theo yêu cầu", en: "It helps reduce the risk of operational failures and contributes to achieving required quality", ja: "運用時の故障リスクを減らし、必要な品質達成に貢献するため" },
      { vi: "Để làm cho dự án tốn kém hơn", en: "To make the project more expensive", ja: "プロジェクトをより高価にするため" },
      { vi: "Vì luật luôn cấm phát hành phần mềm chưa kiểm thử", en: "Because the law always forbids releasing untested software", ja: "法律が未テストのソフトウェアのリリースを常に禁じるため" },
      { vi: "Để thay thế hoàn toàn hoạt động thiết kế", en: "To completely replace design activities", ja: "設計活動を完全に置き換えるため" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử giúp phát hiện lỗi, giảm rủi ro và tăng sự tự tin về chất lượng trước khi phát hành.", en: "Testing finds defects, reduces risk and builds confidence in quality before release.", ja: "テストは欠陥を発見しリスクを減らし、リリース前の品質への自信を高める。" }
  },
  {
    q: { vi: "Kiểm thử 「debugging」 (gỡ lỗi) khác kiểm thử (testing) như thế nào?", en: "How does debugging differ from testing?", ja: "デバッグはテストとどう異なるか？" },
    options: [
      { vi: "Chúng là cùng một hoạt động", en: "They are the same activity", ja: "両者は同じ活動である" },
      { vi: "Testing tìm ra failure; debugging là hoạt động của lập trình viên nhằm tìm nguyên nhân và sửa defect", en: "Testing finds failures; debugging is a developer activity to find the cause and fix defects", ja: "テストは故障を見つけ、デバッグは開発者が原因を特定し欠陥を修正する活動である" },
      { vi: "Debugging luôn do tester thực hiện", en: "Debugging is always done by testers", ja: "デバッグは常にテスターが行う" },
      { vi: "Testing luôn sửa lỗi trong mã", en: "Testing always fixes defects in code", ja: "テストは常にコードの欠陥を修正する" }
    ],
    answer: 1,
    exp: { vi: "Testing phát hiện biểu hiện lỗi; debugging định vị nguyên nhân và khắc phục, thường do lập trình viên làm.", en: "Testing reveals failures; debugging locates the cause and fixes it, usually by developers.", ja: "テストは故障を明らかにし、デバッグは原因を特定・修正する（通常開発者が行う）。" }
  },
  {
    q: { vi: "Kiểm thử alpha và kiểm thử beta là các dạng của mức kiểm thử nào?", en: "Alpha and beta testing are forms of which test level?", ja: "アルファテストとベータテストはどのテストレベルの形態か？" },
    options: [
      { vi: "Kiểm thử đơn vị (component testing)", en: "Component testing", ja: "コンポーネントテスト" },
      { vi: "Kiểm thử tích hợp thành phần", en: "Component integration testing", ja: "コンポーネント統合テスト" },
      { vi: "Kiểm thử chấp nhận (acceptance testing)", en: "Acceptance testing", ja: "受け入れテスト" },
      { vi: "Kiểm thử tĩnh", en: "Static testing", ja: "静的テスト" }
    ],
    answer: 2,
    exp: { vi: "Alpha (tại nơi phát triển) và beta (tại nơi người dùng) là các hình thức kiểm thử chấp nhận vận hành/người dùng.", en: "Alpha (at the developer site) and beta (at the user site) are forms of user/operational acceptance testing.", ja: "アルファ（開発現場）とベータ（利用者現場）は利用者/運用受け入れテストの形態である。" }
  },
  {
    q: { vi: "Kiểm thử tích hợp từ trên xuống (top-down) khác từ dưới lên (bottom-up) chủ yếu ở điểm nào?", en: "How do top-down and bottom-up integration testing mainly differ?", ja: "トップダウンとボトムアップの統合テストの主な違いは何か？" },
    options: [
      { vi: "Không có khác biệt nào", en: "There is no difference", ja: "違いはない" },
      { vi: "Chỉ khác về ngôn ngữ lập trình", en: "They differ only in programming language", ja: "プログラミング言語だけが異なる" },
      { vi: "Cả hai đều không cần kiểm thử tích hợp", en: "Neither needs integration testing", ja: "どちらも統合テストを必要としない" },
      { vi: "Thứ tự tích hợp thành phần và loại giả lập cần dùng (stub cho top-down, driver cho bottom-up)", en: "The order components are integrated and the type of substitute needed (stubs for top-down, drivers for bottom-up)", ja: "コンポーネントを統合する順序と必要な代替物（トップダウンはスタブ、ボトムアップはドライバ）" }
    ],
    answer: 3,
    exp: { vi: "Top-down dùng stub cho các mô-đun cấp dưới chưa có; bottom-up dùng driver cho mô-đun cấp trên.", en: "Top-down uses stubs for lower modules not yet ready; bottom-up uses drivers for upper modules.", ja: "トップダウンは未完成の下位モジュールにスタブを、ボトムアップは上位モジュールにドライバを使う。" }
  },
  {
    q: { vi: "Kiểm thử khói (smoke testing) nhằm mục đích gì?", en: "What is the purpose of smoke testing?", ja: "スモークテストの目的は何か？" },
    options: [
      { vi: "Kiểm tra nhanh các chức năng chính hoạt động ổn định trước khi kiểm thử sâu hơn", en: "To quickly check that the main functions work before deeper testing", ja: "詳細なテストの前に主要機能が動作するか素早く確認する" },
      { vi: "Kiểm thử toàn diện mọi ngóc ngách", en: "To exhaustively test every corner", ja: "あらゆる部分を網羅的にテストする" },
      { vi: "Kiểm thử hiệu năng dưới tải cực đại", en: "To test performance under maximum load", ja: "最大負荷での性能をテストする" },
      { vi: "Chỉ kiểm thử tài liệu", en: "To test documents only", ja: "文書のみをテストする" }
    ],
    answer: 0,
    exp: { vi: "Smoke test là bộ kiểm thử ngắn xác nhận build đủ ổn định để tiếp tục kiểm thử.", en: "A smoke test is a short suite confirming the build is stable enough to continue testing.", ja: "スモークテストはビルドがテスト継続に十分安定しているか確認する短いスイートである。" }
  },
  {
    q: { vi: "Nguyên lý 「lỗi tập trung」 (defect clustering) gợi ý điều gì cho tester?", en: "What does the 'defect clustering' principle suggest to testers?", ja: "「欠陥の偏在（クラスタリング）」の原則はテスターに何を示唆するか？" },
    options: [
      { vi: "Lỗi luôn phân bố đều khắp hệ thống", en: "Defects are always evenly spread across the system", ja: "欠陥はシステム全体に常に均等に分布する" },
      { vi: "Một số ít mô-đun thường chứa phần lớn lỗi, nên tập trung kiểm thử vào đó", en: "A small number of modules often contain most defects, so focus testing there", ja: "少数のモジュールが大半の欠陥を含むことが多いため、そこに集中する" },
      { vi: "Không cần kiểm thử vùng rủi ro cao", en: "No need to test high-risk areas", ja: "高リスク領域をテストする必要はない" },
      { vi: "Mỗi mô-đun có đúng một lỗi", en: "Each module has exactly one defect", ja: "各モジュールにはちょうど1つの欠陥がある" }
    ],
    answer: 1,
    exp: { vi: "Defect clustering: lỗi thường tập trung ở ít mô-đun; dùng để định hướng ưu tiên kiểm thử.", en: "Defect clustering: defects tend to concentrate in few modules; used to focus test priorities.", ja: "欠陥クラスタリング：欠陥は少数のモジュールに集中しやすく、テスト優先度の指針になる。" }
  },
  {
    q: { vi: "Kiểm thử dữ liệu (data-driven) và kiểm thử theo từ khóa (keyword-driven) là các cách tiếp cận của điều gì?", en: "Data-driven and keyword-driven testing are approaches to what?", ja: "データ駆動テストとキーワード駆動テストは何のアプローチか？" },
    options: [
      { vi: "Kiểm thử tĩnh tài liệu", en: "Static testing of documents", ja: "文書の静的テスト" },
      { vi: "Phân tích giá trị biên", en: "Boundary value analysis", ja: "境界値分析" },
      { vi: "Tự động hóa thực thi kiểm thử để tách dữ liệu/hành động khỏi kịch bản", en: "Test execution automation, separating data/actions from scripts", ja: "テスト実行自動化で、データ/アクションをスクリプトから分離する" },
      { vi: "Rà soát chính thức", en: "Formal reviews", ja: "形式的レビュー" }
    ],
    answer: 2,
    exp: { vi: "Data-driven và keyword-driven là kỹ thuật tổ chức tự động hóa giúp tái sử dụng và bảo trì kịch bản dễ hơn.", en: "Data-driven and keyword-driven are automation structuring techniques that improve reuse and maintainability.", ja: "データ駆動・キーワード駆動は再利用性と保守性を高める自動化構成技法である。" }
  },
  {
    q: { vi: "Kiểm thử tương thích (compatibility testing) thuộc loại kiểm thử nào?", en: "Compatibility testing belongs to which category of testing?", ja: "互換性テストはどのテストカテゴリに属するか？" },
    options: [
      { vi: "Kiểm thử chức năng", en: "Functional testing", ja: "機能テスト" },
      { vi: "Kiểm thử dựa trên cấu trúc (hộp trắng)", en: "Structure-based (white-box) testing", ja: "構造ベース（ホワイトボックス）テスト" },
      { vi: "Kiểm thử xác nhận", en: "Confirmation testing", ja: "確認テスト" },
      { vi: "Kiểm thử phi chức năng", en: "Non-functional testing", ja: "非機能テスト" }
    ],
    answer: 3,
    exp: { vi: "Tương thích (với trình duyệt, hệ điều hành, thiết bị) là một thuộc tính chất lượng phi chức năng.", en: "Compatibility (with browsers, OSs, devices) is a non-functional quality attribute.", ja: "互換性（ブラウザ・OS・デバイスとの）は非機能の品質特性である。" }
  }
];
