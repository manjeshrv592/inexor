import { useRef, useCallback, useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { ServiceLocation, CountriesGeoJSON, TooltipPosition } from "../types";
import { getFlagFromCountryName } from "../../../data/countries";
import { DEBOUNCE_DELAY } from "../constants";
import styles from "../styles/Maps.module.css";

interface MapInteractionHandlerProps {
  serviceLocations: ServiceLocation[];
  countriesData: CountriesGeoJSON | null;
}

export const MapInteractionHandler = ({
  serviceLocations,
  countriesData,
}: MapInteractionHandlerProps) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentCountryRef = useRef<string>("");
  const lastMousePositionRef = useRef<TooltipPosition | null>(null);

  // Close tooltip on page scroll
  useEffect(() => {
    const handleScroll = () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
      currentCountryRef.current = "";
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simple point-in-polygon algorithm
  const isPointInPolygon = useCallback(
    (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    },
    [],
  );

  // Function to get country name from coordinates using GeoJSON data
  const getCountryFromGeoJSON = useCallback(
    (lat: number, lng: number): string => {
      if (!countriesData) return "Ocean";

      for (const feature of countriesData.features) {
        if (feature.geometry.type === "Polygon") {
          const coordinates = feature.geometry.coordinates[0];
          if (isPointInPolygon([lng, lat], coordinates)) {
            const countryName = String(
              feature.properties.name ||
                feature.properties.NAME ||
                feature.properties.NAME_LONG ||
                feature.properties.ADMIN ||
                "Unknown",
            );
            console.log("🗺️ GeoJSON properties:", feature.properties);
            return countryName;
          }
        } else if (feature.geometry.type === "MultiPolygon") {
          for (const polygon of feature.geometry.coordinates) {
            if (isPointInPolygon([lng, lat], polygon[0])) {
              const countryName = String(
                feature.properties.name ||
                  feature.properties.NAME ||
                  feature.properties.NAME_LONG ||
                  feature.properties.ADMIN ||
                  "Unknown",
              );
              console.log("🗺️ GeoJSON properties:", feature.properties);
              return countryName;
            }
          }
        }
      }

      return "Ocean";
    },
    [countriesData, isPointInPolygon],
  );

  // Create tooltip HTML
  const createTooltipHTML = useCallback(
    (
      countryName: string,
      flagUrl: string,
      serviceInfo: ServiceLocation | undefined,
    ): string => {
      return `
      <div class="${styles.tooltipContent}">
        ${
          flagUrl
            ? `<div class="${styles.flagContainer}"><img src="${flagUrl}" alt="${countryName} flag" class="${styles.countryFlag}" onerror="this.style.display='none'" /></div>`
            : ""
        }
        <div class="${styles.countryName}">${countryName}</div>
        ${
          serviceInfo
            ? `<div class="${styles.tooltipDesc}">
                <div class="${styles.tooltipDescRow}"><span class="${styles.tooltipDescLabel}">Tax:</span> <span class="${styles.tooltipDescValue}">${serviceInfo.serviceData.tax}</span></div>
                <div class="${styles.tooltipDescRow}"><span class="${styles.tooltipDescLabel}">Duties:</span> <span class="${styles.tooltipDescValue}">${serviceInfo.serviceData.duties}</span></div>
                <div class="${styles.tooltipDescRow}"><span class="${styles.tooltipDescLabel}">ELT:</span> <span class="${styles.tooltipDescValue}">${serviceInfo.serviceData.leadTime}</span></div>
              </div>`
            : `<div class="${styles.mapNa}">Service Not Available</div>`
        }
        <div class="${styles.tooltipArrow}"></div>
      </div>
    `;
    },
    [],
  );

  // Country detection and tooltip display function
  const debouncedFetchCountry = useCallback(
    async (lat: number, lng: number, clientX: number, clientY: number) => {
      try {
        const countryName = getCountryFromGeoJSON(lat, lng);
        const flagUrl =
          countryName !== "Ocean" ? getFlagFromCountryName(countryName) : "";

        if (countryName !== "Ocean") {
          console.log("Country detected:", countryName, "Flag URL:", flagUrl);

          if (flagUrl) {
            const img = new Image();
            img.onload = () =>
              console.log("✅ Flag loaded successfully:", flagUrl);
            img.onerror = () => console.log("❌ Flag failed to load:", flagUrl);
            img.src = flagUrl;
          }
        }

        if (
          currentCountryRef.current !== countryName &&
          countryName !== "Ocean"
        ) {
          currentCountryRef.current = countryName;

          if (tooltipRef.current) {
            tooltipRef.current.remove();
          }

          const serviceInfo = serviceLocations.find(
            (location) =>
              location.country.toLowerCase() === countryName.toLowerCase() ||
              (countryName.toLowerCase() === "united states" &&
                location.country === "United States") ||
              (countryName.toLowerCase() === "usa" &&
                location.country === "United States"),
          );

          const tooltip = document.createElement("div");
          tooltip.className = styles.countryTooltipFlag;
          tooltip.innerHTML = createTooltipHTML(
            countryName,
            flagUrl,
            serviceInfo,
          );

          tooltip.style.position = "fixed";
          tooltip.style.left = `${clientX}px`;
          tooltip.style.top = `${serviceInfo ? clientY - 160 : clientY - 110}px`;
          tooltip.style.transform = "translateX(-50%)";
          tooltip.style.pointerEvents = "none";
          tooltip.style.zIndex = "1000";

          document.body.appendChild(tooltip);
          tooltipRef.current = tooltip;
        } else if (countryName === "Ocean") {
          if (tooltipRef.current) {
            tooltipRef.current.remove();
            tooltipRef.current = null;
          }
          currentCountryRef.current = "";
        }
      } catch (error) {
        console.log("Error in country detection:", error);
      }
    },
    [serviceLocations, getCountryFromGeoJSON, createTooltipHTML],
  );

  const map = useMapEvents({
    mousemove: (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const { clientX, clientY } = e.originalEvent;

      lastMousePositionRef.current = { clientX, clientY };

      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      currentCountryRef.current = "";

      debounceTimeoutRef.current = setTimeout(() => {
        debouncedFetchCountry(lat, lng, clientX, clientY);
      }, DEBOUNCE_DELAY);
    },
    mouseout: () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }

      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }

      currentCountryRef.current = "";
    },
    click: (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const currentZoom = map.getZoom();
      const maxZoom = map.getMaxZoom();
      const newZoom = Math.min(currentZoom + 2, maxZoom);

      if (currentZoom < maxZoom) {
        map.setView([lat, lng], newZoom, {
          animate: true,
          duration: 0.5,
        });
      }

      map.once("zoomend", () => {
        if (lastMousePositionRef.current && tooltipRef.current) {
          const { clientX, clientY } = lastMousePositionRef.current;

          const mapContainer = map.getContainer();
          const rect = mapContainer.getBoundingClientRect();
          const containerX = clientX - rect.left;
          const containerY = clientY - rect.top;

          const newLatLng = map.containerPointToLatLng([
            containerX,
            containerY,
          ]);

          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
          }

          currentCountryRef.current = "";
          debouncedFetchCountry(newLatLng.lat, newLatLng.lng, clientX, clientY);
        }
      });
    },
  });

  return null;
};
