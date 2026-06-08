import { getFAQCategories, getFAQItemsByCategory } from "@/lib/sanity";
import { notFound } from "next/navigation";
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

  if (!question) {
    return {
      title: "FAQ Question Not Found",
      description: "The requested FAQ question could not be found",
    };
  }

  // Use the question's own SEO fields, falling back to the question/answer text.
  const questionSeo = question.seo;

  const metaTitle = questionSeo?.metaTitle || `${question.question} - FAQ`;
  const metaDescription =
    questionSeo?.metaDescription ||
    question.answer ||
    "Frequently asked questions and answers";
  const metaKeywords = questionSeo?.metaKeywords;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/faq/${categorySlug}/${questionSlug}`,
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

const QuestionPage = async ({ params }: QuestionPageProps) => {
  const { categorySlug, questionSlug } = await params;

  // Return a proper 404 for questions that don't exist (no loading.tsx in this
  // tree, so notFound() yields a real 404 status — not a soft 404).
  const items = await getFAQItemsByCategory(categorySlug);
  const questionExists = items.some(
    (item) => item.slug.current === questionSlug,
  );
  if (!questionExists) {
    notFound();
  }

  // Layout handles all the FAQ functionality with URL routing
  return null;
};

export default QuestionPage;
