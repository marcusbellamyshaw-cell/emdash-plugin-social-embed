import { APIRoute } from "astro";

//#region src/astro/routes/api/admin/comments/[id].d.ts
declare const prerender = false;
/**
 * Get single comment detail (includes moderation_metadata)
 */
declare const GET: APIRoute;
/**
 * Hard delete a comment (ADMIN only)
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, prerender };
//# sourceMappingURL=_id_.d.mts.map