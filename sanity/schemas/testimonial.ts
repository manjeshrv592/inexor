import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position/Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Client Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Testimonial Title",
      type: "string",
      description: "Short title/headline for the testimonial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this testimonial appears (1, 2, 3...)",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Should this testimonial be displayed?",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "image",
      order: "order",
      isActive: "isActive",
    },
    prepare({ title, subtitle, media, order, isActive }) {
      const status = isActive ? "🟠" : "⚪";
      return {
        title: `${status} ${title}`,
        subtitle: `${subtitle} (Order: ${order})`,
        media,
      };
    },
  },
});
