import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short description for blog listing",
      rows: 3,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
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
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Author Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "image",
          title: "Author Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
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
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      initialValue: 5,
    }),
    defineField({
      name: "isActive",
      title: "Is Published",
      type: "boolean",
      description: "Only published posts will be displayed",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      description: "Featured posts appear first in listings",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Custom order (lower numbers appear first)",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedDateAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      publishedAt: "publishedAt",
      isActive: "isActive",
      isFeatured: "isFeatured",
      media: "featuredImage",
    },
    prepare(selection) {
      const { title, author, publishedAt, isActive, isFeatured, media } =
        selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "No date";

      return {
        title: `${isActive ? "🟢" : "🔴"}${isFeatured ? "⭐" : ""} ${title}`,
        subtitle: `${author} • ${date}`,
        media,
      };
    },
  },
});
