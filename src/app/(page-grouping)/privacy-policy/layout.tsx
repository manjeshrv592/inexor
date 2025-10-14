import React, { Suspense } from "react";
import PagePanel from "@/components/ui/PagePanel";
import { PrivacyPolicyPageSkeleton } from "@/components/ui/LoadingSkeleton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PagePanel
      direction={{
        sm: "up", // Small screens slide from up (footer navigation special case)
        md: "up", // Medium screens slide from up (footer navigation special case)
        lg: "up", // Large screens slide from up (footer navigation special case)
        xl: "down", // Extra large screens slide from down (footer navigation)
        xxl: "down", // XXL screens slide from down (footer navigation)
      }}
    >
      <Suspense fallback={<PrivacyPolicyPageSkeleton />}>
        {children}
      </Suspense>
    </PagePanel>
  );
};

export default Layout;
