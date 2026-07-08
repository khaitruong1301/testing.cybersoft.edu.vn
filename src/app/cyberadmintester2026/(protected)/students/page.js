"use client";
import { useEffect, useState, useCallback } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [q, setQ] = useState("");
  const [classId, setClassId] = useState("");
  const [type, setType] = useState("");
  const [busy, setBusy] = useState("");
  const [editing, setEditing] = useState(null); // student object
  const [enrolling, setEnrolling] = useState(null); // student object

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (classId) params.set("classId", classId);
    if (type) params.set("type", type);
    const r = await fetch(`/api/admin/students?${params.toString()}`, { cache: "no-store" });
    const d = await r.json();
    setStudents(d.students || []);
  }, [q, classId, type]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    fetch("/api/admin/classes", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setClasses(d.classes || []))
      .catch(() => {});
  }, []);

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
        <div className="flex flex-wrap gap-2">
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option value="">Tất cả loại</option>
            <option value="OLD">Học viên cũ</option>
            <option value="UNREGISTERED">Chưa đăng ký</option>
          </select>
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option value="">Tất cả lớp</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm tên / email / phone / mã…"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr>
              <th className="p-3">Học viên</th>
              <th>Loại</th>
              <th>Lớp</th>
              <th>Mã</th>
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
                <td className="text-xs text-slate-500">
                  {(s.enrollments || []).length === 0 ? (
                    <span className="text-slate-300">—</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {s.enrollments.map((en) => (
                        <span key={en.id} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                          {en.class?.name}
                          <span className={en.status === "STUDYING" ? "text-blue-500" : "text-slate-400"}>
                            {en.status === "STUDYING" ? " · đang" : " · đã"}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="font-mono text-xs">{s.code?.code || "—"}</td>
                <td className={`text-xs ${expired(s) ? "font-bold text-rose-500" : "text-slate-500"}`}>
                  {s.accessExpires ? fmt(s.accessExpires) : <span className="text-emerald-600">Vĩnh viễn</span>}
                </td>
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
                    <button onClick={() => setEnrolling(s)} className="rounded bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                      + Ghi danh
                    </button>
                    <button onClick={() => setEditing(s)} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                      Sửa
                    </button>
                    <button
                      onClick={() => act(s.id, "extend")}
                      disabled={busy === s.id + "extend"}
                      className="rounded bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700"
                    >
                      + Gia hạn
                    </button>
                    <button onClick={() => act(s.id, "toggleActive")} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                      {s.active ? "Khoá" : "Mở"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-sm text-slate-400">
                  Không có học viên phù hợp bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Ghi danh vào lớp sẽ tự chuyển học viên sang “học viên cũ” và mở full quyền (vĩnh viễn). User chưa đăng ký chỉ dùng thử 7 ngày.
      </p>

      {editing && <EditModal student={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
      {enrolling && (
        <EnrollModal
          student={enrolling}
          classes={classes}
          onClose={() => setEnrolling(null)}
          onDone={() => { setEnrolling(null); load(); }}
        />
      )}
    </div>
  );
}

function EditModal({ student, onClose, onSaved }) {
  const [name, setName] = useState(student.name || "");
  const [email, setEmail] = useState(student.email || "");
  const [phone, setPhone] = useState(student.phone || "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function save() {
    setError("");
    if (!name.trim() || !email.trim() || !phone.trim()) return setError("Không được để trống.");
    setBusy(true);
    const r = await fetch(`/api/admin/students/${student.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "edit", name, email, phone }),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setError(d.error || "Lỗi.");
    onSaved();
  }

  return (
    <Overlay onClose={onClose} title="Sửa thông tin học viên">
      <label className="block text-xs font-semibold text-slate-500">Họ tên
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
      <label className="block text-xs font-semibold text-slate-500">Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
      <label className="block text-xs font-semibold text-slate-500">Số điện thoại
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
      <p className="text-[11px] text-slate-400">Email/SĐT sẽ đồng bộ với mã đăng nhập để học viên vẫn đăng nhập được.</p>
      {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
      <div className="flex gap-2">
        <button onClick={save} disabled={busy} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Đang lưu…" : "Lưu"}
        </button>
        <button onClick={onClose} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">Huỷ</button>
      </div>
    </Overlay>
  );
}

function EnrollModal({ student, classes, onClose, onDone }) {
  const [classId, setClassId] = useState("");
  const [status, setStatus] = useState("STUDYING");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError("");
    if (!classId) return setError("Chọn lớp.");
    setBusy(true);
    const r = await fetch("/api/admin/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id, classId, status }),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setError(d.error || "Lỗi.");
    onDone();
  }

  return (
    <Overlay onClose={onClose} title={`Ghi danh: ${student.name}`}>
      <p className="text-xs text-slate-500">Ghi danh vào lớp sẽ tự chuyển học viên thành “học viên cũ” và mở full quyền vĩnh viễn.</p>
      <select value={classId} onChange={(e) => setClassId(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
        <option value="">— Chọn lớp —</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}{c.branch?.name ? ` · ${c.branch.name}` : ""}
          </option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
        <option value="STUDYING">Đang học</option>
        <option value="COMPLETED">Đã học</option>
      </select>
      {classes.length === 0 && <p className="text-[11px] text-amber-600">Chưa có lớp nào. Tạo lớp ở mục Lớp học trước.</p>}
      {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
      <div className="flex gap-2">
        <button onClick={submit} disabled={busy} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Đang ghi danh…" : "Ghi danh"}
        </button>
        <button onClick={onClose} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">Huỷ</button>
      </div>
    </Overlay>
  );
}

function Overlay({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-slate-800">{title}</h3>
        {children}
      </div>
    </div>
  );
}
