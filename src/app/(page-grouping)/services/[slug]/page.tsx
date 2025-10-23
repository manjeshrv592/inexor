import {
  getServices,
  getServiceBySlug,
  getServicesPageSettings,
  type Service,
} from "@/lib/sanity/service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils/textUtils";
import ServiceContent from "@/components/services/ServiceContent";
import { urlForFeaturedImage } from "../../../../../sanity/lib/image";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
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
          {allServices.map((service, index) => (
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
            {allServices.map((service, index) => (
              <Link
                key={service._id}
                href={`/services/${service.slug.current}`}
              >
                <Button
                  className="font-michroma text-[10px] tracking-[1px] xl:w-full"
                  variant={currentIndex === index ? "default" : "outline"}
                >
                  {service.code}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Service Content */}
      <ServiceContent service={service} />
    </div>
  );
};

export default ServicePage;
