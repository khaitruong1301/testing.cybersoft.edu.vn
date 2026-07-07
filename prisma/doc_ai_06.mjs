// ============================================================================
// AI_DOCS_06 — 2 bài "AI trong kiểm thử doanh nghiệp" (2026, kind=thucchien).
// A: Regression có AI hỗ trợ cho core-banking — bút toán kép làm oracle.
// B: Kiểm thử engine bồi thường bảo hiểm có AI — bảng quyết định làm oracle.
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "ai06a", domain: "banking", kind: "thucchien", label: "BANKING AI QA" });
const coverB = makeThumb({ id: "ai06b", domain: "insurance", kind: "thucchien", label: "INSURANCE AI QA" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn)
// ---------------------------------------------------------------------------
const SVG_BANK_ARCH = `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="330" fill="#0b1220"/>
<text x="320" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc core-banking & vòng regression có AI hỗ trợ</text>
<rect x="24" y="52" width="130" height="66" rx="9" fill="#12315e" stroke="#38bdf8" stroke-width="2"/>
<text x="89" y="80" text-anchor="middle" font-size="12.5" font-weight="800" fill="#e0f2fe">API Cổng</text>
<text x="89" y="100" text-anchor="middle" font-size="10" fill="#7dd3fc">/transfers /pay</text>
<rect x="186" y="52" width="130" height="66" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="251" y="80" text-anchor="middle" font-size="12.5" font-weight="800" fill="#ccfbf1">Ledger Core</text>
<text x="251" y="100" text-anchor="middle" font-size="10" fill="#5eead4">bút toán kép</text>
<rect x="348" y="52" width="130" height="66" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="413" y="80" text-anchor="middle" font-size="12.5" font-weight="800" fill="#e0e7ff">Posting Engine</text>
<text x="413" y="100" text-anchor="middle" font-size="10" fill="#a5b4fc">idempotency</text>
<rect x="510" y="52" width="106" height="66" rx="9" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="563" y="80" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fed7aa">Sổ cái DB</text>
<text x="563" y="100" text-anchor="middle" font-size="10" fill="#fdba74">entries</text>
<defs><marker id="ba1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#ba1)"><path d="M154 85 h30"/><path d="M316 85 h30"/><path d="M478 85 h30"/></g>
<rect x="24" y="150" width="592" height="60" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="320" y="176" text-anchor="middle" font-size="12" font-weight="800" fill="#6ee7b7">ORACLE bất biến: Σ nợ = Σ có · tiền bảo toàn · retry → 1 trạng thái cuối</text>
<text x="320" y="196" text-anchor="middle" font-size="10.5" fill="#a7f3d0">Không assert "hiện success" mà assert sổ cái cân & idempotent</text>
<rect x="24" y="228" width="290" height="82" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="169" y="252" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">AI hỗ trợ (tăng tốc)</text>
<g font-size="9.5" fill="#bae6fd"><text x="40" y="272">· sinh nháp case regression từ diff</text>
<text x="40" y="288">· gợi ý biến thể timeout/duplicate</text>
<text x="40" y="304">· tóm tắt trace khi đỏ</text></g>
<rect x="326" y="228" width="290" height="82" rx="9" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="471" y="252" text-anchor="middle" font-size="12" font-weight="800" fill="#fca5a5">Con người (giữ đúng đắn)</text>
<g font-size="9.5" fill="#fecaca"><text x="342" y="272">· định nghĩa oracle bút toán kép</text>
<text x="342" y="288">· duyệt PR, không cho AI nới oracle</text>
<text x="342" y="304">· chốt gate CI cho tiền/tuân thủ</text></g>
</svg>`;

const SVG_DOUBLE_ENTRY = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0b1220"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bút toán kép: một chuyển khoản = hai bút toán cân nhau</text>
<rect x="60" y="56" width="200" height="70" rx="10" fill="#12315e" stroke="#38bdf8" stroke-width="2"/>
<text x="160" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">TK A (người gửi)</text>
<text x="160" y="106" text-anchor="middle" font-size="12" fill="#f87171">DEBIT −100</text>
<rect x="380" y="56" width="200" height="70" rx="10" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="480" y="82" text-anchor="middle" font-size="13" font-weight="800" fill="#ccfbf1">TK B (người nhận)</text>
<text x="480" y="106" text-anchor="middle" font-size="12" fill="#34d399">CREDIT +100</text>
<defs><marker id="de1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#fbbf24"/></marker></defs>
<path d="M260 91 h120" stroke="#fbbf24" stroke-width="2.5" fill="none" marker-end="url(#de1)"/>
<text x="320" y="82" text-anchor="middle" font-size="11" font-weight="700" fill="#fde68a">100</text>
<rect x="60" y="156" width="520" height="52" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="320" y="180" text-anchor="middle" font-size="13" font-weight="800" fill="#6ee7b7">Σ DEBIT = Σ CREDIT  ⇒  (−100) + (+100) = 0</text>
<text x="320" y="198" text-anchor="middle" font-size="10.5" fill="#a7f3d0">Tổng tiền hệ thống KHÔNG đổi — tiền được bảo toàn</text>
<rect x="60" y="228" width="520" height="56" rx="9" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="320" y="252" text-anchor="middle" font-size="12" font-weight="800" fill="#fca5a5">Nếu chỉ ghi DEBIT mà thiếu CREDIT (partial failure)</text>
<text x="320" y="272" text-anchor="middle" font-size="10.5" fill="#fecaca">⇒ Σ ≠ 0 → oracle ĐỎ ngay → tiền "bốc hơi" bị chặn trước production</text>
</svg>`;

const SVG_CLAIM_STATE = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#1e1b4b"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Vòng đời hồ sơ bồi thường & bảng quyết định làm oracle</text>
<defs><marker id="cs1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#a5b4fc"/></marker></defs>
<rect x="20" y="70" width="96" height="50" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="68" y="100" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">SUBMITTED</text>
<rect x="150" y="70" width="96" height="50" rx="9" fill="#3730a3" stroke="#818cf8" stroke-width="2"/>
<text x="198" y="100" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">TRIAGED</text>
<rect x="280" y="70" width="110" height="50" rx="9" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
<text x="335" y="93" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ccfbf1">DECISION</text>
<text x="335" y="110" text-anchor="middle" font-size="9" fill="#5eead4">bảng quyết định</text>
<rect x="430" y="34" width="96" height="44" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="478" y="61" text-anchor="middle" font-size="11.5" font-weight="800" fill="#6ee7b7">APPROVED</text>
<rect x="430" y="112" width="96" height="44" rx="9" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
<text x="478" y="139" text-anchor="middle" font-size="11.5" font-weight="800" fill="#fca5a5">DENIED</text>
<rect x="556" y="73" width="70" height="44" rx="9" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
<text x="591" y="100" text-anchor="middle" font-size="10.5" font-weight="800" fill="#fed7aa">PAID</text>
<g stroke="#a5b4fc" stroke-width="2.5" fill="none" marker-end="url(#cs1)"><path d="M116 95 h32"/><path d="M246 95 h32"/><path d="M390 88 l38 -30"/><path d="M390 102 l38 30"/><path d="M526 56 h20 v34 h8"/></g>
<rect x="20" y="185" width="606" height="42" rx="9" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
<text x="323" y="211" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">ORACLE = BẢNG QUYẾT ĐỊNH: (coverage, exclusion, limit, deductible, fraud) → outcome</text>
<rect x="20" y="238" width="606" height="46" rx="9" fill="#052e16" stroke="#34d399" stroke-width="2"/>
<text x="323" y="258" text-anchor="middle" font-size="11" font-weight="700" fill="#6ee7b7">LLM mở rộng tổ hợp case biên — nhưng bảng quyết định luôn là nguồn sự thật</text>
<text x="323" y="275" text-anchor="middle" font-size="9.5" fill="#a7f3d0">AI đề xuất input mới; kỳ vọng đầu ra vẫn tính từ bảng do con người sở hữu</text>
</svg>`;

const SVG_DECISION_TABLE = `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="320" fill="#1e1b4b"/>
<text x="320" y="28" text-anchor="middle" font-size="15" font-weight="800" fill="#e2e8f0">Bảng quyết định bồi thường (rút gọn)</text>
<g font-size="10.5" fill="#e0e7ff">
<rect x="24" y="46" width="150" height="26" fill="#3730a3" stroke="#818cf8"/><text x="30" y="64">Điều kiện</text>
<rect x="174" y="46" width="88" height="26" fill="#3730a3" stroke="#818cf8"/><text x="182" y="64">R1</text>
<rect x="262" y="46" width="88" height="26" fill="#3730a3" stroke="#818cf8"/><text x="270" y="64">R2</text>
<rect x="350" y="46" width="88" height="26" fill="#3730a3" stroke="#818cf8"/><text x="358" y="64">R3</text>
<rect x="438" y="46" width="88" height="26" fill="#3730a3" stroke="#818cf8"/><text x="446" y="64">R4</text>
<rect x="526" y="46" width="90" height="26" fill="#3730a3" stroke="#818cf8"/><text x="534" y="64">R5</text>
</g>
<g font-size="10" fill="#cbd5e1">
<rect x="24" y="72" width="150" height="24" fill="#312e81" stroke="#4c1d95"/><text x="30" y="88">Trong hạn mức?</text>
<rect x="24" y="96" width="150" height="24" fill="#2a2560" stroke="#4c1d95"/><text x="30" y="112">Thuộc loại trừ?</text>
<rect x="24" y="120" width="150" height="24" fill="#312e81" stroke="#4c1d95"/><text x="30" y="136">Còn hiệu lực?</text>
<rect x="24" y="144" width="150" height="24" fill="#2a2560" stroke="#4c1d95"/><text x="30" y="160">Cờ gian lận?</text>
<rect x="24" y="168" width="150" height="26" fill="#0c4a6e" stroke="#38bdf8"/><text x="30" y="186" fill="#7dd3fc">⇒ Kết quả</text>
</g>
<g font-size="10" fill="#e2e8f0" text-anchor="middle">
<text x="218" y="88">Có</text><text x="306" y="88">Có</text><text x="394" y="88">Không</text><text x="482" y="88">Có</text><text x="571" y="88">Có</text>
<text x="218" y="112">Không</text><text x="306" y="112">Có</text><text x="394" y="112">Không</text><text x="482" y="112">Không</text><text x="571" y="112">Không</text>
<text x="218" y="136">Có</text><text x="306" y="136">Có</text><text x="394" y="136">Có</text><text x="482" y="136">Có</text><text x="571" y="136">Có</text>
<text x="218" y="160">Không</text><text x="306" y="160">Không</text><text x="394" y="160">Không</text><text x="482" y="160">Có</text><text x="571" y="160">Không</text>
</g>
<g font-size="10.5" font-weight="800" text-anchor="middle">
<rect x="174" y="168" width="88" height="26" fill="#052e16" stroke="#34d399"/><text x="218" y="186" fill="#6ee7b7">APPROVE</text>
<rect x="262" y="168" width="88" height="26" fill="#450a0a" stroke="#f87171"/><text x="306" y="186" fill="#fca5a5">DENY(excl)</text>
<rect x="350" y="168" width="88" height="26" fill="#450a0a" stroke="#f87171"/><text x="394" y="186" fill="#fca5a5">DENY(limit)</text>
<rect x="438" y="168" width="88" height="26" fill="#7c2d12" stroke="#fb923c"/><text x="482" y="186" fill="#fed7aa">REVIEW</text>
<rect x="526" y="168" width="90" height="26" fill="#052e16" stroke="#34d399"/><text x="571" y="186" fill="#6ee7b7">APPROVE</text>
</g>
<rect x="24" y="212" width="592" height="42" rx="8" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
<text x="320" y="238" text-anchor="middle" font-size="11" font-weight="700" fill="#e0f2fe">Mỗi quy tắc là 1 test case; bảng phải ĐẦY ĐỦ (mọi tổ hợp có luật) & KHÔNG mâu thuẫn</text>
<rect x="24" y="262" width="592" height="46" rx="8" fill="#052e16" stroke="#34d399" stroke-width="1.5"/>
<text x="320" y="282" text-anchor="middle" font-size="10.5" fill="#6ee7b7">Deductible & limit áp SAU khi APPROVE: payout = min(claim, limit) − deductible, ≥ 0</text>
<text x="320" y="299" text-anchor="middle" font-size="9.5" fill="#a7f3d0">Fraud flag ⇒ REVIEW (con người), không auto-approve dù các điều kiện khác đạt</text>
</svg>`;

// ===========================================================================
// ARTICLE A — AI-assisted regression cho core-banking, oracle bút toán kép
// ===========================================================================
const pagesA = [
  {
    heading: {
      vi: "1. Bối cảnh doanh nghiệp: quy mô, SLA và tuân thủ của core-banking",
      en: "1. Business context: scale, SLA and compliance of core-banking",
      ja: "1. 業務背景: コアバンキングの規模・SLA・コンプライアンス",
    },
    blocks: [
      P(
        "Một hệ thống core-banking không giống một ứng dụng web thông thường. Nó xử lý hàng triệu giao dịch mỗi ngày, mỗi giao dịch chạm trực tiếp vào tiền thật của khách hàng, và một lỗi nhỏ có thể khiến ngân hàng mất tiền hoặc vi phạm quy định. Trong bối cảnh đó, đội kiểm thử không được phép coi 'test xanh' là mục tiêu; mục tiêu thật là chứng minh rằng mọi bút toán đều cân, tiền không bao giờ tự sinh ra hay biến mất, và mỗi lần thử lại chỉ tạo đúng một trạng thái cuối cùng. Bài viết này mô tả cách AI hỗ trợ tăng tốc regression cho core-banking mà không hề được phép quyết định tính đúng đắn.",
        "A core-banking system is not like an ordinary web app. It processes millions of transactions per day, each transaction directly touching real customer money, and a small bug can cost the bank money or breach regulations. In that context, the test team must not treat 'green tests' as the goal; the real goal is to prove every posting is balanced, money never spontaneously appears or vanishes, and each retry produces exactly one final state. This article describes how AI accelerates regression for core-banking without ever being allowed to decide correctness.",
        "コアバンキングシステムは通常の Web アプリとは違います。一日に数百万件の取引を処理し、各取引が顧客の実際の資金に直接触れ、小さなバグが銀行に損失を与えたり規制違反を招いたりします。その状況ではテストチームは「グリーンなテスト」を目標にしてはならず、真の目標はすべての記帳が均衡し、資金が決して自然発生も消失もせず、各再試行がちょうど一つの最終状態を生むことを証明することです。本記事は AI が正しさを決めることを一切許されずにコアバンキングの回帰を加速する方法を述べます。",
      ),
      P(
        "Các ràng buộc phi chức năng ở đây khắc nghiệt hơn hẳn. SLA thường yêu cầu độ trễ ghi sổ dưới một ngưỡng cứng và tỉ lệ khả dụng bốn hoặc năm số chín. Về tuân thủ, mọi giao dịch phải có dấu vết kiểm toán bất biến, dữ liệu nhạy cảm phải được che khi vào môi trường test, và các chuẩn như PCI-DSS hay quy định ngân hàng trung ương chi phối cách bạn xử lý số thẻ, khoá và log. Vì thế 'kiểm thử nhanh hơn nhờ AI' phải luôn đi kèm câu hỏi: nhanh hơn nhưng có còn giữ được dấu vết kiểm toán và tính tất định không?",
        "The non-functional constraints here are far harsher. SLAs typically require posting latency below a hard threshold and four- or five-nines availability. On compliance, every transaction must carry an immutable audit trail, sensitive data must be masked before entering test environments, and standards like PCI-DSS or central-bank regulations govern how you handle card numbers, keys and logs. So 'faster testing thanks to AI' must always come with the question: faster, but do we still keep the audit trail and determinism?",
        "ここでの非機能要件ははるかに厳しいものです。SLA は通常、記帳のレイテンシを厳格な閾値以下に、可用性を四つか五つの九に要求します。コンプライアンス面では、すべての取引が不変の監査証跡を持ち、機微データはテスト環境に入る前にマスクされ、PCI-DSS や中央銀行規制のような基準がカード番号・鍵・ログの扱いを規定します。ゆえに「AI で高速化」は常にこの問いを伴います。速くなったが、依然として監査証跡と決定性を保てるのか、と。",
      ),
      IMG(
        SVG_BANK_ARCH,
        "Kiến trúc core-banking, oracle bút toán kép, và ranh giới AI hỗ trợ / con người giữ.",
        "Core-banking architecture, the double-entry oracle, and the AI-assists / human-holds boundary.",
        "コアバンキングのアーキテクチャ、複式簿記オラクル、AI 支援・人間保持の境界。",
      ),
      NOTE(
        "Trong ngân hàng, 'nhanh' không bao giờ được đánh đổi bằng 'đúng'. AI được phép rút ngắn thời gian viết case, nhưng oracle về tiền phải do con người định nghĩa và bảo vệ.",
        "In banking, 'fast' is never traded for 'correct'. AI may shorten the time to author cases, but the oracle about money must be defined and defended by humans.",
        "銀行では「速さ」を「正しさ」と引き換えにしません。AI はケース作成時間の短縮を許されますが、資金に関するオラクルは人間が定義し守らねばなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Kiến trúc và mô hình dữ liệu: sổ cái, tài khoản và bút toán",
      en: "2. Architecture and data model: ledger, accounts and entries",
      ja: "2. アーキテクチャとデータモデル: 元帳・勘定・仕訳",
    },
    blocks: [
      P(
        "Để kiểm thử đúng, trước hết phải hiểu mô hình dữ liệu. Trái tim của core-banking là sổ cái (ledger) gồm các tài khoản (account) và các bút toán (entry). Một giao dịch chuyển tiền không được lưu như 'trừ số dư A, cộng số dư B' một cách rời rạc, mà được ghi thành một transaction chứa ít nhất hai entry đối ứng: một bên nợ (debit) và một bên có (credit), sao cho tổng của chúng luôn bằng không. Số dư của mỗi tài khoản là hệ quả suy ra từ tổng các bút toán, không phải một con số được cập nhật tự do. Chính thiết kế này khiến bút toán kép trở thành oracle tự nhiên.",
        "To test correctly, you first must understand the data model. The heart of core-banking is a ledger of accounts and entries. A money transfer is not stored as a loose 'decrement A's balance, increment B's balance', but recorded as a transaction containing at least two offsetting entries: a debit and a credit, such that their sum is always zero. Each account's balance is a consequence derived from the sum of its entries, not a number updated freely. This very design makes double-entry a natural oracle.",
        "正しくテストするにはまずデータモデルを理解せねばなりません。コアバンキングの中心は勘定と仕訳からなる元帳です。送金は「A の残高を減らし B の残高を増やす」という緩い形ではなく、少なくとも二つの相殺仕訳——借方(debit)と貸方(credit)——を含み、その合計が常にゼロになる取引として記録されます。各勘定の残高は仕訳の合計から導かれる帰結であり、自由に更新される数ではありません。この設計こそ複式簿記を自然なオラクルにします。",
      ),
      CODE(
        "sql",
        `-- Mô hình dữ liệu sổ cái tối giản (bút toán kép)
CREATE TABLE accounts (
  id          BIGINT PRIMARY KEY,
  currency    CHAR(3) NOT NULL,
  -- KHÔNG lưu balance như cột tự do; balance = SUM(entries.amount)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transactions (
  id               UUID PRIMARY KEY,
  idempotency_key  UUID UNIQUE NOT NULL,     -- chống double-post
  status           TEXT NOT NULL,            -- PENDING|POSTED|REVERSED
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE entries (
  id              BIGINT PRIMARY KEY,
  transaction_id  UUID NOT NULL REFERENCES transactions(id),
  account_id      BIGINT NOT NULL REFERENCES accounts(id),
  amount          BIGINT NOT NULL,           -- đơn vị nhỏ nhất (cents); debit<0, credit>0
  CHECK (amount <> 0)
);
-- Bất biến sổ cái: với mỗi transaction, SUM(entries.amount) = 0`,
      ),
      P(
        "Hãy để ý ba chi tiết quan trọng. Thứ nhất, số dư không được lưu như một cột có thể ghi tự do; nó là kết quả cộng dồn các bút toán, nên không thể bị 'lệch' âm thầm. Thứ hai, mỗi transaction có một idempotency_key duy nhất, là chốt chặn để một yêu cầu chuyển tiền gửi trùng không tạo hai bút toán. Thứ ba, số tiền được lưu bằng đơn vị nhỏ nhất là số nguyên (cents), không dùng số thực dấu phẩy động, để tránh sai số làm tổng không bao giờ tròn về không. Ba chi tiết này là nền cho toàn bộ chiến lược oracle phía sau.",
        "Notice three important details. First, balance is not stored as a freely writable column; it is the accumulation of entries, so it cannot silently drift. Second, each transaction has a unique idempotency_key, the latch that stops a duplicated transfer request from creating two entries. Third, amounts are stored in the smallest unit as integers (cents), not floating-point, to avoid rounding errors making the sum never round to zero. These three details are the foundation for the entire oracle strategy that follows.",
        "三つの重要な点に注目してください。第一に、残高は自由に書き込める列ではなく仕訳の累積であり、静かにずれることはありません。第二に、各取引は一意の idempotency_key を持ち、重複した送金要求が二つの仕訳を作るのを止める掛け金です。第三に、金額は浮動小数点ではなく最小単位の整数(セント)で保存し、丸め誤差で合計がゼロに丸まらなくなるのを防ぎます。この三点が後続のオラクル戦略全体の基盤です。",
      ),
      TIP(
        "Không bao giờ dùng float cho tiền. Dùng số nguyên đơn vị nhỏ nhất hoặc decimal chính xác — nếu không, Σ debit + Σ credit có thể lệch 0.01 và oracle bút toán kép sẽ báo động giả.",
        "Never use float for money. Use smallest-unit integers or exact decimal — otherwise Σ debit + Σ credit may drift by 0.01 and the double-entry oracle will false-alarm.",
        "資金に float を決して使わないでください。最小単位の整数か正確な decimal を使います。さもないと Σ debit + Σ credit が 0.01 ずれ、複式簿記オラクルが誤報します。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Bút toán kép làm oracle: tiền bảo toàn, nợ bằng có",
      en: "3. Double-entry as oracle: money conserved, debits equal credits",
      ja: "3. オラクルとしての複式簿記: 資金保存・借方=貸方",
    },
    blocks: [
      P(
        "Đây là ý tưởng trung tâm của cả bài. Thay vì kiểm tra 'màn hình hiện chuyển khoản thành công', ta kiểm tra các bất biến kế toán mà mọi giao dịch đúng đắn phải thoả mãn. Bất biến thứ nhất: với mỗi transaction, tổng số tiền của các bút toán bằng không, tức tổng nợ bằng tổng có. Bất biến thứ hai: tổng số dư của toàn hệ thống trước và sau một chuyển khoản nội bộ không đổi, tức tiền được bảo toàn. Bất biến thứ ba: một yêu cầu gửi trùng chỉ tạo đúng một trạng thái cuối, tức tính idempotent. Ba bất biến này là oracle, và chúng đúng bất kể UI thay đổi thế nào.",
        "This is the central idea of the whole article. Instead of checking 'the screen shows transfer succeeded', we check accounting invariants every correct transaction must satisfy. Invariant one: for each transaction, the sum of entry amounts is zero, i.e. total debits equal total credits. Invariant two: the system-wide total balance before and after an internal transfer is unchanged, i.e. money is conserved. Invariant three: a duplicated request creates exactly one final state, i.e. idempotency. These three invariants are the oracle, and they hold regardless of how the UI changes.",
        "これは記事全体の中心的なアイデアです。「画面が送金成功と表示する」を確認する代わりに、すべての正しい取引が満たすべき会計上の不変条件を確認します。不変条件一: 各取引で仕訳金額の合計がゼロ、すなわち借方合計=貸方合計。不変条件二: 内部送金の前後でシステム全体の残高合計が不変、すなわち資金保存。不変条件三: 重複要求はちょうど一つの最終状態を作る、すなわち冪等性。これら三つの不変条件がオラクルであり、UI がどう変わっても成り立ちます。",
      ),
      IMG(
        SVG_DOUBLE_ENTRY,
        "Bút toán kép: một chuyển khoản tạo hai bút toán cân nhau; tổng luôn bằng 0.",
        "Double-entry: one transfer creates two balanced entries; the sum is always 0.",
        "複式簿記: 一つの送金が均衡した二つの仕訳を作り、合計は常に 0。",
      ),
      CODE(
        "ts",
        `// Oracle bút toán kép — dùng lại trong nhiều test regression
import { expect } from '@playwright/test';

// 1) Với mỗi transaction: Σ amount = 0 (nợ = có)
export async function assertTxnBalanced(db: DB, txnId: string) {
  const rows = await db.query(
    'SELECT COALESCE(SUM(amount),0) AS s FROM entries WHERE transaction_id=$1', [txnId]);
  expect(Number(rows[0].s)).toBe(0); // KHÔNG assert "success text"
}

// 2) Tiền bảo toàn: tổng số dư hệ thống không đổi qua chuyển khoản nội bộ
export async function systemTotal(db: DB): Promise<number> {
  const r = await db.query('SELECT COALESCE(SUM(amount),0) AS s FROM entries');
  return Number(r[0].s); // với hệ đóng, tổng này là hằng số bất biến
}`,
      ),
      P(
        "Điểm mạnh của oracle này là nó không phụ thuộc vào cách trình bày. Dù nút bấm đổi tên, dù thông báo đổi màu, dù luồng thêm một bước xác nhận, bất biến 'tổng bút toán bằng không' vẫn phải đúng. Đó là lý do oracle nghiệp vụ bền hơn nhiều so với assertion giao diện. Khi AI sinh ra hàng chục case regression, ta không lo chúng assert những thứ hời hợt, vì mọi case đều được neo vào cùng một bộ oracle kế toán do con người định nghĩa và không bao giờ được nới lỏng.",
        "The strength of this oracle is that it does not depend on presentation. Even if a button is renamed, a message recolored, or the flow adds a confirmation step, the invariant 'sum of entries is zero' must still hold. That is why business oracles are far more durable than UI assertions. When AI generates dozens of regression cases, we don't worry they assert shallow things, because every case is anchored to the same set of accounting oracles defined by humans and never loosened.",
        "このオラクルの強みは表示形式に依存しないことです。ボタン名が変わっても、メッセージの色が変わっても、フローに確認ステップが増えても、「仕訳の合計はゼロ」という不変条件は成り立たねばなりません。だからこそ業務オラクルは UI アサーションよりはるかに堅牢です。AI が何十もの回帰ケースを生成しても、すべてのケースが人間の定義した同じ会計オラクル群に接地され決して緩められないため、表面的なものをアサートする心配はありません。",
      ),
      QA(
        "Vì sao 'assert bút toán cân' tốt hơn 'assert thấy chữ Thành công'?",
        "Why is 'assert entries balance' better than 'assert Success text is shown'?",
        "Vì chữ 'Thành công' có thể hiện ra ngay cả khi sổ cái đã hỏng: hệ thống có thể trả về UI thành công nhưng chỉ ghi một nửa bút toán do lỗi partial failure. Assertion giao diện sẽ xanh giả trong khi tiền đã lệch. Oracle bút toán kép truy thẳng vào sổ cái nên bắt được đúng lớp lỗi nguy hiểm nhất — nơi tiền bốc hơi mà UI vẫn tươi cười.",
        "Because a 'Success' text can appear even when the ledger is already broken: the system may return a success UI but write only half the entry due to a partial failure. The UI assertion is false-green while money has drifted. The double-entry oracle reads straight into the ledger, so it catches exactly the most dangerous class of bug — where money vanishes while the UI keeps smiling.",
        "「成功」の文字は元帳がすでに壊れていても表示され得るからです。システムは部分障害で仕訳を半分しか書かなくても成功 UI を返すことがあります。UI アサーションは偽のグリーンで、資金はずれています。複式簿記オラクルは元帳を直接読むため、最も危険なバグ——UI が笑顔のまま資金が消えるケース——を的確に捕えます。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. AI tăng tốc regression mà KHÔNG được tin về tính đúng đắn",
      en: "4. AI accelerates regression WITHOUT being trusted for correctness",
      ja: "4. AI は回帰を加速するが正しさは信頼しない",
    },
    blocks: [
      P(
        "Vai trò của AI trong quy trình này rất rõ ràng và có giới hạn. Khi một pull request thay đổi module posting, AI đọc diff và đề xuất một danh sách case regression cần chạy lại: các luồng chuyển khoản bị ảnh hưởng, các biến thể timeout, duplicate, hoàn tiền. AI cũng tóm tắt trace khi test đỏ, gợi ý biến thể dữ liệu biên, và điền phần khung lặp đi lặp lại của test. Nhưng AI không bao giờ được quyết định một kết quả là đúng hay sai; oracle bút toán kép do con người viết mới là toà án cuối cùng. AI tăng tốc phần cơ học, con người giữ phần phán đoán.",
        "AI's role in this process is clear and bounded. When a pull request changes the posting module, AI reads the diff and proposes a list of regression cases to re-run: affected transfer flows, timeout variants, duplicates, refunds. AI also summarizes traces when tests go red, suggests boundary-data variants, and fills the repetitive scaffolding of tests. But AI is never allowed to decide a result is right or wrong; the human-written double-entry oracle is the final court. AI accelerates the mechanical part, humans hold the judgment.",
        "この工程での AI の役割は明確で境界があります。プルリクエストが記帳モジュールを変更すると、AI は差分を読んで再実行すべき回帰ケース——影響を受ける送金フロー、タイムアウトの変種、重複、返金——のリストを提案します。AI はテストが赤になったときトレースを要約し、境界データの変種を提案し、テストの反復的な足場を埋めます。しかし AI は結果が正しいか誤りかを決めることを決して許されません。人間が書いた複式簿記オラクルが最終審判です。AI は機械的部分を加速し、人間が判断を保持します。",
      ),
      P(
        "Sự phân vai này không phải để làm khó AI mà để bảo vệ ngân hàng. Một mô hình ngôn ngữ có thể hallucination, tức bịa ra một 'sự thật' nghe hợp lý nhưng sai. Trong hầu hết lĩnh vực, một câu bịa gây phiền toái; trong ngân hàng, một quyết định sai về việc bút toán có cân hay không có thể để lọt lỗi mất tiền lên production. Vì thế ngay cả khi AI viết ra assertion, con người vẫn phải xác nhận rằng assertion đó neo vào bất biến kế toán thật, chứ không phải một điều kiện dễ dãi mà AI tự chọn để test nhanh xanh.",
        "This division is not to hobble AI but to protect the bank. A language model can hallucinate, i.e. fabricate a plausible-sounding but false 'fact'. In most fields a fabrication is a nuisance; in banking a wrong decision about whether entries balance can let a money-losing bug reach production. So even when AI writes an assertion, humans must still confirm the assertion is anchored to a real accounting invariant, not a lax condition AI picked so the test goes green quickly.",
        "この分担は AI を妨げるためではなく銀行を守るためです。言語モデルはハルシネーション、すなわちもっともらしく聞こえるが誤った「事実」を捏造し得ます。多くの分野では捏造は厄介事ですが、銀行では仕訳が均衡するか否かの誤った判断が資金損失バグを本番に届けかねません。ゆえに AI がアサーションを書いても、人間はそのアサーションが実際の会計不変条件に接地しているか——テストを速くグリーンにするため AI が選んだ甘い条件ではないか——を確認せねばなりません。",
      ),
      NOTE(
        "Nguyên tắc: AI có quyền cơ học rộng (sinh nháp, tóm tắt, gợi ý), nhưng quyền phán đoán về tiền bằng không. Mọi assertion về sổ cái đều phải qua mắt người trước khi vào nhánh chính.",
        "Principle: AI gets broad mechanical authority (draft, summarize, suggest), but zero judgment authority over money. Every ledger assertion must pass human eyes before reaching the main branch.",
        "原則: AI には広い機械的権限(下書き・要約・提案)を、しかし資金に関する判断権限はゼロを。元帳に関するすべてのアサーションは主ブランチに入る前に人間の目を通さねばなりません。",
      ),
      QA(
        "Nếu AI đề xuất một assertion sai mà reviewer bỏ sót thì sao?",
        "What if AI proposes a wrong assertion and the reviewer misses it?",
        "Đó chính là lý do ta không dựa vào một lớp bảo vệ duy nhất. Ngoài review người, oracle bút toán kép được viết một lần và tái sử dụng ở mọi case; ràng buộc CHECK trong DB chặn bút toán không cân ngay tầng lưu trữ; và gate CI chạy một bộ oracle 'chốt' độc lập không do AI sinh. Nhiều lớp phòng thủ khiến một sai sót đơn lẻ khó lọt tới production.",
        "That is exactly why we don't rely on a single layer of defense. Beyond human review, the double-entry oracle is written once and reused across every case; a DB CHECK constraint blocks unbalanced entries at the storage layer; and a CI gate runs an independent 'anchor' oracle set not generated by AI. Multiple defensive layers make a single mistake unlikely to reach production.",
        "だからこそ単一の防御層に頼りません。人間のレビューに加え、複式簿記オラクルは一度書かれ全ケースで再利用され、DB の CHECK 制約が不均衡な仕訳を保存層で阻止し、CI ゲートが AI 生成でない独立した「拠り所」オラクル群を実行します。複数の防御層により単一の誤りが本番に届きにくくなります。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Kế hoạch kiểm thử và ma trận case cho một chuyển khoản",
      en: "5. Test plan and case matrix for a transfer",
      ja: "5. 送金のテスト計画とケースマトリクス",
    },
    blocks: [
      P(
        "Trước khi viết code, ta lập ma trận case xoay quanh một nghiệp vụ cốt lõi là chuyển khoản giữa hai tài khoản. Ma trận phải phủ cả đường thành công lẫn các nhánh lỗi đắt giá. Đường thành công: chuyển hợp lệ, đủ số dư, cả hai tài khoản cùng loại tiền. Các nhánh lỗi: không đủ số dư, tài khoản bị khoá, timeout giữa chừng, yêu cầu gửi trùng (duplicate), thất bại một phần khi đã ghi nợ nhưng chưa ghi có, và hoàn giao dịch (reversal). Với mỗi case, cột quan trọng nhất không phải 'thông báo hiển thị' mà là 'oracle nào phải đúng sau khi thao tác kết thúc'.",
        "Before writing code, we build a case matrix around one core business action: a transfer between two accounts. The matrix must cover both the success path and the costly error branches. Success path: valid transfer, sufficient balance, both accounts same currency. Error branches: insufficient funds, locked account, timeout mid-way, duplicate request, partial failure where the debit is written but the credit is not, and transaction reversal. For each case, the most important column is not 'message displayed' but 'which oracle must hold after the action ends'.",
        "コードを書く前に、中核業務である二勘定間の送金を中心にケースマトリクスを構築します。マトリクスは成功経路と高くつくエラー分岐の両方を網羅せねばなりません。成功経路: 有効な送金、十分な残高、両勘定が同一通貨。エラー分岐: 残高不足、勘定ロック、途中のタイムアウト、重複要求、借方は書かれたが貸方が書かれない部分障害、取引の取消。各ケースで最も重要な列は「表示メッセージ」ではなく「操作終了後にどのオラクルが成り立たねばならないか」です。",
      ),
      CODE(
        "ts",
        `// Ma trận case dưới dạng dữ liệu — data-driven, mỗi hàng gắn oracle riêng
export const transferCases = [
  { name: 'happy',        amount: 100, seed: { A: 500, B: 0 }, expect: 'POSTED',
    oracle: 'balanced+conserved', endA: 400, endB: 100 },
  { name: 'insufficient', amount: 999, seed: { A: 500, B: 0 }, expect: 'REJECTED',
    oracle: 'no-entries',      endA: 500, endB: 0 },   // tiền KHÔNG đổi
  { name: 'locked',       amount: 100, seed: { A: 500, B: 0, lockB: true }, expect: 'REJECTED',
    oracle: 'no-entries',      endA: 500, endB: 0 },
  { name: 'timeout',      amount: 100, seed: { A: 500, B: 0, injectTimeout: true }, expect: 'PENDING|REJECTED',
    oracle: 'balanced-or-none' },                       // không được ghi nửa vời
  { name: 'duplicate',    amount: 100, seed: { A: 500, B: 0 }, sendTwice: true, expect: 'POSTED',
    oracle: 'idempotent-one-txn', endA: 400, endB: 100 },
  { name: 'reversal',     amount: 100, seed: { A: 500, B: 0 }, thenReverse: true, expect: 'REVERSED',
    oracle: 'net-zero',        endA: 500, endB: 0 },
];`,
      ),
      P(
        "Cách biểu diễn case dưới dạng dữ liệu như trên có hai lợi ích. Thứ nhất, nó tách phần 'chạy' khỏi phần 'kỳ vọng', giúp một hàm test chạy qua mọi hàng một cách nhất quán. Thứ hai, nó là nơi AI phát huy tốt nhất mà vẫn an toàn: AI có thể đề xuất thêm hàng, ví dụ chuyển khoản khác loại tiền hay số tiền cực lớn, nhưng cột oracle của mỗi hàng vẫn do con người xác nhận. AI mở rộng bề rộng của ma trận; con người bảo đảm chiều sâu về đúng đắn.",
        "Representing cases as data like above has two benefits. First, it separates 'run' from 'expectation', letting one test function iterate every row consistently. Second, it is exactly where AI shines while staying safe: AI can propose more rows, e.g. cross-currency transfers or extreme amounts, but the oracle column of each row is still confirmed by humans. AI expands the breadth of the matrix; humans guarantee the depth of correctness.",
        "上記のようにケースをデータで表現すると二つの利点があります。第一に「実行」と「期待」を分離し、一つのテスト関数が全行を一貫して反復できます。第二に、AI が安全性を保ちつつ最も活きる場です。AI は行の追加——例えば異種通貨送金や極端な金額——を提案できますが、各行のオラクル列は依然として人間が確認します。AI はマトリクスの幅を広げ、人間が正しさの深さを保証します。",
      ),
      SCEN(
        "Phỏng vấn: 'Bạn thiết kế ma trận case cho chuyển khoản thế nào?'",
        "Interview: 'How do you design a case matrix for a transfer?'",
        "Trả lời tốt bắt đầu từ oracle, không từ UI. Tôi liệt kê bất biến trước: nợ=có, tiền bảo toàn, idempotent, không ghi nửa vời. Sau đó tôi sinh case để thử phá từng bất biến: timeout để thử partial failure, gửi trùng để thử idempotency, reversal để thử net-zero. Mỗi hàng ma trận gắn đúng một oracle. Cuối cùng tôi mới nói tới AI: AI giúp mở rộng số hàng, nhưng cột oracle là ranh giới tôi giữ.",
        "A good answer starts from the oracle, not the UI. I list invariants first: debit=credit, money conserved, idempotent, no half-write. Then I generate cases to try breaking each invariant: timeout to test partial failure, duplicate to test idempotency, reversal to test net-zero. Each matrix row maps to exactly one oracle. Only at the end do I mention AI: AI helps expand the number of rows, but the oracle column is the boundary I hold.",
        "良い回答はオラクルから始まり UI からではありません。まず不変条件を列挙します。借方=貸方、資金保存、冪等、半書き込みなし。次に各不変条件を壊そうとするケースを生成します。部分障害を試すタイムアウト、冪等性を試す重複、ネットゼロを試す取消。各行がちょうど一つのオラクルに対応します。最後に初めて AI に触れます。AI は行数の拡大を助けますが、オラクル列は私が守る境界です。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Đường thành công (happy path) với oracle bảo toàn tiền",
      en: "6. The happy path with the money-conservation oracle",
      ja: "6. 資金保存オラクルによるハッピーパス",
    },
    blocks: [
      P(
        "Bắt đầu bằng case đơn giản nhất để đóng khung mẫu test cho mọi case sau. Một chuyển khoản hợp lệ 100 đơn vị từ A sang B phải cho ra trạng thái POSTED, số dư A giảm đúng 100, số dư B tăng đúng 100, và tổng số dư hệ thống không đổi. Điểm cần nhấn là chúng ta so số dư bằng cách suy ra từ sổ cái, không đọc một cột balance có thể bị cache sai. Và ta luôn chụp tổng hệ thống trước và sau để chắc rằng không có tiền tự sinh hay biến mất ở bất kỳ đâu ngoài hai tài khoản này.",
        "Start with the simplest case to frame the test template for all later cases. A valid 100-unit transfer from A to B must yield POSTED status, A's balance down exactly 100, B's balance up exactly 100, and the system total unchanged. The key emphasis is that we compare balances by deriving them from the ledger, not reading a balance column that might be mis-cached. And we always snapshot the system total before and after to ensure no money spontaneously appears or vanishes anywhere beyond these two accounts.",
        "後続の全ケースのテンプレートを枠付けるため最も単純なケースから始めます。A から B への有効な 100 単位の送金は POSTED 状態を生み、A の残高がちょうど 100 減り、B の残高がちょうど 100 増え、システム合計は不変でなければなりません。重要な強調点は、残高を誤ってキャッシュされ得る balance 列を読むのではなく元帳から導いて比較することです。そして常にシステム合計の前後をスナップショットし、これら二勘定以外のどこにも資金が自然発生も消失もしないことを保証します。",
      ),
      CODE(
        "ts",
        `import { test, expect } from './seed.spec';
import { assertTxnBalanced, systemTotal } from './oracle';

test('happy: chuyển 100 A→B giữ mọi bất biến', async ({ db, api }) => {
  await db.seedAccounts({ A: 500, B: 0 });
  const totalBefore = await systemTotal(db);

  const res = await api.post('/transfers', {
    from: 'A', to: 'B', amount: 100, idempotencyKey: crypto.randomUUID(),
  });
  const txnId = (await res.json()).transactionId;

  expect(res.status()).toBe(201);
  // Oracle 1: bút toán cân
  await assertTxnBalanced(db, txnId);
  // Oracle 2: số dư suy từ sổ cái, KHÔNG đọc cột cache
  expect(await db.balance('A')).toBe(400);
  expect(await db.balance('B')).toBe(100);
  // Oracle 3: tiền bảo toàn — tổng hệ thống không đổi
  expect(await systemTotal(db)).toBe(totalBefore);
});`,
      ),
      P(
        "Test này ngắn nhưng chứa toàn bộ triết lý. Nó không dừng ở kiểm status 201; nó kiểm ba bất biến độc lập, mỗi bất biến bắt một lớp lỗi khác nhau. Nếu ai đó vô tình sửa posting engine để ghi thiếu bút toán có, assertTxnBalanced sẽ đỏ. Nếu số dư bị cập nhật sai lệch, so sánh balance sẽ đỏ. Nếu có tiền rò rỉ sang tài khoản thứ ba do lỗi định tuyến, systemTotal sẽ đỏ. Ba tầng oracle này là khuôn mẫu ta lặp lại cho mọi case còn lại, và cũng là thứ AI được yêu cầu tái sử dụng chứ không tự chế ra assertion mới.",
        "This test is short but holds the whole philosophy. It does not stop at checking status 201; it checks three independent invariants, each catching a different class of bug. If someone accidentally edits the posting engine to skip the credit entry, assertTxnBalanced goes red. If a balance is mis-updated, the balance comparison goes red. If money leaks to a third account via a routing bug, systemTotal goes red. These three oracle layers are the template we repeat for every remaining case, and are also what AI is asked to reuse rather than invent new assertions.",
        "このテストは短いが哲学全体を含みます。status 201 の確認で止まらず、それぞれ異なるバグ層を捕える三つの独立した不変条件を確認します。誰かが記帳エンジンを誤って編集し貸方仕訳を飛ばせば assertTxnBalanced が赤になります。残高が誤更新されれば残高比較が赤になります。ルーティングバグで第三の勘定に資金が漏れれば systemTotal が赤になります。これら三つのオラクル層が残りの全ケースで繰り返すテンプレートであり、AI が新たなアサーションを発明するのではなく再利用するよう求められるものです。",
      ),
      TIP(
        "Luôn chụp tổng hệ thống trước/sau ở mọi test tiền. Đây là oracle rẻ nhất và bắt được nhiều lỗi rò rỉ nhất — kể cả những lỗi bạn chưa nghĩ tới khi viết case.",
        "Always snapshot the system total before/after in every money test. It is the cheapest oracle and catches the most leakage bugs — including ones you hadn't thought of when writing the case.",
        "資金テストでは常にシステム合計の前後をスナップショットしてください。最も安価なオラクルであり、ケース作成時に思いつかなかったものも含め最も多くの漏洩バグを捕えます。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Case lỗi sâu: timeout và không ghi nửa vời",
      en: "7. Deep failure: timeout and no half-write",
      ja: "7. 深い障害ケース: タイムアウトと半書き込み禁止",
    },
    blocks: [
      P(
        "Timeout là một trong những case nguy hiểm nhất vì nó dễ tạo ra trạng thái nửa vời. Hình dung: hệ thống đã ghi bút toán nợ cho A, rồi mất kết nối tới DB trước khi ghi bút toán có cho B. Nếu không xử lý đúng, sổ cái sẽ có một transaction lệch, tổng bút toán khác không, và tiền của A 'bốc hơi'. Oracle ở đây rất rõ: sau timeout, hoặc giao dịch được ghi trọn vẹn và cân, hoặc không ghi gì cả; tuyệt đối không được có trạng thái ghi một nửa. Đây chính là tính nguyên tử (atomicity) mà một transaction đúng phải đảm bảo.",
        "Timeout is one of the most dangerous cases because it easily produces a half-written state. Imagine: the system has written the debit for A, then loses the DB connection before writing the credit for B. Handled wrong, the ledger has an unbalanced transaction, the entry sum is nonzero, and A's money 'evaporates'. The oracle here is clear: after a timeout, either the transaction is fully written and balanced, or nothing is written; absolutely no half-written state is allowed. This is atomicity that a correct transaction must guarantee.",
        "タイムアウトは半書き込み状態を容易に生むため最も危険なケースの一つです。想像してください。システムが A の借方を書いた後、B の貸方を書く前に DB 接続を失う。誤って扱えば元帳に不均衡な取引が残り、仕訳合計が非ゼロになり、A の資金が「蒸発」します。ここでのオラクルは明確です。タイムアウト後、取引は完全に書かれ均衡しているか、何も書かれないかのいずれかで、半書き込み状態は絶対に許されません。これは正しい取引が保証せねばならない原子性(atomicity)です。",
      ),
      CODE(
        "ts",
        `test('timeout: KHÔNG được ghi nửa vời (atomicity)', async ({ db, api, fault }) => {
  await db.seedAccounts({ A: 500, B: 0 });
  const totalBefore = await systemTotal(db);

  // Tiêm lỗi: rớt kết nối DB sau khi ghi debit, trước khi ghi credit
  await fault.injectAfterDebit('DB_CONNECTION_DROP');

  const res = await api.post('/transfers', {
    from: 'A', to: 'B', amount: 100, idempotencyKey: crypto.randomUUID(),
  }).catch(e => e); // có thể lỗi mạng — không sao

  // Oracle: KHÔNG có transaction lệch trong sổ cái
  const dangling = await db.query(
    'SELECT transaction_id FROM entries GROUP BY transaction_id HAVING SUM(amount) <> 0');
  expect(dangling).toHaveLength(0);           // không bút toán nào lệch
  // Oracle: tiền bảo toàn dù giao dịch thất bại
  expect(await systemTotal(db)).toBe(totalBefore);
  expect(await db.balance('A')).toBe(500);    // A không mất tiền
});`,
      ),
      P(
        "Chú ý cách test này chủ động tiêm lỗi thay vì chờ lỗi xảy ra ngẫu nhiên. Kiểm thử doanh nghiệp nghiêm túc phải mô phỏng được thất bại hạ tầng, vì đó là lúc lỗi mất tiền hay xảy ra nhất. Oracle không quan tâm API trả về mã gì; nó quan tâm sổ cái có bị bỏ lại ở trạng thái lệch không và tiền của A có còn nguyên không. Nếu hệ thống dùng transaction cơ sở dữ liệu đúng cách, một trong hai điều phải xảy ra: cả hai bút toán được commit cùng lúc, hoặc cả hai bị rollback. AI có thể gợi ý thêm các điểm tiêm lỗi khác, nhưng oracle atomicity là bất biến con người khoá chặt.",
        "Note how this test actively injects a fault rather than waiting for one to occur randomly. Serious enterprise testing must be able to simulate infrastructure failures, because that is when money-losing bugs most often happen. The oracle does not care what code the API returns; it cares whether the ledger was left in an unbalanced state and whether A's money is intact. If the system uses database transactions correctly, one of two things must happen: both entries commit together, or both roll back. AI may suggest additional fault-injection points, but the atomicity oracle is an invariant humans lock down.",
        "このテストがランダムな障害を待つのではなく能動的に障害を注入する点に注目してください。真剣な企業テストはインフラ障害をシミュレートできねばなりません。資金損失バグが最も起きやすいのはその時だからです。オラクルは API が返すコードを気にせず、元帳が不均衡状態で残されたか、A の資金が無傷かを気にします。システムがデータベーストランザクションを正しく使えば、二つの仕訳が共にコミットされるか共にロールバックされるかのいずれかが起きねばなりません。AI は追加の障害注入点を提案できますが、原子性オラクルは人間が固定する不変条件です。",
      ),
      WARN(
        "Đừng test timeout chỉ bằng 'expect API trả 500'. Mã lỗi HTTP không nói gì về trạng thái sổ cái. Luôn kiểm trực tiếp: không có bút toán lệch, tiền bảo toàn, không ghi nửa vời.",
        "Don't test timeouts merely with 'expect API returns 500'. The HTTP error code says nothing about ledger state. Always check directly: no unbalanced entry, money conserved, no half-write.",
        "タイムアウトを「API が 500 を返すことを expect」だけでテストしないでください。HTTP エラーコードは元帳の状態を何も語りません。常に直接確認します。不均衡な仕訳なし、資金保存、半書き込みなし。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. Idempotency: yêu cầu gửi trùng chỉ tạo một trạng thái cuối",
      en: "8. Idempotency: a duplicated request yields one final state",
      ja: "8. 冪等性: 重複要求は一つの最終状態を生む",
    },
    blocks: [
      P(
        "Trong thực tế, một yêu cầu chuyển tiền có thể tới máy chủ nhiều lần: người dùng bấm hai lần, mạng chập chờn khiến client tự thử lại, hay một hàng đợi giao lại thông điệp. Nếu hệ thống ngây thơ, mỗi lần tới sẽ tạo một giao dịch, và khách hàng bị trừ tiền hai lần. Tính idempotent nghĩa là bất kể yêu cầu tới bao nhiêu lần với cùng idempotency key, kết quả cuối chỉ là một giao dịch. Oracle rất cụ thể: sau khi gửi trùng, số transaction có cùng key phải bằng đúng một, và số dư phải phản ánh đúng một lần chuyển.",
        "In reality, a transfer request may reach the server multiple times: the user clicks twice, a flaky network makes the client retry, or a queue redelivers the message. If the system is naive, each arrival creates a transaction, and the customer is charged twice. Idempotency means no matter how many times the request arrives with the same idempotency key, the final result is a single transaction. The oracle is very concrete: after a duplicate send, the number of transactions with that key must be exactly one, and the balance must reflect exactly one transfer.",
        "現実には送金要求が複数回サーバーに届き得ます。ユーザーが二度クリックする、不安定なネットワークでクライアントが再試行する、キューがメッセージを再配信する。システムが素朴だと到着ごとに取引が作られ、顧客は二重に課金されます。冪等性とは同じ idempotency key で要求が何度届いても最終結果が単一の取引になることです。オラクルは非常に具体的です。重複送信後、そのキーを持つ取引数はちょうど一つで、残高はちょうど一回の送金を反映せねばなりません。",
      ),
      CODE(
        "ts",
        `test('idempotency: gửi trùng cùng key → đúng 1 transaction (冪等性)', async ({ db, api }) => {
  await db.seedAccounts({ A: 500, B: 0 });
  const key = crypto.randomUUID();
  const body = { from: 'A', to: 'B', amount: 100, idempotencyKey: key };

  // Gửi 3 lần song song với CÙNG key
  const results = await Promise.all([
    api.post('/transfers', body),
    api.post('/transfers', body),
    api.post('/transfers', body),
  ]);

  // Oracle: đúng 1 transaction cho key này (không phải 3)
  const txns = await db.query(
    'SELECT id FROM transactions WHERE idempotency_key = $1', [key]);
  expect(txns).toHaveLength(1);
  // Oracle: số dư phản ánh đúng 1 lần chuyển
  expect(await db.balance('A')).toBe(400);
  expect(await db.balance('B')).toBe(100);
  // 3 phản hồi: đúng 1 lần "tạo mới", 2 lần trả lại kết quả cũ (không tạo thêm)
  const created = results.filter(r => r.status() === 201).length;
  expect(created).toBeLessThanOrEqual(1);
});`,
      ),
      P(
        "Bài test này gửi ba yêu cầu song song để mô phỏng cả tình huống đua (race condition), không chỉ gửi tuần tự. Đây là kiểu case mà AI hay bỏ sót khi sinh nháp, và cũng là chỗ kinh nghiệm con người tạo khác biệt: một reviewer giỏi sẽ hỏi 'thế nếu ba request tới cùng lúc chứ không phải nối đuôi thì sao?'. Ràng buộc UNIQUE trên idempotency_key ở tầng DB là tuyến phòng thủ cuối, nhưng test phải chứng minh rằng nó thật sự chặn được cả trường hợp đua, chứ không chỉ trường hợp gửi lần lượt.",
        "This test sends three parallel requests to simulate a race condition, not just sequential sends. This is the kind of case AI often misses when drafting, and where human experience makes the difference: a good reviewer asks 'what if three requests arrive simultaneously rather than back-to-back?'. The UNIQUE constraint on idempotency_key at the DB layer is the last line of defense, but the test must prove it truly blocks the race case too, not just the sequential case.",
        "このテストは逐次送信だけでなく競合状態(レースコンディション)もシミュレートするため三つの並列要求を送ります。これは AI が下書き時に見落としがちなケースであり、人間の経験が差を生む所です。優れたレビュアーは「三つの要求が連続ではなく同時に届いたら?」と問います。DB 層の idempotency_key への UNIQUE 制約が最後の防衛線ですが、テストは逐次ケースだけでなく競合ケースも本当に阻止することを証明せねばなりません。",
      ),
      QA(
        "Idempotency và atomicity khác nhau thế nào?",
        "How do idempotency and atomicity differ?",
        "Atomicity nói về một lần thực thi: hoặc toàn bộ giao dịch xảy ra, hoặc không gì cả — không có nửa vời. Idempotency nói về nhiều lần thực thi cùng yêu cầu: gửi bao nhiêu lần cũng cho đúng một kết quả cuối. Timeout kiểm atomicity; gửi trùng kiểm idempotency. Một hệ thống ngân hàng vững phải đảm bảo cả hai, và ta viết oracle riêng cho từng loại.",
        "Atomicity is about a single execution: either the whole transaction happens or nothing does — no half-way. Idempotency is about multiple executions of the same request: however many times you send it, you get exactly one final result. Timeout tests atomicity; duplicate tests idempotency. A robust banking system must guarantee both, and we write a separate oracle for each.",
        "原子性は単一の実行についてです。取引全体が起きるか何も起きないか、半端はなし。冪等性は同じ要求の複数回実行についてです。何度送っても最終結果はちょうど一つ。タイムアウトは原子性を、重複は冪等性をテストします。堅牢な銀行システムは両方を保証せねばならず、それぞれに別のオラクルを書きます。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Thất bại một phần và hoàn giao dịch (reversal)",
      en: "9. Partial failure and transaction reversal",
      ja: "9. 部分障害と取引の取消",
    },
    blocks: [
      P(
        "Reversal là nghiệp vụ hoàn một giao dịch đã ghi, ví dụ khi phát hiện chuyển nhầm hoặc gian lận. Điều quan trọng là reversal đúng không xoá bút toán cũ, vì xoá sẽ phá dấu vết kiểm toán. Thay vào đó, nó ghi thêm một cặp bút toán ngược dấu, sao cho hiệu ứng ròng của giao dịch gốc cộng giao dịch hoàn bằng không. Oracle net-zero ở đây kiểm rằng sau reversal, số dư của cả hai tài khoản trở về đúng như trước giao dịch gốc, trong khi sổ cái vẫn giữ đủ bốn bút toán để kiểm toán truy vết được toàn bộ lịch sử.",
        "Reversal is the business action of undoing a posted transaction, e.g. when a wrong transfer or fraud is detected. Crucially, a correct reversal does not delete the original entries, because deletion breaks the audit trail. Instead, it writes an additional pair of opposite-signed entries, so the net effect of the original plus the reversal is zero. The net-zero oracle here checks that after reversal, both accounts' balances return exactly to their pre-original state, while the ledger still keeps all four entries so audit can trace the full history.",
        "取消は記帳済み取引を取り消す業務です。例えば誤送金や不正が検出されたときです。重要なのは、正しい取消は元の仕訳を削除しないことです。削除は監査証跡を壊すからです。代わりに逆符号の仕訳の対を追加で書き、元取引と取消の正味効果がゼロになるようにします。ここでのネットゼロオラクルは、取消後に両勘定の残高が元取引前とちょうど同じに戻り、かつ元帳が監査で全履歴を追跡できるよう四つの仕訳すべてを保持することを確認します。",
      ),
      CODE(
        "ts",
        `test('reversal: net-zero + giữ đủ dấu vết kiểm toán (監査)', async ({ db, api }) => {
  await db.seedAccounts({ A: 500, B: 0 });
  const before = await systemTotal(db);

  const post = await api.post('/transfers', { from: 'A', to: 'B', amount: 100,
    idempotencyKey: crypto.randomUUID() });
  const txnId = (await post.json()).transactionId;

  const rev = await api.post(\`/transfers/\${txnId}/reverse\`, { reason: 'fraud' });
  expect(rev.status()).toBe(201);

  // Oracle net-zero: số dư trở về như ban đầu
  expect(await db.balance('A')).toBe(500);
  expect(await db.balance('B')).toBe(0);
  expect(await systemTotal(db)).toBe(before);
  // Oracle audit: KHÔNG xoá bút toán cũ — vẫn đủ 4 entry để truy vết
  const entries = await db.query(
    'SELECT COUNT(*)::int AS n FROM entries WHERE transaction_id IN ($1, $2)',
    [txnId, (await rev.json()).transactionId]);
  expect(entries[0].n).toBe(4);
});`,
      ),
      P(
        "Case này minh hoạ vì sao oracle nghiệp vụ phải phản ánh cả yêu cầu tuân thủ, không chỉ yêu cầu chức năng. Một reversal 'đúng về số dư' nhưng xoá mất bút toán gốc là sai theo góc kiểm toán, dù màn hình có thể trông ổn. Người kiểm thử ngân hàng phải hiểu rằng dấu vết kiểm toán là một phần của tính đúng đắn. Đây cũng là loại kiến thức miền mà AI khó tự suy ra; nó phải được con người mã hoá vào oracle và AI chỉ tái sử dụng.",
        "This case illustrates why business oracles must reflect compliance requirements too, not only functional ones. A reversal that is 'correct on balance' but deletes the original entries is wrong from an audit standpoint, even if the screen may look fine. A banking tester must understand that the audit trail is part of correctness. This is also the kind of domain knowledge AI struggles to derive on its own; it must be encoded into the oracle by humans and merely reused by AI.",
        "このケースは業務オラクルが機能要件だけでなくコンプライアンス要件も反映せねばならない理由を示します。「残高上は正しい」が元の仕訳を削除する取消は、画面上は問題なく見えても監査の観点では誤りです。銀行のテスターは監査証跡が正しさの一部であると理解せねばなりません。これも AI が独力で導くのが難しい種類のドメイン知識であり、人間がオラクルに符号化し AI はそれを再利用するだけです。",
      ),
      NOTE(
        "Trong ngân hàng, xoá dữ liệu gần như luôn sai. Sửa lỗi bằng bút toán bù (compensating entry), không bằng DELETE — để kiểm toán luôn dựng lại được lịch sử đầy đủ.",
        "In banking, deleting data is almost always wrong. Fix errors with a compensating entry, not a DELETE — so audit can always reconstruct the full history.",
        "銀行ではデータ削除はほぼ常に誤りです。DELETE ではなく相殺仕訳(compensating entry)で誤りを正します。監査が常に完全な履歴を再構築できるようにするためです。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Dữ liệu test: che dữ liệu nhạy cảm và tính tất định",
      en: "10. Test data: masking sensitive data and determinism",
      ja: "10. テストデータ: 機微データのマスクと決定性",
    },
    blocks: [
      P(
        "Dữ liệu là mắt xích dễ gãy nhất trong kiểm thử ngân hàng. Không được dùng dữ liệu khách hàng thật trong môi trường test vì lý do bảo mật và tuân thủ; số thẻ, số căn cước, thông tin liên hệ phải được che hoặc thay bằng dữ liệu giả có cấu trúc hợp lệ. Đồng thời dữ liệu seed phải tất định: cùng một bộ seed cho ra cùng một trạng thái ban đầu, nếu không test sẽ flaky vì lý do ngoài code. Khi AI đề xuất dữ liệu biên, con người phải kiểm rằng dữ liệu đó không vô tình chứa thông tin thật và không phá tính tất định.",
        "Data is the most fragile link in banking testing. Real customer data must not be used in test environments for security and compliance; card numbers, national IDs, contact details must be masked or replaced with structurally-valid fake data. At the same time seed data must be deterministic: the same seed yields the same initial state, otherwise tests are flaky for reasons outside the code. When AI proposes boundary data, humans must verify it doesn't accidentally contain real information and doesn't break determinism.",
        "データは銀行テストで最も脆い連結点です。セキュリティとコンプライアンスのため実顧客データをテスト環境で使ってはならず、カード番号・身分証番号・連絡先はマスクするか構造的に妥当な偽データに置き換えねばなりません。同時にシードデータは決定的でなければなりません。同じシードが同じ初期状態を生まないと、コード外の理由でテストがフレーキーになります。AI が境界データを提案するとき、人間はそれが誤って実情報を含まず決定性を壊さないことを検証せねばなりません。",
      ),
      CODE(
        "ts",
        `// Sinh dữ liệu test tất định + che dữ liệu nhạy cảm
import { faker } from '@faker-js/faker';

export function makeSeed(seedNum: number) {
  faker.seed(seedNum); // TẤT ĐỊNH: cùng seedNum → cùng dữ liệu
  return {
    // Số thẻ test hợp lệ Luhn nhưng KHÔNG phải thẻ thật
    cardNumber: '4242424242424242',
    holder: faker.person.fullName(),
    // Không bao giờ nhét PII thật; mọi giá trị đều tổng hợp
    nationalId: 'TEST-' + faker.string.numeric(9),
    accounts: [
      { id: 'A', currency: 'VND', openingBalance: 500_00 }, // 500.00
      { id: 'B', currency: 'VND', openingBalance: 0 },
    ],
  };
}`,
      ),
      P(
        "Việc cố định seed cho faker là một mẹo nhỏ nhưng có tác động lớn: nó biến dữ liệu 'ngẫu nhiên' thành dữ liệu tái lập được, nhờ đó khi một test đỏ, ta có thể chạy lại y hệt để điều tra. Nếu dữ liệu thay đổi mỗi lần chạy, ta không bao giờ chắc lỗi là do code hay do một giá trị dữ liệu xui rủi. Tính tất định của dữ liệu chính là điều kiện tiên quyết để oracle có ý nghĩa; một oracle chạy trên dữ liệu ngẫu nhiên không kiểm soát thì bản thân nó cũng trở nên khó tin.",
        "Pinning faker's seed is a small trick with big impact: it turns 'random' data into reproducible data, so when a test goes red we can rerun it identically to investigate. If data changes every run, we can never be sure whether the failure is due to code or an unlucky data value. Data determinism is the precondition for oracles to be meaningful; an oracle running on uncontrolled random data becomes untrustworthy itself.",
        "faker のシードを固定するのは小さいが影響の大きいコツです。「ランダム」なデータを再現可能なデータに変え、テストが赤になったとき同一に再実行して調査できます。データが実行ごとに変わると、失敗がコードによるものか運の悪いデータ値によるものか確信できません。データの決定性はオラクルが意味を持つための前提条件です。制御されないランダムデータ上で走るオラクルはそれ自体が信頼できなくなります。",
      ),
      WARN(
        "Không bao giờ copy dump production vào môi trường test dù 'chỉ để test nhanh'. Đó là vi phạm tuân thủ và rủi ro rò rỉ PII nghiêm trọng. Luôn dùng dữ liệu tổng hợp đã che.",
        "Never copy a production dump into test, even 'just to test quickly'. That is a compliance breach and a serious PII leakage risk. Always use masked synthetic data.",
        "「すぐテストするだけ」でも本番ダンプをテストにコピーしないでください。コンプライアンス違反であり深刻な PII 漏洩リスクです。常にマスクされた合成データを使います。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Cổng CI: chặn merge nếu oracle nghiệp vụ đỏ",
      en: "11. CI gate: block merge if a business oracle is red",
      ja: "11. CI ゲート: 業務オラクルが赤ならマージを阻止",
    },
    blocks: [
      P(
        "Toàn bộ giá trị của oracle sẽ tan biến nếu người ta có thể merge khi oracle đang đỏ. Vì thế cổng CI phải bắt buộc: mọi pull request chạm vào module tiền phải chạy trọn bộ regression, và chỉ merge được khi tất cả oracle nghiệp vụ xanh. Đặc biệt, gate phải chạy một tập oracle 'chốt' được viết tay, không do AI sinh, như một lớp kiểm tra độc lập. Nếu code do AI hỗ trợ vô tình làm hỏng một bất biến, chính lớp chốt độc lập này sẽ bắt được, ngay cả khi phần test AI sinh bị lỗi cùng chiều.",
        "The entire value of oracles evaporates if people can merge while an oracle is red. So the CI gate must be mandatory: every pull request touching a money module runs the full regression, and merge is allowed only when all business oracles are green. In particular, the gate must run a hand-written 'anchor' oracle set, not AI-generated, as an independent check layer. If AI-assisted code accidentally breaks an invariant, this independent anchor layer catches it, even if the AI-generated tests fail in the same direction.",
        "オラクルの価値全体は、オラクルが赤のままマージできれば消え去ります。ゆえに CI ゲートは必須でなければなりません。資金モジュールに触れる全プルリクエストは完全な回帰を実行し、すべての業務オラクルがグリーンのときのみマージが許されます。特にゲートは AI 生成でない手書きの「拠り所」オラクル群を独立した検査層として実行せねばなりません。AI 支援コードが誤って不変条件を壊しても、AI 生成テストが同じ方向に失敗しても、この独立した拠り所層が捕えます。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/banking-regression.yml — gate cho module tiền
name: banking-regression
on: [pull_request]
jobs:
  regression:
    runs-on: ubuntu-latest
    environment: test              # KHÔNG dùng secret production
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      # 1) Test regression (có phần AI hỗ trợ sinh — đã review)
      - run: npx playwright test tests/regression --reporter=github
      # 2) Bộ oracle "chốt" ĐỘC LẬP, viết tay, không do AI sinh
      - run: npm run test:invariants   # Σ nợ=có · tiền bảo toàn · idempotent
      # 3) Chặn merge nếu bất kỳ oracle nghiệp vụ nào đỏ
        env:
          BASE_URL: \${{ vars.STAGING_URL }}
          FAIL_ON_ORACLE_RED: 'true'`,
      ),
      P(
        "Có một chi tiết tổ chức quan trọng: bộ oracle chốt nên do người có kinh nghiệm nghiệp vụ sở hữu và ít thay đổi, trong khi tập test do AI hỗ trợ có thể biến động nhanh theo tính năng. Tách hai lớp này giúp bạn tin tưởng rằng dù phần AI hỗ trợ có sai, lớp chốt vẫn đứng vững. Đây là ứng dụng cụ thể của nguyên tắc phòng thủ nhiều lớp trong bối cảnh có AI tham gia: đừng để cùng một nguồn vừa sinh code vừa sinh tiêu chuẩn đánh giá code đó.",
        "There's an important organizational detail: the anchor oracle set should be owned by experienced business people and change rarely, while the AI-assisted test set can churn quickly with features. Separating these two layers lets you trust that even if the AI-assisted part is wrong, the anchor layer stands firm. This is a concrete application of defense-in-depth in an AI-involved context: don't let the same source both generate the code and generate the standard by which that code is judged.",
        "重要な組織上の詳細があります。拠り所オラクル群は業務経験ある人が所有しめったに変えず、AI 支援テスト群は機能に応じて素早く変動してよいのです。この二層を分離することで、AI 支援部分が誤っても拠り所層が揺るがないと信頼できます。これは AI が関与する文脈での多層防御の具体的応用です。同じ源にコードの生成とそのコードを判断する基準の生成の両方をさせてはなりません。",
      ),
      TIP(
        "Cho oracle chốt chạy như một job riêng, đỏ là chặn merge cứng. Đừng gộp nó vào cùng job với test AI sinh — tách ra để một sự cố không che lấp sự cố khác.",
        "Run the anchor oracle as a separate job that hard-blocks merge when red. Don't merge it into the same job as AI-generated tests — separate them so one failure doesn't mask another.",
        "拠り所オラクルは赤のときマージを固く阻止する別ジョブとして実行してください。AI 生成テストと同じジョブに統合せず、一つの障害が別の障害を隠さないよう分離します。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ranh giới AI-agent: guardrails cho môi trường ngân hàng",
      en: "12. AI-agent boundary: guardrails for the banking environment",
      ja: "12. AI エージェントの境界: 銀行環境のガードレール",
    },
    blocks: [
      P(
        "Khi cho một AI-agent chạy trong quy trình ngân hàng, guardrails phải khắt khe hơn bình thường. Agent chỉ được kết nối tới môi trường test cô lập, không bao giờ chạm khoá thật hay dữ liệu khách hàng. Agent không được thực hiện thao tác không hoàn nguyên như gửi tiền, xoá tài khoản, hay thay đổi cấu hình rủi ro. Mọi thay đổi code agent đề xuất phải đi qua pull request có người duyệt. Và quan trọng nhất, agent không bao giờ được phép nới lỏng oracle nghiệp vụ để làm test xanh; nếu test đỏ vì oracle, đó là tín hiệu cho con người, không phải việc để agent tự 'sửa'.",
        "When an AI-agent runs in a banking process, guardrails must be stricter than usual. The agent connects only to an isolated test environment, never touching real keys or customer data. The agent must not perform irreversible actions like sending money, deleting accounts, or changing risk configuration. Every code change the agent proposes must go through a human-reviewed pull request. And most importantly, the agent must never be allowed to loosen a business oracle to make a test green; if a test is red because of the oracle, that is a signal for a human, not something for the agent to 'fix' itself.",
        "AI エージェントが銀行の工程で動くとき、ガードレールは通常より厳しくせねばなりません。エージェントは隔離されたテスト環境にのみ接続し、実鍵や顧客データに決して触れません。送金・口座削除・リスク設定変更のような不可逆操作をしてはなりません。エージェントが提案する全コード変更は人間のレビュー付きプルリクエストを通さねばなりません。そして最も重要なのは、テストをグリーンにするため業務オラクルを緩めることを決して許されないことです。オラクルのせいでテストが赤なら、それは人間への信号であり、エージェントが自ら「修正」するものではありません。",
      ),
      UL(
        [
          "AI được làm: đọc diff, đề xuất case, sinh nháp test dùng oracle có sẵn, tóm tắt trace, gợi ý dữ liệu biên.",
          "AI KHÔNG được: chạm production, nới lỏng oracle tiền, gửi tiền/xoá tài khoản, tự merge, quyết định skip luồng nhạy cảm.",
          "Con người giữ: định nghĩa oracle bút toán kép, sở hữu bộ oracle chốt, duyệt mọi PR, chốt gate CI.",
        ],
        [
          "AI may: read diffs, propose cases, draft tests using existing oracles, summarize traces, suggest boundary data.",
          "AI may NOT: touch production, loosen money oracles, send money/delete accounts, self-merge, decide to skip sensitive flows.",
          "Humans hold: define the double-entry oracle, own the anchor oracle set, review every PR, gate CI.",
        ],
        [
          "AI が可: 差分の読解、ケース提案、既存オラクルを使うテストの下書き、トレース要約、境界データの提案。",
          "AI が不可: 本番への接触、資金オラクルの緩和、送金・口座削除、自己マージ、機微フローのスキップ判断。",
          "人間が保持: 複式簿記オラクルの定義、拠り所オラクル群の所有、全 PR のレビュー、CI ゲートの管理。",
        ],
      ),
      P(
        "Cách diễn đạt ngắn gọn nhất là: agent có quyền cơ học rộng nhưng quyền phán đoán về tiền bằng không. Mỗi khi bạn định để agent tự quyết, hãy hỏi liệu quyết định đó có chạm tới tiền, quyền truy cập, tuân thủ hay tính tất định không. Nếu có, con người phải giữ. Chính ranh giới rõ ràng này biến AI từ một rủi ro tiềm tàng thành một trợ thủ đáng tin trong môi trường nhạy cảm bậc nhất.",
        "The most concise framing is: the agent gets broad mechanical authority but zero judgment authority over money. Every time you're about to let the agent decide, ask whether that decision touches money, access, compliance, or determinism. If yes, the human must hold it. This clear boundary is exactly what turns AI from a latent risk into a trustworthy assistant in one of the most sensitive environments.",
        "最も簡潔な捉え方はこうです。エージェントには広い機械的権限を、しかし資金に関する判断権限はゼロを。エージェントに決めさせようとするたびに、その判断が資金・アクセス権・コンプライアンス・決定性に触れるか問いましょう。もしそうなら人間が握らねばなりません。この明確な境界こそが、最も機微な環境の一つで AI を潜在的リスクから信頼できる助手へと変えます。",
      ),
      QA(
        "Bạn có bao giờ để AI-agent tự merge test nó sinh không?",
        "Would you ever let an AI-agent self-merge tests it generated?",
        "Không, đặc biệt với module tiền. Agent có thể mở PR nhưng con người phải duyệt. Lý do: agent có thể assert một điều kiện dễ dãi làm test xanh mà không phản ánh bất biến thật, hoặc vô tình nới lỏng oracle. Một reviewer kinh nghiệm kiểm rằng assertion neo vào bút toán kép, tiền bảo toàn, idempotency — rồi mới merge. Guardrails này không làm chậm đáng kể mà bảo vệ khỏi lớp lỗi đắt nhất.",
        "No, especially for money modules. The agent may open a PR but a human must approve. Reason: the agent might assert a lax condition that goes green without reflecting a real invariant, or accidentally loosen the oracle. An experienced reviewer checks the assertion is anchored to double-entry, money conservation, idempotency — then merges. This guardrail doesn't slow things meaningfully but protects against the costliest class of bug.",
        "いいえ、特に資金モジュールでは。エージェントは PR を開けますが人間が承認せねばなりません。理由: エージェントは実際の不変条件を反映せずグリーンになる甘い条件をアサートしたり、誤ってオラクルを緩めたりしかねません。経験あるレビュアーはアサーションが複式簿記・資金保存・冪等性に接地しているか確認してからマージします。このガードレールは大きく遅らせず最も高くつくバグ層から守ります。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: chứng minh bạn hiểu oracle tài chính",
      en: "13. Interview angle: proving you understand financial oracles",
      ja: "13. 面接の観点: 金融オラクルの理解を示す",
    },
    blocks: [
      P(
        "Khi phỏng vấn vị trí QA cho ngân hàng, câu hỏi hay nhất thường không phải 'bạn dùng công cụ gì' mà 'bạn chứng minh một chuyển khoản đúng như thế nào'. Câu trả lời yếu dừng ở 'kiểm tra màn hình hiện thành công'. Câu trả lời mạnh nói về bất biến: bút toán kép cân, tiền bảo toàn, idempotent khi retry, atomic khi timeout, net-zero khi reversal, và giữ dấu vết kiểm toán. Nếu bạn có thể diễn đạt các bất biến này bằng lời rồi minh hoạ bằng một đoạn code oracle ngắn, bạn đã tách mình khỏi phần lớn ứng viên.",
        "When interviewing for a banking QA role, the best question is usually not 'what tools do you use' but 'how do you prove a transfer is correct'. A weak answer stops at 'check the screen shows success'. A strong answer talks invariants: double-entry balances, money conserved, idempotent on retry, atomic on timeout, net-zero on reversal, and preserving the audit trail. If you can state these invariants in words then illustrate with a short oracle snippet, you separate yourself from most candidates.",
        "銀行の QA 職の面接では、最良の質問は通常「どのツールを使うか」ではなく「送金が正しいことをどう証明するか」です。弱い回答は「画面が成功と表示するか確認する」で止まります。強い回答は不変条件を語ります。複式簿記の均衡、資金保存、再試行時の冪等、タイムアウト時の原子性、取消時のネットゼロ、監査証跡の保持。これらの不変条件を言葉で述べ短いオラクルのコード片で示せれば、多くの候補者から抜きん出ます。",
      ),
      P(
        "Câu hỏi tiếp theo thường xoáy vào AI: 'bạn dùng AI trong kiểm thử ngân hàng thế nào cho an toàn?'. Ở đây nhà tuyển dụng muốn nghe bạn phân biệt rạch ròi giữa việc AI tăng tốc và AI quyết định. Bạn nói rằng AI giúp sinh nháp, tóm tắt trace, mở rộng ma trận case, nhưng oracle nghiệp vụ và quyết định merge luôn nằm ở con người. Bạn nhắc tới guardrails như cô lập môi trường, cấm thao tác không hoàn nguyên, không cho AI nới oracle, và bộ oracle chốt độc lập. Đó là dấu hiệu bạn hiểu cả cơ hội lẫn rủi ro của AI.",
        "The follow-up usually pivots to AI: 'how do you use AI in banking testing safely?'. Here the employer wants to hear you draw a sharp line between AI accelerating and AI deciding. You say AI helps draft, summarize traces, expand the case matrix, but the business oracle and the merge decision always stay with humans. You mention guardrails like environment isolation, forbidding irreversible actions, not letting AI loosen the oracle, and an independent anchor oracle set. That signals you understand both the opportunity and the risk of AI.",
        "続く質問は通常 AI に移ります。「銀行テストで AI をどう安全に使うか」。ここで雇用主は、AI が加速することと AI が決めることの間に鋭い線を引くのを聞きたいのです。AI は下書き・トレース要約・ケースマトリクスの拡大を助けるが、業務オラクルとマージの判断は常に人間に残ると述べます。環境の隔離、不可逆操作の禁止、AI にオラクルを緩めさせない、独立した拠り所オラクル群といったガードレールに触れます。それが AI の機会とリスクの両方を理解している証です。",
      ),
      SCEN(
        "Phỏng vấn tình huống: 'Test xanh hết nhưng khách báo mất tiền. Bạn làm gì?'",
        "Situational interview: 'All tests green but a customer reports lost money. What do you do?'",
        "Đầu tiên tôi nghi ngờ oracle, không nghi ngờ khách. Test xanh mà tiền mất nghĩa là oracle của tôi không phủ được lỗi này — có thể tôi chỉ assert UI 'thành công' thay vì assert sổ cái cân. Tôi tái hiện giao dịch của khách, kiểm tổng bút toán và tổng hệ thống, tìm transaction lệch hoặc rò rỉ. Sau khi tìm ra lỗi, tôi thêm một oracle mới bắt đúng lớp lỗi đó, rồi mới sửa code. Bài học: một lỗi lọt qua là bằng chứng oracle còn lỗ hổng, và AI không thể tự vá lỗ hổng đó cho tôi.",
        "First I suspect the oracle, not the customer. Green tests yet lost money means my oracle failed to cover this bug — perhaps I only asserted a UI 'success' instead of asserting the ledger balances. I reproduce the customer's transaction, check entry sums and the system total, hunt for an unbalanced transaction or leakage. After finding the bug, I add a new oracle that catches exactly that class, then fix the code. Lesson: an escaped bug is evidence the oracle still has a hole, and AI cannot patch that hole for me.",
        "まず私は顧客ではなくオラクルを疑います。テストがグリーンなのに資金が失われたのは、私のオラクルがこのバグを網羅できなかったことを意味します。おそらく元帳の均衡ではなく UI の「成功」だけをアサートしたのです。顧客の取引を再現し、仕訳合計とシステム合計を確認し、不均衡な取引や漏洩を探します。バグを見つけたら、まさにその層を捕える新しいオラクルを追加し、その後コードを修正します。教訓: 漏れたバグはオラクルにまだ穴がある証拠であり、AI がその穴を私の代わりに塞ぐことはできません。",
      ),
      NOTE(
        "Thông điệp cốt lõi: người kiểm thử ngân hàng giỏi trong kỷ nguyên AI không phải người gõ test nhanh nhất, mà người định nghĩa oracle tài chính sắc bén nhất và giữ vững ranh giới không cho AI chạm vào phần phán đoán.",
        "Core message: the strong banking tester in the AI era is not the fastest test typist but the one who defines the sharpest financial oracles and firmly holds the line keeping AI away from judgment.",
        "核心メッセージ: AI 時代の優れた銀行テスターは最速のテストタイピストではなく、最も鋭い金融オラクルを定義し、AI を判断から遠ざける線を固く守る人です。",
      ),
    ],
  },
];

// ===========================================================================
// ARTICLE B — Engine bồi thường bảo hiểm có AI, oracle bảng quyết định
// ===========================================================================
const pagesB = [
  {
    heading: {
      vi: "1. Bối cảnh: engine bồi thường bảo hiểm và vì sao khó kiểm thử",
      en: "1. Context: the insurance claims engine and why it's hard to test",
      ja: "1. 背景: 保険金請求エンジンとテストが難しい理由",
    },
    blocks: [
      P(
        "Một engine bồi thường bảo hiểm quyết định mỗi hồ sơ được duyệt, bị từ chối hay cần con người xem lại, và trả bao nhiêu tiền. Đây là logic nghiệp vụ dày đặc điều kiện: phạm vi bảo hiểm (coverage), điều khoản loại trừ (exclusion), hạn mức (limit), mức miễn thường (deductible), và cờ nghi ngờ gian lận (fraud flag). Sự phức tạp không nằm ở giao diện mà ở tổ hợp điều kiện: hàng chục quy tắc giao nhau, và một sai sót nhỏ có thể khiến công ty trả nhầm hàng tỉ hoặc từ chối oan một khách hàng hợp lệ. Bài này trình bày cách dùng bảng quyết định làm oracle và cho AI mở rộng case biên mà không đánh mất nguồn sự thật.",
        "An insurance claims engine decides whether each claim is approved, denied, or needs human review, and how much to pay. This is business logic dense with conditions: coverage, exclusions, limits, deductibles, and fraud flags. The complexity is not in the UI but in the combination of conditions: dozens of rules intersecting, and a small mistake can make the company overpay billions or wrongly deny a legitimate customer. This article shows how to use a decision table as the oracle and let AI expand edge cases without losing the source of truth.",
        "保険金請求エンジンは各請求が承認・却下・人間の確認が必要のいずれかを決め、いくら支払うかを決めます。これは条件が密集した業務ロジックです。補償範囲(coverage)、免責条項(exclusion)、限度額(limit)、免責額(deductible)、不正フラグ(fraud flag)。複雑さは UI ではなく条件の組み合わせにあります。何十もの規則が交差し、小さな誤りが会社に数十億の過払いや正当な顧客への不当な却下をさせかねません。本記事は決定表をオラクルとして使い、真実の源を失わずに AI に境界ケースを拡大させる方法を示します。",
      ),
      P(
        "Về quy mô và tuân thủ, engine này xử lý lượng lớn hồ sơ mỗi ngày với yêu cầu công bằng và minh bạch: mỗi quyết định phải giải thích được, phải lưu vết kiểm toán, và phải nhất quán giữa các hồ sơ tương tự để tránh phân biệt đối xử. Cơ quan quản lý bảo hiểm có thể yêu cầu công ty chứng minh vì sao một hồ sơ bị từ chối. Vì thế test không chỉ kiểm 'kết quả đúng' mà còn kiểm 'lý do đúng' và 'nhất quán'. Đây là bối cảnh lý tưởng cho oracle dạng bảng quyết định, nơi mỗi kết quả gắn với một quy tắc rõ ràng, giải thích được.",
        "On scale and compliance, this engine processes large volumes of claims daily with fairness and transparency requirements: every decision must be explainable, must leave an audit trail, and must be consistent across similar claims to avoid discrimination. An insurance regulator may require the company to justify why a claim was denied. So testing checks not only 'the outcome is correct' but 'the reason is correct' and 'it is consistent'. This is an ideal context for a decision-table oracle, where each outcome maps to a clear, explainable rule.",
        "規模とコンプライアンスの面で、このエンジンは公平性と透明性の要件のもと日々大量の請求を処理します。すべての判断は説明可能で、監査証跡を残し、差別を避けるため類似の請求間で一貫していなければなりません。保険規制当局は請求が却下された理由の正当化を会社に求めることがあります。ゆえにテストは「結果が正しい」だけでなく「理由が正しい」「一貫している」も確認します。これは各結果が明確で説明可能な規則に対応する決定表オラクルにとって理想的な文脈です。",
      ),
      IMG(
        SVG_CLAIM_STATE,
        "Vòng đời hồ sơ bồi thường; bảng quyết định là oracle; LLM mở rộng case, bảng giữ sự thật.",
        "Claim lifecycle; the decision table is the oracle; the LLM expands cases, the table holds truth.",
        "請求のライフサイクル。決定表がオラクル。LLM がケースを拡大し、表が真実を保持。",
      ),
      NOTE(
        "Trong bảo hiểm, 'đúng kết quả' chưa đủ; phải 'đúng lý do' và 'nhất quán'. Bảng quyết định vừa cho kết quả vừa cho lý do có thể giải thích, nên là oracle lý tưởng cho miền này.",
        "In insurance, 'correct outcome' isn't enough; it must be the 'correct reason' and 'consistent'. A decision table gives both the outcome and an explainable reason, making it the ideal oracle for this domain.",
        "保険では「正しい結果」だけでは不十分で、「正しい理由」「一貫性」が必要です。決定表は結果と説明可能な理由の両方を与えるため、この領域に理想的なオラクルです。",
      ),
    ],
  },
  {
    heading: {
      vi: "2. Trạng thái hồ sơ và các quy tắc nghiệp vụ",
      en: "2. Claim states and business rules",
      ja: "2. 請求の状態と業務規則",
    },
    blocks: [
      P(
        "Trước khi lập bảng quyết định, phải hiểu vòng đời hồ sơ. Một hồ sơ đi qua các trạng thái: SUBMITTED khi khách nộp, TRIAGED khi được phân loại và thu thập dữ kiện, DECISION khi engine áp bảng quyết định, rồi rẽ thành APPROVED, DENIED hoặc REVIEW nếu cần con người. Hồ sơ được duyệt sẽ tính payout rồi chuyển PAID. Mỗi bước chuyển trạng thái đều có điều kiện, và test phải bao phủ cả các chuyển hợp lệ lẫn các chuyển bị cấm, ví dụ không được nhảy thẳng từ SUBMITTED sang PAID mà bỏ qua bước áp bảng quyết định.",
        "Before building the decision table, understand the claim lifecycle. A claim moves through states: SUBMITTED when filed, TRIAGED when categorized and facts gathered, DECISION when the engine applies the decision table, then branching to APPROVED, DENIED, or REVIEW if a human is needed. An approved claim computes payout then moves to PAID. Each transition has conditions, and testing must cover both valid transitions and forbidden ones, e.g. you must not jump straight from SUBMITTED to PAID skipping the decision-table step.",
        "決定表を構築する前に請求のライフサイクルを理解します。請求は状態を移ります。提出時の SUBMITTED、分類・事実収集の TRIAGED、エンジンが決定表を適用する DECISION、そして APPROVED・DENIED・人間が必要なら REVIEW へ分岐。承認された請求は支払額を計算し PAID へ移ります。各遷移には条件があり、テストは有効な遷移と禁止された遷移の両方を網羅せねばなりません。例えば決定表のステップを飛ばして SUBMITTED から PAID へ直接跳んではなりません。",
      ),
      CODE(
        "ts",
        `// Kiểu dữ liệu hồ sơ bồi thường & các quy tắc điều kiện
type ClaimState = 'SUBMITTED' | 'TRIAGED' | 'DECISION'
                | 'APPROVED' | 'DENIED' | 'REVIEW' | 'PAID';

interface Claim {
  id: string;
  policyActive: boolean;      // hợp đồng còn hiệu lực?
  claimType: 'collision' | 'flood' | 'theft' | 'fire';
  amount: number;            // số tiền yêu cầu (cents)
  coverageLimit: number;     // hạn mức cho loại này
  deductible: number;        // mức miễn thường
  excludedPerils: string[];  // hiểm hoạ bị loại trừ theo hợp đồng
  fraudScore: number;        // 0..100 — >70 gắn cờ REVIEW
}

// Chuyển trạng thái hợp lệ (mọi chuyển khác đều bị cấm)
const ALLOWED: Record<ClaimState, ClaimState[]> = {
  SUBMITTED: ['TRIAGED'], TRIAGED: ['DECISION'],
  DECISION: ['APPROVED', 'DENIED', 'REVIEW'],
  APPROVED: ['PAID'], DENIED: [], REVIEW: ['APPROVED', 'DENIED'], PAID: [],
};`,
      ),
      P(
        "Các quy tắc nghiệp vụ chính gồm năm nhóm. Coverage: loại tổn thất có nằm trong phạm vi bảo hiểm của hợp đồng không. Exclusion: có rơi vào điều khoản loại trừ như thiên tai không được bảo hiểm không. Limit: số tiền yêu cầu có vượt hạn mức không. Deductible: sau khi duyệt, khách phải tự chịu phần miễn thường, nên payout bằng số tiền được duyệt trừ đi mức miễn thường và không bao giờ âm. Fraud flag: nếu điểm nghi ngờ gian lận cao, hồ sơ phải chuyển REVIEW cho con người dù các điều kiện khác đều đạt. Năm nhóm này chính là các cột điều kiện của bảng quyết định.",
        "The main business rules fall into five groups. Coverage: is the loss type within the policy's scope. Exclusion: does it fall under an exclusion clause like an uninsured natural disaster. Limit: does the claimed amount exceed the limit. Deductible: after approval, the customer bears the deductible, so payout equals the approved amount minus the deductible and is never negative. Fraud flag: if the fraud suspicion score is high, the claim must move to REVIEW for a human even if all other conditions pass. These five groups are precisely the condition columns of the decision table.",
        "主な業務規則は五つのグループに分かれます。補償: 損失の種類が保険の範囲内か。免責: 未加入の自然災害のような免責条項に該当するか。限度: 請求額が限度を超えるか。免責額: 承認後、顧客が免責額を負担するため、支払額は承認額から免責額を引いた値で決して負にならない。不正フラグ: 不正疑いスコアが高ければ、他の条件がすべて満たされても請求は人間の REVIEW へ移らねばならない。これら五つのグループがまさに決定表の条件列です。",
      ),
      TIP(
        "Vẽ vòng đời trạng thái trước khi viết test. Nhiều lỗi bảo hiểm nằm ở chuyển trạng thái bị cấm (ví dụ duyệt lại hồ sơ đã PAID) chứ không ở logic điều kiện.",
        "Draw the state lifecycle before writing tests. Many insurance bugs live in forbidden transitions (e.g. re-approving a PAID claim) rather than in the condition logic.",
        "テストを書く前に状態のライフサイクルを描いてください。多くの保険バグは条件ロジックではなく禁止された遷移(例: PAID の請求の再承認)にあります。",
      ),
    ],
  },
  {
    heading: {
      vi: "3. Bảng quyết định làm oracle: nguồn sự thật duy nhất",
      en: "3. The decision table as oracle: the single source of truth",
      ja: "3. オラクルとしての決定表: 唯一の真実の源",
    },
    blocks: [
      P(
        "Bảng quyết định (decision table) là một bảng liệt kê mọi tổ hợp điều kiện đầu vào và kết quả tương ứng. Mỗi cột là một quy tắc; mỗi hàng là một điều kiện; ô giao nhau cho biết điều kiện đó cần đúng, sai hay không quan trọng cho quy tắc đó; và hàng cuối là kết quả. Sức mạnh của nó với kiểm thử là biến logic mờ trong đầu người thành một tạo tác rõ ràng, kiểm tra được. Khi ta biến bảng thành oracle, mỗi hồ sơ đầu vào chỉ cần tra bảng để biết kết quả đúng, và test so kết quả engine với kết quả bảng.",
        "A decision table lists every combination of input conditions and the corresponding outcome. Each column is a rule; each row a condition; the intersecting cell says whether that condition must be true, false, or doesn't matter for that rule; and the last row is the outcome. Its power for testing is turning fuzzy logic in people's heads into a clear, checkable artifact. When we make the table the oracle, each input claim just looks up the table for the correct outcome, and the test compares the engine's outcome against the table's.",
        "決定表は入力条件のあらゆる組み合わせと対応する結果を列挙します。各列が規則、各行が条件、交差するセルはその条件が真・偽・不問のいずれかを示し、最後の行が結果です。テストにおける強みは、人の頭の中の曖昧なロジックを明確で検査可能な成果物に変えることです。表をオラクルにすると、各入力請求は表を引いて正しい結果を知り、テストはエンジンの結果を表の結果と比較します。",
      ),
      IMG(
        SVG_DECISION_TABLE,
        "Bảng quyết định bồi thường: mỗi cột là một quy tắc = một test case; bảng phải đầy đủ & không mâu thuẫn.",
        "The claims decision table: each column is a rule = one test case; the table must be complete and non-contradictory.",
        "請求の決定表: 各列が規則=一つのテストケース。表は完全かつ矛盾がないこと。",
      ),
      CODE(
        "ts",
        `// Bảng quyết định = nguồn sự thật. Engine PHẢI khớp bảng này.
type Outcome = { decision: 'APPROVE' | 'DENY' | 'REVIEW'; reason: string };

export function decisionOracle(c: Claim): Outcome {
  if (c.fraudScore > 70) return { decision: 'REVIEW', reason: 'FRAUD_FLAG' };
  if (!c.policyActive)   return { decision: 'DENY',   reason: 'POLICY_INACTIVE' };
  if (c.excludedPerils.includes(c.claimType))
                         return { decision: 'DENY',   reason: 'EXCLUSION' };
  if (c.amount > c.coverageLimit)
                         return { decision: 'DENY',   reason: 'OVER_LIMIT' };
  return { decision: 'APPROVE', reason: 'COVERED' };
}

// Payout áp SAU khi APPROVE: min(claim, limit) − deductible, không âm
export function payout(c: Claim): number {
  if (decisionOracle(c).decision !== 'APPROVE') return 0;
  return Math.max(0, Math.min(c.amount, c.coverageLimit) - c.deductible);
}`,
      ),
      P(
        "Chú ý thứ tự các điều kiện trong oracle: cờ gian lận được kiểm trước tiên, vì dù mọi điều kiện khác đạt, một hồ sơ nghi gian lận vẫn phải chuyển con người xem lại, không được auto-approve. Thứ tự này chính là một phần của quy tắc nghiệp vụ và phải được ghi rõ trong bảng, không để engine tự quyết ngầm. Bảng quyết định vừa là đặc tả vừa là oracle: nó nói cho lập trình viên biết engine phải làm gì, và nói cho người kiểm thử biết kết quả đúng là gì. Một nguồn sự thật duy nhất cho cả hai vai trò.",
        "Note the order of conditions in the oracle: the fraud flag is checked first, because even if all other conditions pass, a fraud-suspect claim must still go to human review and not auto-approve. This ordering is itself part of the business rule and must be spelled out in the table, not left for the engine to decide implicitly. The decision table is both spec and oracle: it tells the developer what the engine must do, and tells the tester what the correct outcome is. A single source of truth for both roles.",
        "オラクル内の条件の順序に注目してください。不正フラグが最初に確認されます。他のすべての条件が満たされても、不正疑いの請求は人間の確認へ行くべきで自動承認してはならないからです。この順序自体が業務規則の一部であり、エンジンに暗黙的に決めさせるのではなく表に明記せねばなりません。決定表は仕様でありオラクルでもあります。開発者にエンジンが何をすべきかを伝え、テスターに正しい結果が何かを伝えます。両役割にとって唯一の真実の源です。",
      ),
      QA(
        "Vì sao dùng bảng quyết định làm oracle thay vì viết assertion rời cho từng case?",
        "Why use a decision table as oracle instead of writing separate assertions per case?",
        "Vì bảng quyết định buộc ta nghĩ đầy đủ và không mâu thuẫn. Khi liệt kê mọi tổ hợp điều kiện, ta phát hiện ngay các case chưa có luật hoặc hai luật cho kết quả khác nhau trên cùng đầu vào. Assertion rời rạc dễ bỏ sót tổ hợp. Ngoài ra bảng là một tạo tác chung mà cả dev, QA và nghiệp vụ cùng đọc và duyệt, nên nó vừa là đặc tả vừa là oracle — giảm hiểu lầm giữa các bên.",
        "Because a decision table forces us to be complete and non-contradictory. Listing every condition combination immediately reveals cases with no rule or two rules giving different outcomes on the same input. Scattered assertions easily miss combinations. Also the table is a shared artifact that dev, QA, and business all read and approve, so it is both spec and oracle — reducing misunderstanding between parties.",
        "決定表は完全性と無矛盾を強制するからです。すべての条件の組み合わせを列挙すると、規則のないケースや同じ入力で異なる結果を与える二つの規則がすぐ明らかになります。散在したアサーションは組み合わせを見落としがちです。また表は開発・QA・業務が皆読んで承認する共有成果物であり、仕様でありオラクルでもあるため関係者間の誤解を減らします。",
      ),
    ],
  },
  {
    heading: {
      vi: "4. Test data-driven: mỗi quy tắc là một test case",
      en: "4. Data-driven tests: each rule is a test case",
      ja: "4. データ駆動テスト: 各規則が一つのテストケース",
    },
    blocks: [
      P(
        "Khi đã có bảng quyết định, cách tự nhiên nhất để kiểm thử là data-driven: biến mỗi quy tắc của bảng thành một hàng dữ liệu test, rồi cho một hàm test chạy qua tất cả. Mỗi hàng gồm đầu vào và kết quả kỳ vọng lấy trực tiếp từ bảng. Kiểu tổ chức này giúp độ phủ tăng tuyến tính theo số quy tắc mà không phình số hàm test, và khi bảng thay đổi, ta chỉ cập nhật dữ liệu chứ không phải viết lại logic test. Đây cũng là nơi ranh giới giữa 'dữ liệu' và 'engine' phải tuyệt đối tách bạch để test không vô tình lặp lại lỗi của engine.",
        "With a decision table in hand, the most natural way to test is data-driven: turn each table rule into a test data row, then have one test function iterate all of them. Each row holds the input and the expected outcome taken directly from the table. This organization makes coverage grow linearly with the number of rules without exploding the number of test functions, and when the table changes we only update data, not rewrite test logic. This is also where the line between 'data' and 'engine' must be absolutely separate so the test doesn't accidentally reproduce the engine's bug.",
        "決定表があれば、最も自然なテスト方法はデータ駆動です。表の各規則をテストデータの行に変え、一つのテスト関数がそれらすべてを反復します。各行は入力と表から直接取った期待結果を持ちます。この構成は網羅率を規則数に対し線形に増やし、テスト関数の数を爆発させず、表が変わればロジックを書き直さずデータだけ更新します。ここが「データ」と「エンジン」の境界を絶対に分離せねばならない所です。テストがエンジンのバグを誤って再現しないためです。",
      ),
      CODE(
        "ts",
        `import { test, expect } from '@playwright/test';
import { decisionOracle, payout } from './oracle';

// Mỗi quy tắc của bảng quyết định = 1 hàng dữ liệu test (決定表)
const rules = [
  { name: 'R1 covered',   claim: mk({ policyActive: true }),                    expect: 'APPROVE' },
  { name: 'R2 exclusion', claim: mk({ claimType: 'flood', excludedPerils: ['flood'] }), expect: 'DENY' },
  { name: 'R3 overlimit', claim: mk({ amount: 900_00, coverageLimit: 500_00 }), expect: 'DENY' },
  { name: 'R4 fraud',     claim: mk({ fraudScore: 85 }),                        expect: 'REVIEW' },
  { name: 'R5 inactive',  claim: mk({ policyActive: false }),                   expect: 'DENY' },
];

for (const r of rules) {
  test(\`decision-table: \${r.name}\`, async ({ request }) => {
    // Oracle từ bảng — KHÔNG gọi lại engine để tính kỳ vọng
    expect(decisionOracle(r.claim).decision).toBe(r.expect);
    // So engine thật với oracle
    const res = await request.post('/claims/decide', { data: r.claim });
    expect((await res.json()).decision).toBe(r.expect);
  });
}`,
      ),
      P(
        "Có một cạm bẫy tinh vi cần tránh: nếu ta tính kết quả kỳ vọng bằng cách gọi chính engine đang kiểm thử, test sẽ luôn xanh dù engine sai, vì cả hai vế đều sai giống nhau. Vì thế oracle phải là một cài đặt độc lập của bảng quyết định, tốt nhất do một người khác viết, hoặc chép trực tiếp từ bảng đã duyệt. Sự tách bạch này là điều kiện để test có giá trị. Đây là bài học quan trọng khi làm việc với AI: nếu để AI vừa sinh engine vừa sinh oracle, chúng có thể sai theo cùng một hướng và che nhau.",
        "There's a subtle trap to avoid: if we compute the expected outcome by calling the very engine under test, the test always passes even when the engine is wrong, because both sides are wrong the same way. So the oracle must be an independent implementation of the decision table, ideally written by someone else, or copied directly from the approved table. This separation is the condition for the test to be meaningful. This is an important lesson when working with AI: if you let AI generate both the engine and the oracle, they may be wrong in the same direction and mask each other.",
        "避けるべき微妙な罠があります。テスト対象のエンジン自体を呼んで期待結果を計算すると、エンジンが誤っていても両辺が同じように誤るためテストは常に通ります。ゆえにオラクルは決定表の独立した実装——理想的には別の人が書くか、承認済みの表から直接コピーしたもの——でなければなりません。この分離がテストが意味を持つ条件です。これは AI と働く際の重要な教訓です。AI にエンジンとオラクルの両方を生成させると、同じ方向に誤って互いを隠しかねません。",
      ),
      WARN(
        "Không bao giờ tính kỳ vọng bằng cách gọi engine đang test. Oracle phải độc lập với engine — nếu không, test 'xanh' chỉ chứng minh engine nhất quán với chính nó, không phải đúng.",
        "Never compute the expectation by calling the engine under test. The oracle must be independent of the engine — otherwise a 'green' test only proves the engine is consistent with itself, not correct.",
        "テスト対象のエンジンを呼んで期待値を計算しないでください。オラクルはエンジンから独立せねばなりません。さもないと「グリーン」なテストはエンジンが自分自身と一貫することを示すだけで、正しさは示しません。",
      ),
    ],
  },
  {
    heading: {
      vi: "5. Coverage và exclusion: hai cột dễ nhầm nhất",
      en: "5. Coverage and exclusion: the two most confusable columns",
      ja: "5. 補償と免責: 最も混同しやすい二列",
    },
    blocks: [
      P(
        "Coverage và exclusion nghe giống nhau nhưng khác về bản chất. Coverage nói loại tổn thất có thuộc phạm vi hợp đồng không; exclusion nói dù thuộc phạm vi thì có bị loại trừ bởi điều khoản riêng không. Một hồ sơ có thể được coverage chấp nhận nhưng vẫn bị exclusion từ chối, ví dụ hợp đồng bảo hiểm xe có bao gồm hư hại do ngập nước nói chung, nhưng loại trừ ngập nước do khách cố tình lái vào vùng lũ. Test phải tách rạch ròi hai lý do từ chối này, vì cơ quan quản lý và khách hàng đều cần biết chính xác lý do.",
        "Coverage and exclusion sound alike but are fundamentally different. Coverage says whether the loss type is within the policy's scope; exclusion says whether, even if within scope, it is excluded by a specific clause. A claim can be accepted by coverage yet denied by exclusion, e.g. an auto policy covers flood damage in general, but excludes flooding from the customer deliberately driving into a flood zone. Tests must sharply separate these two denial reasons, because both the regulator and the customer need to know the exact reason.",
        "補償と免責は似て聞こえますが本質的に異なります。補償は損失の種類が保険の範囲内かを言い、免責は範囲内でも特定の条項で除外されるかを言います。請求は補償で受け入れられても免責で却下され得ます。例えば自動車保険は一般に洪水被害を補償しますが、顧客が故意に洪水地帯へ運転して生じた浸水は除外します。テストはこの二つの却下理由を明確に分離せねばなりません。規制当局も顧客も正確な理由を知る必要があるからです。",
      ),
      CODE(
        "ts",
        `test('coverage khác exclusion: cùng DENY nhưng lý do khác', async ({ request }) => {
  // Ngoài phạm vi bảo hiểm hoàn toàn → DENY (không coverage)
  const notCovered = mk({ claimType: 'theft', policyActive: true,
    excludedPerils: [], /* nhưng hợp đồng không bao gồm theft */ coverageLimit: 0 });
  // Trong phạm vi nhưng bị điều khoản loại trừ → DENY (exclusion)
  const excluded   = mk({ claimType: 'flood', policyActive: true,
    excludedPerils: ['flood'], coverageLimit: 500_00 });

  const r1 = await (await request.post('/claims/decide', { data: notCovered })).json();
  const r2 = await (await request.post('/claims/decide', { data: excluded })).json();

  expect(r1.decision).toBe('DENY');
  expect(r2.decision).toBe('DENY');
  // Oracle kiểm CẢ lý do, không chỉ kết quả
  expect(r2.reason).toBe('EXCLUSION');           // đúng lý do loại trừ
  expect(r1.reason).not.toBe('EXCLUSION');       // không được nhầm sang loại trừ
});`,
      ),
      P(
        "Test này minh hoạ một nguyên tắc quan trọng của oracle bảo hiểm: kiểm cả kết quả lẫn lý do. Hai hồ sơ cùng cho kết quả DENY nhưng vì lý do khác nhau; nếu engine trả nhầm lý do, khách hàng nhận giải thích sai và công ty có thể vi phạm nghĩa vụ minh bạch. Đây là loại lỗi mà assertion hời hợt 'kết quả là DENY' sẽ bỏ qua, nhưng oracle bảng quyết định đầy đủ thì bắt được, vì mỗi ô của bảng gắn với một lý do cụ thể. Kiểm lý do cũng chính là kiểm khả năng giải thích của hệ thống.",
        "This test illustrates an important principle of insurance oracles: check both the outcome and the reason. Two claims both yield DENY but for different reasons; if the engine returns the wrong reason, the customer gets a wrong explanation and the company may breach its transparency obligation. This is the kind of bug a shallow 'outcome is DENY' assertion misses, but a complete decision-table oracle catches, because each table cell maps to a specific reason. Checking the reason is also checking the system's explainability.",
        "このテストは保険オラクルの重要な原則を示します。結果と理由の両方を確認することです。二つの請求は共に DENY を生みますが理由が異なります。エンジンが誤った理由を返すと、顧客は誤った説明を受け、会社は透明性義務に違反しかねません。これは「結果が DENY」という表面的なアサーションが見逃すが、完全な決定表オラクルが捕えるバグです。各表セルが特定の理由に対応するからです。理由を確認することはシステムの説明可能性を確認することでもあります。",
      ),
      NOTE(
        "Trong bảo hiểm, kiểm 'lý do' quan trọng ngang 'kết quả'. Cùng một DENY nhưng sai lý do có thể khiến công ty vi phạm nghĩa vụ minh bạch với khách và cơ quan quản lý.",
        "In insurance, checking the 'reason' is as important as the 'outcome'. The same DENY with the wrong reason can make the company breach its transparency duty to the customer and regulator.",
        "保険では「理由」の確認は「結果」と同じくらい重要です。同じ DENY でも理由が誤れば、会社は顧客と規制当局への透明性義務に違反しかねません。",
      ),
    ],
  },
  {
    heading: {
      vi: "6. Limit và deductible: số học payout không bao giờ âm",
      en: "6. Limit and deductible: payout arithmetic never goes negative",
      ja: "6. 限度額と免責額: 支払額計算は決して負にならない",
    },
    blocks: [
      P(
        "Sau khi một hồ sơ được duyệt, engine tính số tiền chi trả. Đây là nơi hạn mức và mức miễn thường vào cuộc. Payout bằng số tiền yêu cầu nhưng bị giới hạn ở hạn mức, rồi trừ đi mức miễn thường, và không bao giờ được âm. Các case biên rất đáng chú ý: khi số tiền yêu cầu nhỏ hơn mức miễn thường, payout phải bằng không chứ không phải số âm; khi số tiền vượt hạn mức, payout tính trên hạn mức chứ không trên số yêu cầu. Oracle số học này đơn giản nhưng là nơi lỗi tiền hay ẩn nấp, đặc biệt quanh các mốc biên.",
        "After a claim is approved, the engine computes the payout. This is where the limit and deductible come in. Payout equals the claimed amount but capped at the limit, then minus the deductible, and must never be negative. The edge cases are notable: when the claimed amount is less than the deductible, payout must be zero not a negative number; when the amount exceeds the limit, payout is computed on the limit not the claimed amount. This arithmetic oracle is simple but is where money bugs hide, especially around boundary values.",
        "請求が承認された後、エンジンは支払額を計算します。ここで限度額と免責額が登場します。支払額は請求額ですが限度額で上限され、免責額を引き、決して負になってはなりません。境界ケースが注目に値します。請求額が免責額より小さいとき支払額は負の数ではなくゼロでなければならず、請求額が限度を超えるとき支払額は請求額ではなく限度額で計算されます。この算術オラクルは単純ですが資金バグが潜む所であり、特に境界値の周辺です。",
      ),
      CODE(
        "ts",
        `// Data-driven cho số học payout — chú trọng case biên (境界)
const payoutCases = [
  { amount: 300_00, limit: 500_00, deductible: 50_00,  expect: 250_00 }, // thường
  { amount: 900_00, limit: 500_00, deductible: 50_00,  expect: 450_00 }, // vượt hạn mức → cap
  { amount: 30_00,  limit: 500_00, deductible: 50_00,  expect: 0 },      // < miễn thường → 0
  { amount: 50_00,  limit: 500_00, deductible: 50_00,  expect: 0 },      // đúng bằng → 0
  { amount: 500_00, limit: 500_00, deductible: 0,      expect: 500_00 }, // đúng hạn mức
];

for (const c of payoutCases) {
  test(\`payout \${c.amount} lim \${c.limit} ded \${c.deductible}\`, () => {
    const claim = mk({ policyActive: true, amount: c.amount,
      coverageLimit: c.limit, deductible: c.deductible });
    const p = payout(claim);
    expect(p).toBe(c.expect);
    expect(p).toBeGreaterThanOrEqual(0); // BẤT BIẾN: payout không âm
  });
}`,
      ),
      P(
        "Điểm đáng học từ đoạn này là các mốc biên: số tiền đúng bằng mức miễn thường, số tiền đúng bằng hạn mức, số tiền nhỏ hơn mức miễn thường. Đây chính là những chỗ lỗi 'lệch một' hay xuất hiện, ví dụ dùng dấu lớn hơn thay vì lớn hơn hoặc bằng. LLM rất hữu ích ở đây: nó giỏi liệt kê các tổ hợp biên mà con người dễ bỏ sót khi mệt. Nhưng kết quả kỳ vọng của mỗi tổ hợp vẫn phải tính từ công thức đã duyệt, không để LLM tự đoán, vì một con số payout sai là một khoản tiền trả sai.",
        "The lesson from this snippet is the boundary values: an amount exactly equal to the deductible, exactly equal to the limit, or below the deductible. These are precisely where 'off-by-one' bugs appear, e.g. using greater-than instead of greater-than-or-equal. An LLM is very useful here: it is good at enumerating boundary combinations humans miss when tired. But the expected result of each combination must still be computed from the approved formula, not guessed by the LLM, because a wrong payout number is a wrong amount of money paid.",
        "この断片からの教訓は境界値です。免責額とちょうど等しい額、限度額とちょうど等しい額、免責額を下回る額。これらがまさに「オフバイワン」バグの現れる所です。例えば以上ではなく超過を使うなど。LLM はここで非常に役立ちます。人間が疲れて見落とす境界の組み合わせの列挙が得意です。しかし各組み合わせの期待結果は依然として承認済みの式から計算せねばならず、LLM に推測させてはなりません。誤った支払額の数字は誤った金額の支払いだからです。",
      ),
      TIP(
        "Với số học tiền, luôn thêm bất biến 'không âm' vào oracle. Đó là mạng lưới an toàn bắt các lỗi biên mà bạn chưa liệt kê hết trong bảng case.",
        "For money arithmetic, always add a 'non-negative' invariant to the oracle. It is a safety net catching boundary bugs you haven't fully enumerated in the case table.",
        "資金の算術には常に「非負」の不変条件をオラクルに追加してください。ケース表で完全に列挙しきれていない境界バグを捕える安全網です。",
      ),
      QA(
        "Deductible áp trước hay sau limit? Thứ tự có làm sai payout không?",
        "Is the deductible applied before or after the limit? Does the order change the payout?",
        "Áp limit trước, deductible sau: payout = min(claim, limit) − deductible. Thứ tự này quan trọng. Nếu trừ deductible trước rồi mới cap theo limit, một hồ sơ vượt hạn mức sẽ ra con số khác và khách bị trả sai. Vì thế thứ tự phép tính phải ghi rõ trong bảng quyết định và có case biên (claim đúng bằng limit, claim nhỏ hơn deductible) để khoá chặt. Đây là chỗ lỗi 'lệch một' và sai thứ tự hay ẩn.",
        "Apply the limit first, the deductible after: payout = min(claim, limit) − deductible. This order matters. If you subtract the deductible first then cap by the limit, an over-limit claim yields a different number and the customer is mispaid. So the calculation order must be spelled out in the decision table with boundary cases (claim exactly equal to limit, claim below the deductible) to lock it down. This is where off-by-one and wrong-order bugs hide.",
        "先に限度額、後に免責額を適用します。payout = min(claim, limit) − deductible。この順序が重要です。先に免責額を引いてから限度で上限すると、限度超過の請求は異なる数字になり顧客が誤払いされます。ゆえに計算順序は決定表に明記し、境界ケース(限度とちょうど等しい請求、免責額を下回る請求)で固定せねばなりません。オフバイワンや順序誤りのバグが潜む所です。",
      ),
    ],
  },
  {
    heading: {
      vi: "7. Fraud flag: khi engine phải nhường quyết định cho con người",
      en: "7. Fraud flag: when the engine must defer to a human",
      ja: "7. 不正フラグ: エンジンが人間に判断を委ねるとき",
    },
    blocks: [
      P(
        "Cờ nghi ngờ gian lận là một cột đặc biệt trong bảng quyết định vì nó không dẫn tới APPROVE hay DENY tự động mà dẫn tới REVIEW, tức chuyển cho con người. Đây là thiết kế cố ý: một quyết định về gian lận có hệ quả pháp lý và đạo đức nặng nề, nên hệ thống không được tự động từ chối chỉ vì một điểm số. Oracle ở đây phải khẳng định rằng khi cờ gian lận bật, kết quả luôn là REVIEW dù các điều kiện khác đều thuận lợi cho việc duyệt. Nói cách khác, cờ gian lận có quyền phủ quyết đường auto-approve.",
        "The fraud-suspicion flag is a special column in the decision table because it leads not to an automatic APPROVE or DENY but to REVIEW, i.e. hand-off to a human. This is intentional design: a fraud decision carries heavy legal and ethical consequences, so the system must not auto-deny just because of a score. The oracle here must assert that when the fraud flag is on, the outcome is always REVIEW even when all other conditions favor approval. In other words, the fraud flag has veto power over the auto-approve path.",
        "不正疑いフラグは決定表の特別な列です。自動的な APPROVE や DENY ではなく REVIEW、すなわち人間への引き渡しへ導くからです。これは意図的な設計です。不正の判断は重い法的・倫理的結果を伴うため、システムはスコアだけで自動却下してはなりません。ここでのオラクルは、不正フラグが立つと他のすべての条件が承認に有利でも結果が常に REVIEW であることを主張せねばなりません。言い換えれば、不正フラグは自動承認経路への拒否権を持ちます。",
      ),
      CODE(
        "ts",
        `test('fraud flag phủ quyết auto-approve: luôn REVIEW', async ({ request }) => {
  // Hồ sơ hoàn hảo cho việc duyệt NHƯNG có cờ gian lận cao
  const claim = mk({
    policyActive: true, claimType: 'collision', excludedPerils: [],
    amount: 200_00, coverageLimit: 500_00, deductible: 50_00,
    fraudScore: 88,          // > 70 → phải REVIEW
  });

  // Oracle: dù mọi điều kiện khác đạt, cờ gian lận buộc REVIEW
  expect(decisionOracle(claim).decision).toBe('REVIEW');

  const res = await request.post('/claims/decide', { data: claim });
  const body = await res.json();
  expect(body.decision).toBe('REVIEW');
  expect(body.reason).toBe('FRAUD_FLAG');
  // Bất biến: KHÔNG được tự chi trả khi đang REVIEW
  expect(body.payout ?? 0).toBe(0);
});`,
      ),
      P(
        "Case này thể hiện một ranh giới đạo đức được mã hoá thành oracle. Nó nhắc rằng không phải mọi quyết định đều nên tự động hoá; một số phải có con người trong vòng lặp. Khi AI tham gia mở rộng case, ta đặc biệt nhấn mạnh nhóm case fraud, vì đây là nơi một engine 'quá tự tin' có thể gây hại. Test khẳng định rằng dưới cờ gian lận, hệ thống dừng lại và nhường quyền. Đây cũng là câu trả lời cho lo ngại rằng AI sẽ tự động hoá mọi thứ: chính chúng ta thiết kế các điểm dừng bắt buộc và kiểm thử để bảo đảm chúng luôn hiện diện.",
        "This case embodies an ethical boundary encoded as an oracle. It reminds us that not every decision should be automated; some must have a human in the loop. When AI helps expand cases, we especially emphasize the fraud case group, because this is where an 'overconfident' engine can do harm. The test asserts that under the fraud flag, the system stops and defers. This is also the answer to the worry that AI will automate everything: we ourselves design the mandatory stop points and test to ensure they are always present.",
        "このケースはオラクルとして符号化された倫理的境界を体現します。すべての判断を自動化すべきではなく、一部は人間をループに入れねばならないことを思い出させます。AI がケース拡大を助けるとき、特に不正ケース群を強調します。「過信した」エンジンが害をなし得る所だからです。テストは不正フラグ下でシステムが止まり委ねることを主張します。これは AI がすべてを自動化するという懸念への答えでもあります。私たち自身が必須の停止点を設計しテストで常に存在することを保証します。",
      ),
      SCEN(
        "Phỏng vấn: 'Khi nào bạn KHÔNG để engine tự quyết?'",
        "Interview: 'When do you NOT let the engine decide on its own?'",
        "Khi quyết định có hệ quả nặng và cần phán đoán ngữ cảnh mà quy tắc cứng không nắm hết — điển hình là nghi ngờ gian lận. Tôi thiết kế bảng quyết định để cờ gian lận luôn dẫn tới REVIEW, và viết test khẳng định engine không bao giờ auto-approve hay auto-deny hồ sơ như vậy. Nguyên tắc là: tự động hoá cái tất định, giữ con người cho cái cần phán đoán và chịu trách nhiệm pháp lý.",
        "When a decision has heavy consequences and needs contextual judgment that hard rules can't fully capture — typically fraud suspicion. I design the decision table so the fraud flag always leads to REVIEW, and I write tests asserting the engine never auto-approves or auto-denies such claims. The principle is: automate the deterministic, keep humans for what needs judgment and legal accountability.",
        "判断が重い結果を持ち、硬い規則が完全には捉えられない文脈的判断を要するとき——典型的には不正疑いです。私は不正フラグが常に REVIEW へ導くよう決定表を設計し、エンジンがそのような請求を決して自動承認も自動却下もしないことを主張するテストを書きます。原則は、決定的なものを自動化し、判断と法的責任を要するものには人間を残すことです。",
      ),
    ],
  },
  {
    heading: {
      vi: "8. LLM mở rộng tổ hợp case biên, bảng vẫn là sự thật",
      en: "8. The LLM expands edge combinations, the table stays the truth",
      ja: "8. LLM が境界の組み合わせを拡大、表は真実のまま",
    },
    blocks: [
      P(
        "Đây là chỗ AI đóng góp nhiều nhất mà vẫn an toàn. Một bảng quyết định với năm điều kiện nhị phân đã có ba mươi hai tổ hợp; thêm loại tổn thất, khoảng số tiền, các mốc biên thì số tổ hợp bùng nổ. Con người khó liệt kê hết mà không mệt và bỏ sót. LLM giỏi đúng việc này: sinh ra danh sách tổ hợp đầu vào phong phú, bao gồm các case biên hiếm gặp. Nhưng điểm mấu chốt là LLM chỉ sinh đầu vào; kết quả kỳ vọng của mỗi đầu vào vẫn được tính bằng hàm oracle độc lập, tức bảng quyết định do con người sở hữu. AI mở rộng bề rộng, bảng giữ tính đúng.",
        "This is where AI contributes the most while staying safe. A decision table with five binary conditions already has thirty-two combinations; add loss types, amount ranges, boundary values and the count explodes. Humans struggle to enumerate them all without fatigue and omission. An LLM is good at exactly this: generating a rich list of input combinations, including rare edge cases. But the key point is the LLM only generates inputs; the expected outcome of each input is still computed by an independent oracle function, i.e. the human-owned decision table. AI expands breadth, the table holds correctness.",
        "ここが AI が安全性を保ちつつ最も貢献する所です。五つの二値条件を持つ決定表は既に三十二の組み合わせを持ち、損失の種類・金額の範囲・境界値を加えると数が爆発します。人間は疲労と抜けなしにすべてを列挙するのに苦労します。LLM はまさにこれが得意です。稀な境界ケースを含む豊富な入力の組み合わせリストを生成します。しかし核心は LLM が入力のみを生成することです。各入力の期待結果は依然として独立したオラクル関数、すなわち人間が所有する決定表で計算されます。AI は幅を広げ、表が正しさを保持します。",
      ),
      CODE(
        "ts",
        `// LLM sinh ĐẦU VÀO đa dạng; oracle (bảng) tính KỲ VỌNG. Hai vai tách bạch.
import { llmGenerateClaims } from './ai-helper';
import { decisionOracle } from './oracle';

test('LLM mở rộng case biên, bảng quyết định là oracle', async ({ request }) => {
  // 1) LLM đề xuất 200 hồ sơ biên (tổ hợp hiếm) — CHỈ là input
  const claims = await llmGenerateClaims({ count: 200, focus: 'boundary+exclusion' });

  for (const claim of claims) {
    // 2) Kỳ vọng LUÔN từ oracle độc lập, KHÔNG hỏi LLM kết quả
    const expected = decisionOracle(claim).decision;
    // 3) So engine thật với oracle
    const res = await request.post('/claims/decide', { data: claim });
    expect((await res.json()).decision).toBe(expected);
  }
});`,
      ),
      P(
        "Hãy nhìn kỹ sự phân vai trong đoạn code. LLM sinh hai trăm hồ sơ, nhưng không một dòng nào hỏi LLM 'kết quả đúng là gì'. Kết quả kỳ vọng luôn đến từ decisionOracle, hàm độc lập phản ánh bảng đã duyệt. Nhờ vậy, dù LLM có hallucination về nội dung một hồ sơ, nó cũng không thể làm hỏng tiêu chuẩn đánh giá. Đây là mẫu thiết kế cốt lõi khi kết hợp AI với oracle: dùng AI cho phần sáng tạo đầu vào, dùng logic tất định cho phần phán quyết. Tách hai phần này là cách biến sức mạnh khám phá của AI thành giá trị mà không rước rủi ro về tính đúng.",
        "Look closely at the role split in the code. The LLM generates two hundred claims, but not a single line asks the LLM 'what is the correct outcome'. The expected result always comes from decisionOracle, an independent function reflecting the approved table. So even if the LLM hallucinates a claim's content, it cannot corrupt the evaluation standard. This is the core design pattern when combining AI with an oracle: use AI for the creative input generation, use deterministic logic for the verdict. Separating these two is how you turn AI's exploratory power into value without importing correctness risk.",
        "コード内の役割分担をよく見てください。LLM は二百件の請求を生成しますが、LLM に「正しい結果は何か」と尋ねる行は一つもありません。期待結果は常に承認済みの表を反映する独立関数 decisionOracle から来ます。ゆえに LLM が請求の内容をハルシネーションしても、評価基準を破壊できません。これは AI とオラクルを組み合わせる際の中核設計パターンです。創造的な入力生成に AI を、判定に決定論的ロジックを使います。この二つを分離することが、正しさのリスクを持ち込まず AI の探索力を価値に変える方法です。",
      ),
      QA(
        "Làm sao tránh việc LLM hallucination làm sai kết quả test?",
        "How do you prevent LLM hallucination from corrupting test results?",
        "Bằng cách không bao giờ để LLM quyết kết quả kỳ vọng. LLM chỉ sinh đầu vào — các hồ sơ biên phong phú. Kỳ vọng luôn tính từ bảng quyết định do con người sở hữu, cài đặt độc lập với engine. Nhờ tách hai vai, một hallucination của LLM chỉ tạo ra một đầu vào lạ, và đầu vào lạ đó vẫn được chấm bằng oracle đúng. AI mở rộng độ phủ; nó không bao giờ chạm vào định nghĩa đúng-sai.",
        "By never letting the LLM decide the expected outcome. The LLM only generates inputs — rich boundary claims. The expectation is always computed from the human-owned decision table, implemented independently of the engine. By separating the two roles, an LLM hallucination merely produces an odd input, and that odd input is still graded by the correct oracle. AI expands coverage; it never touches the definition of right and wrong.",
        "LLM に期待結果を決めさせないことによってです。LLM は入力——豊富な境界請求——のみを生成します。期待は常に人間が所有しエンジンから独立に実装された決定表から計算されます。二つの役割を分離することで、LLM のハルシネーションは奇妙な入力を生むだけで、その奇妙な入力も正しいオラクルで採点されます。AI は網羅を広げますが、正誤の定義には決して触れません。",
      ),
    ],
  },
  {
    heading: {
      vi: "9. Case lỗi sâu: bảng mâu thuẫn, thiếu luật, thứ tự sai",
      en: "9. Deep failures: contradictory table, missing rule, wrong order",
      ja: "9. 深い障害: 矛盾する表・欠落規則・誤った順序",
    },
    blocks: [
      P(
        "Bản thân bảng quyết định cũng có thể sai, và đó là lớp lỗi nguy hiểm nhất vì nó là nguồn sự thật. Ba loại lỗi bảng thường gặp: mâu thuẫn khi hai quy tắc cho kết quả khác nhau trên cùng một đầu vào; thiếu luật khi có tổ hợp điều kiện không quy tắc nào bao phủ, khiến engine rơi vào hành vi không xác định; và thứ tự sai khi các điều kiện loại trừ nhau được đánh giá sai thứ tự, ví dụ áp hạn mức trước khi kiểm loại trừ. Vì thế ta cần test kiểm chính bảng, không chỉ kiểm engine so với bảng.",
        "The decision table itself can be wrong, and that is the most dangerous class of bug because it is the source of truth. Three common table faults: contradiction, when two rules give different outcomes on the same input; missing rule, when a condition combination is covered by no rule, leaving the engine in undefined behavior; and wrong order, when mutually-exclusive conditions are evaluated in the wrong order, e.g. applying the limit before checking exclusion. So we need tests that check the table itself, not only the engine against the table.",
        "決定表自体が誤り得ます。それは真実の源であるため最も危険なバグ層です。三つの一般的な表の欠陥。矛盾: 二つの規則が同じ入力で異なる結果を与える。欠落規則: どの規則も網羅しない条件の組み合わせがあり、エンジンが未定義動作に陥る。誤った順序: 相互排他的な条件が誤った順序で評価される。例えば免責を確認する前に限度を適用する。ゆえにエンジンを表と照合するだけでなく表自体を検査するテストが必要です。",
      ),
      CODE(
        "ts",
        `// Meta-test: kiểm tính ĐẦY ĐỦ và KHÔNG mâu thuẫn của bảng quyết định
test('bảng quyết định: đầy đủ & không mâu thuẫn', () => {
  const conds = ['policyActive', 'excluded', 'overLimit', 'fraud'];
  let covered = 0, contradictions = 0;

  // Duyệt toàn bộ 2^4 = 16 tổ hợp nhị phân
  for (let m = 0; m < (1 << conds.length); m++) {
    const claim = buildClaimFromMask(conds, m);
    const outcomes = new Set(matchingRules(claim).map(r => r.decision));
    if (outcomes.size === 0) throw new Error('THIẾU LUẬT cho tổ hợp ' + m);
    if (outcomes.size > 1)  contradictions++;   // >1 kết quả = mâu thuẫn
    covered++;
  }
  expect(covered).toBe(1 << conds.length);      // mọi tổ hợp có luật
  expect(contradictions).toBe(0);               // không mâu thuẫn
});`,
      ),
      P(
        "Meta-test này quét toàn bộ không gian tổ hợp điều kiện và khẳng định hai tính chất sống còn: mọi tổ hợp đều có ít nhất một quy tắc phủ, và không tổ hợp nào khớp hai quy tắc cho kết quả khác nhau. Nếu phát hiện thiếu luật, đó là dấu hiệu đặc tả có lỗ hổng cần nghiệp vụ bổ sung; nếu phát hiện mâu thuẫn, đó là hai luật đá nhau cần làm rõ. Đây là loại kiểm thử ở tầng đặc tả, cao hơn tầng engine, và cực kỳ giá trị vì nó bắt lỗi ngay từ nguồn sự thật trước khi engine kịp cài sai theo.",
        "This meta-test scans the entire condition-combination space and asserts two vital properties: every combination is covered by at least one rule, and no combination matches two rules with different outcomes. If a missing rule is found, it signals a spec gap that business must fill; if a contradiction is found, two rules clash and need clarification. This is testing at the specification layer, above the engine layer, and extremely valuable because it catches bugs right at the source of truth before the engine even implements it wrong.",
        "このメタテストは条件の組み合わせ空間全体を走査し、二つの重要な性質を主張します。すべての組み合わせが少なくとも一つの規則で網羅され、どの組み合わせも異なる結果を持つ二つの規則に一致しないこと。欠落規則が見つかれば業務が埋めるべき仕様の隙間を示し、矛盾が見つかれば二つの規則が衝突し明確化が必要です。これはエンジン層より上の仕様層でのテストであり、エンジンが誤って実装する前に真実の源でバグを捕えるため極めて価値があります。",
      ),
      WARN(
        "Đừng chỉ kiểm 'engine khớp bảng'. Nếu bảng thiếu luật hay mâu thuẫn, engine 'khớp' một bảng sai vẫn cho kết quả sai. Luôn có meta-test kiểm tính đầy đủ và nhất quán của chính bảng.",
        "Don't only check 'engine matches the table'. If the table has a missing rule or contradiction, an engine 'matching' a wrong table still gives wrong results. Always have a meta-test checking the table's own completeness and consistency.",
        "「エンジンが表に一致する」だけを確認しないでください。表に欠落規則や矛盾があれば、誤った表に「一致する」エンジンも誤った結果を出します。常に表自体の完全性と一貫性を確認するメタテストを持ってください。",
      ),
    ],
  },
  {
    heading: {
      vi: "10. Audit và tuân thủ: mỗi quyết định phải giải thích được",
      en: "10. Audit and compliance: every decision must be explainable",
      ja: "10. 監査とコンプライアンス: すべての判断は説明可能でなければならない",
    },
    blocks: [
      P(
        "Trong bảo hiểm, một quyết định không giải thích được là một quyết định không dùng được, dù nó tình cờ đúng. Cơ quan quản lý và toà án có thể yêu cầu công ty trình bày chính xác quy tắc nào dẫn tới việc từ chối một hồ sơ. Vì thế engine phải lưu, với mỗi quyết định, quy tắc đã áp, các giá trị đầu vào tại thời điểm đó, và phiên bản bảng quyết định đang dùng. Test audit phải khẳng định rằng bản ghi kiểm toán đầy đủ và bất biến: không thiếu trường nào, và một khi đã ghi thì không bị sửa. Đây là nơi khả năng giải thích trở thành một yêu cầu kiểm thử cụ thể.",
        "In insurance, an unexplainable decision is an unusable decision, even if it happens to be correct. Regulators and courts can require the company to state exactly which rule led to denying a claim. So the engine must store, for each decision, the applied rule, the input values at that moment, and the decision-table version in use. The audit test must assert that the audit record is complete and immutable: no field missing, and once written it is not altered. This is where explainability becomes a concrete testing requirement.",
        "保険では、説明できない判断は使えない判断です。たまたま正しくてもです。規制当局と裁判所は請求却下に至った規則を正確に述べるよう会社に求め得ます。ゆえにエンジンは各判断について、適用された規則、その時点の入力値、使用中の決定表バージョンを保存せねばなりません。監査テストは監査記録が完全で不変であることを主張せねばなりません。欠落フィールドなし、一度書かれたら改変されない。ここで説明可能性が具体的なテスト要件になります。",
      ),
      CODE(
        "ts",
        `test('audit: mỗi quyết định lưu vết đầy đủ & bất biến (監査)', async ({ request, db }) => {
  const claim = mk({ policyActive: true, claimType: 'flood',
    excludedPerils: ['flood'], amount: 100_00 });

  const res = await request.post('/claims/decide', { data: claim });
  const claimId = (await res.json()).claimId;

  const audit = await db.query(
    'SELECT * FROM decision_audit WHERE claim_id = $1', [claimId]);
  expect(audit).toHaveLength(1);
  // Bản ghi phải giải thích được: quy tắc, input, phiên bản bảng
  expect(audit[0].rule).toBe('EXCLUSION');
  expect(audit[0].reason).toBe('EXCLUSION');
  expect(audit[0].table_version).toMatch(/^v\\d+/);   // phiên bản bảng đã dùng
  expect(audit[0].inputs_snapshot).toBeTruthy();      // ảnh chụp đầu vào

  // Bất biến: bản ghi audit KHÔNG được sửa (thử UPDATE phải thất bại)
  await expect(db.query(
    'UPDATE decision_audit SET rule = $1 WHERE claim_id = $2', ['COVERED', claimId]))
    .rejects.toThrow(/immutable|permission/i);
});`,
      ),
      P(
        "Test này gắn khả năng giải thích với ba trụ cột: quy tắc nào đã áp, đầu vào là gì, và bảng phiên bản mấy. Việc lưu phiên bản bảng đặc biệt quan trọng vì quy tắc bảo hiểm thay đổi theo thời gian; một hồ sơ được xử lý năm ngoái phải giải thích được bằng bảng của năm ngoái, không phải bảng hiện tại. Tính bất biến của bản ghi audit cũng được kiểm bằng cách thử sửa và kỳ vọng thất bại. Với AI, ta không bao giờ để agent chạm vào bản ghi audit; đó là dữ liệu chỉ ghi thêm, và mọi truy cập đều phải được kiểm soát chặt chẽ.",
        "This test ties explainability to three pillars: which rule was applied, what the inputs were, and which table version. Storing the table version matters especially because insurance rules change over time; a claim processed last year must be explainable by last year's table, not the current one. The immutability of the audit record is also checked by attempting an update and expecting failure. With AI, we never let the agent touch the audit record; it is append-only data, and every access must be tightly controlled.",
        "このテストは説明可能性を三本柱に結びつけます。どの規則が適用されたか、入力が何だったか、どの表バージョンか。表バージョンの保存は特に重要です。保険規則は時とともに変わるからです。昨年処理された請求は現在の表ではなく昨年の表で説明できねばなりません。監査記録の不変性も更新を試み失敗を期待することで確認します。AI では監査記録にエージェントを決して触れさせません。追記専用データであり、すべてのアクセスは厳格に制御されねばなりません。",
      ),
      NOTE(
        "Lưu phiên bản bảng quyết định trong mỗi bản ghi audit. Quy tắc bảo hiểm thay đổi theo thời gian; một quyết định cũ phải giải thích được bằng đúng bảng lúc đó, không phải bảng hiện tại.",
        "Store the decision-table version in each audit record. Insurance rules change over time; an old decision must be explainable by the table in effect then, not the current one.",
        "各監査記録に決定表のバージョンを保存してください。保険規則は時とともに変わります。古い判断は現在の表ではなく当時有効だった表で説明できねばなりません。",
      ),
    ],
  },
  {
    heading: {
      vi: "11. Cổng CI: chặn merge nếu bảng hoặc engine lệch nhau",
      en: "11. CI gate: block merge if table or engine diverge",
      ja: "11. CI ゲート: 表とエンジンがずれたらマージを阻止",
    },
    blocks: [
      P(
        "Cổng CI cho engine bồi thường phải chạy ba lớp kiểm tra và chặn merge nếu bất kỳ lớp nào đỏ. Lớp một là meta-test kiểm bảng quyết định đầy đủ và không mâu thuẫn. Lớp hai là test data-driven so engine với oracle bảng trên toàn bộ quy tắc cộng các case biên do LLM mở rộng. Lớp ba là test audit khẳng định mỗi quyết định lưu vết giải thích được và bất biến. Chỉ khi cả ba lớp xanh, pull request mới được merge. Cách này bảo đảm không có thay đổi nào lọt qua mà làm bảng mâu thuẫn, làm engine lệch bảng, hay làm mất khả năng giải thích.",
        "The CI gate for the claims engine must run three layers of checks and block merge if any layer is red. Layer one is the meta-test checking the decision table is complete and non-contradictory. Layer two is the data-driven test comparing the engine against the table oracle across all rules plus LLM-expanded edge cases. Layer three is the audit test asserting each decision leaves an explainable, immutable trail. Only when all three layers are green can a pull request merge. This ensures no change slips through that makes the table contradictory, the engine diverge from the table, or loses explainability.",
        "請求エンジンの CI ゲートは三層の検査を実行し、いずれかの層が赤ならマージを阻止せねばなりません。第一層は決定表が完全で無矛盾かを確認するメタテスト。第二層は全規則と LLM 拡張の境界ケースにわたりエンジンを表オラクルと比較するデータ駆動テスト。第三層は各判断が説明可能で不変の証跡を残すことを主張する監査テスト。三層すべてがグリーンのときのみプルリクエストはマージできます。これにより表を矛盾させたり、エンジンを表からずらしたり、説明可能性を失わせたりする変更が漏れ通らないことを保証します。",
      ),
      CODE(
        "yaml",
        `# .github/workflows/claims-engine.yml — gate cho engine bồi thường
name: claims-engine-gate
on: [pull_request]
jobs:
  gate:
    runs-on: ubuntu-latest
    environment: test
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      # Lớp 1: bảng quyết định đầy đủ & không mâu thuẫn
      - run: npm run test:decision-table
      # Lớp 2: engine khớp oracle bảng (+ case biên LLM mở rộng)
      - run: npx playwright test tests/decision --reporter=github
      # Lớp 3: audit giải thích được & bất biến
      - run: npm run test:audit
      # Đỏ bất kỳ lớp nào → chặn merge
        env:
          BASE_URL: \${{ vars.STAGING_URL }}
          DECISION_TABLE_VERSION: \${{ vars.TABLE_VERSION }}`,
      ),
      P(
        "Một chi tiết vận hành đáng nhắc là gắn phiên bản bảng quyết định vào CI như một biến rõ ràng. Khi bảng đổi, phiên bản đổi, và mọi test chạy đối chiếu với đúng phiên bản đó. Điều này ngăn tình huống nguy hiểm khi engine được cập nhật theo bảng mới nhưng test vẫn dùng bảng cũ, khiến đèn xanh giả. Việc quản lý phiên bản bảng như một tạo tác có kiểm soát chính là cách biến bảng quyết định thành nguồn sự thật thật sự, chứ không phải một tài liệu trôi nổi dễ lệch khỏi code.",
        "One operational detail worth mentioning is pinning the decision-table version into CI as an explicit variable. When the table changes, the version changes, and every test runs against exactly that version. This prevents the dangerous situation where the engine is updated to a new table but tests still use the old one, producing false green. Managing the table version as a controlled artifact is precisely how you turn the decision table into a real source of truth, not a floating document prone to drifting from the code.",
        "言及に値する運用上の詳細は、決定表バージョンを明示的な変数として CI に固定することです。表が変わればバージョンが変わり、すべてのテストがまさにそのバージョンに対して実行されます。これはエンジンが新しい表に更新されてもテストが古い表を使い偽のグリーンを生む危険な状況を防ぎます。表バージョンを制御された成果物として管理することが、決定表をコードからずれやすい浮遊文書ではなく本当の真実の源に変える方法です。",
      ),
      TIP(
        "Gắn phiên bản bảng quyết định thành biến CI. Test luôn chạy đối chiếu đúng phiên bản, tránh cảnh engine đổi theo bảng mới nhưng test còn dùng bảng cũ.",
        "Pin the decision-table version as a CI variable. Tests always run against the correct version, avoiding an engine updated to a new table while tests still use the old one.",
        "決定表バージョンを CI 変数として固定してください。テストは常に正しいバージョンに対して実行され、エンジンが新表に更新されてもテストが古い表を使う事態を避けます。",
      ),
    ],
  },
  {
    heading: {
      vi: "12. Ranh giới AI-agent trong quy trình bảo hiểm",
      en: "12. AI-agent boundary in the insurance process",
      ja: "12. 保険工程における AI エージェントの境界",
    },
    blocks: [
      P(
        "Trong quy trình bảo hiểm, ranh giới AI-agent phải phản ánh cả yêu cầu kỹ thuật lẫn yêu cầu công bằng. Agent được phép: đọc bảng quyết định, sinh hồ sơ đầu vào đa dạng để mở rộng độ phủ, tóm tắt kết quả test, đề xuất case biên chưa được phủ. Agent không được: sửa bảng quyết định vì đó là đặc tả nghiệp vụ có ràng buộc pháp lý, tự quyết một hồ sơ thật, chạm dữ liệu khách hàng thật, hay nới lỏng oracle để làm test xanh. Đặc biệt, agent tuyệt đối không được đưa ra quyết định bồi thường thật cho khách; đó là việc của engine đã kiểm thử kỹ và của con người trong các case REVIEW.",
        "In the insurance process, the AI-agent boundary must reflect both technical and fairness requirements. The agent may: read the decision table, generate diverse input claims to expand coverage, summarize test results, propose uncovered edge cases. The agent may not: edit the decision table since it is a legally-constrained business spec, decide a real claim on its own, touch real customer data, or loosen the oracle to make a test green. In particular, the agent must absolutely never issue a real claims decision to a customer; that is the job of the well-tested engine and of humans in REVIEW cases.",
        "保険工程では AI エージェントの境界が技術要件と公平性要件の両方を反映せねばなりません。エージェントが可: 決定表の読解、網羅拡大のための多様な入力請求の生成、テスト結果の要約、未網羅の境界ケースの提案。エージェントが不可: 法的制約のある業務仕様である決定表の編集、実請求の独自判断、実顧客データへの接触、テストをグリーンにするためのオラクル緩和。特にエージェントは顧客への実際の請求判断を絶対に発してはなりません。それは十分テストされたエンジンと REVIEW ケースの人間の仕事です。",
      ),
      UL(
        [
          "AI được làm: đọc bảng, sinh hồ sơ input biên, mở rộng ma trận case, tóm tắt kết quả, đề xuất tổ hợp thiếu.",
          "AI KHÔNG được: sửa bảng quyết định, quyết định hồ sơ thật, chạm PII khách hàng, nới oracle, tự merge.",
          "Con người giữ: sở hữu & duyệt bảng quyết định, chốt gate CI, xử lý case REVIEW, chịu trách nhiệm pháp lý.",
        ],
        [
          "AI may: read the table, generate boundary input claims, expand the case matrix, summarize results, propose missing combinations.",
          "AI may NOT: edit the decision table, decide real claims, touch customer PII, loosen the oracle, self-merge.",
          "Humans hold: own and approve the decision table, gate CI, handle REVIEW cases, bear legal responsibility.",
        ],
        [
          "AI が可: 表の読解、境界入力請求の生成、ケースマトリクスの拡大、結果の要約、欠落組み合わせの提案。",
          "AI が不可: 決定表の編集、実請求の判断、顧客 PII への接触、オラクルの緩和、自己マージ。",
          "人間が保持: 決定表の所有と承認、CI ゲートの管理、REVIEW ケースの処理、法的責任の負担。",
        ],
      ),
      P(
        "Nguyên tắc chung vẫn là: AI có quyền cơ học rộng nhưng quyền phán đoán về kết quả bồi thường bằng không. Cách kiểm tra nhanh là hỏi liệu một hành động có ảnh hưởng tới bảng quyết định, tới một quyết định bồi thường thật, tới dữ liệu khách hàng, hay tới khả năng giải thích không. Nếu có, con người phải giữ. Nhờ ranh giới này, AI trở thành công cụ mạnh để mở rộng độ phủ và bắt lỗi sớm, trong khi công bằng và tuân thủ vẫn nằm chắc trong tay con người, đúng như bản chất nhạy cảm của ngành bảo hiểm đòi hỏi.",
        "The general principle remains: AI gets broad mechanical authority but zero judgment authority over claims outcomes. The quick check is to ask whether an action affects the decision table, a real claims decision, customer data, or explainability. If yes, the human must hold it. Thanks to this boundary, AI becomes a powerful tool to expand coverage and catch bugs early, while fairness and compliance stay firmly in human hands, exactly as the sensitive nature of the insurance industry demands.",
        "一般原則は変わりません。AI には広い機械的権限を、しかし請求結果に関する判断権限はゼロを。素早い確認は、ある行動が決定表・実際の請求判断・顧客データ・説明可能性に影響するか問うことです。もしそうなら人間が握らねばなりません。この境界のおかげで、AI は網羅を広げバグを早期に捕える強力なツールになり、公平性とコンプライアンスは保険業界の機微な性質が求める通り人間の手にしっかり残ります。",
      ),
      QA(
        "Vì sao AI không được sửa bảng quyết định dù nó có thể 'tối ưu' bảng?",
        "Why can't AI edit the decision table even if it could 'optimize' it?",
        "Vì bảng quyết định là đặc tả nghiệp vụ có ràng buộc pháp lý và hệ quả công bằng, không phải một cấu trúc dữ liệu để tối ưu kỹ thuật. Thay đổi một quy tắc có thể khiến hàng nghìn khách bị ảnh hưởng và có thể vi phạm quy định. Việc sửa bảng phải qua quy trình nghiệp vụ có duyệt, có phiên bản, có audit. AI có thể đề xuất, nhưng con người có trách nhiệm pháp lý mới được chốt.",
        "Because the decision table is a legally-constrained business spec with fairness consequences, not a data structure to optimize technically. Changing one rule can affect thousands of customers and may breach regulation. Editing the table must go through an approved, versioned, audited business process. AI may propose, but only humans with legal responsibility may finalize.",
        "決定表は公平性の結果を伴う法的制約のある業務仕様であり、技術的に最適化するデータ構造ではないからです。一つの規則の変更は数千の顧客に影響し規制違反になり得ます。表の編集は承認・バージョン管理・監査のある業務プロセスを通さねばなりません。AI は提案できますが、法的責任を持つ人間のみが確定できます。",
      ),
    ],
  },
  {
    heading: {
      vi: "13. Góc phỏng vấn: bảng quyết định và AI trong bảo hiểm",
      en: "13. Interview angle: decision tables and AI in insurance",
      ja: "13. 面接の観点: 保険における決定表と AI",
    },
    blocks: [
      P(
        "Khi phỏng vấn QA cho vị trí bảo hiểm, một câu hỏi kinh điển là 'bạn kiểm thử logic nghiệp vụ nhiều điều kiện như thế nào'. Câu trả lời mạnh nêu ngay bảng quyết định: liệt kê điều kiện, xây bảng đầy đủ và không mâu thuẫn, biến mỗi quy tắc thành một test case data-driven, và dùng bảng làm oracle độc lập với engine. Bạn nói thêm về kiểm cả lý do lẫn kết quả, về payout không âm, về fraud flag buộc REVIEW, và về audit giải thích được. Cách trả lời có cấu trúc này cho thấy bạn hiểu miền chứ không chỉ biết chạy công cụ.",
        "When interviewing QA for an insurance role, a classic question is 'how do you test multi-condition business logic'. A strong answer immediately raises the decision table: list conditions, build a complete and non-contradictory table, turn each rule into a data-driven test case, and use the table as an oracle independent of the engine. You add checking both the reason and the outcome, non-negative payout, the fraud flag forcing REVIEW, and explainable audit. This structured answer shows you understand the domain, not just how to run tools.",
        "保険職の QA 面接では「多条件の業務ロジックをどうテストするか」が古典的な質問です。強い回答はすぐ決定表を挙げます。条件を列挙し、完全で無矛盾な表を構築し、各規則をデータ駆動テストケースに変え、エンジンから独立したオラクルとして表を使う。理由と結果の両方の確認、非負の支払額、REVIEW を強制する不正フラグ、説明可能な監査を加えます。この構造的な回答はツールの実行方法だけでなくドメインを理解していることを示します。",
      ),
      P(
        "Phần AI thường được hỏi tiếp: 'AI giúp gì và bạn kiểm soát rủi ro thế nào'. Ở đây bạn nhấn mạnh mẫu tách vai: LLM sinh đầu vào biên đa dạng để mở rộng độ phủ, còn kết quả kỳ vọng luôn tính từ bảng quyết định độc lập, không hỏi LLM. Bạn giải thích vì sao không để LLM quyết kết quả, vì sao không để AI sửa bảng, và vì sao meta-test kiểm chính bảng lại quan trọng. Nếu bạn diễn đạt được rằng AI mở rộng bề rộng còn bảng giữ tính đúng, người phỏng vấn sẽ thấy bạn nắm cả cơ hội lẫn giới hạn của AI trong một miền nhạy cảm.",
        "The AI part usually follows: 'what does AI help with and how do you control the risk'. Here you emphasize the role-splitting pattern: the LLM generates diverse boundary inputs to expand coverage, while the expected outcome is always computed from an independent decision table, never asking the LLM. You explain why you don't let the LLM decide the outcome, why you don't let AI edit the table, and why a meta-test checking the table itself matters. If you can articulate that AI expands breadth while the table holds correctness, the interviewer sees you grasp both the opportunity and the limits of AI in a sensitive domain.",
        "AI の部分は通常続きます。「AI は何を助け、リスクをどう制御するか」。ここで役割分担パターンを強調します。LLM は網羅拡大のため多様な境界入力を生成し、期待結果は常に独立した決定表から計算され LLM に尋ねません。なぜ LLM に結果を決めさせないか、なぜ AI に表を編集させないか、なぜ表自体を確認するメタテストが重要かを説明します。AI が幅を広げ表が正しさを保持すると明確に述べられれば、面接官はあなたが機微な領域での AI の機会と限界の両方を掴んでいると見ます。",
      ),
      SCEN(
        "Phỏng vấn tình huống: 'Engine duyệt một hồ sơ đáng lẽ phải từ chối. Bạn điều tra thế nào?'",
        "Situational interview: 'The engine approved a claim that should have been denied. How do you investigate?'",
        "Tôi bắt đầu bằng cách tra bảng quyết định cho đầu vào đó xem kết quả đúng phải là gì và lý do nào. Nếu bảng nói DENY mà engine trả APPROVE, engine lệch bảng — tôi thêm test data-driven cho đúng tổ hợp đó rồi sửa engine. Nếu bảng lại nói APPROVE, tức bảng sai: có thể thiếu một điều khoản loại trừ hoặc thứ tự điều kiện sai — đây là lỗi đặc tả, tôi báo nghiệp vụ và chạy meta-test để tìm các tổ hợp tương tự. Lỗi lọt qua luôn là bằng chứng oracle còn lỗ hổng.",
        "I start by looking up the decision table for that input to see what the correct outcome and reason should be. If the table says DENY but the engine returned APPROVE, the engine diverges from the table — I add a data-driven test for that exact combination then fix the engine. If the table also says APPROVE, the table is wrong: perhaps a missing exclusion clause or wrong condition order — this is a spec bug, I report to business and run the meta-test to find similar combinations. An escaped bug is always evidence the oracle still has a hole.",
        "私はまずその入力について決定表を引き、正しい結果と理由が何であるべきかを見ます。表が DENY と言うのにエンジンが APPROVE を返したなら、エンジンが表からずれています。まさにその組み合わせのデータ駆動テストを追加しエンジンを修正します。表も APPROVE と言うなら表が誤りです。免責条項の欠落か条件順序の誤りかもしれません。これは仕様バグで、業務に報告しメタテストを実行して類似の組み合わせを探します。漏れたバグは常にオラクルにまだ穴がある証拠です。",
      ),
      NOTE(
        "Thông điệp cốt lõi: trong bảo hiểm, oracle bảng quyết định là nguồn sự thật do con người sở hữu; AI chỉ mở rộng độ phủ đầu vào. Người kiểm thử giỏi giữ vững biên giới đó và luôn kiểm cả kết quả, lý do lẫn khả năng giải thích.",
        "Core message: in insurance, the decision-table oracle is the human-owned source of truth; AI only expands input coverage. The strong tester firmly holds that boundary and always checks the outcome, the reason, and explainability.",
        "核心メッセージ: 保険では決定表オラクルが人間の所有する真実の源であり、AI は入力網羅を広げるだけです。優れたテスターはその境界を固く守り、常に結果・理由・説明可能性を確認します。",
      ),
    ],
  },
];

const artA = {
  categorySlug: "ai-in-testing",
  slug: "ai-banking-regression-double-entry",
  cover: coverA,
  tags: tags("thucchien", "banking", "aitesting", "api", "realworld", "interview"),
  title: {
    vi: "Regression core-banking có AI hỗ trợ: bút toán kép làm oracle (2026)",
    en: "AI-assisted core-banking regression: double-entry as the oracle (2026)",
    ja: "AI 支援のコアバンキング回帰: オラクルとしての複式簿記(2026)",
  },
  summary: {
    vi: "AI tăng tốc regression cho core-banking mà KHÔNG được tin về tính đúng đắn. Oracle bút toán kép — tiền bảo toàn, nợ=có, idempotent khi retry — bối cảnh quy mô/SLA/tuân thủ, mô hình dữ liệu sổ cái, ma trận case, happy path, case lỗi sâu (timeout, duplicate, partial failure, reversal), gate CI, ranh giới AI-agent và góc phỏng vấn.",
    en: "AI accelerates core-banking regression WITHOUT being trusted for correctness. The double-entry oracle — money conserved, debits=credits, idempotent on retry — with scale/SLA/compliance context, ledger data model, case matrix, happy path, deep failure cases (timeout, duplicate, partial failure, reversal), CI gate, AI-agent boundary and interview angle.",
    ja: "AI はコアバンキングの回帰を加速するが正しさは信頼されません。複式簿記オラクル——資金保存、借方=貸方、再試行時の冪等——を、規模・SLA・コンプライアンスの背景、元帳データモデル、ケースマトリクス、ハッピーパス、深い障害ケース(タイムアウト・重複・部分障害・取消)、CI ゲート、AI エージェントの境界、面接の観点とともに解説します。",
  },
  pages: buildDoc(pagesA),
};

const artB = {
  categorySlug: "ai-in-testing",
  slug: "ai-insurance-claims-decision-table",
  cover: coverB,
  tags: tags("thucchien", "insurance", "aitesting", "datadriven", "realworld", "interview"),
  title: {
    vi: "Kiểm thử engine bồi thường bảo hiểm có AI: bảng quyết định làm oracle (2026)",
    en: "Testing an AI-assisted insurance claims engine: the decision table as oracle (2026)",
    ja: "AI 支援の保険金請求エンジンのテスト: オラクルとしての決定表(2026)",
  },
  summary: {
    vi: "Bảng quyết định là nguồn sự thật cho engine bồi thường có AI hỗ trợ: coverage, exclusion, limit, deductible, fraud flag. Test data-driven mỗi quy tắc một case, LLM mở rộng tổ hợp biên trong khi bảng giữ tính đúng, case lỗi sâu (bảng mâu thuẫn/thiếu luật), audit giải thích được, gate CI, ranh giới AI-agent và góc phỏng vấn.",
    en: "The decision table is the source of truth for an AI-assisted claims engine: coverage, exclusions, limits, deductibles, fraud flags. Data-driven tests with one case per rule, the LLM expanding edge combinations while the table holds correctness, deep failure cases (contradictory/missing-rule tables), explainable audit, CI gate, AI-agent boundary and interview angle.",
    ja: "決定表は AI 支援の請求エンジンの真実の源です。補償・免責・限度額・免責額・不正フラグ。規則ごとに一ケースのデータ駆動テスト、LLM が境界の組み合わせを拡大し表が正しさを保持、深い障害ケース(矛盾・欠落規則の表)、説明可能な監査、CI ゲート、AI エージェントの境界、面接の観点を扱います。",
  },
  pages: buildDoc(pagesB),
};

export const AI_DOCS_06 = [artA, artB];