"use client";

import { Button } from "@/components/ui/button";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import UseCasesSection from "@/components/ui/UseCasesSection";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getServices,
  getServiceByCode,
  getServicesPageSettings,
  type Service,
  type ServicesPageSettings,
} from "@/lib/sanity/service";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [servicesPageSettings, setServicesPageSettings] =
    useState<ServicesPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const rightPanelRef = React.useRef<HTMLDivElement>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData, pageSettings] = await Promise.all([
          getServices(),
          getServicesPageSettings(),
        ]);

        setServices(servicesData);
        setServicesPageSettings(pageSettings);

        // Set first service as active by default
        if (servicesData.length > 0) {
          const targetService = await getServiceByCode(servicesData[0].code);
          if (targetService) {
            setActiveService(targetService);
            setActiveIndex(0);
          }
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle service click
  const handleServiceClick = async (service: Service, index: number) => {
    try {
      const fullService = await getServiceByCode(service.code);
      setActiveService(fullService);
      setActiveIndex(index);

      // Scroll right panel to top
      if (rightPanelRef.current) {
        rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="h-full bg-[#2f2f2f] lg:grid lg:h-full lg:grid-cols-[150px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* left Panel - Blog List */}
      <div className="relative p-5 lg:hidden">
        <div className="absolute top-0 left-0 size-full">
          <Image
            src={
              servicesPageSettings?.leftPanelImage?.asset?.url ||
              "/img/left-image.jpg"
            }
            alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
            fill
            className={`object-cover ${
              servicesPageSettings?.applyGrayscale !== false ? "grayscale" : ""
            }`}
          />
          {/* <div className="absolute inset-0 bg-black/80">&nbsp;</div> */}
        </div>
        {/* Mobile list */}
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => (
            <Button
              key={service._id}
              className="font-michroma text-[10px] tracking-[1px] lg:w-full"
              variant={activeIndex === index ? "default" : "outline"}
              onClick={() => handleServiceClick(service, index)}
            >
              {service.code}
            </Button>
          ))}
        </div>
      </div>

      {/* left Panel - Blog List - Desktop */}
      <div className="relative hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:p-1">
        <div className="absolute top-0 left-0 size-full">
          <Image
            src={
              servicesPageSettings?.leftPanelImage?.asset?.url ||
              "/img/left-image.jpg"
            }
            alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
            fill
            className={`object-cover ${
              servicesPageSettings?.applyGrayscale !== false ? "grayscale" : ""
            }`}
          />
          {/* <div className="absolute inset-0 bg-black/80">&nbsp;</div> */}
        </div>
        <div className="relative z-10 h-[calc(100vh-230px)] overflow-y-auto pr-1">
          <div className="flex h-full flex-col justify-center gap-4">
            {services.map((service, index) => (
              <Button
                key={service._id}
                className="font-michroma text-[10px] tracking-[1px] lg:w-full"
                variant={activeIndex === index ? "default" : "outline"}
                onClick={() => handleServiceClick(service, index)}
              >
                {service.code}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Left Panel */}
      {/* <div className="d-none relative h-[55px] lg:h-full">
        <div className="relative z-10 flex size-full flex-col justify-center gap-5 px-2">
          <div className="flex gap-5 lg:flex-col">
            {services.map((service, index) => (
              <Button
                key={service._id}
                className="font-michroma text-[10px] tracking-[1px] lg:w-full"
                variant={activeIndex === index ? "default" : "outline"}
                onClick={() => handleServiceClick(service, index)}
              >
                {service.code}
              </Button>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 size-full">
          <Image
            src="/img/left-image.jpg"
            alt="blog bg"
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/80">&nbsp;</div>
        </div>
      </div> */}

      {/* Right Panel - Service Content */}
      <div
        ref={rightPanelRef}
        className="h-[calc(100vh-238px)] overflow-y-auto bg-neutral-900 lg:h-full"
      >
        <div className="pb-4">
          <AnimatePresence mode="wait">
            {activeService ? (
              <motion.div
                key={activeService._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Featured Image */}
                <div className="relative mb-6 h-[300px]">
                  <div className="absolute top-0 left-0 size-full">
                    {/* <div className="absolute inset-0 z-10 bg-black/60"></div> */}
                    <Image
                      src={
                        activeService.featuredImage?.asset.url ||
                        "/img/left-image.jpg"
                      }
                      alt={
                        activeService.featuredImage?.alt || activeService.title
                      }
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="relative z-10 flex size-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2 bg-black/5 p-4 text-center backdrop-blur-[5px]">
                      <h2 className="font-michroma text-lg">
                        {activeService.title.toUpperCase()}
                      </h2>
                      <h5 className="max-w-[300px]">
                        {activeService.shortDescription}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="mx-auto max-w-3xl px-5 text-justify text-sm text-neutral-100">
                  {/* Service Content */}
                  {activeService.content && (
                    <PortableTextRenderer content={activeService.content} />
                  )}
                  {/* Use Cases Section - placed at the end of the blog content */}
                  {activeService.useCases?.steps &&
                    activeService.useCases.steps.length > 0 && (
                      <UseCasesSection
                        title={activeService.useCases.title || "Use cases"}
                        steps={activeService.useCases.steps}
                        imageUrl={
                          activeService.useCases.image?.asset?.url ||
                          "/img/left-image.jpg"
                        }
                        imageAlt={
                          activeService.useCases.image?.alt ||
                          activeService.title
                        }
                      />
                    )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <h2 className="font-michroma text-brand-orange-500 mb-4 text-2xl">
                  Services
                </h2>
                <p className="text-gray-400">
                  Select a service from the left panel to learn more about our
                  offerings.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
