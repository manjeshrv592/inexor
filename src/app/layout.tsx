import type { Metadata } from "next";
import { Michroma, Raleway } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import AuthProvider from "@/components/providers/AuthProvider";
import LogoutButton from "@/components/auth/LogoutButton";

import { HomeScrollProvider } from "@/contexts/HomeScrollContext";
import { getFirstBlogPostSlug } from "@/lib/sanity/blog";
import { getFirstServiceSlug } from "@/lib/sanity/service";
import { getFirstFAQSlugs } from "@/lib/sanity";
import { getNavigationData } from "@/lib/sanity/navigation";

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
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Batch all navigation-related fetches in parallel for efficiency
  const [firstBlogPost, firstService, firstFAQSlugs, navigationData] = await Promise.all([
    getFirstBlogPostSlug(),
    getFirstServiceSlug(),
    getFirstFAQSlugs(),
    getNavigationData(),
  ]);

  const firstBlogSlug = firstBlogPost?.slug?.current || null;
  const firstServiceSlug = firstService?.slug?.current || null;
  const firstFAQCategorySlug = firstFAQSlugs?.firstCategory?.slug?.current || null;
  const firstFAQQuestionSlug = firstFAQSlugs?.firstQuestion?.slug?.current || null;

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="preload"
            href="/world-countries-low.topojson"
            as="fetch"
            crossOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href="/world-countries.topojson"
            crossOrigin="anonymous"
          />
        </head>
        <body
          className={`${michroma.variable} ${raleway.variable} bg-[#050505] text-white antialiased`}
        >
          <AuthProvider>
            <HomeScrollProvider>
              <>
                <Header
                  firstBlogSlug={firstBlogSlug}
                  firstServiceSlug={firstServiceSlug}
                  firstFAQCategorySlug={firstFAQCategorySlug}
                  firstFAQQuestionSlug={firstFAQQuestionSlug}
                  navigationItems={navigationData.items}
                />

                {children}
                <LogoutButton />
              </>
            </HomeScrollProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#171717", // neutral-900
                  color: "#f9fafb",
                  border: "1px solid #262626", // neutral-800
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                },
                success: {
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#f9fafb",
                  },
                  style: {
                    border: "1px solid #262626", // neutral-800
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#f9fafb",
                  },
                  style: {
                    border: "1px solid #262626", // neutral-800
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
