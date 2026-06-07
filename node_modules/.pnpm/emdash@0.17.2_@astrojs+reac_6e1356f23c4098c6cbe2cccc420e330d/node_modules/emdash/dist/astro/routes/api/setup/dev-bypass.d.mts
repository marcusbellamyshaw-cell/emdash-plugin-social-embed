import { APIRoute } from "astro";

//#region src/astro/routes/api/setup/dev-bypass.d.ts
declare const prerender = false;
declare const GET: APIRoute;
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=dev-bypass.d.mts.map