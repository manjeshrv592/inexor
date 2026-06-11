import { defineField, defineType } from "sanity";

// Removes an optional <script type="application/ld+json">…</script> wrapper so
// editors can paste either the full snippet or just the JSON inside it.
// Anchored to the start/end so a </script> inside the JSON content is kept.
const stripScriptWrapper = (value: string) =>
  value
    .trim()
    .replace(/^<script[^>]*>/i, "")
    .replace(/<\/script>\s*$/i, "")
    .trim();

export default defineType({
  name: "jsonLdSnippet",
  title: "Schema snippet",
  type: "object",
  fields: [
    defineField({
      name: "code",
      title: "JSON-LD code",
      type: "text",
      rows: 12,
      description:
        'Paste the schema snippet your SEO provider gives you. You can paste the full <script type="application/ld+json">…</script> block or just the JSON inside it. One snippet per item.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return "Snippet is empty.";
          const json = stripScriptWrapper(value);
          try {
            JSON.parse(json);
            return true;
          } catch {
            return "This snippet is not valid JSON. Check for missing commas, quotes, brackets, or line breaks inside text.";
          }
        }),
    }),
  ],
  preview: {
    select: { code: "code" },
    prepare({ code }) {
      let title = "Schema snippet";
      let subtitle = "Invalid or empty JSON";
      try {
        const parsed = JSON.parse(stripScriptWrapper(code || ""));
        const type = parsed["@type"];
        const name = parsed.name;
        title = [type, name].filter(Boolean).join(" — ") || title;
        subtitle = "Valid JSON-LD";
      } catch {
        // keep defaults — validation will show the error on the field
      }
      return { title, subtitle };
    },
  },
});
