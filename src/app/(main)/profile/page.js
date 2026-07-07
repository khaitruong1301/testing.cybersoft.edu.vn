import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";
import LockedPrompt from "@/components/LockedPrompt";
import ProfileView from "@/components/ProfileView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hồ sơ học tập — CyberSoft Tester", robots: { index: false } };

export default async function ProfilePage() {
  const student = await getCurrentStudent();
  if (!student) return <LockedPrompt />;

  let bookmarks = [];
  try {
    bookmarks = await prisma.bookmark.findMany({
      where: { studentId: student.id },
      orderBy: { updatedAt: "desc" },
      include: { article: { include: { category: true } } },
    });
  } catch {
    bookmarks = [];
  }

  const views = await prisma.articleView.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: "desc" },
    take: 24,
    include: { article: { include: { category: true } } },
  });

  const totalRead = await prisma.articleView.count({ where: { studentId: student.id } });

  const mapArt = (a) => a && {
    id: a.id,
    title: a.title,
    summary: a.summary,
    cover: a.cover,
    category: a.category ? a.category.title : null,
  };

  return (
    <ProfileView
      student={{ name: student.name, email: student.email, type: student.type, accessExpires: student.accessExpires }}
      stats={{ read: totalRead, saved: bookmarks.length }}
      bookmarks={bookmarks.filter((b) => b.article).map((b) => ({ ...mapArt(b.article), note: b.note, updatedAt: b.updatedAt }))}
      reading={views.filter((v) => v.article).map((v) => ({ ...mapArt(v.article), at: v.createdAt }))}
    />
  );
}
