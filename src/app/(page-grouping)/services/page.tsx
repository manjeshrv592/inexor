"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getServices } from "@/lib/sanity/service";

const ServicesRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToFirstService = async () => {
      try {
        const services = await getServices();

        if (services && services.length > 0) {
          // Redirect to the first service
          const firstService = services[0];
          router.replace(`/services/${firstService.slug.current}`);
        } else {
          // Fallback if no services found
          console.error("No services found");
          router.replace("/");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        router.replace("/");
      }
    };

    redirectToFirstService();
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
      <div className="text-white">Loading services...</div>
    </div>
  );
};

export default ServicesRedirectPage;
