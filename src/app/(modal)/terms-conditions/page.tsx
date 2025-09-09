import AutoScrollContainer from "@/components/ui/AutoScrollContainer";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import Image from "next/image";
import React from "react";
import { getTermsConditionsPage, getTermsConditionsContent } from "@/lib/sanity";

const TermsConditionsPage = async () => {
  const [termsConditionsPage, termsConditionsContent] = await Promise.all([
    getTermsConditionsPage(),
    getTermsConditionsContent(),
  ]);

  return (
    <div className="size-full grid-cols-[2fr_3fr_2fr] bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
      <div className="relative h-44 xl:h-full">
        <div className="absolute size-full bg-black">
          <Image
            src="/img/left-image.jpg"
            alt="terms and conditions bg"
            fill
            className="object-cover opacity-40 grayscale"
          />
        </div>
      </div>
      <div className="xxl:h-[calc(100vh-128px)] col-span-2 h-[calc(100vh-118.14px)] xl:h-[calc(100vh-112px)]">
        <AutoScrollContainer>
          <div className="flex h-full flex-col justify-center px-8 py-12 xl:px-12">
            <h1 className="mb-4 text-4xl font-bold text-white">
              {termsConditionsPage?.pageTitle || "Terms & Conditions"}
            </h1>
            {termsConditionsPage?.pageSubtitle && (
              <p className="text-lg text-gray-300">
                {termsConditionsPage.pageSubtitle}
              </p>
            )}
            {termsConditionsContent?.lastUpdated && (
              <p className="mt-4 text-sm text-gray-400">
                Last updated: {new Date(termsConditionsContent.lastUpdated).toLocaleDateString()}
              </p>
            )}
            {termsConditionsContent?.content && (
              <div className="mt-8 text-white">
                <PortableTextRenderer content={termsConditionsContent.content} />
              </div>
            )}
          </div>
        </AutoScrollContainer>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
