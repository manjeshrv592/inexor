import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

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
      name: "scheduleCallButtonText",
      title: "Schedule Call Button Text",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 30, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(30)
          .error('Schedule call button text must be 30 characters or less'),
      initialValue: "Schedule a Call",
    }),
    defineField({
      name: "contactButtonText",
      title: "Contact Button Text",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 30, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(30)
          .error('Contact button text must be 30 characters or less'),
      initialValue: "Contact Us",
    }),
    createImageField({
      name: "backgroundImage",
      title: "Background Image",
      description: `Hero section background image. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: true,
      includeAlt: false,
      includeCaption: false,
      includeGrayscale: false,
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
