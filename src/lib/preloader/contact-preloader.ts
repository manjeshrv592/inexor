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

    // Detailed logging of all fetched data
    console.log('✅ Contact data preloaded successfully!');
    console.log('📧 Contact Info:', contactInfo);
    console.log('🏢 Office Locations:', officeLocations);
    console.log('🔍 SEO Data:', seoData);
    console.log('📊 Summary:', {
      contactInfo: !!contactInfo,
      officeLocations: officeLocations.length,
      seoData: !!seoData,
      timestamp: new Date(preloadedData.timestamp).toISOString()
    });

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
    console.log('📦 Using preloaded contact info');
    console.log('📧 Contact info data:', preloadedData.contactInfo);
    return preloadedData.contactInfo;
  }
  
  console.log('🔄 Fetching fresh contact info');
  const freshData = await getContactInfo();
  console.log('📧 Fresh contact info data:', freshData);
  return freshData;
}

/**
 * Gets preloaded office locations or fetches them if not available/expired
 */
export async function getPreloadedOfficeLocations(): Promise<OfficeLocation[]> {
  if (isDataValid() && preloadedData?.officeLocations) {
    console.log('📦 Using preloaded office locations');
    console.log('🏢 Office locations data:', preloadedData.officeLocations);
    return preloadedData.officeLocations;
  }
  
  console.log('🔄 Fetching fresh office locations');
  const freshData = await getOfficeLocations();
  console.log('🏢 Fresh office locations data:', freshData);
  return freshData;
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