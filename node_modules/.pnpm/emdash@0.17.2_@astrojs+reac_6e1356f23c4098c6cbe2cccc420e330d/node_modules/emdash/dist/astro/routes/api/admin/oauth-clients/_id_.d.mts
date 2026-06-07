import { APIRoute } from "astro";

//#region src/astro/routes/api/admin/oauth-clients/[id].d.ts
declare const prerender = false;
/**
 * Get a single OAuth client.
 */
declare const GET: APIRoute;
/**
 * Update an OAuth client.
 */
declare const PUT: APIRoute;
/**
 * Delete an OAuth client.
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, PUT, prerender };
//# sourceMappingURL=_id_.d.mts.map