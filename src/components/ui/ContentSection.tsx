import React from "react";
import { PortableTextBlock } from "@portabletext/types";
import PortableTextRenderer from "./PortableTextRenderer";

interface ContentSectionProps {
  sectionTitle?: string;
  titleStyle?: "orange" | "white";
  content: PortableTextBlock[];
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  sectionTitle,
  titleStyle = "white",
  content,
  className = "",
}) => {
  const titleClasses =
    titleStyle === "orange"
      ? "text-brand-orange-500 mt-4 mb-4"
      : "text-white mb-4";

  return (
    <div className={className}>
      {sectionTitle && <p className={titleClasses}>{sectionTitle}</p>}
      <PortableTextRenderer content={content} />
    </div>
  );
};

export default ContentSection;
