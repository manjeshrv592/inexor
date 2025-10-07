"use client";

import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  getServices,
  getServicesPageSettings,
  type Service,
  type ServicesPageSettings,
} from "@/lib/sanity/service";
import { truncateText } from "@/lib/utils/textUtils";

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [servicesPageSettings, setServicesPageSettings] =
    useState<ServicesPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "";

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

        // Set active index based on current slug
        const currentIndex = servicesData.findIndex(
          (service) => service.slug.current === currentSlug,
        );
        if (currentIndex !== -1) {
          setActiveIndex(currentIndex);
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentSlug]);

  // Handle service click
  const handleServiceClick = (service: Service, index: number) => {
    setActiveIndex(index);
    router.push(`/services/${service.slug.current}`);
  };

  if (loading) {
    return (
      <>
        <PagePanelBg />
        <PagePanel>
          <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
            <div className="text-white">Loading...</div>
          </div>
        </PagePanel>
      </>
    );
  }

  return (
    <>
      <PagePanelBg />
      <PagePanel>
        <div
          className="h-full bg-[#2f2f2f] xl:grid xl:h-full xl:grid-cols-[150px_1fr]"
          style={{
            boxShadow:
              "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
          }}
        >
          {/* Left Panel - Service List - Mobile */}
          <div className="relative px-5 py-7 xl:hidden">
            <div className="absolute top-0 left-0 size-full">
              <Image
                src={
                  servicesPageSettings?.leftPanelImage?.asset?.url ||
                  "/img/left-image.jpg"
                }
                alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
                fill
                className={`object-cover ${
                  servicesPageSettings?.applyGrayscale !== false
                    ? "grayscale"
                    : ""
                }`}
              />
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
                  className="font-michroma w-20 text-[10px] tracking-[1px] xl:w-full"
                  size={"sm"}
                  variant={activeIndex === index ? "default" : "outline"}
                  onClick={() => handleServiceClick(service, index)}
                >
                  {truncateText(service.code, 3)}
                </Button>
              ))}
            </div>
          </div>

          {/* Left Panel - Service List - Desktop */}
          <div className="relative hidden xl:flex xl:flex-1 xl:flex-col xl:justify-center xl:p-1">
            <div className="absolute top-0 left-0 size-full">
              <Image
                src={
                  servicesPageSettings?.leftPanelImage?.asset?.url ||
                  "/img/left-image.jpg"
                }
                alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
                fill
                className={`object-cover ${
                  servicesPageSettings?.applyGrayscale !== false
                    ? "grayscale"
                    : ""
                }`}
              />
            </div>
            <div className="relative z-10 h-[calc(100vh-230px)] overflow-y-auto pr-1">
              <div className="flex h-full flex-col justify-center gap-4">
                {services.map((service, index) => (
                  <Button
                    key={service._id}
                    className="font-michroma text-[10px] tracking-[1px] xl:w-full"
                    variant={activeIndex === index ? "default" : "outline"}
                    onClick={() => handleServiceClick(service, index)}
                  >
                    {service.code}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Service Content */}
          {children}
        </div>
      </PagePanel>
    </>
  );
};

export default ServiceLayout;
