import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import React from "react";

const FAQLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PagePanelBg />
      <PagePanel>{children}</PagePanel>
    </>
  );
};

export default FAQLayout;
