"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AutoScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const AutoScrollContainer = ({
  children,
  className,
  contentClassName,
}: AutoScrollContainerProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = React.useState(false);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.clientHeight;

        // Temporarily remove flex to get natural content height
        const originalClass = contentRef.current.className;
        contentRef.current.className = "h-auto";

        const contentHeight = contentRef.current.scrollHeight;

        // Restore original class
        contentRef.current.className = originalClass;

        // Add scroll if content exceeds container height
        setNeedsScroll(contentHeight > containerHeight);
      }
    };

    // Delay initial check to ensure DOM is ready
    const timer = setTimeout(checkOverflow, 100);

    // Check on resize
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkOverflow, 50);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div ref={containerRef} className={cn("h-full", className)}>
      <div
        ref={contentRef}
        className={cn(
          "h-full",
          needsScroll ? "overflow-y-auto" : "",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AutoScrollContainer;
