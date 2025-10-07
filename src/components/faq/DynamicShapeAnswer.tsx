"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface DynamicShapeAnswerProps {
  children: React.ReactNode;
  isVisible: boolean;
  isMobile?: boolean;
}

const DynamicShapeAnswer = ({
  children,
  isVisible,
  isMobile = false,
}: DynamicShapeAnswerProps) => {
  const shapeRef = React.useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = React.useState("");

  // SVG path generation constants - smaller cuts for longer content
  const SVG_CONFIG = React.useMemo(
    () => ({
      rightCutRatio: 4 / 46, // Even smaller ratio for taller content
      leftCutRatio: 4 / 46, // Even smaller ratio for taller content
      strokeWidth: 0, // No stroke
    }),
    [],
  );

  // Function to generate dynamic SVG path based on actual dimensions
  const generateSVGPath = React.useCallback(
    (width: number, height: number) => {
      const { rightCutRatio, leftCutRatio, strokeWidth } = SVG_CONFIG;

      // Calculate proportional cut angles
      const rightCutAngle = rightCutRatio * height;
      const leftCutAngle = leftCutRatio * height;
      const halfStroke = strokeWidth / 2;

      // Generate SVG path with proper stroke positioning
      return [
        `M${halfStroke} ${halfStroke}`,
        `L${width - rightCutAngle} ${halfStroke}`,
        `L${width - halfStroke} ${rightCutAngle}`,
        `L${width - halfStroke} ${height - halfStroke}`,
        `L${leftCutAngle} ${height - halfStroke}`,
        `L${halfStroke} ${height - leftCutAngle}`,
        `L${halfStroke} ${halfStroke}Z`,
      ].join("");
    },
    [SVG_CONFIG],
  );

  // Update SVG path when dimensions change
  React.useEffect(() => {
    if (shapeRef.current && isVisible) {
      const updatePath = () => {
        const rect = shapeRef.current?.getBoundingClientRect();
        if (rect) {
          const newPath = generateSVGPath(rect.width, rect.height);
          setSvgPath(newPath);
        }
      };

      // Initial update
      updatePath();

      // Update on resize
      const resizeObserver = new ResizeObserver(updatePath);
      resizeObserver.observe(shapeRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [generateSVGPath, isVisible]);

  // Animation variants for mobile (height-based) and desktop (opacity-based)
  const mobileVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      marginTop: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      marginTop: 8, // mt-2 equivalent
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 },
        marginTop: { duration: 0.3 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 },
        marginTop: { duration: 0.2 },
      },
    },
  };

  const desktopVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={isMobile ? mobileVariants : desktopVariants}
          className="relative overflow-hidden"
        >
          {/* Dynamic SVG Background Shape */}
          <span className="pointer-events-none absolute inset-0 z-[1]">
            <svg
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-200 ease-in-out"
            >
              <path
                d={svgPath}
                fill="#292929"
                className="transition-all duration-200 ease-in-out"
              />
            </svg>
          </span>

          {/* Answer Text */}
          <div ref={shapeRef} className="relative z-10 px-4 py-4">
            <p className="text-sm leading-relaxed text-white">{children}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicShapeAnswer;
