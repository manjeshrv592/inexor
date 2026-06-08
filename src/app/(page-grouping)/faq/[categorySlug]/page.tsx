import { getFAQCategories, type FAQCategory } from "@/lib/sanity";
import { notFound } from "next/navigation";
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

  if (!category) {
    return {
      title: "FAQ Category Not Found",
      description: "The requested FAQ category could not be found",
    };
  }

  const metaTitle = `${category.name} - FAQ`;
  const metaDescription = "Frequently asked questions and answers";

  return {
    title: metaTitle,
    description: metaDescription,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq/${categorySlug}`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
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

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  // Return a proper 404 for categories that don't exist.
  const categories = await getFAQCategories();
  const categoryExists = categories.some(
    (category: FAQCategory) => category.slug.current === categorySlug,
  );
  if (!categoryExists) {
    notFound();
  }

  // Layout handles all the FAQ functionality with URL routing
  return null;
};

export default CategoryPage;
