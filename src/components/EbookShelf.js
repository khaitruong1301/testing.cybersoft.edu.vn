"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

// Kệ 8 ebook "Chuẩn bị trước khoá AI Tester". state: guest | pending | granted.
export default function EbookShelf({ books, state, email }) {
  const { lang } = useLang();
  const tt = (vi, en, ja) => (lang === "en" ? en : lang === "ja" ? ja : vi);
  const docs = (s) => `/ebook-ai-tester/${s}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
        {tt("Khoá AI Agent Testing · Tài liệu học viên", "AI Agent Testing course · Student materials", "AIエージェントテスト講座 · 受講生資料")}
      </p>
      <h1 className="mt-1 text-2xl font-extrabold text-slate-800 md:text-3xl">
        {tt("Chuẩn bị trước khoá AI Tester", "Before the AI Tester course", "AIテスター講座の事前準備")}
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
        {tt(
          "8 ebook trực quan dành cho bạn có nền manual testing: cài đặt máy, terminal, Git, web và API, đọc hiểu code test, kiểm thử tự động, AI agent và CI. Đọc trước khi vào lớp để theo kịp ngay từ buổi đầu. AI viết, bạn kiểm chứng.",
          "8 visual ebooks for testers with a manual testing background: setup, terminal, Git, web and API, reading test code, test automation, AI agents and CI. Read them before class. AI writes, you verify.",
          "手動テスト経験者向けの図解電子書籍8冊：環境構築、ターミナル、Git、Web と API、テストコードの読み方、自動テスト、AIエージェント、CI。受講前にお読みください。"
        )}
      </p>

      {state !== "granted" && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {state === "guest" ? (
            <>
              <b>{tt("Cần đăng nhập để đọc.", "Please log in to read.", "閲覧にはログインが必要です。")}</b>{" "}
              {tt(
                "Tài liệu dành cho học viên khoá AI Tester. Đăng nhập bằng email bạn dùng khi đăng ký học.",
                "These materials are for AI Tester students. Log in with the email you registered with.",
                "AIテスター講座の受講生向けです。登録したメールでログインしてください。"
              )}{" "}
              <Link href="/login?next=/tai-lieu-ai-tester" className="font-bold text-brand-700 underline">
                {tt("Đăng nhập", "Log in", "ログイン")}
              </Link>
            </>
          ) : (
            <>
              <b>{tt("Tài khoản chưa được kích hoạt tài liệu này.", "Your account is not activated for these materials yet.", "この資料はまだ有効化されていません。")}</b>{" "}
              {tt(
                `Sau khi bạn đóng học phí khoá AI Tester, CyberSoft sẽ kích hoạt cho email ${email}. Đã đóng học phí mà chưa xem được, nhắn Fanpage hoặc Zalo kèm email này.`,
                `After you pay the AI Tester tuition, CyberSoft activates access for ${email}. Already paid? Message our Fanpage or Zalo with this email.`,
                `受講料のお支払い後、${email} 宛てに有効化します。お支払い済みの場合はFanpageまたはZaloにこのメールを添えてご連絡ください。`
              )}{" "}
              <a href="https://facebook.com/lophocviet" target="_blank" rel="noopener" className="font-bold text-brand-700 underline">Fanpage</a>{" · "}
              <a href="https://zalo.me/0961051014" target="_blank" rel="noopener" className="font-bold text-brand-700 underline">Zalo 0961 051 014</a>
            </>
          )}
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((b) => {
          const card = (
            <>
              <div className="relative aspect-[1/1.414] overflow-hidden rounded-xl bg-slate-100 shadow-md ring-1 ring-slate-200 transition group-hover:-translate-y-1 group-hover:shadow-xl">
                <img src={`/ebook-ai-tester-bia/${b.slug}.webp`} alt={b.tieu_de} loading="lazy" className="h-full w-full object-cover" />
                {state !== "granted" && (
                  <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-bold text-white">
                    {tt("Khoá", "Locked", "ロック")}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-brand-600">
                {tt("Cuốn", "Book", "第")} {String(b.so).padStart(2, "0")} · {b.so_trang} {tt("trang", "pages", "ページ")}
              </p>
              <h2 className="text-sm font-bold leading-snug text-slate-800">{b.tieu_de}</h2>
            </>
          );
          return state === "granted" ? (
            <a key={b.slug} href={docs(b.slug)} className="group block">{card}</a>
          ) : (
            <div key={b.slug} className="group block opacity-90">{card}</div>
          );
        })}
      </div>
    </div>
  );
}
