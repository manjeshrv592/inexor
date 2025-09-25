import type { Metadata } from "next";
import { Michroma, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import AuthProvider from "@/components/providers/AuthProvider";
import LogoutButton from "@/components/auth/LogoutButton";
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

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "INEXOR - Web Access",
  description: "Secure web access portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${michroma.variable} ${raleway.variable} bg-[#050505] text-white antialiased`}
      >
        <AuthProvider>
          <Header />
          <main>
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
              serviceItems={serviceItems}
            />
            <Maps />
            <Why whyData={whyData} whyItems={whyItems} />
            <Clients />
            <Testimonials testimonialsData={testimonialsData} />
            <Footer footerData={footerData} />
          </main>
          {children}
          <LogoutButton />
        </AuthProvider>
      </body>
    </html>
  );
}
