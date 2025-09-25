"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Calculate chevron rotation based on active state and screen size
  const getChevronRotation = () => {
    if (isActive) {
      return isDesktop ? 270 : 180; // Point up when active
    }
    return isDesktop ? 90 : 0; // Default position
  };

  return (
    <li>
      <Link
        href={href}
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
      </Link>
    </li>
  );
};

export default NavItem;
