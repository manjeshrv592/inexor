import { Metadata } from "next";

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
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
    siteName: "Inexor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services",
    description: "Discover our comprehensive range of services",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <p className="text-lg text-gray-600">
        Explore our comprehensive range of services designed to meet your business needs.
      </p>
    </div>
  );
}