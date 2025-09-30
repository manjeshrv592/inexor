import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "keyValuePillarsSection",
  title: "Key Value Pillars Section",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      description:
        "The introductory text that appears at the top of the section",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 500 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(500)
          .error('Description must be 500 characters or less'),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description:
        "Only one Key Value Pillars section should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "description",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} Key Value Pillars`,
        subtitle: title,
      };
    },
  },
});
