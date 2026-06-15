"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { truncateText } from "@/lib/utils/textUtils";
import type { Service } from "@/lib/sanity/service";

interface ServiceNavListProps {
  services: Service[];
  currentIndex: number;
  mode: "mobile" | "desktop";
}

const ServiceNavList: React.FC<ServiceNavListProps> = ({
  services,
  currentIndex,
  mode,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (href: string) => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastPath", pathname);
        sessionStorage.setItem("navigationSource", "header");
      }
    } catch {}
    // Use a plain router push (no next-view-transitions) so navigating
    // between services swaps the content without re-running the panel
    // open/slide animation.
    router.push(href);
  };

  return (
    <>
      {services.map((service, index) => {
        const href = `/services/${service.slug.current}`;
        const content =
          mode === "mobile"
            ? truncateText(service.code, 3)
            : service.code;

        return (
          <Link
            key={service._id}
            href={href}
            onMouseEnter={() => {
              try {
                router.prefetch?.(href);
              } catch {}
            }}
            onClick={(e) => {
              e.preventDefault();
              handleClick(href);
            }}
          >
            <Button
              className={
                mode === "mobile"
                  ? "font-michroma w-20 text-[10px] tracking-[1px] xl:w-full"
                  : "font-michroma text-[10px] tracking-[1px] xl:w-full"
              }
              size={mode === "mobile" ? "sm" : undefined}
              variant={currentIndex === index ? "default" : "outline"}
            >
              {content}
            </Button>
          </Link>
        );
      })}
    </>
  );
};

export default ServiceNavList;