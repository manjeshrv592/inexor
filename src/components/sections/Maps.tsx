"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Container from "../layout/Container";
import { useSanityMapsData } from "../maps/hooks/useSanityMapsData";
import SectionTitle from "../ui/SectionTitle";
import Section from "../layout/Section";

// Dynamic import of the actual map component to prevent SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

const Maps = () => {
  const { mapsSection } = useSanityMapsData();
  const [hasInteracted, setHasInteracted] = useState(false);

  // Fallback content if no Sanity data is available
  const title = mapsSection?.title || "GO GLOBAL. INSTANTLY.";
  const description =
    mapsSection?.description ||
    "Reach Over 120 Markets With Zero Compliance Issues";

  const handleMapInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return (
    <Section className="">
      <Container>
        <div className="relative z-10">
          <div className="mb-4">
            <div className="text-center">
              <SectionTitle className="mb-2">{title}</SectionTitle>
            </div>
            <h3 className="text-center text-lg">{description}</h3>
          </div>

          <div className="relative">
            {/* Map instruction tooltip - positioned absolutely to prevent layout shift */}
            {!hasInteracted && (
              <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 transform">
                <div className="relative inline-block">
                  <div className="max-w-md rounded-lg bg-[#1a1a1a]/80 px-6 py-3 text-center text-white shadow-lg backdrop-blur-sm">
                    <div className="mb-1 flex items-center justify-center">
                      <svg
                        className="mr-2 h-4 w-4 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Interactive Map
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Click to interact with the map and select a continent to
                      view service availability for your country
                    </p>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 transform">
                    <div
                      className="h-0 w-0 border-t-8 border-r-8 border-l-8 border-r-transparent border-l-transparent"
                      style={{ borderTopColor: "#1a1a1a" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <MapComponent onInteraction={handleMapInteraction} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Maps;
