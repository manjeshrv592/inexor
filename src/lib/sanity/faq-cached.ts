import { withCache } from '../cache';
import {
  getFAQCategories,
  getFAQItemsByCategory,
  getFAQPage,
  type FAQCategory,
  type FAQItem,
  type FAQPage,
} from '../sanity';
import { getFAQPageSettings, type FAQPageSettings } from './faq';

// Cache TTL for FAQ data (5 minutes)
const FAQ_CACHE_TTL = 5 * 60 * 1000;

export async function getCachedFAQCategories(): Promise<FAQCategory[]> {
  return withCache('faqCategories', getFAQCategories, FAQ_CACHE_TTL);
}

export async function getCachedFAQItemsByCategory(categorySlug: string): Promise<FAQItem[]> {
  return withCache(`faqItems-${categorySlug}`, () => getFAQItemsByCategory(categorySlug), FAQ_CACHE_TTL);
}

export async function getCachedFAQPage(): Promise<FAQPage | null> {
  return withCache('faqPage', getFAQPage, FAQ_CACHE_TTL);
}

export async function getCachedFAQPageSettings(): Promise<FAQPageSettings | null> {
  return withCache('faqPageSettings', getFAQPageSettings, FAQ_CACHE_TTL);
}

/**
 * Batch fetch initial FAQ data with caching
 */
export async function getCachedFAQInitialData() {
  const [categoriesData, faqPageInfo, faqSettings] = await Promise.all([
    getCachedFAQCategories(),
    getCachedFAQPage(),
    getCachedFAQPageSettings(),
  ]);

  return {
    categoriesData,
    faqPageInfo,
    faqSettings,
  };
}
