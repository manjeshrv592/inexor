"use client";

import React from "react";
import { motion } from "framer-motion";

const PagePanelBg = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] cursor-pointer bg-black/30 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default PagePanelBg;
