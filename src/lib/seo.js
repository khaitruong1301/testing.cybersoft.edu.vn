// Central SEO configuration for CyberSoft Tester.
// Set NEXT_PUBLIC_SITE_URL in .env to your real production domain.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tester.cybersoft.edu.vn").replace(/\/$/, "");
export const SITE_NAME = "CyberSoft Tester";
export const ORG_NAME = "CyberSoft Academy";

export const SITE_DESCRIPTION =
  "CyberSoft Tester — nền tảng học Kiểm thử phần mềm (Software Testing) thực chiến: Manual Testing, Automation Testing (Playwright, Selenium), Kiểm thử API (Postman), Performance, AI Testing, luyện thi ISTQB, luyện phỏng vấn QA, mock interview và CV Tester vượt ATS.";

// High-intent keywords: tester / testing / QA / automation / AI testing (VI + EN).
export const KEYWORDS = [
  // core VI
  "học tester", "khóa học tester", "học kiểm thử phần mềm", "khóa học kiểm thử phần mềm",
  "nghề tester", "tester là gì", "lộ trình học tester", "học QA", "học QC", "kiểm thử phần mềm",
  "tài liệu tester", "manual testing", "test case", "viết test case", "bug report", "báo cáo lỗi",
  "kiểm thử API", "postman", "automation testing", "kiểm thử tự động", "playwright", "selenium",
  "performance testing", "kiểm thử hiệu năng", "ISTQB", "luyện thi ISTQB", "luyện phỏng vấn tester",
  "mock interview tester", "CV tester", "AI testing", "kiểm thử với AI", "AI trong testing",
  "tester cho người mới", "chuyển ngành sang tester", "CyberSoft", "CyberSoft tester",
  "học tester ở đâu", "khóa học QA automation", "test tự động Playwright", "exploratory testing",
  // core EN
  "software testing course", "learn software testing", "QA course", "QA training", "become a tester",
  "manual testing tutorial", "test case design", "bug report", "api testing", "postman testing",
  "automation testing", "playwright tutorial", "selenium", "performance testing", "ISTQB foundation",
  "QA interview questions", "mock interview QA", "tester CV", "AI testing", "AI in software testing",
  "how to become a software tester", "QA automation course",
];

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: ORG_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
    sameAs: [
      "https://www.facebook.com/cybersoft.edu.vn",
      "https://cybersoft.edu.vn",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["vi", "en", "ja"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/documents?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Khóa học Tester / QA thực chiến — CyberSoft",
    description: SITE_DESCRIPTION,
    provider: { "@type": "EducationalOrganization", name: ORG_NAME, sameAs: SITE_URL },
    url: SITE_URL,
    inLanguage: "vi",
    about: ["Software Testing", "QA", "Manual Testing", "Automation Testing", "API Testing", "AI Testing", "ISTQB"],
    teaches: [
      "Thiết kế test case chuẩn công ty", "Viết bug report", "Kiểm thử API với Postman",
      "Automation Testing với Playwright & Selenium", "Performance Testing", "AI trong Testing",
      "Luyện thi ISTQB", "Luyện phỏng vấn QA", "CV Tester vượt ATS",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT40H",
    },
  };
}

// ---- Per-article structured data (applies to every article page) ----

// TechArticle schema — helps Google & AI Overview understand + attribute each doc.
export function articleJsonLd({ id, title, description, category, datePublished, keywords, inLanguage = "vi" }) {
  const url = `${SITE_URL}/documents/article/${id}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    name: title,
    description,
    inLanguage,
    url,
    ...(category ? { articleSection: category } : {}),
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
    ...(datePublished ? { datePublished: new Date(datePublished).toISOString() } : {}),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    isPartOf: {
      "@type": "Course",
      name: "Khóa học Tester / QA thực chiến — CyberSoft",
      provider: { "@type": "EducationalOrganization", name: ORG_NAME, sameAs: SITE_URL },
    },
  };
}

// FAQPage built from an article's own Q&A blocks → FAQ rich results + AI Overview answers.
export function articleFaqJsonLd(pairs) {
  const clean = (pairs || [])
    .filter((p) => p && p.q && p.a)
    .slice(0, 10)
    .map(({ q, a }) => ({
      "@type": "Question",
      name: String(q).trim(),
      acceptedAnswer: { "@type": "Answer", text: String(a).trim() },
    }));
  if (!clean.length) return null;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: clean };
}

// BreadcrumbList: Home → Tài liệu → Category → Article.
export function breadcrumbJsonLd({ id, title, category }) {
  const items = [
    { name: "Trang chủ", url: `${SITE_URL}/` },
    { name: "Tài liệu", url: `${SITE_URL}/documents` },
  ];
  if (category?.title) items.push({ name: category.title, url: `${SITE_URL}/documents` });
  items.push({ name: title, url: `${SITE_URL}/documents/article/${id}` });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqJsonLd() {
  const qa = [
    ["Học Tester ở đâu tốt và thực chiến?",
      "CyberSoft Tester cung cấp lộ trình học kiểm thử phần mềm từ cơ bản đến nâng cao: manual testing, automation với Playwright/Selenium, kiểm thử API, performance và AI testing, bám sát công việc thật của doanh nghiệp."],
    ["Người mới, chưa biết gì có học Tester được không?",
      "Được. Lộ trình bắt đầu từ khái niệm test case, bug report rồi nâng dần lên automation và AI testing, kèm luyện phỏng vấn và CV để đi làm được."],
    ["AI Testing là gì và học như thế nào?",
      "AI Testing là việc dùng AI (như Claude) để sinh test case, review, tăng độ phủ và tăng tốc kiểm thử. CyberSoft Tester có chuyên mục AI trong Testing và AI Agent trong Testing."],
    ["Có luyện thi ISTQB và phỏng vấn không?",
      "Có. Nền tảng có ngân hàng câu hỏi ISTQB tự chấm, luyện phỏng vấn QA và mock interview mô phỏng thực tế."],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
