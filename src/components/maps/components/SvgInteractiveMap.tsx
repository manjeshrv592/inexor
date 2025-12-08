"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { geoPath, geoMercator } from "d3-geo";
import { zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { feature as topojsonFeature } from "topojson-client";
import { ZoomIn, ZoomOut, Home /* , ArrowLeft */ } from "lucide-react";
import type {
  GeoJsonProperties,
  FeatureCollection,
  Geometry,
  Feature,
} from "geojson";
import type { Selection, BaseType } from "d3-selection";
import type { ZoomBehavior } from "d3-zoom";
import type { GeoProjection } from "d3-geo";
// Removed d3-transition import to avoid typing issues
import { SVG_MAP_CONFIG } from "../constants/svgMapConstants";
import {
  isCountryInContinent,
  getCountryContinent,
  zoomToContinentAuto,
  resetToInitialView,
  hasServiceData,
  getServiceData,
} from "../utils/svgMapUtils";
import { getFlagFromCountryName } from "../../../data/countries";
import styles from "../styles/Maps.module.css";

type GeoJSONData = FeatureCollection<Geometry, GeoJsonProperties>;
type ViewMode = "continents" | "countries";

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

interface SvgInteractiveMapProps {
  serviceLocations: ServiceLocation[];
  mapsSection: {
    mapConfig: {
      centerLat: number;
      centerLng: number;
      zoomLevel: number;
    };
  };
  onInteraction?: () => void;
}

const SvgInteractiveMap: React.FC<SvgInteractiveMapProps> = ({
  serviceLocations,
  onInteraction,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  // Removed hoveredItem state - no longer needed after removing debug tooltip
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("continents");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null,
  );
  // Removed unused state variables: currentZoomLevel and currentTransform
  const isTransitioningRef = useRef(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  
  // Touch device interaction states
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMapEnabled, setIsMapEnabled] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const svgElementRef = useRef<Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  > | null>(null);
  const projectionRef = useRef<GeoProjection | null>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(
    null,
  );
  // Track current zoom/pan transform to preserve viewport across re-renders
  const currentTransformRef = useRef(zoomIdentity);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  
  // SVG path generation for button styling (matching design system)
  const generateButtonSVGPath = (width: number, height: number) => {
    const rightCutRatio = 8 / 32; // Increased cut size
    const leftCutRatio = 8 / 32;  // Increased cut size
    const strokeWidth = 1;
    
    const rightCutAngle = rightCutRatio * height;
    const leftCutAngle = leftCutRatio * height;
    const halfStroke = strokeWidth / 2;
    
    return [
      `M${halfStroke} ${halfStroke}`,
      `L${width - rightCutAngle} ${halfStroke}`,
      `L${width - halfStroke} ${rightCutAngle}`,
      `L${width - halfStroke} ${height - halfStroke}`,
      `L${leftCutAngle} ${height - halfStroke}`,
      `L${halfStroke} ${height - leftCutAngle}`,
      `L${halfStroke} ${halfStroke}Z`,
    ].join("");
  };

  // Map dimensions from config
  const { width, height } = SVG_MAP_CONFIG;

  // Touch device detection and viewport intersection logic
  useEffect(() => {
    
    // Detect if device supports touch
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsTouchDevice(hasTouch);
      
      // On touch devices, start with map disabled
      if (hasTouch) {
        setIsMapEnabled(false);
      } else {
        setIsMapEnabled(true);
      }
    };

    checkTouchDevice();

  }, []);

  // Separate useEffect for IntersectionObserver with delay
  useEffect(() => {
    
    // Only set up observer on touch devices
    if (!isTouchDevice) {
      return;
    }

    // Add a delay to ensure DOM is ready
    const setupObserver = (): IntersectionObserver | null => {
      if (!mapContainerRef.current) {
        return null;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          
          // If map is completely out of viewport, disable it and reset to continent mode
          if (entry.intersectionRatio === 0 && !entry.isIntersecting) {
            setIsMapEnabled(false);
            setViewMode("continents");
            setSelectedContinent(null);
          }
        },
        {
          threshold: [0, 0.1], // Trigger when completely out and when 10% visible
          rootMargin: '0px', // No margin
        }
      );

      observer.observe(mapContainerRef.current);
      return observer;
    };

    // Try immediately first
    let observer: IntersectionObserver | null = setupObserver() || null;
    
    // If failed, retry with delays
    let timeoutId: NodeJS.Timeout | undefined;
    if (!observer) {
      timeoutId = setTimeout(() => {
        observer = setupObserver() || null;
        if (!observer) {
          // Try one more time after longer delay
          setTimeout(() => {
            observer = setupObserver() || null;
          }, 1000);
        }
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [isTouchDevice]);

  // Simple hover handlers for tooltip
  const handleMouseEnter = () => {
    setShowInfoTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowInfoTooltip(false);
  };

  useEffect(() => {
    // Load TopoJSON or GeoJSON data with progressive resolution swap
    const parseAndProcess = (raw: unknown): GeoJSONData => {
      const isTopology =
        typeof raw === "object" &&
        raw !== null &&
        "type" in raw &&
        (raw as { type?: string }).type === "Topology";

      let countries: GeoJSONData;
      if (isTopology) {
        const topo = raw as { type: string; objects: Record<string, unknown> };
        const countriesObject = topo.objects["countries"];
        countries = topojsonFeature(topo, countriesObject) as GeoJSONData;
      } else {
        countries = raw as GeoJSONData;
      }

      const processedFeatures: Feature<Geometry, GeoJsonProperties>[] = [];

      for (const feature of countries.features) {
        const countryName = feature.properties?.name || feature.properties?.NAME || "";

        if (countryName === "France" && feature.geometry.type === "MultiPolygon") {
          const coordinates = feature.geometry.coordinates;
          coordinates.forEach((polygon) => {
            if (polygon[0] && polygon[0][0]) {
              const firstCoord = polygon[0][0];
              const newFeature = {
                ...feature,
                geometry: { type: "Polygon", coordinates: polygon },
              } as Feature<Geometry, GeoJsonProperties>;

              if (firstCoord[0] < -30) {
                newFeature.properties = { ...feature.properties, NAME: "French Guiana", name: "French Guiana" };
              } else {
                newFeature.properties = { ...feature.properties, NAME: "France", name: "France" };
              }
              processedFeatures.push(newFeature);
            }
          });
        } else if (countryName === "Russia" && feature.geometry.type === "MultiPolygon") {
          const coordinates = feature.geometry.coordinates;
          coordinates.forEach((polygon) => {
            if (polygon[0] && polygon[0][0]) {
              const firstCoord = polygon[0][0];
              const newFeature = {
                ...feature,
                geometry: { type: "Polygon", coordinates: polygon },
              } as Feature<Geometry, GeoJsonProperties>;

              if (firstCoord[0] > 10 && firstCoord[0] < 30) {
                newFeature.properties = { ...feature.properties, NAME: "Kaliningrad", name: "Kaliningrad" };
              } else {
                newFeature.properties = { ...feature.properties, NAME: "Russia", name: "Russia" };
              }
              processedFeatures.push(newFeature);
            }
          });
        } else {
          processedFeatures.push(feature);
        }
      }

      return { ...countries, features: processedFeatures };
    };

    const loadGeoData = async () => {
      try {

        const lowUrl = SVG_MAP_CONFIG.lowResDataUrl || SVG_MAP_CONFIG.dataUrl;
        const highUrl = SVG_MAP_CONFIG.highResDataUrl || SVG_MAP_CONFIG.dataUrl;

        let lowResData: GeoJSONData | null = null;
        try {
          const lowResResp = await fetch(lowUrl, { cache: "force-cache" });
          if (lowResResp.ok) {
            const lowRaw = await lowResResp.json();
            lowResData = parseAndProcess(lowRaw);
            setGeoData(lowResData);
          }
        } catch {
          // Ignore; will fall back to high-res
        }

        try {
          const highResResp = await fetch(highUrl, { cache: "force-cache" });
          if (highResResp.ok) {
            const highRaw = await highResResp.json();
            const highResData = parseAndProcess(highRaw);

            if (!lowResData) {
              setGeoData(highResData);
            } else if (SVG_MAP_CONFIG.enableProgressiveSwap) {
              setGeoData(highResData);
            }
          }
        } catch (err) {
          if (!lowResData) {
            setError(err instanceof Error ? err.message : "Unknown error occurred");
          }
        }
      } finally {
        // no-op
      }
    };

    loadGeoData();
  }, []);

  // Create tooltip HTML for countries
  const createTooltipHTML = (
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
  };

  // Create simple tooltip HTML for continents
  const createContinentTooltipHTML = (continentName: string): string => {
    return `
      <div class="${styles.tooltipContent}">
        <div class="${styles.countryName}">${continentName}</div>
        <div class="${styles.tooltipArrow}"></div>
      </div>
    `;
  };

  // Show tooltip function for countries
  const showTooltip = useCallback(
    (countryName: string, event: MouseEvent) => {
      // Don't show tooltip during transitions
      if (isTransitioningRef.current) {
        return;
      }

      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }

      const flagUrl = getFlagFromCountryName(countryName);
      const serviceInfo = getServiceData(countryName, serviceLocations);

      const tooltip = document.createElement("div");
      tooltip.className = styles.countryTooltipFlag;
      tooltip.innerHTML = createTooltipHTML(countryName, flagUrl, serviceInfo);

      tooltip.style.position = "fixed";
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${serviceInfo ? event.clientY - 160 : event.clientY - 110}px`;
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "1000";

      document.body.appendChild(tooltip);
      tooltipRef.current = tooltip;
    },
    [serviceLocations],
  );

  // Show tooltip function for continents
  const showContinentTooltip = useCallback(
    (continentName: string, event: MouseEvent) => {
      // Don't show tooltip during transitions
      if (isTransitioningRef.current) {
        return;
      }

      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }

      const tooltip = document.createElement("div");
      tooltip.className = styles.countryTooltipFlag;
      tooltip.innerHTML = createContinentTooltipHTML(continentName);

      tooltip.style.position = "fixed";
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY - 20}px`; // Position very close to cursor
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "1000";

      document.body.appendChild(tooltip);
      tooltipRef.current = tooltip;
    },
    [],
  );

  // Hide tooltip function
  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.remove();
      tooltipRef.current = null;
    }
  };

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = select(svgRef.current);
    // Snapshot current transform to preserve viewport on re-render
    const prevTransform = currentTransformRef.current;
    svg.selectAll("*").remove(); // Clear previous render

    // Set up projection - using Mercator like Google Maps
    // Mercator projection preserves angles and shapes, perfect for web maps
    const projection = geoMercator()
      .scale(160) // Increased scale for larger map
      .translate([width / 2, height / 2 + 80]) // Adjusted translation for better centering
      .precision(0.1);

    const pathGenerator = geoPath().projection(projection);

    // Create main group for zoom/pan
    const g = svg.append("g");

    // Set up zoom behavior with scroll wheel disabled
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent(SVG_MAP_CONFIG.zoomExtent)
      .filter((event) => {
        
        // On touch devices, disable all zoom/pan when map is disabled
        if (isTouchDevice && !isMapEnabled) {
          return false;
        }
        
        // Allow trackpad pinch gestures (they have ctrlKey modifier)
        if (event.type === "wheel" && event.ctrlKey) {
          return true;
        }
        // Block regular scroll wheel events to allow page scrolling
        if (event.type === "wheel") {
          return false;
        }
        // Allow other zoom events (programmatic zoom from buttons, touch gestures)
        return true;
      })
      .on("start", () => {
        // Hide tooltip when user starts dragging/panning the map
        hideTooltip();
      })
      .on("zoom", (event) => {
        g.attr("transform", event.transform);

        // Update service dot sizes to maintain consistent visual size
        g.selectAll("circle").attr("r", 3 / event.transform.k);

        // Update country border widths to maintain consistent 1px appearance
        g.selectAll("path").attr("stroke-width", 1 / event.transform.k);

        // Track current transform for re-application on redraws
        currentTransformRef.current = event.transform;
      });

    svg.call(zoomBehavior);

    // Reapply previous transform if present; otherwise set initial view
    if (
      prevTransform &&
      (prevTransform.k !== 1 || prevTransform.x !== 0 || prevTransform.y !== 0)
    ) {
      svg.call(zoomBehavior.transform, prevTransform);
    } else {
      svg.call(
        zoomBehavior.transform,
        zoomIdentity
          .translate(SVG_MAP_CONFIG.initialX, SVG_MAP_CONFIG.initialY)
          .scale(SVG_MAP_CONFIG.initialZoom),
      );
    }

    // Store references for zoom functionality
    svgElementRef.current = svg;
    projectionRef.current = projection;
    zoomBehaviorRef.current = zoomBehavior;

    // Add countries with color-based continent logic
    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", (d: Feature<Geometry, GeoJsonProperties>) => {
        const countryName = d.properties?.NAME || "";

        if (viewMode === "continents") {
          // In continent view: initial color for all countries
          return "#3a3a3a"; // Initial continent color
        } else if (viewMode === "countries" && selectedContinent) {
          // In country view: show only countries from selected continent
          if (isCountryInContinent(countryName, selectedContinent)) {
            if (hasServiceData(countryName, serviceLocations)) {
              return "#1a0f05"; // Active countries with services - dark fill with stronger orange tint
            }
            return "#3a3a3a"; // Countries without services - uniform color
          } else {
            return "#1a202c"; // Hide other countries
          }
        }
        return "#4a5568";
      })
      .attr("stroke", (d: Feature<Geometry, GeoJsonProperties>) => {
        const countryName = d.properties?.NAME || "";

        if (viewMode === "continents") {
          return "#3a3a3a"; // Match initial continent color
        } else if (viewMode === "countries" && selectedContinent) {
          if (isCountryInContinent(countryName, selectedContinent)) {
            if (hasServiceData(countryName, serviceLocations)) {
              return "#f65009"; // Active countries with services - brand orange border
            }
            return "#050505"; // Countries without services - dark border
          } else {
            return "#1a202c"; // Hide other countries - match fill color (no visible border)
          }
        }
        return "#2d3748";
      })
      .attr("stroke-width", 1)
      .attr("cursor", "pointer")
      .style("transition", "fill 0.3s ease, stroke 0.3s ease")
      .on(
        "mouseenter",
        function (event, d: Feature<Geometry, GeoJsonProperties>) {
          const countryName = d.properties?.NAME || "";
          const continent = getCountryContinent(countryName);

          if (viewMode === "continents") {
            // In continent view: highlight entire continent on hover
            if (continent) {
              g.selectAll("path").each(function (
                this: BaseType,
                pathData: unknown,
              ) {
                const feature = pathData as Feature<
                  Geometry,
                  GeoJsonProperties
                >;
                const pathCountryName = feature.properties?.NAME || "";
                if (isCountryInContinent(pathCountryName, continent)) {
                  // Hovered continent becomes lighter
                  select(this)
                    .attr("fill", "#5a5a5a")
                    .attr("stroke", "#5a5a5a");
                } else {
                  // Non-hovered continents become darker
                  select(this)
                    .attr("fill", "#1a1a1a")
                    .attr("stroke", "#1a1a1a");
                }
              });
              // Removed setHoveredItem - no longer needed
              // Show continent tooltip
              showContinentTooltip(continent, event);

              // Add mousemove listener to make tooltip follow cursor
              const handleMouseMove = (moveEvent: MouseEvent) => {
                if (tooltipRef.current && !isTransitioningRef.current) {
                  tooltipRef.current.style.left = `${moveEvent.clientX}px`;
                  tooltipRef.current.style.top = `${moveEvent.clientY - 40}px`;
                }
              };

              document.addEventListener("mousemove", handleMouseMove);

              // Store the cleanup function
              (
                this as Element & {
                  __mouseMoveHandler?: (event: MouseEvent) => void;
                }
              ).__mouseMoveHandler = handleMouseMove;
            }
          } else {
            // In country view: highlight individual country
            if (
              selectedContinent &&
              isCountryInContinent(countryName, selectedContinent)
            ) {
              if (hasServiceData(countryName, serviceLocations)) {
                // Active country hover - no visual changes, only tooltip
                // Keep original colors and border width
              } else {
                // Regular country hover - lighter fill, keep original border width
                select(this).attr("fill", "#5a5a5a").attr("stroke", "#050505");
              }
              // Removed setHoveredItem - no longer needed
              // Show tooltip only for countries in selected continent
              showTooltip(countryName, event);

              // Add mousemove listener to make tooltip follow cursor
              const handleMouseMove = (moveEvent: MouseEvent) => {
                if (tooltipRef.current && !isTransitioningRef.current) {
                  const serviceInfo = getServiceData(
                    countryName,
                    serviceLocations,
                  );
                  tooltipRef.current.style.left = `${moveEvent.clientX}px`;
                  tooltipRef.current.style.top = `${serviceInfo ? moveEvent.clientY - 160 : moveEvent.clientY - 110}px`;
                }
              };

              document.addEventListener("mousemove", handleMouseMove);

              // Store the cleanup function
              (
                this as Element & {
                  __mouseMoveHandler?: (event: MouseEvent) => void;
                }
              ).__mouseMoveHandler = handleMouseMove;
            }
          }
        },
      )
      .on("mouseleave", function () {
        if (viewMode === "continents") {
          // Reset all countries to initial continent view color
          g.selectAll("path").attr("fill", "#3a3a3a").attr("stroke", "#3a3a3a");
          // Hide continent tooltip
          hideTooltip();

          // Clean up mousemove listener
          const element = this as Element & {
            __mouseMoveHandler?: (event: MouseEvent) => void;
          };
          if (element.__mouseMoveHandler) {
            document.removeEventListener(
              "mousemove",
              element.__mouseMoveHandler,
            );
            delete element.__mouseMoveHandler;
          }
        } else {
          // Reset individual country
          const d = select(this).datum() as Feature<
            Geometry,
            GeoJsonProperties
          >;
          const countryName = d.properties?.NAME || "";
          if (
            selectedContinent &&
            isCountryInContinent(countryName, selectedContinent)
          ) {
            if (hasServiceData(countryName, serviceLocations)) {
              // Active country - no visual reset needed since no visual changes were made on hover
              // Keep original colors and border width
            } else {
              // Reset regular country - uniform fill with dark border, keep original border width
              select(this).attr("fill", "#3a3a3a").attr("stroke", "#050505");
            }
            // Only hide tooltip for countries in selected continent
            hideTooltip();

            // Clean up mousemove listener
            const element = this as Element & {
              __mouseMoveHandler?: (event: MouseEvent) => void;
            };
            if (element.__mouseMoveHandler) {
              document.removeEventListener(
                "mousemove",
                element.__mouseMoveHandler,
              );
              delete element.__mouseMoveHandler;
            }
          } else {
            select(this)
              .attr("fill", "#1a202c")
              .attr("stroke", "#1a202c")
              .attr("stroke-width", 1);
          }
        }
        // Removed setHoveredItem - no longer needed
      })
      .on("click", function (event, d: Feature<Geometry, GeoJsonProperties>) {
        const countryName = d.properties?.NAME || "";
        const continent = getCountryContinent(countryName);

        // Capture current cursor position for tooltip positioning after transition
        const currentCursorX = event.clientX;
        const currentCursorY = event.clientY;

        // Trigger interaction callback to hide instruction tooltip
        onInteraction?.();

        if (continent) {
          
          // On touch devices, enable map interaction when continent is clicked
          if (isTouchDevice && !isMapEnabled) {
            setIsMapEnabled(true);
          }
          
          if (viewMode === "continents") {
            // Switch to country view for the clicked continent
            setSelectedContinent(continent);
            setViewMode("countries");
            // Removed setHoveredItem - no longer needed
            hideTooltip();
            isTransitioningRef.current = true;

            // Zoom to the continent using auto-calculated center
            setTimeout(() => {
              if (
                svgElementRef.current &&
                zoomBehaviorRef.current &&
                projectionRef.current &&
                geoData
              ) {
                zoomToContinentAuto(
                  continent,
                  geoData,
                  projectionRef.current,
                  svgElementRef.current,
                  zoomBehaviorRef.current,
                );
                // End transition after zoom completes
                setTimeout(() => {
                  isTransitioningRef.current = false;

                  // Fix: Force re-evaluation of hover state after transition
                  // This solves the tooltip issue when cursor is already over a country
                  if (svgElementRef.current) {
                    const allPaths = svgElementRef.current.selectAll("path");
                    allPaths.each(function () {
                      const element = this as SVGPathElement;
                      // Check if this element is currently being hovered
                      if (element.matches(":hover")) {
                        // Trigger mouseenter event manually using the captured cursor position
                        const enterEvent = new MouseEvent("mouseenter", {
                          clientX: currentCursorX,
                          clientY: currentCursorY,
                          bubbles: true,
                        });
                        element.dispatchEvent(enterEvent);
                      }
                    });
                  }
                }, 750);
              }
            }, 100);
          } else if (
            viewMode === "countries" &&
            continent !== selectedContinent
          ) {
            // Switch to different continent in country view
            setSelectedContinent(continent);
            // Removed setHoveredItem - no longer needed
            hideTooltip();
            isTransitioningRef.current = true;

            // Zoom to the new continent using auto-calculated center
            setTimeout(() => {
              if (
                svgElementRef.current &&
                zoomBehaviorRef.current &&
                projectionRef.current &&
                geoData
              ) {
                zoomToContinentAuto(
                  continent,
                  geoData,
                  projectionRef.current,
                  svgElementRef.current,
                  zoomBehaviorRef.current,
                );
                // End transition after zoom completes
                setTimeout(() => {
                  isTransitioningRef.current = false;
                }, 750);
              }
            }, 100);
          }
        }
      });

    // Add service location markers (only in country view for selected continent)
    if (viewMode === "countries" && selectedContinent) {
      serviceLocations.forEach((location) => {
        // Only show markers for countries in the selected continent
        if (isCountryInContinent(location.country, selectedContinent)) {
          const coords = projection([
            location.coordinates[1],
            location.coordinates[0],
          ]);
          if (coords) {
            g.append("circle")
              .attr("cx", coords[0])
              .attr("cy", coords[1])
              .attr("r", 3) // Increased radius for better visibility
              .attr("fill", "#f65009")
              .style("cursor", "pointer")
              .on("mouseenter", function (event) {
                showTooltip(location.country, event);
              })
              .on("mouseleave", function () {
                hideTooltip();
              });
          }
        }
      });
    }

    // Store references for React-based zoom controls
    svgElementRef.current = svg;
    zoomBehaviorRef.current = zoomBehavior;
  }, [
    geoData,
    viewMode,
    selectedContinent,
    serviceLocations,
    width,
    height,
    showTooltip,
    showContinentTooltip,
    onInteraction,
    isTouchDevice,
    isMapEnabled,
  ]);

  if (error) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{ backgroundColor: "#050505" }}
      >
        <div className="text-xl text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className="relative h-full w-full"
      style={{ backgroundColor: "#050505" }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="h-full w-full"
        style={{ background: "#050505" }}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      />


      {/* Debugging tooltip removed - country names are shown in main tooltip */}

      {/* View mode indicator and back button - commented out continent view text and button - can be uncommented when needed in future */}

      {/* Info icon tooltip in right corner */}
      <div className="absolute top-2 right-2 z-20">
        <div className="relative">
          <div
            className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              className="h-5 w-5 text-white duration-300 group-hover:text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Tooltip */}
          {showInfoTooltip && (
            <div className="absolute top-1/2 right-full mr-2 -translate-y-1/2 transform transition-all duration-300">
              <div className="relative">
                <div className="rounded-lg bg-[#1a1a1a]/90 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg backdrop-blur-sm">
                  Interactive map
                </div>
                {/* Arrow pointing right */}
                <div className="absolute top-1/2 left-full -translate-y-1/2 transform">
                  <div
                    className="h-0 w-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent"
                    style={{ borderLeftColor: "#1a1a1a" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zoom Controls with SVG Cut Shape */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-2">
        {/* Zoom In Button */}
        <button
          onClick={() => {
            onInteraction?.();
            if (svgElementRef.current && zoomBehaviorRef.current) {
              svgElementRef.current.call(zoomBehaviorRef.current.scaleBy, 1.5);
            }
          }}
          className="relative p-1.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer border-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
          title="Zoom In"
        >
          {/* SVG Background with Cut Shape */}
          <span className="pointer-events-none absolute inset-0 z-[1]">
            <svg
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-200 ease-in-out"
            >
              <path
                d={generateButtonSVGPath(36, 36)}
                fill="#1a1a1a"
                stroke="#4A4A4A"
                strokeWidth={1}
                strokeLinejoin="round"
                strokeLinecap="round"
                className="transition-all duration-200 ease-in-out group-hover:fill-[#2a2a2a]"
              />
            </svg>
          </span>
          <span className="relative z-[2]">
            <ZoomIn size={20} strokeWidth={1.5} />
          </span>
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={() => {
            onInteraction?.();
            if (svgElementRef.current && zoomBehaviorRef.current) {
              svgElementRef.current.call(zoomBehaviorRef.current.scaleBy, 0.75);
            }
          }}
          className="relative p-1.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer border-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
          title="Zoom Out"
        >
          {/* SVG Background with Cut Shape */}
          <span className="pointer-events-none absolute inset-0 z-[1]">
            <svg
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-200 ease-in-out"
            >
              <path
                d={generateButtonSVGPath(36, 36)}
                fill="#1a1a1a"
                stroke="#4A4A4A"
                strokeWidth={1}
                strokeLinejoin="round"
                strokeLinecap="round"
                className="transition-all duration-200 ease-in-out group-hover:fill-[#2a2a2a]"
              />
            </svg>
          </span>
          <span className="relative z-[2]">
            <ZoomOut size={20} strokeWidth={1.5} />
          </span>
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            
            onInteraction?.();
            hideTooltip();
            isTransitioningRef.current = true;

            // On touch devices, disable map interaction when reset is clicked
            if (isTouchDevice) {
              setIsMapEnabled(false);
            }

            if (svgElementRef.current && zoomBehaviorRef.current) {
              resetToInitialView(
                svgElementRef.current,
                zoomBehaviorRef.current,
              );
            }

            setTimeout(() => {
              setViewMode("continents");
              setSelectedContinent(null);
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 750);
            }, 100);
          }}
          className="relative p-1.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer border-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
          title="Return to Continent View"
        >
          {/* SVG Background with Cut Shape */}
          <span className="pointer-events-none absolute inset-0 z-[1]">
            <svg
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-200 ease-in-out"
            >
              <path
                d={generateButtonSVGPath(36, 36)}
                fill="#1a1a1a"
                stroke="#4A4A4A"
                strokeWidth={1}
                strokeLinejoin="round"
                strokeLinecap="round"
                className="transition-all duration-200 ease-in-out group-hover:fill-[#2a2a2a]"
              />
            </svg>
          </span>
          <span className="relative z-[2]">
            <Home size={20} strokeWidth={1.5} />
          </span>
        </button>
      </div>

      {/* Instructions */}
      {/* <div className="absolute bottom-4 left-4 text-white px-3 py-2 rounded-lg shadow-lg text-sm" style={{ backgroundColor: "#1a1a1a" }}>
        {viewMode === "continents" ? (
          <>
            <div>• Hover over continents to see names</div>
            <div>• Click on a continent to view its countries</div>
            <div>• Use mouse wheel to zoom</div>
            <div>• Click and drag to pan</div>
          </>
        ) : (
          <>
            <div>• Hover over countries to see service details</div>
            <div>• Orange dots show service locations</div>
            <div>• Use mouse wheel to zoom</div>
            <div>• Click and drag to pan</div>
            <div>• Click "Back to Continents" to return</div>
          </>
        )}
      </div> */}
    </div>
  );
};

export default SvgInteractiveMap;
