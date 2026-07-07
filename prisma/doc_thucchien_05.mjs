// doc_thucchien_05.mjs — 4 bài thucchien: EdTech(exam), Travel(booking), Gaming(economy), Banking(fraud).
import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";

// ============================================================================================
// BÀI 1: EdTech — Thi trực tuyến, chấm điểm tự động, giám sát & chống gian lận (proctoring)
// ============================================================================================

const cover1 = makeThumb({ id: "edu-exam-01", domain: "edtech", kind: "thucchien", label: "実戦 · ONLINE EXAM" });

const svg1Arch = `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="280" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc thi trực tuyến · Online exam architecture</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="75" y="78" text-anchor="middle">Exam Client (Web)</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="215" y="72" text-anchor="middle">Session Gateway</text><text x="215" y="86" text-anchor="middle">(WebSocket)</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="355" y="72" text-anchor="middle">Exam Engine</text><text x="355" y="86" text-anchor="middle">(timer/state)</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="495" y="72" text-anchor="middle">Proctoring AI</text><text x="495" y="86" text-anchor="middle">(camera/tab)</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="635" y="72" text-anchor="middle">Grading</text><text x="635" y="86" text-anchor="middle">Service</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440 M550 73 H580" stroke="#94a3b8" stroke-width="2" marker-end="url(#a1)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="215" y="152" text-anchor="middle">Answer Store</text><text x="215" y="166" text-anchor="middle">(append-only)</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="355" y="152" text-anchor="middle">Device/IP</text><text x="355" y="166" text-anchor="middle">Fingerprint</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="495" y="152" text-anchor="middle">Incident</text><text x="495" y="166" text-anchor="middle">Queue</text>
<rect x="580" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="635" y="152" text-anchor="middle">Score Ledger</text><text x="635" y="166" text-anchor="middle">(barem map)</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130 M635 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="220" y="210" width="300" height="42" rx="8" fill="#052e2b" stroke="#34d399"/><text x="370" y="236" text-anchor="middle" fill="#6ee7b7">Bất biến: mỗi câu trả lời chỉ 1 trạng thái cuối, không mất bài nộp</text>
</g>
<defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg1Matrix = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca thi trực tuyến · Online exam case matrix</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="44" width="700" height="30" fill="#1e293b"/>
<text x="30" y="64">Ca</text><text x="160" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#0b1222"/><text x="30" y="94">TC-01 Nộp bài đúng hạn</text><text x="160" y="94">Nộp trước khi hết giờ</text><text x="420" y="94">Điểm = Σ(đáp án × barem), status=SUBMITTED</text><text x="620" y="94" fill="#34d399">TB</text>
<rect x="20" y="104" width="700" height="30" fill="#0b1222"/><text x="30" y="124">TC-02 Mất mạng giữa chừng</text><text x="160" y="124">Rớt mạng 30s rồi nối lại</text><text x="420" y="124">Khôi phục đúng câu đã lưu, không mất đáp án</text><text x="620" y="124" fill="#ef4444">Rất cao</text>
<rect x="20" y="134" width="700" height="30" fill="#0b1222"/><text x="30" y="154">TC-03 Chuyển tab &gt; ngưỡng</text><text x="160" y="154">Rời tab 3 lần, mỗi lần &gt;5s</text><text x="420" y="154">Sinh incident, không tự huỷ bài</text><text x="620" y="154" fill="#f59e0b">Cao</text>
<rect x="20" y="164" width="700" height="30" fill="#0b1222"/><text x="30" y="184">TC-04 Đăng nhập 2 thiết bị</text><text x="160" y="184">Cùng tài khoản, IP khác nhau</text><text x="420" y="184">Phiên thứ 2 bị khoá hoặc gắn cờ gian lận</text><text x="620" y="184" fill="#ef4444">Rất cao</text>
<rect x="20" y="194" width="700" height="30" fill="#0b1222"/><text x="30" y="214">TC-05 Nộp đúng lúc hết giờ</text><text x="160" y="214">Request nộp tới server ở giây 0</text><text x="420" y="214">Chấp nhận nếu request đến trước deadline server</text><text x="620" y="214" fill="#f59e0b">Cao</text>
<rect x="20" y="224" width="700" height="30" fill="#0b1222"/><text x="30" y="244">TC-06 Trùng đáp án gửi 2 lần</text><text x="160" y="244">Client gửi lại do retry mạng</text><text x="420" y="244">Idempotent — chỉ 1 bản ghi đáp án cuối</text><text x="620" y="244" fill="#f59e0b">Cao</text>
<rect x="20" y="254" width="700" height="30" fill="#0b1222"/><text x="30" y="274">TC-07 Chấm câu tự luận có AI hỗ trợ</text><text x="160" y="274">Câu mở, chấm bán tự động</text><text x="420" y="274">Điểm AI đề xuất + người duyệt trước khi khoá điểm</text><text x="620" y="274" fill="#34d399">TB</text>
<rect x="20" y="284" width="700" height="30" fill="#0b1222"/><text x="30" y="304">TC-08 Camera bị che/mất tín hiệu</text><text x="160" y="304">Webcam bị che 20 giây</text><text x="420" y="304">Cảnh báo thí sinh + ghi incident, không auto-fail</text><text x="620" y="304" fill="#f59e0b">Cao</text>
</g>
</svg>`;

const pages1 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một nền tảng EdTech phục vụ luyện thi chứng chỉ nghề (IT, kế toán, ngoại ngữ) tổ chức trung bình 12.000 lượt thi trực tuyến mỗi ngày, riêng mùa cao điểm cuối kỳ có thể lên tới 90.000 lượt trong một tuần. Mỗi kỳ thi có thời lượng cố định (45–180 phút), ngân hàng câu hỏi được rút ngẫu nhiên theo ma trận độ khó, và kết quả ảnh hưởng trực tiếp đến việc cấp chứng chỉ hành nghề — nghĩa là sai sót trong chấm điểm hoặc bỏ lọt gian lận có thể dẫn đến hậu quả pháp lý và uy tín nghiêm trọng. Một nền tảng tương tự từng bị cơ quan chủ quản đình chỉ hợp tác 3 tháng sau khi phát hiện lỗi hệ thống cho phép thí sinh mở hai tab làm bài song song mà không bị phát hiện.",
        "An EdTech platform for professional certification prep (IT, accounting, language proficiency) runs an average of 12,000 online exam sessions per day, spiking to 90,000 sessions per week during peak certification season. Each exam has a fixed duration (45–180 minutes), questions are drawn randomly from a difficulty-weighted question bank, and results directly determine certificate issuance — meaning grading errors or missed cheating incidents can trigger serious legal and reputational consequences. A comparable platform was once suspended for three months by its governing body after discovering a bug that let candidates open two exam tabs in parallel undetected.",
        "あるEdTechプラットフォームは、職業資格試験（IT・会計・語学）の対策として、1日平均1万2000件のオンライン試験セッションを運営しており、学期末のピーク時には1週間で9万件に達することもあります。各試験は45分から180分の固定時間制であり、問題は難易度別に重み付けされた問題バンクからランダムに出題され、結果は資格発行に直結します。つまり採点ミスや不正の見逃しは、深刻な法的・信頼上の問題を引き起こしかねません。類似プラットフォームでは、受験者が2つの試験タブを並行して開いても検知されないバグが発覚し、監督機関から3か月間の提携停止処分を受けた事例があります。"
      ),
      P(
        "Phạm vi bài viết bao trùm toàn bộ vòng đời một phiên thi: khởi tạo phiên (session), xác thực danh tính, hiển thị đề theo ma trận rút ngẫu nhiên, ghi nhận đáp án theo thời gian thực, giám sát chống gian lận (phát hiện chuyển tab, nhiều thiết bị, camera bị che), nộp bài, chấm điểm tự động theo barem, và hậu kiểm đối soát điểm với barem gốc. Ràng buộc tuân thủ gồm: log giám sát phải lưu tối thiểu 2 năm để phục vụ khiếu nại phúc khảo, và hệ thống chấm điểm phải có khả năng tái tạo (reproducible) — chấm lại cùng một bài nộp ở thời điểm khác phải ra cùng một điểm số.",
        "The scope covers the full exam session lifecycle: session initialization, identity verification, question rendering per the randomized draw matrix, real-time answer capture, anti-cheat monitoring (tab-switch detection, multi-device detection, camera-obstruction detection), submission, automated grading against the answer key, and post-hoc reconciliation of scores against the source answer key. Compliance constraints include: monitoring logs must be retained for at least 2 years to support grade-appeal disputes, and the grading engine must be reproducible — regrading the same submission at a later time must yield the exact same score.",
        "本稿の範囲は、試験セッションのライフサイクル全体をカバーします：セッション初期化、本人確認、ランダム抽出マトリクスに基づく出題表示、リアルタイムの解答記録、不正防止監視（タブ切り替え検知・複数端末検知・カメラ遮蔽検知）、提出、正解表に基づく自動採点、そして原本の正解表との事後照合です。コンプライアンス上の制約として、監視ログは再採点の異議申し立てに備え最低2年間保存する必要があり、採点エンジンは再現可能でなければなりません。つまり同じ提出済み答案を後で再採点しても、必ず同じ点数になる必要があります。"
      ),
      IMG(svg1Arch, "Kiến trúc thi trực tuyến với Exam Engine, Proctoring AI và Grading Service", "Online exam architecture with Exam Engine, Proctoring AI, and Grading Service", "試験エンジン・不正防止AI・採点サービスから成るオンライン試験アーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử E2E Playwright cho luồng làm bài, nộp bài, khôi phục phiên", "Kiểm thử API cho engine chấm điểm và đối soát barem", "Kiểm thử kịch bản giám sát: chuyển tab, đa thiết bị, mất kết nối"],
        ["Playwright E2E testing for exam-taking, submission, and session recovery flows", "API testing for the grading engine and answer-key reconciliation", "Monitoring scenario testing: tab switching, multi-device, connection loss"],
        ["受験・提出・セッション復旧フローのPlaywright E2Eテスト", "採点エンジンと正解表照合のAPIテスト", "監視シナリオテスト：タブ切り替え・複数端末・接続断"]
      ),
      NOTE("Bài này giả định hệ thống có test-only endpoint để tạo phiên thi giả lập với đề cố định và reset trạng thái giám sát giữa các lần chạy.", "This article assumes the system exposes test-only endpoints to create simulated exam sessions with a fixed question set and reset monitoring state between runs.", "本稿では、固定された問題セットを持つ模擬試験セッションを作成し、実行間で監視状態をリセットするテスト専用エンドポイントが存在することを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow", ja: "2. システムアーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 thành phần chính: Session Gateway (duy trì kết nối WebSocket theo thời gian thực để phát hiện mất mạng), Exam Engine (quản lý trạng thái đề thi, đồng hồ đếm ngược, thứ tự câu hỏi), Proctoring AI (phân tích luồng camera và sự kiện trình duyệt để phát hiện hành vi bất thường), Answer Store (lưu đáp án theo mô hình append-only để không bao giờ ghi đè mất dữ liệu cũ), và Grading Service (chấm điểm theo barem, hỗ trợ chấm bán tự động cho câu tự luận). Luồng đồng bộ diễn ra liên tục trong suốt bài thi: mỗi lần thí sinh chọn đáp án, client gửi ngay một sự kiện AnswerSaved qua WebSocket, Exam Engine xác nhận và Answer Store ghi bản ghi mới (không sửa bản ghi cũ) để đảm bảo có thể truy vết toàn bộ lịch sử thay đổi đáp án.",
        "The architecture has 5 core components: Session Gateway (maintains a real-time WebSocket connection to detect connection loss), Exam Engine (manages exam state, countdown timer, question ordering), Proctoring AI (analyzes camera feed and browser events to detect anomalous behavior), Answer Store (stores answers in an append-only model so old data is never overwritten), and Grading Service (grades against the answer key, supporting semi-automated grading for open-ended questions). The synchronous flow runs continuously throughout the exam: every time a candidate selects an answer, the client immediately sends an AnswerSaved event over WebSocket, the Exam Engine acknowledges it, and the Answer Store writes a new record — never overwriting the previous one — so the full answer-change history remains traceable.",
        "アーキテクチャは5つの主要コンポーネントで構成されます：セッションゲートウェイ（接続断を検知するリアルタイムWebSocket接続を維持）、試験エンジン（試験状態・カウントダウン・出題順序を管理）、不正防止AI（カメラ映像とブラウザイベントを分析し異常行動を検知）、解答ストア（過去データを上書きしない追記専用モデルで解答を保存）、採点サービス（正解表に基づき採点し、記述式問題には半自動採点を提供）です。同期フローは試験中継続的に発生し、受験者が解答を選択するたびにクライアントはWebSocket経由で即座にAnswerSavedイベントを送信し、試験エンジンが確認応答を返し、解答ストアは新しいレコードを追記します（過去レコードは上書きしません）。これにより解答変更履歴の全体を追跡可能にします。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất là đồng bộ hoá đồng hồ: thời gian còn lại PHẢI được tính trên server, không tin tưởng đồng hồ client, vì client có thể bị chỉnh giờ hệ điều hành hoặc có độ trễ mạng khác nhau — nếu kiểm thử chỉ dựa vào đồng hồ hiển thị trên UI sẽ bỏ lọt lỗi hết giờ nhưng vẫn cho nộp bài. Một khó khăn khác là phân biệt tín hiệu gian lận thật với nhiễu: người dùng vô tình bấm Alt-Tab để xem thông báo hệ thống không nên bị tính như gian lận có chủ đích, nên proctoring cần ngưỡng (ví dụ 3 lần rời tab, mỗi lần trên 5 giây) thay vì cờ nhị phân đơn giản — đây chính là bài toán cân bằng False Positive (báo oan thí sinh trung thực) và False Negative (bỏ lọt gian lận thật). Cuối cùng, việc chấm điểm câu tự luận có AI hỗ trợ cần kiểm thử để đảm bảo điểm AI đề xuất luôn ở trạng thái 'chờ duyệt' cho đến khi giám khảo xác nhận, tránh trường hợp điểm bị khoá tự động sai.",
        "The hardest part is clock synchronization: remaining time MUST be computed on the server, never trusted from the client clock, since the client's OS clock may be manually altered or subject to variable network latency — testing based solely on the UI-displayed timer would miss bugs where time has actually expired but submission is still accepted. Another difficulty is distinguishing genuine cheating signals from noise: a candidate accidentally Alt-Tabbing to check a system notification should not be flagged as deliberate cheating, so proctoring needs a threshold (e.g., 3 tab-exits, each over 5 seconds) rather than a simple binary flag — this is fundamentally a balancing act between False Positives (wrongly flagging honest candidates) and False Negatives (missing real cheating). Finally, AI-assisted grading of open-ended questions must be tested to ensure the AI-suggested score always remains in a 'pending review' state until an examiner confirms it, preventing scores from being auto-locked incorrectly.",
        "最も難しいのは時刻同期です。残り時間は必ずサーバー側で計算しなければならず、クライアント時計を信頼してはいけません。クライアントのOS時計は手動で変更され得るほか、ネットワーク遅延も一定ではないためです。UI表示のタイマーだけに基づいてテストすると、実際には時間切れなのに提出が受理されてしまうバグを見逃します。もう一つの難点は、本物の不正シグナルとノイズの区別です。受験者が誤ってAlt-Tabしてシステム通知を確認しただけの場合、意図的な不正として扱われるべきではありません。そのため不正防止の仕組みには単純な二値フラグではなく閾値（例：タブ離脱3回、各回5秒超）が必要です。これは本質的に、正直な受験者を誤って疑う偽陽性（False Positive）と、本物の不正を見逃す偽陰性（False Negative）のバランスを取る問題です。最後に、記述式問題のAI支援採点では、採点者が確認するまでAI提案スコアが必ず「承認待ち」状態にとどまることをテストで確認し、スコアが誤って自動確定されないようにする必要があります。"
      ),
      TIP("Luôn kiểm thử với đồng hồ server bị lệch giả lập (skew test) để chắc chắn logic hết giờ không phụ thuộc vào đồng hồ máy trạm.", "Always test with a simulated server clock skew to ensure the timeout logic never depends on the workstation's clock.", "サーバー時計のずれをシミュレートするテスト（スキューテスト）を必ず実施し、タイムアウトロジックが端末の時計に依存しないことを確認してください。"),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm 5 thực thể: ExamSession (id, studentId, examId, startedAt, deadlineAt, status), QuestionDraw (danh sách câu hỏi đã rút cho phiên này, cố định ngay khi khởi tạo), Answer (append-only, mỗi bản ghi có questionId, value, savedAt, version), Incident (loại vi phạm, mức độ, timestamp, có được xác nhận bởi giám thị hay không), và Score (điểm từng câu, điểm tổng, trạng thái LOCKED/PENDING_REVIEW). Bất biến quan trọng nhất — cũng là oracle chính của toàn bộ bài toán — là: với mọi ExamSession đã SUBMITTED, điểm tổng phải bằng đúng tổng điểm từng câu tính theo barem tại thời điểm chấm, và tập câu trả lời dùng để chấm phải là bản ghi Answer có version mới nhất trước thời điểm nộp bài, không được là bản ghi cũ hơn hoặc bản ghi đến sau deadline.",
        "The core data model has 5 entities: ExamSession (id, studentId, examId, startedAt, deadlineAt, status), QuestionDraw (the list of questions drawn for this session, fixed at initialization), Answer (append-only, each record has questionId, value, savedAt, version), Incident (violation type, severity, timestamp, whether confirmed by a proctor), and Score (per-question score, total score, status LOCKED/PENDING_REVIEW). The most critical invariant — and the central oracle of the whole problem — is: for every SUBMITTED ExamSession, the total score must equal exactly the sum of per-question scores computed against the answer key at grading time, and the answer set used for grading must be the latest Answer version recorded before the submission timestamp, never an older record or one arriving after the deadline.",
        "コアデータモデルは5つのエンティティで構成されます：ExamSession（id、studentId、examId、startedAt、deadlineAt、status）、QuestionDraw（このセッション用に抽出された問題リスト。初期化時に固定）、Answer（追記専用、各レコードはquestionId・value・savedAt・versionを持つ）、Incident（違反種別・重大度・タイムスタンプ・監督者による確認有無）、Score（設問ごとの得点・合計点・状態LOCKED/PENDING_REVIEW）。最も重要な不変条件——本問題全体の中心となるオラクル——は次の通りです：すべてのSUBMITTED状態のExamSessionについて、合計点は採点時点の正解表に基づく各設問の得点合計と厳密に一致しなければならず、採点に使用する解答集合は提出タイムスタンプより前に記録された最新バージョンのAnswerでなければならず、それより古いレコードや締切後に到着したレコードであってはなりません。"
      ),
      UL(
        ["Bất biến 1: Điểm = Σ(điểm câu × barem hiện hành), không chấm theo barem cũ nếu đã cập nhật hợp lệ", "Bất biến 2: Mỗi Answer.questionId chỉ có đúng 1 bản ghi 'hiệu lực' tại một thời điểm — bản mới nhất trước deadline", "Bất biến 3: Không tồn tại Answer nào có savedAt sau deadlineAt được dùng để chấm", "Bất biến 4: Mọi Incident mức độ cao (HIGH) phải có ít nhất 1 bằng chứng (ảnh/tab log) đính kèm", "Bất biến 5: Score.status chỉ chuyển LOCKED sau khi mọi câu tự luận đã qua PENDING_REVIEW"],
        ["Invariant 1: Score = Σ(question score × current answer key), never graded against a stale key if legitimately updated", "Invariant 2: Each Answer.questionId has exactly one 'effective' record at any point in time — the latest one before the deadline", "Invariant 3: No Answer with savedAt after deadlineAt is ever used for grading", "Invariant 4: Every HIGH-severity Incident must have at least one attached piece of evidence (screenshot/tab log)", "Invariant 5: Score.status only transitions to LOCKED after every open-ended question has passed PENDING_REVIEW"],
        ["不変条件1：得点 = Σ（設問得点 × 現行正解表）。正当に更新された場合、古い正解表で採点してはならない", "不変条件2：各Answer.questionIdは、ある時点において有効なレコードが正確に1つだけ存在する——締切前の最新レコード", "不変条件3：savedAtが締切後のAnswerが採点に使用されることは絶対にない", "不変条件4：重大度HIGHのIncidentは必ず1つ以上の証拠（スクリーンショット・タブログ）を添付する", "不変条件5：Score.statusは、すべての記述式問題がPENDING_REVIEWを経た後にのみLOCKEDへ遷移する"]
      ),
      WARN("Nếu chấm điểm không dùng snapshot barem tại thời điểm thi mà dùng barem hiện tại của hệ thống, một lần sửa đề sau này có thể làm SAI LỆCH điểm của hàng nghìn bài đã chấm trước đó.", "If grading uses the system's current answer key instead of a snapshot taken at exam time, a later question-edit can retroactively CORRUPT the scores of thousands of previously graded submissions.", "採点時点のスナップショット正解表ではなく現行の正解表を使用すると、後日の問題修正が、既に採点済みの数千件の答案の点数を遡って狂わせる可能性があります。"),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất theo tác động tài chính/pháp lý là chấm điểm sai (ảnh hưởng trực tiếp đến việc cấp chứng chỉ) và bỏ lọt gian lận nghiêm trọng (làm mất giá trị chứng chỉ trên thị trường). Rủi ro cao thứ hai là mất bài nộp do lỗi mạng hoặc crash trình duyệt — với thí sinh, đây là rủi ro gây bức xúc lớn nhất vì công sức ôn thi có thể mất trắng. Rủi ro về hiệu năng xuất hiện vào các khung giờ thi tập trung (buổi tối sau giờ làm) khi hàng nghìn phiên thi khởi tạo cùng lúc, có thể làm Session Gateway quá tải và gây rớt kết nối hàng loạt.",
        "The highest-impact risk, financially and legally, is incorrect grading (directly affecting certificate issuance) and missing serious cheating (which devalues the certificate in the marketplace). The second-highest risk is losing a submission due to network failure or browser crash — for candidates, this is the single most infuriating risk since months of study effort could vanish. Performance risk emerges during concentrated exam windows (evenings after work hours) when thousands of sessions initialize simultaneously, potentially overloading the Session Gateway and causing mass disconnections.",
        "財務・法的影響の観点で最もリスクが高いのは、誤った採点（資格発行に直結）と、重大な不正の見逃し（資格の市場価値を損なう）です。次に高いリスクは、ネットワーク障害やブラウザクラッシュによる提出データの喪失で、受験者にとっては数か月の勉強努力が水泡に帰す、最も強い不満を招くリスクです。性能面のリスクは、勤務後の夜間など試験が集中する時間帯に、数千のセッションが同時に初期化され、セッションゲートウェイが過負荷になり大量切断を引き起こす可能性がある点に現れます。"
      ),
      P(
        "Chiến lược kiểm thử áp dụng kim tự tháp: 65% test API/unit tập trung vào engine chấm điểm và logic phát hiện gian lận (nơi có nhiều nhánh logic phức tạp, cần bao phủ boundary chính xác), 25% test E2E Playwright mô phỏng hành vi thí sinh thật (mất mạng, chuyển tab, nộp bài sát giờ), và 10% test khám phá thủ công tập trung vào trải nghiệm giám sát (proctoring UX) — vì cảm giác 'bị theo dõi quá mức' là yếu tố khó đo bằng automation nhưng ảnh hưởng lớn đến uy tín sản phẩm. Ngoài ra, có một tầng kiểm thử riêng cho AI: đánh giá độ chính xác của proctoring AI trên bộ dữ liệu video gán nhãn (labeled dataset) với các chỉ số Precision/Recall được theo dõi theo từng phiên bản mô hình.",
        "The test strategy follows a pyramid: 65% API/unit tests focused on the grading engine and cheat-detection logic (where complex branching logic lives and precise boundary coverage matters most), 25% Playwright E2E tests simulating real candidate behavior (network loss, tab switching, last-second submission), and 10% manual exploratory testing focused on the proctoring UX — because the feeling of being 'over-monitored' is hard to measure via automation but heavily impacts product trust. Additionally, there is a dedicated AI-testing layer: evaluating proctoring AI accuracy against a labeled video dataset, tracking Precision/Recall metrics per model version.",
        "テスト戦略はピラミッド型を採用します：65%はAPI/ユニットテストで採点エンジンと不正検知ロジック（複雑な分岐ロジックが存在し、正確な境界値カバレッジが最重要）に集中し、25%はPlaywrightのE2Eテストで実際の受験者行動（ネットワーク断・タブ切り替え・締切間際の提出）を再現し、10%は監視UX（プロクタリングUX）に焦点を当てた手動探索的テストです。「監視されすぎている」という感覚は自動化では測定しづらいものの、製品の信頼性に大きく影響するためです。さらに、AI専用のテスト層があり、ラベル付き動画データセットに対する不正防止AIの精度を評価し、モデルバージョンごとにPrecision/Recall指標を追跡します。"
      ),
      UL(
        ["Rủi ro R1 (Rất cao): Chấm sai điểm do dùng barem không đúng phiên bản", "Rủi ro R2 (Rất cao): Mất đáp án khi mất kết nối mạng giữa bài thi", "Rủi ro R3 (Cao): False Negative — bỏ lọt gian lận thật (2 thiết bị, chép màn hình)", "Rủi ro R4 (Cao): False Positive — báo oan thí sinh trung thực do nhiễu mạng/thiết bị", "Rủi ro R5 (Trung bình): Quá tải Session Gateway giờ cao điểm"],
        ["Risk R1 (Very high): Incorrect scoring due to using the wrong answer-key version", "Risk R2 (Very high): Lost answers due to network disconnection mid-exam", "Risk R3 (High): False Negative — missing genuine cheating (multi-device, screen mirroring)", "Risk R4 (High): False Positive — wrongly flagging honest candidates due to network/device noise", "Risk R5 (Medium): Session Gateway overload during peak hours"],
        ["リスクR1（非常に高い）：誤ったバージョンの正解表使用による誤採点", "リスクR2（非常に高い）：試験中のネットワーク切断による解答喪失", "リスクR3（高い）：偽陰性——本物の不正（複数端末・画面ミラーリング）の見逃し", "リスクR4（高い）：偽陽性——ネットワーク・端末ノイズによる正直な受験者の誤検知", "リスクR5（中程度）：ピーク時間帯のセッションゲートウェイ過負荷"]
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的テスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi trong: chấm điểm tự động, phát hiện gian lận, toàn vẹn phiên thi, và đối soát điểm hậu kỳ. Phạm vi ngoài: nội dung sư phạm của câu hỏi (do đội biên soạn đề chịu trách nhiệm), thiết kế UI/UX chi tiết. Tiêu chí đầu vào (entry criteria): môi trường staging có dữ liệu đề thi mẫu, test-only endpoint sẵn sàng, mock proctoring AI trả kết quả xác định (deterministic) cho môi trường CI. Tiêu chí đầu ra (exit criteria): 100% ca ưu tiên cao PASS, không còn lỗi Sev1/Sev2 mở, độ chính xác proctoring AI trên bộ test đạt Precision ≥ 92% và Recall ≥ 95% (ưu tiên Recall cao hơn vì bỏ lọt gian lận nguy hiểm hơn báo oan có kiểm tra thủ công sau).",
        "The test plan defines in-scope: automated grading, cheat detection, exam session integrity, and post-hoc score reconciliation. Out-of-scope: pedagogical content of the questions (owned by the question-authoring team), detailed UI/UX design. Entry criteria: a staging environment with sample exam data, test-only endpoints ready, and a mock proctoring AI returning deterministic results for CI. Exit criteria: 100% of high-priority cases PASS, no open Sev1/Sev2 defects, and proctoring AI accuracy on the test set reaching Precision ≥ 92% and Recall ≥ 95% (Recall prioritized since missing real cheating is worse than a false alarm that gets manually reviewed later).",
        "テスト計画では、対象範囲を自動採点・不正検知・試験セッションの整合性・事後の得点照合と定めます。対象外は、設問の教育的内容（作問チームの責任範囲）および詳細なUI/UXデザインです。開始基準（エントリー基準）は、サンプル試験データを含むステージング環境、テスト専用エンドポイントの準備完了、CI環境向けに決定論的な結果を返すモック不正防止AIです。終了基準（エグジット基準）は、優先度高のケースが100%合格し、未解決のSev1/Sev2欠陥がなく、テストセットにおける不正防止AIの精度がPrecision 92%以上かつRecall 95%以上に達することです（本物の不正見逃しは後で手動確認できる誤報より深刻なため、Recallを優先します）。"
      ),
      P(
        "Chiến lược dữ liệu thử nghiệm dùng 3 lớp: (1) bộ đề cố định với đáp án đúng đã biết trước để kiểm thử chấm điểm chính xác tuyệt đối, (2) bộ video/sự kiện hành vi đã gán nhãn (honest, borderline, cheating) để đo Precision/Recall của proctoring AI, và (3) dữ liệu tổng hợp khối lượng lớn (load data) mô phỏng 5.000 phiên thi khởi tạo trong cùng 1 phút để kiểm thử hiệu năng Session Gateway. Vai trò tham gia gồm QA Lead (thiết kế ma trận ca), Automation Engineer (Playwright + API), Data Scientist (đánh giá mô hình proctoring), và giám khảo nghiệp vụ (business SME) xác nhận barem.",
        "The test data strategy uses 3 layers: (1) a fixed question set with known correct answers to test absolute grading accuracy, (2) a labeled set of behavior videos/events (honest, borderline, cheating) to measure proctoring AI Precision/Recall, and (3) large-scale synthetic load data simulating 5,000 sessions initializing within the same minute to test Session Gateway performance. Participating roles include the QA Lead (case matrix design), Automation Engineer (Playwright + API), Data Scientist (proctoring model evaluation), and business SME examiners confirming the answer key.",
        "テストデータ戦略は3層構成です：(1) 既知の正解を持つ固定問題セットで絶対的な採点精度をテストする、(2) ラベル付きの行動動画・イベントセット（正直・境界線上・不正）で不正防止AIのPrecision/Recallを測定する、(3) 同一分間に5000セッションが初期化される大規模な合成負荷データでセッションゲートウェイの性能をテストする、の3つです。参加する役割には、QAリード（ケースマトリクス設計）、自動化エンジニア（Playwright＋API）、データサイエンティスト（プロクタリングモデル評価）、そして正解表を確認する業務SME（試験官）が含まれます。"
      ),
      TIP("Đưa chỉ số Precision/Recall của proctoring AI vào dashboard CI để mọi thay đổi model đều được so sánh với baseline trước khi triển khai.", "Feed the proctoring AI's Precision/Recall metrics into a CI dashboard so every model change is compared against a baseline before deployment.", "不正防止AIのPrecision/Recall指標をCIダッシュボードに組み込み、モデル変更のたびにデプロイ前にベースラインと比較できるようにしてください。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca dưới đây áp dụng kỹ thuật equivalence partitioning cho thời điểm nộp bài (trước hạn/đúng hạn/sau hạn), boundary value cho ngưỡng phát hiện gian lận (2 lần vs 3 lần chuyển tab), và decision table cho tổ hợp trạng thái mạng × trạng thái phiên. Mỗi ca đều gắn với ít nhất một bất biến ở chương 3 để đảm bảo assert luôn dựa trên oracle nghiệp vụ, không dựa vào thông báo UI chung chung.",
        "The case matrix below applies equivalence partitioning to submission timing (before/at/after deadline), boundary value analysis to the cheat-detection threshold (2 vs. 3 tab-switches), and a decision table for the combination of network state × session state. Every case is tied to at least one invariant from Chapter 3, ensuring assertions are always grounded in the business oracle rather than a generic UI success message.",
        "以下のケースマトリクスは、提出タイミング（締切前・締切ちょうど・締切後）に同値分割技法を適用し、不正検知の閾値（タブ切り替え2回対3回）に境界値分析を適用し、ネットワーク状態×セッション状態の組み合わせにデシジョンテーブルを適用しています。各ケースは第3章の不変条件の少なくとも1つに紐づけられており、アサーションが汎用的なUI成功メッセージではなく、常に業務オラクルに基づくことを保証します。"
      ),
      IMG(svg1Matrix, "Ma trận ca kiểm thử thi trực tuyến theo mức rủi ro", "Online exam test case matrix by risk level", "リスクレベル別のオンライン試験テストケースマトリクス"),
      UL(
        ["Equivalence: nộp trước hạn / đúng lúc hết hạn / sau hạn", "Boundary: 2 lần chuyển tab (chưa cảnh báo) vs 3 lần (sinh incident)", "Decision table: mạng OK×phiên ACTIVE, mạng MẤT×phiên ACTIVE, mạng OK×phiên EXPIRED", "Ca đồng thời: 2 request nộp bài cùng lúc từ cùng 1 phiên"],
        ["Equivalence: submit before deadline / exactly at deadline / after deadline", "Boundary: 2 tab-switches (no warning yet) vs 3 (incident raised)", "Decision table: network OK×session ACTIVE, network DOWN×session ACTIVE, network OK×session EXPIRED", "Concurrency case: 2 simultaneous submission requests from the same session"],
        ["同値分割：締切前提出／締切ちょうど提出／締切後提出", "境界値：タブ切り替え2回（まだ警告なし）対3回（インシデント発生）", "デシジョンテーブル：ネットワーク正常×セッションACTIVE、ネットワーク断×セッションACTIVE、ネットワーク正常×セッションEXPIRED", "並行ケース：同一セッションからの同時2件の提出リクエスト"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Môi trường staging cần một test-only endpoint `/test/exam-sessions` cho phép tạo phiên thi với đề cố định, barem đã biết, và có thể điều khiển thời gian hết hạn (deadline) để rút ngắn thời gian chờ khi kiểm thử timeout. Proctoring AI trong CI được thay bằng mock trả về kết quả xác định theo kịch bản đầu vào (ví dụ: gửi sự kiện `tab_blur` 3 lần liên tiếp phải trả về incident HIGH), tách biệt hoàn toàn khỏi mô hình thật để tránh flaky do độ trễ suy luận AI. Dữ liệu câu hỏi dùng bộ 20 câu cố định với đáp án đã biết trước (golden answer set) để mọi lần chạy test chấm điểm đều so sánh được với kết quả kỳ vọng tuyệt đối.",
        "The staging environment needs a test-only endpoint `/test/exam-sessions` that creates exam sessions with a fixed question set, known answer key, and controllable deadline to shorten wait times when testing timeouts. The proctoring AI in CI is replaced with a mock returning deterministic results based on input scenario (e.g., sending 3 consecutive `tab_blur` events must return a HIGH incident), fully decoupled from the real model to avoid flakiness from AI inference latency. Question data uses a fixed set of 20 questions with a known golden answer set, so every grading test run can be compared against an absolute expected result.",
        "ステージング環境には、固定問題セット・既知の正解表を持ち、締切時刻を制御可能な試験セッションを作成できる、テスト専用エンドポイント`/test/exam-sessions`が必要です。これによりタイムアウトテスト時の待機時間を短縮できます。CI環境の不正防止AIは、入力シナリオに応じて決定論的な結果を返すモックに置き換えられ（例：`tab_blur`イベントを3回連続送信するとHIGHインシデントを返す）、AI推論の遅延によるフレーク（不安定なテスト）を避けるため実モデルから完全に切り離されています。問題データは既知の正解セット（ゴールデン正解セット）を持つ固定20問セットを使用し、採点テストの実行のたびに絶対的な期待結果と比較できるようにします。"
      ),
      CODE("typescript", `// fixtures/exam.fixture.ts — seed phiên thi qua test-only endpoint, tách biệt dữ liệu mỗi test
import { test as base, APIRequestContext } from "@playwright/test";

type ExamFixtures = {
  examSession: { sessionId: string; deadlineAt: string; goldenAnswers: Record<string, string> };
};

export const test = base.extend<ExamFixtures>({
  examSession: async ({ request }, use) => {
    const res = await request.post("/test/exam-sessions", {
      data: { examId: "cert-it-101", questionSetId: "golden-20", durationSec: 60 }, // rút ngắn để test nhanh
    });
    const body = await res.json();
    await use({ sessionId: body.sessionId, deadlineAt: body.deadlineAt, goldenAnswers: body.answerKey });
    await request.post(\`/test/exam-sessions/\${body.sessionId}/reset\`); // dọn dẹp sau test
  },
});
export { expect } from "@playwright/test";`),
      NOTE("Không bao giờ dùng ngân hàng đề thi thật (production question bank) trong môi trường test tự động để tránh rò rỉ đề.", "Never use the real production question bank in automated test environments to avoid question-leak risk.", "問題漏洩リスクを避けるため、自動テスト環境では本番の問題バンクを絶対に使用しないでください。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：正常系" },
    blocks: [
      P(
        "Kịch bản happy path mô phỏng một thí sinh làm bài trọn vẹn: đăng nhập, bắt đầu phiên thi, trả lời đủ 20 câu, nộp bài trước hạn, và kiểm tra điểm cuối cùng khớp chính xác với golden answer set. Assertion không dừng ở việc UI hiển thị 'Nộp bài thành công' mà phải gọi API kiểm tra Score.total bằng phép tính độc lập (so sánh với đáp án mẫu đã biết trước), đúng theo nguyên tắc oracle-first đã nêu ở chương 3.",
        "The happy-path scenario simulates a candidate completing a full exam: logging in, starting the session, answering all 20 questions, submitting before the deadline, and verifying the final score matches the golden answer set exactly. The assertion does not stop at the UI showing 'Submitted successfully' — it must call the API to check Score.total against an independently computed expectation (comparing against the known golden answers), following the oracle-first principle from Chapter 3.",
        "正常系シナリオは、受験者がログイン・セッション開始・全20問の解答・締切前の提出・そしてゴールデン正解セットと厳密に一致する最終スコアの検証という、試験を完遂する流れを再現します。アサーションはUIに「提出成功」と表示されるだけでは終わらず、第3章で述べたオラクル優先の原則に従い、既知のゴールデン正解と照合した独立計算の期待値に対してScore.totalをAPIで検証する必要があります。"
      ),
      CODE("typescript", `// e2e/exam-happy-path.spec.ts
import { test, expect } from "../fixtures/exam.fixture";

test("thí sinh làm bài đầy đủ và điểm khớp golden answer set", async ({ page, request, examSession }) => {
  await page.goto(\`/exam/\${examSession.sessionId}\`);
  const questionIds = Object.keys(examSession.goldenAnswers);

  for (const qId of questionIds) {
    const correctValue = examSession.goldenAnswers[qId];
    await page.getByTestId(\`question-\${qId}\`).getByLabel(correctValue).check();
    await expect(page.getByTestId(\`saved-indicator-\${qId}\`)).toHaveText("Đã lưu"); // xác nhận AnswerSaved
  }

  await page.getByRole("button", { name: "Nộp bài" }).click();
  await page.getByRole("button", { name: "Xác nhận nộp" }).click();
  await expect(page.getByTestId("submit-status")).toHaveText("Đã nộp bài");

  // Oracle: gọi thẳng API chấm điểm, so với tổng điểm tính độc lập — không tin UI
  const scoreRes = await request.get(\`/api/exam-sessions/\${examSession.sessionId}/score\`);
  const score = await scoreRes.json();
  const expectedTotal = questionIds.length * 0.5; // mỗi câu 0.5 điểm, barem cố định trong golden set
  expect(score.total).toBeCloseTo(expectedTotal, 2);
  expect(score.status).toBe("LOCKED");
});`),
      TIP("Luôn assert thêm `saved-indicator` ngay sau mỗi lần chọn đáp án — đây là tín hiệu sớm phát hiện lỗi mất kết nối WebSocket trước khi ảnh hưởng tới điểm.", "Always assert the `saved-indicator` right after each answer selection — it is an early signal to catch WebSocket disconnection bugs before they affect the score.", "各解答選択の直後に必ず`saved-indicator`をアサートしてください——これはスコアに影響が及ぶ前にWebSocket切断の不具合を早期に検知する手がかりになります。"),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu", en: "9. Deep failure cases", ja: "9. 高度な異常系" },
    blocks: [
      P(
        "Ca lỗi là nơi tạo ra giá trị cao nhất cho một bài toán có tính pháp lý như chấm thi, vì đây chính là nơi nhà tuyển dụng và đội vận hành thực tế quan tâm nhất khi phỏng vấn hoặc điều tra sự cố. Ba nhóm ca lỗi trọng tâm gồm: mất kết nối giữa bài thi (đảm bảo không mất đáp án), nộp bài trùng do retry (đảm bảo idempotency), và phát hiện gian lận đa thiết bị (đảm bảo không bỏ lọt False Negative nghiêm trọng).",
        "Failure cases create the highest value for a legally sensitive problem like exam grading, since this is exactly where hiring managers and operations teams focus most during interviews or incident investigations. Three key failure groups are: mid-exam disconnection (ensuring no answer loss), duplicate submission from retries (ensuring idempotency), and multi-device cheat detection (ensuring no severe False Negatives are missed).",
        "採点のような法的にセンシティブな問題において、異常系こそが最も高い価値を生み出します。なぜなら、面接や障害調査の際に採用担当者や運用チームが最も注目するのがまさにこの部分だからです。重要な異常系は3つのグループに分かれます：試験中の接続断（解答喪失がないことの確認）、リトライによる重複提出（冪等性の確認）、複数端末の不正検知（重大な偽陰性の見逃しがないことの確認）です。"
      ),
      CODE("typescript", `// e2e/exam-network-loss.spec.ts — mất mạng giữa bài, khôi phục không mất đáp án
import { test, expect } from "../fixtures/exam.fixture";

test("mất mạng 30 giây giữa bài thi vẫn khôi phục đúng đáp án đã lưu", async ({ page, context, examSession }) => {
  await page.goto(\`/exam/\${examSession.sessionId}\`);
  await page.getByTestId("question-q1").getByLabel("A").check();
  await expect(page.getByTestId("saved-indicator-q1")).toHaveText("Đã lưu");

  await context.setOffline(true);
  await page.getByTestId("question-q2").getByLabel("B").check(); // thao tác khi offline
  await page.waitForTimeout(30_000);
  await context.setOffline(false);

  // Oracle: q1 vẫn còn nguyên, q2 phải được đồng bộ lại (retry queue) sau khi có mạng
  await expect(page.getByTestId("saved-indicator-q1")).toHaveText("Đã lưu");
  await expect(page.getByTestId("saved-indicator-q2")).toHaveText("Đã lưu", { timeout: 15_000 });
});`),
      CODE("typescript", `// api/exam-idempotent-submit.spec.ts — 2 request nộp bài trùng do client retry
import { test, expect } from "../fixtures/exam.fixture";

test("gửi nộp bài trùng 2 lần chỉ tạo 1 bản ghi SUBMITTED", async ({ request, examSession }) => {
  const idemKey = \`submit-\${examSession.sessionId}\`;
  const [r1, r2] = await Promise.all([
    request.post(\`/api/exam-sessions/\${examSession.sessionId}/submit\`, { headers: { "Idempotency-Key": idemKey } }),
    request.post(\`/api/exam-sessions/\${examSession.sessionId}/submit\`, { headers: { "Idempotency-Key": idemKey } }),
  ]);
  expect([r1.status(), r2.status()].sort()).toEqual([200, 200]); // cả 2 đều trả 200 nhưng...

  const history = await (await request.get(\`/api/exam-sessions/\${examSession.sessionId}/audit\`)).json();
  const submitEvents = history.events.filter((e: any) => e.type === "SUBMITTED");
  expect(submitEvents.length).toBe(1); // ... chỉ 1 sự kiện SUBMITTED thật sự được ghi nhận
});`),
      CODE("typescript", `// api/exam-multidevice-detection.spec.ts — đăng nhập 2 thiết bị, IP khác nhau
import { test, expect } from "../fixtures/exam.fixture";

test("đăng nhập song song từ 2 thiết bị khác IP sinh incident HIGH", async ({ request, examSession }) => {
  await request.post(\`/api/exam-sessions/\${examSession.sessionId}/heartbeat\`, {
    data: { deviceId: "device-A", ip: "203.0.113.10", fingerprint: "fp-A" },
  });
  const secondDevice = await request.post(\`/api/exam-sessions/\${examSession.sessionId}/heartbeat\`, {
    data: { deviceId: "device-B", ip: "198.51.100.20", fingerprint: "fp-B" },
  });
  expect(secondDevice.status()).toBe(409); // phiên thứ 2 bị từ chối tham gia

  const incidents = await (await request.get(\`/api/exam-sessions/\${examSession.sessionId}/incidents\`)).json();
  expect(incidents.some((i: any) => i.type === "MULTI_DEVICE" && i.severity === "HIGH")).toBe(true);
});`),
      WARN("Nếu chỉ kiểm thử idempotency bằng 1 request tuần tự, sẽ KHÔNG phát hiện được race condition thật xảy ra khi 2 request tới gần như đồng thời — phải test với Promise.all hoặc công cụ tạo tải song song.", "Testing idempotency with a single sequential request will NOT catch the real race condition that occurs when 2 requests arrive nearly simultaneously — test with Promise.all or a concurrent load tool.", "冪等性を単一の逐次リクエストだけでテストすると、2つのリクエストがほぼ同時に到着した際に発生する本物の競合状態を検知できません——Promise.allや並行負荷ツールでテストする必要があります。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm, chấm điểm & đối soát", en: "10. Post-hoc grading & reconciliation", ja: "10. 事後採点と照合" },
    blocks: [
      P(
        "Sau khi kỳ thi kết thúc, một job đối soát (reconciliation batch) chạy hằng đêm để so sánh điểm đã chấm với việc tính lại độc lập từ Answer Store và barem snapshot — bất kỳ sai lệch nào (dù chỉ 0.01 điểm) đều được coi là lỗi nghiêm trọng cần điều tra ngay. Job này cũng kiểm tra chéo rằng không có ExamSession nào ở trạng thái ACTIVE quá 24 giờ sau deadline (dấu hiệu của phiên bị treo do lỗi hệ thống), và không có Incident mức HIGH nào chưa được giám thị xử lý sau 48 giờ.",
        "After the exam period ends, a nightly reconciliation batch job compares graded scores against an independent recalculation from the Answer Store and the barem snapshot — any discrepancy (even 0.01 points) is treated as a serious defect requiring immediate investigation. This job also cross-checks that no ExamSession remains ACTIVE more than 24 hours past its deadline (a sign of a session stuck due to a system bug), and that no HIGH-severity Incident remains unresolved by a proctor after 48 hours.",
        "試験期間終了後、夜間の照合バッチジョブが実行され、採点済みスコアを解答ストアと正解表スナップショットからの独立した再計算結果と比較します。わずか0.01点でも食い違いがあれば、直ちに調査が必要な重大な欠陥として扱われます。このジョブはまた、締切から24時間を超えてACTIVE状態のままのExamSessionが存在しないこと（システム不具合によりセッションが固着している兆候）、および48時間経過しても監督者により未対応のHIGH重大度Incidentが存在しないことも相互確認します。"
      ),
      CODE("sql", `-- reconciliation.sql — đối soát điểm chấm với tính lại độc lập, chạy hằng đêm
SELECT s.session_id, s.total_score AS graded_total, r.recomputed_total,
       ABS(s.total_score - r.recomputed_total) AS diff
FROM scores s
JOIN (
  SELECT a.session_id, SUM(bk.point) AS recomputed_total
  FROM answers a
  JOIN LATERAL (
    -- lấy bản Answer hiệu lực cuối cùng trước deadline cho mỗi câu
    SELECT * FROM answers a2
    WHERE a2.session_id = a.session_id AND a2.question_id = a.question_id
      AND a2.saved_at <= (SELECT deadline_at FROM exam_sessions WHERE session_id = a.session_id)
    ORDER BY a2.saved_at DESC LIMIT 1
  ) latest ON true
  JOIN barem_snapshot bk ON bk.question_id = a.question_id AND bk.value = latest.value
  GROUP BY a.session_id
) r ON r.session_id = s.session_id
WHERE ABS(s.total_score - r.recomputed_total) > 0.001; -- sai lệch = SỰ CỐ, cần điều tra ngay`),
      NOTE("Đối soát nên chạy trên bản sao read-replica để không ảnh hưởng hiệu năng của hệ thống chấm thi đang phục vụ phiên khác.", "Reconciliation should run against a read-replica to avoid impacting the performance of the live grading system serving other sessions.", "照合処理は、他のセッションを処理中の稼働中採点システムの性能に影響を与えないよう、読み取り専用レプリカ上で実行すべきです。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD・監視・指標" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit/API test cho grading engine (nhanh, chạy mọi PR), E2E Playwright chia shard theo nhóm kịch bản (happy path, mất mạng, gian lận) chạy trên môi trường staging mỗi đêm, và job đánh giá độ chính xác proctoring AI chạy hằng tuần trên bộ dữ liệu gán nhãn để phát hiện suy giảm mô hình (model drift) trước khi ảnh hưởng thí sinh thật. Cổng chất lượng (quality gate) chặn merge nếu Recall của proctoring AI giảm quá 1 điểm phần trăm so với baseline, vì đây là chỉ số nhạy cảm nhất với rủi ro pháp lý.",
        "The CI pipeline runs 3 parallel tiers: unit/API tests for the grading engine (fast, runs on every PR), Playwright E2E sharded by scenario group (happy path, network loss, cheating) running nightly on staging, and a weekly proctoring AI accuracy evaluation job against the labeled dataset to catch model drift before it affects real candidates. A quality gate blocks merges if the proctoring AI's Recall drops more than 1 percentage point versus baseline, since this is the metric most sensitive to legal risk.",
        "CIパイプラインは3層を並行実行します：採点エンジン向けのユニット/APIテスト（高速、すべてのPRで実行）、シナリオグループ（正常系・ネットワーク断・不正）別にシャーディングされたPlaywright E2Eテスト（ステージング環境で毎晩実行）、そしてモデルの劣化（モデルドリフト）を実際の受験者に影響が及ぶ前に検知するための、ラベル付きデータセットに対する週次の不正防止AI精度評価ジョブです。品質ゲートは、不正防止AIのRecallがベースラインより1ポイント以上低下した場合にマージをブロックします。これは法的リスクに最も敏感な指標だからです。"
      ),
      CODE("yaml", `# .github/workflows/exam-ci.yml
name: exam-ci
on: [pull_request]
jobs:
  grading-unit-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api -- --grep "grading|reconciliation"

  e2e-shard:
    needs: grading-unit-api
    runs-on: ubuntu-latest
    strategy:
      matrix: { shard: [1, 2, 3] }
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/3
        env:
          PROCTORING_MODE: mock

  proctoring-accuracy-gate:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run eval:proctoring -- --dataset labeled-v12 --min-recall 0.95 --min-precision 0.92`),
      TIP("Tách riêng shard 'ca gian lận' khỏi shard 'happy path' để khi Recall giảm, đội biết ngay cần soi vào nhóm test nào trước.", "Keep the 'cheating scenarios' shard separate from the 'happy path' shard, so when Recall drops the team immediately knows which test group to investigate first.", "『不正シナリオ』シャードを『正常系』シャードと分離しておくことで、Recallが低下した際にチームがどのテストグループから調査すべきか即座に分かります。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent có thể đảm nhận việc sinh ca kiểm thử biên cho ma trận chuyển tab (ví dụ tự động đề xuất thêm ca '2 lần chuyển tab cách nhau đúng 5.01 giây' để kiểm tra chính xác biên ngưỡng), phân tích log Incident hằng ngày để gợi ý mẫu gian lận mới chưa có luật phát hiện, và soạn thảo báo cáo tóm tắt kết quả hồi quy (regression) sau mỗi lần đổi mô hình proctoring. Ranh giới trách nhiệm rõ ràng: AI KHÔNG được tự quyết định khoá điểm cuối cùng (Score.status → LOCKED) hoặc tự động huỷ bài thi của thí sinh — mọi hành động có hệ quả pháp lý trực tiếp đến thí sinh đều cần một người có thẩm quyền (giám khảo/giám thị) xác nhận cuối cùng.",
        "AI agents can take on generating boundary test cases for the tab-switch matrix (e.g., automatically proposing an added case of '2 tab-switches exactly 5.01 seconds apart' to precisely test the threshold boundary), analyzing daily Incident logs to suggest new cheating patterns not yet covered by detection rules, and drafting regression summary reports after each proctoring model change. The responsibility boundary is clear: AI must NOT autonomously decide to lock final scores (Score.status → LOCKED) or auto-disqualify a candidate's exam — every action with direct legal consequence for a candidate requires final confirmation from an authorized human (examiner/proctor).",
        "AIエージェントは、タブ切り替えマトリクスの境界値テストケース生成（例：閾値境界を正確にテストするため「タブ切り替え2回、間隔ちょうど5.01秒」というケースを自動提案する）、日次のIncidentログ分析による検知ルールが未対応の新たな不正パターンの提案、そして不正防止モデル変更後のリグレッション結果要約レポートの作成を担うことができます。責任境界は明確です：AIは最終スコアのロック（Score.status→LOCKED）や受験者の試験の自動失格を自律的に決定してはなりません——受験者に直接的な法的影響を及ぼすあらゆる行動は、必ず権限を持つ人間（試験官・監督者）による最終確認を必要とします。"
      ),
      UL(
        ["AI hỗ trợ: sinh ca biên, phân tích incident log, tóm tắt hồi quy mô hình", "AI KHÔNG được: tự khoá điểm cuối, tự huỷ bài thi, tự thay đổi barem", "Người giữ quyền: giám khảo xác nhận điểm tự luận, giám thị xác nhận incident nghiêm trọng"],
        ["AI-assisted: boundary case generation, incident log analysis, model regression summaries", "AI must NOT: auto-lock final scores, auto-disqualify exams, auto-modify the answer key", "Human-retained authority: examiner confirms open-ended scores, proctor confirms serious incidents"],
        ["AI支援：境界ケース生成、インシデントログ分析、モデルリグレッション要約", "AI禁止事項：最終スコアの自動ロック、試験の自動失格処分、正解表の自動変更", "人間が保持する権限：記述式スコアは試験官が確認、重大インシデントは監督者が確認"]
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao bạn thiết kế test để phân biệt giữa gian lận thật và hành vi vô tình (ví dụ mất tập trung, thông báo hệ thống)?",
        "How would you design tests to distinguish real cheating from innocent behavior (e.g., losing focus, a system notification popping up)?",
        "Tôi sẽ thiết kế ma trận ca dựa trên ngưỡng (threshold) thay vì cờ nhị phân: đo tần suất và thời lượng của sự kiện đáng ngờ (ví dụ số lần và thời gian rời tab), rồi kiểm thử các ca ở gần biên ngưỡng để đảm bảo hệ thống không báo oan (False Positive) khi hành vi dưới ngưỡng, đồng thời không bỏ lọt (False Negative) khi vượt ngưỡng rõ ràng. Tôi cũng sẽ dùng bộ dữ liệu gán nhãn thực tế để đo Precision/Recall thay vì chỉ kiểm thử từng ca đơn lẻ.",
        "I would design a case matrix based on thresholds rather than a binary flag: measuring the frequency and duration of suspicious events (e.g., number and length of tab-exits), then testing cases near the threshold boundary to ensure the system neither raises false alarms below the threshold nor misses clear violations above it. I would also use a real labeled dataset to measure Precision/Recall rather than only testing isolated cases.",
        "本物の不正と無意識の行動（集中力低下やシステム通知など）を区別するテストはどう設計しますか？",
        "私は、二値フラグではなく閾値に基づくケースマトリクスを設計します。疑わしいイベントの頻度と継続時間（タブ離脱の回数と時間など）を測定し、閾値の境界付近のケースをテストすることで、閾値未満では誤報（偽陽性）を出さず、閾値を明確に超えた場合は見逃さない（偽陰性を防ぐ）ことを保証します。また、個別ケースのテストだけでなく、実際のラベル付きデータセットを使ってPrecision/Recallを測定します。"
      ),
      QA(
        "Nếu phát hiện một lỗi khiến 500 bài thi đã chấm bị sai điểm do dùng nhầm barem cũ, bạn xử lý thế nào?",
        "If you discover a bug causing 500 already-graded exams to have incorrect scores due to using a stale answer key, how would you handle it?",
        "Trước tiên tôi sẽ dừng ngay việc phát hành chứng chỉ cho các bài bị ảnh hưởng và chạy job đối soát để xác định chính xác danh sách 500 phiên bị sai cùng mức chênh lệch điểm. Sau đó phối hợp với đội nghiệp vụ để chấm lại bằng barem đúng, thông báo minh bạch cho thí sinh bị ảnh hưởng, và bổ sung một ca kiểm thử hồi quy đảm bảo Grading Service luôn dùng snapshot barem tại thời điểm thi, không dùng bản hiện tại.",
        "First, I would immediately halt certificate issuance for affected exams and run the reconciliation job to precisely identify the 500 affected sessions and their score deltas. Then, I would work with the business team to regrade using the correct answer key, transparently notify affected candidates, and add a regression test case ensuring the Grading Service always uses the answer-key snapshot from exam time, never the current version.",
        "正解表の版が古かったために、既に採点済みの試験500件の点数が誤っているバグを発見したら、どう対応しますか？",
        "まず、影響を受けた試験の資格発行を直ちに停止し、照合ジョブを実行して影響を受けた500セッションとその点数差分を正確に特定します。その後、業務チームと連携して正しい正解表で再採点を行い、影響を受けた受験者に透明性を持って通知し、採点サービスが常に試験時点の正解表スナップショットを使用し、現行版を使用しないことを保証するリグレッションテストケースを追加します。"
      ),
      QA(
        "Bạn ưu tiên Precision hay Recall cao hơn cho hệ thống chống gian lận thi cử? Vì sao?",
        "For a cheat-detection system in exams, would you prioritize higher Precision or higher Recall? Why?",
        "Tôi ưu tiên Recall cao hơn một chút vì bỏ lọt gian lận thật (False Negative) gây hậu quả nghiêm trọng hơn về uy tín chứng chỉ so với việc báo oan (False Positive) — miễn là mọi cảnh báo đều đi qua bước xác nhận thủ công của giám thị trước khi kết luận cuối cùng, False Positive có thể được sửa mà không gây thiệt hại vĩnh viễn, trong khi False Negative đã lọt qua thì không thể phát hiện lại được nữa.",
        "I would prioritize slightly higher Recall, since missing real cheating (a False Negative) causes more severe damage to certificate credibility than a false alarm (False Positive) — as long as every alert goes through a proctor's manual confirmation before a final conclusion, a False Positive can be corrected without lasting harm, whereas a False Negative that slips through can never be caught again.",
        "試験の不正検知システムでは、PrecisionとRecallのどちらを優先しますか？その理由は？",
        "私はRecallをやや優先します。なぜなら、本物の不正の見逃し（偽陰性）は誤報（偽陽性）よりも資格の信頼性に深刻な損害を与えるからです。すべての警告が最終判断の前に監督者による手動確認を経る限り、偽陽性は恒久的な被害なく修正できますが、見逃された偽陰性は二度と検知できません。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi tình huống thực chiến",
        "Interviewer poses a real-world scenario",
        "Bạn là QA lead của hệ thống thi trực tuyến. Ba ngày trước kỳ thi lớn nhất năm, đội phát triển thêm tính năng cho phép thí sinh dùng điện thoại làm thiết bị giám sát thứ hai (quay góc nghiêng phòng thi). Bạn có 48 giờ để đánh giá rủi ro và quyết định có nên phát hành tính năng này kịp kỳ thi hay không. Bạn sẽ làm gì?",
        "You are the QA lead for an online exam system. Three days before the year's biggest exam, the dev team adds a feature letting candidates use a phone as a second monitoring device (recording a side angle of the exam room). You have 48 hours to assess the risk and decide whether to ship this feature in time for the exam. What would you do?",
        "面接官が実戦シナリオを問う",
        "あなたはオンライン試験システムのQAリードです。年間最大の試験の3日前、開発チームが受験者にスマートフォンを第二の監視端末として使わせる機能（試験室の側面角度を撮影する）を追加しました。あなたにはリスクを評価し、この機能を試験に間に合わせてリリースすべきか判断する48時間があります。どうしますか？"
      ),
      P(
        "Câu trả lời tốt cho tình huống trên cần thể hiện tư duy đánh giá rủi ro theo thời gian thực: đầu tiên xác định phạm vi tối thiểu khả thi (MVP) của tính năng — có thể chỉ bật tính năng này cho một nhóm nhỏ thí sinh tình nguyện thay vì toàn bộ, để giảm blast radius nếu có lỗi. Tiếp theo, tập trung kiểm thử vào các ca có tác động cao nhất trong thời gian ngắn: kết nối camera phụ ổn định, xử lý khi camera phụ mất tín hiệu giữa bài thi (không được coi là lỗi của thí sinh), và đảm bảo tính năng mới không làm chậm luồng nộp bài chính. Cuối cùng, chuẩn bị kế hoạch rollback tức thời và một quy trình thủ công dự phòng (giám thị xác nhận qua Zoom) trong trường hợp tính năng camera phụ gặp sự cố diện rộng.",
        "A strong answer to this scenario should demonstrate real-time risk-assessment thinking: first, define the feature's minimum viable scope — perhaps enabling it only for a small group of volunteer candidates rather than everyone, to reduce blast radius if something breaks. Next, focus testing on the highest-impact cases achievable in the short window: stable secondary-camera connection, graceful handling when the secondary camera loses signal mid-exam (must not be treated as the candidate's fault), and ensuring the new feature doesn't slow down the core submission flow. Finally, prepare an immediate rollback plan and a manual fallback process (proctor confirmation via Zoom) in case the secondary-camera feature fails at scale.",
        "この状況への良い回答は、リアルタイムのリスク評価思考を示す必要があります。まず、機能の最小限の実行可能範囲（MVP）を定義します——不具合が起きた際の影響範囲を減らすため、全受験者ではなく少数の希望者グループのみに限定して有効化する案です。次に、短期間で達成可能な最も影響の大きいケースにテストを集中させます：第二カメラの接続安定性、試験中に第二カメラの信号が途切れた場合の適切な処理（受験者の過失として扱ってはならない）、そして新機能がメインの提出フローを遅延させないことの確認です。最後に、第二カメラ機能が大規模に不具合を起こした場合に備え、即時ロールバック計画と手動の代替プロセス（Zoom経由での監督者確認）を準備します。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán thi trực tuyến chứng minh rằng kiểm thử phần mềm giáo dục không chỉ dừng ở việc trang hiển thị đúng câu hỏi, mà phải bảo vệ được ba trụ cột: tính toàn vẹn của bài nộp (không mất dữ liệu), tính chính xác tuyệt đối của điểm số (đối soát được, tái tạo được), và độ tin cậy của cơ chế chống gian lận (cân bằng Precision/Recall một cách có chủ đích). Toàn bộ chiến lược kiểm thử xoay quanh nguyên tắc oracle-first: mọi khẳng định 'đúng' phải quy về một bất biến nghiệp vụ đo được, không phải một thông báo giao diện.",
        "The online-exam problem demonstrates that testing educational software goes far beyond verifying the correct question is displayed — it must protect three pillars: submission integrity (no data loss), absolute score accuracy (reconcilable, reproducible), and the reliability of the anti-cheat mechanism (a deliberate Precision/Recall balance). The entire test strategy revolves around the oracle-first principle: every claim of correctness must reduce to a measurable business invariant, not a UI success message.",
        "オンライン試験という課題は、教育ソフトウェアのテストが正しい問題が表示されるかどうかの確認にとどまらないことを示しています。3つの柱を守る必要があります：提出の整合性（データ喪失なし）、点数の絶対的な正確性（照合可能・再現可能）、そして不正防止機構の信頼性（意図的なPrecision/Recallのバランス）です。テスト戦略全体は、オラクル優先の原則を中心に構成されます。つまり、あらゆる「正しい」という主張は、UIの成功メッセージではなく、測定可能な業務不変条件に帰着させなければなりません。"
      ),
      UL(
        ["Đã có oracle rõ ràng cho chấm điểm và phát hiện gian lận", "Đã kiểm thử ca lỗi: mất mạng, retry trùng, đa thiết bị", "Đã có job đối soát hằng đêm phát hiện sai lệch điểm dù nhỏ nhất", "Đã tách ranh giới AI agent khỏi quyết định có hệ quả pháp lý", "CI có gate riêng cho Precision/Recall của proctoring AI"],
        ["Clear oracle established for grading and cheat detection", "Failure cases tested: network loss, duplicate retry, multi-device", "Nightly reconciliation job in place to catch even the smallest score discrepancy", "AI agent boundary kept separate from legally consequential decisions", "CI has a dedicated gate for proctoring AI Precision/Recall"],
        ["採点と不正検知に明確なオラクルを確立済み", "異常系をテスト済み：ネットワーク断・重複リトライ・複数端末", "わずかな点数の食い違いも検知する夜間照合ジョブを整備済み", "AIエージェントの境界を法的影響を伴う意思決定から分離済み", "不正防止AIのPrecision/Recall専用のCIゲートを整備済み"]
      ),
      NOTE("Khi bàn giao, đính kèm bộ golden answer set và bộ video gán nhãn cho đội vận hành để họ có thể tự chạy lại đối soát bất cứ lúc nào có nghi ngờ.", "When handing over, attach the golden answer set and the labeled video dataset for the ops team so they can rerun reconciliation any time a doubt arises.", "引き継ぎ時には、疑義が生じた際にいつでも運用チームが自ら照合を再実行できるよう、ゴールデン正解セットとラベル付き動画データセットを添付してください。"),
    ],
  },
];

const art1 = {
  categorySlug: "enterprise-realworld",
  slug: "edtech-online-exam-anticheat",
  cover: cover1,
  tags: tags("thucchien", "edtech", "playwright", "api", "security", "realworld"),
  title: {
    vi: "Thực chiến: kiểm thử thi trực tuyến, chấm điểm tự động & chống gian lận (proctoring)",
    en: "Enterprise: testing online exams, automated grading & anti-cheat proctoring",
    ja: "実戦：オンライン試験・自動採点・不正防止（プロクタリング）のテスト",
  },
  summary: {
    vi: "Bài sâu: bối cảnh thi trực tuyến, kiến trúc, bất biến chấm điểm, test plan, ma trận ca, code chống gian lận, đối soát, CI, AI, phỏng vấn.",
    en: "Deep dive: online exam context, architecture, grading invariants, test plan, case matrix, anti-cheat code, reconciliation, CI, AI, interview.",
    ja: "詳細：オンライン試験の背景・アーキテクチャ・採点不変条件・テスト計画・ケース表・不正防止コード・照合・CI・AI・面接。",
  },
  pages: buildDoc(pages1),
};

// ============================================================================================
// BÀI 2: TravelTech — Đặt vé/giữ chỗ, chống double-booking khi đồng thời cao
// ============================================================================================

const cover2 = makeThumb({ id: "trv-book-02", domain: "ecommerce", kind: "thucchien", label: "実戦 · BOOKING" });

const svg2Arch = `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="280" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc đặt vé/giữ chỗ · Booking & hold architecture</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="75" y="78" text-anchor="middle">Booking Client</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="215" y="72" text-anchor="middle">Booking API</text><text x="215" y="86" text-anchor="middle">Gateway</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="355" y="72" text-anchor="middle">Inventory</text><text x="355" y="86" text-anchor="middle">Lock Service</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="495" y="72" text-anchor="middle">Hold Expiry</text><text x="495" y="86" text-anchor="middle">Scheduler</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="635" y="72" text-anchor="middle">Payment</text><text x="635" y="86" text-anchor="middle">Service</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440 M550 73 H580" stroke="#94a3b8" stroke-width="2" marker-end="url(#a2)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="215" y="152" text-anchor="middle">Seat/Room</text><text x="215" y="166" text-anchor="middle">Inventory DB</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="355" y="152" text-anchor="middle">Hold Ledger</text><text x="355" y="166" text-anchor="middle">(TTL/expiry)</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="495" y="152" text-anchor="middle">Booking</text><text x="495" y="166" text-anchor="middle">State Store</text>
<rect x="580" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="635" y="152" text-anchor="middle">Ledger</text><text x="635" y="166" text-anchor="middle">(payment log)</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130 M635 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="180" y="210" width="360" height="42" rx="8" fill="#052e2b" stroke="#34d399"/><text x="360" y="236" text-anchor="middle" fill="#6ee7b7">Bất biến: 1 ghế/phòng chỉ thuộc về đúng 1 booking hiệu lực tại một thời điểm</text>
</g>
<defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg2Matrix = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca đặt vé/giữ chỗ · Booking case matrix</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="44" width="700" height="30" fill="#1e293b"/>
<text x="30" y="64">Ca</text><text x="160" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#0b1222"/><text x="30" y="94">TC-01 Giữ chỗ &amp; thanh toán đúng hạn</text><text x="160" y="94">Hold rồi pay trong TTL</text><text x="420" y="94">Booking=CONFIRMED, ghế trừ khỏi tồn kho</text><text x="620" y="94" fill="#34d399">TB</text>
<rect x="20" y="104" width="700" height="30" fill="#0b1222"/><text x="30" y="124">TC-02 2 request hold cùng 1 ghế</text><text x="160" y="124">Đồng thời, cùng seatId</text><text x="420" y="124">Chỉ 1 request thắng, request kia 409</text><text x="620" y="124" fill="#ef4444">Rất cao</text>
<rect x="20" y="134" width="700" height="30" fill="#0b1222"/><text x="30" y="154">TC-03 Hold hết hạn không thanh toán</text><text x="160" y="154">Quá TTL, không pay</text><text x="420" y="154">Ghế trả lại tồn kho, bookable lại</text><text x="620" y="154" fill="#f59e0b">Cao</text>
<rect x="20" y="164" width="700" height="30" fill="#0b1222"/><text x="30" y="184">TC-04 Pay đúng lúc hold hết hạn</text><text x="160" y="184">Request pay tới ở TTL biên</text><text x="420" y="184">Chỉ chấp nhận nếu pay đến trước thời điểm expiry xử lý</text><text x="620" y="184" fill="#ef4444">Rất cao</text>
<rect x="20" y="194" width="700" height="30" fill="#0b1222"/><text x="30" y="214">TC-05 Gửi thanh toán trùng (retry)</text><text x="160" y="214">Client retry do timeout mạng</text><text x="420" y="214">Idempotent — chỉ 1 giao dịch thanh toán được ghi</text><text x="620" y="214" fill="#f59e0b">Cao</text>
<rect x="20" y="224" width="700" height="30" fill="#0b1222"/><text x="30" y="244">TC-06 Huỷ booking sau khi CONFIRMED</text><text x="160" y="244">Huỷ trong chính sách hoàn tiền</text><text x="420" y="244">Ghế trả tồn kho, hoàn tiền đúng số tiền đã thu</text><text x="620" y="244" fill="#f59e0b">Cao</text>
<rect x="20" y="254" width="700" height="30" fill="#0b1222"/><text x="30" y="274">TC-07 Tải cao 500 req/s cùng chuyến</text><text x="160" y="274">Săn vé giờ cao điểm</text><text x="420" y="274">Không double-booking dù throughput lớn</text><text x="620" y="274" fill="#ef4444">Rất cao</text>
<rect x="20" y="284" width="700" height="30" fill="#0b1222"/><text x="30" y="304">TC-08 Tổng tiền vé nhiều hành khách</text><text x="160" y="304">Booking nhóm 4 ghế, phụ phí khác nhau</text><text x="420" y="304">Tổng tiền = Σ(giá ghế + phụ phí), khớp hoá đơn</text><text x="620" y="304" fill="#34d399">TB</text>
</g>
</svg>`;

const pages2 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một nền tảng du lịch trực tuyến (OTA) bán vé máy bay nội địa, phòng khách sạn và tour ghép, xử lý trung bình 40.000 giao dịch đặt chỗ mỗi ngày, riêng đợt khuyến mãi Tết hoặc hè có thể vọt lên 300.000 giao dịch trong một ngày duy nhất. Mỗi giao dịch trải qua hai bước bắt buộc: giữ chỗ tạm thời (hold) trong một khoảng thời gian sống nhất định (thường 10–15 phút) để khách hoàn tất thanh toán, và xác nhận cuối cùng (confirm) khi thanh toán thành công. Nếu hệ thống giữ chỗ sai — cho phép hai khách hàng cùng giữ một ghế máy bay hạng thương gia cuối cùng hoặc cùng một phòng suite duy nhất còn trống — hậu quả không chỉ là hoàn tiền và bồi thường mà còn là mất uy tín với đối tác hãng bay/khách sạn, những đơn vị đã tin tưởng giao tồn kho thực cho nền tảng quản lý. Một sàn OTA khu vực từng phải bồi thường hàng loạt và tạm ngừng bán vé của một hãng bay đối tác trong 2 tuần sau sự cố double-booking hàng loạt vào đợt cao điểm lễ.",
        "An online travel agency (OTA) selling domestic flights, hotel rooms, and package tours processes an average of 40,000 booking transactions per day, spiking to as many as 300,000 transactions in a single day during Tet or summer promotions. Every transaction goes through two mandatory steps: a temporary hold with a fixed time-to-live (typically 10–15 minutes) to let the customer complete payment, and a final confirmation once payment succeeds. If the hold logic is wrong — allowing two customers to simultaneously hold the last business-class seat or the single remaining suite — the fallout is not just refunds and compensation but also loss of trust with airline/hotel partners who entrusted the platform with managing their real inventory. A regional OTA once had to pay mass compensation and was suspended from selling a partner airline's tickets for two weeks after a large-scale double-booking incident during a holiday peak.",
        "国内線航空券・ホテル客室・パッケージツアーを販売するオンライン旅行代理店（OTA）は、1日平均4万件の予約取引を処理しており、テトや夏季のプロモーション期間には1日で30万件に急増することもあります。すべての取引は2つの必須ステップを経ます：一定の有効期間（通常10〜15分）を持つ一時的な座席確保（ホールド）で顧客が決済を完了する時間を確保し、決済成功時に最終確定（コンファーム）を行います。もし座席確保ロジックに誤りがあれば——2人の顧客が最後のビジネスクラス座席や残り1室のスイートを同時に確保できてしまうなど——その結果は返金や補償にとどまらず、実在庫の管理をプラットフォームに委ねているパートナー航空会社・ホテルとの信頼喪失にもつながります。ある地域のOTAは、休暇のピーク時に大規模な二重予約事故を起こし、大量の補償と、提携航空会社の航空券販売を2週間停止させられた事例があります。"
      ),
      P(
        "Phạm vi bài viết bao trùm toàn bộ vòng đời một booking: tìm kiếm & khoá giá tạm thời, giữ chỗ (hold) với TTL rõ ràng, thanh toán, xác nhận cuối cùng, huỷ/hoàn tiền theo chính sách, và hậu kiểm đối soát tồn kho định kỳ. Ràng buộc nghiệp vụ quan trọng: mỗi ghế máy bay hoặc phòng khách sạn là một đơn vị tồn kho không thể chia nhỏ (indivisible unit) — không có khái niệm 'bán thừa 0.5 ghế'; và mọi thao tác ghi vào tồn kho phải đi qua một lớp khoá tập trung (Inventory Lock Service) để tránh race condition khi nhiều luồng đọc-sửa-ghi song song. Ràng buộc tuân thủ gồm: log giao dịch giữ chỗ/huỷ phải lưu tối thiểu 1 năm để phục vụ tranh chấp khiếu nại, và số tiền hoàn trả phải khớp chính xác với số tiền đã thu (không làm tròn sai lệch).",
        "The scope covers the full booking lifecycle: search & temporary price lock, hold with a clear TTL, payment, final confirmation, cancellation/refund per policy, and periodic inventory reconciliation. A key business constraint: each flight seat or hotel room is an indivisible inventory unit — there is no concept of 'overselling half a seat' — and every write to inventory must pass through a centralized locking layer (Inventory Lock Service) to prevent race conditions from concurrent read-modify-write threads. Compliance constraints include: hold/cancellation transaction logs must be retained for at least 1 year to support dispute resolution, and refund amounts must exactly match the amount collected (no rounding drift).",
        "本稿の範囲は、予約のライフサイクル全体をカバーします：検索と一時的な価格ロック、明確なTTLを持つ座席確保、決済、最終確定、ポリシーに基づくキャンセル・返金、そして定期的な在庫照合です。重要な業務制約として、航空券の座席やホテルの客室は分割不可能な在庫単位であり——「座席の0.5だけ売る」という概念は存在しません——在庫への書き込みはすべて、複数スレッドによる並行の読み取り・変更・書き込みで発生する競合状態を防ぐため、集中ロック層（在庫ロックサービス）を経由しなければなりません。コンプライアンス上の制約として、座席確保・キャンセルの取引ログは紛争解決に備え最低1年間保存する必要があり、返金額は徴収額と厳密に一致しなければなりません（丸め誤差は許されません）。"
      ),
      IMG(svg2Arch, "Kiến trúc đặt vé/giữ chỗ với Inventory Lock Service và Hold Expiry Scheduler", "Booking/hold architecture with Inventory Lock Service and Hold Expiry Scheduler", "在庫ロックサービスとホールド有効期限スケジューラから成る予約・座席確保アーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử API cho luồng hold/pay/confirm/cancel và service khoá tồn kho", "Kiểm thử đồng thời (concurrency) mô phỏng nhiều khách cùng giữ 1 ghế/phòng", "Kiểm thử k6 cho tải cao giờ cao điểm săn vé khuyến mãi"],
        ["API testing for the hold/pay/confirm/cancel flow and the inventory lock service", "Concurrency testing simulating multiple customers holding the same seat/room simultaneously", "k6 load testing for high-traffic promotional booking windows"],
        ["ホールド／決済／確定／キャンセルフローと在庫ロックサービスのAPIテスト", "複数の顧客が同一座席・客室を同時に確保しようとする並行テスト", "プロモーション予約の高負荷時間帯を想定したk6負荷テスト"]
      ),
      NOTE("Bài này giả định hệ thống có test-only endpoint để tạo dữ liệu tồn kho (chuyến bay/phòng) cố định và reset trạng thái hold/booking giữa các lần chạy.", "This article assumes the system exposes test-only endpoints to seed fixed inventory data (flights/rooms) and reset hold/booking state between runs.", "本稿では、固定された在庫データ（フライト・客室）を作成し、実行間でホールド・予約状態をリセットするテスト専用エンドポイントが存在することを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow", ja: "2. システムアーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 thành phần chính: Booking API Gateway (điều phối request từ client, sinh idempotency key cho mỗi thao tác ghi), Inventory Lock Service (giữ khoá phân tán theo seatId/roomId, đảm bảo chỉ một luồng được sửa trạng thái ghế tại một thời điểm), Hold Expiry Scheduler (quét định kỳ các hold quá TTL để tự động trả ghế về tồn kho), Payment Service (xử lý thanh toán, gắn liền idempotency key với giao dịch), và Booking State Store (lưu trạng thái booking theo máy trạng thái hữu hạn HOLD → PAID → CONFIRMED, hoặc HOLD → EXPIRED, hoặc CONFIRMED → CANCELLED). Luồng nghiệp vụ chuẩn: khách chọn ghế, Booking API gọi Inventory Lock Service để khoá ghế và tạo bản ghi Hold với expiresAt = now + TTL; nếu khoá thành công, khách được chuyển sang bước thanh toán; khi Payment Service xác nhận thu tiền thành công trước thời điểm expiresAt, booking chuyển sang CONFIRMED và ghế được trừ vĩnh viễn khỏi tồn kho khả dụng.",
        "The architecture has 5 core components: Booking API Gateway (routes client requests, generates an idempotency key for every write operation), Inventory Lock Service (holds a distributed lock keyed by seatId/roomId, ensuring only one thread can mutate a seat's state at any moment), Hold Expiry Scheduler (periodically scans holds past their TTL to automatically return seats to inventory), Payment Service (processes payment, binding an idempotency key to each transaction), and Booking State Store (tracks booking state through a finite state machine: HOLD → PAID → CONFIRMED, or HOLD → EXPIRED, or CONFIRMED → CANCELLED). The standard flow: a customer selects a seat, the Booking API calls the Inventory Lock Service to lock the seat and create a Hold record with expiresAt = now + TTL; if the lock succeeds, the customer proceeds to payment; when the Payment Service confirms successful collection before expiresAt, the booking transitions to CONFIRMED and the seat is permanently deducted from available inventory.",
        "アーキテクチャは5つの主要コンポーネントで構成されます：予約APIゲートウェイ（クライアントリクエストを振り分け、すべての書き込み操作に冪等性キーを発行）、在庫ロックサービス（seatId／roomId単位の分散ロックを保持し、ある時点で1つのスレッドのみが座席状態を変更できることを保証）、ホールド有効期限スケジューラ（TTLを超えたホールドを定期的にスキャンし、座席を自動的に在庫へ戻す）、決済サービス（決済を処理し、各取引に冪等性キーを紐づける）、予約状態ストア（HOLD→PAID→CONFIRMED、またはHOLD→EXPIRED、またはCONFIRMED→CANCELLEDという有限状態機械で予約状態を追跡）です。標準フローは次の通りです：顧客が座席を選択すると、予約APIは在庫ロックサービスを呼び出して座席をロックし、expiresAt=現在時刻+TTLを持つホールドレコードを作成します。ロックが成功すれば顧客は決済に進み、決済サービスがexpiresAt前に決済成功を確認すると、予約はCONFIRMEDに遷移し、座席は利用可能在庫から永久に差し引かれます。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất là kiểm chứng tính đúng đắn của khoá phân tán dưới tải đồng thời cao: hai request hold cùng một seatId gửi tới trong khoảng vài mili-giây phải có đúng một request thắng, request còn lại phải nhận lỗi rõ ràng (409 Conflict) thay vì cả hai đều 'thành công' rồi ghi đè lẫn nhau ở tầng dữ liệu — đây là lỗi race condition kinh điển mà kiểm thử tuần tự thông thường không bao giờ phát hiện được. Điểm khó thứ hai là xử lý biên thời gian: khi request thanh toán đến rất sát thời điểm hold hết hạn, hệ thống cần một quy tắc rõ ràng (ví dụ: chỉ chấp nhận nếu Payment Service ghi nhận thành công TRƯỚC khi Hold Expiry Scheduler xử lý bản ghi đó) để tránh tình trạng vừa hết hạn vừa được xác nhận thanh toán — hai trạng thái mâu thuẫn tồn tại song song. Cuối cùng, việc trả ghế về tồn kho khi hold hết hạn phải là thao tác nguyên tử (atomic) và idempotent, vì scheduler có thể quét trùng cùng một bản ghi ở hai lần chạy gần nhau do lỗi mạng hoặc restart.",
        "The hardest part is verifying the correctness of the distributed lock under high concurrent load: two hold requests for the same seatId arriving within milliseconds of each other must result in exactly one winner, with the other receiving a clear error (409 Conflict) rather than both 'succeeding' and overwriting each other at the data layer — this is the classic race condition that ordinary sequential testing never catches. The second difficulty is handling the time boundary: when a payment request arrives right at the edge of hold expiry, the system needs a clear rule (e.g., only accept if the Payment Service records success BEFORE the Hold Expiry Scheduler processes that record) to prevent a state where a hold is simultaneously expired and confirmed by payment — two contradictory states coexisting. Finally, returning a seat to inventory when a hold expires must be an atomic and idempotent operation, since the scheduler may scan the same record twice in close succession due to network errors or a restart.",
        "最も難しいのは、高い並行負荷下での分散ロックの正しさの検証です。同一seatIdに対する2つのホールドリクエストが数ミリ秒の間隔で到着した場合、必ずどちらか一方だけが勝者となり、もう一方は明確なエラー（409 Conflict）を受け取らなければなりません。両方が「成功」してデータ層で互いを上書きしてしまうことがあってはなりません——これは通常の逐次テストでは決して検知できない典型的な競合状態です。2つ目の難点は時間の境界処理です。決済リクエストがホールド有効期限のちょうど際どいタイミングで到着した場合、システムには明確なルール（例：決済サービスがホールド有効期限スケジューラによるそのレコードの処理より前に成功を記録した場合のみ受理する）が必要で、ホールドが期限切れであると同時に決済確定されるという矛盾した状態が並存するのを防ぎます。最後に、ホールド期限切れ時に座席を在庫へ戻す処理は、原子的かつ冪等でなければなりません。スケジューラがネットワークエラーや再起動により、近い時間に同じレコードを2回スキャンする可能性があるためです。"
      ),
      TIP("Luôn kiểm thử khoá phân tán bằng cách gửi N request đồng thời thật sự (Promise.all hoặc công cụ tải) chứ không phải N request tuần tự — race condition chỉ lộ diện khi có tranh chấp thời gian thực.", "Always test the distributed lock by sending N truly concurrent requests (Promise.all or a load tool), not N sequential requests — race conditions only surface under real-time contention.", "分散ロックのテストは、N件のリクエストを逐次送信するのではなく、真に同時（Promise.allや負荷ツール）に送信して行ってください——競合状態はリアルタイムの競り合いの中でしか表面化しません。"),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm 5 thực thể: Inventory (seatId/roomId, tripId, status AVAILABLE/HELD/SOLD), Hold (id, seatId, bookingId, createdAt, expiresAt, version), Booking (id, customerId, items, status HOLD/PAID/CONFIRMED/EXPIRED/CANCELLED, totalAmount), Payment (bookingId, amount, idempotencyKey, status), và AuditLog (mọi thay đổi trạng thái, ghi kèm actor và lý do). Bất biến quan trọng nhất — cũng là oracle chính của toàn bộ bài toán — là: tại mọi thời điểm, mỗi Inventory item chỉ được liên kết với đúng một Hold hoặc Booking đang hiệu lực (không EXPIRED, không CANCELLED); nói cách khác, không bao giờ tồn tại hai booking CONFIRMED cùng trỏ tới một seatId — đây chính là bất biến chống double-booking.",
        "The core data model has 5 entities: Inventory (seatId/roomId, tripId, status AVAILABLE/HELD/SOLD), Hold (id, seatId, bookingId, createdAt, expiresAt, version), Booking (id, customerId, items, status HOLD/PAID/CONFIRMED/EXPIRED/CANCELLED, totalAmount), Payment (bookingId, amount, idempotencyKey, status), and AuditLog (every state change, recorded with actor and reason). The most critical invariant — and the central oracle of the whole problem — is: at any point in time, each Inventory item is linked to at most one active Hold or Booking (not EXPIRED, not CANCELLED); in other words, two CONFIRMED bookings must never point to the same seatId — this is the core anti-double-booking invariant.",
        "コアデータモデルは5つのエンティティで構成されます：Inventory（seatId／roomId、tripId、状態AVAILABLE/HELD/SOLD）、Hold（id、seatId、bookingId、createdAt、expiresAt、version）、Booking（id、customerId、items、状態HOLD/PAID/CONFIRMED/EXPIRED/CANCELLED、totalAmount）、Payment（bookingId、amount、idempotencyKey、status）、AuditLog（すべての状態変更を、実行者と理由付きで記録）。最も重要な不変条件——本問題全体の中心となるオラクル——は次の通りです：いかなる時点においても、各Inventoryアイテムは有効な（EXPIREDでもCANCELLEDでもない）Holdまたは予約に最大1つしか紐づかない。つまり、2件のCONFIRMED予約が同一のseatIdを指すことは絶対にあってはなりません——これが二重予約防止の中核となる不変条件です。"
      ),
      UL(
        ["Bất biến 1: Không double-booking — 1 seatId chỉ có tối đa 1 Hold/Booking hiệu lực tại một thời điểm", "Bất biến 2: Hold hết hạn (expiresAt < now, chưa PAID) phải được trả về tồn kho AVAILABLE trong thời gian ngắn (SLA quét)", "Bất biến 3: Booking.totalAmount = Σ(giá từng item + phụ phí), khớp chính xác với Payment.amount đã thu", "Bất biến 4: Mọi thao tác pay/confirm/cancel đều idempotent theo idempotencyKey — gửi lại không tạo bản ghi trùng", "Bất biến 5: Trạng thái Booking chỉ đi theo đúng máy trạng thái hữu hạn, không có bước nhảy trái phép (ví dụ EXPIRED không thể chuyển thẳng sang CONFIRMED)"],
        ["Invariant 1: No double-booking — a seatId has at most 1 active Hold/Booking at any time", "Invariant 2: An expired hold (expiresAt < now, not PAID) must return to AVAILABLE inventory within a short scan SLA", "Invariant 3: Booking.totalAmount = Σ(per-item price + surcharges), exactly matching the collected Payment.amount", "Invariant 4: Every pay/confirm/cancel operation is idempotent by idempotencyKey — resending never creates a duplicate record", "Invariant 5: Booking state only follows the finite state machine, no illegal transitions (e.g., EXPIRED can never jump directly to CONFIRMED)"],
        ["不変条件1：二重予約なし——1つのseatIdは、ある時点で有効なHold／Bookingを最大1つしか持たない", "不変条件2：期限切れのホールド（expiresAt < now、未PAID）は、短いスキャンSLA内にAVAILABLE在庫へ戻される", "不変条件3：Booking.totalAmount = Σ（各アイテム価格+追加料金）は、徴収済みのPayment.amountと厳密に一致する", "不変条件4：すべてのpay/confirm/cancel操作はidempotencyKeyにより冪等であり、再送しても重複レコードは作成されない", "不変条件5：予約状態は有限状態機械に厳密に従い、不正な遷移は存在しない（例：EXPIREDから直接CONFIRMEDへ遷移することはできない）"]
      ),
      WARN("Nếu Hold Expiry Scheduler và luồng xác nhận thanh toán không dùng chung một điểm khoá (lock) trên cùng bản ghi Hold, một giao dịch có thể vừa được Payment Service xác nhận CONFIRMED vừa bị Scheduler đánh dấu EXPIRED cùng lúc — sinh ra booking ma (ghost booking) không nhất quán.", "If the Hold Expiry Scheduler and the payment-confirmation flow do not share the same lock point on the same Hold record, a transaction could simultaneously be confirmed CONFIRMED by the Payment Service and marked EXPIRED by the Scheduler — producing an inconsistent ghost booking.", "ホールド有効期限スケジューラと決済確定フローが同一のHoldレコードに対して同じロックポイントを共有していない場合、ある取引が決済サービスによってCONFIRMEDとされると同時に、スケジューラによってEXPIREDとマークされる可能性があります——一貫性のない幽霊予約（ゴーストブッキング）を生み出します。"),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất theo tác động tài chính/uy tín là double-booking (bán trùng cùng một ghế/phòng cho hai khách, buộc phải bồi thường và xin lỗi đối tác) và sai lệch tổng tiền vé (thu thiếu gây thất thoát doanh thu, thu thừa gây khiếu nại và ảnh hưởng pháp lý). Rủi ro cao thứ hai là hold không được trả về tồn kho đúng hạn — ghế 'bị treo' vô thời hạn khiến tồn kho ảo thấp hơn tồn kho thật, làm mất doanh thu bán được trong khi ghế thực tế vẫn trống. Rủi ro về hiệu năng xuất hiện rõ nhất vào các đợt mở bán khuyến mãi (flash sale) khi hàng chục nghìn khách cùng thao tác giữ chỗ trong vài giây đầu, tạo áp lực cực lớn lên Inventory Lock Service.",
        "The highest-impact risk, financially and reputationally, is double-booking (selling the same seat/room to two customers, forcing compensation and partner apologies) and incorrect total pricing (undercharging causes revenue leakage, overcharging causes disputes and legal exposure). The second-highest risk is holds not being returned to inventory on time — a seat 'stuck' indefinitely makes virtual inventory lower than real inventory, losing sellable revenue while the seat sits physically empty. Performance risk is most visible during flash-sale launches, when tens of thousands of customers attempt to hold seats within the first few seconds, placing extreme pressure on the Inventory Lock Service.",
        "財務・信頼性の観点で最もリスクが高いのは、二重予約（同一の座席・客室を2人の顧客に販売してしまい、補償とパートナーへの謝罪を強いられる）と、総額の誤り（過少請求は収益漏れを招き、過大請求は紛争と法的リスクを招く）です。次に高いリスクは、ホールドが期限内に在庫へ戻されないことです。座席が無期限に「宙づり」になると、仮想在庫が実在庫より少なくなり、実際には空席であるにもかかわらず販売可能な収益を失います。性能面のリスクは、フラッシュセール開始時に最も顕著に現れます。開始後の数秒間に数万人の顧客が座席確保を試み、在庫ロックサービスに極めて大きな負荷がかかります。"
      ),
      P(
        "Chiến lược kiểm thử áp dụng kim tự tháp: 60% test API/unit tập trung vào Inventory Lock Service và máy trạng thái Booking (nơi có logic tranh chấp phức tạp nhất, cần bao phủ boundary chính xác), 25% test đồng thời chuyên biệt (concurrency test) mô phỏng nhiều request tranh giành cùng một tài nguyên, và 15% test tải k6 mô phỏng kịch bản flash-sale thực tế để đo throughput tối đa mà vẫn giữ đúng bất biến không double-booking. Vai trò tham gia gồm QA Lead (thiết kế ma trận ca và ca đồng thời), Automation Engineer (Playwright + API + k6), và Business SME đại diện đối tác hãng bay/khách sạn xác nhận chính sách hoàn tiền/huỷ.",
        "The test strategy follows a pyramid: 60% API/unit tests focused on the Inventory Lock Service and the Booking state machine (where the most complex contention logic lives and precise boundary coverage matters most), 25% dedicated concurrency tests simulating multiple requests competing for the same resource, and 15% k6 load tests simulating realistic flash-sale scenarios to measure the maximum throughput that still preserves the no-double-booking invariant. Participating roles include the QA Lead (case matrix and concurrency-case design), Automation Engineer (Playwright + API + k6), and a Business SME representing airline/hotel partners confirming refund/cancellation policy.",
        "テスト戦略はピラミッド型を採用します：60%はAPI/ユニットテストで在庫ロックサービスと予約の状態機械（最も複雑な競合ロジックが存在し、正確な境界値カバレッジが最重要）に集中し、25%は同一リソースを奪い合う複数リクエストを再現する専用の並行テストで、15%は現実的なフラッシュセールシナリオを再現するk6負荷テストで、二重予約防止の不変条件を維持できる最大スループットを測定します。参加する役割には、QAリード（ケースマトリクスと並行ケースの設計）、自動化エンジニア（Playwright＋API＋k6）、そして返金・キャンセルポリシーを確認する航空会社・ホテルパートナー代表の業務SMEが含まれます。"
      ),
      UL(
        ["Rủi ro R1 (Rất cao): Double-booking khi 2 request hold cùng ghế gần như đồng thời", "Rủi ro R2 (Rất cao): Hold hết hạn không được scheduler trả về tồn kho đúng SLA", "Rủi ro R3 (Cao): Tổng tiền vé sai do tính phụ phí/thuế không nhất quán giữa các item", "Rủi ro R4 (Cao): Thanh toán trùng do client retry khi mạng chập chờn", "Rủi ro R5 (Trung bình): Inventory Lock Service nghẽn cổ chai giờ flash-sale"],
        ["Risk R1 (Very high): Double-booking from 2 near-simultaneous hold requests on the same seat", "Risk R2 (Very high): Expired hold not returned to inventory within SLA by the scheduler", "Risk R3 (High): Incorrect total price due to inconsistent surcharge/tax calculation across items", "Risk R4 (High): Duplicate payment from client retries during flaky network conditions", "Risk R5 (Medium): Inventory Lock Service becoming a bottleneck during flash-sale windows"],
        ["リスクR1（非常に高い）：同一座席へのほぼ同時の2件のホールドリクエストによる二重予約", "リスクR2（非常に高い）：期限切れホールドがスケジューラによりSLA内に在庫へ戻されない", "リスクR3（高い）：アイテム間で追加料金・税金の計算が不整合による総額の誤り", "リスクR4（高い）：ネットワーク不安定時のクライアントリトライによる重複決済", "リスクR5（中程度）：フラッシュセール時間帯における在庫ロックサービスのボトルネック化"]
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的テスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi trong: giữ chỗ và khoá tồn kho, thanh toán và xác nhận, hết hạn giữ chỗ, huỷ/hoàn tiền, và đối soát tồn kho hậu kỳ. Phạm vi ngoài: giao diện tìm kiếm/so sánh giá (thuộc đội search), tích hợp thanh toán bên thứ ba chi tiết (test riêng bằng contract test với cổng thanh toán). Tiêu chí đầu vào (entry criteria): môi trường staging có dữ liệu tồn kho mẫu (chuyến bay/phòng cố định), test-only endpoint sẵn sàng để tạo/reset tồn kho, TTL hold có thể cấu hình ngắn (ví dụ 5 giây) để rút ngắn thời gian chờ khi test timeout. Tiêu chí đầu ra (exit criteria): 100% ca ưu tiên cao PASS, không còn lỗi Sev1/Sev2 mở, kết quả k6 xác nhận 0 trường hợp double-booking ở mức tải mục tiêu (500 request/giây tranh chấp cùng 1 chuyến), và p95 latency của thao tác hold dưới 300ms.",
        "The test plan defines in-scope: holding and locking inventory, payment and confirmation, hold expiry, cancellation/refund, and post-hoc inventory reconciliation. Out-of-scope: the search/price-comparison UI (owned by the search team), detailed third-party payment gateway integration (tested separately via contract tests with the payment gateway). Entry criteria: a staging environment with sample inventory data (fixed flights/rooms), test-only endpoints ready to create/reset inventory, and a configurable short hold TTL (e.g., 5 seconds) to shorten wait times when testing timeouts. Exit criteria: 100% of high-priority cases PASS, no open Sev1/Sev2 defects, k6 results confirming zero double-booking cases at target load (500 requests/second contending for the same flight), and p95 latency for the hold operation under 300ms.",
        "テスト計画では、対象範囲を座席確保と在庫ロック・決済と確定・ホールド期限切れ・キャンセル/返金・事後の在庫照合と定めます。対象外は、検索・価格比較UI（検索チームの責任範囲）および詳細なサードパーティ決済ゲートウェイ連携（決済ゲートウェイとの契約テストで別途実施）です。開始基準（エントリー基準）は、サンプル在庫データ（固定フライト・客室）を含むステージング環境、在庫の作成・リセットが可能なテスト専用エンドポイント、タイムアウトテスト時の待機時間を短縮するための設定可能な短いホールドTTL（例：5秒）です。終了基準（エグジット基準）は、優先度高のケースが100%合格し、未解決のSev1/Sev2欠陥がなく、k6の結果が目標負荷（同一フライトに対する秒間500リクエストの競合）で二重予約ゼロ件を確認し、ホールド操作のp95レイテンシが300ミリ秒未満であることです。"
      ),
      P(
        "Chiến lược dữ liệu thử nghiệm dùng 3 lớp: (1) bộ chuyến bay/phòng cố định với số lượng ghế/phòng đã biết trước để kiểm thử chính xác tuyệt đối tồn kho còn lại, (2) kịch bản đồng thời tổng hợp mô phỏng N khách cùng tranh 1 ghế cuối cùng (N từ 2 đến 500), và (3) dữ liệu tải lớn mô phỏng một đợt flash-sale thực tế với phân bố lưu lượng tăng đột biến trong 10 giây đầu. Mỗi lớp dữ liệu đều có thể reset độc lập qua test-only endpoint để đảm bảo các lần chạy test không ảnh hưởng lẫn nhau.",
        "The test data strategy uses 3 layers: (1) a fixed set of flights/rooms with known seat/room counts to test absolute accuracy of remaining inventory, (2) synthesized concurrency scenarios simulating N customers contending for the same last seat (N from 2 to 500), and (3) large-scale load data simulating a realistic flash-sale with a traffic spike concentrated in the first 10 seconds. Each data layer can be reset independently via test-only endpoints to ensure test runs do not interfere with one another.",
        "テストデータ戦略は3層構成です：(1) 既知の座席・客室数を持つ固定フライト・客室セットで残り在庫の絶対的な正確性をテストする、(2) 最後の1席をN人（2〜500人）の顧客が同時に奪い合う合成された並行シナリオ、(3) 最初の10秒間にトラフィックが急増する現実的なフラッシュセールを再現する大規模負荷データ、の3つです。各データ層はテスト専用エンドポイント経由で独立してリセット可能であり、テスト実行同士が互いに影響しないことを保証します。"
      ),
      TIP("Cấu hình TTL hold ngắn (vài giây) riêng cho môi trường test để không phải chờ 10–15 phút thật mỗi lần kiểm thử kịch bản hết hạn.", "Configure a short hold TTL (a few seconds) specifically for the test environment so you don't have to wait a real 10–15 minutes for every expiry-scenario test.", "テスト環境専用に短いホールドTTL（数秒）を設定し、期限切れシナリオのテストのたびに実際の10〜15分を待つ必要がないようにしてください。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca dưới đây áp dụng kỹ thuật equivalence partitioning cho thời điểm thanh toán (trước hạn hold/đúng lúc hết hạn/sau hạn), decision table cho tổ hợp số lượng ghế còn lại × số request tranh chấp, và ca đồng thời chuyên biệt để kiểm chứng Inventory Lock Service dưới tải thực. Mỗi ca đều gắn với ít nhất một bất biến ở chương 3 để đảm bảo assert luôn dựa trên oracle nghiệp vụ — không double-booking, hold hết hạn trả kho, tổng tiền đúng, trạng thái nhất quán.",
        "The case matrix below applies equivalence partitioning to payment timing (before hold expiry/exactly at expiry/after expiry), a decision table for the combination of remaining seat count × number of contending requests, and dedicated concurrency cases to verify the Inventory Lock Service under real load. Every case is tied to at least one invariant from Chapter 3, ensuring assertions are always grounded in the business oracle — no double-booking, expired holds returned to inventory, correct totals, consistent state.",
        "以下のケースマトリクスは、決済タイミング（ホールド期限前・期限ちょうど・期限後）に同値分割技法を適用し、残り座席数×競合リクエスト数の組み合わせにデシジョンテーブルを適用し、実負荷下での在庫ロックサービスを検証する専用の並行ケースを含みます。各ケースは第3章の不変条件の少なくとも1つに紐づけられており、アサーションが常に業務オラクル——二重予約なし、期限切れホールドの在庫返却、正しい総額、一貫した状態——に基づくことを保証します。"
      ),
      IMG(svg2Matrix, "Ma trận ca kiểm thử đặt vé/giữ chỗ theo mức rủi ro", "Booking/hold test case matrix by risk level", "リスクレベル別の予約・座席確保テストケースマトリクス"),
      UL(
        ["Equivalence: pay trước hạn hold / đúng lúc hết hạn / sau hạn", "Decision table: 1 ghế còn lại×2 request, 1 ghế còn lại×500 request, nhiều ghế còn lại×N request", "Ca đồng thời: N request hold cùng 1 seatId gửi qua Promise.all", "Ca huỷ: huỷ trong chính sách hoàn tiền toàn phần vs huỷ ngoài chính sách (hoàn một phần)"],
        ["Equivalence: pay before hold expiry / exactly at expiry / after expiry", "Decision table: 1 seat left×2 requests, 1 seat left×500 requests, many seats left×N requests", "Concurrency case: N hold requests for the same seatId sent via Promise.all", "Cancellation case: cancel within full-refund policy vs. outside policy (partial refund)"],
        ["同値分割：ホールド期限前決済／期限ちょうど決済／期限後決済", "デシジョンテーブル：残り1席×2リクエスト、残り1席×500リクエスト、複数残席×Nリクエスト", "並行ケース：Promise.all経由で送信される同一seatIdへのN件のホールドリクエスト", "キャンセルケース：全額返金ポリシー内でのキャンセル対ポリシー外（一部返金）でのキャンセル"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & môi trường", en: "7. Data & environment preparation", ja: "7. データと環境の準備" },
    blocks: [
      P(
        "Môi trường staging cần một test-only endpoint `/test/inventory` cho phép tạo chuyến bay/phòng với số lượng ghế/phòng cố định đã biết trước, và cho phép cấu hình TTL hold ngắn (ví dụ 5 giây thay vì 15 phút) để rút ngắn thời gian chờ khi kiểm thử kịch bản hết hạn. Payment Service trong CI được thay bằng mock trả về kết quả xác định theo kịch bản đầu vào (ví dụ: amount khớp → SUCCESS, mã thẻ đặc biệt → TIMEOUT) để tách biệt hoàn toàn khỏi cổng thanh toán thật, tránh phụ thuộc mạng ngoài gây flaky. Dữ liệu chuyến bay dùng bộ cố định với 1 chuyến chỉ còn đúng 1 ghế trống (để test ca tranh chấp) và 1 chuyến còn nhiều ghế (để test happy path không tranh chấp).",
        "The staging environment needs a test-only endpoint `/test/inventory` to create flights/rooms with a known fixed seat/room count, and to configure a short hold TTL (e.g., 5 seconds instead of 15 minutes) to shorten wait times when testing expiry scenarios. The Payment Service in CI is replaced with a mock returning deterministic results based on input scenario (e.g., matching amount → SUCCESS, a special test card → TIMEOUT), fully decoupled from the real payment gateway to avoid external network dependency and flakiness. Flight data uses a fixed set with one flight having exactly 1 seat left (to test contention cases) and one flight with many seats available (to test the uncontended happy path).",
        "ステージング環境には、既知の固定座席・客室数を持つフライト・客室を作成でき、短いホールドTTL（例：15分ではなく5秒）を設定できる、テスト専用エンドポイント`/test/inventory`が必要です。これにより期限切れシナリオテスト時の待機時間を短縮できます。CI環境の決済サービスは、入力シナリオに応じて決定論的な結果を返すモックに置き換えられ（例：金額が一致すればSUCCESS、特別なテストカードならTIMEOUT）、実際の決済ゲートウェイから完全に切り離され、外部ネットワーク依存によるフレークを避けます。フライトデータは、残り座席がちょうど1席のフライト（競合ケース用）と、多くの座席が残っているフライト（競合なしの正常系用）を含む固定セットを使用します。"
      ),
      CODE("typescript", `// fixtures/booking.fixture.ts — seed tồn kho qua test-only endpoint, tách biệt dữ liệu mỗi test
import { test as base, APIRequestContext } from "@playwright/test";

type BookingFixtures = {
  lastSeatFlight: { tripId: string; seatId: string; price: number };
};

export const test = base.extend<BookingFixtures>({
  lastSeatFlight: async ({ request }, use) => {
    const res = await request.post("/test/inventory", {
      data: { tripId: "SGN-HAN-0701", seatCount: 1, holdTtlSec: 5, price: 1_200_000 }, // TTL rút ngắn để test nhanh
    });
    const body = await res.json();
    await use({ tripId: body.tripId, seatId: body.seatIds[0], price: body.price });
    await request.post(\`/test/inventory/\${body.tripId}/reset\`); // dọn dẹp sau test
  },
});
export { expect } from "@playwright/test";`),
      NOTE("Không bao giờ trỏ test tự động vào tồn kho thật của hãng bay/khách sạn đối tác — luôn dùng tripId/seatId được tạo riêng qua test-only endpoint để tránh khoá nhầm ghế thật.", "Never point automated tests at a real airline/hotel partner's production inventory — always use tripId/seatId created via test-only endpoints to avoid locking real seats by mistake.", "自動テストを実際の航空会社・ホテルパートナーの本番在庫に向けて実行しないでください——実座席を誤ってロックしないよう、常にテスト専用エンドポイントで作成されたtripId／seatIdを使用してください。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：正常系" },
    blocks: [
      P(
        "Kịch bản happy path mô phỏng một khách đặt vé trọn vẹn: tìm chuyến, giữ chỗ (hold), thanh toán trong TTL, và kiểm tra booking chuyển đúng sang CONFIRMED với tổng tiền khớp giá niêm yết. Assertion không dừng ở việc UI hiển thị 'Đặt vé thành công' mà phải gọi API kiểm tra Booking.status, Booking.totalAmount, và Inventory.status của chính seatId đó — đúng theo nguyên tắc oracle-first: mọi khẳng định đúng phải quy về trạng thái dữ liệu đo được, không phải thông báo giao diện.",
        "The happy-path scenario simulates a customer completing a full booking: searching a flight, holding a seat, paying within the TTL, and verifying the booking correctly transitions to CONFIRMED with a total amount matching the listed price. The assertion does not stop at the UI showing 'Booking successful' — it must call the API to check Booking.status, Booking.totalAmount, and the Inventory.status of that exact seatId, following the oracle-first principle: every claim of correctness must reduce to a measurable data state, not a UI message.",
        "正常系シナリオは、顧客がフライト検索・座席確保・TTL内での決済を行い、予約が正しくCONFIRMEDへ遷移し、総額が表示価格と一致することを検証する、予約を完遂する流れを再現します。アサーションはUIに「予約成功」と表示されるだけでは終わらず、オラクル優先の原則に従い、そのseatIdのBooking.status・Booking.totalAmount・Inventory.statusをAPIで検証する必要があります。あらゆる「正しい」という主張は、UIメッセージではなく測定可能なデータ状態に帰着させなければなりません。"
      ),
      CODE("typescript", `// e2e/booking-happy-path.spec.ts
import { test, expect } from "../fixtures/booking.fixture";

test("khách giữ chỗ, thanh toán trong TTL và booking chuyển CONFIRMED đúng tổng tiền", async ({ page, request, lastSeatFlight }) => {
  await page.goto(\`/flights/\${lastSeatFlight.tripId}\`);
  await page.getByTestId(\`seat-\${lastSeatFlight.seatId}\`).click();
  await page.getByRole("button", { name: "Giữ chỗ" }).click();
  await expect(page.getByTestId("hold-status")).toHaveText("Đã giữ chỗ"); // xác nhận Hold tạo thành công

  await page.getByRole("button", { name: "Thanh toán" }).click();
  await page.getByLabel("Số thẻ").fill("4111111111111111");
  await page.getByRole("button", { name: "Xác nhận thanh toán" }).click();
  await expect(page.getByTestId("booking-status")).toHaveText("Đã xác nhận");

  // Oracle: gọi thẳng API kiểm tra trạng thái booking + tồn kho — không tin UI
  const bookingId = await page.getByTestId("booking-id").textContent();
  const bookingRes = await request.get(\`/api/bookings/\${bookingId}\`);
  const booking = await bookingRes.json();
  expect(booking.status).toBe("CONFIRMED");
  expect(booking.totalAmount).toBeCloseTo(lastSeatFlight.price, 0);

  const invRes = await request.get(\`/api/inventory/\${lastSeatFlight.seatId}\`);
  const inv = await invRes.json();
  expect(inv.status).toBe("SOLD"); // ghế đã bán, không còn khả dụng
});`),
      TIP("Luôn assert `hold-status` ngay sau khi giữ chỗ trước khi chuyển sang bước thanh toán — đây là tín hiệu sớm phát hiện lỗi khoá tồn kho trước khi ảnh hưởng tới thanh toán.", "Always assert `hold-status` right after holding a seat before moving to the payment step — it is an early signal to catch inventory-lock bugs before they affect payment.", "座席確保の直後、決済ステップに進む前に必ず`hold-status`をアサートしてください——これは決済に影響が及ぶ前に在庫ロックの不具合を早期に検知する手がかりになります。"),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu: đồng thời/double-booking", en: "9. Deep failure cases: concurrency/double-booking", ja: "9. 高度な異常系：並行処理・二重予約" },
    blocks: [
      P(
        "Ca lỗi đồng thời là nơi tạo ra giá trị cao nhất cho một bài toán đặt vé, vì đây chính là nơi nhà tuyển dụng và đội vận hành thực tế quan tâm nhất khi phỏng vấn hoặc điều tra sự cố double-booking. Bốn nhóm ca lỗi trọng tâm gồm: tranh chấp giữ chỗ đồng thời trên cùng 1 ghế (đảm bảo chỉ 1 người thắng), thanh toán trùng do retry (đảm bảo idempotency), thanh toán đến sát biên hết hạn hold (đảm bảo không có trạng thái mâu thuẫn), và tải cao nhiều request tranh chấp cùng lúc (đảm bảo khoá phân tán không rò rỉ dưới áp lực).",
        "Concurrency failure cases create the highest value for a booking problem, since this is exactly where hiring managers and operations teams focus most during interviews or double-booking incident investigations. Four key failure groups are: concurrent hold contention on the same seat (ensuring only one winner), duplicate payment from retries (ensuring idempotency), payment arriving right at the hold-expiry boundary (ensuring no contradictory state), and high load with many simultaneous contending requests (ensuring the distributed lock doesn't leak under pressure).",
        "並行処理の異常系は、予約問題において最も高い価値を生み出します。なぜなら、面接や二重予約事故の調査の際に採用担当者や運用チームが最も注目するのがまさにこの部分だからです。重要な異常系は4つのグループに分かれます：同一座席への同時ホールド競合（勝者が1人だけであることの確認）、リトライによる重複決済（冪等性の確認）、ホールド期限境界ちょうどに到着する決済（矛盾状態がないことの確認）、そして多数の同時競合リクエストによる高負荷（分散ロックが圧力下で漏れないことの確認）です。"
      ),
      CODE("typescript", `// api/booking-concurrent-hold.spec.ts — N request hold cùng 1 ghế cuối cùng, chỉ 1 thắng
import { test, expect } from "../fixtures/booking.fixture";

test("10 request hold đồng thời cùng 1 ghế cuối: chỉ đúng 1 thắng, 9 nhận 409", async ({ request, lastSeatFlight }) => {
  const attempts = Array.from({ length: 10 }, (_, i) =>
    request.post(\`/api/inventory/\${lastSeatFlight.seatId}/hold\`, {
      data: { customerId: \`cust-\${i}\` },
      headers: { "Idempotency-Key": \`hold-attempt-\${i}\` },
    })
  );
  const results = await Promise.all(attempts);
  const statuses = results.map((r) => r.status());

  // Oracle: đúng 1 request 201 (thắng), còn lại 409 (Conflict) — không có 2 request cùng 200/201
  expect(statuses.filter((s) => s === 201).length).toBe(1);
  expect(statuses.filter((s) => s === 409).length).toBe(9);

  const invRes = await request.get(\`/api/inventory/\${lastSeatFlight.seatId}\`);
  const inv = await invRes.json();
  expect(inv.status).toBe("HELD"); // chỉ 1 hold hiệu lực duy nhất tồn tại
});`),
      CODE("typescript", `// api/booking-idempotent-payment.spec.ts — 2 request thanh toán trùng do client retry
import { test, expect } from "../fixtures/booking.fixture";

test("gửi thanh toán trùng 2 lần chỉ tạo 1 giao dịch PAID", async ({ request, lastSeatFlight }) => {
  const holdRes = await request.post(\`/api/inventory/\${lastSeatFlight.seatId}/hold\`, { data: { customerId: "cust-1" } });
  const { bookingId } = await holdRes.json();
  const idemKey = \`pay-\${bookingId}\`;

  const [r1, r2] = await Promise.all([
    request.post(\`/api/bookings/\${bookingId}/pay\`, { headers: { "Idempotency-Key": idemKey }, data: { amount: lastSeatFlight.price } }),
    request.post(\`/api/bookings/\${bookingId}/pay\`, { headers: { "Idempotency-Key": idemKey }, data: { amount: lastSeatFlight.price } }),
  ]);
  expect([r1.status(), r2.status()].sort()).toEqual([200, 200]); // cả 2 đều trả 200 nhưng...

  const payments = await (await request.get(\`/api/bookings/\${bookingId}/payments\`)).json();
  expect(payments.filter((p: any) => p.status === "PAID").length).toBe(1); // ... chỉ 1 giao dịch PAID thật sự
});`),
      CODE("typescript", `// api/booking-expiry-boundary.spec.ts — thanh toán đến đúng lúc hold hết hạn
import { test, expect } from "../fixtures/booking.fixture";

test("pay đến ngay trước thời điểm scheduler xử lý expiry vẫn CONFIRMED, không mâu thuẫn với EXPIRED", async ({ request, lastSeatFlight }) => {
  const holdRes = await request.post(\`/api/inventory/\${lastSeatFlight.seatId}/hold\`, {
    data: { customerId: "cust-edge", ttlSec: 2 }, // TTL rất ngắn để test biên
  });
  const { bookingId } = await holdRes.json();

  await new Promise((r) => setTimeout(r, 1800)); // chờ gần sát 2s TTL
  const payRes = await request.post(\`/api/bookings/\${bookingId}/pay\`, { data: { amount: lastSeatFlight.price } });

  // Oracle: nếu pay đến trước khi scheduler xử lý, booking phải CONFIRMED — không được vừa EXPIRED vừa CONFIRMED
  const bookingRes = await request.get(\`/api/bookings/\${bookingId}\`);
  const booking = await bookingRes.json();
  if (payRes.status() === 200) {
    expect(booking.status).toBe("CONFIRMED");
  } else {
    expect(booking.status).toBe("EXPIRED"); // nếu pay trễ, trạng thái phải nhất quán là EXPIRED, không phải trạng thái lửng lơ
  }
});`),
      WARN("Nếu chỉ kiểm thử tranh chấp giữ chỗ bằng 1 request tuần tự, sẽ KHÔNG phát hiện được race condition thật xảy ra khi nhiều request tới gần như đồng thời — phải test với Promise.all hoặc công cụ tạo tải song song thật sự.", "Testing hold contention with a single sequential request will NOT catch the real race condition that occurs when multiple requests arrive nearly simultaneously — test with Promise.all or a genuine concurrent load tool.", "座席確保の競合を単一の逐次リクエストだけでテストすると、複数のリクエストがほぼ同時に到着した際に発生する本物の競合状態を検知できません——Promise.allや真に並行な負荷ツールでテストする必要があります。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm & đối soát chỗ", en: "10. Post-hoc reconciliation", ja: "10. 事後照合" },
    blocks: [
      P(
        "Sau mỗi khung giờ giao dịch, một job đối soát (reconciliation batch) chạy định kỳ (mỗi 15 phút vào giờ cao điểm, hằng đêm ở giờ thường) để so sánh số ghế/phòng đang HELD hoặc SOLD trong Inventory với tổng số Hold/Booking đang hiệu lực trong Booking State Store — bất kỳ sai lệch nào (thừa hoặc thiếu dù chỉ 1 đơn vị) đều được coi là lỗi nghiêm trọng cần điều tra ngay, vì đây chính là dấu hiệu double-booking hoặc ghế bị 'treo' vĩnh viễn. Job này cũng kiểm tra chéo rằng không có Hold nào ở trạng thái HOLD quá TTL + biên an toàn (ví dụ TTL + 60 giây) mà chưa được Scheduler xử lý, và tổng Payment.amount theo từng Booking phải khớp chính xác với Booking.totalAmount đã ghi nhận.",
        "After each trading window, a reconciliation batch job runs periodically (every 15 minutes during peak hours, nightly otherwise) to compare the count of HELD or SOLD seats/rooms in Inventory against the total number of active Holds/Bookings in the Booking State Store — any discrepancy (surplus or deficit, even by a single unit) is treated as a serious defect requiring immediate investigation, since it is a direct signal of double-booking or a seat stuck indefinitely. This job also cross-checks that no Hold remains in the HOLD state beyond TTL plus a safety margin (e.g., TTL + 60 seconds) without having been processed by the Scheduler, and that the sum of Payment.amount per Booking exactly matches the recorded Booking.totalAmount.",
        "各取引時間帯の後、照合バッチジョブが定期的に実行され（ピーク時は15分ごと、それ以外は夜間）、Inventory内のHELDまたはSOLD状態の座席・客室数を、予約状態ストア内の有効なHold・予約の総数と比較します。わずか1単位でも過不足があれば、直ちに調査が必要な重大な欠陥として扱われます。これは二重予約や座席が永久に「宙づり」になっている兆候を直接示すものだからです。このジョブはまた、TTLに安全マージン（例：TTL+60秒）を加えた時間を超えてもスケジューラにより処理されずHOLD状態のままのホールドが存在しないこと、そして予約ごとのPayment.amountの合計が記録されたBooking.totalAmountと厳密に一致することも相互確認します。"
      ),
      CODE("sql", `-- reconciliation.sql — đối soát tồn kho HELD/SOLD với Hold/Booking hiệu lực, chạy định kỳ
SELECT i.seat_id, i.status AS inventory_status, COUNT(h.id) AS active_holds, COUNT(b.id) AS active_bookings
FROM inventory i
LEFT JOIN holds h ON h.seat_id = i.seat_id AND h.expires_at > now() AND h.status = 'HOLD'
LEFT JOIN bookings b ON b.seat_id = i.seat_id AND b.status = 'CONFIRMED'
GROUP BY i.seat_id, i.status
HAVING
  (i.status = 'AVAILABLE' AND (COUNT(h.id) > 0 OR COUNT(b.id) > 0))  -- lệch: rảnh nhưng vẫn có hold/booking
  OR (i.status IN ('HELD','SOLD') AND COUNT(h.id) + COUNT(b.id) <> 1) -- lệch: không đúng 1 bản ghi hiệu lực
  OR (i.status IN ('HELD','SOLD') AND COUNT(h.id) + COUNT(b.id) > 1); -- double-booking thật sự`),
      NOTE("Đối soát nên chạy trên bản sao read-replica để không ảnh hưởng hiệu năng của hệ thống đặt vé đang phục vụ khách thật.", "Reconciliation should run against a read-replica to avoid impacting the performance of the live booking system serving real customers.", "照合処理は、実際の顧客を処理中の稼働中予約システムの性能に影響を与えないよう、読み取り専用レプリカ上で実行すべきです。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD & kiểm thử tải k6", en: "11. CI/CD & k6 load testing", ja: "11. CI/CDとk6負荷テスト" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit/API test cho Inventory Lock Service và máy trạng thái Booking (nhanh, chạy mọi PR), test đồng thời chuyên biệt mô phỏng tranh chấp ghế (chạy trên môi trường staging mỗi đêm), và job k6 mô phỏng flash-sale chạy hằng tuần để phát hiện suy giảm hiệu năng (performance regression) trước khi ảnh hưởng khách thật. Cổng chất lượng (quality gate) chặn merge nếu k6 phát hiện dù chỉ 1 trường hợp double-booking ở mức tải mục tiêu, vì đây là chỉ số nhạy cảm nhất với rủi ro tài chính và uy tín.",
        "The CI pipeline runs 3 parallel tiers: unit/API tests for the Inventory Lock Service and Booking state machine (fast, runs on every PR), dedicated concurrency tests simulating seat contention (running nightly on staging), and a weekly k6 job simulating a flash sale to catch performance regressions before they affect real customers. A quality gate blocks merges if k6 detects even a single double-booking case at target load, since this is the metric most sensitive to financial and reputational risk.",
        "CIパイプラインは3層を並行実行します：在庫ロックサービスと予約状態機械向けのユニット/APIテスト（高速、すべてのPRで実行）、座席競合を再現する専用の並行テスト（ステージング環境で毎晩実行）、そして実際の顧客に影響が及ぶ前に性能劣化（パフォーマンスリグレッション）を検知するための、フラッシュセールを再現する週次のk6ジョブです。品質ゲートは、目標負荷でk6がたとえ1件でも二重予約を検知した場合にマージをブロックします。これは財務・信頼性リスクに最も敏感な指標だからです。"
      ),
      CODE("javascript", `// k6/flash-sale-booking.js — mô phỏng flash-sale, kiểm tra không double-booking dưới tải
import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    flash_sale: {
      executor: "ramping-arrival-rate",
      startRate: 10,
      timeUnit: "1s",
      preAllocatedVUs: 600,
      stages: [
        { target: 500, duration: "10s" }, // tăng đột biến trong 10 giây đầu
        { target: 500, duration: "20s" },
        { target: 0, duration: "5s" },
      ],
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<300"], // p95 hold latency < 300ms
    checks: ["rate>0.999"],
  },
};

export default function () {
  const res = http.post(\`\${__ENV.BASE_URL}/api/inventory/SEAT-LAST-01/hold\`, JSON.stringify({ customerId: \`vu-\${__VU}-\${__ITER}\` }), {
    headers: { "Content-Type": "application/json" },
  });
  check(res, {
    "status hợp lệ (201 thắng hoặc 409 thua)": (r) => r.status === 201 || r.status === 409,
  });
}`),
      CODE("yaml", `# .github/workflows/booking-ci.yml
name: booking-ci
on: [pull_request]
jobs:
  lock-service-unit-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api -- --grep "inventory-lock|booking-state|reconciliation"

  concurrency-shard:
    needs: lock-service-unit-api
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api -- --grep "concurrent|idempotent|expiry-boundary"

  k6-flash-sale-gate:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: grafana/setup-k6-action@v1
      - run: k6 run k6/flash-sale-booking.js --env BASE_URL=https://staging.example.com
      - run: npm run verify:no-double-booking -- --tripId SGN-HAN-0701`),
      TIP("Tách riêng shard 'ca đồng thời' khỏi shard 'happy path' để khi phát hiện double-booking, đội biết ngay cần soi vào nhóm test nào trước.", "Keep the 'concurrency cases' shard separate from the 'happy path' shard, so when double-booking is detected the team immediately knows which test group to investigate first.", "『並行ケース』シャードを『正常系』シャードと分離しておくことで、二重予約が検知された際にチームがどのテストグループから調査すべきか即座に分かります。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent có thể đảm nhận việc sinh thêm ca kiểm thử biên cho ma trận đồng thời (ví dụ tự động đề xuất thêm ca 'thanh toán đến đúng mili-giây thứ 1999 trong TTL 2000ms' để kiểm tra chính xác biên hết hạn), phân tích log đối soát hằng ngày để phát hiện sớm mẫu lệch tồn kho lặp lại theo tuyến/khung giờ cụ thể, và soạn thảo báo cáo tóm tắt kết quả k6 sau mỗi lần đổi cấu hình Inventory Lock Service. Ranh giới trách nhiệm rõ ràng: AI KHÔNG được tự quyết định huỷ booking của khách hoặc tự động thay đổi TTL hold trong môi trường production — mọi thay đổi có hệ quả trực tiếp đến khách hàng hoặc doanh thu đều cần một người có thẩm quyền (Product/Ops Lead) xác nhận cuối cùng.",
        "AI agents can take on generating additional boundary test cases for the concurrency matrix (e.g., automatically proposing a case where payment arrives at exactly millisecond 1999 within a 2000ms TTL, to precisely test the expiry boundary), analyzing daily reconciliation logs to early-detect recurring inventory-discrepancy patterns by route or time window, and drafting k6 result summary reports after each Inventory Lock Service configuration change. The responsibility boundary is clear: AI must NOT autonomously decide to cancel a customer's booking or auto-modify hold TTL in production — every change with direct customer or revenue consequence requires final confirmation from an authorized human (Product/Ops Lead).",
        "AIエージェントは、並行処理マトリクスの境界値テストケース追加生成（例：2000ミリ秒のTTL内でちょうど1999ミリ秒目に決済が到着するケースを自動提案し、期限切れ境界を正確にテストする）、日次の照合ログ分析による特定の路線・時間帯で繰り返される在庫の食い違いパターンの早期発見、そして在庫ロックサービスの設定変更後のk6結果要約レポートの作成を担うことができます。責任境界は明確です：AIは顧客の予約キャンセルや、本番環境でのホールドTTLの自動変更を自律的に決定してはなりません——顧客または収益に直接影響する変更は、必ず権限を持つ人間（プロダクト／運用リード）による最終確認を必要とします。"
      ),
      UL(
        ["AI hỗ trợ: sinh ca biên đồng thời, phân tích log đối soát, tóm tắt kết quả k6", "AI KHÔNG được: tự huỷ booking khách, tự đổi TTL hold production, tự đổi chính sách hoàn tiền", "Người giữ quyền: Product/Ops Lead xác nhận thay đổi TTL, đội tài chính xác nhận bất thường đối soát"],
        ["AI-assisted: concurrency boundary case generation, reconciliation log analysis, k6 result summaries", "AI must NOT: auto-cancel customer bookings, auto-change production hold TTL, auto-change refund policy", "Human-retained authority: Product/Ops Lead confirms TTL changes, finance team confirms reconciliation anomalies"],
        ["AI支援：並行処理境界ケース生成、照合ログ分析、k6結果要約", "AI禁止事項：顧客予約の自動キャンセル、本番ホールドTTLの自動変更、返金ポリシーの自動変更", "人間が保持する権限：TTL変更はプロダクト／運用リードが確認、照合の異常は財務チームが確認"]
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao bạn kiểm thử để đảm bảo hệ thống đặt vé không bao giờ double-booking khi có hàng trăm request cùng tranh 1 ghế?",
        "How would you test to ensure a booking system never double-books when hundreds of requests contend for the same seat?",
        "Tôi sẽ viết ca test gửi thật sự đồng thời (dùng Promise.all hoặc công cụ tải như k6) hàng trăm request hold cùng 1 seatId, sau đó assert rằng đúng 1 request nhận mã thành công còn lại nhận 409 Conflict, đồng thời kiểm tra qua API rằng Inventory chỉ có đúng 1 bản ghi Hold/Booking hiệu lực cho seatId đó. Tôi sẽ không tin vào việc test tuần tự vì race condition chỉ lộ diện dưới tranh chấp thời gian thực; tôi cũng sẽ chạy lại ca này nhiều lần để loại trừ trường hợp may mắn không trúng race window.",
        "I would write test cases sending truly concurrent requests (using Promise.all or a load tool like k6) — hundreds of hold requests for the same seatId — then assert that exactly one request receives a success code while the rest receive 409 Conflict, and verify via API that Inventory has exactly one active Hold/Booking record for that seatId. I would not trust sequential testing since race conditions only surface under real-time contention; I would also rerun this case multiple times to rule out lucky runs that miss the race window.",
        "何百ものリクエストが同一座席を奪い合う状況で、予約システムが絶対に二重予約しないことをどうテストしますか？",
        "私は真に同時（Promise.allやk6のような負荷ツールを使用）に、同一seatIdへの何百ものホールドリクエストを送信するテストケースを書き、正確に1つのリクエストが成功コードを受け取り、残りが409 Conflictを受け取ることをアサートし、さらにAPI経由でそのseatIdに対してInventoryが正確に1つの有効なHold／Bookingレコードしか持たないことを検証します。逐次テストは信用しません。競合状態はリアルタイムの競り合いの中でしか表面化しないためです。また、競合ウィンドウを逃す幸運なケースを排除するため、このケースを複数回再実行します。"
      ),
      QA(
        "Nếu phát hiện một lỗi khiến 300 booking bị double-booking do Hold Expiry Scheduler và Payment Service không đồng bộ khoá, bạn xử lý thế nào?",
        "If you discover a bug causing 300 bookings to be double-booked because the Hold Expiry Scheduler and Payment Service are not lock-synchronized, how would you handle it?",
        "Trước tiên tôi sẽ dừng ngay việc bán vé cho các chuyến/phòng bị ảnh hưởng và chạy job đối soát để xác định chính xác danh sách 300 booking bị double-booking cùng thông tin khách hàng liên quan. Sau đó phối hợp với đội nghiệp vụ để quyết định phương án xử lý công bằng (ví dụ: ưu tiên khách xác nhận thanh toán trước, đền bù/nâng hạng cho khách còn lại), đồng thời sửa lỗi gốc bằng cách đảm bảo cả Scheduler và Payment Service đều thao tác qua cùng một điểm khoá trên bản ghi Hold, rồi bổ sung ca test đồng thời hồi quy cho đúng kịch bản này.",
        "First, I would immediately halt sales for the affected flights/rooms and run the reconciliation job to precisely identify the 300 double-booked reservations along with the affected customers. Then, I would work with the business team to decide a fair resolution (e.g., honoring whichever customer confirmed payment first, compensating/upgrading the other), fix the root cause by ensuring both the Scheduler and Payment Service operate through the same lock point on the Hold record, and add a regression concurrency test case for this exact scenario.",
        "ホールド有効期限スケジューラと決済サービスのロック同期が取れていないために、300件の予約が二重予約になるバグを発見したら、どう対応しますか？",
        "まず、影響を受けたフライト・客室の販売を直ちに停止し、照合ジョブを実行して二重予約になった300件の予約と関連する顧客情報を正確に特定します。その後、業務チームと連携して公平な対応方針を決定し（例：先に決済を確認した顧客を優先し、もう一方には補償・アップグレードを提供）、スケジューラと決済サービスの両方がHoldレコードに対して同じロックポイントを経由するよう根本原因を修正し、この正確なシナリオに対するリグレッション並行テストケースを追加します。"
      ),
      QA(
        "Bạn thiết kế test cho TTL hold hết hạn thế nào để vừa nhanh vừa đáng tin cậy trong CI?",
        "How would you design tests for hold TTL expiry so they are both fast and reliable in CI?",
        "Tôi sẽ dùng một test-only endpoint cho phép cấu hình TTL ngắn (vài giây) riêng cho môi trường test thay vì chờ TTL thật (10–15 phút), đồng thời chủ động chờ đủ thời gian TTL + biên an toàn nhỏ trước khi assert Inventory đã trả về AVAILABLE — tránh flaky do polling quá sớm. Tôi cũng sẽ thêm ca kiểm thử scheduler chạy idempotent: gọi xử lý expiry hai lần liên tiếp trên cùng một Hold đã hết hạn và xác nhận không có tác dụng phụ kép (ví dụ không cộng ghế về tồn kho hai lần).",
        "I would use a test-only endpoint that allows configuring a short TTL (a few seconds) specifically for the test environment instead of waiting for the real TTL (10–15 minutes), while proactively waiting the full TTL plus a small safety margin before asserting Inventory has returned to AVAILABLE — avoiding flakiness from polling too early. I would also add a test verifying the scheduler's idempotency: calling expiry processing twice in a row on the same expired Hold and confirming there is no double side effect (e.g., not adding the seat back to inventory twice).",
        "CIにおいて、ホールドTTLの期限切れテストを高速かつ信頼性高く設計するにはどうしますか？",
        "実際のTTL（10〜15分）を待つのではなく、テスト環境専用に短いTTL（数秒）を設定できるテスト専用エンドポイントを使用し、Inventoryが AVAILABLEに戻ったことをアサートする前に、TTLに小さな安全マージンを加えた時間を積極的に待機します——早すぎるポーリングによるフレークを避けるためです。また、スケジューラの冪等性を検証するテストも追加します：同一の期限切れHoldに対して期限切れ処理を連続2回呼び出し、二重の副作用（座席を在庫へ2回加算するなど）がないことを確認します。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi tình huống thực chiến",
        "Interviewer poses a real-world scenario",
        "Bạn là QA lead của hệ thống đặt vé máy bay. Ba ngày trước đợt mở bán khuyến mãi lớn nhất năm, đội phát triển thay đổi Inventory Lock Service từ khoá cấp database sang khoá phân tán dựa trên Redis để tăng throughput. Bạn có 48 giờ để đánh giá rủi ro và quyết định có nên phát hành thay đổi này kịp đợt mở bán hay không. Bạn sẽ làm gì?",
        "You are the QA lead for a flight booking system. Three days before the year's biggest promotional sale, the dev team switches the Inventory Lock Service from database-level locking to a Redis-based distributed lock to increase throughput. You have 48 hours to assess the risk and decide whether to ship this change in time for the sale. What would you do?",
        "面接官が実戦シナリオを問う",
        "あなたは航空券予約システムのQAリードです。年間最大のプロモーション販売開始の3日前、開発チームはスループットを向上させるため、在庫ロックサービスをデータベースレベルのロックからRedisベースの分散ロックに切り替えました。あなたにはリスクを評価し、この変更を販売開始に間に合わせてリリースすべきか判断する48時間があります。どうしますか？"
      ),
      P(
        "Câu trả lời tốt cho tình huống trên cần thể hiện tư duy đánh giá rủi ro theo thời gian thực và ưu tiên đúng trọng tâm: đầu tiên xác định đây là thay đổi ảnh hưởng trực tiếp đến bất biến quan trọng nhất (không double-booking), nên cần chạy ngay bộ ca kiểm thử đồng thời hiện có với tải mô phỏng đúng quy mô đợt mở bán (ví dụ 500 request/giây tranh chấp cùng 1 ghế) trên môi trường staging giống production nhất có thể. Tiếp theo, kiểm tra riêng các ca biên đặc thù của Redis lock (ví dụ: Redis failover giữa lúc đang giữ khoá, TTL của khoá Redis ngắn hơn TTL của hold nghiệp vụ dẫn đến khoá tự nhả trước khi giao dịch hoàn tất). Nếu phát hiện bất kỳ ca double-booking nào dù chỉ 1 lần trong hàng nghìn lần chạy, cần đề xuất hoãn triển khai hoặc bật kèm cờ tính năng (feature flag) để có thể rollback tức thời về khoá database cũ nếu sự cố xảy ra trong giờ mở bán thật.",
        "A strong answer to this scenario should demonstrate real-time risk-assessment thinking with the right priorities: first, recognize this change directly affects the most critical invariant (no double-booking), so the existing concurrency test suite must be run immediately at load matching the actual sale scale (e.g., 500 requests/second contending for the same seat) on a staging environment as close to production as possible. Next, specifically test edge cases unique to the Redis lock (e.g., Redis failover while a lock is held, or the Redis lock's TTL being shorter than the business hold TTL, causing the lock to release before the transaction completes). If even a single double-booking case is found across thousands of runs, recommend delaying the rollout or shipping behind a feature flag so it can be rolled back instantly to the old database lock if an incident occurs during the real sale window.",
        "この状況への良い回答は、リアルタイムのリスク評価思考と適切な優先順位付けを示す必要があります。まず、この変更が最も重要な不変条件（二重予約なし）に直接影響することを認識し、実際の販売規模に見合った負荷（例：同一座席への秒間500リクエストの競合）で、本番に可能な限り近いステージング環境において、既存の並行テストスイートを直ちに実行する必要があります。次に、Redisロック特有の境界ケースを個別にテストします（例：ロック保持中のRedisフェイルオーバー、Redisロックの TTLが業務上のホールドTTLより短く、取引完了前にロックが解放されてしまうケース）。何千回もの実行の中でたとえ1件でも二重予約ケースが見つかった場合は、展開の延期、またはフィーチャーフラグ付きでのリリースを提案し、実際の販売時間帯に事故が発生した場合に即座に旧来のデータベースロックへロールバックできるようにします。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán đặt vé/giữ chỗ chứng minh rằng kiểm thử phần mềm du lịch không chỉ dừng ở việc trang hiển thị đúng chuyến bay/phòng, mà phải bảo vệ được ba trụ cột: tính duy nhất của tồn kho (không double-booking dưới bất kỳ mức tải đồng thời nào), tính chính xác tuyệt đối của tổng tiền vé (khớp đối soát, không sai lệch dù nhỏ), và tính đáng tin cậy của cơ chế giữ chỗ có thời hạn (hold hết hạn phải trả về tồn kho đúng lúc, không treo vô thời hạn). Toàn bộ chiến lược kiểm thử xoay quanh nguyên tắc oracle-first: mọi khẳng định 'đặt vé thành công' phải quy về một bất biến nghiệp vụ đo được qua API và đối soát dữ liệu, không phải một thông báo giao diện.",
        "The booking/hold problem demonstrates that testing travel software goes far beyond verifying the correct flight/room is displayed — it must protect three pillars: inventory uniqueness (no double-booking under any level of concurrent load), absolute pricing accuracy (reconcilable, with zero drift), and the reliability of the time-bound hold mechanism (expired holds must return to inventory promptly, never stuck indefinitely). The entire test strategy revolves around the oracle-first principle: every claim of a 'successful booking' must reduce to a measurable business invariant verified via API and data reconciliation, not a UI message.",
        "予約・座席確保という課題は、旅行ソフトウェアのテストが正しいフライト・客室が表示されるかどうかの確認にとどまらないことを示しています。3つの柱を守る必要があります：在庫の一意性（いかなる並行負荷レベルでも二重予約なし）、料金総額の絶対的な正確性（照合可能で、ずれがゼロ）、そして時限付き座席確保機構の信頼性（期限切れのホールドは速やかに在庫へ戻され、無期限に宙づりにならない）です。テスト戦略全体は、オラクル優先の原則を中心に構成されます。つまり、あらゆる「予約成功」という主張は、UIメッセージではなく、APIとデータ照合によって検証可能な業務不変条件に帰着させなければなりません。"
      ),
      UL(
        ["Đã có oracle rõ ràng cho chống double-booking, hold hết hạn, và tổng tiền vé", "Đã kiểm thử ca lỗi: tranh chấp đồng thời, retry trùng, biên hết hạn hold", "Đã có job đối soát định kỳ phát hiện sai lệch tồn kho dù nhỏ nhất", "Đã có k6 gate chặn merge nếu phát hiện double-booking ở tải mục tiêu", "Đã tách ranh giới AI agent khỏi quyết định huỷ booking/đổi TTL production"],
        ["Clear oracle established for anti-double-booking, hold expiry, and total pricing", "Failure cases tested: concurrent contention, duplicate retry, hold-expiry boundary", "Periodic reconciliation job in place to catch even the smallest inventory discrepancy", "k6 gate blocks merges if double-booking is detected at target load", "AI agent boundary kept separate from booking-cancellation/production-TTL decisions"],
        ["二重予約防止・ホールド期限切れ・総額に明確なオラクルを確立済み", "異常系をテスト済み：同時競合・重複リトライ・ホールド期限境界", "わずかな在庫の食い違いも検知する定期照合ジョブを整備済み", "目標負荷で二重予約が検知された場合にマージをブロックするk6ゲートを整備済み", "AIエージェントの境界を予約キャンセル・本番TTL変更の意思決定から分離済み"]
      ),
      NOTE("Khi bàn giao, đính kèm bộ script k6 flash-sale và câu lệnh đối soát SQL cho đội vận hành để họ có thể tự chạy lại kiểm tra bất cứ lúc nào nghi ngờ có double-booking.", "When handing over, attach the k6 flash-sale script and the reconciliation SQL query for the ops team so they can rerun the check any time double-booking is suspected.", "引き継ぎ時には、二重予約が疑われる際にいつでも運用チームが自らチェックを再実行できるよう、k6フラッシュセールスクリプトと照合SQLクエリを添付してください。"),
    ],
  },
];

const art2 = {
  categorySlug: "enterprise-realworld",
  slug: "traveltech-booking-overbooking-prevention",
  cover: cover2,
  tags: tags("thucchien", "ecommerce", "api", "k6", "playwright", "realworld"),
  title: {
    vi: "Thực chiến: kiểm thử đặt vé/giữ chỗ du lịch & chống double-booking khi đồng thời cao",
    en: "Enterprise: testing travel booking/hold & preventing double-booking under high concurrency",
    ja: "実戦：旅行の予約・座席確保テストと高並行時の二重予約防止",
  },
  summary: {
    vi: "Bài sâu: bối cảnh đặt vé du lịch, kiến trúc, bất biến chống double-booking, test plan, ma trận ca, code đồng thời, đối soát tồn chỗ, CI/k6, AI, phỏng vấn.",
    en: "Deep dive: travel booking context, architecture, anti-double-booking invariants, test plan, case matrix, concurrency code, inventory reconciliation, CI/k6, AI, interview.",
    ja: "詳細：旅行予約の背景・アーキテクチャ・二重予約防止の不変条件・テスト計画・ケース表・並行処理コード・在庫照合・CI/k6・AI・面接。",
  },
  pages: buildDoc(pages2),
};

// ============================================================================================
// BÀI 3: Gaming — Kinh tế in-game (tiền/vật phẩm), IAP, chống gian lận/dupe, cân bằng
// ============================================================================================

const cover3 = makeThumb({ id: "gme-econ-03", domain: "saas", kind: "thucchien", label: "実戦 · GAME ECON" });

const svg3Arch = `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="300" rx="14" fill="#0f172a"/>
<text x="24" y="30" font-size="15" font-weight="800" fill="#e2e8f0">Kiến trúc kinh tế in-game · In-game economy architecture</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="75" y="72" text-anchor="middle">Game Client</text><text x="75" y="86" text-anchor="middle">(mobile)</text>
<rect x="160" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="215" y="72" text-anchor="middle">Store Gateway</text><text x="215" y="86" text-anchor="middle">(IAP receipt)</text>
<rect x="300" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8"/><text x="355" y="72" text-anchor="middle">Economy</text><text x="355" y="86" text-anchor="middle">Service</text>
<rect x="440" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#f59e0b"/><text x="495" y="72" text-anchor="middle">Anti-cheat</text><text x="495" y="86" text-anchor="middle">Engine</text>
<rect x="580" y="50" width="110" height="46" rx="8" fill="#1e293b" stroke="#34d399"/><text x="635" y="72" text-anchor="middle">App Store /</text><text x="635" y="86" text-anchor="middle">Play Billing</text>
<path d="M130 73 H160 M270 73 H300 M410 73 H440" stroke="#94a3b8" stroke-width="2" marker-end="url(#a3)"/>
<path d="M690 73 H580" stroke="#94a3b8" stroke-width="2" marker-end="url(#a3)"/>
<rect x="160" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="215" y="152" text-anchor="middle">Wallet Ledger</text><text x="215" y="166" text-anchor="middle">(append-only)</text>
<rect x="300" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="355" y="152" text-anchor="middle">Inventory</text><text x="355" y="166" text-anchor="middle">Store</text>
<rect x="440" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="495" y="152" text-anchor="middle">Idempotency</text><text x="495" y="166" text-anchor="middle">Key Store</text>
<rect x="580" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#a78bfa"/><text x="635" y="152" text-anchor="middle">Anomaly</text><text x="635" y="166" text-anchor="middle">Signal Queue</text>
<path d="M215 96 V130 M355 96 V130 M495 96 V130 M635 96 V130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/>
<rect x="180" y="230" width="360" height="42" rx="8" fill="#052e2b" stroke="#34d399"/><text x="360" y="256" text-anchor="middle" fill="#6ee7b7">Bất biến: không nhân đôi tiền/vật phẩm; IAP xử lý đúng 1 lần</text>
</g>
<defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/></marker></defs>
</svg>`;

const svg3Matrix = `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter,Arial">
<rect width="720" height="340" rx="14" fill="#0f172a"/>
<text x="24" y="28" font-size="14" font-weight="800" fill="#e2e8f0">Ma trận ca kinh tế in-game · In-game economy case matrix</text>
<g font-size="11" fill="#e2e8f0">
<rect x="20" y="44" width="700" height="30" fill="#1e293b"/>
<text x="30" y="64">Ca</text><text x="160" y="64">Điều kiện</text><text x="420" y="64">Kỳ vọng (oracle)</text><text x="620" y="64">Rủi ro</text>
<rect x="20" y="74" width="700" height="30" fill="#0b1222"/><text x="30" y="94">TC-01 Mua gói vàng thành công</text><text x="160" y="94">IAP hợp lệ, receipt chưa dùng</text><text x="420" y="94">Số dư += đúng gói, receipt đánh dấu consumed</text><text x="620" y="94" fill="#34d399">TB</text>
<rect x="20" y="104" width="700" height="30" fill="#0b1222"/><text x="30" y="124">TC-02 Callback IAP gửi lặp lại</text><text x="160" y="124">Store gửi lại webhook do timeout</text><text x="420" y="124">Idempotent — chỉ cộng đúng 1 lần dù nhận N lần</text><text x="620" y="124" fill="#ef4444">Rất cao</text>
<rect x="20" y="134" width="700" height="30" fill="#0b1222"/><text x="30" y="154">TC-03 Nhân đôi vật phẩm qua trade</text><text x="160" y="154">2 request trade đồng thời cùng item</text><text x="420" y="154">Item chỉ tồn tại ở đúng 1 chủ sở hữu sau giao dịch</text><text x="620" y="154" fill="#ef4444">Rất cao</text>
<rect x="20" y="164" width="700" height="30" fill="#0b1222"/><text x="30" y="184">TC-04 Chi tiêu vượt số dư</text><text x="160" y="184">Số dư 100, mua vật phẩm giá 150</text><text x="420" y="184">Từ chối giao dịch, số dư không đổi, không âm</text><text x="620" y="184" fill="#f59e0b">Cao</text>
<rect x="20" y="194" width="700" height="30" fill="#0b1222"/><text x="30" y="214">TC-05 Farming tốc độ bất thường</text><text x="160" y="214">Nhận vật phẩm nhanh gấp 50 lần trung vị</text><text x="420" y="214">Anti-cheat gắn cờ, giữ giao dịch chờ soát</text><text x="620" y="214" fill="#f59e0b">Cao</text>
<rect x="20" y="224" width="700" height="30" fill="#0b1222"/><text x="30" y="244">TC-06 Receipt IAP giả mạo</text><text x="160" y="244">Chữ ký receipt không khớp store</text><text x="420" y="244">Từ chối, không cộng vật phẩm, ghi incident</text><text x="620" y="244" fill="#ef4444">Rất cao</text>
<rect x="20" y="254" width="700" height="30" fill="#0b1222"/><text x="30" y="274">TC-07 Hoàn tiền (refund) sau khi đã dùng</text><text x="160" y="274">Store báo refund vật phẩm đã tiêu</text><text x="420" y="274">Trừ lại vật phẩm/tiền, cho phép số dư âm tạm ghi nợ</text><text x="620" y="274" fill="#f59e0b">Cao</text>
<rect x="20" y="284" width="700" height="30" fill="#0b1222"/><text x="30" y="304">TC-08 Đối soát kho cuối ngày</text><text x="160" y="304">Tổng phát sinh vs tổng ledger</text><text x="420" y="304">Sai lệch = 0, mọi lệch phải có nguyên nhân xác định</text><text x="620" y="304" fill="#34d399">TB</text>
</g>
</svg>`;

const pages3 = [
  {
    heading: { vi: "1. Bối cảnh doanh nghiệp & phạm vi", en: "1. Business context & scope", ja: "1. 事業背景と範囲" },
    blocks: [
      P(
        "Một studio game di động vận hành tựa game nhập vai theo lượt (turn-based RPG) với 4 triệu người chơi hoạt động hằng tháng, trong đó khoảng 6% người chơi thực hiện ít nhất một giao dịch mua trong ứng dụng (IAP) mỗi tháng, đóng góp phần lớn doanh thu của studio. Nền kinh tế trong game gồm hai loại tiền tệ (vàng kiếm được miễn phí qua chơi game, và kim cương mua bằng tiền thật hoặc nhận thưởng hiếm), cùng hàng trăm loại vật phẩm có thể giao dịch giữa người chơi (trang bị, thẻ bài, vật phẩm sự kiện giới hạn). Vì tiền và vật phẩm có thể quy đổi gián tiếp thành giá trị thực (qua chợ giao dịch của bên thứ ba hoặc trao đổi ngoài luồng), bất kỳ lỗ hổng nào cho phép nhân đôi (dupe) tiền hay vật phẩm đều tương đương với việc studio bị 'in tiền giả' ngay trong hệ thống của mình, phá vỡ toàn bộ cân bằng kinh tế và gây thiệt hại tài chính trực tiếp.",
        "A mobile game studio operates a turn-based RPG title with 4 million monthly active players, of which roughly 6% make at least one in-app purchase (IAP) each month, contributing the majority of the studio's revenue. The in-game economy has two currencies (gold earned for free through gameplay, and gems purchased with real money or awarded rarely), plus hundreds of tradeable item types (equipment, cards, limited-time event items). Because currency and items can be indirectly converted into real value (through third-party trading markets or off-platform exchanges), any vulnerability allowing currency or item duplication (dupe) is equivalent to the studio 'printing counterfeit money' inside its own system, collapsing the entire economic balance and causing direct financial damage.",
        "あるモバイルゲームスタジオは、月間アクティブユーザー400万人を抱えるターン制RPGタイトルを運営しており、そのうち約6％のプレイヤーが毎月少なくとも1回のアプリ内課金（IAP）を行い、スタジオの収益の大部分を占めています。ゲーム内経済には2種類の通貨（プレイで無料に稼げるゴールドと、実際のお金で購入するか稀に報酬として得られるジェム）があり、さらにプレイヤー間で取引可能な数百種類のアイテム（装備・カード・期間限定イベントアイテム）が存在します。通貨とアイテムは第三者の取引市場や非公式な交換を通じて間接的に実際の価値に換算され得るため、通貨やアイテムの複製（デュープ）を許してしまう脆弱性は、スタジオが自らのシステム内で「偽札を印刷する」に等しく、経済バランス全体を崩壊させ、直接的な財務損失をもたらします。"
      ),
      P(
        "Phạm vi bài viết bao trùm toàn bộ vòng đời một giao dịch kinh tế trong game: mua IAP qua App Store/Google Play, xử lý callback xác nhận thanh toán (receipt validation), cộng tiền/vật phẩm vào ví và kho đồ của người chơi, giao dịch trao đổi vật phẩm giữa hai người chơi, tiêu tiền để mua vật phẩm trong shop nội bộ, và hậu kiểm đối soát toàn bộ dòng tiền/vật phẩm phát sinh trong ngày. Ràng buộc nghiệp vụ quan trọng: mọi giao dịch tiền tệ phải có thể truy vết ngược (auditable) tới nguồn gốc phát sinh, và hệ thống phải chịu được việc App Store gửi lại cùng một callback xác nhận thanh toán nhiều lần (do timeout hoặc retry mạng) mà không cộng trùng phần thưởng — đây là bài toán idempotency kinh điển nhưng có hậu quả tài chính trực tiếp nếu làm sai.",
        "The scope covers the full lifecycle of an in-game economic transaction: IAP purchase via App Store/Google Play, processing the payment-confirmation callback (receipt validation), crediting currency/items to the player's wallet and inventory, item-trading transactions between two players, spending currency to buy items in the internal shop, and post-hoc reconciliation of all currency/item flows generated in a day. A key business constraint: every currency transaction must be auditable back to its originating source, and the system must tolerate the App Store resending the same payment-confirmation callback multiple times (due to timeout or network retry) without double-crediting the reward — a classic idempotency problem with direct financial consequences if handled incorrectly.",
        "本稿の範囲は、ゲーム内経済取引のライフサイクル全体をカバーします：App Store/Google Play経由のIAP購入、決済確認コールバック（レシート検証）の処理、プレイヤーのウォレットとインベントリへの通貨・アイテム付与、プレイヤー間のアイテム交換取引、ゲーム内ショップでの通貨消費によるアイテム購入、そして1日に発生した通貨・アイテムの流れ全体の事後照合です。重要な業務制約として、すべての通貨取引は発生源まで遡って監査可能でなければならず、App Storeがタイムアウトやネットワークリトライにより同じ決済確認コールバックを複数回送信しても、報酬を二重付与しないようシステムが耐えられる必要があります——これは典型的な冪等性の問題ですが、誤ると直接的な財務上の結果を招きます。"
      ),
      IMG(svg3Arch, "Kiến trúc kinh tế in-game với Economy Service, Anti-cheat Engine và Store Gateway", "In-game economy architecture with Economy Service, Anti-cheat Engine, and Store Gateway", "経済サービス・不正防止エンジン・ストアゲートウェイから成るアプリ内経済アーキテクチャ"),
      H("Phạm vi tự động hoá", "Scope of automation", "自動化の範囲"),
      UL(
        ["Kiểm thử API cho luồng IAP, xử lý callback, và ví/kho vật phẩm", "Kiểm thử Appium cho luồng mua hàng trên client di động thật", "Kiểm thử đồng thời cho giao dịch trade và chống dupe vật phẩm"],
        ["API testing for the IAP flow, callback handling, and wallet/inventory", "Appium testing for the purchase flow on real mobile clients", "Concurrency testing for trade transactions and item-dupe prevention"],
        ["IAPフロー・コールバック処理・ウォレット/インベントリのAPIテスト", "実機モバイルクライアントでの購入フローのAppiumテスト", "取引処理とアイテム複製防止の並行テスト"]
      ),
      NOTE("Bài này giả định hệ thống có mock Store Gateway (giả lập App Store/Google Play) cho môi trường test, tách biệt hoàn toàn khỏi luồng thanh toán thật để tránh phát sinh giao dịch tiền thật khi chạy test.", "This article assumes the system has a mock Store Gateway (simulating App Store/Google Play) for the test environment, fully decoupled from the real payment flow to avoid triggering real-money transactions during test runs.", "本稿では、テスト環境向けにモックストアゲートウェイ（App Store/Google Playを模擬）が存在し、テスト実行時に実際の課金取引が発生しないよう本番の決済フローから完全に分離されていることを前提とします。"),
    ],
  },
  {
    heading: { vi: "2. Kiến trúc hệ thống & luồng nghiệp vụ", en: "2. System architecture & business flow", ja: "2. システムアーキテクチャと業務フロー" },
    blocks: [
      P(
        "Kiến trúc gồm 5 thành phần chính: Store Gateway (nhận và xác thực receipt từ App Store/Google Play), Economy Service (xử lý logic cộng/trừ tiền và vật phẩm, là điểm trung tâm bắt buộc mọi thay đổi số dư phải đi qua), Anti-cheat Engine (phân tích tốc độ nhận vật phẩm, mẫu giao dịch bất thường), Wallet Ledger (sổ cái append-only ghi mọi biến động tiền tệ), và Inventory Store (kho vật phẩm của từng người chơi). Luồng IAP diễn ra như sau: người chơi bấm mua gói kim cương trên client, hệ thống thanh toán native của thiết bị xử lý giao dịch, sau đó cả client lẫn App Store đều có thể gửi xác nhận về Store Gateway — nghĩa là hệ thống backend phải chủ động coi việc nhận được 2 xác nhận cho cùng 1 giao dịch là tình huống BÌNH THƯỜNG, không phải ngoại lệ hiếm gặp.",
        "The architecture has 5 core components: Store Gateway (receives and validates receipts from App Store/Google Play), Economy Service (handles currency and item credit/debit logic, the mandatory central point every balance change must pass through), Anti-cheat Engine (analyzes item-acquisition velocity and anomalous transaction patterns), Wallet Ledger (an append-only ledger recording every currency movement), and Inventory Store (per-player item inventory). The IAP flow works as follows: a player taps to buy a gem pack on the client, the device's native payment system processes the transaction, then both the client and the App Store may send confirmations to the Store Gateway — meaning the backend must treat receiving 2 confirmations for the same transaction as a NORMAL situation, not a rare edge case.",
        "アーキテクチャは5つの主要コンポーネントで構成されます：ストアゲートウェイ（App Store/Google Playからのレシートを受信・検証）、経済サービス（通貨・アイテムの加減算ロジックを処理する、すべての残高変更が必ず通過すべき中心地点）、不正防止エンジン（アイテム取得速度と異常な取引パターンを分析）、ウォレット台帳（すべての通貨変動を記録する追記専用台帳）、インベントリストア（各プレイヤーのアイテム保管庫）です。IAPフローは次の通りです：プレイヤーがクライアント上でジェムパックの購入をタップし、端末のネイティブ決済システムが取引を処理し、その後クライアントとApp Storeの両方がストアゲートウェイへ確認を送信する場合があります。つまりバックエンドは、同一取引に対して2つの確認を受け取ることを稀な例外ではなく通常の状況として扱わなければなりません。"
      ),
      H("Điểm khó khi kiểm thử", "Testing difficulty hotspots", "テストが難しいポイント"),
      P(
        "Điểm khó nhất là đảm bảo idempotency xuyên suốt toàn bộ chuỗi: từ receipt IAP, tới giao dịch trade giữa hai người chơi, tới việc tiêu tiền mua vật phẩm trong shop — mỗi thao tác đều có khả năng bị client gửi lại (do mất mạng, app bị kill giữa chừng, hoặc người chơi cố tình bấm nút nhiều lần) và hệ thống phải đảm bảo hiệu ứng cuối cùng giống hệt như chỉ xử lý đúng 1 lần. Một khó khăn khác là phân biệt hành vi 'farming' hợp lệ (người chơi cày cuốc chăm chỉ, có thể dùng bot hỗ trợ hợp pháp trong game) với hành vi khai thác lỗi (exploit) để nhân đôi vật phẩm — cả hai đều biểu hiện là 'nhận vật phẩm nhanh bất thường', nên anti-cheat cần phân tích thêm nguồn gốc giao dịch (có đi qua đúng luồng nghiệp vụ hợp lệ hay không) thay vì chỉ nhìn tốc độ. Cuối cùng, giao dịch trade giữa hai người chơi diễn ra đồng thời từ hai client độc lập, nên cần khoá đúng phạm vi (không khoá nhầm toàn bộ kho đồ mà chỉ khoá đúng vật phẩm đang giao dịch) để vừa chống dupe vừa không làm nghẽn hệ thống khi nhiều giao dịch diễn ra song song.",
        "The hardest part is ensuring idempotency across the entire chain: from IAP receipts, to trade transactions between two players, to spending currency in the shop — every operation can potentially be resent by the client (due to network loss, the app being killed mid-flow, or a player deliberately tapping repeatedly), and the system must guarantee the final effect is identical to processing it exactly once. Another difficulty is distinguishing legitimate 'farming' behavior (a diligent player grinding, possibly using legitimate in-game assist tools) from exploit behavior aimed at duplicating items — both manifest as 'acquiring items at an abnormal rate,' so anti-cheat needs to additionally analyze the transaction's origin (whether it passed through a valid business flow) rather than looking at velocity alone. Finally, trade transactions between two players happen concurrently from two independent clients, so locking must be scoped correctly (never locking an entire inventory, only the specific item being traded) to prevent dupes while avoiding system-wide contention when many trades run in parallel.",
        "最も難しいのは、IAPレシートからプレイヤー間の取引、ショップでの通貨消費に至るまで、チェーン全体で冪等性を確保することです。各操作は、ネットワーク切断・アプリの強制終了・プレイヤーが意図的に何度もタップするなどの理由でクライアントが再送する可能性があり、システムは最終的な効果が正確に1回だけ処理した場合と同一であることを保証しなければなりません。もう一つの難点は、正当な「ファーミング」行動（正規のゲーム内補助ツールを使う場合もある熱心なプレイヤーの周回）と、アイテム複製を狙ったエクスプロイト行動の区別です。どちらも「異常な速度でアイテムを取得する」という形で現れるため、不正防止機構は速度だけでなく、取引の出所（正当な業務フローを経たかどうか）も分析する必要があります。最後に、プレイヤー間の取引は2つの独立したクライアントから同時に発生するため、ロックの範囲を正しく設定する必要があります（インベントリ全体をロックするのではなく、取引対象のアイテムのみをロックする）。これにより複製を防ぎつつ、多数の取引が並行する際のシステム全体の輻輳を回避します。"
      ),
      TIP("Luôn kiểm thử idempotency bằng cách gửi lại chính xác cùng 1 request (cùng Idempotency-Key/receipt token) tối thiểu 3 lần liên tiếp và song song, không chỉ 1 lần lặp tuần tự.", "Always test idempotency by resending the exact same request (same Idempotency-Key/receipt token) at least 3 times, both sequentially and in parallel — not just a single sequential repeat.", "冪等性のテストでは、同一のリクエスト（同じIdempotency-Key/レシートトークン）を最低3回、逐次と並行の両方で送信して確認してください。1回だけの逐次リピートでは不十分です。"),
    ],
  },
  {
    heading: { vi: "3. Mô hình dữ liệu & bất biến nghiệp vụ (oracle)", en: "3. Data model & business invariants (oracle)", ja: "3. データモデルと業務不変条件（オラクル）" },
    blocks: [
      P(
        "Mô hình dữ liệu cốt lõi gồm 5 thực thể: Wallet (playerId, goldBalance, gemBalance, version), WalletLedgerEntry (append-only, mỗi bản ghi có amount, currency, reason, sourceTransactionId, createdAt), InventoryItem (playerId, itemId, quantity, acquiredVia), IAPReceipt (receiptToken, productId, status VERIFIED/CONSUMED/REJECTED, processedAt), và AnomalySignal (playerId, loại bất thường, mức độ, có được soát thủ công hay chưa). Bất biến quan trọng nhất — cũng là oracle chính của toàn bộ bài toán — là: với mọi IAPReceipt, số dư được cộng vào ví chỉ được phát sinh đúng một lần cho mỗi receiptToken duy nhất, bất kể Store Gateway nhận được bao nhiêu lần callback xác nhận cho cùng token đó; và tổng số dư/vật phẩm hiện có của một người chơi tại bất kỳ thời điểm nào phải bằng đúng tổng các WalletLedgerEntry hợp lệ tính từ đầu, không được lệch dù chỉ một đơn vị.",
        "The core data model has 5 entities: Wallet (playerId, goldBalance, gemBalance, version), WalletLedgerEntry (append-only, each record has amount, currency, reason, sourceTransactionId, createdAt), InventoryItem (playerId, itemId, quantity, acquiredVia), IAPReceipt (receiptToken, productId, status VERIFIED/CONSUMED/REJECTED, processedAt), and AnomalySignal (playerId, anomaly type, severity, whether manually reviewed). The most critical invariant — and the central oracle of the whole problem — is: for every IAPReceipt, the balance credited to the wallet must occur exactly once per unique receiptToken, no matter how many confirmation callbacks the Store Gateway receives for that same token; and a player's current balance/item quantity at any point in time must equal exactly the sum of all valid WalletLedgerEntry records from the beginning, never off by even a single unit.",
        "コアデータモデルは5つのエンティティで構成されます：Wallet（playerId、goldBalance、gemBalance、version）、WalletLedgerEntry（追記専用、各レコードはamount・currency・reason・sourceTransactionId・createdAtを持つ）、InventoryItem（playerId、itemId、quantity、acquiredVia）、IAPReceipt（receiptToken、productId、状態VERIFIED/CONSUMED/REJECTED、processedAt）、AnomalySignal（playerId、異常種別、重大度、手動確認済みかどうか）。最も重要な不変条件——本問題全体の中心となるオラクル——は次の通りです：すべてのIAPReceiptについて、ウォレットに付与される残高は、そのトークンに対してストアゲートウェイが何回確認コールバックを受信しても、一意のreceiptTokenごとに正確に1回だけ発生しなければならず、また、あるプレイヤーの現在の残高・アイテム数量は、いかなる時点においても最初からのすべての有効なWalletLedgerEntryの合計と厳密に一致しなければならず、1単位たりとも食い違ってはなりません。"
      ),
      UL(
        ["Bất biến 1: Mỗi receiptToken chỉ tạo đúng 1 WalletLedgerEntry cộng tiền, kể cả khi nhận N callback trùng", "Bất biến 2: goldBalance/gemBalance = Σ(mọi WalletLedgerEntry hợp lệ của ví đó), luôn khớp đối soát", "Bất biến 3: Không giao dịch trừ tiền nào được phép làm số dư âm (trừ ca refund có ghi nợ tường minh)", "Bất biến 4: Một InventoryItem chỉ thuộc về đúng 1 chủ sở hữu sau khi giao dịch trade hoàn tất, không tồn tại ở cả 2 phía", "Bất biến 5: Mọi AnomalySignal mức HIGH phải khoá giao dịch liên quan chờ soát, không tự động huỷ vật phẩm của người chơi"],
        ["Invariant 1: Each receiptToken produces exactly one currency-crediting WalletLedgerEntry, even if N duplicate callbacks are received", "Invariant 2: goldBalance/gemBalance = Σ(all valid WalletLedgerEntry records for that wallet), always matching reconciliation", "Invariant 3: No debit transaction may ever push a balance negative (except an explicit debt-recorded refund case)", "Invariant 4: An InventoryItem belongs to exactly one owner after a trade completes, never existing on both sides", "Invariant 5: Every HIGH-severity AnomalySignal must hold the related transaction pending review, never auto-destroying the player's items"],
        ["不変条件1：各receiptTokenは、N回の重複コールバックを受信しても、通貨付与のWalletLedgerEntryを正確に1件だけ生成する", "不変条件2：goldBalance/gemBalanceは、そのウォレットのすべての有効なWalletLedgerEntryの合計と常に一致し、照合結果と食い違わない", "不変条件3：明示的に負債として記録された返金ケースを除き、いかなる減算取引も残高をマイナスにしてはならない", "不変条件4：InventoryItemは取引完了後、正確に1人の所有者に属し、両側に同時に存在してはならない", "不変条件5：重大度HIGHのAnomalySignalは、関連取引を必ず審査保留状態にし、プレイヤーのアイテムを自動的に破棄してはならない"]
      ),
      WARN("Nếu Economy Service cộng tiền dựa trên việc nhận được callback (event-driven ngây thơ) mà không kiểm tra receiptToken đã xử lý hay chưa, mỗi lần App Store retry callback do timeout mạng sẽ TRỰC TIẾP nhân đôi số kim cương của người chơi.", "If the Economy Service credits currency simply based on receiving a callback (naive event-driven logic) without checking whether the receiptToken was already processed, every App Store callback retry due to network timeout will DIRECTLY duplicate the player's gem balance.", "経済サービスが、receiptTokenが処理済みかどうかを確認せず、コールバックを受信しただけで単純に通貨を付与する（素朴なイベント駆動ロジック）場合、ネットワークタイムアウトによるApp Storeのコールバック再送のたびに、プレイヤーのジェム残高が直接的に二重になってしまいます。"),
    ],
  },
  {
    heading: { vi: "4. Phân tích rủi ro & chiến lược kiểm thử", en: "4. Risk analysis & test strategy", ja: "4. リスク分析とテスト戦略" },
    blocks: [
      P(
        "Rủi ro cao nhất theo tác động tài chính là dupe tiền/vật phẩm quy mô lớn — một lỗ hổng bị khai thác lan truyền trong cộng đồng người chơi (qua video hướng dẫn hoặc diễn đàn) có thể khiến hàng chục nghìn tài khoản nhân đôi tài sản trong vài giờ trước khi đội vận hành kịp phát hiện, phá huỷ giá trị của toàn bộ nền kinh tế trong game và buộc studio phải rollback dữ liệu — một hành động cực kỳ nhạy cảm vì ảnh hưởng đến cả người chơi hợp lệ không liên quan tới lỗi. Rủi ro cao thứ hai là cộng trùng phần thưởng IAP do lỗi xử lý callback lặp, trực tiếp gây thất thoát doanh thu (người chơi nhận vật phẩm miễn phí do lỗi hệ thống thay vì trả tiền). Rủi ro về cân bằng kinh tế (economy balance) xuất hiện khi tốc độ phát sinh tiền tệ mới (qua các sự kiện, nhiệm vụ) vượt quá tốc độ tiêu thụ dự kiến, gây lạm phát trong game làm giảm giá trị cảm nhận của IAP.",
        "The highest-impact risk, financially, is large-scale currency/item duping — an exploited vulnerability that spreads through the player community (via tutorial videos or forums) can cause tens of thousands of accounts to duplicate assets within hours before the ops team detects it, destroying the value of the entire in-game economy and forcing the studio into a data rollback — an extremely sensitive action since it also affects legitimate players unrelated to the bug. The second-highest risk is double-crediting IAP rewards due to duplicate-callback handling errors, directly causing revenue leakage (players receiving items for free due to a system bug instead of paying). Economy-balance risk emerges when the rate of new currency generation (via events, quests) exceeds the expected consumption rate, causing in-game inflation that erodes the perceived value of IAP.",
        "財務的影響の観点で最もリスクが高いのは、大規模な通貨・アイテムの複製です。悪用された脆弱性がプレイヤーコミュニティ（攻略動画やフォーラム経由）で拡散すると、運用チームが検知する前の数時間で数万アカウントが資産を複製し、ゲーム内経済全体の価値を破壊し、スタジオはデータロールバックを強いられます——これはバグと無関係な正当なプレイヤーにも影響するため、非常にセンシティブな対応です。次に高いリスクは、重複コールバック処理の誤りによるIAP報酬の二重付与で、直接的な収益漏出を引き起こします（プレイヤーがシステムのバグにより支払いなしでアイテムを受け取る）。経済バランスのリスクは、新規通貨の発生速度（イベントやクエスト経由）が想定消費速度を上回った際に生じ、ゲーム内インフレを引き起こしIAPの体感価値を下げます。",
      ),
      P(
        "Chiến lược kiểm thử áp dụng kim tự tháp: 60% test API/unit tập trung vào Economy Service và logic idempotency (nơi có nhiều nhánh trạng thái phức tạp, cần bao phủ boundary chính xác), 25% test Appium mô phỏng luồng mua hàng thật trên thiết bị di động (bao gồm cả trường hợp app bị kill giữa giao dịch), và 15% test tải/đồng thời chuyên biệt cho giao dịch trade và callback lặp — vì đây là nơi race condition thật sự xuất hiện mà test tuần tự không bao giờ phát hiện được. Ngoài ra, có một tầng kiểm thử riêng cho anti-cheat: đánh giá độ chính xác của mô hình phát hiện bất thường trên bộ dữ liệu hành vi đã gán nhãn (farming hợp lệ vs khai thác lỗi), theo dõi Precision/Recall theo từng phiên bản luật phát hiện.",
        "The test strategy follows a pyramid: 60% API/unit tests focused on the Economy Service and idempotency logic (where complex state branching lives and precise boundary coverage matters most), 25% Appium tests simulating the real purchase flow on mobile devices (including the app being killed mid-transaction), and 15% dedicated load/concurrency tests for trade transactions and duplicate callbacks — since this is where real race conditions appear that sequential testing will never catch. Additionally, there is a dedicated anti-cheat testing layer: evaluating the anomaly-detection model's accuracy against a labeled behavior dataset (legitimate farming vs. exploit), tracking Precision/Recall per detection-rule version.",
        "テスト戦略はピラミッド型を採用します：60%はAPI/ユニットテストで経済サービスと冪等性ロジック（複雑な状態分岐が存在し、正確な境界値カバレッジが最重要）に集中し、25%はAppiumテストでモバイル端末上の実際の購入フロー（取引途中でのアプリ強制終了を含む）を再現し、15%は取引処理と重複コールバック専用の負荷・並行テストです。これは逐次テストでは決して検知できない本物の競合状態が現れる場所だからです。さらに、不正防止専用のテスト層があり、ラベル付き行動データセット（正当なファーミング対エクスプロイト）に対する異常検知モデルの精度を評価し、検知ルールのバージョンごとにPrecision/Recallを追跡します。"
      ),
      UL(
        ["Rủi ro R1 (Rất cao): Dupe tiền/vật phẩm qua race condition trong giao dịch trade", "Rủi ro R2 (Rất cao): Cộng trùng phần thưởng IAP do callback lặp không idempotent", "Rủi ro R3 (Cao): False Negative — bỏ lọt exploit dupe mới chưa có luật phát hiện", "Rủi ro R4 (Cao): False Positive — khoá oan giao dịch của người chơi farming hợp lệ", "Rủi ro R5 (Trung bình): Lạm phát kinh tế do tốc độ phát sinh tiền tệ vượt tiêu thụ"],
        ["Risk R1 (Very high): Currency/item duping via a race condition in trade transactions", "Risk R2 (Very high): Double-crediting IAP rewards due to non-idempotent duplicate-callback handling", "Risk R3 (High): False Negative — missing a new dupe exploit not yet covered by detection rules", "Risk R4 (High): False Positive — wrongly blocking a legitimate farming player's transaction", "Risk R5 (Medium): Economic inflation from currency generation outpacing consumption"],
        ["リスクR1（非常に高い）：取引処理の競合状態による通貨・アイテムの複製", "リスクR2（非常に高い）：冪等性のない重複コールバック処理によるIAP報酬の二重付与", "リスクR3（高い）：偽陰性——検知ルール未対応の新たな複製エクスプロイトの見逃し", "リスクR4（高い）：偽陽性——正当なファーミングプレイヤーの取引を誤ってブロック", "リスクR5（中程度）：通貨発生速度が消費を上回ることによる経済インフレ"]
      ),
    ],
  },
  {
    heading: { vi: "5. Test Plan bài bản", en: "5. Formal test plan", ja: "5. 体系的テスト計画" },
    blocks: [
      P(
        "Test Plan xác định phạm vi trong: xử lý IAP và idempotency callback, ví/kho vật phẩm, giao dịch trade giữa người chơi, và anti-cheat phát hiện bất thường. Phạm vi ngoài: thiết kế cân bằng số liệu kinh tế (do đội Game Design chịu trách nhiệm), UI/UX cửa hàng trong game. Tiêu chí đầu vào (entry criteria): môi trường staging có mock Store Gateway trả về receipt giả lập có thể điều khiển (bao gồm cả gửi lặp theo yêu cầu test), test-only endpoint tạo ví/kho đồ với số dư khởi tạo tuỳ ý. Tiêu chí đầu ra (exit criteria): 100% ca ưu tiên cao PASS, không còn lỗi Sev1/Sev2 mở liên quan tới dupe hoặc idempotency, độ chính xác anti-cheat trên bộ test đạt Precision ≥ 90% và Recall ≥ 93% (ưu tiên Recall cao vì bỏ lọt dupe gây thiệt hại tài chính lớn hơn báo oan có thể sửa bằng soát thủ công).",
        "The test plan defines in-scope: IAP processing and callback idempotency, wallet/inventory, player-to-player trade transactions, and anti-cheat anomaly detection. Out-of-scope: economic balance/numbers design (owned by the Game Design team), in-game shop UI/UX. Entry criteria: a staging environment with a mock Store Gateway returning controllable simulated receipts (including resending on test demand), and test-only endpoints to create wallets/inventories with arbitrary starting balances. Exit criteria: 100% of high-priority cases PASS, no open Sev1/Sev2 defects related to duping or idempotency, and anti-cheat accuracy on the test set reaching Precision ≥ 90% and Recall ≥ 93% (Recall prioritized since missing a dupe causes greater financial damage than a false alarm correctable via manual review).",
        "テスト計画では、対象範囲をIAP処理とコールバック冪等性・ウォレット/インベントリ・プレイヤー間の取引・異常検知による不正防止と定めます。対象外は、経済バランス・数値設計（ゲームデザインチームの責任範囲）とゲーム内ショップのUI/UXです。開始基準は、制御可能な模擬レシートを返す（テスト要求に応じた再送を含む）モックストアゲートウェイを備えたステージング環境、および任意の初期残高でウォレット/インベントリを作成できるテスト専用エンドポイントです。終了基準は、優先度高のケースが100%合格し、複製や冪等性に関する未解決のSev1/Sev2欠陥がなく、テストセットにおける不正防止の精度がPrecision 90%以上かつRecall 93%以上に達することです（複製の見逃しは手動確認で是正可能な誤報より財務的損害が大きいため、Recallを優先します）。"
      ),
      P(
        "Chiến lược dữ liệu thử nghiệm dùng 3 lớp: (1) bộ receipt IAP cố định với trạng thái xác định trước (hợp lệ, đã dùng, chữ ký sai) để kiểm thử xử lý receipt chính xác tuyệt đối, (2) bộ hành vi giao dịch đã gán nhãn (farming hợp lệ, borderline, exploit dupe) để đo Precision/Recall của anti-cheat, và (3) dữ liệu tải mô phỏng 200 giao dịch trade/giây tranh chấp cùng vật phẩm hiếm để kiểm thử race condition ở mức tải thực tế của một sự kiện in-game lớn. Vai trò tham gia gồm QA Lead (thiết kế ma trận ca), Automation Engineer (Appium + API), Data Scientist (đánh giá mô hình anti-cheat), và Game Economy Designer xác nhận ngưỡng bất thường hợp lý.",
        "The test data strategy uses 3 layers: (1) a fixed set of IAP receipts with predetermined states (valid, already-used, bad signature) to test absolutely correct receipt processing, (2) a labeled set of transaction behaviors (legitimate farming, borderline, dupe exploit) to measure anti-cheat Precision/Recall, and (3) simulated load data of 200 trade transactions/second contending for the same rare item to test race conditions at the realistic load of a major in-game event. Participating roles include the QA Lead (case matrix design), Automation Engineer (Appium + API), Data Scientist (anti-cheat model evaluation), and the Game Economy Designer confirming reasonable anomaly thresholds.",
        "テストデータ戦略は3層構成です：(1) 事前に定めた状態（有効・使用済み・署名不正）を持つ固定IAPレシートセットで絶対的に正確なレシート処理をテストする、(2) ラベル付きの取引行動セット（正当なファーミング・境界線上・複製エクスプロイト）で不正防止のPrecision/Recallを測定する、(3) 同一のレアアイテムを巡って秒間200件の取引が競合する模擬負荷データで、大規模なゲーム内イベントの現実的な負荷における競合状態をテストする、の3つです。参加する役割には、QAリード（ケースマトリクス設計）、自動化エンジニア（Appium＋API）、データサイエンティスト（不正防止モデル評価）、そして妥当な異常検知の閾値を確認するゲームエコノミーデザイナーが含まれます。"
      ),
      TIP("Đưa chỉ số Precision/Recall của anti-cheat vào dashboard CI để mọi thay đổi luật phát hiện đều được so sánh với baseline trước khi triển khai lên production.", "Feed the anti-cheat's Precision/Recall metrics into a CI dashboard so every detection-rule change is compared against a baseline before production deployment.", "不正防止のPrecision/Recall指標をCIダッシュボードに組み込み、検知ルールの変更のたびに本番デプロイ前にベースラインと比較できるようにしてください。"),
    ],
  },
  {
    heading: { vi: "6. Ma trận thiết kế ca kiểm thử", en: "6. Test case design matrix", ja: "6. テストケース設計マトリクス" },
    blocks: [
      P(
        "Ma trận ca dưới đây áp dụng equivalence partitioning cho trạng thái receipt (hợp lệ/đã dùng/chữ ký sai), boundary value cho ngưỡng phát hiện farming bất thường (gấp 10 lần vs 50 lần tốc độ trung vị), và decision table cho tổ hợp trạng thái số dư × loại giao dịch (chi tiêu, hoàn tiền, trade). Mỗi ca đều gắn với ít nhất một bất biến ở chương 3 để đảm bảo assert luôn dựa trên oracle nghiệp vụ (số dư/kho vật phẩm thực tế), không dựa vào thông báo UI chung chung như 'Mua thành công'.",
        "The case matrix below applies equivalence partitioning to receipt state (valid/already-used/bad signature), boundary value analysis to the abnormal-farming detection threshold (10x vs. 50x median velocity), and a decision table for the combination of balance state × transaction type (spend, refund, trade). Every case is tied to at least one invariant from Chapter 3, ensuring assertions are always grounded in the business oracle (actual balance/inventory) rather than a generic UI message like 'Purchase successful'.",
        "以下のケースマトリクスは、レシート状態（有効・使用済み・署名不正）に同値分割技法を適用し、異常ファーミング検知の閾値（中央値速度の10倍対50倍）に境界値分析を適用し、残高状態×取引種別（消費・返金・取引）の組み合わせにデシジョンテーブルを適用しています。各ケースは第3章の不変条件の少なくとも1つに紐づけられており、アサーションが「購入成功」のような汎用的なUIメッセージではなく、常に業務オラクル（実際の残高・在庫）に基づくことを保証します。"
      ),
      IMG(svg3Matrix, "Ma trận ca kiểm thử kinh tế in-game theo mức rủi ro", "In-game economy test case matrix by risk level", "リスクレベル別のアプリ内経済テストケースマトリクス"),
      UL(
        ["Equivalence: receipt hợp lệ / đã tiêu thụ (consumed) / chữ ký sai", "Boundary: tốc độ nhận vật phẩm gấp 10 lần (chưa cảnh báo) vs 50 lần trung vị (sinh AnomalySignal)", "Decision table: số dư đủ×chi tiêu, số dư đủ×trade, số dư không đủ×chi tiêu", "Ca đồng thời: 2 request trade cùng 1 vật phẩm hiếm từ 2 phiên khác nhau"],
        ["Equivalence: valid receipt / already-consumed / bad signature", "Boundary: item-acquisition rate at 10x (no warning yet) vs. 50x median velocity (AnomalySignal raised)", "Decision table: sufficient balance×spend, sufficient balance×trade, insufficient balance×spend", "Concurrency case: 2 trade requests for the same rare item from 2 different sessions"],
        ["同値分割：有効なレシート／消費済み（consumed）／署名不正", "境界値：アイテム取得速度が中央値の10倍（まだ警告なし）対50倍（AnomalySignal発生）", "デシジョンテーブル：残高十分×消費、残高十分×取引、残高不足×消費", "並行ケース：異なる2セッションからの同一レアアイテムへの2件の取引リクエスト"]
      ),
    ],
  },
  {
    heading: { vi: "7. Chuẩn bị dữ liệu & mock Store Gateway", en: "7. Data & mock IAP store preparation", ja: "7. データとモックIAPストアの準備" },
    blocks: [
      P(
        "Môi trường staging cần một mock Store Gateway hoàn toàn tách biệt khỏi App Store/Google Play thật, cho phép test tạo receipt giả lập với productId, trạng thái, và có thể yêu cầu gửi lặp lại callback theo số lần chỉ định (mô phỏng đúng hành vi retry thật của store khi client không phản hồi kịp trong ngưỡng thời gian). Test-only endpoint `/test/wallets` cho phép khởi tạo ví với số dư tuỳ ý để kiểm thử nhanh các ca biên (ví dụ số dư còn đúng 1 xu trước khi mua vật phẩm giá 1 xu). Dữ liệu vật phẩm dùng bộ 15 loại item cố định với giá đã biết trước để mọi ca kiểm thử shop đều so sánh được với kỳ vọng tuyệt đối, tách biệt hoàn toàn khỏi catalog vật phẩm thật đang bán cho người chơi.",
        "The staging environment needs a mock Store Gateway fully decoupled from the real App Store/Google Play, allowing tests to create simulated receipts with a productId, a status, and the ability to request a callback be resent a specified number of times (accurately simulating the store's real retry behavior when the client doesn't respond in time). The test-only endpoint `/test/wallets` allows creating a wallet with an arbitrary starting balance to quickly test boundary cases (e.g., a balance of exactly 1 coin before buying an item priced at 1 coin). Item data uses a fixed set of 15 item types with known prices so every shop test case can be compared against an absolute expectation, fully separate from the real item catalog sold to players.",
        "ステージング環境には、本物のApp Store/Google Playから完全に切り離されたモックストアゲートウェイが必要です。これによりテストは、productId・状態を持つ模擬レシートを作成でき、指定回数だけコールバックを再送するよう要求できます（クライアントが時間内に応答しない場合のストアの本物のリトライ挙動を正確に模擬）。テスト専用エンドポイント`/test/wallets`は、任意の初期残高を持つウォレットを作成でき、境界ケース（例：1コインの商品を買う直前の残高がちょうど1コイン）を迅速にテストできます。アイテムデータは、既知の価格を持つ固定15種類のアイテムセットを使用し、すべてのショップテストケースが絶対的な期待値と比較できるようにし、プレイヤーに販売中の実際のアイテムカタログとは完全に分離します。"
      ),
      CODE("typescript", `// fixtures/economy.fixture.ts — seed ví/kho đồ và mock receipt qua test-only endpoint
import { test as base, APIRequestContext } from "@playwright/test";

type EconomyFixtures = {
  wallet: { playerId: string; goldBalance: number; gemBalance: number };
  mockReceipt: (opts: { productId: string; gems: number }) => Promise<{ receiptToken: string }>;
};

export const test = base.extend<EconomyFixtures>({
  wallet: async ({ request }, use) => {
    const res = await request.post("/test/wallets", {
      data: { goldBalance: 500, gemBalance: 0 }, // số dư khởi tạo tuỳ ý cho từng test
    });
    const body = await res.json();
    await use({ playerId: body.playerId, goldBalance: body.goldBalance, gemBalance: body.gemBalance });
    await request.post(\`/test/wallets/\${body.playerId}/reset\`);
  },
  mockReceipt: async ({ request }, use) => {
    await use(async ({ productId, gems }) => {
      const res = await request.post("/test/store/mock-receipt", { data: { productId, gems } });
      return await res.json(); // { receiptToken }
    });
  },
});
export { expect } from "@playwright/test";`),
      NOTE("Không bao giờ trỏ mock Store Gateway sang sandbox thật của App Store/Google Play trong pipeline CI để tránh rủi ro bị store khoá tài khoản developer do gọi API quá tần suất cho phép.", "Never point the mock Store Gateway to the real App Store/Google Play sandbox in the CI pipeline, to avoid the risk of the store suspending the developer account for exceeding allowed API call rates.", "CIパイプラインでは、モックストアゲートウェイを本物のApp Store/Google Playのサンドボックスに向けないでください。許可されたAPI呼び出し頻度を超えることでデベロッパーアカウントが停止されるリスクを避けるためです。"),
    ],
  },
  {
    heading: { vi: "8. Hiện thực automation: happy path", en: "8. Automation implementation: happy path", ja: "8. 自動化実装：正常系" },
    blocks: [
      P(
        "Kịch bản happy path mô phỏng một người chơi mua gói kim cương thật trên thiết bị di động qua Appium: mở shop trong game, chọn gói kim cương, hoàn tất luồng thanh toán native (giả lập bằng mock Store Gateway ở môi trường test), và kiểm tra số dư kim cương cuối cùng khớp chính xác với giá trị gói đã mua. Assertion không dừng ở việc UI hiển thị 'Mua thành công' mà phải gọi API kiểm tra gemBalance bằng phép tính độc lập (số dư trước + số kim cương của gói), đúng theo nguyên tắc oracle-first đã nêu ở chương 3.",
        "The happy-path scenario simulates a player making a real gem-pack purchase on a mobile device via Appium: opening the in-game shop, selecting a gem pack, completing the native payment flow (simulated via the mock Store Gateway in the test environment), and verifying the final gem balance matches the purchased pack's value exactly. The assertion does not stop at the UI showing 'Purchase successful' — it must call the API to check gemBalance against an independently computed expectation (balance before + the pack's gem amount), following the oracle-first principle from Chapter 3.",
        "正常系シナリオは、プレイヤーがAppium経由でモバイル端末上で実際のジェムパック購入を行う流れを再現します：ゲーム内ショップを開き、ジェムパックを選択し、ネイティブ決済フロー（テスト環境ではモックストアゲートウェイで模擬）を完了し、最終的なジェム残高が購入したパックの価値と厳密に一致することを検証します。アサーションはUIに「購入成功」と表示されるだけでは終わらず、第3章で述べたオラクル優先の原則に従い、独立計算の期待値（購入前の残高＋パックのジェム数）に対してgemBalanceをAPIで検証する必要があります。"
      ),
      CODE("typescript", `// appium/iap-purchase-happy-path.spec.ts
import { remote } from "webdriverio";
import { test, expect } from "../fixtures/economy.fixture";

test("mua gói kim cương thành công, số dư khớp đúng giá trị gói", async ({ request, wallet }) => {
  const driver = await remote({
    capabilities: { platformName: "Android", "appium:automationName": "UiAutomator2", "appium:app": "./builds/rpg-game.apk" },
  });

  await driver.$('~shop-tab').click();
  await driver.$('~gem-pack-500').click();
  await driver.$('~confirm-purchase-button').click();
  await driver.$('~purchase-success-toast').waitForDisplayed({ timeout: 10_000 });

  // Oracle: gọi thẳng API ví, so với phép tính độc lập — không tin toast UI
  const walletRes = await request.get(\`/api/wallets/\${wallet.playerId}\`);
  const current = await walletRes.json();
  expect(current.gemBalance).toBe(wallet.gemBalance + 500); // gói 500 gem, cộng đúng 1 lần

  await driver.deleteSession();
});`),
      TIP("Luôn assert số dư qua API độc lập với đồng bộ tối thiểu 3 giây sau khi client báo thành công, để bắt được các trường hợp cộng tiền bị trễ bất đồng bộ (async lag) trước khi coi là lỗi mất tiền.", "Always assert the balance via an independent API call at least 3 seconds after the client reports success, to catch cases where crediting is delayed asynchronously before wrongly treating it as a lost-currency bug.", "残高のアサーションは、クライアントが成功を報告してから最低3秒後に独立したAPI呼び出しで行ってください。これにより、非同期の遅延（async lag）による付与遅れを、誤って通貨喪失バグと判断する前に検知できます。"),
    ],
  },
  {
    heading: { vi: "9. Ca lỗi chuyên sâu: dupe & IAP callback lặp", en: "9. Deep failure cases: dupe & duplicate IAP callback", ja: "9. 高度な異常系：複製とIAPコールバック重複" },
    blocks: [
      P(
        "Ca lỗi là nơi tạo ra giá trị cao nhất cho một bài toán kinh tế in-game, vì đây chính là nơi thiệt hại tài chính thực sự xảy ra nếu bỏ sót. Ba nhóm ca lỗi trọng tâm gồm: callback IAP gửi lặp lại (đảm bảo idempotency, không cộng trùng kim cương), race condition trong giao dịch trade (đảm bảo không nhân đôi vật phẩm khi hai request tranh chấp cùng lúc), và phát hiện farming/exploit bất thường (đảm bảo anti-cheat gắn cờ đúng lúc mà không khoá oan người chơi hợp lệ).",
        "Failure cases create the highest value for an in-game economy problem, since this is exactly where real financial damage occurs if missed. Three key failure groups are: duplicate IAP callbacks (ensuring idempotency, no double-crediting gems), race conditions in trade transactions (ensuring no item duplication when two requests contend simultaneously), and abnormal farming/exploit detection (ensuring anti-cheat flags at the right time without wrongly blocking legitimate players).",
        "アプリ内経済の問題において、異常系こそが最も高い価値を生み出します。なぜなら、見落とせば実際の財務損失が発生する場所だからです。重要な異常系は3つのグループに分かれます：IAPコールバックの重複送信（冪等性の確認、ジェムの二重付与なし）、取引処理の競合状態（2つのリクエストが同時に競合した際にアイテムが複製されないことの確認）、異常なファーミング・エクスプロイトの検知（不正防止機構が正当なプレイヤーを誤ってブロックせず適切なタイミングでフラグを立てることの確認）です。"
      ),
      CODE("typescript", `// api/iap-idempotent-callback.spec.ts — App Store gửi lặp callback do timeout mạng
import { test, expect } from "../fixtures/economy.fixture";

test("callback IAP gửi lặp 3 lần chỉ cộng đúng 1 lần kim cương", async ({ request, wallet, mockReceipt }) => {
  const { receiptToken } = await mockReceipt({ productId: "gem-pack-500", gems: 500 });

  // Mô phỏng App Store gửi lại callback 3 lần liên tiếp do timeout
  for (let i = 0; i < 3; i++) {
    const res = await request.post(\`/api/iap/callback\`, { data: { receiptToken, playerId: wallet.playerId } });
    expect(res.status()).toBe(200); // mọi lần đều trả 200 (idempotent, không phải lỗi)
  }

  // Oracle: chỉ có đúng 1 WalletLedgerEntry được tạo cho receiptToken này
  const ledger = await (await request.get(\`/api/wallets/\${wallet.playerId}/ledger\`)).json();
  const entries = ledger.entries.filter((e: any) => e.sourceTransactionId === receiptToken);
  expect(entries.length).toBe(1);

  const walletRes = await request.get(\`/api/wallets/\${wallet.playerId}\`);
  const current = await walletRes.json();
  expect(current.gemBalance).toBe(wallet.gemBalance + 500); // không phải +1500
});`),
      CODE("typescript", `// api/trade-race-condition-dupe.spec.ts — 2 request trade cùng 1 vật phẩm hiếm, đồng thời
import { test, expect } from "../fixtures/economy.fixture";

test("2 request trade tranh chấp cùng 1 item chỉ 1 giao dịch thành công, item không bị dupe", async ({ request }) => {
  const seller = await (await request.post("/test/wallets", { data: {} })).json();
  const buyerA = await (await request.post("/test/wallets", { data: { goldBalance: 1000 } })).json();
  const buyerB = await (await request.post("/test/wallets", { data: { goldBalance: 1000 } })).json();
  await request.post(\`/test/inventory/\${seller.playerId}/grant\`, { data: { itemId: "rare-sword-01", quantity: 1 } });

  const [rA, rB] = await Promise.all([
    request.post("/api/trade/execute", { data: { sellerId: seller.playerId, buyerId: buyerA.playerId, itemId: "rare-sword-01" } }),
    request.post("/api/trade/execute", { data: { sellerId: seller.playerId, buyerId: buyerB.playerId, itemId: "rare-sword-01" } }),
  ]);
  const statuses = [rA.status(), rB.status()].sort();
  expect(statuses).toEqual([200, 409]); // đúng 1 thành công, 1 bị từ chối vì item đã hết

  // Oracle: item chỉ tồn tại ở đúng 1 kho, tổng số lượng toàn hệ thống không đổi
  const invA = await (await request.get(\`/api/inventory/\${buyerA.playerId}\`)).json();
  const invB = await (await request.get(\`/api/inventory/\${buyerB.playerId}\`)).json();
  const totalCopies = [invA, invB].filter((inv: any) => inv.items.some((i: any) => i.itemId === "rare-sword-01")).length;
  expect(totalCopies).toBe(1); // không bao giờ là 2 (dupe)
});`),
      CODE("typescript", `// api/anticheat-farming-anomaly.spec.ts — tốc độ nhận vật phẩm bất thường sinh AnomalySignal
import { test, expect } from "../fixtures/economy.fixture";

test("nhận vật phẩm nhanh gấp 50 lần trung vị sinh AnomalySignal mức HIGH", async ({ request, wallet }) => {
  for (let i = 0; i < 50; i++) {
    await request.post(\`/api/inventory/\${wallet.playerId}/grant-from-quest\`, { data: { itemId: "potion-basic", questId: \`q-\${i}\` } });
  }

  const signals = await (await request.get(\`/api/anticheat/signals/\${wallet.playerId}\`)).json();
  const highSignal = signals.find((s: any) => s.type === "ABNORMAL_ACQUISITION_RATE" && s.severity === "HIGH");
  expect(highSignal).toBeTruthy();

  // Oracle: giao dịch liên quan phải ở trạng thái chờ soát, KHÔNG tự động thu hồi vật phẩm
  const pendingReview = await (await request.get(\`/api/anticheat/pending-review/\${wallet.playerId}\`)).json();
  expect(pendingReview.status).toBe("PENDING_REVIEW");
  expect(pendingReview.itemsAutoRevoked).toBe(false);
});`),
      WARN("Nếu chỉ kiểm thử idempotency bằng callback tuần tự, sẽ KHÔNG phát hiện được race condition thật xảy ra khi 2 callback hoặc 2 giao dịch trade tới gần như đồng thời — phải test với Promise.all hoặc công cụ tạo tải song song, đúng như đã nhấn mạnh ở bài EdTech và Travel trước đó.", "Testing idempotency with sequential callbacks alone will NOT catch the real race condition that occurs when 2 callbacks or 2 trade transactions arrive nearly simultaneously — test with Promise.all or a concurrent load tool, as emphasized in the earlier EdTech and Travel articles.", "冪等性を逐次コールバックだけでテストすると、2つのコールバックまたは2つの取引がほぼ同時に到着した際に発生する本物の競合状態を検知できません——前述のEdTechおよびTravel記事でも強調した通り、Promise.allや並行負荷ツールでテストする必要があります。"),
    ],
  },
  {
    heading: { vi: "10. Hậu kiểm & đối soát kinh tế in-game", en: "10. Post-hoc economy reconciliation", ja: "10. アプリ内経済の事後照合" },
    blocks: [
      P(
        "Sau mỗi ngày vận hành, một job đối soát (reconciliation batch) chạy hằng đêm để so sánh số dư ví và kho vật phẩm hiện tại của mọi người chơi với việc tính lại độc lập từ WalletLedgerEntry — bất kỳ sai lệch nào (dù chỉ 1 đơn vị tiền tệ) đều được coi là lỗi nghiêm trọng cần điều tra ngay, vì đây chính là dấu hiệu sớm nhất của một lỗ hổng dupe đang bị khai thác trong thực tế. Job này cũng đối chiếu chéo giữa số lượng receipt IAP đã VERIFIED với tổng doanh thu ghi nhận từ App Store/Google Play, và kiểm tra không có InventoryItem nào của vật phẩm giới hạn (limited-time) có tổng số lượng toàn hệ thống vượt quá số lượng đã phát hành theo thiết kế sự kiện.",
        "After each day of operation, a nightly reconciliation batch job compares every player's current wallet balance and item inventory against an independent recalculation from WalletLedgerEntry — any discrepancy (even a single currency unit) is treated as a serious defect requiring immediate investigation, since it is the earliest signal of a dupe vulnerability being actively exploited in the wild. This job also cross-checks the count of VERIFIED IAP receipts against total revenue recorded by the App Store/Google Play, and verifies that no limited-time InventoryItem's total system-wide quantity exceeds the amount issued per the event design.",
        "運用日ごとに、夜間の照合バッチジョブが実行され、すべてのプレイヤーの現在のウォレット残高とアイテム在庫を、WalletLedgerEntryからの独立した再計算結果と比較します。わずか1通貨単位でも食い違いがあれば、実際に悪用されている複製脆弱性の最も早い兆候であるため、直ちに調査が必要な重大な欠陥として扱われます。このジョブはまた、VERIFIED状態のIAPレシート数をApp Store/Google Playが記録する総収益と相互確認し、期間限定のInventoryItemのシステム全体の総数量が、イベント設計で発行された数量を超えていないことも検証します。"
      ),
      CODE("sql", `-- reconciliation.sql — đối soát số dư ví với tính lại độc lập từ ledger, chạy hằng đêm
SELECT w.player_id, w.gold_balance AS current_gold, w.gem_balance AS current_gem,
       r.recomputed_gold, r.recomputed_gem,
       ABS(w.gold_balance - r.recomputed_gold) AS gold_diff,
       ABS(w.gem_balance - r.recomputed_gem) AS gem_diff
FROM wallets w
JOIN (
  SELECT player_id,
         SUM(CASE WHEN currency = 'GOLD' THEN amount ELSE 0 END) AS recomputed_gold,
         SUM(CASE WHEN currency = 'GEM' THEN amount ELSE 0 END) AS recomputed_gem
  FROM wallet_ledger_entries
  GROUP BY player_id
) r ON r.player_id = w.player_id
WHERE ABS(w.gold_balance - r.recomputed_gold) > 0 OR ABS(w.gem_balance - r.recomputed_gem) > 0; -- sai lệch = SỰ CỐ`),
      CODE("sql", `-- limited-item-supply-check.sql — kiểm tra tổng vật phẩm giới hạn không vượt số lượng phát hành
SELECT i.item_id, e.issued_quantity AS designed_supply, SUM(inv.quantity) AS total_in_circulation
FROM event_items e
JOIN inventory_items inv ON inv.item_id = e.item_id
GROUP BY i.item_id, e.issued_quantity
HAVING SUM(inv.quantity) > e.issued_quantity; -- vượt số lượng phát hành = có dupe`),
      NOTE("Đối soát nên chạy trên bản sao read-replica để không ảnh hưởng hiệu năng của hệ thống kinh tế đang phục vụ người chơi thật, và kết quả bất thường phải tự động tạo ticket ưu tiên cao thay vì chỉ ghi log im lặng.", "Reconciliation should run against a read-replica to avoid impacting the performance of the live economy system serving real players, and any anomalous result must automatically create a high-priority ticket rather than being silently logged.", "照合処理は、実際のプレイヤーを処理中の稼働中経済システムの性能に影響を与えないよう読み取り専用レプリカ上で実行すべきであり、異常な結果は静かにログ記録されるのではなく、自動的に優先度の高いチケットを作成すべきです。"),
    ],
  },
  {
    heading: { vi: "11. CI/CD, giám sát & chỉ số", en: "11. CI/CD, monitoring & metrics", ja: "11. CI/CD・監視・指標" },
    blocks: [
      P(
        "Pipeline CI chạy 3 tầng song song: unit/API test cho Economy Service và idempotency (nhanh, chạy mọi PR), test tải/đồng thời cho giao dịch trade chạy trên môi trường staging mỗi đêm (mô phỏng 200 giao dịch/giây tranh chấp cùng vật phẩm hiếm), và job đánh giá độ chính xác anti-cheat chạy hằng tuần trên bộ dữ liệu gán nhãn để phát hiện suy giảm mô hình (model drift) trước khi ảnh hưởng người chơi thật. Cổng chất lượng (quality gate) chặn merge nếu phát hiện bất kỳ dấu hiệu dupe nào ở tải mục tiêu, hoặc nếu Recall của anti-cheat giảm quá 1 điểm phần trăm so với baseline.",
        "The CI pipeline runs 3 parallel tiers: unit/API tests for the Economy Service and idempotency (fast, runs on every PR), load/concurrency tests for trade transactions running nightly on staging (simulating 200 transactions/second contending for the same rare item), and a weekly anti-cheat accuracy evaluation job against the labeled dataset to catch model drift before it affects real players. A quality gate blocks merges if any sign of duping is detected at target load, or if the anti-cheat's Recall drops more than 1 percentage point versus baseline.",
        "CIパイプラインは3層を並行実行します：経済サービスと冪等性向けのユニット/APIテスト（高速、すべてのPRで実行）、ステージング環境で毎晩実行される取引処理向けの負荷・並行テスト（同一のレアアイテムを巡る秒間200取引の競合を模擬）、そしてモデルの劣化（モデルドリフト）を実際のプレイヤーに影響が及ぶ前に検知するための、ラベル付きデータセットに対する週次の不正防止精度評価ジョブです。品質ゲートは、目標負荷で複製の兆候が検知された場合、または不正防止のRecallがベースラインより1ポイント以上低下した場合にマージをブロックします。"
      ),
      CODE("yaml", `# .github/workflows/economy-ci.yml
name: economy-ci
on: [pull_request]
jobs:
  economy-unit-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api -- --grep "economy|idempotency|reconciliation"

  trade-concurrency:
    needs: economy-unit-api
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx k6 run load/trade-contention.js --vus 200 --duration 60s
      - run: npm run check:no-dupe -- --report load-results.json

  anticheat-accuracy-gate:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run eval:anticheat -- --dataset labeled-behaviors-v9 --min-recall 0.93 --min-precision 0.90`),
      TIP("Tách riêng job kiểm tra dupe (check:no-dupe) khỏi job đo hiệu năng thuần tuý, vì mục tiêu của 2 job hoàn toàn khác nhau: một job xác nhận tính đúng đắn (correctness), một job đo tốc độ (throughput/latency).", "Keep the dupe-checking job (check:no-dupe) separate from a pure performance job, since the two jobs have entirely different goals: one confirms correctness, the other measures speed (throughput/latency).", "複製チェックジョブ（check:no-dupe）は純粋な性能測定ジョブとは分離してください。2つのジョブの目的はまったく異なります——一方は正しさ（correctness）を確認し、もう一方は速度（スループット/レイテンシ）を測定するものです。"),
    ],
  },
  {
    heading: { vi: "12. Tích hợp AI Agent", en: "12. AI Agent integration", ja: "12. AIエージェント統合" },
    blocks: [
      P(
        "AI agent có thể đảm nhận việc sinh ca kiểm thử biên cho ngưỡng phát hiện farming (ví dụ tự động đề xuất thêm ca 'tốc độ đúng 49.9 lần trung vị' để kiểm tra chính xác biên ngưỡng trước khi sinh AnomalySignal), phân tích log giao dịch hằng ngày để gợi ý mẫu exploit dupe mới chưa có luật phát hiện (ví dụ một chuỗi thao tác bất thường lặp lại ở nhiều tài khoản khác nhau trong thời gian ngắn), và soạn thảo báo cáo tóm tắt kết quả đối soát mỗi đêm để đội vận hành đọc nhanh. Ranh giới trách nhiệm rõ ràng: AI KHÔNG được tự quyết định thu hồi vật phẩm/tiền của người chơi hoặc tự động khoá tài khoản — mọi hành động có hệ quả tài chính trực tiếp đến người chơi đều cần một người có thẩm quyền (đội vận hành kinh tế/GM) xác nhận cuối cùng.",
        "AI agents can take on generating boundary test cases for the farming-detection threshold (e.g., automatically proposing an added case of 'velocity at exactly 49.9x median' to precisely test the boundary before an AnomalySignal is raised), analyzing daily transaction logs to suggest new dupe-exploit patterns not yet covered by detection rules (e.g., an unusual sequence of actions repeating across many different accounts in a short window), and drafting nightly reconciliation summary reports for the ops team to read quickly. The responsibility boundary is clear: AI must NOT autonomously decide to revoke a player's items/currency or auto-suspend an account — every action with direct financial consequence for a player requires final confirmation from an authorized human (economy ops/GM team).",
        "AIエージェントは、ファーミング検知閾値の境界値テストケース生成（例：AnomalySignal発生前の閾値を正確にテストするため「中央値のちょうど49.9倍の速度」というケースを自動提案する）、日次の取引ログ分析による検知ルールが未対応の新たな複製エクスプロイトパターンの提案（例：短時間に多くの異なるアカウントで繰り返される異常な操作シーケンス）、そして運用チームが素早く読めるよう毎晩の照合結果要約レポートの作成を担うことができます。責任境界は明確です：AIはプレイヤーのアイテム・通貨の自動没収やアカウントの自動停止を自律的に決定してはなりません——プレイヤーに直接的な財務上の結果を及ぼすあらゆる行動は、必ず権限を持つ人間（経済運用チーム/GM）による最終確認を必要とします。"
      ),
      UL(
        ["AI hỗ trợ: sinh ca biên ngưỡng farming, phân tích log giao dịch tìm exploit mới, tóm tắt đối soát hằng đêm", "AI KHÔNG được: tự thu hồi vật phẩm/tiền, tự khoá tài khoản người chơi, tự thay đổi ngưỡng anti-cheat production", "Người giữ quyền: đội vận hành kinh tế/GM xác nhận thu hồi tài sản, xác nhận khoá tài khoản nghi gian lận"],
        ["AI-assisted: generating farming-threshold boundary cases, analyzing transaction logs for new exploits, nightly reconciliation summaries", "AI must NOT: auto-revoke items/currency, auto-suspend player accounts, auto-modify production anti-cheat thresholds", "Human-retained authority: economy ops/GM team confirms asset revocation and confirms suspending suspected-cheating accounts"],
        ["AI支援：ファーミング閾値の境界ケース生成、新たなエクスプロイトを探す取引ログ分析、毎晩の照合要約", "AI禁止事項：アイテム・通貨の自動没収、プレイヤーアカウントの自動停止、本番の不正防止閾値の自動変更", "人間が保持する権限：資産没収は経済運用チーム/GMが確認、不正疑いアカウントの停止も確認"]
      ),
    ],
  },
  {
    heading: { vi: "13. Góc phỏng vấn", en: "13. Interview angle", ja: "13. 面接の観点" },
    blocks: [
      QA(
        "Làm sao bạn đảm bảo callback xác nhận thanh toán IAP không cộng trùng phần thưởng khi App Store gửi lại nhiều lần?",
        "How would you ensure an IAP payment-confirmation callback doesn't double-credit rewards when the App Store resends it multiple times?",
        "Tôi sẽ thiết kế Economy Service kiểm tra receiptToken đã được xử lý (VERIFIED/CONSUMED) hay chưa TRƯỚC khi cộng tiền, dùng ràng buộc duy nhất (unique constraint) ở tầng database trên receiptToken để đảm bảo dù có race condition ở tầng ứng dụng, database vẫn từ chối bản ghi trùng. Tôi cũng sẽ viết test gửi cùng 1 receipt tối thiểu 3 lần cả tuần tự lẫn song song để xác nhận số dư chỉ cộng đúng 1 lần trong mọi trường hợp.",
        "I would design the Economy Service to check whether the receiptToken has already been processed (VERIFIED/CONSUMED) BEFORE crediting currency, using a unique constraint at the database layer on receiptToken so that even if a race condition slips through the application layer, the database still rejects the duplicate record. I would also write tests sending the same receipt at least 3 times, both sequentially and in parallel, to confirm the balance is credited exactly once in every case.",
        "App Storeが決済確認コールバックを複数回再送しても、報酬が二重付与されないようにするにはどうしますか？",
        "私は、通貨を付与する前に、receiptTokenが既に処理済み（VERIFIED/CONSUMED）かどうかを確認するよう経済サービスを設計します。データベース層でreceiptTokenに一意制約を設定し、アプリケーション層で競合状態が発生しても、データベースが重複レコードを確実に拒否するようにします。また、同一レシートを逐次・並行の両方で最低3回送信するテストを書き、あらゆるケースで残高が正確に1回だけ付与されることを確認します。"
      ),
      QA(
        "Nếu phát hiện một lỗ hổng khiến 3.000 tài khoản nhân đôi được vật phẩm hiếm qua trade, bạn xử lý thế nào?",
        "If you discover a vulnerability that let 3,000 accounts duplicate a rare item via trading, how would you handle it?",
        "Trước tiên tôi sẽ vá lỗ hổng ngay lập tức (khoá tính năng trade tạm thời nếu cần) để ngăn thiệt hại lan rộng thêm, sau đó chạy job đối soát để xác định chính xác danh sách tài khoản bị ảnh hưởng và số lượng vật phẩm dupe. Tiếp theo phối hợp với đội vận hành để quyết định phương án xử lý (thu hồi vật phẩm dupe, hoặc bù đắp cho người chơi hợp lệ bị ảnh hưởng gián tiếp do thị trường trong game bị xáo trộn), và bổ sung ca kiểm thử hồi quy đảm bảo giao dịch trade luôn khoá đúng phạm vi vật phẩm đang giao dịch.",
        "First, I would immediately patch the vulnerability (temporarily disabling the trade feature if necessary) to prevent further damage from spreading, then run the reconciliation job to precisely identify the affected accounts and the quantity of duped items. Next, I would work with the ops team to decide on a remediation plan (revoking the duped items, or compensating legitimate players indirectly affected by the disrupted in-game market), and add a regression test case ensuring trade transactions always lock the exact scope of the item being traded.",
        "3000アカウントが取引を通じてレアアイテムを複製できてしまう脆弱性を発見したら、どう対応しますか？",
        "まず、被害がこれ以上拡大しないよう脆弱性を直ちに修正します（必要であれば取引機能を一時的に無効化します）。その後、照合ジョブを実行して影響を受けたアカウントと複製されたアイテム数を正確に特定します。次に運用チームと連携し、対応方針（複製アイテムの没収、またはゲーム内市場の混乱により間接的に影響を受けた正当なプレイヤーへの補償）を決定し、取引処理が常に取引対象アイテムの正確な範囲をロックすることを保証するリグレッションテストケースを追加します。"
      ),
      QA(
        "Bạn ưu tiên Precision hay Recall cao hơn cho hệ thống anti-cheat kinh tế in-game? Vì sao?",
        "For an in-game economy anti-cheat system, would you prioritize higher Precision or higher Recall? Why?",
        "Tôi ưu tiên Recall cao hơn một chút vì bỏ lọt exploit dupe thật (False Negative) gây thiệt hại tài chính trực tiếp và có thể lan rộng nhanh trong cộng đồng, trong khi báo oan (False Positive) chỉ tạm giữ giao dịch chờ soát thủ công chứ không gây mất mát vĩnh viễn cho người chơi hợp lệ nếu quy trình soát đủ nhanh — miễn là mọi cảnh báo đều đi qua bước xác nhận thủ công trước khi thu hồi tài sản thật sự.",
        "I would prioritize slightly higher Recall, since missing a real dupe exploit (False Negative) causes direct financial damage and can spread quickly through the player community, whereas a false alarm (False Positive) only holds a transaction for manual review rather than causing permanent loss for a legitimate player, as long as the review process is fast enough — provided every alert goes through manual confirmation before any actual asset revocation.",
        "アプリ内経済の不正防止システムでは、PrecisionとRecallのどちらを優先しますか？その理由は？",
        "私はRecallをやや優先します。なぜなら、本物の複製エクスプロイトの見逃し（偽陰性）は直接的な財務損害をもたらし、プレイヤーコミュニティ内で急速に拡散する可能性があるからです。一方、誤報（偽陽性）は審査プロセスが十分に速ければ、取引を手動審査のために一時保留するだけで、正当なプレイヤーに恒久的な損失をもたらしません——ただし、実際の資産没収の前にすべての警告が手動確認を経ることが条件です。"
      ),
      SCEN(
        "Nhà tuyển dụng hỏi tình huống thực chiến",
        "Interviewer poses a real-world scenario",
        "Bạn là QA lead của một game di động sắp mở sự kiện lớn nhất năm, dự kiến tăng gấp 5 lần lượng giao dịch trade và IAP trong 48 giờ đầu. Ba ngày trước sự kiện, đội phát triển thêm tính năng cho phép người chơi 'gộp' nhiều vật phẩm cùng loại thành 1 vật phẩm cấp cao hơn (crafting), một luồng nghiệp vụ hoàn toàn mới chưa từng qua kiểm thử tải. Bạn có 72 giờ để đánh giá rủi ro và quyết định có nên phát hành tính năng này kịp sự kiện hay không. Bạn sẽ làm gì?",
        "You are the QA lead for a mobile game about to launch its biggest event of the year, expected to increase trade and IAP transaction volume 5x within the first 48 hours. Three days before the event, the dev team adds a feature letting players 'combine' multiple copies of an item into one higher-tier item (crafting) — an entirely new business flow that has never undergone load testing. You have 72 hours to assess the risk and decide whether to ship this feature in time for the event. What would you do?",
        "面接官が実戦シナリオを問う",
        "あなたは、年間最大のイベントを控えたモバイルゲームのQAリードです。このイベントでは最初の48時間で取引とIAPの取引量が5倍に増加すると見込まれています。イベントの3日前、開発チームは、プレイヤーが同種のアイテムを複数個合成して1つの上位アイテムにする（クラフティング）機能を追加しました。これは負荷テストを一度も経験していない、まったく新しい業務フローです。あなたにはリスクを評価し、この機能をイベントに間に合わせてリリースすべきか判断する72時間があります。どうしますか？"
      ),
      P(
        "Câu trả lời tốt cho tình huống trên cần thể hiện tư duy đánh giá rủi ro theo thời gian thực và ưu tiên đúng trọng tâm: đầu tiên nhận diện đây là một luồng nghiệp vụ mới trực tiếp tạo ra/tiêu huỷ vật phẩm — nghĩa là nó chạm thẳng vào bất biến quan trọng nhất của toàn hệ thống (không nhân đôi/mất vật phẩm ngoài ý muốn), nên phải ưu tiên tuyệt đối việc kiểm thử tính đúng đắn của giao dịch crafting (số lượng vật phẩm nguyên liệu bị trừ đúng, vật phẩm kết quả được tạo đúng 1 lần) trước khi quan tâm tới hiệu năng. Tiếp theo, chạy ngay bộ ca kiểm thử đồng thời cho crafting với tải mô phỏng đúng quy mô sự kiện (nhiều request crafting cùng nguyên liệu từ cùng 1 tài khoản, mô phỏng thao tác bấm nhanh liên tục). Nếu phát hiện bất kỳ ca dupe hoặc mất nguyên liệu nào dù chỉ 1 lần trong hàng nghìn lần chạy, cần đề xuất hoãn tính năng hoặc phát hành kèm cờ tính năng (feature flag) giới hạn số lần crafting mỗi người chơi mỗi giờ, để giảm blast radius nếu sự cố xảy ra trong giờ cao điểm sự kiện thật.",
        "A strong answer to this scenario should demonstrate real-time risk-assessment thinking with the right priorities: first, recognize this is a new business flow that directly creates/destroys items — meaning it touches the system's most critical invariant (no unintended item duplication or loss) — so testing the crafting transaction's correctness (raw materials debited correctly, the resulting item created exactly once) must take absolute priority over performance concerns. Next, immediately run the concurrency test suite for crafting at load matching the actual event scale (many crafting requests for the same materials from the same account, simulating rapid repeated tapping). If even a single dupe or lost-material case is found across thousands of runs, recommend delaying the feature or shipping it behind a feature flag that caps the number of crafts per player per hour, reducing the blast radius if an incident occurs during the real event's peak hours.",
        "この状況への良い回答は、リアルタイムのリスク評価思考と適切な優先順位付けを示す必要があります。まず、これがアイテムを直接生成・破棄する新しい業務フローであることを認識します——つまりシステムの最も重要な不変条件（意図しないアイテムの複製や喪失がないこと）に直接触れるため、性能面の懸念よりもクラフティング取引の正しさ（原材料が正しく減算され、結果アイテムが正確に1回だけ生成される）のテストを絶対的に優先しなければなりません。次に、実際のイベント規模に見合った負荷（同一アカウントから同じ材料への多数のクラフティングリクエスト、素早い連続タップを模擬）でクラフティングの並行テストスイートを直ちに実行します。何千回もの実行の中でたとえ1件でも複製や材料喪失のケースが見つかった場合は、機能の延期、またはプレイヤー1人あたり1時間あたりのクラフティング回数を制限するフィーチャーフラグ付きでのリリースを提案し、実際のイベントのピーク時間帯に事故が発生した場合の被害範囲を縮小します。"
      ),
    ],
  },
  {
    heading: { vi: "14. Tóm tắt & checklist bàn giao", en: "14. Summary & handover checklist", ja: "14. まとめと引き継ぎチェックリスト" },
    blocks: [
      P(
        "Bài toán kinh tế in-game chứng minh rằng kiểm thử phần mềm game không chỉ dừng ở việc trang shop hiển thị đúng vật phẩm, mà phải bảo vệ được ba trụ cột: tính duy nhất của tài sản (không nhân đôi tiền/vật phẩm dưới bất kỳ mức tải đồng thời hay callback lặp nào), tính chính xác tuyệt đối của số dư (khớp đối soát với ledger, tái tạo được), và độ tin cậy của cơ chế chống gian lận (cân bằng Precision/Recall một cách có chủ đích giữa bỏ lọt dupe và báo oan người chơi hợp lệ). Toàn bộ chiến lược kiểm thử xoay quanh nguyên tắc oracle-first: mọi khẳng định 'giao dịch thành công' phải quy về một bất biến nghiệp vụ đo được qua ledger và đối soát dữ liệu, không phải một thông báo giao diện.",
        "The in-game economy problem demonstrates that testing game software goes far beyond verifying the shop displays the correct item — it must protect three pillars: asset uniqueness (no currency/item duplication under any level of concurrent load or duplicate callbacks), absolute balance accuracy (reconcilable against the ledger, reproducible), and the reliability of the anti-cheat mechanism (a deliberate Precision/Recall balance between missing dupes and wrongly flagging legitimate players). The entire test strategy revolves around the oracle-first principle: every claim of a 'successful transaction' must reduce to a measurable business invariant verified via the ledger and data reconciliation, not a UI message.",
        "アプリ内経済という課題は、ゲームソフトウェアのテストがショップに正しいアイテムが表示されるかどうかの確認にとどまらないことを示しています。3つの柱を守る必要があります：資産の一意性（いかなる並行負荷や重複コールバックの下でも通貨・アイテムの複製なし）、残高の絶対的な正確性（台帳と照合可能で再現可能）、そして不正防止機構の信頼性（複製の見逃しと正当なプレイヤーの誤検知の間での意図的なPrecision/Recallバランス）です。テスト戦略全体は、オラクル優先の原則を中心に構成されます。つまり、あらゆる「取引成功」という主張は、UIメッセージではなく、台帳とデータ照合によって検証可能な業務不変条件に帰着させなければなりません。"
      ),
      UL(
        ["Đã có oracle rõ ràng cho chống dupe tiền/vật phẩm và IAP idempotency", "Đã kiểm thử ca lỗi: callback IAP lặp, race condition trade, farming/exploit bất thường", "Đã có job đối soát hằng đêm phát hiện sai lệch số dư dù nhỏ nhất", "Đã tách ranh giới AI agent khỏi quyết định thu hồi tài sản/khoá tài khoản", "CI có gate riêng chặn merge nếu phát hiện dupe hoặc Recall anti-cheat suy giảm"],
        ["Clear oracle established for anti-duping and IAP idempotency", "Failure cases tested: duplicate IAP callbacks, trade race conditions, abnormal farming/exploit", "Nightly reconciliation job in place to catch even the smallest balance discrepancy", "AI agent boundary kept separate from asset-revocation/account-suspension decisions", "CI has a dedicated gate blocking merges on detected dupes or anti-cheat Recall regression"],
        ["通貨・アイテムの複製防止とIAP冪等性に明確なオラクルを確立済み", "異常系をテスト済み：IAPコールバック重複・取引の競合状態・異常なファーミング/エクスプロイト", "わずかな残高の食い違いも検知する夜間照合ジョブを整備済み", "AIエージェントの境界を資産没収・アカウント停止の意思決定から分離済み", "複製検知または不正防止Recallの低下でマージをブロックする専用CIゲートを整備済み"]
      ),
      NOTE("Khi bàn giao, đính kèm bộ script k6 mô phỏng tải trade/IAP của sự kiện và câu lệnh đối soát SQL cho đội vận hành để họ có thể tự chạy lại kiểm tra bất cứ lúc nào nghi ngờ có dupe.", "When handing over, attach the k6 script simulating event-scale trade/IAP load and the reconciliation SQL queries for the ops team so they can rerun the check any time duping is suspected.", "引き継ぎ時には、複製が疑われる際にいつでも運用チームが自らチェックを再実行できるよう、イベント規模の取引/IAP負荷を模擬するk6スクリプトと照合SQLクエリを添付してください。"),
    ],
  },
];

const art3 = {
  categorySlug: "enterprise-realworld",
  slug: "gaming-ingame-economy-anticheat",
  cover: cover3,
  tags: tags("thucchien", "saas", "api", "appium", "security", "realworld"),
  title: {
    vi: "Thực chiến: kiểm thử kinh tế in-game, chống gian lận/dupe & IAP idempotency",
    en: "Enterprise: testing in-game economy, anti-cheat/dupe prevention & IAP idempotency",
    ja: "実戦：アプリ内経済のテスト、不正防止・複製対策とIAP冪等性",
  },
  summary: {
    vi: "Bài sâu: bối cảnh kinh tế in-game, kiến trúc, bất biến chống dupe & IAP idempotency, test plan, ma trận ca, code chống gian lận, đối soát, CI, AI, phỏng vấn.",
    en: "Deep dive: in-game economy context, architecture, anti-dupe & IAP idempotency invariants, test plan, case matrix, anti-cheat code, reconciliation, CI, AI, interview.",
    ja: "詳細：アプリ内経済の背景・アーキテクチャ・複製防止とIAP冪等性の不変条件・テスト計画・ケース表・不正防止コード・照合・CI・AI・面接。",
  },
  pages: buildDoc(pages3),
};

export const THUCCHIEN_05_DOCS = [art1, art2, art3];
