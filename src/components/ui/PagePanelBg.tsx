"use client";

import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

const PagePanelBg = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleBgClick = () => {
    console.log("🌫️ Background clicked - navigating to home from", pathname);
    if (typeof window !== "undefined") {
      const currentPath = pathname;
      const isFromRoot = currentPath === "/";
      const isToRoot = true; // Always going to root

      // Store the current path before navigation
      sessionStorage.setItem("lastPath", currentPath);

      // Use transition router only when navigating from/to root
      if (isFromRoot || isToRoot) {
        console.log("✨ Using transition router for background navigation");
        requestAnimationFrame(() => {
          router.push("/");
        });
      } else {
        // Fallback (shouldn't happen since we're always going to root)
        window.location.href = "/";
      }
    }
  };

  return (
    <div
      onClick={handleBgClick}
      className="fixed inset-0 z-[60] cursor-pointer bg-black"
    ></div>
  );
};

export default PagePanelBg;
