import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import { Metadata } from "next";
import {
  getFAQCategories,
  getFAQItems,
  getFAQPage,
  type FAQCategory,
  type FAQItem,
  type FAQPage as FAQPageType,
} from "@/lib/sanity";
import { getFAQPageSettings, type FAQPageSettings } from "@/lib/sanity/faq";
import FAQClientLayout from "./FAQClientLayout";

// Server-side metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const faqPage = await getFAQPage();

  if (!faqPage?.seo) {
    return {
      title: "FAQ",
      description: "Frequently Asked Questions",
    };
  }

  const { seo } = faqPage;

  return {
    title: seo.metaTitle || "FAQ",
    description: seo.metaDescription || "Frequently Asked Questions",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
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
