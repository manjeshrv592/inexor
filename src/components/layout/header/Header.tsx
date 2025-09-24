"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MobileToggle from "./MobileToggle";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { useModal } from "@/contexts/ModalContext";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activePagePath, setActivePagePath] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { closeModal } = useModal();

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleNavItemClick = (href: string) => {
    const isCurrentlyActive = activePagePath === href;

    if (isCurrentlyActive) {
      // If clicking on active page, close it with animation
      setActivePagePath(null);
      closeModal();
    } else {
      // If clicking on different page, open it
      setActivePagePath(href);
      router.push(href);
    }
  };

  // Update active page when pathname changes (for direct navigation)
  React.useEffect(() => {
    if (pathname === "/") {
      setActivePagePath(null);
    } else {
      setActivePagePath(pathname);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 z-200 flex w-full flex-col lg:h-screen lg:w-28">
      <MobileToggle isOpen={isMobileNavOpen} onToggle={toggleMobileNav} />
      <Logo />
      <Navigation
        isOpen={isMobileNavOpen}
        activePagePath={activePagePath}
        onNavItemClick={handleNavItemClick}
      />
    </header>
  );
};

export default Header;
