"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";

const MAX_SENDS = 3;   // tối đa 3 lần bấm gửi mã (chống spam email), lưu ở máy học viên
const MAX_ATTEMPTS = 3; // tối đa 3 lần nhập mã

export default function LoginPage() {
  const { t, lang } = useLang();
  const { refresh, student } = useAuth();
  const router = useRouter();

  useEffect(() => { if (student) router.replace("/documents"); }, [student, router]);

  const [type, setType] = useState("OLD");
  const [form, setForm] = useState({ name: "", email: "", phone: "", code: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Luồng OTP
  const [codeSent, setCodeSent] = useState(false);
  const [sentMsg, setSentMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Chống robot (captcha cộng) cho học thử
  const [cap, setCap] = useState({ token: "", q: "", answer: "" });
  const hpRef = useRef(""); // honeypot
  const loadedAt = useRef(Date.now());

  const tt = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const loadCaptcha = () => {
    fetch("/api/auth/captcha", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setCap({ token: d.token, q: d.q, answer: "" }))
      .catch(() => {});
  };
  useEffect(() => { if (type === "UNREGISTERED") { loadCaptcha(); loadedAt.current = Date.now(); } }, [type]);

  function switchType(val) {
    setType(val); setError(""); setCodeSent(false); setSentMsg(""); setAttempts(0);
    setForm((f) => ({ ...f, code: "" }));
  }

  // Đếm số lần gửi mã ở máy học viên (localStorage) theo email — chống spam.
  const sendKey = (email) => "cst_sends_" + String(email || "").toLowerCase().trim();
  const getSends = (email) => { try { return Number(localStorage.getItem(sendKey(email)) || 0); } catch { return 0; } };
  const bumpSends = (email) => { try { localStorage.setItem(sendKey(email), String(getSends(email) + 1)); } catch {} };

  // ---- Học viên cũ: lần đầu gửi OTP, lần sau vào thẳng ----
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

  // ---- Học thử (chưa đăng ký): tự phục vụ, có chống robot + chống spam ----
  async function requestTrial() {
    setError("");
    if (!form.email || !form.phone) return setError(tt("Nhập email và số điện thoại trước.", "Enter email and phone first.", "先にメールと電話番号を入力してください。"));
    if (getSends(form.email) >= MAX_SENDS) return setError(tt(`Bạn đã yêu cầu mã ${MAX_SENDS} lần. Vui lòng kiểm tra hộp thư (cả mục spam) hoặc thử lại sau.`, `You requested a code ${MAX_SENDS} times. Please check your inbox/spam or try later.`, `コードを${MAX_SENDS}回リクエストしました。受信箱/迷惑メールを確認してください。`));
    if (!cap.answer) return setError(tt("Nhập kết quả phép tính để xác minh không phải robot.", "Enter the sum to verify you are human.", "計算の答えを入力してください。"));
    setSending(true);
    try {
      const r = await fetch("/api/auth/trial-request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, captchaToken: cap.token, captchaAnswer: cap.answer, hp: hpRef.current, elapsedMs: Date.now() - loadedAt.current }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || tt("Không gửi được mã.", "Could not send code.", "コードを送信できません。")); loadCaptcha(); }
      else { bumpSends(form.email); setCodeSent(true); setSentMsg(d.message || ""); setAttempts(0); }
    } catch { setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。")); }
    finally { setSending(false); }
  }

  // ---- Xác thực mã (dùng chung OLD + học thử) — tối đa 3 lần nhập ----
  async function verifyCode(e) {
    e.preventDefault();
    if (!codeSent) { type === "OLD" ? requestCode() : requestTrial(); return; }
    if (attempts >= MAX_ATTEMPTS) { setError(tt("Bạn đã nhập sai quá 3 lần. Vui lòng lấy mã mới.", "Too many wrong attempts. Please request a new code.", "誤入力が3回を超えました。新しいコードを取得してください。")); return; }
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/auth/verify-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email, phone: form.phone, code: form.code }) });
      const d = await r.json();
      if (!r.ok) {
        const n = attempts + 1; setAttempts(n);
        setError((d.error || tt("Mã không đúng.", "Wrong code.", "コードが違います。")) + ` (${n}/${MAX_ATTEMPTS})`);
      } else { await refresh(); router.push("/documents"); }
    } catch { setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。")); }
    finally { setLoading(false); }
  }

  const canResend = type === "OLD" || getSends(form.email) < MAX_SENDS;

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 md:py-14">
      <div className="glass-strong rounded-3xl p-6 md:p-8">
        <h1 className="text-xl font-extrabold text-slate-900">{t("login_title")}</h1>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/70 p-1.5">
          {[["OLD", t("login_old")], ["UNREGISTERED", t("login_new")]].map(([val, label]) => (
            <button key={val} onClick={() => switchType(val)}
              className={`rounded-xl py-2.5 text-sm font-bold transition ${type === val ? "bg-brand-600 text-white shadow-md" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={verifyCode} className="mt-5 space-y-3">
          {/* Học thử: có thêm ô Họ tên */}
          {type === "UNREGISTERED" && !codeSent && (
            <Field label={tt("Họ tên", "Full name", "氏名")} value={form.name} onChange={upd("name")} placeholder={tt("Nguyễn Văn A", "Your name", "氏名")} />
          )}
          <Field label={t("f_email")} type="email" value={form.email} onChange={upd("email")} placeholder="ban@email.com" disabled={codeSent} />
          <Field label={t("f_phone")} value={form.phone} onChange={upd("phone")} placeholder="09xxxxxxxx" disabled={codeSent} />

          {/* Honeypot ẩn (bẫy bot) */}
          <input tabIndex={-1} autoComplete="off" onChange={(e) => (hpRef.current = e.target.value)}
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

          {!codeSent ? (
            <>
              {type === "UNREGISTERED" && (
                <div className="rounded-2xl bg-slate-50 p-3">
                  <label className="mb-1 block text-xs font-semibold text-slate-500">
                    {tt("Xác minh không phải robot", "Verify you are human", "ロボットでないことを確認")}: <b>{cap.q || "…"}</b> = ?
                  </label>
                  <div className="flex gap-2">
                    <input value={cap.answer} onChange={(e) => setCap((c) => ({ ...c, answer: e.target.value }))} inputMode="numeric"
                      className="glass w-24 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300" placeholder="?" />
                    <button type="button" onClick={loadCaptcha} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">↻ {tt("Đổi", "New", "更新")}</button>
                  </div>
                </div>
              )}
              <div className="rounded-2xl bg-blue-50 p-3 text-xs text-blue-800">
                {type === "OLD"
                  ? tt("Nhấn “Đăng nhập”. Lần ĐẦU gửi mã 6 ký tự vào email (5 phút); các lần sau chỉ cần email + SĐT.", "Tap “Log in”. First time we email a 6-char code (5 min); after that just email + phone.", "「ログイン」を押してください。初回のみコードをメール送信。")
                  : tt("Học thử MIỄN PHÍ 3 ngày: nhập email + SĐT thật, nhấn nút để nhận mã qua email rồi đăng nhập. Mỗi email chỉ được học thử một lần.", "Free 3-day trial: enter a real email + phone, get a code by email, then log in. One trial per email.", "3日間の無料お試し：メールと電話番号を入力し、コードを受け取ってログイン。")}
              </div>
              <button type="button" onClick={type === "OLD" ? requestCode : requestTrial} disabled={sending}
                className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white disabled:opacity-60">
                {sending ? "…" : type === "OLD" ? t("submit") : tt("Nhận mã học thử", "Get trial code", "お試しコードを受け取る")}
              </button>
            </>
          ) : (
            <>
              {sentMsg && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">✓ {sentMsg}</p>}
              <Field label={t("f_code")} value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="AB2K7M" mono />
              <button type="submit" disabled={loading || attempts >= MAX_ATTEMPTS} className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white disabled:opacity-60">
                {loading ? "…" : t("submit")}
              </button>
              <div className="flex items-center justify-between text-[11px]">
                <button type="button" onClick={type === "OLD" ? requestCode : requestTrial} disabled={sending || !canResend}
                  className="font-semibold text-brand-600 disabled:opacity-40">
                  {sending ? "…" : canResend ? tt("Gửi lại mã", "Resend code", "コードを再送") : tt("Đã hết lượt gửi", "No sends left", "送信上限")}
                </button>
                <button type="button" onClick={() => { setCodeSent(false); setSentMsg(""); setError(""); setAttempts(0); if (type === "UNREGISTERED") loadCaptcha(); }} className="font-semibold text-slate-500">
                  {tt("Đổi email/SĐT", "Change email/phone", "メール/電話を変更")}
                </button>
              </div>
            </>
          )}

          <p className="rounded-2xl bg-amber-50 p-3 text-xs font-semibold text-amber-800">
            ⚠️ {tt("Tối đa 3 mã/ngày và tối đa 3 lần nhập mã. Vui lòng nhập cẩn thận.", "Max 3 codes/day and 3 entry attempts. Please enter carefully.", "1日最大3コード・入力3回まで。")}
          </p>
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
        </form>

        <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs text-amber-800">
          <div className="mb-1.5 font-semibold">
            {tt("Cần hỗ trợ tư vấn khóa học?", "Need course consultation?", "コース相談が必要ですか？")}
          </div>
          <div className="flex flex-col gap-1.5">
            <a href="https://facebook.com/lophocviet" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-semibold text-blue-600">
              💬 {tt("Inbox Fanpage", "Inbox Fanpage", "Fanpageへ")} →
            </a>
            <a href="https://zalo.me/0961051014" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-semibold text-blue-500">
              📞 Zalo: 096.105.1014 →
            </a>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-400">
          {lang === "vi" ? "Học viên cũ: truy cập vĩnh viễn · Chưa đăng ký: học thử 3 ngày."
            : lang === "ja" ? "既存受講生は無期限・未登録は3日間お試し。"
            : "Existing students: lifetime access · Unregistered: 3-day trial."}
        </p>
      </div>
    </div>
  );
}

function Field({ label, mono, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
      <input {...props} required
        className={`glass w-full rounded-xl px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-60 ${mono ? "font-mono tracking-widest uppercase" : ""}`} />
    </label>
  );
}
