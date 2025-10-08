import { withCache } from '../cache';
import { getAboutPageData, type AboutPageData } from './aboutPage';

// Cache TTL for about page data (5 minutes)
const ABOUT_PAGE_CACHE_TTL = 5 * 60 * 1000;

export async function getCachedAboutPageData(): Promise<{
  aboutPage: AboutPageData | null;
}> {
  return withCache('aboutPageData', getAboutPageData, ABOUT_PAGE_CACHE_TTL);
}
