import { defineField, defineType } from "sanity";

export default defineType({
  name: "serviceItem",
  title: "Service Item",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Service Code",
      type: "string",
      description: "Short code like IOR, DDP, VAT, EOR",
      validation: (Rule) => Rule.required().max(5),
    }),
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      description: "Full title like 'IMPORTER OF RECORD (IOR)'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading1",
      title: "First Heading Line",
      type: "string",
      description: "First line of the service heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading2",
      title: "Second Heading Line",
      type: "string",
      description: "Second line of the service heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "code",
      subtitle: "title",
      order: "order",
      isActive: "isActive",
      media: "backgroundImage",
    },
    prepare({ title, subtitle, order, isActive, media }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} ${isActive ? "✅" : "❌"}`,
        media,
      };
    },
  },
});
