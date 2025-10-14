import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'button' | 'card';
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'text',
  lines = 1,
}) => {
  const baseClasses = 'animate-pulse bg-gray-700 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    image: 'h-48 w-full',
    button: 'h-10 w-32',
    card: 'h-64 w-full',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variants.text} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

// Specific skeleton components for common use cases
export const PageLoadingSkeleton: React.FC = () => (
  <div className="flex h-full items-center justify-center bg-[#2f2f2f]">
    <div className="space-y-4 p-8 text-center">
      <LoadingSkeleton variant="image" className="mx-auto h-16 w-16 rounded-full" />
      <LoadingSkeleton variant="text" className="mx-auto w-48" />
      <LoadingSkeleton variant="text" lines={2} className="mx-auto w-64" />
    </div>
  </div>
);

export const AboutPageSkeleton: React.FC = () => (
  <div className="size-full grid-cols-[2fr_3fr_2fr] bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
    <div className="relative h-[100px] xl:h-full">
      <LoadingSkeleton variant="image" className="h-full w-full rounded-none" />
    </div>
    <div className="col-span-2 h-[calc(100dvh-174px)] overflow-y-auto xl:h-full">
      <div className="p-5 lg:px-12">
        <LoadingSkeleton variant="text" className="mx-auto mb-4 h-8 w-48" />
        <LoadingSkeleton variant="text" className="mx-auto mb-6 h-6 w-64" />
        <div className="space-y-4">
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={2} />
          <LoadingSkeleton variant="text" lines={4} />
        </div>
      </div>
    </div>
  </div>
);

export const FAQPageSkeleton: React.FC = () => (
  <div className="h-full bg-[#2f2f2f] xl:grid xl:grid-cols-[2fr_3fr_2fr]">
    <div className="relative xl:h-full">
      <LoadingSkeleton variant="image" className="h-full w-full rounded-none" />
    </div>
    <div className="hidden h-full xl:grid xl:grid-rows-3">
      <div className="flex items-end justify-center pb-8">
        <LoadingSkeleton variant="text" className="h-8 w-32" />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 bg-[#292929] px-8">
        <LoadingSkeleton variant="text" className="h-6 w-48" />
        <LoadingSkeleton variant="text" lines={3} className="w-full" />
      </div>
      <div>&nbsp;</div>
    </div>
    <div className="h-[calc(100dvh-158px)] overflow-y-auto xl:h-full">
      <div className="flex flex-col justify-center gap-6 px-2 py-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-lg bg-gray-800 p-4">
            <LoadingSkeleton variant="text" className="mb-2 h-5 w-3/4" />
            <LoadingSkeleton variant="text" lines={2} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const PrivacyPolicyPageSkeleton: React.FC = () => (
  <div className="size-full bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
    <div className="h-full overflow-y-auto">
      <div className="h-full px-8 py-12 xl:px-12">
        <LoadingSkeleton variant="text" className="mx-auto mb-4 h-6 w-48" />
        <LoadingSkeleton variant="text" className="mb-4 h-4 w-32" />
        <div className="mt-8 space-y-6 pb-8">
          <LoadingSkeleton variant="text" lines={4} />
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={5} />
          <LoadingSkeleton variant="text" lines={2} />
          <LoadingSkeleton variant="text" lines={4} />
          <LoadingSkeleton variant="text" lines={3} />
        </div>
      </div>
    </div>
  </div>
);

export const TermsConditionsPageSkeleton: React.FC = () => (
  <div className="size-full bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
    <div className="h-full overflow-y-auto">
      <div className="h-full px-8 py-12 xl:px-12">
        <LoadingSkeleton variant="text" className="mx-auto mb-4 h-6 w-48" />
        <LoadingSkeleton variant="text" className="mb-4 h-4 w-32" />
        <div className="mt-8 space-y-6 pb-8">
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={4} />
          <LoadingSkeleton variant="text" lines={2} />
          <LoadingSkeleton variant="text" lines={5} />
          <LoadingSkeleton variant="text" lines={3} />
          <LoadingSkeleton variant="text" lines={4} />
        </div>
      </div>
    </div>
  </div>
);
