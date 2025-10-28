import { getFAQCategories, getFaqPageSeo, type FAQCategory } from "@/lib/sanity";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

// Generate metadata with parent inheritance
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  
  // Get category data for specific metadata if available
  const categories = await getFAQCategories();
  const category = categories.find((cat: FAQCategory) => cat.slug.current === categorySlug);
  
  // Get parent FAQ page SEO data for inheritance
  const parentSeoData = await getFaqPageSeo();
  
  if (!category) {
    return {
      title: "FAQ Category Not Found",
      description: "The requested FAQ category could not be found",
    };
  }

  // Use parent SEO data as fallback for category pages
  const parentSeo = parentSeoData?.seo;
  
  return {
    title: `${category.name} - FAQ` || parentSeo?.metaTitle || "FAQ",
    description: parentSeo?.metaDescription || "Frequently asked questions and answers",
    keywords: parentSeo?.metaKeywords,
    robots: {
      index: !parentSeo?.noIndex,
      follow: !parentSeo?.noFollow,
    },
    openGraph: {
      title: `${category.name} - FAQ` || parentSeo?.metaTitle || "FAQ",
      description: parentSeo?.metaDescription || "Frequently asked questions and answers",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq/${categorySlug}`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - FAQ` || parentSeo?.metaTitle || "FAQ",
      description: parentSeo?.metaDescription || "Frequently asked questions and answers",
    },
  };
}

// Generate static params for all FAQ categories
export async function generateStaticParams() {
  try {
    const categories = await getFAQCategories();

    return categories.map((category: FAQCategory) => ({
      categorySlug: category.slug.current,
    }));
  } catch (error) {
    console.error("Error generating FAQ category static params:", error);
    return [];
  }
}

const CategoryPage = () => {
  // Layout handles all the FAQ functionality with URL routing
  return null;
};

export default CategoryPage;
