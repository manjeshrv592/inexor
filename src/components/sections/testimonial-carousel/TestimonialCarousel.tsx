"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { Testimonial } from "@/lib/sanity";
import LazyImage from "../../ui/LazyImage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Custom styles to prevent overflow
const swiperStyles = {
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  overflow: "hidden",
};

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplayDuration?: number;
  enableAutoplay?: boolean;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoplayDuration = 5,
  enableAutoplay = true,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.autoplay && enableAutoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  // If no testimonials, don't render anything
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-400">No testimonials available</p>
      </div>
    );
  }

  const handlePrev = () => {
    if (swiperRef.current && !isAnimating) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && !isAnimating) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = () => {
    setIsAnimating(true);
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-6">
        {/* Left button container */}
        {/* <div className="hidden justify-center gap-4 text-white md:flex">
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="outline"
              onClick={isAnimating ? undefined : handlePrev}
              className="disabled:opacity-100 disabled:cursor-default"
            >
              <ArrowLeft size={16} />
            </Button>
          </motion.span>
        </div> */}

        {/* Main testimonial slider */}
        <div
          className="w-full max-w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="mb-2 block text-center lg:hidden">
            <Image
              src="/quotes.svg"
              alt="quotes icon"
              height={17}
              width={12}
              className="mx-auto"
            />
          </span>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={testimonials.length > 1}
            autoplay={
              enableAutoplay && testimonials.length > 1
                ? {
                    delay: autoplayDuration * 1000,
                    disableOnInteraction: false,
                  }
                : false
            }
            speed={500}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            className="!h-full !w-full"
            style={swiperStyles}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!w-full">
                <article className="xxl:grid-cols-[400px_1fr] w-full max-w-full overflow-hidden lg:grid lg:h-[360px] lg:grid-cols-[360px_1fr]">
                  {/* Image Section */}
                  <div className="xxl:max-w-[400px] relative mx-auto h-64 w-full max-w-[360px] min-w-0 overflow-hidden md:h-[360px]">
                    {testimonial.image?.asset?.url ? (
                      <LazyImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={400}
                        height={400}
                        className="mx-auto h-64 w-full object-cover md:h-full"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="mx-auto flex h-64 w-full items-center justify-center bg-neutral-800 md:h-full">
                        <div className="text-center">
                          <div className="mb-2 text-4xl">👤</div>
                          <div className="text-xs text-neutral-400">
                            No Image
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-1 left-0 flex w-full flex-col items-center gap-1 bg-black/30 px-4 py-2 backdrop-blur-3xl md:bottom-4">
                      <span className="font-michroma text-brand-orange-500 text-[10px] md:text-base">
                        {testimonial.name}
                      </span>
                      <span className="text-center text-[10px] tracking-widest text-white">
                        {testimonial.position}, {testimonial.company}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="xxl:px-28 flex w-full max-w-full min-w-0 flex-col overflow-hidden py-6 text-center lg:bg-neutral-900 lg:px-16">
                    <span className="mb-4 hidden text-center lg:block">
                      <Image
                        src="/quotes.svg"
                        alt="quotes icon"
                        height={27}
                        width={22}
                        className="mx-auto"
                      />
                    </span>

                    <div className="flex h-full w-full max-w-full flex-col overflow-hidden">
                      <div className="mb-4 w-full max-w-full bg-neutral-950 p-8">
                        <h4 className="text-brand-orange-500 font-michroma xxl:text-xl text-sm break-words md:text-base">
                          &quot;{testimonial.title}&quot;
                        </h4>
                      </div>

                      <p className="xxl:mb-16 w-full max-w-full flex-1 text-center text-xs break-words text-neutral-300 md:text-base lg:text-sm">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right button container */}
        {/* <div className="hidden justify-center gap-4 text-white md:flex">
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="outline"
              onClick={isAnimating ? undefined : handleNext}
              className="disabled:opacity-100 disabled:cursor-default"
            >
              <ArrowRight size={16} />
            </Button>
          </motion.span>
        </div> */}
      </div>
      {/* Down arrows */}
      <div className="mt-6 flex justify-center gap-4 text-white">
        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="px-6 disabled:cursor-default disabled:opacity-100"
            size="sm"
            variant="outline"
            onClick={isAnimating ? undefined : handlePrev}
          >
            <ArrowLeft size={16} />
          </Button>
        </motion.span>

        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="px-6 disabled:cursor-default disabled:opacity-100"
            size="sm"
            variant="outline"
            onClick={isAnimating ? undefined : handleNext}
          >
            <ArrowRight size={16} />
          </Button>
        </motion.span>
      </div>
    </>
  );
};

export default TestimonialCarousel;
