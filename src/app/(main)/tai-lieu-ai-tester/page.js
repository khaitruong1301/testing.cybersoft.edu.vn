import { getCurrentStudent } from "@/lib/session";
import { hasGrant, listBooks } from "@/lib/ebookAiTester";
import EbookShelf from "@/components/EbookShelf";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tài liệu chuẩn bị trước khoá AI Tester",
  description: "8 ebook trực quan 3D giúp tester nền manual chuẩn bị trước khoá AI Agent Testing của CyberSoft: terminal, Git, web, API, đọc code test, Playwright, AI agent, CI.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/tai-lieu-ai-tester" },
};

export default async function Page() {
  const student = await getCurrentStudent();
  const granted = student ? await hasGrant(student) : false;
  const state = !student ? "guest" : granted ? "granted" : "pending";
  return <EbookShelf books={listBooks()} state={state} email={student?.email || ""} />;
}
