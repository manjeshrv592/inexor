/**
 * Utility functions for locale detection and country code mapping
 */

import { countryCodes } from "@/lib/validations/contact";

/**
 * Detects the user's locale from the browser and maps it to a country code
 * @returns The country code (e.g., "US", "IN", "GB") or null if not found
 */
export function detectUserCountryCode(): string | null {
  try {
    // Get the user's locale from the browser
    const locale = navigator.language || navigator.languages?.[0];
    console.log('🌍 Browser locale detected:', locale);
    
    if (!locale) {
      console.log('🌍 No locale found');
      return null;
    }

    // Extract country code from locale (e.g., "en-US" -> "US", "hi-IN" -> "IN")
    const countryFromLocale = locale.split('-')[1]?.toUpperCase();
    console.log('🌍 Country from locale:', countryFromLocale);
    
    if (!countryFromLocale) {
      console.log('🌍 No country code in locale');
      return null;
    }

    // Check if we have this country in our countryCodes array
    const foundCountry = countryCodes.find(
      (country) => country.country === countryFromLocale
    );
    console.log('🌍 Found country in list:', foundCountry);

    return foundCountry ? foundCountry.country : null;
  } catch (error) {
    console.warn('🌍 Failed to detect user locale:', error);
    return null;
  }
}

/**
 * Gets the default country code with fallback
 * @param fallback - Fallback country code if detection fails (default: "US")
 * @returns The detected or fallback country code
 */
export function getDefaultCountryCode(fallback: string = "US"): string {
  const detected = detectUserCountryCode();
  return detected || fallback;
}
