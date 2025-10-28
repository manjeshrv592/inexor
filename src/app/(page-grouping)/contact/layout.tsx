import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import React from "react";
import { Metadata } from "next";
import { getPreloadedContactSeo } from "@/lib/preloader/contact-preloader";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getPreloadedContactSeo();
  
  if (!seoData?.seo) {
    return {
      title: "Contact Us",
      description: "Get in touch with us for all your inquiries",
    };
  }

  const { seo } = seoData;

  return {
    title: seo.metaTitle || "Contact Us",
    description: seo.metaDescription || "Get in touch with us for all your inquiries",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: seo.metaTitle || "Contact Us",
      description: seo.metaDescription || "Get in touch with us for all your inquiries",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Contact Us",
      description: seo.metaDescription || "Get in touch with us for all your inquiries",
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
