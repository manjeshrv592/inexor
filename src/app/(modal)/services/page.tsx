"use client";

import { Button } from "@/components/ui/button";
import { RichTextRenderer } from "@/components/blog";
import UseCasesSection from "@/components/ui/UseCasesSection";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getServices,
  getServiceByCode,
  type Service,
} from "@/lib/sanity/service";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const rightPanelRef = React.useRef<HTMLDivElement>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const servicesData = await getServices();
        setServices(servicesData);

        // Set first service as active if services exist
        if (servicesData.length > 0) {
          const firstService = await getServiceByCode(servicesData[0].code);
          setActiveService(firstService);
          setActiveIndex(0);
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
      className="bg-[#2f2f2f] xl:grid xl:h-full xl:grid-cols-[150px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel */}
      <div className="relative h-20 xl:h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5">
          <div className="flex flex-col gap-5">
            {services.map((service, index) => (
              <Button
                key={service._id}
                className="font-michroma text-[10px] tracking-[1px]"
                size="sm"
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
      </div>

      {/* Right Panel - Service Content */}
      <div ref={rightPanelRef} className="h-full overflow-y-auto px-2 pb-4">
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
                  <div className="absolute inset-0 z-10 bg-black/80"></div>
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
                <div className="relative z-10 flex size-full flex-col items-center justify-center gap-2 text-center">
                  <h5 className="font-michroma text-[10px]">
                    {activeService.subtitle.toUpperCase()}
                  </h5>
                  <h2 className="text-lg">{activeService.title}</h2>
                </div>
              </div>

              <div className="text-sm text-neutral-100">
                {/* Service Content */}
                {activeService.content && (
                  <RichTextRenderer content={activeService.content} />
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
                        activeService.useCases.image?.alt || activeService.title
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
              className="flex h-full items-center justify-center"
            >
              <p className="text-center text-gray-400">
                {services.length === 0
                  ? "No services available."
                  : "Select a service to read."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesPage;
