import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
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
      name: "sidebarImage",
      title: "Sidebar Image",
      type: "image",
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
        {
          name: "isGrayscale",
          type: "boolean",
          title: "Grayscale",
          description: "Apply grayscale filter to this image",
          initialValue: true, // Default to grayscale to match your site's style
        },
      ],
      description: "Image displayed in the sidebar of the About Us page",
    }),
    defineField({
      name: "content",
      title: "Page Content",
      type: "array",
      description: "Rich content for the About Us page - add text, images, and process steps",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                  },
                ],
              },
              {
                name: "brandOrange",
                type: "object",
                title: "Brand Orange",
                fields: [
                  {
                    name: "note",
                    type: "string",
                    title: "Note",
                    description: "This will style text in brand orange color",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "isGrayscale",
              type: "boolean",
              title: "Grayscale",
              description: "Apply grayscale filter to this image",
              initialValue: true, // Default to grayscale to match your site's style
            },
          ],
        },
        {
          type: "imageTextBlock",
        },
        {
          type: "processStepsBlock",
        },
      ],
      validation: (Rule) => Rule.required(),
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
      subtitle: "pageSubtitle",
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
