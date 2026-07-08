import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { generateUniqueCodes } from "@/lib/codes";
import { enrollmentPromotion } from "@/lib/access";

export const runtime = "nodejs";

// Import danh sách học viên (Excel: name, email, phone) TRỰC TIẾP vào một lớp.
// Mỗi dòng: tạo/nhận Student + sinh mã đăng nhập (nếu mới) + ghi danh vào lớp.
// Ghi danh -> tự chuyển học viên sang OLD + full quyền vĩnh viễn (enrollmentPromotion()).
// multipart form: file, classId, status? ("STUDYING" | "COMPLETED")
export async function POST(req) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  const classId = (form.get("classId") || "").toString();
  const status = ["STUDYING", "COMPLETED"].includes(form.get("status")) ? form.get("status").toString() : "STUDYING";

  if (!classId) return NextResponse.json({ error: "Chưa chọn lớp." }, { status: 400 });
  const klass = await prisma.class.findUnique({ where: { id: classId } });
  if (!klass) return NextResponse.json({ error: "Không tìm thấy lớp." }, { status: 404 });

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "Chưa chọn file Excel." }, { status: 400 });
  }

  // Đọc Excel (khớp cột linh hoạt: name/tên, email, phone/sđt).
  let rows;
  try {
    const wb = XLSX.read(Buffer.from(await file.arrayBuffer()), { type: "buffer" });
    rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
  } catch {
    return NextResponse.json({ error: "Không đọc được file Excel." }, { status: 400 });
  }
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
      email: pick(r, ["email", "mail"]).toLowerCase(),
      phone: pick(r, ["phone", "sđt", "sdt", "điện", "dien", "phone number"]),
    }))
    .filter((r) => r.email || r.phone);
  if (roster.length === 0) {
    return NextResponse.json({ error: "File không có dữ liệu hợp lệ (cần cột: name, email, phone)." }, { status: 400 });
  }

  const batch = (klass.code || klass.name || "").toString().slice(0, 60);
  const norm = (p) => String(p || "").replace(/\s/g, "");
  const keyOf = (email, phone) => `${email}|${norm(phone)}`;

  // Map học viên đã tồn tại theo email+phone.
  const emails = [...new Set(roster.map((r) => r.email).filter(Boolean))];
  const existing = await prisma.student.findMany({ where: { email: { in: emails } } });
  const map = new Map(existing.map((s) => [keyOf(s.email.toLowerCase(), s.phone), s]));

  // Sinh sẵn mã cho các học viên MỚI (không trùng mã hiện có).
  const existingCodes = new Set((await prisma.accessCode.findMany({ select: { code: true } })).map((c) => c.code));
  const newCount = roster.filter((r) => !map.has(keyOf(r.email, r.phone))).length;
  const freshCodes = generateUniqueCodes(newCount, existingCodes);
  let ci = 0;

  const sample = [];
  let created = 0;
  let enrolled = 0;
  const seenInFile = new Set();

  for (const r of roster) {
    const key = keyOf(r.email, r.phone);
    if (seenInFile.has(key)) continue; // bỏ dòng trùng trong cùng file
    seenInFile.add(key);

    let student = map.get(key);
    let code = null;

    if (!student) {
      // Tạo học viên MỚI: học viên cũ (OLD) + full quyền + kèm mã đăng nhập.
      const newCode = freshCodes[ci++];
      const ac = await prisma.accessCode.create({
        data: {
          code: newCode,
          name: r.name || "(chưa có tên)",
          email: r.email,
          phone: r.phone,
          type: "OLD",
          batch,
        },
      });
      student = await prisma.student.create({
        data: {
          name: r.name || "(chưa có tên)",
          email: r.email,
          phone: r.phone,
          codeId: ac.id,
          ...enrollmentPromotion(),
        },
      });
      map.set(key, student);
      created++;
      code = newCode;
    } else {
      // Học viên đã có: đảm bảo OLD + full quyền.
      student = await prisma.student.update({ where: { id: student.id }, data: enrollmentPromotion() });
      map.set(key, student);
      const ac = student.codeId ? await prisma.accessCode.findUnique({ where: { id: student.codeId } }) : null;
      code = ac?.code || null;
    }

    await prisma.enrollment.upsert({
      where: { classId_studentId: { classId, studentId: student.id } },
      update: { status },
      create: { classId, studentId: student.id, status },
    });
    enrolled++;
    if (sample.length < 8) sample.push({ name: student.name, email: student.email, code: code || "(đã có mã)" });
  }

  return NextResponse.json({
    ok: true,
    className: klass.name,
    enrolled,
    created,
    reused: enrolled - created,
    batch,
    sample,
  });
}
