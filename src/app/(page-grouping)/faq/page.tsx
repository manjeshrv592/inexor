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

  return {
    title: seo.metaTitle || "FAQ",
    description: seo.metaDescription || "Frequently asked questions and answers",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: seo.metaTitle || "FAQ",
      description: seo.metaDescription || "Frequently asked questions and answers",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "FAQ",
      description: seo.metaDescription || "Frequently asked questions and answers",
    },
  };
}

const FAQPage = () => {
  // Layout handles all the FAQ functionality with URL routing
  return null;
};

export default FAQPage;
