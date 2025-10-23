import { Metadata } from "next";
import { getServicesPageSeo } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getServicesPageSeo();
  
  if (!seoData?.seo) {
    return {
      title: "Services",
      description: "Discover our comprehensive range of services",
    };
  }

  const { seo } = seoData;
  const openGraphImage = seo.openGraphImage?.asset?.url;

  return {
    title: seo.metaTitle || "Services",
    description: seo.metaDescription || "Discover our comprehensive range of services",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: seo.canonicalUrl ? {
      canonical: seo.canonicalUrl,
    } : undefined,
    openGraph: {
      title: seo.openGraphTitle || seo.metaTitle || "Services",
      description: seo.openGraphDescription || seo.metaDescription || "Discover our comprehensive range of services",
      url: seo.canonicalUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
      siteName: "Inexor",
      type: "website",
      images: openGraphImage ? [{
        url: openGraphImage,
        width: seo.openGraphImage?.asset?.metadata?.dimensions?.width || 1200,
        height: seo.openGraphImage?.asset?.metadata?.dimensions?.height || 630,
        alt: seo.openGraphImage?.alt || "Services",
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraphTitle || seo.metaTitle || "Services",
      description: seo.openGraphDescription || seo.metaDescription || "Discover our comprehensive range of services",
      images: openGraphImage ? [openGraphImage] : undefined,
    },
  };
}

export default function ServicesPage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <p className="text-lg text-gray-600">
        Explore our comprehensive range of services designed to meet your business needs.
      </p>
    </div>
  );
}