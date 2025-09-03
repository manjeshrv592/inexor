import Clients from "@/components/sections/Clients";
import Hero from "@/components/sections/Hero";
import Maps from "@/components/sections/Maps";
import Testimonials from "@/components/sections/Testimonials";
import WhoWeServe from "@/components/sections/WhoWeServe";
import Why from "@/components/sections/Why";
import {
  getWhoWeServeItems,
  getHero,
  getWhy,
  getWhyItems,
  getTestimonialsSection,
} from "@/lib/sanity";
import React from "react";

// Revalidate every 60 seconds (or set to your preferred interval)
export const revalidate = 60;

const HomePage = async () => {
  const [heroData, whoWeServeItems, whyData, whyItems, testimonialsData] =
    await Promise.all([
      getHero(),
      getWhoWeServeItems(),
      getWhy(),
      getWhyItems(),
      getTestimonialsSection(),
    ]);

  return (
    <main>
      <Hero heroData={heroData} />
      <WhoWeServe items={whoWeServeItems} />
      <Why whyData={whyData} whyItems={whyItems} />
      <Maps />
      <Clients />
      <Testimonials testimonialsData={testimonialsData} />
    </main>
  );
};

export default HomePage;
