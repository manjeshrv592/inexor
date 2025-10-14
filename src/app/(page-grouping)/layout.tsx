import React from "react";
import PagePanelBg from "@/components/ui/PagePanelBg";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <PagePanelBg />
      {children}
    </>
  );
};

export default Layout;
