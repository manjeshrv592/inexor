"use client";

import React from 'react';
import { useAutoPrefetch } from '@/hooks/usePrefetch';

interface PrefetchProviderProps {
  children: React.ReactNode;
}

const PrefetchProvider: React.FC<PrefetchProviderProps> = ({ children }) => {
  // Auto-prefetch modal pages after homepage loads
  useAutoPrefetch();

  return <>{children}</>;
};

export default PrefetchProvider;
