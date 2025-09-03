import { defineField, defineType } from "sanity";

export default defineType({
  name: "why",
  title: "Why Choose Us Section",
  type: "document",
  fields: [
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
      validation: (Rule) => Rule.required(),
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
      title: "subtitle",
      subtitle: "description",
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
