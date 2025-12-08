import { useEffect, useRef, useCallback, useMemo } from 'react';

interface UseInactivityReturn {
  resetTimer: (resetWarningState?: boolean) => void;
  registerWarningCallback: (callback: (hideWarning?: boolean) => void) => void;
}

const useInactivity = (onInactive: () => void): UseInactivityReturn => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Store the warning callback
  type WarningCallback = (hideWarning?: boolean) => void;
  const warningCallbackRef = useRef<WarningCallback | null>(null);
  const lastActivityRef = useRef<number>(0);
  
  // Memoize the events array to prevent recreation
  const events = useMemo(() => [
    'mousedown', 'mousemove', 'keydown', 'keyup', 'keypress',
    'scroll', 'touchstart', 'touchend', 'touchmove', 'click',
    'wheel', 'contextmenu', 'dblclick', 'focus', 'blur',
    'visibilitychange', 'focusin', 'focusout'
  ] as const, []);

  // Convert minutes to milliseconds with fallback values
  const timeout = useMemo(() => {
    const minutes = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '1', 10);
    return minutes * 60 * 1000;
  }, []);
  
  const warningTimeMs = useMemo(() => {
    const minutes = parseFloat(process.env.NEXT_PUBLIC_INACTIVITY_WARNING_TIME || '0.5');
    return minutes * 60 * 1000;
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('[Inactivity Timer] Session refresh error:', error);
      return false;
    }
  }, []);

  const resetTimer = useCallback((resetWarningState: boolean = false, skipSessionRefresh: boolean = false): void => {
    // Clear existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

    // If resetWarningState is true, we're resetting due to user activity
    if (resetWarningState) {
      // Always notify to hide the warning when there's user activity
      warningCallbackRef.current?.(true);
      
      // Refresh session on user activity, unless we should skip it (e.g., logout button)
      if (!skipSessionRefresh) {
        refreshSession();
      } else {
      }
    }

    // Set the logout timer
    timerRef.current = setTimeout(() => {
      onInactive();
    }, timeout);
    
    // Set up the warning timer if we have time for a warning
    if (timeout > warningTimeMs) {
      const warningTimeout = timeout - warningTimeMs;
      
      warningTimerRef.current = setTimeout(() => {
        warningCallbackRef.current?.(false);
      }, warningTimeout);
    }
  }, [onInactive, timeout, warningTimeMs, refreshSession]);

  // Removed all tab close detection - only use inactivity timeout



  // Set up event listeners for user activity only
  useEffect(() => {
    
    // Define handleActivity inside the effect to avoid dependency issues
    const handleActivity = (event: Event) => {
      // Skip frequent events to improve performance
      if (event.type === 'mousemove' || event.type === 'touchmove') {
        // Only process every 10th mousemove/touchmove event for performance
        const now = Date.now();
        if (now - (lastActivityRef.current || 0) < 100) { // 100ms throttle
          return;
        }
        lastActivityRef.current = now;
      }
      
      // Get the actual target, handling different event types
      const target = (event as MouseEvent).target || (event as KeyboardEvent).target || 
                   (event as TouchEvent).target || (event as FocusEvent).target;
      
      // Skip if this is an interaction with the warning itself
      if (target && 
          typeof target === 'object' && 
          'closest' in target && 
          typeof target.closest === 'function' && 
          target.closest('.inactivity-warning')) {
        return;
      }
      
      // Check if this is a logout button click - prevent session refresh
      const isLogoutButton = target && 
          typeof target === 'object' && 
          'closest' in target && 
          typeof target.closest === 'function' && 
          (target.closest('button[title="Logout"]') || target.closest('button[aria-label="Logout"]'));
      
      if (isLogoutButton) {
      }
      
      // If we're in warning state, reset it
      if (warningTimerRef.current === null) {
        warningCallbackRef.current?.(true);
        // Reset the warning timer ref to allow showing the warning again
        warningTimerRef.current = null;
      }
      
      // Reset timers but conditionally refresh session
      resetTimer(true, isLogoutButton);
    };

    // Add event listeners for user activity
    events.forEach(event => {
      // Skip visibilitychange since we're not using it anymore
      if (event === 'visibilitychange') return;
      
      // Different options for different event types
      const eventOptions = ['touchstart', 'touchmove', 'wheel'].includes(event) 
        ? { passive: true, capture: true }
        : { capture: true };
      
      window.addEventListener(event, handleActivity, eventOptions);
    });

    // Start the initial timer
    resetTimer();

    return () => {
      // Clean up event listeners when the component unmounts
      events.forEach(event => {
        if (event === 'visibilitychange') return;
        window.removeEventListener(event, handleActivity, { capture: true });
      });
      
      // No tab close listeners to remove
      
      // Clear any pending timeouts
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, [events, resetTimer]);

  const registerWarningCallback = useCallback((callback: (hideWarning?: boolean) => void) => {
    warningCallbackRef.current = callback;
  }, []);

  return {
    resetTimer,
    registerWarningCallback,
  };
};

export default useInactivity;
