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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Main title displayed on the Services page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      description: "Description text displayed below the page title",
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
      title: "pageTitle",
      subtitle: "seo.metaTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Services Page"}`,
        subtitle: subtitle || "Services page configuration",
      };
    },
  },
});
