import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqPageSettings",
  title: "FAQ Page Settings",
  type: "document",
  fields: [
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
  ],
  preview: {
    select: {
      media: "sidebarImage",
    },
    prepare(selection) {
      const { media } = selection;
      return {
        title: "FAQ Page Settings",
        subtitle: "Sidebar image configuration",
        media: media,
      };
    },
  },
});
