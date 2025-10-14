"use client";

import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  type BlogPost,
} from "@/lib/sanity/blog";
import AutoScrollContainer, {
  AutoScrollContainerRef,
} from "@/components/ui/AutoScrollContainer";
import { urlForImage } from "../../../sanity/lib/image";

interface BlogContentProps {
  post: BlogPost;
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogContent: React.FC<BlogContentProps> = ({
  post,
  previousPost,
  nextPost,
}) => {
  const blogContentScrollRef = useRef<AutoScrollContainerRef>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get navigation info
  const hasPrev = !!previousPost;
  const hasNext = !!nextPost;

  // Handle navigation
  const handleNavigation = (direction: "prev" | "next") => {
    const targetPost = direction === "prev" ? previousPost : nextPost;
    if (targetPost) {
      // Use Next.js router for client-side navigation
      router.push(`/resources/${targetPost.slug.current}`);
    }
  };

  if (!post) {
    return (
      <AutoScrollContainer ref={blogContentScrollRef}>
        <div className="flex h-full items-center justify-center">
          <div className="text-white">Loading blog post...</div>
        </div>
      </AutoScrollContainer>
    );
  }

  return (
    <AutoScrollContainer ref={blogContentScrollRef}>
      <div ref={rightPanelRef} className="pr-2">
        <div key={post._id}>
          <h3 className="font-michroma mb-4 text-center text-xl text-white">
            {post.title}
          </h3>

          {/* Featured Image */}
          <div className="relative h-[200px]">
            <div className="absolute top-0 left-0 size-full bg-black">
              <Image
                src={
                  post.featuredImage?.asset.url ||
                  "/img/left-image.jpg"
                }
                alt={
                  post.featuredImage?.alt ||
                  post.title
                }
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>

          <div className="text-sm text-neutral-100">
            {/* Author and Date */}
            <div className="mb-12 flex items-center justify-between border-b-2 border-neutral-200 px-6 py-4">
              <div className="flex items-center gap-2 lg:gap-4">
                <span className="inline-block size-10 overflow-hidden rounded-full bg-neutral-700">
                  {post.author.image ? (
                    <Image
                      src={urlForImage(post.author.image)
                        .width(80)
                        .height(80)
                        .url()}
                      alt={post.author.name}
                      height={80}
                      width={80}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-sm text-white">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                </span>
                <span className="font-michroma text-xs">
                  {post.author.name.toUpperCase()}
                </span>
              </div>
              <div className="text-brand-orange-500 flex flex-col items-end gap-2 text-[10px] lg:flex-row lg:items-center lg:gap-4">
                <span className="font-michroma">
                  {new Date(
                    post.publishedAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.readingTime && (
                  <span className="font-michroma">
                    {post.readingTime} min read
                  </span>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div className="px-12">
              {post.content && (
                <PortableTextRenderer content={post.content} />
              )}
            </div>

            {/* Navigation Footer */}
            <footer className="mt-8 flex flex-col justify-between gap-4 border-t-2 border-neutral-300 pt-6 pb-4 md:flex-row">
              <div>
                {hasPrev && previousPost ? (
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
                    <p className="mt-2 text-xs">{previousPost.title}</p>
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
        </div>
      </div>
    </AutoScrollContainer>
  );
};

export default BlogContent;
