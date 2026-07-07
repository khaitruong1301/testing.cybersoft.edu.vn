// ============================================================================
// AIAGENT_05 — 2 bài "AI Agent cho kiểm thử" (kind=nangcao).
// A: Chống hallucination & grounding một AI testing agent (healthcare).
// B: LLM-as-judge để đánh giá kết quả kiểm thử (SaaS chatbot/nội dung sinh).
// Trilingual VI/EN/JA (JA thật, khác EN). Block types khớp ArticleViewer.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia05a", domain: "healthcare", kind: "nangcao", label: "GROUNDING" });
const coverB = makeThumb({ id: "aia05b", domain: "saas", kind: "nangcao", label: "LLM-AS-JUDGE" });

// ---------------------------------------------------------------------------
// SVG helpers cho IMG (hand-drawn)
// ---------------------------------------------------------------------------
const SVG_GROUND_LOOP = `<svg viewBox="0 0 640 350" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="350" fill="#083344"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e0f2fe">Grounding loop: retrieve → verify → act → cite</text>
<rect x="30" y="60" width="150" height="80" rx="10" fill="#0e7490" stroke="#67e8f9" stroke-width="2"/>
<text x="105" y="95" text-anchor="middle" font-size="14" font-weight="800" fill="#ecfeff">RETRIEVE</text>
<text x="105" y="116" text-anchor="middle" font-size="10" fill="#a5f3fc">DOM · OpenAPI · schema</text>
<rect x="245" y="60" width="150" height="80" rx="10" fill="#155e63" stroke="#5eead4" stroke-width="2"/>
<text x="320" y="95" text-anchor="middle" font-size="14" font-weight="800" fill="#ccfbf1">VERIFY</text>
<text x="320" y="116" text-anchor="middle" font-size="10" fill="#99f6e4">locator/API tồn tại?</text>
<rect x="460" y="60" width="150" height="80" rx="10" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2"/>
<text x="535" y="95" text-anchor="middle" font-size="14" font-weight="800" fill="#dbeafe">ACT + CITE</text>
<text x="535" y="116" text-anchor="middle" font-size="10" fill="#bfdbfe">action kèm chứng cứ</text>
<defs><marker id="grA" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#grA)"><path d="M180 100 h60"/><path d="M395 100 h60"/></g>
<path d="M320 145 v40 h-215 v-40" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#grA)"/>
<text x="212" y="205" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fda4af">không tìm được chứng cứ → REFUSE, không bịa</text>
<rect x="30" y="235" width="270" height="90" rx="8" fill="#0b1a24" stroke="#155e63"/>
<text x="165" y="260" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">Hallucination bị chặn</text>
<g font-size="10" fill="#94a3b8"><text x="48" y="282">✗ selector bịa · ✗ API tưởng tượng</text><text x="48" y="300">✗ assertion không có oracle</text><text x="48" y="318">✗ liều thuốc tự nghĩ ra</text></g>
<rect x="340" y="235" width="270" height="90" rx="8" fill="#0b1a24" stroke="#155e63"/>
<text x="475" y="260" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">Evidence store</text>
<g font-size="10" fill="#94a3b8"><text x="358" y="282">aria snapshot · request/response</text><text x="358" y="300">schema id · nguồn y khoa duyệt</text><text x="358" y="318">→ mọi bước có citation</text></g>
</svg>`;

const SVG_CONFIDENT_WRONG = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#083344"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e0f2fe">Ma trận: độ tự tin vs độ đúng (calibration)</text>
<line x1="90" y1="60" x2="90" y2="250" stroke="#67e8f9" stroke-width="2"/>
<line x1="90" y1="250" x2="600" y2="250" stroke="#67e8f9" stroke-width="2"/>
<text x="345" y="285" text-anchor="middle" font-size="11" fill="#a5f3fc">Đúng (grounded) →</text>
<text x="60" y="155" text-anchor="middle" font-size="11" fill="#a5f3fc" transform="rotate(-90 60 155)">Tự tin →</text>
<rect x="100" y="70" width="240" height="85" fill="#7f1d1d" opacity="0.5" stroke="#fca5a5"/>
<text x="220" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#fecaca">CONFIDENTLY WRONG</text>
<text x="220" y="128" text-anchor="middle" font-size="10" fill="#fecaca">tự tin cao · sai — nguy hiểm nhất</text>
<rect x="350" y="70" width="240" height="85" fill="#064e3b" opacity="0.5" stroke="#6ee7b7"/>
<text x="470" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#a7f3d0">CONFIDENT & CORRECT</text>
<text x="470" y="128" text-anchor="middle" font-size="10" fill="#a7f3d0">tin tưởng · hành động</text>
<rect x="100" y="162" width="240" height="83" fill="#1e293b" stroke="#64748b"/>
<text x="220" y="200" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">UNSURE & WRONG</text>
<text x="220" y="220" text-anchor="middle" font-size="10" fill="#94a3b8">tự khai không chắc → refuse OK</text>
<rect x="350" y="162" width="240" height="83" fill="#1e293b" stroke="#64748b"/>
<text x="470" y="200" text-anchor="middle" font-size="12" font-weight="700" fill="#cbd5e1">UNSURE & CORRECT</text>
<text x="470" y="220" text-anchor="middle" font-size="10" fill="#94a3b8">bỏ lỡ · nên nâng grounding</text>
</svg>`;

const SVG_JUDGE_PIPELINE = `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="340" fill="#0c4a6e"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e0f2fe">Pipeline chấm điểm: oracle xác định + LLM-as-judge</text>
<rect x="30" y="60" width="160" height="70" rx="9" fill="#0369a1" stroke="#7dd3fc" stroke-width="2"/>
<text x="110" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="#e0f2fe">Output cần chấm</text>
<text x="110" y="110" text-anchor="middle" font-size="10" fill="#bae6fd">câu trả lời chatbot</text>
<rect x="30" y="150" width="160" height="70" rx="9" fill="#14532d" stroke="#86efac" stroke-width="2"/>
<text x="110" y="180" text-anchor="middle" font-size="12" font-weight="800" fill="#dcfce7">Oracle xác định</text>
<text x="110" y="200" text-anchor="middle" font-size="10" fill="#bbf7d0">format · JSON · số liệu</text>
<rect x="30" y="240" width="160" height="70" rx="9" fill="#3730a3" stroke="#a5b4fc" stroke-width="2"/>
<text x="110" y="270" text-anchor="middle" font-size="12" font-weight="800" fill="#e0e7ff">LLM-as-judge</text>
<text x="110" y="290" text-anchor="middle" font-size="10" fill="#c7d2fe">rubric · điểm mềm</text>
<defs><marker id="jpA" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#94a3b8"/></marker></defs>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#jpA)"><path d="M190 95 h70 v90 h-40" transform="translate(0,0)"/></g>
<rect x="300" y="120" width="150" height="100" rx="9" fill="#111827" stroke="#475569"/>
<text x="375" y="150" text-anchor="middle" font-size="12" font-weight="800" fill="#e2e8f0">Kết hợp</text>
<text x="375" y="172" text-anchor="middle" font-size="10" fill="#94a3b8">gate cứng: oracle</text>
<text x="375" y="190" text-anchor="middle" font-size="10" fill="#94a3b8">điểm mềm: judge</text>
<text x="375" y="208" text-anchor="middle" font-size="10" fill="#94a3b8">bias/position check</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#jpA)"><path d="M190 185 h110"/><path d="M190 275 h60 v-80 h50"/></g>
<rect x="470" y="140" width="150" height="60" rx="9" fill="#0f766e" stroke="#5eead4" stroke-width="2"/>
<text x="545" y="167" text-anchor="middle" font-size="12" font-weight="800" fill="#ccfbf1">Verdict + calib.</text>
<text x="545" y="186" text-anchor="middle" font-size="10" fill="#99f6e4">so với nhãn người</text>
<g stroke="#94a3b8" stroke-width="2.5" fill="none" marker-end="url(#jpA)"><path d="M450 170 h20"/></g>
<text x="320" y="330" text-anchor="middle" font-size="11" fill="#bae6fd">Judge không bao giờ ghi đè oracle cứng; chỉ chấm phần open-ended.</text>
</svg>`;

const SVG_PAIRWISE = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="640" height="300" fill="#0c4a6e"/>
<text x="320" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#e0f2fe">Pointwise vs Pairwise + position bias</text>
<rect x="30" y="60" width="270" height="200" rx="10" fill="#0b2e40" stroke="#7dd3fc"/>
<text x="165" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#e0f2fe">Pointwise (chấm điểm)</text>
<g font-size="10.5" fill="#bae6fd"><text x="48" y="115">• mỗi output → điểm 1–5</text><text x="48" y="140">• cần rubric neo mốc rõ</text><text x="48" y="165">• dễ trôi thang điểm</text><text x="48" y="190">• tốt cho theo dõi tuyệt đối</text><text x="48" y="215">• rẻ, 1 lần gọi/output</text></g>
<rect x="340" y="60" width="270" height="200" rx="10" fill="#0b2e40" stroke="#a5b4fc"/>
<text x="475" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#e0e7ff">Pairwise (A vs B)</text>
<g font-size="10.5" fill="#c7d2fe"><text x="358" y="115">• so 2 output → chọn tốt hơn</text><text x="358" y="140">• ổn định hơn, ít trôi</text><text x="358" y="165">⚠ position bias: đảo A/B</text><text x="358" y="190">• dùng cho so mô hình</text><text x="358" y="215">• đắt hơn, tổ hợp cặp</text></g>
</svg>`;

// ---------------------------------------------------------------------------
// PAGES
// ---------------------------------------------------------------------------
const pagesA = [];
const pagesB = [];

pagesA.push({
  heading: {
    vi: "1. Hallucination trong ngữ cảnh agent kiểm thử là gì",
    en: "1. What hallucination means in an agentic testing context",
    ja: "1. テストエージェント文脈におけるハルシネーションとは",
  },
  blocks: [
    P(
      "Trong ngữ cảnh một AI testing agent tự sinh và tự chạy test, hallucination (ảo giác) không phải là chuyện văn chương bay bổng, mà là những khẳng định cụ thể mà agent tự tin đưa ra nhưng không hề tồn tại trong hệ thống thật. Ví dụ agent viết một locator kiểu getByTestId('submit-appointment') trong khi trang thật không có test-id đó; hoặc gọi POST /api/v2/prescribe khi API thực chỉ là /api/prescriptions. Nó cũng có thể chèn một assertion nghe rất hợp lý — expect(banner).toHaveText('Đặt lịch thành công') — nhưng banner ấy chưa từng xuất hiện. Những sai lệch này nguy hiểm vì test vẫn trông đẹp và người review dễ tin.",
      "In the context of an AI testing agent that authors and runs tests, hallucination is not flowery prose; it is concrete claims the agent confidently makes that simply do not exist in the real system. For example the agent writes a locator like getByTestId('submit-appointment') when the real page has no such test-id, or calls POST /api/v2/prescribe when the real API is only /api/prescriptions. It may insert a plausible assertion — expect(banner).toHaveText('Appointment booked') — for a banner that never appears. These are dangerous because the test still looks clean and a reviewer tends to trust it.",
      "テストを自動生成・実行するAIテストエージェントの文脈では、ハルシネーションは美辞麗句ではなく、実システムに存在しない具体的な主張をエージェントが自信満々に述べることを指します。例えば実ページにその test-id が無いのに getByTestId('submit-appointment') というロケーターを書いたり、実APIが /api/prescriptions だけなのに POST /api/v2/prescribe を呼んだりします。存在しないバナーに対し expect(banner).toHaveText('予約完了') のようなアサーションを挿入することもあります。テストが綺麗に見えレビュアーが信じてしまうため危険です。",
    ),
    P(
      "Khác với chatbot trả lời sai một câu hỏi kiến thức, agent kiểm thử tạo ra hiện vật hành động: mã sẽ chạy, sẽ gọi mạng, và trong domain y tế có thể chạm tới dữ liệu bệnh nhân. Một test hallucinated có ba số phận: (a) fail ngay vì locator không tồn tại — đỡ nhất; (b) pass giả vì assertion quá yếu hoặc trúng phần tử khác — nguy hiểm; (c) chạm nhầm endpoint thật và gây tác dụng phụ. Vì vậy chúng ta cần xem hallucination như một lỗi bảo mật và an toàn, không chỉ lỗi chất lượng.",
      "Unlike a chatbot answering a knowledge question wrong, a testing agent produces action artifacts: code that will run, will make network calls, and in a healthcare domain may touch patient data. A hallucinated test has three fates: (a) it fails immediately because the locator does not exist — the mildest; (b) it passes falsely because the assertion is too weak or matches another element — dangerous; (c) it hits a real endpoint and causes side effects. So we must treat hallucination as a security and safety defect, not merely a quality one.",
      "知識質問を誤答するチャットボットと異なり、テストエージェントは行動アーティファクトを生み出します。実際に走り、ネットワークを呼び、医療領域では患者データに触れうるコードです。捏造テストには三つの結末があります。(a) ロケーターが存在せず即失敗する — 最も軽い、(b) アサーションが弱すぎるか別要素に一致して偽陽性で合格する — 危険、(c) 実エンドポイントに触れ副作用を起こす。したがってハルシネーションは品質欠陥ではなくセキュリティと安全の欠陥として扱うべきです。",
    ),
    IMG(
      SVG_GROUND_LOOP,
      "Vòng lặp grounding: lấy chứng cứ → xác minh → hành động kèm trích dẫn; không có chứng cứ thì từ chối.",
      "Grounding loop: retrieve evidence → verify → act with citation; refuse when no evidence.",
      "グラウンディングのループ：証拠取得→検証→引用付き実行。証拠が無ければ拒否する。",
    ),
    NOTE(
      "Định nghĩa vận hành: một bước của agent bị coi là hallucinated nếu nó tham chiếu tới thực thể (selector, route, field, giá trị) không truy vết được về một artifact thật đã được retrieve.",
      "Operational definition: an agent step is hallucinated if it references an entity (selector, route, field, value) not traceable to a real retrieved artifact.",
      "運用上の定義：エージェントの手順が、取得済みの実アーティファクトに辿れない実体（セレクタ・ルート・フィールド・値）を参照する場合、それは捏造とみなします。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. Ba dạng hallucination hay gặp: selector, API, assertion bịa",
    en: "2. Three common hallucination shapes: invented selectors, APIs, assertions",
    ja: "2. よくある三つのハルシネーション：捏造セレクタ・API・アサーション",
  },
  blocks: [
    P(
      "Dạng thứ nhất là selector bịa. Agent suy diễn cấu trúc UI từ tên trường trong prompt và tạo locator theo quy ước mà nó thấy quen — data-testid, id, hoặc text — nhưng không xác nhận trên trang thật. Dạng thứ hai là API tưởng tượng: agent giả định RESTful đẹp đẽ (versioning /v2, số nhiều, mã 201) trong khi API thật lệch chuẩn. Dạng thứ ba, tinh vi nhất, là assertion không có oracle: agent khẳng định một hành vi mong đợi mà không có nguồn nào định nghĩa hành vi đó — đặc biệt nguy hiểm trong y tế khi 'liều dùng đúng' phải đến từ phác đồ, không phải trí nhớ mô hình.",
      "The first shape is the invented selector. The agent infers UI structure from field names in the prompt and produces a locator following a convention it finds familiar — data-testid, id, or text — without confirming it on the real page. The second is the imagined API: the agent assumes a pretty RESTful design (/v2 versioning, plurals, 201) while the real API deviates. The third and subtlest is the assertion with no oracle: the agent asserts an expected behaviour that no source defines — especially dangerous in healthcare where 'correct dosage' must come from a protocol, not model memory.",
      "第一の型は捏造セレクタです。エージェントはプロンプト中のフィールド名からUI構造を推測し、慣れた規約（data-testid、id、テキスト）に沿ってロケーターを作りますが、実ページで確認しません。第二は想像上のAPIです。実APIが規約から外れているのに、綺麗なREST設計（/v2 バージョニング、複数形、201）を仮定します。第三で最も巧妙なのはオラクルの無いアサーションです。どの情報源も定義していない期待挙動を主張します。『正しい用量』が模型の記憶ではなく診療プロトコルから来るべき医療では特に危険です。",
    ),
    CODE(
      "ts",
      `// ❌ Test do agent SINH RA — chứa cả 3 dạng hallucination
import { test, expect } from '@playwright/test';

test('đặt lịch khám', async ({ page, request }) => {
  await page.goto('/booking');
  // (1) selector BỊA: trang thật không có test-id này
  await page.getByTestId('submit-appointment').click();
  // (2) API TƯỞNG TƯỢNG: version /v2 + tên endpoint không tồn tại
  const res = await request.post('/api/v2/prescribe', {
    data: { drug: 'Amoxicillin', dose: '500mg', freq: 'tid' }, // liều tự nghĩ
  });
  // (3) assertion KHÔNG có oracle: banner text này chưa từng tồn tại
  await expect(page.getByRole('alert')).toHaveText('Đặt lịch thành công');
});`,
    ),
    WARN(
      "Với trợ lý y tế, một liều 'nghe hợp lý' do mô hình bịa có thể vượt ngưỡng an toàn nhi khoa. Không bao giờ để giá trị lâm sàng đến từ trí nhớ mô hình; phải neo vào phác đồ đã duyệt.",
      "For a healthcare assistant, a 'plausible' dose the model invents may exceed a paediatric safety limit. Never let a clinical value come from model memory; anchor it to an approved protocol.",
      "医療アシスタントでは、模型が捏造した『もっともらしい』用量が小児の安全上限を超えうります。臨床値を模型の記憶に由来させてはならず、承認済みプロトコルに必ず紐付けます。",
    ),
    UL(
      ["Selector bịa → verify trên DOM/ARIA snapshot thật", "API tưởng tượng → verify với OpenAPI spec", "Assertion không oracle → chặn ở review, đòi nguồn"],
      ["Invented selector → verify against real DOM/ARIA snapshot", "Imagined API → verify against OpenAPI spec", "Oracle-less assertion → block at review, demand a source"],
      ["捏造セレクタ→実DOM/ARIAスナップショットで検証", "想像上のAPI→OpenAPI仕様で検証", "オラクル無しアサーション→レビューで阻止し出典を要求"],
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "3. Grounding: neo agent vào artifact thật của ứng dụng",
    en: "3. Grounding: anchoring the agent to real application artifacts",
    ja: "3. グラウンディング：エージェントを実アプリのアーティファクトに固定する",
  },
  blocks: [
    P(
      "Grounding (nối đất) là nguyên tắc: agent chỉ được nói về những gì nó đã nhìn thấy trong hệ thống thật, thông qua các artifact được retrieve trước khi hành động. Ba nguồn grounding cốt lõi cho một web app y tế là: (1) ARIA/DOM snapshot của trang hiện tại để biết vai trò, tên, và bounding box của phần tử; (2) OpenAPI spec để biết chính xác route, method, schema request/response; (3) database schema (hoặc data dictionary) để biết ràng buộc và bảng nào là nguồn sự thật. Khi agent muốn dùng một selector hay endpoint, nó phải rút ra từ chính các artifact này, không phải từ trí nhớ.",
      "Grounding is the principle that the agent may only talk about what it has actually observed in the real system, via artifacts retrieved before acting. The three core grounding sources for a healthcare web app are: (1) the ARIA/DOM snapshot of the current page for element roles, names and bounding boxes; (2) the OpenAPI spec for exact routes, methods, request/response schemas; (3) the database schema (or data dictionary) for constraints and which table is the source of truth. When the agent wants a selector or endpoint, it must derive it from these artifacts, not from memory.",
      "グラウンディングとは、エージェントが行動前に取得したアーティファクトを介して、実システムで実際に観測したことだけを語ってよいという原則です。医療Webアプリの三つの中核情報源は、(1) 要素の役割・名前・バウンディングボックスを知るための現在ページのARIA/DOMスナップショット、(2) 正確なルート・メソッド・リクエスト/レスポンススキーマを知るためのOpenAPI仕様、(3) 制約とどのテーブルが真実の源かを知るためのDBスキーマ（データ辞書）です。セレクタやエンドポイントは記憶ではなくこれらから導出します。",
    ),
    IMG(
      SVG_CONFIDENT_WRONG,
      "Ma trận tự tin × đúng: ô nguy hiểm nhất là 'tự tin nhưng sai' — grounding kéo agent về phía cột đúng.",
      "Confidence × correctness matrix: the deadliest cell is 'confident but wrong' — grounding pulls the agent toward the correct column.",
      "自信×正しさの行列：最も危険なのは『自信があるが誤り』のマス。グラウンディングはエージェントを正しい列へ引き寄せます。",
    ),
    CODE(
      "ts",
      `// Retrieve artifact THẬT trước khi để agent viết bất kỳ selector nào
import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function retrieveGrounding(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // 1) ARIA snapshot: nguồn sự thật cho role + accessible name
  const aria = await page.locator('body').ariaSnapshot();
  // 2) OpenAPI: nguồn sự thật cho route/method/schema
  const openapi = JSON.parse(fs.readFileSync('openapi.json', 'utf8'));
  const routes = Object.keys(openapi.paths); // vd: ['/api/appointments','/api/prescriptions']
  await browser.close();
  return { aria, routes, schemas: openapi.components?.schemas ?? {} };
}
// Agent CHỈ được chọn selector/route xuất hiện trong { aria, routes }`,
    ),
    TIP(
      "Playwright v1.60 đưa bounding box vào ARIA snapshot — rất hợp cho agent AI vì có toạ độ layout để phân biệt hai nút cùng tên. Dùng nó làm nguồn grounding chính cho UI.",
      "Playwright v1.60 adds bounding boxes to ARIA snapshots — ideal for AI agents since layout coordinates disambiguate two same-named buttons. Use it as the primary UI grounding source.",
      "Playwright v1.60 はARIAスナップショットにバウンディングボックスを追加しました。レイアウト座標で同名ボタンを区別できるためAIエージェントに最適です。UIの主要グラウンディング源として使いましょう。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Retrieval của DOM / OpenAPI / schema làm ngữ cảnh",
    en: "4. Retrieval of DOM / OpenAPI / schema as context",
    ja: "4. コンテキストとしてのDOM/OpenAPI/スキーマの取得",
  },
  blocks: [
    P(
      "Retrieval hiệu quả không phải nhồi cả DOM khổng lồ vào prompt, mà chọn lọc và cấu trúc hoá. Với DOM, ta rút gọn thành cây accessibility: chỉ giữ role, name, state, và một handle ổn định (ví dụ ref do Playwright MCP cấp). Với OpenAPI, ta trích đúng các path liên quan tới nhiệm vụ (đặt lịch → /api/appointments) kèm schema, thay vì toàn bộ spec. Với database, ta cung cấp phần data dictionary của bảng liên quan: cột, kiểu, ràng buộc NOT NULL/CHECK, khoá ngoại. Ngữ cảnh gọn và đúng làm giảm mạnh xác suất mô hình 'điền vào chỗ trống' bằng bịa đặt.",
      "Effective retrieval is not stuffing a giant DOM into the prompt but selecting and structuring. For DOM, reduce to the accessibility tree: keep only role, name, state and a stable handle (e.g. a ref from Playwright MCP). For OpenAPI, extract only the paths relevant to the task (booking → /api/appointments) with schemas, not the whole spec. For the database, provide the data dictionary of the relevant tables: columns, types, NOT NULL/CHECK constraints, foreign keys. Concise, correct context sharply reduces the model's tendency to 'fill the gap' with fabrication.",
      "効果的な取得とは巨大なDOMをプロンプトに詰め込むことではなく、選別し構造化することです。DOMはアクセシビリティツリーに縮約し、役割・名前・状態と安定ハンドル（例：Playwright MCPのref）だけを残します。OpenAPIは仕様全体ではなくタスク関連のパス（予約→/api/appointments）とスキーマのみを抽出します。DBは関連テーブルのデータ辞書（列・型・NOT NULL/CHECK制約・外部キー）を提供します。簡潔で正確なコンテキストは、模型が空白を捏造で埋める傾向を大きく減らします。",
    ),
    CODE(
      "ts",
      `// Rút gọn DOM -> cây a11y tối giản cho prompt (ít token, ít cám dỗ bịa)
type A11yNode = { role: string; name: string; ref: string };

function condenseAria(snapshot: string): A11yNode[] {
  // snapshot dạng YAML aria của Playwright; parse ra danh sách phần tử tương tác
  return snapshot
    .split('\\n')
    .map((l) => l.match(/^\\s*- (\\w+)\\s+"([^"]+)"(?:\\s+\\[ref=([^\\]]+)\\])?/))
    .filter(Boolean)
    .map((m) => ({ role: m![1], name: m![2], ref: m![3] ?? '' }))
    .filter((n) => ['button', 'link', 'textbox', 'combobox'].includes(n.role));
}
// System prompt: "Chỉ dùng ref trong danh sách. Không có ref phù hợp -> báo cần thêm dữ liệu."`,
    ),
    SCEN(
      "Retrieval sai dẫn tới hallucination dây chuyền",
      "Wrong retrieval causes a hallucination cascade",
      "Một sprint, team đưa nhầm OpenAPI của môi trường staging cũ vào ngữ cảnh agent. Agent sinh test gọi /api/v1/appointments (đã bị bỏ), test fail hàng loạt, và Healer lại 'sửa' bằng cách bịa header auth. Bài học: artifact grounding phải versioned và khớp đúng môi trường đích; một nguồn cũ sẽ đầu độc toàn bộ chuỗi.",
      "In one sprint the team fed the agent context the OpenAPI of an old staging environment. The agent generated tests calling /api/v1/appointments (deprecated), tests failed en masse, and the Healer 'fixed' them by inventing auth headers. Lesson: grounding artifacts must be versioned and matched to the exact target environment; one stale source poisons the whole chain.",
      "あるスプリントでチームは古いステージング環境のOpenAPIをエージェントのコンテキストに誤って渡しました。エージェントは廃止済みの /api/v1/appointments を呼ぶテストを生成し、テストが大量に失敗、Healerは認証ヘッダーを捏造して『修正』しました。教訓：グラウンディング用アーティファクトはバージョン管理し対象環境に厳密に一致させること。古い情報源一つが連鎖全体を汚染します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "5. Verify-before-action: xác minh trước khi hành động",
    en: "5. Verify-before-action: confirm before you act",
    ja: "5. 行動前検証：行動する前に確認する",
  },
  blocks: [
    P(
      "Grounding cung cấp nguyên liệu; verify-before-action là kỷ luật thực thi. Trước mỗi bước có tác dụng phụ, agent phải chèn một bước kiểm chứng rẻ và chỉ đọc: locator có đúng một phần tử khớp không? route có trong danh sách OpenAPI không? payload có validate được với schema không? Nếu kiểm chứng thất bại, agent KHÔNG được đoán mò — nó phải dừng, ghi lý do, và trả về trạng thái 'cần thêm thông tin'. Mô hình này biến hallucination im lặng thành lỗi lớn tiếng, phát hiện được, thay vì test xanh giả.",
      "Grounding supplies the raw material; verify-before-action is the execution discipline. Before every side-effecting step the agent inserts a cheap, read-only check: does the locator match exactly one element? is the route in the OpenAPI list? does the payload validate against the schema? If a check fails the agent must NOT guess — it stops, records the reason, and returns a 'need more information' state. This turns silent hallucination into a loud, detectable error instead of a fake green test.",
      "グラウンディングは素材を供給し、行動前検証は実行の規律です。副作用を伴う各手順の前に、エージェントは安価で読み取り専用の確認を挿入します。ロケーターはちょうど一要素に一致するか？ ルートはOpenAPIの一覧にあるか？ ペイロードはスキーマで検証できるか？ 検証が失敗したらエージェントは推測してはならず、停止し理由を記録し『情報不足』状態を返します。これにより静かなハルシネーションが、偽の緑テストではなく、検出可能な明白なエラーになります。",
    ),
    CODE(
      "ts",
      `// Guard tự kiểm chứng — chạy TRƯỚC mọi hành động sinh bởi agent
import { z } from 'zod';

async function verifyLocator(page, ref: string) {
  const loc = page.getByRole('button', { name: ref }); // hoặc theo ref MCP
  const n = await loc.count();
  if (n !== 1) throw new AgentRefuse(\`locator '\${ref}' khớp \${n} phần tử, cần đúng 1\`);
  return loc;
}

function verifyRoute(routes: string[], route: string) {
  if (!routes.includes(route)) throw new AgentRefuse(\`route '\${route}' không có trong OpenAPI\`);
}

function verifyPayload(schema: z.ZodTypeAny, data: unknown) {
  const r = schema.safeParse(data);
  if (!r.success) throw new AgentRefuse('payload vi phạm schema: ' + r.error.message);
}

class AgentRefuse extends Error {} // agent DỪNG an toàn thay vì đoán`,
    ),
    NOTE(
      "'Đúng một phần tử' là oracle mạnh cho locator: khớp 0 nghĩa là selector bịa, khớp >1 nghĩa là mơ hồ. Cả hai đều phải chặn hành động, không được click bừa phần tử đầu.",
      "'Exactly one element' is a strong locator oracle: 0 matches means an invented selector, >1 means ambiguity. Both must block the action; never click the first match blindly.",
      "『ちょうど一要素』はロケーターの強力なオラクルです。一致0は捏造セレクタ、一致2以上は曖昧さを意味します。どちらも行動を阻止すべきで、最初の一致を盲目的にクリックしてはいけません。",
    ),
    QA(
      "Vì sao verify-before-action tốt hơn là để test fail rồi Healer sửa?",
      "Why is verify-before-action better than letting the test fail then having the Healer fix it?",
      "Vì Healer làm việc sau khi hành động đã xảy ra — trong y tế, một POST nhầm tới endpoint kê đơn có thể đã tạo bản ghi. Verify-before-action chặn ở lớp chỉ-đọc trước khi chạm hệ thống, nên không có tác dụng phụ. Healer nên chỉ dùng cho lỗi thật (selector đổi), không phải để sửa hậu quả của hallucination.",
      "Because the Healer works after the action has happened — in healthcare a mistaken POST to a prescribe endpoint may already have created a record. Verify-before-action blocks at a read-only layer before touching the system, so there is no side effect. The Healer should only handle real drift (a changed selector), not clean up hallucination fallout.",
      "Healerは行動が起きた後に働くためです。医療では処方エンドポイントへの誤ったPOSTが既にレコードを作っているかもしれません。行動前検証はシステムに触れる前の読み取り専用層で阻止するため副作用がありません。Healerは実際のドリフト（セレクタ変更）だけを扱うべきで、ハルシネーションの後始末には使いません。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Trích dẫn chứng cứ (citation) cho từng bước của agent",
    en: "6. Citing evidence for every agent step",
    ja: "6. エージェントの各手順への証拠引用",
  },
  blocks: [
    P(
      "Một agent đáng tin không chỉ hành động đúng, nó còn phải trưng ra vì sao nó tin bước đó đúng. Citation là việc mỗi hành động gắn kèm con trỏ tới artifact đã grounding: selector này đến từ dòng nào của ARIA snapshot, route này đến từ path nào của OpenAPI, giá trị liều đến từ mục nào của phác đồ. Citation biến trace của agent thành hồ sơ kiểm toán: người review đọc được chuỗi thought → evidence → action → observation và có thể bác bỏ bước không có chứng cứ. Trong y tế, đây cũng là yêu cầu tuân thủ.",
      "A trustworthy agent does not merely act correctly; it must show why it believed the step correct. Citation means every action carries a pointer to the grounded artifact: this selector came from which line of the ARIA snapshot, this route from which OpenAPI path, this dose value from which protocol section. Citations turn the agent trace into an audit record: reviewers can read the thought → evidence → action → observation chain and reject any step lacking evidence. In healthcare this is also a compliance requirement.",
      "信頼できるエージェントは正しく行動するだけでなく、その手順が正しいと信じた理由を示さなければなりません。引用とは、各行動がグラウンディング済みアーティファクトへのポインタを持つことです。このセレクタはARIAスナップショットのどの行から、このルートはどのOpenAPIパスから、この用量値はどのプロトコル節から来たか。引用はエージェントのトレースを監査記録に変え、レビュアーは思考→証拠→行動→観測の連鎖を読み、証拠の無い手順を却下できます。医療ではこれはコンプライアンス要件でもあります。",
    ),
    CODE(
      "json",
      `// Một bước trong trace của agent — BẮT BUỘC có trường "evidence"
{
  "step": 7,
  "thought": "Cần bấm nút xác nhận đặt lịch",
  "action": { "tool": "click", "ref": "btn-confirm-appt" },
  "evidence": {
    "source": "aria-snapshot#L42",
    "quote": "- button \\"Xác nhận đặt lịch\\" [ref=btn-confirm-appt]"
  },
  "observation": { "status": "ok", "url": "/appointments/9182" }
}
// Bước KHÔNG có "evidence" -> reviewer từ chối, tính là hallucination.`,
    ),
    IMG(
      SVG_GROUND_LOOP,
      "Mỗi hành động kèm citation về evidence store; bước thiếu chứng cứ bị coi là hallucination và bị chặn.",
      "Every action carries a citation into the evidence store; a step lacking evidence is treated as hallucination and blocked.",
      "各行動は証拠ストアへの引用を伴います。証拠を欠く手順はハルシネーションとみなし阻止します。",
    ),
    TIP(
      "Bắt buộc trường evidence trong schema output của agent (dùng structured output / JSON schema). Nếu mô hình không điền được evidence hợp lệ, coi như bước đó vô hiệu — ép mô hình phải grounding.",
      "Make the evidence field mandatory in the agent's output schema (via structured output / JSON schema). If the model cannot fill valid evidence, treat the step as void — this forces the model to ground.",
      "エージェントの出力スキーマで evidence フィールドを必須にします（構造化出力/JSONスキーマを使用）。模型が有効な証拠を埋められなければその手順を無効とみなし、模型にグラウンディングを強制します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Ràng buộc an toàn cho trợ lý y tế đang được kiểm thử",
    en: "7. Safety constraints for a healthcare assistant under test",
    ja: "7. テスト対象の医療アシスタントの安全制約",
  },
  blocks: [
    P(
      "Khi đối tượng bị kiểm thử là một trợ lý y tế (đặt lịch, nhắc thuốc, phân loại triệu chứng), agent kiểm thử phải hoạt động trong một hàng rào an toàn nghiêm ngặt. Ràng buộc gồm: không bao giờ gọi endpoint ghi thật trên môi trường có dữ liệu bệnh nhân thực; mọi giá trị lâm sàng phải đến từ tập dữ liệu tổng hợp đã duyệt; agent không được tự sinh chẩn đoán hay liều; và bất kỳ hành động chạm PHI (thông tin sức khoẻ được bảo vệ) đều bị chặn ở lớp policy. Đây là bounded action space áp cho chính agent test.",
      "When the system under test is a healthcare assistant (booking, medication reminders, symptom triage), the testing agent must operate inside a strict safety fence. Constraints include: never call a real write endpoint on an environment holding real patient data; every clinical value must come from an approved synthetic dataset; the agent may not itself generate a diagnosis or dose; and any action touching PHI (protected health information) is blocked at the policy layer. This is a bounded action space imposed on the testing agent itself.",
      "テスト対象が医療アシスタント（予約、服薬リマインド、症状トリアージ）の場合、テストエージェントは厳格な安全柵の中で動作しなければなりません。制約には、実患者データを持つ環境で実書き込みエンドポイントを決して呼ばない、臨床値は承認済み合成データセットから来る、エージェント自身が診断や用量を生成しない、PHI（保護対象保健情報）に触れる行動はポリシー層で阻止する、が含まれます。これはテストエージェント自身に課す境界付き行動空間です。",
    ),
    CODE(
      "ts",
      `// Policy gate: chặn hành động nguy hiểm TRƯỚC khi agent chạm hệ thống
const FORBIDDEN = [
  { method: 'POST', path: /\\/api\\/prescriptions/, env: 'prod' }, // ghi đơn thật
  { method: 'DELETE', path: /.*/, env: 'prod' },
  { anyPHIWrite: true, env: 'prod' },
];

function policyGate(act: { method: string; path: string; env: string }) {
  for (const rule of FORBIDDEN) {
    if (rule.env === act.env && rule.method === act.method && rule.path?.test(act.path))
      throw new PolicyBlock(\`Chặn \${act.method} \${act.path} trên \${act.env}\`);
  }
  // Chỉ cho chạy write trên môi trường sandbox với dữ liệu tổng hợp
  if (act.method !== 'GET' && act.env !== 'sandbox')
    throw new PolicyBlock('Write chỉ được phép trên sandbox');
}
class PolicyBlock extends Error {}`,
    ),
    WARN(
      "Không dùng dữ liệu bệnh nhân thật để test AI agent, kể cả 'chỉ đọc'. Rò rỉ PHI qua log/trace của agent là vi phạm nghiêm trọng. Dùng dữ liệu tổng hợp và bôi đen trace.",
      "Do not use real patient data to test the AI agent, even 'read-only'. Leaking PHI through the agent's logs/traces is a serious violation. Use synthetic data and redact traces.",
      "『読み取りのみ』であっても実患者データでAIエージェントをテストしないでください。エージェントのログ/トレースからのPHI漏洩は重大な違反です。合成データを用いトレースをマスクしてください。",
    ),
    SCEN(
      "Agent gợi ý liều — ai chịu trách nhiệm?",
      "The agent suggests a dose — who is accountable?",
      "Trong review, một test do agent sinh đã 'kiểm tra' rằng trợ lý trả về liều 500mg cho trẻ 3 tuổi. Vấn đề: chính agent test đã bịa con số 500mg làm expected, không neo vào phác đồ nhi. Team siết lại: mọi expected lâm sàng phải trích từ bảng liều đã được dược sĩ duyệt; agent chỉ được so khớp, không được đề xuất. Ranh giới trách nhiệm phải rõ trước khi automation chạm y khoa.",
      "In review, an agent-generated test 'checked' that the assistant returns a 500mg dose for a 3-year-old. The problem: the testing agent itself invented 500mg as the expected value, unanchored to a paediatric protocol. The team tightened the rule: every clinical expected value must be cited from a pharmacist-approved dosing table; the agent may only match, never propose. Accountability boundaries must be explicit before automation touches medicine.",
      "レビューで、あるエージェント生成テストは、アシスタントが3歳児に500mgの用量を返すことを『検証』していました。問題は、テストエージェント自身が小児プロトコルに紐付かない期待値500mgを捏造したことです。チームは規則を強化しました。臨床の期待値はすべて薬剤師承認の用量表から引用し、エージェントは照合のみで提案は不可。自動化が医療に触れる前に責任の境界を明確にすべきです。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Phát hiện khi agent 'tự tin nhưng sai'",
    en: "8. Detecting when the agent is confidently wrong",
    ja: "8. エージェントが『自信満々に誤る』ときの検出",
  },
  blocks: [
    P(
      "Trường hợp nguy hiểm nhất không phải agent do dự, mà agent tự tin nhưng sai: nó khẳng định chắc nịch một điều bịa. Vì mô hình ngôn ngữ không tự nhiên hiệu chỉnh độ tự tin, ta không thể tin lời tự khai 'tôi chắc chắn'. Thay vào đó ta phát hiện qua tín hiệu bên ngoài: (1) evidence rỗng hoặc không truy vết được; (2) self-consistency — chạy lại vài lần với seed/nhiệt độ khác, nếu selector đổi liên tục thì đó là bịa; (3) cross-check với oracle độc lập (DOM thật, schema thật); (4) phát hiện out-of-vocabulary: route/field không nằm trong tập cho phép.",
      "The most dangerous case is not a hesitant agent but a confidently wrong one: it firmly asserts something fabricated. Because language models are not naturally calibrated, we cannot trust a self-reported 'I am sure'. Instead we detect via external signals: (1) empty or untraceable evidence; (2) self-consistency — rerun a few times with different seed/temperature, and if the selector keeps changing it is fabricated; (3) cross-check against an independent oracle (the real DOM, the real schema); (4) out-of-vocabulary detection: a route/field not in the allowed set.",
      "最も危険なのは躊躇するエージェントではなく、自信満々に誤るエージェントです。捏造したことを断固として主張します。言語モデルは本来キャリブレーションされていないため、自己申告の『確信している』を信頼できません。代わりに外部信号で検出します。(1) 空または追跡不能な証拠、(2) 自己一貫性 — 異なるシード/温度で数回再実行しセレクタが変わり続ければ捏造、(3) 独立オラクル（実DOM・実スキーマ）との照合、(4) 語彙外検出：許可集合に無いルート/フィールド。",
    ),
    CODE(
      "ts",
      `// Phát hiện 'confidently wrong' bằng self-consistency + cross-check
async function isLikelyHallucinated(genSelector: () => Promise<string>, dom: Set<string>) {
  const samples = await Promise.all([0, 1, 2].map(() => genSelector())); // 3 lần, seed khác
  const unstable = new Set(samples).size > 1;          // (2) không nhất quán
  const notInDom = samples.some((s) => !dom.has(s));   // (3) không có trong DOM thật
  return { unstable, notInDom, flagged: unstable || notInDom };
}
// flagged=true -> KHÔNG dùng output; escalate cho người, dù mô hình 'tự tin'.`,
    ),
    IMG(
      SVG_CONFIDENT_WRONG,
      "Mục tiêu: đẩy agent khỏi ô đỏ 'tự tin nhưng sai' bằng cross-check độc lập và self-consistency.",
      "Goal: push the agent out of the red 'confident but wrong' cell using independent cross-checks and self-consistency.",
      "目標：独立照合と自己一貫性により、エージェントを赤い『自信があるが誤り』のマスから追い出すこと。",
    ),
    QA(
      "Có thể tin điểm 'confidence' mà mô hình tự trả về không?",
      "Can we trust the 'confidence' score the model reports about itself?",
      "Không nên tin trực tiếp. Mô hình thường quá tự tin và độ tự tin tự khai kém tương quan với độ đúng. Hãy coi confidence tự khai như một tín hiệu yếu, và ưu tiên tín hiệu khách quan: evidence truy vết được, self-consistency, và cross-check với oracle. Nếu buộc dùng, phải calibrate confidence đó với nhãn thật trước.",
      "Not directly. Models are often overconfident and self-reported confidence correlates poorly with correctness. Treat self-reported confidence as a weak signal and prefer objective ones: traceable evidence, self-consistency, and cross-checks against an oracle. If you must use it, calibrate that confidence against ground-truth labels first.",
      "直接は信頼すべきではありません。模型はしばしば過信し、自己申告の確信度は正しさとの相関が弱いです。自己申告の確信度は弱い信号とみなし、追跡可能な証拠・自己一貫性・オラクルとの照合という客観的信号を優先します。使わざるを得ない場合は、まず正解ラベルでその確信度をキャリブレーションしてください。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "9. Tích hợp Playwright MCP: driver có grounding sẵn",
    en: "9. Integrating Playwright MCP: a driver with built-in grounding",
    ja: "9. Playwright MCP の統合：グラウンディング内蔵ドライバ",
  },
  blocks: [
    P(
      "Playwright MCP (Model Context Protocol) cho phép mô hình điều khiển trình duyệt qua cây accessibility thay vì pixel. Đây là một dạng grounding tích hợp sẵn: mỗi tool trả về snapshot có ref ổn định, nên mô hình 'nhìn' đúng phần tử thật thay vì đoán selector. Với agent kiểm thử y tế, MCP giúp mọi tương tác đều neo vào role/name thật, giảm hallucination selector về gần bằng không. Tuy nhiên MCP không tự chặn API bịa hay giá trị lâm sàng bịa — ta vẫn phải bọc thêm policy gate và citation.",
      "Playwright MCP (Model Context Protocol) lets a model drive the browser via the accessibility tree rather than pixels. This is a form of built-in grounding: each tool returns a snapshot with stable refs, so the model 'sees' the real element instead of guessing a selector. For a healthcare testing agent, MCP anchors every interaction to real roles/names, driving selector hallucination close to zero. But MCP does not by itself block invented APIs or fabricated clinical values — you still wrap it with a policy gate and citation.",
      "Playwright MCP（Model Context Protocol）は、模型がピクセルではなくアクセシビリティツリーを介してブラウザを操作できるようにします。これは内蔵グラウンディングの一形態です。各ツールは安定refを持つスナップショットを返すため、模型はセレクタを推測せず実要素を『見ます』。医療テストエージェントでは、MCPが全操作を実役割/名前に固定し、セレクタのハルシネーションをほぼゼロにします。ただしMCPだけでは捏造APIや偽の臨床値を阻止しないため、ポリシーゲートと引用で包む必要があります。",
    ),
    CODE(
      "yaml",
      `# .mcp/config — Playwright MCP với hàng rào cho agent y tế
servers:
  playwright:
    command: npx
    args: ["@playwright/mcp@latest", "--headless"]
    env:
      # Chỉ cho phép điều hướng trong domain sandbox
      PW_MCP_ALLOWED_ORIGINS: "https://sandbox.clinic.local"
    policy:
      blockOrigins: ["https://prod.clinic.example"]   # chặn prod
      capabilities: ["snapshot", "click", "type", "navigate"]  # KHÔNG cho "evaluate" tuỳ ý`,
    ),
    NOTE(
      "MCP dùng accessibility tree nên cũng cải thiện a11y coverage: nếu agent không tìm thấy phần tử qua role/name, rất có thể phần tử đó cũng không tiếp cận được cho người dùng trợ năng — một tín hiệu chất lượng kép.",
      "Because MCP uses the accessibility tree it also improves a11y coverage: if the agent cannot find an element by role/name, that element is likely inaccessible to assistive-tech users too — a double quality signal.",
      "MCPはアクセシビリティツリーを使うためa11yカバレッジも向上します。エージェントが役割/名前で要素を見つけられなければ、その要素は支援技術利用者にもアクセス不能な可能性が高く、二重の品質信号となります。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Oracle-first: bất biến nghiệp vụ y tế làm chuẩn đúng",
    en: "10. Oracle-first: healthcare business invariants as the truth",
    ja: "10. オラクル第一：医療の業務不変条件を真実とする",
  },
  blocks: [
    P(
      "Nguyên tắc oracle-first nói: đừng khẳng định 'hiện thị thành công', hãy khẳng định bất biến nghiệp vụ. Trong đặt lịch y tế, các bất biến gồm: một slot không bao giờ bị đặt kép (no double-booking); mỗi lịch hẹn phải gắn đúng một bệnh nhân và một bác sĩ có chứng chỉ hợp lệ; huỷ lịch phải idempotent (bấm huỷ hai lần → một trạng thái huỷ, không lỗi); và không đơn thuốc nào vượt ngưỡng liều tối đa. Agent chỉ được viết assertion neo vào các bất biến này, lấy từ nguồn duyệt, chứ không phải từ suy đoán.",
      "The oracle-first principle says: don't assert 'shows success', assert the business invariant. In healthcare booking the invariants include: a slot is never double-booked; each appointment maps to exactly one patient and one validly-licensed doctor; cancellation is idempotent (pressing cancel twice → one cancelled state, no error); and no prescription exceeds the maximum dose. The agent may only write assertions anchored to these invariants, drawn from approved sources, not from speculation.",
      "オラクル第一の原則は、『成功と表示される』ではなく業務不変条件を主張せよ、と言います。医療予約では不変条件に、スロットは決して二重予約されない、各予約はちょうど一人の患者と有効免許を持つ一人の医師に対応する、キャンセルは冪等（二度押しても一つのキャンセル状態でエラーなし）、いかなる処方も最大用量を超えない、が含まれます。エージェントはこれらの不変条件に紐付き承認済み情報源から取ったアサーションのみを書き、推測から書きません。",
    ),
    CODE(
      "ts",
      `// Oracle-first: assertion neo vào BẤT BIẾN, không phải 'thấy chữ thành công'
import { test, expect } from '@playwright/test';

test('không double-booking cùng slot', async ({ request }) => {
  const slot = { doctorId: 'dr-01', at: '2026-07-10T09:00Z' };
  const a = await request.post('/api/appointments', { data: { ...slot, patientId: 'p-1' } });
  const b = await request.post('/api/appointments', { data: { ...slot, patientId: 'p-2' } });
  expect(a.status()).toBe(201);
  expect(b.status()).toBe(409);          // slot đã bị chiếm -> xung đột
  // Oracle: đếm trong DB đúng 1 lịch cho slot này
  const count = await request.get('/api/appointments/count?slot=' + encodeURIComponent(slot.at));
  expect((await count.json()).n).toBe(1);
});

test('huỷ lịch idempotent', async ({ request }) => {
  const id = 'appt-9182';
  const r1 = await request.delete('/api/appointments/' + id);
  const r2 = await request.delete('/api/appointments/' + id); // gọi lại
  expect(r1.status()).toBe(200);
  expect(r2.status()).toBe(200);         // idempotent: không lỗi, cùng trạng thái
  const s = await (await request.get('/api/appointments/' + id)).json();
  expect(s.status).toBe('cancelled');    // đúng 1 trạng thái cuối
});`,
    ),
    TIP(
      "Đưa danh sách bất biến (double-booking, idempotency, ngưỡng liều) vào ngữ cảnh agent như một 'oracle catalogue'. Agent chỉ được chọn assertion từ catalogue — cấm tự phát minh kỳ vọng.",
      "Feed the invariant list (no double-booking, idempotency, dose limits) into the agent context as an 'oracle catalogue'. The agent may only pick assertions from the catalogue — inventing expectations is forbidden.",
      "不変条件の一覧（二重予約禁止・冪等性・用量上限）を『オラクルカタログ』としてエージェントのコンテキストに与えます。エージェントはカタログからのみアサーションを選べ、期待の発明は禁止です。",
    ),
    QA(
      "Oracle-first liên quan gì tới chống hallucination?",
      "How does oracle-first relate to fighting hallucination?",
      "Rất trực tiếp: hallucination assertion nguy hiểm nhất là loại 'nghe hợp lý nhưng vô căn cứ'. Khi assertion bắt buộc phải neo vào một bất biến đã duyệt, agent không còn chỗ để bịa kỳ vọng. Oracle-first thu hẹp không gian điều agent được phép khẳng định xuống còn tập hữu hạn, kiểm chứng được — đó chính là grounding ở tầng khẳng định.",
      "Very directly: the most dangerous hallucinated assertion is the 'plausible but baseless' kind. When an assertion must anchor to an approved invariant, the agent has no room to invent expectations. Oracle-first narrows the space of what the agent may assert down to a finite, checkable set — that is grounding at the assertion layer.",
      "非常に直接的です。最も危険な捏造アサーションは『もっともらしいが根拠が無い』種類です。アサーションが承認済み不変条件に紐付く必要があると、エージェントに期待を捏造する余地はありません。オラクル第一はエージェントが主張してよい空間を有限で検証可能な集合に狭めます。これがアサーション層のグラウンディングです。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. Trace, HAR và tái lập để điều tra hallucination",
    en: "11. Trace, HAR and replay to investigate hallucination",
    ja: "11. ハルシネーション調査のためのトレース・HAR・再現",
  },
  blocks: [
    P(
      "Khi nghi ngờ agent bịa, ta cần bằng chứng khách quan. Playwright cung cấp trace (thao tác + snapshot + console) và từ v1.60 hỗ trợ HAR như một first-class tracing (tracing.startHar/stopHar). Với agent, ta ghi lại: mọi request/response (để đối chiếu route thật), mọi ARIA snapshot tại thời điểm chọn selector, và seed cố định để tái lập. Nhờ đó khi một bước bị nghi bịa, ta mở trace và xác nhận: selector này có trong snapshot không, route này có trả 200 không, hay chỉ là tưởng tượng của mô hình.",
      "When we suspect the agent fabricated something we need objective evidence. Playwright provides traces (actions + snapshots + console) and since v1.60 supports HAR as first-class tracing (tracing.startHar/stopHar). For an agent we record: every request/response (to check the real route), every ARIA snapshot at selector-selection time, and a fixed seed for replay. So when a step is suspected of fabrication we open the trace and confirm: is this selector in the snapshot, did this route return 200, or was it just the model's imagination.",
      "エージェントが捏造したと疑うとき、客観的証拠が必要です。Playwrightはトレース（操作＋スナップショット＋コンソール）を提供し、v1.60以降はHARを第一級トレーシング（tracing.startHar/stopHar）として支援します。エージェントでは、全リクエスト/レスポンス（実ルート照合用）、セレクタ選択時の全ARIAスナップショット、再現用の固定シードを記録します。ある手順が捏造と疑われたらトレースを開き、このセレクタはスナップショットにあるか、このルートは200を返したか、それとも模型の想像だったかを確認します。",
    ),
    CODE(
      "ts",
      `// Bật trace + HAR để có hồ sơ khách quan điều tra hallucination (v1.60+)
import { test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  await context.tracing.startHar({ path: 'agent-run.har', mode: 'full' }); // v1.60
});

test.afterEach(async ({ context }, testInfo) => {
  await context.tracing.stopHar();
  await context.tracing.stop({ path: \`trace-\${testInfo.title}.zip\` });
});
// Mở: npx playwright show-trace trace-*.zip  -> tìm selector/route trong snapshot & network`,
    ),
    NOTE(
      "Dùng chế độ trace: 'retain-on-failure-and-retries' để giữ trace của cả lần retry — hallucination thường lộ ra khác nhau giữa các lần chạy, rất hữu ích khi so sánh.",
      "Use trace: 'retain-on-failure-and-retries' to keep traces from retries too — hallucination often manifests differently across runs, which is very useful to compare.",
      "trace: 'retain-on-failure-and-retries' を使い、リトライのトレースも保持します。ハルシネーションは実行ごとに異なる形で現れることが多く、比較に非常に有用です。",
    ),
    QA(
      "Vì sao cố định seed lại quan trọng khi điều tra agent?",
      "Why does fixing the seed matter when investigating an agent?",
      "Vì không có seed cố định, mỗi lần chạy agent có thể ra output khác nhau, khiến hallucination trở nên khó tái lập và khó chứng minh. Seed cố định (cộng nhiệt độ thấp) cho phép tái lập chính xác một run để đối chiếu với trace và HAR, biến 'thỉnh thoảng nó bịa' thành một ca cụ thể có thể phân tích và viết regression test.",
      "Because without a fixed seed each agent run may produce different output, making hallucination hard to reproduce and hard to prove. A fixed seed (plus low temperature) lets you replay a run exactly to compare against the trace and HAR, turning 'it sometimes fabricates' into a concrete, analysable case you can write a regression test for.",
      "固定シードが無いと実行ごとに出力が変わりうるため、ハルシネーションの再現と立証が困難になります。固定シード（および低温度）は実行を正確に再現しトレースとHARと照合でき、『時々捏造する』を分析可能で回帰テストを書ける具体的なケースに変えます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Checklist chống hallucination cho pipeline agent",
    en: "12. Anti-hallucination checklist for the agent pipeline",
    ja: "12. エージェントパイプラインの反ハルシネーションチェックリスト",
  },
  blocks: [
    P(
      "Gộp lại, một pipeline agent kiểm thử chống hallucination hiệu quả nên có bảy lớp phòng thủ, mỗi lớp bắt một loại lỗi khác nhau. Không lớp nào đủ một mình; sức mạnh đến từ việc xếp chồng. Dưới đây là checklist rút gọn để review khi đưa một agent mới vào CI, cùng câu hỏi tự vấn cho từng lớp.",
      "Put together, an effective anti-hallucination testing-agent pipeline should have seven defence layers, each catching a different failure class. No layer suffices alone; strength comes from stacking. Below is a condensed checklist to review when onboarding a new agent into CI, with a self-check question per layer.",
      "まとめると、効果的な反ハルシネーションのテストエージェントパイプラインは七つの防御層を持つべきで、各層が異なる失敗クラスを捕らえます。単独で十分な層は無く、強さは重ね合わせから生まれます。以下は新しいエージェントをCIに導入する際にレビューする簡潔なチェックリストと、各層の自問です。",
    ),
    UL(
      [
        "Retrieval: artifact có versioned & khớp môi trường đích chưa?",
        "Grounding: selector/route chỉ lấy từ artifact thật?",
        "Verify-before-action: có bước read-only kiểm chứng trước side-effect?",
        "Citation: mỗi bước có evidence truy vết được?",
        "Policy gate: chặn write prod & mọi thao tác PHI?",
        "Detection: self-consistency + cross-check bật cho bước rủi ro?",
        "Oracle-first: assertion neo vào bất biến đã duyệt, không bịa kỳ vọng?",
      ],
      [
        "Retrieval: are artifacts versioned & matched to the target environment?",
        "Grounding: are selectors/routes taken only from real artifacts?",
        "Verify-before-action: is there a read-only check before side effects?",
        "Citation: does every step carry traceable evidence?",
        "Policy gate: does it block prod writes & all PHI operations?",
        "Detection: are self-consistency + cross-check enabled for risky steps?",
        "Oracle-first: do assertions anchor to approved invariants, not invented expectations?",
      ],
      [
        "取得：アーティファクトはバージョン管理され対象環境に一致しているか？",
        "グラウンディング：セレクタ/ルートは実アーティファクトのみから取っているか？",
        "行動前検証：副作用の前に読み取り専用の確認があるか？",
        "引用：各手順は追跡可能な証拠を持つか？",
        "ポリシーゲート：本番書き込みと全PHI操作を阻止するか？",
        "検出：リスクの高い手順で自己一貫性＋照合が有効か？",
        "オラクル第一：アサーションは捏造した期待ではなく承認済み不変条件に紐付くか？",
      ],
    ),
    CODE(
      "yaml",
      `# CI gate: chặn merge nếu agent-run vi phạm bất kỳ lớp nào
- name: anti-hallucination gate
  run: |
    node scripts/check-evidence.mjs agent-run.json   # mọi step có evidence?
    node scripts/check-policy.mjs   agent-run.json   # không chạm prod/PHI?
    node scripts/check-oracle.mjs   agent-run.json   # assertion ∈ oracle catalogue?
  # exit != 0 -> fail build, không cho merge test do agent sinh`,
    ),
    TIP(
      "Đưa 'tỉ lệ bước có evidence hợp lệ' thành một metric CI hiển thị theo thời gian. Nếu tỉ lệ tụt, nghĩa là grounding đang xuống cấp (artifact cũ, prompt trôi) — cảnh báo sớm.",
      "Track 'share of steps with valid evidence' as a visible CI metric over time. A drop means grounding is degrading (stale artifacts, prompt drift) — an early warning.",
      "『有効な証拠を持つ手順の割合』を時系列で可視化するCIメトリクスにします。低下はグラウンディングの劣化（古いアーティファクト、プロンプトのドリフト）を意味し、早期警告になります。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Góc phỏng vấn: hallucination & grounding",
    en: "13. Interview angle: hallucination & grounding",
    ja: "13. 面接の観点：ハルシネーションとグラウンディング",
  },
  blocks: [
    P(
      "Nhà tuyển dụng hỏi về AI testing agent thường muốn nghe bạn phân biệt được lỗi 'chất lượng' với lỗi 'an toàn', và nêu cơ chế cụ thể chứ không nói chung chung 'AI thông minh'. Hãy chuẩn bị kể một ca thật bạn từng chặn hallucination bằng grounding, và giải thích vì sao verify-before-action lại quan trọng hơn 'thử rồi Healer sửa' trong domain nhạy cảm.",
      "Interviewers asking about AI testing agents usually want to hear you distinguish a 'quality' bug from a 'safety' bug, and name concrete mechanisms rather than hand-waving 'the AI is smart'. Prepare a real case where you blocked hallucination with grounding, and explain why verify-before-action matters more than 'try then let the Healer fix' in a sensitive domain.",
      "AIテストエージェントについて尋ねる面接官は通常、『品質』バグと『安全』バグを区別し、『AIは賢い』という曖昧さではなく具体的な仕組みを述べることを聞きたいのです。グラウンディングでハルシネーションを阻止した実例を用意し、機微な領域で『試してHealerが直す』より行動前検証がなぜ重要かを説明できるようにしましょう。",
    ),
    QA(
      "Làm sao bạn ngăn một AI agent bịa selector và assertion?",
      "How do you stop an AI agent from inventing selectors and assertions?",
      "Ba trụ: (1) grounding — chỉ cho agent dùng selector/route lấy từ ARIA snapshot & OpenAPI thật; (2) verify-before-action — kiểm 'đúng một phần tử' và 'route có trong spec' trước khi hành động, thất bại thì refuse; (3) oracle-first — assertion chỉ được neo vào catalogue bất biến đã duyệt. Kèm citation bắt buộc và policy gate cho môi trường prod/PHI. Không tin điểm confidence tự khai.",
      "Three pillars: (1) grounding — the agent may only use selectors/routes taken from the real ARIA snapshot & OpenAPI; (2) verify-before-action — check 'exactly one element' and 'route in spec' before acting, refuse on failure; (3) oracle-first — assertions may only anchor to an approved invariant catalogue. Add mandatory citation and a policy gate for prod/PHI. Never trust self-reported confidence.",
      "三本柱です。(1) グラウンディング — エージェントは実ARIAスナップショットとOpenAPIから取ったセレクタ/ルートのみ使用可、(2) 行動前検証 — 行動前に『ちょうど一要素』と『ルートが仕様にある』を確認し失敗なら拒否、(3) オラクル第一 — アサーションは承認済み不変条件カタログにのみ紐付く。必須の引用と本番/PHI用ポリシーゲートを加えます。自己申告の確信度は信頼しません。",
    ),
    QA(
      "Trong domain y tế, đâu là lằn ranh agent test không được vượt?",
      "In healthcare, what line must the testing agent never cross?",
      "Không bao giờ: gọi endpoint ghi thật trên môi trường có PHI thật; tự sinh giá trị lâm sàng (liều, chẩn đoán) làm expected; hoặc để trace/log lộ PHI. Agent chỉ so khớp với giá trị từ nguồn đã duyệt, chỉ chạy write trên sandbox dữ liệu tổng hợp, và mọi thao tác PHI bị policy gate chặn trước khi thực thi.",
      "Never: call a real write endpoint on an environment with real PHI; self-generate clinical values (dose, diagnosis) as expected; or let traces/logs leak PHI. The agent only matches values from approved sources, only runs writes on a synthetic-data sandbox, and every PHI operation is blocked by the policy gate before execution.",
      "決してしないこと：実PHIを持つ環境で実書き込みエンドポイントを呼ぶ、臨床値（用量・診断）を期待値として自己生成する、トレース/ログからPHIを漏らす。エージェントは承認済み情報源の値と照合するだけ、書き込みは合成データのサンドボックスでのみ実行し、全PHI操作は実行前にポリシーゲートで阻止されます。",
    ),
    SCEN(
      "Câu hỏi mở của phỏng vấn viên",
      "The interviewer's open question",
      "'Agent của bạn báo test pass, nhưng làm sao bạn biết nó không chỉ tự huyễn?' Trả lời tốt: tôi không tin lời agent; tôi kiểm mỗi bước có evidence truy vết về artifact thật, chạy self-consistency với seed khác, và đối chiếu assertion với oracle catalogue. Nếu một bước không có chứng cứ, tôi coi test đó vô hiệu dù nó 'xanh'.",
      "'Your agent reports the test passed — how do you know it isn't just hallucinating?' A good answer: I don't trust the agent's word; I check that each step has evidence traceable to a real artifact, run self-consistency with different seeds, and cross-check assertions against the oracle catalogue. If a step lacks evidence I treat that test as void even if it is 'green'.",
      "『エージェントはテスト合格と報告しますが、ただの幻覚でないとどう分かりますか？』 良い回答：エージェントの言葉を信じません。各手順が実アーティファクトに追跡可能な証拠を持つか確認し、異なるシードで自己一貫性を実行し、アサーションをオラクルカタログと照合します。証拠を欠く手順があれば『緑』でもそのテストを無効とみなします。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "1. Vì sao cần LLM-as-judge cho output mở",
    en: "1. Why LLM-as-judge for open-ended output",
    ja: "1. なぜオープンエンド出力にLLM-as-judgeが必要か",
  },
  blocks: [
    P(
      "Nhiều tính năng hiện đại sinh ra output không có một đáp án đúng duy nhất: câu trả lời của chatbot hỗ trợ, đoạn tóm tắt, email được tạo tự động, mô tả sản phẩm. Với những output này, assertion so-khớp-chuỗi truyền thống là vô dụng — hai câu trả lời khác từ nhưng cùng đúng sẽ bị coi là fail. LLM-as-judge (dùng một mô hình để chấm điểm output của mô hình khác) lấp khoảng trống đó: nó đánh giá theo tiêu chí mềm như tính đúng, đầy đủ, giọng điệu, an toàn — những thứ regex không nắm được. Nhưng đây là con dao hai lưỡi, phải dùng có kỷ luật.",
      "Many modern features produce output with no single correct answer: support-chatbot replies, summaries, auto-generated emails, product descriptions. For these, traditional string-match assertions are useless — two differently-worded but equally correct answers would be marked as failures. LLM-as-judge (using one model to grade another model's output) fills that gap: it evaluates soft criteria like correctness, completeness, tone, safety — things a regex cannot capture. But it is a double-edged sword and must be used with discipline.",
      "現代の多くの機能は唯一の正解が無い出力を生みます。サポートチャットボットの返答、要約、自動生成メール、商品説明などです。これらに従来の文字列一致アサーションは無力で、表現は異なるが等しく正しい二つの回答が失敗と判定されてしまいます。LLM-as-judge（ある模型で別の模型の出力を採点する）はその隙間を埋めます。正確さ・網羅性・トーン・安全性といった正規表現では捉えられない柔らかい基準を評価します。しかしこれは諸刃の剣で、規律をもって使う必要があります。",
    ),
    IMG(
      SVG_JUDGE_PIPELINE,
      "Pipeline: oracle xác định gác cửa cứng, LLM-as-judge chỉ chấm phần mở; kết hợp và calibrate.",
      "Pipeline: the deterministic oracle guards the hard gate, LLM-as-judge grades only the open part; combine and calibrate.",
      "パイプライン：決定的オラクルが硬いゲートを守り、LLM-as-judgeは開かれた部分のみ採点。組み合わせてキャリブレーションします。",
    ),
    NOTE(
      "LLM-as-judge không thay thế oracle xác định; nó bổ sung cho phần mà oracle không phủ được. Bài này luôn đặt oracle cứng trước, judge sau.",
      "LLM-as-judge does not replace the deterministic oracle; it complements the part the oracle cannot cover. This article always puts the hard oracle first, the judge second.",
      "LLM-as-judgeは決定的オラクルを置き換えません。オラクルが覆えない部分を補完します。本記事では常に硬いオラクルを先に、判定器を後に置きます。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "2. Đặt oracle xác định trước, judge sau (oracle-first)",
    en: "2. Deterministic oracle first, judge second (oracle-first)",
    ja: "2. 決定的オラクルを先に、判定器を後に（オラクル第一）",
  },
  blocks: [
    P(
      "Sai lầm phổ biến là giao mọi thứ cho LLM-as-judge, kể cả những phần vốn kiểm được bằng logic. Nguyên tắc oracle-first: bất cứ gì có thể kiểm bằng quy tắc xác định thì phải kiểm bằng quy tắc, chỉ phần thật sự mở mới đưa cho judge. Ví dụ với câu trả lời chatbot đặt hàng: JSON có đúng schema không, mã đơn có tồn tại trong DB không, tổng tiền có khớp không — đều là oracle cứng. Chỉ 'câu trả lời có lịch sự và đúng ý khách không' mới cần judge. Cách này giảm chi phí, tăng độ tin cậy, và thu hẹp bề mặt mà judge có thể sai.",
      "A common mistake is handing everything to the LLM judge, even parts checkable by logic. The oracle-first principle: anything checkable by a deterministic rule must be checked by a rule; only the genuinely open part goes to the judge. For an order-taking chatbot reply: is the JSON schema-valid, does the order id exist in the DB, does the total match — all hard oracles. Only 'is the reply polite and on-point' needs the judge. This cuts cost, raises reliability, and shrinks the surface where the judge can be wrong.",
      "よくある誤りは、論理で確認できる部分まで含めすべてをLLM判定器に委ねることです。オラクル第一の原則：決定的規則で確認できるものは規則で確認し、真にオープンな部分だけを判定器に渡します。注文受付チャットボットの返答では、JSONがスキーマ準拠か、注文IDがDBに存在するか、合計金額が一致するか、はすべて硬いオラクルです。『返答が丁寧で的を射ているか』だけが判定器を要します。これによりコストを削減し信頼性を上げ、判定器が誤りうる面を縮小します。",
    ),
    CODE(
      "ts",
      `// Oracle-first: kiểm phần XÁC ĐỊNH trước, judge CHỈ cho phần mở
import { z } from 'zod';

const OrderReply = z.object({ orderId: z.string(), total: z.number().positive() });

async function evaluateReply(reply: any, db: DB) {
  // (1) Oracle cứng — không cần LLM
  const parsed = OrderReply.safeParse(reply.structured);
  if (!parsed.success) return { pass: false, reason: 'schema invalid' };
  const order = await db.orders.find(parsed.data.orderId);
  if (!order) return { pass: false, reason: 'orderId không tồn tại' };
  if (order.total !== parsed.data.total) return { pass: false, reason: 'total lệch' };

  // (2) Chỉ phần MỞ mới đưa cho judge
  const soft = await llmJudge({ rubric: TONE_RUBRIC, text: reply.text });
  return { pass: soft.score >= 4, hardOk: true, softScore: soft.score };
}`,
    ),
    TIP(
      "Quy tắc ngón tay cái: nếu bạn viết được một assertion xác định trong 5 phút, đừng dùng judge cho nó. Judge chỉ dành cho thứ không thể biểu diễn bằng luật.",
      "Rule of thumb: if you can write a deterministic assertion in five minutes, don't use the judge for it. The judge is only for what cannot be expressed as a rule.",
      "経験則：決定的アサーションを5分で書けるなら、それに判定器を使わないこと。判定器は規則で表現できないものだけに使います。",
    ),
    QA(
      "Nếu oracle cứng đã fail thì có cần chạy judge không?",
      "If the hard oracle already fails, should we still run the judge?",
      "Không nên. Nếu JSON sai schema hay mã đơn không tồn tại thì output đã sai về mặt sự thật, chấm điểm giọng điệu là vô nghĩa và tốn tiền. Hãy short-circuit: oracle cứng fail → fail ngay, không gọi judge. Judge chỉ chạy khi phần xác định đã đạt, để đánh giá chất lượng phần mở.",
      "No. If the JSON is schema-invalid or the order id does not exist, the output is already factually wrong; grading tone is meaningless and wastes money. Short-circuit: hard oracle fails → fail immediately, don't call the judge. The judge runs only once the deterministic part passes, to assess the quality of the open part.",
      "いいえ。JSONがスキーマ違反や注文IDが存在しない場合、出力は既に事実として誤りで、トーン採点は無意味で費用の無駄です。短絡させます：硬いオラクルが失敗→即失敗、判定器を呼ばない。判定器は決定的部分が合格した後のみ実行し、オープン部分の品質を評価します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "3. Thiết kế rubric: neo mốc rõ ràng, có ví dụ",
    en: "3. Rubric design: clear anchors with examples",
    ja: "3. ルーブリック設計：明確な基準と例",
  },
  blocks: [
    P(
      "Chất lượng của LLM-as-judge phụ thuộc gần như hoàn toàn vào rubric. Một rubric tốt không nói 'chấm chất lượng từ 1 đến 5' mà định nghĩa từng mức bằng mô tả cụ thể và ví dụ neo (anchor examples). Ví dụ mức 5 = 'trả lời đúng, đầy đủ mọi ý khách hỏi, giọng lịch sự, không bịa thông tin'; mức 1 = 'sai hoặc bịa thông tin quan trọng'. Nên tách thành nhiều tiêu chí độc lập (đúng, đầy đủ, an toàn, giọng điệu) thay vì một điểm tổng mơ hồ, để judge chấm từng chiều và ta biết chính xác vì sao trượt.",
      "The quality of an LLM judge depends almost entirely on the rubric. A good rubric does not say 'grade quality 1 to 5' but defines each level with concrete descriptions and anchor examples. For instance level 5 = 'correct, covers every point the customer asked, polite tone, no fabricated information'; level 1 = 'wrong or fabricates important information'. Split into several independent criteria (correctness, completeness, safety, tone) rather than one vague total, so the judge scores each dimension and you know exactly why it failed.",
      "LLM判定器の品質はほぼ完全にルーブリックに依存します。良いルーブリックは『品質を1〜5で採点』ではなく、各レベルを具体的な説明と基準例（アンカー例）で定義します。例えばレベル5＝『正確で、顧客が尋ねた全ての点を網羅し、丁寧なトーン、情報の捏造なし』、レベル1＝『誤りまたは重要情報の捏造』。曖昧な総合点ではなく複数の独立基準（正確さ・網羅性・安全性・トーン）に分け、判定器が各次元を採点し、なぜ不合格かを正確に把握できるようにします。",
    ),
    CODE(
      "ts",
      `// Rubric có neo mốc rõ + tách chiều — đưa vào prompt của judge
export const TONE_RUBRIC = \`
Chấm từng tiêu chí 1-5 (chỉ trả JSON):
correctness: 5=đúng hoàn toàn, khớp nguồn; 3=đúng một phần; 1=sai/bịa.
completeness: 5=trả lời mọi ý khách hỏi; 3=thiếu 1 ý; 1=bỏ sót ý chính.
safety: 5=không lời khuyên nguy hiểm/PII; 1=vi phạm chính sách.
tone: 5=lịch sự, rõ ràng; 1=cộc/khó hiểu.
Ví dụ neo (few-shot):
- Input: "Đơn của tôi đâu?" | Output: "Đơn #A12 đang giao, đến 5/7." => correctness 5, completeness 5.
- Output: "Chắc là ổn thôi." => correctness 1, completeness 1.
Trả: {"correctness":n,"completeness":n,"safety":n,"tone":n,"reason":"..."}\`;`,
    ),
    WARN(
      "Rubric mơ hồ ('chấm sao cho hợp lý') làm judge chấm theo cảm tính, phương sai cao và không tái lập. Luôn ràng buộc output judge thành JSON có các trường cố định, kèm ví dụ neo.",
      "A vague rubric ('grade sensibly') makes the judge score by vibe, high variance and non-reproducible. Always constrain the judge output to JSON with fixed fields, plus anchor examples.",
      "曖昧なルーブリック（『適切に採点せよ』）は判定器を感覚で採点させ、分散が高く再現不能にします。判定器の出力は必ず固定フィールドを持つJSONに制約し、基準例を添えます。",
    ),
    SCEN(
      "Thang điểm trôi giữa các sprint",
      "The scale drifts between sprints",
      "Team dùng judge với rubric 'chấm 1-10 theo cảm nhận'. Ba sprint sau, điểm trung bình tăng từ 6.2 lên 7.8 dù chất lượng không đổi — hoá ra mỗi lần đổi prompt nhỏ, judge lại 'rộng tay' hơn. Sau khi thêm ví dụ neo cố định cho mức 1/3/5 và ép JSON, điểm ổn định và có thể so sánh giữa các sprint. Bài học: không có mốc neo thì điểm judge không có nghĩa tuyệt đối.",
      "The team used a judge with a rubric 'grade 1-10 by feel'. Three sprints later the average rose from 6.2 to 7.8 though quality was unchanged — each small prompt tweak made the judge more lenient. After adding fixed anchor examples for levels 1/3/5 and forcing JSON, scores stabilised and became comparable across sprints. Lesson: without anchors, judge scores have no absolute meaning.",
      "チームは『感覚で1〜10採点』というルーブリックで判定器を使いました。3スプリント後、品質は変わらないのに平均が6.2から7.8へ上昇 — 小さなプロンプト調整のたびに判定器が甘くなったのです。レベル1/3/5に固定の基準例を追加しJSONを強制すると、点数が安定しスプリント間で比較可能になりました。教訓：基準が無ければ判定器の点数に絶対的な意味はありません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "4. Pointwise vs pairwise: chấm điểm hay so sánh",
    en: "4. Pointwise vs pairwise: scoring or comparing",
    ja: "4. ポイントワイズ対ペアワイズ：採点か比較か",
  },
  blocks: [
    P(
      "Có hai chế độ chính khi dùng judge. Pointwise (chấm điểm): đưa một output và yêu cầu điểm tuyệt đối theo rubric — tốt để theo dõi chất lượng theo thời gian, nhưng dễ bị trôi thang điểm. Pairwise (so cặp): đưa hai output A và B, yêu cầu chọn cái tốt hơn — ổn định hơn vì so sánh tương đối dễ hơn chấm tuyệt đối, rất hợp để chọn giữa hai phiên bản mô hình. Nhược điểm của pairwise là chi phí (tổ hợp cặp) và position bias — judge có xu hướng thiên vị vị trí (thường chọn A). Chọn chế độ theo mục tiêu: theo dõi tuyệt đối → pointwise; quyết định 'model nào tốt hơn' → pairwise.",
      "There are two main judge modes. Pointwise (scoring): give one output and ask for an absolute score by rubric — good for tracking quality over time, but prone to scale drift. Pairwise (comparison): give two outputs A and B, ask which is better — more stable because relative comparison is easier than absolute scoring, ideal for choosing between two model versions. Pairwise's downsides are cost (pair combinations) and position bias — the judge tends to favour a position (often A). Choose by goal: absolute tracking → pointwise; deciding 'which model is better' → pairwise.",
      "判定器の主要モードは二つです。ポイントワイズ（採点）：一つの出力を与えルーブリックで絶対点を求める — 時系列の品質追跡に良いが尺度のドリフトを起こしやすい。ペアワイズ（比較）：二つの出力AとBを与えどちらが良いか問う — 相対比較は絶対採点より容易なため安定し、二つの模型バージョンの選択に最適。ペアワイズの欠点はコスト（ペアの組合せ）と位置バイアス — 判定器は位置（多くはA）を優遇しがち。目標で選びます：絶対追跡→ポイントワイズ、『どの模型が良いか』の判断→ペアワイズ。",
    ),
    IMG(
      SVG_PAIRWISE,
      "So sánh pointwise và pairwise: điểm mạnh/yếu và cảnh báo position bias khi dùng pairwise.",
      "Pointwise vs pairwise: strengths/weaknesses and the position-bias warning for pairwise.",
      "ポイントワイズ対ペアワイズ：長所短所とペアワイズ時の位置バイアス警告。",
    ),
    CODE(
      "ts",
      `// Pairwise với KHỬ position bias: đảo A/B và lấy trung bình
async function pairwise(judge, prompt: string, a: string, b: string) {
  const ab = await judge(\`\${prompt}\\nA:\${a}\\nB:\${b}\\nChọn 'A' hoặc 'B'.\`);
  const ba = await judge(\`\${prompt}\\nA:\${b}\\nB:\${a}\\nChọn 'A' hoặc 'B'.\`); // đảo vị trí
  // Nếu kết quả mâu thuẫn khi đảo -> position bias, coi là hoà
  const firstWins = ab.trim() === 'A';
  const secondWinsWhenSwapped = ba.trim() === 'B';
  if (firstWins && secondWinsWhenSwapped) return 'A';
  if (!firstWins && !secondWinsWhenSwapped) return 'B';
  return 'tie'; // không nhất quán -> không kết luận
}`,
    ),
    NOTE(
      "Pointwise rẻ (1 lần gọi/output) nhưng cần rubric neo mốc chắc. Pairwise ổn định hơn nhưng phải luôn đảo vị trí để trung hoà position bias.",
      "Pointwise is cheap (one call per output) but needs firmly anchored rubrics. Pairwise is more stable but you must always swap positions to neutralise position bias.",
      "ポイントワイズは安価（出力ごと1回呼び出し）だが基準の確かなルーブリックを要します。ペアワイズはより安定するが位置バイアスを中和するため常に位置を入れ替える必要があります。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "5. Bias & hiệu ứng vị trí của judge",
    en: "5. Judge bias & position effects",
    ja: "5. 判定器のバイアスと位置効果",
  },
  blocks: [
    P(
      "LLM-as-judge mang nhiều thiên lệch có hệ thống mà ta phải chủ động trung hoà. Position bias: thiên vị output đứng trước (hoặc sau) bất kể chất lượng. Verbosity bias: thiên vị câu trả lời dài, nghe 'đầy đủ' hơn dù không đúng hơn. Self-preference bias: judge ưu ái output do chính họ hàng mô hình sinh ra. Formatting bias: thiên vị output có bullet, tiêu đề đẹp. Sycophancy: dễ đồng ý với giả định trong prompt. Nếu không kiểm soát, những bias này làm điểm judge lệch một cách nhất quán nhưng vô hình, dẫn tới quyết định sai về mô hình.",
      "An LLM judge carries several systematic biases we must actively neutralise. Position bias: favouring the output shown first (or last) regardless of quality. Verbosity bias: favouring longer answers that sound more 'complete' though not more correct. Self-preference bias: favouring output produced by its own model family. Formatting bias: favouring output with nice bullets and headings. Sycophancy: readily agreeing with an assumption embedded in the prompt. Left unchecked these biases skew judge scores consistently but invisibly, leading to wrong model decisions.",
      "LLM判定器は、能動的に中和すべき系統的バイアスを複数持ちます。位置バイアス：品質に関わらず先（または後）に示された出力を優遇。冗長性バイアス：正確さは同じでも『網羅的』に聞こえる長い回答を優遇。自己優先バイアス：自身の模型系統が生んだ出力を優遇。書式バイアス：綺麗な箇条書きや見出しを持つ出力を優遇。追従性：プロンプトに埋め込まれた仮定に安易に同意。放置するとこれらは判定器の点数を一貫して、しかし不可視に歪め、誤った模型判断を招きます。",
    ),
    UL(
      ["Position bias → đảo A/B, lấy trung bình", "Verbosity bias → phạt độ dài thừa trong rubric", "Self-preference → dùng judge khác họ mô hình với đối tượng", "Formatting bias → chuẩn hoá format trước khi chấm", "Sycophancy → không nhét kết luận mong muốn vào prompt"],
      ["Position bias → swap A/B, average", "Verbosity bias → penalise needless length in the rubric", "Self-preference → use a judge from a different model family than the subject", "Formatting bias → normalise formatting before grading", "Sycophancy → don't plant the desired conclusion in the prompt"],
      ["位置バイアス→A/Bを入替え平均", "冗長性バイアス→ルーブリックで無駄な長さを減点", "自己優先→対象と異なる模型系統の判定器を使用", "書式バイアス→採点前に書式を正規化", "追従性→望む結論をプロンプトに植えない"],
    ),
    CODE(
      "ts",
      `// Đo position bias thực nghiệm: cùng cặp, chỉ đổi thứ tự, xem judge có đổi ý
async function measurePositionBias(judge, pairs: [string, string][]) {
  let flips = 0;
  for (const [a, b] of pairs) {
    const first = (await judge(a, b)) === 'A';   // a ở vị trí 1
    const swapped = (await judge(b, a)) === 'B';  // a ở vị trí 2 (kỳ vọng vẫn thắng)
    if (first !== swapped) flips++;               // đổi kết luận -> lệch vị trí
  }
  return flips / pairs.length; // tỉ lệ này càng cao judge càng bị position bias
}`,
    ),
    TIP(
      "Đo bias bằng cặp 'song sinh': hai output giống hệt về nội dung, chỉ khác vị trí/độ dài/format. Nếu judge chấm lệch, đó là bias thuần, không phải khác chất lượng.",
      "Measure bias with 'twin' pairs: two outputs identical in content but differing only in position/length/format. If the judge scores them differently, that gap is pure bias, not a quality difference.",
      "『双子』ペアでバイアスを測定します：内容は同一で位置/長さ/書式だけ異なる二出力。判定器が異なる点をつければ、その差は品質差ではなく純粋なバイアスです。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "6. Calibration đối chiếu nhãn của con người",
    en: "6. Calibration against human labels",
    ja: "6. 人手ラベルとのキャリブレーション",
  },
  blocks: [
    P(
      "Judge chỉ đáng dùng nếu nó đồng thuận với con người ở mức chấp nhận được. Vì vậy ta phải calibrate: lấy một tập vàng (golden set) đã được người gán nhãn cẩn thận, cho judge chấm cùng tập, rồi đo mức đồng thuận. Chỉ số hay dùng: agreement rate, Cohen's kappa (đã trừ đồng thuận ngẫu nhiên), và tương quan Spearman cho điểm thứ hạng. Nếu kappa thấp, judge chưa đáng tin — phải sửa rubric hoặc đổi mô hình judge trước khi dùng trong CI. Calibration không phải làm một lần: khi đổi mô hình judge hay rubric, phải calibrate lại.",
      "A judge is only usable if it agrees with humans at an acceptable level. So we calibrate: take a golden set carefully labelled by humans, have the judge score the same set, then measure agreement. Common metrics: agreement rate, Cohen's kappa (which subtracts chance agreement), and Spearman correlation for ranked scores. If kappa is low the judge is not yet trustworthy — fix the rubric or change the judge model before using it in CI. Calibration is not one-off: whenever the judge model or rubric changes, recalibrate.",
      "判定器は人と許容水準で一致して初めて使えます。そこでキャリブレーションします。人が丁寧にラベル付けしたゴールデンセットを用意し、同じセットを判定器に採点させ、一致度を測ります。よく使う指標：一致率、Cohenのカッパ（偶然の一致を差し引く）、順位点にはSpearman相関。カッパが低ければ判定器はまだ信頼できず、CIで使う前にルーブリック修正か判定器模型の変更が必要です。キャリブレーションは一度きりではなく、判定器模型やルーブリックを変えたら再実施します。",
    ),
    CODE(
      "ts",
      `// Calibrate judge với golden set: đo agreement + Cohen's kappa
type Row = { human: number; judge: number };

function cohenKappa(rows: Row[], levels = 5) {
  const po = rows.filter((r) => r.human === r.judge).length / rows.length; // đồng thuận quan sát
  const pe = Array.from({ length: levels }, (_, k) => {
    const ph = rows.filter((r) => r.human === k + 1).length / rows.length;
    const pj = rows.filter((r) => r.judge === k + 1).length / rows.length;
    return ph * pj;
  }).reduce((a, b) => a + b, 0); // đồng thuận ngẫu nhiên kỳ vọng
  return (po - pe) / (1 - pe); // kappa: >0.6 khá, >0.8 tốt
}
// kappa < 0.4 -> KHÔNG dùng judge này trong CI, sửa rubric hoặc đổi mô hình.`,
    ),
    QA(
      "Ngưỡng đồng thuận nào là đủ để tin judge?",
      "What agreement threshold is enough to trust a judge?",
      "Không có con số vàng cho mọi bài toán, nhưng thực dụng: Cohen's kappa > 0.6 là khá, > 0.8 là tốt cho quyết định quan trọng. Quan trọng hơn con số là loại lỗi: judge sai lệch ở đâu (quá rộng tay với câu bịa? quá khắt khe với câu ngắn?). Hãy xem confusion matrix theo mức điểm, không chỉ một con số tổng, và đặt ngưỡng theo rủi ro nghiệp vụ.",
      "There is no golden number for every task, but pragmatically: Cohen's kappa > 0.6 is decent, > 0.8 is good for important decisions. More important than the number is the error type: where the judge is off (too lenient with fabricated answers? too harsh with short ones?). Inspect the confusion matrix by score level, not just a single aggregate, and set the threshold by business risk.",
      "全課題に通じる黄金の数値はありませんが実用的には、Cohenのカッパ>0.6でまずまず、>0.8で重要判断に良好です。数値以上に重要なのは誤りの種類です。判定器がどこでずれるか（捏造回答に甘い？短い回答に厳しい？）。単一集計ではなく点数レベル別の混同行列を見て、閾値は業務リスクで設定します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "7. Khi nào KHÔNG nên tin judge",
    en: "7. When NOT to trust the judge",
    ja: "7. 判定器を信頼すべきでないとき",
  },
  blocks: [
    P(
      "Có những tình huống judge kém tin cậy một cách hệ thống, và tốt hơn nên dùng oracle hoặc người. Thứ nhất, khi output đòi kiến thức chuyên sâu vượt mô hình judge (chẩn đoán y khoa, tính toán tài chính chính xác) — judge cũng có thể sai như đối tượng. Thứ hai, khi có xung đột lợi ích: dùng cùng họ mô hình làm cả sinh lẫn chấm dễ tự ưu ái. Thứ ba, khi tiêu chí thật ra là xác định (đúng/sai số học) — dùng oracle cứng. Thứ tư, khi rủi ro cao (quyết định pháp lý, an toàn) — cần người xem lại. Quy tắc: judge cho phần mở, rủi ro thấp; oracle và người cho phần xác định, rủi ro cao.",
      "Some situations make the judge systematically unreliable, where an oracle or a human is better. First, when the output needs deep expertise beyond the judge model (medical diagnosis, exact financial computation) — the judge can be as wrong as the subject. Second, conflict of interest: using the same model family to both generate and grade invites self-preference. Third, when the criterion is actually deterministic (arithmetic right/wrong) — use a hard oracle. Fourth, high stakes (legal, safety decisions) — require human review. Rule: judge for the open, low-risk part; oracle and human for the deterministic, high-risk part.",
      "判定器が系統的に信頼できず、オラクルや人の方が良い状況があります。第一に、出力が判定器模型を超える深い専門知識（医療診断、正確な金融計算）を要する場合 — 判定器も対象と同じく誤りうる。第二に利益相反：同じ模型系統で生成も採点も行うと自己優先を招く。第三に基準が実は決定的（算術の正誤）な場合 — 硬いオラクルを使う。第四に高リスク（法的・安全上の判断） — 人のレビューを要する。規則：オープンで低リスクな部分は判定器、決定的で高リスクな部分はオラクルと人。",
    ),
    WARN(
      "Không dùng LLM-as-judge làm oracle duy nhất cho quyết định an toàn hay tuân thủ. Judge có thể tự tin sai; những quyết định này cần oracle xác định và/hoặc người phê duyệt.",
      "Do not use an LLM judge as the sole oracle for safety or compliance decisions. A judge can be confidently wrong; those decisions need a deterministic oracle and/or human sign-off.",
      "安全やコンプライアンスの判断で、LLM判定器を唯一のオラクルにしてはいけません。判定器は自信満々に誤りうるため、これらの判断には決定的オラクルと/または人の承認が必要です。",
    ),
    CODE(
      "ts",
      `// Định tuyến đánh giá theo rủi ro: judge KHÔNG được đứng một mình ở rủi ro cao
function route(evalCase: { risk: 'low' | 'high'; deterministic: boolean }) {
  if (evalCase.deterministic) return 'oracle';           // đúng/sai rõ -> oracle
  if (evalCase.risk === 'high') return 'human+oracle';   // rủi ro cao -> người duyệt
  return 'judge';                                        // mở, rủi ro thấp -> judge
}
// Judge chỉ tự quyết ở nhánh 'judge'; nhánh khác luôn có oracle/người backstop.`,
    ),
    SCEN(
      "Judge tự tin bỏ sót lỗi tài chính",
      "The judge confidently misses a financial error",
      "Một chatbot tài chính trả lời sai công thức lãi kép nhưng diễn đạt rất trơn tru. Judge (pointwise) chấm 5/5 vì 'nghe chuyên nghiệp'. Chỉ khi thêm oracle xác định tính lại con số, lỗi mới lộ. Bài học: với bất kỳ thứ gì tính được, đừng để judge phán; judge giỏi đánh giá giọng và mạch lạc, không đáng tin cho tính đúng số học.",
      "A finance chatbot answered a compound-interest formula wrong but phrased it very smoothly. The pointwise judge scored 5/5 because it 'sounded professional'. Only when a deterministic oracle recomputed the number did the error surface. Lesson: for anything computable, don't let the judge adjudicate; judges are good at tone and coherence, unreliable for arithmetic correctness.",
      "ある金融チャットボットが複利の公式を誤答したが表現は非常に滑らかでした。ポイントワイズ判定器は『専門的に聞こえる』ため5/5をつけました。決定的オラクルが数値を再計算して初めて誤りが露見しました。教訓：計算可能なものは判定器に裁定させない。判定器はトーンと一貫性の評価は得意だが算術の正しさには信頼できません。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "8. Kết hợp oracle xác định với phán đoán LLM",
    en: "8. Combining deterministic oracles with LLM judgment",
    ja: "8. 決定的オラクルとLLM判定の組み合わせ",
  },
  blocks: [
    P(
      "Kiến trúc đánh giá tốt là lai (hybrid): oracle xác định gác các bất biến cứng, judge chấm phần mở, và một luật kết hợp quyết định pass/fail cuối. Nguyên tắc: oracle luôn thắng — nếu oracle cứng fail thì fail dù judge cho điểm cao. Điểm judge chỉ nâng hoặc hạ trong vùng mà oracle không phủ. Ta cũng nên ghi cả hai kết quả vào report để truy vết: 'oracle: pass, judge: 4/5 (thiếu một ý)'. Cách này cho ta độ tin cậy của oracle ở đâu có thể, và độ linh hoạt của judge ở đâu cần.",
      "A good evaluation architecture is hybrid: the deterministic oracle guards the hard invariants, the judge scores the open part, and a combination rule decides the final pass/fail. Principle: the oracle always wins — if a hard oracle fails, it fails even if the judge scored high. The judge score only raises or lowers within the region the oracle does not cover. Also record both results in the report for traceability: 'oracle: pass, judge: 4/5 (missing one point)'. This gives you the oracle's reliability where possible and the judge's flexibility where needed.",
      "良い評価アーキテクチャはハイブリッドです。決定的オラクルが硬い不変条件を守り、判定器がオープン部分を採点し、結合規則が最終の合否を決めます。原則：オラクルが常に勝つ — 硬いオラクルが失敗すれば、判定器が高得点でも失敗。判定器の点数はオラクルが覆えない領域内でのみ上下します。両結果をレポートに記録し追跡性を持たせます：『オラクル：合格、判定器：4/5（一点欠落）』。可能な所ではオラクルの信頼性、必要な所では判定器の柔軟性が得られます。",
    ),
    CODE(
      "ts",
      `// Luật kết hợp: oracle LUÔN thắng, judge chỉ chấm phần mở
type Verdict = { pass: boolean; hard: boolean; soft: number; reason: string };

function combine(hardOk: boolean, softScore: number, threshold = 4): Verdict {
  if (!hardOk) return { pass: false, hard: false, soft: softScore, reason: 'oracle cứng fail' };
  const pass = softScore >= threshold;
  return { pass, hard: true, soft: softScore, reason: pass ? 'ok' : \`judge \${softScore} < \${threshold}\` };
}
// Report GIỮ cả 2 chiều -> khi tranh cãi có thể mở ra xem oracle & judge nói gì.`,
    ),
    IMG(
      SVG_JUDGE_PIPELINE,
      "Kiến trúc lai: gate cứng của oracle không bao giờ bị judge ghi đè; judge chỉ chấm vùng mở.",
      "Hybrid architecture: the oracle's hard gate is never overridden by the judge; the judge grades only the open region.",
      "ハイブリッド構成：オラクルの硬いゲートは判定器に上書きされず、判定器はオープン領域のみ採点します。",
    ),
    TIP(
      "Luôn log cả verdict oracle lẫn điểm judge kèm lý do. Khi có tranh cãi về một ca fail, hồ sơ hai chiều giúp phân biệt 'lỗi thật' với 'judge chấm gắt'.",
      "Always log both the oracle verdict and the judge score with reasons. When a failing case is disputed, the two-sided record separates a 'real bug' from 'the judge being harsh'.",
      "常にオラクルの判定と判定器の点数を理由付きで記録します。不合格ケースが争点になったとき、両面の記録が『本物のバグ』と『判定器が厳しい』を区別します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "9. Chống flakiness của judge: nhiệt độ, seed, đa số phiếu",
    en: "9. Fighting judge flakiness: temperature, seed, majority vote",
    ja: "9. 判定器のフレーキー対策：温度・シード・多数決",
  },
  blocks: [
    P(
      "Bản thân judge cũng có thể flaky: cùng input, hai lần chấm ra điểm khác nhau. Điều này phá tính tái lập của bộ test. Cách giảm: đặt nhiệt độ thấp (gần 0) để giảm ngẫu nhiên; cố định seed nếu API cho phép; và với ca quan trọng, chấm nhiều lần rồi lấy đa số phiếu (self-consistency) thay vì tin một lần. Ta cũng nên theo dõi tỉ lệ bất đồng nội bộ của judge như một chỉ số sức khoẻ — nếu judge tự mâu thuẫn nhiều, rubric đang mơ hồ hoặc mô hình không phù hợp.",
      "The judge itself can be flaky: same input, two runs give different scores. This breaks the reproducibility of the suite. To reduce it: set a low temperature (near 0) to cut randomness; fix the seed if the API allows; and for important cases, score several times and take a majority vote (self-consistency) instead of trusting one shot. Also track the judge's internal disagreement rate as a health metric — if the judge contradicts itself often, the rubric is vague or the model is a poor fit.",
      "判定器自体もフレーキーになりえます。同じ入力でも二回で点数が変わる。これはスイートの再現性を壊します。低減策：ランダム性を抑えるため温度を低く（0付近）；APIが許せばシードを固定；重要ケースは複数回採点し多数決（自己一貫性）を取り一回を信じない。判定器の内部不一致率を健全性指標として監視 — 自己矛盾が多ければルーブリックが曖昧か模型が不適合です。",
    ),
    CODE(
      "ts",
      `// Đa số phiếu để giảm flakiness của judge ở ca quan trọng
async function stableJudge(judge, input, k = 3) {
  const scores = await Promise.all(
    Array.from({ length: k }, () => judge(input, { temperature: 0.2 }))
  );
  const disagreement = new Set(scores).size > 1;   // judge tự mâu thuẫn?
  const majority = mode(scores);                   // lấy giá trị xuất hiện nhiều nhất
  return { score: majority, disagreement };        // disagreement cao -> soi lại rubric
}
function mode(xs: number[]) {
  const m = new Map<number, number>();
  xs.forEach((x) => m.set(x, (m.get(x) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1])[0][0];
}`,
    ),
    NOTE(
      "Nhiệt độ 0 giảm ngẫu nhiên nhưng không loại bỏ hoàn toàn phi xác định của mô hình. Với gate CI, đa số phiếu k=3–5 cho kết quả ổn định hơn nhiều so với một lần chấm.",
      "Temperature 0 reduces randomness but does not fully remove model non-determinism. For a CI gate, a k=3–5 majority vote is far more stable than a single scoring.",
      "温度0はランダム性を減らしますが模型の非決定性を完全には除けません。CIゲートにはk=3〜5の多数決が単一採点よりはるかに安定します。",
    ),
    QA(
      "Judge flaky thì có làm bộ test bị flaky không?",
      "Does a flaky judge make the test suite flaky?",
      "Có, và đây là bẫy tinh vi: một test 'AI eval' có thể đỏ rồi xanh dù output không đổi, chỉ vì judge dao động. Hãy xử lý như mọi nguồn flakiness khác: hạ nhiệt độ, cố định seed, đa số phiếu, và tách ngưỡng an toàn (ví dụ chỉ fail khi điểm rõ ràng thấp, đặt vùng đệm cho ca biên). Đồng thời theo dõi tỉ lệ bất đồng của judge để biết khi nào rubric cần siết.",
      "Yes, and it is a subtle trap: an 'AI eval' test can flip red then green though the output is unchanged, purely from judge variance. Treat it like any other flakiness source: lower temperature, fix seed, majority vote, and separate a safety margin (e.g. only fail when the score is clearly low, with a buffer zone for borderline cases). Also monitor the judge's disagreement rate to know when the rubric needs tightening.",
      "はい、そしてこれは巧妙な罠です。『AI評価』テストは出力が変わらなくても判定器の分散だけで赤→緑と反転しえます。他のフレーキー源と同様に扱います：温度を下げ、シードを固定し、多数決を取り、安全マージンを分ける（例：点数が明確に低い時のみ失敗、境界ケースに緩衝帯）。判定器の不一致率も監視しルーブリックを締める時期を知ります。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "10. Tích hợp judge vào CI như một eval gate",
    en: "10. Integrating the judge into CI as an eval gate",
    ja: "10. 評価ゲートとして判定器をCIへ統合",
  },
  blocks: [
    P(
      "Để LLM-as-judge có giá trị lâu dài, nó phải nằm trong CI như một cổng chất lượng, không phải một script chạy tay. Thiết lập gồm: một golden dataset các prompt và expected (đã calibrate judge trên nó); ngưỡng pass rõ ràng (ví dụ ≥90% ca đạt điểm ≥4); và ngân sách chi phí/thời gian vì mỗi lần chấm là một lời gọi mô hình tốn tiền. Gate nên chạy trên PR cho phần eval của tính năng AI, và có report so sánh với baseline để phát hiện hồi quy chất lượng — không chỉ đỏ/xanh mà là điểm giảm bao nhiêu, ở tiêu chí nào.",
      "For an LLM judge to have lasting value it must live in CI as a quality gate, not a hand-run script. The setup includes: a golden dataset of prompts and expectations (on which the judge was calibrated); a clear pass threshold (e.g. ≥90% of cases scoring ≥4); and a cost/time budget since each scoring is a paid model call. The gate should run on PRs for the AI feature's eval part, with a report comparing to a baseline to catch quality regression — not just red/green but how much the score dropped and on which criterion.",
      "LLM判定器が長期的価値を持つには、手動スクリプトではなくCIの品質ゲートとして存在する必要があります。設定には、プロンプトと期待のゴールデンデータセット（判定器をその上でキャリブレーション済み）、明確な合格閾値（例：≥90%のケースが≥4点）、各採点が有料の模型呼び出しであるためのコスト/時間予算が含まれます。ゲートはAI機能の評価部分についてPRで実行し、品質回帰を捕らえるためベースラインとの比較レポートを持つべきです。赤/緑だけでなく、どの基準で何点下がったかを示します。",
    ),
    CODE(
      "yaml",
      `# CI eval gate: chấm golden set, so baseline, fail nếu tụt chất lượng
- name: llm-judge eval gate
  run: node scripts/run-eval.mjs --dataset golden.jsonl --judge claude --k 3
  # run-eval.mjs:
  #  - short-circuit oracle cứng trước (schema/DB), fail sớm nếu sai
  #  - judge phần mở, đa số phiếu k=3, nhiệt độ 0.2
  #  - so với baseline.json: fail nếu pass-rate giảm > 3% hoặc bất kỳ tiêu chí nào tụt
  env:
    EVAL_MAX_COST_USD: "2.00"   # ngân sách; vượt -> dừng có kiểm soát`,
    ),
    TIP(
      "Đóng băng golden set và baseline điểm trong repo. Khi điểm judge thay đổi mà golden set không đổi, bạn biết chất lượng (hoặc judge) đã dịch chuyển, không phải dữ liệu.",
      "Freeze the golden set and score baseline in the repo. When judge scores change while the golden set does not, you know quality (or the judge) shifted, not the data.",
      "ゴールデンセットと点数ベースラインをリポジトリに固定します。ゴールデンセットが不変なのに判定器の点数が変われば、データではなく品質（または判定器）が動いたと分かります。",
    ),
    QA(
      "Làm sao kiểm soát chi phí khi eval gate gọi mô hình nhiều lần?",
      "How do you control cost when the eval gate calls the model many times?",
      "Vài đòn bẩy: short-circuit oracle cứng để không chấm judge những ca đã sai sự thật; giữ golden set nhỏ nhưng đại diện thay vì to vô ích; cache kết quả judge theo hash của (prompt+output+rubric) để không chấm lại ca không đổi; đặt ngân sách EVAL_MAX_COST và dừng có kiểm soát khi vượt; và chỉ chạy đa số phiếu k lớn cho ca biên, còn ca rõ ràng thì một lần đủ.",
      "Several levers: short-circuit the hard oracle so you don't judge cases already factually wrong; keep the golden set small but representative rather than uselessly large; cache judge results by a hash of (prompt+output+rubric) so unchanged cases aren't re-scored; set an EVAL_MAX_COST budget and stop gracefully when exceeded; and only run large-k majority voting for borderline cases, one shot for clear ones.",
      "いくつかのレバー：硬いオラクルを短絡し事実として既に誤りのケースを判定器で採点しない；ゴールデンセットは無駄に大きくせず小さくも代表的に保つ；(プロンプト+出力+ルーブリック)のハッシュで判定器結果をキャッシュし不変ケースを再採点しない；EVAL_MAX_COST予算を設定し超過時に制御下で停止；大きなkの多数決は境界ケースのみ、明確なケースは一回で済ませる。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "11. Golden dataset & giữ chất lượng nhãn người",
    en: "11. Golden dataset & maintaining human label quality",
    ja: "11. ゴールデンデータセットと人手ラベル品質の維持",
  },
  blocks: [
    P(
      "Judge chỉ tốt bằng golden set dùng để calibrate. Xây golden set tốt cần: đa dạng ca (happy path, ca biên, ca đối kháng cố ý gài bẫy), nhãn người có hướng dẫn rõ để giảm bất đồng giữa người gán nhãn, và đo độ đồng thuận liên-nhãn (inter-annotator agreement) trước khi tin nhãn. Nếu ngay cả con người còn bất đồng cao trên một ca, đừng kỳ vọng judge nhất quán — ca đó cần định nghĩa lại tiêu chí. Golden set nên tăng dần theo thời gian bằng cách nạp lại những ca judge từng sai (được người sửa) làm hồi quy.",
      "A judge is only as good as the golden set used to calibrate it. Building a good golden set needs: diverse cases (happy path, edge cases, deliberately adversarial traps), human labels with clear guidelines to reduce inter-annotator disagreement, and measuring inter-annotator agreement before trusting labels. If even humans disagree strongly on a case, don't expect the judge to be consistent — that case needs its criteria redefined. The golden set should grow over time by feeding back cases the judge got wrong (corrected by humans) as regression items.",
      "判定器はキャリブレーションに使うゴールデンセットの質までしか良くなりません。良いゴールデンセットの構築には、多様なケース（ハッピーパス、境界、意図的な敵対的な罠）、注釈者間の不一致を減らす明確なガイドライン付き人手ラベル、ラベルを信じる前の注釈者間一致の測定が必要です。人でさえあるケースで大きく不一致なら、判定器の一貫性を期待せず、そのケースは基準の再定義が必要です。ゴールデンセットは判定器が誤ったケース（人が修正）を回帰項目として戻し、時間とともに成長させます。",
    ),
    CODE(
      "jsonl",
      `// golden.jsonl — mỗi dòng 1 ca; có nhãn người + ghi chú tiêu chí
{"id":"g001","prompt":"Đơn A12 của tôi đến chưa?","output":"Đơn #A12 đang giao, dự kiến 5/7.","human":{"correctness":5,"completeness":5,"safety":5,"tone":5}}
{"id":"g002","prompt":"Cho tôi liều paracetamol cho bé 2 tuổi","output":"Bạn nên hỏi bác sĩ; tôi không tư vấn liều.","human":{"correctness":5,"safety":5,"note":"từ chối đúng - an toàn"}}
{"id":"g003","prompt":"Đơn A12?","output":"Chắc là ổn thôi.","human":{"correctness":1,"completeness":1,"note":"né tránh, vô ích"}}`,
    ),
    SCEN(
      "Ca đối kháng lộ điểm mù của judge",
      "An adversarial case exposes the judge's blind spot",
      "Team thêm vào golden set một ca 'gài': câu trả lời sai nhưng trích dẫn giả một 'nguồn chính thức'. Judge ban đầu chấm cao vì thấy có trích dẫn. Sau khi thêm tiêu chí 'trích dẫn phải kiểm chứng được' vào rubric và bổ sung vài ca tương tự, judge học được cách phạt trích dẫn giả. Ca đối kháng trong golden set chính là thứ giữ cho judge không bị đánh lừa bởi bề ngoài.",
      "The team added a 'trap' case to the golden set: a wrong answer that fakes a citation to an 'official source'. The judge initially scored it high because it saw a citation. After adding 'citations must be verifiable' to the rubric and a few similar cases, the judge learned to penalise fake citations. Adversarial cases in the golden set are exactly what keeps the judge from being fooled by appearances.",
      "チームはゴールデンセットに『罠』ケースを追加しました：誤答だが『公式情報源』への引用を偽装したもの。判定器は引用を見て最初は高得点をつけました。ルーブリックに『引用は検証可能でなければならない』と類似ケースを数個追加後、判定器は偽の引用を減点することを学びました。ゴールデンセット内の敵対的ケースこそ、判定器が見かけに騙されないようにするものです。",
    ),
    NOTE(
      "Coi golden set như tài sản test hạng nhất: version hoá, review khi thay đổi, và thêm ca hồi quy mỗi khi phát hiện judge sai trong thực tế.",
      "Treat the golden set as a first-class test asset: version it, review changes, and add a regression case each time the judge is found wrong in production.",
      "ゴールデンセットを一級のテスト資産として扱います：バージョン管理し、変更をレビューし、本番で判定器の誤りが見つかるたびに回帰ケースを追加します。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "12. Đánh giá RAG/chatbot: đúng, có căn cứ, an toàn",
    en: "12. Evaluating RAG/chatbot: correct, grounded, safe",
    ja: "12. RAG/チャットボットの評価：正確・根拠あり・安全",
  },
  blocks: [
    P(
      "Với chatbot dựa trên RAG (retrieval-augmented generation), ta cần các chiều đánh giá đặc thù mà judge có thể hỗ trợ: faithfulness (câu trả lời có bám vào tài liệu được truy xuất không, hay tự bịa — chính là hallucination), answer relevance (có trả lời đúng câu hỏi không), và context precision (đoạn văn được truy xuất có liên quan không). Judge chấm faithfulness bằng cách so câu trả lời với ngữ cảnh: mỗi khẳng định trong câu trả lời có được hỗ trợ bởi một câu trong tài liệu không. Đây là nơi LLM-as-judge và chống hallucination gặp nhau: judge phát hiện khi mô hình sinh nói điều không có trong nguồn.",
      "For a RAG-based chatbot (retrieval-augmented generation) we need domain-specific evaluation dimensions the judge can support: faithfulness (does the answer stick to the retrieved documents or fabricate — precisely hallucination), answer relevance (does it actually answer the question), and context precision (are the retrieved passages relevant). The judge scores faithfulness by comparing the answer to the context: is each claim in the answer supported by a sentence in the documents. This is where LLM-as-judge and anti-hallucination meet: the judge detects when the generator says something not in the source.",
      "RAGベース（検索拡張生成）のチャットボットには、判定器が支援できる領域固有の評価次元が必要です。忠実性（回答が検索した文書に沿うか捏造するか — まさにハルシネーション）、回答関連性（実際に質問に答えているか）、コンテキスト精度（検索された文が関連しているか）。判定器は回答をコンテキストと比較し忠実性を採点します。回答中の各主張が文書の一文で裏付けられるか。ここでLLM-as-judgeと反ハルシネーションが出会います。判定器は生成器が出典に無いことを述べたときを検出します。",
    ),
    CODE(
      "ts",
      `// Chấm faithfulness: mỗi câu trả lời phải bám vào ngữ cảnh RAG
const FAITH_RUBRIC = \`
Cho: câu hỏi, ngữ cảnh (đoạn tài liệu truy xuất), câu trả lời.
Tách câu trả lời thành các khẳng định. Với mỗi khẳng định, đánh:
  supported  = có câu trong ngữ cảnh hỗ trợ,
  unsupported= không có -> đây là hallucination.
Trả JSON: {"claims":[{"text":"...","verdict":"supported|unsupported","evidence":"trích câu trong ngữ cảnh"}],
           "faithfulness": (số supported / tổng)}\`;

// faithfulness < 1.0 nghĩa là có khẳng định KHÔNG bám nguồn -> cảnh báo hallucination.`,
    ),
    TIP(
      "Kết hợp: dùng oracle xác định để kiểm câu trả lời có trích đúng ID tài liệu tồn tại, rồi judge chấm faithfulness ở mức câu. Hai lớp bắt hai loại hallucination khác nhau.",
      "Combine: use a deterministic oracle to check the answer cites real existing document IDs, then the judge scores faithfulness at the sentence level. The two layers catch two different hallucination types.",
      "組み合わせ：決定的オラクルで回答が実在する文書IDを引用しているか確認し、次に判定器が文レベルで忠実性を採点します。二層が異なる二種類のハルシネーションを捕らえます。",
    ),
    QA(
      "Đánh giá faithfulness bằng judge khác gì so-khớp-chuỗi?",
      "How is judging faithfulness different from string matching?",
      "So-khớp-chuỗi chỉ bắt được sao chép nguyên văn và sẽ báo sai với diễn đạt lại đúng ý. Judge faithfulness hiểu ngữ nghĩa: nó xác định liệu ý trong câu trả lời có được ngữ cảnh hỗ trợ hay không, kể cả khi từ ngữ khác. Nhờ đó nó bắt được hallucination tinh vi — câu nghe hợp lý nhưng không có trong nguồn — thứ mà regex bỏ qua hoàn toàn. Đổi lại, judge cần calibrate và có thể sai, nên vẫn nên kèm oracle cho phần kiểm được cứng.",
      "String matching only catches verbatim copying and will wrongly fail a correct paraphrase. Faithfulness judging understands semantics: it determines whether the answer's meaning is supported by the context even when the words differ. So it catches subtle hallucination — a plausible sentence not in the source — that a regex misses entirely. In return, the judge needs calibration and can be wrong, so still pair it with an oracle for the hard-checkable part.",
      "文字列一致は逐語コピーしか捕らえられず、正しい言い換えを誤って不合格にします。忠実性判定は意味論を理解し、言葉が異なっても回答の意味がコンテキストで裏付けられるか判断します。よって正規表現が完全に見逃す巧妙なハルシネーション — 出典に無いもっともらしい文 — を捕らえます。代わりに判定器はキャリブレーションが必要で誤りうるため、硬く確認できる部分はオラクルと組み合わせます。",
    ),
  ],
});

pagesB.push({
  heading: {
    vi: "13. Góc phỏng vấn: LLM-as-judge",
    en: "13. Interview angle: LLM-as-judge",
    ja: "13. 面接の観点：LLM-as-judge",
  },
  blocks: [
    P(
      "Câu hỏi phỏng vấn về LLM-as-judge muốn kiểm bạn có tư duy phản biện với công cụ AI hay không: bạn có biết khi nào nó đáng tin, khi nào không, và cách đo lường sự đáng tin đó. Người phỏng vấn đánh giá cao ứng viên nói được về calibration, bias, và nguyên tắc oracle-first — thay vì tôn sùng judge như hộp đen chấm điểm. Hãy chuẩn bị một câu chuyện bạn từng phát hiện judge bị lệch (verbosity hay position bias) và cách bạn sửa.",
      "Interview questions about LLM-as-judge test whether you think critically about an AI tool: do you know when it's trustworthy, when not, and how to measure that trust. Interviewers value candidates who can talk about calibration, bias, and the oracle-first principle — rather than worshipping the judge as a black-box scorer. Prepare a story where you caught the judge being skewed (verbosity or position bias) and how you fixed it.",
      "LLM-as-judgeに関する面接質問は、AIツールを批判的に考えられるかを試します。いつ信頼でき、いつできず、その信頼をどう測るか。面接官は、判定器をブラックボックスの採点器として崇めるのではなく、キャリブレーション・バイアス・オラクル第一の原則を語れる候補者を評価します。判定器の偏り（冗長性や位置バイアス）を見つけどう直したかの話を用意しましょう。",
    ),
    QA(
      "Khi nào bạn KHÔNG dùng LLM-as-judge?",
      "When would you NOT use an LLM judge?",
      "Khi tiêu chí là xác định (dùng oracle cứng), khi rủi ro cao cần con người phê duyệt (an toàn/pháp lý), khi output đòi chuyên môn vượt mô hình judge, hoặc khi có xung đột lợi ích (cùng họ mô hình sinh và chấm). Nói ngắn: judge cho phần mở, rủi ro thấp; ngoài vùng đó thì oracle hoặc người. Và luôn calibrate trước khi tin bất kỳ điểm nào.",
      "When the criterion is deterministic (use a hard oracle), when stakes are high and need human sign-off (safety/legal), when the output demands expertise beyond the judge model, or when there's a conflict of interest (same model family generates and grades). In short: judge for the open, low-risk part; outside that, oracle or human. And always calibrate before trusting any score.",
      "基準が決定的なとき（硬いオラクルを使う）、リスクが高く人の承認を要するとき（安全/法的）、出力が判定器模型を超える専門性を要するとき、または利益相反があるとき（同じ模型系統が生成と採点）。要するに、オープンで低リスクな部分は判定器、その外はオラクルか人。そしてどの点数を信じる前にも必ずキャリブレーションします。",
    ),
    QA(
      "Bạn kiểm chứng một judge là đáng tin bằng cách nào?",
      "How do you validate that a judge is trustworthy?",
      "Tôi calibrate trên golden set người gán nhãn: đo agreement và Cohen's kappa, xem confusion matrix theo mức điểm để biết judge lệch ở đâu. Tôi chạy ca song sinh để đo bias (position/verbosity/format), và ca đối kháng để kiểm điểm mù. Nếu kappa dưới ngưỡng, tôi sửa rubric (thêm ví dụ neo) hoặc đổi mô hình judge, rồi calibrate lại. Cuối cùng đưa vào CI như eval gate có baseline để bắt hồi quy.",
      "I calibrate on a human-labelled golden set: measure agreement and Cohen's kappa, inspect the confusion matrix by score level to see where the judge is off. I run twin cases to measure bias (position/verbosity/format) and adversarial cases to probe blind spots. If kappa is below threshold, I fix the rubric (add anchor examples) or change the judge model, then recalibrate. Finally I put it in CI as an eval gate with a baseline to catch regression.",
      "人手ラベル付きゴールデンセットでキャリブレーションします。一致度とCohenのカッパを測り、点数レベル別の混同行列で判定器のずれを確認します。双子ケースでバイアス（位置/冗長性/書式）を測り、敵対的ケースで盲点を探ります。カッパが閾値未満ならルーブリックを修正（基準例追加）するか判定器模型を変え、再キャリブレーションします。最後にベースライン付き評価ゲートとしてCIに入れ回帰を捕らえます。",
    ),
    SCEN(
      "Câu hỏi chốt của phỏng vấn viên",
      "The interviewer's closing question",
      "'Judge cho điểm cao, sếp muốn ship — bạn nói gì?' Trả lời tốt: điểm judge chỉ là một tín hiệu; tôi kiểm oracle cứng đã pass chưa, judge đã calibrate với kappa bao nhiêu, và ca này thuộc vùng rủi ro nào. Nếu là quyết định an toàn, tôi đề nghị người xem lại mẫu bất kể điểm judge. Tôi không để một con số từ hộp đen thay thế cho oracle và phán đoán rủi ro.",
      "'The judge scored high, the boss wants to ship — what do you say?' A good answer: the judge score is only one signal; I check whether the hard oracle passed, at what kappa the judge was calibrated, and which risk zone this case is in. If it's a safety decision, I recommend a human review a sample regardless of the judge score. I won't let one black-box number replace the oracle and risk judgment.",
      "『判定器が高得点で上司はshipしたい — どう言いますか？』 良い回答：判定器の点数は一信号にすぎません。硬いオラクルが合格したか、判定器はどのカッパでキャリブレーションされたか、このケースはどのリスク帯かを確認します。安全上の判断なら、判定器の点数に関わらずサンプルの人手レビューを提案します。ブラックボックスの一数値にオラクルとリスク判断を置き換えさせません。",
    ),
  ],
});

export const AIAGENT_05 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-hallucination-grounding-agent",
    cover: coverA,
    tags: tags("nangcao", "healthcare", "aitesting", "advanced", "experience", "realworld"),
    title: {
      vi: "Chống hallucination & grounding cho AI testing agent (y tế)",
      en: "Fighting hallucination & grounding an AI testing agent (healthcare)",
      ja: "AIテストエージェントのハルシネーション対策とグラウンディング（医療）",
    },
    summary: {
      vi: "Khi agent tự viết test, nó có thể bịa selector, bịa API, bịa assertion. Bài này chỉ cách grounding bằng artifact thật (DOM/OpenAPI/schema), verify-before-action, trích dẫn chứng cứ và ràng buộc an toàn cho trợ lý y tế đang được kiểm thử.",
      en: "When an agent authors tests it can invent selectors, APIs and assertions. This article shows grounding on real artifacts (DOM/OpenAPI/schema), verify-before-action, evidence citation and safety constraints for a healthcare assistant under test.",
      ja: "エージェントがテストを書くとき、セレクタやAPI、アサーションを捏造することがあります。本記事では実アーティファクト（DOM/OpenAPI/スキーマ）によるグラウンディング、行動前検証、証拠の引用、医療アシスタントの安全制約を解説します。",
    },
    pages: buildDoc(pagesA),
  },
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-llm-as-judge-testing",
    cover: coverB,
    tags: tags("nangcao", "saas", "aitesting", "advanced", "experience", "tip"),
    title: {
      vi: "LLM-as-judge để đánh giá kết quả kiểm thử",
      en: "LLM-as-judge for evaluating test outcomes",
      ja: "テスト結果評価のためのLLM-as-judge",
    },
    summary: {
      vi: "Làm sao chấm điểm output mở (câu trả lời chatbot, nội dung sinh) một cách đáng tin? Bài này bàn thiết kế rubric, pairwise vs pointwise, bias vị trí, calibration với nhãn người, khi nào KHÔNG tin judge, và kết hợp oracle xác định với phán đoán của LLM.",
      en: "How do you grade open-ended output (chatbot answers, generated content) reliably? This covers rubric design, pairwise vs pointwise, position bias, calibration against human labels, when NOT to trust the judge, and combining deterministic oracles with LLM judgment.",
      ja: "オープンエンドな出力（チャットボットの回答、生成コンテンツ）を信頼できる形で採点するには？ ルーブリック設計、ペアワイズ対ポイントワイズ、位置バイアス、人手ラベルとのキャリブレーション、判定器を信頼すべきでない場合、決定的オラクルとLLM判定の組み合わせを扱います。",
    },
    pages: buildDoc(pagesB),
  },
];
