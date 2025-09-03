"use client";

import React from "react";
import dynamic from "next/dynamic";
import Container from "../layout/Container";
import { useSanityMapsData } from "../maps/hooks/useSanityMapsData";
import SectionTitle from "../ui/SectionTitle";
import Section from "../layout/Section";

// Dynamic import of the actual map component to prevent SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center bg-gray-900">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

const Maps = () => {
  const { mapsSection } = useSanityMapsData();

  // Fallback content if no Sanity data is available
  const title = mapsSection?.title || "GO GLOBAL. INSTANTLY.";
  const description =
    mapsSection?.description ||
    "Reach Over 120 Markets With Zero Compliance Issues";

  return (
    <Section>
      <Container>
        <div className="relative z-10">
          <div className="mb-4">
            <div className="text-center">
              <SectionTitle>{title}</SectionTitle>
            </div>
            <h3 className="text-center text-lg">{description}</h3>
          </div>

          <MapComponent />
        </div>
      </Container>
    </Section>
  );
};

export default Maps;
