import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "The FAQ question",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 50, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(50)
          .error('Question must be 50 characters or less'),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      description: "The answer to the FAQ question",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 250 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(250)
          .error('Answer must be 250 characters or less'),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "faqCategory" }],
      description: "Which category this FAQ belongs to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "question",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order within the category (lower numbers first)",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Should this FAQ be displayed?",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Category & Order",
      name: "categoryOrder",
      by: [
        { field: "category->name", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category.name",
      order: "order",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, order, isActive } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: `${isActive ? "🟢" : "🔴"} ${subtitle || "No category"}`,
      };
    },
  },
});
