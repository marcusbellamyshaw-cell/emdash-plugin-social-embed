//#region src/astro/routes/api/import/wordpress/rewrite-url-helpers.d.ts
/**
 * Strip query parameters from a URL for base matching
 */
declare function getBaseUrl(url: string): string;
/**
 * Build a map of base URLs to new URLs for flexible matching
 */
declare function buildBaseUrlMap(urlMap: Record<string, string>): Map<string, string>;
/**
 * Extract the URL to match from a stored media field value.
 *
 * Image/file columns hold a JSON-stringified MediaValue
 * (e.g. `{"provider":"external","id":"","src":"https://.../hero.jpg"}`), but legacy
 * rows may hold a bare URL string. Returns the inner `src` for a MediaValue, otherwise
 * the value unchanged. Without this, the whole JSON blob is passed to findMatchingUrl()
 * and the embedded URL is never matched.
 */
declare function extractMediaUrl(value: string): string;
/**
 * Find matching new URL for a given URL, checking exact, base, and WordPress image-size matches
 */
declare function findMatchingUrl(url: string, exactMap: Record<string, string>, baseMap: Map<string, string>): string | null;
/**
 * Portable Text block type (simplified for URL rewriting)
 */
interface PortableTextBlock {
  _type: string;
  _key?: string;
  asset?: {
    _type?: string;
    _ref?: string;
    url?: string;
  };
  link?: string;
  images?: PortableTextBlock[];
  columns?: Array<{
    content?: PortableTextBlock[];
  }>;
  [key: string]: unknown;
}
/**
 * Rewrite URLs in a Portable Text array, returning whether any changes were made
 */
declare function rewritePortableTextUrls(blocks: PortableTextBlock[], exactMap: Record<string, string>, baseMap: Map<string, string>): {
  changed: boolean;
  urlsRewritten: number;
};
/**
 * Rewrite URLs in a string field using simple string replacement
 */
declare function rewriteStringUrls(value: string, exactMap: Record<string, string>, baseMap: Map<string, string>): {
  newValue: string;
  changed: boolean;
  urlsRewritten: number;
};
//#endregion
export { PortableTextBlock, buildBaseUrlMap, extractMediaUrl, findMatchingUrl, getBaseUrl, rewritePortableTextUrls, rewriteStringUrls };
//# sourceMappingURL=rewrite-url-helpers.d.mts.map