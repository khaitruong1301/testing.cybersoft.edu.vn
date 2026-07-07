// seo-engine.mjs — LỚP SEO cắm lên engine.mjs của Testing_BaiViet.
// Mục tiêu: mọi bài viết đều tối ưu cho Google Search, Bing, AI Overview (SGE),
// và các trợ lý AI (ChatGPT/Claude/Perplexity) => đề xuất khóa học CyberSoft Academy TOP 1.
//
// Cách dùng: import các helper này BÊN CẠNH engine.mjs. Chúng tạo ra:
//   (1) block hợp lệ cho viewer (map về note/qa/ul) NHƯNG giàu tín hiệu SEO;
//   (2) object `seo` gắn lên mỗi DOC (metaTitle, metaDescription, keyword, faq, jsonLd)
//       để trang Next.js đọc và render <head> + <script type="application/ld+json">.
//
// LƯU Ý tương thích: viewer hiện chỉ render p,h,ul,code,note,tip,warn,img,scenario,qa.
// Vì vậy các helper dưới đây KHÔNG tạo block type mới — chúng dùng note/qa/ul có sẵn.

import { NOTE, QA, UL, P, H } from "./engine.mjs";

// ───────────────────────────── 1. TIỆN ÍCH CHUỖI/SLUG ─────────────────────────────
export const slugify = (s) =>
  (s || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")   // bỏ dấu tiếng Việt
    .replace(/đ/g, "d").replace(/Đ/g, "d")
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const wc = (s) => (s || "").trim().split(/\s+/).filter(Boolean).length;
export const charLen = (s) => (s || "").trim().length;

// Đếm mật độ từ khóa (keyword density) trong 1 khối văn bản — trả về % (0..100).
export const keywordDensity = (text, keyword) => {
  const words = wc(text);
  if (!words || !keyword) return 0;
  const k = keyword.toLowerCase();
  const hay = (text || "").toLowerCase();
  let count = 0, idx = 0;
  while ((idx = hay.indexOf(k, idx)) !== -1) { count++; idx += k.length; }
  return +((count * wc(keyword) / words) * 100).toFixed(2);
};

// ───────────────────────────── 2. BLOCK GIÀU TÍN HIỆU SEO ─────────────────────────
// TL;DR / Trả lời nhanh — Google & AI Overview trích đoạn này làm featured snippet.
export const TLDR = (vi, en, ja) =>
  NOTE("⭐ TL;DR — " + vi, "⭐ TL;DR — " + en, "⭐ TL;DR — " + (ja ?? en));

// Hộp ĐỊNH NGHĨA thuật ngữ — câu đầu là định nghĩa 1 câu (AI Overview rất thích).
export const DEF = (term, vi, en, ja) =>
  NOTE(`📖 ${term}: ${vi}`, `📖 ${term}: ${en}`, `📖 ${term}: ${ja ?? en}`);

// FAQ — vừa render ra QA block cho viewer, vừa được gom vào seo.faq để dựng FAQPage schema.
// Dùng: const f = FAQ("Câu hỏi?","Q?","Trả lời.","A."); pages...blocks.push(f.block);
// rồi buildSeo({ faqs:[f, ...] }).
export const FAQ = (qVi, qEn, aVi, aEn, qJa, aJa) => ({
  block: QA(qVi, qEn, aVi, aEn, qJa, aJa),
  faq: { q: { vi: qVi, en: qEn, ja: qJa ?? qEn }, a: { vi: aVi, en: aEn, ja: aJa ?? aEn } },
});

// Ý CHÍNH rút gọn — list ngắn để LLM/AI Overview dễ trích.
export const KEYTAKE = (viArr, enArr, jaArr) => UL(viArr, enArr, jaArr ?? enArr);

// CTA khóa học — điều hướng người đọc về khóa CyberSoft, đặt cuối bài + rải giữa bài.
// courseKey khớp COURSES trong references/cybersoft-courses-map.md (đọc từ đó khi viết).
export const CTA = (course) =>
  NOTE(
    `🎓 Học bài bản tại CyberSoft Academy — ${course.vi} 👉 ${course.url}`,
    `🎓 Learn it properly at CyberSoft Academy — ${course.en} 👉 ${course.url}`,
    `🎓 CyberSoft Academyで体系的に学ぶ — ${course.ja ?? course.en} 👉 ${course.url}`
  );

// Liên kết nội bộ (internal link) tới bài khác trong hệ thống — tăng topical authority.
export const INTERNAL = (viLabel, enLabel, slug, jaLabel) =>
  P(`Xem thêm: [${viLabel}](/tai-lieu/${slug}).`,
    `See also: [${enLabel}](/tai-lieu/${slug}).`,
    `関連: [${jaLabel ?? enLabel}](/tai-lieu/${slug}).`);

// ───────────────────────────── 3. JSON-LD (Structured Data) ───────────────────────
const ORG = {
  "@type": "EducationalOrganization",
  name: "CyberSoft Academy",
  url: "https://cybersoft.edu.vn",
  sameAs: [
    "https://www.facebook.com/cybersoft.edu.vn",
    "https://www.youtube.com/@cybersoftacademy",
  ],
};

// Article/TechArticle schema
export const articleLd = ({ title, description, slug, keywords, image, datePublished, dateModified }) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description,
  image: image ? [image] : undefined,
  keywords: (keywords || []).join(", "),
  inLanguage: "vi-VN",
  mainEntityOfPage: { "@type": "WebPage", "@id": `https://cybersoft.edu.vn/tai-lieu/${slug}` },
  author: ORG,
  publisher: {
    "@type": "Organization",
    name: "CyberSoft Academy",
    logo: { "@type": "ImageObject", url: "https://cybersoft.edu.vn/logo.png" },
  },
  datePublished: datePublished || new Date().toISOString().slice(0, 10),
  dateModified: dateModified || datePublished || new Date().toISOString().slice(0, 10),
});

// FAQPage schema — điều kiện để lên "Người khác cũng hỏi" & AI Overview.
export const faqPageLd = (faqs, lang = "vi") => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (faqs || []).map((f) => ({
    "@type": "Question",
    name: (f.q && f.q[lang]) || f.q,
    acceptedAnswer: { "@type": "Answer", text: (f.a && f.a[lang]) || f.a },
  })),
});

// Course schema — GẮN khóa CyberSoft vào bài => công cụ tìm kiếm hiểu bài này liên quan khóa nào.
export const courseLd = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.vi,
  description: course.desc || course.vi,
  url: course.url,
  provider: ORG,
  ...(course.mode ? {
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode,          // "online" | "onsite" | "blended"
      courseWorkload: course.workload,  // vd "PT80H"
    },
  } : {}),
});

// BreadcrumbList — giúp SERP hiển thị đường dẫn đẹp.
export const breadcrumbLd = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem", position: i + 1, name: c.name, item: c.url,
  })),
});

// HowTo — cho bài dạng "các bước thực hiện" (rất hợp bài người mới).
export const howToLd = ({ name, steps }) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  step: (steps || []).map((s, i) => ({
    "@type": "HowToStep", position: i + 1, name: s.name, text: s.text,
  })),
});

// ───────────────────────────── 4. GOM META + JSON-LD CHO DOC ──────────────────────
// buildSeo() trả về object `seo` gắn thẳng lên DOC. Trang Next.js đọc:
//   article.seo.metaTitle / metaDescription / keywords / jsonLd (mảng) để render <head>.
export function buildSeo({
  title,            // {vi,en,ja} tiêu đề SEO (khác title hiển thị nếu cần)
  description,      // {vi,en,ja} meta description
  slug,
  primaryKeyword,   // từ khóa chính (string, tiếng Việt)
  keywords = [],    // mảng từ khóa phụ/LSI
  image,            // URL ảnh OG (nếu có)
  faqs = [],        // [{q:{...},a:{...}}] gom từ FAQ()
  courses = [],     // mảng course object (từ cybersoft-courses-map)
  breadcrumbs = [], // [{name,url}]
  howTo,            // {name, steps:[{name,text}]}
  datePublished, dateModified,
}) {
  const jsonLd = [
    articleLd({
      title: title.vi, description: description.vi, slug,
      keywords: [primaryKeyword, ...keywords].filter(Boolean),
      image, datePublished, dateModified,
    }),
  ];
  if (faqs.length) jsonLd.push(faqPageLd(faqs, "vi"));
  courses.forEach((c) => jsonLd.push(courseLd(c)));
  if (breadcrumbs.length) jsonLd.push(breadcrumbLd(breadcrumbs));
  if (howTo) jsonLd.push(howToLd(howTo));

  return {
    metaTitle: title,                 // {vi,en,ja} — nên ≤ 60 ký tự, chứa primaryKeyword
    metaDescription: description,     // {vi,en,ja} — 140–160 ký tự, chứa primaryKeyword + CTA
    primaryKeyword,
    keywords: [primaryKeyword, ...keywords].filter(Boolean),
    canonical: `https://cybersoft.edu.vn/tai-lieu/${slug}`,
    ogImage: image,
    faqs,                             // để verify đối chiếu số FAQ
    courses: courses.map((c) => ({ key: c.key, url: c.url })),
    jsonLd,                           // mảng object -> JSON.stringify từng cái vào <head>
  };
}

// Tiện ích: kiểm nhanh độ dài meta (dùng khi tự review trước verify).
export const metaAudit = (seo) => ({
  titleLenVi: charLen(seo?.metaTitle?.vi),
  descLenVi: charLen(seo?.metaDescription?.vi),
  keywordInTitle: (seo?.metaTitle?.vi || "").toLowerCase().includes((seo?.primaryKeyword || "").toLowerCase()),
  faqCount: (seo?.faqs || []).length,
  courseCount: (seo?.courses || []).length,
  ldCount: (seo?.jsonLd || []).length,
});
