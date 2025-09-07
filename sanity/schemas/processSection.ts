import { defineField, defineType } from "sanity";

export default defineType({
  name: "processSection",
  title: "Process Section Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Process Title",
      type: "string",
      description: "Main title for the process section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Process Description",
      type: "text",
      rows: 3,
      description: "Description text for the process section",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text for the call-to-action button",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one process section should be active at a time",
      initialValue: true,
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
        title: `${isActive ? "🟢" : "🔴"} ${title || "Process Section"}`,
        subtitle: "Process section settings",
      };
    },
  },
});
