"use client";

import React from "react";
// Eagerly import the SVG map wrapper to include it in the main client bundle
import SvgMapWrapper from "../maps/SvgMapWrapper";
import { SanityMapsSection } from "../../lib/sanity-maps";
import { ServiceLocation } from "../maps/types";
import styles from "../maps/styles/Maps.module.css";

interface MapComponentProps {
  mapsSection: SanityMapsSection;
  serviceLocations: ServiceLocation[];
  onInteraction?: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapsSection,
  serviceLocations,
  onInteraction,
}) => {
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
