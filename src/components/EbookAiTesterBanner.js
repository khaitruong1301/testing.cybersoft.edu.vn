"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

// Băng giới thiệu bộ ebook chuẩn bị khoá AI Tester, đặt đầu trang Tài liệu.
export default function EbookAiTesterBanner() {
  const { lang } = useLang();
  const tt = (vi, en, ja) => (lang === "en" ? en : lang === "ja" ? ja : vi);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <Link href="/tai-lieu-ai-tester" className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-4 text-white shadow-md transition hover:shadow-lg">
        <img src="/ebook-ai-tester-bia/may-tinh-cua-tester.webp" alt="" className="hidden h-20 w-14 rounded-md object-cover shadow sm:block" />
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">{tt("Học viên khoá AI Tester", "AI Tester students", "AIテスター受講生")}</p>
          <p className="text-base font-extrabold md:text-lg">{tt("8 ebook chuẩn bị trước khoá: từ manual đến AI Tester", "8 ebooks to prepare: from manual to AI Tester", "事前準備の電子書籍8冊：手動テストからAIテスターへ")}</p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-brand-700">{tt("Xem", "Open", "開く")} →</span>
      </Link>
    </div>
  );
}
