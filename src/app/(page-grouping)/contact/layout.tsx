import React from "react";
import PagePanel from "@/components/ui/PagePanel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PagePanel
      direction={{
        sm: 'up',       // Small screens slide from up (contact button/header navigation)
        md: 'up',       // Medium screens slide from up (contact button/header navigation)
        lg: 'up',       // Large screens slide from up (contact button/header navigation)
        xl: 'up',       // Extra large screens slide from up (contact button navigation)
        xxl: 'up',      // XXL screens slide from up (contact button navigation)
      }}
    >
      {children}
    </PagePanel>
  );
};

export default Layout;
