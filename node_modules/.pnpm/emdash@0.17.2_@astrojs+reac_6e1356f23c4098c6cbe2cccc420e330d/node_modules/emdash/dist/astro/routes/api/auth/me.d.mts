import { APIRoute } from "astro";

//#region src/astro/routes/api/auth/me.d.ts
declare const prerender = false;
declare const GET: APIRoute;
/**
 * POST /_emdash/api/auth/me
 *
 * Mark that the user has seen the welcome modal.
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=me.d.mts.map