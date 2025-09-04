import Ior from "@/components/Ior";
import AboutOverview from "@/components/sections/about-overview/AboutOverview";
import Clients from "@/components/sections/Clients";
import Hero from "@/components/sections/Hero";
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
} from "@/lib/sanity";
import React from "react";

const HomePage = async () => {
  const [
    heroData,
    aboutData,
    aboutItems,
    whoWeServeItems,
    whyData,
    whyItems,
    testimonialsData,
  ] = await Promise.all([
    getHero(),
    getAboutSection(),
    getAboutItems(),
    getWhoWeServeItems(),
    getWhy(),
    getWhyItems(),
    getTestimonialsSection(),
  ]);

  return (
    <main>
      <Hero heroData={heroData} />
      <AboutOverview aboutData={aboutData} aboutItems={aboutItems} />
      <WhoWeServe items={whoWeServeItems} />
      <Why whyData={whyData} whyItems={whyItems} />
      {/* <OurServices /> */}
      <Maps />
      <Clients />

      <Testimonials testimonialsData={testimonialsData} />
    </main>
  );
};

export default HomePage;
