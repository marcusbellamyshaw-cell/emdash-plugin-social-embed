import { APIRoute } from "astro";

//#region src/astro/routes/api/media/providers/[providerId]/[itemId].d.ts
declare const prerender = false;
/**
 * Get a single media item from a provider
 */
declare const GET: APIRoute;
/**
 * Delete a media item from a provider
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, prerender };
//# sourceMappingURL=_itemId_.d.mts.map