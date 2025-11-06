"use client";

import React from "react";
// Eagerly import the SVG map wrapper to include it in the main client bundle
import SvgMapWrapper from "../maps/SvgMapWrapper";
import { useSanityMapsData } from "../maps/hooks/useSanityMapsData";
import styles from "../maps/styles/Maps.module.css";

// Removed dynamic import to prioritize immediate rendering

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
      <SvgMapWrapper
        mapsSection={mapsSection}
        serviceLocations={serviceLocations}
        onInteraction={onInteraction}
      />
    </div>
  );
};

export default MapComponent;
