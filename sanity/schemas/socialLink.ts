import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Social Media Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Social Media Platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Twitter/X", value: "twitter" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Instagram", value: "instagram" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Social Media URL",
      type: "url",
      description: "Full URL to your social media profile",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Whether this social link should be displayed",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      platform: "platform",
      url: "url",
      isActive: "isActive",
    },
    prepare(selection) {
      const { platform, url, isActive } = selection;
      const platformIcons: Record<string, string> = {
        facebook: "📘",
        twitter: "🐦",
        linkedin: "💼",
        instagram: "📷",
        youtube: "📺",
        tiktok: "🎵",
      };

      return {
        title: `${isActive ? "🟢" : "🔴"} ${platformIcons[platform] || "🔗"} ${platform?.charAt(0).toUpperCase() + platform?.slice(1) || "Unknown"}`,
        subtitle: url,
      };
    },
  },
});
