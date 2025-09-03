import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { getClientsSection } from "@/lib/sanity";

export async function Clients() {
  const clientsData = await getClientsSection();
  return (
    <Section>
      <Container>
        <div className="text-center">
          <SectionTitle>TRUSTED BY 40+ INDUSTRY LEADERS</SectionTitle>
        </div>
        <div className="relative flex flex-col items-center justify-center overflow-hidden antialiased">
          {clientsData?.logos && (
            <InfiniteMovingCards
              items={clientsData.logos.map((logo) => ({
                name: logo.alt,
                src: logo.logo.asset.url,
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
