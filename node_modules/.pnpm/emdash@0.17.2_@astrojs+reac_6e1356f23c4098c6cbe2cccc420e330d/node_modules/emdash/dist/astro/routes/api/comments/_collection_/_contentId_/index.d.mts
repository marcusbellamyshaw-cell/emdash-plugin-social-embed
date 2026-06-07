import { APIRoute } from "astro";

//#region src/astro/routes/api/comments/[collection]/[contentId]/index.d.ts
declare const prerender = false;
/**
 * List approved comments for a content item (public, no auth required)
 */
declare const GET: APIRoute;
/**
 * Submit a comment (public, gated by anti-spam checks)
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map