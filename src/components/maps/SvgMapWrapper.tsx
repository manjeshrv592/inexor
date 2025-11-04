"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SvgInteractiveMap = dynamic(
  () => import("./components/SvgInteractiveMap"),
  {
    ssr: false,
  },
);

interface SvgMapWrapperProps {
  mapsSection: {
    mapConfig: {
      centerLat: number;
      centerLng: number;
      zoomLevel: number;
    };
  };
  serviceLocations: Array<{
    code: string;
    coordinates: [number, number];
    country: string;
    serviceData: { tax: string; duties: string; leadTime: string };
  }>;
  onInteraction?: () => void;
}

const SvgMapWrapper: React.FC<SvgMapWrapperProps> = ({
  mapsSection,
  serviceLocations,
  onInteraction,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Lazily mount when at least 10% visible
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full min-h-[400px] w-full">
      {isVisible ? (
        <SvgInteractiveMap
          mapsSection={mapsSection}
          serviceLocations={serviceLocations}
          onInteraction={onInteraction}
        />
      ) : (
        <div className="min-h-[400px] w-full" />
      )}
    </div>
  );
};

export default SvgMapWrapper;
