"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PagePanelBg from "./PagePanelBg";
import PagePanel from "./PagePanel";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "top" | "bottom"
  >("left");
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("xl");

  // Track breakpoint changes (same logic as PagePanel)
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let breakpoint;
      if (width >= 1400) breakpoint = "xxl";
      else if (width >= 1200) breakpoint = "xl";
      else if (width >= 992) breakpoint = "lg";
      else if (width >= 768) breakpoint = "md";
      else breakpoint = "sm";

      console.log("📏 Breakpoint check:", { width, breakpoint });
      setCurrentBreakpoint(breakpoint);
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  useEffect(() => {
    // Determine animation direction based on navigation source and breakpoint
    const navigationSource = sessionStorage.getItem("navigationSource");
    const isSmallScreen =
      currentBreakpoint === "sm" ||
      currentBreakpoint === "md" ||
      currentBreakpoint === "lg";

    console.log("🔍 PageTransition Debug:", {
      navigationSource,
      currentBreakpoint,
      isSmallScreen,
      windowWidth: window.innerWidth,
      pathname,
    });

    // Check if we're opening contact page from contact button
    if (navigationSource === "contact-button" && pathname === "/contact") {
      console.log("📞 Contact button -> Contact page: Using TOP animation");
      setAnimationDirection("top");
    }
    // Check if we're closing any page that was opened from contact button
    else if (navigationSource === "contact-button" && pathname !== "/contact") {
      console.log("📞 Contact button -> Other page: Using TOP animation");
      setAnimationDirection("top");
    }
    // Check if navigation is from footer
    else if (navigationSource === "footer") {
      // Special case: privacy-policy and terms-conditions should use TOP animation on mobile
      if (
        isSmallScreen &&
        (pathname === "/privacy-policy" || pathname === "/terms-conditions")
      ) {
        console.log(
          "🦶 Footer navigation (privacy/terms) + Small screen: Using TOP animation (like header links)",
        );
        setAnimationDirection("top");
      } else {
        console.log("🦶 Footer navigation: Using BOTTOM animation");
        setAnimationDirection("bottom");
      }
    }
    // Check if navigation is from header on small screens (< 1200px: sm, md, lg)
    else if (navigationSource === "header" && isSmallScreen) {
      console.log(
        "📱 Header + Small screen (" +
          currentBreakpoint +
          "): Using TOP animation",
      );
      setAnimationDirection("top");
    }
    // Check if navigation is from header on large screens (≥ 1200px: xl, xxl) - use left animation
    else if (navigationSource === "header" && !isSmallScreen) {
      console.log(
        "🖥️ Header + Large screen (" +
          currentBreakpoint +
          "): Using LEFT animation",
      );
      setAnimationDirection("left");
    }
    // Default to left animation
    else {
      console.log("🔄 Default: Using LEFT animation");
      setAnimationDirection("left");
    }

    // Reset visibility when pathname changes
    setIsVisible(true);

    // If navigating to root, hide after a delay to prevent flicker
    if (pathname === "/") {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentBreakpoint]);

  // Prevent page scrolling when PagePanel is open
  useEffect(() => {
    if (pathname !== "/" && isVisible) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [pathname, isVisible]);

  // Don't render for root pages or when not visible
  if (pathname === "/" || !isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-black/80"
        style={{
          viewTransitionName: `page-panel-bg-${animationDirection}`,
        }}
      >
        <PagePanelBg />
      </div>

      <div
        className="fixed inset-0 z-[110]"
        style={{
          viewTransitionName: `page-panel-${animationDirection}`,
        }}
      >
        <PagePanel>
          <div
            style={{ viewTransitionName: `page-content-${animationDirection}` }}
          >
            {children}
          </div>
        </PagePanel>
      </div>
    </>
  );
}
