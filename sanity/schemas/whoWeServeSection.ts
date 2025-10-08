import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "whoWeServeSection",
  title: "Who We Serve Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "WHO WE SERVE",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(25)
          .error('Section title must be 25 characters or less'),
      description: "Main title for the Who We Serve section",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
      initialValue: "Sub Title",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 55, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.max(55)
          .error('Section subtitle must be 55 characters or less'),
      description: "Subtitle for the Who We Serve section",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this section is currently active/visible",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: title || "Who We Serve Section",
        subtitle: isActive ? "✅ Active" : "❌ Inactive",
      };
    },
  },
});
