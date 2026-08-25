import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import React from "react";
import { Metadata } from "next";
import { getPreloadedContactSeo } from "@/lib/preloader/contact-preloader";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, canonical } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getPreloadedContactSeo();

  if (!seoData?.seo) {
    return {
      ...canonical("/contact"),
      title: "Contact Us",
      description: "Get in touch with us for all your inquiries",
    };
  }

  const { seo } = seoData;

  return {
    ...canonical("/contact"),
    title: seo.metaTitle || "Contact Us",
    description:
      seo.metaDescription || "Get in touch with us for all your inquiries",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seo.metaTitle || "Contact Us",
      description:
        seo.metaDescription || "Get in touch with us for all your inquiries",
      url: absoluteUrl("/contact"),
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Contact Us",
      description:
        seo.metaDescription || "Get in touch with us for all your inquiries",
    },
  };
}

const ContactLayout = async ({ children }: { children: React.ReactNode }) => {
  const seoData = await getPreloadedContactSeo();
  return (
    <>
      <JsonLd items={seoData?.seo?.structuredData} />
      <PagePanelBg />
      <PagePanel>{children}</PagePanel>
    </>
  );
};

export default ContactLayout;
