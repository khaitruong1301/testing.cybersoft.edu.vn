import { AuthProvider } from "@/lib/AuthContext";
import { ProgressProvider } from "@/lib/ProgressContext";
import AppShell from "@/components/AppShell";

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <ProgressProvider>
        <AppShell>{children}</AppShell>
      </ProgressProvider>
    </AuthProvider>
  );
}
