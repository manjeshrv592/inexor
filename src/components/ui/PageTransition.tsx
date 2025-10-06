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

  useEffect(() => {
    // Determine animation direction based on navigation source
    const navigationSource = sessionStorage.getItem("navigationSource");

    // Check if we're opening contact page from contact button
    if (navigationSource === "contact-button" && pathname === "/contact") {
      setAnimationDirection("top");
    } 
    // Check if we're closing any page that was opened from contact button
    else if (navigationSource === "contact-button" && pathname !== "/contact") {
      setAnimationDirection("top");
    }
    // Check if navigation is from footer
    else if (navigationSource === "footer") {
      setAnimationDirection("bottom");
    } 
    // Default to left animation
    else {
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
  }, [pathname]);

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
