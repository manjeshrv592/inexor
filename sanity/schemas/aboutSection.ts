import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leftImage",
      title: "Left Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rightImage",
      title: "Right Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title,
        subtitle: `${subtitle} ${isActive ? "✅" : "❌"}`,
      };
    },
  },
});
