"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PagePanelProps {
  children: React.ReactNode;
}

const PagePanel = ({ children }: PagePanelProps) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("xl");
  const pathname = usePathname();

  // Determine slide direction based on route and screen size
  const getSlideDirection = () => {
    const isContactPage = pathname === "/contact";
    const isDesktop = currentBreakpoint === "xl" || currentBreakpoint === "xxl";

    if (isContactPage) {
      return "top"; // Contact always slides from top
    }

    if (isDesktop) {
      return "left"; // Header pages slide from left on desktop
    }

    return "top"; // All pages slide from top on mobile
  };

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

  // Animation variants for different slide directions
  const getInitialPosition = (direction: string) => {
    switch (direction) {
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
      default:
        return { x: "100%" };
    }
  };

  const currentDirection = getSlideDirection();

  const slideVariants = {
    hidden: getInitialPosition(currentDirection),
    visible: {
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.main
      className="xxl:left-32 xxl:top-16 xxl:h-[calc(100vh-128px)] xxl:w-[calc(100%-(128px*2))] fixed top-[118.14px] left-0 z-[100] h-[calc(100vh-118.14px)] w-full overflow-visible rounded-lg shadow-2xl xl:top-14 xl:left-28 xl:h-[calc(100vh-112px)] xl:w-[calc(100%-(112px*2))]"
      style={{ backgroundColor: "#1c1b1b" }}
      variants={slideVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.main>
  );
};

export default PagePanel;
