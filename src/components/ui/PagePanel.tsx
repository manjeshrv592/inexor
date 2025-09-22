"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

interface PagePanelProps {
  children: React.ReactNode;
}

const PagePanel = ({ children }: PagePanelProps) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("xl");
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Determine slide direction based on route and screen size
  const getSlideDirection = () => {
    const isContactPage = pathname === "/contact";
    const isPrivacyOrTermsPage = pathname === "/privacy-policy" || pathname === "/terms-conditions";
    const isDesktop = currentBreakpoint === "xl" || currentBreakpoint === "xxl";

    if (isContactPage) {
      return "top"; // Contact always slides from top
    }

    if (isPrivacyOrTermsPage) {
      return "bottom"; // Privacy policy and terms & conditions slide from bottom
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
        return { x: "-100vw" };
      case "right":
        return { x: "100vw" };
      case "top":
        return { y: "-100vh" };
      case "bottom":
        return { y: "100vh" };
      default:
        return { x: "100vw" };
    }
  };

  const currentDirection = getSlideDirection();
  const isContactPage = pathname === "/contact";
  const isPrivacyOrTermsPage = pathname === "/privacy-policy" || pathname === "/terms-conditions";

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
    exit: {
      ...getInitialPosition(currentDirection),
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
        duration: 0.5,
      },
    },
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <motion.div
      className="fixed z-[100] overflow-visible rounded-lg shadow-2xl cursor-default"
      style={{
        backgroundColor: "#1c1b1b",
        top:
          currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "64px"
              : "56px"
            : "118.14px",
        left:
          currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "96px"
              : "80px"
            : "10px",
        width:
          currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "calc(100% - 192px)"
              : "calc(100% - 160px)"
            : "calc(100% - 20px)",
        height:
          currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "calc(100vh - 128px)"
              : "calc(100vh - 112px)"
            : "calc(100vh - 143.14px)",
      }}
      variants={slideVariants}
      initial="hidden"
      animate={isClosing ? "exit" : "visible"}
    >
      {children}
      <button
        onClick={handleClose}
        className="absolute right-1/2 bottom-0 z-50 flex size-10 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-orange-500 transition-colors hover:bg-orange-600 cursor-pointer xl:top-1/2 xl:right-0 xl:bottom-auto xl:-translate-y-1/2"
      >
        <ChevronLeftIcon className={`${
          isContactPage 
            ? 'rotate-90' 
            : isPrivacyOrTermsPage 
            ? '-rotate-90' 
            : 'rotate-90 xl:rotate-0'
        }`} />
      </button>
    </motion.div>
  );
};

export default PagePanel;
