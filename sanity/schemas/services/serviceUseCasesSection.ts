import { defineField, defineType } from "sanity";

export default defineType({
  name: "serviceUseCasesSection",
  title: "Service Use Cases Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Use cases",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Side Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "steps",
      title: "Use Cases",
      type: "array",
      of: [{ type: "serviceUseCase" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", steps: "steps" },
    prepare(selection) {
      const { title, steps } = selection as {
        title: string;
        steps?: unknown[];
      };
      return {
        title: title || "Use cases",
        subtitle: `${Array.isArray(steps) ? steps.length : 0} items`,
      };
    },
  },
});
