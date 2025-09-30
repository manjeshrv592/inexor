import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "whoWeServeItem",
  title: "Who We Serve Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 55, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(55)
          .error('Title must be 55 characters or less'),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 75 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(75)
          .error('Description must be 75 characters or less'),
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
