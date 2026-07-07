"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

export default function LockedPrompt() {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-50 text-4xl">🔒</div>
      <h2 className="mt-4 text-lg font-extrabold text-slate-800">{t("need_login")}</h2>
      <Link href="/login" className="mt-4 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white">
        {t("nav_login")}
      </Link>
    </div>
  );
}
