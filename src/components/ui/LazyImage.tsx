"use client";

import Image from "next/image";
import { useState } from "react";
import { urlForImageWithParams, urlForLQIP } from "../../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface LazyImageProps {
  src: string | SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  lqip?: string; // Optional LQIP from Sanity metadata
  mimeType?: string; // Optional mime type to detect SVG files
}

const LazyImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  style,
  sizes,
  priority = false,
  quality = 75,
  lqip,
  mimeType,
}: LazyImageProps) => {
  // Check if this is an SVG file (skip LQIP for SVGs)
  const isSvgFile =
    mimeType === "image/svg+xml" ||
    (typeof src === "string" && src.toLowerCase().includes(".svg"));

  const [isLoading, setIsLoading] = useState(!isSvgFile); // SVGs don't need loading state
  const [error, setError] = useState(false);

  // Generate LQIP and optimized URLs
  const getImageUrls = () => {
    // If it's a string URL (legacy)
    if (typeof src === "string") {
      if (!src.includes("sanity")) {
        return {
          lqipSrc: src,
          optimizedSrc: src,
        };
      }

      // For SVG files, skip LQIP generation
      if (isSvgFile) {
        return {
          lqipSrc: src,
          optimizedSrc: src,
        };
      }

      // Manual URL manipulation for string URLs
      const separator = src.includes("?") ? "&" : "?";
      const lqipSrc = `${src}${separator}w=20&q=20&blur=50`;
      const optimizedSrc = `${src}${separator}q=${quality}&fm=webp${width ? `&w=${width}` : ""}`;

      return { lqipSrc, optimizedSrc };
    }

    // If it's a Sanity image object, use proper image builder
    // For SVG files, skip LQIP generation
    if (isSvgFile) {
      const directSrc = urlForImageWithParams(src, {
        width,
        height,
        quality,
      }).url();
      return {
        lqipSrc: directSrc,
        optimizedSrc: directSrc,
      };
    }

    // First try to use Sanity's built-in LQIP metadata if available
    const sanityLqip = (
      src as SanityImageSource & {
        asset?: { metadata?: { lqip?: string } };
      }
    )?.asset?.metadata?.lqip;
    const lqipSrc = lqip || sanityLqip || urlForLQIP(src).url();

    const optimizedSrc = urlForImageWithParams(src, {
      width,
      height,
      quality,
      format: "webp",
    }).url();

    return { lqipSrc, optimizedSrc };
  };

  const { lqipSrc, optimizedSrc } = getImageUrls();

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);

    // Only log for featured images (priority=true) to avoid multiple logs
    const debugInfo = window.__blogImageDebug;
    if (debugInfo && typeof window !== "undefined" && priority === true) {
      console.log({
        blogTitle: debugInfo.blogTitle,
        actualImageUsedUrl: optimizedSrc, // Use the already computed optimizedSrc
        prefetchedImageUrl: debugInfo.prefetchedImageUrl,
      });
    }
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={style}
      >
        <span className="text-sm text-gray-400">Image failed to load</span>
      </div>
    );
  }

  // For fill images, don't add extra wrapper classes that might interfere
  if (fill) {
    return (
      <>
        {/* Low Quality Placeholder */}
        {isLoading && (
          <Image
            src={lqipSrc}
            alt={alt}
            fill
            className={`transition-opacity duration-300 ${className}`}
            style={{ filter: "blur(10px)", ...style }}
            priority={priority}
          />
        )}

        {/* High Quality Image */}
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          className={`transition-opacity duration-500 ${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={style}
          sizes={sizes}
          quality={quality}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
        />
      </>
    );
  }

  // For non-fill images, use wrapper div
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Low Quality Placeholder */}
      {isLoading && (
        <Image
          src={lqipSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={`transition-opacity duration-300 ${fill ? "object-cover" : ""}`}
          style={{ filter: "blur(10px)" }}
          priority={priority}
        />
      )}

      {/* High Quality Image */}
      <Image
        src={optimizedSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`transition-opacity duration-500 ${fill ? "object-cover" : ""} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        sizes={sizes}
        quality={quality}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default LazyImage;
