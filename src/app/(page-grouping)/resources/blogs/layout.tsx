import React from "react";
import { getBlogPosts } from "@/lib/sanity/blog";
import { BlogList } from "@/components/blog";
import { ImagePreloader } from "@/components/blog/ImagePreloader";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const allBlogPosts = await getBlogPosts();

  return (
    <>
      <ImagePreloader
        blogPosts={allBlogPosts}
        enabled={true}
        priority={false}
      />
      <BlogList allBlogPosts={allBlogPosts} blogSectionTitle="LATEST BLOGS" />
      {children}
    </>
  );
};

export default layout;
