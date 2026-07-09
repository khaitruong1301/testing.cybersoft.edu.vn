// ============================================================================
// ISTQB EXT4 — Bổ sung đợt 4: 3 câu / cấp độ (Foundation, Advanced, Expert) = 9 câu.
// Mỗi phần tử đã gắn sẵn nhãn `lvl` để dùng thẳng trong istqb.mjs -> ISTQB_MCQ.
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật, katakana cho thuật ngữ).
// ============================================================================
export const DATA = [
  // ===================== istqb-foundation (3) — answers: 0,2,1 =====================
  { lvl: "istqb-foundation",
    q: { vi: "Theo 7 nguyên lý kiểm thử của ISTQB, phát biểu nào SAI?",
        en: "According to the ISTQB seven testing principles, which statement is FALSE?",
        ja: "ISTQBの7つのテストの原則によると、誤っている記述はどれですか。" },
    options: [
      { vi: "Kiểm thử kỹ lưỡng có thể CHỨNG MINH phần mềm hoàn toàn không còn lỗi", en: "Thorough testing can PROVE the software is completely free of defects", ja: "徹底したテストはソフトウェアに欠陥が全くないことを証明できる" },
      { vi: "Kiểm thử cho thấy sự hiện diện của lỗi chứ không chứng minh sự vắng mặt của lỗi", en: "Testing shows the presence of defects, not their absence", ja: "テストは欠陥の存在を示すが、欠陥がないことは証明できない" },
      { vi: "Kiểm thử toàn bộ (mọi tổ hợp đầu vào) là bất khả thi trừ trường hợp rất nhỏ", en: "Exhaustive testing of all input combinations is impossible except for trivial cases", ja: "全入力の組み合わせを網羅する全数テストは、ごく小さな場合を除いて不可能である" },
      { vi: "Gom nhóm lỗi: một số ít mô-đun thường chứa phần lớn lỗi", en: "Defect clustering: a few modules usually contain most of the defects", ja: "欠陥の偏在: 少数のモジュールに大半の欠陥が集中しがちである" }
    ],
    answer: 0,
    exp: { vi: "Kiểm thử không bao giờ chứng minh được phần mềm hết sạch lỗi; nó chỉ giảm rủi ro và cho thấy lỗi còn tồn tại. Ba phát biểu còn lại đều là nguyên lý đúng.", en: "Testing can never prove software is defect-free; it only reduces risk and reveals defects that exist. The other three are valid principles.", ja: "テストはソフトウェアに欠陥がないことを証明できず、リスクを下げ存在する欠陥を明らかにするだけである。残り3つは正しい原則である。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Cấp độ kiểm thử (test level) nào tập trung xác minh sự tương tác giữa các thành phần/mô-đun đã được ghép với nhau?",
        en: "Which test level focuses on verifying the interaction between integrated components/modules?",
        ja: "結合されたコンポーネント/モジュール間の相互作用を検証することに重点を置くテストレベルはどれですか。" },
    options: [
      { vi: "Kiểm thử đơn vị (Component/Unit testing)", en: "Component/Unit testing", ja: "コンポーネント/ユニットテスト" },
      { vi: "Kiểm thử chấp nhận (Acceptance testing)", en: "Acceptance testing", ja: "受け入れテスト" },
      { vi: "Kiểm thử tích hợp (Integration testing)", en: "Integration testing", ja: "統合(結合)テスト" },
      { vi: "Kiểm thử hồi quy (Regression testing)", en: "Regression testing", ja: "回帰テスト" }
    ],
    answer: 2,
    exp: { vi: "Integration testing kiểm tra giao tiếp và luồng dữ liệu giữa các thành phần đã tích hợp. Unit test xét từng đơn vị riêng lẻ; acceptance test xét theo góc nhìn người dùng; hồi quy là loại kiểm thử, không phải một cấp độ.", en: "Integration testing checks the communication and data flow between integrated components. Unit tests examine single units; acceptance tests take the user's view; regression is a test type, not a level.", ja: "統合テストは結合済みコンポーネント間の通信とデータフローを検証する。ユニットテストは個々の単位を、受け入れテストは利用者視点を対象とし、回帰はレベルではなくテストの種類である。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Kiểm thử tĩnh (static testing) như rà soát tài liệu và phân tích tĩnh mang lại lợi ích chính nào so với kiểm thử động?",
        en: "What is the main benefit of static testing (reviews, static analysis) compared with dynamic testing?",
        ja: "静的テスト(レビューや静的解析)は、動的テストと比べてどのような主な利点がありますか。" },
    options: [
      { vi: "Đo được hiệu năng thực tế của hệ thống khi chạy tải cao", en: "It measures real system performance under high load", ja: "高負荷時の実際のシステム性能を測定できる" },
      { vi: "Phát hiện lỗi sớm ngay trong tài liệu/mã mà không cần chạy chương trình, giảm chi phí sửa", en: "It finds defects early in documents/code without executing the program, lowering fix cost", ja: "プログラムを実行せずにドキュメントやコードから欠陥を早期に発見でき、修正コストを下げる" },
      { vi: "Thay thế hoàn toàn nhu cầu kiểm thử động về sau", en: "It fully replaces the need for later dynamic testing", ja: "後の動的テストの必要性を完全に置き換える" },
      { vi: "Chỉ áp dụng được sau khi hệ thống đã triển khai lên production", en: "It can only be applied after the system is deployed to production", ja: "システムを本番へ配置した後にのみ適用できる" }
    ],
    answer: 1,
    exp: { vi: "Kiểm thử tĩnh soi lỗi trực tiếp trong sản phẩm công việc (tài liệu, mã nguồn) mà không cần thực thi, nên bắt lỗi rất sớm và rẻ. Nó bổ sung chứ không thay thế kiểm thử động, và không đo hiệu năng runtime.", en: "Static testing inspects work products (documents, source code) without execution, catching defects very early and cheaply. It complements rather than replaces dynamic testing and does not measure runtime performance.", ja: "静的テストは実行せずに作業成果物(ドキュメントやソースコード)を検査し、欠陥を非常に早く低コストで発見する。動的テストを置き換えるのではなく補完し、実行時性能は測定しない。" } },

  // ===================== istqb-advanced (3) — answers: 3,1,0 =====================
  { lvl: "istqb-advanced",
    q: { vi: "Với ô nhập tuổi hợp lệ từ 18 đến 60, kỹ thuật phân tích giá trị biên (BVA) 2 điểm sẽ chọn tập giá trị nào để kiểm thử tại các biên?",
        en: "For an age field valid from 18 to 60, which values would 2-point Boundary Value Analysis (BVA) select at the boundaries?",
        ja: "有効範囲が18〜60の年齢入力欄に対して、2点境界値分析(BVA)は境界でどの値を選びますか。" },
    options: [
      { vi: "Chỉ 18 và 60", en: "Only 18 and 60", ja: "18と60のみ" },
      { vi: "17, 18, 60, 61", en: "17, 18, 60, 61", ja: "17, 18, 60, 61" },
      { vi: "0, 18, 60, 100", en: "0, 18, 60, 100", ja: "0, 18, 60, 100" },
      { vi: "18, 19, 59, 60", en: "18, 19, 59, 60", ja: "18, 19, 59, 60" }
    ],
    answer: 1,
    exp: { vi: "BVA 2 điểm kiểm thử giá trị ngay tại biên và giá trị liền kề phía ngoài: dưới biên dưới (17), tại biên dưới (18), tại biên trên (60) và trên biên trên (61) — nơi lỗi off-by-one hay xuất hiện.", en: "Two-point BVA tests the value at each boundary and the adjacent value just outside: below the lower bound (17), at the lower bound (18), at the upper bound (60) and above it (61) — where off-by-one defects appear.", ja: "2点BVAは各境界の値と、その外側の隣接値をテストする: 下限の下(17)、下限(18)、上限(60)、上限の上(61)。オフバイワン欠陥が現れやすい箇所である。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Trong kiểm thử dựa trên rủi ro (risk-based testing), mức độ rủi ro của một hạng mục thường được xác định bằng cách nào?",
        en: "In risk-based testing, how is the risk level of an item typically determined?",
        ja: "リスクベーステストでは、ある項目のリスクレベルは通常どのように決定されますか。" },
    options: [
      { vi: "Chỉ dựa trên số dòng mã của tính năng đó", en: "Only from the number of lines of code of that feature", ja: "その機能のコード行数のみに基づく" },
      { vi: "Kết hợp xác suất (khả năng lỗi xảy ra) và mức tác động (thiệt hại nếu lỗi xảy ra)", en: "Combining likelihood (probability of failure) and impact (harm if it fails)", ja: "発生可能性(故障の確率)と影響度(故障時の損害)を組み合わせる" },
      { vi: "Theo thứ tự các tính năng xuất hiện trong tài liệu đặc tả", en: "By the order features appear in the specification document", ja: "仕様書に機能が現れる順序による" },
      { vi: "Theo sở thích cá nhân của tester phụ trách", en: "By the personal preference of the assigned tester", ja: "担当テスターの個人的な好みによる" }
    ],
    answer: 1,
    exp: { vi: "Mức rủi ro = xác suất xảy ra × mức tác động. Kiểm thử dựa trên rủi ro ưu tiên nguồn lực cho hạng mục rủi ro cao, giúp phân bổ nỗ lực hợp lý khi thời gian hạn chế.", en: "Risk level = likelihood × impact. Risk-based testing prioritizes effort on high-risk items, allocating limited time where failure would cost most.", ja: "リスクレベル = 発生可能性 × 影響度。リスクベーステストは高リスク項目に労力を優先し、限られた時間を故障の損害が大きい箇所へ配分する。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Bảng quyết định (decision table) đặc biệt hữu ích cho kiểu logic nghiệp vụ nào?",
        en: "Decision table testing is especially useful for which kind of business logic?",
        ja: "デシジョンテーブルテストは、どのような業務ロジックに特に有効ですか。" },
    options: [
      { vi: "Logic có nhiều tổ hợp điều kiện dẫn tới các hành động khác nhau", en: "Logic with many combinations of conditions leading to different actions", ja: "多くの条件の組み合わせが異なるアクションを導くロジック" },
      { vi: "Luồng thời gian tuần tự đơn giản không có điều kiện rẽ nhánh", en: "A simple sequential time flow with no branching conditions", ja: "分岐条件のない単純な逐次的時間フロー" },
      { vi: "Kiểm tra tốc độ tải trang dưới nhiều người dùng đồng thời", en: "Checking page load speed under many concurrent users", ja: "多数の同時ユーザー下でのページ読み込み速度の確認" },
      { vi: "Đánh giá tính thẩm mỹ của giao diện người dùng", en: "Assessing the aesthetics of the user interface", ja: "ユーザーインターフェースの美観の評価" }
    ],
    answer: 0,
    exp: { vi: "Decision table mô hình hóa mọi tổ hợp điều kiện (rule) và hành động tương ứng, rất phù hợp cho nghiệp vụ nhiều điều kiện như tính phí, xét duyệt vay, phân quyền — bảo đảm không bỏ sót tổ hợp nào.", en: "A decision table models every combination of conditions (rules) and their resulting actions, ideal for multi-condition rules such as fee calculation, loan approval or authorization — ensuring no combination is missed.", ja: "デシジョンテーブルはすべての条件の組み合わせ(ルール)と対応するアクションをモデル化し、手数料計算・融資審査・権限付与のような多条件の業務に適し、組み合わせの漏れを防ぐ。" } },

  // ===================== istqb-expert (3) — answers: 2,0,3 =====================
  { lvl: "istqb-expert",
    q: { vi: "Mô hình TMMi (Test Maturity Model integration) được dùng chủ yếu cho mục đích nào?",
        en: "The TMMi (Test Maturity Model integration) is used mainly for what purpose?",
        ja: "TMMi(テスト成熟度モデル統合)は主に何の目的で使われますか。" },
    options: [
      { vi: "Tự động sinh ca kiểm thử từ mã nguồn", en: "Automatically generating test cases from source code", ja: "ソースコードからテストケースを自動生成する" },
      { vi: "Ghi lại và quản lý lỗi trong một dự án đơn lẻ", en: "Logging and managing defects within a single project", ja: "単一プロジェクト内の欠陥の記録と管理" },
      { vi: "Đánh giá và cải tiến độ trưởng thành của quy trình kiểm thử theo các cấp bậc", en: "Assessing and improving the maturity of the test process across staged levels", ja: "段階的なレベルでテストプロセスの成熟度を評価し改善する" },
      { vi: "Đo hiệu năng của máy chủ dưới tải", en: "Measuring server performance under load", ja: "負荷下でのサーバー性能を測定する" }
    ],
    answer: 2,
    exp: { vi: "TMMi là khung cải tiến quy trình kiểm thử theo 5 cấp trưởng thành, giúp tổ chức đánh giá hiện trạng và lập lộ trình nâng cấp năng lực kiểm thử — không phải công cụ sinh test hay quản lý lỗi.", en: "TMMi is a staged test-process improvement framework with five maturity levels, letting an organization assess its current state and plan capability improvement — not a test-generation or defect-tracking tool.", ja: "TMMiは5段階の成熟度を持つテストプロセス改善のフレームワークで、組織が現状を評価しテスト能力向上のロードマップを描くためのものであり、テスト生成や欠陥管理のツールではない。" } },

  { lvl: "istqb-expert",
    q: { vi: "Sự khác biệt cốt lõi giữa 「chính sách kiểm thử」 (test policy) và 「chiến lược kiểm thử」 (test strategy) ở cấp tổ chức là gì?",
        en: "At organizational level, what is the core difference between a test policy and a test strategy?",
        ja: "組織レベルで、テストポリシーとテスト戦略の本質的な違いは何ですか。" },
    options: [
      { vi: "Test policy nêu mục tiêu/nguyên tắc kiểm thử tổng thể; test strategy mô tả cách tiếp cận chung để đạt mục tiêu đó", en: "The test policy states overall testing objectives/principles; the test strategy describes the general approach to achieve them", ja: "テストポリシーはテストの全体目標や原則を示し、テスト戦略はそれを達成するための共通のアプローチを記述する" },
      { vi: "Cả hai là tên gọi khác nhau của cùng một tài liệu duy nhất", en: "Both are just different names for the same single document", ja: "両者は同一の単一文書の別名にすぎない" },
      { vi: "Test policy là kịch bản kiểm thử cụ thể; test strategy là báo cáo lỗi", en: "The test policy is a concrete test script; the test strategy is a defect report", ja: "テストポリシーは具体的なテストスクリプトで、テスト戦略は欠陥レポートである" },
      { vi: "Test policy chỉ do tester viết; test strategy chỉ do lập trình viên viết", en: "The test policy is written only by testers; the test strategy only by developers", ja: "テストポリシーはテスターのみが、テスト戦略は開発者のみが書く" }
    ],
    answer: 0,
    exp: { vi: "Test policy là tuyên bố cấp cao về mục tiêu, giá trị và nguyên tắc kiểm thử của tổ chức; test strategy cụ thể hơn, mô tả cách tiếp cận chung (mức kiểm thử, kỹ thuật, tiêu chí) áp dụng cho các dự án nhằm hiện thực hóa chính sách đó.", en: "A test policy is a high-level statement of the organization's testing objectives, values and principles; a test strategy is more concrete, describing the general approach (levels, techniques, criteria) applied across projects to realize that policy.", ja: "テストポリシーは組織のテスト目標・価値・原則を示す上位の宣言であり、テスト戦略はより具体的で、そのポリシーを実現するため各プロジェクトに適用する共通アプローチ(レベル・技法・基準)を記述する。" } },

  { lvl: "istqb-expert",
    q: { vi: "Khi dùng chỉ số DDE (Defect Detection Effectiveness / Percentage) để đánh giá hiệu quả kiểm thử, cần lưu ý rủi ro nào khi diễn giải?",
        en: "When using DDE/DDP (Defect Detection Effectiveness/Percentage) to evaluate test effectiveness, which interpretation risk must be kept in mind?",
        ja: "テストの有効性を評価するためにDDE/DDP(欠陥検出率)を使う際、解釈上どのようなリスクに注意すべきですか。" },
    options: [
      { vi: "Chỉ số này luôn chính xác tuyệt đối và không cần dữ liệu sau phát hành", en: "The metric is always perfectly accurate and needs no post-release data", ja: "この指標は常に完全に正確で、リリース後のデータは不要である" },
      { vi: "Không thể tính được nếu có bất kỳ lỗi nào lọt ra production", en: "It cannot be computed if any defect leaks to production", ja: "本番へ欠陥が漏れると一切計算できない" },
      { vi: "Chỉ số này đo tốc độ chạy test chứ không đo chất lượng", en: "It measures test execution speed, not quality", ja: "これはテスト実行速度を測るもので品質は測らない" },
      { vi: "DDE phụ thuộc vào tổng số lỗi thực tế (gồm cả lỗi lọt ra sau phát hành) nên chỉ ước lượng và dễ lệch nếu dữ liệu lỗi sau phát hành chưa đủ", en: "DDE depends on the true total of defects (including those found after release), so it is an estimate that can be skewed until enough post-release defect data exists", ja: "DDEは真の総欠陥数(リリース後に見つかる分を含む)に依存するため推定値であり、リリース後の欠陥データが十分そろうまで偏りやすい" }
    ],
    answer: 3,
    exp: { vi: "DDE = lỗi tìm thấy khi kiểm thử / tổng lỗi (kiểm thử + lọt ra sau phát hành). Vì mẫu số phụ thuộc vào lỗi phát hiện sau này, giá trị chỉ mang tính ước lượng và thường được chốt sau một khoảng thời gian vận hành đủ dài.", en: "DDE = defects found in testing / total defects (found in testing + leaked after release). Because the denominator depends on later-discovered defects, the value is an estimate and is usually only finalized after a sufficient operational period.", ja: "DDE = テストで発見した欠陥 / 総欠陥数(テストで発見 + リリース後に漏れた分)。分母が後に見つかる欠陥に依存するため値は推定であり、通常は十分な運用期間の後に確定する。" } },
];
