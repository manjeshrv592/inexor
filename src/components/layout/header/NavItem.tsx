"use client";
import { ChevronDown } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
}) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNavigation = (href: string) => {
    console.log("🔄 Navigation triggered from", pathname, "to", href);
    if (typeof window !== 'undefined') {
      // Special handling for resources route
      const isResourcesRoute = href === '/resources';
      const isCurrentlyOnResources = pathname.startsWith('/resources');
      
      // If user clicks on the same route they're already on, navigate to home instead
      let targetHref;
      if (isResourcesRoute && isCurrentlyOnResources) {
        // User is on /resources/slug and clicks Resources -> go home
        targetHref = '/';
        console.log("🔄 Resources route: User on resources page, going home");
      } else if (pathname === href) {
        // Normal same route logic
        targetHref = '/';
        console.log("🔄 Same route: Going home");
      } else {
        // Different route
        targetHref = href;
        console.log("🔄 Different route: Going to", href);
      }
      
      console.log("🎯 Target href:", targetHref, "(original:", href, ", current:", pathname, ")");
      
      // Store the current path before navigation
      sessionStorage.setItem('lastPath', pathname);
      // Set navigation source for animation direction
      sessionStorage.setItem('navigationSource', 'header');
      
      // Always use transition router to prevent page reload
      // Animations will only show when transitioning from/to root due to PageTransition component logic
      console.log("✨ Using transition router for navigation");
      requestAnimationFrame(() => {
        router.push(targetHref);
      });
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
        onClick={() => handleNavigation(href)}
        className={`font-michroma hover:text-brand-orange-500 xxl:text-sm flex cursor-pointer items-center gap-0 border-none bg-transparent text-[10px] tracking-[1px] duration-300 lg:rotate-180 lg:[writing-mode:vertical-rl] ${
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
            className="mr-[6px]"
          >
            <ChevronDown size={16} color="#f65009" />
          </motion.div>
        )}
      </button>
    </li>
  );
};

export default NavItem;
