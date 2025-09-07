import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Us Page",
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
      description:
        "Main title displayed on the About Us page (e.g., 'About Inexor')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "string",
      description:
        "Subtitle displayed below the main title (e.g., 'Your Global Trade Compliance Partner')",
    }),
    defineField({
      name: "processSection",
      title: "Process Section",
      type: "object",
      description: "The section explaining your clear process",
      fields: [
        defineField({
          name: "title",
          title: "Process Title",
          type: "string",
          initialValue: "We follow a clear process to help you out.",
        }),
        defineField({
          name: "description",
          title: "Process Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          initialValue: "Contact Us",
        }),
        defineField({
          name: "steps",
          title: "Process Steps",
          type: "array",
          of: [{ type: "processStep" }],
          validation: (Rule) => Rule.max(5),
        }),
      ],
    }),
    defineField({
      name: "contentSections",
      title: "Content Sections",
      type: "array",
      description:
        "Main content sections (Who We Are, What We Do, Our Values, etc.)",
      of: [{ type: "contentSection" }],
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one About Us page should be active at a time",
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
        title: `${isActive ? "🟢" : "🔴"} ${title || "About Us Page"}`,
        subtitle: subtitle || "About Us page configuration",
      };
    },
  },
});
