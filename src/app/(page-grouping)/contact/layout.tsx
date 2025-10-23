import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import React from "react";
import { Metadata } from "next";
import { getContactPageSeo } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getContactPageSeo();
  
  if (!seoData?.seo) {
    return {
      title: "Contact Us",
      description: "Get in touch with us for all your inquiries",
    };
  }

  const { seo } = seoData;
  const openGraphImage = seo.openGraphImage?.asset?.url;

  return {
    title: seo.metaTitle || "Contact Us",
    description: seo.metaDescription || "Get in touch with us for all your inquiries",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: seo.canonicalUrl ? {
      canonical: seo.canonicalUrl,
    } : undefined,
    openGraph: {
      title: seo.openGraphTitle || seo.metaTitle || "Contact Us",
      description: seo.openGraphDescription || seo.metaDescription || "Get in touch with us for all your inquiries",
      url: seo.canonicalUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      siteName: "Inexor",
      type: "website",
      images: openGraphImage ? [{
        url: openGraphImage,
        width: seo.openGraphImage?.asset?.metadata?.dimensions?.width || 1200,
        height: seo.openGraphImage?.asset?.metadata?.dimensions?.height || 630,
        alt: seo.openGraphImage?.alt || "Contact Us",
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraphTitle || seo.metaTitle || "Contact Us",
      description: seo.openGraphDescription || seo.metaDescription || "Get in touch with us for all your inquiries",
      images: openGraphImage ? [openGraphImage] : undefined,
    },
  };
}

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PagePanelBg />
      <PagePanel>{children}</PagePanel>
    </>
  );
};

export default ContactLayout;
