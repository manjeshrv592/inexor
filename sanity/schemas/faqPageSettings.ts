import { defineType } from "sanity";
import { createImageField, IMAGE_UPLOAD_HELP_TEXT } from "../lib/imageConfig";

export default defineType({
  name: "faqPageSettings",
  title: "FAQ Page Settings",
  type: "document",
  fields: [
    createImageField({
      name: "sidebarImage",
      title: "Sidebar Image",
      description: `Image displayed in the left sidebar on desktop. ${IMAGE_UPLOAD_HELP_TEXT}`,
      required: false,
      hotspot: true,
      includeAlt: true,
      includeCaption: false,
      includeGrayscale: true,
      grayscaleDefault: true,
    }),
  ],
  preview: {
    select: {
      media: "sidebarImage",
    },
    prepare(selection) {
      const { media } = selection;
      return {
        title: "FAQ Page Settings",
        subtitle: "Sidebar image configuration",
        media: media,
      };
    },
  },
});
