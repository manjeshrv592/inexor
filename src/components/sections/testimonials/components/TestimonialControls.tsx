import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface TestimonialControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isAnimating: boolean;
}

const TestimonialControls: React.FC<TestimonialControlsProps> = ({
  onPrev,
  onNext,
  isAnimating,
}) => {
  return (
    <div className="flex justify-center gap-4 text-white">
      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="sm"
          variant="outline"
          onClick={onPrev}
          disabled={isAnimating}
          className="hover:bg-brand-orange-500 hover:border-brand-orange-500 transition-all duration-200"
        >
          <ArrowLeft size={16} />
        </Button>
      </motion.span>

      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="sm"
          variant="outline"
          onClick={onNext}
          disabled={isAnimating}
          className="hover:bg-brand-orange-500 hover:border-brand-orange-500 transition-all duration-200"
        >
          <ArrowRight size={16} />
        </Button>
      </motion.span>
    </div>
  );
};

export default TestimonialControls;
