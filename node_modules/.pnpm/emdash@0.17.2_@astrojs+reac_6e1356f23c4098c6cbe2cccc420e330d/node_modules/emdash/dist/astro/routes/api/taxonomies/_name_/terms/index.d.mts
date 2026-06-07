import { APIRoute } from "astro";

//#region src/astro/routes/api/taxonomies/[name]/terms/index.d.ts
declare const prerender = false;
/**
 * List all terms for a taxonomy
 */
declare const GET: APIRoute;
/**
 * Create a new term
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map