import { redirect } from "next/navigation";
import { getServices } from "@/lib/sanity/service";

const ServicesPage = async () => {
  const services = await getServices();

  // Redirect to the first service if available (like Resources)
  if (services.length > 0) {
    const firstService = services[0];
    redirect(`/services/${firstService.slug.current}`);
  }

  // If no services exist, show a message or fallback content
  return (
    <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
      <div className="text-center">
        <h2 className="font-michroma mb-4 text-xl text-white">
          No Services Available
        </h2>
        <p className="text-gray-400">Check back later for new services.</p>
      </div>
    </div>
  );
};

export default ServicesPage;
