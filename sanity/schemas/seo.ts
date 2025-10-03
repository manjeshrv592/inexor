import { defineField, defineType } from "sanity";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Page title that appears in search results and browser tabs (50-60 characters recommended)",
      validation: (Rule) =>
        Rule.max(60).warning(
          "Keep meta title under 60 characters for best SEO",
        ),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description:
        "Brief description that appears in search results (150-160 characters recommended)",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Keep meta description under 160 characters for best SEO",
        ),
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords relevant to this page (separate each keyword)",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "openGraphTitle",
      title: "Open Graph Title",
      type: "string",
      description:
        "Title for social media sharing (falls back to Meta Title if not set)",
    }),
    defineField({
      name: "openGraphDescription",
      title: "Open Graph Description",
      type: "text",
      description:
        "Description for social media sharing (falls back to Meta Description if not set)",
    }),
    createImageField({
      name: "openGraphImage",
      title: "Open Graph Image",
      description: `Image for social media sharing (1200x630px recommended). ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: false,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Canonical URL for this page (helps prevent duplicate content issues)",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      description: "Prevent search engines from following links on this page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "metaTitle",
      subtitle: "metaDescription",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "🔍 SEO Settings",
        subtitle: subtitle || "Configure SEO options",
      };
    },
  },
});
