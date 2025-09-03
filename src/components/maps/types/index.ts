import { FeatureCollection, Feature, Geometry } from "geojson";

export interface CountryProperties {
  NAME: string;
  NAME_LONG: string;
  ADMIN: string;
  name?: string;
  [key: string]: unknown;
}

export interface ServiceLocation {
  country: string;
  coordinates: [number, number];
  code: string;
  serviceData: {
    tax: string;
    duties: string;
    leadTime: string;
  };
}

export interface MapConfig {
  worldCenter: [number, number];
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
  maxBounds: [[number, number], [number, number]];
  maxBoundsViscosity: number;
}

export interface TooltipPosition {
  clientX: number;
  clientY: number;
}

export type CountriesGeoJSON = FeatureCollection<Geometry, CountryProperties>;
export type CountryFeature = Feature<Geometry, CountryProperties>;
