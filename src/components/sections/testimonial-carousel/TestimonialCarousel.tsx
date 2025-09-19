"use client";

import React from "react";
import Image from "next/image";
import {
  TestimonialImage,
  TestimonialContent,
  TestimonialControls,
} from "./index";
import { useTestimonialCarousel } from "./hooks/useTestimonialCarousel";
import { Testimonial } from "@/lib/sanity";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplayDuration: number;
  enableAutoplay: boolean;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoplayDuration,
  enableAutoplay,
}) => {
  const {
    currentIndex,
    currentTestimonial,
    isAnimating,
    nextTestimonial,
    prevTestimonial,
  } = useTestimonialCarousel(testimonials, autoplayDuration, enableAutoplay);

  // If no current testimonial, don't render anything
  if (!currentTestimonial) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-400">No testimonials available</p>
      </div>
    );
  }

  return (
    <article className="xxl:grid-cols-[400px_1fr] xl:grid xl:h-[360px] xl:grid-cols-[360px_1fr]">
      <span className="mb-2 block text-center xl:hidden">
        <Image
          src="/quotes.svg"
          alt="quotes icon"
          height={17}
          width={12}
          className="mx-auto"
        />
      </span>

      <TestimonialImage
        testimonial={currentTestimonial}
        currentIndex={currentIndex}
      />

      <div className="xxl:px-28 flex flex-col py-6 text-center xl:bg-neutral-900 xl:px-16">
        <TestimonialContent
          testimonial={currentTestimonial}
          currentIndex={currentIndex}
        />

        <TestimonialControls
          onPrev={prevTestimonial}
          onNext={nextTestimonial}
          isAnimating={isAnimating}
        />
      </div>
    </article>
  );
};

export default TestimonialCarousel;
