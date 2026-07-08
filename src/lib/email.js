import "server-only";

// Gửi email qua SendGrid v3 HTTP API (fetch) — không cần thêm dependency.
// Bí mật đọc từ biến môi trường (KHÔNG ghi vào code/git):
//   SENDGRID_API_KEY   — API key SendGrid (bắt buộc)
//   SENDGRID_FROM_EMAIL — email người gửi ĐÃ xác thực trong SendGrid (mặc định noreply@cybersoft.edu.vn)
//   SENDGRID_FROM_NAME  — tên hiển thị (mặc định "CyberSoft Tester")
const SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send";

export function emailConfigured() {
  return !!process.env.SENDGRID_API_KEY;
}

export async function sendEmail({ to, subject, text, html }) {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) throw new Error("SENDGRID_API_KEY chưa cấu hình trên server");
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || "noreply@cybersoft.edu.vn";
  const fromName = process.env.SENDGRID_FROM_NAME || "CyberSoft Tester";

  const content = [{ type: "text/plain", value: text || "" }];
  if (html) content.push({ type: "text/html", value: html });

  const res = await fetch(SENDGRID_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: fromEmail, name: fromName },
      subject,
      content,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`SendGrid ${res.status}: ${body.slice(0, 300)}`);
  }
  return true;
}

// Email chứa mã đăng nhập OTP.
export async function sendLoginCodeEmail(to, code) {
  const subject = "Mã đăng nhập CyberSoft Tester";
  const text =
    `Ma dang nhap cua ban: ${code}\n` +
    `Ma co hieu luc trong 5 phut va chi dung mot lan.\n` +
    `Khong chia se ma nay cho bat ky ai.\n\n` +
    `Neu ban khong yeu cau, vui long bo qua email nay.`;
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:auto;padding:24px;background:#f8fafc;border-radius:16px">
    <h2 style="color:#0f172a;margin:0 0 8px">CyberSoft Tester</h2>
    <p style="color:#475569;margin:0 0 16px">Mã đăng nhập của bạn:</p>
    <div style="font-size:32px;font-weight:800;letter-spacing:8px;color:#1d4ed8;background:#fff;border-radius:12px;padding:16px;text-align:center">${code}</div>
    <p style="color:#64748b;font-size:13px;margin:16px 0 0">Mã có hiệu lực trong <b>5 phút</b> và chỉ dùng một lần. Không chia sẻ mã cho bất kỳ ai.</p>
    <p style="color:#94a3b8;font-size:12px;margin:12px 0 0">Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
  </div>`;
  return sendEmail({ to, subject, text, html });
}
