// ============================================================================
// AIAGENT_11 — Bài SEO/GEO flagship (1 bài, kind=congnghe).
// "AI Agent trong Kiểm thử phần mềm — hướng dẫn toàn diện cho Tester/QA".
// Tối ưu Google Search + Google AI Overview (FAQ QA blocks, định nghĩa + takeaways).
// Trilingual VI/EN/JA (JA thật, khác EN). Oracle-first ở phần kỹ thuật.
// Latest-tool facts: Playwright Agents (Planner/Generator/Healer) + MCP.
// ============================================================================

import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

const coverA = makeThumb({ id: "aia11a", domain: "saas", kind: "congnghe", label: "AI AGENT · TESTER GUIDE" });

const pagesA = [];

/* =========================================================================
 * ARTICLE — AI Agent trong kiểm thử phần mềm cho Tester/QA (SEO/GEO flagship).
 * ========================================================================= */

pagesA.push({
  heading: {
    vi: "1. AI Agent trong kiểm thử phần mềm là gì?",
    en: "1. What is an AI agent in software testing?",
    ja: "1. ソフトウェアテストにおけるAIエージェントとは？",
  },
  blocks: [
    P(
      "Nếu bạn là một Tester/QA đang tự hỏi 'AI Agent trong testing là gì và nó có liên quan gì tới công việc của mình', đây là bài viết dành cho bạn. Một cách ngắn gọn, AI Agent trong kiểm thử phần mềm là một phần mềm dùng mô hình ngôn ngữ lớn (LLM) làm bộ não, được cấp công cụ (tools) để thực sự hành động — mở trình duyệt, đọc mã nguồn, chạy test, đọc log — chứ không chỉ trả lời bằng chữ. Nói cách khác, AI Agent testing biết lập kế hoạch, tự quyết bước tiếp theo, gọi công cụ, quan sát kết quả rồi lặp lại vòng lặp đó cho tới khi hoàn thành mục tiêu bạn giao. Đây là điểm khác biệt cốt lõi giúp AI trong testing chuyển từ 'gợi ý' sang 'làm việc'.",
      "If you are a tester/QA wondering 'what is an AI agent in testing and how does it relate to my job', this article is for you. In short, an AI agent in software testing is a program that uses a large language model (LLM) as its brain and is granted tools to actually act — open a browser, read source code, run tests, read logs — rather than only replying with text. In other words, AI agent testing can plan, decide the next step on its own, call tools, observe the result and loop until it completes the goal you gave it. This is the core difference that moves AI in testing from 'suggesting' to 'doing'.",
      "テスター/QAとして「テストにおけるAIエージェントとは何か、そして自分の仕事とどう関係するのか」と疑問に思っているなら、この記事はあなたのためのものです。手短に言えば、ソフトウェアテストにおけるAIエージェントとは、大規模言語モデル（LLM）を頭脳として使い、実際に行動するためのツール（ブラウザを開く、ソースコードを読む、テストを実行する、ログを読む）を与えられたプログラムであり、文字で答えるだけではありません。言い換えれば、AIエージェントテストは計画を立て、次のステップを自ら決定し、ツールを呼び出し、結果を観察し、与えられた目標を達成するまでそのループを繰り返します。これがAIテストを「提案」から「実行」へと変える核心的な違いです。",
    ),
    P(
      "Hãy hình dung sự khác biệt bằng một ví dụ quen thuộc với dân QA. Bạn nói với một chatbot 'viết cho tôi test đăng nhập' — nó trả về một đoạn mã, còn việc chạy, sửa selector sai, chờ trang tải là việc của bạn. Ngược lại, bạn giao cho một AI Agent testing nhiệm vụ 'kiểm thử luồng đăng nhập trên trang staging này' — agent tự mở trình duyệt qua công cụ, tự dò các phần tử, tự sinh kịch bản kiểm thử (test case), chạy thử, thấy lỗi thì tự sửa rồi chạy lại, cuối cùng nộp lại cho bạn một bộ test đã xanh kèm báo cáo. Vai trò của bạn không biến mất; nó dịch chuyển lên thành người ra đề, người kiểm định và người chịu trách nhiệm cuối cùng.",
      "Picture the difference with an example familiar to QA folks. You tell a chatbot 'write me a login test' — it returns a snippet, and running it, fixing the wrong selector, waiting for the page to load are all up to you. By contrast, you hand an AI testing agent the task 'test the login flow on this staging site' — the agent opens a browser through a tool, probes the elements, generates the test cases, runs them, fixes failures and reruns, and finally hands you a green test suite with a report. Your role does not vanish; it shifts upward into the one who sets the task, verifies, and takes final responsibility.",
      "QAにとって身近な例で違いを想像してみましょう。チャットボットに「ログインテストを書いて」と伝えると、スニペットが返ってきますが、それを実行し、間違ったロケーターを直し、ページの読み込みを待つのはすべてあなた次第です。対照的に、AIテストエージェントに「このステージングサイトのログインフローをテストして」というタスクを渡すと、エージェントはツールを通してブラウザを開き、要素を探り、テストケースを生成し、実行し、失敗を修正して再実行し、最終的にグリーンになったテストスイートとレポートを渡してくれます。あなたの役割は消えません。課題を設定し、検証し、最終責任を負う立場へと上へ移動するのです。",
    ),
    NOTE(
      "Từ khóa quan trọng: 'agentic' nghĩa là có tính chủ động — agent tự lập kế hoạch và hành động trong một vòng lặp, thay vì chờ từng lệnh của con người. Chính vòng lặp 'suy nghĩ → hành động → quan sát' này biến LLM thành một trợ lý kiểm thử tự động thật sự.",
      "Key term: 'agentic' means proactive — the agent plans and acts in a loop instead of waiting for each human command. This 'think → act → observe' loop is exactly what turns an LLM into a real automated testing assistant.",
      "重要な用語：「エージェント的（agentic）」とは主体的であることを意味します。エージェントは人間の各命令を待つのではなく、ループの中で自ら計画し行動します。この「思考→行動→観察」のループこそが、LLMを本物の自動テストアシスタントに変えるのです。",
    ),
    CODE(
      "text",
      `Vòng lặp cốt lõi của một AI testing agent (rút gọn):

  GOAL: "Kiểm thử luồng đăng nhập trên https://staging.example.com"
  LOOP:
    1) THINK   -> agent suy luận bước kế tiếp cần làm
    2) ACT     -> gọi tool: browser.open / read_dom / run_test / read_log
    3) OBSERVE -> đọc kết quả tool (DOM, ảnh, stdout, mã lỗi)
    4) nếu chưa đạt GOAL -> quay lại (1) với ngữ cảnh mới
  STOP khi: GOAL đạt  HOẶC  chạm guardrail (giới hạn bước/quyền/chi phí)
  OUTPUT: bộ test đã chạy + báo cáo để CON NGƯỜI review`,
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "2. AI Agent khác chatbot ở điểm nào? (định nghĩa & key takeaways)",
    en: "2. How is an AI agent different from a chatbot? (definition & key takeaways)",
    ja: "2. AIエージェントはチャットボットとどう違う？（定義と要点）",
  },
  blocks: [
    P(
      "Rất nhiều người mới học tester nhầm AI Agent với chatbot vì cả hai đều dùng LLM. Định nghĩa rạch ròi thế này: chatbot là một hệ hỏi–đáp một lượt, nhận văn bản và trả về văn bản; nó không tự mình chạm vào hệ thống của bạn. AI Agent là một hệ tự chủ nhiều lượt: nó được cấp công cụ, có quyền hành động, có vòng lặp lập kế hoạch và có bộ nhớ ngữ cảnh để theo đuổi một mục tiêu nhiều bước. Trong kiểm thử phần mềm, sự khác biệt này là ranh giới giữa 'một trợ lý gợi ý code' và 'một cộng sự tự động chạy được cả quy trình automation testing'.",
      "Many people new to testing confuse an AI agent with a chatbot because both use an LLM. Here is a crisp definition: a chatbot is a single-turn question–answer system that takes text and returns text; it does not touch your system on its own. An AI agent is a multi-turn autonomous system: it is given tools, has permission to act, has a planning loop, and holds context memory to pursue a multi-step goal. In software testing, this difference is the line between 'an assistant that suggests code' and 'a teammate that autonomously runs an entire automation testing workflow'.",
      "テストを学び始めた多くの人は、どちらもLLMを使うため、AIエージェントをチャットボットと混同します。明確な定義はこうです。チャットボットはテキストを受け取りテキストを返す単一ターンの質問応答システムであり、自らあなたのシステムに触れることはありません。AIエージェントは複数ターンの自律システムであり、ツールを与えられ、行動する権限を持ち、計画ループを持ち、複数ステップの目標を追うための文脈記憶を保持します。ソフトウェアテストにおいて、この違いは「コードを提案するアシスタント」と「自動化テストのワークフロー全体を自律的に実行する仲間」との境界線です。",
    ),
    UL(
      [
        "Key takeaway 1: Chatbot = một lượt, chỉ trả chữ. AI Agent = nhiều lượt, có công cụ và tự hành động.",
        "Key takeaway 2: Agent có vòng lặp 'suy nghĩ → hành động → quan sát' và bộ nhớ ngữ cảnh; chatbot thì không.",
        "Key takeaway 3: Trong testing, agent tự mở trình duyệt, chạy test, đọc log; chatbot chỉ gợi ý đoạn mã.",
        "Key takeaway 4: Agent luôn cần guardrails và human-in-the-loop; con người vẫn duyệt kết quả cuối.",
        "Key takeaway 5: AI Agent không thay thế tester — nó thay thế phần việc lặp lại và nâng vai trò tester lên.",
      ],
      [
        "Key takeaway 1: Chatbot = single turn, text only. AI agent = multi-turn, has tools and acts on its own.",
        "Key takeaway 2: An agent has a 'think → act → observe' loop and context memory; a chatbot does not.",
        "Key takeaway 3: In testing, an agent opens the browser, runs tests, reads logs; a chatbot only suggests snippets.",
        "Key takeaway 4: Agents always need guardrails and human-in-the-loop; humans still approve the final result.",
        "Key takeaway 5: AI agents do not replace testers — they replace repetitive work and elevate the tester's role.",
      ],
      [
        "要点1：チャットボット＝単一ターン、テキストのみ。AIエージェント＝複数ターン、ツールを持ち自ら行動する。",
        "要点2：エージェントは「思考→行動→観察」ループと文脈記憶を持つ。チャットボットは持たない。",
        "要点3：テストではエージェントがブラウザを開き、テストを実行し、ログを読む。チャットボットはスニペットを提案するだけ。",
        "要点4：エージェントには常にガードレールと人間参加（human-in-the-loop）が必要。最終結果は人間が承認する。",
        "要点5：AIエージェントはテスターを置き換えない。反復作業を置き換え、テスターの役割を引き上げる。",
      ],
    ),
    IMG(
      `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="640" height="260" rx="14" fill="#0f172a"/><text x="24" y="34" fill="#f1f5f9" font-size="17" font-weight="800">Chatbot vs AI Agent</text><g><rect x="24" y="56" width="270" height="176" rx="12" fill="#111827" stroke="#334155"/><text x="40" y="84" fill="#93c5fd" font-size="14" font-weight="700">CHATBOT</text><text x="40" y="112" fill="#cbd5e1" font-size="12">Text vào → Text ra</text><text x="40" y="136" fill="#cbd5e1" font-size="12">1 lượt · không có tools</text><text x="40" y="160" fill="#cbd5e1" font-size="12">Con người tự chạy code</text><rect x="40" y="182" width="230" height="30" rx="8" fill="#1e293b"/><text x="52" y="202" fill="#7dd3fc" font-size="12">"viết test đăng nhập"</text></g><g><rect x="346" y="56" width="270" height="176" rx="12" fill="#0b2a1c" stroke="#14532d"/><text x="362" y="84" fill="#34d399" font-size="14" font-weight="700">AI AGENT</text><text x="362" y="112" fill="#cbd5e1" font-size="12">Có tools · nhiều lượt</text><text x="362" y="136" fill="#cbd5e1" font-size="12">Vòng lặp: think→act→observe</text><text x="362" y="160" fill="#cbd5e1" font-size="12">Tự chạy + tự sửa + báo cáo</text><rect x="362" y="182" width="230" height="30" rx="8" fill="#052e16"/><text x="374" y="202" fill="#34d399" font-size="12">"kiểm thử luồng đăng nhập"</text></g><path d="M300 144 h40" stroke="#64748b" stroke-width="2" marker-end="url(#a)"/><defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#64748b"/></marker></defs></svg>`,
      "So sánh trực quan: chatbot một lượt vs AI Agent có công cụ và vòng lặp tự chủ.",
      "Visual comparison: a single-turn chatbot vs an AI agent with tools and an autonomous loop.",
      "視覚的な比較：単一ターンのチャットボット対、ツールと自律ループを持つAIエージェント。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "3. Vì sao QA cần biết về AI Agent testing ngay bây giờ?",
    en: "3. Why should QA care about AI agent testing right now?",
    ja: "3. なぜQAは今すぐAIエージェントテストを知るべきか？",
  },
  blocks: [
    P(
      "Ngành kiểm thử tự động (automation testing) đang thay đổi nhanh vì AI trong testing đã đủ chín để làm việc thật. Trước đây, phần tốn thời gian nhất của một tester automation không phải là ý tưởng test case mà là công sức cơ khí: viết selector, sửa test hỏng khi UI đổi, cập nhật dữ liệu, chờ CI. Đây đúng là những việc mà một AI Agent testing làm tốt — nhanh, không mệt, chạy hàng loạt. Khi phần cơ khí được agent gánh bớt, giá trị của tester dồn vào những thứ máy chưa giỏi: hiểu nghiệp vụ, thiết kế oracle (định nghĩa 'thế nào là đúng'), đánh giá rủi ro và phán đoán khi kết quả mập mờ.",
      "The automation testing field is changing fast because AI in testing is now mature enough to do real work. Previously, the most time-consuming part of an automation tester's job was not test-case ideas but mechanical effort: writing selectors, fixing broken tests when the UI changes, updating data, waiting on CI. These are exactly what an AI testing agent does well — fast, tireless, at scale. When the mechanical part is offloaded to the agent, the tester's value concentrates on what machines are still weak at: understanding the business, designing oracles (defining 'what correct means'), assessing risk, and judging ambiguous outcomes.",
      "自動化テストの分野は、AIテストが実際の作業をこなせるほど成熟したため、急速に変化しています。以前は、自動化テスターの仕事で最も時間を要したのはテストケースのアイデアではなく、機械的な労力（ロケーターの記述、UI変更時の壊れたテストの修正、データ更新、CI待ち）でした。これらはまさにAIテストエージェントが得意とすること（速く、疲れず、大規模に）です。機械的な部分がエージェントに肩代わりされると、テスターの価値は機械がまだ苦手なこと（業務理解、オラクル設計（「正しいとは何か」の定義）、リスク評価、曖昧な結果の判断）に集中します。",
    ),
    SCEN(
      "Một ngày làm việc có AI Agent",
      "A workday with an AI agent",
      "Chín giờ sáng, sprint có mười câu chuyện người dùng mới cho module giỏ hàng. Thay vì tự tay viết bốn mươi test case regression, tester giao cho AI Agent nhiệm vụ khám phá luồng mới trên staging, đề xuất bộ test, và tự sinh code Playwright. Trong lúc agent chạy, tester ngồi rà soát bản kế hoạch test agent đề xuất, gạch bỏ hai case sai nghiệp vụ, thêm một case biên về mã giảm giá hết hạn mà agent bỏ sót. Đến trưa, agent nộp một PR test đã xanh; tester review, chỉnh assertion cho đúng oracle rồi merge. Việc lặp lại do máy làm, việc phán đoán do người làm.",
      "At 9am the sprint has ten new user stories for the cart module. Instead of hand-writing forty regression test cases, the tester hands the AI agent the task of exploring the new flows on staging, proposing a test set, and generating Playwright code. While the agent runs, the tester reviews the test plan it proposed, deletes two business-incorrect cases, and adds a boundary case for an expired discount code the agent missed. By noon the agent submits a green test PR; the tester reviews, adjusts assertions to match the oracle, and merges. Machines do the repetitive work; humans do the judging.",
      "午前9時、スプリントにはカートモジュールの新しいユーザーストーリーが10件あります。40件の回帰テストケースを手書きする代わりに、テスターはAIエージェントに、ステージング上で新しいフローを探索し、テストセットを提案し、Playwrightコードを生成するタスクを渡します。エージェントが実行している間、テスターは提案されたテスト計画をレビューし、業務的に誤った2件を削除し、エージェントが見落とした期限切れ割引コードの境界ケースを追加します。正午までにエージェントはグリーンのテストPRを提出し、テスターはレビューし、アサーションをオラクルに合わせて調整してマージします。反復作業は機械が、判断は人間が行います。",
    ),
    QA(
      "AI Agent trong testing là gì?",
      "What is an AI agent in testing?",
      "AI Agent trong testing là phần mềm dùng LLM làm bộ não và được cấp công cụ để tự hành động: mở trình duyệt, sinh và chạy test case, đọc log, tự sửa lỗi rồi lặp lại cho tới khi đạt mục tiêu. Khác với chatbot chỉ trả về chữ, agent thực sự thao tác trên hệ thống trong một vòng lặp tự chủ, và luôn cần con người review kết quả cuối.",
      "An AI agent in testing is software that uses an LLM as its brain and is given tools to act on its own: open a browser, generate and run test cases, read logs, fix failures, and loop until the goal is met. Unlike a chatbot that only returns text, an agent actually operates on the system in an autonomous loop, and a human still reviews the final result.",
      "テストにおけるAIエージェントとは、LLMを頭脳として使い、自ら行動するためのツールを与えられたソフトウェアです。ブラウザを開き、テストケースを生成・実行し、ログを読み、失敗を修正し、目標達成までループします。テキストだけを返すチャットボットと違い、エージェントは自律ループの中で実際にシステムを操作し、最終結果は人間がレビューします。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "4. Playwright Agents: Planner, Generator và Healer hoạt động thế nào?",
    en: "4. Playwright Agents: how Planner, Generator and Healer work",
    ja: "4. Playwright Agents：Planner・Generator・Healerの仕組み",
  },
  blocks: [
    P(
      "Playwright — bộ công cụ kiểm thử tự động của Microsoft, rất phổ biến trong automation testing — đã bổ sung khả năng agentic gọi là Playwright Agents. Đây là ví dụ thực tế nhất hiện nay về AI Agent trong kiểm thử phần mềm, và nó được chia thành ba vai rõ ràng để dễ kiểm soát: Planner, Generator và Healer. Ý tưởng cốt lõi là tách 'nghĩ ra làm gì' khỏi 'viết mã' và 'sửa test hỏng', để mỗi bước con người đều có thể xen vào review. Thiết kế ba vai này chính là cách Playwright đưa AI vào testing mà vẫn giữ được nguyên tắc human-in-the-loop.",
      "Playwright — Microsoft's automation testing toolkit, hugely popular in automation testing — has added agentic capabilities called Playwright Agents. This is the most concrete example today of an AI agent in software testing, and it is split into three clear roles for controllability: Planner, Generator and Healer. The core idea is to separate 'deciding what to do' from 'writing code' and 'fixing broken tests', so a human can step into review at each stage. This three-role design is exactly how Playwright brings AI into testing while preserving the human-in-the-loop principle.",
      "Playwright（Microsoftの自動化テストツールキットで、自動化テストで非常に人気）は、Playwright Agentsと呼ばれるエージェント機能を追加しました。これは今日、ソフトウェアテストにおけるAIエージェントの最も具体的な例であり、制御しやすいように3つの明確な役割（Planner・Generator・Healer）に分かれています。核心的な考えは「何をするか決める」ことを「コードを書く」ことと「壊れたテストを直す」ことから分離し、各段階で人間がレビューに介入できるようにすることです。この3役設計こそ、Playwrightが人間参加の原則を保ちながらAIをテストに取り込む方法です。",
    ),
    UL(
      [
        "Planner (người lập kế hoạch): khám phá ứng dụng, đọc yêu cầu và sinh ra một kế hoạch kiểm thử — danh sách kịch bản dạng Markdown để con người duyệt trước khi viết mã.",
        "Generator (người sinh mã): biến kế hoạch đã duyệt thành mã test Playwright thật, ưu tiên locator bền vững (role/label) và tự động chờ (auto-wait) thay vì sleep cứng.",
        "Healer (người chữa lành): khi test hỏng vì UI đổi, Healer chạy lại, chẩn đoán nguyên nhân, đề xuất sửa locator/bước và làm test xanh lại — giảm mạnh test flaky.",
      ],
      [
        "Planner: explores the app, reads requirements and produces a test plan — a Markdown list of scenarios for humans to approve before any code is written.",
        "Generator: turns the approved plan into real Playwright test code, favouring resilient locators (role/label) and auto-wait instead of hard sleeps.",
        "Healer: when a test breaks because the UI changed, the Healer reruns it, diagnoses the cause, proposes locator/step fixes and makes the test green again — sharply reducing flaky tests.",
      ],
      [
        "Planner（計画者）：アプリを探索し、要件を読み、テスト計画（コードを書く前に人間が承認するためのMarkdown形式のシナリオ一覧）を生成する。",
        "Generator（生成者）：承認された計画を実際のPlaywrightテストコードに変換し、ハードなsleepではなく堅牢なロケーター（role/label）と自動待機を優先する。",
        "Healer（修復者）：UI変更でテストが壊れたとき、再実行し、原因を診断し、ロケーター/手順の修正を提案して再びグリーンにする。フレーキーなテストを大幅に減らす。",
      ],
    ),
    CODE(
      "bash",
      `# Khởi tạo Playwright Agents trong dự án (mô phỏng vòng đời):
npx playwright init-agents

# 1) Planner: sinh kế hoạch test (Markdown) để CON NGƯỜI duyệt
#    -> specs/login.plan.md  (danh sách kịch bản, chưa có mã)

# 2) Generator: từ plan đã duyệt -> sinh mã test thật
#    -> tests/login.spec.ts   (dùng getByRole, auto-wait, expect)

# 3) Healer: khi CI đỏ vì UI đổi, tự chẩn đoán & đề xuất sửa locator
#    -> mở PR "fix: update login locators" cho tester review`,
    ),
    CODE(
      "typescript",
      `// Mã test do Generator sinh ra thường trông như thế này — oracle rõ ràng:
import { test, expect } from '@playwright/test';

test('đăng nhập hợp lệ đưa người dùng tới dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('qa@cybersoft.vn');
  await page.getByLabel('Mật khẩu').fill('Correct#123');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  // ORACLE: bất biến nghiệp vụ — đăng nhập đúng thì phải thấy dashboard
  await expect(page).toHaveURL(/\\/dashboard/);
  await expect(page.getByRole('heading', { name: 'Bảng điều khiển' })).toBeVisible();
});`,
    ),
    NOTE(
      "Ba vai Planner/Generator/Healer không chạy 'một phát ăn ngay'. Chúng tạo ra các sản phẩm trung gian (kế hoạch, mã, đề xuất sửa) để tester review ở từng chốt — đó là human-in-the-loop được đưa thẳng vào quy trình.",
      "The Planner/Generator/Healer roles do not run 'one-shot to done'. They produce intermediate artefacts (a plan, code, fix proposals) for the tester to review at each checkpoint — that is human-in-the-loop baked straight into the workflow.",
      "Planner/Generator/Healerの3役は「一発で完了」しません。中間成果物（計画、コード、修正提案）を生成し、テスターが各チェックポイントでレビューします。これがワークフローに直接組み込まれた人間参加です。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "5. MCP là gì trong kiểm thử? Cách agent kết nối với công cụ thật",
    en: "5. What is MCP in testing? How agents connect to real tools",
    ja: "5. テストにおけるMCPとは？エージェントが実ツールに接続する方法",
  },
  blocks: [
    P(
      "Một agent chỉ mạnh khi nó có công cụ tốt, và MCP (Model Context Protocol) là chuẩn mở giúp việc cắm công cụ vào agent trở nên nhất quán. Hãy hình dung MCP như 'cổng USB-C cho AI': thay vì mỗi công cụ (trình duyệt, database, hệ quản lý test) có một cách nói chuyện riêng, MCP định nghĩa một giao thức chung để agent khám phá và gọi công cụ. Trong kiểm thử phần mềm, điều này cực kỳ hữu ích: có Playwright MCP server cho phép agent điều khiển trình duyệt qua cây accessibility (thay vì đoán pixel), có MCP server đọc issue tracker, đọc log, hay truy vấn dữ liệu test.",
      "An agent is only as strong as its tools, and MCP (Model Context Protocol) is the open standard that makes plugging tools into an agent consistent. Think of MCP as the 'USB-C port for AI': instead of every tool (browser, database, test management system) speaking its own dialect, MCP defines a common protocol for an agent to discover and call tools. In software testing this is extremely useful: there is a Playwright MCP server that lets the agent drive the browser via the accessibility tree (instead of guessing pixels), and MCP servers to read the issue tracker, read logs, or query test data.",
      "エージェントはツールの良さ次第で強さが決まり、MCP（Model Context Protocol）はツールをエージェントに接続することを一貫させるオープン標準です。MCPを「AIのためのUSB-Cポート」と考えてください。各ツール（ブラウザ、データベース、テスト管理システム）が独自の方言を話す代わりに、MCPはエージェントがツールを発見し呼び出すための共通プロトコルを定義します。ソフトウェアテストではこれが非常に有用です。エージェントがアクセシビリティツリー経由で（ピクセルを推測せず）ブラウザを操作できるPlaywright MCPサーバーや、課題トラッカーの読み取り、ログ読み取り、テストデータ照会のためのMCPサーバーがあります。",
    ),
    P(
      "Vì sao điều này quan trọng với một tester? Vì nó quyết định chất lượng của kiểm thử tự động bằng AI. Khi agent điều khiển trình duyệt qua cây accessibility (role, label, tên phần tử) thay vì tọa độ điểm ảnh, test sinh ra ổn định hơn, ít phụ thuộc bố cục, và các assertion bám vào ý nghĩa chứ không bám vào vị trí. Nói cách khác, MCP tốt giúp agent 'nhìn' ứng dụng theo cách gần với người dùng thật và gần với tiêu chí accessibility — đúng tinh thần mà một tester giỏi vẫn theo đuổi.",
      "Why does this matter to a tester? Because it determines the quality of AI-driven automated testing. When the agent drives the browser via the accessibility tree (roles, labels, element names) instead of pixel coordinates, the generated tests are more stable, less layout-dependent, and the assertions bind to meaning rather than position. In other words, good MCP lets the agent 'see' the app the way a real user does and the way accessibility criteria demand — exactly the spirit a good tester already pursues.",
      "なぜこれがテスターにとって重要なのか？それはAI駆動の自動化テストの品質を決めるからです。エージェントがピクセル座標ではなくアクセシビリティツリー（ロール、ラベル、要素名）経由でブラウザを操作すると、生成されるテストはより安定し、レイアウト依存が減り、アサーションは位置ではなく意味に紐づきます。言い換えれば、良いMCPはエージェントが実際のユーザーのように、そしてアクセシビリティ基準が求めるようにアプリを「見る」ことを可能にします。まさに優れたテスターが追求してきた精神です。",
    ),
    CODE(
      "json",
      `// Cấu hình một agent dùng Playwright MCP server (rút gọn).
// Agent sẽ khám phá được các "tool" như browser_navigate, browser_click,
// browser_snapshot (chụp cây accessibility) — thao tác theo role/label.
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}`,
    ),
    QA(
      "MCP là gì trong kiểm thử?",
      "What is MCP in testing?",
      "MCP (Model Context Protocol) là một chuẩn mở giúp AI Agent kết nối tới công cụ thật theo một giao thức chung, ví như 'cổng USB-C cho AI'. Trong kiểm thử, Playwright MCP server cho phép agent điều khiển trình duyệt qua cây accessibility (role/label) thay vì tọa độ pixel, nhờ đó test sinh ra ổn định hơn và ít flaky hơn.",
      "MCP (Model Context Protocol) is an open standard that lets an AI agent connect to real tools through a common protocol, like a 'USB-C port for AI'. In testing, the Playwright MCP server lets the agent drive the browser via the accessibility tree (roles/labels) instead of pixel coordinates, so generated tests are more stable and less flaky.",
      "MCP（Model Context Protocol）は、AIエージェントが共通プロトコルを通じて実ツールに接続できるようにするオープン標準で、「AIのためのUSB-Cポート」のようなものです。テストでは、Playwright MCPサーバーによりエージェントがピクセル座標ではなくアクセシビリティツリー（ロール/ラベル）経由でブラウザを操作でき、生成されるテストはより安定しフレーキーが減ります。",
    ),
    QA(
      "Playwright Agents hoạt động thế nào?",
      "How do Playwright Agents work?",
      "Playwright Agents chia thành ba vai: Planner khám phá ứng dụng và sinh kế hoạch test (Markdown) để con người duyệt; Generator biến kế hoạch thành mã Playwright thật với locator bền và auto-wait; Healer tự chẩn đoán và sửa test hỏng khi UI đổi. Mỗi bước đều tạo sản phẩm trung gian để tester review, giữ đúng nguyên tắc human-in-the-loop.",
      "Playwright Agents split into three roles: the Planner explores the app and produces a test plan (Markdown) for humans to approve; the Generator turns the plan into real Playwright code with resilient locators and auto-wait; the Healer diagnoses and fixes broken tests when the UI changes. Each step produces an intermediate artefact for the tester to review, upholding the human-in-the-loop principle.",
      "Playwright Agentsは3つの役割に分かれます。Plannerはアプリを探索し、人間が承認するテスト計画（Markdown）を生成します。Generatorは計画を堅牢なロケーターと自動待機を備えた実際のPlaywrightコードに変換します。Healerはaで UI変更時に壊れたテストを診断・修正します。各ステップはテスターがレビューする中間成果物を生成し、人間参加の原則を守ります。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "6. Một tester/QA dùng AI Agent hằng ngày như thế nào?",
    en: "6. How does a tester/QA use AI agents day to day?",
    ja: "6. テスター/QAは日々どのようにAIエージェントを使うか？",
  },
  blocks: [
    P(
      "Về mặt thực hành, làm việc với AI Agent testing không phải là 'gõ một câu rồi phó mặc'. Một tester giỏi dùng agent theo vòng: giao nhiệm vụ rõ ràng, cung cấp ngữ cảnh (yêu cầu, oracle, dữ liệu mẫu), để agent chạy, rồi review kỹ. Cái quyết định chất lượng đầu ra không phải là 'câu lệnh ma thuật' mà là bạn mô tả oracle — tức 'thế nào là đúng' — rõ đến đâu. Đây chính là kỹ năng cốt lõi mà một khóa học kiểm thử nghiêm túc rèn cho bạn: tư duy test case và tư duy oracle, giờ được áp dụng để điều khiển agent.",
      "In practice, working with an AI testing agent is not 'type one line and walk away'. A good tester uses the agent in a loop: give a clear task, provide context (requirements, oracle, sample data), let the agent run, then review carefully. What decides output quality is not a 'magic prompt' but how clearly you describe the oracle — that is, 'what correct means'. This is precisely the core skill a serious testing course trains in you: test-case thinking and oracle thinking, now applied to steering an agent.",
      "実践では、AIテストエージェントと働くことは「一行入力して放置」ではありません。優れたテスターはループでエージェントを使います。明確なタスクを与え、文脈（要件、オラクル、サンプルデータ）を提供し、エージェントを実行させ、慎重にレビューします。出力品質を決めるのは「魔法のプロンプト」ではなく、オラクル（つまり「正しいとは何か」）をどれだけ明確に記述するかです。これはまさに本格的なテストコースが鍛える核心スキルです。テストケース思考とオラクル思考が、今やエージェント操縦に適用されます。",
    ),
    CODE(
      "text",
      `# Một "nhiệm vụ" tốt giao cho AI Agent (prompt có oracle rõ):

Mục tiêu: Kiểm thử luồng "đặt lại mật khẩu" trên https://staging.shop.vn
Ngữ cảnh:
  - Yêu cầu: link reset hết hạn sau 15 phút, chỉ dùng 1 lần.
  - Oracle (bất biến):
      * link còn hạn + chưa dùng  -> đặt mật khẩu mới thành công
      * link đã dùng               -> báo lỗi "link không hợp lệ"
      * link quá 15 phút           -> báo lỗi "link đã hết hạn"
Ràng buộc:
  - Dùng Playwright, locator theo role/label, KHÔNG dùng sleep cứng.
  - KHÔNG chạy trên môi trường production.
Đầu ra: tests/reset-password.spec.ts + báo cáo pass/fail để tôi review.`,
    ),
    TIP(
      "Quy tắc vàng khi điều khiển agent: mô tả OUTCOME (kết quả/oracle) chứ đừng mô tả từng cú click. Agent giỏi tự tìm ra bước; việc của bạn là định nghĩa 'đúng là gì' và 'không được làm gì'.",
      "Golden rule when steering an agent: describe the OUTCOME (result/oracle), not each click. A good agent works out the steps; your job is to define 'what is correct' and 'what must never happen'.",
      "エージェント操縦の黄金律：各クリックではなくOUTCOME（結果/オラクル）を記述すること。優れたエージェントは手順を自ら見つけます。あなたの仕事は「何が正しいか」と「絶対にしてはいけないこと」を定義することです。",
    ),
    QA(
      "Tester cần học gì để làm việc với AI Agent?",
      "What should a tester learn to work with AI agents?",
      "Tester cần vững nền tảng kiểm thử (thiết kế test case, tư duy oracle, phân tích rủi ro), thành thạo một framework automation như Playwright/Selenium, biết đọc và review mã, hiểu CI/CD, cộng thêm kỹ năng ra đề và kiểm định đầu ra của agent (prompting theo oracle, guardrails). Nền tảng càng chắc thì càng điều khiển agent hiệu quả — vì agent khuếch đại kỹ năng của bạn, cả điểm mạnh lẫn điểm yếu.",
      "A tester needs solid testing fundamentals (test-case design, oracle thinking, risk analysis), fluency in an automation framework like Playwright/Selenium, the ability to read and review code, an understanding of CI/CD, plus the skills to set tasks and verify an agent's output (oracle-based prompting, guardrails). The stronger your foundation, the more effectively you steer the agent — because an agent amplifies your skill, both strengths and weaknesses.",
      "テスターには確かなテスト基礎（テストケース設計、オラクル思考、リスク分析）、Playwright/Seleniumのような自動化フレームワークの習熟、コードを読みレビューする能力、CI/CDの理解、加えてエージェントの出力を課題設定・検証するスキル（オラクルベースのプロンプティング、ガードレール）が必要です。基礎が強いほどエージェントを効果的に操縦できます。エージェントはあなたのスキルの長所も短所も増幅するからです。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "7. Guardrails & human-in-the-loop: để agent an toàn và đáng tin",
    en: "7. Guardrails & human-in-the-loop: keeping the agent safe and trustworthy",
    ja: "7. ガードレールと人間参加：エージェントを安全で信頼できるものに保つ",
  },
  blocks: [
    P(
      "Một AI Agent có quyền hành động thì cũng có khả năng gây hại nếu không được rào chắn. Vì thế, kiểm thử tự động bằng AI đáng tin cậy luôn đi kèm guardrails — những giới hạn cứng mà agent không được vượt. Ví dụ: chỉ được chạy trên môi trường staging chứ không đụng production, không được xóa dữ liệu, có ngân sách bước và chi phí, và các thao tác nhạy cảm phải chờ con người bấm duyệt. Guardrails không phải là dấu hiệu 'AI còn yếu'; chúng là kỹ thuật chuẩn để dùng bất kỳ hệ tự chủ nào một cách chuyên nghiệp, giống như ta luôn tách môi trường test khỏi môi trường thật.",
      "An AI agent with permission to act can also cause harm if not fenced. Therefore trustworthy AI-driven automated testing always comes with guardrails — hard limits the agent must not cross. For example: run only on staging, never touch production; never delete data; enforce a step and cost budget; and require human approval for sensitive operations. Guardrails are not a sign that 'AI is still weak'; they are standard engineering for using any autonomous system professionally, just as we always separate test environments from real ones.",
      "行動する権限を持つAIエージェントは、柵で囲わなければ害を及ぼす可能性もあります。したがって、信頼できるAI駆動の自動化テストには常にガードレール（エージェントが越えてはならないハードな制限）が伴います。例えば、本番ではなくステージングでのみ実行する、データを削除しない、ステップとコストの予算を課す、機密操作には人間の承認を必須にする、などです。ガードレールは「AIがまだ弱い」印ではなく、いかなる自律システムもプロフェッショナルに使うための標準的な工学であり、テスト環境と本番環境を常に分離するのと同じです。",
    ),
    WARN(
      "Tuyệt đối không cấp cho agent quyền chạy tự do trên production hay quyền xóa dữ liệu thật. Một agent bị prompt sai hoặc hiểu nhầm có thể gây thiệt hại nhanh và hàng loạt. Luôn chạy trong sandbox/staging, cấp quyền tối thiểu, và đặt chốt duyệt cho thao tác không thể hoàn tác.",
      "Never grant the agent free rein on production or the right to delete real data. A mis-prompted or misunderstanding agent can cause fast, large-scale damage. Always run in a sandbox/staging, grant least privilege, and put an approval gate on irreversible operations.",
      "エージェントに本番での自由な実行権限や実データを削除する権限を絶対に与えないでください。誤ったプロンプトや誤解をしたエージェントは、速く大規模な損害を引き起こす可能性があります。常にサンドボックス/ステージングで実行し、最小権限を付与し、取り消せない操作には承認ゲートを設けてください。",
    ),
    CODE(
      "yaml",
      `# Ví dụ khai báo guardrails cho một AI testing agent (mô tả chính sách):
agent:
  name: qa-runner
  allowed_environments: [staging]        # KHÔNG có production
  denied_actions:
    - delete_database
    - modify_prod_config
  budgets:
    max_steps: 40                        # chặn vòng lặp vô tận
    max_cost_usd: 2.0
  require_human_approval:
    - open_pull_request                  # con người bấm duyệt PR test
    - run_destructive_data_setup
  network:
    allow: ["staging.example.com"]       # chặn gọi ra ngoài ngoài whitelist`,
    ),
    NOTE(
      "Human-in-the-loop nghĩa là con người nằm trong vòng lặp ra quyết định ở những điểm quan trọng: duyệt kế hoạch test, duyệt PR, xác nhận thao tác nguy hiểm. Đây là lý do agent làm nhanh nhưng vẫn an toàn: máy đề xuất, người quyết định.",
      "Human-in-the-loop means a human sits inside the decision loop at critical points: approving the test plan, approving the PR, confirming dangerous actions. This is why the agent is fast yet safe: the machine proposes, the human decides.",
      "人間参加（human-in-the-loop）とは、重要な地点で人間が意思決定ループの中にいることを意味します。テスト計画の承認、PRの承認、危険な操作の確認などです。これがエージェントが速くても安全な理由です。機械が提案し、人間が決定します。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "8. Kiểm thử tự động bằng AI có đáng tin không? Ảo giác & grounding",
    en: "8. Is AI-driven automated testing trustworthy? Hallucination & grounding",
    ja: "8. AI駆動の自動化テストは信頼できるか？ハルシネーションとグラウンディング",
  },
  blocks: [
    P(
      "Câu hỏi 'AI có đáng tin không' rất chính đáng, và câu trả lời trung thực là: đáng tin nếu bạn thiết kế quy trình đúng, không đáng tin nếu bạn giao hết cho nó. LLM có thể bịa ra thứ nghe hợp lý nhưng sai — hiện tượng gọi là ảo giác (hallucination). Trong testing, ảo giác nguy hiểm ở chỗ agent có thể viết một assertion trông đúng nhưng kiểm sai bất biến nghiệp vụ, hoặc 'khẳng định' một API trả về trường không tồn tại. Cách chống lại là grounding (neo vào sự thật): buộc agent làm việc trên dữ liệu và tài liệu thật — DOM thật, response API thật, đặc tả thật — thay vì suy đoán.",
      "The question 'is AI trustworthy' is fair, and the honest answer is: trustworthy if you design the process right, untrustworthy if you hand everything to it. LLMs can fabricate things that sound plausible but are wrong — a phenomenon called hallucination. In testing, hallucination is dangerous because an agent may write an assertion that looks right but checks the wrong business invariant, or 'assert' an API returns a non-existent field. The defence is grounding (anchoring to truth): forcing the agent to work on real data and documents — the real DOM, real API responses, the real spec — rather than guessing.",
      "「AIは信頼できるか」という問いは正当であり、正直な答えはこうです。プロセスを正しく設計すれば信頼でき、すべてを委ねれば信頼できません。LLMはもっともらしく聞こえるが誤ったことをでっち上げることがあります。これをハルシネーション（幻覚）と呼びます。テストにおいてハルシネーションが危険なのは、エージェントが正しく見えるが誤った業務不変条件を検証するアサーションを書いたり、存在しないフィールドをAPIが返すと「断言」したりするからです。防御策はグラウンディング（真実への固定）です。エージェントに推測ではなく実データと実文書（本物のDOM、本物のAPIレスポンス、本物の仕様）で作業させることです。",
    ),
    P(
      "Đây chính là nơi tư duy oracle-first phát huy tác dụng. Nếu bạn để tester định nghĩa oracle trước (bất biến nghiệp vụ phải luôn đúng), rồi mới để agent sinh test, bạn có một tấm lưới an toàn: kể cả khi agent hiểu nhầm chi tiết UI, các assertion neo vào oracle vẫn bắt được lỗi thật. Ngược lại, nếu để agent tự nghĩ luôn cả 'thế nào là đúng', bạn có nguy cơ test xanh giả — chạy qua nhưng không kiểm đúng thứ cần kiểm. Vì vậy, độ tin cậy của kiểm thử tự động bằng AI phụ thuộc vào con người ở khâu định nghĩa oracle và review, chứ không phải vào việc agent 'thông minh' đến đâu.",
      "This is exactly where oracle-first thinking pays off. If you let the tester define the oracle first (business invariants that must always hold), then let the agent generate tests, you get a safety net: even if the agent misreads a UI detail, assertions anchored to the oracle still catch real bugs. Conversely, if you let the agent decide 'what correct means' too, you risk false-green tests — passing but not checking what needs checking. So the reliability of AI-driven automated testing hinges on the human at the oracle-definition and review stages, not on how 'smart' the agent is.",
      "これこそオラクルファースト思考が効く場面です。テスターにまずオラクル（常に成り立つべき業務不変条件）を定義させ、それからエージェントにテストを生成させれば、安全網が得られます。エージェントがUIの詳細を読み違えても、オラクルに固定されたアサーションは本物のバグを捉えます。逆に、エージェントに「正しいとは何か」まで決めさせると、偽グリーンのテスト（通るが必要なものを検証していない）の危険があります。したがってAI駆動の自動化テストの信頼性は、エージェントがどれだけ「賢い」かではなく、オラクル定義とレビューの段階での人間に懸かっています。",
    ),
    QA(
      "Kiểm thử tự động bằng AI có đáng tin không?",
      "Is AI-driven automated testing trustworthy?",
      "Đáng tin khi có quy trình đúng: con người định nghĩa oracle trước, agent chỉ sinh và chạy test, mọi kết quả đều được review và có guardrails. LLM có thể ảo giác (bịa thông tin sai) nên phải grounding — neo agent vào DOM/API/đặc tả thật. Nếu giao hết cho AI mà không kiểm định, rủi ro test xanh giả rất cao; trách nhiệm cuối vẫn thuộc về tester.",
      "It is trustworthy with the right process: humans define the oracle first, the agent only generates and runs tests, and every result is reviewed under guardrails. LLMs can hallucinate (fabricate wrong info), so you must ground the agent in the real DOM/API/spec. If you hand everything to AI without verification, the risk of false-green tests is high; final responsibility still rests with the tester.",
      "正しいプロセスがあれば信頼できます。人間がまずオラクルを定義し、エージェントはテストの生成・実行のみを行い、すべての結果はガードレールの下でレビューされます。LLMはハルシネーション（誤情報の捏造）を起こし得るため、本物のDOM/API/仕様にグラウンディングする必要があります。検証せずにすべてをAIに委ねると偽グリーンのリスクが高く、最終責任はテスターにあります。",
    ),
    QA(
      "Ảo giác (hallucination) trong AI testing là gì và chống thế nào?",
      "What is hallucination in AI testing and how do you prevent it?",
      "Ảo giác là khi LLM tạo ra nội dung nghe hợp lý nhưng sai — ví dụ agent viết assertion kiểm nhầm bất biến hoặc bịa ra trường API không tồn tại. Cách chống chính là grounding: buộc agent làm việc trên dữ liệu thật (DOM, response, đặc tả) và định nghĩa oracle trước, cộng với review của con người để bắt các assertion sai.",
      "Hallucination is when an LLM produces plausible-sounding but wrong content — e.g., the agent writes an assertion that checks the wrong invariant or invents a non-existent API field. The main defence is grounding: forcing the agent to work on real data (DOM, responses, spec) and defining the oracle first, plus human review to catch wrong assertions.",
      "ハルシネーションとは、LLMがもっともらしいが誤った内容を生成することです。例えばエージェントが誤った不変条件を検証するアサーションを書いたり、存在しないAPIフィールドを捏造したりします。主な防御はグラウンディングです。エージェントに実データ（DOM、レスポンス、仕様）で作業させ、まずオラクルを定義し、加えて人間のレビューで誤ったアサーションを捉えます。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "9. Kỹ năng của một tester hiện đại trong kỷ nguyên AI",
    en: "9. Skills of a modern tester in the AI era",
    ja: "9. AI時代の現代テスターのスキル",
  },
  blocks: [
    P(
      "Khi AI trong testing gánh phần cơ khí, thị trường không cần ít tester hơn mà cần tester có tư duy cao hơn. Một tester hiện đại vẫn phải vững những nền tảng bất biến: phân tích yêu cầu, thiết kế test case theo kỹ thuật (phân vùng tương đương, giá trị biên, bảng quyết định), tư duy oracle, và hiểu rủi ro để biết cái gì đáng test. Trên nền đó, họ thêm ba lớp kỹ năng mới: điều khiển agent (ra đề theo oracle, đặt guardrails), review đầu ra của AI (đọc code, phát hiện test xanh giả, bắt ảo giác), và hiểu kiến trúc automation đủ để tin cậy hay bác bỏ những gì agent đề xuất.",
      "When AI in testing takes over the mechanical part, the market does not need fewer testers but testers with higher-level thinking. A modern tester must still master the timeless fundamentals: requirements analysis, technique-based test-case design (equivalence partitioning, boundary values, decision tables), oracle thinking, and risk awareness to know what is worth testing. On top of that, they add three new skill layers: steering agents (oracle-based tasking, setting guardrails), reviewing AI output (reading code, spotting false-green tests, catching hallucinations), and understanding automation architecture well enough to trust or reject what the agent proposes.",
      "AIテストが機械的な部分を引き受けると、市場はより少ないテスターではなく、より高次の思考を持つテスターを必要とします。現代のテスターは依然として不変の基礎を習得しなければなりません。要件分析、技法ベースのテストケース設計（同値分割、境界値、デシジョンテーブル）、オラクル思考、そして何をテストする価値があるかを知るためのリスク認識です。その上に3つの新しいスキル層を加えます。エージェント操縦（オラクルベースのタスク設定、ガードレール設定）、AI出力のレビュー（コード読解、偽グリーンの発見、ハルシネーションの捕捉）、そしてエージェントの提案を信頼または却下できるだけの自動化アーキテクチャの理解です。",
    ),
    IMG(
      `<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial"><rect width="640" height="280" rx="14" fill="#0f172a"/><text x="24" y="34" fill="#f1f5f9" font-size="17" font-weight="800">Kim tự tháp kỹ năng tester thời AI</text><polygon points="320,54 96,244 544,244" fill="#111827" stroke="#334155"/><line x1="180" y1="180" x2="460" y2="180" stroke="#334155"/><line x1="240" y1="117" x2="400" y2="117" stroke="#334155"/><text x="320" y="98" fill="#f472b6" font-size="13" font-weight="700" text-anchor="middle">Điều khiển &amp; review AI</text><text x="320" y="152" fill="#7dd3fc" font-size="13" font-weight="700" text-anchor="middle">Automation (Playwright/Selenium/API)</text><text x="320" y="214" fill="#34d399" font-size="13" font-weight="700" text-anchor="middle">Nền tảng: test case · oracle · rủi ro</text><text x="320" y="234" fill="#94a3b8" font-size="11" text-anchor="middle">(càng lên cao càng cần tư duy con người)</text></svg>`,
      "Kim tự tháp kỹ năng: nền tảng kiểm thử là gốc, automation ở giữa, điều khiển & review AI ở đỉnh.",
      "Skill pyramid: testing fundamentals at the base, automation in the middle, steering & reviewing AI at the top.",
      "スキルピラミッド：土台にテスト基礎、中間に自動化、頂点にAIの操縦とレビュー。",
    ),
    QA(
      "Người mới có học AI testing được không?",
      "Can beginners learn AI testing?",
      "Hoàn toàn được, nhưng nên đi đúng thứ tự. Người mới nên bắt đầu từ nền tảng kiểm thử thủ công và tư duy test case, sau đó học automation với Playwright/Selenium, rồi mới thêm lớp AI Agent. Học AI mà thiếu nền tảng sẽ khó review được đầu ra của agent; ngược lại, có nền tảng rồi thì việc tiếp thu AI testing khá nhanh và tự nhiên.",
      "Absolutely, but follow the right order. Beginners should start from manual testing fundamentals and test-case thinking, then learn automation with Playwright/Selenium, and only then add the AI agent layer. Learning AI without fundamentals makes it hard to review the agent's output; with a foundation, picking up AI testing is fairly fast and natural.",
      "全く問題ありませんが、正しい順序で進めるべきです。初心者はまず手動テストの基礎とテストケース思考から始め、次にPlaywright/Seleniumで自動化を学び、それからAIエージェント層を加えるべきです。基礎なしでAIを学ぶとエージェントの出力をレビューするのが難しくなります。基礎があればAIテストの習得はかなり速く自然です。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "10. Liệu AI có thay thế tester? Tác động nghề nghiệp thật sự",
    en: "10. Will AI replace testers? The real career impact",
    ja: "10. AIはテスターを置き換えるか？本当のキャリアへの影響",
  },
  blocks: [
    P(
      "Đây có lẽ là câu hỏi được tìm kiếm nhiều nhất: liệu AI có thay thế tester không? Câu trả lời dựa trên bằng chứng thực tế là: AI không thay thế tester, nhưng tester biết dùng AI sẽ thay thế tester không biết dùng. AI Agent rất giỏi phần lặp lại — sinh test, sửa selector, chạy regression — nhưng lại yếu ở đúng những thứ định nghĩa một tester giỏi: hiểu ngữ cảnh nghiệp vụ, phán đoán rủi ro, đặt câu hỏi 'điều gì có thể sai mà chưa ai nghĩ tới', và chịu trách nhiệm cho chất lượng sản phẩm giao cho người dùng thật. Những việc đó cần trách nhiệm và phán đoán của con người — thứ mà máy không gánh thay được.",
      "This is perhaps the most searched question: will AI replace testers? The evidence-based answer is: AI will not replace testers, but testers who use AI will replace testers who do not. AI agents are great at the repetitive part — generating tests, fixing selectors, running regression — but weak at exactly what defines a good tester: understanding business context, judging risk, asking 'what could go wrong that nobody has thought of', and owning the quality of a product shipped to real users. Those require human responsibility and judgement — something a machine cannot carry for you.",
      "これはおそらく最も検索される質問です。AIはテスターを置き換えるのか？証拠に基づく答えはこうです。AIはテスターを置き換えませんが、AIを使うテスターは使わないテスターを置き換えます。AIエージェントは反復部分（テスト生成、セレクター修正、回帰実行）は得意ですが、優れたテスターを定義するもの（業務文脈の理解、リスク判断、「誰も考えていない何が失敗し得るか」という問い、実ユーザーに出荷される製品品質への責任）はまさに苦手です。それらには人間の責任と判断が必要であり、機械が代わりに担うことはできません。",
    ),
    SCEN(
      "Hai tester, một tương lai khác nhau",
      "Two testers, two different futures",
      "Tester A xem AI là mối đe dọa và né tránh, tiếp tục viết tay từng selector; năng suất của bạn ấy đứng yên trong khi kỳ vọng tăng. Tester B xem AI Agent là bội số năng lực: bạn ấy giao phần cơ khí cho agent, dành thời gian cho phân tích rủi ro, thiết kế oracle sắc bén và mở rộng độ phủ test lên nhiều lần. Sau một năm, B kiểm nhiều hệ thống hơn, bắt được lỗi sâu hơn, và trở thành người mà cả đội tin để review đầu ra của AI. Khác biệt không nằm ở AI, mà ở việc ai chịu học cách dùng nó.",
      "Tester A sees AI as a threat and avoids it, keeps hand-writing every selector; their productivity stalls while expectations rise. Tester B sees the AI agent as a capability multiplier: they offload the mechanical part to the agent and spend time on risk analysis, sharp oracle design, and expanding test coverage many times over. After a year, B tests more systems, catches deeper bugs, and becomes the person the whole team trusts to review AI output. The difference is not the AI, but who chose to learn how to use it.",
      "テスターAはAIを脅威と見て避け、すべてのセレクターを手書きし続けます。期待が高まる中、生産性は停滞します。テスターBはAIエージェントを能力の倍率器と見なし、機械的な部分をエージェントに任せ、リスク分析、鋭いオラクル設計、テストカバレッジの何倍もの拡大に時間を使います。1年後、Bはより多くのシステムをテストし、より深いバグを捉え、チーム全体がAI出力のレビューを信頼する人物になります。違いはAIではなく、誰がその使い方を学ぶことを選んだかです。",
    ),
    QA(
      "AI có thay thế tester không?",
      "Will AI replace testers?",
      "Không. AI Agent thay thế phần việc lặp lại (sinh test, sửa selector, chạy regression) chứ không thay thế phán đoán, hiểu nghiệp vụ và trách nhiệm chất lượng của tester. Thực tế đúng hơn là: tester biết dùng AI sẽ có lợi thế lớn so với tester không biết dùng, nên hướng đi khôn ngoan là học cách điều khiển và kiểm định AI thay vì né tránh nó.",
      "No. AI agents replace the repetitive work (generating tests, fixing selectors, running regression), not the judgement, business understanding and quality ownership of a tester. The truer reality is: testers who use AI gain a big edge over those who do not, so the smart move is to learn to steer and verify AI rather than avoid it.",
      "いいえ。AIエージェントは反復作業（テスト生成、セレクター修正、回帰実行）を置き換えますが、テスターの判断、業務理解、品質への責任は置き換えません。より正確な現実はこうです。AIを使うテスターは使わないテスターに対して大きな優位を得るため、賢明な動きはAIを避けることではなく操縦・検証を学ぶことです。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "11. Học AI Testing ở đâu và theo lộ trình nào?",
    en: "11. Where and how to learn AI testing (the learning path)",
    ja: "11. AIテストをどこでどう学ぶか（学習パス）",
  },
  blocks: [
    P(
      "Nếu bạn muốn học tester bài bản và tiến tới AI testing, hãy đi theo một lộ trình có thứ tự thay vì nhảy thẳng vào công cụ thời thượng. Lộ trình hiệu quả nhất là: (1) nền tảng kiểm thử thủ công và tư duy test case; (2) automation với Playwright/Selenium để làm chủ kiểm thử tự động; (3) kiểm thử API để hiểu backend; (4) AI testing — điều khiển agent, MCP, guardrails trên nền đã vững; (5) ISTQB để chuẩn hóa kiến thức; và (6) luyện phỏng vấn để sẵn sàng đi làm. Đây đúng là lộ trình mà khóa học kiểm thử tại CyberSoft Tester được thiết kế theo, giúp bạn không học lệch và có portfolio thực chiến.",
      "If you want to learn testing properly and progress toward AI testing, follow an ordered path instead of jumping straight to the trendy tool. The most effective path is: (1) manual testing fundamentals and test-case thinking; (2) automation with Playwright/Selenium to master automated testing; (3) API testing to understand the backend; (4) AI testing — steering agents, MCP, guardrails on a solid base; (5) ISTQB to standardise your knowledge; and (6) interview practice to be job-ready. This is exactly the path the testing course at CyberSoft Tester is designed around, so you learn in balance and build a real-world portfolio.",
      "テストを正しく学び、AIテストへ進みたいなら、流行のツールに直行するのではなく、順序立てたパスに従ってください。最も効果的なパスは、(1)手動テストの基礎とテストケース思考、(2)自動化テストを習得するためのPlaywright/Seleniumによる自動化、(3)バックエンドを理解するためのAPIテスト、(4)確かな土台の上でのAIテスト（エージェント操縦、MCP、ガードレール）、(5)知識を標準化するISTQB、(6)就職準備のための面接練習、です。これはまさにCyberSoft Testerのテストコースが設計されているパスであり、偏りなく学び、実戦的なポートフォリオを構築できます。",
    ),
    CODE(
      "text",
      `LỘ TRÌNH HỌC TESTER -> AI TESTING (khuyến nghị)

  [1] Manual testing      -> test case, oracle, rủi ro, quản lý lỗi
        |
  [2] Automation          -> Playwright / Selenium (POM, auto-wait)
        |
  [3] API testing         -> Postman/REST, hiểu backend & dữ liệu
        |
  [4] AI testing          -> điều khiển AI Agent, MCP, guardrails
        |
  [5] ISTQB               -> chuẩn hóa & củng cố lý thuyết
        |
  [6] Interview prep      -> luyện phỏng vấn, hoàn thiện portfolio

  Nguyên tắc: mỗi bậc là NỀN cho bậc sau. Vững [1]-[3] thì [4] rất nhanh.`,
    ),
    TIP(
      "Đừng bỏ qua nền tảng để chạy theo AI. AI Agent khuếch đại kỹ năng bạn có; nếu bạn chưa biết thế nào là một test case tốt hay một oracle đúng, agent cũng không cứu được bạn. Ở CyberSoft Tester, bạn học AI testing thực chiến trên nền manual/automation/API đã vững, nên khi thêm agent vào là dùng được ngay.",
      "Do not skip fundamentals to chase AI. An AI agent amplifies the skills you have; if you do not yet know what a good test case or a correct oracle is, the agent will not save you. At CyberSoft Tester you learn hands-on AI testing on top of solid manual/automation/API foundations, so adding an agent becomes immediately usable.",
      "AIを追って基礎を飛ばさないでください。AIエージェントはあなたの持つスキルを増幅します。良いテストケースや正しいオラクルとは何かをまだ知らなければ、エージェントも救ってくれません。CyberSoft Testerでは、確かな手動/自動化/APIの土台の上で実戦的なAIテストを学ぶため、エージェントを加えればすぐに使えるようになります。",
    ),
    QA(
      "Học AI Testing ở đâu tốt cho người Việt?",
      "Where is a good place to learn AI testing?",
      "Bạn nên chọn nơi dạy AI testing trên nền tảng vững chứ không chỉ dạy mẹo dùng công cụ. CyberSoft Tester xây dựng lộ trình bài bản manual → automation (Playwright/Selenium) → API → AI testing → ISTQB → phỏng vấn, có dự án thực chiến và mentor, nên phù hợp cho cả người mới lẫn người muốn nâng cấp lên AI Agent testing. Điều quan trọng là học kèm nền tảng để bạn đủ sức review và kiểm định đầu ra của agent.",
      "Choose a place that teaches AI testing on solid fundamentals, not just tool tips. CyberSoft Tester offers a structured path — manual → automation (Playwright/Selenium) → API → AI testing → ISTQB → interview — with real-world projects and mentors, suitable for both beginners and those upgrading to AI agent testing. The key is to learn the fundamentals alongside so you can review and verify the agent's output.",
      "ツールのコツだけでなく、確かな基礎の上でAIテストを教える場所を選んでください。CyberSoft Testerは体系的なパス（手動→自動化（Playwright/Selenium）→API→AIテスト→ISTQB→面接）を、実戦プロジェクトとメンター付きで提供し、初心者にもAIエージェントテストへ上げたい人にも適しています。重要なのは、エージェントの出力をレビュー・検証できるよう基礎も併せて学ぶことです。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "12. Câu hỏi thường gặp (FAQ) về AI Agent trong kiểm thử",
    en: "12. Frequently asked questions (FAQ) about AI agents in testing",
    ja: "12. テストにおけるAIエージェントに関するよくある質問（FAQ）",
  },
  blocks: [
    P(
      "Phần này gom những câu hỏi mà tester và người học thật sự hay gõ lên Google về AI Agent testing. Các câu trả lời được viết ngắn gọn, tự đủ nghĩa và chính xác để bạn tra nhanh, đồng thời để các công cụ tìm kiếm và AI Overview trích dẫn đúng.",
      "This section collects the questions testers and learners actually type into Google about AI agent testing. The answers are written concise, self-contained and accurate so you can look them up quickly, and so search engines and AI Overviews can quote them correctly.",
      "このセクションは、テスターや学習者がAIエージェントテストについて実際にGoogleに入力する質問を集めています。回答は簡潔で自己完結的かつ正確に書かれており、素早く調べられ、検索エンジンやAI Overviewが正しく引用できます。",
    ),
    QA(
      "AI Agent testing khác automation testing truyền thống thế nào?",
      "How is AI agent testing different from traditional automation testing?",
      "Automation testing truyền thống chạy các script do con người viết sẵn theo đúng kịch bản cố định. AI Agent testing thêm một lớp tự chủ: agent tự khám phá ứng dụng, tự sinh và bảo trì test, tự sửa khi UI đổi. Automation vẫn là nền — agent thường sinh ra chính mã Playwright/Selenium đó, nhưng giảm mạnh công cơ khí của con người.",
      "Traditional automation testing runs human-written scripts along fixed scenarios. AI agent testing adds an autonomy layer: the agent explores the app, generates and maintains tests, and self-heals when the UI changes. Automation is still the base — the agent often generates that very Playwright/Selenium code — but it sharply reduces the human's mechanical effort.",
      "従来の自動化テストは、人間が書いたスクリプトを固定シナリオに沿って実行します。AIエージェントテストは自律層を加えます。エージェントはアプリを探索し、テストを生成・保守し、UI変更時に自己修復します。自動化は依然として土台であり、エージェントはまさにそのPlaywright/Seleniumコードを生成することが多いですが、人間の機械的労力を大幅に減らします。",
    ),
    QA(
      "Agent có tự chạy trên production không?",
      "Does an agent run on production by itself?",
      "Không nên và không được, trừ khi có guardrails cực chặt và chốt duyệt của con người. Thực hành chuẩn là chạy agent trên staging/sandbox với quyền tối thiểu, chặn thao tác hủy hoại và bắt buộc con người duyệt trước mọi hành động không thể hoàn tác. Đây là nguyên tắc an toàn cơ bản khi dùng bất kỳ hệ tự chủ nào.",
      "It should not and must not, unless there are very strict guardrails and human approval gates. Standard practice is to run the agent on staging/sandbox with least privilege, block destructive actions, and require human approval before any irreversible action. This is a basic safety principle for using any autonomous system.",
      "非常に厳格なガードレールと人間の承認ゲートがない限り、すべきでなく、してはいけません。標準的な実践は、最小権限でステージング/サンドボックスでエージェントを実行し、破壊的操作をブロックし、取り消せない操作の前に人間の承認を必須にすることです。これはいかなる自律システムを使う際の基本的な安全原則です。",
    ),
    QA(
      "Tôi có cần biết lập trình để làm AI testing không?",
      "Do I need to know programming to do AI testing?",
      "Bạn cần biết đọc và review mã, và biết một ngôn ngữ ở mức đủ dùng (thường là JavaScript/TypeScript cho Playwright hoặc Python). Bạn không cần là lập trình viên chuyên sâu, nhưng vì agent sinh ra code test, bạn phải đủ trình để review, sửa và không bị agent 'qua mặt'. Kỹ năng đọc code là ranh giới giữa dùng AI có kiểm soát và dùng AI một cách mù quáng.",
      "You need to read and review code, and know a language well enough to use it (usually JavaScript/TypeScript for Playwright or Python). You do not need to be a deep software engineer, but since the agent generates test code, you must be capable enough to review, fix, and not be fooled by the agent. Code-reading skill is the line between controlled AI use and blind AI use.",
      "コードを読みレビューし、使える程度に言語を知る必要があります（Playwrightなら通常JavaScript/TypeScript、またはPython）。深いソフトウェアエンジニアである必要はありませんが、エージェントがテストコードを生成するため、レビュー・修正でき、エージェントに欺かれない程度の力が必要です。コード読解スキルは、制御されたAI利用と盲目的なAI利用の境界線です。",
    ),
    QA(
      "AI Agent có giúp giảm test flaky không?",
      "Do AI agents help reduce flaky tests?",
      "Có, khi được dùng đúng. Agent như Playwright Healer chẩn đoán nguyên nhân test hỏng và đề xuất locator bền hơn, cộng với việc ưu tiên auto-wait thay vì sleep cứng giúp giảm flaky. Tuy nhiên agent không thay thế nguyên tắc viết test tốt — locator theo role/label, đảm bảo tính idempotent và độc lập giữa các test vẫn là trách nhiệm của tester.",
      "Yes, when used well. Agents like the Playwright Healer diagnose the cause of broken tests and propose more resilient locators, and favouring auto-wait over hard sleeps reduces flakiness. However, an agent does not replace good test-writing principles — role/label locators, idempotency, and independence between tests remain the tester's responsibility.",
      "はい、正しく使えば。Playwright Healerのようなエージェントは壊れたテストの原因を診断しより堅牢なロケーターを提案し、ハードなsleepより自動待機を優先することでフレーキーを減らします。ただしエージェントは良いテスト作成の原則を置き換えません。role/labelロケーター、冪等性、テスト間の独立性は依然としてテスターの責任です。",
    ),
  ],
});

pagesA.push({
  heading: {
    vi: "13. Kết luận: AI Agent là đồng đội, tester vẫn cầm lái",
    en: "13. Conclusion: the AI agent is a teammate, the tester still drives",
    ja: "13. 結論：AIエージェントは仲間、テスターが依然として運転する",
  },
  blocks: [
    P(
      "AI Agent trong kiểm thử phần mềm không phải là một cơn sóng cuốn tester đi, mà là một công cụ khuếch đại nếu bạn biết cầm lái. Chúng ta đã đi qua toàn cảnh: định nghĩa AI Agent và điểm khác chatbot, cách Playwright Agents với Planner/Generator/Healer và MCP đưa AI vào automation testing, cách một tester dùng agent hằng ngày với oracle và guardrails, cách chống ảo giác bằng grounding, và tác động nghề nghiệp thật sự. Sợi chỉ xuyên suốt rất rõ: máy gánh phần lặp lại, con người giữ phần phán đoán và trách nhiệm. Đó là lý do vai trò của tester không mất đi mà được nâng cấp.",
      "The AI agent in software testing is not a wave that sweeps testers away, but an amplifying tool if you know how to drive it. We have covered the whole picture: what an AI agent is and how it differs from a chatbot, how Playwright Agents with Planner/Generator/Healer and MCP bring AI into automation testing, how a tester uses an agent day to day with oracles and guardrails, how to fight hallucination with grounding, and the real career impact. The through-line is clear: machines carry the repetitive part, humans keep the judgement and responsibility. That is why the tester's role is not lost but upgraded.",
      "ソフトウェアテストにおけるAIエージェントは、テスターを押し流す波ではなく、運転の仕方を知っていれば増幅する道具です。全体像を見てきました。AIエージェントとは何か、チャットボットとどう違うか、Planner/Generator/HealerとMCPを備えたPlaywright Agentsがどうやってautomation testingにAIを取り込むか、テスターがオラクルとガードレールで日々エージェントをどう使うか、グラウンディングでハルシネーションとどう戦うか、そして本当のキャリアへの影響です。一貫した筋は明確です。機械が反復部分を担い、人間が判断と責任を保つ。だからこそテスターの役割は失われず、格上げされるのです。",
    ),
    P(
      "Nếu bạn rút ra một điều duy nhất từ bài viết này, hãy để nó là câu này: hãy đầu tư vào nền tảng và tư duy oracle, rồi dùng AI Agent để đi nhanh và xa hơn. Bắt đầu học tester từ những viên gạch cơ bản, luyện automation testing với Playwright, rồi thêm lớp AI khi đã đủ vững để kiểm định được đầu ra của máy. Con đường đó có thể đi một mình, nhưng đi cùng một lộ trình bài bản và mentor tại CyberSoft Tester sẽ nhanh và chắc hơn — và bạn sẽ trở thành đúng loại tester mà AI không thay thế được, mà còn cần đến.",
      "If you take one thing from this article, let it be this: invest in fundamentals and oracle thinking, then use the AI agent to go faster and further. Start learning testing from the basic bricks, practise automation testing with Playwright, then add the AI layer once you are solid enough to verify what the machine produces. You can walk that road alone, but walking it with a structured path and mentors at CyberSoft Tester is faster and surer — and you will become exactly the kind of tester AI cannot replace but instead depends on.",
      "この記事から一つだけ持ち帰るなら、これにしてください。基礎とオラクル思考に投資し、それからAIエージェントを使ってより速く遠くへ行くこと。基本のレンガからテストを学び始め、Playwrightで自動化テストを練習し、機械が生み出すものを検証できるほど確かになったらAI層を加えます。その道は一人でも歩めますが、CyberSoft Testerの体系的なパスとメンターと共に歩めばより速く確実です。そしてあなたは、AIが置き換えられず、むしろ頼りにする、まさにそのようなテスターになるでしょう。",
    ),
    NOTE(
      "Tóm tắt một dòng: AI Agent testing = LLM + công cụ + vòng lặp tự chủ, dùng để gánh việc lặp lại trong kiểm thử phần mềm; tester giỏi định nghĩa oracle, đặt guardrails và review — đó là giá trị mà AI không thay thế được.",
      "One-line summary: AI agent testing = LLM + tools + an autonomous loop, used to carry the repetitive work in software testing; a good tester defines the oracle, sets guardrails and reviews — that is the value AI cannot replace.",
      "一行要約：AIエージェントテスト＝LLM＋ツール＋自律ループで、ソフトウェアテストの反復作業を担う。優れたテスターはオラクルを定義し、ガードレールを設定し、レビューする。それがAIに置き換えられない価値である。",
    ),
  ],
});

export const AIAGENT_11 = [
  {
    categorySlug: "ai-agent-testing",
    slug: "aia-ai-agent-testing-guide-for-testers",
    cover: coverA,
    tags: tags("congnghe", "saas", "aitesting", "foundation", "realworld", "interview"),
    title: {
      vi: "AI Agent trong Kiểm thử phần mềm: Hướng dẫn toàn diện cho Tester/QA",
      en: "AI Agents in Software Testing: A Complete Guide for Testers/QA",
      ja: "ソフトウェアテストにおけるAIエージェント：テスター/QAのための完全ガイド",
    },
    summary: {
      vi: "AI Agent trong kiểm thử phần mềm là gì? Hướng dẫn toàn diện cho Tester/QA: Playwright Agents, MCP, automation testing, guardrails và lộ trình học AI Testing thực chiến tại CyberSoft Tester.",
      en: "What is an AI agent in software testing? A complete guide for testers/QA: Playwright Agents, MCP, automation testing, guardrails, and a hands-on AI Testing learning path at CyberSoft Tester.",
      ja: "ソフトウェアテストにおけるAIエージェントとは？テスター/QAのための完全ガイド：Playwright Agents、MCP、自動化テスト、ガードレール、そしてCyberSoft Testerでの実戦的なAIテスト学習パス。",
    },
    pages: buildDoc(pagesA),
  },
];
