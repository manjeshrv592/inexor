import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

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
    defineField({
      name: "leftPanelBackgroundImage",
      title: "Left Panel Background Image",
      type: "image",
      description:
        "Background image for the left panel with the 'Blogs' button",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
        },
      ],
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
