"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const d = await r.json();
    setLoading(false);
    if (!r.ok) setError(d.error || "Sai thông tin.");
    else router.push("/admin");
  }

  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">CS</span>
          <div>
            <h1 className="font-extrabold text-slate-800">Admin CyberSoft Tester</h1>
            <p className="text-xs text-slate-400">Hệ thống quản trị</p>
          </div>
        </div>
        <label className="mb-2 block text-sm">
          <span className="mb-1 block font-semibold text-slate-500">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-500"
          />
        </label>
        <label className="mb-3 block text-sm">
          <span className="mb-1 block font-semibold text-slate-500">Mật khẩu</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-500"
          />
        </label>
        {error && <p className="mb-2 rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "…" : "Đăng nhập"}
        </button>
        <p className="mt-3 text-center text-[11px] text-slate-400">Mặc định: admin@cybersoft.edu.vn / Admin@12345</p>
      </form>
    </div>
  );
}
