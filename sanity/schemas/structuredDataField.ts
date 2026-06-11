import { defineField } from "sanity";

/**
 * Reusable "Structured Data" field — an array of JSON-LD snippets.
 * Drop this into any page/document schema to let editors manage that
 * page's schema markup:
 *
 *   import { structuredDataField } from "./structuredDataField";
 *   fields: [ ...otherFields, structuredDataField() ]
 */
export const structuredDataField = () =>
  defineField({
    name: "structuredData",
    title: "Structured Data (Schema snippets)",
    type: "array",
    of: [{ type: "jsonLdSnippet" }],
    description:
      "Add one or more schema / JSON-LD snippets for this page. Each one is rendered into the page for search engines (Google etc.).",
  });
