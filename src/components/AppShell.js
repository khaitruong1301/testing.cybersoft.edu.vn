"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import LangSwitch from "./LangSwitch";
import SiteFooter from "./SiteFooter";
import GlobalSearch from "./GlobalSearch";
import NotificationBell from "./NotificationBell";
import BrandLogo from "./BrandLogo";

const TABS = [
  { href: "/", key: "nav_home", icon: HomeIcon },
  { href: "/documents", key: "nav_docs", icon: DocIcon },
  { href: "/cv", key: "nav_cv", icon: CvIcon },
  { href: "/interview", key: "nav_interview", icon: ChatIcon },
  { href: "/istqb", key: "nav_istqb", icon: BadgeIcon },
  { href: "/mock", key: "nav_mock", icon: TargetIcon },
];

// Thanh tab dưới (mobile): ĐỦ 6 menu chính (Hồ sơ đã có ở avatar góc phải).
// short = nhãn rút gọn để 6 mục vừa khít, không rớt/đè.
const MOBILE_TABS = [
  { href: "/", key: "nav_home", icon: HomeIcon },
  { href: "/documents", key: "nav_docs", icon: DocIcon },
  { href: "/cv", key: "nav_cv", icon: CvIcon },
  { href: "/interview", key: "nav_interview", icon: ChatIcon },
  { href: "/istqb", key: "nav_istqb", icon: BadgeIcon },
  { href: "/mock", key: "nav_mock", icon: TargetIcon, short: "Mock" },
];

export default function AppShell({ children }) {
  const { t } = useLang();
  const { student } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Heartbeat "đang online" — ping cho MỌI người truy cập (khách + học viên).
  // Khách vãng lai gửi kèm visitorId (lưu localStorage) để đếm không trùng.
  useEffect(() => {
    let alive = true;
    let vid = "";
    try {
      vid = localStorage.getItem("cst_vid") || "";
      if (!vid) { vid = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("cst_vid", vid); }
    } catch {}
    const ping = () => {
      if (!alive || (typeof document !== "undefined" && document.hidden)) return;
      fetch("/api/heartbeat", {
        method: "POST", cache: "no-store", keepalive: true,
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vid }),
      }).catch(() => {});
    };
    ping();
    const iv = setInterval(ping, 30000);
    return () => { alive = false; clearInterval(iv); };
  }, [student]);
  useEffect(() => {
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const NAV = TABS; // Hồ sơ đã nằm trong dropdown dưới tên (AuthButton) -> không lặp ở menu chính

  return (
    <div className="app-shell safe-bottom">
      {/* ===== Desktop top nav (md+) — SINGLE compact row, responsive ===== */}
      <header className="glass-nav sticky top-0 z-30 hidden md:block">
        <div className="mx-auto flex max-w-[2200px] items-center gap-3 px-6 py-2 xl:px-12 2xl:px-20">
          <Link href="/" aria-label="CyberSoft — Trang chủ" className="flex shrink-0 items-center">
            <BrandLogo className="h-8 w-auto" />
          </Link>

          {/* Inline nav — only when there's genuinely room (2xl+), tránh đè lên ô tìm kiếm */}
          <nav className="hidden min-w-0 flex-1 items-center gap-1 2xl:flex">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.href);
              return (
                <Link key={tab.href} href={tab.href}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                    active ? "bg-brand-600 text-white shadow-sm" : "text-slate-700 hover:bg-white/60"}`}>
                  <Icon active={active} />
                  {t(tab.key)}
                </Link>
              );
            })}
          </nav>

          {/* Actions (always) + hamburger (below xl) */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5">
            <GlobalSearch />
            <NotificationBell />
            <LangSwitch />
            <AuthButton student={student} t={t} router={router} />

            {/* Hamburger menu — shows when inline nav is hidden (md → xl) */}
            <div ref={menuRef} className="relative 2xl:hidden">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={menuOpen}
                className={`grid h-9 w-9 place-items-center rounded-full transition ${menuOpen ? "bg-brand-600 text-white" : "glass glass-hover text-slate-700"}`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
                  {NAV.map((tab) => {
                    const Icon = tab.icon;
                    const active = isActive(tab.href);
                    return (
                      <Link key={tab.href} href={tab.href} onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                          active ? "bg-brand-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
                        <Icon active={active} />
                        {t(tab.key)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== Mobile top bar ===== */}
      <header className="glass-nav sticky top-0 z-20 flex items-center justify-between gap-2 px-4 py-3 md:hidden">
        <Link href="/" aria-label="CyberSoft — Trang chủ" className="flex items-center">
          <BrandLogo className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <NotificationBell />
          <LangSwitch />
          <AuthButton student={student} t={t} router={router} compact />
        </div>
      </header>

      <main className="mx-auto min-h-[70vh] w-full max-w-[2200px] md:px-8 md:py-7 xl:px-12 2xl:px-20">{children}</main>

      <SiteFooter />

      {/* ===== Mobile bottom tab bar ===== */}
      <nav className="glass-nav fixed bottom-0 left-1/2 z-30 flex w-full max-w-[520px] -translate-x-1/2 md:hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.5)", borderBottom: "none" }}>
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 px-0.5 py-1.5 transition ${
                active ? "text-brand-600" : "text-slate-500"
              }`}
            >
              <Icon active={active} />
              <span className="w-full truncate text-center text-[10px] font-bold leading-tight">
                {tab.short || t(tab.key)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Facebook-style account menu: avatar + name → dropdown with Profile + Logout.
function AuthButton({ student, t, router, compact }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!student) {
    return (
      <Link href="/login" className="rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 md:text-sm">
        {t("nav_login")}
      </Link>
    );
  }

  const initial = (student.name || "?").trim().charAt(0).toUpperCase();
  const typeLabel = student.type === "OLD" ? "Học viên" : "Khách";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Tài khoản"
        aria-expanded={open}
        className="glass glass-hover flex items-center gap-1.5 rounded-full py-1 pl-1 pr-1.5"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{initial}</span>
        {!compact && <span className="max-w-[120px] truncate text-sm font-semibold text-slate-800">{student.name}</span>}
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 text-slate-500 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
          <div className="mb-1 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-base font-bold text-white">{initial}</span>
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold text-slate-900">{student.name}</div>
              <div className="text-[11px] font-semibold text-slate-500">{typeLabel}</div>
            </div>
          </div>
          <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            <UserIcon /> {t("nav_profile")}
          </Link>
          <button
            onClick={async () => { setOpen(false); await logout(); router.push("/"); }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
            {t("nav_logout")}
          </button>
        </div>
      )}
    </div>
  );
}

function base(active) {
  return { width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: active ? 2.4 : 2, strokeLinecap: "round", strokeLinejoin: "round" };
}
function HomeIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>); }
function DocIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><path d="M9 13h7M9 17h7" /></svg>); }
function CvIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M13 8h4M13 12h4M7 15h10" /></svg>); }
function ChatIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z" /></svg>); }
function TargetIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>); }
function BadgeIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><circle cx="12" cy="9" r="6" /><path d="M9 14l-2 7 5-3 5 3-2-7" /></svg>); }
function UserIcon({ active }) { return (<svg viewBox="0 0 24 24" {...base(active)}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>); }
