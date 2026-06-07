import * as astro from "astro";

//#region src/astro/middleware/redirect.d.ts
/**
 * Redirect middleware
 *
 * Intercepts incoming requests and checks for matching redirect rules.
 * Runs after runtime init (needs db) but before setup/auth (should handle
 * ALL routes, including public ones, and should be fast).
 *
 * Skip paths:
 * - /_emdash/* (admin UI, API routes, auth endpoints)
 * - /_image (Astro image optimization)
 * - Static assets (files with extensions)
 *
 * 404 logging happens post-response: if next() returns 404 and the path
 * wasn't already matched by a redirect, log it.
 */
declare const onRequest: astro.MiddlewareHandler;
//#endregion
export { onRequest };
//# sourceMappingURL=redirect.d.mts.map