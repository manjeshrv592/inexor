import { MetadataRoute } from "next";
import { getServices } from "@/lib/sanity/service";
import { getBlogPosts } from "@/lib/sanity/blog";
import { getFAQCategories, getFAQItems } from "@/lib/sanity";
import { absoluteUrl } from "@/lib/seo";

// Regenerate the sitemap periodically so newly published content shows up
// without needing a redeploy.
export const revalidate = 3600;

/**
 * `lastModified` must describe when a PAGE'S CONTENT changed — never when this
 * file happened to be regenerated. Google only honours <lastmod> while it stays
 * verifiably accurate, and a timestamp shared by every URL (which is what
 * `new Date()` produces here) is the fastest way to have the whole signal
 * discarded.
 *
 * Sanity-backed routes therefore read `_updatedAt` from the document. The
 * handful of routes whose copy lives in the codebase are listed below with a
 * date maintained by hand — bump the entry when you actually edit that page.
 */
const STATIC_PAGE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-06-29",
  "/about": "2026-06-11",
  "/contact": "2026-06-29",
  "/privacy-policy": "2026-05-01",
  "/terms-conditions": "2026-05-01",
};

/**
 * Parse a Sanity timestamp, falling back to the given date when the document
 * has no usable value. Never falls back to "now".
 */
function toDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/** Most recent of a set of dates, ignoring anything unparseable. */
function newest(dates: Array<Date | undefined>, fallback: Date): Date {
  const valid = dates.filter(
    (d): d is Date => d instanceof Date && !Number.isNaN(d.getTime()),
  );
  if (valid.length === 0) return fallback;
  return valid.reduce((a, b) => (a > b ? a : b));
}

// Fetch helper that degrades to an empty list if Sanity is briefly unreachable,
// so a single failed fetch never breaks the whole sitemap (or the build).
async function safeFetch<T>(promise: Promise<T[]>): Promise<T[]> {
  try {
    return await promise;
  } catch (error) {
    console.error("sitemap: failed to fetch dynamic routes", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dynamic routes pulled from Sanity (active/published content only).
  const [services, blogPosts, faqCategories, faqItems] = await Promise.all([
    safeFetch(getServices()),
    safeFetch(getBlogPosts()),
    safeFetch(getFAQCategories()),
    safeFetch(getFAQItems()),
  ]);

  // Used only when a document is missing `_updatedAt` entirely.
  const epoch = new Date("2026-05-01T00:00:00.000Z");

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((service) => service.slug?.current)
    .map((service) => ({
      url: absoluteUrl(`/services/${service.slug.current}`),
      lastModified: toDate(service._updatedAt, epoch),
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: absoluteUrl(`/resources/blogs/${post.slug.current}`),
      // A post's page reflects later edits, so prefer the newer of the two.
      lastModified: newest(
        [
          post.publishedAt ? new Date(post.publishedAt) : undefined,
          post._updatedAt ? new Date(post._updatedAt) : undefined,
        ],
        epoch,
      ),
    }));

  const faqCategoryRoutes: MetadataRoute.Sitemap = faqCategories
    .filter((category) => category.slug?.current)
    .map((category) => {
      // A category page renders its questions, so it changes when they do.
      const itemDates = faqItems
        .filter((item) => item.category?.slug?.current === category.slug.current)
        .map((item) =>
          item._updatedAt ? new Date(item._updatedAt) : undefined,
        );

      return {
        url: absoluteUrl(`/faq/${category.slug.current}`),
        lastModified: newest(
          [
            category._updatedAt ? new Date(category._updatedAt) : undefined,
            ...itemDates,
          ],
          epoch,
        ),
      };
    });

  const faqQuestionRoutes: MetadataRoute.Sitemap = faqItems
    .filter((item) => item.slug?.current && item.category?.slug?.current)
    .map((item) => ({
      url: absoluteUrl(`/faq/${item.category.slug.current}/${item.slug.current}`),
      lastModified: toDate(item._updatedAt, epoch),
    }));

  // Static routes. NOTE: /services, /resources and /faq are deliberately
  // absent — each one 307-redirects to its first child, so listing them only
  // spends crawl budget on URLs Google will file under "Page with redirect".
  const staticRoutes: MetadataRoute.Sitemap = Object.entries(
    STATIC_PAGE_LAST_MODIFIED,
  ).map(([path, date]) => ({
    url: absoluteUrl(path),
    lastModified: new Date(date),
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...faqCategoryRoutes,
    ...faqQuestionRoutes,
  ];
}
