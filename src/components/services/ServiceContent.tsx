"use client";

import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import UseCasesSection from "@/components/ui/UseCasesSection";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { type Service } from "@/lib/sanity/service";

interface ServiceContentProps {
  service: Service;
}

const ServiceContent = ({ service }: ServiceContentProps) => {
  return (
    <div className="h-[calc(100dvh-158px)] overflow-y-auto bg-neutral-900 xl:h-full">
      <div className="pb-4">
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
              <Image
                src={service.featuredImage?.asset.url || "/img/left-image.jpg"}
                alt={service.featuredImage?.alt || service.title}
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="relative z-10 flex size-full items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2 bg-black/5 p-4 text-center backdrop-blur-[5px]">
                <h2 className="font-michroma text-lg">
                  {service.title.toUpperCase()}
                </h2>
                <h5 className="max-w-[300px]">{service.shortDescription}</h5>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-5 text-justify text-sm text-neutral-100">
            {/* Service Content */}
            {service.content && (
              <PortableTextRenderer content={service.content} />
            )}
            {/* Use Cases Section - placed at the end of the blog content */}
            {service.useCases?.steps && service.useCases.steps.length > 0 && (
              <UseCasesSection
                title={service.useCases.title || "Use cases"}
                steps={service.useCases.steps}
                imageUrl={
                  service.useCases.image?.asset?.url || "/img/left-image.jpg"
                }
                imageAlt={service.useCases.image?.alt || service.title}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceContent;
