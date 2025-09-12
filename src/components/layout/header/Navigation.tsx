"use client";

import { motion } from "framer-motion";
import NavItem from "./NavItem";

interface NavigationProps {
  isOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen }) => {
  const navigationItems = [
    { href: "/resources", label: "Resources", hasDropdown: true },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/about", label: "About Us", hasDropdown: false },
    { href: "/faq", label: "FAQ's", hasDropdown: false },
  ];

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
        className="xxl:p-0 flex w-[calc(100%-40px)] items-center justify-center bg-[#1f1f1f] px-4 py-6 [box-shadow:inset_0_-4px_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_0_rgba(0,0,0,0.25)] xl:h-full xl:w-auto xl:flex-col xl:gap-8 xl:bg-transparent xl:px-0 xl:py-8 xl:!opacity-100 xl:[box-shadow:none]"
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
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.href}
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
            <NavItem href={item.href} hasDropdown={item.hasDropdown}>
              {item.label}
            </NavItem>
          </motion.div>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default Navigation;
