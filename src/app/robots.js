import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api", "/profile"] },
      // Explicitly welcome AI answer engines / assistants to crawl public content.
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-Web", "Google-Extended", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
