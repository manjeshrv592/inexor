"use client";

import DynamicShapeQuestion from "./DynamicShapeQuestion";
import DynamicShapeAnswer from "./DynamicShapeAnswer";

interface FAQItemProps {
  question: string;
  answer: string;
  isMobile?: boolean;
  activeQuestionId?: string | null;
  onQuestionClick?: (questionId: string) => void;
  questionId: string;
}

const FAQItem = ({
  question,
  answer,
  isMobile = false,
  activeQuestionId,
  onQuestionClick,
  questionId,
}: FAQItemProps) => {
  const isActive = activeQuestionId === questionId;

  const handleClick = () => {
    onQuestionClick?.(questionId);
  };

  return (
    <div>
      <DynamicShapeQuestion isActive={isActive} onClick={handleClick}>
        {question}
      </DynamicShapeQuestion>

      {/* For mobile screen answer will be below the question */}
      {isMobile && (
        <DynamicShapeAnswer isVisible={isActive} isMobile={true}>
          {answer}
        </DynamicShapeAnswer>
      )}
    </div>
  );
};

export default FAQItem;
