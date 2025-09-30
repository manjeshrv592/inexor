import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "aboutItem",
  title: "About Service Item",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Service Content",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 30, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(30)
          .error('Service content must be 30 characters or less'),
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
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "content",
      order: "order",
    },
    prepare({ title, order }) {
      return {
        title,
        subtitle: `Order: ${order}`,
      };
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
