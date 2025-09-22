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
      name: "overlayOpacity",
      title: "Overlay Opacity",
      type: "number",
      description: "Opacity of the dark overlay on the left panel image (0-1)",
      initialValue: 0.8,
      validation: (Rule) => Rule.min(0).max(1),
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
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "notes",
      title: "Admin Notes",
      type: "text",
      description: "Internal notes for administrators",
    }),
  ],
  preview: {
    select: {
      title: "leftPanelImage.alt",
      media: "leftPanelImage",
      isActive: "isActive",
      overlayOpacity: "overlayOpacity",
      applyGrayscale: "applyGrayscale",
    },
    prepare(selection) {
      const { title, media, isActive, overlayOpacity, applyGrayscale } = selection;
      const status = isActive ? "🟢" : "🔴";
      const filters = [];
      if (applyGrayscale) filters.push("Grayscale");
      if (overlayOpacity > 0) filters.push(`${Math.round(overlayOpacity * 100)}% Overlay`);
      
      return {
        title: `${status} Services Page Settings`,
        subtitle: `${title || "Left Panel Image"} ${filters.length > 0 ? `• ${filters.join(", ")}` : ""}`,
        media,
      };
    },
  },
});
