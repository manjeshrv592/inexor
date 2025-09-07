import { defineField, defineType } from "sanity";

export default defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Step Number",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(99),
    }),
    defineField({
      name: "title",
      title: "Step Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Step Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      stepNumber: "stepNumber",
    },
    prepare(selection) {
      const { title, stepNumber } = selection;
      return {
        title: `${stepNumber}. ${title}`,
        subtitle: "Process Step",
      };
    },
  },
});
