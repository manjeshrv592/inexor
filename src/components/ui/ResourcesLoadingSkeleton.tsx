import React from "react";
import { DynamicShape } from "@/components/ui/DynamicShape";

const ResourcesLoadingSkeleton: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* Left Panel Skeleton */}
      <div className="relative w-1/4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse">
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-20 bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Middle Panel Skeleton - Blog List */}
      <div className="w-1/4 p-4">
        <div className="h-6 w-24 bg-gray-600 rounded mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <DynamicShape
              key={index}
              fill="#404040"
              stroke="none"
              strokeWidth={0}
              padding="p-0"
              className="animate-pulse"
            >
              <div className="flex p-2">
                <div className="h-12 w-16 bg-gray-600 rounded mr-3 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-2 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </DynamicShape>
          ))}
        </div>
      </div>

      {/* Right Panel Skeleton - Blog Content */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-600 rounded w-3/4 mx-auto animate-pulse"></div>
          
          {/* Featured image skeleton */}
          <div className="h-48 bg-gray-600 rounded animate-pulse"></div>
          
          {/* Author and date skeleton */}
          <div className="flex items-center justify-between border-b border-gray-600 pb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-20 bg-gray-600 rounded animate-pulse"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-3">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`h-4 bg-gray-600 rounded animate-pulse ${
                  index % 3 === 2 ? 'w-3/4' : 'w-full'
                }`}
              ></div>
            ))}
          </div>
          
          {/* Navigation buttons skeleton */}
          <div className="flex justify-between pt-6">
            <div className="h-10 w-32 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesLoadingSkeleton;