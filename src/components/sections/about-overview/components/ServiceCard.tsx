import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { hasPrefetched, markPrefetched } from "@/lib/prefetchRegistry";

interface ServiceCardProps {
  children: React.ReactNode;
  serviceSlug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ children, serviceSlug }) => {
  const router = useRouter();

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
      onMouseEnter={handlePrefetch}
      className="flex items-center justify-center border-x border-y border-x-white/10 border-y-white/60 bg-white/10 p-2 text-center text-[10px] text-orange-500 transition-colors hover:bg-white/20 xl:p-4"
    >
      {children}
    </Link>
  );
};

export default ServiceCard;
