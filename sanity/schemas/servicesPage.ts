import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      description: "SEO metadata for the Services page",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Services page should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "seo.metaTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Services Page"}`,
        subtitle: "Services page configuration",
      };
    },
  },
});
