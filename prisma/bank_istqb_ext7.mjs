// ============================================================================
// ISTQB EXT7 — Bổ sung đợt 7: 6 câu / cấp độ = 18 câu. Mỗi phần tử gắn sẵn `lvl`.
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// Đủ 3 ngôn ngữ vi/en/ja (tiếng Nhật dịch thật, katakana cho thuật ngữ).
// ============================================================================
export const DATA = [
  // ===================== istqb-foundation (6) — answers: 0,1,2,3,0,1 =====================
  { lvl: "istqb-foundation",
    q: { vi: "Theo ISTQB, bảy nguyên tắc kiểm thử khẳng định điều gì về 「kiểm thử toàn diện」 (exhaustive testing)?",
        en: "Per ISTQB's seven testing principles, what do they state about exhaustive testing?",
        ja: "ISTQBの7つのテスト原則によれば、「全数テスト(exhaustive testing)」について何と述べていますか。" },
    options: [
      { vi: "Kiểm thử toàn diện là bất khả thi (trừ trường hợp tầm thường) — cần dùng phân tích rủi ro và độ ưu tiên", en: "Exhaustive testing is impossible (except trivial cases) — use risk analysis and priorities", ja: "全数テストは(自明な場合を除き)不可能であり、リスク分析と優先度付けを用いる必要がある" },
      { vi: "Luôn phải kiểm thử mọi tổ hợp đầu vào để đạt chất lượng", en: "You must always test every input combination for quality", ja: "品質のため常に全ての入力の組み合わせをテストしなければならない" },
      { vi: "Kiểm thử chứng minh được phần mềm không còn lỗi", en: "Testing proves software has no defects", ja: "テストはソフトウェアに欠陥がないことを証明できる" },
      { vi: "Chỉ cần kiểm thử một lần là đủ mãi mãi", en: "Testing once is enough forever", ja: "一度テストすれば永遠に十分である" }
    ],
    answer: 0,
    exp: { vi: "Nguyên tắc 「kiểm thử toàn diện là bất khả thi」: với hệ thống thực, số tổ hợp đầu vào/điều kiện quá lớn để thử hết. Thay vào đó, dùng phân tích rủi ro và độ ưu tiên để tập trung nỗ lực vào vùng quan trọng. Kiểm thử chỉ cho thấy sự hiện diện của lỗi, không chứng minh vắng mặt lỗi.", en: "The principle 'exhaustive testing is impossible': for real systems the number of input/condition combinations is far too large to try all. Instead use risk analysis and priorities to focus effort. Testing shows the presence of defects, not their absence.", ja: "「全数テストは不可能」という原則: 実システムでは入力/条件の組み合わせが膨大すぎて全て試せない。代わりにリスク分析と優先度付けで重要領域に注力する。テストは欠陥の存在を示すが、不在は証明できない。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Kỹ thuật 「phân tích giá trị biên」 (boundary value analysis) dựa trên quan sát nào?",
        en: "On what observation is boundary value analysis based?",
        ja: "「境界値分析(boundary value analysis)」はどんな観察に基づいていますか。" },
    options: [
      { vi: "Lỗi phân bố ngẫu nhiên đều khắp miền giá trị", en: "Defects are spread randomly and evenly across the value range", ja: "欠陥は値の範囲全体にランダムかつ均等に分布する" },
      { vi: "Lỗi thường xuất hiện ở ranh giới giữa các phân vùng (min, max, ngay trên/dưới biên) hơn là ở giữa vùng", en: "Defects tend to occur at partition boundaries (min, max, just above/below) more than in the middle", ja: "欠陥は区間の中央よりも境界(最小・最大・境界の直上/直下)で発生しやすい" },
      { vi: "Chỉ cần test giá trị chính giữa mỗi phân vùng", en: "You only need to test the exact middle of each partition", ja: "各区間のちょうど中央の値だけをテストすればよい" },
      { vi: "Ranh giới không bao giờ chứa lỗi", en: "Boundaries never contain defects", ja: "境界には決して欠陥は含まれない" }
    ],
    answer: 1,
    exp: { vi: "Kinh nghiệm cho thấy lỗi hay nằm ở biên của phân vùng tương đương (do so sánh <, <=, off-by-one). Vì vậy BVA chọn các giá trị ngay tại và sát biên (min, min−1, min+1, max, max−1, max+1) để bắt lỗi hiệu quả. Thường dùng cùng phân vùng tương đương.", en: "Experience shows defects cluster at the edges of equivalence partitions (due to <, <=, off-by-one errors). So BVA picks values at and just around boundaries (min, min−1, min+1, max, max−1, max+1) to catch them efficiently. It's used with equivalence partitioning.", ja: "経験上、欠陥は同値区間の端(<、<=、オフバイワン誤り)に集中する。そのためBVAは境界上とその近傍の値(min、min−1、min+1、max、max−1、max+1)を選び効率よく検出する。同値分割と併用される。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Kiểm thử tĩnh (static testing) khác kiểm thử động (dynamic testing) ở điểm cốt lõi nào?",
        en: "What is the core difference between static and dynamic testing?",
        ja: "静的テストと動的テストの核心的な違いは何ですか。" },
    options: [
      { vi: "Kiểm thử tĩnh chỉ chạy vào ban ngày", en: "Static testing only runs during the day", ja: "静的テストは日中のみ実行する" },
      { vi: "Kiểm thử động không cần máy tính", en: "Dynamic testing needs no computer", ja: "動的テストはコンピュータを必要としない" },
      { vi: "Kiểm thử tĩnh xem xét sản phẩm (mã, tài liệu) mà KHÔNG thực thi; kiểm thử động thực thi phần mềm với dữ liệu đầu vào", en: "Static testing examines artifacts (code, docs) WITHOUT executing; dynamic testing runs the software with input data", ja: "静的テストは成果物(コード・文書)を実行せずに調べ、動的テストは入力データでソフトウェアを実行する" },
      { vi: "Cả hai giống hệt nhau", en: "They are exactly the same", ja: "両者は完全に同じである" }
    ],
    answer: 2,
    exp: { vi: "Kiểm thử tĩnh (review, phân tích tĩnh) đánh giá tài liệu/mã mà không chạy — bắt lỗi sớm, rẻ. Kiểm thử động chạy phần mềm với đầu vào để quan sát hành vi thực. Hai loại bổ trợ nhau: tĩnh tìm lỗi ở sản phẩm trung gian, động tìm lỗi khi hệ thống hoạt động.", en: "Static testing (reviews, static analysis) evaluates docs/code without running — catching defects early and cheaply. Dynamic testing runs the software with inputs to observe real behaviour. They complement each other: static finds defects in work products, dynamic finds them in operation.", ja: "静的テスト(レビュー・静的解析)は実行せずに文書/コードを評価し、早期かつ安価に欠陥を発見する。動的テストは入力でソフトを実行し実際の振る舞いを観察する。両者は補完的で、静的は中間成果物の、動的は稼働時の欠陥を見つける。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Trong mô hình chữ V (V-model), mức kiểm thử nào tương ứng với đặc tả yêu cầu (business/requirements)?",
        en: "In the V-model, which test level corresponds to business/requirements specification?",
        ja: "V字モデルにおいて、業務/要件仕様に対応するテストレベルはどれですか。" },
    options: [
      { vi: "Kiểm thử đơn vị (unit/component testing)", en: "Unit/component testing", ja: "ユニット/コンポーネントテスト" },
      { vi: "Kiểm thử tích hợp (integration testing)", en: "Integration testing", ja: "統合テスト" },
      { vi: "Kiểm thử hệ thống (system testing)", en: "System testing", ja: "システムテスト" },
      { vi: "Kiểm thử chấp nhận (acceptance testing)", en: "Acceptance testing", ja: "受け入れテスト" }
    ],
    answer: 3,
    exp: { vi: "Mô hình chữ V ghép mỗi mức phát triển với một mức kiểm thử: yêu cầu nghiệp vụ ↔ kiểm thử chấp nhận; đặc tả hệ thống ↔ kiểm thử hệ thống; thiết kế kiến trúc ↔ tích hợp; thiết kế chi tiết/mã ↔ đơn vị. Acceptance test xác nhận hệ thống đáp ứng nhu cầu và yêu cầu nghiệp vụ.", en: "The V-model pairs each development level with a test level: business requirements ↔ acceptance testing; system spec ↔ system testing; architectural design ↔ integration; detailed design/code ↔ unit. Acceptance testing validates the system meets business needs and requirements.", ja: "V字モデルは各開発レベルをテストレベルと対応させる: 業務要件↔受け入れテスト、システム仕様↔システムテスト、アーキテクチャ設計↔統合、詳細設計/コード↔ユニット。受け入れテストはシステムが業務ニーズと要件を満たすことを確認する。" } },

  { lvl: "istqb-foundation",
    q: { vi: "「Nghịch lý thuốc trừ sâu」 (pesticide paradox) trong kiểm thử nói điều gì?",
        en: "What does the 'pesticide paradox' in testing state?",
        ja: "テストにおける「殺虫剤のパラドックス(pesticide paradox)」は何を述べていますか。" },
    options: [
      { vi: "Chạy đi chạy lại cùng bộ test sẽ dần không tìm thấy lỗi mới — cần rà soát và làm mới ca kiểm thử", en: "Rerunning the same tests will eventually stop finding new defects — test cases must be reviewed and refreshed", ja: "同じテストを繰り返すとやがて新しい欠陥を見つけられなくなる—テストケースの見直しと更新が必要" },
      { vi: "Càng nhiều test thì càng nhiều lỗi được tạo ra", en: "More tests create more defects", ja: "テストが多いほど欠陥が生まれる" },
      { vi: "Thuốc trừ sâu diệt được mọi loại lỗi phần mềm", en: "Pesticide can kill any kind of software bug", ja: "殺虫剤はあらゆるソフトのバグを退治できる" },
      { vi: "Ca kiểm thử cũ luôn hiệu quả hơn ca mới", en: "Old test cases are always more effective than new ones", ja: "古いテストケースは常に新しいものより有効である" }
    ],
    answer: 0,
    exp: { vi: "Nghịch lý thuốc trừ sâu: nếu lặp lại đúng các ca kiểm thử cũ, chúng sẽ hết khả năng phát hiện lỗi mới (giống sâu kháng thuốc). Giải pháp: định kỳ rà soát, cập nhật và bổ sung ca kiểm thử mới, đa dạng kỹ thuật để chạm tới vùng chưa được kiểm.", en: "The pesticide paradox: repeating the same test cases eventually stops finding new defects (like pests growing resistant). The fix: periodically review, update and add new test cases and vary techniques to reach untested areas.", ja: "殺虫剤のパラドックス: 同じテストケースを繰り返すとやがて新しい欠陥を見つけられなくなる(害虫が耐性を持つように)。対策は、テストケースを定期的に見直し・更新・追加し、技法を多様化して未検証領域に到達すること。" } },

  { lvl: "istqb-foundation",
    q: { vi: "Chi phí sửa một khiếm khuyết thay đổi thế nào theo thời điểm phát hiện trong vòng đời?",
        en: "How does the cost to fix a defect change with when it's found in the lifecycle?",
        ja: "欠陥の修正コストは、ライフサイクルのどの時点で発見されたかによってどう変化しますか。" },
    options: [
      { vi: "Không đổi, luôn như nhau ở mọi giai đoạn", en: "It stays the same at every stage", ja: "どの段階でも変わらず一定である" },
      { vi: "Nói chung TĂNG mạnh nếu phát hiện muộn (yêu cầu → thiết kế → mã → kiểm thử → vận hành) — nên phát hiện & sửa càng sớm càng rẻ", en: "It generally rises sharply the later it's found (requirements → design → code → test → operation) — finding & fixing early is cheaper", ja: "一般に発見が遅いほど大きく増加する(要件→設計→コード→テスト→運用)—早く発見・修正するほど安い" },
      { vi: "Luôn rẻ nhất khi phát hiện ở môi trường production", en: "It's always cheapest when found in production", ja: "本番環境で発見したときが常に最も安い" },
      { vi: "Chỉ phụ thuộc kích thước đội, không liên quan thời điểm", en: "It depends only on team size, not timing", ja: "チームの規模のみに依存し、時点とは無関係である" }
    ],
    answer: 1,
    exp: { vi: "Nguyên tắc 「shift-left」: khiếm khuyết phát hiện càng muộn càng đắt để sửa, vì phải sửa lan nhiều tầng (mã, tài liệu, dữ liệu) và có thể đã ảnh hưởng người dùng. Kiểm thử tĩnh sớm (review yêu cầu/thiết kế) giúp bắt lỗi khi còn rẻ.", en: "The 'shift-left' principle: the later a defect is found, the costlier to fix, because the fix ripples across layers (code, docs, data) and may already affect users. Early static testing (requirement/design reviews) catches defects while cheap.", ja: "「シフトレフト」の原則: 欠陥は発見が遅いほど修正コストが高い。修正が多層(コード・文書・データ)に波及し、既に利用者に影響している場合もあるため。早期の静的テスト(要件/設計レビュー)は安価なうちに欠陥を捕らえる。" } },

  // ===================== istqb-advanced (6) — answers: 2,3,0,1,2,3 =====================
  { lvl: "istqb-advanced",
    q: { vi: "Kỹ thuật 「kiểm thử cặp đôi」 (pairwise / all-pairs testing) giải quyết vấn đề gì?",
        en: "What problem does pairwise (all-pairs) testing solve?",
        ja: "「ペアワイズ(全ペア)テスト」はどんな問題を解決しますか。" },
    options: [
      { vi: "Tăng số ca test lên tối đa để phủ mọi tổ hợp", en: "Maximise the number of cases to cover every combination", ja: "全組み合わせを網羅するためケース数を最大化する" },
      { vi: "Loại bỏ hoàn toàn nhu cầu thiết kế ca test", en: "Remove the need to design test cases at all", ja: "テストケース設計の必要を完全になくす" },
      { vi: "Giảm bùng nổ tổ hợp: chọn tập ca test nhỏ nhưng phủ mọi CẶP giá trị của các tham số — vì nhiều lỗi do tương tác giữa 2 yếu tố", en: "Curb combinatorial explosion: pick a small set covering every PAIR of parameter values — since many defects come from two-factor interactions", ja: "組み合わせ爆発を抑える: 各パラメータ値の全ての「ペア」を網羅する小さなケース集合を選ぶ—多くの欠陥は2要素間の相互作用に起因するため" },
      { vi: "Chỉ áp dụng cho kiểm thử hiệu năng", en: "It applies only to performance testing", ja: "性能テストにのみ適用される" }
    ],
    answer: 2,
    exp: { vi: "Khi có nhiều tham số, mỗi tham số nhiều giá trị, thử mọi tổ hợp là bất khả thi. Nghiên cứu cho thấy phần lớn lỗi do tương tác của 2 tham số. Pairwise chọn tập nhỏ đảm bảo mọi cặp giá trị đều xuất hiện ít nhất một lần — giảm mạnh số ca mà vẫn phủ tương tác đôi.", en: "With many parameters each having several values, testing all combinations is infeasible. Research shows most defects arise from two-parameter interactions. Pairwise selects a small set ensuring every value pair appears at least once — greatly cutting cases while covering two-way interactions.", ja: "多数のパラメータがそれぞれ複数の値を持つ場合、全組み合わせのテストは非現実的。研究では大半の欠陥は2パラメータの相互作用に起因する。ペアワイズは全ての値ペアが少なくとも一度現れる小さな集合を選び、2要素の相互作用を網羅しつつケース数を大幅に削減する。" } },

  { lvl: "istqb-advanced",
    q: { vi: "「Độ phủ nhánh」 (branch/decision coverage) yêu cầu điều gì mạnh hơn 「độ phủ câu lệnh」 (statement coverage)?",
        en: "What does branch/decision coverage require beyond statement coverage?",
        ja: "「分岐/判定カバレッジ」は「命令カバレッジ」に加えて何を要求しますか。" },
    options: [
      { vi: "Mỗi câu lệnh chạy đúng một lần, không hơn", en: "Each statement runs exactly once, no more", ja: "各命令をちょうど一度だけ実行する" },
      { vi: "Mọi kết quả TRUE và FALSE của mỗi điểm quyết định đều được thực thi ít nhất một lần", en: "Every TRUE and FALSE outcome of each decision is executed at least once", ja: "各判定のTRUEとFALSEの両方の結果を少なくとも一度実行する" },
      { vi: "Chỉ cần chạy nhánh TRUE của mỗi điều kiện", en: "Only the TRUE branch of each condition needs running", ja: "各条件のTRUE分岐だけ実行すればよい" },
      { vi: "Không liên quan tới cấu trúc điều khiển", en: "It has nothing to do with control structures", ja: "制御構造とは無関係である" }
    ],
    answer: 1,
    exp: { vi: "Độ phủ câu lệnh chỉ cần mỗi dòng chạy một lần — có thể bỏ sót nhánh else. Độ phủ nhánh/quyết định mạnh hơn: mỗi điểm quyết định phải nhận cả kết quả đúng và sai. Ví dụ if không có else vẫn cần ca làm điều kiện false. Đạt 100% branch coverage kéo theo 100% statement coverage nhưng không ngược lại.", en: "Statement coverage only needs each line executed once — it can miss else branches. Branch/decision coverage is stronger: each decision must take both true and false outcomes. E.g. an if with no else still needs a case making the condition false. 100% branch coverage implies 100% statement coverage, but not vice versa.", ja: "命令カバレッジは各行を一度実行すればよく、else分岐を見逃し得る。分岐/判定カバレッジはより強く、各判定が真と偽の両結果を取る必要がある。例えばelseのないifでも条件を偽にするケースが要る。100%の分岐カバレッジは100%の命令カバレッジを含むが、逆は成り立たない。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Trong quản lý kiểm thử dựa trên rủi ro (risk-based testing), 「mức rủi ro」 của một hạng mục thường được ước lượng thế nào?",
        en: "In risk-based testing, how is an item's risk level typically estimated?",
        ja: "リスクベーステストにおいて、項目の「リスクレベル」は通常どのように見積もられますか。" },
    options: [
      { vi: "Tích của khả năng xảy ra (likelihood) và mức tác động (impact) nếu lỗi xảy ra", en: "The product of likelihood of occurrence and impact if it fails", ja: "発生の可能性(likelihood)と、発生時の影響(impact)の積" },
      { vi: "Chỉ bằng số dòng mã của mô-đun", en: "Just the module's lines of code", ja: "モジュールのコード行数だけ" },
      { vi: "Bằng số lượng tester trong nhóm", en: "The number of testers on the team", ja: "チームのテスター人数" },
      { vi: "Ngẫu nhiên, không theo tiêu chí nào", en: "Randomly, with no criteria", ja: "基準なくランダムに" }
    ],
    answer: 0,
    exp: { vi: "Rủi ro sản phẩm thường ước lượng = khả năng (xác suất lỗi tồn tại/kích hoạt) × tác động (hậu quả nghiệp vụ/kỹ thuật nếu lỗi xảy ra). Hạng mục rủi ro cao được test sớm và kỹ hơn. Cách này giúp phân bổ nỗ lực hợp lý khi thời gian hữu hạn.", en: "Product risk is usually estimated as likelihood (probability a defect exists/triggers) × impact (business/technical consequence if it fails). Higher-risk items are tested earlier and more thoroughly. This allocates effort sensibly under limited time.", ja: "プロダクトリスクは通常、可能性(欠陥が存在/発現する確率)×影響(発生時の業務/技術的影響)で見積もる。リスクの高い項目ほど早く念入りにテストする。限られた時間で工数を合理的に配分できる。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Kỹ thuật 「bảng quyết định」 (decision table testing) phù hợp nhất cho loại yêu cầu nào?",
        en: "Decision table testing is most suitable for which kind of requirement?",
        ja: "「デシジョンテーブルテスト」はどんな種類の要件に最も適していますか。" },
    options: [
      { vi: "Logic nghiệp vụ có nhiều điều kiện kết hợp dẫn tới các hành động/kết quả khác nhau", en: "Business logic with several combined conditions leading to different actions/outcomes", ja: "複数の条件の組み合わせが異なるアクション/結果につながる業務ロジック" },
      { vi: "Đo thời gian phản hồi dưới tải cao", en: "Measuring response time under heavy load", ja: "高負荷下の応答時間の測定" },
      { vi: "Kiểm tra màu sắc và phông chữ giao diện", en: "Checking UI colours and fonts", ja: "UIの色とフォントの確認" },
      { vi: "Sắp xếp thứ tự chạy của các bộ test", en: "Ordering the execution of test suites", ja: "テストスイートの実行順序の決定" }
    ],
    answer: 0,
    exp: { vi: "Bảng quyết định mô hình hóa tổ hợp điều kiện đầu vào → hành động tương ứng, rất hợp cho quy tắc nghiệp vụ phức tạp (ví dụ tính chiết khấu theo hạng khách + loại hàng + khuyến mãi). Nó phơi bày các tổ hợp bị bỏ sót và mâu thuẫn trong đặc tả, đảm bảo phủ mọi luật quyết định.", en: "A decision table models combinations of input conditions → corresponding actions, ideal for complex business rules (e.g. discount by customer tier + item type + promotion). It exposes missing combinations and contradictions in the spec, ensuring every decision rule is covered.", ja: "デシジョンテーブルは入力条件の組み合わせ→対応するアクションをモデル化し、複雑な業務ルール(例: 顧客ランク+商品種別+キャンペーンによる割引)に最適。仕様の抜けた組み合わせや矛盾を明らかにし、全ての判定ルールを網羅できる。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Chỉ số 「Defect Detection Percentage」 (DDP) đo lường điều gì?",
        en: "What does the Defect Detection Percentage (DDP) metric measure?",
        ja: "「欠陥検出率(Defect Detection Percentage, DDP)」という指標は何を測定しますか。" },
    options: [
      { vi: "Số câu test viết mỗi ngày", en: "Test cases written per day", ja: "1日に書くテストケース数" },
      { vi: "Tỉ lệ phần trăm thời gian đội dành cho họp", en: "The percentage of time the team spends in meetings", ja: "チームが会議に費やす時間の割合" },
      { vi: "Tỉ lệ khiếm khuyết phát hiện được trước phát hành trên tổng khiếm khuyết (trước + tìm thấy sau khi phát hành) — đo hiệu quả của kiểm thử", en: "Ratio of defects found before release to total defects (pre-release + those found after release) — measuring test effectiveness", ja: "リリース前に発見した欠陥を総欠陥数(リリース前+リリース後に発見)で割った比率—テストの有効性を測る" },
      { vi: "Dung lượng bộ nhớ mà test tiêu thụ", en: "The memory footprint of the tests", ja: "テストが消費するメモリ量" }
    ],
    answer: 2,
    exp: { vi: "DDP = số lỗi tìm thấy trong một pha (ví dụ trước phát hành) chia cho tổng số lỗi cuối cùng (gồm cả lỗi lọt ra production). DDP cao nghĩa là hoạt động kiểm thử bắt được phần lớn lỗi trước khi tới tay người dùng — thước đo hiệu quả phát hiện lỗi của quy trình test.", en: "DDP = defects found in a phase (e.g. before release) divided by the eventual total (including defects that escaped to production). A high DDP means testing caught most defects before users saw them — a measure of the process's defect-detection effectiveness.", ja: "DDP=あるフェーズ(例: リリース前)で発見した欠陥数を、最終的な総欠陥数(本番に漏れた欠陥を含む)で割った値。DDPが高いほどテストが利用者に届く前に大半の欠陥を捕らえたことを意味し、プロセスの欠陥検出有効性の指標となる。" } },

  { lvl: "istqb-advanced",
    q: { vi: "Trong review chính thức (formal review) theo IEEE 1028/ISTQB, vai trò 「người điều phối」 (moderator) chịu trách nhiệm gì?",
        en: "In a formal review (IEEE 1028/ISTQB), what is the moderator responsible for?",
        ja: "公式レビュー(IEEE 1028/ISTQB)において、「モデレータ(moderator)」の役割は何に責任を負いますか。" },
    options: [
      { vi: "Viết lại toàn bộ tài liệu được review", en: "Rewriting the whole reviewed document", ja: "レビュー対象の文書全体を書き直すこと" },
      { vi: "Quyết định lương của tác giả", en: "Deciding the author's salary", ja: "作成者の給与を決めること" },
      { vi: "Chỉ ngồi nghe, không làm gì", en: "Just sitting and listening, doing nothing", ja: "座って聞くだけで何もしないこと" },
      { vi: "Lập kế hoạch, dẫn dắt buổi review, đảm bảo quy trình diễn ra hiệu quả và giữ không khí xây dựng (tập trung vào sản phẩm, không chỉ trích cá nhân)", en: "Planning and leading the review, ensuring the process runs effectively and keeping it constructive (focus on the product, not personal criticism)", ja: "レビューを計画・進行し、プロセスが効果的に進むようにし、建設的な雰囲気(個人批判でなく成果物に集中)を保つこと" }
    ],
    answer: 3,
    exp: { vi: "Trong review chính thức, moderator (người điều phối) lên kế hoạch, chủ trì buổi họp, phân vai, đảm bảo tuân thủ quy trình và giữ thảo luận tập trung vào khiếm khuyết của sản phẩm chứ không công kích tác giả. Các vai khác gồm author, scribe (ghi chép), reviewer và người quản lý.", en: "In a formal review, the moderator plans, chairs the meeting, assigns roles, ensures the process is followed and keeps discussion focused on product defects rather than attacking the author. Other roles include author, scribe, reviewers and manager.", ja: "公式レビューでモデレータは計画立案・議事進行・役割分担を行い、プロセスの遵守を確保し、作成者を非難せず成果物の欠陥に議論を集中させる。他の役割には作成者・記録係(scribe)・レビュアー・マネージャがある。" } },

  // ===================== istqb-expert (6) — answers: 3,2,1,0,3,2 =====================
  { lvl: "istqb-expert",
    q: { vi: "Ở cấp quản lý kiểm thử (test management), 「test policy」 và 「test strategy」 khác nhau ra sao?",
        en: "At test management level, how do a 'test policy' and a 'test strategy' differ?",
        ja: "テストマネジメントのレベルで、「テストポリシー」と「テスト戦略」はどう異なりますか。" },
    options: [
      { vi: "Chúng là hai tên gọi của cùng một tài liệu", en: "They are two names for the same document", ja: "同じ文書の2つの呼び名である" },
      { vi: "Test policy chỉ dành cho tester junior", en: "A test policy is only for junior testers", ja: "テストポリシーはジュニアのテスター専用である" },
      { vi: "Test strategy có trước và quyết định test policy", en: "The test strategy comes first and dictates the policy", ja: "テスト戦略が先にあり、ポリシーを決定する" },
      { vi: "Test policy nêu mục tiêu & nguyên tắc kiểm thử ở tầm tổ chức (「vì sao」); test strategy mô tả cách tiếp cận chung áp cho các dự án/loại hệ thống (「làm thế nào ở mức cao」)", en: "A test policy states organisation-level testing objectives & principles (the 'why'); a test strategy describes the general approach applied across projects/system types (the high-level 'how')", ja: "テストポリシーは組織レベルのテスト目標と原則(「なぜ」)を示し、テスト戦略はプロジェクト/システム種別に適用する全般的なアプローチ(高レベルの「どのように」)を記述する" }
    ],
    answer: 3,
    exp: { vi: "Test policy là tuyên bố cấp tổ chức về mục tiêu, giá trị và nguyên tắc kiểm thử (tầm 「vì sao」). Test strategy cụ thể hơn một bậc: cách tiếp cận chung (mức rủi ro, mức kiểm thử, kỹ thuật, môi trường) áp dụng cho nhiều dự án/loại sản phẩm. Test plan của từng dự án sẽ chi tiết hóa strategy cho hoàn cảnh cụ thể.", en: "A test policy is an organisation-level statement of testing objectives, values and principles (the 'why'). A test strategy is one level more concrete: the general approach (risk levels, test levels, techniques, environments) applied across projects/product types. A project's test plan then tailors the strategy to its context.", ja: "テストポリシーは組織レベルのテスト目標・価値観・原則の表明(「なぜ」)。テスト戦略は一段具体的で、複数のプロジェクト/製品種別に適用する全般的アプローチ(リスクレベル・テストレベル・技法・環境)。各プロジェクトのテスト計画がその戦略を文脈に合わせて詳細化する。" } },

  { lvl: "istqb-expert",
    q: { vi: "Khi triển khai cải tiến quy trình kiểm thử theo mô hình TMMi/TPI, cách tiếp cận nào được khuyến nghị?",
        en: "When improving the test process using TMMi/TPI, which approach is recommended?",
        ja: "TMMi/TPIモデルでテストプロセスを改善する際、推奨されるアプローチはどれですか。" },
    options: [
      { vi: "Thay đổi tất cả cùng lúc trong một đêm để nhanh", en: "Change everything at once overnight to be fast", ja: "速さのため一晩で全てを同時に変える" },
      { vi: "Đánh giá hiện trạng theo mô hình tham chiếu, xác định điểm yếu ưu tiên, cải tiến từng bước có đo lường, rồi lặp lại (PDCA/IDEAL)", en: "Assess current state against a reference model, prioritise weaknesses, improve incrementally with measurement, then iterate (PDCA/IDEAL)", ja: "参照モデルで現状を評価し、優先すべき弱点を特定し、測定しながら段階的に改善し、反復する(PDCA/IDEAL)" },
      { vi: "Sao chép nguyên quy trình của công ty khác mà không điều chỉnh", en: "Copy another company's process verbatim without adapting", ja: "他社のプロセスを調整せずそのまま複製する" },
      { vi: "Bỏ hết đo lường vì tốn thời gian", en: "Drop all measurement because it takes time", ja: "時間がかかるため測定を全て廃止する" }
    ],
    answer: 1,
    exp: { vi: "Cải tiến quy trình kiểm thử là hành trình liên tục: dùng mô hình tham chiếu (TMMi theo mức trưởng thành, TPI theo vùng năng lực) để đánh giá hiện trạng, chọn điểm yếu ưu tiên theo mục tiêu kinh doanh, cải tiến tăng dần và ĐO lường tác động (theo chu trình IDEAL/PDCA). Tránh 「big bang」 và sao chép máy móc.", en: "Test process improvement is continuous: use a reference model (TMMi by maturity level, TPI by key area) to assess the current state, prioritise weaknesses by business goals, improve incrementally and MEASURE the impact (via the IDEAL/PDCA cycle). Avoid a 'big bang' and blind copying.", ja: "テストプロセス改善は継続的な取り組み: 参照モデル(成熟度レベルのTMMi、能力領域のTPI)で現状を評価し、ビジネス目標に沿って弱点に優先順位を付け、段階的に改善し影響を測定する(IDEAL/PDCAサイクル)。「ビッグバン」的変更や無批判な模倣は避ける。" } },

  { lvl: "istqb-expert",
    q: { vi: "Khi tự động hóa kiểm thử ở quy mô lớn, 「testware architecture」 tốt cần đặc tính nào nhất?",
        en: "For large-scale test automation, which property should a good testware architecture prioritise?",
        ja: "大規模なテスト自動化において、優れた「テストウェアアーキテクチャ」が最も重視すべき特性はどれですか。" },
    options: [
      { vi: "Ràng buộc chặt vào một công cụ và một phiên bản trình duyệt duy nhất", en: "Tight coupling to a single tool and one browser version", ja: "単一のツールと1つのブラウザバージョンへの密結合" },
      { vi: "Tính bảo trì & mở rộng: tách lớp (test cases / thư viện nghiệp vụ / lớp điều khiển công cụ), tái sử dụng, giảm trùng lặp để dễ thích ứng khi hệ thống đổi", en: "Maintainability & scalability: layered separation (test cases / business library / tool-control layer), reuse and low duplication so it adapts as the system changes", ja: "保守性と拡張性: 階層分離(テストケース/業務ライブラリ/ツール制御層)、再利用、重複の削減により、システム変更に適応しやすくする" },
      { vi: "Viết mỗi test hoàn toàn độc lập, sao chép mọi bước để 「an toàn」", en: "Writing each test fully standalone, copy-pasting every step to be 'safe'", ja: "各テストを完全に独立させ、「安全」のため全ステップをコピーする" },
      { vi: "Đặt toàn bộ dữ liệu test cứng trong mã", en: "Hard-coding all test data in the code", ja: "全てのテストデータをコードにハードコードする" }
    ],
    answer: 1,
    exp: { vi: "Ở quy mô lớn, chi phí lớn nhất là BẢO TRÌ. Kiến trúc testware tốt phân tầng (generic tool layer, thư viện nghiệp vụ/keyword, và test cases khai báo), tách dữ liệu khỏi mã, tái sử dụng cao và ít trùng lặp — nhờ đó khi UI/hệ thống đổi chỉ sửa một nơi. Ràng buộc chặt vào công cụ hay sao chép bước sẽ khiến bộ test giòn và đắt duy trì.", en: "At scale the biggest cost is MAINTENANCE. Good testware architecture is layered (generic tool layer, business/keyword library, and declarative test cases), separates data from code, and maximises reuse with low duplication — so a UI/system change touches one place. Tight tool coupling or copy-pasted steps make the suite brittle and costly to maintain.", ja: "大規模では最大のコストは保守。優れたテストウェアアーキテクチャは階層化され(汎用ツール層・業務/キーワードライブラリ・宣言的なテストケース)、データをコードから分離し、再利用を最大化して重複を抑える。これによりUI/システム変更時の修正が1か所で済む。ツールへの密結合やコピペのステップはスイートを脆く保守困難にする。" } },

  { lvl: "istqb-expert",
    q: { vi: "Trong kiểm thử hiệu năng (performance testing) chuyên sâu, sự khác biệt giữa 「load testing」 và 「stress testing」 là gì?",
        en: "In advanced performance testing, what's the difference between load testing and stress testing?",
        ja: "高度な性能テストにおいて、「負荷テスト」と「ストレステスト」の違いは何ですか。" },
    options: [
      { vi: "Load testing kiểm hành vi ở mức tải dự kiến/thực tế; stress testing đẩy vượt giới hạn để xem hệ thống suy giảm & phục hồi ra sao", en: "Load testing checks behaviour at expected/realistic load; stress testing pushes beyond limits to see how the system degrades and recovers", ja: "負荷テストは想定/現実的な負荷での挙動を確認し、ストレステストは限界を超えて負荷をかけ、システムの劣化と回復の仕方を見る" },
      { vi: "Hai loại hoàn toàn giống nhau, chỉ khác tên", en: "The two are identical, only the names differ", ja: "2つは名前だけ異なり完全に同一である" },
      { vi: "Load testing chỉ chạy trên điện thoại, stress testing chỉ trên máy chủ", en: "Load testing runs only on phones, stress testing only on servers", ja: "負荷テストは携帯のみ、ストレステストはサーバのみで実行する" },
      { vi: "Stress testing đo độ chính xác chức năng, không liên quan tải", en: "Stress testing measures functional accuracy, unrelated to load", ja: "ストレステストは機能的正確さを測り、負荷とは無関係である" }
    ],
    answer: 0,
    exp: { vi: "Load testing đánh giá hệ thống dưới mức tải mong đợi (số người dùng đồng thời, throughput mục tiêu) để xác nhận đáp ứng SLA. Stress testing cố tình vượt ngưỡng để tìm điểm gãy, quan sát cách hệ thống suy giảm (degrade duyên dáng hay sập) và khả năng phục hồi sau quá tải. Cả hai bổ trợ cùng soak/spike testing để hiểu đặc tính hiệu năng.", en: "Load testing evaluates the system under expected load (concurrent users, target throughput) to confirm it meets SLAs. Stress testing deliberately exceeds limits to find the breaking point, observe how it degrades (gracefully or crashing) and whether it recovers afterwards. Both complement soak/spike testing to characterise performance.", ja: "負荷テストは想定負荷(同時ユーザー数・目標スループット)下でシステムを評価しSLA達成を確認する。ストレステストは意図的に限界を超えて破綻点を見つけ、劣化の仕方(緩やかな劣化か停止か)と過負荷後の回復可否を観察する。両者はソーク/スパイクテストと補完し合い性能特性を把握する。" } },

  { lvl: "istqb-expert",
    q: { vi: "Khi báo cáo cho lãnh đạo (test reporting cấp cao), cách trình bày trạng thái kiểm thử nào phù hợp nhất?",
        en: "When reporting to leadership (high-level test reporting), which way of presenting test status is most appropriate?",
        ja: "経営層への報告(高レベルのテスト報告)で、テスト状況を提示する最も適切な方法はどれですか。" },
    options: [
      { vi: "Dán toàn bộ log lỗi thô hàng nghìn dòng, không tóm tắt", en: "Paste thousands of lines of raw error logs with no summary", ja: "要約なしで数千行の生エラーログを貼り付ける" },
      { vi: "Chỉ nói 「mọi thứ ổn」 mà không dữ liệu", en: "Just say 'everything is fine' with no data", ja: "データなしで「すべて順調」とだけ言う" },
      { vi: "Gắn trạng thái kiểm thử với RỦI RO SẢN PHẨM & mục tiêu kinh doanh: độ phủ theo rủi ro, khiếm khuyết còn mở theo mức nghiêm trọng, xu hướng, và khuyến nghị quyết định phát hành có căn cứ", en: "Tie test status to PRODUCT RISK & business goals: risk-based coverage, open defects by severity, trends, and an evidence-based release recommendation", ja: "テスト状況をプロダクトリスクと事業目標に結びつける: リスクベースの網羅状況・重大度別の未解決欠陥・傾向・根拠あるリリース判断の提言" },
      { vi: "Chỉ khoe số ca test đã chạy, càng lớn càng tốt", en: "Only boast the number of tests run, the bigger the better", ja: "実行したテスト数だけを、多いほど良いとして誇示する" }
    ],
    answer: 2,
    exp: { vi: "Lãnh đạo cần thông tin hỗ trợ QUYẾT ĐỊNH, không phải dữ liệu thô. Báo cáo tốt gắn tiến độ/kết quả kiểm thử với rủi ro sản phẩm và mục tiêu kinh doanh: rủi ro nào đã được giảm, khiếm khuyết nghiêm trọng còn mở, xu hướng chất lượng, và khuyến nghị phát hành kèm điều kiện. Số ca test chạy đơn thuần không phản ánh chất lượng hay mức rủi ro còn lại.", en: "Leadership needs decision-supporting information, not raw data. A good report ties test progress/results to product risk and business goals: which risks are mitigated, severe open defects, quality trends, and a release recommendation with conditions. A bare count of tests run reflects neither quality nor residual risk.", ja: "経営層は生データではなく意思決定を支える情報を必要とする。良い報告はテストの進捗/結果をプロダクトリスクと事業目標に結びつける: どのリスクが低減されたか、重大な未解決欠陥、品質の傾向、条件付きのリリース提言。実行テスト数の羅列は品質も残存リスクも表さない。" } },

  { lvl: "istqb-expert",
    q: { vi: "Khi ước lượng công sức kiểm thử (test estimation) cho một dự án lớn, cách tiếp cận nào đáng tin cậy nhất?",
        en: "When estimating test effort for a large project, which approach is most reliable?",
        ja: "大規模プロジェクトのテスト工数を見積もる際、最も信頼できるアプローチはどれですか。" },
    options: [
      { vi: "Đoán một con số tròn cho 「đẹp」 rồi cam kết cứng", en: "Guess a round number because it looks 'nice' and commit hard to it", ja: "「きりが良い」数字を当て推量し、それに固く約束する" },
      { vi: "Luôn nhân đôi ước lượng của lần dự án trước bất kể khác biệt", en: "Always double the previous project's estimate regardless of differences", ja: "違いに関わらず常に前回プロジェクトの見積もりを2倍にする" },
      { vi: "Chỉ hỏi một người rồi lấy đúng con số đó", en: "Ask just one person and take exactly that number", ja: "一人にだけ尋ね、その数字をそのまま採用する" },
      { vi: "Kết hợp nhiều kỹ thuật: dựa trên số liệu lịch sử (metrics), phân rã công việc (WBS), ước lượng ba điểm và đồng thuận chuyên gia (Wideband Delphi) — kèm dự phòng cho rủi ro", en: "Combine several techniques: metrics/history-based, work breakdown (WBS), three-point estimation and expert consensus (Wideband Delphi) — with contingency for risk", ja: "複数の技法を組み合わせる: 実績値(メトリクス)ベース・作業分解(WBS)・三点見積もり・専門家の合意(ワイドバンドデルファイ)—リスク用の余裕も含める" }
    ],
    answer: 3,
    exp: { vi: "Ước lượng đáng tin dựa trên bằng chứng và nhiều góc nhìn: dùng số liệu năng suất lịch sử, phân rã công việc (WBS) để cộng dồn, ước lượng ba điểm (lạc quan/thường/bi quan) và đồng thuận chuyên gia (Wideband Delphi). Luôn kèm dự phòng cho rủi ro và tinh chỉnh khi dự án tiến triển. Một con số đoán mò hay áp đặt sẽ dẫn tới cam kết sai và áp lực chất lượng.", en: "Reliable estimates rest on evidence and multiple viewpoints: use historical productivity metrics, work breakdown (WBS) to roll up, three-point estimation (optimistic/likely/pessimistic) and expert consensus (Wideband Delphi). Always add risk contingency and refine as the project progresses. A blind guess or imposed number leads to bad commitments and quality pressure.", ja: "信頼できる見積もりは証拠と複数の視点に基づく: 過去の生産性メトリクス、作業分解(WBS)による積み上げ、三点見積もり(楽観/最頻/悲観)、専門家の合意(ワイドバンドデルファイ)を用いる。常にリスク用の余裕を加え、プロジェクトの進行に応じて調整する。当て推量や押し付けの数字は誤った約束と品質面の圧力を招く。" } }
];
