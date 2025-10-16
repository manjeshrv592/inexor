"use client";

import React, { createContext, useContext, useEffect, useRef, ReactNode, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Context for managing home page scroll position - no exposed methods needed
const HomeScrollContext = createContext<object | undefined>(undefined);

export const useHomeScroll = () => {
  const context = useContext(HomeScrollContext);
  if (!context) {
    throw new Error('useHomeScroll must be used within a HomeScrollProvider');
  }
  return context;
};

interface HomeScrollProviderProps {
  children: ReactNode;
}

export const HomeScrollProvider = ({ children }: HomeScrollProviderProps) => {
  const pathname = usePathname();
  const scrollPositionRef = useRef<number>(0);
  const isHomeRoute = pathname === '/';
  const hasRestoredRef = useRef<boolean>(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced scroll handler for better performance
  const debouncedScrollHandler = useCallback((scrollY: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      scrollPositionRef.current = scrollY;
      sessionStorage.setItem('homeScrollPosition', scrollY.toString());
    }, 100); // 100ms debounce delay
  }, []);

  // Save scroll position when leaving home page
  useEffect(() => {
    const handleScroll = () => {
      if (isHomeRoute) {
        debouncedScrollHandler(window.scrollY);
      }
    };

    const handleBeforeUnload = () => {
      if (isHomeRoute) {
        // Clear any pending debounced calls and save immediately on page unload
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      }
    };

    if (isHomeRoute) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        // Clean up debounce timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }
  }, [isHomeRoute, debouncedScrollHandler]);

  // Restore scroll position when returning to home page
  useEffect(() => {
    if (isHomeRoute && !hasRestoredRef.current) {
      // Small delay to ensure page is fully rendered
      const timer = setTimeout(() => {
        const savedPosition = sessionStorage.getItem('homeScrollPosition');
        const scrollPosition = savedPosition ? parseInt(savedPosition, 10) : scrollPositionRef.current;
        
        if (scrollPosition > 0) {
          window.scrollTo({
            top: scrollPosition,
            behavior: 'instant' // Use instant to avoid animation on restore
          });
        }
        
        hasRestoredRef.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }

    // Reset the restoration flag when leaving home
    if (!isHomeRoute) {
      hasRestoredRef.current = false;
    }
  }, [isHomeRoute]);

  // Clear stored position when user manually scrolls to top on home page
  useEffect(() => {
    if (isHomeRoute) {
      const handleScroll = () => {
        if (window.scrollY === 0) {
          sessionStorage.removeItem('homeScrollPosition');
          scrollPositionRef.current = 0;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomeRoute]);

  return (
    <HomeScrollContext.Provider value={{}}>
      {children}
    </HomeScrollContext.Provider>
  );
};