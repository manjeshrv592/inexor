import { defineField, defineType } from "sanity";

export default defineType({
  name: "processStepsBlock",
  title: "Process Steps",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Main title for the process section",
      initialValue: "We follow a clear process to help you out.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      description: "Description text for the process section",
      initialValue: "With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless.",
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "processStep",
          title: "Process Step",
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
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: "title",
      steps: "steps",
    },
    prepare(selection) {
      const { title, steps } = selection;
      const stepCount = steps ? steps.length : 0;
      
      return {
        title: title || "Process Steps",
        subtitle: `${stepCount} step${stepCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
