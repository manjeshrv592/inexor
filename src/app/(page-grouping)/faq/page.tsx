"use client";

import AutoScrollContainer from "@/components/ui/AutoScrollContainer";
import { CategoryButton, FAQItem } from "@/components/faq";
import { DynamicShape } from "@/components/ui/DynamicShape";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getFAQCategories,
  getFAQItemsByCategory,
  getFAQPage,
  type FAQCategory,
  type FAQItem as FAQItemType,
  type FAQPage as FAQPageType,
} from "@/lib/sanity";
import { getFAQPageSettings, type FAQPageSettings } from "@/lib/sanity/faq";

const FAQPage = () => {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [faqPageData, setFaqPageData] = useState<FAQPageType | null>(null);
  const [faqPageSettings, setFaqPageSettings] =
    useState<FAQPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, faqPageInfo, faqSettings] = await Promise.all([
          getFAQCategories(),
          getFAQPage(),
          getFAQPageSettings(),
        ]);

        setCategories(categoriesData);
        setFaqPageData(faqPageInfo);
        setFaqPageSettings(faqSettings);

        // Set first category as active by default
        if (categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          setActiveCategory(firstCategory.slug.current);

          // Fetch items for first category
          const items = await getFAQItemsByCategory(firstCategory.slug.current);
          setFaqItems(items);

          // Set first question as active if items exist
          if (items.length > 0) {
            setActiveQuestionId(items[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category change
  const handleCategoryChange = async (categorySlug: string) => {
    if (categorySlug === activeCategory) return;

    try {
      setActiveCategory(categorySlug);
      setActiveQuestionId(null); // Reset active question

      const items = await getFAQItemsByCategory(categorySlug);
      setFaqItems(items);

      // Auto-select first question if items exist
      if (items.length > 0) {
        setActiveQuestionId(items[0]._id);
      }
    } catch (error) {
      console.error("Error fetching FAQ items for category:", error);
    }
  };

  // Handle question click - always keep one question open
  const handleQuestionClick = (questionId: string) => {
    // Only change if clicking on a different question
    // Clicking on the currently open question does nothing (keeps it open)
    if (activeQuestionId !== questionId) {
      setActiveQuestionId(questionId);
    }
  };

  // Get current active question's answer for desktop display
  const activeQuestion = faqItems.find((item) => item._id === activeQuestionId);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="h-full bg-[#2f2f2f] lg:grid lg:grid-cols-[2fr_3fr_2fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel - Category Selection */}
      <div className="relative lg:h-full">
        <div className="absolute inset-0 hidden size-full lg:block">
          <Image
            src={faqPageSettings?.sidebarImage?.asset?.url || "/img/faq.jpg"}
            alt={faqPageSettings?.sidebarImage?.alt || "FAQ sidebar image"}
            fill
            className={`object-cover ${faqPageSettings?.sidebarImage?.isGrayscale !== false ? "grayscale" : ""}`}
          />
          {/* <div className="absolute inset-0 z-10 bg-black/60"></div> */}
        </div>

        {/* Mobile Categories - Horizontal Scroll */}
        <div className="relative z-10 flex h-full items-center p-5 lg:hidden">
          <div
            className="flex flex-nowrap gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category) => (
              <div key={category._id} className="flex-shrink-0">
                <DynamicShape
                  fill={
                    activeCategory === category.slug.current
                      ? "#f65009"
                      : "#404040"
                  }
                  stroke="none"
                  strokeWidth={0}
                  className="flex flex-col items-center justify-center"
                >
                  <button
                    onClick={() => handleCategoryChange(category.slug.current)}
                    className={`font-michroma hover:text-brand-orange-500 block text-[10px] tracking-[1px] ${
                      activeCategory === category.slug.current
                        ? "text-white"
                        : "text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                </DynamicShape>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Categories - Vertical Layout */}
        <div className="relative z-10 hidden h-full flex-col items-center justify-center gap-4 p-8 text-center lg:flex">
          <p className="text-sm">
            {faqPageData?.pageDescription ||
              "Our FAQ Section Offers Fast, Clear Answers To Popular Questions, So You Can Find Information Easily."}
          </p>
          <h5 className="font-michroma">
            Select <span className="text-brand-orange-500">Category</span>
          </h5>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <CategoryButton
                key={category._id}
                isActive={activeCategory === category.slug.current}
                onClick={() => handleCategoryChange(category.slug.current)}
              >
                {category.name}
              </CategoryButton>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Answer Panel */}
      <div className="hidden h-full lg:grid lg:grid-rows-3">
        <div className="flex items-end justify-center pb-8">
          <h4 className="font-michroma text-brand-orange-500 text-center">
            {faqPageData?.pageTitle || "FAQ's"}
          </h4>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-6 bg-[#292929] px-8 text-center"
          style={{
            boxShadow: "0px 4px 4px 0px #00000040 inset",
          }}
        >
          <AnimatePresence mode="wait">
            {activeQuestion ? (
              <motion.div
                key={activeQuestion._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-6 text-center"
              >
                <h5 className="font-michroma text-sm text-orange-500">
                  {activeQuestion.question}
                </h5>
                <p className="text-sm">{activeQuestion.answer}</p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-gray-400"
              >
                Select a question to view the answer
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>&nbsp;</div>
      </div>

      {/* Questions Panel */}
      <div className="h-[calc(100vh-238px)] overflow-y-auto bg-[#2b2b2b] lg:h-full">
        <AutoScrollContainer>
          <div className="py-12">
            <div className="flex flex-col gap-6 px-2">
              {faqItems.map((item) => (
                <FAQItem
                  key={item._id}
                  questionId={item._id}
                  question={item.question}
                  answer={item.answer}
                  isMobile={isMobile}
                  activeQuestionId={activeQuestionId}
                  onQuestionClick={handleQuestionClick}
                />
              ))}
              {faqItems.length === 0 && !loading && (
                <div className="text-center text-gray-400">
                  No questions found for this category.
                </div>
              )}
            </div>
          </div>
        </AutoScrollContainer>
      </div>
    </div>
  );
};

export default FAQPage;
