"use client";

import React from "react";
import dynamic from "next/dynamic";

const SvgInteractiveMap = dynamic(() => import("./components/SvgInteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px]">Loading...</div>
  ),
});

interface SvgMapWrapperProps {
  mapsSection: {
    mapConfig: {
      centerLat: number;
      centerLng: number;
      zoomLevel: number;
    };
  };
  serviceLocations: Array<{
    code: string;
    coordinates: [number, number];
    country: string;
    serviceData: { tax: string; duties: string; leadTime: string };
  }>;
  onInteraction?: () => void;
}

const SvgMapWrapper: React.FC<SvgMapWrapperProps> = ({
  mapsSection,
  serviceLocations,
  onInteraction,
}) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <SvgInteractiveMap
        mapsSection={mapsSection}
        serviceLocations={serviceLocations}
        onInteraction={onInteraction}
      />
    </div>
  );
};

export default SvgMapWrapper;
