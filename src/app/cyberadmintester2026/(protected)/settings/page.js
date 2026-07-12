"use client";
import { useEffect, useState } from "react";

const FIELDS = [
  ["access_days_old", "Thời hạn truy cập — học viên cũ (ngày, 0 = vĩnh viễn)"],
  ["access_days_unregistered", "Dùng thử — chưa đăng ký (ngày)"],
  ["extend_days_old", "Gia hạn học viên cũ (ngày)"],
  ["extend_days_unregistered", "Gia hạn chưa đăng ký (ngày)"],
  ["interview_question_count", "Số câu mỗi lượt LUYỆN PHỎNG VẤN"],
  ["quiz_mcq_count", "Số câu trắc nghiệm mỗi lượt luyện"],
  ["quiz_essay_count", "Số câu tự luận mỗi lượt luyện"],
  ["mock_question_count", "Số câu Mock Interview"],
  ["mock_duration_min", "Thời gian làm bài Mock (phút)"],
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings || {}));
  }, []);

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    const r = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const d = await r.json();
    setSettings(d.settings || settings);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Cấu hình hệ thống</h1>
      <p className="mb-6 text-sm text-slate-500">Mốc thời gian truy cập, gia hạn và số câu luyện tập / mock interview.</p>

      <form onSubmit={save} className="max-w-2xl rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          {FIELDS.map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-600">{label}</span>
              <input
                type="number"
                min="0"
                value={settings[key] ?? ""}
                onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5"
              />
            </label>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button disabled={loading} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            {loading ? "Đang lưu…" : "Lưu cấu hình"}
          </button>
          {saved && <span className="text-sm font-semibold text-emerald-600">✓ Đã lưu</span>}
        </div>
      </form>

      <ChangePassword />
    </div>
  );
}

function ChangePassword() {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!cur || !next) return setError("Nhập mật khẩu hiện tại và mật khẩu mới.");
    if (next.length < 8) return setError("Mật khẩu mới cần ít nhất 8 ký tự.");
    if (next !== confirm) return setError("Xác nhận mật khẩu mới không khớp.");
    setBusy(true);
    const r = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: cur, newPassword: next }),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setError(d.error || "Lỗi.");
    setMsg("✓ Đã đổi mật khẩu. Lần đăng nhập sau dùng mật khẩu mới.");
    setCur("");
    setNext("");
    setConfirm("");
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-md space-y-3 rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="font-bold text-slate-700">Đổi mật khẩu admin</h2>
      <input
        type="password"
        value={cur}
        onChange={(e) => setCur(e.target.value)}
        placeholder="Mật khẩu hiện tại"
        autoComplete="current-password"
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        placeholder="Mật khẩu mới (≥ 8 ký tự)"
        autoComplete="new-password"
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Xác nhận mật khẩu mới"
        autoComplete="new-password"
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
      />
      {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
      {msg && <p className="rounded bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">{msg}</p>}
      <button disabled={busy} className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
        {busy ? "Đang đổi…" : "Đổi mật khẩu"}
      </button>
    </form>
  );
}
