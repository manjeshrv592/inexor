"use client";
import { ChevronDown } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Check if a path is active (including nested routes)
  const isPathActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Get href for navigation item (toggle logic)
  const getNavigationHref = (path: string) => {
    if (path === '/') {
      return '/'; // Home always goes to home
    }
    
    // If currently on this path, go to home (close modal)
    if (isPathActive(path)) {
      return '/';
    }
    
    // Otherwise, go to the path
    return path;
  };

  const handleNavigation = (href: string) => {
    if (typeof window !== "undefined") {
      // Store the current path before navigation
      sessionStorage.setItem("lastPath", pathname);
      // Set navigation source for animation direction
      sessionStorage.setItem("navigationSource", "header");

      // Get the actual navigation target (with toggle logic)
      const navigationTarget = getNavigationHref(href);

      // Navigate to the target
      requestAnimationFrame(() => {
        router.push(navigationTarget);
      });

      // Close mobile menu after navigation
      if (onNavItemClick) {
        onNavItemClick(href);
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
      {/* Hidden Link for prefetching */}
      <Link 
        href={getNavigationHref(href)} 
        prefetch={true}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      
      <button
        onClick={() => handleNavigation(href)}
        className={`font-michroma hover:text-brand-orange-500 xxl:text-sm flex cursor-pointer items-center gap-0 border-none bg-transparent text-[9px] tracking-[1px] duration-300 md:text-[10px] xl:rotate-180 xl:[writing-mode:vertical-rl] ${
          isActive ? "text-brand-orange-500" : "text-white"
        }`}
      >
        <span>{children}</span>
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
