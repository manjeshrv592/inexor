import { defineField, defineType } from "sanity";
import PercentageInput from "../components/PercentageInput";

export default defineType({
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    // Hidden internal fields - not shown to user
    defineField({
      name: "name",
      title: "Country Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),
    defineField({
      name: "code",
      title: "Country Code",
      type: "string",
      validation: (Rule) => Rule.required().length(2),
      hidden: true,
    }),
    defineField({
      name: "flag",
      title: "Flag Path",
      type: "string",
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      hidden: true,
      fields: [
        defineField({
          name: "lat",
          title: "Latitude",
          type: "number",
        }),
        defineField({
          name: "lng",
          title: "Longitude",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "bounds",
      title: "Geographic Bounds",
      type: "object",
      hidden: true,
      fields: [
        defineField({
          name: "north",
          title: "North",
          type: "number",
        }),
        defineField({
          name: "south",
          title: "South",
          type: "number",
        }),
        defineField({
          name: "east",
          title: "East",
          type: "number",
        }),
        defineField({
          name: "west",
          title: "West",
          type: "number",
        }),
      ],
    }),

    // User-facing fields - only these are shown
    defineField({
      name: "isActive",
      title: "Service Available",
      type: "boolean",
      description: "Enable service for this country",
      initialValue: false,
    }),
    defineField({
      name: "tax",
      title: "Tax (%)",
      type: "string",
      description: "Enter tax percentage (% will be added automatically)",
      components: {
        input: PercentageInput,
      },
      hidden: ({ document }) => !document?.isActive,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isActive = context.document?.isActive;
          if (isActive && !value) {
            return "Tax is required when service is active";
          }
          return true;
        }),
    }),
    defineField({
      name: "duties",
      title: "Duties (%)",
      type: "string",
      description: "Enter duties percentage (% will be added automatically)",
      components: {
        input: PercentageInput,
      },
      hidden: ({ document }) => !document?.isActive,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isActive = context.document?.isActive;
          if (isActive && !value) {
            return "Duties is required when service is active";
          }
          return true;
        }),
    }),
    defineField({
      name: "leadTime",
      title: "ELT (Estimated Lead Time)",
      type: "object",
      description: "Estimated lead time with duration and unit",
      hidden: ({ document }) => !document?.isActive,
      fields: [
        defineField({
          name: "duration",
          title: "Duration",
          type: "number",
          description: "Enter the duration number",
          validation: (Rule) => Rule.required().positive().integer(),
        }),
        defineField({
          name: "unit",
          title: "Unit",
          type: "string",
          description: "Select the time unit",
          options: {
            list: [
              { title: "Hours", value: "hours" },
              { title: "Days", value: "days" },
              { title: "Weeks", value: "weeks" },
            ],
            layout: "radio",
          },
          validation: (Rule) => Rule.required(),
          initialValue: "days",
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isActive = context.document?.isActive;
          if (isActive && (!value || !value.duration || !value.unit)) {
            return "ELT duration and unit are required when service is active";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      code: "code",
      flag: "flag",
      isActive: "isActive",
      tax: "tax",
      duties: "duties",
      leadTime: "leadTime",
    },
    prepare(selection) {
      const { title, code, isActive, tax, duties, leadTime } = selection;
      
      // Format leadTime display with uppercase unit
      const leadTimeDisplay = leadTime && leadTime.duration && leadTime.unit
        ? `${leadTime.duration} ${leadTime.unit.charAt(0).toUpperCase() + leadTime.unit.slice(1)}`
        : "N/A";

      return {
        title: `${isActive ? "🟠" : "⚪"} ${title} (${code})`,
        subtitle: isActive
          ? `Tax: ${tax || "N/A"} | Duties: ${duties || "N/A"} | ELT: ${leadTimeDisplay}`
          : "Service not available",
      };
    },
  },
  orderings: [
    {
      title: "Active Countries First",
      name: "activeFirst",
      by: [
        { field: "isActive", direction: "desc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Country Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Country Code A-Z",
      name: "codeAsc",
      by: [{ field: "code", direction: "asc" }],
    },
  ],
});
