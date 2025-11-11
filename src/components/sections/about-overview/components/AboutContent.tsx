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
  const subtitle = aboutData?.subtitle;
  const description = aboutData?.description || "Description";

  // Fallback items when no Sanity data exists
  const defaultItems = [
    {
      _id: "1",
      content: "Item One",
      serviceSlug: "ior",
      order: 1,
    },
    {
      _id: "2",
      content: "Item Two",
      serviceSlug: "eor",
      order: 2,
    },
    {
      _id: "3",
      content: "Item Three",
      serviceSlug: "vat",
      order: 3,
    },
    {
      _id: "4",
      content: "Item Four",
      serviceSlug: "ddp",
      order: 4,
    },
  ];

  const items = aboutItems.length > 0 ? aboutItems : defaultItems;

  return (
    <div className="grid h-full w-[calc(100%-40px)] max-w-[600px] grid-rows-[max-content_max-content] content-center gap-6 lg:w-[calc(100%-128px)] xl:max-w-[644px]">
      <div className="px-6 text-center">
        <div className="mb-4 flex flex-col items-center justify-center">
          <div className="text-center">
            <SectionTitle className="mb-2">{title}</SectionTitle>
          </div>
          {subtitle && (
            <h3 className="mb-4 text-sm lg:text-lg">{subtitle}</h3>
          )}
        </div>
        <p className="text-xs lg:text-sm">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {items.map((item) => (
          <ServiceCard key={item._id} serviceSlug={item.serviceSlug}>
            {item.content}
          </ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default AboutContent;
