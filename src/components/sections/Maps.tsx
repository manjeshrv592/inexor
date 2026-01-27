"use client";

import React, { useCallback } from "react";
import Container from "../layout/Container";
import { SanityMapsSection } from "../../lib/sanity-maps";
import { ServiceLocation } from "../maps/types";
import SectionTitle from "../ui/SectionTitle";
import Section from "../layout/Section";
import MapComponent from "./MapComponent";

interface MapsProps {
  mapsSection: SanityMapsSection | null;
  serviceLocations: ServiceLocation[];
}

const Maps = ({ mapsSection, serviceLocations }: MapsProps) => {
  // Fallback content if no Sanity data is available
  const title = mapsSection?.title || "GO GLOBAL. INSTANTLY.";
  const subtitle = mapsSection?.subtitle;

  const handleMapInteraction = useCallback(() => {
    // setHasInteracted(true);
  }, []);

  if (!mapsSection) {
    return (
      <Section className="">
        <Container>
          <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
            <div className="text-gray-400">No maps configuration found</div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="">
      <Container>
        <div className="relative z-10">
          <div className="mb-4">
            <div className="text-center">
              <SectionTitle className="mb-2">{title}</SectionTitle>
            </div>
            {subtitle && (
              <h3 className="text-center text-sm lg:text-lg">{subtitle}</h3>
            )}
          </div>

          <div className="relative">
            <MapComponent
              mapsSection={mapsSection}
              serviceLocations={serviceLocations}
              onInteraction={handleMapInteraction}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Maps;
