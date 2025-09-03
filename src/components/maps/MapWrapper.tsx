"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  HomeButton,
  ServiceMarkers,
  CountryOverlay,
  MapInteractionHandler,
  useCountriesData,
  TILE_LAYER_CONFIG,
} from "./index";

interface MapWrapperProps {
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
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  mapsSection,
  serviceLocations,
}) => {
  const { countriesData } = useCountriesData();

  const mapCenter: [number, number] = [
    mapsSection.mapConfig.centerLat,
    mapsSection.mapConfig.centerLng,
  ];

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapsSection.mapConfig.zoomLevel}
      minZoom={mapsSection.mapConfig.zoomLevel} // Minimum zoom is the initial zoom level (2)
      maxZoom={mapsSection.mapConfig.zoomLevel + 2} // Maximum zoom is initial + 2 levels (4)
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]} // Restrict to world bounds
      maxBoundsViscosity={1.0} // Makes bounds completely rigid
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ minHeight: "400px" }}
      key={`map-${Date.now()}`} // Force re-render on hot reload
    >
      <TileLayer
        attribution={TILE_LAYER_CONFIG.attribution}
        url={TILE_LAYER_CONFIG.url}
        subdomains={TILE_LAYER_CONFIG.subdomains}
        maxZoom={TILE_LAYER_CONFIG.maxZoom}
      />

      {countriesData && <CountryOverlay countriesData={countriesData} />}

      <ServiceMarkers serviceLocations={serviceLocations} />

      <HomeButton
        initialCenter={mapCenter}
        initialZoom={mapsSection.mapConfig.zoomLevel}
      />

      <MapInteractionHandler
        serviceLocations={serviceLocations}
        countriesData={countriesData}
      />
    </MapContainer>
  );
};

export default MapWrapper;
