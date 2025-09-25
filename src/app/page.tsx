import { getHomeSeo } from "@/lib/sanity";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homeSeoData = await getHomeSeo();

  return {
    title: homeSeoData?.seo?.metaTitle || "Inexor - Your Business Partner",
    description:
      homeSeoData?.seo?.metaDescription ||
      "Professional business services and solutions",
    keywords: homeSeoData?.seo?.keywords,
    openGraph: homeSeoData?.seo?.ogImage?.asset?.url
      ? {
          images: [homeSeoData.seo.ogImage.asset.url],
        }
      : undefined,
  };
}

const HomePage = async () => {
  return <div className="hidden"></div>;
};

export default HomePage;
