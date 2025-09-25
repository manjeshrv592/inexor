"use client";

import React, { useState } from "react";
import MobileToggle from "./MobileToggle";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="fixed top-0 left-0 z-200 flex w-full flex-col lg:h-screen lg:w-28">
      <MobileToggle isOpen={isMobileNavOpen} onToggle={toggleMobileNav} />
      <Logo />
      <Navigation isOpen={isMobileNavOpen} />
    </header>
  );
};

export default Header;
