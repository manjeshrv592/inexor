import { getHomeSeo } from "@/lib/sanity";
import React from "react";
import { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import AboutOverview from "@/components/sections/about-overview/AboutOverview";
import Clients from "@/components/sections/Clients";
import Hero from "@/components/sections/Hero";
import { getStaticHomepageData } from "@/lib/static-generation";
import KeyValuePillars from "@/components/sections/KeyValuePillars";
import Maps from "@/components/sections/Maps";
import OurServices from "@/components/sections/OurServices";
import Testimonials from "@/components/sections/Testimonials";
import WhoWeServe from "@/components/sections/WhoWeServe";
import Why from "@/components/sections/Why";
import HomeScroller from "@/components/HomeScroller";
import MapPrewarm from "@/lib/preloader/MapPrewarm";

export async function generateMetadata(): Promise<Metadata> {
  const homeSeoData = await getHomeSeo();

  if (!homeSeoData?.seo) {
    return {
      title: "Inexor - Your Business Partner",
      description: "Professional business services and solutions",
    };
  }

  const seo = homeSeoData.seo;

  // Build robots directive based on noIndex and noFollow flags
  const robots = {
    index: !seo.noIndex,
    follow: !seo.noFollow,
  };

  return {
    title: seo.metaTitle || "Inexor - Your Business Partner",
    description:
      seo.metaDescription || "Professional business services and solutions",
    keywords: seo.metaKeywords,
    robots,
    openGraph: {
      title: seo.metaTitle || "Inexor - Your Business Partner",
      description:
        seo.metaDescription || "Professional business services and solutions",
      url: "https://inexor.com",
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Inexor - Your Business Partner",
      description:
        seo.metaDescription || "Professional business services and solutions",
    },
  };
}

const HomePage = async () => {
  const {
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
    mapsSection,
    serviceLocations,
  } = await getStaticHomepageData();

  return (
    <HomeScroller>
      {/* Prewarm map chunk and low-res data early for faster first interaction */}
      <MapPrewarm />
      <main>
        <Hero heroData={heroData} />
        <KeyValuePillars
          sectionData={keyValuePillarsSection}
          items={keyValuePillarItems}
        />
        <AboutOverview aboutData={aboutData} aboutItems={aboutItems} />
        <WhoWeServe items={whoWeServeItems} sectionData={whoWeServeSection} />

        <OurServices
          servicesSection={servicesSection}
          serviceItems={[...serviceItems].reverse()}
        />
        <Maps mapsSection={mapsSection} serviceLocations={serviceLocations} />
        <Why whyData={whyData} whyItems={whyItems} />
        <Clients />
        <Testimonials testimonialsData={testimonialsData} />
        <Footer footerData={footerData} />
      </main>
    </HomeScroller>
  );
};

export default HomePage;
