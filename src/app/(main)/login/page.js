"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const { t, lang } = useLang();
  const { refresh, student } = useAuth();
  const router = useRouter();

  // Already logged in -> go straight to materials.
  useEffect(() => {
    if (student) router.replace("/documents");
  }, [student, router]);

  const [type, setType] = useState("OLD");
  const [form, setForm] = useState({ email: "", phone: "", code: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Luồng OTP cho học viên cũ
  const [codeSent, setCodeSent] = useState(false);
  const [sentMsg, setSentMsg] = useState("");
  const [sending, setSending] = useState(false);

  // Song ngữ cho các chuỗi mới của luồng OTP.
  const tt = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);

  function switchType(val) {
    setType(val);
    setError("");
    setCodeSent(false);
    setSentMsg("");
  }

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // --- Học viên cũ: gửi mã qua email ---
  async function requestCode() {
    setError("");
    if (!form.email || !form.phone) {
      setError(tt("Nhập email và số điện thoại trước.", "Enter email and phone first.", "先にメールと電話番号を入力してください。"));
      return;
    }
    setSending(true);
    try {
      const r = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, phone: form.phone }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || tt("Không gửi được mã.", "Could not send code.", "コードを送信できません。"));
      else if (d.loggedIn) {
        // Học viên đã đăng nhập trước đó -> vào thẳng, không cần mã.
        await refresh();
        router.push("/documents");
      } else {
        setCodeSent(true);
        setSentMsg(d.message || "");
      }
    } catch {
      setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。"));
    } finally {
      setSending(false);
    }
  }

  // --- Học viên cũ: xác thực mã OTP ---
  async function verifyCode(e) {
    e.preventDefault();
    if (!codeSent) {
      requestCode();
      return;
    }
    setError("");
    setLoading(true);
    try {
      const r = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, phone: form.phone, code: form.code }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || tt("Đăng nhập thất bại.", "Login failed.", "ログインに失敗しました。"));
      else {
        await refresh();
        router.push("/documents");
      }
    } catch {
      setError(tt("Có lỗi xảy ra.", "Something went wrong.", "エラーが発生しました。"));
    } finally {
      setLoading(false);
    }
  }

  // --- Chưa đăng ký: đăng nhập bằng mã admin cấp (giữ nguyên) ---
  async function submitUnregistered(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "UNREGISTERED" }),
      });
      const d = await r.json();
      if (!r.ok) setError(d.error || "Đăng nhập thất bại.");
      else {
        await refresh();
        router.push("/documents");
      }
    } catch {
      setError("Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 md:py-14">
      <div className="glass-strong rounded-3xl p-6 md:p-8">
        <h1 className="text-xl font-extrabold text-slate-900">{t("login_title")}</h1>

        {/* type toggle */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/70 p-1.5">
          {[
            ["OLD", t("login_old")],
            ["UNREGISTERED", t("login_new")],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => switchType(val)}
              className={`rounded-xl py-2.5 text-sm font-bold transition ${
                type === val
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {type === "OLD" ? (
          // ---------- Học viên cũ: OTP qua email ----------
          <form onSubmit={verifyCode} className="mt-5 space-y-3">
            <Field label={t("f_email")} type="email" value={form.email} onChange={upd("email")} placeholder="ban@email.com" disabled={codeSent} />
            <Field label={t("f_phone")} value={form.phone} onChange={upd("phone")} placeholder="09xxxxxxxx" disabled={codeSent} />

            {!codeSent ? (
              <>
                <div className="rounded-2xl bg-blue-50 p-3 text-xs text-blue-800">
                  {tt(
                    "Nhấn “Đăng nhập”. Lần ĐẦU sẽ gửi mã xác nhận 6 ký tự vào email (hiệu lực 5 phút); các lần sau chỉ cần email + SĐT là vào thẳng.",
                    "Tap “Log in”. The FIRST time we email you a 6-character code (valid 5 min); after that, email + phone logs you straight in.",
                    "「ログイン」を押してください。初回のみ6文字の確認コードをメール送信（5分間有効）。以降はメールと電話番号だけでログインできます。"
                  )}
                </div>
                <button
                  type="button"
                  onClick={requestCode}
                  disabled={sending}
                  className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  {sending ? "…" : t("submit")}
                </button>
              </>
            ) : (
              <>
                {sentMsg && (
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">✓ {sentMsg}</p>
                )}
                <Field
                  label={t("f_code")}
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="AB2K7M"
                  mono
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  {loading ? "…" : t("submit")}
                </button>
                <div className="flex items-center justify-between text-[11px]">
                  <button type="button" onClick={requestCode} disabled={sending} className="font-semibold text-brand-600 disabled:opacity-60">
                    {sending ? "…" : tt("Gửi lại mã", "Resend code", "コードを再送")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCodeSent(false);
                      setSentMsg("");
                      setError("");
                    }}
                    className="font-semibold text-slate-500"
                  >
                    {tt("Đổi email/SĐT", "Change email/phone", "メール/電話を変更")}
                  </button>
                </div>
              </>
            )}

            <p className="rounded-2xl bg-amber-50 p-3 text-xs font-semibold text-amber-800">
              ⚠️{" "}
              {tt(
                "Chỉ gửi tối đa 3 mã/ngày, vui lòng nhập cẩn thận.",
                "Only up to 3 codes per day — please enter carefully.",
                "1日あたり最大3コードまで。慎重に入力してください。"
              )}
            </p>

            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}
          </form>
        ) : (
          // ---------- Chưa đăng ký: mã admin cấp (giữ nguyên) ----------
          <form onSubmit={submitUnregistered} className="mt-5 space-y-3">
            <Field label={t("f_email")} type="email" value={form.email} onChange={upd("email")} placeholder="ban@email.com" />
            <Field label={t("f_phone")} value={form.phone} onChange={upd("phone")} placeholder="09xxxxxxxx" />
            <Field
              label={t("f_code")}
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
              placeholder="AB2K7M"
              mono
            />

            <div className="rounded-2xl bg-amber-50 p-3 text-xs text-amber-800">
              <div className="mb-1.5 font-semibold">{t("get_code")}</div>
              <div className="flex flex-col gap-1.5">
                <a href="https://facebook.com/lophocviet" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-semibold text-blue-600">
                  💬 {t("fanpage")} →
                </a>
                <a href="https://zalo.me/0961051014" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-semibold text-blue-500">
                  📞 {t("zalo")}: 096.105.1014 →
                </a>
              </div>
            </div>

            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">{error}</p>}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white disabled:opacity-60">
              {loading ? "…" : t("submit")}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-[11px] text-slate-400">
          {lang === "vi"
            ? "Học viên cũ: truy cập vĩnh viễn · Chưa đăng ký: dùng thử 3 ngày (admin có thể đổi)."
            : lang === "ja"
            ? "既存受講生は無期限・未登録は3日間お試し（管理者が変更可）。"
            : "Existing students: lifetime access · Unregistered: 3-day trial (admin configurable)."}
        </p>
      </div>
    </div>
  );
}

function Field({ label, mono, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
      <input
        {...props}
        required
        className={`glass w-full rounded-xl px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-60 ${
          mono ? "font-mono tracking-widest uppercase" : ""
        }`}
      />
    </label>
  );
}
