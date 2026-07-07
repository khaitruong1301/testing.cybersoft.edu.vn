"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const ProgressContext = createContext({
  read: new Set(),
  bookmarks: {},
  loading: true,
  isRead: () => false,
  isBookmarked: () => false,
  noteOf: () => "",
  markRead: () => {},
  toggleBookmark: async () => {},
  saveNote: async () => {},
  removeBookmark: async () => {},
  refresh: () => {},
});

export function ProgressProvider({ children }) {
  const { student } = useAuth();
  const [read, setRead] = useState(new Set());
  const [bookmarks, setBookmarks] = useState({}); // { articleId: { note, updatedAt } }
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!student) {
      setRead(new Set());
      setBookmarks({});
      setLoading(false);
      return;
    }
    try {
      const r = await fetch("/api/me/library", { cache: "no-store" });
      const d = await r.json();
      setRead(new Set(d.read || []));
      const bm = {};
      (d.bookmarks || []).forEach((b) => (bm[b.articleId] = { note: b.note || "", updatedAt: b.updatedAt }));
      setBookmarks(bm);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [student]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Tự làm mới dữ liệu lưu/đọc khi quay lại tab (đỡ phải F5)
  useEffect(() => {
    const onFocus = () => refresh();
    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const isRead = useCallback((id) => read.has(id), [read]);
  const isBookmarked = useCallback((id) => Object.prototype.hasOwnProperty.call(bookmarks, id), [bookmarks]);
  const noteOf = useCallback((id) => bookmarks[id]?.note || "", [bookmarks]);

  const markRead = useCallback((id) => {
    setRead((prev) => {
      if (prev.has(id)) return prev;
      const n = new Set(prev);
      n.add(id);
      return n;
    });
  }, []);

  const toggleBookmark = useCallback(async (id) => {
    const currentlyOn = Object.prototype.hasOwnProperty.call(bookmarks, id);
    if (currentlyOn) {
      setBookmarks((p) => {
        const n = { ...p };
        delete n[id];
        return n;
      });
      await fetch(`/api/bookmarks/${id}`, { method: "DELETE" }).catch(() => {});
    } else {
      setBookmarks((p) => ({ ...p, [id]: { note: "", updatedAt: new Date().toISOString() } }));
      await fetch(`/api/bookmarks/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: "" }),
      }).catch(() => {});
    }
  }, [bookmarks]);

  const saveNote = useCallback(async (id, note) => {
    setBookmarks((p) => ({ ...p, [id]: { note, updatedAt: new Date().toISOString() } }));
    await fetch(`/api/bookmarks/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    }).catch(() => {});
  }, []);

  const removeBookmark = useCallback(async (id) => {
    setBookmarks((p) => {
      const n = { ...p };
      delete n[id];
      return n;
    });
    await fetch(`/api/bookmarks/${id}`, { method: "DELETE" }).catch(() => {});
  }, []);

  return (
    <ProgressContext.Provider
      value={{ read, bookmarks, loading, isRead, isBookmarked, noteOf, markRead, toggleBookmark, saveNote, removeBookmark, refresh }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
