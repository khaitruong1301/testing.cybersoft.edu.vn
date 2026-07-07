import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { generateUniqueCodes } from "@/lib/codes";

export const runtime = "nodejs";

// Accepts multipart form: file (xlsx/csv with columns name,email,phone), type, batch.
// Generates a unique 6-char code per row, stores AccessCode records.
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  const type = (form.get("type") || "OLD").toString();
  const batch = (form.get("batch") || new Date().toISOString().slice(0, 10)).toString();

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "Chưa chọn file Excel." }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  let rows;
  try {
    const wb = XLSX.read(buf, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
  } catch {
    return NextResponse.json({ error: "Không đọc được file Excel." }, { status: 400 });
  }

  // Flexible header matching (name/tên, email, phone/sđt/điện thoại)
  const pick = (row, keys) => {
    for (const k of Object.keys(row)) {
      const kl = k.toLowerCase().trim();
      if (keys.some((x) => kl.includes(x))) return String(row[k]).trim();
    }
    return "";
  };

  const roster = rows
    .map((r) => ({
      name: pick(r, ["name", "tên", "ten", "họ", "ho"]),
      email: pick(r, ["email", "mail"]),
      phone: pick(r, ["phone", "sđt", "sdt", "điện", "dien", "phone number"]),
    }))
    .filter((r) => r.email || r.phone || r.name);

  if (roster.length === 0) {
    return NextResponse.json(
      { error: "File không có dữ liệu hợp lệ (cần cột: name, email, phone)." },
      { status: 400 }
    );
  }

  // Load existing codes to guarantee no collision.
  const existing = new Set((await prisma.accessCode.findMany({ select: { code: true } })).map((c) => c.code));
  const codes = generateUniqueCodes(roster.length, existing);

  const data = roster.map((r, i) => ({
    code: codes[i],
    name: r.name || "(chưa có tên)",
    email: r.email.toLowerCase(),
    phone: r.phone,
    type,
    batch,
  }));

  await prisma.accessCode.createMany({ data });

  return NextResponse.json({ ok: true, count: data.length, batch, sample: data.slice(0, 5) });
}
