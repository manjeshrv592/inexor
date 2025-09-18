import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import WhyItem from "../ui/WhyItem";
import { Why as WhyType, WhyItem as WhyItemType } from "../../lib/sanity";

interface WhyProps {
  whyData: WhyType | null;
  whyItems: WhyItemType[];
}

const Why: React.FC<WhyProps> = ({ whyData, whyItems }) => {
  // Fallback data when no Sanity data exists
  const title = whyData?.title || "WHY CHOOSE INEXOR";
  const subtitle = whyData?.subtitle || "Sub Title";
  const description = whyData?.description || "Description";

  // Fallback items when no Sanity data exists
  const defaultItems = [
    {
      _id: "1",
      content: "First Item",
      slug: { current: "first-item" },
      order: 1,
    },
    {
      _id: "2",
      content: "Second Item",
      slug: { current: "second-item" },
      order: 2,
    },
    {
      _id: "3",
      content: "Third Item",
      slug: { current: "third-item" },
      order: 3,
    },
    {
      _id: "4",
      content: "Four",
      slug: { current: "fourth-item" },
      order: 4,
    },
  ];

  const items = whyItems.length > 0 ? whyItems : defaultItems;
  return (
    <Section className="xxl:pl-20 lg:pl-20">
      <Container className="text-center">
        <div className="text-center">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <h3 className="mb-4 text-lg">{subtitle}</h3>
        <p className="mx-auto mb-8 max-w-4xl text-sm">{description}</p>
        <div className="grid gap-8 text-center text-xs md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <WhyItem key={item._id} content={item.content} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Why;
