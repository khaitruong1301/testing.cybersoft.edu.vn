"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const EMPTY = { name: "", code: "", schedule: "", startDate: "", branchId: "", note: "" };

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [filterBranch, setFilterBranch] = useState("");

  const load = useCallback(async () => {
    const url = filterBranch ? `/api/admin/classes?branchId=${filterBranch}` : "/api/admin/classes";
    const [rc, rb] = await Promise.all([
      fetch(url, { cache: "no-store" }),
      fetch("/api/admin/branches", { cache: "no-store" }),
    ]);
    const dc = await rc.json();
    const db = await rb.json();
    setClasses(dc.classes || []);
    setBranches(db.branches || []);
  }, [filterBranch]);
  useEffect(() => {
    load();
    const iv = setInterval(load, 8000);
    return () => clearInterval(iv);
  }, [load]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Nhập tên lớp.");
    setBusy(true);
    const r = await fetch("/api/admin/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setError(d.error || "Lỗi.");
    setForm(EMPTY);
    load();
  }

  async function remove(c) {
    if (!confirm(`Xoá lớp "${c.name}"? Các ghi danh trong lớp sẽ bị xoá (học viên vẫn giữ trạng thái).`)) return;
    await fetch(`/api/admin/classes/${c.id}`, { method: "DELETE" });
    load();
  }

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—");

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Lớp học</h1>
      <p className="mb-6 text-sm text-slate-500">
        Tạo lớp trước, sau đó vào chi tiết lớp để ghi danh học viên. Ghi danh sẽ tự chuyển học viên thành “học viên cũ” (đủ quyền).
      </p>

      <div className="grid gap-5 md:grid-cols-[340px_1fr]">
        <form onSubmit={submit} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-700">Tạo lớp</h2>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tên lớp * (VD: Tester K21 Online)"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="Mã lớp (tuỳ chọn, VD: T-K21)"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            value={form.schedule}
            onChange={(e) => setForm({ ...form, schedule: e.target.value })}
            placeholder="Thời gian học (VD: Tối 2-4-6 · 19:00–21:00)"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <label className="block text-xs font-semibold text-slate-500">
            Ngày khai giảng (tuỳ chọn)
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <select
            value={form.branchId}
            onChange={(e) => setForm({ ...form, branchId: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">— Chọn chi nhánh —</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {branches.length === 0 && (
            <p className="text-[11px] text-amber-600">
              Chưa có chi nhánh. Bạn có thể tạo lớp trước rồi gán chi nhánh sau (tạo ở mục Chi nhánh).
            </p>
          )}
          {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
          <button disabled={busy} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {busy ? "Đang tạo…" : "Tạo lớp"}
          </button>
        </form>

        <div>
          <div className="mb-2 flex items-center justify-end">
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
            >
              <option value="">Tất cả chi nhánh</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-slate-50 text-left text-xs text-slate-500">
                <tr>
                  <th className="p-3">Lớp</th>
                  <th>Chi nhánh</th>
                  <th>Học viên</th>
                  <th>Ngày tạo</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100 align-middle">
                    <td className="p-3">
                      <Link href={`/cyberadmintester2026/classes/${c.id}`} className="font-semibold text-brand-700 hover:underline">
                        {c.name}
                      </Link>
                      <div className="text-xs text-slate-400">
                        {c.code ? `Mã ${c.code}` : ""} {c.schedule ? `· ${c.schedule}` : ""}
                      </div>
                    </td>
                    <td className="text-xs text-slate-500">{c.branch?.name || "—"}</td>
                    <td className="text-xs text-slate-500">{c._count?.enrollments ?? 0}</td>
                    <td className="text-xs text-slate-500">{fmt(c.createdAt)}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Link href={`/cyberadmintester2026/classes/${c.id}`} className="rounded bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700">
                          Ghi danh
                        </Link>
                        <button onClick={() => remove(c)} className="rounded bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-600">
                          Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {classes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-sm text-slate-400">
                      Chưa có lớp nào. Tạo lớp ở bên trái.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
