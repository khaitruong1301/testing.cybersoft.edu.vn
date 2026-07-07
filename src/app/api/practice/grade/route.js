import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/session";

// POST { mode, categoryId, durationSec, answers: {questionId: value} }
// MCQ: exact index match. ESSAY/SCENARIO: keyword coverage auto-grading.
export async function POST(req) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "need_login" }, { status: 401 });

  const { mode = "PRACTICE", categoryId = null, durationSec = 0, answers = {} } = await req.json();
  const ids = Object.keys(answers);
  const questions = await prisma.interviewQuestion.findMany({ where: { id: { in: ids } } });

  let score = 0;
  const maxScore = questions.length;
  const details = [];

  for (const q of questions) {
    const given = answers[q.id];
    let correct = false;
    let feedback = "";

    if (q.kind === "MCQ") {
      correct = String(given) === String(q.answer);
      if (correct) score += 1;
      feedback = correct ? "Đúng" : `Đáp án đúng: #${Number(q.answer) + 1}`;
    } else {
      // keyword-based grading
      let keywords = [];
      try {
        keywords = JSON.parse(q.answer || "[]");
      } catch {}
      const text = String(given || "").toLowerCase();
      const hit = keywords.filter((k) => text.includes(String(k).toLowerCase()));
      const ratio = keywords.length ? hit.length / keywords.length : 0;
      score += ratio;
      correct = ratio >= 0.5;
      feedback =
        keywords.length > 0
          ? `Khớp ${hit.length}/${keywords.length} từ khoá: ${keywords.join(", ")}`
          : "Đã ghi nhận câu trả lời.";
    }
    let explanation = "{}";
    try {
      explanation = JSON.parse(q.explanation || "{}");
    } catch {}
    let prompt = {};
    try { prompt = JSON.parse(q.prompt || "{}"); } catch {}
    let options = [];
    try { options = JSON.parse(q.options || "[]"); } catch {}
    details.push({
      id: q.id,
      kind: q.kind,
      correct,
      feedback,
      explanation,
      answer: q.answer,            // MCQ: correct index (string); ESSAY: keywords JSON
      correctIndex: q.kind === "MCQ" ? Number(q.answer) : null,
      prompt,
      options,
      given,                       // câu trả lời của học viên
    });
  }

  const rounded = Math.round(score * 100) / 100;
  await prisma.attempt.create({
    data: {
      studentId: student.id,
      mode,
      categoryId,
      durationSec,
      score: rounded,
      maxScore,
      payload: JSON.stringify({ answers }),
    },
  });

  return NextResponse.json({ score: rounded, maxScore, details });
}
