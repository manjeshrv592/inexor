import { Metadata } from "next";
import { getFaqPageSeo } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getFaqPageSeo();
  
  if (!seoData?.seo) {
    return {
      title: "FAQ",
      description: "Frequently asked questions and answers",
    };
  }

  const { seo } = seoData;
  const openGraphImage = seo.openGraphImage?.asset?.url;

  return {
    title: seo.metaTitle || "FAQ",
    description: seo.metaDescription || "Frequently asked questions and answers",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: seo.canonicalUrl ? {
      canonical: seo.canonicalUrl,
    } : undefined,
    openGraph: {
      title: seo.openGraphTitle || seo.metaTitle || "FAQ",
      description: seo.openGraphDescription || seo.metaDescription || "Frequently asked questions and answers",
      url: seo.canonicalUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
      siteName: "Inexor",
      type: "website",
      images: openGraphImage ? [{
        url: openGraphImage,
        width: seo.openGraphImage?.asset?.metadata?.dimensions?.width || 1200,
        height: seo.openGraphImage?.asset?.metadata?.dimensions?.height || 630,
        alt: seo.openGraphImage?.alt || "FAQ",
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraphTitle || seo.metaTitle || "FAQ",
      description: seo.openGraphDescription || seo.metaDescription || "Frequently asked questions and answers",
      images: openGraphImage ? [openGraphImage] : undefined,
    },
  };
}

const FAQPage = () => {
  // Layout handles all the FAQ functionality with URL routing
  return null;
};

export default FAQPage;
