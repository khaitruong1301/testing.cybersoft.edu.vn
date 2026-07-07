import { prisma } from "@/lib/prisma";
import DocumentsBrowser from "@/components/DocumentsBrowser";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "CV Tester vượt ATS — mẫu & hướng dẫn",
  description: "Mẫu CV Tester/QA và hướng dẫn viết CV vượt bộ lọc ATS, gây ấn tượng với nhà tuyển dụng IT.",
  keywords: ["CV tester", "CV QA", "CV vượt ATS", "mẫu CV tester", "xin việc tester"],
  alternates: { canonical: "/cv" },
};

export default async function CvPage() {
  const categories = await prisma.category.findMany({
    where: { tab: "CV" },
    orderBy: { order: "asc" },
    include: { articles: { where: { published: true }, orderBy: { order: "asc" } } },
  });

  const plain = categories.map((c) => ({
    id: c.id, title: c.title, description: c.description, icon: c.icon,
    articles: c.articles.map((a) => ({
      id: a.id, title: a.title, summary: a.summary, cover: a.cover,
      viewCount: a.viewCount, readCount: a.readCount,
    })),
  }));

  return <DocumentsBrowser categories={plain} heading="📄" />;
}
