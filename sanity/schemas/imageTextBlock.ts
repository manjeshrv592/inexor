import { defineField, defineType } from "sanity";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

export default defineType({
  name: "imageTextBlock",
  title: "Image & Text Side by Side",
  type: "object",
  fields: [
    createImageField({
      name: "image",
      title: "Image",
      description: `Image for side-by-side layout. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: true,
      includeAlt: true,
      includeCaption: true,
      includeGrayscale: true,
      grayscaleDefault: true,
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
                  {
                    name: "color",
                    type: "string",
                    title: "Link Color",
                    options: {
                      list: [
                        { title: "Brand Orange", value: "brandOrange" },
                        { title: "Sky Blue", value: "skyBlue" },
                      ],
                      layout: "radio",
                    },
                    initialValue: "brandOrange",
                    description: "Choose the color for this link",
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
              {
                name: "skyBlue",
                type: "object",
                title: "Sky Blue",
                fields: [
                  {
                    name: "note",
                    type: "string",
                    title: "Note",
                    description: "This will style text in sky blue color",
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
        title: title
          ? `${title.substring(0, 50)}${title.length > 50 ? "..." : ""}`
          : "Image & Text Block",
        subtitle: `Layout: ${layoutText}`,
        media,
      };
    },
  },
});
