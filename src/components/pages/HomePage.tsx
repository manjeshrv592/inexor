import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components for better code splitting
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="h-32 bg-gray-800 animate-pulse" />
});
const AboutOverview = dynamic(() => import("@/components/sections/about-overview/AboutOverview"), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});
const Clients = dynamic(() => import("@/components/sections/Clients"), {
  loading: () => <div className="h-64 bg-gray-800 animate-pulse" />
});
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  loading: () => <div className="h-screen bg-gray-800 animate-pulse" />
});
const KeyValuePillars = dynamic(() => import("@/components/sections/KeyValuePillars"), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});
const Maps = dynamic(() => import("@/components/sections/Maps"), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});
const OurServices = dynamic(() => import("@/components/sections/OurServices"), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="h-64 bg-gray-800 animate-pulse" />
});
const WhoWeServe = dynamic(() => import("@/components/sections/WhoWeServe"), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});
const Why = dynamic(() => import("@/components/sections/Why"), {
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />
});
import {
  getWhoWeServeItems,
  getWhoWeServeSection,
  getHero,
  getWhy,
  getWhyItems,
  getAboutSection,
  getAboutItems,
  getTestimonialsSection,
  getServicesSection,
  getServicesForHomepage,
  getKeyValuePillarsSection,
  getKeyValuePillarItems,
  getFooter,
} from "@/lib/sanity";

// Revalidate every 5 minutes for better performance
export const revalidate = 300;

const HomePage = async () => {
  const [
    heroData,
    keyValuePillarsSection,
    keyValuePillarItems,
    aboutData,
    aboutItems,
    whoWeServeItems,
    whoWeServeSection,
    whyData,
    whyItems,
    servicesSection,
    serviceItems,
    testimonialsData,
    footerData,
  ] = await Promise.all([
    getHero(),
    getKeyValuePillarsSection(),
    getKeyValuePillarItems(),
    getAboutSection(),
    getAboutItems(),
    getWhoWeServeItems(),
    getWhoWeServeSection(),
    getWhy(),
    getWhyItems(),
    getServicesSection(),
    getServicesForHomepage(),
    getTestimonialsSection(),
    getFooter(),
  ]);

  return (
    <>
      <Hero heroData={heroData} />
      <KeyValuePillars
        sectionData={keyValuePillarsSection}
        items={keyValuePillarItems}
      />
      <AboutOverview aboutData={aboutData} aboutItems={aboutItems} />
      <WhoWeServe
        items={whoWeServeItems}
        sectionData={whoWeServeSection}
      />
      <OurServices
        servicesSection={servicesSection}
        serviceItems={[...serviceItems].reverse()}
      />
      <Maps />
      <Why whyData={whyData} whyItems={whyItems} />
      <Clients />
      <Testimonials testimonialsData={testimonialsData} />
      <Footer footerData={footerData} />
    </>
  );
};

export default HomePage;
