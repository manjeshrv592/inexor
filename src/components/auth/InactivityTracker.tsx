'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import useInactivity from '@/hooks/useInactivity';

const InactivityTracker = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const warningTime = 30; // 30 seconds warning time
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(async () => {
    try {
      console.log('[InactivityTracker] Logging out due to inactivity');
      // Use the same API endpoint as LogoutButton
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      console.log('[InactivityTracker] Logout successful, redirecting to /auth');
      // Use window.location to ensure full page reload and proper redirection
      window.location.href = '/auth';
    } catch (error) {
      console.error('[InactivityTracker] Error during logout:', error);
      // Still redirect to auth page even if API call fails
      window.location.href = '/auth';
    }
  }, []);

  // Start the inactivity timer
  const { resetTimer, registerWarningCallback } = useInactivity(handleLogout);

  // Register the warning callback
  useEffect(() => {
    // This function will be called by the useInactivity hook
    const handleWarning = (hideWarning = false) => {
      if (hideWarning) {
        console.log('[InactivityTracker] Hiding warning due to user activity');
        setShowWarning(false);
        setCountdown(0);
        if (countdownInterval.current) {
          clearInterval(countdownInterval.current);
          countdownInterval.current = null;
        }
      } else {
        // Always show warning when requested, regardless of current state
        console.log('[InactivityTracker] Showing warning');
        setShowWarning(true);
        setCountdown(warningTime);
      }
    };

    // Register our callback with the useInactivity hook
    registerWarningCallback(handleWarning);
    
    // Clean up on unmount
    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, [registerWarningCallback, warningTime]);

  // Handle resetting the timer when user interacts
  const handleStayLoggedIn = useCallback(async () => {
    console.log('[InactivityTracker] User clicked Stay Logged In');
    
    // Refresh session first
    try {
      const response = await fetch('/api/auth/refresh-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        console.error('[InactivityTracker] Failed to refresh session');
        // If session refresh fails, log out
        handleLogout();
        return;
      }
    } catch (error) {
      console.error('[InactivityTracker] Session refresh error:', error);
      handleLogout();
      return;
    }
    
    // Pass true to reset the warning state
    resetTimer(true);
    // Reset the local state
    setShowWarning(false);
    setCountdown(0);
    // Clear any existing interval
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
  }, [resetTimer, handleLogout]);

  // Update countdown every second when warning is shown
  useEffect(() => {
    if (!showWarning) return;
    
    console.log(`[InactivityTracker] Starting countdown from ${warningTime} seconds`);
    
    countdownInterval.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Time's up, clear the interval and let the useInactivity handle the logout
          if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownInterval.current) {
        console.log('[InactivityTracker] Cleaning up countdown interval');
        clearInterval(countdownInterval.current);
        countdownInterval.current = null;
      }
    };
  }, [showWarning, warningTime]);

  if (!showWarning) return null;

  return (
    <div className="inactivity-warning fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <span>Session expiring in {Math.max(0, countdown)} seconds</span>
        <button
          onClick={handleStayLoggedIn}
          className="bg-white text-yellow-600 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-50 transition-colors whitespace-nowrap"
        >
          Stay Logged In
        </button>
      </div>
    </div>
  );
};

export default InactivityTracker;
