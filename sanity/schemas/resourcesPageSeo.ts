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
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Resources page SEO should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "seo.metaTitle",
      description: "seo.metaDescription",
      isActive: "isActive",
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
