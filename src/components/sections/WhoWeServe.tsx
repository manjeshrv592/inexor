import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import WhoWeServeItem from "../ui/WhoWeServeItem";
import { WhoWeServeItem as WhoWeServeItemType } from "../../lib/sanity";

interface WhoWeServeProps {
  items: WhoWeServeItemType[];
}

const WhoWeServe: React.FC<WhoWeServeProps> = ({ items }) => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <SectionTitle>WHO WE SERVE</SectionTitle>
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
