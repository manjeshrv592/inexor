'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PagePanelBg from './PagePanelBg';
import PagePanel from './PagePanel';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'top' | 'bottom'>('left');

  useEffect(() => {
    console.log("🎬 PageTransition effect triggered for:", pathname);
    
    // Determine animation direction based on navigation source
    const navigationSource = sessionStorage.getItem('navigationSource');
    console.log("🎯 Navigation source:", navigationSource, "for path:", pathname);
    
    if (navigationSource === 'contact-button' && pathname === '/contact') {
      setAnimationDirection('top');
      console.log("⬇️ Using TOP animation for contact from hero");
    } else if (navigationSource === 'footer') {
      setAnimationDirection('bottom');
      console.log("⬆️ Using BOTTOM animation for footer navigation");
    } else {
      setAnimationDirection('left');
      console.log("⬅️ Using LEFT animation for header navigation");
    }
    
    // Reset visibility when pathname changes
    setIsVisible(true);
    
    // If navigating to root, hide after a delay to prevent flicker
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Prevent page scrolling when PagePanel is open
  useEffect(() => {
    if (pathname !== '/' && isVisible) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      console.log("🔒 Page scrolling disabled");
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
      console.log("🔓 Page scrolling enabled");
    }

    // Cleanup function to ensure scrolling is re-enabled
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [pathname, isVisible]);

  // Don't render for root pages or when not visible
  if (pathname === '/' || !isVisible) {
    console.log("🚫 PageTransition not rendering for:", pathname, "isVisible:", isVisible);
    return null;
  }

  console.log("✅ PageTransition rendering for:", pathname);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 z-[70]"
        style={{
          viewTransitionName: `page-panel-bg-${animationDirection}`
        }}
      >
        <PagePanelBg />
      </div>
      
      <div 
        className="fixed inset-0 z-[110]"
        style={{
          viewTransitionName: `page-panel-${animationDirection}`
        }}
      >
        <PagePanel>
          <div style={{ viewTransitionName: `page-content-${animationDirection}` }}>
            {children}
          </div>
        </PagePanel>
      </div>
    </>
  );
}
