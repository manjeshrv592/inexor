import AutoScrollContainer from "@/components/ui/AutoScrollContainer";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import React from "react";
import { getPrivacyPolicyContent } from "@/lib/sanity";

const PrivacyPolicyPage = async () => {
  const privacyPolicyContent = await getPrivacyPolicyContent();

  return (
    <div className="size-full bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
      <div className="xxl:h-[calc(100vh-128px)] h-[calc(100vh-118.14px)] xl:h-[calc(100vh-112px)]">
        <AutoScrollContainer>
          <div className="h-full px-8 py-12 xl:px-12">
            <h1 className="font-michroma text-brand-orange-500 mb-4 text-center text-xl">
              {privacyPolicyContent?.pageTitle || "Privacy Policy"}
            </h1>
            {privacyPolicyContent?.lastUpdated && (
              <p className="mt-4 text-xs text-gray-400">
                Last updated:{" "}
                {new Date(
                  privacyPolicyContent.lastUpdated,
                ).toLocaleDateString()}
              </p>
            )}
            {privacyPolicyContent?.content && (
              <div className="mt-8 text-white">
                <PortableTextRenderer content={privacyPolicyContent.content} />
              </div>
            )}
          </div>
        </AutoScrollContainer>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
