import { APIRoute } from "astro";

//#region src/astro/routes/api/admin/oauth-clients/index.d.ts
declare const prerender = false;
/**
 * List all registered OAuth clients.
 */
declare const GET: APIRoute;
/**
 * Register a new OAuth client.
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map