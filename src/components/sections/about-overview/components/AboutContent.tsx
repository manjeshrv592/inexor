import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "./ServiceCard";
import { AboutSection, AboutItem } from "@/lib/sanity";

interface AboutContentProps {
  aboutData: AboutSection | null;
  aboutItems: AboutItem[];
}

const AboutContent: React.FC<AboutContentProps> = ({
  aboutData,
  aboutItems,
}) => {
  // Fallback data when no Sanity data exists
  const title = aboutData?.title || "Title";
  const subtitle = aboutData?.subtitle || "Subtitle";
  const description = aboutData?.description || "Description";

  // Fallback items when no Sanity data exists
  const defaultItems = [
    {
      _id: "1",
      content: "Item One",
      slug: { current: "item-one" },
      order: 1,
    },
    {
      _id: "2",
      content: "Item Two",
      slug: { current: "item-two" },
      order: 2,
    },
    {
      _id: "3",
      content: "Item Three",
      slug: { current: "item-three" },
      order: 3,
    },
    {
      _id: "4",
      content: "Item Four",
      slug: { current: "item-four" },
      order: 4,
    },
  ];

  const items = aboutItems.length > 0 ? aboutItems : defaultItems;

  return (
    <div className="grid h-full w-[calc(100%-40px)] grid-rows-[max-content_max-content] content-center gap-6 py-8 xl:w-[calc(75%-64px)] xl:py-0">
      <div className="px-6 text-center">
        <div className="mb-4 flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <SectionTitle className="mb-0">{title}</SectionTitle>
          </div>
          <h3 className="mb-4 text-lg">{subtitle}</h3>
        </div>
        <p className="text-sm">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs xl:grid-cols-4">
        {items.map((item) => (
          <ServiceCard key={item._id}>{item.content}</ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default AboutContent;
