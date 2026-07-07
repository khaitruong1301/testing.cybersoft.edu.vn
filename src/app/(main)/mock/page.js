import { prisma } from "@/lib/prisma";
import { getSettings, num } from "@/lib/settings";
import MockBrowser from "@/components/MockBrowser";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mock Interview Tester / QA",
  description: "Mô phỏng phỏng vấn QA thật có tính giờ và tự chấm điểm, giúp bạn tự tin trước khi đi phỏng vấn.",
  keywords: ["mock interview tester", "phỏng vấn thử QA", "luyện phỏng vấn tester", "mock interview QA"],
  alternates: { canonical: "/mock" },
};

export default async function MockPage() {
  const [total, settings] = await Promise.all([
    prisma.interviewQuestion.count(),
    getSettings(),
  ]);
  return (
    <MockBrowser
      totalQuestions={total}
      mockCount={num(settings.mock_question_count, 40)}
      mockMinutes={num(settings.mock_duration_min, 45)}
    />
  );
}
