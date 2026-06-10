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

  // Always allow indexing — noIndex is ignored intentionally
  const robots = {
    index: true,
    follow: true,
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

const websiteJsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Inexor",
  url: "https://inexor.io/",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://inexor.io/services/ior{search_term_string}Your Trusted Global Partner for Importer Of Record (IOR), EOR & DDP Services",
    "query-input": "required name=search_term_string",
  },
};

const corporationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "Inexor",
  alternateName: "Inexor.io - IOR, EOR, DDP and VAT Service Provider",
  url: "https://inexor.io/",
  logo: "https://inexor.io/logo.svg",
  sameAs: "https://www.linkedin.com/company/inexor-io/",
};

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
      {/* JSON-LD structured data (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationJsonLd) }}
      />
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
