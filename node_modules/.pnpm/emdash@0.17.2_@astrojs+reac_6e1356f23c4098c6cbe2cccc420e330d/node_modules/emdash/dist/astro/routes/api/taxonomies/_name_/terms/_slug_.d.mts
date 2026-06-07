import { APIRoute } from "astro";

//#region src/astro/routes/api/taxonomies/[name]/terms/[slug].d.ts
declare const prerender = false;
/**
 * Get a single term
 */
declare const GET: APIRoute;
/**
 * Update a term
 */
declare const PUT: APIRoute;
/**
 * Delete a term
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, PUT, prerender };
//# sourceMappingURL=_slug_.d.mts.map