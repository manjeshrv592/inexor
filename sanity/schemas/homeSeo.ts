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
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one home SEO setting should be active at a time",
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
        title: `${isActive ? "🟢" : "🔴"} ${title || "Home Page SEO"}`,
        subtitle: subtitle || "Configure home page SEO settings",
      };
    },
  },
});
