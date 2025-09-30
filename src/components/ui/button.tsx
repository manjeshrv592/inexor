"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Constants for better maintainability
const BUTTON_COLORS = {
  primary: "#f65009", // brand-orange-500
  primaryHover: "#c54007", // brand-orange-600
  stroke: "#4A4A4A",
  white: "#ffffff",
} as const;

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 min-h-[38px] font-['Poppins'] font-medium hover:transform hover:-translate-y-[1px] active:transform active:translate-y-[1px] w-fit flex-shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-white hover:[&_svg_path]:fill-[#943005] hover:[&_svg]:drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
        destructive:
          "text-white hover:[&_svg_path]:fill-[#943005] hover:[&_svg]:drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
        outline:
          "text-white hover:[&_.bg-svg_path]:fill-[#f65009] hover:[&_.bg-svg_path]:stroke-[#f65009] hover:[&_svg]:drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] hover:text-white [&_.icon-svg]:text-white hover:[&_.icon-svg]:text-white",
        secondary:
          "text-white hover:[&_svg_path]:fill-[#943005] hover:[&_svg]:drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
        ghost:
          "text-white hover:[&_svg_path]:fill-[#943005] hover:[&_svg]:drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
        simple:
          "bg-white text-gray-600 border-2 border-gray-300 hover:border-gray-400 hover:scale-105",
        link: "text-[#f65009] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-1.5 text-base",
        sm: "px-3 py-0.5 text-xs min-h-[28px]",
        lg: "px-6 py-2.5 text-xl",
        wide: "px-8 py-2 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [svgPath, setSvgPath] = React.useState(
    "M130 0.5L142 12V37.5H13L1 26V0.5H130Z",
  );

  // SVG path generation constants
  const SVG_CONFIG = React.useMemo(
    () => ({
      originalWidth: 143,
      originalHeight: 38,
      rightCutRatio: 12 / 38,
      leftCutRatio: 12 / 38, // Made equal to top angle for symmetry
      strokeWidth: 1,
    }),
    [],
  );

  // Helper function to determine if variant should show SVG
  const shouldShowSVG = variant !== "simple" && variant !== "link";

  // Function to generate dynamic SVG path based on actual button dimensions
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

  // Update SVG path when button dimensions change
  React.useEffect(() => {
    if (buttonRef.current) {
      const updatePath = () => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
          const newPath = generateSVGPath(rect.width, rect.height);
          setSvgPath(newPath);
        }
      };

      // Initial update
      updatePath();

      // Update on resize
      const resizeObserver = new ResizeObserver(updatePath);
      resizeObserver.observe(buttonRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [generateSVGPath]);

  return (
    <Comp
      ref={buttonRef}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* SVG Background - Only for custom variants */}
      {shouldShowSVG && (
        <span className="pointer-events-none absolute inset-0 z-[1]">
          <svg
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-svg transition-all duration-200 ease-in-out"
          >
            <path
              d={svgPath}
              fill={
                variant === "outline" ? "transparent" : BUTTON_COLORS.primary
              }
              stroke={BUTTON_COLORS.stroke}
              strokeWidth={SVG_CONFIG.strokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
              className={`transition-all duration-200 ease-in-out ${
                variant === "outline" 
                  ? "group-hover:!fill-[#f65009]" 
                  : "group-hover:!fill-[#c54007]"
              }`}
            />
          </svg>
        </span>
      )}

      {/* Button Text */}
      <span className="relative z-[2]">{children}</span>
    </Comp>
  );
}

export { Button, buttonVariants };
