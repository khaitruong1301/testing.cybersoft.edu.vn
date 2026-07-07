"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const { t, lang } = useLang();
  const { refresh, student } = useAuth();
  const router = useRouter();

  // Already logged in -> go straight to materials.
  useEffect(() => {
    if (student) router.replace("/documents");
  }, [student, router]);
  const [type, setType] = useState("OLD");
  const [form, setForm] = useState({ email: "", phone: "", code: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || "Đăng nhập thất bại.");
      } else {
        await refresh();
        router.push("/documents");
      }
    } catch {
      setError("Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  }

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 md:py-14">
      <div className="glass-strong rounded-3xl p-6 md:p-8">
      <h1 className="text-xl font-extrabold text-slate-900">{t("login_title")}</h1>

      {/* type toggle */}
      <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/70 p-1.5">
        {[
          ["OLD", t("login_old")],
          ["UNREGISTERED", t("login_new")],
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setType(val)}
            className={`rounded-xl py-2.5 text-sm font-bold transition ${
              type === val
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <Field label={t("f_email")} type="email" value={form.email} onChange={upd("email")} placeholder="ban@email.com" />
        <Field label={t("f_phone")} value={form.phone} onChange={upd("phone")} placeholder="09xxxxxxxx" />
        <Field
          label={t("f_code")}
          value={form.code}
          onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
          placeholder="AB2K7M"
          mono
        />

        {type === "UNREGISTERED" && (
          <div className="rounded-2xl bg-amber-50 p-3 text-xs text-amber-800">
            <div className="mb-1.5 font-semibold">{t("get_code")}</div>
            <div className="flex flex-col gap-1.5">
              <a
                href="https://facebook.com/lophocviet"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-semibold text-blue-600"
              >
                💬 {t("fanpage")} →
              </a>
              <a
                href="https://zalo.me/0961051014"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-semibold text-blue-500"
              >
                📞 {t("zalo")}: 096.105.1014 →
              </a>
            </div>
          </div>
        )}

        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "…" : t("submit")}
        </button>
      </form>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        {lang === "vi"
          ? "Học viên cũ: truy cập vĩnh viễn · Chưa đăng ký: 7 ngày (admin có thể đổi)."
          : lang === "ja"
          ? "既存受講生は無期限・未登録は7日間（管理者が変更可）。"
          : "Existing students: lifetime access · Unregistered: 7 days (admin configurable)."}
      </p>
      </div>
    </div>
  );
}

function Field({ label, mono, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
      <input
        {...props}
        required
        className={`glass w-full rounded-xl px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-300 ${
          mono ? "font-mono tracking-widest uppercase" : ""
        }`}
      />
    </label>
  );
}
