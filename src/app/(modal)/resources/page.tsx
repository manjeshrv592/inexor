"use client";

import { Button } from "@/components/ui/button";
import { DynamicShape } from "@/components/ui/DynamicShape";
import { RichTextRenderer } from "@/components/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getBlogPosts,
  getBlogPostBySlug,
  type BlogPost,
} from "@/lib/sanity/blog";
import { getResourcesPage, type ResourcesPage } from "@/lib/sanity";
import AutoScrollContainer, {
  AutoScrollContainerRef,
} from "@/components/ui/AutoScrollContainer";
import { urlForImage } from "../../../../sanity/lib/image";

const ResourcesPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [resourcesPageData, setResourcesPageData] =
    useState<ResourcesPage | null>(null);
  const rightPanelRef = React.useRef<HTMLDivElement>(null);
  const blogContentScrollRef = React.useRef<AutoScrollContainerRef>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both blog posts and resources page data
        const [posts, pageData] = await Promise.all([
          getBlogPosts(),
          getResourcesPage(),
        ]);

        setBlogPosts(posts);
        setResourcesPageData(pageData);

        // Set first post as active if posts exist
        if (posts.length > 0) {
          const firstPost = await getBlogPostBySlug(posts[0].slug.current);
          setActiveBlogPost(firstPost);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle blog post click
  const handleBlogPostClick = async (post: BlogPost, index: number) => {
    try {
      const fullPost = await getBlogPostBySlug(post.slug.current);
      setActiveBlogPost(fullPost);
      setActiveIndex(index);

      // Scroll both containers to ensure we reach the very top
      // Scroll the outer right panel container immediately
      if (rightPanelRef.current) {
        rightPanelRef.current.scrollTop = 0;
        rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Scroll the inner AutoScrollContainer content immediately
      if (blogContentScrollRef.current) {
        blogContentScrollRef.current.scrollToTop();
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  // Handle navigation
  const handleNavigation = async (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? Math.max(0, activeIndex - 1)
        : Math.min(blogPosts.length - 1, activeIndex + 1);

    if (newIndex !== activeIndex && blogPosts[newIndex]) {
      await handleBlogPostClick(blogPosts[newIndex], newIndex);
    }
  };

  // Get navigation info
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < blogPosts.length - 1;
  const prevPost = hasPrev ? blogPosts[activeIndex - 1] : null;
  const nextPost = hasNext ? blogPosts[activeIndex + 1] : null;

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="h-full bg-[#2f2f2f] xl:grid xl:h-full xl:grid-cols-[150px_250px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel */}
      <div className="relative h-[55px] xl:h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5 px-2">
          <Button
            className="font-michroma text-[10px] tracking-[1px] xl:w-full"
            variant={"default"}
          >
            Blogs
          </Button>
        </div>
        <div className="absolute top-0 left-0 size-full">
          <Image
            src={
              resourcesPageData?.leftPanelBackgroundImage?.asset?.url ||
              "/img/left-image.jpg"
            }
            alt={resourcesPageData?.leftPanelBackgroundImage?.alt || "blog bg"}
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/80">&nbsp;</div>
        </div>
      </div>

      {/* Middle Panel - Blog List Mobile */}
      <div className="p-5 xl:hidden xl:h-full xl:flex-col xl:p-1 xl:pt-12">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] xl:block">
          {resourcesPageData?.blogSectionTitle || "LATEST BLOGS"}
        </h3>

        {/* Mobile list */}
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {blogPosts.map((post, index) => (
            <div key={post._id} className="flex-shrink-0">
              <DynamicShape
                fill={activeIndex === index ? "#2a2a2a" : "#404040"}
                stroke="none"
                strokeWidth={0}
                padding="p-0"
              >
                <div
                  className="font-michroma cursor-pointer px-4 py-2 text-[10px] tracking-[1px]"
                  onClick={() => handleBlogPostClick(post, index)}
                >
                  {post.title}
                </div>
              </DynamicShape>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Blog List - Desktop */}
      <div className="xxl:h-[calc(100vh-128px)] hidden xl:flex xl:h-[calc(100vh-112px)] xl:flex-1 xl:flex-col xl:justify-center xl:p-1">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] xl:block">
          {resourcesPageData?.blogSectionTitle || "LATEST BLOGS"}
        </h3>
        <DynamicShape
          fill="transparent"
          stroke="#1a1a1a"
          strokeWidth={1}
          padding="p-2 pr-1 py-4"
          className=""
        >
          <AutoScrollContainer className="xxl:h-[456px] h-[360px]">
            <div className="pr-1">
              <div className="space-y-2">
                {blogPosts.map((post, index) => (
                  <DynamicShape
                    key={post._id}
                    fill={activeIndex === index ? "#2a2a2a" : "#404040"}
                    stroke="none"
                    strokeWidth={0}
                    padding="p-0"
                  >
                    <div
                      className="flex cursor-pointer font-medium text-white transition-opacity hover:opacity-90"
                      onClick={() => handleBlogPostClick(post, index)}
                    >
                      <Image
                        src={
                          post.featuredImage?.asset.url || "/img/left-image.jpg"
                        }
                        alt={post.featuredImage?.alt || post.title}
                        width={200}
                        height={200}
                        className="xxl:h-[64px] xxl:w-[80px] h-[48px] w-[64px] object-cover grayscale"
                        style={{
                          clipPath:
                            "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
                        }}
                      />
                      <div className="flex w-full flex-col p-2">
                        <div className="font-michroma xxl:text-[7px] w-full pr-2 text-right text-[5px] tracking-[1px]">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </div>
                        <h3 className="font-michroma text-brand-orange-500 xxl:text-[10px] mt-auto line-clamp-2 text-[8px]">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </DynamicShape>
                ))}

                {blogPosts.length === 0 && !loading && (
                  <div className="py-4 text-center text-gray-400">
                    No blog posts available.
                  </div>
                )}
              </div>
            </div>
          </AutoScrollContainer>
        </DynamicShape>
      </div>

      {/* Right Panel - Blog Content */}
      <div
        ref={rightPanelRef}
        className="xxl:h-[calc(100vh-128px)] h-[calc(100vh-80px)] bg-neutral-900 py-4 pr-0 pb-64 pl-2 xl:h-[calc(100vh-112px)] xl:pb-0"
      >
        <AutoScrollContainer ref={blogContentScrollRef}>
          <div className="pr-2">
            <AnimatePresence mode="wait">
              {activeBlogPost ? (
                <motion.div
                  key={activeBlogPost._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="font-michroma mb-4 text-center text-xl text-white">
                    {activeBlogPost.title}
                  </h3>

                  {/* Featured Image */}
                  <div className="relative h-[200px]">
                    <div className="absolute top-0 left-0 size-full bg-black">
                      <Image
                        src={
                          activeBlogPost.featuredImage?.asset.url ||
                          "/img/left-image.jpg"
                        }
                        alt={
                          activeBlogPost.featuredImage?.alt ||
                          activeBlogPost.title
                        }
                        fill
                        className="object-cover opacity-30 grayscale"
                      />
                    </div>
                  </div>

                  <div className="text-sm text-neutral-100">
                    {/* Author and Date */}
                    <div className="mb-12 flex items-center justify-between border-b-2 border-neutral-200 px-6 py-4">
                      <div className="flex items-center gap-2 xl:gap-4">
                        <span className="inline-block size-10 overflow-hidden rounded-full bg-neutral-700">
                          {activeBlogPost.author.image ? (
                            <Image
                              src={urlForImage(activeBlogPost.author.image)
                                .width(80)
                                .height(80)
                                .url()}
                              alt={activeBlogPost.author.name}
                              height={80}
                              width={80}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-sm text-white">
                              {activeBlogPost.author.name.charAt(0)}
                            </div>
                          )}
                        </span>
                        <span className="font-michroma text-xs">
                          {activeBlogPost.author.name.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-brand-orange-500 flex flex-col items-end gap-2 text-[10px] lg:flex-row lg:items-center lg:gap-4">
                        <span className="font-michroma">
                          <span className="lg:hidden">
                            {new Date(
                              activeBlogPost.publishedAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="hidden lg:inline">
                            {new Date(
                              activeBlogPost.publishedAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </span>
                        {activeBlogPost.readingTime && (
                          <span className="font-michroma">
                            {activeBlogPost.readingTime} min read
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Blog Content */}
                    {activeBlogPost.content && (
                      <RichTextRenderer content={activeBlogPost.content} />
                    )}

                    {/* Navigation Footer */}
                    <footer className="mt-8 flex flex-col justify-between gap-4 border-t-2 border-neutral-300 pt-6 pb-4 md:flex-row">
                      <div>
                        {hasPrev && prevPost ? (
                          <>
                            <Button
                              className="font-michroma text-[10px] tracking-[1px]"
                              variant={"outline"}
                              size={"sm"}
                              onClick={() => handleNavigation("prev")}
                            >
                              <span className="flex gap-2">
                                <ArrowLeft size={16} /> Prev Blog
                              </span>
                            </Button>
                            <p className="mt-2 text-xs">{prevPost.title}</p>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="md:flex md:flex-col md:items-end">
                        {hasNext && nextPost ? (
                          <>
                            <Button
                              className="font-michroma text-[10px] tracking-[1px]"
                              variant={"outline"}
                              size={"sm"}
                              onClick={() => handleNavigation("next")}
                            >
                              <span className="flex gap-2">
                                Next Blog <ArrowRight size={16} />
                              </span>
                            </Button>
                            <p className="mt-2 text-xs">{nextPost.title}</p>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </footer>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full items-center justify-center"
                >
                  <p className="text-center text-gray-400">
                    {blogPosts.length === 0
                      ? "No blog posts available."
                      : "Select a blog post to read."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AutoScrollContainer>
      </div>
    </div>
  );
};

export default ResourcesPage;
