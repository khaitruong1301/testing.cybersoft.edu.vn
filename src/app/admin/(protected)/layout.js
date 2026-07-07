import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/session";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell adminName={admin.email}>{children}</AdminShell>;
}
