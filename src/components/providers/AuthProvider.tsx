'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InactivityTracker from '@/components/auth/InactivityTracker';
import { isAuthenticated } from '@/app/actions/auth';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Log environment variables for debugging
  useEffect(() => {
    console.log('[AuthProvider] Environment Variables:', {
      NEXT_PUBLIC_WEB_ACCESS_ENABLED: process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED,
      NEXT_PUBLIC_SESSION_TIMEOUT: process.env.NEXT_PUBLIC_SESSION_TIMEOUT,
      NEXT_PUBLIC_INACTIVITY_WARNING_TIME: process.env.NEXT_PUBLIC_INACTIVITY_WARNING_TIME
    });
  }, []);

  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  

  const checkAuth = useCallback(async () => {
    if (!isClient) return;
    
    // Don't check auth for auth page
    if (pathname === '/auth') {
      setIsLoading(false);
      return;
    }

    // If web access is not enabled, no need to check auth
    if (process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED !== 'true') {
      setIsLoading(false);
      return;
    }

    try {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        setUserAuthenticated(false);
        router.push('/auth');
      } else {
        setUserAuthenticated(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUserAuthenticated(false);
      setIsLoading(false);
    }
  }, [isClient, pathname, router]);

  // Check if we're on the client and authentication is enabled
  useEffect(() => {
    setIsClient(true);
    checkAuth();
  }, [checkAuth]);

  // Show loading state while checking auth
  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Only render InactivityTracker if web access is enabled AND user is authenticated AND not on auth page
  const shouldShowInactivityTracker = 
    process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED === 'true' && 
    userAuthenticated && 
    pathname !== '/auth';
    
  console.log('[AuthProvider] Should show inactivity tracker:', shouldShowInactivityTracker, {
    webAccessEnabled: process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED,
    userAuthenticated,
    pathname,
    isAuthPage: pathname === '/auth'
  });
  
  return (
    <>
      {children}
      {shouldShowInactivityTracker && <InactivityTracker />}
    </>
  );
}
