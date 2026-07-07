export const DATA = [
  {
    q: { vi: "Trong mô hình TMMi, cấp độ nào (level) tập trung vào việc thiết lập một chương trình kiểm thử được quản lý với chính sách, chiến lược và kế hoạch kiểm thử?", en: "In the TMMi model, which level focuses on establishing a managed testing program with a test policy, strategy and test planning?", ja: "TMMiモデルにおいて、テストポリシー・戦略・テスト計画を伴う管理されたテストプログラムの確立に焦点を当てるレベルはどれか。" },
    options: [
      { vi: "Level 2 - Managed", en: "Level 2 - Managed", ja: "レベル2 - 管理された" },
      { vi: "Level 1 - Initial", en: "Level 1 - Initial", ja: "レベル1 - 初期" },
      { vi: "Level 3 - Defined", en: "Level 3 - Defined", ja: "レベル3 - 定義された" },
      { vi: "Level 4 - Measured", en: "Level 4 - Measured", ja: "レベル4 - 測定された" }
    ],
    answer: 0,
    exp: { vi: "TMMi Level 2 (Managed) thiết lập chính sách, chiến lược, kế hoạch và giám sát kiểm thử.", en: "TMMi Level 2 (Managed) establishes test policy, strategy, planning, monitoring and control.", ja: "TMMiレベル2（管理された）はテストポリシー・戦略・計画・監視制御を確立する。" }
  },
  {
    q: { vi: "TMMi có bao nhiêu cấp độ trưởng thành (maturity levels)?", en: "How many maturity levels does the TMMi have?", ja: "TMMiには成熟度レベルがいくつあるか。" },
    options: [
      { vi: "3", en: "3", ja: "3" },
      { vi: "5", en: "5", ja: "5" },
      { vi: "4", en: "4", ja: "4" },
      { vi: "6", en: "6", ja: "6" }
    ],
    answer: 1,
    exp: { vi: "TMMi có 5 cấp độ: Initial, Managed, Defined, Measured, Optimization.", en: "TMMi has 5 levels: Initial, Managed, Defined, Measured, Optimization.", ja: "TMMiは5レベル：初期・管理された・定義された・測定された・最適化。" }
  },
  {
    q: { vi: "TMMi là mô hình cải tiến quy trình test thuộc loại nào?", en: "TMMi is what type of test process improvement model?", ja: "TMMiはどの種類のテストプロセス改善モデルか。" },
    options: [
      { vi: "Mô hình liên tục (continuous)", en: "Continuous model", ja: "連続型モデル" },
      { vi: "Mô hình lai (hybrid)", en: "Hybrid model", ja: "ハイブリッドモデル" },
      { vi: "Mô hình theo cấp độ (staged)", en: "Staged model", ja: "段階型モデル" },
      { vi: "Mô hình phi cấu trúc", en: "Unstructured model", ja: "非構造化モデル" }
    ],
    answer: 2,
    exp: { vi: "TMMi là mô hình staged, mỗi cấp phải đạt trước khi lên cấp tiếp theo (dù TMMi cũng hỗ trợ đánh giá continuous).", en: "TMMi is primarily a staged model where each level must be achieved before the next.", ja: "TMMiは主に段階型モデルで、各レベルを達成してから次へ進む。" }
  },
  {
    q: { vi: "TPI Next là mô hình cải tiến quy trình test dựa trên cách tiếp cận nào?", en: "TPI Next is a test process improvement model based on which approach?", ja: "TPI Nextはどのアプローチに基づくテストプロセス改善モデルか。" },
    options: [
      { vi: "Chỉ theo cấp độ (staged) duy nhất", en: "Purely staged", ja: "純粋な段階型のみ" },
      { vi: "Dựa hoàn toàn vào CMMI", en: "Entirely based on CMMI", ja: "完全にCMMIに基づく" },
      { vi: "Chỉ dựa trên đo lường ROI", en: "Based only on ROI measurement", ja: "ROI測定のみに基づく" },
      { vi: "Sử dụng các key area và ma trận trưởng thành", en: "Using key areas and a maturity matrix", ja: "キーエリアと成熟度マトリクスを使用" }
    ],
    answer: 3,
    exp: { vi: "TPI Next dùng 16 key area với các mức Controlled/Efficient/Optimizing và ma trận trưởng thành.", en: "TPI Next uses 16 key areas with Controlled/Efficient/Optimizing levels and a maturity matrix.", ja: "TPI Nextは16のキーエリアとControlled/Efficient/Optimizingレベル、成熟度マトリクスを使う。" }
  },
  {
    q: { vi: "Trong TPI Next, ba mức trưởng thành của mỗi key area là gì?", en: "In TPI Next, what are the three maturity levels of each key area?", ja: "TPI Nextにおいて、各キーエリアの3つの成熟度レベルは何か。" },
    options: [
      { vi: "Controlled, Efficient, Optimizing", en: "Controlled, Efficient, Optimizing", ja: "Controlled・Efficient・Optimizing" },
      { vi: "Initial, Managed, Defined", en: "Initial, Managed, Defined", ja: "初期・管理された・定義された" },
      { vi: "Basic, Advanced, Expert", en: "Basic, Advanced, Expert", ja: "基本・応用・熟練" },
      { vi: "Plan, Do, Check", en: "Plan, Do, Check", ja: "計画・実行・確認" }
    ],
    answer: 0,
    exp: { vi: "TPI Next có ba mức: Controlled, Efficient, Optimizing cho mỗi key area.", en: "TPI Next has three levels per key area: Controlled, Efficient, Optimizing.", ja: "TPI Nextは各キーエリアにControlled・Efficient・Optimizingの3レベルを持つ。" }
  },
  {
    q: { vi: "CTP (Critical Testing Processes) do ai phát triển và có đặc điểm gì?", en: "The CTP (Critical Testing Processes) model was developed by whom and has what characteristic?", ja: "CTP（重要テストプロセス）モデルは誰が開発し、どのような特徴を持つか。" },
    options: [
      { vi: "TMMi Foundation; là mô hình staged", en: "TMMi Foundation; a staged model", ja: "TMMi Foundation；段階型モデル" },
      { vi: "Rex Black; là mô hình content-based (dựa trên nội dung), không có cấp độ cố định", en: "Rex Black; a content-based model without fixed levels", ja: "Rex Black；固定レベルのないコンテンツベースモデル" },
      { vi: "SEI; là mô hình continuous", en: "SEI; a continuous model", ja: "SEI；連続型モデル" },
      { vi: "ISTQB; là mô hình bắt buộc", en: "ISTQB; a mandatory model", ja: "ISTQB；必須モデル" }
    ],
    answer: 1,
    exp: { vi: "CTP là mô hình content-based do Rex Black phát triển, xác định các quy trình then chốt và các thực hành nên có.", en: "CTP is a content-based model by Rex Black identifying critical processes and recommended practices.", ja: "CTPはRex Blackによるコンテンツベースモデルで、重要プロセスと推奨実践を特定する。" }
  },
  {
    q: { vi: "STEP (Systematic Test and Evaluation Process) nhấn mạnh điều gì so với các mô hình dựa trên cấp độ?", en: "What does STEP (Systematic Test and Evaluation Process) emphasize compared to level-based models?", ja: "STEP（体系的テスト評価プロセス）はレベルベースモデルと比べて何を重視するか。" },
    options: [
      { vi: "Bắt buộc đạt các cấp độ theo thứ tự", en: "Mandatory sequential level achievement", ja: "順序に従ったレベル達成の義務" },
      { vi: "Chỉ áp dụng cho kiểm thử hiệu năng", en: "Applies only to performance testing", ja: "パフォーマンステストのみに適用" },
      { vi: "Là mô hình content-based, kiểm thử nên bắt đầu sớm và song song với phát triển", en: "A content-based model where testing should start early and parallel to development", ja: "コンテンツベースモデルで、テストは早期に開発と並行して開始すべき" },
      { vi: "Loại bỏ hoàn toàn tài liệu kiểm thử", en: "Eliminates test documentation entirely", ja: "テスト文書を完全に排除する" }
    ],
    answer: 2,
    exp: { vi: "STEP là mô hình content-based, ủng hộ requirements-based testing và test sớm, song song phát triển.", en: "STEP is content-based, advocating requirements-based testing early and parallel to development.", ja: "STEPはコンテンツベースで、要件ベーステストを早期に開発と並行して行うことを推奨する。" }
  },
  {
    q: { vi: "Sự khác biệt cơ bản giữa mô hình process reference (như TMMi) và mô hình content reference (như CTP, STEP) là gì?", en: "What is the fundamental difference between a process reference model (like TMMi) and a content reference model (like CTP, STEP)?", ja: "プロセス参照モデル（TMMiなど）とコンテンツ参照モデル（CTP、STEPなど）の根本的な違いは何か。" },
    options: [
      { vi: "Process reference chỉ dùng cho Agile", en: "Process reference is only for Agile", ja: "プロセス参照はAgile専用" },
      { vi: "Không có sự khác biệt", en: "There is no difference", ja: "違いはない" },
      { vi: "Content reference luôn tốt hơn", en: "Content reference is always better", ja: "コンテンツ参照は常に優れている" },
      { vi: "Process reference dùng cấp độ trưởng thành để đánh giá; content reference cung cấp danh sách thực hành không theo cấp độ cố định", en: "Process reference uses maturity levels for assessment; content reference provides practices without fixed levels", ja: "プロセス参照は成熟度レベルで評価；コンテンツ参照は固定レベルなしで実践を提供" }
    ],
    answer: 3,
    exp: { vi: "Process reference model có cấp độ trưởng thành chuẩn hóa; content reference model cung cấp nội dung/thực hành linh hoạt hơn.", en: "Process reference models have standardized maturity levels; content models offer flexible practices.", ja: "プロセス参照モデルは標準化された成熟度レベルを持ち、コンテンツモデルは柔軟な実践を提供する。" }
  },
  {
    q: { vi: "Trong TMMi, process area 'Test Policy and Strategy' thuộc cấp độ nào?", en: "In TMMi, the process area 'Test Policy and Strategy' belongs to which level?", ja: "TMMiにおいて、プロセスエリア「テストポリシーと戦略」はどのレベルに属するか。" },
    options: [
      { vi: "Level 2 - Managed", en: "Level 2 - Managed", ja: "レベル2 - 管理された" },
      { vi: "Level 3 - Defined", en: "Level 3 - Defined", ja: "レベル3 - 定義された" },
      { vi: "Level 4 - Measured", en: "Level 4 - Measured", ja: "レベル4 - 測定された" },
      { vi: "Level 5 - Optimization", en: "Level 5 - Optimization", ja: "レベル5 - 最適化" }
    ],
    answer: 0,
    exp: { vi: "Test Policy and Strategy là một trong các process area của TMMi Level 2.", en: "Test Policy and Strategy is one of the TMMi Level 2 process areas.", ja: "テストポリシーと戦略はTMMiレベル2のプロセスエリアの一つである。" }
  },
  {
    q: { vi: "Process area nào là đặc trưng của TMMi Level 4 (Measured)?", en: "Which process area is characteristic of TMMi Level 4 (Measured)?", ja: "TMMiレベル4（測定された）を特徴づけるプロセスエリアはどれか。" },
    options: [
      { vi: "Test Planning", en: "Test Planning", ja: "テスト計画" },
      { vi: "Test Measurement và Product Quality Evaluation", en: "Test Measurement and Product Quality Evaluation", ja: "テスト測定と製品品質評価" },
      { vi: "Defect Prevention", en: "Defect Prevention", ja: "欠陥予防" },
      { vi: "Test Environment", en: "Test Environment", ja: "テスト環境" }
    ],
    answer: 1,
    exp: { vi: "Level 4 tập trung Test Measurement, Product Quality Evaluation và Advanced Reviews.", en: "Level 4 focuses on Test Measurement, Product Quality Evaluation and Advanced Reviews.", ja: "レベル4はテスト測定・製品品質評価・高度なレビューに焦点を当てる。" }
  },
  {
    q: { vi: "Process area 'Defect Prevention' và 'Test Process Optimization' thuộc cấp độ nào của TMMi?", en: "The process areas 'Defect Prevention' and 'Test Process Optimization' belong to which TMMi level?", ja: "プロセスエリア「欠陥予防」と「テストプロセス最適化」はTMMiのどのレベルに属するか。" },
    options: [
      { vi: "Level 2", en: "Level 2", ja: "レベル2" },
      { vi: "Level 3", en: "Level 3", ja: "レベル3" },
      { vi: "Level 5 - Optimization", en: "Level 5 - Optimization", ja: "レベル5 - 最適化" },
      { vi: "Level 4", en: "Level 4", ja: "レベル4" }
    ],
    answer: 2,
    exp: { vi: "Level 5 (Optimization) gồm Defect Prevention, Quality Control và Test Process Optimization.", en: "Level 5 (Optimization) includes Defect Prevention, Quality Control and Test Process Optimization.", ja: "レベル5（最適化）は欠陥予防・品質管理・テストプロセス最適化を含む。" }
  },
  {
    q: { vi: "Trong TPI Next, 'cluster' được dùng để làm gì?", en: "In TPI Next, what is a 'cluster' used for?", ja: "TPI Nextにおいて「クラスター」は何のために使われるか。" },
    options: [
      { vi: "Nhóm các test case tự động", en: "Grouping automated test cases", ja: "自動テストケースをグループ化する" },
      { vi: "Nhóm các tester theo địa lý", en: "Grouping testers by geography", ja: "テスターを地理別にグループ化する" },
      { vi: "Nhóm các lỗi theo mức độ nghiêm trọng", en: "Grouping defects by severity", ja: "欠陥を重大度別にグループ化する" },
      { vi: "Nhóm các checkpoint qua nhiều key area để cải tiến theo bước có thứ tự", en: "Grouping checkpoints across key areas to enable stepwise, ordered improvement", ja: "複数キーエリアのチェックポイントをまとめ、順序立てた段階的改善を可能にする" }
    ],
    answer: 3,
    exp: { vi: "Cluster trong TPI Next nhóm các checkpoint để định hướng lộ trình cải tiến theo thứ tự.", en: "Clusters in TPI Next group checkpoints to guide an ordered improvement path.", ja: "TPI Nextのクラスターはチェックポイントをまとめ、順序ある改善経路を導く。" }
  },
  {
    q: { vi: "TPI Next có bao nhiêu key area?", en: "How many key areas does TPI Next have?", ja: "TPI Nextにはキーエリアがいくつあるか。" },
    options: [
      { vi: "16", en: "16", ja: "16" },
      { vi: "14", en: "14", ja: "14" },
      { vi: "12", en: "12", ja: "12" },
      { vi: "20", en: "20", ja: "20" }
    ],
    answer: 0,
    exp: { vi: "TPI Next định nghĩa 16 key area như Stakeholder commitment, Test strategy, Estimating and planning...", en: "TPI Next defines 16 key areas such as Stakeholder commitment, Test strategy, Estimating and planning.", ja: "TPI Nextはステークホルダーコミットメント、テスト戦略、見積りと計画など16のキーエリアを定義する。" }
  },
  {
    q: { vi: "Điểm mạnh chính của mô hình CTP so với TMMi là gì?", en: "What is the main strength of the CTP model compared to TMMi?", ja: "TMMiと比べたCTPモデルの主な強みは何か。" },
    options: [
      { vi: "Cung cấp cấp độ chứng nhận chính thức", en: "Provides formal certification levels", ja: "公式な認証レベルを提供する" },
      { vi: "Linh hoạt, cho phép tổ chức tập trung cải tiến quy trình then chốt phù hợp bối cảnh", en: "Flexibility, letting organizations focus improvement on critical processes fitting their context", ja: "柔軟性があり、組織が状況に合った重要プロセスの改善に集中できる" },
      { vi: "Bắt buộc theo thứ tự cấp độ nghiêm ngặt", en: "Strict mandatory level sequence", ja: "厳格な必須レベル順序" },
      { vi: "Chỉ dùng cho tổ chức lớn", en: "Only for large organizations", ja: "大規模組織専用" }
    ],
    answer: 1,
    exp: { vi: "CTP linh hoạt, không ép theo cấp độ, cho phép ưu tiên các quy trình quan trọng theo bối cảnh.", en: "CTP is flexible, not level-locked, allowing prioritization of critical processes by context.", ja: "CTPは柔軟でレベルに縛られず、状況に応じて重要プロセスを優先できる。" }
  },
  {
    q: { vi: "Mô hình STEP chia quy trình kiểm thử thành các giai đoạn chính nào?", en: "The STEP model divides the testing process into which main phases?", ja: "STEPモデルはテストプロセスをどの主要フェーズに分けるか。" },
    options: [
      { vi: "Plan, Acquire, Measure", en: "Plan, Acquire, Measure", ja: "計画・取得・測定" },
      { vi: "Initial, Managed, Defined", en: "Initial, Managed, Defined", ja: "初期・管理された・定義された" },
      { vi: "Planning, Analysis and Design, Execution", en: "Planning, Analysis and Design, Execution", ja: "計画・分析と設計・実行" },
      { vi: "Design, Code, Test", en: "Design, Code, Test", ja: "設計・コーディング・テスト" }
    ],
    answer: 2,
    exp: { vi: "STEP tổ chức quanh Planning, Analysis & Design, và Execution với sản phẩm công việc rõ ràng.", en: "STEP organizes around Planning, Analysis & Design, and Execution with defined work products.", ja: "STEPは計画・分析設計・実行を軸に、明確な作業成果物で構成される。" }
  },
  {
    q: { vi: "Khi lựa chọn giữa mô hình cải tiến staged và continuous, yếu tố nào quan trọng nhất?", en: "When choosing between a staged and a continuous improvement model, which factor is most important?", ja: "段階型と連続型の改善モデルを選ぶ際、最も重要な要素は何か。" },
    options: [
      { vi: "Số lượng tester trong nhóm", en: "The number of testers on the team", ja: "チームのテスター数" },
      { vi: "Màu sắc của công cụ báo cáo", en: "The color of the reporting tool", ja: "レポートツールの色" },
      { vi: "Ngôn ngữ lập trình sử dụng", en: "The programming language used", ja: "使用するプログラミング言語" },
      { vi: "Mục tiêu, bối cảnh tổ chức và nhu cầu benchmark so với chuẩn hóa", en: "Goals, organizational context, and need for benchmarking versus standardization", ja: "目標・組織の状況・ベンチマークと標準化のニーズ" }
    ],
    answer: 3,
    exp: { vi: "Lựa chọn phụ thuộc mục tiêu, bối cảnh và nhu cầu so sánh (staged) hay linh hoạt (continuous).", en: "The choice depends on goals, context, and the need for benchmarking (staged) or flexibility (continuous).", ja: "選択は目標・状況・ベンチマーク（段階型）か柔軟性（連続型）のニーズに依存する。" }
  },
  {
    q: { vi: "Mô hình TMMi có mối quan hệ như thế nào với CMMI?", en: "How does the TMMi model relate to CMMI?", ja: "TMMiモデルはCMMIとどのような関係にあるか。" },
    options: [
      { vi: "TMMi được thiết kế bổ sung và tương thích với CMMI, dùng cấu trúc tương tự", en: "TMMi is designed to complement and be compatible with CMMI, using a similar structure", ja: "TMMiはCMMIを補完し互換性を持つよう設計され、類似の構造を使う" },
      { vi: "Hoàn toàn không liên quan", en: "Completely unrelated", ja: "全く無関係" },
      { vi: "TMMi thay thế hoàn toàn CMMI", en: "TMMi entirely replaces CMMI", ja: "TMMiはCMMIを完全に置き換える" },
      { vi: "CMMI là một cấp độ của TMMi", en: "CMMI is a level of TMMi", ja: "CMMIはTMMiの一レベルである" }
    ],
    answer: 0,
    exp: { vi: "TMMi bổ sung cho CMMI, dùng cấu trúc process area, staged tương tự và có thể triển khai song song.", en: "TMMi complements CMMI, mirroring its process-area staged structure and can run in parallel.", ja: "TMMiはCMMIを補完し、プロセスエリアの段階型構造を踏襲し並行導入できる。" }
  },
  {
    q: { vi: "Trong CTP, 'critical testing processes' được xác định dựa trên tiêu chí nào?", en: "In CTP, 'critical testing processes' are identified based on what criteria?", ja: "CTPにおいて「重要テストプロセス」はどの基準で特定されるか。" },
    options: [
      { vi: "Chỉ dựa trên chi phí công cụ", en: "Only tool cost", ja: "ツールコストのみ" },
      { vi: "Mức độ ảnh hưởng tới sự thành công của tổ chức và khả năng gây rủi ro nếu làm kém", en: "Their impact on organizational success and risk if performed poorly", ja: "組織の成功への影響と、不十分な場合のリスク" },
      { vi: "Số lượng test case", en: "The number of test cases", ja: "テストケースの数" },
      { vi: "Ngẫu nhiên", en: "Randomly", ja: "無作為に" }
    ],
    answer: 1,
    exp: { vi: "CTP xác định các quy trình then chốt theo tác động tới thành công và rủi ro khi thực hiện kém.", en: "CTP identifies key processes by their impact on success and risk when done poorly.", ja: "CTPは成功への影響と不十分な実行時のリスクで重要プロセスを特定する。" }
  },
  {
    q: { vi: "Đặc điểm nào KHÔNG phải là ưu điểm của mô hình dựa trên cấp độ (staged) như TMMi?", en: "Which is NOT an advantage of a staged model like TMMi?", ja: "TMMiのような段階型モデルの利点で「ない」ものはどれか。" },
    options: [
      { vi: "Cung cấp lộ trình cải tiến rõ ràng", en: "Provides a clear improvement roadmap", ja: "明確な改善ロードマップを提供する" },
      { vi: "Cho phép benchmark giữa các tổ chức", en: "Enables benchmarking across organizations", ja: "組織間のベンチマークを可能にする" },
      { vi: "Linh hoạt tối đa cho phép chọn tùy ý bất kỳ thực hành nào không theo thứ tự", en: "Maximum flexibility to pick any practice in any order", ja: "任意の実践を順不同で選べる最大限の柔軟性" },
      { vi: "Được công nhận và chứng nhận rộng rãi", en: "Widely recognized and certifiable", ja: "広く認知され認証可能" }
    ],
    answer: 2,
    exp: { vi: "Staged model có tính tuần tự nên KHÔNG cho phép linh hoạt tối đa; đó là ưu điểm của content-based.", en: "Staged models are sequential, so they do NOT allow maximum flexibility; that suits content-based models.", ja: "段階型は順序性があるため最大限の柔軟性はなく、それはコンテンツベースの利点である。" }
  },
  {
    q: { vi: "Mô hình cải tiến nào phù hợp nhất khi tổ chức muốn có chứng nhận chính thức và so sánh với ngành?", en: "Which improvement model best suits an organization wanting formal certification and industry benchmarking?", ja: "公式認証と業界ベンチマークを望む組織に最も適した改善モデルはどれか。" },
    options: [
      { vi: "STEP", en: "STEP", ja: "STEP" },
      { vi: "CTP", en: "CTP", ja: "CTP" },
      { vi: "Không cần mô hình nào", en: "No model needed", ja: "モデル不要" },
      { vi: "TMMi", en: "TMMi", ja: "TMMi" }
    ],
    answer: 3,
    exp: { vi: "TMMi cung cấp cấp độ trưởng thành chuẩn hóa, chứng nhận chính thức và khả năng benchmark.", en: "TMMi offers standardized maturity levels, formal certification and benchmarking.", ja: "TMMiは標準化された成熟度レベル・公式認証・ベンチマークを提供する。" }
  },
  {
    q: { vi: "Trong TPI Next, key area 'Stakeholder commitment' đo lường điều gì?", en: "In TPI Next, the key area 'Stakeholder commitment' measures what?", ja: "TPI Nextにおいて、キーエリア「ステークホルダーコミットメント」は何を測るか。" },
    options: [
      { vi: "Mức độ các bên liên quan tham gia, cam kết nguồn lực và hỗ trợ cho kiểm thử", en: "The degree stakeholders participate, commit resources and support testing", ja: "ステークホルダーが参加し、資源を約束しテストを支援する度合い" },
      { vi: "Số lượng lỗi tìm được", en: "The number of defects found", ja: "発見された欠陥数" },
      { vi: "Tốc độ thực thi test tự động", en: "Automated test execution speed", ja: "自動テスト実行速度" },
      { vi: "Độ phủ mã nguồn", en: "Code coverage", ja: "コードカバレッジ" }
    ],
    answer: 0,
    exp: { vi: "Stakeholder commitment đánh giá sự tham gia, cam kết nguồn lực và ủng hộ của các bên với kiểm thử.", en: "Stakeholder commitment assesses stakeholder participation, resource commitment and support for testing.", ja: "ステークホルダーコミットメントは、参加・資源提供・テスト支援の度合いを評価する。" }
  },
  {
    q: { vi: "STEP nhấn mạnh loại kiểm thử nào ngay từ đầu vòng đời?", en: "STEP emphasizes which kind of testing early in the lifecycle?", ja: "STEPはライフサイクル初期にどの種類のテストを重視するか。" },
    options: [
      { vi: "Chỉ kiểm thử sau khi hoàn tất code", en: "Only testing after code is complete", ja: "コード完成後のみのテスト" },
      { vi: "Requirements-based testing (kiểm thử dựa trên yêu cầu)", en: "Requirements-based testing", ja: "要件ベーステスト" },
      { vi: "Chỉ kiểm thử thủ công", en: "Only manual testing", ja: "手動テストのみ" },
      { vi: "Chỉ kiểm thử bảo mật", en: "Only security testing", ja: "セキュリティテストのみ" }
    ],
    answer: 1,
    exp: { vi: "STEP ủng hộ requirements-based testing và bắt đầu hoạt động test song song với phát triển sớm.", en: "STEP advocates requirements-based testing and starting test activities early, parallel to development.", ja: "STEPは要件ベーステストを推奨し、開発と並行して早期にテスト活動を開始する。" }
  },
  {
    q: { vi: "Mục đích chính của việc kết hợp nhiều mô hình cải tiến (ví dụ TMMi + CTP) trong một tổ chức là gì?", en: "What is the main purpose of combining multiple improvement models (e.g. TMMi + CTP) in an organization?", ja: "組織で複数の改善モデル（例：TMMi＋CTP）を組み合わせる主目的は何か。" },
    options: [
      { vi: "Tăng chi phí license", en: "Increase license costs", ja: "ライセンス費用を増やす" },
      { vi: "Gây nhầm lẫn cho nhóm", en: "Confuse the team", ja: "チームを混乱させる" },
      { vi: "Tận dụng ưu điểm của mô hình có cấu trúc và tính linh hoạt theo bối cảnh", en: "Leverage strengths of a structured model and context-based flexibility", ja: "構造化モデルの強みと状況ベースの柔軟性を活かす" },
      { vi: "Loại bỏ nhu cầu đánh giá", en: "Eliminate the need for assessment", ja: "評価の必要性をなくす" }
    ],
    answer: 2,
    exp: { vi: "Kết hợp giúp lấy cấu trúc/benchmark từ mô hình staged và linh hoạt nội dung từ content-based.", en: "Combining gets structure/benchmarking from staged models and flexibility from content-based ones.", ja: "組み合わせは段階型の構造・ベンチマークとコンテンツベースの柔軟性を得られる。" }
  },
  {
    q: { vi: "Trong TMMi, 'specific goals' (SG) và 'generic goals' (GG) khác nhau như thế nào?", en: "In TMMi, how do 'specific goals' (SG) and 'generic goals' (GG) differ?", ja: "TMMiにおいて「固有ゴール」（SG）と「共通ゴール」（GG）はどう異なるか。" },
    options: [
      { vi: "SG chỉ liên quan đến công cụ", en: "SG only relate to tools", ja: "SGはツールのみに関係する" },
      { vi: "Chúng giống hệt nhau", en: "They are identical", ja: "同一である" },
      { vi: "GG chỉ dùng ở Level 1", en: "GG only apply at Level 1", ja: "GGはレベル1のみ" },
      { vi: "SG áp dụng riêng cho từng process area; GG áp dụng chung cho nhiều process area để thể chế hóa", en: "SG apply to a specific process area; GG apply across process areas to institutionalize", ja: "SGは特定プロセスエリアに適用；GGは複数エリアに適用し制度化する" }
    ],
    answer: 3,
    exp: { vi: "SG đặc thù cho process area; GG chung, đảm bảo thể chế hóa quy trình (institutionalization).", en: "SG are specific to a process area; GG are generic, ensuring institutionalization of processes.", ja: "SGはプロセスエリア固有、GGは共通でプロセスの制度化を保証する。" }
  },
  {
    q: { vi: "Mô hình IDEAL gồm 5 giai đoạn theo thứ tự nào?", en: "The IDEAL model consists of five phases in what order?", ja: "IDEALモデルは5つのフェーズをどの順序で構成するか。" },
    options: [
      { vi: "Initiating, Diagnosing, Establishing, Acting, Learning", en: "Initiating, Diagnosing, Establishing, Acting, Learning", ja: "Initiating, Diagnosing, Establishing, Acting, Learning" },
      { vi: "Identify, Define, Execute, Analyze, Learn", en: "Identify, Define, Execute, Analyze, Learn", ja: "Identify, Define, Execute, Analyze, Learn" },
      { vi: "Inspect, Design, Evaluate, Assess, Log", en: "Inspect, Design, Evaluate, Assess, Log", ja: "Inspect, Design, Evaluate, Assess, Log" },
      { vi: "Initiate, Develop, Estimate, Apply, List", en: "Initiate, Develop, Estimate, Apply, List", ja: "Initiate, Develop, Estimate, Apply, List" }
    ],
    answer: 0,
    exp: { vi: "IDEAL = Initiating, Diagnosing, Establishing, Acting, Learning.", en: "IDEAL = Initiating, Diagnosing, Establishing, Acting, Learning.", ja: "IDEAL＝Initiating, Diagnosing, Establishing, Acting, Learning。" }
  },
  {
    q: { vi: "Trong IDEAL, giai đoạn 'Diagnosing' bao gồm hoạt động nào?", en: "In IDEAL, the 'Diagnosing' phase includes which activity?", ja: "IDEALにおいて「Diagnosing」フェーズはどの活動を含むか。" },
    options: [
      { vi: "Phê duyệt ngân sách cuối cùng", en: "Final budget approval", ja: "最終予算承認" },
      { vi: "Đánh giá hiện trạng và xác định khoảng cách so với mục tiêu (assessment)", en: "Assessing current state and identifying gaps versus goals", ja: "現状評価と目標とのギャップ特定" },
      { vi: "Triển khai giải pháp ra toàn tổ chức", en: "Rolling out the solution organization-wide", ja: "組織全体への解決策展開" },
      { vi: "Ghi nhận bài học rút ra", en: "Recording lessons learned", ja: "教訓の記録" }
    ],
    answer: 1,
    exp: { vi: "Diagnosing đánh giá hiện trạng, xác định gap và đưa ra khuyến nghị cải tiến.", en: "Diagnosing assesses the current state, identifies gaps and gives improvement recommendations.", ja: "Diagnosingは現状を評価し、ギャップを特定して改善提言を行う。" }
  },
  {
    q: { vi: "Trong IDEAL, giai đoạn 'Learning' có mục đích gì?", en: "In IDEAL, what is the purpose of the 'Learning' phase?", ja: "IDEALにおいて「Learning」フェーズの目的は何か。" },
    options: [
      { vi: "Đào tạo tester mới", en: "Training new testers", ja: "新人テスターの育成" },
      { vi: "Thu thập yêu cầu ban đầu", en: "Gathering initial requirements", ja: "初期要件の収集" },
      { vi: "Rút kinh nghiệm từ chu kỳ cải tiến để cải thiện chu kỳ tiếp theo", en: "Learning from the improvement cycle to improve the next one", ja: "改善サイクルから学び次のサイクルを改善する" },
      { vi: "Lập ngân sách", en: "Budgeting", ja: "予算策定" }
    ],
    answer: 2,
    exp: { vi: "Learning tổng kết kinh nghiệm, đánh giá hiệu quả và điều chỉnh cho các chu kỳ cải tiến sau.", en: "Learning captures experience, evaluates effectiveness and adjusts for future improvement cycles.", ja: "Learningは経験をまとめ効果を評価し、今後のサイクルへ反映する。" }
  },
  {
    q: { vi: "Loại đánh giá quy trình test nào do bên ngoài, độc lập thực hiện và cho kết quả có thể benchmark?", en: "Which type of test process assessment is performed independently by external parties and yields benchmarkable results?", ja: "外部の独立した者が実施し、ベンチマーク可能な結果を出すテストプロセス評価はどれか。" },
    options: [
      { vi: "Self-assessment (tự đánh giá)", en: "Self-assessment", ja: "自己評価" },
      { vi: "Ad-hoc review", en: "Ad-hoc review", ja: "その場限りのレビュー" },
      { vi: "Informal chat", en: "Informal chat", ja: "非公式な会話" },
      { vi: "Formal/independent assessment", en: "Formal/independent assessment", ja: "公式/独立評価" }
    ],
    answer: 3,
    exp: { vi: "Formal/independent assessment do assessor được đào tạo/độc lập thực hiện, cho kết quả tin cậy để benchmark.", en: "Formal/independent assessments by trained external assessors give reliable, benchmarkable results.", ja: "公式/独立評価は訓練された外部評価者が実施し、信頼できるベンチマーク結果を出す。" }
  },
  {
    q: { vi: "Ưu điểm chính của self-assessment so với formal assessment là gì?", en: "What is the main advantage of a self-assessment over a formal assessment?", ja: "公式評価に対する自己評価の主な利点は何か。" },
    options: [
      { vi: "Chi phí thấp hơn, tăng tính sở hữu và học hỏi nội bộ nhưng ít khách quan hơn", en: "Lower cost, more ownership and internal learning, but less objectivity", ja: "低コストで当事者意識と内部学習が高まるが、客観性は低い" },
      { vi: "Kết quả khách quan hơn tuyệt đối", en: "Absolutely more objective results", ja: "絶対的に客観的な結果" },
      { vi: "Luôn được chứng nhận chính thức", en: "Always formally certified", ja: "常に公式認証される" },
      { vi: "Không cần bất kỳ chuẩn bị nào", en: "Requires no preparation", ja: "準備が全く不要" }
    ],
    answer: 0,
    exp: { vi: "Self-assessment rẻ hơn, tăng ownership và học hỏi, nhưng dễ thiếu khách quan so với formal.", en: "Self-assessment is cheaper and builds ownership/learning but risks less objectivity than formal ones.", ja: "自己評価は安価で当事者意識と学びを高めるが、公式評価より客観性に欠けやすい。" }
  },
  {
    q: { vi: "Yếu tố nào KHÔNG thuộc điều kiện thành công của một chương trình cải tiến quy trình test?", en: "Which factor is NOT a success condition for a test process improvement program?", ja: "テストプロセス改善プログラムの成功条件で「ない」ものはどれか。" },
    options: [
      { vi: "Cam kết của quản lý cấp cao", en: "Senior management commitment", ja: "上級管理職のコミットメント" },
      { vi: "Áp đặt thay đổi mà không giải thích lý do cho nhóm", en: "Imposing change without explaining reasons to the team", ja: "理由を説明せずに変更を押し付けること" },
      { vi: "Mục tiêu rõ ràng gắn với mục tiêu kinh doanh", en: "Clear goals aligned with business objectives", ja: "ビジネス目標と整合した明確な目標" },
      { vi: "Đo lường tiến độ và phản hồi liên tục", en: "Measuring progress and continuous feedback", ja: "進捗測定と継続的フィードバック" }
    ],
    answer: 1,
    exp: { vi: "Áp đặt thay đổi không giải thích gây kháng cự; cải tiến cần buy-in và truyền thông rõ ràng.", en: "Imposing unexplained change breeds resistance; improvement needs buy-in and clear communication.", ja: "理由なき変更の押し付けは抵抗を生む。改善には賛同と明確な伝達が要る。" }
  },
  {
    q: { vi: "Trong đánh giá quy trình test, 'assessment scope' cần được xác định để làm gì?", en: "In a test process assessment, why must the 'assessment scope' be defined?", ja: "テストプロセス評価において「評価範囲」を定義する理由は何か。" },
    options: [
      { vi: "Để tăng chi phí", en: "To increase costs", ja: "コストを増やすため" },
      { vi: "Để tránh phải phỏng vấn", en: "To avoid interviews", ja: "インタビューを避けるため" },
      { vi: "Để xác định process area, dự án, đơn vị tổ chức nào được đánh giá, đảm bảo kết quả có ý nghĩa", en: "To define which process areas, projects, and units are assessed so results are meaningful", ja: "どのプロセスエリア・プロジェクト・組織単位を評価するか定め、結果を有意義にするため" },
      { vi: "Không cần thiết", en: "It is unnecessary", ja: "不要である" }
    ],
    answer: 2,
    exp: { vi: "Scope xác định phạm vi (process area, dự án, đơn vị) để đánh giá tập trung và kết quả hữu ích.", en: "Scope defines what is assessed (areas, projects, units) so the assessment is focused and useful.", ja: "範囲は評価対象（エリア・プロジェクト・単位）を定め、焦点を絞り有用な結果を得る。" }
  },
  {
    q: { vi: "Hoạt động nào là bước ĐẦU TIÊN cần làm khi khởi động một chương trình cải tiến theo IDEAL?", en: "Which activity is the FIRST step when launching an improvement program per IDEAL?", ja: "IDEALに沿って改善プログラムを開始する際、最初のステップはどれか。" },
    options: [
      { vi: "Thu thập bài học kinh nghiệm", en: "Collecting lessons learned", ja: "教訓の収集" },
      { vi: "Chẩn đoán hiện trạng (Diagnosing)", en: "Diagnosing current state (Diagnosing)", ja: "現状の診断（Diagnosing）" },
      { vi: "Triển khai giải pháp (Acting)", en: "Deploying solutions (Acting)", ja: "解決策の展開（Acting）" },
      { vi: "Xác định bối cảnh, thiết lập cam kết và cơ sở hạ tầng ban đầu (Initiating)", en: "Establishing context, commitment and initial infrastructure (Initiating)", ja: "背景・コミットメント・初期インフラの確立（Initiating）" }
    ],
    answer: 3,
    exp: { vi: "Initiating là giai đoạn đầu: thiết lập bối cảnh, cam kết lãnh đạo và hạ tầng cho cải tiến.", en: "Initiating is first: establishing context, leadership commitment and improvement infrastructure.", ja: "Initiatingが最初で、背景・リーダーのコミットメント・改善インフラを整える。" }
  },
  {
    q: { vi: "Trong IDEAL, giai đoạn 'Establishing' tập trung vào gì?", en: "In IDEAL, what does the 'Establishing' phase focus on?", ja: "IDEALにおいて「Establishing」フェーズは何に焦点を当てるか。" },
    options: [
      { vi: "Ưu tiên hành động, lập kế hoạch chi tiết và thiết lập mục tiêu đo lường được", en: "Prioritizing actions, detailed planning and setting measurable goals", ja: "アクションの優先順位付け、詳細計画、測定可能な目標設定" },
      { vi: "Chỉ thực thi kiểm thử", en: "Only executing tests", ja: "テスト実行のみ" },
      { vi: "Chỉ ghi nhận bài học", en: "Only recording lessons", ja: "教訓の記録のみ" },
      { vi: "Kết thúc chương trình", en: "Ending the program", ja: "プログラムの終了" }
    ],
    answer: 0,
    exp: { vi: "Establishing biến khuyến nghị từ Diagnosing thành kế hoạch hành động có ưu tiên và mục tiêu.", en: "Establishing turns Diagnosing recommendations into a prioritized action plan with goals.", ja: "EstablishingはDiagnosingの提言を優先順位と目標付きの行動計画に変える。" }
  },
  {
    q: { vi: "Vai trò của một 'assessor' trong đánh giá quy trình test theo TMMi là gì?", en: "What is the role of an 'assessor' in a TMMi test process assessment?", ja: "TMMiのテストプロセス評価における「評価者（assessor）」の役割は何か。" },
    options: [
      { vi: "Viết code sản phẩm", en: "Writing product code", ja: "製品コードの作成" },
      { vi: "Thu thập bằng chứng khách quan, phỏng vấn, đánh giá mức đạt các goal và báo cáo phát hiện", en: "Gathering objective evidence, interviewing, rating goal achievement and reporting findings", ja: "客観的証拠の収集、インタビュー、ゴール達成度の評価、所見の報告" },
      { vi: "Quyết định lương của nhóm", en: "Deciding team salaries", ja: "チームの給与決定" },
      { vi: "Bán license công cụ", en: "Selling tool licenses", ja: "ツールライセンスの販売" }
    ],
    answer: 1,
    exp: { vi: "Assessor thu thập bằng chứng, phỏng vấn, đánh giá mức đạt goal và báo cáo điểm mạnh/yếu.", en: "The assessor gathers evidence, interviews, rates goal achievement and reports strengths/weaknesses.", ja: "評価者は証拠を集め、面談し、ゴール達成度を評価し、強み弱みを報告する。" }
  },
  {
    q: { vi: "Cách tiếp cận cải tiến nào nên được ưu tiên khi tổ chức có nguồn lực hạn chế và cần kết quả nhanh?", en: "Which improvement approach should be prioritized when an organization has limited resources and needs quick wins?", ja: "資源が限られ早期成果が必要な組織で優先すべき改善アプローチはどれか。" },
    options: [
      { vi: "Cải tiến toàn diện tất cả process area cùng lúc", en: "Improving all process areas at once comprehensively", ja: "全プロセスエリアを一度に包括的に改善" },
      { vi: "Không cải tiến gì cả", en: "No improvement at all", ja: "改善を一切しない" },
      { vi: "Cải tiến gia tăng (incremental), tập trung vào các vấn đề có tác động cao trước", en: "Incremental improvement focusing on high-impact issues first", ja: "段階的改善で、影響の大きい課題を優先" },
      { vi: "Thay đổi toàn bộ công cụ ngay lập tức", en: "Replacing all tools immediately", ja: "全ツールを即座に置換" }
    ],
    answer: 2,
    exp: { vi: "Cải tiến gia tăng, ưu tiên tác động cao, mang lại quick wins và duy trì động lực với nguồn lực hạn chế.", en: "Incremental improvement prioritizing high impact delivers quick wins and sustains momentum with limited resources.", ja: "段階的改善で影響の大きい課題を優先すると、限られた資源で早期成果と勢いを保てる。" }
  },
  {
    q: { vi: "Sự khác biệt giữa test policy và test strategy ở cấp tổ chức là gì?", en: "What is the difference between a test policy and a test strategy at organizational level?", ja: "組織レベルでのテストポリシーとテスト戦略の違いは何か。" },
    options: [
      { vi: "Test policy chỉ liên quan công cụ", en: "The test policy only concerns tools", ja: "テストポリシーはツールのみに関係する" },
      { vi: "Chúng giống hệt nhau", en: "They are identical", ja: "同一である" },
      { vi: "Test strategy luôn ở cấp dự án, không ở cấp tổ chức", en: "The test strategy is always project-level, never organizational", ja: "テスト戦略は常にプロジェクトレベルで組織レベルではない" },
      { vi: "Test policy nêu mục đích/nguyên tắc/giá trị của testing; test strategy mô tả cách tiếp cận chung để đạt policy", en: "The test policy states testing's purpose/principles/values; the strategy describes the general approach to achieve it", ja: "テストポリシーはテストの目的・原則・価値を示し、戦略はそれを達成する一般的アプローチを示す" }
    ],
    answer: 3,
    exp: { vi: "Policy là tuyên bố cấp cao về mục đích/giá trị testing; strategy là cách tiếp cận chung để hiện thực hóa policy.", en: "The policy is a high-level statement of testing purpose/value; the strategy is the general approach to realize it.", ja: "ポリシーはテストの目的・価値の上位宣言、戦略はそれを実現する一般的アプローチである。" }
  },
  {
    q: { vi: "Test policy cấp tổ chức nên được phê duyệt bởi ai để có hiệu lực thực sự?", en: "Who should approve an organizational test policy for it to be truly effective?", ja: "組織のテストポリシーが真に有効となるには誰が承認すべきか。" },
    options: [
      { vi: "Quản lý cấp cao / lãnh đạo điều hành", en: "Senior management / executive leadership", ja: "上級管理職／経営幹部" },
      { vi: "Chỉ tester junior", en: "Only junior testers", ja: "ジュニアテスターのみ" },
      { vi: "Nhà cung cấp công cụ", en: "The tool vendor", ja: "ツールベンダー" },
      { vi: "Khách hàng cuối", en: "The end customer", ja: "エンドカスタマー" }
    ],
    answer: 0,
    exp: { vi: "Test policy cần cam kết và phê duyệt của lãnh đạo cấp cao để có thẩm quyền và nguồn lực.", en: "A test policy needs senior leadership commitment and approval for authority and resources.", ja: "テストポリシーは権限と資源のため上級リーダーの承認とコミットメントが必要。" }
  },
  {
    q: { vi: "Yếu tố nào nên có trong một test policy tổ chức tốt?", en: "Which element should a good organizational test policy contain?", ja: "優れた組織のテストポリシーに含めるべき要素はどれか。" },
    options: [
      { vi: "Danh sách chi tiết từng test case", en: "A detailed list of every test case", ja: "各テストケースの詳細リスト" },
      { vi: "Định nghĩa về testing, mục tiêu chất lượng, cách đánh giá giá trị testing và cải tiến quy trình", en: "A definition of testing, quality objectives, how to evaluate testing value and process improvement", ja: "テストの定義、品質目標、テスト価値の評価方法、プロセス改善" },
      { vi: "Mã nguồn sản phẩm", en: "The product source code", ja: "製品ソースコード" },
      { vi: "Lịch nghỉ phép của nhóm", en: "The team's vacation schedule", ja: "チームの休暇予定" }
    ],
    answer: 1,
    exp: { vi: "Test policy tốt gồm định nghĩa testing, mục tiêu chất lượng, cách đo giá trị và định hướng cải tiến.", en: "A good test policy includes a testing definition, quality objectives, value measurement and improvement direction.", ja: "良いテストポリシーはテストの定義・品質目標・価値測定・改善方針を含む。" }
  },
  {
    q: { vi: "Test governance ở cấp tổ chức chủ yếu nhằm mục đích gì?", en: "Organizational test governance is mainly aimed at what?", ja: "組織レベルのテストガバナンスは主に何を目的とするか。" },
    options: [
      { vi: "Loại bỏ tài liệu", en: "Eliminating documentation", ja: "文書の排除" },
      { vi: "Tăng số lượng lỗi được ghi nhận", en: "Increasing the number of logged defects", ja: "記録される欠陥数を増やす" },
      { vi: "Đảm bảo hoạt động testing nhất quán, tuân thủ, phù hợp mục tiêu kinh doanh và được giám sát", en: "Ensuring testing is consistent, compliant, aligned with business goals and monitored", ja: "テストが一貫し、準拠し、ビジネス目標と整合し、監視されることを保証する" },
      { vi: "Giảm lương tester", en: "Reducing tester salaries", ja: "テスターの給与削減" }
    ],
    answer: 2,
    exp: { vi: "Test governance đảm bảo tính nhất quán, tuân thủ, gắn kết mục tiêu kinh doanh và giám sát testing.", en: "Test governance ensures consistency, compliance, business alignment and oversight of testing.", ja: "テストガバナンスは一貫性・準拠・ビジネス整合・監督を保証する。" }
  },
  {
    q: { vi: "Khi test strategy tổ chức mâu thuẫn với thực tế dự án, cách xử lý phù hợp nhất là gì?", en: "When an organizational test strategy conflicts with project reality, what is the most appropriate handling?", ja: "組織のテスト戦略がプロジェクトの実情と矛盾する場合、最も適切な対処は何か。" },
    options: [
      { vi: "Bỏ qua test strategy hoàn toàn", en: "Ignore the test strategy entirely", ja: "テスト戦略を完全に無視する" },
      { vi: "Xóa bỏ test policy tổ chức", en: "Delete the organizational test policy", ja: "組織のテストポリシーを削除する" },
      { vi: "Ép dự án tuân thủ tuyệt đối bất chấp rủi ro", en: "Force absolute compliance regardless of risk", ja: "リスクを無視して絶対遵守を強制する" },
      { vi: "Điều chỉnh (tailor) chiến lược ở cấp dự án trong khuôn khổ policy và ghi nhận sai lệch", en: "Tailor the strategy at project level within the policy and document deviations", ja: "ポリシーの枠内でプロジェクトレベルに戦略を調整し逸脱を記録する" }
    ],
    answer: 3,
    exp: { vi: "Test strategy cấp dự án được tailor từ chiến lược tổ chức, ghi nhận sai lệch và vẫn bám policy.", en: "Project-level strategy is tailored from the organizational one, documenting deviations while honoring policy.", ja: "プロジェクト戦略は組織戦略から調整され、逸脱を記録しつつポリシーを守る。" }
  },
  {
    q: { vi: "Loại test strategy nào dựa trên việc phân tích và giảm thiểu rủi ro sản phẩm?", en: "Which type of test strategy is based on analyzing and mitigating product risks?", ja: "製品リスクの分析と軽減に基づくテスト戦略の種類はどれか。" },
    options: [
      { vi: "Risk-based (analytical) strategy", en: "Risk-based (analytical) strategy", ja: "リスクベース（分析的）戦略" },
      { vi: "Reactive strategy", en: "Reactive strategy", ja: "リアクティブ戦略" },
      { vi: "Random strategy", en: "Random strategy", ja: "ランダム戦略" },
      { vi: "Consultative strategy dựa trên ý kiến bên ngoài duy nhất", en: "Purely consultative strategy on external opinion only", ja: "外部意見のみに基づくコンサルタント戦略" }
    ],
    answer: 0,
    exp: { vi: "Risk-based là chiến lược analytical, phân tích rủi ro sản phẩm để định hướng nỗ lực kiểm thử.", en: "Risk-based is an analytical strategy analyzing product risk to direct testing effort.", ja: "リスクベースは分析的戦略で、製品リスクを分析しテスト労力を方向づける。" }
  },
  {
    q: { vi: "Chiến lược kiểm thử 'model-based' đặc trưng bởi điều gì?", en: "A 'model-based' test strategy is characterized by what?", ja: "「モデルベース」のテスト戦略は何を特徴とするか。" },
    options: [
      { vi: "Không dùng bất kỳ mô hình nào", en: "Using no models at all", ja: "モデルを一切使わない" },
      { vi: "Dựa trên các mô hình (thống kê vận hành, mô hình lỗi...) để dẫn dắt thiết kế kiểm thử", en: "Using models (operational profiles, fault models...) to drive test design", ja: "モデル（運用プロファイル、故障モデルなど）でテスト設計を導く" },
      { vi: "Chỉ dựa vào trực giác", en: "Relying only on intuition", ja: "直感のみに依存する" },
      { vi: "Chỉ áp dụng cho phần cứng", en: "Applying only to hardware", ja: "ハードウェアのみに適用" }
    ],
    answer: 1,
    exp: { vi: "Model-based dùng mô hình (operational profile, reliability, mô hình lỗi) để dẫn dắt thiết kế test.", en: "Model-based uses models (operational profiles, reliability, fault models) to drive test design.", ja: "モデルベースはモデル（運用プロファイル・信頼性・故障モデル）でテスト設計を導く。" }
  },
  {
    q: { vi: "Chiến lược kiểm thử 'standard-compliant' phù hợp nhất trong tình huống nào?", en: "A 'standard-compliant' test strategy is most suitable in which situation?", ja: "「標準準拠」のテスト戦略が最も適する状況はどれか。" },
    options: [
      { vi: "Dự án không có yêu cầu tuân thủ nào", en: "A project with no compliance requirements", ja: "準拠要件のないプロジェクト" },
      { vi: "Dự án nội bộ nhỏ không quan trọng", en: "A small, unimportant internal project", ja: "小規模で重要でない社内プロジェクト" },
      { vi: "Lĩnh vực bị quản chế (hàng không, y tế, tài chính) yêu cầu tuân thủ chuẩn/quy định", en: "Regulated domains (aviation, medical, finance) requiring compliance with standards/regulations", ja: "規制分野（航空・医療・金融）で標準・規制準拠が必要な場合" },
      { vi: "Chỉ khi không có tài liệu", en: "Only when there is no documentation", ja: "文書がない場合のみ" }
    ],
    answer: 2,
    exp: { vi: "Standard-compliant phù hợp môi trường quản chế cần tuân thủ chuẩn ngành và quy định pháp lý.", en: "Standard-compliant fits regulated environments needing adherence to industry standards and regulations.", ja: "標準準拠は業界標準や規制への遵守が必要な規制環境に適する。" }
  },
  {
    q: { vi: "Kết hợp nhiều loại test strategy (blended/hybrid) mang lại lợi ích gì?", en: "Combining multiple test strategies (blended/hybrid) provides what benefit?", ja: "複数のテスト戦略の組み合わせ（ブレンド/ハイブリッド）はどの利点をもたらすか。" },
    options: [
      { vi: "Luôn làm tăng chi phí mà không có lợi", en: "Always raises cost with no benefit", ja: "常にコストを上げるだけ" },
      { vi: "Loại bỏ nhu cầu quản lý rủi ro", en: "Removes the need for risk management", ja: "リスク管理の必要をなくす" },
      { vi: "Làm chiến lược khó hiểu hơn nên nên tránh", en: "Makes strategy incomprehensible so should be avoided", ja: "戦略を難解にするので避けるべき" },
      { vi: "Bù đắp điểm yếu của từng chiến lược đơn lẻ và phù hợp bối cảnh đa dạng", en: "Compensates weaknesses of single strategies and fits diverse contexts", ja: "単独戦略の弱点を補い、多様な状況に適合する" }
    ],
    answer: 3,
    exp: { vi: "Blended strategy tận dụng thế mạnh và bù điểm yếu của từng loại, thích ứng bối cảnh thực tế.", en: "A blended strategy leverages strengths and offsets weaknesses of each type for real contexts.", ja: "ブレンド戦略は各種の強みを活かし弱点を補い、実状況に適応する。" }
  },
  {
    q: { vi: "Trong quản trị test cấp tổ chức, vai trò của Test Center of Excellence (TCoE) là gì?", en: "In organizational test governance, what is the role of a Test Center of Excellence (TCoE)?", ja: "組織のテストガバナンスにおいて、テストセンターオブエクセレンス（TCoE）の役割は何か。" },
    options: [
      { vi: "Chuẩn hóa quy trình, công cụ, best practice và cung cấp năng lực testing chung cho tổ chức", en: "Standardize processes, tools, best practices and provide shared testing capability", ja: "プロセス・ツール・ベストプラクティスを標準化し、組織共通のテスト能力を提供する" },
      { vi: "Chỉ chạy test tự động", en: "Only run automated tests", ja: "自動テストの実行のみ" },
      { vi: "Thay thế toàn bộ nhóm dự án", en: "Replace all project teams", ja: "全プロジェクトチームを置き換える" },
      { vi: "Quản lý tài chính công ty", en: "Manage company finances", ja: "会社の財務管理" }
    ],
    answer: 0,
    exp: { vi: "TCoE chuẩn hóa quy trình/công cụ/best practice và cung cấp năng lực, chuyên môn testing dùng chung.", en: "A TCoE standardizes processes/tools/best practices and provides shared testing capability and expertise.", ja: "TCoEはプロセス・ツール・ベストプラクティスを標準化し、共通のテスト能力と専門性を提供する。" }
  },
  {
    q: { vi: "Test strategy nên gắn kết với yếu tố nào ở cấp tổ chức để tạo giá trị?", en: "A test strategy should align with which organizational factor to create value?", ja: "テスト戦略は価値を生むために組織のどの要素と整合すべきか。" },
    options: [
      { vi: "Sở thích cá nhân của test manager", en: "The test manager's personal preference", ja: "テストマネージャーの個人的好み" },
      { vi: "Mục tiêu kinh doanh, mức độ rủi ro chấp nhận được và mục tiêu chất lượng của tổ chức", en: "Business goals, acceptable risk level and organizational quality objectives", ja: "ビジネス目標・許容リスクレベル・組織の品質目標" },
      { vi: "Xu hướng công nghệ nhất thời", en: "Passing technology trends", ja: "一時的な技術トレンド" },
      { vi: "Màu logo công ty", en: "The company logo color", ja: "会社ロゴの色" }
    ],
    answer: 1,
    exp: { vi: "Test strategy phải gắn với mục tiêu kinh doanh, khẩu vị rủi ro và mục tiêu chất lượng tổ chức.", en: "The test strategy must align with business goals, risk appetite and organizational quality objectives.", ja: "テスト戦略はビジネス目標・リスク許容度・組織の品質目標と整合すべき。" }
  },
  {
    q: { vi: "Một tổ chức duy trì test policy nhưng không bao giờ đánh giá hiệu quả của nó. Rủi ro chính là gì?", en: "An organization maintains a test policy but never evaluates its effectiveness. What is the main risk?", ja: "組織がテストポリシーを維持するが有効性を評価しない。主なリスクは何か。" },
    options: [
      { vi: "Policy sẽ tự động cải thiện", en: "The policy will improve automatically", ja: "ポリシーは自動的に改善する" },
      { vi: "Không có rủi ro gì", en: "There is no risk", ja: "リスクはない" },
      { vi: "Policy có thể lỗi thời, không phù hợp mục tiêu kinh doanh hiện tại và mất giá trị", en: "The policy may become outdated, misaligned with current business goals and lose value", ja: "ポリシーが陳腐化し、現在のビジネス目標と不整合になり価値を失う" },
      { vi: "Chi phí license tăng", en: "License costs rise", ja: "ライセンス費用が上がる" }
    ],
    answer: 2,
    exp: { vi: "Không đánh giá khiến policy lỗi thời, lệch mục tiêu kinh doanh; cần review định kỳ.", en: "Without evaluation the policy becomes outdated and misaligned; periodic review is needed.", ja: "評価しないとポリシーは陳腐化し目標とずれる。定期的レビューが必要。" }
  },
  {
    q: { vi: "Reactive strategy (như exploratory testing) đặc biệt hữu ích khi nào?", en: "A reactive strategy (such as exploratory testing) is especially useful when?", ja: "リアクティブ戦略（探索的テストなど）は特にどんな場合に有用か。" },
    options: [
      { vi: "Khi yêu cầu hoàn chỉnh, ổn định và tài liệu đầy đủ", en: "When requirements are complete, stable and fully documented", ja: "要件が完全で安定し十分に文書化されている場合" },
      { vi: "Không bao giờ hữu ích", en: "Never useful", ja: "決して有用でない" },
      { vi: "Chỉ khi có nhiều thời gian", en: "Only when there is plenty of time", ja: "時間が十分ある場合のみ" },
      { vi: "Khi tài liệu ít, yêu cầu chưa rõ hoặc cần phản ứng linh hoạt với hệ thống thực tế", en: "When documentation is scarce, requirements unclear or flexible response to the actual system is needed", ja: "文書が乏しく要件が不明確、または実システムへの柔軟な対応が必要な場合" }
    ],
    answer: 3,
    exp: { vi: "Reactive/exploratory hữu ích khi tài liệu thiếu, yêu cầu mơ hồ, cần khám phá linh hoạt hệ thống thật.", en: "Reactive/exploratory helps when documentation is thin, requirements vague, needing flexible discovery.", ja: "リアクティブ/探索的は文書が薄く要件が曖昧で、柔軟な発見が要る時に有用。" }
  },
  {
    q: { vi: "Governance yêu cầu 'traceability' giữa mục tiêu kinh doanh và hoạt động test nhằm mục đích gì?", en: "Governance requiring 'traceability' between business goals and test activities aims to do what?", ja: "ガバナンスがビジネス目標とテスト活動間の「トレーサビリティ」を要求する目的は何か。" },
    options: [
      { vi: "Chứng minh test đóng góp cho mục tiêu kinh doanh và hỗ trợ ra quyết định dựa trên rủi ro/giá trị", en: "Demonstrate testing contributes to business goals and support risk/value-based decisions", ja: "テストがビジネス目標に貢献することを示し、リスク/価値ベースの意思決定を支える" },
      { vi: "Tăng số lượng tài liệu vô ích", en: "Increase useless documentation", ja: "無駄な文書を増やす" },
      { vi: "Làm chậm dự án", en: "Slow the project down", ja: "プロジェクトを遅らせる" },
      { vi: "Không có mục đích rõ ràng", en: "No clear purpose", ja: "明確な目的はない" }
    ],
    answer: 0,
    exp: { vi: "Traceability giúp chứng minh giá trị của test với mục tiêu kinh doanh và ra quyết định theo rủi ro/giá trị.", en: "Traceability shows testing's value against business goals and supports risk/value-based decisions.", ja: "トレーサビリティはテストのビジネス価値を示し、リスク/価値ベースの決定を支える。" }
  },
  {
    q: { vi: "Khi thiết lập test strategy tổ chức, việc xác định 'entry và exit criteria' chuẩn giúp ích gì?", en: "When establishing an organizational test strategy, defining standard entry and exit criteria helps how?", ja: "組織のテスト戦略を確立する際、標準の開始・終了基準を定義することはどう役立つか。" },
    options: [
      { vi: "Không giúp gì", en: "It does not help", ja: "役に立たない" },
      { vi: "Tạo nhất quán giữa các dự án và cơ sở khách quan để quyết định chuyển giai đoạn", en: "Creates consistency across projects and an objective basis for phase-gate decisions", ja: "プロジェクト間の一貫性と、フェーズ移行判断の客観的根拠を作る" },
      { vi: "Chỉ làm phức tạp báo cáo", en: "Only complicates reporting", ja: "報告を複雑にするだけ" },
      { vi: "Loại bỏ nhu cầu test manager", en: "Removes the need for a test manager", ja: "テストマネージャーの必要をなくす" }
    ],
    answer: 1,
    exp: { vi: "Entry/exit criteria chuẩn tạo nhất quán và cơ sở khách quan cho quyết định chuyển giai đoạn.", en: "Standard entry/exit criteria create consistency and an objective basis for phase transitions.", ja: "標準の開始・終了基準は一貫性とフェーズ移行の客観的判断基準を生む。" }
  },
  {
    q: { vi: "Chiến lược 'methodical' (methodical strategy) dựa trên gì?", en: "A 'methodical' strategy is based on what?", ja: "「メソディカル（体系的）」戦略は何に基づくか。" },
    options: [
      { vi: "Chỉ phản ứng với lỗi sau khi xảy ra", en: "Only reacting to defects after they occur", ja: "欠陥発生後の対応のみ" },
      { vi: "Hoàn toàn ngẫu nhiên", en: "Completely random", ja: "完全にランダム" },
      { vi: "Một tập hợp điều kiện test định trước như checklist, quality characteristic, hoặc bộ test tiêu chuẩn", en: "A predetermined set of test conditions such as checklists, quality characteristics or standard test sets", ja: "チェックリスト・品質特性・標準テストセットなど、事前定義されたテスト条件の集合" },
      { vi: "Ý kiến của một chuyên gia bên ngoài duy nhất", en: "A single external expert's opinion", ja: "外部専門家一人の意見" }
    ],
    answer: 2,
    exp: { vi: "Methodical dùng tập điều kiện test định sẵn (checklist, quality characteristics, chuẩn) một cách hệ thống.", en: "Methodical uses a predetermined systematic set of test conditions (checklists, quality characteristics, standards).", ja: "メソディカルは事前定義された体系的テスト条件（チェックリスト・品質特性・標準）を用いる。" }
  },
  {
    q: { vi: "Metric 'Defect Detection Percentage' (DDP) được tính như thế nào?", en: "How is the 'Defect Detection Percentage' (DDP) metric calculated?", ja: "「欠陥検出率（DDP）」指標はどのように計算されるか。" },
    options: [
      { vi: "Chi phí test / doanh thu", en: "Test cost / revenue", ja: "テストコスト / 収益" },
      { vi: "Số test case / số tester", en: "Test cases / number of testers", ja: "テストケース数 / テスター数" },
      { vi: "Số dòng code / số lỗi", en: "Lines of code / defects", ja: "コード行数 / 欠陥数" },
      { vi: "Số lỗi tìm trong test / (số lỗi tìm trong test + số lỗi tìm sau release) x 100%", en: "Defects found in testing / (defects found in testing + defects found after release) x 100%", ja: "テストで発見した欠陥 /（テストで発見した欠陥＋リリース後に発見した欠陥）×100％" }
    ],
    answer: 3,
    exp: { vi: "DDP = lỗi phát hiện trong test / (lỗi trong test + lỗi sau release), đo hiệu quả phát hiện lỗi.", en: "DDP = defects found in test / (test defects + post-release defects), measuring detection effectiveness.", ja: "DDP＝テストで発見した欠陥/（テスト欠陥＋リリース後欠陥）で検出効果を測る。" }
  },
  {
    q: { vi: "'Defect Removal Efficiency' (DRE) cao thể hiện điều gì?", en: "A high 'Defect Removal Efficiency' (DRE) indicates what?", ja: "高い「欠陥除去効率（DRE）」は何を示すか。" },
    options: [
      { vi: "Phần lớn lỗi được phát hiện và loại bỏ trước khi tới khách hàng", en: "Most defects are found and removed before reaching customers", ja: "大半の欠陥が顧客に届く前に発見・除去されている" },
      { vi: "Quy trình test kém, để lọt nhiều lỗi ra khách hàng", en: "A poor test process leaking many defects to customers", ja: "多くの欠陥を顧客へ漏らす貧弱なテストプロセス" },
      { vi: "Không có ý nghĩa gì", en: "It means nothing", ja: "意味がない" },
      { vi: "Quá nhiều test case dư thừa", en: "Too many redundant test cases", ja: "冗長なテストケースが多すぎる" }
    ],
    answer: 0,
    exp: { vi: "DRE cao nghĩa là quy trình phát hiện/loại bỏ hầu hết lỗi trước khi giao cho khách hàng.", en: "High DRE means the process finds and removes most defects before delivery to customers.", ja: "高いDREは、顧客提供前に大半の欠陥を発見・除去できていることを意味する。" }
  },
  {
    q: { vi: "Nguyên tắc quan trọng khi thiết kế bộ metric/KPI cho testing cấp tổ chức là gì?", en: "What is an important principle when designing a testing metrics/KPI set at organizational level?", ja: "組織レベルでテスト指標/KPIを設計する際の重要な原則は何か。" },
    options: [
      { vi: "Càng nhiều metric càng tốt bất kể mục tiêu", en: "More metrics are always better regardless of goals", ja: "目標に関係なく指標は多いほど良い" },
      { vi: "Metric phải gắn với mục tiêu (goal-driven, ví dụ GQM) và tránh khuyến khích hành vi sai lệch", en: "Metrics must be goal-driven (e.g. GQM) and avoid incentivizing dysfunctional behavior", ja: "指標は目標主導（例：GQM）であり、望ましくない行動を助長しないこと" },
      { vi: "Chỉ đo những gì dễ đo", en: "Measure only what is easy to measure", ja: "測りやすいものだけ測る" },
      { vi: "Giữ metric bí mật với nhóm", en: "Keep metrics secret from the team", ja: "指標をチームに秘密にする" }
    ],
    answer: 1,
    exp: { vi: "Metric nên goal-driven (GQM), phù hợp mục tiêu và tránh khuyến khích hành vi phản tác dụng.", en: "Metrics should be goal-driven (GQM), aligned to objectives and avoid perverse incentives.", ja: "指標は目標主導（GQM）で目的に整合し、逆効果な動機付けを避けるべき。" }
  },
  {
    q: { vi: "GQM (Goal-Question-Metric) là gì?", en: "What is GQM (Goal-Question-Metric)?", ja: "GQM（ゴール・質問・指標）とは何か。" },
    options: [
      { vi: "Công cụ tự động hóa test", en: "A test automation tool", ja: "テスト自動化ツール" },
      { vi: "Một mô hình trưởng thành", en: "A maturity model", ja: "成熟度モデル" },
      { vi: "Phương pháp xác định metric bằng cách đi từ mục tiêu, đến câu hỏi, rồi tới metric cần thu thập", en: "A method to derive metrics by going from goals to questions to the metrics to collect", ja: "目標から質問、そして収集すべき指標へと導く手法" },
      { vi: "Một loại test case", en: "A type of test case", ja: "テストケースの一種" }
    ],
    answer: 2,
    exp: { vi: "GQM xác định metric theo trình tự: Goal (mục tiêu) -> Question (câu hỏi) -> Metric (đo lường).", en: "GQM defines metrics via Goal -> Question -> Metric, ensuring metrics serve real goals.", ja: "GQMはゴール→質問→指標の順で指標を定め、真の目標に資するようにする。" }
  },
  {
    q: { vi: "Việc chỉ dùng metric 'số lỗi tìm được của mỗi tester' để đánh giá hiệu suất cá nhân có rủi ro gì?", en: "Using only 'defects found per tester' to assess individual performance carries what risk?", ja: "個人の成果評価に「テスターごとの発見欠陥数」だけを使うリスクは何か。" },
    options: [
      { vi: "Không có rủi ro", en: "No risk", ja: "リスクなし" },
      { vi: "Làm giảm chi phí công cụ", en: "Reduces tool costs", ja: "ツールコストを下げる" },
      { vi: "Tăng chất lượng chắc chắn", en: "Certainly increases quality", ja: "確実に品質が向上する" },
      { vi: "Khuyến khích ghi lỗi trùng lặp/không quan trọng và làm hỏng tinh thần hợp tác", en: "Encourages duplicate/trivial defect logging and harms collaboration morale", ja: "重複/些末な欠陥登録を助長し協調の士気を損なう" }
    ],
    answer: 3,
    exp: { vi: "Metric này gây hành vi lệch: ghi lỗi vụn vặt/trùng, đối kháng dev, hại hợp tác. Cần metric cân bằng.", en: "This metric drives dysfunction: trivial/duplicate logging, dev antagonism, harming collaboration.", ja: "この指標は些末/重複登録や開発者との対立を招き協調を害する。バランスある指標が必要。" }
  },
  {
    q: { vi: "Phân tích xu hướng (trend analysis) của defect arrival rate giúp test manager làm gì?", en: "Trend analysis of the defect arrival rate helps a test manager do what?", ja: "欠陥到着率のトレンド分析はテストマネージャーが何をするのに役立つか。" },
    options: [
      { vi: "Dự báo mức độ ổn định, ước tính thời điểm đạt tiêu chí kết thúc và ra quyết định release", en: "Forecast stability, estimate when exit criteria are met and support release decisions", ja: "安定性を予測し、終了基準到達時期を見積もり、リリース判断を支援する" },
      { vi: "Tính lương nhân viên", en: "Calculate employee salaries", ja: "従業員の給与計算" },
      { vi: "Chọn ngôn ngữ lập trình", en: "Choose a programming language", ja: "プログラミング言語の選択" },
      { vi: "Thiết kế giao diện", en: "Design the UI", ja: "UIの設計" }
    ],
    answer: 0,
    exp: { vi: "Trend của defect arrival giúp dự báo ổn định, ước tính exit và hỗ trợ quyết định release.", en: "Defect arrival trends help forecast stability, estimate exit and support release decisions.", ja: "欠陥到着トレンドは安定性予測・終了見積り・リリース判断を支える。" }
  },
  {
    q: { vi: "Khi defect arrival rate vẫn tăng dần vào cuối chu kỳ test, điều này thường gợi ý gì?", en: "When the defect arrival rate keeps rising late in the test cycle, what does this usually suggest?", ja: "テストサイクル終盤で欠陥到着率が上昇し続ける場合、通常何を示唆するか。" },
    options: [
      { vi: "Sản phẩm đã sẵn sàng release", en: "The product is ready to release", ja: "製品はリリース準備完了" },
      { vi: "Sản phẩm chưa ổn định, chưa nên release; cần đánh giá lại rủi ro", en: "The product is not stable, not ready to release; risk should be reassessed", ja: "製品は不安定でリリース不可。リスクの再評価が必要" },
      { vi: "Nên dừng test ngay", en: "Testing should stop immediately", ja: "直ちにテストを止めるべき" },
      { vi: "Không liên quan tới chất lượng", en: "Unrelated to quality", ja: "品質と無関係" }
    ],
    answer: 1,
    exp: { vi: "Arrival rate tăng cuối chu kỳ cho thấy sản phẩm chưa ổn định, chưa nên release, cần đánh giá lại.", en: "A rising arrival rate late in the cycle signals instability, not ready to release, needing reassessment.", ja: "終盤の到着率上昇は不安定を示し、リリース不可で再評価が必要。" }
  },
  {
    q: { vi: "Metric 'test coverage' đơn thuần cao (ví dụ 100% dòng lệnh) đảm bảo điều gì?", en: "A high raw 'test coverage' metric (e.g. 100% statement) guarantees what?", ja: "単純に高い「テストカバレッジ」指標（例：命令網羅100％）は何を保証するか。" },
    options: [
      { vi: "Không còn lỗi nào trong sản phẩm", en: "No defects remain in the product", ja: "製品に欠陥が残っていない" },
      { vi: "Chất lượng hoàn hảo", en: "Perfect quality", ja: "完璧な品質" },
      { vi: "Mã đã được thực thi, nhưng KHÔNG đảm bảo không còn lỗi hay đúng đắn hành vi", en: "Code was executed, but does NOT guarantee absence of defects or correct behavior", ja: "コードは実行されたが、欠陥ゼロや正しい動作は保証しない" },
      { vi: "ROI tối đa", en: "Maximum ROI", ja: "最大のROI" }
    ],
    answer: 2,
    exp: { vi: "Coverage cao chỉ cho biết mã đã được thực thi, không chứng minh không còn lỗi hay hành vi đúng.", en: "High coverage only shows code was executed, not that no defects remain or behavior is correct.", ja: "高カバレッジはコード実行を示すだけで、欠陥ゼロや正しい動作は示さない。" }
  },
  {
    q: { vi: "Khi trình bày metric cho lãnh đạo (executive), cách tiếp cận tốt nhất là gì?", en: "When presenting metrics to executives, what is the best approach?", ja: "経営幹部に指標を提示する際、最良のアプローチは何か。" },
    options: [
      { vi: "Đưa mọi metric kỹ thuật chi tiết nhất có thể", en: "Present every technical metric in maximum detail", ja: "あらゆる技術指標を最大限詳細に提示する" },
      { vi: "Chỉ báo cáo số lượng test case", en: "Report only the number of test cases", ja: "テストケース数のみ報告する" },
      { vi: "Không báo cáo gì cả", en: "Report nothing", ja: "何も報告しない" },
      { vi: "Tổng hợp thành các chỉ số gắn giá trị kinh doanh/rủi ro, trực quan, dễ hiểu để ra quyết định", en: "Aggregate into business/risk-oriented, visual, easy-to-understand indicators for decisions", ja: "ビジネス/リスク志向で視覚的・分かりやすい指標に集約し意思決定を支える" }
    ],
    answer: 3,
    exp: { vi: "Với lãnh đạo, nên tổng hợp metric theo giá trị kinh doanh/rủi ro, trực quan để hỗ trợ ra quyết định.", en: "For executives, aggregate metrics around business value/risk, visually, to support decisions.", ja: "経営層には、ビジネス価値/リスク中心に視覚的に集約し意思決定を支えるべき。" }
  },
  {
    q: { vi: "Metric 'cost of quality' thường được chia thành các nhóm nào?", en: "The 'cost of quality' metric is typically divided into which categories?", ja: "「品質コスト」指標は通常どのカテゴリに分けられるか。" },
    options: [
      { vi: "Prevention, Appraisal, Internal failure, External failure", en: "Prevention, Appraisal, Internal failure, External failure", ja: "予防・評価・内部失敗・外部失敗" },
      { vi: "Design, Code, Test, Deploy", en: "Design, Code, Test, Deploy", ja: "設計・コード・テスト・展開" },
      { vi: "Small, Medium, Large, Extra", en: "Small, Medium, Large, Extra", ja: "小・中・大・特大" },
      { vi: "Fixed, Variable", en: "Fixed, Variable", ja: "固定・変動" }
    ],
    answer: 0,
    exp: { vi: "Cost of quality = Prevention + Appraisal + Internal failure + External failure costs.", en: "Cost of quality = Prevention + Appraisal + Internal failure + External failure costs.", ja: "品質コスト＝予防＋評価＋内部失敗＋外部失敗コスト。" }
  },
  {
    q: { vi: "Trong cost of quality, chi phí 'external failure' bao gồm gì?", en: "In cost of quality, what does 'external failure' cost include?", ja: "品質コストにおいて「外部失敗」コストは何を含むか。" },
    options: [
      { vi: "Chi phí đào tạo trước dự án", en: "Pre-project training costs", ja: "プロジェクト前の研修費" },
      { vi: "Chi phí do lỗi phát hiện sau khi giao khách hàng: bảo hành, hỗ trợ, uy tín, thu hồi", en: "Costs from defects found after delivery: warranty, support, reputation, recalls", ja: "顧客提供後に見つかった欠陥のコスト：保証・サポート・信用・リコール" },
      { vi: "Chi phí review nội bộ", en: "Internal review costs", ja: "内部レビューのコスト" },
      { vi: "Chi phí viết test case", en: "Test case writing costs", ja: "テストケース作成コスト" }
    ],
    answer: 1,
    exp: { vi: "External failure là chi phí lỗi lọt tới khách hàng: bảo hành, hỗ trợ, tổn hại uy tín, thu hồi.", en: "External failure covers defects reaching customers: warranty, support, reputation damage, recalls.", ja: "外部失敗は顧客に達した欠陥のコスト（保証・サポート・信用毀損・リコール）である。" }
  },
  {
    q: { vi: "Để metric có giá trị theo thời gian, yêu cầu quan trọng nhất về dữ liệu là gì?", en: "For metrics to be valuable over time, what is the most important data requirement?", ja: "指標が長期的に価値を持つため、データに関する最重要要件は何か。" },
    options: [
      { vi: "Dữ liệu càng nhiều càng tốt bất kể chất lượng", en: "As much data as possible regardless of quality", ja: "品質を問わずできるだけ多くのデータ" },
      { vi: "Chỉ thu thập một lần", en: "Collected only once", ja: "一度だけ収集する" },
      { vi: "Định nghĩa nhất quán, thu thập chính xác, đáng tin cậy để so sánh và phân tích xu hướng", en: "Consistent definitions, accurate and reliable collection to enable comparison and trend analysis", ja: "一貫した定義と正確で信頼できる収集により比較とトレンド分析を可能にする" },
      { vi: "Không cần định nghĩa rõ ràng", en: "No clear definition needed", ja: "明確な定義は不要" }
    ],
    answer: 2,
    exp: { vi: "Định nghĩa nhất quán và thu thập chính xác, tin cậy là điều kiện để so sánh và phân tích xu hướng.", en: "Consistent definitions and accurate, reliable collection are essential for comparison and trends.", ja: "一貫した定義と正確・信頼できる収集が、比較とトレンド分析の前提である。" }
  },
  {
    q: { vi: "'Leading indicator' khác 'lagging indicator' như thế nào trong đo lường test?", en: "How does a 'leading indicator' differ from a 'lagging indicator' in test measurement?", ja: "テスト測定において「先行指標」は「遅行指標」とどう異なるか。" },
    options: [
      { vi: "Lagging chỉ dùng cho Agile", en: "Lagging is only for Agile", ja: "遅行はAgile専用" },
      { vi: "Chúng giống nhau", en: "They are the same", ja: "同じである" },
      { vi: "Leading luôn chính xác hơn", en: "Leading is always more accurate", ja: "先行は常により正確" },
      { vi: "Leading dự báo kết quả tương lai; lagging phản ánh kết quả đã xảy ra", en: "Leading predicts future outcomes; lagging reflects results that already happened", ja: "先行は将来の結果を予測し、遅行は既に起きた結果を反映する" }
    ],
    answer: 3,
    exp: { vi: "Leading indicator (vd tiến độ review) dự báo tương lai; lagging (vd lỗi sau release) phản ánh quá khứ.", en: "Leading indicators (e.g. review progress) predict; lagging (e.g. post-release defects) reflect the past.", ja: "先行指標（例：レビュー進捗）は予測し、遅行指標（例：リリース後欠陥）は過去を反映する。" }
  },
  {
    q: { vi: "Vấn đề của việc dùng KPI 'tỷ lệ test case pass' làm mục tiêu chính là gì?", en: "What is the problem with using 'test case pass rate' as a primary KPI target?", ja: "「テストケース合格率」を主要KPI目標にする問題は何か。" },
    options: [
      { vi: "Có thể khuyến khích viết test case dễ pass, che giấu rủi ro thực và không phản ánh chất lượng", en: "May encourage writing easy-to-pass tests, hiding real risk and not reflecting quality", ja: "簡単に合格するテストの作成を助長し、真のリスクを隠し品質を反映しない恐れ" },
      { vi: "Không có vấn đề gì", en: "There is no problem", ja: "問題はない" },
      { vi: "Luôn phản ánh đúng chất lượng", en: "Always reflects quality accurately", ja: "常に品質を正確に反映する" },
      { vi: "Giảm chi phí chắc chắn", en: "Certainly reduces cost", ja: "確実にコストを下げる" }
    ],
    answer: 0,
    exp: { vi: "Pass rate làm mục tiêu dễ khiến viết test dễ pass, che rủi ro; cần kết hợp metric rủi ro/độ phủ.", en: "Pass rate as a target can drive easy tests hiding risk; combine with risk/coverage metrics.", ja: "合格率を目標にすると易しいテストを招きリスクを隠す。リスク/網羅指標と併用すべき。" }
  },
  {
    q: { vi: "Khi xây dựng một nhóm test hiệu quả, yếu tố nào quan trọng nhất trong việc phối hợp kỹ năng?", en: "When building an effective test team, which is most important regarding skill mix?", ja: "効果的なテストチームを作る際、スキル構成で最も重要なのは何か。" },
    options: [
      { vi: "Mọi thành viên có kỹ năng giống hệt nhau", en: "Every member has identical skills", ja: "全員が全く同じスキルを持つ" },
      { vi: "Cân bằng và bổ sung kỹ năng (kỹ thuật, miền nghiệp vụ, mềm) phù hợp mục tiêu nhóm", en: "A balanced, complementary mix of skills (technical, domain, soft) fitting team goals", ja: "チーム目標に合った、技術・業務知識・ソフトスキルのバランスと補完" },
      { vi: "Chỉ tuyển người giỏi tự động hóa", en: "Hire only automation experts", ja: "自動化専門家のみ採用する" },
      { vi: "Không quan tâm kỹ năng", en: "Ignore skills entirely", ja: "スキルを全く考慮しない" }
    ],
    answer: 1,
    exp: { vi: "Nhóm mạnh cần kỹ năng cân bằng, bổ sung nhau (kỹ thuật, nghiệp vụ, mềm) phù hợp mục tiêu.", en: "A strong team needs a balanced, complementary skill mix (technical, domain, soft) aligned to goals.", ja: "強いチームは目標に合った技術・業務・ソフトのバランスと補完が必要。" }
  },
  {
    q: { vi: "Theo Tuckman, các giai đoạn phát triển nhóm theo thứ tự là gì?", en: "According to Tuckman, what are the team development stages in order?", ja: "タックマンによると、チーム発達段階の順序は何か。" },
    options: [
      { vi: "Initiate, Diagnose, Establish, Act", en: "Initiate, Diagnose, Establish, Act", ja: "開始・診断・確立・実行" },
      { vi: "Planning, Doing, Checking, Acting", en: "Planning, Doing, Checking, Acting", ja: "計画・実行・確認・改善" },
      { vi: "Forming, Storming, Norming, Performing (và Adjourning)", en: "Forming, Storming, Norming, Performing (and Adjourning)", ja: "Forming, Storming, Norming, Performing（およびAdjourning）" },
      { vi: "Start, Middle, End", en: "Start, Middle, End", ja: "開始・中間・終了" }
    ],
    answer: 2,
    exp: { vi: "Mô hình Tuckman: Forming, Storming, Norming, Performing, và Adjourning.", en: "Tuckman's model: Forming, Storming, Norming, Performing, and Adjourning.", ja: "タックマンモデル：Forming, Storming, Norming, Performing, Adjourning。" }
  },
  {
    q: { vi: "Một test manager nhận thấy nhóm đang ở giai đoạn 'Storming'. Hành động lãnh đạo phù hợp là gì?", en: "A test manager notices the team is in the 'Storming' stage. What is an appropriate leadership action?", ja: "テストマネージャーがチームが「Storming」段階にあると気づいた。適切なリーダー行動は何か。" },
    options: [
      { vi: "Bỏ mặc để nhóm tự giải quyết mọi xung đột", en: "Leave the team to resolve all conflict alone", ja: "全ての対立をチーム任せにする" },
      { vi: "Cấm mọi giao tiếp", en: "Ban all communication", ja: "全ての意思疎通を禁じる" },
      { vi: "Sa thải thành viên gây tranh luận", en: "Fire members who argue", ja: "議論する者を解雇する" },
      { vi: "Tạo điều kiện giải quyết xung đột, làm rõ vai trò và mục tiêu, tạo môi trường an toàn", en: "Facilitate conflict resolution, clarify roles and goals, and create psychological safety", ja: "対立解決を促し、役割と目標を明確化し、心理的安全を作る" }
    ],
    answer: 3,
    exp: { vi: "Ở Storming, lãnh đạo cần facilitate giải quyết xung đột, làm rõ vai trò/mục tiêu, tạo an toàn tâm lý.", en: "In Storming, leaders facilitate conflict resolution, clarify roles/goals and build psychological safety.", ja: "Storming期はリーダーが対立解決を促し、役割・目標を明確化し心理的安全を築く。" }
  },
  {
    q: { vi: "Sự khác biệt giữa động lực nội tại (intrinsic) và ngoại lai (extrinsic) trong quản lý nhóm test là gì?", en: "What distinguishes intrinsic from extrinsic motivation in managing a test team?", ja: "テストチーム管理における内発的動機と外発的動機の違いは何か。" },
    options: [
      { vi: "Nội tại đến từ sự thỏa mãn/ý nghĩa công việc; ngoại lai đến từ phần thưởng/áp lực bên ngoài", en: "Intrinsic comes from satisfaction/meaning of work; extrinsic from external rewards/pressure", ja: "内発的は仕事の満足・意義から、外発的は外部の報酬・圧力から生じる" },
      { vi: "Chúng giống nhau", en: "They are the same", ja: "同じである" },
      { vi: "Ngoại lai luôn hiệu quả hơn dài hạn", en: "Extrinsic is always more effective long-term", ja: "外発的は長期的に常に効果的" },
      { vi: "Nội tại chỉ áp dụng cho quản lý", en: "Intrinsic applies only to managers", ja: "内発的は管理者のみに適用" }
    ],
    answer: 0,
    exp: { vi: "Nội tại từ ý nghĩa/thỏa mãn công việc; ngoại lai từ thưởng/phạt bên ngoài. Nội tại bền hơn dài hạn.", en: "Intrinsic stems from meaning/satisfaction; extrinsic from external reward/pressure. Intrinsic lasts longer.", ja: "内発的は意義・満足から、外発的は外部報酬・圧力から。内発的が長続きする。" }
  },
  {
    q: { vi: "Kỹ năng giao tiếp nào quan trọng nhất khi test manager phải báo tin xấu về chất lượng cho stakeholder?", en: "Which communication skill matters most when a test manager must deliver bad quality news to stakeholders?", ja: "テストマネージャーがステークホルダーに品質の悪い知らせを伝える際、最も重要な伝達スキルは何か。" },
    options: [
      { vi: "Che giấu thông tin để tránh xung đột", en: "Hide information to avoid conflict", ja: "対立を避けるため情報を隠す" },
      { vi: "Truyền đạt trung thực, dựa trên bằng chứng, khách quan, tập trung rủi ro và lựa chọn hành động", en: "Communicate honestly, evidence-based, objectively, focusing on risk and options", ja: "誠実・証拠ベース・客観的に、リスクと選択肢に焦点を当てて伝える" },
      { vi: "Đổ lỗi cho developer", en: "Blame the developers", ja: "開発者を責める" },
      { vi: "Chỉ gửi email dài", en: "Send only long emails", ja: "長いメールだけ送る" }
    ],
    answer: 1,
    exp: { vi: "Cần giao tiếp trung thực, dựa bằng chứng, khách quan, tập trung rủi ro và đưa ra lựa chọn hành động.", en: "Communicate honestly, evidence-based and objectively, focusing on risk and offering options.", ja: "誠実・証拠ベース・客観的に、リスクと選択肢に焦点を当てて伝える必要がある。" }
  },
  {
    q: { vi: "Lãnh đạo kiểu 'servant leadership' trong nhóm test thể hiện qua điều gì?", en: "How is 'servant leadership' expressed in a test team?", ja: "テストチームにおける「サーバントリーダーシップ」はどう表れるか。" },
    options: [
      { vi: "Ra lệnh và kiểm soát chặt mọi chi tiết", en: "Command and tightly control every detail", ja: "全てを命令し厳しく統制する" },
      { vi: "Không tham gia gì cả", en: "Not participating at all", ja: "全く関与しない" },
      { vi: "Loại bỏ trở ngại, hỗ trợ và trao quyền để nhóm tự phát huy hiệu quả", en: "Removing impediments, supporting and empowering the team to perform", ja: "障害を除去し支援し、権限委譲してチームが力を発揮できるようにする" },
      { vi: "Chỉ tập trung vào KPI cá nhân của lãnh đạo", en: "Focusing only on the leader's own KPIs", ja: "リーダー自身のKPIのみに集中する" }
    ],
    answer: 2,
    exp: { vi: "Servant leadership tập trung loại bỏ trở ngại, hỗ trợ, trao quyền để nhóm tự làm việc hiệu quả.", en: "Servant leadership focuses on removing impediments, supporting and empowering the team.", ja: "サーバントリーダーシップは障害除去・支援・権限委譲でチームを活かす。" }
  },
  {
    q: { vi: "Khi đánh giá nhu cầu đào tạo (training needs) cho nhóm test, bước đầu tiên nên là gì?", en: "When assessing training needs for a test team, what should be the first step?", ja: "テストチームの研修ニーズを評価する際、最初のステップは何か。" },
    options: [
      { vi: "Mua ngay khóa học đắt nhất", en: "Immediately buy the most expensive course", ja: "最も高価なコースをすぐ購入する" },
      { vi: "Đào tạo ngẫu nhiên", en: "Train randomly", ja: "無作為に研修する" },
      { vi: "Hủy mọi kế hoạch đào tạo", en: "Cancel all training plans", ja: "全ての研修計画を中止する" },
      { vi: "Phân tích khoảng cách kỹ năng (skill gap) giữa năng lực hiện tại và yêu cầu công việc/mục tiêu", en: "Analyze the skill gap between current competencies and job/goal requirements", ja: "現在の能力と職務/目標要件との間のスキルギャップを分析する" }
    ],
    answer: 3,
    exp: { vi: "Bước đầu là phân tích skill gap giữa năng lực hiện có và yêu cầu để đào tạo đúng trọng tâm.", en: "First analyze the skill gap between current competencies and requirements to target training.", ja: "まず現能力と要件のスキルギャップを分析し、的確に研修を計画する。" }
  },
  {
    q: { vi: "Việc phát triển sự nghiệp (career path) cho tester trong tổ chức mang lại lợi ích chính nào?", en: "Providing career paths for testers in an organization yields which main benefit?", ja: "組織でテスターにキャリアパスを提供する主な利点は何か。" },
    options: [
      { vi: "Giữ chân nhân tài, tăng động lực và duy trì tri thức chuyên môn trong tổ chức", en: "Retaining talent, boosting motivation and preserving expertise in the organization", ja: "人材の定着・動機向上・組織内の専門知識の維持" },
      { vi: "Tăng chi phí không cần thiết", en: "Unnecessary cost increase", ja: "不要なコスト増" },
      { vi: "Làm giảm chất lượng", en: "Reduce quality", ja: "品質を下げる" },
      { vi: "Không ảnh hưởng gì", en: "No effect", ja: "影響なし" }
    ],
    answer: 0,
    exp: { vi: "Career path giúp giữ chân nhân tài, tăng động lực và duy trì tri thức chuyên môn quý giá.", en: "Career paths retain talent, boost motivation and preserve valuable expertise.", ja: "キャリアパスは人材定着・動機向上・貴重な専門知識の維持に役立つ。" }
  },
  {
    q: { vi: "Trong nhóm test đa văn hóa (distributed), thách thức giao tiếp phổ biến nào cần quản lý?", en: "In a multicultural distributed test team, which common communication challenge must be managed?", ja: "多文化な分散テストチームで管理すべき一般的な意思疎通の課題は何か。" },
    options: [
      { vi: "Không có thách thức nào", en: "No challenge at all", ja: "課題は全くない" },
      { vi: "Khác biệt ngôn ngữ, múi giờ, phong cách giao tiếp và ngữ cảnh văn hóa gây hiểu lầm", en: "Language, time-zone, communication-style and cultural-context differences causing misunderstanding", ja: "言語・時差・伝達スタイル・文化的文脈の違いによる誤解" },
      { vi: "Chỉ có vấn đề công cụ", en: "Only tooling issues", ja: "ツールの問題のみ" },
      { vi: "Chỉ vấn đề tài chính", en: "Only financial issues", ja: "財務の問題のみ" }
    ],
    answer: 1,
    exp: { vi: "Nhóm phân tán đa văn hóa đối mặt khác biệt ngôn ngữ, múi giờ, phong cách và ngữ cảnh văn hóa.", en: "Distributed multicultural teams face language, time-zone, style and cultural-context differences.", ja: "分散多文化チームは言語・時差・スタイル・文化的文脈の違いに直面する。" }
  },
  {
    q: { vi: "Kỹ năng 'lắng nghe chủ động' (active listening) giúp test manager điều gì trong giải quyết xung đột?", en: "How does 'active listening' help a test manager in conflict resolution?", ja: "「アクティブリスニング」は対立解決においてテストマネージャーをどう助けるか。" },
    options: [
      { vi: "Áp đặt quan điểm nhanh hơn", en: "Impose their view faster", ja: "自分の意見をより速く押し付ける" },
      { vi: "Tránh phải nói chuyện", en: "Avoid having to talk", ja: "会話を避ける" },
      { vi: "Hiểu đúng vấn đề, quan điểm các bên, xây dựng lòng tin và tìm giải pháp phù hợp", en: "Understand the issue, parties' views, build trust and find suitable solutions", ja: "問題と各当事者の見解を正しく理解し、信頼を築き適切な解決策を見出す" },
      { vi: "Kết thúc họp nhanh mà không cần hiểu", en: "End meetings quickly without understanding", ja: "理解せず会議を早く終える" }
    ],
    answer: 2,
    exp: { vi: "Active listening giúp hiểu đúng vấn đề, quan điểm các bên, tạo lòng tin và giải quyết xung đột.", en: "Active listening helps grasp the issue and parties' views, build trust and resolve conflict.", ja: "アクティブリスニングは問題と見解の理解、信頼構築、対立解決に役立つ。" }
  },
  {
    q: { vi: "Delegation (ủy quyền) hiệu quả trong quản lý nhóm test đòi hỏi điều gì?", en: "Effective delegation in test team management requires what?", ja: "テストチーム管理における効果的な権限委譲には何が必要か。" },
    options: [
      { vi: "Giao việc nhưng giữ toàn bộ quyền quyết định và giám sát vi mô", en: "Assigning tasks but keeping all decisions and micromanaging", ja: "作業を割り当てつつ全ての決定を握りマイクロマネジメントする" },
      { vi: "Không giao gì cả", en: "Delegate nothing", ja: "何も委譲しない" },
      { vi: "Giao mọi việc cho một người duy nhất", en: "Give everything to one person", ja: "全てを一人に任せる" },
      { vi: "Giao nhiệm vụ rõ ràng kèm thẩm quyền, nguồn lực và trách nhiệm phù hợp năng lực", en: "Assigning clear tasks with appropriate authority, resources and accountability matched to capability", ja: "明確な任務に加え、能力に見合った権限・資源・責任を与える" }
    ],
    answer: 3,
    exp: { vi: "Ủy quyền hiệu quả cần giao nhiệm vụ rõ, kèm thẩm quyền, nguồn lực, trách nhiệm phù hợp năng lực.", en: "Effective delegation gives clear tasks with matched authority, resources and accountability.", ja: "効果的な委譲は、能力に合った権限・資源・責任を伴う明確な任務を与える。" }
  },
  {
    q: { vi: "Khi một thành viên có hiệu suất cao nhưng gây mâu thuẫn trong nhóm, cách xử lý tốt nhất là gì?", en: "When a high performer causes friction in the team, what is the best handling?", ja: "高い成果を出すが摩擦を起こすメンバーへの最良の対処は何か。" },
    options: [
      { vi: "Phản hồi trực tiếp, riêng tư, cụ thể về hành vi và tác động; đặt kỳ vọng rõ ràng", en: "Give direct, private, specific feedback on behavior and impact; set clear expectations", ja: "行動と影響について直接・個別・具体的にフィードバックし、明確な期待を設定する" },
      { vi: "Bỏ qua vì họ giỏi", en: "Ignore it because they are skilled", ja: "優秀だから無視する" },
      { vi: "Công khai chỉ trích trước cả nhóm", en: "Publicly criticize before the whole team", ja: "チーム全員の前で公に批判する" },
      { vi: "Sa thải ngay lập tức", en: "Fire immediately", ja: "即座に解雇する" }
    ],
    answer: 0,
    exp: { vi: "Phản hồi riêng, trực tiếp, cụ thể về hành vi/tác động và đặt kỳ vọng rõ, không bỏ qua vì tài năng.", en: "Give private, direct, specific feedback on behavior/impact and set expectations, not overlook it.", ja: "行動と影響について個別・直接・具体的にフィードバックし期待を明確化する。" }
  },
  {
    q: { vi: "Vai trò của việc xây dựng 'lòng tin' (trust) giữa nhóm test và nhóm phát triển là gì?", en: "What is the role of building trust between the test team and the development team?", ja: "テストチームと開発チーム間の「信頼」構築の役割は何か。" },
    options: [
      { vi: "Không quan trọng", en: "Unimportant", ja: "重要でない" },
      { vi: "Cải thiện hợp tác, giảm phòng thủ, tăng chất lượng thông tin lỗi và hiệu quả tổng thể", en: "Improving collaboration, reducing defensiveness, better defect info and overall effectiveness", ja: "協調を改善し、防御的姿勢を減らし、欠陥情報と全体効果を高める" },
      { vi: "Làm chậm quy trình", en: "Slowing the process", ja: "プロセスを遅らせる" },
      { vi: "Chỉ có lợi cho developer", en: "Only benefits developers", ja: "開発者のみに有益" }
    ],
    answer: 1,
    exp: { vi: "Lòng tin tăng hợp tác, giảm phòng thủ, cải thiện chất lượng trao đổi lỗi và hiệu quả chung.", en: "Trust boosts collaboration, reduces defensiveness and improves defect communication and effectiveness.", ja: "信頼は協調を高め防御姿勢を減らし、欠陥伝達と全体効果を改善する。" }
  },
  {
    q: { vi: "Khi tuyển dụng tester cho vai trò kiểm thử tự động, ngoài kỹ năng lập trình cần đánh giá thêm gì?", en: "When hiring a tester for an automation role, besides coding skills what else should be assessed?", ja: "自動化担当のテスター採用時、コーディング能力以外に何を評価すべきか。" },
    options: [
      { vi: "Chỉ tốc độ gõ phím", en: "Only typing speed", ja: "タイピング速度のみ" },
      { vi: "Số năm tuổi", en: "Their age in years", ja: "年齢" },
      { vi: "Tư duy kiểm thử, hiểu rủi ro, kỹ năng thiết kế test và khả năng phối hợp", en: "Testing mindset, risk understanding, test design skills and collaboration", ja: "テスト思考・リスク理解・テスト設計力・協調性" },
      { vi: "Chỉ chứng chỉ công cụ cụ thể", en: "Only a specific tool certificate", ja: "特定ツールの資格のみ" }
    ],
    answer: 2,
    exp: { vi: "Automation tester cần cả tư duy kiểm thử, hiểu rủi ro, thiết kế test và kỹ năng phối hợp, không chỉ code.", en: "Automation testers need testing mindset, risk understanding, design skills and collaboration, not just code.", ja: "自動化テスターはコードだけでなくテスト思考・リスク理解・設計力・協調性が必要。" }
  },
  {
    q: { vi: "Kỹ thuật ước lượng test nào dựa trên ý kiến chuyên gia và sự đồng thuận ẩn danh qua nhiều vòng?", en: "Which test estimation technique relies on expert opinion and anonymous consensus over multiple rounds?", ja: "専門家の意見と複数ラウンドの匿名合意に基づくテスト見積り技法はどれか。" },
    options: [
      { vi: "Ước lượng ngẫu nhiên", en: "Random estimation", ja: "無作為な見積り" },
      { vi: "Function Point Analysis", en: "Function Point Analysis", ja: "ファンクションポイント分析" },
      { vi: "Test Point Analysis", en: "Test Point Analysis", ja: "テストポイント分析" },
      { vi: "Delphi (Wideband Delphi)", en: "Delphi (Wideband Delphi)", ja: "デルファイ（ワイドバンドデルファイ）" }
    ],
    answer: 3,
    exp: { vi: "Wideband Delphi dùng chuyên gia ước lượng ẩn danh qua nhiều vòng để đạt đồng thuận.", en: "Wideband Delphi uses experts estimating anonymously over rounds to reach consensus.", ja: "ワイドバンドデルファイは専門家が匿名で複数回見積り、合意に至る。" }
  },
  {
    q: { vi: "Kỹ thuật ước lượng nào chuyên đo khối lượng test dựa trên function point và các yếu tố ảnh hưởng test?", en: "Which estimation technique measures test size based on function points and test influence factors?", ja: "ファンクションポイントとテスト影響要因に基づきテスト規模を測る見積り技法はどれか。" },
    options: [
      { vi: "Test Point Analysis (TPA)", en: "Test Point Analysis (TPA)", ja: "テストポイント分析（TPA）" },
      { vi: "Delphi", en: "Delphi", ja: "デルファイ" },
      { vi: "Three-point estimation", en: "Three-point estimation", ja: "3点見積り" },
      { vi: "Đếm dòng code", en: "Lines-of-code counting", ja: "コード行数カウント" }
    ],
    answer: 0,
    exp: { vi: "TPA ước lượng nỗ lực test từ function point kết hợp yếu tố ảnh hưởng và mức chất lượng.", en: "TPA estimates test effort from function points combined with influence factors and quality levels.", ja: "TPAはファンクションポイントに影響要因と品質レベルを加味しテスト工数を見積る。" }
  },
  {
    q: { vi: "Ước lượng ba điểm (three-point estimation) sử dụng những giá trị nào?", en: "Three-point estimation uses which values?", ja: "3点見積りはどの値を使うか。" },
    options: [
      { vi: "Start, Middle, End", en: "Start, Middle, End", ja: "開始・中間・終了" },
      { vi: "Optimistic, Most likely, Pessimistic", en: "Optimistic, Most likely, Pessimistic", ja: "楽観値・最可能値・悲観値" },
      { vi: "Low, Zero, High", en: "Low, Zero, High", ja: "低・ゼロ・高" },
      { vi: "Past, Present, Future", en: "Past, Present, Future", ja: "過去・現在・未来" }
    ],
    answer: 1,
    exp: { vi: "Three-point dùng optimistic, most likely, pessimistic để tính giá trị kỳ vọng (vd (O+4M+P)/6).", en: "Three-point uses optimistic, most likely and pessimistic to compute an expected value (e.g. (O+4M+P)/6).", ja: "3点見積りは楽観・最可能・悲観値で期待値を計算する（例：(O+4M+P)/6）。" }
  },
  {
    q: { vi: "Trong kinh tế học kiểm thử, khái niệm 'cost of quality' cân bằng giữa hai loại chi phí nào?", en: "In testing economics, the 'cost of quality' concept balances which two cost types?", ja: "テスト経済学において「品質コスト」はどの2種類のコストのバランスを取るか。" },
    options: [
      { vi: "Chi phí lương và thưởng", en: "Salary and bonus costs", ja: "給与と賞与のコスト" },
      { vi: "Chi phí phần cứng và phần mềm", en: "Hardware and software costs", ja: "ハードとソフトのコスト" },
      { vi: "Chi phí phù hợp (conformance: phòng ngừa + thẩm định) và chi phí không phù hợp (nonconformance: lỗi)", en: "Cost of conformance (prevention + appraisal) and cost of nonconformance (failures)", ja: "適合コスト（予防＋評価）と不適合コスト（失敗）" },
      { vi: "Chi phí điện và nước", en: "Electricity and water costs", ja: "電気と水道のコスト" }
    ],
    answer: 2,
    exp: { vi: "Cost of quality cân bằng cost of conformance (phòng ngừa + thẩm định) và nonconformance (thất bại).", en: "Cost of quality balances conformance (prevention + appraisal) against nonconformance (failure) costs.", ja: "品質コストは適合（予防＋評価）と不適合（失敗）コストのバランスを取る。" }
  },
  {
    q: { vi: "Cách tính ROI của testing (đơn giản hóa) thường dựa trên gì?", en: "The (simplified) ROI of testing is usually calculated based on what?", ja: "（簡略化した）テストのROIは通常何に基づいて計算されるか。" },
    options: [
      { vi: "Số giờ họp", en: "Hours of meetings", ja: "会議時間" },
      { vi: "Số test case / số tester", en: "Test cases / testers", ja: "テストケース数／テスター数" },
      { vi: "Số dòng code viết ra", en: "Lines of code written", ja: "書かれたコード行数" },
      { vi: "(Lợi ích của testing - chi phí testing) / chi phí testing", en: "(Benefit of testing - cost of testing) / cost of testing", ja: "（テストの便益－テストのコスト）／テストのコスト" }
    ],
    answer: 3,
    exp: { vi: "ROI = (lợi ích - chi phí) / chi phí; lợi ích gồm chi phí lỗi tránh được, giảm rủi ro, uy tín.", en: "ROI = (benefit - cost) / cost; benefits include avoided failure costs, reduced risk, reputation.", ja: "ROI＝（便益－コスト）／コスト。便益は回避した失敗コスト・リスク低減・信用を含む。" }
  },
  {
    q: { vi: "Lập luận về 'giá trị kinh doanh của testing' hiệu quả nhất khi test manager trình bày theo hướng nào?", en: "Arguing the 'business value of testing' is most effective when the test manager frames it how?", ja: "「テストのビジネス価値」を最も効果的に主張するには、どの観点で提示すべきか。" },
    options: [
      { vi: "Rủi ro đã giảm, chi phí lỗi đã tránh, và đóng góp vào mục tiêu kinh doanh, không chỉ hoạt động", en: "Risk reduced, failure cost avoided, and contribution to business goals, not mere activity", ja: "削減したリスク・回避した失敗コスト・ビジネス目標への貢献。活動量ではなく" },
      { vi: "Số lượng test case đã viết", en: "The number of test cases written", ja: "作成したテストケース数" },
      { vi: "Số giờ làm việc của tester", en: "Tester working hours", ja: "テスターの労働時間" },
      { vi: "Số công cụ đã mua", en: "Number of tools purchased", ja: "購入したツール数" }
    ],
    answer: 0,
    exp: { vi: "Giá trị của testing nên trình bày qua rủi ro giảm, chi phí lỗi tránh được và đóng góp mục tiêu kinh doanh.", en: "Testing value is best framed via risk reduced, failure cost avoided and business-goal contribution.", ja: "テストの価値はリスク低減・失敗コスト回避・ビジネス目標貢献で示すのが最良。" }
  },
  {
    q: { vi: "Yếu tố nào cần cân nhắc khi quyết định mức đầu tư test automation về mặt kinh tế?", en: "Which factor must be considered economically when deciding the level of test automation investment?", ja: "テスト自動化投資の水準を経済的に決める際に考慮すべき要素はどれか。" },
    options: [
      { vi: "Chỉ chi phí license ban đầu", en: "Only initial license cost", ja: "初期ライセンス費用のみ" },
      { vi: "Chi phí phát triển, bảo trì scripts, tần suất chạy lại và điểm hòa vốn so với test thủ công", en: "Development, maintenance cost, re-run frequency and break-even versus manual testing", ja: "開発・保守コスト、再実行頻度、手動テストとの損益分岐点" },
      { vi: "Màu sắc báo cáo", en: "Report colors", ja: "レポートの色" },
      { vi: "Số lượng nhân viên marketing", en: "Number of marketing staff", ja: "マーケティング担当者数" }
    ],
    answer: 1,
    exp: { vi: "Cần xét chi phí phát triển, bảo trì, tần suất chạy lại và break-even so với thủ công.", en: "Consider development, maintenance, re-run frequency and break-even versus manual testing.", ja: "開発・保守コスト、再実行頻度、手動との損益分岐点を考慮する。" }
  },
  {
    q: { vi: "Khi ước lượng test cấp cao cho nhiều dự án, dữ liệu lịch sử (historical data) đóng vai trò gì?", en: "In high-level test estimation across projects, what role does historical data play?", ja: "複数プロジェクトの上位レベルテスト見積りにおいて、履歴データはどんな役割を果たすか。" },
    options: [
      { vi: "Không có vai trò gì", en: "No role at all", ja: "全く役割がない" },
      { vi: "Chỉ làm chậm quá trình", en: "Only slows the process", ja: "プロセスを遅らせるだけ" },
      { vi: "Cung cấp cơ sở benchmark để hiệu chỉnh ước lượng và tăng độ tin cậy dự báo", en: "Provides a benchmark basis to calibrate estimates and improve forecast reliability", ja: "見積りを較正し予測の信頼性を高めるベンチマーク基盤を提供する" },
      { vi: "Thay thế hoàn toàn phán đoán chuyên gia", en: "Fully replaces expert judgment", ja: "専門家の判断を完全に置き換える" }
    ],
    answer: 2,
    exp: { vi: "Dữ liệu lịch sử làm cơ sở benchmark để hiệu chỉnh ước lượng, tăng độ tin cậy dự báo.", en: "Historical data offers a benchmark to calibrate estimates and improve forecast reliability.", ja: "履歴データは見積り較正の基盤となり予測信頼性を高める。" }
  },
  {
    q: { vi: "Vì sao ước lượng test nên đi kèm mức độ không chắc chắn (uncertainty/range) thay vì một con số cứng?", en: "Why should test estimates come with uncertainty/range rather than a single hard number?", ja: "テスト見積りが単一の固定値ではなく不確実性/範囲を伴うべき理由は何か。" },
    options: [
      { vi: "Để tránh trách nhiệm", en: "To avoid accountability", ja: "責任を避けるため" },
      { vi: "Không có lý do chính đáng", en: "No valid reason", ja: "正当な理由はない" },
      { vi: "Để làm phức tạp báo cáo", en: "To complicate reporting", ja: "報告を複雑にするため" },
      { vi: "Vì ước lượng có sai số vốn có; range phản ánh trung thực rủi ro và hỗ trợ ra quyết định", en: "Because estimates have inherent error; a range honestly reflects risk and aids decisions", ja: "見積りには本質的な誤差があり、範囲がリスクを誠実に示し意思決定を助けるため" }
    ],
    answer: 3,
    exp: { vi: "Ước lượng luôn có sai số; đưa range phản ánh trung thực rủi ro/độ tin cậy và hỗ trợ quyết định tốt hơn.", en: "Estimates carry error; ranges honestly reflect risk/confidence and support better decisions.", ja: "見積りには誤差があり、範囲はリスク/信頼度を誠実に示し意思決定を助ける。" }
  },
  {
    q: { vi: "Phân biệt 'outsourced', 'insourced' và 'distributed' testing như thế nào?", en: "How do 'outsourced', 'insourced' and 'distributed' testing differ?", ja: "「アウトソース」「インソース」「分散」テストはどう区別されるか。" },
    options: [
      { vi: "Outsourced: giao cho bên ngoài tổ chức; insourced: thực hiện trong tổ chức (có thể thuê chuyên gia vào); distributed: nhóm ở nhiều địa điểm", en: "Outsourced: given to an external organization; insourced: done within the organization (possibly bringing experts in); distributed: teams across multiple locations", ja: "アウトソース：外部組織へ委託；インソース：組織内で実施（専門家を招くことも）；分散：複数拠点のチーム" },
      { vi: "Chúng hoàn toàn giống nhau", en: "They are completely identical", ja: "全く同一である" },
      { vi: "Chỉ khác về công cụ dùng", en: "They differ only in tools used", ja: "使うツールだけが違う" },
      { vi: "Chỉ khác về ngôn ngữ lập trình", en: "They differ only in programming language", ja: "プログラミング言語だけが違う" }
    ],
    answer: 0,
    exp: { vi: "Outsourced giao bên ngoài; insourced làm nội bộ (có thể đưa chuyên gia vào); distributed nhóm ở nhiều nơi.", en: "Outsourced goes external; insourced stays internal (may bring experts in); distributed spans locations.", ja: "アウトソースは外部委託、インソースは社内実施、分散は複数拠点のチーム。" }
  },
  {
    q: { vi: "Rủi ro chính khi thuê ngoài (outsource) toàn bộ hoạt động test là gì?", en: "What is the main risk of fully outsourcing all testing activities?", ja: "テスト活動を完全にアウトソースする主なリスクは何か。" },
    options: [
      { vi: "Luôn giảm chất lượng tuyệt đối", en: "Always absolutely reduces quality", ja: "常に絶対的に品質が下がる" },
      { vi: "Mất kiểm soát, mất tri thức miền nội bộ, phụ thuộc nhà cung cấp và khó đảm bảo chất lượng nhất quán", en: "Loss of control, loss of internal domain knowledge, vendor dependency and inconsistent quality assurance", ja: "統制喪失・社内業務知識の喪失・ベンダー依存・品質の一貫性確保困難" },
      { vi: "Không có rủi ro nào", en: "No risk at all", ja: "リスクは全くない" },
      { vi: "Chỉ tăng chi phí license", en: "Only raises license cost", ja: "ライセンス費用が上がるだけ" }
    ],
    answer: 1,
    exp: { vi: "Outsource toàn bộ dễ mất kiểm soát, mất tri thức miền, phụ thuộc vendor và khó đảm bảo chất lượng đồng nhất.", en: "Full outsourcing risks loss of control, domain knowledge, vendor dependency and inconsistent quality.", ja: "完全アウトソースは統制・業務知識喪失、ベンダー依存、品質不一致を招きやすい。" }
  },
  {
    q: { vi: "Yếu tố nào quan trọng nhất để quản lý thành công quan hệ với nhà cung cấp test thuê ngoài?", en: "Which factor is most important to successfully manage the relationship with an outsourced test vendor?", ja: "アウトソース先のテストベンダーとの関係を成功裏に管理する上で最も重要な要素は何か。" },
    options: [
      { vi: "Chọn nhà cung cấp rẻ nhất", en: "Choosing the cheapest vendor", ja: "最も安いベンダーを選ぶ" },
      { vi: "Không giao tiếp để tránh xung đột", en: "No communication to avoid conflict", ja: "対立回避のため意思疎通しない" },
      { vi: "SLA/hợp đồng rõ ràng, giao tiếp thường xuyên, metric giám sát và cơ chế quản trị chung", en: "Clear SLAs/contracts, regular communication, monitoring metrics and shared governance", ja: "明確なSLA/契約、定期的な意思疎通、監視指標、共通のガバナンス" },
      { vi: "Chỉ dựa vào lòng tin không đo lường", en: "Relying only on unmeasured trust", ja: "測定なしの信頼のみに頼る" }
    ],
    answer: 2,
    exp: { vi: "Cần SLA/hợp đồng rõ, giao tiếp đều, metric giám sát và quản trị chung để đảm bảo chất lượng và kỳ vọng.", en: "Clear SLAs/contracts, regular communication, monitoring metrics and shared governance ensure quality and expectations.", ja: "明確なSLA/契約・定期的意思疎通・監視指標・共通ガバナンスが品質と期待の確保に必要。" }
  },
  {
    q: { vi: "Trong nhóm test phân tán qua nhiều múi giờ, cách tận dụng 'follow-the-sun' hiệu quả là gì?", en: "In a test team distributed across time zones, how is 'follow-the-sun' used effectively?", ja: "複数タイムゾーンに分散したテストチームで「フォロー・ザ・サン」を効果的に使う方法は何か。" },
    options: [
      { vi: "Bắt mọi người làm cùng giờ bất kể múi giờ", en: "Force everyone to work the same hours regardless of zone", ja: "タイムゾーンを無視し全員同じ時間に働かせる" },
      { vi: "Không phối hợp gì cả", en: "No coordination at all", ja: "全く連携しない" },
      { vi: "Chỉ làm việc ban đêm", en: "Working only at night", ja: "夜間のみ働く" },
      { vi: "Chuyển giao công việc giữa các địa điểm để test diễn ra gần như liên tục, với handover rõ ràng", en: "Handing over work between locations so testing runs near-continuously, with clear handovers", ja: "拠点間で作業を引き継ぎ、明確な引き継ぎでテストをほぼ連続的に行う" }
    ],
    answer: 3,
    exp: { vi: "Follow-the-sun chuyển giao việc giữa các múi giờ để test gần như 24/7, cần handover và tài liệu rõ ràng.", en: "Follow-the-sun hands over work across zones for near-24/7 testing, needing clear handovers and documentation.", ja: "フォロー・ザ・サンは拠点間で引き継ぎ、ほぼ24時間テストする。明確な引き継ぎと文書が必要。" }
  },
  {
    q: { vi: "Khi chuyển từ mô hình test nội bộ sang phân tán/thuê ngoài, điều gì cần được củng cố nhất để duy trì chất lượng?", en: "When shifting from in-house to distributed/outsourced testing, what most needs strengthening to maintain quality?", ja: "社内テストから分散/アウトソースへ移行する際、品質維持のため最も強化すべきものは何か。" },
    options: [
      { vi: "Quy trình chuẩn hóa, tài liệu rõ ràng, kênh giao tiếp và cơ chế đo lường/giám sát chất lượng", en: "Standardized processes, clear documentation, communication channels and quality monitoring", ja: "標準化プロセス・明確な文書・意思疎通経路・品質の測定/監視" },
      { vi: "Giảm mọi tài liệu để đi nhanh", en: "Reduce all documentation to move fast", ja: "速さのため全文書を減らす" },
      { vi: "Loại bỏ metric", en: "Eliminate metrics", ja: "指標を排除する" },
      { vi: "Ngừng mọi review", en: "Stop all reviews", ja: "全レビューを止める" }
    ],
    answer: 0,
    exp: { vi: "Phân tán/thuê ngoài cần quy trình chuẩn, tài liệu rõ, kênh giao tiếp và giám sát chất lượng chặt chẽ hơn.", en: "Distributed/outsourced needs standardized processes, clear docs, communication and stronger quality monitoring.", ja: "分散/アウトソースは標準プロセス・明確な文書・意思疎通・より強い品質監視を要する。" }
  },
  {
    q: { vi: "Trong TMMi Level 3 (Defined), process area nào giúp thiết lập quy trình test chuẩn toàn tổ chức?", en: "In TMMi Level 3 (Defined), which process area helps establish an organization-wide standard test process?", ja: "TMMiレベル3（定義された）において、組織全体の標準テストプロセス確立を助けるプロセスエリアはどれか。" },
    options: [
      { vi: "Defect Prevention", en: "Defect Prevention", ja: "欠陥予防" },
      { vi: "Test Organization và Test Training Program", en: "Test Organization and Test Training Program", ja: "テスト組織とテスト研修プログラム" },
      { vi: "Test Measurement", en: "Test Measurement", ja: "テスト測定" },
      { vi: "Quality Control", en: "Quality Control", ja: "品質管理" }
    ],
    answer: 1,
    exp: { vi: "Level 3 gồm Test Organization, Test Training Program, Test Lifecycle & Integration... thiết lập quy trình chuẩn tổ chức.", en: "Level 3 includes Test Organization, Test Training Program, Test Lifecycle & Integration establishing standard processes.", ja: "レベル3はテスト組織・テスト研修・テストライフサイクル統合などで標準プロセスを確立する。" }
  },
  {
    q: { vi: "Khi triển khai cải tiến quy trình test, 'kháng cự thay đổi' (resistance to change) nên được xử lý như thế nào?", en: "When rolling out test process improvement, how should 'resistance to change' be handled?", ja: "テストプロセス改善を展開する際、「変化への抵抗」はどう扱うべきか。" },
    options: [
      { vi: "Phớt lờ và ép buộc tuân thủ", en: "Ignore it and force compliance", ja: "無視して遵守を強制する" },
      { vi: "Sa thải người phản đối", en: "Fire objectors", ja: "反対者を解雇する" },
      { vi: "Hiểu nguyên nhân, truyền thông lợi ích, lôi kéo tham gia sớm và đào tạo hỗ trợ", en: "Understand causes, communicate benefits, involve people early and provide training support", ja: "原因を理解し、便益を伝え、早期に巻き込み、研修で支援する" },
      { vi: "Dừng mọi cải tiến", en: "Stop all improvement", ja: "全改善を止める" }
    ],
    answer: 2,
    exp: { vi: "Xử lý kháng cự bằng cách hiểu nguyên nhân, truyền thông lợi ích, lôi kéo tham gia và đào tạo.", en: "Address resistance by understanding causes, communicating benefits, involving people and training.", ja: "抵抗は原因理解・便益伝達・巻き込み・研修で対処する。" }
  },
  {
    q: { vi: "Metric 'test execution progress' (số test đã chạy / kế hoạch) chủ yếu hỗ trợ hoạt động nào?", en: "The 'test execution progress' metric (tests run / planned) mainly supports which activity?", ja: "「テスト実行進捗」指標（実行済/計画）は主にどの活動を支えるか。" },
    options: [
      { vi: "Tuyển dụng", en: "Recruitment", ja: "採用" },
      { vi: "Lập ngân sách marketing", en: "Marketing budgeting", ja: "マーケティング予算策定" },
      { vi: "Thiết kế kiến trúc", en: "Architecture design", ja: "アーキテクチャ設計" },
      { vi: "Giám sát và kiểm soát test (test monitoring and control), phát hiện chậm trễ sớm", en: "Test monitoring and control, spotting delays early", ja: "テストの監視と制御、遅延の早期発見" }
    ],
    answer: 3,
    exp: { vi: "Execution progress phục vụ monitoring & control, giúp phát hiện chậm trễ và điều chỉnh kịp thời.", en: "Execution progress serves monitoring & control, helping detect delays and adjust promptly.", ja: "実行進捗は監視と制御に役立ち、遅延検出と迅速な調整を可能にする。" }
  },
  {
    q: { vi: "Một lãnh đạo test muốn thúc đẩy văn hóa cải tiến liên tục. Hành động nào phù hợp nhất?", en: "A test leader wants to foster a continuous-improvement culture. Which action fits best?", ja: "テストリーダーが継続的改善の文化を醸成したい。最も適した行動はどれか。" },
    options: [
      { vi: "Khuyến khích retrospective, học từ thất bại không đổ lỗi, và trao quyền đề xuất cải tiến", en: "Encourage retrospectives, blameless learning from failure, and empower improvement proposals", ja: "レトロスペクティブを促し、非難なき失敗からの学びと改善提案の権限委譲を行う" },
      { vi: "Trừng phạt mọi lỗi để răn đe", en: "Punish every mistake as a deterrent", ja: "抑止のため全ての失敗を罰する" },
      { vi: "Cấm thảo luận về lỗi", en: "Ban discussion of failures", ja: "失敗の議論を禁じる" },
      { vi: "Chỉ lãnh đạo mới được đề xuất cải tiến", en: "Only leaders may propose improvements", ja: "リーダーのみが改善を提案できる" }
    ],
    answer: 0,
    exp: { vi: "Văn hóa cải tiến liên tục cần retrospective, học không đổ lỗi và trao quyền cho mọi người đề xuất cải tiến.", en: "A continuous-improvement culture needs retrospectives, blameless learning and empowering everyone to propose improvements.", ja: "継続的改善文化にはレトロスペクティブ・非難なき学び・全員への改善提案権限が必要。" }
  },
  {
    q: { vi: "Trong đánh giá kinh tế, 'break-even point' của test automation là gì?", en: "In economic evaluation, what is the 'break-even point' of test automation?", ja: "経済評価において、テスト自動化の「損益分岐点」とは何か。" },
    options: [
      { vi: "Thời điểm mã nguồn đạt 100% coverage", en: "When code reaches 100% coverage", ja: "コードが100％網羅に達する時点" },
      { vi: "Số lần chạy lại mà chi phí automation tích lũy bằng chi phí test thủ công tương ứng", en: "The number of re-runs at which cumulative automation cost equals equivalent manual cost", ja: "累積自動化コストが同等の手動コストと等しくなる再実行回数" },
      { vi: "Ngày phát hành sản phẩm", en: "The product release date", ja: "製品リリース日" },
      { vi: "Số lượng tester trong nhóm", en: "The number of testers", ja: "テスター数" }
    ],
    answer: 1,
    exp: { vi: "Break-even là số lần chạy lại mà chi phí automation tích lũy cân bằng chi phí thủ công; sau đó automation có lợi.", en: "Break-even is the re-run count where cumulative automation cost matches manual cost; beyond it automation pays off.", ja: "損益分岐点は累積自動化コストが手動コストと等しくなる再実行回数で、以降は自動化が有利。" }
  },
  {
    q: { vi: "Khi quản lý nhóm test thuê ngoài, việc chuyển giao tri thức (knowledge transfer) nên diễn ra khi nào?", en: "When managing an outsourced test team, when should knowledge transfer occur?", ja: "アウトソースのテストチームを管理する際、知識移転はいつ行うべきか。" },
    options: [
      { vi: "Chỉ khi kết thúc hợp đồng", en: "Only at contract end", ja: "契約終了時のみ" },
      { vi: "Không cần chuyển giao gì", en: "No transfer needed", ja: "移転は不要" },
      { vi: "Ngay từ đầu và duy trì liên tục hai chiều để giảm rủi ro phụ thuộc và mất tri thức", en: "From the outset and continuously, bidirectionally, to reduce dependency and knowledge-loss risk", ja: "最初から継続的・双方向に行い、依存と知識喪失のリスクを減らす" },
      { vi: "Chỉ khi có sự cố nghiêm trọng", en: "Only when a serious incident occurs", ja: "重大インシデント時のみ" }
    ],
    answer: 2,
    exp: { vi: "Knowledge transfer nên bắt đầu sớm và liên tục hai chiều, giảm phụ thuộc và rủi ro mất tri thức.", en: "Knowledge transfer should start early and be continuous and bidirectional, reducing dependency and loss risk.", ja: "知識移転は早期から継続的・双方向に行い、依存と喪失リスクを減らすべき。" }
  },
  {
    q: { vi: "Mục tiêu chính của TMMi Level 5 (Optimization) là gì?", en: "What is the main goal of TMMi Level 5 (Optimization)?", ja: "TMMiレベル5（最適化）の主な目標は何か。" },
    options: [
      { vi: "Chỉ thiết lập chính sách test cơ bản", en: "Merely establishing a basic test policy", ja: "基本的なテストポリシーの確立のみ" },
      { vi: "Chỉ chạy test thủ công", en: "Only running manual tests", ja: "手動テストの実行のみ" },
      { vi: "Chỉ đo lường sản phẩm", en: "Only measuring the product", ja: "製品の測定のみ" },
      { vi: "Cải tiến liên tục quy trình test qua phòng ngừa lỗi và tối ưu hóa dựa trên dữ liệu định lượng", en: "Continuously improving the test process via defect prevention and quantitative-data optimization", ja: "欠陥予防と定量データによる最適化で、テストプロセスを継続的に改善する" }
    ],
    answer: 3,
    exp: { vi: "Level 5 nhắm cải tiến liên tục qua phòng ngừa lỗi, kiểm soát chất lượng và tối ưu hóa dựa trên dữ liệu.", en: "Level 5 targets continuous improvement via defect prevention, quality control and data-driven optimization.", ja: "レベル5は欠陥予防・品質管理・データ駆動の最適化で継続的改善を目指す。" }
  }
];
