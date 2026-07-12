"use client";
import { useState } from "react";

export default function CodesPage() {
  const [mode, setMode] = useState("single"); // single | excel

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Sinh mã truy cập</h1>
      <p className="mb-4 text-sm text-slate-500">
        Cấp mã cho học viên <b>chưa đăng ký</b> để dùng thử (tối đa <b>3 ngày</b>). Đăng ký học + ghi danh vào lớp mới có full quyền vĩnh viễn.
      </p>

      <div className="mb-5 inline-flex rounded-xl bg-slate-100 p-1 text-sm font-semibold">
        <button onClick={() => setMode("single")} className={`rounded-lg px-4 py-1.5 ${mode === "single" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"}`}>
          Phát mã lẻ (tìm học viên)
        </button>
        <button onClick={() => setMode("excel")} className={`rounded-lg px-4 py-1.5 ${mode === "excel" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"}`}>
          Import Excel (hàng loạt)
        </button>
      </div>

      {mode === "single" ? <SingleCode /> : <ExcelCode />}
    </div>
  );
}

// ===== Phát mã lẻ: tìm theo email/SĐT rồi sinh mã dùng thử =====
function SingleCode() {
  const [q, setQ] = useState("");
  const [matches, setMatches] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  async function search(e) {
    e?.preventDefault();
    setError(""); setResult(null);
    if (!q.trim()) return;
    setBusy("search");
    const r = await fetch(`/api/admin/quick-code?q=${encodeURIComponent(q.trim())}`, { cache: "no-store" });
    const d = await r.json();
    setBusy("");
    setMatches(d.matches || []);
  }

  function useMatch(m) {
    setName(m.name || ""); setEmail(m.email || ""); setPhone(m.phone || "");
  }

  async function issue() {
    setError(""); setResult(null);
    if (!email.trim() && !phone.trim()) return setError("Cần email hoặc số điện thoại.");
    setBusy("issue");
    const r = await fetch("/api/admin/quick-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, sendEmail }),
    });
    const d = await r.json();
    setBusy("");
    if (!r.ok) return setError(d.error || "Lỗi.");
    setResult(d);
  }

  return (
    <div className="max-w-lg space-y-5">
      <form onSubmit={search} className="rounded-2xl bg-white p-5 shadow-sm">
        <label className="mb-1 block text-sm font-semibold text-slate-600">Tìm học viên theo email hoặc SĐT</label>
        <div className="flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="nhập email hoặc số điện thoại…" className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
          <button disabled={busy === "search"} className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            {busy === "search" ? "…" : "Tìm"}
          </button>
        </div>
        {matches && matches.length > 0 && (
          <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-100">
            {matches.map((m) => (
              <button type="button" key={m.code} onClick={() => useMatch(m)} className="flex w-full items-center justify-between px-3 py-2 text-left text-xs hover:bg-slate-50">
                <span><b className="text-slate-700">{m.name}</b> · {m.email} · {m.phone}</span>
                <span className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${m.registered ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {m.registered ? "Đã ĐK" : m.activated ? "Đang thử" : "Chưa dùng"}
                </span>
              </button>
            ))}
          </div>
        )}
        {matches && matches.length === 0 && <p className="mt-2 text-xs text-slate-400">Không tìm thấy — nhập thông tin bên dưới để cấp mã mới.</p>}
      </form>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-slate-600">Phát mã dùng thử (chưa đăng ký · 3 ngày)</p>
        <div className="space-y-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <label className="flex items-center gap-2 text-xs text-slate-500">
            <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} /> Gửi mã qua email cho học viên
          </label>
        </div>
        {error && <p className="mt-2 rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
        <button onClick={issue} disabled={busy === "issue"} className="mt-3 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {busy === "issue" ? "Đang phát…" : "Phát mã"}
        </button>

        {result && (
          <div className="mt-4 rounded-xl bg-emerald-50 p-4">
            <p className="text-xs font-semibold text-emerald-700">{result.created ? "✓ Đã tạo mã mới" : "Mã đã có sẵn cho học viên này"}{result.emailed ? " · đã gửi email" : ""}</p>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-white px-3 py-2 text-center font-mono text-lg font-bold tracking-widest text-slate-800">{result.code}</code>
              <button onClick={() => navigator.clipboard?.writeText(result.code)} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">Copy</button>
            </div>
            <p className="mt-2 text-[11px] text-emerald-700/80">Gửi mã này cùng email ({result.email}) + SĐT ({result.phone}) cho học viên.</p>
            {result.emailError && <p className="mt-1 text-[11px] font-semibold text-rose-500">Email chưa gửi được: {result.emailError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== Import Excel hàng loạt (giữ nguyên chức năng cũ) =====
function ExcelCode() {
  const [type, setType] = useState("UNREGISTERED");
  const [batch, setBatch] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(""); setResult(null);
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
    <>
      <p className="mb-4 max-w-lg text-sm text-slate-500">
        File cần có các cột: <b>name</b>, <b>email</b>, <b>phone</b>. Hệ thống sinh mã 6 ký tự (số + chữ), không trùng.
      </p>
      <form onSubmit={submit} className="max-w-lg space-y-4 rounded-2xl bg-white p-5 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">Loại học viên</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
            <option value="UNREGISTERED">Chưa đăng ký (dùng thử 3 ngày)</option>
            <option value="OLD">Học viên cũ (truy cập vĩnh viễn)</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">Nhãn đợt (tuỳ chọn)</label>
          <input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="VD: 2026-07 K21" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">File Excel (.xlsx / .csv)</label>
          <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm" />
        </div>
        {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
        <button disabled={loading} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {loading ? "Đang xử lý…" : "Sinh mã"}
        </button>
      </form>

      {result && (
        <div className="mt-5 max-w-lg rounded-2xl bg-emerald-50 p-5">
          <p className="font-bold text-emerald-700">✓ Đã sinh {result.count} mã (đợt: {result.batch}).</p>
          <a href={`/api/admin/export-codes?batch=${encodeURIComponent(result.batch)}`} className="mt-3 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
            ⬇ Tải file mã (.xlsx) để gửi học viên
          </a>
        </div>
      )}
    </>
  );
}
