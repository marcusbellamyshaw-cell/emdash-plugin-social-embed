import { APIRoute } from "astro";

//#region src/astro/routes/api/content/[collection]/[id]/terms/[taxonomy].d.ts
declare const prerender = false;
/**
 * Get terms assigned to an entry
 */
declare const GET: APIRoute;
/**
 * Set terms for an entry (replaces existing)
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=_taxonomy_.d.mts.map