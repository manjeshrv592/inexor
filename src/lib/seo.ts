/**
 * Single source of truth for the site's public origin and canonical URLs.
 *
 * Every page's `alternates.canonical` and the sitemap both resolve through
 * here, so the origin can never drift between them the way it did when each
 * page interpolated `process.env.NEXT_PUBLIC_SITE_URL` on its own.
 */

const FALLBACK_ORIGIN = "https://inexor.io";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return FALLBACK_ORIGIN;

  // Strip any trailing slash so callers can always append "/path" safely.
  const normalized = raw.replace(/\/+$/, "");

  // A localhost origin baked into a production build would publish a sitemap
  // and canonicals full of unreachable URLs — the single worst SEO failure
  // this file can cause. Refuse it rather than shipping it silently.
  if (
    process.env.NODE_ENV === "production" &&
    /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(normalized)
  ) {
    console.error(
      `[seo] NEXT_PUBLIC_SITE_URL is "${normalized}" in a production build. ` +
        `Falling back to ${FALLBACK_ORIGIN}. Set NEXT_PUBLIC_SITE_URL to the real origin.`,
    );
    return FALLBACK_ORIGIN;
  }

  return normalized;
}

/** Public origin, no trailing slash. e.g. "https://inexor.io" */
export const SITE_URL = resolveSiteUrl();

/** Origin as a URL, for Next's `metadataBase`. */
export const METADATA_BASE = new URL(SITE_URL);

/**
 * Absolute URL for a route. Pass a leading-slash path ("/about") or "/" for
 * the homepage. The homepage keeps its trailing slash because that is the
 * form Google has indexed.
 */
export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Canonical metadata fragment for a page. Spread into a `Metadata` object:
 *
 *   export const metadata = { ...canonical("/about"), title: "About" }
 */
export function canonical(path = "/") {
  return { alternates: { canonical: absoluteUrl(path) } } as const;
}
