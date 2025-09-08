"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DynamicShapeProps {
  children: React.ReactNode;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  padding?: string;
}

const DynamicShape = ({
  children,
  className,
  fill = "transparent",
  stroke = "#323232",
  strokeWidth = 1,
  padding = "px-4 py-3",
}: DynamicShapeProps) => {
  const shapeRef = React.useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = React.useState(
    "M0.5 0.5L130 0.5L142 12V37.5H13L1 26V0.5Z",
  );

  // SVG path generation constants (fixed cut angle in pixels)
  const SVG_CONFIG = React.useMemo(
    () => ({
      cutAngleSize: 12, // Fixed pixel size for cut angles
      strokeWidth: strokeWidth,
    }),
    [strokeWidth],
  );

  // Function to generate dynamic SVG path based on actual dimensions
  const generateSVGPath = React.useCallback(
    (width: number, height: number) => {
      const { cutAngleSize, strokeWidth } = SVG_CONFIG;
      const halfStroke = strokeWidth / 2;

      // Use fixed cut angle size (not proportional to height)
      const cutAngle = cutAngleSize;

      // Generate SVG path with fixed cut angles
      return [
        `M${halfStroke} ${halfStroke}`,
        `L${width - cutAngle} ${halfStroke}`,
        `L${width - halfStroke} ${cutAngle}`,
        `L${width - halfStroke} ${height - halfStroke}`,
        `L${cutAngle} ${height - halfStroke}`,
        `L${halfStroke} ${height - cutAngle}`,
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
    <div className={cn("relative block w-full", className)}>
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
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-all duration-200 ease-in-out"
          />
        </svg>
      </span>

      {/* Content */}
      <div ref={shapeRef} className={cn("relative z-[2]", padding)}>
        {children}
      </div>
    </div>
  );
};

export { DynamicShape };
