import PagePanel from "@/components/ui/PagePanel";
import React from "react";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PagePanel 
      direction={{
        sm: 'top',      // Small screens slide from top (header navigation)
        md: 'top',      // Medium screens slide from top (header navigation)
        lg: 'top',      // Large screens slide from top (header navigation)
        xl: 'left',     // Extra large screens slide from left (header navigation)
        xxl: 'left',    // XXL screens slide from left (header navigation)
      }}
    >
      {children}
    </PagePanel>
  );
};

export default AboutLayout;
