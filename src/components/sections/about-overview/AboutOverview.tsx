"use client";

import React from "react";
import { useResponsiveAnimation } from "./hooks/useResponsiveAnimation";
import AnimatedImagePanel from "./components/AnimatedImagePanel";
import AboutContent from "./components/AboutContent";
import { AboutSection, AboutItem } from "@/lib/sanity";

interface AboutOverviewProps {
  aboutData: AboutSection | null;
  aboutItems: AboutItem[];
}

const AboutOverview: React.FC<AboutOverviewProps> = ({
  aboutData,
  aboutItems,
}) => {
  const { ref, shouldAnimate, isXlScreen } = useResponsiveAnimation();

  // Fallback image URLs and grayscale settings
  const leftImageSrc =
    aboutData?.leftImage?.asset?.url || "/img/about-left.jpg";
  const rightImageSrc =
    aboutData?.rightImage?.asset?.url || "/img/about-right.jpg";
  
  // Get grayscale settings from Sanity data (default to true for fallback)
  const leftImageGrayscale = aboutData?.leftImage?.isGrayscale ?? true;
  const rightImageGrayscale = aboutData?.rightImage?.isGrayscale ?? true;
  
  // Get alt text from Sanity data
  const leftImageAlt = aboutData?.leftImage?.alt;
  const rightImageAlt = aboutData?.rightImage?.alt;

  return (
    <section className="py-12 text-neutral-200 lg:h-[calc(100vh-64px)] lg:max-h-[600px]">
      <div
        ref={ref}
        className="relative flex h-full justify-center overflow-hidden"
      >
        <AboutContent aboutData={aboutData} aboutItems={aboutItems} />
        <AnimatedImagePanel
          imageSrc={leftImageSrc}
          position="left"
          shouldAnimate={shouldAnimate}
          isXlScreen={isXlScreen}
          isGrayscale={leftImageGrayscale}
          alt={leftImageAlt}
        />
        <AnimatedImagePanel
          imageSrc={rightImageSrc}
          position="right"
          shouldAnimate={shouldAnimate}
          isXlScreen={isXlScreen}
          isGrayscale={rightImageGrayscale}
          alt={rightImageAlt}
        />
      </div>
    </section>
  );
};

export default AboutOverview;
