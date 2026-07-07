"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import QuizRunner from "./QuizRunner";

export default function MockBrowser({ totalQuestions, mockCount, mockMinutes }) {
  const { lang, t } = useLang();
  const [running, setRunning] = useState(false);

  if (running) {
    return (
      <div>
        <div className="flex items-center gap-2 px-4 pt-3">
          <button onClick={() => setRunning(false)} className="text-sm font-medium text-slate-500 hover:text-slate-700">← {t("nav_mock")}</button>
        </div>
        <QuizRunner mode="MOCK" onClose={() => setRunning(false)} />
      </div>
    );
  }

  const sub =
    lang === "vi" ? "Phỏng vấn thật: số câu & thời gian giới hạn, nộp bài hệ thống chấm ngay."
      : lang === "ja" ? "本番形式：制限時間内に回答、提出後すぐ採点。"
        : "Real interview: fixed count & timer, auto-graded on submit.";

  const L = (vi, en, ja) => (lang === "vi" ? vi : lang === "ja" ? ja : en);

  const metrics = [
    { icon: "📝", value: mockCount, label: L("câu hỏi", "questions", "問題") },
    { icon: "⏱️", value: `${mockMinutes}′`, label: L("phút làm bài", "minutes", "制限時間") },
    { icon: "✅", value: L("Tự chấm", "Auto", "自動"), label: L("chấm điểm ngay", "instant grading", "即採点") },
    { icon: "🗂️", value: (totalQuestions || 0).toLocaleString("vi-VN"), label: L("ngân hàng câu hỏi", "in question bank", "問題バンク") },
  ];

  const steps = [
    { icon: "🎲", title: L("Đề ngẫu nhiên", "Randomized set", "ランダム出題"), desc: L(`${mockCount} câu lấy ngẫu nhiên từ ngân hàng đề.`, `${mockCount} questions drawn at random.`, `バンクから${mockCount}問を無作為抽出。`) },
    { icon: "⏳", title: L("Tính giờ nghiêm", "Strict timer", "厳格な計時"), desc: L(`Đồng hồ đếm ngược ${mockMinutes} phút như thi thật.`, `A ${mockMinutes}-minute countdown, like the real thing.`, `本番同様${mockMinutes}分のカウントダウン。`) },
    { icon: "📊", title: L("Chấm & giải thích", "Score + review", "採点と解説"), desc: L("Nộp bài là có điểm, đáp án và giải thích từng câu.", "Submit to get score, answers and per-question review.", "提出後に点数・解答・解説を表示。") },
  ];

  return (
    <div className="px-4 pb-10 pt-4 md:px-0">
      {/* ---- Hero ---- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-lg md:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-12 right-24 h-44 w-44 rounded-full bg-black/10 blur-2xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold backdrop-blur">
            🎯 {L("Thi thử có tính giờ", "Timed mock exam", "時間制限付き模擬試験")}
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">{t("nav_mock")}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">{sub}</p>
        </div>
      </div>

      {/* ---- Exam card ---- */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">
        <div className="grid gap-3 p-5 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-slate-50 p-4 text-center ring-1 ring-slate-100">
              <div className="text-2xl">{m.icon}</div>
              <div className="mt-1 text-xl font-black text-violet-700">{m.value}</div>
              <div className="mt-0.5 text-[11px] font-medium text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 px-5 py-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">{L("Cách thức", "How it works", "進め方")}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-3 rounded-2xl border border-slate-100 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg">{s.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">{s.title}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={() => setRunning(true)}
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 py-3.5 text-sm font-extrabold text-white shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]">
            {t("start_mock")} <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <p className="mt-3 text-center text-[11px] text-slate-400">
            {L("Cần đăng nhập để làm bài.", "Login required to take the exam.", "受験にはログインが必要。")}
          </p>
        </div>
      </div>
    </div>
  );
}
