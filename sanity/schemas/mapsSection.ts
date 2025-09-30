import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";

export default defineType({
  name: "mapsSection",
  title: "Maps Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 25, fieldType: 'string' }),
      },
      initialValue: "GO GLOBAL. INSTANTLY.",
      validation: (Rule) => 
        Rule.required()
          .max(25)
          .error('Section title must be 25 characters or less'),
      description: "Main title displayed at the top of the maps section",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 55, fieldType: 'string' }),
      },
      initialValue: "Reach Over 120 Markets With Zero Compliance Issues",
      validation: (Rule) => 
        Rule.max(55)
          .error('Description must be 55 characters or less'),
      description: "Description text displayed below the main title",
    }),
    defineField({
      name: "instructionText",
      title: "Map Instruction Text",
      type: "text",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 135 }),
      },
      initialValue: "Click to interact with the map and select a continent to view service availability for your country",
      validation: (Rule) => 
        Rule.max(135)
          .error('Instruction text must be 135 characters or less'),
      description: "Instruction text shown in the tooltip before user interacts with the map",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Enable/disable this maps section",
    }),
    defineField({
      name: "mapConfig",
      title: "Map Configuration",
      type: "object",
      hidden: true,
      fields: [
        defineField({
          name: "centerLat",
          title: "Map Center Latitude",
          type: "number",
          initialValue: 20,
        }),
        defineField({
          name: "centerLng",
          title: "Map Center Longitude",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "zoomLevel",
          title: "Zoom Level",
          type: "number",
          initialValue: 2,
        }),
      ],
    }),

    // This field is not needed - countries are auto-populated from active countries
    defineField({
      name: "countries",
      title: "Countries",
      type: "array",
      hidden: true,
      of: [
        {
          type: "reference",
          to: [{ type: "country" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      instructionText: "instructionText",
      isActive: "isActive",
      countries: "countries",
    },
    prepare(selection) {
      const { title, description, instructionText, isActive, countries } = selection;
      const countryCount = countries ? countries.length : 0;
      const hasInstructions = instructionText ? "✓" : "✗";

      return {
        title: `${isActive ? "🟢" : "🔴"} ${title}`,
        subtitle: `${countryCount} countries | Instructions: ${hasInstructions} | ${description || "No description"}`,
      };
    },
  },
});
