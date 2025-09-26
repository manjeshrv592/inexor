"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { Testimonial } from "@/lib/sanity";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

// Custom styles to prevent overflow
const swiperStyles = {
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  overflow: "hidden",
};

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
  const imageSwiperRef = useRef<SwiperType | null>(null);
  const contentSwiperRef = useRef<SwiperType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (imageSwiperRef.current?.autoplay) {
      imageSwiperRef.current.autoplay.stop();
    }
    if (contentSwiperRef.current?.autoplay) {
      contentSwiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (imageSwiperRef.current?.autoplay && enableAutoplay) {
      imageSwiperRef.current.autoplay.start();
    }
    if (contentSwiperRef.current?.autoplay && enableAutoplay) {
      contentSwiperRef.current.autoplay.start();
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
    if (imageSwiperRef.current && !isAnimating) {
      imageSwiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (imageSwiperRef.current && !isAnimating) {
      imageSwiperRef.current.slideNext();
    }
  };

  const handleSlideChange = () => {
    setIsAnimating(true);
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <article 
      className="xxl:grid-cols-[400px_1fr] lg:grid lg:h-[360px] lg:grid-cols-[360px_1fr] w-full max-w-full overflow-hidden"
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

      {/* Image Section */}
      <div className="xxl:max-w-[400px] relative mx-auto h-64 w-full max-w-[360px] overflow-hidden md:h-[360px] min-w-0">
        <Swiper
          modules={[Navigation, Autoplay, Controller]}
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
            imageSwiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          className="!h-full !w-full"
          style={swiperStyles}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="!w-full">
              <div className="relative h-full w-full max-w-full overflow-hidden">
                {testimonial.image?.asset?.url ? (
                  <Image
                    src={testimonial.image.asset.url}
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Section */}
      <div className="xxl:px-28 flex flex-col py-6 text-center lg:bg-neutral-900 lg:px-16 w-full max-w-full min-w-0 overflow-hidden">
        <span className="mb-4 hidden text-center lg:block">
          <Image
            src="/quotes.svg"
            alt="quotes icon"
            height={27}
            width={22}
            className="mx-auto"
          />
        </span>

        {/* Content Swiper */}
        <div className="w-full flex-1 max-w-full min-w-0 overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade, Controller]}
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
            speed={400}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            onSwiper={(swiper) => {
              contentSwiperRef.current = swiper;
              // Sync with image swiper
              if (imageSwiperRef.current) {
                swiper.controller.control = imageSwiperRef.current;
                imageSwiperRef.current.controller.control = swiper;
              }
            }}
            className="!h-full !w-full"
            style={swiperStyles}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!w-full">
                <motion.div
                  className="flex h-full w-full max-w-full flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="mb-4 w-full max-w-full bg-neutral-950 p-8">
                    <h4 className="text-brand-orange-500 font-michroma xxl:text-xl text-sm md:text-base break-words">
                      &quot;{testimonial.title}&quot;
                    </h4>
                  </div>

                  <p className="xxl:mb-16 flex-1 w-full max-w-full text-center text-sm text-neutral-300 md:text-base break-words">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 text-white">
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrev}
              disabled={isAnimating}
            >
              <ArrowLeft size={16} />
            </Button>
          </motion.span>

          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="outline"
              onClick={handleNext}
              disabled={isAnimating}
            >
              <ArrowRight size={16} />
            </Button>
          </motion.span>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCarousel;
