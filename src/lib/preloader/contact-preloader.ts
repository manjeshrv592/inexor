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
export async function preloadContactData(): Promise<void> {
  try {
    console.log('🚀 Starting contact data preloading...');
    
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

    console.log('✅ Contact data preloaded successfully:', {
      contactInfo: !!contactInfo,
      officeLocations: officeLocations.length,
      seoData: !!seoData
    });
  } catch (error) {
    console.error('❌ Failed to preload contact data:', error);
  }
}

/**
 * Gets preloaded contact info or fetches it if not available/expired
 */
export async function getPreloadedContactInfo(): Promise<ContactInfo | null> {
  if (isDataValid() && preloadedData?.contactInfo) {
    console.log('📦 Using preloaded contact info');
    return preloadedData.contactInfo;
  }
  
  console.log('🔄 Fetching fresh contact info');
  return await getContactInfo();
}

/**
 * Gets preloaded office locations or fetches them if not available/expired
 */
export async function getPreloadedOfficeLocations(): Promise<OfficeLocation[]> {
  if (isDataValid() && preloadedData?.officeLocations) {
    console.log('📦 Using preloaded office locations');
    return preloadedData.officeLocations;
  }
  
  console.log('🔄 Fetching fresh office locations');
  return await getOfficeLocations();
}

/**
 * Gets preloaded SEO data or fetches it if not available/expired
 */
export async function getPreloadedContactSeo(): Promise<ContactPageSeo | null> {
  if (isDataValid() && preloadedData?.seoData) {
    console.log('📦 Using preloaded contact SEO data');
    return preloadedData.seoData;
  }
  
  console.log('🔄 Fetching fresh contact SEO data');
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
  console.log('🗑️ Contact data cache cleared');
}