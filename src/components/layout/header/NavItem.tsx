"use client";
import { ChevronDown } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
  isActive?: boolean;
  onNavItemClick?: (href: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  hasDropdown = false,
  isActive = false,
  onNavItemClick,
}) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [supportsWritingMode, setSupportsWritingMode] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1200);
      console.log("Hello");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Feature detection for writing-mode support
  useEffect(() => {
    const detectWritingModeSupport = () => {
      if (typeof window === "undefined") return;

      // Create a test element to check writing-mode support
      const testElement = document.createElement("div");
      testElement.style.writingMode = "vertical-rl";

      // Check if the browser supports writing-mode
      const isSupported = testElement.style.writingMode === "vertical-rl";
      setSupportsWritingMode(isSupported);

      // Apply fallback styles if writing-mode is not supported
      if (!isSupported && buttonRef.current && window.innerWidth >= 1280) {
        const button = buttonRef.current;
        button.style.transform = "rotate(180deg)";
        button.style.transformOrigin = "center";

        // Apply additional styles to mimic vertical text layout
        const span = button.querySelector("span");
        if (span) {
          span.style.display = "inline-block";
          span.style.transform = "rotate(180deg)";
          span.style.letterSpacing = "1px";
          span.style.lineHeight = "1.2";
        }
      }
    };

    detectWritingModeSupport();
    window.addEventListener("resize", detectWritingModeSupport);
    return () => window.removeEventListener("resize", detectWritingModeSupport);
  }, [isDesktop]);

  const handleNavigation = (href: string) => {
    if (typeof window !== "undefined") {
      // If the navigation item is currently active, toggle to home page
      // Otherwise, navigate to the intended href
      let targetHref;
      if (isActive) {
        // Navigation item is active, so clicking it should go to home
        targetHref = "/";
      } else {
        // Navigation item is not active, navigate to the href
        targetHref = href;
      }

      // Store the current path before navigation
      sessionStorage.setItem("lastPath", pathname);
      // Set navigation source for animation direction
      sessionStorage.setItem("navigationSource", "header");

      // Always use transition router to prevent page reload
      // Animations will only show when transitioning from/to root due to PageTransition component logic

      requestAnimationFrame(() => {
        router.push(targetHref);
      });

      // Close mobile menu when navigating to a different page OR when going home from active section
      if (onNavItemClick) {
        if (targetHref !== "/" || (targetHref === "/" && isActive)) {
          onNavItemClick(href);
        }
      }
    }
  };

  // Calculate chevron rotation based on active state and screen size
  const getChevronRotation = () => {
    if (isActive) {
      return isDesktop ? 270 : 180; // Point up when active
    }
    return isDesktop ? 90 : 0; // Default position
  };

  return (
    <li>
      <button
        ref={buttonRef}
        onClick={() => handleNavigation(href)}
        className={`font-michroma hover:text-brand-orange-500 xxl:text-sm flex cursor-pointer items-center gap-0 border-none bg-transparent text-[9px] tracking-[1px] duration-300 md:text-[10px] ${
          supportsWritingMode
            ? "xl:rotate-180 xl:[writing-mode:vertical-rl]"
            : "xl:fallback-vertical-text"
        } ${isActive ? "text-brand-orange-500" : "text-white"}`}
        style={{
          // Apply inline styles for fallback when writing-mode is not supported
          ...(typeof window !== "undefined" &&
            !supportsWritingMode &&
            window.innerWidth >= 1200 && {
              transform: "rotate(180deg)",
              transformOrigin: "center",
            }),
        }}
      >
        <span
          style={{
            // Apply inline styles to span for fallback
            ...(typeof window !== "undefined" &&
              !supportsWritingMode &&
              window.innerWidth >= 1280 && {
                display: "inline-block",
                transform: "rotate(180deg)",
                letterSpacing: "1px",
                lineHeight: "1.2",
                backgroundColor: "#FF2525",
              }),
          }}
        >
          {children}
        </span>
        {hasDropdown && (
          <motion.div
            animate={{
              rotate: getChevronRotation(),
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-1 xl:mt-0 xl:mr-[6px]"
          >
            <ChevronDown size={16} color="#f65009" />
          </motion.div>
        )}
      </button>
    </li>
  );
};

export default NavItem;
