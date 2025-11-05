"use client";

import { useEffect } from "react";

export default function MapPrewarm() {
  useEffect(() => {
    // Preload the interactive map chunk directly (pulls in D3 libs)
    import("../../components/maps/components/SvgInteractiveMap").catch(() => {});

    // Pre-fetch the low-res countries dataset so it's in the HTTP cache
    fetch("/world-countries-low.topojson", { cache: "force-cache" }).catch(() => {});
  }, []);

  return null;
}