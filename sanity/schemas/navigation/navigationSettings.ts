import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigationSettings",
  title: "Navigation Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      description: "Internal title for these navigation settings",
      initialValue: "Main Navigation Settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "maxItems",
      title: "Maximum Navigation Items",
      type: "number",
      description: "Maximum number of navigation items to display",
      initialValue: 6,
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: "showOnMobile",
      title: "Show on Mobile",
      type: "boolean",
      description: "Whether navigation should be visible on mobile devices",
      initialValue: true,
    }),
    defineField({
      name: "animationEnabled",
      title: "Enable Animations",
      type: "boolean",
      description: "Whether to enable navigation animations",
      initialValue: true,
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      description: "When these settings were last modified",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "notes",
      title: "Admin Notes",
      type: "text",
      description: "Internal notes about navigation configuration",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      maxItems: "maxItems",
      showOnMobile: "showOnMobile",
    },
    prepare(selection) {
      const { title, maxItems, showOnMobile } = selection;
      return {
        title,
        subtitle: `Max Items: ${maxItems} | Mobile: ${showOnMobile ? "✅" : "❌"}`,
      };
    },
  },
});
