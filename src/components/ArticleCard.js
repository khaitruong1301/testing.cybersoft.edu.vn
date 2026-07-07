"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { loc } from "@/lib/i18n";
import { useProgress } from "@/lib/ProgressContext";
import { useAuth } from "@/lib/AuthContext";
import { timeAgo, readTimeLabel, readMinutesFromPages } from "@/lib/format";
import CoverArt from "./CoverArt";

export function parseTags(raw) {
  if (!raw) return [];
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(arr) ? arr.filter((x) => x && x.k) : [];
  } catch {
    return [];
  }
}

const TAG_STYLE = {
  kind: "bg-slate-900 text-white ring-slate-900",
  type: "bg-brand-50 text-brand-700 ring-brand-200",
  domain: "bg-violet-50 text-violet-700 ring-violet-200",
  tech: "bg-slate-100 text-slate-600 ring-slate-200",
};
export function tagClass(g, active) {
  if (active) return "bg-brand-600 text-white ring-brand-600";
  return TAG_STYLE[g] || TAG_STYLE.tech;
}
export const tagLabel = (tag, lang) => tag[lang] || tag.en || tag.vi || tag.k;
const hashify = (s) => "#" + String(s || "").toLowerCase().replace(/[^a-z0-9à-ỹ]+/gi, "");

export default function ArticleCard({ article, href, locked, onTagClick, activeTag, compact }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const { isRead, isBookmarked, toggleBookmark } = useProgress();
  const { student } = useAuth();
  const read = isRead(article.id);
  const saved = isBookmarked(article.id);
  const title = loc(article.title, lang);
  const tags = parseTags(article.tags);
  const hashTags = tags.filter((tg) => tg.g !== "kind").slice(0, 2);
  const minutes = readMinutesFromPages(article.pageCount || 0);

  const [up, setUp] = useState(article.upvotes || 0);
  const [voted, setVoted] = useState(false);
  const [shared, setShared] = useState(false);

  const stop = (e) => { e.preventDefault(); e.stopPropagation(); };
  const doVote = async (e) => {
    stop(e);
    if (!student) { router.push(href); return; }
    const next = !voted;
    setVoted(next); setUp((n) => n + (next ? 1 : -1));
    try {
      const r = await fetch(`/api/articles/${article.id}/vote`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ value: 1 }),
      });
      const d = await r.json();
      if (d.ok) { setUp(d.up); setVoted(d.myVote === 1); }
    } catch {}
  };
  const doShare = async (e) => {
    stop(e);
    const url = typeof window !== "undefined" ? new URL(href, window.location.origin).href : href;
    try {
      if (navigator.share) await navigator.share({ url, title });
      else { await navigator.clipboard.writeText(url); setShared(true); setTimeout(() => setShared(false), 1400); }
    } catch {}
  };
  const doBookmark = (e) => { stop(e); toggleBookmark(article.id); };
  const goComments = (e) => { stop(e); router.push(href + "#comments"); };

  // ---- Compact (featured grid) ----
  if (compact) {
    return (
      <Link href={href} className="glass glass-hover fade-up group relative flex flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1 active:scale-[0.99]">
        <div className="relative">
          <CoverArt seed={article.id} title={title} glyph={article.cover || "📄"} rounded="rounded-t-2xl" ratio="16/9" />
          {read && <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">✓</span>}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-slate-900">{title}</h3>
          <div className="mt-auto flex items-center gap-2 pt-2 text-[10px] font-semibold text-slate-500">
            <span>⏱ {minutes}′</span>
            <span>👁 {article.viewCount.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    );
  }

  // ---- Full daily.dev-style card ----
  return (
    <Link href={href} className="glass glass-hover fade-up group relative flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1 active:scale-[0.99]">
      {/* header: source + date • read time */}
      <div className="px-3.5 pb-2 pt-3">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-600 text-[9px] font-extrabold text-white">CS</span>
          <span className="text-[11px] font-semibold text-slate-500">
            {article.createdAt ? timeAgo(article.createdAt, lang) + " · " : ""}{readTimeLabel(minutes, lang)} · 👁 {Number(article.viewCount || 0).toLocaleString()}
          </span>
          {read ? (
            <span className="ml-auto rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">✓ {t("read_done")}</span>
          ) : locked ? (
            <span className="ml-auto text-xs">🔒</span>
          ) : null}
        </div>
        <h3 className="line-clamp-3 text-[15px] font-extrabold leading-snug text-slate-900">{title}</h3>
        {hashTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {hashTags.map((tg) => (
              <button
                key={tg.k}
                type="button"
                onClick={(e) => { if (!onTagClick) return; stop(e); onTagClick(activeTag === tg.k ? null : tg.k); }}
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 transition ${tagClass(tg.g, activeTag === tg.k)} ${onTagClick ? "hover:opacity-80" : "cursor-default"}`}
              >
                {hashify(tagLabel(tg, lang))}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* cover */}
      <div className="px-3.5">
        <CoverArt seed={article.id} title={title} glyph={article.cover || "📄"} rounded="rounded-xl" ratio="16/9" />
      </div>

      {/* footer action bar */}
      <div className="mt-auto flex items-center gap-0.5 px-2 py-2">
        <button onClick={doVote} title={t("bookmark")} className={`flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-bold transition hover:bg-slate-100 ${voted ? "text-emerald-600" : "text-slate-500"}`}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l7 8h-4v6H9v-6H5z" /></svg>
          {up}
        </button>
        <button onClick={goComments} className="flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z" /></svg>
          {article.commentCount || 0}
        </button>
        <span className="ml-auto flex items-center">
          {!locked && (
            <button onClick={doBookmark} aria-label={t("bookmark")} className={`grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-100 ${saved ? "text-amber-500" : "text-slate-400"}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>
            </button>
          )}
          <button onClick={doShare} aria-label="share" className={`grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-100 ${shared ? "text-brand-600" : "text-slate-400"}`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8h16v-8" /><path d="M12 3v13" /><path d="M8 7l4-4 4 4" /></svg>
          </button>
        </span>
      </div>
    </Link>
  );
}
