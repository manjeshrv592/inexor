import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import React from "react";

// const ResourcesLayout = ({ children }: { children: React.ReactNode }) => {
const ResourcesLayout = () => {
  return (
    <>
      <PagePanelBg />
      {/* <PagePanel>{children}</PagePanel> */}
      <PagePanel>{"Page Panel"}</PagePanel>
    </>
  );
};

export default ResourcesLayout;
