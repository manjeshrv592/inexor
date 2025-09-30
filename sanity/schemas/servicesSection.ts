import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "servicesSection",
  title: "Services Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      initialValue: "OUR SERVICES",
      validation: (Rule) => 
        Rule.required()
          .max(25)
          .error('Section title must be 25 characters or less'),
      description: "Main title displayed at the top of the services section",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one services section should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title}`,
        subtitle: "Services Section",
      };
    },
  },
});
