import React from "react";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getBlogPostsForNavigation,
} from "@/lib/sanity/blog";
import { BlogContent } from "@/components/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  // Fetch the current blog post and all posts for navigation
  const [currentPost, allBlogPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPostsForNavigation(),
  ]);

  if (!currentPost) {
    notFound();
  }

  // Find current post index for navigation
  const currentIndex = allBlogPosts.findIndex(
    (post) => post.slug.current === slug,
  );
  const previousPost = currentIndex > 0 ? allBlogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allBlogPosts.length - 1
      ? allBlogPosts[currentIndex + 1]
      : null;

  return (
    <BlogContent
      post={currentPost}
      previousPost={previousPost}
      nextPost={nextPost}
    />
  );
};

export async function generateStaticParams() {
  const posts = await getBlogPostsForNavigation();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default BlogPostPage;
