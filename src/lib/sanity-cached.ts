/**
 * Cached versions of Sanity data fetching functions
 */

import { withCache } from './cache';
import {
  getHero,
  getKeyValuePillarsSection,
  getKeyValuePillarItems,
  getAboutSection,
  getAboutItems,
  getWhoWeServeItems,
  getWhoWeServeSection,
  getWhy,
  getWhyItems,
  getServicesSection,
  getServicesForHomepage,
  getTestimonialsSection,
  getFooter,
  type Hero,
  type KeyValuePillarsSection,
  type KeyValuePillarItem,
  type AboutSection,
  type AboutItem,
  type WhoWeServeItem,
  type WhoWeServeSection,
  type Why,
  type WhyItem,
  type ServicesSection,
  type ServiceForHomepage,
  type TestimonialsSection,
  type Footer,
} from './sanity';

// For static generation, we don't need cache TTL since data is fetched at build time
// But we keep these for development mode
const CACHE_TTL = {
  HOMEPAGE_DATA: 10 * 60 * 1000, // 10 minutes for homepage data
  PAGE_DATA: 5 * 60 * 1000,      // 5 minutes for page-specific data
  STATIC_DATA: 30 * 60 * 1000,   // 30 minutes for rarely changing data
};

// Static generation revalidation times (in seconds) - used in static-generation.ts
// const REVALIDATE_TIME = {
//   HOMEPAGE_DATA: 3600,    // 1 hour
//   PAGE_DATA: 1800,        // 30 minutes
//   STATIC_DATA: 7200,      // 2 hours
// };

// Cached homepage data functions
export const getCachedHero = (): Promise<Hero | null> =>
  withCache('hero', getHero, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedKeyValuePillarsSection = (): Promise<KeyValuePillarsSection | null> =>
  withCache('keyValuePillarsSection', getKeyValuePillarsSection, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedKeyValuePillarItems = (): Promise<KeyValuePillarItem[]> =>
  withCache('keyValuePillarItems', getKeyValuePillarItems, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedAboutSection = (): Promise<AboutSection | null> =>
  withCache('aboutSection', getAboutSection, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedAboutItems = (): Promise<AboutItem[]> =>
  withCache('aboutItems', getAboutItems, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedWhoWeServeItems = (): Promise<WhoWeServeItem[]> =>
  withCache('whoWeServeItems', getWhoWeServeItems, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedWhoWeServeSection = (): Promise<WhoWeServeSection | null> =>
  withCache('whoWeServeSection', getWhoWeServeSection, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedWhy = (): Promise<Why | null> =>
  withCache('why', getWhy, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedWhyItems = (): Promise<WhyItem[]> =>
  withCache('whyItems', getWhyItems, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedServicesSection = (): Promise<ServicesSection | null> =>
  withCache('servicesSection', getServicesSection, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedServicesForHomepage = (): Promise<ServiceForHomepage[]> =>
  withCache('servicesForHomepage', getServicesForHomepage, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedTestimonialsSection = (): Promise<TestimonialsSection | null> =>
  withCache('testimonialsSection', getTestimonialsSection, CACHE_TTL.HOMEPAGE_DATA);

export const getCachedFooter = (): Promise<Footer | null> =>
  withCache('footer', getFooter, CACHE_TTL.STATIC_DATA);

/**
 * Batch fetch all homepage data with caching
 * This replaces the individual Promise.all calls in the root layout
 */
export async function getCachedHomepageData() {
  const [
    heroData,
    keyValuePillarsSection,
    keyValuePillarItems,
    aboutData,
    aboutItems,
    whoWeServeItems,
    whoWeServeSection,
    whyData,
    whyItems,
    servicesSection,
    serviceItems,
    testimonialsData,
    footerData,
  ] = await Promise.all([
    getCachedHero(),
    getCachedKeyValuePillarsSection(),
    getCachedKeyValuePillarItems(),
    getCachedAboutSection(),
    getCachedAboutItems(),
    getCachedWhoWeServeItems(),
    getCachedWhoWeServeSection(),
    getCachedWhy(),
    getCachedWhyItems(),
    getCachedServicesSection(),
    getCachedServicesForHomepage(),
    getCachedTestimonialsSection(),
    getCachedFooter(),
  ]);

  return {
    heroData,
    keyValuePillarsSection,
    keyValuePillarItems,
    aboutData,
    aboutItems,
    whoWeServeItems,
    whoWeServeSection,
    whyData,
    whyItems,
    servicesSection,
    serviceItems,
    testimonialsData,
    footerData,
  };
}
