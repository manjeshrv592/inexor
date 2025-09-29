import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesPageSettings",
  title: "Services Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "leftPanelImage",
      title: "Left Panel Background Image",
      type: "image",
      description: "Background image displayed in the left panel behind service buttons",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility and SEO",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "applyGrayscale",
      title: "Apply Grayscale Filter",
      type: "boolean",
      description: "Apply grayscale filter to the left panel image",
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Services Page Settings should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "leftPanelImage.alt",
      media: "leftPanelImage",
      applyGrayscale: "applyGrayscale",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, media, applyGrayscale, isActive } = selection;
      const status = isActive ? "🟢" : "🔴";
      const filters = [];
      if (applyGrayscale) filters.push("Grayscale");
      
      return {
        title: `${status} Services Page Settings`,
        subtitle: `${title || "Left Panel Image"} ${filters.length > 0 ? `• ${filters.join(", ")}` : ""}`,
        media,
      };
    },
  },
});
