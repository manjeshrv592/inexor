import React from "react";
import { motion } from "framer-motion";
import { urlForImageWithParams } from "../../../../../sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface AnimatedImagePanelProps {
  imageSrc: string | SanityImageSource | undefined;
  position: "left" | "right";
  shouldAnimate: boolean;
  isXlScreen: boolean;
  isGrayscale?: boolean;
  alt?: string;
}

const AnimatedImagePanel: React.FC<AnimatedImagePanelProps> = ({
  imageSrc,
  position,
  shouldAnimate,
  isXlScreen,
  isGrayscale = true,
  alt,
}) => {
  const positionClasses = {
    left: "absolute top-0 left-0 z-30 h-full origin-left",
    right: "absolute top-0 right-0 z-30 h-full origin-right",
  };

  // Don't render if no image source is provided
  if (!imageSrc) {
    return null;
  }

  // Dynamic grayscale class based on isGrayscale prop
  const grayscaleClass = isGrayscale ? "grayscale" : "";

  return (
    <motion.div
      className={`${positionClasses[position]} transform overflow-hidden`}
      initial={{ width: "50%" }}
      animate={{
        width: shouldAnimate ? (isXlScreen ? "17%" : "0%") : "50%",
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        delay: 0.1,
      }}
      role="img"
      aria-label={alt || `${position} panel image`}
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            typeof imageSrc === "string"
              ? imageSrc
              : imageSrc
                ? urlForImageWithParams(imageSrc, {
                    width: 600,
                    height: 1200,
                    quality: 85,
                    format: "webp",
                    fit: "crop",
                  }).url()
                : undefined
          }
          alt={alt || `${position} panel image`}
          className={`h-full w-full object-cover ${grayscaleClass}`}
        />

        {/* Gradient overlay for left positioned images */}
        {position === "left" && (
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedImagePanel;
