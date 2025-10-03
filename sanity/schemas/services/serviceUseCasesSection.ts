import { defineField, defineType } from "sanity";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../../lib/imageConfig";

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
    createImageField({
      name: "image",
      title: "Side Image",
      description: `Image displayed alongside use cases. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: false,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: false,
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
