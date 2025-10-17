"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicShape } from "@/components/ui/DynamicShape";
import { type BlogPost } from "@/lib/sanity/blog";
import { truncateText } from "@/lib/utils/textUtils";
import Image from "next/image";
import { urlForFeaturedImage } from "../../../sanity/lib/image";

interface BlogListProps {
  allBlogPosts: BlogPost[];
  blogSectionTitle: string;
}

const BlogCard = ({ post, isActive }: { post: BlogPost; isActive: boolean }) => {
  return (
    <DynamicShape
      fill={isActive ? "#2a2a2a" : "#404040"}
      stroke="none"
      strokeWidth={0}
      padding="p-0"
      className="relative"
    >
      <div className="relative overflow-hidden">
        <Link
          href={`/resources/blogs/${post.slug.current}`}
          className={`flex cursor-pointer font-medium transition-opacity hover:opacity-90 ${
            isActive ? "text-orange-500 opacity-100" : "text-white opacity-70"
          }`}
        >
          <div className="xxl:h-[64px] xxl:w-[80px] relative h-[48px] w-[64px] flex-shrink-0">
            <Image
              src={
                post.featuredImage 
                  ? urlForFeaturedImage(post.featuredImage, 80, 64).url()
                  : "/img/left-image.jpg"
              }
              alt={post.featuredImage?.alt || post.title}
              fill
              unoptimized
              className="relative z-20 object-cover grayscale"
              style={{
                clipPath:
                  "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
              }}
              sizes="(min-width: 1536px) 80px, 64px"
            />
          </div>
          <div className="flex w-full flex-col justify-between p-2">
            <div className="font-michroma xxl:text-[7px] w-full pr-2 text-right text-[5px] tracking-[1px]">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className={`font-michroma xxl:text-[10px] line-clamp-2 text-left text-[8px] leading-tight tracking-[1px] ${
              isActive ? "text-orange-500" : "text-white"
            }`}>
              {truncateText(post.title, 20)}
            </div>
          </div>
        </Link>
      </div>
    </DynamicShape>
  );
};

const BlogList: React.FC<BlogListProps> = ({
  allBlogPosts,
  blogSectionTitle,
}) => {
  const pathname = usePathname();
  
  // Extract current slug from pathname
  const currentSlug = pathname.split('/').pop() || '';

  return (
    <>
      {/* Middle Panel - Blog List - Mobile */}
      <div className="p-5 xl:hidden xl:h-full xl:flex-col xl:p-1 xl:pt-12">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] xl:block">
          {blogSectionTitle}
        </h3>

        {/* Mobile list */}
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {allBlogPosts.map((post: BlogPost) => {
            const isActive = post.slug.current === currentSlug;
            return (
              <div key={post._id} className="flex-shrink-0">
                <DynamicShape
                  fill={isActive ? "#2a2a2a" : "#404040"}
                  stroke="none"
                  strokeWidth={0}
                  className="flex flex-col items-center justify-center"
                >
                  <Link
                    href={`/resources/blogs/${post.slug.current}`}
                    className={`font-michroma block w-[100px] text-[10px] tracking-[1px] transition-colors hover:text-orange-500 ${
                      isActive ? "text-orange-500" : "text-white"
                    }`}
                  >
                    {truncateText(post.title, 10)}
                  </Link>
                </DynamicShape>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Panel - Blog List - Desktop */}
      <div className="hidden lg:flex-1 xl:flex xl:flex-col xl:justify-center xl:p-1">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] xl:block">
          {blogSectionTitle}
        </h3>
        <DynamicShape
          fill="transparent"
          stroke="#1a1a1a"
          strokeWidth={1}
          padding="p-2 pr-1 py-4"
          className=""
        >
          <div className="h-[calc(100vh-230px)] max-h-[400px] overflow-y-auto pr-1">
            <div className="space-y-2">
              {allBlogPosts.map((post: BlogPost) => {
                const isActive = post.slug.current === currentSlug;
                return (
                  <BlogCard key={post._id} post={post} isActive={isActive} />
                );
              })}
            </div>
          </div>
        </DynamicShape>
      </div>
    </>
  );
};

export default BlogList;
