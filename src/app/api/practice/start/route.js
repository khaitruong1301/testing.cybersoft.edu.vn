import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";
import { getSettings, num } from "@/lib/settings";

// POST { categoryId, mode: "PRACTICE"|"MOCK" } -> a randomized question set (no answers exposed).
export async function POST(req) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });

  const { categoryId, mode = "PRACTICE" } = await req.json();
  const settings = await getSettings();

  function sample(arr, n) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }

  const where = categoryId ? { categoryId } : { category: { tab: "INTERVIEW" } };
  const all = await prisma.interviewQuestion.findMany({ where });

  // Biết danh mục thuộc tab nào (ISTQB có ngân hàng lớn → bốc ngẫu nhiên mỗi lần luyện).
  const category = categoryId
    ? await prisma.category.findUnique({ where: { id: categoryId }, select: { tab: true } })
    : null;

  let picked;
  let durationSec = 0;
  if (mode === "MOCK") {
    picked = sample(all, num(settings.mock_question_count, 40));
    durationSec = num(settings.mock_duration_min, 45) * 60;
  } else if (categoryId && category?.tab === "ISTQB") {
    // LUYỆN THI ISTQB: mỗi lần bốc NGẪU NHIÊN một đề con từ ngân hàng của level.
    picked = sample(all.filter((q) => q.kind === "MCQ"), num(settings.istqb_question_count, 40));
  } else if (categoryId) {
    // PRACTICE trong 1 danh mục khác: LÀM HẾT toàn bộ câu (MCQ trước, tự luận sau).
    const mcq = all.filter((q) => q.kind === "MCQ");
    const essay = all.filter((q) => q.kind !== "MCQ");
    picked = [...mcq, ...essay];
  } else {
    // PRACTICE tổng hợp (không chọn danh mục): lấy mẫu theo cấu hình.
    const mcq = sample(all.filter((q) => q.kind === "MCQ"), num(settings.quiz_mcq_count, 30));
    const essay = sample(all.filter((q) => q.kind !== "MCQ"), num(settings.quiz_essay_count, 5));
    picked = [...mcq, ...essay];
  }

  // Strip answers before sending to client.
  const questions = picked.map((q) => ({
    id: q.id,
    kind: q.kind,
    prompt: q.prompt,
    options: q.kind === "MCQ" ? JSON.parse(q.options || "[]") : [],
  }));

  return NextResponse.json({ questions, durationSec, mode });
}
