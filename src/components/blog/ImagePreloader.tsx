'use client';

import { useImagePreloader } from '@/hooks/useImagePreloader';
import { BlogPost } from '@/lib/sanity/blog';
import { useEffect } from 'react';

interface ImagePreloaderProps {
  blogPosts: BlogPost[];
  enabled?: boolean;
  priority?: boolean;
}

// Image sizes to preload - using only 1200x300 as requested
const IMAGE_SIZES = [
  { width: 1200, height: 300 }, // Featured image size for all screens
];

export function ImagePreloader({ 
  blogPosts, 
  enabled = true, 
  priority = false 
}: ImagePreloaderProps) {
  const { 
    isPreloading, 
    loadedCount, 
    totalImages, 
    progress, 
    errors 
  } = useImagePreloader(blogPosts, { 
    enabled, 
    priority,
    sizes: IMAGE_SIZES
  });

  // Log preloading progress in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (isPreloading) {
        console.log(`🖼️ Preloading blog images: ${loadedCount}/${totalImages} (${Math.round(progress)}%)`);
      } else if (loadedCount > 0 && loadedCount === totalImages) {
        console.log(`✅ Image preloading completed: ${loadedCount}/${totalImages} (100%)`);
      }
    }
  }, [isPreloading, loadedCount, totalImages, progress]);

  // Log errors in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && errors.size > 0) {
      console.warn('🚨 Image preloading errors:', Array.from(errors));
    }
  }, [errors]);

  // This component doesn't render anything visible
  return null;
}