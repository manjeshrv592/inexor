"use client";

import { useState, useCallback, useEffect } from "react";
import { Testimonial } from "../../../../lib/sanity";

export const useTestimonialCarousel = (
  testimonials: Testimonial[],
  autoplayDuration: number = 5,
  enableAutoplay: boolean = true,
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">(
    "next",
  );

  const nextTestimonial = useCallback(() => {
    if (isAnimating || testimonials.length === 0) return;

    setAnimationDirection("next");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (isAnimating || testimonials.length === 0) return;

    setAnimationDirection("prev");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const goToTestimonial = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex || testimonials.length === 0)
        return;

      setIsAnimating(true);
      setCurrentIndex(index);

      // Reset animation state after transition
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, currentIndex, testimonials.length],
  );

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Auto-play functionality (optional)
  useEffect(() => {
    if (
      !enableAutoplay ||
      autoplayDuration <= 0 ||
      testimonials.length <= 1 ||
      isPaused
    ) {
      return;
    }

    const autoPlayInterval = setInterval(() => {
      nextTestimonial();
    }, autoplayDuration * 1000); // Convert seconds to milliseconds

    return () => clearInterval(autoPlayInterval);
  }, [
    nextTestimonial,
    enableAutoplay,
    autoplayDuration,
    testimonials.length,
    isPaused,
  ]);

  // Handle case where there are no testimonials
  if (testimonials.length === 0) {
    return {
      currentIndex: 0,
      currentTestimonial: null,
      isAnimating: false,
      animationDirection: "next" as const,
      nextTestimonial: () => {},
      prevTestimonial: () => {},
      goToTestimonial: () => {},
      pauseAutoplay: () => {},
      resumeAutoplay: () => {},
      totalTestimonials: 0,
    };
  }

  return {
    currentIndex,
    currentTestimonial: testimonials[currentIndex],
    isAnimating,
    animationDirection,
    nextTestimonial,
    prevTestimonial,
    goToTestimonial,
    pauseAutoplay,
    resumeAutoplay,
    totalTestimonials: testimonials.length,
  };
};
