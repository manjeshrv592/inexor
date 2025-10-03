import { defineField, defineType } from "sanity";
import { StringInputProps } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "processStepsBlock",
  title: "Process Steps",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Main title for the process section (45 characters max)",
      initialValue: "We follow a clear process to help you out.",
      components: {
        input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 45, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(45)
          .error('Section title must be 45 characters or less'),
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      description: "Description text for the process section (200 characters max)",
      initialValue: "With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless.",
      components: {
        input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 200 }),
      },
      validation: (Rule) => 
        Rule.max(200)
          .error('Section description must be 200 characters or less'),
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
              description: "Title for this step (25 characters max)",
              components: {
                input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
              },
              validation: (Rule) => 
                Rule.required()
                  .max(25)
                  .error('Step title must be 25 characters or less'),
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "text",
              rows: 3,
              description: "Description for this step (150 characters max)",
              components: {
                input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 150 }),
              },
              validation: (Rule) => 
                Rule.required()
                  .max(150)
                  .error('Step description must be 150 characters or less'),
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
