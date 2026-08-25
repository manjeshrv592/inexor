import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFirstServiceSlug } from "@/lib/sanity/service";
import { absoluteUrl } from "@/lib/seo";

// NOTE: this route redirects to the first service, so it is intentionally
// absent from sitemap.ts and carries no self-canonical — the destination
// page owns the canonical for this content.
export const metadata: Metadata = {
  title: "Services",
  description: "Discover our comprehensive range of services",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Services",
    description: "Discover our comprehensive range of services",
    url: absoluteUrl("/services"),
    siteName: "Inexor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services",
    description: "Discover our comprehensive range of services",
  },
};

export default async function ServicesPage() {
  const firstService = await getFirstServiceSlug();
  const firstServiceSlug = firstService?.slug?.current;

  if (firstServiceSlug) {
    redirect(`/services/${firstServiceSlug}`);
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <p className="text-lg text-gray-600">
        Explore our comprehensive range of services designed to meet your business needs.
      </p>
    </div>
  );
}
