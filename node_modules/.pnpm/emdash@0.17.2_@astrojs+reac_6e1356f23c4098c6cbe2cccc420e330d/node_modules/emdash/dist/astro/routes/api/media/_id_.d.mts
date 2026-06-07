import { APIRoute } from "astro";

//#region src/astro/routes/api/media/[id].d.ts
declare const prerender = false;
/**
 * Get media item
 */
declare const GET: APIRoute;
/**
 * Update media metadata
 *
 * Authors can edit their own media; editors+ can edit any.
 */
declare const PUT: APIRoute;
/**
 * Delete media item
 *
 * Authors can delete their own media; editors+ can delete any.
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, PUT, prerender };
//# sourceMappingURL=_id_.d.mts.map