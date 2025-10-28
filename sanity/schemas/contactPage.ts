import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Us Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Main title displayed on the Contact Us page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      description: "Description text displayed below the page title",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      description: "SEO metadata for the Contact Us page",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Contact Us page should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "pageTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "Contact Us Page"}`,
        subtitle: "Contact Us page configuration",
      };
    },
  },
});
