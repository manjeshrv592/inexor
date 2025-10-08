import React from "react";
import { motion } from "framer-motion";

interface AnimatedImagePanelProps {
  imageSrc: string | undefined;
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
      className={`${positionClasses[position]} transform bg-cover bg-center ${grayscaleClass} filter`}
      style={{ backgroundImage: `url('${imageSrc}')` }}
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
      {/* Gradient overlay for left positioned images */}
      {position === "left" && (
        <div
          className="absolute h-full w-full"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedImagePanel;
