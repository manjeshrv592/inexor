import { defineField, defineType } from "sanity";
import TextWithCounter from "../../components/TextWithCounter";

export default defineType({
  name: "privacyPolicyContent",
  title: "Privacy Policy Content",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Main title displayed on the Privacy Policy page",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 35, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(35)
          .error('Page title must be 35 characters or less'),
      initialValue: "Privacy Policy",
    }),
    defineField({
      name: "content",
      title: "Privacy Policy Content",
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
      description: "Rich text content for the privacy policy",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      description: "When this privacy policy was last updated",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Privacy Policy content should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      pageTitle: "pageTitle",
      isActive: "isActive",
      lastUpdated: "lastUpdated",
    },
    prepare(selection) {
      const { pageTitle, isActive, lastUpdated } = selection;
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "";
      return {
        title: `${isActive ? "🟢" : "🔴"} ${pageTitle || "Privacy Policy Content"}`,
        subtitle: `${date ? `Updated: ${date}` : "No update date"}`,
      };
    },
  },
});
