// ============================================================================
// Loader AN TOÀN cho ngân hàng ISTQB (300 câu, 100/level, đủ vi/en/ja).
// Chỉ đụng vào 3 category tab "ISTQB": bảo đảm tồn tại, xoá câu hỏi cũ CỦA RIÊNG
// chúng, rồi nạp lại toàn bộ. KHÔNG xoá/đổi bất kỳ dữ liệu nào khác.
//
// Chạy:  node prisma/load_istqb_bank.mjs
// ============================================================================
import { PrismaClient } from "@prisma/client";
import { ISTQB_LEVELS, ISTQB_MCQ } from "./istqb.mjs";

const prisma = new PrismaClient();
const J = (o) => JSON.stringify(o);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log("→ Nạp ngân hàng ISTQB (chỉ đụng tab 'ISTQB')...");

  // 1) Đảm bảo 3 category ISTQB tồn tại (upsert theo slug), giữ nguyên nếu đã có.
  const lvlMap = {};
  let order = 0;
  for (const lv of ISTQB_LEVELS) {
    const desc = J({
      vi: "Luyện thi chứng chỉ ISTQB theo cấp độ, hệ thống tự chấm.",
      en: "ISTQB certification practice by level, auto-graded.",
      ja: "レベル別ISTQB認定試験の対策、自動採点。",
    });
    const cat = await prisma.category.upsert({
      where: { slug: lv.slug },
      update: { tab: "ISTQB", title: J(lv.title), icon: lv.icon, description: desc },
      create: { tab: "ISTQB", slug: lv.slug, title: J(lv.title), icon: lv.icon, order: order, description: desc },
    });
    lvlMap[lv.slug] = cat.id;
    order++;
  }

  // 2) Xoá câu hỏi cũ CHỈ của 3 category ISTQB này.
  const istqbIds = Object.values(lvlMap);
  const del = await prisma.interviewQuestion.deleteMany({ where: { categoryId: { in: istqbIds } } });
  console.log(`  Đã xoá ${del.count} câu ISTQB cũ.`);

  // 3) Nạp lại toàn bộ 300 câu.
  let inserted = 0;
  const perLevel = {};
  for (const q of ISTQB_MCQ) {
    const categoryId = lvlMap[q.lvl];
    if (!categoryId) continue;
    await prisma.interviewQuestion.create({
      data: {
        categoryId,
        kind: "MCQ",
        prompt: J(q.q),
        options: J(q.options),
        answer: String(q.answer),
        explanation: J(q.exp),
        difficulty: rand(1, 3),
      },
    });
    inserted++;
    perLevel[q.lvl] = (perLevel[q.lvl] || 0) + 1;
  }

  console.log(`  Đã nạp ${inserted} câu:`);
  for (const lv of ISTQB_LEVELS) console.log(`    - ${lv.slug}: ${perLevel[lv.slug] || 0} câu`);
  console.log("✓ Hoàn tất nạp ngân hàng ISTQB.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
