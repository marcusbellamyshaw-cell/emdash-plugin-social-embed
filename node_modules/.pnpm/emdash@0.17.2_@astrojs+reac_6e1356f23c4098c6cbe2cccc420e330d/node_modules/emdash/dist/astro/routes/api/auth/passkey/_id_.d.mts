import { APIRoute } from "astro";

//#region src/astro/routes/api/auth/passkey/[id].d.ts
declare const prerender = false;
/**
 * PATCH - Rename a passkey
 */
declare const PATCH: APIRoute;
/**
 * DELETE - Remove a passkey
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, PATCH, prerender };
//# sourceMappingURL=_id_.d.mts.map