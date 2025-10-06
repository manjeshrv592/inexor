"use client";

import PagePanel from "@/components/ui/PagePanel";
import PagePanelBg from "@/components/ui/PagePanelBg";
import { CategoryButton, FAQItem } from "@/components/faq";
import { DynamicShape } from "@/components/ui/DynamicShape";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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

const FAQLayout = () => {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItemType[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [faqPageData, setFaqPageData] = useState<FAQPageType | null>(null);
  const [faqPageSettings, setFaqPageSettings] =
    useState<FAQPageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Parse URL parameters
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentCategorySlug = pathSegments[1] || "";
  const currentQuestionSlug = pathSegments[2] || "";

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

        // Determine active category from URL or default to first
        let targetCategoryIndex = 0;
        if (currentCategorySlug) {
          const categoryIndex = categoriesData.findIndex(
            (cat) => cat.slug.current === currentCategorySlug,
          );
          if (categoryIndex !== -1) {
            targetCategoryIndex = categoryIndex;
          }
        }

        if (categoriesData.length > 0) {
          setSelectedCategoryIndex(targetCategoryIndex);
          const targetCategory = categoriesData[targetCategoryIndex];

          // Fetch items for the category
          const items = await getFAQItemsByCategory(
            targetCategory.slug.current,
          );
          setFaqItems(items);

          // Determine active question from URL or default to first
          let targetQuestionId = null;
          if (currentQuestionSlug && items.length > 0) {
            const targetQuestion = items.find(
              (item) => item.slug.current === currentQuestionSlug,
            );
            if (targetQuestion) {
              targetQuestionId = targetQuestion._id;
            }
          }

          // Set active question (from URL or first available)
          if (targetQuestionId) {
            setActiveQuestionId(targetQuestionId);
          } else if (items.length > 0) {
            setActiveQuestionId(items[0]._id);
            // Update URL to reflect the first question
            if (!currentQuestionSlug) {
              router.replace(
                `/faq/${targetCategory.slug.current}/${items[0].slug.current}`,
              );
            }
          } else if (!currentCategorySlug) {
            // No URL params, redirect to first category
            router.replace(`/faq/${targetCategory.slug.current}`);
          }
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCategorySlug, currentQuestionSlug, router]);

  // Handle category change
  const handleCategoryChange = async (categoryIndex: number) => {
    if (categoryIndex === selectedCategoryIndex) return;

    try {
      setSelectedCategoryIndex(categoryIndex);
      setActiveQuestionId(null);

      const category = categories[categoryIndex];
      const items = await getFAQItemsByCategory(category.slug.current);
      setFaqItems(items);

      // Auto-select first question and update URL
      if (items.length > 0) {
        setActiveQuestionId(items[0]._id);
        router.push(`/faq/${category.slug.current}/${items[0].slug.current}`);
      } else {
        router.push(`/faq/${category.slug.current}`);
      }
    } catch (error) {
      console.error("Error fetching FAQ items for category:", error);
    }
  };

  // Handle question click
  const handleQuestionClick = (questionId: string) => {
    if (activeQuestionId !== questionId) {
      setActiveQuestionId(questionId);

      // Update URL to reflect selected question
      const question = faqItems.find((item) => item._id === questionId);
      const category = categories[selectedCategoryIndex];
      if (question && category) {
        router.push(`/faq/${category.slug.current}/${question.slug.current}`);
      }
    }
  };

  // Get current active question's answer for desktop display
  const activeQuestion = faqItems.find((item) => item._id === activeQuestionId);

  if (loading) {
    return (
      <>
        <PagePanelBg />
        <PagePanel>
          <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
            <div className="text-white">Loading...</div>
          </div>
        </PagePanel>
      </>
    );
  }

  return (
    <>
      <PagePanelBg />
      <PagePanel>
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
                src={
                  faqPageSettings?.sidebarImage?.asset?.url || "/img/faq.jpg"
                }
                alt={faqPageSettings?.sidebarImage?.alt || "FAQ sidebar image"}
                fill
                className={`object-cover ${
                  faqPageSettings?.sidebarImage?.isGrayscale !== false
                    ? "grayscale"
                    : ""
                }`}
              />
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
                {categories.map((category, index) => (
                  <div key={category._id} className="flex-shrink-0">
                    <DynamicShape
                      fill={
                        selectedCategoryIndex === index ? "#f65009" : "#404040"
                      }
                      stroke="none"
                      strokeWidth={0}
                      className="flex flex-col items-center justify-center"
                    >
                      <button
                        onClick={() => handleCategoryChange(index)}
                        className={`font-michroma hover:text-brand-orange-500 block text-[10px] tracking-[1px] ${
                          selectedCategoryIndex === index
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
                {categories.map((category, index) => (
                  <CategoryButton
                    key={category._id}
                    isActive={selectedCategoryIndex === index}
                    onClick={() => handleCategoryChange(index)}
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
          <div className="h-[calc(100vh-238px)] overflow-y-auto lg:h-full">
            <div className="flex flex-col justify-center gap-6 px-2 py-12">
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
        </div>
      </PagePanel>
    </>
  );
};

export default FAQLayout;
