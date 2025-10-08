import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

export default defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(25)
          .error('Title must be 25 characters or less'),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 55, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(55)
          .error('Subtitle must be 55 characters or less'),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 350 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(350)
          .error('Description must be 350 characters or less'),
    }),
    createImageField({
      name: "leftImage",
      title: "Left Image",
      description: `Left animated panel image for About section. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: true,
      grayscaleDefault: true,
    }),
    createImageField({
      name: "rightImage",
      title: "Right Image", 
      description: `Right animated panel image for About section. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: true,
      grayscaleDefault: true,
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
