import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPageSeo",
  title: "Contact Page SEO",
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
        title: title || "Contact Page SEO",
        subtitle: subtitle || "Configure contact page SEO settings",
      };
    },
  },
});