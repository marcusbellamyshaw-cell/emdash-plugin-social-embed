import { APIRoute } from "astro";

//#region src/astro/routes/api/plugins/[pluginId]/[...path].d.ts
declare const prerender = false;
declare const GET: APIRoute;
declare const POST: APIRoute;
declare const PUT: APIRoute;
declare const PATCH: APIRoute;
declare const DELETE: APIRoute;
//#endregion
export { DELETE, GET, PATCH, POST, PUT, prerender };
//# sourceMappingURL=_...path_.d.mts.map