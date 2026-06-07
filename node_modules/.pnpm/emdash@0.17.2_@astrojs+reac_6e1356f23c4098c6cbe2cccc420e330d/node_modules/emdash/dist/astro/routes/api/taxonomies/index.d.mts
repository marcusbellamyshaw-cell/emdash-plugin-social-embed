import { APIRoute } from "astro";

//#region src/astro/routes/api/taxonomies/index.d.ts
declare const prerender = false;
/**
 * List taxonomy definitions
 */
declare const GET: APIRoute;
/**
 * Create a custom taxonomy definition
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map