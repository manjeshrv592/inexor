import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlForImageWithParams } from "../../sanity/lib/image";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

interface ServiceComponentProps {
  code: string;
  heading1: string;
  description: string;
  backgroundImage: {
    asset: {
      url: string;
      mimeType: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip?: string;
      };
    };
    alt?: string;
    isGrayscale?: boolean;
  };
  slug: string;
  title?: string;
}

const ServiceComponent: React.FC<ServiceComponentProps> = ({
  code,
  heading1,
  description,
  backgroundImage,
  slug,
  title,
}) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  return (
    <div className="absolute size-full">
      {/* Background Image with native img */}
      <div
        className={`absolute z-10 size-full filter ${
          backgroundImage?.isGrayscale !== false ? "grayscale" : ""
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            backgroundImage?.asset?.url
              ? urlForImageWithParams(backgroundImage, {
                  width: 1200,
                  height: 500,
                  quality: 85,
                  format: "webp",
                  fit: "crop",
                }).url()
              : "/img/left-image.jpg"
          }
          alt={backgroundImage?.alt || `${title} service background`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-20 flex size-full flex-col items-center justify-end p-4 xl:px-8">
        <div className="absolute top-0 left-0 hidden h-full w-20 bg-gradient-to-r from-neutral-700/70 to-neutral-700/0 xl:block">
          <span className="text-brand-orange-500 font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xl">
            {code}
          </span>
        </div>
        <div className="text-center lg:hidden">
          <motion.h3
            className="font-michroma mb-4 text-sm lg:text-lg"
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {title}
          </motion.h3>
        </div>
        <h4 className="mb-4 max-w-[510px] text-center text-sm uppercase">
          {heading1}
        </h4>

        <p className="mx-auto flex max-w-[360px] items-center bg-neutral-700/30 p-6 text-center text-xs lg:text-sm xl:max-w-[500px]">
          &quot;{description}&quot;
        </p>
        <div className="mt-4 text-center">
          <Link
            href={`/services/${slug}`}
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                // Align animation behavior with header links
                sessionStorage.setItem("lastPath", pathname);
                sessionStorage.setItem("navigationSource", "header");
                // Persist the active service so homepage can restore OurServices state
                sessionStorage.setItem("homepageActiveServiceSlug", slug);
                requestAnimationFrame(() => {
                  router.push(`/services/${slug}`);
                });
              }
            }}
          >
            <Button
              className="font-michroma text-[10px] tracking-[1px] xl:text-xs"
              size={"sm"}
            >
              <span className="flex items-center gap-1 xl:py-2">
                <span>Read More</span>
                <ArrowRight size={16} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
