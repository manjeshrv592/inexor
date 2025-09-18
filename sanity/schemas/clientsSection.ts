import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "clientsSection",
  title: "Clients Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 100, fieldType: 'string' }),
      },
      initialValue: "TRUSTED BY 40+ INDUSTRY LEADERS",
      validation: (Rule) => Rule.required().max(100),
      description: "Main title displayed above the client logos",
    }),
    defineField({
      name: "logos",
      title: "Client Logos",
      type: "array",
      description:
        "Add client logos that will be displayed in the moving carousel",
      of: [{ type: "clientLogo" }],
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .warning(
            "It's recommended to have at least 4 logos for the carousel to look good",
          ),
    }),
  ],
  preview: {
    select: {
      title: "title",
      logos: "logos",
    },
    prepare(selection) {
      const { title, logos } = selection;
      const logoCount = logos ? logos.length : 0;
      return {
        title: title || "Clients Section",
        subtitle: `${logoCount} client logos`,
      };
    },
  },
});
