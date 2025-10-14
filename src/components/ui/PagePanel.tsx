"use client";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronUp } from "lucide-react";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type SlideDirection = "left" | "right" | "up" | "down";
type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl";
type ButtonPlacement = "middle" | "top" | "bottom";

const BREAKPOINTS = {
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
  xxl: Infinity,
} as const;

interface AnimationContext {
  isVisible: boolean;
  isExiting: boolean;
  triggerExit: () => void;
}

const AnimationContext = createContext<AnimationContext | null>(null);

interface PagePanelProps {
  children: React.ReactNode;
  direction?: {
    sm?: SlideDirection;
    md?: SlideDirection;
    lg?: SlideDirection;
    xl?: SlideDirection;
    xxl?: SlideDirection;
  };
  buttonPlacement?: {
    sm?: ButtonPlacement;
    md?: ButtonPlacement;
    lg?: ButtonPlacement;
    xl?: ButtonPlacement;
    xxl?: ButtonPlacement;
  };
}

const PagePanel = ({
  children,
  direction = {
    sm: "up",
    md: "up",
    lg: "left",
    xl: "left",
    xxl: "left",
  },
  buttonPlacement,
}: PagePanelProps) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xl");
  const [buttonPosition, setButtonPosition] =
    useState<ButtonPlacement>("middle");
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentDirection, setCurrentDirection] =
    useState<SlideDirection>("left");

  // Responsive breakpoint detection
  const useResponsiveDirection = () => {
    useEffect(() => {
      const updateBreakpoint = () => {
        const width = window.innerWidth;
        let newBreakpoint: Breakpoint = "sm";

        if (width >= BREAKPOINTS.xl) newBreakpoint = "xxl";
        else if (width >= BREAKPOINTS.lg) newBreakpoint = "xl";
        else if (width >= BREAKPOINTS.md) newBreakpoint = "lg";
        else if (width >= BREAKPOINTS.sm) newBreakpoint = "md";
        else newBreakpoint = "sm";

        setCurrentBreakpoint(newBreakpoint);

        // Update direction based on current breakpoint
        const slideDir = direction[newBreakpoint] || direction.xl || "left";
        setCurrentDirection(slideDir);
      };

      updateBreakpoint();
      window.addEventListener("resize", updateBreakpoint);
      return () => window.removeEventListener("resize", updateBreakpoint);
    }, []);
  };

  useResponsiveDirection();

  // Set button position based on navigation source, screen size, and custom placement
  useEffect(() => {
    // If custom buttonPlacement is provided, use it
    if (buttonPlacement && buttonPlacement[currentBreakpoint]) {
      setButtonPosition(buttonPlacement[currentBreakpoint]!);
      console.log(
        `🎯 Using custom button placement for ${currentBreakpoint}:`,
        buttonPlacement[currentBreakpoint],
      );
      return;
    }

    // Otherwise, use existing logic
    const navigationSource = sessionStorage.getItem("navigationSource");
    console.log(
      "🎯 Setting button position based on navigation source:",
      navigationSource,
    );

    // For screens smaller than 1200px (xl breakpoint)
    if (
      currentBreakpoint === "sm" ||
      currentBreakpoint === "md" ||
      currentBreakpoint === "lg"
    ) {
      // Special case: privacy-policy and terms-conditions should have bottom button on mobile
      if (
        navigationSource === "footer" &&
        (pathname === "/privacy-policy" || pathname === "/terms-conditions")
      ) {
        setButtonPosition("bottom");
        console.log(
          "📱 Mobile/Tablet view + Footer navigation (privacy/terms): Positioning go back button at BOTTOM (like header links)",
        );
      } else if (navigationSource === "footer") {
        setButtonPosition("top");
        console.log(
          "📱 Mobile/Tablet view + Footer navigation: Positioning go back button at TOP (same as desktop)",
        );
      } else {
        setButtonPosition("bottom");
        console.log(
          "📱 Mobile/Tablet view: Positioning go back button at BOTTOM",
        );
      }
    } else if (pathname === "/contact") {
      // Always position at bottom for contact page with upward arrow
      setButtonPosition("bottom");
      console.log(
        "📞 Contact page: Positioning go back button at BOTTOM with upward arrow",
      );
    } else if (navigationSource === "footer") {
      setButtonPosition("top");
      console.log("⬆️ Footer navigation: Positioning go back button at TOP");
    } else {
      setButtonPosition("middle");
      console.log("↔️ Header navigation: Positioning go back button at MIDDLE");
    }
  }, [pathname, currentBreakpoint, buttonPlacement]);

  const handleGoBackClick = () => {
    console.log(
      "⬅️ Go back button clicked - navigating to home from",
      pathname,
    );
    setIsExiting(true);

    // Trigger exit animation before navigation
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const currentPath = pathname;
        const isFromRoot = currentPath === "/";
        const isToRoot = true; // Always going to root

        // Store the current path before navigation
        sessionStorage.setItem("lastPath", currentPath);

        // Preserve the navigation source so the close animation matches the open animation
        // Don't change navigationSource - let it stay as it was set when opening the page

        // Use transition router only when navigating from/to root
        if (isFromRoot || isToRoot) {
          console.log("✨ Using transition router for go back navigation");
          requestAnimationFrame(() => {
            router.push("/");
          });
        } else {
          // Fallback (shouldn't happen since we're always going to root)
          window.location.href = "/";
        }
      }
    }, 150); // Small delay for exit animation
  };

  // Scroll prevention effect with position preservation
  useEffect(() => {
    // Prevent body scroll when panel is visible
    if (isVisible && !isExiting) {
      // Store current scroll position
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalLeft = document.body.style.left;
      const originalWidth = document.body.style.width;

      // Prevent scrolling and maintain scroll position
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.width = "100%";

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.left = originalLeft;
        document.body.style.width = originalWidth;
        
        // Restore scroll position
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [isVisible, isExiting]);

  // Animation effects
  useEffect(() => {
    // Entry animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
  };

  // Get slide transform based on direction and state
  const getSlideTransform = () => {
    if (!isVisible && !isExiting) {
      // Entry state - slide in from direction
      switch (currentDirection) {
        case "left":
          return "translateX(-100%)";
        case "right":
          return "translateX(100%)";
        case "up":
          return "translateY(-100%)";
        case "down":
          return "translateY(100%)";
        default:
          return "translateX(-100%)";
      }
    } else if (isExiting) {
      // Exit state - slide out in reverse direction
      switch (currentDirection) {
        case "left":
          return "translateX(-100%)";
        case "right":
          return "translateX(100%)";
        case "up":
          return "translateY(-100%)";
        case "down":
          return "translateY(100%)";
        default:
          return "translateX(-100%)";
      }
    }
    return "translate(0, 0)"; // Visible state
  };

  // Get button positioning classes based on position state
  const getButtonPositionClasses = () => {
    const baseClasses =
      "bg-brand-orange-500 hover:bg-brand-orange-600 duration-300 absolute flex size-10 cursor-pointer items-center justify-center rounded-full z-[120]";

    let positionClasses;
    switch (buttonPosition) {
      case "top":
        positionClasses = `${baseClasses} top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90`;
        break;
      case "bottom":
        // For contact page, don't rotate since we're using ChevronUp icon
        if (pathname === "/contact") {
          positionClasses = `${baseClasses} bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2`;
        } else {
          positionClasses = `${baseClasses} bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rotate-90`;
        }
        break;
      case "middle":
      default:
        positionClasses = `${baseClasses} top-1/2 right-0 translate-x-1/2 -translate-y-1/2`;
        break;
    }

    console.log("🔘 Button position debug:", {
      buttonPosition,
      pathname,
      currentBreakpoint,
      positionClasses,
    });

    return positionClasses;
  };

  return (
    <AnimationContext.Provider value={{ isVisible, isExiting, triggerExit }}>
      <div
        className="fixed z-[100] cursor-default overflow-visible shadow-2xl transition-transform duration-300 ease-out"
        style={{
          backgroundColor: "#1c1b1b",
          top:
            currentBreakpoint === "xl" || currentBreakpoint === "xxl"
              ? currentBreakpoint === "xxl"
                ? "64px"
                : "76px"
              : "53px",
          left:
            currentBreakpoint === "xl" || currentBreakpoint === "xxl"
              ? currentBreakpoint === "xxl"
                ? "96px"
                : "80px"
              : currentBreakpoint === "lg"
                ? "calc(50% - 350px)"
                : "10px",
          width:
            currentBreakpoint === "xl" || currentBreakpoint === "xxl"
              ? currentBreakpoint === "xxl"
                ? "calc(100% - 192px)"
                : "calc(100% - 160px)"
              : currentBreakpoint === "lg"
                ? "700px"
                : "calc(100% - 20px)",
          height:
            currentBreakpoint === "xl" || currentBreakpoint === "xxl"
              ? currentBreakpoint === "xxl"
                ? "calc(100vh - 168px)"
                : "calc(100vh - 132px)"
              : "calc(100dvh - 74px)",
          transform: getSlideTransform(),
        }}
      >
        {children}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleGoBackClick}
              className={getButtonPositionClasses()}
            >
              {pathname === "/contact" && buttonPosition === "bottom" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side={
              buttonPosition === "top"
                ? "bottom"
                : buttonPosition === "bottom"
                  ? "top"
                  : "right"
            }
            className="text-brand-orange-500 z-[110]"
          >
            <p>GO BACK</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </AnimationContext.Provider>
  );
};

export default PagePanel;

// Export the animation context hook for child components
export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimationContext must be used within a PagePanel");
  }
  return context;
};
