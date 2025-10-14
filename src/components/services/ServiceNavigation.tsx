"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils/textUtils";
import type { Service } from "@/lib/sanity/service";

interface ServiceNavigationProps {
  services: Service[];
}

export default function ServiceNavigation({
  services,
}: ServiceNavigationProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  // Find current index for active state
  const currentIndex = services.findIndex(
    (service) => service.slug.current === currentSlug,
  );

  return (
    <>
      {/* Mobile list */}
      <div
        className="flex flex-nowrap gap-4 overflow-x-auto xl:hidden [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {services.map((service, index) => (
          <Link key={service._id} href={`/services/${service.slug.current}`}>
            <Button
              className="font-michroma w-20 text-[10px] tracking-[1px] xl:w-full"
              size={"sm"}
              variant={currentIndex === index ? "default" : "outline"}
            >
              {truncateText(service.code, 3)}
            </Button>
          </Link>
        ))}
      </div>

      {/* Desktop list */}
      <div className="hidden h-full flex-col justify-center gap-4 xl:flex">
        {services.map((service, index) => (
          <Link key={service._id} href={`/services/${service.slug.current}`}>
            <Button
              className="font-michroma text-[10px] tracking-[1px] xl:w-full"
              variant={currentIndex === index ? "default" : "outline"}
            >
              {service.code}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
}