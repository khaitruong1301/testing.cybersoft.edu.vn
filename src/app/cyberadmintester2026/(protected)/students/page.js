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
  const [adding, setAdding] = useState(false); // modal thêm học viên

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (classId) params.set("classId", classId);
    if (type) params.set("type", type);
    const r = await fetch(`/api/admin/students?${params.toString()}`, { cache: "no-store" });
    const d = await r.json();
    setStudents(d.students || []);
  }, [q, classId, type]);

  // Tự cập nhật: nạp lần đầu + poll mỗi 6s (không cần refresh tay).
  useEffect(() => {
    load();
    const iv = setInterval(load, 6000);
    return () => clearInterval(iv);
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
          <button
            onClick={() => setAdding(true)}
            className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-bold text-white hover:bg-brand-700"
          >
            + Thêm học viên
          </button>
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
                    {/* Gia hạn CHỈ cho học viên chưa đăng ký (dùng thử). Đã ĐK/đã học = vĩnh viễn, không hiện. */}
                    {!s.registered && s.type !== "OLD" && (
                      <button
                        onClick={() => act(s.id, "extend")}
                        disabled={busy === s.id + "extend"}
                        className="rounded bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700"
                      >
                        + Gia hạn 3 ngày
                      </button>
                    )}
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
        Ghi danh vào lớp sẽ tự chuyển học viên sang “học viên cũ” và mở full quyền (vĩnh viễn). Học viên chưa đăng ký chỉ dùng thử tối đa 3 ngày rồi hết hạn.
      </p>

      {adding && <AddModal onClose={() => setAdding(false)} onDone={() => { setAdding(false); load(); }} />}
      {editing && <EditModal student={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
      {enrolling && (
        <EnrollModal
          student={enrolling}
          classes={classes}
          onClose={() => setEnrolling(null)}
          onChanged={load}
        />
      )}
    </div>
  );
}

function AddModal({ onClose, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("UNREGISTERED");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState(null); // { code, ... }

  async function save() {
    setError("");
    if (!name.trim() || !email.trim() || !phone.trim()) return setError("Cần đủ họ tên, email và SĐT.");
    setBusy(true);
    const r = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, type }),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setError(d.error || "Lỗi.");
    setCreated({ code: d.code, name });
  }

  if (created) {
    return (
      <Overlay onClose={() => { onDone(); }} title="Đã tạo học viên">
        <p className="text-sm text-slate-600">Học viên <b>{created.name}</b> đã được tạo. Mã đăng nhập:</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-center font-mono text-lg font-bold tracking-widest text-slate-800">{created.code}</code>
          <button onClick={() => navigator.clipboard?.writeText(created.code)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">Copy</button>
        </div>
        <p className="text-[11px] text-slate-400">Gửi mã này cùng email + SĐT cho học viên để đăng nhập. {type === "UNREGISTERED" ? "Dùng thử tối đa 3 ngày." : "Truy cập vĩnh viễn."}</p>
        <button onClick={onDone} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white">Xong</button>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose} title="Thêm học viên mới">
      <label className="block text-xs font-semibold text-slate-500">Họ tên
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
      <label className="block text-xs font-semibold text-slate-500">Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
      <label className="block text-xs font-semibold text-slate-500">Số điện thoại
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
      <label className="block text-xs font-semibold text-slate-500">Loại
        <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="UNREGISTERED">Chưa đăng ký (dùng thử 3 ngày)</option>
          <option value="OLD">Học viên cũ (vĩnh viễn)</option>
        </select>
      </label>
      {error && <p className="rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
      <div className="flex gap-2">
        <button onClick={save} disabled={busy} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Đang tạo…" : "Tạo học viên"}
        </button>
        <button onClick={onClose} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">Huỷ</button>
      </div>
    </Overlay>
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

function EnrollModal({ student, classes, onClose, onChanged }) {
  const [enrolls, setEnrolls] = useState(student.enrollments || []);
  const [classId, setClassId] = useState("");
  const [status, setStatus] = useState("STUDYING");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const enrolledIds = new Set(enrolls.map((e) => e.class?.id).filter(Boolean));
  const available = classes.filter((c) => !enrolledIds.has(c.id));
  const api = (method, body) =>
    fetch("/api/admin/enroll", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

  async function addClass() {
    setError("");
    if (!classId) return setError("Chọn lớp để ghi danh.");
    setBusy("add");
    const r = await api("POST", { studentId: student.id, classId, status });
    const d = await r.json();
    setBusy("");
    if (!r.ok) return setError(d.error || "Lỗi.");
    const cls = classes.find((c) => c.id === classId);
    setEnrolls((p) => [...p, { id: d.enrollment?.id || classId, class: cls, status }]);
    setClassId("");
    onChanged?.();
  }
  async function changeStatus(en, st) {
    setBusy(en.id + "st");
    await api("PATCH", { enrollmentId: en.id, status: st }).catch(() => {});
    setEnrolls((p) => p.map((x) => (x.id === en.id ? { ...x, status: st } : x)));
    setBusy("");
    onChanged?.();
  }
  async function removeEnroll(en) {
    setBusy(en.id + "rm");
    await api("DELETE", { enrollmentId: en.id }).catch(() => {});
    setEnrolls((p) => p.filter((x) => x.id !== en.id));
    setBusy("");
    onChanged?.();
  }

  return (
    <Overlay onClose={onClose} title={`Ghi danh: ${student.name}`}>
      {/* ----- Lớp đang ghi danh ----- */}
      <div>
        <p className="mb-1 text-xs font-bold text-slate-600">Lớp đang ghi danh</p>
        {enrolls.length === 0 ? (
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-400">Chưa ghi danh lớp nào.</p>
        ) : (
          <div className="space-y-1.5">
            {enrolls.map((en) => (
              <div key={en.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
                <span className="flex-1 truncate text-xs font-semibold text-slate-700">
                  {en.class?.name}{en.class?.branch?.name ? ` · ${en.class.branch.name}` : ""}
                </span>
                <select value={en.status} onChange={(e) => changeStatus(en, e.target.value)} disabled={busy === en.id + "st"}
                  className="rounded border border-slate-200 px-1.5 py-1 text-[11px]">
                  <option value="STUDYING">Đang học</option>
                  <option value="COMPLETED">Đã học</option>
                </select>
                <button onClick={() => removeEnroll(en)} disabled={busy === en.id + "rm"}
                  className="rounded bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-600 disabled:opacity-50">Gỡ</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----- Thêm / chuyển lớp ----- */}
      <div className="mt-3 border-t border-slate-100 pt-3">
        <p className="mb-1 text-xs font-bold text-slate-600">Thêm / chuyển lớp</p>
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="">— Chọn lớp —</option>
          {available.map((c) => (
            <option key={c.id} value={c.id}>{c.name}{c.branch?.name ? ` · ${c.branch.name}` : ""}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="STUDYING">Đang học</option>
          <option value="COMPLETED">Đã học</option>
        </select>
        {classes.length === 0 && <p className="mt-1 text-[11px] text-amber-600">Chưa có lớp nào. Tạo lớp ở mục Lớp học trước.</p>}
        {classes.length > 0 && available.length === 0 && <p className="mt-1 text-[11px] text-slate-400">Đã ghi danh tất cả lớp hiện có.</p>}
        {error && <p className="mt-1 rounded bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
        <button onClick={addClass} disabled={busy === "add" || !classId} className="mt-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
          {busy === "add" ? "Đang ghi danh…" : "Ghi danh lớp này"}
        </button>
      </div>

      <p className="mt-2 text-[11px] text-slate-400">Ghi danh mở full quyền vĩnh viễn. “Chuyển lớp” = ghi danh lớp mới rồi Gỡ lớp cũ.</p>
      <button onClick={onClose} className="mt-1 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">Đóng</button>
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
