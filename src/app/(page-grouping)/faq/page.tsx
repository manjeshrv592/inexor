import { redirect } from "next/navigation";
import { getFirstFAQSlugs } from "@/lib/sanity";

const FAQPage = async () => {
  // Layout handles metadata and all the FAQ functionality with URL routing.
  // Redirect bare /faq to the first category/question when available.
  const firstFAQSlugs = await getFirstFAQSlugs();
  const firstFAQCategorySlug = firstFAQSlugs?.firstCategory?.slug?.current;
  const firstFAQQuestionSlug = firstFAQSlugs?.firstQuestion?.slug?.current;

  if (firstFAQCategorySlug && firstFAQQuestionSlug) {
    redirect(`/faq/${firstFAQCategorySlug}/${firstFAQQuestionSlug}`);
  }

  return null;
};

export default FAQPage;
