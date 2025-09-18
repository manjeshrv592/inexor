import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "resourcesPage",
  title: "Resources Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "blogSectionTitle",
      title: "Blog Section Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 50, fieldType: 'string' }),
      },
      description: "Title for the blog section (e.g., 'LATEST BLOGS')",
      initialValue: "LATEST BLOGS",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "blogSectionSubtitle",
      title: "Blog Section Subtitle",
      type: "string",
      description: "Subtitle for the blog section",
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
      subtitle: "blogSectionSubtitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Resources Page Settings"}`,
        subtitle: subtitle || "Resources page content settings",
      };
    },
  },
});
