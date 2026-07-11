// ============================================================================
// DEDUP DOCS — dọn BÀI VIẾT bị TRÙNG (cùng category + cùng tiêu đề) mà một lần
// nạp sai slug đã vô tình chèn thành 2 bản.
//
// AN TOÀN TUYỆT ĐỐI:
//   - Chỉ xét danh mục "manual-testing" (nơi phát sinh trùng).
//   - Gom các bài theo (categoryId + CHUỖI title y hệt). Nhóm có ≥2 bản = trùng.
//   - Trong mỗi nhóm: engagement = bookmarks + votes + comments + views.
//       * Giữ bản có engagement > 0 (dữ liệu học viên). Nếu cả nhóm engagement=0,
//         giữ bản MỚI NHẤT (createdAt lớn nhất — bản này mang slug canonical = art.slug
//         do lần sync gần nhất tạo → khớp các lần sync sau, hết trùng).
//       * XÓA các bản còn lại — NHƯNG CHỈ khi engagement của chúng == 0.
//       * Nếu một bản định xóa lại có engagement > 0 -> BỎ QUA cả nhóm + cảnh báo
//         (tuyệt đối không xóa dữ liệu học viên).
//   - Nếu giữ bản-có-engagement mà bản bị xóa mang slug canonical: sau khi xóa,
//     GẮN slug canonical đó cho bản giữ lại -> các lần sync sau khớp, không trùng nữa.
//   - Tất cả trong MỘT transaction.
//
// Dùng:
//   node prisma/dedup_docs.mjs                 # DRY: chỉ in, KHÔNG xóa
//   DEDUP_APPLY=1 node prisma/dedup_docs.mjs   # thực thi xóa (có transaction)
// ============================================================================
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const APPLY = process.env.DEDUP_APPLY === "1";
const SCOPE_CAT = "manual-testing";

function eng(a) {
  const c = a._count || {};
  return (c.bookmarks || 0) + (c.votes || 0) + (c.comments || 0) + (c.views || 0);
}

async function main() {
  console.log(`Dedup docs${APPLY ? " [APPLY]" : " [DRY RUN — không xóa gì]"} · scope category="${SCOPE_CAT}"`);

  const cat = await prisma.category.findUnique({ where: { slug: SCOPE_CAT }, select: { id: true } });
  if (!cat) { console.log(`Không thấy category ${SCOPE_CAT} — không làm gì.`); return; }

  const arts = await prisma.article.findMany({
    where: { categoryId: cat.id },
    select: {
      id: true, slug: true, title: true, createdAt: true,
      _count: { select: { bookmarks: true, votes: true, comments: true, views: true } },
    },
  });
  console.log(`Tổng bài trong "${SCOPE_CAT}": ${arts.length}`);

  // Gom theo tiêu đề y hệt
  const groups = new Map();
  for (const a of arts) {
    const key = a.title; // chuỗi JSON title, khớp tuyệt đối
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(a);
  }

  const deletes = [];        // id cần xóa
  const slugFixes = [];      // { id, slug } gắn slug canonical cho bản giữ lại
  let nDupGroups = 0, nSkip = 0;

  for (const [, rows] of groups) {
    if (rows.length < 2) continue;
    nDupGroups++;

    // sắp xếp: engagement giảm dần, rồi createdAt tăng dần (cũ trước)
    const byEng = [...rows].sort((a, b) => eng(b) - eng(a) || (a.createdAt - b.createdAt));
    const engaged = rows.filter((r) => eng(r) > 0);

    let keep, canonicalSlug = null;
    if (engaged.length >= 2) {
      console.warn(`  ⚠️  BỎ QUA (nhiều bản có dữ liệu học viên): ${short(rows)}`);
      nSkip++; continue;
    } else if (engaged.length === 1) {
      keep = engaged[0];
      // bản canonical = bản mới nhất (mang art.slug). Lấy slug của nó để gắn cho bản giữ.
      const newest = [...rows].sort((a, b) => b.createdAt - a.createdAt)[0];
      if (newest.id !== keep.id) canonicalSlug = newest.slug;
    } else {
      // cả nhóm engagement=0 -> giữ bản mới nhất (slug canonical), xóa phần còn lại
      keep = [...rows].sort((a, b) => b.createdAt - a.createdAt)[0];
    }

    const toDelete = rows.filter((r) => r.id !== keep.id);
    // CHỐT AN TOÀN: chỉ xóa bản engagement == 0
    const unsafe = toDelete.filter((r) => eng(r) > 0);
    if (unsafe.length) {
      console.warn(`  ⚠️  BỎ QUA (bản định xóa có dữ liệu học viên): ${short(rows)}`);
      nSkip++; continue;
    }

    for (const d of toDelete) deletes.push(d.id);
    if (canonicalSlug && keep.slug !== canonicalSlug) slugFixes.push({ id: keep.id, slug: canonicalSlug, old: keep.slug });

    console.log(`  • trùng ${rows.length} bản | GIỮ ${keep.id} (eng=${eng(keep)}, slug=${keep.slug}) | XÓA ${toDelete.map((d) => d.id).join(",")}${canonicalSlug ? ` | slug->${canonicalSlug}` : ""}`);
  }

  console.log(`\n  Nhóm trùng: ${nDupGroups} · Bỏ qua (an toàn): ${nSkip} · Sẽ XÓA: ${deletes.length} bản · Đổi slug: ${slugFixes.length}`);

  if (!APPLY) { console.log("DRY RUN — không ghi gì. Đặt DEDUP_APPLY=1 để thực thi."); return; }
  if (!deletes.length && !slugFixes.length) { console.log("✓ Không có gì để dọn."); return; }

  await prisma.$transaction([
    prisma.article.deleteMany({ where: { id: { in: deletes } } }),
    ...slugFixes.map((f) => prisma.article.update({ where: { id: f.id }, data: { slug: f.slug } })),
  ]);

  const after = await prisma.article.count({ where: { categoryId: cat.id } });
  console.log(`✓ Xong. Đã xóa ${deletes.length} bản trùng, đổi ${slugFixes.length} slug. Còn ${after} bài trong "${SCOPE_CAT}".`);
}

function short(rows) {
  let t = {}; try { t = JSON.parse(rows[0].title); } catch { /* noop */ }
  return `"${t.vi || t.en || rows[0].title.slice(0, 40)}" [${rows.map((r) => `${r.id}:eng${eng(r)}`).join(", ")}]`;
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
