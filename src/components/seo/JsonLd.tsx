import React from "react";

interface Snippet {
  code?: string;
}

// Remove an optional <script type="application/ld+json">...</script> wrapper so
// editors can paste either the full block or just the JSON.
const stripScriptWrapper = (value: string) =>
  value
    .replace(/<script[^>]*>/i, "")
    .replace(/<\/script>/i, "")
    .trim();

// Escape the characters that could let pasted content "break out" of the
// <script> tag and inject runnable HTML/JS. Inside JSON-LD these escapes are
// valid and decode back to the original characters, so search engines still
// read the schema correctly -- but the browser can never see a literal
// </script>, so injection is impossible. (Same approach Next.js uses.)
const escapeForScript = (value: string) =>
  value
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

interface JsonLdProps {
  /** Snippets from Sanity (array of { code }) or plain JSON strings. */
  items?: (Snippet | string)[];
}

/**
 * Renders Sanity-managed JSON-LD structured data into the page, safely.
 * Drop this near the top of any page: <JsonLd items={seo?.structuredData} />
 */
const JsonLd: React.FC<JsonLdProps> = ({ items }) => {
  const snippets = (items ?? [])
    .map((item) => (typeof item === "string" ? item : item?.code ?? ""))
    .map(stripScriptWrapper)
    .filter(Boolean)
    .map(escapeForScript);

  if (snippets.length === 0) return null;

  return (
    <>
      {snippets.map((html, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </>
  );
};

export default JsonLd;
