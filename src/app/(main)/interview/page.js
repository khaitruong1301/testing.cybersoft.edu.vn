import { prisma } from "@/lib/prisma";
import InterviewBrowser from "@/components/InterviewBrowser";
import { getSettings, num } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Luyện phỏng vấn Tester / QA",
  description: "Ngân hàng câu hỏi phỏng vấn Tester/QA tự chấm: trắc nghiệm, tự luận và tình huống thực tế đi làm.",
  keywords: ["luyện phỏng vấn tester", "câu hỏi phỏng vấn QA", "phỏng vấn tester", "interview tester"],
  alternates: { canonical: "/interview" },
};

export default async function InterviewPage() {
  const categories = await prisma.category.findMany({
    where: { tab: "INTERVIEW" },
    orderBy: { order: "asc" },
    include: { _count: { select: { questions: true } } },
  });
  const plain = categories.map((c) => ({ id: c.id, title: c.title, icon: c.icon, count: c._count.questions }));
  const settings = await getSettings();
  const perSession = num(settings.interview_question_count, 30);
  return (
    <InterviewBrowser
      categories={plain}
      titleKey="nav_interview"
      subtitleKey="interview_subtitle"
      perSession={perSession}
    />
  );
}
