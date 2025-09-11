"use client";

import React, { useState, useEffect } from "react";
import MobileToggle from "./MobileToggle";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`xxl:w-24 fixed top-0 left-0 z-200 flex w-full flex-col lg:w-20 xl:h-screen transition-colors duration-300 ${
        isScrolled ? 'bg-[#050505]' : 'bg-transparent'
      }`}
    >
      <MobileToggle isOpen={isMobileNavOpen} onToggle={toggleMobileNav} />
      <Logo />
      <Navigation isOpen={isMobileNavOpen} />
    </header>
  );
};

export default Header;
