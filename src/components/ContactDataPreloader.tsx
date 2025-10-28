'use client';

import { useEffect } from 'react';
import { preloadContactData } from '@/lib/preloader/contact-preloader';

/**
 * Client-side component that preloads contact data when the homepage loads
 * This ensures contact data is ready when user clicks the "Contact Us" button
 */
export default function ContactDataPreloader() {
  useEffect(() => {
    // Start preloading contact data as soon as the homepage loads
    const startPreloading = async () => {
      try {
        await preloadContactData();
      } catch (error) {
        console.error('Failed to preload contact data:', error);
      }
    };

    // Use a small delay to ensure the homepage has loaded first
    const timer = setTimeout(startPreloading, 1000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything visible
  return null;
}