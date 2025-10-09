"use client";

import Link from "next/link";
import { FAQItem } from "@/components/faq";

interface FAQItemWithLinkProps {
  categorySlug: string;
  questionSlug: string;
  questionId: string;
  question: string;
  answer: string;
  isMobile?: boolean;
  activeQuestionId?: string | null;
}

const FAQItemWithLink = ({
  categorySlug,
  questionSlug,
  questionId,
  question,
  answer,
  isMobile = false,
  activeQuestionId,
}: FAQItemWithLinkProps) => {
  return (
    <Link href={`/faq/${categorySlug}/${questionSlug}`}>
      <FAQItem
        questionId={questionId}
        question={question}
        answer={answer}
        isMobile={isMobile}
        activeQuestionId={activeQuestionId}
        onQuestionClick={() => {}}
      />
    </Link>
  );
};

export default FAQItemWithLink;
