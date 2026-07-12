"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { loc } from "@/lib/i18n";
import QuizRunner from "./QuizRunner";

// Bảng màu gradient cho card (theo thứ tự cấp độ / danh mục)
const PALETTES = [
  { grad: "from-emerald-500 via-teal-500 to-cyan-600", soft: "bg-emerald-50 text-emerald-700", btn: "text-emerald-700" },
  { grad: "from-blue-600 via-indigo-600 to-violet-700", soft: "bg-indigo-50 text-indigo-700", btn: "text-indigo-700" },
  { grad: "from-amber-500 via-orange-500 to-rose-500", soft: "bg-amber-50 text-amber-700", btn: "text-orange-700" },
  { grad: "from-fuchsia-600 via-purple-600 to-indigo-700", soft: "bg-fuchsia-50 text-fuchsia-700", btn: "text-fuchsia-700" },
  { grad: "from-rose-500 via-pink-500 to-fuchsia-600", soft: "bg-rose-50 text-rose-700", btn: "text-rose-700" },
  { grad: "from-cyan-500 via-sky-500 to-blue-600", soft: "bg-sky-50 text-sky-700", btn: "text-sky-700" },
];

// Thông điệp theo cấp độ ISTQB (nhận diện từ tên) — trang khác dùng mô tả chung. Đa ngôn ngữ qua t().
function levelInfo(titleText, t) {
  const s = String(titleText || "").toLowerCase();
  if (s.includes("foundation") || s.includes("ctfl"))
    return { tier: t("tier_l1"), desc: t("tier_desc_l1") };
  if (s.includes("advanced") || s.includes("ctal"))
    return { tier: t("tier_l2"), desc: t("tier_desc_l2") };
  if (s.includes("expert") || s.includes("ctel"))
    return { tier: t("tier_l3"), desc: t("tier_desc_l3") };
  return { tier: t("tier_bundle"), desc: t("tier_desc_generic") };
}

export default function InterviewBrowser({ categories, titleKey = "nav_interview", subtitleKey, accent = "emerald", perSession }) {
  const { lang, t } = useLang();
  const [runCat, setRunCat] = useState(null);

  if (runCat) {
    return (
      <div>
        <div className="flex items-center gap-2 px-4 pt-3 md:px-0">
          <button onClick={() => setRunCat(null)} className="text-sm font-medium text-slate-500 hover:text-slate-700">← {t(titleKey)}</button>
        </div>
        <QuizRunner categoryId={runCat} mode="PRACTICE" onClose={() => setRunCat(null)} />
      </div>
    );
  }

  const totalQ = categories.reduce((s, c) => s + (c.count || 0), 0);
  const perLabel = lang === "ja" ? "問/回" : lang === "en" ? " / session" : " câu/lượt";
  const heroGrad = accent === "amber" ? "from-amber-500 via-orange-500 to-rose-500" : "from-emerald-500 via-teal-500 to-cyan-600";
  const subtitle = subtitleKey ? t(subtitleKey) : "";
  const badgeText = accent === "amber" ? t("badge_istqb") : t("badge_interview");

  return (
    <div className="px-4 pb-10 pt-4 md:px-0">
      {/* ---- Hero / thông điệp ---- */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${heroGrad} p-6 text-white shadow-lg md:p-8`}>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-12 right-24 h-44 w-44 rounded-full bg-black/10 blur-2xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold backdrop-blur">
            🎯 {badgeText}
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">{t(titleKey)}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">{subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-semibold">
            {[
              ...(perSession ? [`🎲 ${perSession}${perLabel}`] : []),
              `⚡ ${t("b_autograde")}`, `📖 ${t("b_explain")}`, `🔁 ${t("b_unlimited")}`,
              `🗂️ ${totalQ.toLocaleString("en-US")} ${t("questions")}`,
            ].map((b) => (
              <span key={b} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Cards ---- */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((c, i) => {
          const p = PALETTES[i % PALETTES.length];
          const info = levelInfo(loc(c.title, lang), t);
          return (
            <div key={c.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              {/* mảng gradient trên cùng */}
              <div className={`relative h-28 bg-gradient-to-br ${p.grad}`}>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-xl" />
                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{info.tier}</span>
                </div>
                <div className="absolute -bottom-7 left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md ring-4 ring-white">
                  {c.icon || "📝"}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 pt-10">
                <h3 className="text-base font-extrabold text-slate-900 md:text-lg">{loc(c.title, lang)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{info.desc}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className={`rounded-lg ${p.soft} px-2.5 py-1 text-[11px] font-bold`}>{c.count} {t("questions")}</span>
                  {perSession ? <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-white">🎲 {perSession}{perLabel}</span> : null}
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{t("chip_selfgrade")}</span>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{t("chip_hasexplain")}</span>
                </div>

                <button
                  onClick={() => setRunCat(c.id)}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br ${p.grad} px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-[1.02]`}>
                  {t("start_quiz")} <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {categories.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-400">{t("empty_qset")}</p>
      )}
    </div>
  );
}
