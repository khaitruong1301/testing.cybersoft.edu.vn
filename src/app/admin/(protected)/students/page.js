"use client";
import { useEffect, useState, useCallback } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/students?q=${encodeURIComponent(q)}`, { cache: "no-store" });
    const d = await r.json();
    setStudents(d.students || []);
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(id, action) {
    setBusy(id + action);
    await fetch(`/api/admin/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    await load();
    setBusy("");
  }

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—");
  const expired = (s) => s.accessExpires && new Date(s.accessExpires) < new Date();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-extrabold text-slate-800">Học viên</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm tên / email / phone / mã…"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr>
              <th className="p-3">Học viên</th>
              <th>Loại</th>
              <th>Mã</th>
              <th>Đăng nhập đầu</th>
              <th>Hết hạn</th>
              <th>Trạng thái</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-slate-100 align-middle">
                <td className="p-3">
                  <div className="font-semibold text-slate-700">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.email} · {s.phone}</div>
                </td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.type === "OLD" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
                    {s.type === "OLD" ? "Cũ" : "Chưa ĐK"}
                  </span>
                </td>
                <td className="font-mono text-xs">{s.code?.code || "—"}</td>
                <td className="text-xs text-slate-500">{fmt(s.firstLoginAt)}</td>
                <td className={`text-xs ${expired(s) ? "font-bold text-rose-500" : "text-slate-500"}`}>{fmt(s.accessExpires)}</td>
                <td>
                  {!s.active ? (
                    <span className="text-xs font-semibold text-rose-500">Khoá</span>
                  ) : s.registered ? (
                    <span className="text-xs font-semibold text-emerald-600">Đã ĐK</span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-500">Chưa ĐK</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => act(s.id, "extend")}
                      disabled={busy === s.id + "extend"}
                      className="rounded bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700"
                    >
                      + Gia hạn
                    </button>
                    {!s.registered && (
                      <button
                        onClick={() => act(s.id, "register")}
                        className="rounded bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700"
                      >
                        ✓ Đổi sang đã ĐK
                      </button>
                    )}
                    <button
                      onClick={() => act(s.id, "toggleActive")}
                      className="rounded bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600"
                    >
                      {s.active ? "Khoá" : "Mở"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-sm text-slate-400">
                  Chưa có học viên nào đăng nhập.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Gia hạn: học viên cũ +1 tháng, chưa đăng ký +3 tháng (đổi trong Cấu hình). Đổi sang “đã ĐK” sẽ tự gia hạn.
      </p>
    </div>
  );
}
