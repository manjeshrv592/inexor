import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { getClientsSection } from "@/lib/sanity";

export async function Clients() {
  const clientsData = await getClientsSection();

  // Use title and subtitle from Sanity or fallback to defaults
  const title = clientsData?.title || "TRUSTED BY 40+ INDUSTRY LEADERS";
  const subtitle = clientsData?.subtitle || "Sub Title";

  return (
    <Section className="">
      <Container className="text-center">
        <div className="text-center">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <h3 className="mb-4 text-sm lg:text-lg">{subtitle}</h3>
        <div className="relative flex flex-col items-center justify-center overflow-hidden antialiased">
          {clientsData?.logos && (
            <InfiniteMovingCards
              items={clientsData.logos.map((logo) => ({
                name: logo.alt,
                src: logo.logo.asset.url,
                mimeType: logo.logo.asset.mimeType,
                lqip: logo.logo.asset.metadata.lqip,
              }))}
              direction="right"
              speed="slow"
            />
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Clients;
