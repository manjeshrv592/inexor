"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface MobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileToggle: React.FC<MobileToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="absolute bottom-0 left-1/2 z-50 flex size-10 -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center rounded-full bg-neutral-800 xl:hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{
          duration: 0.3,
          ease: [0.68, -0.55, 0.27, 1.55],
        }}
      >
        <ChevronDown size={18} />
        <ChevronDown size={18} className="-mt-[10px]" />
      </motion.div>
    </motion.button>
  );
};

export default MobileToggle;
