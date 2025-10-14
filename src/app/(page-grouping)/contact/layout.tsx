import React from "react";
import PagePanel from "@/components/ui/PagePanel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PagePanel
      direction={{
        sm: 'top',      // Small screens slide from top (contact button/header navigation)
        md: 'top',      // Medium screens slide from top (contact button/header navigation)
        lg: 'top',      // Large screens slide from top (contact button/header navigation)
        xl: 'top',      // Extra large screens slide from top (contact button navigation)
        xxl: 'top',     // XXL screens slide from top (contact button navigation)
      }}
    >
      {children}
    </PagePanel>
  );
};

export default Layout;
