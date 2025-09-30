import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import React from "react";
import { getTermsConditionsContent } from "@/lib/sanity";

const TermsConditionsPage = async () => {
  const termsConditionsContent = await getTermsConditionsContent();

  return (
    <div className="size-full bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
      <div className="h-full overflow-y-auto">
        <div className="h-full px-8 py-12 xl:px-12">
          <h1 className="font-michroma text-brand-orange-500 mb-4 text-center text-xl">
            {termsConditionsContent?.pageTitle || "Terms & Conditions"}
          </h1>
          {termsConditionsContent?.lastUpdated && (
            <p className="mt-4 text-xs text-gray-400">
              Last updated:{" "}
              {new Date(
                termsConditionsContent.lastUpdated,
              ).toLocaleDateString()}
            </p>
          )}
          {termsConditionsContent?.content && (
            <div className="mt-8 pb-8 text-white">
              <PortableTextRenderer content={termsConditionsContent.content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
