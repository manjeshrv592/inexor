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

const ResourcesPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const rightPanelRef = React.useRef<HTMLDivElement>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        setBlogPosts(posts);

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

      // Scroll right panel to top
      if (rightPanelRef.current) {
        rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
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
      className="bg-[#2f2f2f] xl:grid xl:h-full xl:grid-cols-[150px_250px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel */}
      <div className="relative h-20 xl:h-full">
        <div className="relative flex size-full items-center justify-center">
          <Button
            className="font-michroma text-[10px] tracking-[1px]"
            size="sm"
            variant={"default"}
          >
            Blogs
          </Button>
        </div>
        <div className="absolute top-0 left-0 size-full">
          <Image
            src="/img/left-image.jpg"
            alt="blog bg"
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/80">&nbsp;</div>
        </div>
      </div>

      {/* Middle Panel - Blog List */}
      <div className="p-5 xl:p-1 xl:pt-12">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] xl:block">
          LATEST <span className="text-brand-orange-500">BLOGS</span>
        </h3>

        {/* Mobile list */}
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto xl:hidden [&::-webkit-scrollbar]:hidden"
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

        {/* Desktop list */}
        <div className="hidden xl:block">
          <DynamicShape
            fill="transparent"
            stroke="#1a1a1a"
            strokeWidth={1}
            padding="p-2"
          >
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
                      className="h-[64px] w-[80px] object-cover grayscale"
                      style={{
                        clipPath:
                          "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
                      }}
                    />
                    <div className="flex flex-col p-2">
                      <div className="font-michroma pr-2 text-right text-[7px] tracking-[1px]">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <h3 className="font-michroma text-brand-orange-500 mt-auto line-clamp-2 text-[10px]">
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
          </DynamicShape>
        </div>
      </div>

      {/* Right Panel - Blog Content */}
      <div ref={rightPanelRef} className="h-full overflow-y-auto px-2 py-4">
        <AnimatePresence mode="wait">
          {activeBlogPost ? (
            <motion.div
              key={activeBlogPost._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3 className="font-michroma mb-4 text-center text-xl text-orange-500">
                {activeBlogPost.title}
              </h3>

              {/* Featured Image */}
              <div className="relative mb-6 h-[200px]">
                <div className="absolute top-0 left-0 size-full bg-black">
                  <Image
                    src={
                      activeBlogPost.featuredImage?.asset.url ||
                      "/img/left-image.jpg"
                    }
                    alt={
                      activeBlogPost.featuredImage?.alt || activeBlogPost.title
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
                          src={activeBlogPost.author.image.asset.url}
                          alt={activeBlogPost.author.name}
                          height={80}
                          width={80}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center font-bold text-white">
                          {activeBlogPost.author.name.charAt(0)}
                        </div>
                      )}
                    </span>
                    <span className="font-michroma text-xs xl:text-base">
                      {activeBlogPost.author.name.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-brand-orange-500 flex items-center gap-4 text-[10px] xl:text-xs">
                    <span className="font-michroma">
                      {new Date(activeBlogPost.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
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
                <footer className="mt-8 flex justify-between gap-2 border-t-2 border-neutral-300 pt-6">
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
                  <div>
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
    </div>
  );
};

export default ResourcesPage;
