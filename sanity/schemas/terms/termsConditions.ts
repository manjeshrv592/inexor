import { defineField, defineType } from "sanity";

export default defineType({
  name: "termsConditionsPage",
  title: "🔍 SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Main title displayed on the Terms & Conditions page",
      validation: (Rule) => Rule.required(),
      initialValue: "Terms & Conditions",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "string",
      description: "Subtitle displayed below the main title",
      initialValue: "Please read our terms and conditions carefully",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Terms & Conditions page should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "pageTitle",
      subtitle: "seo.metaTitle",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title || "🔍 SEO Settings"}`,
        subtitle: subtitle || "SEO settings configuration",
      };
    },
  },
});
