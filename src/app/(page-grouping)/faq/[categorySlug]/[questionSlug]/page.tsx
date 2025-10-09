import { getFAQCategories, getFAQItemsByCategory } from "@/lib/sanity";

// Generate static params for all FAQ questions
export async function generateStaticParams() {
  try {
    const categories = await getFAQCategories();
    const params = [];

    // Generate params for each category and its questions
    for (const category of categories) {
      const items = await getFAQItemsByCategory(category.slug.current);

      for (const item of items) {
        params.push({
          categorySlug: category.slug.current,
          questionSlug: item.slug.current,
        });
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating FAQ question static params:", error);
    return [];
  }
}

const QuestionPage = () => {
  // Layout handles all the FAQ functionality with URL routing
  return null;
};

export default QuestionPage;
