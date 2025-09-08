import { defineField, defineType } from "sanity";

export default defineType({
  name: "serviceUseCase",
  title: "Service Use Case",
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
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
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
      const { title, stepNumber } = selection as {
        title: string;
        stepNumber: number;
      };
      return {
        title: `${stepNumber}. ${title}`,
        subtitle: "Use Case",
      };
    },
  },
});
