import { defineField, defineType } from "sanity";

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
      validation: (Rule) => Rule.required().max(100),
      description: "Main title for the Who We Serve section",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
      description: "Optional subtitle below the main title",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      description: "Optional description text for the section",
      rows: 3,
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
      subtitle: "subtitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: title || "Who We Serve Section",
        subtitle: `${subtitle || "No subtitle"} ${isActive ? "✅" : "❌"}`,
      };
    },
  },
});
