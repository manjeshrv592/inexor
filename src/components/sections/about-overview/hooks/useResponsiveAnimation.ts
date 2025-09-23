import { useState, useEffect, useRef } from "react";

interface UseResponsiveAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  shouldAnimate: boolean;
  isXlScreen: boolean;
}

export const useResponsiveAnimation = (): UseResponsiveAnimationReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isXlScreen, setIsXlScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsXlScreen(window.innerWidth >= 992);
    };

    // Check initial screen size
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting && ratio >= 0.5) {
          // Trigger animation when 50%+ visible
          setShouldAnimate(true);
        } else if (!isIntersecting || ratio <= 0.4) {
          // Reverse animation when not intersecting or only 40% or less visible
          setShouldAnimate(false);
        }
      },
      {
        threshold: [0, 0.2, 0.4, 0.5, 0.8, 1], // More granular thresholds
        rootMargin: "0px", // No margin
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    shouldAnimate,
    isXlScreen,
  };
};
