import React from "react";

interface PagePanelProps {
  children: React.ReactNode;
}

const PagePanel = ({ children }: PagePanelProps) => {
  return <main>{children}</main>;
};

export default PagePanel;
