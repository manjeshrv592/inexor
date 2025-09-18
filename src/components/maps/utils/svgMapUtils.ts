import { CONTINENT_MAPPING, CONTINENT_ZOOM_COORDS, SVG_MAP_CONFIG } from "../constants/svgMapConstants";
import { zoomIdentity } from "d3-zoom";

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
  svg: any,
  zoomBehavior: any
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

  // Apply zoom transformation with smooth transition using optimal coordinates
  svg
    .transition()
    .duration(750)
    .call(
      zoomBehavior.transform,
      zoomIdentity.translate(coords.x, coords.y).scale(coords.zoom)
    );
};

/**
 * Resets map to initial optimal view
 */
export const resetToInitialView = (svg: any, zoomBehavior: any) => {
  svg
    .transition()
    .duration(750)
    .call(
      zoomBehavior.transform, 
      zoomIdentity
        .translate(SVG_MAP_CONFIG.initialX, SVG_MAP_CONFIG.initialY)
        .scale(SVG_MAP_CONFIG.initialZoom)
    );
};

/**
 * Checks if a country has service data available
 */
export const hasServiceData = (countryName: string, serviceLocations: any[]): boolean => {
  return serviceLocations.some(location => 
    location.country.toLowerCase() === countryName.toLowerCase() ||
    (countryName.toLowerCase() === "united states" && location.country === "United States") ||
    (countryName.toLowerCase() === "usa" && location.country === "United States")
  );
};

/**
 * Gets service data for a specific country
 */
export const getServiceData = (countryName: string, serviceLocations: any[]) => {
  return serviceLocations.find(location => 
    location.country.toLowerCase() === countryName.toLowerCase() ||
    (countryName.toLowerCase() === "united states" && location.country === "United States") ||
    (countryName.toLowerCase() === "usa" && location.country === "United States")
  );
};
