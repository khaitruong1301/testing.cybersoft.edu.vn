"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { loc } from "@/lib/i18n";
import CoverArt from "./CoverArt";

export default function NotificationBell() {
  const { lang } = useLang();
  const { student } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [seenKey, setSeenKey] = useState("");
  const ref = useRef(null);
  const L = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);

  useEffect(() => {
    if (!student) { setItems([]); return; }
    fetch("/api/me/recommendations", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {});
  }, [student]);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    try { setSeenKey(localStorage.getItem("rec_seen") || ""); } catch {}
  }, []);

  if (!student) return null;

  const sig = items.map((i) => i.id).join(",");
  const unseen = sig && sig !== seenKey ? items.length : 0;

  const openPanel = () => {
    setOpen((v) => !v);
    if (!open) { try { localStorage.setItem("rec_seen", sig); } catch {} setSeenKey(sig); }
  };

  const go = (id) => { setOpen(false); router.push(`/documents/article/${id}`); };

  return (
    <div ref={ref} className="relative">
      <button onClick={openPanel} aria-label="Notifications" className="glass glass-hover relative grid h-9 w-9 place-items-center rounded-full text-slate-700">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {unseen > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-extrabold text-white">
            {unseen > 9 ? "9+" : unseen}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[340px] max-w-[86vw] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <span className="text-sm font-extrabold text-slate-900">🔔 {L("Gợi ý cho bạn", "Recommended for you", "あなたへのおすすめ")}</span>
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-1.5">
            {items.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-slate-500">
                {L("Lưu vài bài để nhận gợi ý liên quan nhé.", "Bookmark a few articles to get related picks.", "記事を保存するとおすすめが届きます。")}
              </p>
            ) : (
              items.map((it) => (
                <button key={it.id} onClick={() => go(it.id)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-slate-50">
                  <div className="h-11 w-11 shrink-0">
                    <CoverArt seed={it.id} title={loc(it.title, lang)} glyph={it.cover || "📄"} rounded="rounded-lg" ratio="1/1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-[13px] font-bold text-slate-900">{loc(it.title, lang)}</div>
                    <div className="mt-0.5 line-clamp-1 text-[11px] font-semibold text-brand-600">
                      {it.reasonTag
                        ? "#" + (loc(it.reasonTag, lang) || "").toLowerCase().replace(/\s+/g, "")
                        : it.reasonCat
                        ? loc(it.reasonCat, lang)
                        : L("Phổ biến", "Popular", "人気")}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
