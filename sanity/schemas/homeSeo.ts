import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSeo",
  title: "Home Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "seo.metaTitle",
      subtitle: "seo.metaDescription",
      isActive: "seo.isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Home Page SEO"}`,
        subtitle: subtitle || "Configure home page SEO settings",
      };
    },
  },
});
