"use client";

import React, { useState, useEffect } from "react";

interface PagePanelProps {
  children: React.ReactNode;
}

const PagePanel = ({ children }: PagePanelProps) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("xl");

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

  return (
    <div 
      className="fixed z-[100] cursor-default overflow-visible rounded-lg shadow-2xl"
      style={{
        backgroundColor: "#1c1b1b",
        top:
          currentBreakpoint === "lg" || currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "64px"
              : "56px"
            : "118.14px",
        left:
          currentBreakpoint === "lg" || currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "96px"
              : "80px"
            : "10px",
        width:
          currentBreakpoint === "lg" || currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "calc(100% - 192px)"
              : "calc(100% - 160px)"
            : "calc(100% - 20px)",
        height:
          currentBreakpoint === "lg" || currentBreakpoint === "xl" || currentBreakpoint === "xxl"
            ? currentBreakpoint === "xxl"
              ? "calc(100vh - 128px)"
              : "calc(100vh - 112px)"
            : "calc(100vh - 143.14px)",
      }}
    >
      {children}
    </div>
  );
};

export default PagePanel;
