import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [students, codes, activeStudents, branches, classes, articles, questions, attempts] = await Promise.all([
    prisma.student.count(),
    prisma.accessCode.count(),
    prisma.student.count({ where: { active: true } }),
    prisma.branch.count(),
    prisma.class.count(),
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
    ["Chi nhánh", branches, "🏢"],
    ["Lớp học", classes, "🏫"],
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
          <li>Vào <b>Chi nhánh</b>: tạo danh sách chi nhánh CyberSoft.</li>
          <li>Vào <b>Lớp học</b>: tạo lớp (tên, mã, lịch, chi nhánh) → mở chi tiết lớp để <b>ghi danh</b> hoặc <b>import Excel</b> học viên vào lớp. Ghi danh sẽ tự chuyển học viên thành “học viên cũ” (đủ quyền vĩnh viễn).</li>
          <li>Vào <b>Học viên</b>: tìm/lọc theo lớp, sửa email/phone, gia hạn, khoá/mở. User chưa đăng ký chỉ dùng thử 7 ngày.</li>
          <li>Vào <b>Sinh mã (Excel)</b>: cấp mã dùng thử/độc lập không gắn lớp (nếu cần).</li>
          <li>Vào <b>Cấu hình</b>: đổi mốc thời gian truy cập & số câu luyện/mock.</li>
        </ol>
      </div>
    </div>
  );
}
