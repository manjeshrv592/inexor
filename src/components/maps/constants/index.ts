import { ServiceLocation, MapConfig } from "../types";

export const SERVICE_LOCATIONS: ServiceLocation[] = [
  {
    country: "India",
    coordinates: [20.5937, 78.9629],
    code: "IN",
    serviceData: {
      tax: "5%",
      duties: "12%",
      leadTime: "12H",
    },
  },
  {
    country: "United States",
    coordinates: [39.8283, -98.5795],
    code: "US",
    serviceData: {
      tax: "8%",
      duties: "6%",
      leadTime: "8H",
    },
  },
  {
    country: "Canada",
    coordinates: [56.1304, -106.3468],
    code: "CA",
    serviceData: {
      tax: "7%",
      duties: "10%",
      leadTime: "10H",
    },
  },
  {
    country: "Australia",
    coordinates: [-25.2744, 133.7751],
    code: "AU",
    serviceData: {
      tax: "10%",
      duties: "15%",
      leadTime: "16H",
    },
  },
];

export const MAP_CONFIG: MapConfig = {
  worldCenter: [20, 0],
  zoomLevel: 2,
  minZoom: 2,
  maxZoom: 4,
  maxBounds: [
    [-90, -180],
    [90, 180],
  ],
  maxBoundsViscosity: 1.0,
};

export const COUNTRIES_GEOJSON_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

export const TILE_LAYER_CONFIG = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  subdomains: ["a", "b", "c", "d"],
  maxZoom: 20,
};

export const COUNTRY_STYLE = {
  fillColor: "transparent",
  weight: 0,
  opacity: 0,
  color: "transparent",
  fillOpacity: 0,
};

export const COUNTRY_HOVER_STYLE = {
  weight: 1,
  color: "#ff6600",
  fillOpacity: 0,
  opacity: 1,
};

export const DEBOUNCE_DELAY = 300;
