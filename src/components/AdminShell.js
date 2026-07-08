"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Tổng quan", icon: "📊" },
  { href: "/admin/branches", label: "Chi nhánh", icon: "🏢" },
  { href: "/admin/classes", label: "Lớp học", icon: "🏫" },
  { href: "/admin/students", label: "Học viên", icon: "👥" },
  { href: "/admin/codes", label: "Sinh mã (Excel)", icon: "🔑" },
  { href: "/admin/settings", label: "Cấu hình", icon: "⚙️" },
];

export default function AdminShell({ children, adminName }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-4 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-xs font-extrabold text-white">CS</span>
          <span className="font-extrabold text-slate-800">Admin</span>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => {
            const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <span>{n.icon}</span> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="mb-2 truncate text-xs text-slate-400">{adminName}</p>
          <button onClick={logout} className="w-full rounded-lg bg-slate-100 py-2 text-xs font-semibold text-slate-600">
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex-1">
        {/* mobile top nav */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600">
              {n.icon} {n.label}
            </Link>
          ))}
          <button onClick={logout} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-rose-500">
            ⎋
          </button>
        </div>
        <main className="mx-auto max-w-5xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
