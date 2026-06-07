import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPageSeo",
  title: "About Us Page SEO",
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
      description: "seo.metaDescription",
    },
    prepare(selection) {
      const { title, description } = selection;
      return {
        title: title || "About Us Page SEO",
        subtitle: description || "About Us page SEO configuration",
      };
    },
  },
});
