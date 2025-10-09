import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

export default defineType({
  name: "resourcesPage",
  title: "Resources Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "blogSectionTitle",
      title: "Blog List Title",
      type: "string",
      components: {
        input: (props) =>
          TextWithCounter({ ...props, maxLength: 20, fieldType: "string" }),
      },
      description: "Title for the blog list (20 characters max)",
      initialValue: "LATEST BLOGS",
      validation: (Rule) => 
        Rule.required()
          .max(20)
          .error('Blog list title must be 20 characters or less'),
    }),
    defineField({
      name: "defaultBlogImage",
      title: "Default Blog Image",
      type: "image",
      description:
        "Default image to use for blog posts without featured images",
      options: {
        hotspot: true,
      },
    }),
    createImageField({
      name: "leftPanelBackgroundImage",
      title: "Left Panel Background Image",
      description: `Background image for the left panel with the 'Blogs' button. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: false,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: false,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Resources page should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "blogSectionTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Resources Page Settings"}`,
        subtitle: "Resources page content settings",
      };
    },
  },
});
