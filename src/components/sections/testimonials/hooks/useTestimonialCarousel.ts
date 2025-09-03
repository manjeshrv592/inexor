import { useState, useCallback, useEffect } from "react";
import { testimonials } from "@/data/testimonials";

export const useTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToTestimonial = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;

      setIsAnimating(true);
      setCurrentIndex(index);

      // Reset animation state after transition
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, currentIndex],
  );

  // Auto-play functionality (optional)
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoPlayInterval);
  }, [nextTestimonial]);

  return {
    currentIndex,
    currentTestimonial: testimonials[currentIndex],
    isAnimating,
    nextTestimonial,
    prevTestimonial,
    goToTestimonial,
    totalTestimonials: testimonials.length,
  };
};
