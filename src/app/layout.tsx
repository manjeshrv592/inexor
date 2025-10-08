import type { Metadata } from "next";
import { Michroma, Raleway } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import AuthProvider from "@/components/providers/AuthProvider";
import LogoutButton from "@/components/auth/LogoutButton";
import Footer from "@/components/layout/Footer";
import PrefetchProvider from "@/components/providers/PrefetchProvider";
import AboutOverview from "@/components/sections/about-overview/AboutOverview";
import Clients from "@/components/sections/Clients";
import Hero from "@/components/sections/Hero";
import KeyValuePillars from "@/components/sections/KeyValuePillars";
import Maps from "@/components/sections/Maps";
import OurServices from "@/components/sections/OurServices";
import Testimonials from "@/components/sections/Testimonials";
import WhoWeServe from "@/components/sections/WhoWeServe";
import Why from "@/components/sections/Why";
import { getStaticHomepageData } from "@/lib/static-generation";

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
  } = await getStaticHomepageData();

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${michroma.variable} ${raleway.variable} bg-[#050505] text-white antialiased`}
        >
          <AuthProvider>
            <PrefetchProvider>
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
                serviceItems={[...serviceItems].reverse()}
              />
              <Maps />
              <Why whyData={whyData} whyItems={whyItems} />
              <Clients />
              <Testimonials testimonialsData={testimonialsData} />
              <Footer footerData={footerData} />
            </main>
            {children}
            <LogoutButton />
            </PrefetchProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#171717', // neutral-900
                  color: '#f9fafb',
                  border: '1px solid #262626', // neutral-800
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#f9fafb',
                  },
                  style: {
                    border: '1px solid #262626', // neutral-800
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#f9fafb',
                  },
                  style: {
                    border: '1px solid #262626', // neutral-800
                  },
                },
              }}
            />
          </AuthProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
