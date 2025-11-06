"use client";

import React from "react";
import SvgInteractiveMap from "./components/SvgInteractiveMap";

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
  // Render immediately for aggressive priority

  return (
    <div className="h-full min-h-[400px] w-full">
      <SvgInteractiveMap
        mapsSection={mapsSection}
        serviceLocations={serviceLocations}
        onInteraction={onInteraction}
      />
    </div>
  );
};

export default SvgMapWrapper;
