import { APIRoute } from "astro";

//#region src/astro/routes/api/search/rebuild.d.ts
declare const prerender = false;
/**
 * Rebuild the search index for a collection
 *
 * Body:
 * - collection: Collection slug to rebuild (required)
 */
declare const POST: APIRoute;
//#endregion
export { POST, prerender };
//# sourceMappingURL=rebuild.d.mts.map