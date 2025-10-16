"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import NavItem from "./NavItem";
import { NavigationItem, getNavigationData } from "@/lib/sanity/navigation";
// import { usePrefetch } from "@/hooks/usePrefetch";

interface NavigationProps {
  isOpen: boolean;
  activePagePath?: string | null;
  onNavItemClick?: (href: string) => void;
  firstBlogSlug?: string | null;
}

const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  activePagePath,
  onNavItemClick,
  firstBlogSlug,
}) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  // Prefetch hooks for future hover implementation
  // const { prefetchAboutPage, prefetchFAQPage, prefetchServicesPage, prefetchResourcesPage } = usePrefetch();

  // Prefetch functions for future hover implementation
  // const handleNavItemHover = (href: string) => {
  //   switch (href) {
  //     case '/about':
  //       prefetchAboutPage();
  //       break;
  //     case '/faq':
  //       prefetchFAQPage();
  //       break;
  //     case '/services':
  //       prefetchServicesPage();
  //       break;
  //     case '/resources':
  //       prefetchResourcesPage();
  //       break;
  //   }
  // };

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const { items } = await getNavigationData();

        setNavigationItems(items);
      } catch (error) {
        console.error("❌ Failed to fetch navigation configuration:", error);
        // Don't set any fallback items - keep navigationItems empty
      }
    };

    fetchNavigationData();
  }, []);

  // Dynamically update the resources link with the first blog slug
  const displayItems = useMemo(() => {
    return navigationItems.map((item) => {
      if (item.href === "/resources" && firstBlogSlug) {
        return {
          ...item,
          href: `/resources/blogs/${firstBlogSlug}`,
        };
      }
      return item;
    });
  }, [navigationItems, firstBlogSlug]);

  // Don't render navigation if no items are available
  if (displayItems.length === 0) {
    return null;
  }

  return (
    <motion.nav
      className="z-30 flex items-center justify-center overflow-hidden xl:flex xl:!h-auto xl:flex-1"
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
        className="xxl:p-0 flex w-[calc(100%-20px)] flex-row-reverse items-center justify-between bg-[#1f1f1f] px-2 py-6 [box-shadow:inset_0_-4px_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_0_rgba(0,0,0,0.25)] sm:justify-center sm:gap-6 xl:h-full xl:w-auto xl:flex-col xl:bg-transparent xl:px-0 xl:py-8 xl:!opacity-100 xl:[box-shadow:none]"
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
            className="xl:!translate-y-0 xl:!opacity-100"
            transition={{
              duration: 0.3,
              delay: isOpen ? index * 0.1 : 0,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
          >
            <NavItem
              href={item.href}
              hasDropdown={item.hasDropdown}
              isActive={
                item.href === "/resources" || item.href.startsWith("/resources")
                  ? activePagePath?.startsWith("/resources") || false
                  : item.href === "/services"
                    ? activePagePath?.startsWith("/services") || false
                    : item.href === "/faq"
                      ? activePagePath?.startsWith("/faq") || false
                      : activePagePath === item.href
              }
              onNavItemClick={onNavItemClick}
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
