"use client";

import React from "react";
import { motion } from "framer-motion";
import { useModal } from "@/contexts/ModalContext";

interface PagePanelBgProps {
  onClick?: () => void;
}

const PagePanelBg = ({ onClick }: PagePanelBgProps) => {
  const { isModalClosing } = useModal();

  return (
    <motion.div
      className="fixed inset-0 z-[60] cursor-pointer bg-black/30 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: isModalClosing ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    />
  );
};

export default PagePanelBg;
