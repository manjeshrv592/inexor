import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      description:
        "Full service title (e.g., 'Reliable Importer of Record Services for Global Business')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Service Code",
      type: "string",
      description: "Short service code (e.g., 'IOR', 'EOR', 'VAT', 'DDP')",
      validation: (Rule) => Rule.required().max(5),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "code",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Service Subtitle",
      type: "string",
      description:
        "Subtitle displayed above the main title (e.g., 'IMPORTOR OF RECORDS')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short description for service listing",
      rows: 3,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      description:
        "Main image for the service (fallback will be /img/left-image.jpg)",
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
      name: "content",
      title: "Service Content",
      type: "array",
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
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "useCases",
      title: "Use Cases",
      type: "serviceUseCasesSection",
      description:
        "Shown at the end of the service content. Image on the right (fallback used if empty).",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which services appear (lower numbers first)",
      validation: (Rule) => Rule.required().integer().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only active services will be displayed",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Service Code A-Z",
      name: "codeAsc",
      by: [{ field: "code", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "code",
      subtitle: "title",
      order: "order",
      isActive: "isActive",
      media: "featuredImage",
    },
    prepare({ title, subtitle, order, isActive, media }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} ${isActive ? "✅" : "❌"}`,
        media,
      };
    },
  },
});
