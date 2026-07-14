"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";

const MAX_SENDS = 3;
const MAX_ATTEMPTS = 3;

export default function LoginPage() {
  const { t, lang } = useLang();
  const { refresh, student } = useAuth();
  const router = useRouter();

  useEffect(() => { if (student) router.replace("/documents"); }, [student, router]);

  const [type, setType] = useState("OLD");
  const [form, setForm] = useState({ name: "", email: "", phone: "", code: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [sentMsg, setSentMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cap, setCap] = useState({ token: "", q: "", answer: "" });
  const hpRef = useRef("");
  const loadedAt = useRef(Date.now());

  const tt = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const loadCaptcha = () => {
    fetch("/api/auth/captcha", { cache: "no-store" }).then((r) => r.json())
      .then((d) => setCap({ token: d.token, q: d.q, answer: "" })).catch(() => {});
  };
  useEffect(() => { if (type === "UNREGISTERED") { loadCaptcha(); loadedAt.current = Date.now(); } }, [type]);

  function switchType(val) { setType(val); setError(""); setCodeSent(false); setSentMsg(""); setAttempts(0); setForm((f) => ({ ...f, code: "" })); }

  const sendKey = (email) => "cst_sends_" + String(email || "").toLowerCase().trim();
  const getSends = (email) => { try { return Number(localStorage.getItem(sendKey(email)) || 0); } catch { return 0; } };
  const bumpSends = (email) => { try { localStorage.setItem(sendKey(email), String(getSends(email) + 1)); } catch {} };

  async function requestCode() {
    setError("");
    if (!form.email || !form.phone) return setError(tt("Nhập email và số điện thoại trước.", "Enter email and phone first.", "先にメールと電話番号を入力してください。"));
    setSending(true);
    try {
      const r = await fetch("/api/auth/request-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email, phone: form.phone }) });
      const d = await r.json();
      if (!r.ok) setError(d.error || tt("Không gửi được mã.", "Could not send code.", "コードを送信できません。"));
      else if (d.loggedIn) { await refresh(); router.push("/documents"); }
      else { setCodeSent(true); setSentMsg(d.message || ""); setAttempts(0); }
    } catch { setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。")); }
    finally { setSending(false); }
  }

  async function requestTrial() {
    setError("");
    if (!form.email || !form.phone) return setError(tt("Nhập email và số điện thoại trước.", "Enter email and phone first.", "先にメールと電話番号を入力してください。"));
    if (getSends(form.email) >= MAX_SENDS) return setError(tt(`Đã yêu cầu mã ${MAX_SENDS} lần. Kiểm tra hộp thư (cả spam) hoặc thử lại sau.`, `Requested ${MAX_SENDS} times. Check inbox/spam or try later.`, `${MAX_SENDS}回リクエスト済み。受信箱/迷惑メールを確認。`));
    if (!cap.answer) return setError(tt("Nhập kết quả phép tính để xác minh.", "Enter the sum to verify.", "計算の答えを入力してください。"));
    setSending(true);
    try {
      const r = await fetch("/api/auth/trial-request", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, captchaToken: cap.token, captchaAnswer: cap.answer, hp: hpRef.current, elapsedMs: Date.now() - loadedAt.current }) });
      const d = await r.json();
      if (!r.ok) { setError(d.error || tt("Không gửi được mã.", "Could not send code.", "コードを送信できません。")); loadCaptcha(); }
      else { bumpSends(form.email); setCodeSent(true); setSentMsg(d.message || ""); setAttempts(0); }
    } catch { setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。")); }
    finally { setSending(false); }
  }

  async function verifyCode(e) {
    e.preventDefault();
    if (!codeSent) { type === "OLD" ? requestCode() : requestTrial(); return; }
    if (attempts >= MAX_ATTEMPTS) { setError(tt("Nhập sai quá 3 lần. Vui lòng lấy mã mới.", "Too many wrong attempts. Request a new code.", "誤入力が3回超。新コードを取得。")); return; }
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/auth/verify-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email, phone: form.phone, code: form.code }) });
      const d = await r.json();
      if (!r.ok) { const n = attempts + 1; setAttempts(n); setError((d.error || tt("Mã không đúng.", "Wrong code.", "コードが違います。")) + ` (${n}/${MAX_ATTEMPTS})`); }
      else { await refresh(); router.push("/documents"); }
    } catch { setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。")); }
    finally { setLoading(false); }
  }

  const canResend = type === "OLD" || getSends(form.email) < MAX_SENDS;
  const isTrial = type === "UNREGISTERED";

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col px-4 py-4">
      <div className="glass-strong rounded-2xl p-5">
        <h1 className="text-lg font-extrabold text-slate-900">{t("login_title")}</h1>

        <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-200/70 p-1">
          {[["OLD", t("login_old")], ["UNREGISTERED", t("login_new")]].map(([val, label]) => (
            <button key={val} onClick={() => switchType(val)}
              className={`rounded-lg py-2 text-[13px] font-bold transition ${type === val ? "bg-brand-600 text-white shadow" : "bg-white text-slate-700 ring-1 ring-slate-200"}`}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={verifyCode} className="mt-3 space-y-2">
          {isTrial && !codeSent && (
            <Field value={form.name} onChange={upd("name")} placeholder={tt("Họ tên", "Full name", "氏名")} />
          )}
          <Field type="email" value={form.email} onChange={upd("email")} placeholder="Email" disabled={codeSent} />
          <Field value={form.phone} onChange={upd("phone")} placeholder={tt("Số điện thoại", "Phone", "電話番号")} disabled={codeSent} />

          <input tabIndex={-1} autoComplete="off" onChange={(e) => (hpRef.current = e.target.value)}
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

          {!codeSent ? (
            <>
              {isTrial && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2">
                  <span className="text-xs font-semibold text-slate-500">{tt("Bạn là người?", "Human?", "人間ですか？")} <b>{cap.q || "…"}</b> =</span>
                  <input value={cap.answer} onChange={(e) => setCap((c) => ({ ...c, answer: e.target.value }))} inputMode="numeric"
                    className="glass w-14 rounded-lg px-2 py-1.5 text-center text-sm outline-none focus:ring-2 focus:ring-brand-300" placeholder="?" />
                  <button type="button" onClick={loadCaptcha} className="ml-auto text-xs font-semibold text-slate-400">↻</button>
                </div>
              )}
              <button type="button" onClick={isTrial ? requestTrial : requestCode} disabled={sending}
                className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white disabled:opacity-60">
                {sending ? "…" : isTrial ? tt("Nhận mã truy cập", "Get access code", "アクセスコードを受け取る") : t("submit")}
              </button>
              <p className="text-center text-[11px] leading-snug text-slate-400">
                {isTrial
                  ? tt("Truy cập MIỄN PHÍ vĩnh viễn — mã xác minh gửi qua email. Xác minh 1 lần, lần sau vào thẳng bằng email + SĐT.", "Free lifetime access — a verification code is emailed. Verify once, then sign in with email + phone.", "無料・無期限アクセス。確認コードをメールで送信。1回確認後はメールと電話番号でログイン。")
                  : tt("Lần đầu gửi mã qua email; các lần sau vào thẳng.", "First time emailed a code; after that log in directly.", "初回のみメール送信。")}
              </p>
            </>
          ) : (
            <>
              {sentMsg && <p className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700">✓ {sentMsg}</p>}
              <Field value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder={tt("Nhập mã 6 ký tự", "6-char code", "6桁コード")} mono />
              <button type="submit" disabled={loading || attempts >= MAX_ATTEMPTS} className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white disabled:opacity-60">
                {loading ? "…" : t("submit")}
              </button>
              <div className="flex items-center justify-between text-[11px]">
                <button type="button" onClick={isTrial ? requestTrial : requestCode} disabled={sending || !canResend} className="font-semibold text-brand-600 disabled:opacity-40">
                  {canResend ? tt("Gửi lại mã", "Resend", "再送") : tt("Hết lượt gửi", "No sends left", "上限")}
                </button>
                <button type="button" onClick={() => { setCodeSent(false); setSentMsg(""); setError(""); setAttempts(0); if (isTrial) loadCaptcha(); }} className="font-semibold text-slate-500">
                  {tt("Đổi email/SĐT", "Change", "変更")}
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400">{tt("Tối đa 3 mã/ngày · 3 lần nhập", "Max 3 codes/day · 3 tries", "1日3コード・3回")}</p>
            </>
          )}

          {error && <p className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-semibold text-rose-600">{error}</p>}
        </form>

        <div className="mt-3 flex items-center justify-center gap-2 border-t border-slate-200/70 pt-3 text-[11px]">
          <span className="text-slate-400">{tt("Cần tư vấn khóa học?", "Need consultation?", "コース相談？")}</span>
          <a href="https://facebook.com/lophocviet" target="_blank" rel="noreferrer" className="font-bold text-blue-600">💬 Fanpage</a>
          <a href="https://zalo.me/0961051014" target="_blank" rel="noreferrer" className="font-bold text-blue-500">📞 Zalo</a>
        </div>
      </div>
    </div>
  );
}

function Field({ mono, ...props }) {
  return (
    <input {...props} required
      className={`glass w-full rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-300 disabled:opacity-60 ${mono ? "text-center font-mono text-base tracking-[0.3em] uppercase" : ""}`} />
  );
}
