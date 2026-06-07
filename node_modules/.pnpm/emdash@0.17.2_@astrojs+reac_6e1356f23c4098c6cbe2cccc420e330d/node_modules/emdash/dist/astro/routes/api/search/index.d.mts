import { APIRoute } from "astro";

//#region src/astro/routes/api/search/index.d.ts
declare const prerender = false;
/**
 * Search content
 *
 * Query parameters:
 * - q: Search query (required)
 * - collections: Comma-separated list of collection slugs (optional, defaults to all)
 * - status: Filter by status (optional, defaults to 'published')
 * - limit: Maximum results (optional, defaults to 20)
 */
declare const GET: APIRoute;
//#endregion
export { GET, prerender };
//# sourceMappingURL=index.d.mts.map