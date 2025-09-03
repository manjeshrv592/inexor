import { defineField, defineType } from "sanity";

export default defineType({
  name: "whyItem",
  title: "Why Choose Us Item",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "content",
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
      title: "content",
      order: "order",
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        title: `${order}. ${title}`,
      };
    },
  },
});
