import React from "react";
import PagePanel from "@/components/ui/PagePanel";
import { getServices, getServicesPageSettings } from "@/lib/sanity/service";
import LazyImage from "@/components/ui/LazyImage";
import ServiceNavigation from "@/components/services/ServiceNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const [allServices, servicesPageSettings] = await Promise.all([
    getServices(),
    getServicesPageSettings(),
  ]);

  return (
    <PagePanel
      direction={{
        sm: "top", // Small screens slide from top (header navigation)
        md: "top", // Medium screens slide from top (header navigation)
        lg: "top", // Large screens slide from top (header navigation)
        xl: "left", // Extra large screens slide from left (header navigation)
        xxl: "left", // XXL screens slide from left (header navigation)
      }}
    >
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
            <LazyImage
              src={
                servicesPageSettings?.leftPanelImage || "/img/left-image.jpg"
              }
              alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
              fill
              className={`object-cover ${
                servicesPageSettings?.applyGrayscale !== false
                  ? "grayscale"
                  : ""
              }`}
              priority={true}
              mimeType={servicesPageSettings?.leftPanelImage?.asset?.mimeType}
              lqip={servicesPageSettings?.leftPanelImage?.asset?.metadata?.lqip}
            />
          </div>
          <ServiceNavigation services={allServices} />
        </div>

        {/* Left Panel - Service List - Desktop */}
        <div className="relative hidden xl:flex xl:flex-1 xl:flex-col xl:justify-center xl:p-1">
          <div className="absolute top-0 left-0 size-full">
            <LazyImage
              src={
                servicesPageSettings?.leftPanelImage || "/img/left-image.jpg"
              }
              alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
              fill
              className={`object-cover ${
                servicesPageSettings?.applyGrayscale !== false
                  ? "grayscale"
                  : ""
              }`}
              priority={true}
              mimeType={servicesPageSettings?.leftPanelImage?.asset?.mimeType}
              lqip={servicesPageSettings?.leftPanelImage?.asset?.metadata?.lqip}
            />
          </div>
          <div className="relative z-10 h-[calc(100vh-230px)] overflow-y-auto pr-1">
            <ServiceNavigation services={allServices} />
          </div>
        </div>

        {/* Right Panel - Service Content */}
        {children}
      </div>
    </PagePanel>
  );
};

export default Layout;
