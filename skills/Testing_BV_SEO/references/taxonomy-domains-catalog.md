# Taxonomy · Domains · Catalog (~500 bài)

## 1. Từ điển TAG (song ngữ + tiếng Nhật)
Mỗi tag: `{ k, vi, en, ja, g }`. Nhóm `g`: **kind** (LOẠI bài, hiện thành badge), **domain**, **tech**, **type**.

### kind (mỗi bài đúng 1)
| k | vi | en | ja |
|---|---|---|---|
| congnghe | Chuyên công nghệ | Technology | 技術特化 |
| nangcao | Chuyên nâng cao | Advanced | 応用 |
| phongvan | Chuyên phỏng vấn | Interview-focus | 面接特化 |
| thucchien | Thực chiến doanh nghiệp | Enterprise real-world | 実戦 |
| tichhop | Tích hợp | Integrated | 統合 |

### domain
banking(Ngân hàng/銀行) · fintech(Fintech/フィンテック) · insurance(Bảo hiểm/保険) ·
healthcare(Y tế/医療) · ecommerce(TMĐT/EC) · retail(Bán lẻ/小売) · crm(CRM/CRM) · erp(ERP/ERP) ·
saas(Dịch vụ SaaS/SaaS) · logistics(Logistics/物流) · telecom(Viễn thông/通信) · gov(Công/公共) ·
edtech(Giáo dục/教育) · gaming(Game/ゲーム) · traveltech(Du lịch/旅行).

### tech
playwright · selenium · cypress · appium(mobile) · postman(API) · restassured · k6(perf) · jmeter ·
graphql · contract(PACT) · cicd · pom · fixtures · mocking · datadriven · visual · a11y(accessibility) ·
security · aitesting · db(kiểm thử dữ liệu) · docker · trace(debug).

### type
foundation(Nền tảng/基礎) · realworld(Thực tế/実務) · interview(Phỏng vấn/面接) ·
tip(Tip/コツ) · experience(Kinh nghiệm/経験) · advanced(Nâng cao/上級).

> Khi tạo bài, luôn: 1 kind + 1–2 domain + 1–3 tech + 1–2 type.

## 2. Phân tích DOMAIN (mình chọn — dùng làm "chất liệu" bài thực chiến/tích hợp)
Mỗi domain có "đặc sản" test riêng — đây là nơi lấy *oracle* và ca lỗi giá trị cao.

- **Ngân hàng (banking):** sổ cái ghi kép, idempotency, hold/settlement, đối soát NAPAS/SWIFT, hạn mức,
  chống gian lận, ACID, tuân thủ SBV. *Oracle:* bảo toàn tiền, trạng thái cuối, khớp đối soát.
- **Fintech/Ví (fintech):** KYC nhiều cấp, hạn mức theo KYC, nạp/rút, cổng thanh toán, hoàn tiền,
  chống gian lận (velocity, geo, device), reconciliation với đối tác. *Oracle:* hạn mức, số dư, idempotency.
- **Bảo hiểm (insurance):** thẩm định (underwriting) theo bảng quyết định, tính phí (actuarial factor),
  bồi thường (claims) với quy tắc loại trừ & thời gian chờ, tái tục. *Oracle:* decision table, exclusion.
- **Y tế (healthcare):** HIPAA/PHI, HL7/FHIR, đặt lịch, EMR, tương tác thuốc, an toàn (không tư vấn nguy
  hiểm). *Oracle:* quyền riêng tư, grounding, ràng buộc an toàn.
- **TMĐT (ecommerce):** giỏ hàng, khuyến mãi/coupon, tồn kho (không âm, oversell), order-to-cash, thanh
  toán, đồng thời cao (flash sale). *Oracle:* tồn kho, tổng tiền/coupon, trạng thái đơn.
- **Bán lẻ/POS (retail):** đồng bộ online-offline, tồn kho đa kho, hoàn/đổi, loyalty. *Oracle:* tồn kho, điểm.
- **CRM:** vòng đời lead→deal, phân quyền, trùng lặp dữ liệu (dedup/merge), automation pipeline, SLA.
  *Oracle:* RBAC, không mất/nhân bản bản ghi, chuyển trạng thái hợp lệ.
- **ERP:** đa phân hệ (kho, kế toán GL, mua hàng), duyệt nhiều cấp, khoá kỳ, chạy batch, tích hợp.
  *Oracle:* cân đối kế toán, quy tắc duyệt, khoá kỳ.
- **SaaS/Dịch vụ (saas):** subscription/billing theo usage, multi-tenancy (cô lập tenant), RBAC, proration,
  dunning. *Oracle:* cô lập dữ liệu tenant, hoá đơn đúng, quyền.
- **Logistics:** tracking, định tuyến, phân công tài xế, SLA giao, COD. *Oracle:* trạng thái đơn, đối soát COD.
- **Viễn thông (telecom):** provisioning SIM/gói, tính cước (rating/mediation), roaming, top-up. *Oracle:* cước đúng.
- **Công/EdTech/Du lịch/Game:** dịch vụ công (định danh, biểu mẫu), thi/điểm/chống gian lận, đặt vé/tồn
  chỗ (double-booking), kinh tế in-game/anti-cheat.

## 3. Ma trận sinh bài (đạt ~100/loại)
Công thức: **kind × domain × chủ đề con** ⇒ dư sức 100 mỗi kind.

- **congnghe (~100):** ~22 chủ đề công nghệ (Playwright locators/auto-wait/POM/fixtures/network/trace/
  API/visual/a11y/CI, Selenium grid/waits, Cypress, Appium mobile, Postman/Newman, REST Assured, k6,
  JMeter, GraphQL testing, contract/PACT, WebSocket, DB testing, Docker cho test...) × biến thể ngôn ngữ/
  độ sâu → ≥100.
- **nangcao (~100):** ~20 chủ đề nâng cao (chống flaky quy mô lớn, test data management, parallel/shard
  tối ưu, visual regression ổn định, self-healing, contract testing, chaos/resilience, performance
  engineering, security testing, observability cho test, đối soát/reconciliation, event-driven/async
  testing, mocking nâng cao, test in prod/canary...) × domain → ≥100.
- **phongvan (~100):** theo (chủ đề × cấp độ Junior/Mid/Senior/Lead) + theo domain + theo công cụ +
  "bộ đề mock" + "20 câu hay trượt" ... → ≥100. Mỗi bài: ngân hàng câu hỏi + cách trả lời + kịch bản.
- **thucchien (~100):** mỗi domain (15 domain) × ~7 bài toán lớn (vd banking: chuyển khoản, thẻ, cho vay,
  KYC, gian lận, đối soát, sao kê) → ≥100. Đây là loại "nặng" nhất, ưu tiên chất lượng.
- **tichhop (~100):** (tổ hợp công cụ: Playwright+API+CI+AI; Selenium+Grid+CI; Appium+device farm;
  k6+CI+observability; contract+CI...) × domain → ≥100.

## 4. CATALOG khởi động (tiêu đề cụ thể — điền dần tới 100/loại)
> Đây là "hạt giống" để bắt đầu; nhân theo domain trong ma trận §3.

### congnghe (mẫu 15)
1. Playwright Locators & Auto-wait chuyên sâu · 2. Web-first assertions & async · 3. Page Object Model
& Fixtures · 4. Network interception & mocking · 5. Trace Viewer/UI Mode/Codegen · 6. API testing với
Playwright request context · 7. Visual regression ổn định · 8. Accessibility testing (axe) · 9. Selenium
WebDriver & Grid · 10. Cypress cho SPA · 11. Appium test mobile · 12. Postman/Newman + CI · 13. REST
Assured (Java) · 14. GraphQL testing · 15. Kiểm thử WebSocket/real-time.

### nangcao (mẫu 12)
1. Chống flaky ở quy mô lớn · 2. Test Data Management & cô lập · 3. Parallel/Sharding tối ưu · 4.
Self-healing locators (có kiểm soát) · 5. Contract testing (PACT) · 6. Chaos/Resilience testing · 7.
Performance engineering với k6 · 8. Security testing cho tester · 9. Đối soát/Reconciliation nâng cao ·
10. Kiểm thử hệ event-driven/async · 11. Mocking nâng cao (service virtualization) · 12. Observability
cho automation.

### phongvan (mẫu 12)
1. 50 câu Playwright theo cấp độ · 2. Câu hỏi Automation Framework · 3. Câu hỏi API testing · 4. Câu
hỏi Performance · 5. Câu hỏi CI/CD cho QA · 6. Câu hỏi Manual/Test design · 7. Câu hỏi Agile/Scrum cho
QA · 8. Kịch bản mock 1-1 (Senior) · 9. Bài tập tình huống chống flaky · 10. 20 lỗi khiến trượt phỏng
vấn QA · 11. Câu hỏi theo domain ngân hàng/fintech · 12. Câu hỏi AI trong testing.

### thucchien (mẫu 12 — mỗi bài như flagship)
1. Ngân hàng: chuyển khoản liên NH & đối soát (đã có) · 2. Fintech: nạp tiền & hạn mức KYC & gian lận ·
3. Bảo hiểm: thẩm định & tính phí theo bảng quyết định · 4. Bảo hiểm: bồi thường (claims) & loại trừ ·
5. Y tế: đặt lịch & EMR & quyền riêng tư · 6. TMĐT: checkout & tồn kho flash sale · 7. TMĐT: khuyến mãi
& coupon & order-to-cash · 8. CRM: dedup/merge & phân quyền · 9. ERP: duyệt mua hàng & cân đối GL · 10.
SaaS: billing theo usage & multi-tenancy · 11. Logistics: tracking & COD reconciliation · 12. Viễn
thông: rating/mediation cước.

### tichhop (mẫu 10)
1. E2E TMĐT: Playwright + API + CI + AI Agent · 2. Fintech chống gian lận: sinh test bằng AI + human
review · 3. Ngân hàng: contract testing giữa microservices + CI · 4. Mobile bảo hiểm: Appium + device
farm + CI · 5. Perf + chất lượng: k6 + Playwright + observability · 6. RAG chatbot y tế: eval harness +
Playwright UI · 7. ERP: batch + đối soát + giám sát · 8. SaaS: multi-tenant security + RBAC + CI · 9.
Logistics realtime: WebSocket + API + E2E · 10. Data pipeline QA: DB + API + CI.

## 5. Phân bổ để "phong phú" (tránh trùng lặp)
- Rải đều domain trong mỗi kind (đừng để 60% bài đổ vào ngân hàng).
- Đa dạng công cụ (đừng chỉ Playwright): Selenium/Cypress/Appium/Postman/k6/JMeter/GraphQL/PACT.
- Đa dạng cấp độ (foundation → advanced) và ngôn ngữ code (TS/JS/Python/Java) tuỳ chủ đề.
- Mỗi thumbnail đổi bảng màu theo domain (xem `assets/thumbnail.mjs` — palette theo domain/kind).
