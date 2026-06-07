import { APIRoute } from "astro";

//#region src/astro/routes/api/media/providers/[providerId]/index.d.ts
declare const prerender = false;
/**
 * List media from a specific provider
 */
declare const GET: APIRoute;
/**
 * Upload media to a specific provider
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map