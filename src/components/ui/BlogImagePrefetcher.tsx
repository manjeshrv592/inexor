"use client";

import { useEffect, useCallback } from "react";
import { type BlogPost } from "@/lib/sanity/blog";
import { urlForImageWithParams } from "../../../sanity/lib/image";

interface BlogImagePrefetcherProps {
  allBlogPosts: BlogPost[];
  currentSlug: string;
}

export default function BlogImagePrefetcher({ allBlogPosts, currentSlug }: BlogImagePrefetcherProps) {
  const prefetchSingleImage = useCallback((blog: BlogPost) => {
    try {
      if (!blog.featuredImage) return;

      // Generate the direct Sanity URL first
      const sanityUrl = urlForImageWithParams(blog.featuredImage, {
        width: 1200,  // Match LazyImage largest size
        quality: 75,  // Match LazyImage default quality
        format: "webp"
      }).url();

      // Generate the Next.js optimized URL that will actually be used
      // This matches what Next.js Image component generates in production
      const nextjsOptimizedUrl = `/_next/image?url=${encodeURIComponent(sanityUrl)}&w=1200&q=75`;

      // Create a link element for prefetching
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = nextjsOptimizedUrl;
      link.as = 'image';
      
      // Add to document head
      document.head.appendChild(link);

      // Optional: Remove the link after a delay to keep DOM clean
      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }, 10000); // Remove after 10 seconds

      console.log(`🔄 Prefetched: ${blog.title} - ${nextjsOptimizedUrl}`);
    } catch (error) {
      console.warn(`Failed to prefetch image for blog: ${blog.title}`, error);
    }
  }, []);

  const prefetchBlogImages = useCallback(() => {
    // Filter out the current blog post
    const otherBlogs = allBlogPosts.filter(blog => blog.slug.current !== currentSlug);
    
    // Sort by priority: next/previous blogs first, then others
    const currentIndex = allBlogPosts.findIndex(blog => blog.slug.current === currentSlug);
    const prioritizedBlogs = [
      // Next blog (higher priority)
      ...(currentIndex < allBlogPosts.length - 1 ? [allBlogPosts[currentIndex + 1]] : []),
      // Previous blog (higher priority)  
      ...(currentIndex > 0 ? [allBlogPosts[currentIndex - 1]] : []),
      // All other blogs
      ...otherBlogs.filter((_, index) => 
        index !== currentIndex + 1 && index !== currentIndex - 1
      )
    ];

    // Prefetch images with staggered timing to avoid overwhelming the browser
    prioritizedBlogs.forEach((blog, index) => {
      if (blog.featuredImage) {
        setTimeout(() => {
          prefetchSingleImage(blog);
        }, index * 500); // 500ms delay between each prefetch
      }
    });
  }, [allBlogPosts, currentSlug, prefetchSingleImage]);

  useEffect(() => {
    // Wait for initial page load to complete before starting background prefetching
    const prefetchTimer = setTimeout(() => {
      prefetchBlogImages();
    }, 2000); // 2 second delay to not interfere with initial page load

    return () => clearTimeout(prefetchTimer);
  }, [prefetchBlogImages]);

  return null; // This component doesn't render anything
}