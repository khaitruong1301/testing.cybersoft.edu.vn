import { prisma } from "@/lib/prisma";
import InterviewBrowser from "@/components/InterviewBrowser";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Luyện thi ISTQB — Foundation, Advanced, Expert",
  description: "Ngân hàng câu hỏi luyện thi chứng chỉ ISTQB theo 3 cấp độ, hệ thống tự chấm và giải thích chi tiết.",
  keywords: ["luyện thi ISTQB", "ISTQB foundation", "chứng chỉ ISTQB", "ISTQB tiếng Việt", "thi ISTQB"],
  alternates: { canonical: "/istqb" },
};

export default async function IstqbPage() {
  const categories = await prisma.category.findMany({
    where: { tab: "ISTQB" },
    orderBy: { order: "asc" },
    include: { _count: { select: { questions: true } } },
  });
  const plain = categories.map((c) => ({ id: c.id, title: c.title, icon: c.icon, count: c._count.questions }));
  return (
    <InterviewBrowser
      categories={plain}
      titleKey="istqb_title"
      accent="amber"
      subtitleKey="istqb_subtitle"
    />
  );
}
