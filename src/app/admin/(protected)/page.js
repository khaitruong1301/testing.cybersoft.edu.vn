import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [students, codes, activeStudents, articles, questions, attempts] = await Promise.all([
    prisma.student.count(),
    prisma.accessCode.count(),
    prisma.student.count({ where: { active: true } }),
    prisma.article.count(),
    prisma.interviewQuestion.count(),
    prisma.attempt.count(),
  ]);

  const now = new Date();
  const expired = await prisma.student.count({ where: { accessExpires: { lt: now } } });

  const cards = [
    ["Học viên", students, "👥"],
    ["Đang hoạt động", activeStudents, "✅"],
    ["Hết hạn truy cập", expired, "⏰"],
    ["Mã đã sinh", codes, "🔑"],
    ["Bài tài liệu", articles, "📚"],
    ["Câu hỏi", questions, "🎤"],
    ["Lượt luyện/mock", attempts, "🎯"],
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Tổng quan</h1>
      <p className="mb-6 text-sm text-slate-500">Số liệu hệ thống CyberSoft Tester.</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map(([label, n, icon]) => (
          <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-2xl">{icon}</div>
            <div className="mt-2 text-2xl font-extrabold text-slate-800">{n.toLocaleString()}</div>
            <div className="text-xs text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-2 font-bold text-slate-700">Bắt đầu nhanh</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-600">
          <li>Vào <b>Sinh mã (Excel)</b>: tải lên danh sách (tên, email, phone) → tải file mã về gửi học viên.</li>
          <li>Vào <b>Học viên</b>: theo dõi thời hạn, gia hạn, đổi trạng thái đăng ký, khoá/mở.</li>
          <li>Vào <b>Cấu hình</b>: đổi mốc thời gian truy cập & số câu luyện/mock.</li>
        </ol>
      </div>
    </div>
  );
}
