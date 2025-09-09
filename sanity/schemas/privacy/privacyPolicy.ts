import { defineField, defineType } from "sanity";

export default defineType({
  name: "privacyPolicyPage",
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
      description: "Main title displayed on the Privacy Policy page",
      validation: (Rule) => Rule.required(),
      initialValue: "Privacy Policy",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "string",
      description: "Subtitle displayed below the main title",
      initialValue: "Your privacy is important to us",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one Privacy Policy page should be active at a time",
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
