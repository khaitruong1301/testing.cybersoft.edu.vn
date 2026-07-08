// Unit test cho lib/otp.js
import assert from "node:assert/strict";
import {
  generateOtp,
  hashOtp,
  otpExpiry,
  startOfVnDay,
  isOtpValid,
  OTP_TTL_MS,
  MAX_ATTEMPTS,
} from "../src/lib/otp.js";

let pass = 0;
const t = (name, fn) => { fn(); pass++; console.log("  ✓", name); };
console.log("lib/otp.js");

t("generateOtp: 6 ký tự, không chứa ký tự dễ nhầm (0,1,I,L,O)", () => {
  for (let i = 0; i < 50; i++) {
    const c = generateOtp();
    assert.match(c, /^[A-HJ-NP-Z2-9]{6}$/); // đúng bộ ALPHABET, đủ 6 ký tự
  }
});
t("hashOtp: ổn định + không phân biệt hoa thường/khoảng trắng", () => {
  assert.equal(hashOtp("ab2k7m"), hashOtp("  AB2K7M "));
  assert.notEqual(hashOtp("ABC123"), hashOtp("ABC124"));
  assert.equal(hashOtp("X").length, 64); // sha256 hex
});
t("otpExpiry = now + 5 phút", () => {
  const now = new Date("2026-07-08T10:00:00Z");
  assert.equal(otpExpiry(now).getTime() - now.getTime(), OTP_TTL_MS);
  assert.equal(OTP_TTL_MS, 5 * 60 * 1000);
});
t("startOfVnDay: <= now và trong vòng 24h", () => {
  const now = new Date();
  const s = startOfVnDay(now);
  assert.ok(s.getTime() <= now.getTime());
  assert.ok(now.getTime() - s.getTime() < 24 * 3600000);
});
t("isOtpValid: mã đúng, còn hạn, chưa dùng -> true", () => {
  const now = new Date();
  const rec = { usedAt: null, attempts: 0, expiresAt: new Date(now.getTime() + 60000), codeHash: hashOtp("ABC123") };
  assert.equal(isOtpValid(rec, "abc123", now), true);
});
t("isOtpValid: đã dùng -> false", () => {
  const now = new Date();
  const rec = { usedAt: now, attempts: 0, expiresAt: new Date(now.getTime() + 60000), codeHash: hashOtp("ABC123") };
  assert.equal(isOtpValid(rec, "ABC123", now), false);
});
t("isOtpValid: hết hạn -> false", () => {
  const now = new Date();
  const rec = { usedAt: null, attempts: 0, expiresAt: new Date(now.getTime() - 1000), codeHash: hashOtp("ABC123") };
  assert.equal(isOtpValid(rec, "ABC123", now), false);
});
t("isOtpValid: sai mã -> false", () => {
  const now = new Date();
  const rec = { usedAt: null, attempts: 0, expiresAt: new Date(now.getTime() + 60000), codeHash: hashOtp("ABC123") };
  assert.equal(isOtpValid(rec, "WRONG9", now), false);
});
t("isOtpValid: quá số lần thử -> false", () => {
  const now = new Date();
  const rec = { usedAt: null, attempts: MAX_ATTEMPTS, expiresAt: new Date(now.getTime() + 60000), codeHash: hashOtp("ABC123") };
  assert.equal(isOtpValid(rec, "ABC123", now), false);
});

console.log(`\n${pass} test PASS (lib/otp.js)`);
