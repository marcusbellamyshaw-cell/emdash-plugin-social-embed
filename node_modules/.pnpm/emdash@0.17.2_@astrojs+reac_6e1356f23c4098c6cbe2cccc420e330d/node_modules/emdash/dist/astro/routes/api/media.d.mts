import { APIRoute } from "astro";

//#region src/astro/routes/api/media.d.ts
declare const prerender = false;
/**
 * List media items
 */
declare const GET: APIRoute;
/**
 * Upload media file
 *
 * Uses the configured storage adapter to store the file.
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=media.d.mts.map