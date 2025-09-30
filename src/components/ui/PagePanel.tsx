"use client";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface PagePanelProps {
  children: React.ReactNode;
}

const PagePanel = ({ children }: PagePanelProps) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("xl");
  const [buttonPosition, setButtonPosition] = useState<
    "middle" | "top" | "bottom"
  >("middle");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1400) setCurrentBreakpoint("xxl");
      else if (width >= 1200) setCurrentBreakpoint("xl");
      else if (width >= 992) setCurrentBreakpoint("lg");
      else if (width >= 768) setCurrentBreakpoint("md");
      else setCurrentBreakpoint("sm");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  // Set button position based on navigation source and screen size
  useEffect(() => {
    const navigationSource = sessionStorage.getItem("navigationSource");
    console.log(
      "🎯 Setting button position based on navigation source:",
      navigationSource,
    );

    // Force bottom position on mobile breakpoints
    if (currentBreakpoint === "sm" || currentBreakpoint === "md") {
      setButtonPosition("bottom");
      console.log("📱 Mobile view: Positioning go back button at BOTTOM");
    } else if (
      navigationSource === "contact-button" &&
      pathname === "/contact"
    ) {
      setButtonPosition("bottom");
      console.log("⬇️ Contact button: Positioning go back button at BOTTOM");
    } else if (navigationSource === "footer") {
      setButtonPosition("top");
      console.log("⬆️ Footer navigation: Positioning go back button at TOP");
    } else {
      setButtonPosition("middle");
      console.log("↔️ Header navigation: Positioning go back button at MIDDLE");
    }
  }, [pathname, currentBreakpoint]);

  const handleGoBackClick = () => {
    console.log(
      "⬅️ Go back button clicked - navigating to home from",
      pathname,
    );
    if (typeof window !== "undefined") {
      const currentPath = pathname;
      const isFromRoot = currentPath === "/";
      const isToRoot = true; // Always going to root

      // Store the current path before navigation
      sessionStorage.setItem("lastPath", currentPath);

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
  };

  // Get button positioning classes based on position state
  const getButtonPositionClasses = () => {
    const baseClasses =
      "bg-brand-orange-500 hover:bg-brand-orange-600 duration-300 absolute flex size-10 cursor-pointer items-center justify-center rounded-full";

    switch (buttonPosition) {
      case "top":
        return `${baseClasses} top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90`;
      case "bottom":
        return `${baseClasses} bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rotate-90`;
      case "middle":
      default:
        return `${baseClasses} top-1/2 right-0 translate-x-1/2 -translate-y-1/2`;
    }
  };

  return (
    <div
      className="fixed z-[100] cursor-default overflow-visible shadow-2xl"
      style={{
        backgroundColor: "#1c1b1b",
        top:
          currentBreakpoint === "lg" ||
          currentBreakpoint === "xl" ||
          currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "64px"
              : "76px"
            : "78px",
        left:
          currentBreakpoint === "lg" ||
          currentBreakpoint === "xl" ||
          currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "96px"
              : "80px"
            : "10px",
        width:
          currentBreakpoint === "lg" ||
          currentBreakpoint === "xl" ||
          currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "calc(100% - 192px)"
              : "calc(100% - 160px)"
            : "calc(100% - 20px)",
        height:
          currentBreakpoint === "lg" ||
          currentBreakpoint === "xl" ||
          currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "calc(100vh - 128px)"
              : "calc(100vh - 132px)"
            : "calc(100vh - 160px)",
      }}
    >
      {children}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleGoBackClick}
            className={getButtonPositionClasses()}
          >
            <ChevronLeft size={20} />
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
  );
};

export default PagePanel;
