import { useState, useEffect } from "react";
import { CountriesGeoJSON } from "../types";
import { COUNTRIES_GEOJSON_URL } from "../constants";

export const useCountriesData = () => {
  const [countriesData, setCountriesData] = useState<CountriesGeoJSON | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(COUNTRIES_GEOJSON_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }

        const data = await response.json();
        setCountriesData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error loading countries data:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, []);

  return { countriesData, loading, error };
};
