import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { getClientsSection } from "@/lib/sanity";

export async function Clients() {
  const clientsData = await getClientsSection();

  // Use title from Sanity or fallback to default
  const title = clientsData?.title || "TRUSTED BY 40+ INDUSTRY LEADERS";

  return (
    <Section className="">
      <Container>
        <div className="text-center">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <div className="relative flex flex-col items-center justify-center overflow-hidden antialiased">
          {clientsData?.logos && (
            <InfiniteMovingCards
              items={clientsData.logos.map((logo) => ({
                name: logo.alt,
                src: logo.logo.asset.url,
              }))}
              direction="left"
              speed="slow"
            />
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Clients;
