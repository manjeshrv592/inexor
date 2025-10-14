import React from "react";
import PagePanel from "@/components/ui/PagePanel";
import { getBlogPostsForNavigation, getResourcesPage } from "@/lib/sanity/blog";
import { getResourcesPage as getResourcesPageData } from "@/lib/sanity";
import { BlogListServer, BlogLeftPanel } from "@/components/blog";

interface LayoutProps {
  children: React.ReactNode;
  params?: Promise<{ slug?: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
  const resolvedParams = params ? await params : {};
  const currentSlug = resolvedParams.slug;

  // Fetch data for the static columns
  const [allBlogPosts, resourcesPageData] = await Promise.all([
    getBlogPostsForNavigation(),
    getResourcesPageData(),
  ]);

  return (
    <PagePanel
      direction={{
        sm: "top", // Small screens slide from top (header navigation)
        md: "top", // Medium screens slide from top (header navigation)
        lg: "top", // Large screens slide from top (header navigation)
        xl: "left", // Extra large screens slide from left (header navigation)
        xxl: "left", // XXL screens slide from left (header navigation)
      }}
    >
      <div
        className="h-full xl:grid xl:h-full xl:grid-cols-[150px_250px_1fr]"
        style={{
          boxShadow:
            "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
        }}
      >
        {/* Left Panel - Static */}
        <BlogLeftPanel resourcesPageData={resourcesPageData} />

        {/* Middle Panel - Blog List - Static */}
        <BlogListServer
          allBlogPosts={allBlogPosts}
          currentSlug={currentSlug || ""}
          blogSectionTitle={
            resourcesPageData?.blogSectionTitle || "LATEST BLOGS"
          }
        />

        {/* Right Panel - Dynamic Content */}
        <div className="h-[calc(100dvh-237px)] overflow-y-auto bg-neutral-900 xl:h-full">
          {children}
        </div>
      </div>
    </PagePanel>
  );
};

export default Layout;
