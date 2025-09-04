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

  // Fallback image URLs
  const leftImageSrc =
    aboutData?.leftImage?.asset?.url || "/img/left-image.jpg";
  const rightImageSrc =
    aboutData?.rightImage?.asset?.url || "/img/right-image.jpg";

  return (
    <section className="py-12 text-neutral-200 xl:h-[calc(100vh-64px)] xl:max-h-[600px]">
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
        />
        <AnimatedImagePanel
          imageSrc={rightImageSrc}
          position="right"
          shouldAnimate={shouldAnimate}
          isXlScreen={isXlScreen}
        />
      </div>
    </section>
  );
};

export default AboutOverview;
