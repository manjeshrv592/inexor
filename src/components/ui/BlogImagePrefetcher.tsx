"use client";

import { useEffect, useCallback } from "react";
import { type BlogPost, type BlogImage } from "@/lib/sanity/blog";
import { urlForImage } from "../../../sanity/lib/image";

interface BlogImagePrefetcherProps {
  allBlogPosts: BlogPost[];
  currentSlug: string;
}

export default function BlogImagePrefetcher({ allBlogPosts, currentSlug }: BlogImagePrefetcherProps) {
  const prefetchSingleImage = (image: BlogImage) => {
    if (!image?.asset?._ref) return;

    // Generate direct Sanity CDN URL to match the unoptimized Image component
    const imageUrl = urlForImage(image).width(1200).height(600).url();
    
    // Log the prefetched URL for debugging
    console.log(`🔗 Prefetching URL: ${imageUrl}`);
    
    // Create prefetch link element
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = imageUrl;
    link.as = 'image';
    
    // Add to document head
    document.head.appendChild(link);
  };

  const prefetchBlogImages = useCallback(() => {
    try {
      // Prefetch current blog's featured image
      const currentBlog = allBlogPosts.find(blog => blog.slug.current === currentSlug);
      if (currentBlog?.featuredImage) {
        prefetchSingleImage(currentBlog.featuredImage);
      }

      // Prefetch other blog images (limit to avoid overwhelming)
      const otherBlogs = allBlogPosts
        .filter(blog => blog.slug.current !== currentSlug && blog.featuredImage)
        .slice(0, 3); // Limit to 3 additional images

      otherBlogs.forEach(blog => {
        if (blog.featuredImage) {
          prefetchSingleImage(blog.featuredImage);
        }
      });

      console.log(`🔄 Prefetched ${otherBlogs.length + (currentBlog?.featuredImage ? 1 : 0)} blog images`);
    } catch (error) {
      console.warn('Failed to prefetch blog images:', error);
    }
  }, [allBlogPosts, currentSlug]);

  useEffect(() => {
    // Wait for initial page load to complete before starting background prefetching
    const prefetchTimer = setTimeout(() => {
      prefetchBlogImages();
    }, 2000); // 2 second delay to not interfere with initial page load

    return () => clearTimeout(prefetchTimer);
  }, [prefetchBlogImages]);

  return null; // This component doesn't render anything
}