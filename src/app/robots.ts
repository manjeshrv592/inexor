import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Until now this site served no robots.txt of its own — `public/robots.txt`
 * was deleted at launch (commit 63528ed, when it still said `Disallow: /`),
 * and Cloudflare's "managed robots.txt" has been answering /robots.txt since.
 * That works, but it carries no `Sitemap:` directive and is not under our
 * control.
 *
 * The AI-crawler blocks below mirror what Cloudflare's managed file already
 * serves, so taking ownership of robots.txt does not silently re-open the site
 * to those agents. Note that Google-Extended governs Gemini training only — it
 * has no effect on Googlebot or Search indexing.
 */
const BLOCKED_AI_AGENTS = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "CloudflareBrowserRenderingCrawler",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Route handlers hold no indexable content. Crawling them wastes the
        // limited budget this domain gets; it does not affect the browser
        // fetches the site itself makes.
        disallow: ["/api/"],
      },
      ...BLOCKED_AI_AGENTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
