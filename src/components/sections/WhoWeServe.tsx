import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import WhoWeServeItem from "../ui/WhoWeServeItem";
import {
  WhoWeServeItem as WhoWeServeItemType,
  WhoWeServeSection,
} from "../../lib/sanity";

interface WhoWeServeProps {
  items: WhoWeServeItemType[];
  sectionData?: WhoWeServeSection | null;
}

const WhoWeServe: React.FC<WhoWeServeProps> = ({ items, sectionData }) => {
  // Use section data from Sanity or fallback to default
  const title = sectionData?.title || "WHO WE SERVE";

  return (
    <Section className="">
      <Container>
        <div className="text-center">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <WhoWeServeItem
              key={item._id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhoWeServe;
