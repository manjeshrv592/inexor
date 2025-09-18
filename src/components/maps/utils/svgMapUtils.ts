import { CONTINENT_MAPPING, CONTINENT_ZOOM_COORDS, SVG_MAP_CONFIG } from "../constants/svgMapConstants";
import { zoomIdentity } from "d3-zoom";
import type { Selection } from "d3-selection";
import type { ZoomBehavior } from "d3-zoom";

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

    if (continentCountry === "Equatorial Guinea") {
      return countryName === "Equatorial Guinea";
    }

    // For other countries, allow partial matching but be more careful
    if (continentCountry.length >= 5) {
      if (
        countryName.includes(continentCountry) ||
        continentCountry.includes(countryName)
      ) {
        return true;
      }
    }

    // Handle common abbreviations and variations for longer names
    const normalizedCountry = countryName
      .toLowerCase()
      .replace(/[^a-z\s]/g, "");
    const normalizedContinent = continentCountry
      .toLowerCase()
      .replace(/[^a-z\s]/g, "");

    // Only match if normalized names are substantial and similar enough
    if (normalizedContinent.length >= 5) {
      return (
        normalizedCountry.includes(normalizedContinent) ||
        normalizedContinent.includes(normalizedCountry)
      );
    }

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
 * Zooms to a continent using optimal coordinates
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

  console.log(
    `Zooming to ${continentName} with optimal coordinates:`,
    coords
  );

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
