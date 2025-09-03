import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Main title for the testimonials section",
      initialValue: "WHAT OUR CLIENTS SAY",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
      description: "Subtitle/description for the testimonials section",
      initialValue: "Hear From Those Who Trust Us",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "autoplayDuration",
      title: "Autoplay Duration (seconds)",
      type: "number",
      description:
        "How long to show each testimonial before auto-advancing (0 to disable)",
      initialValue: 5,
      validation: (Rule) => Rule.min(0).max(30),
    }),
    defineField({
      name: "enableAutoplay",
      title: "Enable Autoplay",
      type: "boolean",
      description: "Should testimonials automatically cycle?",
      initialValue: true,
    }),
    defineField({
      name: "testimonials",
      title: "Featured Testimonials",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
      description:
        "Select testimonials to display (order matters). Leave empty to show all active testimonials.",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Should this testimonials section be displayed?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      const status = isActive ? "🟠" : "⚪";
      return {
        title: `${status} ${title}`,
        subtitle,
      };
    },
  },
});
