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
        console.error('❌ Failed to preload contact data:', error);
      }
    };

    // Start preloading immediately when component mounts
    startPreloading();
  }, []);

  // This component doesn't render anything visible
  return null;
}