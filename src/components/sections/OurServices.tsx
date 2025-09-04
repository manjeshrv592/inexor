"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import Ior from "@/components/Ior";
import Vat from "@/components/Vat";
import Ddp from "@/components/Ddp";
import Eor from "@/components/Eor";
import { ChevronRight } from "lucide-react";
import Section from "../layout/Section";
import SectionTitle from "../ui/SectionTitle";

const OurServices = () => {
  const [activeEl, setActiveEl] = useState(4);
  const [clickedItem, setClickedItem] = useState<number | null>(null);

  // Function to get animation properties for each item based on active element
  const getItemAnimation = (itemNumber: number) => {
    const positions = {
      4: {
        1: { left: 0, width: 34, iconRotated: false },
        2: { left: 50, width: 34, iconRotated: false },
        3: { left: 100, width: 34, iconRotated: false },
        4: { left: 150, width: 34, iconRotated: false },
      },
      3: {
        1: { left: 0, width: 34, iconRotated: false },
        2: { left: 50, width: 84, iconRotated: false },
        3: { left: 150, width: 34, iconRotated: false },
        4: { left: "calc(100% - 134px)", width: 134, iconRotated: true },
      },
      2: {
        1: { left: 0, width: 134, iconRotated: false },
        2: { left: 150, width: 34, iconRotated: false },
        3: { left: "calc(100% - 134px)", width: 84, iconRotated: true },
        4: { left: "calc(100% - 34px)", width: 34, iconRotated: true },
      },
      1: {
        1: { left: 150, width: 34, iconRotated: false },
        2: { left: "calc(100% - 134px)", width: 34, iconRotated: true },
        3: { left: "calc(100% - 84px)", width: 34, iconRotated: true },
        4: { left: "calc(100% - 34px)", width: 34, iconRotated: true },
      },
    };

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
    switch (activeEl) {
      case 1:
        return <Vat key="vat" />;
      case 2:
        return <Ddp key="ddp" />;
      case 3:
        return <Eor key="eor" />;
      case 4:
        return <Ior key="ior" />;
      default:
        return <Ior key="ior" />;
    }
  };

  // Function to get the appropriate title based on activeEl
  const getActiveTitle = () => {
    switch (activeEl) {
      case 1:
        return "GLOBAL VAT REFUND ASSISTANCE (VAT)";
      case 2:
        return "DELIVERED DUTY PAID (DDP)";
      case 3:
        return "EXPORTER OF RECORD (EOR)";
      case 4:
        return "IMPORTER OF RECORD (IOR)";
      default:
        return "IMPORTER OF RECORD (IOR)";
    }
  };

  return (
    <Section className="overflow-hidden">
      <Container>
        <div className="text-center">
          <SectionTitle>OUR SERVICES</SectionTitle>
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
        {/* Main elements container start */}
        <div className="relative h-80 bg-blue-500">
          {/* Left container */}
          {/* This is item 1 */}
          <motion.div
            className="absolute top-0 cursor-pointer bg-[#2e2e2e] xl:h-full"
            animate={getItemAnimation(1)}
            transition={transition}
            onAnimationComplete={() => handleAnimationComplete(1)}
            onClick={() => handleItemClick(1)}
          >
            <div className="font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs xl:-rotate-90">
              VAT
            </div>
            <span
              className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 transition-transform duration-500 ${
                getItemAnimation(1).iconRotated ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronRight size={16} color="#f65009" />
              <ChevronRight className="-ml-[10px]" size={16} color="#f65009" />
            </span>
          </motion.div>
          {/* This is item 2 */}
          <motion.div
            className="absolute top-0 cursor-pointer bg-[#2e2e2e] xl:h-full"
            animate={getItemAnimation(2)}
            transition={transition}
            onAnimationComplete={() => handleAnimationComplete(2)}
            onClick={() => handleItemClick(2)}
          >
            <div className="font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs xl:-rotate-90">
              DDP
            </div>
            <span
              className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 transition-transform duration-500 ${
                getItemAnimation(2).iconRotated ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronRight size={16} color="#f65009" />
              <ChevronRight className="-ml-[10px]" size={16} color="#f65009" />
            </span>
          </motion.div>
          {/* This is item 3 */}
          <motion.div
            className="absolute top-0 cursor-pointer bg-[#2e2e2e] xl:h-full"
            animate={getItemAnimation(3)}
            transition={transition}
            onAnimationComplete={() => handleAnimationComplete(3)}
            onClick={() => handleItemClick(3)}
          >
            <div className="font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs xl:-rotate-90">
              EOR
            </div>
            <span
              className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 transition-transform duration-500 ${
                getItemAnimation(3).iconRotated ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronRight size={16} color="#f65009" />
              <ChevronRight className="-ml-[10px]" size={16} color="#f65009" />
            </span>
          </motion.div>
          {/* This is item 4 */}
          <motion.div
            className="absolute top-0 cursor-pointer bg-[#2e2e2e] xl:h-full"
            animate={getItemAnimation(4)}
            transition={transition}
            onAnimationComplete={() => handleAnimationComplete(4)}
            onClick={() => handleItemClick(4)}
          >
            <div className="font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs xl:-rotate-90">
              IOR
            </div>
            <span
              className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 transition-transform duration-500 ${
                getItemAnimation(4).iconRotated ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronRight size={16} color="#f65009" />
              <ChevronRight className="-ml-[10px]" size={16} color="#f65009" />
            </span>
          </motion.div>
          {/* Center container */}
          <motion.div
            className="absolute top-0 left-1/2 z-20 h-full w-[calc(100%-300px)] -translate-x-1/2"
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
          {/* Right container */}
          {/* <div className="absolute right-[150px] top-0 w-[34px] bg-neutral-900 h-full cursor-pointer">
            1
          </div>
          <div className="absolute right-[100px] top-0 w-[34px] bg-neutral-900 h-full cursor-pointer">
            2
          </div>
          <div className="absolute right-[50px] top-0 w-[34px] bg-neutral-900 h-full cursor-pointer">
            3
          </div>
          <div className="absolute right-0 top-0 w-[34px] bg-neutral-900 h-full cursor-pointer">
            4
          </div> */}
        </div>
        {/* Main elements container */}
      </Container>
    </Section>
  );
};

export default OurServices;
