import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageTextBlock",
  title: "Image & Text Side by Side",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
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
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional caption for the image",
        },
        {
          name: "isGrayscale",
          type: "boolean",
          title: "Grayscale",
          description: "Apply grayscale filter to this image",
          initialValue: true, // Default to grayscale to match your site's style
        },
      ],
      validation: (Rule) => 
        Rule.required()
          .custom((image) => {
            if (!image?.asset) {
              return 'Please upload an image before saving this block';
            }
            return true;
          })
          .error('Image is required for Image & Text blocks'),
    }),
    defineField({
      name: "text",
      title: "Text Content",
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Image Left, Text Right", value: "imageLeft" },
          { title: "Text Left, Image Right", value: "textLeft" },
        ],
        layout: "radio", // Shows as radio buttons for better UX
      },
      initialValue: "imageLeft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verticalAlignment",
      title: "Vertical Alignment",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Center", value: "center" },
          { title: "Bottom", value: "bottom" },
        ],
        layout: "radio",
      },
      initialValue: "center",
      description: "How to align content vertically when heights differ",
    }),
  ],
  preview: {
    select: {
      title: "text.0.children.0.text",
      subtitle: "layout",
      media: "image",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const layoutText = subtitle === "imageLeft" ? "Image Left" : "Text Left";
      
      return {
        title: title ? `${title.substring(0, 50)}${title.length > 50 ? "..." : ""}` : "Image & Text Block",
        subtitle: `Layout: ${layoutText}`,
        media,
      };
    },
  },
});
