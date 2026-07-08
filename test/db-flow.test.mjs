// Integration test bằng node:sqlite (SQLite thật) mô phỏng ĐÚNG các thao tác DB
// mà route thực hiện, dùng CHÍNH các helper trong lib/access.js.
// Kiểm: (A) user chưa đăng ký = đúng 7 ngày & hết hạn bị chặn; (B) ghi danh -> auto-promote;
// (C) lọc học viên theo lớp.
import { DatabaseSync } from "node:sqlite";
import assert from "node:assert/strict";
import { computeAccessExpires, hasAccess, enrollmentPromotion } from "../src/lib/access.js";

const DAY = 86400000;
const db = new DatabaseSync(":memory:");

// Lược đồ tối giản khớp schema Prisma (bool = INTEGER, ngày = TEXT ISO).
db.exec(`
CREATE TABLE Student (
  id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT,
  type TEXT DEFAULT 'OLD', registered INTEGER DEFAULT 0,
  firstLoginAt TEXT, accessExpires TEXT, active INTEGER DEFAULT 1, codeId TEXT
);
CREATE TABLE AccessCode (id TEXT PRIMARY KEY, code TEXT UNIQUE, email TEXT, phone TEXT, type TEXT, batch TEXT);
CREATE TABLE Branch (id TEXT PRIMARY KEY, name TEXT UNIQUE, createdAt TEXT);
CREATE TABLE Class (id TEXT PRIMARY KEY, name TEXT, code TEXT, branchId TEXT, createdAt TEXT);
CREATE TABLE Enrollment (
  id TEXT PRIMARY KEY, classId TEXT, studentId TEXT, status TEXT DEFAULT 'STUDYING',
  UNIQUE(classId, studentId)
);
`);

const iso = (d) => (d ? new Date(d).toISOString() : null);
let pass = 0;
const t = (name, fn) => { fn(); pass++; console.log("  ✓", name); };

console.log("Luồng DB (node:sqlite)");

// ---- (A) User CHƯA ĐĂNG KÝ: 7 ngày ----
const now = new Date("2026-07-08T00:00:00Z");
const settings = {}; // dùng mặc định (UNREGISTERED = 7)

// Mô phỏng đăng nhập lần đầu của user chưa đăng ký (như /api/auth/login).
const expires = computeAccessExpires("UNREGISTERED", settings, now);
db.prepare(
  `INSERT INTO Student (id,name,email,phone,type,registered,firstLoginAt,accessExpires,active)
   VALUES (?,?,?,?, 'UNREGISTERED', 0, ?, ?, 1)`
).run("s1", "Thử Nghiệm", "trial@x.com", "0900", iso(now), iso(expires));

t("A1: user chưa ĐK có accessExpires = đúng 7 ngày sau lần đăng nhập đầu", () => {
  const s = db.prepare("SELECT * FROM Student WHERE id='s1'").get();
  const diff = new Date(s.accessExpires).getTime() - new Date(s.firstLoginAt).getTime();
  assert.equal(diff, 7 * DAY);
});

t("A2: trong vòng 7 ngày -> còn quyền truy cập", () => {
  const s = db.prepare("SELECT * FROM Student WHERE id='s1'").get();
  const day3 = new Date(now.getTime() + 3 * DAY);
  assert.equal(hasAccess({ active: !!s.active, accessExpires: s.accessExpires }, day3), true);
});

t("A3: quá 7 ngày -> HẾT hạn, bị chặn (getCurrentStudent trả null)", () => {
  const s = db.prepare("SELECT * FROM Student WHERE id='s1'").get();
  const day8 = new Date(now.getTime() + 8 * DAY);
  assert.equal(hasAccess({ active: !!s.active, accessExpires: s.accessExpires }, day8), false);
});

// ---- (B) GHI DANH -> auto-promote thành học viên cũ + full quyền ----
db.prepare("INSERT INTO Branch (id,name,createdAt) VALUES ('b1','Q1',?)").run(iso(now));
db.prepare("INSERT INTO Class (id,name,code,branchId,createdAt) VALUES ('c1','Tester K21','T-K21','b1',?)").run(iso(now));

// Mô phỏng POST /api/admin/enroll: upsert enrollment + update student = enrollmentPromotion()
const promo = enrollmentPromotion();
db.prepare("INSERT INTO Enrollment (id,classId,studentId,status) VALUES ('e1','c1','s1','STUDYING')").run();
db.prepare("UPDATE Student SET type=?, registered=?, accessExpires=?, active=? WHERE id='s1'")
  .run(promo.type, promo.registered ? 1 : 0, promo.accessExpires, promo.active ? 1 : 0);

t("B1: sau ghi danh -> type=OLD, registered=1, accessExpires=NULL (vĩnh viễn)", () => {
  const s = db.prepare("SELECT * FROM Student WHERE id='s1'").get();
  assert.equal(s.type, "OLD");
  assert.equal(s.registered, 1);
  assert.equal(s.accessExpires, null);
});

t("B2: học viên cũ -> truy cập vĩnh viễn kể cả sau 1 năm", () => {
  const s = db.prepare("SELECT * FROM Student WHERE id='s1'").get();
  const oneYear = new Date(now.getTime() + 365 * DAY);
  assert.equal(hasAccess({ active: !!s.active, accessExpires: s.accessExpires }, oneYear), true);
});

t("B3: ghi danh lại cùng lớp không tạo trùng (UNIQUE classId+studentId)", () => {
  // upsert: cố insert lại phải bị chặn bởi UNIQUE -> mô phỏng ON CONFLICT update
  db.prepare(
    "INSERT INTO Enrollment (id,classId,studentId,status) VALUES ('e2','c1','s1','COMPLETED') " +
    "ON CONFLICT(classId,studentId) DO UPDATE SET status=excluded.status"
  ).run();
  const rows = db.prepare("SELECT * FROM Enrollment WHERE classId='c1' AND studentId='s1'").all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, "COMPLETED");
});

// ---- (C) Lọc học viên theo lớp (mô phỏng where enrollments some classId) ----
t("C1: lọc theo lớp c1 -> có học viên s1", () => {
  const rows = db.prepare(
    "SELECT DISTINCT s.* FROM Student s JOIN Enrollment e ON e.studentId=s.id WHERE e.classId='c1'"
  ).all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "s1");
});

t("C2: lọc theo lớp không tồn tại -> rỗng", () => {
  const rows = db.prepare(
    "SELECT DISTINCT s.* FROM Student s JOIN Enrollment e ON e.studentId=s.id WHERE e.classId='cX'"
  ).all();
  assert.equal(rows.length, 0);
});

console.log(`\n${pass} test PASS (luồng DB)`);
db.close();
