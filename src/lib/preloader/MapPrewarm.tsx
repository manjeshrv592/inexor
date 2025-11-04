"use client";

import { useEffect } from "react";

export default function MapPrewarm() {
  useEffect(() => {
    // Preload the interactive map chunk directly (pulls in D3 libs)
    import("../../components/maps/components/SvgInteractiveMap").catch(() => {});

    // Pre-fetch the low-res continents dataset so it's in the HTTP cache
    fetch("/world-continents-low.topojson", { cache: "force-cache" }).catch(() => {});
  }, []);

  return null;
}