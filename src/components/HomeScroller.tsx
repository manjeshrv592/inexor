"use client";

import React, { ReactNode } from 'react';
import { useHomeScroll } from '@/contexts/HomeScrollContext';

interface HomeScrollerProps {
  children: ReactNode;
}

/**
 * HomeScroller component that preserves scroll position for the home page.
 * This component should only be used on the home page (/) route.
 * It automatically handles scroll position saving and restoration without
 * affecting other components or making them client components.
 */
const HomeScroller: React.FC<HomeScrollerProps> = ({ children }) => {
  // Initialize the scroll context (this handles all the scroll logic internally)
  useHomeScroll();

  // Simply render children - all scroll logic is handled by the context
  return <>{children}</>;
};

export default HomeScroller;