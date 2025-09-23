"use client";

import { Button } from "@/components/ui/button";
import { DynamicShape } from "@/components/ui/DynamicShape";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  getBlogPosts,
  type BlogPost,
} from "@/lib/sanity/blog";
import { getResourcesPage, type ResourcesPage } from "@/lib/sanity";
import AutoScrollContainer from "@/components/ui/AutoScrollContainer";

interface ResourcesLayoutProps {
  children: React.ReactNode;
}

const ResourcesLayout: React.FC<ResourcesLayoutProps> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [resourcesPageData, setResourcesPageData] = useState<ResourcesPage | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Get current slug from pathname
  const currentSlug = pathname.split('/').pop();

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

        // If we're on the base resources page and have posts, redirect to first post
        if (pathname === '/resources' && posts.length > 0) {
          router.replace(`/resources/${posts[0].slug.current}`);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname, router]);

  // Handle blog post click with transition
  const handleBlogPostClick = (post: BlogPost) => {
    // Add a small delay to show any exit animation
    router.push(`/resources/${post.slug.current}`);
  };

  // Get active index based on current slug
  const activeIndex = blogPosts.findIndex(post => post.slug.current === currentSlug);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="h-full bg-[#2f2f2f] lg:grid lg:h-full lg:grid-cols-[150px_250px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel */}
      <div className="relative h-[55px] lg:h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5 px-2">
          <Button
            className="font-michroma text-[10px] tracking-[1px] lg:w-full"
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
      <div className="p-5 lg:hidden lg:h-full lg:flex-col lg:p-1 lg:pt-12">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] lg:block">
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
                  onClick={() => handleBlogPostClick(post)}
                >
                  {post.title}
                </div>
              </DynamicShape>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Blog List - Desktop */}
      <div className="xxl:h-[calc(100vh-128px)] hidden lg:flex lg:h-[calc(100vh-112px)] lg:flex-1 lg:flex-col lg:justify-center lg:p-1">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] lg:block">
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
                      onClick={() => handleBlogPostClick(post)}
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

      {/* Right Panel - Blog Content (children) */}
      <div className="xxl:h-[calc(100vh-128px)] h-[calc(100vh-80px)] bg-neutral-900 py-4 pr-0 pb-64 pl-2 lg:h-[calc(100vh-112px)] lg:pb-0">
        {children}
      </div>
    </div>
  );
};

export default ResourcesLayout;
