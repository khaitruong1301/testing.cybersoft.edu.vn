"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { loc } from "@/lib/i18n";
import ArticleCard from "./ArticleCard";

const USP = {
  vi: [
    { icon: "🧪", title: "Học từ ca thực chiến", desc: "Test case, bug report, API, automation… đúng cách doanh nghiệp đang làm." },
    { icon: "🤖", title: "AI-native Testing", desc: "Kết hợp Claude/AI vào quy trình test: sinh case, review, tăng độ phủ." },
    { icon: "🎤", title: "Luyện phỏng vấn & Mock", desc: "Ngân hàng câu hỏi tự chấm, mô phỏng phỏng vấn QA thật." },
    { icon: "📄", title: "CV vượt ATS", desc: "Mẫu CV Tester + tip qua bộ lọc ATS, gây ấn tượng nhà tuyển dụng." },
  ],
  en: [
    { icon: "🧪", title: "Real-world practice", desc: "Test cases, bug reports, API & automation the way companies actually work." },
    { icon: "🤖", title: "AI-native testing", desc: "Bring Claude/AI into your workflow: generate cases, review, boost coverage." },
    { icon: "🎤", title: "Interview & mock drills", desc: "Auto-graded question bank and realistic QA mock interviews." },
    { icon: "📄", title: "ATS-beating CV", desc: "Tester CV templates + tips to pass ATS filters and impress recruiters." },
  ],
  ja: [
    { icon: "🧪", title: "実務ベースの学習", desc: "テストケース・バグ報告・API・自動化を実務の流れで。" },
    { icon: "🤖", title: "AIネイティブテスト", desc: "Claude/AIをワークフローに。ケース生成・レビュー・網羅性向上。" },
    { icon: "🎤", title: "面接・模擬練習", desc: "自動採点の問題集とリアルなQA模擬面接。" },
    { icon: "📄", title: "ATS突破の履歴書", desc: "テスター向け履歴書テンプレとATS突破のコツ。" },
  ],
};

const USP_GRADS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-fuchsia-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
];

export default function Landing({ featured, categories, stats }) {
  const { lang, t } = useLang();
  const { student } = useAuth();
  const usp = USP[lang] || USP.vi;

  return (
    <div className="pb-8">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-5 pb-12 pt-9 text-white md:rounded-3xl md:px-12 md:py-16">
        {/* decorative art */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="absolute right-10 top-24 h-24 w-24 rotate-12 rounded-2xl border-2 border-white/15" />
          <div className="absolute right-40 top-10 h-10 w-10 rounded-full border-2 border-white/20" />
        </div>
        <div className="relative md:flex md:items-center md:gap-10">
          <div className="md:max-w-2xl md:flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
              🚀 CyberSoft • QA / Tester · AI-native
            </span>
            <h1 className="mt-4 text-3xl font-black leading-[1.12] md:text-5xl">
              {student ? (
                <>👋 {student.name}</>
              ) : lang === "vi" ? (
                <>Trở thành <span className="text-cyan-300">Tester</span> đi làm được — nhanh & thực chiến</>
              ) : lang === "ja" ? (
                <>実務で通用する<span className="text-cyan-300">テスター</span>へ</>
              ) : (
                <>Become a job-ready <span className="text-cyan-300">Tester</span> — fast & practical</>
              )}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-brand-50 md:text-lg">{t("tagline")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/documents" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-700 shadow-lg transition hover:scale-[1.04] md:text-base">
                {student ? t("read_now") : t("hero_cta")}
              </Link>
              {!student ? (
                <Link href="/login" className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25 md:text-base">
                  {t("nav_login")}
                </Link>
              ) : (
                <Link href="/profile" className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25 md:text-base">
                  {t("nav_profile")}
                </Link>
              )}
            </div>
            <div className="mt-7 grid max-w-lg grid-cols-3 gap-2.5 text-center">
              <Stat n={stats.articles} label={t("demo_docs")} />
              <Stat n={stats.questions} label={t("questions")} />
              <Stat n={stats.categories} label={t("categories")} />
            </div>
          </div>
          {/* hero visual */}
          <div className="relative mt-8 hidden md:mt-0 md:block md:flex-1">
            <HeroArt />
          </div>
        </div>
      </section>

      {/* ===== USP strip — bold full-color tiles ===== */}
      <section className="px-4 pt-7 md:px-0">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {usp.map((u, i) => {
            const grad = USP_GRADS[i % USP_GRADS.length];
            return (
              <div
                key={i}
                className={`group relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${grad} text-white shadow-lg transition hover:-translate-y-1.5 hover:shadow-2xl`}
              >
                {/* decorative glass orbs */}
                <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/15 blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-black/10 blur-lg" />
                {/* LARGE art illustration */}
                <div className="relative flex flex-1 items-center justify-center px-3 pt-5">
                  <UspArt i={i} />
                </div>
                {/* text with readability scrim */}
                <div className="relative bg-gradient-to-t from-black/25 to-transparent p-4 pt-6">
                  <div className="text-[15px] font-extrabold leading-tight tracking-apple">{u.title}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-white/85">{u.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          {/* Categories — Apple-Store style round bubbles */}
          <section className="px-4 pt-7 md:px-0">
            <h2 className="mb-4 text-lg font-bold tracking-apple text-slate-900 md:text-xl">📚 {t("categories")}</h2>
            <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 md:grid-cols-6">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href="/documents"
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <span className="glass glass-hover grid h-16 w-16 place-items-center rounded-full text-3xl transition group-hover:-translate-y-1 group-hover:scale-105">
                    {c.icon}
                  </span>
                  <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-slate-600 group-hover:text-slate-900">{loc(c.title, lang)}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured docs */}
          <section className="px-4 pt-7 md:px-0">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-apple text-slate-900 md:text-xl">🔥 {t("demo_docs")}</h2>
              <Link href="/documents" className="text-xs font-bold text-brand-600 hover:underline">{t("next")} →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-4">
              {featured.map((a) => (
                <ArticleCard key={a.id} article={a} href={`/documents/article/${a.id}`} locked={!student} compact />
              ))}
            </div>
          </section>
        </div>

        {/* Side promos */}
        <aside className="px-4 pt-7 md:px-0">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            <Promo href="/cv" from="from-sky-500" to="to-sky-600" icon="📄" title={t("nav_cv")} sub={t("view_sample")} />
            <Promo href="/interview" from="from-emerald-500" to="to-emerald-600" icon="🎤" title={t("nav_interview")} sub={t("start_quiz")} />
            <Promo href="/istqb" from="from-amber-500" to="to-amber-600" icon="🏅" title={t("nav_istqb")} sub="Foundation · Advanced" />
            <Promo href="/mock" from="from-violet-500" to="to-violet-600" icon="🎯" title={t("nav_mock")} sub={t("start_mock")} />
          </div>
        </aside>
      </div>
    </div>
  );
}

// Large Apple-style line-art illustrations for the 4 USP tiles.
function UspArt({ i }) {
  const W = "#ffffff";
  const S = "rgba(15,23,42,0.16)";
  const A = "rgba(255,255,255,0.6)";
  const common = { viewBox: "0 0 200 130", className: "h-[118px] w-auto max-w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)]" };
  if (i === 0) {
    // Practice / test case — clipboard checklist + gear
    return (
      <svg {...common}>
        <rect x="52" y="18" width="96" height="104" rx="14" fill={W} />
        <rect x="82" y="10" width="36" height="18" rx="7" fill={A} />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x="66" y={40 + r * 18} width="14" height="14" rx="4" fill={r < 3 ? "#22c55e" : "#e2e8f0"} />
            {r < 3 && <path d={`M69 ${47 + r * 18} l3 3 5-6`} stroke={W} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="88" y={44 + r * 18} width={r % 2 ? 34 : 46} height="6" rx="3" fill={S} />
          </g>
        ))}
        <g transform="translate(140 20)">
          <circle cx="0" cy="0" r="15" fill="none" stroke={W} strokeWidth="6" />
          <circle cx="0" cy="0" r="5" fill={W} />
          {Array.from({ length: 8 }).map((_, k) => (
            <rect key={k} x="-2.5" y="-22" width="5" height="8" rx="2" fill={W} transform={`rotate(${k * 45})`} />
          ))}
        </g>
      </svg>
    );
  }
  if (i === 1) {
    // AI-native — robot head + circuit nodes
    return (
      <svg {...common}>
        <line x1="100" y1="26" x2="100" y2="40" stroke={W} strokeWidth="4" />
        <circle cx="100" cy="22" r="6" fill={W} />
        <rect x="60" y="40" width="80" height="66" rx="18" fill={W} />
        <rect x="46" y="58" width="10" height="26" rx="5" fill={A} />
        <rect x="144" y="58" width="10" height="26" rx="5" fill={A} />
        <circle cx="84" cy="70" r="9" fill="#6366f1" /><circle cx="84" cy="70" r="3.5" fill={W} />
        <circle cx="116" cy="70" r="9" fill="#6366f1" /><circle cx="116" cy="70" r="3.5" fill={W} />
        <rect x="86" y="90" width="28" height="7" rx="3.5" fill={S} />
        {[[30, 34], [170, 40], [26, 96], [176, 92]].map((p, k) => (
          <g key={k}>
            <circle cx={p[0]} cy={p[1]} r="4" fill={A} />
            <line x1={p[0]} y1={p[1]} x2={p[0] < 100 ? 60 : 140} y2={p[1] < 70 ? 52 : 92} stroke={A} strokeWidth="2" strokeDasharray="3 3" />
          </g>
        ))}
      </svg>
    );
  }
  if (i === 2) {
    // Interview / mock — microphone + speech bubbles
    return (
      <svg {...common}>
        <rect x="70" y="70" width="44" height="26" rx="8" fill={A} />
        <path d="M74 60l14 8" stroke={A} strokeWidth="0" />
        <rect x="88" y="34" width="24" height="52" rx="12" fill={W} />
        <path d="M78 74a22 22 0 0 0 44 0" fill="none" stroke={W} strokeWidth="5" />
        <line x1="100" y1="96" x2="100" y2="112" stroke={W} strokeWidth="5" />
        <line x1="86" y1="112" x2="114" y2="112" stroke={W} strokeWidth="5" strokeLinecap="round" />
        <g>
          <rect x="30" y="34" width="42" height="28" rx="9" fill={W} />
          <path d="M42 62l0 9 10-9z" fill={W} />
          <circle cx="42" cy="48" r="2.6" fill={S} /><circle cx="51" cy="48" r="2.6" fill={S} /><circle cx="60" cy="48" r="2.6" fill={S} />
        </g>
      </svg>
    );
  }
  // i === 3 — CV / ATS document + avatar + check seal
  return (
    <svg viewBox="0 0 200 130" className="h-[118px] w-auto max-w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
      <rect x="56" y="16" width="92" height="104" rx="12" fill={W} />
      <circle cx="80" cy="42" r="12" fill="#f97316" />
      <path d="M70 60a10 10 0 0 1 20 0z" fill="#fdba74" />
      <rect x="100" y="34" width="34" height="7" rx="3.5" fill={S} />
      <rect x="100" y="46" width="26" height="6" rx="3" fill="rgba(15,23,42,0.1)" />
      <rect x="68" y="74" width="66" height="6" rx="3" fill="rgba(15,23,42,0.12)" />
      <rect x="68" y="86" width="66" height="6" rx="3" fill="rgba(15,23,42,0.12)" />
      <rect x="68" y="98" width="40" height="6" rx="3" fill="rgba(15,23,42,0.12)" />
      <g transform="translate(140 92)">
        <circle cx="0" cy="0" r="18" fill="#16a34a" />
        <path d="M-8 0l6 6 11-13" stroke={W} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Promo({ href, from, to, icon, title, sub }) {
  return (
    <Link href={href} className={`rounded-2xl bg-gradient-to-br ${from} ${to} p-4 text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg`}>
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 text-sm font-extrabold">{title}</div>
      <div className="text-[11px] text-white/90">{sub}</div>
    </Link>
  );
}

function Stat({ n, label }) {
  return (
    <div className="rounded-2xl bg-white/12 py-2.5 backdrop-blur">
      <div className="text-xl font-black md:text-2xl">{n}+</div>
      <div className="line-clamp-1 text-[10px] font-semibold text-brand-100">{label}</div>
    </div>
  );
}

function HeroArt() {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[11px] font-semibold text-white/70">test-suite.spec.ts</span>
      </div>
      <div className="space-y-2 rounded-xl bg-slate-900/70 p-3 font-mono text-[11px] leading-relaxed">
        <div className="text-emerald-300">✓ login · valid credentials</div>
        <div className="text-emerald-300">✓ login · 5x wrong → locked</div>
        <div className="text-emerald-300">✓ checkout · API + UI</div>
        <div className="text-amber-300">● boundary · qty = 0</div>
        <div className="text-slate-400">— 128 passed, 0 failed —</div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-white/15 px-3 py-2">
        <span className="text-[11px] font-bold text-white">Coverage</span>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-[92%] rounded-full bg-cyan-300" />
        </div>
        <span className="text-[11px] font-bold text-cyan-200">92%</span>
      </div>
    </div>
  );
}
