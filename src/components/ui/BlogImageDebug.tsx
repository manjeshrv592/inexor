"use client";

import { useEffect } from "react";

interface BlogImageDebugProps {
  blogTitle: string;
  prefetchedImageUrl: string;
}

interface BlogImageDebugInfo {
  blogTitle: string;
  prefetchedImageUrl: string;
}

declare global {
  interface Window {
    __blogImageDebug?: BlogImageDebugInfo;
  }
}

export default function BlogImageDebug({ blogTitle, prefetchedImageUrl }: BlogImageDebugProps) {
  useEffect(() => {
    // Store debug info in window for LazyImage to access
    window.__blogImageDebug = {
      blogTitle,
      prefetchedImageUrl
    };
  }, [blogTitle, prefetchedImageUrl]);

  return null; // This component doesn't render anything
}