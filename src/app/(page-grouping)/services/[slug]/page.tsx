import {
  getServices,
  getServiceBySlug,
  type Service,
} from "@/lib/sanity/service";
import { notFound } from "next/navigation";
import ServiceContent from "@/components/services/ServiceContent";

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
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceContent service={service} />;
};

export default ServicePage;
