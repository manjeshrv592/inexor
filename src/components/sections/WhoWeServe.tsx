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
  // Don't use a placeholder string when subtitle is missing —
  // leave it undefined/empty so the <h3> renders no text instead of a filler.
  const subtitle = sectionData?.subtitle;

  return (
    <Section className="">
      <Container className="text-center">
        <div className="text-center">
          <SectionTitle className="mb-2">{title}</SectionTitle>
        </div>
        {subtitle ? (
          <h3 className="mb-4 text-sm lg:text-lg text-white">{subtitle}</h3>
        ) : null}
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 xl:gap-y-6">
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
