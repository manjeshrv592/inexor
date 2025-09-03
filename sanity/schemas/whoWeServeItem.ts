import { defineField, defineType } from "sanity";

export default defineType({
  name: "whoWeServeItem",
  title: "Who We Serve Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
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
        "Order in which this item should appear (lower numbers first)",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      order: "order",
    },
    prepare(selection) {
      const { title, subtitle, order } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
      };
    },
  },
});
