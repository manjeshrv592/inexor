/**
 * Browser support utilities for CSS features
 */

/**
 * Detects if the browser supports CSS writing-mode property
 * @returns {boolean} True if writing-mode is supported, false otherwise
 */
export const supportsWritingMode = (): boolean => {
  if (typeof window === 'undefined') {
    // Server-side rendering - assume modern browser
    return true;
  }

  // Create a test element
  const testElement = document.createElement('div');
  testElement.style.cssText = 'writing-mode: vertical-rl;';
  
  // Check if the property was applied
  return testElement.style.writingMode === 'vertical-rl' || 
         testElement.style.writingMode === 'vertical-lr' ||
         // Check for vendor prefixes
         (testElement.style as any).webkitWritingMode !== undefined ||
         (testElement.style as any).msWritingMode !== undefined;
};

/**
 * Detects if the browser supports CSS transforms
 * @returns {boolean} True if transforms are supported, false otherwise
 */
export const supportsTransform = (): boolean => {
  if (typeof window === 'undefined') {
    return true;
  }

  const testElement = document.createElement('div');
  const prefixes = ['transform', 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform'];
  
  return prefixes.some(prefix => (testElement.style as any)[prefix] !== undefined);
};

/**
 * Gets the appropriate CSS class for vertical text based on browser support
 * @param baseClasses {string} Base CSS classes to apply
 * @returns {string} CSS classes with appropriate vertical text implementation
 */
export const getVerticalTextClasses = (baseClasses: string = ''): string => {
  if (typeof window === 'undefined') {
    // Server-side rendering - use modern approach
    return `${baseClasses} xl:rotate-180 xl:[writing-mode:vertical-rl]`;
  }

  const hasWritingModeSupport = supportsWritingMode();
  const hasTransformSupport = supportsTransform();

  if (hasWritingModeSupport) {
    // Modern browsers - use writing-mode
    return `${baseClasses} xl:rotate-180 xl:[writing-mode:vertical-rl]`;
  } else if (hasTransformSupport) {
    // Fallback for browsers that support transforms but not writing-mode
    return `${baseClasses} xl:vertical-text-fallback`;
  } else {
    // Very old browsers - no vertical text
    return baseClasses;
  }
};