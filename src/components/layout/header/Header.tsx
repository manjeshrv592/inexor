"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import MobileToggle from "./MobileToggle";
import Logo from "./Logo";
import Navigation from "./Navigation";

interface HeaderProps {
  firstBlogSlug?: string | null;
  firstServiceSlug?: string | null;
}

const Header: React.FC<HeaderProps> = ({ firstBlogSlug, firstServiceSlug }) => {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-200 flex w-full flex-col xl:h-screen xl:w-28">
      <MobileToggle isOpen={isMobileNavOpen} onToggle={toggleMobileNav} />
      <Logo />
      <Navigation
        isOpen={isMobileNavOpen}
        activePagePath={pathname}
        onNavItemClick={closeMobileNav}
        firstBlogSlug={firstBlogSlug}
        firstServiceSlug={firstServiceSlug}
      />
    </header>
  );
};

export default Header;
