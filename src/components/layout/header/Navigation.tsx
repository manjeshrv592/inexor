"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { NavigationItem, getNavigationData } from "@/lib/sanity/navigation";

interface NavigationProps {
  isOpen: boolean;
  activePagePath?: string | null;
  onNavItemClick?: (href: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, activePagePath }) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        console.log("🔄 Fetching navigation configuration from Sanity...");
        const { items } = await getNavigationData();
        console.log("✅ Navigation configuration received:", { items });
        console.log(
          "📋 Items details:",
          items.map((item) => ({
            label: item.label,
            href: item.href,
            hasDropdown: item.hasDropdown,
          })),
        );
        setNavigationItems(items);
      } catch (error) {
        console.error("❌ Failed to fetch navigation configuration:", error);
        // Don't set any fallback items - keep navigationItems empty
      }
    };

    fetchNavigationData();
  }, []);

  const displayItems = navigationItems;

  console.log("🎯 Navigation render state:", {
    itemsCount: displayItems.length,
    items: displayItems,
  });

  // Don't render navigation if no items are available
  if (displayItems.length === 0) {
    console.log("⚠️ No navigation configuration found - returning null");
    return null;
  }

  return (
    <motion.nav
      className="z-30 flex items-center justify-center overflow-hidden lg:flex lg:!h-auto lg:flex-1"
      initial={{ height: 0 }}
      animate={{
        height: isOpen ? 64 : 0, // Using specific height instead of "auto"
      }}
      transition={{
        duration: 0.4,
        ease: [0.68, -0.55, 0.27, 1.55],
      }}
      style={{
        overflow: "hidden",
      }}
    >
      <motion.ul
        className="xxl:p-0 flex w-[calc(100%-40px)] items-center justify-center bg-[#1f1f1f] px-4 py-6 [box-shadow:inset_0_-4px_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_0_rgba(0,0,0,0.25)] lg:h-full lg:w-auto lg:flex-col lg:gap-6 lg:bg-transparent lg:px-0 lg:py-8 lg:!opacity-100 lg:[box-shadow:none]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          delay: isOpen ? 0.1 : 0,
          ease: [0.68, -0.55, 0.27, 1.55],
        }}
      >
        {displayItems.map((item, index) => (
          <motion.div
            key={item._id || item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : -20,
            }}
            className="lg:!translate-y-0 lg:!opacity-100"
            transition={{
              duration: 0.3,
              delay: isOpen ? index * 0.1 : 0,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
          >
            <NavItem
              href={item.href}
              hasDropdown={item.hasDropdown}
              isActive={activePagePath === item.href}
            >
              {item.label}
            </NavItem>
          </motion.div>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default Navigation;
