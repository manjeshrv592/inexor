import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 36, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(36)
          .error('Title must be 36 characters or less'),
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 250 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(250)
          .error('Description must be 250 characters or less'),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
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
      description: "Only one hero section should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title}`,
        subtitle: subtitle,
      };
    },
  },
});
