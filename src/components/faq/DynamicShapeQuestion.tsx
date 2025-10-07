"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";

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
  const [clipPath, setClipPath] = React.useState("");

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

  // Function to generate clip-path polygon from the same shape coordinates
  const generateClipPath = React.useCallback(
    (width: number, height: number) => {
      const { rightCutRatio, leftCutRatio, strokeWidth } = SVG_CONFIG;

      // Calculate proportional cut angles
      const rightCutAngle = rightCutRatio * height;
      const leftCutAngle = leftCutRatio * height;
      const halfStroke = strokeWidth / 2;

      // Convert coordinates to percentages for clip-path polygon
      const points = [
        `${(halfStroke / width) * 100}% ${(halfStroke / height) * 100}%`, // Top-left
        `${((width - rightCutAngle) / width) * 100}% ${(halfStroke / height) * 100}%`, // Top-right before cut
        `${((width - halfStroke) / width) * 100}% ${(rightCutAngle / height) * 100}%`, // Top-right after cut
        `${((width - halfStroke) / width) * 100}% ${((height - halfStroke) / height) * 100}%`, // Bottom-right
        `${(leftCutAngle / width) * 100}% ${((height - halfStroke) / height) * 100}%`, // Bottom-left before cut
        `${(halfStroke / width) * 100}% ${((height - leftCutAngle) / height) * 100}%`, // Bottom-left after cut
      ];

      return `polygon(${points.join(", ")})`;
    },
    [SVG_CONFIG],
  );

  // Update SVG path and clip-path when dimensions change
  React.useEffect(() => {
    if (shapeRef.current) {
      const updatePath = () => {
        const rect = shapeRef.current?.getBoundingClientRect();
        if (rect) {
          const newPath = generateSVGPath(rect.width, rect.height);
          const newClipPath = generateClipPath(rect.width, rect.height);
          setSvgPath(newPath);
          setClipPath(newClipPath);
        }
      };

      // Initial update
      updatePath();

      // Update on resize
      const resizeObserver = new ResizeObserver(updatePath);
      resizeObserver.observe(shapeRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [generateSVGPath, generateClipPath]);

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
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
            fill="#323232"
            className="transition-all duration-200 ease-in-out"
          />
        </svg>
      </span>

      {/* Question Text */}
      <div
        ref={shapeRef}
        className="relative z-10 flex items-center gap-4 overflow-hidden p-2 lg:p-2"
        style={{
          clipPath: clipPath || undefined,
        }}
      >
        {/* Inner shadow spans - animated with Framer Motion */}
        <motion.span
          className="absolute top-0 left-0 h-1 w-[calc(100%-15px)] bg-black blur-[1px]"
          animate={{
            opacity: isActive ? 0.5 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          &nbsp;
        </motion.span>
        <motion.span
          className="absolute top-[-3px] right-[6px] h-[24px] w-1 -rotate-45 bg-black blur-[1px]"
          animate={{
            opacity: isActive ? 0.5 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          &nbsp;
        </motion.span>
        <Button className="inline-flex p-2" size={"sm"}>
          {isActive ? <MinusIcon size={10} /> : <PlusIcon size={10} />}
        </Button>
        <p className="text-xs font-medium text-white">{children}</p>
      </div>
    </motion.div>
  );
};

export default DynamicShapeQuestion;
