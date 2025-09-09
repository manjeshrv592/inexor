import { defineField, defineType } from "sanity";

export default defineType({
  name: "contentSection",
  title: "Content Section",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      description: "Optional section heading",
    }),
    defineField({
      name: "titleStyle",
      title: "Title Style",
      type: "string",
      options: {
        list: [
          { title: "Orange (Brand Color)", value: "orange" },
          { title: "White", value: "white" },
        ],
        layout: "radio",
      },
      initialValue: "white",
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
            ],
            annotations: [
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
  ],
  preview: {
    select: {
      title: "sectionTitle",
      content: "content",
    },
    prepare(selection) {
      const { title, content } = selection;
      const block = (content || []).find(
        (block: any) => block._type === "block",
      );
      const textContent =
        block?.children
          ?.filter((child: any) => child._type === "span")
          ?.map((span: any) => span.text)
          ?.join("") || "";

      return {
        title: title || "Content Section",
        subtitle:
          textContent.slice(0, 100) + (textContent.length > 100 ? "..." : ""),
      };
    },
  },
});
