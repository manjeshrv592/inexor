"use client";

import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    console.log("🏠 Logo clicked - navigating to home from", pathname);
    if (typeof window !== "undefined") {
      const currentPath = pathname;
      const isFromRoot = currentPath === "/";
      const isToRoot = true; // Always going to root

      // Store the current path before navigation
      sessionStorage.setItem("lastPath", currentPath);

      // Use transition router only when navigating from/to root
      if (isFromRoot || isToRoot) {
        console.log("✨ Using transition router for logo navigation");
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
    <div className="border-b border-neutral-800 bg-[#050505] p-3 pb-6 text-center xl:border-none xl:bg-transparent xl:p-1 xl:pt-3">
      <button
        onClick={handleLogoClick}
        className="mx-auto block cursor-pointer"
      >
        <Image
          src="/logo.svg"
          alt="Inexor logo"
          width={150}
          height={40}
          className="mx-auto h-auto w-20 xl:w-full"
          priority
        />
      </button>
    </div>
  );
};

export default Logo;
