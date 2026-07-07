"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { loc } from "@/lib/i18n";
import { useProgress } from "@/lib/ProgressContext";
import CoverArt from "./CoverArt";

export default function ProfileView({ student, stats, bookmarks, reading }) {
  const { lang, t } = useLang();
  const initial = (student.name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="px-4 pb-10 pt-4 md:px-0">
      {/* Header card */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-card md:p-8">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/20 text-2xl font-extrabold backdrop-blur">{initial}</div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold md:text-2xl">{student.name}</h1>
            <p className="truncate text-sm text-brand-100">{student.email}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur">
            <div className="text-2xl font-extrabold">{stats.read}</div>
            <div className="text-[11px] font-semibold text-brand-100">{t("completed_count")}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur">
            <div className="text-2xl font-extrabold">{stats.saved}</div>
            <div className="text-[11px] font-semibold text-brand-100">{t("saved_count")}</div>
          </div>
        </div>
      </section>

      {/* Bookmarks with notes */}
      <section className="mt-7">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-slate-900">⭐ {t("my_bookmarks")}</h2>
        {bookmarks.length === 0 ? (
          <p className="glass-tint rounded-2xl p-6 text-center text-sm text-slate-600">{t("no_bookmarks")}</p>
        ) : (
          <div className="grid gap-3.5 sm:grid-cols-2">
            {bookmarks.map((b) => (
              <BookmarkCard key={b.id} b={b} lang={lang} t={t} />
            ))}
          </div>
        )}
      </section>

      {/* Reading history */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-slate-900">🕘 {t("my_reading")}</h2>
        {reading.length === 0 ? (
          <p className="glass-tint rounded-2xl p-6 text-center text-sm text-slate-600">{t("no_reading")}</p>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {reading.map((r) => (
              <Link key={r.id} href={`/documents/article/${r.id}`} className="glass glass-hover flex items-center gap-3 rounded-2xl p-2.5 transition">
                <div className="h-14 w-14 shrink-0">
                  <CoverArt seed={r.id} title={loc(r.title, lang)} glyph={r.cover || "📄"} rounded="rounded-xl" ratio="1/1" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 text-sm font-bold text-slate-900">{loc(r.title, lang)}</div>
                  {r.category && <div className="mt-0.5 text-[11px] font-semibold text-brand-600">{loc(r.category, lang)}</div>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function BookmarkCard({ b, lang, t }) {
  const { saveNote, removeBookmark } = useProgress();
  const [note, setNote] = useState(b.note || "");
  const [editing, setEditing] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [flash, setFlash] = useState(false);
  if (removed) return null;

  return (
    <div className="glass flex flex-col overflow-hidden rounded-2xl">
      <div className="flex gap-3 p-3">
        <div className="h-16 w-16 shrink-0">
          <CoverArt seed={b.id} title={loc(b.title, lang)} glyph={b.cover || "📄"} rounded="rounded-xl" ratio="1/1" />
        </div>
        <div className="min-w-0 flex-1">
          {b.category && <div className="text-[11px] font-bold text-brand-600">{loc(b.category, lang)}</div>}
          <Link href={`/documents/article/${b.id}`} className="line-clamp-2 text-sm font-extrabold text-slate-900 hover:text-brand-700">
            {loc(b.title, lang)}
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-amber-50/50 px-3 py-2.5">
        {editing ? (
          <div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder={t("note_placeholder")}
              className="w-full resize-y rounded-lg border border-amber-200 bg-white p-2 text-[13px] text-slate-800 outline-none focus:border-amber-400"
            />
            <div className="mt-1.5 flex items-center gap-2">
              <button
                onClick={async () => { await saveNote(b.id, note); setEditing(false); setFlash(true); setTimeout(() => setFlash(false), 1500); }}
                className="rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-white hover:bg-amber-600"
              >{t("save_note")}</button>
              <button onClick={() => { setNote(b.note || ""); setEditing(false); }} className="text-xs font-semibold text-slate-500">✕</button>
            </div>
          </div>
        ) : (
          <div>
            {note ? (
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">📝 {note}</p>
            ) : (
              <p className="text-[13px] italic text-slate-400">— {t("add_note")} —</p>
            )}
            <div className="mt-1.5 flex items-center gap-3">
              <button onClick={() => setEditing(true)} className="text-xs font-bold text-amber-700 hover:underline">{t("edit_note")}</button>
              <button onClick={() => { setRemoved(true); removeBookmark(b.id); }} className="text-xs font-semibold text-slate-400 hover:text-red-500">{t("remove")}</button>
              {flash && <span className="text-xs font-semibold text-emerald-600">✓</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
