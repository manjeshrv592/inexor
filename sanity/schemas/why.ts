import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "why",
  title: "Why Choose Us Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      initialValue: "WHY CHOOSE INEXOR",
      validation: (Rule) => Rule.required().max(100),
      description: "Main section title (e.g., 'WHY CHOOSE INEXOR')",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (H3)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 1000 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(1000)
          .error('Description must be 1000 characters or less'),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one why section should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title}`,
        subtitle: subtitle,
      };
    },
  },
});
