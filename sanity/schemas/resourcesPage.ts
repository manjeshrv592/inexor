import { defineField, defineType } from "sanity";

export default defineType({
  name: "resourcesPage",
  title: "Resources Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Main title displayed on the Resources page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      description: "Description text displayed below the page title",
    }),
    defineField({
      name: "blogSectionTitle",
      title: "Blog Section Title",
      type: "string",
      description: "Title for the blog section (e.g., 'LATEST BLOGS')",
      initialValue: "LATEST BLOGS",
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
      title: "pageTitle",
      subtitle: "seo.metaTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Resources Page"}`,
        subtitle: subtitle || "Resources page configuration",
      };
    },
  },
});
