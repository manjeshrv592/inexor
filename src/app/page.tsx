import Footer from "@/components/layout/Footer";
import AboutOverview from "@/components/sections/about-overview/AboutOverview";
import Clients from "@/components/sections/Clients";
import Hero from "@/components/sections/Hero";
import KeyValuePillars from "@/components/sections/KeyValuePillars";
import Maps from "@/components/sections/Maps";
import OurServices from "@/components/sections/OurServices";
import Testimonials from "@/components/sections/Testimonials";
import WhoWeServe from "@/components/sections/WhoWeServe";
import Why from "@/components/sections/Why";
import {
  getWhoWeServeItems,
  getHero,
  getWhy,
  getWhyItems,
  getAboutSection,
  getAboutItems,
  getTestimonialsSection,
  getServicesSection,
  getServiceItems,
  getKeyValuePillarsSection,
  getKeyValuePillarItems,
  getFooter,
  getHomeSeo,
} from "@/lib/sanity";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homeSeoData = await getHomeSeo();
  
  return {
    title: homeSeoData?.seo?.metaTitle || "Inexor - Your Business Partner",
    description: homeSeoData?.seo?.metaDescription || "Professional business services and solutions",
    keywords: homeSeoData?.seo?.keywords,
    openGraph: homeSeoData?.seo?.ogImage?.asset?.url ? {
      images: [homeSeoData.seo.ogImage.asset.url],
    } : undefined,
  };
}

const HomePage = async () => {
  const [
    heroData,
    keyValuePillarsSection,
    keyValuePillarItems,
    aboutData,
    aboutItems,
    whoWeServeItems,
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
    getWhy(),
    getWhyItems(),
    getServicesSection(),
    getServiceItems(),
    getTestimonialsSection(),
    getFooter(),
  ]);

  return (
    <main>
      <Hero heroData={heroData} />
      <KeyValuePillars
        sectionData={keyValuePillarsSection}
        items={keyValuePillarItems}
      />
      <AboutOverview aboutData={aboutData} aboutItems={aboutItems} />
      <WhoWeServe items={whoWeServeItems} />
      <Why whyData={whyData} whyItems={whyItems} />
      <OurServices
        servicesSection={servicesSection}
        serviceItems={serviceItems}
      />
      <Maps />
      <Clients />
      <Testimonials testimonialsData={testimonialsData} />
      <Footer footerData={footerData} />
    </main>
  );
};

export default HomePage;
