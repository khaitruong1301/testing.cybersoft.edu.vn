// doc_cnm_shift_left.mjs — BÀI "CHUYÊN NÂNG CAO" (advanced): Shift-left testing — kiểm thử sớm
// trong CI/CD. Bám hệ thống ngân hàng số (fintech) NovaBank Pay: pipeline thực chiến, YAML,
// cổng kiểm thử (quality gate), nhiều mockup giao diện (ui_mock). Song ngữ vi/en/ja (ja≠en),
// 12 chương, trắc nghiệm, chuẩn SEO.
import { P, IMG, TIP, CODE, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
import { TLDR, DEF, FAQ, CTA, INTERNAL, buildSeo } from "./seo-engine.mjs";
import { STEP, TRY, PITFALL, SITUATION, SOLVE, mcq, QUIZ, RECAP } from "./newbie-engine.mjs";
import { moduleFlow, dashboard, grid, panel, stateDiagram } from "./ui_mock.mjs";

const course = {
  key: "tester",
  vi: "Khóa Software Testing chuyên nghiệp (Manual + Automation) — từ Zero tới nhận việc",
  en: "Professional Software Testing (Manual + Automation) — Zero to hired",
  ja: "ソフトウェアテスト専門コース（手動＋自動）— ゼロから就職まで",
  url: "https://cybersoft.edu.vn/software-testing-chuyen-nghiep-tu-zero-toi-duoc-nhan-viec-manual-automation-testing/",
  mode: "blended", workload: "PT200H",
  desc: "Lộ trình Tester từ con số 0 tại CyberSoft Academy: manual, quy trình lỗi, công cụ & dự án thực chiến.",
};

function makeDoc(cfg) {
  const cover = makeThumb({ id: cfg.slug.slice(0, 8), domain: cfg.domain, kind: "congnghe", label: cfg.coverLabel });
  const seo = buildSeo({
    title: cfg.metaTitle, description: cfg.metaDescription, slug: cfg.slug,
    primaryKeyword: cfg.primaryKeyword, keywords: cfg.keywords,
    image: `https://cybersoft.edu.vn/og/${cfg.slug}.png`,
    faqs: cfg.faqs.map((f) => f.faq), courses: [course],
    breadcrumbs: [
      { name: "Trang chủ", url: "https://cybersoft.edu.vn" },
      { name: "Tài liệu Tester", url: "https://cybersoft.edu.vn/tai-lieu" },
      { name: cfg.crumb, url: `https://cybersoft.edu.vn/tai-lieu/${cfg.slug}` },
    ],
    howTo: cfg.howTo,
  });
  return {
    categorySlug: "automation-thinking", slug: cfg.slug, cover, level: "advanced",
    tags: tags("congnghe", "fintech", "cicd", "advanced", "seo"),
    title: cfg.title, summary: cfg.summary, seo, pages: buildDoc(cfg.pages),
  };
}

// ── Mockup 1: sơ đồ pipeline CI/CD với các cổng shift-left ──
const m_pipeline = moduleFlow(
  "Pipeline CI/CD NovaBank Pay — dịch chuyển kiểm thử về sớm (shift-left)",
  [
    { id: "commit", label: "Commit / PR", sub: "Dev đẩy code", x: 90, y: 70 },
    { id: "lint", label: "Lint + SAST", sub: "Tĩnh, < 1 phút", x: 300, y: 70 },
    { id: "unit", label: "Unit Test", sub: "Viết cùng lúc với code", x: 510, y: 70 },
    { id: "contract", label: "Contract Test", sub: "API Core Banking", x: 690, y: 190 },
    { id: "build", label: "Build Image", sub: "Docker", x: 480, y: 190 },
    { id: "staging", label: "Staging + E2E", sub: "Smoke tự động", x: 280, y: 190 },
    { id: "prod", label: "Canary Prod", sub: "5% lưu lượng", x: 90, y: 190 },
  ],
  [
    { from: "commit", to: "lint", label: "mỗi PR" },
    { from: "lint", to: "unit", label: "qua cổng tĩnh" },
    { from: "unit", to: "contract", label: "qua cổng unit ≥90%" },
    { from: "contract", to: "build", label: "qua cổng hợp đồng" },
    { from: "build", to: "staging", label: "image mới" },
    { from: "staging", to: "prod", label: "qua cổng E2E" },
    { from: "staging", to: "unit", label: "rớt E2E, trả về dev", bad: true },
  ],
  { accent: "#0f766e", h: 300 }
);

// ── Mockup 2: checklist review PR kiểu shift-left (panel) ──
function checklistLine(y, label, done) {
  const color = done ? "#16a34a" : "#ef4444";
  const mark = done ? "✔" : "✗";
  return `<circle cx="34" cy="${y}" r="10" fill="${color}"/><text x="34" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${mark}</text><text x="54" y="${y + 4}" font-size="12.5" fill="#0f172a">${label}</text>`;
}
const m_pr = panel(
  "NovaBank Pay · PR #482 — Chuyển tiền liên ngân hàng · checklist shift-left",
  [
    checklistLine(46, "Unit test cho hàm tính phí chuyển khoản", true),
    checklistLine(76, "Contract test với API Core Banking", true),
    checklistLine(106, "Kiểm thử tĩnh SAST (OWASP) đã chạy", true),
    checklistLine(136, "Test hiệu năng chịu tải trước khi merge", false),
    `<rect x="20" y="122" width="360" height="30" rx="8" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3"/>`,
    `<rect x="20" y="102" width="200" height="18" rx="9" fill="#ef4444"/><text x="28" y="115" font-size="11" font-weight="700" fill="#fff">THIẾU: chưa có test hiệu năng</text>`,
  ].join(""),
  { h: 200, accent: "#0f766e" }
);

// ── Mockup 3: bảng so sánh truyền thống vs shift-left ──
const m_compare = grid(
  "Shift-left: dịch chuyển các loại kiểm thử về sớm trong vòng đời",
  ["Loại kiểm thử", "Truyền thống (cuối)", "Shift-left (sớm)"],
  [
    ["Review yêu cầu/thiết kế", "Sau khi code xong", "Trước khi viết code (three amigos)"],
    ["Unit test", "QA nhận build ở tuần N+1", "Dev viết cùng code, chạy < 5 phút"],
    ["Kiểm thử tĩnh (SAST/Lint)", "Thủ công trước release", "Tự động mỗi PR, chặn merge"],
    ["Contract test API", "Giai đoạn tích hợp hệ thống", "Ngay sau unit test, mỗi PR"],
    ["E2E/UAT", "Cuối sprint, môi trường riêng", "Tự động trên staging sau mỗi merge"],
  ],
  { accent: "#0f766e", highlight: 2 }
);

// ── Mockup 4: dashboard hiệu quả shift-left ──
const m_dash = dashboard("Hiệu quả Shift-left — NovaBank Pay · Sprint 18", [
  { label: "Lỗi chặn ở PR", value: "41", sub: "trước khi merge", color: "#16a34a" },
  { label: "Lỗi lọt tới staging", value: "6", sub: "giảm 70% so Sprint 12", color: "#f59e0b" },
  { label: "Lỗi lọt production", value: "0", sub: "trong quý này", color: "#2563eb" },
  { label: "Phản hồi PR trung bình", value: "7 phút", sub: "toàn bộ pipeline", color: "#7c3aed" },
]);

// ── Mockup 5: sơ đồ cổng kiểm thử (quality gate) của một Pull Request ──
const m_gate = stateDiagram(
  "Cổng kiểm thử của một Pull Request (quality gate)",
  [
    { id: "open", label: "OPENED", x: 90, y: 70, kind: "start" },
    { id: "static", label: "STATIC/SAST", x: 290, y: 70, kind: "mid" },
    { id: "unit", label: "UNIT", x: 480, y: 70, kind: "mid" },
    { id: "contract", label: "CONTRACT", x: 660, y: 70, kind: "mid" },
    { id: "merged", label: "MERGED", x: 660, y: 220, kind: "ok" },
    { id: "blocked", label: "BLOCKED", x: 290, y: 220, kind: "bad" },
  ],
  [
    { from: "open", to: "static", label: "chạy tự động" },
    { from: "static", to: "unit", label: "qua cổng tĩnh" },
    { from: "unit", to: "contract", label: "qua cổng unit" },
    { from: "contract", to: "merged", label: "qua cổng hợp đồng" },
    { from: "static", to: "blocked", label: "rớt lint/SAST", bad: true },
    { from: "unit", to: "blocked", label: "rớt unit", bad: true },
    { from: "contract", to: "blocked", label: "rớt hợp đồng", bad: true },
  ],
  { accent: "#0f766e", h: 300 }
);

// ───────────────────────── FAQ ─────────────────────────
const faq1 = FAQ(
  "Shift-left testing là gì?",
  "What is shift-left testing?",
  "Shift-left testing là việc dịch chuyển các hoạt động kiểm thử (review yêu cầu, unit test, kiểm thử tĩnh, contract test) về CÀNG SỚM CÀNG TỐT trong vòng đời phát triển — lý tưởng là ngay từ khi viết code, tự động chạy trong pipeline CI/CD ở mỗi pull request, thay vì dồn hết vào giai đoạn kiểm thử cuối trước release. Mục tiêu là phát hiện lỗi khi chi phí sửa còn thấp nhất.",
  "Shift-left testing means moving testing activities (requirement review, unit tests, static analysis, contract tests) AS EARLY AS POSSIBLE in the development lifecycle — ideally right when code is written, automated in the CI/CD pipeline on every pull request, instead of piling everything into a final testing phase before release. The goal is catching bugs while the cost to fix is lowest.",
  "シフトレフトテストとは？",
  "シフトレフトテストとは、要求レビュー・単体テスト・静的解析・契約テストなどのテスト活動を、開発ライフサイクルの中でできるだけ早い段階に移すことです。理想はコードを書く時点から、CI/CDパイプラインでプルリクエストごとに自動実行すること。リリース前の最終テスト段階にすべてを詰め込むのではなく、修正コストが最も低いうちにバグを見つけるのが目的です。"
);
const faq2 = FAQ(
  "Shift-left testing khác gì với automation testing thông thường?",
  "How does shift-left testing differ from ordinary test automation?",
  "Automation testing là VIỆC TỰ ĐỘNG HOÁ cách chạy test (script thay vì tay). Shift-left testing là TRIẾT LÝ VỀ THỜI ĐIỂM — chạy test nào, ở giai đoạn nào của vòng đời. Bạn có thể tự động hoá 100% mà vẫn chạy muộn (cuối sprint), hoặc chạy sớm mà chưa tự động hết. Shift-left hiệu quả nhất khi kết hợp cả hai: tự động hoá + đặt đúng gần điểm code được viết, gắn vào cổng của pull request.",
  "Test automation is about AUTOMATING how tests run (scripts instead of manual clicks). Shift-left testing is a PHILOSOPHY OF TIMING — which tests run at which lifecycle stage. You can automate 100% and still run late (end of sprint), or run early without full automation. Shift-left works best combining both: automation placed right next to where code is written, wired into the pull-request gate.",
  "シフトレフトテストと通常の自動化テストの違いは？",
  "自動化テストはテストの実行方法を自動化すること（手動クリックの代わりにスクリプト）です。シフトレフトテストは「いつ・どの段階で」テストを実行するかという時期の哲学です。100％自動化していても実行が遅い（スプリント末）場合もあれば、完全自動化前でも早く実行する場合もあります。最も効果的なのは両方を組み合わせること：自動化を、コードが書かれる場所のすぐ近く、プルリクエストのゲートに組み込むことです。"
);
const faq3 = FAQ(
  "Áp dụng shift-left có làm chậm tốc độ release không?",
  "Does adopting shift-left slow down release speed?",
  "Ngược lại — ban đầu tốc độ có thể chậm hơn vài ngày vì đội cần viết thêm test và thiết lập pipeline, nhưng về lâu dài shift-left giúp release NHANH HƠN vì lỗi bị chặn sớm (rẻ, dễ sửa) thay vì bị phát hiện muộn ở staging/production (đắt, phải rollback, hotfix khẩn cấp). Chỉ số thực tế thường thấy: thời gian phản hồi một PR giảm từ vài ngày xuống còn vài phút.",
  "The opposite — initial velocity may dip for a few days while the team writes more tests and sets up the pipeline, but long-term, shift-left makes releases FASTER because bugs are blocked early (cheap, easy to fix) instead of surfacing late in staging/production (expensive, requiring rollbacks and emergency hotfixes). A common real-world metric: PR feedback time drops from days to minutes.",
  "シフトレフトを導入するとリリース速度が遅くなる？",
  "むしろ逆です。チームがテストを追加しパイプラインを整備する最初の数日は速度が落ちるかもしれませんが、長期的にはシフトレフトによりリリースは速くなります。バグが安く簡単に直せる早い段階でブロックされ、ステージングや本番で高コストなロールバックや緊急ホットフィックスを要する遅い発見が減るからです。実際によく見られる指標として、PRのフィードバック時間が数日から数分に短縮されます。"
);

// ───────────────────────── Trắc nghiệm ─────────────────────────
const quiz = [
  mcq({
    q: { vi: "Ý tưởng cốt lõi của shift-left testing là gì?", en: "What is the core idea of shift-left testing?", ja: "シフトレフトテストの核となる考え方は？" },
    options: [
      { vi: "Chuyển hết việc kiểm thử cho lập trình viên tự làm", en: "Hand all testing entirely to developers", ja: "テストをすべて開発者に丸投げする" },
      { vi: "Dịch chuyển các hoạt động kiểm thử về càng sớm càng tốt trong vòng đời", en: "Move testing activities as early as possible in the lifecycle", ja: "テスト活動をライフサイクルの中でできるだけ早くに移す" },
      { vi: "Chỉ chạy test ở môi trường production", en: "Only run tests in the production environment", ja: "本番環境でのみテストを実行する" },
      { vi: "Bỏ hẳn kiểm thử thủ công", en: "Eliminate manual testing entirely", ja: "手動テストを完全に廃止する" },
    ], correct: 1,
    explain: { vi: "Shift-left là dịch 'trục thời gian' của kiểm thử về sớm — review, unit, static, contract test chạy ngay khi code được viết/PR mở, không dồn về cuối.", en: "Shift-left moves the testing 'timeline' earlier — review, unit, static and contract tests run as soon as code is written/PR opened, not saved for the end.", ja: "シフトレフトはテストの『時間軸』を早める考え方 — レビュー・単体・静的・契約テストをコード作成時／PRオープン時にすぐ実行し、最後にまとめない。" },
  }),
  mcq({
    q: { vi: "Trong pipeline CI/CD, cổng nào nên chạy SỚM NHẤT (ngay khi có PR)?", en: "In a CI/CD pipeline, which gate should run EARLIEST (right on PR open)?", ja: "CI/CDパイプラインで最も早く（PRオープン時に）実行すべきゲートは？" },
    options: [
      { vi: "Deploy canary lên production", en: "Canary deploy to production", ja: "本番へのカナリアデプロイ" },
      { vi: "E2E test trên môi trường staging", en: "E2E tests on the staging environment", ja: "ステージング環境でのE2Eテスト" },
      { vi: "Lint + kiểm thử tĩnh (SAST)", en: "Lint + static analysis (SAST)", ja: "リント＋静的解析（SAST）" },
      { vi: "Kiểm thử tải (load test) quy mô lớn", en: "Large-scale load testing", ja: "大規模な負荷テスト" },
    ], correct: 2,
    explain: { vi: "Lint/SAST chạy nhanh (<1 phút), không cần môi trường phức tạp, nên đặt làm cổng đầu tiên để chặn lỗi rẻ nhất, sớm nhất.", en: "Lint/SAST runs fast (<1 minute) and needs no complex environment, so it's the first gate — catching the cheapest, earliest bugs.", ja: "Lint/SASTは高速（1分未満）で複雑な環境が不要なため最初のゲートに置き、最も安く早くバグを止める。" },
  }),
  mcq({
    q: { vi: "Vì sao contract test giữa app NovaBank Pay và API Core Banking nên chạy SỚM trong pipeline, không đợi tới UAT?", en: "Why should the contract test between NovaBank Pay and the Core Banking API run EARLY in the pipeline, not wait until UAT?", ja: "NovaBank PayとCore Banking APIの契約テストを、UATまで待たずパイプラインの早い段階で実行すべき理由は？" },
    options: [
      { vi: "Vì contract test không quan trọng bằng E2E", en: "Because contract tests matter less than E2E", ja: "契約テストはE2Eほど重要ではないから" },
      { vi: "Vì phát hiện lệch hợp đồng API ở PR rẻ hơn nhiều so với phát hiện ở UAT/production", en: "Because catching an API contract mismatch at PR is far cheaper than at UAT/production", ja: "APIの契約不一致をPR段階で見つける方がUAT／本番で見つけるよりはるかに安いから" },
      { vi: "Vì UAT không hỗ trợ contract test", en: "Because UAT doesn't support contract testing", ja: "UATは契約テストに対応していないから" },
      { vi: "Vì Core Banking API không có phiên bản", en: "Because the Core Banking API is unversioned", ja: "Core Banking APIにはバージョンがないから" },
    ], correct: 1,
    explain: { vi: "Đúng tinh thần shift-left: chi phí sửa một lỗi hợp đồng API tăng dần theo giai đoạn — rẻ nhất tại PR, đắt nhất khi đã lên production (ảnh hưởng giao dịch thật).", en: "This is the shift-left spirit: the cost to fix an API contract bug grows with each stage — cheapest at PR, most expensive once in production (real transactions affected).", ja: "これがシフトレフトの精神：API契約バグの修正コストは段階が進むほど増大 — PR時点が最も安く、本番（実取引に影響）が最も高い。" },
  }),
  mcq({
    q: { vi: "Đội của bạn đã tự động hoá 100% test nhưng vẫn chỉ chạy 1 lần/tuần vào tối thứ Sáu. Đây có phải shift-left thật sự không?", en: "Your team has 100% test automation but still only runs it once a week on Friday night. Is this truly shift-left?", ja: "チームはテストを100％自動化しているが、金曜夜に週1回しか実行していない。これは本当のシフトレフトか？" },
    options: [
      { vi: "Có, vì đã tự động hoá hoàn toàn", en: "Yes, because it's fully automated", ja: "はい、完全自動化されているから" },
      { vi: "Không, vì shift-left là về THỜI ĐIỂM chạy sớm, không chỉ là tự động hoá", en: "No, because shift-left is about running EARLY, not just automation", ja: "いいえ、シフトレフトは自動化だけでなく『早く実行する』時期の問題だから" },
      { vi: "Có, miễn là test pass hết", en: "Yes, as long as all tests pass", ja: "はい、全テストが通っていれば" },
      { vi: "Không liên quan, shift-left chỉ áp dụng cho manual test", en: "Not relevant, shift-left only applies to manual testing", ja: "関係ない、シフトレフトは手動テストにのみ適用される" },
    ], correct: 1,
    explain: { vi: "Tự động hoá không đồng nghĩa shift-left. Chạy 1 lần/tuần nghĩa là lỗi có thể tồn tại cả tuần trước khi bị phát hiện — vẫn là kiểm thử 'dồn cuối', chỉ khác là chạy bằng máy thay vì tay.", en: "Automation doesn't equal shift-left. Running once a week means a bug can linger for a week before detection — still 'batched-at-the-end' testing, just executed by a machine instead of by hand.", ja: "自動化＝シフトレフトではない。週1回の実行では、バグが発見まで1週間残る可能性がある — 手動の代わりに機械が実行しているだけで、依然として『後回し』のテストである。" },
  }),
];

const pages = [
  { heading: { vi: "1. Tóm tắt nhanh & pipeline bạn sẽ làm việc cùng", en: "1. TL;DR & the pipeline you'll work with", ja: "1. 要点と対象パイプライン" },
    blocks: [
      TLDR("Shift-left testing là dịch chuyển kiểm thử về càng sớm càng tốt trong vòng đời — review, unit test, kiểm thử tĩnh (SAST), contract test chạy tự động ngay ở pull request, thay vì dồn về cuối sprint. Bài này bám pipeline CI/CD thật của app ngân hàng số NovaBank Pay: bạn dựng các cổng kiểm thử, đọc YAML pipeline, xử lý hai tình huống thực chiến, và có trắc nghiệm cuối bài.",
        "Shift-left testing means moving testing as early as possible in the lifecycle — review, unit tests, static analysis (SAST), contract tests running automatically right at the pull request, instead of piling up at sprint end. This article follows a real CI/CD pipeline for the NovaBank Pay digital banking app: you build test gates, read pipeline YAML, work through two hands-on situations, and finish with a quiz.",
        "シフトレフトテストとは、レビュー・単体テスト・静的解析（SAST）・契約テストをスプリント末に溜め込むのではなく、プルリクエストの時点で自動実行し、ライフサイクルの中でできるだけ早く移すことです。本記事はデジタル銀行アプリNovaBank Payの実際のCI/CDパイプラインに沿い、テストゲートを構築し、パイプラインYAMLを読み、2つの実戦シーンに取り組み、最後にクイズがあります。"),
      P("Bạn đã quen với việc viết test — giờ là lúc bàn về THỜI ĐIỂM chạy test. Ở một ngân hàng số, một lỗi lọt tới production không chỉ là bug report, nó có thể là giao dịch tiền sai, ảnh hưởng khách hàng thật và uy tín thương hiệu. Shift-left testing là cách đội kỹ thuật 'chặn' phần lớn lỗi ngay tại pull request — nơi chi phí sửa chỉ bằng vài phút code, thay vì hàng giờ điều tra sự cố production.",
        "You already know how to write tests — now let's talk about WHEN to run them. At a digital bank, a bug that escapes to production isn't just a bug report — it can mean an incorrect money transfer, real customers affected, and brand trust damaged. Shift-left testing is how the engineering team blocks most bugs right at the pull request — where the fix costs a few minutes of code, instead of hours investigating a production incident.",
        "テストの書き方はもう分かっているはず — 今回は『いつ実行するか』の話です。デジタル銀行では、本番に漏れたバグは単なるバグ報告ではなく、誤った送金、実際の顧客への影響、ブランド信頼の毀損を意味することがあります。シフトレフトテストは、エンジニアリングチームがプルリクエストの時点で大半のバグを止める方法です — 修正コストが数分のコードで済む段階で、本番障害の調査に何時間もかける代わりに。"),
      IMG(m_pipeline, "Pipeline CI/CD NovaBank Pay: các cổng shift-left từ commit tới canary production", "NovaBank Pay CI/CD pipeline: shift-left gates from commit to canary production", "NovaBank PayのCI/CDパイプライン：コミットからカナリア本番までのシフトレフトゲート"),
      DEF("Shift-left testing", "chiến lược dịch chuyển các hoạt động kiểm thử về càng sớm càng tốt trong vòng đời phát triển, lý tưởng là tự động hoá và gắn vào mỗi pull request trong pipeline CI/CD.",
        "the strategy of moving testing activities as early as possible in the development lifecycle, ideally automated and wired into every pull request in the CI/CD pipeline.",
        "開発ライフサイクルの中でテスト活動をできるだけ早い段階に移す戦略。理想はCI/CDパイプラインの各プルリクエストに自動化して組み込むこと。"),
    ] },
  { heading: { vi: "2. Shift-left trông như thế nào trong một pipeline thật", en: "2. What shift-left looks like in a real pipeline", ja: "2. 実際のパイプラインでシフトレフトはどう見えるか" },
    blocks: [
      P("Hãy hình dung mỗi pull request phải đi qua một chuỗi 'cổng' trước khi được merge. Cổng đầu tiên là kiểm thử tĩnh — nhanh, rẻ, không cần môi trường. Cổng tiếp theo là unit test — do chính lập trình viên viết cùng lúc với code nghiệp vụ. Rồi tới contract test — xác nhận app NovaBank Pay vẫn 'nói đúng ngôn ngữ' với API Core Banking. Chỉ khi qua hết các cổng, code mới được build và đi tiếp.",
        "Picture every pull request passing through a chain of 'gates' before it can be merged. The first gate is static analysis — fast, cheap, no environment needed. Next is unit testing — written by the developer alongside the business code itself. Then contract testing — confirming NovaBank Pay still 'speaks the right language' with the Core Banking API. Only after clearing all gates does the code get built and move on.",
        "すべてのプルリクエストがマージ前に一連の『ゲート』を通過すると想像してください。最初のゲートは静的解析 — 高速・低コストで環境不要。次は単体テスト — 開発者がビジネスロジックのコードと同時に書きます。その次は契約テスト — NovaBank PayがCore Banking APIと正しく『会話』できているか確認します。すべてのゲートを通過して初めて、コードはビルドされ次へ進みます。"),
      IMG(m_gate, "Cổng kiểm thử của một Pull Request: static → unit → contract → merged (nhánh blocked nếu rớt)", "The quality gate of a Pull Request: static → unit → contract → merged (blocked branch on failure)", "プルリクエストの品質ゲート：static→unit→contract→merged（失敗時はblocked分岐）"),
      DEF("Quality gate (cổng chất lượng)", "một điều kiện tự động trong pipeline — nếu không đạt (test fail, coverage thấp, lỗ hổng bảo mật) thì merge bị chặn.",
        "an automated condition in the pipeline — if not met (failing tests, low coverage, a security flaw), the merge is blocked.",
        "パイプライン内の自動化された条件 — 満たされない場合（テスト失敗、カバレッジ不足、脆弱性）、マージがブロックされる。"),
      P("Điểm khác biệt lớn nhất so với mô hình cũ: KHÔNG CÓ giai đoạn 'kiểm thử' tách rời cuối sprint nữa. Kiểm thử là một phần liên tục, chạy hàng chục lần mỗi ngày, mỗi lần một PR mở ra. Tester trong mô hình này không chỉ 'chạy test' mà còn thiết kế cổng nào chặn loại lỗi nào, và cùng dev quyết định ngưỡng (ví dụ coverage ≥ 90%).",
        "The biggest difference from the old model: there's NO separate 'testing phase' at sprint end anymore. Testing is a continuous part, running dozens of times a day, once per opened PR. A tester in this model doesn't just 'run tests' — they design which gate blocks which kind of bug, and work with developers to set thresholds (e.g. coverage ≥ 90%).",
        "旧モデルとの最大の違いは、スプリント末の独立した『テスト段階』がもう存在しないことです。テストは継続的な一部となり、PRが開かれるたびに1日に何十回も実行されます。このモデルでのテスターは単に『テストを実行する』だけでなく、どのゲートがどの種類のバグを止めるかを設計し、開発者と閾値（例：カバレッジ90％以上）を決定します。"),
    ] },
  { heading: { vi: "3. Vì sao tester nâng cao cần làm chủ shift-left", en: "3. Why advanced testers must master shift-left", ja: "3. 上級テスターがシフトレフトを習得すべき理由" },
    blocks: [
      P("Ở cấp độ nâng cao, công việc của bạn không còn giới hạn ở việc 'viết test case' — bạn tham gia thiết kế pipeline: chọn cổng nào đặt trước, cổng nào đặt sau, ngưỡng nào là hợp lý cho một hệ thống ngân hàng số nơi mỗi lỗi có thể liên quan tới tiền thật. Đây là kỹ năng phân biệt một automation tester bình thường với một Test/QA Engineer có tiếng nói trong kiến trúc kỹ thuật.",
        "At an advanced level, your job isn't limited to 'writing test cases' anymore — you take part in designing the pipeline itself: which gate goes first, which goes later, what thresholds make sense for a digital banking system where every bug can involve real money. This is the skill that separates an ordinary automation tester from a Test/QA Engineer with a real voice in technical architecture.",
        "上級レベルでは、あなたの仕事は『テストケースを書く』ことにとどまりません — パイプライン自体の設計に参加します：どのゲートを先に置くか、どのゲートを後に置くか、実際のお金が絡みうるデジタル銀行システムにとって妥当な閾値は何か。これが、普通の自動化テスターと、技術アーキテクチャで発言力を持つTest/QAエンジニアを分ける能力です。"),
      P("Ngân hàng số vận hành theo múi giờ giao dịch liên tục, đội dev release nhiều lần mỗi ngày. Nếu kiểm thử vẫn 'dồn cuối', tốc độ release của cả đội bị kẹt lại chờ QA — hoặc tệ hơn, đội bỏ qua QA để chạy nhanh, kéo theo rủi ro tài chính. Hiểu shift-left giúp bạn thiết kế được quy trình vừa nhanh vừa an toàn, đúng bài toán mà mọi công ty fintech đang giải.",
        "A digital bank operates around continuous transaction hours, and dev teams release multiple times a day. If testing stays 'batched at the end', the whole team's release speed gets stuck waiting on QA — or worse, the team skips QA to move fast, adding financial risk. Understanding shift-left lets you design a process that's both fast and safe, exactly the problem every fintech company is solving.",
        "デジタル銀行は継続的な取引時間帯で運用され、開発チームは1日に何度もリリースします。テストが『後回し』のままだと、チーム全体のリリース速度がQA待ちで滞ります — さらに悪いケースでは、チームが速度を優先しQAを省略し、金融リスクが増します。シフトレフトを理解することで、速く、かつ安全なプロセスを設計できます。これはすべてのフィンテック企業が取り組んでいる課題そのものです。"),
      P("Đây cũng là câu hỏi phỏng vấn nâng cao thường gặp: 'Bạn sẽ thiết kế các cổng kiểm thử trong pipeline CI/CD cho một hệ thống thanh toán như thế nào?' Trả lời tốt cho thấy bạn không chỉ biết công cụ, mà hiểu đánh đổi giữa tốc độ và rủi ro — thứ nhà tuyển dụng cấp senior thực sự tìm kiếm.",
        "It's also a common advanced interview question: 'How would you design the test gates in a CI/CD pipeline for a payment system?' A strong answer shows you understand not just tools, but the trade-off between speed and risk — exactly what senior-level hiring managers are looking for.",
        "これは上級面接でもよく聞かれる質問です：『決済システムのCI/CDパイプラインにおけるテストゲートをどう設計しますか？』良い回答は、ツールを知っているだけでなく、速度とリスクのトレードオフを理解していることを示します — これこそシニアレベルの採用担当者が本当に求めているものです。"),
    ] },
  { heading: { vi: "4. Chuẩn bị: công cụ & các cổng chuẩn", en: "4. Prepare: tools & the standard gates", ja: "4. 準備：ツールと標準ゲート" },
    blocks: [
      P("Bạn không cần một hệ thống phức tạp để bắt đầu. Hầu hết đội dùng GitHub Actions/GitLab CI làm 'người điều phối' pipeline, chạy các bước tuần tự trên mỗi PR. Việc của bạn là biết bốn cổng lõi và ý nghĩa của chúng trước khi đọc YAML thật.",
        "You don't need a complex system to start. Most teams use GitHub Actions/GitLab CI as the pipeline 'orchestrator', running steps sequentially on every PR. Your job is to know the four core gates and their meaning before reading real YAML.",
        "始めるのに複雑なシステムは不要です。多くのチームはGitHub Actions/GitLab CIをパイプラインの『指揮者』として使い、各PRでステップを順に実行します。実際のYAMLを読む前に、4つの中核ゲートとその意味を知っておくことがあなたの仕事です。"),
      STEP(1, "Cổng tĩnh (Static/SAST): lint code + quét lỗ hổng bảo mật cơ bản, chạy dưới 1 phút, không cần môi trường.", "Static gate (Static/SAST): code lint + basic vulnerability scan, runs under 1 minute, no environment needed.", "静的ゲート（Static/SAST）：コードリント＋基本的な脆弱性スキャン、1分未満、環境不要。"),
      STEP(2, "Cổng unit: chạy toàn bộ unit test, chặn merge nếu coverage dưới ngưỡng đã thống nhất (vd 90% cho module tiền).", "Unit gate: run the full unit test suite, block merge if coverage falls below the agreed threshold (e.g. 90% for money modules).", "単体ゲート：全単体テストを実行し、合意した閾値（例：金銭モジュールは90%）を下回ればマージをブロック。"),
      STEP(3, "Cổng contract: xác nhận API request/response giữa app và Core Banking vẫn khớp hợp đồng (schema, field bắt buộc).", "Contract gate: confirm the API request/response between the app and Core Banking still matches the contract (schema, required fields).", "契約ゲート：アプリとCore Banking間のAPIリクエスト/レスポンスが契約（スキーマ、必須フィールド）と一致することを確認。"),
      STEP(4, "Cổng E2E staging: smoke test tự động trên môi trường staging sau khi build/deploy thành công.", "Staging E2E gate: automated smoke tests on the staging environment after a successful build/deploy.", "ステージングE2Eゲート：ビルド/デプロイ成功後、ステージング環境で自動スモークテスト。"),
      TRY("Mở một pipeline CI/CD thật (của dự án bạn đang học/làm) và liệt kê các bước theo đúng thứ tự — bước nào chạy trước, bước nào chạy sau?", "Open a real CI/CD pipeline (from a project you're studying/working on) and list the steps in order — which runs first, which runs later?", "実際のCI/CDパイプライン（学習中/担当中のプロジェクト）を開き、ステップを順番に列挙しよう — どれが先で、どれが後か？"),
      PITFALL("Đặt cổng E2E (chạy chậm, cần môi trường) trước cổng unit/static (nhanh, rẻ) — lãng phí thời gian chờ vì lỗi đơn giản đáng lẽ bị chặn sớm hơn nhiều.", "Placing the E2E gate (slow, needs environment) before the unit/static gates (fast, cheap) — wastes waiting time on simple bugs that should have been blocked much earlier.", "E2Eゲート（遅い、環境が必要）を単体/静的ゲート（速い、安い）より前に置く — もっと早くブロックできたはずの単純なバグで待ち時間を無駄にする。"),
      IMG(m_compare, "So sánh: khi nào mỗi loại kiểm thử chạy — truyền thống (cuối) vs shift-left (sớm)", "Comparison: when each test type runs — traditional (late) vs shift-left (early)", "比較：各テスト種別がいつ実行されるか — 従来（後）とシフトレフト（早）"),
    ] },
  { heading: { vi: "5. Các bước triển khai shift-left (thực hành với YAML)", en: "5. Steps to implement shift-left (hands-on with YAML)", ja: "5. シフトレフト実装の手順（YAML実習）" },
    blocks: [
      P("Giờ ta xây một pipeline shift-left thật cho NovaBank Pay, từ commit tới canary production. Mỗi bước là một job cụ thể trong file YAML mà đội DevOps + Tester cùng thống nhất.",
        "Now let's build a real shift-left pipeline for NovaBank Pay, from commit to canary production. Each step is a concrete job in the YAML file that DevOps + Tester agree on together.",
        "では、NovaBank Payのための実際のシフトレフトパイプラインを、コミットからカナリア本番まで構築しましょう。各ステップは、DevOpsとテスターが合意したYAMLファイル内の具体的なジョブです。"),
      STEP(1, "Mở PR → pipeline tự khởi động, chạy lint + SAST trước tiên (cổng rẻ nhất, nhanh nhất).", "Open a PR → the pipeline auto-starts, running lint + SAST first (the cheapest, fastest gate).", "PRを開く→パイプラインが自動開始、まずlint＋SASTを実行（最も安く速いゲート）。"),
      STEP(2, "Qua cổng tĩnh → chạy unit test với coverage bắt buộc; dưới ngưỡng thì pipeline dừng, PR không thể merge.", "Pass the static gate → run unit tests with a required coverage; below threshold, the pipeline stops and the PR can't merge.", "静的ゲート通過→必須カバレッジ付きで単体テスト実行；閾値未満ならパイプライン停止、PRはマージ不可。"),
      STEP(3, "Qua cổng unit → chạy contract test (vd Pact) xác nhận app vẫn khớp hợp đồng với API Core Banking.", "Pass the unit gate → run contract tests (e.g. Pact) confirming the app still matches the Core Banking API contract.", "単体ゲート通過→契約テスト（例：Pact）を実行し、Core Banking APIとの契約整合を確認。"),
      STEP(4, "Qua cổng hợp đồng → build image, deploy staging, chạy E2E smoke tự động; đạt hết mới cho phép merge và canary production.", "Pass the contract gate → build the image, deploy to staging, run automated E2E smoke tests; only after passing everything is merge and canary production allowed.", "契約ゲート通過→イメージビルド、ステージングデプロイ、自動E2Eスモークテスト実行；すべて合格して初めてマージとカナリア本番が許可される。"),
      CODE("yaml", `name: nova-pay-ci
on: [pull_request]
jobs:
  shift-left:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Lint + SAST
        run: npm run lint && npm run sast
      - name: Unit test (coverage >= 90%)
        run: npm test -- --coverage
      - name: Contract test (Pact vs Core Banking)
        run: npm run test:contract
      - name: Build image
        run: docker build -t nova-pay:\${{ github.sha }} .
      - name: Deploy staging + E2E smoke
        run: ./deploy.sh staging && npm run test:e2e:smoke
      - name: Gate merge
        if: failure()
        run: exit 1`),
      TRY("Sắp xếp lại 4 bước trên theo đúng thứ tự nếu đội bạn thêm một bước 'kiểm thử tải' (load test) — bạn sẽ đặt nó ở đâu trong pipeline và vì sao?", "Reorder the four steps above if your team adds a 'load test' step — where would you place it in the pipeline and why?", "チームが『負荷テスト』ステップを追加する場合、上記4ステップをどう並べ替えますか。パイプラインのどこに置き、なぜそこに置くか説明しよう。"),
    ] },
  { heading: { vi: "6. Tình huống 1: PR bị chặn ở cổng unit vì coverage thấp", en: "6. Situation 1: a PR blocked at the unit gate for low coverage", ja: "6. シーン1：カバレッジ不足で単体ゲートに止められたPR" },
    blocks: [
      SITUATION("PR #482 (chuyển tiền liên ngân hàng) bị pipeline chặn ở cổng unit: coverage 78%, ngưỡng yêu cầu 90%.", "PR #482 (interbank transfer) is blocked by the pipeline at the unit gate: coverage is 78%, the required threshold is 90%.",
        "Lập trình viên đã viết unit test cho luồng thành công (happy path) nhưng chưa test các ca âm: số dư không đủ, mã ngân hàng thụ hưởng sai, timeout khi gọi Core Banking. Checklist shift-left ở PR cho thấy rõ mục còn thiếu.",
        "The developer wrote unit tests for the happy path but not negative cases: insufficient balance, an invalid beneficiary bank code, a timeout calling Core Banking. The shift-left checklist on the PR clearly shows what's missing.",
        "PR #482（銀行間送金）がパイプラインの単体ゲートで止められた：カバレッジ78％、要求閾値90％。",
        "開発者は正常系（happy path）の単体テストは書いたが、異常系（残高不足、受取銀行コード不正、Core Banking呼び出しのタイムアウト）は未実装。PRのシフトレフトチェックリストに不足項目が明示されている。"),
      SOLVE("Bổ sung unit test cho 3 ca âm còn thiếu, đẩy coverage lên 93%, pipeline tự chạy lại và mở khoá cổng — không cần ai duyệt tay.", "Add unit tests for the 3 missing negative cases, pushing coverage to 93%; the pipeline re-runs automatically and unlocks the gate — no manual approval needed.", "不足していた3つの異常系ケースの単体テストを追加、カバレッジを93％に。パイプラインが自動再実行しゲートが解放される — 手動承認は不要。"),
      IMG(m_pr, "Checklist shift-left của PR #482: 3 mục đạt, 1 mục còn thiếu được khoanh vùng", "The shift-left checklist for PR #482: 3 items done, 1 flagged as missing", "PR #482のシフトレフトチェックリスト：3項目完了、1項目が不足として強調表示"),
      P("Bài học ở đây: cổng unit không chỉ 'đếm số test' mà đo coverage có ý nghĩa — bao nhiêu nhánh logic thật sự được kiểm chứng, đặc biệt các ca âm liên quan tới tiền. Với hệ thống ngân hàng số, một ca âm bị bỏ sót (vd không kiểm tra số dư) có thể dẫn tới giao dịch sai lệch thật, nên ngưỡng coverage cho module tiền thường đặt cao hơn các module khác.",
        "The lesson here: the unit gate doesn't just 'count tests' — it measures meaningful coverage, how many logic branches are truly verified, especially negative cases involving money. In a digital banking system, one missed negative case (e.g. not checking balance) can lead to a real incorrect transaction, so the coverage threshold for money modules is usually set higher than for other modules.",
        "ここでの教訓：単体ゲートは単に『テスト数を数える』のではなく、意味のあるカバレッジ — 特にお金に関わる異常系を含め、どれだけのロジック分岐が実際に検証されているか — を測ります。デジタル銀行システムでは、見落とされた1つの異常系（例：残高チェック漏れ）が実際の誤取引につながる可能性があるため、金銭モジュールのカバレッジ閾値は他のモジュールより高く設定されるのが一般的です。"),
      RECAP(["Coverage thấp ở cổng unit thường là do thiếu ca âm, không phải thiếu test nói chung", "Module liên quan tới tiền nên đặt ngưỡng coverage cao hơn"],
        ["Low unit-gate coverage is usually about missing negative cases, not tests in general", "Money-related modules should have a higher coverage threshold"],
        ["単体ゲートのカバレッジ不足は多くの場合、異常系の欠落による", "金銭関連モジュールはより高いカバレッジ閾値を設定すべき"]),
    ] },
  { heading: { vi: "7. Tình huống 2: qua hết cổng nhưng lỗi vẫn lọt tới staging", en: "7. Situation 2: all gates pass but a bug still reaches staging", ja: "7. シーン2：全ゲート通過でもバグがステージングに漏れる" },
    blocks: [
      SITUATION("PR #497 qua hết cổng static/unit/contract, merge thành công — nhưng E2E smoke ở staging phát hiện màn hình xác nhận chuyển tiền hiển thị sai số tiền khi có phí giao dịch.", "PR #497 passes the static/unit/contract gates and merges successfully — but the staging E2E smoke test finds the transfer confirmation screen shows the wrong amount when a transaction fee applies.",
        "Unit test chỉ kiểm chứng hàm tính phí (logic thuần), không kiểm chứng cách MÀN HÌNH hiển thị kết quả đó. Contract test chỉ xác nhận API trả đúng field, không xác nhận UI đọc field đó đúng cách. Đây là khoảng trống giữa các lớp kiểm thử.",
        "The unit test only verifies the fee-calculation function (pure logic), not how the SCREEN displays that result. The contract test only confirms the API returns the correct field, not that the UI reads that field correctly. This is a gap between testing layers.",
        "PR #497は静的/単体/契約ゲートをすべて通過しマージに成功 — しかしステージングのE2Eスモークテストで、取引手数料がある場合に送金確認画面が誤った金額を表示していることが判明。",
        "単体テストは手数料計算関数（純粋なロジック）のみを検証し、その結果を画面がどう表示するかは検証していない。契約テストはAPIが正しいフィールドを返すことのみ確認し、UIがそのフィールドを正しく読むかは確認していない。これはテストの層の間のギャップである。"),
      SOLVE("Thêm một E2E test tối thiểu (không chỉ smoke) đúng luồng 'chuyển tiền có phí' vào bộ staging, đồng thời bổ sung một ca kiểm thử tích hợp UI-API vào cổng contract để bắt lỗi này sớm hơn ở lần sau.", "Add a minimal (not just smoke) E2E test covering the 'transfer with fee' flow to the staging suite, and add a UI-API integration case to the contract gate so this type of bug is caught earlier next time.", "『手数料付き送金』フローをカバーする最小限（スモークだけでない）のE2Eテストをステージングスイートに追加し、次回はより早く捕捉できるよう契約ゲートにUI-API統合ケースを追加する。"),
      IMG(m_dash, "Dashboard sau khi vá: lỗi lọt tới staging giảm rõ rệt, lỗi lọt production vẫn giữ ở 0", "Dashboard after the fix: bugs reaching staging drop sharply, production leaks stay at 0", "修正後のダッシュボード：ステージング漏れが大幅減少、本番漏れは0を維持"),
      P("Đây là bài học quan trọng cho tester nâng cao: shift-left không có nghĩa là mọi lỗi đều bị chặn ở cổng sớm nhất. Một số lỗi (như cách UI hiển thị kết quả tính toán) chỉ lộ ra khi các lớp kết hợp với nhau — đó là lý do cổng E2E staging vẫn cần thiết, nhưng PHẠM VI của nó nên thu hẹp: chỉ kiểm những gì các cổng sớm hơn không kiểm được, tránh trùng lặp và giữ pipeline nhanh.",
        "This is an important lesson for advanced testers: shift-left doesn't mean every bug gets blocked at the earliest gate. Some bugs (like how the UI displays a computed result) only surface when layers combine — that's why the staging E2E gate is still necessary, but its SCOPE should be narrow: only check what earlier gates can't, avoiding duplication and keeping the pipeline fast.",
        "これは上級テスターにとって重要な教訓です：シフトレフトは、すべてのバグが最も早いゲートで止められることを意味しません。一部のバグ（計算結果をUIがどう表示するかなど）は層が組み合わさって初めて現れます — だからステージングE2Eゲートは依然として必要ですが、その範囲は狭くすべきです：より早いゲートで確認できないものだけを確認し、重複を避けパイプラインを高速に保ちます。"),
    ] },
  { heading: { vi: "8. Theo dõi hiệu quả shift-left bằng số liệu", en: "8. Tracking shift-left effectiveness with metrics", ja: "8. 指標によるシフトレフト効果の追跡" },
    blocks: [
      P("Muốn thuyết phục cả đội (và cấp quản lý) rằng shift-left hiệu quả, bạn cần số liệu, không chỉ cảm nhận. Theo dõi mỗi sprint: bao nhiêu PR bị chặn ở từng cổng, bao nhiêu lỗi lọt tới staging, bao nhiêu lọt tới production, và thời gian phản hồi trung bình của một PR.",
        "To convince the team (and management) that shift-left works, you need metrics, not just a feeling. Track each sprint: how many PRs are blocked at each gate, how many bugs reach staging, how many reach production, and the average PR feedback time.",
        "チーム（および経営層）にシフトレフトが効果的だと納得してもらうには、感覚ではなく数値が必要です。各スプリントで追跡：各ゲートで何件のPRがブロックされたか、ステージングに何件のバグが漏れたか、本番に何件漏れたか、PRの平均フィードバック時間。"),
      STEP(1, "Sau mỗi sprint, đếm số PR bị chặn ở từng cổng (static/unit/contract) — đây là 'lỗi được cứu' nhờ shift-left.", "After each sprint, count PRs blocked at each gate (static/unit/contract) — these are 'bugs saved' thanks to shift-left.", "各スプリント後、各ゲート（static/unit/contract）でブロックされたPR数を数える — これはシフトレフトによる『救われたバグ』。"),
      STEP(2, "So sánh số lỗi lọt tới staging và production giữa các sprint để thấy xu hướng giảm dần.", "Compare bugs reaching staging and production across sprints to see a downward trend.", "スプリント間でステージングと本番に漏れたバグ数を比較し、減少傾向を確認。"),
      CODE("text", `BÁO CÁO SHIFT-LEFT — NovaBank Pay — Sprint 18
Tổng PR: 64 | Chặn ở static/SAST: 9 | Chặn ở unit: 22 | Chặn ở contract: 10
Qua hết cổng & merge: 41 | Lỗi lọt staging: 6 | Lỗi lọt production: 0
Thời gian phản hồi trung bình 1 PR: 7 phút (trước đây: ~2 ngày khi test dồn cuối sprint)`),
      IMG(m_dash, "Dashboard hiệu quả shift-left của Sprint 18: lỗi chặn ở PR, lỗi lọt staging/production, thời gian phản hồi", "Sprint 18 shift-left effectiveness dashboard: bugs blocked at PR, staging/production leaks, feedback time", "Sprint 18のシフトレフト効果ダッシュボード：PRでのブロック数、ステージング/本番漏れ、フィードバック時間"),
      TIP("Đừng chỉ báo cáo 'bao nhiêu lỗi tìm được' — báo cáo 'lỗi được chặn ở giai đoạn nào', vì đó là con số chứng minh trực tiếp giá trị của shift-left.", "Don't just report 'how many bugs found' — report 'at which stage bugs were blocked', because that's the number that directly proves shift-left's value.", "『見つけたバグの数』だけでなく『どの段階でブロックされたか』を報告しよう。それがシフトレフトの価値を直接証明する数値だから。"),
    ] },
  { heading: { vi: "9. Lỗi hay gặp & mẹo khi triển khai shift-left", en: "9. Common mistakes & tips when adopting shift-left", ja: "9. シフトレフト導入時のよくある失敗とコツ" },
    blocks: [
      P("Ngay cả đội có kinh nghiệm cũng vấp vài lỗi khi chuyển sang shift-left. Biết trước giúp bạn tránh mất thời gian và giữ được sự ủng hộ của cả đội cho thay đổi này.",
        "Even experienced teams stumble on a few mistakes when moving to shift-left. Knowing them in advance saves time and keeps the whole team's buy-in for the change.",
        "経験豊富なチームでもシフトレフトへの移行時にいくつかの失敗をしがちです。事前に知ることで時間の浪費を避け、この変化へのチーム全体の賛同を維持できます。"),
      PITFALL("Đặt ngưỡng coverage quá cao ngay từ đầu (vd 95% cho toàn bộ codebase) khiến pipeline luôn đỏ, đội mất động lực — nên tăng dần theo module, ưu tiên module tiền trước.", "Setting the coverage threshold too high from day one (e.g. 95% for the whole codebase) makes the pipeline always red, killing team morale — raise it gradually by module, prioritizing money modules first.", "初日からカバレッジ閾値を高く設定しすぎる（例：コードベース全体で95％）とパイプラインが常に赤くなり、チームの意欲が失われる — モジュールごとに段階的に上げ、金銭モジュールを優先すべき。"),
      PITFALL("Nhồi TẤT CẢ loại test (kể cả E2E nặng) vào cổng sớm nhất khiến mỗi PR chờ hàng chục phút — làm ngược lại mục tiêu 'phản hồi nhanh' của shift-left.", "Cramming EVERY test type (including heavy E2E) into the earliest gate makes each PR wait tens of minutes — defeating shift-left's 'fast feedback' goal.", "すべてのテスト種別（重いE2Eも含む）を最も早いゲートに詰め込むと、各PRが数十分待つことになる — シフトレフトの『高速フィードバック』という目的に反する。"),
      TIP("Quy tắc chọn cổng: test càng NHANH và càng RẺ thì đặt càng SỚM; test càng CHẬM và cần MÔI TRƯỜNG phức tạp thì đặt càng SAU.", "Gate-ordering rule: the FASTER and CHEAPER a test, the EARLIER it goes; the SLOWER and more environment-dependent, the LATER.", "ゲート順序のルール：速く安いテストほど早く、遅く複雑な環境が必要なテストほど後に置く。"),
      IMG(m_compare, "Nhắc lại: shift-left dịch chuyển thời điểm chạy test, không xoá bỏ loại test nào", "Reminder: shift-left changes WHEN tests run, it doesn't remove any test type", "再確認：シフトレフトはテストを実行する『タイミング』を変えるものであり、テスト種別をなくすものではない"),
    ] },
  { heading: { vi: "10. Câu hỏi thường gặp (FAQ)", en: "10. Frequently asked questions", ja: "10. よくある質問" },
    blocks: [
      faq1.block, faq2.block, faq3.block,
      INTERNAL("CI/CD với Playwright & GitHub Actions", "CI/CD with Playwright & GitHub Actions", "pw-cicd-github-actions"),
      INTERNAL("Contract testing schema GraphQL cho Tester", "GraphQL schema contract testing for testers", "at-graphql-schema-contract"),
    ] },
  QUIZ(quiz, { no: 11 }),
  { heading: { vi: "12. Học tiếp tại CyberSoft & tổng kết", en: "12. Learn more at CyberSoft & summary", ja: "12. CyberSoftで学ぶ・まとめ" },
    blocks: [
      P("Bạn vừa đi qua toàn bộ tư duy shift-left testing qua pipeline thật của NovaBank Pay: các cổng kiểm thử từ tĩnh, unit, hợp đồng tới E2E staging; cách đọc và thiết kế YAML pipeline; xử lý hai tình huống thực chiến — PR bị chặn vì coverage thấp, và lỗi lọt qua khoảng trống giữa các lớp kiểm thử; và cách đo hiệu quả bằng số liệu thay vì cảm nhận. Đây là kỹ năng cấp nâng cao mà mọi hệ thống fintech vận hành liên tục đều cần.",
        "You just walked through the full shift-left testing mindset via NovaBank Pay's real pipeline: gates from static, unit, contract to staging E2E; how to read and design pipeline YAML; two hands-on situations — a PR blocked for low coverage, and a bug slipping through the gap between testing layers; and how to measure effectiveness with metrics instead of gut feeling. This is an advanced-level skill every continuously operating fintech system needs.",
        "NovaBank Payの実際のパイプラインを通じ、シフトレフトテストの考え方全体を歩みました：静的、単体、契約からステージングE2Eまでのゲート、パイプラインYAMLの読み方と設計、2つの実戦シーン — カバレッジ不足で止められたPRと、テスト層の間のギャップをすり抜けたバグ、そして感覚ではなく数値で効果を測る方法。これは、継続的に稼働するすべてのフィンテックシステムが必要とする上級レベルのスキルです。"),
      P("Chặng tiếp theo, bạn nên luyện thiết kế contract test với công cụ như Pact và làm sâu hơn về pipeline-as-code. Nếu muốn học bài bản từ nền tảng Manual tới Automation, dựng CI/CD thật cùng người hướng dẫn và dự án fintech thực chiến, một khoá học Tester sẽ giúp bạn tiến nhanh và tự tin ứng tuyển vị trí Senior/QA Lead.",
        "Next, practice designing contract tests with tools like Pact and go deeper into pipeline-as-code. If you want to learn properly from Manual foundations to Automation, building a real CI/CD pipeline with a mentor and a real fintech project, a Tester course helps you progress fast and apply confidently for Senior/QA Lead roles.",
        "次は、Pactのようなツールで契約テストを設計する練習と、パイプライン・アズ・コードのより深い学習を。手動テストの基礎から自動化まで体系的に学び、指導者と実際のフィンテック案件で本物のCI/CDパイプラインを構築したいなら、テスターコースが速い成長とSenior/QAリード職への自信ある応募を助けます。"),
      CTA(course),
    ] },
];

const SHIFT_LEFT_01 = makeDoc({
  slug: "shift-left-testing-ci",
  domain: "fintech",
  primaryKeyword: "shift-left testing",
  keywords: ["shift-left testing", "kiểm thử sớm", "CI/CD testing", "shift left CI/CD", "quality gate pipeline", "contract testing"],
  coverLabel: "ADVANCED · SHIFT-LEFT · CI/CD",
  crumb: "Shift-left testing trong CI/CD",
  metaTitle: {
    vi: "Shift-left testing là gì? Kiểm thử sớm trong CI/CD",
    en: "What is shift-left testing? Testing early in CI/CD",
    ja: "シフトレフトテストとは？CI/CDでの早期テスト",
  },
  metaDescription: {
    vi: "Shift-left testing là gì, áp dụng ra sao trong pipeline CI/CD ngân hàng số: cổng kiểm thử sớm, ví dụ YAML, tình huống thực chiến, hình minh hoạ và trắc nghiệm.",
    en: "What is shift-left testing and how to apply it in a digital banking CI/CD pipeline: early test gates, a YAML example, hands-on situations, with visuals and a quiz.",
    ja: "シフトレフトテストとは何か、デジタル銀行のCI/CDパイプラインでの適用方法：早期テストゲート、YAML例、実戦シーン、図とクイズ付き。",
  },
  title: {
    vi: "Shift-left testing: kiểm thử sớm trong CI/CD qua pipeline ngân hàng số (có trắc nghiệm)",
    en: "Shift-left testing: testing early in CI/CD through a digital banking pipeline (with quiz)",
    ja: "シフトレフトテスト：デジタル銀行パイプラインで学ぶCI/CDの早期テスト（クイズ付き）",
  },
  summary: {
    vi: "Bài nâng cao: làm chủ shift-left testing qua pipeline CI/CD thật của app ngân hàng số NovaBank Pay. Các cổng kiểm thử tĩnh, unit, hợp đồng, E2E staging; YAML pipeline thực chiến; hai tình huống PR bị chặn và lỗi lọt qua khoảng trống giữa các lớp; đo hiệu quả bằng số liệu, nhiều mockup giao diện, FAQ và trắc nghiệm 4 câu. Chuẩn SEO, dẫn về khóa Tester CyberSoft.",
    en: "Advanced article: master shift-left testing through NovaBank Pay's real digital banking CI/CD pipeline. Static, unit, contract and staging E2E gates; a hands-on pipeline YAML; two situations — a blocked PR and a bug slipping through a testing-layer gap; measuring effectiveness with metrics, many UI mockups, FAQ and a 4-question quiz. SEO-ready, links to CyberSoft Tester course.",
    ja: "上級記事：デジタル銀行アプリNovaBank Payの実際のCI/CDパイプラインでシフトレフトテストを習得。静的・単体・契約・ステージングE2Eゲート、実戦的なパイプラインYAML、ブロックされたPRとテスト層の間のギャップをすり抜けたバグの2シーン、数値による効果測定、多数のモック、FAQ、4問クイズ。",
  },
  faqs: [faq1, faq2, faq3],
  howTo: { name: "Cách triển khai shift-left testing trong pipeline CI/CD", steps: [
    { name: "Đặt cổng tĩnh & unit sớm nhất", text: "Lint/SAST rồi unit test với coverage bắt buộc, chạy ngay mỗi PR." },
    { name: "Thêm cổng hợp đồng API", text: "Xác nhận app vẫn khớp hợp đồng với hệ thống Core Banking trước khi build." },
    { name: "Giữ E2E staging gọn & đo hiệu quả", text: "Chỉ kiểm những gì cổng sớm không kiểm được; theo dõi số liệu mỗi sprint." },
  ] },
  pages,
});

export const CNM_SHIFT_LEFT_01 = [SHIFT_LEFT_01];
