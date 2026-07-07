"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { loc } from "@/lib/i18n";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function QuizRunner({ categoryId = null, mode = "PRACTICE", onClose }) {
  const { lang, t } = useLang();
  const { student } = useAuth();
  const [state, setState] = useState("loading"); // loading | need_login | running | result
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [viewMode, setViewMode] = useState("scroll"); // scroll | single (câu trước/câu sau)
  const [cur, setCur] = useState(0); // câu hiện tại (chế độ single)
  const startedAt = useRef(Date.now());
  const timer = useRef(null);
  const L = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);

  async function start() {
    setState("loading");
    const r = await fetch("/api/practice/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, mode }),
    });
    if (r.status === 401) return setState("need_login");
    const d = await r.json();
    setQuestions(d.questions);
    setAnswers({});
    setResult(null);
    setCur(0);
    startedAt.current = Date.now();
    if (d.durationSec > 0) setTimeLeft(d.durationSec);
    setState("running");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state !== "running" || mode !== "MOCK") return;
    timer.current = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) { clearInterval(timer.current); submit(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  async function submit() {
    clearInterval(timer.current);
    setState("loading");
    const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
    const r = await fetch("/api/practice/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, categoryId, durationSec, answers }),
    });
    const d = await r.json();
    setResult(d);
    setState("result");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  if (state === "need_login") {
    return (
      <div className="p-6 text-center">
        <div className="text-4xl">🔒</div>
        <p className="mt-3 text-sm font-semibold text-slate-800">{t("need_login")}</p>
        <Link href="/login" className="mt-4 inline-block rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white">{t("nav_login")}</Link>
      </div>
    );
  }

  if (state === "loading") {
    return <div className="p-10 text-center text-sm font-semibold text-slate-500">…</div>;
  }

  // ============================ RESULT / REVIEW ============================
  if (state === "result") {
    const pct = result.maxScore ? Math.round((result.score / result.maxScore) * 100) : 0;
    const tone = pct >= 80 ? "emerald" : pct >= 50 ? "amber" : "rose";
    const toneMap = {
      emerald: { grad: "from-emerald-500 to-teal-600", ring: "text-emerald-500", emoji: "🎉", msg: L("Xuất sắc!", "Excellent!", "素晴らしい！") },
      amber: { grad: "from-amber-500 to-orange-600", ring: "text-amber-500", emoji: "💪", msg: L("Khá tốt, cố thêm nhé!", "Good — keep going!", "その調子！") },
      rose: { grad: "from-rose-500 to-red-600", ring: "text-rose-500", emoji: "📚", msg: L("Ôn lại phần giải thích bên dưới nhé.", "Review the explanations below.", "下の解説を復習しましょう。") },
    }[tone];
    const nCorrect = result.details.filter((d) => d.correct).length;

    return (
      <div className="px-4 pb-10 pt-4 md:px-0">
        {/* Score hero */}
        <div className={`overflow-hidden rounded-3xl bg-gradient-to-br ${toneMap.grad} p-6 text-center text-white shadow-lg`}>
          <div className="text-4xl">{toneMap.emoji}</div>
          <div className="mt-2 text-sm font-semibold text-white/80">{t("your_score")}</div>
          <div className="text-5xl font-black tracking-tight">{pct}%</div>
          <div className="mt-1 text-sm font-bold text-white/90">
            {result.score}/{result.maxScore} · {nCorrect}/{result.details.length} {L("câu đúng", "correct", "正解")}
          </div>
          <div className="mt-2 text-sm font-semibold text-white/90">{toneMap.msg}</div>
        </div>

        {/* Review header */}
        <h3 className="mt-6 mb-3 flex items-center gap-2 text-base font-extrabold text-slate-900">
          📝 {L("Xem lại & tự học", "Review & self-study", "復習と自習")}
        </h3>

        <div className="space-y-4">
          {result.details.map((d, idx) => {
            const explanation = d.explanation && loc(d.explanation, lang);
            return (
              <div key={d.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* header */}
                <div className={`flex items-center justify-between px-4 py-2.5 ${d.correct ? "bg-emerald-50" : "bg-rose-50"}`}>
                  <span className="text-xs font-extrabold text-slate-700">
                    {L("Câu", "Q", "問")} {idx + 1} · {d.kind}
                  </span>
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold text-white ${d.correct ? "bg-emerald-500" : "bg-rose-500"}`}>
                    {d.correct ? "✓ " + t("correct") : "✗ " + t("incorrect")}
                  </span>
                </div>

                <div className="p-4">
                  <p className="mb-3 font-bold leading-snug text-slate-900">{loc(d.prompt, lang)}</p>

                  {d.kind === "MCQ" ? (
                    <div className="space-y-2">
                      {(d.options || []).map((opt, oi) => {
                        const isCorrect = oi === d.correctIndex;
                        const isChosen = String(d.given) === String(oi);
                        let box = "border-slate-200 bg-white text-slate-700";
                        let badge = null;
                        if (isCorrect) {
                          box = "border-emerald-400 bg-emerald-50 text-emerald-900";
                          badge = <span className="ml-auto shrink-0 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">✓ {L("Đáp án đúng", "Correct", "正解")}</span>;
                        } else if (isChosen) {
                          box = "border-rose-400 bg-rose-50 text-rose-900";
                          badge = <span className="ml-auto shrink-0 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">✗ {L("Bạn chọn", "Your pick", "選択")}</span>;
                        }
                        const letterCls = isCorrect ? "bg-emerald-500 text-white" : isChosen ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-600";
                        return (
                          <div key={oi} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium ${box}`}>
                            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-extrabold ${letterCls}`}>{LETTERS[oi]}</span>
                            <span>{loc(opt, lang)}</span>
                            {badge}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">{L("Câu trả lời của bạn", "Your answer", "あなたの回答")}</div>
                        <p className="whitespace-pre-wrap text-sm text-slate-800">{d.given ? String(d.given) : <span className="italic text-slate-400">—</span>}</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{d.feedback}</p>
                    </div>
                  )}

                  {/* Explanation */}
                  {explanation && (
                    <div className="mt-3 rounded-xl border-l-4 border-brand-500 bg-brand-50 p-3.5">
                      <div className="mb-1 text-xs font-extrabold uppercase tracking-wide text-brand-700">💡 {L("Vì sao", "Why", "解説")}</div>
                      <p className="text-sm leading-relaxed text-slate-800">{explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 mt-5 flex gap-2 bg-gradient-to-t from-[#eef2fb] to-transparent pb-2 pt-3">
          <button onClick={start} className="flex-1 rounded-xl bg-brand-600 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-brand-700">
            🔄 {t("retry")}
          </button>
          {onClose && (
            <button onClick={onClose} className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              {L("Đóng", "Close", "閉じる")}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================ RUNNING ============================
  const isDone = (q) => q && answers[q.id] !== undefined && answers[q.id] !== "";
  const answered = questions.filter(isDone).length;
  const progress = questions.length ? Math.round((answered / questions.length) * 100) : 0;
  const remaining = questions.length - answered;
  const allAnswered = questions.length > 0 && remaining === 0;

  const QuestionCard = ({ q, idx }) => {
    const done = isDone(q);
    return (
      <div className={`rounded-2xl border bg-white p-4 shadow-sm transition ${done ? "border-brand-200" : "border-slate-200"}`}>
        <div className="mb-3 flex gap-3">
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${done ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"}`}>
            {idx + 1}
          </span>
          <p className="pt-0.5 font-bold leading-snug text-slate-900">{loc(q.prompt, lang)}</p>
        </div>
        {q.kind === "MCQ" ? (
          <div className="space-y-2 pl-10">
            {q.options.map((opt, oi) => {
              const sel = String(answers[q.id]) === String(oi);
              return (
                <label key={oi}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    sel ? "border-brand-500 bg-brand-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-800 hover:border-brand-300 hover:bg-brand-50/40"}`}>
                  <input type="radio" name={q.id} className="sr-only" checked={sel} onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))} />
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-extrabold ${sel ? "bg-white text-brand-700" : "bg-slate-100 text-slate-600"}`}>{LETTERS[oi]}</span>
                  <span>{loc(opt, lang)}</span>
                </label>
              );
            })}
          </div>
        ) : (
          <textarea
            rows={5}
            value={answers[q.id] || ""}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            placeholder={L("Nhập câu trả lời của bạn…", "Type your answer…", "回答を入力…")}
            className="ml-10 w-[calc(100%-2.5rem)] rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        )}
      </div>
    );
  };

  const curQ = questions[cur];

  return (
    <div className="px-4 pb-10 pt-2 md:px-0">
      {/* sticky header: progress + view-mode toggle */}
      <div className="glass-nav sticky top-[56px] z-10 -mx-4 mb-4 px-4 py-2.5 md:top-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-extrabold text-slate-800">{answered}<span className="text-slate-400">/{questions.length}</span> {L("câu", "answered", "問")}</span>
          <div className="flex items-center gap-2">
            {/* 2 chế độ hiển thị */}
            <div className="flex items-center gap-0.5 rounded-full bg-slate-200/70 p-0.5">
              {[["scroll", "☰", L("Cuộn", "Scroll", "スクロール")], ["single", "❯", L("Từng câu", "One by one", "1問ずつ")]].map(([k, ic, lbl]) => (
                <button key={k} onClick={() => setViewMode(k)}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition ${viewMode === k ? "bg-brand-600 text-white shadow" : "text-slate-600 hover:bg-white/60"}`}>
                  <span className="text-[11px]">{ic}</span><span className="hidden sm:inline">{lbl}</span>
                </button>
              ))}
            </div>
            {mode === "MOCK" && (
              <span className={`rounded-full px-3 py-1 text-sm font-extrabold ${timeLeft < 60 ? "bg-rose-500 text-white" : "bg-slate-800 text-white"}`}>
                ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {viewMode === "scroll" ? (
        /* ---- Chế độ CUỘN: tất cả câu ---- */
        <div className="space-y-4">
          {questions.map((q, idx) => <QuestionCard key={q.id} q={q} idx={idx} />)}
        </div>
      ) : (
        /* ---- Chế độ TỪNG CÂU: 1 câu + prev/next + bảng số câu ---- */
        <div>
          {/* bảng danh sách số câu (nhảy nhanh) */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const done = isDone(q);
              const active = idx === cur;
              return (
                <button key={q.id} onClick={() => setCur(idx)}
                  className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition ${
                    active ? "bg-brand-600 text-white ring-2 ring-brand-300" : done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {curQ && <QuestionCard q={curQ} idx={cur} />}

          {/* điều hướng câu trước / câu sau */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button onClick={() => setCur((c) => Math.max(0, c - 1))} disabled={cur === 0}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40">
              ← {L("Câu trước", "Prev", "前へ")}
            </button>
            <span className="text-xs font-bold text-slate-500">{cur + 1} / {questions.length}</span>
            {cur < questions.length - 1 ? (
              <button onClick={() => setCur((c) => Math.min(questions.length - 1, c + 1))}
                className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700">
                {L("Câu sau", "Next", "次へ")} →
              </button>
            ) : (
              <button onClick={submit} disabled={!allAnswered}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
                ✓ {t("submit_answers")}
              </button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={submit}
        disabled={!allAnswered}
        className="mt-5 w-full rounded-xl bg-brand-600 py-4 text-base font-extrabold text-white shadow-md transition hover:bg-brand-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-70"
      >
        {allAnswered ? `${t("submit_answers")} →` : L(`Còn ${remaining} câu chưa làm — làm hết để nộp`, `${remaining} question(s) left`, `残り${remaining}問`)}
      </button>
    </div>
  );
}
