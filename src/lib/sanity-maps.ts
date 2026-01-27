import { client } from "../../sanity/lib/client";

export interface SanityCountry {
  _id: string;
  name: string;
  code: string;
  flag: string;
  isActive: boolean;
  tax?: string;
  duties?: string;
  leadTime?: {
    duration: number;
    unit: string;
  };
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
  subtitle?: string;
  instructionText?: string;
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
    // Fetch maps section from Sanity
    const query = `
      *[_type == "mapsSection" && isActive == true][0] {
        _id,
        title,
        subtitle,
        instructionText,
        isActive,
        mapConfig
      }
    `;

    const mapsSection = await client.fetch(
      query,
      {},
      {
        cache: 'force-cache',
        next: {
          tags: ["mapsSection"],
          revalidate: 3600
        }
      }
    );

    // Get all active countries separately
    const activeCountries = await getActiveCountries();

    if (mapsSection) {
      return {
        ...mapsSection,
        countries: activeCountries,
      };
    }

    // Fallback if no maps section found in Sanity
    return {
      _id: "default-maps-section",
      title: "GO GLOBAL. INSTANTLY.",
      subtitle: undefined,
      instructionText: "Click to interact with the map and select a continent to view service availability for your country",
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
      {
        cache: 'force-cache',
        next: {
          tags: ["countries", "maps"],
          revalidate: 3600
        }
      },
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
      {
        cache: 'force-cache',
        next: {
          tags: ["countries", "maps"],
          revalidate: 3600
        }
      },
    );
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
}

// Convert Sanity country to ServiceLocation format (for backward compatibility)
export function sanityCountryToServiceLocation(country: SanityCountry) {
  // Format leadTime from object to string with uppercase unit
  const leadTimeDisplay = country.leadTime && country.leadTime.duration && country.leadTime.unit
    ? `${country.leadTime.duration} ${country.leadTime.unit.charAt(0).toUpperCase() + country.leadTime.unit.slice(1)}`
    : "N/A";

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
      leadTime: leadTimeDisplay,
    },
  };
}

// Convert multiple Sanity countries to ServiceLocation format
export function sanityCountriesToServiceLocations(countries: SanityCountry[]) {
  return countries
    .filter((country) => country.isActive)
    .map(sanityCountryToServiceLocation);
}
