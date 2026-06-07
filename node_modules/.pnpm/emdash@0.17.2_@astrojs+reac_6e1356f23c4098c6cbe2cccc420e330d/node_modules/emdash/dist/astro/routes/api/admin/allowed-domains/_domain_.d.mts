import { APIRoute } from "astro";

//#region src/astro/routes/api/admin/allowed-domains/[domain].d.ts
declare const prerender = false;
/**
 * PATCH - Update domain settings
 */
declare const PATCH: APIRoute;
/**
 * DELETE - Remove an allowed domain
 */
declare const DELETE: APIRoute;
//#endregion
export { DELETE, PATCH, prerender };
//# sourceMappingURL=_domain_.d.mts.map