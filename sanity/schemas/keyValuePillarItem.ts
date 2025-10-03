import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

export default defineType({
  name: "keyValuePillarItem",
  title: "Key Value Pillar Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main heading for this pillar",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 48, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(48)
          .error('Title must be 48 characters or less'),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of this value pillar",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 90 }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(90)
          .error('Description must be 90 characters or less'),
    }),
    createImageField({
      name: "icon",
      title: "Icon",
      description: `SVG icon for this pillar (preferably 28x28px). ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this pillar should appear (1-4, lower numbers first)",
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Whether this pillar should be displayed",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      order: "order",
      media: "icon",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, order, media, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${order}. ${title}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
