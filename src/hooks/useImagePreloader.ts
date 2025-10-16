import { useEffect, useState, useCallback } from 'react';
import { BlogPost } from '@/lib/sanity/blog';
import { urlForImageWithParams } from '../../sanity/lib/image';

interface PreloadStatus {
  loaded: Set<string>;
  loading: Set<string>;
  errors: Set<string>;
  totalImages: number;
  loadedCount: number;
}

interface UseImagePreloaderOptions {
  enabled?: boolean;
  priority?: boolean;
  sizes?: { width: number; height: number }[];
}

export function useImagePreloader(
  blogPosts: BlogPost[],
  options: UseImagePreloaderOptions = {}
) {
  const { enabled = true, priority = false, sizes = [{ width: 400, height: 300 }] } = options;
  
  const [status, setStatus] = useState<PreloadStatus>({
    loaded: new Set(),
    loading: new Set(),
    errors: new Set(),
    totalImages: 0,
    loadedCount: 0,
  });

  const preloadImage = useCallback((url: string, imageId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setStatus(prev => {
          // Only update if this image isn't already loaded
          if (prev.loaded.has(imageId)) {
            return prev;
          }
          return {
            ...prev,
            loaded: new Set([...prev.loaded, imageId]),
            loading: new Set([...prev.loading].filter(id => id !== imageId)),
            loadedCount: prev.loadedCount + 1,
          };
        });
        resolve();
      };
      
      img.onerror = () => {
        setStatus(prev => ({
          ...prev,
          errors: new Set([...prev.errors, imageId]),
          loading: new Set([...prev.loading].filter(id => id !== imageId)),
        }));
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      // Set loading state only if not already loading or loaded
      setStatus(prev => {
        if (prev.loaded.has(imageId) || prev.loading.has(imageId)) {
          return prev;
        }
        return {
          ...prev,
          loading: new Set([...prev.loading, imageId]),
        };
      });
      
      img.src = url;
    });
  }, []);

  useEffect(() => {
    if (!enabled || blogPosts.length === 0) return;

    // Create a flag to prevent multiple simultaneous preloading sessions
    let isPreloading = false;
    let isMounted = true;

    const preloadImages = async () => {
      if (isPreloading || !isMounted) return;
      isPreloading = true;

      const imagesToPreload = blogPosts
        .filter(post => post.featuredImage?.asset)
        .map(post => ({
          id: post._id,
          image: post.featuredImage!,
          slug: post.slug.current,
        }));

      if (imagesToPreload.length === 0) {
        isPreloading = false;
        return;
      }

      // Reset status for new preloading session
      if (isMounted) {
        setStatus(prev => ({
          ...prev,
          loaded: new Set(),
          loading: new Set(),
          errors: new Set(),
          totalImages: imagesToPreload.length * sizes.length,
          loadedCount: 0,
        }));
      }

      // Preload images in batches to avoid overwhelming the browser
      const batchSize = 3;
      const batches = [];
      
      for (let i = 0; i < imagesToPreload.length; i += batchSize) {
        batches.push(imagesToPreload.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        if (!isMounted) break; // Exit if component unmounted
        
        const promises = batch.flatMap(({ id, image, slug }) =>
          sizes.map(async (size) => {
            if (!isMounted) return; // Skip if component unmounted
            try {
              const imageUrl = urlForImageWithParams(image, {
                width: size.width,
                height: size.height,
                quality: 75,
                format: 'webp'
              }).url();
              
              // Log the preload URL for comparison
              console.log(`🔄 Preloading image for ${slug}:`, {
                size: `${size.width}x${size.height}`,
                preloadUrl: imageUrl,
                imageId: `${id}-${size.width}x${size.height}`
              });
              
              const imageId = `${id}-${size.width}x${size.height}`;
              await preloadImage(imageUrl, imageId);
            } catch (error) {
              console.warn(`Failed to preload image for blog post ${slug}:`, error);
            }
          })
        );

        // Wait for current batch before starting next
        await Promise.allSettled(promises);
        
        // Small delay between batches to prevent blocking
        if (isMounted) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      isPreloading = false;
    };

    // Start preloading after a short delay to not interfere with initial page load
    const timeoutId = setTimeout(() => {
      preloadImages();
    }, priority ? 0 : 1000);

    return () => {
      clearTimeout(timeoutId);
      isPreloading = false;
      isMounted = false;
    };
  }, [blogPosts, enabled, priority, sizes]); // Removed preloadImage from dependencies

  return {
    isPreloading: status.loading.size > 0,
    loadedCount: status.loadedCount,
    totalImages: status.totalImages,
    progress: status.totalImages > 0 ? (status.loadedCount / status.totalImages) * 100 : 0,
    errors: status.errors,
    isImageLoaded: (postId: string, width = 400, height = 300) => 
      status.loaded.has(`${postId}-${width}x${height}`),
  };
}