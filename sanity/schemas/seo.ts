import { defineField, defineType } from "sanity";
import { structuredDataField } from "./structuredDataField";

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
    structuredDataField(),
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
