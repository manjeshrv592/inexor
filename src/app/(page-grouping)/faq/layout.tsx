import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import { Metadata } from "next";
import {
  getFAQCategories,
  getFAQItems,
  getFAQPage,
} from "@/lib/sanity";
import { getFAQPageSettings } from "@/lib/sanity/faq";
import FAQClientLayout from "./FAQClientLayout";

// Server-side metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const faqPage = await getFAQPage();

  return {
    title: faqPage?.pageTitle || "FAQ",
    description: faqPage?.pageDescription || "Frequently Asked Questions",
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface FAQLayoutProps {
  children: React.ReactNode;
}

export default async function FAQLayout({ children }: FAQLayoutProps) {
  // Fetch ALL FAQ data server-side at build time / revalidation
  const [categories, allFaqItems, faqPageData, faqPageSettings] = await Promise.all([
    getFAQCategories(),
    getFAQItems(), // Fetch ALL FAQ items, not just one category
    getFAQPage(),
    getFAQPageSettings(),
  ]);

  return (
    <>
      <PagePanelBg />
      <PagePanel>
        <FAQClientLayout
          categories={categories}
          allFaqItems={allFaqItems}
          faqPageData={faqPageData}
          faqPageSettings={faqPageSettings}
        >
          {children}
        </FAQClientLayout>
      </PagePanel>
    </>
  );
}
