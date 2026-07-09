// ============================================================================
// ISTQB EXT5 — Bổ sung đợt 5: 1 câu / cấp độ = 3 câu. Mỗi phần tử gắn sẵn `lvl`.
// Định dạng: { lvl, q:{vi,en,ja}, options:[{vi,en,ja}x4], answer:0-3, exp:{vi,en,ja} }
// ============================================================================
export const DATA = [
  // ===================== istqb-foundation (1) — answer: 2 =====================
  { lvl: "istqb-foundation",
    q: { vi: "Theo thuật ngữ ISTQB, chuỗi nhân quả nào là đúng?",
        en: "According to ISTQB terminology, which causal chain is correct?",
        ja: "ISTQBの用語によると、正しい因果の連鎖はどれですか。" },
    options: [
      { vi: "Failure (sự cố) → Defect (khiếm khuyết) → Error (sai sót của con người)", en: "Failure → Defect → Error (human mistake)", ja: "故障 → 欠陥 → エラー(人の誤り)" },
      { vi: "Defect → Error → Failure, và cả ba luôn xảy ra đồng thời", en: "Defect → Error → Failure, and all three always occur together", ja: "欠陥 → エラー → 故障で、常に3つが同時に起こる" },
      { vi: "Error (sai sót của con người) → Defect (khiếm khuyết trong sản phẩm) → Failure (biểu hiện sai khi vận hành)", en: "Error (human mistake) → Defect (flaw in the product) → Failure (incorrect behavior when running)", ja: "エラー(人の誤り) → 欠陥(製品の欠点) → 故障(実行時の誤った振る舞い)" },
      { vi: "Error và Failure là hai tên gọi của cùng một khái niệm", en: "Error and Failure are two names for the same concept", ja: "エラーと故障は同じ概念の二つの呼び方である" }
    ],
    answer: 2,
    exp: { vi: "Con người phạm sai sót (error/mistake) dẫn tới khiếm khuyết (defect/bug) trong sản phẩm; khi mã có defect được thực thi, nó có thể gây ra sự cố (failure) — hành vi khác kỳ vọng. Không phải mọi defect đều gây failure.", en: "A person makes an error/mistake, which introduces a defect/bug in the product; when the defective code runs it may cause a failure — behavior differing from expectations. Not every defect leads to a failure.", ja: "人がエラー(誤り)を犯すと製品に欠陥(バグ)が入り、その欠陥コードが実行されると故障(期待と異なる振る舞い)を引き起こしうる。すべての欠陥が故障に至るわけではない。" } },

  // ===================== istqb-advanced (1) — answer: 1 =====================
  { lvl: "istqb-advanced",
    q: { vi: "Kỹ thuật kiểm thử chuyển trạng thái (state transition testing) đặc biệt phù hợp để tìm loại lỗi nào?",
        en: "State transition testing is especially suited to finding which kind of defect?",
        ja: "状態遷移テストは、どの種類の欠陥を見つけるのに特に適していますか。" },
    options: [
      { vi: "Lỗi định dạng màu sắc trên giao diện", en: "Color formatting defects in the UI", ja: "UIの色書式の欠陥" },
      { vi: "Lỗi ở các chuyển tiếp không hợp lệ giữa các trạng thái và hành vi phụ thuộc trạng thái hiện tại", en: "Defects at invalid transitions between states and behavior that depends on the current state", ja: "状態間の無効な遷移や、現在の状態に依存する振る舞いの欠陥" },
      { vi: "Lỗi hiệu năng khi có nhiều người dùng đồng thời", en: "Performance defects under many concurrent users", ja: "多数同時ユーザー下の性能欠陥" },
      { vi: "Lỗi chính tả trong tài liệu hướng dẫn", en: "Spelling defects in the user manual", ja: "取扱説明書の誤字" }
    ],
    answer: 1,
    exp: { vi: "State transition testing mô hình hóa các trạng thái, sự kiện và chuyển tiếp; nó rất mạnh với hệ thống mà hành vi phụ thuộc lịch sử/trạng thái (ví dụ máy ATM, đơn hàng), giúp lộ ra chuyển tiếp không hợp lệ hoặc bị bỏ sót.", en: "State transition testing models states, events and transitions; it is powerful for systems whose behavior depends on history/state (e.g. an ATM, an order lifecycle), exposing invalid or missing transitions.", ja: "状態遷移テストは状態・イベント・遷移をモデル化し、履歴や状態に依存する振る舞いを持つシステム(例: ATM、注文ライフサイクル)に強く、無効または欠落した遷移を明らかにする。" } },

  // ===================== istqb-expert (1) — answer: 3 =====================
  { lvl: "istqb-expert",
    q: { vi: "Kỹ thuật ước lượng 「Wideband Delphi」 trong quản lý kiểm thử dựa trên nguyên tắc nào?",
        en: "The Wideband Delphi estimation technique in test management is based on what principle?",
        ja: "テストマネジメントにおける「ワイドバンド・デルファイ」見積り技法は、どのような原則に基づいていますか。" },
    options: [
      { vi: "Chỉ một chuyên gia duy nhất đưa ra con số cuối cùng cho cả nhóm", en: "A single expert dictates the final number for the whole team", ja: "唯一の専門家がチーム全体の最終数値を決める" },
      { vi: "Ước lượng ngẫu nhiên rồi làm tròn lên gấp đôi", en: "Estimate randomly then round up to double", ja: "ランダムに見積もって2倍に切り上げる" },
      { vi: "Dùng số dòng mã chia cho tốc độ gõ phím trung bình", en: "Lines of code divided by average typing speed", ja: "コード行数を平均タイピング速度で割る" },
      { vi: "Nhiều chuyên gia ước lượng độc lập, thảo luận các khác biệt rồi lặp lại nhiều vòng cho tới khi hội tụ về đồng thuận", en: "Several experts estimate independently, discuss the differences, then repeat rounds until they converge on consensus", ja: "複数の専門家が独立に見積もり、差異を議論し、合意に収束するまで数ラウンド繰り返す" }
    ],
    answer: 3,
    exp: { vi: "Wideband Delphi là kỹ thuật ước lượng dựa trên chuyên gia: mỗi người ước lượng độc lập, cả nhóm thảo luận lý do khác biệt, rồi ước lượng lại qua nhiều vòng đến khi đồng thuận — giảm thiên lệch cá nhân và tận dụng trí tuệ tập thể.", en: "Wideband Delphi is an expert-based estimation technique: each person estimates independently, the group discusses the reasons for differences, then re-estimates over rounds until consensus — reducing individual bias and leveraging collective judgment.", ja: "ワイドバンド・デルファイは専門家ベースの見積り技法で、各自が独立に見積もり、差異の理由をグループで議論し、合意に至るまで数ラウンド見積り直す。個人の偏りを減らし集合知を活かす。" } },
];
