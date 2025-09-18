"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import Link from "next/link";

interface ContactUsButtonProps {
  className?: string;
}

const ContactUsButton: React.FC<ContactUsButtonProps> = ({ className }) => {
  // State to track if user has scrolled past the hero section
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled past the viewport height (which is the hero section height)
      const scrolledPast = window.scrollY > window.innerHeight;
      setHasScrolledPastHero(scrolledPast);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page is already scrolled
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link href="/contact">
      <Button
        variant={hasScrolledPastHero ? "default" : "outline"}
        size={hasScrolledPastHero ? "sm" : undefined}
        className={`font-michroma text-xs tracking-[1px] ${className}`}
      >
        Contact Us
      </Button>
    </Link>
  );
};

export default ContactUsButton;
