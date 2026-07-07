"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { loc } from "@/lib/i18n";
import CoverArt from "./CoverArt";

function SearchIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
    </svg>
  );
}

// Shared results-fetching hook.
function useSearch(q) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) { setResults([]); return; }
    let cancel = false;
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { cache: "no-store" });
        const d = await r.json();
        if (!cancel) setResults(d.results || []);
      } catch { if (!cancel) setResults([]); }
      finally { if (!cancel) setLoading(false); }
    }, 220);
    return () => { cancel = true; clearTimeout(id); };
  }, [q]);
  return { results, loading };
}

function ResultRow({ r, lang, onPick }) {
  const router = useRouter();
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onPick(); router.push(`/documents/article/${r.id}`); }}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-slate-50"
    >
      <div className="h-9 w-9 shrink-0">
        <CoverArt seed={r.id} title={loc(r.title, lang)} glyph={r.cover || "📄"} rounded="rounded-lg" ratio="1/1" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="line-clamp-1 text-sm font-bold text-slate-800">{loc(r.title, lang)}</div>
        {r.category && <div className="line-clamp-1 text-[11px] font-semibold text-brand-600">{loc(r.category.title, lang)}</div>}
      </div>
    </button>
  );
}

export default function GlobalSearch() {
  const { lang, t } = useLang();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { results, loading } = useSearch(q);
  const boxRef = useRef(null);

  const L = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);
  const placeholder = L("Tìm bài viết, chủ đề, tag…", "Search articles, topics, tags…", "記事・タグを検索…");

  const submit = () => {
    const query = q.trim();
    if (!query) return;
    setFocused(false);
    setMobileOpen(false);
    router.push(`/documents?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setFocused(false); setMobileOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Dropdown = () => {
    if (q.trim().length < 2) return null;
    return (
      <div className="glass-strong absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl p-1.5 shadow-2xl">
        {loading && <div className="px-3 py-3 text-sm text-slate-400">{L("Đang tìm…", "Searching…", "検索中…")}</div>}
        {!loading && results.length === 0 && (
          <div className="px-3 py-3 text-sm text-slate-400">{L("Không có kết quả.", "No results.", "結果なし")}</div>
        )}
        {results.map((r) => (
          <ResultRow key={r.id} r={r} lang={lang} onPick={() => { setFocused(false); setMobileOpen(false); }} />
        ))}
        {results.length > 0 && (
          <button
            onMouseDown={(e) => { e.preventDefault(); submit(); }}
            className="mt-1 w-full rounded-xl bg-brand-50 px-3 py-2 text-center text-xs font-bold text-brand-700 hover:bg-brand-100"
          >
            {L("Xem tất cả kết quả", "See all results", "すべての結果")} →
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ===== Desktop inline search ===== */}
      <div ref={boxRef} className="relative hidden md:block md:w-44 lg:w-60 xl:w-80">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholder}
          className="glass w-full rounded-full py-2 pl-9 pr-8 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand-300"
        />
        {q && (
          <button onMouseDown={(e) => { e.preventDefault(); setQ(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">✕</button>
        )}
        {focused && <Dropdown />}
      </div>

      {/* ===== Mobile trigger ===== */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label={placeholder}
        className="glass grid h-9 w-9 place-items-center rounded-full text-slate-600 md:hidden"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {/* ===== Mobile overlay ===== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="glass-strong mx-auto max-w-[520px] p-3 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder={placeholder}
                className="glass w-full rounded-full py-2.5 pl-9 pr-10 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-300"
              />
              <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">✕</button>
            </div>
            {q.trim().length >= 2 && (
              <div className="mt-2 max-h-[60vh] overflow-y-auto">
                {loading && <div className="px-3 py-3 text-sm text-slate-400">{L("Đang tìm…", "Searching…", "検索中…")}</div>}
                {!loading && results.length === 0 && <div className="px-3 py-3 text-sm text-slate-400">{L("Không có kết quả.", "No results.", "結果なし")}</div>}
                {results.map((r) => (
                  <ResultRow key={r.id} r={r} lang={lang} onPick={() => setMobileOpen(false)} />
                ))}
                {results.length > 0 && (
                  <button onClick={submit} className="mt-1 w-full rounded-xl bg-brand-50 px-3 py-2.5 text-center text-xs font-bold text-brand-700">
                    {L("Xem tất cả kết quả", "See all results", "すべての結果")} →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
