import crypto from "crypto";

// Unambiguous alphabet: no 0/O, 1/I/L to avoid confusion when typing.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const LEN = 6;

export function randomCode() {
  let out = "";
  const bytes = crypto.randomBytes(LEN);
  for (let i = 0; i < LEN; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

/**
 * Generate `count` unique codes, avoiding any in `existing` (a Set).
 * Returns an array of new unique codes.
 */
export function generateUniqueCodes(count, existing = new Set()) {
  const result = [];
  const seen = new Set(existing);
  let guard = 0;
  while (result.length < count && guard < count * 50) {
    const c = randomCode();
    guard++;
    if (seen.has(c)) continue;
    seen.add(c);
    result.push(c);
  }
  if (result.length < count) {
    throw new Error("Could not generate enough unique codes; try again.");
  }
  return result;
}
