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

  return {
    title: seo.metaTitle || "Services",
    description: seo.metaDescription || "Discover our comprehensive range of services",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: seo.metaTitle || "Services",
      description: seo.metaDescription || "Discover our comprehensive range of services",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Services",
      description: seo.metaDescription || "Discover our comprehensive range of services",
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