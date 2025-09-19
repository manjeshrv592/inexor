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
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

interface MapComponentProps {
  onInteraction?: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onInteraction }) => {
  const { mapsSection, serviceLocations, loading, error } = useSanityMapsData();

  if (loading) {
    return (
      <div className={styles.mapContainer}>
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
          <div className="text-gray-400">Loading map configuration...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mapContainer}>
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
          <div className="text-red-400">Error loading map: {error}</div>
        </div>
      </div>
    );
  }

  if (!mapsSection) {
    return (
      <div className={styles.mapContainer}>
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
          <div className="text-gray-400">No maps configuration found</div>
        </div>
      </div>
    );
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
