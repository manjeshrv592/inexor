"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useSanityMapsData } from "../maps/hooks/useSanityMapsData";
import styles from "../maps/styles/Maps.module.css";

// Dynamically import the new SVG map component to avoid SSR issues
const DynamicSvgMap = dynamic(() => import("../maps/SvgMapWrapper"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-900">
      <span className="sr-only">Loading interactive map</span>
      <div className="h-8 w-8 rounded-full border-2 border-neutral-700 border-t-orange-500 animate-spin" />
    </div>
  ),
});

interface MapComponentProps {
  onInteraction?: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onInteraction }) => {
  const { mapsSection, serviceLocations, loading, error } = useSanityMapsData();

  if (error) {
    return (
      <div className={styles.mapContainer}>
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
          <div className="text-red-400">Error loading map: {error}</div>
        </div>
      </div>
    );
  }

  if (!mapsSection && !loading) {
    return (
      <div className={styles.mapContainer}>
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
          <div className="text-gray-400">No maps configuration found</div>
        </div>
      </div>
    );
  }

  // During loading, Maps.tsx handles the spinner. Avoid rendering with null data here.
  if (!mapsSection) {
    return null;
  }

  return (
    <div className={styles.mapContainer}>
      <DynamicSvgMap
        mapsSection={mapsSection}
        serviceLocations={serviceLocations}
        onInteraction={onInteraction}
      />
    </div>
  );
};

export default MapComponent;
