import PagePanel from "@/components/ui/PagePanel";
import React, { Suspense } from "react";
import { AboutPageSkeleton } from "@/components/ui/LoadingSkeleton";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PagePanel
      direction={{
        sm: "up", // Small screens slide from up (header navigation)
        md: "up", // Medium screens slide from up (header navigation)
        lg: "up", // Large screens slide from up (header navigation)
        xl: "left", // Extra large screens slide from left (header navigation)
        xxl: "left", // XXL screens slide from left (header navigation)
      }}
    >
      <Suspense fallback={<AboutPageSkeleton />}>
        {children}
      </Suspense>
    </PagePanel>
  );
};

export default AboutLayout;
