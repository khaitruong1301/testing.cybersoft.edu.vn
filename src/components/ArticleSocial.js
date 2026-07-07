"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { useAuth } from "@/lib/AuthContext";
import { useProgress } from "@/lib/ProgressContext";
import { timeAgo } from "@/lib/format";

// daily.dev-style action bar (upvote/downvote/comment/bookmark/share) + comments.
export default function ArticleSocial({ id, social = { up: 0, down: 0, myVote: 0 } }) {
  const { lang } = useLang();
  const { student } = useAuth();
  const { isBookmarked, toggleBookmark } = useProgress();
  const L = (vi, en, ja) => (lang === "ja" ? ja : lang === "en" ? en : vi);

  const [up, setUp] = useState(social.up || 0);
  const [down, setDown] = useState(social.down || 0);
  const [myVote, setMyVote] = useState(social.myVote || 0);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [shared, setShared] = useState(false);
  const saved = isBookmarked(id);

  useEffect(() => {
    fetch(`/api/articles/${id}/comments`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => {});
  }, [id]);

  const vote = async (v) => {
    if (!student) return;
    const next = myVote === v ? 0 : v;
    setMyVote(next); // optimistic
    try {
      const r = await fetch(`/api/articles/${id}/vote`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ value: v }),
      });
      const d = await r.json();
      if (d.ok) { setUp(d.up); setDown(d.down); setMyVote(d.myVote); }
    } catch {}
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ url });
      else { await navigator.clipboard.writeText(url); setShared(true); setTimeout(() => setShared(false), 1600); }
    } catch {}
  };

  const postComment = async () => {
    const text = body.trim();
    if (!text || !student) return;
    setPosting(true);
    try {
      const r = await fetch(`/api/articles/${id}/comments`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: text }),
      });
      const d = await r.json();
      if (d.comment) { setComments((c) => [d.comment, ...c]); setBody(""); }
    } catch {}
    finally { setPosting(false); }
  };

  const Btn = ({ onClick, active, activeCls = "text-brand-600", children, title }) => (
    <button onClick={onClick} title={title} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-bold transition hover:bg-slate-100 ${active ? activeCls : "text-slate-500"}`}>
      {children}
    </button>
  );

  return (
    <div className="mt-8">
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
        <Btn onClick={() => vote(1)} active={myVote === 1} activeCls="text-emerald-600" title={L("Hữu ích", "Upvote", "役立つ")}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={myVote === 1 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l7 8h-4v6H9v-6H5z" /></svg>
          {up}
        </Btn>
        <Btn onClick={() => vote(-1)} active={myVote === -1} activeCls="text-rose-500" title={L("Không hữu ích", "Downvote", "役立たない")}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={myVote === -1 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l-7-8h4V5h6v6h4z" /></svg>
          {down > 0 ? down : ""}
        </Btn>
        <a href="#comments" className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-bold text-slate-500 transition hover:bg-slate-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a3 3 0 0 1 3-3h11a4 4 0 0 1 4 4z" /></svg>
          {comments.length}
        </a>
        <div className="ml-auto flex items-center gap-1">
          {student && (
            <Btn onClick={() => toggleBookmark(id)} active={saved} activeCls="text-amber-500" title={L("Lưu bài", "Bookmark", "保存")}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>
            </Btn>
          )}
          <Btn onClick={share} active={shared} activeCls="text-brand-600" title={L("Chia sẻ link", "Share link", "共有")}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8h16v-8" /><path d="M12 3v13" /><path d="M8 7l4-4 4 4" /></svg>
            {shared ? L("Đã chép!", "Copied!", "コピー") : ""}
          </Btn>
        </div>
      </div>

      {/* Comments */}
      <div id="comments" className="mt-6 scroll-mt-20">
        <h3 className="mb-3 text-base font-extrabold text-slate-900">
          💬 {L("Bình luận", "Comments", "コメント")} <span className="text-slate-400">({comments.length})</span>
        </h3>

        {student ? (
          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <textarea
              value={body} onChange={(e) => setBody(e.target.value)} rows={3}
              placeholder={L("Chia sẻ suy nghĩ của bạn…", "Share your thoughts…", "コメントを入力…")}
              className="w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <div className="mt-2 flex justify-end">
              <button onClick={postComment} disabled={posting || !body.trim()} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
                {L("Đăng bình luận", "Post", "投稿")}
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-center text-sm text-slate-600">
            {L("Bạn có thể đọc mọi bình luận. ", "You can read all comments. ", "コメントは誰でも閲覧できます。")}
            <Link href="/login" className="font-bold text-brand-600 hover:underline">{L("Đăng nhập để bình luận", "Log in to comment", "ログインしてコメント")}</Link>
          </div>
        )}

        {comments.length === 0 ? (
          <p className="rounded-2xl bg-white/60 p-5 text-center text-sm text-slate-500">{L("Chưa có bình luận nào. Hãy là người đầu tiên!", "No comments yet. Be the first!", "まだコメントはありません。")}</p>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <div className="mb-1 flex items-center gap-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {(c.authorName || "?").trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{c.authorName}</span>
                  <span className="text-xs text-slate-400">· {timeAgo(c.createdAt, lang)}</span>
                </div>
                <p className="whitespace-pre-wrap pl-9 text-sm leading-relaxed text-slate-800">{c.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
