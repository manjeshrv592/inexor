import { defineType } from "sanity";
import { createClientLogoField, CLIENT_LOGO_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

const clientLogoSchema = defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "object",
  fields: [
    createClientLogoField({
      name: "logo",
      title: "Logo",
      description: `Client logo image. Recommended size: 240x120px (2x for retina). ${CLIENT_LOGO_UPLOAD_HELP_TEXT}`,
      required: true,
      hotspot: false,
      includeAlt: false,
      includeCaption: false,
      includeGrayscale: false,
    }),
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      description:
        'Brief description of the logo for accessibility (e.g., "IBM Logo")',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "alt",
      media: "logo",
    },
  },
});

export default clientLogoSchema;
