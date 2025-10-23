import { Metadata } from "next";
import { getResourcesPageSeo } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getResourcesPageSeo();
  
  if (!seoData?.seo) {
    return {
      title: "Resources",
      description: "Explore our resources and insights",
    };
  }

  const { seo } = seoData;
  const openGraphImage = seo.openGraphImage?.asset?.url;

  return {
    title: seo.metaTitle || "Resources",
    description: seo.metaDescription || "Explore our resources and insights",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: seo.canonicalUrl ? {
      canonical: seo.canonicalUrl,
    } : undefined,
    openGraph: {
      title: seo.openGraphTitle || seo.metaTitle || "Resources",
      description: seo.openGraphDescription || seo.metaDescription || "Explore our resources and insights",
      url: seo.canonicalUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/resources`,
      siteName: "Inexor",
      type: "website",
      images: openGraphImage ? [{
        url: openGraphImage,
        width: seo.openGraphImage?.asset?.metadata?.dimensions?.width || 1200,
        height: seo.openGraphImage?.asset?.metadata?.dimensions?.height || 630,
        alt: seo.openGraphImage?.alt || "Resources",
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraphTitle || seo.metaTitle || "Resources",
      description: seo.openGraphDescription || seo.metaDescription || "Explore our resources and insights",
      images: openGraphImage ? [openGraphImage] : undefined,
    },
  };
}

export default function ResourcesPage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <p className="text-lg text-gray-600">
        Welcome to our resources section. Here you&apos;ll find valuable insights, articles, and tools to help you succeed.
      </p>
    </div>
  );
}