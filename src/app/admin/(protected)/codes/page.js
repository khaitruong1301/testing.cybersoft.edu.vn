"use client";
import { useState } from "react";

export default function CodesPage() {
  const [type, setType] = useState("OLD");
  const [batch, setBatch] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!file) return setError("Chọn file Excel trước.");
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);
    if (batch) fd.append("batch", batch);
    const r = await fetch("/api/admin/generate-codes", { method: "POST", body: fd });
    const d = await r.json();
    setLoading(false);
    if (!r.ok) setError(d.error || "Lỗi.");
    else setResult(d);
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Sinh mã từ Excel</h1>
      <p className="mb-6 text-sm text-slate-500">
        File cần có các cột: <b>name</b>, <b>email</b>, <b>phone</b>. Hệ thống sinh mã 6 ký tự (số + chữ), không trùng.
      </p>

      <form onSubmit={submit} className="max-w-lg space-y-4 rounded-2xl bg-white p-5 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">Loại học viên</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          >
            <option value="OLD">Học viên cũ (truy cập vĩnh viễn)</option>
            <option value="UNREGISTERED">Chưa đăng ký (dùng thử 7 ngày)</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">Nhãn đợt (tuỳ chọn)</label>
          <input
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder="VD: 2026-07 K21"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">File Excel (.xlsx / .csv)</label>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
        </div>
        {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
        <button disabled={loading} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {loading ? "Đang xử lý…" : "Sinh mã"}
        </button>
      </form>

      {result && (
        <div className="mt-5 max-w-lg rounded-2xl bg-emerald-50 p-5">
          <p className="font-bold text-emerald-700">✓ Đã sinh {result.count} mã (đợt: {result.batch}).</p>
          <a
            href={`/api/admin/export-codes?batch=${encodeURIComponent(result.batch)}`}
            className="mt-3 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
          >
            ⬇ Tải file mã (.xlsx) để gửi học viên
          </a>
          {result.sample?.length > 0 && (
            <table className="mt-4 w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400">
                  <th className="py-1">Tên</th><th>Email</th><th>Mã</th>
                </tr>
              </thead>
              <tbody>
                {result.sample.map((s, i) => (
                  <tr key={i} className="border-t border-emerald-100">
                    <td className="py-1">{s.name}</td>
                    <td>{s.email}</td>
                    <td className="font-mono font-bold">{s.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
