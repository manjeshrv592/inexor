import { defineField, defineType } from "sanity";

export default defineType({
  name: "keyValuePillarItem",
  title: "Key Value Pillar Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main heading for this pillar",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of this value pillar",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "SVG icon for this pillar (preferably 28x28px)",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this pillar should appear (1-4, lower numbers first)",
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Whether this pillar should be displayed",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      order: "order",
      media: "icon",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, order, media, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${order}. ${title}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
