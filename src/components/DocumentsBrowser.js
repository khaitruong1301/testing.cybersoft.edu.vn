"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { loc } from "@/lib/i18n";
import ArticleCard, { parseTags, tagClass, tagLabel } from "./ArticleCard";
import { useAuth } from "@/lib/AuthContext";
import { useProgress } from "@/lib/ProgressContext";

// Accent-insensitive normalize (so "kiem thu" matches "kiểm thử").
function norm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d");
}

export default function DocumentsBrowser({ categories, heading = "📚" }) {
  const { lang, t } = useLang();
  const { student } = useAuth();
  const { isRead, isBookmarked } = useProgress();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const qParam = searchParams.get("q") || "";

  const initialId = (catParam && categories.some((c) => c.id === catParam)) ? catParam : categories[0]?.id;
  const [active, setActive] = useState(initialId);
  const [activeTag, setActiveTag] = useState(null);
  const [query, setQuery] = useState(qParam);
  const [advOpen, setAdvOpen] = useState(false);
  const [status, setStatus] = useState("all"); // all | unread | read | saved
  const [sort, setSort] = useState("default"); // default(hot) | newest | views | readers
  const [level, setLevel] = useState("beginner"); // beginner | advanced (2 tabs) — mặc định: Dành cho người mới
  const [page, setPage] = useState(1);

  // Đổi danh mục/cấp/lọc/tìm/sort -> về trang 1.
  useEffect(() => { setPage(1); }, [active, level, activeTag, query, status, sort]);

  const selectCategory = (id) => { setActive(id); setActiveTag(null); };

  useEffect(() => {
    if (catParam && categories.some((c) => c.id === catParam)) { setActive(catParam); setActiveTag(null); }
  }, [catParam, categories]);
  useEffect(() => { if (qParam) setQuery(qParam); }, [qParam]);

  const current = categories.find((c) => c.id === active) || categories[0];
  const searchMode = query.trim() !== "" || status !== "all";

  // Build a searchable haystack once per article.
  const allArticles = useMemo(
    () => categories.flatMap((c) =>
      (c.articles || []).map((a) => {
        const tags = parseTags(a.tags);
        const hay = norm(
          [loc(a.title, "vi"), loc(a.title, "en"), loc(a.summary, "vi"), loc(a.summary, "en"),
           loc(c.title, "vi"), loc(c.title, "en"),
           ...tags.flatMap((tg) => [tg.vi, tg.en, tg.k])].filter(Boolean).join(" ")
        );
        return { ...a, _cat: c, _hay: hay, _tags: tags };
      })
    ),
    [categories]
  );

  // ---- Tag chips (from current category in browse mode) ----
  const tagOrder = { type: 0, domain: 1, tech: 2 };
  const catTags = useMemo(() => {
    const m = new Map();
    (current?.articles || []).forEach((a) => parseTags(a.tags).forEach((tg) => { if (!m.has(tg.k)) m.set(tg.k, tg); }));
    return [...m.values()].sort((x, y) => (tagOrder[x.g] ?? 9) - (tagOrder[y.g] ?? 9));
  }, [current]);

  // ---- Compute the list to render ----
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  const statusOk = (a) =>
    status === "all" ? true :
    status === "read" ? isRead(a.id) :
    status === "unread" ? !isRead(a.id) :
    status === "saved" ? isBookmarked(a.id) : true;

  let base;
  if (searchMode) {
    base = allArticles.filter((a) =>
      tokens.every((tk) => a._hay.includes(tk)) &&
      (!activeTag || a._tags.some((tg) => tg.k === activeTag)) &&
      statusOk(a)
    );
  } else {
    base = (current?.articles || [])
      .map((a) => ({ ...a, _cat: current, _tags: parseTags(a.tags) }))
      .filter((a) => !activeTag || a._tags.some((tg) => tg.k === activeTag));
  }
  // ---- Two tabs: Beginner vs Advanced (by article.level) ----
  const lvlOf = (a) => (a.level === "beginner" ? "beginner" : "advanced");
  const begCount = base.filter((a) => lvlOf(a) === "beginner").length;
  const advCount = base.length - begCount;
  let list = base.filter((a) => lvlOf(a) === level);
  // "Độ hấp dẫn" = ưu tiên bài được vote/đọc/xem nhiều (kéo bài hay lên đầu).
  const hot = (a) => (a.upvotes || 0) * 8 - (a.downvotes || 0) * 4 + (a.viewCount || 0) + (a.readCount || 0) * 3;
  if (sort === "views") list = [...list].sort((a, b) => b.viewCount - a.viewCount);
  else if (sort === "readers") list = [...list].sort((a, b) => b.readCount - a.readCount);
  else if (sort === "newest") list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else list = [...list].sort((a, b) => hot(b) - hot(a)); // mặc định: hấp dẫn nhất lên đầu

  // ---- Phân trang khi > 50 bài ----
  const PAGE_SIZE = 50;
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedList = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const readCount = (c) => (c?.articles || []).filter((a) => isRead(a.id)).length;
  const curRead = readCount(current);
  const curTotal = current?.articles.length || 0;
  const pct = curTotal ? Math.round((curRead / curTotal) * 100) : 0;

  const clearSearch = () => { setQuery(""); setStatus("all"); setSort("default"); setActiveTag(null); };
  const L = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);

  return (
    <div className="pb-6 md:flex md:gap-6">
      {/* Desktop sidebar — stable header (does not mirror the selection) */}
      <aside className="hidden w-72 shrink-0 md:block">
        <div className="mb-3 flex items-center gap-2.5 px-1">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-lg text-white shadow-sm">📚</span>
          <div>
            <div className="text-[15px] font-extrabold leading-tight text-slate-900">{L("Danh mục tài liệu", "Categories", "カテゴリ")}</div>
            <div className="text-[11px] font-semibold text-slate-500">{categories.length} {L("chủ đề", "topics", "トピック")}</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {categories.map((c) => {
            const rc = readCount(c);
            const tot = c.articles.length;
            const on = active === c.id && !searchMode;
            return (
              <button key={c.id} onClick={() => selectCategory(c.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${
                  on ? "bg-brand-600 text-white shadow-md" : "glass glass-hover text-slate-700"}`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-lg" style={{ background: on ? "rgba(255,255,255,.18)" : "#eef7ff" }}>{c.icon}</span>
                <span className="line-clamp-2 flex-1">{loc(c.title, lang)}</span>
                <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${on ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{rc}/{tot}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Selected-category header lives in the content column (where you're looking) */}
        {!searchMode && (
          <div className="px-4 pt-1 pb-3 md:px-0 md:pt-0">
            <h1 className="flex items-center gap-2.5 text-xl font-extrabold text-slate-900 md:text-2xl">
              <span className="text-2xl">{current?.icon}</span>
              {loc(current?.title, lang)}
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{loc(current?.description, lang)}</p>
          </div>
        )}

        {/* ===== Level tabs: choose content level ===== */}
        <div className="px-4 pb-4 pt-2 md:px-0 md:pb-5">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            <span className="h-1 w-4 rounded-full bg-brand-400" />
            {L("Chọn cấp độ nội dung", "Choose your level", "レベルを選択")}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { k: "beginner", icon: "🌱", label: L("Dành cho người mới", "For beginners", "初心者向け"), n: begCount, grad: "from-emerald-500 to-teal-600", chip: "bg-emerald-100", ring: "hover:border-emerald-300" },
              { k: "advanced", icon: "🔥", label: L("Thực chiến nâng cao", "Advanced", "実戦・上級"), n: advCount, grad: "from-brand-500 to-brand-700", chip: "bg-amber-100", ring: "hover:border-brand-300" },
            ].map((tab) => {
              const on = level === tab.k;
              return (
                <button
                  key={tab.k}
                  onClick={() => setLevel(tab.k)}
                  aria-pressed={on}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border-2 px-4 py-3.5 text-left transition ${
                    on
                      ? `-translate-y-0.5 border-transparent bg-gradient-to-br ${tab.grad} text-white shadow-xl`
                      : `border-slate-200 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 ${tab.ring} hover:shadow-md`
                  }`}
                >
                  {on && <span className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-white/15 blur-md" />}
                  <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl text-2xl transition group-hover:scale-105 ${on ? "bg-white/25" : tab.chip}`}>{tab.icon}</span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold leading-tight">{tab.label}</span>
                    <span className={`block text-[11px] font-semibold ${on ? "text-white/85" : "text-slate-400"}`}>
                      {tab.n} {L("bài viết", "articles", "記事")}
                    </span>
                  </span>
                  {on ? (
                    <span className="relative shrink-0 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-extrabold">✓ {L("Đang xem", "Viewing", "表示中")}</span>
                  ) : (
                    <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400 transition group-hover:bg-brand-50 group-hover:text-brand-500">→</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== Search bar ===== */}
        <div className="sticky top-[57px] z-10 bg-white/30 px-4 pb-2 pt-3 backdrop-blur-md md:static md:bg-transparent md:px-0 md:pt-0 md:backdrop-blur-none">
          {/* Mobile category chips */}
          <div className="mb-2 flex gap-2 overflow-x-auto pb-1 hide-scrollbar md:hidden">
            {categories.map((c) => (
              <button key={c.id} onClick={() => selectCategory(c.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  active === c.id && !searchMode ? "bg-brand-600 text-white shadow-md" : "glass text-slate-700"}`}>
                {c.icon} {loc(c.title, lang)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={L("Tìm bài viết, chủ đề, tag… (vd: test case, api, playwright)", "Search articles, topics, tags…", "記事・トピック・タグを検索…")}
                className="glass-strong w-full rounded-xl py-2.5 pl-9 pr-9 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-300"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="clear">✕</button>
              )}
            </div>
            <button
              onClick={() => setAdvOpen((v) => !v)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                advOpen || status !== "all" || sort !== "default" ? "bg-brand-600 text-white shadow-md" : "glass glass-hover text-slate-600"}`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
              <span className="hidden sm:inline">{L("Nâng cao", "Advanced", "詳細")}</span>
            </button>
          </div>

          {/* Advanced panel */}
          {advOpen && (
            <div className="glass-strong mt-2 rounded-2xl p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">{L("Trạng thái", "Status", "状態")}</span>
                {[["all", L("Tất cả", "All", "全て")], ["unread", t("read_todo")], ["read", t("read_done")], ["saved", t("bookmarked")]].map(([k, lbl]) => (
                  <button key={k} onClick={() => setStatus(k)} disabled={!student && (k === "read" || k === "unread" || k === "saved")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 transition disabled:opacity-40 ${status === k ? "bg-brand-600 text-white ring-brand-600" : "bg-slate-50 text-slate-600 ring-slate-200 hover:bg-slate-100"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">{L("Sắp xếp", "Sort", "並び")}</span>
                {[["default", L("Hấp dẫn", "Trending", "人気")], ["newest", L("Mới nhất", "Newest", "新着")], ["views", L("Xem nhiều", "Most viewed", "閲覧数")], ["readers", L("Người đọc", "Most readers", "読者数")]].map(([k, lbl]) => (
                  <button key={k} onClick={() => setSort(k)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 transition ${sort === k ? "bg-brand-600 text-white ring-brand-600" : "bg-slate-50 text-slate-600 ring-slate-200 hover:bg-slate-100"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== Content ===== */}
        <div className="px-4 md:px-0">
          {searchMode ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-sm font-bold text-slate-700">
                {L("Kết quả", "Results", "結果")}: <span className="text-brand-600">{list.length}</span>
              </span>
              {query && <span className="text-xs text-slate-500">“{query}”</span>}
              <button onClick={clearSearch} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">
                {L("Xoá tìm kiếm", "Clear", "クリア")}
              </button>
            </div>
          ) : (
            <>
              {student && curTotal > 0 && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{curRead}/{curTotal} · {pct}%</span>
                </div>
              )}
              {catTags.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="mr-0.5 text-[11px] font-bold text-slate-400">{L("Lọc", "Filter", "絞込")}:</span>
                  {catTags.map((tg) => {
                    const on = activeTag === tg.k;
                    return (
                      <button key={tg.k} onClick={() => setActiveTag(on ? null : tg.k)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 transition hover:opacity-80 ${tagClass(tg.g, on)}`}>
                        {tagLabel(tg, lang)}
                      </button>
                    );
                  })}
                  {activeTag && (
                    <button onClick={() => setActiveTag(null)} className="rounded-full px-2 py-1 text-[11px] font-bold text-slate-500 underline">
                      {L("Xoá lọc", "Clear", "クリア")} · {list.length}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-4 grid gap-4 px-4 sm:grid-cols-2 md:px-0 xl:grid-cols-3 2xl:grid-cols-4 min-[1900px]:grid-cols-5">
          {pagedList.map((a) => (
            <ArticleCard key={a.id} article={a} href={`/documents/article/${a.id}`} locked={!student}
              activeTag={activeTag} onTagClick={setActiveTag} />
          ))}
        </div>

        {/* ===== Phân trang (khi > 50 bài) ===== */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 px-4 md:px-0">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 disabled:opacity-40 hover:bg-slate-200">←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePage) <= 2)
              .reduce((acc, n) => { if (acc.length && n - acc[acc.length - 1] > 1) acc.push("…"); acc.push(n); return acc; }, [])
              .map((n, i) => n === "…"
                ? <span key={`e${i}`} className="px-1.5 text-slate-400">…</span>
                : <button key={n} onClick={() => setPage(n)}
                    className={`min-w-[36px] rounded-lg px-3 py-1.5 text-sm font-bold transition ${n === safePage ? "bg-brand-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{n}</button>)}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 disabled:opacity-40 hover:bg-slate-200">→</button>
            <span className="ml-2 text-xs font-semibold text-slate-400">{L("Trang", "Page", "ページ")} {safePage}/{totalPages} · {list.length} {L("bài", "articles", "記事")}</span>
          </div>
        )}
        {list.length === 0 && (
          <div className="px-4 py-14 text-center md:px-0">
            {!searchMode && level === "beginner" ? (
              <>
                <div className="text-4xl">🌱</div>
                <p className="mt-3 text-base font-extrabold text-slate-800">
                  {L("Nội dung “Dành cho người mới” đang được biên soạn", "“For beginners” content is coming soon", "初心者向けコンテンツは準備中です")}
                </p>
                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  {L("CyberSoft đang xây dựng lộ trình nền tảng dễ bắt đầu. Trong lúc chờ, khám phá các bài Thực chiến nâng cao nhé!", "We're building an easy fundamentals track. Meanwhile, explore the Advanced articles!", "基礎トラックを準備中です。まずは上級記事をどうぞ！")}
                </p>
                <button onClick={() => setLevel("advanced")} className="mt-4 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-700">
                  🔥 {L("Xem Thực chiến nâng cao", "See Advanced", "上級を見る")}
                </button>
              </>
            ) : (
              <>
                <div className="text-4xl">🔍</div>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {L("Không tìm thấy bài phù hợp.", "No matching articles.", "該当する記事がありません。")}
                </p>
                {searchMode && (
                  <button onClick={clearSearch} className="mt-3 rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white">
                    {L("Xoá tìm kiếm", "Clear search", "クリア")}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
