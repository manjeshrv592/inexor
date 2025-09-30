import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 22, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(22)
          .error('Name must be 22 characters or less'),
    }),
    defineField({
      name: "position",
      title: "Position/Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 20, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(20)
          .error('Position must be 20 characters or less'),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(25)
          .error('Company name must be 25 characters or less'),
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
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(25)
          .error('Title must be 25 characters or less'),
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 350 }),
      },
      validation: (Rule) => 
        Rule.required()
          .min(50)
          .max(350)
          .error('Quote must be between 50 and 350 characters'),
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
