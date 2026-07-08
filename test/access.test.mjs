// Unit test cho lib/access.js — quy tắc cửa sổ truy cập & auto-promote.
import assert from "node:assert/strict";
import {
  accessDaysForType,
  computeAccessExpires,
  hasAccess,
  enrollmentPromotion,
} from "../src/lib/access.js";

let pass = 0;
const t = (name, fn) => { fn(); pass++; console.log("  ✓", name); };

const DAY = 86400000;
const now = new Date("2026-07-08T00:00:00Z");

console.log("lib/access.js");

t("UNREGISTERED mặc định = 7 ngày", () => {
  assert.equal(accessDaysForType("UNREGISTERED", {}), 7);
});
t("OLD mặc định = 0 (vĩnh viễn)", () => {
  assert.equal(accessDaysForType("OLD", {}), 0);
});
t("computeAccessExpires: UNREGISTERED = now + đúng 7 ngày", () => {
  const exp = computeAccessExpires("UNREGISTERED", {}, now);
  assert.ok(exp instanceof Date);
  assert.equal(exp.getTime() - now.getTime(), 7 * DAY);
});
t("computeAccessExpires: OLD = null (vĩnh viễn)", () => {
  assert.equal(computeAccessExpires("OLD", {}, now), null);
});
t("computeAccessExpires tôn trọng settings tuỳ chỉnh (UNREGISTERED=3)", () => {
  const exp = computeAccessExpires("UNREGISTERED", { access_days_unregistered: "3" }, now);
  assert.equal(exp.getTime() - now.getTime(), 3 * DAY);
});
t("hasAccess: còn hạn (tương lai) -> true", () => {
  assert.equal(hasAccess({ active: true, accessExpires: new Date(now.getTime() + DAY) }, now), true);
});
t("hasAccess: hết hạn (quá khứ) -> false", () => {
  assert.equal(hasAccess({ active: true, accessExpires: new Date(now.getTime() - DAY) }, now), false);
});
t("hasAccess: accessExpires null (vĩnh viễn) -> true", () => {
  assert.equal(hasAccess({ active: true, accessExpires: null }, now), true);
});
t("hasAccess: bị khoá -> false", () => {
  assert.equal(hasAccess({ active: false, accessExpires: null }, now), false);
});
t("enrollmentPromotion: OLD + đăng ký + vĩnh viễn + mở khoá", () => {
  assert.deepEqual(enrollmentPromotion(), {
    type: "OLD",
    registered: true,
    accessExpires: null,
    active: true,
  });
});

console.log(`\n${pass} test PASS (lib/access.js)`);
