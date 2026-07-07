# Chuẩn biên soạn (authoring standard)

## A. Độ sâu bắt buộc
- **Số chương (page):** 12–16. Mỗi chương có `heading` rõ ràng (mục lục lấy từ đây).
- **Văn xuôi:** ≥ ~1500 từ/ngôn ngữ (vi và en) ở các block `p` (chưa tính code/list/caption).
- **Đoạn văn:** mỗi block `p` là 3–6 câu mô tả bài bản, có số liệu/bối cảnh, KHÔNG viết cụt.
- **Thành phần tối thiểu mỗi bài:** ≥ 6 khối `code`, ≥ 2 hình `img` (SVG tự vẽ), ≥ 3 `qa`
  (phỏng vấn), ≥ 2 `scenario` hoặc `note/tip/warn` xen kẽ.

## B. Cấu trúc 14 chương (khung mặc định cho bài "thực chiến"/"tích hợp")
1. Bối cảnh doanh nghiệp & phạm vi — quy mô (user, giao dịch/ngày), SLA, ràng buộc tuân thủ, scope.
2. Kiến trúc hệ thống & luồng nghiệp vụ — sơ đồ SVG, sync/async, điểm khó test.
3. Mô hình dữ liệu & bất biến nghiệp vụ — data model, invariants làm *oracle* (điều PHẢI luôn đúng).
4. Phân tích rủi ro & chiến lược kiểm thử — ma trận rủi ro, kim tự tháp, tỉ lệ tầng test.
5. Test Plan bài bản — scope, entry/exit, môi trường, chiến lược dữ liệu, vai trò, chỉ số.
6. Ma trận thiết kế ca kiểm thử — equivalence/boundary/decision table, bảng SVG, đặt tên ca.
7. Chuẩn bị dữ liệu & môi trường — seed/reset qua API test-only, mock bên thứ ba, cô lập.
8. Hiện thực automation: happy path — POM/fixtures/config + code, assert theo *oracle*.
9. Ca lỗi chuyên sâu — idempotency, hoàn tiền/bù trừ, timeout, vượt hạn mức... (nhiều code).
10. Nghiệp vụ nền/hậu kiểm — đối soát/batch/report/kiểm tra bất biến toàn hệ thống.
11. CI/CD, giám sát & chỉ số — pipeline, shard/parallel, gate, KPI, flaky.
12. Tích hợp AI Agent — phần nào AI tự làm / phần nào người giữ; ranh giới trách nhiệm.
13. Góc phỏng vấn — Q&A dựa trên chính tình huống + 1 kịch bản phỏng vấn trực tiếp.
14. Tóm tắt & checklist bàn giao.

> Với LOẠI khác, đổi khung nhưng GIỮ độ sâu:
> - **Chuyên công nghệ:** khái niệm → cơ chế bên trong → cài đặt/lệnh (làm-trong-công-cụ-nào) →
>   API/pattern → ví dụ nâng dần → bẫy thường gặp → so sánh công cụ → tình huống thật → phỏng vấn.
> - **Chuyên nâng cao:** vấn đề khó → nguyên nhân gốc → giải pháp/pattern → code → đo lường/tối ưu →
>   ca biên → vận hành → phỏng vấn.
> - **Chuyên phỏng vấn:** bản đồ chủ đề → câu hỏi theo cấp (Junior/Mid/Senior) → cách trả lời ghi
>   điểm → follow-up hay bị hỏi → bài tập tình huống → kịch bản mock 1-1 → lỗi khiến trượt → checklist.
> - **Tích hợp:** bài toán lớn → chọn tổ hợp công cụ → kiến trúc test → hiện thực từng mảnh → ghép CI
>   + AI → vận hành → phỏng vấn.

## C. Oracle-first (quan trọng nhất)
Bài chất lượng cao KHÔNG assert "màn hình hiện Thành công". Luôn xác định **bất biến nghiệp vụ** làm
kết quả kỳ vọng: bảo toàn tiền (double-entry), idempotency, trạng thái cuối duy nhất, khớp đối soát,
tồn kho không âm, ràng buộc RBAC, v.v. Mỗi ca test map tới một/nhiều bất biến.

## D. Chất lượng ngôn ngữ
- **vi:** giọng ấm, chuyên nghiệp, thuật ngữ Anh giữ nguyên khi thông dụng (locator, idempotency...).
- **en:** English-first tương đương, đầy đủ.
- **ja:** DỊCH THẬT, thuật ngữ QA chuẩn (テストケース, ロケーター, 自動待機, アサーション, フレーク,
  冪等性, 回帰, モック, グラウンディング, 幻覚/ハルシネーション...). Giọng です・ます nhất quán.
  KHÔNG copy en sang ja.

## E. Checklist "đạt/không đạt" (chạy trong đầu trước khi verify script)
- [ ] ≥ 12 chương, mỗi chương có heading rõ (mục lục đẹp).
- [ ] ≥ ~1500 từ văn xuôi/ngôn ngữ; đoạn văn đủ dày, có số liệu/bối cảnh.
- [ ] Có oracle/bất biến rõ ràng; ca test assert theo oracle.
- [ ] ≥ 6 code, ≥ 2 img SVG, ≥ 3 qa; có scenario/tip/warn xen kẽ.
- [ ] Đủ 3 ngôn ngữ; ja dịch thật (ja≠en).
- [ ] Đúng 1 tag `kind` + domain + tech + type; thumbnail SVG riêng (không trùng bài khác).
- [ ] `node --check` sạch; verify script PASS.

## F. Bẫy thường gặp khiến bài "mỏng" (tránh)
- Viết bullet cụt thay cho đoạn văn mô tả.
- Nhồi nhiều chủ đề nông thay vì đi sâu 1 bài toán.
- Assert lỏng ("thành công") thay vì số liệu/bất biến cụ thể.
- Bỏ ca lỗi/ca biên (đây mới là nơi giá trị cao và hay được hỏi phỏng vấn).
- ja fallback en (bị coi là chưa dịch).
