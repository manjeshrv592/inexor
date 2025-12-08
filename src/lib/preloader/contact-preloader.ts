import { getContactInfo, getOfficeLocations } from '@/lib/sanity/contact';
import { getContactPageSeo, type ContactPageSeo } from '@/lib/sanity';
import type { ContactInfo, OfficeLocation } from '@/lib/sanity/contact';

interface PreloadedData {
  contactInfo: ContactInfo | null;
  officeLocations: OfficeLocation[];
  seoData: ContactPageSeo | null;
  timestamp: number;
}

// Global cache for preloaded data
let preloadedData: PreloadedData | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Preloads all contact page data including SEO metadata
 */
export async function preloadContactData(): Promise<PreloadedData | null> {
  try {
    
    // Fetch all data in parallel for maximum speed
    const [contactInfo, officeLocations, seoData] = await Promise.all([
      getContactInfo(),
      getOfficeLocations(),
      getContactPageSeo()
    ]);

    preloadedData = {
      contactInfo,
      officeLocations,
      seoData,
      timestamp: Date.now()
    };

    // Detailed logging of all fetched data

    return preloadedData;
  } catch (error) {
    console.error('❌ Failed to preload contact data:', error);
    return null;
  }
}

/**
 * Gets preloaded contact info or fetches it if not available/expired
 */
export async function getPreloadedContactInfo(): Promise<ContactInfo | null> {
  if (isDataValid() && preloadedData?.contactInfo) {
    return preloadedData.contactInfo;
  }
  const freshData = await getContactInfo();
  return freshData;
}

/**
 * Gets preloaded office locations or fetches them if not available/expired
 */
export async function getPreloadedOfficeLocations(): Promise<OfficeLocation[]> {
  if (isDataValid() && preloadedData?.officeLocations) {
    return preloadedData.officeLocations;
  }
  const freshData = await getOfficeLocations();
  return freshData;
}

/**
 * Gets preloaded SEO data or fetches it if not available/expired
 */
export async function getPreloadedContactSeo(): Promise<ContactPageSeo | null> {
  if (isDataValid() && preloadedData?.seoData) {
    return preloadedData.seoData;
  }
  return await getContactPageSeo();
}

/**
 * Checks if the preloaded data is still valid (not expired)
 */
function isDataValid(): boolean {
  if (!preloadedData) return false;
  return (Date.now() - preloadedData.timestamp) < CACHE_DURATION;
}

/**
 * Clears the preloaded data cache
 */
export function clearContactCache(): void {
  preloadedData = null;
}