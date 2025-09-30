"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

interface ContactUsButtonProps {
  className?: string;
}

const ContactUsButton: React.FC<ContactUsButtonProps> = ({ className }) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  
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

  const handleContactClick = () => {
    console.log("📞 Contact Us button clicked from", pathname);
    if (typeof window !== 'undefined') {
      // If user is already on contact page, navigate to home instead
      const targetHref = pathname === '/contact' ? '/' : '/contact';
      console.log("🎯 Contact target href:", targetHref, "(current:", pathname, ")");
      
      // Store the current path before navigation
      sessionStorage.setItem('lastPath', pathname);
      // Set navigation source for animation direction
      sessionStorage.setItem('navigationSource', 'contact-button');
      
      // Always use transition router to prevent page reload
      // Animations will only show when transitioning from/to root due to PageTransition component logic
      console.log("✨ Using transition router for contact navigation");
      requestAnimationFrame(() => {
        router.push(targetHref);
      });
    }
  };

  return (
    <Button
      onClick={handleContactClick}
      variant={hasScrolledPastHero ? "default" : "outline"}
      size={hasScrolledPastHero ? "sm" : undefined}
      className={`font-michroma text-xs tracking-[1px] ${
        !hasScrolledPastHero ? '[&_.bg-svg_path]:!stroke-[#2A2A2A]' : ''
      } ${className}` }
    >
      Contact Us
    </Button>
  );
};

export default ContactUsButton;
