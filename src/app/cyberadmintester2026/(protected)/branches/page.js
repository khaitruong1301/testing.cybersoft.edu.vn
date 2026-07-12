"use client";
import { useEffect, useState, useCallback } from "react";

const EMPTY = { name: "", code: "", address: "", phone: "" };

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null); // id đang sửa
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/branches", { cache: "no-store" });
    const d = await r.json();
    setBranches(d.branches || []);
  }, []);
  useEffect(() => {
    load();
    const iv = setInterval(load, 8000);
    return () => clearInterval(iv);
  }, [load]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Nhập tên chi nhánh.");
    setBusy(true);
    const url = editing ? `/api/admin/branches/${editing}` : "/api/admin/branches";
    const r = await fetch(url, {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setError(d.error || "Lỗi.");
    setForm(EMPTY);
    setEditing(null);
    load();
  }

  function edit(b) {
    setEditing(b.id);
    setForm({ name: b.name || "", code: b.code || "", address: b.address || "", phone: b.phone || "" });
  }

  async function remove(b) {
    if (!confirm(`Xoá chi nhánh "${b.name}"? Các lớp thuộc chi nhánh sẽ được gỡ liên kết.`)) return;
    await fetch(`/api/admin/branches/${b.id}`, { method: "DELETE" });
    if (editing === b.id) {
      setEditing(null);
      setForm(EMPTY);
    }
    load();
  }

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—");

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Chi nhánh</h1>
      <p className="mb-6 text-sm text-slate-500">Quản lý danh sách chi nhánh CyberSoft. Lớp học sẽ gắn vào chi nhánh.</p>

      <div className="grid gap-5 md:grid-cols-[340px_1fr]">
        <form onSubmit={submit} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-700">{editing ? "Sửa chi nhánh" : "Thêm chi nhánh"}</h2>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tên chi nhánh *"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="Mã chi nhánh (tuỳ chọn)"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Địa chỉ"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Điện thoại"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
          <div className="flex gap-2">
            <button disabled={busy} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
              {busy ? "Đang lưu…" : editing ? "Lưu" : "Thêm"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm(EMPTY);
                  setError("");
                }}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Huỷ
              </button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="p-3">Chi nhánh</th>
                <th>Liên hệ</th>
                <th>Số lớp</th>
                <th>Ngày tạo</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id} className="border-t border-slate-100 align-middle">
                  <td className="p-3">
                    <div className="font-semibold text-slate-700">{b.name}</div>
                    <div className="text-xs text-slate-400">
                      {b.code ? `Mã ${b.code}` : ""} {b.address ? `· ${b.address}` : ""}
                    </div>
                  </td>
                  <td className="text-xs text-slate-500">{b.phone || "—"}</td>
                  <td className="text-xs text-slate-500">{b._count?.classes ?? 0}</td>
                  <td className="text-xs text-slate-500">{fmt(b.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => edit(b)} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        Sửa
                      </button>
                      <button onClick={() => remove(b)} className="rounded bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-600">
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {branches.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-400">
                    Chưa có chi nhánh. Thêm chi nhánh đầu tiên ở bên trái.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
