"use client";
import Container from "../layout/Container";
import Image from "next/image";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { KeyValuePillarsSection, KeyValuePillarItem } from "@/lib/sanity";

interface KeyValuePillarsProps {
  sectionData: KeyValuePillarsSection | null;
  items: KeyValuePillarItem[];
}

// Animation configuration constants
const SCREEN_BREAKPOINT = 1200;
const ANIMATION_CONFIG = {
  large: {
    visibilityThreshold: 5, // 5% visibility
    baseDelay: 0.8,
    additionalDelay: 0.4,
    spanDelay: 0.9,
    dividerDelay: 0.2,
  },
  small: {
    visibilityThreshold: 1, // 1% visibility
    baseDelay: 0.3,
    additionalDelay: 0.2,
    spanDelay: 0.4,
    dividerDelay: 0,
  },
};

const KeyValuePillars = ({ sectionData, items }: KeyValuePillarsProps) => {
  const gridRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Screen size detection hook
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= SCREEN_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Get current animation config based on screen size
  const config = isLargeScreen
    ? ANIMATION_CONFIG.large
    : ANIMATION_CONFIG.small;

  // Bidirectional viewport detection with responsive margins
  const isInViewFromBottom = useInView(gridRef, {
    once: false,
    margin: isLargeScreen ? "-95% 0px -5% 0px" : "-99% 0px -1% 0px",
  });

  const isInViewFromTop = useInView(gridRef, {
    once: false,
    margin: isLargeScreen ? "-5% 0px -95% 0px" : "-1% 0px -99% 0px",
  });

  const isCompletelyOutOfView = useInView(gridRef, {
    once: false,
    margin: "0px 0px 0px 0px",
  });

  const isInView = isInViewFromBottom || isInViewFromTop;

  // Animation state management
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
    if (!isCompletelyOutOfView) {
      setHasAnimated(false);
    }
  }, [isInView, isCompletelyOutOfView]);

  // Calculate animation delays for cards
  const getCardDelays = useCallback(
    (index: number) => {
      const isEven = index % 2 === 1;
      const cardDelay =
        config.baseDelay + Math.floor(index / 2) * config.additionalDelay;
      const spanDelay = cardDelay + config.spanDelay;

      return { cardDelay, spanDelay, isEven };
    },
    [config],
  );

  // Animation variants for better organization
  const cardVariants = {
    initial: (isEven: boolean) => ({
      opacity: 0,
      x: isEven ? -50 : 50,
    }),
    animate: (isEven: boolean) => ({
      opacity: hasAnimated ? 1 : 0,
      x: hasAnimated ? 0 : isEven ? -50 : 50,
    }),
  };

  const spanVariants = {
    initial: { width: "52px" },
    animate: { width: "52px" },
  };

  const dividerVariants = {
    initial: { height: 0 },
    animate: { height: hasAnimated ? "100%" : 0 },
  };

  // Early return if no data
  if (!sectionData || !items || items.length === 0) {
    return null;
  }

  // Render individual pillar card
  const renderPillarCard = (item: KeyValuePillarItem, index: number) => {
    const { isEven } = getCardDelays(index);

    return (
      <motion.article
        key={item._id}
        className={`relative ${
          isEven ? "ml-auto" : ""
        } w-[calc(100%-64px)] bg-[#262626] px-4 py-2 ${
          isEven ? "pl-16 text-left" : "pr-16 text-right"
        } [box-shadow:inset_0_0px_3px_2px_rgba(0,0,0,.25)] [clip-path:polygon(0%_0%,20px_0%,calc(100%-20px)_0%,100%_20px,100%_100%,calc(100%-20px)_100%,20px_100%,0%_calc(100%-20px))] before:absolute before:bottom-[-8px] before:left-[-8px] before:size-5 before:rotate-45 before:bg-[#262626] before:[box-shadow:0_0px_3px_3px_rgba(0,0,0,.25)] before:content-[''] after:absolute after:top-[-8px] after:right-[-8px] after:size-5 after:rotate-45 after:bg-[#262626] after:[box-shadow:0_0px_3px_3px_rgba(0,0,0,.25)] after:content-[''] lg:w-auto lg:px-10 ${
          isEven ? "lg:pl-20" : "lg:pr-20"
        }`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        custom={isEven}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          delay: 0,
        }}
      >
        <motion.span
          className={`absolute top-[1px] ${
            isEven ? "left-[1px]" : "right-[1px]"
          } z-10 flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center ${
            isEven ? "border-r" : "border-l"
          } border-black/25 bg-[#262626] ${
            isEven
              ? "[clip-path:polygon(0%_0%,20px_0%,calc(100%-0px)_0%,100%_20px,100%_100%,calc(100%-20px)_100%,20px_100%,0%_calc(100%-20px))]"
              : "[clip-path:polygon(0%_0%,20px_0%,calc(100%-20px)_0%,100%_20px,100%_100%,calc(100%-20px)_100%,20px_100%,0%_calc(100%-0px))]"
          } ${isEven ? "[box-shadow:0_0px_3px_3px_rgba(0,0,0,.25)]" : ""}`}
          variants={spanVariants}
          initial="initial"
          animate="animate"
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 120,
            delay: 0,
          }}
        >
          <Image
            src="/img/features-icon/feature-04.svg"
            height={28}
            width={28}
            alt="Globe Icon"
          />
        </motion.span>
        <h5 className="text-brand-orange-500 text-center text-sm font-bold">
          {item.title}
        </h5>
        <p className="text-center text-xs text-neutral-300 xl:text-sm">
          {item.description}
        </p>
      </motion.article>
    );
  };

  return (
    <section className="py-12">
      <Container>
        <p className="mx-auto mb-4 max-w-2xl text-center text-xs text-neutral-300 xl:text-sm">
          {sectionData.description}
        </p>
        <div
          ref={gridRef}
          className="relative mx-auto grid max-w-5xl gap-x-16 gap-y-8 overflow-hidden lg:grid-cols-2"
        >
          {/* Animated divider line */}
          <motion.div
            className="bg-brand-orange-500 absolute top-0 left-1/2 hidden w-[1px] lg:inline-block"
            variants={dividerVariants}
            initial="initial"
            animate="animate"
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              mass: 0.8,
              delay: 0,
            }}
          />
          {/* Dynamic pillar cards */}
          {items.map((item, index) => renderPillarCard(item, index))}
        </div>
      </Container>
    </section>
  );
};

export default KeyValuePillars;
