import { getFAQCategories, getFAQItemsByCategory, getFaqPageSeo } from "@/lib/sanity";
import { Metadata } from "next";

interface QuestionPageProps {
  params: Promise<{
    categorySlug: string;
    questionSlug: string;
  }>;
}

// Generate metadata with parent inheritance
export async function generateMetadata({ params }: QuestionPageProps): Promise<Metadata> {
  const { categorySlug, questionSlug } = await params;
  
  // Get question data for specific metadata if available
  const items = await getFAQItemsByCategory(categorySlug);
  const question = items.find((item) => item.slug.current === questionSlug);
  
  // Get parent FAQ page SEO data for inheritance
  const parentSeoData = await getFaqPageSeo();
  
  if (!question) {
    return {
      title: "FAQ Question Not Found",
      description: "The requested FAQ question could not be found",
    };
  }

  // Use parent SEO data as fallback for question pages
  const parentSeo = parentSeoData?.seo;
  
  return {
    title: `${question.question} - FAQ` || parentSeo?.metaTitle || "FAQ",
    description: question.answer || parentSeo?.metaDescription || "Frequently asked questions and answers",
    keywords: parentSeo?.metaKeywords,
    robots: {
      index: !parentSeo?.noIndex,
      follow: !parentSeo?.noFollow,
    },
    openGraph: {
      title: `${question.question} - FAQ` || parentSeo?.metaTitle || "FAQ",
      description: question.answer || parentSeo?.metaDescription || "Frequently asked questions and answers",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq/${categorySlug}/${questionSlug}`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${question.question} - FAQ` || parentSeo?.metaTitle || "FAQ",
      description: question.answer || parentSeo?.metaDescription || "Frequently asked questions and answers",
    },
  };
}

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
