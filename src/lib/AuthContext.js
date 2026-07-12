"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext({ student: null, loading: true, refresh: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      const d = await r.json();
      setStudent(d.student);
    } catch {
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setStudent(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Tự kiểm tra phiên định kỳ (60s) + khi quay lại tab:
  //  - HV dùng thử HẾT HẠN sẽ bị server trả null -> tự đăng xuất, không cần F5.
  //  - HV đã đăng ký giữ phiên (session 120 ngày) nên vẫn bình thường.
  useEffect(() => {
    const iv = setInterval(refresh, 60000);
    const onFocus = () => refresh();
    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(iv);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ student, loading, refresh, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
