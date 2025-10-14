import React from "react";
import PagePanel from "@/components/ui/PagePanel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PagePanel
      direction={{
        sm: 'top',      // Small screens slide from top (footer navigation special case)
        md: 'top',      // Medium screens slide from top (footer navigation special case)
        lg: 'top',      // Large screens slide from top (footer navigation special case)
        xl: 'bottom',   // Extra large screens slide from bottom (footer navigation)
        xxl: 'bottom',  // XXL screens slide from bottom (footer navigation)
      }}
    >
      {children}
    </PagePanel>
  );
};

export default Layout;
