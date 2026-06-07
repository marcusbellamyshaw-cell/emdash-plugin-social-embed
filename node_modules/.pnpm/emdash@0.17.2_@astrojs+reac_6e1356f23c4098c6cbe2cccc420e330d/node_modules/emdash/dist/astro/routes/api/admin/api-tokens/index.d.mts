import { APIRoute } from "astro";

//#region src/astro/routes/api/admin/api-tokens/index.d.ts
declare const prerender = false;
/**
 * List API tokens for the current user.
 * Admins can list all tokens (future: add ?userId= filter).
 */
declare const GET: APIRoute;
/**
 * Create a new API token.
 * Returns the raw token once — it cannot be retrieved again.
 */
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=index.d.mts.map