import React from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { hasPrefetched, markPrefetched } from "@/lib/prefetchRegistry";

interface ServiceCardProps {
  children: React.ReactNode;
  serviceSlug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ children, serviceSlug }) => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const href = `/services/${serviceSlug}`;
  const handlePrefetch = () => {
    if (!hasPrefetched(href)) {
      try {
        router.prefetch?.(href);
        markPrefetched(href);
      } catch {}
    }
  };

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
          // Align animation behavior with header links
          sessionStorage.setItem("lastPath", pathname);
          sessionStorage.setItem("navigationSource", "header");
          // Persist which service was opened so homepage can restore OurServices state
          sessionStorage.setItem("homepageActiveServiceSlug", serviceSlug);
          requestAnimationFrame(() => {
            router.push(href);
          });
        }
      }}
      onMouseEnter={handlePrefetch}
      className="flex items-center justify-center border-x border-y border-x-white/10 border-y-white/60 bg-white/10 p-2 text-center text-[10px] text-orange-500 transition-colors hover:bg-white/20 xl:p-4"
    >
      {children}
    </Link>
  );
};

export default ServiceCard;
