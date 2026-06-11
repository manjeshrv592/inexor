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
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Home Page SEO",
        subtitle: subtitle || "Configure home page SEO settings",
      };
    },
  },
});
