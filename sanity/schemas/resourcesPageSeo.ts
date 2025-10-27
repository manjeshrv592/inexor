import { defineField, defineType } from "sanity";

export default defineType({
  name: "resourcesPageSeo",
  title: "Resources Page SEO",
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
      isActive: "seo.isActive",
    },
    prepare(selection) {
      const { title, description, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Resources Page SEO"}`,
        subtitle: description || "Resources page SEO configuration",
      };
    },
  },
});
