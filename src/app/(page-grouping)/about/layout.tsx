import PagePanel from "@/components/ui/PagePanel";
import React from "react";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PagePanel 
      direction={{
        sm: 'up',       // Small screens slide from up (header navigation)
        md: 'up',       // Medium screens slide from up (header navigation)
        lg: 'up',       // Large screens slide from up (header navigation)
        xl: 'left',     // Extra large screens slide from left (header navigation)
        xxl: 'left',    // XXL screens slide from left (header navigation)
      }}
    >
      {children}
    </PagePanel>
  );
};

export default AboutLayout;
