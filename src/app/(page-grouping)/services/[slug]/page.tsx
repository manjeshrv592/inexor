"use client";

import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import UseCasesSection from "@/components/ui/UseCasesSection";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getServiceBySlug,
  type Service,
} from "@/lib/sanity/service";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ServicePage = ({ params }: ServicePageProps) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const rightPanelRef = React.useRef<HTMLDivElement>(null);
  const resolvedParams = React.use(params);

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const serviceData = await getServiceBySlug(resolvedParams.slug);
        
        if (!serviceData) {
          notFound();
          return;
        }
        
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <div
      ref={rightPanelRef}
      className="h-[calc(100vh-238px)] overflow-y-auto bg-neutral-900 lg:h-full"
    >
      <div className="pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={service._id}
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
                    service.featuredImage?.asset.url ||
                    "/img/left-image.jpg"
                  }
                  alt={
                    service.featuredImage?.alt || service.title
                  }
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="relative z-10 flex size-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2 bg-black/5 p-4 text-center backdrop-blur-[5px]">
                  <h2 className="font-michroma text-lg">
                    {service.title.toUpperCase()}
                  </h2>
                  <h5 className="max-w-[300px]">
                    {service.shortDescription}
                  </h5>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-3xl px-5 text-justify text-sm text-neutral-100">
              {/* Service Content */}
              {service.content && (
                <PortableTextRenderer content={service.content} />
              )}
              {/* Use Cases Section - placed at the end of the blog content */}
              {service.useCases?.steps &&
                service.useCases.steps.length > 0 && (
                  <UseCasesSection
                    title={service.useCases.title || "Use cases"}
                    steps={service.useCases.steps}
                    imageUrl={
                      service.useCases.image?.asset?.url ||
                      "/img/left-image.jpg"
                    }
                    imageAlt={
                      service.useCases.image?.alt ||
                      service.title
                    }
                  />
                )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicePage;
