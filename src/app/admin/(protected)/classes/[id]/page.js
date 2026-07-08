"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ClassDetailPage() {
  const { id } = useParams();
  const [klass, setKlass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Thêm học viên có sẵn
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Import Excel
  const [file, setFile] = useState(null);
  const [importStatus, setImportStatus] = useState("STUDYING");
  const [importResult, setImportResult] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/classes/${id}`, { cache: "no-store" });
    const d = await r.json();
    setKlass(d.class || null);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    load();
  }, [load]);

  const enrolledIds = new Set((klass?.enrollments || []).map((e) => e.studentId));

  async function search() {
    if (!q.trim()) return;
    setSearching(true);
    const r = await fetch(`/api/admin/students?q=${encodeURIComponent(q)}`, { cache: "no-store" });
    const d = await r.json();
    setResults((d.students || []).filter((s) => !enrolledIds.has(s.id)).slice(0, 12));
    setSearching(false);
  }

  async function enroll(studentId, status = "STUDYING") {
    setMsg("");
    await fetch("/api/admin/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, classId: id, status }),
    });
    setResults((prev) => prev.filter((s) => s.id !== studentId));
    setMsg("Đã ghi danh — học viên được chuyển thành học viên cũ (đủ quyền).");
    load();
  }

  async function changeStatus(enrollmentId, status) {
    await fetch("/api/admin/enroll", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollmentId, status }),
    });
    load();
  }

  async function unenroll(enrollmentId) {
    if (!confirm("Gỡ học viên khỏi lớp? (không hạ trạng thái học viên)")) return;
    await fetch("/api/admin/enroll", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollmentId }),
    });
    load();
  }

  async function importSubmit(e) {
    e.preventDefault();
    setImportError("");
    setImportResult(null);
    if (!file) return setImportError("Chọn file Excel trước.");
    setImporting(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("classId", id);
    fd.append("status", importStatus);
    const r = await fetch("/api/admin/import-students", { method: "POST", body: fd });
    const d = await r.json();
    setImporting(false);
    if (!r.ok) return setImportError(d.error || "Lỗi.");
    setImportResult(d);
    setFile(null);
    load();
  }

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—");

  if (loading) return <p className="text-sm text-slate-400">Đang tải…</p>;
  if (!klass) return <p className="text-sm text-rose-500">Không tìm thấy lớp. <Link href="/admin/classes" className="underline">Về danh sách lớp</Link></p>;

  const batch = klass.code || klass.name;

  return (
    <div>
      <Link href="/admin/classes" className="text-xs font-semibold text-slate-400 hover:underline">← Danh sách lớp</Link>
      <div className="mt-2 mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-800">{klass.name}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          {klass.code && <span>Mã lớp: <b className="text-slate-700">{klass.code}</b></span>}
          <span>Chi nhánh: <b className="text-slate-700">{klass.branch?.name || "—"}</b></span>
          {klass.schedule && <span>Lịch: <b className="text-slate-700">{klass.schedule}</b></span>}
          <span>Khai giảng: <b className="text-slate-700">{fmt(klass.startDate)}</b></span>
          <span>Ngày tạo: {fmt(klass.createdAt)}</span>
          <span>Sĩ số: <b className="text-slate-700">{klass.enrollments.length}</b></span>
        </div>
        <a
          href={`/api/admin/export-codes?batch=${encodeURIComponent(batch)}`}
          className="mt-3 inline-block rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
        >
          ⬇ Tải mã đăng nhập của lớp (.xlsx)
        </a>
      </div>

      {msg && <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{msg}</p>}

      {/* Danh sách học viên trong lớp */}
      <div className="mb-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr>
              <th className="p-3">Học viên</th>
              <th>Mã</th>
              <th>Trạng thái học</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {klass.enrollments.map((en) => (
              <tr key={en.id} className="border-t border-slate-100 align-middle">
                <td className="p-3">
                  <div className="font-semibold text-slate-700">{en.student?.name}</div>
                  <div className="text-xs text-slate-400">{en.student?.email} · {en.student?.phone}</div>
                </td>
                <td className="font-mono text-xs">{en.student?.code?.code || "—"}</td>
                <td>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      en.status === "STUDYING" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {en.status === "STUDYING" ? "Đang học" : "Đã học"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {en.status === "STUDYING" ? (
                      <button onClick={() => changeStatus(en.id, "COMPLETED")} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        → Đã học
                      </button>
                    ) : (
                      <button onClick={() => changeStatus(en.id, "STUDYING")} className="rounded bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-600">
                        → Đang học
                      </button>
                    )}
                    <button onClick={() => unenroll(en.id)} className="rounded bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-600">
                      Gỡ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {klass.enrollments.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-sm text-slate-400">
                  Chưa có học viên. Thêm học viên có sẵn hoặc import Excel bên dưới.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Thêm học viên có sẵn */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-bold text-slate-700">Thêm học viên có sẵn</h2>
          <p className="mb-3 text-xs text-slate-500">Tìm học viên (kể cả user dùng thử) rồi ghi danh vào lớp này.</p>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), search())}
              placeholder="Tìm tên / email / phone / mã…"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button onClick={search} disabled={searching} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
              {searching ? "…" : "Tìm"}
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {results.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                <div>
                  <div className="text-sm font-semibold text-slate-700">{s.name}</div>
                  <div className="text-xs text-slate-400">
                    {s.email} · {s.phone} · {s.type === "OLD" ? "Cũ" : "Chưa ĐK"}
                  </div>
                </div>
                <button onClick={() => enroll(s.id)} className="rounded bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                  Ghi danh
                </button>
              </div>
            ))}
            {q && !searching && results.length === 0 && (
              <p className="text-xs text-slate-400">Không tìm thấy học viên phù hợp (hoặc đã ở trong lớp).</p>
            )}
          </div>
        </div>

        {/* Import Excel vào lớp */}
        <form onSubmit={importSubmit} className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-bold text-slate-700">Import danh sách vào lớp</h2>
          <p className="mb-3 text-xs text-slate-500">
            File Excel cột: <b>name</b>, <b>email</b>, <b>phone</b>. Mỗi học viên được tạo mã đăng nhập và ghi danh vào lớp (thành học viên cũ, đủ quyền).
          </p>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
          <select
            value={importStatus}
            onChange={(e) => setImportStatus(e.target.value)}
            className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="STUDYING">Trạng thái: Đang học</option>
            <option value="COMPLETED">Trạng thái: Đã học</option>
          </select>
          {importError && <p className="mt-2 rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{importError}</p>}
          <button disabled={importing} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {importing ? "Đang import…" : "Import vào lớp"}
          </button>
          {importResult && (
            <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700">
              <p className="font-bold">
                ✓ Ghi danh {importResult.enrolled} học viên ({importResult.created} mới, {importResult.reused} đã có).
              </p>
              <a href={`/api/admin/export-codes?batch=${encodeURIComponent(batch)}`} className="mt-2 inline-block font-bold underline">
                Tải mã đăng nhập (.xlsx)
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
