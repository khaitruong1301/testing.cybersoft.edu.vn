"use client";
import { useEffect, useState, useCallback } from "react";

// Kích hoạt bộ 8 ebook "Chuẩn bị trước khoá AI Tester" theo email đăng ký, sau khi học viên đóng học phí.
export default function EbookAccessPage() {
  const [emails, setEmails] = useState("");
  const [note, setNote] = useState("");
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/ebook-access?q=${encodeURIComponent(q)}`);
    const d = await r.json();
    setRows(d.grants || []);
  }, [q]);
  useEffect(() => { load(); }, [load]);

  async function activate(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const r = await fetch("/api/admin/ebook-access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ emails, note }) });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setMsg(`✕ ${d.error}${d.bad?.length ? ` Sai định dạng: ${d.bad.join(", ")}` : ""}`);
    setMsg(`✓ Đã kích hoạt ${d.activated} email (${d.created} mới).${d.bad.length ? ` Bỏ qua email sai: ${d.bad.join(", ")}` : ""}`);
    setEmails(""); load();
  }

  async function revoke(row) {
    if (!confirm(`Gỡ quyền xem ebook của ${row.email}?`)) return;
    await fetch(`/api/admin/ebook-access?id=${row.id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Ebook chuẩn bị khoá AI Tester</h1>
      <p className="mb-4 text-sm text-slate-500">
        Học viên đã đóng học phí: nhập <b>email đăng ký</b> để mở 8 ebook tại <code>/tai-lieu-ai-tester</code>. Kích hoạt được cả khi học viên chưa tạo tài khoản: lúc họ đăng nhập bằng đúng email này là xem được ngay.
      </p>

      <form onSubmit={activate} className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Email (mỗi dòng một email, hoặc cách nhau bằng dấu phẩy)</label>
        <textarea value={emails} onChange={(e) => setEmails(e.target.value)} rows={4} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder={"hocvien1@gmail.com\nhocvien2@gmail.com"} />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input value={note} onChange={(e) => setNote(e.target.value)} className="min-w-[240px] flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Ghi chú (ví dụ: lớp AIT-01, đã đóng học phí)" />
          <button disabled={busy || !emails.trim()} className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-bold text-white disabled:opacity-50">
            {busy ? "Đang kích hoạt…" : "Kích hoạt"}
          </button>
        </div>
        {msg && <p className="mt-2 text-sm font-semibold text-slate-700">{msg}</p>}
      </form>

      <div className="mb-3 flex items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} className="w-72 rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Tìm email…" />
        <span className="text-sm text-slate-500">{rows.length} email đã kích hoạt</span>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr><th className="px-3 py-2">Email</th><th className="px-3 py-2">Tài khoản học viên</th><th className="px-3 py-2">Ghi chú</th><th className="px-3 py-2">Kích hoạt lúc</th><th className="px-3 py-2"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-slate-800">{r.email}</td>
                <td className="px-3 py-2 text-slate-600">
                  {r.student ? <>{r.student.name} · {r.student.phone}{r.student.firstLoginAt ? "" : " · chưa đăng nhập"}{r.student.active ? "" : " · đang bị khoá"}</> : <span className="text-amber-700">chưa có tài khoản</span>}
                </td>
                <td className="px-3 py-2 text-slate-600">{r.note}</td>
                <td className="px-3 py-2 text-slate-500">{new Date(r.createdAt).toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2 text-right"><button onClick={() => revoke(r)} className="text-xs font-bold text-red-600 hover:underline">Gỡ</button></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={5} className="px-3 py-6 text-center text-slate-400">Chưa có email nào.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
