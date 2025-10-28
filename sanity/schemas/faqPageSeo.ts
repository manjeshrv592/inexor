import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqPageSeo",
  title: "FAQ Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one FAQ page SEO setting should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "seo.metaTitle",
      subtitle: "seo.metaDescription",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "FAQ Page SEO"}`,
        subtitle: subtitle || "Configure FAQ page SEO settings",
      };
    },
  },
});