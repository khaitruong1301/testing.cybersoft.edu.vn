"use client";
import { useEffect, useState } from "react";

// Thẻ số liệu Tổng quan — tự cập nhật (poll /api/admin/stats mỗi 5s), gồm "Đang online".
export default function AdminOverviewLive({ initial }) {
  const [s, setS] = useState(initial);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch("/api/admin/stats", { cache: "no-store" });
        if (!r.ok) return;
        const d = await r.json();
        if (alive) setS(d);
      } catch {}
    };
    load();
    const iv = setInterval(load, 5000);
    return () => { alive = false; clearInterval(iv); };
  }, []);

  const cards = [
    ["Đang online", s.online ?? 0, "🟢", true, `HV: ${s.onlineStudents ?? 0} · khách: ${s.onlineGuests ?? 0}`],
    ["Học viên", s.students, "👥"],
    ["Đang hoạt động", s.activeStudents, "✅"],
    ["Hết hạn truy cập", s.expired, "⏰"],
    ["Chi nhánh", s.branches, "🏢"],
    ["Lớp học", s.classes, "🏫"],
    ["Mã đã sinh", s.codes, "🔑"],
    ["Bài tài liệu", s.articles, "📚"],
    ["Câu hỏi", s.questions, "🎤"],
    ["Lượt luyện/mock", s.attempts, "🎯"],
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map(([label, n, icon, live, sub]) => (
        <div key={label} className={`rounded-2xl p-4 shadow-sm ${live ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div className="text-2xl">{icon}</div>
            {live && <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" /></span>}
          </div>
          <div className={`mt-2 text-2xl font-extrabold ${live ? "text-emerald-700" : "text-slate-800"}`}>{(n ?? 0).toLocaleString("vi-VN")}</div>
          <div className="text-xs text-slate-500">{label}</div>
          {sub && <div className="mt-0.5 text-[11px] font-semibold text-emerald-600/80">{sub}</div>}
        </div>
      ))}
    </div>
  );
}
