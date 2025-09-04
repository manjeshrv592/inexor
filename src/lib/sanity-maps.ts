import { client } from "./sanity";

export interface SanityCountry {
  _id: string;
  name: string;
  code: string;
  flag: string;
  isActive: boolean;
  tax?: string;
  duties?: string;
  leadTime?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface SanityMapsSection {
  _id: string;
  title: string;
  description?: string;
  isActive: boolean;
  countries: SanityCountry[];
  mapConfig: {
    centerLat: number;
    centerLng: number;
    zoomLevel: number;
  };
}

// Fetch active maps section with all countries
export async function getMapsSection(): Promise<SanityMapsSection | null> {
  try {
    // Get all active countries directly
    const activeCountries = await getActiveCountries();

    // Return a hardcoded maps section with the active countries
    return {
      _id: "default-maps-section",
      title: "GO GLOBAL. INSTANTLY.",
      description: "Reach Over 120 Markets With Zero Compliance Issues",
      isActive: true,
      countries: activeCountries,
      mapConfig: {
        centerLat: 20,
        centerLng: 0,
        zoomLevel: 2,
      },
    };
  } catch (error) {
    console.error("Error fetching maps section:", error);
    return null;
  }
}

// Fetch only active countries (for service locations)
export async function getActiveCountries(): Promise<SanityCountry[]> {
  try {
    const query = `
      *[_type == "country" && isActive == true] | order(name asc) {
        _id,
        name,
        code,
        flag,
        isActive,
        tax,
        duties,
        leadTime,
        coordinates,
        bounds
      }
    `;

    return await client.fetch(
      query,
      {},
      { next: { tags: ["countries", "maps"] } },
    );
  } catch (error) {
    console.error("Error fetching active countries:", error);
    return [];
  }
}

// Fetch all countries (for admin purposes)
export async function getAllCountries(): Promise<SanityCountry[]> {
  try {
    const query = `
      *[_type == "country"] | order(name asc) {
        _id,
        name,
        code,
        flag,
        isActive,
        tax,
        duties,
        leadTime,
        coordinates,
        bounds
      }
    `;

    return await client.fetch(
      query,
      {},
      { next: { tags: ["countries", "maps"] } },
    );
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
}

// Convert Sanity country to ServiceLocation format (for backward compatibility)
export function sanityCountryToServiceLocation(country: SanityCountry) {
  return {
    country: country.name,
    coordinates: [country.coordinates.lat, country.coordinates.lng] as [
      number,
      number,
    ],
    code: country.code,
    serviceData: {
      tax: country.tax || "N/A",
      duties: country.duties || "N/A",
      leadTime: country.leadTime || "N/A",
    },
  };
}

// Convert multiple Sanity countries to ServiceLocation format
export function sanityCountriesToServiceLocations(countries: SanityCountry[]) {
  return countries
    .filter((country) => country.isActive)
    .map(sanityCountryToServiceLocation);
}
