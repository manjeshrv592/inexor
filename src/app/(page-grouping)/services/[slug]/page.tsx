import {
  getServices,
  getServiceBySlug,
  getServicesPageSettings,
  type Service,
} from "@/lib/sanity/service";
import { getServicesPageSeo } from "@/lib/sanity";
import { notFound } from "next/navigation";

import ServiceContent from "@/components/services/ServiceContent";
import ServiceNavList from "@/components/services/ServiceNavList";
import { urlForFeaturedImage } from "../../../../../sanity/lib/image";
import { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata with parent inheritance
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  // Get service data for specific metadata if available
  const service = await getServiceBySlug(slug);

  // Get parent services page SEO data for inheritance
  const parentSeoData = await getServicesPageSeo();

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    };
  }

  // Use parent SEO data as fallback for service pages
  const parentSeo = parentSeoData?.seo;

  return {
    title: service.title || parentSeo?.metaTitle || "Services",
    description:
      service.excerpt ||
      parentSeo?.metaDescription ||
      "Discover our comprehensive range of services",
    keywords: parentSeo?.metaKeywords,
    robots: {
      index: !parentSeo?.noIndex,
      follow: !parentSeo?.noFollow,
    },
    openGraph: {
      title: service.title || parentSeo?.metaTitle || "Services",
      description:
        service.excerpt ||
        parentSeo?.metaDescription ||
        "Discover our comprehensive range of services",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${slug}`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title || parentSeo?.metaTitle || "Services",
      description:
        service.excerpt ||
        parentSeo?.metaDescription ||
        "Discover our comprehensive range of services",
    },
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  try {
    const services = await getServices();

    return services.map((service: Service) => ({
      slug: service.slug.current,
    }));
  } catch (error) {
    console.error("Error generating service static params:", error);
    return [];
  }
}

const ServicePage = async ({ params }: ServicePageProps) => {
  const { slug } = await params;
  const [service, allServices, servicesPageSettings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getServicesPageSettings(),
  ]);

  if (!service) {
    notFound();
  }

  // Find current index for active state
  const currentIndex = allServices.findIndex((s) => s.slug.current === slug);

  return (
    <div
      className="h-full bg-[#222] xl:grid xl:h-full xl:grid-cols-[150px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel - Service List - Mobile */}
      <div className="relative px-5 py-7 xl:hidden">
        <div className="absolute top-0 left-0 size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              servicesPageSettings?.leftPanelImage
                ? urlForFeaturedImage(
                    servicesPageSettings.leftPanelImage,
                    150,
                    600,
                  ).url()
                : "/img/left-image.jpg"
            }
            alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
            className={`h-full w-full object-cover ${
              servicesPageSettings?.applyGrayscale !== false ? "grayscale" : ""
            }`}
          />
        </div>
        {/* Mobile list */}
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ServiceNavList
            services={allServices}
            currentIndex={currentIndex}
            mode="mobile"
          />
        </div>
      </div>

      {/* Left Panel - Service List - Desktop */}
      <div className="relative hidden xl:flex xl:flex-1 xl:flex-col xl:justify-center xl:p-1">
        <div className="absolute top-0 left-0 size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              servicesPageSettings?.leftPanelImage
                ? urlForFeaturedImage(
                    servicesPageSettings.leftPanelImage,
                    150,
                    800,
                  ).url()
                : "/img/left-image.jpg"
            }
            alt={servicesPageSettings?.leftPanelImage?.alt || "services bg"}
            className={`h-full w-full object-cover ${
              servicesPageSettings?.applyGrayscale !== false ? "grayscale" : ""
            }`}
          />
        </div>
        <div className="relative z-10 h-[calc(100vh-230px)] overflow-y-auto pr-1">
          <div className="flex h-full flex-col justify-center gap-4">
            <ServiceNavList
              services={allServices}
              currentIndex={currentIndex}
              mode="desktop"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Service Content */}
      <ServiceContent service={service} />
    </div>
  );
};

export default ServicePage;
