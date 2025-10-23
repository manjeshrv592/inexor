import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import React from "react";
import { getPrivacyPolicyContent, getPrivacyPolicySeo } from "@/lib/sanity";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getPrivacyPolicySeo();

  if (!seoData?.seo) {
    return {
      title: "Privacy Policy",
      description: "Our privacy policy and data protection information",
    };
  }

  const { seo } = seoData;
  const openGraphImage = seo.openGraphImage?.asset?.url;

  return {
    title: seo.metaTitle || "Privacy Policy",
    description:
      seo.metaDescription ||
      "Our privacy policy and data protection information",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: seo.canonicalUrl
      ? {
          canonical: seo.canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: seo.openGraphTitle || seo.metaTitle || "Privacy Policy",
      description:
        seo.openGraphDescription ||
        seo.metaDescription ||
        "Our privacy policy and data protection information",
      url:
        seo.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`,
      siteName: "Inexor",
      type: "website",
      images: openGraphImage
        ? [
            {
              url: openGraphImage,
              width:
                seo.openGraphImage?.asset?.metadata?.dimensions?.width || 1200,
              height:
                seo.openGraphImage?.asset?.metadata?.dimensions?.height || 630,
              alt: seo.openGraphImage?.alt || "Privacy Policy",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.openGraphTitle || seo.metaTitle || "Privacy Policy",
      description:
        seo.openGraphDescription ||
        seo.metaDescription ||
        "Our privacy policy and data protection information",
      images: openGraphImage ? [openGraphImage] : undefined,
    },
  };
}

const PrivacyPolicyPage = async () => {
  const privacyPolicyContent = await getPrivacyPolicyContent();

  return (
    <div className="size-full bg-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
      <div className="h-full overflow-y-auto">
        <div className="h-full px-8 py-12 xl:px-12">
          <h1 className="font-michroma text-brand-orange-500 mb-4 text-center text-xl">
            {privacyPolicyContent?.pageTitle || "Privacy Policy"}
          </h1>
          {privacyPolicyContent?.lastUpdated && (
            <p className="mt-4 text-xs text-gray-400">
              Last updated:{" "}
              {new Date(privacyPolicyContent.lastUpdated).toLocaleDateString()}
            </p>
          )}
          {privacyPolicyContent?.content && (
            <div className="mt-8 pb-8 text-white">
              <PortableTextRenderer content={privacyPolicyContent.content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
