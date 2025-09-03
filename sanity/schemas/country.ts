import { defineField, defineType } from "sanity";

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
      title: "Tax",
      type: "string",
      description: "Tax percentage (e.g., 5%)",
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
      title: "Duties",
      type: "string",
      description: "Duties percentage (e.g., 12%)",
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
      title: "Lead Time",
      type: "string",
      description: "Lead time (e.g., 12H, 2-3 days)",
      hidden: ({ document }) => !document?.isActive,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isActive = context.document?.isActive;
          if (isActive && !value) {
            return "Lead time is required when service is active";
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
      const { title, code, flag, isActive, tax, duties, leadTime } = selection;

      return {
        title: `${isActive ? "🟠" : "⚪"} ${title} (${code})`,
        subtitle: isActive
          ? `Tax: ${tax || "N/A"} | Duties: ${duties || "N/A"} | Lead: ${leadTime || "N/A"}`
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
