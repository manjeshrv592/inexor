"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../../../../lib/sanity";

interface TestimonialImageProps {
  testimonial: Testimonial;
  currentIndex: number;
  animationDirection: "next" | "prev";
}

const TestimonialImage: React.FC<TestimonialImageProps> = ({
  testimonial,
  currentIndex,
  animationDirection,
}) => {
  // Check if image exists and has asset
  const imageUrl = testimonial.image?.asset?.url;

  return (
    <div className="xxl:max-w-[400px] relative mx-auto h-64 w-full max-w-[360px] overflow-hidden md:h-[360px]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: animationDirection === "next" ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: animationDirection === "next" ? "-100%" : "100%" }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={testimonial.name}
              width={400}
              height={400}
              className="mx-auto h-64 w-full object-cover md:h-full"
              priority={currentIndex === 0}
            />
          ) : (
            // Fallback placeholder when no image is available
            <div className="mx-auto flex h-64 w-full items-center justify-center bg-neutral-800 md:h-full">
              <div className="text-center">
                <div className="mb-2 text-4xl">👤</div>
                <div className="text-xs text-neutral-400">No Image</div>
              </div>
            </div>
          )}
          <motion.div
            className="absolute bottom-1 left-0 flex w-full flex-col items-center gap-1 bg-black/30 px-4 py-2 backdrop-blur-3xl md:bottom-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <span className="font-michroma text-brand-orange-500 text-[10px] md:text-base">
              {testimonial.name}
            </span>
            <span className="text-[10px] tracking-widest text-white">
              {testimonial.position}, {testimonial.company}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialImage;
