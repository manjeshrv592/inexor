import { notFound } from "next/navigation";

/**
 * Scaffolding for per-country IOR pages, pending the Sanity schema and content.
 *
 * Until real content exists this MUST NOT return 200. The previous placeholder
 * answered every possible slug with the same five words, which gave crawlers an
 * unbounded space of near-identical thin pages (/services/ior-country/anything
 * returned 200). A 404 keeps that space closed.
 *
 * When the Sanity content lands: fetch the country by `slug`, render it, and
 * call notFound() only when the lookup misses. Also add the route to
 * src/app/sitemap.ts and re-enable the country links in ServiceContent.tsx.
 */
const IorCountryPage = () => {
  notFound();
};

export default IorCountryPage;
