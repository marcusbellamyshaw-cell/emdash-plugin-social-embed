import { APIRoute } from "astro";

//#region src/astro/routes/api/admin/allowed-domains/index.d.ts
declare const prerender = false;
/**
 * GET - List all allowed domains
 */
declare const GET: APIRoute;
/**
 * POST - Add a new allowed domain
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map