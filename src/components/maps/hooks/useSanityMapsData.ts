import { useState, useEffect } from "react";
import {
  getMapsSection,
  SanityMapsSection,
  sanityCountriesToServiceLocations,
} from "../../../lib/sanity-maps";
import { ServiceLocation } from "../types";

interface UseSanityMapsDataReturn {
  mapsSection: SanityMapsSection | null;
  serviceLocations: ServiceLocation[];
  loading: boolean;
  error: string | null;
}

export const useSanityMapsData = (): UseSanityMapsDataReturn => {
  const [mapsSection, setMapsSection] = useState<SanityMapsSection | null>(
    null,
  );
  const [serviceLocations, setServiceLocations] = useState<ServiceLocation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapsData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMapsSection();

        if (data) {
          setMapsSection(data);
          // Convert active countries to service locations format
          const activeCountries = data.countries.filter(
            (country) => country.isActive,
          );
          const locations = sanityCountriesToServiceLocations(activeCountries);
          setServiceLocations(locations);
        } else {
          setError("No active maps section found");
        }
      } catch (err) {
        console.error("Error fetching maps data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load maps data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMapsData();
  }, []);

  return {
    mapsSection,
    serviceLocations,
    loading,
    error,
  };
};
