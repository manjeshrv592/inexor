import { getHomeSeo } from "@/lib/sanity";
import React from "react";
import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";

// Revalidate every 5 minutes for better performance
export const revalidate = 300;

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

const RootPage = async () => {
  return <HomePage />;
};

export default RootPage;
