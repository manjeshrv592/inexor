import { defineField, defineType } from "sanity";

export default defineType({
  name: "termsConditionsPage",
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
      isActive: "seo.isActive",
    },
    prepare(selection) {
      const { metaTitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} Terms & Conditions SEO`,
        subtitle: metaTitle || "SEO settings configuration",
      };
    },
  },
});
