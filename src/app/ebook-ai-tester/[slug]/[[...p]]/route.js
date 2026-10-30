// Trình đọc ebook "Chuẩn bị trước khoá AI Tester": chỉ học viên đã đăng nhập VÀ email đã được admin kích hoạt.
// Chưa đăng nhập -> /login?next=...; chưa kích hoạt -> /tai-lieu-ai-tester (trang giới thiệu, nút liên hệ).
import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/session";
import { hasGrant, readBookFile } from "@/lib/ebookAiTester";

export const dynamic = "force-dynamic";

const esc = (s) => String(s).replace(/[\\'"<>`]/g, "");

export async function GET(req, { params }) {
  const slug = params.slug;
  const parts = params.p || [];
  const url = new URL(req.url);
  const student = await getCurrentStudent();
  if (!student) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(`/ebook-ai-tester/${slug}`)}`, url));
  }
  if (!(await hasGrant(student))) {
    return NextResponse.redirect(new URL("/tai-lieu-ai-tester?chua-kich-hoat=1", url));
  }
  const f = readBookFile(slug, parts);
  if (!f) return new NextResponse("Không tìm thấy", { status: 404 });

  let body = f.buf;
  if (f.rel === "index.html") {
    // Trang đọc là tài liệu học viên: không index, không chữ "miễn phí", đường dẫn tương đối theo thư mục cuốn.
    body = f.buf.toString("utf8")
      .replace("<head>", `<head>\n<base href="/ebook-ai-tester/${slug}/">`)
      .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow, noarchive">')
      .replace(/\(miễn phí, đọc online\)/g, "(tài liệu học viên)")
      .replace(/Đọc online miễn phí/g, "Tài liệu học viên")
      .replace(/MIỄN<br>PHÍ/g, "HỌC<br>VIÊN")
      .replace(/ĐỌC ONLINE MIỄN PHÍ/g, "TÀI LIỆU HỌC VIÊN · AI TESTER")
      .replace(/<link rel="canonical"[^>]*>/, "");
  } else if (f.rel === "assets/reader.js") {
    // Watermark ghi email người đọc để truy vết nếu bị chụp lại.
    body = f.buf.toString("utf8").replace("Chỉ đọc online · không sao chép", `${esc(student.email)} · chỉ đọc online`);
  }
  return new NextResponse(body, {
    headers: {
      "Content-Type": f.type,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
