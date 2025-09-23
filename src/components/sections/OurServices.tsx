"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import ServiceComponent from "@/components/ServiceComponent";
import { ChevronRight } from "lucide-react";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";
import { ServicesSection, ServiceForHomepage } from "@/lib/sanity";

interface OurServicesProps {
  servicesSection: ServicesSection | null;
  serviceItems: ServiceForHomepage[];
}

const OurServices: React.FC<OurServicesProps> = ({
  servicesSection,
  serviceItems,
}) => {
  const [activeEl, setActiveEl] = useState(4);
  const [clickedItem, setClickedItem] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Hook to detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Set the default service as active
  useEffect(() => {
    if (
      serviceItems.length > 0 &&
      activeEl > Math.min(serviceItems.length, 4)
    ) {
      setActiveEl(Math.min(serviceItems.length, 4));
    }
  }, [serviceItems.length, activeEl]);

  // Return early if no service items
  if (!serviceItems || serviceItems.length === 0) {
    return (
      <Section className="overflow-hidden">
        <Container>
          <div className="text-center">
            <SectionTitle className="mb-2">
              {servicesSection?.title || "OUR SERVICES"}
            </SectionTitle>
          </div>
          <div className="py-12 text-center">
            <p className="text-neutral-400">
              No services available at the moment.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  // Function to get chevron opacity based on active element and item number
  const getChevronOpacity = (itemNumber: number) => {
    if (activeEl === 1 || activeEl === 4) {
      switch (itemNumber) {
        case 1:
          return 0.25; // 10%
        case 2:
          return 0.5; // 40%
        case 3:
          return 0.75; // 80%
        case 4:
          return 1; // 100%
        default:
          return 1;
      }
    }
    return 1; // Default opacity for other active states
  };

  // Function to get animation properties for each item based on active element
  const getItemAnimation = (itemNumber: number) => {
    // Desktop positions (horizontal layout) - fixed for 4 items
    const desktopPositions = {
      4: {
        1: { left: 0, width: "34px", iconRotated: false },
        2: { left: "50px", width: "34px", iconRotated: false },
        3: { left: "100px", width: "34px", iconRotated: false },
        4: { left: "150px", width: "34px", iconRotated: false },
      },
      3: {
        1: { left: 0, width: "34px", iconRotated: false },
        2: { left: "50px", width: "84px", iconRotated: false },
        3: { left: "150px", width: "34px", iconRotated: false },
        4: { left: "calc(100% - 134px)", width: "134px", iconRotated: true },
      },
      2: {
        1: { left: 0, width: "134px", iconRotated: false },
        2: { left: "150px", width: "34px", iconRotated: false },
        3: { left: "calc(100% - 134px)", width: "84px", iconRotated: true },
        4: { left: "calc(100% - 34px)", width: "34px", iconRotated: true },
      },
      1: {
        1: { left: "150px", width: "34px", iconRotated: false },
        2: { left: "calc(100% - 134px)", width: "34px", iconRotated: true },
        3: { left: "calc(100% - 84px)", width: "34px", iconRotated: true },
        4: { left: "calc(100% - 34px)", width: "34px", iconRotated: true },
      },
    };

    // Mobile positions (vertical layout) - fixed for 4 items
    const mobilePositions = {
      4: {
        1: { top: 0, height: "34px", width: "100%", iconRotated: false },
        2: { top: "50px", height: "34px", width: "100%", iconRotated: false },
        3: { top: "100px", height: "34px", width: "100%", iconRotated: false },
        4: { top: "150px", height: "34px", width: "100%", iconRotated: false },
      },
      3: {
        1: { top: 0, height: "34px", width: "100%", iconRotated: false },
        2: { top: "50px", height: "84px", width: "100%", iconRotated: false },
        3: { top: "150px", height: "34px", width: "100%", iconRotated: false },
        4: {
          top: "calc(100% - 134px)",
          height: "134px",
          width: "100%",
          iconRotated: true,
        },
      },
      2: {
        1: { top: 0, height: "134px", width: "100%", iconRotated: false },
        2: { top: "150px", height: "34px", width: "100%", iconRotated: false },
        3: {
          top: "calc(100% - 134px)",
          height: "84px",
          width: "100%",
          iconRotated: true,
        },
        4: {
          top: "calc(100% - 34px)",
          height: "34px",
          width: "100%",
          iconRotated: true,
        },
      },
      1: {
        1: { top: "150px", height: "34px", width: "100%", iconRotated: false },
        2: {
          top: "calc(100% - 134px)",
          height: "34px",
          width: "100%",
          iconRotated: true,
        },
        3: {
          top: "calc(100% - 84px)",
          height: "34px",
          width: "100%",
          iconRotated: true,
        },
        4: {
          top: "calc(100% - 34px)",
          height: "34px",
          width: "100%",
          iconRotated: true,
        },
      },
    };

    // Use appropriate positions based on screen size
    const positions = isDesktop ? desktopPositions : mobilePositions;
    const baseAnimation =
      positions[activeEl as keyof typeof positions][
        itemNumber as keyof (typeof positions)[4]
      ];

    // Add opacity animation for the clicked item
    const isClickedItem = clickedItem === itemNumber;
    return {
      ...baseAnimation,
      opacity: isClickedItem ? 0 : 1,
    };
  };

  // Animation transition settings
  const transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };

  // Handle animation complete - reset clicked item
  const handleAnimationComplete = (itemNumber: number) => {
    // Reset clicked item when animation completes
    if (clickedItem === itemNumber) {
      setClickedItem(null);
    }
  };

  // Handle item click - set both active element and clicked item
  const handleItemClick = (itemNumber: number) => {
    setClickedItem(itemNumber);
    setActiveEl(itemNumber);
  };

  // Function to render the appropriate component based on activeEl
  const renderActiveComponent = () => {
    // Only use the first 4 services for display
    const displayServices = serviceItems.slice(0, 4);
    const activeService = displayServices[activeEl - 1];
    if (!activeService) return null;

    return (
      <ServiceComponent
        key={activeService._id}
        code={activeService.code}
        heading1={activeService.homepagePreview.heading1}
        heading2={activeService.homepagePreview.heading2}
        description={activeService.homepagePreview.description}
        backgroundImage={activeService.homepagePreview.backgroundImage}
        serviceCode={activeService.code}
      />
    );
  };

  // Function to get the appropriate title based on activeEl
  const getActiveTitle = () => {
    // Only use the first 4 services for display
    const displayServices = serviceItems.slice(0, 4);
    const activeService = displayServices[activeEl - 1];
    return activeService?.title || "";
  };

  return (
    <Section className="xxl:pl-20 overflow-hidden lg:pl-20">
      <Container>
        <div className="text-center">
          <SectionTitle className="mb-2">
            {servicesSection?.title || "OUR SERVICES"}
          </SectionTitle>
        </div>

        <div className="text-center">
          <motion.h3
            className="mb-4 text-lg"
            key={activeEl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {getActiveTitle()}
          </motion.h3>
        </div>
        {/* Main animation container start */}
        <div className="relative h-[80vh] lg:max-h-[450px]">
          {/*
            Render service items dynamically - limited to first 4 items 
            Note: The fixed positioning is designed for exactly 4 services.
            To support more services, you would need to implement dynamic positioning
            or create additional position configurations.
          */}
          {serviceItems.slice(0, 4).map((service, index) => {
            const itemNumber = index + 1;
            const animation = getItemAnimation(itemNumber);

            return (
              <motion.div
                key={service._id}
                className={`absolute cursor-pointer bg-[#2e2e2e] ${
                  isDesktop ? "top-0 h-full" : "left-0 w-full"
                }`}
                animate={animation}
                transition={transition}
                onAnimationComplete={() => handleAnimationComplete(itemNumber)}
                onClick={() => handleItemClick(itemNumber)}
              >
                <div
                  className={`font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] ${
                    isDesktop ? "-rotate-90" : "rotate-0"
                  }`}
                >
                  {service.code}
                </div>
                <span
                  className={`absolute ${
                    isDesktop
                      ? "bottom-2 left-1/2 -translate-x-1/2"
                      : "top-1/2 right-2 -translate-y-1/2"
                  } flex transition-transform duration-500 ${
                    animation.iconRotated
                      ? isDesktop
                        ? "rotate-180"
                        : "rotate-90"
                      : isDesktop
                        ? "rotate-0"
                        : "-rotate-90"
                  }`}
                  style={{ opacity: getChevronOpacity(itemNumber) }}
                >
                  <ChevronRight size={16} color="#f65009" />
                  <ChevronRight
                    className="-ml-[10px]"
                    size={16}
                    color="#f65009"
                  />
                </span>
              </motion.div>
            );
          })}
          {/* Center container */}
          <motion.div
            className={`absolute z-20 ${
              isDesktop
                ? "top-0 left-1/2 h-full w-[calc(100%-300px)] -translate-x-1/2"
                : "top-1/2 left-0 h-[calc(100%-300px)] w-full -translate-y-1/2"
            }`}
            key={activeEl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {renderActiveComponent()}
          </motion.div>
        </div>
        {/* Main animation container end */}
      </Container>
    </Section>
  );
};

export default OurServices;
