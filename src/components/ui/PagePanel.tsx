"use client";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronUp } from "lucide-react";
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
    <div
      className="fixed z-[100] cursor-default overflow-visible shadow-2xl"
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
  );
};

export default PagePanel;
