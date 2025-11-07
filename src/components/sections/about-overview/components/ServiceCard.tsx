"use client";
import React from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

interface ServiceCardProps {
  children: React.ReactNode;
  serviceSlug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ children, serviceSlug }) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  return (
    <Link
      href={`/services/${serviceSlug}`}
      className="flex items-center justify-center border-x border-y border-x-white/10 border-y-white/60 bg-white/10 p-2 text-center text-[10px] text-orange-500 transition-colors hover:bg-white/20 xl:p-4"
      onMouseEnter={() => {
        try {
          router.prefetch?.(`/services/${serviceSlug}`);
        } catch {}
      }}
      onClick={(e) => {
        e.preventDefault();
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("lastPath", pathname);
            sessionStorage.setItem("navigationSource", "header");
          }
        } catch {}
        requestAnimationFrame(() => {
          router.push(`/services/${serviceSlug}`);
        });
      }}
    >
      {children}
    </Link>
  );
};

export default ServiceCard;
