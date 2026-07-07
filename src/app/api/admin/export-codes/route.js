import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";

export const runtime = "nodejs";

// GET /api/admin/export-codes?batch=... -> xlsx download of the generated codes.
export async function GET(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const batch = searchParams.get("batch");

  const codes = await prisma.accessCode.findMany({
    where: batch ? { batch } : {},
    orderBy: { createdAt: "desc" },
  });

  const aoa = codes.map((c) => ({
    "Tên / Name": c.name,
    Email: c.email,
    "Phone": c.phone,
    "Loại / Type": c.type === "OLD" ? "Học viên cũ" : "Chưa đăng ký",
    "Mã / Code": c.code,
    Batch: c.batch || "",
  }));

  const ws = XLSX.utils.json_to_sheet(aoa);
  ws["!cols"] = [{ wch: 24 }, { wch: 26 }, { wch: 14 }, { wch: 16 }, { wch: 12 }, { wch: 14 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "AccessCodes");
  const out = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const fname = `cybersoft-codes-${batch || "all"}.xlsx`;
  return new NextResponse(out, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fname}"`,
    },
  });
}
