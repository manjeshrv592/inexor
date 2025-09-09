"use client";
import Container from "../layout/Container";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KeyValuePillarsSection, KeyValuePillarItem } from "@/lib/sanity";

interface KeyValuePillarsProps {
  sectionData: KeyValuePillarsSection | null;
  items: KeyValuePillarItem[];
}

const KeyValuePillars = ({ sectionData, items }: KeyValuePillarsProps) => {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, {
    once: false, // Animation repeats every time element comes into view
    margin: "-50% 0px -50% 0px", // Trigger when element is 50% visible
  });

  // Don't render if no data
  if (!sectionData || !items || items.length === 0) {
    return null;
  }

  // Helper function to render individual pillar cards
  const renderPillarCard = (item: KeyValuePillarItem, index: number) => {
    const isEven = index % 2 === 1;
    const baseDelay = 0.8; // Base delay for cards
    const additionalDelay = Math.floor(index / 2) * 0.4; // Additional delay for second row
    const cardDelay = baseDelay + additionalDelay;
    const spanDelay = cardDelay + 0.9; // Span collapses after card appears

    return (
      <motion.article
        key={item._id}
        className={`relative ${
          isEven ? "ml-auto" : ""
        } w-[calc(100%-64px)] bg-[#262626] px-4 py-2 ${
          isEven ? "pl-16 text-left" : "pr-16 text-right"
        } [box-shadow:inset_0_0px_3px_2px_rgba(0,0,0,.25)] [clip-path:polygon(0%_0%,20px_0%,calc(100%-20px)_0%,100%_20px,100%_100%,calc(100%-20px)_100%,20px_100%,0%_calc(100%-20px))] before:absolute before:bottom-[-8px] before:left-[-8px] before:size-5 before:rotate-45 before:bg-[#262626] before:[box-shadow:0_0px_3px_3px_rgba(0,0,0,.25)] before:content-[''] after:absolute after:top-[-8px] after:right-[-8px] after:size-5 after:rotate-45 after:bg-[#262626] after:[box-shadow:0_0px_3px_3px_rgba(0,0,0,.25)] after:content-[''] ${
          index >= 2 ? "xl:scale-90" : ""
        } lg:px-10 xl:w-auto ${
          isEven
            ? index >= 2
              ? "xl:pl-22"
              : "xl:pl-20"
            : index >= 2
              ? "xl:pr-22"
              : "xl:pr-20"
        }`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : isEven ? -50 : 50,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          delay: isInView ? cardDelay : index >= 2 ? 0.5 : 0.9,
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
          initial={{ width: "calc(100% - 2px)" }}
          animate={{
            width: isInView ? "52px" : "calc(100% - 2px)",
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 120,
            delay: isInView ? spanDelay : 0,
          }}
        >
          <Image
            src={item.icon.asset.url}
            height={28}
            width={28}
            alt={`${item.title} Icon`}
          />
        </motion.span>
        <h5 className="text-brand-orange-500 text-sm">{item.title}</h5>
        <p className="text-xs text-neutral-300 xl:text-sm">
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
          className="relative mx-auto grid max-w-5xl gap-x-16 gap-y-8 overflow-hidden xl:grid-cols-2"
        >
          {/* Animated divider line */}
          <motion.div
            className="bg-brand-orange-500 absolute top-0 left-1/2 hidden w-[1px] xl:inline-block"
            initial={{ height: 0 }}
            animate={{ height: isInView ? "100%" : 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              mass: 0.8,
              delay: isInView ? 0.2 : 1.3, // Wait for spans (0.5s) + cards 1&2 (0.9s) - overlap
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
