import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSeo",
  title: "Home Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data (Schema snippets)",
      type: "array",
      description:
        "Paste schema / JSON-LD snippets here (the code your SEO provider gives you). You can paste the full <script type=\"application/ld+json\">…</script> block or just the JSON inside it. Add one block per snippet.",
      of: [
        defineField({
          name: "snippet",
          title: "Schema snippet",
          type: "text",
          rows: 10,
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value) return true;
              // Strip an optional <script>…</script> wrapper before validating
              const json = value
                .replace(/<script[^>]*>/i, "")
                .replace(/<\/script>/i, "")
                .trim();
              try {
                JSON.parse(json);
                return true;
              } catch {
                return "This snippet is not valid JSON. Please check for missing commas, quotes or brackets.";
              }
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "seo.metaTitle",
      subtitle: "seo.metaDescription",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Home Page SEO",
        subtitle: subtitle || "Configure home page SEO settings",
      };
    },
  },
});
