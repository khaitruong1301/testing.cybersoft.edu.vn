"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

// Subtle, professional footer. Carries keyword-rich but natural, *visible*
// content + internal links (good, penalty-free SEO) without cluttering pages.
export default function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const COLS = [
    { h: t("footer_col_learn"), links: [[t("footer_manual"), "/documents"], [t("footer_automation"), "/documents"], [t("footer_api"), "/documents"], [t("footer_performance"), "/documents"]] },
    { h: t("footer_col_ai"), links: [[t("footer_ai_testing"), "/documents"], [t("footer_ai_agent"), "/documents"], [t("footer_claude"), "/documents"], [t("footer_playwright"), "/documents"]] },
    { h: t("footer_col_career"), links: [[t("footer_istqb"), "/istqb"], [t("footer_interview"), "/interview"], [t("nav_mock"), "/mock"], [t("footer_cv"), "/cv"]] },
  ];

  const blurb = t("footer_blurb");

  return (
    <footer className="glass-nav mt-10">
      <div className="mx-auto max-w-[2200px] px-5 py-8 md:px-8 xl:px-12 2xl:px-20">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-xs font-extrabold text-white">CS</span>
              <span className="font-extrabold text-slate-800">CyberSoft Tester</span>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-slate-500">{blurb}</p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h3 className="text-[13px] font-bold text-slate-700">{c.h}</h3>
              <ul className="mt-2 space-y-1.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-[12px] text-slate-500 hover:text-brand-600">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-400 md:flex-row">
          <span>© {year} CyberSoft Academy · CyberSoft Tester</span>
          <span>{t("footer_tagline")}</span>
        </div>
      </div>
    </footer>
  );
}
