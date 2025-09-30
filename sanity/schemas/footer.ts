import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      description: "The main call-to-action heading in the footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description:
        "Copyright notice text (e.g., '© 2025 INEXOR, All right reserved')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Footer Logo",
      type: "image",
      description: "Company logo for the footer",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      description: "Text for the call-to-action button",
      initialValue: "Schedule a Call",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "url",
      description: "URL for the call-to-action button",
    }),
    defineField({
      name: "privacyPolicyLink",
      title: "Privacy Policy Link",
      type: "string",
      description: "URL path for Privacy Policy (e.g., '/privacy-policy')",
      initialValue: "/privacy-policy",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "termsConditionsLink",
      title: "Terms & Conditions Link",
      type: "string",
      description:
        "URL path for Terms & Conditions (e.g., '/terms-conditions')",
      initialValue: "/terms-conditions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "facebookLink",
      title: "Facebook Link",
      type: "url",
      description: "Full URL to your Facebook profile",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "twitterLink",
      title: "Twitter/X Link",
      type: "url",
      description: "Full URL to your Twitter/X profile",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "linkedinLink",
      title: "LinkedIn Link",
      type: "url",
      description: "Full URL to your LinkedIn profile",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "instagramLink",
      title: "Instagram Link",
      type: "url",
      description: "Full URL to your Instagram profile",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Only one footer should be active at a time",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "logo",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, media, isActive } = selection;
      return {
        title: `${isActive ? "🟢" : "🔴"} ${title}`,
        media: media,
      };
    },
  },
});
