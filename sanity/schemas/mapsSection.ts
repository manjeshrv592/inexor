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
        input: (props) => TextWithCounter({ ...props, maxLength: 100, fieldType: 'string' }),
      },
      initialValue: "GO GLOBAL. INSTANTLY.",
      validation: (Rule) => Rule.required().max(100),
      description: "Main title displayed at the top of the maps section",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      initialValue: "Reach Over 120 Markets With Zero Compliance Issues",
      hidden: true,
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
      isActive: "isActive",
      countries: "countries",
    },
    prepare(selection) {
      const { title, description, isActive, countries } = selection;
      const countryCount = countries ? countries.length : 0;

      return {
        title: `${isActive ? "🟢" : "🔴"} ${title}`,
        subtitle: `${countryCount} countries configured | ${description || "No description"}`,
      };
    },
  },
});
