"use client";

import React from "react";
import { motion } from "motion/react";

interface DynamicShapeQuestionProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const DynamicShapeQuestion = ({
  children,
  isActive = false,
  onClick,
}: DynamicShapeQuestionProps) => {
  const shapeRef = React.useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = React.useState("");

  // SVG path generation constants (same as button)
  const SVG_CONFIG = React.useMemo(
    () => ({
      rightCutRatio: 12 / 38,
      leftCutRatio: 12 / 38,
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
    if (shapeRef.current) {
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
  }, [generateSVGPath]);

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
            fill={isActive ? "#1f1f1f" : "#323232"}
            className="transition-all duration-200 ease-in-out"
          />
        </svg>
      </span>

      {/* Question Text */}
      <div ref={shapeRef} className="relative z-10 flex items-center px-4 py-4">
        <p className="text-sm font-medium text-white">{children}</p>
      </div>
    </motion.div>
  );
};

export default DynamicShapeQuestion;
