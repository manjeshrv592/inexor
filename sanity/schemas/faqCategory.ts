import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "faqCategory",
  title: "FAQ Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      description:
        "Display name for the category (e.g., General, EOR/IOR, VAT/DDP)",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 8, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(8)
          .error('Category name must be 8 characters or less'),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this category appears (lower numbers first)",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Should this category be displayed?",
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
      order: "order",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, order, isActive } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: `${isActive ? "🟢 Active" : "🔴 Inactive"}`,
      };
    },
  },
});
