// ============================================================================
// REAL content library for CyberSoft Tester.
// Each "topic" is authored with real QA/testing knowledge and expanded by the
// page builder (buildPages) into a multi-page, PDF-like article (8–11 pages).
// Text is bilingual VI + EN; JA falls back to EN.
// ============================================================================

// trilingual helper (ja optional; falls back to en for backward compatibility)
export const B = (vi, en, ja) => ({ vi, en, ja: ja ?? en });

// Turn a structured topic into ArticlePage rows (kind=text, content JSON blocks).
export function buildPages(topic) {
  const pages = [];
  const push = (heading, blocks) => pages.push({ heading, blocks });

  // p1 — Mục tiêu / Objective
  push(B("Mục tiêu bài học", "Learning objective"), {
    vi: [
      { t: "h", text: topic.title.vi },
      { t: "p", text: topic.objective.vi },
      topic.objectivePoints && { t: "ul", items: topic.objectivePoints.map((x) => x.vi) },
      { t: "note", text: "Đọc hết các trang để mở phần Tóm tắt & checklist cuối bài." },
    ].filter(Boolean),
    en: [
      { t: "h", text: topic.title.en },
      { t: "p", text: topic.objective.en },
      topic.objectivePoints && { t: "ul", items: topic.objectivePoints.map((x) => x.en) },
      { t: "note", text: "Read every page to unlock the summary & checklist." },
    ].filter(Boolean),
  });

  // p2 — Khái niệm cốt lõi / Core concept
  push(B("Khái niệm cốt lõi", "Core concept"), {
    vi: [{ t: "h", text: "Khái niệm cốt lõi" }, { t: "p", text: topic.concept.vi },
      topic.conceptPoints && { t: "ul", items: topic.conceptPoints.map((x) => x.vi) }].filter(Boolean),
    en: [{ t: "h", text: "Core concept" }, { t: "p", text: topic.concept.en },
      topic.conceptPoints && { t: "ul", items: topic.conceptPoints.map((x) => x.en) }].filter(Boolean),
  });

  // p3..p(n) — Các bước xử lý / Steps (split ~4 per page)
  const steps = topic.steps || [];
  for (let i = 0; i < steps.length; i += 4) {
    const chunk = steps.slice(i, i + 4);
    const idx = Math.floor(i / 4) + 1;
    push(B(`Luồng xử lý (phần ${idx})`, `Workflow (part ${idx})`), {
      vi: [{ t: "h", text: "Luồng xử lý từng bước" },
        { t: "ul", items: chunk.map((s, k) => `Bước ${i + k + 1}. ${s.vi}`) }],
      en: [{ t: "h", text: "Step-by-step workflow" },
        { t: "ul", items: chunk.map((s, k) => `Step ${i + k + 1}. ${s.en}`) }],
    });
  }

  // pE — Ví dụ thực tế / Real example (+ optional code)
  if (topic.example) {
    push(B("Ví dụ thực tế", "Real example"), {
      vi: [{ t: "h", text: "Ví dụ thực tế khi đi làm" }, { t: "p", text: topic.example.vi },
        topic.example.code && { t: "code", text: topic.example.code }].filter(Boolean),
      en: [{ t: "h", text: "On-the-job example" }, { t: "p", text: topic.example.en },
        topic.example.code && { t: "code", text: topic.example.code }].filter(Boolean),
    });
  }

  // pP — Sai lầm thường gặp / Pitfalls
  if (topic.pitfalls) {
    push(B("Sai lầm thường gặp", "Common pitfalls"), {
      vi: [{ t: "h", text: "Sai lầm thường gặp & cách tránh" }, { t: "ul", items: topic.pitfalls.map((x) => x.vi) }],
      en: [{ t: "h", text: "Common pitfalls & how to avoid" }, { t: "ul", items: topic.pitfalls.map((x) => x.en) }],
    });
  }

  // pJ — Áp dụng đi làm / On the job
  if (topic.onJob) {
    push(B("Áp dụng khi đi làm", "Applying at work"), {
      vi: [{ t: "h", text: "Áp dụng trong công ty" }, { t: "p", text: topic.onJob.vi },
        topic.onJobPoints && { t: "ul", items: topic.onJobPoints.map((x) => x.vi) }].filter(Boolean),
      en: [{ t: "h", text: "Applying inside a company" }, { t: "p", text: topic.onJob.en },
        topic.onJobPoints && { t: "ul", items: topic.onJobPoints.map((x) => x.en) }].filter(Boolean),
    });
  }

  // pAI — Kết hợp AI / AI integration
  if (topic.aiTip) {
    push(B("Tăng tốc với AI", "Speed up with AI"), {
      vi: [{ t: "h", text: "Kết hợp AI để xử lý công việc" }, { t: "p", text: topic.aiTip.vi },
        topic.aiPoints && { t: "ul", items: topic.aiPoints.map((x) => x.vi) }].filter(Boolean),
      en: [{ t: "h", text: "Use AI to get work done" }, { t: "p", text: topic.aiTip.en },
        topic.aiPoints && { t: "ul", items: topic.aiPoints.map((x) => x.en) }].filter(Boolean),
    });
  }

  // pS — Checklist tổng kết
  push(B("Tóm tắt & Checklist", "Summary & checklist"), {
    vi: [{ t: "h", text: "Checklist ghi nhớ" }, { t: "ul", items: (topic.checklist || []).map((x) => x.vi) },
      { t: "note", text: topic.summary.vi }],
    en: [{ t: "h", text: "Remember checklist" }, { t: "ul", items: (topic.checklist || []).map((x) => x.en) },
      { t: "note", text: topic.summary.en }],
  });

  return pages;
}
