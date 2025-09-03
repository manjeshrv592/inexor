"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../../../../lib/sanity";

interface TestimonialContentProps {
  testimonial: Testimonial;
  currentIndex: number;
}

const TestimonialContent: React.FC<TestimonialContentProps> = ({
  testimonial,
  currentIndex,
}) => {
  return (
    <>
      <span className="mb-4 hidden text-center xl:block">
        <Image
          src="/quotes.svg"
          alt="quotes icon"
          height={27}
          width={22}
          className="mx-auto"
        />
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className="mb-4 bg-neutral-950 p-8">
            <h4 className="text-brand-orange-500 font-michroma xxl:text-xl text-sm md:text-base">
              &quot;{testimonial.title}&quot;
            </h4>
          </div>

          <p className="xxl:mb-16 mb-8 text-center text-sm text-neutral-300 md:text-base lg:mb-12">
            &quot;{testimonial.quote}&quot;
          </p>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TestimonialContent;
