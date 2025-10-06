import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section Skeleton */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-700 rounded mb-4 w-96"></div>
          <div className="h-6 bg-gray-700 rounded mb-8 w-64"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-gray-700 rounded w-32"></div>
            <div className="h-12 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      {[1, 2, 3, 4, 5].map((section) => (
        <div key={section} className="py-16 px-8">
          <div className="max-w-6xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4 w-64 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded mb-8 w-96 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-4">
                  <div className="h-48 bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
