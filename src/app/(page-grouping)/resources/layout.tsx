import React, { Suspense } from "react";
import PagePanel from "@/components/ui/PagePanel";
import { getBlogPostsForNavigation } from "@/lib/sanity/blog";
import { getResourcesPage as getResourcesPageData } from "@/lib/sanity";
import { BlogListServer, BlogLeftPanel } from "@/components/blog";
import ResourcesLoadingSkeleton from "@/components/ui/ResourcesLoadingSkeleton";

// Force static generation for this layout
export const dynamic = 'force-static';
export const revalidate = 1800; // Revalidate every 30 minutes

interface LayoutProps {
  children: React.ReactNode;
  params?: Promise<{ slug?: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
  const resolvedParams = params ? await params : {};
  const currentSlug = resolvedParams.slug;

  return (
    <PagePanel
      direction={{
        sm: "up", // Small screens slide from up (header navigation)
        md: "up", // Medium screens slide from up (header navigation)
        lg: "up", // Large screens slide from up (header navigation)
        xl: "left", // Extra large screens slide from left (header navigation)
        xxl: "left", // XXL screens slide from left (header navigation)
      }}
    >
      <Suspense fallback={<ResourcesLoadingSkeleton />}>
        <ResourcesContent currentSlug={currentSlug}>
          {children}
        </ResourcesContent>
      </Suspense>
    </PagePanel>
  );
};

// Separate component for the actual content that requires data fetching
const ResourcesContent = async ({ 
  currentSlug, 
  children 
}: { 
  currentSlug?: string;
  children: React.ReactNode;
}) => {
  // Fetch data for the static columns
  const [allBlogPosts, resourcesPageData] = await Promise.all([
    getBlogPostsForNavigation(),
    getResourcesPageData(),
  ]);

  return (
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
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
