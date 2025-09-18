import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigationConfig",
  title: "Navigation Configuration",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "title",
      title: "Configuration Title",
      type: "string",
      initialValue: "Main Navigation Configuration",
      readOnly: true,
      description: "This is the main navigation configuration for the website",
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Resources",
          validation: (Rule) => Rule.required().max(50),
          description: "Display text for Resources navigation item",
        }),
        defineField({
          name: "hasDropdown",
          title: "Has Dropdown",
          type: "boolean",
          initialValue: true,
          description: "Show dropdown chevron for Resources",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          initialValue: "/resources",
          readOnly: true,
          description: "URL is fixed and cannot be changed",
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Services",
          validation: (Rule) => Rule.required().max(50),
          description: "Display text for Services navigation item",
        }),
        defineField({
          name: "hasDropdown",
          title: "Has Dropdown",
          type: "boolean",
          initialValue: true,
          description: "Show dropdown chevron for Services",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          initialValue: "/services",
          readOnly: true,
          description: "URL is fixed and cannot be changed",
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About Us",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "About Us",
          validation: (Rule) => Rule.required().max(50),
          description: "Display text for About Us navigation item",
        }),
        defineField({
          name: "hasDropdown",
          title: "Has Dropdown",
          type: "boolean",
          initialValue: false,
          description: "Show dropdown chevron for About Us",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          initialValue: "/about",
          readOnly: true,
          description: "URL is fixed and cannot be changed",
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ's",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "FAQ's",
          validation: (Rule) => Rule.required().max(50),
          description: "Display text for FAQ's navigation item",
        }),
        defineField({
          name: "hasDropdown",
          title: "Has Dropdown",
          type: "boolean",
          initialValue: false,
          description: "Show dropdown chevron for FAQ's",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          initialValue: "/faq",
          readOnly: true,
          description: "URL is fixed and cannot be changed",
        }),
      ],
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        subtitle: "Fixed navigation configuration - 4 items",
      };
    },
  },
});
