import React from "react";

const ServicesLoadingSkeleton = () => {
  return (
    <div className="h-[calc(100dvh-158px)] overflow-y-auto bg-neutral-900 xl:h-full">
      <div className="pb-4">
        {/* Featured Image Skeleton */}
        <div className="relative mb-6 h-[300px] bg-neutral-800 animate-pulse">
          <div className="relative z-10 flex size-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 bg-black/5 p-4 text-center backdrop-blur-[5px]">
              {/* Title Skeleton */}
              <div className="h-6 w-64 bg-neutral-700 rounded animate-pulse"></div>
              {/* Subtitle Skeleton */}
              <div className="h-4 w-80 bg-neutral-700 rounded animate-pulse mt-2"></div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 text-justify text-sm text-neutral-100">
          {/* Content Skeleton */}
          <div className="space-y-4 mb-8">
            {/* Paragraph skeletons */}
            <div className="space-y-2">
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-4/5"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-2/3"></div>
            </div>

            {/* Heading skeleton */}
            <div className="h-6 bg-neutral-800 rounded animate-pulse w-1/3 mt-6"></div>
            
            <div className="space-y-2">
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-4/5"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-3/4"></div>
            </div>
          </div>

          {/* Use Cases Section Skeleton */}
          <div className="mt-8">
            {/* Use Cases Title */}
            <div className="h-6 bg-neutral-800 rounded animate-pulse w-32 mb-6"></div>
            
            {/* Use Cases Steps */}
            <div className="space-y-4">
              {[1, 2].map((step) => (
                <div key={step} className="flex gap-4 p-4 bg-neutral-800/30 rounded-lg">
                  {/* Step Number */}
                  <div className="w-8 h-8 bg-neutral-700 rounded-full animate-pulse flex-shrink-0"></div>
                  
                  <div className="flex-1 space-y-2">
                    {/* Step Title */}
                    <div className="h-5 bg-neutral-700 rounded animate-pulse w-1/2"></div>
                    {/* Step Description */}
                    <div className="h-4 bg-neutral-700 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesLoadingSkeleton;