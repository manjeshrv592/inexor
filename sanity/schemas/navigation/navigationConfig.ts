import { defineField, defineType } from "sanity";
import { StringInputProps } from "sanity";
import TextWithCounter from "../../components/TextWithCounter";

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
          components: {
            input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 12, fieldType: 'string' }),
          },
          validation: (Rule) => 
            Rule.required()
              .max(12)
              .error('Resources label must be 12 characters or less'),
          description: "Display text for Resources navigation item (12 characters max)",
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
          components: {
            input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 12, fieldType: 'string' }),
          },
          validation: (Rule) => 
            Rule.required()
              .max(12)
              .error('Services label must be 12 characters or less'),
          description: "Display text for Services navigation item (12 characters max)",
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
          components: {
            input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 12, fieldType: 'string' }),
          },
          validation: (Rule) => 
            Rule.required()
              .max(12)
              .error('About Us label must be 12 characters or less'),
          description: "Display text for About Us navigation item (12 characters max)",
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
          components: {
            input: (props: StringInputProps) => TextWithCounter({ ...props, maxLength: 12, fieldType: 'string' }),
          },
          validation: (Rule) => 
            Rule.required()
              .max(12)
              .error('FAQ label must be 12 characters or less'),
          description: "Display text for FAQ's navigation item (12 characters max)",
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
