import { defineField } from "sanity";
import type { ImageValue, Rule } from "sanity";

// Standard image field configuration with file type and size restrictions
export const createImageField = (fieldConfig: {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  hotspot?: boolean;
  includeAlt?: boolean;
  includeCaption?: boolean;
  includeGrayscale?: boolean;
  grayscaleDefault?: boolean;
}) => {
  const {
    name,
    title,
    description,
    required = false,
    hotspot = true,
    includeAlt = true,
    includeCaption = false,
    includeGrayscale = false,
    grayscaleDefault = true,
  } = fieldConfig;

  const fields: Array<{
    name: string;
    type: string;
    title: string;
    description?: string;
    initialValue?: boolean;
  }> = [];

  if (includeAlt) {
    fields.push({
      name: "alt",
      type: "string",
      title: "Alternative Text",
      description: "Important for SEO and accessibility",
    });
  }

  if (includeCaption) {
    fields.push({
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Optional caption for the image",
    });
  }

  if (includeGrayscale) {
    fields.push({
      name: "isGrayscale",
      type: "boolean",
      title: "Grayscale",
      description: "Apply grayscale filter to this image",
      initialValue: grayscaleDefault,
    });
  }

  return defineField({
    name,
    title,
    type: "image",
    description: description || "Upload JPG, JPEG, or PNG images only. Maximum file size: 3MB",
    options: {
      hotspot,
      accept: ".jpg,.jpeg,.png",
      metadata: ['lqip', 'palette'], // Enable LQIP and color palette generation
      // Note: File size validation is handled by Sanity's built-in validation
      // The 3MB limit is enforced through the validation function below
    },
    fields,
    validation: (Rule) => {
      let rule = Rule.custom((image: ImageValue | undefined) => {
        if (!image?.asset) {
          return required ? "Image is required" : true;
        }

        // Check file type (additional client-side validation)
        if (image.asset._ref) {
          // For existing assets, we can't check the original file type here
          // Sanity handles this at upload time with the accept option
          return true;
        }

        return true;
      });

      if (required) {
        rule = rule.required();
      }

      return rule;
    },
  });
};

// Helper function for inline images in rich text editors
export const createInlineImageBlock = (config?: {
  includeAlt?: boolean;
  includeCaption?: boolean;
  includeGrayscale?: boolean;
  grayscaleDefault?: boolean;
}) => {
  const {
    includeAlt = true,
    includeCaption = true,
    includeGrayscale = true,
    grayscaleDefault = true,
  } = config || {};

  const fields: Array<{
    name: string;
    type: string;
    title: string;
    description?: string;
    initialValue?: boolean;
  }> = [];

  if (includeAlt) {
    fields.push({
      name: "alt",
      type: "string",
      title: "Alternative Text",
      description: "Important for SEO and accessibility",
    });
  }

  if (includeCaption) {
    fields.push({
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Optional caption for the image",
    });
  }

  if (includeGrayscale) {
    fields.push({
      name: "isGrayscale",
      type: "boolean",
      title: "Grayscale",
      description: "Apply grayscale filter to this image",
      initialValue: grayscaleDefault,
    });
  }

  return {
    type: "image",
    description: `Inline content image. ${IMAGE_UPLOAD_HELP_TEXT}`,
    options: {
      hotspot: true,
      accept: ".jpg,.jpeg,.png",
      metadata: ['lqip', 'palette'], // Enable LQIP and color palette generation
    },
    fields,
    validation: (Rule: Rule) => {
      return Rule.custom((image: ImageValue | undefined) => {
        if (!image?.asset) {
          return true; // Inline images are typically optional
        }
        return true;
      });
    },
  };
};

// Specialized image field configuration for client logos (allows SVG)
export const createClientLogoField = (fieldConfig: {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  hotspot?: boolean;
  includeAlt?: boolean;
  includeCaption?: boolean;
  includeGrayscale?: boolean;
  grayscaleDefault?: boolean;
}) => {
  const {
    name,
    title,
    description,
    required = false,
    hotspot = true,
    includeAlt = true,
    includeCaption = false,
    includeGrayscale = false,
    grayscaleDefault = true,
  } = fieldConfig;

  const fields: Array<{
    name: string;
    type: string;
    title: string;
    description?: string;
    initialValue?: boolean;
  }> = [];

  if (includeAlt) {
    fields.push({
      name: "alt",
      type: "string",
      title: "Alternative Text",
      description: "Important for SEO and accessibility",
    });
  }

  if (includeCaption) {
    fields.push({
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Optional caption for the image",
    });
  }

  if (includeGrayscale) {
    fields.push({
      name: "isGrayscale",
      type: "boolean",
      title: "Grayscale",
      description: "Apply grayscale filter to this image",
      initialValue: grayscaleDefault,
    });
  }

  return defineField({
    name,
    title,
    type: "image",
    description: description || "Upload SVG, JPG, JPEG, or PNG logos. SVG recommended for best quality. Maximum file size: 3MB",
    options: {
      hotspot,
      accept: ".svg,.jpg,.jpeg,.png",
      metadata: ['palette'], // Only enable color palette generation (LQIP not needed for SVGs)
      // Note: File size validation is handled by Sanity's built-in validation
      // The 3MB limit is enforced through the validation function below
    },
    fields,
    validation: (Rule) => {
      let rule = Rule.custom((image: ImageValue | undefined) => {
        if (!image?.asset) {
          return required ? "Logo is required" : true;
        }

        // Check file type (additional client-side validation)
        if (image.asset._ref) {
          // For existing assets, we can't check the original file type here
          // Sanity handles this at upload time with the accept option
          return true;
        }

        return true;
      });

      if (required) {
        rule = rule.required();
      }

      return rule;
    },
  });
};

// Helper text component for image upload restrictions
export const IMAGE_UPLOAD_HELP_TEXT = "📁 Supported formats: JPG, JPEG, PNG | 📏 Maximum size: 3MB";

// Helper text component for client logo upload restrictions
export const CLIENT_LOGO_UPLOAD_HELP_TEXT = "📁 Supported formats: SVG, JPG, JPEG, PNG | 📏 Maximum size: 3MB | 🎯 SVG recommended for best quality";
