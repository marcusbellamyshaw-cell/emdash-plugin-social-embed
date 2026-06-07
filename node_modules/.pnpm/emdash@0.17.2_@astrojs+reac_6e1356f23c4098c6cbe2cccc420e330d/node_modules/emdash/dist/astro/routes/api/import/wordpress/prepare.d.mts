import { APIRoute } from "astro";

//#region src/astro/routes/api/import/wordpress/prepare.d.ts
declare const prerender = false;
interface PrepareResult {
  success: boolean;
  collectionsCreated: string[];
  fieldsCreated: Array<{
    collection: string;
    field: string;
  }>;
  errors: Array<{
    collection: string;
    error: string;
  }>;
}
declare const POST: APIRoute;
//#endregion
export { POST, PrepareResult, prerender };
//# sourceMappingURL=prepare.d.mts.map