// scaffold.mjs — sinh KHUNG module bài 14 chương để điền nội dung SÂU.
// Chạy: node scaffold.mjs --slug=banking-loan --kind=thucchien --domain=banking --tech=playwright,api
//        --title="Thực chiến: kiểm thử phê duyệt khoản vay" --cat=enterprise-realworld > ../prisma/doc_banking-loan.mjs
const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
}));
const slug = args.slug || "new-article";
const kind = args.kind || "congnghe";
const domain = args.domain || "default";
const tech = (args.tech || "playwright").split(",").filter(Boolean);
const cat = args.cat || "enterprise-realworld";
const title = args.title || "TIÊU ĐỀ (vi)";
const CH = [
  "1. Bối cảnh & phạm vi", "2. Kiến trúc & luồng nghiệp vụ", "3. Mô hình dữ liệu & bất biến",
  "4. Phân tích rủi ro & chiến lược", "5. Test Plan", "6. Ma trận ca kiểm thử",
  "7. Chuẩn bị dữ liệu & môi trường", "8. Automation: happy path", "9. Ca lỗi chuyên sâu",
  "10. Nghiệp vụ nền/hậu kiểm", "11. CI/CD, giám sát & chỉ số", "12. Tích hợp AI Agent",
  "13. Góc phỏng vấn", "14. Tóm tắt & checklist",
];
const pages = CH.map((h, i) => `  {
    heading: { vi: ${JSON.stringify(h)}, en: "${i + 1}. TODO (en)", ja: "${i + 1}. TODO (ja)" },
    blocks: [
      P("TODO đoạn văn vi (3–6 câu, có số liệu/bối cảnh).", "TODO paragraph en.", "TODO 段落 ja."),
      // + thêm code / img / ul / note / tip / warn / scenario / qa theo authoring-standard.md
    ],
  },`).join("\n");
process.stdout.write(`import { P, H, UL, CODE, NOTE, TIP, WARN, IMG, SCEN, QA, buildDoc, tags } from "./engine.mjs";
import { makeThumb } from "./thumbnail.mjs";
const cover = makeThumb({ id: ${JSON.stringify(slug.slice(0, 6))}, domain: ${JSON.stringify(domain)}, kind: ${JSON.stringify(kind)}, label: ${JSON.stringify(slug.toUpperCase())} });
const pages = [
${pages}
];
export const DOCS = [{
  categorySlug: ${JSON.stringify(cat)},
  slug: ${JSON.stringify(slug)},
  cover,
  tags: tags(${["kind:" + kind, "domain:" + domain, ...tech.map((t) => "tech:" + t)].map(() => "").join("")}${[kind, domain, ...tech, "realworld", "interview"].map((k) => JSON.stringify(k)).join(", ")}),
  title: { vi: ${JSON.stringify(title)}, en: "TODO (en)", ja: "TODO (ja)" },
  summary: { vi: "TODO tóm tắt vi.", en: "TODO summary en.", ja: "TODO 概要 ja." },
  pages: buildDoc(pages),
}];
`);
