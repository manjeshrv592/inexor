import { defineField, defineType } from "sanity";

export default defineType({
  name: "privacyPolicyPage",
  title: "🔍 SEO Settings",
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
      metaTitle: "seo.metaTitle",
    },
    prepare(selection) {
      const { metaTitle } = selection;
      return {
        title: "Privacy Policy SEO",
        subtitle: metaTitle || "SEO settings configuration",
      };
    },
  },
});
