import { APIRoute } from "astro";

//#region src/astro/routes/api/mcp.d.ts
declare const prerender = false;
declare const POST: APIRoute;
/**
 * GET — SSE stream. Not used in stateless mode.
 */
declare const GET: APIRoute;
/**
 * DELETE — Session close. Not used in stateless mode.
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, POST, prerender };
//# sourceMappingURL=mcp.d.mts.map