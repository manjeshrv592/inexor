"use client";

import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import UseCasesSection from "@/components/ui/UseCasesSection";
import React from "react";
import { type Service } from "@/lib/sanity/service";
import { urlForFeaturedImage } from "../../../sanity/lib/image";
import Link from "next/link";

interface ServiceContentProps {
  service: Service;
}

const ServiceContent = ({ service }: ServiceContentProps) => {
  return (
    <div className="h-[calc(100dvh-158px)] overflow-y-auto bg-neutral-900 xl:h-full">
      <div className="pb-4">
        <div>
          {/* Featured Image */}
          <div className="relative mb-6 h-[300px]">
            <div className="absolute top-0 left-0 size-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  service.featuredImage
                    ? urlForFeaturedImage(service.featuredImage, 800, 300).url()
                    : "/img/left-image.jpg"
                }
                alt={service.featuredImage?.alt || service.title}
                className={`h-full w-full object-cover ${service.featuredImage?.isGrayscale !== false ? "grayscale" : ""}`}
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
            <div className="py-4">
              <h3 className="text-brand-orange-500 mb-4 text-lg font-semibold">
                IOR
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  className="hover:text-brand-orange-500 duration-300"
                  href="/services/ior-country/austria"
                >
                  Austria
                </Link>
                <span>/</span>
                <Link
                  className="hover:text-brand-orange-500 duration-300"
                  href="/services/ior-country/germany"
                >
                  Germany
                </Link>
                <span>/</span>
                <Link
                  className="hover:text-brand-orange-500 duration-300"
                  href="/services/ior-country/switzerland"
                >
                  Switzerland
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceContent;
