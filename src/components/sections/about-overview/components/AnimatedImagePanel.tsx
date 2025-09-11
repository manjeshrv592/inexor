import React from "react";
import { motion } from "framer-motion";

interface AnimatedImagePanelProps {
  imageSrc: string | undefined;
  position: "left" | "right";
  shouldAnimate: boolean;
  isXlScreen: boolean;
}

const AnimatedImagePanel: React.FC<AnimatedImagePanelProps> = ({
  imageSrc,
  position,
  shouldAnimate,
  isXlScreen,
}) => {
  const positionClasses = {
    left: "absolute top-0 left-0 z-30 h-full origin-left",
    right: "absolute top-0 right-0 z-30 h-full origin-right",
  };

  // Don't render if no image source is provided
  if (!imageSrc) {
    return null;
  }

  return (
    <motion.div
      className={`${positionClasses[position]} transform bg-cover bg-center grayscale filter`}
      style={{ backgroundImage: `url('${imageSrc}')` }}
      initial={{ width: "50%" }}
      animate={{
        width: shouldAnimate ? (isXlScreen ? "12.5%" : "0%") : "50%",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 16,
        mass: 1,
        delay: 0.1,
      }}
    />
  );
};

export default AnimatedImagePanel;
