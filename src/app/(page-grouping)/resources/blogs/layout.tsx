import React from "react";
import { getBlogPosts } from "@/lib/sanity/blog";
import { BlogList } from "@/components/blog";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const allBlogPosts = await getBlogPosts();

  return (
    <>
      <BlogList
        allBlogPosts={allBlogPosts}
        blogSectionTitle="LATEST BLOGS"
      />
      {children}
    </>
  );
};

export default layout;
