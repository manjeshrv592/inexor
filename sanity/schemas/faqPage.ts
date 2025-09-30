import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqPage",
  title: "FAQ Page",
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
      description: "Main title displayed on the FAQ page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      description: "Description text displayed below the page title",
    }),
    defineField({
      name: "sidebarImage",
      title: "Sidebar Image",
      type: "image",
      description: "Image displayed in the left sidebar on desktop",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for accessibility",
        },
        {
          name: "isGrayscale",
          title: "Apply Grayscale Filter",
          type: "boolean",
          description: "Apply grayscale filter to the image",
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one FAQ page should be active at a time",
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
        title: `${isActive ? "🟢" : "🔴"} ${title || "FAQ Page"}`,
        subtitle: subtitle || "FAQ page configuration",
      };
    },
  },
});
