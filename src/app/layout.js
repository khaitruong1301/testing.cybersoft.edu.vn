import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, KEYWORDS, orgJsonLd, websiteJsonLd, courseJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CyberSoft Tester — Học Kiểm thử phần mềm / QA thực chiến & AI Testing",
    template: "%s · CyberSoft Tester",
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "CyberSoft Academy" }],
  creator: "CyberSoft Academy",
  publisher: "CyberSoft Academy",
  category: "education",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: { "vi-VN": "/", "en-US": "/", "ja-JP": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "CyberSoft Tester — Học Kiểm thử phần mềm / QA thực chiến & AI Testing",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberSoft Tester — Học Kiểm thử phần mềm / QA & AI Testing",
    description: SITE_DESCRIPTION,
  },
  // Add real verification tokens when available:
  // verification: { google: "xxxx", other: { "facebook-domain-verification": "xxxx" } },
};

export const viewport = {
  themeColor: "#1a72f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  const jsonLd = [orgJsonLd(), websiteJsonLd(), courseJsonLd(), faqJsonLd()];
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {jsonLd.map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
