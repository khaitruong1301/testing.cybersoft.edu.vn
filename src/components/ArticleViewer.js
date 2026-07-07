"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { loc } from "@/lib/i18n";
import { useProgress } from "@/lib/ProgressContext";
import { readTimeLabel, readMinutesFromPages, timeAgo } from "@/lib/format";
import ArticleSocial from "./ArticleSocial";
import { parseTags, tagClass, tagLabel } from "./ArticleCard";

const TOC_LABEL = { vi: "Mục lục", en: "Contents", ja: "目次" };

// Biến URL trong văn bản thành link bấm được (mở tab mới). Bắt cả http(s) và
// dạng bare "cybersoft.edu.vn/...".
const URL_RE = /(https?:\/\/[^\s<>()]+|(?:www\.)?cybersoft\.(?:edu\.)?vn\/[^\s<>()]+)/g;
function LinkedText({ text }) {
  if (text == null) return null;
  const s = String(text);
  const parts = s.split(URL_RE);
  if (parts.length === 1) return s;
  return parts.map((p, i) => {
    if (!p) return null;
    if (URL_RE.test(p)) {
      URL_RE.lastIndex = 0;
      const href = /^https?:\/\//.test(p) ? p : `https://${p}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
          className="break-words font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700">
          {p}
        </a>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function Block({ b }) {
  if (!b) return null;
  switch (b.t) {
    case "h":
      return <h3 className="mt-7 mb-2.5 text-lg font-extrabold text-slate-900 md:text-xl">{b.text}</h3>;
    case "p":
      return <p className="mb-3.5 text-[15px] leading-[1.75] text-slate-800 md:text-base"><LinkedText text={b.text} /></p>;
    case "ul":
      return (
        <ul className="mb-4 space-y-2 pl-1">
          {(b.items || []).map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-800">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span><LinkedText text={it} /></span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="mb-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            {b.lang && <span className="ml-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{b.lang}</span>}
          </div>
          <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed text-slate-100">
            <code>{b.text}</code>
          </pre>
        </div>
      );
    case "note":
      return <div className="mb-4 rounded-xl border-l-4 border-brand-500 bg-brand-50 px-4 py-3 text-[14px] leading-relaxed text-brand-900"><LinkedText text={b.text} /></div>;
    case "tip":
      return <div className="mb-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-[14px] leading-relaxed text-emerald-900">💡 <LinkedText text={b.text} /></div>;
    case "warn":
      return <div className="mb-4 rounded-xl border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-[14px] leading-relaxed text-amber-900">⚠️ <LinkedText text={b.text} /></div>;
    case "img":
      return (
        <figure className="my-6">
          <div className="no-select overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm" dangerouslySetInnerHTML={{ __html: b.svg }} />
          {b.cap && <figcaption className="mt-2 text-center text-xs text-slate-500">{b.cap}</figcaption>}
        </figure>
      );
    case "scenario":
      return (
        <div className="my-6 rounded-2xl border border-violet-200 bg-violet-50 p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-violet-700">🎯 {b.title}</div>
          <p className="text-[14px] leading-relaxed text-violet-900"><LinkedText text={b.text} /></p>
        </div>
      );
    case "qa":
      return (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-1.5 font-bold text-slate-900">❓ {b.q}</p>
          <p className="text-[14px] leading-relaxed text-slate-700"><LinkedText text={b.a} /></p>
        </div>
      );
    default:
      return <p className="mb-3.5 text-[15px] leading-relaxed text-slate-800"><LinkedText text={b.text} /></p>;
  }
}

export default function ArticleViewer({ article }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const pages = article.pages;
  const locked = !!article.locked;
  const { isBookmarked, noteOf, toggleBookmark, saveNote, markRead } = useProgress();

  const tags = parseTags(article.tags);
  const kindTag = tags.find((tg) => tg.g === "kind");
  const otherTags = tags.filter((tg) => tg.g !== "kind");
  const toc = pages
    .map((p, i) => ({ i, title: loc(p.caption, lang) }))
    .filter((x) => x.title);
  const scrollToSec = (i) => {
    const el = document.getElementById(`sec-${i}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
  };

  const saved = isBookmarked(article.id);
  const [progress, setProgress] = useState(0);
  const [activeSec, setActiveSec] = useState(0);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const articleRef = useRef(null);
  const related = article.related || [];
  const minutes = readMinutesFromPages(article.pageCount || pages.length);

  useEffect(() => {
    if (locked) return; // signed-out preview: don't count views / mark read
    fetch(`/api/articles/${article.id}/view`, { method: "POST" })
      .then(() => markRead(article.id))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.id]);

  useEffect(() => {
    setNoteText(noteOf(article.id));
  }, [article.id, noteOf]);

  useEffect(() => {
    let ticking = false;
    let last = -1;
    let lastSec = -1;
    const compute = () => {
      ticking = false;
      const el = articleRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - top;
      const p = Math.max(0, Math.min(100, (scrolled / Math.max(h, 1)) * 100));
      if (Math.abs(p - last) >= 1) { last = p; setProgress(p); }
      // active section for TOC highlight
      const secs = el.querySelectorAll("section[id^='sec-']");
      let ai = 0;
      secs.forEach((s) => { if (s.getBoundingClientRect().top <= 130) ai = Number(s.id.replace("sec-", "")); });
      if (ai !== lastSec) { lastSec = ai; setActiveSec(ai); }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const catTitle = article.category ? loc(article.category.title, lang) : "";

  const onSaveNote = async () => {
    await saveNote(article.id, noteText);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1600);
  };

  const onToggleBookmark = () => {
    toggleBookmark(article.id);
    if (!saved) setNoteOpen(true);
  };

  const L = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);
  const catHref = article.category?.id ? `/documents?cat=${article.category.id}` : "/documents";

  const renderToc = (cls) =>
    !locked && toc.length > 1 ? (
      <nav className={cls}>
        <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-50 text-brand-600">☰</span>
          {TOC_LABEL[lang] || TOC_LABEL.en}
          <span className="text-xs font-semibold text-slate-400">· {toc.length}</span>
        </div>
        <ol className="space-y-0.5">
          {toc.map((x, n) => {
            const on = activeSec === x.i;
            return (
              <li key={x.i}>
                <button
                  onClick={() => scrollToSec(x.i)}
                  className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] leading-snug transition ${on ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-brand-700"}`}
                >
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[11px] font-bold ${on ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"}`}>{n + 1}</span>
                  <span className={on ? "font-bold" : "font-semibold"}>{x.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    ) : null;

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div className="fixed left-0 top-0 z-40 h-1 bg-brand-600 transition-all md:h-1.5" style={{ width: `${progress}%` }} />

      <div className="mx-auto max-w-[1320px] px-4 md:px-6 xl:px-8">
        <div className="gap-8 xl:grid xl:grid-cols-[240px_minmax(0,760px)_300px] xl:justify-center">

          {/* ===== LEFT rail: back + progress + TOC (sticky, xl only) ===== */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4 py-6">
              <button
                onClick={() => router.push(catHref)}
                className="glass glass-hover flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700"
              >
                <span className="text-brand-500">←</span>
                <span className="line-clamp-1">{catTitle || t("nav_docs")}</span>
              </button>
              {!locked && (
                <div className="glass flex items-center gap-3 rounded-2xl p-4">
                  <ProgressRing pct={progress} />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{L("Tiến độ đọc", "Reading", "進捗")}</div>
                    <div className="text-lg font-extrabold text-slate-900">{Math.round(progress)}%</div>
                  </div>
                </div>
              )}
              {renderToc("glass max-h-[60vh] overflow-y-auto rounded-2xl p-4 hide-scrollbar")}
            </div>
          </aside>

          {/* ===== CENTER: the article, constrained for comfortable reading ===== */}
          <main className="min-w-0">
      <div className="glass mx-auto mb-16 w-full max-w-[760px] rounded-3xl bg-white/90 px-5 py-6 md:my-6 md:px-9 md:py-9">
        {/* Breadcrumb — shows parent category */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href="/documents" className="hover:text-brand-600">{t("nav_docs")}</Link>
          {catTitle && (
            <>
              <span className="text-slate-300">/</span>
              <Link
                href={article.category?.id ? `/documents?cat=${article.category.id}` : "/documents"}
                className="text-brand-600 hover:underline"
              >
                {catTitle}
              </Link>
            </>
          )}
          {article.position && (
            <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
              {article.position.index}/{article.position.total}
            </span>
          )}
        </nav>

        {/* Title + actions */}
        <div className="mt-3 flex items-start justify-between gap-3">
          <h1 className="text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">{loc(article.title, lang)}</h1>
          {!locked && (
            <button
              onClick={onToggleBookmark}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm font-bold shadow-sm transition ${
                saved ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {saved ? "★ " + t("bookmarked") : "☆ " + t("bookmark")}
            </button>
          )}
        </div>

        {(kindTag || otherTags.length > 0) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {kindTag && (
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                {tagLabel(kindTag, lang)}
              </span>
            )}
            {otherTags.map((tg) => (
              <span key={tg.k} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${tagClass(tg.g, false)}`}>
                {tagLabel(tg, lang)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500">
          {article.createdAt && <span className="font-semibold text-slate-600">🗓 {timeAgo(article.createdAt, lang)}</span>}
          <span className="font-semibold text-slate-600">⏱ {readTimeLabel(readMinutesFromPages(article.pageCount || pages.length), lang)}</span>
          <span className="text-slate-300">·</span>
          <span>👁 {article.viewCount.toLocaleString()} {t("views")}</span>
          <span>👤 {article.readCount.toLocaleString()} {t("readers")}</span>
        </div>

        {article.summary && (
          <p className="mt-3 rounded-xl border-l-4 border-brand-400 bg-brand-50/70 p-3.5 text-sm leading-relaxed text-slate-700">
            {loc(article.summary, lang)}
          </p>
        )}

        {/* Table of contents — inline on smaller screens (left rail on xl). */}
        {renderToc("glass mt-4 rounded-2xl p-4 xl:hidden")}

        {/* Note editor */}
        {saved && (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5">
            <button onClick={() => setNoteOpen((v) => !v)} className="flex w-full items-center justify-between text-sm font-bold text-amber-800">
              <span>📝 {t("add_note")}</span>
              <span className="text-xs">{noteOpen ? "▲" : "▼"}</span>
            </button>
            {noteOpen && (
              <div className="mt-2.5">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder={t("note_placeholder")}
                  rows={3}
                  className="w-full resize-y rounded-xl border border-amber-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-amber-400"
                />
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={onSaveNote} className="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-amber-600">
                    {t("save_note")}
                  </button>
                  {savedFlash && <span className="text-xs font-semibold text-emerald-600">✓ {t("note_saved")}</span>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Article body */}
        <article
          ref={articleRef}
          className="no-save mt-5 select-text"
          onContextMenu={(e) => {
            if (e.target.tagName === "IMG" || e.target.closest("figure")) e.preventDefault();
          }}
        >
          {pages.map((p, i) => {
            const blocks = loc(p.content, lang);
            const heading = loc(p.caption, lang);
            return (
              <section key={i} id={`sec-${i}`} className="mb-2 scroll-mt-28">
                {heading && (
                  <h2 className="mt-9 mb-4 flex items-center gap-2.5 border-b border-slate-200 pb-2.5 text-xl font-extrabold text-slate-900 md:text-2xl">
                    <span className="h-6 w-1.5 rounded-full bg-brand-600" />
                    {heading}
                  </h2>
                )}
                {(Array.isArray(blocks) ? blocks : []).map((b, k) => (
                  <Block key={k} b={b} />
                ))}
              </section>
            );
          })}
        </article>

        {locked ? (
          <>
            {/* fade the last visible lines into the page */}
            <div className="pointer-events-none -mt-28 h-28 bg-gradient-to-b from-transparent to-white/80" />
            <LockGate lang={lang} previewInfo={article.previewInfo} />
          </>
        ) : (
          <>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 p-5 text-center">
              <div className="text-2xl">🎉</div>
              <p className="mt-1 text-sm font-bold text-brand-800">
                {lang === "vi" ? "Bạn đã đọc hết tài liệu này." : lang === "ja" ? "この資料を読み終えました。" : "You've finished this document."}
              </p>
              {!saved && (
                <button onClick={onToggleBookmark} className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-700 shadow-sm hover:bg-brand-50">
                  ☆ {t("bookmark")}
                </button>
              )}
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {article.prev ? (
                <Link href={`/documents/article/${article.prev.id}`} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow">
                  <div className="text-xs font-bold text-slate-400">← {t("prev_article")}</div>
                  <div className="mt-1 line-clamp-2 text-sm font-bold text-slate-800 group-hover:text-brand-700">{loc(article.prev.title, lang)}</div>
                </Link>
              ) : <div />}
              {article.next ? (
                <Link href={`/documents/article/${article.next.id}`} className="group rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:border-brand-300 hover:shadow">
                  <div className="text-xs font-bold text-slate-400">{t("next_article")} →</div>
                  <div className="mt-1 line-clamp-2 text-sm font-bold text-slate-800 group-hover:text-brand-700">{loc(article.next.title, lang)}</div>
                </Link>
              ) : <div />}
            </div>
          </>
        )}

        {/* daily.dev-style: votes + share + comments (comments public even when signed-out) */}
        <ArticleSocial id={article.id} social={article.social || { up: 0, down: 0, myVote: 0 }} />

        <div className="mt-6">
          <button onClick={() => router.push("/documents")} className="text-sm font-semibold text-brand-600 hover:underline">← {t("nav_docs")}</button>
        </div>
      </div>
          </main>

          {/* ===== RIGHT rail: info + related (sticky, xl only) ===== */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4 py-6">
              <div className="glass rounded-2xl p-4">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">{L("Thông tin bài", "About", "情報")}</div>
                <ul className="space-y-2 text-sm">
                  {article.createdAt && <li className="flex items-center gap-2 text-slate-600"><span>🗓</span> {timeAgo(article.createdAt, lang)}</li>}
                  <li className="flex items-center gap-2 text-slate-600"><span>⏱</span> {readTimeLabel(minutes, lang)}</li>
                  <li className="flex items-center gap-2 text-slate-600"><span>👁</span> {article.viewCount.toLocaleString()} {t("views")}</li>
                  <li className="flex items-center gap-2 text-slate-600"><span>👤</span> {article.readCount.toLocaleString()} {t("readers")}</li>
                  {catTitle && (
                    <li className="flex items-center gap-2"><span>📂</span> <Link href={catHref} className="font-semibold text-brand-600 hover:underline">{catTitle}</Link></li>
                  )}
                </ul>
              </div>

              {related.length > 0 && (
                <div className="glass rounded-2xl p-3">
                  <div className="px-1 pb-2 pt-1 text-sm font-extrabold text-slate-900">📚 {L("Cùng danh mục", "In this category", "同カテゴリ")}</div>
                  <div className="space-y-0.5">
                    {related.map((r, i) => (
                      <Link key={r.id} href={`/documents/article/${r.id}`} className="flex items-start gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-50">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-500">{i + 1}</span>
                        <span className="line-clamp-2 text-[13px] font-semibold text-slate-700 hover:text-brand-700">{loc(r.title, lang)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ pct = 0 }) {
  const r = 15, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
      <circle cx="18" cy="18" r={r} fill="none" stroke="#e2e8f0" strokeWidth="3" />
      <circle cx="18" cy="18" r={r} fill="none" stroke="#1a72f5" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, Math.min(100, pct)) / 100)} />
    </svg>
  );
}

function LockGate({ lang, previewInfo }) {
  const pct = previewInfo && previewInfo.total ? Math.round((previewInfo.shown / previewInfo.total) * 100) : 25;
  const S = {
    vi: {
      title: "Nội dung bị khoá",
      desc: "Bạn đang xem bản xem trước. Đăng nhập để mở khoá toàn bộ bài viết và tất cả tài liệu Tester/QA.",
      seen: `Đã xem ${pct}% nội dung`,
      login: "Đăng nhập để đọc tiếp",
      no_code: "Chưa có mã? Lấy mã qua Fanpage / Zalo CyberSoft.",
      perks: ["Đọc trọn vẹn mọi bài viết", "Lưu bài & ghi chú cá nhân", "Theo dõi tiến độ đã đọc", "Luyện phỏng vấn, ISTQB, Mock"],
    },
    en: {
      title: "Content locked",
      desc: "You're viewing a preview. Log in to unlock the full article and all Tester/QA materials.",
      seen: `Viewed ${pct}% of the content`,
      login: "Log in to keep reading",
      no_code: "No code? Get one via CyberSoft Fanpage / Zalo.",
      perks: ["Read every article in full", "Bookmark & take private notes", "Track your reading progress", "Interview, ISTQB & Mock practice"],
    },
    ja: {
      title: "コンテンツはロックされています",
      desc: "プレビューを表示中です。ログインすると全文と全教材が解放されます。",
      seen: `内容の${pct}%を閲覧`,
      login: "ログインして続きを読む",
      no_code: "コードがない場合は CyberSoft の Fanpage / Zalo へ。",
      perks: ["全記事を全文で閲覧", "保存＆メモ", "読書の進捗管理", "面接・ISTQB・模擬練習"],
    },
  };
  const s = S[lang] || S.vi;
  return (
    <div className="glass-strong relative -mt-6 overflow-hidden rounded-3xl p-6 text-center md:p-8">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-3xl text-white shadow-lg">🔒</div>
      <h2 className="mt-4 text-xl font-extrabold text-slate-900 md:text-2xl">{s.title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">{s.desc}</p>

      <div className="mx-auto mt-4 flex max-w-xs items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-bold text-slate-500">{s.seen}</span>
      </div>

      <ul className="mx-auto mt-5 grid max-w-md gap-2 text-left sm:grid-cols-2">
        {s.perks.map((p) => (
          <li key={p} className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-[13px] font-semibold text-slate-700 ring-1 ring-slate-100">
            <span className="text-emerald-500">✓</span> {p}
          </li>
        ))}
      </ul>

      <Link href="/login" className="mt-6 inline-block rounded-xl bg-brand-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.03] hover:bg-brand-700">
        {s.login}
      </Link>
      <p className="mt-3 text-xs text-slate-400">{s.no_code}</p>
    </div>
  );
}
