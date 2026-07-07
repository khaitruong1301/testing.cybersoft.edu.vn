"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { DEFAULT_LANG, LANGS, t as translate } from "./i18n";

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {}, t: (k) => k });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved && LANGS.includes(saved)) setLangState(saved);
  }, []);

  const setLang = useCallback((l) => {
    if (!LANGS.includes(l)) return;
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((k) => translate(k, lang), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
