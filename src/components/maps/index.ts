// Components
export * from "./components";

// SVG Map Components
export { default as SvgMapWrapper } from "./SvgMapWrapper";
export { default as SvgInteractiveMap } from "./components/SvgInteractiveMap";

// Hooks
export { useCountriesData } from "./hooks/useCountriesData";
export { useSanityMapsData } from "./hooks/useSanityMapsData";

// Types
export type {
  CountryProperties,
  ServiceLocation,
  MapConfig,
  TooltipPosition,
  CountriesGeoJSON,
  CountryFeature,
} from "./types";

// Constants (Leaflet-based)
export {
  SERVICE_LOCATIONS,
  MAP_CONFIG,
  COUNTRIES_GEOJSON_URL,
  TILE_LAYER_CONFIG,
  COUNTRY_STYLE,
  COUNTRY_HOVER_STYLE,
  DEBOUNCE_DELAY,
} from "./constants";

// SVG Map Constants
export {
  CONTINENT_MAPPING,
  CONTINENT_ZOOM_COORDS,
  SVG_MAP_CONFIG,
} from "./constants/svgMapConstants";

// SVG Map Utils
export {
  isCountryInContinent,
  getCountryContinent,
  zoomToContinent,
  resetToInitialView,
  hasServiceData,
  getServiceData,
} from "./utils/svgMapUtils";
