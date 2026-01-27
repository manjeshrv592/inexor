/**
 * Static generation functions for Next.js SSG
 * These functions fetch data at build time with ISR support
 */

import { client } from '../../sanity/lib/client';
import {
  HERO_QUERY,
  KEY_VALUE_PILLARS_SECTION_QUERY,
  KEY_VALUE_PILLAR_ITEMS_QUERY,
  ABOUT_SECTION_QUERY,
  ABOUT_ITEMS_QUERY,
  WHO_WE_SERVE_QUERY,
  WHO_WE_SERVE_SECTION_QUERY,
  WHY_QUERY,
  WHY_ITEMS_QUERY,
  SERVICES_SECTION_QUERY,
  SERVICES_FOR_HOMEPAGE_QUERY,
  FOOTER_QUERY,
} from '../../sanity/lib/queries';
import { getTestimonialsSection } from './sanity';
import { getMapsSection, sanityCountriesToServiceLocations } from './sanity-maps';
import { aboutPageQuery } from '../sanity/queries/aboutPage';
import { FAQ_CATEGORIES_QUERY, FAQ_PAGE_QUERY } from '../../sanity/lib/queries';

// Revalidation times (in seconds)
const REVALIDATE = {
  HOMEPAGE: 3600,    // 1 hour
  PAGES: 1800,       // 30 minutes
  STATIC: 7200,      // 2 hours
};

/**
 * Fetch all homepage data at build time
 */
export async function getStaticHomepageData() {

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
    mapsSection,
  ] = await Promise.all([
    client.fetch(HERO_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['hero'] } }),
    client.fetch(KEY_VALUE_PILLARS_SECTION_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['key-value-pillars-section'] } }),
    client.fetch(KEY_VALUE_PILLAR_ITEMS_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['key-value-pillar-items'] } }),
    client.fetch(ABOUT_SECTION_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['about'] } }),
    client.fetch(ABOUT_ITEMS_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['about-items'] } }),
    client.fetch(WHO_WE_SERVE_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['who-we-serve'] } }),
    client.fetch(WHO_WE_SERVE_SECTION_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['who-we-serve-section'] } }),
    client.fetch(WHY_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['why'] } }),
    client.fetch(WHY_ITEMS_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['why-items'] } }),
    client.fetch(SERVICES_SECTION_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['services-section'] } }),
    client.fetch(SERVICES_FOR_HOMEPAGE_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.HOMEPAGE, tags: ['services'] } }),
    getTestimonialsSection(), // Use function with fallback logic instead of direct query
    client.fetch(FOOTER_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.STATIC, tags: ['footer'] } }),
    getMapsSection(), // Fetch maps data server-side to avoid client-side API calls
  ]);

  // Convert maps countries to service locations format
  const serviceLocations = mapsSection
    ? sanityCountriesToServiceLocations(mapsSection.countries.filter((c: { isActive: boolean }) => c.isActive))
    : [];

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
    mapsSection,
    serviceLocations,
  };
}

/**
 * Fetch About page data at build time
 */
export async function getStaticAboutPageData() {

  const aboutPage = await client.fetch(
    aboutPageQuery,
    {},
    { cache: 'force-cache', next: { revalidate: REVALIDATE.PAGES, tags: ['about-page'] } }
  );

  return { aboutPage };
}

/**
 * Fetch FAQ data at build time
 */
export async function getStaticFAQData() {

  const [categoriesData, faqPageInfo] = await Promise.all([
    client.fetch(FAQ_CATEGORIES_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.PAGES, tags: ['faq-categories'] } }),
    client.fetch(FAQ_PAGE_QUERY, {}, { cache: 'force-cache', next: { revalidate: REVALIDATE.PAGES, tags: ['faq-page'] } }),
  ]);

  return {
    categoriesData,
    faqPageInfo,
  };
}

/**
 * Check if we're in static generation mode
 */
export function isStaticGeneration() {
  return process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';
}

/**
 * Get appropriate data fetching function based on environment
 */
export function getDataFetcher<T>(
  staticFetcher: () => Promise<T>,
  dynamicFetcher: () => Promise<T>
): () => Promise<T> {
  // In production build, use static fetcher
  // In development or runtime, use dynamic (cached) fetcher
  return process.env.NODE_ENV === 'production' ? staticFetcher : dynamicFetcher;
}
