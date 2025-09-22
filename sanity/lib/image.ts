import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './client';

// Initialize the image builder
const builder = imageUrlBuilder(client);

/**
 * Helper function to generate image URLs with proper crop/hotspot handling
 * This respects the crop and hotspot data set in Sanity Studio
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Generate optimized image URL for blog content images
 * Applies crop/hotspot and sets reasonable defaults for blog content
 */
export function urlForBlogImage(source: SanityImageSource, width?: number, height?: number) {
  let imageBuilder = builder.image(source);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  // Apply quality and format optimizations
  return imageBuilder
    .quality(85)
    .format('webp')
    .fit('crop'); // This ensures crop/hotspot data is respected
}

/**
 * Generate optimized image URL for featured images (blog cards, headers)
 * Includes additional optimizations for featured content
 */
export function urlForFeaturedImage(source: SanityImageSource, width?: number, height?: number) {
  let imageBuilder = builder.image(source);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  // Apply quality and format optimizations for featured images
  return imageBuilder
    .quality(90)
    .format('webp')
    .fit('crop') // This ensures crop/hotspot data is respected
    .auto('format'); // Automatically choose best format
}

/**
 * Generate image URL with custom parameters
 * Provides full control over image transformations while respecting crop/hotspot
 */
export function urlForImageWithParams(
  source: SanityImageSource,
  params: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png' | 'auto';
    fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'clip' | 'min';
  } = {}
) {
  let imageBuilder = builder.image(source);
  
  if (params.width) {
    imageBuilder = imageBuilder.width(params.width);
  }
  
  if (params.height) {
    imageBuilder = imageBuilder.height(params.height);
  }
  
  if (params.quality) {
    imageBuilder = imageBuilder.quality(params.quality);
  }
  
  if (params.format) {
    if (params.format === 'auto') {
      imageBuilder = imageBuilder.auto('format');
    } else {
      imageBuilder = imageBuilder.format(params.format);
    }
  }
  
  if (params.fit) {
    imageBuilder = imageBuilder.fit(params.fit);
  }
  
  return imageBuilder;
}
