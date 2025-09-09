import { defineField, defineType } from "sanity";

export default defineType({
  name: "termsConditionsContent",
  title: "Terms & Conditions Content",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Terms & Conditions Content",
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
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
      description: "Rich text content for the terms and conditions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      description: "When these terms and conditions were last updated",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Terms & Conditions content should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      isActive: "isActive",
      lastUpdated: "lastUpdated",
    },
    prepare(selection) {
      const { isActive, lastUpdated } = selection;
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "";
      return {
        title: `${isActive ? "🟢" : "🔴"} Terms & Conditions Content`,
        subtitle: `${date ? `Updated: ${date}` : "No update date"}`,
      };
    },
  },
});
