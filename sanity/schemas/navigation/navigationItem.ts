import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "document",
  icon: () => "🔗",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "The text displayed for this navigation item",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      description: "The URL this navigation item links to (e.g., /about, /services)",
      validation: (Rule) => Rule.required().regex(/^\/[a-z0-9-]*$/, {
        name: "url",
        invert: false,
      }).error("URL must start with / and contain only lowercase letters, numbers, and hyphens"),
    }),
    defineField({
      name: "hasDropdown",
      title: "Has Dropdown",
      type: "boolean",
      description: "Whether this navigation item has a dropdown menu",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this item appears in the navigation (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Whether this navigation item is currently active/visible",
      initialValue: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description for admin reference",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
      order: "order",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, order, isActive } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} ${isActive ? "✅" : "❌"}`,
      };
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Active Status",
      name: "activeFirst",
      by: [
        { field: "isActive", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
