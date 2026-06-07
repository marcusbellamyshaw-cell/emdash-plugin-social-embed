import { APIRoute } from "astro";

//#region src/astro/routes/api/typegen.d.ts
declare const prerender = false;
/**
 * GET - Return types as plain text (for preview/debugging)
 */
declare const GET: APIRoute;
/**
 * POST - Generate types and return as JSON
 *
 * The caller writes the file to disk. Response shape:
 * { types: string, hash: string, collections: number }
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=typegen.d.mts.map