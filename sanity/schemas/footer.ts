import { defineField, defineType } from "sanity";
import TextWithCounter from "../components/TextWithCounter";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

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
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 50, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(50)
          .error('Main heading must be 50 characters or less'),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description:
        "Copyright notice text (e.g., '© 2025 INEXOR, All right reserved')",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 70, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(70)
          .error('Copyright text must be 70 characters or less'),
    }),
    createImageField({
      name: "logo",
      title: "Footer Logo",
      description: `Company logo for the footer. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: false,
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      description: "Text for the call-to-action button",
      initialValue: "Schedule a Call",
      components: {
        input: (props) => TextWithCounter({ ...props, maxLength: 15, fieldType: 'string' }),
      },
      validation: (Rule) => 
        Rule.required()
          .max(15)
          .error('CTA button text must be 15 characters or less'),
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
