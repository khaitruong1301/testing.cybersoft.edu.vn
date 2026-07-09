export const DATA = [
  // ========================= FOUNDATION (CTFL) x10 =========================
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Một nhóm chạy 500 test case, có 40 case fail. Sau khi debug, 25 lỗi được sửa nhưng phát sinh thêm 5 lỗi mới ở vùng khác. Theo nguyên lý kiểm thử, hiện tượng phát sinh lỗi mới do việc sửa lỗi được gọi là gì?",
      en: "A team runs 500 test cases, 40 fail. After debugging, 25 defects are fixed but 5 new defects appear in another area. According to testing principles, what is this emergence of new defects caused by a fix called?",
      ja: "チームが500件のテストケースを実行し、40件が失敗した。デバッグ後、25件の欠陥は修正されたが、別の領域で5件の新しい欠陥が発生した。テストの原則に従うと、修正によって新しい欠陥が現れるこの現象は何と呼ばれるか。"
    },
    options: [
      { vi: "Lỗi hồi quy (regression defect)", en: "Regression defect", ja: "リグレッション欠陥（デグレード）" },
      { vi: "Ngụy biện thuốc trừ sâu", en: "Pesticide paradox", ja: "殺虫剤のパラドックス" },
      { vi: "Cụm lỗi tự nhiên", en: "Natural defect clustering", ja: "自然な欠陥クラスタリング" },
      { vi: "Kiểm thử vét cạn", en: "Exhaustive testing", ja: "網羅的テスト" }
    ],
    answer: 0,
    exp: {
      vi: "Khi một thay đổi (sửa lỗi) làm hỏng chức năng đang chạy đúng ở nơi khác, đó là lỗi hồi quy; vì vậy cần chạy lại kiểm thử hồi quy sau mỗi lần sửa.",
      en: "When a change (a fix) breaks previously working functionality elsewhere, that is a regression defect; hence regression testing is needed after each fix.",
      ja: "ある変更（修正）が別の場所で正しく動作していた機能を壊す場合、それはリグレッション欠陥である。したがって修正のたびにリグレッションテストが必要となる。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Phân biệt cặp khái niệm dễ nhầm: đâu là điểm KHÁC nhau cốt lõi giữa 「error」, 「defect」 và 「failure」?",
      en: "Distinguish an easily-confused trio: what is the core difference between an error, a defect and a failure?",
      ja: "混同しやすい三つの用語を区別する。エラー（誤り）、欠陥、故障の本質的な違いは何か。"
    },
    options: [
      { vi: "Cả ba là từ đồng nghĩa, chỉ khác ngữ cảnh dùng", en: "All three are synonyms, differing only by context", ja: "三つは同義語で、使う文脈が違うだけである" },
      { vi: "Error là hành động sai của con người, defect là kết quả trong sản phẩm, failure là biểu hiện khi vận hành", en: "An error is a human wrong action, a defect is the result in the product, a failure is what manifests during execution", ja: "エラーは人間の誤った行為、欠陥は成果物に生じた結果、故障は実行時に現れる現象である" },
      { vi: "Defect luôn dẫn tới failure trong mọi lần chạy", en: "A defect always leads to a failure on every run", ja: "欠陥は実行のたびに必ず故障を引き起こす" },
      { vi: "Failure xảy ra trước, sau đó mới tạo ra defect", en: "A failure occurs first and then creates a defect", ja: "故障が先に起き、その後に欠陥が作られる" }
    ],
    answer: 1,
    exp: {
      vi: "Chuỗi nhân quả: con người mắc error → tạo ra defect trong mã/tài liệu → khi thực thi có thể gây failure. Một defect chưa chắc luôn gây failure.",
      en: "Causal chain: a human makes an error → introduces a defect in code or documents → execution may cause a failure. A defect does not necessarily always cause a failure.",
      ja: "因果の連鎖: 人間がエラーを犯す→コードや文書に欠陥を作り込む→実行すると故障を引き起こしうる。欠陥は必ずしも常に故障を起こすとは限らない。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Một trường nhập tuổi hợp lệ từ 18 đến 65. Áp dụng phân tích giá trị biên (2 giá trị mỗi biên), tập giá trị nào là ĐÚNG và ĐỦ nhất?",
      en: "An age field accepts valid values from 18 to 65. Applying boundary value analysis (two values per boundary), which value set is correct and most complete?",
      ja: "年齢入力欄は18から65までの値を有効とする。境界値分析（各境界2値）を適用したとき、正しく最も完全な値の集合はどれか。"
    },
    options: [
      { vi: "18, 65", en: "18, 65", ja: "18、65" },
      { vi: "0, 18, 65, 100", en: "0, 18, 65, 100", ja: "0、18、65、100" },
      { vi: "17, 18, 65, 66", en: "17, 18, 65, 66", ja: "17、18、65、66" },
      { vi: "16, 19, 64, 67", en: "16, 19, 64, 67", ja: "16、19、64、67" }
    ],
    answer: 2,
    exp: {
      vi: "Với BVA 2 giá trị, tại mỗi biên ta lấy giá trị ngay dưới và giá trị biên: quanh 18 lấy 17 và 18, quanh 65 lấy 65 và 66. Vậy tập là 17, 18, 65, 66.",
      en: "With two-value BVA, at each boundary take the value just outside and the boundary itself: around 18 take 17 and 18, around 65 take 65 and 66. So the set is 17, 18, 65, 66.",
      ja: "2値の境界値分析では各境界で境界のすぐ外側の値と境界値自体を取る。18周辺は17と18、65周辺は65と66。したがって集合は17、18、65、66となる。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Dự án dùng mô hình V. Theo mô hình này, hoạt động thiết kế test acceptance (kiểm thử chấp nhận) nên bắt đầu vào giai đoạn nào?",
      en: "A project uses the V-model. In this model, when should acceptance test design begin?",
      ja: "プロジェクトはVモデルを使用している。このモデルでは、受け入れテストの設計はいつ始めるべきか。"
    },
    options: [
      { vi: "Ngay khi có mã nguồn hoàn chỉnh", en: "As soon as the full source code is available", ja: "完全なソースコードが用意できたらすぐ" },
      { vi: "Sau khi kiểm thử hệ thống kết thúc", en: "After system testing has finished", ja: "システムテストが終了した後" },
      { vi: "Chỉ sau khi khách hàng ký hợp đồng bảo trì", en: "Only after the customer signs the maintenance contract", ja: "顧客が保守契約に署名した後にのみ" },
      { vi: "Song song với giai đoạn phân tích yêu cầu/đặc tả nghiệp vụ", en: "In parallel with the requirements/business specification phase", ja: "要件・業務仕様の分析フェーズと並行して" }
    ],
    answer: 3,
    exp: {
      vi: "Mô hình V gắn mỗi mức test với một mức phát triển. Acceptance test tương ứng với yêu cầu, nên việc thiết kế test bắt đầu sớm ngay khi phân tích yêu cầu (kiểm thử sớm).",
      en: "The V-model pairs each test level with a development level. Acceptance testing corresponds to requirements, so its test design starts early during requirements analysis (early testing).",
      ja: "Vモデルは各テストレベルを開発レベルと対応させる。受け入れテストは要件に対応するため、その設計は要件分析の段階で早期に始まる（早期テスト）。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Bảng ưu tiên lỗi cho thấy: 3 lỗi Critical chưa sửa, 12 lỗi Major đã sửa, 40 lỗi Minor còn mở. Ngày phát hành là mai. Là tester, khuyến nghị hợp lý nhất trong báo cáo tóm tắt là gì?",
      en: "A defect priority table shows: 3 Critical unfixed, 12 Major fixed, 40 Minor still open. Release is tomorrow. As a tester, what is the most reasonable recommendation in the summary report?",
      ja: "欠陥優先度表は次を示す: 未修正のCritical 3件、修正済みのMajor 12件、未対応のMinor 40件。リリースは明日。テスターとして、要約レポートで最も妥当な推奨は何か。"
    },
    options: [
      { vi: "Phát hành đúng hạn vì đa số lỗi là Minor", en: "Release on time because most defects are Minor", ja: "欠陥の大半がMinorなので予定通りリリースする" },
      { vi: "Cung cấp thông tin rủi ro và khuyến nghị hoãn cho tới khi 3 lỗi Critical được xử lý, để bên liên quan quyết định", en: "Provide the risk information and recommend delaying until the 3 Critical defects are handled, leaving the decision to stakeholders", ja: "リスク情報を提示し、3件のCritical欠陥が処理されるまで延期を推奨し、判断は関係者に委ねる" },
      { vi: "Tự ý sửa 3 lỗi Critical rồi phát hành ngay không cần retest", en: "Fix the 3 Critical defects yourself and release immediately without retesting", ja: "3件のCritical欠陥を自分で修正し、再テストせず即リリースする" },
      { vi: "Đóng 40 lỗi Minor để làm sạch báo cáo rồi phát hành", en: "Close the 40 Minor defects to clean up the report, then release", ja: "レポートを整えるため40件のMinor欠陥を閉じてからリリースする" }
    ],
    answer: 1,
    exp: {
      vi: "Tester không quyết định phát hành mà cung cấp thông tin khách quan về rủi ro; lỗi Critical chưa sửa là rủi ro nghiêm trọng cần nêu rõ để stakeholder ra quyết định.",
      en: "The tester does not decide the release but provides objective risk information; unfixed Critical defects are a serious risk that must be highlighted so stakeholders can decide.",
      ja: "テスターはリリースを決定するのではなく、客観的なリスク情報を提供する。未修正のCritical欠陥は重大なリスクであり、関係者が判断できるよう明示すべきである。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Phân biệt 「verification」 và 「validation」. Câu nào mô tả ĐÚNG?",
      en: "Distinguish verification and validation. Which statement is correct?",
      ja: "検証（verification）と妥当性確認（validation）を区別する。正しい記述はどれか。"
    },
    options: [
      { vi: "Cả hai đều chỉ thực hiện sau khi phát hành sản phẩm", en: "Both are performed only after the product is released", ja: "両方とも製品リリース後にのみ実施される" },
      { vi: "Validation chỉ là review tài liệu, verification chỉ là chạy test động", en: "Validation is only document review, verification is only dynamic testing", ja: "妥当性確認は文書レビューのみ、検証は動的テストのみである" },
      { vi: "Verification kiểm tra có đúng đặc tả không, validation kiểm tra có đáp ứng nhu cầu người dùng không", en: "Verification checks conformance to specifications, validation checks whether user needs are met", ja: "検証は仕様への適合を確認し、妥当性確認は利用者のニーズを満たすかを確認する" },
      { vi: "Verification và validation là hai tên gọi của cùng một hoạt động", en: "Verification and validation are two names for the same activity", ja: "検証と妥当性確認は同一の活動の二つの呼び名である" }
    ],
    answer: 2,
    exp: {
      vi: "Verification: xây dựng có tuân theo đặc tả/tiêu chuẩn không. Validation: sản phẩm có đáp ứng nhu cầu thực tế của người dùng không. Hai hoạt động khác nhau về mục tiêu.",
      en: "Verification: does the build conform to specifications/standards. Validation: does the product meet the users' actual needs. They are two activities with different goals.",
      ja: "検証は成果物が仕様や基準に適合するかを見る。妥当性確認は製品が利用者の実際のニーズを満たすかを見る。両者は目的の異なる別個の活動である。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Một hàm giảm giá: nếu tổng đơn > 1.000.000đ thì giảm 10%, ngược lại không giảm. Dùng kỹ thuật phân vùng tương đương, cần tối thiểu bao nhiêu lớp giá trị đầu vào cho biến 「tổng đơn」?",
      en: "A discount function: if order total > 1,000,000 then 10% off, otherwise none. Using equivalence partitioning, how many input value classes are minimally needed for the variable 'order total'?",
      ja: "割引関数: 注文合計が1,000,000超なら10%引き、そうでなければ割引なし。同値分割を用いる場合、変数「注文合計」に最低いくつの入力クラスが必要か。"
    },
    options: [
      { vi: "1 lớp", en: "1 class", ja: "1クラス" },
      { vi: "4 lớp", en: "4 classes", ja: "4クラス" },
      { vi: "10 lớp", en: "10 classes", ja: "10クラス" },
      { vi: "2 lớp", en: "2 classes", ja: "2クラス" }
    ],
    answer: 3,
    exp: {
      vi: "Điều kiện chia dải giá trị thành 2 vùng tương đương: 「> 1.000.000」 (được giảm) và 「<= 1.000.000」 (không giảm). Mỗi vùng chỉ cần một đại diện.",
      en: "The condition splits the value range into two equivalence partitions: '> 1,000,000' (discounted) and '<= 1,000,000' (not discounted). Each partition needs just one representative.",
      ja: "条件は値の範囲を2つの同値クラスに分ける:「1,000,000超」（割引あり）と「1,000,000以下」（割引なし）。各クラスは代表値1つで足りる。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Trong quy trình quản lý lỗi, một defect được chuyển sang trạng thái 「Rejected」. Ý nghĩa phổ biến nhất của trạng thái này là gì?",
      en: "In the defect management workflow, a defect is moved to the 'Rejected' state. What is the most common meaning of this state?",
      ja: "欠陥管理のワークフローで、ある欠陥が「Rejected（却下）」状態に移された。この状態の最も一般的な意味は何か。"
    },
    options: [
      { vi: "Nhóm phát triển cho rằng đây không phải lỗi hợp lệ (ví dụ hiểu sai yêu cầu, không tái hiện được, hoặc trùng)", en: "The development team considers it not a valid defect (e.g. misunderstood requirement, not reproducible, or duplicate)", ja: "開発チームがこれを有効な欠陥ではないと判断した（要件の誤解、再現不可、重複など）" },
      { vi: "Lỗi đã được sửa và chờ retest", en: "The defect has been fixed and awaits retest", ja: "欠陥は修正済みで再テスト待ちである" },
      { vi: "Lỗi có mức ưu tiên cao nhất cần sửa ngay", en: "The defect has the highest priority and must be fixed immediately", ja: "欠陥は最優先で直ちに修正が必要である" },
      { vi: "Lỗi đã được đóng vĩnh viễn sau khi retest đạt", en: "The defect is permanently closed after a passing retest", ja: "欠陥は再テスト合格後に恒久的にクローズされた" }
    ],
    answer: 0,
    exp: {
      vi: "「Rejected」 nghĩa là báo cáo lỗi bị từ chối vì không được coi là lỗi hợp lệ: có thể do không tái hiện được, hiểu sai yêu cầu, hoặc trùng với báo cáo khác.",
      en: "'Rejected' means the defect report is refused because it is not deemed a valid defect: possibly not reproducible, based on a misunderstanding, or a duplicate.",
      ja: "「Rejected」は、有効な欠陥とみなされないため欠陥報告が却下されたことを意味する。再現不可、要件の誤解、他報告との重複などが原因となりうる。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "So sánh chi phí sửa lỗi: một lỗi yêu cầu bị bỏ sót và chỉ phát hiện ở giai đoạn vận hành thường tốn kém hơn nhiều so với phát hiện ở giai đoạn phân tích. Nguyên tắc nào giải thích điều này?",
      en: "Comparing defect-fixing cost: a requirements defect missed and only found in operation is typically far costlier than if found during analysis. Which principle explains this?",
      ja: "欠陥修正コストの比較: 見落とされ運用段階で初めて見つかる要件欠陥は、分析段階で見つかる場合よりはるかに高コストになる。これを説明する原則はどれか。"
    },
    options: [
      { vi: "Kiểm thử cho thấy sự hiện diện của lỗi", en: "Testing shows the presence of defects", ja: "テストは欠陥の存在を示す" },
      { vi: "Kiểm thử vét cạn là bất khả thi", en: "Exhaustive testing is impossible", ja: "網羅的テストは不可能である" },
      { vi: "Kiểm thử sớm giúp tiết kiệm thời gian và chi phí", en: "Early testing saves time and money", ja: "早期テストは時間とコストを節約する" },
      { vi: "Lỗi tập trung thành cụm", en: "Defects cluster together", ja: "欠陥はクラスターを形成する" }
    ],
    answer: 2,
    exp: {
      vi: "Nguyên lý kiểm thử sớm: phát hiện và sửa lỗi càng sớm trong vòng đời thì càng rẻ; càng để muộn (đến vận hành) chi phí càng tăng vọt.",
      en: "The early testing principle: finding and fixing defects earlier in the lifecycle is cheaper; the later (into operation), the more costs escalate.",
      ja: "早期テストの原則: ライフサイクルの早い段階で欠陥を発見・修正するほど安く、遅くなる（運用に至る）ほどコストは急増する。"
    }
  },
  {
    lvl: "istqb-foundation",
    q: {
      vi: "Đội kiểm thử đo được: tổng 200 điều kiện quyết định, đã kiểm thử 150. Độ bao phủ nhánh (decision coverage) đạt bao nhiêu phần trăm?",
      en: "A test team measures: 200 decision outcomes in total, 150 exercised. What decision coverage percentage is achieved?",
      ja: "テストチームが測定した: 判定結果は合計200件、うち150件を実行。判定網羅率は何パーセントか。"
    },
    options: [
      { vi: "50%", en: "50%", ja: "50%" },
      { vi: "60%", en: "60%", ja: "60%" },
      { vi: "133%", en: "133%", ja: "133%" },
      { vi: "75%", en: "75%", ja: "75%" }
    ],
    answer: 3,
    exp: {
      vi: "Độ bao phủ = số phần tử đã kiểm thử / tổng số phần tử × 100 = 150/200 × 100 = 75%.",
      en: "Coverage = items exercised / total items × 100 = 150/200 × 100 = 75%.",
      ja: "網羅率 = 実行した項目数 / 全項目数 × 100 = 150/200 × 100 = 75%。"
    }
  },

  // ========================= ADVANCED (CTAL) x10 =========================
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Một Test Analyst phân tích rủi ro sản phẩm. Rủi ro A: khả năng xảy ra cao, tác động thấp. Rủi ro B: khả năng xảy ra thấp, tác động rất cao (mất dữ liệu tài chính). Cách phân bổ nỗ lực kiểm thử hợp lý theo risk-based testing là gì?",
      en: "A Test Analyst performs product risk analysis. Risk A: high likelihood, low impact. Risk B: low likelihood, very high impact (financial data loss). What is the reasonable test effort allocation under risk-based testing?",
      ja: "テストアナリストが製品リスク分析を行う。リスクA: 発生可能性が高く影響は小さい。リスクB: 発生可能性は低いが影響が非常に大きい（金融データ喪失）。リスクベーステストにおける妥当なテスト工数配分はどれか。"
    },
    options: [
      { vi: "Đánh giá cả hai theo mức rủi ro (khả năng × tác động); B có tác động cực cao nên vẫn cần nỗ lực đáng kể dù xác suất thấp", en: "Evaluate both by risk level (likelihood × impact); B has extreme impact so still warrants significant effort despite low probability", ja: "両方をリスクレベル（可能性×影響）で評価する。Bは影響が極めて大きいため、確率が低くても相応の工数が必要である" },
      { vi: "Chỉ tập trung vào A vì nó xảy ra thường xuyên hơn", en: "Focus only on A because it happens more often", ja: "より頻繁に起こるのでAだけに集中する" },
      { vi: "Bỏ qua B hoàn toàn vì xác suất thấp", en: "Ignore B entirely because probability is low", ja: "確率が低いのでBを完全に無視する" },
      { vi: "Chia đều nỗ lực 50/50 bất kể mức rủi ro", en: "Split effort 50/50 regardless of risk level", ja: "リスクレベルに関係なく工数を50/50で分ける" }
    ],
    answer: 0,
    exp: {
      vi: "Mức rủi ro là kết hợp khả năng và tác động. Rủi ro tác động cực cao như mất dữ liệu tài chính thường phải được kiểm thử kỹ dù xác suất thấp, vì hậu quả nghiêm trọng.",
      en: "Risk level combines likelihood and impact. A very high-impact risk like financial data loss usually must be tested thoroughly despite low probability, because consequences are severe.",
      ja: "リスクレベルは可能性と影響の組み合わせである。金融データ喪失のような影響が極めて大きいリスクは、確率が低くても結果が深刻なため、通常は入念にテストする必要がある。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Đọc bảng quyết định (decision table): 3 điều kiện nhị phân độc lập. Trước khi rút gọn, bảng đầy đủ có bao nhiêu cột (rule)?",
      en: "Reading a decision table: 3 independent binary conditions. Before collapsing, how many columns (rules) does the full table have?",
      ja: "デシジョンテーブルを読む: 独立した2値条件が3つ。簡約前の完全な表には何列（ルール）あるか。"
    },
    options: [
      { vi: "3", en: "3", ja: "3" },
      { vi: "8", en: "8", ja: "8" },
      { vi: "6", en: "6", ja: "6" },
      { vi: "9", en: "9", ja: "9" }
    ],
    answer: 1,
    exp: {
      vi: "Mỗi điều kiện nhị phân có 2 giá trị; số tổ hợp = 2^n = 2^3 = 8 cột. Sau đó có thể rút gọn bằng các mục 「không quan tâm」.",
      en: "Each binary condition has 2 values; number of combinations = 2^n = 2^3 = 8 columns. It can then be collapsed using 'don't care' entries.",
      ja: "各2値条件は2つの値を持つ。組み合わせ数 = 2^n = 2^3 = 8列。その後「不問（don't care）」項目で簡約できる。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Phân biệt hai kỹ thuật: 「statement coverage」 và 「branch coverage」. Với đoạn mã có một câu lệnh IF không có ELSE, điều nào ĐÚNG?",
      en: "Distinguish two techniques: statement coverage and branch coverage. For code with a single IF without ELSE, which statement is true?",
      ja: "二つの技法を区別する: ステートメント網羅とブランチ網羅。ELSEのない単一のIF文を含むコードについて、正しいのはどれか。"
    },
    options: [
      { vi: "100% statement coverage luôn kéo theo 100% branch coverage", en: "100% statement coverage always implies 100% branch coverage", ja: "100%のステートメント網羅は常に100%のブランチ網羅を含意する" },
      { vi: "Branch coverage yếu hơn statement coverage", en: "Branch coverage is weaker than statement coverage", ja: "ブランチ網羅はステートメント網羅より弱い" },
      { vi: "Hai kỹ thuật luôn cho cùng số lượng test case", en: "The two techniques always yield the same number of test cases", ja: "二つの技法は常に同じ数のテストケースを生む" },
      { vi: "Có thể đạt 100% statement coverage mà chưa đạt 100% branch coverage vì nhánh 「false」 chưa được thực thi", en: "You can reach 100% statement coverage without 100% branch coverage because the 'false' branch is not exercised", ja: "「偽」の分岐が実行されないため、100%ブランチ網羅に達しなくても100%ステートメント網羅は達成できる" }
    ],
    answer: 3,
    exp: {
      vi: "Với IF không có ELSE, một test cho nhánh true có thể chạy hết mọi câu lệnh (100% statement) nhưng chưa đi nhánh false, nên branch coverage < 100%. Branch coverage mạnh hơn statement coverage.",
      en: "With an IF without ELSE, a test on the true branch may execute all statements (100% statement) yet never take the false branch, so branch coverage < 100%. Branch coverage is stronger than statement coverage.",
      ja: "ELSEのないIFでは、真の分岐のテストで全ステートメントを実行できる（100%ステートメント）が偽の分岐を通らないため、ブランチ網羅は100%未満となる。ブランチ網羅はステートメント網羅より強い。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Một Test Manager ước lượng công sức bằng kỹ thuật dựa trên chuyên gia (Wideband Delphi). Ba chuyên gia đưa ra 20, 30, 40 người-ngày. Đặc điểm cốt lõi của Wideband Delphi so với chỉ lấy trung bình là gì?",
      en: "A Test Manager estimates effort using an expert-based technique (Wideband Delphi). Three experts give 20, 30, 40 person-days. What is the core feature of Wideband Delphi compared to just averaging?",
      ja: "テストマネージャが専門家ベースの技法（ワイドバンド・デルファイ）で工数を見積もる。3人の専門家が20、30、40人日を提示。単純平均と比べたワイドバンド・デルファイの核心的特徴は何か。"
    },
    options: [
      { vi: "Luôn chọn giá trị nhỏ nhất để tiết kiệm chi phí", en: "Always pick the smallest value to save cost", ja: "コスト節約のため常に最小値を選ぶ" },
      { vi: "Chỉ dùng dữ liệu lịch sử, không cần chuyên gia", en: "Uses only historical data, no experts needed", ja: "履歴データのみを使い、専門家は不要である" },
      { vi: "Các chuyên gia thảo luận về khác biệt và ước lượng lại qua nhiều vòng để hội tụ về đồng thuận", en: "Experts discuss the differences and re-estimate over multiple rounds to converge on consensus", ja: "専門家が差異を議論し、複数ラウンドで再見積もりして合意へ収束させる" },
      { vi: "Bắt buộc lấy con số cao nhất để dự phòng rủi ro", en: "Must take the highest number as a risk buffer", ja: "リスク緩衝として必ず最高値を取る" }
    ],
    answer: 2,
    exp: {
      vi: "Wideband Delphi là kỹ thuật đồng thuận nhóm: sau khi ước lượng độc lập, các chuyên gia thảo luận lý do khác biệt và lặp lại nhiều vòng cho tới khi hội tụ, không chỉ đơn thuần lấy trung bình.",
      en: "Wideband Delphi is a group-consensus technique: after independent estimates, experts discuss reasons for differences and iterate over rounds until they converge, not merely averaging.",
      ja: "ワイドバンド・デルファイはグループ合意の技法である。各自が独立に見積もった後、専門家が差異の理由を議論し、収束するまで複数ラウンド繰り返す。単なる平均ではない。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Kỹ thuật kiểm thử dựa trên trải nghiệm: phân biệt 「error guessing」 và 「exploratory testing」. Điểm khác biệt nào là ĐÚNG?",
      en: "Experience-based techniques: distinguish error guessing and exploratory testing. Which difference is correct?",
      ja: "経験ベースの技法: エラー推測と探索的テストを区別する。正しい違いはどれか。"
    },
    options: [
      { vi: "Error guessing tập trung dự đoán các lỗi cụ thể có thể có; exploratory testing đồng thời học, thiết kế và thực thi test trong các session có mục tiêu", en: "Error guessing focuses on predicting specific likely faults; exploratory testing simultaneously learns, designs and executes tests within goal-oriented sessions", ja: "エラー推測は起こりうる具体的な欠陥の予測に集中する。探索的テストは目標志向のセッション内で学習・設計・実行を同時に行う" },
      { vi: "Cả hai đều yêu cầu kịch bản test chi tiết được viết trước", en: "Both require detailed test scripts written in advance", ja: "両方とも事前に書かれた詳細なテストスクリプトが必要である" },
      { vi: "Exploratory testing không cần kiến thức về hệ thống", en: "Exploratory testing requires no knowledge of the system", ja: "探索的テストはシステムの知識を必要としない" },
      { vi: "Error guessing chỉ áp dụng cho kiểm thử phi chức năng", en: "Error guessing applies only to non-functional testing", ja: "エラー推測は非機能テストにのみ適用される" }
    ],
    answer: 0,
    exp: {
      vi: "Error guessing dựa vào kinh nghiệm để liệt kê các lỗi có thể có và thiết kế test nhắm vào chúng. Exploratory testing là quá trình học-thiết kế-thực thi đồng thời, thường theo session với charter/mục tiêu.",
      en: "Error guessing uses experience to list likely faults and design tests targeting them. Exploratory testing is a concurrent learn-design-execute process, usually in sessions with a charter/goal.",
      ja: "エラー推測は経験を用いて起こりうる欠陥を列挙し、それを狙ったテストを設計する。探索的テストは学習・設計・実行を同時に行う過程で、通常チャーターや目標を持つセッションで行う。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Một hệ thống thanh toán có yêu cầu phi chức năng: 95% giao dịch phải phản hồi dưới 2 giây khi có 1000 người dùng đồng thời. Đây là ví dụ về loại kiểm thử phi chức năng nào và cách phát biểu như vậy quan trọng vì sao?",
      en: "A payment system has a non-functional requirement: 95% of transactions must respond under 2 seconds with 1000 concurrent users. What non-functional test type is this and why is stating it that way important?",
      ja: "決済システムに非機能要件がある: 同時1000ユーザーで取引の95%が2秒未満で応答すること。これはどの非機能テスト種別の例で、そのような記述がなぜ重要か。"
    },
    options: [
      { vi: "Kiểm thử khả dụng; quan trọng vì mô tả giao diện đẹp", en: "Usability testing; important because it describes a nice interface", ja: "使用性テスト。美しいインターフェースを記述するため重要である" },
      { vi: "Kiểm thử bảo mật; quan trọng vì chống tấn công", en: "Security testing; important because it prevents attacks", ja: "セキュリティテスト。攻撃を防ぐため重要である" },
      { vi: "Kiểm thử tính khả chuyển; quan trọng vì chạy đa nền tảng", en: "Portability testing; important because it runs cross-platform", ja: "移植性テスト。複数プラットフォームで動くため重要である" },
      { vi: "Kiểm thử hiệu năng; phát biểu định lượng và có thể đo được giúp tiêu chí đạt/không đạt rõ ràng, kiểm chứng được", en: "Performance testing; a quantified, measurable statement makes pass/fail criteria clear and testable", ja: "性能テスト。定量的で測定可能な記述により合否基準が明確でテスト可能になる" }
    ],
    answer: 3,
    exp: {
      vi: "Thời gian phản hồi dưới tải đồng thời là đặc trưng của kiểm thử hiệu năng. Việc phát biểu định lượng (95%, 2 giây, 1000 người) làm yêu cầu trở nên có thể đo và kiểm chứng, tránh mơ hồ.",
      en: "Response time under concurrent load characterizes performance testing. A quantified statement (95%, 2 seconds, 1000 users) makes the requirement measurable and verifiable, avoiding ambiguity.",
      ja: "同時負荷下の応答時間は性能テストの特徴である。定量的な記述（95%、2秒、1000ユーザー）により要件は測定・検証可能となり、曖昧さを避けられる。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Đọc biểu đồ hội tụ lỗi: số lỗi mới tìm được mỗi tuần đang giảm dần và số lỗi đã đóng gần bằng số lỗi mở. Tuy nhiên trong 2 tuần cuối, số lỗi mới đột ngột tăng vọt. Diễn giải nào hợp lý nhất?",
      en: "Reading a defect convergence chart: newly found defects per week are declining and closed defects nearly equal opened. However, in the last 2 weeks new defects suddenly spike. What is the most reasonable interpretation?",
      ja: "欠陥収束グラフを読む: 週ごとの新規欠陥は減少し、クローズ済み欠陥がオープン数にほぼ等しい。しかし直近2週間で新規欠陥が急増した。最も妥当な解釈はどれか。"
    },
    options: [
      { vi: "Sản phẩm đã sẵn sàng phát hành ngay lập tức", en: "The product is ready for immediate release", ja: "製品は直ちにリリース可能である" },
      { vi: "Cần điều tra nguyên nhân: có thể do thay đổi mã lớn, vùng chức năng mới hoặc dữ liệu test mới, cho thấy chưa nên tuyên bố ổn định", en: "Investigate the cause: possibly a large code change, a new feature area or new test data, indicating it is premature to declare stability", ja: "原因を調査すべき: 大きなコード変更、新機能領域、新しいテストデータの可能性があり、安定と宣言するのは時期尚早であることを示す" },
      { vi: "Nên ngừng kiểm thử vì biểu đồ đang nhiễu", en: "Stop testing because the chart is noisy", ja: "グラフがノイズだらけなのでテストを中止すべき" },
      { vi: "Số lỗi tăng chứng tỏ đội test kém năng lực", en: "Rising defects prove the test team is incompetent", ja: "欠陥の増加はテストチームの無能を証明する" }
    ],
    answer: 1,
    exp: {
      vi: "Xu hướng hội tụ bị phá vỡ (spike lỗi mới) là tín hiệu cảnh báo cần điều tra nguyên nhân gốc trước khi ra quyết định phát hành; không nên vội kết luận sản phẩm ổn định.",
      en: "A broken convergence trend (a spike of new defects) is a warning signal requiring root-cause investigation before a release decision; do not hastily conclude the product is stable.",
      ja: "収束傾向の崩れ（新規欠陥の急増）は警告信号であり、リリース判断の前に根本原因を調査する必要がある。製品が安定していると早計に結論づけてはならない。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Kỹ thuật kiểm thử chuyển trạng thái (state transition). Một máy trạng thái có 4 trạng thái và 6 chuyển hợp lệ. Để đạt bao phủ 「0-switch」 (mọi chuyển đơn hợp lệ) cần tối thiểu bao nhiêu chuyển được thực thi?",
      en: "State transition testing. A state machine has 4 states and 6 valid transitions. To achieve 0-switch coverage (all single valid transitions), how many transitions must be exercised at minimum?",
      ja: "状態遷移テスト。ある状態機械は4状態と6つの有効な遷移を持つ。0スイッチ網羅（すべての単一有効遷移）を達成するには最低いくつの遷移を実行する必要があるか。"
    },
    options: [
      { vi: "4", en: "4", ja: "4" },
      { vi: "10", en: "10", ja: "10" },
      { vi: "6", en: "6", ja: "6" },
      { vi: "36", en: "36", ja: "36" }
    ],
    answer: 2,
    exp: {
      vi: "Bao phủ 0-switch (còn gọi bao phủ mọi chuyển) yêu cầu thực thi từng chuyển hợp lệ đúng một lần. Có 6 chuyển hợp lệ nên cần tối thiểu 6 chuyển.",
      en: "0-switch coverage (all-transitions coverage) requires exercising each valid transition once. There are 6 valid transitions, so a minimum of 6 transitions is required.",
      ja: "0スイッチ網羅（全遷移網羅）は各有効遷移を1回実行することを要する。有効遷移は6つあるため最低6つの遷移が必要である。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Trong một review chính thức (formal review), phân biệt vai trò 「moderator」 và 「scribe」. Phát biểu nào ĐÚNG?",
      en: "In a formal review, distinguish the roles of moderator and scribe. Which statement is correct?",
      ja: "公式レビューにおいて、モデレーターと書記（scribe）の役割を区別する。正しい記述はどれか。"
    },
    options: [
      { vi: "Moderator ghi lại các phát hiện, scribe điều phối cuộc họp", en: "The moderator records findings, the scribe facilitates the meeting", ja: "モデレーターが指摘を記録し、書記が会議を進行する" },
      { vi: "Cả hai vai trò đều do tác giả tài liệu đảm nhiệm", en: "Both roles are performed by the document author", ja: "両方の役割は文書の作成者が担う" },
      { vi: "Scribe là người quyết định tài liệu có được duyệt hay không", en: "The scribe decides whether the document is approved", ja: "書記が文書を承認するか否かを決定する" },
      { vi: "Moderator lãnh đạo và điều phối buổi review, đảm bảo diễn ra hiệu quả; scribe ghi lại các vấn đề/phát hiện được nêu", en: "The moderator leads and facilitates the review ensuring it runs effectively; the scribe records the issues/findings raised", ja: "モデレーターはレビューを主導・進行し効果的に進むよう保証する。書記は提起された問題・指摘を記録する" }
    ],
    answer: 3,
    exp: {
      vi: "Moderator (leader) điều phối buổi review, đảm bảo tuân thủ quy trình và hiệu quả. Scribe (recorder) ghi lại các phát hiện, quyết định và hành động. Đây là hai vai trò tách biệt.",
      en: "The moderator (leader) facilitates the review, ensuring process adherence and effectiveness. The scribe (recorder) documents findings, decisions and actions. These are two distinct roles.",
      ja: "モデレーター（リーダー）はレビューを進行し、プロセス遵守と有効性を保証する。書記（記録者）は指摘・決定・アクションを記録する。これらは別個の役割である。"
    }
  },
  {
    lvl: "istqb-advanced",
    q: {
      vi: "Phân biệt cặp dễ nhầm: 「load testing」 và 「stress testing」. Câu mô tả ĐÚNG sự khác nhau cốt lõi là gì?",
      en: "Distinguish an easily-confused pair: load testing and stress testing. Which statement correctly captures the core difference?",
      ja: "混同しやすい対を区別する: 負荷テスト（ロードテスト）とストレステスト。本質的な違いを正しく表す記述はどれか。"
    },
    options: [
      { vi: "Load testing kiểm tra hành vi dưới mức tải dự kiến/thực tế; stress testing đẩy hệ thống vượt giới hạn để tìm điểm gãy và cách phục hồi", en: "Load testing checks behavior under expected/realistic load; stress testing pushes the system beyond its limits to find the breaking point and recovery behavior", ja: "負荷テストは想定・現実的な負荷下での挙動を確認する。ストレステストは限界を超えて負荷をかけ、破綻点と回復挙動を見つける" },
      { vi: "Cả hai đều chỉ đo tính bảo mật của hệ thống", en: "Both only measure the system's security", ja: "両方ともシステムのセキュリティのみを測定する" },
      { vi: "Load testing luôn chạy thủ công, stress testing luôn tự động", en: "Load testing is always manual, stress testing is always automated", ja: "負荷テストは常に手動、ストレステストは常に自動である" },
      { vi: "Stress testing chỉ áp dụng cho ứng dụng di động", en: "Stress testing applies only to mobile applications", ja: "ストレステストはモバイルアプリにのみ適用される" }
    ],
    answer: 0,
    exp: {
      vi: "Load testing đánh giá hệ thống dưới mức tải kỳ vọng (ví dụ số người dùng đồng thời dự kiến). Stress testing cố tình vượt quá giới hạn để quan sát điểm gãy và khả năng phục hồi. Cả hai đều thuộc kiểm thử hiệu năng.",
      en: "Load testing evaluates the system under expected load (e.g. anticipated concurrent users). Stress testing deliberately exceeds limits to observe the breaking point and recovery. Both are performance testing subtypes.",
      ja: "負荷テストは想定負荷（例: 予想される同時ユーザー数）下でシステムを評価する。ストレステストは意図的に限界を超え、破綻点と回復力を観察する。両方とも性能テストの一種である。"
    }
  },

  // ========================= EXPERT (CTEL) x10 =========================
  {
    lvl: "istqb-expert",
    q: {
      vi: "Một tổ chức đánh giá mức trưởng thành quy trình test bằng TMMi và đang ở mức 2 (Managed). Ban lãnh đạo muốn thiết lập một tổ chức test tập trung và chương trình đào tạo test toàn công ty. Đây là các process area đặc trưng của mức TMMi nào?",
      en: "An organization assesses test process maturity with TMMi and is at level 2 (Managed). Leadership wants to establish a centralized test organization and a company-wide test training program. These are process areas characteristic of which TMMi level?",
      ja: "ある組織がTMMiでテストプロセス成熟度を評価し、レベル2（Managed）にある。経営陣は集中型テスト組織と全社的なテスト教育プログラムの確立を望む。これらはどのTMMiレベルに特徴的なプロセスエリアか。"
    },
    options: [
      { vi: "Mức 1 (Initial)", en: "Level 1 (Initial)", ja: "レベル1（Initial）" },
      { vi: "Mức 4 (Measured)", en: "Level 4 (Measured)", ja: "レベル4（Measured）" },
      { vi: "Mức 3 (Defined)", en: "Level 3 (Defined)", ja: "レベル3（Defined）" },
      { vi: "Mức 5 (Optimization)", en: "Level 5 (Optimization)", ja: "レベル5（Optimization）" }
    ],
    answer: 2,
    exp: {
      vi: "TMMi mức 3 (Defined) gồm các process area như Test Organization và Test Training Program, chuẩn hóa quy trình test toàn tổ chức. Mức 4 tập trung đo lường, mức 5 tối ưu hóa.",
      en: "TMMi level 3 (Defined) includes process areas such as Test Organization and Test Training Program, standardizing test processes across the organization. Level 4 focuses on measurement, level 5 on optimization.",
      ja: "TMMiレベル3（Defined）にはテスト組織やテスト教育プログラムといったプロセスエリアが含まれ、組織全体でテストプロセスを標準化する。レベル4は測定、レベル5は最適化に焦点を当てる。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Là Test Manager triển khai chương trình cải tiến test (test process improvement), bạn phải chọn giữa mô hình dựa trên chuẩn (như TMMi) và mô hình phân tích (analytical, dựa trên dữ liệu nguyên nhân gốc). Tình huống nào phù hợp nhất cho cách tiếp cận analytical?",
      en: "As a Test Manager driving test process improvement, you choose between a model-based approach (like TMMi) and an analytical approach (root-cause data-driven). Which situation best fits the analytical approach?",
      ja: "テストプロセス改善を推進するテストマネージャとして、モデルベース（TMMiなど）と分析的（根本原因データ駆動）のアプローチを選ぶ。分析的アプローチが最も適する状況はどれか。"
    },
    options: [
      { vi: "Khi cần một lộ trình trưởng thành chuẩn hóa để so sánh với ngành", en: "When a standardized maturity roadmap for industry benchmarking is needed", ja: "業界比較のための標準化された成熟度ロードマップが必要なとき" },
      { vi: "Khi tổ chức muốn giải quyết các vấn đề cụ thể đã quan sát được thông qua phân tích nguyên nhân gốc của lỗi và sự cố thực tế", en: "When the organization wants to address specific observed problems through root-cause analysis of actual defects and incidents", ja: "組織が実際の欠陥やインシデントの根本原因分析を通じて、観察された具体的な問題に対処したいとき" },
      { vi: "Khi ban lãnh đạo yêu cầu chứng nhận cấp độ chính thức", en: "When management requires a formal level certification", ja: "経営陣が正式なレベル認証を求めるとき" },
      { vi: "Khi không có bất kỳ dữ liệu đo lường nào về quy trình", en: "When there is no measurement data about the process at all", ja: "プロセスに関する測定データが一切ないとき" }
    ],
    answer: 1,
    exp: {
      vi: "Cách tiếp cận analytical (như phân tích nguyên nhân gốc, phân tích dữ liệu) phù hợp khi muốn cải tiến hướng đến các vấn đề cụ thể đã đo được, thay vì đi theo lộ trình chuẩn hóa của mô hình.",
      en: "The analytical approach (root-cause analysis, data analysis) fits when improvement should target specific measured problems, rather than following a model's standardized roadmap.",
      ja: "分析的アプローチ（根本原因分析やデータ分析）は、モデルの標準ロードマップに従うのではなく、測定された具体的な問題を対象に改善したい場合に適する。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Phân biệt hai chỉ số quản lý test dễ nhầm: 「Defect Detection Percentage (DDP)」 xét trên một giai đoạn được tính thế nào?",
      en: "Distinguish easily-confused test management metrics: how is the Defect Detection Percentage (DDP) for a phase computed?",
      ja: "混同しやすいテスト管理指標を区別する: あるフェーズの欠陥検出率（DDP）はどのように算出するか。"
    },
    options: [
      { vi: "Số lỗi tìm được trong giai đoạn / tổng số test case × 100", en: "Defects found in phase / total test cases × 100", ja: "フェーズで発見した欠陥 / 全テストケース数 × 100" },
      { vi: "Tổng số lỗi / số ngày kiểm thử", en: "Total defects / number of testing days", ja: "総欠陥数 / テスト日数" },
      { vi: "Số lỗi Critical / tổng số lỗi × 100", en: "Critical defects / total defects × 100", ja: "Critical欠陥 / 総欠陥 × 100" },
      { vi: "Số lỗi tìm được trong giai đoạn / (số lỗi tìm trong giai đoạn + số lỗi thoát ra và tìm được sau đó) × 100", en: "Defects found in phase / (defects found in phase + defects that escaped and were found later) × 100", ja: "フェーズで発見した欠陥 /（フェーズで発見した欠陥 + すり抜けて後で発見された欠陥）× 100" }
    ],
    answer: 3,
    exp: {
      vi: "DDP = lỗi phát hiện trong giai đoạn / (lỗi phát hiện trong giai đoạn + lỗi thoát ra được tìm thấy về sau, ví dụ ở production) × 100. Đo hiệu quả một giai đoạn trong việc chặn lỗi thoát ra.",
      en: "DDP = defects detected in a phase / (defects detected in the phase + escaped defects found later, e.g. in production) × 100. It measures how effectively a phase catches defects before they escape.",
      ja: "DDP = フェーズで検出した欠陥 /（フェーズで検出した欠陥 + すり抜けて後で（例えば本番で）発見された欠陥）× 100。フェーズがすり抜け前に欠陥を捕捉する有効性を測る。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Bạn xây dựng một chiến lược test (test strategy) cấp tổ chức. Ban lãnh đạo muốn kết hợp: kiểm thử theo tiêu chuẩn ngành ô tô bắt buộc, cộng với kiểm thử hướng rủi ro cho tính năng mới. Đây là ví dụ của loại chiến lược nào?",
      en: "You build an organization-level test strategy. Management wants to combine mandatory automotive-standard-compliant testing plus risk-driven testing for new features. This is an example of which strategy type?",
      ja: "組織レベルのテスト戦略を構築する。経営陣は、自動車業界標準への準拠が必須のテストと、新機能に対するリスク駆動のテストを組み合わせたい。これはどの戦略タイプの例か。"
    },
    options: [
      { vi: "Chiến lược hỗn hợp (blended) kết hợp cách tiếp cận tuân thủ tiêu chuẩn và hướng rủi ro", en: "A blended strategy combining a standard-compliant approach and a risk-based approach", ja: "標準準拠アプローチとリスクベースアプローチを組み合わせたブレンド（混合）戦略" },
      { vi: "Chiến lược thuần phản ứng (reactive)", en: "A purely reactive strategy", ja: "純粋にリアクティブな戦略" },
      { vi: "Chiến lược chỉ dựa trên mô hình (model-based) đơn thuần", en: "A purely model-based strategy only", ja: "純粋にモデルベースのみの戦略" },
      { vi: "Chiến lược ngẫu hứng không có kế hoạch", en: "An improvised strategy with no plan", ja: "計画のない即興的な戦略" }
    ],
    answer: 0,
    exp: {
      vi: "Thực tế doanh nghiệp thường kết hợp nhiều loại chiến lược: tuân thủ tiêu chuẩn (regulatory/standard-compliant) cho phần bắt buộc và hướng rủi ro (risk-based) cho phần biến động. Đó là chiến lược hỗn hợp.",
      en: "Enterprises often blend strategy types: standard-compliant for mandated parts and risk-based for volatile parts. That is a blended strategy.",
      ja: "企業では複数の戦略タイプを組み合わせることが多い。義務的な部分には標準準拠、変動する部分にはリスクベースを用いる。これがブレンド戦略である。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Tính ROI của tự động hóa test: chi phí thiết lập là 100.000 USD, tiết kiệm mỗi lần chạy hồi quy là 5.000 USD so với thủ công. Bỏ qua chi phí bảo trì, cần chạy hồi quy tối thiểu bao nhiêu lần để hoà vốn (break-even)?",
      en: "Computing test automation ROI: setup cost is USD 100,000, each regression run saves USD 5,000 vs manual. Ignoring maintenance cost, how many regression runs are needed at minimum to break even?",
      ja: "テスト自動化のROIを計算する: 構築コストは10万ドル、リグレッション実行1回あたり手動比で5,000ドル節約。保守コストを無視すると、損益分岐に達するには最低何回のリグレッション実行が必要か。"
    },
    options: [
      { vi: "10 lần", en: "10 runs", ja: "10回" },
      { vi: "20 lần", en: "20 runs", ja: "20回" },
      { vi: "50 lần", en: "50 runs", ja: "50回" },
      { vi: "100 lần", en: "100 runs", ja: "100回" }
    ],
    answer: 1,
    exp: {
      vi: "Điểm hoà vốn = chi phí thiết lập / tiết kiệm mỗi lần = 100.000 / 5.000 = 20 lần. Từ lần thứ 21 tự động hóa bắt đầu có lợi nhuận ròng (khi bỏ qua bảo trì).",
      en: "Break-even = setup cost / savings per run = 100,000 / 5,000 = 20 runs. From the 21st run automation yields net profit (ignoring maintenance).",
      ja: "損益分岐点 = 構築コスト / 1回あたりの節約 = 100,000 / 5,000 = 20回。21回目から自動化は正味の利益を生む（保守を無視した場合）。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Với vai trò lãnh đạo test, bạn cần cải thiện năng lực đội. Phân biệt 「skills assessment」 và 「training needs analysis」. Trình tự và mối quan hệ đúng giữa hai hoạt động là gì?",
      en: "As a test leader improving team capability, distinguish skills assessment and training needs analysis. What is the correct sequence and relationship between the two?",
      ja: "テストリーダーとしてチーム能力を高めるにあたり、スキル評価（skills assessment）と教育ニーズ分析（training needs analysis）を区別する。両者の正しい順序と関係は何か。"
    },
    options: [
      { vi: "Đào tạo trước, đánh giá kỹ năng sau cùng, không liên quan nhau", en: "Train first, assess skills last, and the two are unrelated", ja: "先に教育し、最後にスキル評価する。両者は無関係" },
      { vi: "Cả hai là cùng một hoạt động, chỉ khác tên gọi", en: "Both are the same activity, only differently named", ja: "両者は名称が違うだけで同一の活動である" },
      { vi: "Đánh giá kỹ năng hiện có để xác định khoảng cách so với kỹ năng cần thiết; khoảng cách đó là đầu vào cho phân tích nhu cầu đào tạo", en: "Assess current skills to identify the gap versus required skills; that gap feeds the training needs analysis", ja: "現有スキルを評価して必要スキルとのギャップを特定し、そのギャップが教育ニーズ分析の入力となる" },
      { vi: "Phân tích nhu cầu đào tạo phải hoàn tất trước khi biết kỹ năng hiện có", en: "Training needs analysis must be completed before knowing current skills", ja: "教育ニーズ分析は現有スキルを知る前に完了しなければならない" }
    ],
    answer: 2,
    exp: {
      vi: "Skills assessment xác định năng lực hiện có; so với năng lực yêu cầu ta có khoảng cách (gap). Khoảng cách này là đầu vào để training needs analysis lập kế hoạch đào tạo phù hợp.",
      en: "Skills assessment establishes current competencies; compared to required competencies it yields a gap. That gap is the input to training needs analysis, which plans the appropriate training.",
      ja: "スキル評価は現有の能力を明らかにする。必要な能力と比較するとギャップが得られる。このギャップが教育ニーズ分析の入力となり、適切な教育を計画する。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Đọc bảng đo lường: giai đoạn kiểm thử hệ thống tìm 180 lỗi, sau khi phát hành production tìm thêm 20 lỗi thuộc phạm vi lẽ ra phải bắt được. DDP của giai đoạn kiểm thử hệ thống là bao nhiêu?",
      en: "Reading a metrics table: system testing found 180 defects; after release, 20 more defects within its intended scope were found in production. What is the DDP of system testing?",
      ja: "測定表を読む: システムテストで180件の欠陥を発見し、リリース後、本来その範囲で捕捉すべき欠陥が本番で20件追加発見された。システムテストのDDPはいくつか。"
    },
    options: [
      { vi: "90%", en: "90%", ja: "90%" },
      { vi: "80%", en: "80%", ja: "80%" },
      { vi: "10%", en: "10%", ja: "10%" },
      { vi: "111%", en: "111%", ja: "111%" }
    ],
    answer: 0,
    exp: {
      vi: "DDP = 180 / (180 + 20) × 100 = 180/200 × 100 = 90%. Nghĩa là giai đoạn này bắt được 90% lỗi thuộc phạm vi của nó trước khi thoát ra production.",
      en: "DDP = 180 / (180 + 20) × 100 = 180/200 × 100 = 90%. That means this phase caught 90% of the defects in its scope before they escaped to production.",
      ja: "DDP = 180 /（180 + 20）× 100 = 180/200 × 100 = 90%。つまりこのフェーズは範囲内の欠陥の90%を本番へすり抜ける前に捕捉した。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Trong triển khai cải tiến quy trình theo IDEAL (Initiating, Diagnosing, Establishing, Acting, Learning), tổ chức vừa hoàn thành đánh giá hiện trạng và xác định điểm mạnh/yếu. Bước tiếp theo theo IDEAL là gì?",
      en: "In IDEAL-based process improvement (Initiating, Diagnosing, Establishing, Acting, Learning), an organization just finished assessing the current state and identifying strengths/weaknesses. What is the next IDEAL step?",
      ja: "IDEAL（Initiating, Diagnosing, Establishing, Acting, Learning）に基づくプロセス改善で、組織は現状評価と強み・弱みの特定を終えたばかりである。IDEALにおける次のステップは何か。"
    },
    options: [
      { vi: "Initiating: khởi động chương trình", en: "Initiating: launching the program", ja: "Initiating: プログラムの立ち上げ" },
      { vi: "Learning: rút kinh nghiệm cho chu kỳ sau", en: "Learning: capturing lessons for the next cycle", ja: "Learning: 次サイクルへの教訓を得る" },
      { vi: "Diagnosing: lặp lại đánh giá hiện trạng", en: "Diagnosing: repeating the current-state assessment", ja: "Diagnosing: 現状評価を繰り返す" },
      { vi: "Establishing: lập kế hoạch hành động và ưu tiên các cải tiến dựa trên chẩn đoán", en: "Establishing: planning actions and prioritizing improvements based on the diagnosis", ja: "Establishing: 診断に基づき行動を計画し改善の優先順位を付ける" }
    ],
    answer: 3,
    exp: {
      vi: "IDEAL theo thứ tự: Initiating → Diagnosing (đánh giá hiện trạng) → Establishing (lập kế hoạch, ưu tiên) → Acting (thực thi) → Learning. Sau Diagnosing là Establishing.",
      en: "IDEAL order: Initiating → Diagnosing (assess current state) → Establishing (plan, prioritize) → Acting (implement) → Learning. After Diagnosing comes Establishing.",
      ja: "IDEALの順序: Initiating → Diagnosing（現状評価）→ Establishing（計画・優先順位付け）→ Acting（実施）→ Learning。Diagnosingの次はEstablishingである。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Phân biệt cặp dễ nhầm ở cấp quản lý: 「test policy」 và 「test strategy」. Câu nào mô tả ĐÚNG sự khác nhau?",
      en: "Distinguish an easily-confused management-level pair: test policy and test strategy. Which statement correctly describes the difference?",
      ja: "管理レベルで混同しやすい対を区別する: テストポリシーとテスト戦略。違いを正しく述べているのはどれか。"
    },
    options: [
      { vi: "Test policy là kịch bản test chi tiết cho một tính năng, test strategy là danh sách bug", en: "A test policy is a detailed test script for one feature, a test strategy is a bug list", ja: "テストポリシーは一機能の詳細テストスクリプト、テスト戦略はバグ一覧である" },
      { vi: "Test policy là tài liệu cấp cao nêu mục tiêu, nguyên tắc và giá trị của kiểm thử trong tổ chức; test strategy mô tả cách tiếp cận/phương pháp chung để đạt các mục tiêu đó", en: "A test policy is a high-level document stating the objectives, principles and value of testing in the organization; a test strategy describes the general approach/methods to achieve those objectives", ja: "テストポリシーは組織におけるテストの目的・原則・価値を述べる上位文書である。テスト戦略はそれらの目的を達成する一般的なアプローチ・手法を記述する" },
      { vi: "Hai tài liệu này giống hệt nhau, chỉ tên khác nhau", en: "The two documents are identical, only the names differ", ja: "この二つの文書は同一で、名前が違うだけである" },
      { vi: "Test strategy do lập trình viên viết, test policy do người dùng cuối viết", en: "The test strategy is written by developers, the test policy by end users", ja: "テスト戦略は開発者が、テストポリシーはエンドユーザーが書く" }
    ],
    answer: 1,
    exp: {
      vi: "Test policy là tuyên bố cấp cao về mục tiêu, nguyên tắc và giá trị của kiểm thử trong tổ chức. Test strategy cụ thể hơn một bậc: mô tả phương pháp/cách tiếp cận chung (mức test, kỹ thuật, tiêu chí) để hiện thực hóa policy đó.",
      en: "A test policy is a high-level statement of testing objectives, principles and value in the organization. A test strategy is one level more concrete: it describes the general methods/approach (levels, techniques, criteria) to realize that policy.",
      ja: "テストポリシーは組織におけるテストの目的・原則・価値を述べる上位の声明である。テスト戦略はそれより一段具体的で、そのポリシーを実現する一般的な手法・アプローチ（テストレベル、技法、基準）を記述する。"
    }
  },
  {
    lvl: "istqb-expert",
    q: {
      vi: "Là lãnh đạo test, bạn trình bày trước ban giám đốc để xin ngân sách cho công cụ test. Kỹ năng lãnh đạo và giao tiếp nào là quan trọng nhất để thuyết phục hiệu quả trong tình huống này?",
      en: "As a test leader presenting to the board to secure budget for a test tool, which leadership and communication skill is most important to persuade effectively in this situation?",
      ja: "テストリーダーとして、テストツールの予算獲得のため取締役会でプレゼンする。この状況で効果的に説得するために最も重要なリーダーシップ・コミュニケーション能力はどれか。"
    },
    options: [
      { vi: "Trình bày chi tiết kỹ thuật sâu về cú pháp scripting của công cụ", en: "Present deep technical detail about the tool's scripting syntax", ja: "ツールのスクリプト構文に関する詳細な技術情報を提示する" },
      { vi: "Liệt kê toàn bộ danh sách bug đã tìm được năm ngoái", en: "List every bug found last year", ja: "昨年見つけた全バグを列挙する" },
      { vi: "Diễn đạt giá trị kinh doanh bằng ngôn ngữ của bên liên quan: ROI, giảm rủi ro, tác động tới thời gian ra thị trường", en: "Frame the business value in the stakeholders' language: ROI, risk reduction, impact on time to market", ja: "ビジネス価値を関係者の言葉で伝える: ROI、リスク低減、市場投入時間への影響" },
      { vi: "Nhấn mạnh rằng đội test đang làm việc rất vất vả", en: "Emphasize how hard the test team is working", ja: "テストチームがいかに懸命に働いているかを強調する" }
    ],
    answer: 2,
    exp: {
      vi: "Với ban giám đốc, thông điệp phải chuyển sang ngôn ngữ kinh doanh: ROI, giảm rủi ro, ảnh hưởng tới thời gian ra thị trường và chi phí. Kỹ năng điều chỉnh thông điệp theo đối tượng là cốt lõi của lãnh đạo test.",
      en: "For the board, the message must be translated into business language: ROI, risk reduction, impact on time to market and cost. Tailoring the message to the audience is core to test leadership.",
      ja: "取締役会に対しては、メッセージをビジネスの言葉に翻訳する必要がある: ROI、リスク低減、市場投入時間とコストへの影響。聴衆に合わせてメッセージを調整する能力はテストリーダーシップの核心である。"
    }
  }
];
