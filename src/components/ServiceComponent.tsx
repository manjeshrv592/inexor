import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceComponentProps {
  code: string;
  heading1: string;
  heading2: string;
  description: string;
  backgroundImage: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  serviceCode: string;
}

const ServiceComponent: React.FC<ServiceComponentProps> = ({
  code,
  heading1,
  heading2,
  description,
  backgroundImage,
  serviceCode,
}) => {
  const backgroundImageUrl = backgroundImage?.asset?.url;

  return (
    <div className="absolute size-full">
      <div
        className="absolute z-10 size-full bg-cover bg-center grayscale filter"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${backgroundImageUrl}')`,
        }}
      ></div>
      <div className="relative z-20 size-full flex-col items-center justify-center p-4 xl:flex xl:px-8 xl:py-16">
        <div className="absolute top-0 left-0 hidden h-full w-20 bg-gradient-to-r from-neutral-700/70 to-neutral-700/0 xl:block">
          <span className="text-brand-orange-500 font-michroma absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xl">
            {code}
          </span>
        </div>
        <h4 className="font-michroma mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-center text-xs text-transparent uppercase xl:text-sm">
          {heading1}
        </h4>
        <h4 className="font-michroma mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-center text-xs text-transparent uppercase xl:text-sm">
          {heading2}
        </h4>

        <p className="mx-auto flex max-w-[600px] flex-1 items-center bg-neutral-700/30 p-6 text-center text-xs backdrop-blur-sm xl:text-sm">
          &quot;{description}&quot;
        </p>
        <div className="mt-4 text-center">
          <Link href={`/services?service=${serviceCode}`}>
            <Button
              className="font-michroma text-[10px] tracking-[1px] xl:text-xs"
              size={"sm"}
              variant="outline"
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
