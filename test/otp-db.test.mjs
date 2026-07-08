// Integration test bằng node:sqlite mô phỏng ĐÚNG thao tác của request-code/verify-code.
import { DatabaseSync } from "node:sqlite";
import assert from "node:assert/strict";
import { hashOtp, otpExpiry, startOfVnDay, MAX_CODES_PER_DAY } from "../src/lib/otp.js";

const db = new DatabaseSync(":memory:");
db.exec(`
CREATE TABLE Student (id TEXT PRIMARY KEY, email TEXT, phone TEXT, type TEXT, active INTEGER DEFAULT 1);
CREATE TABLE LoginCode (
  id TEXT PRIMARY KEY, studentId TEXT, codeHash TEXT, expiresAt TEXT, usedAt TEXT,
  attempts INTEGER DEFAULT 0, createdAt TEXT
);
`);
const iso = (d) => new Date(d).toISOString();
let pass = 0, seq = 0;
const t = (name, fn) => { fn(); pass++; console.log("  ✓", name); };
console.log("Luồng OTP (node:sqlite)");

db.prepare("INSERT INTO Student VALUES ('s1','a@x.com','0900','OLD',1)").run();

const insertCode = (code, createdAt, ttlMs = 5 * 60 * 1000) => {
  const now = new Date(createdAt);
  db.prepare("INSERT INTO LoginCode (id,studentId,codeHash,expiresAt,usedAt,attempts,createdAt) VALUES (?,?,?,?,NULL,0,?)")
    .run("lc" + ++seq, "s1", hashOtp(code), iso(new Date(now.getTime() + ttlMs)), iso(now));
};

// đếm mã đã gửi hôm nay (mô phỏng giới hạn 3/ngày)
const sentToday = () =>
  db.prepare("SELECT COUNT(*) c FROM LoginCode WHERE studentId='s1' AND createdAt >= ?").get(iso(startOfVnDay())).c;

t("giới hạn 3 mã/ngày: gửi mã 1-2-3 OK, mã thứ 4 bị chặn", () => {
  const now = Date.parse("2026-07-08T03:00:00Z"); // ~10h VN
  for (let i = 0; i < 3; i++) {
    assert.ok(sentToday() < MAX_CODES_PER_DAY, `lần ${i + 1} phải còn quota`);
    insertCode("CODE0" + i, now + i * 1000);
  }
  assert.equal(sentToday(), 3);
  assert.ok(!(sentToday() < MAX_CODES_PER_DAY), "mã thứ 4 phải bị chặn");
});

// verify: khớp mã còn hạn, chưa dùng (mô phỏng câu query của verify-code)
const findValid = (code, now) =>
  db.prepare("SELECT * FROM LoginCode WHERE studentId='s1' AND usedAt IS NULL AND expiresAt > ? AND codeHash = ? ORDER BY createdAt DESC")
    .get(iso(now), hashOtp(code));

t("verify: mã đúng còn hạn -> tìm thấy, đánh dấu đã dùng, dùng lại -> không thấy", () => {
  const now = new Date("2026-07-08T03:00:30Z"); // trong 5 phút
  const rec = findValid("CODE00", now);
  assert.ok(rec, "phải tìm thấy mã hợp lệ");
  db.prepare("UPDATE LoginCode SET usedAt=? WHERE id=?").run(iso(now), rec.id);
  assert.equal(findValid("CODE00", now), undefined, "dùng lại phải thất bại");
});

t("verify: mã sai -> không tìm thấy", () => {
  const now = new Date("2026-07-08T03:00:30Z");
  assert.equal(findValid("ZZZZZZ", now), undefined);
});

t("verify: mã hết hạn (sau 5 phút) -> không tìm thấy", () => {
  insertCode("EXPIRE", "2026-07-08T03:10:00Z");
  const now = new Date("2026-07-08T03:16:00Z"); // 6 phút sau -> hết hạn
  assert.equal(findValid("EXPIRE", now), undefined);
  // nhưng trong vòng 5 phút thì thấy
  assert.ok(findValid("EXPIRE", new Date("2026-07-08T03:12:00Z")));
});

console.log(`\n${pass} test PASS (luồng OTP)`);
db.close();
