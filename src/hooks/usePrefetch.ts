import { useEffect } from 'react';
import { getCachedAboutPageData } from '@/lib/sanity/aboutPage-cached';
import { getCachedFAQInitialData } from '@/lib/sanity/faq-cached';
import { dataCache } from '@/lib/cache';

/**
 * Hook to prefetch modal page data when user hovers over navigation links
 */
export const usePrefetch = () => {
  const prefetchAboutPage = async () => {
    if (!dataCache.has('aboutPageData')) {
      console.log('🔄 Prefetching About page data...');
      try {
        await getCachedAboutPageData();
        console.log('✅ About page data prefetched');
      } catch (error) {
        console.error('❌ Failed to prefetch About page data:', error);
      }
    }
  };

  const prefetchFAQPage = async () => {
    if (!dataCache.has('faqCategories')) {
      console.log('🔄 Prefetching FAQ page data...');
      try {
        await getCachedFAQInitialData();
        console.log('✅ FAQ page data prefetched');
      } catch (error) {
        console.error('❌ Failed to prefetch FAQ page data:', error);
      }
    }
  };

  const prefetchServicesPage = async () => {
    // Services data is already cached from homepage, so no additional prefetch needed
    console.log('✅ Services data already available from homepage cache');
  };

  const prefetchResourcesPage = async () => {
    // Resources would need blog data - can be added when blog caching is implemented
    console.log('🔄 Resources prefetch not implemented yet');
  };

  return {
    prefetchAboutPage,
    prefetchFAQPage,
    prefetchServicesPage,
    prefetchResourcesPage,
  };
};

/**
 * Hook to automatically prefetch all modal pages after homepage loads
 */
export const useAutoPrefetch = () => {
  const { prefetchAboutPage, prefetchFAQPage } = usePrefetch();

  useEffect(() => {
    // Prefetch modal pages after a short delay to not interfere with initial page load
    const timer = setTimeout(() => {
      console.log('🚀 Starting auto-prefetch of modal pages...');
      
      // Prefetch in order of likely user interaction
      prefetchAboutPage();
      
      setTimeout(() => {
        prefetchFAQPage();
      }, 1000); // Stagger prefetch requests
      
    }, 2000); // Wait 2 seconds after component mount

    return () => clearTimeout(timer);
  }, [prefetchAboutPage, prefetchFAQPage]);
};
