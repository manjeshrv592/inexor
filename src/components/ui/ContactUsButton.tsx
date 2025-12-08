"use client";
// Remove this commit
import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

interface ContactUsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ContactUsButton: React.FC<ContactUsButtonProps> = ({
  className,
  children,
}) => {
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

  // Prewarm the contact route to reduce delay
  useEffect(() => {
    try {
      router.prefetch?.("/contact");
    } catch {}
  }, [router]);

  const handleContactClick = () => {
    if (typeof window !== "undefined") {
      // If user is already on contact page, navigate to home instead
      const targetHref = pathname === "/contact" ? "/" : "/contact";

      // Store the current path before navigation
      sessionStorage.setItem("lastPath", pathname);
      // Set navigation source for animation direction
      sessionStorage.setItem("navigationSource", "contact-button");

      // Always use transition router to prevent page reload
      // Animations will only show when transitioning from/to root due to PageTransition component logic
      requestAnimationFrame(() => {
        router.push(targetHref);
      });
    }
  };

  // Determine what to show based on screen size and scroll state
  const shouldShowPhoneIcon = hasScrolledPastHero;

  return (
    <Button
      onClick={handleContactClick}
      onMouseEnter={() => {
        try {
          router.prefetch?.("/contact");
        } catch {}
      }}
      variant={hasScrolledPastHero ? "default" : "outline"}
      size={hasScrolledPastHero ? "sm" : undefined}
      className={`font-michroma text-xs tracking-[1px] ${
        !hasScrolledPastHero ? "[&_.bg-svg_path]:!stroke-[#2A2A2A]" : ""
      } ${className}`}
    >
      {shouldShowPhoneIcon ? (
        <>
          {/* Show phone icon on screens < 1200px, text on larger screens */}
          <span className="xl:hidden">
            <Phone size={16} />
          </span>
          <span className="hidden xl:inline">{children || "Contact Us"}</span>
        </>
      ) : (
        children || "Contact Us"
      )}
    </Button>
  );
};

export default ContactUsButton;
