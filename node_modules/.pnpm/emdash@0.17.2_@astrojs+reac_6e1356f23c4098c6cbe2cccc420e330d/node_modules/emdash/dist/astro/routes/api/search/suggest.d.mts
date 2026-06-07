import { APIRoute } from "astro";

//#region src/astro/routes/api/search/suggest.d.ts
declare const prerender = false;
/**
 * Get search suggestions for autocomplete
 *
 * Query parameters:
 * - q: Partial search query (required)
 * - collections: Comma-separated list of collection slugs (optional)
 * - limit: Maximum suggestions (optional, defaults to 5)
 */
declare const GET: APIRoute;
//#endregion
export { GET, prerender };
//# sourceMappingURL=suggest.d.mts.map