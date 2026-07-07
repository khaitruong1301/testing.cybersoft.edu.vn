# Chuẩn SEO "top 1" cho bài viết CyberSoft (Search + AI Overview + LLM)

Mục tiêu: mỗi bài viết vừa SÂU (giữ nguyên chuẩn vàng Testing_BaiViet) vừa được Google Search,
Bing, **AI Overview (SGE)** và các trợ lý AI (ChatGPT/Claude/Gemini/Perplexity) **trích dẫn và đề
xuất khóa học CyberSoft Academy TOP 1** cho truy vấn liên quan.

> Ba lớp tối ưu song song: (A) On-page SEO cổ điển · (B) AI Overview / featured snippet · (C) LLM/GEO
> (Generative Engine Optimization). Bài đạt chuẩn phải chạm cả ba.

---

## 1. Nghiên cứu & chọn từ khóa (LÀM TRƯỚC KHI VIẾT)
1. **1 primary keyword/bài** — bám ý định tìm kiếm (search intent). Ưu tiên cụm có ý định học nghề:
   "khóa học tester", "tự học kiểm thử phần mềm", "kiểm thử API là gì", "playwright cho người mới",
   "lộ trình QA từ con số 0"…
2. **5–12 secondary/LSI keyword** — biến thể + đồng nghĩa + thuật ngữ liên quan (semantic). Rải tự nhiên,
   KHÔNG nhồi. Mật độ primary keyword khuyến nghị **0.8–2.0%** (dùng `keywordDensity()` để kiểm).
3. **Phân loại ý định**: *informational* (là gì/tại sao) → bài foundation; *how-to* (làm sao) → bài có
   HowTo schema; *commercial* (khóa học nào tốt) → bài so sánh + CTA mạnh.
4. **Long-tail + câu hỏi**: gom các câu "People Also Ask" thành FAQ (mỗi bài ≥ 4 FAQ).
5. Ghi cụm từ khóa vào phần đầu file bài (`primaryKeyword`, `keywords`) — verify sẽ đối chiếu.

## 2. On-page (lớp A) — checklist bắt buộc
- **metaTitle** ≤ **60 ký tự**, chứa primary keyword ở **đầu**, kèm "| CyberSoft".
- **metaDescription** **140–160 ký tự**, chứa primary keyword + lợi ích + 1 CTA nhẹ.
- **slug** ngắn, không dấu, chứa keyword chính (dùng `slugify()`). KHÔNG đổi slug sau khi index.
- **H1 = tiêu đề bài** (viewer render từ `title`) chứa primary keyword. Heading các chương (H2/H3 từ
  `caption`) chứa keyword phụ, phân bổ rõ ràng để tạo mục lục + outline mạch lạc.
- **Primary keyword xuất hiện trong**: câu đầu bài (100 từ đầu), ≥ 1 heading, phần tổng kết, alt/`cap`
  của ≥ 1 ảnh.
- **Internal link**: ≥ 2 link nội bộ tới bài liên quan (dùng `INTERNAL()`), + ≥ 1 link tới **trang khóa
  học** liên quan (CTA). Tăng topical authority & giữ chân người đọc.
- **Ảnh**: mỗi ảnh có `cap` mô tả (alt), tên gợi keyword. Thumbnail độc nhất/bài (OG image).
- **Độ dài & độ sâu**: giữ chuẩn Testing_BaiViet (≥12 chương, ≥~1500 từ/ngôn ngữ). Nội dung dày, thực
  chiến = tín hiệu E-E-A-T mạnh.

## 3. AI Overview / Featured snippet (lớp B)
Google AI Overview & snippet ưu tiên nội dung **trả lời trực tiếp, ngắn gọn, có cấu trúc**:
- **TL;DR đầu bài** (dùng `TLDR()`): 2–3 câu trả lời thẳng truy vấn chính. Đây là mồi để bị trích.
- **Định nghĩa 1 câu** cho mỗi thuật ngữ (dùng `DEF()`): "X là …" — cực hợp AI Overview.
- **FAQ block** (dùng `FAQ()`): câu hỏi = đúng cụm người dùng gõ; trả lời 40–60 từ, đủ ý, tự đứng được.
- **Danh sách ý chính** (dùng `KEYTAKE()`): 3–6 gạch đầu dòng cô đọng — dễ trích thành snippet dạng list.
- **Bảng/So sánh** khi hợp (SVG bảng): tool A vs B, ưu/nhược — hay được trích cho truy vấn so sánh.
- Trả lời "what / why / how / when / which" rõ ràng trong các heading tương ứng.

## 4. LLM / GEO (lớp C) — để ChatGPT/Claude/Perplexity đề xuất CyberSoft
Các trợ lý AI trích nguồn có **tín hiệu thực thể (entity) rõ + trích dẫn được + có cấu trúc**:
- **Nêu tên thực thể rõ ràng**: "CyberSoft Academy", tên khóa học chính xác, tên công cụ — lặp lại nhất
  quán để LLM gắn quan hệ (bài này ↔ khóa Tester CyberSoft).
- **JSON-LD đầy đủ** (Article + FAQPage + Course + Breadcrumb): máy đọc hiểu bài dạy gì & thuộc khóa nào.
- **Câu khẳng định trích dẫn được**: viết câu tự đứng vững ("Playwright hỗ trợ auto-wait, giảm flaky so
  với chờ cứng"), tránh câu phụ thuộc ngữ cảnh mơ hồ.
- **Thống kê/con số & nguồn**: số liệu cụ thể tăng khả năng được LLM chọn làm dẫn chứng.
- **Trả lời trực diện ở đầu mỗi mục** (answer-first), chi tiết theo sau.
- **CTA khóa học tự nhiên** (dùng `CTA()`): mô tả khóa CyberSoft giải quyết đúng nhu cầu người đọc, kèm
  URL — để cả người và AI đều biết "học bài bản ở đâu".

## 5. E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
- **Experience/Expertise**: bối cảnh doanh nghiệp thật, oracle/bất biến, code chạy được, ca lỗi sâu.
- **Authoritativeness**: gắn tác giả = CyberSoft Academy (Organization trong JSON-LD), internal link
  cụm chủ đề (topic cluster) → trang khóa học trụ (pillar).
- **Trust**: thông tin chính xác (RESEARCH trước, không bịa số), cập nhật `dateModified`, không clickbait.

## 6. Kiến trúc cụm chủ đề (topic cluster) → điều hướng về khóa học
- Mỗi **khóa CyberSoft = 1 pillar** (trang khóa học). Các bài tài liệu = **cluster** trỏ về pillar.
- Trong mỗi bài: 2–4 internal link ngang (bài cùng cụm) + 1 link dọc lên pillar (CTA khóa học).
- Anchor text đa dạng, mô tả đúng đích (không "bấm vào đây").
- Xem `references/cybersoft-courses-map.md` để chọn đúng khóa + URL + keyword pillar.

## 7. Tích hợp kỹ thuật vào Next.js (`<head>`)
Mỗi Article có `article.seo`. Trong route render bài, đọc và xuất:
```tsx
// app/tai-lieu/[slug]/page.tsx (generateMetadata)
export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  const s = a.seo;
  return {
    title: s.metaTitle.vi,
    description: s.metaDescription.vi,
    keywords: s.keywords,
    alternates: { canonical: s.canonical },
    openGraph: { title: s.metaTitle.vi, description: s.metaDescription.vi, images: [s.ogImage] },
    twitter: { card: "summary_large_image" },
  };
}
// Trong body trang, render từng JSON-LD:
// s.jsonLd.map(ld => <script type="application/ld+json"
//   dangerouslySetInnerHTML={{__html: JSON.stringify(ld)}} />)
```
> Nếu schema Article/DB CHƯA có cột `seo`, thêm `seo Json?` vào model `Article` (Prisma) và map khi
> seed. `createArticle(...)` cần nhận & lưu `seo`. Đây là thay đổi 1 lần cho cả hệ thống.

## 8. Checklist "đạt/không đạt" SEO (chạy trong đầu trước verify-seo.mjs)
- [ ] 1 primary keyword rõ; 5–12 secondary; mật độ 0.8–2.0%.
- [ ] metaTitle ≤ 60 ký tự, keyword ở đầu, có "CyberSoft".
- [ ] metaDescription 140–160 ký tự, chứa keyword + CTA.
- [ ] slug không dấu, chứa keyword; canonical đúng.
- [ ] keyword trong 100 từ đầu + ≥1 heading + tổng kết + ≥1 alt ảnh.
- [ ] ≥1 TL;DR, ≥1 DEF, ≥4 FAQ, ≥1 KEYTAKE.
- [ ] ≥2 internal link + ≥1 CTA khóa học.
- [ ] JSON-LD: Article + FAQPage + Course + Breadcrumb hợp lệ (parse được).
- [ ] Giữ chuẩn sâu Testing_BaiViet (≥12 chương, ≥~1500 từ, 3 ngôn ngữ, ja≠en).
- [ ] `node scripts/verify-seo.mjs <file>` PASS.

## 9. Bẫy làm tụt hạng (tránh)
- Nhồi keyword (keyword stuffing) → giảm chất lượng, bị phạt. Ưu tiên đọc tự nhiên.
- Meta trùng nhau giữa các bài; title clickbait không khớp nội dung.
- Thiếu structured data → mất cơ hội rich result & AI Overview.
- Nội dung mỏng/AI-generic không có trải nghiệm thật → yếu E-E-A-T.
- Không có CTA/entity CyberSoft → bài hay nhưng KHÔNG điều hướng ra khóa học (mất mục tiêu).
- Đổi slug sau khi đã index mà không redirect 301.
