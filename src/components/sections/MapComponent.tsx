"use client";

import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useSanityMapsData } from "../maps/hooks/useSanityMapsData";
import styles from "../maps/styles/Maps.module.css";

// Dynamically import the entire map component to avoid hot reload issues
const DynamicMap = dynamic(() => import("../maps/MapWrapper"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-900">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

const MapComponent = () => {
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
      <DynamicMap
        mapsSection={mapsSection}
        serviceLocations={serviceLocations}
      />
    </div>
  );
};

export default MapComponent;
