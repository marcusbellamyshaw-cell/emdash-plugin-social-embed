import { APIRoute } from "astro";

//#region src/astro/routes/api/settings.d.ts
declare const prerender = false;
/**
 * GET /_emdash/api/settings
 *
 * Returns all site settings as a JSON object.
 * Unset values are undefined. Media references include resolved URLs.
 */
declare const GET: APIRoute;
/**
 * POST /_emdash/api/settings
 *
 * Updates site settings. Accepts a partial settings object.
 * Merges with existing settings and returns the updated settings.
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=settings.d.mts.map