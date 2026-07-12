import { prisma } from "@/lib/prisma";
import { onlineStats } from "@/lib/presence";
import AdminOverviewLive from "@/components/AdminOverviewLive";

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

  const on = onlineStats();
  const initial = {
    online: on.total, onlineStudents: on.students, onlineGuests: on.guests,
    students, codes, activeStudents, branches, classes, articles, questions, attempts, expired,
  };

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold text-slate-800">Tổng quan</h1>
      <p className="mb-6 text-sm text-slate-500">Số liệu hệ thống CyberSoft Tester · tự cập nhật realtime.</p>
      <AdminOverviewLive initial={initial} />

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
