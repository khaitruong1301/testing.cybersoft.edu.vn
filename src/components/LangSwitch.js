"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { LANGS } from "@/lib/i18n";

const FLAG = { vi: "🇻🇳", en: "🇬🇧", ja: "🇯🇵" };
const NAME = { vi: "Tiếng Việt", en: "English", ja: "日本語" };

export default function LangSwitch() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-expanded={open}
        className="glass glass-hover flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold text-slate-700"
      >
        <span className="text-sm leading-none">{FLAG[lang]}</span>
        <span className="hidden sm:inline">{lang.toUpperCase()}</span>
        <svg viewBox="0 0 24 24" className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                lang === l ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="text-base leading-none">{FLAG[l]}</span>
              <span className="flex-1 text-left">{NAME[l]}</span>
              {lang === l && <span className="text-brand-600">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
