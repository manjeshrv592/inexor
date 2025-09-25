import React from "react";
import PageTransition from "@/components/ui/PageTransition";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

export default Layout;
