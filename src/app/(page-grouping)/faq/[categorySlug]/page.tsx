import { getFAQCategories, type FAQCategory } from "@/lib/sanity";

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
