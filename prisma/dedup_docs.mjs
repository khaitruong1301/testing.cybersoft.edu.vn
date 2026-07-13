// ============================================================================
// DEDUP DOCS (DỨT ĐIỂM) — dọn BÀI VIẾT bị TRÙNG trên "manual-testing" do bài
// seed gốc mang slug English cũ (stableSlug) còn nguồn sau dùng art.slug tiếng Việt.
//
// KHÁC bản cũ: KHÔNG "giữ mới nhất" (không tin cậy trên prod). Thay vào đó IMPORT
// đúng nguồn manual, tính SLUG CANONICAL mà sync_docs sẽ dùng, rồi với mỗi title:
//   - Giữ bản mang slug canonical; nếu chưa có, giữ bản CÓ engagement (dữ liệu học
//     viên) hoặc bản cũ nhất, rồi ĐỔI slug bản giữ về canonical.
//   - XÓA các bản còn lại — CHỈ khi engagement == 0 (tuyệt đối không mất dữ liệu).
//   - Sau dedup: mỗi title có ĐÚNG 1 bản slug canonical -> sync sau luôn MATCH ->
//     hết nhân đôi vĩnh viễn (kết hợp self-heal trong sync_docs).
//
//   node prisma/dedup_docs.mjs                 # DRY
//   DEDUP_APPLY=1 node prisma/dedup_docs.mjs   # thực thi
// ============================================================================
import { PrismaClient } from "@prisma/client";

// ---- Nguồn manual (khớp SOURCES manual-testing của sync_docs) ----
import { BEGINNER_MANUAL_DOCS } from "./doc_beginner_manual.mjs";
import { BEGINNER_MANUAL_ENT_DOCS } from "./doc_beginner_manual_enterprise.mjs";
import { MANUAL_ADV_01 } from "./doc_manual_advanced_01.mjs";
import { MANUAL_STATE_01 } from "./doc_manual_state_transition.mjs";
import { MANUAL_BEGINNER_DEFECT_01 } from "./doc_manual_beginner_defect_lifecycle.mjs";
import { MANUAL_BEGINNER_SEVPRI_01 } from "./doc_manual_beginner_severity_priority.mjs";
import { MANUAL_BEGINNER_NEGATIVE_01 } from "./doc_manual_beginner_negative_testing.mjs";
import { MB_TEST_DATA_01 } from "./doc_mb_test_data.mjs";
import { MB_YEUCAU_01 } from "./doc_mb_phan_tich_yeu_cau.mjs";
import { MB_DANGNHAP_01 } from "./doc_mb_dang_nhap.mjs";
import { MB_TIMKIEM_01 } from "./doc_mb_tim_kiem.mjs";
import { MB_TESTREPORT_01 } from "./doc_mb_test_report.mjs";
import { MB_GIOHANG_01 } from "./doc_mb_gio_hang.mjs";
import { MB_UPLOAD_01 } from "./doc_mb_upload_file.mjs";
import { MB_THONGBAO_01 } from "./doc_mb_thong_bao.mjs";
import { MB_EMAILOTP_01 } from "./doc_mb_email_otp.mjs";
import { MB_PHANTRANG_01 } from "./doc_mb_phan_trang.mjs";
import { MB_DANGONNGU_01 } from "./doc_mb_da_ngon_ngu.mjs";
import { MB_PHANQUYEN_01 } from "./doc_mb_phan_quyen.mjs";
import { MB_RESETPW_01 } from "./doc_mb_dat_lai_mat_khau.mjs";
import { MB_SMOKESANITY_01 } from "./doc_mb_smoke_sanity.mjs";
import { MB_JIRA_01 } from "./doc_mb_jira.mjs";
import { MB_USABILITY_01 } from "./doc_mb_usability.mjs";
import { MB_A11Y_01 } from "./doc_mb_accessibility.mjs";
import { MA_ERRORGUESS_01 } from "./doc_ma_error_guessing.mjs";
import { MA_RISKBASED_01 } from "./doc_ma_risk_based.mjs";
import { MA_USECASE_01 } from "./doc_ma_use_case.mjs";
import { MA_DOMAIN_01 } from "./doc_ma_domain_analysis.mjs";
import { MA_APIMANUAL_01 } from "./doc_ma_api_manual.mjs";
import { MA_SECURITY_01 } from "./doc_ma_security_basic.mjs";
import { MA_STRATEGY_01 } from "./doc_ma_test_strategy.mjs";
import { MA_COVERAGE_01 } from "./doc_ma_coverage_dataflow.mjs";
import { MA_RTM_01 } from "./doc_ma_rtm.mjs";
import { MA_REGSEL_01 } from "./doc_ma_regression_selection.mjs";
import { MA_SBTM_01 } from "./doc_ma_sbtm.mjs";
import { MA_RECOVERY_01 } from "./doc_ma_recovery.mjs";
import { MA_INSTALL_01 } from "./doc_ma_installation.mjs";
import { MA_MOBILE_01 } from "./doc_ma_mobile.mjs";
import { MA_CONCURRENCY_01 } from "./doc_ma_concurrency.mjs";
import { MA_RCA_01 } from "./doc_ma_rca.mjs";
import { MA_METRICS_01 } from "./doc_ma_metrics.mjs";
import { MA_VOLUME_01 } from "./doc_ma_volume.mjs";
import { MA_COMPLIANCE_01 } from "./doc_ma_compliance.mjs";
import { MA_RECON_01 } from "./doc_ma_reconciliation.mjs";
import { MA_TCPATTERN_01 } from "./doc_ma_testcase_patterns.mjs";
import { MA_E2E_01 } from "./doc_ma_e2e_flow.mjs";
import { MA_BACKCOMPAT_01 } from "./doc_ma_backward_compat.mjs";
import { MA_L10N_01 } from "./doc_ma_l10n_advanced.mjs";

const MANUAL_DOCS = [
  ...BEGINNER_MANUAL_DOCS, ...BEGINNER_MANUAL_ENT_DOCS, ...MANUAL_BEGINNER_DEFECT_01, ...MANUAL_BEGINNER_SEVPRI_01,
  ...MANUAL_BEGINNER_NEGATIVE_01, ...MB_TEST_DATA_01, ...MB_YEUCAU_01, ...MB_DANGNHAP_01, ...MB_TIMKIEM_01,
  ...MB_TESTREPORT_01, ...MB_GIOHANG_01, ...MB_UPLOAD_01, ...MB_THONGBAO_01, ...MB_EMAILOTP_01, ...MB_PHANTRANG_01,
  ...MB_DANGONNGU_01, ...MB_PHANQUYEN_01, ...MB_RESETPW_01, ...MB_SMOKESANITY_01, ...MB_JIRA_01, ...MB_USABILITY_01,
  ...MB_A11Y_01, ...MA_ERRORGUESS_01, ...MA_RISKBASED_01, ...MA_USECASE_01, ...MA_DOMAIN_01, ...MA_APIMANUAL_01,
  ...MA_SECURITY_01, ...MA_STRATEGY_01, ...MA_COVERAGE_01, ...MA_RTM_01, ...MA_REGSEL_01, ...MA_SBTM_01,
  ...MA_RECOVERY_01, ...MA_INSTALL_01, ...MA_MOBILE_01, ...MA_CONCURRENCY_01, ...MA_RCA_01, ...MA_METRICS_01,
  ...MA_VOLUME_01, ...MA_COMPLIANCE_01, ...MA_RECON_01, ...MA_TCPATTERN_01, ...MA_E2E_01, ...MA_BACKCOMPAT_01,
  ...MA_L10N_01, ...MANUAL_ADV_01, ...MANUAL_STATE_01,
];

// ---- slug canonical: SAO NGUYÊN VĂN từ sync_docs ----
function _slugify(s) {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function _h(s) { let h = 2166136261 >>> 0; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
function stableSlug(art) {
  const t = art.title || {};
  const base = _slugify(t.en || t.vi || "article") || "article";
  const h = (_h(JSON.stringify(t)) >>> 0).toString(36).slice(0, 6);
  return `${base}-${h}`;
}
const canonSlug = (art) => (art.slug ? _slugify(art.slug) : stableSlug(art));
const J = (o) => JSON.stringify(o);

const prisma = new PrismaClient();
const APPLY = process.env.DEDUP_APPLY === "1";
const SCOPE_CAT = "manual-testing";
const eng = (a) => { const c = a._count || {}; return (c.bookmarks || 0) + (c.votes || 0) + (c.comments || 0) + (c.views || 0); };

async function main() {
  console.log(`Dedup docs (DUT DIEM)${APPLY ? " [APPLY]" : " [DRY]"} · "${SCOPE_CAT}"`);
  const cat = await prisma.category.findUnique({ where: { slug: SCOPE_CAT }, select: { id: true } });
  if (!cat) { console.log("Khong thay category"); return; }

  // map: titleKey (J(art.title)) -> canonical slug
  const wantByTitle = new Map();
  for (const art of MANUAL_DOCS) wantByTitle.set(J(art.title), canonSlug(art));

  const arts = await prisma.article.findMany({
    where: { categoryId: cat.id },
    select: { id: true, slug: true, title: true, createdAt: true, _count: { select: { bookmarks: true, votes: true, comments: true, views: true } } },
  });
  console.log(`Tong bai: ${arts.length} · Nguon manual: ${MANUAL_DOCS.length} title`);

  const groups = new Map();
  for (const a of arts) { if (!groups.has(a.title)) groups.set(a.title, []); groups.get(a.title).push(a); }

  const deletes = [], slugFixes = [];
  let nSkip = 0;
  for (const [titleKey, rows] of groups) {
    const canonical = wantByTitle.get(titleKey);
    if (!canonical) continue;            // title không thuộc nguồn manual -> không đụng
    if (rows.length === 1 && rows[0].slug === canonical) continue; // đã đúng, bỏ qua

    const engaged = rows.filter((r) => eng(r) > 0);
    if (engaged.length >= 2) { console.warn(`  ⚠️ BỎ QUA (nhiều bản có dữ liệu): ${titleKey.slice(0, 40)}`); nSkip++; continue; }

    // chọn bản GIỮ: ưu tiên bản CÓ engagement (giữ dữ liệu học viên, rồi đổi slug về
    // canonical); else bản đã đúng canonical; else bản cũ nhất
    let keep = engaged[0] || rows.find((r) => r.slug === canonical) || [...rows].sort((a, b) => a.createdAt - b.createdAt)[0];
    const toDelete = rows.filter((r) => r.id !== keep.id);
    if (toDelete.some((r) => eng(r) > 0)) { console.warn(`  ⚠️ BỎ QUA (bản định xóa có dữ liệu): ${titleKey.slice(0, 40)}`); nSkip++; continue; }

    for (const d of toDelete) deletes.push(d.id);
    if (keep.slug !== canonical) slugFixes.push({ id: keep.id, slug: canonical });
    if (rows.length > 1 || keep.slug !== canonical)
      console.log(`  • ${JSON.parse(titleKey).vi?.slice(0, 42)} | GIỮ ${keep.slug === canonical ? "(canonical)" : "->"+canonical} eng=${eng(keep)} | XÓA ${toDelete.length}`);
  }

  console.log(`\n  Sẽ XÓA: ${deletes.length} · Đổi slug: ${slugFixes.length} · Bỏ qua an toàn: ${nSkip}`);
  if (!APPLY) { console.log("DRY — đặt DEDUP_APPLY=1 để chạy."); return; }
  if (!deletes.length && !slugFixes.length) { console.log("✓ Không có gì để dọn."); return; }

  await prisma.$transaction([
    prisma.article.deleteMany({ where: { id: { in: deletes } } }),
    ...slugFixes.map((f) => prisma.article.update({ where: { id: f.id }, data: { slug: f.slug } })),
  ]);
  const after = await prisma.article.count({ where: { categoryId: cat.id } });
  console.log(`✓ Xong. Xóa ${deletes.length}, đổi ${slugFixes.length} slug. Còn ${after} bài "${SCOPE_CAT}".`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
