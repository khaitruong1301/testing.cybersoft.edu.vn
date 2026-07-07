#!/usr/bin/env node
// -*- coding: utf-8 -*-
/**
 * validate-content.mjs — Kiểm tra nhanh sau mỗi lần Edit/Write.
 *
 * Chạy như hook PostToolUse (matcher Write|Edit): đọc payload JSON qua stdin,
 * lấy đường dẫn file vừa sửa và:
 *   - `prisma/schema.prisma`     -> `npx prisma validate` (schema hợp lệ chưa)
 *   - `prisma/*.mjs` (nội dung)  -> `node --check` (cú pháp JS module)
 *   - file khác                  -> bỏ qua, thoát 0 im lặng
 *
 * Có lỗi -> in ra stderr, thoát 2 để Claude thấy và sửa.
 * Lỗi nội bộ của hook -> thoát 0 (không gây phiền luồng làm việc).
 *
 * Dùng thủ công:  node .claude/hooks/validate-content.mjs --file prisma/schema.prisma
 */
import { execFileSync } from "node:child_process";
import { basename, resolve, join } from "node:path";
import { existsSync, readFileSync } from "node:fs";

const PROJ = process.env.CLAUDE_PROJECT_DIR || process.cwd();

// Đường dẫn prisma binary CỤC BỘ (không dùng npx để tránh tải mạng / báo lỗi giả).
function localPrisma() {
  const bin = process.platform === "win32" ? "prisma.cmd" : "prisma";
  const p = join(PROJ, "node_modules", ".bin", bin);
  return existsSync(p) ? p : null;
}

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function getFilePath() {
  // Chế độ thủ công: --file <path>
  const i = process.argv.indexOf("--file");
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  // Chế độ hook: đọc payload JSON từ stdin
  const raw = readStdin().trim();
  if (!raw) return "";
  try {
    const payload = JSON.parse(raw);
    return payload?.tool_input?.file_path || "";
  } catch {
    return "";
  }
}

function fail(msg) {
  process.stderr.write(msg + "\n");
  process.exit(2);
}

function main() {
  const fp = getFilePath();
  if (!fp) process.exit(0);

  const name = basename(fp);
  const abs = resolve(PROJ, fp);

  // --- schema.prisma: validate schema (chỉ khi prisma đã cài cục bộ) ---
  if (name === "schema.prisma") {
    const prisma = localPrisma();
    if (!prisma) process.exit(0); // chưa `npm install` → bỏ qua, không báo lỗi giả
    try {
      execFileSync(prisma, ["validate", "--schema", abs], {
        cwd: PROJ,
        stdio: ["ignore", "ignore", "pipe"],
      });
    } catch (e) {
      const out = (e.stderr || e.stdout || "").toString().trim();
      fail("⚠ prisma/schema.prisma KHÔNG hợp lệ:\n" + (out || String(e)));
    }
    process.exit(0);
  }

  // --- prisma/*.mjs: kiểm cú pháp module nội dung seed ---
  if (fp.includes("prisma/") && name.endsWith(".mjs")) {
    if (!existsSync(abs)) process.exit(0);
    try {
      execFileSync("node", ["--check", abs], { stdio: ["ignore", "ignore", "pipe"] });
    } catch (e) {
      const out = (e.stderr || e.stdout || "").toString().trim();
      fail(`⚠ ${fp} có lỗi cú pháp JavaScript:\n` + (out || String(e)));
    }
    process.exit(0);
  }

  process.exit(0);
}

main();
