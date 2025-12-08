import { CONTINENT_MAPPING, CONTINENT_ZOOM_COORDS, SVG_MAP_CONFIG } from "../constants/svgMapConstants";
import { zoomIdentity } from "d3-zoom";
import { geoCentroid, geoBounds } from "d3-geo";
import type { Selection } from "d3-selection";
import type { ZoomBehavior } from "d3-zoom";
import type { Feature, Geometry, GeoJsonProperties, FeatureCollection } from "geojson";
import type { GeoProjection } from "d3-geo";

// Define ServiceLocation interface
interface ServiceLocation {
  country: string;
  coordinates: [number, number];
  code: string;
  serviceData: {
    tax: string;
    duties: string;
    leadTime: string;
  };
}

/**
 * Checks if a country belongs to a specific continent
 */
export const isCountryInContinent = (
  countryName: string,
  continentName: string
): boolean => {
  const continentCountries = CONTINENT_MAPPING[continentName];
  if (!continentCountries || !countryName) return false;

  return continentCountries.some((continentCountry) => {
    // Exact match first (most reliable)
    if (countryName === continentCountry) return true;

    // Special handling for problematic partial matches
    // Prevent "Oman" from matching "Romania"
    if (continentCountry === "Romania" && countryName === "Oman") return false;
    if (continentCountry === "Oman" && countryName === "Romania") return false;
    
    // Note: France MultiPolygon is now split at data processing level
    // so no special handling needed here anymore

    // Special handling for Guinea variants to prevent cross-continent matches
    if (continentCountry === "Guinea") {
      return countryName === "Guinea";
    }

    if (continentCountry === "Papua New Guinea") {
      return countryName === "Papua New Guinea";
    }

    // Special handling for other Guinea variants
    if (continentCountry === "Guinea-Bissau") {
      return countryName === "Guinea-Bissau";
    }

    if (continentCountry === "Eq. Guinea") {
      return countryName === "Eq. Guinea";
    }

    // For exact matches only - no more partial matching to prevent false positives
    return false;
  });
};

/**
 * Gets the continent for a given country
 */
export const getCountryContinent = (countryName: string): string | null => {
  for (const continentName of Object.keys(CONTINENT_MAPPING)) {
    if (isCountryInContinent(countryName, continentName)) {
      return continentName;
    }
  }
  return null;
};

/**
 * Automatically calculates and zooms to a continent center using D3 geoCentroid
 */
export const zoomToContinentAuto = (
  continentName: string,
  geoData: FeatureCollection<Geometry, GeoJsonProperties>,
  projection: GeoProjection,
  svg: Selection<SVGSVGElement, unknown, null, undefined>,
  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>
) => {
  // Get all countries in the continent
  const continentCountries = geoData.features.filter((feature: Feature<Geometry, GeoJsonProperties>) => {
    const countryName = feature.properties?.NAME || "";
    return isCountryInContinent(countryName, continentName);
  });

  if (continentCountries.length === 0) {
    console.warn(`No countries found for continent: ${continentName}`);
    return;
  }

  // Create a feature collection for the continent
  const continentFeatureCollection: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: continentCountries
  };

  // Calculate the geographic bounds of the continent
  const bounds = geoBounds(continentFeatureCollection);
  const [[west, south], [east, north]] = bounds;

  // Calculate the geographic center
  const center = geoCentroid(continentFeatureCollection);
  
  // Project the center to screen coordinates
  const projectedCenter = projection(center);
  
  if (!projectedCenter) {
    console.warn(`Could not project center for continent: ${continentName}`);
    return;
  }

  // Calculate appropriate zoom level based on continent size
  const width = SVG_MAP_CONFIG.width;
  const height = SVG_MAP_CONFIG.height;
  
  // Calculate the projected bounds
  const projectedSW = projection([west, south]);
  const projectedNE = projection([east, north]);
  
  if (!projectedSW || !projectedNE) {
    console.warn(`Could not project bounds for continent: ${continentName}`);
    return;
  }

  // Calculate the scale needed to fit the continent
  const dx = Math.abs(projectedNE[0] - projectedSW[0]);
  const dy = Math.abs(projectedNE[1] - projectedSW[1]);
  const scale = Math.min(width / dx, height / dy) * 0.6; // 0.6 for less padding, more zoom

  // Clamp the scale to reasonable limits with higher zoom
  const clampedScale = Math.max(3, Math.min(12, scale)); // Increased from 2-8 to 3-12

  // Calculate translation to center the continent
  const translateX = width / 2 - projectedCenter[0] * clampedScale;
  const translateY = height / 2 - projectedCenter[1] * clampedScale;

  // Apply the zoom transformation
  svg.call(
    zoomBehavior.transform,
    zoomIdentity.translate(translateX, translateY).scale(clampedScale)
  );
};

/**
 * Zooms to a continent using optimal coordinates (fallback method)
 */
export const zoomToContinent = (
  continentName: string,
  svg: Selection<SVGSVGElement, unknown, null, undefined>,
  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>
) => {
  const coords =
    CONTINENT_ZOOM_COORDS[continentName as keyof typeof CONTINENT_ZOOM_COORDS];

  if (!coords) {
    console.warn(`No zoom coordinates found for continent: ${continentName}`);
    return;
  }

  // Apply zoom transformation using optimal coordinates
  // Note: Removed transition to avoid TypeScript issues with d3 types
  svg.call(
    zoomBehavior.transform,
    zoomIdentity.translate(coords.x, coords.y).scale(coords.zoom)
  );
};

/**
 * Resets map to initial optimal view
 */
export const resetToInitialView = (
  svg: Selection<SVGSVGElement, unknown, null, undefined>,
  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>
) => {
  // Reset to initial view
  // Note: Removed transition to avoid TypeScript issues with d3 types
  svg.call(
    zoomBehavior.transform, 
    zoomIdentity
      .translate(SVG_MAP_CONFIG.initialX, SVG_MAP_CONFIG.initialY)
      .scale(SVG_MAP_CONFIG.initialZoom)
  );
};

/**
 * Checks if a country has service data available
 */
export const hasServiceData = (countryName: string, serviceLocations: ServiceLocation[]): boolean => {
  return serviceLocations.some(location => 
    location.country.toLowerCase() === countryName.toLowerCase() ||
    (countryName.toLowerCase() === "united states" && location.country === "United States") ||
    (countryName.toLowerCase() === "usa" && location.country === "United States")
  );
};

/**
 * Gets service data for a specific country
 */
export const getServiceData = (countryName: string, serviceLocations: ServiceLocation[]): ServiceLocation | undefined => {
  return serviceLocations.find(location => 
    location.country.toLowerCase() === countryName.toLowerCase() ||
    (countryName.toLowerCase() === "united states" && location.country === "United States") ||
    (countryName.toLowerCase() === "usa" && location.country === "United States")
  );
};
