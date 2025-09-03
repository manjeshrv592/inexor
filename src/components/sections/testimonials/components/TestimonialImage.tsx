import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialImageProps {
  testimonial: Testimonial;
  currentIndex: number;
  isAnimating: boolean;
}

const TestimonialImage: React.FC<TestimonialImageProps> = ({
  testimonial,
  currentIndex,
  isAnimating,
}) => {
  return (
    <div className="xxl:max-w-[400px] relative mx-auto w-full max-w-[360px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative"
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={400}
            height={400}
            className="mx-auto size-32 md:size-full md:object-cover"
            priority={currentIndex === 0}
          />
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
