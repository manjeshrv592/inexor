import { MetadataRoute } from "next";
import { getServices } from "@/lib/sanity/service";
import { getBlogPosts } from "@/lib/sanity/blog";
import { getFAQCategories, getFAQItems } from "@/lib/sanity";

// Regenerate the sitemap periodically so newly published content shows up
// without needing a redeploy.
export const revalidate = 3600;

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
  // Normalize: strip any trailing slash so we never produce "//" in URLs.
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://inexor.io").replace(
    /\/$/,
    "",
  );
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic routes pulled from Sanity (active/published content only).
  const [services, blogPosts, faqCategories, faqItems] = await Promise.all([
    safeFetch(getServices()),
    safeFetch(getBlogPosts()),
    safeFetch(getFAQCategories()),
    safeFetch(getFAQItems()),
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((service) => service.slug?.current)
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug.current}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: `${baseUrl}/resources/blogs/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const faqCategoryRoutes: MetadataRoute.Sitemap = faqCategories
    .filter((category) => category.slug?.current)
    .map((category) => ({
      url: `${baseUrl}/faq/${category.slug.current}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

  const faqQuestionRoutes: MetadataRoute.Sitemap = faqItems
    .filter((item) => item.slug?.current && item.category?.slug?.current)
    .map((item) => ({
      url: `${baseUrl}/faq/${item.category.slug.current}/${item.slug.current}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...faqCategoryRoutes,
    ...faqQuestionRoutes,
  ];
}
