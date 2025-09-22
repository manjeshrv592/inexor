# Blog Image Crop/Hotspot Implementation

## Overview
This implementation fixes the issue where cropped images in Sanity CMS were not reflecting properly in the frontend. The solution uses Sanity's `@sanity/image-url` package to respect crop and hotspot metadata set in Sanity Studio.

## Problem
- Images cropped in Sanity Studio were not displaying the crop on the frontend
- Raw image URLs were being used instead of processed URLs with crop/hotspot data
- The frontend was ignoring the crop and hotspot metadata stored by Sanity

## Solution Implemented

### 1. Created Sanity Image Utility (`sanity/lib/image.ts`)
- **`urlForImage()`** - Basic image URL generation with crop/hotspot support
- **`urlForBlogImage()`** - Optimized for blog content images (85% quality, WebP format)
- **`urlForFeaturedImage()`** - Optimized for featured images (90% quality, auto format)
- **`urlForImageWithParams()`** - Custom parameters with full control

### 2. Updated Blog Image Interfaces (`src/lib/sanity/blog.ts`)
Enhanced `BlogImage` interface to include:
- `crop` - Sanity crop metadata
- `hotspot` - Sanity hotspot metadata  
- `_type` and `_ref` - Required Sanity references
- Backward compatibility with existing `url` field

### 3. Updated Blog Queries (`sanity/lib/blogQueries.ts`)
Modified all blog queries to fetch:
- `crop` and `hotspot` data for all images
- `_type` and `_ref` for proper Sanity references
- Complete metadata for featured images, author images, and content images

### 4. Updated RichTextRenderer (`src/components/blog/RichTextRenderer.tsx`)
- Uses `urlForBlogImage()` instead of raw image URLs
- Applies crop/hotspot transformations to content images
- Maintains responsive design with proper dimensions

### 5. Updated BlogPostCard (`src/components/blog/BlogPostCard.tsx`)
- Uses `urlForFeaturedImage()` for featured images
- Applies crop/hotspot transformations to card thumbnails
- Optimized sizing for card display (200x200)

## Key Features

### Automatic Crop/Hotspot Application
- All images now respect crop boundaries set in Sanity Studio
- Hotspot data ensures important parts of images remain visible
- Works for both featured images and content images

### Performance Optimizations
- WebP format for better compression
- Quality settings optimized per use case (85% for content, 90% for featured)
- Proper sizing to avoid oversized image downloads

### Backward Compatibility
- Existing images without crop/hotspot data still work
- Fallback dimensions prevent layout breaks
- Graceful handling of missing metadata

## Testing

### Test Page Created: `/blog-test`
A dedicated test page was created at `src/app/(modal)/blog-test/page.tsx` that:
- Lists all blog posts with featured images
- Shows detailed view of selected posts
- Displays both featured images and content images
- Includes testing instructions for Sanity Studio

### How to Test
1. Navigate to `/blog-test` in your application
2. Go to Sanity Studio and edit a blog post
3. Upload an image and use the crop tool
4. Set a hotspot by clicking on the focal point
5. Save changes and refresh the test page
6. Verify that images display with crop/hotspot applied

## Files Modified

### Core Implementation
- `sanity/lib/image.ts` - **NEW** - Image utility functions
- `src/lib/sanity/blog.ts` - Updated interfaces
- `sanity/lib/blogQueries.ts` - Enhanced queries
- `src/components/blog/RichTextRenderer.tsx` - Image rendering
- `src/components/blog/BlogPostCard.tsx` - Featured image rendering

### Testing
- `src/app/(modal)/blog-test/page.tsx` - **NEW** - Test page

## Dependencies Used
- `@sanity/image-url` - Already installed in package.json
- No additional dependencies required

## Benefits
✅ **Crop Respect**: Images display exactly as cropped in Sanity Studio  
✅ **Hotspot Support**: Important image areas remain visible at different sizes  
✅ **Performance**: Optimized image formats and quality settings  
✅ **Responsive**: Proper scaling while maintaining crop boundaries  
✅ **Backward Compatible**: Existing content continues to work  

## Next Steps
If this implementation works well for blogs, the same pattern can be applied to:
- Service page images
- About page images  
- Testimonial images
- Any other Sanity images throughout the application

## Usage Examples

```typescript
// For blog content images
const contentImageUrl = urlForBlogImage(imageData, 800, 600).url();

// For featured images
const featuredImageUrl = urlForFeaturedImage(imageData, 400, 300).url();

// For custom parameters
const customImageUrl = urlForImageWithParams(imageData, {
  width: 500,
  height: 300,
  quality: 80,
  format: 'webp',
  fit: 'crop'
}).url();
```
