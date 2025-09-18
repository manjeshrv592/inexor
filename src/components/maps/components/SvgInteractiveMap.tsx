"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { ZoomIn, ZoomOut, Home, ArrowLeft } from "lucide-react";
import type { GeoJsonProperties, FeatureCollection, Geometry } from "geojson";
import { SVG_MAP_CONFIG } from "../constants/svgMapConstants";
import {
  isCountryInContinent,
  getCountryContinent,
  zoomToContinent,
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
}

const SvgInteractiveMap: React.FC<SvgInteractiveMapProps> = ({
  serviceLocations,
  mapsSection,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("continents");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(SVG_MAP_CONFIG.initialZoom);
  const [currentTransform, setCurrentTransform] = useState<{
    x: number;
    y: number;
    k: number;
  }>({ x: SVG_MAP_CONFIG.initialX, y: SVG_MAP_CONFIG.initialY, k: SVG_MAP_CONFIG.initialZoom });
  const isTransitioningRef = useRef(false);
  
  const svgElementRef = useRef<any>(null);
  const projectionRef = useRef<any>(null);
  const zoomBehaviorRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Map dimensions from config
  const { width, height } = SVG_MAP_CONFIG;

  useEffect(() => {
    // Load GeoJSON data
    const loadGeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(SVG_MAP_CONFIG.dataUrl);
        if (!response.ok) {
          throw new Error("Failed to load GeoJSON data");
        }
        const countries: GeoJSONData = await response.json();
        setGeoData(countries);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadGeoData();
  }, []);

  // Create tooltip HTML
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
                <div class="${styles.tooltipDescRow}"><span class="${styles.tooltipDescLabel}">Lead time:</span> <span class="${styles.tooltipDescValue}">${serviceInfo.serviceData.leadTime}</span></div>
              </div>`
            : `<div class="${styles.mapNa}">Service Not Available</div>`
        }
        <div class="${styles.tooltipArrow}"></div>
      </div>
    `;
  };

  // Show tooltip function
  const showTooltip = useCallback((countryName: string, event: any) => {
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
  }, [serviceLocations]);

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
    svg.selectAll("*").remove(); // Clear previous render

    // Set up projection
    const projection = geoNaturalEarth1()
      .scale(150)
      .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    // Create main group for zoom/pan
    const g = svg.append("g");

    // Set up zoom behavior
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent(SVG_MAP_CONFIG.zoomExtent)
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        
        // Update service dot sizes to maintain consistent visual size
        g.selectAll("circle").attr("r", 3 / event.transform.k);
        
        // Update country border widths to maintain consistent 1px appearance
        g.selectAll("path").attr("stroke-width", 1 / event.transform.k);
        
        // Update zoom level and transform state
        setCurrentZoomLevel(event.transform.k);
        setCurrentTransform({
          x: event.transform.x,
          y: event.transform.y,
          k: event.transform.k,
        });
      });

    svg.call(zoomBehavior);

    // Set initial zoom level with optimal positioning
    svg.call(
      zoomBehavior.transform,
      zoomIdentity
        .translate(SVG_MAP_CONFIG.initialX, SVG_MAP_CONFIG.initialY)
        .scale(SVG_MAP_CONFIG.initialZoom)
    );

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
      .attr("fill", (d: any) => {
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
      .attr("stroke", (d: any) => {
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
      .on("mouseenter", function (event, d: any) {
        const countryName = d.properties?.NAME || "";
        const continent = getCountryContinent(countryName);

        if (viewMode === "continents") {
          // In continent view: highlight entire continent on hover
          if (continent) {
            g.selectAll("path").each(function (pathData: any) {
              const pathCountryName = pathData.properties?.NAME || "";
              if (isCountryInContinent(pathCountryName, continent)) {
                // Hovered continent becomes lighter
                select(this).attr("fill", "#5a5a5a").attr("stroke", "#5a5a5a");
              } else {
                // Non-hovered continents become darker
                select(this).attr("fill", "#1a1a1a").attr("stroke", "#1a1a1a");
              }
            });
            setHoveredItem(continent);
          }
        } else {
          // In country view: highlight individual country
          if (selectedContinent && isCountryInContinent(countryName, selectedContinent)) {
            if (hasServiceData(countryName, serviceLocations)) {
              // Active country hover - no visual changes, only tooltip
              // Keep original colors and border width
            } else {
              // Regular country hover - lighter fill, keep original border width
              select(this).attr("fill", "#5a5a5a").attr("stroke", "#050505");
            }
            setHoveredItem(countryName);
            // Show tooltip only for countries in selected continent
            showTooltip(countryName, event);
            
            // Add mousemove listener to make tooltip follow cursor
            const handleMouseMove = (moveEvent: MouseEvent) => {
              if (tooltipRef.current && !isTransitioningRef.current) {
                const serviceInfo = getServiceData(countryName, serviceLocations);
                tooltipRef.current.style.left = `${moveEvent.clientX}px`;
                tooltipRef.current.style.top = `${serviceInfo ? moveEvent.clientY - 160 : moveEvent.clientY - 110}px`;
              }
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            
            // Store the cleanup function
            (this as any).__mouseMoveHandler = handleMouseMove;
          }
        }
      })
      .on("mouseleave", function () {
        if (viewMode === "continents") {
          // Reset all countries to initial continent view color
          g.selectAll("path").attr("fill", "#3a3a3a").attr("stroke", "#3a3a3a");
        } else {
          // Reset individual country
          const d: any = select(this).datum();
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
            if ((this as any).__mouseMoveHandler) {
              document.removeEventListener('mousemove', (this as any).__mouseMoveHandler);
              delete (this as any).__mouseMoveHandler;
            }
          } else {
            select(this).attr("fill", "#1a202c").attr("stroke", "#1a202c").attr("stroke-width", 1);
          }
        }
        setHoveredItem(null);
      })
      .on("click", function (_, d: any) {
        const countryName = d.properties?.NAME || "";
        const continent = getCountryContinent(countryName);

        if (continent) {
          if (viewMode === "continents") {
            // Switch to country view for the clicked continent
            setSelectedContinent(continent);
            setViewMode("countries");
            setHoveredItem(null);
            hideTooltip();
            isTransitioningRef.current = true;

            // Zoom to the continent using optimal coordinates
            setTimeout(() => {
              if (svgElementRef.current && zoomBehaviorRef.current) {
                zoomToContinent(
                  continent,
                  svgElementRef.current,
                  zoomBehaviorRef.current
                );
                // End transition after zoom completes
                setTimeout(() => { isTransitioningRef.current = false; }, 750);
              }
            }, 100);
          } else if (viewMode === "countries" && continent !== selectedContinent) {
            // Switch to different continent in country view
            setSelectedContinent(continent);
            setHoveredItem(null);
            hideTooltip();
            isTransitioningRef.current = true;

            // Zoom to the new continent using optimal coordinates
            setTimeout(() => {
              if (svgElementRef.current && zoomBehaviorRef.current) {
                zoomToContinent(
                  continent,
                  svgElementRef.current,
                  zoomBehaviorRef.current
                );
                // End transition after zoom completes
                setTimeout(() => { isTransitioningRef.current = false; }, 750);
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
          const coords = projection([location.coordinates[1], location.coordinates[0]]);
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
  ]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#050505" }}>
        <div className="text-white text-xl">Loading map data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#050505" }}>
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ backgroundColor: "#050505" }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="w-full h-full"
        style={{ background: "#050505" }}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Item name tooltip */}
      {hoveredItem && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="font-semibold">{hoveredItem}</div>
        </div>
      )}

      {/* View mode indicator and back button */}
      <div className="absolute top-4 left-4 text-white px-3 py-2 rounded-lg shadow-lg" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="flex items-center gap-3">
          <div className="text-sm">
            {viewMode === "continents"
              ? "Continent View"
              : `${selectedContinent} Countries`}
          </div>
          {/* <div className="text-xs text-gray-300 flex flex-col gap-1">
            <div>Zoom: {currentZoomLevel.toFixed(1)}x</div>
            <div>X: {currentTransform.x.toFixed(0)}</div>
            <div>Y: {currentTransform.y.toFixed(0)}</div>
          </div> */}
          {viewMode === "countries" && (
            <button
              onClick={() => {
                setViewMode("continents");
                setSelectedContinent(null);
                setHoveredItem(null);
                hideTooltip();
                isTransitioningRef.current = true;

                // Reset zoom to initial optimal view
                setTimeout(() => {
                  if (svgElementRef.current && zoomBehaviorRef.current) {
                    resetToInitialView(svgElementRef.current, zoomBehaviorRef.current);
                    // End transition after zoom completes
                    setTimeout(() => { isTransitioningRef.current = false; }, 750);
                  }
                }, 100);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Back to Continents
            </button>
          )}
        </div>
      </div>

      {/* Zoom Controls with Lucide Icons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => {
            if (svgElementRef.current && zoomBehaviorRef.current) {
              svgElementRef.current
                .transition()
                .duration(300)
                .call(zoomBehaviorRef.current.scaleBy, 1.5);
            }
          }}
          className="text-white p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: "#1a1a1a" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2a2a2a"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1a1a1a"}
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>

        <button
          onClick={() => {
            if (svgElementRef.current && zoomBehaviorRef.current) {
              svgElementRef.current
                .transition()
                .duration(300)
                .call(zoomBehaviorRef.current.scaleBy, 0.75);
            }
          }}
          className="text-white p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: "#1a1a1a" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2a2a2a"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1a1a1a"}
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>

        <button
          onClick={() => {
            // Hide tooltip and set transition state immediately
            hideTooltip();
            setHoveredItem(null);
            isTransitioningRef.current = true;
            
            // Start zoom transition immediately
            if (svgElementRef.current && zoomBehaviorRef.current) {
              resetToInitialView(svgElementRef.current, zoomBehaviorRef.current);
            }
            
            // Delay state changes to avoid re-render during transition
            setTimeout(() => {
              setViewMode("continents");
              setSelectedContinent(null);
              // End transition after zoom completes
              setTimeout(() => { isTransitioningRef.current = false; }, 750);
            }, 100);
          }}
          className="text-white p-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: "#1a1a1a" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2a2a2a"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1a1a1a"}
          title="Return to Continent View"
        >
          <Home size={20} />
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
