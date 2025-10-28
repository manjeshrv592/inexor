import { defineField, defineType } from "sanity";

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
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Enable/disable this SEO configuration",
      initialValue: true,
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
