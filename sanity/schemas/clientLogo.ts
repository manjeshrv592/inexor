export default {
  name: "clientLogo",
  title: "Client Logo",
  type: "object",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Recommended size: 240x120px (2x for retina). SVG format preferred for best quality.",
      validation: (Rule: any) => Rule.required(),
      options: {
        accept: "image/svg+xml,image/*",
      },
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      description:
        'Brief description of the logo for accessibility (e.g., "IBM Logo")',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "alt",
      media: "logo",
    },
  },
};
